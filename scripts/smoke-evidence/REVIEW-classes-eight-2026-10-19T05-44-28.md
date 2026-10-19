# Review batch — classes-eight-2026-10-19T05-44-28

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Marsh Hand | 5 | 2024 | skirmisher-3 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok | ok | soft (1) | 0/1 | 7/7 |
| Vesper Malachar | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Sarn Vellick | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Karruk the Scarred | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok | soft (1) | 1/1 | 5/5 |
| Anselm Dray | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Émery Laimont | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Thurivald | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | FAIL: print-range | ok | FAIL (1) | 1/1 | 5/5 |
| Marta Vey | 8 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Shadowshed | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/5 |
| Fell Packmother | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Kivrix the Skeleton-Key | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 4/4 |
| Gorehollow Reaver | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |
| Ser Alderin Vaunt | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Whiskerfence | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |

**Dropped 3 of 20 user clauses** (coverage 85%); concept share 97% (68/70 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- defender-5 / reader: 1



---

## Fell Packmother — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Fell Packmother | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Fell Packmother

Large Beast, Unaligned

AC 15
Initiative +3 (13)

HP 60 (8d10 + 16)

Speed 50 ft.

MOD
SAVE
STR
17
+3
+3
INT
3
-4
-4
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
15
+2
+2
CHA
7
-2
-2

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Pack Tactics. The packmother has Advantage on an attack roll against a creature if at least one of the packmother's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The packmother makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

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

**Where each row came from**

- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — the chassis

**Engine trace**

```
[path] twist — Dire Wolf (is) — "a dire wolf" (call)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack hunting encirclement [behavior] | darting bite-and-retreat flanking [behavior] | shaggy wolf-hide and bone-crushing jaws [body]
[concept] identity: The dire wolf pack opens with a fan of low, silent encirclement — one wolf pins the prey's attention while the others slide through cover to take its flanks. Every round after, the pack trades positions: a wolf bites and peels away behind a tree or boulder, forcing the prey to turn, while another closes the gap it left; the pack never commits to a stand-and-fight unless prey is nearly spent. Under pressure, the pack does not break and flee — the wolves fall back, circle, and keep the pincer moving, harrying a wounded target until it drops from blood loss and exhaustion.
[concept] lore: These dire wolves hunt the deep forests and cold foothills in tight family packs, and they want nothing more than to drive a herd — or a party — into the open where the pack can close the ring.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the packmother" — the call's own answer (kind), built from the name; the rules would have said "Fell"
[reskin] inline on kit rows: "Fell" -> "the packmother"
[reskin] inline form: "the packmother" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the packmother bites a creature it has just been circling, it doesn't let go clean—it wrenches and drags the prey off its feet toward open ground, hauling it stumbling in the direction the rest of the pack is waiting. The prey's footing and attention are ruined, leaving it exposed to the wolves closing from every side." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] fit declined: "Stumbling Drag" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the twist path has no shelf — the Dire Wolf's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's AC 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The packmother's thick shaggy hide and crushing jaws are built for the long chase—when it lands a bite on a wounded, flagging creature, the wound keeps bleeding and sapping its strength, so prey that tries to outlast the pack only fades faster." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: faultless-tracker, bloodied-fury, bloodied-burst — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "relentless-pursuit" has no key-table verb, but the call quotes "hunts in a pack" from the description
[reskin] trait declined: "Endless Chase" — a print body takes only what the user's words ask; the call quotes "hunts in a pack", which is no unanswered twist clause — a head, a header, a lack, or a clause the GM's own weapon already answers
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Packrunner" is the seat's, not the Dire Wolf's
```


---

## Marta Vey — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Marta Vey | 8 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 7 / off 8 → 7.5; sustained 54 (2 × Spear); nova none; dmg 54

```
Marta Vey

Medium Humanoid, Neutral

AC 20
Initiative +2 (12)

HP 120 (16d8 + 48)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+8
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+2
WIS
12
+1
+1
MOD
SAVE
CON
16
+3
+6
CHA
15
+2
+2

Skills Athletics +8, Perception +4

Senses Passive Perception 14

Languages Common, Celestial

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Marta, Marta and its allies have Advantage on attack rolls and saving throws, provided Marta doesn't have the Incapacitated condition.

Actions

Multiattack. Marta makes two Spear attacks. It can replace one attack with a use of Shield Bash.

Spear. Melee or Ranged Attack Roll: +8, reach 5 ft. or range 20/60 ft. 27 (5d8 + 5) Piercing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Marta can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Lay on Hands (2/Day). Marta touches a creature within 5 feet of itself and restores 27 (6d8) Hit Points to it.

Divine Smite (2/Day). Marta charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 14 (4d6) Radiant damage.

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

**Where each row came from**

- Traits/Aura of Authority — paladin kit; the GM's clause "crusader"
- Actions/Multiattack — the chassis
- Actions/Spear — print's own row, renamed; weapon spear
- Actions/Shield Bash — print's own row
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant

**Engine trace**

```
[path] class_npc — class paladin — "crusader" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "smites the unclean and mends her soldier" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster-warpriest: ✓ ("smites the unclean and mends her soldier") | caster-warpriest: key "smites" (class verb)
[concept] name: provided_name rejected — "an oathsworn crusader who smites the unc…" is the description, not a name
[concept] hints: warpriest→style ✓ ("smites the unclean, mends her soldiers —")
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: smiting the unclean with holy-charged steel [behavior] | mending wounded soldiers mid-battle [behavior] | iron plate and oath-bound shield [object]
[concept] identity: She opens a fight by planting herself in the front rank and calling down judgmental light on the unclean, then settles into a rhythm of smiting strikes interleaved with prayers that knit her soldiers' wounds shut. Every round she trades a swing of her blessed blade for a word of restoration, treating the battle line as a congregation to be kept standing. Under pressure she does not break or flee — she pulls her wounded behind her shield and dares the enemy to come through her, fighting to the last because an oath unwitnessed is still an oath.
[concept] lore: Sworn to a militant order whose chapel-fortress she garrisoned, she answers the order's summons wherever the unholy gather, believing every wound she mends is a debt the light will one day call in.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon route: the Gladiator is not a caster first and keys STR 18 over DEX 15 — it casts no spells — the caster family stands down for the plain defender line
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: defender-5 -> CR 8
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "an oathsworn crusader who smites the unclean and mends her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "crusader": Aura of Authority (Hobgoblin Captain/Aura of Authority), Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "Marta" — the call's own answer (person), built from the name
[reskin] inline form: "Marta" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (mechanical) [asked: attack] | "mends her soldiers" -> has (mechanical) [asked: heal]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When Marta strikes the unclean, she can let her oath pour through the wound to brand them, so they carry a mark only her sworn blade answers. Until the mark fades, her weapon bites deeper into a marked foe and her nearby soldiers feel the judgment steadying their own hands against it." [rider/on_hit/condition] — menu: stunning-strike, charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: aggro-curse, reveal, curse-debt, rally — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for mend, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When Marta strikes the unclean, she can let her oath pour through the wound to brand them, so they carry a mark only her sworn blade answers. Until the mark fades, her weapon bites deeper into a marked foe and her nearby soldiers feel the judgment steadying their own hands against it." [rider/on_hit/condition] — the model found no template that holds it (offered: rally, stunning-strike, charge-push, hook-rider, aggro-curse, curse-debt, disarm, reveal, own-turn-punisher)
[reskin] fallback respects the call: coating (already on the sheet), rally left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's AC 16 at CR 8, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Marta's banner-oath wraps every ally who stands in her light: while they keep at her side, wounds they take knit faster, as though the congregation's courage feeds their flesh. Step away from her and the prayer loosens." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] trait declined: "Banner of Mending" — bound only on the idea's own words (knits:idea, prayer:idea, prayers:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Longsword = longsword; Sling = sling
[reskin] weapon table: "Sling" rolls Dexterity — +8 → +5
[reskin] weapon table: "Sling" damage off Dexterity — 27 (5d8 + 5) → 24 (5d8 + 2)
[reskin] weapon table: "Sling" — a launcher, never thrown, range 30/120
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common, Celestial" — the Gladiator's plus the concept's Celestial
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Longsword" -> "Spear" — the Gladiator's own row
[reskin] ranged row off: "Sling" leaves — the Gladiator carries no ranged row and the words name none
[reskin] multiattack re-read — "Sling" left; "Multiattack" now reads "Marta makes two Spear attacks."
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
audit finding below confidence gate: Aura of Authority The block is written in third-person ('Marta and its allies') rather than the standard second-person statblock voice used by the other entries ('Marta makes', 'it touches itself'), and the aura grants its benefit only 'while in' the emanation, which is ambiguous about whether allies must be inside or merely near it.
```


---

## Sarn Vellick — a 2014 sheet

**Concept:** a veteran soldier with a longsword who bashes with a buckler

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Sarn Vellick | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 10 → 7; sustained 66 (3 × Longsword); nova none; dmg 66

```
Sarn Vellick
Medium humanoid, neutral
Armor Class

16 (studded leather, shield)

Hit Points: 

112 (15d8 + 45)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

15 (+2)

	

16 (+3)

	

10 (+0)

	

12 (+1)

	

15 (+2)

Skills: 

Athletics +7, Perception +4

Saving Throws: 

STR +7, CON +6

Senses: 

passive Perception 14

Languages: 

Common

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Second Wind (2/Day). As a bonus action, Sarn regains 19 (3d12) hit points.
Riposte (Reaction). When a creature within 5 feet of Sarn misses it with a melee attack roll, Sarn makes one Longsword attack against that creature.

Actions
Multiattack: Sarn makes three Longsword attacks. It can replace one attack with a use of Shield Bash.
Longsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) slashing damage, and the target has disadvantage on its next attack roll before the start of Sarn's next turn.
Shield Bash: One creature within 5 feet of Sarn that it can see must succeed on a DC 15 Strength saving throw or take 10 (3d6) bludgeoning damage, and if the target is Medium or smaller, it is knocked prone.
```

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "a veteran soldier with a longsword"; weapon longsword
- Actions/Shield Bash — template shield-bash; fighter kit; the GM's clause "bashes with a buckler"
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "veteran soldier"
- Bonus Actions/Second Wind — template second-wind; fighter kit; the GM's clause "veteran soldier"

**Engine trace**

```
[path] class_npc — class fighter — "veteran soldier" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("veteran soldier with a longsword who bas") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a veteran soldier with a longsword who b…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: buckler bash to open the guard [object] | longsword follow-up finisher [object] | holds the line and punishes anyone slipping past [behavior]
[concept] identity: A scarred line-holder who steps into the enemy's swing and answers steel with a buckler rim to the teeth before the longsword finishes the job. It fights as a patient, economical duelist, giving ground only to reset its guard, punishing anyone who turns their back or tries to slip past toward softer targets. Bloodied, it does not flee — it digs in, lowers its shoulder, and turns every round into a tighter, meaner exchange until one side is broken.
[concept] lore: A career soldier from a dozen forgotten sieges, it survives by selling its shield-arm's bruises for a killing open — and it wants nothing more than to hold one more line, for one more paymaster, before the body finally gives out.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 114 -> 112, AC 18 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said twist Warrior Infantry)
[reskin] print canon: "a veteran soldier with a longsword who bashes with a buckler" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Buckler Bash" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "veteran soldier": Riposte (riposte), Shield Bash (shield-bash), Second Wind (2/Day) (second-wind)
[reskin] inline declared: "Sarn" — the call's own answer (person), built from the name
[reskin] inline form: "Sarn" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a veteran soldier with a longsword" -> has (descriptive), head | "bashes with a buckler" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "When a foe turns its back or tries to slip past Sarn, he pivots and drives the buckler's rim into its jaw, then whips the longsword around in the same motion to finish the exchange. This strike follows the fleeing or withdrawing creature, so no one gets to walk away from him cleanly." [reaction/on_being_hit/damage] — menu: EMPTY (+ shelf: seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: exploiter, herd, own-turn-punisher — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When a foe turns its back or tries to slip past Sarn, he pivots and drives the buckler's rim into its jaw, then whips the longsword around in the same motion to finish the exchange. This strike follows the fleeing or withdrawing creature, so no one gets to walk away from him cleanly." [reaction/on_being_hit/damage] — the model found no template that holds it (offered: herd, exploiter, own-turn-punisher)
[reskin] fallback respects the call: own-turn-punisher, herd, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Every time Sarn lands a longsword cut, he keeps the blade's momentum and presses in, following with a second sharp draw-cut before the foe can reset its guard. A soldier's economy: one opening, two cuts." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Every time Sarn lands a longsword cut, he keeps the blade's momentum and presses in, following with a second sharp draw-cut before the foe can reset its guard. A soldier's economy: one opening, two cuts." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Longsword = longsword; Buckler Bash = buckler
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon multiattack: "Sarn makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] multiattack re-read — "Longsword" joins the combination; "Sarn makes three attacks, using Spear or Longsword in any combination. It can replace one "
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "Sarn makes three Longsword attacks. It can replace one attack with a use of Shie"
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Marsh Hand — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Marsh Hand | 5 | skirmisher-3 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 8 (print at 5 reads 2–8.5, n=52)
- bands · soft · hot-offense: offense alone reads CR 11, 6 over; the HP axis pulls the read to 8
- **dropped clause:** "strikes pressure points with an open hand"
- read: def 5 / off 11 → 8; sustained 70 (2 × Shortsword); nova none; dmg 70

```
Marsh Hand

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 91 (14d8 + 28)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
16
+3
+3
MOD
SAVE
DEX
18
+4
+7
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

Skills Perception +3, Stealth +7

Resistances Poison

Senses Passive Perception 13

Languages Common, Thieves' cant, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Hold Breath. The marsh hand can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost the marsh hand extra movement, and the marsh hand can move across mud without needing to make an ability check.

Evasion. If the marsh hand is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the marsh hand instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The marsh hand makes two attacks, using Shortsword or Light Crossbow in any combination.

Shortsword. Melee Attack Roll: +7, reach 5 ft. 18 (4d6 + 4) Piercing damage plus 17 (5d6) Poison damage, and the target has the Poisoned condition until the start of the assassin's next turn. Once on each of the marsh hand's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the marsh hand's next turn.

Light Crossbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

Bonus Actions

Patient Defense. The marsh hand takes the Dodge action.

Cunning Action. The marsh hand takes the Dash, Disengage, or Hide action.

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

**Where each row came from**

- Traits/Hold Breath — lizardfolk kit; the GM's clause "monk"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "monk"
- Traits/Evasion — print's own row
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's own row, renamed; a declared feature; the GM's clause "monk"; weapon shortsword
- Actions/Light Crossbow — print's own row, renamed; weapon light crossbow
- Bonus Actions/Patient Defense — template patient-defense; monk kit; the GM's clause "monk"
- Bonus Actions/Cunning Action — print's own row

**Engine trace**

```
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher: ✓ ("strikes pressure points with an open han") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/venomous mind=sapient style=— energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: open-palm pressure-point strikes [behavior] | dart in and disengage hit-and-run [behavior] | venom-tainted flesh that numbs at the touch [body]
[concept] identity: The pressure-point monk opens with a flurry of precise open-palm taps delivered as it darts through a foe's guard, then circles out of reach and waits for the numbing strikes to do their work before slipping back in. Every round it reads its target's body, seeking the joint, the throat, the nerve cluster, and landing one or two taps rather than a brawler's exchange; it fights with the cold patience of a creature who has done this a hundred times and treats a foe's collapse as the plan, not luck. Backed into a corner or facing an enemy it cannot read, it disengages rather than trades blow for blow, regrouping to flank with its kin and strike from a new angle.
[concept] lore: A reptile whose grandmaster taught the old pressure-arts before the temple burned, this monk hunts the marsh roads striking down intruders with a dry hand and a counting eye, believing that every foe felled by a single clean touch is proof of a discipline the world has forgotten.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the monk stands on the Assassin — the class's own print block, nearest CR 5
[reskin] print canon array: STR 11, DEX 18, CON 14, INT 16, WIS 11, CHA 10 — the Assassin's; DEX 18 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] [path] decides: class_npc on the Assassin · class monk (the matcher would have said homebrew)
[reskin] print canon: "a lizardfolk monk who strikes pressure points with an open hand" heads on the Assassin — print's rows ride along; the seat stays
[reskin] repair round 1: 3 defect(s) — renames for "Melee Attack" and "Ranged Attack" are both "Hand" — every row needs its own name (give the thrown twin its own word: Scythe / Hurled Scythe) | name "Hand" repeats the creature's own name — the sheet already says who acts; give the row its own word | name "Hand" repeats the creature's own name — the sheet already says who acts; give the row its own word
[reskin] repair round 2: 1 defect(s) — no damage type for "Numbing Nerve Toss"
[reskin] row evicted for the cap: Traits/"Drifting Step" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] row evicted for the cap: Bonus Actions/"Fleet Agility" (chassis filler) leaves so "Patient Defense" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Pressure-Point Palm Strike), Patient Defense (patient-defense)
[reskin] inline declared: "the marsh hand" — the call's own answer (kind), built from the name
[reskin] inline form: "the marsh hand" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical) [asked: on_hit/attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The marsh hand's venom-laced touch lingers in the struck nerve, and when its palm or thrown nerve strike lands it can spend the opening to make the numbness bloom outward: the wounded foe's fingers go slack and everything it was holding slips free, and for a heartbeat its reach and grip are useless. It is a follow-up read on a hit already landed, not a new strike — the hand watches the body fail t" [rider/on_hit/condition] — menu: charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown riposte, which the GM's words keyed
[reskin] key match declined: action — "riposte" was ranked first on the call's own menu for opening, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The marsh hand's venom-laced touch lingers in the struck nerve, and when its palm or thrown nerve strike lands it can spend the opening to make the numbness bloom outward: the wounded foe's fingers go slack and everything it was holding slips free, and for a heartbeat its reach and grip are useless. It is a follow-up read on a hit already landed, not a new strike — the hand watches the body fail t" [rider/on_hit/condition] — the model found no template that holds it (offered: riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, feint-slip, delayed-brand, rampage, coating)
[reskin] fallback stands down: the class_npc path has no shelf — the Assassin's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The marsh hand's flesh carries a slow, cold venom that numbs anything that grips, grapples, or bites it — an enemy that wraps it up in close contact finds its own limbs going heavy and clumsy, its hold loosening as the count of heartbeats wears on. This is the creature's invitation: grab the dry hand and learn what patience feels like." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] word match declined by the call: adhesive, terrain-walk, absorption, bloodied-burst, resonant-body — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The marsh hand's flesh carries a slow, cold venom that numbs anything that grips, grapples, or bites it — an enemy that wraps it up in close contact finds its own limbs going heavy and clumsy, its hold loosening as the count of heartbeats wears on. This is the creature's invitation: grab the dry hand and learn what patience feels like." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, adhesive, terrain-walk)
[reskin] weapons answered: Hand = none
[reskin] weapon table: "Numbing Nerve Toss" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
[reskin] print canon languages: "Common, Draconic" -> "Common, Thieves' cant, Draconic" — the Assassin's plus the concept's Draconic
[reskin] print canon attack: "Pressure-Point Palm Strike" -> "Shortsword" — the Assassin's own row
[reskin] print canon attack: "Numbing Nerve Toss" -> "Light Crossbow" — the Assassin's own ranged row
[reskin] print canon defenses: resistances none -> Poison — the Assassin's own header lines
[reskin] print canon trait: Evasion — "a lizardfolk monk who strikes pressure points with an open hand" is the Assassin (print's own row)
[reskin] print canon row: Bonus Actions/Cunning Action — the Assassin's own
[reskin] asked but unanswered: "strikes pressure points with an open hand" asked for on_hit and no row binds the clause
[reskin] species kit: Swim 30 ft. — the lizardfolk's
```


---

## Vesper Malachar — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vesper Malachar | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 5 → 5; sustained 34 (2 × Scimitar); nova none; dmg 34

```
Vesper Malachar

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
15
+2
+2
INT
14
+2
+2
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
14
+2
+2

Skills Perception +3, Stealth +9

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Thieves' cant, Infernal

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, Vesper has Advantage on attack rolls against any creature that hasn't taken a turn. If Vesper hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.

Evasion. If Vesper is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Vesper instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Vesper makes two attacks, using Scimitar or Pistol in any combination.

Scimitar. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Pistol. Ranged Attack Roll: +6, range 30/90 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Vesper takes the Dash, Disengage, or Hide action.

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

**Where each row came from**

- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "stalks the rooftops of the old quarter"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "rogue"
- Actions/Multiattack — the chassis
- Actions/Scimitar — print's own row, renamed; weapon scimitar
- Actions/Pistol — print's own row, renamed; weapon pistol
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "rogue"

**Engine trace**

```
[path] class_npc — class rogue — species tiefling — "rogue" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("stalks the rooftops of the old quarter") | skirmisher-skulker: key "stalks" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=fiendish/terror mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: striking from rooftop shadows with advantage [behavior] | infernal tiefling blood [body] | hidden blades and thrown daggers [object]
[concept] identity: A tiefling rogue opens from a rooftop shadow, dropping onto a mark with a blade already drawn and its infernal blood running hot; every round after, it strikes from hiding, breaks line of sight over the old quarter's tiles, and stalks its prey until an opening lets it hit with advantage and vanish again. When bloodied it does not stand and trade—it retreats across the rooftops, taunting its pursuers and picking off the stragglers, fighting to kill only when the odds are its own.
[concept] lore: Born of a deal struck by a distant ancestor, this tiefling holds the old quarter's rooftops as hunting ground, taking payment in secrets and blood from those whose sins it judges deserved.
[reskin] energy withheld: Fire on a Humanoid with no Fire in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 5
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said twist Spy)
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] row evicted for the cap: Traits/"Rooftop Stalker" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "rogue": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "Vesper" — the call's own answer (person), built from the name
[reskin] inline form: "Vesper" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Vesper has a favorite perch it learned to strike from — dropping onto a mark from a rooftop ledge in the same instant it falls. It picks one creature it can see below it and leaps, its blade already out, landing beside the target and catching it with a blow that lands before the victim even turns. The drop is a one-shot commitment tied to height: if nobody's below or the ledge is broken, this simp" [action/always/damage] — menu: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] word match declined by the call: leap, focus — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for stalk, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Vesper has a favorite perch it learned to strike from — dropping onto a mark from a rooftop ledge in the same instant it falls. It picks one creature it can see below it and leaps, its blade already out, landing beside the target and catching it with a blow that lands before the victim even turns. The drop is a one-shot commitment tied to height: if nobody's below or the ledge is broken, this simp" [action/always/damage] — the model found no template that holds it (offered: focus, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter, delayed-brand, aggro-curse, bolt-mark)
[reskin] fallback respects the call: focus left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vesper's infernal blood remembers every wound it deals — the heat of spilled blood calls it back to the same creature. Once it has cut a target, it can track that creature through the old quarter even when line of sight is broken, and the marks deepen on repeated strikes, so stalking a wounded prey makes the next strike bite harder." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: uncanny-sense — the key word does not mean the mechanic here
[reskin] trait declined: "Sanguine Trail" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either
[reskin] weapons answered: Dagger = dagger; Hand Crossbow = hand crossbow
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon languages: "Common, Infernal" -> "Common, Thieves' cant, Infernal" — the Bandit Captain's plus the concept's Infernal
[reskin] print canon attack: "Dagger" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Hand Crossbow" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Stalker" [catalog: faultless-tracker]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Vesper has Advantage on attack rolls against any creature that hasn't taken a turn. If Vesper hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.
Traits / AFTER   Rooftop Stalker: Vesper knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
provenance: catalog template "faultless-tracker", binds stalks, stalk
```


---

## Vareth Solmane — one marked soft

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- read: def 4 / off 5 → 4.5; sustained 33 (3 × Spear); nova none; dmg 33

```
Vareth Solmane

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+2
WIS
12
+1
+1
MOD
SAVE
CON
16
+3
+6
CHA
15
+2
+2

Skills Athletics +7, Perception +4

Senses Passive Perception 14

Languages Common, Celestial

CR 6 (XP 2,300; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Vareth, Vareth and its allies have Advantage on attack rolls and saving throws, provided Vareth doesn't have the Incapacitated condition.

Guard Aura. While in a 10-foot Emanation originating from Vareth, Vareth's allies have Advantage on saving throws, provided Vareth doesn't have the Incapacitated condition.

Actions

Multiattack. Vareth makes three Spear attacks. It can replace one attack with a use of Shield Bash.

Spear. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. 11 (2d6 + 4) Piercing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Vareth can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Bonus Actions

Dawnward Blessing (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

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

**Where each row came from**

- Traits/Aura of Authority — paladin kit; the GM's clause "templar"
- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Spear — print's own row, renamed; weapon spear
- Actions/Shield Bash — print's own row
- Bonus Actions/Dawnward Blessing — template rally; library draw (seed unstamped); the GM's clause "blesses her soldiers"; binds the GM's words: blessing+bless+shield

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] defender-leader type=Humanoid mechanics=aura — casts: implied by the kind — "a templar priest of the dawn who blesses" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("blesses her soldiers") | caster-warpriest: the call read "blesses" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Vareth Solmane" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/celestial mind=sapient style=leader energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: aura
[concept] signature elements: dawn blessing that hardens her soldiers [aura] | templar captain fighting in the front rank [behavior] | sun-marked censer and mace [object]
[concept] identity: Vareth opens by raising her sun-rimmed censer and shouting a dawn blessing, wrapping her soldiers in a radiant aura that hardens their resolve before she steps into the front line. Each round she fights shoulder to shoulder with her troops, parrying blows meant for them and returning strikes with her mace while re-centering the aura, so breaking her formation means breaking her. She is disciplined and self-possessed: if bloodied she withdraws behind her shield wall to re-bless, but she does not abandon her soldiers or flee the field.
[concept] lore: Vareth Solmane is a templar-priest of the dawn order who took the field as a captain of the faithful, certain that a consecrated banner and a living shield line will hold back the dark until sunrise.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon route: the Gladiator's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Censer" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Censer" Radiant -> Piercing (the body's physical type; a Humanoid deals no Radiant its concept never gave it)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (mechanical) [asked: buff_ally]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vareth raises her sun-rimmed censer and calls down the dawn blessing, and any soldier of hers standing close enough to be shielded by her presence glows faintly and fights on with fresh courage, shrugging off whatever fear or weariness had seized them. She can do this even in the thick of the melee, and it costs her only a moment of attention between swings." [trait/start_of_turn/resource] — menu: warded-mending (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] signature template: rally -> Bonus Actions/"Dawnward Blessing (2/Day)" ("the censer blesses nearby allies so they fight on with fresh courage, matching t [verb: blessing:concept, bless:concept, shield:idea]")
[reskin] keys spent by the action: blessing, bless
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "When an enemy strikes at one of Vareth's allies within her guard, she steps into the blow with her shield-mace raised, deflecting it onto her own guard and answering with a return strike of her own." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "When an enemy strikes at one of Vareth's allies within her guard, she steps into the blow with her shield-mace raised, deflecting it onto her own guard and answering with a return strike of her own." [trait/on_being_hit/defense] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Mace = mace; Censer = none
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common, Celestial" — the Gladiator's plus the concept's Celestial
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Mace" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Censer leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon multiattack: "Vareth makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] row binds its clause: "Dawnward Blessing" answers "blesses her soldiers" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Aura of Authority The entry name 'Aura of Authority' promises a dominant/command effect but the text is a generic buff aura covering attack rolls and saves with no authority mechanic.
[harness] re-rolled Actions/"Spear" -> "Spear" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Spear: *Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 20/60 ft. 11 (2d6 + 4) Piercing damage.
Actions / AFTER   Spear: *Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 20/60 ft. 11 (2d6 + 4) Piercing damage. On a Hit, one ally of Vareth's choice within 10 feet of the target gains 5 (1d10) Temporary Hit Points.
provenance: none — the call wrote the text itself
```


---

## Dame Oriel — in the run

**Concept:** name: Dame Oriel | a knight who holds the line with a shield and a longsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 10 → 7; sustained 66 (3 × Longsword); nova none; dmg 66

```
Dame Oriel

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+2
WIS
12
+1
+1
MOD
SAVE
CON
16
+3
+6
CHA
15
+2
+2

Skills Athletics +7, Perception +4

Senses Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Guarded Stance. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that Dame Oriel can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

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

**Where each row came from**

- Traits/Guarded Stance — template guarded-stance; fighter kit; the GM's clause "keeps the line with a shield and a longsword"
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "keeps the line with a shield and a longsword"; weapon longsword
- Actions/Shield Bash — print's own row
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "a knight"

**Engine trace**

```
[path] class_npc — class fighter — "a knight" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("keeps the line with a shield and a longs") | defender: key "keeps the line" (class verb)
[concept] name: "Dame Oriel" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: shield wall that holds the line [behavior] | the longsword's punishing short cut [object] | unshakeable defensive steadfastness [aura]
[concept] identity: Dame Oriel plants herself in the widest gap and dares the enemy line to come through her — shield high, longsword low, inviting the charge she intends to break. Every round she holds ground, turning aside the first blow and answering with a short, economical cut that punishes anyone who steps past her guard or ignores her. She never gives ground willingly; bloodied, she only braces harder, trading space for time because the line does not fall while she stands.
[concept] lore: A veteran of a dozen forgotten sieges, Dame Oriel holds the last doorway of a keep whose lords are long dead, and she will admit no one she has not been ordered to admit.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] print canon defenses: HP 78 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 5
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Dame Oriel — a knight who keeps the line with a shield and a longsword" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Swordpoint Lunge" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical) [asked: attack]
[reskin] signature idea (action): "When a creature moves within reach of Dame Oriel's longsword, she can swing her blade to check its advance, herding it back the way it came so the line never breaks. The creature must give up that movement and very likely stays pinned where the shield wall wants it. She can only do this so often before the opening is spent." [reaction/on_being_hit/movement] — menu: EMPTY (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] word match declined by the call: rally — the key word does not mean the mechanic here
[reskin] fit declined: "Line-Check Advance (2/Day)" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: rally left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Whenever Dame Oriel's longsword bites into a foe, the wound saps its will to swing back, and the ache lingers into its next turn if she keeps the pressure on. A foe that has already been cut and hesitates finds her next short economical cut coming in under its raised guard." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Whenever Dame Oriel's longsword bites into a foe, the wound saps its will to swing back, and the ache lingers into its next turn if she keeps the pressure on. A foe that has already been cut and hesitates finds her next short economical cut coming in under its raised guard." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] weapons answered: Longsword = longsword; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "Dame Oriel makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
audit finding below confidence gate: Shield Bash Prone is imposed on a failed save with no escape clause, but Prone carries its own exit (standing up) and thus this is not a no-counterplay removal.
[reskin] audit rename blocked — "Longsword" is the user's own part name, a kit feature's real name, or print's own row
[reskin] multiattack re-read — "Longsword" joins the combination; "Dame Oriel makes three attacks, using Spear or Longsword in any combination. It can replac"
[reskin] multiattack re-read: "Spear" is not on this sheet, so the combination now reads "Dame Oriel makes three Longsword attacks. It can replace one attack with a use o"
```


---

## Karruk the Scarred — in the run

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Karruk the Scarred | 8 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (2 × Spear); nova none; dmg 54

```
Karruk the Scarred

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 150 (20d8 + 60)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+8
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+2
WIS
12
+1
+1
MOD
SAVE
CON
16
+3
+6
CHA
15
+2
+2

