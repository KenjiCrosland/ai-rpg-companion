# Creature reference pages — integration plan

Planning response for `/monsters/{slug}/`, ten-page pilot then ~159.
Nothing has been built. Every claim below was checked against the repo;
file:line references are given so you can re-check the ones you doubt.

---

## 0. Corrections to the brief

Six things in the brief don't match what's in the repo. Two change the plan
materially.

**`card-budgets.mjs` is not an encounter engine.** It is the single-monster
stat budget from Blog of Holding's "2024 Monster Manual on a Business Card"
— HP, DPR, attack, AC and DC for one creature at one CR
(`src/tools/statblock-generator/reskin/card-budgets.mjs:34`). It knows
nothing about parties, XP totals or difficulty. The real encounter maths is
§3 below, and it is not in a module at all.

**Tactical coverage is 328 of 328, not 159.** Every entry in
`creature-intelligence.json` has `signature`, `abilities`,
`tactical_identity`, `encounter_hooks`, `description` and
`aftermath_hooks`. Only `retreat` (267) and `social` (154) are partial. If
159 was the ceiling on how many pages are worth making, the real ceiling is
285 — the number of creature-intelligence entries that exact-match an SRD
5.2 name. Nothing in the data caps you at 159.

**327 is the wrong file.** `creature-intelligence.json` has 328 entries.
327 is the entry count of `srd-monsters.json`, the older 2014 corpus, which
is still live in the encounter generator and the fuzzy search.

**The Phandelver guides are not in this repo.** The only mention anywhere is
a future-ideas bullet in the dungeon generator's notes. They are WordPress
posts authored in the editor. There is no in-repo pattern to copy from them,
and anything you want to change about them is a content migration, not a
code change.

**There is no HTML statblock renderer in `render.mjs`** — it exports two
functions and both emit Markdown (`:70` plain, `:151` Homebrewery).

*Corrected 2026-09-24, on the owner's challenge:* my first pass said
`Statblock2024.vue` was the only HTML statblock rendering anywhere. That was
wrong. `src/components/Statblock.vue` is the 2014 card, a separate 35 KB
SFC, and both are imported side by side by the NPC generator. Both take a
`readonly` prop (`Statblock.vue:354`, `Statblock2024.vue:217`) and both
confine their `ResizeObserver` to `onMounted` behind a `typeof` guard
(`Statblock.vue:645`, `Statblock2024.vue:451`). So the edition toggle
server-renders two components, not one component twice with different
props, and no third renderer is needed.

**`srd-monsters.json` has an `img_url` on all 327 entries and you must not
use it.** Every one points at `media-waterdeep.cursecdn.com`, which is D&D
Beyond's CDN serving Wizards' copyrighted artwork. It is not CC-BY, it is
not yours, and using it would be hotlinking someone else's CDN with
someone else's art on a page that carries an SRD attribution notice.

One more thing the brief doesn't mention but the plan has to face: the
parchment design system is not reachable from a page that has no Vue app.
See §2.

---

## 0a. Decisions (2026-09-24)

Settled by the owner in response to the above. Where these conflict with a
later section, these win; the sections are kept as the reasoning behind
them, not as live proposals.

- **No tier variants in the pilot.** One statblock per page, the SRD block
  as printed. This supersedes the tier-variant analysis in §2 and removes
  the tier control from §5. Shape the data for tiers anyway: `statblocks` is
  an **array** of `{ tier, cr, editions: { "2024": {...}, "2014": {...} } }`,
  one element in the pilot, so a second tier is an append and not a
  migration of every file. Render no tier control at `length === 1`.
- **Edition toggle is in**, sourced by joining `srd52-monsters.json` and
  `srd-monsters.json` — no LLM conversion. Same control and layout as the
  statblock card. Both editions server-render into the HTML; JS toggles
  visibility only, which is what lets the page target "owlbear 2014
  statblock" and "owlbear 2024 statblock" as separate queries. Omit the
  toggle entirely when a creature has no 2014 counterpart. Extend
  `name-aliases.json` to carry the 2014 key rather than adding a second
  alias file. **Strip `img_url` on the join.**
- **When both switchers eventually exist, tier is the outer axis and
  edition the inner.** A reader picks which creature, then which format.
  Don't build the combined control; don't foreclose it either.
- **Difficulty is 2024** — Low / Moderate / High, no encounter-size
  multiplier. This is new work, not a config flag: the extracted module is
  2014 and its spec pins that deliberately.
