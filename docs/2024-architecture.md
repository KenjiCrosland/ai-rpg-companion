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
> now serves deepseek-v4-flash, not V3). Field run (five live generations,
> 2026-07-20 — all succeeded; all three 2024 blocks lint-clean): lint bands
> now compare against the SKELETON per-attack value, not the raw budget (at
> low CR the budget is unreachable with the mandatory flat mod);
> entry-name-self (a trait named "Uulmoth" on Uulmoth — renameable);
> legendary-cost-2024 strips "(Costs N Actions)" from 2024 legendary names
> (2024 uses the uses pool; also prompt-banned); resistance-conditions
> moves condition tokens out of Damage Resistances into immunities;
> swarm-heal-contradiction (an entry healed a swarm whose own trait forbids
> it — keyed on the swarm clause so the Aboleth's target-side curse stays
> legal); swarm-half-damage substance check (a slot TAG without the actual
> reduced-damage clause no longer passes); area-circle → Sphere and
> centred → centered deterministic fixes; movement-mode casing normalizes
> at the edition gates (2024 "Swim", 2014 "swim"). Rubric round (owner's
> external review of two random blocks): NEW rules — phrasing-surprised
> (2024 removed the surprised state; zero corpus), entry-name-bathos
> ("Slurp" as a stealth trait), attack-mod-coherence (attack flat bonuses
> must match a non-CON ability mod; style-tier; corpus quirk: Giant Frog).
> NEW seed dimension `disposition` (guardian/trickster/warden/herd/colony
> options) — both random rolls had landed lurker + neutral evil + sibilant
> S-names; disposition now drives the archetype pick and alignment
> diversity. ADJUDICATED, no change: "DPR under-delivery" is the spec's
> fitted lurker trade (damage_mult 0.6, nova 2× — official lurkers
> under-run the DMG table the same way, and both reviewed blocks were
> skeleton-EXACT); "DC 21 not derivable" is wrong by the striker-derivation
> contract (STR 30 → 8+6+9 = 23 ≥ 21; officials undershoot);
> escape-DC-by-formula contradicts the corpus (21/39 official escape DCs
> off-formula); LR-without-Legendary-Actions is officially sanctioned
> (2024 Balor, Pit Fiend). The systematic DPR answer stays
> plans/statblock-trait-weight-crosscheck.md (calculateCR backstop). Full
> archetype-crossover sweep (owner request): the no-legendary-preamble
> instruction now exists in BOTH prompts (was 2014-only; both cards
> auto-render the preamble), and Statblock.vue mirrors the support
> solo-warning note. The 2014 static exemplar (vs 2024's archetype-matched
> ones) is deliberate — no licensed 2014-phrased corpus exists.
>
> **Severity tiering (2026-07-22) → never-fail generation (2026-07-24):**
> the gate philosophy evolved in two steps. First, STYLE-tier rejects
> (phrasing/caps/naming/spelling/seed-leakage — wrong WORDS) shipped with a
> warn while mechanical rejects threw. Then the owner drew the line at the
> right place: GENERATION never fails once an assembled block exists —
> up to three fix rounds (was two) — but only MECHANICAL rejects earn
> rounds past the first; cosmetic-only leftovers ship after one attempt
> (calls spent polishing warts that ship silently anyway are waste) — then
> ANY surviving warts ship, stamped on the
> monster as `lint_warnings` (console + debugging only — NOT surfaced in
> the UI, owner call: don't invite users to second-guess output they're
> happy with). A failed generation is
> strictly worse UX than a blemish. RE-ROLLS keep the stricter gates
> (style-tier/degraded relaxation only): a failed re-roll safely preserves
> the original entry, so there failure IS the cheap outcome — never replace
> a fine entry with a warty one. STYLE_TIER_REJECTS in generate.mjs remains
> the re-roll routing table. **Degraded-model
> mode (2026-07-24):** when `isDegradedMode()` from ai-client is true (user
> on OpenAI, or the circuit breaker has failed over to gpt-4o-mini), the
> pipeline runs the FULL repair ladder and then ships whatever survives —
> mechanical warts included, warn-logged — because the fallback model can't
> reliably clear the strict gates and a playable degraded block beats a
> failed generation. Strict gates apply unchanged on DeepSeek. The flag is
> evaluated by the CALLERS (generator + both cards + conversion) at call
> time and passed as options.degraded, keeping generate.mjs injection-pure. Failures now
> carry `rejectRules` on the Error, and the generator keeps the last 20 in
> `localStorage['statblock-failure-log']` — check it when "generations keep
> failing" reports arrive, instead of guessing. (Prompt caching does NOT
> make the model smarter between calls — failure bursts are sampling
> variance seen through an all-or-nothing pipeline; this tiering removes
> the all-or-nothing.)
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
  real numbers, source-phrased prose) under a one-time Convert (metered as
one generation via canGenerateStatblock — owner call 2026-07-28, replacing
the premium gate; free tier spends one of the daily five)
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

## SPRINT CLOSED (2026-07-27, owner call: "90 percent there — long-tail outliers")

The 2024 engine sprint is complete. State at close: ~50 audited blocks since
batch 4 with ZERO wrong chassis numbers (CR 1/4-30, all archetypes, casters,
swarms, legendaries); ~40 corpus-calibrated lint rules, each swept to 0/329;
deterministic correctors for most classes; never-fail shipping throughout.
The residual tail is documented in the batch notes below (hybrid fix-call
struggles, referent orphans, unbanded zone sizes, tiny-CR band floor, kit
clustering) — each with its escalation path. Next sprint: **2014 engine +
edition conversion**. Known starting facts for it: zero live 2014 blocks were
generated during this sprint; most new lint rules are is2024-gated and need
per-rule decisions about 2014 equivalents; the conversion round-trip
(cache-and-swap + convertEdition + CONVERSION_LINT_RULES) is untested since
the rule avalanche; the legacy two-part pipeline fallback still exists behind
localStorage['statblock-legacy-2014'].

## Conversion sprint — batch 1 (2026-07-27, six converted soak-3 blocks)

First live data for 2024→2014 conversion: Bilewurm, Shissar, Stalking
Webspinner, Chazkor, Ulghoch, Silk Shambler (the soak-3 originals, converted).
**Verdict: numbers 100% (HP formulas, saves/skills, dice averages, XP for CR
3/4/7/8/23/30, PB — all exact; nothing rebalanced), skeletons 100% (attack
lines, save constructions, legendary boilerplate, 2014 swarm trait + condition
set all correct).** The conversion call handles skeletons but leaks 2024
*vocabulary*, and the 2014-target lint branch only checked "Attack Roll:"/
"Failure:" markers, so four leak classes shipped:

1. **Bloodied** (Webspinner Planar Retreat) — term doesn't exist in 2014.
2. **Emanation** (Ulghoch Caustic Slime "5-foot emanation originating from";
   Silk Shambler ×2 "20-foot-radius emanation centered on").
3. **Capitalized area shapes** (Bilewurm "15-foot Cone… in the Cone") — no
   inverse of `area-term-caps` existed.
4. **"has the X condition"** (Chazkor Critical Panic "has the stunned
   condition") — 2024 grammar; 2014 writes "is stunned".

Shipped: four 2014-branch lint rules (`bloodied-in-2014`, `emanation-in-2014`,
`area-caps-in-2014`, `condition-phrase-in-2014`), each swept **0/327 against
`src/data/srd-monsters.json`** (the 2014 SRD corpus — note: 2014-target rules
sweep against THIS corpus, not the 329-block srd52 one), with deterministic
appliers in `DETERMINISTIC_TEXT_FIXES` (verified no-ops on all 327 official
texts, since a firing rule applies its fix to every entry in the block).
Applier edges: "While bloodied" preserves sentence case; creature-name "Cube"
references ("Gelatinous Cube stat block") are untouched (fix requires a
"-foot"/"the" lead-in); "has the exhaustion condition" is NOT auto-fixed (2014
phrases exhaustion as levels — rides the fix ladder). All four registered in
`CONVERSION_LINT_RULES` (+ `phrasing-save-or`, a phrasing rule with a
deterministic applier that had been missing from the set), and the
`CONVERSION_RULES[2014]` prompt now states the vocabulary swaps directly.
Tests: 10 behavioral tests from the verbatim converted text in
`engine-2014.spec.js`, including a convertEdition e2e that guards the
CONVERSION_LINT_RULES wiring (leaked response → cleaned in one call).

Carried-over 2024 defects in this batch (verified present in the soak-3
originals, NOT conversion regressions): "Webbing Lashs" typo + Web Walker
referencing web terrain its attack doesn't create; Planar Retreat's "use this
action as a reaction on its turn"; Ulghoch's garbled Reinforce Slime (predates
the `legendary-recharge` bypass rule that it motivated — fresh generations
catch it); Earth Ambush calling a save-AoE a "Surge Strike attack"; the
"ignores resistance" rider watch item. Cosmetic 2014 nits not yet ruled:
senses ordering (Shissar lists darkvision before blindsight; corpus is
alphabetical), condition-immunity line ordering, creature name capitalized in
prose ("The Stalking Webspinner makes…" vs corpus lowercase "the webspinner").

## Conversion sprint — batch 2 (2026-07-27, three fresh 2024 blocks + conversions)

Wailglacier (CR 1 controller), Emberhide Hulk (CR 5 defender), Leafblade
Glider (CR 12 skirmisher). **Chassis: all three exact** (AC/atk/DC dead on;
HP within formula-derivation of the mult; Emberhide HP 105 = 95×1.1 exact;
all three AoEs EXACTLY at total/2 budget: 4/16/39). Two of batch-1's leak
rules confirmed working live (Wailglacier Emanation→sphere, Leafblade
"Bloodied"→half-HP). Two defects found and fixed:

1. **Naming-pass rename orphan** (2024 side, Wailglacier): the model returned
   an ability rename WITH its usage suffix ("Freezing Fog (Recharge 5-6)" →
   "Whisper Crush (Recharge 5-6)"); `applyRenameMapping` renamed the entry
   but couldn't find the suffixed string inside Multiattack's bare prose
   reference ("a use of its Freezing Fog"), and the word-pair fallback drops
   "Fog" (< 4 chars). Since renames run AFTER the final lint sweep, the
   orphan shipped unchecked. Fix: `applyAbilityRenames` is now suffix-aware
   (resolves bare↔suffixed names both ways, preserves the entry's own
   suffix, maps the bare name for prose references) AND both call sites go
   through `renameAbilitiesSafely` — if applying renames increases the
   `undefined-attack-ref` count, the renames revert wholesale (names are
   cosmetic; reverting is free, an unadjudicable block is not).
2. **Modal condition-phrase regression** (conversion side, Emberhide): the
   batch-1 applier turned "can't have the Invisible condition" into "can't
   are invisible". Applier now handles modals ("can't have" → "can't be"),
   negated do ("does not have" → "is not"), and refuses bare "have"
   (plural/exotic subject — no safe verb; rides the fix ladder). Re-swept:
   0/327 no-op on officials.

Carried/known-class in this batch (no new rules): Emberhide Seething Gaze
contradiction (fixed duration + repeat save + orphan "(escape DC 12)" on a
non-grapple — condition-duration incoherence, referent-orphan family);
Wailglacier Relentless Slide (trait-material movement permission fused with a
disconnected 60-ft prone save); "Emanation centered on" vs corpus
"originating from" (cosmetic); Wailglacier escape DC 11 (within the
asymmetric sane band, rule fired or tolerated — not chased); Wailglacier
2-attack routine vs 1-attack controller plan (12 vs 8 budget, still inside
the raw DMG CR-1 band — watch item, tiny-CR wobble).

## Conversion sprint — batch 3 (2026-07-27, legendary + spellcaster, CR 15/22)

Askor (CR 15 defender, legendary + innate caster) and Tarwurm (CR 22
defender, legendary), 2024 + conversions. **Chassis exact on both**: Askor AC
20/atk 12/DC 19, claw primary 16 = perAttack budget 16, routine primaries 48
vs 49, AoE 24 vs 25; Tarwurm AC 23/atk 15/DC 23, routine primaries 84 vs 86,
Tar Cone 42 vs 43, escape DC 21 = save_dc−2 formula. Legendary discount
(0.6) visibly honored at both CRs. Conversions: skeletons/boilerplate all
correct; batch-2's modal fix confirmed live (Tarwurm "or be grappled").

Shipped this batch:
1. **Mid-generation overwrite bug (UI)**: `saveGeneratedMonster` resolved
   `activeFolder`/`activeMonsterIndex` at COMPLETION time, so browsing the
   sidebar during the wait redirected the save onto the clicked monster.
   Fix: `generationTarget` captured at generation start (folder + index +
   occupant name); at save, the index is trusted only if the same monster
   still occupies it (else find-by-name; deleted → save as new).
   3 Vue tests (StatblockGenerator.spec.js, mid-generation navigation
   describe). Test-infra note: earlier describes leave unconsumed
   mockResolvedValueOnce queues — clearAllMocks doesn't drop them; the new
   describe resets generateGptResponse fully.
2. **spell-tiers-inline** (2014 branch + CONVERSION_LINT_RULES): the
   conversion call flattened Askor's spell tiers onto one line. Official 2014
   spellcasting puts every tier at a line start (19/19 corpus spellcasters,
   "\n\nAt will:"). Detection + applier swept 0/327. Companion display fix:
   legacy Statblock.vue description spans now `white-space: pre-line` (they
   collapsed newlines, so even SRD-shaped spellcasting rendered run-on).

Carried/known-class, no rules: "Burning Claw Strikew" legendary-action name
typo (one-off); Askor "moves into a space the askor threatens" (3e-ism,
reaction-trigger vocabulary watch); "Languages Common (does not speak)" vs
corpus "understands Common but can't speak"; Tarwurm "the tar coil"
self-reference in EVERY entry while named Tarwurm — strongest live case yet
of the epithet self-reference tail item (officials self-refer by name word or
type word: "the dragon"); Askor immunity list unalphabetized; unbanded ember
zone (2d6).

