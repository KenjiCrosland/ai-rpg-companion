# Quest Hooks Editorial Migration — Phase 1 Findings

Read-only investigation. No code changed. Maps the brief's reference treatment onto the real codebase and recommends a path for Phases 2–3.

**Target:** [`src/tools/item-generator/components/QuestHookTab.vue`](../src/tools/item-generator/components/QuestHookTab.vue) (766 lines — Cedar accordion + Cedar form + SCSS on `$cdr-*` tokens).

---

## 1. The dungeon NPC expandable-card pattern

**Location:** [`src/tools/dungeon-generator/components/NPCsTab.vue`](../src/tools/dungeon-generator/components/NPCsTab.vue) — **inline markup, not a component.** No `ParExpandableCard` / `ParCard` exists in `src/parchment/`.

**It is not a clean "disclosure" card.** It's a 3-to-4-state row swapped via `<Transition name="npc-swap" mode="out-in">`:
`skeleton` (generating) → `stub` (name + desc + "Generate Full NPC") → `collapsed` (name + teaser + chevron) → `expanded` (renders a *different* component, `NPCCard`, plus a statblock section). The collapsed row is **replaced** by the expanded card; the header does not stay put. Expansion is **single-open** (`expandedKey` ref). Much of its structure (stub/loading/NPCCard/statblock) is dungeon-NPC-specific.

**The genuinely reusable part is the collapsed-row visual + toggle**, all on `--par-*` tokens:

