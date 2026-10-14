# The case for the critic — species rounds five to seven, the re-roll, the class kit (2026-10-14)

Everything in this branch landed after the last release and none of it has been
read by a critic. Three things to know before the blocks.

## 1. The measurement method changed, on the owner's call

The owner, today: the per-branch smoke "should always only test the features
we've developed since the last release… the generation is taking a lot of
needless time." So there is no fixed twelve in this run and no replay of the
species batch. Two batches were built for this branch and will die with it:

| batch | blocks | what each entry is for |
| --- | --- | --- |
| `classes-eight` | 16 | the eight classes, the print lifts, the five authored rows, the negative cases, two re-rolls |
| `branch-rounds` | 10 | the inline inversion, holds one/two/four, the species facts, the three repeat offenders, the mastery DC, one re-roll |
| canaries | 10 | the numbers reference, unchanged |

36 blocks where the old reading would have run 57. Every entry carries a `mech`
field naming the behaviour it exists to check, so a block that passes its gates
but misses its behaviour is still a miss.

## 2. The per-entry re-roll can now appear in a critic doc at all

Users said the re-roll "seems incredibly random as though it doesn't take the
whole creature into consideration." It was: the call saw the monster's name, its
CR, and the NAMES of its other entries — not the concept, not the header, not one
word of any sibling's rules, and no catalog. It is now catalog-first in one call,
with the whole creature in view (`REROLL-case-2026-10-13.md`).

But the re-roll is a card button, so no harness could show it. The smoke runner
now re-rolls a named entry and prints before, after, and provenance. **That paid
for itself on the first live block**: see §4.

## 3. What the blocks are expected to show

Nine of the ten `branch-rounds` behaviours are visible on the sheets:

| block | the behaviour, as it reads on the sheet |
| --- | --- |
| Bloodmaw Orc | the GM's Greataxe took the chassis slot; **no Shell Defense** from "retreats behind iron armor" |
| Sir Reginald | 2014 Multiattack reads "using Greatsword or Crossbow", never "one with … and one with" — flagged three times, now fixed |
| Sir Reginald | the phobia names **live chickens**, not "the thing it fears" |
| Coral Vurthax | the trident's Topple is **DC 15** = 8 + STR 4 + PB 3, and the derivation gate now reads mastery DCs |
| Yewshrine Warden | Shell Defense with **no speed-discord finding** — flagged three times, now fixed |
| Thornpiper Reveler | a **Fey** species gets its language: Common, Sylvan |
| Gloamripper | "lurks in shadow and steps away" buys **no teleport** |
| Stormwrought Oathkeeper | `inline declared: "the oathkeeper" — the call's own answer; the rules would have said "Stormwrought"` |
| Stormwrought Oathkeeper | a **stomp** deals Bludgeoning and **venom** deals Poison, never the weapon's type |
| Meshrin | the Name field speaks as **Meshrin**, never "the meshrin" |

The tenth, the cold-wyrm swallow interior, is **not exercised**: that roll took a
Bite-and-Breath line rather than the engulf line, so no Swallow row exists to
inspect. Every damage type on that sheet is Cold. The fix is pinned in tests only.

The class traces read as designed across all sixteen: the monk's Stunning Strike
rode a part row the GM's own words named ("Open Hand"); an **imp** rogue got
Cunning Action, which is eligibility by mind rather than type; "knight-errant"
resolved to paladin over fighter; and the dire wolf and the ninja drew no class
line at all, which is the bestial refusal and the implied-class rule.

## 4. What the live blocks found that no unit test had reached

Five defects, all fixed in this branch, each with its receipt:

1. **The re-roll re-picked the template it was replacing.** Re-rolling a rogue's
   Assassinate returned `assassinate` again under a new name. The same-name check
   catches a repeated name, never a repeated mechanic. The replaced row's template
   now leaves the menu. After: Assassinate → "Bloodhound Pursuit" from
   `faultless-tracker`.
2. **A trait was climbing the value ladder**, which appended a save row's
   "Success: Half damage only" to a trait and shipped a dangling `*Success:* H`.
   The signature path has always exempted traits and riders; the re-roll now does.
3. **A rewrite re-diced the row it was only rewording.** An Oathblade rewrite came
   back 25 (6d6 + 4) where the row read 26 (5d8 + 4): the skeletons hand the model
   the budget for a NEW row. A row being reworded keeps its own numbers.
4. **`entryRows` dropped the catalog provenance** it reads off a saved sheet, so
   the exclusion in (1) had nothing to match on. Found by writing the pin for (1).
5. **A re-roll probe aimed at Multiattack** told us nothing, because that name is
   structural and protected, so the call rewrote text under the same name. Both
   batches now exclude Multiattack and Spellcasting from a re-roll probe.

## 5. For the critic's eye — not fixed, deliberately

- **The cleric's lifts depend on a routing decision upstream.** Divine Aid was
  refused on both priest blocks because neither sheet got a Spellcasting row: the
  route gave "a templar priest of the dawn who blesses her soldiers" a non-caster
  body. The guard is right (print's row says "using the same spellcasting ability
  as Spellcasting"), but a GM who types "priest" and gets no magic gets no cleric
  features either.
- **Free text can still invent an unpriced extra attack.** The Oathblade rewrite
  added "On a hit or miss, the oathkeeper can spit venom at the same target using
  Venom Spit" — a free extra attack on every hit AND miss, referencing a real row,
  which passed the lint. The catalog path cannot do this; the free-text floor can.
  Constraining it is a judgement about how tight to make the floor.
- **A rider weld capitalises mid-sentence.** Meshrin reads "When Meshrin hits a
  creature with its Hooked Chain, If the target is a Large or smaller creature…".
- **One dangling reference, soft:** the Rime-Scaled Wyrm's Multiattack uses
  "Gorge", which is not a row on that sheet.
- **`ko-at-will` on the monk's Open Hand is expected.** The checker's own words:
  "Stunned at will, single target with a repeat save or a one-turn cap (the
  Ghoul's shape)". My frame is print's Ghoul exactly — single target, one-turn
  cap, once per turn. Soft, informational, not a defect.

## 6. Gates

```
classes-eight   16/16 blocks, 0 FAIL, 3 soft, coverage 90% (2 of 20 clauses), concept share 64%
branch-rounds   10/10 blocks, 0 FAIL, 2 soft, coverage 100% (0 of 13 clauses), concept share 69%
soft rules seen band ×4, ko-at-will ×2, multiattack-integrity ×2, reach ×2
full suite      185 suites, 5,300+ tests; npm run build clean
```

The forty is not in this run: it is the close-out gate and this branch is not at
close-out. The species nineteen is not in this run either — it measured the last
release's feature, and re-running it is the waste the owner named.

---

# 2024 blocks

## Review batch — classes-eight-2026-10-14T14-11-05

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Rruzhk of the Nerve-Map | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Vespera Vaunt | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sergeant Aldric Vane | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Korvath the Ragebound | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Iron Templar | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Crown's Echo | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Lady Merivane | 8 | 2024 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 3/3 | 4/7 |
| Smokeveil | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 0/7 |
| Timberline Pack | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Skelkey Imp | 4 | 2024 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 3/3 |
| Maze-Hunger Minotaur | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Oathbroken Vigil | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Sable Whisker | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/5 |

**Dropped 2 of 20 user clauses** (coverage 90%); concept share 64% (48/75 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Timberline Pack — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Timberline Pack | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Timberline Pack

Medium Beast, Unaligned

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 50 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+5
WIS
12
+1
+1
MOD
SAVE
CON
13
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Wolfpack Cunning. The pack ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The pack makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Bonus Actions

Fleet Agility. The pack takes the Dash or Disengage action.

Pack Ambush (2/Day). The pack has Advantage on the next attack roll it makes before the end of its turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] skirmisher type=Beast mechanics=none — skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: pack-hunting flank strikes [behavior] | shaggy winter hide [body] | the pack's spreading encirclement [aura]
[reskin] signature idea (action): "When the pack strikes prey that another of its family is already threatening, it lunges at the distracted flank and tears deep, then slips back into the brush with the meat still in its jaws. The wound keeps bleeding into the snow, and any ally the target was guarding feels the loss of that attention." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] signature miss: action — "When the pack strikes prey that another of its family is already threatening, it lunges at the distracted flank and tears deep, then slips back into the brush with the meat still in its jaws. The wound keeps bleeding into the snow, and any ally the target was guarding feels the loss of that attention." [rider/on_hit/damage] — the model found no template that holds it (offered: focus)
[reskin] value check: "Predatory Focus (2/Day)" EV 2 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its shaggy winter hide sheds the bite of the cold and clings to the stink of the den, so nothing in the timber mistakes it for stray. The pack closes on prey without being noticed until it is already surrounded." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] signature miss: trait — "Its shaggy winter hide sheds the bite of the cold and clings to the stink of the den, so nothing in the timber mistakes it for stray. The pack closes on prey without being noticed until it is already surrounded." [trait/always/defense] — the model found no template that holds it (offered: faultless-tracker)
```


---


### Lady Merivane — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Lady Merivane | 8 | caster-2-warpriest | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6 (print at 8 reads 2–10.5, n=24)
- read: def 4 / off 8 → 6; sustained 54 (2 × Greatsword); nova none; dmg 54

```
Lady Merivane

