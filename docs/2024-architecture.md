# 2024 Statblock Support — Architecture Handoff

> This design was settled in strategy sessions; treat it as the contract. Don't reinvent it.

## Context

cros.land's statblock generator is adding D&D 2024 (5.5e) format support as a premium
launch feature. Alongside it: an archetype system that makes generated monsters
mathematically CR-accurate — a differentiator no competitor claims.

## Data files (in `src/data/`)

- **`srd52-monsters.json`** — 329 stat blocks parsed from SRD 5.2.1 (CC-BY-4.0).
  Structured: stats, saves, ac, hp + hp_formula, initiative, cr/xp/pb, sections
  (Traits/Actions/etc. as name+text), and a `derived` object per monster.
  55 entries carry benign `flags` (missing PB in source → computed; CR-0 "XP 0 or 10"
  convention). Data is otherwise validated: all HP dice math, mods, and saves check out.
- **`archetype-chassis-spec.json`** — the design spec. Chassis formulas, structural
  tiers, 8 archetype modifier profiles, lint rules. Fitted empirically from the 329
  blocks (HP r²=0.92, attack r²=0.90, DC r²=0.90; AC intentionally loose at r²=0.55).

## The three-layer architecture (non-negotiable)

1. **Chassis (deterministic JS).** CR → baseline AC/HP/attack/DC/PB via the formulas
   in the spec. CR < 1 uses the anchor table. **The LLM never generates numbers.**
2. **Archetypes (multipliers on the chassis).** brute / defender / skirmisher /
   artillery / controller / lurker / support / swarm. Each is hp_mult, ac_mod,
   damage_mult, attack_mod, dc_mod plus `required_slots` (structural obligations).
   Structural tier (from CR) decides slot *counts*; archetype decides slot *contents*.
3. **LLM layer (flavor only).** Given exact numbers and named slots — e.g. "one
   movement trait; one melee action at +6 to hit, ~13 avg damage; theme: fungal
   horror" — the model names abilities and writes text. Use SRD exemplars from the
   spec (`srd_exemplars`) as few-shot examples pulled from srd52-monsters.json.

Post-generation, a **lint pass** parses the block and enforces the spec's
`lint_rules`. Out-of-budget numbers are auto-corrected (regenerate flavor only,
never accept LLM numbers); missing required_slots reject the generation.

## 2024 format conventions (renderer + lint)

- Three-column ability table: STAT | SCORE | MOD | SAVE (no separate Saving Throws line)
- Initiative line: bonus + passive score, e.g. `Initiative +3 (13)`
- Attack phrasing: `*Melee Attack Roll:* +5, reach 5 ft. 8 (1d8 + 3) Slashing damage.`
  (never "Melee Weapon Attack: +5 to hit")
- Saves: `*Constitution Saving Throw*: DC 13 ... *Failure:* ... *Success:*`
- Conditions capitalized (Prone, Grappled, Charmed…)
- Spellcasting lives in Actions, no spell slots; Bonus Actions get their own section
- CR line: `CR 5 (XP 1,800; PB +3)`

## Build order (one layer per session; each has its own test surface)

