# parchment investigation — current production state

**Phase 1 deliverable.** Read-only inventory of the parchment design system as it exists in production today. This is the foundation for writing `parchment.md`. It documents what *is*, flags inconsistencies, and recommends resolution directions. **No code was changed.**

> **Stop-for-review gate:** Kenji reviews this, decides which inconsistencies to reconcile (and which are intentional), then gives go-ahead before `parchment.md` is written in Phase 2.

A few global facts that frame everything below:

- **Root font-size is `62.5%`** (Cedar `reset.css`), so **`1rem = 10px`** everywhere. All px conversions below assume this.
- **Two color registers are deliberate:** **burgundy** `#7a1f1f` = editorial/content; **lapis** `#365A85`/`#2A4D70` = chrome/actions. This split is the spine of the system and is honored consistently.
- Tokens live in `src/parchment/tokens.css`; the component catalog is `src/parchment/CLAUDE.md`.

---

## 1. Color token inventory

Every token defined in `src/parchment/tokens.css`, with its real value and how it's actually used.

### Inks (text / emphasis)

| Token | Hex | Semantic | Usage reality |
|---|---|---|---|
| `--par-color-title` | `#7a1f1f` | Burgundy — editorial emphasis | Titles, proper nouns, small-caps content labels, destructive text, callout rules. Heavily + consistently used. |
| `--par-color-title-deep` | `#58180d` | Deep burgundy | Hover/active on burgundy actions, filled-burgundy hover. |
| `--par-color-text` | `#222` | Standard ink (body) | Default body prose. |
| `--par-color-text-secondary` | `#555` | Secondary ink | Taglines, type-lines, sidebar metadata, subtitles. |
| `--par-color-text-muted` | `#6b6b6b` | Muted ink | Recessive metadata, inactive states, italic chrome. **Brief says `#888780` — production is `#6b6b6b`.** |
| `--par-color-text-disabled` | `#ccc` | Disabled ink | — |
| `--par-color-callout-text` | `#2c2c2a` | Near-black callout ink | Body inside callouts/read-aloud. (Body token `--par-color-text` is `#222`; callout uses `#2c2c2a` — two near-identical "ink" values coexist.) |

### Action colors (chrome layer — unprefixed by design)

| Token | Hex | Role |
|---|---|---|
| `--color-action-rest` | `#365A85` | Mid lapis — primary fill rest |
| `--color-action-hover` | `#2A4D70` | Deeper lapis — hover, and the lapis used for text/outline on cream |
| `--color-action-active` | `#1F3A5C` | Deepest lapis — pressed |
| `--color-action-disabled` | `#9DAFC1` | Desaturated |
| `--color-action-text` | `#FBF7F0` | Cream (text on lapis fill) |
| `--color-action-secondary-rest` | `#5A7A9A` | Faded slate — secondary ghost |
| `--color-action-secondary-hover-bg` | `rgba(90,122,154,.08)` | Slate hover tint |
| `--color-action-luminous-*` | `#A0B8D0` / `#3D6BA0` / `#1F3A5C` / `#142640` | Cabochon gradient stops (premium upsell only) |

Parchment-prefixed aliases mirror the above for in-system consumers: `--par-color-action-primary #2A4D70`, `--par-color-action-primary-hover-bg`, `--par-color-action-muted #5A7A9A`, `--par-color-action-destructive-hover rgba(122,31,31,.06)`. `--par-color-action-hover/-active` are *burgundy* tints (`rgba(122,31,31,.06/.12)`) — note the name collision: `--par-color-action-*` hover/active are burgundy washes, while `--color-action-*` hover/active are lapis. Easy to confuse.

### Surfaces