Medium Humanoid, Lawful Good

AC 15
Initiative +0 (10)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
11
+0
+0
MOD
SAVE
DEX
10
+0
+0
WIS
20
+5
+8
MOD
SAVE
CON
16
+3
+3
CHA
13
+1
+1

Skills Perception +8, Religion +6

Senses darkvision 60 ft.; Passive Perception 18

Languages Celestial, Common

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Lady Merivane, Lady Merivane and its allies have Advantage on attack rolls and saving throws, provided Lady Merivane doesn't have the Incapacitated condition.

Actions

Multiattack. Lady Merivane makes two attacks, using Greatsword, Bolt or Smite the Unclean in any combination. It can replace one attack with a use of Spellcasting to cast Guiding Bolt.

Greatsword. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Bolt. Ranged Attack Roll: +8, range 80/320 ft. 23 (4d8 + 5) Piercing damage.

Spellcasting. Lady Merivane casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Guiding Bolt, Light, Detect Magic, Dispel Magic

Smite the Unclean. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Radiant damage.

Bonus Actions

Lay on Hands (2/Day). Lady Merivane touches a creature within 5 feet of itself and restores 27 (6d8) Hit Points to it.

Mending Aegis (2/Day). Each ally within 30 feet of Lady Merivane gains 14 (4d6) Temporary Hit Points.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("mends her soldiers") | defender-leader -> caster-warpriest: the concept's VERB outranks the noun (key "smites", class verb) | caster-warpriest: key "smites" (class verb)
[concept] signature elements: divine smite against the unclean [behavior] | healing prayers for soldiers [behavior] | consecrated iron armor and blade [object]
[reskin] signature idea (action): "When Lady Merivane strikes a deeply corrupted or unholy creature with her greatsword, she can immediately call down a flash of consecrated judgment upon it. This is an attack that adds a searing burst of radiant damage to the strike, and the force of the blow also staggers the foe, making it less able to defend itself until the end of its next turn." [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rally
[reskin] value check: "Mending Aegis (2/Day)" EV 7.7 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Mending Aegis (2/Day)" ("The concept's own verb is mend, and the creature mends her soldiers — healing he [verb: mend:concept]")
[reskin] signature idea (trait): "Lady Merivane's armor and blade were consecrated in rites of binding oath, and they remain charged with that holy purpose. Whenever she moves to engage a corrupted or unholy enemy, her aura of authority flares brighter for a moment, and her own attacks against such foes carry an extra sting of divine wrath." [trait/always/defense] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — warded-mending (mend, mends, mending)
[reskin] signature miss: trait — "Lady Merivane's armor and blade were consecrated in rites of binding oath, and they remain charged with that holy purpose. Whenever she moves to engage a corrupted or unholy enemy, her aura of authority flares brighter for a moment, and her own attacks against such foes carry an extra sting of divine wrath." [trait/always/defense] — the model found no template that holds it (offered: warded-mending)
```


---


### Rruzhk of the Nerve-Map — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rruzhk of the Nerve-Map | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Hand: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Hand); nova none; dmg 34

```
Rruzhk of the Nerve-Map

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+6
WIS
12
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
8
-1
-1

Skills Perception +4, Stealth +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Hold Breath. Rruzhk can hold its breath for 15 minutes.

Reedstep. Rruzhk ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Rruzhk makes two attacks, using Open Hand or Stone in any combination.

Open Hand. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of Rruzhk's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Rruzhk's next turn. Once on each of Rruzhk's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of Rruzhk's next turn.

Stone. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Bludgeoning damage.

Bonus Actions

Fleet Agility. Rruzhk takes the Dash or Disengage action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("strikes pressure points with an open han") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: pressure-point strikes that disable limbs and joints [behavior] | open-hand martial arts [behavior] | lizardfolk scale-hide [body]
[reskin] signature idea (action): "Rruzhk studies the flow of life in its foes. By striking a precise nerve cluster with an open hand, it can invert the target's senses: for a short while the victim's own allies look like enemies and its own limbs feel foreign. The confusion lasts until the victim shakes it off, and Rruzhk cannot use this again until it has landed a few ordinary pressure-point strikes to re-map the body's lines." [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — stunning-strike (pressure point, open hand, monk)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into stunning-strike
[reskin] signature rider: stunning-strike -> Open Hand (appended; The idea is an open-hand monk strike that hits pressure points to stun, which is [verb: pressure point:concept, open hand:concept, monk:concept, nerve:idea])
[reskin] signature idea (trait): "Rruzhk's scales are tattooed with a living nerve-map that tingles when violence is near. When a creature it can see makes an attack against it, Rruzhk instinctively shifts along the map, gaining a brief edge in evasion that fades if the same foe presses the attack." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Rruzhk's scales are tattooed with a living nerve-map that tingles when violence is near. When a creature it can see makes an attack against it, Rruzhk instinctively shifts along the map, gaining a brief edge in evasion that fades if the same foe presses the attack." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, evasion)
```


---


### Vespera Vaunt — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vespera Vaunt | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Vespera Vaunt

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 90 (20d8)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
12
+1
+1
MOD
SAVE
DEX
16
+3
+6
WIS
14
+2
+2
MOD
SAVE
CON
10
+0
+0
CHA
16
+3
+3

Skills Perception +5, Stealth +9

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language, Infernal

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, Vespera has Advantage on attack rolls against any creature that hasn't taken a turn. If Vespera hits a creature during that round, the target takes an extra 9 (2d8) Bludgeoning damage.

Rooftop Stalker. Vespera ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Vespera makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Vespera takes the Dash, Disengage, or Hide action.

Rooftop Stalk (2/Day). Vespera has Advantage on the next attack roll it makes before the end of its turn.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("stalks the rooftops") | skirmisher-skulker: key "stalks" (class verb)
[concept] signature elements: rooftop stalking and ambush [behavior] | fiendish tiefling bloodline [body] | poisoned blades and bolts [object]
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] signature idea (action): "Vespera whispers a gutter curse at one enemy who can see or hear it within a short span, planting a seed of doubt in their mind. The next time Vespera damages that enemy, the wound refuses to close and they grow weaker until they spend precious time patching themselves up or call on magic to purge the hex." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into focus
[reskin] value check: "Rooftop Stalk (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: focus -> Bonus Actions/"Rooftop Stalk (2/Day)" ("The idea centers on the verb 'stalk' — a tiefling rogue who stalks the rooftops  [verb: stalk:concept]")
[reskin] signature idea (trait): "Vespera's blades and bolts carry a slow rooftop toxin distilled from gutter herbs. Whenever a poisoned blade or bolt harms a creature, the poison keeps working, weakening their movements and dulling their reflexes until someone shakes off the creeping numbness." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] signature miss: trait — "Vespera's blades and bolts carry a slow rooftop toxin distilled from gutter herbs. Whenever a poisoned blade or bolt harms a creature, the poison keeps working, weakening their movements and dulling their reflexes until someone shakes off the creeping numbness." [trait/always/condition] — the model found no template that holds it (offered: faultless-tracker)
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Horns" -> "Shortsword" — the Spy's own row
```


---


### Skelkey Imp — one marked soft

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Skelkey Imp | 4 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 30 (2 × Shortsword); nova none; dmg 30

```
Skelkey Imp

Tiny Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 67 (27d4)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
12
+1
+1
MOD
SAVE
DEX
18
+4
+6
WIS
14
+2
+2
MOD
SAVE
CON
10
+0
+0
CHA
16
+3
+3

Skills Perception +4, Stealth +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common plus one other language, Infernal

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The skelkey imp makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Slashing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 13 (2d8 + 4) Piercing damage.

Bonus Actions

Cunning Action. The skelkey imp takes the Dash, Disengage, or Hide action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] skirmisher-skulker type=Fiend mechanics=none — skirmisher-skulker: ✓ ("an imp rogue who picks locks") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: lockpicking for a devil master [behavior] | infernal lockpicking tools [object] | winged skirmisher [body]
[reskin] print canon route: the Spy's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 10, DEX 18, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Spy — print's rows ride along; the seat stays
[reskin] signature idea (action): "The Skelkey Imp jams its infernal lockpicks into a lock, mechanism, or similar device and wrenches it open or shut. Any creature that was relying on that device to stay safe, contained, or trapped is caught off guard and left badly exposed." [action/always/condition] — menu: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature miss: action — "The Skelkey Imp jams its infernal lockpicks into a lock, mechanism, or similar device and wrenches it open or shut. Any creature that was relying on that device to stay safe, contained, or trapped is caught off guard and left badly exposed." [action/always/condition] — the model found no template that holds it (offered: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, riposte)
[reskin] value check: "Driving Bellow (2/Day)" EV 5.5 vs floor 23.7 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Because its picks are forged from infernal materials and carry a spark of hellfire, any lock or mechanism it touches is quietly compromised. Locks click open at a whisper of effort, and those who later inspect or depend on such locks find them unreliable." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Because its picks are forged from infernal materials and carry a spark of hellfire, any lock or mechanism it touches is quietly compromised. Locks click open at a whisper of effort, and those who later inspect or depend on such locks find them unreliable." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
[reskin] print canon modes: fly off — the Spy has no such mode and the words name none
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Spy's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Fiend -> Humanoid — the Spy's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon languages: "Infernal, understands Common but can't speak" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon speed: 40 ft. -> 30 ft. — the Spy's walk; the concept's other modes stay
[reskin] print canon attack: "Pick" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Lockpick" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Winged Cunning" is the seat's, not the Spy's
[reskin] print canon row: Bonus Actions/Cunning Action — the Spy's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Nimble Escape" yields to the Spy's Cunning Action
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Spy's Cunning Action
```


---


### Dame Oriel — in the run

**Concept:** name: Dame Oriel | a knight who holds the line with a shield and a longsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Dame Oriel

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 78 (12d8 + 24)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+6
INT
11
+0
+0
MOD
SAVE
DEX
12
+1
+1
WIS
13
+1
+1
MOD
SAVE
CON
14
+2
+5
CHA
14
+2
+2

Skills Athletics +6, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Guarded Stance. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Bonus Actions

Shielding Stance (2/Day). Each ally within 30 feet of Dame Oriel gains 9 (2d8) Temporary Hit Points.

Reactions

Riposte. Trigger: A creature within 5 feet of Dame Oriel misses it with a melee attack roll. Response: Dame Oriel makes one Longsword attack against that creature.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("keeps the line with a shield and a longs") | defender: key "keeps the line" (class verb)
[concept] signature elements: shield wall that punishes those who move past [behavior] | longsword and shield [object] | unbreakable iron oath [aura]
[reskin] signature idea (action): "Dame Oriel slams her shield forward in a shove that forces nearby foes back a step and makes the ground before her a wall they cannot cross except at their peril. Until the start of her next turn, any enemy that tries to move through or past her is punished with a longsword thrust, as though her discipline itself strikes them down." [action/always/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rally
[reskin] value check: "Shielding Stance (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Shielding Stance (2/Day)" ("the idea's central verb is shield — intercepting blows meant for allies is the s [verb: shield:concept]")
[reskin] signature idea (trait): "When Dame Oriel hits a creature with her longsword, her …'s weight presses the wound, making it harder for that enemy to wound her allies. The next time that creature attacks someone other than her before the end of its next turn, it does so at a disadvantage, for her discipline demands it face her alone." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "When Dame Oriel hits a creature with her longsword, her …'s weight presses the wound, making it harder for that enemy to wound her allies. The next time that creature attacks someone other than her before the end of its next turn, it does so at a disadvantage, for her discipline demands it face her alone." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
```


---


### Korvath the Ragebound — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Korvath the Ragebound | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Korvath the Ragebound

Medium Humanoid, Chaotic Neutral

AC 15
Initiative -1 (9)

HP 150 (20d8 + 60)

Speed 40 ft.

MOD
SAVE
STR
20
+5
+8
INT
6
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
10
+0
+0
MOD
SAVE
CON
16
+3
+6
CHA
6
-2
-2

Skills Athletics +8, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Korvath starts its turn Bloodied, roll 1d6. On a 6, Korvath goes berserk. On each of its turns while berserk, Korvath attacks the nearest creature it can see. If no creature is near enough to move to and attack, Korvath attacks an object. Once Korvath goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Korvath has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Korvath extra movement, and Korvath can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Korvath makes two attacks, using Greataxe or Thrown Hammer in any combination.

Greataxe. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Slashing damage.

Thrown Hammer. Ranged Attack Roll: +8, range 20/60 ft. 23 (4d8 + 5) Bludgeoning damage.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Korvath moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] brute type=Giant mechanics=none — brute: ✓ ("a goliath berserker who loses control wh") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: wounded fury [behavior] | reckless greataxe attacks [behavior] | stone-skinned hide [body]
[reskin] signature idea (action): "Korvath slams his open hand against a fresh wound, then roars — the sight of his own blood sends a wave of fury through allies who share his pain. Any ally who can see or hear him is swept up in the rage, fighting harder for a moment. Korvath himself can do this only when he is already wounded." [action/once_per_fight/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into rampage, affliction
[reskin] signature miss: action — "Korvath slams his open hand against a fresh wound, then roars — the sight of his own blood sends a wave of fury through allies who share his pain. Any ally who can see or hear him is swept up in the rage, fighting harder for a moment. Korvath himself can do this only when he is already wounded." [action/once_per_fight/damage] — the model found no template that holds it (offered: rampage, affliction)
[reskin] value check: "Rampage (1/Day)" EV 22.8 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Korvath's rock-veined hide makes him impossible to ignore in a brawl: any enemy who tries to slip past him feels the weight of his presence and must choose between facing him or being crushed. His sheer bulk and stone skin turn every near miss into a hard shove." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] signature miss: trait — "Korvath's rock-veined hide makes him impossible to ignore in a brawl: any enemy who tries to slip past him feels the weight of his presence and must choose between facing him or being crushed. His sheer bulk and stone skin turn every near miss into a hard shove." [trait/always/movement] — the model found no template that holds it (offered: bloodied-fury, bloodied-burst)
```


---


### Vareth Solmane — in the run

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 8 → 6; sustained 54 (2 × Mace); nova none; dmg 54

```
Vareth Solmane

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 104 (19d8 + 19)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
13
+1
+1
MOD
SAVE
DEX
18
+4
+7
WIS
16
+3
+3
MOD
SAVE
CON
12
+1
+1
CHA
13
+1
+1

Skills Perception +6, Stealth +7

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vareth makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +7, range 60 ft. 17 (3d8 + 4) Radiant damage.

Spellcasting. Vareth casts one of the following spells, using Wisdom as the spellcasting ability:

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Divine Aid (3/Day). Vareth casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — caster-warpriest: ✓ ("blesses her soldiers") | caster-warpriest: key "blesses" (class verb)
[concept] signature elements: blessing her soldiers before battle [behavior] | radiant mace strikes [object] | armor of the dawn [body]
[reskin] print canon route: the Priest is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 16, DEX 18, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, DEX fitted to +7
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] signature idea (action): "She plants her banner in the ground. The banner radiates a daylight-hued glow that marks the spot as holy ground. While she holds concentration, her blessed soldiers within the glow of the banner fight with renewed certainty: their attacks chip away at foes more surely, and when a blessed soldier falls, the banner flares and steadies the nearest standing faithful, letting them shrug off a moment o" [action/once_per_fight/resource] — menu: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature miss: action — "She plants her banner in the ground. The banner radiates a daylight-hued glow that marks the spot as holy ground. While she holds concentration, her blessed soldiers within the glow of the banner fight with renewed certainty: their attacks chip away at foes more surely, and when a blessed soldier falls, the banner flares and steadies the nearest standing faithful, letting them shrug off a moment o" [action/once_per_fight/resource] — the model found no template that holds it (offered: trample, leap, thrown-burst, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, aggro-curse, bolt-mark)
[reskin] value check: "Sundering Shove" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Her mace carries the dawn's warmth. Each strike she lands leaves a lingering ember of holy light on the target, and whenever a blessed ally hits that same foe, the ember flares and adds a sting of radiant pain." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Her mace carries the dawn's warmth. Each strike she lands leaves a lingering ember of holy light on the target, and whenever a blessed ally hits that same foe, the ember flares and adds a sting of radiant pain." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Sling" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Stride" is the seat's, not the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Priest's Divine Aid (3/Day)
```


---


### Iron Templar — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Templar | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Iron Templar

Medium Humanoid, Neutral

AC 19
Initiative +0 (10)

HP 66 (12d8 + 12)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+5
MOD
SAVE
CON
12
+1
+3
CHA
13
+1
+1

Skills Athletics +6, Perception +5

Senses blindsight 10 ft. (blind beyond this radius); Passive Perception 15

Languages Common plus one other language

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The templar makes two Mace attacks. It can replace one attack with a use of Creeping Dread.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.

Radiant Flame. Ranged Attack Roll: +6, range 60 ft. 13 (2d8 + 4) Radiant damage.

Creeping Dread. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the templar's next turn. If the target was already Frightened by this ability, it also takes 14 (4d6) Piercing damage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a templar priest with a mace and no magi") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] signature elements: grinding attrition warfare [behavior] | unyielding shield-lock defense [object] | hollow consecrated iron plate [body]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] signature idea (action): "The Iron Templar drives its mace down in a slow, crushing overhead blow that rings through armor and bone. A foe struck this way has its wind and footing knocked loose, so until it can collect itself every step it takes is a struggle that leaves it open to the templar's next swing. The templar simply grinds such foes down, one concussive blow at a time." [rider/on_hit/condition] — menu: charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] signature miss: action — "The Iron Templar drives its mace down in a slow, crushing overhead blow that rings through armor and bone. A foe struck this way has its wind and footing knocked loose, so until it can collect itself every step it takes is a struggle that leaves it open to the templar's next swing. The templar simply grinds such foes down, one concussive blow at a time." [rider/on_hit/condition] — the model found no template that holds it (offered: charge-push, hook-rider, slow-bolt, disarm, push-prone, herd, wind-up, riposte)
[reskin] value check: "Creeping Dread" EV 9.6 vs floor 7.3 (one attack of 2) — dice 7 → 14
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "When the templar plants its shield, the ground around it becomes a locked doorway: foes within its reach cannot slip past without offering a clear opening, and any that try are met with a punishing shield-bash. It never willingly gives up that planted stance, grinding down anyone who stays in the doorway with it." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — uncanny-sense (magic)
[reskin] signature miss: trait — "When the templar plants its shield, the ground around it becomes a locked doorway: foes within its reach cannot slip past without offering a clear opening, and any that try are met with a punishing shield-bash. It never willingly gives up that planted stance, grinding down anyone who stays in the doorway with it." [trait/always/defense] — the model found no template that holds it (offered: uncanny-sense)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Hurlbrand" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
audit finding below confidence gate: Creeping Dread The generic entry name does not reflect the Iron Templar's divine-judgment concept, making it read as a stock placeholder rather than the templar's signature smite.
```


---


### Crown's Echo — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Crown's Echo | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Forceful Staff); nova none; dmg 36

```
Crown's Echo

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 81 (18d8)

Speed 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
17
+3
+6
MOD
SAVE
DEX
14
+2
+2
WIS
12
+1
+4
MOD
SAVE
CON
11
+0
+0
CHA
11
+0
+0

Skills Arcana +6, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common and any three languages, Elvish, Sylvan

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The echo makes three Forceful Staff attacks.

Forceful Staff. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Spellcasting. The echo casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Reactions

Protective Magic (3/Day). Trigger: The echo is hit by an attack roll. Response: The echo casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=teleport — skirmisher-skulker: ✓ ("never where you struck and steps away") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: never where the blow lands—steps aside through the Weave [behavior] | a court wizard in silks, forever mid-bow [body] | the echo of a chuckle as he vanishes [aura]
[reskin] print canon route: the Mage's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from skirmisher, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] signature idea (action): "As a parting courtesy, the echo bows to a chosen enemy it can see and then steps through the Weave a short distance." [action/always/movement] — menu: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] value check: "Courteous Step (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: phase-slip -> Bonus Actions/"Courteous Step (2/Day)" ("The echo bows and steps through the Weave a short distance — a teleporting step  [verb: step:concept]")
[reskin] signature idea (trait): "Once per fight, when badly wounded, the echo vanishes through the Weave. It reappears somewhere outside the reach of its pursuers, leaving behind only its chuckle and the smell of scorched parchment." [trait/always/movement] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Once per fight, when badly wounded, the echo vanishes through the Weave. It reappears somewhere outside the reach of its pursuers, leaving behind only its chuckle and the smell of scorched parchment." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Elvish, Sylvan" -> "Common and any three languages, Elvish, Sylvan" — the Mage's plus the concept's Elvish, Sylvan
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---


### Smokeveil — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Smokeveil | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Tanto); nova none; dmg 34

```
Smokeveil

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+6
WIS
12
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
8
-1
-1

Skills Perception +4, Stealth +9

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Evasion. If the smokeveil is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the smokeveil instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, the smokeveil has Advantage on attack rolls against any creature that hasn't taken a turn. If the smokeveil hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Umbral Stride. The smokeveil ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The smokeveil makes two attacks, using Tanto or Shuriken in any combination.

Tanto. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shuriken. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The smokeveil takes the Dash, Disengage, or Hide action.

Ashen Withdrawal (1/Day). The smokeveil casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("strikes unseen") | skirmisher-skulker: key "unseen" (class verb)
[concept] signature elements: strikes unseen from shadow [behavior] | shadow-step teleportation [behavior] | body made of living shadow [body]
[reskin] signature idea (action): "The smokeveil reaches through the target's own shadow — a length of living darkness lashed to its victim at the moment it is first struck unseen. From then on, that one creature always has the smokeveil's marker on it: whenever the smokeveil is hidden from it, the smokeveil can strike at it once from any shadow within sight as if it were standing right there, and the blow lands carrying the wound " [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into self-invisibility
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Vanish (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The smokeveil's body is a garment of living shadow, so it never truly fills a space — even when spotted, it stands half-elsewhere, and anyone who strikes at it grapples smoke. While it is unseen by its attacker, every blow against it slides off into the dark; the moment it is plainly seen, it becomes as solid and as fragile as the mortal it once was." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] signature miss: trait — "The smokeveil's body is a garment of living shadow, so it never truly fills a space — even when spotted, it stands half-elsewhere, and anyone who strikes at it grapples smoke. While it is unseen by its attacker, every blow against it slides off into the dark; the moment it is plainly seen, it becomes as solid and as fragile as the mortal it once was." [trait/on_being_hit/defense] — the model found no template that holds it (offered: assassinate)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
```


---


### Maze-Hunger Minotaur — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Maze-Hunger Minotaur | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Greataxe); nova none; dmg 44

```
Maze-Hunger Minotaur

Large Monstrosity, Neutral

AC 14
Initiative -1 (9)

HP 119 (14d10 + 42)

Speed 40 ft.

MOD
SAVE
STR
18
+4
+7
INT
6
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
10
+0
+0
MOD
SAVE
CON
16
+3
+6
CHA
6
-2
-2

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Bloodied Frenzy. While Bloodied, the minotaur has Advantage on attack rolls and saving throws.

Actions

Multiattack. The minotaur makes two Greataxe attacks.

Greataxe. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Bonus Actions

Charge. The minotaur moves up to half its Speed straight toward an enemy it can see.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the minotaur moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

Labyrinth Rebuke. One creature within 5 feet that hit the minotaur with an attack roll since the end of the minotaur's last turn takes 7 (2d6) Bludgeoning damage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] brute type=Monstrosity mechanics=none — brute-charger: ✓ ("herds prey") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] signature elements: herding prey into the maze [behavior] | labyrinthine cunning [behavior] | massive horns and axe [body]
[reskin] signature idea (action): "The minotaur sweeps its horns in a brutal arc, forcing caught prey to stumble away in a direction it chooses. Instead of harming them, it drives them along the path it wants, tightening the noose of the maze." [bonus_action/save/movement] — menu: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into herd
[reskin] signature miss: action — "The minotaur sweeps its horns in a brutal arc, forcing caught prey to stumble away in a direction it chooses. Instead of harming them, it drives them along the path it wants, tightening the noose of the maze." [bonus_action/save/movement] — the model found no template that holds it (offered: herd)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its massive horns and axe are extensions of the maze's hunger, and when blood is drawn, the labyrinth itself seems to reach out to hinder the wounded. Those it strikes find their steps heavy and their escape slowed." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "Its massive horns and axe are extensions of the maze's hunger, and when blood is drawn, the labyrinth itself seems to reach out to hinder the wounded. Those it strikes find their steps heavy and their escape slowed." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst)
```


---


### Oathbroken Vigil — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Oathbroken Vigil | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Shield); nova none; dmg 52

```
Oathbroken Vigil

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 104 (16d8 + 32)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
11
+0
+0
MOD
SAVE
DEX
12
+1
+1
WIS
13
+1
+1
MOD
SAVE
CON
15
+2
+5
CHA
14
+2
+2

Skills Athletics +7, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the vigil, the vigil and its allies have Advantage on attack rolls and saving throws, provided the vigil doesn't have the Incapacitated condition.

Actions

Multiattack. The vigil makes two attacks, using Shield or Sword in any combination.

Shield. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Sword. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the vigil gains 13 (3d8) Temporary Hit Points.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] signature elements: shielding the weak with iron bulwark [behavior] | fall of a knightly order [aura] | broken longsword and shield [object]
[reskin] signature idea (action): "The Vigil plants its shield and calls out a formal challenge to every enemy that can see or hear it, demanding they face it or be broken for turning away. Any foe that ignores the challenge and tries to move past the Vigil toward its allies instead eats a punishing shield-first charge that slams them to a halt and leaves them reeling." [action/once_per_fight/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] signature bound by force: action — "rally" matches shield+orders in the user's words; the model's none is overruled
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Bolstering Cry (2/Day)" ("exact concept match [verb: shield:concept, orders:concept]")
[reskin] signature idea (trait): "When a creature the Vigil can see within reach is hit by an attack, the Vigil can throw itself into the blow, taking the damage onto its own … and body. The attacker's strike lands on the Vigil instead, and the Vigil's grim stubbornness means it will keep doing this as long as it draws breath, never letting the weak fall while it still stands." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "When a creature the Vigil can see within reach is hit by an attack, the Vigil can throw itself into the blow, taking the damage onto its own … and body. The attacker's strike lands on the Vigil instead, and the Vigil's grim stubbornness means it will keep doing this as long as it draws breath, never letting the weak fall while it still stands." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance)
```


---


### Sable Whisker — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sable Whisker | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24

```
Sable Whisker

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+5
WIS
12
+1
+1
MOD
SAVE
CON
13
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +7

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 3 (XP 700; PB +2)

Traits

Crowdstep. Sable ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. Sable makes two attacks, using Dagger or Sling in any combination.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Sling. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Bludgeoning damage.

Bonus Actions

Cunning Action. Sable takes the Dash, Disengage, or Hide action.

Slip the Crowd. Sable takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("slips through the market crowd") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: slips through the market crowd [behavior] | cutpurse's blade [object] | shadow-wrapped escape [aura]
[reskin] signature idea (action): "Sable Whisker makes a knifing attack aimed at an exposed place—a purse string, a belt pouch, a shield strap—cutting it loose rather than drawing blood. The target must be carrying something vulnerable in that moment, and if the cut lands, the thing falls away clattering across the cobbles. In a packed market crowd, that can spill coins, rip a weapon from a loosened sheath, or send a potion rolling" [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into feint-slip
[reskin] value check: "Slip the Crowd" EV 5.9 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] signature template: feint-slip -> Bonus Actions/"Slip the Crowd" ("slips through the crowd — taking Disengage to weave away and leaving attackers o [verb: slip:concept]")
[reskin] signature idea (trait): "Anyone who reaches into a crowd to grab Sable or strike it must first find it among the bodies and the press—and when they swing, a bystander or a stall or another shopper is as likely to take the blow. Sable is never truly alone while a crowd is nearby; it slips through, and the crowd itself becomes its armor." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Anyone who reaches into a crowd to grab Sable or strike it must first find it among the bodies and the press—and when they swing, a bystander or a stall or another shopper is as likely to take the blow. Sable is never truly alone while a crowd is nearby; it slips through, and the crowd itself becomes its armor." [trait/always/defense] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
```


---

## Review batch — branch-rounds-2026-10-14T14-17-49

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloodmaw Orc | 8 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/7 |
| Crookbound Herdmaster | 5 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sir Reginald Pemberton-Hughes | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Coral Vurthax | 5 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Rime-Scaled Wyrm | 9 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | SOFT: multiattack-integrity | soft (1) | 1/1 | 3/4 |
| Yewshrine Warden | 3 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/4 |
| Thornpiper Reveler | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/6 |
| Gloamripper | 2 (2014) | 2014 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/7 |
| Stormwrought Oathkeeper | 7 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/6 |
| Meshrin | 6 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 0 of 13 user clauses** (coverage 100%); concept share 69% (36/52 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Rime-Scaled Wyrm — highest CR

**Concept:** a rime-scaled wyrm that swallows sailors whole

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Rime-Scaled Wyrm | 9 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | SOFT: multiattack-integrity |

- reader · soft · multiattack-integrity: Multiattack uses "Gorge", which is not a row on this sheet
- read: def 6 / off 11 → 8.5; sustained 54 (3 × Bite); nova Rime Breath 49; dmg 69

```
Rime-Scaled Wyrm

Huge Dragon, Neutral Evil

AC 18
Initiative +1 (11)

HP 136 (13d12 + 52)

Speed 40 ft., Fly 80 ft., Swim 40 ft.

MOD
SAVE
STR
18
+4
+4
INT
14
+2
+2
MOD
SAVE
DEX
12
+1
+5
WIS
12
+1
+5
MOD
SAVE
CON
18
+4
+4
CHA
16
+3
+3

Skills Perception +5, Stealth +5

Immunities Cold

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 15

Languages Draconic

CR 9 (XP 5,000; PB +4)

Traits

Rime Shock. A creature that touches the rime-scaled wyrm or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Cold damage.

Actions

Multiattack. The rime-scaled wyrm makes three Bite attacks. It can replace one attack with a use of Gorge and Glut.

Bite. Melee Attack Roll: +8, reach 10 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Cold damage.

Rime Breath (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 30-foot Cone. Failure: 49 (14d6) Cold damage. Success: Half damage.

Gorge and Glut. Dexterity Saving Throw: DC 15, one Medium or smaller creature within 5 feet that the rime-scaled wyrm hit with a melee attack this turn. Failure: 18 (4d8) Cold damage, and the target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the rime-scaled wyrm, and takes 9 (2d8) Acid damage at the start of each of the rime-scaled wyrm's turns. If the rime-scaled wyrm takes 20 damage or more on a single turn from a creature inside it, it must succeed on a DC 15 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the rime-scaled wyrm and has the Prone condition. If the rime-scaled wyrm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 10 feet of movement, exiting with the Prone condition.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] brute-grappler type=Dragon mechanics=grapple, engulf — brute-grappler: ✓ ("swallows sailors whole") | brute-grappler: key "swallows" (class verb)
[concept] signature elements: swallowing sailors whole [behavior] | rime-scaled hide [body] | living glacier serpent [body]
[reskin] nova capped: "Breath Weapon" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
[reskin] signature idea (action): "The wyrm drives its head down into one grappled victim and swallows again, pulling the prey deeper into its gut. The victim is crushed and frozen inside, while the wyrm can keep fighting and even takes a moment to hurl the body out if it wants." [action/always/condition] — menu: swallow, shield-bash, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — swallow (swallow, swallows, swallowed, whole)
[reskin] value check: "Gorge and Glut" EV 19.8 vs floor 9.4 (one attack of 3) — a nova already stands — kept ungated, dice to 18 at the ceiling
[reskin] signature template: swallow -> Actions/"Gorge and Glut" ("The wyrm drives its head down into a grappled victim and swallows again, pulling [verb: swallow:concept, swallows:concept, swallowed:concept, whole:concept]")
[reskin] signature idea (trait): "The wyrm is a living glacier: whenever a creature strikes its rime-crusted hide in melee, a shock of killing cold rushes back through the weapon and numbs the attacker. The cold clings, making the attacker slower and more vulnerable until it shakes the frost off." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (rime)
[reskin] signature template (trait): heated-body -> Traits/"Rime Shock" ("a creature that hits the wyrm with a melee attack is shocked back by killing col [verb: rime:concept, shock:idea, frost:idea]")
[reskin] chassis nova: "Rime Breath (Recharge 5-6)" — the dragon-8's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Bloodmaw Orc — a 2024 sheet

**Concept:** a bloodmaw orc berserker with a greataxe who retreats behind iron armor

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bloodmaw Orc | 8 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greataxe: reach 10 on a Medium body with no tether word
- read: def 6 / off 8 → 7; sustained 52 (2 × Greataxe); nova none; dmg 52

```
Bloodmaw Orc

Medium Humanoid, Chaotic Neutral

AC 15
Initiative -1 (9)

HP 150 (20d8 + 60)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+8
INT
6
-2
-2
MOD
SAVE
DEX
8
-1
-1
WIS
10
+0
+0
MOD
SAVE
CON
16
+3
+6
CHA
6
-2
-2

Skills Athletics +8, Perception +3

Senses darkvision 120 ft.; Passive Perception 13

Languages Common, Orc

CR 8 (XP 3,900; PB +3)

Traits

Scrapwrought Hide. A creature that hits the bloodmaw orc with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.

Bloodied Frenzy. While Bloodied, the bloodmaw orc has Advantage on attack rolls and saving throws.

Great Weapon Master. When the bloodmaw orc hits a creature with its Greataxe, the attack deals an extra 3 damage.

Actions

Multiattack. The bloodmaw orc makes two attacks, using Greataxe or Hurlaxe in any combination. It can replace one attack with a use of Bloodcurdling Howl.

Greataxe. Melee Attack Roll: +8, reach 10 ft. 26 (6d6 + 5) Slashing damage.

Hurlaxe. Ranged Attack Roll: +8, range 60/240 ft. 23 (4d8 + 5) Slashing damage.

Bloodcurdling Howl. Wisdom Saving Throw: DC 16, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the bloodmaw orc's next turn. If the target was already Frightened by this ability, it also takes 27 (6d8) Piercing damage.

Bonus Actions

Relentless Rush. The bloodmaw orc takes the Dash action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("bloodmaw orc berserker with a greataxe") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: greataxe berserker charge [behavior] | retreats behind scavenged iron armor [behavior] | bloodmaw orc physiology [body]
[reskin] signature idea (action): "The orc makes a lunging, two-handed chop that only works if it has room to wind up and commit — so it can only use this right after moving a good distance toward its target, representing the full-blooded opening charge. On a hit the greataxe bites deep enough that the wound keeps bleeding, and the orc visibly pries a strip of iron off the victim to feed its shell. The chop is exhausting and leaves" [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] value check: "Creeping Dread" EV 18.6 vs floor 14 (one attack of 2) — dice 14 → 27
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Every time the orc is hit by a melee attack, it tears a strip of iron off the attacker's weapon, shield, or armor and bolts it onto its own hide, thickening its scrap shell; each piece makes the next blows against it glance away, but the shell is brittle — a solid enough hit or a shove can shake several plates loose at once. The shell only grows while the orc stays on the defensive and retreats be" [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — resonant-body (iron)
[reskin] signature template (trait): resonant-body -> Traits/"Scrapwrought Hide" ("Every time the orc is hit by a melee attack while within reach, it tears a strip [verb: iron:concept]")
```


---


### Coral Vurthax — a homebrew with a nova

**Concept:** a triton reef-warden who topples raiders with a trident

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Coral Vurthax | 5 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 36 (3 × Trident); nova Tide Burst 28; dmg 43

```
Coral Vurthax

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 90 (12d8 + 36)

Speed 30 ft., Swim 40 ft.

MOD
SAVE
STR
18
+4
+4
INT
10
+0
+0
MOD
SAVE
DEX
16
+3
+6
WIS
14
+2
+5
MOD
SAVE
CON
16
+3
+3
CHA
10
+0
+0

Skills Perception +5, Stealth +6

Senses darkvision 60 ft.; Passive Perception 15

Languages Common, Primordial

CR 5 (XP 1,800; PB +3)

Traits

Amphibious. The vurthax can breathe air and water.

Reef Stride. The vurthax ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The vurthax makes three Trident attacks. It can replace one attack with a use of Downed Strike.

Trident. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 12 (2d8 + 3) Piercing damage, and the target is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target has the Prone condition.

Tide Burst (Recharge 5-6). The vurthax hurls its barbed trident at a point it can see within 90 feet. Dexterity Saving Throw: DC 13, each creature in a 5-foot-radius Sphere centered on that point. Failure: 28 (8d6) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Downed Strike. Strength Saving Throw: DC 13, one creature within 30 feet that has the Prone condition. Failure: 10 (3d6) Bludgeoning damage. Success: Half damage.

Bonus Actions

Fleet Agility. The vurthax takes the Dash or Disengage action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — defender-warden: a Humanoid is not a made or risen guardian | skirmisher-hurler: ✓ ("topples raiders with a trident") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] signature elements: hurled trident that topples raiders [behavior] | living brine body [body] | coral-reef territory [aura]
[reskin] nova capped: "Hurled Burst" 31 → 28 (the chassis nova obeys the cap: 28 at CR 5)
[reskin] signature idea (action): "Great hooked spines line the warden's forearms; it drives them into a foe it has just knocked down and drags itself atop the body, pinning the prey in place and keeping it within the warden's reach while the trident is hauled back to hand. The hold lasts only as long as the warden chooses to stay crouched on top of its catch, a patient ambush hunter riding its prize in the shallows." [action/save/condition] — menu: snare, condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, bolt-mark)
[reskin] value check: "Spine Pin" EV 7.8 vs floor 5.2 (one attack of 3) — dice 21 → 10 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Spine Pin" ("the idea drives spines into a foe it has just knocked down; the payoff triggers  [shape fit, no verb match]")
[reskin] signature idea (trait): "The warden swims in the brine held within its own flesh and gear, sloughing off the steady pressure of deep water; its barbed trident and clinging coral armplates weigh it no more than dry land does, so it never suffers the usual drag of water or slippery footing." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The warden swims in the brine held within its own flesh and gear, sloughing off the steady pressure of deep water; its barbed trident and clinging coral armplates weigh it no more than dry land does, so it never suffers the usual drag of water or slippery footing." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] chassis nova: "Tide Burst (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Crookbound Herdmaster — in the run

**Concept:** a herdmaster who commands a stampede of thunder-elk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Crookbound Herdmaster | 5 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 38 (2 × Herding Crook); nova none; dmg 38

```
Crookbound Herdmaster

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
WIS
11
+0
+0
MOD
SAVE
CON
14
+2
+5
CHA
15
+2
+5

Skills Athletics +6, Persuasion +5

Senses darkvision 60 ft.; Passive Perception 10

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the herdmaster, the herdmaster and its allies have Advantage on attack rolls and saving throws, provided the herdmaster doesn't have the Incapacitated condition.

Actions

Multiattack. The herdmaster makes two attacks, using Herding Crook or Thunderbolt in any combination.

Herding Crook. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Thunder damage.

Thunderbolt. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 17 (4d6 + 3) Thunder damage.

Bonus Actions

Bolstering Cry (2/Day). Each ally within 30 feet of the herdmaster gains 9 (2d8) Temporary Hit Points.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("commands a stampede of thunder-elk") | defender-leader: key "commands" (class verb)
[concept] signature elements: commands a stampede of thunder-elk [behavior] | aura of authority that keeps the herd cohesive [aura] | iron-shod herding crook [object]
[reskin] signature idea (action): "The Herdmaster plants its feet, swings its ironwood crook overhead, and bellows. Bestial thunder-elk — even unseen ones — surge forward from its flanks in a thundering line, crashing through everything in their path and trampling enemies under hoof and storm before the herd skillfully swerves aside; allies still standing at the Herdmaster's side are untouched." [action/once_per_fight/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up (+ shelf: herd, patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (command, stampede)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into herd
[reskin] value check: "Thunder Herd Call (2/Day)" EV 7 vs floor 30.4 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Thunder Herd Call (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever the Herdmaster is struck in melee, it not only parries with its iron-shod crook but gives back a thunderous crack of the same storm contained in the ironwood, punishing the attacker for daring to break the herd's stride." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
```


---


### Yewshrine Warden — in the run

**Concept:** a tortle hermit who withdraws into his shell

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Yewshrine Warden | 3 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 3 → 2.5; sustained 24 (2 × Bite); nova none; dmg 24

```
Yewshrine Warden

Medium Humanoid, Lawful Neutral

AC 18
Initiative +0 (10)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
11
+0
+0
MOD
SAVE
DEX
11
+0
+0
WIS
12
+1
+3
MOD
SAVE
CON
14
+2
+4
CHA
14
+2
+2

Skills Athletics +5, Perception +3

Senses darkvision 30 ft.; Passive Perception 13

Languages Common, Aquan

CR 3 (XP 700; PB +2)

Traits

Hold Breath. The warden can hold its breath for 1 hour.

Actions

Multiattack. The warden makes two attacks, using Bite or Shell Spikes in any combination.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Shell Spikes. Ranged Attack Roll: +5, range 30/120 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Shell Defense. The warden withdraws into iron-banded shell. Until it emerges, it gains a +4 bonus to Armor Class and has the Prone condition; its Speed is 0 and can't increase, it has Disadvantage on Dexterity saving throws, it can't take Actions or Reactions, and it can emerge only as a Bonus Action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender-warden: a Humanoid is not a made or risen guardian | defender: ✓ ("a tortle hermit who withdraws into his s") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: withdrawing into an iron-reinforced shell [behavior] | iron-banded shell that turns aside blows [body] | punishing those who try to move past [behavior]
[reskin] signature idea (action): "The warden locks himself inside his iron-banded shell, hunkering down so that blows glance off the iron and he cannot be moved against his will. While withdrawn, he cannot attack, but at the start of each of his turns he can peek out just enough to lash at any enemy who has come within reach, punishing those who think him helpless. He chooses to withdraw; no one can force him into it." [trait/start_of_turn/defense] — menu: warded-mending (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, shell-withdraw, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — shell-withdraw (withdraw, shell)
[reskin] value check: "Iron Shell Retreat" EV 3.6 vs floor 2 (a bonus action (free)) — worth the trade
[reskin] kit credited: the signature bound shell-withdraw, the shape the tortle kit yielded to the cap — the row is the kit's ("Shell Defense"), free tier
[reskin] signature template: shell-withdraw -> Bonus Actions/"Shell Defense" ("the warden chooses to withdraw into his shell, becoming harder to hit and immobi [verb: withdraw:concept, shell:concept]")
[reskin] signature idea (trait): "The warden's shell is thick with iron bands, and its weight settles him like a rooted stone; when he braces, the shell turns aside blows that would stagger a softer creature, and attempts to shove or trip him find only immovable iron." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The warden's shell is thick with iron bands, and its weight settles him like a rooted stone; when he braces, the shell turns aside blows that would stagger a softer creature, and attempts to shove or trip him find only immovable iron." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
```


---


### Thornpiper Reveler — in the run

**Concept:** a satyr piper who dances travellers into the hills

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thornpiper Reveler | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 4 → 3; sustained 28 (2 × Thornpipe); nova none; dmg 28

```
Thornpiper Reveler

Medium Fey, Chaotic Neutral

AC 16
Initiative +4 (14)

HP 78 (12d8 + 24)

Speed 50 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
18
+4
+6
WIS
12
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
8
-1
-1

Skills Perception +3, Stealth +6

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Sylvan

CR 4 (XP 1,100; PB +2)

Traits

Magic Resistance. The reveler has Advantage on saving throws against spells and other magical effects.

Fleet Footwork. The reveler ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The reveler makes two attacks, using Thornpipe or Thorn Dart in any combination.

Thornpipe. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Piercing damage plus 6 (1d12) Psychic damage.

Thorn Dart. Ranged Attack Roll: +6, range 20/60 ft. 13 (2d8 + 4) Psychic damage.

Bonus Actions

Fleet Agility. The reveler takes the Dash or Disengage action.

Whirling Sidestep. The reveler takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] skirmisher type=Fey mechanics=none — caster-binder: a caster line needs a magic word in the words — none here | skirmisher: ✓ ("a satyr piper who dances") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: compelling dance-aura [aura] | thorn-pipe instrument [object] | skirmishing hit-and-run dance [behavior]
[reskin] signature idea (action): "The reveler lifts its thornpipe and plays a shrill, skipping reel aimed at one creature it can see, compelling that creature to spend its movement dancing directly toward the reveler along the shortest safe path. The reel does not root the target; it makes the dance irresistible if the target fails to withstand it, and the reveler can keep playing round after round to drag the same victim ever dee" [action/save/movement] — menu: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — feint-slip (dance)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into feint-slip
[reskin] value check: "Whirling Sidestep" EV 6.9 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: feint-slip -> Bonus Actions/"Whirling Sidestep" ("the creature is a dancer whose dance is evasive — it slips away in motion, and f [verb: dance:concept]")
[reskin] signature idea (trait): "The reveler moves in an ever-shifting … that cannot be pinned down; whenever a creature ends its turn having moved less than it could have, the reveler's thornpipe gives off a mocking psychic echo that punishes the creature for standing still. Any creature that chooses not to move during its turn while within earshot suffers a stab of psychic pain that leaves it reeling." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The reveler moves in an ever-shifting … that cannot be pinned down; whenever a creature ends its turn having moved less than it could have, the reveler's thornpipe gives off a mocking psychic echo that punishes the creature for standing still. Any creature that chooses not to move during its turn while within earshot suffers a stab of psychic pain that leaves it reeling." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, fire-aura)
```


---


### Stormwrought Oathkeeper — in the run

**Concept:** name: Stormwrought Oathkeeper | a storm-marked warden who stomps the ground and spits venom

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Stormwrought Oathkeeper | 7 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 7 → 6; sustained 46 (2 × Claw); nova Storm Stomp 24; dmg 47

```
Stormwrought Oathkeeper

Medium Monstrosity, Neutral

AC 16
Initiative +4 (14)

HP 117 (18d8 + 36)

Speed 40 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
18
+4
+7
WIS
12
+1
+1
MOD
SAVE
CON
15
+2
+2
CHA
8
-1
-1

Skills Perception +4, Stealth +7

Resistances Lightning

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Stormclap Retort. A creature that touches the oathkeeper or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Lightning damage.

Storm Stride. The oathkeeper ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The oathkeeper makes two attacks, using Claw or Venom Spit in any combination.

Claw. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Slashing damage plus 10 (3d6) Lightning damage.

Storm Stomp (Recharge 5-6). Dexterity Saving Throw: DC 15, each creature in a 15-foot Emanation originating from the oathkeeper. Failure: 24 (7d6) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Venom Spit. Ranged Attack Roll: +7, range 30/120 ft. 13 (2d8 + 4) Poison damage.

Bonus Actions

Fleet Agility. The oathkeeper takes the Dash or Disengage action.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] skirmisher type=Monstrosity mechanics=none — brute: ✓ ("a storm-marked warden who stomps the gro") | brute -> skirmisher: the concept's VERB outranks the noun (key "spits", class verb) | skirmisher: key "spits" (class verb)
[concept] signature elements: thunder-charged ground slam that erupts in a burst of lightning [behavior] | venomous spittle that blinds and poisons [behavior] | storm-scarred hide crackling with static [body]
[reskin] signature idea (action): "The oathkeeper leans back and heaves its head to spit a glob of envenomed spittle that arcs toward a creature it can see. Where the spittle lands, clinging poison saps the victim's vigor; but while the venom is still wet on its lips, the creature can also stomp the ground, discharging a thunder-charged shockwave that erupts in a burst of lightning, hurling nearby foes prone in a tangle of limbs." [action/save/damage] — menu: trample, thrown-burst, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: leap, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — ground-burst, delayed-brand (stomp, stomps, venom, mark)
[reskin] value check: "Storm Stomp (Recharge 5-6)" EV 64.7 vs floor 42.3 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: ground-burst -> Actions/"Storm Stomp (Recharge 5-6)" ("the oathkeeper stomps the ground, discharging a thunder-charged shockwave that e [verb: stomp:concept, stomps:concept, erupt:idea, erupts:idea, burst:idea, shockwave:idea]")
[reskin] signature idea (trait): "The oathkeeper's storm-scarred hide crackles with restless static, and when a foe lands a hit, the charge leaps back along the weapon or claw. The attacker is jolted and left staggering, their muscles twitching with lingering lightning." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body, faultless-tracker (storm, marked)
[reskin] signature template (trait): heated-body -> Traits/"Stormclap Retort" ("a foe lands a hit, the charge leaps back along the weapon or claw [verb: storm:concept, lightning:idea]")
```


---


### Meshrin — in the run

**Concept:** name: Meshrin | a chain-hooked thing that drags its prey into the dark

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 6 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 40 (2 × Hooked Chain); nova none; dmg 40

```
Meshrin

Large Monstrosity, Neutral

AC 14
Initiative -1 (9)

HP 119 (14d10 + 42)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
4
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
10
+0
+0
MOD
SAVE
CON
16
+3
+3
CHA
4
-3
-3

Skills Athletics +7, Perception +3

Senses blindsight 30 ft., darkvision 60 ft.; Passive Perception 13

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Drag into the Dark. When Meshrin hits a creature with its Hooked Chain, If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition. It is pulled up to 10 feet straight toward Meshrin.

Actions

Multiattack. Meshrin makes two Hooked Chain attacks.

Hooked Chain. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Poison damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15). While Grappled, the target has the Restrained condition. It is pulled up to 10 feet straight toward Meshrin.

Bonus Actions

Cage. Meshrin cages one Medium or smaller creature it is grappling. While caged, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside Meshrin, and takes 7 (2d6) Poison damage at the start of each of Meshrin's turns. Meshrin can have only one creature caged at a time. If Meshrin takes 15 damage or more in a single turn from the caged creature, Meshrin must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of Meshrin. If Meshrin dies, a caged creature pulls free Prone by using 5 feet of movement.

✏️
Edit
📁
Move to folder
⚔️
Use in Encounter
👤
Create NPC
🔄
Regenerate
📤
Export
🗑️
Delete
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf, snare — brute-grappler: ✓ ("chain-hooked thing that drags its prey") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: chain-hooks that bite and drag [object] | drags prey into the dark [behavior] | toying with trapped victims [behavior]
[reskin] signature idea (action): "Meshrin plants its chains and hauls on them, dragging every foe it has hooked straight toward its waiting maw. Each creature still caught on a chain is yanked across the ground to within reach of the maw and left sprawled on the floor for the moment it takes to reel them the rest of the way in." [action/always/movement] — menu: swallow, leap, condition-payoff, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — hook-rider (hook, hooks, drag, drags)
[reskin] signature bound by force: action — "hook-rider" matches hook+hooks+drag+drags in the user's words; the model's none is overruled
[reskin] signature rider: hook-rider -> Hooked Chain (appended; exact concept match [verb: hook:concept, hooks:concept, drag:concept, drags:concept, yank:idea])
[reskin] signature idea (trait): "The barbs on Meshrin's chains are slick with a poison that never lets go: any creature still hooked and being dragged has the venom worked deeper into its wounds, while a creature that tears itself free only spreads the poison further through its own flesh." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The barbs on Meshrin's chains are slick with a poison that never lets go: any creature still hooked and being dragged has the venom worked deeper into its wounds, while a creature that tears itself free only spreads the poison further through its own flesh." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body, bloodied-burst)
```

