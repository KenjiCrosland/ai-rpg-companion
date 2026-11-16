# The human spot-check loop — a review page per run

**Owner, 2026-11-09:** "I caught this one, not the critic. It's time to do a human spot check…
a relatively clean layout… a DPR calculator as well as other technical metadata I may not be
aware of at first glance… the trace info might be good to include too."

The returning-weapon clause (item 18) shipped 28 times across a week of fortys. The critic read
~400 blocks and never named it; the owner named it from one. A human loop needs a surface built
for a human, and it must produce the same artifact the critic loop does — a per-block table —
so the two can be compared.

## What Opus builds

**One script, one file, no server, no build.**

```
node --import ./scripts/alias-loader.mjs scripts/review-html.mjs <run-dir>
→ writes <run-dir>/review.html (self-contained: inline CSS + JS, run data embedded as JSON)
→ prints the path; `open` it
```

Reuse, do not reimplement: import `checkBlock` from `checker.mjs` and embed its result per sheet
(`read`, `gates`, `fidelity`); read the sheet JSON and the `.md` (input line, `[path] decides`
line, the trace). Exclude `all.md`. Rows come from BOTH printings (`sections` and the flat
`abilities`/`actions`/… keys; prose is `text ?? description`) — the 2014 sheets must render.

### Layout — one card per sheet, index at the top

**Index:** `##. Name — CR n` per sheet with chips: path (exact / twist / borrow / homebrew /
class_npc), checker FAIL count, and the human verdict once set. Click to jump; `j`/`k` move;
filter by FAIL, by path, by "unreviewed".

**Left column — the block, clean.** Print's 2024 layout (name, size/type/alignment, AC /
Initiative, HP, Speed, the six-ability table with MOD and SAVE, skills/senses/languages, CR line,
then Traits / Actions / Bonus Actions / Reactions / Legendary Actions). 2014 sheets in the 2014
layout. Plain, print-like, high legibility; this is a dev tool — NOT the parchment design system.
Above the block: **what the GM typed**, verbatim, and the path line.

**Each row carries small provenance tags** (this is the "metadata I may not be aware of"):
`print` · `library` · `authored` · `free row` · `GM-asked` (has `clause`/`gmQuote`) · `part` ·
`imposes: Frightened` · `(Recharge 5-6)`-style gates read from the name. Hovering a tag shows
the stamp values raw.

**Click a row name → flag it**: a one-line note box ("returning clause on a tar clod"). Flags
are part of the export.

**Right column — three collapsible panels, open by default in this order:**

1. **Numbers.** From `checkBlock(m).read`: label CR vs **read** CR, with `def` and `off` beside
   it; **sustained** (the round), **nova** (Recharge/X-Day burst) when present, `atkBest` and
   `dcBest` against the DMG band for the label; AC and HP against the DMG table; PB and the
   attack-bonus check (PB + mod) per attack row. Red when outside band, grey when the checker
   says SOFT.
   **The DPR calculator**, interactive, below those: a **target AC** slider (10–22, default
   = DMG expected AC for the label) → per attack row: hit chance, expected damage; the
   **Multiattack round** as written, with a dropdown for each "replace one attack with X"
   option so the human can price the swap (this is how the hot tail was invisible to our gate);
   **three-round expected damage** with the nova once. Only the hit-chance arithmetic is new
   JS; the row parsing comes from the embedded `read`.
2. **Receipts.** From `fidelity`: each clause the GM typed → the row credited, or **dropped**,
   or **lack honoured / not honoured** (`brokenLacks`). Then the checker's findings grouped
   FAIL / SOFT with rule name and message.
3. **Trace.** Every `[reskin]` / `[path]` / `[route]` line from the `.md`, collapsed, with a
   text filter box. Lines containing `refused`, `withheld`, `dropped`, `STAYS`, `leaves`
   highlighted — those are where the engine decided something.

### The human verdict — the point of the page

Per sheet: **Keeper / Runs / Tweak / Fix** buttons (the critic's scale, so the tables compare)
plus a note. Stored in `localStorage` keyed by the run directory name, so a half-finished read
survives a reload. **Export** button copies to clipboard a markdown table in the critic's shape:

```
| # | sheet | typed | path | checker | verdict | note | flagged rows |
```

plus the tally line `Keeper n · Runs n · Tweak n · Fix n`. That file goes next to the critic's
read in `scripts/smoke-evidence/HUMAN-<run>.md`; Fable diffs the two.

## What NOT to build

No server, no Vue, no bundler, no parchment styling, no editing of blocks, no re-running the
engine. No new checker rules — the page shows what the checker already computes. If a number
the owner wants is not in `checkBlock`'s result, add it to `checkBlock` (one owner of the
computation), never to the page.

## Verify

1. Run on `smoke-out/typed40-2026-11-09T06-25-17`: 40 cards; the 2014-format sheets render
   with the six-ability table; no sheet shows zero rows.
2. #32 on `sweep-2026-11-09T05-57-15` (Gormak): with the Shattered Ground swap selected, the
   round reads ~106 at AC 17; unselected ~60. The checker panel shows `hot-offense`.
3. #36 on the typed40 (Rotbark): Rootfeed's tags show no row on the sheet imposing
   Grappled/Restrained/Prone — the human can see what the critic saw.
4. Flag a row, set a verdict, reload: both persist. Export: the table pastes into a `.md`.
5. `review.html` under 3 MB for a forty.

Then: the owner reads a forty on it, exports, and that export is the first HUMAN-*.md.
