# For the critic — reskin engine, 2026-11-03 (second package of the day)

**Supporting files**

- [CHECK-sweep-2026-11-03T23-14-10.md](scripts/smoke-evidence/CHECK-sweep-2026-11-03T23-14-10.md) — checker table, the 5 FAILs, bands, clause coverage
- [LINT-sweep-2026-11-03T23-14-10.md](scripts/smoke-evidence/LINT-sweep-2026-11-03T23-14-10.md) — 2 findings across 40 sheets
- [smoke-out/sweep-2026-11-03T23-14-10/](smoke-out/sweep-2026-11-03T23-14-10/) — raw JSON + per-sheet traces for the forty
- [smoke-out/pumpkin-six-2026-11-03T22-27-06/](smoke-out/pumpkin-six-2026-11-03T22-27-06/) — the BEFORE six
- [smoke-out/pumpkin-ten-2026-11-03T23-04-17/](smoke-out/pumpkin-ten-2026-11-03T23-04-17/) — the AFTER ten

Both block sets are in this document: the Pumpkin King pair first (§A), then the forty (§B).

**Read this first: the forty is a regression check, not a read on the main change.** Only 3 of its 40 sheets exercise the day's headline work. Scoring it as a verdict on that work measures the wrong thing.

## The change, and where its evidence actually lives

A concept of **three significant words or fewer** is now expanded by the identity call *before* routing, instead of being routed on two words. Same two calls, reversed — no added cost. Print names (Ogre, Owlbear) keep the old order.

The evidence is a paired run on one concept, not the forty:

| "Pumpkin King" ×N, CR 10 | before | after |
|---|---|---|
| distinct donors | 2 | **5** |
| Clay Golem kit (Absorption + Siege Monster) | **5 of 6** | **1 of 10** |
| damage types across rolls | 5 | 7 |

Every Pumpkin King used to be a recoloured Stone Golem; the same prompt now yields a thrower, a grappler, a regenerator, a charger. **§A below is what's worth your time.**

