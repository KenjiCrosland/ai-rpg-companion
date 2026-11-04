# For the critic — reskin engine, 2026-11-04 gate forty

**Supporting files**

- [CHECK-sweep-2026-11-04T05-51-49.md](scripts/smoke-evidence/CHECK-sweep-2026-11-04T05-51-49.md) — checker table, the 7 FAILs, bands, clause coverage
- [LINT-sweep-2026-11-04T05-51-49.md](scripts/smoke-evidence/LINT-sweep-2026-11-04T05-51-49.md) — 4 findings across 40 sheets
- [smoke-out/sweep-2026-11-04T05-51-49/](smoke-out/sweep-2026-11-04T05-51-49/) — raw JSON + per-sheet traces
- previous package for comparison: [CRITIC-2026-11-03-expansion.md](scripts/smoke-evidence/CRITIC-2026-11-03-expansion.md)

The 40 rendered blocks are in §A below.

## What changed since your last read

Five things, four of which this forty can speak to.

**1. The 2014 reaction renderer — fixed.** `"When  X. ,  Y"` is **0 of 40**, down from the 4 sheets you found (#18, #23, #25, #28). The cause: the converter matched `Trigger:` *inside* the engine's own `*Trigger:*` asterisks, so the capture ended in `*`, the trailing-stop strip never fired, and a later emphasis strip left both artifacts at once. It also restores the lowercase first word, which the asterisk had been blocking — so some of your mid-sentence-capital class should be gone too. `((with mind blank))` persists on one sheet and is a separate bug.

**2. Your resolver, named-row half — built.** `danglingRefIn` held two citation shapes; the Osseo-Solar Lich's `"recharges Skeletal Radiance"` was a third. Added. Measured both ways first: across every saved run, `recharge` is the ONLY citation verb the existing doors miss (`resets`, `triggers`, `activates`, `repeats`, `refreshes` find nothing), and print has 0 rows matching `"recharges <TitleCase>"`. **Caveat: it fired 0 times on this forty**, so it is built and unexercised. `dangling-ref` was your top FAIL class last run and is absent here, but that is variance, not evidence for the fix.

**3. Your resolver, quantity half — built, and the numbers are honest about it.** The authoring call now declares how many numbers a row promises; the engine counts how many are written and refuses the shortfall. On this forty, of **31 authored rows**: the count was **answered on 16 (52%)**, **unanswered on 15 (48%)**, and it **refused 3 rows** — Cliff-Bred Limbs, Stolen Scream, Huskswarm Halo. So it works when answered and is inert otherwise. A narrow verb check goes in beside it next; this was deliberately tried as a declared field first, because two of your three example rows carry a number *elsewhere* ("10 (3d6) Fire damage"), so "does this row contain a number" passes all three.

**4. Your ceiling item — built, with a correction to the diagnosis.** Both halves you asked for already existed: save rows *were* covered and riders *were* summed in-row, and your two examples fired at `soft` (Undertow 63 vs 60 at CR 24; Knell 53 vs 51 — and Knell is an attack row, not a save row). The real gap was the **baseline**: the ceiling is derived from print's ATTACK rows and was applied to save rows too. Print keeps a focused save row softer than a hit in every band but the last — at CR 13–16 its hardest is **31** where the attack ceiling is 51. Measured separately (43 rows; per-band sample sizes recorded in the code, 17–20 rests on two). It immediately caught **your own template, unprompted**: `Merciless Strike: 49 damage to one target at CR 13 — print's hardest single-target SAVE row is 31`. You flagged that same template at CR 13 in pattern 3d.

**5. A high-CR brute's area nova was using print's low-CR cone.** `brute-13`/`brute-17` shipped a 30-foot Cone — print's size for CR 5–12. Raised to 60, the only non-dragon precedent print offers above CR 12 (Iron Golem, CR 16). Verified on this forty: `brute-17-juggernaut` shipped 60. The dragon donors were already print-exact (15/30/60/90 at CR 2/8/15/22) and were never wrong.

**Also:** two lint rules were **pulled** rather than fixed — `orphan-action-row` (print ships 38 Actions of that shape; it was flagging the Vess Drowned Choir's "One Voice", the row you named that sheet's Keeper) and `double-space-label` (invisible after the whitespace normalisation every renderer performs). Lint findings fell 17 → 4 as a result, and most of that drop was my instrumentation, not the engine.

## Please don't spend findings on these

- **`lack-honored` on the Adult Red Dragon** — deliberate. The arm that honoured "blind in one eye" produced three defects across two gate runs (stripped a dragon's blindsight, muted a giant who "speaks only Giant", doubled a Languages line). Reverted on purpose until a field can tell partial from total.
- **The FAIL count.** This batch has run 2, 6, 2, 3, 5, 7, 7 with no code change between some of those. Recurring *classes* across the last two runs are `single-target-ceiling`, `lack-honored`, `condition-duration`; everything else rotates. A recurring class is signal, the count is not.
- **The monk kit.** Now a hard FAIL rather than invisible (`Merciless Strike: 36 at CR 5 against print's 24`), but the generation-side fix is not in — the ceiling flags a hot save row, it does not prevent one. 6% of sheets carry one.

## Two things I checked and you may want to drop

- **Stone Camouflage and Rock Catching are not in SRD 5.2.** Print's Stone Giant is Multiattack, Stone Club, Boulder — exactly what we ship. Those traits are 2014 Monster Manual, so they are not ours to copy. The AC difference in that sheet was the ±1 print window working as designed (our sheet CR 9, print's body CR 7).
- **The shared donor body.** Within a single forty, **39 of 40 stat lines are distinct** (38 of 40 on homebrew40). The x12 clusters I first found were one concept rolled twelve times across runs, which a deterministic chassis should do.

## What I want from you

**The same question as last time, because your answer reframed the work and I want to know if it holds on a fresh roll: does a brute block read dull even when its ideas land?**

