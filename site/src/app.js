import { search } from "./search.js";
import { drawerHtml, pageHtml, drawerButtonHtml, escapeHtml } from "./render.js";

/** @typedef {import("./render.js").Item} Item */

/** @type {{ items: Item[], categories: string[], pagesCategory: string }} */
const { items, categories, pagesCategory } = JSON.parse(document.getElementById("data").textContent);

const queryInput = document.getElementById("query");
const drawersEl = document.getElementById("drawers");
const statusEl = document.getElementById("status");
const wallEl = document.getElementById("wall");
const emptyEl = document.getElementById("empty");
const pagesEl = document.getElementById("pages");
const pageListEl = document.getElementById("page-list");

const libraries = items.filter((item) => item.kind === "library");
const pageCount = items.length - libraries.length;
const drawerLabels = [null, ...categories, pagesCategory];

/** @type {{ query: string, category: string | null }} */
const state = readHash();

/** The URL keeps the view shareable: #q=chat&c=AI+and+chat */
function readHash() {
  const params = new URLSearchParams(location.hash.slice(1));
  const category = params.get("c");
  return {
    query: params.get("q") ?? "",
    category: drawerLabels.includes(category) ? category : null,
  };
}

function writeHash() {
  const params = new URLSearchParams();
  if (state.query) params.set("q", state.query);
  if (state.category) params.set("c", state.category);
  const hash = params.toString();
  history.replaceState(null, "", hash ? `#${hash}` : location.pathname + location.search);
}

/** @param {string | null} label */
function countOf(label) {
  if (label === null) return libraries.length;
  if (label === pagesCategory) return pageCount;
  return libraries.filter((item) => item.tags.includes(label)).length;
}

/** @param {number} n @param {string} one @param {string} many */
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function update() {
  const results = search({ items, query: state.query, category: state.category, pagesCategory });
  const foundLibraries = results.filter((item) => item.kind === "library");
  const foundPages = results.filter((item) => item.kind === "page");

  wallEl.innerHTML = foundLibraries.map(drawerHtml).join("");
  wallEl.hidden = foundLibraries.length === 0;
  pageListEl.innerHTML = foundPages.map(pageHtml).join("");
  pagesEl.hidden = foundPages.length === 0;

  const query = state.query.trim();
  emptyEl.hidden = results.length > 0;
  if (results.length === 0) {
    emptyEl.innerHTML = `No drawer matches “${escapeHtml(query)}”. Try one word, like “chat”, or `
      + `<a href="https://github.com/Hi9841/Design-Helpers/issues/new">suggest a library</a>.`;
  }

  const parts = [];
  if (foundLibraries.length) parts.push(plural(foundLibraries.length, "drawer", "drawers"));
  if (foundPages.length) parts.push(plural(foundPages.length, "GPUI Kit page", "GPUI Kit pages"));
  statusEl.textContent = parts.length === 0 ? "" : parts.join(" and ") + (query ? ` match “${query}”` : "");

  drawersEl.innerHTML = drawerLabels
    .map((label) => drawerButtonHtml(label, countOf(label), label === state.category))
    .join("");
  writeHash();
}

drawersEl.addEventListener("click", (event) => {
  const button = event.target instanceof Element && event.target.closest("button");
  if (!button) return;
  state.category = button.dataset.category ?? null;
  update();
  button.blur();
  document.querySelector(`.drawer-button[aria-pressed="true"]`)?.focus({ preventScroll: true });
});

queryInput.addEventListener("input", () => {
  state.query = queryInput.value;
  update();
});

queryInput.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  queryInput.value = "";
  state.query = "";
  update();
});

// "/" jumps to search from anywhere on the page.
document.addEventListener("keydown", (event) => {
  const typing = event.target instanceof HTMLElement && event.target.matches("input, textarea");
  if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault();
    queryInput.focus();
  }
});

window.addEventListener("hashchange", () => {
  Object.assign(state, readHash());
  queryInput.value = state.query;
  update();
});

// The signature: the drawer front tilts toward the pointer (max 6 degrees).
const MAX_TILT = 6;
if (matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) {
  wallEl.addEventListener("pointermove", (event) => {
    const frame = event.target instanceof Element && event.target.closest(".window");
    if (!frame) return;
    const box = frame.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    frame.style.setProperty("--ry", `${(x * 2 * MAX_TILT).toFixed(2)}deg`);
    frame.style.setProperty("--rx", `${(-y * 2 * MAX_TILT).toFixed(2)}deg`);
  });
  wallEl.addEventListener("pointerout", (event) => {
    const frame = event.target instanceof Element && event.target.closest(".window");
    if (!frame || frame.contains(/** @type {Node | null} */ (event.relatedTarget))) return;
    frame.style.removeProperty("--rx");
    frame.style.removeProperty("--ry");
  });
}

// The build already drew the default view; only redraw when the URL asks for another.
queryInput.value = state.query;
if (state.query || state.category) update();
