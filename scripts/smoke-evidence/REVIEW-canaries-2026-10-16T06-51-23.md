# Review batch — canaries-2026-10-16T06-51-23

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Road Toll Ogre | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Minewretch Creeper | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Cut-Tongue Hoarder | 3 | 2024 | skirmisher-3-skulker | ok | ok | FAIL: multiattack-combination | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 2/6 |
| Iron Oath Warden | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Sidereal Pretender | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 3/5 |
| Gorravane the Thunderhead | 15 | 2024 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: lack-honored | FAIL (1) | 0/1 | 1/5 |
| Gilded Reliquary Ooze | 9 | 2024 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 1/1 | 5/5 |
| Swarm of Dirge Chorus | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: save-fit | FAIL (1) | 0/1 | 4/4 |
| Karn Vex | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 2/2 |
| Gloamhound | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 0/5 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Ashen Vow | 17 (2014) | 2014 | defender-17-leader | ok | SOFT: aim-dpr | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (2) | 1/2 | 2/9 |
| Well Drowned | 5 | 2024 | lurker-5-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/1 | 0/4 |

**Dropped 4 of 18 user clauses** (coverage 78%); concept share 55% (33/60 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3-skulker / structure: 1
- dragon-15 / reader: 1
- swarm-9 / reader: 1
- lurker-5 / bands: 1
- lurker-5-phantom / reader: 1



---

## Minewretch Creeper — lowest CR

**Concept:** name: Kobold | Can turn invisible once per day

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Minewretch Creeper | 0.25 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1/2 → 0.3125; sustained 6 (1 × Dagger); nova none; dmg 6

```
Minewretch Creeper

Small Dragon, Neutral

AC 14
Initiative +2 (12)

HP 7 (3d6 - 3)

Speed 30 ft.

MOD
SAVE
STR
7
-2
-2
INT
8
-1
-1
MOD
SAVE
DEX
15
+2
+4
WIS
7
-2
-2
MOD
SAVE
CON
9
-1
-1
CHA
8
-1
-1

Skills Perception +0, Stealth +4

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Draconic

CR 1/4 (XP 50; PB +2)

Traits

Pack Tactics. The kobold has Advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the kobold has Disadvantage on ability checks and attack rolls.

Actions

Dagger. Melee or Ranged Attack Roll: +4, reach 5 ft. or range 20/60 ft. 6 (1d8 + 2) Piercing damage.

Bonus Actions

Shrouding Slip (1/Day). The creeper casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("Can turn invisible once per day") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: single daily invisibility [behavior] | hides and ambushes from prepared cover [behavior] | leather sling and stones [object]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Borrowed against the dark it was spawned in, this trick slips the creeper out of sight the moment it hauls on its leather cord — a small kobold hand-drawn sigil knotted into the sling's pouch. It turns see-through for a short while, or until it drops a stone from that sling into a body, after which the favor snaps and the tunnel-dark takes it back until the next sunless stretch." [action/once_per_fight/defense] — menu: lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, patient-defense, aggro-curse, self-invisibility, focus, feint-slip, coating, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Sling Shroud (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Sling Shroud (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The creeper's meat is still thin and breakable, and the old trick that lets it vanish is what keeps it breathing — when something connects with it in melee, the favor flickers and the creeper fades partway through the blow, coming out the other side harder to lay a second hand on." [trait/on_being_hit/defense] — menu: EMPTY (+ shelf: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry)
[reskin] signature miss: trait — "The creeper's meat is still thin and breakable, and the old trick that lets it vanish is what keeps it breathing — when something connects with it in melee, the favor flickers and the creeper fades partway through the blow, coming out the other side harder to lay a second hand on." [trait/on_being_hit/defense] — the model found no template that holds it (offered: false-appearance)
[reskin] print canon modes: climb off — the Kobold Warrior has no such mode and the words name none
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Dagger" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Kobold Warrior's weapon is thrown)
[reskin] print canon attack: "Pick Scratch" -> "Dagger" — the Kobold Warrior's own row
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Kobold Warrior's
```


---

## Ashen Vow — highest CR

**Concept:** a death knight who leads a cavalry of the damned and burns the living

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Ashen Vow | 17 (2014) | defender-17-leader | ok | SOFT: aim-dpr | SOFT: reach | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 115 a round is 28% under the table's 160
- structure · soft · reach: Actions/Cinder Blade: reach 10 on a Medium body with no tether word
- **dropped clause:** "burns the living"
- read: def 14 / off 18 → 16; sustained 115 (2 × Cinder Blade + legendary Charge the Living); nova none; dmg 115

```
Ashen Vow
Medium undead, neutral
Armor Class

20 (natural armor)

Hit Points: 

256 (27d8 + 135)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

14 (+2)

	

20 (+5)

	

14 (+2)

	

16 (+3)

	

20 (+5)

Skills: 

Athletics +10, Persuasion +11

Saving Throws: 

CON +11, CHA +11

Damage Resistances: 

fire

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 13

Languages: 

Common plus the languages it knew in life

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Scorched Wake. The ground within 10 feet of the ashen vow is difficult terrain.
Legendary Resistance (3/Day). If the ashen vow fails a saving throw, it can choose to succeed instead.
Aura of Authority. While within 10 feet of the ashen vow, the ashen vow and its allies have advantage on attack rolls and saving throws, provided the ashen vow isn't incapacitated.
Searing Rebuke. As a bonus action, the ashen vow targets one creature within 5 feet that hit it with an attack roll since the end of the ashen vow's last turn, dealing 10 (3d6) fire damage to it.
Riposte (Reaction). When a creature within 5 feet of the ashen vow misses it with a melee attack roll, the ashen vow makes one Cinder Blade attack against that creature.

Actions
Multiattack: The ashen vow makes two Cinder Blade attacks.
Cinder Blade: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) slashing damage plus 10 (3d6) fire damage.
Legendary Actions

The ashen vow can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ashen vow regains spent legendary actions at the start of its turn.

Charge the Living: The ashen vow moves up to half its speed without provoking opportunity attacks, and it makes one Cinder Blade attack.
Ride Them Down: One ally of the ashen vow that can see or hear it can immediately use its reaction to move up to half its speed or to make one attack.
Oath of Iron: The ashen vow and each of its allies within 10 feet of it that can see or hear it end the charmed and frightened conditions on themselves.
```

**Engine trace**

```
[route] defender-leader type=Undead mechanics=aura — defender-leader: ✓ ("leads a cavalry of the damned") | defender-leader: key "leads a" (class verb)
[concept] signature elements: leads a cavalry of the damned [behavior] | burns the living [behavior] | aura of command [aura]
[reskin] class kit: fighter — "a death knight": Riposte (riposte)
[reskin] signature idea (action): "A spectral horn sounds, and from the scorched ground rise remnant riders of the death knight's old cavalry. They appear around the knight to harry and burn the living, fighting as long as the knight commands, then crumble when the knight is destroyed or when the horn's echo fades." [action/once_per_fight/resource] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "A spectral horn sounds, and from the scorched ground rise remnant riders of the death knight's old cavalry. They appear around the knight to harry and burn the living, fighting as long as the knight commands, then crumble when the knight is destroyed or when the horn's echo fades." [action/once_per_fight/resource] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, rally)
[reskin] value check: "Answering Sting" EV 5.5 vs floor 3.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The death knight and its undead allies leave a trail of cinders and ash that clings to the living. Those who start their turn in the scorched wake catch fire, and the blaze spreads as the damned cavalry charges through the battlefield." [trait/always/damage] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body, death-burst (burn, death)
[reskin] signature template (trait): aberrant-ground -> Traits/"Scorched Wake" ("The idea says the dead leave a trail of cinders and ash that clings to the livin [verb: wake:idea, trail of:idea]")
```


---

## Goblin Boss — a 2014 sheet

**Concept:** name: Goblin Boss | riding a worg

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Boss | 1 (2014) | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 1 → 0.75; sustained 12 (2 × Scimitar); nova Worg Charge 6; dmg 12

```
Goblin Boss
Small humanoid, chaotic neutral
Armor Class

17 (chain shirt, shield)

Hit Points: 

21 (6d6)

Speed: 

50 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

15 (+2)

	

10 (+0)

	

10 (+0)

	

8 (-1)

	

10 (+0)

Skills: 

Perception +1, Stealth +4

Saving Throws: 

DEX +4

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Common, Goblin

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Skittering Spur. The boss ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Nimble Escape. As a bonus action, the goblin takes the Disengage or Hide action.

Actions
Multiattack: The boss makes two attacks, using Scimitar or Shortbow. It can replace one attack with a use of Opportunist's Lash.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage. If the boss moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is prone.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 6 (1d8 + 2) piercing damage.
Worg Charge (Recharge 5-6): The boss moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 12 Strength saving throw, taking 6 (1d12) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also prone.
Opportunist's Lash: One creature within 30 feet that is prone must make a DC 12 Strength saving throw, taking 5 (1d10) piercing damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-mounted type=Humanoid mechanics=none — skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] signature elements: worg-mounted charge [behavior] | warband command [behavior] | improvised weaponry [object]
[reskin] print canon defenses: HP 26 -> 21, AC 13 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] print canon: "Goblin Boss — riding a worg" heads on the Goblin Boss — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The boss snarls a command that carries to every goblin sworn to it, snapping them into a coordinated rush. Several goblin allies within earshot can move a short distance toward the boss's chosen enemy, and any of them that reaches the foe can make a quick strike of its own. The order can only be given so often before the warband's discipline frays." [action/always/movement] — menu: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature miss: action — "The boss snarls a command that carries to every goblin sworn to it, snapping them into a coordinated rush. Several goblin allies within earshot can move a short distance toward the boss's chosen enemy, and any of them that reaches the foe can make a quick strike of its own. The order can only be given so often before the warband's discipline frays." [action/always/movement] — the model found no template that holds it (offered: throw-retrieve, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, aggro-curse)
[reskin] value check: "Opportunist's Lash" EV 3.9 vs floor 3.1 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "In the heat of a brawl the boss grabs whatever is within reach and lashes out with it — a dropped shield, a jagged rock, even a fallen foe's limb. Anyone who lets the boss get its hands on them feels the improvised blow land harder than any scrap should." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "In the heat of a brawl the boss grabs whatever is within reach and lashes out with it — a dropped shield, a jagged rock, even a fallen foe's limb. Anyone who lets the boss get its hands on them feels the improvised blow land harder than any scrap should." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] chassis nova: "Worg Charge (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: the mount carries the Goblin Boss — its 30 ft. walk yields to the mount's (critic form-ten 2026-10-01)
[reskin] print canon attack: "Saddle Saber" -> "Scimitar" — the Goblin Boss's own row
[reskin] print canon attack: "Shortbow" rolls print's +4 with +2 damage — a print row stands outside the weapon table
[reskin] print canon attack: "Javelin" -> "Shortbow" — the Goblin Boss's own ranged row
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Mounted Agility" yields to the Goblin Boss's Nimble Escape
```


---

## Owlbear — a 2024 sheet

**Concept:** name: Owlbear | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

```
Owlbear

Large Monstrosity, Unaligned

AC 13
Initiative +1 (11)

HP 59 (7d10 + 21)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
20
+5
+7
INT
3
-4
-4
MOD
SAVE
DEX
12
+1
+1
WIS
12
+1
+1
MOD
SAVE
CON
17
+3
+3
CHA
7
-2
-2

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Actions

Multiattack. The owlbear makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("Owlbear") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: the bone-breaking bear hug that pins and crushes [behavior] | an owl's hooked beak on a bear's hulking body [body] | a dungeon-bred amalgam of owl and bear [body]
[reskin] print canon route: "Owlbear" is the Owlbear — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Talons" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
```


---

## Road Toll Ogre — a print donor

**Concept:** big ogre with a club, cr 5

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Road Toll Ogre | 5 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 6 → 4.5; sustained 44 (2 × Club); nova none; dmg 44

```
Road Toll Ogre

Large Giant, Chaotic Evil

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

Speed 40 ft.

MOD
SAVE
STR
19
+4
+7
INT
5
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
7
-2
-2
MOD
SAVE
CON
16
+3
+6
CHA
7
-2
-2

Skills Athletics +7, Perception +1

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Giant

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The toll ogre makes two attacks, using Club or Javelin in any combination.

Club. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Bludgeoning damage, and the target's Speed is reduced by 10 feet until the start of the toll ogre's next turn.

Javelin. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 30/120 ft. 22 (4d8 + 4) Piercing damage, and the target's Speed is reduced by 10 feet until the start of the toll ogre's next turn.

Bonus Actions

Toll's Claim. Wisdom Saving Throw: DC 15, one creature within 30 feet. Failure: Until the start of the toll ogre's next turn, the target has Disadvantage on attack rolls against creatures other than the toll ogre.

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
[route] brute type=Giant mechanics=none — brute: ✓ ("big ogre with a club") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: giant club [object] | simple smashing tactics [behavior] | thick hide [body]
[reskin] print canon array: STR 19, DEX 8, CON 16, INT 5, WIS 7, CHA 7 — the Ogre's; STR 19 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] print canon: "big ogre with a club, cr 5" heads on the Ogre — print's rows ride along; the seat stays
[reskin] signature idea (action): "The ogre winds up and brings its whole club down in an overhead smash meant to flatten a man into the road itself. Any target standing within the wide arc of the swing is caught, and those it crushes are left sprawled on the ground, easy for the ogre to finish. It cannot swing again until it has hauled the club back up." [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, charge (+ shelf: swallow, trample, leap, throw-retrieve, shield-bash, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature miss: action — "The ogre winds up and brings its whole club down in an overhead smash meant to flatten a man into the road itself. Any target standing within the wide arc of the swing is caught, and those it crushes are left sprawled on the ground, easy for the ogre to finish. It cannot swing again until it has hauled the club back up." [rider/on_hit/condition] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, charge, swallow, hook-drag, wind-up)
[reskin] value check: "Binding Mark" EV 5.4 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The club is a whole felled tree with iron bands, so big that its sheer weight drags at whatever it touches; anyone struck by it feels the impact shudder through their legs and finds it hard to break away. The ogre's grip is crude but the mass does the work." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The club is a whole felled tree with iron bands, so big that its sheer weight drags at whatever it touches; anyone struck by it feels the impact shudder through their legs and finds it hard to break away. The ogre's grip is crude but the mass does the work." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, heated-body, resonant-body)
[reskin] print canon alignment: Neutral Evil -> Chaotic Evil — the Ogre's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Common, Giant" — the Ogre's
[reskin] print canon row frame: "Javelin" keeps print's thrown frame — reach 5 ft. or range 30/120 ft.
[reskin] print canon row: Actions/Javelin — the Ogre's second melee row, beside the chassis's
```


---

## Gorravane the Thunderhead — a legendary

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gorravane the Thunderhead | 15 | dragon-15 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: lack-honored |

- bands · soft · hot-offense: offense alone reads CR 21, 6 over; the HP axis pulls the read to 15
- reader · fail · lack-honored: the GM asked for an absence — "an adult storm dragon whose breath is a rolling wall of thunder" — and the sheet still carries it
- **dropped clause:** "an adult storm dragon whose breath is a rolling wall of thunder"
- read: def 9 / off 21 → 15; sustained 150 (3 × Claw + legendary Wing Bash); nova none; dmg 150

```
Gorravane the Thunderhead

Huge Dragon, Neutral

AC 19
Initiative +1 (11)

HP 187 (15d12 + 90)

Speed 40 ft., Fly 80 ft.

MOD
SAVE
STR
22
+6
+6
INT
16
+3
+3
MOD
SAVE
DEX
12
+1
+6
WIS
14
+2
+7
MOD
SAVE
CON
22
+6
+6
CHA
20
+5
+5

Skills Perception +7, Stealth +6

Immunities Thunder

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 17

Languages Common, Draconic

CR 15 (XP 13,000; PB +5)

Traits

Legendary Resistance (3/Day). If Gorravane fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. Gorravane makes three Claw attacks. It can replace one attack with a use of Spellcasting to cast Suggestion.

Claw. Melee Attack Roll: +11, reach 10 ft. 15 (2d8 + 6) Slashing damage plus 10 (3d6) Thunder damage.

Spellcasting. Gorravane casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 18):

- At Will: Detect Magic, Command, Suggestion, Fear

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Gorravane can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Wing Bash. Gorravane makes one Claw attack.

Frightful Presence. Wisdom Saving Throw: DC 18, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("an adult storm dragon whose breath is a ") | dragon: key "dragon" (class body)
[concept] signature elements: rolling wall of thunder [body] | storm-born fury [behavior] | frightful presence [aura]
[reskin] signature idea (action): "Gorravane hovers and tears a howling arc of storm-wind through the air, dragging a line of thunderclap along the ground beneath it. The blast moves the dragon and hurls every creature caught in the lane backward, scattering formations and leaving them sprawled and shaken for the next thunder wall." [action/always/movement] — menu: gaze-single, snare, condition-payoff, execute, seal, shield-bash, lure (+ shelf: lay-on-hands, second-wind, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature idea (trait): "The first time Gorravane is bloodied, its lingering storm erupts outward as a thunderous shockwave that clings to it as a roaring aura. While that fury burns, its claw and bite carry a concussive echo that leaves foes bruised and staggered." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (storm)
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Sidereal Pretender — one marked soft

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sidereal Pretender | 6 | caster-6 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Reactions/Shield
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Sidereal Pretender

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

Languages Common and any three languages

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The pretender makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. The pretender casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The pretender casts Misty Step, using the same spellcasting ability as Spellcasting.

Shimmer Fold (2/Day). The pretender teleports up to 30 feet to an unoccupied space it can see.

Reactions

Shield (3/Day). Trigger: The pretender is hit by an attack roll. Response: The pretender casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] caster (artillery) type=Humanoid mechanics=teleport — caster: ✓ ("never where you struck and steps away") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: steps away from any strike [behavior] | ranged spell bolts [behavior] | body of living shadow [body]
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] signature idea (action): "The pretender does not cast from where it stands; it folds the space it occupies into a doorway, striking from a ripple of shadow while a shimmering duplicate of itself remains behind as a decoy. Every soul near that decoy is left grasping at a body that was never there, and the wound of the spell lands only when the pretender steps back into the world to claim the throne's attention." [action/always/damage] — menu: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] value check: "Shimmer Fold (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: phase-slip -> Bonus Actions/"Shimmer Fold (2/Day)" ("The pretender folds space into a doorway and steps back into the world — a telep [verb: step:concept, shadow:idea]")
[reskin] signature idea (trait): "Whenever a blow would land, the pretender's body thins into pure shadow for a heartbeat and steps sideways through the seam between moments; the strike passes through the vacancy and the pretender reappears just out of reach, closer to the throne than before. Those who witness the slip cannot track it until it chooses to be seen again." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] signature miss: trait — "Whenever a blow would land, the pretender's body thins into pure shadow for a heartbeat and steps sideways through the seam between moments; the strike passes through the vacancy and the pretender reappears just out of reach, closer to the throne than before. Those who witness the slip cannot track it until it chooses to be seen again." [trait/on_being_hit/movement] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body, faultless-tracker)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Shadow Lash" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---

## Gloamhound — bands fail

**Concept:** an eyeless hunter that tracks prey by scent alone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gloamhound | 5 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · aim-hp: HP 65 is 28% under the card's 90
- bands · fail · under: effective HP 65 sits under print at CR 5 (75–228, n=52); reads CR 3
- read: def 1 / off 5 → 3; sustained 34 (2 × Bite); nova none; dmg 34

```
Gloamhound

Medium Monstrosity, Neutral

AC 15
Initiative +3 (13)

HP 65 (10d8 + 20)

Speed 40 ft.

MOD
SAVE
STR
12
+1
+1
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
13
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
10
+0
+0

Skills Perception +4, Stealth +9

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 14

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Faultless Tracker. The gloamhound knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Assassinate. During the first round of each combat, the gloamhound has Advantage on attack rolls against any creature that hasn't taken a turn. If the gloamhound hits a creature during that round, the target takes an extra 9 (2d8) Necrotic damage.

Actions

Multiattack. The gloamhound makes two Bite attacks. It can replace one attack with a use of Umbral Drain.

Bite. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Necrotic damage.

Umbral Drain. Constitution Saving Throw: DC 13, one creature within 30 feet. Failure: 18 (4d8) Necrotic damage, and the gloamhound regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the gloamhound takes the Hide action.

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
[route] lurker type=Monstrosity mechanics=none — lurker: ✓ ("tracks prey by scent alone") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: scent-only tracking through dark and cover [behavior] | body woven of clinging, light-swallowing shadow [body] | a single ambush strike from the blind spot [behavior]
[reskin] signature idea (action): "The hound picks out the one creature whose scent carries the sour tang of fear and shame — the quarry already running — and marks it as its chosen prey. The mark lasts until the hound is hurt or the prey escapes it entirely. While the mark holds, the hound can feel the direction and distance to that creature through any darkness or cover, no matter how far it flees, as long as they remain on the s" [action/always/condition] — menu: leap, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — focus, isolation (track, alone)
[reskin] signature miss: action — "The hound picks out the one creature whose scent carries the sour tang of fear and shame — the quarry already running — and marks it as its chosen prey. The mark lasts until the hound is hurt or the prey escapes it entirely. While the mark holds, the hound can feel the direction and distance to that creature through any darkness or cover, no matter how far it flees, as long as they remain on the s" [action/always/condition] — the model found no template that holds it (offered: focus, isolation, leap, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground, delayed-brand)
[reskin] value check: "Vitality Leech" EV 14 vs floor 9.4 (one attack of 2) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The gloamhound's body is woven from clinging, light-swallowing shadow: while it stands in dim light or darkness, attacks made against it from beyond reach find little purchase, and each time a weapon or claw draws its necrotic blood, tendrils of that shadow lash back at the attacker." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (track, tracks, tracking, scent)
[reskin] signature miss: trait — "The gloamhound's body is woven from clinging, light-swallowing shadow: while it stands in dim light or darkness, attacks made against it from beyond reach find little purchase, and each time a weapon or claw draws its necrotic blood, tendrils of that shadow lash back at the attacker." [trait/always/damage] — the model picked "blurred-form" (no verb) over a concept-verb template (faultless-tracker, uncanny-sense)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): faultless-tracker -> Traits/"Faultless Tracker" ("exact concept match [verb: track:concept, tracks:concept, tracking:concept, scent:concept]")
```


---

## Well Drowned — bands soft

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Well Drowned | 5 | lurker-5-phantom | ok | SOFT: aim-hp | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic |

- bands · soft · aim-hp: HP 67 is 26% under the card's 90
- reader · fail · name-mechanic: Actions/Drowning Grasp: the name promises the Grappled condition the text lacks
- read: def 3 / off 5 → 4; sustained 34 (2 × Claw); nova none; dmg 34

```
Well Drowned

