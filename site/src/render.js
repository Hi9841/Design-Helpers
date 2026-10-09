// HTML for drawers and drawer buttons. Shared by build.mjs (first paint, works without
// JavaScript) and app.js (every search), so both always draw the same thing.

/** @typedef {import("./search.js").Item & { thumb?: string | null }} Item */

const ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** @param {string} text */
export const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ENTITIES[char]);

/** @param {string} url */
export const hostOf = (url) => new URL(url).hostname.replace(/^www\./, "");

/** Images in the first rows load at once; the rest wait for the scroll. */
const EAGER_COUNT = 9;

/**
 * @param {Item} item
 * @param {number} index
 */
export function drawerHtml(item, index) {
  const host = escapeHtml(hostOf(item.url));
  const picture = item.thumb
    ? `<img src="${escapeHtml(item.thumb)}" alt="" width="640" height="800" loading="${index < EAGER_COUNT ? "eager" : "lazy"}" decoding="async">`
    : `<span class="no-shot" aria-hidden="true">${host}</span>`;
  return `<li><a class="drawer" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">`
    + `<span class="window">${picture}<span class="tab">${escapeHtml(item.tags[0])}</span></span>`
    + `<span class="label"><span class="name">${escapeHtml(item.name)}</span><span class="host">${host}</span></span>`
    + `<span class="what">${escapeHtml(item.description)}</span>`
    + `</a></li>`;
}

/**
 * @param {string | null} label  null means "All"
 * @param {number} count
 * @param {boolean} pressed
 */
export function drawerButtonHtml(label, count, pressed) {
  const value = label === null ? "" : ` data-category="${escapeHtml(label)}"`;
  const text = escapeHtml(label ?? "All");
  // data-text feeds a hidden bold copy that reserves the selected width.
  return `<li><button type="button" class="drawer-button"${value} aria-pressed="${pressed}">`
    + `<span class="text" data-text="${text}">${text}</span><span class="count">${count}</span></button></li>`;
}