| Token | Hex | Semantic |
|---|---|---|
| `--par-color-surface-page` | `#EAEEF2` | Cool page bg ("the desk"). Chrome register. |
| `--par-color-surface` | `#FBF7F0` | Editorial card paper (item/NPC card interiors, input bg, expanded card body). |
| `--par-color-surface-card` | `#FEFBF4` | Lifted content surface — **the workhorse**: every main editorial container, sidebars, form cards, output cards. |
| `--par-color-callout-bg` | `#f3ebda` | Warm tan nested callout. Read-aloud (the component), lore callouts, active tab pill, active sidebar row, data-options panel, faction/quest accents. |
| `--par-color-callout-bg-light` | `#F8F2E3` | Softer tan — related-section metadata cards. |
| `--par-color-callout-bg-deep` | `#ede2cb` | Deeper tan — hover/active on tan blocks. |
| `--par-color-field-bg` | `rgba(243,235,218,.5)` | Form-input interior (semi-transparent tan). |
| `--par-color-tooltip-bg` / `-text` / `-shadow` | `#fefcf7` / `#2c2c2a` / `rgba(60,40,20,.08)` | Tooltip "sticky note". |
| `--par-color-readaloud-bg` | `#D8E3EF` | **Pale lapis** boxed-text surface (WotC frame). |
| `--par-color-readaloud-bg-deep` | `#C5D4E5` | Deep variant / chrome accent. |
| `--par-color-readaloud-text` | `#1a1a1a` | Near-black body for the lapis box. |
| `--par-color-readaloud-rule` | `#7A8FAA` | Mid-lapis side rule for the boxed-text frame. |

> **Brief reconciliation:** the brief's surface section assumes container interior `#FCFAEF`, nested cream `#FCFAEF`, and a distinct workspace-form `#fdfbf5`. **None of those values exist as tokens.** Production reality: container = `#FEFBF4` (`--par-color-surface-card`), card-family paper = `#FBF7F0` (`--par-color-surface`), nested tan = `#f3ebda`. The "slightly-warm-white workspace form" tier the brief describes **is not implemented** (see §3 and §8-M1).

### Borders / radius / shadow

| Token | Value | Use |
|---|---|---|
| `--par-color-border` | `#e8e2d4` | Light card/field edges, dividers in footers. |
| `--par-color-border-strong` | `#c9b99a` | **Standard** editorial container & card border (0.5px). |
| `--par-color-border-deep` | `#b8a685` | Hover/focus emphasis on tinted surfaces. |
| `--par-color-divider` | `#e2dccd` | Row dividers (sidebar list rows). |
| `--par-radius-sm/md/lg` | `3px / 4px / 12px` | Inline / card / soft-block. |
| `--par-color-card-shadow` | `0 1px 3px rgba(122,50,30,.04)` | Warm-toned lift shadow. |

### Consumption notes (from grep sweep)
- `--par-color-surface-card` (~31 sites): every main editorial container resolves to it.
- `--par-color-surface` (~40+ sites): card interiors + inputs — but frequently paired with a **wrong fallback `#fdfbf6`** that ≠ the token's real `#FBF7F0` (see §8-M3).
- `--par-color-surface-page` (only **4** direct sites): works because `App.vue` sets it as body bg.
- Callout tokens well-adopted (`-bg` ~65, `-bg-light` 15, `-bg-deep` 8).

---

## 2. Typography inventory

**Font:** Source Serif 4 (`--par-font-serif`) throughout content; `--par-font-sans` reserved for compact chrome (`primary-outline` button, `ParCardButton` base, `ParTabToggle`). Real 400/500/600 weight files (no faux-bold).

### Heading patterns

| Tier | Selector | file:line | size | weight | color | caps |
|---|---|---|---|---|---|---|
| Page H1 | `.page-heading__title` | `ItemGenerator.vue:913`; `DungeonGenerator.vue:700` | 36px (→28px ≤600px) | 600 | lapis `#2A4D70` | none |
| Form section H2 | `.form-heading` | `ItemGenerator.vue:1055` | 24px | 600 | lapis `#2A4D70` | none |
| Editorial title — item | `.item-card-name` | `ItemGenerator.vue:3289` | 29px | **400** | burgundy | none |
| Editorial title — NPC | `.npc-card-name` | `NPCCard.vue:758` | 28px | **500** | burgundy | none |
| Editorial title — dungeon | `.dungeon-card-name` | `OverviewTab.vue:265` | 28px (→22px) | **500** | burgundy | none |
| Editorial title — room | `.room-title` | `RoomDescription.vue:807` | 25px | **600** | burgundy | small-caps |
| Editorial title — lore/timeline | `.timeline-header__subject` | `LoreGenerator.vue:979` | 26px | 600 | burgundy | small-caps |
| Section eyebrow | `.dungeon-section-heading` | `OverviewTab.vue:348` | 11px | 600 | burgundy | uppercase `0.18em` |