Medium Undead, Neutral

AC 13
Initiative +3 (13)

HP 67 (9d8 + 27)

Speed 5 ft., Fly 60 ft. (hover), Swim 30 ft.

MOD
SAVE
STR
6
-2
-2
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
16
+3
+3
CHA
15
+2
+2

Skills Stealth +6

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 12

Languages Common plus the languages it knew in life

CR 5 (XP 1,800; PB +3)

Traits

Incorporeal Movement. The drowned can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the drowned has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The drowned makes two Claw attacks. It can replace one attack with a use of Drowning Grasp.

Claw. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Drowning Grasp. Strength Saving Throw: DC 13, one Medium or smaller creature the drowned is touching. Failure: 9 (2d8) Necrotic damage, and the drowned drags the target up to 15 feet through a wall, floor, or other solid object it can pass through; the target emerges Prone in the nearest unoccupied space at the far side. If no such space is within 15 feet, the target is not moved. Success: Half damage only.

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
[route] lurker-phantom type=Undead mechanics=none — lurker-phantom: ✓ ("the thing in the well") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] signature elements: rises from a flooded well to drown the living [behavior] | a drowned and waterlogged corpse-thing [body] | the cold black water of its shaft [aura]
[reskin] signature idea (action): "The drowned lunges with both hands to grip a living creature's throat and chest, then breathes the black cold of the well-bottom into its lungs. The victim is wracked by choking and the warmth is pulled out of its flesh, leaving frost-scabbed marks, and it must spend a moment heaving the dead water back out before it can act freely. The drowned can only do this to a creature it has already grabbed" [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation (+ shelf: swallow, leap, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, patient-defense, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] value check: "Drowning Grasp" EV 9.5 vs floor 9.4 (one attack of 2) — added Success: Half
[reskin] signature template: pull-through -> Actions/"Drowning Grasp" ("the drowned grips a grabbed living creature, breathes the black cold of the well [verb: drown:idea]")
[reskin] signature idea (trait): "A creature that strikes the drowned in melee feels its weapon or fist pass into sodden corpse-flesh and come away slick with well-water that clings and creeps toward the wound. The dampness saps the striker's warmth, leaving them shivering and slow until they spend a moment wiping the grave-water away or move out of the drowned's shadow." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "A creature that strikes the drowned in melee feels its weapon or fist pass into sodden corpse-flesh and come away slick with well-water that clings and creeps toward the wound. The dampness saps the striker's warmth, leaving them shivering and slow until they spend a moment wiping the grave-water away or move out of the drowned's shadow." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, bloodied-fury, undead-fortitude)
```


---

## Cut-Tongue Hoarder — in the run

**Concept:** a kenku thief who speaks only in stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Cut-Tongue Hoarder | 3 | skirmisher-3-skulker | ok | ok | FAIL: multiattack-combination | ok | ok | ok | ok | ok | ok |

- structure · fail · multiattack-combination: "in any combination" with one row: "The hoarder makes two attacks, using Dagger Throw in any combination. It can replace one attack with a use of Stolen Voice."
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24

```
Cut-Tongue Hoarder

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