> **Status (2026-07-18): all five steps shipped.** Chassis (`chassis/chassis.mjs`),
> resolver (`chassis/slot-plan.mjs`), renderer (`format-2024/render.mjs`), lint
> (`format-2024/lint.mjs`), and prompt/UI integration (`format-2024/generate.mjs`,
> `Statblock2024.vue`, toggle + archetype select in `StatblockGenerator.vue`).
> Deferred follow-ups live in `plans/statblock-2024-*.md`. Flavor quality
> remains manual-production-review; prompts are in `format-2024/generate.mjs`.
>
> **Stat-coherence pass (2026-07-20, grognard audit):** three derivations
> official blocks obey are now engine-owned. (1) Attack bonus = striker-stat
> mod + PB: `attackStatFor` reads the LLM's own score ranking (mental beats
> physical only when strictly higher, so casters strike with INT/WIS/CHA)
> and assembly RAISES that stat to the required mod — raise-only, because
> the corpus deviates in 17/329 blocks and always LOW (Will-o'-Wisp DEX 28,
> attack +4). (2) Attack damage's flat bonus IS the striker mod
> (`attackDamageDiceFor`, known pre-call since mod = attack − PB); save
> damage is pure dice (`saveDamageDiceFor`, SRD convention). (3) HP formula
> bonus = dice count × CON mod (`hpFormulaFor`); HP is stamped from the
> formula's exact average. Plus corpus-calibrated gates: condition allowlist
> (compound "X and Y conditions" validates per token), 2024 damage-type and
> area-term capitalization (deterministic fixes), and an asymmetric escape-DC
> band (official escape DCs run low, never high). **Ability-score ceiling
> (Ghuuloth finding, CR 28):** the chassis clamps attack ≤ PB + 10 and save
> DC ≤ PB + 18 — beyond that no score (cap 30) can derive them; archetype
> attack/dc mods at CR 27+ otherwise overshoot. Do NOT add a per-save-ability
> stamp (tried, reverted after the Slinky Boulder finding): the ability in
> "DC n <Ability> saving throw" is what the TARGET rolls, not the DC's
> source — keying on it inflates statlines toward 30/30/30. DC derivability
> is already guaranteed through the striker stat (the caps keep save_dc ≤
> attack_bonus + 8 everywhere). 2014 style gates from the same audit:
> legendary "(N Actions)" normalizes to "(Costs N Actions)" at the legacy
> gates, and "must make a DC n X saving throw or <condition>" deterministically
> becomes "must succeed on ... or" (phrasing-save-or). Attack dice prefer the
> larger die within ±1 closeness ("4d6 + 9", never "6d4 + 9"). Tar Grendel
> round: defense-overlap (a type both resisted and immune drops from
> resistances), the 2014 nonmagical clause sorts to the end of the defense
> line after a semicolon, and entry names lose leading articles — all
> corpus-zero-FP. Naming: BATHOS_RE bans comedic/diminutive words in
> pickName ("Slinky Boulder"), and both naming prompts demand menace-keeping
> words and agent/creature head nouns (plain-object heads only for actual
> animated objects). Disshadow round: trait-recharge (zero corpus traits
> recharge; (Recharge X-Y) in a trait name deterministically becomes
> (1/Day)), entry-name-coinage ("Thul-eg" — official hyphenated ability
> names join FULL English words, so a sub-4-letter fragment marks a coinage;
> the fix call may RENAME these, the one exception to keep-the-name, with
> references following), and prompt rules: ability names are plain English
> (coinages belong to creature names only) and coined creature names build
> from sound, never by gluing English words ("Disshadow"). Swarm round: the
> 2014 prompt was missing the "Swarm of Tiny <Creature>" type clause (2024
> had it) — now both prompts carry it AND a swarm-type correctable backstops
> it; case conventions normalize at the edition gates (2014 lowercases
> defense lines and the type line, keeping the size term capitalized in
> "swarm of Tiny beasts"; the 2014→2024 direction re-capitalizes). Full
> Ktzzikt round (CR 30 swarm): AREA save damage budgets HALF the turn total
> (DMG counts area damage double — the full-total skeleton prescribed a
> 311-point cone); saveDamageDiceFor penalizes dice counts past 15 so big
> budgets climb dice sizes (24d12, never 89d6 — corpus ceiling is 26 dice);
> entry-name-design-term rejects slot/budget vocabulary in entry names
> ("(Half-Damage Mode)", renameable); and the swarm half-damage slot
> instruction prescribes the official embedded form ("or <reduced> damage
> if the swarm has half of its Hit Points or fewer") after two inverted
> (buff-below-half) generations. Also: PASSIVE_SLOT_CHECKS are
> case-insensitive (2014's lowercase defense lines failed the swarm slots →
> doomed structural regen — the "more failures" incident; note the provider
> now serves deepseek-v4-flash, not V3). Full
> archetype-crossover sweep (owner request): the no-legendary-preamble
> instruction now exists in BOTH prompts (was 2014-only; both cards
> auto-render the preamble), and Statblock.vue mirrors the support
> solo-warning note. The 2014 static exemplar (vs 2024's archetype-matched
> ones) is deliberate — no licensed 2014-phrased corpus exists.
>
> **Repair ladder (2026-07-19):** the original "reject → regenerate flavor"
> contract is refined: rejects route through the cheapest sufficient tool —
> deterministic string surgery (zero calls) → targeted fix calls (entry
> rewrites / seed-leakage rename maps) → full regeneration only for
> structural rejects. See generate.mjs ENTRY_FIXABLE / STRUCTURAL_REJECTS.
>
> **2014 retrofit shipped (2026-07-18):** both editions run the engine. The
> 2014 edition uses 2014 phrasing rules/skeletons and converts to the legacy
> model shape (`toLegacyModel`) so the classic display/export chain works
> unchanged. The pre-engine two-part pipeline survives behind
> `localStorage['statblock-legacy-2014']` until production-verified.

1. **Chassis module + tests.** Pure functions: `chassisFor(cr)`, `pbFor(cr)`,
   `applyArchetype(chassis, archetype)`. Test against known SRD values.
2. **Archetype/tier resolver + tests.** CR + archetype → slot plan (counts, types,
   required slots). Test tier breakpoints (0.5→1, 2→3, 7→8, 12→13, 20→21).
3. **2024 renderer.** JSON block model → 2024-format output. Snapshot against SRD
   exemplars (Aboleth, Air Elemental, Allosaurus) rendered from srd52-monsters.json.
4. **Lint module + tests.** Parse generated output, enforce lint_rules. Feed it
   deliberately broken blocks; assert each rule catches its violation class.
5. **Prompt integration.** Slot-filling prompts with few-shot exemplars. 2014/2024
   output toggle in the Vue UI (default 2024, remember choice in localStorage).

## UI decisions (settled 2026-07-18, for the step-5 session)

- **Archetype selection is a form field with "Auto" default.** The archetype select
  replaces the old Build select (Random/Stronger Defense/Balanced/Stronger Offense)
  when 2024 mode is on; Build remains for the 2014 legacy path. "Balanced" stays
  available as a no-archetype / raw-chassis option — the 8 archetypes have no
  neutral member. Saved regen params map across (Stronger Defense → defender,
  Stronger Offense → brute or artillery, Balanced → baseline, Random → random).
- **Auto resolution order.** User picked an archetype → no call. Auto + name or
  description present → micro LLM call ("pick one of the 8, reply `{archetype}`")
  before chassis math — archetype must be known before any numbers are computed.
  Auto + all inputs blank → random client-side pick, no call.
- **Gating is usage-cap, not feature-lock.** "Premium-gated like existing statblock
  generation" means archetypes inherit the existing free-tier daily cap. The full
  archetype select, including manual choice, is available to everyone — do NOT
  lock the dropdown. The differentiator should be tasteable on the free tier.
- **Dynamic labels.** One-line helper text under the select swaps with the selected
  archetype (e.g. Brute — "Hits hard, soaks damage, easy to hit. Ogres, zombies.").
  Ground the examples in the spec's `srd_exemplars`.
- **No role chip on the card** (owner reversal during production review,
  2026-07-18): the "Role: Lurker (auto-picked)" chip read as noise against the
  canonical card. The auto-picked role surfaces in the Regenerate panel instead
  ("Auto picked X — choose a role above to override"), where it's actionable.
  The support solo-warning note (spec `solo_warning`) stays above the card.
- **2014 archetype retrofit is deferred.** Chassis/archetype math is edition-agnostic;
  a 2014 upgrade is mostly a renderer + prompt variant. Add a `plans/` entry for it
  during the step-5 session.
- **Edit-chrome parity + edition conversion (2026-07-19, owner feedback).**
  Both cards share one edit UX (footer ✏️ Edit / 💾 Save / ↩️ Cancel,
  per-entry 🔄 Re-roll + ✕ bars, "+ Add" affordances, same premium message);
  the 2024 card gained whole-section re-rolls, the 2014 card lost its
  hover-reveal buttons. The form's rules-version control is a compact switch,
  not a segmented bar. **Edition switching is cache-and-swap (owner design,
  same day):** `ParTabToggle` tabs on the card's top edge ("2014 rules /
  2024 rules" — burgundy content-surface register: two printings of one
  document, per the owner's placement pick) flip between the editions. The active edition IS the saved object; the converted
  counterpart caches on it as `other_edition` (flip = swap + persist,
  instant and lossless — downstream consumers always read the active
  object). Flipping toward a missing edition shows the target card as a
  blurred DETERMINISTIC shape mapping (`toLegacyModel`/`fromLegacyModel` —
  real numbers, source-phrased prose) under a one-time premium Convert
  button (`convertEdition`). Any edit/re-roll/regenerate invalidates the
  cache — never sync edits across editions. **Editing is IN PLACE (owner call, second pass same
  day): the 2014 card's convention won — fields swap to inputs where they
  live in the card layout (name in the header, scores inside the ability
  grid with live MOD/SAVE, entries inside their sections). The 2024 card's
  original separate-form edit body was replaced; never reintroduce a
  form-style edit surface on either card.** Edit mode keeps the two-column
  flow (owner call): textareas are fixed-height so multicol only rebalances
  on add/remove/re-roll, and break-inside keeps each entry editor whole. A ⇄ footer action converts a saved block between
  editions via `convertEdition` — deterministic shape mapping + one phrasing
  rephrase call, phrasing-lint gated, numbers never rebalanced.
- **2024 card inline editing shipped (2026-07-19)**: full field/entry editing
  on `Statblock2024.vue`, engine band hints on numeric edits (advisory — the
  user may break the math on purpose; only the pipeline may not), score edits
  recompute saves preserving proficiency, per-entry AI re-rolls via
  `rerollEntry`. CR/PB/initiative stay engine-owned (Regenerate changes them).
- **2024 display component (settled from owner's reference screenshots, 2026-07-18).**
  New `Statblock2024.vue` with its own scoped "canonical textbook" stylesheet —
  owner explicitly OK'd deviating from parchment inside the card to match the
  official 2024 MM look. `Statblock.vue` (2014) stays untouched; the toggle picks
  the display component. Spec distilled from references:
  - Card: cream field, thin warm-brown rounded border; name in dark-red small caps;
    italic size/type/alignment line; section headers in red small caps over a thin
    full-width rule; entry names bold-italic with trailing period.
  - AC left + Initiative right on one line; HP and Speed lines below.
  - Ability table is the official 3-group grid: two rows (STR/DEX/CON, INT/WIS/CHA),
    each cell `ABBR · score · MOD · SAVE`, small `MOD SAVE` headers per group,
    tinted mod/save columns. This is display-only — the markdown renderer
    (format-2024/render.mjs) keeps its linear table for export/prompt use.
  - Fonts: approximate the official small-caps serif with a free/system stack +
    font-variant; official fonts are licensed, don't ship them.
  - Text phrasing follows SRD 5.2.1 (no `*Hit:*` marker — the official MM has it,
    the SRD drops it; our data is the licensed source).
  - Existing two-column toggle logic carries over.
  - Optional, owner's call at review: D&D Beyond-style keyword tinting for
    conditions/skills. Cheap (condition vocabulary already in lint) but a taste
    decision; skippable for v1.

## Testing philosophy (owner's standing rules)

- Test behavior, not implementation shape. Assert on return values, routing,
  data integrity, integration boundaries.
- **No tests asserting prompt string contents.** LLM output quality is verified by
  manual production review, not string-matching unit tests.
- Fewer tests that catch real bug classes > many code-shape tests.
- Propose test categories before writing them.

The lint layer and chassis math are the automated-test surface. Flavor is
production-review only.

## Legal

SRD 5.2.1 content requires this attribution (site footer / tool page):

> This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1")
> by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The
> SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International
> License, available at https://creativecommons.org/licenses/by/4.0/legalcode.

No other Wizards attribution. "Compatible with fifth edition" is permitted wording.
Do **not** import 2024 Monster Manual content beyond the SRD subset. Generated
original content is fine.

## Existing constraints (from prior sessions)

- API keys never in bundles: no `VITE_` prefix on secrets, all LLM calls through
  the server-side proxy.
- Creature intelligence layer (`creature-intelligence.json`, 327 creatures) is
  edition-agnostic — do not modify it for this work; map by monster name.
- Vue components embedded in WordPress (Genesis); premium gating via
  `kenji-premium-gate.php` → `data-premium` attribute. The 2024 toggle itself is
  free; archetype generation is premium-gated like existing statblock generation.
