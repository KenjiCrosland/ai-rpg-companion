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
