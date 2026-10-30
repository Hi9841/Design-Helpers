// Builds dist/: README.md -> a pre-rendered index.html (works without
// JavaScript), the data for search, and the static assets.
import { readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { parseReadme, slugOf } from "./src/parse.mjs";
import { drawerButtonHtml, heroHtml, rowsHtml } from "./src/render.js";

const here = (path) => fileURLToPath(new URL(path, import.meta.url));

const data = parseReadme(await readFile(here("../README.md"), "utf8"));
for (const item of data.items) {
  const thumb = `thumbs/${slugOf(item.name)}.webp`;
  const card = `thumbs/${slugOf(item.name)}-card.webp`;
  item.thumb = existsSync(here(thumb)) ? thumb : null;
  item.card = existsSync(here(card)) ? card : null;
}

const libraries = data.items;
const countOf = (label) =>
  label === null ? libraries.length : libraries.filter((item) => item.tags.includes(label)).length;

const featured = libraries.find((item) => item.thumb) ?? libraries[0];
const pageUrl = "https://hi9841.github.io/Design-Helpers/";
const description = "Component kits, references and tools from the Design Helpers list, each with a screenshot of the site. Search by what you are making.";
const ogImage = featured.thumb ? `${pageUrl}${featured.thumb}` : "";
const fills = {
  LIBRARIES: String(libraries.length),
  OG_TAGS: ogImage
    ? `<meta property="og:title" content="Design Helpers">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Design Helpers">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"Design Helpers","url":"${pageUrl}","description":"${description}"}</script>`
    : "",
  DRAWER_BUTTONS: [null, ...data.categories]
    .map((label) => drawerButtonHtml(label, countOf(label), label === null))
    .join(""),
  HERO: heroHtml(featured),
  ROWS: rowsHtml(libraries, data.categories),
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
await writeFile(here("dist/robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${pageUrl}sitemap.xml\n`);
await writeFile(here("dist/sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${pageUrl}</loc></url>\n</urlset>\n`);

const missing = libraries.filter((item) => !item.thumb).map((item) => item.name);
console.log(`Built dist/ with ${libraries.length} libraries (${libraries.length - missing.length} screenshots).`);
if (missing.length) console.log(`No screenshot (fallback shown): ${missing.join(", ")}`);
