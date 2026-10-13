# Review batch — baseline-fidelity-2026-10-04T16-00-59

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 6/6 | 5/5 |
| Ruin Ward | 2 (2014) | 2014 | lurker-2-trap | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 0/4 |
| Bog Witch | 4 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Sanguine Court | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 8/8 |
| Mudlurk Netter | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Unfinished Watch | 4 | 2024 | lurker-2-trap | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 0/2 | 0/4 |
| Staffbound Caster | 3 (2014) | 2014 | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 4/4 |
| Snapping Maw | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/3 |
| Pikachu | 2 | 2024 | caster-6 | ok | ok | ok | ok | SOFT: lint:beast-intelligence | ok | ok | ok | soft (1) | 1/1 | 3/4 |
| Sir Reginald Pemberton-Hughes | 5 (2014) | 2014 | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 2/4 |
| Wearwretch | 3 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | SOFT: type-immunities, languages-type | ok | ok | ok | soft (2) | 1/1 | 2/3 |
| Grandmother Ash | 7 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | SOFT: rider-no-save | ok | ok | ok | ok | soft (2) | 6/6 | 6/7 |
| Iron Bull | 12 | 2024 | brute-11-charger | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok | soft (1) | 4/5 | 6/8 |
| Lantern Drowned | 6 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | ok | clean | 3/4 | 5/5 |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Grubnock Scurrier | 0.5 (2014) | 2014 | skirmisher-3-archer | ok | ok | ok | ok | ok | FAIL: lint:phrasing-rider-save | ok | ok | FAIL (1) | 1/1 | 2/5 |
| Caldera Swarm | 10 | 2024 | dragon-8 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |

**Dropped 6 of 38 user clauses** (coverage 84%); concept share 71% (56/79 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3-archer / edition: 1



---

## Grubnock Scurrier — lowest CR

**Concept:** a kobold trapmaker with a bag of caltrops and a hand crossbow

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grubnock Scurrier | 0.5 (2014) | skirmisher-3-archer | ok | ok | ok | ok | ok | FAIL: lint:phrasing-rider-save | ok | ok |

- edition · fail · lint:phrasing-rider-save: 2014 rider-save phrasing in Traits/Bag of Caltrops — rider saves use the skeleton too: "*<Ability> Saving Throw:* DC n, <target>. *Failure:* <effect>"
- read: def 1/8 / off 1/2 → 0.3125; sustained 8 (2 × Hand Crossbow); nova none; dmg 8

```
Grubnock Scurrier
Small humanoid, neutral
Armor Class

13 (studded leather)

Hit Points: 

22 (5d6 + 5)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

12 (+1)

	

12 (+1)

	

11 (+0)

	

14 (+2)

	

11 (+0)

Skills: 

Perception +4, Stealth +3

Saving Throws: 

DEX +3

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common, Draconic

Challenge

1/2 (100 XP)

Proficiency Bonus:

+2

Bag of Caltrops. When the scurrier is reduced to 0 hit points or is forced to drop its bag, the bag bursts: each creature within 5 feet of it must succeed on a DC 12 Dexterity saving throw or take 3 (1d6) piercing damage and have its speed halved until the end of its next turn.
Skitter. Grubnock ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, Grubnock takes the Dash or Disengage action.

Actions
Multiattack: Grubnock makes two attacks with its Hand Crossbow.
Dagger: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.
Hand Crossbow: Ranged Weapon Attack: +3 to hit, range 30/120 ft., one target. Hit: 4 (1d6 + 1) piercing damage.
```

**Engine trace**

```
[route] skirmisher-archer type=Humanoid mechanics=snare, thrown-weapon — skirmisher-archer: ✓ ("hand crossbow") | skirmisher-archer: key "crossbow" (class noun)
[concept] signature elements: scattering caltrops to deny ground [behavior] | hand crossbow sniper [object] | bag of caltrops [object]
[reskin] claim gate: CR 0.5 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] slot yields: signature — the chassis's "Caltrop Scatter" leaves; the authored row holds the slot
```


---

## Iron Bull — highest CR

**Concept:** A huge iron golem shaped like a bull. It charges and gores, its hooves shake the ground when it stomps, it breathes scalding steam from its nostrils, and it is immune to anything but adamantine weapons.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Iron Bull | 12 | brute-11-charger | ok | ok | ok | SOFT: control-aoe-ungated | ok | ok | ok | ok |

- gates · soft · control-aoe-ungated: Actions/Ground-Shaking Stomp: at-will multi-target control with no damage and no gate (traded for an attack in Multiattack, print's shape)
- read: def 10 / off 13 → 11.5; sustained 80 (2 × Charge Gore); nova none; dmg 80

```
Iron Bull

Huge Construct, Unaligned

AC 16
Initiative +0 (10)

HP 210 (20d12 + 80)

Speed 50 ft.

MOD
SAVE
STR
22
+6
+10
INT
5
-3
-3
MOD
SAVE
DEX
10
+0
+0
WIS
12
+1
+1
MOD
SAVE
CON
18
+4
+8
CHA
6
-2
-2

Skills Athletics +10, Perception +5

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 12 (XP 8,400; PB +4)

Traits

Adamantine Immunity. When the bull takes damage from a weapon that is not made of adamantine, The bull takes no damage from the attack; only adamantine weapons can harm it.

Immutable Form. The iron bull can't shape-shift.

Magic Resistance. The iron bull has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The iron bull makes two attacks, using Charge Gore, Stomping Hooves or Scalding Steam in any combination. It can replace one attack with a use of Ground-Shaking Stomp.

Charge Gore. Melee Attack Roll: +10, reach 10 ft. 24 (4d8 + 6) Piercing damage plus 16 (3d10) Fire damage, and the target has the Prone condition.

Stomping Hooves. Melee Attack Roll: +10 (with Advantage if the target has the Prone condition), reach 5 ft. 24 (4d8 + 6) Bludgeoning damage.

Scalding Steam. Ranged Attack Roll: +10, range 30/120 ft. 24 (4d8 + 6) Fire damage.

Ground-Shaking Stomp. Strength Saving Throw: DC 18, each creature in a 20-foot Emanation. Failure: The target has the Prone condition until the end of its next turn.

Bonus Actions

Trample. Dexterity Saving Throw: DC 18, one creature within 5 feet that has the Prone condition. Failure: 18 (4d8) Bludgeoning damage. Success: Half damage.

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
[route] brute-charger type=Construct mechanics=breath — brute-juggernaut: ✓ ("A huge iron golem") | brute-juggernaut -> brute-charger: the concept's VERB outranks the noun (key "charges", class verb) | brute-charger: key "charges" (class verb)
[concept] signature elements: unstoppable goring charge [behavior] | body of riveted iron [body] | scalding steam breath [behavior]
[reskin] slot yields: signature — the chassis's "Scalding Breath" leaves; the authored row holds the slot
```


---

## Meshrin — a 2014 sheet

**Concept:** name: Meshrin | Large lizard folk, 30 feet of movement,  Wields a greatsword, long tail for swipe attacks, is trained in fighting styles, has razor sharp claws, and large teeth for a vicious bite. | role: auto

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Meshrin | 8 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 52 (2 × Greatsword); nova none; dmg 52

```
Meshrin
Large humanoid, lawful neutral
Armor Class

19 (splint, shield)

Hit Points: 

136 (16d10 + 48)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

12 (+1)

	

16 (+3)

	

11 (+0)

	

13 (+1)

	

14 (+2)

Skills: 

Athletics +7, Perception +4

Saving Throws: 

STR +7, CON +6

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common, Draconic

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Actions
Multiattack: Meshrin makes two attacks, using Greatsword, Tail Swipe, Razor Claws or Vicious Bite. It can replace one attack with a use of Claw Rake.
Greatsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) slashing damage.
Tail Swipe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) bludgeoning damage.
Claw Rake: One creature within 30 feet must make a DC 15 Strength saving throw. On a failed save, the target has Disadvantage on its next attack roll before the start of Meshrin's next turn.
Razor Claws: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.
Vicious Bite: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.
```

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("is trained in fighting styles") | defender: no line key in the words — the model's read of its quote
[concept] signature elements: greatsword line-holding [object] | tail swipe and claw rakes [body] | fighting-style discipline [behavior]
```


---

## Bog Witch — a 2024 sheet

**Concept:** a bog witch

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Bog Witch | 4 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (2 × Claw); nova none; dmg 26

```
Bog Witch

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 65 (10d8 + 20)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
14
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
15
+2
+2
WIS
15
+2
+4
MOD
SAVE
CON
14
+2
+2
CHA
18
+4
+6

Skills Perception +4, Deception +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The bog witch makes two attacks, using Claw or Brine Bolt in any combination. It can replace one attack with a use of Mire-Sicken.

Claw. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Force damage.

Brine Bolt. Ranged Attack Roll: +6, range 80/320 ft. 13 (2d8 + 4) Piercing damage.

Mire-Sicken. Constitution Saving Throw: DC 14, one creature within 60 feet. Failure: 13 (3d8) Bludgeoning damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The bog witch casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 14):

- At Will: Minor Illusion
- 1/Day Each: Bestow Curse, Blindness/Deafness, Cloudkill

Mire Oath. Charisma Saving Throw: DC 14, one creature within 60 feet. Failure: The target is cursed until the end of the bog witch's next turn. The first time the cursed target deals damage to any creature before then, it takes 14 (4d6) Piercing damage. Success: Half damage only.

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
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("a bog witch") | caster-binder: no line key in the words — the model's read of its quote
[concept] cr from the words: 4 — the user set none and no print name heads the words; a fixed ladder, never the model's read (critic form-ten 2026-10-01)
[concept] signature elements: hexes that steal actions [behavior] | brine-soaked hag body [body] | the bog itself as a weapon [aura]
[reskin] signature idea (action): "The bog witch hexes up to three creatures it can see within sixty feet, stealing their next chance to act. Each victim feels its breath drawn out and carried away on the brine; until the bog witch is hurt, each loses the ability to take reactions and finds its first attempt to attack, cast, or use an ability in the next round simply fails. The stolen breaths visibly bead on the witch's skin like s" [action/always/resource] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — slow-bolt (bog)
[reskin] value check: "Breath-Stealing Hex" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Breath-Stealing Hex" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Debt of Ruin" EV 10.9 vs floor 7.3 (one attack of 2) — added Success: Half; dice 7 → 14
[reskin] library seed drawn: curse-debt -> Actions/"Debt of Ruin" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The bog witch's hag body is saturated with sacred brine from the marsh that drowned her. Whenever a creature strikes her in melee, it is splashed with that brine and remains soaked, so that until the end of its next turn any healing it receives is halved and it leaves a wet trail that the witch can smell unerringly. The brine also drips from her claws, marking those she hits as hers to track throu" [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (bog)
[reskin] signature miss: trait — "The bog witch's hag body is saturated with sacred brine from the marsh that drowned her. Whenever a creature strikes her in melee, it is splashed with that brine and remains soaked, so that until the end of its next turn any healing it receives is halved and it leaves a wet trail that the witch can smell unerringly. The brine also drips from her claws, marking those she hits as hers to track throu" [trait/on_being_hit/condition] — the model found no template that holds it (offered: terrain-walk)
```


---

## Sanguine Court — a print donor

**Concept:** a vampire lord who keeps a court of thralls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Sanguine Court | 8 | skirmisher-8 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 48 (3 × Grave Strike); nova none; dmg 48

```
Sanguine Court

Medium Undead, Neutral Evil

AC 17
Initiative +5 (15)

HP 136 (16d8 + 64)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
+4
INT
17
+3
+3
MOD
SAVE
DEX
20
+5
+8
WIS
15
+2
+5
MOD
SAVE
CON
18
+4
+4
CHA
18
+4
+4

Skills Perception +5, Stealth +8

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 15

Languages Common plus two other languages

CR 8 (XP 3,900; PB +3)

Traits

Legendary Resistance (3/Day). If the sanguine court fails a saving throw, it can choose to succeed instead.

Misty Escape. If the sanguine court drops to 0 Hit Points outside its resting place, the sanguine court uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. The sanguine court can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. The sanguine court has these weaknesses:


- Forbiddance: the sanguine court can't enter a residence without an invitation from an occupant.
- Running Water: the sanguine court takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into the sanguine court's heart while the sanguine court has the Incapacitated condition in its resting place, the sanguine court has the Paralyzed condition until the weapon is removed.
- Sunlight: the sanguine court takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. The sanguine court makes three Grave Strike attacks. It can replace one attack with a use of Bite (Bat or Vampire Form Only).

Grave Strike. Melee Attack Roll: +8, reach 5 ft. 9 (1d8 + 5) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15) from one of two hands.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 15, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 14 (4d6) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the sanguine court regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the sanguine court's control. Success: Half damage only.