| Aspect | Value (from `.npc-collapsed-row`) |
|---|---|
| Surface | `--par-color-surface` `#FBF7F0` (warm cream) |
| Border | `1.5px solid --par-color-border-strong` `#c9b99a` |
| Radius | `--par-radius-sm` (3px) |
| Shadow | `--par-color-card-shadow` |
| Padding | `1.6rem 3rem` |
| Name | serif, `1.8rem`, weight 500, `--par-color-text` |
| Teaser | **sans** `1.3rem` italic, `--par-color-text-muted`, single-line ellipsis (`white-space:nowrap; overflow:hidden; text-overflow:ellipsis`) |
| Chevron | static down-polyline SVG in a bordered box; `--par-color-action-muted` → burgundy on hover. **Does not rotate** (the row swaps, so there's no persistent caret to rotate) |
| Hover | bg `#f8f3e8`, border `--par-color-title` |
| Margin between cards | `gap: 0.8rem` on a flex-column `<ul>` |
| Click area | whole row; `role="button"`, `tabindex=0`, `@keydown.enter/.space.prevent` |
| ARIA | `aria-expanded`, `aria-label`; **no `aria-controls`** (swap pattern has no separate body node) |
| Motion | cross-fade only; honors `prefers-reduced-motion` |

## 2. Current Quest Hooks structure (what we're replacing)

- **Heading:** plain `<h2>` + `<p>` (Cedar sans defaults).
- **Form:** `cdr-select` (Quest Type) + `ParButton` (already lapis, full-width) inside `.quest-generator` (`$cdr-color-background-secondary`). Quota line below.
- **List:** `cdr-accordion-group` / `cdr-accordion` (sage Cedar chrome), one per hook, `:opened="hook.open"`, `@accordion-toggle="toggleOpen"`. **`hook.open` is persisted in the item** (`questHooks[].open`) and emitted via `emitUpdatedItem`.
- **Hook body:** view mode = `<h3>` + Quest Giver `<p>` + setup `<p>` + Objectives/Challenges `cdr-list` + Rewards `<p>` + `.quest-twist` (Cedar left-border block) + edit/delete buttons + per-hook export block. Edit mode = full `cdr-input` form with add/remove objective/challenge rows.
- **Data shape (stable, keep):** `{ title, questGiver, setup, objectives[], challenges[], reward, twist, open }`. **`setup` is the narrative** → it's the teaser source (Option B). Note field is `setup`, not `narrative`.

**Integration seams to preserve (do NOT move):** `generateGptResponse` + `questHookValidation` + `normalizeQuestHook` (with its key-alias/flatten logic), the quota utils (`readQuota`/`writeQuota`/`remainingFromQuota`/`ensureQuotaSeeded`/`detectIncognito`, keyed `'quest-hook'`, MAX 5/24h), the inline `questPrompt`, `emit('updated-item')`, and `ItemExportsSection` + per-hook export functions.

## 3. Parchment primitives available

- **Form family** (real names — brief calls them `ParFormField`/`ParFormSelect`): `ParField` (lapis uppercase label + `optional`/`required` markers) + `ParSelect` (lapis "magic UI" select). Use `ParField label="Quest type" required` + `ParSelect`.
- **Button:** `ParButton variant="primary"` = solid lapis serif CTA (matches the brief's generate button). Sentence-case label.
- **Edit-mode inputs:** card-family `ParCardInput`/`ParCardTextarea` (burgundy, self-labelling) — the editorial fit for inline card editing, same as LoreBuilder's node edit.
- **Twist callout:** `ParCallout` exists **but is a plain tan box with no left-rule and no label slot** — it does NOT match the brief's "burgundy left-rule + small-caps label." The matching pattern is **inline**, identical to LoreBuilder's `.summary-card` (`--par-color-callout-bg` + `border-left: 3px solid --par-color-title` + small-caps burgundy label). Recommend inlining the twist, not using ParCallout.
- **Editorial labels:** the small-caps burgundy label (`--par-color-title`, `letter-spacing .12em`, uppercase, ~11px) is already the convention in LoreBuilder (`.summary-card__legacy-label`) and the item card. Reuse verbatim.
- **`formatMarkdown`:** QuestHookTab has its own inline copy; identical to the one already extracted to [`utils/format-markdown.mjs`](../src/tools/item-generator/utils/format-markdown.mjs) during the Lore Builder work. Swap to the shared import (removes a 3rd duplicate).

## 4. Isolation

`grep QuestHookTab src/` → imported only by `ItemGenerator.vue`, mocked in `ItemGenerator.spec.js`. No spec of its own. Contained.

---

## Recommended path — **Path B(b): inline the card in QuestHookTab now, defer the `ParExpandableCard` primitive**

The brief leans toward extraction (two known consumers). I recommend **against extracting yet**, because the two consumers share *visuals*, not *behavior*:

- Dungeon NPC = **swap-based**, **single-open**, coupled to stub/loading/NPCCard/statblock states, no persistent header, no `aria-controls`.
- Quest hooks (per the brief's own mockup) = **in-place disclosure** (header stays, caret rotates, body expands below), **multi-open**, with `aria-controls`.

Extracting now means inventing a primitive API that spans both behaviors — speculative scaffolding the parchment doc explicitly warns against ("extractions earn their existence through real duplicated *need*, not visual similarity"). Visual consistency is already guaranteed by the shared `--par-*` tokens, so inlining costs us nothing on that front. The **statblock-generator migration** (which the brief says will drive `ParAccordion`) is the right forcing function for a shared expandable primitive — let a real second *disclosure* consumer shape the API.

**Two behavioral deviations from the dungeon pattern I propose for quest hooks** (flagging for your call):
1. **In-place disclosure, not swap** — header (title) stays, body expands below, caret rotates. Matches the brief's mockup and is simpler than the dungeon's swap (no second component to render). Multi-open via a `Set` of expanded ids.
2. **Teaser** = first sentence of `setup`, truncated with ellipsis (Option B). No pipeline change.

If you'd rather **extract `ParExpandableCard` now** anyway, the clean API would be `props: { title, teaser, defaultOpen }`, default slot for body, internal open state (multi-open), `aria-expanded`/`aria-controls`, rotating caret — and I'd build it in `src/parchment/` with QuestHookTab as first consumer, leaving the dungeon swap pattern untouched (it's not a fit to retrofit).

**Stop for review.** Confirm: (a) Path B(b) inline vs. extract-now, and (b) the two behavioral deviations (in-place disclosure + multi-open). Then Phase 2.

---

## Phase 1 — reviewed & decided (2026-06-19)

- **Path B(b): inline in QuestHookTab, defer `ParExpandableCard`.** Visual consistency via shared `--par-*` tokens; the statblock migration drives the eventual primitive.
- **Behavior: swap-style + single-open**, matching the dungeon NPC pattern exactly (NOT the brief's in-place-disclosure/multi-open mockup). Collapsed row (title + teaser + chevron) is replaced by the expanded contents; only one hook open at a time. Local single-open state (`expandedKey`), not the persisted `hook.open`. New/generated hook auto-expands.
- **Teaser:** first sentence of `setup`, lightly truncated (Option B).
- **Twist callout:** inline LoreBuilder `.summary-card` treatment (burgundy left-rule + small-caps label), not `ParCallout`.

**Phase 2** = card-pattern swap only (collapsed/expanded/skeleton, single-open, parchment collapsed-row visual). Heading, form, and expanded-contents editorial typography are **Phase 3**. Integration seams (§2) stay put.

---

## Phase 2 — done (2026-06-19)

Swap-style card list replaces `cdr-accordion-group`: collapsed row (burgundy serif title + italic teaser from `setup`'s first sentence + bordered lapis chevron, whole-row toggle, keyboard + ARIA) ⇄ expanded contents, single-open via local `expandedKey`, cross-fade honoring `prefers-reduced-motion`, skeleton card during generation, new hook auto-expands. Removed Cedar accordion/skeleton imports. Seams untouched.

## Phase 3 — done (2026-06-19)

- **Heading:** lapis serif title + italic tagline (tool-chrome register); dropped the old sentence.
- **Form:** cream surface card with `ParField` (required) + `ParSelect` + `ParButton variant="primary"` (sentence-case "Generate quest hook", disabled until type chosen / while generating) + quota line.
- **Expanded contents:** burgundy small-caps section labels (Objectives/Challenges/Rewards), serif body, burgundy `::marker` bullets, inline burgundy "Quest Giver:" label. **Twist** = inline warm-tan callout with burgundy left-rule (Lore Builder summary-card pattern), not `ParCallout`.
- **Action buttons** (editorial consistency, beyond the brief's explicit list): Edit → `affirmative`, Delete → `muted`, Export → `affirmative`, edit-mode Save → `primary` / Cancel → `muted` / add → `create` / remove → `muted` (all `ParCardButton`).
- **Edit form:** `cdr-input` → `ParCardInput`/`ParCardTextarea`.
- **Skeleton double-border fix:** card surface moved off the scope-leaking `.quest-content` onto a dedicated `.quest-card` wrapper the skeleton root doesn't share.
- **Cleanup:** root marked `.parchment` (serif baseline); inline `formatMarkdown` → shared `utils/format-markdown.mjs`; dropped the `@rei/cdr-tokens` SCSS import (plain CSS, `--par-*` tokens only). Only Cedar left = `CdrLink` (documented carve-out).
- Full suite **2443 green**; `vite build` clean.

**Migration complete.** Uncommitted (awaiting the user's own commit). This file can be deleted once committed.