Your loop taxonomy is now the thing I am designing against, not reaction/spellcasting slots. Relevant measurements since: brutes are 40% of routings, but **79% of those are styled** — grappler 14.9% of all sheets, juggernaut 10.4%, plain brute only 8.6%. Containment appears in 29% of concepts and made-bodies in 26%, so the grappler and juggernaut monopolies are mostly the inputs, not laziness. If grapplers and chargers still read as loops and the flat ones are still plain-brute and regenerator, then the target is ~15% of sheets rather than 40%.

Second: `relic-object` — a template that gives an object AC, HP and a dependency ("while it is intact, the creature regains 5 Hit Points") — **has landed 0 times in 3,000+ sheets**, blocked by a body question asking for something kept *apart from* the creature's body. Print's six breakable-part creatures are Troll limbs, Hydra heads, the Clay Golem. Your favourite row across sixteen Pumpkin Kings was the king's own gourd crown. Is that worth unblocking before release, or is it post-release polish?

---

# §A — the forty (sweep-2026-11-04T05-51-49)

---

## sweep-2026-11-04T05-51-49#01 — Dire Wolf

**Input:** `name: Dire Wolf | with a frost-rimed hide`

```
Dire Wolf
Large Beast, Unaligned
AC 14   HP 22 (3d10 + 6)   Speed 50 ft.
STR 17  DEX 15  CON 15  INT 3  WIS 12  CHA 7
Skills Perception +5, Stealth +4
Resistances Cold
Senses darkvision 60 ft.; Passive Perception 15
Languages None
CR 1   [2024 rules]

Traits
  Frost-Rimed Hide. At the end of each of the dire wolf's turns, each creature in a 5-foot Emanation originating from the dire wolf takes 5 (1d10) Cold damage.
  Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.
Actions
  Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.
  Pack-Lunge. Strength Saving Throw: DC 13, one creature within 5 feet. Failure: The target is pulled up to 30 feet straight toward the dire wolf, and the target has the Prone condition.
```

---

## sweep-2026-11-04T05-51-49#02 — Bog Hound

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
  Mudbank Camouflage. While the bog hound remains motionless, it is indistinguishable from a mudbank.
  Whelm (Bonus Action). The bog hound whelms one Medium or smaller creature it is grappling. While whelmed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the bog hound, and takes 3 (1d6) bludgeoning damage at the start of each of the bog hound's turns. The bog hound can have only one creature whelmed at a time. If the bog hound takes 5 damage or more in a single turn from the whelmed creature, the bog hound must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the bog hound. If the bog hound dies, a whelmed creature pulls free prone by using 5 feet of movement.
Actions
  Multiattack. The bog hound makes two Bite attacks. It can replace one attack with a use of Drag Under.
  Bite. Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
  Drag Under. Each creature in a 15-foot cone must make a DC 13 Constitution saving throw. On a failed save, the target is blinded until the end of the bog hound's next turn.
```

---

## sweep-2026-11-04T05-51-49#03 — Owlbear

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
  Spider Climb. The owlbear can climb difficult surfaces, including along ceilings, without needing to make an ability check. Additionally, Difficult Terrain composed of sheer vertical surfaces doesn't cost the owlbear extra movement.
Actions
  Multiattack. The owlbear makes two Rend attacks. It can replace one attack with a use of Pouncing Slam.
  Rend. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
  Pouncing Slam. The owlbear spends 5 feet of movement to jump to a space within 15 feet that contains one or more Large or smaller creatures. Each creature in the destination space must make a DC 15 Dexterity saving throw, taking 22 (5d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is knocked prone.
```

---

## sweep-2026-11-04T05-51-49#04 — Bell-Ringer Ghost

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`

```
Bell-Ringer Ghost
Medium Undead, Neutral
AC 11   HP 45 (10d8)   Speed 5 ft., Fly 40 ft. (hover)
STR 7  DEX 13  CON 10  INT 10  WIS 12  CHA 17
Skills Perception +3, Stealth +5
Resistances Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder
Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
Senses darkvision 60 ft.; Passive Perception 13
Languages Common plus one other language
CR 3   [2024 rules]

Traits
  Ethereal Sight. The bell-ringer ghost can see 60 feet into the Ethereal Plane when it is on the Material Plane.
  Incorporeal Movement. The bell-ringer ghost can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.
Actions
  Multiattack. The bell-ringer ghost makes two Withering Touch attacks. It can replace one attack with a use of Dying-Knell Toll.
  Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.
  Dying-Knell Toll. Dexterity Saving Throw: DC 13, each creature in a 30-foot Emanation. Failure: 17 (5d6) Bludgeoning damage.
  Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the bell-ringer ghost and isn't an Undead. Failure:  10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the bell-ringer ghost's next turn. Success:  The target is immune to this ghost's Horrific Visage for 24 hours.
  Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the bell-ringer ghost can see within 5 feet. Failure:  The target is possessed by the bell-ringer ghost; the bell-ringer ghost disappears, and the target has the Incapacitated condition and loses control of its body. The bell-ringer ghost now controls the body, but the target retains awareness. The bell-ringer ghost can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The bell-ringer ghost's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the bell-ringer ghost leaves as a Bonus Action. When the possession ends, the bell-ringer ghost appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success:  The target is immune to this ghost's Possession for 24 hours.
  Etherealness. The bell-ringer ghost casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The bell-ringer ghost is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.
```

---

## sweep-2026-11-04T05-51-49#05 — Air Elemental

**Input:** `name: Air Elemental | that carries stolen voices`

```
Air Elemental
Large Elemental, Neutral
AC 15   HP 90 (12d10 + 24)   Speed 10 ft., Fly 90 ft. (hover)
STR 14  DEX 20  CON 14  INT 6  WIS 10  CHA 6
Skills Perception +3, Stealth +11
Resistances Bludgeoning, Lightning, Piercing, Slashing
Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious
Senses darkvision 60 ft.; Passive Perception 13
Languages Primordial (Auran)
CR 5   [2024 rules]