**Finding:** entity titles share a ~28–29px band but **weight drifts 400 → 500 → 600** across tools, and some add small-caps (room, lore) while others don't (item, NPC, dungeon). No single canonical entity-title spec.

### Small-caps structural label — the canonical micro-pattern

Cluster of values; the **center of gravity is 11px / `0.12em` / weight 500 / uppercase**, burgundy on content & lapis on chrome:

| Selector | file:line | size | letter-spacing | weight | register |
|---|---|---|---|---|---|
| `.par-field__label` | `ParField.vue:51` | 11px | 0.12em | 500 | **lapis** (chrome) |
| `.par-read-aloud__label` | `ParReadAloud.vue:43` | 11px | 0.12em | 500 | burgundy |
| `.encounter-metadata__label` / `__section__label` | `EncounterGenerator.vue:2261,2274` | 11px | 0.12em | 500 | burgundy |
| `.quest-hook__label` | `QuestHookTab.vue:930` | 12px | 0.12em | 500 | burgundy |
| `.form-section h2` (MONSTERS/PARTY) | `EncounterGenerator.vue:2126` | 12px | 0.10em | 600 | **lapis** (chrome) |
| `.par-accordion__label` | `ParAccordion.vue:174` | 13px | 0.10em | 600 | burgundy (lapis variant) |
| `.par-tabs__tab` | `ParTabs.vue:75` | 15px | 0.12em | 500→600 active | muted→burgundy |
| `.dungeon-section-heading` | `OverviewTab.vue:348` | 11px | **0.18em** | 600 | burgundy |
| `.par-modal__title` | `ParModal.vue:150` | 19px | 0.04em | 600 | lapis, small-caps |

Ranges: size **11–26px**, letter-spacing **0.04em–0.18em** (small labels cluster at 0.12em; display titles tighten to 0.02–0.04em; `dungeon-section-heading` is the 0.18em outlier). Weight cleanly splits **500 (label/quiet) vs 600 (structural/active)**.

### Body / tagline / read-aloud

| Pattern | file:line | size | line-height | color | style |
|---|---|---|---|---|---|
| Body prose | `RoomDescription.vue:769` | 16px | 1.65 | `#222` | roman |
| Item feature body | `ItemGenerator.vue:3371` | ~15.5px | 1.5 | `#222` | roman |
| Read-aloud body (component) | `ParReadAloud.vue:53` | 15px | 1.7 | `#222` | italic |
| Page tagline | `ItemGenerator.vue:2529` | 16px | 1.6 | `#555` | italic |
| NPC subtitle | `NPCCard.vue:767` | 12px | — | `#6b6b6b` | italic |

**Weight convention (confirmed):** 600 = "structural or active" (form/section titles, feature names, active sidebar rows, in-prose entity anchors, strong keywords, destructive-confirm); 500 = "label or quiet medium" (small uppercase labels, taglines, rest sidebar names, italic lore).

---

## 3. Surface hierarchy inventory

Every main editorial container resolves to **cream-lifted `#FEFBF4`** (`--par-color-surface-card`). Two consistent sub-families:

| Tool | Container | bg | border |
|---|---|---|---|
| Item | `.item-view` (`ItemGenerator.vue:2741`) | `surface-card` | none (shadow) |
| Setting | `.setting-tabs` (`SettingGenerator.vue:2504`) | `surface-card` | none (shadow) |
| Dungeon | `.content-container` (`DungeonGenerator.vue:819`) | `surface-card` | none (shadow) |
| Encounter | `.output-card` (`EncounterGenerator.vue:2222`) | `surface-card` | 0.5px `border-strong` |
| Statblock | `.form-card` (`StatblockGenerator.vue:1151`) | `surface-card` | 0.5px `border-strong` |
| Location | `.form-container` (`LocationGenerator.vue:138`) | `surface-card` | 0.5px `border-strong` |
| Book | `.book-form-card` (`BookGenerator.vue:256`) | `surface-card` | 0.5px `border-strong` |
| Lore/timeline | `.timeline-card` (`LoreGenerator.vue:955`) | `surface-card` | 0.5px `border-strong` |
| Sidebar | `.sidebar` (`GeneratorLayout.vue:161`) | `surface-card` | 0.5px right `border-strong` |
| **NPC** | `#npc-content-area` (`NPCGenerator.vue:208`) | **none — renders on page bg** | none |

