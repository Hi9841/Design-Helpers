# Design Helpers site: direction

## Brief (self-authored from the user's words)

- **What:** a website for the members of a design server (Discord community).
  It makes the Design Helpers list (README.md) searchable, easy to find, easy
  to navigate.
- **The one job:** in ten seconds, a member finds the right library or tool
  for the thing they are building, and opens it.
- **Feel (user's words):** fast, clean, simple, "just works".
- **What exists:** the name "Design Helpers", the README list (58 libraries,
  10 categories, 151 GPUI Kit pages), no logo, no brand colours, no photos.
  Stack: plain HTML, CSS and ES modules, built from README.md.
- **Image generation:** not used.

## Category default refused

Link directories (Toools.design, Uneed, curated "awesome" lists) share: a
white or near-black page, Inter, a left sidebar or chip row of categories
with counts, a search field with a "/" hint, and identical cards with a
favicon, a name and a grey line. The category colour is violet ("design" and
"AI") or pure black and white. Version 1 of this site was exactly the
**Dark Dev Tool** face (slop.md): zinc dark ground, search with "/", filter
chips with counts, rows with tag pills. Refused.

## Imagery we can honestly get

1. The listed sites themselves: real screenshots of each library's own page.
2. The categories and counts (real data).
3. Drawn in code: colour, shape, type.

## Three concepts

- **A. Fan deck** (objects): "Design Helpers is a paint fan deck: each
  category is a chip of colour; fan it open and pick the shade."
  Colour-field ground that changes with the category, Archivo at expanded
  width, richness = colour-material, grammar = index, motion = stacked
  sheets (the deck fans open).
- **B. Parts drawers** (places): "Design Helpers is the wall of labelled
  parts drawers in a good hardware store: every drawer has a picture of what
  is inside." Cool light ground, Schibsted Grotesk, red label accent,
  richness = real screenshots of each site, grammar = catalogue, motion =
  3D cards (the drawer front tilts toward the pointer).
- **C. Teletext** (media): "Design Helpers is a teletext service: page 100
  is the index, every library has a page number." Black ground, VT323 with
  IBM Plex Mono, yellow, richness = mosaic block graphics, grammar =
  tool-first (type a page number or a word), motion = dot matrix (the
  mosaic title assembles block by block).

## Choice: B, parts drawers (user picked it)

- **A lost:** the most striking screen, but the fan hides most category
  names and pushes the list below the fold. Weak at the one job.
- **C lost:** fast and memorable, but the least "clean", and the mosaic
  title needs a hand-drawn bitmap alphabet to read correctly.
- **B won:** it is the most *this list*. A member sees each site before
  opening it, which no plain link list can do.

History row: `site|object|light|grotesque|red|photo|index` (clear: differs
from tdt and Maor Portfolio on 4+ columns). The concept is the cabinet
itself (an object), and a filterable directory is the **index** grammar.

## Tokens

Colour (light only; most screenshots are dark sites and read best on a light
cabinet; `color-scheme: light`):

| Role | Value | Source |
|---|---|---|
| `--ground` | `oklch(96.5% 0.006 240)` | the cool steel-white of a parts cabinet |
| `--frame` | `oklch(99.5% 0.002 240)` | the drawer front |
| `--ink` | `oklch(20% 0.015 250)` | stencilled black |
| `--ink-2` | `oklch(44% 0.02 250)` | pencil on the label card |
| `--rule` | `oklch(86% 0.01 240)` | the cabinet's seams |
| `--label` | `oklch(53% 0.2 27)` | the red label holder. One job: says which drawer you are in (category tab, current filter, focus) |

Type: **Schibsted Grotesk** (variable, 400 to 800), because it reads like
the printed label on a parts drawer: precise, a bit of warmth in the
`a` and `g`, excellent small sizes for domains and counts. One family.

Scale: display `clamp(2.25rem, 1.2rem + 2.8vw, 3.75rem)`, h2 `1.5rem`,
name `1.0625rem`, body `1.0625rem`, small `0.9375rem`, meta `0.8125rem`.

Space: 4, 8, 12, 16, 24, 40, 64, 104. Radius family: frame 12px, image
window 6px (concentric), label tab 3px.

Grid: 12 columns. Intro column 4, wall 8 (desktop); one column on phone.

## Richness: the screenshots

Each library's own page, captured at 1280×1600 CSS px, saved at half scale as
WebP (640×800). The top 16:10 shows; the rest is the drawer's depth. No
crops that hide the site's name. A library with no capture gets a designed
fallback: its domain set large on `--frame`, never a grey box.

## Grammar: index

1. Bar: the name, the counts, "Suggest a library".
2. Intro column (sticky on desktop): headline, one fact line, the search,
   the drawer list (categories with counts).
3. The wall: one drawer per library.
4. GPUI Kit pages: a text index (151 pages have no screenshots of their
   own).
5. Footer: where the list lives, credit.

## Signature: pulling a drawer

Trigger: pointer over a drawer, or keyboard focus. Frames: the frame tilts
toward the pointer (max 6°, 300ms ease-out); the screenshot slides up inside
its window over 1.6s ease-in-out to show what is further down that site, like
pulling a drawer open to see the back of it. Leave: slides back in 400ms
ease-out. Reduced motion: no tilt, no slide; the top of the site stays.
Touch: none (no hover).

## Voice

Talks like the person at the parts counter who knows every drawer: short,
exact, says the useful fact and stops.

## Content

- `<title>`: Design Helpers: 58 design libraries, each with a look inside
- Bar: "Design Helpers" · "58 libraries · 151 GPUI Kit pages" · link
  "Suggest a library"
- H1: "58 design libraries, each with a look inside."
- Fact line: "Component kits, references and tools from the Design Helpers
  list. Search by what you are making: a chat view, a shader, an icon set."
- Search label "Search the drawers", placeholder "chat, shader, icons, audio"
- Drawer list: All 58 · Components 24 · AI and chat 4 · Audio 1 · Motion 6 ·
  Inspiration 13 · 3D and WebGL 3 · Visual assets 5 · Icons 2 · Tools 5 ·
  GPUI Kit 151
- Drawer: category tab, screenshot, name, domain, the README description.
- GPUI section: "GPUI Kit pages" / "151 pages from gpui-kit.com: styled
  components, the unstyled base, the JavaScript shell and the docs."
- Empty: "No drawer matches “x”. Try one word, like “chat”, or suggest a
  library."
- Footer: "The list lives in the Design Helpers README on GitHub. GPUI Kit
  descriptions are adapted from GPUI Kit under CC BY 4.0."