Skills Athletics +8, Perception +4

Senses Passive Perception 14

Languages Common, Giant

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Karruk starts its turn Bloodied, roll 1d6. On a 6, Karruk goes berserk. On each of its turns while berserk, Karruk attacks the nearest creature it can see. If no creature is near enough to move to and attack, Karruk attacks an object. Once Karruk goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Karruk has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Karruk extra movement, and Karruk can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Karruk makes two Spear attacks. It can replace one attack with a use of Shield Bash.

Spear. Melee or Ranged Attack Roll: +8, reach 5 ft. or range 20/60 ft. 27 (5d8 + 5) Piercing damage.

Shield Bash. Strength Saving Throw: DC 16, one creature within 5 feet that Karruk can see. Failure: 27 (6d8) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

Bonus Actions

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, Karruk moves up to half its Speed without provoking Opportunity Attacks, and it makes one Spear attack.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Spear — print's own row, renamed; weapon spear
- Actions/Shield Bash — print's own row
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "berserker"
- Bonus Actions/Rampage — template rampage; library draw (seed unstamped); the GM's clause "loses control when wounded"; binds the GM's words: wound

**Engine trace**

```
[path] class_npc — class barbarian — species goliath — "berserker" (call)
[route] brute type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute: ✓ ("a goliath berserker who loses control wh") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Humanoid themes=bestial/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: losing control when wounded into an all-out offensive fury [behavior] | a massive two-handed blade swung without regard for defense [object] | blood that boils hotter and drives the body past its limits with every wound tak [body]
[concept] identity: The goliath berserker wades in behind a two-handed blade, spending its first rounds trading heavy, straightforward blows with the biggest foe on the field. Once it takes a wound, however, the fight changes — it stops guarding entirely and turns every hit it absorbs into a wider, wilder swing, roaring and pressing forward until either it or everything in front of it is down. It never retreats, and a wounded one will ignore fleeing prey to finish whatever is still standing.
[concept] lore: Born among mountain goliath clans that exile any warrior who cannot master the fury burning under the skin, these outcasts wander the passes taking mercenary work they know will eventually kill them.
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon array: STR 20, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +8
[reskin] donor: brute-5 -> CR 8
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "a goliath berserker who loses control when wounded" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] species kit: goliath — "berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] inline declared: "Karruk" — the call's own answer (person), built from the name
[reskin] inline form: "Karruk" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (mechanical) [asked: when_bloodied/buff_self]
[reskin] signature idea (action): "When Karruk swings his greatsword, he can throw his whole scarred body into the blow, crashing forward through everything in his path. The blade carves through the target and any other creature standing in a wide sweep in front of him, and the sheer force shoves survivors out of his reach as he barges in to close the gap. This reckless lunge costs him his footing — until he's wounded, when the wou" [action/always/damage] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] word match declined by the call: affliction, push-prone, thrown-burst, thrown-burst-seed, throw-retrieve — the key word does not mean the mechanic here
[reskin] signature template: rampage -> Bonus Actions/"Rampage (1/Day)" ("Losing control when wounded and lashing out — the reckless lunge that surges tow [verb: wound:concept]")
[reskin] keys spent by the action: wound
[reskin] signature idea (trait): "Every … Karruk suffers feeds the fury instead of slowing it. Whenever something hurts him, the pain goads him onward: he immediately lurches toward the source of the pain, and the next blow he lands strikes with the accumulated rage of every hit taken since his last swing." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-fury, bloodied-burst (wounded)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, absorption, relentless-pursuit, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, bloodied-burst, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for wounded, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Every … Karruk suffers feeds the fury instead of slowing it. Whenever something hurts him, the pain goads him onward: he immediately lurches toward the source of the pain, and the next blow he lands strikes with the accumulated rage of every hit taken since his last swing." [trait/on_being_hit/movement] — the model found no template that holds it (offered: bloodied-fury, bloodied-burst, absorption, resonant-body, weapon-lodge, relentless-pursuit)
[reskin] weapons answered: Greatsword = greatsword; Javelin = javelin
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Giant" -> "Common, Giant" (sapient)
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Giant" -> "Common, Giant" — the Gladiator's plus the concept's Giant
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Greatsword" -> "Spear" — the Gladiator's own row
[reskin] ranged row off: "Javelin" leaves — the Gladiator carries no ranged row and the words name none
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "Karruk makes two Spear attacks."
[reskin] print canon row priced: Shield Bash — dice 9 → 27
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
[reskin] row binds its clause: "Rampage" answers "loses control when wounded" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "loses control when wounded" -> "Berserk" — trigger: asked when_bloodied, row reads at_will
audit finding below confidence gate: Berserk The berserk condition is keyed to being Bloodied for its duration, but the trigger requires a d6 roll only at the start of a turn while Bloodied, leaving unclear whether a successful roll is needed each time it becomes Bloodied again after healing above the threshold.
```