- **Sub-family A** (tabs-in-one-card): item/setting/dungeon — 8px radius + shadow, no border.
- **Sub-family B** (form card): statblock/location/book/lore/encounter — 12px radius + 0.5px `border-strong`.

**Key finding:** the **"workspace form" / slightly-warm-white `#fdfbf5` tier the brief describes does not exist.** The encounter generator — the brief's example workspace form — uses the same cream `#FEFBF4` as everyone else. There *is* a dead `background-color: #ffffff; border: 1px solid #e2e2e2;` rule at `EncounterGenerator.vue:1755-1756`, overridden by the live cream rule at `:2222`. So the workspace-form concept is currently a **decision to make in Phase 2**, not an existing pattern to document.

**Drift found** (details in §8): NPC missing an editorial card; dead `#ffffff` encounter rule; pervasive `#fdfbf6` fallback ≠ `#FBF7F0` token; scattered raw cream literals (`#fdf8ef`, `#f8f3e8`, `#f4f2ed`, `#fafaf6`, `#fefdf9`).

---

## 4. Component pattern inventory

### Tabs / segmented controls (three, intentionally distinct registers)

| Component | file | active treatment | color | radius | font |
|---|---|---|---|---|---|
| **ParTabs** | `ParTabs.vue` | warm-tan **pill** | burgundy text `#7a1f1f`, fill `#f3ebda` | `--par-radius-md` = **4px** | serif 15px uppercase 0.12em, 600 active |
| **ParTabToggle** | `ParTabToggle.vue` | burgundy **underline** (2px) | `#7a1f1f` | — | sans 11.5px uppercase 0.06em |
| **ParToggleGroup** | `ParToggleGroup.vue` | filled-**lapis pill** | lapis | 4px | serif |

Consumers: **ParTabs** → dungeon top tabs (`DungeonGenerator.vue:169`), item tabs (`ItemGenerator.vue:190`), setting tabs (`SettingGenerator.vue:184`). **ParTabToggle** → dungeon room Description/Form (`RoomDescription.vue:3`). **ParToggleGroup** → statblock column switcher (`StatblockGenerator.vue:164`). No Cedar tabs anywhere.

> **Brief reconciliation:** the brief says active tab = "warm-tan pill, **6px** radius, **13px** burgundy small-caps." Pill + burgundy + small-caps ✓, but radius is **4px** (`--par-radius-md`), not 6px; font is **15px** (`1.5rem`), not 13px. (13px is the *sidebar metadata* size — the brief conflated the two.)

### Expandable card (collapsed teaser → expanded) — **three** treatments, not two

| Instance | file:line | collapsed surface | border | toggle |
|---|---|---|---|---|
| Setting faction | `FactionsTab.vue:712` | `surface` `#FBF7F0` | 1.5px `border-strong` | burgundy chevron, 90° |
| Dungeon monster | `MonstersTab.vue:530` | `surface` `#FBF7F0` | 1.5px `border-strong` | burgundy chevron, 90° |
| NPC card | `NPCCard.vue:654` | `surface` (fallback `#fdfbf6`) | 1.5px `border-strong` + 3px burgundy top accent | **slate** chevron, 180° |
| Item lore spine node | `LoreBuilderTab.vue:1071/1113` | transparent → `#FBF7F0` | **1px** `border` `#e8e2d4` | **no caret** (title click) |
| Lore generator spine node | `LoreGenerator.vue:1071` | transparent → `#FBF7F0` | 1px `border` `#e8e2d4` | no caret |