Traits
  Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.
Actions
  Multiattack. The air elemental makes two Thunderous Slam attacks. It can replace one attack with a use of Chorus of the Taken.
  Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.
  Chorus of the Taken. Wisdom Saving Throw: DC 13, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.
  Whirlwind (Recharge 4-6). Strength Saving Throw: DC 13, one Medium or smaller creature in the air elemental's space. Failure:  24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the air elemental and has the Prone condition. Success:  Half damage only.
```

---

## sweep-2026-11-04T05-51-49#06 — Spoilheap Pit

**Input:** `a quarry-pit thing of living scree that buries what it catches`

```
Spoilheap Pit
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
  Shifting Scree. The ground in a 10-foot radius originating from the pit is Difficult Terrain.
  Entomb (Bonus Action). The pit entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the pit, and takes 7 (2d6) bludgeoning damage at the start of each of the pit's turns. The pit can have only one creature entombed at a time. If the pit takes 15 damage or more in a single turn from the entombed creature, the pit must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the pit. If the pit dies, an entombed creature breaks free prone by using 5 feet of movement.
Actions
  Multiattack. The pit makes two Scree attacks. It can replace one attack with a use of Merciless Strike.
  Scree. Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
  Merciless Strike. The pit grinds the caught creature underfoot. One creature within 30 feet that is grappled must make a DC 14 Dexterity saving throw, taking 35 (10d6) bludgeoning damage on a failed save, or half as much damage on a successful one.
```

---

## sweep-2026-11-04T05-51-49#07 — Hydra

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
  Hold Breath. The hydra can hold its breath for 1 hour.
  Multiple Heads. The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
  Reactive Heads. For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.
Actions
  Multiattack. The hydra makes as many Bite attacks as it has heads.
  Bite. Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
```

---

## sweep-2026-11-04T05-51-49#08 — Siege-Timber Golem

**Input:** `a siege-engine golem of lashed timber that shoulders through walls`

```
Siege-Timber Golem
Large Construct, Unaligned
AC 15   HP 153 (18d10 + 54)   Speed 30 ft.
STR 20  DEX 8  CON 16  INT 6  WIS 10  CHA 4
Skills Athletics +8, Perception +3
Immunities Poison, Thunder; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
Senses darkvision 60 ft.; Passive Perception 13
Languages Understands the languages of its creator but can't speak
CR 8   [2024 rules]

Traits
  Thunder Absorption. Whenever the golem is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.
  Immutable Form. The golem can't shape-shift.
  Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.
Actions
  Multiattack. The golem makes two Timber Ram attacks.
  Timber Ram. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.
  Siege Shove. Strength Saving Throw: DC 16, each creature in a 30-foot Cone. Failure: The target is pushed up to 15 feet away from the golem and has the Prone condition.
```

---

## sweep-2026-11-04T05-51-49#09 — Stone Golem

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
  Tears of the Weeping Saint. While a creature is Restrained by the golem's Force Bolt, the golem moves at full Speed straight toward the Restrained creature, ignoring Difficult Terrain and passing through nonmagical stone barriers in its path.
  Immutable Form. The golem can't shape-shift.
  Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.
Actions
  Multiattack. The golem makes two attacks, using Slam or Force Bolt in any combination.
  Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.
  Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.
  Weeping Snare (1/Day). Strength Saving Throw: DC 17, one creature the golem can see within 120 feet. Failure: 17 (5d6) Bludgeoning damage, and the target has the Restrained condition until the mortar is destroyed (AC 15; HP 20; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).
Bonus Actions
  Slow (Recharge 5-6). The golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).
```

---

## sweep-2026-11-04T05-51-49#10 — Drowned Cathedral Choir

**Input:** `a drowned cathedral choir that sings in one voice`

```
Drowned Cathedral Choir
Huge undead, neutral
AC 16 (natural armor)   HP 180 (19d12 + 57)   Speed 30 ft., swim 30 ft.
STR 18  DEX 16  CON 17  INT 13  WIS 14  CHA 11
Skills Perception +6, Stealth +11
Saving Throws DEX +7, INT +5
Immunities poison; exhaustion, poisoned
Senses darkvision 60 ft., passive Perception 16
Languages Common plus the languages it knew in life
CR 10 (5,900 XP)   [2014 rules]

Traits
  The Note That Will Not Die. While the cathedral choir has half of its hit points or fewer, each creature within 30 feet of it that is charmed takes 10 (3d6) thunder damage at the start of each of its turns.
  Umbral Step (Bonus Action). While in Dim Light or Darkness, the choir takes the Hide action.
Actions
  Multiattack. The choir makes three Tidal Slam attacks. It can replace one attack with a use of Undivided Chord.
  Tidal Slam. Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 21 (4d8 + 3) thunder damage.
  Undivided Chord. Each creature of the choir's choice in a 60-foot radius originating from the choir that can see or hear the choir must make a DC 15 Wisdom saving throw. On a failed save, the target is charmed until the start of the choir's next turn, and while charmed this way, it must move toward the choir by the safest available route on its turn and can't take Reactions. On a successful save, the target is immune to this creature's lure for 24 hours.
```

---

## sweep-2026-11-04T05-51-49#11 — Vampire

**Input:** `name: Vampire | who keeps a garden of thorns`

```
Vampire
Medium undead, lawful evil
AC 16 (natural armor)   HP 195 (23d8 + 92)   Speed 40 ft., climb 40 ft.
STR 18  DEX 18  CON 18  INT 17  WIS 15  CHA 18
Skills Perception +7, Stealth +9
Saving Throws DEX +9, CHA +9
Resistances necrotic
Immunities poison; exhaustion, poisoned
Senses darkvision 120 ft., passive Perception 17
Languages Common plus two other languages
CR 13 (10,000 XP)   [2014 rules]