## Epithet self-reference rule (2026-07-27, corpus-studied)

Study: for all 656 official blocks (329 srd52 + 327 srd-2014), extract the
dominant subject-position "the X ‹verb›" phrase from entry texts. Result:
officials ALWAYS self-refer by a name word, the creature type, "the swarm",
or a suffix (≥4 chars) of a name word — the only 5 apparent exceptions were
morphology artifacts that define the contract's edges: Androsphinx/Gynosphinx
→ "the sphinx" and Warhorse → "the horse" (head-morpheme suffix),
Half-Dragon and Will-o'-Wisp (hyphenated names). Zero true epithets.

Shipped `epithet-self-reference` (correctable, block-level — needs the
cross-entry tally): `findEpithetSelfReference(name, type, texts)` in
lint.mjs (exported; sweeps run the shipped code) tallies verb-anchored
subjects, applies a stoplist for legit non-self subjects (target/zone/
portal/...), requires dominance ≥2, and classifies against name words ∪
type words ∪ {swarm} ∪ name-word suffixes. Applier rewrites "the ‹epithet›"
→ "the ‹name head noun›" across every entry (possessives follow). Swept
0/329 + 0/327 with the shipped implementation.

Wiring: fires in the main lint pass (model-invented epithets), in a
dedicated POST-NAMING sweep in generateMonster2024 (a rename can CREATE the
epithet — "the tar coil" after Tar Coil → Tarwurm, which pre-naming lint
cannot see and the head-noun rename word-pair misses for two-word forms),
and in CONVERSION_LINT_RULES (free cleanup on convert). Known limit: only
the dominant phrase is rewritten — a secondary one-word variant ("the coil")
would survive; no live case yet.

## Conversion sprint — batch 4 (2026-07-27, Smokeshade/Shadowpouncer/Cliffskitter)

CR 3 lurker / CR 11 lurker+caster / CR 22 defender+legendary. **Chassis
clean on all three**: Smokeshade AC 14/atk +7/DC 13, hp 45≈46 lurker; ​
Shadowpouncer textbook (claws 21 vs perAttack 22, Rending Lunge 44 vs
single-target budget 43, spell DC 17 = chassis = 8+PB+CHA); Cliffskitter =
Tarwurm fingerprint, Shockwave 42 vs AoE 43, legendary-inclusive routine
~84 vs 86. The epithet rule's first live batch: all three self-refer
correctly ("the stalker", "the shadowpouncer", "the cliffskitter").
Display fix confirmed live: converted spell tiers render on separate lines.

Shipped:
1. **hybrid-range-mismatch** (2024 branch, correctable): the docketed
   hybrid dual-targeting recurrence arrived (Rending Lunge: "lunges at one
   creature within 15 feet" prose + "DC 17, one creature within 60 feet"
   skeleton). Corpus: officials NEVER state a one-creature range twice in
   an entry (0/329 even with matching ranges), so any contradiction is
   off-corpus; the applier rewrites the skeleton's range to the prose range
   (the design intent). The batch's conversion had silently dropped the
   60-ft clause — luck, not a mechanism.
2. **spell-tiers-inline v2**: the live conversion emitted lowercase
   "at will:", which v1's case-sensitive regex missed (half-fixed entry:
   "1/day each" broke onto its line, "at will" stayed inline). v2 is
   case-insensitive, sheds the inline separator ("darkness; 1/day" →
   "darkness\n\n1/day"), and normalizes casing to corpus forms ("At will:",
   "N/day each:"). Re-swept 0/327 detection + no-op applier.

Carried/known-class: Smokeshade Smoke Shroud referent ("starts its turn in
the light" — should be the cloud; one-off incoherence, fix-call class);
"(DC 13)" parenthetical save phrasing in a trait; Cinder Burst 14 vs AoE 7
(1/Day lurker nova slot — by-design leeway, watch); Patrol's Grasp
restrained-target attack restriction (odd but adjudicable); "Emanation
centered on" (cosmetic watch); Darkness at-will at CR 11 legal under the
at-will tier rule (level 2 ≤ floor(11/4)).

## Conversion sprint — batch 5 (2026-07-27, Chittereg/Obsidian Bomber/Glacial Legmire)

CR 10 controller+caster / CR 3 artillery / CR 24 defender+legendary.
**Chassis EXACT on all three** — the cleanest batch yet: Chittereg legs
23×2 = 46 = controller total to the point (DC 17 = controller +1 = CHA-
coherent simultaneously; trail DC 15 = 8+PB+CON, stat-coherent variance);
Bomber = artillery fingerprint exact (AC 13, atk +7 chassis, Shrapnel 13 =
AoE 13); Legmire Freezing Slam 52 = AoE 52, Repelling Swell 104 = FULL
total budget 104 as the 1/Day nova line, Pseudopod 36 vs 35, escape 22 =
DC−2. Conversions: fully clean, zero leak-class defects (third consecutive
clean conversion batch); tier line-breaks present (single \n vs corpus \n\n —
cosmetic, renders identically under pre-line).

One carried defect: Legmire's reaction read "The glide-mmother moves" in
the 2024 original — a garbled one-off self-reference (typo'd remnant,
probably of a provisional name). The conversion call silently repaired it
(luck). It sits in the epithet rule's documented blind spot (dominance ≥2).

**Negative result (valued): epithet threshold cannot drop to count ≥1.**
Sweeping every distinct non-conforming subject at count ≥1 produced 85+108
corpus hits — all extraction artifacts (greedy two-word captures like
"behir can['t]", possessives, legit one-off objects "the whirlwind"/"the
heart"). The dominance threshold IS the 0-FP mechanism. Garbled one-off
referents stay in the referent-orphan (fix-call) family; do not re-attempt
without a fundamentally tighter subject extractor.

## Native-2014 batch 1 (2026-07-27, six random blocks — the sprint's untested half)

Kralvag CR 12 skirmisher / Thornbark CR 13 BRUTE (first live brute) /
Siltstone CR 11 lurker+caster / Glacier Eel CR 2 defender / Spumescum CR 22
lurker+legendary / Sticky Hound CR 2 defender. **Chassis exact on all six**
— the numbers layer is edition-clean: Kralvag cone 39 = AoE 39; Thornbark
per-attack 19 = 19 and routine 57 vs 58 (brute shipped sane — partial
answer to the brute-docket question); Siltstone eruption 22 = AoE 22;
Spumescum breath 31 vs 30 with the 40-damage ambush rider = lurker nova;
both CR 2s within a point of budget; escape DCs formula-exact.

The predicted is2024-gating holes turned out to be PATTERN gaps in
edition-agnostic rules, both fixed and swept 0/329 + 0/327:
1. **defense-restated** required capitalized types and simple shapes —
   Kralvag's "Glimborg" ("has resistance to cold damage and immunity to
   poison damage and the poisoned condition", lowercase compound) sailed
   through. Regex now edition-robust (case-insensitive, chained compounds).
2. **duplicate-entry** only compared identical text within ONE section —
   Kralvag defined "Crystal Burst" twice (Trait + paraphrased Reaction).
   New `duplicate-cross-section`: same bare name (suffix-stripped) in two
   sections + token-Jaccard ≥ 0.5 → the Traits copy drops (correctable);
   non-Traits pairs go to the fix call. Attack-reuse same-name entries
   (legendary "Pseudopod: makes one Pseudopod attack") stay legal via the
   overlap threshold.
3. **Languages mute-form normalizer** in assembleMonster: "does not/cannot
   speak" → "can't speak" (31/31 officials; recurring drift — Kralvag,
   Cliffskitter, Askor).

Correctly-gated confirmations: Sticky Hound's cold+fire+BPS-nonmagical
resistance stack at CR 2 is 2014-legal (Imp precedent) — the is2024 gates
on the defense-budget rules did the right thing by staying silent.

Model-judgment slips, no rule possible: Glacier Eel typed Construct and
Sticky Hound typed neutral Fiend DESPITE the substance rule being present
in the 2014 prompt (rule 10) — prompt-adherence watch, 2/6 in this batch
vs ~0 recent 2024 batches; monitor whether 2014 needs the guidance
strengthened. Other one-offs: Kralvag's redundant double-Disengage (Quick
Step + Quick Withdraw); Siltstone's "must succeed or take X... on a
successful save half" mixed construction (save-or is corpus-legal via
Swallow, the half-clause hybrid is the wart); Spumescum trait-housed
ambush attack (Surprise-Attack-adjacent, adjudicable); "Siltstone Swarm"
named Swarm without being one.

## Native-2014 batch 2 (2026-07-27, six random blocks)

Uulghul CR 9 skirmisher / Chuugoth CR 12 skirmisher+caster / Charrflutter
CR 1/2 brute / Obsidiancrawl CR 1/4 defender / Bonewrack CR 4 swarm /
Uuloth CR 21 controller+legendary. **Chassis exact 6/6 (12/12 native 2014
total)**: Uuloth the standout — routine 63 = 63, perAttack 21 = 21, Shard
Spray 32 = AoE 32; Bonewrack swarm hp 97≈98 with halved-dice Bite done
right; Chuugoth whirlwind 39 = AoE 39 and a rules-correct 60-ft-fall 6d6;
Obsidiancrawl Bite 7 vs 4 = documented tiny-CR floor wobble.

Shipped (all corpus-swept):
1. **grapple-dependency-orphan** (block-level reject): Uuloth's Constrict
   targeted "one target grappled by the uuloth" and Sand Sink referenced a
   held grapple — but NOTHING in the block imposes Grappled; the entry is
   unusable. 0/327 + 0/329 (the Mimic false positive taught the imposes
   pattern "grappled by it (escape DC"). Fix call — adding a grapple rider
   is design surgery.
2. **condition-caps-in-2014** + applier: "becomes Restrained" mid-sentence
   (Uuloth Salt Anchor) — 2024-ism; 0/327 in official entry prose (the
   first sweep's 57 hits were condition-immunity LINES, which stay
   capitalized internally). Lowercases when preceded by lowercase prose.
