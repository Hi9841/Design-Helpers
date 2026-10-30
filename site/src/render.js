// HTML for cards, rows, and the billboard. Shared by build.mjs (first paint,
// works without JavaScript) and app.js (every search).

/** @typedef {import("./search.js").Item & { thumb?: string | null }} Item */

const ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** @param {string} text */
export const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ENTITIES[char]);

/** @param {string} url */
export const hostOf = (url) => new URL(url).hostname.replace(/^www\./, "");

/** @param {string} text */
const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Images in the first row load at once. The rest wait for the scroll. */
const EAGER_COUNT = 8;

/** @param {Item} item @param {string} sizes */
function pictureAttrs(item, sizes) {
  const full = escapeHtml(item.thumb);
  const card = item.card ? escapeHtml(item.card) : "";
  if (!card) return `src="${full}" width="640" height="800"`;
  return `src="${card}" srcset="${card} 1920w, ${full} 3840w" sizes="${sizes}" width="1920" height="1080"`;
}

export function cardHtml(item, index) {
  const host = escapeHtml(hostOf(item.url));
  const picture = item.thumb
    ? `<img ${pictureAttrs(item, "(max-width: 36rem) 46vw, 280px")} alt="" loading="${index < EAGER_COUNT ? "eager" : "lazy"}" decoding="async">`
    : `<span class="no-shot">${host}</span>`;
  return `<li><a class="card" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">`
    + `<span class="window">${picture}</span>`
    + `<span class="name">${escapeHtml(item.name)}</span>`
    + `</a></li>`;
}

/**
 * One horizontal row per category. A library can sit in more than one row.
 * @param {Item[]} items
 * @param {string[]} categories
 */
export function rowsHtml(items, categories) {
  let index = 0;
  return categories.map((category) => {
    const group = items.filter((item) => item.tags.includes(category));
    if (!group.length) return "";
    const title = escapeHtml(category);
    const cards = group.map((item) => cardHtml(item, index++)).join("");
    return `<section class="row" id="row-${slug(category)}">`
      + `<h2>${title}</h2>`
      + `<div class="scroller">`
      + `<button type="button" class="nudge" data-dir="-1" aria-label="Scroll ${title} backward"></button>`
      + `<ul>${cards}</ul>`
      + `<button type="button" class="nudge" data-dir="1" aria-label="Scroll ${title} forward"></button>`
      + `</div></section>`;
  }).join("");
}

/** @param {Item[]} items */
export function resultsHtml(items) {
  return `<ul class="wall">${items.map((item, index) => cardHtml(item, index)).join("")}</ul>`;
}

/** @param {Item} item */
export function heroHtml(item) {
  const host = escapeHtml(hostOf(item.url));
  const still = item.thumb
    ? `<img class="hero-still" ${pictureAttrs(item, "100vw")} alt="" fetchpriority="high" decoding="async">`
    : `<span class="hero-still no-shot">${host}</span>`;
  return still
    + `<div class="hero-copy">`
    + `<p class="kicker">${escapeHtml(item.tags[0] ?? "")}</p>`
    + `<h1>${escapeHtml(item.name)}</h1>`
    + `<p class="what">${escapeHtml(item.description)}</p>`
    + `<a class="open" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">Open</a>`
    + `</div>`;
}

/**
 * @param {string | null} label  null means "All"
 * @param {number} count
 * @param {boolean} pressed
 */
export function drawerButtonHtml(label, count, pressed) {
  const value = label === null ? "" : ` data-category="${escapeHtml(label)}"`;
  const text = escapeHtml(label ?? "All");
  return `<li><button type="button" class="drawer-button"${value} aria-pressed="${pressed}" aria-label="${text}, ${count}">`
    + `<span class="text" data-text="${text}">${text}</span></button></li>`;
}