Traits
  Legendary Resistance (3/Day). If the vampire fails a saving throw, it can choose to succeed instead.
  Misty Escape. If the vampire drops to 0 hit points outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 Hit Point after spending 1 hour there.
  Spider Climb. The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  Vampire Weakness. The vampire has these weaknesses: Forbiddance: the vampire can't enter a residence without an invitation from an occupant.
Running Water: the vampire takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the vampire's heart while the vampire is incapacitated in its resting place, the vampire is paralyzed until the weapon is removed.
Sunlight: the vampire takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
  Shape-Shift (Bonus Action). If the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the vampire can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.
  Charm (Recharge 5-6) (Bonus Action). The vampire casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the vampire's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the vampire.
Actions
  Multiattack. The vampire makes two Grave Strike attacks and uses Bite. It can replace one attack with a use of Binding Lash.
  Grave Strike. Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
  Binding Lash. One creature within 60 feet must make a DC 17 Dexterity saving throw. On a failed save, the target is restrained until the end of its next turn.
  Bite (Bat or Vampire Form Only). One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions
  Deathless Strike. The vampire moves up to half its Speed, and it makes one Grave Strike attack.
  Beguile. The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

---

## sweep-2026-11-04T05-51-49#12 — Rotfeast Archon

**Input:** `a plague-bearing archon of flies that commands lesser swarms`

```
Rotfeast Archon
Large Fiend, Neutral Evil
AC 18   HP 190 (20d10 + 80)   Speed 30 ft., Fly 30 ft. (hover)
STR 20  DEX 14  CON 18  INT 12  WIS 13  CHA 18
Skills Athletics +10, Persuasion +9
Resistances Cold
Immunities Poison; Poisoned
Senses darkvision 120 ft.; Passive Perception 11
Languages Common
CR 13   [2024 rules]

Traits
  No Coming Back. A creature reduced to 0 Hit Points by the archon crumbles to dust, and it can't be restored to life by any means short of a Wish spell.
  Aura of Authority. While in a 10-foot Emanation originating from the archon, the archon and its allies have Advantage on attack rolls and saving throws, provided the archon doesn't have the Incapacitated condition.
Actions
  Multiattack. The archon makes three attacks, using Claw or Sting in any combination.
  Claw. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Slashing damage plus 13 (3d8) Poison damage.
  Sting. Melee Attack Roll: +10, reach 5 ft. 32 (6d8 + 5) Piercing damage.
Bonus Actions
  Answering Sting. One creature within 5 feet that hit the archon with an attack roll since the end of the archon's last turn takes 13 (3d8) Poison damage.
```

---

## sweep-2026-11-04T05-51-49#13 — Purple Worm

**Input:** `name: Purple Worm | that swallowed a war-band's armoury`

```
Purple Worm
Gargantuan Monstrosity, Unaligned
AC 18   HP 247 (15d20 + 90)   Speed 50 ft., Burrow 50 ft.
STR 28  DEX 7  CON 22  INT 1  WIS 8  CHA 4
Skills Athletics +14, Perception +4
Resistances Fire
Senses blindsight 30 ft., tremorsense 60 ft.; Passive Perception 14
Languages None
CR 15   [2024 rules]

Traits
  Bladewake Breach. When the worm breaches up through a surface, each creature standing over the worm's path takes 22 (5d8) Piercing damage as its embedded blades drive through them.
  Tunneler. The worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.
Actions
  Multiattack. The worm makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Swallow.
  Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.
  Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.
  Swallow. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the worm hit with a melee attack this turn. Failure: The target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the worm, and takes 21 (6d6) Fire damage at the start of each of the worm's turns. If the worm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the worm and has the Prone condition. If the worm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.
```

---

## sweep-2026-11-04T05-51-49#14 — Rimeheart Warden

**Input:** `a glacier's heart given legs, trailing a wake of killing cold`

```
Rimeheart Warden
Large elemental, neutral
AC 16 (natural armor)   HP 209 (22d10 + 88)   Speed 30 ft.
STR 16  DEX 8  CON 19  INT 6  WIS 10  CHA 4
Skills Athletics +8, Perception +5
Saving Throws STR +8, CON +9
Immunities cold, poison; exhaustion, poisoned
Senses tremorsense 60 ft., passive Perception 15
Languages None
CR 15 (13,000 XP)   [2014 rules]

Traits
  Cold Absorption. Whenever the rimeheart warden is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
  Siege Monster. The rimeheart warden deals double damage to objects and structures.
Actions
  Multiattack. The rimeheart warden makes two Glacier Fist attacks. It can replace one attack with a use of Gelid Wake.
  Glacier Fist. Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage plus 13 (3d8) cold damage.
  Rime Breath (Recharge 5-6). Each creature in a 30-foot cone must make a DC 17 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
  Gelid Wake. Each creature in a 30-foot cone must make a DC 17 Constitution saving throw. On a failed save, the target is blinded until the end of the rimeheart warden's next turn.
```

---

## sweep-2026-11-04T05-51-49#15 — Adult Red Dragon

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

## sweep-2026-11-04T05-51-49#16 — Brass Tyrant

**Input:** `a tyrant of burning brass who rules a city of forges`

```
Brass Tyrant
Huge Construct, Lawful Neutral
AC 19   HP 230 (20d12 + 100)   Speed 30 ft.
STR 22  DEX 8  CON 20  INT 6  WIS 10  CHA 4
Skills Athletics +12, Perception +6
Resistances Fire
Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
Senses darkvision 120 ft.; Passive Perception 16
Languages Common
CR 17   [2024 rules]

Traits
  Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.
  Immutable Form. The tyrant can't shape-shift.
  Siege Monster. The tyrant deals double damage to objects and structures.
Actions
  Multiattack. The tyrant makes two Hammerfist attacks. It can replace one attack with a use of Molten Cast.
  Hammerfist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.
  Furnace Blast (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 66 (12d10) Fire damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.
  Molten Cast. Dexterity Saving Throw: DC 19, one creature within 60 feet. Failure: 39 (6d12) Fire damage.
Legendary Actions
  Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.
  Hammer Down. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Hammerfist attack.
  Forge Wreck. The tyrant moves up to half its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.
  Quake Stomp. Strength Saving Throw: DC 19, each creature within 10 feet of the tyrant. Failure: The target has the Prone condition.
```

