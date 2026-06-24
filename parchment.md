# parchment.md — cros.land design system

## Strategic frame

cros.land is a suite of AI-powered TTRPG tools. The design system — "parchment" — exists to make generated output feel like considered editorial work (a sourcebook page, a chronicle) rather than generic AI output. Editorial register, manuscript palette, real typographic hierarchy. The accumulated, considered surfaces *are* the moat: as AI-tool noise commoditizes the category, an unmistakable sensibility is the structural defense. Every surface is a small bet that "made by someone with taste" reads through the pixels.

## How to use this document

This is a **descriptive map of the system as it actually exists in production**, with notes on intent and known divergence — not a spec to conform to mechanically. It exists so that:

- Implementation sessions have standing context and stop re-deriving patterns.
- New surfaces have a precedent to reach for.
- Accumulated reasoning survives between sessions.

**Navigate it by judgment.** Where the system is inconsistent, that's recorded honestly in [§9 Known inconsistencies](#9-known-inconsistencies). Some of that drift is worth reconciling; some is "special-snowflake for a reason I had at the time." The maker (Kenji) resolves drift incrementally, by looking at production and reacting — not by pre-emptive sweep. The document is the map; the design intuition is what navigates it.

When you add a new pattern that genuinely doesn't fit the existing vocabulary, **update this document as part of the same work.** Living documentation, not a frozen spec.

> **Units:** the app root font-size is `62.5%` (Cedar `reset.css`), so **`1rem = 10px`** everywhere. All px values below assume this.
>
> **Tokens:** `src/parchment/tokens.css`. **Component catalog:** `src/parchment/CLAUDE.md`.

---

## 1. Color semantics

Two registers are the spine of the system and are honored consistently:

- **Burgundy = editorial / content.** Titles, proper nouns, content section labels, narrative emphasis, destructive text.
- **Lapis = chrome / actions.** Tool labels, navigation, page headings, primary action buttons, form field labels.

The user reads "this is content" vs "this is a tool control" without thinking about it. That split is load-bearing — protect it.

### Inks (text / structural emphasis)

| Token | Hex | Role |
|---|---|---|
| `--par-color-title` | `#7a1f1f` | **Burgundy.** Editorial emphasis: titles, proper nouns, small-caps content labels, callout rules, destructive text. |
| `--par-color-title-deep` | `#58180d` | Deep burgundy — hover/active on burgundy actions. |
| `--par-color-text` | `#222` | Standard body ink. |
| `--par-color-text-secondary` | `#555` | Taglines, type-lines, sidebar metadata, subtitles. |
| `--par-color-text-muted` | `#6b6b6b` | Recessive metadata, inactive states, italic chrome. |
| `--par-color-text-disabled` | `#ccc` | Disabled. |
| `--par-color-callout-text` | `#2c2c2a` | Near-black body inside callouts / read-aloud. |

> Body ink is `#222`; callout body is `#2c2c2a`. Two near-identical inks coexist for historical reasons — treat both as "standard ink," don't agonize over which.

### Action colors (chrome layer)

The lapis + slate palette is intentionally **unprefixed** (`--color-action-*`) — these are shared cros.land chrome tokens the parchment system consumes, not parchment-internal colors.

| Token | Hex | Role |
|---|---|---|
| `--color-action-rest` | `#365A85` | Mid lapis — primary fill at rest. |
| `--color-action-hover` | `#2A4D70` | Deeper lapis — hover; **also the lapis used for text/outline on cream** (reads as an action signal at small sizes). |
| `--color-action-active` | `#1F3A5C` | Deepest lapis — pressed. |
| `--color-action-text` | `#FBF7F0` | Cream — text on lapis fill. |
| `--color-action-secondary-rest` | `#5A7A9A` | **Slate.** Secondary/ghost actions, recessive nav. The azurite to lapis's ultramarine — same family, lower importance. |
| `--color-action-luminous-*` | `#A0B8D0`/`#3D6BA0`/`#1F3A5C`/`#142640` | Cabochon gradient stops — **rare** premium upsell only. |

