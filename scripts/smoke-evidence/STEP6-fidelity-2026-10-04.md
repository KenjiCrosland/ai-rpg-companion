# Step 6 — repair, rigor holes, metric holes (the critic's step-5 read) — 2026-10-04

Scope as the critic set it: the repair call; items 1–7 as gate predicates and renderer fixes; items 8–10 on extraction and scoring; the Resolution 3 exemption; the seed-lift / floor-as-pricer openings. Each landed with a pin; the gate ran clean before the runs started; nothing landed while they ran.

## Receipts before code

- One Recharge nova per sheet: 0 of 2 corpora carry two (`srd52-monsters.json`, `srd-monsters.json`). The Duergar's two "Recharges after a Short or Long Rest" rows are utilities with no damage.
- Grappled always carries its escape DC: 0 rows in either corpus apply Grappled without "(escape DC n)". The 2014 Vampire's "a creature that is grappled by the vampire" is a prerequisite, not an application.

## What landed

**Rigor (items 1–7).**
1. Two Recharge novas — `two-novas` structure fail. An authored Recharge save is the nova: it evicts the chassis nova through the slot-yield rule (`slotYield(['nova'], row)`).
2. Slot yield is same-form only: an authored save evicts the Signature Slot only when that slot resolves as a save; an authored trait only a Traits slot. The unfilled Signature Slot placeholder (the donor's "Disadvantage on its next attack roll" text — Claw Rake, Drag Under, Reeking Hug were all this placeholder renamed) always leaves on an authored sheet, and its citations are swept.
3. Grappled rider renders in print's form with the escape DC: "If the target is a Large or smaller creature, it has the Grappled condition (escape DC n)." The chassis's "While Grappled" fragment is stripped first. Gate: `grapple-no-escape` (adjudicability).
4. A save whose answer names no effect deals damage; "pulled up to 10 feet toward the hound" normalises to the movement slot. (The three named rows were the placeholder, item 2.)
5. The 2014 Multiattack is rendered from the 2024 row by `multiattack2014()`, never translated by the model: one row → "makes N X attacks"; as many names as attacks → "one with its X and one with its Y"; a mixed set → "makes N attacks, using X or Y".
6. "In any combination" needs two rows — the 2024 renderer writes "makes N X attacks" for one; gate `multiattack-combination`.
7. A damage-taken trigger with no frequency gains "Once per turn," in the parser.

Smaller: a weapon-typed authored row sheds the chassis's energy and split riders (the bull's Fire gore); "speaks only …" replaces the Languages line (the sock language stands alone).

