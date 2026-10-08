// Pure search and filter logic. Runs in the browser and in tests.

/** @typedef {{ name: string, url: string, description: string, tags: string[], kind: "library" | "page" }} Item */

const PAGE_PENALTY = 5;

/** @param {string} text */
const compact = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, "");

/** @param {string} text */
const words = (text) => text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

/**
 * Score one query token against one item. 0 means no match.
 * @param {Item} item
 * @param {string} token
 */
function scoreToken(item, token) {
  const lower = token.toLowerCase();
  const squashed = compact(token);
  const name = item.name.toLowerCase();
  const nameSquashed = compact(item.name);

  if (name.startsWith(lower) || (squashed && nameSquashed.startsWith(squashed))) return 100;
  if (words(item.name).some((word) => word.startsWith(lower))) return 60;
  if (name.includes(lower) || (squashed && nameSquashed.includes(squashed))) return 40;
  if (item.tags.some((tag) => tag.toLowerCase().includes(lower))) return 20;
  // Descriptions match at word starts only: "table" must not find "selectable".
  if (words(item.description).some((word) => word.startsWith(lower))) return 10;
  return 0;
}

/**
 * @param {Item} item
 * @param {string | null} category
 * @param {string} pagesCategory
 */
function inCategory(item, category, pagesCategory) {
  if (category === null) return true;
  if (category === pagesCategory) return item.kind === "page";
  return item.kind === "library" && item.tags.includes(category);
}

/**
 * Items keep their source order when scores tie, so libraries stay A to Z
 * and GPUI Kit pages stay in README order.
 * @param {{ items: Item[], query: string, category: string | null, pagesCategory: string }} input
 * @returns {Item[]}
 */
export function search({ items, query, category, pagesCategory }) {
  const tokens = query.trim().split(/\s+/).filter(Boolean);
  const browsing = tokens.length === 0;

  const scored = [];
  for (const item of items) {
    if (!inCategory(item, category, pagesCategory)) continue;
    // Browsing without a query lists libraries only, unless the user opened GPUI Kit pages.
    if (browsing && category === null && item.kind === "page") continue;

    let score = 0;
    for (const token of tokens) {
      const tokenScore = scoreToken(item, token);
      if (tokenScore === 0) {
        score = -1;
        break;
      }
      score += tokenScore;
    }
    if (score < 0) continue;
    scored.push({ item, score: item.kind === "page" ? score - PAGE_PENALTY : score });
  }

  return scored.sort((a, b) => b.score - a.score).map(({ item }) => item);
}