3. **vocab-adjacent** (both editions) + applier: "adjacent" is 3e
   vocabulary, 0/329 + 0/327; "adjacent to" → "within 5 feet of"
   deterministically (Uulghul's Coordinated Strike), other forms ride the
   ladder. Both 2+3 added to CONVERSION_LINT_RULES.
4. Defense-line "poison damage" → "poison" token strip + languages
   normalizer extended to "doesn't speak" (third live variant).

**Corpus-killed (valued): auto-hover for walk-0 flyers.** Swarm of Bats
officially prints "0 ft., fly 30 ft." with no hover — officials DO make
walk-0 non-hover flyers. Chuugoth's hoverless fly stays a note, not a rule.

Naming: the Uu-/Ulg- attractor confirmed (Uulghul + Uuloth in ONE batch;
Ulghoch/Uulgrath historically) — 'uul'/'ulg' added to global
OVERUSED_NAME_STEMS; buildNamingPrompt now tells the model its candidates
are judged by a separate model on originality/evocativeness and names the
observed failure attractors (guttural Uu- coinages, noun+verb gluings like
"Obsidiancrawl" — owner-flagged bad name).

Watch items: type-substance adherence now 3/12 on 2014 (Chuugoth: a
scattering bone-cloud typed HUMANOID — worst case yet; prior: Construct
eel, neutral Fiend hound) vs ~0/8 on 2024 — if batch 3 continues the rate,
strengthen the 2014 prompt's rule 10 with a NEVER-example like the 2024
variant carries. One-offs: Bone Jab dealing fire (name/type mismatch),
speaking swarm (Languages Draconic on a swarm), Chuugoth scatter-reform
adjudication wobble, trailing periods on spell tier lines.

## Native-2014 batch 3 (2026-07-27, six random blocks)

Sandstare CR 2 lurker / Colossus CR 2 defender / Burrowmound CR 1 defender /
Sinterhoard CR 11 defender+caster / Grech CR 3 defender / Bloatbough CR 1
brute. **Chassis clean 6/6 (18/18 native 2014)** — Grech HP 67 = 61×1.1
exact; Sandstare bolt 11 vs lurker total 10.5; Bloatbough the brute
fingerprint (AC −1, HP ×1.25).

Found + fixed:
1. **instruction-leak was is2024-GATED** — the first true gating hole of the
   sprint (the batch-1 fears finally materialized, just once). Bloatbough
   shipped "This attack is a heavy melee attack." (slot-vocabulary
   classifier sentence) because the whole instruction-leak loop sat inside
   the is2024 block. Moved to edition-agnostic scope + fourth detection
   shape added (0/327 + 0/329).
2. **prompt-example-name**: Grech shipped a trait named "Helping Snarl" —
   the naming prompt's own rename-guidance example, copied verbatim.
   Reject on exact example names (Helping Snarl, Tar Tendril).
3. **Spell-DC derivation both ways**: Sinterhoard printed spell DC 17 under
   CHA 22 at PB +4 (derived 18) — the raise-only stamp lifts an
   undersupporting score but never touched the DC when the score
   overshoots, and the lint rule's ±1 tolerance let it ship. The stamp now
   rewrites the printed DC (and spell-attack bonus) to 8+PB+mod whenever it
   doesn't derive exactly; chassis DC stays the floor via the raise.

**Corpus-killed (valued): blanket recharge-on-attack-roll rule.** Four
officials do it (Ettercap/Giant Spider Web, Minotaur Gore, Ape Rock) — but
all four add value (utility, rider, or damage above the at-will).
Sinterhoard's Crystal Burst (recharge-gated 28 vs at-will 30, no rider)
stays a real design wart with n=1 — refined rule (recharge attack with
damage ≤ perAttack AND no rider) goes on the docket if it recurs.

Watch items: languageless Humanoid (Grech; 0/656 officials — folded into
the type-adherence watch, which improved this batch: only Grech and the
fungal Burrowmound-as-Aberration are borderline, no hard slips);
"Scrabbling Colossus" INT 17 on a mindless-reading shard beast;
name-size dissonance (Colossus = Large CR 2); trailing periods on spell
tier lines (recurring cosmetic).

## Native-2014 batch 4 (2026-07-27, six random blocks)

Tarstrike CR 1 defender / Glazed Bulwark CR 3 defender / Rootkelp CR 12
lurker / Skittering Multitude CR 1/2 / Feverthorn CR 11 skirmisher+caster /
Glintspinner CR 20 skirmisher+legendary. **Chassis clean 6/6 (24/24 native
2014)** — three EXACT hp fingerprints (Rootkelp 161, Feverthorn 187,
Glintspinner 332≈333), Glintspinner perAttack 26 = 26 and breath 40 = AoE
40, Tarstrike hp 30 = 30.

**The Giant-type failure is confirmed**: Skittering Multitude (a clinging
vermin-multitude concept — owner: "what is this even") and Feverthorn (a
spore-plant caster) both typed Large GIANT, joining Kralvag (crystal
pincer-beast, batch 1). Native-2014 hard type slips now 5/24 (all but one
mistyped AS Giant) vs 0/8 recent 2024. Action taken: 2014 prompt rule 10
strengthened — giants are massive humanoid-shaped folk, NEVER crawling
creatures/multitudes/plants; multitudes are swarms; substance overrides the
requested type. Monitor next batch.

Shipped (all swept):
1. **resistance-unknown un-gated + extended to all three defense lines**
   (was resistances-only + is2024) — gating hole #2: Glintspinner shipped
   "Damage Immunities: prismatic" (invented type). Manual field sweep 0/327
   + 0/329; 2014 nonmagical-qualified clauses pass via contains-matching.
2. **grapple-escape-dc-2014** (correctable): Multitude's "or be grappled"
   carried no escape DC anywhere. Both imposition shapes (save-or and
   Hit-rider) swept 0/327 + 0/329 after excluding "grappled by"
   preconditions (Vampire Bite) and escape traits (Kraken). Applier stamps
   (escape DC save_dc−2) on the imposing clause. Mirrors 2024's
   grapple-exit, whose anchors are 2024-phrasing-bound.
3. Normalizers: "exhausted" → "exhaustion" in defense lines (was landing in
   DAMAGE immunities as junk); "blindsight 60 ft., blind beyond this
   radius" → parenthesized corpus form.

One-offs / notes: Tarstrike trait named "Chomp" describing a tar slick
(name-content mismatch); Tendril Lash flat +2 vs STR +3 (CR-1 band
tolerance); Glintspinner "confused" pseudo-condition — but with an inline
d10 behavior table, i.e. the official Umber Hulk pattern minus the naming
(condition-fake stays 2024-gated; the inline definition makes it
adjudicable); Glintspinner rider DCs 20 derive from no stat (chassis 22 −2,
conservative direction); Hairball Hurl's self-throwing referent mush
(fix-call class); trailing spell-tier periods (recurring cosmetic).

## Native-2014 batch 5 (2026-07-27, six random blocks)

Sporemound CR 1/4 / Shardwisp CR 1 defender / Bonesilence + Shivver CR 12
lurkers / Prism Storm CR 16 controller+legendary / Shisstril CR 22
lurker+legendary. **Chassis clean 6/6 (30/30 native 2014)**: Prism Storm
shard 14 = perAttack 14 and Cage 22 = AoE 22; Shivver/Bonesilence twin
lurker fingerprints (both AoEs 24 = 24); Shisstril hp 289≈288, legendary
"if available" recharge-gate used correctly.

**Machinery bug found live — head-noun rename corruption (Shardwisp)**: the
Anchored Barrier action read "The shardwisp lasts for 1 minute… any
creature within the shardwisp gains half cover" — a provisional name ending
in "Barrier" was renamed to "Shardwisp", and applyRenameMapping's head-noun
word-pair fallback rewrote every "the barrier", including the OBJECT the
action creates. Fix: word-pairs now filter through SELF_REF_STOP (exported
from lint; 'barrier'/'shield'/'veil'/'field' added) — exact full-name
replacement still applies; genuine self-references ("the stalker") still
follow renames.

**Rule-hardening (uses-references)**: Shivver's "use its Storm Invisibility
(or a similar trait…)" — the undefined reference went unchecked because a
parenthetical defeats every lookahead terminator. Extending the lookahead
exposed that this rule had NEVER been swept against the 2014 corpus:
official substitution phrasings ("Hurl Flame in place of any melee
attack", "Swallow instead of its bite", "Engulf on it") were over-capturing
— live 2014 generations using official phrasing were eating spurious
rejects. Terminators added (\(, and, to, in, instead, on, against);
re-swept 0/329 + 0/327. The hedge parenthetical itself is now an
instruction-leak shape (stripped). Also shipped: prose-ft-abbrev ("within
30 ft." → "within 30 feet", 0/0 corpus) + conversion-gated; prompt rule 10
adds "Beasts are natural animals: INT 3 or lower, NEVER spellcasters"
(Bonesilence: a CHA-20 innate-caster BEAST — the caster-stamp did its job
on a design that shouldn't have had Spellcasting at all).

One-offs: Shisstril Mimicry "or is shaken as an action" (garbled escape
clause); Prism Storm "the double's space" (referent from a draft concept
that no longer exists) and "Jagged Ice" on a light-themed creature;
"Lightning Bolt" as a non-spell action name; S/Sh-initial name cluster
(5/6 this batch — watch as the possible next attractor after the Uu- ban).

## Conversion sprint — batch 6 (2026-07-27, FIRST 2014→2024 direction, six blocks)

The batch-5 native blocks converted 2014→2024 — the last untested direction.
Numbers carried verbatim ✓; skeletons mostly converted well; the conversion
even REPAIRED two source defects (Shivver's "Storm Invisibility" → "Rain
Cloak" + hedge parenthetical dropped; Shardwisp's barrier references
partially restored). Shardwisp's rename corruption otherwise carried (source
predates the fix — saved monsters aren't retro-repaired).

Four leak classes found, all 0/329-swept, shipped with deterministic
appliers and gated into CONVERSION_LINT_RULES:
1. **phrasing-hit-marker was missing from the conversion gate** — "Hit:"
   markers shipped in Shisstril's 2024 attack lines. Added, plus a
   deterministic strip applier (was fix-call-only).
2. **success-half-phrasing**: "Success: Half as much Lightning damage."
   (2014 residue, three blocks) → "Success: Half damage only."
3. **skeleton-fusion**: "...damage and Strength Saving Throw: DC 17, the
   target." — a skeleton fused mid-sentence (Bonesilence). Unfuses at the
   conjunction.
4. **trigger-outside-reactions**: the Trigger:/Response: reaction format
   applied to LEGENDARY ACTIONS ("Trigger: The storm takes this action.
   Response: It does so." — Prism Storm). Vacuous self-triggers strip;
   "uses X / It does so" collapses to the deed; real Reactions untouched
   (pattern-narrow). Also gated the rest of the phrasing-applier family
   into conversion (area-term-caps, damage-type-caps, success-no-effect,
   area-circle, spelling-centred) and extended prose-ft-abbrev ("by 10
   ft.", "a 10 ft. radius", "N ft. away").

**RESOLVED (owner call: option b, with toast)**: converting 2014→2024 now
applies bps-resistance — the physical package drops on non-swarm,
non-incorporeal creatures, matching official 2024 reprints. This is the ONE
sanctioned rebalance in conversion. Mechanics: convertEdition passes
chassis into the conversion lint (the set filter keeps other chassis rules
out), 'bps-resistance' joined CONVERSION_LINT_RULES (is2024-gated, so
2024→2014 never sees it), and the strip surfaces as a transient
`_conversionNotes` entry that the Vue toasts (info, 8s) and deletes before
persisting. Swarms/incorporeal keep the package, no note. 2024→2014
direction is unaffected (the qualifier is legitimately reconstructed there
by the LLM from 2014 style).

Cosmetic notes: Languages line omitted (vs corpus "Languages None") on
languageless converted blocks; "1/day each" casing vs 2024-native "1/Day
each"; "surprised creature" hook survives into 2024 where surprise works
differently.

## Batch 7 (2026-07-27, three native 2014 + 2014→2024 conversions)

Facetwing CR 4 BRUTE (exact fingerprint: AC 13 = brute −1, hp 97 ≈ 78×1.25,
Reckless — a coherent brute kit) / Saltweb Skitterer CR 11 skirmisher
(exact: claws 74 vs 72, spit 36 = AoE 36) / Stoneslide Juggernaut CR 21
defender+legendary (exact: 3×26 = 78 vs ~75, and a LEGITIMATE Giant — first
post-prompt-fix batch, 0 hard type slips in 3). Native one-offs: Facetwing's
malformed resistance line ("bludgeoning, and slashing" — missing piercing vs
its own trait) + poisoned immunity in trait but not line; secondary DCs at
chassis−2 deriving from no stat (2nd occurrence — Juggernaut DC 20, was
Glintspinner; watch → rule if it recurs); INT 18 on mindless-reading brutes.

**NEW CONVERSION DEFECT CLASS — SEMANTIC INVERSION**: Facetwing's "is
immune to the poisoned condition" converted to "has the Poisoned condition"
(immunity → affliction!), and Wall of Ice's Success clause gained the push
the original success avoided. Shipped: `self-afflicted-condition` (reject;
the Invisible Stalker's permanent Invisibility is the one legal
self-affliction, 1/329 — Invisible exempt) + a NEVER-invert guard in the
2024 conversion prompt. Success-outcome inversion has no deterministic net
(officials legitimately vary success outcomes) — prompt guard only, watch.

Also shipped (all swept 0/329 + 0/327):
- **Suffix doubling fixed at both ends**: assembly strips in-section cost
  suffixes ("Disengage (Bonus Action)" inside Bonus Actions), and the
  legacy fold no longer re-appends; duplicate-cross-section's bareName now
  strips parentheticals repeatedly (the doubled suffix defeated it) and
  joined CONVERSION_LINT_RULES.
- **skeleton-fusion extended**: colon-fusion ("weapon: Dexterity Saving
  Throw:") unfuses deterministically; comma-fusion detected (fix call).
- **generic-self-reference**: "The creature casts..." → the monster names
  itself (applier substitutes the name; falls back to pattern-match when a
  same-pass rename moved the entry).
- **spellcasting-entry-name**: "Innate Spellcasting" → "Spellcasting" in
  2024. success-no-effect now case-insensitive ("Success: no effect.").
- **bps-drop trait cleanup**: when conversion drops the B/P/S package, the
  trait RESTATEMENT of it strips too (clause-level first — "as hard as
  stone, and it is resistant to..." keeps its host sentence; Stony Hide
  live case contradicted the stripped line).

## Batch 8 (2026-07-28, five native 2014 + conversions) — TYPE-BY-SUBSTANCE STAMP

Pumice Skitterer CR 4 skirmisher / Scuttlegeist CR 2 balanced (hp 44 = 44,
spray 9 = AoE 9) / Siltsine + Mistcrag CR 12 lurkers (Mistcrag's
absorb-gated Lightning Discharge is a standout mechanic) / Amber Hound CR
24 controller (AC 22, DC 25, Mind Scar 42 vs 43). **Chassis 5/5 — native
2014 now 35/35.**

**Creature type is now engine-stamped (owner call — "can we determine the
type in the concept call?"): YES, shipped.** Both existing micro-calls
(concept-path archetype resolve; random-path seed synthesis) now also
return `creature_type`, decided by the concept's SUBSTANCE — the synthesis
may OVERRIDE the rolled type when the fusion contradicts it (the
Amber-Hound-as-Humanoid class). The engine stamps it in assembleMonster
like a number: canonical-list validated, never overrides "Swarm of ..."
forms, model type survives when no resolution exists (e.g. user-picked
role skips the micro-call). Zero extra LLM calls (piggybacked).

Also shipped (swept 0/329):
- **instruction-leak "Credits:" shape**: Siltsine shipped "Credits: This
  ability fills the required slot for an ambush or once-per-fight nova
  mechanic." — verbatim slot-plan language. Detection + sentence strip.
- **failure-damage-echo** (correctable, conversion-gated): the Spore
  Volley conversion repeated the attack's own 25 damage as a bare average
  inside the Failure clause — double-counting. Officials' hybrid Failure
  clauses only carry EXTRA dice damage (0/329). Applier strips the echo.
- **Partial-package conversion drop**: Siltsine's "psychic, bludgeoning,
  and slashing from nonmagical" (no piercing) dodged bps-resistance
  (needs all three). The conversion now drops ANY physical token whose
  SOURCE line carried the nonmagical qualifier — Treant-style unqualified
  partials (3 official) are untouched because the key is the source
  qualifier, not the shape. Same toast note.
- **term-caps** extended: "as a bonus action/reaction" capitalizes in 2024
  (0/329 lowercase). **Setup-order prompt guard**: conversions were
  opening with the skeleton and appending the setup sentence after
  Success (Shard Storm, Illusory Double — n=2, no safe deterministic
  reorder; prompt line + watch).

One-offs: "cuttlegeist" name header vs "scuttlegeist" body (probable paste
artifact or one-off casing garble — conversion printed it correctly);
secondary-DC-minus-2 did NOT recur this batch; Amber Hound "Bone Shriek"
name on an amber creature.

## Batch 9 (2026-07-28, three native 2014)

Cinderbarge CR 1/2 brute (AC 11 EXACT, single arm 8 = total 8) / Shusspore
CR 12 lurker (hp 161, spikes 50 vs 47, CHA-striker +11 with CHA-coherent
spell DC 19) / Shalespire CR 23 lurker (AC 21, hp 304≈301, atk +17 EXACT
via DEX 30, spines 69 vs total 67, Seed Volley 35 ≈ AoE 34). Chassis 3/3 —
native 2014 38/38. Shusspore's Celestial: owner reviewed — "crystalline
spores... borderline but acceptable" (radiant immunity + mercy cantrips
half-honor the roll; whether it predates the type stamp is unknown — next
batch decides).

Found + fixed (all swept):
1. **trait-imposes-save was is2024-gated AND only knew the 2024 skeleton**
   (gating hole #3): Shalespire's Spine Burst — a 1/Day 44-damage nova
   with "As an action" phrasing — shipped in Traits. Rule moved out of the
   gate, skeleton detection covers 2014 prose ("must make a DC N ... saving
   throw"), the pre-Failure trigger cut now also cuts at 2014 outcome
   phrases ("On a failed save", ", taking" — the Softening-Tremor bug in
   the other dialect), the state-gate targeting exclusion covers
   Will-o'-Wisp ("that has 0 hit points"), official As-an-action utility
   traits without saves stay legal (Flameskull), and the relocation applier
   strips the "As an action, " lead-in.
2. **entry-named-after-monster** (reject): Shusspore shipped a trait
   literally named "Shusspore". 0/329 + 0/327.
3. **Fix-call renames bypassed name normalization** — "The Watcher" and
   "The Mound-Warden" shipped with leading articles because
   rewriteFlaggedEntries applied response names raw; it now strips like
   the assembly does.
4. **half-as-much-phrasing** (+applier): "half as much on a successful
   one" gains the missing "damage" (0/327).

## Type essences — the anti-reskinning mechanism (2026-07-28, owner-driven)

Owner diagnosis of the Shusspore class: "deepseek was obviously thinking of
some spore creature and then said OH! I need to make it more sparkly" —
the rolled type was a LABEL retrofitted onto an already-formed concept.
Choosing type AFTER the concept was considered and rejected: the type roll
exists because unconstrained deepseek concepts cluster hard
(plant/ooze/undead/monstrosity; lifetime zero fiends/celestials/humanoids
pre-roll) — type-after would regress that. Instead: `TYPE_ESSENCES` in
concept-seeds.mjs — each of the 14 types carries a one-line definition of
what its body and powers ARE ("Celestial: a being OF the higher planes —
its body is light, law, sanctified matter... even a stalker among them is
a huntsman of justice, not a skulking animal"). The seed concept, the
synthesis prompt, and the synthesized concept all carry the essence with
explicit fuse-FROM framing ("the traits are raw material the essence
shapes, never a finished creature the type is painted onto"). The
substance-override + engine type stamp (batch 8) remain the backstop for
fusions that still fail. Diversity preserved (roll unchanged), retrofits
attacked at the prompt layer, correctness guaranteed at the stamp layer.

## Batch 10 (2026-07-28, four native 2014 — FIRST POST-ESSENCE BATCH)

Bonecradle CR 8 controller / Fissurecheat CR 9 swarm / Sporeveil Wardrake
CR 12 defender / Thudstep CR 23 defender+legendary. **Chassis 4/4 (native
2014 42/42)**: Bonecradle DC 16 = controller +1, routine 36 vs 33;
Fissurecheat hp 201≈204 swarm with halved-dice bites done right (7d6→3d6);
Wardrake hp 238≈235; Thudstep hp 437≈441, routine 94 vs 87, wave 49 vs 43.

**Type essences: early verdict GOOD — 4/4 type-coherent.** The Wardrake is
the mechanism working as designed: a spore-flavored DRAGON (drake body,
breath weapon, flight — spores as ingredient) instead of a spore creature
painted draconic; Thudstep is a coherent barnacle harbor-golem; the fey
eel-swarm earns its type through the Silver Temptation trickery kit;
Bonecradle is substance-perfect Undead. Notable designs: Thudstep's
Respect Sense / bow-to-be-protected kit; Bonecradle's Parry-shaped Bone
Shield.

Shipped (0/329 + 0/327 swept):
1. **defense-restated flavor-lead shape**: "The bonecradle's body is a
   mass of animated bones THAT GRANT IT resistance to..." — a whole-text
   restatement hiding behind a flavor clause, invisible to the has/is
   pattern.
2. **action-passive-rider** (correctable): Grasping Earth — a triggered
   rider ("The first time on each of its turns that it hits...") filed
   under Actions; nothing the creature DOES with an action. Relocates to
   Traits with its own `relocatedToTraits` marker; the counts rule scores
   it as an ACTION still (the relocate-and-exempt contract, inverse
   direction, without double-counting).
3. **Leading-article leak path #2**: "The Seeping Fissures" arrived via
   ability_renames (the model's rename value carried "The "); the
   rewriteFlaggedEntries fix (batch 9) didn't cover this path.
   applyAbilityRenames now strips leading articles too.

Notes: Wardrake Tendril Strike is flat-less (22 (5d8), no striker mod —
in-band, corpus-rare; watch); "Vulnerability Mark" reaction neither marks
nor exposes vulnerability (name-content one-off); Fissurecheat DC 15 vs
chassis 16 (−1 band).

## Batch 10 conversions (2026-07-28, 2014→2024) — strongest conversion batch

Skeletons, sections, Trigger/Response all correct; the swarm CORRECTLY kept
its unqualified B/P/S package (exemption + source-qualifier key both
working, no false note); Bonecradle's line-level package dropped with the
toast. Seven leak shapes found, six shipped (all 0/329):
1. **term-caps extended**: advantage/disadvantage, long/short rest, and
   speed all capitalize in 2024 (recurring across every converted block).
2. **success-no-effect += "Success: No damage."** (three occurrences —
   officials omit the clause).
3. **inability-phrasing**: "has the inability to take reactions" → "can't"
   (condition-izing garble; shared rule, both editions).
4. **phrasing-saving-throw += paren-DC mutant**: "must make a Strength
   Saving Throw (DC 16)" dodged both the 2014 and 2024 patterns.
5. **Grant-form trait strip in the BPS drop**: Bone Shroud's "bones that
   grant it resistance to... nonmagical weapons" survived the batch-7
   cleanup (is/has patterns only); the grant-form sentence now dies whole,
   and a trait EMPTIED by the strip is dropped entirely.
6. **action-passive-rider + inability-phrasing conversion-gated**:
   Grasping Earth now relocates to Traits during conversion too.
Remaining note (no rule): "has the Grappled condition (escape DC 16) by
the swarm" dangling agent (cosmetic); "Success: The target takes half as
much damage and doesn't have the Restrained condition" wordy negation
(official form is "Half damage only." — watch, fix-call territory).

## Batch 11 (2026-07-28, final native-2014 batch of the sprint)

Glassfang CR 1/4 lurker / Shardswarm CR 12 swarm+caster / Chitterchill
Horde CR 23 swarm+legendary. **Chassis 3/3 — native 2014 closes 45/45**
(Chitterchill hp 501 = 501 and burst 56 = AoE 56 exact; Shardswarm 270≈268,
breath 39 = 39).

Shipped (all swept; "may" and "attacks of opportunity" are 0/329 + 0/327):
1. **instruction-leak += raw "slot:" shape**: Glassfang shipped "slot:
   movement trick: bonus-action Disengage, flyby, spider climb, or burrow"
   verbatim. Tail-strip applier.
2. **vocab-register** (+applier, conversion-gated): "attacks of
   opportunity" → "opportunity attacks"; "may" → "can" (officials NEVER
   write "may" — free vocabulary law).
3. **beast-intelligence** (correctable retype): Beast + INT > 8 (the
   official ceiling — Giant Eagle/Owl at 8) retypes to Monstrosity.
   Glassfang was an INT-18 "beast" — first essence miss post-essences
   (1/7 blocks), now deterministically corrected.
4. **swarm-half-value enforces dice SHAPE**: "7d8+6, or 18 (4d8)" sat
   inside the ±1 average tolerance with halved-count wrong AND the flat
   dropped; the rule now requires half-count + same die + kept flat
   (0/329 + 0/327 structural).
5. **identity-immunity material branch un-gated for 2014** (0/327; the
   Elemental-TYPE branch stays 2024-only — the 2014 Djinni legitimately
   resists its own lightning): Chitterchill dealt cold on a "chill" name
   while only resisting it.
6. **Mixed spoken/mute languages normalize**: "Infernal, understands
   Common but can't speak" → "understands Infernal and Common but can't
   speak" (0 mixed shapes in either corpus).

**Corpus-killed (valued): bare-Multiattack rule** — the 2014 Erinyes
officially prints "makes three attacks." Ambiguous generated versions
stay fix-call-free.

One-offs: Crystalline Glide's uncapped free damage reduction (no
action/frequency cost — off-corpus shape, defense-budget family, n=1
watch); Frostfire Burst all-fire despite the name; "Chitterchill" is
Chit-cluster slip #7 (the 50% ban roll missed).

## Embedded-tools edition migration — PHASE 1 SHIPPED (2026-07-28)

Dungeon monsters, dungeon NPC statblocks, and NPC-generator statblocks now
generate through the ENGINE instead of the legacy two-part pipeline —
inheriting chassis-exact numbers, the full lint/corrector stack, essences,
and both editions. Design (owner-approved): **switch at generation,
dispatch at display, no tabs/conversion inside embedded tools (v1)**.

Mechanics:
- `src/util/embedded-statblock.mjs`: `generateEmbeddedStatblock({name, cr,
  description, caster, type, edition, onResolve})` — archetype-resolve
  micro-call (identity + creature_type by substance; tool-known type wins)
  then `generateMonster2024`. Same two LLM calls as the old part1/part2
  flow. The TOOL owns the name: drifted output names are stamped back via
  applyRenameMapping (self-references follow). `preferredEdition()`/
  `setPreferredEdition()` read/write the statblock generator's persisted
  `statblock-format` key — one app-wide preference.
- Rewired: dungeon monster-store, dungeon npc-store, dungeon
  util/statblock-generator.mjs (the creature quick-path), NPCGenerator.vue.
  Loading flags: part1 clears on the resolve callback; part2 on completion.
- Display: MonstersTab / NPCsTab / NPCGenerator format-dispatch between
  Statblock and Statblock2024 (readonly) on the block's own `format`.
- Rules switches: NPC generator statblock form + dungeon MonstersTab
  create form carry the same ParSwitch (`rules-switch`), bound to the
  shared preference. Dungeon NPC statblocks follow the preference.
- Exports: all three dungeon converters dispatch 2024-format embedded
  blocks through `renderStatblock2024` (markdown verbatim; plain-text
  strips markup; HTML converts basic markdown).

Known v1 limits (deliberate): no tabs/Convert inside embedded tools
(conversion lives where monsters are owned — the statblock generator; the
auto-saved library copy is convertible there); dungeon statblock EDIT
prompts (statblock-edit-prompts.mjs) remain legacy-shaped — the dungeon's
AI-edit affordances only render for 2014-format blocks (2024 embedded
cards are readonly); whole-dungeon batch conversion is docketed as v2
(N conversions = N metered generations). `createStatblockPrompts`
consumers are now ONLY the statblock generator's escape-flag legacy
fallback — the retirement decision is unblocked.

## 2024 exports unhidden (2026-07-28) — plans/statblock-2024-export-mappers.md RESOLVED

Foundry VTT and Improved Initiative export buttons now show for 2024-format
monsters. Research first (owner request): the Foundry "5e Statblock
Importer" (Aioros fork) parses the classic WotC TEXT layout — its 2024-
format text parsing is unadvertised — while Improved Initiative imports a
structured JSON whose schema natively has BonusActions and
InitiativeModifier. Implementation: both converters branch on format ===
'2024' and map through toLegacyModel (classic structure, 2024 phrasing as
prose — the Foundry importer keys on structure, not phrasing); Improved
Initiative then UPGRADES from the 2024 model — native BonusActions and
Reactions arrays from sections (the legacy fold's suffixed Trait copies
filtered out) and InitiativeModifier from initiative_bonus — so 2024
exports carry MORE fidelity than 2014 ones. Tests:
src/util/convert-2024-exports.spec.js. The plan file is deleted; its one
remaining caveat lives here: the Roll20 Conjure Creature extension reads
the `monsters` localStorage key directly and its handling of 2024-shaped
entries is UNVERIFIED (external codebase — watch for user reports).

## Batch 13 — Reedwrack/Rustking/Sussanyx (2026-07-30)

Eight new deterministic rules from three live blocks, all swept 0/329 +
0/327: `per-combat-vocab` (→ per day), `rider-target-mismatch` (on-hit
riders re-target "the target"; prose range beats skeleton range),
`emanation-form` (plain-sized, "originating from"), `speed-paren` (modes
comma-separated; "(hover)" exempt), `undefined-area` (dangling "that
area" AND undefined named zones "enters the cloud" — reject, fix ladder),
`orphan-repeat-save` (repeat-save sentence in a saveless entry —
deterministic strip; live: Spore Saturation).

Audit-layer ledger after 4 audited generations: 5 correct findings, ~2
expected-class misses, but only 2 landed — 3 died on our own rails
(structural-skip bug, case-sensitive span match, P5 confidence gate).
Rails fixed: spans now case-insensitive + smart-quote tolerant.
DECISION PENDING (owner): if realized yield stays ~1 minor catch per
block over the next batches, demote the audit to dev-only telemetry (rule
discovery without user latency). Watch `mechanical audit merged findings`
+ drop logs. Unresolved observation: Sussanyx shipped a trait named
"Thalvor" (an alien proper noun, neither the monster's provisional nor
final name) — audit principle 3 territory, no 0-FP deterministic
detection found; recurrence earns a naming-machinery look.

## Batch 23 — coherence confirmed both editions (2026-08-04)

Owner verdict on Quagkeel (2014, CR 17) and Sandslither Warden (2024,
CR 12): "Things are starting to look coherent again." Both blocks
chassis-exact; Quagkeel's Searing Echo is a real setup/payoff interlock
(fire enables the psychic echo); the Warden's Heat Sink inverts
absorbed heat into Cold damage; INT-based attacks price correctly via
the caster-aware striker stat; escape checks at save_dc−2 with helper
clauses. The lore/type-honesty/damage-discipline stack is holding in
both editions.

One fix: `dangling-use-ref` extended to the "use its <X> reaction/
action" form (the Warden's Arcane Resilience referenced "its Arcane
Escape reaction" — the reaction is named Runic Retort). Officials use
the form twice, both resolving (0-FP).

## Batch 22 — Dread Bellringer (2026-08-04)

Answered: the mechanical audit runs on ALL generated monsters (user
concepts, random seeds, picked archetypes, any CR) — never on converter
pastes or inline re-rolls.

Rules from one block, all corpus-verified:
- `self-condition-immunity-contradiction` (reject): a Stunned-immune
  Construct stunned ITSELF three times. Name-subject-anchored in subject
  position only — the Air Elemental's "pushed away from the elemental
  and has the Prone condition" (object position) was the corpus FP that
  forced the boundary anchor. Complements the older sentence-shape
  self-afflicted-condition rule, which missed adverbs and duration tails.
- `duplicate-mechanic` (reject): two entries sharing >= 2 identical
  60+-char sentences (Toll of Silence vs Frantic Ringing — same Failure
  AND Success sentences; only area + a 1/Day gate differed). One shared
  sentence is official boilerplate (paired dragon breaths, 10/329) —
  the two-sentence threshold is 0/329.
- `motionless-invisible` (reject): stillness-disguise written as the
  Invisible condition (False Appearance class) — Invisible means unseen,
  not indistinguishable.
- KILLED: ungated no-damage AoE hard CC — 8 official hits (dragon
  alternate breaths share their sibling's recharge without their own
  gate tag). Left to the audit.

## Batch 21 — concept call: CR in, lore out (2026-08-04, owner design)

Owner spec: the concept call should take creature type, CR, archetype,
and lore, and produce a lore line "to guide the ship." Gap analysis:
type was in/out (batch 20 honesty), archetype out, CR ABSENT, lore
absent as an output (the random path rolls an origin axis in but the
synthesis compressed it into combat framing).

Landed: both micro-calls take CR ("scale the creature's ambition to
this tier — a CR 2 creature is a local menace, a CR 20+ creature is a
mythic force") and return a one-sentence "lore" field (where it comes
from, what it wants — the GM-read-aloud line). The lore threads into
the concept string as "LORE (the creature's story — every ability and
its name should feel like they belong to it): ..." so BOTH the
generation call and the naming call read it — the anti-hodgepodge
anchor and a name-fit input in one. Validators tolerate absent lore
(legacy responses stay valid).

DECIDED (owner, 2026-08-04): user-picked archetypes RUN the resolve
call with the role passed as GIVEN (the prompt echoes it and designs
the identity around it) — main generator AND embedded tools. +1 call on
those paths, bought for identity/lore/type-honesty coverage.

### Batch 21b — Starfilth findings (2026-08-04)

- `buff-behind-save` (reject): beneficial effects gated behind saving
  throws — Glimmering Dome granted 15 THP + Advantage on a FAILED save
  (inverted semantics). 0/329 with the target-beneficial pattern; the
  Sphinx exhaustion-gain and Wisp self-heal shapes don't match.
- `garbled-condition-grammar`: "can't be has the Prone condition" →
  "can't have the" (fused 2024 idioms, deterministic).
- `energy-type-spread` (reject): 4+ distinct energy damage types on one
  body (spellcasting entries excluded) — officials: 96% use <= 2, 1/329
  reaches 4. Radiant+Poison co-occurs officially ONLY via the Druid's
  spell list, so pair-level bans were rejected as FP-prone; the count
  rule + prompt discipline + audit exemplar cover it in layers.
- Generation prompt: DAMAGE-TYPE DISCIPLINE (one earned energy type,
  two max) and MOTIF FATIGUE (spore mechanics only for actually-fungal
  concepts — owner: "Deepseek really really loves spore attacks").

## Batch 20 — type honesty + naming corrections (2026-08-03)

**Type assignment diagnosis completed across three layers** (owner:
"Something is fundamentally wrong with type assignment and the
abilities" — Scaleglint, an "Elemental" that reads Aberration/
Monstrosity with fins but Fly-only movement):
1. Generation (batch 19): resolvedType + essence now IN the prompt. Not
   sufficient alone.
2. Synthesis/resolve (this batch): TYPE HONESTY clause — creature_type
   must be the type the identity actually EXPRESSES; fuse into it for
   real or declare what was actually written. The label-without-substance
   failure named explicitly.
3. Audit backstop widened: also corrects types the content never
   expresses at all (not just clear contradictions).
Plus ANATOMY COHERENCE in the generation prompt (fins → Swim, wings →
Fly) and the Fin Slash exemplar in audit principle 3.

**Naming corrections (owner: "not sure I trust the naming evaluation";
"Frosthowl Giant" → "Glacial Brawler" was a downgrade):** threshold
REVERTED to A/B-keeps (the A-only threshold made renames frequent while
the judge's candidates were the weak link); `demoteFormulaHeads` sorts
"-er" formula candidates last (demotion not rejection); global name-ban
stems ('uul', 'ulg') now ban UNCONDITIONALLY — the old 50% coin-flip on
the whole pool let "Ulgoth" ship on a tails.

**Boulderhatch defect harvest** (owner: "a hodgepodge of abilities"):
`dangling-use-ref` (bare self-delegation to a nonexistent action —
"uses Swarm Eruption"; official self-mention prose exempt via
Entangling Rope), `flat-damage-reduction` (0/329 — reject for
redesign), `rider-flat-bonus` (riders are pure dice — deterministic
recompute), `ba-opener` strip, `primordial-dialects` (only
Aquan/Auran/Ignan/Terran parenthesize — "Primordial (Giant, Aquan)"
splits). Hodgepodge identity itself → audit principle-3 anatomy
exemplars. Parked observation: Bristleback attack +11 with flat +6
against STR +7/PB +5 — attack-mod-coherence may have a raise-only gap;
check next batch.

## Batch 19 — type-blind generation fixed + gate opened (2026-08-03)

**Root cause of the recurring type mismatches found (owner diagnosis:
"are we missing context from the concept call?"): `buildGenerationPrompt`
never received the creature type.** The synthesis call resolved
creature_type with the essence mandate, but the generation call got only
the fused concept SENTENCES — the type survived as prose residue, the
model designed mechanics type-blind, and assembly stamped the label onto
the finished block (the Gemshard's Infernal languages were the model
expressing fiend-residue in the cheapest slot). Fix: `resolvedType` +
its TYPE_ESSENCES line now thread into BOTH generation prompt bodies
("Express the type in the creature's MECHANICS and substance — languages
and name alone do not make a type"). The audit's `type_correction` is
now the backstop, not the primary defense.

Also landed: **audit gate OPENED to all CRs** (owner: "the audit pass is
fine on all creatures"; live: CR 4 Muckmaw shipped "the released
creature" with no release mechanic — simple monsters do get fumbled).
~15 test suites updated for the always-on audit call. **swarm-half-value
rider fix**: typed riders ("plus 4 (1d8) Fire") no longer exempt the
entry (Sorrowsand shipped 7d8+6 → 18 (4d8), dice rounded UP and flat
dropped); the corrector anchors on ", or"/"the damage is" instead of
positional second-expression (which corrupted riders). **Name-fit
anchor** sharpened: a name mismatching what the creature DOES caps at C
(Muckmaw: swamp name on a psychic telepath).

## Batch 18b — type-correction channel (2026-08-02)

Owner: "Bad type mismatches..." (Blightwind Shatterer, a Giant that is a
teleporting mist; Shusker, a Construct that is a spore-bearing fungus —
third and fourth instances). Root cause: even when the audit FLAGS a
type mismatch, the fix ladder rewrites entry text and can never touch
the type field. New channel: the audit returns `type_correction`
(canonical list; "only CLEAR contradictions of substance, never theme");
`auditTypeCorrection` validates and the apply site guards — never a
USER-picked type (new `typeSource` option, embedded tools pass 'user'),
never Swarm forms. Also: `entry-name-meta-paren` strips
meta-instructions from entry names ("Disengage (if not already used)")
— the official paren set was enumerated from the corpus (metering,
Requires …, … Form Only, Recharge after …) after the corpus-acceptance
suite caught two FP shapes the ad-hoc sweep missed. Shusker's "numbing
nummings" word-salad noted as an audit principle-4 class (broken
English); no deterministic rule.

## Batch 18 — five blocks, threshold bump (2026-08-02)

Shakt / Glintwrithe / Rattling Slink / Whisperbone: clean, coherent,
numbers exact (Glintwrithe's Weaving Barrier + Interposing Glitter is
defender design worth imitating). Gliding Shade carried the batch's
defects:

- **Rename threshold raised to B-or-lower renames** (owner: "renaming is
  seldom happening") — only an A keeps now; missing/malformed grades
  still lean keep (`nameGradeKeeps` full-match validity: "excellent"
  must not read as a grade E).
- **Type-vs-substance** ("The shade is not a giant"): no deterministic
  rule possible; added as an audit principle-3 exemplar ("a 'Giant' that
  is a bodiless planar shade").
- **Empty defense segment**: "Immunities ; Charmed, Frightened" — the
  model left the damage half blank; assembly now tidies leading/trailing/
  doubled semicolons on all three defense fields.
- **rider-target-mismatch extended**: rider saves inside ATTACK entries
  re-targeting "one creature within N feet" (Forgetting Puncture) → "the
  target" (0/329 officials).

## Batch 17 — naming inversion + rename residue (2026-08-02)

**Naming pass inverted to KEEP-BY-DEFAULT (owner call: 3/4 live renames
were worse — Thawcap→Shiverfungus, Burrowing→Grinding Hardshell,
Icetread's provisional).** The provisional name now enters pickName FIRST:
it survives unless it fails a filter (bans, bathos, SRD/subclass
collision, seed leakage, hyphens, flat attack-descriptor heads — the new
FLAT_ATTACK_HEADS set closes the Swoop Talon loophole keep-by-default
would have reopened; 0/329 official names end in an attack noun). The
naming call still runs for ability_renames and for filter-failing
provisionals. Refined same day to a GRADE GATE (owner design): the call
grades the current name A-F (evocativeness / type fit / catchiness, with
"most decent names are B" calibration); A/B keeps, C or lower opens the
candidate pool (`nameGradeKeeps`). Missing/malformed grades lean KEEP —
the judge's improve-compulsion is the documented failure mode. Filters
stay hard gates at any grade. Grades logged (`naming grade: ...`) for
batch review. Refined again (owner design): on AUDITED blocks the AUDIT
call grades the name (`name_grade` field, `auditNameGrade`) — an
independent judge with no candidates to sell (the namer grading its own
predecessor had a conflict of interest). Audit grade A/B + provisional
passing pickName's filters → the naming call is SKIPPED entirely (a
saved call, offsetting the audit's cost); C or lower → the naming call
runs told "a separate evaluator graded it ${grade} — it is being
replaced". Unaudited blocks (CR < 5 non-legendary, degraded) fall back
to naming-call self-grading. Validated by accident in tests: "Gloom
Stalker" as a fixture provisional was correctly rejected — it's a ranger
subclass.

Rename residue fixes (3 live instances in one batch): renameInText now
pluralizes trailing-s matches ("thawcaps" → "shiverfunguses"); word-pair
self-reference mapping handles possessives ("the herder's") and bare
plurals. `choice-referent` rule: "of the <noun>'s choice" with an alien
noun rewrites to the official "of its choice" (officials use their OWN
name or "its" — Numbing Aura live text). success-half-only widened to
creature-variant clauses; prone-vocab covers "knocked Prone" (0/329).

Coherence verdicts (Gulfmaw/Shiverfungus/Icetread/Hardshell): all four
table-runnable; numbers perfect across the board; Engulfing Bubble is
counterplay-rich design worth imitating. Judgment-layer leftovers: Memory
Scent's "can smell the creature" self-referent slip; Icetread's
Reforming Shatter dead clause (chooses unoccupied, then "if occupied");
"Stalking Swarm" trait name on a non-swarm.

## Batch 16 — coherence-focused audit (2026-08-01)

Owner recalibration: idiom defects are fine; the bar is coherence,
usability, technical precision. Four blocks (Prism Lurcher, Shimmerscale
Serpent, Tarzotch, Lullaby Maw) yielded:

- `empty-entry` (reject, fix ladder): a named entry with no rules text
  (live: "Psionic Lullaby (1/Day)." with nothing under it). The audit HAD
  caught it but called the entry "Ethereal Lullaby" — the strict name
  lookup dropped a correct finding. Rails loosened: fuzzy entry resolution
  (unique shared-token match only) and spans verify against name+text so
  empty entries are quotable. Threshold is truly-empty (<3 chars);
  reroll pseudo-block name stubs are exempt via `_stub`.
- `swarm-content-untyped` (STRUCTURAL → regen): swarm/colony mechanics on
  a non-swarm block (live: Shimmerscale, a Medium Monstrosity with a
  dispersing colony). Name-aware detection (official swarms type by
  component with "Swarm of" in the name — 7/7).
- `undefined-area` extended to movement-path referents ("each creature in
  the line" after a move that defines no line — live: Tar Rush).
- `phrasing-rider-save` bridge 40→120 chars (re-swept 0/329; live miss:
  Tarzotch's Glistening with a 82-char targeting clause).
- `line-dimensions` also strips the redundant-width echo ("5-foot-wide
  Line that is 5 feet wide" — live: Spear-Swarm Strike).
- Audit prompt: principle 2 adds the no-rules-text backstop; principle 3
  adds swarm-mechanics-on-non-swarm and (batch 15) name-promise
  mismatches.
- NOT a bug: support/controller legendaries at 11-damage attacks — the
  archetype damage_mult (0.6/0.7) × legendary routine discount (0.6)
  compounds to ~0.36-0.42× base. On-budget by design; whether the
  compounding is too aggressive is a chassis design question, parked.
- Killed candidate: Emanation without "originating from" is official
  (Pit Fiend Fear Aura, 1/329) — no rule.
- `escape-dc-band` (owner concern: could audit-driven fix calls corrupt
  numbers?): every OTHER number is re-stamped by the post-fix re-lint;
  escape DCs were the one unchecked surface (dc-band exempts them by
  design). Now banded to max(8, save_dc−2) with a deterministic restamp.
- `unknown-action-ref` (reject, fix ladder): "the <X> action" must name a
  standard action or one of the block's own entries — officials reference
  only Hide/Dash/own attacks (live: "takes the withdrawal action").

## Batch 12 — post-close memo fixes (2026-07-29)

Three mechanical fixes + two sweep answers from the Scuttling Husk/Stoneswarm/
Tarwretch/Moon Moth/Shissk batch. Tests: batch12-regressions.spec.js (memo
verbatim text + official negatives).

1. **phrasing-rider-save** (reject, style-tier, 2024-gated): rider saves in
   the 2014 "must succeed on a DC n ... saving throw" / "unless the attacker
   succeeds" forms. Subject-scoped, 0/329: officials' swallow regurgitation
   saves have the MONSTER as saver; ability CHECKS keep the 2014 form
   officially (Gelatinous Cube); the subject→verb bridge allows comma-free
   targeting qualifiers only ("each creature in that area must succeed").
2. **dc-band per-instance**: detection now flags EVERY save-context DC outside
   ±1 of chassis (was max-only — Tarwretch's DC 15 riders hid under the DC 17
   primary). Corrector already swept per-instance; escape DCs exempt by
   regex construction. NOTE: officials with legitimate DC spread (Aboleth
   Mucus Cloud 14 vs budget 17) now show an advisory band hint on load in
   the edit UI — accepted; hints never block.
3. **removal-counterplay** (reject, rewrite ladder): removal-from-play
   (banish/swallow/plane-shift verbs, subject-scoped) requires a save gate or
   escape/interior-escape clause. 0/329 — devils' death-return ("its body
   disappears") has the monster as subject. Live: Shissk Void Latch.
4. **restrain-gate** (correctable, cc-aoe stamp mechanism): at-will no-damage
   attack applying Restrained gets "(Recharge 5-6)" stamped — 0/329 ungated
   in officials. Live: Moon Moth Web Lasso (legendary-reusable, 3+/round).
5. **Prompt rule 11 narrowed**: trait saves now explicitly allow the official
   Stench aura form and death explosions (Ghast/Hezrou Stench, Aboleth Mucus
   Cloud, Pit Fiend Fear Aura, Death Bursts — corpus-verified). The lint side
   (trait-imposes-save) already exempted triggered/timed saves; only the
   prompt was over-broad.


### Mechanical-audit judgment layer (2026-07-29, owner option c)

`format-2024/audit.mjs` — one LLM call auditing the assembled block against
five principles (counterplay, adjudicability, self-consistency, format
integrity, table usability) for the long-tail defect classes deterministic
rules can't see. Guardrails: gated to CR >= 5 or Legendary Actions (the
model doesn't fumble simple monsters); every finding must quote a verbatim
span (verifyAuditFindings drops non-substring spans — hallucinated defects
cost nothing); confidence filter (high+medium, principle 5 high-only);
capped at 6; findings merge into the FIRST fix round as extra problems on
the same rewriteFlaggedEntries call; never re-audited, never blocks
shipping, skipped when degraded. Low-confidence/dropped findings log via
logger.log for batch review. Cost: +1 call for eligible blocks only.
Tests: audit-layer.spec.js (validator-identity mock routing). Guards added
from live runs: structural rejects skip the audit (findings would merge into
a fix loop that never runs — Spinepounce); audit findings quote the
PROVISIONAL name (the naming pass runs later — expected). First end-to-end
win: Zizzak (both findings correct, fixes visible in the shipped block).
Judge miscalibration found there: it suggested a duration for Prone —
officials never duration Prone (0/329 + 0/327). Countered twice: a
calibration bullet in the audit prompt (conditions with inherent exits need
no duration) AND the deterministic `prone-duration` lint rule + strip, so
even a bad audit suggestion gets caught by the deterministic layer on the
next lint pass.

Engine answer for fix 2's question: only ESCAPE DCs are deliberately stamped
at save_dc−2 (prompt line + self-escape corrector); genuine rider saves at −2
are LLM drift — the escape number bleeding into real saves.

## Statblock Converter tool (2026-07-28, owner design)

New standalone tool (`src/tools/statblock-converter/`, page ids
`statblock-converter[-premium]`, entry + WP template included): paste any
statblock → deterministic edition detection + parse → FREE preview as the
detected edition's card → metered Convert → saved to the library
("Converted" folder) with BOTH printings (`other_edition`) → deep-link
funnel to the statblock generator.

Mechanics:
- `statblock-text-parser.mjs`: `detectEdition` (scored heuristics),
  `parseStatblockText` (line-based deterministic parse → legacy shape for
  2014, internal model for 2024; handles inline and tabular 2014 ability
  rows, the 2024 MOD/SAVE grid incl. proficient saves, headerless 2014
  traits, suffixed entry names). Parser tests use the sprint's real pasted
  batches as fixtures.
- LLM normalization fallback (owner call): a messy paste spends its quota
  unit on parse-call + conversion-call, the same two-call shape as a
  generation. The free preview NEVER calls the LLM; `parseStatblockText`
  reports `missing` fields and the UI says Convert will read the rest.
- Convert = `canGenerateStatblock` gate → optional LLM parse →
  `convertEdition` (full conversion gate incl. the BPS policy toast notes)
  → save with `other_edition` = source printing.

Follow-ups if wanted: premium WP template (copy the free one with the
-premium page id), a suite cross-link to the converter from the other
tools' SEO sections.

## Defect investigation (2026-07-25)

The 16-block field-test corpus was split verbatim into `fixtures/` and audited
under the seven-task brief; findings live in `docs/investigations/01`–`07`.
Implemented from it: weighted random-CR bands (`rollRandomCR`, report 06), and
the `bps-resistance` lint rule + prompt de-anchoring (report 05 — note the
chassis-gating trick that grandfathers official B/P/S carriers). Reports 02
(all fixture DCs already chassis-derivable — no fix) and 03 (orphaned
mechanics are a prose-structure limit) are evidence for future decisions.
### Investigation rules — IMPLEMENTED (2026-07-25)

Five findings were promoted to code, each corpus-calibrated to 0 false
positives against SRD 5.2.1 and covered by a behavioral spec. All are
2024-only and chassis-gated (the corpus sweep passes no chassis, so officials
are never linted by them):

- **`grapple-exit`** (report 07) — Grappled/Restrained without counterplay.
  Deterministic inject: `(escape DC save_dc−2)` for Grappled, the official
  repeat-save sentence for Restrained/maintained holds. Spec:
  `grapple-exit.spec.js`.
- **`cc-aoe`** (report 04) — ungated area + damage + hard condition
  (Stunned/Paralyzed/Petrified/Unconscious; Incapacitated excluded).
  Deterministic: stamp `(Recharge 5-6)`. Spec: `cc-aoe.spec.js`.
- **`legendary-reuse`** (report 01c) — legendary reuse of an ungated area
  effect or a save nova above ~1.5× per-attack. Deterministic: retarget to a
  single-target attack. Plus the report 01a prompt line in `slotInstructions`.
  Spec: `legendary-reuse.spec.js`.
- **`bare-targeting`** (report 03, recommendation 1) — a save clause targeting
  a bare "each creature" (no area) OR "one creature" (no range). Deterministic:
  default an area target to a 10-foot Emanation, a single target to "within 60
  feet". Widened to both quantifiers after the post-fix review (0/329 for
  each). Spec: `bare-targeting.spec.js`. A companion prompt rule (numbered rule
  11) also forbids filing a save-imposing ability as a Trait — post-fix batches
  showed the model putting active saves (Reedstrike Spectral Tangle, Strokeg
  Pacifying Aura) in Traits with no trigger. A backstop LINT rule for that
  (trait-imposes-save, 0/329) is designed but NOT built: its only correct fix
  is relocation to Actions, which can trip the hard `counts` reject, so it
  needs a deliberate fix strategy first.
- **Legendary routine-DPR discount** (report 08) — `damageBudgetFor` now
  multiplies the routine budget by `LEGENDARY_ROUTINE_DISCOUNT` (0.6) when the
  plan carries required/recommended legendary, matching the official ~0.55
  routine pacing. This CHANGES damage numbers on shipped-quality legendary
  blocks (~40% lower routine) — **needs field validation** (generate a CR 15
  and CR 21 legendary block, confirm the routine turn still bites). Spec: the
  `damageBudgetFor` tests in `generate-2024.spec.js`.

- **`multiattack-substitution`** (post-fix review, Strokeg finding) — a save
  entry woven into Multiattack ("replace one attack with X" / "and uses X")
  with damage above 2× per-attack. The single-target save number is a whole
  turn's budget; weaving it in runs ~1.7× the intended routine. Official
  substitution ceiling is 1.86× (Lamia) → 2× cap is 0/329. Recharge-gated
  weaves ("uses X if available") are exempt — nova cadence prices them.
  Deterministic: drop the offender from the alternation, or the whole clause
  when it's the sole target; the standalone action survives. Spec:
  `multiattack-substitution.spec.js`.
- **`trait-imposes-save`** (post-fix review; Spectral Tangle / Pacifying Aura)
  — a Traits entry that imposes a save ("Saving Throw: DC N, one/each
  creature") with no trigger phrase can never fire; officials' trait-saves
  are self-saves or carry triggers (0/329). Deterministic fix:
  **relocate-and-exempt (owner call)** — the entry moves to Actions with a
  `relocated: true` marker, and the `counts` rule scores relocated entries
  against their ORIGINAL section's plan range, so the move can never trip a
  counts reject. The prompt-side guard is numbered rule 11. Spec:
  `trait-imposes-save.spec.js`.

Three prompt lines accompany the lint rules (AoE-hard-condition gating, grapple
exits, Multiattack-weave damage cap) so the model avoids the defect before lint
fires.

### Batch-3 field findings (2026-07-27) — third live batch, 7 blocks

All chassis numbers landed exactly (defender ×3, lurker ×2, brute, balanced;
Engulf 67 = the lurker single-target budget, Ground Pound 66 = the defender AoE
budget). Five defects → five fixes, all in `batch3-regressions.spec.js`:

- **Spellcasting-ability raise-only stamp** (`assembleMonster`): a DC 25
  caster shipped on INT 16 — the `spell-dc-ability` reject has no entry-level
  fix when the DC itself is chassis-correct. The named casting ability now
  rises to `(DC − 8 − PB) × 2 + 10` (source-side, so the Slinky Boulder
  objection does not apply; mirrors the striker stamp). Both edition
  phrasings.
- **`trait-imposes-save` trigger scan** narrowed to the pre-*Failure* text —
  the Failure clause's own "takes 44 damage" was satisfying the trigger check
  (Softening Tremor, a (1/Day) save nuke that shipped in Traits). Pre-Failure,
  not pre-skeleton: the Aboleth's aura trigger lives in the TARGETING clause.
- **`grapple-exit` anchor + exits widened**: the anchor now also catches the
  nonstandard "the target is Restrained" application phrasing (parentheticals
  stripped; "if/that"-led preconditions excluded — Bugbear/Mimic/Ettercap/
  Vampire shapes verified 0-FP), and the exit set gained "until the X dies" /
  "uses an action to make a DC N check" (live Wardwall exits).
- **`hybrid-targeting`** (reject): a forcing lead-in that names the target
  followed by a skeleton with its OWN targeting clause ("forces one creature
  it has Grappled to make a Strength Saving Throw: DC 15, one creature within
  60 feet"). 0/329; no safe deterministic merge — the fix call rewrites it.
- **`resistance-unknown`** (correctable): resistance tokens that are neither
  damage types nor canonical conditions ("Blindness, Deafness") are dropped.
  Corpus: one Half-Dragon template-placeholder string, moot under the chassis
  gate.

### Concept-input handling + combat-identity enrichment (2026-07-27)

The name field is really a name-OR-concept field (`concept = name ||
description || seed`), relabeled accordingly ("Name or concept"). Naming is
deliberately left to the model on this path (owner call): proper-noun inputs
("Headless Horseman", "Pumpkin King") survive, generic descriptors ("Vicious
Bird" → Razortalon) get upgraded — live-verified, and the owner prefers this
over verbatim stamping. The random-path naming machinery stays random-path
only.

Against incoherent ability sets, the concept now carries a COMBAT IDENTITY:
- `buildArchetypeResolvePrompt` (user concept + Auto role) returns
  `{archetype, identity}` — 2-3 sentences on opener, per-round loop, and
  temperament — which the caller appends to the concept. `identity` is
  optional in the validator (backward compatible).
- `buildSeedSynthesisPrompt` (blank form) asks for the same 2-3-sentence
  shape in its `synthesis`.
- Both generation prompts carry a DESIGN COHERENCE directive (abilities must
  interlock; cut anything a GM would never use) — this also covers the
  manually-picked-archetype path, which makes no resolve call.
Live-verified: "Feywild mud monster" → Feymire Muck, whose entries visibly
execute the resolved identity (mud terrain aura → restraining ranged loop →
1/Day bloodied drag-down).

Also from that live run: `hybrid-targeting` gained a second sub-shape —
adjacent-sentence duplication ("targets one creature within 30 feet.
Saving Throw: DC 15, one creature within 60 feet") and the verbs
targets/chooses, all still 0/329. And the generation loop gained a **final
normalization sweep**: same-entry rename collisions (entry-name-caps +
trait-recharge both renaming one entry — first wins, second no-ops on the
stale name) previously shipped correctable leftovers with no wart, since the
round loop re-enters only on rejects.

### Batch-4 field findings (2026-07-27, post-enrichment)

Owner verdict on naming: much better with enriched concepts (Malmgrave,
Tarrakor, Gulch-Mother approved); only "Swoop Talon" (flat attack-routine
descriptor) disliked. All four blocks chassis-exact (skirmisher / controller
/ brute / skirmisher). Changes:

- **`undefined-attack-ref` now resolves "uses X" / "a use of X" references
  too** — Malmgrave shipped a Multiattack and a 1/Day both referencing "Wing
  Burst" after the recharge action was renamed "Shardstorm" (rename
  propagation gap; the lint is the safety net). Hardened extraction
  (alternations, trailing words, clause boundaries, "a use of" without a
  "uses" verb) — 26/26 official references resolve, 0 FP context-free.
- **Prompt rule 12 (2024) / rule 9 (2014)**: ability names are plain English
  (live coinages: "Urvoth", "Varthun"); creature names read like MM entries —
  real-word compound / folk name / coined word, never a flat description of
  the attack routine (the "Swoop Talon" class).
- **Dropped candidate** (corpus discipline): flagging 2014-style "must
  succeed on a DC N…" phrasing in 2024 blocks — officials still use it in 6
  blocks (Swallow interiors, Gelatinous Cube Transparent), the same
  rider-mechanic niche Gulch-Mother used it in. Not a defect.

### Batch-5 field findings (2026-07-27) — the naming split resolved

All four blocks chassis-exact. Decisive naming pattern: random-path blocks
(Grimecloak Cinder, Uulgrath) named well — they get the naming micro-call;
concept-path blocks kept producing flat attack-routine descriptors ("Shriek
Talon" after "Swoop Talon") — they never had it. Fix: **the naming pass now
runs on concept generations too** (`options.namePass`, opt-in; the Vue caller
enables it), with a keep-if-honored gate: if the model kept the user's typed
name verbatim it judged it a proper name (Headless Horseman) — no call, name
honored; if it renamed (or nothing was typed) the naming call refines with
candidates. `buildNamingPrompt` gained a seedless MM-register variant;
`pickName` already worked register-free. Cost: +1 micro-call on concept
generations that get renamed. Also: `entry-name-design-term` now rejects
mechanic suffixes in names ("Pinning Grip (Replaces One Attack)" — the
substitution belongs in Multiattack's text; 0/329).

Monitored, not actioned: coined ability names persist on the random path
("Ulgroth", "Chuul-oth" — instances 3–4 after Urvoth/Varthun; Chuul-oth's
hyphen shape is entry-name-coinage's territory, so it likely shipped as a
fix-round wart); condition immunities phrased as a trait ("cannot be
Frightened or Charmed" instead of the Immunities line — 1 instance); a 1-min
no-repeat-save Frightened (soft CC, officially adjacent but over-long — 1
instance).

### Batch-6 field findings (2026-07-27) — naming pass validated, three fixes

The concept-path naming pass landed its live test: "vicious bird" →
**Stormtalon** (concept field) and **Skreev** (lore field) — MM register both
ways; Skreev's Frightening Shriek even came out in the exact official
Frightful-Presence shape. Both blocks chassis-exact (CR 20 / CR 7
skirmishers). Three defects → fixes:

- **`multiattack-substitution` corrector pattern gap** (real bug): the rule
  FIRED on Stormtalon's Shriek weave (78 dmg > 2×26 cap) but the corrector's
  clause patterns didn't match the standalone-sentence shape ("It can replace
  one attack with a use of Shriek.") — a silent correctable leftover shipped
  (the final normalize pass can't help when the corrector itself can't
  match). Added standalone-sentence and and-clause patterns; the live shape
  now corrects to a clean Multiattack.
- **`hybrid-targeting`** gained the "is (also) affected by / subjected to"
  lead-in verbs (Dive Bomb: "the target is also affected by a Strength
  Saving Throw: DC 22, one creature within 60 feet"). Still 0/329.
- **`stat-ref`** (new): stat-block references ("use Strige statistics") must
  name an SRD creature or the block itself (the official Treant pattern). A
  unique closest match within Damerau-Levenshtein distance 2 respells
  deterministically ("Strige" → "Stirge" — transposition-aware distance
  breaks the Sprite tie); no/ambiguous match → reject for the fix call.
  Stat-references are excluded from `undefined-attack-ref`'s uses-scan.

### Batch-7 field findings (2026-07-27) — caster + support coverage

**Spellcasting-ability stamp VERIFIED live**: Grathun (CR 13 defender,
chassis-exact incl. the legendary routine discount — per-attack 14, AoE 22,
both to the digit) cast at DC 18 on INT 20 = exactly `(18−8−5)×2+10`, the
stamp's formula signature. Three changes from this round:

- **Ability-rename audit in the naming call** (zero extra calls): coined
  ability names hit 8 live instances (Urvoth, Varthun, Ulgroth, Chuul-oth,
  Vothar's Ire, Morvoth, Grelgor, Kragor) despite prompt rules — a regex
  can't tell "Flyby" from "Ulgroth" without a dictionary, so the judgment
  moved into the naming micro-call, which already reads every ability. It now
  returns `ability_renames`; `applyAbilityRenames` sanitizes (existing,
  non-protected names only) and `applyRenameMapping` propagates references.
  Runs on both the seed and concept naming paths.
- **Identity-immunity prompt guidance** (owner call): a creature whose BODY
  IS the element takes its signature type as a free IMMUNITY (Fire
  Elemental / dragon-breath rule); merely dealing a type earns resistance at
  most. NOT a lint — the corpus forbids it: 12 officials resist types they
  deal (Dragon Turtle breathes fire and only resists it; wights/vampires
  deal necrotic and resist it), so "deals it → immune" is officially wrong.
- **`instruction-leak`** (correctable): slot-description language parroted as
  meta-commentary in entry text ("This is a buff, heal, or enable action
  targeting allies." — Lumor, the support slot's own description verbatim).
  0/329 officials; the sentence is deleted deterministically.

### Batch-8 field finding (2026-07-27) — swarm live test

Chittix (CR 5 swarm) validated the whole swarm stack live: swarm type line,
the B/P/S package surviving the `bps-resistance` ban via its exemption, the
full 8-condition immunity set, verbatim Swarm trait, and budgets to the digit
(Sap Strike 18, Spore Cloud 18). One defect → **`swarm-half-value`**
(correctable): the Bloodied/half-HP reduced damage must follow the official
law — halve the dice count, keep the flat (Crawling Claws 4d8+2 → 2d8+2) —
but the block wrote 4d8 (18) → 2d8+4 (13), inventing a flat. The rule checks
n ≥ 2 primaries only (n = 1 reductions are corpus-irregular: Ravens drops the
flat, Venomous Snakes shrinks the die) and recomputes the second damage
expression deterministically. 0/329.

### Batch-9 field findings (2026-07-27) — high-CR swarms, malicious compliance round

Three swarms (CR 17/11/16), all chassis-exact — including an INT-24
mental-striker swarm (`attackStatFor` live) and legendary swarm budgets with
the routine discount to the digit. Four defects → three rules + one upgrade:

- **`swarm-half-damage` v2**: the substance check now demands a REAL
  reduction (clause + second, smaller expression) and gained a deterministic
  injector — halve the dice, keep the flat, splice the official clause after
  the first damage statement. Catches both live evasions: the clause absent
  entirely (Chittering Shredder) and the clause NEGATED ("If the crawler has
  half of its Hit Points or fewer, the damage is not reduced" — malicious
  compliance with the old phrase check). n = 1 primaries keep the reject
  path (corpus-irregular reductions).
- **`phrasing-hit-marker`** (reject, fix call): "Hit:" / "Hit or Miss:"
  markers are off-skeleton (0/329 in the parsed corpus) — live finding was a
  Hit: clause DUPLICATING the damage already stated. Deduplication surgery
  isn't safely deterministic, so the fix call rewrites.
- **`defense-restated`** (reject, fix call): a trait whose ENTIRE text
  restates the Resistances/Immunities lines ("Rattling Shell. The swarm has
  resistance to Cold and Lightning damage.") wastes a trait slot; 0/329.
  Partial restatements with a real mechanic attached (Frozen Carapace) stay
  legal. Second live instance of the class (Grimecloak's Steadfast Sentinel
  was the first).
- Noted: an Icy Rend hybrid-targeting wart shipped (the rule fired; three
  fix rounds failed; never-fail shipped it — working as designed), and all
  three swarm names begin "Chit-" — the naming-convergence/theme-clustering
  docket item's strongest single-batch evidence yet.

### Batch-10 field findings (2026-07-27) — post-fix swarms

The swarm-half-damage v2 law HELD in all three fresh swarms (correct
halve-dice-keep-flat reductions throughout), budgets exact again (incl. a
WIS-24 mental-striker swarm). Four new defects → fixes:

- **Swarm type pluralization was OUR bug**: the corrector's naive "+s"
  produced "Monstrositys"; the model matched it with "Undeads", and the
  swarm-of prefix satisfied the old check. `pluralizeCreatureType` (y → ies,
  Undead/Fey invariant) now backs both the wrap branch and a new
  written-plural validation; a subtype carrying a second swarm phrase
  ("... (Swarm of Tiny Beasts)") is dropped. Note: the wrap branch fires on
  official swarms IF force-given a swarm chassis (their JSON `type` is bare
  "Beast"), pre-existing and production-moot.
- **`legendary-resistance-uses`** (correctable rename): bare "Legendary
  Resistance" without "(N/Day)" reads as unlimited; officials always carry
  the suffix. Deterministic → "(3/Day)".
- **`reaction-trigger-referent`** (reject, fix call): a trigger whose
  subject is "The target" has no referent ("Trigger: The target takes
  damage from a melee attack roll" — meant the swarm itself). 0/329.
- Cosmetic one-offs logged, not ruled: "plus the target has the Prone
  condition" (plus→and), "the Frightened condition of itself" (garble),
  an "Acidic Aura" whose effect is neither acidic nor an aura, and a
  narrowed trait wearing the official "Magic Resistance" name.

### Anti-clustering name bans (2026-07-27, owner call)

The naming call converges on attractor stems ("Chit-" swarms ×6, "Feymire"
×2, shard/whisper/grim/cinder across batches). `rollNameBans` in
`concept-seeds.mjs` samples a random subset of `OVERUSED_NAME_STEMS` (global
pool + type/archetype-keyed extras) at 50% per stem on EVERY naming call —
statistical, not absolute: the stems stay reachable, the attractor breaks,
and no session memory is needed. The bans ride into `buildNamingPrompt` as a
prompt line AND into `pickName` as a hard candidate filter. Tuning the pool
is editing one exported object.

### Batch-11 field findings (2026-07-27) — name bans validated

Three fresh swarms: one "Chit-" of three — exactly the 50% statistical break
the ban design predicts (Kchak, Klickrazz escaped the attractor). Budgets
exact again; the half-damage law held in ALL THREE including the official
irregulars (an n=1 die-shrink at CR 1/4 and a 1d6+7 die-shrink at n=3 that
the ±1 tolerance correctly accepts). Two changes:

- **`defense-contradiction`** (correctable): a trait claiming Resistance to
  a type the Immunities line already covers (or Immunity where the line says
  resistance) — the lines are the authority; the claim sentence is stripped,
  the mechanic kept and re-capitalized. Entire-text cases stay
  defense-restated's business. 0/329.
- **Spellcasting-ability identity guidance** (owner question, corpus-backed):
  every SRD dragon (20/20) and elemental (4/4) casts with CHARISMA — innate
  magic; INT is for studied casters (Archmage, Mage, Lich, Glabrezu, Ice
  Devil, Night Hag, Spirit Naga, Sphinx of Lore); WIS for priestly/nature
  (Druid, Priests, Mummy Lord, Couatl, Storm Giant). Both edition caster
  instructions now carry the mapping with "when unsure, prefer Charisma" —
  the INT-20 elemental was the anomaly the owner flagged. Prompt-only; the
  ability stamp remains ability-agnostic.

### Batch-12 field findings (2026-07-27) — random spellcasters

The Charisma identity guidance landed 4/4 (swarm-beast, fey, construct,
undead-swarm casters ALL cast with CHA; stamp-signature scores exact on
three, the fourth within the ±1 lint band). Spell lists tiered correctly in
3/4. Fixes:

- **`swarm-heal-contradiction` v2**: the anchor was the literal "swarm
  regains N" — name/pronoun subjects sailed through (live: a can't-heal
  swarm with a regen trait AND a 24-HP drain heal). Widened to any
  "regains N ... Hit Points" subject; upgraded to correctable — heal
  clauses strip deterministically, heal-only entries are deleted. (The old
  reject contract's test updated.)
- **`entry-name-attack-suffix`** (correctable): "Chain Blade Attack" doubles
  every reference ("makes two Chain Blade Attack attacks"); renamed with
  reference propagation via applyRenameMapping (applyCorrections' `out` is
  now `let` for that). 0/329.
- **`squeeze-phrasing`** (correctable): "can squeeze through ... without
  squeezing" self-contradiction → the official "move through". 0/329.
- **At-will spell-tier prompt line** (both editions): at-will = cantrips or
  level 1-2 utility only (the Oni pattern); damaging/condition spells go in
  1/Day (live outlier: at-will Fear on a CR 7). Prompt-only — a lint needs a
  spell-level table; watch item.
- Working-as-designed sightings: a trait-imposed save with its trigger in
  the targeting clause correctly EXEMPT (Boneshake Aura), the referential
  "that creature" skeleton form used correctly after a targets-lead-in
  (Piercing Shriek), and Kchak's n=1 die-shrink reduction matching the
  official irregular.

### Batch-13 field findings (2026-07-27) — five defects, one own-goal corrected

- **Spell-stamp paren bug**: the stamp's regex required a closing \) after
  the DC, so the live "(spell save DC 24, +16 to hit with spell attacks)"
  continuation defeated it — a DC 24 caster shipped on WIS 20. (The +16 was
  exactly right for the WIS 28 the stamp should have written — the model
  derived the attack bonus from the required score, then printed the wrong
  score.) Regexes now paren-open like the lint's SPELL_DC_RES.
- **Weave extraction hardening**: "a use of its Enveloping Feed action" — the
  possessive prefix and "action" suffix broke resolution in
  multiattack-substitution AND legendary-reuse, so a 99-damage vampiric feed
  stayed woven. Both extractions and the weave corrector now strip
  its/the/action/attack. Also: a self-gated legendary option ("Envelop
  (1/Day)") is now EXEMPT from reuse capping — nova cadence prices it.
- **At-will spell-tier line CORRECTED (corpus discipline)**: the batch-12
  "utility only" line was wrong — the 2025 Lich casts FIREBALL at will,
  Black Dragons at-will Fear, Silvers at-will Hold Monster. Officials scale
  at-will with CR (~level ≤ CR/4). The prompt line now carries that formula;
  the planned offender-list lint is DROPPED (5 official hits).
- **Creature-type seed dimension** (owner observation: lifetime output had
  zero fiends/celestials/humanoids): `rollCreatureType()` — weighted,
  corpus-inspired, Beast-tail trimmed — joins the seed; the type is mandated
  in the concept, the synthesis prompt, and the synthesized concept.
  Follow-up idea (not built): mythic/folklore registers à la the item
  generator, culturally handled.
- **Stale-bundle advisory**: two live escapes (a bare targeting clause and a
  79%-hot support claw) are caught by CURRENT code in isolation tests —
  suggesting the generating browser tab ran a stale bundle. Hard-refresh
  before the next batch; if either recurs on fresh code, it's a real
  pipeline-order bug and worth a deep trace.

### Batch-14 field findings (2026-07-27) — fresh bundle, type dimension validated

Six randoms on a hard-refreshed bundle: ZERO correctable-class escapes
(confirming batch-13's two anomalies were the stale tab), and the
creature-type dimension delivered immediately — Fiend, Fey, Construct,
Undead, Aberration ×2, no monstrosity/plant/ooze clustering. All six
chassis-exact, including identical CR-16 brute twins and a defender CR-22
with the discount to the digit. Changes:

- **`identity-immunity`** (correctable; owner asked twice, 3 live
  instances): a creature whose NAME carries an elemental material AND that
  deals the matching type is elementally bodied → its resistance upgrades
  to immunity (moved between lines, semicolon structure preserved). The
  deals-the-type condition exempts the Giant Fire Beetle (named for its
  glow); 0/329 after that refinement.
- **Cosmetic normalizers** in assembly: movement modes capitalize ("burrow"
  → "Burrow", "(hover)" stays lowercase); languages "none" drops to the
  renderer's em-dash.
- Shipped-as-designed warts observed: a self-named trait ("Obsidian Hound"
  on the Obsidian Hound — entry-name-self fired, fix rounds failed) and a
  grapple-keyed carapace on a grapple-less block (the Task-3 referent-orphan
  class, recurrence logged). Owner note for the future: undead-obsidian-
  hound-style type dissonance is a LORE hook — the pending Lore Generator
  migration could generate origin stories for exactly these.

### Batch-15 field findings (2026-07-27) — the re-roll session

Entry/section re-rolls held the numbers (a section re-roll rebuilt Slash at
the exact per-attack budget) but exposed a new class: **section-shape
mismatch** — re-rolling an Action produced reaction-phrased entries ("can use
its Reaction to force...") under the Actions header. Because the re-roll gate
runs the full lint on a pseudo-block, one new rule protects both paths:

- **`section-shape`** (reject): reaction phrasing outside the Reactions
  section (0/329; "can't take Reactions" riders excluded). In re-roll flow a
  failed retry PRESERVES the original — the safe outcome, covered by a
  behavioral rerollEntry test.
- **`reaction-damage-band`** (correctable): the SRD has only THREE reactions
  (all defensive spellcasts, ZERO damage) — damage-dealing punish reactions
  are entirely our house pattern, taught by our own prompt example at
  half-attack scale (7 (2d6)). Every generated reaction until this session
  obeyed it (7-14); the re-rolled 33-damage Venomous Retort was full-attack
  scale. Cap = perAttack/2, ×1.3 band, dice re-solved; attack-reuse
  reactions ("makes one Slam attack") exempt.
- **CR stays fixed on re-roll (owner question answered)**: the 2024 engine is
  budget-first — CR is the design INPUT the whole chassis derives from, so a
  post-hoc CR recalculation (the legacy-2014 calculateCR paradigm) would
  fight regeneration and the sidebar contract. Overweight abilities are
  banded back to the CR instead — that IS the mechanism that keeps the block
  at its printed CR. No toast needed; nothing drifts anymore.

### Soak batch (2026-07-27) — 10 randoms, findings counted

**10/10 chassis-exact** (defender ×3, controller ×2, lurker ×2, artillery,
skirmisher ×2; type dimension spread incl. an LG Beast and an LG Undead). NOT
zero-mechanical: 2 mechanical + 2 contradiction classes, all fixed:

- **Weave extraction article gap**: "replace one of them with **a** Shatter
  Volley" (bare article, no "a use of") escaped multiattack-substitution —
  and exposed that the rule capped only DAMAGE, missing at-budget woven
  AoEs. New law (both swept): a DAMAGING ungated area save never weaves
  (officials weave damage-less area saves — Sleep Breath — and state-gated
  splashes — Kraken Fling, exempted via the Grappled-ammunition gate, which
  deliberately does NOT exempt the oversized-damage cap). The weave
  corrector's subject is now bounded to 1-2 words after "The" — an open
  match once swallowed the whole Multiattack sentence.
- **`identity-immunity` Elemental branch**: "Shiveroth" (cold elemental,
  cold-resistant) slipped the name-stem list — Elemental TYPE + dealt
  NONPHYSICAL type + resist-only now upgrades too (physical excluded: the
  official Water Elemental resists the Bludgeoning it deals).
- **`success-damage-orphan`** (correctable): "Success: Half damage" on a
  save whose Failure deals none — the phantom reference strips. 0/329.
- **`duplicate-entry`** (reject): identical entry texts under different
  names in one section (two legendary options both making the same attack).
  0/329. NOTE: this rule made a Vue spec fixture with identical filler texts
  retry — fixture texts must be distinct.
- Logged cosmetics (no rules): Beast with INT 18 (type-INT dissonance),
  a self-name typo ("valthorn"), one garbled sentence, a phantom "if
  available" on an ungated action.
- Unrelated: a rare dungeon-generator door-conversion flake surfaced during
  the full run → `plans/dungeon-door-conversion-flake.md`.

### Soak 2 (2026-07-27) — the tail is long; one engine bug found

10 randoms: 3 mechanical findings (more than soak 1 — do not extrapolate
"done" from one quiet batch). Fixes:

- **`multiattackCount` summed wrong** (engine bug, explains the batch-13
  Uuloth anomaly): the max-of-any-number heuristic read "makes two Barbed
  Thorn attacks and one Claw attack" as 2, sizing each attack at HALF the
  budget instead of a third → a 150% routine shipped band-clean. Now: a bare
  stated total wins ("makes three attacks: ..."), else named groups SUM,
  max-heuristic last. Official shapes verified unchanged.
- **`legendary-recharge`** (reject): a legendary option must never recharge
  another ability ("Recharge Cannon" — one use converts a Recharge nova into
  an every-round 59-damage line). 0/329.
- **`hybrid-targeting` adjacent form generalized** past specific lead-in
  verbs: any range-bearing single-target sentence followed by a skeleton
  naming a FRESH generic target flags (live: 300-ft lead-in vs 60-ft
  skeleton). Referential follow-ups ("that creature") stay legal.
- **Smalls**: `defense-line-separator` (comma-only mixed defense line →
  official semicolon rebuild), instruction-leak meta-PARENTHETICAL shape
  ("(conditions can be applied by this action description)"),
  `trait-bonus-action` relocation ("As a Bonus Action, ..." traits move to
  Bonus Actions; grant-form traits like Nimble Escape stay). The relocation
  counts/section-structure exemptions generalized to any destination.
- **Corpus kills the Dragon-immunity branch**: the Dragon Turtle officially
  RESISTS the fire it breathes — so a poison-resistant spore dragon is
  official-shaped variance, not a defect. Logged, no rule.
- Tallies: referent orphans ×2 (tar-trails, phantom grapple), capitalized
  self-names ×2, S-alliteration across 6 lurker names (the lurker phonetics
  guidance drives sibilants — batch-level monotone, noted under clustering).

### Concept soak (2026-07-27) — the input-path validation

10 GM-style inputs (proper names, descriptors, a lore dump, a bathos trap).
Wins: **keep-gate 4/4** (Mordecai, Old Gnawbone, Vexanna, Clockwork Leviathan
verbatim), "evil tree" upgraded, cheese golem passed the bathos test with
real mechanics (rind-hardening phase shift), first Celestial, at-will spell
tiers held, and the lore dump produced the sprint's best block (Mournbell —
the lighthouse concept fully realized). Numbers 10/10 chassis-exact. Five
fixes:

- **Swarm machinery now gates on the archetype OR a swarm-shaped type line**
  — a concept-path swarm resolved to skirmisher and skipped EVERYTHING
  (shipped "Tiny Swarm (Beast)", no half-damage clause). swarm-type unified:
  any non-canonical shape resolves a component and rebuilds "Swarm of Tiny
  <Plural>"; new `swarm-size` (swarms are Medium/Large — components are
  Tiny) whose applier re-derives the hit-die formula for the corrected size.
- **Pronoun pass**: the first she/her block (Vexanna) exposed It/its-only
  regex subjects — section-shape and the weave corrector now know
  her/his/their and She/He/They. Grep for gendered assumptions when adding
  subject-anchored rules.
- **`hybrid-targeting` third form**: an attack line followed by a
  fresh-target save skeleton ("...8 damage. Strength Saving Throw: DC 14,
  one creature within 60 feet") — riders say "the target" (the Rivet Shot
  form, which a same-batch block got exactly right). 0/329.
- **`multiattack-order`** (correctable): Multiattack leads Actions (0/329
  exceptions); buried ones reorder deterministically.
- **`legendary-recharge` exemption**: self-gated options ("Pressure Release
  (2/Day)") are bounded — nova-cadence pricing, consistent with the Envelop
  precedent.

Naming-quality round (owner observations): (1) type-coded name words —
`RESERVED_TYPE_WORDS` (golem/wraith/zombie/angel/demon/... → their types;
"vampire" excluded, the Vampire Familiar is a living Humanoid) enforced in
pickName with trailing-boundary matching (catches fused "Chainwraith", spares
"Lichen"/"demonstrate") plus a prompt line — kills the Fiend-named-Golem and
Celestial-named-Wraith class. (2) The random path's weaker names were
diagnosed as CONTEXT STARVATION, not filter strictness: the naming call only
saw size/type/abilities. It now receives THE STORY (the concept/synthesis,
350 chars) and asks for seven candidates ranging safe-to-bold. Filters stay
— they are what killed Slinky Boulder.

Post-soak nit (owner): the needle swarm typed itself Beast — animated objects
are Constructs in official taxonomy (Animated Armor/Flying Sword). New prompt
rule 13 (2024) / rule 10 (2014): type follows SUBSTANCE — animated objects and
machines are Constructs, dead things are Undead, only living animals are
Beasts. Prompt-only; type choice is semantic and unlintable.

Logged: epithet self-references ×2 ("the tree", "the warden" — rule-7 prompt
guidance not fully holding; candidate for the naming call), name-effect
mismatches ×2, a trait mashup with a dangling referent, concept drift (swamp
witch → aberration — the model re-typed; acceptable but note), a 60-ft-radius
1/Day fog (zone SIZES are unbanded — corpus study needed before any rule),
and an at-will no-damage single-target Paralyze with success-immunity
(Task-4 gray zone; the 24h immunity is real counterplay).

### Random soak 3 (2026-07-27) — the double-count bug + naming verdict

Six randoms after the story-fed naming change. Numbers exact again (incl. the
first CR 30 — every figure to the digit). THE find:

- **`attack-damage-band` double-counted swarm reductions** — the reduced
  half-damage expression is an ALTERNATIVE but the band summed both, so
  every correct swarm attack since the half-clause law fired a phantom
  multi-expression reject (27+14 = "41, restructure to 27"), silently
  burning fix rounds on every swarm — until a fix call finally PASTED the
  reject message verbatim into a shipped ability text, exposing the whole
  chain. Fixed: the reduction clause strips before damage extraction; the
  instruction-leak rule gained the lint-echo shape with a comma-anchored
  strip (the legitimate reduction text survives).
- **`legendary-recharge` bypass phrasings**: "retakes a Vomit Web action
  (no Recharge roll required)" — recharge-bypass without the word
  "recharges". Widened; self-gated options stay exempt.
- **Naming verdict (owner)**: random names improved at the top (Bilewurm,
  Shissar, Chazkor genuinely good) but the "<modifier> <verb>-er" formula
  (Silk Shambler, Stalking Webspinner) reads weak from this model — new
  naming-prompt line caps -er candidates at one and points at fused/coined/
  concrete-noun alternatives. Model-ceiling note: concept-path quality
  partly reflects the CONCEPT AUTHOR's model; a Dread-Bellringer-class name
  needs a Dread-Bellringer-class concept.
- Tallies: acid/slime/grapple KIT clustering across batches (seed-diversity
  docket — the theme attractor is at the kit level, not just names);
  hybrid-targeting warts ×2 shipped (rule fires, fix calls struggle with
  this class — candidate for a deterministic same-area merge); "the silk"
  wrong-half self-reference; "Paralysis" condition-name variant; an
  "ignores Resistance" power rider (0/329, watch).

Still open from batch 3 (cosmetic/deferred): the article-strip ("The Viscous
Hoop") only runs at assembly, so fix-call rewrites can reintroduce "The "
names; name collision within a batch (Swallower / Silent Swallower) and theme
clustering (tar/ooze/engulf ×4) persist — the seeding-memory docket item; the
Silent Swallower's CR 1/4 lurker per-attack budget (3) is below the smallest
representable dice+mod damage, so tiny-CR lurkers ship over-band by
construction (band floor, not model disobedience).

### Investigation findings NOT promoted

Report 09 found the "bimodal defense" (high AC + low HP) hypothesis does
**not** reproduce, and the one combination that does escape band (HP × broad
resistance) is already closed by Task 5's B/P/S ban for all non-swarms. **Note
the three defense rules — `hp-band`, `ac-band`, `defense-count` — are
independent and do not price their multiplicative product; this is intentional
given Task 5, do not assume they compose.** Report 03's referent-phrase
heuristics and the `area`/`timing` schema fields remain deferred (see the
report).

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