> **Brief reconciliation:** the brief frames this as "factions+monsters on a light convention vs others on warm tan `#f3ebda`." **No expandable card uses `#f3ebda` as its body.** Factions + monsters match each other exactly (`#FBF7F0` + 1.5px `border-strong` + burgundy 90° chevron). The real divergences: **three toggle treatments** (burgundy 90° chevron / slate 180° chevron+top-accent / no-caret), and **border-weight drift** (lore nodes 1px `border` vs others 1.5px `border-strong`).

### Read-aloud — **TWO conflicting treatments** (highest-value finding)

1. **`ParReadAloud.vue`** — warm-tan `#f3ebda` + 3px burgundy left rule, burgundy small-caps label, italic serif 15px body. Consumers: `EncounterGenerator.vue:237`, `BookGenerator.vue:69`.
2. **`--par-color-readaloud-*` token set** — **pale lapis `#D8E3EF`** WotC boxed-text frame (left+right `#7A8FAA` rules, near-black `#1a1a1a` text). Consumers: dungeon `RoomDescription.vue:825`, `BossStatblockPrompt.vue:88` (and the tokens are reused as chrome accents in `ParModal`/`DataManagerModal`).

Same semantic ("read this to players") rendered two visually unrelated ways. The token comments describe the pale-lapis sourcebook register; the component does warm-tan. **These directly contradict.**

### Sidebar saved-item row — fully aligned (statblock convention)

All six tools (item/lore/statblock/encounter/setting/dungeon) match: padding `1.3rem 1.6rem`, 1px `--par-color-divider` bottom border, name 16px/500, metadata small-caps 13px `#555` 0.08em uppercase, **active row fill warm tan `#f3ebda`** with **lapis name `#2A4D70`/600**.

> **Brief reconciliation:** the brief (and an earlier session note) call the active row a **"lapis active fill."** It's a **warm-tan `#f3ebda` fill**; only the *name text* is lapis. Worth correcting in the doc.

### Sidebar footer / Data options — shared pattern, **duplicated per-tool**

All six tools carry an identical footer (full-width "+ New X" `ParButton primary`, 0.5px divider, lapis "Data options" disclosure → `#f3ebda` panel → burgundy "Delete all"). Markup is **byte-identical but copy-pasted into each main component** (`ItemGenerator.vue:21`, `LoreGenerator.vue:23`, `StatblockGenerator.vue:46`, `EncounterGenerator.vue:38`, `SettingGenerator.vue:36`, `DungeonGenerator.vue:16`) rather than slotted from `GeneratorLayout`. Consistent today, drift risk tomorrow.

### Primitive catalog (from `src/parchment/`)
`ParButton`, `ParCardButton`, `ParAddNewButton`, `ParCallout`, `ParField`, `ParInput`, `ParTextarea`, `ParSelect`, `ParCheckbox`, `ParCardInput`, `ParCardTextarea`, `ParCardSelect`, `ParReadAloud`, `ParTooltip`, `ParTabToggle`, `ParTabs`, `ParModal`, `ParConfirm`, `ParAccordion`/`ParAccordionGroup`, `ParToggleGroup`/`ParToggleButton`.

---

## 5. Button & action treatment inventory

### Variant definitions

**`ParButton` (chrome/lapis):** `primary` (solid lapis fill, serif 16px/600 — prominent CTA), `primary-outline` (lapis outline, **sans** 13px/500 — repeated data-row create/view), `secondary` (slate outline, serif — Cancel beside primary), `secondary-filled` (cream fill + lapis text/outline — Edit/Cancel on busy surfaces), `luminous` (cabochon gradient — rare premium upsell).

**`ParCardButton` (editorial/burgundy):** base transparent + 1px border + burgundy text, **sans** 15px/400. Variants: `create` (lapis — the only lapis in the card register, for "+ insert"/"+ Add event"), `affirmative` (burgundy outline — Edit/Regenerate), `primary` (filled burgundy — Keep/Save/commit), `muted` (gray — Cancel/Remove), plus legacy `default`/`ghost`/`link`/`danger`.

**`ParAddNewButton`:** full-width 1px **dashed** lapis "+ Add new X", dashed→solid on hover. One step below `primary-outline` ("create new" vs "act on existing").

**`ParConfirm`:** confirm dialog; footer = `ParCardButton muted` (Cancel) + `ParCardButton danger`/`primary` (confirm). Already exists and solves modal-destructive — but the delete-all modals don't use it (see §8-H4).