---

## sweep-2026-11-04T05-51-49#17 — Pit Fiend

**Input:** `name: Pit Fiend | who collects the oaths of dying knights`

```
Pit Fiend
Large Fiend, Lawful Evil
AC 21   HP 337 (27d10 + 189)   Speed 30 ft., Fly 60 ft. (hover)
STR 26  DEX 14  CON 24  INT 22  WIS 18  CHA 24
Skills Perception +10, Persuasion +19
Resistances Cold
Immunities Fire, Poison; Poisoned
Senses darkvision 120 ft.; Passive Perception 20
Languages Infernal; telepathy 120 ft.
CR 20   [2024 rules]

Traits
  Collateral Word. A creature within 5 feet of the pit fiend speaks a promise, plea, or vow aloud, casts a spell with a verbal component, surrenders, or calls for aid, on a failed save, the utterance turns to slag: a spell fizzles and its slot is wasted, a surrender binds the speaker to stillness, and any other spoken vow or plea is voided as magma. On a successful save, the utterance is spoken and resolved normally.
  Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.
  Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.
  Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure:  The target has the Frightened condition until the start of its next turn. Success:  The target is immune to this pit fiend's aura for 24 hours.
  Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.
Actions
  Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of (A) or (B) Spellcasting to cast Bestow Curse.
  Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure:  The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.
  Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.
  Spellcasting. The pit fiend casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 20):

- At Will: Bestow Curse, Detect Magic, Fear
- 1/Day Each: Wall of Fire (level 5 version)
  Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.
```

---

## sweep-2026-11-04T05-51-49#18 — Bone-Sun Archlich

**Input:** `an archlich enthroned on a sun of bone`

```
Bone-Sun Archlich
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
  Bone-Sun Splinter. Once per turn, when a creature takes damage from Eldritch Burst, the struck creature carries the splinter; the archlich senses its location and sees through it as though standing in its place, and the creature's flesh hardens, and it is restrained until the splinter is removed by magical healing or a long rest.
  Legendary Resistance (3/Day). If the archlich fails a saving throw, it can choose to succeed instead.
  Spirit Jar. If destroyed, the archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archlich's lair.
  Protective Magic (3/Day) (Reaction). When the archlich is hit by an attack roll, the archlich casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.
Actions
  Multiattack. The archlich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of (A) Scouring Volley or (B) Spellcasting to cast Ray of Sickness.
  Eldritch Burst. Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
  Paralyzing Touch. Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the archlich's next turn.
  Spellcasting. The archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/day each: Animate Dead, Dimension Door, Plane Shift
1/day each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
  Scouring Volley. Each creature of the archlich's choice in a 30-foot radius originating from the archlich that can see or hear it must make a DC 19 Wisdom saving throw. On a failed save, the target is frightened until the start of the archlich's next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
Legendary Actions
  Deathly Teleport. The archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
  Disrupt Life. Each creature that isn't an Undead in a 20-foot radius originating from the archlich must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
  Frightening Gaze. The archlich casts Fear, using the same spellcasting ability as Spellcasting. The archlich can't take this action again until the start of its next turn.
```

---

## sweep-2026-11-04T05-51-49#19 — Ancient Gold Dragon

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

## sweep-2026-11-04T05-51-49#20 — Trench Leviathan

**Input:** `a leviathan of the trench whose song drowns fleets`

```
Trench Leviathan
Gargantuan Monstrosity, Neutral
AC 21   HP 542 (31d20 + 217)   Speed 40 ft., Swim 40 ft.
STR 28  DEX 10  CON 24  INT 10  WIS 14  CHA 14
Skills Athletics +16, Perception +9
Senses blindsight 120 ft.; Passive Perception 19
Languages None
CR 24   [2024 rules]

Traits
  Amphibious. The leviathan can breathe air and water.
  Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.
Actions
  Multiattack. The leviathan makes two Bite attacks. It can replace one attack with a use of Siren Lure.
  Bite. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Piercing damage plus 14 (4d6) Thunder damage.
  Pressure-Song (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.
  Siren Lure. Wisdom Saving Throw: DC 24, each creature of the leviathan's choice in a 120-foot Emanation originating from the leviathan that can see or hear it. Failure: The target has the Charmed condition until the end of its next turn, and while Charmed this way, it must move toward the leviathan by the safest available route on its turn and can't take Reactions. Success: The target is immune to this creature's lure for 24 hours.
Legendary Actions
  Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.
  Sound and Strike. The leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Bite attack.
  Tidal Slam. Strength Saving Throw: DC 24, each creature within 10 feet of the leviathan. Failure: The target has the Prone condition.
```

---

## sweep-2026-11-04T05-51-49#21 — Owlbear

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

## sweep-2026-11-04T05-51-49#22 — Goblin Boss

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
  Nimble Escape (Bonus Action). The boss takes the Disengage or Hide action.
Actions
  Multiattack. The boss makes two attacks, using Scimitar or Shortbow.
  Scimitar. Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage.
  Shortbow. Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.
```

---

## sweep-2026-11-04T05-51-49#23 — Vashka the Red

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
  Shield Shove. Strength Saving Throw: DC 15, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from Vashka and has the Prone condition.
  Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vashka can see. Failure:  9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.
Reactions
  Riposte. Trigger: A creature within 5 feet of Vashka misses it with a melee attack roll. Response: Vashka makes one Longsword attack against that creature.
```

---

## sweep-2026-11-04T05-51-49#24 — Molthusk Harvester

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`

```
Molthusk Harvester
Large Monstrosity, Unaligned
AC 15   HP 161 (19d10 + 57)   Speed 40 ft., Climb 40 ft.
STR 18  DEX 8  CON 17  INT 4  WIS 12  CHA 6
Skills Athletics +8, Perception +5
Senses darkvision 60 ft.; Passive Perception 15
Languages None
CR 9   [2024 rules]