---

## Anselm Dray — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Anselm Dray | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 30 (2 × Longsword); nova none; dmg 30

```
Anselm Dray

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
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
14
+2
+4
MOD
SAVE
CON
16
+3
+5
CHA
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Anselm, Anselm and its allies have Advantage on attack rolls and saving throws, provided Anselm doesn't have the Incapacitated condition.

Actions

Multiattack. The guard makes two attacks, using Longsword or Mace in any combination.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of Anselm's next turn.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Anselm's next turn.

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

**Where each row came from**

- Traits/Aura of Authority — paladin kit; the GM's clause "templar"
- Actions/Multiattack — the chassis
- Actions/Mace — authored for this sheet; a named part; a declared feature; the GM's clause "a templar priest with a mace"; weapon mace
- Actions/Longsword — print's own row; authored for this sheet; a named part; a declared feature; the GM's clause "a templar priest with a mace"; weapon longsword

**Engine trace**

```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a templar priest with a mace and no magi") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a templar priest with a mace and no magi…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: iron mace and shield discipline [object] | holds the line and punishes anyone who moves past [behavior] | magicless faith [aura]
[concept] identity: A disciplined holy soldier who advances behind a shield, opens by body-checking the front line and striking with a consecrated iron mace, then plants himself in a chokepoint and punishes anyone who tries to slip past with a brutal backhand swing. He never breaks and never chases — he outlasts, repositions one step at a time, and fights to the death because retreat is desertion.
[concept] lore: A templar sworn to a silent, magicless order that holds faith in iron and drill rather than miracles, he is posted to cruel bottlenecks where his stubbornness is the only miracle on offer.
[reskin] [path] class body: the paladin stands on the Guard Captain — the class's own print block, nearest CR 4
[reskin] print canon defenses: HP 65 -> 75, AC 19 -> 18 — the Guard Captain's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 18 (breastplate, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 14, CON 16, INT 12, WIS 14, CHA 13 — the Guard Captain's at its own CR; attack +6 -> +6, DC 14 (print's)
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] class array: CHA 13 -> 14 — a paladin casts off it
[reskin] [path] decides: class_npc on the Guard Captain · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Guard Captain — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Ranged Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "Anselm" — the call's own answer (person), built from the name
[reskin] inline form: "Anselm" — the model's own reading of the name
[reskin] lacks asked: "no magic at all"
[reskin] asked field dropped: the call answered trigger "at_will" for "a templar priest with a mace" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "a templar priest with a mace" but offered no quote
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "When a foe within his reach tries to slip around or past Anselm rather than fight him, he lashes out with a brutal backhand swing of the mace that stops the mover cold and leaves them reeling and exposed. It fires only against someone angling to get by him — a coward's move, not a charge into his face — so he can punish the line-breakers without spending his own turn on chasers." [reaction/on_being_hit/condition] — menu: snap-shot, riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, charge-push, hook-rider)
[reskin] word match declined by the call: riposte, snap-shot, slow-bolt, reveal, obstacle-pull, own-turn-punisher — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When a foe within his reach tries to slip around or past Anselm rather than fight him, he lashes out with a brutal backhand swing of the mace that stops the mover cold and leaves them reeling and exposed. It fires only against someone angling to get by him — a coward's move, not a charge into his face — so he can punish the line-breakers without spending his own turn on chasers." [reaction/on_being_hit/condition] — the model found no template that holds it (offered: snap-shot, riposte, own-turn-punisher, obstacle-pull, slow-bolt, reveal)
[reskin] fallback respects the call: own-turn-punisher left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Guard Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Anselm plants himself like a post and does not give ground; anyone who shoves, grapples, or tries to drive him back finds him immovable, and the shield work that keeps him standing means he shrugs off the first real blow each fight without flinching. His discipline is the whole of his armor." [trait/on_being_hit/defense] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: undead-fortitude — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Anselm plants himself like a post and does not give ground; anyone who shoves, grapples, or tries to drive him back finds him immovable, and the shield work that keeps him standing means he shrugs off the first real blow each fight without flinching. His discipline is the whole of his armor." [trait/on_being_hit/defense] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, undead-fortitude)
[reskin] weapons answered: Mace = mace; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Guard Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon row: Actions/Longsword — the Guard Captain's second melee row, beside the chassis's
[reskin] print canon multiattack: "The guard makes two attacks, using Javelin or Longsword in any combination." — the Guard Captain's own
[reskin] ranged row off: "Thrown Mace Strike" leaves — the Guard Captain carries no ranged row and the words name none
[reskin] multiattack normalised: "The guard makes two attacks, using Longsword or Mace in any combination."
```


---

## Émery Laimont — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Émery Laimont | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (3 × Arcane Burst); nova none; dmg 48

```
Émery Laimont

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