Languages Speaks only in stolen voices

CR 3 (XP 700; PB +2)

Traits

Mimicry. The hoarder can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Skitter Step. The hoarder ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The hoarder makes two attacks, using Dagger Throw in any combination. It can replace one attack with a use of Stolen Voice.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Dagger Throw. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Stolen Voice. Wisdom Saving Throw: DC 13, one creature within 60 feet that can see or hear the hoarder. Failure: The target has the Charmed condition until the start of the hoarder's next turn, and while Charmed this way, it must move toward the hoarder by the safest available route on its turn.

Bonus Actions

Cunning Action. The hoarder takes the Dash, Disengage, or Hide action.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a kenku thief who speaks only in stolen ") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: stolen voices used as bait and misdirection [behavior] | shadow-draped skirmisher that strikes from hiding and vanishes [behavior] | kenku body of black feathers and hollow-boned stealth [body]
[reskin] species kit: kenku — "a kenku thief": Mimicry (Green Hag/Mimicry, binds "speaks only in stolen voices")
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a kenku thief": nothing landed; Evasion yielded to print's row cap 4
[reskin] signature idea (action): "The hoarder throws a voice it has stolen — a guard's challenge, a child's cry, a friend's shout — from a spot up to a short distance away, then goes quiet. Everyone who hears it must decide fast whether that cry is real; the ones who believe it flinch toward the sound and freeze there, certain something is wrong. Friends and enemies alike can be caught by it, because a stolen voice belongs to no o" [action/save/condition] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Stolen Voice" EV 6.6 vs floor 6.2 (one attack of 2) — worth the trade
[reskin] signature template: lure -> Actions/"Stolen Voice" ("The hoarder throws a stolen voice from a spot up to a short distance away; every [shape fit, no verb match]")
[reskin] signature idea (trait): "Its hollow bones and soft black feathers let it drop or climb almost silently and take less harm from a fall. No ordinary tumble bruises it enough to slow it down, so the rooftops it uses to escape are never barred by height." [trait/always/defense] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Its hollow bones and soft black feathers let it drop or climb almost silently and take less harm from a fall. No ordinary tumble bruises it enough to slow it down, so the rooftops it uses to escape are never barred by height." [trait/always/defense] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, resonant-body)
[reskin] species kit: Auran — the kenku's own
```


---

## Iron Oath Warden — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Iron Oath Warden | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Iron Oath Warden

Medium Humanoid, Neutral

AC 19
Initiative +0 (10)

HP 93 (17d8 + 17)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
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
+3
MOD
SAVE
CON
12
+1
+4
CHA
13
+1
+1

Skills Athletics +7, Perception +6

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The warden makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the warden's next turn.

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
[concept] signature elements: shield-wall sentinel who holds a chokepoint [behavior] | relentless mace blows that punish any movement [behavior] | scorched iron plate and heavy shield [body]
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] signature idea (action): "The warden plants his shield and calls the line: until he moves or is knocked down, he and any ally who stays pressed against his back or flank count the ground they already hold as the only ground that matters. Anyone trying to slip past the warden or through the gap he guards is stopped cold at the shield's edge, and the first one who tries eats a shattering mace swing for the presumption." [action/always/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature miss: action — "The warden plants his shield and calls the line: until he moves or is knocked down, he and any ally who stays pressed against his back or flank count the ground they already hold as the only ground that matters. Anyone trying to slip past the warden or through the gap he guards is stopped cold at the shield's edge, and the first one who tries eats a shattering mace swing for the presumption." [action/always/movement] — the model found no template that holds it (offered: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, rally)
[reskin] value check: "Dazzling Burst" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The warden's scorched iron plate runs too hot to touch and too heavy to ignore — anyone who lands a blow on him at arm's reach leaves a bit of themselves on the iron, and the warden reads the heat of his own armor as a ledger of who has struck him. When he swings his mace at someone who has already marked the iron with their blood this fight, the blow lands heavier and truer." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "The warden's scorched iron plate runs too hot to touch and too heavy to ignore — anyone who lands a blow on him at arm's reach leaves a bit of themselves on the iron, and the warden reads the heat of his own armor as a ledger of who has struck him. When he swings his mace at someone who has already marked the iron with their blood this fight, the blow lands heavier and truer." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, faultless-tracker, bloodied-fury, uncanny-sense)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
```