### Conceptual-action map (abridged — full table in agent notes)
Generate/submit → `ParButton primary` (consistent across all tools ✓). Create-new sidebar → `ParButton primary` "+ New X" ✓. In-tab add → mixed (`ParAddNewButton` vs `ParCardButton create` vs `ParCardButton default`). Edit → **6 treatments**. Delete-single → **5 treatments**. Cancel → **3+ treatments**. Delete-all confirm → raw `.delete-all-modal__confirm` duplicated ×7. Export → mostly `ParButton secondary` (lore uses `ParCardButton affirmative`). Premium → `luminous`.

### Cedar carve-outs — **`src/parchment/CLAUDE.md` is stale**
Of the 9 documented held-on-Cedar sites, only **2 `<cdr-button>` remain**: `DashboardPlus.vue:26` and `:88` (icon-only delete). The setting `LocationsTab` (×2) and dungeon `RoomDescription` link-nav have **already migrated** (RoomDescription now uses `ParCardButton link` at `:118`; dungeon `MonstersTab` delete is now a raw burgundy ghost + `ParConfirm`). CLAUDE.md's "What's deferred" section should be updated.

---

## 6. Voice & copy conventions

- **Case: intended sentence case, inconsistently applied.** Item Generator is clean sentence case (`+ New magic item`, `Generate magic item`). NPC/Dungeon generators and **all cross-tool buttons** drift to Title Case: `+ New NPC`, `Generate NPC`, `Create Dungeon`, `View in NPC Generator`, `Create Setting`, `Re-scan Lore`. Micro-drift even within sentence case: `Save Changes` (item) vs `Save changes` (dungeon monster). The cross-tool "Create X / View in X Generator" family is the biggest Title-Case cluster.
- **Editorial placeholders** (strong, consistent): `A fallen empire, a coastal cult, a lost language…` (`ItemGenerator.vue:141`), `A scheming guildmaster, or leave blank for a surprise` (`NPCGenerator.vue:151`), `e.g. A sunken Mesopotamian ziggurat called Edutu — or leave blank for a surprise.` (`DungeonGenerator.vue:133`). Pattern: in-world noun phrase + `…`/"or leave blank for a surprise."
- **Taglines** (italic `#555`): `Mechanics, lore, and quest hooks for your campaign.`; `Create balanced, export-ready 5e statblocks — no math required.` Seeded variant links back to source: `From your {{ seedSourceType }} <a>{{ seedSourceName }}</a>`.
- **Cross-references** between tools: section headers `Related NPCs`/`Related Dungeons`/`Related Settings`/`Related Places`; per-stub `Create X` + `View in X Generator`; `Re-scan Lore` as a lapis text-link with `Scanning…` loading state.
- **Read-aloud labels:** `ParReadAloud` supports contextual labels, but only the encounter generator feeds them (`:label="item.label || 'Read aloud'"`); Book passes generic `'Excerpt'`. The contextual capability is largely unused.

---

## 7. Special-purpose patterns (intentional differentiation)

### Difficulty signaling (encounter) — warning register, by design
Per-difficulty desaturated palette (defined identically in `EncounterMonsterList.vue:449` and the parchment block `EncounterGenerator.vue:2385`):

| Difficulty | bg | text |
|---|---|---|
| none | transparent | `#6b6b6b` |
| trivial | `#e8e2d4` | `#6b6b6b` |
| easy | `#dde7d3` | `#4d6a3c` |
| medium | `#efe6c6` | `#87691d` |
| hard | `#ecd7c2` | `#9b5730` |
| deadly | `#ebcfca` | `#8e3830` |

Badge: serif 10.5px/600 uppercase 0.08em, radius 3px. **Note:** a **dead "candy" palette** (`#c8e6c9`/`#fff9c4`/etc.) still sits at `EncounterGenerator.vue:1559-1598`, overridden by the parchment block — should be deleted (§8-L).

### Rarity signaling (item) — taxonomic register, by design
Quiet small-caps, **no per-rarity color**: sidebar tag 13px `#555` uppercase 0.08em; card subtitle `"{type}, {rarity}"` italic `#6b6b6b`. Common and Legendary render identically.

