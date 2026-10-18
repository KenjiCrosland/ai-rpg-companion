# Release table for the critic — 2014 blocks — 2026-10-17

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-17-conditions.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — varied-2026-10-17T14-24-55

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bell-Founder's Ghost | 4 | 2024 | lurker-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 7/7 |
| Salt-Drowned Sailor | 3 | 2024 | lurker-1-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | FAIL: gate-fit | FAIL (1) | 1/1 | 3/4 |
| Ledger-Shelver Golem | 9 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 0/1 | 8/8 |
| Gravespore Hound | 6 | 2024 | lurker-5 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/4 |
| Copper-Pin Collector | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/2 |
| Canal-Lock Elemental | 11 | 2024 | brute-9 | ok | SOFT: hot-offense | FAIL: two-novas | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 5/5 |
| Star-Blind Oracle | 13 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | FAIL: lack-honored | FAIL (1) | 0/2 | 3/5 |
| Ossuary Beetle Swarm | 5 | 2024 | swarm-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Doorwarden Dain | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Cowl of the Treeline | 4 (2014) | 2014 | skirmisher-3-archer | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 4/7 |
| Old Wolf | 2 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/2 |
| Vessel of the Swallowed Hoard | 6 | 2024 | brute-5-grappler | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |

**Dropped 5 of 15 user clauses** (coverage 67%); concept share 80% (44/55 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- lurker-1-phantom / reader: 1
- brute-9 / structure: 1
- caster-8-binder / reader: 1



---


### Cowl of the Treeline — a 2014 sheet

**Concept:** a bandit lieutenant with a crossbow who never leaves the treeline

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cowl of the Treeline | 4 (2014) | skirmisher-3-archer | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2 (print at 4 reads 1.0625–6.5, n=13)
- read: def 1 / off 3 → 2; sustained 24 (2 × Hunting Knife); nova none; dmg 24

```
Cowl of the Treeline
Medium humanoid, neutral
Armor Class

14 (leather)

Hit Points: 

78 (12d8 + 24)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

16 (+3)

	

14 (+2)

	

11 (+0)

	

14 (+2)

	

11 (+0)

Skills: 

Perception +4, Stealth +5

Saving Throws: 

DEX +5

Senses: 

passive Perception 14

Languages: 

Common

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Bound. The cowl is bound to the treeline. It can't willingly move more than 120 feet from the treeline, and it always knows the direction and distance to the treeline.
Evasion. If the cowl is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the cowl instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it is incapacitated.
Fleet Agility. As a bonus action, the cowl takes the Dash or Disengage action.
Cunning Action. As a bonus action, the cowl takes the Dash, Disengage, or Hide action.

Actions
Multiattack: The cowl makes two attacks, using Crossbow or Hunting Knife. It can replace one attack with a use of Snaring Bolt.
Hunting Knife: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
Crossbow: Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 12 (2d8 + 3) piercing damage, and the cowl has advantage on its next attack roll against the target before the end of its next turn.
Snaring Bolt: One creature within 60 feet must succeed on a DC 13 Dexterity saving throw or be restrained until the end of the cowl's next turn.
```

**Where each row came from**

- Traits/Bound — template bound; library draw (seed unstamped); the GM's clause "never leaves the treeline"; binds the GM's words: never leaves
- Traits/Evasion — template evasion; rogue kit; the GM's clause "never leaves the treeline"
- Actions/Multiattack — the chassis
- Actions/Hunting Knife — weapon dagger
- Actions/Crossbow — authored for this sheet; a named part; a declared feature; the GM's clause "a bandit lieutenant with a crossbow"; weapon crossbow
- Actions/Snaring Bolt — template snare-bolt; library draw (seed unstamped); binds the GM's words: bolt+root
- Bonus Actions/Fleet Agility — the chassis
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "never leaves the treeline"

**Engine trace**

```
[route] skirmisher-archer type=Humanoid mechanics=none — skirmisher-archer: ✓ ("a bandit lieutenant with a crossbow") | defender-leader: "lieutenant" is a noun (a title), not a verb — no override | skirmisher-archer: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a bandit lieutenant with a crossbow who …" is the description, not a name
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/bestial mind=sapient style=archer energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: crossbow shots loosed from cover [behavior] | never leaving the treeline [behavior] | prepared fallback paths and trip-snares [object]
[concept] identity: The lieutenant opens from deep cover, loosing a crossbow bolt at the softest target and then fading back into brush to reposition before anyone can fix their line on him. Every round after is a game of angle and concealment: shoot, step behind a trunk, shoot again, punishing anyone who breaks formation to chase him. When bloodied he does not duel—he withdraws along a prepared path, trading ground for cover and peppering pursuers until they give up or walk into his band's ambush.
[concept] lore: A survivor of a broken mercenary company, this lieutenant took to the wood with the band that would follow him and now sells safe passage along the forest road, picking off the ones who refuse to pay.
[reskin] donor: skirmisher-3-archer -> CR 4
[reskin] repair round 1: 2 defect(s) — renames for "Melee Attack" and "Ranged Attack" are both "Crossbow" — every row needs its own name (give the thrown twin its own word: Scythe / Hurled Scythe) | name "Crossbow" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade
[reskin] repair round 2: 1 defect(s) — no damage type for "Sighting Crossbow"
[reskin] named parts: Crossbow (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] implied class kept: "rogue" on the GM's own words "never leaves the treeline" — the key table found none
[reskin] row evicted for the cap: Traits/"Brushstep" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "never leaves the treeline": Cunning Action (Assassin/Cunning Action), Evasion (evasion)
[reskin] inline by rule: "the cowl" — the call answered "the treeline" (kind), which the name does not support
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: "a bandit lieutenant with a crossbow" carries no trigger word, so the call's "at_will" has no receipt in the GM's own clause
[reskin] lacks not claimed: "never leaves the treeline" reads like a lack to the words, and the call's list did not name it
[reskin] asked field dropped: "never leaves the treeline" carries no trigger word, so the call's "at_will" has no receipt in the GM's own clause
[reskin] clauses: "a bandit lieutenant with a crossbow" -> has (mechanical) [asked: attack] | "never leaves the treeline" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The cowl looses a special bolt trailing a thin cord snagged to a sapling or stake behind the target, and on a hit the cord yanks tight around their legs and roots them to that spot. They can tear free by brute force or by freeing the snagged line, but until they do they can't leave the spot they were pinned to, and the cowl knows exactly where they are and where his prepared lanes run. He carries " [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Snaring Bolt" EV 7.7 vs floor 7.3 (one attack of 2) — worth the trade
[reskin] signature template: snare-bolt -> Actions/"Snaring Bolt" ("the cord yanks tight around the target's legs and roots them to the spot, Restra [verb: bolt:idea, root:idea]")
[reskin] signature idea (trait): "The cowl has walked this forest for years and has marked every game trail, root, and blind he can fall back through — ground he knows is clear and ground his pursuers don't. When he moves to withdraw, the brush and branches close behind him while anyone following him along his own trail is slowed and stumbling, so he always gets his next shot before they catch up." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bound (never leaves)
[reskin] word match declined by the call: faultless-tracker, aberrant-ground — the key word does not mean the mechanic here
[reskin] signature template (trait): bound -> Traits/"Bound" ("he never leaves the treeline — an anchor he can't stray from and always knows th [verb: never leaves:concept]")
[reskin] weapons answered: Crossbow = crossbow; Pinning Shot = crossbow
[reskin] weapon table: "Crossbow" — a launcher, never thrown, range 80/320
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] multiattack replacement clause: It can replace one attack with a use of Snaring Bolt.
[reskin] row binds its clause: "Bound" answers "never leaves the treeline" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Snaring Bolt Restrained is imposed with a fixed duration, so this is counterplay-sufficient, but the entry also should not be flagged for missing an escape — however, the Restrained condition is applied at range 60 ft. with no line-of-effect or object, which is fine; the real issue is that the cowl's own Counterplay is present. Re-evaluating: the Restrained has a duration, so no defect. Withdrawing.
[reskin] multiattack re-read — "Hunting Knife" joins the combination; "The cowl makes two attacks, using Crossbow or Hunting Knife in any combination. It can rep"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


---

## Review batch — cues-2026-10-17T00-36-41

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Bog Troll | 6 | 2024 | brute-5-grappler | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | soft (1) | 0/1 | 5/5 |
| Chapel-Glass Ox | 5 | 2024 | brute-5-charger | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Bridge Warden | 4 | 2024 | defender-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Sanctified Charger | 6 | 2024 | skirmisher-3 | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 1/5 |
| Dune Grasper | 7 | 2024 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (1) | 1/2 | 2/5 |
| Tidepool Grasper | 3 | 2024 | brute-2 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/2 |
| Tallyman | 5 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/5 |
| Oathbound Sentinel | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |
| Marquis Corvane | 4 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/5 |
| Sire Vaelros | 7 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: print-range | FAIL (1) | 0/1 | 3/5 |

**Dropped 4 of 12 user clauses** (coverage 67%); concept share 47% (22/47 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / derivation: 1
- lurker-5 / reader: 1
- skirmisher-3 / reader: 1



---


_No 2014 blocks sampled in this run._

---

## Review batch — holds2-2026-10-17T02-23-27

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reedmarch Stalker | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/6 |
| Sister Elowen Vane | 8 | 2024 | brute-5-regenerator | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 4/6 |
| Ironwake Berserker | 8 | 2024 | brute-5 | SOFT: duplicate-mechanic | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/5 |
| Marrow Tollrick | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 1/4 |
| Sedge Maw | 4 | 2024 | lurker-2 | ok | SOFT: aim-hp, band | ok | ok | SOFT: languages-type, lint:beast-intelligence | ok | ok | ok | ok | soft (2) | 1/1 | 2/5 |

**Dropped 2 of 8 user clauses** (coverage 75%); concept share 58% (18/31 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Thurivald — a 2014 sheet

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "sings his warband into a fury"
- read: def 4 / off 6 → 5; sustained 42 (2 × Spear); nova none; dmg 42

```
Thurivald
Medium humanoid, neutral
Armor Class

15 (chain shirt)

Hit Points: 

117 (18d8 + 36)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

14 (+2)

	

15 (+2)

	

12 (+1)

	

11 (+0)

	

15 (+2)

Skills: 

Athletics +6, Persuasion +5

Saving Throws: 

CON +5, CHA +5

Senses: 

passive Perception 10

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Aura of Authority. While in a 10-foot radius of Thurivald, Thurivald and its allies have advantage on attack rolls and saving throws, provided Thurivald isn't incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed by Thurivald until the start of Thurivald's next turn.

Actions
Multiattack: Thurivald makes two attacks: one with Spear and one with Javelin. It can replace one attack with a use of Command's Sting.
Spear: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Javelin: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Command's Sting: One creature within 30 feet that is charmed by Thurivald must make a DC 14 Wisdom saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Where each row came from**

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Spear — weapon spear
- Actions/Javelin — weapon javelin
- Actions/Command's Sting — library seed exploiter
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "Thurivald — a skald"

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=voice/armed mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: the driving war-chant that fires his warband [behavior] | spear and shield carried into the line [object] | the iron-throated voice that will not break [aura]
[concept] identity: Thurivald opens a fight by lifting a driving war-chant that hardens his warband's nerve and quickens their blades, then wades in beside his shield-brothers, spear and parry covering the flanks his song commands. Every round he weaves verse into action — a shouted stanza to re-form a broken line, a cadence that turns a hesitation into a charge — all while his voice never breaks. Cornered or bloodied, he does not flee; he sings louder, binding his own failing body into the final verse so the warband holds after he falls.
[concept] lore: Thurivald was a mercenary skald who swore his voice to the company that bought him, and now he marches under any banner that pays in glory, believing a song worth dying in is worth singing to the last breath.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3-leader -> CR 6
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: "sings his warband into a fury" carries no trigger word, so the call's "at_will" has no receipt in the GM's own clause
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Thurivald raises a driving war-chant that carries the whole warband forward as one. Each ally who can hear him can immediately close in beside him as part of the same push, and the chant leaves them singing with him so their next strike lands harder. It can only be raised once the singing has been broken and begun again." [action/once_per_fight/movement] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] value check: "Rallying War-Chant (2/Day)" EV 7.4 vs floor 32.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Rallying War-Chant (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback skipped by the floor: push-prone (EV 2.6 vs 9.9)
[reskin] fallback skipped by the floor: herd (EV 7.4 vs 32.1)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The chant is not a thing he does but a thing he is: whoever fights within reach of Thurivald's voice, enemy as well as friend, finds hesitation answered with a spear thrust, and the longer the song runs the more certain his blade becomes." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] word match declined by the call: bloodied-fury, mimicry — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for fury, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The chant is not a thing he does but a thing he is: whoever fights within reach of Thurivald's voice, enemy as well as friend, finds hesitation answered with a spear thrust, and the longer the song runs the more certain his blade becomes." [trait/always/damage] — the model found no template that holds it (offered: bloodied-fury, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] repair: 1 clause(s) with no row — "sings his warband into a fury"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Spear = spear; Javelin = javelin
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] save re-derived after a retype: Actions/Opportunist's Lash — a Strength save for an effect that calls for Wisdom or Charisma; the save follows the condition
audit finding below confidence gate: Aura of Authority Thurivald is a lone statblock with no minion-creation entry, so the "and its allies" clause relies on creatures the block never establishes and the GM must improvise; the aura's beneficiary set is not determinable from the block.
[reskin] audit rename: "Opportunist's Lash" -> "Command's Sting"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


---

## Review batch — bane-2026-10-17T14-21-04

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reknitting Runoff | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/5 |
| Wax Abbot | 7 | 2024 | brute-5-regenerator | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Grave-Knit Revenant | 8 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Fen Altar Troll | 6 | 2024 | brute-5-grappler | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | ok | ok | soft (1) | 0/1 | 4/4 |
| Briarwarden of the Stones | 6 | 2024 | caster-6 | ok | SOFT: aim-hp, band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/4 |

**Dropped 2 of 5 user clauses** (coverage 60%); concept share 82% (18/22 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


_No 2014 blocks sampled in this run._