Bonus Actions

Shape-Shift. If the sanguine court isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the sanguine court can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the sanguine court can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). The sanguine court casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 15), and the duration is 24 hours. The Charmed target is a willing recipient of the sanguine court's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the sanguine court.

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
[route] caster-binder (controller) type=Undead mechanics=none — defender-leader: a Undead commands no troops | caster-binder: ✓ ("a vampire lord who keeps a court of thra") | caster-binder: no line key in the words — the model's read of its quote
[concept] cr from the words: 8 — the user set none and no print name heads the words; a fixed ladder, never the model's read (critic form-ten 2026-10-01)
[concept] signature elements: a court of thralls it commands [behavior] | blood-fed vampire lord body [body] | mind-dominating gaze and charms [behavior]
[reskin] print canon route: the Vampire's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Vampire is not a caster first — it casts no spells — the caster family stands down for the plain skirmisher line
[reskin] nova capped: "Sweeping Area Attack" 49 → 44 (the chassis nova obeys the cap: 44 at CR 8)
[reskin] print canon array: STR 18, DEX 20, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +8
[reskin] print canon: "a vampire lord who keeps a court of thralls" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "The vampire lord reaches out and calls to the blood coursing through a badly wounded foe. One creature that is already hurting must answer or be drawn stumbling toward the vampire, its own lifeblood betraying it. If it obeys, the vampire drinks deep and is visibly restored; if it refuses, the strain still leaves it reeling." [action/save/condition] — menu: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, rampage, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] value check: "Sundering Shove" EV 2.1 vs floor 7.8 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever a creature under the vampire's domination is slain or collapses near it, the vampire instantly siphons the last of that servant's blood and vitality. This heals the vampire and briefly makes its next act of command come swifter and crueler." [trait/always/resource] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Whenever a creature under the vampire's domination is slain or collapses near it, the vampire instantly siphons the last of that servant's blood and vitality. This heals the vampire and briefly makes its next act of command come swifter and crueler." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst)
[reskin] chassis nova: "Crimson Sweep (Recharge 5-6)" — the skirmisher-8's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon languages: "Common" -> "Common plus two other languages" — the Vampire's
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who keeps a court of thralls" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who keeps a court of thralls" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who keeps a court of thralls" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who keeps a court of thralls" is the Vampire (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Crimson Sweep (Recharge 5-6)" is the seat's nova, not the Vampire's
[reskin] print canon: chassis row leaves — Traits/"Blood Step" is the seat's, not the Vampire's
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 14
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] audit: [Misty Escape: Misty Escape is keyed to Shape-Shift…hape-Shift to become mist (no action required)."), Misty Escape: This imposes a hard removal-from-pla…ts resting place within 2 hours or be destroyed"), Vampire Weakness: Lowercase word starts a sentence…diant damage if it starts its turn in sunlight."), Vampire Weakness: Lowercase word starts a sentence…sidence without an invitation from an occupant.")]
```


---

## Grandmother Ash — a homebrew with a nova

**Concept:** name: Grandmother Ash | An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot. She keeps three crows that warn her of intruders.

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Grandmother Ash | 7 (2014) | caster-8-binder | ok | SOFT: band | ok | SOFT: rider-no-save | ok | ok | ok | ok |

- bands · soft · band: reads CR 5 (print at 7 reads 4.5–8.5, n=6)
- gates · soft · rider-no-save: Actions/Long Black Nails: a Restrained rider on every hit with no save
- read: def 4 / off 6 → 5; sustained 39 (3 × Long Black Nails); nova Ash-Choked Breath 21; dmg 40

```
Grandmother Ash
Medium fey, neutral
Armor Class

