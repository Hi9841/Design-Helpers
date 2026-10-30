// Captures each library's site into thumbs/<slug>.webp.
// The file is a 2x shot of a 1920x1080 desktop (3840x2160) at WebP quality 88.
// thumbs/<slug>-card.webp is the same shot at 1920x1080 for the rows.
// Run it when the README gains a library:  node thumbs.mjs
// Re-capture everything:                   node thumbs.mjs --all
// Re-capture some:                         node thumbs.mjs "React Bits" Kobra
// Slow sites:                              node thumbs.mjs --settle 10000 "React Bits"
// Sites that block bots or need a login go in thumbs/skip.txt (one name per
// line); they get the designed fallback instead of a broken picture.
// Uses the installed Chrome or Edge over the DevTools protocol, then ffmpeg
// for the row-sized file.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, writeFile, mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { parseReadme, slugOf } from "./src/parse.mjs";

const VIEWPORT = { width: 1920, height: 1080 };
const DEVICE_SCALE = 2;
const WEBP_QUALITY = 88;
const CARD_WIDTH = 1920;
const LOAD_TIMEOUT_MS = 25000;
const PARALLEL = 3;

const here = (path) => fileURLToPath(new URL(path, import.meta.url));
const args = process.argv.slice(2);
const settleAt = args.indexOf("--settle");
// Lets entrance animations finish before the capture.
const SETTLE_MS = settleAt === -1 ? 4000 : Number(args.splice(settleAt, 2)[1]);

const BROWSERS = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];
const browserPath = BROWSERS.find((path) => path && existsSync(path));
if (!browserPath) throw new Error("No Chrome or Edge found. Set CHROME=/path/to/browser.");

const { items: libraries } = parseReadme(await readFile(here("../README.md"), "utf8"));
const skipFile = here("thumbs/skip.txt");
const skipped = existsSync(skipFile)
  ? (await readFile(skipFile, "utf8")).split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  : [];
const named = args.filter((arg) => !arg.startsWith("--"));
const todo = libraries.filter((library) => {
  if (named.length) return named.includes(library.name);
  if (skipped.includes(library.name)) return false;
  return args.includes("--all") || !existsSync(here(`thumbs/${slugOf(library.name)}.webp`));
});
if (todo.length === 0) {
  console.log("Every library has a screenshot. Use --all to re-capture.");
  process.exit(0);
}
await mkdir(here("thumbs"), { recursive: true });

const profile = await mkdtemp(join(tmpdir(), "design-helpers-thumbs-"));
const browser = spawn(browserPath, [
  "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`,
  "--hide-scrollbars", "--mute-audio", "--no-first-run", "--no-default-browser-check",
]);
const endpoint = await new Promise((resolve, reject) => {
  let log = "";
  browser.stderr.on("data", (chunk) => {
    log += chunk;
    const match = /DevTools listening on (ws:\/\/\S+)/.exec(log);
    if (match) resolve(match[1]);
  });
  browser.on("exit", () => reject(new Error(`Browser exited before it was ready:\n${log}`)));
});

const socket = new WebSocket(endpoint);
await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
let nextId = 0;
const pending = new Map();
const listeners = new Set();
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.id !== undefined) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(new Error(message.error.message)) : resolve(message.result);
  } else {
    for (const listener of listeners) listener(message);
  }
});
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Row file: half the 2x shot, still sharper than the 280px card. */
function writeCard(fullPath, cardPath) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-y", "-i", fullPath,
      "-vf", `scale=${CARD_WIDTH}:-1:flags=lanczos`,
      "-c:v", "libwebp",
      "-quality", String(WEBP_QUALITY),
      "-compression_level", "6",
      cardPath,
    ], { stdio: ["ignore", "ignore", "pipe"] });
    let err = "";
    ffmpeg.stderr.on("data", (chunk) => { err += chunk; });
    ffmpeg.on("error", reject);
    ffmpeg.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited ${code}: ${err.slice(-500)}`));
    });
  });
}

async function capture(library) {
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  try {
    await send("Emulation.setDeviceMetricsOverride", { ...VIEWPORT, deviceScaleFactor: DEVICE_SCALE, mobile: false }, sessionId);
    await send("Page.enable", {}, sessionId);
    const loaded = new Promise((resolve) => {
      const listener = (message) => {
        if (message.sessionId === sessionId && message.method === "Page.loadEventFired") {
          listeners.delete(listener);
          resolve();
        }
      };
      listeners.add(listener);
      setTimeout(resolve, LOAD_TIMEOUT_MS);
    });
    await send("Page.navigate", { url: library.url }, sessionId);
    await loaded;
    await sleep(SETTLE_MS);
    const { data } = await send("Page.captureScreenshot", {
      format: "webp",
      quality: WEBP_QUALITY,
      fromSurface: true,
    }, sessionId);
    const fullPath = here(`thumbs/${slugOf(library.name)}.webp`);
    const cardPath = here(`thumbs/${slugOf(library.name)}-card.webp`);
    await writeFile(fullPath, Buffer.from(data, "base64"));
    await writeCard(fullPath, cardPath);
    console.log(`ok    ${library.name}`);
  } catch (error) {
    console.log(`FAIL  ${library.name}: ${error.message}`);
  } finally {
    await send("Target.closeTarget", { targetId }).catch(() => {});
  }
}

const queue = [...todo];
await Promise.all(
  Array.from({ length: PARALLEL }, async () => {
    while (queue.length) await capture(queue.shift());
  }),
);

socket.close();
browser.kill();
await rm(profile, { recursive: true, force: true }).catch(() => {});
console.log(`Captured ${todo.length} of ${libraries.length}. Open thumbs/ and check each one by eye.`);
