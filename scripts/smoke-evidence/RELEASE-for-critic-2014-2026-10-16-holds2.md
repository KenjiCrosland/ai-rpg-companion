# Release table for the critic — 2014 blocks — 2026-10-16

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-16-holds2.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — holds2-2026-10-16T17-11-11

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Plague Warrenmother | 8 | 2024 | skirmisher-8 | ok | ok | ok | ok | SOFT: languages-type, lint:beast-intelligence | ok | ok | ok | FAIL: save-fit | FAIL (1) | 1/1 | 1/5 |
| Hell's Locksmith | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: save-fit | FAIL (1) | 1/1 | 5/6 |
| Gravepit Crawler | 6 | 2024 | brute-5-grappler | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 2/4 |
| Censersworn Crusader | 8 | 2024 | defender-8-leader | ok | ok | FAIL: multiattack-combination, lint:duplicate-entry | ok | ok | ok | ok | ok | ok | FAIL (1) | 2/2 | 7/7 |
| Dirge Swarm | 13 | 2024 | swarm-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Thing in the Well | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 0/4 |
| Kneeling Vow | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Darkmaw Stalker | 5 | 2024 | lurker-5 | ok | FAIL: under | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 1/1 | 1/5 |

**Dropped 0 of 11 user clauses** (coverage 100%); concept share 57% (20/35 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-8 / reader: 1
- skirmisher-3 / reader: 1
- defender-8-leader / structure: 1
- lurker-5 / bands: 1



---


_No 2014 blocks sampled in this run._

---

## Review batch — classes-eight-2026-10-16T15-53-29

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Open Palm | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 6/6 |
| Ashvowed Kesh | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sergeant Halloran | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Korgan the Scarred Hermit | 8 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Templar Vowsworn | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Hollow Courtier | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: save-fit | FAIL (1) | 1/1 | 3/5 |
| Sister Aurelia | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/6 |
| Shadowsedge Shinobi | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/7 |
| Pine Barrens Toll-Pack | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Brass Penny Imp | 4 | 2024 | skirmisher-3 | ok | SOFT: band | ok | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Warren Maze-Bull | 6 | 2024 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/1 | 4/6 |
| Shield-Sworn Errant | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |
| Whisker Tithe | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/6 |

**Dropped 1 of 19 user clauses** (coverage 95%); concept share 68% (57/84 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-3-leader / reader: 2



---


### Sergeant Halloran — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sergeant Halloran | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Sergeant Halloran
Medium humanoid, neutral
Armor Class

18 (plate)

Hit Points: 

112 (25d8)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

11 (+0)

	

11 (+0)

	

8 (-1)

	

11 (+0)

	

8 (-1)

Skills: 

Athletics +6, Perception +3

Saving Throws: 

STR +6, CON +3

Senses: 

darkvision 60 ft., passive Perception 13

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Pack Tactics. The warrior has advantage on an attack roll against a creature if at least one of the warrior's allies is within 5 feet of the creature and the ally isn't incapacitated.
Second Wind (2/Day). As a bonus action, Halloran regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Halloran misses it with a melee attack roll, Halloran makes one Longsword attack against that creature.

Actions
Multiattack: Halloran makes two Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) slashing damage, and the target has disadvantage on its next attack roll before the start of Halloran's next turn.
Shield Bash: One creature within 5 feet that Halloran can see must succeed on a DC 14 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Where each row came from**

- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "a veteran soldier with a longsword"; weapon longsword
- Actions/Shield Bash — template shield-bash; fighter kit; the GM's clause "bashes with a buckler"
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "a veteran soldier with a longsword"
- Bonus Actions/Second Wind — template second-wind; fighter kit; the GM's clause "a veteran soldier with a longsword"

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a veteran soldier with a longsword who b") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: buckler bash that shoves enemies off-line [behavior] | scarred iron plate and longsword [body]
[concept] identity: The Ironclad Veteran opens by interposing its buckler and longsword, inviting a charge so it can punish the approach with a shield bash that rattles bone and breaks momentum. Every round, it locks blades and bodies with the nearest threat, using timed bashes to shove enemies off-line and deny them passage. Disciplined and unyielding, it fights to the death to hold its position, never fleeing while a single ally stands behind it.
[concept] lore: Once a decorated company sergeant, now bound in scarred plate by an oath that denies retreat, this veteran seeks only to buy time for the living with each drop of its own blood.
[reskin] print canon array: STR 16, DEX 11, CON 11, INT 8, WIS 11, CHA 8 — the Warrior Infantry's, STR fitted to +6
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry — print's rows ride along; the seat stays
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Buckler Bash" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "a veteran soldier with a longsword": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] inline declared: "Halloran" — the call's own answer (person), built from the name; the rules would have said "the sergeant"
[reskin] inline on kit rows: "the sergeant" -> "Halloran"
[reskin] inline form: "Halloran" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (mechanical)
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "Halloran drives his buckler forward into a foe already off-balance, then follows with a lunging thrust from his longsword that only bites when the bash has left them reeling. The bash itself barely hurts on its own; its whole job is to stagger them backward over the floor he has claimed. This pairs naturally with a target he has just rattled with a bash." [rider/on_hit/damage] — menu: stunning-strike, charge-push, hook-rider (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Halloran drives his buckler forward into a foe already off-balance, then follows with a lunging thrust from his longsword that only bites when the bash has left them reeling. The bash itself barely hurts on its own; its whole job is to stagger them backward over the floor he has claimed. This pairs naturally with a target he has just rattled with a bash." [rider/on_hit/damage] — the model found no template that holds it (offered: stunning-strike, charge-push, hook-rider, obstacle-pull, herd)
[reskin] fallback stands down: "a veteran soldier with a longsword who bashes with a buckler" heads on the Warrior Infantry and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Horrid Display (2/Day)" EV 20.9 vs floor 32.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Scarred plate marks every oath Halloran has kept standing, and he never flees a fight while even one ally remains behind him — his discipline simply holds where lesser soldiers break. When he stands his ground against a charge and refuses to give way, the momentum of what strikes him turns back against the attacker." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: guarded-stance, undead-fortitude — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Scarred plate marks every oath Halloran has kept standing, and he never flees a fight while even one ally remains behind him — his discipline simply holds where lesser soldiers break. When he stands his ground against a charge and refuses to give way, the momentum of what strikes him turns back against the attacker." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Warrior Infantry's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon trait: Pack Tactics — "a veteran soldier with a longsword who bashes with a buckler" is the Warrior Infantry (print's own row)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---


### Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: save-fit |

- reader · fail · save-fit: Actions/Opportunist's Lash: a Strength save for an effect that calls for Wisdom or Charisma
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

darkvision 60 ft., passive Perception 10

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Aura of Authority. While in a 10-foot-radius sphere originating from Thurivald, Thurivald and its allies have advantage on attack rolls and saving throws, provided Thurivald is not incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet. The target must succeed on a DC 14 Wisdom saving throw or be charmed until the start of Thurivald's next turn.

Actions
Multiattack: Thurivald makes two attacks: one with Spear and one with Hurlspear. It can replace one attack with a use of Opportunist's Lash.
Spear: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Hurlspear: Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 21 (4d8 + 3) piercing damage.
Opportunist's Lash: One creature within 30 feet that is charmed by Thurivald must make a DC 14 Strength saving throw, taking 14 (4d6) piercing damage on a failed save, or half as much damage on a successful one.
```

**Where each row came from**

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Spear — weapon spear
- Actions/Hurlspear — weapon spear
- Actions/Opportunist's Lash — library seed exploiter
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "Thurivald — a skald"

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=aura — defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=voice/armed mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: a skald's war-song that drives allies into fury [behavior] | an iron-choked voice that carries over any din [body] | the spear he leans on between verses [object]
[concept] identity: Thurivald opens by planting his feet and raising the war-song, and from that moment every ally who can hear him fights above its weight — his voice is the battle line. Each round he keeps the verse alive, striking with his spear between stanzas, repositioning to keep the warband inside the aura, and punishing anyone who tries to silence him. He does not break while the song holds; if bloodied, he fights harder rather than flee, and if the warband falls, he sells his life to finish the verse.
[concept] lore: Thurivald was a skald of the drowned war-bands, bound to iron by his own death-song, and he marches now only to hear a warband roar his verses one last time.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3-leader -> CR 6
[reskin] class kit: bard — "Thurivald — a skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (descriptive)
[reskin] extraction: 5 of 14 model clauses quote nothing the user typed and leave the record ("every ally who can hear him fights above its weight", "Each round he keeps the verse alive", "punishing anyone who tries to silence him", …)
[reskin] signature idea (action): "Thurivald raises his spear high and roars into a war-chant, driving every nearby ally who can hear him to press the attack. Until the start of his next turn, they ignore pain and keep fighting past their limits. The power costs him his whole turn and leaves him open, and it only builds on the fury his presence already stokes." [action/always/condition] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter (+ shelf: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Thurivald raises his spear high and roars into a war-chant, driving every nearby ally who can hear him to press the attack. Until the start of his next turn, they ignore pain and keep fighting past their limits. The power costs him his whole turn and leaves him open, and it only builds on the fury his presence already stokes." [action/always/condition] — the model found no template that holds it (offered: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, riposte)
[reskin] fallback skipped by the floor: herd (EV 7.4 vs 32.1)
[reskin] fallback skipped by the floor: push-prone (EV 2.6 vs 9.9)
[reskin] value check: "Opportunist's Lash" EV 10.9 vs floor 9.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thurivald's voice carries over any din, thick and iron-choked, so nothing the battlefield throws at him can silence him. Whenever he is hit, the blow only feeds his fury, and the war-song he leads grows as he fights on." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] word match declined by the call: resonant-body, absorption, mimicry — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for fury, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Thurivald's voice carries over any din, thick and iron-choked, so nothing the battlefield throws at him can silence him. Whenever he is hit, the blow only feeds his fury, and the war-song he leads grows as he fights on." [trait/on_being_hit/defense] — the model found no template that holds it (offered: bloodied-fury, absorption, bloodied-burst, resonant-body, weapon-lodge, mimicry)
[reskin] weapons answered: Spear = spear; Hurlspear = spear
[reskin] weapon table: "Hurlspear" — thrown, range 20/60
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
audit finding below confidence gate: Opportunist's Lash The ability depends on a target being Charmed by Thurivald, but the only source of Charmed in the block, Captain's Charm, lasts until the start of Thurivald's next turn, meaning the lash is unusable in the same turn it is applied and requires GM-bookkeeping across turns to track a very short-lived condition.
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