**These two registers are intentionally distinct** (saturated warning gradient vs monochrome taxonomy) and should be **preserved, not unified**.

---

## 8. Inconsistencies found (prioritized, with recommended resolution)

### High — same semantic, different visual treatment

- **H1 — "Edit" has 6 treatments.** `ParCardButton link` (item), `affirmative` (lore/quest), `default` (NPC card, Overview tabs), `ParButton secondary-filled` (statblock), `secondary` (encounter), and raw slate ghosts (dungeon monster `MonstersTab.vue:163`, setting faction `FactionsTab.vue:102`). The vocabulary defines exactly one: `ParCardButton affirmative`. **Resolution:** standardize Edit → `affirmative`; retire the raw slate ghosts and the `link`/`secondary-filled`/`secondary` Edit usages.
- **H2 — "Delete single entity" has 5 treatments.** `ParCardButton danger` (item/setting/dungeon/NPC), `ParButton secondary` (encounter, lore), `ParCardButton muted` (quest hooks), raw burgundy ghosts (dungeon monster, setting faction), `CardFooterAction danger` + emoji (statblock). **Resolution:** pick the canonical destructive-secondary (`ParCardButton danger`) for in-card deletes; decide statblock footer's place separately.
- **H3 — "Cancel" has 3+ treatments and a semantic bug.** `ParButton secondary` (delete-all modals), `secondary-filled` (edit panels), `ParCardButton muted` (cards), plus **`ParCardButton danger` misused *as Cancel*** on Setting/Dungeon Overview tabs (`OverviewTab.vue:93/84`) — danger styling on a non-destructive action. Plus raw `.add-*-cancel` buttons. **Resolution:** Cancel → `muted` (card) / `secondary` (chrome); fix the danger-as-cancel bug.
- **H4 — Delete-all confirm is a raw button duplicated ×7**, each re-defining the burgundy-fill CSS, inside a `ParModal` — while **`ParConfirm` already solves this**. Sites: `ItemGenerator.vue:92`, `NPCGenerator.vue:110`, `SettingGenerator.vue:106`, `DungeonGenerator.vue:84`, `EncounterGenerator.vue:106`, `StatblockGenerator.vue:243`, `LoreGenerator.vue:87`. **Resolution:** either adopt `ParConfirm` for delete-all, or extract a real filled-destructive `ParButton` variant. (This is the single largest copy-paste divergence — and `ParButton` having no solid-destructive variant is the root gap.)
- **H5 — Cross-tool "Create X" promote splits lapis registers.** Item generator uses `ParButton secondary` (slate); setting generator uses `ParButton primary-outline` (lapis) for the same "promote stub → real entity." `primary-outline` is the documented choice for repeated create rows, so item's slate is the outlier. **Resolution:** standardize on `primary-outline`.
- **H6 — Read-aloud has two unrelated visual registers** (warm-tan `ParReadAloud` vs pale-lapis WotC frame in dungeon). **Resolution needed (design call):** is read-aloud warm-tan-editorial or pale-lapis-sourcebook? Pick one; the dungeon `RoomDescription` boxed text and the `ParReadAloud` component should converge. The brief assumes warm-tan; the tokens assume pale-lapis. **This is the most important decision to settle before writing `parchment.md`.**

### Medium — surface / token drift

- **M1 — Workspace-form surface tier doesn't exist.** The brief specifies slightly-warm-white `#fdfbf5` for dense forms; production has no such tier (encounter = `#FEFBF4` like everyone else). **Resolution (design call):** either (a) drop the workspace-form concept from `parchment.md`, or (b) decide to introduce it and add a token + apply to encounter/statblock. Document the chosen direction, don't claim it exists.
- **M2 — NPC generator has no editorial container.** Generated content renders bare on the page bg (`#EAEEF2`), unlike all other tools' cream card. **Resolution:** wrap NPC output in a `surface-card` container to match.
- **M3 — `#fdfbf6` fallback ≠ `#FBF7F0` token** across ~15 sites (`ItemGenerator.vue:2849`, `NPCCard.vue:655/1024`, `ParCheckbox.vue`, `ParCard*` inputs, several dungeon/setting skeletons & forms). Harmless while the token loads; wrong intent. **Resolution:** normalize fallbacks to `#FBF7F0`.
- **M4 — Raw cream literals on secondary surfaces** that have matching tokens: `#fdf8ef` (NPC/item banners), `#f8f3e8` (≈`callout-bg-light`, in related-NPC/quest sections), `#f4f2ed` (cool-grey dashboard/relationship surfaces), `#fafaf6`, `#fefdf9` (statblock inputs). **Resolution:** map each to the nearest token.
- **M5 — Entity-title weight drift** (400 item / 500 NPC+dungeon / 600 room+lore) at a shared ~28px size; some small-caps, some not. **Resolution:** pick one canonical editorial-title spec (recommend 600, decide small-caps yes/no).