Senses Passive Perception 14

Languages Common and any three languages

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The émery laimont makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 20/60 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The émery laimont casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). The émery laimont casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Trigger: The émery laimont is hit by an attack roll. Response: The émery laimont casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Arcane Burst — print's own row, renamed
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — mage kit; the GM's clause "wizard"
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"

**Engine trace**

```
[path] class_npc — class mage — "wizard" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: on the GM's own words "a court wizard" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | caster: ✓ ("a court wizard") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Force mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: never where the blow lands; steps away from every strike [behavior] | a courtier's shadow worn as a body [body] | spellcraft answered from empty air [aura]
[concept] identity: A court wizard whose body is a thin shell of shadow, it opens combat by standing exactly where the enemy expects the next bolt to come from, then is simply elsewhere when they answer. Each round it trades ground for position, unpicking attacks with a half-step and a smirk while its magic answers from the space it just vacated, always buying distance rather than taking damage. Under pressure it does not panic but toys — never fully retreating, letting pursuers exhaust themselves chasing a wizard who was never there, and only truly fleeing once the court's spells run dry.
[concept] lore: Bound into a courtier's shadow by a ritual he himself wrote, this wizard serves whichever hall will keep his spellbook fed, absorbing the position of every rival who tries to strike him down.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 89 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said twist Mage)
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] name_element answered: Shadow Dart = imagery
[reskin] name element refused: "Shadow Dart" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline by rule: "the émery laimont" — the call answered "Émery" (person), which the name does not support
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "steps away" names no absence — nothing in it takes anything away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Émery flings a shadow dart at a foe, and the instant it lands he is no longer standing where he threw it — the shadow he sheds peels off and pools as a second, dimmer Émery in the spot he just vacated, which the enemy can only mistake for him and hit in his stead. The double lasts until it is struck or until Émery steps into it again to reclaim the ground, and it may only be shed this way while he" [rider/on_hit/defense] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, delayed-brand, curse-debt, zone-seed, reveal, wind-up, blighted-ground, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] fit declined: "Shadow Step (2/Day)" — a print body takes only what the user's words ask; the call quotes "steps away", which is no unanswered twist clause — a head, a header, a lack, or a clause the GM's own weapon already answers (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Mage's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Anyone who strikes Émery finds their blow passing through a courtier's shadow rather than flesh, and the position they committed to becomes his — the attacker is dragged a half-step off their footing toward the space Émery was, leaving them badly placed for the blows that follow." [trait/on_being_hit/movement] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown evasion, which the GM's words keyed
[reskin] key match declined: trait — "evasion" was ranked first on the call's own menu for never where, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Anyone who strikes Émery finds their blow passing through a courtier's shadow rather than flesh, and the position they committed to becomes his — the attacker is dragged a half-step off their footing toward the space Émery was, leaving them badly placed for the blows that follow." [trait/on_being_hit/movement] — the model found no template that holds it (offered: evasion, absorption, bloodied-burst, resonant-body, aberrant-ground, faultless-tracker)
[reskin] concept-first trait skipped: evasion — the GM's words key it, but the call was offered it against those words and declined
[reskin] weapons answered: Shadow Dart = none
[reskin] weapon declined: "Shadow Dart" reads dart from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Shadow Dart" — thrown, range 20/60
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Shadow Dart" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
```