Actions
  Multiattack. The harvester makes two Spitting Maw attacks.
  Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).
  Sweeping Slash (Recharge 5-6). Dexterity Saving Throw: DC 15, each creature within 10 feet. Failure: 32 (5d12) Slashing damage, and the target has the Prone condition. Success: Half damage only.
Bonus Actions
  Swallow. The harvester swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the harvester, and takes 10 (3d6) Acid damage at the start of each of the harvester's turns. The harvester can have only one creature swallowed at a time. If the harvester takes 25 damage or more on a single turn from the swallowed creature, the harvester must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the harvester. If the harvester dies, a swallowed creature exits the body Prone by using 10 feet of movement.
```

---

## sweep-2026-11-04T05-51-49#25 — Black-Iron Sentinel

**Input:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`

```
Black-Iron Sentinel
Huge construct, lawful neutral
AC 20 (natural armor)   HP 168 (16d12 + 64)   Speed 20 ft.
STR 18  DEX 8  CON 18  INT 7  WIS 10  CHA 3
Skills Perception +4
Saving Throws CON +8
Immunities poison; charmed, exhaustion, frightened, paralyzed, petrified, poisoned
Senses darkvision 60 ft., passive Perception 14
Languages understands the languages of its creator but can't speak
CR 11 (7,200 XP)   [2014 rules]

Traits
  Relentless Advance. While the sentinel is moving toward a creature it has damaged within the last 24 hours, the sentinel's Speed can't be reduced and Difficult Terrain doesn't cost it extra movement.
  Ward Bond. The sentinel is magically bound to a ward of its choosing, and it can have only one ward at a time. While the sentinel is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the sentinel.
  Regeneration. The sentinel regains 10 hit points at the start of each of its turns if it has at least 1 Hit Point.
  Iron Retort (Bonus Action). One creature within 5 feet that hit the sentinel with an attack roll since the end of the sentinel's last turn takes 10 (3d6) bludgeoning damage.
  Interpose (Reaction). When a creature within 5 feet of the sentinel that it guards is hit by an attack roll, the attack hits the sentinel instead, and the sentinel has Resistance to the attack's damage.
Actions
  Multiattack. The sentinel makes two Piston Slam attacks.
  Piston Slam. Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
  Bulwark Plating (2/Day). The sentinel targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the sentinel's next turn.
```

---

## sweep-2026-11-04T05-51-49#26 — Fenwater Crone

**Input:** `a marsh witch who curses trespassers, cr 7`

```
Fenwater Crone
Medium Humanoid, Neutral
AC 15   HP 81 (18d8)   Speed 30 ft., Swim 30 ft.
STR 9  DEX 14  CON 11  INT 17  WIS 12  CHA 11
Skills Arcana +6, History +6, Perception +4
Senses Passive Perception 14
Languages Common and any three languages, Aquan
CR 7   [2024 rules]

Traits
  Marsh Stride. Difficult Terrain composed of marsh, bog, and standing water doesn't cost the crone extra movement, and the crone can move across marsh, bog, and standing water without needing to make an ability check.
Actions
  Multiattack. The crone makes three Arcane Burst attacks. It can replace one attack with a use of The Fen's Claim.
  Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.
  Spellcasting. The crone casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly
  The Fen's Claim. Strength Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Restrained condition until the end of its next turn.
Bonus Actions
  Misty Step (3/Day). The crone casts Misty Step, using the same spellcasting ability as Spellcasting.
Reactions
  Protective Magic (3/Day). The crone casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.
```

---

## sweep-2026-11-04T05-51-49#27 — Chapel Doorkeeper

**Input:** `a templar priest with a mace and no magic at all`

```
Chapel Doorkeeper
Medium Humanoid, Neutral
AC 16   HP 112 (15d8 + 45)   Speed 30 ft.
STR 18  DEX 15  CON 16  INT 10  WIS 12  CHA 15
Skills Athletics +10, Performance +5
Senses Passive Perception 11
Languages Common
CR 6   [2024 rules]

Traits
  Aura of Authority. While in a 10-foot Emanation originating from the doorkeeper, the doorkeeper and its allies have Advantage on attack rolls and saving throws, provided the doorkeeper doesn't have the Incapacitated condition.
Actions
  Multiattack. The doorkeeper makes three Mace attacks. It can replace one attack with a use of Shield Bash.
  Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the doorkeeper's next turn.
  Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the doorkeeper can see. Failure:  9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.
```

---

## sweep-2026-11-04T05-51-49#28 — Ilvareth Dusksong

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
Languages Common plus five other languages, Elvish
CR 12 (8,400 XP)   [2014 rules]

Traits
  Shroud of Dusk. While in dim light or darkness, Ilvareth cannot be pinpointed by sight or sound and leaves no track or shadow.
  Magic Resistance. Ilvareth has advantage on saving throws against spells and other magical effects.
  Misty Step (3/Day) (Bonus Action). Ilvareth casts Misty Step, using the same spellcasting ability as Spellcasting.
  Protective Magic (3/Day) (Reaction). When Ilvareth is hit by an attack roll, Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.
Actions
  Multiattack. Ilvareth makes four Arcane Burst attacks.
  Spellcasting. Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): - At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fly, Lightning Bolt
1/day each: Cone of Cold, Mind Blank, Scrying, Teleport
  Arcane Burst. Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
```

---

## sweep-2026-11-04T05-51-49#29 — Swarm of Tollswarms

**Input:** `a swarm of funeral bells that ring themselves over the dying`

```
Swarm of Tollswarms
Medium Swarm of Tiny Constructs, Unaligned
AC 15   HP 178 (21d8 + 84)   Speed 30 ft., Fly 30 ft. (hover)
STR 8  DEX 20  CON 18  INT 4  WIS 10  CHA 2
Resistances Bludgeoning, Piercing, Slashing
Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
Senses blindsight 30 ft.; Passive Perception 10
Languages Understands the languages of its creator but can't speak
CR 13   [2024 rules]