### Low — local / dead code

- **L1 — Dead `#ffffff` `.output-card` rule** (`EncounterGenerator.vue:1755`) overridden by the cream rule at `:2222`. Delete.
- **L2 — Dead "candy" difficulty palette** (`EncounterGenerator.vue:1559-1598`) overridden by parchment palette at `:2372`. Delete.
- **L3 — Sidebar footer duplicated per-tool** (6×). Consider slotting from `GeneratorLayout`. Low now (byte-identical), but a drift vector.
- **L4 — `src/parchment/CLAUDE.md` Cedar carve-out list is stale** (3 of 9 sites migrated). Update.
- **L5 — Stale token comment** in `Tabs.vue:158` cites `#FBF8F1` for the page surface (real value `#EAEEF2`).
- **L6 — Title/sentence-case drift** in copy (§6). Normalize the cross-tool "Create X / View in X Generator" family to sentence case if that's the convention.

### Intentional — do NOT reconcile
- Difficulty (warning) vs rarity (taxonomy) registers — keep distinct.
- Three tab registers (warm-tan pill / burgundy underline / lapis pill) — distinct by surface context, by design.
- `ParCardButton create` being the one lapis affordance in the burgundy card register — intentional.

---

## 9. Brief ↔ production reconciliation (read before Phase 2)

The brief's draft `parchment.md` carries several values that **don't match production**. Flagging so the document captures reality (or makes an explicit decision to change reality):

| Brief says | Production is | Action for Phase 2 |
|---|---|---|
| Muted gray `#888780` | `#6b6b6b` (`--par-color-text-muted`) | Use `#6b6b6b`. |
| Container interior `#FCFAEF` | `#FEFBF4` (`--par-color-surface-card`) | Use `#FEFBF4`. |
| Nested cream `#FCFAEF` | `#FBF7F0` (`--par-color-surface`) | Use `#FBF7F0`. |
| Workspace form `#fdfbf5` tier | Does not exist | Decide: drop, or introduce (M1). |
| Active tab pill 6px radius / 13px | 4px (`--par-radius-md`) / 15px | Use real values, or change code to match doc. |
| Sidebar active = "lapis fill" | Warm-tan `#f3ebda` fill + lapis *name* | Correct the description. |
| Read-aloud = warm-tan + burgundy rule | Two treatments (warm-tan component **and** pale-lapis tokens) | Resolve H6 first. |
| Lapis dark `#1F3A5C` / lifted `#365A85` | ✓ matches (`--color-action-active` / `-rest`) | OK. |
| Burgundy `#7A1F1F`, page `#EAEEF2`, callout `#F3EBDA` | ✓ match | OK. |

---

## Decisions needed before Phase 2

1. **Read-aloud register (H6):** warm-tan editorial, or pale-lapis sourcebook? (Biggest one.)
2. **Workspace-form surface (M1):** drop the concept, or introduce the `#fdfbf5` tier for real?
3. **Which High inconsistencies to reconcile now** vs document-as-known-debt (H1–H5).
4. **Canonical entity-title spec** (M5): weight + small-caps.
5. **Sentence vs Title case** (L6): commit to sentence case and normalize the cross-tool button family?

Once these are settled, Phase 2 writes `parchment.md` to the repo root, documents the load-bearing decisions, lists the agreed inconsistencies in "Inconsistencies to reconcile," and adds a pointer from `CLAUDE.md`.