---

## Thurivald — in the run

**Concept:** name: Thurivald | a skald who sings his warband into a fury

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Thurivald | 6 (2014) | defender-5 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | FAIL: print-range | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- reader · fail · print-range: Actions/Hurlaxe: range 30/90 is not the Hurlaxe's 20/60
- read: def 3 / off 7 → 5; sustained 45 (3 × Hurlaxe); nova none; dmg 45

```
Thurivald
Medium humanoid, neutral
Armor Class

17 (splint)

Hit Points: 

84 (13d8 + 26)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

18 (+4)

	

14 (+2)

	

10 (+0)

	

14 (+2)

	

17 (+3)

Skills: 

Athletics +3, Perception +5

Saving Throws: 

STR +3, CON +5

Senses: 

passive Perception 15

Languages: 

Common plus one other language

Challenge

6 (2,300 XP)

Proficiency Bonus:

+3

Guard Aura. While in a 10-foot-radius sphere originating from Thurivald, Thurivald's allies have advantage on saving throws, provided Thurivald is not incapacitated.
Captain's Charm. As a bonus action, Thurivald targets one creature it can see within 30 feet of it. The target must succeed on a DC 14 Wisdom saving throw or be charmed by Thurivald until the start of Thurivald's next turn.

Actions
Multiattack: The thurivald makes three attacks, using Rapier, Pistol, or Hurlaxe.
Rapier: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage, and the thurivald has advantage on the next attack roll it makes before the end of this turn.
Hurlaxe: Ranged Weapon Attack: +7 to hit, range 30/90 ft., one target. Hit: 15 (2d10 + 4) piercing damage.
Pistol: Ranged Weapon Attack: +7 to hit, range 30/90 ft., one target. Hit: 15 (2d10 + 4) piercing damage.
```

**Where each row came from**

- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Rapier — print's own row, renamed; weapon rapier
- Actions/Hurlaxe — print's own row; weapon handaxe
- Actions/Pistol — print's own row; weapon pistol
- Bonus Actions/Captain's Charm — bard kit; the GM's clause "skald"

**Engine trace**