In the forty, the three expanded sheets are `lizardfolk monk` (#33 Pool-Watcher Shesh), `the thing in the well` (#35 Well-Drowned), `Brother Halric` (#40).

## Also landed since your last read

- **Three print-backed refusals on authored rows** — turn-denial may not ride a Bonus Action (print: 0 of 329); `"the first time each turn"` is refused (0 of 329 — it means once on *every* creature's turn); one row may not both damage and heal (0 of 329). This answers your economy finding, partly.
- **CR calibration** — recharge AoE capped to print's CR 12–20 plateau (it ran 12–32 over); Legendary Resistance/actions floored at CR 10; Dodge-every-turn priced at 1.6× effective HP.
- **The Dart 4d4 you flagged is fixed.** Print's largest d4 attack row is 3d4, and the cap was missing from the weapon re-dice pass.

## Please don't spend findings on these

- **`Javelin 4d6` is print-legal** — print's maximum count for a d6 weapon die is 7d6. No change made; yours was the one flag I checked and declined.
- **`lack-honored` on the Adult Red Dragon** is a deliberate trade. The arm that honoured "blind in one eye" fired three times across two gate runs and produced three defects (stripped a dragon's blindsight, muted a giant who "speaks only Giant", doubled a Languages line). Reverted; the lack goes unhonoured on purpose until a field can tell partial from total.
- **The 5 FAILs.** This batch has run 2, 6, 2, 3, 5 with no code change between some of those. Four of five sit on sheets the change can't touch; the fifth is a class that recurred independently on 10-29 and 11-02. The *count* isn't signal; a recurring *class* would be.

## Three corrections you should have, from measurements today

1. **The "unasked Fear Aura" you kept flagging is not a default.** It is the nearest-template substitution standing in for an idea the catalog could not render — `fear-aura` 14×, `push-prone` 16×, `relentless-pursuit` 16× across ten runs. The earlier trace blaming "the donor's own composition" pointed at the right place for the wrong reason.
2. **Two of your four proposed economy rules fail print.** "Stun from a non-Reaction row is recharge or X/day below CR 10" — print has 16 such rows below CR 10 (Ghoul CR 1 at DC 10, unlimited; Harpy CR 1; Chuul CR 4). "A bonus action with a use limit when it imposes a condition" — 10 of print's 15 carry no limit. The turn-denial half survived and is built. "A Reaction with exactly one effect" has no basis either: print has 3 Reaction rows in all 329 blocks, all the same Counterspell.
3. **`orphan-action-row` is pulled, and it was flagging your own Keeper.** Print ships 38 Actions with no damage, no limit and no Multiattack swap — Harpy/Luring Song, Ghost/Etherealness, Imp/Invisibility. The rule excused print's rows *by name*, so an invented row of identical shape read as a defect. On the 11-03 forty it flagged the Vess Drowned Choir's "One Voice", which you named that sheet's Keeper. `double-space-label` is also gone (invisible after the whitespace normalisation every renderer performs). Lint findings fell 17 → 2 as a result — most of that was my instrumentation, not the engine.

## What I actually want from you

**One question above all: does a brute-chassis block read as dull even when its own ideas land well?**

At CR 5–10, brute is **40% of all monsters** and ships **0% reactions, 0% spellcasting, and a save row only 54% of the time**, against controller's 100 / 37 / 100. On the ten-roll Pumpkin King set both authored ideas landed, were specific and good — and the block still read flat to me. If you see that too, the next work is the brute chassis's slot menu, not the signature pipeline.

Secondary: do the three expanded sheets (#33, #35, #40) read better than their equivalents in the 16-53 run?

Your judgement buckets are yours — I am reporting mechanism numbers and hard proxies only. I self-scored your question once this week and was off by a wide margin; not repeating it.

---

# §A — Pumpkin King, before and after

Six rolls on the old order first, then ten on the new one. Same prompt throughout: name `Pumpkin King`, description empty, CR 10, 2024.

---

## pumpkin-six-2026-11-03T22-27-06#01 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Neutral Evil
AC 15   HP 178 (21d10 + 63)   Speed 30 ft.
STR 20  DEX 8  CON 17  INT 6  WIS 10  CHA 4
Skills Athletics +9, Perception +4
Immunities Fire
Senses Passive Perception 14
Languages Common
CR 10   [2024 rules]

Traits
  Fire Absorption. Whenever the pumpkin king is subjected to Fire damage, it takes no damage and instead regains a number of Hit Points equal to the Fire damage dealt.
  Siege Monster. The pumpkin king deals double damage to objects and structures.
Actions
  Multiattack. The pumpkin king makes two Vine Slam attacks. It can replace one attack with a use of Seeded Gourd.
  Vine Slam. Melee Attack Roll: +9, reach 10 ft. 14 (2d8 + 5) Bludgeoning damage plus 10 (3d6) Fire damage.
  Harvest Blast (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 60 (11d10) Fire damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.
  Seeded Gourd. Dexterity Saving Throw: DC 17, one creature within 30 feet. Failure: 27 (6d8) Fire damage, and the target has the Prone condition. Success: Half damage only.
```

---

## pumpkin-six-2026-11-03T22-27-06#02 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Lawful Evil
AC 15   HP 178 (21d10 + 63)   Speed 40 ft.
STR 20  DEX 10  CON 17  INT 4  WIS 12  CHA 4
Skills Athletics +9, Perception +5
Senses tremorsense 30 ft.; Passive Perception 15
Languages None
CR 10   [2024 rules]

Traits
  Regrowth. The king keeps its gourd crown within 30 feet of itself. That object has AC 17, HP 20, and Resistance to all damage. While it is intact, the king regains 15 Hit Points at the start of each of its turns.
Actions
  Multiattack. The king makes two Briar Slam attacks. It can replace one attack with a use of Opportunist's Lash.
  Briar Slam. Melee Attack Roll: +9, reach 5 ft. 14 (2d8 + 5) Bludgeoning damage plus 10 (3d6) Poison damage. If the target is a Large or smaller creature and the king moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Bludgeoning damage and has the Prone condition.
  Thorn Spray (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 60 (11d10) Poison damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.
  Opportunist's Lash. Strength Saving Throw: DC 17, one creature within 30 feet that is Prone. Failure: 42 (12d6) Poison damage. Success: Half damage.
Bonus Actions
  Trample. Dexterity Saving Throw: DC 17, one creature within 5 feet that has the Prone condition. Failure: 13 (3d8) Bludgeoning damage. Success: Half damage.
```

---

## pumpkin-six-2026-11-03T22-27-06#03 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Neutral Evil
AC 15   HP 178 (21d10 + 63)   Speed 30 ft.
STR 20  DEX 8  CON 17  INT 6  WIS 10  CHA 4
Skills Athletics +9, Perception +4
Immunities Fire
Senses Passive Perception 14
Languages Common
CR 10   [2024 rules]

Traits
  Fire Absorption. Whenever the pumpkin king is subjected to Fire damage, it takes no damage and instead regains a number of Hit Points equal to the Fire damage dealt.
  Siege Monster. The pumpkin king deals double damage to objects and structures.
Actions
  Multiattack. The pumpkin king makes two Smoldering Slam attacks.
  Smoldering Slam. Melee Attack Roll: +9, reach 10 ft. 14 (2d8 + 5) Bludgeoning damage plus 10 (3d6) Fire damage.
  Gourd Flame (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 60 (11d10) Fire damage. Success: Half damage only.
Bonus Actions
  Gourd Reckoning. One creature within 5 feet that hit the pumpkin king with an attack roll since the end of the pumpkin king's last turn takes 10 (3d6) Fire damage.
```

---

## pumpkin-six-2026-11-03T22-27-06#04 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Neutral Evil
AC 15   HP 178 (21d10 + 63)   Speed 30 ft.
STR 20  DEX 8  CON 17  INT 6  WIS 10  CHA 4
Skills Athletics +9, Perception +4
Immunities Fire
Senses Passive Perception 14
Languages Common
CR 10   [2024 rules]

Traits
  Fire Absorption. Whenever the pumpkin king is subjected to Fire damage, it takes no damage and instead regains a number of Hit Points equal to the Fire damage dealt.
  Siege Monster. The pumpkin king deals double damage to objects and structures.
Actions
  Multiattack. The pumpkin king makes two Harvest Scythe attacks. It can replace one attack with a use of Gourd Toss.
  Harvest Scythe. Melee Attack Roll: +9, reach 10 ft. 21 (3d10 + 5) Slashing damage.
  Gourd Fire (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 60 (11d10) Fire damage. Success: Half damage only.
  Gourd Toss. Strength Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target is pushed up to 15 feet away from the pumpkin king and has the Prone condition.
```

---

## pumpkin-six-2026-11-03T22-27-06#05 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Neutral Evil
AC 15   HP 178 (21d10 + 63)   Speed 30 ft.
STR 20  DEX 8  CON 17  INT 6  WIS 10  CHA 4
Skills Athletics +9, Perception +4
Immunities Poison
Senses Passive Perception 14
Languages Common
CR 10   [2024 rules]

Traits
  Poison Absorption. Whenever the pumpkin king is subjected to Poison damage, it takes no damage and instead regains a number of Hit Points equal to the Poison damage dealt.
  Siege Monster. The pumpkin king deals double damage to objects and structures.
Actions
  Multiattack. The pumpkin king makes two Rind Slam attacks. It can replace one attack with a use of Kindling Grin.
  Rind Slam. Melee Attack Roll: +9, reach 10 ft. 14 (2d8 + 5) Bludgeoning damage plus 10 (3d6) Poison damage.
  Rot-Smoke Burst (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 60 (11d10) Poison damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.
  Kindling Grin. Wisdom Saving Throw: DC 17, one creature the pumpkin king can see within 60 feet. Failure: 13 (3d8) Poison damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.
```

---

## pumpkin-six-2026-11-03T22-27-06#06 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Neutral Evil
AC 15   HP 178 (21d10 + 63)   Speed 30 ft., Climb 30 ft.
STR 20  DEX 8  CON 17  INT 6  WIS 10  CHA 4
Skills Athletics +9, Perception +4
Immunities Necrotic
Senses Passive Perception 14
Languages None
CR 10   [2024 rules]

Traits
  Necrotic Absorption. Whenever the king is subjected to Necrotic damage, it takes no damage and instead regains a number of Hit Points equal to the Necrotic damage dealt.
  Siege Monster. The king deals double damage to objects and structures.
Actions
  Multiattack. The king makes two Scythe attacks.
  Scythe. Melee Attack Roll: +9, reach 10 ft. 16 (2d10 + 5) Slashing damage plus 10 (3d6) Necrotic damage.
  Rotting Blast (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 60 (11d10) Necrotic damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.
  Harvest Pull. Strength Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target is pulled up to 25 feet straight toward the pumpkin king.
```

---

## pumpkin-ten-2026-11-03T23-04-17#01 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Neutral Evil
AC 17   HP 161 (19d10 + 57)   Speed 50 ft.
STR 18  DEX 20  CON 17  INT 10  WIS 14  CHA 10
Skills Perception +6, Stealth +9
Senses Passive Perception 16
Languages Common
CR 10   [2024 rules]

Traits
  Snaring Vines. The ground in a 10-foot Emanation originating from the pumpkin king is Difficult Terrain.
  Vine Strider. The pumpkin king ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.
Actions
  Multiattack. The pumpkin king makes three attacks, using Stalk Slam or Gourd in any combination.
  Stalk Slam. Melee Attack Roll: +9, reach 5 ft. 18 (3d8 + 5) Bludgeoning damage.
  Gourd. Ranged Attack Roll: +9, range 20/60 ft. 14 (2d8 + 5) Bludgeoning damage. Hit or Miss: Immediately after the attack, a seed-laden gourd returns to the pumpkin king's grasp.
  Seed Burst (Recharge 5-6). The pumpkin king hurls a seed-laden gourd at a point it can see within 90 feet. Dexterity Saving Throw: DC 16, each creature in a 5-foot-radius Sphere centered on that point. Failure: 60 (11d10) Poison damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.
Bonus Actions
  Fleet Agility. The pumpkin king takes the Dash or Disengage action.
```

---

## pumpkin-ten-2026-11-03T23-04-17#02 — Hollowed Harvester

**Input:** `name: Pumpkin King | `

```
Hollowed Harvester
Large Plant, Neutral Evil
AC 15   HP 180 (19d10 + 76)   Speed 30 ft.
STR 20  DEX 12  CON 18  INT 6  WIS 8  CHA 6
Skills Athletics +9, Perception +3
Senses Passive Perception 13
Languages Common
CR 10   [2024 rules]

Traits
  Deathless Regrowth. If the harvester dies, it returns to life in 1d6 days and regains all its Hit Points unless its remains are burned and the ashes scattered.
  Regeneration. The harvester regains 15 Hit Points at the start of each of its turns. If the harvester takes Radiant damage, this trait doesn't function on the harvester's next turn. The harvester dies only if it starts its turn with 0 Hit Points and doesn't regenerate.
Actions
  Multiattack. The harvester makes three Scythe attacks.
  Scythe. Melee Attack Roll: +9, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 9 (2d8) Necrotic damage.
  Hollow Laugh (Recharge 5-6). Dexterity Saving Throw: DC 16, each creature in a 30-foot Cone. Failure: 63 (14d8) Necrotic damage. Success: Half damage.
```

---

## pumpkin-ten-2026-11-03T23-04-17#03 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Lawful Neutral
AC 15   HP 178 (21d10 + 63)   Speed 40 ft.
STR 20  DEX 8  CON 17  INT 4  WIS 12  CHA 6
Skills Athletics +9, Perception +5
Senses tremorsense 30 ft.; Passive Perception 15
Languages None
CR 10   [2024 rules]

Traits
  Rootlet Snare. Constitution Saving Throw: DC 17, any creature that starts its turn in a 10-foot Emanation originating from the pumpkin king. Failure: The target has the Poisoned condition until the end of its next turn. Success: The target is immune to this creature's aura for 24 hours.
Actions
  Multiattack. The pumpkin king makes two Gourd Splitter attacks. It can replace one attack with a use of Harvest Sweep.
  Gourd Splitter. Melee Attack Roll: +9, reach 10 ft. 18 (3d8 + 5) Piercing damage plus 14 (4d6) Poison damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17). While Grappled, the target has the Restrained condition.
  Harvest Sweep. Strength Saving Throw: DC 17, each creature in a 15-foot Emanation. Failure: The target is pulled up to 10 feet straight toward the pumpkin king, and the target has the Prone condition.
Bonus Actions
  Engulf. The pumpkin king engulfs one Medium or smaller creature it is grappling. While engulfed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the pumpkin king, and takes 10 (3d6) Poison damage at the start of each of the pumpkin king's turns. The pumpkin king can have only one creature engulfed at a time. If the pumpkin king takes 25 damage or more on a single turn from the engulfed creature, the pumpkin king must expel the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the pumpkin king. If the pumpkin king dies, an engulfed creature pulls free of the mass Prone by using 10 feet of movement.
```

---

## pumpkin-ten-2026-11-03T23-04-17#04 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Medium Plant, Neutral
AC 17   HP 165 (22d8 + 66)   Speed 40 ft.
STR 18  DEX 20  CON 17  INT 10  WIS 14  CHA 10
Skills Perception +6, Stealth +9
Resistances Fire
Senses Passive Perception 16
Languages Common
CR 10   [2024 rules]

Traits
  Rooted Blaze. At the end of each of the pumpkin king's turns, each creature in a 5-foot Emanation originating from the pumpkin king takes 10 (3d6) Fire damage.
  Rootslip. The pumpkin king ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.
Actions
  Multiattack. The pumpkin king makes three attacks, using Thorn Claw or Guttering Gourd in any combination.
  Thorn Claw. Melee Attack Roll: +9, reach 5 ft. 9 (1d8 + 5) Slashing damage plus 7 (2d6) Fire damage.
  Guttering Gourd. Ranged Attack Roll: +9, range 20/60 ft. 14 (2d8 + 5) Fire damage. Hit or Miss: Immediately after the attack, a guttering gourd returns to the pumpkin king's grasp.
  Scattering Gourds (Recharge 5-6). The pumpkin king hurls a guttering gourd at a point it can see within 90 feet. Dexterity Saving Throw: DC 16, each creature in a 5-foot-radius Sphere centered on that point. Failure: 60 (11d10) Fire damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.
Bonus Actions
  Fleet Agility. The pumpkin king takes the Dash or Disengage action.
Reactions
  Cracked Candleflare. Trigger: When a creature within reach hits the pumpkin king with a melee attack. Response: The blow cracks its gourd-flesh and the candle-fire within flares out: each creature in an Emanation originating from the pumpkin king makes a Dexterity Saving Throw, taking 10 (3d6) Fire damage on a failure, and the flare is fiercer while the pumpkin king is Bloodied.
```

---

## pumpkin-ten-2026-11-03T23-04-17#05 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Neutral Evil
AC 15   HP 178 (21d10 + 63)   Speed 40 ft.
STR 20  DEX 8  CON 17  INT 4  WIS 12  CHA 6
Skills Athletics +9, Perception +5
Resistances Fire
Senses Passive Perception 15
Languages None
CR 10   [2024 rules]

Traits
  Cinder-Light Glare. Constitution Saving Throw: DC 17, any creature that starts its turn in a 10-foot Emanation originating from the pumpkin king. Failure: The target has the Blinded condition until the end of its next turn. Success: The target is immune to this creature's aura for 24 hours.
Actions
  Multiattack. The pumpkin king makes two Grasping Vine attacks.
  Grasping Vine. Melee Attack Roll: +9, reach 10 ft. 18 (3d8 + 5) Bludgeoning damage plus 14 (4d6) Fire damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17). While Grappled, the target has the Restrained condition.
  Cinder Gourd (Recharge 5-6). Dexterity Saving Throw: DC 17, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 63 (14d8) Fire damage. Success: Half damage.
Bonus Actions
  Smother. The pumpkin king smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the pumpkin king, and takes 10 (3d6) Fire damage at the start of each of the pumpkin king's turns. The pumpkin king can have only one creature smothered at a time. If the pumpkin king takes 25 damage or more on a single turn from the smothered creature, the pumpkin king must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the pumpkin king. If the pumpkin king dies, a smothered creature pulls free Prone by using 10 feet of movement.
```

---

## pumpkin-ten-2026-11-03T23-04-17#06 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Neutral
AC 17   HP 161 (19d10 + 57)   Speed 40 ft., Burrow 30 ft.
STR 18  DEX 20  CON 17  INT 10  WIS 14  CHA 10
Skills Perception +6, Stealth +9
Resistances Cold, Fire
Senses Passive Perception 16
Languages Common
CR 10   [2024 rules]

Traits
  Root Stride. The pumpkin king ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.
Actions
  Multiattack. The pumpkin king makes three attacks, using Root Fist or Gourd Hurl in any combination. It can replace one attack with a use of Grave-Cold Gutter.
  Root Fist. Melee Attack Roll: +9, reach 5 ft. 9 (1d8 + 5) Bludgeoning damage plus 7 (2d6) Fire damage.
  Gourd Hurl. Ranged Attack Roll: +9, range 20/60 ft. 14 (2d8 + 5) Fire damage. Hit or Miss: Immediately after the attack, a hollow gourd returns to the pumpkin king's grasp.
  Marrow-Wax Burst (Recharge 5-6). The pumpkin king hurls a hollow gourd at a point it can see within 90 feet. Dexterity Saving Throw: DC 16, each creature in a 5-foot-radius Sphere centered on that point. Failure: 60 (11d10) Fire damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.
  Grave-Cold Gutter. Dexterity Saving Throw: DC 16, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 19 (3d12) Cold damage, and the target has the Blinded condition until the end of its next turn. Success: Half damage only.
Bonus Actions
  Fleet Agility. The pumpkin king takes the Dash or Disengage action.
```

---

## pumpkin-ten-2026-11-03T23-04-17#07 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Neutral
AC 17   HP 161 (19d10 + 57)   Speed 40 ft.
STR 18  DEX 20  CON 17  INT 10  WIS 14  CHA 10
Skills Perception +6, Stealth +9
Resistances Fire
Senses Passive Perception 16
Languages Common
CR 10   [2024 rules]

Traits
  Ember Regrowth. While standing on soil, grass, or rooted vegetation at the start of its turn, the king regrows a tatter of its burning rind; until the start of its next turn its vine attacks deal extra Fire damage, and a creature that starts its turn within the king's reach takes 10 (3d6) Fire damage as the ground smolders beneath it.
  Vine Slink. The king ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.
Actions
  Multiattack. The king makes three attacks, using Vine Whip or Gourd Seed in any combination.
  Vine Whip. Melee Attack Roll: +9, reach 10 ft. 9 (1d8 + 5) Slashing damage plus 7 (2d6) Fire damage.
  Gourd Seed. Ranged Attack Roll: +9, range 20/60 ft. 14 (2d8 + 5) Piercing damage. Hit or Miss: Immediately after the attack, a seed-gourd returns to the king's grasp.
  Ignited Gourd (Recharge 5-6). The king hurls a seed-gourd at a point it can see within 90 feet. Dexterity Saving Throw: DC 16, each creature in a 5-foot-radius Sphere centered on that point. Failure: 60 (11d10) Fire damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.
Bonus Actions
  Fleet Agility. The king takes the Dash or Disengage action.
```

---

## pumpkin-ten-2026-11-03T23-04-17#08 — Crownrot Reaper

**Input:** `name: Pumpkin King | `

```
Crownrot Reaper
Medium Plant, Neutral Evil
AC 17   HP 165 (22d8 + 66)   Speed 40 ft., Climb 40 ft.
STR 18  DEX 20  CON 17  INT 10  WIS 14  CHA 10
Skills Perception +6, Stealth +9
Resistances Fire
Senses Passive Perception 16
Languages Common
CR 10   [2024 rules]

Traits
  Harvest Stride. The reaper ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.
Actions
  Multiattack. The reaper makes three attacks, using Thorn Vine or Thrown Gourd in any combination. It can replace one attack with a use of Reaping Haul.
  Thorn Vine. Melee Attack Roll: +9, reach 5 ft. 9 (1d8 + 5) Piercing damage plus 7 (2d6) Fire damage.
  Thrown Gourd. Ranged Attack Roll: +9, range 20/60 ft. 14 (2d8 + 5) Bludgeoning damage. Hit or Miss: Immediately after the attack, a small gourd returns to the reaper's grasp.
  Gourd Blast (Recharge 5-6). The reaper hurls a small gourd at a point it can see within 90 feet. Dexterity Saving Throw: DC 16, each creature in a 5-foot-radius Sphere centered on that point. Failure: 60 (11d10) Fire damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.
  Reaping Haul. Strength Saving Throw: DC 16, each creature in a 30-foot Cone. Failure: The target is pulled up to 30 feet straight toward the reaper, and the target has the Prone condition.
Bonus Actions
  Fleet Agility. The reaper takes the Dash or Disengage action.
```

---

## pumpkin-ten-2026-11-03T23-04-17#09 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Chaotic Neutral
AC 15   HP 178 (21d10 + 63)   Speed 30 ft.
STR 20  DEX 8  CON 17  INT 6  WIS 10  CHA 4
Skills Athletics +9, Perception +4
Immunities Fire
Senses Passive Perception 14
Languages Common
CR 10   [2024 rules]

Traits
  Fire Absorption. Whenever the king is subjected to Fire damage, it takes no damage and instead regains a number of Hit Points equal to the Fire damage dealt.
  Siege Monster. The king deals double damage to objects and structures.
Actions
  Multiattack. The king makes two Vine Lash attacks. It can replace one attack with a use of Ember Lance.
  Vine Lash. Melee Attack Roll: +9, reach 10 ft. 14 (2d8 + 5) Bludgeoning damage plus 10 (3d6) Fire damage.
  Cinder Breath (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 60 (11d10) Fire damage. Success: Half damage only.
  Ember Lance. Dexterity Saving Throw: DC 17, one creature within 60 feet. Failure: 28 (8d6) Fire damage.
```

---

## pumpkin-ten-2026-11-03T23-04-17#10 — Pumpkin King

**Input:** `name: Pumpkin King | `

```
Pumpkin King
Large Plant, Neutral
AC 15   HP 178 (21d10 + 63)   Speed 40 ft.
STR 20  DEX 10  CON 17  INT 4  WIS 12  CHA 4
Skills Athletics +9, Perception +5
Resistances Fire
Senses Passive Perception 15
Languages None
CR 10   [2024 rules]

Traits
  Fear Aura. The pumpkin king emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 17, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's aura for 24 hours.
Actions
  Multiattack. The pumpkin king makes two Thorned Vine attacks.
  Thorned Vine. Melee Attack Roll: +9, reach 5 ft. 14 (2d8 + 5) Piercing damage plus 10 (3d6) Fire damage. If the target is a Large or smaller creature and the pumpkin king moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.
  Guttering Flare (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 60 (11d10) Fire damage. Success: Half damage only.
Bonus Actions
  Trample. Dexterity Saving Throw: DC 17, one creature within 5 feet that has the Prone condition. Failure: 13 (3d8) Bludgeoning damage. Success: Half damage.
  Seedburst Gourd. Constitution Saving Throw: DC 17, one creature within 30 feet. Failure: 28 (8d6) Fire damage, and the target has the Blinded condition until the end of its next turn.
```

---

# §B — the regression forty (sweep-2026-11-03T23-14-10)

The gate batch. 37 of these 40 are unchanged by the expansion; #33, #35 and #40 are the three that exercise it.

---

## sweep-2026-11-03T23-14-10#01 — Dire Wolf

**Input:** `name: Dire Wolf | with a frost-rimed hide`

```
Dire Wolf
Large Beast, Unaligned
AC 14   HP 22 (3d10 + 6)   Speed 50 ft.
STR 17  DEX 15  CON 15  INT 3  WIS 12  CHA 7
Skills Perception +5, Stealth +4
Resistances Cold
Senses darkvision 30 ft.; Passive Perception 15
Languages None
CR 1   [2024 rules]

Traits
  Rime-Crusted Hide. A creature that touches the dire wolf or hits it with a melee attack while within 5 feet of it takes 3 (1d6) Cold damage.
  Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
Actions
  Multiattack. The dire wolf makes two Bite attacks.
  Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.
```

---

## sweep-2026-11-03T23-14-10#02 — Bog Hound

**Input:** `a mud-caked bog hound that drags fishermen under`

```
Bog Hound
Medium beast, unaligned
AC 11 (natural armor)   HP 22 (3d8 + 9)   Speed 30 ft., swim 30 ft.
STR 12  DEX 8  CON 16  INT 4  WIS 10  CHA 4
Skills Athletics +3, Perception +2
Saving Throws STR +3
Senses darkvision 30 ft., passive Perception 12
Languages None
CR 1 (200 XP)   [2014 rules]

Traits
  Whelm (Bonus Action). The bog hound whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the bog hound, and takes 3 (1d6) bludgeoning damage at the start of each of the bog hound's turns. The bog hound can have only one creature whelmed at a time. If the bog hound takes 5 damage or more in a single turn from the whelmed creature, the bog hound must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the bog hound. If the bog hound dies, a whelmed creature pulls free prone by using 5 feet of movement.
Actions
  Multiattack. The bog hound makes two Bite attacks. It can replace one attack with a use of Under the Mud.
  Bite. Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
  Under the Mud. Each creature in a 15-foot cone must make a DC 13 Strength saving throw. On a failed save, the target is pulled up to 5 feet straight toward the bog hound and is knocked prone.
```

---

## sweep-2026-11-03T23-14-10#03 — Owlbear

**Input:** `name: Owlbear | that has learned to climb`

```
Owlbear
Large monstrosity, unaligned
AC 13 (natural armor)   HP 59 (7d10 + 21)   Speed 40 ft., climb 30 ft.
STR 20  DEX 12  CON 17  INT 3  WIS 12  CHA 7
Skills Perception +5
Saving Throws STR +7
Senses darkvision 60 ft., passive Perception 15
Languages None
CR 3 (700 XP)   [2014 rules]

Traits
  Spider Climb. The owlbear can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Actions
  Multiattack. The owlbear makes two Rend attacks. It can replace one attack with a use of Climbing Claws.
  Rend. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
  Climbing Claws. The owlbear spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. Each creature in the destination space must make a DC 15 Dexterity saving throw, taking 22 (5d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is knocked prone.
```

---

## sweep-2026-11-03T23-14-10#04 — Sexton's Bell

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`

```
Sexton's Bell
Medium Undead, Neutral
AC 11   HP 45 (10d8)   Speed 5 ft., Fly 40 ft.
STR 7  DEX 13  CON 10  INT 10  WIS 12  CHA 17
Skills Perception +3, Stealth +5
Resistances Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder
Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
Senses darkvision 60 ft.; Passive Perception 13
Languages Common plus one other language
CR 3   [2024 rules]

Traits
  Ethereal Sight. The sexton's bell can see 60 feet into the Ethereal Plane when it is on the Material Plane.
  Incorporeal Movement. The sexton's bell can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
Actions
  Multiattack. The sexton's bell makes two Withering Touch attacks. It can replace one attack with a use of Solemn Toll.
  Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.
  Solemn Toll. Dexterity Saving Throw: DC 13, one creature within 30 feet. Failure: 13 (3d8) Bludgeoning damage.
  Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the sexton's bell and isn't an Undead. Failure:  10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the sexton's bell's next turn. Success:  The target is immune to this ghost's Horrific Visage for 24 hours.
  Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the sexton's bell can see within 5 feet. Failure:  The target is possessed by the sexton's bell; the sexton's bell disappears, and the target has the Incapacitated condition and loses control of its body. The sexton's bell now controls the body, but the target retains awareness. The sexton's bell can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The sexton's bell's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the sexton's bell leaves as a Bonus Action. When the possession ends, the sexton's bell appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success:  The target is immune to this ghost's Possession for 24 hours.
  Etherealness. The sexton's bell casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The sexton's bell is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.
```

---

## sweep-2026-11-03T23-14-10#05 — Air Elemental

**Input:** `name: Air Elemental | that carries stolen voices`

```
Air Elemental
Large Elemental, Neutral
AC 15   HP 90 (12d10 + 24)   Speed 10 ft., Fly 90 ft. (hover)
STR 14  DEX 20  CON 14  INT 6  WIS 10  CHA 6
Skills Athletics +5, Perception +3
Resistances Bludgeoning, Lightning, Piercing, Slashing
Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious
Senses darkvision 60 ft.; Passive Perception 13
Languages Primordial (Auran)
CR 5   [2024 rules]

Traits
  Mimicry. The air elemental can mimic stolen voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.
  Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.
Actions
  Multiattack. The air elemental makes two Thunderous Slam attacks.
  Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.
  Whirlwind (Recharge 4-6). Strength Saving Throw: DC 13, one Medium or smaller creature in the air elemental's space. Failure:  24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the air elemental and has the Prone condition. Success:  Half damage only.
```

---

## sweep-2026-11-03T23-14-10#06 — Spoilheap Burier

**Input:** `a quarry-pit thing of living scree that buries what it catches`

```
Spoilheap Burier
Large elemental, neutral
AC 13 (natural armor)   HP 93 (11d10 + 33)   Speed 30 ft., burrow 30 ft.
STR 16  DEX 8  CON 16  INT 4  WIS 10  CHA 4
Skills Athletics +6, Perception +3
Saving Throws STR +6
Immunities poison; exhaustion, poisoned
Senses tremorsense 60 ft., passive Perception 13
Languages None
CR 5 (1,800 XP)   [2014 rules]

Traits
  Buried Alive. While the burier has a creature entombed, the burier can drag the entombed creature along with it when it moves, and the creature remains entombed until it escapes.
  Unsettled Trail. Difficult Terrain composed of loose rubble, scree, and broken ground doesn't cost the burier extra movement, and the burier can move across loose rubble, scree, and broken ground without needing to make an ability check.
  Entomb (Bonus Action). The burier entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the burier, and takes 7 (2d6) bludgeoning damage at the start of each of the burier's turns. The burier can have only one creature entombed at a time. If the burier takes 15 damage or more in a single turn from the entombed creature, the burier must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the burier. If the burier dies, an entombed creature breaks free prone by using 5 feet of movement.
Actions
  Multiattack. The burier makes two Avalanche Slam attacks. It can replace one attack with a use of Screegrip Pull.
  Avalanche Slam. Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
  Screegrip Pull. One creature within 30 feet of the burier must succeed on a DC 14 Dexterity saving throw or be pulled up to 15 feet straight toward the burier and be grappled (escape DC 14).
```

---

## sweep-2026-11-03T23-14-10#07 — Hydra

**Input:** `name: Hydra | whose stumps smoke instead of regrowing`

```
Hydra
Huge monstrosity, unaligned
AC 15 (natural armor)   HP 184 (16d12 + 80)   Speed 40 ft., swim 40 ft.
STR 20  DEX 12  CON 20  INT 2  WIS 10  CHA 7
Skills Perception +6
Saving Throws STR +8, CON +8
Immunities blinded, charmed, deafened, frightened, stunned, unconscious
Senses darkvision 60 ft., passive Perception 16
Languages None
CR 8 (3,900 XP)   [2014 rules]

Traits
  Knitting Flesh. When the hydra takes slashing or piercing damage, the hydra gains temporary hit points as its flesh knits furiously shut and the air around it fills with choking murk.
  Hold Breath. The hydra can hold its breath for 1 hour.
  Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
  Reactive Heads. For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.
Actions
  Multiattack. The hydra makes as many Bite attacks as it has heads.
  Bite. Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
  Choking Reek (Recharge 5-6). Each creature in a 30-foot cone must make a DC 16 Dexterity saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.
```

---

## sweep-2026-11-03T23-14-10#08 — Ram-Golem

**Input:** `a siege-engine golem of lashed timber that shoulders through walls`

```
Ram-Golem
Large Construct, Neutral
AC 15   HP 153 (18d10 + 54)   Speed 30 ft.
STR 20  DEX 8  CON 16  INT 6  WIS 10  CHA 4
Skills Athletics +8, Perception +3
Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
Senses darkvision 60 ft.; Passive Perception 13
Languages Understands the languages of its creator but can't speak
CR 8   [2024 rules]

Traits
  Siege Ram. When the ram-golem's Ramshead attack hits a structure or an object, the hit is a critical hit.
  Immutable Form. The ram-golem can't shape-shift.
  Magic Resistance. The ram-golem has Advantage on saving throws against spells and other magical effects.
Actions
  Multiattack. The ram-golem makes two Ramshead attacks.
  Ramshead. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.
  Siege Charge (Recharge 5-6). The ram-golem spends 5 feet of movement to jump to a space within 20 feet that contains one or more Large or smaller creatures. Dexterity Saving Throw: DC 16, each creature in the destination space. Failure: 27 (6d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage, and the target is pushed 5 feet straight away.
```

---

## sweep-2026-11-03T23-14-10#09 — Stone Golem

**Input:** `name: Stone Golem | carved as a weeping saint`

```
Stone Golem
Large Construct, Unaligned
AC 18   HP 220 (21d10 + 105)   Speed 30 ft.
STR 22  DEX 9  CON 20  INT 3  WIS 11  CHA 1
Skills Athletics +10, Perception +4
Immunities Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
Senses darkvision 60 ft.; Passive Perception 14
Languages Understands Common plus two other languages but can't speak
CR 10   [2024 rules]

Traits
  Binding Runnels. Constitution Saving Throw: DC 17, any creature that starts its turn in a 10-foot Emanation originating from the golem. Failure: The target has the Poisoned condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.
  Immutable Form. The golem can't shape-shift.
  Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.
Actions
  Multiattack. The golem makes two attacks, using Slam or Force Bolt in any combination. It can replace one attack with a use of Runnel Cincture.
  Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.
  Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.
  Runnel Cincture. Strength Saving Throw: DC 17, each creature in a 20-foot Cone. Failure: The target has the Restrained condition until the end of its next turn.
Bonus Actions
  Slow (Recharge 5-6). The golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).
```

---

## sweep-2026-11-03T23-14-10#10 — Drowned Cathedral Choir

**Input:** `a drowned cathedral choir that sings in one voice`

```
Drowned Cathedral Choir
Large undead, neutral
AC 14 (natural armor)   HP 178 (21d10 + 63)   Speed 5 ft., fly 60 ft. (hover), swim 30 ft.
STR 6  DEX 16  CON 17  INT 12  WIS 14  CHA 15
Skills Stealth +7
Saving Throws DEX +7
Resistances bludgeoning, piercing, slashing
Immunities poison; charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained
Senses darkvision 60 ft., passive Perception 12
Languages Common plus the languages it knew in life
CR 10 (5,900 XP)   [2014 rules]

Traits
  Incorporeal Movement. The choir can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
  Sunlight Sensitivity. While in sunlight, the choir has disadvantage on ability checks and attack rolls.
Actions
  Multiattack. The choir makes two Drowned Throat attacks. It can replace one attack with a use of One Voice, One Hymn.
  Drowned Throat. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 13 (3d8) necrotic damage.
  One Voice, One Hymn. One creature within 60 feet must succeed on a DC 15 Wisdom saving throw or be charmed until the end of its next turn.
```

---

## sweep-2026-11-03T23-14-10#11 — Vampire

**Input:** `name: Vampire | who keeps a garden of thorns`

```
Vampire
Medium undead, lawful evil
AC 16 (natural armor)   HP 195 (23d8 + 92)   Speed 40 ft., climb 40 ft.
STR 18  DEX 18  CON 18  INT 17  WIS 15  CHA 18
Skills Perception +7, Stealth +9
Saving Throws DEX +9, WIS +7
Resistances necrotic
Immunities poison; exhaustion, poisoned
Senses darkvision 120 ft., passive Perception 17
Languages Common plus two other languages
CR 13 (10,000 XP)   [2014 rules]

Traits
  Thorn Flicker. When a creature the vampire can see ends its turn within 5 feet of it, the vampire can move up to 10 feet without provoking opportunity attacks.
  Legendary Resistance (3/Day, or 4/Day in Lair). If the vampire fails a saving throw, it can choose to succeed instead.
  Misty Escape. If the vampire drops to 0 hit points outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 Hit Point after spending 1 hour there.
  Spider Climb. The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  Vampire Weakness. The vampire has these weaknesses: Forbiddance: the vampire can't enter a residence without an invitation from an occupant.
Running Water: the vampire takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the vampire's heart while the vampire is incapacitated in its resting place, the vampire is paralyzed until the weapon is removed.
Sunlight: the vampire takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
  Briar Vanishing (1/Day) (Bonus Action). The vampire teleports up to 120 feet to an unoccupied space it can see.
  Shape-Shift (Bonus Action). If the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the vampire can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.
  Charm (Recharge 5-6) (Bonus Action). The vampire casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the vampire's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the vampire.
Actions
  Multiattack. The vampire makes two Grave Strike attacks and uses Bite.
  Grave Strike. Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
  Bite (Bat or Vampire Form Only). One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions
  Deathless Strike. The vampire moves up to half its Speed, and it makes one Grave Strike attack.
  Beguile. The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

---

## sweep-2026-11-03T23-14-10#12 — Plague Archon

**Input:** `a plague-bearing archon of flies that commands lesser swarms`

```
Plague Archon
Large Aberration, Neutral Evil
AC 18   HP 190 (20d10 + 80)   Speed 40 ft., Fly 80 ft.
STR 18  DEX 20  CON 18  INT 10  WIS 16  CHA 12
Skills Perception +8, Stealth +10
Senses darkvision 60 ft.; Passive Perception 18
Languages Common
CR 13   [2024 rules]

Traits
  Crawling Haze. Constitution Saving Throw: DC 17, any creature that starts its turn in a 20-foot Emanation originating from the archon. Failure: The target has the Poisoned condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.
  Flyby. The archon doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.
  Swarm Shift. When a creature the archon can see ends its turn within 5 feet of it, the archon can move up to 10 feet without provoking Opportunity Attacks.
Actions
  Multiattack. The archon makes three Sting attacks. It can replace one attack with a use of Merciless Strike.
  Sting. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Piercing damage plus 10 (3d6) Poison damage. If the archon flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Piercing damage and, if it is Large or smaller, has the Prone condition.
  Hive Swoop (Recharge 5-6). The archon flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Poison damage, and the target has the Prone condition. Success: Half damage.
  Merciless Strike. The archon sends the swarm burrowing into the wounds. Constitution Saving Throw: DC 17, one creature within 60 feet that has the Prone condition. Failure: 49 (14d6) Poison damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage.
Bonus Actions
  Aerial Agility. The archon takes the Dash or Disengage action.
```

---

## sweep-2026-11-03T23-14-10#13 — Purple Worm

**Input:** `name: Purple Worm | that swallowed a war-band's armoury`

```
Purple Worm
Gargantuan Monstrosity, Unaligned
AC 18   HP 247 (15d20 + 90)   Speed 50 ft., Burrow 50 ft.
STR 28  DEX 7  CON 22  INT 1  WIS 8  CHA 4
Skills Athletics +14, Perception +4
Senses tremorsense 60 ft.; Passive Perception 14
Languages None
CR 15   [2024 rules]

Traits
  Tunneler. The worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.
Actions
  Multiattack. The worm makes one Bite attack and one Tail Stinger attack.
  Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.
  Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.
Bonus Actions
  Swallow. Strength Saving Throw: DC 21, one Large or smaller creature Grappled by the worm (it can have up to three creatures swallowed at a time). Failure:  The target is swallowed by the worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the worm, and takes 17 (5d6) Acid damage at the start of each of the worm's turns.
If the worm takes 30 damage or more on a single turn from a creature inside it, the worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the worm and has the Prone condition. If the worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.
```

---

## sweep-2026-11-03T23-14-10#14 — Rimebound Heart

**Input:** `a glacier's heart given legs, trailing a wake of killing cold`

```
Rimebound Heart
Huge elemental, neutral
AC 16 (natural armor)   HP 210 (20d12 + 80)   Speed 30 ft.
STR 18  DEX 8  CON 19  INT 6  WIS 10  CHA 4
Skills Athletics +9, Perception +5
Saving Throws STR +9, CON +9
Immunities cold, poison; exhaustion, poisoned
Senses tremorsense 60 ft., passive Perception 15
Languages None
CR 15 (13,000 XP)   [2014 rules]

Traits
  Hoarfrost Trail. While a creature starts its turn in ground the heart crossed on its last turn, the ground is difficult terrain and the creature takes 16 (3d10) cold damage and has its speed reduced until the start of its next turn.
  Cold Absorption. Whenever the heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
  Siege Monster. The heart deals double damage to objects and structures.
Actions
  Multiattack. The heart makes two Slam attacks.
  Slam. Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
  Cold Bloom (Recharge 5-6). Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
```

---

## sweep-2026-11-03T23-14-10#15 — Adult Red Dragon

**Input:** `name: Adult Red Dragon | blind in one eye from an old lance`

```
Adult Red Dragon
Huge dragon, chaotic evil
AC 19 (natural armor)   HP 256 (19d12 + 133)   Speed 40 ft., fly 80 ft., climb 40 ft.
STR 27  DEX 10  CON 25  INT 16  WIS 13  CHA 23
Skills Perception +13, Stealth +6
Saving Throws DEX +6, WIS +7
Immunities fire
Senses blindsight 60 ft., darkvision 120 ft., passive Perception 23
Languages Common, Draconic
CR 17 (18,000 XP)   [2014 rules]

Traits
  Legendary Resistance (3/Day). If the red dragon fails a saving throw, it can choose to succeed instead.
Actions
  Multiattack. The red dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
  Rend. Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage.
  Spellcasting. The red dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): - At will: Command, Detect Magic, Scorching Ray
1/day each: Fireball
  Fire Breath (Recharge 5-6). Each creature in a 60-foot cone must make a DC 21 Dexterity saving throw, taking 59 (17d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions
  Commanding Presence. The red dragon uses Spellcasting to cast Command (level 2 version). The red dragon can't take this action again until the start of its next turn.
  Fiery Rays. The red dragon uses Spellcasting to cast Scorching Ray. The red dragon can't take this action again until the start of its next turn.
  Pounce. The red dragon moves up to half its Speed, and it makes one Rend attack.
```

---

## sweep-2026-11-03T23-14-10#16 — Brass Tyrant

**Input:** `a tyrant of burning brass who rules a city of forges`

```
Brass Tyrant
Large Construct, Lawful Evil
AC 20   HP 241 (23d10 + 115)   Speed 30 ft.
STR 22  DEX 14  CON 20  INT 14  WIS 16  CHA 20
Skills Athletics +12, Persuasion +11
Resistances Fire
Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
Senses tremorsense 60 ft., darkvision 120 ft.; Passive Perception 13
Languages Common
CR 17   [2024 rules]

Traits
  Molten Reprisal. A creature that touches the brass tyrant or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.
  Legendary Resistance (3/Day). If the brass tyrant fails a saving throw, it can choose to succeed instead.
  Aura of Authority. While in a 10-foot Emanation originating from the brass tyrant, the brass tyrant and its allies have Advantage on attack rolls and saving throws, provided the brass tyrant doesn't have the Incapacitated condition.
Actions
  Multiattack. The brass tyrant makes two Hammer attacks.
  Hammer. Melee Attack Roll: +12, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 13 (3d8) Fire damage.
Legendary Actions
  Legendary Action Uses: 3. Immediately after another creature's turn, the brass tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.
  Forge Advance. The brass tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Hammer attack.
  Stoke the Legion. One ally of the brass tyrant that can see or hear it can immediately use its Reaction to move up to half its Speed or to make one attack.
  Reignite. The brass tyrant and each of its allies within 10 feet of it that can see or hear it end the Charmed and Frightened conditions on themselves.
```

---

## sweep-2026-11-03T23-14-10#17 — Pit Fiend

**Input:** `name: Pit Fiend | who collects the oaths of dying knights`

```
Pit Fiend
Large Fiend, Lawful Evil
AC 21   HP 337 (27d10 + 189)   Speed 30 ft., Fly 60 ft.
STR 26  DEX 14  CON 24  INT 22  WIS 18  CHA 24
Skills Perception +10, Persuasion +19
Resistances Cold
Immunities Fire, Poison; Poisoned
Senses darkvision 120 ft.; Passive Perception 20
Languages Infernal; telepathy 120 ft.
CR 20   [2024 rules]

Traits
  Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.
  Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure:  The target has the Frightened condition until the start of its next turn. Success:  The target is immune to this pit fiend's aura for 24 hours.
  Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.
Actions
  Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack.
  Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure:  The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
  Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.
  Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.
  Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.
```

---

## sweep-2026-11-03T23-14-10#18 — Osseo-Solar Lich

**Input:** `an archlich enthroned on a sun of bone`

```
Osseo-Solar Lich
Medium undead, neutral evil
AC 20 (natural armor)   HP 315 (42d8 + 126)   Speed 30 ft.
STR 11  DEX 16  CON 16  INT 21  WIS 14  CHA 16
Skills Arcana +17, History +11, Insight +8, Perception +8
Saving Throws CON +9, INT +11, WIS +8
Resistances cold, lightning
Immunities necrotic, poison; charmed, exhaustion, frightened, paralyzed, poisoned
Senses darkvision 120 ft., passive Perception 18
Languages All
CR 20 (25,000 XP)   [2014 rules]

Traits
  Soul-Fed Halo. Whenever a creature dies within 20 feet of the osseo-solar lich, the osseo-solar lich recharges Skeletal Radiance immediately.
  Legendary Resistance (3/Day). If the osseo-solar lich fails a saving throw, it can choose to succeed instead.
  Spirit Jar. If destroyed, the osseo-solar lich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the osseo-solar lich's lair.
  Protective Magic (3/Day) (Reaction). When  The osseo-solar lich is hit by an attack roll. ,  The osseo-solar lich casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.
Actions
  Multiattack. The osseo-solar lich makes three attacks, using Eldritch Burst or Paralyzing Touch.
  Eldritch Burst. Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
  Paralyzing Touch. Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the osseo-solar lich's next turn.
  Spellcasting. The osseo-solar lich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/day each: Animate Dead, Dimension Door, Plane Shift
1/day each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Legendary Actions
  Deathly Teleport. The osseo-solar lich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
  Disrupt Life. Each creature that isn't an Undead in a 20-foot radius originating from the osseo-solar lich must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
  Frightening Gaze. The osseo-solar lich casts Fear, using the same spellcasting ability as Spellcasting. The osseo-solar lich can't take this action again until the start of its next turn.
```

---

## sweep-2026-11-03T23-14-10#19 — Ancient Gold Dragon

**Input:** `name: Ancient Gold Dragon | `

```
Ancient Gold Dragon
Gargantuan dragon, lawful good
AC 22 (Natural Armor)   HP 546 (28d20 + 252)   Speed 40 ft., fly 80 ft., swim 40 ft.
STR 30  DEX 14  CON 29  INT 18  WIS 17  CHA 28
Skills Insight +10, Perception +17, Persuasion +16, Stealth +9
Saving Throws DEX +9, CON +16, WIS +10, CHA +16
Immunities Fire
Senses Blindsight 60 ft., Darkvision 120 ft., Passive Perception 27
Languages Common, Draconic
CR 24   [2014 rules]

Traits
  Amphibious. The dragon can breathe air and water.
  Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead.
Actions
  Multiattack. The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.
  Bite. Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage.
  Claw. Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.
  Tail. Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.
  Frightful Presence. Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 24 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.
  Breath Weapons (Recharge 5–6). The dragon uses one of the following breath weapons.
  Fire Breath. The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 71 (13d10) fire damage on a failed save, or half as much damage on a successful one.
  Weakening Breath. The dragon exhales gas in a 90-foot cone. Each creature in that area must succeed on a DC 24 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
  Change Shape. The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).

In a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.
Legendary Actions
  Detect. The dragon makes a Wisdom (Perception) check.
  Tail Attack. The dragon makes a tail attack.
  Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.
```

---

## sweep-2026-11-03T23-14-10#20 — Trench Choir Leviathan

**Input:** `a leviathan of the trench whose song drowns fleets`

```
Trench Choir Leviathan
Gargantuan Monstrosity, Neutral
AC 21   HP 542 (31d20 + 217)   Speed 40 ft., Swim 40 ft.
STR 28  DEX 10  CON 24  INT 10  WIS 14  CHA 14
Skills Athletics +16, Perception +9
Senses darkvision 120 ft., tremorsense 120 ft.; Passive Perception 19
Languages Common
CR 24   [2024 rules]

Traits
  Amphibious. The leviathan can breathe air and water.
  Trench Choir Echo. When the leviathan takes Thunder damage, the leviathan stores the note; the next Drowning Verse or Trench Limb it makes also leaves each creature struck by it Deafened and Blinded until the end of its next turn.
  Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.
Actions
  Multiattack. The leviathan makes two Trench Limb attacks. It can replace one attack with a use of Banshee's Undertow.
  Trench Limb. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.
  Drowning Verse (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.
  Banshee's Undertow. Strength Saving Throw: DC 24, one creature within 30 feet that is Deafened. Failure: 63 (14d8) Thunder damage. Success: Half damage.
Legendary Actions
  Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.
  Lunge and Lash. The leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Trench Limb attack.
  Quake Stomp. Strength Saving Throw: DC 24, each creature within 10 feet of the leviathan. Failure: The target has the Prone condition.
```

---

## sweep-2026-11-03T23-14-10#21 — Owlbear

**Input:** `name: Owlbear | `

```
Owlbear
Large Monstrosity, Unaligned
AC 13   HP 59 (7d10 + 21)   Speed 40 ft., Climb 40 ft.
STR 20  DEX 12  CON 17  INT 3  WIS 12  CHA 7
Skills Perception +5
Senses darkvision 60 ft.; Passive Perception 15
Languages None
CR 3   [2024 rules]

Actions
  Multiattack. The owlbear makes two Rend attacks.
  Rend. Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.
```

---

## sweep-2026-11-03T23-14-10#22 — Goblin Boss

**Input:** `name: Goblin Boss | `

```
Goblin Boss
Small humanoid, chaotic neutral
AC 17 (chain shirt, shield)   HP 21 (6d6)   Speed 30 ft.
STR 10  DEX 15  CON 10  INT 10  WIS 8  CHA 10
Skills Stealth +6
Saving Throws CON +2
Senses darkvision 60 ft., passive Perception 9
Languages Common, Goblin
CR 1 (200 XP)   [2014 rules]

Traits
  Nimble Escape (Bonus Action). The goblin boss takes the Disengage or Hide action.
Actions
  Multiattack. The goblin boss makes two attacks, using Scimitar or Shortbow.
  Scimitar. Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage.
  Shortbow. Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.
```

---

## sweep-2026-11-03T23-14-10#23 — Vashka the Red

**Input:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`

```
Vashka the Red
Medium Humanoid, Neutral
AC 16   HP 112 (15d8 + 45)   Speed 30 ft.
STR 18  DEX 15  CON 16  INT 10  WIS 12  CHA 15
Skills Athletics +10, Performance +5
Senses Passive Perception 11
Languages Common, Goblin
CR 6   [2024 rules]

Actions
  Multiattack. Vashka makes three Longsword attacks. It can replace one attack with a use of Shield Bash.
  Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.
  Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vashka can see. Failure:  9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.
Reactions
  Riposte. Trigger: A creature within 5 feet of Vashka misses it with a melee attack roll. Response: Vashka makes one Longsword attack against that creature.
```

---

## sweep-2026-11-03T23-14-10#24 — Sicklebrood

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`

```
Sicklebrood
Large Monstrosity, Unaligned
AC 15   HP 161 (19d10 + 57)   Speed 40 ft., Climb 40 ft.
STR 18  DEX 8  CON 17  INT 4  WIS 12  CHA 6
Skills Athletics +8, Perception +5
Senses darkvision 60 ft.; Passive Perception 15
Languages None
CR 9   [2024 rules]

Traits
  Four Scythe-Arms. The sicklebrood can wield a weapon or make an unarmed strike with each of its four scythe-arms, and it can make an Opportunity Attack with any arm not currently pinning a creature.
  Caustic Shell. A creature that grapples the sicklebrood or is Grappled by it takes 7 (2d6) Acid damage.
Actions
  Multiattack. The sicklebrood makes two attacks, using Spitting Maw or Pinning Scythes in any combination. It can replace one attack with a use of Marrow Etch.
  Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).
  Marrow Etch. Constitution Saving Throw: DC 15, one creature within 10 feet. Failure: 35 (10d6) Acid damage, and the target has the Poisoned condition until the end of its next turn.
  Pinning Scythes. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Slashing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).
Bonus Actions
  Swallow. The sicklebrood swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the sicklebrood, and takes 10 (3d6) Acid damage at the start of each of the sicklebrood's turns. The sicklebrood can have only one creature swallowed at a time. If the sicklebrood takes 25 damage or more on a single turn from the swallowed creature, the sicklebrood must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the sicklebrood. If the sicklebrood dies, a swallowed creature exits the body Prone by using 10 feet of movement.
```

---

## sweep-2026-11-03T23-14-10#25 — Blackiron Sentinel

**Input:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`

```
Blackiron Sentinel
Huge construct, lawful neutral
AC 20 (natural armor)   HP 168 (16d12 + 64)   Speed 20 ft.
STR 18  DEX 8  CON 18  INT 7  WIS 10  CHA 3
Skills Perception +4
Saving Throws CON +8
Immunities poison; charmed, exhaustion, frightened, paralyzed, petrified, poisoned
Senses darkvision 60 ft., passive Perception 14
Languages Common
CR 11 (7,200 XP)   [2014 rules]

Traits
  Tolling Iron. A creature that hits the sentinel with a melee attack while within 5 feet of it is deafened until the end of its next turn.
  Ward Bond. The sentinel is magically bound to a ward of its choosing, and it can have only one ward at a time. While the sentinel is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the sentinel.
  Regeneration. The sentinel regains 10 hit points at the start of each of its turns if it has at least 1 Hit Point. If the sentinel takes lightning damage, this trait doesn't function at the start of the sentinel's next turn.
  Interpose (Reaction). When  A creature within 5 feet of the sentinel that it guards is hit by an attack roll. ,  The attack hits the sentinel instead, and the sentinel has Resistance to the attack's damage.
Actions
  Multiattack. The sentinel makes two Slab Fist attacks. It can replace one attack with a use of Iron Bulwark Shove.
  Slab Fist. Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage plus 10 (3d6) thunder damage.
  Ward Oath (2/Day). The sentinel targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the sentinel's next turn.
  Iron Bulwark Shove. Each creature in a 30-foot cone must make a DC 16 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the sentinel and is knocked prone.
```

---

## sweep-2026-11-03T23-14-10#26 — Peatbound Crone

**Input:** `a marsh witch who curses trespassers, cr 7`

```
Peatbound Crone
Medium Humanoid, Neutral
AC 15   HP 81 (18d8)   Speed 30 ft., Swim 30 ft.
STR 9  DEX 14  CON 11  INT 17  WIS 12  CHA 11
Skills Arcana +6, History +6, Perception +4
Senses Passive Perception 14
Languages Common and any three languages
CR 7   [2024 rules]

Traits
  Marsh Stride. Difficult Terrain composed of marsh water, muck, or reeds doesn't cost the crone extra movement, and the crone can move across marsh water, muck, or reeds without needing to make an ability check.
Actions
  Multiattack. The crone makes three Arcane Burst attacks. It can replace one attack with a use of Forceful Rebuttal.
  Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.
  Spellcasting. The crone casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly
  Forceful Rebuttal. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Bludgeoning damage.
Bonus Actions
  Misty Step (3/Day). The crone casts Misty Step, using the same spellcasting ability as Spellcasting.
Reactions
  Protective Magic (3/Day). The crone casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
```

---

## sweep-2026-11-03T23-14-10#27 — Ashvigil Templar

**Input:** `a templar priest with a mace and no magic at all`

```
Ashvigil Templar
Medium Humanoid, Neutral
AC 19   HP 93 (17d8 + 17)   Speed 30 ft.
STR 18  DEX 10  CON 12  INT 13  WIS 16  CHA 13
Skills Athletics +7, Perception +6
Senses Passive Perception 16
Languages Common plus one other language
CR 6   [2024 rules]

Actions
  Multiattack. The templar makes two Mace attacks. It can replace one attack with a use of Shield Bash.
  Mace. Melee Attack Roll: +7, reach 5 ft. 21 (5d6 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.
  Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the templar can see. Failure: 11 (2d10) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition.
```

---

## sweep-2026-11-03T23-14-10#28 — Ilvareth Dusksong

**Input:** `name: Ilvareth Dusksong | An elf archmage who bends shadow and steps between places.`

```
Ilvareth Dusksong
Medium humanoid, neutral
AC 17   HP 170 (31d8 + 31)   Speed 30 ft.
STR 10  DEX 14  CON 12  INT 20  WIS 15  CHA 16
Skills Arcana +13, History +9, Perception +6
Saving Throws INT +9, WIS +6
Immunities psychic, charmed ((with mind blank))
Senses passive Perception 16
Languages Common plus five other languages, Elvish, Undercommon
CR 12 (8,400 XP)   [2014 rules]

Traits
  Gloom Passage. While in darkness or dim light, Ilvareth can spend movement to teleport into another patch of darkness or dim light within his line of sight.
  Magic Resistance. Ilvareth has advantage on saving throws against spells and other magical effects.
  Misty Step (3/Day) (Bonus Action). Ilvareth casts Misty Step, using the same spellcasting ability as Spellcasting.
  Protective Magic (3/Day) (Reaction). When  Ilvareth is hit by an attack roll. ,  Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.
Actions
  Multiattack. Ilvareth makes four Arcane Burst attacks.
  Spellcasting. Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): - At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fly, Lightning Bolt
1/day each: Cone of Cold, Mind Blank, Scrying, Teleport
  Arcane Burst. Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
```

---

## sweep-2026-11-03T23-14-10#29 — Swarm of Tolling Requiems

**Input:** `a swarm of funeral bells that ring themselves over the dying`

```
Swarm of Tolling Requiems
Medium Swarm of Tiny Constructs, Unaligned
AC 15   HP 178 (21d8 + 84)   Speed 40 ft., Fly 30 ft. (hover)
STR 8  DEX 20  CON 18  INT 4  WIS 10  CHA 2
Resistances Bludgeoning, Piercing, Slashing
Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
Senses blindsight 60 ft.; Passive Perception 10
Languages Understands the languages of its creator but can't speak
CR 13   [2024 rules]

Traits
  Tolling Din. Constitution Saving Throw: DC 17, any creature that starts its turn in a 20-foot Emanation originating from the swarm. Failure: The target has the Deafened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.
  Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.
Actions
  Knell. Melee Attack Roll: +10, reach 5 ft. 32 (6d8 + 5) Bludgeoning damage plus 21 (6d6) Necrotic damage, or 16 (3d10) Bludgeoning damage plus 10 (3d6) Necrotic damage if the swarm is Bloodied.
  Tolling Peal (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 52 (15d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.
```

---

## sweep-2026-11-03T23-14-10#30 — Reliquary Digestor

**Input:** `a cathedral-vault ooze that digests reliquaries`

```
Reliquary Digestor
Large ooze, unaligned
AC 10 (natural armor)   HP 153 (18d10 + 54)   Speed 20 ft., climb 20 ft.
STR 16  DEX 6  CON 16  INT 2  WIS 8  CHA 1
Immunities acid; charmed, deafened, exhaustion, frightened, grappled, prone, restrained
Senses blindsight 30 ft., passive Perception 9
Languages None
CR 9 (5,000 XP)   [2014 rules]

Traits
  Amorphous. The digestor can move through a space as narrow as 1 inch wide without squeezing.
  Corrosive Form. A creature that touches the digestor or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
  Spider Climb. The digestor can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Actions
  Multiattack. The digestor makes two Pseudopod attacks.
  Pseudopod. Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) acid damage.
```

---

## sweep-2026-11-03T23-14-10#31 — Cragborn Stormdrake

**Input:** `a young storm drake whose breath is a rolling wall of thunder`

```
Cragborn Stormdrake
Large Dragon, Chaotic Neutral
AC 18   HP 105 (14d10 + 28)   Speed 30 ft., Fly 60 ft.
STR 18  DEX 12  CON 15  INT 12  WIS 12  CHA 14
Skills Perception +4, Stealth +4
Immunities Thunder
Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 14
Languages Common, Draconic
CR 7   [2024 rules]

Actions
  Multiattack. The stormdrake makes two Jaws attacks. It can replace one attack with a use of Rolling Peal.
  Jaws. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.
  Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.
  Rolling Peal. Strength Saving Throw: DC 15, each creature in a 60-foot-long, 5-foot-wide Line. Failure: The target is pushed up to 10 feet straight away from Stormdrake, and the target has the Deafened condition until the end of its next turn.
```

---

## sweep-2026-11-03T23-14-10#32 — Ostrakan

**Input:** `a stone giant exile who speaks only Giant and understands no Common`

```
Ostrakan
Huge giant, neutral
AC 14 (natural armor)   HP 161 (14d12 + 70)   Speed 40 ft.
STR 23  DEX 15  CON 20  INT 10  WIS 12  CHA 9
Skills Athletics +10, Perception +5
Saving Throws STR +10, CON +9
Senses darkvision 60 ft., passive Perception 15
Languages Giant
CR 9 (5,000 XP)   [2014 rules]

Actions
  Multiattack. The ostrakan makes two attacks: one with its Stone Club and one with its Boulder. It can replace one attack with a use of Shattering Blow.
  Stone Club. Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.
  Boulder. Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage.
  Shattering Blow. One creature within 60 feet of the ostrakan must make a DC 18 Strength saving throw, taking 31 (9d6) bludgeoning damage on a failed save.
```

---

## sweep-2026-11-03T23-14-10#33 — Pool-Watcher Shesh

**Input:** `lizardfolk monk`

```
Pool-Watcher Shesh
Medium humanoid, neutral
AC 15   HP 94 (21d8)   Speed 30 ft., climb 30 ft., swim 30 ft.
STR 10  DEX 16  CON 10  INT 12  WIS 14  CHA 16
Skills Perception +5, Stealth +6
Saving Throws DEX +6
Senses passive Perception 15
Languages Common plus one other language, Draconic
CR 5 (1,800 XP)   [2014 rules]

Traits
  Patient Strike. During the first round of each combat, Shesh has advantage on attack rolls against any creature that hasn't taken a turn. If Shesh hits a creature during that round, the target takes an extra 9 (2d8) bludgeoning damage.
  Hold Breath. Shesh can hold its breath for 15 minutes.
  Marsh Stride. Difficult Terrain composed of mud doesn't cost Shesh extra movement, and Shesh can move across mud without needing to make an ability check.
  Patient Defense (Bonus Action). Shesh takes the Dodge action.
  Cunning Action (Bonus Action). Shesh takes the Dash, Disengage, or Hide action.
Actions
  Multiattack. Shesh makes two attacks: one with Unarmed Strike and one with Dart.
  Unarmed Strike. Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. Once on each of Shesh's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of Shesh's next turn.
  Dart. Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```

---

## sweep-2026-11-03T23-14-10#34 — Krennik Skullstandard

**Input:** `name: Krennik Skullstandard | riding a worg`

```
Krennik Skullstandard
Medium humanoid, neutral evil
AC 14 (leather)   HP 78 (12d8 + 24)   Speed 50 ft.
STR 14  DEX 16  CON 14  INT 8  WIS 12  CHA 8
Skills Perception +3, Stealth +5
Saving Throws DEX +5
Senses passive Perception 13
Languages Common, Goblin
CR 4 (1,100 XP)   [2014 rules]

Traits
  Skirmish Stride. Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
  Mounted Agility (Bonus Action). Krennik takes the Dash or Disengage action.
Actions
  Multiattack. Krennik makes two attacks: one with Saber and one with Javelin. It can replace one attack with a use of Lodged Skull-Token.
  Saber. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
  Javelin. Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.
  Ride-Down Charge (Recharge 5-6). Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must succeed on a DC 13 Dexterity saving throw or take 24 (7d6) bludgeoning damage and be knocked prone.
  Lodged Skull-Token. One creature within 60 feet must succeed on a DC 13 Dexterity saving throw or take 11 (2d10) bludgeoning damage.
```

---

## sweep-2026-11-03T23-14-10#35 — Well Drowned

**Input:** `name: the thing in the well | `

```
Well Drowned
Medium Monstrosity, Neutral
AC 14   HP 97 (13d8 + 39)   Speed 30 ft., Swim 30 ft., Climb 30 ft.
STR 16  DEX 8  CON 16  INT 4  WIS 10  CHA 4
Skills Athletics +6, Perception +3
Resistances Cold
Senses darkvision 60 ft.; Passive Perception 13
Languages None
CR 5   [2024 rules]

Actions
  Multiattack. The drowned makes two Claw attacks.
  Claw. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Slashing damage plus 7 (2d6) Cold damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.
Bonus Actions
  Whelm. The drowned whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the drowned, and takes 7 (2d6) Cold damage at the start of each of the drowned's turns. The drowned can have only one creature whelmed at a time. If the drowned takes 15 damage or more in a single turn from the whelmed creature, the drowned must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the drowned. If the drowned dies, a whelmed creature pulls free Prone by using 5 feet of movement.
  Undertow Surge (Recharge 5-6). Dexterity Saving Throw: DC 14, one creature within 5 feet. Failure: 18 (4d8) Cold damage, and the target has the Grappled condition (escape DC 14).
```

---

## sweep-2026-11-03T23-14-10#36 — Salt Ghulvar

**Input:** ` | role: brute`

```
Salt Ghulvar
Large Monstrosity, Neutral Evil
AC 14   HP 85 (10d10 + 30)   Speed 30 ft., Swim 30 ft.
STR 18  DEX 8  CON 16  INT 4  WIS 10  CHA 4
Skills Athletics +6, Perception +2
Senses darkvision 120 ft.; Passive Perception 12
Languages None
CR 4   [2024 rules]

Traits
  Larder Glow. Whenever a creature dies within 5 feet of the ghulvar, the ghulvar stores the dead creature's warmth and regains 7 (2d6) Hit Points at the start of each of its turns for 1 minute, until it takes Cold damage, or until it stores another death.
Actions
  Multiattack. The ghulvar makes two attacks, using Bite, Jaw, or Hauled Scream in any combination.
  Bite. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 6 (1d12) Acid damage. If the target is a creature and doesn't already have a salt-seared wound, it is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target receives a salt-seared wound. While wounded, the target loses 5 (1d10) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 13 Wisdom (Medicine) check.
  Jaw. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Acid damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 14).
  Hauled Scream. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Thunder damage, and the target has the Prone condition.
Bonus Actions
  Whelm. The ghulvar whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the ghulvar, and takes 6 (1d12) Acid damage at the start of each of the ghulvar's turns. The ghulvar can have only one creature whelmed at a time. If the ghulvar takes 12 damage or more in a single turn from the whelmed creature, the ghulvar must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the ghulvar. If the ghulvar dies, a whelmed creature pulls free Prone by using 5 feet of movement.
```

---

## sweep-2026-11-03T23-14-10#37 — Meshrin

**Input:** `name: Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points.`

```
Meshrin
Large humanoid, neutral
AC 16 (breastplate)   HP 120 (14d10 + 42)   Speed 30 ft., swim 30 ft.
STR 18  DEX 15  CON 16  INT 10  WIS 12  CHA 15
Skills Perception +4, Stealth +5
Saving Throws DEX +5, WIS +4
Senses passive Perception 14
Languages Common, Draconic
CR 8 (3,900 XP)   [2014 rules]

Traits
  Wounded Frenzy. While below half its hit point maximum, Meshrin has advantage on attack rolls and saving throws.
  Hold Breath. Meshrin can hold its breath for 15 minutes.
  Great Weapon Master. When Meshrin hits a creature with its Greataxe, the attack deals an extra 3 damage.
  Marsh Stride. Difficult Terrain composed of mud doesn't cost Meshrin extra movement, and Meshrin can move across mud without needing to make an ability check.
Actions
  Multiattack. Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Frightful Bellow.
  Greataxe. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.
  Javelin. Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 18 (4d6 + 4) piercing damage. Immediately after the attack, a javelin returns to Meshrin's grasp, and the target's Speed is reduced by 10 feet until the start of Meshrin's next turn.
  Frightful Bellow. Each creature of Meshrin's choice in a 30-foot radius originating from Meshrin that can see or hear it must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

---

## sweep-2026-11-03T23-14-10#38 — Dueling Ossuary

**Input:** `a skeleton with a greatsword`

```
Dueling Ossuary
Medium Undead, Lawful Evil
AC 14   HP 117 (18d8 + 36)   Speed 30 ft.
STR 18  DEX 16  CON 15  INT 6  WIS 8  CHA 5
Skills Athletics +7, Perception +2
Immunities Poison; Exhaustion, Poisoned
Vulnerabilities Bludgeoning
Senses darkvision 60 ft.; Passive Perception 12
Languages Understands Common plus one other language but can't speak
CR 6   [2024 rules]

Traits
  Great Weapon Master. When the ossuary hits a creature with its Greatsword, the attack deals an extra 3 damage.
Actions
  Multiattack. The ossuary makes two attacks, using Greatsword or Shortbow in any combination. It can replace one attack with a use of Sweeping Leg Hook.
  Greatsword. Melee Attack Roll: +7, reach 5 ft. 14 (3d6 + 4) Slashing damage plus 7 (2d6) Necrotic damage.
  Shortbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.
  Sweeping Leg Hook. Strength Saving Throw: DC 14, one creature within 10 feet. Failure: The target has the Prone condition.
```

---

## sweep-2026-11-03T23-14-10#39 — Hired Edge

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`

```
Hired Edge
Medium humanoid, neutral
AC 16 (studded leather, shield)   HP 112 (15d8 + 45)   Speed 30 ft.
STR 18  DEX 15  CON 16  INT 10  WIS 12  CHA 15
Skills Athletics +10, Performance +5
Saving Throws DEX +5, WIS +4
Senses passive Perception 11
Languages Common
CR 5 (1,800 XP)   [2014 rules]

Traits
  Field Discipline. While it can see a creature it has thrown a handaxe at, Edge never has disadvantage on attack rolls against that creature and ignores half cover when striking it.
  Riposte (Reaction). When  A creature within 5 feet of the hired edge misses it with a melee attack roll. ,  The hired edge makes one Handaxe attack against that creature.
Actions
  Multiattack. The hired edge makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
  Handaxe. Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and the hired edge has advantage on its next attack roll against the target before the end of its next turn.
  Shortsword. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage. Immediately after the attack, a handaxe returns to the hired edge's grasp, and the hired edge has advantage on its next attack roll against the target before the end of its next turn. If the hired edge moved at least 20 feet straight toward the target immediately before the hit and the target is Large or smaller, the target is knocked prone, and the hired edge can make one Shortsword attack against it as a Bonus Action.
  Shield Bash. One creature within 5 feet that the hired edge can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

---

## sweep-2026-11-03T23-14-10#40 — Brother Halric

**Input:** `name: Brother Halric | `

```
Brother Halric
Medium humanoid, neutral
AC 13 (chain shirt)   HP 38 (7d8 + 7)   Speed 30 ft.
STR 16  DEX 10  CON 12  INT 13  WIS 16  CHA 13
Skills Medicine +7, Perception +5, Religion +5
Saving Throws INT +3, WIS +5
Senses passive Perception 15
Languages Common plus one other language
CR 3 (700 XP)   [2014 rules]

Traits
  Divine Aid (3/Day) (Bonus Action). Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.
Actions
  Multiattack. Halric makes two attacks: one with Mace and one with Radiant Flame.
  Spellcasting. Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
  Snaring Chain (Recharge 5-6). One Large or smaller creature Halric can see within 60 feet must make a DC 13 Dexterity saving throw. On a failed save, the target is restrained until the chain is destroyed (AC 10; HP 10; Vulnerability to fire damage; Immunity to Poison and psychic damage).
  Radiant Flame. Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
  Mace. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```
