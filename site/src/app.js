import { search } from "./search.js";
import { drawerButtonHtml, escapeHtml, resultsHtml, rowsHtml } from "./render.js";

/** @typedef {import("./render.js").Item} Item */

/** @type {{ items: Item[], categories: string[] }} */
const { items, categories } = JSON.parse(document.getElementById("data").textContent);

const queryInput = document.getElementById("query");
const drawersEl = document.getElementById("drawers");
const statusEl = document.getElementById("status");
const rowsEl = document.getElementById("rows");
const heroEl = document.getElementById("hero");
const emptyEl = document.getElementById("empty");

const drawerLabels = [null, ...categories];

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
  if (label === null) return items.length;
  return items.filter((item) => item.tags.includes(label)).length;
}

/** @param {number} n @param {string} one @param {string} many */
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function update() {
  const query = state.query.trim();
  const browsing = !query && !state.category;
  const results = search({ items, query: state.query, category: state.category });

  heroEl.hidden = !browsing;
  statusEl.hidden = browsing;
  rowsEl.hidden = results.length === 0;
  emptyEl.hidden = results.length > 0;

  if (browsing) {
    rowsEl.innerHTML = rowsHtml(items, categories);
    statusEl.textContent = "";
  } else if (!query && state.category) {
    rowsEl.innerHTML = rowsHtml(results, [state.category]);
    statusEl.textContent = plural(results.length, "library", "libraries");
  } else {
    rowsEl.innerHTML = resultsHtml(results);
    statusEl.textContent = results.length === 0
      ? ""
      : plural(results.length, "library", "libraries") + ` match${results.length === 1 ? "es" : ""} “${query}”`;
  }

  if (results.length === 0) {
    emptyEl.innerHTML = `No library matches “${escapeHtml(query)}”. Try one word, like “chat”, or `
      + `<a href="https://github.com/Hi9841/Design-Helpers/issues/new">suggest a library</a>.`;
  }

  drawersEl.innerHTML = drawerLabels
    .map((label) => drawerButtonHtml(label, countOf(label), label === state.category))
    .join("");
  markLoadedImages();
  fitNudges();
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

rowsEl.addEventListener("click", (event) => {
  const button = event.target instanceof Element && event.target.closest(".nudge");
  if (!button) return;
  const ul = button.parentElement?.querySelector("ul");
  if (!ul) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  ul.scrollBy({
    left: Number(button.dataset.dir) * ul.clientWidth * 0.82,
    behavior: reduce ? "auto" : "smooth",
  });
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

window.addEventListener("resize", () => fitNudges());

function fitNudges() {
  for (const scroller of rowsEl.querySelectorAll(".scroller")) {
    const ul = scroller.querySelector("ul");
    if (!ul) continue;
    scroller.classList.toggle("can-nudge", ul.scrollWidth > ul.clientWidth + 8);
  }
  drawersEl.parentElement?.classList.toggle(
    "can-scroll",
    drawersEl.scrollWidth > drawersEl.clientWidth + 8,
  );
}

function markLoadedImages() {
  for (const img of document.querySelectorAll("img:not(.loaded)")) {
    if (img.complete) img.classList.add("loaded");
  }
}

/** @param {Event} event */
const onImageDone = (event) => {
  if (event.target instanceof HTMLImageElement) event.target.classList.add("loaded");
};
document.addEventListener("load", onImageDone, true);
document.addEventListener("error", onImageDone, true);
markLoadedImages();
fitNudges();
document.documentElement.classList.add("js");

queryInput.value = state.query;
if (state.query || state.category) update();
