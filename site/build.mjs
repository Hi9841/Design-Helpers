// Builds dist/: README.md -> data inlined into index.html, plus static assets.
import { readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { parseReadme } from "./src/parse.mjs";

const here = (path) => fileURLToPath(new URL(path, import.meta.url));

const readme = await readFile(here("../README.md"), "utf8");
const data = parseReadme(readme);

// "<" is escaped so README text can never close the script tag.
const json = JSON.stringify(data).replaceAll("<", "\\u003c");
const template = await readFile(here("src/index.html"), "utf8");
if (!template.includes("<!--DATA-->")) throw new Error("src/index.html has no <!--DATA--> marker");

await rm(here("dist"), { recursive: true, force: true });
await mkdir(here("dist"), { recursive: true });
await writeFile(here("dist/index.html"), template.replace("<!--DATA-->", () => json));
for (const file of ["style.css", "app.js", "search.js"]) {
  await cp(here(`src/${file}`), here(`dist/${file}`));
}

const libraries = data.items.filter((item) => item.kind === "library").length;
console.log(`Built dist/ with ${libraries} libraries and ${data.items.length - libraries} GPUI Kit pages.`);