Traits
  Knellcall. While any creature at 0 Hit Points is within the swarm's blindsight, the bells answer the fall: the swarm ignores Difficult Terrain and can take the Dash action as a Bonus Action on its next turn.
  Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.
Actions
  Peal. Melee Attack Roll: +10, reach 5 ft. 32 (6d8 + 5) Bludgeoning damage plus 21 (6d6) Necrotic damage, or 16 (3d10) Bludgeoning damage plus 10 (3d6) Necrotic damage if the swarm is Bloodied.
  Drowning Toll. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Blinded condition until the end of its next turn.
```

---

## sweep-2026-11-04T05-51-49#30 — Sanctified Rot

**Input:** `a cathedral-vault ooze that digests reliquaries`

```
Sanctified Rot
Huge ooze, unaligned
AC 10 (natural armor)   HP 161 (17d12 + 51)   Speed 20 ft., climb 20 ft.
STR 18  DEX 6  CON 16  INT 2  WIS 8  CHA 1
Immunities acid; charmed, deafened, exhaustion, frightened, grappled, prone, restrained
Senses blindsight 60 ft. (blind beyond this radius), passive Perception 9
Languages None
CR 9 (5,000 XP)   [2014 rules]

Traits
  Aberrant Ground. The ground in a 10-foot radius originating from the rot is Difficult Terrain.
  Amorphous. The rot can move through a space as narrow as 1 inch wide without squeezing.
  Corrosive Form. A creature that touches the rot or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
  Spider Climb. The rot can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Actions
  Multiattack. The rot makes two Pseudopod attacks. It can replace one attack with a use of Crushing Slam.
  Pseudopod. Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 28 (7d6 + 4) acid damage.
  Crushing Slam. One creature within 5 feet of the rot must make a DC 15 Dexterity saving throw, taking 31 (9d6) bludgeoning damage on a failed save.
```

---

## sweep-2026-11-04T05-51-49#31 — Anvilcloud Drake

**Input:** `a young storm drake whose breath is a rolling wall of thunder`

```
Anvilcloud Drake
Medium Dragon, Chaotic Neutral
AC 18   HP 110 (17d8 + 34)   Speed 30 ft., Fly 60 ft.
STR 18  DEX 12  CON 15  INT 12  WIS 12  CHA 14
Skills Perception +4, Stealth +4
Immunities Thunder
Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 14
Languages Common, Draconic
CR 7   [2024 rules]

Traits
  Storm-Charge Corona. At the start of each of the drake's turns, each creature within 10 feet of the drake that has the Prone or Frightened condition takes 9 (2d8) Thunder damage.
