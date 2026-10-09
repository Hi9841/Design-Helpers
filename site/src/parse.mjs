// Turns README.md into the site data. The README is the single source of truth.
// Fails fast when the README shape drifts, so the site never ships half-parsed data.

export const CATEGORIES = [
  "Components",
  "AI and chat",
  "Audio",
  "Motion",
  "Inspiration",
  "3D and WebGL",
  "Visual assets",
  "Icons",
  "Tools",
];

const GPUI_HOME = "https://gpui-kit.com";

/**
 * @typedef {{ name: string, url: string, description: string, tags: string[] }} Item
 * @typedef {{ items: Item[], categories: string[] }} SiteData
 */

const LIBRARY_LINE = /^- \[(.+?)\]\((.+?)\) - (.+)$/;
const LINK = /^\[(.+)\]\((.+)\)$/;

/**
 * File-safe name for a library's screenshot: "Arc UI" -> "arc-ui".
 * @param {string} name
 */
export const slugOf = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** @param {string} text */
const plain =(text) => text.replaceAll("`", "").trim();

/** @param {string} line */
function tableCells(line) {
  return line
    .slice(1, line.lastIndexOf("|"))
    .split("|")
    .map((cell) => cell.trim());
}

/** @param {string} line */
const isTableBody = (line) =>
  line.startsWith("|") && !/^\|[\s:|-]+\|$/.test(line);

/** @param {string} url */
function resolveUrl(url) {
  if (url === "#gpui-kit") return GPUI_HOME;
  if (!url.startsWith("https://")) throw new Error(`Unsupported link target: ${url}`);
  return url;
}

/**
 * @param {string} markdown
 * @returns {SiteData}
 */
export function parseReadme(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");

  /** @type {Map<string, Item>} */
  const libraries = new Map();
  /** @type {Array<[string, string]>} category, library name */
  const tagged = [];

  let h2 = "";

  for (const line of lines) {
    if (line.startsWith("## ")) {
      h2 = line.slice(3).trim();
      continue;
    }

    if (h2 === "By name") {
      const match = LIBRARY_LINE.exec(line);
      if (!match) continue;
      const [, name, url, description] = match;
      if (libraries.has(name)) throw new Error(`Duplicate library: ${name}`);
      libraries.set(name, {
        name,
        url: resolveUrl(url),
        description: plain(description),
        tags: [],
      });
    } else if (CATEGORIES.includes(h2) && isTableBody(line)) {
      const link = LINK.exec(tableCells(line)[0]);
      if (link) tagged.push([h2, link[1]]);
    }
  }

  for (const [category, name] of tagged) {
    const library = libraries.get(name);
    if (!library) throw new Error(`"${name}" is in ${category} but not in By name`);
    if (!library.tags.includes(category)) library.tags.push(category);
  }
  for (const library of libraries.values()) {
    if (library.tags.length === 0) throw new Error(`"${library.name}" is in no category`);
  }
  if (libraries.size === 0) throw new Error("No libraries found in README");

  return { items: [...libraries.values()], categories: CATEGORIES };
}
