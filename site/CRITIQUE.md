# Critique

Scored by the designer, not a separate critic (this session does not spawn
agents unasked). Scored harder than feels fair.

## Rounds

- **r1:** sideways scroll at 390 and 768 (grid items kept their min-content
  width). Fixed with `min-inline-size: 0` on the layout's children.
- **r2:** phone first screen was all headline; no drawer visible. Phone now
  drops the fact line, tightens the headline and hides the search label
  visually. Matrix: long hosts ran off 320px and l10n screens; the bar
  wrapped mid-label.
- **r3/r4:** hosts wrap under the name instead of clipping; bar items never
  break inside a label. Description matches now need a word start ("table"
  no longer finds "selectable").

Final state: scan has no FAILs at 390, 768, 1280 and 1440. Matrix has no
FAILs on Windows 125% and 150%, High Contrast, Linux, Mac, Android, Firefox,
320px reflow, reduced motion, l10n and l10n phone. Safari/WebKit was not
installed and was not checked.

## Warns answered

- **"No action in the first screen":** the action is the search field. It is
  in the first screen at every width, but the scan counts only buttons and
  links.
- **"58 of 59 boxes share one 12px radius":** the 58 boxes are the same
  object (a drawer front). The search field shares the radius on purpose;
  tabs use 3px.

## Scores (final round)

| # | Line | Score | Evidence |
|---|---|---|---|
| 1 | Concept on the page | 4 | Framed screenshots with red label tabs read as a wall of labelled drawers |
| 2 | Not the category average | 3 | Screenshot grids exist in some galleries; the drawer labels and the pull keep it apart |
| 3 | Not a slop face | 4 | One shared feature (a search field); no KPI strip, no dark zinc, no pills |
| 4 | First screen | 4 | Desktop: headline, search, six drawers. Phone: headline, search, drawer row, first drawer |
| 5 | Typography | 4 | One face with a reason, 59px display against 17px body, tabular counts |
| 6 | Colour | 4 | One red with one job; light only, declined dark on purpose in DIRECTION.md |
| 7 | Richness | 4 | 49 real screenshots; 9 sites block capture and get a designed fallback |
| 8 | Structure and rhythm | 4 | Intro column, wall, GPUI index, footer; no template sections |
| 9 | Craft | 4 | No clipping after r3; fallbacks designed; states for empty and pages |
| 10 | Responsive | 4 | The phone is designed (different intro), not the desktop stacked |
| 11 | Everyone's computer | 4 | Matrix clean; Safari not verified |
| 12 | Signature | 3 | The pull works (screenshot slides to the lower page); it is quiet, and the filmstrip shows only the end state |
| 13 | Screenshot test | 3 | Clean and useful; not yet something people post |

Done by the stop rule: no line below 3, 10 of 13 at 4.

## Not verified

Safari and iPhone rendering, real touch devices, a screen reader, real
network performance.