Actions
  Multiattack. The anvilcloud drake makes two Talons attacks.
  Talons. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage plus 7 (2d6) Thunder damage.
  Thunder Breath (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.
```

---

## sweep-2026-11-04T05-51-49#32 — Cragmute Exile

**Input:** `a stone giant exile who speaks only Giant and understands no Common`

```
Cragmute Exile
Huge giant, neutral
AC 14 (natural armor)   HP 161 (14d12 + 70)   Speed 40 ft.
STR 23  DEX 15  CON 20  INT 10  WIS 12  CHA 9
Skills Athletics +10, Perception +5
Saving Throws STR +10, CON +9
Senses darkvision 60 ft., passive Perception 15
Languages Giant
CR 9 (5,000 XP)   [2014 rules]

Actions
  Multiattack. The exile makes two attacks: one with its Stone Club and one with its Boulder. It can replace one attack with a use of Buckle Earth.
  Stone Club. Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.
  Boulder. Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage.
  Buckle Earth. One creature within 60 feet must succeed on a DC 18 Strength saving throw or be knocked prone.
```

---

## sweep-2026-11-04T05-51-49#33 — Suthra of the Still Breath

**Input:** `lizardfolk monk`

```
Suthra of the Still Breath
Medium humanoid, neutral
AC 13   HP 94 (21d8)   Speed 30 ft., climb 30 ft., swim 30 ft.
STR 16  DEX 15  CON 10  INT 12  WIS 14  CHA 16
Skills Athletics +6, Perception +5
Saving Throws STR +6, CON +3
Senses passive Perception 15
Languages Common plus one other language, Draconic
CR 5 (1,800 XP)   [2014 rules]

Traits
  Still Water. While Suthra has not taken damage since the end of its last turn, Suthra's speed increases by 15 feet and its movement does not provoke opportunity attacks.
  Hold Breath. Suthra can hold its breath for 15 minutes.
  Cunning Action (Bonus Action). Suthra takes the Dash, Disengage, or Hide action.
Actions
  Multiattack. Suthra makes two attacks: one with Unarmed Strike and one with Dart. It can replace one attack with a use of Limb Lock.
  Unarmed Strike. Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. Once on each of Suthra's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of Suthra's next turn.
  Dart. Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 11 (2d8 + 2) piercing damage.
  Limb Lock. One creature within 30 feet must make a DC 14 Strength saving throw. On a failed save, the target is pulled up to 20 feet straight toward Suthra by Suthra's locked limb and is grappled (escape DC 14).
```

---

## sweep-2026-11-04T05-51-49#34 — Krennik Skullstandard

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
  Skirmish Line. Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
  Mounted Agility (Bonus Action). Krennik takes the Dash or Disengage action.
  Rampage (1/Day) (Bonus Action). Immediately after dealing damage to a creature that is already below half its hit point maximum, Krennik moves up to half its Speed, and it makes one Skull Standard attack.
Actions
  Multiattack. Krennik makes two attacks: one with Skull Standard and one with Javelin.
  Skull Standard. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) bludgeoning damage and, if it is Medium or smaller, is knocked prone.
  Javelin. Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.
  Ride-Down (Recharge 5-6). Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each creature whose space it enters must make a DC 13 Dexterity saving throw, taking 24 (7d6) bludgeoning damage on a failed save, and the target is also knocked prone on a failed save.
```

---

## sweep-2026-11-04T05-51-49#35 — Well Brine Lurker

**Input:** `name: the thing in the well | `

```
Well Brine Lurker
Large Aberration, Neutral Evil
AC 14   HP 102 (12d10 + 36)   Speed 30 ft., Swim 30 ft.
STR 16  DEX 8  CON 16  INT 4  WIS 10  CHA 4
Skills Athletics +6, Perception +3
Senses darkvision 60 ft.; Passive Perception 13
Languages None
CR 5   [2024 rules]

Traits
  Well-Brine Body. While submerged, the brine lurker can breathe both air and water, and it has Advantage on Dexterity (Stealth) checks; it can also take the Hide action against creatures on the surface even in murky water.
Actions
  Multiattack. The brine lurker makes two Tentacle attacks. It can replace one attack with a use of Drowning Call.
  Tentacle. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.
  Drowning Call. Wisdom Saving Throw: DC 14, one creature within 60 feet that can see or hear the brine lurker. Failure: The target has the Charmed condition until the end of its next turn, and while Charmed this way, it must move toward the brine lurker by the safest available route on its turn.
Bonus Actions
  Swallow. The brine lurker swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the brine lurker, and takes 7 (2d6) Acid damage at the start of each of the brine lurker's turns. The brine lurker can have only one creature swallowed at a time. If the brine lurker takes 15 damage or more in a single turn from the swallowed creature, the brine lurker must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the brine lurker. If the brine lurker dies, a swallowed creature exits the body Prone by using 5 feet of movement.
```

---

## sweep-2026-11-04T05-51-49#36 — Oathbound Chainclimber

**Input:** ` | role: brute`

```
Oathbound Chainclimber
Medium Undead, Lawful Neutral
AC 14   HP 82 (11d8 + 33)   Speed 30 ft., Swim 30 ft., Climb 30 ft.
STR 18  DEX 8  CON 16  INT 6  WIS 10  CHA 4
Skills Athletics +6, Perception +2
Immunities Poison, Radiant; Exhaustion, Poisoned
Senses darkvision 60 ft.; Passive Perception 12
Languages the languages it knew in life
CR 4   [2024 rules]

Traits
  Spider Climb. The chainclimber can climb difficult surfaces, including along ceilings, without needing to make an ability check.
  Radiant Absorption. Whenever the chainclimber is subjected to Radiant damage, it takes no damage and instead regains a number of Hit Points equal to the Radiant damage dealt.
  Magic Resistance. The chainclimber has Advantage on saving throws against spells and other magical effects.
Actions
  Multiattack. The chainclimber makes two attacks, using Barbed Limb or Heavier Forelimb in any combination. It can replace one attack with a use of Brinkward Shove.
  Barbed Limb. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Slashing damage plus 6 (1d12) Radiant damage.
  Brinkward Shove. Strength Saving Throw: DC 13, each creature in a 15-foot Cone. Failure: The target is pushed up to 15 feet away from the chainclimber and has the Prone condition.
  Heavier Forelimb. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage, and the target has the Prone condition.
```

---

## sweep-2026-11-04T05-51-49#37 — Meshrin

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
  Multiattack. Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Rage-Rite Roar.
  Greataxe. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.
  Javelin. Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 18 (4d6 + 4) piercing damage. Immediately after the attack, a javelin returns to Meshrin's grasp, and the target's Speed is reduced by 10 feet until the start of Meshrin's next turn.
  Rage-Rite Roar. Each creature of Meshrin's choice in a 30-foot radius originating from Meshrin that can see or hear it must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

---

## sweep-2026-11-04T05-51-49#38 — Fallen Swordbearer

**Input:** `a skeleton with a greatsword`

```
Fallen Swordbearer
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
  Great Weapon Master. When the swordbearer hits a creature with its Greatsword, the attack deals an extra 3 damage.
Actions
  Multiattack. The swordbearer makes two attacks, using Greatsword or Shortbow in any combination. It can replace one attack with a use of Hew the Knees.
  Greatsword. Melee Attack Roll: +7, reach 5 ft. 21 (5d6 + 4) Slashing damage.
  Shortbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.
  Hew the Knees. Dexterity Saving Throw: DC 14, one creature within 10 feet. Failure: The target has the Prone condition.
```

---

## sweep-2026-11-04T05-51-49#39 — Kessa Varn

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`

```
Kessa Varn
Medium humanoid, neutral
AC 16 (studded leather, shield)   HP 112 (15d8 + 45)   Speed 30 ft.
STR 18  DEX 15  CON 16  INT 10  WIS 12  CHA 15
Skills Athletics +10, Performance +5
Saving Throws DEX +5, WIS +4
Senses passive Perception 11
Languages Common
CR 5 (1,800 XP)   [2014 rules]

Traits
  Riposte (Reaction). When a creature within 5 feet of Kessa misses it with a melee attack roll, Kessa makes one Handaxe attack against that creature.
Actions
  Multiattack. Kessa makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
  Handaxe. Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and Kessa has advantage on its next attack roll against the target before the end of its next turn. Until the end of Kessa's next turn, Kessa has advantage on attack rolls against the target, and the target can't take the Hide action.
  Shortsword. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage. Immediately after the attack, a handaxe returns to Kessa's grasp, and Kessa has advantage on its next attack roll against the target before the end of its next turn.
  Shield Bash. One creature within 5 feet that Kessa can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

---

## sweep-2026-11-04T05-51-49#40 — Brother Halric

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
  Multiattack. Halric makes two attacks: one with Mace and one with Radiant Flame. It can replace one attack with a use of Guilty Verdict.
  Spellcasting. Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
  Guilty Verdict. One creature within 60 feet must make a DC 13 Constitution saving throw. On a failed save, the target is blinded until the end of its next turn.
  Radiant Flame. Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
  Mace. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
```