```
[path] class_npc — class bard — "skald" (call)
[route] defender-leader type=Humanoid mechanics=aura — casts: implied by the kind — "sings his warband into a fury" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender-leader: ✓ ("sings his warband into a fury") | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Thurivald" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid themes=voice/armed mind=sapient style=leader energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Thurivald"
[concept] mechanics: aura
[concept] signature elements: the driving warcry that whips allies into fury [aura] | parrying and brawling beside his troops with axe-haft and shield [behavior] | the skald's belt-drum and notched war-axe [object]
[concept] identity: Thurivald opens by roaring a verse of his warcry across the line, and every ally that hears it throws itself forward with doubled fury while he plants his shieldless frame between them and the enemy. Each round he keeps the song alive — hammering out a driving rhythm with his voice and drum while parrying blows with the notched haft of his axe, spending his own blood to keep a wounded thane standing. He does not break; when the warband is cut down around him he sings harder and fights to the last verse, defiant and roaring rather than fleeing.
[concept] lore: Thurivald was the last singer of a mercenary warband that hired itself to a doomed king, and when the king's hall burned he bound his voice to the band's oath so that no skaldsong he raises can ever be silenced until the last oathsworn falls.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the bard stands on the Pirate Captain — the class's own print block, nearest CR 6
[reskin] print canon route: the Pirate Captain's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 114 -> 84, AC 18 -> 17 — the Pirate Captain's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 18, CON 14, INT 10, WIS 14, CHA 17 — the Pirate Captain's at its own CR; attack +6 -> +7, DC 14 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] [path] decides: class_npc on the Pirate Captain · class bard (the matcher would have said homebrew)
[reskin] print canon: "Thurivald — a skald who sings his warband into a fury" heads on the Pirate Captain — print's rows ride along; the seat stays
[reskin] class kit: bard — "skald": Captain's Charm (Pirate Captain/Captain's Charm); Bolstering Cry yielded to print's row cap 5
[reskin] proper noun: "Thurivald" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Thurivald" — the call's own answer (person), built from the name
[reskin] inline form: "Thurivald" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Thurivald — a skald" -> has (descriptive), head | "sings his warband into a fury" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When Thurivald strikes a foe at close range, he pivots the horned rim of his shieldless arm across his body to catch a blow meant for a comrade, and the next enemy who swings at one of his allies finds Thurivald's axe-haft already there, knocking the attack aside with a ringing crack. The deflected attacker is left open and staggering, its guard broken for a moment so the warband can answer." [reaction/on_being_hit/defense] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, exploiter, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] fit declined: "Shield-Break Riposte" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Pirate Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 17 already beats print's AC 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Thurivald's warcry never truly ends once raised — as long as he is still standing and singing, the driving rhythm of his verse keeps his nearby allies moving as if their blood were fire, letting them press forward and hit harder each round he keeps the song alive." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bloodied-fury (fury)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, berserk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-fury" was ranked first on the call's own menu for fury, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Thurivald's warcry never truly ends once raised — as long as he is still standing and singing, the driving rhythm of his verse keeps his nearby allies moving as if their blood were fire, letting them press forward and hit harder each round he keeps the song alive." [trait/always/damage] — the model found no template that holds it (offered: bloodied-fury, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst)
[reskin] weapons answered: Hatchet = handaxe; Hurlaxe = handaxe
[reskin] weapon declared: "Hatchet" is a handaxe — the call's own answer
[reskin] weapon table: "Hurlaxe" — thrown, range 20/60
[reskin] print canon alignment: Neutral Good -> Neutral — the Pirate Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Pirate Captain's
[reskin] print canon row: Actions/Pistol — the Pirate Captain's own ranged row, added (the chassis carried none to rename)
[reskin] print canon attack: "Hatchet" -> "Rapier" — the Pirate Captain's own row
[reskin] print canon multiattack: "The pirate makes three attacks, using Rapier or Pistol in any combination." — the Pirate Captain's own
[reskin] print canon attack: "Pistol" is print's own row — +7, 15 (2d10 + 4), range 30/90 ft. (an exact body at print's CR)
[reskin] print canon attack kept: "Hurlaxe" stays — "Pistol" is already a row on this sheet
[reskin] print canon attack: "Pistol" is print's own row — +7, 15 (2d10 + 4), range 30/90 ft. (an exact body at print's CR)
[reskin] multiattack normalised: "The pirate makes three attacks, using Rapier, Pistol, or Hurlaxe in any combination."
[reskin] 2014 conversion: one lint-gated call — both printings saved
```


---

## Shadowshed — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Shadowshed | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "moves through the shadows"
- read: def 5 / off 5 → 5; sustained 34 (2 × Scimitar); nova none; dmg 34

```
Shadowshed

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
15
+2
+2
INT
14
+2
+2
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
14
+2
+2

Skills Perception +3, Stealth +9

Senses Passive Perception 13

Languages Common, Thieves' cant

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, the shadowshed has Advantage on attack rolls against any creature that hasn't taken a turn. If the shadowshed hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.

Evasion. If the shadowshed is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the shadowshed instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The shadowshed makes two attacks, using Scimitar or Pistol in any combination.

Scimitar. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Pistol. Ranged Attack Roll: +6, range 30/90 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The shadowshed takes the Dash, Disengage, or Hide action.

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

**Where each row came from**

- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "strikes unseen"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "ninja"
- Actions/Multiattack — the chassis
- Actions/Scimitar — print's own row, renamed; weapon scimitar
- Actions/Pistol — print's own row, renamed; weapon pistol
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "ninja"

**Engine trace**

```
[path] class_npc — class rogue — "ninja" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("strikes unseen") | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=uncanny/armed mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: melting into shadows and vanishing [behavior] | striking unseen from concealment with a blade [behavior] | a body that is half shadow, allowing it to slip between dark spaces [body]
[concept] identity: The shadow-ninja opens combat by sliding into a patch of darkness and simply vanishing from sight, then re-emerging behind a foe to drive a blade into an unguarded back before the target can turn. Every round it repeats the pattern — melt into shadow, reposition unseen, strike with advantage — and never stays in melee it did not choose. It is a disciplined, patient killer that toys with prey from concealment and only breaks off when cornered and bleeding, preferring to fade and re-engage rather than trade blows honestly.
[concept] lore: Trained in a hidden mountain order that taught its initiates to shed their own shadows and wear them as cloaks, the ninja now sells silent deaths to whoever pays — and considers each kill a meditation on the space between what is seen and what is real.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 5
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said homebrew)
[reskin] print canon: "a ninja who moves through the shadows and strikes unseen" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] class kit: Cunning Action — the sheet already carries it, so the rogue kit adopts that row: the cap may no longer read it as filler
[reskin] row evicted for the cap: Traits/"Shadowstep" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "ninja": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "the shadowshed" — the call's own answer (kind), built from the name; the rules would have said "Shadowshed"
[reskin] inline form: "the shadowshed" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] asked field dropped: the call answered limit "at_will" for "moves through the shadows" but offered no quote
[reskin] asked field dropped: the call answered limit "at_will" for "strikes unseen" but offered no quote
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (mechanical) [asked: movement] | "strikes unseen" -> has (mechanical) [asked: attack]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The shadowshed steps into an area of shadow or dim light and unravels into it, becoming a smear of darkness that the eye slides off — it moves unseen through that darkness to any point within it or adjacent to it and reappears there. Anyone it left behind loses track of where it went; the moment it emerges, the first strike it lands before the end of its next turn catches the target completely una" [bonus_action/always/movement] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] word match declined by the call: self-invisibility, focus, coating — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown self-invisibility, which the GM's words keyed
[reskin] key match declined: action — "self-invisibility" was ranked first on the call's own menu for unseen, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The shadowshed steps into an area of shadow or dim light and unravels into it, becoming a smear of darkness that the eye slides off — it moves unseen through that darkness to any point within it or adjacent to it and reappears there. Anyone it left behind loses track of where it went; the moment it emerges, the first strike it lands before the end of its next turn catches the target completely una" [bonus_action/always/movement] — the model found no template that holds it (offered: self-invisibility, rampage, patient-defense, second-wind, aggro-curse, focus, feint-slip, coating, gaze-single, sensory-strike, bolt-mark)
[reskin] fallback respects the call: self-invisibility left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Where darkness pools, the shadowshed's flesh thins into shadow-stuff, letting it slip through gaps and seams no body should fit through — and it leaves no reflection, footprint, or cast shadow to betray which way it went. Light thrown on it is the one thing its body cannot wear; standing in bright light, it is merely a man." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Where darkness pools, the shadowshed's flesh thins into shadow-stuff, letting it slip through gaps and seams no body should fit through — and it leaves no reflection, footprint, or cast shadow to betray which way it went. Light thrown on it is the one thing its body cannot wear; standing in bright light, it is merely a man." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] weapons answered: Tanto = dagger; Shuriken = dart
[reskin] weapon declared: "Tanto" is a dagger — the call's own answer
[reskin] weapon declared: "Shuriken" is a dart — the call's own answer
[reskin] weapon table: "Shuriken" — thrown, range 20/60
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Tanto" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Shuriken" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Scimitar)
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 13" -> "Passive Perception 13")
```


---

## Kivrix the Skeleton-Key — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Kivrix the Skeleton-Key | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "picks locks for a devil"
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Scimitar); nova none; dmg 26

```
Kivrix the Skeleton-Key

Tiny Fiend, Neutral

AC 16
Initiative +4 (14)

HP 67 (15d4 + 30)

Speed 30 ft.

MOD
SAVE
STR
15
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
18
+4
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
14
+2
+2

Skills Perception +2, Stealth +6

Resistances Cold

Immunities Poison; Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Common, Thieves' cant, Infernal

CR 4 (XP 1,100; PB +2)

Traits

Evasion. If Kivrix is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Kivrix instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Kivrix makes two attacks, using Scimitar or Pistol in any combination.

Scimitar. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Slashing damage.

Pistol. Ranged Attack Roll: +6, range 30/90 ft. 13 (2d8 + 4) Piercing damage.

Bonus Actions

Nimble Escape. Kivrix takes the Disengage or Hide action.

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

**Where each row came from**

- Traits/Evasion — template evasion; rogue kit; the GM's clause "rogue"
- Actions/Multiattack — the chassis
- Actions/Scimitar — print's own row, renamed; weapon scimitar
- Actions/Pistol — print's own row, renamed; weapon pistol
- Bonus Actions/Nimble Escape — rogue kit; the GM's clause "rogue"

