# Task 1: Legendary Action Costing — Enforcement-Point Comparison

## What the engine enforces today (and the hole)

- `attack-damage-band` (lint.mjs) runs on **every entry with an attack
  line, including Legendary entries**, capping at the per-attack budget.
  Fresh legendary *attacks* are therefore already held to one attack's worth
  — which is the official ceiling (Lich, ratio 1.0).
- **Save-based damage has no band at all** — anywhere. It is prompt-guided
  ("about ${saveDmg.avg}") but never linted post-parse.
- **Reuse entries ("The X uses Y") carry no numbers** and are invisible to
  every numeric rule.
- The slot plan's legendary output is status/uses/resistance only;
  `slotInstructions` says just "Include a Legendary Actions section (2-3
  entries)" — no per-option costing guidance of any kind.

## Corpus law (30 official legendary blocks, SRD 5.2.1)

- **Fresh** legendary damage: never exceeds one attack's worth (max ratio
  1.0 — Lich; 90th percentile ≈ 0.6; dragons' fresh AoE legendaries sit at
  ~half their breath dice).
- **Reuse** is the dominant idiom (24/30 blocks) and its targets are:
  Spellcasting, single attacks ("makes one Rend attack"), single-target
  saves (Kraken Lightning Strike, ratio **1.38** — the official ceiling;
  Mummy Lord Dreadful Glare, 1.0), or movement.
- **Zero official legendary entries reuse an ungated area effect.** Dragons
  recharge-gate the breath and never legendary-reuse it; their AoE
  legendary options are fresh, half-scale dice.

## Fixture evidence: every violation is a REUSE entry

8 of 16 fixtures have Legendary sections. Fresh entries are uniformly
official-scale (single-attack reuses, movement, one 7-damage AoE, a Prone
rider). The violations:

| Fixture | Entry | Offense |
|---|---|---|
| 07 skittering hive | `Psychic Pulse. The Skittering Hive uses Psychic Pulse.` | replays an **84-damage 20-ft AoE** (1.5× its per-attack) every round, on top of Multiattack — the chassis priced that AoE as an action *alternative*, not an add-on |
| 07 skittering hive | `Coiling Grasp` reuse | spams the no-exit permanent Restrain engine (compounds Task 7) |
| 11 whisper shifter | `Buried Grasp` reuse | 55-damage save nova, ratio 1.49 — just past Kraken's 1.38 ceiling |

(Fixture 10's `uses Shatter Armor, if available` is legal — the target is
Recharge-gated and the gate persists through reuse; the "if available"
phrasing is official-compatible.)

So the defect is precisely: **unpoliced reuse targets**, with ungated-AoE
reuse as the table-breaking case.

## The three enforcement points, compared

### (a) Prompt guidance — cheap, moderate reliability
Add to the legendary `slotInstructions` line: each option is one attack, a
movement, or a minor effect at ≤ one attack's damage; reuse may target only
single-attack actions or Recharge/N-Day actions ("if available"); never an
ungated area or save effect. **Cost:** one template line, zero runtime.
**Reliability:** moderate — phrasing rules have complied well this sprint,
but reuse is unskeletoned free text, exactly where the model improvises,
and there is no behavioral test for compliance (prompt-string assertions
are banned; only generation-time lint can observe it).

### (b) Chassis/slot-plan template slots — highest cost, no reliability win
Extend `resolveLegendary` to emit typed per-option slots (attack-reuse /
movement / small-effect) enforced via the slot-TAG protocol. **Cost:**
largest diff surface (spec JSON + slot-plan + prompt formatting + lint slot
checks). **Reliability:** the TAG protocol has a proven substance gap (the
swarm-half-damage live failure: model satisfies the tag without the
mechanic), so (b) still needs (c)'s substance checks to be trustworthy —
it duplicates (c) at higher structural cost. Not recommended.

### (c) Post-parse cap — moderate cost, complete coverage
New lint rule `legendary-damage`, chassis-gated (Kraken/Mummy Lord sit at
1.0–1.38, and officials are never linted with a chassis, so corpus FPs are
impossible by construction):

1. For each Legendary entry, resolve **effective damage**: fresh dice sum,
   or follow a `uses <Name>` reference into Actions (name-matching
   machinery already exists for the Multiattack lint /
   `PROTECTED_ENTRY_NAME_RE`).
2. Flag when the resolved target is an **ungated area/save effect**, or
   when per-use damage exceeds the per-attack budget × the existing band
   tolerance (accommodating the official 1.38 ceiling).
3. Deterministic corrections, no LLM call: retarget the reuse to the
   block's named attack (`uses X` → `makes one <Attack> attack` — official
   phrasing, target name known), or re-solve fresh save dice via
   `saveDamageDiceFor` at per-attack scale.

**Cost:** one rule + reference resolver + two appliers + behavioral tests
(fixture corpus gives 3 true positives and 20+ true negatives immediately).
**Reliability:** complete for the observed failure class; zero dependence on
prompt compliance.

## Recommendation

**(a) + (c); skip (b).** Prompt line prevents most instances at zero cost;
the post-parse cap catches the rest deterministically. This is the
pipeline's proven pattern (prompt guidance → corpus-calibrated lint →
deterministic fix) applied to the one section that currently has no numeric
supervision. Not implemented — Task 1 is investigation-only per the brief.

## Blast radius (if implemented)

Generated/re-rolled blocks with Legendary sections only (8/16 of field
output). Reuse retargeting preserves entry names (no rename propagation
concerns). The corpus sweep never sees the rule (chassis gate). Interplay:
Task 7's grapple-exit injection independently defuses the Coiling Grasp
case; Task 4's cc-aoe rule doesn't touch these (no hard condition on
Psychic Pulse) — the three rules are complementary, not redundant.

## Residual risk

- A reuse whose target name is misspelled resolves to nothing — the
  resolver must treat unresolved references as a (existing) missing-action
  defect, not silently pass them.
- The 1.38 official ceiling is a single data point (Kraken); the band top
  (~1.5× per-attack) is an editorial call. If grognards flag Buried
  Grasp-scale reuses as acceptable, the band is one constant.
- Spellcasting reuse (officially common) must stay exempt from damage
  resolution — spell damage lives outside the entry text. Exempting
  `uses Spellcasting` is one clause, but a generated caster's oversized
  spell via legendary reuse would then be unpoliced (officials cap this by
  spell choice; our caster instruction already pins the DC but not per-spell
  damage).