- **Level band** = party of four, the contiguous range of levels where the
  composition lands in the 2024 Moderate budget. One party size, one target.
- **Illustrations are optional in the data.** With no image the hero
  collapses to title plus chips at full width — no placeholder, no reserved
  gap, no broken image. With one, explicit width and height to avoid layout
  shift, and WordPress supplies `srcset` and lazy-loading.
- **Yoast free is installed.** It owns titles, meta descriptions, canonicals,
  OG tags and the JSON-LD graph. Do **not** add a `pre_get_document_title`
  filter to this template, and do not hand-roll schema. Setting the Yoast
  meta field programmatically at WP-CLI page-creation time is worth
  proposing for 159 pages; out of scope for ten.
- **Habitat is a field on the creature**, not a list on a category page:
  `"habitat": ["forest", "hill"]`. Vocabulary is forest, hill, mountain,
  swamp, desert, arctic, coastal, underdark, urban, planar, aquatic. Derive
  what's derivable from `speed` — swim, burrow, fly — and author the rest.
  Settle the vocabulary before generating the ten. Category pages filter
  over the data later and maintain themselves.
- **Emit `creature-index.json`** alongside the per-creature files: slug,
  name, cr, type, habitat, thumbnail. Category pages filter this instead of
  reading 159 files per request.

Build order: (1) extract `encounter-math.mjs`, (2) 2024 difficulty model and
level-band derivation, (3) habitat vocabulary and alias map, (4) build
script, CSS entry, template, (5) ten pages. Nothing publishes until the
statblock generator floor test is clean.

---

## 1. Rendering and routing

**Recommendation: real WordPress pages, one shared template, creature data
in flat JSON keyed by slug. No custom post type, no rewrite rule.**

Every tool page today is a Genesis page template with a `Template Name:`
header, assigned to a page in wp-admin, deployed to
`{stylesheet}/page-templates/`. There are 29 of them. There is no
`add_rewrite_rule`, no `register_post_type` and no `register_taxonomy`
anywhere in `wordpress/functions.php` — a rewrite rule would be the first
on the site.

Make ten real pages under a `/monsters/` parent. Assign them all the same
template. The template reads `get_post_field('post_name')` for the slug and
loads `creature-data/{slug}.json`. Page count scales by creating pages, not
by touching code, and at 159 that is a WP-CLI loop.

The reason to prefer this over a rewrite rule is not effort, it is SEO
plumbing. Your sitemap, canonical URLs and title handling all come from
whatever SEO plugin is installed — and the repo cannot see it, because no
plugin filter appears anywhere in the PHP. Real pages are picked up by core
`wp-sitemap.xml` and by every SEO plugin automatically. A rewrite-routed
virtual URL is invisible to all of them until you write sitemap code
yourself. For a project whose entire point is ranking, inheriting the
existing SEO surface for free is worth more than clean URLs you control.

Against a custom post type: a CPT puts content in the database, which
fights "regenerable in batch and hand-editable." You would need an importer,
and every regeneration either clobbers hand edits or needs merge logic. A
CPT earns its place when humans author in wp-admin. Here the machine
authors and a human reviews a diff.

### Where the data lives

One JSON file per creature, in the theme, read at render. Not CPT meta, not
a custom table, not a transient.

At ten to 159 files of maybe 10–25 KB, a `file_get_contents` plus
`json_decode` per request is well under a millisecond and is dwarfed by
WordPress's own bootstrap. Transients would add invalidation complexity to
solve a problem you do not have. If render cost ever shows up, the answer
is a page cache in front of WordPress, not a cache inside it.

Split each creature's data in two, and merge at build:

```
content/creatures/generated/owlbear.json   # machine-written, safe to overwrite
content/creatures/overrides/owlbear.json   # hand edits, never overwritten
                → build → theme/creature-data/owlbear.json   # what PHP reads
```

This is what makes "regenerable in batch and hand-editable afterward" true
at the same time. Regeneration rewrites `generated/` only. A hand edit goes
in `overrides/` and wins on merge. Both are in git, so a regeneration is a
reviewable diff and a bad batch is one revert.

### Sitemap and SEO config

Because the pages are real, no sitemap work is needed. Three open items:

- **Which SEO plugin is installed is genuinely unknown from the repo.** No
  `wpseo_`, `rank_math/` or `seopress_` filter appears anywhere. Check the
  live site before writing any title or meta code.