**Engine trace**

```
[path] class_npc — class rogue — "rogue" (call)
[route] skirmisher-skulker type=Fiend mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("an imp rogue who picks locks") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/grasping mind=sapient style=skulker energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: picking locks and prising open sealed places [behavior] | skulking and vanishing through shadow [behavior] | the lockpick it wields [object]
[concept] identity: The imp opens by slipping into a shadowed alcove and picking the lock on whatever cage, chest, or cell door it was sent for, then vanishes mid-turn and reappears behind the nearest mark with a thin lockpick-sized blade between its knuckles. Each round it flicks from cover to cover, prising locks loose while its devil master's foes blunder after it, and it never fights fair or stands still. When bloodied it does not flee but shrieks for its master and dives for the deepest keyhole it can wedge itself into, willing to bargain, whine, or sell out its own errand rather than die.
[concept] lore: A minor fiend bound by infernal contract to a devil who prizes what it cannot reach, the imp is lent out as a lockpick and catspaw, opening vaults and cells it was never meant to touch in exchange for the promise of a larger chain of favors.
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 4
[reskin] the concept outranks the alias: the Bandit Captain is a Humanoid and the concept reads Fiend — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon route: the Bandit Captain's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 15, DEX 18, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said twist Imp)
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] row evicted for the cap: Traits/"Skitter" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "rogue": Cunning Action (Assassin/Cunning Action), Evasion (evasion)
[reskin] inline declared: "Kivrix" — the call's own answer (person), built from the name
[reskin] inline form: "Kivrix" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Kivrix jams its lockpick into a held, worn, or carried object on a creature it can reach — a shield, a belt, a sword's pommel, a lockbox — and springs it open or loose. In the creature's next moment of need that object fails or flies free: the strap gives way, the clasp snaps, the shield tumbles off the arm, and whatever the thing was holding or protecting spills out. Kivrix can only do this to a " [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, bolt-restrain (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — bolt-restrain (locks)
[reskin] word match declined by the call: bolt-restrain — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown bolt-restrain, which the GM's words keyed
[reskin] key match declined: action — "bolt-restrain" was ranked first on the call's own menu for locks, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Kivrix jams its lockpick into a held, worn, or carried object on a creature it can reach — a shield, a belt, a sword's pommel, a lockbox — and springs it open or loose. In the creature's next moment of need that object fails or flies free: the strap gives way, the clasp snaps, the shield tumbles off the arm, and whatever the thing was holding or protecting spills out. Kivrix can only do this to a " [rider/on_hit/condition] — the model found no template that holds it (offered: bolt-restrain, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge, shield-bash, exploiter, riposte)
[reskin] fallback stands down: the class_npc path has no shelf — the Bandit Captain's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's AC 14 at CR 4, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The lockpick is bound to Kivrix's errand: any lock, latch, seal, or clasp it touches simply yields, and once it has opened a lock it cannot be made to close again against Kivrix's will — the way in stays a way in. This is a truth about the lockpick itself, not Kivrix's body, and it does nothing to doors that were never locked." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] word match declined by the call: sealed-body, bound — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown sealed-body, which the GM's words keyed
[reskin] key match declined: trait — "sealed-body" was ranked first on the call's own menu for locked, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The lockpick is bound to Kivrix's errand: any lock, latch, seal, or clasp it touches simply yields, and once it has opened a lock it cannot be made to close again against Kivrix's will — the way in stays a way in. This is a truth about the lockpick itself, not Kivrix's body, and it does nothing to doors that were never locked." [trait/always/movement] — the model found no template that holds it (offered: sealed-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
[reskin] weapons answered: Lockpick Blade = dagger; Fling Dart = dart
[reskin] weapon declared: "Lockpick Blade" is a dagger — the call's own answer (the name alone read longsword)
[reskin] weapon table: "Fling Dart" — thrown, range 20/60
[reskin] print canon modes: fly off — the Bandit Captain has no such mode and the words name none
[reskin] speed by concept: dropped Climb 30 ft., Fly 40 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "Infernal; telepathy 30 ft." -> "Infernal, telepathy 30 ft." (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Bandit Captain's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Fiend stays — the words say fiend ("a dire wolf but undead", 2026-10-01)
[reskin] print canon languages: "Infernal, telepathy 30 ft." -> "Common, Thieves' cant, Infernal" — the Bandit Captain's plus the concept's Infernal
[reskin] print canon speed: 40 ft. -> 30 ft. — the Bandit Captain's walk; the concept's other modes stay
[reskin] rider folded: "Lockpick Blade" keeps its budget — the chassis's rider half (6) folds into the base; the Bandit Captain pays no damage rider of its own
[reskin] print canon attack: "Lockpick Blade" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon attack: "Fling Dart" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] resistances derived: Cold
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Bandit Captain's
```


---

## Gorehollow Reaver — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gorehollow Reaver | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 40 (2 × Cleaver); nova none; dmg 40