> **Naming hazard:** `--par-color-action-hover`/`-active` are *burgundy* washes (`rgba(122,31,31,…)`), while `--color-action-hover`/`-active` are *lapis*. The `par`-prefixed action aliases (`--par-color-action-primary #2A4D70`, `-muted #5A7A9A`) mirror the chrome lapis for in-system consumers. Easy to grab the wrong one — check the prefix.

### Surfaces

Color temperature rises with editorial emphasis: cool page → warm cream container → warmer tan nested zone. Each step warmer is a step further from "chrome" toward "content."

| Token | Hex | Semantic |
|---|---|---|
| `--par-color-surface-page` | `#EAEEF2` | **Cool page background ("the desk").** Chrome register. Cream surfaces lift off it via warm-on-cool contrast, not brightness. |
| `--par-color-surface` | `#FBF7F0` | **Editorial card paper.** Item/NPC card interiors, expanded card bodies, input backgrounds. |
| `--par-color-surface-card` | `#FEFBF4` | **Lifted content surface — the workhorse.** Every main editorial container, sidebars, form cards, output cards. |
| `--par-color-callout-bg` | `#f3ebda` | **Warm tan — nested editorial zone.** Read-aloud (editorial register), lore callouts, active tab pill, active sidebar row, data-options panel. The semantic: "this content has its own zone within the document." |
| `--par-color-callout-bg-light` | `#F8F2E3` | Softer tan — related-section metadata cards. |
| `--par-color-callout-bg-deep` | `#ede2cb` | Deeper tan — hover/active on tan blocks. |
| `--par-color-field-bg` | `rgba(243,235,218,.5)` | Form-input interior (semi-transparent tan, tints whatever it sits on). |
| `--par-color-readaloud-bg` | `#D8E3EF` | **Pale lapis — sourcebook boxed-text.** See [§7 Read-aloud](#read-aloud-two-canonical-registers). |
| `--par-color-readaloud-rule` | `#7A8FAA` | Mid-lapis side rule for the boxed-text frame. |
| `--par-color-tooltip-bg` | `#fefcf7` | Tooltip "sticky note" (lighter than card paper). |

**There is one editorial container surface: cream `#FEFBF4`.** (A "slightly-warm-white workspace form" tier was considered and rejected — the distinction was too subtle to be worth a second surface. Dense forms and editorial documents share the one cream.)

### Borders / radius / shadow

| Token | Value | Use |
|---|---|---|
| `--par-color-border` | `#e8e2d4` | Light card/field edges, footer dividers. |
| `--par-color-border-strong` | `#c9b99a` | **Standard editorial container & card border** (used at 0.5px). |
| `--par-color-border-deep` | `#b8a685` | Hover/focus emphasis on tinted surfaces. |
| `--par-color-divider` | `#e2dccd` | Row dividers (sidebar list rows). |
| `--par-radius-sm` / `-md` / `-lg` | `3px` / `4px` / `12px` | Inline / card / soft-block. |
| `--par-color-card-shadow` | `0 1px 3px rgba(122,50,30,.04)` | Warm-toned (red-leaning) lift shadow — never a cool Material grey. |

**Tokens-only:** component CSS references `--par-*`/`--color-action-*`, never hex literals. (A handful of raw cream literals on secondary surfaces remain — see [§9 M4](#medium--surface--token-drift).)

---

## 2. Typography

**Font:** Source Serif 4 (`--par-font-serif`) for all content — real 400/500/600 weight files, no faux-bold. `--par-font-sans` (`-apple-system…`) is reserved for compact chrome: the `primary-outline` button, `ParCardButton`'s base, `ParTabToggle`.

**Weights:** **400** body · **500** "label or quiet medium" (small uppercase labels, taglines, rest-state sidebar names, italic lore) · **600** "structural or active" (form/section titles, feature names, active sidebar rows, in-prose entity anchors, bolded keywords, destructive-confirm).

### Heading patterns

| Tier | size | weight | color | caps | example |
|---|---|---|---|---|---|
| Page H1 | 36px (→28px ≤600px) | 600 | lapis `#2A4D70` | none | `.page-heading__title` (item, dungeon) |
| Form section H2 | 24px | 600 | lapis `#2A4D70` | none | `.form-heading` |
| Entity title — **header** | 28px | 600 | burgundy | none | NPC/dungeon/setting names (`.*-card-name`) |
| Entity title — **display** | 29px | **400** | burgundy | none | item card name (`.item-card-name`) |
| Sub-entity title (within a document) | 25–26px | 600 | burgundy | small-caps 0.02–0.04em | room title, lore/timeline subject |
| Section eyebrow | 11px | 600 | burgundy | uppercase 0.18em | `.dungeon-section-heading` |

**Entity titles have two registers — the difference is layout density, and it's intentional:**

- **Header title (28px / 600):** NPC, dungeon, and setting names. These titles live in **busy, tabbed, multi-section views** — the name is one of several competing elements (subtitle, metadata, tab bar above), so it carries a little weight to anchor the layout. Normalized to 28px / 600 / no-caps.
- **Display title (29px / 400):** the **item card name only**. The item view is a **single-entity focused "hero"** — the name is the sole large element, sitting in generous whitespace above an italic muted type/rarity line. A large, *light* burgundy serif reads as an elegant illuminated display title there; bumping it to 600 makes it a chunky header that competes with nothing and loses the understatement. The lightness is doing the work. **This is a deliberate special case, not drift** — it was tried at 600 and reverted because understated read better in the hero context.
- **Sub-entity title (25–26px / 600 / small-caps):** a dungeon room, a timeline's subject — sections *within* a document. Small-caps marks "this is a section inside a document," not "this is the document."

The takeaway for new surfaces: a title's weight follows its **context density**, not a single global rule. Focused hero view → light display; busy multi-section view → 600 header.

### Small-caps structural label — the canonical micro-pattern

The system's most reused atom. Center of gravity: **11px, letter-spacing 0.12em, weight 500, `text-transform: uppercase`**. Color follows the register split: **burgundy on content, lapis on chrome.**

- Content labels (burgundy): `ParReadAloud` label, encounter metadata/section labels, quest-hook labels.
- Chrome labels (lapis): `ParField` form labels, encounter form-section headers, `ParModal` title.
- Louder section headers bump to 12–13px / weight 600 (`ParAccordion` label); display titles use `font-variant-caps: small-caps` and tighten letter-spacing to 0.02–0.04em.

Range in the wild: size 11–26px, letter-spacing 0.04em–0.18em (small labels cluster firmly at 0.12em). When in doubt, **11px / 0.12em / 500 / uppercase**.

### Body / tagline / read-aloud prose

| Pattern | size | line-height | color | style |
|---|---|---|---|---|
| Body prose | 16px | 1.65 | `#222` | roman |
| Read-aloud body (editorial component) | 15px | 1.7 | `#222` | italic |
| Page tagline | 16px | 1.6 | `#555` | italic |
| Card subtitle | 12px | — | `#6b6b6b` | italic |

---

## 3. Emphasis density (load-bearing pattern)

Burgundy weight-600 inline emphasis works for **narrative anchors** — proper nouns and named entities that recur (Hold-Lord Thragar, a faction leader). It breaks down in high mechanical density (encounter stats, magic-item mechanics) where many terms want emphasis and the page becomes a forest of bold burgundy.

Two emphasis tiers:

- **Burgundy weight 600 (anchor emphasis):** proper nouns, named entities, recurring references. Sparingly — ~2–3 per paragraph max. Stays meaningful *because* it's reserved.
- **Standard-ink weight 600 (stat emphasis):** mechanical values (distances, AC, HP, DCs, damage, durations). Quiet but findable, a lower register so dense content reads as prose with findable values.

---

## 4. Surfaces in practice

Every main editorial container resolves to cream `#FEFBF4` (`--par-color-surface-card`). Two consistent sub-families, both cream:

- **Tabs-in-one-card** (item, setting, dungeon): 8px radius + warm shadow, no border. Tabs + content panel share one card.
- **Form card** (statblock, location, book, lore, encounter): 12px radius + 0.5px `--par-color-border-strong`.

Sidebar (`GeneratorLayout`) is also `#FEFBF4` with a 0.5px `border-strong` right edge.

**Known gap:** the NPC generator renders generated content bare on the page background instead of a cream card — the one tool missing the editorial container ([§9 M2](#medium--surface--token-drift)).

---

## 5. Component vocabulary

The full primitive catalog lives in `src/parchment/CLAUDE.md`. This section captures the load-bearing *patterns*, including ones not yet extracted to primitives.

### Editorial container
The bounded cream zone where content lives — `#FEFBF4`, tan border (or shadow), generous padding. Tab content zones, generated-content views, expanded card bodies.

### Expandable card
Collapsed = title + one-line teaser; expanded = full content with section labels. **Surface is `--par-color-surface` `#FBF7F0` + border** (not warm tan). Three toggle treatments currently coexist — burgundy 90° chevron (faction/monster cards), slate 180° chevron + 3px burgundy top accent (NPC card), and no-caret title-click (lore spine nodes); see [§9 M5](#medium--surface--token-drift). Pattern proven across 5 sites; primitive extraction (`ParExpandableCard`) pending a consolidation pass.

### Tabs — three intentional registers
Distinct by surface context, **by design** — do not unify:

- **`ParTabs`** — warm-tan pill (`#f3ebda`), burgundy small-caps label, **`--par-radius-md` = 4px**, serif 15px. Editorial content view-switch (item/setting/dungeon top tabs).
- **`ParTabToggle`** — burgundy 2px underline, sans small-caps. Content-surface toggle (dungeon room Description/Form).
- **`ParToggleGroup`** — filled-lapis pill in a tinted container. Chrome view-switch (statblock column layout).

### Sidebar item row (statblock convention — fully aligned across tools)
Padding `1.3rem 1.6rem`; 1px `--par-color-divider` bottom border; name 16px/500; metadata small-caps 13px `#555` 0.08em uppercase. **Active row = warm-tan `#f3ebda` fill with a lapis `#2A4D70`/600 name** (the *fill* is tan, only the *name* is lapis). Used by all six sidebar tools.

### Sidebar footer
Full-width "+ New X" (`ParButton primary`) → 0.5px divider → "Data options" lapis disclosure → tan panel with "Delete all" (burgundy danger). Identical across the six tools, but **copy-pasted into each main component** rather than slotted from `GeneratorLayout` ([§9 L3](#low--local--hygiene)).

### Buttons
Two primitives, two registers:

**`ParButton` (chrome/lapis):**
- `primary` — solid lapis fill, serif 16px/600. The prominent form CTA ("Generate X"). Consistent across every tool.
- `primary-outline` — lapis outline, **sans** 13px/500, compact. Repeated data-row create/view actions ("Create Setting," "View in X"). Lighter so 6+ rows don't read as a wall of blue.
- `secondary` — slate outline, serif. Supporting alternative (Cancel beside Generate).
- `secondary-filled` — cream fill + lapis text/outline, serif. Edit/Cancel pairs that must read as real buttons on a busy surface.
- `luminous` — cabochon gradient. Rare special moments (premium upsell). Don't proliferate.

**`ParCardButton` (editorial/burgundy):** base transparent + 1px border + burgundy text, sans 15px.
- `create` — lapis. The *one* lapis affordance in the card register: "+ insert," "+ Add event."
- `affirmative` — burgundy outline. Reversible action on existing content: Edit / Regenerate.
- `primary` — filled burgundy. Committing action: Keep / Save / Update.
- `muted` — gray. Cancel / Remove.
- (legacy `default`/`ghost`/`link`/`danger` still in use on older consumers.)

**`ParAddNewButton`** — full-width dashed lapis "+ Add new X," dashed→solid on hover. "Create new" register, one step below `primary-outline`.

**`ParConfirm`** — confirm dialog: `ParCardButton muted` (Cancel) + `danger`/`primary` (confirm). The right tool for destructive confirmation — though the per-tool delete-all modals don't use it yet ([§9 H4](#high--same-semantic-different-treatment)).

The conceptual-action mapping is consistent for **Generate** (`ParButton primary`) and **sidebar "+ New X"** (`ParButton primary`). It has drifted for **Edit / Delete / Cancel / cross-tool Create** — documented in [§9](#9-known-inconsistencies), not yet reconciled.

### Forms
One editorial form treatment across all tools: warm-tan input backgrounds (`--par-color-field-bg`), burgundy/lapis small-caps labels via `ParField`, lapis `primary` submit. Within dense forms, thin tan rules between logical sections provide structural breaks. (There is no separate "workspace form" surface — see §1.)

### Read-aloud — TWO canonical registers
"Read this to the players" deliberately has two visual treatments for two content moods. **Both are canonical** — this is vocabulary expansion, not drift:

- **Pale-lapis sourcebook** (`--par-color-readaloud-*`, `#D8E3EF` bg, `#7A8FAA` side rules, near-black text — the WotC boxed-text frame). For **room/location descriptions** — physical-space prose that mirrors sourcebook convention. Consumer: dungeon `RoomDescription`, `BossStatblockPrompt`. Not yet a shared component (built ad hoc from the tokens).
- **Warm-tan editorial** (`ParReadAloud.vue` — `#f3ebda` bg, 3px burgundy left rule, burgundy small-caps label, italic serif body). For **dramatic scene-setting**: encounter opening passages, triggered narrative moments, book excerpts. Consumers: encounter generator, book generator.

Rule of thumb: *describing a place the players are standing in* → pale-lapis sourcebook; *narrating a moment to set a scene* → warm-tan editorial.

---

## 6. Voice and copy

- **Sentence case for all user-readable text** (button labels, headings, section titles); small-caps structural labels render uppercase via CSS. This is applied across the tools. The rule for what stays capitalized: **acronyms** (`NPC`, `HTML`), **proper tool names** (`View in NPC Generator`), and **proper format/product names** (`Markdown`, `Homebrewery`). Everything else — entity-type words included — is lowercase: "Generate dungeon," "+ New setting," "Generate abilities," "Save changes," "Create dungeon," "Move to folder," "Copy as plain text." When adding a new label, follow this rule rather than Title Case. (Legacy and chase-tracker tools are out of scope and still carry Title Case.)
- **Editorial placeholders** (a strong, consistent pattern worth keeping): an in-world noun phrase trailing into `…` or "or leave blank for a surprise." E.g. `A fallen empire, a coastal cult, a lost language…`; `A scheming guildmaster, or leave blank for a surprise`.
- **Taglines** under headings: italic `#555`, brief, evocative. Seeded variants link back to the source entity (`From your {{ type }} <a>{{ name }}</a>`).
- **Cross-references between tools** build the integration moat by making the ecosystem visible at the point of relevance: `Related NPCs` sections, per-stub `Create X` + `View in X Generator`, `Re-scan Lore` as an inline lapis text-link. Keep surfacing these.
- **Read-aloud labels** can be contextual ("When the first handler transforms") or generic ("Read aloud"). `ParReadAloud` supports contextual labels; only the encounter generator currently feeds them. Prefer contextual where the content supports it.

---

## 7. Semantic differentiation (load-bearing rule)

Not every visual element should normalize to one register. Some carry semantic weight that *justifies* visual distinction. When tempted to unify for typographic tidiness, ask: **do these serve genuinely different semantic functions?** If yes, preserve the difference.

Live examples, all intentional:

- **Difficulty signaling** (encounter) is *warning communication* — "your players might die." A desaturated-but-real warning gradient, green→red, scaling with threat. Defined in `EncounterMonsterList.vue` and the parchment block in `EncounterGenerator.vue`:

  | Difficulty | bg | text |
  |---|---|---|
  | none | transparent | `#6b6b6b` |
  | trivial | `#e8e2d4` | `#6b6b6b` |
  | easy | `#dde7d3` | `#4d6a3c` |
  | medium | `#efe6c6` | `#87691d` |
  | hard | `#ecd7c2` | `#9b5730` |
  | deadly | `#ebcfca` | `#8e3830` |

- **Rarity signaling** (item) is *taxonomic classification*. Quiet small-caps, **no per-rarity color** — Common and Legendary render identically. Category, not warning.
- **Read-aloud register** is *voice distinction* (player-facing vs GM-facing), and within player-facing, *content mood* (sourcebook room vs dramatic scene). See [§5](#read-aloud--two-canonical-registers).

These differences are the system working as intended. Don't unify them.

---

## 8. Load-bearing rules

The decisions that shouldn't be casually violated:

1. **Burgundy = content emphasis & proper-noun anchors; lapis = chrome & primary actions.** Never burgundy as a primary button color outside destructive contexts.
2. **Warm tan `#f3ebda` = "nested editorial zone within a document."** Use consistently across cards' accents, callouts, active tabs, active sidebar rows, the editorial read-aloud.
3. **Editorial containers are cream `#FEFBF4` with tan borders.** The page background (`#EAEEF2`) never gets tan borders.
4. **At high mechanical density, two-tier emphasis** (burgundy anchors, standard-ink-600 stats). Don't bold-burgundy everything mechanical.
5. **Source Serif 4 for content; sans only for compact chrome.** `1rem = 10px`.
6. **Sentence case** for user-readable text; small-caps (uppercase via CSS) for structural labels.
7. **Active editorial tab = warm-tan pill** (`#f3ebda`, `--par-radius-md`/4px, burgundy small-caps). Never a lapis underline for tabs inside editorial containers.
8. **Preserve semantic differentiation** ([§7](#7-semantic-differentiation-load-bearing-rule)) — difficulty/rarity/read-aloud are intentionally distinct.

---

## 9. Known inconsistencies

> **Preserve or reconcile case-by-case.** This is honest record, not a backlog with a deadline. Most of these aren't breaking anything; the system can carry them. Resolve by judgment, incrementally, when something feels wrong in production. Several pure-hygiene items were already fixed while writing this document (noted ✅).

### High — same semantic, different treatment
- **H1 — "Edit" has ~6 treatments.** `ParCardButton link`/`affirmative`/`default`, `ParButton secondary-filled`/`secondary`, and raw slate ghosts (dungeon monster, setting faction). The vocabulary defines one: `ParCardButton affirmative`.
- **H2 — "Delete single entity" has ~5 treatments.** `ParCardButton danger` (canonical for cards), `ParButton secondary` (encounter, lore), `ParCardButton muted` (quest hooks), raw burgundy ghosts (dungeon monster, setting faction), `CardFooterAction danger`+emoji (statblock).
- **H3 — "Cancel" has 3+ treatments, plus a bug.** `secondary` / `secondary-filled` / `ParCardButton muted` — and `ParCardButton danger` is misused *as* Cancel on Setting/Dungeon Overview tabs (danger styling on a non-destructive action). That one's a genuine bug worth fixing whenever those tabs are next touched.
- **H4 — Delete-all confirm is a raw `.delete-all-modal__confirm` button duplicated ×7**, each re-defining the burgundy-fill CSS, while `ParConfirm` already solves modal-destructive. Root gap: `ParButton` has no solid-destructive variant. Resolution options: adopt `ParConfirm` for delete-all, or add a filled-destructive `ParButton` variant.
- **H5 — Cross-tool "Create X" splits lapis registers.** Item generator uses `ParButton secondary` (slate); setting generator uses `primary-outline` (lapis) for the same promote action. `primary-outline` is the documented choice — item's slate is the outlier.
- **H6 — (resolved as intentional)** Read-aloud's two treatments are now both canonical ([§5](#read-aloud--two-canonical-registers), [§7](#7-semantic-differentiation-load-bearing-rule)). No longer drift.

### Medium — surface / token drift
- **M2 — NPC generator has no editorial container** (renders on page bg). Wrap in a `surface-card` container to match the other tools.
- **M3 — ✅ Fixed.** The `#fdfbf6` fallback (≠ the real `#FBF7F0` token) was normalized across ~20 sites.
- **M4 — Raw cream literals on secondary surfaces** with matching tokens: `#fdf8ef` (banners), `#f8f3e8` (≈`callout-bg-light`), `#f4f2ed` (cool-grey dashboard/relationship surfaces), `#fafaf6`, `#fefdf9` (statblock inputs). Map each to its nearest token when touched.
- **M5 — Expandable-card divergence:** three toggle treatments and a border-weight split (lore nodes 1px `--par-color-border` vs others 1.5px `--par-color-border-strong`). Converge when extracting `ParExpandableCard`.
- **M6 — ✅ Resolved.** NPC/dungeon/setting names normalized to the 28px / 600 header register; the item card name kept as the 29px / 400 **display** register (focused hero context — understated reads better there). Two intentional registers, see [§2](#heading-patterns). Sub-entity small-caps titles (room, lore subject) unchanged.

### Low — local / hygiene
- **L1 — ✅ Fixed.** Dead `#ffffff` `.output-card` rule removed from the encounter generator (live cream rule preserved).
- **L2 — ✅ Fixed.** Dead "candy" difficulty palette removed (parchment palette is the only definition now).
- **L3 — Sidebar footer duplicated per-tool** (6×). Consider slotting from `GeneratorLayout`. Low now (byte-identical); a drift vector.
- **L4 — ✅ Fixed.** `src/parchment/CLAUDE.md` Cedar carve-out list updated (only the 2 `DashboardPlus` icon-deletes remain).
- **L5 — ✅ Fixed.** Stale `#FBF8F1` page-surface comment in legacy `Tabs.vue` corrected to `#EAEEF2`.
- **L6 — ✅ Fixed.** Swept button/label copy to sentence case across all tools: entity-type words lowercased ("Generate dungeon," "+ New setting," "Generate abilities," "Re-generate actions," "Save changes," "Create dungeon," "Edit overview," "Generate full NPC," "Move to folder," "Re-scan lore," "Hide export," "Copy as plain text"). **Kept capitalized** (rule): acronyms (`NPC`, `HTML`), proper tool names (`View in NPC Generator`), and proper format/product names (`Markdown`, `Homebrewery`). Left alone: dev-only chrome ("Show Dev"), the compound "Backup / Restore" control label, and the legacy/chase-tracker tools (out of scope).

### Intentional — do NOT reconcile
- Difficulty (warning) vs rarity (taxonomy) registers.
- The three tab registers (warm-tan pill / burgundy underline / lapis pill).
- Read-aloud's two registers (sourcebook vs editorial).
- `ParCardButton create` being the one lapis affordance in the burgundy card register.

---

## 10. Patterns deferred

Extractions earn their existence through real duplicated need, not speculative scaffolding.

- **`ParIconButton`** (round ghost icon — ✕ delete / ⓘ info) — multiple real consumers now exist: the 2 `DashboardPlus` icon-deletes still on Cedar, plus the hand-rolled `.related-*-remove` / `.npc-stub-delete` ✕ buttons and the encounter party-group remove. Strong candidate to build next.
- **`ParExpandableCard`** — pattern shipped across 5 sites (faction/monster/NPC cards, lore spine). Extract in a consolidation pass; resolve M5's three toggle treatments then.
- **Pale-lapis read-aloud component** — the sourcebook boxed-text frame is built ad hoc from `--par-color-readaloud-*` in the dungeon generator. Extract a `ParBoxedText` (or similar) if a second tool needs the sourcebook register. (`ParReadAloud` already covers the warm-tan editorial register.)
- **Filled-destructive `ParButton` variant** — the gap behind H4's 7× duplicated delete-all button. Build it or route delete-all through `ParConfirm`.
- **Maker presence in chrome** — currently absent; editorial voice carries it. Build an About page eventually as a findable maker home.

---

## 11. How to extend this system

1. **Look at established patterns first.** Most new surfaces have a precedent: editorial container, expandable card, the two read-aloud registers, sidebar row/footer, the button variants.
2. **Don't invent new tokens** unless an existing one genuinely doesn't fit. Verify first.
3. **When ambiguous, default to:** cream `#FEFBF4` for editorial containers · warm tan `#f3ebda` for nested zones · burgundy for content, lapis for chrome · Source Serif 4 · sentence case · the 11px/0.12em/500 small-caps label.
4. **Consult this document before design decisions during implementation.** If a decision contradicts it, surface the question — don't silently drift.
5. **When the system genuinely needs to evolve,** update this document in the same work that introduces the pattern. The doc is the map; keep it accurate.