- Three templates set their own title via `pre_get_document_title` at
  priority 99 (`rpg-companion-backpack.php:39`, chase-tracker, loot-splitter).
  That will fight a Yoast title. Decide whether creature pages set their own
  or let the plugin do it — do not do both.
- There is no JSON-LD anywhere on the site. The FAQ blocks are Microdata
  attributes in markup. If you want `Article` or `BreadcrumbList` schema on
  creature pages you are introducing the first JSON-LD, which is fine but is
  new ground rather than an extension of the existing pattern.

---

## 2. Reusing what exists

### The statblock: server-render the Vue component, don't reimplement it

**Recommendation: render `Statblock2024.vue` to static HTML at build time
with `vue/server-renderer`.**

Three facts make this work, and I checked all three:

- `vue/server-renderer` resolves in this project (Vue 3.3).
- `Statblock2024.vue` already takes `readonly: Boolean`
  (`src/components/Statblock2024.vue:217`), and the edit footer is behind
  `v-else-if="!readonly"` (`:165`).
- Its only browser dependency is a `ResizeObserver`, which sits inside
  `onMounted` behind a `typeof` guard (`:451-453`). `onMounted` does not run
  during SSR, so it is inert.

That is one implementation of statblock markup, the one you already
maintain and already test. The drift question disappears because there is
nothing to drift from.

The alternative is a third renderer beside the two Markdown ones in
`render.mjs`. It is simpler and more predictable, but it is a real second
implementation of the same markup, and the only thing keeping it in line
with the Vue card would be a golden test comparing both against the same
fixture. Take this route only if SSR turns out to fight the parchment
component imports.

**Either way you have a CSS problem, and it is the sharpest constraint in
this plan.** The parchment design system does not exist as a stylesheet. It
is compiled per-entry by Vite into hashed chunk CSS, and the only way to
enqueue it is `rpg_companion_enqueue_entry()`, which looks up a JS entry in
`dist/manifest.json` (`functions.php:401-467`). The four Google Fonts
stylesheets are enqueued inside that same function (`:427-430`), so a page
that skips it silently falls back to Georgia.

Fix it properly: add a CSS-only entry to the 19 in `vite.config.js` that
imports the parchment styles and nothing else, and factor the font enqueue
out of `rpg_companion_enqueue_entry()` so a page can ask for styling
without shipping a Vue runtime it never mounts. That is a small change and
it is reusable by every future prose page.

Note also `rpg_companion_app_style_guards()` (`functions.php:824-868`) is
applied automatically to every page that enqueues an entry, and it is
app-shaped: it paints `body` with the desk background and assumes an `#app`
mount. A creature page wants the parchment surface but probably not those
rules. And every tool template's reset carries
`.entry-content ul > li { list-style-type: none }`, which will silently
kill the bullets in any prose section you write.

### Encounter XP: extract it first, then call it from the build

**Recommendation: lift the XP and difficulty maths out of
`EncounterGenerator.vue` into a pure module, then import that module from
the build script.**

It is not in a module today. It is five Vue `computed` properties inside the
SFC: `CR_TO_XP` (`EncounterGenerator.vue:414`), `difficultyThresholds`
(`:502`), `rawXp` (`:544`), `adjustedXp` (`:556`) and `difficultyRating`
(`:559`), over `src/data/encounter-difficulty.json`. Nothing outside that
component can call any of it.

Extract to `src/util/encounter-math.mjs`, have the component import it, and
let the existing 53 encounter tests pin that the move changed nothing. Then
the build script and the app share one implementation. This is the same
shape as the Patreon URL consolidation: the logic was fine, it was just
unreachable.

Do this before generating any encounter content, not after. Generating 159
pages against a PHP or JS reimplementation and then reconciling is the
expensive order.

Three things to settle while you are in there:

- **CR-to-XP is defined three times.** Inline in the component (`:414`), in
  `src/data/cr-to-xp.json`, and per-monster as an `xp` field on all 329
  entries of `srd52-monsters.json`. For SRD creatures the corpus field is the
  authority; the tables are for arbitrary CRs.
- **The difficulty model is 2014 and your page is 2024.** The thresholds
  file is Easy/Moderate/Hard/Deadly with an encounter-size multiplier. The
  2024 DMG dropped the multiplier and uses Low/Moderate/High. The mockup's
  own rules card says "Surprise, 2024 rules". Pick one and be consistent, or
  the page contradicts itself.