14 (natural armor)

Hit Points: 

130 (20d8 + 40)

Speed: 

30 ft., fly 30 ft. (hover)

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

15 (+2)

	

15 (+2)

	

14 (+2)

	

15 (+2)

	

16 (+3)

Skills: 

Perception +5, Deception +6

Saving Throws: 

WIS +5, CHA +6

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Cloud of Ash. When she would take damage or at will on her turn, Grandmother Ash dissolves into a cloud of ash, gaining resistance to nonmagical damage and the ability to move through any space without squeezing until the start of her next turn.
Crows' Warning (Reaction). When a creature she can see moves within 30 feet of her, one of her three crows screeches a warning, granting Grandmother Ash advantage on her next attack roll against that creature before the end of her next turn.

Actions
Multiattack: Grandmother makes three attacks: one with Long Black Nails, one with Hurled Debris, or one with Long Black Nails and one with Hurled Debris. It can replace one attack with a use of Choke Ash.
Long Black Nails: Melee Spell Attack: +6 to hit (with advantage if the target is restrained), reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage plus 6 (1d12) necrotic damage.
Hurled Debris: Ranged Spell Attack: +6 to hit, range 60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
Choke Ash: One creature within 60 feet must succeed on a DC 14 Constitution saving throw or take 14 (4d6) necrotic damage and be poisoned until the end of its next turn.
Spellcasting: Grandmother casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 14):