**Metric (items 8–10).**
8. Polarity: a phrase with a negation is a `lacks` clause. Coverage credits it only when the lacked words are absent from the sheet. The router ignores a key inside a negation (`NEGATED_KEY`), so "cannot cast any spells" is not a caster; and the engine removes what a lacks clause names (rows named for it; spell rows when the lack is spells), sweeping citations.
9. Header-value clauses cover only when the header line carries them (size, speed, AC, HP, vulnerability, resistance, immunity, speech). The engine now writes them: "takes extra damage from it" after "She hates fire" sets Vulnerabilities Fire (the pronoun resolves to the previous phrase's type).
10. The denominator is a reader's: sentences, comma pieces and "but" halves are phrases; a relative clause splits only off the first piece; " and " splits only between two clauses of three words or more; the first phrase is the creature (the head) and is not counted unless it is the only one. The table below lays the hand count beside it per block.

**Resolution 3.** "AC 22", "300 hit points", "bites for 50 damage" are declared fields: the sheet takes the number, `generation.declared` records it, derivation and bands stand down and the bands cell reads "user-set: AC 22 · reads CR n".

**Repair-by-adding.** After the authored landing, a mechanical clause claimed by no row (by the rows' own attributions, names and authored text — never chassis prose) goes to one targeted call with the sheet as context ("You are repairing the ABILITIES…"); its forms land through the same landing.

**Floor-as-pricer, seed-lift.** A damage row still under the floor after the ladder is priced to the floor, bounded by the ceiling and the nova cap; a gated row whose floor sits above the cap ships at the cap ("the cap is the price"). Seeds pass through the same pricer. Rows with no damage keep the logged step and still drop.

## Gate

| gate | result |
|---|---|
| `npx jest` | 181 suites, 5,182 tests, 0 failed |
| `npm run build` | clean |
| pins | `reskin/__tests__/step6.spec.js` (11), `sweep-fixes.spec.js` "step 6" (5), Meshrin regression pin updated |

## Runs

Three rounds. Round one (baseline only) was read and stopped: it surfaced three extraction defects ("but" meaning except, a verb clause merged after "and", the stem "bites" → "bit") and two renderer gaps (a trait with `{dmg}` where no damage is dealt; a Grappled prerequisite read as an application). Round two ran the fixed engine on all three sets. Round three ran a second pass of fixes read off round two (below) and is the measured result where it landed; the provider stalled during it ("Failed to fetch" on the route call, three-minute timeouts), so round three carries gaps and round two is kept beside it.

### Round two — baseline set (`baseline-fidelity-2026-10-04T19-26-50`)

0 fails of 18. **Coverage 85% (39/46 clauses); concept share 78% (62/79 rows).** Meshrin 7/7. The denominator is now a reader's (head phrase uncounted, descriptive asks counted): hand 61, automated 46; 13 of 18 blocks within one clause of the hand count. The seven dropped clauses: `knife ball` (a creature-only prompt whose name became "Scrapmaw Knifewheel"), `keeps a court of thralls` (a Vampire borrow — print body, so no authoring and, in round two, no repair), `rides a giant frog` (a Goblin borrow — same), `only moves when no one is looking` (misread as a lacks clause on "no one" — fixed in round three), `is deathly afraid of chickens` (the model's row paraphrased: "Avian Panic"), `it speaks only in the language of socks` (the model filed "smothers people" as descriptive, nothing authored, Common stayed — fixed in round three: a combat cue outranks the model's kind, and a speech clause with "only" writes the Languages line), `he cannot leave the shoreline` (a lacks clause the sheet implemented as "Bound to the Shore" — the rule now credits a row that restates the restriction).

### Round two — the forty (`sweep-2026-10-04T19-31-56`)

39 of 40 saved (the Kraken timed out). **2 fails**, both read and fixed in round three: the Drowned Ringer (2014, CR 10) ran 34 a round against the table's 66 — an authored sheet whose one attack row replaced the chassis's composition; the final price pass now re-solves an authored sheet UP as well as down. Solvane (2014, CR 24) failed `dc` on "DC 5 plus the damage taken" — print's Zombie idiom; the gate now exempts it. **Coverage 70% (30/43); concept share 77% (188/243).** The dropped clauses are the prompts' verb phrases on print-borrow sheets ("crushes anyone", "forces the lock" on the Flesh Golem borrow; "curses the firstborn"; "pulls climbers into the harbor"; "swallows ships whole") — print bodies authored nothing and round two's repair ran only after an authoring pass; round three runs the repair on every sheet.

### Round two — Meshrin (`meshrin-2026-10-04T19-56-50`)

7/7, 6/6 concept, gates ok (bands soft: aim-dpr, band on the defender-5).

### Second pass, read off round two (landed before round three)

- A combat verb or body part is mechanical whatever the model filed it as (Sock Rot authored nothing).
- The repair call runs on every sheet, a print body included; a repair on a sheet that authored nothing leaves the signature path and the slot alone.
- The save form carries its own damage type; a type the clause's words warrant stands in (the bull's steam dealt Bludgeoning).
- "Once per turn" only where the trait pays out damage, resistance or healing — an immunity is a rule (the bull's Adamantine Shell).
- A speech clause with "only" writes the Languages line when nothing else did.
- A lacks clause is also covered when a row restates the restriction (Bound to the Shore).
- A melee weapon in a row's name narrows a hybrid print row to melee (the Mage's Arcane Burst under "Iron-Shod Staff" kept range 120).
- The 2014 card prints Damage Vulnerabilities (it never had the line; the hag's Fire reached the JSON and not the card).
- "no one" is not a negation.
- The final price pass re-solves an authored sheet up to the card when its rows left the round under.
- `DC N plus the damage taken` is print's own derivation.

Gate after the second pass: 181 suites, 5,183 tests, build clean.

### Round three — baseline set (`baseline-fidelity-2026-10-04T21-33-13`), the pass-two engine

14 of 18 saved (knife ball, the vampire lord, Sir Reginald and the Lantern Drowned timed out on the provider). **Coverage 94% (34/36); concept share 69% (41/59).** Meshrin 7/7. One fail: the Iron Bull's authored "Adamantine Bane" tripped the lint's defense-restated rule — the header lines cannot carry an adamantine qualifier in 2024, so the lint now exempts adamantine and silvered (the Bone Shroud pin keeps "nonmagical" as a restatement). The two dropped clauses: `a bog witch` (the creature-only head, its name became Grenwyth) and `It charges` (the bull's rows are Charging Gore, Iron Horns, Stomping Hooves — "charges" is in the name, the stem "charg" is not the word "charge"; the string match, not the sheet). Confirmed on this run: Roderick the spell-less wizard loses the Mage's Spellcasting and Protective Magic and his staff narrows to melee; Grandmother Ash reads 7/7 with Damage Vulnerabilities fire on the 2014 card and a three-attack Multiattack rendered "using Rotting Nails or Ash Cloud"; the Brass Gate-Golem (a Flesh Golem borrow) now gets its "crushes anyone" row from the repair call on a print body.

### Round three — the forty (`sweep-2026-10-04T22-25-09`) and Meshrin (`meshrin-2026-10-04T22-56-51`)

The forty aborted at 11 blocks (a Playwright timeout waiting for the form while the provider stalled): 0 fails of 11, coverage 85% (11/13), concept 93% (40/43). Meshrin 7/7, 5/5, gates ok. A full forty on this engine is the open run; the round-two forty (39 blocks, two fails since fixed) stands beside it.

### Hand count beside the automated denominator

Round two:

| # | block | hand | automated | automated record (head in brackets) |
|---|---|---|---|---|
| 1 | Meshrin | 8 | 7 | h:Meshrin — Large lizard folk · h:30 feet of movement · m:Wields a greatsword · m:long tail for swipe attacks · m:is trained in fighting styles · m:has razor sharp claws · m:large teeth for a vicious bite |
| 2 | Scrapmaw Knifewheel | 2 | 1 | [knife ball] |
| 3 | Mire Crone | 2 | 1 | [a bog witch] |
| 4 | Troll | 1 | 1 | [a troll] |
| 5 | Crimson Vicar | 3 | 1 | [a vampire lord] · d:keeps a court of thralls |
| 6 | Croakrider | 3 | 2 | [a goblin] · d:rides a giant frog · m:throws nets |
| 7 | Vault Sentinel | 3 | 1 | [a stone gargoyle] · m¬:only moves when no one is looking |
| 8 | Staff Wizard Rodrin | 3 | 2 | [a wizard] · m¬:he cannot cast any spells · m:he just hits people with his staff |
| 9 | Leviathan Terrapin | 4 | 2 | h:a giant snapping turtle with AC 22 · m:bites for 50 damage |
| 10 | Pikachu | 2 | 1 | [Pikachu] |
| 11 | Sir Reginald Pemberton-Hughes | 3 | 2 | [Sir Reginald Pemberton-Hughes — a knight] · d:is deathly afraid of chickens · m:will flee from any bird |
| 12 | Sock Rot | 4 | 3 | [a sentient pile of laundry] · d:smothers people · d:smells like old socks · h:it speaks only in the language of socks |
| 13 | Grandmother Ash | 6 | 7 | [Grandmother Ash — An old hag] · d:lives in the burned forest · m:She can turn into a cloud of ash · m:choke anyone who breathes her in · m:She hates fire · h:takes extra damage from it · m:Her nails are long and black a |
| 14 | Iron Bull | 7 | 6 | h:A huge iron golem shaped like a bull · m:It charges · m:gores · m:its hooves shake the ground when it stomps · m:it breathes scalding steam from its nostrils · h:it is immune to anything but adamantine weapons |
| 15 | Lantern Drowned | 4 | 6 | [The Lantern Drowned — a drowned sailor] · d:still carries his lantern · m:lures the living into the water · m:anyone who looks at the light wants to walk into the sea · d:he is cold and dripping · d:his touch numbs · m¬ |
| 16 | Owlbear | 1 | 1 | [owlbear] |
| 17 | Grubtail | 3 | 1 | [a kobold trapmaker with a bag of caltrops] · m:a hand crossbow |
| 18 | Beedragon | 2 | 1 | [a dragon made entirely of bees] |

**Denominators:** hand 61, automated 46; 13 of 18 blocks within one clause of the hand count.

Round three:

| # | block | hand | automated | automated record (head in brackets) |
|---|---|---|---|---|
| 1 | Meshrin | 8 | 7 | h:Meshrin — Large lizard folk · h:30 feet of movement · m:Wields a greatsword · m:long tail for swipe attacks · m:is trained in fighting styles · m:has razor sharp claws · m:large teeth for a vicious bite |
| 3 | Grenwyth the Mirebound | 2 | 1 | [a bog witch] |
| 4 | Troll | 1 | 1 | [a troll] |
| 6 | Skrog the Netcaster | 3 | 2 | [a goblin] · m:rides a giant frog · m:throws nets |
| 7 | Vault Sentinel | 3 | 1 | [a stone gargoyle] · d:only moves when no one is looking |
| 8 | Roderick the Unsparked | 3 | 2 | [a wizard] · m¬:he cannot cast any spells · m:he just hits people with his staff |
| 9 | Mere Behemoth | 4 | 2 | h:a giant snapping turtle with AC 22 · m:bites for 50 damage |
| 10 | Pikachu | 2 | 1 | [Pikachu] |
| 12 | Lint Sovereign | 4 | 3 | [a sentient pile of laundry] · m:smothers people · d:smells like old socks · h:it speaks only in the language of socks |
| 13 | Grandmother Ash | 6 | 7 | [Grandmother Ash — An old hag] · d:lives in the burned forest · d:She can turn into a cloud of ash · m:choke anyone who breathes her in · m:She hates fire · h:takes extra damage from it · m:Her nails are long and black a |
| 14 | Ironhorn Reliquary | 7 | 6 | h:A huge iron golem shaped like a bull · m:It charges · m:gores · m:its hooves shake the ground when it stomps · m:it breathes scalding steam from its nostrils · h:it is immune to anything but adamantine weapons |
| 16 | Owlbear | 1 | 1 | [owlbear] |
| 17 | Hobnail the Warren Tollkeeper | 3 | 1 | [a kobold trapmaker with a bag of caltrops] · m:a hand crossbow |
| 18 | Apiary Wyrm | 2 | 1 | [a dragon made entirely of bees] |

**Denominators:** hand 49, automated 36; 11 of 14 blocks within one clause of the hand count.

The automated count sits under the hand count by about a quarter on both rounds. The gap is systematic and readable in the table: the hand count gives a creature-only prompt two clauses (the creature and its one obvious ask: "knife ball" → knife, ball), the automated gives it one (the head); and the hand count split some compound asks the reader of the prompt would not ("a kobold trapmaker with a bag of caltrops" is one phrase to the splitter, two to the hand). Thirteen of eighteen blocks sit within one clause of the hand count.

## The three sheets the critic asked for

### Staffbound Caster — round three, 2014 (Roderick the Unsparked)

```
Roderick the Unsparked
Medium humanoid, chaotic neutral
Armor Class
12
Hit Points: 
58 (13d8)
Speed: 
30 ft.
STR | DEX | CON | INT | WIS | CHA
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
Actions
Multiattack: Roderick makes two Staff Thump attacks.
Staff Thump: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) bludgeoning damage.
```

Trace:
```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("he just hits people with his staff") | brute: no line key in the words — the model's read of its quote
[reskin] lacks clause: Actions/"Spellcasting" leaves — "he cannot cast any spells"
[reskin] lacks clause: Reactions/"Protective Magic (3/Day)" leaves — "he cannot cast any spells"
[reskin] row narrowed: "Staff Thump" is a melee weapon by name — the hybrid range leaves
```

### Grandmother Ash — round three, 2014

```
Grandmother Ash
Medium fey, neutral
Armor Class
14 (natural armor)
Hit Points: 
130 (20d8 + 40)
Speed: 
30 ft.
STR | DEX | CON | INT | WIS | CHA
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
Damage Vulnerabilities: 
fire
Senses: 
darkvision 60 ft., passive Perception 15
Languages: 
Common
Challenge
7 (2,900 XP)
Proficiency Bonus:
+3
Burned Forest Dweller. Grandmother inhabits the burned forest; the forest is her home and hunting ground.
Fire Bane. When she takes fire damage, she takes 7 (2d6) extra fire damage and shrieks.
Actions
Multiattack: Grandmother makes three attacks, using Rotting Nails or Ash Cloud. It can replace one attack with a use of Ash Choke.
Rotting Nails: Melee Spell Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) necrotic damage, and the target is poisoned until the end of its next turn.
Ash Cloud: Melee Spell Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) poison damage, and the target is blinded until the end of its next turn.
Ash Choke: One creature within 60 feet must make a DC 14 Constitution saving throw, taking 14 (4d6) necrotic damage on a failed save, and is poisoned until the end of its next turn on a failed save.
Spellcasting: The grandmother casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 14):
At will: fog cloud, misty step
1/day each: bestow curse, cloudkill
Choking Ash: Each creature within 15 feet of it must make a DC 14 Constitution saving throw, taking 21 (6d6) poison damage on a failed save, or half as much damage on a successful one.
```

Trace:
```
[reskin] authored: Melee Attack -> "Rotting Nails" (Necrotic, Poisoned); Ranged Attack -> "Ash Cloud" (Poison, Blinded); save: "Choking Ash"; trait: "Hates Fire"
[reskin] slot yields: signature — the chassis's "Crows' Warning" leaves; the authored row holds the slot
[reskin] authored sheet: 2 attack row(s), 1 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] repair: 1 clause(s) with no row — "lives in the burned forest"; one targeted call with the sheet as context
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] final price: the round ran 36 against the card's 48 — the attack rows re-solve at 133% (3 attacks on an authored sheet, under the card)
[reskin] header clause: vulnerable to Fire — "takes extra damage from it"
```

### Glacier Wyrm — round two, 2024 (the pass-one engine; round three's forty stopped before it)

In round two the model filed "swallows ships whole" as descriptive and nothing authored — the sheet below is the dragon chassis with the Rend renamed. Pass two makes a combat verb mechanical whatever the model says; the authored shape (one Recharge nova, a Grappled rider with its escape DC, "makes three Devouring Maw attacks") is pinned in `sweep-fixes.spec.js` and awaits the next forty for its live sheet.

```
Glacier Wyrm
Gargantuan Dragon, Neutral Evil
AC 21
Initiative +1 (11)
HP 333 (18d20 + 144)
Speed 40 ft., Fly 80 ft., Swim 40 ft.
MOD
SAVE
STR
26
+8
+8
INT
18
+4
+4
MOD
SAVE
DEX
12
+1
+7
WIS
16
+3
+9
MOD
SAVE
CON
26
+8
+8
CHA
24
+7
+7
Skills Perception +9, Stealth +7
Vulnerabilities Fire
Immunities Cold
Senses blindsight 60 ft., darkvision 120 ft., tremorsense 60 ft.; Passive Perception 19
Languages Common, Draconic
CR 20 (XP 25,000; PB +6)
Traits
Glacier Passage. Difficult Terrain composed of ice, frozen sea, and rime-crusted ground doesn't cost the glacier wyrm extra movement, and the glacier wyrm can move across ice, frozen sea, and rime-crusted ground without needing to make an ability check.
Legendary Resistance (4/Day). If the glacier wyrm fails a saving throw, it can choose to succeed instead.
Actions
Multiattack. The glacier wyrm makes three Bite attacks.
Bite. Melee Attack Roll: +14, reach 15 ft. 21 (3d8 + 8) Piercing damage plus 13 (3d8) Cold damage.
Freezing Breath (Recharge 5-6). Constitution Saving Throw: DC 21, each creature in a 90-foot Cone. Failure: 76 (17d8) Cold damage. Success: Half damage.
Spellcasting. The glacier wyrm casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):
- At Will: Detect Magic, Dispel Magic, Telekinesis
- 1/Day Each: Scrying
Legendary Actions
Legendary Action Uses: 3. Immediately after another creature's turn, the glacier wyrm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.
Engulf. The glacier wyrm makes one Bite attack.
Ice Slide. The glacier wyrm moves up to half its Speed without provoking Opportunity Attacks.
Dread Glare. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.
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
