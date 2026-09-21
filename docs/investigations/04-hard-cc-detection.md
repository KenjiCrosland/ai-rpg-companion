# Task 4: Repeatable Hard-CC Detection — Prototype + Calibration

## Prototype design

String-only detector over the existing entry structure (per Task 3's finding,
this is a string-parsing job — no output-format change needed). Signals per
entry:

- **Application phrase** (not mere mention): 2024 `has the
  (Stunned|Paralyzed|Petrified|Unconscious|Incapacitated) condition`
  applied to *the target/each creature*; 2014 `\b(?:be|is)(?: also)?
  (stunned|paralyzed|...)`. The target-application anchor is what suppresses
  immunity lines, pack-tactics wording ("the ally isn't Incapacitated"),
  save-advantage traits, and self-referential clauses (Steam Mephit's
  "unless the mephit has the Incapacitated condition").
- **Gating**: `(Recharge X–Y)` / `(N/Day)` in the entry name, or "once per
  day" in the text.
- **Cadence amplifiers**: entry named in a Multiattack text (case-insensitive
  — the 2014 fixture's "paralyzing sting" reference needs it); Legendary
  Actions section (refreshes every round); spatial-area targeting ("each
  creature in a Cone/sphere/within N feet").
- **Payload**: damage dice in the same *Failure:* clause as the condition.
- **Duration**: one-round vs save-ends/minutes.

## Fixture run: 5/5 applications found, clean separation

| Fixture | Entry | Signal profile |
|---|---|---|
| 01 shusgh | Paralyzing Sting (Actions) | at-will, in Multiattack, save-ends 1-min Paralysis, DC 21 |
| 01 shusgh | Vulg'oth Gush | correctly passed — Recharge 5-6 (official Mind-Flayer shape) |
| 04 lasher | Confound (Legendary) | ungated 1-round single-target Stun, every round |
| 07 skittering hive | Swarm of Psychic Bites (Actions) | at-will attack rider, 1-round single-target Stun |
| 16 sporegnash | Spore Burst (Actions) | **ungated + Multiattack-substitutable + 20-ft AoE + 59 damage + Stun** |

Zero false positives on the negatives (fixtures 08/09/10 condition mentions,
fixture 07's immunity line). Hit rate: 4 flagged / 16 blocks = 25% of the
field-test corpus carries ungated hard CC.

## Corpus calibration — the naive rule is NOT promotable

Running "ungated hard-CC application → flag" over the 329 SRD 5.2.1 blocks
produces **29 official hits**. The officials deliberately ship:

- At-will single-target hard CC at every tier: Ghoul/Ghast claws (Paralyzed),
  Lich Paralyzing Touch (damage + Paralyzed, in Multiattack, CR 21), Mummy
  Lord Dreadful Glare (damage + Paralyzed, CR 15), Cloud Giant Thundercloud
  (attack rider Incapacitate), Cockatrice/Pseudodragon/Homunculus.
- Legendary-cycle Incapacitation: Gold Dragon Banish (every round via uses).
- Most surprising: **un-recharged AoE Incapacitation substitutable into
  Multiattack** — Brass Sleep Breath and Silver Paralyzing Breath have no
  Recharge tag in the 2025 MM. Their tell: they deal **zero damage** and
  ladder the condition (*Failure* → *Second Failure*).
- At-will LONG-duration hard CC also exists, but always behind a
  state gate: Chuul (only creatures it has Grappled), Vampire Familiar
  (only at 0 HP), Cockatrice (laddered).

So neither "repeatable", "AoE", "legendary", nor "long duration" alone
separates generated sins from official design. Duration is not clean either.

## The corpus-clean promotable rule

**Ungated + spatial-area targeting + hard condition (Stunned / Paralyzed /
Petrified / Unconscious — NOT Incapacitated, which officials spend freely) +
dice damage in the same Failure clause.**

- Official corpus: **0/329 matches** (verified).
- Fixtures: exactly **1** — Sporegnash Spore Burst, the worst offender (an
  every-turn party-wide stun with full AoE damage attached).

Root cause of that instance: the prompt's AoE guidance fixes the damage
budget but says nothing about condition riders on AoE entries; nothing
requires a Recharge tag when a hard condition rides an area effect.

**Narrowest fix** (not implemented — Task 4 is prototype-only per the
brief): a `cc-aoe` lint rule with the four-signal conjunction above, tier
`reject` with `RENAMEABLE_RULES`-style fix guidance ("add (Recharge 5–6) or
drop the condition to a soft one"), running on the sections model (which
carries the `*Failure:*` markdown anchors the corpus data confirmed). A
companion prompt line ("an area effect that deals damage may not also apply
Stunned/Paralyzed/Petrified/Unconscious unless the entry is Recharge or
N/Day") would prevent most instances before lint.

**Blast radius** if promoted: generated/re-rolled blocks only; the corpus
sweep proves zero official-pattern collateral; recharge-tagged designs
(the Mind Flayer shape) unaffected.

## Residual risk / the un-lintable gray zone

- Single-target repeatable hard CC (fixtures 01, 04, 07) sits squarely on
  official precedent and CANNOT be auto-flagged without judging CR/DC/
  duration holistically — Shusgh's DC 21 save-ends paralysis is the Chuul
  pattern scaled to CR 19, which a grognard may or may not accept. This is
  reviewer territory, not lint territory.
- The rule reads `each creature in/within` as its area anchor; a novel area
  phrasing ("all creatures inside the cloud") would slip. The prompt
  skeleton makes targeting phrasing highly regular, so exposure is low.
- Laddered no-damage AoE CC (the official Sleep Breath shape) stays legal by
  design — if generation starts imitating it badly (e.g., skipping the
  ladder), that is a different defect with a different detector.