- **The mockup shows a level band; the generator computes a verdict.**
  "Levels 3–4 · 700 XP" is not something `difficultyRating` returns. It
  answers "what difficulty is this for *this* party." A band is the inverse:
  which party levels put this composition in a target difficulty. That is a
  new derivation to define, not an existing function to call. 700 XP for one
  Owlbear is the raw CR 3 value with no multiplier applied, so whatever you
  define should reproduce that.

### Tier variants: build time, stored, never live

Live generation would mean an LLM call on page render. That breaks the
static-HTML constraint, costs money per pageview and makes the page's
content non-reviewable. Generate once, review, commit.

How much is deterministic:

- **Numbers are.** `chassisFor(cr)` and `applyArchetype()`
  (`chassis/chassis.mjs:67`, `:92`) are pure and Node-callable.
- **Rescaled abilities are not, for SRD creatures.** `scaleDonor`
  (`reskin/scale.mjs:36`) rescales *authored donors* from the reskin library.
  The donor pool is four hand-designed skirmisher blocks
  (`reskin/donors.mjs`), not SRD monsters. Taking the printed Owlbear and
  re-solving its Rend for CR 7 is not a path that exists today.
- **Names and blurbs are not.** "Cub", "Savage" and the two-line identity
  line need authoring.

Also worth knowing before you plan a headless generator: the full pipeline
is deliberately coupled to the Vue layer. `scripts/smoke-statblock.mjs`
drives a real browser against the dev server, and its header explains why —
"a Node script calling generateReskin directly would skip resolve and
routing entirely, which is half of what a smoke is for." A pure-Node tier
generator gets the chassis numbers but not the routing that picks ability
shapes.

For the pilot, the cheapest honest answer is to author the 20–30 tier
variants semi-manually with chassis numbers stamped by the engine, review
them, and commit. Automating that pays off somewhere north of 50 pages.

---

## 3. Content pipeline

**Recommendation: a hand-run Node script writing committed JSON, modelled on
`scripts/build-backpack-catalog.mjs`.**

That script is the precedent and its header states the contract you want:
dev-only, re-run by hand, no network dependency at runtime or build time,
output committed. `scripts/generate-srd-index.mjs` is the same shape, wired
to `npm run generate-srd-index`. Follow both.

The loop: script reads `srd52-monsters.json` plus `creature-intelligence.json`
plus the alias map, calls the AI proxy for prose, writes
`content/creatures/generated/{slug}.json`, and you read the git diff before
committing. Review is the diff. Nothing reaches a page without passing
through a commit.

### Illustrations

There are no raster assets in this repo at all — not one PNG, JPG or WebP
outside `node_modules` and `dist`. This is a pipeline you are starting from
zero, and the brief treats it as solved.

Put the files in the WordPress media library and reference them from the
creature JSON by a slug convention. That keeps binaries out of git, gets
responsive `srcset` and lazy-loading from WordPress for free, and lets you
swap an illustration without a deploy. The alternative, committing images to
the repo and shipping them through the theme, buys version control over
artwork you will rarely revise, at the cost of repo weight and a deploy per
image.

Sourcing is an open decision and not one I can make for you. See §6.

### Name mapping

Measured, not estimated:

| | count |
|---|---|
| creature-intelligence entries | 328 |
| exact name match in SRD 5.2 | 285 |
| CI names with no SRD 5.2 match | 43 |
| SRD 5.2 names with no CI entry | 44 |

The 44 are mostly renames and splits, and they fall into clean patterns:
`Goblin Warrior` / `Goblin Minion` / `Goblin Boss` all want CI `Goblin`;
`Bugbear Stalker` and `Bugbear Warrior` want `Bugbear`; `Succubus` and
`Incubus` want `Succubus/Incubus`; `Shrieker Fungus` wants `Shrieker`;
`Warrior Infantry` and `Warrior Veteran` want `Veteran`. Perhaps a dozen are
genuinely new with no CI counterpart at all — `Archelon`, `Hippopotamus`,
`Piranha`, `Troll Limb`, `Half-Dragon`, `Vampire Familiar`.

Since you are not modifying `creature-intelligence.json`, put the mapping in
a separate checked-in file, `content/creatures/name-aliases.json`, mapping
SRD 5.2 name to CI key. Hand-written, reviewable, and it documents the
rename history as a side effect.

