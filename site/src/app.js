import { search } from "./search.js";

/** @typedef {import("./search.js").Item} Item */

/** @type {{ items: Item[], categories: string[], pagesCategory: string }} */
const data = JSON.parse(document.getElementById("data").textContent);
const { items, categories, pagesCategory } = data;

const queryInput = document.getElementById("query");
const chipsEl = document.getElementById("chips");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");
const emptyEl = document.getElementById("empty");

const libraries = items.filter((item) => item.kind === "library");
const pageCount = items.length - libraries.length;
const chipLabels = [null, ...categories, pagesCategory];

document.getElementById("summary").textContent =
  `${libraries.length} libraries and ${pageCount} GPUI Kit pages. The largest library of component libraries.`;

/** @type {{ query: string, category: string | null }} */
const state = readHash();

/** URL hash keeps the view shareable: #q=chat&c=AI+and+chat */
function readHash() {
  const params = new URLSearchParams(location.hash.slice(1));
  const category = params.get("c");
  return {
    query: params.get("q") ?? "",
    category: chipLabels.includes(category) ? category : null,
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
function chipCount(label) {
  if (label === null) return libraries.length;
  if (label === pagesCategory) return pageCount;
  return libraries.filter((item) => item.tags.includes(label)).length;
}

function renderChips() {
  chipsEl.replaceChildren(
    ...chipLabels.map((label) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.setAttribute("aria-pressed", String(label === state.category));
      chip.append(label ?? "All");
      const count = document.createElement("span");
      count.className = "count";
      count.textContent = String(chipCount(label));
      chip.append(count);
      chip.addEventListener("click", () => {
        state.category = label;
        update();
      });
      return chip;
    }),
  );
}

/** @param {Item} item */
function renderResult(item) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.className = "result";
  link.href = item.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const name = document.createElement("span");
  name.className = "result-name";
  name.textContent = item.name;

  const host = document.createElement("span");
  host.className = "result-host";
  host.textContent = new URL(item.url).hostname.replace(/^www\./, "");

  const description = document.createElement("span");
  description.className = "result-description";
  description.textContent = item.description;

  const tags = document.createElement("span");
  tags.className = "result-tags";
  for (const tagName of item.tags) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = tagName;
    tags.append(tag);
  }

  link.append(name, host, description, tags);
  li.append(link);
  return li;
}

function update() {
  const results = search({ items, query: state.query, category: state.category, pagesCategory });
  resultsEl.replaceChildren(...results.map(renderResult));
  emptyEl.hidden = results.length > 0;
  statusEl.textContent = results.length === 0 ? "" : `${results.length} ${results.length === 1 ? "result" : "results"}`;
  renderChips();
  writeHash();
}

/* Keyboard: "/" focuses search, Esc clears it, arrows walk the results. */

const resultLinks = () => [...resultsEl.querySelectorAll("a")];

queryInput.addEventListener("input", () => {
  state.query = queryInput.value;
  update();
});

queryInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    queryInput.value = "";
    state.query = "";
    update();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    resultLinks()[0]?.focus();
  }
});

resultsEl.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
  event.preventDefault();
  const links = resultLinks();
  const index = links.indexOf(document.activeElement);
  const next = index + (event.key === "ArrowDown" ? 1 : -1);
  if (next < 0) queryInput.focus();
  else links[Math.min(next, links.length - 1)].focus();
});

document.addEventListener("keydown", (event) => {
  const typing = event.target instanceof HTMLElement && event.target.matches("input, textarea");
  if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
    event.preventDefault();
    queryInput.focus();
  }
});

window.addEventListener("hashchange", () => {
  Object.assign(state, readHash());
  queryInput.value = state.query;
  update();
});

queryInput.value = state.query;
update();