---

## Gilded Reliquary Ooze — in the run

**Concept:** a cathedral-vault ooze that digests reliquaries and drips gilded acid

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Gilded Reliquary Ooze | 9 | ooze-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Spider Climb
- read: def 9 / off 9 → 9; sustained 62 (2 × Pseudopod); nova none; dmg 62

```
Gilded Reliquary Ooze

Medium Ooze, Unaligned

AC 11
Initiative -2 (8)

HP 165 (22d8 + 66)

Speed 10 ft., Climb 10 ft.

MOD
SAVE
STR
18
+4
+4
INT
1
-5
-5
MOD
SAVE
DEX
6
-2
-2
WIS
6
-2
-2
MOD
SAVE
CON
16
+3
+3
CHA
2
-4
-4

Resistances Acid, Cold, Fire

Immunities Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained

Senses blindsight 60 ft., tremorsense 60 ft.; Passive Perception 8

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Relic Hunger. The reliquary ooze can pinpoint the location of gold, silver, or worked stone within 60 feet of itself.

Amorphous. The reliquary ooze can move through a space as narrow as 1 inch wide without squeezing.

Corrosive Form. A creature that touches the reliquary ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) Acid damage.

Spider Climb. The reliquary ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions

Multiattack. The reliquary ooze makes two Pseudopod attacks.

Pseudopod. Melee Attack Roll: +8, reach 5 ft. 31 (6d8 + 4) Acid damage. Nonmagical armor worn by the target takes a -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10. The penalty can be removed by casting the Mending spell on the armor.

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
[route] ooze type=Ooze mechanics=none — ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] signature elements: Gilded acid drips that dissolve stone and metal [body] | Engulfs and digests reliquaries and holy artifacts [behavior] | Lurks in cathedral vaults and collapsed naves [aura]
[reskin] print canon array: STR 18, DEX 6, CON 16, INT 1, WIS 6, CHA 2 — the Gray Ooze's, STR fitted to +8
[reskin] print canon: "a cathedral-vault ooze that digests reliquaries and drips gilded acid" heads on the Gray Ooze — print's rows ride along; the seat stays
[reskin] signature idea (action): "The ooze lunges forward and slams its mass against the most ornately adorned creature it can perceive, and for a short while the gold it has stolen and digested clings to the target in a glowing crust. Anything gilded this way is heavier and clumsier, slowing the victim and making every movement cost them, until the gold is scraped, burned, or washed away. The ooze does this to whatever it has not" [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, thrown-burst, gaze-single, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew, rampage, patient-defense, second-wind, riposte)
[reskin] signature miss: action — "The ooze lunges forward and slams its mass against the most ornately adorned creature it can perceive, and for a short while the gold it has stolen and digested clings to the target in a glowing crust. Anything gilded this way is heavier and clumsier, slowing the victim and making every movement cost them, until the gold is scraped, burned, or washed away. The ooze does this to whatever it has not" [rider/on_hit/condition] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, pounce, isolation, charge, lure)
[reskin] signature idea (trait): "Any gold, silver, or worked stone that remains in contact with the ooze for more than a moment softens and dissolves, and the metal flows visibly up into the creature's body, leaving the surface beneath it corroded and pitted. Living flesh and bone are not spared this fate either, but the ooze's true appetite is for treasure, relics, and ornament, and it feeds on them before it bothers with the cr" [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — aberrant-ground (ooze)
[reskin] signature template (trait): uncanny-sense -> Traits/"Relic Hunger" ("The ooze's true appetite is for treasure, relics, and ornament, and it senses go [verb: gold:idea, metal:idea, treasure:idea]")
[reskin] print canon size: Large -> Medium — the Gray Ooze's
[reskin] print canon speed: 20 ft. -> 10 ft. — the Gray Ooze's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 10 ft. — the Gray Ooze's own
[reskin] print canon attack: "Golden Pseudopod" -> "Pseudopod" — the Gray Ooze's own row
[reskin] print canon defenses: immunities Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained -> Blinded, Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained; resistances none -> Acid, Cold, Fire — the Gray Ooze's own header lines
```


