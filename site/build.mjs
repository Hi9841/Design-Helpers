// Builds dist/: README.md -> a pre-rendered index.html (works without
// JavaScript), the data for search, and the static assets.
import { readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { parseReadme, slugOf } from "./src/parse.mjs";
import { search } from "./src/search.js";
import { drawerHtml, drawerButtonHtml } from "./src/render.js";

const here = (path) => fileURLToPath(new URL(path, import.meta.url));

const data = parseReadme(await readFile(here("../README.md"), "utf8"));
for (const item of data.items) {
  const thumb = `thumbs/${slugOf(item.name)}.webp`;
  item.thumb = item.kind === "library" && existsSync(here(thumb)) ? thumb : null;
}

const libraries = data.items.filter((item) => item.kind === "library");
const pageCount = data.items.length - libraries.length;
const countOf = (label) =>
  label === null ? libraries.length
  : label === data.pagesCategory ? pageCount
  : libraries.filter((item) => item.tags.includes(label)).length;

const firstView = search({ items: data.items, query: "", category: null, pagesCategory: data.pagesCategory });
const fills = {
  LIBRARIES: String(libraries.length),
  PAGES: String(pageCount),
  DRAWER_BUTTONS: [null, ...data.categories, data.pagesCategory]
    .map((label) => drawerButtonHtml(label, countOf(label), label === null))
    .join(""),
  WALL: firstView.map(drawerHtml).join(""),
  // "<" is escaped so README text can never close the script tag.
  DATA: JSON.stringify(data).replaceAll("<", "\\u003c"),
};

const template = await readFile(here("src/index.html"), "utf8");
const html = template.replace(/\{\{([A-Z_]+)\}\}/g, (marker, key) => {
  if (!(key in fills)) throw new Error(`src/index.html has an unknown marker ${marker}`);
  return fills[key];
});

await rm(here("dist"), { recursive: true, force: true });
await mkdir(here("dist"), { recursive: true });
await writeFile(here("dist/index.html"), html);
for (const file of ["style.css", "app.js", "search.js", "render.js", "favicon.svg"]) {
  await cp(here(`src/${file}`), here(`dist/${file}`));
}
await cp(here("src/fonts"), here("dist/fonts"), { recursive: true });
await cp(here("thumbs"), here("dist/thumbs"), { recursive: true, filter: (path) => !path.endsWith(".txt") });

const missing = libraries.filter((item) => !item.thumb).map((item) => item.name);
console.log(`Built dist/ with ${libraries.length} libraries (${libraries.length - missing.length} screenshots) and ${pageCount} GPUI Kit pages.`);
if (missing.length) console.log(`No screenshot (fallback shown): ${missing.join(", ")}`);