At will: fog cloud, minor illusion
1/day each: bestow curse, cloudkill
Ash-Choked Breath (Recharge 5-6): Each creature within 15 feet of her must make a DC 14 Constitution saving throw, taking 21 (6d6) slashing damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also restrained until the end of its next turn.
```

**Engine trace**

```
[route] caster-binder (controller) type=Fey mechanics=aura — skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | caster-binder: ✓ ("choke anyone who breathes her in") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: ash-cloud breath and choking engulf [body] | long black rot-carrying nails [body] | three crows that warn her [behavior]
[reskin] slot yields: signature — the chassis's "Stolen Breath" leaves; the authored row holds the slot
[reskin] chassis nova: "Ash-Choked Breath (Recharge 5-6)" — the caster-8-binder's own nova row; geometry, cap and rider lines below are its edits
```


---

## Unfinished Watch — one marked soft

**Concept:** a stone gargoyle that only moves when no one is looking

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Unfinished Watch | 4 | lurker-2-trap | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 2.5 (print at 4 reads 0.75–6, n=66)
- read: def 1 / off 4 → 2.5; sustained 26 (1 × Claw); nova none; dmg 26

```
Unfinished Watch

Medium Construct, Unaligned

AC 13
Initiative +1 (11)

HP 84 (13d8 + 26)

Speed 20 ft., Fly 20 ft. (hover)

MOD
SAVE
STR
18
+4
+6
INT
5
-3
-3
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
+2
CHA
8
-1
-1

Skills Stealth +5

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Adhesive Hide. The unfinished watch adheres to anything that touches it. A Huge or smaller creature adhered to the unfinished watch has the Grappled condition (escape DC 14).

Actions

Claw. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the unfinished watch), reach 5 ft. 26 (5d8 + 4) Slashing damage.

Pinning Lunge. Strength Saving Throw: DC 14, one creature within 30 feet that has the Grappled condition. Failure: 33 (6d10) Bludgeoning damage. Success: Half damage.