Then make the build script **print every unmatched SRD 5.2 creature and
refuse to silently drop one.** A creature with no CI entry should either be
excluded from the page set by an explicit list or generated with a thinner
page, and either way the script should say so on every run. This is the same
discipline as the corpus lint rules: never-fail, but never silent.

---

## 4. Internal linking

**Link only to slugs that have a page; render the rest as plain text.**

The build script knows the full set of generated slugs, so it can resolve
every creature name inside encounter compositions at build time and emit
either an anchor or a bare span. No broken links, no 404s in the crawl, and
links light up on their own as the page set grows — regenerate and the
previously-plain names become anchors.

The alternative, linking everything and letting 149 of them 404, is actively
harmful: it wastes crawl budget and puts soft-404s in the index on the exact
pages you are trying to rank.

### Tag chips and taxonomy

**Author the tag values now, build the filter pages later, keep the chips
unlinked in the pilot.**

Habitat does not exist in the data. I checked every key across all 329
entries of `srd52-monsters.json`: there is no habitat, environment, terrain
or biome field. The mockup's "Forest" chip has to be authored. So do
"Ambusher", "Melee only" and "Climbs" — though the last two are derivable
from `speed` and the actions list, and should be derived rather than typed.

Designing the vocabulary now costs one pass over the data and saves a
re-tagging pass over 159 pages later. Building `/monsters/forest/` now costs
a second page type, a second template and a second sitemap question, to
serve traffic that does not exist until the creature pages rank. Do the
first, defer the second.

---

## 5. Interaction

**Native `<details>` is confirmed safe — it is already in nine templates**,
carrying FAQ microdata, including seven instances in the statblock
generator's own page. Nothing in Genesis breaks it.

For the tier picker specifically, the mockup shows tabs rather than
disclosure triangles. The version that needs no JavaScript at all is
radio inputs plus sibling CSS selectors: all three statblocks are in the
HTML, the checked radio reveals one, and with CSS disabled all three render
stacked and readable. That satisfies "JS only toggles visibility" by not
needing JS at all.

One caveat that applies to the whole page: every tool template's inline
reset includes `.entry-content ul > li { list-style-type: none }`. Prose
bullets on a creature page will render unmarked unless the new template
drops that rule. It exists because Genesis targets `li` directly, so removing
it needs a check that nothing else regresses.

---

## 6. Pilot versus full rollout

**Build for the ten-page pilot:**

- One page template, prefixed function names. Do not copy the unprefixed
  `vue_app_enqueue_assets()` / `vue_app_render_root_element()` pattern; it
  only works today because one template loads per request.
- A CSS-only Vite entry so the page gets parchment and the fonts without a
  Vue runtime.
- `src/util/encounter-math.mjs`, extracted from the encounter generator.
- `scripts/build-creature-pages.mjs`, plus `generated/` and `overrides/`.
- `content/creatures/name-aliases.json` and an unmatched-creature report.
- Ten WP pages created by hand.
- SSR of the statblock card at build time.
- Chips as plain text. Creature links only where a page exists.

**Defer until the pilot ranks:**

- WP-CLI page creation for the remaining creatures.
- `/monsters/{habitat}/` filter pages and the taxonomy behind them.
- Automated tier-variant generation.
- JSON-LD beyond whatever the SEO plugin already emits.
- Any rewrite-rule routing.

**Do first, before generating content:** extract the encounter maths, and
settle 2014 versus 2024 difficulty. Both are cheap now and expensive after
159 pages exist.

---

## 7. Open questions

1. **Which SEO plugin is installed?** The repo cannot tell. Everything about
   titles, canonicals and sitemaps depends on the answer.
2. **Where do illustrations come from?** Commissioned, public-domain
   bestiary scans, or generated. This is a licensing and budget decision, and
   the page carries a CC-BY attribution block that makes provenance visible.
3. **2014 or 2024 difficulty vocabulary**, given the page's 2024 framing and
   the 2014 thresholds file.
4. **How is a level band defined?** Which difficulty, and for what party
   size, counts as "Levels 3–4"?
5. **Which creatures get pages?** 285 have full tactical data. Ten for the
   pilot — chosen by search volume, or by which have the best encounter
   hooks already written?
6. **Do creature pages set their own titles**, following the three templates
   that do, or defer to the plugin?
