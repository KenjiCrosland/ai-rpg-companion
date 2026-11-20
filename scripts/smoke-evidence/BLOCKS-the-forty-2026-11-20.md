# Blocks — the forty, re-recorded (2026-11-20)

All forty as they stand in the new baseline `baseline-2026-11-20`, recorded whole with every
prompt as it is after fixes A, B, C, D1, D2, D3 and the end-of-line lint. The twist's switch is
off and nothing of Part 3 is in this recording.

**40 of 40 recorded; none threw and none timed out.** The strict replay against this baseline
reproduces 38; s22 (Goblin Boss) and s36 (blank) miss in the PROMPT — the route call and the seed
call respectively — not on the sheet, and are the same pair that has never replayed. Both are
fresh from the recording run here.

`baseline-2026-11-18` is untouched; it is the before.

# Smoke: sweep (2026-11-20T18-32-34)

- 01 Dire Wolf — ok, signature: dropped
- 02 Bog Hound — ok, signature: library
- 03 Owlbear — ok, signature: library
- 04 Passing Bell Ringer — ok, signature: library
- 05 Air Elemental — ok, signature: library
- 06 Spoilheap Lurker — ok, signature: library
- 07 Hydra — ok, signature: library
- 08 Lashed Siege-Golem — ok, signature: library
- 09 Stone Golem — ok, signature: library
- 10 Drowned Antiphon — ok, signature: library
- 11 Vampire — ok, signature: dropped
- 12 Plague-Archon — ok, signature: library
- 13 Purple Worm — ok, signature: library
- 14 Glacier Heart — ok, signature: library
- 15 Adult Red Dragon — ok, signature: dropped
- 16 Brass Tyrant — ok, signature: library
- 17 Pit Fiend — ok, signature: library
- 18 Archliche of the Bone Sun — ok, signature: library
- 19 Ancient Gold Dragon — ok, signature: —
- 20 Trench Hymn Leviathan — ok, signature: library
- 21 Owlbear — ok, signature: dropped
- 22 Goblin Boss — ok, signature: dropped
- 23 Vashka the Red — ok, signature: dropped
- 24 Merebone Harvester — ok, signature: library
- 25 Oathbound Bulwark — ok, signature: library
- 26 Fenwrack Crone — ok, signature: library
- 27 Displaced Templar — ok, signature: dropped
- 28 Ilvareth Dusksong — ok, signature: library
- 29 Swarm of Funeral Bells — ok, signature: library
- 30 Reliquary Ooze — ok, signature: library
- 31 Thundercloud Drake — ok, signature: library
- 32 Gorrak Stonewold — ok, signature: library
- 33 Reedtemple Warden — ok, signature: library
- 34 Krennik Skullstandard — ok, signature: library
- 35 Thing in the Well — ok, signature: dropped
- 36 Sorrowstone Coil — ok, signature: dropped
- 37 Meshrin — ok, signature: library
- 38 Gravebound Line-Holder — ok, signature: dropped
- 39 Vellick the Last Contract — ok, signature: dropped
- 40 Brother Halric — ok, signature: library

---

## 01. Dire Wolf — CR 1

**Input:** `name: Dire Wolf | with a frost-rimed hide`
**Donor:** skirmisher-1 -> CR 1
**Signature:** dropped · **elapsed** 29s

### Block
```
Dire Wolf

Large Beast, Unaligned

AC 14
Initiative +2 (12)

HP 22 (3d10 + 6)

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
15
+2
+2
CHA
7
-2
-2

Skills Perception +5, Stealth +4

Immunities Cold

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 1 (XP 200; PB +2)

Traits

Rime-Stiffened Aura. Constitution Saving Throw: DC 13, any creature that starts its turn in a 5-foot Emanation originating from the dire wolf. Failure: The target has the Deafened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

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

### Trace
```
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "Dire Wolf — with a frost-rimed hide" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("Dire Wolf — with a frost-rimed hide") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast typeFrom=the route call themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: frost-rimed hide [body] | pack-tactics hit-and-run harrying [behavior] | Cold-numbing bite that slows fleeing prey [behavior]
[concept] identity: A frost-rimed dire wolf opens by shadowing the herd from downwind, letting the pack's scent-drift spook prey into a run before it cuts the angle and hamstrings the straggler with a rime-crusted bite. Every round after, it darts in behind the pack's harrying feints, tears a strip of Cold-numbed flesh, and wheels back out beyond reach, never committing to a stand. It is a coward only in the sense that it hoards its own blood — it breaks and runs once bloodied, unless the pack's howls pin it to the kill.
[concept] lore: A dire wolf that denned too long in a glacier's melt-cave, its hide furred with frost that never thaws, it hunts the high passes for meat enough to fill a hunger the cold keeps sharp.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] seats: action <- "pack-tactics hit-and-run harrying" | trait <- "frost-rimed hide"
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] name_element answered: Rime-Crusted Bite = literal
[reskin] repair round 1: 1 defect(s) — rename for "Mobility Trait" takes the shelf's own row name "Pack Tactics" — that name belongs to a template this sheet may still receive; choose another
[reskin] name_element answered: Rime-Crusted Bite = literal
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dire wolf" — the call answered "the dire wolf" (kind), which the name does not support
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "When the dire wolf hits a creature with its Bite from the flank or rea" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The frost-rimed hide sheds a creeping rime: at the start of the dire w" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: snare, shield-bash, snare-bolt, blink, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, web-walker, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider
[reskin] signature idea (action): "When the dire wolf hits a creature with its Bite from the flank or rear, frost-crusted teeth tear a strip of numbed hide free; the target must succeed on a Constitution saving throw or have its Speed reduced until the end of its next turn, and it can't take Reactions until then. The wound is rimed white and the creature stumbles as if its legs belong to someone else." [rider/on_hit/condition] [family: mark] — menu: contagion, charge-push, pounce, isolation, life-drain, charge (+ shelf: lure, spew, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, answering-strike)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: contagion (on_hit/condition), pounce (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: action — slow-bolt (frost)
[reskin] word match declined by the call: contagion, pounce, life-drain, charge-push, isolation, charge, disarm, thrown-burst-seed, rampage — the key word does not mean the mechanic here
[reskin] closest refused: action — "slow-bolt" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on a bite hit, forces a save that slows the target and strips its Reac)
[reskin] seat answered, but: the call said "When the dire wolf hits a creature with its Bite from the flank or rear, frost-crusted teeth tear a strip of numbed hide" is carried by "Flank the Herd", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write an action for "When the dire wolf hits a creature with its Bite from the flank or rea" and wrote no row of that kind (refused: "Flank the Herd" — a strike says what the failed save costs: a condition, a forced movement, or a curse)
[reskin] seat asked again: action — the first answer was refused ("Flank the Herd" — a strike says what the failed save costs: a condition, a forced movement, or a curse); asking once more with the reason
[reskin] seat answered, but: the call said "When the dire wolf hits a creature with its Bite from the flank or rear, frost-crusted teeth tear a strip of numbed hide" is carried by "Flank the Herd", and no such row is on this sheet — the clause stays open
[reskin] strike written from its attack: "Flank the Herd (Recharge 5-6)" clones "Bite" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] seat landed on the second try: action — "Flank the Herd (Recharge 5-6)" after ""Flank the Herd" — a strike says what the failed save costs: a condition, a forc"
[reskin] seat takes its clause: "Flank the Herd (Recharge 5-6)" is HANDED "with a frost-rimed hide" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] row refused — the name is taken: "Flank the Herd (Recharge 5-6)" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The frost-rimed hide sheds a creeping rime: at the start of the dire wolf's turn, each creature within 5 feet of it that has taken Cold damage since its last turn must succeed on a Constitution saving throw or be unable to take Reactions until the start of its next turn as the cold stiffens its joints." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, faultless-tracker, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (start_of_turn/condition): truth-aura, fear-aura; the declared data is the warrant and the call is worth making
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] word match declined by the call: truth-aura, fear-aura, composed:zone:condition:frightened, composed:zone:condition:blinded, energy-aura — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:condition:deafened: the call picked it off the menu (what no printed template did: unstated)
[reskin] pick kept on the GM's own words: trait — "composed:zone:condition:deafened" has no key-table verb, but the call quotes "with a frost rimed hide" from the description
[reskin] signature template (trait): composed:zone:condition:deafened -> Traits/"Rime-Stiffened Aura" ("creatures near the cold-shrouded wolf who took Cold damage must save or be stiff [shape fit, no verb match]")
[reskin] weapons answered: Bite = none
[reskin] chassis nova: "Flank the Herd (Recharge 5-6)" — the skirmisher-1's own nova row; geometry, cap and rider lines below are its edits
[reskin] print canon type: the call answered type_source=user for beast, but the GM's words do not name it — the Dire Wolf's own type stands
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] print canon rows: Flank the Herd (Recharge 5-6) leave — the Dire Wolf has one melee row (Bite), and Multiattack reads print's
[reskin] print canon multiattack: "The dire wolf makes two Bite attacks." leaves — the Dire Wolf makes ONE attack at its own CR (print names no Multiattack) and the sheet carries print's own row numbers
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] element immunity: Cold — the call read this creature's energy as Cold and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Cold (merged into the header write)
[reskin] immunities stamped for type: Beast -> Cold
[reskin] print canon saves: proficient in nothing — the Dire Wolf's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Slip Through the Snowdrifts" is the seat's, not the Dire Wolf's
[reskin] lint: 0 findings
audit finding below confidence gate: Rime-Stiffened Aura A frost-rimed hide that only deafens imposes a nuisance condition with no teeth for a melee brute, giving no slow, chill, or cold-themed penalty matching the fiction.
[reskin] audit: [Rime-Stiffened Aura: The aura is instantaneous rat…5-foot Emanation originating from the dire wolf")]
[reskin] audit defect: Traits/"Rime-Stiffened Aura" [catalog] high untrackable — The aura is instantaneous rather than persistent: it triggers on creatures that start their turn in the emanation, but a 5-foot emanation with no duration or ongoing definition has no state to be in at the start of an enemy turn. — Define the aura as a constantly active emanation with a stated continuous area so a creature can be 'in' it when its turn begins. (about: "a 5-foot Emanation originating from the dire wolf")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Dire Wolf" — donor skirmisher-1, CR 1
[harness] recorded 11 model call(s)
```

---

## 02. Bog Hound — CR 1

**Input:** `a mud-caked bog hound that drags fishermen under`
**Donor:** brute-5-grappler -> CR 1
**Signature:** library · **elapsed** 32s

### Block
```
Bog Hound
Medium beast, unaligned
Armor Class

11 (natural armor)

Hit Points: 

22 (3d8 + 9)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

8 (-1)

	

16 (+3)

	

4 (-3)

	

15 (+2)

	

4 (-3)

Skills: 

Athletics +3, Perception +4

Saving Throws: 

STR +3

Senses: 

darkvision 30 ft., passive Perception 14

Languages: 

None

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Actions
Multiattack: The bog hound makes two Bite attacks. It can replace one attack with a use of Muck-Lunge.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Muck-Lunge: Each creature in a 15-foot cone must make a DC 13 Strength saving throw. On a failed save, the target is pulled up to 5 feet straight toward the bog hound, and the target is knocked prone.
```

### Trace
```
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "drags fishermen under" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] hints: engulf→mechanics ✓ ("seizes and holds to haul below")
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=bestial/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: dragging fishermen under the water [behavior] | mud-caked hound hide [body] | the black shallows it haunts [aura]
[concept] identity: A bog hound crusted in living mud waits submerged at the water's edge, then lunges to seize a fisherman by the leg and haul him down into the shallows. Round after round it holds and worries its prey, dragging the seized body deeper while the muck-anchored weight of it makes every pulled escape cost ground. It does not toy or relent; wounded, it sinks with its catch into the black water and waits, patient and hungry, for the struggling to stop.
[concept] lore: Born where the fen's mud drinks the drowned, the bog hound haunts the shallows of fishing villages, dragging men under not to eat but to bury them deeper, and it remembers every hand it has pulled below.
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 1
[reskin] donor: brute-5-grappler -> CR 1
[reskin] seats: action <- "dragging fishermen under the water" | trait <- "mud-caked hound hide"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] engulf engine: Whelm — the body's own verb
[reskin] engine interior scaled — CR 1 sits below the brute-5-grappler seat
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the bog hound" — the call's own answer (kind), built from the name
[reskin] inline form: "the bog hound" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a mud-caked bog hound" -> has (descriptive), head | "drags fishermen under" -> has (mechanical) [asked: on_hit/condition] [askMechanic: grapple]
[reskin] answered by the chassis: "drags fishermen under" asks grapple and "Bite" already carries it (declared imposes) — no row is requested for it, and the row now carries the GM's words
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "When the bog hound is grappling a creature, it can drag its catch down" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The bog hound's hide is a working crust of living mud. While it stands" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: shield-bash, active-toll, herd, drain, shell-withdraw, rally, heated-body, absorption, bloodied-burst, resonant-body, spider-climb, aberrant-ground, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, life-drain
[reskin] engulf engine withheld: Bonus Actions/"Whelm" leaves — the route call read this creature's hold as grip, not contain; the grapple stands and citations of the row are swept
[reskin] menu pruned: action — push-prone, exploiter (the sheet cannot render them)
[reskin] signature idea (action): "When the bog hound is grappling a creature, it can drag its catch down and back into the muck as a single lunge — the grappled creature must make a Strength saving throw or be pulled with the hound into the shallows and knocked Prone, its legs fouled in the mud. A creature dragged this way keeps the Grappled condition and must use its movement to stand and wade free rather than simply walk away." [action/save/movement] [family: drag] — menu: spew, escalating-dread, terror-pulse, thrown-burst-seed, wind-up, lure, pacify, slow-bolt, sensory-strike, disarm, reveal (+ shelf: second-wind, aggro-curse, self-invisibility, focus, coating, answering-strike, contagion, charge-push, hook-rider, pounce)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does movement; leading: slow-bolt (save/movement), disarm (save/movement), spew (save/damage)
[reskin] keys would have bound: action — hook-rider, slow-bolt (drag, drags, bog, mud)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: slow-bolt, disarm, spew, escalating-dread, terror-pulse, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal — the key word does not mean the mechanic here
[reskin] closest refused: action — "disarm" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a Strength save that drags the grappled target along with the hound an)
[reskin] seat answered, but: the call said "When the bog hound is grappling a creature, it can drag its catch down and back into the muck as a single lunge — the gr" is carried by "Muck-Lunge", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("a Strength save that drags the grappled target along with the hound an") and wrote an action instead: "Muck-Lunge" -> Actions. *Strength Saving Throw*: DC 13, one creature within 5 feet. *Failure:* The target is pulled up to 5 feet straight toward
[reskin] authored row numbers: "Muck-Lunge" — the call declared (unanswered) number(s) promised
[reskin] value check: "Muck-Lunge" EV 6.6 vs floor 3.1 (one attack of 2) — widened to a 15-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Muck-Lunge" ("When the bog hound is grappling a creature, it can drag its catch down and back into the muck as a single lunge — the grappled creature must make a Strength sav [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The bog hound's hide is a working crust of living mud. While it stands in water, mud, or marsh, it has the Invisible condition to creatures beyond a short range and hides its own trail — the fen closes over it, and only the bubbles mark where it waits." [trait/always/defense] [family: mark] — menu: false-appearance, adhesive, phobia, terrain-walk, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — grapple: adhesive
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: adhesive (always/condition), false-appearance (always/defense), bloodied-fury (always/defense)
[reskin] keys would have bound: trait — terrain-walk (bog, mud)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: adhesive — the key word does not mean the mechanic here
[reskin] closest refused: trait — "false-appearance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: hiding in mud and water with no trail, plus masking itself as an ambus)
[reskin] seat answered, but: the call said "The bog hound's hide is a working crust of living mud. While it stands in water, mud, or marsh, it has the Invisible con" is carried by "Living Mire", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("hiding in mud and water with no trail, plus masking itself as an ambus") and wrote a trait instead: "Living Mire" -> Traits. While it stands in water, mud, or marsh, the bog hound has the Invisible condition to creatures more than 30 feet away f
[reskin] authored row numbers: "Living Mire" — the call declared 1 number(s) promised
[reskin] free signature row: "Living Mire" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Living Mire" ("The bog hound's hide is a working crust of living mud. While it stands in water, mud, or marsh, it has the Invisible condition to creatures beyond a short range [authored: the catalog held no shape for it]")
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 4 on a Beast speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "a mud-caked bog hound that drags fisherm" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Muck-Lunge.
[reskin] free row over budget: Traits/"Living Mire" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Muck-Lunge" [no template]
[reskin] ask vs row MISMATCH: "drags fishermen under" -> "Bite" — trigger: asked on_hit, row reads at_will
[reskin] lint: 0 findings
[reskin] element expressed: Muck-Lunge carries "dragging fishermen under the water" — "The target is pulled up to 5 feet straight toward the bog hound, and the target "
audit finding below confidence gate: Multiattack Because Muck-Lunge is a cone that can catch any number of creatures in its area, resolving a Multiattack requires the GM to first place the cone against a shifting battlefield, then run two separate grapple states, which is more tracking than a CR 1 turn affords.
[reskin] audit: [Muck-Lunge: The prerequisite lists no directional …unges. (about: "each creature in a 15-foot Cone"), Muck-Lunge: The fiction upgrades to dragging a cre…lled up to 5 feet straight toward the bog hound")]
[reskin] audit defect: Actions/"Muck-Lunge" [model-written] medium misnamed — The prerequisite lists no directional anchor for the Cone, and the name promises a lunging leap that the row never performs, so the GM cannot tell where the cone originates or what supposed lunge it represents. — Either state the cone emanates from the hound with the hound moving as part of the lunge, or recast the row as a reach or line attack that matches a charge; as written nothing in the text lunges. (about: "each creature in a 15-foot Cone")
[reskin] audit defect: Actions/"Muck-Lunge" [model-written] medium undelivered — The fiction upgrades to dragging a creature under, but this row only tugs the target 5 feet and knocks it Prone, so its name and the GM's ask for a mud hound that hauls fishermen into the bog is not delivered by the payload. — Extend the pull to actually move the target into the hound's space or adjacent water and impose a Grabbed/Restrained consequence so the drag is the point of the row. (about: "pulled up to 5 feet straight toward the bog hound")
[reskin] clause unresolved: "Muck-Lunge" carries "When the bog hound is grappling a creature, it can drag ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Bog Hound" — donor brute-5-grappler, CR 1
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 12 model call(s)
```

---

## 03. Owlbear — CR 3

**Input:** `name: Owlbear | that has learned to climb`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library · **elapsed** 28s

### Block
```
Owlbear
Large monstrosity, unaligned
Armor Class

13 (natural armor)

Hit Points: 

59 (7d10 + 21)

Speed: 

40 ft., climb 30 ft.

STR	DEX	CON	INT	WIS	CHA


20 (+5)

	

12 (+1)

	

17 (+3)

	

3 (-4)

	

12 (+1)

	

7 (-2)

Skills: 

Perception +5

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

None

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Spider Climb.The owlbear can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Cliffside Drop.As a bonus action, the owlbear targets one creature within 5 feet of it. The target must make a DC 15 Strength saving throw, taking 13 (3d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.

Actions
Multiattack: The owlbear makes two Rend attacks.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
```

### Trace
```
[concept] thin but a print creature — keeping route-first: Owlbear — that has learned to climb
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("has learned to climb") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Owlbear" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Monstrosity typeFrom=the route call themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: vertical ambush from walls and cliffs [behavior] | hooked climbing foreclaws [body] | owl-bear hybrid body [body]
[concept] identity: The climbing owlbear opens by scaling a wall, tree, or cliff face and dropping onto prey from above, using its hooked foreclaws to seize a handhold and a victim in the same lunge. Every round after it strikes and scrambles back up out of reach, circling the fight vertically, then drops again when a target separates from the group. Under pressure it does not flee — it retreats upward, screams its unnerving hoot, and waits for the party to break formation before ambushing the straggler.
[concept] lore: A lineage of owlbears that den in the cliffs above old trade roads, descended from a mage's failed experiment that bred climbing instinct into a beast that was never meant to leave the ground.
[reskin] print canon defenses: HP 58 -> 59, AC 13 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +4 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] seats: action <- "vertical ambush from walls and cliffs" | trait <- "hooked climbing foreclaws"
[reskin] [path] decides: twist on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear — that has learned to climb" heads on the Owlbear — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] the sheet's declared ask: climb — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "has learned to climb" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "has learned to climb" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Owlbear —" -> has (descriptive), head | "has learned to climb" -> has (mechanical) [asked: at_will/at_will/movement] [askMechanic: climb]
[reskin] open asks handed to the idea call: "has learned to climb" [climb]
[reskin] idea anchored: action — "As a bonus action, the owlbear launches itself up a wall, cliff, or tr" answers the GM's "has learned to climb"
[reskin] idea unanchored: trait — "Hooked Climbing Foreclaws. The owlbear can climb sheer surfaces and ha" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: snare, shield-bash, random-ray, spew, snare-bolt, blink, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] menu: taste stands down — action answers the GM's "has learned to climb", so role and style do not filter the menu (legality still does); 10 template(s) offered
[reskin] signature idea (action): "As a bonus action, the owlbear launches itself up a wall, cliff, or trunk within reach and perches there, its claws hooked into the stone; while perched it is out of melee reach of creatures without a climb speed, and the first creature that ends its turn more than arm's length from its allies is marked as prey — the owlbear drops on that target, landing in its space without provoking Opportunity " [bonus_action/always/movement] [family: mark] — menu: rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, shell-withdraw, lay-on-hands, rally (+ shelf: trample, leap, gaze-single, lure, ground-burst, sensory-strike, disarm, thrown-burst-seed, delayed-brand, zone, execute, seal, wail, active-toll, pacify, escalating-dread, terror-pulse, slow-bolt, push-prone, herd, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, riposte, answering-strike, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: self-invisibility (always/movement), focus (always/movement), feint-slip (always/movement)
[reskin] classification handed to the fit call: shape=movement when=at_will often=at_will
[reskin] word match declined by the call: self-invisibility, focus, feint-slip, rally, patient-defense, second-wind, lay-on-hands, aggro-curse, hook-rider, rampage, leap, pounce, delayed-brand, execute, reveal — the key word does not mean the mechanic here
[reskin] closest refused: action — "shell-withdraw" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: lets the creature climb and perch out of melee reach on a surface)
[reskin] seat authored nothing: action — the call was asked to write a bonus action for "As a bonus action, the owlbear launches itself up a wall, cliff, or tr" and wrote no row of that kind (refused: "Perched Ambusher" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: action — the first answer was refused ("Perched Ambusher" — a trait is not a save — the save form takes stat, target and effect as fields and the eng); asking once more with the reason
[reskin] authored row answers the GM: action — "Cliffside Drop" was written for "has learned to climb", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("lets the creature climb and perch out of melee reach on a surface") and wrote a bonus action instead: "Cliffside Drop" -> Bonus Actions. *Strength Saving Throw*: DC 15, one creature within 5 feet. *Failure:* 13 (3d8) Bludgeoning damage, and the target has t
[reskin] authored row numbers: "Cliffside Drop" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Cliffside Drop" after ""Perched Ambusher" — a trait is not a save — the save form takes stat, target an"
[reskin] signature authored: no template — the seat wrote it -> Bonus Actions/"Cliffside Drop" ("As a bonus action, the owlbear launches itself up a wall, cliff, or trunk within reach and perches there, its claws hooked into the stone; while perched it is o [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Hooked Climbing Foreclaws. The owlbear can climb sheer surfaces and hang from ceilings without a check, and while it is gripping a wall or overhead surface its eyes and ears miss nothing of the ground below — it cannot be Surprised, and it has Advantage on Perception checks made from its perch." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — climb: spider-climb
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] keys would have bound: trait — spider-climb (climb, climbs, climbing)
[reskin] classification handed to the fit call: shape=movement when=at_will often=at_will
[reskin] word match declined by the call: bound, relentless-pursuit — the key word does not mean the mechanic here
[reskin] signature template (trait): spider-climb -> Traits/"Sheer Climber" ("The creature can climb difficult surfaces, including along ceilings, without nee [verb: climb:concept, climbs:concept, climbing:concept, ceilings:idea, walls:idea, wall:idea, sheer:idea]")
[reskin] one mechanic, one name: Traits/"Sheer Climber" -> "Spider Climb" — this row is spider-climb and does what every spider-climb row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Claw = none
[reskin] print canon attack: "Claw" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon saves: proficient in nothing — the Owlbear's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon skills: "Perception +3, Stealth +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Owlbear's
[reskin] print canon: chassis row leaves — Traits/"Wall Stalker" is the seat's, not the Owlbear's
[reskin] row binds its clause: "Spider Climb" answers "has learned to climb" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "has learned to climb" -> "Spider Climb" — trigger at_will, limit at_will
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Cliffside Drop: Nothing in this entry or the body …plain slam. (about: "one creature within 5 feet")]
[reskin] audit rename held — "Cliffside Drop" was written for the GM's own clause (cl_54jrqr: "has learned to climb"), so "Crushing Pounce" does not land; the finding stands as logged
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Owlbear" — donor skirmisher-3, CR 3
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 11 model call(s)
```

---

## 04. Passing Bell Ringer — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-2 -> CR 3
**Signature:** library · **elapsed** 31s

### Block
```
Passing Bell Ringer

Medium Undead, Neutral

AC 11
Initiative +1 (11)

HP 45 (10d8)

Speed 5 ft., Fly 40 ft. (hover)

MOD
SAVE
STR
7
-2
-2
INT
10
+0
+0
MOD
SAVE
DEX
13
+1
+1
WIS
12
+1
+1
MOD
SAVE
CON
10
+0
+0
CHA
17
+3
+3

Skills Perception +3, Stealth +5

Resistances Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Death-Bell Toll. The bell ringer knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.

Ethereal Sight. The bell ringer can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The bell ringer can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The bell ringer makes two Withering Touch attacks. It can replace one attack with a use of Knell of the Named Hour.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Knell of the Named Hour. Dexterity Saving Throw: DC 13, each creature within 30 feet. Failure: 10 (3d6) Necrotic damage, and the target has the Prone condition. Success: Half damage only.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the bell ringer and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the bell ringer's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the bell ringer can see within 5 feet. Failure: The target is possessed by the bell ringer; the bell ringer disappears, and the target has the Incapacitated condition and loses control of its body. The bell ringer now controls the body, but the target retains awareness. The bell ringer can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The bell ringer's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the bell ringer leaves as a Bonus Action. When the possession ends, the bell ringer appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The bell ringer casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The bell ringer is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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

### Trace
```
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: ✓ ("chapel bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] name: provided_name rejected — "a chapel bell-ringer's ghost that tolls …" is the description, not a name
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: tolling the death-bell for the dying [behavior] | the phantom bell and rope it rings [object] | a shadowy incorporeal bell-ringer's form [body]
[concept] identity: The bell-ringer's ghost does not begin by striking — it begins by tolling, and those who hear its chapel bell feel the life drain out of them and are marked for death, one round of resonant damage at a time, while the phantom drifts through walls to find cover from any light. In a fight it slides through stone and around corners to keep the party out of formation, choosing the weak or dying to finish with a touch of grave-cold, and it uses the bell itself as its weapon: a swing or a targeted knell. Under pressure it does not flee, but falls back to the bell or the churchyard — the bell is the anchor of its oath, and it fights to the last toll, ringing louder and faster as it is pressed.
[concept] lore: A bell-ringer who swore to ring the passing bell for every dying soul in the parish, and who died still tolling when no one came to relieve him, now rings on: it comes to those whose death is near and tolls the bell a last time over them, wanting only to finish the office it could not leave.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] seats: action <- "tolling the death-bell for the dying" | trait <- "the phantom bell and rope it rings"
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the bell ringer" — the call's own answer (kind), built from the name
[reskin] inline form: "the bell ringer" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: drain — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: save_single] [askMechanic: curse]
[reskin] open asks handed to the idea call: "tolls for the dying" [curse] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The bell ringer swings the phantom bell's rope and lets the clapper fa" answers the GM's "tolls for the dying"
[reskin] idea unanchored: trait — "The ringer's bell and rope are not held but hung in its own hollow che" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, seal, random-ray, spew, snare-bolt, zone-seed, blighted-ground, shell-withdraw, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, aberrant-ground, web-walker, energy-aura, noxious-aura, marking-light, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider
[reskin] menu: taste stands down — action answers the GM's "tolls for the dying", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The bell ringer swings the phantom bell's rope and lets the clapper fall: each creature of its choice within the knell's reach hears the passing toll and must succeed on a Wisdom saving throw or be marked for death — it takes Necrotic damage at the start of each of its turns until it receives magical healing or the bell ringer is destroyed, and a creature that fails while Bloodied drops Prone as i" [action/save/condition] [family: mark] — menu: execute, wail, lure, active-toll, ground-burst, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, zone, disarm, push-prone, thrown-burst-seed, curse-debt, reveal, wind-up (+ shelf: delayed-brand, blink, patient-defense, self-invisibility, focus, feint-slip, rampage, lay-on-hands, second-wind, aggro-curse, riposte, answering-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — drain: drain
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: drain (save/damage), lure (save/condition), pacify (save/condition)
[reskin] keys would have bound: action — active-toll, sensory-strike (toll, bell)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: active-toll, wail, escalating-dread, terror-pulse — the key word does not mean the mechanic here
[reskin] closest refused: action — "delayed-brand" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: marks a creature so it takes Necrotic damage at the start of each of i)
[reskin] authored row answers the GM: action — "Knell of the Named Hour" was written for "tolls for the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("marks a creature so it takes Necrotic damage at the start of each of i") and wrote an action instead: "Knell of the Named Hour" -> Actions. *Wisdom Saving Throw*: DC 13, each creature within 30 feet. *Failure:* 17 (5d6) Necrotic damage, and the target has the 
[reskin] authored row numbers: "Knell of the Named Hour" — the call declared (unanswered) number(s) promised
[reskin] signature authored: no template — the seat wrote it -> Actions/"Knell of the Named Hour" ("The bell ringer swings the phantom bell's rope and lets the clapper fall: each creature of its choice within the knell's reach hears the passing toll and must s [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The ringer's bell and rope are not held but hung in its own hollow chest — it can ring them without hands, and the toll carries through stone, so any creature it has marked for death cannot benefit from cover or concealment against its Perception, and the ringer always knows which of the marked is nearest to dying." [trait/always/resource] [family: mark] — menu: phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, relic-object, warded-mending, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: phobia (always/condition), faultless-tracker (always/condition), bloodied-fury (always/defense)
[reskin] keys would have bound: trait — resonant-body (toll, bell)
[reskin] word match declined by the call: bound, relic-object, uncanny-sense, resonant-body, warded-mending — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Death-Bell Toll" is HANDED "a chapel bell-ringer's" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): faultless-tracker -> Traits/"Death-Bell Toll" ("the ringer always knows which of the marked is nearest to dying, and its toll ca [verb: always knows:idea, marked:idea]")
[reskin] weapons answered: Grave Touch = none; Sorrowful Knell = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Ghost's own type stands
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Grave Touch" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the bell ringer makes two Withering Touch attacks." — the Ghost's own
[reskin] save follows the effect: Actions/"Knell of the Named Hour" Wisdom -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in nothing — the Ghost's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Knell of the Named Hour.
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 8 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] area swap priced at half a hit: "Knell of the Named Hour" is offered in an attack's place AT WILL and dealt 17 against a whole hit of 19; the ceiling is half a hit (10) with a save for half — print offers 15 area rows in an attack's place and none deals damage (owner's R1)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] audit: [Death-Bell Toll: The trait's tracking window reach…reature it has damaged within the last 24 hours"), Knell of the Named Hour: The knell declares no ori…ot range. (about: "each creature within 30 feet"), Knell of the Named Hour: Prone on a hovering incor…(about: "and the target has the Prone condition")]
[reskin] audit defect: Traits/"Death-Bell Toll" [catalog] high untrackable — The trait's tracking window reaches back 24 hours, longer than a turn, so the GM cannot check which creatures it has damaged without an off-sheet log the block gives no way to keep. — Tie the tracked set to something the table can verify this round, or supply a means of recording marked creatures. (about: "knows the direction and distance to any creature it has damaged within the last 24 hours")
[reskin] audit defect: Actions/"Knell of the Named Hour" [model-written] medium other — The knell declares no origin point and no range type, so a GM reading the action alone cannot place it — the listed ability that can replace an attack in place of one Withering Touch is easy to read as an area ability confined to that attack slot, which is the ambiguity it creates. — State the origin (the bell ringer or an object) and the area type for the 30-foot range. (about: "each creature within 30 feet")
[reskin] audit defect: Actions/"Knell of the Named Hour" [model-written] medium undelivered — Prone on a hovering incorporeal ghost imposes nothing on flying targets without a fly speed, and the bell ringer itself is immune to Prone, so the name promises a toll for the dying while the condition it inflicts is a floor-bound state the creature cannot itself experience. — Give the knell a condition that matters for a hovering target or drop the Prone rider. (about: "and the target has the Prone condition")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Passing Bell Ringer" — donor lurker-2, CR 3
[harness] recorded 10 model call(s)
```

---

## 05. Air Elemental — CR 5

**Input:** `name: Air Elemental | that carries stolen voices`
**Donor:** skirmisher-3 -> CR 5
**Signature:** library · **elapsed** 28s

### Block
```
Air Elemental

Large Elemental, Neutral

AC 15
Initiative +5 (15)

HP 90 (12d10 + 24)

Speed 10 ft., Fly 90 ft. (hover)

MOD
SAVE
STR
14
+2
+2
INT
6
-2
-2
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
14
+2
+2
CHA
6
-2
-2

Skills Perception +3, Stealth +8

Resistances Bludgeoning, Lightning, Piercing, Slashing

Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious

Senses darkvision 60 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Air Form. The elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The elemental makes two Thunderous Slam attacks. It can replace one attack with a use of Stolen Voices.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Stolen Voices. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the elemental's next turn. If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.

Whirlwind (Recharge 4-6). Strength Saving Throw: DC 13, one Medium or smaller creature in the elemental's space. Failure: 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the elemental and has the Prone condition. Success: Half damage only.

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

### Trace
```
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] skirmisher-winged type=Elemental mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-winged: ✓ ("Air Elemental") | skirmisher-winged: no line key in the words — the model's read of its quote
[concept] name: "Air Elemental" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Elemental typeFrom=the route call themes=elemental/voice mind=sapient style=winged energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Air Elemental"
[concept] mechanics: none claimed
[concept] signature elements: stolen voices crying from its winds [aura] | snatching prey aloft and dropping them [behavior] | a shrieking column of living wind [body]
[concept] identity: A column of shrieking wind that opens a fight by stooping on the loudest creature in reach, its stolen voices crying out in a dozen throats to scatter and bewilder before it slams home. Every round after, it strikes on the wing — snatching a foe into its howling body, carrying them aloft, and dropping them, all the while layering the screams of the voices it has taken over the battlefield so prey cannot tell friend from threat. It is vain and cruel, fighting to the death rather than suffer the silencing of its hoard, and it prizes the voices of spellcasters and singers above all.
[concept] lore: Born where a great storm tore through a village mid-song, this elemental still carries every voice the wind ripped from the living, and it hunts the loud and the beautiful to add to its chorus.
[reskin] print canon route: the Air Elemental's body outranks the winged seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 81 -> 90, AC 16 -> 15 — the Air Elemental's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 14, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's at its own CR; attack +6 -> +8, DC 13 (print's)
[reskin] donor: skirmisher-3 -> CR 5
[reskin] seats: action <- "snatching prey aloft and dropping them" | trait <- "stolen voices crying from its winds"
[reskin] [path] decides: twist on the Air Elemental (the matcher agrees)
[reskin] print canon: "Air Elemental — that carries stolen voices" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the elemental" — the call answered "the elemental" (kind), which the name does not support
[reskin] inline form: "the elemental" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (mechanical) [asked: save_single] [askMechanic: dazzle]
[reskin] open asks handed to the idea call: "carries stolen voices" [dazzle]
[reskin] idea anchored: action — "The elemental stoops upon a creature it can see within reach, its stol" answers the GM's "carries stolen voices"
[reskin] idea unanchored: trait — "The elemental's stolen voices cry out from its winds, layering screams" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: gaze-single, snare, shield-bash, random-ray, spew, snare-bolt, blink, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "carries stolen voices", so role and style do not filter the menu (legality still does); 15 template(s) offered
[reskin] signature idea (action): "The elemental stoops upon a creature it can see within reach, its stolen voices shrieking in a hundred throats. The target must succeed on a Wisdom saving throw or be Frightened of the elemental until the end of its next turn, unable to tell friend from threat in the cacophony." [action/save/condition] [family: mark] — menu: lure, ground-burst, sensory-strike, disarm, thrown-burst-seed, execute, active-toll, pacify, escalating-dread, terror-pulse, slow-bolt, push-prone, curse-debt, reveal, wind-up (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, lay-on-hands, riposte, answering-strike, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), sensory-strike (save/condition), pacify (save/condition)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: lure, sensory-strike, pacify — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "escalating-dread" has no key-table verb, but the call quotes "carries stolen voices" from the description
[reskin] signature template: escalating-dread -> Actions/"Stolen Voices" ("The target must succeed on a Wisdom saving throw or be Frightened of the element [shape fit, no verb match]")
[reskin] signature idea (trait): "The elemental's stolen voices cry out from its winds, layering screams over the battlefield. Whenever a creature within the elemental's space or within reach of it makes an attack roll, it must succeed on a Wisdom saving throw or have Disadvantage on the roll, as the chorus confuses friend and foe." [trait/always/condition] [family: zone] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, mimicry, truth-aura, fear-aura, assassinate
[reskin] lead by this seat's own clause: trait — "dazzle" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), berserk (always/condition), bloodied-fury (always/defense)
[reskin] keys would have bound: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: mimicry, fear-aura, composed:zone:condition:frightened, composed:zone:condition:deafened — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:frightened" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a Wisdom save imposed on creatures in its space or reach that, on fail)
[reskin] seat answered, but: the call said "The elemental's stolen voices cry out from its winds, layering screams over the battlefield. Whenever a creature within " is carried by "Chorus of the Lost", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's stolen voices cry out from its winds, layering screams" and wrote no row of that kind (refused: "Chorus of the Lost" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Chorus of the Lost" — a trait is not a save — the save form takes stat, target and effect as fields and the e); asking once more with the reason
[reskin] seat answered, but: the call said "The elemental's stolen voices cry out from its winds, layering screams over the battlefield. Whenever a creature within " is carried by "Chorus of the Lost", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's stolen voices cry out from its winds, layering screams" and wrote no row of that kind (refused: "Chorus of the Lost" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Chorus of the Lost" — a trait is not a save — the save form takes stat, target and effect; second: "Chorus of the Lost" — a reaction's save deals no damage here, so say what the target suff; the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key mimicry, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "mimicry" is keyed by the GM's stolen voice+stolen voices+voices and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "The elemental's stolen voices cry out from its winds, layering screams over the battlefield. Whenever a creature within the elemental's space or within reach of it makes an attack roll, it must succeed on a Wisdom saving throw or have Disadvantage on the roll, as the chorus confuses friend and foe." [trait/always/condition] — the model found no template that holds it (offered: phobia, berserk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, mimicry, assassinate, truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded)
[reskin] concept-first trait skipped: mimicry — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Slam = none
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon size: Medium -> Large — the Air Elemental's
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Air Elemental's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 50 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Slam" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] print canon multiattack: "the elemental makes two Thunderous Slam attacks." — the Air Elemental's own
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in nothing — the Air Elemental's own set, at this sheet's stats and PB 3 (changed DEX)
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Air Elemental's
[reskin] print canon: chassis row leaves — Traits/"Windborne" is the seat's, not the Air Elemental's
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Stolen Voices.
[reskin] lint: 0 findings
audit finding below confidence gate: Stolen Voices A single-target Frightened for one round on a 60-foot save is a dead payload for a CR 5 creature whose Multiattack replaces a 14-damage Thunderous Slam with it; without the conditional damage it deals nothing and does not meaningfully control the target.
[reskin] audit: [Stolen Voices: The damage rider keyed on 'already … ability, it also takes 9 (2d8) Thunder damage.")]
[reskin] audit defect: Actions/"Stolen Voices" [catalog] medium misnamed — The damage rider keyed on 'already Frightened by this ability' contradicts itself: on every failed save the target is Frightened, so the bonus only ever lands on a repeated use, meaning the creature steals no voices — it produces no sound-related effect beyond standard Thunder damage. — Add a non-damage voice-stealing payload (e.g., the target cannot speak or cast spells with verbal components until the end of its next turn) so the entry actually delivers theft of voice. (about: "If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] a Wisdom save imposed on creatures in its space or reach that, on failure, gives Disadvantage on their attack rolls — "The elemental's stolen voices cry out from its winds, layering screams over the battlefield. Whenever a creature within the elemental's space or within reach of it makes an attack roll, it must succeed on a Wisdom saving throw or have Disadvantage on the roll, as the chorus confuses friend and foe." — Air Elemental [seat: trait [trait/always/condition]] (closest offered: composed:zone:condition:frightened) [effect: condition] [menu: phobia berserk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind evasion relentless-pursuit bound guarded-stance undead-fortitude mimicry assassinate truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded] [same-cell unoffered: adhesive faultless-tracker marking-light kill-denial] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement marking-light:body-verdict sealed-body:role relic-object:body-verdict blurred-form:body-verdict death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Air Elemental" — donor skirmisher-3, CR 5
[harness] recorded 10 model call(s)
```

---

## 06. Spoilheap Lurker — CR 5

**Input:** `a quarry-pit thing of living scree that buries what it catches`
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 38s

### Block
```
Spoilheap Lurker
Medium elemental, unaligned
Armor Class

13 (natural armor)

Hit Points: 

97 (13d8 + 39)

Speed: 

30 ft., burrow 30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

16 (+3)

	

4 (-3)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +6, Perception +3

Saving Throws: 

STR +6

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

tremorsense 60 ft., passive Perception 13

Languages: 

None

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Loose Scree.The lurker squeezes through any gap wider than a paving stone, moves through spaces occupied by other creatures, and ignores difficult terrain made of rubble, gravel, or broken quarry ground; a creature that starts its turn in a space the lurker moved through has its speed reduced by half until the end of that turn as the ground shifts out from under it.
Entomb (Bonus Action).The lurker entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the lurker, and takes 7 (2d6) bludgeoning damage at the start of each of the lurker's turns. The lurker can have only one creature entombed at a time. If the lurker takes 15 damage or more in a single turn from the entombed creature, the lurker must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the lurker. If the lurker dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The lurker makes two Rubble Lash attacks. It can replace one attack with a use of Scree Buckle.
Rubble Lash: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Scree Buckle: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a creature, it is subjected to the following effect. The target must succeed on a DC 14 Strength saving throw or be knocked prone.
Screeburst Emergence (Recharge 5-6): If the lurker is burrowing, it erupts from the ground at a point within 5 feet of one creature. That creature must make a DC 14 Dexterity saving throw, taking 9 (2d8) bludgeoning damage on a failed save. On a failed save, the target is knocked prone. The lurker then makes one Rubble Lash attack against the target.
```

### Trace
```
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[route] brute-grappler type=Elemental mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "buries what it catches" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("buries what it catches") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/grasping mind=mindless style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: burying caught prey under heaped scree [behavior] | a body of shifting loose quarry stone [body]
[concept] identity: A quarry-pit creature of living scree opens a fight by flowing its body into a low, grinding ridge that slopes toward prey, then lunges to wrap around legs and drag whatever it catches down into the loose stone of its own mass. Each round it heaps scree over a held victim, smothering and crushing in the same motion while its outer surface churns so that blows land in sliding rubble. It is a mindless thing of settling weight: it does not pursue cunningly, does not flee when broken, and simply keeps piling itself onto whatever it has caught until the movement stops.
[concept] lore: Born in abandoned quarry cuts where the spoil heaps were left to shift for a hundred years, it is a slow elemental hunger that remembers the pits it came from and wants only to fill every hollow it finds — including the one inside a traveler's armor.
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as mindless, and the card's 4 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] donor: brute-5-grappler -> CR 5
[reskin] seats: action <- "burying caught prey under heaped scree" | trait <- "a body of shifting loose quarry stone"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Entomb — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the lurker" — the call's own answer (kind), built from the name
[reskin] inline form: "the lurker" — the model's own reading of the name
[reskin] save dc derived: DC 13, 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral" -> Unaligned — a Elemental the call reads as mindless at INT 4 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a quarry-pit thing of living scree" -> has (descriptive), head | "buries what it catches" -> has (mechanical) [asked: on_hit/condition] [askMechanic: swallow]
[reskin] answered by the chassis: "buries what it catches" asks swallow and "Entomb" already carries it (declared engulf_engine) — no row is requested for it, and the row now carries the GM's words
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "When the lurker hits a creature with Rubble Lash while that creature i" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Loose Scree: the lurker can squeeze through any gap wider than a pavin" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, life-drain
[reskin] menu pruned: action — exploiter (the sheet cannot render them)
[reskin] signature idea (action): "When the lurker hits a creature with Rubble Lash while that creature is Braced — standing on rubble, scree, or broken ground, or having just climbed or scrambled — the scree heaps up its legs and pins it, giving the target the Prone condition and half its speed until it stands up and tears free of the sliding stone." [rider/on_hit/condition] [family: drag] — menu: stunning-strike, charge-push, pounce (+ shelf: condition-payoff, ground-burst, burrow-ambush, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal, second-wind, aggro-curse, self-invisibility, focus, answering-strike)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), pounce (on_hit/condition), charge-push (on_hit/movement)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: stunning-strike, charge-push, condition-payoff — the key word does not mean the mechanic here
[reskin] closest refused: action — "pounce" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: prone plus halved speed on a hit while standing on broken ground, clea)
[reskin] clause already answered: "a quarry-pit thing of living scree" is carried by "Avalanche Clutch" — the seat read the sheet and declined to write a second row for it
[reskin] seat authored nothing: action — the call was asked to write an action for "When the lurker hits a creature with Rubble Lash while that creature i" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat answered, but: the call said "When the lurker hits a creature with Rubble Lash while that creature is Braced — standing on rubble, scree, or broken gr" is carried by "Scree Snare", and no such row is on this sheet — the clause stays open
[reskin] strike written from its attack: "Scree Snare" clones "Rubble Lash" and adds a Strength save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] seat landed on the second try: action — "Scree Snare" after "you wrote no row of the kind asked for (an action)"
[reskin] value check: "Scree Snare" EV 2.3 vs floor 8.8 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Scree Snare" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: condition-payoff left the shelf — the call declined it for this sheet
[reskin] fallback skipped: exploiter (the sheet cannot render it)
[reskin] value check: "Erupting Ambush (Recharge 5-6)" EV 18.3 vs floor 8.8 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] library seed drawn: burrow-ambush -> Actions/"Erupting Ambush (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Loose Scree: the lurker can squeeze through any gap wider than a paving stone and move through spaces occupied by other creatures, and it ignores Difficult Terrain made of rubble, gravel, or broken quarry ground. Anything in such a space it moves through is unsettled: a creature that starts its turn in that space has its Speed reduced by half until the end of its turn as the ground shifts out from" [trait/always/movement] [family: zone] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), earth-glide (always/movement)
[reskin] keys would have bound: trait — terrain-walk, aberrant-ground (scree)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: terrain-walk, aberrant-ground, tunneler, relentless-pursuit, bound — the key word does not mean the mechanic here
[reskin] closest refused: trait — "earth-glide" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: moving through other creatures' spaces and halving the Speed of creatu)
[reskin] seat answered, but: the call said "Loose Scree: the lurker can squeeze through any gap wider than a paving stone and move through spaces occupied by other " is carried by "Loose Scree", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("moving through other creatures' spaces and halving the Speed of creatu") and wrote a trait instead: "Loose Scree" -> Traits. The lurker squeezes through any gap wider than a paving stone, moves through spaces occupied by other creatures, and ign
[reskin] authored row numbers: "Loose Scree" — the call declared 0 number(s) promised
[reskin] free signature row: "Loose Scree" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Loose Scree" ("Loose Scree: the lurker can squeeze through any gap wider than a paving stone and move through spaces occupied by other creatures, and it ignores Difficult Terr [authored: the catalog held no shape for it]")
[reskin] weapons answered: Rubble Lash = none
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a quarry-pit thing of living scree that " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Scree Snare.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Loose Scree" [no template]
[reskin] ask vs row MISMATCH: "buries what it catches" -> "Entomb" — trigger: asked on_hit, row reads at_will
[reskin] save stat from print grammar: Actions/Scree Snare imposes Prone by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] lint: 0 findings
audit finding below confidence gate: Erupting Ambush (Recharge 5-6) The recharge action's whole payoff is 2d8 Bludgeoning plus Prone plus a Rubble Lash — a single Lash the lurker could already make as part of Multiattack — so the ambush has no signature teeth of its own.
[reskin] audit: [Loose Scree: The trait requires the GM to track ev…peed reduced by half until the end of that turn"), Scree Snare: Scree Snare is a worse copy of Rubble…s. (about: "The target has the Prone condition."), Scree Snare: The name 'Snare' promises restraint o…e. (about: "The target has the Prone condition."), Entomb: Entomb uses the Grappled condition as its …one Medium or smaller creature it is grappling."), Erupting Ambush (Recharge 5-6): The row's name 'Er…round at a point within 5 feet of one creature.")]
[reskin] audit rename: "Scree Snare" -> "Scree Buckle"
[reskin] audit rename: "Erupting Ambush (Recharge 5-6)" -> "Screeburst Emergence (Recharge 5-6)"
[reskin] audit defect: Traits/"Loose Scree" [model-written] high untrackable — The trait requires the GM to track every space the lurker passed through since its last turn, with no marker, area, or duration on those spaces, so the 'space the lurker moved through' cannot be adjudicated at the table. — Replace the trail clause with a defined, immediately checkable area (such as spaces the lurker moves through on its current turn, or a burst/emanation around its space) so the GM never has to reconstruct a path. (about: "a creature that starts its turn in a space the lurker moved through has its Speed reduced by half until the end of that turn")
[reskin] audit defect: Bonus Actions/"Entomb" [print] high open_ended — Entomb uses the Grappled condition as its only prerequisite, but nothing on the sheet says the Entombed state keeps or ends the grapple, whether the target remains grappled while entombed, or what escape DC applies — the GM cannot tell whether the target is still grappled or what governs its release beyond the damage clause. — State explicitly whether the grapple persists while entombed and give the target a stated escape (escape DC or Strength check) from inside, rather than leaving the Grappled interaction undefined. (about: "The lurker entombs one Medium or smaller creature it is grappling.")
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Screeburst Emergence (Recharge 5-6)) — the sameness metric
[reskin] clause unresolved: "Loose Scree" carries "Loose Scree: the lurker can squeeze through any gap wide", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] record completed: "Scree Buckle" imposes Prone by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] done: "Spoilheap Lurker" — donor brute-5-grappler, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 13 model call(s)
```

---

## 07. Hydra — CR 8

**Input:** `name: Hydra | whose stumps smoke instead of regrowing`
**Donor:** brute-5 -> CR 8
**Signature:** library · **elapsed** 29s

### Block
```
Hydra
Huge monstrosity, unaligned
Armor Class

15 (natural armor)

Hit Points: 

184 (16d12 + 80)

Speed: 

40 ft., swim 40 ft.

STR	DEX	CON	INT	WIS	CHA


20 (+5)

	

12 (+1)

	

20 (+5)

	

2 (-4)

	

10 (+0)

	

7 (-2)

Skills: 

Perception +6

Condition Immunities: 

blinded, charmed, deafened, frightened, stunned, unconscious

Senses: 

darkvision 60 ft., passive Perception 16

Languages: 

None

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Stump Vapor.Any creature that starts its turn in a 10-foot radius originating from the hydra must make a DC 16 Constitution saving throw. On a failed save, the target is poisoned until the end of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Hold Breath.The hydra can hold its breath for 1 hour.
Multiple Heads.The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads.For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.
Smoldering Stumps (Recharge 5-6).As a bonus action, the hydra causes each creature within 10 feet of it to make a DC 16 Constitution saving throw, taking 35 (10d6) poison damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also poisoned until the end of its next turn.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
```

### Trace
```
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-regenerator: ✓ ("whose stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] name: "Hydra" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/venomous mind=bestial style=regenerator energy=Poison mix=both identity=✓ lore=✓
[concept] name: provided "Hydra"
[concept] mechanics: regeneration
[concept] signature elements: severed necks sealing into smoking stumps instead of regrowing [behavior] | a wall of many biting heads [body] | choking smoke that thickens with every wound [aura]
[concept] identity: A many-headed hydra whose severed necks seal over into smoldering stumps, it wades into reach swinging a wall of biting heads and bathes the field in stinging smoke every round its wounds close. Each head it loses stops biting but keeps burning, so the longer the fight drags the more the battlefield fills with choking vapor and the fewer teeth it can bring to bear. It fights to the death, driven by the sting of its own smoldering flesh rather than any cunning.
[concept] lore: Born where some old hex-fire soaked into the swamp mud, the smoking hydra nests over its own scorched ground and devours anything that wanders into the haze, its sealed stumps smoldering forever because the fire beneath its hide has nowhere else to go.
[reskin] print canon route: the Hydra's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon route: the regenerator seat's organ leaves too — the Hydra has no Regeneration of its own
[reskin] print canon defenses: HP 136 -> 184, AC 14 -> 15 — the Hydra's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 20, INT 2, WIS 10, CHA 7 — the Hydra's at its own CR; attack +7 -> +8, DC 16 (print's)
[reskin] donor: brute-5 -> CR 8
[reskin] seats: package <- "a wall of many biting heads"
[reskin] [path] decides: twist on the Hydra (the matcher agrees)
[reskin] print canon: "Hydra — whose stumps smoke instead of regrowing" heads on the Hydra — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] name_element answered: Smoldering Stumps = imagery
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the hydra" — the call answered "the hydra" (kind), which the name does not support
[reskin] inline form: "the hydra" — the model's own reading of the name
[reskin] the sheet's declared ask: mend — the route call's one answer for the whole concept
[reskin] lacks asked: "instead of regrowing"
[reskin] the clause is its own quote: limit "at_will" stands on "Hydra — whose stumps smoke instead of regrowing" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Hydra — whose stumps smoke instead of regrowing" -> LACKS (mechanical) [asked: at_will/save_area] [askMechanic: zone]
[reskin] open asks handed to the idea call: "Hydra — whose stumps smoke instead of regrowing" [zone]
[reskin] idea anchored: action — "As a bonus action, the hydra wrenches a neck it has bitten clean away," answers the GM's "Hydra — whose stumps smoke instead of regrowing"
[reskin] idea unanchored: trait — "Each neck it loses does not regrow; instead the wound seals into a smo" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 35 of 35 answered; not true of this body: shield-bash, active-toll, random-ray, herd, drain, shell-withdraw, rally, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, faultless-tracker, web-walker, uncanny-sense, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, life-drain
[reskin] menu: taste stands down — action answers the GM's "Hydra — whose stumps smoke instead of regrowing", so role and style do not filter the menu (legality still does); 9 template(s) offered
[reskin] signature idea (action): "As a bonus action, the hydra wrenches a neck it has bitten clean away, loosing a billowing cloud of stinging hex-smoke that fills the air around it. The stump seals shut, smoldering, and the hydra's own sting drives it onward rather than any thought of retreat." [bonus_action/save/condition] [family: zone] — menu: rampage, second-wind, aggro-curse, self-invisibility, focus, coating, patient-defense, lay-on-hands, feint-slip (+ shelf: trample, leap, thrown-burst, ground-burst, spew, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, zone, execute, lure, pacify, slow-bolt, sensory-strike, disarm, delayed-brand, curse-debt, zone-seed, reveal, answering-strike, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, isolation)
[reskin] lead by this seat's own clause: action — "zone" from the clause this seat serves, not the sheet's "mend"
[reskin] composed candidates: none action — the zone family composes a trait and this is the bonus_action seat
[reskin] declared mechanic leads the menu: action — zone: zone, zone-seed
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: zone (once_per_fight/condition), zone-seed (always/damage), aggro-curse (save/movement)
[reskin] keys would have bound: action — zone, zone-seed (smoke)
[reskin] classification handed to the fit call: shape=save_area often=at_will
[reskin] closest refused: action — "zone" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a one-off area burst that both damages and imposes a condition on crea)
[reskin] authored row answers the GM: action — "Smoldering Stumps (Recharge 5-6)" was written for "Hydra — whose stumps smoke instead of regrowing", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a one-off area burst that both damages and imposes a condition on crea") and wrote a bonus action instead: "Smoldering Stumps (Recharge 5-6)" -> Bonus Actions. *Constitution Saving Throw*: DC 16, each creature in a 10-foot Emanation originating from the hydra. *Failure:* 35 (10d6
[reskin] authored row numbers: "Smoldering Stumps (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Smoldering Stumps (Recharge 5-6)" is HANDED "Hydra — whose stumps smoke instead of regrowing" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Bonus Actions/"Smoldering Stumps (Recharge 5-6)" ("As a bonus action, the hydra wrenches a neck it has bitten clean away, loosing a billowing cloud of stinging hex-smoke that fills the air around it. The stump s [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Each neck it loses does not regrow; instead the wound seals into a smoking stump that streams stinging vapor, so the more heads it sheds the thicker the choking haze becomes around the hydra." [trait/always/condition] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, energy-aura, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: heated-body, weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — mend: death-restoration
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: death-restoration (always/defense), phobia (always/condition), berserk (always/condition)
[reskin] classification handed to the fit call: shape=save_area often=at_will
[reskin] word match declined by the call: death-restoration, noxious-aura, energy-aura — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:condition:poisoned: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:condition:poisoned" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "choking smoke that thickens with every wound" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] free signature row: "Stump Vapor" — the trait seat cannot quote the GM, but the call names the element it expresses: "choking smoke that thickens with every wound". Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] signature template (trait): composed:zone:condition:poisoned -> Traits/"Stump Vapor" ("smoking stumps stream stinging vapor that chokes creatures around the hydra — a  [shape fit, no verb match]")
[reskin] weapons answered: Bite = none
[reskin] chassis nova: "Smoldering Stumps (Recharge 5-6)" — the brute-5's own nova row (its "Signature Slot", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon type: the call answered type_source=user for monstrosity, but the GM's words do not name it — the Hydra's own type stands
[reskin] print canon multiattack: "the hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon saves: proficient in nothing — the Hydra's own set, at this sheet's stats and PB 3 (changed STR, CON)
[reskin] print canon skills: "Athletics +8, Perception +3" -> "Perception +6" — the Hydra's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Stump Vapor" [no template]
[reskin] ask vs row MISMATCH: "Hydra — whose stumps smoke instead of regrowing" -> "Smoldering Stumps" — limit: asked at_will, row reads recharge
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Stump Vapor carries "choking smoke that thickens with every wound" — "The target has the Poisoned condition until the end of its next turn."
[reskin] audit: [Stump Vapor: The trait is named and written for sm… a 10-foot Emanation originating from the hydra"), Smoldering Stumps (Recharge 5-6): The name promise…vers. (about: "Smoldering Stumps (Recharge 5-6)"), Smoldering Stumps (Recharge 5-6): The bonus action…soned condition until the end of its next turn.")]
[reskin] audit rename held — "Smoldering Stumps" was written for the GM's own clause (cl_1atlsmk: "Hydra — whose stumps smoke instead of regrowing"), so "Choking Stumps" does not land; the finding stands as logged
[reskin] audit defect: Traits/"Stump Vapor" [model-written] high misnamed — The trait is named and written for smoke pouring from die-cut stumps, but its rules never require or reference any stump — a whole-headed hydra emits the same vapor, so the name promises a mechanic the text never delivers. — Add a clause linking the emanation to the hydra's lost heads (for example, the aura only emanates while the hydra has fewer heads than its maximum), so the vapor is the stumps' smoke. (about: "any creature that starts its turn in a 10-foot Emanation originating from the hydra")
[reskin] audit defect: Bonus Actions/"Smoldering Stumps" [model-written] medium weak — The bonus action duplicates Stump Vapor's exact payload — same DC, same condition, same duration, same area — so it adds only raw Poison damage with no new teeth, and the GM gains no distinct threat from spending the bonus action. — Give the bonus action a distinct effect from the passive aura, such as spreading the emanation or a different imposed condition, so it is worth its own line. (about: "The target has the Poisoned condition until the end of its next turn.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 1 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra — whose stumps smoke instead of regrowing"
[reskin] done: "Hydra" — donor brute-5, CR 8
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 10 model call(s)
```

---

## 08. Lashed Siege-Golem — CR 8

**Input:** `a siege-engine golem of lashed timber that shoulders through walls`
**Donor:** brute-5-juggernaut -> CR 8
**Signature:** library · **elapsed** 30s

### Block
```
Lashed Siege-Golem

Huge Construct, Unaligned

AC 15
Initiative -1 (9)

HP 152 (16d12 + 48)

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
4
-3
-3

Skills Athletics +8, Perception +3

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands the languages of its creator but can't speak

CR 8 (XP 3,900; PB +3)

Traits

Lurching Stride. The siege-golem ignores Difficult Terrain and can move through the space of any creature smaller than Huge without squeezing, paying no extra movement and never provoking Opportunity Attacks.

Immutable Form. The siege-golem can't shape-shift.

Magic Resistance. The siege-golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The siege-golem makes two Ram-Timber attacks. It can replace one attack with a use of Breach Shove.

Ram-Timber. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Bludgeoning damage.

Breach Shove. Strength Saving Throw: DC 16, each creature in a 30-foot-long, 5-foot-wide Line. Failure: The target is pushed up to 10 feet straight away from Siege-Golem, and the target has the Prone condition.

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

### Trace
```
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("siege-engine golem of lashed timber") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a siege-engine golem of lashed timber th…" is the description, not a name
[concept] hints: golem→canon ✓ ("siege-engine golem of lashed timber")
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/armed mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shouldering through walls [behavior] | body of lashed timber and iron bands [body] | single-minded battering charge [behavior]
[concept] identity: The siege-golem lurches forward the moment its animating word is spoken, shouldering through the nearest wall rather than seeking a door; its every round is a battering ram of lashed timber, driving straight ahead and flattening whatever stands in its chosen line. Under pressure it does not retreat or scheme — it simply picks the shortest path to its target and goes through anything in between, including allies, load-bearing masonry, and the ground beneath it.
[concept] lore: Built by a besieging army that ran out of engineers, it is a ram of corded green timber and iron bands, bound by a war-horn's command, and it wants nothing but to keep moving toward the walls it was made to break.
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] donor: brute-5-juggernaut -> CR 8
[reskin] seats: action <- "shouldering through walls" | trait <- "body of lashed timber and iron bands"
[reskin] [path] decides: homebrew (the matcher would have said twist Clay Golem)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the siege-golem" — the call's own answer (kind), built from the name; the rules would have said "Siege-Golem"
[reskin] inline on stamped rows: "Siege-Golem" -> "the siege-golem" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "the siege-golem" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: shove — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "shoulders through walls" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "shoulders through walls" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (mechanical) [asked: at_will/at_will/save_single] [askMechanic: shove]
[reskin] open asks handed to the idea call: "shoulders through walls" [shove] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The siege-golem lurches in a straight, unstoppable line and shoulders " answers the GM's "shoulders through walls"
[reskin] idea unanchored: trait — "The golem's joints are corded green timber bound in iron bands, and ea" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, phase-slip, heated-body, false-appearance, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "shoulders through walls", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] signature idea (action): "The siege-golem lurches in a straight, unstoppable line and shoulders through everything in its path — creatures, barricades, and the soft stone of walls alike — each creature in that line must succeed on a Strength saving throw or be shoved aside and knocked Prone, and the golem's movement is not slowed or stopped by them." [action/save/condition] [family: breach] — menu: leap, throw-retrieve, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, trample, thrown-burst, execute, lure, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, second-wind, aggro-curse, self-invisibility, focus, rampage, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — shove: push-prone, disarm
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: push-prone (save/condition), disarm (save/movement), escalating-dread (save/condition)
[reskin] classification handed to the fit call: shape=save_single when=at_will often=at_will
[reskin] word match declined by the call: push-prone, ground-burst, leap, thrown-burst, wind-up, thrown-burst-seed — the key word does not mean the mechanic here
[reskin] closest refused: action — "trample" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: moves the golem in a straight line through every space in its path, fo)
[reskin] authored row answers the GM: action — "Breach Charge" was written for "shoulders through walls", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("moves the golem in a straight line through every space in its path, fo") and wrote an action instead: "Breach Charge" -> Actions. *Strength Saving Throw*: DC 16, each creature in a 30-foot Line. *Failure:* The target is pushed up to 10 feet straight 
[reskin] authored row numbers: "Breach Charge" — the call declared (unanswered) number(s) promised
[reskin] value check: "Breach Charge" EV 29.7 vs floor 14 (one attack of 2) — over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Breach Charge" ("The siege-golem lurches in a straight, unstoppable line and shoulders through everything in its path — creatures, barricades, and the soft stone of walls alike  [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The golem's joints are corded green timber bound in iron bands, and each lurching stride drives the whole mass forward: it ignores Difficult Terrain and can move through the space of any creature smaller than Huge without squeezing, paying no extra movement and never provoking." [trait/always/movement] [family: breach] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: absorption, weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/movement): terrain-walk, relentless-pursuit, bound; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] classification handed to the fit call: shape=save_single when=at_will often=at_will
[reskin] word match declined by the call: phobia, bound, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest refused: trait — "terrain-walk" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: ignores Difficult Terrain of all kinds and passes through smaller crea)
[reskin] seat answered, but: the call said "ignores Difficult Terrain and can move through the space of any creature smaller than Huge without squeezing, paying no " is carried by "Lurching Stride", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("ignores Difficult Terrain of all kinds and passes through smaller crea") and wrote a trait instead: "Lurching Stride" -> Traits. The siege-golem ignores Difficult Terrain and can move through the space of any creature smaller than Huge without squee
[reskin] authored row numbers: "Lurching Stride" — the call declared 0 number(s) promised
[reskin] free signature row: "Lurching Stride" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Lurching Stride" ("The golem's joints are corded green timber bound in iron bands, and each lurching stride drives the whole mass forward: it ignores Difficult Terrain and can mov [authored: the catalog held no shape for it]")
[reskin] weapons answered: Ram-Timber = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] absorption dropped: "Lightning Absorption" — the concept names no energy, so the chassis's organ has no warrant (a timber ram does not eat lightning; critic 2026-10-30)
[reskin] dead name still carried — "Lightning Absorption" names a row that is still on the sheet; no sweep
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a siege-engine golem of lashed timber th" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Ram-Timber" reach 5 → 10 ft. on a Huge body (print's modal reach at that size)
[reskin] multiattack replacement clause: It can replace one attack with a use of Breach Charge.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Lurching Stride" [no template]
[reskin] ask vs row ok: "shoulders through walls" -> "Breach Charge" — trigger at_will, limit at_will
[reskin] name follows content: Actions/"Breach Charge" promises movement the row never delivers — "Breach Shove" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] citation follows the rename: "Multiattack" cited "Breach Charge", which is still on this sheet as "Breach Shove" — the citation re-points rather than going
[reskin] lint fixed: line-dimensions — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Lurching Stride carries "shouldering through walls" — "can move through the space of any creature smaller than Huge without squeezing"
[reskin] audit: [Breach Shove: The entry refers to the creature by …k does. (about: "straight away from Siege-Golem"), Breach Shove: A shove meant to shoulder through wa…ch creature in a 30-foot-long, 5-foot-wide Line"), Breach Shove: Targets are pushed up to 10 feet str…ed. (about: "the target has the Prone condition"), Breach Shove: As a substitute for one Ram-Timber a…-Golem, and the target has the Prone condition.")]
[reskin] audit defect: Actions/"Breach Shove" [model-written] high wording — The entry refers to the creature by a shortened name, 'Siege-Golem', that is not this creature's name ('Lashed Siege-Golem'). — Use the full creature name or 'the siege-golem' as the rest of the block does. (about: "straight away from Siege-Golem")
[reskin] audit defect: Actions/"Breach Shove" [model-written] medium undelivered — A shove meant to shoulder through walls is aimed as a narrow forward line that can miss the wall entirely and pushes targets away rather than breaching anything; the fiction is a body-check against a barrier, not a 30-ft ranged strip of falling bodies. — Rework so the mechanic expresses ramming a barrier or the space directly ahead rather than a long thin line of pushed creatures. (about: "each creature in a 30-foot-long, 5-foot-wide Line")
[reskin] audit defect: Actions/"Breach Shove" [model-written] low weak — Targets are pushed up to 10 feet straight away and knocked Prone with no save-based rider distinction — but a target immune to Prone (or already Prone) gains nothing from the damage-less shove, so the row's only condition payload has no fallback. — Make the push the primary effect with the Prone as an additional outcome, so the row still functions when Prone is denied. (about: "the target has the Prone condition")
[reskin] audit defect: Actions/"Breach Shove" [model-written] medium weak — As a substitute for one Ram-Timber attack, Breach Shove deals no damage and only imposes a 10-foot push plus Prone, which the target simply stands up from, so it is a strictly weaker choice than the attack it replaces. — Give the shove a payload worth trading a damage attack for (e.g., a knock-down that persists or affects the creature's movement) rather than a push-and-stand. (about: "The target is pushed up to 10 feet straight away from Siege-Golem, and the target has the Prone condition.")
[reskin] clause unresolved: "Lurching Stride" carries "The golem's joints are corded green timber bound in iron", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Lashed Siege-Golem" — donor brute-5-juggernaut, CR 8
[harness] recorded 11 model call(s)
```

---

## 09. Stone Golem — CR 10

**Input:** `name: Stone Golem | carved as a weeping saint`
**Donor:** brute-9 -> CR 10
**Signature:** library · **elapsed** 23s

### Block
```
Stone Golem

Large Construct, Unaligned

AC 18
Initiative -1 (9)

HP 220 (21d10 + 105)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+6
INT
3
-4
-4
MOD
SAVE
DEX
9
-1
-1
WIS
11
+0
+0
MOD
SAVE
CON
20
+5
+5
CHA
1
-5
-5

Skills Athletics +10, Perception +4

Immunities Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Understands Common plus two other languages but can't speak

CR 10 (XP 5,900; PB +4)

Traits

Immutable Form. The stone golem can't shape-shift.

Magic Resistance. The stone golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The stone golem makes two attacks, using Slam or Force Bolt in any combination. It can replace one attack with a use of Grief Glare.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Grief Glare. Wisdom Saving Throw: DC 17, each creature of the stone golem's choice in a 30-foot Emanation originating from the stone golem that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's terror for 24 hours.

Bonus Actions

Slow (Recharge 5-6). The stone golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).

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

### Trace
```
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("carved as a weeping saint") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Stone Golem" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: golem→canon ✓ ("Stone Golem — carved as a weeping saint")
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=grave/forged mind=sapient style=juggernaut energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: weeping stone visage [body] | numbing sorrow that hinders foes [aura] | carved saintly form [body]
[concept] identity: The Weeping Saint opens by advancing in slow, deliberate steps, its stone face streaked with frozen tears, raising one massive fist to crush the nearest foe. Every round after that it shoves through the melee like a moving wall, breaking formations and pinning enemies against terrain while grinding them into the ground. It does not flee or toy with prey; it endures, impassive, until its carved body is reduced to rubble, its only emotion an eternal, silent grief.
[concept] lore: Carved from a single block of consecrated stone by a grieving order that could not let go of a martyred saint, the Weeping Saint was animated not by divine grace but by sorrow made rigid—it walks the ruins of its own desecrated abbey, crushing any who disturb the memory it can never stop mourning.
[reskin] print canon route: the Stone Golem's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] donor: brute-9 -> CR 10
[reskin] seats: package <- "weeping stone visage"
[reskin] [path] decides: twist on the Stone Golem (the matcher agrees)
[reskin] print canon: "Stone Golem — carved as a weeping saint" heads on the Stone Golem — print's rows ride along; the seat stays
[reskin] alignment by body: Neutral -> Unaligned — a Construct at INT 3 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the stone golem" — the call answered "the stone golem" (kind), which the name does not support
[reskin] inline form: "the stone golem" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Stone Golem — carved as a weeping saint" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The golem raises its sorrow-streaked visage, and the tears carved into" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The golem's carved grief is a weight that follows it: while the golem " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The golem raises its sorrow-streaked visage, and the tears carved into its stone face run afresh — not water but a surge of radiant grief. Each creature of the golem's choice within a short range that can see the golem must succeed on a Wisdom saving throw or be Frightened until the end of its next turn, its mind flooded with the weight of an inconsolable loss." [action/save/condition] [family: nova] — menu: trample, leap, thrown-burst, throw-retrieve, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal (+ shelf: rampage, second-wind, aggro-curse, self-invisibility, focus, answering-strike, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), push-prone (save/condition)
[reskin] word match declined by the call: lure, pacify, reveal — the key word does not mean the mechanic here
[reskin] free signature row: action — "terror-pulse" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "weeping stone visage" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Radiant Grief (2/Day)" is HANDED "carved as a weeping saint" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: terror-pulse -> Actions/"Radiant Grief (2/Day)" ("Each creature of the golem's choice within a short range that can see the golem  [shape fit, no verb match]")
[reskin] signature idea (trait): "The golem's carved grief is a weight that follows it: while the golem is conscious, the ground in a small radius around it is slick with the frozen tears that streak its face, turning the area into difficult terrain for any creature other than the golem." [trait/always/movement] [family: zone] — menu: false-appearance, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, sealed-body, undead-fortitude, truth-aura, fear-aura, gaze-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: relentless-pursuit (always/movement), bound (always/movement), false-appearance (always/defense)
[reskin] keys would have bound: trait — false-appearance (stone)
[reskin] word match declined by the call: relentless-pursuit, bound, false-appearance — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:terrain: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:terrain" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "weeping stone visage" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] free signature row: "Trail of Tears" — the trait seat cannot quote the GM, but the call names the element it expresses: "weeping stone visage". Earns no clause credit; the twist/class path allows 1 and this is number 3
[reskin] seat takes its clause: "Trail of Tears" is HANDED "carved as a weeping saint" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): composed:zone:terrain -> Traits/"Trail of Tears" ("While the golem is conscious, the ground in a small radius around it is slick wi [shape fit, no verb match]")
[reskin] weapons answered: Slam = none; Rock = none; Grief Made Rigid = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon multiattack: "the stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Rock" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon saves: proficient in nothing — the Stone Golem's own set, at this sheet's stats and PB 4 (changed STR, CON)
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
[reskin] dead control row: "Radiant Grief" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Radiant Grief.
[reskin] free row over budget: Traits/"Trail of Tears" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Radiant Grief" [action/save/condition]
[reskin] name follows content: Actions/"Radiant Grief" carries Radiant the row never deals — "Grief Glare" (the element word drops; the call's own noun stays)
[reskin] citation follows the rename: "Multiattack" cited "Radiant Grief", which is still on this sheet as "Grief Glare" — the citation re-points rather than going
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Grief Glare: The row's whole payload is one round …tened condition until the end of its next turn."), Grief Glare: The 24-hour immunity is applied to 't… immune to this creature's terror for 24 hours."), Grief Glare: The save reads as a flat Wisdom Savin…foot Emanation originating from the stone golem"), Grief Glare: The fiction is a weeping saint's sorr…ng from the stone golem that can see or hear it")]
[reskin] audit defect: Actions/"Grief Glare" [model-written] medium weak — The row's whole payload is one round of Frightened on a creature that is already Frightened-immune only after succeeding, so the creature's signature terror yields no damage and little teeth relative to the assault it replaces. — Give the glare a lasting bite — either extend the fear's duration or attach a tangible penalty while frightened — so it is worth trading an attack for. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] audit defect: Actions/"Grief Glare" [model-written] medium dead_reference — The 24-hour immunity is applied to 'this creature's terror,' a state the block never names, rather than to Grief Glare itself, so a GM cannot tell what the immunity actually covers. — Name the specific entry the immunity attaches to so there is a defined referent. (about: "*Success:* The target is immune to this creature's terror for 24 hours.")
[reskin] audit defect: Actions/"Grief Glare" [model-written] low wording — The save reads as a flat Wisdom Saving Throw with no 'Wisdom Saving Throw:' target framing and no attack-roll-vs-AC structure, mixing the 2024 save-block convention with a missing target clause ordering that a GM must untangle mid-turn. — State the saving throw in the standard 'DC 17 Wisdom Saving Throw' form with the area and target clause in the established order. (about: "DC 17, each creature of the stone golem's choice in a 30-foot Emanation originating from the stone golem")
[reskin] audit defect: Actions/"Grief Glare" [model-written] medium misnamed — The fiction is a weeping saint's sorrowful gaze, but the text lets the golem target any creature that can hear it — a creature with its back turned or eyes shut is still caught by a 'glare,' which the ability's own name contradicts. — Anchor the effect to being seen, matching the glare fiction, and drop the hear clause. (about: "each creature of the stone golem's choice in a 30-foot Emanation originating from the stone golem that can see or hear it")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 1 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Stone Golem" — donor brute-9, CR 10
[harness] recorded 8 model call(s)
```

---

## 10. Drowned Antiphon — CR 10

**Input:** `a drowned cathedral choir that sings in one voice`
**Donor:** lurker-5-phantom -> CR 10
**Signature:** library · **elapsed** 34s

### Block
```
Drowned Antiphon
Large undead, neutral
Armor Class

14 (natural armor)

Hit Points: 

178 (21d10 + 63)

Speed: 

5 ft., fly 60 ft. (hover), swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


6 (-2)

	

16 (+3)

	

17 (+3)

	

15 (+2)

	

20 (+5)

	

20 (+5)

Skills: 

Stealth +7

Saving Throws: 

DEX +7

Damage Resistances: 

bludgeoning, piercing, slashing

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Incorporeal Movement.The antiphon can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity.While in sunlight, the antiphon has disadvantage on ability checks and attack rolls.

Actions
Multiattack: The antiphon makes two Verse Strike attacks. It can replace one attack with a use of Drowned Hymn.
Verse Strike: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 30 (6d8 + 3) necrotic damage.
Drowned Hymn: Each creature of the antiphon's choice in a 60-foot radius originating from the antiphon that can see or hear the antiphon's hymn must make a DC 15 Wisdom saving throw. On a failed save, the target is charmed until the start of the antiphon's next turn, and while charmed this way, it must move toward the antiphon by the safest available route on its turn and can't take Reactions. On a successful save, the target is immune to this creature's lure for 24 hours.
```

### Trace
```
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: ✓ ("drowned cathedral choir") | lurker-phantom: key "drowned" (class body)
[concept] name: provided_name rejected — "a drowned cathedral choir that sings in …" is the description, not a name
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: singing as one voice across many drowned throats [behavior] | a hymn that pulls the living toward the flooded nave [aura] | waterlogged grave-sodden bodies that drift through stone [body]
[concept] identity: The choir does not hunt so much as call: a single unbroken hymn rolls down the flooded nave and across the water until the living wade toward it, their names folding into the harmony. Once prey is within the flooded walls it drifts through stone and water alike, striking in time with its own singing, each verse draining warmth and breath and pulling the listener's voice into the chord. It is patient and utterly single-minded — one will, one note — and only the strong breaking of its harmony can make it scatter, reform, and begin the hymn again from silence.
[concept] lore: When the river rose over the cathedral of Saint Verald, the choir refused to leave the loft and drowned mid-antiphon; their last note never ended, and it now calls new voices down into the flooded nave to swell the part that was lost.
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 10
[reskin] mind tier: CHA 15 -> 20 — the call read this creature as formidable at CR 10
[reskin] donor: lurker-5-phantom -> CR 10
[reskin] seats: action <- "singing as one voice across many drowned throats" | trait <- "a hymn that pulls the living toward the flooded nave"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] repair round 1: 1 defect(s) — "Chill Touch" deals Cold but this creature's energy is Necrotic — use Necrotic or a physical type
[reskin] repair round 2: 1 defect(s) — name "Chill Touch" claims an element its damage (Necrotic/Necrotic) does not pay
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the antiphon" — the call's own answer (kind), built from the name; the rules would have said "Antiphon"
[reskin] inline on stamped rows: "Antiphon" -> "the antiphon" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "the antiphon" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: charm — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "sings in one voice" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "sings in one voice" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a drowned cathedral choir" -> has (descriptive), head | "sings in one voice" -> has (mechanical) [asked: at_will/at_will/save_single] [askMechanic: charm]
[reskin] open asks handed to the idea call: "sings in one voice" [charm] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The antiphon looses a verse of the drowned hymn that threads through t" answers the GM's "sings in one voice"
[reskin] idea unanchored: trait — "When the antiphon ends its turn in a space shared with a creature, the" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 36 of 36 answered; not true of this body: seal, active-toll, random-ray, spew, snare-bolt, zone-seed, blighted-ground, shell-withdraw, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] menu: taste stands down — action answers the GM's "sings in one voice", so role and style do not filter the menu (legality still does); 20 template(s) offered
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The antiphon looses a verse of the drowned hymn that threads through the air, and each creature of its choice that can hear it must succeed on a Wisdom saving throw or be Charmed for the duration, its feet already carrying it a step toward the sound before its mind catches up. A Charmed creature can repeat the save whenever it takes damage or the antiphon is out of earshot." [action/save/condition] [family: mark] — menu: leap, wail, lure, ground-burst, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, trample, thrown-burst, execute, disarm, push-prone, herd, thrown-burst-seed, curse-debt, reveal, wind-up (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, rampage, lay-on-hands, second-wind, aggro-curse, riposte, answering-strike, stunning-strike, charge-push, hook-rider, pounce, isolation, life-drain, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — charm: lure, pacify
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), pacify (save/condition), escalating-dread (save/condition)
[reskin] classification handed to the fit call: shape=save_single when=at_will often=at_will
[reskin] word match declined by the call: wail, terror-pulse, herd, escalating-dread — the key word does not mean the mechanic here
[reskin] value check: "Drowned Hymn (Recharge 5-6)" EV 33 vs floor 15.6 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature template: lure -> Actions/"Drowned Hymn (Recharge 5-6)" ("each creature that can hear it must succeed on a Wisdom saving throw or be Charm [verb: hymn:idea]")
[reskin] signature idea (trait): "When the antiphon ends its turn in a space shared with a creature, the hymn's undertow hooks the listener: the creature must succeed on a Strength saving throw or be pulled a short distance toward the antiphon, and its speed is reduced until the start of its next turn as it wades against the current of the song." [trait/start_of_turn/movement] [family: drag] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, mimicry, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does movement; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — mimicry (voices)
[reskin] classification handed to the fit call: shape=save_single when=at_will often=at_will
[reskin] word match declined by the call: truth-aura, fear-aura, relentless-pursuit, bound, phobia, blood-frenzy, pack-tactics, mimicry — the key word does not mean the mechanic here
[reskin] closest refused: trait — "bound" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: pulls a creature toward the singer and slows it for a turn)
[reskin] seat answered, but: the call said "When the antiphon ends its turn in a space shared with a creature, the hymn's undertow hooks the listener: the creature " is carried by "Undertow of the Hymn", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "When the antiphon ends its turn in a space shared with a creature, the" and wrote no row of that kind (refused: "Undertow of the Hymn" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Undertow of the Hymn" — a trait is not a save — the save form takes stat, target and effect as fields and the); asking once more with the reason
[reskin] seat answered, but: the call said "When the antiphon ends its turn in a space shared with a creature, the hymn's undertow hooks the listener: the creature " is carried by "Undertow of the Hymn", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "When the antiphon ends its turn in a space shared with a creature, the" and wrote no row of that kind
[reskin] seat refused twice: trait — first: "Undertow of the Hymn" — a trait is not a save — the save form takes stat, target and effe; second: you wrote no row of the kind asked for (a trait); the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "bound" nearest and judged its subject FLIPPED against the clause (pulls a creature toward the singer and slows it for a turn); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key mimicry, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "mimicry" is keyed by the GM's voices and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "When the antiphon ends its turn in a space shared with a creature, the hymn's undertow hooks the listener: the creature must succeed on a Strength saving throw or be pulled a short distance toward the antiphon, and its speed is reduced until the start of its next turn as it wades against the current of the song." [trait/start_of_turn/movement] — the model found no template that holds it (offered: truth-aura, fear-aura, relentless-pursuit, bound, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, undead-fortitude, mimicry, assassinate)
[reskin] repair: 1 clause(s) with no row — "sings in one voice"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:sings in one voice"]
[reskin] clause answered in prose: "sings in one voice" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Chill Touch = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a drowned cathedral choir that sings in " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] dead control row: "Drowned Hymn" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Drowned Hymn.
[reskin] asked but unanswered: "sings in one voice" asked for at_will/at_will and no row binds the clause
[reskin] name follows content: Actions/"Cold Verse Strike" carries Cold the row never deals — "Verse Strike" (the element word drops; the call's own noun stays)
[reskin] citation follows the rename: "Multiattack" cited "Cold Verse Strike", which is still on this sheet as "Verse Strike" — the citation re-points rather than going
[reskin] lint: 0 findings
audit finding below confidence gate: Drowned Hymn The forced-movement clause has no adjudicable rule for the target's own action economy, leaving no rules-legal path for the creature to spend its turn any other way while Charmed.
audit finding below confidence gate: Drowned Hymn The area is an Emanation that includes creatures that can see OR hear, but the block never establishes that a hymn is audible at range or what happens to a creature that is deafened or otherwise cannot perceive it.
[reskin] audit: nothing flagged
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] pulls a creature toward the singer and slows it for a turn — "When the antiphon ends its turn in a space shared with a creature, the hymn's undertow hooks the listener: the creature must succeed on a Strength saving throw or be pulled a short distance toward the antiphon, and its speed is reduced until the start of its next turn as it wades against the current of the song." — Drowned Antiphon [seat: trait [trait/start_of_turn/movement]] (closest offered: bound) [effect: movement] [menu: truth-aura fear-aura relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind evasion undead-fortitude mimicry assassinate] [same-cell unoffered: none] [same-seat rejected: energy-aura:body-verdict noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Drowned Antiphon" — donor lurker-5-phantom, CR 10
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 15 model call(s)
```

---

## 11. Vampire — CR 13

**Input:** `name: Vampire | who keeps a garden of thorns`
**Donor:** lurker-13 -> CR 13
**Signature:** dropped · **elapsed** 33s

### Block
```
Vampire
Medium undead, lawful evil
Armor Class

16 (natural armor)

Hit Points: 

195 (23d8 + 92)

Speed: 

40 ft., climb 40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

18 (+4)

	

18 (+4)

	

17 (+3)

	

15 (+2)

	

18 (+4)

Skills: 

Perception +7, Stealth +9

Saving Throws: 

DEX +9, CON +9, WIS +7, CHA +9

Damage Resistances: 

necrotic

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 17

Languages: 

Common plus two other languages

Challenge

13 (10,000 XP)

Proficiency Bonus:

+5

Thornwalk.Difficult Terrain composed of thorns and briars doesn't cost the vampire extra movement, and the vampire can move across thorns and briars without needing to make an ability check.
Legendary Resistance (3/Day).If the vampire fails a saving throw, it can choose to succeed instead.
Misty Escape.If the vampire drops to 0 hit points outside its resting place, the vampire uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 Hit Point after spending 1 hour there.
Spider Climb.The vampire can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness.The vampire has these weaknesses: Forbiddance: the vampire can't enter a residence without an invitation from an occupant.
Running Water: the vampire takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the vampire's heart while the vampire is incapacitated in its resting place, the vampire is paralyzed until the weapon is removed.
Sunlight: the vampire takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift (Bonus Action).If the vampire isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the vampire can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the vampire can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6) (Bonus Action).The vampire casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the vampire's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the vampire.

Actions
Multiattack (Vampire Form Only): The vampire makes two Grave Strike attacks and uses Bite.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

### Trace
```
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[route] lurker type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: medium on the GM's own words "keeps a garden of thorns" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: the call reads no worked magic in these words | lurker-trap: ✓ ("garden of thorns") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it | bane refused: the words carry no weakness clause and the call did not claim one, so "radiant" is a guess from what the creature is, not the GM's ask
[concept] name: "Vampire" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Vampire"
[concept] mechanics: none claimed
[concept] signature elements: a garden of living thorns that binds and bleeds intruders [aura] | stalking unseen among the briars before a single ruinous opening strike [behavior] | a vampire's cold, patient, possessive hunger [behavior]
[concept] identity: A cultivated vampire lurks within its thorn garden as a shadow among shadows, patient and near-invisible, until a trespasser's blood wakes the roots — then it opens with a single devastating strike from the dark, dragging its prey down into the briar. Every round after, it never leaves the garden: it slips between trunks and curtains of thorn, striking and withdrawing while the hedge itself savages and entangles, so the fight is less a duel than a slow bleeding among the roses. It toys with prey and is loath to abandon its garden; only when truly bloodied does it dissolve into shadow and retreat to nurse its wounds among the roots, and it will not forgive the trespass.
[concept] lore: Once a vampire lord who gardened in life, it was buried in its own rose beds and rose as a thing of root and shadow, tending its thorns as living wards and drinking only those who dare cross the hedge.
[reskin] print canon defenses: HP 184 -> 195, AC 16 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: lurker-13 -> CR 13
[reskin] seats: action <- "stalking unseen among the briars before a single ruinous opening strike" | trait <- "a garden of living thorns that binds and bleeds intruders"
[reskin] [path] decides: twist on the Vampire (the matcher agrees)
[reskin] print canon: "Vampire — who keeps a garden of thorns" heads on the Vampire — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the vampire" — the call answered "the vampire" (kind), which the name does not support
[reskin] inline form: "the vampire" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vampire —" -> has (descriptive), head | "keeps a garden of thorns" -> has (descriptive)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The vampire becomes a blur of motion through its briars, stalking one " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The vampire moves through its thorn garden unseen, leaving no trace an" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, seal, wail, active-toll, random-ray, spew, snare-bolt, zone-seed, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider
[reskin] signature idea (action): "The vampire becomes a blur of motion through its briars, stalking one creature it can see. Until the end of its next turn, the first time it hits that creature, the target must succeed on a Constitution saving throw or be Restrained as thorny vines erupt from its own blood and lash it to the ground." [action/save/condition] [family: mark] — menu: condition-payoff, execute, lure, pull-through, ground-burst, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, exploiter, snare, push-prone, reveal (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, riposte, answering-strike, contagion, stunning-strike, charge-push, pounce, isolation, life-drain)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — snare: snare
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: snare (save/condition), lure (save/condition), pacify (save/condition)
[reskin] keys would have bound: action — drain (vampire)
[reskin] word match declined by the call: lure, pacify, escalating-dread, terror-pulse, sensory-strike, exploiter, push-prone, reveal, condition-payoff, execute, pull-through, ground-burst, slow-bolt, drain — the key word does not mean the mechanic here
[reskin] closest refused: action — "snare" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: the vampire's own motion wakes the briars: a stalking pursuit that lin)
[reskin] seat answered, but: the call said "The vampire becomes a blur of motion through its briars, stalking one creature it can see. The first time it hits that c" is carried by "Crimson Bramble Stalk", and no such row is on this sheet — the clause stays open
[reskin] strike written from its attack: "Crimson Bramble Stalk" clones "Thornblade" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] seat takes its clause: "Crimson Bramble Stalk" is HANDED "keeps a garden of thorns" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] row refused — the name is taken: "Crimson Bramble Stalk" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The vampire moves through its thorn garden unseen, leaving no trace and never hampered by the briars. While in an area of thorns or undergrowth, it can take the Hide action even without cover, and its speed is unaffected by difficult terrain caused by plants." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, warded-mending, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), terrain-walk (always/movement), relentless-pursuit (always/movement)
[reskin] word match declined by the call: bound, spider-climb, relentless-pursuit — the key word does not mean the mechanic here
[reskin] signature template (trait): terrain-walk -> Traits/"Thornwalk" ("While in an area of thorns or undergrowth, the vampire moves unseen and unhinder [verb: undergrowth:idea]")
[reskin] weapons answered: Thornblade = none
[reskin] weapon declined: "Thornblade" reads longsword from its name, but the call answered none — the row carries no weapon
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Vampire's own type stands
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon attack: "Thornblade" -> "Grave Strike" — the Vampire's own row
[reskin] print canon rows: Crimson Bramble Stalk leave — the Vampire has one melee row (Grave Strike), and Multiattack reads print's
[reskin] print canon multiattack: "the vampire makes two Grave Strike attacks and uses Bite." — the Vampire's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in DEX, CON, WIS, CHA — the Vampire's own set, at this sheet's stats and PB 5 (changed CON, WIS)
[reskin] print canon skills: "Perception +7, Stealth +9, Acrobatics +9" -> "Perception +7, Stealth +9" — the Vampire's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Misty Escape — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "Vampire — who keeps a garden of thorns" is the Vampire (print's own row)
[reskin] print canon row: Actions/"Multiattack (Vampire Form Only)" — print's own row takes the name back from the engine's
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
[reskin] print canon legendary: Deathless Strike, Beguile — the Vampire's own kit stands where the chassis's stood
[reskin] multiattack replacement clause withheld: the Multiattack already uses it — "The vampire makes two Grave Strike attacks and uses Bite." (the Vampire's print line names Bite; a second clause named it again, twist-ten 2026-10-19)
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 12 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] lint: orphan-condition-ref: "Charmed" is referenced as a state but nothing on the sheet applies it | orphan-condition-ref: "Restrained" is referenced as a state but nothing on the sheet applies it
audit finding below confidence gate: Thornwalk Nothing in the block creates thorns, briars, or Difficult Terrain, so this garden-vampire's signature trait is inert unless the GM invents the terrain; the climb-without-check half is also already covered by Spider Climb.
[reskin] audit: nothing flagged
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
[reskin] done: "Vampire" — donor lurker-13, CR 13
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 10 model call(s)
```

---

## 12. Plague-Archon — CR 13

**Input:** `a plague-bearing archon of flies that commands lesser swarms`
**Donor:** defender-8-leader -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 29s

### Block
```
Plague-Archon

Large Fiend, Neutral Evil

AC 18
Initiative +2 (12)

HP 190 (20d10 + 80)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
20
+5
+5
INT
15
+2
+2
MOD
SAVE
DEX
14
+2
+2
WIS
20
+5
+5
MOD
SAVE
CON
18
+4
+9
CHA
18
+4
+9

Skills Athletics +10, Persuasion +9

Resistances Cold

Immunities Poison; Poisoned

Senses darkvision 120 ft.; Passive Perception 15

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Plague-Fly Cloud. Constitution Saving Throw: DC 17, any creature that starts its turn in a 20-foot Emanation originating from the plague-archon. Failure: The target has the Poisoned condition until the start of the plague-archon's next turn. Success: The target is immune to this creature's aura for 24 hours.

Aura of Authority. While in a 10-foot Emanation originating from the plague-archon, the plague-archon and its allies have Advantage on attack rolls and saving throws, provided the plague-archon doesn't have the Incapacitated condition.

Actions

Multiattack. The plague-archon makes three attacks, using Forelimb or Bite in any combination.

Forelimb. Melee Attack Roll: +10, reach 5 ft. 18 (3d8 + 5) Slashing damage plus 13 (3d8) Poison damage.

Bite. Melee Attack Roll: +10, reach 5 ft. 32 (6d8 + 5) Piercing damage.

Droning Edict (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 20-foot Emanation originating from the plague-archon. Failure: The target has the Blinded condition until the end of its next turn.

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

### Trace
```
[path] homebrew — title archon — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] defender-leader type=Fiend mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("commands lesser swarms") | defender-leader: key "commands" (class verb)
[concept] hints: swarm→body ✗ ("commands lesser swarms") | winged→style ✓ ("archon of flies")
[concept] resolve: archetype=defender type=Fiend typeFrom=the route call themes=fiendish/venomous mind=sapient style=leader energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a buzzing cloud of plague-flies that follows it into battle [aura] | chitinous plate body and jagged limbs [body] | commands lesser fly swarms to harry and blind [behavior]
[concept] identity: The archon opens by loosing a droning cloud of plague-flies from its chitinous ribs, seeding the field with a buzzing fog that blinds and sickens before a single blow lands; then it wades in behind its orbiting brood, parrying with a jagged forelimb while its lesser swarms harry the flanks of anyone who dares break formation. It is a patient, calculating tactician of contagion — it will not flee until its own corpus is rent, and even bloodied it fights to drag at least one more soul into its hive of rot.
[concept] lore: Born in the deeper hives of a pestilent Abyssal layer, the Plague-Archon of Flies was dispatched as a plague-herald to feast on the ruin of mortal cities and to convert their fallen into new broods of its buzzing host.
[reskin] mind tier held: CHA stays 18 against "formidable" — the card's 18 is already formidable
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 13
[reskin] mind tier: WIS 13 -> 20 — the call read this creature as formidable at CR 13
[reskin] donor: defender-8-leader -> CR 13 (invented — no printed peer)
[reskin] seats: action <- "commands lesser fly swarms to harry and blind" | trait <- "a buzzing cloud of plague-flies that follows it into battle"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the plague-archon" — the call answered "the archon" (kind), which the name does not support
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "commands lesser swarms" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "commands lesser swarms" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a plague-bearing archon of flies" -> has (descriptive), head | "commands lesser swarms" -> has (mechanical) [asked: at_will/at_will/condition] [askMechanic: command]
[reskin] open asks handed to the idea call: "commands lesser swarms" [command] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The plague-archon looses a droning command that rolls out from its chi" answers the GM's "commands lesser swarms"
[reskin] idea unanchored: trait — "A buzzing cloud of plague-flies orbits the archon and follows it into " names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: seal, shield-bash, active-toll, random-ray, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "commands lesser swarms", so role and style do not filter the menu (legality still does); 19 template(s) offered
[reskin] signature idea (action): "The plague-archon looses a droning command that rolls out from its chitinous ribs in all directions; each creature of its choice in the emanation must succeed on a Constitution saving throw or be Blinded until the end of its next turn as a wedge of its brood swarms the face and eyes. Its lesser flies heed the order completely — one fly-swarm of the archon's choice within the emanation moves up to " [action/save/condition] [family: zone] — menu: throw-retrieve, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, trample, thrown-burst, execute, lure, pacify, escalating-dread, sensory-strike, thrown-burst-seed, zone-seed (+ shelf: delayed-brand, shell-withdraw, patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, self-invisibility, rally, focus, feint-slip, coating, riposte, answering-strike, stunning-strike, charge-push, contagion, pounce, isolation, charge)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] declared mechanic leads the menu: action — command: herd, rally
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: herd (save/damage), rally (always/movement), terror-pulse (save/condition)
[reskin] keys would have bound: action — contagion (plague, plagued)
[reskin] classification handed to the fit call: shape=condition when=at_will often=at_will
[reskin] word match declined by the call: terror-pulse, push-prone, reveal, lure, pacify, escalating-dread, ground-burst — the key word does not mean the mechanic here
[reskin] closest refused: action — "sensory-strike" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: blinds every chosen creature in an area and moves a lesser swarm)
[reskin] authored row answers the GM: action — "Droning Edict (Recharge 5-6)" was written for "commands lesser swarms", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("blinds every chosen creature in an area and moves a lesser swarm") and wrote an action instead: "Droning Edict (Recharge 5-6)" -> Actions. *Constitution Saving Throw*: DC 17, each creature in a 20-foot Emanation originating from the plague-archon. *Failure:* 
[reskin] authored row numbers: "Droning Edict (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] value check: "Droning Edict (Recharge 5-6)" EV 16.5 vs floor 15.6 (the whole Multiattack (3 attacks)) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Droning Edict (Recharge 5-6)" ("The plague-archon looses a droning command that rolls out from its chitinous ribs in all directions; each creature of its choice in the emanation must succeed o [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "A buzzing cloud of plague-flies orbits the archon and follows it into battle, filling a 5-foot Emanation. At the start of each of its turns, each creature of the archon's choice in that cloud must succeed on a Constitution saving throw or have the Poisoned condition until the start of the archon's next turn." [trait/start_of_turn/condition] [family: zone] — menu: spider-climb, phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (start_of_turn/condition): noxious-aura, truth-aura, fear-aura; the declared data is the warrant and the call is worth making
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: pack-tactics (always/damage), noxious-aura (start_of_turn/condition), truth-aura (start_of_turn/condition)
[reskin] classification handed to the fit call: shape=condition when=at_will often=at_will
[reskin] word match declined by the call: fear-aura, truth-aura, noxious-aura — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:condition:poisoned: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:condition:poisoned" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "a buzzing cloud of plague-flies that follows it into battle" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Plague-Fly Cloud" — the trait seat cannot quote the GM, but the call names the element it expresses: "a buzzing cloud of plague-flies that follows it into battle". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): composed:zone:condition:poisoned -> Traits/"Plague-Fly Cloud" ("At the start of each of its turns, each creature of the archon's choice in the c [shape fit, no verb match]")
[reskin] weapons answered: Forelimb = none; Bite = none
[reskin] chassis nova: "Droning Edict (Recharge 5-6)" — the defender-8-leader's own nova row; geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] resistances derived: Cold
[reskin] name-canon stands down: the path answered homebrew on "a plague-bearing archon of flies that co" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Plague-Fly Cloud" [no template]
[reskin] ask vs row MISMATCH: "commands lesser swarms" -> "Droning Edict" — limit: asked at_will, row reads recharge
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Plague-Fly Cloud carries "a buzzing cloud of plague-flies that follows it into battle" — "DC 17, any creature that starts its turn in a 20-foot Emanation originating from"
[reskin] audit: [Droning Edict (Recharge 5-6): The row written for …inded condition until the end of its next turn."), Droning Edict (Recharge 5-6): The name promises a …t is actually happening. (about: "Droning Edict"), Plague-Fly Cloud: The trait's text is purely a sav… from the mechanics. (about: "Plague-Fly Cloud.")]
[reskin] audit rename held — "Droning Edict" was written for the GM's own clause (cl_1x4jef1: "commands lesser swarms"), so "Blinding Drone" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Droning Edict" [model-written] high undelivered — The row written for 'commands lesser swarms' neither references nor creates any swarm, and its only payload is a one-round Blinded, so nothing in it delivers the command fantasy the GM asked for. — Give the edict a swarm-commanding clause (summoning or directing lesser flies) so its text does what its name and the GM's brief require. (about: "The target has the Blinded condition until the end of its next turn.")
[reskin] audit defect: Traits/"Plague-Fly Cloud" [model-written] medium other — The trait's text is purely a saving throw and Poisoned condition with no clause describing flies, buzzing, or any cloud substance, so nothing in the rules carries the plague-fly feature the sheet was built around. — Weave the fly-swarm fiction into the trait's rules text (what the cloud is and what it does) so a reader can see the flies from the mechanics. (about: "Plague-Fly Cloud.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Plague-Archon" — donor defender-8-leader, CR 13
[harness] recorded 11 model call(s)
```

---

## 13. Purple Worm — CR 15

**Input:** `name: Purple Worm | that swallowed a war-band's armoury`
**Donor:** brute-13 -> CR 15 (invented — no printed peer)
**Signature:** library · **elapsed** 27s

### Block
```
Purple Worm

Gargantuan Monstrosity, Unaligned

AC 18
Initiative -2 (8)

HP 247 (15d20 + 90)

Speed 50 ft., Burrow 50 ft.

MOD
SAVE
STR
28
+9
+9
INT
1
-5
-5
MOD
SAVE
DEX
7
-2
-2
WIS
8
-1
+4
MOD
SAVE
CON
22
+6
+11
CHA
4
-3
-3

Skills Athletics +14, Perception +4

Immunities Acid

Senses blindsight 30 ft., tremorsense 60 ft.; Passive Perception 14

Languages None

CR 15 (XP 13,000; PB +5)

Traits

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Swallow.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Swallow. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the purple worm hit with a melee attack this turn. Failure: The target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 21 (6d6) Acid damage at the start of each of the purple worm's turns. If the purple worm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the purple worm and has the Prone condition. If the purple worm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

Reactions

Vented Armoury. Trigger: The purple worm takes damage from a piercing or slashing weapon. Response—Constitution Saving Throw: DC 21, the triggering creature. Failure: The target has the Blinded condition until the end of its next turn.

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

### Trace
```
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "swallowed" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("swallowed") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=subterranean/devouring mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: a gullet packed with swallowed armoury — steel, powder and blades [body] | breaching up through the ground to swallow formations whole [behavior] | venting caustic, shrapnel-laced bile when its gut is struck [behavior]
[concept] identity: A purple worm grown bloated and half-armoured from the war-band it swallowed whole, its gut a grinding mill of splintered steel and unspent munitions that it vents as a scalding spray of chewed iron and caustic bile. It opens by breaching up through the ground beneath the thickest formation, seeking the largest cluster of metal to swallow, then coils and clamps onto a victim to drag them down its gullet while its hide-rupturing shrapnel burst punishes anyone who crowds it. Bred on armouries rather than livestock, it does not distinguish food from foe and fights to the death, burrowing after the loudest and brightest target as though compelled to complete the meal it started.
[concept] lore: The worm that swallowed a war-band's armoury was an ordinary purple worm until an entire column — its wagons, powder, and blades — was ordered down its throat by a desperate retreat, and ever since it digs up battlefields and armouries, hungry for the taste of forged iron and the noise of a full quiver.
[reskin] print canon route: the Purple Worm's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] nova capped: "Area Nova" 71 → 66 (the chassis nova obeys the cap: 66 at CR 15)
[reskin] print canon defenses: HP 264 -> 247, AC 17 -> 18 — the Purple Worm's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 28, DEX 7, CON 22, INT 1, WIS 8, CHA 4 — the Purple Worm's at its own CR; attack +11 -> +14, DC 21 (print's)
[reskin] donor: brute-13 -> CR 15 (invented — no printed peer)
[reskin] seats: action <- "breaching up through the ground to swallow formations whole" | trait <- "a gullet packed with swallowed armoury — steel, powder and blades"
[reskin] [path] decides: twist on the Purple Worm (the matcher agrees)
[reskin] print canon: "Purple Worm — that swallowed a war-band's armoury" heads on the Purple Worm — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the purple worm" — the call answered "the purple worm" (kind), which the name does not support
[reskin] inline form: "the purple worm" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 22 (8 + PB 5 + the sheet's best 9) — no stat on the sheet reached it
[reskin] the sheet's declared ask: swallow — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (mechanical) [asked: attack] [askMechanic: swallow]
[reskin] open asks handed to the idea call: "swallowed a war-band's armoury" [swallow]
[reskin] idea anchored: action — "When the purple worm bursts up from below, it doesn't just surface — i" answers the GM's "swallowed a war-band's armoury"
[reskin] idea unanchored: trait — "The swallowed armoury is never still inside it. Whenever the purple wo" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: shield-bash, herd, drain, shell-withdraw, rally, heated-body, false-appearance, absorption, resonant-body, adhesive, spider-climb, aberrant-ground, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "swallowed a war-band's armoury", so role and style do not filter the menu (legality still does); 16 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "When the purple worm bursts up from below, it doesn't just surface — it takes the ground with it. Each creature in a cylinder centred on the breach must make a Dexterity saving throw; on a failure it is pulled down into the collapsing burrow, lands Prone, and is Restrained in the churned earth until it or an ally digs it free. The worm feeds on the loudest cluster, so the victim is marked as its n" [action/save/condition] [family: drag] — menu: swallow, condition-payoff, burrow-ambush, escalating-dread, terror-pulse, push-prone, exploiter, execute, lure, pull-through, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, second-wind, aggro-curse, self-invisibility, focus, coating, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, contagion, stunning-strike, charge-push, pounce, charge, isolation)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — swallow: swallow
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: swallow (save/condition), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] keys would have bound: action — swallow (swallow, swallows, swallowed)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: burrow-ambush, pull-through, disarm, push-prone — the key word does not mean the mechanic here
[reskin] signature template: swallow -> Actions/"Swallow Whole" ("swallowed a war-band's armoury — the worm engulfs and holds creatures inside it [verb: swallow:concept, swallows:concept, swallowed:concept]")
[reskin] keys spent by the action: swallow, swallows, swallowed
[reskin] signature idea (trait): "The … armoury is never still inside it. Whenever the purple worm takes damage from a piercing or slashing weapon, the wound vents a gout of chewed steel and powder — the attacker must succeed on a Dexterity saving throw or be Blinded by the shrapnel until the end of its next turn." [trait/on_being_hit/condition] [family: body-reaction] — menu: bloodied-burst, weapon-lodge (+ shelf: phobia, terrain-walk, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, death-burst, kill-denial)
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition), composed:body-reaction:condition:t1:poisoned (on_being_hit/condition)
[reskin] keys would have bound: trait — tunneler (worm)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened, bloodied-burst, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:condition:t1:deaf" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on taking piercing or slashing damage, forces the attacker to make a D)
[reskin] seat answered, but: the call said "The … armoury is never still inside it. Whenever the purple worm takes damage from a piercing or slashing weapon, the wo" is carried by "Vented Armoury", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The … armoury is never still inside it. Whenever the purple worm takes" and wrote no row of that kind (refused: "Vented Armoury" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence. This fires in RESPONSE to something — being hit, damaged or moved — which print writes as a REACTION: answer in "reactions" with a trigger and a response, and put the save in the response's "save" object (${reactionSaveSpec()})) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Vented Armoury" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] seat answered, but: the call said "The … armoury is never still inside it. Whenever the purple worm takes damage from a piercing or slashing weapon, the wo" is carried by "Vented Armoury", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("on taking piercing or slashing damage, forces the attacker to make a D") and wrote a trait instead: "Vented Armoury" -> Reactions. *Trigger:* The purple worm takes damage from a piercing or slashing weapon. *Response—Dexterity Saving Throw:* DC 21, th
[reskin] authored row numbers: "Vented Armoury" — the call declared 0 number(s) promised
[reskin] seat landed on the second try: trait — "Vented Armoury" after ""Vented Armoury" — a trait is not a save — the save form takes stat, target and "
[reskin] free signature row: "Vented Armoury" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Vented Armoury" is HANDED "swallowed a war-band's armoury" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Vented Armoury" ("The … armoury is never still inside it. Whenever the purple worm takes damage from a piercing or slashing weapon, the wound vents a gout of chewed steel and pow [authored: the catalog held no shape for it]")
[reskin] one mechanic, one name: Actions/"Swallow Whole" -> "Swallow" — this row is swallow and does what every swallow row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Bite = none
[reskin] chassis nova: "Shrapnel Spray (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "the purple worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] element immunity: Acid — the call read this creature's energy as Acid and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Monstrosity -> Acid
[reskin] print canon saves: proficient in CON, WIS — the Purple Worm's own set, at this sheet's stats and PB 5 (changed STR, WIS)
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Shrapnel Spray (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Purple Worm's
[reskin] print canon row withheld: Bonus Actions/"Swallow" — the sheet's row of that name answers the GM ("swallowed a war band's armoury"), and the GM's words outrank print's name
[reskin] multiattack replacement clause: It can replace one attack with a use of Swallow.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Vented Armoury" [no template]
[reskin] row binds its clause: "Swallow" answers "swallowed a war-band's armoury" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] save re-derived after a retype: Reactions/Vented Armoury — a Dexterity save for a condition the row IMPOSES, which calls for Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Vented Armoury" claims "venting caustic, shrapnel-laced bile when its gut is struck" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Vented Armoury")
[reskin] audit: [Vented Armoury: The trigger names a weapon class r…akes damage from a piercing or slashing weapon.")]
[reskin] audit defect: Reactions/"Vented Armoury" [model-written] high untrackable — The trigger names a weapon class rather than a damage type, which fails for natural weapons, spell attacks, and any table that cannot agree what counts as a weapon. — Trigger on taking Piercing or Slashing damage, which the resolution already checks. (about: "The purple worm takes damage from a piercing or slashing weapon.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
[reskin] done: "Purple Worm" — donor brute-13, CR 15
[harness] recorded 10 model call(s)
```

---

## 14. Glacier Heart — CR 15

**Input:** `a glacier's heart given legs, trailing a wake of killing cold`
**Donor:** brute-9-juggernaut -> CR 15
**Signature:** library · **elapsed** 28s

### Block
```
Glacier Heart
Large elemental, unaligned
Armor Class

16 (natural armor)

Hit Points: 

209 (22d10 + 88)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

19 (+4)

	

6 (-2)

	

15 (+2)

	

20 (+5)

Skills: 

Athletics +8, Perception +7

Saving Throws: 

STR +8, CON +9

Damage Immunities: 

cold, poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 60 ft., passive Perception 17

Languages: 

None

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Cold Absorption.Whenever the glacier heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster.The glacier heart deals double damage to objects and structures.
Rime Lattice.Any creature that starts its turn in a 20-foot radius originating from the glacier heart must make a DC 18 Constitution saving throw. On a failed save, the target is poisoned until the end of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.

Actions
Multiattack: The glacier heart makes two Slam attacks.
Slam: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage plus 13 (3d8) cold damage.
Cold Wake (Recharge 5-6): Each creature in a 30-foot cone must make a DC 18 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also deafened until the end of its next turn.
```

### Trace
```
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "A glacier's heart given legs, trailing a…" is the description, not a name
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/terror mind=bestial style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: the killing-cold wake that freezes the ground behind it [aura] | shattering blows of packed glacial ice [body] | the slow, unstoppable glacier stride that breaks what it walks through [behavior]
[concept] identity: A walking mass of ancient blue ice, the glacier's heart announces itself with a silent, spreading crevasse-crack as the ground freezes and the air itself turns to rime around its stride. It wades forward without pause or plan, shouldering through anything standing — shattering stone and shield alike with blows of packed glacial ice — while the killing cold in its wake does the patient work of stopping hearts and slowing any who try to kite it. It has no fear and no retreat: it simply keeps coming, and the cold that follows it has already decided where you may stand.
[concept] lore: A glacier's heart torn loose from its ice-shelf and given legs, it wanders the frozen north eternally seeking the one cold deep enough to settle into once more, dragging a killing winter behind it until then.
[reskin] nova capped: "Area Nova" 71 → 66 (the chassis nova obeys the cap: 66 at CR 15)
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as bestial, and the card's 6 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 15
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 15
[reskin] donor: brute-9-juggernaut -> CR 15
[reskin] seats: action <- "the slow, unstoppable glacier stride that breaks what it walks through" | trait <- "the killing-cold wake that freezes the ground behind it"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Cold Wake = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the glacier heart" — the call's own answer (kind), built from the name
[reskin] inline form: "the glacier heart" — the model's own reading of the name
[reskin] the sheet's declared ask: zone — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral" -> Unaligned — a Elemental the call reads as bestial at INT 6 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no fear" quotes nothing the user typed
[reskin] clauses: "a glacier's heart given legs" -> has (descriptive), head | "trailing a wake of killing cold" -> has (mechanical) [asked: save_area] [askMechanic: zone]
[reskin] open asks handed to the idea call: "trailing a wake of killing cold" [zone] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The glacier heart does not stride so much as the winter arrives with i" answers the GM's "trailing a wake of killing cold"
[reskin] idea unanchored: trait — "Shatterglass Stride. The glacier heart ignores difficult terrain, and " names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: shield-bash, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, bloodied-burst, adhesive, spider-climb, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "trailing a wake of killing cold", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The glacier heart does not stride so much as the winter arrives with it: at the start of its turn, the ground within a short radius of it freezes into a lattice of crevasse-crack, becoming difficult terrain, and each creature standing there must succeed on a Constitution saving throw or have its Speed reduced until the end of its next turn as rime locks its limbs." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, evasion, guarded-stance, assassinate (+ shelf: condition-payoff, escalating-dread, terror-pulse, push-prone, exploiter, execute, lure, pacify, slow-bolt, sensory-strike, disarm, delayed-brand, curse-debt, reveal, second-wind, aggro-curse, self-invisibility, focus, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates on the menu: action — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: action — zone: aberrant-ground, energy-aura
[reskin] menu ordered by the idea's stamps: action — idea fires start_of_turn/does condition; leading: aberrant-ground (always/movement), energy-aura (start_of_turn/damage), truth-aura (start_of_turn/condition)
[reskin] keys would have bound: action — aberrant-ground, terrain-walk, slow-bolt, execute (wake, glacier, cold, kill)
[reskin] classification handed to the fit call: mechanic=aura shape=save_area
[reskin] word match declined by the call: energy-aura, aberrant-ground, slow-bolt — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: action — composed:zone:condition:poisoned: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: action — "composed:zone:condition:poisoned" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "the killing-cold wake that freezes the ground behind it" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template: composed:zone:condition:poisoned -> Traits/"Rime Lattice" ("at the start of its turn each creature in the aura must make a save or have its  [shape fit, no verb match]")
[reskin] signature idea (trait): "Shatterglass Stride. The glacier heart ignores difficult terrain, and when it moves through a space occupied by a structure or a prone creature, the packed glacial ice of its mass simply shoulders through: a prone creature is shoved to the nearest unoccupied space and takes Cold damage as it is fractured out of the way." [trait/always/movement] [family: breach] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude (+ shelf: absorption, weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — zone: aberrant-ground
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: aberrant-ground (always/movement), terrain-walk (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — aberrant-ground, terrain-walk (wake, glacier)
[reskin] classification handed to the fit call: mechanic=aura shape=save_area
[reskin] word match declined by the call: aberrant-ground, terrain-walk, relentless-pursuit, bound — the key word does not mean the mechanic here
[reskin] closest refused: trait — "aberrant-ground" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: moves prone creatures out of the space it strides through and chills t)
[reskin] seat answered, but: the call said "Shatterglass Stride. The glacier heart ignores difficult terrain, and when it moves through a space occupied by a struct" is carried by "Shatterglass Stride", and no such row is on this sheet — the clause stays open
[reskin] seat authoring refused: trait — the authored row needs its target to have Prone and no row on this sheet imposes it, so its trigger could never fire (the Chalk-Hound's Daubing Cling, forty #2)
[reskin] seat asked again: trait — the first answer was refused (the row needs its target to have a condition no row on this sheet imposes); asking once more with the reason
[reskin] seat answered, but: the call said "Shatterglass Stride. The glacier heart ignores difficult terrain, and when it moves through a space occupied by a struct" is carried by "Shatterglass Stride", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("moves prone creatures out of the space it strides through and chills t") and wrote a trait instead: "Shatterglass Stride" -> Traits. When the glacier heart moves through a space occupied by a structure or a creature, the glacier heart ignores difficult 
[reskin] authored row numbers: "Shatterglass Stride" — the call declared 1 number(s) promised
[reskin] seat landed on the second try: trait — "Shatterglass Stride" after "the row needs its target to have a condition no row on this sheet imposes"
[reskin] free signature row: "Shatterglass Stride" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] trait ceiling: "Shatterglass Stride" does not ship — 4 traits already, and print's ceiling for a material body is 4
[reskin] weapons answered: Slam = none
[reskin] chassis nova: "Cold Wake (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] defenses by material: an ice body is vulnerable to Fire and never resists, absorbs, or ignores it (named by the call's own material field) — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] absorption re-keyed: Acid -> Cold (the donor organ obeys the concept energy)
[reskin] element immunity: Cold — the call read this creature's energy as Cold and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Cold (merged into the header write)
[reskin] immunities stamped for type: Elemental -> Cold, Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a glacier's heart given legs, trailing a" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Rime Lattice" [no template]
[reskin] lint: 0 findings
[reskin] audit: [Rime Lattice: The signature aura of a killing-cold… (about: "The target has the Poisoned condition")]
[reskin] audit defect: Traits/"Rime Lattice" [model-written] medium misnamed — The signature aura of a killing-cold glacier imposes Poisoned, which is neither cold-themed nor consistent with the creature's Cold/Exhaustion identity, and the Poisoned condition's disadvantages (ability checks, attacks) don't express 'killing cold'.  — Impose a cold-appropriate condition or effect (e.g. a speed/reaction restriction framed as numbing cold) rather than Poisoned. (about: "The target has the Poisoned condition")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Glacier Heart" — donor brute-9-juggernaut, CR 15
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 12 model call(s)
```

---

## 15. Adult Red Dragon — CR 17

**Input:** `name: Adult Red Dragon | blind in one eye from an old lance`
**Donor:** dragon-15 -> CR 17
**Signature:** dropped · **elapsed** 33s

### Block
```
Adult Red Dragon
Huge dragon, chaotic evil
Armor Class

19 (natural armor)

Hit Points: 

256 (19d12 + 133)

Speed: 

40 ft., fly 80 ft., climb 40 ft.

STR	DEX	CON	INT	WIS	CHA


27 (+8)

	

10 (+0)

	

25 (+7)

	

16 (+3)

	

13 (+1)

	

23 (+6)

Skills: 

Perception +13, Stealth +6

Saving Throws: 

DEX +6, WIS +7

Damage Immunities: 

fire

Senses: 

blindsight 60 ft., darkvision 120 ft., passive Perception 23

Languages: 

Common, Draconic

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Scarred Flank.When it makes an attack roll against a creature it can hear or feel the heat of, the red dragon doesn't have disadvantage on the attack roll even if the creature is hidden from its good eye, but a creature approaching from its scarred flank gains no such help and the dragon perceives nothing from that side beyond its blindsight.
Legendary Resistance (3/Day).If the red dragon fails a saving throw, it can choose to succeed instead.
Sight Weakness.The red dragon has disadvantage on Wisdom (Perception) checks that rely on sight.

Actions
Multiattack: The red dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage.
Spellcasting: The red dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): - At will: Command, Detect Magic, Scorching Ray
1/day each: Fireball
Fire Breath (Recharge 5-6): Each creature in a 60-foot cone must make a DC 21 Dexterity saving throw, taking 59 (17d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

The red dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The red dragon regains spent legendary actions at the start of its turn.

Commanding Presence: The red dragon uses Spellcasting to cast Command (level 2 version). The red dragon can't take this action again until the start of its next turn.
Fiery Rays: The red dragon uses Spellcasting to cast Scorching Ray. The red dragon can't take this action again until the start of its next turn.
Pounce: The red dragon moves up to half its Speed, and it makes one Rend attack.
```

### Trace
```
[path] twist — Adult Red Dragon (is) — "Name field: Adult Red Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("Adult Red Dragon") | dragon: key "dragon" (class body)
[concept] name: "Adult Red Dragon" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: dragon→body ✓ ("Adult Red Dragon")
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/terror mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Adult Red Dragon"
[concept] mechanics: breath
[concept] signature elements: blind in one eye from an old lance [body] | burning breath strafing run [behavior] | the scarred blind side it guards [aura]
[concept] identity: An Adult Red Dragon whose depth perception died with its left eye, so it fights from a measured, half-blind patience: it opens with a low strafing breath-run aimed by sound and heat, always keeping the scarred side toward cover and never toward the party. Once the ground is burning it lands to fight in a blade of fire and claw, turning its head to keep the good eye on the fastest threat and punishing anyone who tries to slip through its blind side. Wounded, it does not flee — it climbs into the air and circles back to burn the retreat, raging at those who exploit the eye it lost to a lance.
[concept] lore: Lamed by a mortal knight's lance in a war it won anyway, this red dragon has made the scorched valley its hoard-throne and takes brutal, deliberate revenge on anything that comes at it from the side it cannot see.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] nova capped: "Breath Weapon" 72 → 66 (the chassis nova obeys the cap: 66 at CR 17)
[reskin] print canon defenses: HP 256 -> 256, AC 20 -> 19 — the Adult Red Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 27, DEX 10, CON 25, INT 16, WIS 13, CHA 23 — the Adult Red Dragon's at its own CR; attack +10 -> +14, DC 21 (print's)
[reskin] donor: dragon-15 -> CR 17
[reskin] seats: action <- "burning breath strafing run" | trait <- "blind in one eye from an old lance"
[reskin] [path] decides: twist on the Adult Red Dragon (the matcher agrees)
[reskin] print canon: "Adult Red Dragon — blind in one eye from an old lance" heads on the Adult Red Dragon — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Blind Fury" promises the Blinded condition but the row never delivers it — name what the rule does, or drop the claim word
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the red dragon" — the call answered "the red dragon" (kind), which the name does not support
[reskin] inline form: "the red dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 19 -> 20 off Charisma 23 (print's array stays)
[reskin] save dc derived: DC 19 -> 20 (8 + PB 6 + Charisma's 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "blind in one eye"
[reskin] lacks refused: "old lance" names no absence — nothing in it takes anything away
[reskin] clauses: "Adult Red Dragon — blind in one eye from an old lance" -> LACKS (mechanical)
[reskin] open asks handed to the idea call: "Adult Red Dragon — blind in one eye from an old lance"
[reskin] idea anchored: action — "The red dragon turns its scarred side toward a creature it can hear bu" answers the GM's "Adult Red Dragon — blind in one eye from an old lance"
[reskin] idea unanchored: trait — "The dragon has learned to fight half-blind: it is not subjected to dis" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 34 of 34 answered; not true of this body: snare, seal, shield-bash, herd, drain, shell-withdraw, rally, coating, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "Adult Red Dragon — blind in one eye from an old lance", so role and style do not filter the menu (legality still does); 3 template(s) offered
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, thrown-burst-seed, exploiter, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] signature idea (action): "The red dragon turns its scarred side toward a creature it can hear but not see and lashes out along the memory of that sound — a single Claw attack against a creature it cannot see but that has made noise since the end of the dragon's last turn, made without the usual disadvantage for attacking an unseen target." [action/always/damage] [family: sentinel] — menu: condition-payoff, execute, throw-retrieve (+ shelf: lure, lay-on-hands, second-wind, patient-defense, answering-strike, riposte, contagion, stunning-strike, charge-push, pounce, charge, isolation)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does damage; leading: throw-retrieve (always/damage), condition-payoff (save/damage), execute (save/damage)
[reskin] keys would have bound: action — throw-retrieve, charge (lance)
[reskin] classification handed to the fit call: mechanic=breath
[reskin] word match declined by the call: throw-retrieve, execute — the key word does not mean the mechanic here
[reskin] closest refused: action — "condition-payoff" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: attacks a hidden-but-heard target without the unseen-attacker disadvan)
[reskin] clause already answered: "Adult Red Dragon — blind in one eye from an old lance" is carried by "Blind Fury" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "Adult Red Dragon — blind in one eye from an old lance" is already carried by a row on this sheet; no second row is written for it
[reskin] decline reason: action — the call answered none and names it "no_fit" — the GM's words key throw-retrieve, charge, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: action — "throw-retrieve" is keyed by the GM's lance and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: action — "The red dragon turns its scarred side toward a creature it can hear but not see and lashes out along the memory of that sound — a single Claw attack against a creature it cannot see but that has made noise since the end of the dragon's last turn, made without the usual disadvantage for attacking an unseen target." [action/always/damage] — the model found no template that holds it (offered: throw-retrieve, condition-payoff, execute)
[reskin] signature idea (trait): "The dragon has learned to fight half-blind: it is not subjected to disadvantage on attack rolls against a creature it can hear or feel the heat of, even if that creature is hidden from its good eye — but a creature that approaches from its scarred flank gains no such help, and the dragon perceives nothing from that side beyond its blindsight." [trait/always/defense] [family: sentinel] — menu: spider-climb, phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial, evasion, guarded-stance (+ shelf: heated-body, weapon-lodge)
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), uncanny-sense (always/defense)
[reskin] classification handed to the fit call: mechanic=breath
[reskin] word match declined by the call: guarded-stance, bloodied-fury — the key word does not mean the mechanic here
[reskin] closest refused: trait — "uncanny-sense" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: perceives creatures hidden from it by hearing or heat, but nothing fro)
[reskin] seat answered, but: the call said "The dragon has learned to fight half-blind: it is not subjected to disadvantage on attack rolls against a creature it ca" is carried by "Scarred Flank", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("perceives creatures hidden from it by hearing or heat, but nothing fro") and wrote a trait instead: "Scarred Flank" -> Traits. When it makes an attack roll against a creature it can hear or feel the heat of, the red dragon doesn't have disadvantag
[reskin] authored row numbers: "Scarred Flank" — the call declared 0 number(s) promised
[reskin] free signature row: "Scarred Flank" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Scarred Flank" is HANDED "Adult Red Dragon — blind in one eye from an old lance" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Scarred Flank" ("The dragon has learned to fight half-blind: it is not subjected to disadvantage on attack rolls against a creature it can hear or feel the heat of, even if that [authored: the catalog held no shape for it]")
[reskin] weapons answered: Claw = none
[reskin] chassis nova: "Fire Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] print canon attack: "Claw" -> "Rend" — the Adult Red Dragon's own row
[reskin] print canon multiattack: "the red dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Scorching Ray*." — the Adult Red Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 -> 60
[reskin] dragon spell DC derived: 20 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Scarring Roar" -> 20 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon skills: "Perception +7, Stealth +6" -> "Perception +13, Stealth +6" — the Adult Red Dragon's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Fire Breath (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Adult Red Dragon's
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Adult Red Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon legendary: Commanding Presence, Fiery Rays, Pounce — the Adult Red Dragon's own kit stands where the chassis's stood
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Scarred Flank" [no template]
[reskin] 2024 caps: "Scarred Flank" — a condition or game term shipped lowercase
[reskin] sheet lint: at-will-inline: Actions/Spellcasting: a 2024 spell bullet survived into a 2014 block
[reskin] lint: at-will-inline: Actions/Spellcasting: a 2024 spell bullet survived into a 2014 block
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Scarred Flank carries "blind in one eye from an old lance" — "a creature approaching from its scarred flank gains no such help and the dragon "
[reskin] audit: [Scarred Flank: The trait is built on tracking whet…ven if the creature is hidden from its good eye"), Scarred Flank: The mechanic describes a blind-in-o…ven if the creature is hidden from its good eye")]
[reskin] audit defect: Traits/"Scarred Flank" [model-written] high untrackable — The trait is built on tracking whether a creature is on the dragon's 'good eye' side versus its 'scarred flank' side, which requires knowing which way the dragon is facing — a state the block never defines and the table cannot reliably check. — Replace the facing-based good-eye/scarred-flank distinction with a checkable condition such as a creature that is Hidden or flanking for the blindness rider, so the GM can resolve it without tracking facing. (about: "When it makes an attack roll against a creature it can hear or feel the heat of, the red dragon doesn't have Disadvantage on the attack roll even if the creature is hidden from its good eye")
[reskin] audit defect: Traits/"Scarred Flank" [model-written] medium undelivered — The mechanic describes a blind-in-one-eye creature that still perceives nothing on one side but takes no penalty for attacking a creature it cannot perceive, so the name and the fiction promise a blind flank that the rules never impose any consequence for. — Give the scarred flank an actual mechanical consequence (e.g. attacks from that side gain a benefit or the dragon suffers a penalty there) so the blindness is expressed in the rules rather than negated by them. (about: "the red dragon doesn't have Disadvantage on the attack roll even if the creature is hidden from its good eye")
[reskin] [gap] attacks a hidden-but-heard target without the unseen-attacker disadvantage — "The red dragon turns its scarred side toward a creature it can hear but not see and lashes out along the memory of that sound — a single Claw attack against a creature it cannot see but that has made noise since the end of the dragon's last turn, made without the usual disadvantage for attacking an unseen target." — Adult Red Dragon [seat: action [action/always/damage]] (closest offered: condition-payoff) [effect: condition] [menu: throw-retrieve condition-payoff execute] [same-cell unoffered: blood-frenzy pack-tactics assassinate death-burst zone-seed coating] [same-seat rejected: zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] lacks clause: Traits/"Scarred Flank" STAYS — the seat wrote it for "Adult Red Dragon — blind in one eye from an old lance", so its name carrying that word is the lack expressed, not a capability the lack removes
[reskin] flaw row: "Sight Weakness" — "Adult Red Dragon — blind in one eye from an old lance" removed no row, so the absence costs the creature something instead (print's grammar: 11 of 329 blocks carry one; owner's ruling 1f)
[reskin] done: "Adult Red Dragon" — donor dragon-15, CR 17
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 11 model call(s)
```

---

## 16. Brass Tyrant — CR 17

**Input:** `a tyrant of burning brass who rules a city of forges`
**Donor:** brute-17-juggernaut -> CR 17
**Signature:** library · **elapsed** 26s

### Block
```
Brass Tyrant

Huge Construct, Neutral Evil

AC 19
Initiative -1 (9)

HP 230 (20d12 + 100)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+12
INT
15
+2
+2
MOD
SAVE
DEX
8
-1
-1
WIS
20
+5
+5
MOD
SAVE
CON
20
+5
+11
CHA
20
+5
+5

Skills Athletics +12, Perception +11

Immunities Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 21

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Fear Aura. The tyrant emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 19, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The tyrant can't shape-shift.

Siege Monster. The tyrant deals double damage to objects and structures.

Actions

Multiattack. The tyrant makes two Sledge Fist attacks. It can replace one attack with a use of Cinder Brand.

Sledge Fist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Furnace Gust (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 66 (12d10) Fire damage. Success: Half damage only.

Cinder Brand. Strength Saving Throw: DC 19, one creature within 30 feet. Failure: 35 (10d6) Fire damage. If the target is already Prone, it also has the Restrained condition until the end of its next turn. Success: Half damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Crush Forward. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Sledge Fist attack.

Ruin March. The tyrant moves up to its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Forge Quake. Strength Saving Throw: DC 19, each creature within 10 feet of the tyrant. Failure: The target has the Prone condition.

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

### Trace
```
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a tyrant of burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/elemental mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a body of burning brass [body] | rules a city of forges by force [behavior] | radiating searing heat [aura]
[concept] identity: The Brass Tyrant opens by wading into the thickest rank of foes, its molten-iron fists and furnace-brass hide carrying fire with every blow, while its sheer mass shatters forges, walls, and formations it simply walks through. Each round it crushes the nearest threat, hammering the same target until it stops moving, and answers any who dare strike it with a wash of searing heat boiling out of its seams. It does not flee; when bloodied — or cracked and leaking — it fights harder and hotter, casting off gobbets of burning brass that splatter across the battlefield, its temper rising with its temperature.
[concept] lore: Poured in the first forge-furnace of a city that worships metal, the Brass Tyrant was made to rule the smiths and never to cool — a crown of molten brass that will not suffer a rival hand on the bellows.
[reskin] nova capped: "Area Nova" 72 → 66 (the chassis nova obeys the cap: 66 at CR 17)
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 17
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 17
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 17
[reskin] donor: brute-17-juggernaut -> CR 17
[reskin] seats: action <- "rules a city of forges by force" | trait <- "a body of burning brass"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the tyrant" — the model's own reading of the name
[reskin] fear unearned by the damage: "Furnace Gust (Recharge 5-6)" would have imposed Frightened on a Fire row — print pairs Frightened with Psychic or Thunder damage and with nothing else; the clause leaves and the row keeps its damage
[reskin] the sheet's declared ask: zone — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (2 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The tyrant plants its fists and lets the fire in its seams boil over, " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The tyrant is a body of burning brass first and a machine second: its " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: shield-bash, herd, drain, shell-withdraw, rally, coating, false-appearance, absorption, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The tyrant plants its fists and lets the fire in its seams boil over, searing an emanation of molten brass around itself that clings to anything that stays near — the ground it heats stays hot, so creatures ending their turn in the wash take Fire damage and the metal underfoot runs like tallow." [action/always/damage] [family: zone] — menu: condition-payoff, escalating-dread, terror-pulse, exploiter (+ shelf: second-wind, aggro-curse, self-invisibility, focus, answering-strike, stunning-strike, charge-push, pounce)
[reskin] signature miss: action — "The tyrant plants its fists and lets the fire in its seams boil over, searing an emanation of molten brass around itself that clings to anything that stays near — the ground it heats stays hot, so creatures ending their turn in the wash take Fire damage and the metal underfoot runs like tallow." [action/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: condition-payoff, escalating-dread, terror-pulse, exploiter, second-wind, aggro-curse, self-invisibility, focus, answering-strike, stunning-strike, charge-push, pounce)
[reskin] value check: "Opportunist's Lash" EV 46.4 vs floor 45.5 (one attack of 2) — dice 28 → 35
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The tyrant is a body of burning brass first and a machine second: its seams and joints glow white-hot, so its space is difficult terrain for creatures that can't shrug off fire, and any creature that starts its turn in contact with the tyrant's heated frame takes Fire damage as the furnace inside breathes out through the cracks." [trait/start_of_turn/damage] [family: zone] — menu: phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, fear-aura, death-burst (+ shelf: heated-body, bloodied-burst, resonant-body, weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — zone: energy-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: energy-aura (start_of_turn/damage), composed:zone:damage (start_of_turn/damage), truth-aura (start_of_turn/condition)
[reskin] keys would have bound: trait — heated-body (burn, brass)
[reskin] classification handed to the fit call: mechanic=aura
[reskin] word match declined by the call: heated-body, fear-aura, truth-aura — the key word does not mean the mechanic here
[reskin] fear moved to a row that deals no damage: the sheet declared Frightened and a Fire row cannot carry it by print — fear-aura carries it instead ("Fear Aura" in Traits)
[reskin] signature template (trait): fear-aura -> Traits/"Fear Aura" ("the sheet declared Frightened and its Fire damage cannot carry it by print")
[reskin] trait ceiling: "Furnace Heat" does not ship — 4 traits already, and print's ceiling for a material body is 4
[reskin] weapons answered: Sledge Fist = none; Furnace Gust = none; Bellows Command = none; Crush Forward = none; Ruin March = none; Forge Quake = none
[reskin] chassis nova: "Furnace Gust (Recharge 5-6)" — the brute-17-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Fire — the call read this creature's energy as Fire and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Fire (merged into the header write)
[reskin] immunities stamped for type: Construct -> Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a tyrant of burning brass who rules a ci" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] free-row budget by card size: CR 17 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 11 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] lint: 0 findings
audit finding below confidence gate: Opportunist's Lash The Restrained rider keys off a Prone target, but nothing in the block reliably creates Prone before this attack's use in a turn, making the bonus clause near-dead in practice.
audit finding below confidence gate: Forge Quake The quake's only payload is Prone with no damage or lasting effect, a nuisance where the fiction of a quake promises a threat.
[reskin] audit: [Fear Aura: An Emanation must originate from the cr…le it doesn't have the Incapacitated condition."), Opportunist's Lash: The generic stand-in name does…ge tyrant register. (about: "Opportunist's Lash")]
[reskin] audit rename: "Opportunist's Lash" -> "Cinder Brand"
[reskin] audit defect: Traits/"Fear Aura" [catalog] high untrackable — An Emanation must originate from the creature on a defined grid; as written the aura's point of origin is not tied to the tyrant's space, so the GM cannot place it. — State that the aura surrounds the tyrant (originates from its space). (about: "The tyrant emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition.")
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Cinder Brand) — the sameness metric
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Brass Tyrant" — donor brute-17-juggernaut, CR 17
[harness] recorded 8 model call(s)
```

---

## 17. Pit Fiend — CR 20

**Input:** `name: Pit Fiend | who collects the oaths of dying knights`
**Donor:** defender-17 -> CR 20 (invented — no printed peer)
**Signature:** library · **elapsed** 34s

### Block
```
Pit Fiend

Large Fiend, Lawful Evil

AC 21
Initiative +2 (12)

HP 337 (27d10 + 189)

Speed 30 ft., Fly 60 ft. (hover)

MOD
SAVE
STR
26
+8
+8
INT
22
+6
+6
MOD
SAVE
DEX
14
+2
+8
WIS
18
+4
+10
MOD
SAVE
CON
24
+7
+7
CHA
24
+7
+7

Skills Perception +10, Persuasion +19

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses darkvision 120 ft.; Passive Perception 20

Languages Infernal; telepathy 120 ft.

CR 20 (XP 25,000; PB +6)

Traits

Broken Word, Burning Sigil. When a creature within 60 feet of the pit fiend willingly takes a vow, gives its word, or accepts a command from or before the pit fiend, and then breaks it, the oathbreaker is marked with a burning sigil for the rest of the fight; while marked, it can't willingly move away from the pit fiend and can't take the Help action.

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Soulchain Edict.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Soulchain Edict. Charisma Saving Throw: DC 21, one creature within 60 feet. Failure: 32 (5d12) Fire damage, and the target has the Charmed condition until the end of its next turn.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

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

### Trace
```
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] defender-leader type=Fiend mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: the call reads no worked magic in these words | defender-leader: ✓ ("collects the oaths") | defender: the call read "knights" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Pit Fiend" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Fiend typeFrom=the route call themes=fiendish/armed mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: collecting oaths of dying knights [behavior] | iron chains binding sworn souls [object] | aura of sovereign command [aura]
[concept] identity: The Pit Fiend opens by claiming the field itself — declaring a sovereign kill-zone where every oath sworn within earshot bends toward it, and its allies taste triumph when they strike beside it. Each round it fights beside its sworn host with a warden's parry, turning aside a blow meant for its knights while the debt of their dying oaths hardens into iron chains that drag the wounded back to service. It does not flee; it believes the battlefield is already bound to it, and it toys with those who dare swear against it.
[concept] lore: Forged in the Abyss from the broken oaths of dying knights, the Pit Fiend exists to collect the last promises of the valiant, binding their souls into iron chains that extend its dominion across the Lower Planes.
[reskin] print canon route: the Pit Fiend's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 281 -> 337, AC 22 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: defender-17 -> CR 20 (invented — no printed peer)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "collecting oaths of dying knights" | trait <- "iron chains binding sworn souls"
[reskin] [path] decides: twist on the Pit Fiend (the matcher agrees)
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the pit fiend" — the call answered "the pit fiend" (kind), which the name does not support
[reskin] inline form: "the pit fiend" — the model's own reading of the name
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "collects the oaths of dying knights" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Pit Fiend —" -> has (descriptive), head | "collects the oaths of dying knights" -> has (mechanical) [asked: at_will/save_single] [askMechanic: curse]
[reskin] open asks handed to the idea call: "collects the oaths of dying knights" [curse]
[reskin] idea anchored: action — "The pit fiend fixes its gaze on one creature within its domain and spe" answers the GM's "collects the oaths of dying knights"
[reskin] idea unanchored: trait — "Oaths sworn in the pit fiend's presence bend toward it. Any creature t" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: shield-bash, active-toll, random-ray, shell-withdraw, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, web-walker, noxious-aura, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, death-burst
[reskin] menu: taste stands down — action answers the GM's "collects the oaths of dying knights", so role and style do not filter the menu (legality still does); 20 template(s) offered
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The pit fiend fixes its gaze on one creature within its domain and speaks a single binding word of command. The target must succeed on a Charisma saving throw or be cursed: for the duration, whenever it willingly moves away from the pit fiend it takes fire damage, and if it falls to 0 hit points while cursed, its dying oath is collected — the pit fiend regains hit points and the target's soul is c" [action/save/condition] [family: mark] — menu: seal, ground-burst, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, trample, thrown-burst, snare, condition-payoff, execute, lure, pacify, escalating-dread, sensory-strike, thrown-burst-seed (+ shelf: delayed-brand, patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, rally, focus, feint-slip, riposte, answering-strike, stunning-strike, charge-push, hook-rider, life-drain, contagion, pounce, isolation, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — curse: seal, curse-debt
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: seal (save/condition), curse-debt (save/damage), terror-pulse (save/condition)
[reskin] keys would have bound: action — curse-debt, aggro-curse (oath)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: seal, terror-pulse, reveal, exploiter, snare, lure, pacify, escalating-dread, sensory-strike — the key word does not mean the mechanic here
[reskin] closest refused: action — "curse-debt" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: heals the pit fiend and claims the victim's soul when the cursed targe)
[reskin] seat authored nothing: action — the call was asked to write an action for "The pit fiend fixes its gaze on one creature within its domain and spe" and wrote no row of that kind (refused: "Oathbrand" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Oathbrand" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a for); asking once more with the reason
[reskin] authored row answers the GM: action — "Soulchain Edict" was written for "collects the oaths of dying knights", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("heals the pit fiend and claims the victim's soul when the cursed targe") and wrote an action instead: "Soulchain Edict" -> Actions. *Charisma Saving Throw*: DC 21, one creature within 60 feet. *Failure:* 32 (5d12) Fire damage, and the target has the Ch
[reskin] authored row numbers: "Soulchain Edict" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Soulchain Edict" after ""Oathbrand" — the row does nothing on a failed save — say what the target suffer"
[reskin] signature authored: no template — the seat wrote it -> Actions/"Soulchain Edict" ("The pit fiend fixes its gaze on one creature within its domain and speaks a single binding word of command. The target must succeed on a Charisma saving throw o [authored: the catalog held no shape for it]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Oaths sworn in the pit fiend's presence bend toward it. Any creature that willingly takes a vow, gives its word, or accepts a command within the sovereign's presence — and then breaks it — is marked with a burning sigil for the rest of the fight; while marked it can't willingly move away from the pit fiend or take the Help action." [trait/always/condition] [family: zone] — menu: phobia, aberrant-ground, faultless-tracker, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: heated-body, resonant-body, weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), faultless-tracker (always/condition), berserk (always/condition)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: truth-aura, fear-aura, phobia, bound — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:frightened" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: marks a creature that breaks a vow with a sigil, then forbids it from )
[reskin] seat authored the row: trait — the call refused every template for no_fit ("marks a creature that breaks a vow with a sigil, then forbids it from ") and wrote a trait instead: "Broken Word, Burning Sigil" -> Traits. When a creature within 60 feet of the pit fiend willingly takes a vow, gives its word, or accepts a command from or befo
[reskin] authored row numbers: "Broken Word, Burning Sigil" — the call declared 0 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Broken Word, Burning Sigil" ("Oaths sworn in the pit fiend's presence bend toward it. Any creature that willingly takes a vow, gives its word, or accepts a command within the sovereign's pre [authored: the catalog held no shape for it]")
[reskin] weapons answered: Claw = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Claw" -> "Bite" — the Pit Fiend's own row
[reskin] print canon multiattack: "the pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack." — the Pit Fiend's own
[reskin] element immunity: Fire — the call read this creature's energy as Fire and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Fire (merged into the header write)
[reskin] immunities stamped for type: Fiend -> Fire, Poison; Poisoned
[reskin] print canon saves: proficient in DEX, WIS — the Pit Fiend's own set, at this sheet's stats and PB 6 (changed STR, DEX, CON)
[reskin] print canon skills: "Athletics +14, Perception +10" -> "Perception +10, Persuasion +19" — the Pit Fiend's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: resistances none -> Cold — the Pit Fiend's own header lines
[reskin] resistances derived withheld: print's Pit Fiend owns the line (Cold)
[reskin] print canon trait: Diabolical Restoration — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "Pit Fiend — who collects the oaths of dying knights" is the Pit Fiend (print's own row)
[reskin] print canon legendary: the chassis's Legendary Actions leave — the Pit Fiend has none of its own at its CR
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Soulchain Edict.
[reskin] free-row budget by card size: CR 20 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 9 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Broken Word, Burning Sigil" [no template]
[reskin] ask vs row ok: "collects the oaths of dying knights" -> "Soulchain Edict" — trigger at_will
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Broken Word, Burning Sigil carries "collecting oaths of dying knights" — "willingly takes a vow, gives its word, or accepts a command from or before the p"
[reskin] audit: [Broken Word, Burning Sigil: The sigil keys on an o…of breaking a word. (about: "and then breaks it"), Broken Word, Burning Sigil: The mark 'burns' in na…om the pit fiend and can't take the Help action"), Soulchain Edict: An 'Edict' from an oath-collector…harmed condition until the end of its next turn")]
[reskin] audit defect: Traits/"Broken Word, Burning Sigil" [model-written] medium untrackable — The sigil keys on an oath being broken, but nothing in the trait or the rest of the block defines when a vow counts as broken or how the GM is to track it, leaving the trigger unresolvable at the table. — State a concrete, observable break condition the GM can check (e.g., whether the creature attacks the pit fiend or refuses its command) rather than the abstract act of breaking a word. (about: "and then breaks it")
[reskin] audit defect: Traits/"Broken Word, Burning Sigil" [model-written] medium open_ended — The mark 'burns' in name only and has no duration or exit beyond 'for the rest of the fight', an open-ended state with only a narrative end condition. — Give the sigil a stated mechanical end condition (fixed duration, or a save/removal clause) so the marked state can be shed within the rules. (about: "can't willingly move away from the pit fiend and can't take the Help action")
[reskin] audit defect: Actions/"Soulchain Edict" [model-written] medium undelivered — An 'Edict' from an oath-collector's signature action chaining a target with fire instead imposes nothing oath- or binding-like — Charmed for one turn does not chain, bind, or compel anything the fiction promises. — Rework the rider to deliver a binding/compulsion effect (a condition or restriction tied to obeying the pit fiend) that matches the oath-chain fiction. (about: "the target has the Charmed condition until the end of its next turn")
[reskin] clause unresolved: "Broken Word, Burning Sigil" carries "Oaths sworn in the pit fiend's presence bend toward it. ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Pit Fiend" — donor defender-17, CR 20
[harness] recorded 11 model call(s)
```

---

## 18. Archliche of the Bone Sun — CR 20

**Input:** `an archlich enthroned on a sun of bone`
**Donor:** caster-21 -> CR 20
**Signature:** library · **elapsed** 33s

### Block
```
Archliche of the Bone Sun
Medium undead, neutral evil
Armor Class

20 (natural armor)

Hit Points: 

315 (42d8 + 126)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

16 (+3)

	

16 (+3)

	

21 (+5)

	

14 (+2)

	

16 (+3)

Skills: 

Arcana +17, History +11, Insight +8, Perception +8

Saving Throws: 

DEX +9, CON +9, INT +11, WIS +8

Damage Resistances: 

cold, lightning

Damage Immunities: 

necrotic, poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, poisoned

Senses: 

truesight 60 ft., passive Perception 18

Languages: 

All

Challenge

20 (25,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day).If the archliche fails a saving throw, it can choose to succeed instead.
Spirit Jar.If destroyed, the archliche reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archliche's lair.
Protective Magic (Reaction).The archliche casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The archliche makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of Ruinous Curse.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the archliche's next turn.
Spellcasting: The archliche casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/day each: Animate Dead, Dimension Door, Plane Shift
1/day each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Ruinous Curse: One creature within 60 feet must make a DC 19 Charisma saving throw, taking 24 (7d6) necrotic damage on a failed save. On a failed save, the target is cursed. While cursed, the target can't regain hit points.
Legendary Actions

Archliche can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Archliche regains spent legendary actions at the start of its turn.

Deathly Teleport: The archliche teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an Undead in a 20-foot radius originating from the archliche must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
Frightening Gaze: The archliche casts Fear, using the same spellcasting ability as Spellcasting. The archliche can't take this action again until the start of its next turn.
```

### Trace
```
[path] twist — Lich (is) — "archlich" (call)
[route] caster (artillery) type=Undead mechanics=none — casts: implied by the kind — "archlich" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("an archlich") | caster: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "archlich enthroned on a sun of bone…" is the description, not a name
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=grave/arcane mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a throne of fused bone hanging as a sun [object] | radiant-grey bonefire rained down from the crown [behavior] | deathless archmage's patient contempt for the living [aura]
[concept] identity: The archlich does not walk to war — it is carried, throne and all, upon a hollow sun of fused bone that hangs above the field, and it opens by loosing radiant-grey bonefire from that crown so the ground beneath the living turns to bone splinters. Every round it shifts the bone-sun's orbit to keep a wall of gravesplinter between itself and blades, hurling splinter-bolts and withering words from the far side of its own corpse-light. It is a patient, contemptuous thing that treats battle as a lecture in mortality and will not flee — when cornered it collapses the throne inward into a cage of ribs and lets the sun's shell do the killing for it.
[concept] lore: Long ago a deathless archmage had its own skeleton calcined into a throne and hung it as a sun over the necropolis it rules, and now it gathers the bones of every fool who marches against it to feed the shell's slow growth.
[reskin] nova capped: "Area Nova" 76 → 66 (the chassis nova obeys the cap: 66 at CR 20)
[reskin] print canon pb: print's +12 on PB +7 reads +11 on this sheet's PB +6; DCs follow
[reskin] print canon defenses: HP 300 -> 315, AC 19 -> 20 — the Lich's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's at its own CR; attack +10 -> +11, DC 19 (print's, on this sheet's PB)
[reskin] donor: caster-21 -> CR 20
[reskin] seats: action <- "radiant-grey bonefire rained down from the crown" | trait <- "a throne of fused bone hanging as a sun"
[reskin] [path] decides: twist on the Lich (the matcher agrees)
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Splinter Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the archliche" — the call answered "the bone sun" (kind), which the name does not support
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an archlich enthroned on a sun of bone" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The archliche flings a splinter of the bone-sun's shell at a creature " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The bone-sun's slow orbit keeps the archliche a step out of reach: ran" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: snare, seal, snare-bolt, herd, drain, zone-seed, rally, heated-body, false-appearance, absorption, bloodied-burst, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, sealed-body, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] menu pruned: action — thrown-burst-seed, phase-slip, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The archliche flings a splinter of the bone-sun's shell at a creature it can see, which lodges in the target's flesh. Until the splinter is removed, the target's hit point maximum is reduced by the damage dealt, and the archliche knows the direction and distance to the target, and the target's scent of mortality draws the archliche's attacks: the archliche has advantage on attack rolls against the" [action/always/condition] [family: mark] — menu: gaze-single, condition-payoff, execute, lure, pacify, escalating-dread, slow-bolt, sensory-strike, curse-debt, reveal (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does condition; leading: gaze-single (save/condition), lure (save/condition), pacify (save/condition)
[reskin] word match declined by the call: gaze-single, lure, pacify, escalating-dread, sensory-strike, reveal, condition-payoff, execute, slow-bolt — the key word does not mean the mechanic here
[reskin] row kept the template's own name: action — "Ruinous Curse" is curse-debt's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] free signature row: action — "curse-debt" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "a throne of fused bone hanging as a sun" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Ruinous Curse" is HANDED "an archlich enthroned on a sun of bone" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: curse-debt -> Actions/"Ruinous Curse" ("the splinter of the bone-sun lodges in the target, reducing its hit point maximu [shape fit, no verb match]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 20 already beats print's 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The bone-sun's slow orbit keeps the archliche a step out of reach: ranged attacks against the archliche are made with disadvantage while any of its bone splinters remain embedded in a living creature within 120 feet, as the orbiting shell interposes itself between the archliche and the threat." [trait/always/defense] [family: zone] — menu: phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, marking-light, relic-object, undead-fortitude, truth-aura, fear-aura, evasion, guarded-stance
[reskin] verb gate stands down: trait — no template shares a verb, but 6 template(s) whose declared stamps match the idea (always/defense): bloodied-fury, death-restoration, shielded-mind, relic-object, undead-fortitude, evasion; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the zone family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] word match declined by the call: relic-object, death-restoration, undead-fortitude, shielded-mind — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: imposes Disadvantage on attack rolls against the creature while a cond)
[reskin] seat answered, but: the call said "The bone-sun's slow orbit keeps the archliche a step out of reach: ranged attacks against the archliche are made with di" is carried by "Orbital Intercession", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("imposes Disadvantage on attack rolls against the creature while a cond") and wrote a trait instead: "Orbital Intercession" -> Traits. While its bone splinters are embedded in a living creature within 120 feet, ranged attacks against the archliche are mad
[reskin] authored row numbers: "Orbital Intercession" — the call declared 1 number(s) promised
[reskin] free signature row: "Orbital Intercession" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Orbital Intercession" is HANDED "an archlich enthroned on a sun of bone" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Orbital Intercession" ("The bone-sun's slow orbit keeps the archliche a step out of reach: ranged attacks against the archliche are made with disadvantage while any of its bone splinte [authored: the catalog held no shape for it]")
[reskin] weapons answered: Splinter Bolt = none; Grave Rubble = none; Bonefire Shower = none
[reskin] weapon declined: "Splinter Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Splinter Bolt" — a launcher, never thrown, range 80/320
[reskin] chassis nova: "Bonefire Shower (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Eldritch Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Lich's weapon is thrown)
[reskin] print canon attack: "Grave Rubble" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon multiattack: "the archliche makes three attacks, using Eldritch Burst or Paralyzing Touch in any combination." — the Lich's own
[reskin] ranged row off: "Splinter Bolt" leaves — the Lich carries no ranged row and the words name none
[reskin] dead wildcard name swept — "Splinter Volley" was only about "Splinter Bolt"; the row drops
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in DEX, CON, INT, WIS — the Lich's own set, at this sheet's stats and PB 6 (changed DEX)
[reskin] print canon skills: "Arcana +11, Perception +8" -> "Arcana +17, History +11, Insight +8, Perception +8" — the Lich's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] resistances derived withheld: print's Lich owns the line (Cold, Lightning)
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Bonefire Shower (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Lich's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Reactions/"Protective Magic" — print's own row takes the name back from the engine's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Ruinous Curse or (B) Spellcasting to cast *Bestow Curse*.
[reskin] free-row budget by card size: CR 20 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 10 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row order: "Ruinous Curse" [clause, curse-debt] > "Orbital Intercession" [clause, no template] — a receipt row is never displaced by one without, and within a rank a templated row is never displaced by one without
[reskin] free row over budget: Traits/"Orbital Intercession" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Ruinous Curse" [action/save/damage]
[reskin] replacement clause re-read: "Spellcasting to cast Bestow Curse" is not on this sheet, so the clause falls to its single-option form: "ny combination. It can replace one attack with a use of Ruinous Curse."
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Ruinous Curse: The curse has no stated duration, s…hile cursed, the target can't regain Hit Points"), Ruinous Curse: Amid an archliche whose other rows …7d6) Necrotic damage, and the target is cursed.")]
[reskin] audit defect: Actions/"Ruinous Curse" [model-written] high open_ended — The curse has no stated duration, so it persists indefinitely with no end condition, leaving the GM unable to adjudicate when the effect lifts. — Give the curse a fixed duration or an end condition (e.g. until the end of the archliche's next turn, or a repeat save at the end of each target turn). (about: "the target is cursed. While cursed, the target can't regain Hit Points")
[reskin] audit defect: Actions/"Ruinous Curse" [model-written] medium weak — Amid an archliche whose other rows deal 31 Force, 31 Necrotic to an area, and Paralyze, a single-target 24 damage and a healing-block does not earn one of the Multiattack's three attacks. — Add teeth to the curse payload so the row carries weight on its own turn, e.g. a damage-over-time clause or a condition that materially hampers the target. (about: "*Charisma Saving Throw:* DC 19, one creature within 60 feet. *Failure:* 24 (7d6) Necrotic damage, and the target is cursed.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] record reconciled: "Eldritch Burst" no longer imposes Prone — the clause left, so the record goes with it
[reskin] record reconciled: "Paralyzing Touch" no longer imposes Prone — the clause left, so the record goes with it
[reskin] done: "Archliche of the Bone Sun" — donor caster-21, CR 20
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 11 model call(s)
```

---

## 19. Ancient Gold Dragon — CR 24

**Input:** `name: Ancient Gold Dragon | `
**Donor:** —
**Signature:** — · **elapsed** 13s

### Block
```
Ancient Gold Dragon
Gargantuan dragon, lawful good
Armor Class

22 (Natural Armor)

Hit Points: 

546 (28d20 + 252)

Speed: 

40 ft., fly 80 ft., swim 40 ft.

STR	DEX	CON	INT	WIS	CHA


30 (+10)

	

14 (+2)

	

29 (+9)

	

18 (+4)

	

17 (+3)

	

28 (+9)

Skills: 

Insight +10, Perception +17, Persuasion +16, Stealth +9

Saving Throws: 

DEX +9, CON +16, WIS +10, CHA +16

Damage Immunities: 

Fire

Senses: 

Blindsight 60 ft., Darkvision 120 ft., Passive Perception 27

Languages: 

Common, Draconic

Challenge

24

Proficiency Bonus:

+7

Amphibious.The dragon can breathe air and water.
Legendary Resistance (3/Day).If the dragon fails a saving throw, it can choose to succeed instead.

Actions
Multiattack: The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.
Bite: Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage.
Claw: Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.
Tail: Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.
Frightful Presence: Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 24 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.
Breath Weapons (Recharge 5–6): The dragon uses one of the following breath weapons.
Fire Breath: The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 71 (13d10) fire damage on a failed save, or half as much damage on a successful one.
Weakening Breath: The dragon exhales gas in a 90-foot cone. Each creature in that area must succeed on a DC 24 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.
Change Shape: The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).

In a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.
Legendary Actions

The ancient gold dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ancient gold dragon regains spent legendary actions at the start of its turn.

Detect: The dragon makes a Wisdom (Perception) check.
Tail Attack: The dragon makes a tail attack.
Wing Attack (Costs 2 Actions): The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.
```

### Trace
```
[concept] thin but a print creature — keeping route-first: Ancient Gold Dragon
[path] exact — Ancient Gold Dragon (is) — "Ancient Gold Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("Ancient Gold Dragon") | dragon: key "dragon" (class body)
[concept] hints: dragon→body ✓ ("Ancient Gold Dragon names a true dragon")
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/elemental mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Ancient Gold Dragon"
[concept] mechanics: breath
[concept] signature elements: molten-gold fire breath [behavior] | gilded hide and hoard-encrusted scales [body] | overwhelming ancient presence [aura]
[concept] identity: The ancient gold dragon begins combat with its frightful presence and a blast of superheated, molten-gold flame breath that clings and sears. Each round after, it closes to melee, striking with gilded claws and bite while using its overwhelming size and cunning to reposition, protect its hoard, and pin the fight where its breath can catch the most foes. It is not a mindless beast—under pressure it fights to the death with calculated fury, never fleeing, because its hoard is itself.
[concept] lore: An ancient gold dragon is the living memory of a mountain's wealth, a creature that has slept beneath the earth so long it has become gilded by its own hoard, and it wants only to be left alone with its treasures or to prove its worth against any who dare disturb them.
[reskin] 2014 exact: "Ancient Gold Dragon" served from the SRD 5.1 corpus — no call, nothing rephrased (owner's ruling; the 2014 book's own creature)
[harness] recorded 3 model call(s)
```

---

## 20. Trench Hymn Leviathan — CR 24

**Input:** `a leviathan of the trench whose song drowns fleets`
**Donor:** caster-17-binder -> CR 24
**Signature:** library · **elapsed** 33s

### Block
```
Trench Hymn Leviathan

Gargantuan Monstrosity, Neutral

AC 20
Initiative +2 (12)

HP 472 (27d20 + 189)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
25
+7
+7
INT
15
+2
+9
MOD
SAVE
DEX
15
+2
+2
WIS
28
+9
+16
MOD
SAVE
CON
24
+7
+14
CHA
18
+4
+4

Skills Perception +16, Arcana +9

Senses blindsight 120 ft., darkvision 120 ft.; Passive Perception 26

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The hymn leviathan can breathe air and water.

Brine-Silenced Recess. While the hymn leviathan is submerged, it has Advantage on Dexterity (Stealth) checks, and each creature that starts its turn within the leviathan's space takes 19 (3d12) Thunder damage.

Legendary Resistance (3/Day). If the hymn leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The hymn leviathan makes three attacks, using Coil or Pressure Wail in any combination. It can replace one attack with a use of (A) Gravewake (Recharge 5-6) or (B) Spellcasting to cast Thunderwave.

Coil. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Pressure Wail. Ranged Attack Roll: +16, range 60 ft. 31 (5d8 + 9) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each enemy in a 30-foot Emanation originating from the hymn leviathan. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Spellcasting. The hymn leviathan casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 24):

- At Will: Thunderwave, Fog Cloud, Fear, Slow

Gravewake. Strength Saving Throw: DC 24, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 18 (4d8) Thunder damage, and the target is pulled up to 30 feet straight toward the hymn leviathan, and the target has the Prone condition. Success: Half damage only.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the hymn leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Coil Crush. The hymn leviathan makes one Coil attack.

Soundless Sink. The hymn leviathan moves up to half its Speed without provoking Opportunity Attacks.

Numbing Hymn. Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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

### Trace
```
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] caster-binder (controller) type=Monstrosity mechanics=none — casts: on the GM's own words "a leviathan of the trench whose song dro" | hold_shape: medium on the GM's own words "a leviathan of the trench whose song dro" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("a leviathan of the trench whose song dro") | caster-binder: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a leviathan of the trench whose song dro…" is the description, not a name
[concept] resolve: archetype=caster type=Monstrosity typeFrom=the route call themes=aquatic/voice mind=sapient style=binder energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a song that drowns fleets [behavior] | brine-soaked hide of the trench [body] | the crushing wake of its coils [behavior]
[concept] identity: A Gargantuan leviathan of brine-soaked hide and trench-dark pressure, it opens a fight by sounding a subsonic hymn that staggers crews and drags whole vessels down in its wake. Every round it sustains that song, layering numbing calls that steal reactions, drown senses, and leave prey standing slack while its coils and crushing bulk finish them. Under pressure it does not flee — it withdraws into the dark and sings louder, patient and deliberate, toying with fleets until the sea itself seems to answer it.
[concept] lore: It was born in the lightless trenches where ships sink and never rot, and it sings only to hear how many hulls still answer its call — each one a note in a hymn it is still composing.
[reskin] mind tier held: WIS stays 28 against "formidable" — WIS is the attacking score
[reskin] mind tier held: CHA stays 18 against "formidable" — the card's 18 is already formidable
[reskin] mind tier: INT 18 -> 15 — the call read this creature as capable at CR 24
[reskin] donor: caster-17-binder -> CR 24
[reskin] seats: action <- "a song that drowns fleets" | trait <- "brine-soaked hide of the trench"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the hymn leviathan" — the call's own answer (kind), built from the name
[reskin] inline form: "the hymn leviathan" — the model's own reading of the name
[reskin] spell DC coherence: DC 23 -> 24 off Wisdom 28 (the stat makes the attack rolls)
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + Wisdom's 9) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "a leviathan of the trench whose song drowns fleets" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "a leviathan of the trench whose song drowns fleets" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical) [asked: at_will/at_will/save_area] [askMechanic: dazzle]
[reskin] open asks handed to the idea call: "a leviathan of the trench whose song drowns fleets" [dazzle]
[reskin] idea anchored: action — "The leviathan's coils grind the seabed into a crushing wake that drags" answers the GM's "a leviathan of the trench whose song drowns fleets"
[reskin] idea unanchored: trait — "The leviathan's hide is soaked in trench brine that deadens sound. Whi" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 27 of 27 answered; not true of this body: seal, snare-bolt, drain, zone-seed, rally, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, blurred-form, life-drain
[reskin] menu: taste stands down — action answers the GM's "a leviathan of the trench whose song drowns fleets", so role and style do not filter the menu (legality still does); 15 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The leviathan's coils grind the seabed into a crushing wake that drags with it. Each creature in a line along the leviathan's movement must succeed on a Strength saving throw or be knocked Prone and pulled along with it, taking Thunder damage as the displaced water hammers it." [action/always/movement] [family: drag] — menu: lure, pacify, escalating-dread, slow-bolt, sensory-strike, herd, curse-debt, reveal, execute, throw-retrieve, pull-through, terror-pulse, disarm, push-prone, exploiter (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, patient-defense, second-wind, focus, feint-slip, snap-shot, riposte, answering-strike, bolt-restrain, bolt-drag, bolt-mark, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: throw-retrieve (always/damage), slow-bolt (save/movement), pull-through (save/movement)
[reskin] keys would have bound: action — lure, pull-through (song, drown)
[reskin] classification handed to the fit call: shape=save_area when=at_will often=at_will
[reskin] word match declined by the call: pull-through, bolt-drag, lure, disarm — the key word does not mean the mechanic here
[reskin] closest refused: action — "push-prone" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a line-area save that knocks targets Prone and pulls them along with t)
[reskin] authored row answers the GM: action — "Gravewake" was written for "a leviathan of the trench whose song drowns fleets", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a line-area save that knocks targets Prone and pulls them along with t") and wrote an action instead: "Gravewake" -> Actions. *Strength Saving Throw*: DC 24, each creature in a 60-foot Line. *Failure:* 52 (15d6) Thunder damage, and the target is 
[reskin] authored row numbers: "Gravewake" — the call declared (unanswered) number(s) promised
[reskin] value check: "Gravewake" EV 100.7 vs floor 19.8 (one attack of 3) — dice 52 → 38 (scaled down to the ceiling); a nova already stands — kept ungated, dice to 38 at the ceiling
[reskin] signature authored: no template — the seat wrote it -> Actions/"Gravewake" ("The leviathan's coils grind the seabed into a crushing wake that drags with it. Each creature in a line along the leviathan's movement must succeed on a Strengt [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The leviathan's hide is soaked in trench brine that deadens sound. While it is submerged, it has advantage on Dexterity (Stealth) checks, and any creature that starts its turn within its space hears the hymn as a pressure in its skull, taking Thunder damage." [trait/always/damage] [family: zone] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] lead by this seat's own clause: trait — "dazzle" from the clause this seat serves, not the sheet's "none"
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/damage): blood-frenzy, pack-tactics, assassinate; the declared data is the warrant and the call is worth making
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] classification handed to the fit call: shape=save_area when=at_will often=at_will
[reskin] word match declined by the call: blood-frenzy, pack-tactics, assassinate, fear-aura, truth-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:damage" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an aura that damages creatures starting their turn in the leviathan's )
[reskin] seat answered, but: the call said "The leviathan's hide is soaked in trench brine that deadens sound. While it is submerged, it has advantage on Dexterity " is carried by "Brine-Silenced Recess", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("an aura that damages creatures starting their turn in the leviathan's ") and wrote a trait instead: "Brine-Silenced Recess" -> Traits. While the hymn leviathan is submerged, it has Advantage on Dexterity (Stealth) checks, and each creature that starts its
[reskin] authored row numbers: "Brine-Silenced Recess" — the call declared 1 number(s) promised
[reskin] free signature row: "Brine-Silenced Recess" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Brine-Silenced Recess" ("The leviathan's hide is soaked in trench brine that deadens sound. While it is submerged, it has advantage on Dexterity (Stealth) checks, and any creature that  [authored: the catalog held no shape for it]")
[reskin] weapons answered: Coil = none; Pressure Wail = none; Drowning Hymn = none; Refrain of Stillness = none; Coil Crush = none; Soundless Sink = none; Numbing Hymn = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the caster-17-binder's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Coil" reach 5 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] area swap gated: "Gravewake (Recharge 5-6)" deals 38 to an area in place of a 36 attack — print offers no at-will area swap that out-damages the attack it replaces (0 of its 24), so it takes print's Recharge
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Gravewake (Recharge 5-6) or (B) Spellcasting to cast *Thunderwave*.
[reskin] free-row budget by card size: CR 24 sits in band 21+, where print runs 8-10 rows (p20-p90, Multiattack excluded); this card already carries 11 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Brine-Silenced Recess" [no template]
[reskin] one nova at ship: "Gravewake (Recharge 5-6)" un-gated to "Gravewake" — "Drowning Hymn" already carries this sheet's Recharge nova (un-gated by the one-nova rule — dice to 38, at or under the Multiattack sum (74); the action economy is the limit)
[reskin] area swap priced at half a hit: "Gravewake" is offered in an attack's place AT WILL and dealt 38 against a whole hit of 36; the ceiling is half a hit (18) with a save for half — print offers 15 area rows in an attack's place and none deals damage (owner's R1)
[reskin] ask vs row ok: "a leviathan of the trench whose song drowns fleets" -> "Gravewake" — trigger at_will, limit at_will
[reskin] save re-derived after a retype: Actions/Drowning Hymn — a Wisdom save for a condition the row IMPOSES, which calls for Constitution or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint fixed: line-dimensions — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Brine-Silenced Recess" claims "brine-soaked hide of the trench" but the audit judged that nothing in the row carries it; the name carries "brine" and may not advertise what the rules do not do — flagged decoration for the rename pass
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Brine-Silenced Recess")
audit finding below confidence gate: Multiattack The nested (A)/(B) lettered alternatives inside a replacement clause are a branching decision the GM must parse mid-turn, and the parenthetical Recharge marker is engine-appended text embedded inside authored prose rather than a trailing format token.
[reskin] audit: [Brine-Silenced Recess: The aura is keyed to the le…eviathan's space takes 19 (3d12) Thunder damage"), Brine-Silenced Recess: The name promises brine tha… it has Advantage on Dexterity (Stealth) checks"), Gravewake: The row was written to deliver 'a levia…viathan, and the target has the Prone condition"), Gravewake: The name promises a wake — the disturba…ch creature in a 60-foot-long, 5-foot-wide Line")]
[reskin] audit rename held — "Gravewake" was written for the GM's own clause (cl_1h1f3n8: "a leviathan of the trench whose song drowns fleets"), so "Trench Pull" does not land; the finding stands as logged
[reskin] audit defect: Traits/"Brine-Silenced Recess" [model-written] high untrackable — The aura is keyed to the leviathan's own space, which for a Gargantuan creature is a footprint the table must track and which shrinks to nothing the moment the leviathan moves on or a target is shoved out, so there is no defined area a creature can be evaluated against at the start of its turn. — Give the damage aura a stated emanation radius originating from the leviathan rather than referencing its occupied space. (about: "each creature that starts its turn within the leviathan's space takes 19 (3d12) Thunder damage")
[reskin] audit defect: Traits/"Brine-Silenced Recess" [model-written] medium misnamed — The name promises brine that silences or suppresses sound, but the rules grant Stealth Advantage and Thunder damage — neither of which is brine, salt, or muting; the brine-soaked hide is nowhere in the text. — Rewrite the trait so its rules express a brine/salt feature (e.g., conditions or damage tied to brine) rather than plain Stealth Advantage. (about: "While the hymn leviathan is submerged, it has Advantage on Dexterity (Stealth) checks")
[reskin] audit defect: Actions/"Gravewake" [model-written] medium undelivered — The row was written to deliver 'a leviathan of the trench whose song drowns fleets', but its payload is a 60-foot line pulling targets 30 feet toward the creature and knocking them Prone — it drags a handful of creatures across open ground rather than drowning, sinking, or engulfing anything, so the fleet-drowning ask is undelivered. — Rework the signature action so its effect expresses drowning/submersion (e.g., targets drawn into the water and held under) rather than a line pull plus Prone. (about: "the target is pulled up to 30 feet straight toward the hymn leviathan, and the target has the Prone condition")
[reskin] clause unresolved: "Brine-Silenced Recess" carries "The leviathan's hide is soaked in trench brine that dead", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] size floor: STR 18 -> 25 — print prints no corporeal Gargantuan body under 25 (the Dragon Turtle); the attack follows it, as print's own 49 do
[reskin] done: "Trench Hymn Leviathan" — donor caster-17-binder, CR 24
[harness] recorded 11 model call(s)
```

---

## 21. Owlbear — CR 3

**Input:** `name: Owlbear | `
**Donor:** brute-2 -> CR 3
**Signature:** dropped · **elapsed** 13s

### Block
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
+5
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

Skills Perception +5

Senses darkvision 60 ft.; Passive Perception 15

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

### Trace
```
[concept] thin but a print creature — keeping route-first: Owlbear
[path] exact — Owlbear (is) — "Owlbear" (code)
[route] brute type=Monstrosity mechanics=grapple — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but offered no quote | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: grapple
[concept] signature elements: screaming owl-bear hybrid body with hooked beak and crushing forelimbs [body] | grabbing and pinning prey under its weight [behavior] | furious, unrelenting bestial aggression [behavior]
[concept] identity: The owlbear crashes into the fight in a screaming half-lope, half-flight, raking with its hooked beak before pinning prey under its crushing forelimbs; there is no feint and no cleverness, only relentless forward pressure. Round after round it hooks with the beak and bears down with its crushing arms, shrugging off blows on its matted hide. It does not flee and does not strategize — wounded, it only grows more furious and more committed, fighting until one side stops moving.
[concept] lore: A wizard's crossbred guardian gone feral, the owlbear's only want is meat and territory, and it defends both without hesitation against anything that crosses its path.
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] seats: action <- "grabbing and pinning prey under its weight" | trait <- "screaming owl-bear hybrid body with hooked beak and crushing forelimbs"
[reskin] [path] decides: exact on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] class kit: none — the exact path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 15 (8 + PB 2 + the sheet's best 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The owlbear hooks a clawed forelimb into its prey and bears it down — " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The owlbear is relentless: while it is wounded, it screams and surges " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, life-drain
[reskin] weapons answered: Beak = none; Crushing Hug = none
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] print canon type: the call answered type_source=user for monstrosity, but the GM's words do not name it — the Owlbear's own type stands
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Beak" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon saves: proficient in nothing — the Owlbear's own set, at this sheet's stats and PB 2 (changed STR)
[reskin] print canon skills: "Athletics +7, Perception +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] lint: 0 findings
[reskin] audit: nothing flagged
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path exact
[reskin] done: "Owlbear" — donor brute-2, CR 3
[harness] recorded 5 model call(s)
```

---

## 22. Goblin Boss — CR auto

**Input:** `name: Goblin Boss | `
**Donor:** defender-1 -> CR 1
**Signature:** dropped · **elapsed** 19s

### Block
```
Goblin Boss
Small humanoid, chaotic neutral
Armor Class

17 (chain shirt, shield)

Hit Points: 

21 (6d6)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

15 (+2)

	

10 (+0)

	

10 (+0)

	

8 (-1)

	

10 (+0)

Skills: 

Stealth +6

Senses: 

darkvision 60 ft., passive Perception 9

Languages: 

Common, Goblin

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Nimble Escape (Bonus Action).The goblin boss takes the Disengage or Hide action.
Redirect Attack (Reaction).When a creature the goblin boss can see makes an attack roll against it, the goblin boss chooses a Small or Medium ally within 5 feet of itself. The goblin boss and that ally swap places, and the ally becomes the target of the attack instead.

Actions
Multiattack: The goblin boss makes two attacks, using Scimitar or Shortbow.
Scimitar: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage plus 2 (1d4) slashing damage if the attack roll had advantage.
Shortbow: Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.
```

### Trace
```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:1732:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:663:5)
!! [ENRICHMENT] Failed to enrich Owlbear: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:1732:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:663:5)
[concept] thin but a print creature — keeping route-first: Goblin Boss
[path] exact — Goblin Boss (is) — "Goblin Boss" (code)
[route] defender-leader type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("Goblin Boss") | defender-leader: no line key in the words — the model's read of its quote
[concept] cr from print: 1 — a print creature heads the words and the user set none
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=voice/bestial mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Goblin Boss"
[concept] mechanics: none claimed
[concept] signature elements: shrieking commands that drive the rabble [behavior] | scrap-hide and hammered tin armor [body] | cowardly retreat behind lesser goblins [behavior]
[concept] identity: A scrawny goblin wrapped in mismatched scrap-hide and hammered tin, it kicks its rabble forward with a shriek and points where to hit; it fights from just behind the line, snapping at ankles and jeering once a foe is surrounded. Every round it jeers louder, threatening and goading its own troops into a frenzy while keeping its own hide behind whatever bodies are to hand. When bloodied it squeals for a retreat, shoving a lesser goblin between itself and the enemy.
[concept] lore: A goblin chief holds its rank by being the loudest and the least likely to die, hoarding stolen trinkets in a midden-cave and spending its followers' lives to keep them.
[reskin] 2014 exact: "Goblin Boss" is not in the SRD 5.1 corpus — the 5.2 block converts as before
[reskin] print canon route: "Goblin Boss" is the Goblin Boss — the leader seat stands down for the plain line
[reskin] print canon defenses: HP 26 -> 21, AC 15 -> 17 — the Goblin Boss's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 17 (chain shirt, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 10, DEX 15, CON 10, INT 10, WIS 8, CHA 10 — the Goblin Boss's at its own CR; attack +3 -> +4, DC 12 (print's)
[reskin] donor: defender-1 -> CR 1
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "shrieking commands that drive the rabble" | trait <- "scrap-hide and hammered tin armor"
[reskin] [path] decides: exact on the Goblin Boss (the matcher agrees)
[reskin] print canon: "Goblin Boss" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] class kit: none — the exact path takes no class kit
[reskin] inline by rule: "the goblin boss" — the call answered "the goblin boss" (kind), which the name does not support
[reskin] inline form: "the goblin boss" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 12 (8 + PB 2 + the sheet's best 2) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Goblin Boss" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The Goblin Boss hurls a shrieking command at one goblin within earshot" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "While at least one other goblin is within reach of the Goblin Boss and" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 26 of 26 answered; not true of this body: seal, shield-bash, active-toll, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] weapons answered: Rusty Shiv = dagger
[reskin] weapon declared: "Rusty Shiv" is a dagger — the call's own answer
[reskin] weapon dice keep the budget's die: "Rusty Shiv" is a dagger (d4), but 4d4 passes print's largest d4 attack row (3d4) — "11 (2d8 + 2)" stands
[reskin] print canon speed: modes walk only — the Goblin Boss's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Boss's
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Goblin Boss's own type stands
[reskin] print canon type: Humanoid stays — the Goblin Boss is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon alignment: Neutral Evil -> Chaotic Neutral — the Goblin Boss's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon row: Actions/Shortbow — the Goblin Boss's own ranged row, added (the chassis carried none to rename)
[reskin] print canon attack: "Rusty Shiv" -> "Scimitar" — the Goblin Boss's own row
[reskin] print canon multiattack: "the goblin boss makes two attacks, using Scimitar or Shortbow in any combination." — the Goblin Boss's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] print canon attack: "Shortbow" is print's own row — +4, 5 (1d6 + 2), range 80/320 ft. (an exact body at print's CR)
[reskin] print canon saves: proficient in nothing — the Goblin Boss's own set, at this sheet's stats and PB 2 (changed CON)
[reskin] print canon skills: "Athletics +2, Perception +1" -> "Stealth +6" — the Goblin Boss's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Boss's own
[reskin] print canon row: Reactions/Redirect Attack — the Goblin Boss's own
[reskin] lint: 0 findings
[reskin] audit: nothing flagged
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path exact
[reskin] done: "Goblin Boss" — donor defender-1, CR 1
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 8 model call(s)
```

---

## 23. Vashka the Red — CR 6

**Input:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`
**Donor:** defender-5 -> CR 6
**Signature:** dropped · **elapsed** 35s

### Block
```
Vashka the Red

Medium Humanoid, Lawful Evil

AC 19
Initiative +1 (11)

HP 93 (17d8 + 17)

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
12
+1
+1
WIS
10
+0
+0
MOD
SAVE
CON
12
+1
+4
CHA
9
-1
-1

Skills Athletics +7, Perception +3

Senses Passive Perception 13

Languages Common, Goblin

CR 6 (XP 2,300; PB +3)

Traits

Never Breaks Ranks. While an ally is within 5 feet of Vashka, Vashka can't be forced to leave his space against his will, and he has Advantage on saving throws against being moved or made to flee.

Pack Tactics. Vashka has Advantage on an attack roll against a creature if at least one of Vashka's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. Vashka makes two attacks, using Longsword or Longbow in any combination.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Longbow. Ranged Attack Roll: +7, range 150/600 ft. 21 (5d6 + 4) Piercing damage.

Reactions

Hold the Wall. Trigger: A creature enters Vashka's space or an ally's space within his reach, or tries to move through him. Response—Strength Saving Throw: DC 15, the triggering creature. Failure: The target is pushed up to 5 feet straight away from Vashka. Success: The creature can enter the space, though Vashka's own space still counts as difficult terrain while he stands.

Riposte. Trigger: A creature within 5 feet of Vashka misses it with a melee attack roll. Response: Vashka makes one Longsword attack against that creature.

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

### Trace
```
[path] filled: the head clause names the Hobgoblin Warrior, a people — a fighter who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] class_npc — Hobgoblin Warrior (is) — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] name: "Vashka the Red" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: none claimed
[concept] signature elements: lacquered plate shield wall [object] | never breaks ranks [behavior] | punishes anyone who slips past the line [behavior]
[concept] identity: Vashka the Red opens by anchoring a lacquered shield wall and letting the enemy come to him, his plate turning aside the first blows while he reads the line for the weakest point. Every round after that he holds formation as a living lock — shoulder to shield, punishing any foe who tries to slip past or flank by driving them back with a brutal, disciplined strike. Under pressure he does not flee; he tightens the wall, gives ground only by inches, and fights to the death rather than break ranks.
[concept] lore: Vashka the Red was forged by a hobgoblin legion that makes soldiers into warlords, and he wants nothing more than to hold one perfect line until every enemy that tested it is dead at its foot.
[reskin] the concept outranks the alias: the Hobgoblin Warrior is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 18, DEX 12, CON 12, INT 10, WIS 10, CHA 9 — the Hobgoblin Warrior's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "never breaks ranks" | trait <- "lacquered plate shield wall"
[reskin] [path] decides: class_npc on the Hobgoblin Warrior · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." heads on the Hobgoblin Warrior — print's rows ride along; the seat stays
[reskin] class kit: guarded-stance yields — AC 19 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "warlord": Riposte (riposte)
[reskin] proper noun: "Vashka the Red" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vashka" — the call's own answer (person), built from the name
[reskin] inline form: "Vashka" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) [asked: attack] [askMechanic: command] | "never breaks ranks" -> has (mechanical) [asked: movement] [askMechanic: zone]
[reskin] open asks handed to the idea call: "fights from a shield wall" [command] · "never breaks ranks" [zone] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "When Vashka hits a creature with War Pick, he slams his shield into it" answers the GM's "never breaks ranks"
[reskin] idea unanchored: trait — "Vashka fights shoulder-to-shoulder and behind his shield: any creature" names none of the 2 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 27 of 27 answered; not true of this body: seal, active-toll, random-ray, shell-withdraw, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "never breaks ranks", so role and style do not filter the menu (legality still does); 10 template(s) offered
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When Vashka hits a creature with War Pick, he slams his shield into it in the same motion; the target must succeed on a Strength saving throw or be pushed back out of the wall's reach and knocked Prone. A creature Vashka pushes this way cannot move closer to him until the end of its next turn — the wall does not let the line be crossed." [rider/on_hit/condition] [family: sentinel] — menu: stunning-strike, charge-push, affliction, contagion, pounce, isolation, bolt-restrain, bolt-drag, bolt-mark, charge (+ shelf: throw-retrieve, shield-bash, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, thrown-burst, execute, lure, pacify, escalating-dread, sensory-strike, thrown-burst-seed, delayed-brand, patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, rally, rampage, focus, feint-slip)
[reskin] lead by this seat's own clause: action — "zone" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), affliction (on_hit/condition), contagion (on_hit/condition)
[reskin] keys would have bound: action — rally (shield)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: push-prone, pounce, charge-push, stunning-strike, affliction, contagion — the key word does not mean the mechanic here
[reskin] closest refused: action — "charge-push" was named nearest, but the call declined it for collision ("collision") — the word suggests this mechanic and the row does not carry it; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: pushes the target out of its own Multiattack reach and forbids it clos)
[reskin] decline reason: action — the call answered none and names it "collision" — the GM's words key rally, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: action — "rally" is keyed by the GM's shield and was on the call's menu, which the call read as no fit; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: action — "When Vashka hits a creature with War Pick, he slams his shield into it in the same motion; the target must succeed on a Strength saving throw or be pushed back out of the wall's reach and knocked Prone. A creature Vashka pushes this way cannot move closer to him until the end of its next turn — the wall does not let the line be crossed." [rider/on_hit/condition] — the model found no template that holds it (offered: stunning-strike, affliction, contagion, pounce, bolt-restrain, bolt-mark, charge-push, isolation, bolt-drag, charge, push-prone, thrown-burst, execute, thrown-burst-seed)
[reskin] fallback respects the call: rally, push-prone left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Hobgoblin Warrior's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Vashka fights shoulder-to-shoulder and behind his shield: any creature that enters the space of Vashka or an ally within his reach, or tries to move through him, must succeed on a Strength saving throw or be stopped and immediately driven back, and Vashka's own space counts as difficult terrain while he is standing. The wall cannot be slipped past or flanked — enemies must break it or be broken on" [trait/always/movement] [family: zone] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura
[reskin] lead by this seat's own clause: trait — "command" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: pack-tactics (always/damage), relentless-pursuit (always/movement), bound (always/movement)
[reskin] keys would have bound: trait — pack-tactics (shield wall, ranks, never breaks ranks)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: relentless-pursuit, bound, composed:zone:terrain, pack-tactics — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: stops creatures entering or passing through his space and drives them )
[reskin] seat answered, but: the call said "any creature that enters the space of Vashka or an ally within his reach, or tries to move through him, must succeed on " is carried by "Shield Wall", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Vashka fights shoulder-to-shoulder and behind his shield: any creature" and wrote no row of that kind (refused: "Shield Wall" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Shield Wall" — a trait is not a save — the save form takes stat, target and effect as fields and the engine r); asking once more with the reason
[reskin] seat answered, but: the call said "any creature that enters the space of Vashka or an ally within his reach, or tries to move through him, must succeed on " is carried by "Hold the Wall", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("stops creatures entering or passing through his space and drives them ") and wrote a trait instead: "Hold the Wall" -> Reactions. *Trigger:* A creature enters Vashka's space or an ally's space within his reach, or tries to move through him. *Response
[reskin] authored row numbers: "Hold the Wall" — the call declared 1 number(s) promised
[reskin] seat landed on the second try: trait — "Hold the Wall" after ""Shield Wall" — a trait is not a save — the save form takes stat, target and eff"
[reskin] free signature row: "Hold the Wall" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Hold the Wall" is HANDED "fights from a shield wall" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Hold the Wall" ("Vashka fights shoulder-to-shoulder and behind his shield: any creature that enters the space of Vashka or an ally within his reach, or tries to move through him [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Never Breaks Ranks" — the call reads its condition as none, so no condition is recorded against it
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: War Pick = war pick; Handaxe = handaxe
[reskin] weapon dice follow the weapon: "Handaxe" is a handaxe (d6) — "22 (4d8 + 4)" becomes "21 (5d6 + 4)", print's rule of keeping the die and scaling the count
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Goblin — the concept names the species; print's NPCs of it speak it
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Hobgoblin Warrior's own type stands
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the Hobgoblin Warrior is the class's BODY on this path, not this creature's kind (print's own NPC blocks are all Humanoid)
[reskin] print canon attack: "War Pick" -> "Longsword" — the Hobgoblin Warrior's own row
[reskin] print canon attack: "Handaxe" -> "Longbow" — the Hobgoblin Warrior's own ranged row
[reskin] print canon trait: Pack Tactics — "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." is the Hobgoblin Warrior (print's own row)
[reskin] class weapon: "longsword" and "longbow" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Hold the Wall" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Hold the Wall carries "lacquered plate shield wall" — "Vashka's own space still counts as difficult terrain while he stands."
[reskin] audit: [Hold the Wall: The trigger has no defined scope — …phrasing. (about: "or tries to move through him"), Never Breaks Ranks: Being 'moved' is imposed by ef…ving throws against being moved or made to flee"), Hold the Wall: The reaction's entire payload is a … pushed up to 5 feet straight away from Vashka."), Riposte: Pronoun inconsistency — Vashka is referre…et of Vashka misses it with a melee attack roll")]
[reskin] audit defect: Reactions/"Hold the Wall" [model-written] medium untrackable — The trigger has no defined scope — 'tries to move through him' is not tied to a range, movement mode, or action the GM can observe at the table, so it cannot be reliably recognized mid-turn. — Define the trigger in terms of a concrete, observable event (a creature entering his space or an ally's space within reach) and drop the open phrasing. (about: "or tries to move through him")
[reskin] audit defect: Traits/"Never Breaks Ranks" [model-written] medium dead_reference — Being 'moved' is imposed by effects with no saving throw (forced movement is not a save), so this half of the trait describes a defense against something that never calls for the save it grants; the 'made to flee' clause references no condition or state the block defines. — Rework the trait around effects that actually offer a save (frightened, charmed-into-fleeing) or state explicitly how Advantage applies to forced movement. (about: "he has Advantage on saving throws against being moved or made to flee")
[reskin] audit defect: Reactions/"Hold the Wall" [model-written] medium weak — The reaction's entire payload is a 5-foot push with no damage and no condition, and on a Success the creature enters anyway, so the row costs a reaction to accomplish almost nothing the fiction of a shield wall promises. — Give the failed save a consequence worth the reaction slot — a condition or damage that reflects the wall holding. (about: "The target is pushed up to 5 feet straight away from Vashka.")
[reskin] audit defect: Reactions/"Riposte" [catalog] high wording — Pronoun inconsistency — Vashka is referred to as 'it' within his own statblock after the trait uses 'his,' which misidentifies the referent and reads as a different creature. — Change 'misses it' to 'misses him' for consistent self-reference. (about: "a creature within 5 feet of Vashka misses it with a melee attack roll")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_zvh3r1
[reskin] [gap] pushes the target out of its own Multiattack reach and forbids it closing the line again — "When Vashka hits a creature with War Pick, he slams his shield into it in the same motion; the target must succeed on a Strength saving throw or be pushed back out of the wall's reach and knocked Prone. A creature Vashka pushes this way cannot move closer to him until the end of its next turn — the wall does not let the line be crossed." — Vashka the Red [seat: action [rider/on_hit/condition]] (closest offered: charge-push) [effect: movement] [menu: stunning-strike affliction contagion pounce bolt-restrain bolt-mark charge-push isolation bolt-drag charge push-prone thrown-burst execute thrown-burst-seed] [same-cell unoffered: life-drain snatch] [same-seat rejected: hook-rider:body-verdict life-drain:body-verdict snatch:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Vashka the Red" — donor defender-5, CR 6
[harness] recorded 12 model call(s)
```

---

## 24. Merebone Harvester — CR 9

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`
**Donor:** brute-8-grappler -> CR 9
**Signature:** library · **elapsed** 34s

### Block
```
Merebone Harvester

Large Monstrosity, Unaligned

AC 15
Initiative -1 (9)

HP 161 (19d10 + 57)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
+8
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
15
+2
+2
MOD
SAVE
CON
17
+3
+7
CHA
10
+0
+0

Skills Athletics +8, Perception +6

Immunities Acid

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 9 (XP 5,000; PB +4)

Traits

Seeping Crust. A creature strikes the harvester with a melee attack, the shell cracks open and sprays the attacker; it must succeed on a DC 15 Dexterity saving throw or have the Poisoned condition until the end of its next turn.

Actions

Multiattack. The harvester makes two attacks, using Spitting Maw or Carving Flurry in any combination. It can replace one attack with a use of Scythe-Fling.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Scythe-Fling. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a creature, it is subjected to the following effect. Dexterity Saving Throw: DC 15. Failure: The target has the Prone condition.

Creeping Dread. Wisdom Saving Throw: DC 15, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the harvester's next turn. If the target was already Frightened by this ability, it also takes 28 (8d6) Acid damage.

Carving Flurry. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Slashing damage.

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

### Trace
```
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf, breath — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "pinning prey with two arms" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("pinning prey with two arms and carving w") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=venomous/grasping mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf, breath
[concept] signature elements: pinning prey with two arms while carving with the others [behavior] | acid-shedding shell [body] | four scythe-arms [body]
[concept] identity: This horror opens by lunging to pin prey under two scythe-arms, then carves with the remaining pair while its maw spits acid at anything it cannot reach. Each round it holds and repositions its victim, and when its shell is struck it sheds a spray of acid that punishes anyone who crowds it. It never flees — it fights to the death and ignores pain until its body stops moving.
[concept] lore: Hatched in a shallow acid mere from a clutch of shelled eggs, it hunts to feed a hunger that never dulls and drags its kills back to the reeking shore where it bloats among the bones of earlier prey.
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 9
[reskin] mind tier: CHA 6 -> 10 — the call read this creature as ordinary at CR 9
[reskin] donor: brute-8-grappler -> CR 9
[reskin] seats: action <- "pinning prey with two arms while carving with the others" | trait <- "acid-shedding shell"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Engulf — the body's own verb
[reskin] named parts: Spitting Maw (slot, Grappled) — the user's words, the engine's numbers
[reskin] energy rides the named weapon: "Spitting Maw" is a Piercing, so the blow stays Piercing and Acid rides it rather than folding into the blow (print: 11 of 53 weapon rows carry an energy rider)
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the harvester" — the call's own answer (kind), built from the name
[reskin] inline form: "the harvester" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral Evil" -> Unaligned — a Monstrosity the call reads as bestial at INT 4 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "It has four scythe-arms" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "a spitting maw" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "a shell that sheds acid" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "It fights by pinning prey with two arms" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: trigger "at_will" stands on "carving with the others" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "carving with the others" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: on_hit/at_will/attack] [askMechanic: grapple] | "a spitting maw" -> has (mechanical) [asked: at_will/at_will/save_single] [askMechanic: burst] | "a shell that sheds acid" -> has (mechanical) [asked: on_being_hit/at_will/save_area] [askMechanic: retaliate] | "It fights by pinning prey with two arms" -> has (mechanical) [asked: on_hit/at_will/attack] [askMechanic: grapple] | "carving with the others" -> has (mechanical) [asked: at_will/at_will/attack]
[reskin] open asks handed to the idea call: "It has four scythe-arms" [grapple] · "a shell that sheds acid" [retaliate] · "It fights by pinning prey with two arms" [grapple] · "carving with the others"
[reskin] idea anchored: action — "When the harvester hits a creature it is already grappling with a Spit" answers the GM's "It fights by pinning prey with two arms"
[reskin] idea unanchored: trait — "The harvester's shell is a seeping acid crust. When a creature strikes" names none of the 4 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 32 answered; not true of this body: heated-body, adhesive, spider-climb, bloodied-burst, death-burst, resonant-body, energy-aura, noxious-aura, gaze-aura, false-appearance, active-toll, random-ray, herd, drain, rally, marking-light, sealed-body, relic-object, warded-mending, mimicry, kill-denial, life-drain, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, shield-bash
[reskin] engulf engine withheld: Bonus Actions/"Engulf" leaves — the route call read this creature's hold as grip, not contain; the grapple stands and citations of the row are swept
[reskin] menu: taste stands down — action answers the GM's "It fights by pinning prey with two arms", so role and style do not filter the menu (legality still does); 7 template(s) offered
[reskin] menu pruned: action — push-prone, exploiter (the sheet cannot render them)
[reskin] signature idea (action): "When the harvester hits a creature it is already grappling with a Spitting Maw attack, it wrenches the pinned foe across its own scythe-arms and slams it into another creature within reach of the harvester. The second creature must succeed on a Dexterity saving throw or take the attack's damage and have the Prone condition, as the hauled victim is driven through it." [rider/on_hit/damage] [family: drag] — menu: affliction, contagion, stunning-strike, charge-push, pounce, isolation, charge (+ shelf: leap, condition-payoff, ground-burst, spew, escalating-dread, terror-pulse, thrown-burst-seed, wind-up, trample, thrown-burst, execute, lure, pull-through, pacify, snare-bolt, slow-bolt, sensory-strike, disarm, delayed-brand, curse-debt, reveal, shell-withdraw, second-wind, aggro-curse, self-invisibility, focus, coating, rampage, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does damage; leading: isolation (on_hit/damage), charge (on_hit/damage), affliction (on_hit/condition)
[reskin] keys would have bound: action — spew, escalating-dread, snare-bolt, sensory-strike, shell-withdraw (spits, horror, spit, shell)
[reskin] classification handed to the fit call: mechanic=grapple, engulf, breath shape=attack when=on_hit often=at_will
[reskin] word match declined by the call: charge, charge-push, pounce, affliction, contagion, stunning-strike, isolation — the key word does not mean the mechanic here
[reskin] closest refused: action — "condition-payoff" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a rider that, only when the attack hits a creature the harvester alrea)
[reskin] strike written from its attack: "Scythe-Fling" clones "Spitting Maw" and adds a Dexterity save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] value check: "Scythe-Fling" EV 4.4 vs floor 16.6 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Scythe-Fling" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Creeping Dread" EV 22 vs floor 16.6 (one attack of 2) — dice 16 → 32
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The harvester's shell is a seeping acid crust. When a creature strikes the harvester with a melee attack, the shell cracks open and sprays the attacker; it must succeed on a Dexterity saving throw or have the Poisoned condition until the end of its next turn." [trait/on_being_hit/condition] [family: body-reaction] — menu: weapon-lodge (+ shelf: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] lead by this seat's own clause: trait — "retaliate" from the clause this seat serves, not the sheet's "grapple"
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — retaliate: weapon-lodge
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: weapon-lodge (on_being_hit/resource), composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition)
[reskin] keys would have bound: trait — fear-aura (horror)
[reskin] classification handed to the fit call: mechanic=grapple, engulf, breath shape=attack when=on_hit often=at_will
[reskin] closest refused: trait — "composed:body-reaction:condition:t0:pois" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a Dexterity saving throw the attacker can pass to avoid the acid spray)
[reskin] seat answered, but: the call said "The harvester's shell is a seeping acid crust. When a creature strikes the harvester with a melee attack, the shell crac" is carried by "Seeping Crust", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a Dexterity saving throw the attacker can pass to avoid the acid spray") and wrote a trait instead: "Seeping Crust" -> Traits. A creature strikes the harvester with a melee attack, the shell cracks open and sprays the attacker; it must succeed on 
[reskin] authored row numbers: "Seeping Crust" — the call declared 1 number(s) promised
[reskin] free signature row: "Seeping Crust" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Seeping Crust" ("The harvester's shell is a seeping acid crust. When a creature strikes the harvester with a melee attack, the shell cracks open and sprays the attacker; it must [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "carving with the others"; one targeted call with the sheet as context
[reskin] repair answer: attacks 1, saves 0, traits 0, reactions 0, answered [], unplaced []
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Scythe-Arm = none; Acid Spit = none
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] element immunity: Acid — the call read this creature's energy as Acid and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Monstrosity -> Acid
[reskin] name-canon stands down: the path answered homebrew on "A Large insectile horror. It has four sc" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Scythe-Fling.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Seeping Crust" [no template]
[reskin] row binds its clause: "Creeping Dread" answers "A Large insectile horror" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "It has four scythe-arms" asked for on_hit/at_will and no row binds the clause
[reskin] ask vs row ok: "a spitting maw" -> "Spitting Maw" — trigger at_will, limit at_will
[reskin] asked but unanswered: "a shell that sheds acid" asked for on_being_hit/at_will and no row binds the clause
[reskin] ask vs row MISMATCH: "It fights by pinning prey with two arms" -> "Scythe-Fling" — trigger: asked on_hit, row reads at_will
[reskin] ask vs row ok: "carving with the others" -> "Carving Flurry" — trigger at_will, limit at_will
[reskin] save stat from print grammar: Actions/Scythe-Fling imposes Prone by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
audit finding below confidence gate: Multiattack Multiattack mentions only Spitting Maw and Carving Flurry, then allows replacing one attack with Scythe-Fling, so the GM has to juggle three named attacks plus a replacement exception each turn; the 'any combination' phrasing obscures what the default two attacks actually are.
[reskin] audit: [Spitting Maw: The GM's ask is that the creature pi…, it has the Grappled condition (escape DC 16)."), Scythe-Fling: The name promises a scythe-driven fl…leaves the target Prone. (about: "Scythe-Fling."), Seeping Crust: The trigger is ungrammatical and la… the shell cracks open and sprays the attacker;"), Creeping Dread: The extra-damage rider requires a …s ability, it also takes 32 (5d12) Acid damage."), Scythe-Fling: The clause endlessly reintroduces th…ature, it is subjected to the following effect.")]
[reskin] audit rename held — "Scythe-Fling" was written for the GM's own clause (cl_486qnn: "It fights by pinning prey with two arms"), so "Scythe Sweep" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Spitting Maw" [model-written] high undelivered — The GM's ask is that the creature pins prey with two arms, but the only grapple in the block comes from the maw/Spitting Maw, not from any arm attack, and Scythe-Fling's name promises pinning/flinging yet delivers only Prone. — Put the Grappled condition on an arm-based attack (Scythe-Fling or a dedicated pin) so the pinning fiction is actually delivered by the arms, or strip the pin claim from Scythe-Fling's name. (about: "If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).")
[reskin] audit defect: Traits/"Seeping Crust" [model-written] high wording — The trigger is ungrammatical and lacks a clear 'when' clause, reading as a statement of fact rather than a reaction trigger, so the GM cannot tell exactly when the save is rolled. — Rewrite the trigger as a clear reaction clause: 'When a creature hits the harvester with a melee attack, the shell cracks open...' with the save following. (about: "A creature strikes the harvester with a melee attack, the shell cracks open and sprays the attacker;")
[reskin] audit defect: Actions/"Creeping Dread" [catalog] medium other — The extra-damage rider requires a target to already be Frightened 'by this ability,' but nothing in the block can deliver that state on a prior turn except this same instantaneous save, which is hard to adjudicate and fails to make practical sense as a repeat-tagging setup. — Either drop the 'already Frightened by this ability' clause or replace it with a state created elsewhere in the block (e.g., targets Grappled by Spitting Maw). (about: "If the target was already Frightened by this ability, it also takes 32 (5d12) Acid damage.")
[reskin] audit defect: Actions/"Scythe-Fling" [model-written] medium wording — The clause endlessly reintroduces the same target ('If the target is a creature') after the attack already hit a creature, adding no information and wasting table-time. — Remove the redundant conditional and jump straight to the Dexterity saving throw. (about: "If the target is a creature, it is subjected to the following effect.")
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Creeping Dread) — the sameness metric
[reskin] clause unresolved: "Seeping Crust" carries "The harvester's shell is a seeping acid crust. When a cr", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] record completed: "Scythe-Fling" imposes Prone by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] single-target save capped: "Creeping Dread" 32 -> 28 — it targets "one creature", and print's hardest single-target save row at CR 9 is 29
[reskin] done: "Merebone Harvester" — donor brute-8-grappler, CR 9
[harness] recorded 12 model call(s)
```

---

## 25. Oathbound Bulwark — CR 11

**Input:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`
**Donor:** defender-7-warden -> CR 11
**Signature:** library · **elapsed** 32s

### Block
```
Oathbound Bulwark
Huge construct, lawful neutral
Armor Class

20 (natural armor)

Hit Points: 

168 (16d12 + 64)

Speed: 

20 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

18 (+4)

	

15 (+2)

	

20 (+5)

	

10 (+0)

Skills: 

Perception +9

Saving Throws: 

CON +8

Damage Immunities: 

poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

blindsight 60 ft. (blind beyond this radius), passive Perception 19

Languages: 

Common

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Ward Bond.The bulwark is magically bound to a ward of its choosing, and it can have only one ward at a time. While the bulwark is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the bulwark.
Regeneration.The bulwark regains 10 hit points at the start of each of its turns if it has at least 1 Hit Point.
Oathkeeper's Backhand (Reaction).When a hostile creature moves within 10 feet of the bulwark's ward while the bulwark is within 10 feet of that creature, the triggering creature must succeed on a DC 17 Strength saving throw or be knocked prone and pushed up to 10 feet straight away from the bulwark. A prone creature is not pushed.
Interpose (Reaction).When a creature within 5 feet of the bulwark that it guards is hit by an attack roll, the attack hits the bulwark instead, and the bulwark has Resistance to the attack's damage.

Actions
Multiattack: The bulwark makes two Fist attacks. It can replace one attack with a use of Iron Advance.
Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Iron Ward (2/Day): The bulwark targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the bulwark's next turn.
Iron Advance: Each creature in a 30-foot cone must make a DC 17 Strength saving throw. On a failed save, the target is pushed up to 15 feet away from the bulwark and is knocked prone.
```

### Trace
```
[path] homebrew — "a sentinel of black iron, AC 20, Huge, speed 20 feet" (call)
[route] defender-warden type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-warden: ✓ ("a sentinel of black iron") | defender-warden stands on the homebrew path: the call ranked it and quoted "a sentinel of black iron" — the key "sentinel" is the menu, not the decision (step 7) | defender-warden: no line key in the words — the model's read of its quote | asked_mechanic harden: quote not found
[concept] name: provided_name rejected — "a sentinel of black iron…" is the description, not a name
[concept] hints: warden→style ✓ ("sentinel of black iron bound to a charge")
[concept] resolve: archetype=defender type=Construct typeFrom=the route call themes=forged/grave mind=sapient style=warden energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: interposing warden's bulk [behavior] | black iron frame [body] | oath-bound guardianship [aura]
[concept] identity: A huge sentinel of black iron opens combat by planting itself between its charge and the enemy, forcing attackers to break through its interposed body before they can reach what it shields. Every round after that it fights as a moving wall — advancing into the nearest threat, shouldering it aside, and grinding it down with slow, relentless blows. It never chases a fleeing foe beyond a short, disciplined pursuit; its purpose is the charge, not the kill, and it fights to the death without panic or pause.
[concept] lore: Forged in a dead empire's smith-pits and bound by oath-iron to guard a tomb, a relic, or a bloodline, the black iron sentinel remains at its post long after the oath-makers crumbled to dust.
[reskin] mind tier: INT 7 -> 15 — the call read this creature as capable at CR 11
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 11
[reskin] mind tier: CHA 3 -> 10 — the call read this creature as ordinary at CR 11
[reskin] donor: defender-7-warden -> CR 11
[reskin] seats: action <- "interposing warden's bulk" | trait <- "black iron frame"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the bulwark" — the call's own answer (kind), built from the name; the rules would have said "Bulwark"
[reskin] inline on stamped rows: "Bulwark" -> "the bulwark" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "the bulwark" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "of black iron" names no absence — nothing in it takes anything away
[reskin] clauses: "a sentinel of black iron" -> has (descriptive), head | "AC 20" -> has (header) | "Huge" -> has (header) | "speed 20 feet" -> has (header)
[reskin] extraction: 1 of 4 model clauses quote nothing the user typed and leave the record ("AC 20")
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "As the bulwark grinds forward into an enemy, it lowers its shoulder an" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The bulwark will not abandon its post. While it remains closer to its " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: seal, shield-bash, active-toll, random-ray, herd, shell-withdraw, rally, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "As the bulwark grinds forward into an enemy, it lowers its shoulder and drives the foe back, not to kill but to clear its ground — the target must give way and be shoved from the sentinel's path or be knocked Prone beneath its advance. A creature that will not yield is flattened, and the bulwark steps over it." [action/save/condition] [family: sentinel] — menu: ground-burst, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, lure, pacify, escalating-dread, sensory-strike (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, ward-retaliation, riposte, answering-strike, interpose, stunning-strike, charge-push)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: terror-pulse (save/condition), push-prone (save/condition), reveal (save/condition)
[reskin] keys would have bound: action — ward-retaliation (sentinel)
[reskin] word match declined by the call: terror-pulse, lure, pacify, escalating-dread, sensory-strike — the key word does not mean the mechanic here
[reskin] value check: "Iron Advance" EV 26.4 vs floor 12.5 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature template: push-prone -> Actions/"Iron Advance" ("the bulwark drives the foe back and knocks it Prone beneath its advance [verb: knock:idea]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's 17 at CR 11, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The bulwark will not abandon its post. While it remains closer to its ward than any hostile creature, it has advantage on attack rolls, and it can react to a creature that tries to slip past it toward the ward with a sweeping backhand. Its oath tightens the instant something threatens what it guards." [trait/always/defense] [family: payoff] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, sealed-body, warded-mending, guarded-stance, undead-fortitude, truth-aura, fear-aura, evasion (+ shelf: resonant-body, weapon-lodge)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — resonant-body (iron)
[reskin] word match declined by the call: bound, guarded-stance — the key word does not mean the mechanic here
[reskin] closest refused: trait — "bound" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants advantage on its attacks while it stays nearer its ward than an)
[reskin] seat answered, but: the call said "The bulwark will not abandon its post. While it remains closer to its ward than any hostile creature, it has advantage o" is carried by "Oathkeeper's Backhand", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("grants advantage on its attacks while it stays nearer its ward than an") and wrote a trait instead: "Oathkeeper's Backhand" -> Reactions. *Trigger:* A hostile creature moves within 10 feet of the bulwark's ward while the bulwark is within 10 feet of that cre
[reskin] authored row numbers: "Oathkeeper's Backhand" — the call declared 0 number(s) promised
[reskin] seat default: warden owes interpose by print — it seats before the idea
[reskin] signature template (trait): interpose -> Reactions/"Interpose" ("the seat owes it by print")
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Oathkeeper's Backhand" ("The bulwark will not abandon its post. While it remains closer to its ward than any hostile creature, it has advantage on attack rolls, and it can react to a cr [authored: the catalog held no shape for it]")
[reskin] weapons answered: Fist = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a sentinel of black iron, AC 20, Huge, s" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Iron Advance.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Oathkeeper's Backhand" [no template]
[reskin] 2024 caps: "Oathkeeper's Backhand" — a condition or game term shipped lowercase
[reskin] lint fixed: prone-vocab, success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element claim revoked: "Oathkeeper's Backhand" claims "interposing warden's bulk" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Oathkeeper's Backhand")
audit finding below confidence gate: Ward Bond Tracking continuous 60-foot proximity and halving/rounding every damage instance against a ward is state the block gives no way to mark or check in play.
[reskin] audit: [Oathkeeper's Backhand: The failure clause is a gar…ght away from Bulwark. Prone and is not pushed."), Ward Bond: The ward is never defined or created by…rk is magically bound to a ward of its choosing"), Interpose: 'that it guards' names a guard relation…ulwark that it guards is hit by an attack roll.")]
[reskin] audit defect: Reactions/"Oathkeeper's Backhand" [model-written] high wording — The failure clause is a garbled fragment: it names 'Bulwark' instead of the creature, and 'Prone and is not pushed' is a dangling orphan sentence that contradicts the push it follows. — Rewrite the failure line as a single clean clause pushing the target away from the bulwark and giving it the Prone condition. (about: "the target is pushed up to 10 feet straight away from Bulwark. Prone and is not pushed.")
[reskin] audit defect: Traits/"Ward Bond" [print] medium dead_reference — The ward is never defined or created by any entry, and 'magically bound' implies a magic source the creature has no spellcasting to express. — State how a ward is established (an action, a condition, or a creature it is assigned to) so the bond can be adjudicated. (about: "The bulwark is magically bound to a ward of its choosing")
[reskin] audit defect: Reactions/"Interpose" [catalog] medium dead_reference — 'that it guards' names a guard relationship nothing on the sheet defines, so the GM cannot determine who the reaction applies to. — Define 'guards' by the same ward relationship named in Ward Bond, or restate the trigger so the protected creature is explicit. (about: "Trigger: A creature within 5 feet of the bulwark that it guards is hit by an attack roll.")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Oathkeeper's Backhand" carries "The bulwark will not abandon its post. While it remains ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] header clause: speed 30 ft. -> 20 ft. — the user typed 20 feet
[reskin] user-set: AC 18 -> 20 — a declared field, not a derivation (Resolution 3)
[reskin] done: "Oathbound Bulwark" — donor defender-7-warden, CR 11
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 11 model call(s)
```

---

## 26. Fenwrack Crone — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library · **elapsed** 30s

### Block
```
Fenwrack Crone

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 81 (18d8)

Speed 30 ft., Swim 30 ft.

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

Skills Arcana +6, History +6, Perception +4

Senses Passive Perception 14

Languages Common and any three languages

CR 7 (XP 2,900; PB +3)

Traits

Spiteful Curse. If the target is a creature and isn't already Poisoned by this creature, it is subjected to the following effect. Constitution Saving Throw: DC 14. Failure: The target has the Poisoned condition. While Poisoned this way, the target can't regain Hit Points. The condition lasts until the target finishes a Long Rest or is cured by the Lesser Restoration spell or similar magic. Success: The target is immune to this creature's contagion for 24 hours.

Actions

Multiattack. The crone makes three Arcane Burst attacks. It can replace one attack with a use of Backwards Name.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The crone casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Backwards Name. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Necrotic damage, and the target is cursed. While cursed, the target can't regain Hit Points.

Bonus Actions

Misty Step (3/Day). The crone casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The crone casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

### Trace
```
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "a marsh witch who curses trespassers" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("curses trespassers")
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=grave/beguiling mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: hexes and curses that steal actions [behavior] | the choking mire she drags victims into [aura] | rot-woven charms and bog-charms [object]
[concept] identity: She opens by marking the loudest intruder with a bog-rot curse from cover, then spends each round layering hexes that blind, slow, and turn the party's own strength into a liability while she circles through the mire. Cornered, she doesn't flee or duel — she drags the fight into deeper water and lets her curse-eaten victims drown in mud and their own failing bodies.
[concept] lore: A hedge-witch who bargained her name to the marsh itself, she now composts trespassers into the fen, wearing their stolen years as a youth that is always rotting from the hem.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 7
[reskin] print canon defenses: HP 108 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-8-binder -> CR 7
[reskin] seats: action <- "hexes and curses that steal actions" | trait <- "the choking mire she drags victims into"
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "a marsh witch who curses trespassers, cr 7" heads on the Mage — print's rows ride along; the seat stays
[reskin] name_element answered: Bogfire = imagery; Rotwither = imagery
[reskin] name element refused: "Bogfire" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] name element refused: "Rotwither" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] repair round 1: 2 defect(s) — "Bogfire" deals Fire on a Humanoid whose concept names no Fire — a name is not a warrant; use a physical type | "Rotwither" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "the crone" — the call's own answer (kind), built from the name
[reskin] inline form: "the crone" — the model's own reading of the name
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] energy withheld on a base row: "Rotwither" Necrotic -> Bludgeoning (the body's physical type; a Humanoid deals no Necrotic its concept never gave it)
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] daily spell dropped — Blight (36 avg vs 17 per-hit; print's only daily damage spell is the Adult Red's Fireball at ~1.1x)
[reskin] spell DC coherence: DC 14 -> 11 off Charisma 11 (print's array stays)
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: save_single] [askMechanic: curse] | "cr 7" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 7")
[reskin] open asks handed to the idea call: "curses trespassers" [curse] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The crone points a dripping, nettle-twisted finger at one creature she" answers the GM's "curses trespassers"
[reskin] idea unanchored: trait — "When the crone is reduced to half her hit points or fewer, the years s" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: seal, active-toll, random-ray, spew, herd, rally, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, warded-mending, gaze-aura, blurred-form, death-burst
[reskin] menu: taste stands down — action answers the GM's "curses trespassers", so role and style do not filter the menu (legality still does); 21 template(s) offered
[reskin] signature idea (action): "The crone points a dripping, nettle-twisted finger at one creature she can see and speaks its name backwards into the marsh. The target must succeed on a Wisdom saving throw or be cursed for the duration: at the start of each of its turns it must choose whether to move, take an action, or take a bonus action — it can do only one of the three that turn, as the hex knots its limbs and mires its will" [action/save/condition] [family: mark] — menu: condition-payoff, wail, lure, ground-burst, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, zone, execute, terror-pulse, disarm, push-prone, exploiter (+ shelf: thrown-burst-seed, delayed-brand, thrown-burst, throw-retrieve, lay-on-hands, aggro-curse, self-invisibility, rampage, patient-defense, second-wind, focus, feint-slip, snap-shot, riposte, answering-strike, life-drain, bolt-restrain, bolt-drag, bolt-mark, affliction, contagion, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — curse: curse-debt
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: curse-debt (save/damage), lure (save/condition), pacify (save/condition)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: lure, pacify, escalating-dread, snare-bolt, sensory-strike, terror-pulse, curse-debt — the key word does not mean the mechanic here
[reskin] closest refused: action — "curse-debt" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a curse that limits the victim to one of move, action, or bonus action)
[reskin] seat authored nothing: action — the call was asked to write an action for "The crone points a dripping, nettle-twisted finger at one creature she" and wrote no row of that kind (refused: "Backwards Name" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Backwards Name" — the row does nothing on a failed save — say what the target suffers: a condition it gains, ); asking once more with the reason
[reskin] the curse is the row: "Backwards Name" was written for "curses trespassers" and the engine sets its curse; the Restrained it also carried is dropped — a curse, damage and a condition are more than one row buys
[reskin] authored row answers the GM: action — "Backwards Name" was written for "curses trespassers", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a curse that limits the victim to one of move, action, or bonus action") and wrote an action instead: "Backwards Name" -> Actions. *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 19 (3d12) Necrotic damage, and the target is curse
[reskin] authored row numbers: "Backwards Name" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Backwards Name" after ""Backwards Name" — the row does nothing on a failed save — say what the target s"
[reskin] signature authored: no template — the seat wrote it -> Actions/"Backwards Name" ("The crone points a dripping, nettle-twisted finger at one creature she can see and speaks its name backwards into the marsh. The target must succeed on a Wisdom [authored: the catalog held no shape for it]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "When the crone is reduced to half her hit points or fewer, the years she stole begin to slip free — her stolen youth rots visibly and the curse in her breath thickens, so that each creature she has cursed takes on the Poisoned condition at the start of its turn until it succeeds on a Constitution saving throw at the end of one of its turns." [rider/on_hit/condition] [family: payoff] — menu: life-drain, bolt-restrain, bolt-drag, bolt-mark, affliction, contagion, stunning-strike, pounce (+ shelf: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, mimicry, truth-aura, fear-aura, kill-denial)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — curse: affliction, contagion
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] word match declined by the call: affliction, bolt-restrain, bolt-mark, stunning-strike, pounce, composed:payoff:condition, bolt-drag, life-drain, terrain-walk — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "contagion" has no key-table verb, but the call quotes "curses trespassers" from the description
[reskin] signature template (trait): contagion -> Traits/"Spiteful Curse" ("The crone's curse inflicts the Poisoned condition on cursed creatures, and while [shape fit, no verb match]")
[reskin] weapons answered: Nettle Switch = whip; Bogfire = none; Rotwither = none; Mire Debt = none
[reskin] weapon declared: "Nettle Switch" is a whip — the call's own answer
[reskin] weapon dice keep the budget's die: "Nettle Switch" is a whip (d4), but 5d4 passes print's largest d4 attack row (3d4) — "16 (3d8 + 3)" stands
[reskin] weapon reach follows the weapon: "Nettle Switch" is a whip — reach 5 ft becomes 10 ft (the table's own)
[reskin] languages by mind: "Common and Sylvan" -> "Common" (sapient)
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Nettle Switch" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "the crone makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Bogfire" leaves — the Mage carries no ranged row and the words name none
[reskin] print canon saves: proficient in INT, WIS — the Mage's own set, at this sheet's stats and PB 3 (changed INT, CHA)
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Rotwither" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Backwards Name.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
audit finding below confidence gate: Spiteful Curse The text calls the effect a 'contagion' and the trait is invoked with no event, but nothing in the block spreads or transmits it — the word promises transmission the row does not perform.
[reskin] audit: [Spiteful Curse: The trait has no trigger, action c…ature, it is subjected to the following effect."), Backwards Name: The action creates a second 'curse…ile cursed, the target can't regain Hit Points."), Backwards Name: The curse imposes a lasting state …ile cursed, the target can't regain Hit Points."), Backwards Name: The name promises a mechanic the t…ge and blocks healing). (about: "Backwards Name")]
[reskin] audit rename held — "Backwards Name" was written for the GM's own clause (cl_a3qo0a: "curses trespassers"), so "Withering Word" does not land; the finding stands as logged
[reskin] audit defect: Traits/"Spiteful Curse" [catalog] high untrackable — The trait has no trigger, action cost, or range — nothing on the sheet says when or at whom this saving throw occurs, so a GM cannot run it. — State the trigger and range (e.g., a curse on a creature the crone can see when it trespasses or at a defined action cost) so the save has a moment and a target. (about: "If the target is a creature and isn't already Poisoned by this creature, it is subjected to the following effect.")
[reskin] audit defect: Actions/"Backwards Name" [model-written] medium other — The action creates a second 'cursed' state whose only effect duplicates Spiteful Curse's no-healing clause, leaving the GM tracking two overlapping no-regain conditions with no interaction stated. — Drop the redundant no-heal clause or make the Backwards Name curse do something Spiteful Curse does not, so one curse state covers it. (about: "and the target is cursed. While cursed, the target can't regain Hit Points.")
[reskin] audit defect: Actions/"Backwards Name" [model-written] high open_ended — The curse imposes a lasting state with no end condition, no repeat save, and no duration written anywhere in the entry. — Give the curse a stated end (fixed duration, repeat save, or an explicit cure clause) so the target has a rules-legal way out. (about: "the target is cursed. While cursed, the target can't regain Hit Points.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Fenwrack Crone" — donor caster-8-binder, CR 7
[harness] recorded 11 model call(s)
```

---

## 27. Displaced Templar — CR 6

**Input:** `a templar priest with a mace and no magic at all`
**Donor:** defender-5 -> CR 6
**Signature:** dropped · **elapsed** 27s

### Block
```
Displaced Templar

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
+5
WIS
12
+1
+4
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

Skills Athletics +10, Performance +5

Senses Passive Perception 11

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Iron Vestments Over a Bare Faith. While Bloodied, the templar has Advantage on attack rolls with its Mace.

Aura of Authority. While in a 10-foot Emanation originating from the templar, the templar and its allies have Advantage on attack rolls and saving throws, provided the templar doesn't have the Incapacitated condition.

Actions

Multiattack. The templar makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the templar's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the templar can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Parry. Trigger: The templar is hit by a melee attack roll while holding a weapon. Response: The templar adds 3 to its AC against that attack, possibly causing it to miss.

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

### Trace
```
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: holds the line in a doorway [behavior] | iron vestments over a bare faith [body] | the mace and shield of a temple guard [object]
[concept] identity: A sworn temple enforcer in iron vestments, it opens by planting itself in a doorway or chokepoint and letting the mace answer anyone who tries to slip past — no blessings, no miracles, just a haft swung hard at knee, hip and helm. Every round it holds the line, shoving and hooking with shield and helm, deliberately baiting one opponent into overcommitting so the mace can punish the gap. It does not break: bloodied, it fights harder and more patiently, giving ground a step at a time but never fleeing, and it will not stop until it or the line falls.
[concept] lore: Stripped of his orders and his prayers, this templar keeps the only vow left to him — that nothing passes the post he was set to guard.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "holds the line in a doorway" | trait <- "iron vestments over a bare faith"
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Mace Butt Strike" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] features: Sap on Mace — the feature table, no call
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the templar" — the call's own answer (kind), built from the name
[reskin] inline form: "the templar" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The templar reads an overcommitted foe and punishes the gap: when a cr" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Iron Vestments Over a Bare Faith. The templar does not break: while Bl" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 27 of 27 answered; not true of this body: seal, shield-bash, active-toll, random-ray, herd, shell-withdraw, rally, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The templar reads an overcommitted foe and punishes the gap: when a creature within its reach makes an attack roll against it and misses, the templar can immediately repay the opening with its Mace — the same haft, aimed at knee or helm so the target has the Prone condition and cannot easily rise while the line holds." [reaction/on_being_hit/condition] [family: sentinel] — menu: riposte, answering-strike (+ shelf: throw-retrieve, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, stunning-strike, charge-push)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_being_hit/does condition; leading: riposte (on_being_hit/damage), answering-strike (on_being_hit/damage)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: answering-strike — the key word does not mean the mechanic here
[reskin] fit declined: "Punish the Gap" — a print body takes only what the user's words ask, and the call named none of this creature's own elements for it; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Iron Vestments Over a Bare Faith. The templar does not break: while Bloodied, it fights more patiently than ever, and its mace's bludgeoning strikes against a creature that is Prone or Grappled are made with Advantage — it has learned to swing where the weight of the body cannot help but follow." [trait/always/defense] [family: payoff] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, evasion
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: berserk, blood-frenzy, pack-tactics, guarded-stance — the key word does not mean the mechanic here
[reskin] closest refused: trait — "bloodied-fury" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants Advantage on attack rolls only against a target that is already)
[reskin] seat answered, but: the call said "Iron Vestments Over a Bare Faith. The templar does not break: while Bloodied, it fights more patiently than ever, and it" is carried by "Iron Vestments Over a Bare Faith", and no such row is on this sheet — the clause stays open
[reskin] seat authoring refused: trait — the authored row needs its target to have Prone and no row on this sheet imposes it, so its trigger could never fire (the Chalk-Hound's Daubing Cling, forty #2)
[reskin] seat asked again: trait — the first answer was refused (the row needs its target to have a condition no row on this sheet imposes); asking once more with the reason
[reskin] seat answered, but: the call said "Iron Vestments Over a Bare Faith. The templar does not break: while Bloodied, it fights more patiently than ever, and it" is carried by "Iron Vestments Over a Bare Faith", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("grants Advantage on attack rolls only against a target that is already") and wrote a trait instead: "Iron Vestments Over a Bare Faith" -> Traits. While Bloodied, the templar has Advantage on attack rolls with its Mace.
[reskin] authored row numbers: "Iron Vestments Over a Bare Faith" — the call declared 0 number(s) promised
[reskin] seat landed on the second try: trait — "Iron Vestments Over a Bare Faith" after "the row needs its target to have a condition no row on this sheet imposes"
[reskin] free signature row: "Iron Vestments Over a Bare Faith" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Iron Vestments Over a Bare Faith" ("Iron Vestments Over a Bare Faith. The templar does not break: while Bloodied, it fights more patiently than ever, and its mace's bludgeoning strikes against a c [authored: the catalog held no shape for it]")
[reskin] weapons answered: Mace = mace; Shield Bash = none; Baited Opening = none
[reskin] weapon dice follow the weapon: the GM's "Mace" is a mace (d6) — "22 (4d8 + 4)" becomes "21 (5d6 + 4)"
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Gladiator's own type stands
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "the templar makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon saves: proficient in STR, DEX, CON, WIS — the Gladiator's own set, at this sheet's stats and PB 3 (changed DEX, WIS)
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] print canon row: Reactions/Parry — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Mace" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 63 against the card's 45 — the attack rows re-solve at 75% (3 attacks off one row after a supersede)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Iron Vestments Over a Bare Faith" [no template]
[reskin] lint: 0 findings
[reskin] element claim revoked: "Iron Vestments Over a Bare Faith" claims "iron vestments over a bare faith" but the audit judged that nothing in the row carries it; the name carries "iron", "vestments", "over", "bare", "faith" and may not advertise what the rules do not do — flagged decoration for the rename pass
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Iron Vestments Over a Bare Faith")
[reskin] audit: [Iron Vestments Over a Bare Faith: The name promise…ar has Advantage on attack rolls with its Mace.")]
[reskin] audit rename blocked — "Iron Vestments Over a Bare Faith" -> "Bloodied Zeal" would drop the GM's own words "iron", "vestments", "over", "bare", "faith"
[reskin] clause unresolved: "Iron Vestments Over a Bare Faith" carries "Iron Vestments Over a Bare Faith. The templar does not b", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Displaced Templar" — donor defender-5, CR 6
[harness] recorded 12 model call(s)
```

---

## 28. Ilvareth Dusksong — CR 12

**Input:** `name: Ilvareth Dusksong | An elf archmage who bends shadow and steps between places.`
**Donor:** caster-12 -> CR 12
**Signature:** library · **elapsed** 29s

### Block
```
Ilvareth Dusksong
Medium humanoid, neutral
Armor Class

17

Hit Points: 

170 (31d8 + 31)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

14 (+2)

	

12 (+1)

	

20 (+5)

	

15 (+2)

	

16 (+3)

Skills: 

Arcana +13, History +9, Perception +6

Saving Throws: 

INT +9, WIS +6

Damage Immunities: 

psychic, charmed (with mind blank)

Senses: 

passive Perception 16

Languages: 

Common plus five other languages, Elvish, Undercommon

Challenge

12 (8,400 XP)

Proficiency Bonus:

+4

Umbral Slide.While Ilvareth is in an area of dim light or darkness, Ilvareth can move through the space of any dim light or darkness as though it were open air, and while entirely within such an area he has advantage on Dexterity (Stealth) checks and leaves no tracks.
Magic Resistance.Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day) (Bonus Action).Ilvareth casts Misty Step, using the same spellcasting ability as Spellcasting.
Shadow Step (2/Day) (Bonus Action).Ilvareth teleports up to 30 feet to an unoccupied space it can see.
Protective Magic (3/Day) (Reaction).When Ilvareth is hit by an attack roll, Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks.
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): - At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fly, Lightning Bolt
1/day each: Cone of Cold, Mind Blank, Scrying, Teleport
```

### Trace
```
[path] class_npc — class mage — "archmage" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: implied by the kind — "an elf archmage who bends shadow" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("an elf archmage") | caster: no line key in the words — the model's read of its quote
[concept] name: "Ilvareth Dusksong" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/uncanny mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: provided "Ilvareth Dusksong"
[concept] mechanics: teleport
[concept] signature elements: stepping between shadows to reposition [behavior] | a body half-substance, bent from shadow [body] | bolts of cold shadowlight [aura]
[concept] identity: Ilvareth opens by folding himself into shadow, vanishing into a patch of darkness and reappearing at range to loose a shadow-bolt before his foes can close; each round after he trades position for position, stepping between shadows to keep a screen of dim space between himself and the melee, blasting with shadow and force while his steps leave him briefly untouchable. Wounded and cornered, he does not flee — he retreats into deeper dark, taunts from angles his enemies cannot face, and grows crueler and more surgical the closer they press him.
[concept] lore: Ilvareth Dusksong is an exiled archmage who tore the boundary between places in himself, and now he drifts the world's unlit corners seeking the one shadow that can carry him home.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Archmage — the class's own print block, nearest CR 12
[reskin] print canon defenses: HP 168 -> 170, AC 16 -> 17 — the Archmage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 14, CON 12, INT 20, WIS 15, CHA 16 — the Archmage's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: caster-12 -> CR 12
[reskin] seats: action <- "stepping between shadows to reposition" | trait <- "a body half-substance, bent from shadow"
[reskin] [path] decides: class_npc on the Archmage · class mage (the matcher would have said twist Archmage)
[reskin] print canon: "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." heads on the Archmage — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Shadow Lance" deals Cold on a Humanoid whose concept names no Cold — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "archmage": Misty Step (3/Day) (Mage/Misty Step)
[reskin] proper noun: "Ilvareth Dusksong" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Ilvareth" — the call's own answer (person), built from the name
[reskin] inline form: "Ilvareth" — the model's own reading of the name
[reskin] energy dropped — no rider slot: "Shadow Lance" is a lance and the blow must be Piercing, but this row has no rider slot to carry Cold; the energy is lost rather than re-split by hand
[reskin] control spell gated to daily — Blindness/Deafness (level 2 control at will is print's CR 13+ shape; at CR 12 it is 1/Day)
[reskin] control spell gated to daily — Slow (level 3 control at will is print's CR 13+ shape; at CR 12 it is 1/Day)
[reskin] spell DC coherence: DC 18 -> 17 off Intelligence 20 (print's array stays)
[reskin] save dc derived: DC 18 -> 17 (8 + PB 4 + Intelligence's 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: teleport — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "bends shadow and steps between places" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "bends shadow and steps between places" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Ilvareth Dusksong — An elf archmage" -> has (descriptive), head | "bends shadow and steps between places" -> has (mechanical) [asked: at_will/at_will/movement] [askMechanic: teleport]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "When Ilvareth takes the Hide action, he does not merely conceal himsel" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Ilvareth's body is half-substance, bent from shadow: he can move throu" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 35 of 35 answered; not true of this body: snare, seal, wail, active-toll, random-ray, spew, snare-bolt, herd, drain, blighted-ground, rally, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When Ilvareth takes the Hide action, he does not merely conceal himself — he steps into the shadow and comes out of another patch of dim light or darkness within sight, appearing there Prone but unseen. Any creature that was tracking or targeting him loses him entirely until he moves or attacks." [bonus_action/always/movement] [family: breach] — menu: lay-on-hands, aggro-curse, self-invisibility, phase-slip, blink, focus, feint-slip (+ shelf: thrown-burst, gaze-single, zone, execute, lure, ground-burst, pacify, escalating-dread, slow-bolt, sensory-strike, thrown-burst-seed, delayed-brand, curse-debt, zone-seed, reveal, wind-up, disarm, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — teleport: self-invisibility, phase-slip, blink
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: self-invisibility (always/movement), phase-slip (always/movement), blink (always/movement)
[reskin] keys would have bound: action — phase-slip (step, shadow)
[reskin] classification handed to the fit call: mechanic=teleport
[reskin] word match declined by the call: self-invisibility, blink — the key word does not mean the mechanic here
[reskin] signature template: phase-slip -> Bonus Actions/"Shadow Step (2/Day)" ("he steps into the shadow and comes out of another patch of dim light or darkness [verb: step:concept, shadow:concept]")
[reskin] keys spent by the action: step, shadow
[reskin] signature idea (trait): "Ilvareth's body is half-substance, bent from …: he can move through the space of any Dim light or Darkness as though it were open air, and while entirely within such an area he has advantage on Dexterity (Stealth) checks and leaves no tracks." [trait/always/movement] [family: breach] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, blurred-form
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (always/movement): relentless-pursuit, bound; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: relentless-pursuit (always/movement), bound (always/movement), phobia (always/condition)
[reskin] classification handed to the fit call: mechanic=teleport
[reskin] word match declined by the call: bound, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest refused: trait — "blurred-form" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a short-range teleport/reposition that moves the creature to another s)
[reskin] seat answered, but: the call said "Ilvareth's body is half-substance, bent from …: he can move through the space of any Dim light or Darkness as though it " is carried by "Umbral Slide", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a short-range teleport/reposition that moves the creature to another s") and wrote a trait instead: "Umbral Slide" -> Traits. While Ilvareth is in an area of Dim light or Darkness, Ilvareth can move through the space of any Dim light or Darkness 
[reskin] authored row numbers: "Umbral Slide" — the call declared 0 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Umbral Slide" ("Ilvareth's body is half-substance, bent from …: he can move through the space of any Dim light or Darkness as though it were open air, and while entirely within [authored: the catalog held no shape for it]")
[reskin] weapons answered: Shadow Lance = none
[reskin] weapon declined: "Shadow Lance" reads lance from its name, but the call answered none — the row carries no weapon
[reskin] print canon alignment: Neutral Evil -> Neutral — the Archmage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Elvish, Undercommon" -> "Common plus five other languages, Elvish, Undercommon" — the Archmage's plus the concept's Elvish, Undercommon
[reskin] print canon attack: "Shadow Lance" -> "Arcane Burst" — the Archmage's own row
[reskin] print canon skills: "Arcana +9, Perception +6" -> "Arcana +13, History +9, Perception +6" — the Archmage's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Psychic; Charmed (with Mind Blank) — the Archmage's own header lines
[reskin] print canon trait: Magic Resistance — "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." is the Archmage (print's own row)
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Umbral Slide" [no template]
[reskin] 2024 caps: "Umbral Slide" — a condition or game term shipped lowercase
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 120 ft.; Passive Perception 16" -> "Passive Perception 16")
[reskin] row binds its clause: "Shadow Step" answers "bends shadow and steps between places" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row MISMATCH: "bends shadow and steps between places" -> "Misty Step" — limit: asked at_will, row reads per_day
[reskin] lint: 0 findings
[reskin] element expressed: Umbral Slide carries "stepping between shadows to reposition" — "Ilvareth can move through the space of any Dim light or Darkness as though it we"
[reskin] audit: [Umbral Slide: The clause reads as a property of da…im light or Darkness as though it were open air"), Umbral Slide: The trait switches from the creature…Dexterity (Stealth) checks and leaves no tracks"), Umbral Slide: Movement through a creature's space … through the space of any Dim light or Darkness")]
[reskin] audit defect: Traits/"Umbral Slide" [model-written] high wording — The clause reads as a property of darkness itself rather than of a creature occupying it, so a GM cannot tell whose space is being entered or what 'Dim light or Darkness' means as a destination. — Rewrite to condition the phasing on Ilvareth being in Dim light or Darkness and moving into / through a creature's space, and state the space is left unoccupied rather than treating a lighting condition as a place. (about: "Ilvareth can move through the space of any Dim light or Darkness as though it were open air")
[reskin] audit defect: Traits/"Umbral Slide" [model-written] high wording — The trait switches from the creature's name to the pronoun 'he' mid-entry, an inconsistent referent in the statblock. — Use the creature's name throughout, matching the rest of the block. (about: "while entirely within such an area he has Advantage on Dexterity (Stealth) checks and leaves no tracks")
[reskin] audit defect: Traits/"Umbral Slide" [model-written] medium open_ended — Movement through a creature's space has no stated action cost, timing window, or limit within the turn, so a GM cannot adjudicate whether it happens during a move, as a reaction, or for free. — State that the phasing occurs as part of Ilvareth's movement, so the trigger and timing are anchored to a move. (about: "While Ilvareth is in an area of Dim light or Darkness, Ilvareth can move through the space of any Dim light or Darkness")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "archmage" which is not a whole clause — the seat surgery cut it; resolved to cl_176teih
[reskin] clause unresolved: "Umbral Slide" carries "Ilvareth's body is half-substance, bent from it: he can ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Ilvareth Dusksong" — donor caster-12, CR 12
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 11 model call(s)
```

---

## 29. Swarm of Funeral Bells — CR 13

**Input:** `a swarm of funeral bells that ring themselves over the dying`
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 29s

### Block
```
Swarm of Funeral Bells

Medium Swarm of Tiny Constructs, Unaligned

AC 15
Initiative +5 (15)

HP 178 (21d8 + 84)

Speed 30 ft., Fly 30 ft. (hover)

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
15
+2
+2
MOD
SAVE
CON
18
+4
+4
CHA
15
+2
+2

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses darkvision 60 ft.; Passive Perception 12

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Ragged Peal. While the swarm is Bloodied, each of its Bell attacks deals its damage as Necrotic instead of Bludgeoning.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Bell attacks. It can replace one attack with a use of The Last Note Is For You.

Bell. Melee Attack Roll: +10, reach 5 ft. 45 (9d8 + 5) Bludgeoning damage, or 23 (4d8 + 5) Bludgeoning damage if the swarm is Bloodied.

The Last Note Is For You. Wisdom Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

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

### Trace
```
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Construct typeFrom=the route call themes=grave/forged mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: self-ringing over the dying [behavior] | a churning swarm of blackened iron bells [body] | the ragged overlapping peal that hastens death [aura]
[concept] identity: A churning cloud of blackened iron bells drifts toward whoever is closest to death, and when it settles over them they ring in a ragged, overlapping peal that drags the dying a step closer to the grave. Every round it hovers over its mark and tolls, following the weakest heartbeat in reach rather than the strongest arm, and if its prey will not die fast enough it splits into two smaller peals to smother two throats at once. It does not retreat; a bloodied swarm rings faster and shriller, racing to finish its office before anything can break the bells apart.
[concept] lore: The bells of a plague-cart that buried its own driver were never rung for his funeral, so they tore themselves free of the yoke and now seek out the dying everywhere, to ring the rites he never received.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as mindless, and the card's 4 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 13
[reskin] mind tier: CHA 2 -> 15 — the call read this creature as capable at CR 13
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] seats: action <- "self-ringing over the dying" | trait <- "a churning swarm of blackened iron bells"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Unrung Peal" -> "Swarm of funeral bells" — the route call named the many; print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Construct -> Swarm of Tiny Constructs
[reskin] alignment by body: Neutral -> Unaligned — a Constructs at INT 4 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the peal" (kind), which the name does not support
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (mechanical) [asked: save_single] [askMechanic: curse]
[reskin] open asks handed to the idea call: "ring themselves over the dying" [curse]
[reskin] idea anchored: action — "The swarm fixes on the creature nearest to death within its reach and " answers the GM's "ring themselves over the dying"
[reskin] idea unanchored: trait — "While the swarm is Bloodied, its ragged peal quickens; each of its Bel" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 40 of 40 answered; not true of this body: gaze-single, snare, seal, shield-bash, random-ray, spew, snare-bolt, drain, zone-seed, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, adhesive, terrain-walk, aberrant-ground, web-walker, energy-aura, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider
[reskin] menu: taste stands down — action answers the GM's "ring themselves over the dying", so role and style do not filter the menu (legality still does); 6 template(s) offered
[reskin] menu pruned: action — pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, disarm, thrown-burst-seed, push-prone, curse-debt, reveal, wind-up, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm fixes on the creature nearest to death within its reach and rings a single tolling note meant only for them. That creature makes a Wisdom saving throw; on a failure it is Frightened of the swarm until the end of its next turn, and while Frightened this way, whenever it takes damage it must repeat the save or drop Prone, already half-lowered into the grave." [action/save/condition] [family: mark] — menu: thrown-burst, execute, wail, lure, active-toll, ground-burst (+ shelf: patient-defense, second-wind, lay-on-hands, riposte, answering-strike, stunning-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), thrown-burst (save/damage), execute (save/damage)
[reskin] keys would have bound: action — active-toll (ring, bell)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: execute, wail, active-toll, ground-burst, thrown-burst — the key word does not mean the mechanic here
[reskin] closest refused: action — "lure" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: applies Frightened and forces a repeat save on taking damage to drop P)
[reskin] authored row answers the GM: action — "The Last Note Is For You" was written for "ring themselves over the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("applies Frightened and forces a repeat save on taking damage to drop P") and wrote an action instead: "The Last Note Is For You" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 5 feet. *Failure:* The target has the Frightened condition until the e
[reskin] authored row numbers: "The Last Note Is For You" — the call declared (unanswered) number(s) promised
[reskin] value check: "The Last Note Is For You" EV 49.5 vs floor 23.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"The Last Note Is For You" ("The swarm fixes on the creature nearest to death within its reach and rings a single tolling note meant only for them. That creature makes a Wisdom saving throw [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "While the swarm is Bloodied, its ragged peal quickens; each of its Bell attacks deals its damage as Necrotic instead of Bludgeoning, as the ringing wears through flesh to the life beneath." [trait/always/damage] [family: payoff] — menu: spider-climb, phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] keys would have bound: trait — resonant-body (ring, bell)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: blood-frenzy, pack-tactics, assassinate — the key word does not mean the mechanic here
[reskin] closest refused: trait — "blood-frenzy" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: converts the Bell's damage to Necrotic while Bloodied, rather than gra)
[reskin] seat answered, but: the call said "While the swarm is Bloodied, its ragged peal quickens; each of its Bell attacks deals its damage as Necrotic instead of " is carried by "Ragged Peal", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("converts the Bell's damage to Necrotic while Bloodied, rather than gra") and wrote a trait instead: "Ragged Peal" -> Traits. While the swarm is Bloodied, each of its Bell attacks deals its damage as Necrotic instead of Bludgeoning.
[reskin] authored row numbers: "Ragged Peal" — the call declared 0 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Ragged Peal" ("While the swarm is Bloodied, its ragged peal quickens; each of its Bell attacks deals its damage as Necrotic instead of Bludgeoning, as the ringing wears throug [authored: the catalog held no shape for it]")
[reskin] weapons answered: Bell = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (mindless)
[reskin] immunities stamped for type: Swarm of Tiny Constructs + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of The Last Note Is For You.
[reskin] bloodied half re-derived: "Bell" — 14 (4d6) -> 23 (4d8 + 5), half of the main 45 on the main's own +5 (print's ratio and print's modifier)
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 3 fixed row(s), so the free-row budget is 2 rather than 1 — the card is thin and can afford more
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 2) — "Ragged Peal" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Ragged Peal" claims "self-ringing over the dying" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Ragged Peal")
[reskin] audit: [The Last Note Is For You: The cone has a size but …nable. (about: "each creature in a 30-foot Cone"), The Last Note Is For You: The signature action del…tened condition until the end of its next turn."), Ragged Peal: The name promises a sound (a peal) bu… its damage as Necrotic instead of Bludgeoning.")]
[reskin] audit rename blocked — "Ragged Peal" -> "Death Knell" would drop the GM's own words "ragged", "peal"
[reskin] audit defect: Actions/"The Last Note Is For You" [model-written] high untrackable — The cone has a size but no origin or direction, so the GM cannot place it without inventing an origin point the entry never states. — State the cone's origin (e.g., emanating from the swarm) and that it is aimed, so its area is determinable. (about: "each creature in a 30-foot Cone")
[reskin] audit defect: Actions/"The Last Note Is For You" [model-written] medium weak — The signature action delivers only a one-turn Frightened, a nuisance condition with no damage or lasting teeth, so it is not worth replacing a Bell attack that deals 45 damage. — Give the payload teeth — add damage or a harder condition to the note — so spending an attack on it is a real choice. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] clause unresolved: "Ragged Peal" carries "While the swarm is Bloodied, its ragged peal quickens; e", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[harness] recorded 11 model call(s)
```

---

## 30. Reliquary Ooze — CR 9

**Input:** `a cathedral-vault ooze that digests reliquaries`
**Donor:** ooze-9 -> CR 9 (invented — no printed peer)
**Signature:** library · **elapsed** 32s

### Block
```
Reliquary Ooze
Large ooze, unaligned
Armor Class

10 (natural armor)

Hit Points: 

153 (18d10 + 54)

Speed: 

20 ft., climb 20 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

6 (-2)

	

16 (+3)

	

2 (-4)

	

8 (-1)

	

1 (-5)

Damage Immunities: 

acid

Condition Immunities: 

charmed, deafened, exhaustion, frightened, grappled, prone, restrained

Senses: 

blindsight 60 ft. (blind beyond this radius), passive Perception 9

Languages: 

None

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Wounded Hunger.The ooze has advantage on attack rolls against any creature that doesn't have all its hit points. The ooze can pinpoint the location of consecrated relics within 60 feet of itself.
Amorphous.The ooze can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) acid damage.
Spider Climb.The ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The ooze makes two Engulfing Pseudopod attacks.
Engulfing Pseudopod: Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 11 (2d10) acid damage.
Reliquary Spray (Recharge 5-6): Each creature in a 30-foot-long, 5-foot-wide line must make a DC 15 Dexterity saving throw, taking 38 (11d6) acid damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also blinded until the end of its next turn.
```

### Trace
```
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[route] ooze type=Ooze mechanics=none — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "digests reliquaries" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] hints: ooze→body ✓ ("an amorphous cathedral-vault ooze") | engulf→mechanics ✓ ("digests reliquaries")
[concept] resolve: archetype=ooze type=Ooze typeFrom=the route call themes=amorphous/devouring mind=mindless style=— energy=Acid mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: engulfing reliquaries and digesting them whole [behavior] | a body of cathedral rot and spilled sanctified oil [body] | consecrated objects it has half-dissolved inside itself [object]
[concept] identity: The reliquary ooze seeps along cathedral vaults and drips onto consecrated shrines, flowing over a reliquary and engulfing it whole before it has even finished falling; every round thereafter it stays latched to its prize, thinning its bulk to wash through seams and cracks while digesting the holy thing inside it. It does not hunt people, only consecrated objects, but it fights to the death to keep what it has swallowed — it cannot be reasoned with and will not abandon a half-dissolved saint's bone. Its body grows brighter and more aggressive as it feeds, so the fight is a race against how much of the cathedral it has already eaten.
[concept] lore: Born when a cathedral's reliquary vault flooded with spilled sanctified oil and old rot, the thing woke hungry for the bones and silver it was built to guard, and now it prowls the holy dark for anything a saint once touched.
[reskin] body type: ooze — the body outranks the role (recorded: ooze)
[reskin] mind tier held: INT stays 2 against "feeble" — the call read this creature as mindless, and the card's 2 is already that dim
[reskin] mind tier held: WIS stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier held: CHA stays 1 against "feeble" — the card's 1 is already feeble
[reskin] donor: ooze-9 -> CR 9 (invented — no printed peer)
[reskin] row gated out: Engulf (engulf) — the concept did not claim this mechanic
[reskin] seats: action <- "engulfing reliquaries and digesting them whole" | trait <- "a body of cathedral rot and spilled sanctified oil"
[reskin] [path] decides: homebrew (the matcher would have said twist Gray Ooze)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the ooze" — the call's own answer (kind), built from the name
[reskin] inline form: "the ooze" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a cathedral-vault ooze" -> has (descriptive), head | "digests reliquaries" -> has (mechanical) [asked: attack]
[reskin] open asks handed to the idea call: "digests reliquaries" (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The ooze rears up and brings its half-dissolved prize down across the " answers the GM's "digests reliquaries"
[reskin] idea unanchored: trait — "Spilled sanctified oil seeps from every seam of the ooze, and the holy" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, shield-bash, wail, active-toll, random-ray, herd, blink, shell-withdraw, rally, phase-slip, false-appearance, absorption, faultless-tracker, web-walker, sealed-body, relic-object, mimicry, gaze-aura, blurred-form
[reskin] menu: taste stands down — action answers the GM's "digests reliquaries", so role and style do not filter the menu (legality still does); 9 template(s) offered
[reskin] menu pruned: action — pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, push-prone, thrown-burst-seed, drain, zone-seed, wind-up, blighted-ground, disarm, curse-debt, reveal, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating (the sheet cannot render them)
[reskin] signature idea (action): "The ooze rears up and brings its half-dissolved prize down across the floor — or hurls it — sending a spray of sanctified oil and reliquary-grit across a wide line. Each creature in the area must make a Dexterity saving throw; on a failure it takes Acid damage and is Blinded until the end of its next turn as the burning oil finds its eyes." [action/save/condition] [family: nova] — menu: trample, leap, thrown-burst, execute, seal, lure, pull-through, ground-burst, spew (+ shelf: rampage, patient-defense, second-wind, lay-on-hands, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, life-drain, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: seal (save/condition), lure (save/condition), trample (save/damage)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: seal, lure, spew, thrown-burst — the key word does not mean the mechanic here
[reskin] closest refused: action — "ground-burst" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a line-shaped area that on a failed Dexterity save also applies the Bl)
[reskin] authored row answers the GM: action — "Reliquary Spray (Recharge 5-6)" was written for "digests reliquaries", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a line-shaped area that on a failed Dexterity save also applies the Bl") and wrote an action instead: "Reliquary Spray (Recharge 5-6)" -> Actions. *Dexterity Saving Throw*: DC 15, each creature in a 30-foot Line. *Failure:* 38 (11d6) Acid damage, and the target has t
[reskin] authored row numbers: "Reliquary Spray (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] value check: "Reliquary Spray (Recharge 5-6)" EV 44.3 vs floor 14 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Reliquary Spray (Recharge 5-6)" ("The ooze rears up and brings its half-dissolved prize down across the floor — or hurls it — sending a spray of sanctified oil and reliquary-grit across a wide l [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Spilled sanctified oil seeps from every seam of the ooze, and the holy rot within it glows brighter and angrier the more it has swallowed. While the ooze is not at full hit points, it sheds bright light and its Engulfing Pseudopod attacks deal extra Acid damage as the digested reliquary's consecration burns through its body." [trait/always/damage] [family: payoff] — menu: adhesive, phobia, terrain-walk, aberrant-ground, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, truth-aura, fear-aura, assassinate, death-burst, kill-denial (+ shelf: bloodied-burst, weapon-lodge)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] keys would have bound: trait — aberrant-ground (ooze)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: assassinate, death-burst, marking-light — the key word does not mean the mechanic here
[reskin] free signature row: trait — "blood-frenzy" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "a body of cathedral rot and spilled sanctified oil" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Hallowed Frenzy" — the trait seat cannot quote the GM, but the call names the element it expresses: "a body of cathedral rot and spilled sanctified oil". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): blood-frenzy -> Traits/"Hallowed Frenzy" ("While not at full hit points, it grows angrier — advancing its attacks — matchin [shape fit, no verb match]")
[reskin] weapons answered: Engulfing Pseudopod = none
[reskin] chassis nova: "Reliquary Spray (Recharge 5-6)" — the ooze-9's own nova row; geometry, cap and rider lines below are its edits
[reskin] languages held: None stands — INT 2 on a Ooze speaks nothing, whatever the mind read said
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] name-canon stands down: the path answered homebrew on "a cathedral-vault ooze that digests reli" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget by card size: CR 9 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Hallowed Frenzy" [trait/always/damage]
[reskin] lint fixed: line-dimensions — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Hallowed Frenzy carries "a body of cathedral rot and spilled sanctified oil" — "The ooze can pinpoint the location of consecrated relics within 60 feet of itsel"
[reskin] audit: [Reliquary Spray (Recharge 5-6): The row was writte…linded condition until the end of its next turn"), Hallowed Frenzy: This sentence creates no defined …of consecrated relics within 60 feet of itself."), Hallowed Frenzy: The name promises a religious, re… creature that doesn't have all its Hit Points."), Hallowed Frenzy: Mid-combat this forces the GM to …of consecrated relics within 60 feet of itself.")]
[reskin] audit rename: "Hallowed Frenzy" -> "Wounded Hunger"
[reskin] audit defect: Actions/"Reliquary Spray" [model-written] medium undelivered — The row was written for 'digests reliquaries' but its rules dissolve creatures with acid, never digesting, consuming, or interacting with a reliquary at all — the only relic hook lives in a different trait. — Ground the spray in the reliquaries it dissolves: tie the effect to a relic or holy material the ooze carries and is expelling, so the row actually performs the digesting fiction. (about: "38 (11d6) Acid damage, and the target has the Blinded condition until the end of its next turn")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Reliquary Ooze" — donor ooze-9, CR 9
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 11 model call(s)
```

---

## 31. Thundercloud Drake — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`
**Donor:** dragon-2 -> CR 7
**Signature:** library · **elapsed** 32s

### Block
```
Thundercloud Drake

Medium Dragon, Chaotic Neutral

AC 18
Initiative +1 (11)

HP 110 (17d8 + 34)

Speed 30 ft., Fly 60 ft.

MOD
SAVE
STR
18
+4
+4
INT
15
+2
+2
MOD
SAVE
DEX
12
+1
+4
WIS
12
+1
+4
MOD
SAVE
CON
15
+2
+2
CHA
18
+4
+4

Skills Perception +4, Stealth +4

Immunities Thunder

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 14

Languages Common, Draconic

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. The thundercloud drake makes two Claw attacks.

Claw. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage plus 7 (2d6) Thunder damage.

Thunder Breath (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Shockwave Wings (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 30-foot Emanation originating from the thundercloud drake. Failure: The target has the Stunned condition until the end of its next turn.

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

### Trace
```
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("young storm drake") | breath→mechanics ✓ ("breath is a rolling wall of thunder")
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-charged scales and claws [body] | aerial herd-and-pinion flight [behavior]
[concept] identity: The young storm drake announces itself with a thunderous roar that scares the weak-willed, then opens with a rolling wall of thunder-breath that crashes over a line of foes rather than a single target. Every round after, it circles above and slams down with claw and tail charged with static, using its wall of sound to herd prey toward the center of the blast. When bloodied it does not flee, but rises on a shrieking updraft to pour down thunder again and again, arrogant and delighting in the cacophony it makes.
[concept] lore: Hatched in the black heart of a perpetual thundercloud, a young storm drake rides the storm-front aeries and hunts for the low folk who cannot endure its thunder, hoarding the storm's voice until it can summon a tempest of its own.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] mind tier held: WIS stays 12 against "ordinary" — the card's 12 is already ordinary
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 7
[reskin] mind tier: CHA 14 -> 18 — the call read this creature as formidable at CR 7
[reskin] donor: dragon-2 -> CR 7
[reskin] seats: action <- "rolling wall of thunder breath" | trait <- "storm-charged scales and claws"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Thunder Breath = literal; Thunderous Roar = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the thundercloud drake" — the call answered "the cloud drake" (kind), which the name does not support
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: breath — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical) [asked: save_area] [askMechanic: breath]
[reskin] open asks handed to the idea call: "a young storm drake whose breath is a rolling wall of thunder" [breath]
[reskin] idea anchored: action — "The drake beats its wings in a thunderclap that lands as a shockwave —" answers the GM's "a young storm drake whose breath is a rolling wall of thunder"
[reskin] idea unanchored: trait — "Static crawls over the drake's scales and gathers in its claws; whenev" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 35 of 35 answered; not true of this body: snare, zone, seal, shield-bash, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] menu: taste stands down — action answers the GM's "a young storm drake whose breath is a rolling wall of thunde", so role and style do not filter the menu (legality still does); 3 template(s) offered
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] signature idea (action): "The drake beats its wings in a thunderclap that lands as a shockwave — each creature beneath it must save or be knocked Prone and deafened for a moment, and any creature already Prone from its breath finds itself pinned to the earth, unable to rise until the ringing stops." [action/save/condition] [family: zone] — menu: gaze-single, execute, lure (+ shelf: rampage, lay-on-hands, second-wind, patient-defense, answering-strike, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, isolation)
[reskin] verb gate stands down: action — no template shares a verb, but 2 template(s) whose declared stamps match the idea (save/condition): gaze-single, lure; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: gaze-single (save/condition), lure (save/condition), execute (save/damage)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: gaze-single, lure, execute — the key word does not mean the mechanic here
[reskin] closest refused: action — "gaze-single" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an area shockwave that applies Prone or Deafened to each creature bene)
[reskin] seat authored nothing: action — the call was asked to write an action for "The drake beats its wings in a thunderclap that lands as a shockwave —" and wrote no row of that kind (refused: "Shockwave Wings" — Deafened alone is too slight to cost an action — choose Frightened, Charmed or Stunned, whichever fits this creature, or keep Deafened and add damage)
[reskin] seat asked again: action — the first answer was refused ("Shockwave Wings" — Deafened alone is too slight to cost an action — choose Frightened, Charmed or Stunned, wh); asking once more with the reason
[reskin] authored row answers the GM: action — "Shockwave Wings (Recharge 5-6)" was written for "a young storm drake whose breath is a rolling wall of thunder", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("an area shockwave that applies Prone or Deafened to each creature bene") and wrote an action instead: "Shockwave Wings (Recharge 5-6)" -> Actions. *Constitution Saving Throw*: DC 15, each creature in a 30-foot Emanation originating from the thundercloud drake. *Failu
[reskin] authored row numbers: "Shockwave Wings (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Shockwave Wings (Recharge 5-6)" after ""Shockwave Wings" — Deafened alone is too slight to cost an action — choose Frig"
[reskin] one nova: "Shockwave Wings" arrived gated on a sheet whose chassis already carries a Recharge nova — the gate leaves and the row prices at the ceiling (the wyrm's Shattering Ice Snare, step 7)
[reskin] value check: "Shockwave Wings (Recharge 5-6)" EV 19.8 vs floor 9.4 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature authored: no template — the seat wrote it -> Actions/"Shockwave Wings (Recharge 5-6)" ("The drake beats its wings in a thunderclap that lands as a shockwave — each creature beneath it must save or be knocked Prone and deafened for a moment, and any [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Static crawls over the drake's scales and gathers in its claws; whenever the drake strikes a creature that is already deafened or Prone, the charge leaps, and the drake regains the storm's voice — its Thunder Breath recharges." [trait/always/resource] [family: payoff] — menu: phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: phobia (always/condition), bloodied-fury (always/defense), blood-frenzy (always/damage)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: energy-aura, berserk, death-restoration — the key word does not mean the mechanic here
[reskin] closest refused: trait — "energy-aura" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: recharges its Thunder Breath when it hits an already-deafened or Prone)
[reskin] seat answered, but: the call said "Static crawls over the drake's scales and gathers in its claws; whenever the drake strikes a creature that is already de" is carried by "Charged Talons", and no such row is on this sheet — the clause stays open
[reskin] seat authoring refused: trait — the authored row needs its target to have Deafened and no row on this sheet imposes it, so its trigger could never fire (the Chalk-Hound's Daubing Cling, forty #2)
[reskin] seat asked again: trait — the first answer was refused (the row needs its target to have a condition no row on this sheet imposes); asking once more with the reason
[reskin] seat answered, but: the call said "Static crawls over the drake's scales and gathers in its claws; whenever the drake strikes a creature that is already de" is carried by "Stored Thunder", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Static crawls over the drake's scales and gathers in its claws; whenev" and wrote no row of that kind (refused: "Stored Thunder" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: trait — first: the row needs its target to have a condition no row on this sheet imposes; second: "Stored Thunder" — a trait is not a save — the save form takes stat, target and effect as ; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "energy-aura" nearest and judged its subject FLIPPED against the clause (recharges its Thunder Breath when it hits an already-deafened or Prone); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Static crawls over the drake's scales and gathers in its claws; whenever the drake strikes a creature that is already deafened or Prone, the charge leaps, and the drake regains the storm's voice — its Thunder Breath recharges." [trait/always/resource] — the model found no template that holds it (offered: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, energy-aura, truth-aura, fear-aura)
[reskin] weapons answered: Claw = none; Thunder Breath = none; Thunderous Roar = none
[reskin] chassis nova: "Thunder Breath (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] chassis nova: "Shockwave Wings (Recharge 5-6)" — the dragon-2's own nova row; geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] lint: dual-recharge: Two Recharge-gated entries (Thunder Breath (Recharge 5-6), Shockwave Wings (Recharge 5-6)) — print never fields two; one should be 1/Day, ungated, or replaced
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Shockwave Wings (Recharge 5-6): The row written fo…anation originating from the thundercloud drake"), Shockwave Wings (Recharge 5-6): The name promises …mechanical expression. (about: "Shockwave Wings")]
[reskin] audit rename blocked — "Thunderclap" claims an element "Shockwave Wings (Recharge 5-6)" does not pay (no damage)
[reskin] audit defect: Actions/"Shockwave Wings" [model-written] high undelivered — The row written for the GM's ask — a rolling wall of thunder — deals no Thunder damage and produces no wall, only a Stunned condition in a radial burst, so the signature action does not deliver the requested thunder-wall effect. — Rebuild the signature action so its payload is a moving or directional wall of thunder that carries Thunder damage, not a static radial Stun. (about: "each creature in a 30-foot Emanation originating from the thundercloud drake")
[reskin] [gap] recharges its Thunder Breath when it hits an already-deafened or Prone creature — "Static crawls over the drake's scales and gathers in its claws; whenever the drake strikes a creature that is already deafened or Prone, the charge leaps, and the drake regains the storm's voice — its Thunder Breath recharges." — Thundercloud Drake [seat: trait [trait/always/resource]] (closest offered: energy-aura) [effect: resource] [menu: phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind relentless-pursuit bound undead-fortitude energy-aura truth-aura fear-aura] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:denied-clause adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role mimicry:body-verdict assassinate:role blurred-form:body-verdict death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Thundercloud Drake" — donor dragon-2, CR 7
[harness] recorded 13 model call(s)
```

---

## 32. Gorrak Stonewold — CR 9

**Input:** `a stone giant exile who speaks only Giant and understands no Common`
**Donor:** brute-9 -> CR 9
**Signature:** library · **elapsed** 29s

### Block
```
Gorrak Stonewold
Huge giant, neutral
Armor Class

14 (natural armor)

Hit Points: 

161 (14d12 + 70)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


23 (+6)

	

15 (+2)

	

20 (+5)

	

10 (+0)

	

12 (+1)

	

9 (-1)

Skills: 

Athletics +10, Perception +5

Saving Throws: 

STR +10, CON +9

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Giant

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Actions
Multiattack: Gorrak makes two attacks, using Stone Club or Boulder.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage.
Deflect Missile (Recharge 5-6): Each creature in a 30-foot cone must make a DC 18 Dexterity saving throw, taking 38 (11d6) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is knocked prone.
```

### Trace
```
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant typeFrom=the route call themes=elemental/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: living granite body [body] | hurling stones and boulders [behavior] | exile's shameless stand-and-trade brawling [behavior]
[concept] identity: A stone giant exile opens by hurling a boulder from the ridge, then wades in with a slab of cliff-face gripped in both fists, trading blows toe to toe and soaking hits the way only a mountain of living granite can. Every round it presses forward to keep foes within arm's reach, shrugging off pain and grinding through lesser blows without breaking stride. It fights to the death and beyond reason — an outcast with nothing left to return to — and never stops swinging while any creature still stands before it.
[concept] lore: Cast out of its mountain clan for some old dishonor, this giant wanders the lowlands alone, wanting only a fight it can lose or an exile's death worth the stone it is made of.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +7, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] seats: action <- "exile's shameless stand-and-trade brawling" | trait <- "living granite body"
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "Gorrak" — the call's own answer (person), built from the name
[reskin] inline form: "Gorrak" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "In one motion, Gorrak wrenches free a shelf of cliff-face and hurls it" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Gorrak is living mountain granite; while he has half his hit points or" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "In one motion, Gorrak wrenches free a shelf of cliff-face and hurls it in a wide arc, sand and gravel blasting from the slab on impact. Each creature within a cone in front of him must succeed on a Dexterity saving throw or take Bludgeoning damage and be knocked Prone, choking on the settling dust." [action/save/condition] [family: nova] — menu: trample, leap, thrown-burst, throw-retrieve, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal (+ shelf: rampage, second-wind, aggro-curse, self-invisibility, focus, answering-strike, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), push-prone (save/condition)
[reskin] word match declined by the call: escalating-dread, terror-pulse, lure, pacify, sensory-strike, reveal — the key word does not mean the mechanic here
[reskin] closest refused: action — "ground-burst" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a trait or row stating which languages the creature speaks and underst)
[reskin] seat answered, but: the call said "In one motion, Gorrak wrenches free a shelf of cliff-face and hurls it in a wide arc, sand and gravel blasting from the " is carried by "Cliff-Shelf Hurl", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("a trait or row stating which languages the creature speaks and underst") and wrote an action instead: "Cliff-Shelf Hurl (Recharge 5-6)" -> Actions. *Dexterity Saving Throw*: DC 18, each creature in a 30-foot Cone. *Failure:* 38 (11d6) Bludgeoning damage, and the targe
[reskin] authored row numbers: "Cliff-Shelf Hurl (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Cliff-Shelf Hurl (Recharge 5-6)" is HANDED "a exile" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Cliff-Shelf Hurl (Recharge 5-6)" ("In one motion, Gorrak wrenches free a shelf of cliff-face and hurls it in a wide arc, sand and gravel blasting from the slab on impact. Each creature within a c [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Gorrak is living mountain granite; while he has half his hit points or fewer, he grinds forward on feet of bare rock, and when a creature misses him with a melee attack, he can immediately move up to half his Speed toward that creature without provoking Opportunity Attacks, the stone of his body shrugging off the blow as he closes." [trait/always/movement] [family: breach] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/movement): terrain-walk, relentless-pursuit, bound; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] word match declined by the call: terrain-walk, relentless-pursuit, bound, bloodied-fury — the key word does not mean the mechanic here
[reskin] closest refused: trait — "bloodied-fury" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on a miss, grind half its Speed toward that attacker without provoking)
[reskin] seat answered, but: the call said "while he has half his hit points or fewer, he grinds forward on feet of bare rock, and when a creature misses him with a" is carried by "Mountain Grind", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("on a miss, grind half its Speed toward that attacker without provoking") and wrote a trait instead: "Mountain Grind" -> Traits. While Gorrak has half his hit points or fewer, when a creature misses him with a melee attack, Gorrak moves up to half h
[reskin] authored row numbers: "Mountain Grind" — the call declared 0 number(s) promised
[reskin] free signature row: "Mountain Grind" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Mountain Grind" is HANDED "a exile" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Mountain Grind" ("Gorrak is living mountain granite; while he has half his hit points or fewer, he grinds forward on feet of bare rock, and when a creature misses him with a mele [authored: the catalog held no shape for it]")
[reskin] weapons answered: Slab = none; Boulder = none
[reskin] chassis nova: "Cliff-Shelf Hurl (Recharge 5-6)" — the brute-9's own nova row; geometry, cap and rider lines below are its edits
[reskin] print canon attack: "Slab" -> "Stone Club" — the Stone Giant's own row
[reskin] print canon: the seat's own row STAYS — Actions/"Cliff-Shelf Hurl (Recharge 5-6)" answers "In one motion, Gorrak wrenches free a shelf of cliff-face an", which the GM typed; print's nova rides beside it rather than over it
[reskin] print canon nova: "Cliff-Shelf Hurl (Recharge 5-6)" -> "Deflect Missile (Recharge 5-6)" — one breath: the chassis nova at this sheet's CR carries the Stone Giant's name; print's own row stays out
[reskin] free row over budget: Traits/"Mountain Grind" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Deflect Missile" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Deflect Missile (Recharge 5-6): The name promises …damage, and the target has the Prone condition."), Deflect Missile (Recharge 5-6): The save is phrase…Throw*: DC 18, each creature in a 30-foot Cone.")]
[reskin] audit rename blocked — "Deflect Missile (Recharge 5-6)" is the user's own part name, a kit feature's real name, or print's own row
[reskin] audit defect: Actions/"Deflect Missile" [print] medium wording — The save is phrased as a bare 'Saving Throw:' label with no verb tying the target to it, and the cone has no origin or placement stated on the giant. — Restate with a 2024 action-save clause naming the cone's origin. (about: "*Dexterity Saving Throw*: DC 18, each creature in a 30-foot Cone.")
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] lack took nothing: "understands no Common" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Gorrak Stonewold" — donor brute-9, CR 9
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 12 model call(s)
```

---

## 33. Reedtemple Warden — CR 5

**Input:** `lizardfolk monk`
**Donor:** skirmisher-3 -> CR 5
**Signature:** library · **elapsed** 31s

### Block
```
Reedtemple Warden
Medium humanoid, neutral
Armor Class

15

Hit Points: 

94 (21d8)

Speed: 

30 ft., climb 30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


10 (+0)

	

16 (+3)

	

10 (+0)

	

12 (+1)

	

14 (+2)

	

16 (+3)

Skills: 

Perception +5, Stealth +6

Saving Throws: 

DEX +6

Senses: 

passive Perception 15

Languages: 

Common plus one other language, Draconic

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Scales Remember the Blow.When the warden starts its turn with none of its movement used, its scales tighten against the coming rhythm, and it has advantage on the next saving throw it makes before the end of that turn.
Hold Breath.The warden can hold its breath for 15 minutes.
Marsh Stride.Difficult Terrain composed of mud doesn't cost the warden extra movement, and the warden can move across mud without needing to make an ability check.
Patient Defense (Bonus Action).The warden takes the Dodge action.

Actions
Multiattack: The warden makes two attacks, using Unarmed Strike or Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. Once on each of the warden's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of the warden's next turn.
Dart: Ranged Weapon Attack: +6 to hit, range 20/60 ft., one target. Hit: 12 (2d8 + 3) piercing damage.
```

### Trace
```
[concept] thin concept expanded before routing: lizardfolk monk — A lizardfolk monk opens a fight by circling and testing, letting its hide shrug off the first weak blows while it counts the enemy's rhythm, then commits to flurries of claw, tail, and bone-hardened fist aimed at joints and throats. Every round it takes the enemy's attack and gives
[concept] expansion answered: type=Humanoid (type_source=user) material=hide size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: —
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] skirmisher-skulker type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-skulker: ✓ ("letting its hide shrug off the first wea") | skirmisher-skulker: key "hide" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=bestial/armed mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: claw-and-tail flurry of blows [behavior] | patient counter-fighting discipline [behavior] | crocodilian scaled hide [body]
[concept] identity: A lizardfolk monk opens a fight by circling and testing, letting its hide shrug off the first weak blows while it counts the enemy's rhythm, then commits to flurries of claw, tail, and bone-hardened fist aimed at joints and throats. Every round it takes the enemy's attack and gives it back—catch the weapon-arm, trip with the tail, drive an elbow through the opening—fighting with a patient hunter's economy rather than berserk fury. Under pressure it stays calm and retreats only if the fight is truly lost, because a monk's discipline teaches that the one who controls breathing controls the kill.
[concept] lore: Born into a marsh tribe that reveres the old scaled masters, this lizardfolk trained in a hidden reed-temple where the martial arts were taught by something older than the tribe itself, and now hunts the wetlands as its order's silent enforcer—testing promising intruders and devouring the unworthy.
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon route: the Spy's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 5
[reskin] seats: action <- "claw-and-tail flurry of blows" | trait <- "crocodilian scaled hide"
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "lizardfolk monk" heads on the Spy — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] row evicted for the cap: Traits/"Reedstep" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Claw), Patient Defense (patient-defense)
[reskin] inline declared: "the warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the warden" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: retaliate — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "lizardfolk monk" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "When a creature within the warden's reach misses it with a melee attac" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The marsh reed-temple teaches that the hide remembers every blow it su" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: snare, shield-bash, random-ray, snare-bolt, blink, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, web-walker, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, life-drain
[reskin] signature idea (action): "When a creature within the warden's reach misses it with a melee attack, the warden reads the overextension and answers in the same breath: the attacker must make a Dexterity saving throw or be knocked Prone as the warden's tail hooks its stance or a hand traps the wrist and turns the momentum against it." [reaction/on_being_hit/condition] [family: sentinel] — menu: snap-shot, riposte, answering-strike (+ shelf: gaze-single, condition-payoff, throw-retrieve, lure, ground-burst, spew, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, feint-slip, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — retaliate: snap-shot, riposte, answering-strike
[reskin] menu ordered by the idea's stamps: action — idea fires on_being_hit/does condition; leading: snap-shot (on_being_hit/damage), riposte (on_being_hit/damage), answering-strike (on_being_hit/damage)
[reskin] word match declined by the call: condition-payoff, exploiter — the key word does not mean the mechanic here
[reskin] closest refused: action — "riposte" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: imposes a Dexterity save or Prone on the attacker who missed, instead )
[reskin] seat answered, but: the call said "When a creature within the warden's reach misses it with a melee attack, the warden reads the overextension and answers " is carried by "Read the Overextension", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("imposes a Dexterity save or Prone on the attacker who missed, instead ") and wrote a reaction instead: "Read the Overextension" -> Reactions. *Trigger:* A creature within the warden's reach misses the warden with a melee attack. *Response—Dexterity Saving Throw:
[reskin] authored row numbers: "Read the Overextension" — the call declared 1 number(s) promised
[reskin] seat takes its clause: "Read the Overextension" is HANDED "lizardfolk monk" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Reactions/"Read the Overextension" ("When a creature within the warden's reach misses it with a melee attack, the warden reads the overextension and answers in the same breath: the attacker must ma [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The marsh reed-temple teaches that the hide remembers every blow it survives: whenever the warden starts its turn with none of its movement used, its scales tighten against the coming rhythm and it has Advantage on the next saving throw it makes before the end of that turn." [trait/start_of_turn/defense] [family: body-reaction] — menu: spider-climb, phobia, terrain-walk, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial
[reskin] composed candidates: none trait — the body-reaction family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does defense; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), bloodied-fury (always/defense)
[reskin] word match declined by the call: evasion, bloodied-fury, spider-climb — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants Advantage on a saving throw when the creature has used none of )
[reskin] seat answered, but: the call said "The marsh reed-temple teaches that the hide remembers every blow it survives: whenever the warden starts its turn with n" is carried by "Scales Remember the Blow", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("grants Advantage on a saving throw when the creature has used none of ") and wrote a trait instead: "Scales Remember the Blow" -> Traits. When the warden starts its turn with none of its movement used, its scales tighten against the coming rhythm, and it has
[reskin] authored row numbers: "Scales Remember the Blow" — the call declared 0 number(s) promised
[reskin] free signature row: "Scales Remember the Blow" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Scales Remember the Blow" is HANDED "lizardfolk monk" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Scales Remember the Blow" ("The marsh reed-temple teaches that the hide remembers every blow it survives: whenever the warden starts its turn with none of its movement used, its scales tig [authored: the catalog held no shape for it]")
[reskin] weapons answered: Claw = none; Tail Lash = none
[reskin] weapon table: "Tail Lash" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Spy's own type stands
[reskin] print canon languages: "Common, Draconic" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon rider stays: "Claw" -> "Shortsword": the Stunned clause is the monk kit's, not the chassis's — on a class body the kit owns the class's rows
[reskin] print canon attack: "Claw" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Tail Lash" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row withheld: Bonus Actions/Cunning Action — the Spy's own, but the catalog gives it to the rogue and this sheet is a monk
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free row over budget: Reactions/"Read the Overextension" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Scales Remember the Blow" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Scales Remember the Blow carries "patient counter-fighting discipline" — "When the warden starts its turn with none of its movement used, its scales tight"
audit finding below confidence gate: Unarmed Strike The Stunned condition is imposed by a failed save with a fixed end at the end of the warden's next turn, so the target has no repeat save, no escape clause, and no agency to end it before that time.
[reskin] audit: [Scales Remember the Blow: The trigger requires the…d, its scales tighten against the coming rhythm"), Scales Remember the Blow: The name promises a coun…ving throw it makes before the end of that turn")]
[reskin] audit rename blocked — "Scales Remember the Blow" -> "Tightened Scales" would drop the GM's own word "blow"
[reskin] audit defect: Traits/"Scales Remember the Blow" [model-written] high untrackable — The trigger requires the table to verify that the warden has used zero movement at the instant its turn begins, a state the block gives no way to track and which normally cannot be true since movement is what opens a turn. — Reword the trigger to a condition that is checkable at the start of the turn without reconstructing prior movement. (about: "When the warden starts its turn with none of its movement used, its scales tighten against the coming rhythm")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Hold Breath" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] clause id by substring: "Marsh Stride" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] clause id by substring: "Unarmed Strike" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] clause id by substring: "Patient Defense" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] species kit: Swim 30 ft. — a lizardfolk's own
[reskin] done: "Reedtemple Warden" — donor skirmisher-3, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 12 model call(s)
```

---

## 34. Krennik Skullstandard — CR 4

**Input:** `name: Krennik Skullstandard | riding a worg`
**Donor:** skirmisher-3-mounted -> CR 4 (invented — no printed peer)
**Signature:** library · **elapsed** 34s

### Block
```
Krennik Skullstandard
Medium humanoid, neutral evil
Armor Class

14 (leather)

Hit Points: 

78 (12d8 + 24)

Speed: 

50 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

16 (+3)

	

14 (+2)

	

15 (+2)

	

12 (+1)

	

15 (+2)

Skills: 

Perception +3, Stealth +5

Saving Throws: 

DEX +5

Senses: 

passive Perception 13

Languages: 

Common, Goblin

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Skirmish Rider.Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility (Bonus Action).Krennik takes the Dash or Disengage action.
Rampage (1/Day) (Bonus Action).Immediately after dealing damage to a creature that is already below half its hit point maximum, Krennik moves up to half its Speed, and it makes one Saber attack.

Actions
Multiattack: Krennik makes two attacks, using Saber or Javelin.
Saber: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) slashing damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.
Riding Down (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters must make a DC 13 Dexterity saving throw, taking 24 (7d6) bludgeoning damage on a failed save. On a failed save, the target is also knocked prone.
```

### Trace
```
[path] homebrew — "riding a worg" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] name: "Krennik Skullstandard" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/bestial mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Krennik Skullstandard"
[concept] mechanics: none claimed
[concept] signature elements: mounted charge that carries past the target [behavior] | worg mount snapping and harrying [body] | iron-shod standard and scuffed plate [object]
[concept] identity: Krennik opens at a gallop, worg surging past the front line to ride down the softest target in a single momentum-carrying pass, then wheels and circles just outside reach, letting the beast snap and harry while he repositions. Every round he strikes from motion, never standing still, using the worg's speed to choose the angle and the moment. Under pressure he fights to the death with disciplined, snarling aggression, but he is no fool; if the mount goes down, he drops into a vicious, calculating melee rather than flee.
[concept] lore: A scarred standard-bearer from a broken warband, Krennik rides his worg from one plundered hamlet to the next, trading the beast's kills for the fear that keeps him fed.
[reskin] mind tier held: WIS stays 12 against "ordinary" — the card's 12 is already ordinary
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 4
[reskin] mind tier: CHA 8 -> 15 — the call read this creature as capable at CR 4
[reskin] donor: skirmisher-3-mounted -> CR 4 (invented — no printed peer)
[reskin] seats: package <- "iron-shod standard and scuffed plate"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] proper noun: "Krennik Skullstandard" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Krennik" — the call's own answer (person), built from the name
[reskin] inline form: "Krennik" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Krennik Skullstandard — riding a worg" -> has (mechanical) [asked: movement]
[reskin] open asks handed to the idea call: "Krennik Skullstandard — riding a worg"
[reskin] idea anchored: action — "When Krennik wheels his worg to bear down on a creature that is alread" answers the GM's "Krennik Skullstandard — riding a worg"
[reskin] idea unanchored: trait — "The standard is planted in Krennik's stirrup-iron and never leaves his" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 24 of 24 answered; not true of this body: snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "Krennik Skullstandard — riding a worg", so role and style do not filter the menu (legality still does); 6 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] condition rider rides the attack: action — the payoff family composes a rider, so the idea is re-seated action/save -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (action): "When Krennik wheels his worg to bear down on a creature that is already Prone, he levels the iron-shod butt of his standard and slams it down as he passes; the target must succeed on a Strength saving throw or have the Prone condition and be unable to stand until the end of its next turn as the shaft pins it." [rider/on_hit/condition] [family: payoff] — menu: affliction, contagion, isolation, bolt-mark, bolt-restrain, bolt-drag (+ shelf: condition-payoff, throw-retrieve, lure, sensory-strike, disarm, delayed-brand, exploiter, execute, pacify, escalating-dread, terror-pulse, slow-bolt, curse-debt, reveal, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, lay-on-hands, snap-shot, riposte, answering-strike)
[reskin] composed candidates on the menu: action — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), bolt-mark (on_hit/condition)
[reskin] classification handed to the fit call: shape=movement
[reskin] word match declined by the call: affliction, contagion, bolt-restrain, bolt-mark, composed:payoff:condition, exploiter, condition-payoff, bolt-drag — the key word does not mean the mechanic here
[reskin] closest refused: action — "composed:payoff:condition" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: pins an already-Proone target so it cannot stand until the end of its )
[reskin] seat authoring refused: action — the authored row imposes Prone, which two rows on this sheet already impose, and no printed block imposes one condition three ways (0 of 329)
[reskin] seat asked again: action — the first answer was refused (the row imposes a condition two rows on this sheet already impose); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "When Krennik wheels his worg to bear down on a creature that is alread" and wrote no row of that kind
[reskin] seat refused twice: action — first: the row imposes a condition two rows on this sheet already impose; second: you wrote no row of the kind asked for (an action); the seat stays empty
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When Krennik wheels his worg to bear down on a creature that is already Prone, he levels the iron-shod butt of his standard and slams it down as he passes; the target must succeed on a Strength saving throw or have the Prone condition and be unable to stand until the end of its next turn as the shaft pins it." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, bolt-mark, bolt-restrain, composed:payoff:condition, isolation, bolt-drag, exploiter, condition-payoff, execute)
[reskin] fallback respects the call: condition-payoff, exploiter left the shelf — the call declined them for this sheet
[reskin] value check: "Rampage (1/Day)" EV 8.5 vs floor 1.6 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The standard is planted in Krennik's stirrup-iron and never leaves his grip; while he is mounted, creatures that start their turn within reach of the fluttering, bloodied banner must succeed on a Wisdom saving throw or have the Frightened condition until the start of their next turn, the beast's snarl carrying the fear of every hamlet he has burned." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: shape=movement
[reskin] word match declined by the call: truth-aura, composed:zone:condition:poisoned, composed:zone:condition:deafened, composed:zone:condition:blinded — the key word does not mean the mechanic here
[reskin] trait declined: "Skull Standard" — no receipt of any kind: no quote, no concept key, and the call named none of this creature's own elements for it (decoration, not a signature)
[reskin] weapons answered: Saber = scimitar; Javelin = javelin; Riding Down = none
[reskin] weapon dice follow the weapon: "Javelin" is a javelin (d6) — "7 (1d8 + 3)" becomes "6 (1d6 + 3)", print's rule of keeping the die and scaling the count
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Riding Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] name-canon stands down: the path answered homebrew on "riding a worg" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget by card size: CR 4 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] save re-derived after a retype: Actions/Riding Down — a Strength save for a condition the row IMPOSES, which calls for Dexterity or Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
audit finding below confidence gate: Riding Down The row is written as Krennik himself stampeding over creatures, but the creature is a mounted rider whose own body is assumed to be carried by a mount — a Humanoid on foot 'riding down' targets by bodily passing through their spaces makes no sense as written, and nothing in the block gives Krennik a mount or mount's movement to justify it.
audit finding below confidence gate: Riding Down Adjudicating this requires tracking the exact path of a 50-foot move square by square and remembering which spaces were entered — state the block gives no way to track and that a GM cannot reliably resolve in a turn.
audit finding below confidence gate: Mounted Agility The payload is a plain Dash/Disengage with no mount, no rider benefit, and no synergy with the block's mounted fiction — as a bonus action it lacks anything that reflects 'mounted agility' specifically, so it is a generic mobility row wearing a mount name.
[reskin] audit: [Galloping Charge: Ignore-Difficult-Terrain is pres…ger. (about: "Krennik ignores Difficult Terrain")]
[reskin] audit rename: "Galloping Charge" -> "Skirmish Rider"
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Rampage (1/Day)) — the sameness metric
[reskin] [gap] pins an already-Proone target so it cannot stand until the end of its next turn (a stand-up lock keyed to Prone), rather — "When Krennik wheels his worg to bear down on a creature that is already Prone, he levels the iron-shod butt of his standard and slams it down as he passes; the target must succeed on a Strength saving throw or have the Prone condition and be unable to stand until the end of its next turn as the shaft pins it." — Krennik Skullstandard [seat: action [rider/on_hit/condition]] (closest offered: composed:payoff:condition) [effect: condition] [menu: affliction contagion bolt-mark bolt-restrain composed:payoff:condition isolation bolt-drag exploiter condition-payoff execute] [same-cell unoffered: stunning-strike pounce life-drain snatch] [same-seat rejected: stunning-strike:cr-range charge-push:condition-three-ways hook-rider:body-verdict pounce:condition-three-ways life-drain:body-verdict snatch:movement charge:condition-three-ways] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 1 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Krennik Skullstandard" — donor skirmisher-3-mounted, CR 4
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 12 model call(s)
```

---

## 35. Thing in the Well — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** dropped · **elapsed** 26s

### Block
```
Thing in the Well

Large Aberration, Unaligned

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
16
+3
+6
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
15
+2
+2
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

Skills Athletics +6, Perception +5

Immunities Cold

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Tremor Sense. The thing can pinpoint the location of disturbances in water within 60 feet of itself.

Actions

Multiattack. The thing makes two Tendril attacks. It can replace one attack with a use of Wellwater Drag.

Tendril. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Wellwater Drag. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a creature, it is subjected to the following effect. Strength Saving Throw: DC 13. Failure: The target has the Grappled condition (escape DC 14), and the target is pulled up to 5 feet straight away from the creature.

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

### Trace
```
[concept] thin concept expanded before routing: the thing in the well — The thing in the well waits below the waterline, patient and unseen, and opens a fight by seizing whatever limb or rope dips too close and hauling it under. Every round after it drags prey toward the flooded dark, coiling and crushing and drowning more than it bites, and it n
[concept] expansion answered: type=Aberration (type_source=inferred) material=brine size=Large mind=bestial
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] homebrew — "the thing in the well" (call)
[route] brute-grappler type=Aberration mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered reach but quoted "seizing whatever limb or rope ", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("coiling and crushing and drowning more t") | brute-grappler stands on the homebrew path: the call ranked it and quoted "coiling and crushing and drowning more t" — the key "unseen" is the menu, not the decision (step 7) | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Aberration typeFrom=the route call themes=aquatic/grasping mind=bestial style=grappler energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: dragging prey down into the flooded well [behavior] | a cold brine-wet body half-seen below the water [body] | the deep well itself as its lair [aura]
[concept] identity: The thing in the well waits below the waterline, patient and unseen, and opens a fight by seizing whatever limb or rope dips too close and hauling it under. Every round after it drags prey toward the flooded dark, coiling and crushing and drowning more than it bites, and it never leaves the water to chase — but a wounded well-thing will not surface to be killed, instead sinking deep, releasing its grip, and waiting wet and silent for the next hand that reaches down.
[concept] lore: Something drowned in the well long ago and refused to stay drowned, and now the water remembers the shape of a hunger and pulls down whatever leans too near the rim.
[reskin] mind tier held: INT stays 4 against "ordinary" — the call read this creature as bestial, so only "feeble" could lower its INT
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 5
[reskin] donor: brute-5-grappler -> CR 5
[reskin] seats: action <- "dragging prey down into the flooded well" | trait <- "a cold brine-wet body half-seen below the water"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Whelm — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the thing" — the call answered "the well-thing" (kind), which the name does not support
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral" -> Unaligned — a Aberration the call reads as bestial at INT 4 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (mechanical) [asked: save_single] [askMechanic: grapple]
[reskin] answered by the chassis: "the thing in the well" asks grapple and "Tendril" already carries it (declared imposes) — no row is requested for it, and the row now carries the GM's words
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The thing's tendril lashes out at a creature within reach, and on a hi" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The thing has no eyes that see above the waterline, but it feels every" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: shield-bash, active-toll, random-ray, herd, shell-withdraw, rally, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, aberrant-ground, faultless-tracker, web-walker, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial
[reskin] engulf engine withheld: Bonus Actions/"Whelm" leaves — the route call read this creature's hold as unanswered, not contain; the grapple stands and citations of the row are swept
[reskin] menu pruned: action — push-prone, exploiter (the sheet cannot render them)
[reskin] signature idea (action): "The thing's tendril lashes out at a creature within reach, and on a hit the target is snared and hauled toward the well-thing before being Grappled by it — the water remembers the shape of a hunger and reels its catch in." [rider/on_hit/movement] [family: drag] — menu: stunning-strike, charge-push, hook-rider, pounce, life-drain (+ shelf: leap, condition-payoff, ground-burst, spew, escalating-dread, terror-pulse, thrown-burst-seed, drain, wind-up, trample, gaze-single, snare, execute, seal, lure, second-wind, aggro-curse, self-invisibility, focus, coating, answering-strike)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — grapple: hook-rider
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does movement; leading: hook-rider (on_hit/movement), charge-push (on_hit/movement), stunning-strike (on_hit/condition)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=save_single
[reskin] word match declined by the call: hook-rider, charge-push, pounce, drain — the key word does not mean the mechanic here
[reskin] closest refused: action — "hook-rider" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a saving throw that drags the target in and grapples or engulfs it)
[reskin] clause already answered: "the thing in the well" is carried by "Wellwater Drag" — the seat read the sheet and declined to write a second row for it
[reskin] strike written from its attack: "Wellwater Drag" clones "Tendril" and adds a Strength save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] value check: "Wellwater Drag" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Wellwater Drag" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The thing has no eyes that see above the waterline, but it feels every disturbance in the flooded dark — it knows the exact location of any creature touching or moving in water within its reach, and has Advantage on attacks against such a creature. It cannot see a target that is dry and still." [trait/always/condition] [family: sentinel] — menu: spider-climb, phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (always/condition): phobia, berserk; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), berserk (always/condition), spider-climb (always/movement)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=save_single
[reskin] word match declined by the call: phobia, berserk, spider-climb, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, energy-aura — the key word does not mean the mechanic here
[reskin] free signature row: trait — "uncanny-sense" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "a cold brine-wet body half-seen below the water" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Tremor Sense" — the trait seat cannot quote the GM, but the call names the element it expresses: "a cold brine-wet body half-seen below the water". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): uncanny-sense -> Traits/"Tremor Sense" ("It feels every disturbance in the flooded dark — it knows the exact location of  [shape fit, no verb match]")
[reskin] weapons answered: Tendril = none
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] element immunity: Cold — the call read this creature's energy as Cold and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Cold (merged into the header write)
[reskin] immunities stamped for type: Aberration -> Cold
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Wellwater Drag.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Tremor Sense" [trait/always/defense]
[reskin] save stat from print grammar: Actions/Wellwater Drag imposes Grappled by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] lint: 0 findings
[reskin] element expressed: Tremor Sense carries "a cold brine-wet body half-seen below the water" — "The thing can pinpoint the location of disturbances in water within 60 feet of i"
[reskin] audit: [Wellwater Drag: A well-dweller dragging prey into …ed up to 5 feet straight away from the creature"), Tremor Sense: The creature has Tremor Sense only f… disturbances in water within 60 feet of itself")]
[reskin] audit defect: Actions/"Wellwater Drag" [model-written] high misnamed — A well-dweller dragging prey into the well should pull it toward itself and down, not push it 5 feet away, so the name and the mechanic describe opposite actions. — Rewrite the forced movement to pull the target toward the creature (into the water) rather than away. (about: "the target is pulled up to 5 feet straight away from the creature")
[reskin] audit defect: Traits/"Tremor Sense" [model-written] medium other — The creature has Tremor Sense only for water, but it is a land-speed creature with no requirement or trait linking it to being in water, so the sense is dead on dry ground and gives no general tremor detection; as written it is a water-only blindsight with no statement of what happens out of water. — State the sense's medium explicitly (e.g. it only functions while the creature or target is in water) or broaden it to a standard Tremor Sense that works regardless of medium. (about: "pinpoint the location of disturbances in water within 60 feet of itself")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] record completed: "Wellwater Drag" imposes Grappled by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] done: "Thing in the Well" — donor brute-5-grappler, CR 5
[harness] recorded 10 model call(s)
```

---

## 36. Sorrowstone Coil — CR 4

**Input:** ` | role: brute`
**Donor:** brute-5-grappler -> CR 4
**Signature:** dropped · **elapsed** 33s

### Block
```
Sorrowstone Coil

Large Construct, Lawful Good

AC 14
Initiative -1 (9)

HP 85 (10d10 + 30)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
18
+4
+6
INT
15
+2
+2
MOD
SAVE
DEX
8
-1
-1
WIS
18
+4
+4
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

Skills Athletics +6, Perception +6

Immunities Acid, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 16

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Silent Ribs. While in water or dim light, the sorrowstone coil has Advantage on Dexterity (Stealth) checks, and a creature it surprises does not start combat with a Reaction.

Actions

Multiattack. The sorrowstone coil makes two Gray Coil attacks. It can replace one attack with a use of Granite Manacle.

Gray Coil. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Granite Manacle. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage. If the target is a creature, it is subjected to the following effect. Strength Saving Throw: DC 13. Failure: The target has the Grappled condition (escape DC 14).

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

### Trace
```
[path] blank — "role: brute" (code)
[route] brute-grappler type=Construct mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "the coils closing without warning" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("one crushing coil of its stone tail") | brute-grappler: no line key in the words — the model's read of its quote
[concept] synthesis (blank roll): archetype=brute type=Construct themes=aquatic/mind mind=sapient style=grappler lore=✓
[concept] synthesis text: A single serpent-thin being sheathed in slick living granite, the Klythrax glides through drowned temple halls like an eel of quarried rock, its ribs jointed stone plates sliding over one another and its flat jawless face lit by two pale lamp-like eyes that read the intentions of whoever enters. It tests a traveler with one crushing coil of its stone tail, and if respect is shown it withdraws into the flooded dark; those who raise steel or lie to its face find the coils closing without warning and the blunt anvil of its head driving down again and again. When bloodied it does not flee but sinks motionless into the murk at the temple's threshold, patient and enduring, waiting out the fight or the trespasser's nerve. It is fully sapient (INT 10-14), and it is a benevolent warden sworn to protect travelers who show respect.
[concept] signature elements: crushing stone coil [behavior] | jointed granite rib-plates [body] | pale lamp-eye judgment [aura]
[concept] name proposal: Grymhath
[concept] lore: Bound to the sunken temple by an oath older than the water that drowned it, the Grymhath coils through the nave and has no wish but this — that every traveler who passes with courtesy pass safely, and every despoiler not pass at all.
[reskin] mind tier: INT 4 -> 15 — the call read this creature as capable at CR 4
[reskin] mind tier: WIS 10 -> 18 — the call read this creature as formidable at CR 4
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 4
[reskin] donor: brute-5-grappler -> CR 4
[reskin] seats: package <- "jointed granite rib-plates"
[reskin] [path] decides: blank (the matcher would have said homebrew)
[reskin] repair round 1: 1 defect(s) — name "Gray Coil" repeats the creature's own name — the sheet already says who acts; give the row its own word
[reskin] repair round 2: 1 defect(s) — name "Gray Coil" repeats the creature's own name — the sheet already says who acts; give the row its own word
[reskin] type stamped: the resolve said Construct — the model answered Aberration
[reskin] engulf engine: Entomb — the body's own verb
[reskin] engine interior scaled — CR 4 sits below the brute-5-grappler seat
[reskin] class kit: none — the blank path takes no class kit
[reskin] inline declared: "the sorrowstone coil" — the call's own answer (kind), built from the name
[reskin] inline form: "the sorrowstone coil" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: 
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "When the sorrowstone coil hits with a Gray Coil attack, its jointed ri" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The jointed granite rib-plates of the sorrowstone coil slide over one " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, sealed-body, relic-object, mimicry, gaze-aura, death-burst, kill-denial, life-drain
[reskin] engulf engine withheld: Bonus Actions/"Entomb" leaves — the route call read this creature's hold as grip, not contain; the grapple stands and citations of the row are swept
[reskin] menu pruned: action — push-prone, exploiter (the sheet cannot render them)
[reskin] signature idea (action): "When the sorrowstone coil hits with a Gray Coil attack, its jointed rib-plates lock around the wound like a quarried manacle: the target must make a Constitution saving throw or have the Grappled condition from an impossible angle, its arms pinned even as it is held, and while Grappled this way it cannot take Reactions or speak. It is not the coil's tail holding them — it is a bar of living granit" [rider/on_hit/condition] [family: mark] — menu: charge-push, hook-rider, pounce (+ shelf: leap, condition-payoff, ground-burst, escalating-dread, terror-pulse, thrown-burst-seed, wind-up, second-wind, aggro-curse, self-invisibility, focus, coating, answering-strike)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — grapple: hook-rider
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: hook-rider (on_hit/movement), pounce (on_hit/condition), charge-push (on_hit/movement)
[reskin] classification handed to the fit call: mechanic=grapple, engulf
[reskin] word match declined by the call: hook-rider, charge-push, thrown-burst-seed, wind-up — the key word does not mean the mechanic here
[reskin] closest refused: action — "pounce" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an on-hit save that grapples the target and stops it speaking or takin)
[reskin] seat answered, but: the call said "When the sorrowstone coil hits with a Gray Coil attack, its jointed rib-plates lock around the wound like a quarried man" is carried by "Granite Manacle", and no such row is on this sheet — the clause stays open
[reskin] strike written from its attack: "Granite Manacle" clones "Gray Coil" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] value check: "Granite Manacle" EV 7.7 vs floor 7.3 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Granite Manacle" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The jointed granite rib-plates of the sorrowstone coil slide over one another without sound, so it can move through water or along a flooded ledge without disturbing the surface, and creatures that cannot see it in the murk gain no warning of its approach — it has Advantage on Dexterity (Stealth) checks made in water or dim light, and a creature it surprises does not start combat with a Reaction." [trait/always/movement] [family: breach] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/movement): terrain-walk, relentless-pursuit, bound; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] classification handed to the fit call: mechanic=grapple, engulf
[reskin] word match declined by the call: terrain-walk, relentless-pursuit, bound — the key word does not mean the mechanic here
[reskin] closest refused: trait — "terrain-walk" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants Advantage on Stealth in water or dim light and strips the React)
[reskin] seat answered, but: the call said "The jointed granite rib-plates of the sorrowstone coil slide over one another without sound, so it can move through wate" is carried by "Silent Ribs", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("grants Advantage on Stealth in water or dim light and strips the React") and wrote a trait instead: "Silent Ribs" -> Traits. While in water or dim light, the sorrowstone coil has Advantage on Dexterity (Stealth) checks, and a creature it surpris
[reskin] authored row numbers: "Silent Ribs" — the call declared 0 number(s) promised
[reskin] free signature row: "Silent Ribs" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Silent Ribs" ("The jointed granite rib-plates of the sorrowstone coil slide over one another without sound, so it can move through water or along a flooded ledge without distu [authored: the catalog held no shape for it]")
[reskin] weapons answered: Gray Coil = none; Reading Glare = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Acid — the call read this creature's energy as Acid and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Construct -> Acid, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered blank on "role: brute" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Granite Manacle.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Silent Ribs" [no template]
[reskin] save stat from print grammar: Actions/Granite Manacle imposes Grappled by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] save re-derived after a retype: Actions/Granite Manacle — a Constitution save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] element claim revoked: "Silent Ribs" claims "jointed granite rib-plates" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Silent Ribs")
audit span not verbatim, dropped: Granite Manacle it has the Grappled condition (escape DC 14)
[reskin] audit: [Silent Ribs: The clause strips a target's Reaction…surprises does not start combat with a Reaction"), Silent Ribs: It grants Stealth Advantage to a crea…oil has Advantage on Dexterity (Stealth) checks")]
[reskin] audit defect: Traits/"Silent Ribs" [model-written] medium open_ended — The clause strips a target's Reaction with no save, no duration, and no end condition, and 'surprises' is a state the GM must infer outside combat while a Reaction is only usable in combat — so the effect cannot be reliably adjudicated or exited. — Scope it to the first round of combat and give the surprise an in-rules definition (e.g. a creature the coil is hidden from), rather than a combat-crossing ban on Reactions. (about: "a creature it surprises does not start combat with a Reaction")
[reskin] audit defect: Traits/"Silent Ribs" [model-written] low undelivered — It grants Stealth Advantage to a creature whose granite body the name and fiction present as ribbed and resonant, but nothing — no dim-light source, no water placement guidance — tells the GM when the condition is true on a battle map; the trait gives a benefit with no lever the table can pull and no expression of the rib-plates it is named for. — Tie the trigger to a condition the GM can declare on the sheet (e.g. submerged, or in dim light with the coil considered to make no sound), and let the rib-plates do at least one mechanical thing. (about: "While in water or dim light, the sorrowstone coil has Advantage on Dexterity (Stealth) checks")
[reskin] clause unresolved: "Silent Ribs" carries "The jointed granite rib-plates of the sorrowstone coil s", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 1 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path blank
[reskin] record completed: "Granite Manacle" imposes Grappled by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] done: "Sorrowstone Coil" — donor brute-5-grappler, CR 4
[harness] recorded 12 model call(s)
```

---

## 37. Meshrin — CR 8

**Input:** `name: Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points.`
**Donor:** skirmisher-8-hurler -> CR 8 (invented — no printed peer)
**Signature:** library · **elapsed** 31s

### Block
```
Meshrin
Large humanoid, neutral
Armor Class

16 (breastplate)

Hit Points: 

120 (14d10 + 42)

Speed: 

30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

15 (+2)

	

16 (+3)

	

10 (+0)

	

12 (+1)

	

15 (+2)

Skills: 

Perception +4, Stealth +5

Saving Throws: 

DEX +5, WIS +4

Senses: 

passive Perception 14

Languages: 

Common, Draconic

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Wounded Frenzy.While below half its hit point maximum, Meshrin has advantage on attack rolls and saving throws.
Hold Breath.Meshrin can hold its breath for 15 minutes.
Great Weapon Master.When Meshrin hits a creature with its Greataxe, the attack deals an extra 3 damage.
Marsh Stride.Difficult Terrain composed of mud doesn't cost Meshrin extra movement, and Meshrin can move across mud without needing to make an ability check.
Parry (Reaction).When Meshrin is hit by a melee attack roll while holding a weapon, Meshrin adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Frightening Roar.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 18 (4d6 + 4) piercing damage.
Frightening Roar: Each creature of Meshrin's choice in a 30-foot radius originating from Meshrin that can see or hear it must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

### Trace
```
[path] class_npc — class barbarian — species lizardfolk — "barbarian" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("a javelin for the throw") | skirmisher-hurler: key "throw" (class verb)
[concept] name: "Meshrin" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("a javelin for the throw")
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=bestial/armed mind=sapient style=hurler energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Meshrin"
[concept] mechanics: thrown-weapon
[concept] signature elements: frightening roar [behavior] | raging barbarian greatswing [behavior] | thrown javelin [object]
[concept] identity: Meshrin opens by hurling a javelin as he closes, then plants himself in the middle of the fight and stays there — greataxe two-handed, rage burning, trading blows until the ground is red. Every round he picks the biggest threat within reach and commits, roaring to break the nerve of the rest; wounded and bloodied he doesn't retreat, he gets angrier, and he fights to the death rather than yield.
[concept] lore: A scaled berserker of the marsh warbands, Meshrin fights for plunder and the renown of his own terrifying name, and will not leave a field while there is still someone standing to hear his roar.
[reskin] energy withheld: Thunder on a Humanoid with no Thunder in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: skirmisher-8-hurler -> CR 8 (invented — no printed peer)
[reskin] seats: package <- "frightening roar"
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "Meshrin — Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Frightening Roar" deals Thunder on a Humanoid whose concept names no Thunder — a name is not a warrant; use a physical type
[reskin] named parts: Greataxe (slot), Javelin (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Great Weapon Master (trait), Slow on Javelin — the feature table, no call
[reskin] row evicted for the cap: Traits/"Marsh Stride" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "barbarian": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "barbarian": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] proper noun: "Meshrin" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Meshrin" — the call's own answer (person), built from the name
[reskin] inline form: "Meshrin" — the model's own reading of the name
[reskin] returning clause dropped: "Javelin" throws a javelin — the call did not say this projectile is a single object the creature must recover (projectile_supply: ambient), so it stays where it lands; print writes a returning weapon 4 times in 1291 rows
[reskin] energy withheld on a base row: "Frightening Roar" Thunder -> Bludgeoning (the body's physical type; a Humanoid deals no Thunder its concept never gave it)
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] final price: the chassis's Multiattack: the round ran 39 against the card's 54 — the attack rows re-solve at 138% (3 attacks on an authored sheet, under the card)
[reskin] the sheet's declared ask: fear — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Meshrin — Large lizard folk" -> has (header) | "30 feet of movement" -> has (header) | "Wields a greataxe two-handed" -> has (mechanical) [asked: attack] | "a javelin for the throw" -> has (mechanical) [asked: attack] | "He is a barbarian who rages" -> has (mechanical) [asked: when_bloodied/buff_self] [askMechanic: escalate] | "Give him a frightening roar" -> has (mechanical) [asked: condition] [askMechanic: fear] | "AC 16" -> has (header) | "120 hit points" -> has (header)
[reskin] extraction: 1 of 9 model clauses quote nothing the user typed and leave the record ("AC 16")
[reskin] open asks handed to the idea call: "Give him a frightening roar" [fear]
[reskin] idea anchored: action — "Meshrin looses a bone-shaking roar that rolls out from him in an emana" answers the GM's "Give him a frightening roar"
[reskin] idea unanchored: trait — "The marsh warband's cry carries: when Meshrin reduces a creature to 0 " names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 26 of 26 answered; not true of this body: snare, shield-bash, snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "Give him a frightening roar", so role and style do not filter the menu (legality still does); 13 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed, push-prone (the sheet cannot render them)
[reskin] signature idea (action): "Meshrin looses a bone-shaking roar that rolls out from him in an emanation. Each creature of his choice in it must make a Wisdom saving throw; on a failure it has the Frightened condition until the end of its next turn, and while Frightened this way it can't willingly move closer to him." [action/save/condition] [family: nova] — menu: condition-payoff, throw-retrieve, lure, sensory-strike, disarm, exploiter, execute, pacify, escalating-dread, terror-pulse, slow-bolt, curse-debt, reveal (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, rampage, lay-on-hands, rally, snap-shot, riposte, answering-strike, affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark, bolt-restrain, bolt-drag, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — fear: escalating-dread, terror-pulse
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), lure (save/condition)
[reskin] keys would have bound: action — terror-pulse, throw-retrieve, rampage (roar, javelin, rage)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=condition
[reskin] word match declined by the call: escalating-dread, lure, sensory-strike, pacify, exploiter, reveal, condition-payoff, disarm, execute, slow-bolt, curse-debt, throw-retrieve — the key word does not mean the mechanic here
[reskin] signature template: terror-pulse -> Actions/"Frightening Roar (2/Day)" ("Meshrin looses a bone-shaking roar that rolls out from him in an emanation; each [verb: roar:concept]")
[reskin] keys spent by the action: roar
[reskin] signature idea (trait): "The marsh warband's cry carries: when Meshrin reduces a creature to 0 hit points, he lets out a triumphant …, and each enemy that can hear him must make a Wisdom saving throw or have the Frightened condition until the end of its next turn." [trait/always/condition] [family: kill-growth] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial
[reskin] composed candidates: none trait — the kill-growth family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — fear: phobia, fear-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), fear-aura (start_of_turn/condition), berserk (always/condition)
[reskin] keys would have bound: trait — fear-aura (frightens, frightening)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=condition
[reskin] word match declined by the call: phobia, berserk, kill-denial — the key word does not mean the mechanic here
[reskin] closest refused: trait — "fear-aura" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a trigger that fires when Meshrin drops a foe to 0 HP and forces nearb)
[reskin] seat answered, but: the call said "The marsh warband's cry carries: when Meshrin reduces a creature to 0 hit points, he lets out a triumphant …, and each e" is carried by "Triumphant Cry", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The marsh warband's cry carries: when Meshrin reduces a creature to 0 " and wrote no row of that kind (refused: "Triumphant Cry" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Triumphant Cry" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] seat answered, but: the call said "The marsh warband's cry carries: when Meshrin reduces a creature to 0 hit points, he lets out a triumphant …, and each e" is carried by "Triumphant Cry", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The marsh warband's cry carries: when Meshrin reduces a creature to 0 " and wrote no row of that kind
[reskin] seat refused twice: trait — first: "Triumphant Cry" — a trait is not a save — the save form takes stat, target and effect as ; second: you wrote no row of the kind asked for (a trait); the seat stays empty
[reskin] the declared ask's own template lands: trait — the sheet's declared ask is "fear", the seat that carries it ended with no row, and "fear-aura" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] trait ceiling: "Triumphant Roar" does not ship — 4 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Greataxe = greataxe; Javelin = javelin; Javelin Volley = javelin
[reskin] weapon dice follow the weapon: the GM's "Greataxe" is a greataxe (d12) — "17 (3d8 + 4)" becomes "17 (2d12 + 4)"
[reskin] weapon dice follow the weapon: the GM's "Javelin" is a javelin (d6) — "17 (3d8 + 4)" becomes "18 (4d6 + 4)"
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Javelin Volley (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Gladiator's own type stands
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Draconic" -> "Common, Draconic" — the Gladiator's plus the concept's Draconic
[reskin] print canon: chassis row leaves — Actions/"Javelin Volley (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] print canon row: Reactions/Parry — the Gladiator's own
[reskin] class weapon: Actions/"Shield Bash" leaves with the shield — a greataxe is two-handed and print pairs a shield with no heavy melee weapon (0 of 329 gear lines)
[reskin] class weapon: "greataxe" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] dead control row: "Frightening Roar" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Frightening Roar.
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 8 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Frightening Roar" answers "Give him a frightening roar" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "He is a barbarian who rages" asked for when_bloodied and no row binds the clause
[reskin] lint: 0 findings
audit finding below confidence gate: Hold Breath Hold Breath is a swimmer's/amphibian's trait, but Meshrin is a lizardfolk barbarian with no swim Speed, water action, or aquatic anything in the block, so the trait sits on the sheet without a use the GM can ever reach.
[reskin] audit: [Parry: Parry requires holding a weapon, but Meshri…able condition. (about: "while holding a weapon"), Frightening Roar: The success clause refers to 'th… immune to this creature's terror for 24 hours.")]
[reskin] audit defect: Reactions/"Parry" [print] medium untrackable — Parry requires holding a weapon, but Meshrin wields a greataxe two-handed and throws javelins, and nothing on the sheet ever states he is armed or lets the trigger be checked once a javelin has been thrown; the trigger references a state the block never establishes. — State in the trigger that Meshrin is holding his greataxe (or a melee weapon) so the GM has a concrete, checkable condition. (about: "while holding a weapon")
[reskin] audit defect: Actions/"Frightening Roar" [catalog] medium dead_reference — The success clause refers to 'this creature's terror' rather than naming the entry, and 'this creature' is a generic catalog referent that does not match Meshrin by name, so the effect being made immune is only inferable. — Name the ability directly in the success line so the immunity has an unambiguous referent. (about: "The target is immune to this creature's terror for 24 hours.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Bloodied Frenzy" carries "barbarian" which is not a whole clause — the seat surgery cut it; resolved to cl_jeugdk
[reskin] clause id by substring: "Hold Breath" carries "barbarian" which is not a whole clause — the seat surgery cut it; resolved to cl_jeugdk
[reskin] clause id by substring: "Marsh Stride" carries "barbarian" which is not a whole clause — the seat surgery cut it; resolved to cl_jeugdk
[reskin] [gap] a trigger that fires when Meshrin drops a foe to 0 HP and forces nearby enemies to save or be Frightened — "The marsh warband's cry carries: when Meshrin reduces a creature to 0 hit points, he lets out a triumphant …, and each enemy that can hear him must make a Wisdom saving throw or have the Frightened condition until the end of its next turn." — Meshrin [seat: trait [trait/always/condition]] (closest offered: fear-aura) [effect: condition] [menu: phobia fear-aura berserk kill-denial terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind evasion relentless-pursuit bound guarded-stance undead-fortitude assassinate truth-aura] [same-cell unoffered: adhesive faultless-tracker marking-light] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement marking-light:body-verdict sealed-body:role relic-object:body-verdict mimicry:body-verdict blurred-form:body-verdict death-burst:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 1 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] user-set: HP 136 -> 120 — a declared field (Resolution 3)
[reskin] species kit: Swim 30 ft. — a lizardfolk's own
[reskin] done: "Meshrin" — donor skirmisher-8-hurler, CR 8
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 12 model call(s)
```

---

## 38. Gravebound Line-Holder — CR 6

**Input:** `a skeleton with a greatsword`
**Donor:** brute-5 -> CR 6
**Signature:** dropped · **elapsed** 28s

### Block
```
Gravebound Line-Holder

Medium Undead, Lawful Evil

AC 14
Initiative +3 (13)

HP 117 (18d8 + 36)

Speed 30 ft.

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
16
+3
+3
WIS
8
-1
-1
MOD
SAVE
CON
15
+2
+5
CHA
5
-3
-3

Skills Athletics +7, Perception +2

Vulnerabilities Bludgeoning

Immunities Poison; Exhaustion, Poisoned, Frightened

Senses darkvision 60 ft.; Passive Perception 12

Languages Understands Common plus one other language but can't speak

CR 6 (XP 2,300; PB +3)

Traits

Great Weapon Master. When the line-holder hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The line-holder makes two attacks, using Greatsword or Shortbow in any combination.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 14 (3d6 + 4) Slashing damage plus 7 (2d6) Necrotic damage.

Shortbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

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

### Trace
```
[concept] thin but a print creature — keeping route-first: a skeleton with a greatsword
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a skeleton with a greatsword…" is the description, not a name
[concept] resolve: archetype=brute type=Undead typeFrom=the route call themes=grave/armed mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: two-handed greatsword sweeps [object] | unfeeling skeletal frame that fights to the death [body] | raised in ranks from a battlefield grave [behavior]
[concept] identity: The greatsword skeleton advances in a patient, heavy-footed line, letting its massive blade hang low until it is within reach. Every round it makes one committed, two-handed sweep meant to open a body rather than duel it, shrugging off glancing hits because there is nothing inside its ribs to wound. It fights to the death without fear or fury — it does not know how to flinch, and it will not retreat from an opponent it has not yet cut down.
[concept] lore: Raised from a battlefield's mass grave by a necromancer who needed an indefatigable line-holder, it still carries the greatsword it was buried with and guards a post no living order remembers assigning.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] seats: action <- "raised in ranks from a battlefield grave" | trait <- "two-handed greatsword sweeps"
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] energy rides the named weapon: "Greatsword" is a greatsword, so the blow stays Slashing and Necrotic rides it rather than folding into the blow (print: 11 of 53 weapon rows carry an energy rider)
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Great Weapon Master (trait) — the feature table, no call
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the line-holder" — the call's own answer (kind), built from the name; the rules would have said "Line-Holder"
[reskin] inline on stamped rows: "Line-Holder" -> "the line-holder" on 1 row — they were written before the name's form was settled
[reskin] inline form: "the line-holder" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] alignment by mind: "Neutral" -> Unaligned — a Undead the call reads as mindless at INT 6 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "a skeleton with a greatsword" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: at_will/at_will/attack]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "When the line-holder's Greatsword attack hits a creature, the creature" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The line-holder is bound to a post no living order remembers; while it" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, death-burst, hook-rider
[reskin] signature idea (action): "When the line-holder's Greatsword attack hits a creature, the creature must succeed on a Strength saving throw or be knocked Prone as the sweep cuts its legs from under it; if it fails by a wide margin, the line-holder may immediately use its Reaction to step over the fallen foe and make another Greatsword attack against it." [rider/on_hit/condition] [family: payoff] — menu: affliction, contagion, stunning-strike, charge-push, pounce, life-drain, charge, bolt-restrain, bolt-mark (+ shelf: thrown-burst, throw-retrieve, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, self-invisibility, focus, answering-strike)
[reskin] composed candidates on the menu: action — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), stunning-strike (on_hit/condition)
[reskin] classification handed to the fit call: shape=attack when=at_will often=at_will
[reskin] word match declined by the call: affliction, contagion, stunning-strike, life-drain, bolt-restrain, bolt-mark, composed:payoff:condition, charge-push, charge, push-prone, thrown-burst, thrown-burst-seed — the key word does not mean the mechanic here
[reskin] closest refused: action — "pounce" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on a failed Strength save knocks the target Prone regardless of moveme)
[reskin] seat answered, but: the call said "When the line-holder's Greatsword attack hits a creature, the creature must succeed on a Strength saving throw or be kno" is carried by "Leg-Cutting Sweep", and no such row is on this sheet — the clause stays open
[reskin] strike written from its attack: "Leg-Cutting Sweep" clones "Greatsword" and adds a Strength save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] free signature row: "Leg-Cutting Sweep" — a print body takes only what the user's words ask, but the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit; the budget settles on the finished sheet
[reskin] row refused — the name is taken: "Leg-Cutting Sweep" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The line-holder is bound to a post no living order remembers; while it remains within sight of its assigned ground, it cannot be Frightened, Charmed, or forced to move against its will, and it ignores difficult terrain made of rubble, corpses, or broken weapons." [trait/always/defense] [family: body-reaction] — menu: phobia, terrain-walk, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, sealed-body, relic-object, undead-fortitude, truth-aura, fear-aura, kill-denial, evasion, guarded-stance, blurred-form (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the body-reaction family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] classification handed to the fit call: shape=attack when=at_will often=at_will
[reskin] word match declined by the call: undead-fortitude, death-restoration, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest refused: trait — "bound" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants immunity to Frightened, Charmed, and forced movement while it h)
[reskin] seat answered, but: the call said "while it remains within sight of its assigned ground, it cannot be Frightened, Charmed, or forced to move against its wi" is carried by "Post Unremembered", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("grants immunity to Frightened, Charmed, and forced movement while it h") and wrote a trait instead: "Post Unremembered" -> Traits. While it remains within sight of its assigned ground, the line-holder is immune to the Frightened and Charmed conditions
[reskin] authored row numbers: "Post Unremembered" — the call declared 0 number(s) promised
[reskin] free signature row: "Post Unremembered" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Post Unremembered" ("The line-holder is bound to a post no living order remembers; while it remains within sight of its assigned ground, it cannot be Frightened, Charmed, or forced  [authored: the catalog held no shape for it]")
[reskin] weapons answered: Greatsword = greatsword; Debris = none
[reskin] weapon dice follow the weapon: the GM's "Greatsword" is a greatsword (d6) — "13 (2d8 + 4)" becomes "14 (3d6 + 4)"
[reskin] weapon reach follows the weapon: the GM's "Greatsword" is a greatsword — reach 10 ft becomes 5 ft
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Skeleton's own type stands
[reskin] print canon alignment: Unaligned -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon rows: Leg-Cutting Sweep leave — the Skeleton has one melee row (Greatsword), and Multiattack reads print's
[reskin] print canon attack: "Debris" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] trait-granted condition immunity merged into header: Frightened
[reskin] emptied trait dropped — its only clause moved to the header
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] ask vs row ok: "a skeleton with a greatsword" -> "Greatsword" — trigger at_will, limit at_will
[reskin] lint: 0 findings
audit finding below confidence gate: Shortbow The Shortbow references a ranged weapon on a skeleton with no ammunition or bow noted anywhere, and the block provides no ranged attack in its Multiattack, leaving the GM to decide if a melee skeleton can fire it at all.
[reskin] audit: [Multiattack: The block is a skeleton with a greats… "The line-holder makes two Greatsword attacks.")]
[reskin] audit defect: Actions/"Multiattack" [catalog] medium undelivered — The block is a skeleton with a greatsword, yet the creature lacks any bone/undead flavor in its Greatsword or trait, so the GM cannot run it as the requested skeleton — the only skeleton marker is the type line. — Add skeleton-appropriate prose to the Greatsword or Great Weapon Master entry (e.g. brittle bone momentum) so the fiction matches the ask. (about: "The line-holder makes two Greatsword attacks.")
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] multiattack re-read — "Shortbow" joins the combination; "The line-holder makes two attacks, using Greatsword or Shortbow in any combination."
[reskin] done: "Gravebound Line-Holder" — donor brute-5, CR 6
[harness] recorded 11 model call(s)
```

---

## 39. Vellick the Last Contract — CR 5

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
**Signature:** dropped · **elapsed** 36s

### Block
```
Vellick the Last Contract
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

Athletics +10, Performance +5

Saving Throws: 

STR +7, DEX +5, CON +6, WIS +4

Senses: 

passive Perception 11

Languages: 

Common

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Worn Iron.Vellick automatically succeeds on saving throws against being prone and ignores effects that would knock it back or otherwise move it against its will.
Riposte (Reaction).When a creature within 5 feet of Vellick misses it with a melee attack roll, Vellick makes one Handaxe attack against that creature.
Parry (Reaction).When Vellick is hit by a melee attack roll while holding a weapon, Vellick adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: Vellick makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and Vellick has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage. Immediately after the attack, its handaxe returns to Vellick's grasp, and Vellick has advantage on its next attack roll against the target before the end of its next turn.
Shield Bash: One creature within 5 feet that Vellick can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

### Trace
```
[path] class_npc — class fighter — "sellsword" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] hints: hurler→style ✓ ("hurls a handaxe")
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurling a handaxe before closing [behavior] | shortsword follow-up at close range [behavior] | worn iron and sellsword kit [object]
[concept] identity: The sellsword opens by hurling a handaxe from just outside reach, then closes the gap with a shortsword before the axe is even retrieved. Every round it repeats the rhythm—throw, charge, cut—using its thrown weapon to buy the moment it needs to get inside its target's guard. It is a pragmatic, patient killer who retreats only when the coin no longer outweighs the blood.
[concept] lore: This sellsword is a veteran of border skirmishes and broken contracts, now fighting for whoever pays last and best, and it wants only to survive the job with enough loot to buy the next one.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] print canon defenses: HP 95 -> 112, AC 15 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-8-hurler -> CR 5 (invented — no printed peer)
[reskin] seats: action <- "shortsword follow-up at close range" | trait <- "worn iron and sellsword kit"
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said twist Warrior Veteran)
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Handaxe (slot), Shortsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Vex on Handaxe, Vex on Shortsword — the feature table, no call
[reskin] class kit: fighter — "sellsword": Riposte (riposte)
[reskin] inline declared: "Vellick" — the call's own answer (person), built from the name
[reskin] inline form: "Vellick" — the model's own reading of the name
[reskin] the sheet's declared ask: burst — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sellsword" -> has (descriptive), head | "hurls a handaxe" -> has (mechanical) [asked: attack] | "closes with a shortsword" -> has (mechanical) [asked: attack]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "When Vellick hits a creature with a Handaxe attack, it can immediately" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Worn Iron. Vellick fights from muscle-memory and scar tissue, and cann" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 26 of 26 answered; not true of this body: snare, shield-bash, snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When Vellick hits a creature with a Handaxe attack, it can immediately move up to half its Speed toward that creature without provoking Opportunity Attacks, and if it ends this move within 5 feet of the target, it makes one Shortsword attack against it. The thrown iron buys Vellick the instant it needs to get inside the target's guard, exactly as the sellsword's rhythm demands." [rider/on_hit/movement] [family: mark] — menu: affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark, bolt-drag (+ shelf: condition-payoff, throw-retrieve, lure, sensory-strike, disarm, delayed-brand, exploiter, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does movement; leading: charge-push (on_hit/movement), bolt-drag (on_hit/movement), affliction (on_hit/condition)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack
[reskin] word match declined by the call: charge-push, pounce, bolt-mark — the key word does not mean the mechanic here
[reskin] closest refused: action — "bolt-drag" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: moves the attacker toward the target it just hit and grants an extra s)
[reskin] clause already answered: "hurls a handaxe" is carried by "Hooked Return" — the seat read the sheet and declined to write a second row for it
[reskin] seat authored nothing: action — the call was asked to write an action for "When Vellick hits a creature with a Handaxe attack, it can immediately" and wrote no row of that kind (refused: "Handaxe" — a rider says what the hit does: a condition, a forced movement, or a curse)
[reskin] seat asked again: action — the first answer was refused ("Handaxe" — a rider says what the hit does: a condition, a forced movement, or a curse); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "When Vellick hits a creature with a Handaxe attack, it can immediately" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: action — first: "Handaxe" — a rider says what the hit does: a condition, a forced movement, or a curse; second: it belongs in the description; the seat stays empty
[reskin] closest refused — subject flipped: action — the call named "bolt-drag" nearest and judged its subject FLIPPED against the clause (moves the attacker toward the target it just hit and grants an extra s); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When Vellick hits a creature with a Handaxe attack, it can immediately move up to half its Speed toward that creature without provoking Opportunity Attacks, and if it ends this move within 5 feet of the target, it makes one Shortsword attack against it. The thrown iron buys Vellick the instant it needs to get inside the target's guard, exactly as the sellsword's rhythm demands." [rider/on_hit/movement] — the model found no template that holds it (offered: charge-push, bolt-drag, affliction, contagion, stunning-strike, pounce, isolation, bolt-mark, aggro-curse, exploiter)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Worn Iron. Vellick fights from muscle-memory and scar tissue, and cannot be forced off its feet—it automatically succeeds on saving throws against the Prone condition, and ignores effects that would knock it back or otherwise move it against its will." [trait/always/defense] [family: payoff] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial
[reskin] verb gate stands down: trait — no template shares a verb, but 6 template(s) whose declared stamps match the idea (always/defense): bloodied-fury, death-restoration, shielded-mind, evasion, relic-object, undead-fortitude; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack
[reskin] word match declined by the call: evasion, undead-fortitude, guarded-stance, relic-object, bloodied-fury — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: automatically succeeds on saves against being knocked prone or forcibl)
[reskin] seat answered, but: the call said "Worn Iron. Vellick fights from muscle-memory and scar tissue, and cannot be forced off its feet—it automatically succeed" is carried by "Worn Iron", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("automatically succeeds on saves against being knocked prone or forcibl") and wrote a trait instead: "Worn Iron" -> Traits. Vellick automatically succeeds on saving throws against the Prone condition and ignores effects that would knock it back
[reskin] authored row numbers: "Worn Iron" — the call declared 0 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Worn Iron" ("Worn Iron. Vellick fights from muscle-memory and scar tissue, and cannot be forced off its feet—it automatically succeeds on saving throws against the Prone con [authored: the catalog held no shape for it]")
[reskin] weapons answered: Shortsword = shortsword; Handaxe = handaxe
[reskin] weapon dice follow the weapon: the GM's "Shortsword" is a shortsword (d6) — "8 (1d8 + 4)" becomes "7 (1d6 + 4)"
[reskin] chassis nova: "Haft Splinter (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Common and one other language" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Gladiator's own type stands
[reskin] print canon multiattack: "Vellick makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon saves: proficient in STR, DEX, CON, WIS — the Gladiator's own set, at this sheet's stats and PB 3 (changed STR, CON)
[reskin] print canon skills: "Perception +4, Stealth +5" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Haft Splinter (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Slip Away" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] print canon row: Reactions/Parry — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Handaxe" instead
[reskin] multiattack reconciled: "Shield Bash" is no row on this sheet — the Multiattack cites "Shortsword" instead
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Worn Iron" [no template]
[reskin] lint: 0 findings
audit finding below confidence gate: Riposte Riposte makes a Handaxe attack, which the block lists as a ranged option, but the trigger is a melee miss within 5 feet, so the reaction may resolve as a ranged attack at 5 feet — the block does not clarify whether Riposte forces the melee mode.
[reskin] audit: [Worn Iron: This is a blanket immunity to all force… it back or otherwise move it against its will."), Handaxe: The throw-and-return fiction is never tie…tage on its next attack roll against the target"), Shortsword: The pronoun 'its' has no antecedent in… attack, its handaxe returns to Vellick's grasp"), Shortsword: Shortsword is weaker than a Handaxe an…daxe for. (about: "7 (1d6 + 4) Piercing damage.")]
[reskin] audit defect: Traits/"Worn Iron" [model-written] medium open_ended — This is a blanket immunity to all forced movement with no limit, which can blank entire abilities (shoves, pulls, teleports-against-will) with no adjudication boundary for what counts as moving it against its will versus a spell effect. — Narrow the clause to specific forced-movement conditions or remove the open-ended catch-all so a GM can tell what qualifies. (about: "ignores effects that would knock it back or otherwise move it against its will.")
[reskin] audit defect: Actions/"Handaxe" [model-written] low other — The throw-and-return fiction is never tied to a mechanic except via Shortsword's odd 'Hit or Miss' clause; Handaxe's Advantage rider references the same target repeatedly and stacks no tracking, but Shortsword retroactively returns a handaxe whose throw timing is undefined. — State in Handaxe that the thrown axe is out of Vellick's grasp until Shortsword returns it, or move the return clause into Handaxe. (about: "Vellick has Advantage on its next attack roll against the target")
[reskin] audit defect: Actions/"Shortsword" [model-written] medium dead_reference — The pronoun 'its' has no antecedent in Shortsword and the handaxe-return is attached to a melee attack with no established state that the handaxe was ever out of reach, so the clause is disconnected from any mechanic in the entry. — Make the return clause contingent on a Handaxe throw (e.g. 'if Vellick has a handaxe out from a thrown attack') or drop it. (about: "Immediately after the attack, its handaxe returns to Vellick's grasp")
[reskin] audit defect: Actions/"Shortsword" [model-written] medium undelivered — Shortsword is weaker than a Handaxe and carries the entire Multiattack's economy for returning the axe; the GM was asked for a sellsword that closes with a shortsword, but the row's only payload is lower damage than the ranged option it replaces. — Give Shortsword a payoff for being in reach (e.g. a rider or a stronger follow-up Advantage effect) so it is worth trading a Handaxe for. (about: "7 (1d6 + 4) Piercing damage.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Worn Iron" carries "Worn Iron. Vellick fights from muscle-memory and scar ti", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Riposte" carries "sellsword" which is not a whole clause — the seat surgery cut it; resolved to cl_16u4r8s
[reskin] [gap] moves the attacker toward the target it just hit and grants an extra shortsword attack — "When Vellick hits a creature with a Handaxe attack, it can immediately move up to half its Speed toward that creature without provoking Opportunity Attacks, and if it ends this move within 5 feet of the target, it makes one Shortsword attack against it. The thrown iron buys Vellick the instant it needs to get inside the target's guard, exactly as the sellsword's rhythm demands." — Vellick the Last Contract [seat: action [rider/on_hit/movement]] (closest offered: bolt-drag) [effect: movement] [menu: charge-push bolt-drag affliction contagion stunning-strike pounce isolation bolt-mark aggro-curse exploiter] [same-cell unoffered: hook-rider] [same-seat rejected: hook-rider:body-verdict life-drain:body-verdict snatch:movement bolt-restrain:role charge:style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Vellick the Last Contract" — donor skirmisher-8-hurler, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 13 model call(s)
```

---

## 40. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** brute-2 -> CR 3
**Signature:** library · **elapsed** 26s

### Block
```
Brother Halric
Medium humanoid, neutral
Armor Class

13 (chain shirt)

Hit Points: 

38 (7d8 + 7)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

10 (+0)

	

12 (+1)

	

13 (+1)

	

16 (+3)

	

13 (+1)

Skills: 

Medicine +7, Perception +5, Religion +5

Senses: 

passive Perception 15

Languages: 

Common plus one other language

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Divine Aid (3/Day) (Bonus Action).Halric casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: Halric makes two attacks, using Mace or Radiant Flame. It can replace one attack with a use of Sanctified Hurl.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Sanctified Hurl: One creature within 60 feet of Halric must succeed on a DC 13 Strength saving throw or take 24 (7d6) bludgeoning damage and be knocked prone.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```

### Trace
```
[concept] thin concept expanded before routing: Brother Halric — Brother Halric opens with a brutal thrown hammer from across the nave, then wades in swinging, and when bloodied he does not retreat — he fights on in silence, counting on his ravaged body to hold together longer than the prey's nerve. Every round he presses the nearest foe and lets
[concept] expansion answered: type=Undead (type_source=user) material=grave size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: thrown-weapon
[path] class_npc — class cleric — "Brother" (call)
[route] brute type=Undead mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("wades in swinging") | brute-grappler: the call read "hold" as not meaning that mechanic here — no override | brute stands: every key that would override it was read as a figure of speech | brute: no line key in the words — the model's read of its quote
[concept] type settled: Undead -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Undead
[concept] resolve: archetype=brute type=Humanoid typeFrom=fix A/E (a person with no named body) themes=grave/armed mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Brother Halric"
[concept] mechanics: thrown-weapon
[concept] signature elements: the consecrated war-hammer thrown and swung [object] | an undying corpse that does not fall [body] | silent, relentless pressing advance [behavior]
[concept] identity: Brother Halric opens with a brutal thrown hammer from across the nave, then wades in swinging, and when bloodied he does not retreat — he fights on in silence, counting on his ravaged body to hold together longer than the prey's nerve. Every round he presses the nearest foe and lets his corrupted frame take what would fell a mortal man, answering spellfire with nothing but a hammer that never stops.
[concept] lore: Brother Halric was a priest of the abbey who chose to guard its reliquary in death as he never could in life — an undying corpse of grave-dirt and grave-wax, still swinging the hammer he consecrated, still waiting for the faithful to return.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the cleric stands on the Priest — the class's own print block, nearest CR 3
[reskin] print canon defenses: HP 58 -> 38, AC 10 -> 13 — the Priest's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 13 (chain shirt) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 16, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] seats: action <- "silent, relentless pressing advance" | trait <- "the consecrated war-hammer thrown and swung"
[reskin] [path] decides: class_npc on the Priest · class cleric (the matcher would have said homebrew)
[reskin] print canon: "Brother Halric" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Brother": nothing to add — the sheet already answers it
[reskin] proper noun: "Brother Halric" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Halric" — the call's own answer (person), built from the name; the rules would have said "the brother"
[reskin] inline on stamped rows: "the brother" -> "Halric" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "Halric" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Brother Halric" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "Halric hurls his consecrated warhammer at a creature he can see, the w" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Halric's body is bound to the abbey's reliquary; while within its wall" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "Halric hurls his consecrated warhammer at a creature he can see, the weapon returning to his hand. On a hit, the target must succeed on a Strength saving throw or be knocked Prone as the hammer's sanctified weight drives it down." [action/save/condition] [family: sentinel] — menu: ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, gaze-single, snare, seal, lure, pacify, snare-bolt (+ shelf: rampage, second-wind, aggro-curse, self-invisibility, focus, answering-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), push-prone (save/condition)
[reskin] classification handed to the fit call: mechanic=thrown-weapon
[reskin] word match declined by the call: escalating-dread, terror-pulse, gaze-single, lure, pacify, snare, snare-bolt, seal, ground-burst, thrown-burst-seed, wind-up — the key word does not mean the mechanic here
[reskin] closest refused: action — "push-prone" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a thrown attack that returns to the hand and forces a Strength save or)
[reskin] seat answered, but: the call said "Halric hurls his consecrated warhammer at a creature he can see, the weapon returning to his hand. On a hit, the target " is carried by "Sanctified Hurl", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("a thrown attack that returns to the hand and forces a Strength save or") and wrote an action instead: "Sanctified Hurl" -> Actions. *Strength Saving Throw*: DC 13, one creature within 60 feet. *Failure:* 24 (7d6) Bludgeoning damage, and the target has 
[reskin] authored row numbers: "Sanctified Hurl" — the call declared (unanswered) number(s) promised
[reskin] free signature row: "Sanctified Hurl" — a print body takes only what the user's words ask, but the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit; the budget settles on the finished sheet
[reskin] signature authored: no template — the seat wrote it -> Actions/"Sanctified Hurl" ("Halric hurls his consecrated warhammer at a creature he can see, the weapon returning to his hand. On a hit, the target must succeed on a Strength saving throw  [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Halric's body is bound to the abbey's reliquary; while within its walls, he regains hit points at the start of each of his turns. This is consecrated ground, and he draws strength from it." [trait/start_of_turn/resource] [family: heal] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, relentless-pursuit, bound, relic-object, warded-mending, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does resource; leading: warded-mending (start_of_turn/resource), truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=thrown-weapon
[reskin] word match declined by the call: warded-mending, bound, bloodied-fury, blood-frenzy, pack-tactics, phobia — the key word does not mean the mechanic here
[reskin] free signature row: trait — "relic-object" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "the consecrated war-hammer thrown and swung" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] free signature row: "Bound Reliquary" — the trait seat cannot quote the GM, but the call names the element it expresses: "the consecrated war-hammer thrown and swung". Earns no clause credit; the twist/class path allows 1 and this is number 3
[reskin] signature template (trait): relic-object -> Traits/"Bound Reliquary" ("Halric's body is bound to the abbey's reliquary and he regains hit points each t [shape fit, no verb match]")
[reskin] weapons answered: Warhammer = warhammer
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Priest's own type stands
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Radiant Flame — the Priest's own ranged row, added (the chassis carried none to rename)
[reskin] print canon attack: "Warhammer" -> "Mace" — the Priest's own row
[reskin] print canon multiattack: "Halric makes two attacks, using Mace or Radiant Flame in any combination." — the Priest's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
[reskin] print canon attack: "Radiant Flame" is print's own row — +5, 11 (2d10), range 60 ft. (an exact body at print's CR)
[reskin] print canon saves: proficient in nothing — the Priest's own set, at this sheet's stats and PB 2 (changed STR)
[reskin] print canon skills: "Athletics +5, Perception +5" -> "Medicine +7, Perception +5, Religion +5" — the Priest's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] class weapon: "mace" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] multiattack replacement clause: It can replace one attack with a use of Sanctified Hurl.
[reskin] free row over budget: Traits/"Bound Reliquary" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Sanctified Hurl" [no template]
[reskin] lint: 0 findings
[reskin] element expressed: Sanctified Hurl carries "the consecrated war-hammer thrown and swung" — "the target has the Prone condition"
[reskin] audit: [Sanctified Hurl: The hurl is resolved as a 60-foot…dicate it. (about: "one creature within 60 feet"), Sanctified Hurl: The row's entire non-damage paylo…ax. (about: "the target has the Prone condition")]
[reskin] audit defect: Actions/"Sanctified Hurl" [model-written] medium other — The hurl is resolved as a 60-foot ranged effect against a single target with no line of sight, cover, or thrown-object fiction, so a melee war-hammer swing reads as an unblockable ranged strike the GM cannot square with the fiction. — State the delivery plainly (a thrown hammer of light, with the range expressed for that throw) so the GM can describe and adjudicate it. (about: "one creature within 60 feet")
[reskin] audit defect: Actions/"Sanctified Hurl" [model-written] medium weak — The row's entire non-damage payload is Prone, which costs the target nothing but half its movement to stand and imposes no threat the row's consecrated-hammer fiction promises. — Give the knockdown teeth — a condition or rider that persists or impedes rather than a stand-up tax. (about: "the target has the Prone condition")
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] clause unresolved: "Sanctified Hurl" carries "Halric hurls his consecrated warhammer at a creature he ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Brother Halric" — donor brute-2, CR 3
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] recorded 11 model call(s)
```