Bonus Actions

False Form. The unfinished watch shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.

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
[route] lurker-trap type=Construct mechanics=none — lurker-trap: ✓ ("only moves when no one is looking") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: only moves when unobserved [behavior] | stone body that freezes when seen [body] | disguised as lifelike statuary [body]
[reskin] signature idea (action): "The unfinished watch suddenly lunges at a creature it can sense but that has not looked at it since the start of its last turn. Claws strike with the weight of a falling statue; if the target is holding it or stuck to it, the lunge carries them along and pins them under its stone bulk, leaving them frozen in place." [action/always/damage] — menu: leap, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, snatch)
[reskin] value check: "Pinning Lunge" EV 25.6 vs floor 14 (one attack of 1) — dice 54 → 33 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Pinning Lunge" ("The lunge is triggered against a creature already Grappled — held or adhered — a [shape fit, no verb match]")
[reskin] signature idea (trait): "The instant any creature looks directly at the unfinished watch, its stone body locks rigid mid-motion. It cannot move, attack, or take any action until no creature is looking at it—but while frozen, its thoughts and instincts still race, waiting for the moment every eye turns away." [trait/always/condition] — menu: terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The instant any creature looks directly at the unfinished watch, its stone body locks rigid mid-motion. It cannot move, attack, or take any action until no creature is looking at it—but while frozen, its thoughts and instincts still race, waiting for the moment every eye turns away." [trait/always/condition] — the model found no template that holds it (offered: terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```


---

## Staffbound Caster — bands soft

**Concept:** a wizard but he cannot cast any spells, he just hits people with his staff

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Staffbound Caster | 3 (2014) | caster-6 | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 3 → 1.75; sustained 22 (2 × Staff Strike); nova none; dmg 22

```
Staffbound Caster
Medium humanoid, neutral
Armor Class

12

Hit Points: 

58 (13d8)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


9 (-1)

	

14 (+2)

	

11 (+0)

	

14 (+2)

	

12 (+1)

	

11 (+0)

Skills: 

Arcana +4, Perception +3

Saving Throws: 

INT +4, WIS +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common and any three languages

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Misty Step (3/Day). As a bonus action, the staffbound caster casts misty step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction). When the staffbound caster is hit by an attack roll, it casts shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: The staffbound caster makes two Staff Strike attacks.
Staff Strike: Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 120 ft., one target. Hit: 11 (2d8 + 2) bludgeoning damage.
Spellcasting: The staffbound caster casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12): -

At will: detect magic, light, mage armor, mage hand, prestidigitation

2/day each: fireball, invisibility

1/day each: cone of cold, fly
```

**Engine trace**

```
[route] caster (artillery) type=Humanoid mechanics=none — brute: ✓ ("he just hits people with his staff") | brute -> caster: the concept's VERB outranks the noun (key "spells", class verb) | caster: key "spells" (class verb)
[concept] signature elements: staff swung as a club [object] | frustrated spellcasting failure [behavior] | brittle bones from failed magic [body]
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 14, WIS 12, CHA 11 — the Mage's, INT fitted to +4
[reskin] print canon: "a wizard but he cannot cast any spells, he just hits people with his staff" heads on the Mage — print's rows ride along; the seat stays
[reskin] signature idea (action): "The caster slams the staff down and a wave of raw, unshaped magic bursts from it, washing over everything nearby. Creatures caught in the burst feel a lifetime of spells they no longer cast flood through them, leaving them unable to act. It works even though he is reaching for magic that no longer answers — this is desperation, not control." [action/always/condition] — menu: gaze-single, snare, reel, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Disarming Twist" EV 0 vs floor 5.7 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "When the caster's spellcasting fails — a spell resisted or a save passed — the backlash crawls back through the staff and into him. Something in his ruined Weave-connection twists, making him panic and lash out harder than before." [trait/always/damage] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "When the caster's spellcasting fails — a spell resisted or a save passed — the backlash crawls back through the staff and into him. Something in his ruined Weave-connection twists, making him panic and lash out harder than before." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
```