---

## Swarm of Dirge Chorus — in the run

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Swarm of Dirge Chorus | 13 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: save-fit |

- reader · fail · save-fit: Traits/Bloodied Burst: a Constitution save for an effect that calls for Wisdom or Charisma
- **dropped clause:** "ring themselves over the dying"
- read: def 10 / off 15 → 12.5; sustained 90 (1 × Toll); nova none; dmg 90

```
Swarm of Dirge Chorus

Medium Swarm of Tiny Undead, Neutral

AC 15
Initiative +5 (15)

HP 187 (22d8 + 88)

Speed 40 ft.

MOD
SAVE
STR
8
-1
-1
INT
4
-3
-3
MOD
SAVE
DEX
20
+5
+5
WIS
10
+0
+0
MOD
SAVE
CON
18
+4
+4
CHA
2
-4
-4

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 10

Languages None

CR 13 (XP 10,000; PB +5)

Traits

Bloodied Burst. The first time the swarm is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 91 (14d12) Necrotic damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Assassinate. During the first round of each combat, the swarm has Advantage on attack rolls against any creature that hasn't taken a turn. If the swarm hits a creature during that round, the target takes an extra 45 (13d6) Necrotic damage.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Toll. Melee Attack Roll: +10, reach 5 ft. 54 (11d8 + 5) Bludgeoning damage plus 36 (8d8) Necrotic damage, or 27 (6d8) Bludgeoning damage plus 18 (4d8) Necrotic damage if the swarm is Bloodied.

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
[route] lurker-phantom type=Undead mechanics=none — lurker-phantom: ✓ ("a swarm of funeral bells that ring thems") | lurker-phantom: no line key in the words — the model's read of its quote
[concept] signature elements: a swarm of self-ringing funeral bells [body] | drifting through walls as an incorporeal mass [behavior] | ringing a death-knell over the dying to harvest their breath [behavior]
[reskin] signature idea (action): "The swarm chooses a solid wall, floor, or ceiling within its reach and rings through it, sending a slow funeral peal into whatever lies beyond. Every living creature on the far side of that surface feels the vibration in its bones and begins to age toward death, its body slackening and its breath growing shallow until it can barely stand. The dead and the unliving hear nothing but a distant, famil" [action/save/condition] — menu: gaze-single, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, blighted-ground (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, coating, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — active-toll, sensory-strike (ring, bell)
[reskin] signature miss: action — "The swarm chooses a solid wall, floor, or ceiling within its reach and rings through it, sending a slow funeral peal into whatever lies beyond. Every living creature on the far side of that surface feels the vibration in its bones and begins to age toward death, its body slackening and its breath growing shallow until it can barely stand. The dead and the unliving hear nothing but a distant, famil" [action/save/condition] — the model picked "wail" (no verb) over a concept-verb template (active-toll, sensory-strike)
[reskin] signature idea (trait): "The swarm is not flesh but a chorus of ringings, and it can slide through any barrier the way a sound does. Walls of stone, sealed doors, and even magical barriers cannot keep it out; it simply passes through, still ringing, still patient." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (ring, bell, dying, the dying)
[reskin] signature miss: trait — "The swarm is not flesh but a chorus of ringings, and it can slide through any barrier the way a sound does. Walls of stone, sealed doors, and even magical barriers cannot keep it out; it simply passes through, still ringing, still patient." [trait/always/movement] — the model found no template that holds it (offered: bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): bloodied-burst -> Traits/"Bloodied Burst" ("exact concept match [verb: ring:concept, bell:concept, dying:concept, the dying:concept]")
```