```
Gorehollow Reaver

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

Actions

Multiattack. The reaver makes two Cleaver attacks.

Cleaver. Melee Attack Roll: +7, reach 10 ft. 13 (2d8 + 4) Slashing damage plus 7 (2d6) Thunder damage.

Bonus Actions

Charge. The reaver moves up to half its Speed straight toward an enemy it can see.

Blood-Frenzy Charge (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the reaver moves up to half its Speed without provoking Opportunity Attacks, and it makes one Cleaver attack.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Cleaver — weapon greataxe
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver who herds prey into the maze"
- Bonus Actions/Blood-Frenzy Charge — library seed rampage

**Engine trace**

```
[path] refused: print_body "Minotaur" is not in the corpus
[path] homebrew — species minotaur — "a minotaur reaver who herds prey into the maze" (call)
[route] brute type=Monstrosity mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | brute-charger: ✓ ("herds prey into the maze") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Monstrosity themes=subterranean/bestial mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: herding prey into the maze [behavior] | corridor walls and dead ends [aura] | thick scarred bull-hide [body]
[concept] identity: The reaver opens by bellowing and slamming its body across the prey's escape routes, herding them down the corridors of its own labyrinth with shoulder-rushes and sweeps of its cleaver. Round after round it advances in a slow, deliberate wall, driving the quarry deeper and letting stone and dead ends do the bleeding. Cornered or bloodied it does not flee — it stops herding and charges straight through whatever is left, roaring with the joy of the closing gate.
[concept] lore: Some minotaur bloodlines learned that a maze is not a prison but a pasture, and this reaver's kind wallow in a warren they have widened for themselves, driving trespassers toward the inner pits where the true eater waits — or so the cultists who raise them swear.
[reskin] donor: brute-5 -> CR 6
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] species kit: minotaur — "a minotaur reaver who herds prey into the maze": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the reaver" — the call's own answer (kind), built from the name
[reskin] inline form: "the reaver" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (descriptive)
[reskin] signature idea (action): "The reaver lowers its head and drives forward in a ground-shaking rush, bellowing so loudly that the sound itself knocks foes off their feet. Everyone caught in the path is hurled backwards and left sprawled, and the reaver can immediately shift a step to close the gap it just opened." [action/save/movement] — menu: trample, leap, thrown-burst, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] word match declined by the call: herd — the key word does not mean the mechanic here
[reskin] nova declined: "Maze-Herding Rush (Recharge 5-6)" — a whole-round ability the GM never asked for: the call offered no quote, and the key table finds no verb either (the idea's own words: rush:idea); the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] fallback respects the call: herd left the shelf — the call declined it for this sheet
[reskin] fallback skipped by the floor: terror-pulse (EV 23.1 vs 35.5)
[reskin] fallback skipped by the floor: push-prone (EV 2.9 vs 10.9)
[reskin] value check: "Rampage (1/Day)" EV 17.7 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The reaver treats stone and dead ends as its own limbs: whenever a foe is pinned against a wall or backed into a corner near it, the reaver's next blow lands harder and the prey finds no room to slip away. Confined spaces are where it is most dangerous, and the maze itself seems to lean in with every strike." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] word match declined by the call: bloodied-fury, bloodied-burst, terrain-walk, aberrant-ground — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The reaver treats stone and dead ends as its own limbs: whenever a foe is pinned against a wall or backed into a corner near it, the reaver's next blow lands harder and the prey finds no room to slip away. Confined spaces are where it is most dangerous, and the maze itself seems to lean in with every strike." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst, bloodied-burst)
[reskin] weapons answered: Cleaver = greataxe
[reskin] weapon declared: "Cleaver" is a greataxe — the call's own answer
[reskin] languages by mind: "None" -> "Common" (sapient)
audit finding below confidence gate: Rampage (1/Day) The name is a generic placeholder that does not reflect this creature's concept.
[reskin] audit rename: "Rampage (1/Day)" -> "Blood-Frenzy Charge (1/Day)"
```


---

## Ser Alderin Vaunt — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ser Alderin Vaunt | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 52 (2 × Spear); nova none; dmg 52

```
Ser Alderin Vaunt

Medium Humanoid, Neutral

AC 19
Initiative +2 (12)

HP 105 (14d8 + 42)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+2
WIS
12
+1
+1
MOD
SAVE
CON
16
+3
+6
CHA
15
+2
+2

Skills Athletics +7, Perception +4

Senses Passive Perception 14

Languages Common, Celestial

CR 7 (XP 2,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the vaunt, the vaunt and its allies have Advantage on attack rolls and saving throws, provided the vaunt doesn't have the Incapacitated condition.

Actions

Multiattack. The vaunt makes two Spear attacks. It can replace one attack with a use of Shield Bash.

Spear. Melee or Ranged Attack Roll: +7, reach 5 ft. or range 20/60 ft. 26 (5d8 + 4) Piercing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the vaunt can see. Failure: 24 (7d6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition. Success: Half damage only.

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

**Where each row came from**

- Traits/Aura of Authority — paladin kit; the GM's clause "knight-errant"
- Actions/Multiattack — the chassis
- Actions/Spear — print's own row, renamed; weapon spear
- Actions/Shield Bash — print's own row

**Engine trace**

```
[path] class_npc — class paladin — "knight-errant" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | defender: ✓ ("a knight-errant of the fallen order") | defender: key "knight" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the shield raised for the weak [behavior] | tower shield and ring-mail of the fallen order [object] | an oath that will not break [aura]
[concept] identity: A broken knight plants a tower shield between the weak and the blade, opening by stepping into the blow meant for someone else and letting iron rings out its answer. Every round it holds the line, shoving the swift past it back into the mud and turning aside strikes with the flat of the shield before answering with a short, heavy sword cut. It does not break and it does not chase — it sells its own blood dearly and fights to the death so that the ones behind it can run.
[concept] lore: The last sworn blade of a dissolved order, it wanders the roads with an oath no lord will hear, seeking any small flock that needs a shield between it and the world's teeth.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 7
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said homebrew)
[reskin] print canon: "a knight-errant of the fallen order who shields the weak" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] class kit: paladin — "knight-errant": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline by rule: "the vaunt" — the call answered "Ser Alderin" (person), which the name does not support
[reskin] damage type by the row's own noun: "Shortsword" Slashing -> Piercing
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When a foe strikes a creature beside the knight, the knight throws its tower shield into the path and takes the blow itself, then swings the shield's rim around to knock the attacker back a step so the wounded can slip away. The knight can only interpose itself once between its own turns, and only for someone standing close enough to shelter." [reaction/on_being_hit/defense] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] word match declined by the call: riposte, push-prone, disarm, rally — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield+orders, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When a foe strikes a creature beside the knight, the knight throws its tower shield into the path and takes the blow itself, then swings the shield's rim around to knock the attacker back a step so the wounded can slip away. The knight can only interpose itself once between its own turns, and only for someone standing close enough to shelter." [reaction/on_being_hit/defense] — the model found no template that holds it (offered: rally, riposte, disarm, push-prone)
[reskin] fallback respects the call: rally, disarm, push-prone left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's AC 15 at CR 7, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The knight's ring-mail and shield were forged to answer iron with iron: whenever a foe's blow lands on it, the struck shield booms out a rolling clang that shakes the attacker's nerve and warns every ally within earshot. The din only rings from blows the knight actually takes, and a foe already reeling from one clang is not shaken by the next." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] word match declined by the call: resonant-body, bloodied-burst, absorption, weapon-lodge, bound — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The knight's ring-mail and shield were forged to answer iron with iron: whenever a foe's blow lands on it, the struck shield booms out a rolling clang that shakes the attacker's nerve and warns every ally within earshot. The din only rings from blows the knight actually takes, and a foe already reeling from one clang is not shaken by the next." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, bound)
[reskin] weapons answered: Shortsword = shortsword; Cudgel = club
[reskin] print canon alignment: Lawful Good -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Celestial" -> "Common, Celestial" — the Gladiator's plus the concept's Celestial
[reskin] print canon attack: "Spear" keeps print's hybrid frame — reach 5 ft. or range 20/60 ft. (the Gladiator's weapon is thrown)
[reskin] print canon attack: "Shortsword" -> "Spear" — the Gladiator's own row
[reskin] print canon rows: Cudgel leave — the Gladiator has one melee row (Spear), and Multiattack reads print's
[reskin] print canon row priced: Shield Bash — dice 9 → 24
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Shield Bash.
```


---

## Whiskerfence — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | class |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Whiskerfence | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 3 → 3; sustained 16 (2 × Pistol); nova none; dmg 16

```
Whiskerfence

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 52 (8d8 + 16)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
15
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
16
+3
+5
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
14
+2
+2

Skills Perception +2, Stealth +5

Senses darkvision 60 ft.; Passive Perception 12

Languages Common, Thieves' cant

CR 3 (XP 700; PB +2)

Traits

Evasion. If Whiskerfence is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Whiskerfence instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The bandit makes two attacks, using Scimitar or Pistol in any combination.

Scimitar. Melee Attack Roll: +5, reach 5 ft. 6 (1d6 + 3) Slashing damage.

Pistol. Ranged Attack Roll: +5, range 30/90 ft. 8 (1d10 + 3) Piercing damage.

Bonus Actions

Cunning Action. Whiskerfence takes the Dash, Disengage, or Hide action.

Crowd Slip. Whiskerfence takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.

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

**Where each row came from**

- Traits/Evasion — template evasion; rogue kit; the GM's clause "cutpurse"
- Actions/Multiattack — the chassis
- Actions/Scimitar — print's own row, renamed; weapon scimitar
- Actions/Pistol — print's own row, renamed; weapon pistol
- Bonus Actions/Cunning Action — rogue kit; the GM's clause "cutpurse"
- Bonus Actions/Crowd Slip — template feint-slip; library draw (seed unstamped); the GM's clause "slips through the market crowd"; binds the GM's words: slip

**Engine trace**

```
[path] class_npc — class rogue — species tabaxi — "cutpurse" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | holds: the call reads none in these words | skirmisher-skulker: ✓ ("slips through the market crowd") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=grasping/uncanny mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: striking from hiding in a crowd [behavior] | the cutpurse's blade [object] | vanishing into the throng [behavior]
[concept] identity: The cutpurse works the market as cover, brushing past marks and opening a fight with a knife between the ribs before the crowd knows anything has happened. Every round after, it shadows a target through the stalls, strikes from an angle no one is watching, and melts back into the throng the moment steel turns its way. It is a coward with excellent instincts — bloodied, it drops the purse and runs, and it only presses an advantage when the mark is already reeling.
[concept] lore: A tabaxi who learned that a crowded bazaar hides more than coin, this cutpurse has turned pickpocketing into ambush and sells the purses back to the merchants it robbed — for a price.
[reskin] [path] class body: the rogue stands on the Bandit Captain — the class's own print block, nearest CR 3
[reskin] print canon route: the Bandit Captain's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 60 -> 52, AC 15 -> 15 — the Bandit Captain's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 15 (studded leather) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 15, DEX 16, CON 14, INT 14, WIS 11, CHA 14 — the Bandit Captain's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] [path] decides: class_npc on the Bandit Captain · class rogue (the matcher would have said homebrew)
[reskin] print canon: "a tabaxi cutpurse who slips through the market crowd" heads on the Bandit Captain — print's rows ride along; the seat stays
[reskin] species kit: Cat's Dash — "Fleet Agility" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] row evicted for the cap: Traits/"Crowdweave" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "cutpurse": Cunning Action (Assassin/Cunning Action), Evasion (evasion)
[reskin] inline declared: "Whiskerfence" — the call's own answer (person), built from the name
[reskin] inline form: "Whiskerfence" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tabaxi cutpurse" -> has (mechanical) [asked: movement] | "slips through the market crowd" -> has (mechanical) [asked: movement]
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the cutpurse strikes a foe that hasn't yet noticed it in the chaos of the crowd, it turns the hit into a clean opening — slipping the blade in where the mark's guard is turned, then sliding back into the press of bodies before steel can answer. This is only possible against a target that's unaware of it or already reeling from a wound, representing the ambush-first, gang-up-second instinct of" [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] word match declined by the call: affliction, bolt-mark, delayed-brand, rampage, aggro-curse, riposte, contagion, charge-push, hook-rider, pounce, isolation, charge — the key word does not mean the mechanic here
[reskin] signature template: feint-slip -> Bonus Actions/"Crowd Slip" ("The cutpurse slips back into the press of bodies before steel can answer — a Dis [verb: slip:concept]")
[reskin] keys spent by the action: slip
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 15 already beats print's AC 13 at CR 3, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The cutpurse reads the throng better than any honest mark: whenever a crowd, stall, or press of bodies stands between it and danger, it slips through and uses the confusion as a screen, so foes lose track of it whenever it moves amid a crowd rather than out in the open." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: terrain-walk — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The cutpurse reads the throng better than any honest mark: whenever a crowd, stall, or press of bodies stands between it and danger, it slips through and uses the confusion as a screen, so foes lose track of it whenever it moves amid a crowd rather than out in the open." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] weapons answered: Dagger = dagger; Hand Crossbow = hand crossbow
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] print canon modes: climb off — the Bandit Captain has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common, Thieves' cant" — the Bandit Captain's
[reskin] print canon attack: "Dagger" -> "Scimitar" — the Bandit Captain's own row
[reskin] print canon multiattack: "The bandit makes two attacks, using Scimitar and Pistol in any combination." — the Bandit Captain's own
[reskin] print canon attack: "Pistol" is print's own row — +5, 8 (1d10 + 3), range 30/90 ft. (an exact body at print's CR)
[reskin] print canon attack: "Hand Crossbow" -> "Pistol" — the Bandit Captain's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Bandit Captain's
[reskin] multiattack normalised: "The bandit makes two attacks, using Scimitar or Pistol in any combination."
[reskin] row binds its clause: "Crowd Slip" answers "slips through the market crowd" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] species kit: Climb 30 ft. — the tabaxi's
[reskin] species kit: darkvision 60 ft. — the tabaxi's
```