---

## Sir Reginald Pemberton-Hughes — bands soft

**Concept:** name: Sir Reginald Pemberton-Hughes | a knight who is deathly afraid of chickens and will flee from any bird

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Sir Reginald Pemberton-Hughes | 5 (2014) | defender-3-leader | ok | SOFT: band | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 3.5 (print at 5 reads 2.5–9.5, n=25)
- read: def 3 / off 4 → 3.5; sustained 32 (2 × Knightly Blade); nova none; dmg 32

```
Sir Reginald Pemberton-Hughes
Medium humanoid, lawful neutral
Armor Class

15 (chain shirt)

Hit Points: 

97 (15d8 + 30)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

14 (+2)

	

14 (+2)

	

12 (+1)

	

11 (+0)

	

15 (+2)

Skills: 

Athletics +6, Persuasion +5

Saving Throws: 

CON +5, CHA +5

Senses: 

darkvision 60 ft., passive Perception 10

Languages: 

Common

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Avian Terror. When Sir Reginald Pemberton-Hughes starts his turn within sight of any bird, he must use his movement to move away from the bird by the safest route, and cannot willingly end that movement within line of sight of it. If he cannot move away, he is frightened of the bird until the start of his next turn.
Aura of Authority. While Sir Reginald Pemberton-Hughes and its allies are within 10 feet of him, they have advantage on attack rolls and saving throws, provided Sir Reginald Pemberton-Hughes is not incapacitated.

Actions
Multiattack: Sir Reginald Pemberton-Hughes makes two attacks: one with its Knightly Blade and one with its Shield Bash.
Knightly Blade: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) slashing damage.
Shield Bash: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("a knight") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: commanding aura that bolsters allies [aura] | parry and riposte with a longsword [object] | abject terror of all birds, especially chickens [behavior]
[reskin] slot yields: signature — the chassis's "Knightly Command" leaves; the authored row holds the slot
```


---

## Wearwretch — bands soft

**Concept:** a sentient pile of laundry that smothers people and smells like old socks, it speaks only in the language of socks

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Wearwretch | 3 | brute-5-grappler | ok | SOFT: band | ok | ok | SOFT: type-immunities, languages-type | ok | ok | ok |

- bands · soft · band: reads CR 1.75 (print at 3 reads 0.375–5, n=83)
- headerBody · soft · type-immunities: a Ooze without Poison immunity (Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained)
- headerBody · soft · languages-type: an Ooze that speaks Common
- read: def 1/2 / off 3 → 1.75; sustained 24 (2 × Smothering Pile); nova none; dmg 24

```
Wearwretch

Medium Ooze, Unaligned

AC 13
Initiative -1 (9)

HP 67 (9d8 + 27)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+5
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

Skills Athletics +5, Perception +2

Immunities Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained

Senses blindsight 30 ft. (blind beyond this radius); Passive Perception 12

Languages Common; It speaks only in the language of socks.

CR 3 (XP 700; PB +2)

Actions

Multiattack. The wearwretch makes two attacks, using Smothering Pile in any combination. It can replace one attack with a use of Reeking Hug.

Smothering Pile. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13). While Grappled, the target has the Restrained condition.

Reeking Hug. Constitution Saving Throw: DC 13, one creature within 30 feet. Failure: The target has Disadvantage on its next attack roll before the start of the wearwretch's next turn.

Bonus Actions

Smother. The wearwretch smothers one Medium or smaller creature it is grappling. While smothered, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the wearwretch, and takes 4 (1d8) Bludgeoning damage at the start of each of the wearwretch's turns. The wearwretch can have only one creature smothered at a time. If the wearwretch takes 9 damage or more in a single turn from the smothered creature, the wearwretch must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the wearwretch. If the wearwretch dies, a smothered creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=? mechanics=grapple, engulf — brute-grappler: ✓ ("smothers people") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: smothering engulf [behavior] | sentient laundry pile [body] | speaks only in sock language [behavior]
```