---

## Karn Vex — in the run

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Karn Vex | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hurls a handaxe"
- read: def 3 / off 6 → 4.5; sustained 42 (2 × Shortsword); nova none; dmg 42

```
Karn Vex

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
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
11
+0
+0
MOD
SAVE
CON
14
+2
+2
CHA
10
+0
+0

Skills Perception +3, Stealth +6

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. Karn makes two attacks, using Shortsword or Handaxe in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and Karn has Advantage on its next attack roll against the target before the end of its next turn.

Handaxe. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Slashing damage.

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
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurled handaxe opener [object] | close-with-shortsword follow-up [behavior] | mercenary self-preservation [behavior]
[reskin] print canon route: "a sellsword who hurls a handaxe and closes with a shortsword" is the Warrior Veteran, a bow-user — the hurler seat stands down for the plain line
[reskin] print canon array: STR 16, DEX 16, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, DEX fitted to +6
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a sellsword": nothing landed; Riposte yielded to print's row cap 4
[reskin] signature idea (action): "Karn follows a thrown handaxe with an immediate, lunging shortsword thrust at the same target, closing the distance in a blur of motion. If the axe already wounded that foe this turn, the thrust lands with punishing force; otherwise it is still a quick strike that pulls Karn into melee." [reaction/on_being_hit/damage] — menu: snap-shot, riposte (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — thrown-burst-seed (hurl)
[reskin] signature miss: action — "Karn follows a thrown handaxe with an immediate, lunging shortsword thrust at the same target, closing the distance in a blur of motion. If the axe already wounded that foe this turn, the thrust lands with punishing force; otherwise it is still a quick strike that pulls Karn into melee." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: thrown-burst-seed, snap-shot, riposte, throw-retrieve, rampage, patient-defense, feint-slip, affliction)
[reskin] value check: "Dazzling Burst" EV 2.5 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Karn is a veteran who knows when a fight is lost; the first time it is bloodied, it can immediately retreat without provoking attacks from the foes it was engaged with, slipping away to sell its arm another day." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon yields: "Handaxe" keeps its handaxe — the GM typed it; the Warrior Veteran's Heavy Crossbow prices the row but does not replace the weapon
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Warrior Veteran's
[reskin] print canon: chassis row leaves — Traits/"Wily Footwork" is the seat's, not the Warrior Veteran's
```
