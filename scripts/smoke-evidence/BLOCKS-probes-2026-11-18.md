# Blocks — the probes for Part 0 and Part 2

For the owner and Fable, 2026-11-18. Branch `statblock-enhancments-part-2`. Not a milestone.
**These are PROBE sheets, not the forty.** `baseline-2026-11-18` was not touched this round and
`BLOCKS-air-elemental-2026-11-18.md` remains the forty that matches it.

Two probes ran. Part 1 and Part 3 were not built — see `HANDOFF-boxes-2026-11-18.md` beside this
file for why — so there are no probe sheets for them.

| probe | what was live | sheets |
|---|---|---|
| **Part 0** | `--live-from audit`, 1 roll | s27 Oathbroken Warder, s29 Swarm of Funeral Bells |
| **Part 2** | `--live-from audit`, 1 roll | all 38 replayable sheets |

Both probes serve every call before the audit from the baseline recording, so the sheets differ from
the forty only where this round's parse changes acted on the same recorded answers. Each section
below is headed with its sheet number; the Part 0 pair are the first two.


## 01-dire-wolf

**Typed:** `name: Dire Wolf | with a frost-rimed hide`

**signature elements:** frost-rimed hide [body] | pack hit-and-run harrying [behavior] | trailing chill of the winter hunt [aura]

**identity:** A frost-rimed dire wolf opens a hunt by shadowing its quarry through the snow at a distance, letting the pack spread wide before the first rush; then it fights as a hit-and-run harrier, darting in to tear at a flank or hamstring and wheeling back out of reach before the prey can answer, its freezing coat leaving a stinging chill in every wound. It keeps its patience and pack-cunning longer than a common wolf, working a bleeding target until the pack drags it down, but if the fight turns and packmates fall it cuts and runs rather than dying on the spot.

**lore:** These wolves are born in the high passes where rime never thaws, and they follow the cold down into the valleys each winter, hunting whatever warmth stumbles into their territory — not out of malice, but because they know nothing else.

### The sheet

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

Rimefell Hide. A creature starts its turn within the dire wolf's reach, that creature takes 3 (1d6) Cold damage, and until the end of its next turn it leaves no trail of its own warmth — scent and tracks go cold behind it.

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Frost-Rimed Hamstring (Recharge 5-6). Constitution Saving Throw: DC 13, one creature within 60 feet. Failure: The target's Speed is halved and it can't take Reactions until the end of the dire wolf's next turn.

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

<details><summary>trace</summary>

```
[harness] restored 0 taken name(s) the recording carried
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Beast typeFrom=the route call themes=bestial/elemental mind=bestial style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: frost-rimed hide [body] | pack hit-and-run harrying [behavior] | trailing chill of the winter hunt [aura]
[concept] identity: A frost-rimed dire wolf opens a hunt by shadowing its quarry through the snow at a distance, letting the pack spread wide before the first rush; then it fights as a hit-and-run harrier, darting in to tear at a flank or hamstring and wheeling back out of reach before the prey can answer, its freezing coat leaving a stinging chill in every wound. It keeps its patience and pack-cunning longer than a common wolf, working a bleeding target until the pack drags it down, but if the fight turns and packmates fall it cuts and runs rather than dying on the spot.
[concept] lore: These wolves are born in the high passes where rime never thaws, and they follow the cold down into the valleys each winter, hunting whatever warmth stumbles into their territory — not out of malice, but because they know nothing else.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] seats: action <- "pack hit-and-run harrying" | trait <- "frost-rimed hide"
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dire wolf" — the call answered "the dire wolf" (kind), which the name does not support
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The dire wolf lunges at a creature it can see within reach and rakes i" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "A creature that starts its turn within the dire wolf's reach takes Col" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: snare, shield-bash, snare-bolt, blink, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, web-walker, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, life-drain
[reskin] condition rider rides the attack: action — the payoff family composes a rider, so the idea is re-seated action/save -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (action): "The dire wolf lunges at a creature it can see within reach and rakes its frost-rimed forelegs across the target's flank; on a failed save, the wound frosts over and the target's Speed is halved and it can't take Reactions until the end of its next turn — the hamstring, the chill that steals the answer." [rider/on_hit/condition] [family: payoff] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: lure, spew, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, answering-strike)
[reskin] composed candidates on the menu: action — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: contagion (on_hit/condition), pounce (on_hit/condition), composed:payoff:condition (on_hit/condition)
[reskin] keys would have bound: action — slow-bolt (frost)
[reskin] word match declined by the call: contagion, pounce, composed:payoff:condition, charge-push, hook-rider, isolation, charge — the key word does not mean the mechanic here
[reskin] signature template: slow-bolt -> Actions/"Frost-Rimed Hamstring" ("the wound frosts over and the target's Speed is halved and it can't take Reactio [verb: frost:concept, chill:idea]")
[reskin] keys spent by the action: frost
[reskin] signature idea (trait): "A creature that starts its turn within the dire wolf's reach takes Cold damage as the rime on its hide stings through cloth and fur, and a creature taking that damage leaves no trail of its own warmth — scent and tracks go cold behind it until the end of its next turn." [trait/start_of_turn/damage] [family: zone] — menu: phobia, terrain-walk, faultless-tracker, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: energy-aura (start_of_turn/damage), composed:zone:damage (start_of_turn/damage), truth-aura (start_of_turn/condition)
[reskin] word match declined by the call: energy-aura, composed:zone:damage — the key word does not mean the mechanic here
[reskin] closest refused: trait — "energy-aura" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: damage dealt when a creature starts its turn inside the wolf's reach, )
[reskin] seat answered, but: the call said "A creature that starts its turn within the dire wolf's reach takes Cold damage as the rime on its hide stings through cl" is carried by "Rimefell Hide", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "A creature that starts its turn within the dire wolf's reach takes Col" and wrote no row of that kind (refused: "Rimefell Hide" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Rimefell Hide" — a trait is not a save — the save form takes stat, target and effect as fields and the engine); asking once more with the reason
[reskin] seat answered, but: the call said "A creature that starts its turn within the dire wolf's reach takes Cold damage as the rime on its hide stings through cl" is carried by "Rimefell Hide", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("damage dealt when a creature starts its turn inside the wolf's reach, ") and wrote a trait instead: "Rimefell Hide" -> Traits. A creature starts its turn within the dire wolf's reach, that creature takes 3 (1d6) Cold damage, and until the end of i
[reskin] authored row numbers: "Rimefell Hide" — the call declared 1 number(s) promised
[reskin] seat landed on the second try: trait — "Rimefell Hide" after ""Rimefell Hide" — a trait is not a save — the save form takes stat, target and e"
[reskin] free signature row: "Rimefell Hide" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Rimefell Hide" is HANDED "with a frost-rimed hide" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Rimefell Hide" ("A creature that starts its turn within the dire wolf's reach takes Cold damage as the rime on its hide stings through cloth and fur, and a creature taking that  [authored: the catalog held no shape for it]")
[reskin] weapons answered: Bite = none
[reskin] print canon type: the call answered type_source=user for beast, but the GM's words do not name it — the Dire Wolf's own type stands
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] print canon multiattack: "The dire wolf makes two Bite attacks." leaves — the Dire Wolf makes ONE attack at its own CR (print names no Multiattack) and the sheet carries print's own row numbers
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] element immunity: Cold — the call read this creature's energy as Cold and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Cold (merged into the header write)
[reskin] immunities stamped for type: Beast -> Cold
[reskin] print canon saves: proficient in nothing — the Dire Wolf's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] print canon trait: Pack Tactics — "Dire Wolf — with a frost-rimed hide" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Cunning" is the seat's, not the Dire Wolf's
[reskin] dead control row: "Frost-Rimed Hamstring (Recharge 5-6)" takes a Recharge — an at-will condition action with no Multiattack to join is a whole action for a condition, and print gates that shape
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Rimefell Hide" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
audit finding below confidence gate: Frost-Rimed Hamstring A dire wolf crippling a hamstring at 60 feet contradicts the creature's nature — a bite-and-tackle pack predator has no reach or ranged means to hamstring a target across an open field.
audit finding below confidence gate: Frost-Rimed Hamstring The payload is a one-round Speed halving with no damage and no lasting condition — a save-or-nothing nuisance that a pure damage Bite outclasses, so the Recharge slot is not worth spending.
[reskin] audit: [Rimefell Hide: The trigger sentence is ungrammatic… reach, that creature takes 3 (1d6) Cold damage"), Rimefell Hide: The 'leaves no trail of its own war…own warmth — scent and tracks go cold behind it")]
[reskin] audit defect: Traits/"Rimefell Hide" [model-written] high wording — The trigger sentence is ungrammatical and does not state what the creature takes damage from — it reads as two detached clauses with no main verb linking the start-of-turn trigger to the damage ('a creature starts its turn..., that creature takes...'). — Rewrite as a single conditional: 'Any creature that starts its turn within 5 feet of the dire wolf takes 3 (1d6) Cold damage.' (about: "A creature starts its turn within the dire wolf's reach, that creature takes 3 (1d6) Cold damage")
[reskin] audit defect: Traits/"Rimefell Hide" [model-written] high other — The 'leaves no trail of its own warmth' clause has no adjudicable mechanical effect — no condition, no benefit, no check modification — so a GM cannot tell what it does at the table. — Either state the mechanical effect (e.g., the creature gains no benefit from hiding via scent) or cut the clause. (about: "until the end of its next turn it leaves no trail of its own warmth — scent and tracks go cold behind it")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Dire Wolf" — donor skirmisher-1, CR 1
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 8 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 02-mire-hound

**Typed:** `a mud-caked bog hound that drags fishermen under`

**signature elements:** dragging prey under the water [behavior] | mud-caked hide [body]

**identity:** A bog hound does not chase; it waits in the shallows, a crusted ridge of mud that becomes a lunging mass of hide and jaw. Its first lunge is for the leg or the line, and once its jaws close it backs into deep water, dragging whatever it has bitten down into the mud where it can hold and roll until the struggle stops. Wounded, it does not retreat to safety — it releases and circles under the surface, working to take its prey's footing and pull it under again.

**lore:** Born in the clay-choked oxbows where drowned catch and offal collect, the bog hound haunts good fishing water and wants only to feed — a fisherman's thrashing is its dinner bell.

### The sheet

```
Mire Hound
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

darkvision 60 ft., passive Perception 14

Languages: 

None

Challenge

1 (200 XP)

Proficiency Bonus:

+2

Sure Footing.Difficult Terrain composed of mud doesn't cost the hound extra movement, and the hound can move across mud without needing to make an ability check.

Actions
Multiattack: The hound makes two Bite attacks. It can replace one attack with a use of Bog Terror.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Bog Terror: One creature within 60 feet must make a DC 13 Wisdom saving throw. On a failed save, the target is frightened until the end of the hound's next turn. If the target was already frightened by this ability, it also takes 6 (1d12) psychic damage.
```

<details><summary>trace</summary>

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
!! [ENRICHMENT] Failed to enrich Dire Wolf: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 1 taken name(s) the recording carried
[path] homebrew — "a mud-caked bog hound that drags fishermen under" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "drags fishermen under" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] hints: engulf→mechanics ✓ ("it backs into deep water, dragging")
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=bestial/aquatic mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: dragging prey under the water [behavior] | mud-caked hide [body]
[concept] identity: A bog hound does not chase; it waits in the shallows, a crusted ridge of mud that becomes a lunging mass of hide and jaw. Its first lunge is for the leg or the line, and once its jaws close it backs into deep water, dragging whatever it has bitten down into the mud where it can hold and roll until the struggle stops. Wounded, it does not retreat to safety — it releases and circles under the surface, working to take its prey's footing and pull it under again.
[concept] lore: Born in the clay-choked oxbows where drowned catch and offal collect, the bog hound haunts good fishing water and wants only to feed — a fisherman's thrashing is its dinner bell.
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 1
[reskin] donor: brute-5-grappler -> CR 1
[reskin] seats: action <- "dragging prey under the water" | trait <- "mud-caked hide"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] engulf engine: Whelm — the body's own verb
[reskin] engine interior scaled — CR 1 sits below the brute-5-grappler seat
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the hound" — the call's own answer (kind), built from the name
[reskin] inline form: "the hound" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a mud-caked bog hound" -> has (descriptive), head | "drags fishermen under" -> has (mechanical) [asked: on_hit/condition] [askMechanic: grapple]
[reskin] answered by the chassis: "drags fishermen under" asks grapple and "Bite" already carries it (declared imposes) — no row is requested for it, and the row now carries the GM's words
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "When the hound hits a creature with its Bite, the target is pulled int" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The hound's mud-caked hide makes it nearly invisible in marshy terrain" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: shield-bash, active-toll, herd, shell-withdraw, rally, heated-body, absorption, bloodied-burst, resonant-body, spider-climb, aberrant-ground, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst
[reskin] engulf engine withheld: Bonus Actions/"Whelm" leaves — the route call read this creature's hold as grip, not contain; the grapple stands and citations of the row are swept
[reskin] menu pruned: action — push-prone, exploiter (the sheet cannot render them)
[reskin] signature idea (action): "When the hound hits a creature with its Bite, the target is pulled into the hound's space and the hound may immediately move up to half its Speed without provoking Opportunity Attacks, dragging the target with it. If this movement enters deep water or mud, the target is pulled under and must hold its breath or begin suffocating." [rider/on_hit/movement] [family: drag] — menu: contagion, charge-push, hook-rider, pounce, life-drain (+ shelf: spew, escalating-dread, terror-pulse, thrown-burst-seed, drain, wind-up, lure, pacify, sensory-strike, reveal, second-wind, aggro-curse, self-invisibility, focus, coating, answering-strike)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — grapple: hook-rider
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does movement; leading: hook-rider (on_hit/movement), charge-push (on_hit/movement), contagion (on_hit/condition)
[reskin] keys would have bound: action — hook-rider (drag, drags)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: charge-push, pounce, contagion, life-drain — the key word does not mean the mechanic here
[reskin] closest refused: action — "hook-rider" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: pulls the target into the creature's own space and moves both, forcing)
[reskin] seat answered, but: the call said "When the hound hits a creature with its Bite, the target is pulled into the hound's space and the hound may immediately " is carried by "unplaced", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write an action for "When the hound hits a creature with its Bite, the target is pulled int" and wrote no row of that kind (it belongs in the description)
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "grapple", the seat that carries it ended with no row, and "hook-rider" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] rider refused — duplicate trigger: "hook-rider" opens with "If the target is a Large or smaller creature…", which "Bite" already carries; the slot leaves and the seat looks elsewhere
[reskin] fallback skipped: push-prone (the sheet cannot render it)
[reskin] fallback skipped: exploiter (the sheet cannot render it)
[reskin] value check: "Creeping Dread" EV 4.1 vs floor 3.1 (one attack of 2) — dice 3 → 6
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The hound's mud-caked hide makes it nearly invisible in marshy terrain. While the hound is motionless in mud, shallow water, or reeds, it has Advantage on Dexterity (Stealth) checks made to hide, and creatures have Disadvantage on Wisdom (Perception) checks to spot it." [trait/always/defense] [family: sentinel] — menu: false-appearance, adhesive, phobia, terrain-walk, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — grapple: adhesive
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: adhesive (always/condition), false-appearance (always/defense), bloodied-fury (always/defense)
[reskin] keys would have bound: trait — terrain-walk (bog, mud)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: adhesive — the key word does not mean the mechanic here
[reskin] trait declined: "Bog Camouflage" — no receipt of any kind: no quote, no concept key, and the call named none of this creature's own elements for it (decoration, not a signature)
[reskin] trait bound to the concept's verb (concept-first): terrain-walk — bog+mud in the user's words; the idea path had nothing
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: bog:concept, mud:concept]")
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 4 on a Beast speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "a mud-caked bog hound that drags fisherm" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] ask vs row MISMATCH: "drags fishermen under" -> "Bite" — trigger: asked on_hit, row reads at_will
[reskin] lint: 0 findings
[reskin] audit: [Creeping Dread: The generic library name does not …g presence in the mire. (about: "Creeping Dread")]
[reskin] audit rename: "Creeping Dread" -> "Bog Terror"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Bog Terror) — the sameness metric
[reskin] [gap] pulls the target into the creature's own space and moves both, forcing suffocation checks in deep water or mud — "When the hound hits a creature with its Bite, the target is pulled into the hound's space and the hound may immediately move up to half its Speed without provoking Opportunity Attacks, dragging the target with it. If this movement enters deep water or mud, the target is pulled under and must hold its breath or begin suffocating." — Mire Hound [seat: action [rider/on_hit/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider charge-push contagion pounce life-drain aggro-curse spew pacify] [same-cell unoffered: bolt-drag] [same-seat rejected: affliction:cr-range stunning-strike:cr-range isolation:role snatch:movement bolt-restrain:role bolt-drag:role bolt-mark:role charge:style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Mire Hound" — donor brute-5-grappler, CR 1
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 8 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 03-owlbear

**Typed:** `name: Owlbear | that has learned to climb`

**signature elements:** climbing hooked foreclaws [body] | plunge attack from above [behavior] | dragging prey off the ground to keep it there [behavior]

**identity:** The climbing owlbear kicks off a trunk or ledge to crash down onto prey from above, then bolts up the nearest vertical surface before the retaliation can land. Every round it repeats that plunging strike and retreat, using tree trunks, cliff faces, and dungeon walls as its escape lanes, and it uses its hooked foreclaws to haul prey back off the ground where it can outmaneuver them. When bloodied it does not stand and trade blows — it climbs out of reach, circles, and drops again, harrying until its pursuers are exhausted or dead.

**lore:** A bloodline of owlbears that took to the high pine cliffs and ruined towers has grown hooked climbing spines on its forelimbs; they now harvest the vertical world, dropping onto mountain goats, woodsmen, and anything else foolish enough to walk beneath a canopy.

### The sheet

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

Actions
Multiattack: The owlbear makes two Rend attacks.
Rend: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Mire Hound: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 2 taken name(s) the recording carried
[concept] thin but a print creature — keeping route-first: Owlbear — that has learned to climb
[path] twist — Owlbear (is) — "Name field: Owlbear" (code)
[route] skirmisher type=Monstrosity mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("learned to climb") | skirmisher: no line key in the words — the model's read of its quote
[concept] name: "Owlbear" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=skirmisher type=Monstrosity typeFrom=the route call themes=bestial/grasping mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: climbing hooked foreclaws [body] | plunge attack from above [behavior] | dragging prey off the ground to keep it there [behavior]
[concept] identity: The climbing owlbear kicks off a trunk or ledge to crash down onto prey from above, then bolts up the nearest vertical surface before the retaliation can land. Every round it repeats that plunging strike and retreat, using tree trunks, cliff faces, and dungeon walls as its escape lanes, and it uses its hooked foreclaws to haul prey back off the ground where it can outmaneuver them. When bloodied it does not stand and trade blows — it climbs out of reach, circles, and drops again, harrying until its pursuers are exhausted or dead.
[concept] lore: A bloodline of owlbears that took to the high pine cliffs and ruined towers has grown hooked climbing spines on its forelimbs; they now harvest the vertical world, dropping onto mountain goats, woodsmen, and anything else foolish enough to walk beneath a canopy.
[reskin] print canon defenses: HP 58 -> 59, AC 13 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +4 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] seats: action <- "plunge attack from above" | trait <- "climbing hooked foreclaws"
[reskin] [path] decides: twist on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear — that has learned to climb" heads on the Owlbear — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] the sheet's declared ask: climb — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "has learned to climb" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Owlbear —" -> has (descriptive), head | "has learned to climb" -> has (mechanical) [asked: at_will/movement] [askMechanic: climb]
[reskin] open asks handed to the idea call: "has learned to climb" [climb]
[reskin] idea anchored: action — "When the owlbear drops onto a creature from above — leaping down from " answers the GM's "has learned to climb"
[reskin] idea unanchored: trait — "The owlbear's hooked climbing spines let it cling to sheer surfaces — " names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: gaze-single, snare, shield-bash, random-ray, spew, snare-bolt, blink, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, life-drain
[reskin] menu: taste stands down — action answers the GM's "has learned to climb", so role and style do not filter the menu (legality still does); 24 template(s) offered
[reskin] signature idea (action): "When the owlbear drops onto a creature from above — leaping down from a wall, ledge, or canopy at least a short fall's height — its hooked foreclaws drive the target to the ground: the target must succeed on a Strength saving throw or be knocked Prone and Restrained under the owlbear's weight until the start of its next turn, pinned against the stone it just left." [action/save/condition] [family: drag] — menu: trample, leap, lure, ground-burst, sensory-strike, disarm, thrown-burst-seed, zone, execute, seal, wail, active-toll, pacify, escalating-dread, terror-pulse, slow-bolt, push-prone, herd, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, shell-withdraw, lay-on-hands, rally, riposte, answering-strike, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), sensory-strike (save/condition), seal (save/condition)
[reskin] classification handed to the fit call: shape=movement when=at_will
[reskin] word match declined by the call: lure, sensory-strike, seal, pacify, escalating-dread, terror-pulse, push-prone, reveal, trample, leap, ground-burst, disarm, thrown-burst-seed, execute, active-toll, slow-bolt, herd, drain, curse-debt, wind-up, blighted-ground, zone, pounce, wail, zone-seed, hook-rider — the key word does not mean the mechanic here
[reskin] closest refused: action — "leap" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants the creature an inherent climb movement mode rather than a jump)
[reskin] clause already answered: "has learned to climb" is carried by "Cliff Climber" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "has learned to climb" is already carried by a row on this sheet; no second row is written for it
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the owlbear drops onto a creature from above — leaping down from a wall, ledge, or canopy at least a short fall's height — its hooked foreclaws drive the target to the ground: the target must succeed on a Strength saving throw or be knocked Prone and Restrained under the owlbear's weight until the start of its next turn, pinned against the stone it just left." [action/save/condition] — the model found no template that holds it (offered: lure, sensory-strike, seal, pacify, escalating-dread, terror-pulse, push-prone, reveal, trample, leap, ground-burst, disarm, thrown-burst-seed, execute, active-toll, slow-bolt, herd, drain, curse-debt, wind-up, blighted-ground, zone, pounce, wail, zone-seed, hook-rider)
[reskin] fallback respects the call: sensory-strike, disarm left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Owlbear's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The owlbear's hooked climbing spines let it cling to sheer surfaces — it can climb vertical walls and hang from ceilings without a check, and while clinging it does not provoke Opportunity Attacks from creatures on the ground below it." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — climb: spider-climb, terrain-walk
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), terrain-walk (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — spider-climb (climb, climbs, climbing)
[reskin] classification handed to the fit call: shape=movement when=at_will
[reskin] word match declined by the call: terrain-walk, bound, relentless-pursuit — the key word does not mean the mechanic here
[reskin] signature template (trait): spider-climb -> Traits/"Hooked Climber" ("it can climb vertical walls and hang from ceilings without a check, matching the [verb: climb:concept, climbs:concept, climbing:concept, ceilings:idea, walls:idea, wall:idea, cling:idea, sheer:idea]")
[reskin] one mechanic, one name: Traits/"Hooked Climber" -> "Spider Climb" — this row is spider-climb and does what every spider-climb row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Talons = none
[reskin] print canon type: the call answered type_source=user for monstrosity, but the GM's words do not name it — the Owlbear's own type stands
[reskin] print canon attack: "Talons" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "the owlbear makes two Rend attacks." — the Owlbear's own
[reskin] languages held: None stands — INT 3 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] print canon saves: proficient in nothing — the Owlbear's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon skills: "Perception +3, Stealth +3" -> "Perception +5" — the Owlbear's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Owlbear's
[reskin] print canon: chassis row leaves — Traits/"Cliff Climber" is the seat's, not the Owlbear's
[reskin] row binds its clause: "Spider Climb" answers "has learned to climb" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "has learned to climb" -> "Spider Climb" — trigger at_will
[reskin] lint: 0 findings
[reskin] audit: nothing flagged
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] grants the creature an inherent climb movement mode rather than a jump attack — "When the owlbear drops onto a creature from above — leaping down from a wall, ledge, or canopy at least a short fall's height — its hooked foreclaws drive the target to the ground: the target must succeed on a Strength saving throw or be knocked Prone and Restrained under the owlbear's weight until the start of its next turn, pinned against the stone it just left." — Owlbear [seat: action [action/save/condition]] (closest offered: leap) [effect: movement] [menu: lure sensory-strike seal pacify escalating-dread terror-pulse push-prone reveal trample leap ground-burst disarm thrown-burst-seed execute active-toll slow-bolt herd drain curse-debt wind-up blighted-ground zone pounce wail zone-seed hook-rider] [same-cell unoffered: swallow gaze-single snare shield-bash random-ray snare-bolt exploiter] [same-seat rejected: swallow:hold-shape thrown-burst:cr-range gaze-single:body-verdict snare:body-verdict reel:hold-shape condition-payoff:needs-imposed shield-bash:body-verdict hook-drag:role pull-through:role random-ray:body-verdict spew:body-verdict burrow-ambush:movement obstacle-pull:role snare-bolt:body-verdict exploiter:needs-imposed] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Owlbear" — donor skirmisher-3, CR 3
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 04-tollkeeper-of-the-chapel

**Typed:** `a chapel bell-ringer's ghost that tolls for the dying`

**signature elements:** the tolling of the phantom bell [object] | marks one living soul as the dying [behavior] | drifts through walls in shadow [body]

**identity:** The bell-ringer's ghost opens by sounding its phantom bell, a slow toll that marks one living soul within earshot as 'the dying' and turns the spirit toward it through walls and doors. Each round it drifts through stone to the marked victim and strikes with the bell's cold clapper, and each time it strikes the bell tolls again, dragging the victim closer to the grave it already announced. It is patient and ceremonial, never rushing, never fleeing — it treats every kill as a ritual properly performed, and if the light of the living burns it, it simply withdraws through the wall and resumes the toll until the mark dies or dawn ends the service.

**lore:** A chapel bell-ringer who died with the rope still in his hands, still convinced the bells must be rung for every soul passing over, now keeps his post forever and rings the living into their graves rather than wait for others to die.

### The sheet

```
Tollkeeper of the Chapel

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

Ethereal Sight. The tollkeeper can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The tollkeeper can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The tollkeeper makes two Withering Touch attacks. It can replace one attack with a use of Toll of the Dying.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Toll of the Dying. Dexterity Saving Throw: DC 13, one creature within 60 feet. Failure: 13 (3d8) Necrotic damage.

Horrific Visage. Wisdom Saving Throw: DC 13, each creature in a 60-foot Cone that can see the tollkeeper and isn't an Undead. Failure: 10 (2d6 + 3) Psychic damage, and the target has the Frightened condition until the start of the tollkeeper's next turn. Success: The target is immune to this ghost's Horrific Visage for 24 hours.

Possession (Recharge 6). Charisma Saving Throw: DC 13, one Humanoid the tollkeeper can see within 5 feet. Failure: The target is possessed by the tollkeeper; the tollkeeper disappears, and the target has the Incapacitated condition and loses control of its body. The tollkeeper now controls the body, but the target retains awareness. The tollkeeper can't be targeted by any attack, spell, or other effect, except ones that specifically target Undead. The tollkeeper's game statistics are the same, except it uses the possessed target's Speed, as well as the target's Strength, Dexterity, and Constitution modifiers.
The possession lasts until the body drops to 0 Hit Points or the tollkeeper leaves as a Bonus Action. When the possession ends, the tollkeeper appears in an unoccupied space within 5 feet of the target, and the target is immune to this ghost's Possession for 24 hours. Success: The target is immune to this ghost's Possession for 24 hours.

Etherealness. The tollkeeper casts the Etherealness spell, requiring no spell components and using Charisma as the spellcasting ability. The tollkeeper is visible on the Material Plane while on the Border Ethereal and vice versa, but it can't affect or be affected by anything on the other plane.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Owlbear: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 3 taken name(s) the recording carried
[path] twist — Ghost (is) — "ghost" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: ✓ ("a chapel bell-ringer's ghost") | lurker-phantom: key "ghost" (class body)
[concept] name: provided_name rejected — "a chapel bell-ringer's ghost that tolls …" is the description, not a name
[concept] hints: phantom→style ✓ ("a chapel bell-ringer's ghost")
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=phantom energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the tolling of the phantom bell [object] | marks one living soul as the dying [behavior] | drifts through walls in shadow [body]
[concept] identity: The bell-ringer's ghost opens by sounding its phantom bell, a slow toll that marks one living soul within earshot as 'the dying' and turns the spirit toward it through walls and doors. Each round it drifts through stone to the marked victim and strikes with the bell's cold clapper, and each time it strikes the bell tolls again, dragging the victim closer to the grave it already announced. It is patient and ceremonial, never rushing, never fleeing — it treats every kill as a ritual properly performed, and if the light of the living burns it, it simply withdraws through the wall and resumes the toll until the mark dies or dawn ends the service.
[concept] lore: A chapel bell-ringer who died with the rope still in his hands, still convinced the bells must be rung for every soul passing over, now keeps his post forever and rings the living into their graves rather than wait for others to die.
[reskin] print canon route: the Ghost's body outranks the phantom seat — no verb in the words names it; the plain lurker line
[reskin] print canon defenses: HP 39 -> 45, AC 14 -> 11 — the Ghost's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 13, CON 10, INT 10, WIS 12, CHA 17 — the Ghost's at its own CR; attack +5 -> +5, DC 13 (print's)
[reskin] donor: lurker-2 -> CR 3
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] seats: action <- "marks one living soul as the dying" | trait <- "the tolling of the phantom bell"
[reskin] [path] decides: twist on the Ghost (the matcher would have said homebrew)
[reskin] print canon: "a chapel bell-ringer's ghost that tolls for the dying" heads on the Ghost — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the tollkeeper" — the call's own answer (kind), built from the name
[reskin] inline form: "the tollkeeper" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: drain — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a chapel bell-ringer's ghost" -> has (descriptive), head | "tolls for the dying" -> has (mechanical) [asked: at_will/save_single] [askMechanic: curse]
[reskin] open asks handed to the idea call: "tolls for the dying" [curse] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The tollkeeper designates one living creature it can perceive as the d" answers the GM's "tolls for the dying"
[reskin] idea unanchored: trait — "A creature that has heard the tollkeeper's bell and then touches the s" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, seal, random-ray, spew, snare-bolt, zone-seed, blighted-ground, shell-withdraw, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, aberrant-ground, web-walker, energy-aura, noxious-aura, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider
[reskin] menu: taste stands down — action answers the GM's "tolls for the dying", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The tollkeeper designates one living creature it can perceive as the dying, and the phantom bell tolls for it. Until the toll ends, the marked creature cannot regain hit points and takes Necrotic damage at the start of each of its turns, and the tollkeeper always knows the direction and distance to its mark. The toll ends early only if the mark dies, a cleric or paladin successfully turns the toll" [action/save/condition] [family: mark] — menu: execute, wail, lure, active-toll, ground-burst, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, zone, disarm, push-prone, thrown-burst-seed, curse-debt, reveal, wind-up (+ shelf: delayed-brand, blink, patient-defense, self-invisibility, focus, feint-slip, rampage, lay-on-hands, second-wind, aggro-curse, riposte, answering-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] lead by this seat's own clause: action — "curse" from the clause this seat serves, not the sheet's "drain"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — curse: curse-debt, delayed-brand
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: curse-debt (save/damage), delayed-brand (start_of_turn/damage), lure (save/condition)
[reskin] keys would have bound: action — active-toll, sensory-strike (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: delayed-brand, escalating-dread, sensory-strike, lure, pacify — the key word does not mean the mechanic here
[reskin] closest refused: action — "curse-debt" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: marks one target so it cannot regain hit points and takes damage at th)
[reskin] seat authored nothing: action — the call was asked to write an action for "The tollkeeper designates one living creature it can perceive as the d" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] authored row answers the GM: action — "Toll of the Dying" was written for "tolls for the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("marks one target so it cannot regain hit points and takes damage at th") and wrote an action instead: "Toll of the Dying" -> Actions. *Wisdom Saving Throw*: DC 13, one creature within 60 feet. *Failure:* 13 (3d8) Necrotic damage.
[reskin] authored row numbers: "Toll of the Dying" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Toll of the Dying" after "you wrote no row of the kind asked for (an action)"
[reskin] signature authored: no template — the seat wrote it -> Actions/"Toll of the Dying" ("The tollkeeper designates one living creature it can perceive as the dying, and the phantom bell tolls for it. Until the toll ends, the marked creature cannot r [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of the clapper: a struck target that is marked as the dying cannot regain hit points for the duration of the toll, and its wounds bleed black and will not close." [trait/always/defense] [family: mark] — menu: phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial, guarded-stance (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), uncanny-sense (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — resonant-body (toll, bell)
[reskin] word match declined by the call: resonant-body, fear-aura, relic-object — the key word does not mean the mechanic here
[reskin] closest refused: trait — "kill-denial" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: prevents a struck target from regaining hit points while the toll last)
[reskin] clause already answered: "tolls for the dying" is carried by "Toll of the Dying" — the seat read the sheet and declined to write a second row for it
[reskin] seat authored the row: trait — the call refused every template for no_fit ("prevents a struck target from regaining hit points while the toll last") and wrote a trait instead: "Toll of the Dying" -> Traits. While a creature struck by the tollkeeper's Necrotic Clapper is marked as dying, the marked creature cannot regain hit p
[reskin] authored row numbers: "Toll of the Dying" — the call declared 0 number(s) promised
[reskin] free signature row: "Toll of the Dying" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Toll of the Dying" is HANDED "a chapel bell-ringer's" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] trait declined — the name is taken: "Toll of the Dying" already names a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one, so the row leaves and the fallback stands in
[reskin] weapons answered: Necrotic Clapper = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Ghost's own type stands
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Necrotic Clapper" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the tollkeeper makes two Withering Touch attacks." — the Ghost's own
[reskin] save follows the effect: Actions/"Toll of the Dying" Wisdom -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in nothing — the Ghost's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Toll of the Dying.
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 7 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] ask vs row ok: "tolls for the dying" -> "Toll of the Dying" — trigger at_will
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Toll of the Dying: The signature 'toll for the dyi…. (about: "*Failure:* 13 (3d8) Necrotic damage.")]
[reskin] audit defect: Actions/"Toll of the Dying" [model-written] medium other (the audit said "undelivered") — The signature 'toll for the dying' action is a bare damage save with no bell, no sound, and no effect that reads as tolling for anyone — it does not deliver the requested concept and offers a GM nothing distinctive to narrate. — Give the toll a mechanic that expresses the bell and the dying: e.g. it marks the target as dying (a condition or state other rows can key on) or rings out so nearby dying creatures are affected, rather than plain Necrotic damage. (about: "*Failure:* 13 (3d8) Necrotic damage.")
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Tollkeeper of the Chapel" — donor lurker-2, CR 3
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 05-air-elemental

**Typed:** `name: Air Elemental | that carries stolen voices`

**signature elements:** a howling wind-body that hurls and engulfs foes [body] | stolen voices crying out of the vortex [aura] | mimicking a victim's voice to disorient them [behavior]

**identity:** A whirlwind of living storm-air that spirals through a fight throwing bodies and debris even as a chorus of stolen voices spills out of it — pleading, taunting, screaming in dead strangers' tones — to shake and confuse the foes it corners. It hurls prey with its winds and drives them back into its own howling wake, and it fights to the last gust, because every voice it devours is one it refuses to give back.

**lore:** Born where a great wind passed through a field of dying last words, this elemental hoards the voices of the fallen and wanders the wastes seeking new ones to add to its endless, babbling chorus.

### The sheet

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

Skills Athletics +5, Perception +3

Resistances Bludgeoning, Lightning, Piercing, Slashing

Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious

Senses darkvision 60 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks. It can replace one attack with a use of Stolen Voices.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Stolen Voices. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of its next turn. If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.

Whirlwind (Recharge 4-6). Strength Saving Throw: DC 13, one Medium or smaller creature in the air elemental's space. Failure: 24 (4d10 + 2) Thunder damage, and the target is pushed up to 20 feet straight away from the air elemental and has the Prone condition. Success: Half damage only.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Tollkeeper of the Chapel: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 4 taken name(s) the recording carried
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] brute-juggernaut type=Elemental mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("Air Elemental") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Air Elemental" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/voice mind=sapient style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Air Elemental"
[concept] mechanics: none claimed
[concept] signature elements: a howling wind-body that hurls and engulfs foes [body] | stolen voices crying out of the vortex [aura] | mimicking a victim's voice to disorient them [behavior]
[concept] identity: A whirlwind of living storm-air that spirals through a fight throwing bodies and debris even as a chorus of stolen voices spills out of it — pleading, taunting, screaming in dead strangers' tones — to shake and confuse the foes it corners. It hurls prey with its winds and drives them back into its own howling wake, and it fights to the last gust, because every voice it devours is one it refuses to give back.
[concept] lore: Born where a great wind passed through a field of dying last words, this elemental hoards the voices of the fallen and wanders the wastes seeking new ones to add to its endless, babbling chorus.
[reskin] print canon route: the Air Elemental's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 89 -> 90, AC 14 -> 15 — the Air Elemental's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 14, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's at its own CR; attack +6 -> +8, DC 13 (print's)
[reskin] donor: brute-5 -> CR 5
[reskin] seats: action <- "mimicking a victim's voice to disorient them" | trait <- "stolen voices crying out of the vortex"
[reskin] [path] decides: twist on the Air Elemental (the matcher agrees)
[reskin] print canon: "Air Elemental — that carries stolen voices" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the air elemental" — the call answered "the air elemental" (kind), which the name does not support
[reskin] inline form: "the air elemental" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (mechanical) [asked: save_single] [askMechanic: dazzle]
[reskin] open asks handed to the idea call: "carries stolen voices" [dazzle]
[reskin] idea anchored: action — "The elemental vents a chorus of stolen voices at one creature within r" answers the GM's "carries stolen voices"
[reskin] idea unanchored: trait — "The elemental's howling wind-body engulfs its prey. A creature Frighte" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, random-ray, spew, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "carries stolen voices", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] signature idea (action): "The elemental vents a chorus of stolen voices at one creature within reach of its winds — each in a dead stranger's pleading tone. The target must succeed on a Wisdom saving throw or be Frightened of the air elemental until the end of its next turn, and while Frightened this way it cannot take Reactions." [action/save/condition] [family: mark] — menu: trample, leap, active-toll, ground-burst, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, wind-up, execute, lure, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, rampage, second-wind, aggro-curse, self-invisibility, focus, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, stunning-strike, charge-push, pounce, charge, isolation)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), push-prone (save/condition)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: terror-pulse, herd, lure, pacify — the key word does not mean the mechanic here
[reskin] free signature row: action — "escalating-dread" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "stolen voices crying out of the vortex" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Stolen Voices" is HANDED "carries stolen voices" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: escalating-dread -> Actions/"Stolen Voices" ("A chorus of stolen voices frightens the target; the escalating-dread row is a si [shape fit, no verb match]")
[reskin] signature idea (trait): "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed on a Strength saving throw; on a failure it is dragged along in the elemental's wake, moving with it when the elemental moves, and it remains engulfed until it is no longer Frightened or the elemental lets it go." [trait/always/movement] [family: drag] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, mimicry, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: relentless-pursuit (always/movement), bound (always/movement), phobia (always/condition)
[reskin] keys would have bound: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: mimicry — the key word does not mean the mechanic here
[reskin] closest refused: trait — "mimicry" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on a failed Strength save, drags a Frightened engulfed creature along )
[reskin] seat answered, but: the call said "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and " is carried by "Engulfing Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's howling wind-body engulfs its prey. A creature Frighte" and wrote no row of that kind (refused: "Engulfing Wake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Engulfing Wake" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] seat answered, but: the call said "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and " is carried by "Engulfing Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's howling wind-body engulfs its prey. A creature Frighte" and wrote no row of that kind (refused: "Engulfing Wake" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Engulfing Wake" — a trait is not a save — the save form takes stat, target and effect as ; second: "Engulfing Wake" — a reaction's save deals no damage here, so say what the target suffers ; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "mimicry" nearest and judged its subject FLIPPED against the clause (on a failed Strength save, drags a Frightened engulfed creature along ); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key mimicry, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "mimicry" is keyed by the GM's stolen voice+stolen voices+voices and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed on a Strength saving throw; on a failure it is dragged along in the elemental's wake, moving with it when the elemental moves, and it remains engulfed until it is no longer Frightened or the elemental lets it go." [trait/always/movement] — the model found no template that holds it (offered: relentless-pursuit, bound, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, undead-fortitude, mimicry, truth-aura, fear-aura)
[reskin] concept-first trait skipped: mimicry — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Gale Slam = none
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 40 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Gale Slam" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] print canon multiattack: "the air elemental makes two Thunderous Slam attacks." — the Air Elemental's own
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in nothing — the Air Elemental's own set, at this sheet's stats and PB 3 (changed STR, CON)
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Stolen Voices.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Stolen Voices" [action/save/condition]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Stolen Voices: The bonus damage clause is keyed to… ability, it also takes 9 (2d8) Thunder damage."), Stolen Voices: The name promises the elemental car…itten for. (about: "one creature within 60 feet")]
[reskin] audit defect: Actions/"Stolen Voices" [model-written] medium other (the audit said "undelivered") — The bonus damage clause is keyed to the target being 'already Frightened by this ability', but the only Frightened this ability applies ends 'until the end of its next turn', so a creature can never still be Frightened from a prior use when the ability is used again on it (it would have expired), and the clause can only fire under a GM judgment call about overlapping applications, making the payload effectively undeliverable. — Replace the prior-Frightened condition with a state the block itself creates and tracks, such as a clause that fires only against a target currently Frightened by any source already listed in the block. (about: "If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.")
[reskin] audit defect: Actions/"Stolen Voices" [model-written] medium other (the audit said "undelivered") — The name promises the elemental carries and weaponizes stolen voices, but the entry has no audible or voice-related effect — no Deafened, no sound, no targeting of a voice — so nothing in the row expresses the fiction the GM asked it to carry. — Add an audible component or condition (Deafened, or a sound-based rider) so the row visibly delivers the 'stolen voices' premise it was written for. (about: "one creature within 60 feet")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on a failed Strength save, drags a Frightened engulfed creature along with the elemental's movement — "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed on a Strength saving throw; on a failure it is dragged along in the elemental's wake, moving with it when the elemental moves, and it remains engulfed until it is no longer Frightened or the elemental lets it go." — Air Elemental [seat: trait [trait/always/movement]] (closest offered: mimicry) [effect: movement] [menu: relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind undead-fortitude mimicry truth-aura fear-aura] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role assassinate:role blurred-form:role death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Air Elemental" — donor brute-5, CR 5
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 8 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 06-quarry-scree-wyrm

**Typed:** `a quarry-pit thing of living scree that buries what it catches`

**signature elements:** burying prey in living scree [behavior] | a body of loose packed rubble and shale [body] | an apparently ordinary quarry slope lying in wait [aura]

**identity:** The scree-pit lies in wait as an apparently ordinary slope of loose quarry rubble until prey steps onto its hide, then convulses upward as a shape of grinding stone and seizes a victim in crushing arms of packed shale. Each round it drags its catch down into its body, pouring loose scree over the struggling creature and adding its weight to its own mass, while it fights with implacable patience until broken apart — it does not retreat from a wound, only tighten its crushing grip.

**lore:** A quarry-pit thing born from the grudge of a worked-out stone pit and the hundreds of tons of rubble left in it, it wants only to refill the hollow it came from with warm, breathing bodies.

### The sheet

```
Quarry Scree-Wyrm
Large elemental, unaligned
Armor Class

13 (natural armor)

Hit Points: 

93 (11d10 + 33)

Speed: 

30 ft., burrow 30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

16 (+3)

	

4 (-3)

	

15 (+2)

	

4 (-3)

Skills: 

Athletics +6, Perception +5

Saving Throws: 

STR +6

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

tremorsense 60 ft., passive Perception 15

Languages: 

None

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Sure Footing.Difficult Terrain composed of rubble doesn't cost the scree-wyrm extra movement, and the scree-wyrm can move across rubble without needing to make an ability check.
Entomb (Bonus Action).The scree-wyrm entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the scree-wyrm, and takes 7 (2d6) thunder damage at the start of each of the scree-wyrm's turns. The scree-wyrm can have only one creature entombed at a time. If the scree-wyrm takes 15 damage or more in a single turn from the entombed creature, the scree-wyrm must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the scree-wyrm. If the scree-wyrm dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The scree-wyrm makes two Shale Grip attacks. It can replace one attack with a use of Shale Spray.
Shale Grip: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage plus 7 (2d6) thunder damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Shale Spray: Each creature in a 30-foot cone must make a DC 14 Constitution saving throw. On a failed save, the target is blinded until the end of its next turn.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Air Elemental: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 5 taken name(s) the recording carried
[path] homebrew — "a quarry-pit thing of living scree that buries what it catches" (call)
[route] brute-grappler type=Elemental mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "buries what it catches" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("buries what it catches") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "quarry-pit thing of living scree…" is the description, not a name
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/grasping mind=bestial style=grappler energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: burying prey in living scree [behavior] | a body of loose packed rubble and shale [body] | an apparently ordinary quarry slope lying in wait [aura]
[concept] identity: The scree-pit lies in wait as an apparently ordinary slope of loose quarry rubble until prey steps onto its hide, then convulses upward as a shape of grinding stone and seizes a victim in crushing arms of packed shale. Each round it drags its catch down into its body, pouring loose scree over the struggling creature and adding its weight to its own mass, while it fights with implacable patience until broken apart — it does not retreat from a wound, only tighten its crushing grip.
[concept] lore: A quarry-pit thing born from the grudge of a worked-out stone pit and the hundreds of tons of rubble left in it, it wants only to refill the hollow it came from with warm, breathing bodies.
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 5
[reskin] donor: brute-5-grappler -> CR 5
[reskin] seats: action <- "burying prey in living scree" | trait <- "a body of loose packed rubble and shale"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Entomb — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the scree-wyrm" — the call's own answer (kind), built from the name
[reskin] inline form: "the scree-wyrm" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral" -> Unaligned — a Elemental the call reads as bestial at INT 4 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "a quarry-pit thing of living scree" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a quarry-pit thing of living scree" -> has (mechanical) [asked: at_will/attack] [askMechanic: grapple] | "buries what it catches" -> has (mechanical) [asked: on_hit/condition] [askMechanic: swallow]
[reskin] answered by the chassis: "a quarry-pit thing of living scree" asks grapple and "Shale Grip" already carries it (declared imposes) — no row is requested for it, and the row now carries the GM's words
[reskin] answered by the chassis: "buries what it catches" asks swallow and "Entomb" already carries it (declared engulf_engine) — no row is requested for it, and the row now carries the GM's words
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The scree-wyrm convulses its hide and hurls a fan of loose shale at on" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The scree-wyrm can pass for an ordinary slope of loose quarry rubble w" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: shield-bash, active-toll, random-ray, herd, drain, shell-withdraw, rally, coating, heated-body, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, life-drain
[reskin] menu pruned: action — exploiter (the sheet cannot render them)
[reskin] signature idea (action): "The scree-wyrm convulses its hide and hurls a fan of loose shale at one creature it can see — a rattling, choking spray of packed rubble. The target must succeed on a Dexterity saving throw or be Blinded until the end of its next turn as grit and broken stone fill its eyes and mouth." [action/save/condition] [family: mark] — menu: leap, condition-payoff, ground-burst, spew, burrow-ambush, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal (+ shelf: second-wind, aggro-curse, self-invisibility, focus, answering-strike, stunning-strike, charge-push, pounce)
[reskin] lead by this seat's own clause: action — "grapple" from the clause this seat serves, not the sheet's "snare"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), pacify (save/condition), sensory-strike (save/condition)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack often=at_will
[reskin] word match declined by the call: lure, pacify, reveal, condition-payoff — the key word does not mean the mechanic here
[reskin] value check: "Shale Spray" EV 18.7 vs floor 8.8 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature template: sensory-strike -> Actions/"Shale Spray" ("a rattling, choking spray of packed rubble; the target must succeed on a Dexteri [verb: blind:idea]")
[reskin] signature idea (trait): "The scree-wyrm can pass for an ordinary slope of loose quarry rubble whenever it holds still, indistinguishable from a scree pile unless a creature looks closely." [trait/always/defense] [family: mark] — menu: false-appearance, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, evasion, guarded-stance (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: false-appearance (always/defense), bloodied-fury (always/defense), death-restoration (always/defense)
[reskin] keys would have bound: trait — terrain-walk (scree)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack often=at_will
[reskin] trait declined: "Scree Disguise" — no receipt of any kind: no quote, no concept key, and the call named none of this creature's own elements for it (decoration, not a signature)
[reskin] trait bound to the concept's verb (concept-first): terrain-walk — scree in the user's words; the idea path had nothing
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: scree:concept]")
[reskin] weapons answered: Shale Grip = none
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a quarry-pit thing of living scree that " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Shale Spray.
[reskin] row binds its clause: "Sure Footing" answers "a quarry-pit thing of living scree" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "a quarry-pit thing of living scree" -> "Shale Grip" — limit at_will
[reskin] ask vs row MISMATCH: "buries what it catches" -> "Entomb" — trigger: asked on_hit, row reads at_will
[reskin] lint: 0 findings
[reskin] audit: [Entomb: Entombed creatures have no escape DC or in…at the start of each of the scree-wyrm's turns."), Entomb: The escape clause only fires on damage the…must release the target at the end of that turn"), Entomb: Entomb never removes the Grappled conditio…noccupied space within 5 feet of the scree-wyrm")]
[reskin] audit defect: Bonus Actions/"Entomb" [print] high open_ended — Entombed creatures have no escape DC or interior clause to break out, and the only exit (15 damage in a turn, or death) is not a rules action the target can take; the entombed target is removed from play with no path out except the wyrm's own release trigger. — Give the entombed state an escape condition the target can attempt on its own (a check or damage threshold the target can reach), or an interior-escape clause. (about: "While entombed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the scree-wyrm, and takes 7 (2d6) Thunder damage at the start of each of the scree-wyrm's turns.")
[reskin] audit defect: Bonus Actions/"Entomb" [print] high other (the audit said "undelivered") — The escape clause only fires on damage the entombed creature deals, but an entombed creature has Total Cover against effects outside and Blinded/Restrained, making it effectively unable to attack; the stated counterplay is nearly impossible to satisfy. — Decouple the escape trigger from the entombed creature's own attacks, or state that an entombed creature can still attack the wyrm from inside. (about: "If the scree-wyrm takes 15 damage or more in a single turn from the entombed creature, the scree-wyrm must release the target at the end of that turn")
[reskin] audit defect: Bonus Actions/"Entomb" [print] high other — Entomb never removes the Grappled condition, so the target exits the entomb still Grappled by, and Restrained relative to, the same wyrm — the release does not actually free it. — State that the release also ends the Grappled condition on the target. (about: "the target exits Prone in an unoccupied space within 5 feet of the scree-wyrm")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Quarry Scree-Wyrm" — donor brute-5-grappler, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 07-hydra

**Typed:** `name: Hydra | whose stumps smoke instead of regrowing`

**signature elements:** smoking cauterized stumps instead of regrowth [body] | choking smoke cloud that blinds and burns [aura] | many heads biting and trampling through its own smog [behavior]

**identity:** A many-headed hydra that cannot regrow loses nothing but gains a weapon: each severed neck becomes a smoldering cauterized stump that vents searing smoke, so the beast's wounds are not healing but smothering. It opens by lunging with its remaining heads to draw blades and fire, letting foes hack necks free and fill the air with blinding, choking smog, then wades forward through its own smoke to trample and bite what it can no longer see. Under pressure it does not retreat — it bites down and leans into the cuts, feeding the fire inside its own flesh until the battlefield drowns in smoke.

**lore:** Bred in volcanic ash-flats where nothing regrows, this hydra's blood burns shut instead of closing, and it wanders the wastes seeking living things to smother into its own smoldering wound-cloud.

### The sheet

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

Ash Choke.Any creature that starts its turn in a 10-foot radius originating from the hydra must make a DC 16 Constitution saving throw. On a failed save, the target is poisoned until the end of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Hold Breath.The hydra can hold its breath for 1 hour.
Multiple Heads.The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads.For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads. It can replace one attack with a use of Smothering Stump if available.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
Smothering Stump (Recharge 5-6): Each creature in a 15-foot-long, 5-foot-wide line must make a DC 16 Dexterity saving throw, taking 35 (10d6) bludgeoning damage on a failed save and being knocked prone.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Quarry Scree-Wyrm: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 6 taken name(s) the recording carried
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-regenerator: ✓ ("whose stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote
[concept] name: "Hydra" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/elemental mind=bestial style=regenerator energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Hydra"
[concept] mechanics: regeneration
[concept] signature elements: smoking cauterized stumps instead of regrowth [body] | choking smoke cloud that blinds and burns [aura] | many heads biting and trampling through its own smog [behavior]
[concept] identity: A many-headed hydra that cannot regrow loses nothing but gains a weapon: each severed neck becomes a smoldering cauterized stump that vents searing smoke, so the beast's wounds are not healing but smothering. It opens by lunging with its remaining heads to draw blades and fire, letting foes hack necks free and fill the air with blinding, choking smog, then wades forward through its own smoke to trample and bite what it can no longer see. Under pressure it does not retreat — it bites down and leans into the cuts, feeding the fire inside its own flesh until the battlefield drowns in smoke.
[concept] lore: Bred in volcanic ash-flats where nothing regrows, this hydra's blood burns shut instead of closing, and it wanders the wastes seeking living things to smother into its own smoldering wound-cloud.
[reskin] print canon route: the Hydra's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon route: the regenerator seat's organ leaves too — the Hydra has no Regeneration of its own
[reskin] print canon defenses: HP 136 -> 184, AC 14 -> 15 — the Hydra's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 20, INT 2, WIS 10, CHA 7 — the Hydra's at its own CR; attack +7 -> +8, DC 16 (print's)
[reskin] donor: brute-5 -> CR 8
[reskin] seats: action <- "many heads biting and trampling through its own smog" | trait <- "smoking cauterized stumps instead of regrowth"
[reskin] [path] decides: twist on the Hydra (the matcher agrees)
[reskin] print canon: "Hydra — whose stumps smoke instead of regrowing" heads on the Hydra — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the hydra" — the call answered "the hydra" (kind), which the name does not support
[reskin] inline form: "the hydra" — the model's own reading of the name
[reskin] the sheet's declared ask: escalate — the route call's one answer for the whole concept
[reskin] lacks asked: "instead of regrowing"
[reskin] the clause is its own quote: trigger "at_will" stands on "Hydra — whose stumps smoke instead of regrowing" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "Hydra — whose stumps smoke instead of regrowing" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Hydra — whose stumps smoke instead of regrowing" -> LACKS (mechanical) [asked: at_will/at_will/save_area] [askMechanic: zone]
[reskin] open asks handed to the idea call: "Hydra — whose stumps smoke instead of regrowing" [zone]
[reskin] idea anchored: action — "The hydra rears and slams its cauterized stumps and trampling forelimb" answers the GM's "Hydra — whose stumps smoke instead of regrowing"
[reskin] idea unanchored: trait — "Wherever the hydra moves, its smoldering stumps trail a smoking haze —" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 35 of 35 answered; not true of this body: shield-bash, active-toll, random-ray, herd, drain, shell-withdraw, rally, coating, false-appearance, absorption, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "Hydra — whose stumps smoke instead of regrowing", so role and style do not filter the menu (legality still does); 20 template(s) offered
[reskin] signature idea (action): "The hydra rears and slams its cauterized stumps and trampling forelimbs down in a stinking wall of its own smoke — each creature in a line in front of it must succeed on a Dexterity saving throw or take Bludgeoning damage and be knocked Prone, and the ground it passes is left choked with searing fumes until the end of its next turn." [action/save/condition] [family: zone] — menu: trample, leap, thrown-burst, ground-burst, spew, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, zone, execute, lure, pacify, slow-bolt, sensory-strike, disarm, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, rampage, second-wind, aggro-curse, self-invisibility, focus, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, affliction, contagion, stunning-strike, charge-push, pounce, charge, isolation)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] declared mechanic leads the menu: action — escalate: wind-up, execute
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: wind-up (save/damage), execute (save/damage), escalating-dread (save/condition)
[reskin] keys would have bound: action — zone, zone-seed (smoke)
[reskin] classification handed to the fit call: shape=save_area when=at_will often=at_will
[reskin] word match declined by the call: trample, ground-burst, spew — the key word does not mean the mechanic here
[reskin] closest refused: action — "leap" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an area that deals damage and knocks each target Prone in a line, then)
[reskin] authored row answers the GM: action — "Smothering Stump" was written for "Hydra — whose stumps smoke instead of regrowing", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("an area that deals damage and knocks each target Prone in a line, then") and wrote an action instead: "Smothering Stump" -> Actions. *Dexterity Saving Throw*: DC 16, each creature in a 15-foot Line. *Failure:* 35 (10d6) Bludgeoning damage, and the targe
[reskin] authored row numbers: "Smothering Stump" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Smothering Stump" is HANDED "Hydra — whose stumps smoke instead of regrowing" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Smothering Stump" ("The hydra rears and slams its cauterized stumps and trampling forelimbs down in a stinking wall of its own smoke — each creature in a line in front of it must s [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Wherever the hydra moves, its smoldering stumps trail a smoking haze — the ground it leaves is heavily obscured and reeks of ash, so creatures that choke in it are Poisoned while they stand within, and the hydra itself, blind to the cloud, still hunts by its heat." [trait/always/condition] [family: zone] — menu: phobia, energy-aura, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: heated-body, bloodied-burst, weapon-lodge)
[reskin] lead by this seat's own clause: trait — "zone" from the clause this seat serves, not the sheet's "escalate"
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — zone: energy-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: energy-aura (start_of_turn/damage), phobia (always/condition), berserk (always/condition)
[reskin] classification handed to the fit call: shape=save_area when=at_will often=at_will
[reskin] word match declined by the call: energy-aura, phobia, berserk, kill-denial, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, noxious-aura, truth-aura, fear-aura, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, heated-body — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:condition:poisoned: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:condition:poisoned" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "choking smoke cloud that blinds and burns" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] free signature row: "Ash Choke" — the trait seat cannot quote the GM, but the call names the element it expresses: "choking smoke cloud that blinds and burns". Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] signature template (trait): composed:zone:condition:poisoned -> Traits/"Ash Choke" ("chimneys of stinking ash rise from its wounds and the fumes are lethal poison, c [shape fit, no verb match]")
[reskin] weapons answered: Bite = none
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon multiattack: "the hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] element immunity: Fire — the call read this creature's energy as Fire and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Fire (merged into the header write)
[reskin] immunities stamped for type: Monstrosity -> Fire
[reskin] print canon saves: proficient in nothing — the Hydra's own set, at this sheet's stats and PB 3 (changed STR, CON)
[reskin] print canon skills: "Athletics +8, Perception +3" -> "Perception +6" — the Hydra's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Fire -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] print canon trait: Hold Breath — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] area swap gated: "Smothering Stump (Recharge 5-6)" deals 35 to an area in place of a 10 attack — print offers no at-will area swap that out-damages the attack it replaces (0 of its 24), so it takes print's Recharge
[reskin] multiattack replacement clause: It can replace one attack with a use of Smothering Stump (Recharge 5-6).
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Ash Choke" [no template]
[reskin] ask vs row MISMATCH: "Hydra — whose stumps smoke instead of regrowing" -> "Smothering Stump" — limit: asked at_will, row reads recharge
[reskin] lint fixed: line-dimensions — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Ash Choke carries "choking smoke cloud that blinds and burns" — "The target has the Poisoned condition"
[reskin] audit: [Smothering Stump (Recharge 5-6): The name promises…damage, and the target has the Prone condition."), Smothering Stump (Recharge 5-6): The payload is a …ot. (about: "the target has the Prone condition"), Smothering Stump (Recharge 5-6): Prone from a save…ve. (about: "the target has the Prone condition")]
[reskin] audit rename held — "Smothering Stump" was written for the GM's own clause (cl_1atlsmk: "Hydra — whose stumps smoke instead of regrowing"), so "Crushing Stump" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Smothering Stump" [model-written] medium weak — The payload is a momentary Prone on a Recharge 5-6 single-line action, so the stump impact has no lasting teeth and reads as a weak situational rider. — Give the failed save a lingering effect (e.g. the target has the Poisoned condition or is Restrained) so the stump is worth its Recharge slot. (about: "the target has the Prone condition")
[reskin] audit defect: Actions/"Smothering Stump" [model-written] low open_ended — Prone from a save has no end condition within the entry; the target relies entirely on spending movement to stand, and a target with 0 Speed cannot clear it. — Add an explicit end condition (e.g. "until the end of its next turn") or a repeat save. (about: "the target has the Prone condition")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra — whose stumps smoke instead of regrowing"
[reskin] multiattack citation synced: "Multiattack" cites each row as the row is named — a gated row reads "if available" as print writes it, an ungated row reads bare
[reskin] done: "Hydra" — donor brute-5, CR 8
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 08-lashed-timber-ram

**Typed:** `a siege-engine golem of lashed timber that shoulders through walls`

**signature elements:** shoulders through walls [behavior] | lashed timber body [body] | grinding battering-ram assault [behavior]

**identity:** The siege-golem announces itself by walking in a straight line: it lowers a shoulder of bound logs and drives through the nearest wall, fence, or gate, then grinds to a stop inside the gap and turns its blunt timber mass on whatever stands in the breach. Every round after it is a slow, methodical battering ram — it shoves the frontmost foe back, collapses the floor, and shoulders deeper into the structure, never flanking and never retreating. It does not toy or gloat; it simply keeps hitting until it is reduced to splinters, since a lash-thing built for one assault has no notion of flight.

**lore:** A siege-golem is what a desperate army lashes together when it has more timber and rope than time — felled trees bound into a walking ram and given just enough borrowed spirit to stumble toward the walls it was built to break, and it keeps wanting to finish the siege long after the war has ended.

### The sheet

```
Lashed Timber Ram

Large Construct, Unaligned

AC 15
Initiative -1 (9)

HP 153 (18d10 + 54)

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

Immutable Form. The timber ram can't shape-shift.

Magic Resistance. The timber ram has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The timber ram makes two Battering Log attacks.

Battering Log. Melee Attack Roll: +8, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage.

Trample (Recharge 5-6). The timber ram moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 16. Failure: 27 (6d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Hydra: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 7 taken name(s) the recording carried
[path] homebrew — "a siege-engine golem of lashed timber that shoulders through walls" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a siege-engine golem of lashed timber") | brute-juggernaut: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "fire" is a guess from what the creature is, not the GM's ask
[concept] name: provided_name rejected — "siege-engine golem of lashed timber…" is the description, not a name
[concept] hints: golem→canon ✗ ("lashed timber that shoulders through wal")
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/terror mind=mindless style=juggernaut energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shoulders through walls [behavior] | lashed timber body [body] | grinding battering-ram assault [behavior]
[concept] identity: The siege-golem announces itself by walking in a straight line: it lowers a shoulder of bound logs and drives through the nearest wall, fence, or gate, then grinds to a stop inside the gap and turns its blunt timber mass on whatever stands in the breach. Every round after it is a slow, methodical battering ram — it shoves the frontmost foe back, collapses the floor, and shoulders deeper into the structure, never flanking and never retreating. It does not toy or gloat; it simply keeps hitting until it is reduced to splinters, since a lash-thing built for one assault has no notion of flight.
[concept] lore: A siege-golem is what a desperate army lashes together when it has more timber and rope than time — felled trees bound into a walking ram and given just enough borrowed spirit to stumble toward the walls it was built to break, and it keeps wanting to finish the siege long after the war has ended.
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] donor: brute-5-juggernaut -> CR 8
[reskin] seats: action <- "shoulders through walls" | trait <- "lashed timber body"
[reskin] the call rejected the canon: the Clay Golem stands down — the resolve answered "golem" → canon ✗ on these words
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the timber ram" — the call's own answer (kind), built from the name
[reskin] inline form: "the timber ram" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: shove — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral" -> Unaligned — a Construct the call reads as mindless at INT 6 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a siege-engine golem of lashed timber" -> has (descriptive), head | "shoulders through walls" -> has (mechanical) [asked: save_area] [askMechanic: shove]
[reskin] open asks handed to the idea call: "shoulders through walls" [shove] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The timber ram lowers its shoulder and lumbers in a straight line; eac" answers the GM's "shoulders through walls"
[reskin] idea unanchored: trait — "When the timber ram takes damage from a melee attack, loose ropes and " names none of the 1 open ask(s); it answered "0" and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, phase-slip, heated-body, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "shoulders through walls", so role and style do not filter the menu (legality still does); 18 template(s) offered
[reskin] signature idea (action): "The timber ram lowers its shoulder and lumbers in a straight line; each creature in its path must succeed on a Strength saving throw or be pushed directly away from the ram and knocked Prone as the bound logs grind through the space it occupied." [action/save/condition] [family: breach] — menu: leap, throw-retrieve, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, trample, thrown-burst, execute, lure, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, second-wind, aggro-curse, self-invisibility, focus, rampage, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — shove: push-prone, disarm
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: push-prone (save/condition), disarm (save/movement), escalating-dread (save/condition)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: push-prone, wind-up, ground-burst — the key word does not mean the mechanic here
[reskin] row kept the template's own name: action — "Trample" is trample's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] value check: "Trample (Recharge 5-6)" EV 41 vs floor 14 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] signature template: trample -> Actions/"Trample (Recharge 5-6)" ("The ram lumbers in a straight line through the spaces of creatures, who must mak [verb: ram:idea]")
[reskin] signature idea (trait): "When the timber ram takes damage from a melee attack, loose ropes and splintered logs lash out at the attacker: the creature must succeed on a Dexterity saving throw or be Restrained until it uses its action to tear free, as the ram's broken bindings snag and coil around it." [trait/on_being_hit/condition] [family: body-reaction] — menu: absorption, weapon-lodge (+ shelf: false-appearance, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] signature miss: trait — "When the timber ram takes damage from a melee attack, loose ropes and splintered logs lash out at the attacker: the creature must succeed on a Dexterity saving throw or be Restrained until it uses its action to tear free, as the ram's broken bindings snag and coil around it." [trait/on_being_hit/condition] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, weapon-lodge, false-appearance, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] weapons answered: Battering Log = none; Breach Shove = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] absorption dropped: "Lightning Absorption" — the concept names no energy, so the chassis's organ has no warrant (a timber ram does not eat lightning; critic 2026-10-30)
[reskin] dead name still carried — "Lightning Absorption" names a row that is still on the sheet; no sweep
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a siege-engine golem of lashed timber th" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] save re-derived after a retype: Actions/Trample — a Strength save for a condition the row IMPOSES, which calls for Dexterity or Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] audit: [Trample (Recharge 5-6): The name Trample promises …nters is targeted once by the following effect.")]
[reskin] audit defect: Actions/"Trample" [catalog] medium misnamed — The name Trample promises a stampede that flattens bodies it passes, but the text delivers only 'moves through spaces' plus a saving throw, with no damage tied to being beneath the hooves and no clear timing of when during the move each save resolves. — Tie the effect to the creature's space being entered and make the damage the actual trampling rather than a generic save pass-through. (about: "The timber ram moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Lashed Timber Ram" — donor brute-5-juggernaut, CR 8
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 09-stone-golem

**Typed:** `name: Stone Golem | carved as a weeping saint`

**signature elements:** the weeping carved face [body] | mournful keen that breaks the will of listeners [behavior] | carved stone fists that shatter whatever stands in its path [body]

**identity:** The Weeping Saint opens by walking straight through cover and barriers to reach the nearest sinner, stone fists swinging in slow, crushing arcs. Every round it tolls a mournful, resonant keen that saps the will of those who hear it while it grinds forward, unshakeable, and it never flees — it fights to the death, patient and sorrowful, as though the fight were a penance it must finish. Under pressure it does not rage; it weeps harder, its hollow face streaming dust like tears, and presses on with the same unhurried, inexorable grief.

**lore:** A master sculptor carved it as a saint to mourn a plague-dead congregation, and the grief poured into the stone awakened it; it now wanders ruined shrines and plague-towns, believing every living creature it meets is a mourner who must be brought to kneel.

### The sheet

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

Immutable Form. The golem can't shape-shift.

Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The golem makes two attacks, using Slam or Force Bolt in any combination. It can replace one attack with a use of Keening Glare.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Keening Glare. Wisdom Saving Throw: DC 17, each creature of the golem's choice in a 30-foot Emanation originating from the golem that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's terror for 24 hours.

Bonus Actions

Slow (Recharge 5-6). The golem casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Lashed Timber Ram: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 8 taken name(s) the recording carried
[path] twist — Stone Golem (is) — "Name field: Stone Golem" (code)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("carved") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Stone Golem" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: golem→canon ✓ ("Stone Golem — carved construct")
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=grave/forged mind=sapient style=juggernaut energy=Psychic mix=both identity=✓ lore=✓
[concept] name: provided "Stone Golem"
[concept] mechanics: none claimed
[concept] signature elements: the weeping carved face [body] | mournful keen that breaks the will of listeners [behavior] | carved stone fists that shatter whatever stands in its path [body]
[concept] identity: The Weeping Saint opens by walking straight through cover and barriers to reach the nearest sinner, stone fists swinging in slow, crushing arcs. Every round it tolls a mournful, resonant keen that saps the will of those who hear it while it grinds forward, unshakeable, and it never flees — it fights to the death, patient and sorrowful, as though the fight were a penance it must finish. Under pressure it does not rage; it weeps harder, its hollow face streaming dust like tears, and presses on with the same unhurried, inexorable grief.
[concept] lore: A master sculptor carved it as a saint to mourn a plague-dead congregation, and the grief poured into the stone awakened it; it now wanders ruined shrines and plague-towns, believing every living creature it meets is a mourner who must be brought to kneel.
[reskin] print canon route: the Stone Golem's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] donor: brute-9 -> CR 10
[reskin] seats: action <- "mournful keen that breaks the will of listeners" | trait <- "the weeping carved face"
[reskin] [path] decides: twist on the Stone Golem (the matcher agrees)
[reskin] print canon: "Stone Golem — carved as a weeping saint" heads on the Stone Golem — print's rows ride along; the seat stays
[reskin] alignment by body: Neutral -> Unaligned — a Construct at INT 3 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the golem" — the call answered "the golem" (kind), which the name does not support
[reskin] inline form: "the golem" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Stone Golem — carved as a weeping saint" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The golem raises its hollow face and looses a resonant keen aimed at e" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The golem's carved face is a channel for its grief; whenever a creatur" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The golem raises its hollow face and looses a resonant keen aimed at every hostile creature within a short range that can hear it. Each must succeed on a Wisdom saving throw or become Frightened of the golem until the end of its next turn; a creature that fails while already Frightened by the golem is instead stunned with grief until the end of its next turn." [action/save/condition] [family: zone] — menu: trample, leap, thrown-burst, throw-retrieve, active-toll, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal (+ shelf: rampage, second-wind, aggro-curse, self-invisibility, focus, answering-strike, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), push-prone (save/condition)
[reskin] word match declined by the call: escalating-dread, lure, push-prone, pacify, sensory-strike, reveal, stunning-strike — the key word does not mean the mechanic here
[reskin] free signature row: action — "terror-pulse" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "mournful keen that breaks the will of listeners" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Keening Glare (2/Day)" is HANDED "carved as a weeping saint" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: terror-pulse -> Actions/"Keening Glare (2/Day)" ("raises its hollow face and looses a resonant keen at every hostile creature with [shape fit, no verb match]")
[reskin] signature idea (trait): "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible dust like tears, and that creature must succeed on a Wisdom saving throw or have the attack miss or the effect fail as remorse breaks its concentration. A creature that succeeds on this save is immune to the effect for a day." [trait/on_being_hit/defense] [family: mark] — menu: resonant-body, weapon-lodge (+ shelf: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] verb gate stands down: trait — no template shares a verb, but "carved as a weeping saint" is a clause the sheet has not answered; the GM's own words are the warrant
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does defense; leading: resonant-body (on_being_hit/damage), weapon-lodge (on_being_hit/resource)
[reskin] word match declined by the call: resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest refused: trait — "resonant-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on being hit or harmed, forces the attacker to make a Wisdom save or i)
[reskin] seat answered, but: the call said "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll agains" is carried by "Weeping Stone", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Weeping Stone" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Weeping Stone" — a trait is not a save — the save form takes stat, target and effect as fields and the engine); asking once more with the reason
[reskin] seat answered, but: the call said "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll agains" is carried by "Tears of Remorse", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Tears of Remorse" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Weeping Stone" — a trait is not a save — the save form takes stat, target and effect as f; second: "Tears of Remorse" — a reaction's save deals no damage here, so say what the target suffer; the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible dust like tears, and that creature must succeed on a Wisdom saving throw or have the attack miss or the effect fail as remorse breaks its concentration. A creature that succeeds on this save is immune to the effect for a day." [trait/on_being_hit/defense] — the model found no template that holds it (offered: resonant-body, weapon-lodge)
[reskin] weapons answered: Fist = none; Keening = none; Sorrowful Keen = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] print canon type: the call answered type_source=user for construct, but the GM's words do not name it — the Stone Golem's own type stands
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Fist" -> "Slam" — the Stone Golem's own row
[reskin] print canon multiattack: "the golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Keening" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon saves: proficient in nothing — the Stone Golem's own set, at this sheet's stats and PB 4 (changed STR, CON)
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
[reskin] dead control row: "Keening Glare" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Keening Glare.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Keening Glare" [action/save/condition]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Keening Glare: The effect grants its benefit to cr…inating from the golem that can see or hear it.")]
[reskin] audit defect: Actions/"Keening Glare" [model-written] medium other — The effect grants its benefit to creatures that can see OR hear the golem, but the entry is named for a visual glare — a creature that only hears it (e.g. blinded but not deafened) is affected by a 'glare' it cannot see; the medium is ambiguous when only one sense is available. — Restrict the targeting sense to sight alone (or split the fiction from the mechanic) so a sightless target cannot be 'glared' at. (about: "*Wisdom Saving Throw:* DC 17, each creature of the golem's choice in a 30-foot Emanation originating from the golem that can see or hear it.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on being hit or harmed, forces the attacker to make a Wisdom save or its attack misses/effect fails, with a day-long imm — "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible dust like tears, and that creature must succeed on a Wisdom saving throw or have the attack miss or the effect fail as remorse breaks its concentration. A creature that succeeds on this save is immune to the effect for a day." — Stone Golem [seat: trait [trait/on_being_hit/defense]] (closest offered: resonant-body) [effect: condition] [menu: resonant-body weapon-lodge] [same-cell unoffered: absorption interpose] [same-seat rejected: heated-body:body-verdict absorption:body-verdict bloodied-burst:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Stone Golem" — donor brute-9, CR 10
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 8 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 10-drowned-choir

**Typed:** `a drowned cathedral choir that sings in one voice`

**signature elements:** many drowned throats singing as one voice [behavior] | the hymn that drowns the living in sound [aura] | waterlogged grave-flesh and folded hands [body]

**identity:** The drowned choir hangs as a single drifting wall of pale, waterlogged throats and folded hands, opening with a hymn that drowns the air itself — a crushing, radiant chord that scours the living where they stand. Every round it widens the anthem, holding one unbroken note that heals its own dead flesh and pulls the wounded toward the sound, gliding through stone and water alike to keep the congregation inside its song. It is serene and utterly deliberate, never breaking tempo, and it will not fall back until the last voice in the choir is silenced.

**lore:** They were a cathedral choir drowned in the flood that took their nave, and their vow to sing until the waters recede has bound them together into one voice that no single throat could ever raise.

### The sheet

```
Drowned Choir
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

	

14 (+2)

	

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

darkvision 60 ft., passive Perception 12

Languages: 

Common plus the languages it knew in life

Challenge

10 (5,900 XP)

Proficiency Bonus:

+4

Incorporeal Movement.The drowned choir can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) force damage if it ends its turn inside an object.
Sunlight Sensitivity.While in sunlight, the drowned choir has disadvantage on ability checks and attack rolls.

Actions
Multiattack: The drowned choir makes two Throat attacks. It can replace one attack with a use of Exposing Hymn.
Throat: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 13 (3d8) radiant damage.
Exposing Hymn: One creature within 60 feet must make a DC 15 Dexterity saving throw, taking 18 (4d8) radiant damage on a failed save, or half as much damage on a successful one. On a failed save, until the end of the drowned choir's next turn the target sheds dim light in a 10-foot radius, it can't benefit from the invisible condition, and attack rolls against it have advantage.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Stone Golem: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 9 taken name(s) the recording carried
[path] homebrew — "a drowned cathedral choir that sings in one voice" (call)
[route] lurker-phantom type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: quote not found in the input ("the creature IS the drowned dead — a cho") | swarm: a swarm is a mass of many — the call reads one creature, not a mass | lurker-phantom: taken on rank — its quote was not found, no hard veto | lurker-phantom: key "drowned" (class body)
[concept] name: provided_name rejected — "a drowned cathedral choir that sings in …" is the description, not a name
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=phantom energy=Radiant mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: many drowned throats singing as one voice [behavior] | the hymn that drowns the living in sound [aura] | waterlogged grave-flesh and folded hands [body]
[concept] identity: The drowned choir hangs as a single drifting wall of pale, waterlogged throats and folded hands, opening with a hymn that drowns the air itself — a crushing, radiant chord that scours the living where they stand. Every round it widens the anthem, holding one unbroken note that heals its own dead flesh and pulls the wounded toward the sound, gliding through stone and water alike to keep the congregation inside its song. It is serene and utterly deliberate, never breaking tempo, and it will not fall back until the last voice in the choir is silenced.
[concept] lore: They were a cathedral choir drowned in the flood that took their nave, and their vow to sing until the waters recede has bound them together into one voice that no single throat could ever raise.
[reskin] mind tier held: WIS stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: CHA 15 -> 20 — the call read this creature as formidable at CR 10
[reskin] donor: lurker-5-phantom -> CR 10
[reskin] seats: action <- "many drowned throats singing as one voice" | trait <- "the hymn that drowns the living in sound"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the drowned choir" — the call's own answer (kind), built from the name; the rules would have said "Choir"
[reskin] inline on stamped rows: "Choir" -> "the drowned choir" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "the drowned choir" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "sings in one voice" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "sings in one voice" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a drowned cathedral choir" -> has (descriptive), head | "sings in one voice" -> has (mechanical) [asked: at_will/at_will/save_area] [askMechanic: dazzle]
[reskin] open asks handed to the idea call: "sings in one voice" [dazzle] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The drowned choir opens its hymn and every living creature that can he" answers the GM's "sings in one voice"
[reskin] idea unanchored: trait — "The choir's hymn never stops: at the start of each of its turns, the d" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 36 of 36 answered; not true of this body: seal, random-ray, spew, snare-bolt, drain, zone-seed, blighted-ground, shell-withdraw, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "sings in one voice", so role and style do not filter the menu (legality still does); 19 template(s) offered
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The drowned choir opens its hymn and every living creature that can hear it must succeed on a Charisma saving throw or be Deafened and Frightened until the end of the choir's next turn, the radiant chord scouring the air so no other sound can be made or heard. A creature that fails by enough is instead Stunned as the one unbroken voice drowns out its own thoughts." [action/save/condition] [family: nova] — menu: leap, wail, lure, active-toll, ground-burst, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, trample, thrown-burst, execute, disarm, push-prone, thrown-burst-seed, curse-debt, reveal, wind-up (+ shelf: delayed-brand, patient-defense, self-invisibility, focus, feint-slip, rampage, lay-on-hands, second-wind, aggro-curse, rally, riposte, answering-strike, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] lead by this seat's own clause: action — "dazzle" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — dazzle: sensory-strike, reveal
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: sensory-strike (save/condition), reveal (save/condition), lure (save/condition)
[reskin] classification handed to the fit call: shape=save_area when=at_will often=at_will
[reskin] word match declined by the call: active-toll, sensory-strike, escalating-dread, lure — the key word does not mean the mechanic here
[reskin] closest refused: action — "terror-pulse" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: imposes Deafened and Frightened together on an area of hearers, with a)
[reskin] seat authored nothing: action — the call was asked to write an action for "The drowned choir opens its hymn and every living creature that can he" and wrote no row of that kind (refused: "One Unbroken Voice" — Deafened alone is too slight to cost an action — choose Frightened, Charmed or Stunned, whichever fits this creature, or keep Deafened and add damage) (it belongs in the description)
[reskin] seat asked again: action — the first answer was refused ("One Unbroken Voice" — Deafened alone is too slight to cost an action — choose Frightened, Charmed or Stunned,); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "The drowned choir opens its hymn and every living creature that can he" and wrote no row of that kind
[reskin] seat refused twice: action — first: "One Unbroken Voice" — Deafened alone is too slight to cost an action — choose Frightened,; second: you wrote no row of the kind asked for (an action); the seat stays empty
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "dazzle", the seat that carries it ended with no row, and "reveal" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] free signature row: action — "reveal" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "the hymn that drowns the living in sound" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] value check: "Drowning Hymn" EV 18.8 vs floor 15.6 (one attack of 2) — added Success: Half
[reskin] signature template: reveal -> Actions/"Drowning Hymn" ("The idea is an area save that deafens and frightens (and stuns on a bad failure) [shape fit, no verb match]")
[reskin] signature idea (trait): "The choir's hymn never stops: at the start of each of its turns, the drowned choir regains hit points if at least one living creature within range of its song is Deafened, Frightened, or Stunned by it — its dead flesh swelling back into harmony so long as the anthem still drowns the living in sound." [trait/start_of_turn/resource] [family: heal] — menu: phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does resource; leading: energy-aura (start_of_turn/damage), truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition)
[reskin] classification handed to the fit call: shape=save_area when=at_will often=at_will
[reskin] word match declined by the call: fear-aura, death-restoration, energy-aura, truth-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "death-restoration" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: the creature regains hit points at the start of its turn while a livin)
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The choir's hymn never stops: at the start of each of its turns, the d" and wrote no row of that kind
[reskin] seat asked again: trait — the first answer was refused (you wrote no row of the kind asked for (a trait)); asking once more with the reason
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The choir's hymn never stops: at the start of each of its turns, the d" and wrote no row of that kind
[reskin] seat refused twice: trait — first: you wrote no row of the kind asked for (a trait); second: you wrote no row of the kind asked for (a trait); the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "death-restoration" nearest and judged its subject FLIPPED against the clause (the creature regains hit points at the start of its turn while a livin); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The choir's hymn never stops: at the start of each of its turns, the drowned choir regains hit points if at least one living creature within range of its song is Deafened, Frightened, or Stunned by it — its dead flesh swelling back into harmony so long as the anthem still drowns the living in sound." [trait/start_of_turn/resource] — the model found no template that holds it (offered: energy-aura, truth-aura, fear-aura, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, assassinate)
[reskin] weapons answered: Throat = none
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a drowned cathedral choir that sings in " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Drowning Hymn.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Drowning Hymn" [action/save/condition]
[reskin] asked but unanswered: "sings in one voice" asked for at_will/at_will and no row binds the clause
[reskin] lint: 0 findings
[reskin] audit: [Drowning Hymn: The name promises drowning or suffo…ion, and attack rolls against it have Advantage"), Drowning Hymn: The revealed/illuminated state has …"until the end of the drowned choir's next turn")]
[reskin] audit rename: "Drowning Hymn" -> "Exposing Hymn"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] imposes Deafened and Frightened together on an area of hearers, with a worse result on a failed save — "The drowned choir opens its hymn and every living creature that can hear it must succeed on a Charisma saving throw or be Deafened and Frightened until the end of the choir's next turn, the radiant chord scouring the air so no other sound can be made or heard. A creature that fails by enough is instead Stunned as the one unbroken voice drowns out its own thoughts." — Drowned Choir [seat: action [action/save/condition]] (closest offered: terror-pulse) [effect: condition] [menu: sensory-strike reveal lure pacify escalating-dread terror-pulse push-prone leap active-toll ground-burst slow-bolt trample thrown-burst execute disarm thrown-burst-seed curse-debt wind-up stunning-strike wail rally riposte] [same-cell unoffered: swallow gaze-single snare seal shield-bash random-ray snare-bolt exploiter] [same-seat rejected: swallow:hold-shape gaze-single:style snare:role reel:role condition-payoff:needs-imposed seal:body-verdict shield-bash:role hook-drag:hold-shape pull-through:engine-key random-ray:body-verdict spew:body-verdict burrow-ambush:movement obstacle-pull:hold-shape snare-bolt:body-verdict herd:role drain:body-verdict exploiter:needs-imposed blighted-ground:body-verdict] [row dropped]
[reskin] [gap] the creature regains hit points at the start of its turn while a living target remains Deafened, Frightened, or Stunned  — "The choir's hymn never stops: at the start of each of its turns, the drowned choir regains hit points if at least one living creature within range of its song is Deafened, Frightened, or Stunned by it — its dead flesh swelling back into harmony so long as the anthem still drowns the living in sound." — Drowned Choir [seat: trait [trait/start_of_turn/resource]] (closest offered: death-restoration) [effect: resource] [menu: energy-aura truth-aura fear-aura phobia bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind evasion relentless-pursuit bound undead-fortitude assassinate] [same-cell unoffered: warded-mending] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path homebrew
[reskin] done: "Drowned Choir" — donor lurker-5-phantom, CR 10
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 3 prompt(s) had no recorded answer during this entry: seat x3
[harness] 8 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 11-vampire

**Typed:** `name: Vampire | who keeps a garden of thorns`

**signature elements:** a garden of grave-thorns it tends and commands [behavior] | thorn-spiked lunge that impales and pins prey [behavior] | undead flesh grown through with briars [body]

**identity:** A blood-drunk gardener of dead ground, it waits beneath its thorns until prey wanders close, then erupts with a single thorn-spiked lunge meant to pin a victim against the briars and bleed them dry. Every round thereafter it drags the wracked body deeper into the hedge, prunes new spines from its own grave-flesh, and lets the garden do the killing while it hangs back in shadow. When bloodied it does not flee — it retreats into the thickest tangle and fights with the cunning, wheedling malice of something that has outlived every hand raised against it.

**lore:** A vampire who buried its coffin in a churchyard bramble and grew a garden of thorns around it now tends that hedge as its true hoard, seeding fresh graves with cuttings and drinking the blood of anyone who strays through the gate.

### The sheet

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

darkvision 60 ft., passive Perception 17

Languages: 

Common plus two other languages

Challenge

13 (10,000 XP)

Proficiency Bonus:

+5

Thorn-Choked Ground.The ground in a 10-foot radius originating from the vampire is Difficult Terrain.
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
Multiattack (Vampire Form Only): The vampire makes two Grave Strike attacks and uses Bite. It can replace one attack with a use of Grave-Briar Bloom.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Grave-Briar Bloom: One creature within 5 feet of the vampire must succeed on a DC 17 Strength saving throw or be restrained until the end of its next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that has the grappled, incapacitated, or restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Drowned Choir: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 10 taken name(s) the recording carried
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[route] lurker type=Undead mechanics=snare — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-trap: ✓ ("keeps a garden of thorns") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] name: "Vampire" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Vampire"
[concept] mechanics: snare
[concept] signature elements: a garden of grave-thorns it tends and commands [behavior] | thorn-spiked lunge that impales and pins prey [behavior] | undead flesh grown through with briars [body]
[concept] identity: A blood-drunk gardener of dead ground, it waits beneath its thorns until prey wanders close, then erupts with a single thorn-spiked lunge meant to pin a victim against the briars and bleed them dry. Every round thereafter it drags the wracked body deeper into the hedge, prunes new spines from its own grave-flesh, and lets the garden do the killing while it hangs back in shadow. When bloodied it does not flee — it retreats into the thickest tangle and fights with the cunning, wheedling malice of something that has outlived every hand raised against it.
[concept] lore: A vampire who buried its coffin in a churchyard bramble and grew a garden of thorns around it now tends that hedge as its true hoard, seeding fresh graves with cuttings and drinking the blood of anyone who strays through the gate.
[reskin] print canon defenses: HP 184 -> 195, AC 16 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: lurker-13 -> CR 13
[reskin] seats: action <- "a garden of grave-thorns it tends and commands" | trait <- "undead flesh grown through with briars"
[reskin] [path] decides: twist on the Vampire (the matcher agrees)
[reskin] print canon: "Vampire — who keeps a garden of thorns" heads on the Vampire — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the vampire" — the call answered "the vampire" (kind), which the name does not support
[reskin] inline form: "the vampire" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 17 (8 + PB 5 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: zone — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vampire —" -> has (descriptive), head | "keeps a garden of thorns" -> has (mechanical) [asked: condition] [askMechanic: zone]
[reskin] open asks handed to the idea call: "keeps a garden of thorns" [zone]
[reskin] idea anchored: action — "The vampire drives its Thorn into a creature, and the wound erupts wit" answers the GM's "keeps a garden of thorns"
[reskin] idea unanchored: trait — "The vampire's grave-flesh is grown through with living briars. Wheneve" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, seal, wail, active-toll, random-ray, spew, snare-bolt, blink, shell-withdraw, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst
[reskin] menu: taste stands down — action answers the GM's "keeps a garden of thorns", so role and style do not filter the menu (legality still does); 8 template(s) offered
[reskin] signature idea (action): "The vampire drives its Thorn into a creature, and the wound erupts with grave-briars. The target is Restrained by the thorned growth; while Restrained, it takes Necrotic damage at the start of each of its turns as the briars drink." [rider/on_hit/condition] [family: mark] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, life-drain, charge (+ shelf: condition-payoff, execute, lure, ground-burst, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, thrown-burst, snare, disarm, push-prone, thrown-burst-seed, curse-debt, reveal, wind-up, patient-defense, self-invisibility, focus, feint-slip, lay-on-hands, second-wind, aggro-curse, riposte, answering-strike)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: contagion (on_hit/condition), stunning-strike (on_hit/condition), pounce (on_hit/condition)
[reskin] keys would have bound: action — drain (vampire)
[reskin] classification handed to the fit call: mechanic=snare shape=condition
[reskin] word match declined by the call: contagion, life-drain, pounce, hook-rider, charge-push — the key word does not mean the mechanic here
[reskin] closest refused: action — "stunning-strike" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on-hit Restrained condition with recurring start-of-turn Necrotic dama)
[reskin] authored row answers the GM: action — "Grave-Briar Bloom" was written for "keeps a garden of thorns", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("on-hit Restrained condition with recurring start-of-turn Necrotic dama") and wrote an action instead: "Grave-Briar Bloom" -> Actions. *Strength Saving Throw*: DC 17, one creature within 5 feet. *Failure:* The target has the Restrained condition until the
[reskin] authored row numbers: "Grave-Briar Bloom" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Grave-Briar Bloom" is HANDED "keeps a garden of thorns" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Grave-Briar Bloom" ("The vampire drives its Thorn into a creature, and the wound erupts with grave-briars. The target is Restrained by the thorned growth; while Restrained, it takes [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The vampire's grave-flesh is grown through with living briars. Whenever it is in Dim Light or Darkness, thorny vines erupt from the ground in a radius around it, turning the area into Difficult Terrain for other creatures; the vampire ignores this difficult terrain." [trait/always/movement] [family: zone] — menu: spider-climb, phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial, berserk
[reskin] verb gate stands down: trait — no template shares a verb, but 5 template(s) whose declared stamps match the idea (always/movement): spider-climb, terrain-walk, aberrant-ground, relentless-pursuit, bound; the declared data is the warrant and the call is worth making
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — zone: aberrant-ground
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: aberrant-ground (always/movement), spider-climb (always/movement), terrain-walk (always/movement)
[reskin] classification handed to the fit call: mechanic=snare shape=condition
[reskin] word match declined by the call: terrain-walk — the key word does not mean the mechanic here
[reskin] free signature row: trait — "aberrant-ground" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "a garden of grave-thorns it tends and commands" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] free signature row: "Thorn Growth" — the trait seat cannot quote the GM, but the call names the element it expresses: "a garden of grave-thorns it tends and commands". Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] signature template (trait): aberrant-ground -> Traits/"Thorn Growth" ("thorny vines erupt from the ground in a radius around it, turning the area into  [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Thorn Growth" -> "Aberrant Ground" — this row is aberrant-ground and does what every aberrant-ground row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Thorn = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Vampire's own type stands
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon attack: "Thorn" -> "Grave Strike" — the Vampire's own row
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Grave-Briar Bloom.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 12 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Aberrant Ground" [trait/always/movement]
[reskin] lint: orphan-condition-ref: "Charmed" is referenced as a state but nothing on the sheet applies it
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Aberrant Ground" claims "a garden of grave-thorns it tends and commands" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Aberrant Ground")
[reskin] audit: [Grave-Briar Bloom: Restrained is a hard-imposed st…ained condition until the end of its next turn."), Aberrant Ground: The trait is named 'Aberrant' but…ginating from the vampire is Difficult Terrain."), Aberrant Ground: The aura has no stated timing for…ginating from the vampire is Difficult Terrain."), Grave-Briar Bloom: As a replacement for one of two…ained condition until the end of its next turn."), Grave-Briar Bloom: The name 'Grave-Briar Bloom' im…in a space. (about: "one creature within 5 feet")]
[reskin] audit rename: "Aberrant Ground" -> "Thorn-Choked Ground"
[reskin] audit rename blocked — "Grave-Thorn Grasp" promises the Grappled condition that "Grave-Briar Bloom" does not deliver
[reskin] audit defect: Actions/"Grave-Briar Bloom" [model-written] medium other (the audit said "undelivered") — Restrained is a hard-imposed state with no escape clause other than waiting; but worse, this single-target Restrained is the enabler for Bite, and nothing in the entry says the thorns persist or that a target already Restrained by it gains anything new — the row as written is a save-or-nothing condition with no thorn/garden fiction in its rules. — State that thorny growths persist in the target's space (difficult terrain or a repeat-save break) so the row delivers a garden, not just a one-turn condition. (about: "The target has the Restrained condition until the end of its next turn.")
[reskin] audit defect: Actions/"Grave-Briar Bloom" [model-written] medium weak — As a replacement for one of two Grave Strikes in Multiattack, the row trades 8 bludgeoning + 7 necrotic damage and a Grappled (escape DC 14) for a one-round Restrained on a single target that then just stands — the bloom has no thorns, no damage, and no lasting teeth, so it is a nuisance where the name promises a grave-briar threat. — Give the row a thorn payload (piercing/necrotic damage or a lingering difficult-terrain patch) so it is a real grave-briar bloom rather than a one-round Restrained. (about: "Strength Saving Throw: DC 17, one creature within 5 feet. Failure: The target has the Restrained condition until the end of its next turn.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
[reskin] done: "Vampire" — donor lurker-13, CR 13
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 12-vesphidion

**Typed:** `a plague-bearing archon of flies that commands lesser swarms`

**signature elements:** plague-bearing aura it spreads [aura] | commands lesser fly-swarms [behavior] | swooping dives on translucent wings [behavior]

**identity:** The archon opens by loosing its fly-swarms wide, seeding the air with plague, then dives through the contaminated space to strike with its own claws and drop prey from height. Each round it commands a lesser swarm to harry and blind while it repositions on the wing, never fighting a stand-up battle. It is a proud, patient commander that will not flee while its swarm endures, but if bloodied past half it withdraws into its cloud and lets the flies finish the work.

**lore:** A plague-archon of the celestial order, it was bound to a diseased world to quarantine a contagion and, in tending it for a century, came to love its illness and now seeks to spread it as doctrine.

### The sheet

```
Vesphidion

Large Celestial, Neutral Evil

AC 18
Initiative +5 (15)

HP 190 (20d10 + 80)

Speed 40 ft., Fly 80 ft.

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
20
+5
+10
WIS
20
+5
+10
MOD
SAVE
CON
18
+4
+4
CHA
20
+5
+5

Skills Perception +10, Stealth +10

Resistances Radiant

Immunities Charmed

Senses darkvision 120 ft.; Passive Perception 20

Languages understands Celestial and Infernal but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Reeking Contagion. Constitution Saving Throw: DC 17, any creature that starts its turn in a 20-foot Emanation originating from Vesphidion. Failure: The target has the Poisoned condition until the end of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Winged Escape. Vesphidion doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Wing Reposition. When a creature Vesphidion can see ends its turn within 5 feet of it, Vesphidion can move up to 10 feet without provoking Opportunity Attacks.

Actions

Multiattack. Vesphidion makes three Talons attacks. It can replace one attack with a use of Command the Swarm.

Talons. Melee Attack Roll: +10, reach 10 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Poison damage. If Vesphidion flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 7 (2d6) Slashing damage and, if it is Large or smaller, has the Prone condition.

Plague Dive (Recharge 5-6). Vesphidion flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Poison damage, and the target has the Prone condition. Success: Half damage.

Command the Swarm. Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Blinded condition until the end of its next turn.

Bonus Actions

Aerial Agility. Vesphidion takes the Dash or Disengage action.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Vampire: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 11 taken name(s) the recording carried
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] skirmisher-winged type=Celestial mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-winged: ✓ ("archon of flies") | skirmisher-winged: key "flies" (class verb)
[concept] name: provided_name rejected — "a plague-bearing archon of flies that co…" is the description, not a name
[concept] hints: swarm→body ✗ ("commands lesser swarms — creatures it co") | winged→style ✗ ("archon of flies — the noun, not flight; ")
[concept] resolve: archetype=skirmisher type=Celestial typeFrom=the route call themes=celestial/aerial mind=sapient style=winged energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: plague-bearing aura it spreads [aura] | commands lesser fly-swarms [behavior] | swooping dives on translucent wings [behavior]
[concept] identity: The archon opens by loosing its fly-swarms wide, seeding the air with plague, then dives through the contaminated space to strike with its own claws and drop prey from height. Each round it commands a lesser swarm to harry and blind while it repositions on the wing, never fighting a stand-up battle. It is a proud, patient commander that will not flee while its swarm endures, but if bloodied past half it withdraws into its cloud and lets the flies finish the work.
[concept] lore: A plague-archon of the celestial order, it was bound to a diseased world to quarantine a contagion and, in tending it for a century, came to love its illness and now seeks to spread it as doctrine.
[reskin] nova capped: "Diving Attack" 67 → 66 (the chassis nova obeys the cap: 66 at CR 13)
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 13
[reskin] mind tier: WIS 16 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: CHA 12 -> 20 — the call read this creature as formidable at CR 13
[reskin] donor: skirmisher-13-winged -> CR 13 (invented — no printed peer)
[reskin] seats: action <- "commands lesser fly-swarms" | trait <- "plague-bearing aura it spreads"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "Vesphidion" — the call's own answer (person), built from the name
[reskin] inline form: "Vesphidion" — the model's own reading of the name
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bearing archon of flies" -> has (descriptive), head | "commands lesser swarms" -> has (mechanical) [asked: condition] [askMechanic: command]
[reskin] open asks handed to the idea call: "commands lesser swarms" [command] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "Vesphidion looses a shrieking command at a lesser swarm it can see wit" answers the GM's "commands lesser swarms"
[reskin] idea unanchored: trait — "Vesphidion's body seethes with the same plague it preaches; the air wi" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: snare-bolt, herd, phase-slip, rally, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "commands lesser swarms", so role and style do not filter the menu (legality still does); 12 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "Vesphidion looses a shrieking command at a lesser swarm it can see within range, and the swarm breaks from its own work to harry a target Vesphidion names: the target must succeed on a Wisdom saving throw or have the Blinded condition until the end of Vesphidion's next turn as flies fill its eyes and mouth, and Vesphidion can order that swarm to move up to its Speed toward the target as part of th" [action/save/condition] [family: mark] — menu: condition-payoff, lure, sensory-strike, disarm, exploiter, execute, pacify, escalating-dread, terror-pulse, slow-bolt, curse-debt, reveal (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, lay-on-hands, riposte, answering-strike, contagion, stunning-strike, isolation)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), sensory-strike (save/condition), exploiter (save/condition)
[reskin] keys would have bound: action — contagion (plague, plagued)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: lure, pacify, escalating-dread, terror-pulse, condition-payoff, curse-debt, reveal — the key word does not mean the mechanic here
[reskin] closest refused: action — "sensory-strike" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: requires a second creature (a swarm) to be ordered, moving it and targ)
[reskin] authored row answers the GM: action — "Command the Swarm" was written for "commands lesser swarms", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("requires a second creature (a swarm) to be ordered, moving it and targ") and wrote an action instead: "Command the Swarm" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Blinded condition until the end
[reskin] authored row numbers: "Command the Swarm" — the call declared (unanswered) number(s) promised
[reskin] value check: "Command the Swarm" EV 27.5 vs floor 13 (one attack of 3) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Command the Swarm" ("Vesphidion looses a shrieking command at a lesser swarm it can see within range, and the swarm breaks from its own work to harry a target Vesphidion names: the  [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Vesphidion's body seethes with the same plague it preaches; the air within its reach is a reeking contagion, and a creature that starts its turn inside that space must succeed on a Constitution saving throw or have the Poisoned condition until the end of its next turn." [trait/start_of_turn/condition] [family: zone] — menu: phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: pack-tactics (always/damage), noxious-aura (start_of_turn/condition), truth-aura (start_of_turn/condition)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: truth-aura, fear-aura, pack-tactics — the key word does not mean the mechanic here
[reskin] free signature row: "Reeking Contagion" — the trait seat cannot quote the GM, but the call names the element it expresses: "plague-bearing aura it spreads". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): noxious-aura -> Traits/"Reeking Contagion" ("the air within its reach is a reeking contagion that Poisoned creatures starting [verb: reek:idea, reeks:idea]")
[reskin] weapons answered: Talons = none; Plague Dive = none
[reskin] chassis nova: "Plague Dive (Recharge 5-6)" — the skirmisher-13-winged's own nova row (its "Diving Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] immunities stamped for type: Celestial -> Charmed
[reskin] resistances derived: Radiant
[reskin] name-canon stands down: the path answered homebrew on "a plague-bearing archon of flies that co" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Command the Swarm.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Reeking Contagion" [trait/start_of_turn/condition]
[reskin] save re-derived after a retype: Actions/Plague Dive — a Strength save for a condition the row IMPOSES, which calls for Dexterity or Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] save re-derived after a retype: Actions/Command the Swarm — a Wisdom save for a condition the row IMPOSES, which calls for Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Reeking Contagion carries "plague-bearing aura it spreads" — "The target has the Poisoned condition until the end of its next turn."
[reskin] audit: [Command the Swarm: The row was written to deliver …inded condition until the end of its next turn."), Command the Swarm: The name promises command over …. (about: "The target has the Blinded condition")]
[reskin] audit rename held — "Command the Swarm" was written for the GM's own clause (cl_1x4jef1: "commands lesser swarms"), so "Stinging Haze" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Command the Swarm" [model-written] high other (the audit said "undelivered") — The row was written to deliver the requested 'commands lesser swarms' fantasy, but its rules summon, reference, or command no swarm at all — it is a plain cone Blinding save that would read identically on any creature without a swarm. — Rewrite so the action actually invokes or directs a swarm (creating/directing a defined swarm entity, or imposing a swarm-driven effect), rather than a generic blinding cone. (about: "*Constitution Saving Throw*: DC 17, each creature in a 30-foot Cone. *Failure:* The target has the Blinded condition until the end of its next turn.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Vesphidion" — donor skirmisher-13-winged, CR 13
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 8 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 13-purple-worm

**Typed:** `name: Purple Worm | that swallowed a war-band's armoury`

**signature elements:** swallowing whole ranks in one lunge [behavior] | a gut packed with broken blades and mail [body] | chitin-ringed maw and burrowing coils [body]

**identity:** The Purple Worm surfaces beneath a marching column and engulfs whole ranks in a single lunge, letting the swallowed armoury grind its victims to death inside it. Every round after, it stays half-buried and drags prey inward, its guts rattling with blades and mail it has no need to chew. It is not cruel, only insatiable — it will not flee while anything still moves in the dirt above it, but once it has swallowed enough it burrows away with its plunder, leaving the battlefield half-stripped of weapons.

**lore:** A purple worm that consumed an entire war-band's baggage train has become a wandering armoury of swallowed steel, dragging loot and unlucky soldiers through the rock as it seeks the next column to empty.

### The sheet

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

Seismic Gut-Sense. While a creature touching the ground is within reach of the purple worm's tremorsense, the purple worm knows that creature's location, and can make a Perception check to pinpoint it even if it is hidden, Invisible, or on the far side of a wall the worm can burrow through.

Tunneler. The purple worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The purple worm makes one Bite attack and one Tail Stinger attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Vomited Armoury (Recharge 5-6). Dexterity Saving Throw: DC 21, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 60 (11d10) Acid damage. Success: Half damage only.

Bonus Actions

Swallow. Strength Saving Throw: DC 21, one Large or smaller creature Grappled by the purple worm (it can have up to three creatures swallowed at a time). Failure: The target is swallowed by the purple worm, and the Grappled condition ends. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the purple worm, and takes 17 (5d6) Acid damage at the start of each of the purple worm's turns.
If the purple worm takes 30 damage or more on a single turn from a creature inside it, the purple worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 5 feet of the purple worm and has the Prone condition. If the purple worm dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 20 feet of movement, exiting Prone.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Vesphidion: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 12 taken name(s) the recording carried
[path] twist — Purple Worm (is) — "Name field: Purple Worm" (code)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "Purple Worm — that swallowed a war-band'" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("Purple Worm — that swallowed a war-band'") | brute-grappler: no line key in the words — the model's read of its quote
[concept] name: "Purple Worm" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=devouring/subterranean mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: provided "Purple Worm"
[concept] mechanics: grapple, engulf
[concept] signature elements: swallowing whole ranks in one lunge [behavior] | a gut packed with broken blades and mail [body] | chitin-ringed maw and burrowing coils [body]
[concept] identity: The Purple Worm surfaces beneath a marching column and engulfs whole ranks in a single lunge, letting the swallowed armoury grind its victims to death inside it. Every round after, it stays half-buried and drags prey inward, its guts rattling with blades and mail it has no need to chew. It is not cruel, only insatiable — it will not flee while anything still moves in the dirt above it, but once it has swallowed enough it burrows away with its plunder, leaving the battlefield half-stripped of weapons.
[concept] lore: A purple worm that consumed an entire war-band's baggage train has become a wandering armoury of swallowed steel, dragging loot and unlucky soldiers through the rock as it seeks the next column to empty.
[reskin] print canon route: the Purple Worm's body outranks the grappler seat — no verb in the words names it; the plain brute line
[reskin] nova capped: "Area Nova" 71 → 66 (the chassis nova obeys the cap: 66 at CR 15)
[reskin] print canon defenses: HP 264 -> 247, AC 17 -> 18 — the Purple Worm's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 28, DEX 7, CON 22, INT 1, WIS 8, CHA 4 — the Purple Worm's at its own CR; attack +11 -> +14, DC 21 (print's)
[reskin] donor: brute-13 -> CR 15 (invented — no printed peer)
[reskin] seats: action <- "swallowing whole ranks in one lunge" | trait <- "a gut packed with broken blades and mail"
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
[reskin] idea anchored: action — "The worm heaves its gullet upward and vomits the hoarded armoury back " answers the GM's "swallowed a war-band's armoury"
[reskin] idea unanchored: trait — "The blades packed in its gut grind and shift with every motion, and th" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: shield-bash, herd, drain, shell-withdraw, rally, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "swallowed a war-band's armoury", so role and style do not filter the menu (legality still does); 15 template(s) offered
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The worm heaves its gullet upward and vomits the hoarded armoury back out — a shrieking fan of sword-points, snapped mailhauks and broken axe-heads that scores anything it passes. Each creature in a line out from the worm must make a Dexterity saving throw, taking the region's Acid damage on a failure and dropping anything it was holding; a creature that succeeds is shoved aside by the debris but " [action/save/damage] [family: nova] — menu: swallow, condition-payoff, burrow-ambush, escalating-dread, terror-pulse, exploiter, execute, lure, pull-through, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, second-wind, aggro-curse, self-invisibility, focus, coating, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, contagion, stunning-strike, charge-push, pounce, charge, isolation)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — swallow: swallow
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: swallow (save/condition), condition-payoff (save/damage), burrow-ambush (save/damage)
[reskin] keys would have bound: action — swallow (swallow, swallows, swallowed)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: swallow, condition-payoff, burrow-ambush, exploiter, pull-through — the key word does not mean the mechanic here
[reskin] closest refused: action — "disarm" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an area-of-effect line that deals damage and forces creatures to drop )
[reskin] authored row answers the GM: action — "Vomited Armoury (Recharge 5-6)" was written for "swallowed a war-band's armoury", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("an area-of-effect line that deals damage and forces creatures to drop ") and wrote an action instead: "Vomited Armoury (Recharge 5-6)" -> Actions. *Dexterity Saving Throw*: DC 21, each creature in a 60-foot Line. *Failure:* 60 (11d10) Acid damage. *Success:* Half dam
[reskin] authored row numbers: "Vomited Armoury (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Vomited Armoury (Recharge 5-6)" is HANDED "swallowed a war-band's armoury" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Vomited Armoury (Recharge 5-6)" ("The worm heaves its gullet upward and vomits the hoarded armoury back out — a shrieking fan of sword-points, snapped mailhauks and broken axe-heads that scores  [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The blades packed in its gut grind and shift with every motion, and the noise carries up through loose earth — the worm knows the location of any creature touching the ground within reach of its tremorsense, and can make a Perception check to pinpoint one even if it is hidden, invisible, or on the far side of a wall it can burrow through." [trait/always/defense] [family: zone] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial, evasion, guarded-stance (+ shelf: resonant-body, uncanny-sense, weapon-lodge)
[reskin] composed candidates: none trait — the zone family has no payload that does "defense" (it offers damage, condition, movement)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — tunneler (worm)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] closest refused: trait — "uncanny-sense" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: the template pinpoints a fixed kind of quarry at 120 feet, not a Perce)
[reskin] seat answered, but: the call said "the worm knows the location of any creature touching the ground within reach of its tremorsense, and can make a Percepti" is carried by "Grinding Gut-Sense", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("the template pinpoints a fixed kind of quarry at 120 feet, not a Perce") and wrote a trait instead: "Grinding Gut-Sense" -> Traits. While a creature touching the ground is within reach of the purple worm's tremorsense, the purple worm knows that creatu
[reskin] authored row numbers: "Grinding Gut-Sense" — the call declared 0 number(s) promised
[reskin] free signature row: "Grinding Gut-Sense" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Grinding Gut-Sense" ("The blades packed in its gut grind and shift with every motion, and the noise carries up through loose earth — the worm knows the location of any creature touch [authored: the catalog held no shape for it]")
[reskin] weapons answered: Bite = none; Engulfing Lunge = none; Grinding Gullet = none
[reskin] chassis nova: "Engulfing Lunge (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] chassis nova: "Vomited Armoury (Recharge 5-6)" — the brute-13's own nova row; geometry, cap and rider lines below are its edits
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
[reskin] print canon: the seat's own row STAYS — Actions/"Vomited Armoury (Recharge 5-6)" answers "swallowed a war-band's armoury", which the GM typed; print's nova rides beside it rather than over it
[reskin] print canon: chassis row leaves — Actions/"Engulfing Lunge (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Purple Worm's
[reskin] print canon row: Bonus Actions/Swallow — the Purple Worm's own
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Grinding Gut-Sense" [no template]
[reskin] 2024 caps: "Grinding Gut-Sense" — a condition or game term shipped lowercase
[reskin] lint fixed: line-dimensions — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
audit finding below confidence gate: Swallow Swallowed creatures' only written exit is a 30-damage threshold the GM must tot tally from inside creatures whose attacks are constrained by Total Cover rules ambiguity, so the escape is a bookkeeping trigger rather than a stated, checkable condition for each swallowed target.
audit finding below confidence gate: Swallow For a war-band-armoury monster, swallowing a creature whose only interior effect is 5d6 Acid per turn is a nuisance payload that does not deliver the promised gut-full-of-weapons threat (no piercing/slashing from swallowed gear, no frightened/heavy-armour implication).
[reskin] audit: [Grinding Gut-Sense: The trait's name promises a sw… far side of a wall the worm can burrow through"), Grinding Gut-Sense: The trait grants a Perception … far side of a wall the worm can burrow through"), Vomited Armoury (Recharge 5-6): The name promises … actually does. (about: "60 (11d10) Acid damage"), Vomited Armoury (Recharge 5-6): A worm that has sw…ch creature in a 60-foot-long, 5-foot-wide Line")]
[reskin] audit rename: "Grinding Gut-Sense" -> "Seismic Gut-Sense"
[reskin] audit rename blocked — "Vomited Armoury" -> "Corrosive Reflux" would drop the GM's own word "armoury"
[reskin] audit defect: Actions/"Vomited Armoury" [model-written] medium other (the audit said "undelivered") — A worm that has swallowed at most three creatures and some armoury cannot plausibly vomit a 60-foot line of acid-and-metal without any tie to what it swallowed, making the effect's scale inconsistent with the creature's stated capacity. — Tie the line's existence or length to swallowed contents, or reframe the effect as expelled corrosive bile rather than a discrete armoury volley. (about: "each creature in a 60-foot-long, 5-foot-wide Line")
[reskin] clause unresolved: "Seismic Gut-Sense" carries "The blades packed in its gut grind and shift with every ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
[reskin] done: "Purple Worm" — donor brute-13, CR 15
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 8 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 14-glacierheart

**Typed:** `a glacier's heart given legs, trailing a wake of killing cold`

**signature elements:** the wake of killing cold trailing behind it [aura] | a glacier's heart given legs [body] | unstoppable, unfeeling forward march through anything in its path [behavior]

**identity:** The glacier's heart opens a fight by simply walking: each footfall plants a killing cold into the ground behind it, and its wake of spreading frost is the first weapon enemies must fight, not the creature itself. Every round after, it wades directly through foes and structures alike, taking the shortest line to the densest cluster and letting its numbing aura and crushing frozen mass do the work, shattering slowed prey with blows like calving ice. It is patient, unhurried and utterly without fear — a heart of ancient ice that does not tire, does not negotiate, and will not stop until it or everything around it has gone still.

**lore:** When a glacier's ancient core is severed from its mountain and myth-warmed into a walking shape, it wanders the thawing valleys trying to re-freeze a world it no longer recognizes.

### The sheet

```
Glacierheart
Huge elemental, unaligned
Armor Class

16 (natural armor)

Hit Points: 

210 (20d12 + 80)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

8 (-1)

	

19 (+4)

	

6 (-2)

	

15 (+2)

	

20 (+5)

Skills: 

Athletics +9, Perception +7

Saving Throws: 

STR +9, CON +9

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

Fear Aura.The glacierheart emanates an aura in a 20-foot radius while it is not incapacitated. Any enemy that starts its turn in the aura must make a DC 18 Wisdom saving throw. On a failed save, the target is frightened until the start of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Cold Absorption.Whenever the glacierheart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster.The glacierheart deals double damage to objects and structures.

Actions
Multiattack: The glacierheart makes two Slam attacks. It can replace one attack with a use of Glacial Surge.
Slam: Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage plus 13 (3d8) cold damage.
Calving Wind (Recharge 5-6): Each creature in a 30-foot cone must make a DC 18 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one.
Glacial Surge: Each creature in a 60-foot-long, 5-foot-wide line must make a DC 18 Dexterity saving throw, taking 17 (5d6) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Purple Worm: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 13 taken name(s) the recording carried
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/terror mind=bestial style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: the wake of killing cold trailing behind it [aura] | a glacier's heart given legs [body] | unstoppable, unfeeling forward march through anything in its path [behavior]
[concept] identity: The glacier's heart opens a fight by simply walking: each footfall plants a killing cold into the ground behind it, and its wake of spreading frost is the first weapon enemies must fight, not the creature itself. Every round after, it wades directly through foes and structures alike, taking the shortest line to the densest cluster and letting its numbing aura and crushing frozen mass do the work, shattering slowed prey with blows like calving ice. It is patient, unhurried and utterly without fear — a heart of ancient ice that does not tire, does not negotiate, and will not stop until it or everything around it has gone still.
[concept] lore: When a glacier's ancient core is severed from its mountain and myth-warmed into a walking shape, it wanders the thawing valleys trying to re-freeze a world it no longer recognizes.
[reskin] nova capped: "Area Nova" 71 → 66 (the chassis nova obeys the cap: 66 at CR 15)
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as bestial, and the card's 6 is already that dim
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 15
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 15
[reskin] donor: brute-9-juggernaut -> CR 15
[reskin] seats: action <- "unstoppable, unfeeling forward march through anything in its path" | trait <- "the wake of killing cold trailing behind it"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the glacierheart" — the call's own answer (kind), built from the name
[reskin] inline form: "the glacierheart" — the model's own reading of the name
[reskin] fear unearned by the damage: "Calving Wind (Recharge 5-6)" would have imposed Frightened on a Cold row — print pairs Frightened with Psychic or Thunder damage and with nothing else; the clause leaves and the row keeps its damage
[reskin] the sheet's declared ask: zone — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral" -> Unaligned — a Elemental the call reads as bestial at INT 6 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "trailing a wake of killing cold" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a glacier's heart given legs" -> has (descriptive), head | "trailing a wake of killing cold" -> has (mechanical) [asked: at_will/at_will/save_area] [askMechanic: zone]
[reskin] open asks handed to the idea call: "trailing a wake of killing cold" [zone] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The glacierheart simply does not stop for anything. It moves its full " answers the GM's "trailing a wake of killing cold"
[reskin] idea unanchored: trait — "The glacierheart trails its wake of killing cold. The ground it has wa" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: shield-bash, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, bloodied-burst, resonant-body, adhesive, spider-climb, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "trailing a wake of killing cold", so role and style do not filter the menu (legality still does); 11 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The glacierheart simply does not stop for anything. It moves its full speed in a straight line, and each creature in its path must make a Dexterity saving throw or take Cold damage and be knocked Prone as the frozen mass shoulders through it; it ignores difficult terrain and can grind through any barrier, wall or structure it meets, leaving splintered ice and broken stone behind without slowing." [action/save/movement] [family: breach] — menu: escalating-dread, terror-pulse, push-prone, execute, lure, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, second-wind, aggro-curse, self-invisibility, focus, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does movement; leading: slow-bolt (save/movement), disarm (save/movement), escalating-dread (save/condition)
[reskin] keys would have bound: action — slow-bolt, execute (cold, kill)
[reskin] classification handed to the fit call: mechanic=aura shape=save_area when=at_will often=at_will
[reskin] word match declined by the call: slow-bolt, disarm, push-prone, execute, reveal — the key word does not mean the mechanic here
[reskin] closest refused: action — "charge" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a movement-based trample that sweeps a line of creatures, forcing save)
[reskin] authored row answers the GM: action — "Glacial Surge" was written for "trailing a wake of killing cold", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a movement-based trample that sweeps a line of creatures, forcing save") and wrote an action instead: "Glacial Surge" -> Actions. *Dexterity Saving Throw*: DC 18, each creature in a 60-foot Line. *Failure:* 45 (13d6) Cold damage, and the target has t
[reskin] authored row numbers: "Glacial Surge" — the call declared (unanswered) number(s) promised
[reskin] value check: "Glacial Surge" EV 84.8 vs floor 16.6 (one attack of 2) — dice 45 → 32 (scaled down to the ceiling); a nova already stands — kept ungated, dice to 32 at the ceiling
[reskin] signature authored: no template — the seat wrote it -> Actions/"Glacial Surge" ("The glacierheart simply does not stop for anything. It moves its full speed in a straight line, and each creature in its path must make a Dexterity saving throw [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The glacierheart trails its wake of killing cold. The ground it has walked over this turn, and all ground within a short distance of it, is slick with black ice — each creature that starts its turn on that frozen ground takes Cold damage and its speed is reduced until the end of its next turn." [trait/always/damage] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: absorption, weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — zone: aberrant-ground, energy-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: aberrant-ground (always/movement), energy-aura (start_of_turn/damage), blood-frenzy (always/damage)
[reskin] keys would have bound: trait — aberrant-ground, terrain-walk (wake, glacier)
[reskin] classification handed to the fit call: mechanic=aura shape=save_area when=at_will often=at_will
[reskin] word match declined by the call: composed:zone:damage, energy-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "energy-aura" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a damaging aura that also slows each creature's speed)
[reskin] clause already answered: "trailing a wake of killing cold" is carried by "Glacial Surge" — the seat read the sheet and declined to write a second row for it
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The glacierheart trails its wake of killing cold. The ground it has wa" and wrote no row of that kind (refused: "Glacial Surge" — the call counts 2 mechanics in one row — one row, one mechanic) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Glacial Surge" — the call counts 2 mechanics in one row — one row, one mechanic); asking once more with the reason
[reskin] seat answered, but: the call said "The glacierheart trails its wake of killing cold. The ground it has walked over this turn, and all ground within a short" is carried by "Black Ice Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a damaging aura that also slows each creature's speed") and wrote a trait instead: "Black Ice Wake" -> Traits. A creature starts its turn on ground the glacierheart has walked over this turn or on ground within 15 feet of the glaci
[reskin] authored row numbers: "Black Ice Wake" — the call declared 3 number(s) promised
[reskin] seat landed on the second try: trait — "Black Ice Wake" after ""Glacial Surge" — the call counts 2 mechanics in one row — one row, one mechanic"
[reskin] fear moved to a row that deals no damage: the sheet declared Frightened and a Cold row cannot carry it by print — fear-aura carries it instead ("Fear Aura" in Traits)
[reskin] signature template (trait): fear-aura -> Traits/"Fear Aura" ("the sheet declared Frightened and its Cold damage cannot carry it by print")
[reskin] trait ceiling: "Black Ice Wake" does not ship — 4 traits already, and print's ceiling for a material body is 4
[reskin] weapons answered: Slam = none; Calving Wind = none; Numbing Grip = none
[reskin] chassis nova: "Calving Wind (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] defenses by material: an ice body is vulnerable to Fire and never resists, absorbs, or ignores it (named by the call's own material field) — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] absorption re-keyed: Acid -> Cold (the donor organ obeys the concept energy)
[reskin] element immunity: Cold — the call read this creature's energy as Cold and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Cold (merged into the header write)
[reskin] immunities stamped for type: Elemental -> Cold, Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a glacier's heart given legs, trailing a" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Glacial Surge.
[reskin] area swap priced at half a hit: "Glacial Surge" is offered in an attack's place AT WILL and dealt 32 against a whole hit of 34; the ceiling is half a hit (17) with a save for half — print offers 15 area rows in an attack's place and none deals damage (owner's R1)
[reskin] ask vs row ok: "trailing a wake of killing cold" -> "Glacial Surge" — trigger at_will, limit at_will
[reskin] lint fixed: line-dimensions — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Glacial Surge: The 60-foot, 5-foot-wide Line drops… damage, and the target has the Prone condition")]
[reskin] audit defect: Actions/"Glacial Surge" [model-written] medium other (the audit said "undelivered") — The 60-foot, 5-foot-wide Line drops prone every creature it touches and reads as a horizontal icy wake, but the Prone condition on a burst of trailing cold is not distinguishable from any ordinary knockdown and the row's fiction ('a wake of killing cold') is delivered only as a floor-level trip. — Reframe the failure clause around the cold itself — e.g. freezing the ground or hindering movement in the line — so the payload matches the 'killing cold' the row was written for rather than a plain knockdown. (about: "17 (5d6) Cold damage, and the target has the Prone condition")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] size floor: STR 16 -> 18 — print prints no corporeal Huge body under 18 (the Archelon); the attack follows it, as print's own 49 do
[reskin] done: "Glacierheart" — donor brute-9-juggernaut, CR 15
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 15-adult-red-dragon

**Typed:** `name: Adult Red Dragon | blind in one eye from an old lance`

**signature elements:** fire breath laid in curtains across the field [behavior] | one ruined eye turned from the threat [body] | the old lance-head kept as a grudge-trophy [object]

**identity:** An old wyrm whose left eye went blind to a lance, it wages war from the blind side — never lingering where a rider could line up a second strike, circling high until the sky itself is fire. Every round it banks, breathes a curtain of flame across the field, then drops to finish what the fire softened, learning the archers' rhythm the way an old soldier learns a battlefield. It does not flee; crippled pride makes it methodical and vindictive, and it will spend a whole town's cover to force a hero into the open where it can watch them with its one good eye.

**lore:** Lamed by a knight's lance in a war it barely remembers, this red wyrm has burned every banner and monument of that kingdom since, hoarding the scorched lance-head as a trophy and a grudge it intends to repay in kind.

### The sheet

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

Light-Drinking Scar.The dragon has blindsight on its left flank in place of sight, and no creature gains advantage on an attack roll against it by being on that side.
Legendary Resistance (3/Day).If the dragon fails a saving throw, it can choose to succeed instead.
Sight Weakness.The dragon has disadvantage on Wisdom (Perception) checks that rely on sight.

Actions
Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage.
Spellcasting: The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): - At will: Command, Detect Magic, Scorching Ray
1/day each: Fireball
Fire Breath (Recharge 5-6): Each creature in a 60-foot cone must make a DC 21 Dexterity saving throw, taking 59 (17d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.

Commanding Presence: The dragon uses Spellcasting to cast Command (level 2 version). The dragon can't take this action again until the start of its next turn.
Fiery Rays: The dragon uses Spellcasting to cast Scorching Ray. The dragon can't take this action again until the start of its next turn.
Pounce: The dragon moves up to half its Speed, and it makes one Rend attack.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Glacierheart: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 14 taken name(s) the recording carried
[path] twist — Adult Red Dragon (is) — "Name field: Adult Red Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("Adult Red Dragon") | dragon: key "dragon" (class body) | bane refused: the words carry no weakness clause and the call did not claim one, so "lance" is a guess from what the creature is, not the GM's ask
[concept] name: "Adult Red Dragon" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: dragon→body ✓ ("the creature is an Adult Red Dragon")
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/breath mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Adult Red Dragon"
[concept] mechanics: breath
[concept] signature elements: fire breath laid in curtains across the field [behavior] | one ruined eye turned from the threat [body] | the old lance-head kept as a grudge-trophy [object]
[concept] identity: An old wyrm whose left eye went blind to a lance, it wages war from the blind side — never lingering where a rider could line up a second strike, circling high until the sky itself is fire. Every round it banks, breathes a curtain of flame across the field, then drops to finish what the fire softened, learning the archers' rhythm the way an old soldier learns a battlefield. It does not flee; crippled pride makes it methodical and vindictive, and it will spend a whole town's cover to force a hero into the open where it can watch them with its one good eye.
[concept] lore: Lamed by a knight's lance in a war it barely remembers, this red wyrm has burned every banner and monument of that kingdom since, hoarding the scorched lance-head as a trophy and a grudge it intends to repay in kind.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] nova capped: "Breath Weapon" 72 → 66 (the chassis nova obeys the cap: 66 at CR 17)
[reskin] print canon defenses: HP 256 -> 256, AC 20 -> 19 — the Adult Red Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 27, DEX 10, CON 25, INT 16, WIS 13, CHA 23 — the Adult Red Dragon's at its own CR; attack +10 -> +14, DC 21 (print's)
[reskin] donor: dragon-15 -> CR 17
[reskin] seats: action <- "fire breath laid in curtains across the field" | trait <- "one ruined eye turned from the threat"
[reskin] [path] decides: twist on the Adult Red Dragon (the matcher agrees)
[reskin] print canon: "Adult Red Dragon — blind in one eye from an old lance" heads on the Adult Red Dragon — print's rows ride along; the seat stays
[reskin] name_element answered: Flame Curtain = literal
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the dragon" — the call answered "the dragon" (kind), which the name does not support
[reskin] inline form: "the dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 19 -> 20 off Charisma 23 (print's array stays)
[reskin] save dc derived: DC 19 -> 20 (8 + PB 6 + Charisma's 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: breath — the route call's one answer for the whole concept
[reskin] lacks asked: "blind in one eye"
[reskin] clauses: "Adult Red Dragon — blind in one eye from an old lance" -> LACKS (mechanical)
[reskin] open asks handed to the idea call: "Adult Red Dragon — blind in one eye from an old lance"
[reskin] idea anchored: action — "The dragon's head snaps toward one creature its ruined eye cannot see," answers the GM's "Adult Red Dragon — blind in one eye from an old lance"
[reskin] idea unanchored: trait — "A lance took its left eye, and the scar tissue drinks light: the drago" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 34 of 34 answered; not true of this body: snare, seal, shield-bash, herd, drain, shell-withdraw, rally, coating, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, life-drain
[reskin] menu: taste stands down — action answers the GM's "Adult Red Dragon — blind in one eye from an old lance", so role and style do not filter the menu (legality still does); 3 template(s) offered
[reskin] menu pruned: action — aggro-curse, self-invisibility, focus, feint-slip, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, exploiter, pacify, slow-bolt, sensory-strike, disarm, delayed-brand, curse-debt, reveal (the sheet cannot render them)
[reskin] signature idea (action): "The dragon's head snaps toward one creature its ruined eye cannot see, and its good eye fixes on that target alone: until the end of its next turn, the dragon has Advantage on attack rolls against that creature, and that creature has no benefit from being unseen by the dragon." [bonus_action/always/condition] [family: mark] — menu: lay-on-hands, second-wind, patient-defense (+ shelf: condition-payoff, execute, throw-retrieve, lure, answering-strike, riposte, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, isolation)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does condition; leading: lay-on-hands (always/resource), second-wind (always/resource), patient-defense (always/defense)
[reskin] keys would have bound: action — throw-retrieve, charge (lance)
[reskin] classification handed to the fit call: mechanic=breath
[reskin] word match declined by the call: second-wind, lay-on-hands, patient-defense, execute, isolation — the key word does not mean the mechanic here
[reskin] closest refused: action — "isolation" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: picks one target and holds the aim, granting Advantage against it and )
[reskin] clause already answered: "Adult Red Dragon — blind in one eye from an old lance" is carried by "Lance Memory" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "Adult Red Dragon — blind in one eye from an old lance" is already carried by a row on this sheet; no second row is written for it
[reskin] closest refused — subject flipped: action — the call named "isolation" nearest and judged its subject FLIPPED against the clause (picks one target and holds the aim, granting Advantage against it and ); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: action — the call answered none and names it "no_fit" — the GM's words key throw-retrieve, charge, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: action — "throw-retrieve" is keyed by the GM's lance and was on the call's menu, which the call read as no fit; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: action — "The dragon's head snaps toward one creature its ruined eye cannot see, and its good eye fixes on that target alone: until the end of its next turn, the dragon has Advantage on attack rolls against that creature, and that creature has no benefit from being unseen by the dragon." [bonus_action/always/condition] — the model found no template that holds it (offered: lay-on-hands, second-wind, patient-defense, execute, isolation)
[reskin] signature idea (trait): "A lance took its left eye, and the scar tissue drinks light: the dragon has Blindsight in place of sight on that side, and it can never be flanked — no creature gains Advantage on an attack roll against it from being on its blind side." [trait/always/defense] [family: sentinel] — menu: phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, kill-denial, evasion, guarded-stance (+ shelf: heated-body, weapon-lodge)
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] classification handed to the fit call: mechanic=breath
[reskin] word match declined by the call: bloodied-fury, death-restoration, shielded-mind, relic-object, undead-fortitude, evasion, guarded-stance, phobia, blood-frenzy, pack-tactics, berserk, relentless-pursuit, bound, kill-denial, energy-aura, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: denies Advantage from being on its blind side while keeping blindsight)
[reskin] seat answered, but: the call said "A lance took its left eye, and the scar tissue drinks light: the dragon has Blindsight in place of sight on that side, a" is carried by "Light-Drinking Scar", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("denies Advantage from being on its blind side while keeping blindsight") and wrote a trait instead: "Light-Drinking Scar" -> Traits. The dragon has blindsight on its left flank in place of sight, and no creature gains Advantage on an attack roll against
[reskin] authored row numbers: "Light-Drinking Scar" — the call declared 0 number(s) promised
[reskin] free signature row: "Light-Drinking Scar" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Light-Drinking Scar" is HANDED "Adult Red Dragon — blind in one eye from an old lance" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Light-Drinking Scar" ("A lance took its left eye, and the scar tissue drinks light: the dragon has Blindsight in place of sight on that side, and it can never be flanked — no creature [authored: the catalog held no shape for it]")
[reskin] weapons answered: Claw = none
[reskin] chassis nova: "Flame Curtain (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Chaotic Evil — the Adult Red Dragon's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common, Draconic" — the Adult Red Dragon's
[reskin] print canon attack: "Claw" -> "Rend" — the Adult Red Dragon's own row
[reskin] print canon multiattack: "the dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Scorching Ray*." — the Adult Red Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon spell DC derived: 20 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Old Grudge" -> 20 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon skills: "Perception +7, Stealth +6" -> "Perception +13, Stealth +6" — the Adult Red Dragon's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Flame Curtain (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Adult Red Dragon's
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Adult Red Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon legendary: Commanding Presence, Fiery Rays, Pounce — the Adult Red Dragon's own kit stands where the chassis's stood
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Light-Drinking Scar" [no template]
[reskin] sheet lint: at-will-inline: Actions/Spellcasting: a 2024 spell bullet survived into a 2014 block
[reskin] lint: at-will-inline: Actions/Spellcasting: a 2024 spell bullet survived into a 2014 block | senses-grant-in-trait: Traits/Light-Drinking Scar: grants blindsight the header already prints — senses are header jurisdiction; delete the grant sentence (or move the condition into the header parenthetical)
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Light-Drinking Scar carries "one ruined eye turned from the threat" — "The dragon has blindsight on its left flank in place of sight"
[reskin] audit: [Light-Drinking Scar: The trait grants perpetual fl…n attack roll against it by being on that side."), Light-Drinking Scar: The name and fiction promise …"blindsight on its left flank in place of sight"), Light-Drinking Scar: The clause grants defensive b…an attack roll against it by being on that side")]
[reskin] audit defect: Traits/"Light-Drinking Scar" [model-written] high untrackable — The trait grants perpetual flank-sided blindsight and advantage-denial on an orientation the statblock never defines and combat never records (no facing rules in 2024 D&D), so the GM cannot check which side a creature is on at the table. — Recast the scar as a flat, orientation-free benefit the table can resolve without tracking facing. (about: "The dragon has blindsight on its left flank in place of sight, and no creature gains Advantage on an attack roll against it by being on that side.")
[reskin] audit defect: Traits/"Light-Drinking Scar" [model-written] medium other (the audit said "undelivered") — The name and fiction promise a blind, ruined eye, but the rules deliver enhanced (blindsight) perception on that side rather than impairment — the wording inverts the mechanic the ask called for. — Make the mechanical consequence express the missing eye (a lost sense on that side) rather than granting a better one. (about: "blindsight on its left flank in place of sight")
[reskin] audit defect: Traits/"Light-Drinking Scar" [model-written] high dead_reference — The clause grants defensive benefit against flanking advantage, but no base rule in 2024 grants advantage merely for being on a side, so it negates a condition nothing creates — a dead rider. — Replace the advantage-denial with a benefit that interacts with a real, table-trackable state. (about: "no creature gains Advantage on an attack roll against it by being on that side")
[reskin] [gap] picks one target and holds the aim, granting Advantage against it and stripping the unseen condition's benefit — "The dragon's head snaps toward one creature its ruined eye cannot see, and its good eye fixes on that target alone: until the end of its next turn, the dragon has Advantage on attack rolls against that creature, and that creature has no benefit from being unseen by the dragon." — Adult Red Dragon [seat: action [bonus_action/always/condition]] (closest offered: isolation) [effect: condition] [menu: lay-on-hands second-wind patient-defense execute isolation] [same-cell unoffered: adhesive phobia faultless-tracker berserk marking-light kill-denial] [same-seat rejected: blink:role shell-withdraw:body-verdict volley-order:role rally:body-verdict feint-slip:role coating:body-verdict phase-slip:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] lacks clause: Traits/"Light-Drinking Scar" STAYS — the seat wrote it for "Adult Red Dragon — blind in one eye from an old lance", so its name carrying that word is the lack expressed, not a capability the lack removes
[reskin] flaw row: "Sight Weakness" — "Adult Red Dragon — blind in one eye from an old lance" removed no row, so the absence costs the creature something instead (print's grammar: 11 of 329 blocks carry one; owner's ruling 1f)
[reskin] done: "Adult Red Dragon" — donor dragon-15, CR 17
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 8 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 16-brass-tyrant

**Typed:** `a tyrant of burning brass who rules a city of forges`

**signature elements:** a molten fist-shockwave that rolls through ranks [behavior] | brass hide that runs hotter with every blow it takes [body] | the foundry-heat aura of a walking forge-city [aura]

**identity:** The Brass Tyrant wades into battle already glowing at the seams, and its opening move is to slam a molten fist down and let a shockwave of forge-heat roll through the ranks; every round after that it advances on whoever holds the line, shoulder and fist breaking formations while its brass surface runs hotter with each blow it takes, so that striking it is its own punishment. It does not chase cowards — it lets them run, because the whole city of forges is its body and there is nowhere to flee; under real pressure it stops toying with footmen, seizes the strongest enemy, and holds them in its glowing grip while it burns them down, fighting to the last scarred plate.

**lore:** Poured from the melted crowns and anvil-scrap of the smith-kings it overthrew, the Brass Tyrant rose from a city's own furnace and now rules its forges, demanding that every hammer in the district beat out tribute or be beaten flat.

### The sheet

```
Brass Tyrant

Large Construct, Lawful Evil

AC 19
Initiative -1 (9)

HP 231 (22d10 + 110)

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

Senses tremorsense 30 ft.; Passive Perception 21

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Fear Aura. The tyrant emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 19, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Legendary Resistance (3/Day). If the tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The tyrant can't shape-shift.

Siege Monster. The tyrant deals double damage to objects and structures.

Actions

Multiattack. The tyrant makes two Brass Fist attacks. It can replace one attack with a use of Forge-Quake.

Brass Fist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Forge Blast (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 66 (12d10) Fire damage. Success: Half damage only.

Forge-Quake. Dexterity Saving Throw: DC 19, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 17 (5d6) Fire damage, and the target has the Prone condition. Success: Half damage only.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Advance and Strike. The tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Brass Fist attack.

Crush a Path. The tyrant moves up to its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Seismic Stomp. Strength Saving Throw: DC 19, each creature within 10 feet of the tyrant. Failure: The target has the Prone condition.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Adult Red Dragon: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 15 taken name(s) the recording carried
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a tyrant of burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/elemental mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: a molten fist-shockwave that rolls through ranks [behavior] | brass hide that runs hotter with every blow it takes [body] | the foundry-heat aura of a walking forge-city [aura]
[concept] identity: The Brass Tyrant wades into battle already glowing at the seams, and its opening move is to slam a molten fist down and let a shockwave of forge-heat roll through the ranks; every round after that it advances on whoever holds the line, shoulder and fist breaking formations while its brass surface runs hotter with each blow it takes, so that striking it is its own punishment. It does not chase cowards — it lets them run, because the whole city of forges is its body and there is nowhere to flee; under real pressure it stops toying with footmen, seizes the strongest enemy, and holds them in its glowing grip while it burns them down, fighting to the last scarred plate.
[concept] lore: Poured from the melted crowns and anvil-scrap of the smith-kings it overthrew, the Brass Tyrant rose from a city's own furnace and now rules its forges, demanding that every hammer in the district beat out tribute or be beaten flat.
[reskin] nova capped: "Area Nova" 72 → 66 (the chassis nova obeys the cap: 66 at CR 17)
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 17
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 17
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 17
[reskin] donor: brute-17-juggernaut -> CR 17
[reskin] seats: action <- "a molten fist-shockwave that rolls through ranks" | trait <- "brass hide that runs hotter with every blow it takes"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the tyrant" — the model's own reading of the name
[reskin] fear unearned by the damage: "Forge Blast (Recharge 5-6)" would have imposed Frightened on a Fire row — print pairs Frightened with Psychic or Thunder damage and with nothing else; the clause leaves and the row keeps its damage
[reskin] the sheet's declared ask: zone — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (descriptive)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (2 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The tyrant slams its molten fist into the ground, and a wall of forge-" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The brass of the tyrant's body runs hotter with every blow it takes. W" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: shield-bash, herd, drain, shell-withdraw, rally, coating, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The tyrant slams its molten fist into the ground, and a wall of forge-heat rolls outward in a line in front of it. Each creature in the area must succeed on a Dexterity saving throw or take Fire damage and have the Prone condition as the shockwave knocks it flat." [action/save/condition] [family: zone] — menu: condition-payoff, escalating-dread, terror-pulse, exploiter, lure, pacify, sensory-strike, reveal (+ shelf: second-wind, aggro-curse, self-invisibility, focus, answering-strike, stunning-strike, charge-push, pounce)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), exploiter (save/condition)
[reskin] classification handed to the fit call: mechanic=aura
[reskin] word match declined by the call: escalating-dread, terror-pulse, exploiter, lure, pacify, sensory-strike, reveal, condition-payoff — the key word does not mean the mechanic here
[reskin] closest refused: action — "condition-payoff" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a Dexterity-save line that deals Fire damage and knocks creatures Pron)
[reskin] seat answered, but: the call said "The tyrant slams its molten fist into the ground, and a wall of forge-heat rolls outward in a line in front of it. Each " is carried by "Forge-Quake", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("a Dexterity-save line that deals Fire damage and knocks creatures Pron") and wrote an action instead: "Forge-Quake (Recharge 5-6)" -> Actions. *Dexterity Saving Throw*: DC 19, each creature in a 60-foot Line. *Failure:* 49 (14d6) Fire damage, and the target has t
[reskin] authored row numbers: "Forge-Quake (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] one nova: "Forge-Quake" arrived gated on a sheet whose chassis already carries a Recharge nova — the gate leaves and the row prices at the ceiling (the wyrm's Shattering Ice Snare, step 7)
[reskin] value check: "Forge-Quake" EV 77 vs floor 18.2 (one attack of 2) — dice 49 → 35 (scaled down to the ceiling); a nova already stands — kept ungated, dice to 35 at the ceiling
[reskin] signature authored: no template — the seat wrote it -> Actions/"Forge-Quake" ("The tyrant slams its molten fist into the ground, and a wall of forge-heat rolls outward in a line in front of it. Each creature in the area must succeed on a D [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The brass of the tyrant's body runs hotter with every blow it takes. Whenever it is hit by a melee attack, its surface glows with molten heat until the end of its next turn; during that time, its Brass Fist attacks deal extra Fire damage." [trait/on_being_hit/damage] [family: body-reaction] — menu: heated-body, resonant-body, weapon-lodge (+ shelf: phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, fear-aura)
[reskin] composed candidates on the menu: trait — composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does damage; leading: heated-body (on_being_hit/damage), resonant-body (on_being_hit/damage), composed:body-reaction:damage:t0 (on_being_hit/damage)
[reskin] keys would have bound: trait — heated-body (burn, brass)
[reskin] classification handed to the fit call: mechanic=aura
[reskin] word match declined by the call: heated-body, composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 — the key word does not mean the mechanic here
[reskin] closest refused: trait — "heated-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants the creature bonus Fire damage on its own attacks after being h)
[reskin] seat answered, but: the call said "Whenever it is hit by a melee attack, its surface glows with molten heat until the end of its next turn; during that tim" is carried by "Molten Retort", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("grants the creature bonus Fire damage on its own attacks after being h") and wrote a trait instead: "Molten Retort" -> Traits. Once per turn, when the tyrant is hit by a melee attack, its brass glows with molten heat until the end of its next turn
[reskin] authored row numbers: "Molten Retort" — the call declared 1 number(s) promised
[reskin] fear moved to a row that deals no damage: the sheet declared Frightened and a Fire row cannot carry it by print — fear-aura carries it instead ("Fear Aura" in Traits)
[reskin] signature template (trait): fear-aura -> Traits/"Fear Aura" ("the sheet declared Frightened and its Fire damage cannot carry it by print")
[reskin] free signature row: "Molten Retort" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] trait ceiling: "Molten Retort" does not ship — 4 traits already, and print's ceiling for a material body is 4
[reskin] weapons answered: Brass Fist = none
[reskin] chassis nova: "Forge Blast (Recharge 5-6)" — the brute-17-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Fire — the call read this creature's energy as Fire and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Fire (merged into the header write)
[reskin] immunities stamped for type: Construct -> Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a tyrant of burning brass who rules a ci" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] area swap gated: "Forge-Quake (Recharge 5-6)" deals 35 to an area in place of a 33 attack — print offers no at-will area swap that out-damages the attack it replaces (0 of its 24), so it takes print's Recharge
[reskin] multiattack replacement clause: It can replace one attack with a use of Forge-Quake (Recharge 5-6).
[reskin] free-row budget by card size: CR 17 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 10 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Forge-Quake" [no template]
[reskin] one nova at ship: "Forge-Quake (Recharge 5-6)" un-gated to "Forge-Quake" — "Forge Blast" already carries this sheet's Recharge nova (un-gated by the one-nova rule — dice to 35, at or under the Multiattack sum (46); the action economy is the limit)
[reskin] area swap priced at half a hit: "Forge-Quake" is offered in an attack's place AT WILL and dealt 35 against a whole hit of 33; the ceiling is half a hit (17) with a save for half — print offers 15 area rows in an attack's place and none deals damage (owner's R1)
[reskin] lint fixed: line-dimensions — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element expressed: Forge-Quake carries "a molten fist-shockwave that rolls through ranks" — "the target has the Prone condition"
[reskin] audit: [Seismic Stomp: A legendary action that only impose…"*Failure:* The target has the Prone condition."), Forge-Quake: A molten fist-shockwave that fires a …damage, and the target has the Prone condition.")]
[reskin] audit defect: Legendary Actions/"Seismic Stomp" [catalog] high weak — A legendary action that only imposes the Prone condition duplicates what the free-of-cost Forge-Quake line already does while dealing no damage, so the row has no payload worth a legendary action. — Give the stomp teeth beyond Prone — add fire or bludgeoning damage, or a condition the rest of the block does not already hand out. (about: "*Failure:* The target has the Prone condition.")
[reskin] audit defect: Actions/"Forge-Quake" [model-written] medium other (the audit said "undelivered") — A molten fist-shockwave that fires a 5-foot-wide line lays low exactly the one rank it touches, so the Prone payload rarely lands on more than one target and the row reads as a ribbon on a fist rather than a rolling quake. — Widen the effect to hit a rank (an Emanation or broader Line) so the shockwave actually sweeps through a formation. (about: "*Failure:* 17 (5d6) Fire damage, and the target has the Prone condition.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Forge-Quake" carries "The tyrant slams its molten fist into the ground, and a ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] multiattack citation synced: "Multiattack" cites each row as the row is named — a gated row reads "if available" as print writes it, an ungated row reads bare
[reskin] done: "Brass Tyrant" — donor brute-17-juggernaut, CR 17
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 9 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 17-pit-fiend

**Typed:** `name: Pit Fiend | who collects the oaths of dying knights`

**signature elements:** collecting the oaths of dying knights [behavior] | an iron-plated body of pit-fired chains and hooks [body] | an aura of dread authority that binds sworn knights to its side [aura]

**identity:** The Pit Fiend opens by dropping into the middle of the line and hammering its fist against its own iron chest-plate, calling its knights to close ranks under an aura of dread authority while it demands each dying oath to its face. Every round after, it fights shoulder-to-shoulder with its sworn, parrying blows meant for them with its cleaver-vast forearm and taking oaths from the fallen, growing harder to kill as it collects them. Under pressure it does not flee — it retreats only as far as the nearest failing knight, refusing to end the fight until the last oath is gathered.

**lore:** Forged in the deepest pit of the Nine Hells, it was bound there to witness every oath ever sworn to the cause of law — and to collect them, one by one, from knights who die with their promises unfinished.

### The sheet

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

Oath-Collector. When the pit fiend reduces a creature that has the Frightened condition or is bound to it by an oath to 0 Hit Points, the pit fiend regains one spent use of Legendary Resistance.

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Glare the Dying Oath. Charisma Saving Throw: DC 21, one creature within 10 feet. Failure: 32 (5d12) Psychic damage, and the target has the Frightened condition until the end of its next turn.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Brass Tyrant: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 16 taken name(s) the recording carried
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] defender-leader type=Fiend mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: the call reads no worked magic in these words | defender-leader: ✓ ("the oaths of dying knights") | defender: the call read "knights" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Pit Fiend" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Fiend typeFrom=the route call themes=fiendish/terror mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: collecting the oaths of dying knights [behavior] | an iron-plated body of pit-fired chains and hooks [body] | an aura of dread authority that binds sworn knights to its side [aura]
[concept] identity: The Pit Fiend opens by dropping into the middle of the line and hammering its fist against its own iron chest-plate, calling its knights to close ranks under an aura of dread authority while it demands each dying oath to its face. Every round after, it fights shoulder-to-shoulder with its sworn, parrying blows meant for them with its cleaver-vast forearm and taking oaths from the fallen, growing harder to kill as it collects them. Under pressure it does not flee — it retreats only as far as the nearest failing knight, refusing to end the fight until the last oath is gathered.
[concept] lore: Forged in the deepest pit of the Nine Hells, it was bound there to witness every oath ever sworn to the cause of law — and to collect them, one by one, from knights who die with their promises unfinished.
[reskin] print canon route: the Pit Fiend's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 281 -> 337, AC 22 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: defender-17 -> CR 20 (invented — no printed peer)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "collecting the oaths of dying knights" | trait <- "an iron-plated body of pit-fired chains and hooks"
[reskin] [path] decides: twist on the Pit Fiend (the matcher agrees)
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the pit fiend" — the call answered "the pit fiend" (kind), which the name does not support
[reskin] inline form: "the pit fiend" — the model's own reading of the name
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Pit Fiend —" -> has (descriptive), head | "collects the oaths of dying knights" -> has (mechanical) [asked: on_death/buff_self] [askMechanic: escalate]
[reskin] open asks handed to the idea call: "collects the oaths of dying knights" [escalate]
[reskin] idea anchored: action — "The pit fiend seizes the dying oath from a creature within reach that " answers the GM's "collects the oaths of dying knights"
[reskin] idea unanchored: trait — "Oath-Collector. The pit fiend's authority sits on the battlefield like" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: shield-bash, random-ray, shell-withdraw, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, death-burst, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "collects the oaths of dying knights", so role and style do not filter the menu (legality still does); 20 template(s) offered
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The pit fiend seizes the dying oath from a creature within reach that is Bloodied or Prone — laying its vast scorched palm upon them and *swearing them in*. The target must make a Charisma saving throw; on a failure it is bound to the fiend's law, taking Psychic damage and suffering the Frightened condition, and while bound it cannot willingly move farther from the pit fiend than it can in a singl" [action/save/condition] [family: mark] — menu: seal, active-toll, ground-burst, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, trample, thrown-burst, condition-payoff, execute, lure, pacify, escalating-dread, sensory-strike, thrown-burst-seed (+ shelf: delayed-brand, patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, rally, focus, feint-slip, riposte, answering-strike, stunning-strike, charge-push, contagion, pounce, isolation, charge)
[reskin] lead by this seat's own clause: action — "escalate" from the clause this seat serves, not the sheet's "curse"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — escalate: wind-up, exploiter, condition-payoff, execute
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: wind-up (save/damage), exploiter (save/condition), condition-payoff (save/damage)
[reskin] keys would have bound: action — curse-debt, aggro-curse (oath)
[reskin] classification handed to the fit call: shape=buff_self when=on_death
[reskin] word match declined by the call: execute, exploiter, seal, curse-debt, condition-payoff — the key word does not mean the mechanic here
[reskin] closest refused: action — "escalating-dread" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: seizes a dying or Bloodied creature in reach and brands it with a last)
[reskin] authored row answers the GM: action — "Seize the Dying Oath" was written for "collects the oaths of dying knights", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("seizes a dying or Bloodied creature in reach and brands it with a last") and wrote an action instead: "Seize the Dying Oath" -> Actions. *Charisma Saving Throw*: DC 21, one creature within 10 feet. *Failure:* 32 (5d12) Psychic damage, and the target has the
[reskin] authored row numbers: "Seize the Dying Oath" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Seize the Dying Oath" is HANDED "collects the oaths of dying knights" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Seize the Dying Oath" ("The pit fiend seizes the dying oath from a creature within reach that is Bloodied or Prone — laying its vast scorched palm upon them and *swearing them in*. The [authored: the catalog held no shape for it]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Oath-Collector. The pit fiend's authority sits on the battlefield like a weight: creatures sworn to it — and any creature frightened by it — feel their knees bend toward it, and whenever it drops a creature that was Frightened or bound by its oath, it regains a spent use of Legendary Resistance, the promise knitting itself into its iron plate." [trait/always/resource] [family: kill-growth] — menu: phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, evasion (+ shelf: heated-body, resonant-body, weapon-lodge)
[reskin] lead by this seat's own clause: trait — "escalate" from the clause this seat serves, not the sheet's "curse"
[reskin] composed candidates: none trait — the kill-growth family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — escalate: bloodied-fury, blood-frenzy, berserk
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: bloodied-fury (always/defense), blood-frenzy (always/damage), berserk (always/condition)
[reskin] classification handed to the fit call: shape=buff_self when=on_death
[reskin] word match declined by the call: death-restoration, bloodied-fury, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "death-restoration" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: regains a spent Legendary Resistance use when a frightened or oath-swo)
[reskin] seat answered, but: the call said "Oath-Collector. The pit fiend's authority sits on the battlefield like a weight: creatures sworn to it — and any creatur" is carried by "Oath-Collector", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("regains a spent Legendary Resistance use when a frightened or oath-swo") and wrote a trait instead: "Oath-Collector" -> Traits. When the pit fiend reduces a creature that has the Frightened condition or is bound to it by an oath to 0 Hit Points, th
[reskin] authored row numbers: "Oath-Collector" — the call declared 0 number(s) promised
[reskin] free signature row: "Oath-Collector" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Oath-Collector" ("Oath-Collector. The pit fiend's authority sits on the battlefield like a weight: creatures sworn to it — and any creature frightened by it — feel their knees be [authored: the catalog held no shape for it]")
[reskin] weapons answered: Cleaver-Forearm = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Pit Fiend's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Cleaver-Forearm" -> "Bite" — the Pit Fiend's own row
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
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Seize the Dying Oath.
[reskin] free-row budget by card size: CR 20 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 9 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Oath-Collector" [no template]
[reskin] ask vs row MISMATCH: "collects the oaths of dying knights" -> "Seize the Dying Oath" — trigger: asked on_death, row reads at_will
[reskin] name follows content: Actions/"Seize the Dying Oath" promises the Grappled condition the row never delivers — "Glare the Dying Oath" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] multiattack re-read — "Seize the Dying Oath" left; "Multiattack" now reads "the pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack."
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Oath-Collector carries "collecting the oaths of dying knights" — "When the pit fiend reduces a creature that has the Frightened condition or is bo"
[reskin] audit: [Oath-Collector: No entry on the sheet creates or d…s checkable. (about: "is bound to it by an oath"), Glare the Dying Oath: The row written to collect d…htened condition until the end of its next turn")]
[reskin] audit defect: Traits/"Oath-Collector" [model-written] high dead_reference — No entry on the sheet creates or defines an oath bond, so the GM cannot determine which creatures qualify for this trigger. — Define the oath state on the sheet (or remove that clause) so the trigger is checkable. (about: "is bound to it by an oath")
[reskin] audit defect: Actions/"Glare the Dying Oath" [model-written] medium other (the audit said "undelivered") — The row written to collect dying knights' oaths imposes only Frightened and deals Psychic damage, giving no path by which the oath is collected or the victim's dying oath state is created. — Add a clause that marks the target's oath or ties the effect to reducing a Frightened or oath-bound creature to 0 HP. (about: "the target has the Frightened condition until the end of its next turn")
[reskin] clause unresolved: "Oath-Collector" carries "Oath-Collector. The pit fiend's authority sits on the ba", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Pit Fiend" — donor defender-17, CR 20
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 8 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 18-archlich-of-the-bone-sun

**Typed:** `an archlich enthroned on a sun of bone`

**identity:** The archlich does not stand and duel; it reclines upon its bone-sun throne and lets the court do the killing, opening with a volley of necrotic bolts hurled down from the dais while skeletal hands burst from the marrow-gravel to seize intruders. Each round it alternates between crushing a grasped foe in a fist of fused bone and unleashing a lash of marrow-fire that leaps to every creature branded by its earlier spells, so its blasts never stop working between casts. It is patient and utterly contemptuous — it will not flee, but toys with survivors, letting them climb the ossuary steps only to flay them at arm's reach.

### The sheet

```
Archlich of the Bone Sun
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

darkvision 120 ft., passive Perception 18

Languages: 

All

Challenge

20 (25,000 XP)

Proficiency Bonus:

+6

Aberrant Ground.The ground in a 10-foot radius originating from the archlich is Difficult Terrain.
Legendary Resistance (3/Day).If the archlich fails a saving throw, it can choose to succeed instead.
Spirit Jar.If destroyed, the archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archlich's lair.
Protective Magic (Reaction).The archlich casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The archlich makes three attacks, using Eldritch Burst or Paralyzing Touch.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the archlich's next turn.
Spellcasting: The archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/day each: Animate Dead, Dimension Door, Plane Shift
1/day each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Legendary Actions

Archlich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Archlich regains spent legendary actions at the start of its turn.

Deathly Teleport: The archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an Undead in a 20-foot radius originating from the archlich must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
Frightening Gaze: The archlich casts Fear, using the same spellcasting ability as Spellcasting. The archlich can't take this action again until the start of its next turn.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Pit Fiend: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 17 taken name(s) the recording carried
[path] twist — Lich (is) — "archlich" (call)
[route] caster (artillery) type=Undead mechanics=aura — casts: implied by the kind — "archlich" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=none mind=? style=— energy=— mix=— identity=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] identity: The archlich does not stand and duel; it reclines upon its bone-sun throne and lets the court do the killing, opening with a volley of necrotic bolts hurled down from the dais while skeletal hands burst from the marrow-gravel to seize intruders. Each round it alternates between crushing a grasped foe in a fist of fused bone and unleashing a lash of marrow-fire that leaps to every creature branded by its earlier spells, so its blasts never stop working between casts. It is patient and utterly contemptuous — it will not flee, but toys with survivors, letting them climb the ossuary steps only to flay them at arm's reach.
[reskin] nova capped: "Area Nova" 76 → 66 (the chassis nova obeys the cap: 66 at CR 20)
[reskin] print canon pb: print's +12 on PB +7 reads +11 on this sheet's PB +6; DCs follow
[reskin] print canon defenses: HP 300 -> 315, AC 19 -> 20 — the Lich's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's at its own CR; attack +10 -> +11, DC 19 (print's, on this sheet's PB)
[reskin] donor: caster-21 -> CR 20
[reskin] [path] decides: twist on the Lich (the matcher agrees)
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] name_element answered: Marrowfire Bolt = literal; Marrowfire Lash = literal
[reskin] repair round 1: 2 defect(s) — name "Marrowfire Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade | "Bone Fist" is an anatomical name dealing Bludgeoning on a mind-driven attacker (the attack bonus keys to INT) — print pays physical damage on mental strikes with implement names (the Dryad's Vine Lash, the Rakshasa's Cursed Touch) or carries a magical type (the Mage's Arcane Burst deals Force); rename to a conjured implement or pick a magical type
[reskin] mental-anatomy stamp: "Bone Fist" Bludgeoning -> Force (repair exhausted; the engine picks the magical type)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the archlich" — the call answered "the bone sun" (kind), which the name does not support
[reskin] the sheet's declared ask: zone — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an archlich enthroned on a sun of bone" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The archlich hurls a marrowfire bolt that bursts at the target's feet," names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Bone gravel and marrow dust whirl in a slow orbit around the throne, s" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: snare, seal, snare-bolt, herd, rally, phase-slip, heated-body, false-appearance, absorption, resonant-body, spider-climb, terrain-walk, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, blurred-form
[reskin] menu pruned: action — thrown-burst-seed, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The archlich hurls a marrowfire bolt that bursts at the target's feet, and the scorched ground remains branded with crawling bone-script; each creature that starts its turn in a branded area takes necrotic damage as skeletal hands of pale fire drag at its ankles until it leaves the marked ground." [action/always/damage] [family: zone] — menu: gaze-single, condition-payoff, execute, lure, pacify, escalating-dread, slow-bolt, sensory-strike, drain, curse-debt, zone-seed, reveal, throw-retrieve (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, life-drain, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] declared mechanic leads the menu: action — zone: zone-seed
[reskin] menu ordered by the idea's stamps: action — idea fires always/does damage; leading: zone-seed (always/damage), throw-retrieve (always/damage), condition-payoff (save/damage)
[reskin] classification handed to the fit call: mechanic=aura
[reskin] word match declined by the call: zone-seed, delayed-brand, throw-retrieve — the key word does not mean the mechanic here
[reskin] closest refused: action — "delayed-brand" was named nearest, but the call declined it for collision ("collision") — the word suggests this mechanic and the row does not carry it; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: brands an area of ground so creatures starting their turn in it take d)
[reskin] decline reason: action — the call answered none and names it "collision"
[reskin] signature miss: action — "The archlich hurls a marrowfire bolt that bursts at the target's feet, and the scorched ground remains branded with crawling bone-script; each creature that starts its turn in a branded area takes necrotic damage as skeletal hands of pale fire drag at its ankles until it leaves the marked ground." [action/always/damage] — the model found no template that holds it (offered: zone-seed, throw-retrieve, condition-payoff, execute, drain, curse-debt, delayed-brand, gaze-single, lure, pacify, escalating-dread, slow-bolt, sensory-strike, reveal, bolt-mark, aggro-curse, bolt-drag, bolt-restrain)
[reskin] fallback respects the call: delayed-brand left the shelf — the call declined it for this sheet
[reskin] fallback stands down: the twist path has no shelf — the Lich's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Bone gravel and marrow dust whirl in a slow orbit around the throne, so the ground within the archlich's emanation is laced with splintered ossuary shards: the area counts as difficult terrain for other creatures, and the archlich's own marrowfire bolts trace their path through the whirling shards without hindrance." [trait/always/movement] [family: zone] — menu: phobia, aberrant-ground, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, gaze-aura, death-burst, kill-denial (+ shelf: bloodied-burst)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/movement): aberrant-ground, relentless-pursuit, bound; the declared data is the warrant and the call is worth making
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — zone: aberrant-ground, energy-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: aberrant-ground (always/movement), energy-aura (start_of_turn/damage), relentless-pursuit (always/movement)
[reskin] classification handed to the fit call: mechanic=aura
[reskin] word match declined by the call: relentless-pursuit, bound, phobia, energy-aura — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "aberrant-ground" has no key-table verb, but the call quotes "an archlich enthroned on a sun of bone" from the description
[reskin] seat takes its clause: "Bone Shard Orbit" is HANDED "an archlich enthroned on a sun of bone" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): aberrant-ground -> Traits/"Bone Shard Orbit" ("splintered ossuary shards lace the ground around the throne, making it Difficult [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Bone Shard Orbit" -> "Aberrant Ground" — this row is aberrant-ground and does what every aberrant-ground row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Marrowfire Bolt = none; Bone Fist = none
[reskin] weapon declined: "Marrowfire Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Marrowfire Bolt" — a launcher, never thrown, range 80/320
[reskin] chassis nova: "Marrowfire Lash (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "None" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Eldritch Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Lich's weapon is thrown)
[reskin] print canon attack: "Bone Fist" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon multiattack: "the archlich makes three attacks, using Eldritch Burst or Paralyzing Touch in any combination." — the Lich's own
[reskin] ranged row off: "Marrowfire Bolt" leaves — the Lich carries no ranged row and the words name none
[reskin] dead wildcard name swept — "Necrotic Volley" was only about "Marrowfire Bolt"; the row drops
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in DEX, CON, INT, WIS — the Lich's own set, at this sheet's stats and PB 6 (changed DEX)
[reskin] print canon skills: "Arcana +11, Perception +8" -> "Arcana +17, History +11, Insight +8, Perception +8" — the Lich's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] resistances derived withheld: print's Lich owns the line (Cold, Lightning)
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Marrowfire Lash (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Lich's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Reactions/"Protective Magic" — print's own row takes the name back from the engine's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Ray of Sickness*.
[reskin] free-row budget by card size: CR 20 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 11 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] replacement clause re-read: "Spellcasting to cast Ray of Sickness" is not on this sheet, so the clause leaves entirely — print's commonest Multiattack carries none
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
audit finding below confidence gate: Spirit Jar The trait references the archlich's lair as a defined place but the block never establishes that the archlich has a lair or where it is, so a GM cannot adjudicate the reformation space.
[reskin] audit: [Aberrant Ground: The trait's name promises aberran…inating from the archlich is Difficult Terrain.")]
[reskin] audit rename held — "Aberrant Ground" was written for the GM's own clause (cl_1e3qye3), so "Warping Ground" does not land; the finding stands as logged
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] brands an area of ground so creatures starting their turn in it take damage until they leave — "The archlich hurls a marrowfire bolt that bursts at the target's feet, and the scorched ground remains branded with crawling bone-script; each creature that starts its turn in a branded area takes necrotic damage as skeletal hands of pale fire drag at its ankles until it leaves the marked ground." — Archlich of the Bone Sun [seat: action [action/always/damage]] (closest offered: delayed-brand) [effect: damage] [menu: zone-seed throw-retrieve condition-payoff execute drain curse-debt delayed-brand gaze-single lure pacify escalating-dread slow-bolt sensory-strike reveal bolt-mark aggro-curse bolt-drag bolt-restrain] [same-cell unoffered: blood-frenzy pack-tactics assassinate death-burst coating] [same-seat rejected: none] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 0 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] record reconciled: "Eldritch Burst" no longer imposes Prone — the clause left, so the record goes with it
[reskin] record reconciled: "Paralyzing Touch" no longer imposes Prone — the clause left, so the record goes with it
[reskin] done: "Archlich of the Bone Sun" — donor caster-21, CR 20
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 19-ancient-gold-dragon

**Typed:** `name: Ancient Gold Dragon |`

**signature elements:** molten gold breath [behavior] | body of living gold and fire [body] | ancient, patient judgment of when to strike [aura]

**identity:** The ancient gold dragon opens with a measured roar that unmakes lesser wills, then glides in low to pin the greatest threat beneath molten breath before its claws ever close — and every strike it lands carries fire and gold together, a burning weight of metal and doom. It circles above, choosing its moment with patient, terrifying judgment, letting foes exhaust themselves. When wounded it does not flee; it becomes cold and deliberate, using its breath like a scalpel and its body like a battering ram until nothing remains.

**lore:** An ancient gold dragon is a living vein of the deep world, hoarding not coins but the molten seams of the earth, and it wants only to see everything that is not gold reduced to ash and quiet.

### The sheet

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Archlich of the Bone Sun: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 18 taken name(s) the recording carried
[concept] thin but a print creature — keeping route-first: Ancient Gold Dragon
[path] exact — Ancient Gold Dragon (is) — "Ancient Gold Dragon" (code)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("Ancient Gold Dragon") | dragon: key "dragon" (class body)
[concept] hints: dragon→body ✓ ("Ancient Gold Dragon")
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=fiendish/breath mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Ancient Gold Dragon"
[concept] mechanics: breath
[concept] signature elements: molten gold breath [behavior] | body of living gold and fire [body] | ancient, patient judgment of when to strike [aura]
[concept] identity: The ancient gold dragon opens with a measured roar that unmakes lesser wills, then glides in low to pin the greatest threat beneath molten breath before its claws ever close — and every strike it lands carries fire and gold together, a burning weight of metal and doom. It circles above, choosing its moment with patient, terrifying judgment, letting foes exhaust themselves. When wounded it does not flee; it becomes cold and deliberate, using its breath like a scalpel and its body like a battering ram until nothing remains.
[concept] lore: An ancient gold dragon is a living vein of the deep world, hoarding not coins but the molten seams of the earth, and it wants only to see everything that is not gold reduced to ash and quiet.
[reskin] 2014 exact: "Ancient Gold Dragon" served from the SRD 5.1 corpus — no call, nothing rephrased (owner's ruling; the 2014 book's own creature)
[harness] enrichment not run (4 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
!! [ENRICHMENT] Failed to enrich Ancient Gold Dragon: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 2 call(s) from the tape, 0 live (live from the audit call onward)
```

</details>

## 20-trenchsong-leviathan

**Typed:** `a leviathan of the trench whose song drowns fleets`

**signature elements:** a song that drowns fleets [behavior] | brine-crusted trench leviathan body [body] | crushing pressure-song rolling across the water [aura]

**identity:** The leviathan opens a battle by sounding its abyssal song across the water, a crushing wave of Thunder that staggers whole crews and shivers hull-planking before it ever surfaces. Every round after, it circles beneath the keel and strikes with brine-crusted flukes and hull-shearing jaws, timing its blows to the rhythm of its own drowning hymn so prey cannot tell the swell from the attack. It does not flee and does not hurry: it is a patient, willful hunter that sings a ship apart over hours, savoring the slow sink, and turns truly savage only when wounded and robbed of its song.

**lore:** It has lain in the lightless trenches since before the first keel was laid, and it rises only when the deep grows too quiet, singing fleets down to keep the ocean crowded with the drowned it calls its choir.

### The sheet

```
Trenchsong Leviathan

Gargantuan Monstrosity, Neutral

AC 21
Initiative +0 (10)

HP 542 (31d20 + 217)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
28
+9
+16
INT
15
+2
+2
MOD
SAVE
DEX
10
+0
+0
WIS
20
+5
+12
MOD
SAVE
CON
24
+7
+14
CHA
20
+5
+5

Skills Athletics +16, Perception +12

Senses blindsight 120 ft., darkvision 120 ft.; Passive Perception 22

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The leviathan can breathe air and water.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes two Flukes attacks. It can replace one attack with a use of Brineplate Detonation.

Flukes. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Brineplate Detonation. Constitution Saving Throw: DC 24, each creature in a 15-foot Emanation originating from the leviathan. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Circle and Strike. The leviathan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Flukes attack.

Breach Slam. Strength Saving Throw: DC 24, each creature within 10 feet of the leviathan. Failure: The target has the Prone condition.

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

<details><summary>trace</summary>

```
[harness] restored 19 taken name(s) the recording carried
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] brute type=Monstrosity mechanics=none — casts: implied by the kind — "whose song drowns fleets" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | lurker-phantom: a Gargantuan body is not incorporeal — print's incorporeals are Medium and smaller | brute-grappler: ✓ ("a leviathan of the trench") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=aquatic/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a song that drowns fleets [behavior] | brine-crusted trench leviathan body [body] | crushing pressure-song rolling across the water [aura]
[concept] identity: The leviathan opens a battle by sounding its abyssal song across the water, a crushing wave of Thunder that staggers whole crews and shivers hull-planking before it ever surfaces. Every round after, it circles beneath the keel and strikes with brine-crusted flukes and hull-shearing jaws, timing its blows to the rhythm of its own drowning hymn so prey cannot tell the swell from the attack. It does not flee and does not hurry: it is a patient, willful hunter that sings a ship apart over hours, savoring the slow sink, and turns truly savage only when wounded and robbed of its song.
[concept] lore: It has lain in the lightless trenches since before the first keel was laid, and it rises only when the deep grows too quiet, singing fleets down to keep the ocean crowded with the drowned it calls its choir.
[reskin] mind tier: INT 10 -> 15 — the call read this creature as capable at CR 24
[reskin] mind tier: WIS 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] mind tier: CHA 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] donor: brute-21 -> CR 24 (invented — no printed peer)
[reskin] seats: action <- "a song that drowns fleets" | trait <- "brine-crusted trench leviathan body"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Legendary Ranged Attack" leaves with it (it made a Ranged Attack attack)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the leviathan" — the call's own answer (kind), built from the name
[reskin] inline form: "the leviathan" — the model's own reading of the name
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + the sheet's best 9) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical) [asked: save_area] [askMechanic: burst]
[reskin] open asks handed to the idea call: "a leviathan of the trench whose song drowns fleets" [burst]
[reskin] idea anchored: action — "The leviathan's body is crusted in brine-heavy plates that split the a" answers the GM's "a leviathan of the trench whose song drowns fleets"
[reskin] idea unanchored: trait — "The leviathan's hide is ridged with brine channels that ring like a st" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 2 of 27 answered; not true of this body: energy-aura
[reskin] menu: taste stands down — action answers the GM's "a leviathan of the trench whose song drowns fleets", so role and style do not filter the menu (legality still does); 11 template(s) offered
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The leviathan's body is crusted in brine-heavy plates that split the air as it breaches. When it makes a Flukes attack, it can release that pressure in a booming pulse: each creature within a short distance must succeed on a Constitution saving throw or take Thunder damage and be Deafened until the end of its next turn." [action/save/damage] [family: nova] — menu: escalating-dread, terror-pulse, exploiter, execute, lure, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, second-wind, aggro-curse, self-invisibility, rally, focus, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, stunning-strike, charge-push, pounce, charge, isolation)
[reskin] lead by this seat's own clause: action — "burst" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: execute (save/damage), curse-debt (save/damage), escalating-dread (save/condition)
[reskin] keys would have bound: action — lure (song)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: curse-debt, escalating-dread, terror-pulse, exploiter, lure, pacify, slow-bolt, sensory-strike, disarm, reveal — the key word does not mean the mechanic here
[reskin] closest refused: action — "execute" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a Constitution-save area burst of Thunder damage with the Deafened con)
[reskin] authored row answers the GM: action — "Brineplate Detonation" was written for "a leviathan of the trench whose song drowns fleets", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a Constitution-save area burst of Thunder damage with the Deafened con") and wrote an action instead: "Brineplate Detonation" -> Actions. *Constitution Saving Throw*: DC 24, each creature in a 15-foot Emanation originating from the leviathan. *Failure:* 52 (
[reskin] authored row numbers: "Brineplate Detonation" — the call declared (unanswered) number(s) promised
[reskin] value check: "Brineplate Detonation" EV 100.7 vs floor 19.8 (one attack of 2) — dice 52 → 38 (scaled down to the ceiling); a nova already stands — kept ungated, dice to 38 at the ceiling
[reskin] signature authored: no template — the seat wrote it -> Actions/"Brineplate Detonation" ("The leviathan's body is crusted in brine-heavy plates that split the air as it breaches. When it makes a Flukes attack, it can release that pressure in a boomin [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike echoes from its body in a painful chord—each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its next turn." [trait/on_being_hit/condition] [family: body-reaction] — menu: bloodied-burst, weapon-lodge (+ shelf: phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] lead by this seat's own clause: trait — "burst" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — burst: bloodied-burst
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: bloodied-burst (on_being_hit/damage), composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: bloodied-burst, composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened, weapon-lodge, noxious-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:condition:t0:deaf" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a Constitution save burst that deafens creatures in an area when it ta)
[reskin] seat answered, but: the call said "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it re" is carried by "Brinebell Chord", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The leviathan's hide is ridged with brine channels that ring like a st" and wrote no row of that kind (refused: "Brinebell Chord" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Brinebell Chord" — a trait is not a save — the save form takes stat, target and effect as fields and the engi); asking once more with the reason
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The leviathan's hide is ridged with brine channels that ring like a st" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: trait — first: "Brinebell Chord" — a trait is not a save — the save form takes stat, target and effect as; second: it belongs in the description; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "composed:body-reaction:condition:t0:deaf" nearest and judged its subject FLIPPED against the clause (a Constitution save burst that deafens creatures in an area when it ta); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike echoes from its body in a painful chord—each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its next turn." [trait/on_being_hit/condition] — the model found no template that holds it (offered: bloodied-burst, composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened, weapon-lodge, noxious-aura)
[reskin] weapons answered: Flukes = none; Drowning Hymn = none; Abyssal Refrain = none; Circle and Strike = none; Breach Slam = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Flukes" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] area swap gated: "Brineplate Detonation (Recharge 5-6)" deals 38 to an area in place of a 36 attack — print offers no at-will area swap that out-damages the attack it replaces (0 of its 24), so it takes print's Recharge
[reskin] multiattack replacement clause: It can replace one attack with a use of Brineplate Detonation (Recharge 5-6).
[reskin] one nova at ship: "Brineplate Detonation (Recharge 5-6)" un-gated to "Brineplate Detonation" — "Drowning Hymn" already carries this sheet's Recharge nova (un-gated by the one-nova rule — dice to 38, at or under the Multiattack sum (49); the action economy is the limit)
[reskin] area swap priced at half a hit: "Brineplate Detonation" is offered in an attack's place AT WILL and dealt 38 against a whole hit of 36; the ceiling is half a hit (18) with a save for half — print offers 15 area rows in an attack's place and none deals damage (owner's R1)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Brineplate Detonation: The name promises an explos…-foot Emanation originating from the leviathan."), Brineplate Detonation: Brineplate Detonation is a …fened condition until the end of its next turn."), Brineplate Detonation: The entry is a saving-throw…for the plates. (about: "Brineplate Detonation."), Breach Slam: Breach Slam's sole effect is the Pron… *Failure:* The target has the Prone condition.")]
[reskin] audit defect: Actions/"Brineplate Detonation" [model-written] medium misnamed — The name promises an explosion of the creature's own brine-plating, but the entry describes only a generic sonic burst with no mechanism explaining why the leviathan's plates detonate, what triggers the recharge, or how the plates relate to the thunder damage; as written it is a second, weaker Drowning Hymn. — Rewrite so the detonation visibly originates from the plates — e.g., flakes of brine shell burst outward — and differentiate its effect from the Hymn. (about: "*Constitution Saving Throw*: DC 24, each creature in a 15-foot Emanation originating from the leviathan.")
[reskin] audit defect: Actions/"Brineplate Detonation" [model-written] high weak — Brineplate Detonation is a short-range (15 ft.) lesser duplicate of Drowning Hymn (60 ft.) that deals a quarter of the damage and applies the identical Deafened rider, so a GM will never choose it and the unique signature action is a dead row. — Give the detonation a distinct payload — e.g., forced movement, a condition Drowning Hymn does not apply, or a lingering hazard — so it is worth its own action slot. (about: "*Failure:* 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn.")
[reskin] audit defect: Actions/"Brineplate Detonation" [model-written] low open_ended — The entry is a saving-throw effect with no action cost stated (it appears in Actions and in the Multiattack replacement, but carries no Attack Roll, no stated 'as an action', and no use limiter within its own text), leaving the GM unsure whether it is an action, a rider, or free to use with Multiattack. — State explicitly how the detonation is invoked (e.g., 'The leviathan can replace one attack with a detonation' or 'as an action') and any trigger for the plates. (about: "Brineplate Detonation.")
[reskin] audit defect: Legendary Actions/"Breach Slam" [catalog] medium weak — Breach Slam's sole effect is the Prone condition, which on any creature that can stand costs only half its Speed to clear; against a CR 24 leviathan's targets this is a wasted Legendary Action that neither damages nor imposes a condition the target cannot trivially end. — Add teeth — e.g., deal damage on failure, or add a condition or movement effect that lasts beyond the prone stand-up — so the breach is a threat, not a nuisance. (about: "*Strength Saving Throw*: DC 24, each creature within 10 feet of the leviathan. *Failure:* The target has the Prone condition.")
[reskin] [gap] a Constitution save burst that deafens creatures in an area when it takes Thunder damage — "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike echoes from its body in a painful chord—each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its next turn." — Trenchsong Leviathan [seat: trait [trait/on_being_hit/condition]] (closest offered: composed:body-reaction:condition:t0:deaf — NOT ON THE MENU) [effect: condition] [menu: bloodied-burst composed:body-reaction:condition:t0:poisoned composed:body-reaction:condition:t0:deafened composed:body-reaction:condition:t1:poisoned composed:body-reaction:condition:t1:deafened composed:body-reaction:condition:t2:poisoned composed:body-reaction:condition:t2:deafened weapon-lodge noxious-aura] [same-cell unoffered: none] [same-seat rejected: heated-body:body-verdict absorption:body-verdict resonant-body:condition-three-ways] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] multiattack citation synced: "Multiattack" cites each row as the row is named — a gated row reads "if available" as print writes it, an ungated row reads bare
[reskin] done: "Trenchsong Leviathan" — donor brute-21, CR 24
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 21-owlbear

**Typed:** `name: Owlbear |`

**signature elements:** owl-bear hybrid body of beak and crushing forelimbs [body] | grapples and mauls prey [behavior] | frenzied, fearless aggression [behavior]

**identity:** An owlbear opens a fight by rearing up and roaring, then crashes in with its hooked beak and crushing forelimbs to pin and maul whatever it has caught. Each round it stays planted and trades blows, dragging grappled prey into its beak while shrugging off hits on its thick hide and muscle. Sorely wounded, it only grows more frenzied, fighting to the death rather than yielding ground.

**lore:** A crossbred horror of owl and bear stitched together by an old and hungry magic, the owlbear wanders wild borders claiming a hunting range and devouring anything that strays into it.

### The sheet

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Trenchsong Leviathan: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 20 taken name(s) the recording carried
[concept] thin but a print creature — keeping route-first: Owlbear
[path] exact — Owlbear (is) — "Owlbear" (code)
[route] brute type=Monstrosity mechanics=none — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but offered no quote | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("Owlbear") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/terror mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Owlbear"
[concept] mechanics: none claimed
[concept] signature elements: owl-bear hybrid body of beak and crushing forelimbs [body] | grapples and mauls prey [behavior] | frenzied, fearless aggression [behavior]
[concept] identity: An owlbear opens a fight by rearing up and roaring, then crashes in with its hooked beak and crushing forelimbs to pin and maul whatever it has caught. Each round it stays planted and trades blows, dragging grappled prey into its beak while shrugging off hits on its thick hide and muscle. Sorely wounded, it only grows more frenzied, fighting to the death rather than yielding ground.
[concept] lore: A crossbred horror of owl and bear stitched together by an old and hungry magic, the owlbear wanders wild borders claiming a hunting range and devouring anything that strays into it.
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] donor: brute-2 -> CR 3
[reskin] seats: action <- "grapples and mauls prey" | trait <- "owl-bear hybrid body of beak and crushing forelimbs"
[reskin] [path] decides: exact on the Owlbear (the matcher agrees)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] class kit: none — the exact path takes no class kit
[reskin] inline by rule: "the owlbear" — the call answered "the owlbear" (kind), which the name does not support
[reskin] inline form: "the owlbear" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 15 (8 + PB 2 + the sheet's best 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Owlbear" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "When the owlbear hits a creature with its Beak, it can clamp down and " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The owlbear is a thing of muscle and madness that does not stop at pai" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, life-drain
[reskin] weapons answered: Beak = none
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
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 4 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 23-vashka-the-red

**Typed:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`

**signature elements:** lacquered plate and locked shields [object] | holding a shield wall without breaking ranks [behavior] | the punishing discipline of a drilled warlord [behavior]

**identity:** Vashka opens by anchoring a lacquered shield wall and letting the enemy come to him, his hobgoblin discipline turning the first charge into a bloody shove against iron. Every round he holds his knot of soldiers together, punishing anyone who tries to slip past or break the line with a brutal, measured counterblow, and he never advances out of formation even as he wins. Wounded and bloodied, he does not flee—he tightens the wall, shuffles back in step with his shieldmates, and fights to the last breath rather than break ranks.

**lore:** Vashka the Red rose through the war-hosts of the lacquered legions by never losing a shield wall, and now he sells that unbreakable line to whoever pays—so long as battle lets him test it against a worthier foe.

### The sheet

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

Holds the Line. While an ally within 5 feet of Vashka is not Incapacitated, Vashka has Advantage on saving throws against being Charmed or Frightened, and it cannot be made to leave a space within 5 feet of that ally by any effect unless that ally moves first.

Shield Wall. While a shield-bearing ally is within 5 feet of Vashka, neither Vashka nor that ally can be forced to move from its space against its will until one of them no longer stands within 5 feet of the other.

Pack Tactics. Vashka has Advantage on an attack roll against a creature if at least one of Vashka's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. Vashka makes two attacks, using Longsword or Longbow in any combination.

Longsword. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Slashing damage.

Longbow. Ranged Attack Roll: +7, range 150/600 ft. 21 (5d6 + 4) Piercing damage.

Reactions

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Owlbear: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 22 taken name(s) the recording carried
[path] class_npc — Hobgoblin Warrior (is) — class fighter — "warlord" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("A hobgoblin warlord") | defender-leader -> defender: the concept's VERB outranks the noun (key "shield wall", class verb) | defender: key "shield wall" (class verb)
[concept] name: "Vashka the Red" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Vashka the Red"
[concept] mechanics: none claimed
[concept] signature elements: lacquered plate and locked shields [object] | holding a shield wall without breaking ranks [behavior] | the punishing discipline of a drilled warlord [behavior]
[concept] identity: Vashka opens by anchoring a lacquered shield wall and letting the enemy come to him, his hobgoblin discipline turning the first charge into a bloody shove against iron. Every round he holds his knot of soldiers together, punishing anyone who tries to slip past or break the line with a brutal, measured counterblow, and he never advances out of formation even as he wins. Wounded and bloodied, he does not flee—he tightens the wall, shuffles back in step with his shieldmates, and fights to the last breath rather than break ranks.
[concept] lore: Vashka the Red rose through the war-hosts of the lacquered legions by never losing a shield wall, and now he sells that unbreakable line to whoever pays—so long as battle lets him test it against a worthier foe.
[reskin] the concept outranks the alias: the Hobgoblin Warrior is a Fey and the concept reads Humanoid — the words RESEMBLE it, they do not name it, so the print body stands down
[reskin] print canon array: STR 18, DEX 12, CON 12, INT 10, WIS 10, CHA 9 — the Hobgoblin Warrior's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "holding a shield wall without breaking ranks" | trait <- "lacquered plate and locked shields"
[reskin] [path] decides: class_npc on the Hobgoblin Warrior · class fighter (the matcher would have said homebrew)
[reskin] print canon: "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." heads on the Hobgoblin Warrior — print's rows ride along; the seat stays
[reskin] class kit: guarded-stance yields — AC 19 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] class kit: fighter — "warlord": Riposte (riposte)
[reskin] proper noun: "Vashka the Red" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vashka" — the call's own answer (person), built from the name
[reskin] inline form: "Vashka" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: limit "at_will" stands on "fights from a shield wall" — the call offered no separate quote and needs none (1b)
[reskin] lacks not claimed: "never breaks ranks" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Vashka the Red — A hobgoblin warlord in lacquered plate" -> has (descriptive), head | "fights from a shield wall" -> has (mechanical) [asked: at_will/resist] [askMechanic: harden] | "never breaks ranks" -> has (mechanical) [asked: buff_self] [askMechanic: harden]
[reskin] open asks handed to the idea call: "fights from a shield wall" [harden] · "never breaks ranks" [harden] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "Vashka barks a command over his shield rim, and any ally within earsho" answers the GM's "fights from a shield wall"
[reskin] idea unanchored: trait — "So long as Vashka has a shieldmate adjacent to him, his shield wall ho" names none of the 2 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 2 of 27 answered; not true of this body: seal
[reskin] menu: taste stands down — action answers the GM's "fights from a shield wall", so role and style do not filter the menu (legality still does); 17 template(s) offered
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vashka barks a command over his shield rim, and any ally within earshot who can see or hear him may immediately use its Reaction to form up on his line: each such ally moves to stand shoulder to shoulder with a shieldmate, and until the start of Vashka's next turn that creature's AC is increased by the interlocked shields around it." [action/always/defense] [family: sentinel] — menu: throw-retrieve, shield-bash, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, thrown-burst, execute, lure, pacify, escalating-dread, sensory-strike, thrown-burst-seed (+ shelf: delayed-brand, patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, rally, rampage, focus, feint-slip, stunning-strike, charge-push, affliction, contagion, pounce, isolation, bolt-restrain, bolt-drag, bolt-mark, charge)
[reskin] lead by this seat's own clause: action — "harden" from the clause this seat serves, not the sheet's "command"
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does defense; leading: throw-retrieve (always/damage), rally (always/movement), shield-bash (save/condition)
[reskin] keys would have bound: action — rally (shield)
[reskin] classification handed to the fit call: shape=resist often=at_will
[reskin] word match declined by the call: shield-bash, push-prone, disarm — the key word does not mean the mechanic here
[reskin] closest refused: action — "rally" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants each nearby ally a Reaction move into position and a bonus to A)
[reskin] seat authored nothing: action — the call was asked to write an action for "Vashka barks a command over his shield rim, and any ally within earsho" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "Vashka barks a command over his shield rim, and any ally within earsho" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: it belongs in the description; the seat stays empty
[reskin] closest refused — subject flipped: action — the call named "rally" nearest and judged its subject FLIPPED against the clause (grants each nearby ally a Reaction move into position and a bonus to A); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: action — the call answered none and names it "no_fit" — the GM's words key rally, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: action — "rally" is keyed by the GM's shield and was on the call's menu, which the call read as no fit; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: action — "Vashka barks a command over his shield rim, and any ally within earshot who can see or hear him may immediately use its Reaction to form up on his line: each such ally moves to stand shoulder to shoulder with a shieldmate, and until the start of Vashka's next turn that creature's AC is increased by the interlocked shields around it." [action/always/defense] — the model found no template that holds it (offered: throw-retrieve, rally, shield-bash, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, thrown-burst, execute, lure, pacify, escalating-dread, sensory-strike, thrown-burst-seed)
[reskin] fallback respects the call: rally, disarm, push-prone left the shelf — the call declined them for this sheet
[reskin] fallback stands down: the class_npc path has no shelf — the Hobgoblin Warrior's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 19 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share an interlocked fighting stance, and neither of them can be forced to move from its space against its will while the other still stands there. When his last shieldmate falls, the wall is broken and he fights on alone." [trait/always/defense] [family: sentinel] — menu: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, evasion
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: pack-tactics (always/damage), bloodied-fury (always/defense), death-restoration (always/defense)
[reskin] keys would have bound: trait — pack-tactics (shield wall, ranks, never breaks ranks)
[reskin] classification handed to the fit call: shape=resist often=at_will
[reskin] word match declined by the call: pack-tactics, bloodied-fury, death-restoration, shielded-mind, undead-fortitude, evasion, relentless-pursuit, bound — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: makes the creature and an adjacent ally impossible to force out of the)
[reskin] seat answered, but: the call said "So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share " is carried by "Shield Wall", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("makes the creature and an adjacent ally impossible to force out of the") and wrote a trait instead: "Shield Wall" -> Traits. While a shield-bearing ally is adjacent to Vashka, neither Vashka nor that ally can be forced to move from its space aga
[reskin] authored row numbers: "Shield Wall" — the call declared 0 number(s) promised
[reskin] free signature row: "Shield Wall" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Shield Wall" is HANDED "fights from a shield wall" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Shield Wall" ("So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share an interlocked fighting stance, and neit [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Holds the Line" — the call reads its condition as immune, so no condition is recorded against it
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Broadsword = longsword; Javelin = javelin
[reskin] weapon dice follow the weapon: "Javelin" is a javelin (d6) — "22 (4d8 + 4)" becomes "21 (5d6 + 4)", print's rule of keeping the die and scaling the count
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Hobgoblin Warrior's own type stands
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the Hobgoblin Warrior is the class's BODY on this path, not this creature's kind (print's own NPC blocks are all Humanoid)
[reskin] print canon attack: "Broadsword" -> "Longsword" — the Hobgoblin Warrior's own row
[reskin] print canon attack: "Javelin" -> "Longbow" — the Hobgoblin Warrior's own ranged row
[reskin] print canon trait: Pack Tactics — "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." is the Hobgoblin Warrior (print's own row)
[reskin] class weapon: "longsword" and "longbow" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Shield Wall" [no template]
[reskin] 2024 caps: "Holds the Line" — a condition or game term shipped lowercase
[reskin] asked but unanswered: "fights from a shield wall" asked for at_will and no row binds the clause
[reskin] lint fixed: vocab-adjacent — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Shield Wall carries "holding a shield wall without breaking ranks" — "neither Vashka nor that ally can be forced to move from its space against its wi"
[reskin] audit: [Holds the Line: The clause bars forced movement aw…ally by any effect unless that ally moves first"), Shield Wall: The protection's end condition is key…hem no longer stands within 5 feet of the other"), Holds the Line: A warlord who 'never breaks ranks'…ving throws against being Charmed or Frightened"), Shield Wall: Nothing on the sheet defines which al… shield-bearing ally is within 5 feet of Vashka")]
[reskin] audit defect: Traits/"Holds the Line" [model-written] high other — The clause bars forced movement away from an ally, overlapping Shield Wall's forced-movement protection and leaving a GM to adjudicate two near-identical immunities with different triggers and no way to tell which applies. — Remove the movement-immunity clause and keep Holds the Line focused on the Charmed/Frightened save advantage, leaving forced-movement protection to Shield Wall alone. (about: "it cannot be made to leave a space within 5 feet of that ally by any effect unless that ally moves first")
[reskin] audit defect: Traits/"Shield Wall" [model-written] medium untrackable — The protection's end condition is keyed to a spatial relationship the block gives no way to track once a creature is moved, since if the movement is refused the two never separate and if it succeeds the immunity already failed. — State the immunity as ending when the shield-bearing ally is Incapacitated or moves, not as a spatial check re-evaluated after each refused move. (about: "until one of them no longer stands within 5 feet of the other")
[reskin] audit defect: Traits/"Holds the Line" [model-written] medium weak — A warlord who 'never breaks ranks' is given a passive that only matters against two rare conditions, so the trait promises resolve but delivers almost nothing at most tables. — Give the trait a clause that reinforces the rank-holding fiction in ordinary combat, such as steadying nearby allies against fear, rather than a narrow personal save bonus. (about: "Vashka has Advantage on saving throws against being Charmed or Frightened")
[reskin] audit defect: Traits/"Shield Wall" [model-written] medium untrackable — Nothing on the sheet defines which allies bear shields, so the GM must invent a qualifying ally each encounter before the trait can be adjudicated. — Reword the trigger to 'while an ally within 5 feet of Vashka is not Incapacitated' so the condition is readable from the block. (about: "While a shield-bearing ally is within 5 feet of Vashka")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_zvh3r1
[reskin] [gap] grants each nearby ally a Reaction move into position and a bonus to AC until the warlord's next turn — "Vashka barks a command over his shield rim, and any ally within earshot who can see or hear him may immediately use its Reaction to form up on his line: each such ally moves to stand shoulder to shoulder with a shieldmate, and until the start of Vashka's next turn that creature's AC is increased by the interlocked shields around it." — Vashka the Red [seat: action [action/always/defense]] (closest offered: rally) [effect: defense] [menu: throw-retrieve rally shield-bash ground-burst terror-pulse slow-bolt disarm push-prone curse-debt reveal wind-up thrown-burst execute lure pacify escalating-dread sensory-strike thrown-burst-seed] [same-cell unoffered: false-appearance shell-withdraw bloodied-fury death-restoration uncanny-sense shielded-mind evasion patient-defense sealed-body relic-object guarded-stance undead-fortitude mimicry blurred-form] [same-seat rejected: zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Vashka the Red" — donor defender-5, CR 6
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 11 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 24-moltshell-harrower

**Typed:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`

**signature elements:** two arms pin prey while two scythe-arms carve [behavior] | acid-shedding shell [body] | spitting caustic maw [behavior]

**identity:** A four-armed scythe-brute that opens by lunging to pin prey beneath two bladed limbs, then carves with the remaining pair while its maw spits caustic bile at anything it cannot reach. It fights to the death, dragging its pinned victim close and shrugging its shell so the acid sloughing off it splashes whoever is clinging to it — the harder it is held, the more it burns.

**lore:** Hatchery-caste horrors bred in the shell-molting pits beneath insect colonies, it hunts to stock its mandibles with live prey and to wear down its own acid-shedding plating before the next molt.

### The sheet

```
Moltshell Harrower

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

Caustic Molt. A creature that grapples the harrower or is Grappled by it takes 7 (2d6) Acid damage.

Actions

Multiattack. The harrower makes two attacks, using Spitting Maw or Scythe-Arm Strike in any combination.

Spitting Maw. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Piercing damage plus 13 (3d8) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). If the target is a creature and doesn't already have a sheared wound, it is subjected to the following effect. Strength Saving Throw: DC 15. Failure: The target receives a sheared wound. While wounded, the target loses 7 (2d6) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 15 Wisdom (Medicine) check.

Scythe-Arm Strike. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Slashing damage.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Vashka the Red: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 23 taken name(s) the recording carried
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "pinning prey with two arms" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("pinning prey with two arms") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/venomous mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: two arms pin prey while two scythe-arms carve [behavior] | acid-shedding shell [body] | spitting caustic maw [behavior]
[concept] identity: A four-armed scythe-brute that opens by lunging to pin prey beneath two bladed limbs, then carves with the remaining pair while its maw spits caustic bile at anything it cannot reach. It fights to the death, dragging its pinned victim close and shrugging its shell so the acid sloughing off it splashes whoever is clinging to it — the harder it is held, the more it burns.
[concept] lore: Hatchery-caste horrors bred in the shell-molting pits beneath insect colonies, it hunts to stock its mandibles with live prey and to wear down its own acid-shedding plating before the next molt.
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 9
[reskin] mind tier: CHA 6 -> 10 — the call read this creature as ordinary at CR 9
[reskin] donor: brute-8-grappler -> CR 9
[reskin] seats: action <- "two arms pin prey while two scythe-arms carve" | trait <- "acid-shedding shell"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Caustic Spit = literal
[reskin] name_element answered: Caustic Spit = literal
[reskin] named parts: Spitting Maw (slot, Grappled) — the user's words, the engine's numbers
[reskin] energy rides the named weapon: "Spitting Maw" is a Piercing, so the blow stays Piercing and Acid rides it rather than folding into the blow (print: 11 of 53 weapon rows carry an energy rider)
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the harrower" — the call's own answer (kind), built from the name
[reskin] inline form: "the harrower" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral" -> Unaligned — a Monstrosity the call reads as bestial at INT 4 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: attack] | "a spitting maw" -> has (mechanical) [asked: save_single] [askMechanic: zone] | "a shell that sheds acid" -> has (mechanical) [asked: on_being_hit/save_area] [askMechanic: retaliate] | "It fights by pinning prey with two arms" -> has (mechanical) [asked: on_hit/condition] [askMechanic: grapple] | "carving with the others" -> has (mechanical) [asked: attack]
[reskin] open asks handed to the idea call: "It has four scythe-arms" · "a shell that sheds acid" [retaliate] · "It fights by pinning prey with two arms" [grapple] · "carving with the others"
[reskin] idea anchored: action — "When the harrower hits a creature with Spitting Maw, the other two scy" answers the GM's "It has four scythe-arms"
[reskin] idea unanchored: trait — "The harrower's shell sheds acid in slow sheets; at the start of each o" names none of the 4 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: shield-bash, active-toll, random-ray, herd, drain, rally, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, life-drain
[reskin] engulf engine withheld: Bonus Actions/"Swallow" leaves — the route call read this creature's hold as grip, not contain; the grapple stands and citations of the row are swept
[reskin] menu: taste stands down — action answers the GM's "It has four scythe-arms", so role and style do not filter the menu (legality still does); 7 template(s) offered
[reskin] menu pruned: action — push-prone, exploiter (the sheet cannot render them)
[reskin] signature idea (action): "When the harrower hits a creature with Spitting Maw, the other two scythe-arms shear into the same target in the same breath — the pinned prey is held and carved at once, and the target has the Bleeding wound (recurring damage at the start of its turns) until it or an ally staunches it." [rider/on_hit/damage] [family: payoff] — menu: affliction, contagion, stunning-strike, charge-push, pounce, isolation, charge (+ shelf: leap, condition-payoff, ground-burst, spew, escalating-dread, terror-pulse, thrown-burst-seed, wind-up, trample, thrown-burst, execute, lure, pull-through, pacify, snare-bolt, slow-bolt, sensory-strike, disarm, delayed-brand, curse-debt, reveal, shell-withdraw, second-wind, aggro-curse, self-invisibility, focus, coating, rampage, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte)
[reskin] composed candidates on the menu: action — composed:payoff:damage (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does damage; leading: isolation (on_hit/damage), charge (on_hit/damage), composed:payoff:damage (on_hit/damage)
[reskin] keys would have bound: action — spew, escalating-dread, snare-bolt, sensory-strike, shell-withdraw (spits, horror, spit, shell)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: isolation, charge, composed:payoff:damage, contagion, stunning-strike, charge-push, pounce, spew, rampage — the key word does not mean the mechanic here
[reskin] rider hold gate fell back to the text: "affliction" declares no condition record and a frame — the writer owes these fields
[reskin] signature rider: affliction -> Spitting Maw (appended; the pinned prey is held and carved at once, and the target has the Bleeding woun [verb: wound:idea, bleed:idea])
[reskin] signature idea (trait): "The harrower's shell sheds acid in slow sheets; at the start of each of its turns, any creature grappling it or within reach of it that clings to its body takes Acid damage, so the tighter prey holds on, the more it burns. Its own molting slough is the leverage it uses to wear the plating down." [trait/start_of_turn/damage] [family: body-reaction] — menu: spider-climb, phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] lead by this seat's own clause: trait — "retaliate" from the clause this seat serves, not the sheet's "grapple"
[reskin] composed candidates on the menu: trait — composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: energy-aura (start_of_turn/damage), truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition)
[reskin] keys would have bound: trait — fear-aura (horror)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: energy-aura — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:body-reaction:damage:t2: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:body-reaction:damage:t2" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "acid-shedding shell" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Caustic Molt" — the trait seat cannot quote the GM, but the call names the element it expresses: "acid-shedding shell". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): composed:body-reaction:damage:t2 -> Traits/"Caustic Molt" ("prey that clings to its body burns — a creature that grapples the harrower or is [shape fit, no verb match]")
[reskin] repair: 2 clause(s) with no row — "It has four scythe-arms", "It fights by pinning prey with two arms"; one targeted call with the sheet as context
[reskin] repair answer: attacks 1, saves 0, traits 0, reactions 0, answered [{"clause":"It fights by pinning prey with two arms","row":"Spitting Maw"}], unplaced []
[reskin] clause already answered: "It fights by pinning prey with two arms" is carried by "Spitting Maw" in different words — the call read the sheet and declined to answer it twice
[reskin] repaired sheet: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Scythe-Arm = none; Caustic Spit = none
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] element immunity: Acid — the call read this creature's energy as Acid and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Monstrosity -> Acid
[reskin] name-canon stands down: the path answered homebrew on "A Large insectile horror. It has four sc" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Caustic Molt" [no template]
[reskin] 2024 caps: "Caustic Molt" — a condition or game term shipped lowercase
[reskin] asked but unanswered: "a shell that sheds acid" asked for on_being_hit and no row binds the clause
[reskin] asked but unanswered: "It fights by pinning prey with two arms" asked for on_hit and no row binds the clause
[reskin] name follows content: Actions/"Scythe-Arm Sweep" promises the Prone condition the row never delivers — "Scythe-Arm Strike" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] multiattack re-read — "Scythe-Arm Sweep" left; "Multiattack" now reads "The harrower makes two Spitting Maw attacks."
[reskin] save re-derived after a retype: Actions/Spitting Maw — a Constitution save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] element expressed: Caustic Molt carries "acid-shedding shell" — "A creature that grapples the harrower or is Grappled by it takes 7 (2d6) Acid da"
audit span not verbatim, dropped: Spitting Maw If a creature and doesn't already have a sheared wound, it is subjected to the following effect. *Strength Saving Throw*: DC 15.
[reskin] audit: [Spitting Maw: The entry is named for spitting (a r…t. (about: "Melee Attack Roll: +8, reach 10 ft."), Spitting Maw: One attack roll carries a grapple ri…wound, it is subjected to the following effect."), Scythe-Arm Strike: The Scythe-Arm Strike is a plai… damage. (about: "17 (3d8 + 4) Slashing damage."), Multiattack: The GM asked for a creature that pins…: "The harrower makes two Spitting Maw attacks.")]
[reskin] audit rename blocked — "Spitting Maw" is the user's own part name, a kit feature's real name, or print's own row
[reskin] audit defect: Actions/"Spitting Maw" [model-written] medium other — One attack roll carries a grapple rider and then a nested conditional save creating a tracked wound with three separate closure conditions, which a GM cannot resolve in the time a turn allows without pausing to re-read. — Split the wound into its own named action or trim the closure conditions to one, so the attack resolves in a single pass. (about: "If the target is a creature and doesn't already have a sheared wound, it is subjected to the following effect.")
[reskin] audit defect: Actions/"Scythe-Arm Strike" [model-written] medium weak — The Scythe-Arm Strike is a plain single-target slashing hit that does strictly less than what the Multiattack loop delivers, so it is never worth choosing on the harrower's turn. — Give the scythe-arm a rider or carve condition so the four-bladed fiction has teeth beyond raw damage. (about: "17 (3d8 + 4) Slashing damage.")
[reskin] audit defect: Actions/"Multiattack" [catalog] high other (the audit said "undelivered") — The GM asked for a creature that pins prey with two arms and carves with the others, but the Multiattack only repeats the maw, leaving the four scythe-arms unused in the creature's actual turn loop. — Fold a scythe-arm carve into the Multiattack so the four-armed pin-and-carve fight is what the statblock runs. (about: "The harrower makes two Spitting Maw attacks.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] record completed: "Caustic Molt" imposes Grappled by its own text and carried no record — the fill site that wrote it owes this field (template=composed:body-reaction:damage:t2)
[reskin] multiattack re-read — "Scythe-Arm Strike" joins the combination; "The harrower makes two attacks, using Spitting Maw or Scythe-Arm Strike in any combination"
[reskin] done: "Moltshell Harrower" — donor brute-8-grappler, CR 9
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 8 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 25-blackiron-sentinel

**Typed:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`

**signature elements:** black-iron body that takes blows meant for its charge [body] | guarding a specific charge at all costs [behavior]

**identity:** The sentinel opens by stepping into the narrowest approach and body-blocking the charge, forcing attackers to break themselves against its black-iron mass before it answers with a single shattering hammer-blow of a fist. Every round after, it grinds forward at a relentless twenty feet, pinning foes against walls and terrain and taking the hit meant for what it guards, its iron skin drinking the blows. It does not tire, does not taunt, and does not flee — it fights to the last ounce of its forged bulk, breaking only when the charge it shields is destroyed.

**lore:** Forged in a black-iron foundry and bound by rune-chain to a single charge, the sentinel stands where it was set, and has stood there long enough that the road has grown around its feet.

### The sheet

```
Blackiron Sentinel
Huge construct, unaligned
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

	

7 (-2)

	

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

darkvision 60 ft., passive Perception 19

Languages: 

understands the languages of its creator but can't speak

Challenge

11 (7,200 XP)

Proficiency Bonus:

+4

Iron Interposition.While the sentinel is within 10 feet of its ward and a creature targets the ward with an attack, the sentinel interposes its bulk and forces the attack to roll against its own Armor Class instead of the ward's.
Ward Bond.The sentinel is magically bound to a ward of its choosing, and it can have only one ward at a time. While the sentinel is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the sentinel.
Regeneration.The sentinel regains 10 hit points at the start of each of its turns if it has at least 1 Hit Point.
Interpose (Reaction).When a creature within 5 feet of the sentinel that it guards is hit by an attack roll, the attack hits the sentinel instead, and the sentinel has Resistance to the attack's damage.

Actions
Multiattack: The sentinel makes two Fist attacks.
Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Rune-Chain Ward (2/Day): The sentinel targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the sentinel's next turn.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Moltshell Harrower: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 24 taken name(s) the recording carried
[path] homebrew — "a sentinel of black iron" (call)
[route] defender-warden type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-warden: ✓ ("a sentinel of black iron") | defender-warden stands on the homebrew path: the call ranked it and quoted "a sentinel of black iron" — the key "sentinel" is the menu, not the decision (step 7) | defender-warden: no line key in the words — the model's read of its quote | asked_mechanic harden: quote not found
[concept] hints: warden→style ✓ ("bound to a charge, shields with its body")
[concept] resolve: archetype=defender type=Construct typeFrom=the route call themes=forged/armed mind=mindless style=warden energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: black-iron body that takes blows meant for its charge [body] | guarding a specific charge at all costs [behavior]
[concept] identity: The sentinel opens by stepping into the narrowest approach and body-blocking the charge, forcing attackers to break themselves against its black-iron mass before it answers with a single shattering hammer-blow of a fist. Every round after, it grinds forward at a relentless twenty feet, pinning foes against walls and terrain and taking the hit meant for what it guards, its iron skin drinking the blows. It does not tire, does not taunt, and does not flee — it fights to the last ounce of its forged bulk, breaking only when the charge it shields is destroyed.
[concept] lore: Forged in a black-iron foundry and bound by rune-chain to a single charge, the sentinel stands where it was set, and has stood there long enough that the road has grown around its feet.
[reskin] mind tier held: INT stays 7 against "capable" — the call read this creature as mindless, so only "feeble" could lower its INT
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 11
[reskin] mind tier: CHA 3 -> 10 — the call read this creature as ordinary at CR 11
[reskin] donor: defender-7-warden -> CR 11
[reskin] seats: action <- "guarding a specific charge at all costs" | trait <- "black-iron body that takes blows meant for its charge"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the sentinel" — the call's own answer (kind), built from the name
[reskin] inline form: "the sentinel" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sentinel of black iron" -> has (descriptive), head | "AC 20" -> has (header) | "Huge" -> has (header) | "speed 20 feet" -> has (header)
[reskin] extraction: 1 of 4 model clauses quote nothing the user typed and leave the record ("AC 20")
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The sentinel sets its iron bulk and grinds forward in a straight line," names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Its rune-chain tautens to its ward, and the black iron drinks the harm" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: seal, shield-bash, active-toll, random-ray, herd, shell-withdraw, rally, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The sentinel sets its iron bulk and grinds forward in a straight line, driving through the space of any creature in its path. A creature whose space it enters must succeed on a Strength saving throw or be shoved back and knocked Prone, ground into the floor beneath its advancing mass." [action/save/condition] [family: zone] — menu: ground-burst, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, snare, lure, pacify, escalating-dread, sensory-strike (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, ward-retaliation, riposte, answering-strike, interpose, stunning-strike, charge-push)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: terror-pulse (save/condition), push-prone (save/condition), reveal (save/condition)
[reskin] keys would have bound: action — ward-retaliation (sentinel)
[reskin] word match declined by the call: terror-pulse, reveal, snare, lure, pacify, escalating-dread, sensory-strike, ground-burst, slow-bolt, disarm, curse-debt, wind-up, ward-retaliation, interpose — the key word does not mean the mechanic here
[reskin] closest refused: action — "push-prone" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: moves the sentinel through each creature's space along a line and shov)
[reskin] seat answered, but: the call said "The sentinel sets its iron bulk and grinds forward in a straight line, driving through the space of any creature in its " is carried by "Iron Advance", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("moves the sentinel through each creature's space along a line and shov") and wrote an action instead: "Iron Advance" -> Actions. *Strength Saving Throw*: DC 17, one creature within 30 feet. *Failure:* The target is pushed up to 10 feet straight away
[reskin] authored row numbers: "Iron Advance" — the call declared (unanswered) number(s) promised
[reskin] value check: "Iron Advance" EV 26.4 vs floor 12.5 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Iron Advance" ("The sentinel sets its iron bulk and grinds forward in a straight line, driving through the space of any creature in its path. A creature whose space it enters m [authored: the catalog held no shape for it]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 18 already beats print's 17 at CR 11, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Its rune-chain tautens to its ward, and the black iron drinks the harm meant for what it guards: while the sentinel is within reach of its ward, any attack that targets the ward draws the sentinel's interposing bulk, and the sentinel can force the attack to roll against its own Armor Class instead." [trait/always/defense] [family: sentinel] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, sealed-body, warded-mending, guarded-stance, undead-fortitude, truth-aura, fear-aura, evasion (+ shelf: resonant-body, weapon-lodge)
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — resonant-body (iron)
[reskin] word match declined by the call: bloodied-fury, death-restoration, undead-fortitude, warded-mending, bound, guarded-stance — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: redirects an attack aimed at the ward onto the sentinel's own AC)
[reskin] seat answered, but: the call said "Its rune-chain tautens to its ward, and the black iron drinks the harm meant for what it guards: while the sentinel is w" is carried by "Iron Interposition", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("redirects an attack aimed at the ward onto the sentinel's own AC") and wrote a trait instead: "Iron Interposition" -> Traits. While the sentinel is within 10 feet of its ward and a creature targets the ward with an attack, the sentinel interposes
[reskin] authored row numbers: "Iron Interposition" — the call declared 1 number(s) promised
[reskin] seat default: warden owes interpose by print — it seats before the idea
[reskin] signature template (trait): interpose -> Reactions/"Interpose" ("the seat owes it by print")
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Iron Interposition" ("Its rune-chain tautens to its ward, and the black iron drinks the harm meant for what it guards: while the sentinel is within reach of its ward, any attack that [authored: the catalog held no shape for it]")
[reskin] weapons answered: Fist = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a sentinel of black iron" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Iron Advance.
[reskin] free row over budget: Actions/"Iron Advance" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] multiattack re-read — "Iron Advance" left; "Multiattack" now reads "The sentinel makes two Fist attacks."
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Iron Interposition" [no template]
[reskin] lint: 0 findings
[reskin] element expressed: Iron Interposition carries "black-iron body that takes blows meant for its charge" — "the sentinel interposes its bulk and forces the attack to roll against its own A"
[reskin] audit: [Iron Interposition: The trait triggers off 'its wa…hile the sentinel is within 10 feet of its ward"), Iron Interposition: This duplicates the Reaction I…ainst its own Armor Class instead of the ward's"), Interpose: The Reaction calls the target 'a creatu…ntinel that it guards is hit by an attack roll."), Ward Bond: The bond's creation is presented as an …oosing, and it can have only one ward at a time"), Iron Interposition: The passive fires on every att…ainst its own Armor Class instead of the ward's")]
[reskin] audit defect: Traits/"Iron Interposition" [model-written] high dead_reference — The trait triggers off 'its ward' but nothing on the sheet defines or designates which creature is the ward at the table, so the GM cannot adjudicate when the trigger is live. — Point to the state created by Ward Bond (the creature the sentinel is bound to) rather than an undefined 'ward'. (about: "While the sentinel is within 10 feet of its ward")
[reskin] audit defect: Traits/"Iron Interposition" [model-written] medium other — This duplicates the Reaction Interpose, which already redirects an attack that hits the guarded creature onto the sentinel; two overlapping redirect rules give the GM no clear order when both could apply. — Either scope Iron Interposition to a distinct trigger (e.g. an attack against the ward from beyond 5 feet) or trim it so it does not restate the Interpose redirect. (about: "forces the attack to roll against its own Armor Class instead of the ward's")
[reskin] audit defect: Reactions/"Interpose" [catalog] high dead_reference — The Reaction calls the target 'a creature ... that it guards', but no entry establishes a 'guarded' relation, so the trigger names a state the block never creates. — Reference the Ward Bond relation directly (the sentinel's ward) so the trigger's subject is one the sheet defines. (about: "A creature within 5 feet of the sentinel that it guards is hit by an attack roll.")
[reskin] audit defect: Traits/"Ward Bond" [print] medium open_ended — The bond's creation is presented as an activity with no action cost, timing, or range, so the GM cannot tell when or how the sentinel selects its ward. — State the cost and timing of choosing a ward (or that it is set when created) so the bond is a defined, trackable state. (about: "is magically bound to a ward of its choosing, and it can have only one ward at a time")
[reskin] audit defect: Traits/"Iron Interposition" [model-written] medium other — The passive fires on every attack against the ward automatically with no reaction cost, overlapping Interpose, forcing the GM to resolve two competing redirect rules each time the ward is attacked. — Give the passive a clear boundary or make it the sole redirect so only one rule governs an attack on the ward. (about: "a creature targets the ward with an attack, the sentinel interposes its bulk and forces the attack to roll against its own Armor Class instead of the ward's")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Iron Interposition" carries "Its rune-chain tautens to its ward, and the black iron d", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] header clause: speed 30 ft. -> 20 ft. — the user typed 20 feet
[reskin] user-set: AC 18 -> 20 — a declared field, not a derivation (Resolution 3)
[reskin] done: "Blackiron Sentinel" — donor defender-7-warden, CR 11
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 9 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 26-mirewitch-sable

**Typed:** `a marsh witch who curses trespassers, cr 7`

**signature elements:** cursing trespassers with hexes and conditions [behavior] | swamp-brine body that sinks and stains [body] | the fen itself rising as her weapon [aura]

**identity:** The marsh witch opens by laying her curse on the nearest trespasser from the treeline — a whispered hex, a gaze that sinks the will, a ray of grave-cold that rots the limbs that carry it. Every round after is action denial: she strips a victim's footing with clinging marsh-brine, blinds it with swamp-light, or forces it to stand and stagger where the mire and her bog-hounds can reach. When bloodied she does not duel — she sinks into the fen and reopens the fight from a new angle, patient and mocking, never chasing a foe that flees.

**lore:** A hedge-witch who drowned in the fen and traded her grave for the marsh's power, she now charges the swamp itself as her price: every intruder who crosses her water walks out cursed, or stays as part of the bog.

### The sheet

```
Mirewitch Sable

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

Sodden Mire. The ground in a 10-foot Emanation originating from Sable is Difficult Terrain.

Actions

Multiattack. Sable makes three Arcane Burst attacks. It can replace one attack with a use of Fen-Weight Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sable casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fen-Weight Hex. Strength Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Restrained condition until the end of its next turn.

Bonus Actions

Misty Step (3/Day). Sable casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). Sable casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Blackiron Sentinel: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 25 taken name(s) the recording carried
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: on the GM's own words "curses trespassers" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("curses trespassers")
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=beguiling/grave mind=sapient style=binder energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: cursing trespassers with hexes and conditions [behavior] | swamp-brine body that sinks and stains [body] | the fen itself rising as her weapon [aura]
[concept] identity: The marsh witch opens by laying her curse on the nearest trespasser from the treeline — a whispered hex, a gaze that sinks the will, a ray of grave-cold that rots the limbs that carry it. Every round after is action denial: she strips a victim's footing with clinging marsh-brine, blinds it with swamp-light, or forces it to stand and stagger where the mire and her bog-hounds can reach. When bloodied she does not duel — she sinks into the fen and reopens the fight from a new angle, patient and mocking, never chasing a foe that flees.
[concept] lore: A hedge-witch who drowned in the fen and traded her grave for the marsh's power, she now charges the swamp itself as her price: every intruder who crosses her water walks out cursed, or stays as part of the bog.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 7
[reskin] print canon defenses: HP 108 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-8-binder -> CR 7
[reskin] seats: action <- "cursing trespassers with hexes and conditions" | trait <- "swamp-brine body that sinks and stains"
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "a marsh witch who curses trespassers, cr 7" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 3 defect(s) — "Grave-Cold Ray" deals Cold on a Humanoid whose concept names no Cold — a name is not a warrant; use a physical type | "Drowning Chill" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | name "Drowning Chill" claims an element its damage (Necrotic) does not pay
[reskin] repair round 2: 2 defect(s) — "Grave-Cold Ray" deals Cold on a Humanoid whose concept names no Cold — a name is not a warrant; use a physical type | "Brine-Rot Gaze" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "Sable" — the call's own answer (person), built from the name
[reskin] inline form: "Sable" — the model's own reading of the name
[reskin] energy rider withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words
[reskin] energy withheld on a base row: "Brine-Rot Gaze" Necrotic -> Bludgeoning (the body's physical type; a Humanoid deals no Necrotic its concept never gave it)
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] spell DC coherence: DC 14 -> 11 off Charisma 11 (print's array stays)
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: condition] [askMechanic: curse] | "cr 7" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 7")
[reskin] open asks handed to the idea call: "curses trespassers" [curse] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "Sable whispers a hex into a handful of fen-water and flicks it at one " answers the GM's "curses trespassers"
[reskin] idea unanchored: trait — "Where Sable stands, the fen answers her: the ground within a short rad" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: seal, active-toll, random-ray, spew, snare-bolt, herd, rally, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, blurred-form, death-burst
[reskin] menu: taste stands down — action answers the GM's "curses trespassers", so role and style do not filter the menu (legality still does); 24 template(s) offered
[reskin] signature idea (action): "Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, the mire marks it — for the next minute, whenever the cursed creature moves on its turn, it must spend movement slogging through phantom fen, and Sable always knows which way it went and how far, hearing the bog whisper its path back to her." [action/save/condition] [family: mark] — menu: condition-payoff, wail, lure, ground-burst, pacify, escalating-dread, slow-bolt, sensory-strike, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, thrown-burst, gaze-single, zone, execute, throw-retrieve, terror-pulse, disarm, push-prone, exploiter (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rampage, patient-defense, second-wind, focus, feint-slip, snap-shot, riposte, answering-strike, life-drain, bolt-restrain, bolt-drag, bolt-mark, affliction, contagion, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — curse: curse-debt, delayed-brand
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: curse-debt (save/damage), delayed-brand (start_of_turn/damage), lure (save/condition)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: lure, pacify, escalating-dread, gaze-single, sensory-strike, slow-bolt — the key word does not mean the mechanic here
[reskin] closest refused: action — "lure" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a lasting curse that slows the target's movement and lets Sable track )
[reskin] seat authored nothing: action — the call was asked to write an action for "Sable whispers a hex into a handful of fen-water and flicks it at one " and wrote no row of that kind (refused: "Fen-Whisper Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Fen-Whisper Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains,); asking once more with the reason
[reskin] authored row answers the GM: action — "Fen-Weight Hex" was written for "curses trespassers", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a lasting curse that slows the target's movement and lets Sable track ") and wrote an action instead: "Fen-Weight Hex" -> Actions. *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* The target has the Restrained condition until the 
[reskin] authored row numbers: "Fen-Weight Hex" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Fen-Weight Hex" after ""Fen-Whisper Hex" — the row does nothing on a failed save — say what the target "
[reskin] seat takes its clause: "Fen-Weight Hex" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Fen-Weight Hex" ("Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, t [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, aberrant-ground — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:terrain: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:terrain" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "the fen itself rising as her weapon" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] free signature row: "Sodden Mire" — the trait seat cannot quote the GM, but the call names the element it expresses: "the fen itself rising as her weapon". Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] seat takes its clause: "Sodden Mire" is HANDED "a marsh witch" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): composed:zone:terrain -> Traits/"Sodden Mire" ("the ground within a short radius of her is sodden, sucking mire that counts as d [shape fit, no verb match]")
[reskin] weapons answered: Brine-Clawed Hand = none; Grave-Cold Ray = none; Drowning Chill = none; Fen-Weight Curse = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Mage's own type stands
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Brine-Clawed Hand" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "Sable makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Grave-Cold Ray" leaves — the Mage carries no ranged row and the words name none
[reskin] print canon saves: proficient in INT, WIS — the Mage's own set, at this sheet's stats and PB 3 (changed INT, CHA)
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Brine-Rot Gaze" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Fen-Weight Hex.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Sodden Mire" [no template]
[reskin] save re-derived after a retype: Actions/Fen-Weight Hex — a Wisdom save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] element expressed: Sodden Mire carries "the fen itself rising as her weapon" — "The ground in a 10-foot Emanation originating from Sable is Difficult Terrain."
[reskin] audit: [Sodden Mire: The aura moves with Sable and drags a…on originating from Sable is Difficult Terrain."), Fen-Weight Hex: The hex is pure weight-with-no-pay…ained condition until the end of its next turn."), Fen-Weight Hex: The name promises a lingering curs…text actually delivers. (about: "Fen-Weight Hex")]
[reskin] audit rename held — "Fen-Weight Hex" was written for the GM's own clause (cl_a3qo0a: "curses trespassers"), so "Mire Drag" does not land; the finding stands as logged
[reskin] audit defect: Traits/"Sodden Mire" [model-written] medium other — The aura moves with Sable and drags allies and Sable herself through difficult terrain with no clause limiting it to hostile trespassers, so it impedes her own kiting and her allies' turns rather than reading as the marsh fighting intruders. — Restrict the emanation to creatures hostile to Sable, or grant Sable and her allies immunity to the difficult terrain so the fen only claims trespassers. (about: "The ground in a 10-foot Emanation originating from Sable is Difficult Terrain.")
[reskin] audit defect: Actions/"Fen-Weight Hex" [model-written] medium weak — The hex is pure weight-with-no-payload — it restrains the target for a single turn but deals no damage and imposes no other condition, so the clause has no teeth beyond a moment's slowdown and the fiction of marsh muck dragging a trespasser down never lands. — Add a lasting consequence the mire leaves behind (e.g., a Speed reduction or a recurring save) or a Poisoned-style rider so the curse bites after the Restrained wears off. (about: "The target has the Restrained condition until the end of its next turn.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Mirewitch Sable" — donor caster-8-binder, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 27-oathbroken-warder

**Typed:** `a templar priest with a mace and no magic at all`

**signature elements:** a mace swung without a single prayer behind it [object] | holds the line, punishes those who slip past [behavior] | iron discipline and iron plate [body]

**identity:** The templar opens by planting his shield and letting the first charge break on him, answering with short, economical mace blows aimed at joints and fingers rather than vitals. Every round after, he shadows the nearest ally-threat, punishing anyone who slips past by stepping into their path and cracking the offending limb; he never chases, he occupies. Under pressure he does not flee — he plants harder, spends his own blood to hold the choke point, and fights to the death because retreat would mean abandoning the line he swore to keep.

**lore:** A disgraced templar whose order stripped his blessings but not his duty, he still keeps his vigil at the door of the shrine he failed to defend, striking down any armed soul who tries to cross it uninvited.

### The sheet

```
Oathbroken Warder

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

The Oath's Silence. When the warder hits with a Mace attack, the warder can deal maximum damage instead of rolling, but takes Psychic damage equal to the damage dealt.

Aura of Authority. While in a 10-foot Emanation originating from the warder, the warder and its allies have Advantage on attack rolls and saving throws, provided the warder doesn't have the Incapacitated condition.

Actions

Multiattack. The warder makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the warder's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the warder can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Parry. Trigger: The warder is hit by a melee attack roll while holding a weapon. Response: The warder adds 3 to its AC against that attack, possibly causing it to miss.

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

<details><summary>trace</summary>

```
[harness] restored 26 taken name(s) the recording carried
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a templar priest with a mace and no magi…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a mace swung without a single prayer behind it [object] | holds the line, punishes those who slip past [behavior] | iron discipline and iron plate [body]
[concept] identity: The templar opens by planting his shield and letting the first charge break on him, answering with short, economical mace blows aimed at joints and fingers rather than vitals. Every round after, he shadows the nearest ally-threat, punishing anyone who slips past by stepping into their path and cracking the offending limb; he never chases, he occupies. Under pressure he does not flee — he plants harder, spends his own blood to hold the choke point, and fights to the death because retreat would mean abandoning the line he swore to keep.
[concept] lore: A disgraced templar whose order stripped his blessings but not his duty, he still keeps his vigil at the door of the shrine he failed to defend, striking down any armed soul who tries to cross it uninvited.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "holds the line, punishes those who slip past" | trait <- "a mace swung without a single prayer behind it"
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Crossbow" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] features: Sap on Mace — the feature table, no call
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the warder" — the call's own answer (kind), built from the name; the rules would have said "Warder"
[reskin] inline on stamped rows: "Warder" -> "the warder" on 2 rows — they were written before the name's form was settled
[reskin] inline form: "the warder" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The warder plants his shield and dares the line to break. Each creatur" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The warder fights without a single prayer behind his mace. When he hit" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 27 of 27 answered; not true of this body: seal, active-toll, random-ray, herd, shell-withdraw, rally, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have its Speed reduced to 0 until the end of that turn, as he steps into its path and cracks the offending limb." [reaction/on_being_hit/movement] [family: sentinel] — menu: riposte, answering-strike (+ shelf: throw-retrieve, shield-bash, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, stunning-strike, charge-push)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_being_hit/does movement; leading: riposte (on_being_hit/damage), answering-strike (on_being_hit/damage)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: riposte, answering-strike — the key word does not mean the mechanic here
[reskin] closest refused: action — "riposte" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: halts the movement of any creature that moves within the creature's re)
[reskin] seat answered, but: the call said "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during" is carried by "Hold the Line", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a reaction for "The warder plants his shield and dares the line to break. Each creatur" and wrote no row of that kind (refused: "Hold the Line" — the response writes a saving throw as prose — put it in the "save" object (stat, target, damage, condition, success) and the engine renders it after "Response", as print does)
[reskin] seat asked again: action — the first answer was refused ("Hold the Line" — the response writes a saving throw as prose — put it in the "save" object (stat, target, dam); asking once more with the reason
[reskin] seat answered, but: the call said "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during" is carried by "Hold the Line", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a reaction for "The warder plants his shield and dares the line to break. Each creatur" and wrote no row of that kind (refused: "Hold the Line" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: action — first: "Hold the Line" — the response writes a saving throw as prose — put it in the "save" objec; second: "Hold the Line" — a reaction's save deals no damage here, so say what the target suffers a; the seat stays empty
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have its Speed reduced to 0 until the end of that turn, as he steps into its path and cracks the offending limb." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: riposte, answering-strike)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he takes psychic damage equal to the damage dealt as the oath's silence turns inward." [trait/always/damage] [family: payoff] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, warded-mending, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: blood-frenzy, pack-tactics, bloodied-fury, guarded-stance — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on a hit, choose to maximize the damage and take psychic damage equal )
[reskin] seat answered, but: the call said "When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he takes psychic damage eq" is carried by "The Oath's Silence", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("on a hit, choose to maximize the damage and take psychic damage equal ") and wrote a trait instead: "The Oath's Silence" -> Traits. When the warder hits with a Mace attack, the warder can deal maximum damage instead of rolling, but takes psychic damage
[reskin] authored row numbers: "The Oath's Silence" — the call declared 1 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"The Oath's Silence" ("The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he take [authored: the catalog held no shape for it]")
[reskin] weapons answered: Mace = mace; Crossbow = crossbow
[reskin] weapon dice follow the weapon: the GM's "Mace" is a mace (d6) — "22 (4d8 + 4)" becomes "21 (5d6 + 4)"
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "the warder makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon saves: proficient in STR, DEX, CON, WIS — the Gladiator's own set, at this sheet's stats and PB 3 (changed DEX, WIS)
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] print canon row: Reactions/Parry — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Mace" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 63 against the card's 45 — the attack rows re-solve at 75% (3 attacks off one row after a supersede)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "The Oath's Silence" [no template]
[reskin] lint fixed: damage-type-caps — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element expressed: The Oath's Silence carries "a mace swung without a single prayer behind it" — "the warder can deal maximum damage instead of rolling, but takes Psychic damage "
audit finding below confidence gate: Shield Bash On a creature that already makes three Mace attacks with a statline this size, the Bash deals less damage than a Mace and its only extra is Prone, which the target simply stands up from — it is not worth trading a Mace attack for.
[reskin] audit: [Aura of Authority: As written the aura's radius ha…arder doesn't have the Incapacitated condition."), Mace: The name 'The Oath's Silence' and the Mace's…roll before the start of the warder's next turn"), The Oath's Silence: The trait states no timing or … takes Psychic damage equal to the damage dealt")]
[reskin] audit defect: Traits/"Aura of Authority" [catalog] medium other — As written the aura's radius has no anchor for who counts as 'in' it, and there is no statement that it only benefits creatures friendly to the warder beyond 'its allies' with no definition of ally on a solo creature — a GM cannot decide at the table who gains the Advantage. — Clarify the aura targets the warder and creatures it chooses as allies within the emanation, or drop the ally clause to a self-only benefit. (about: "While in a 10-foot Emanation originating from the warder, the warder and its allies have Advantage on attack rolls and saving throws, provided the warder doesn't have the Incapacitated condition.")
[reskin] audit defect: Actions/"Mace" [model-written] low other — The name 'The Oath's Silence' and the Mace's Disadvantage rider both promise silencing/penalty but the block has no clause tying them; more importantly the Mace deals Bludgeoning while the trait's whole fiction is an unprayed, silent strike — nothing in the Mace's text expresses that silence, so the signature action and its trait are disconnected. — Tie the trait's cost/effect to the Mace rider directly, or give the Mace text a clause the trait's silence mechanic actually modifies. (about: "the target has Disadvantage on its next attack roll before the start of the warder's next turn")
[reskin] audit defect: Traits/"The Oath's Silence" [model-written] high open_ended — The trait states no timing or action cost for the choice and gives no cap or end condition on the self-Psychic damage, leaving the GM to decide whether the warder can use it on every hit in a Multiattack and whether the damage can be reduced — the ability cannot be resolved as written. — State when the choice is made (per hit, once per turn) and how the Psychic damage is applied. (about: "the warder can deal maximum damage instead of rolling, but takes Psychic damage equal to the damage dealt")
[reskin] clause unresolved: "The Oath's Silence" carries "When he hits with a Mace attack, he can choose to deal m", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] [gap] halts the movement of any creature that moves within the creature's reach, zeroing its Speed — "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have its Speed reduced to 0 until the end of that turn, as he steps into its path and cracks the offending limb." — Oathbroken Warder [seat: action [reaction/on_being_hit/movement]] (closest offered: riposte) [effect: movement] [menu: riposte answering-strike] [same-cell unoffered: none] [same-seat rejected: ward-retaliation:requires-style snap-shot:host-row interpose:requires-style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Oathbroken Warder" — donor defender-5, CR 6
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 27-oathbroken-warder

**Typed:** `a templar priest with a mace and no magic at all`

**signature elements:** a mace swung without a single prayer behind it [object] | holds the line, punishes those who slip past [behavior] | iron discipline and iron plate [body]

**identity:** The templar opens by planting his shield and letting the first charge break on him, answering with short, economical mace blows aimed at joints and fingers rather than vitals. Every round after, he shadows the nearest ally-threat, punishing anyone who slips past by stepping into their path and cracking the offending limb; he never chases, he occupies. Under pressure he does not flee — he plants harder, spends his own blood to hold the choke point, and fights to the death because retreat would mean abandoning the line he swore to keep.

**lore:** A disgraced templar whose order stripped his blessings but not his duty, he still keeps his vigil at the door of the shrine he failed to defend, striking down any armed soul who tries to cross it uninvited.

### The sheet

```
Oathbroken Warder

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

The Oath's Silence. When the warder hits with a Mace attack, the warder can deal maximum damage instead of rolling, but takes Psychic damage equal to the damage dealt.

Aura of Authority. While in a 10-foot Emanation originating from the warder, the warder and its allies have Advantage on attack rolls and saving throws, provided the warder doesn't have the Incapacitated condition.

Actions

Multiattack. The warder makes three Mace attacks. It can replace one attack with a use of Shield Bash.

Mace. Melee Attack Roll: +7, reach 5 ft. 17 (3d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the warder's next turn.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the warder can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Parry. Trigger: The warder is hit by a melee attack roll while holding a weapon. Response: The warder adds 3 to its AC against that attack, possibly causing it to miss.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Mirewitch Sable: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 26 taken name(s) the recording carried
[path] class_npc — class paladin — "templar" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a templar priest with a mace") | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a templar priest with a mace and no magi…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/terror mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a mace swung without a single prayer behind it [object] | holds the line, punishes those who slip past [behavior] | iron discipline and iron plate [body]
[concept] identity: The templar opens by planting his shield and letting the first charge break on him, answering with short, economical mace blows aimed at joints and fingers rather than vitals. Every round after, he shadows the nearest ally-threat, punishing anyone who slips past by stepping into their path and cracking the offending limb; he never chases, he occupies. Under pressure he does not flee — he plants harder, spends his own blood to hold the choke point, and fights to the death because retreat would mean abandoning the line he swore to keep.
[concept] lore: A disgraced templar whose order stripped his blessings but not his duty, he still keeps his vigil at the door of the shrine he failed to defend, striking down any armed soul who tries to cross it uninvited.
[reskin] [path] class body: the paladin stands on the Gladiator — the class's own print block, nearest CR 6
[reskin] print canon defenses: HP 91 -> 112, AC 19 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +7 -> +7, DC 15 (print's)
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "holds the line, punishes those who slip past" | trait <- "a mace swung without a single prayer behind it"
[reskin] [path] decides: class_npc on the Gladiator · class paladin (the matcher would have said twist Priest)
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Crossbow" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] features: Sap on Mace — the feature table, no call
[reskin] class kit: paladin — "templar": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] inline declared: "the warder" — the call's own answer (kind), built from the name; the rules would have said "Warder"
[reskin] inline on stamped rows: "Warder" -> "the warder" on 2 rows — they were written before the name's form was settled
[reskin] inline form: "the warder" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The warder plants his shield and dares the line to break. Each creatur" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The warder fights without a single prayer behind his mace. When he hit" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 27 of 27 answered; not true of this body: seal, active-toll, random-ray, herd, shell-withdraw, rally, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have its Speed reduced to 0 until the end of that turn, as he steps into its path and cracks the offending limb." [reaction/on_being_hit/movement] [family: sentinel] — menu: riposte, answering-strike (+ shelf: throw-retrieve, shield-bash, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, stunning-strike, charge-push)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_being_hit/does movement; leading: riposte (on_being_hit/damage), answering-strike (on_being_hit/damage)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: riposte, answering-strike — the key word does not mean the mechanic here
[reskin] closest refused: action — "riposte" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: halts the movement of any creature that moves within the creature's re)
[reskin] seat answered, but: the call said "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during" is carried by "Hold the Line", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a reaction for "The warder plants his shield and dares the line to break. Each creatur" and wrote no row of that kind (refused: "Hold the Line" — the response writes a saving throw as prose — put it in the "save" object (stat, target, damage, condition, success) and the engine renders it after "Response", as print does)
[reskin] seat asked again: action — the first answer was refused ("Hold the Line" — the response writes a saving throw as prose — put it in the "save" object (stat, target, dam); asking once more with the reason
[reskin] seat answered, but: the call said "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during" is carried by "Hold the Line", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a reaction for "The warder plants his shield and dares the line to break. Each creatur" and wrote no row of that kind (refused: "Hold the Line" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: action — first: "Hold the Line" — the response writes a saving throw as prose — put it in the "save" objec; second: "Hold the Line" — a reaction's save deals no damage here, so say what the target suffers a; the seat stays empty
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have its Speed reduced to 0 until the end of that turn, as he steps into its path and cracks the offending limb." [reaction/on_being_hit/movement] — the model found no template that holds it (offered: riposte, answering-strike)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he takes psychic damage equal to the damage dealt as the oath's silence turns inward." [trait/always/damage] [family: payoff] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, warded-mending, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: blood-frenzy, pack-tactics, bloodied-fury, guarded-stance — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on a hit, choose to maximize the damage and take psychic damage equal )
[reskin] seat answered, but: the call said "When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he takes psychic damage eq" is carried by "The Oath's Silence", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("on a hit, choose to maximize the damage and take psychic damage equal ") and wrote a trait instead: "The Oath's Silence" -> Traits. When the warder hits with a Mace attack, the warder can deal maximum damage instead of rolling, but takes psychic damage
[reskin] authored row numbers: "The Oath's Silence" — the call declared 1 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"The Oath's Silence" ("The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he take [authored: the catalog held no shape for it]")
[reskin] weapons answered: Mace = mace; Crossbow = crossbow
[reskin] weapon dice follow the weapon: the GM's "Mace" is a mace (d6) — "22 (4d8 + 4)" becomes "21 (5d6 + 4)"
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon multiattack: "the warder makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon saves: proficient in STR, DEX, CON, WIS — the Gladiator's own set, at this sheet's stats and PB 3 (changed DEX, WIS)
[reskin] print canon skills: "Athletics +7, Perception +4" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] print canon row: Reactions/Parry — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Mace" instead
[reskin] dead name still carried — "Shield Bash" names a row that is still on the sheet; no sweep
[reskin] final price: print's Multiattack: the round ran 63 against the card's 45 — the attack rows re-solve at 75% (3 attacks off one row after a supersede)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "The Oath's Silence" [no template]
[reskin] lint fixed: damage-type-caps — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element expressed: The Oath's Silence carries "a mace swung without a single prayer behind it" — "the warder can deal maximum damage instead of rolling, but takes Psychic damage "
[reskin] audit: [The Oath's Silence: The ability leaves the exchang… takes Psychic damage equal to the damage dealt")]
[reskin] audit defect: Traits/"The Oath's Silence" [model-written] medium open_ended — The ability leaves the exchange's timing and trigger ambiguous — it is not clear whether the choice is made before or after the attack roll, so a GM cannot say when the Psychic cost is locked in relative to a miss. — Anchor the choice to the moment of the hit: state whether the warder chooses to maximize before rolling or opts in only after the attack roll hits. (about: "the warder can deal maximum damage instead of rolling, but takes Psychic damage equal to the damage dealt")
[reskin] clause unresolved: "The Oath's Silence" carries "When he hits with a Mace attack, he can choose to deal m", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] [gap] halts the movement of any creature that moves within the creature's reach, zeroing its Speed — "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have its Speed reduced to 0 until the end of that turn, as he steps into its path and cracks the offending limb." — Oathbroken Warder [seat: action [reaction/on_being_hit/movement]] (closest offered: riposte) [effect: movement] [menu: riposte answering-strike] [same-cell unoffered: none] [same-seat rejected: ward-retaliation:requires-style snap-shot:host-row interpose:requires-style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Oathbroken Warder" — donor defender-5, CR 6
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 28-ilvareth-dusksong

**Typed:** `name: Ilvareth Dusksong | An elf archmage who bends shadow and steps between places.`

**signature elements:** stepping between places through shadow [behavior] | a body of living shadow that bends light [body] | the archmage's spell list and abjurations [object]

**identity:** Ilvareth opens the fight by stepping through a shadow and vanishing from where his enemies last saw him, then hammers them with shadow conjurations and force blasts from the dark. Every round he repositions by plunging into one shadow and erupting from another, layering abjurations and misdirection so the party fights a silhouette rather than an elf, and he never stands still long enough to be pinned down. He is a centuries-old archmage and toys with his prey, saving his exit — a step through a shadow to somewhere far away — for the moment he is bloodied, preferring to flee and return prepared than to die for pride.

**lore:** Ilvareth Dusksong is a disgraced archmage of an elven queen's old court who traded his name for the shadow roads between places, and now he walks those roads as a thief of spells and a hunter of anyone who carries a secret worth stealing.

### The sheet

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

Magic Resistance.Ilvareth has advantage on saving throws against spells and other magical effects.
Misty Step (3/Day) (Bonus Action).Ilvareth casts Misty Step, using the same spellcasting ability as Spellcasting.
Protective Magic (3/Day) (Reaction).When Ilvareth is hit by an attack roll, Ilvareth casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Actions
Multiattack: Ilvareth makes four Arcane Burst attacks. It can replace one attack with a use of Dusksong Shroud.
Arcane Burst: Melee or Ranged Spell Attack: +9 to hit, reach 5 ft. or range 150 ft., one target. Hit: 27 (4d10 + 5) force damage.
Spellcasting: Ilvareth casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 17): - At will: Detect Magic, Detect Thoughts, Disguise Self, Invisibility, Light, Mage Armor, Mage Hand, Prestidigitation
2/day each: Fly, Lightning Bolt
1/day each: Cone of Cold, Mind Blank, Scrying, Teleport
Dusksong Shroud: One creature within 30 feet of Ilvareth must succeed on a DC 17 Dexterity saving throw or be restrained until the end of its next turn.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Oathbroken Warder: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 27 taken name(s) the recording carried
[path] class_npc — class mage — "archmage" (call)
[route] caster (artillery) type=Humanoid mechanics=teleport — casts: on the GM's own words "An elf archmage who bends shadow and ste" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("An elf archmage who bends shadow") | caster: no line key in the words — the model's read of its quote
[concept] name: "Ilvareth Dusksong" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/uncanny mind=sapient style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: provided "Ilvareth Dusksong"
[concept] mechanics: teleport
[concept] signature elements: stepping between places through shadow [behavior] | a body of living shadow that bends light [body] | the archmage's spell list and abjurations [object]
[concept] identity: Ilvareth opens the fight by stepping through a shadow and vanishing from where his enemies last saw him, then hammers them with shadow conjurations and force blasts from the dark. Every round he repositions by plunging into one shadow and erupting from another, layering abjurations and misdirection so the party fights a silhouette rather than an elf, and he never stands still long enough to be pinned down. He is a centuries-old archmage and toys with his prey, saving his exit — a step through a shadow to somewhere far away — for the moment he is bloodied, preferring to flee and return prepared than to die for pride.
[concept] lore: Ilvareth Dusksong is a disgraced archmage of an elven queen's old court who traded his name for the shadow roads between places, and now he walks those roads as a thief of spells and a hunter of anyone who carries a secret worth stealing.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Archmage — the class's own print block, nearest CR 12
[reskin] print canon defenses: HP 168 -> 170, AC 16 -> 17 — the Archmage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 10, DEX 14, CON 12, INT 20, WIS 15, CHA 16 — the Archmage's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: caster-12 -> CR 12
[reskin] seats: action <- "stepping between places through shadow" | trait <- "a body of living shadow that bends light"
[reskin] [path] decides: class_npc on the Archmage · class mage (the matcher would have said twist Archmage)
[reskin] print canon: "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." heads on the Archmage — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — "Force Blade" deals Force on a Humanoid whose concept names no Force — a name is not a warrant; use a physical type
[reskin] class kit: Protective Magic — the sheet already carries it, so the mage kit adopts that row: the cap may no longer read it as filler
[reskin] class kit: mage — "archmage": Misty Step (3/Day) (Mage/Misty Step)
[reskin] proper noun: "Ilvareth Dusksong" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Ilvareth" — the call's own answer (person), built from the name
[reskin] inline form: "Ilvareth" — the model's own reading of the name
[reskin] energy dropped — no rider slot: "Force Blade" is a longsword and the blow must be Slashing, but this row has no rider slot to carry Force; the energy is lost rather than re-split by hand
[reskin] spell DC coherence: DC 18 -> 17 off Intelligence 20 (print's array stays)
[reskin] save dc derived: DC 18 -> 17 (8 + PB 4 + Intelligence's 5) — no stat on the sheet reached it
[reskin] the sheet's declared ask: teleport — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "bends shadow and steps between places" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "bends shadow and steps between places" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Ilvareth Dusksong — An elf archmage" -> has (descriptive), head | "bends shadow and steps between places" -> has (mechanical) [asked: at_will/at_will/movement] [askMechanic: teleport]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Ilvareth hurls a blot of living shadow at a point he can see, and it s" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Ilvareth's body is a shell of woven dusk; when he is in dim light or d" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 35 of 35 answered; not true of this body: gaze-single, snare, seal, wail, active-toll, random-ray, spew, snare-bolt, herd, drain, blighted-ground, rally, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Ilvareth hurls a blot of living shadow at a point he can see, and it spreads into a clinging pool of darkness. Each creature in that shadow must succeed on a Dexterity saving throw or be Restrained until it uses its action to tear free, and while the pool persists Ilvareth can step into it as though it were a shadow road, emerging from any other shadow within the same pool." [action/save/condition] [family: zone] — menu: thrown-burst, zone, execute, lure, ground-burst, pacify, escalating-dread, slow-bolt, sensory-strike, thrown-burst-seed, curse-debt, zone-seed, reveal, wind-up, terror-pulse, disarm, push-prone (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, phase-slip, blink, focus, feint-slip, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), pacify (save/condition), escalating-dread (save/condition)
[reskin] keys would have bound: action — phase-slip (step, shadow)
[reskin] classification handed to the fit call: mechanic=teleport
[reskin] word match declined by the call: lure, pacify, escalating-dread, sensory-strike, reveal, terror-pulse, push-prone, thrown-burst, execute, ground-burst, slow-bolt, thrown-burst-seed, curse-debt, wind-up, disarm — the key word does not mean the mechanic here
[reskin] closest refused: action — "zone" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: creates a shadow pool where the caster can teleport between shadows wi)
[reskin] seat answered, but: the call said "Ilvareth hurls a blot of living shadow at a point he can see, and it spreads into a clinging pool of darkness. Each crea" is carried by "Dusksong Shroud", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("creates a shadow pool where the caster can teleport between shadows wi") and wrote an action instead: "Dusksong Shroud" -> Actions. *Dexterity Saving Throw*: DC 17, one creature within 30 feet. *Failure:* The target has the Restrained condition until t
[reskin] authored row numbers: "Dusksong Shroud" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Dusksong Shroud" is HANDED "Ilvareth Dusksong — An elf" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Dusksong Shroud" ("Ilvareth hurls a blot of living shadow at a point he can see, and it spreads into a clinging pool of darkness. Each creature in that shadow must succeed on a De [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Ilvareth's body is a shell of woven dusk; when he is in dim light or darkness, his form blurs and shifts at the edges, and any creature that tries to track or target him by sight has its aim stolen by the bending shadow. He can use his Misty Step into or out of any area of dim light or darkness even if it is not a shadow he has previously seen." [trait/always/defense] [family: breach] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, blurred-form, evasion, guarded-stance
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), shielded-mind (always/defense)
[reskin] classification handed to the fit call: mechanic=teleport
[reskin] closest refused: trait — "blurred-form" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: lets the creature step from dim light or darkness to another such area)
[reskin] seat answered, but: the call said "Ilvareth's body is a shell of woven dusk; when he is in dim light or darkness, his form blurs and shifts at the edges, a" is carried by "Shadowmeld Step", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("lets the creature step from dim light or darkness to another such area") and wrote a trait instead: "Shadowmeld Step" -> Traits. While Ilvareth is in dim light or darkness, attack rolls against Ilvareth are made with disadvantage, and when Ilvareth 
[reskin] authored row numbers: "Shadowmeld Step" — the call declared 1 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Shadowmeld Step" ("Ilvareth's body is a shell of woven dusk; when he is in dim light or darkness, his form blurs and shifts at the edges, and any creature that tries to track or t [authored: the catalog held no shape for it]")
[reskin] weapons answered: Force Blade = none
[reskin] weapon declined: "Force Blade" reads longsword from its name, but the call answered none — the row carries no weapon
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Archmage's own type stands
[reskin] print canon alignment: Neutral Evil -> Neutral — the Archmage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Elvish, Undercommon" -> "Common plus five other languages, Elvish, Undercommon" — the Archmage's plus the concept's Elvish, Undercommon
[reskin] print canon attack: "Force Blade" -> "Arcane Burst" — the Archmage's own row
[reskin] print canon skills: "Arcana +9, Perception +6" -> "Arcana +13, History +9, Perception +6" — the Archmage's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities none -> Psychic; Charmed (with Mind Blank) — the Archmage's own header lines
[reskin] print canon trait: Magic Resistance — "Ilvareth Dusksong — An elf archmage who bends shadow and steps between places." is the Archmage (print's own row)
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] multiattack replacement clause: It can replace one attack with a use of Dusksong Shroud.
[reskin] free row over budget: Traits/"Shadowmeld Step" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Dusksong Shroud" [no template]
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 16" -> "Passive Perception 16")
[reskin] ask vs row MISMATCH: "bends shadow and steps between places" -> "Misty Step" — limit: asked at_will, row reads per_day
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Dusksong Shroud" claims "stepping between places through shadow" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Dusksong Shroud")
[reskin] audit: [Dusksong Shroud: The signature shadow effect's nam…ained condition until the end of its next turn.")]
[reskin] audit defect: Actions/"Dusksong Shroud" [model-written] high other (the audit said "undelivered") — The signature shadow effect's name and ask promise slipping through shadow between places, but the rules only pin one target in place with no movement, teleport, or shadow-walking clause, so the written-for-the-ask row delivers the opposite of the requested fantasy. — Rework the row so its rules include a shadow-step or concealment/movement element that expresses stepping between places, and rename it if the effect no longer restrains. (about: "The target has the Restrained condition until the end of its next turn.")
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "archmage" which is not a whole clause — the seat surgery cut it; resolved to cl_176teih
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Ilvareth Dusksong" — donor caster-12, CR 12
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 9 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 29-swarm-of-funeral-bells

**Typed:** `a swarm of funeral bells that ring themselves over the dying`

**signature elements:** ringing over the dying [behavior] | chorus of self-tolling funeral bells [body] | funeral knell that hastens death [aura]

**identity:** The swarm does not pursue; it gathers over the dying and rings them into death, a chorus of funeral bells that peals louder as a victim's heart slows. Each round it drifts within reach and tolls as one — a necrotic knell that deafens, frightens, and hastens the end — while it shifts to keep the dying at its center and never willingly leaves a body still warm. It is patient, ceremonial, and cruel: it withdraws only when no life remains within its sound, and even then it lingers over the corpse, tolling the final rites.

**lore:** These are the bells left un-rung at unmarked graves, gathering where the dying lie unshriven; they ring not to mourn but to collect the last breath as their due.

### The sheet

```
Swarm of Funeral Bells

Medium Swarm of Tiny Undead, Neutral Evil

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
15
+2
+2
MOD
SAVE
DEX
20
+5
+5
WIS
20
+5
+5
MOD
SAVE
CON
18
+4
+4
CHA
20
+5
+5

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 15

Languages Common plus the languages it knew in life

CR 13 (XP 10,000; PB +5)

Traits

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Tolling attacks. It can replace one attack with a use of Over the Dying.

Tolling. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Over the Dying. Wisdom Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

Reactions

Knellsong. Trigger: A creature within the swarm's reach drops to 0 Hit Points. Response—Wisdom Saving Throw: DC 17, each other creature of the swarm's choice within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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

<details><summary>trace</summary>

```
[harness] restored 28 taken name(s) the recording carried
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Undead mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a swarm of funeral bells that ring thems…" is the description, not a name
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: ringing over the dying [behavior] | chorus of self-tolling funeral bells [body] | funeral knell that hastens death [aura]
[concept] identity: The swarm does not pursue; it gathers over the dying and rings them into death, a chorus of funeral bells that peals louder as a victim's heart slows. Each round it drifts within reach and tolls as one — a necrotic knell that deafens, frightens, and hastens the end — while it shifts to keep the dying at its center and never willingly leaves a body still warm. It is patient, ceremonial, and cruel: it withdraws only when no life remains within its sound, and even then it lingers over the corpse, tolling the final rites.
[concept] lore: These are the bells left un-rung at unmarked graves, gathering where the dying lie unshriven; they ring not to mourn but to collect the last breath as their due.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] mind tier: INT 4 -> 15 — the call read this creature as capable at CR 13
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: CHA 2 -> 20 — the call read this creature as formidable at CR 13
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] seats: action <- "ringing over the dying" | trait <- "chorus of self-tolling funeral bells"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Unrung Knell" -> "Swarm of funeral bells" — the route call named the many; print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Undead -> Swarm of Tiny Undead
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the knell" (kind), which the name does not support
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (mechanical) [asked: save_single] [askMechanic: dazzle]
[reskin] open asks handed to the idea call: "ring themselves over the dying" [dazzle]
[reskin] idea anchored: action — "The swarm rings a single, terrible knell at one creature it can see wi" answers the GM's "ring themselves over the dying"
[reskin] idea unanchored: trait — "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 40 of 40 answered; not true of this body: gaze-single, snare, seal, shield-bash, random-ray, spew, snare-bolt, zone-seed, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider
[reskin] menu: taste stands down — action answers the GM's "ring themselves over the dying", so role and style do not filter the menu (legality still does); 6 template(s) offered
[reskin] menu pruned: action — pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, push-prone, curse-debt, reveal, wind-up, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm rings a single, terrible knell at one creature it can see within range. That creature must make a Wisdom saving throw; on a failure, it is Frightened and Deafened by the tolling for the duration, hearing the bells over its own slowing heartbeat and unable to tell which way the swarm drifts." [action/save/condition] [family: mark] — menu: thrown-burst, execute, wail, lure, active-toll, ground-burst (+ shelf: patient-defense, second-wind, lay-on-hands, riposte, answering-strike, stunning-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] lead by this seat's own clause: action — "dazzle" from the clause this seat serves, not the sheet's "curse"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), thrown-burst (save/damage), execute (save/damage)
[reskin] keys would have bound: action — active-toll (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: active-toll, ground-burst, thrown-burst, execute, wail — the key word does not mean the mechanic here
[reskin] closest refused: action — "lure" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: imposes the Frightened and Deafened conditions on one target within ra)
[reskin] authored row answers the GM: action — "Over the Dying" was written for "ring themselves over the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("imposes the Frightened and Deafened conditions on one target within ra") and wrote an action instead: "Over the Dying" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Over the Dying" — the call declared (unanswered) number(s) promised
[reskin] value check: "Over the Dying" EV 49.5 vs floor 23.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Over the Dying" ("The swarm rings a single, terrible knell at one creature it can see within range. That creature must make a Wisdom saving throw; on a failure, it is Frightened  [authored: the catalog held no shape for it]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, pounce, isolation, life-drain, charge (+ shelf: resonant-body, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), pounce (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: trait — resonant-body (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: stunning-strike, pounce, life-drain, composed:payoff:condition, charge-push, isolation, charge, resonant-body — the key word does not mean the mechanic here
[reskin] closest refused: trait — "resonant-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers when another creature drops to 0 HP in reach, sapping bystand)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (refused: "Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine re); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Knellsong", and no such row is on this sheet — the clause stays open
[reskin] reaction damage set aside: "Knellsong" — the call set damage on this Reaction's save, and a Reaction's damage is not counted by the sheet's CR read, so the save keeps its Frightened condition and deals none (owner's hold, 2026-11-18)
[reskin] seat authored the row: trait — the call refused every template for no_fit ("triggers when another creature drops to 0 HP in reach, sapping bystand") and wrote a trait instead: "Knellsong" -> Reactions. *Trigger:* A creature within the swarm's reach drops to 0 Hit Points. *Response—Wisdom Saving Throw:* DC 17, each other 
[reskin] authored row numbers: "Knellsong" — the call declared 3 number(s) promised
[reskin] seat landed on the second try: trait — "Knellsong" after ""Final Rite" — a trait is not a save — the save form takes stat, target and effe"
[reskin] free signature row: "Knellsong" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Knellsong" ("Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choi [authored: the catalog held no shape for it]")
[reskin] weapons answered: Tolling = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Over the Dying.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 3 fixed row(s), so the free-row budget is 2 rather than 1 — the card is thin and can afford more
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 2) — "Knellsong" [no template]
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element expressed: Knellsong carries "ringing over the dying" — "A creature within the swarm's reach drops to 0 Hit Points."
[reskin] audit: [Over the Dying: The entry's name and fiction promi…tened condition until the end of its next turn.")]
[reskin] audit rename blocked — "Over the Dying" -> "Dirge of the Dying" would drop the GM's own word "over"
[reskin] clause unresolved: "Knellsong" carries "Whenever a creature within the swarm's reach drops to 0 ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 29-swarm-of-funeral-bells

**Typed:** `a swarm of funeral bells that ring themselves over the dying`

**signature elements:** ringing over the dying [behavior] | chorus of self-tolling funeral bells [body] | funeral knell that hastens death [aura]

**identity:** The swarm does not pursue; it gathers over the dying and rings them into death, a chorus of funeral bells that peals louder as a victim's heart slows. Each round it drifts within reach and tolls as one — a necrotic knell that deafens, frightens, and hastens the end — while it shifts to keep the dying at its center and never willingly leaves a body still warm. It is patient, ceremonial, and cruel: it withdraws only when no life remains within its sound, and even then it lingers over the corpse, tolling the final rites.

**lore:** These are the bells left un-rung at unmarked graves, gathering where the dying lie unshriven; they ring not to mourn but to collect the last breath as their due.

### The sheet

```
Swarm of Funeral Bells

Medium Swarm of Tiny Undead, Neutral Evil

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
15
+2
+2
MOD
SAVE
DEX
20
+5
+5
WIS
20
+5
+5
MOD
SAVE
CON
18
+4
+4
CHA
20
+5
+5

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 15

Languages Common plus the languages it knew in life

CR 13 (XP 10,000; PB +5)

Traits

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Tolling attacks. It can replace one attack with a use of Over the Dying.

Tolling. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Over the Dying. Wisdom Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

Reactions

Death Knell. Trigger: A creature within the swarm's reach drops to 0 Hit Points. Response—Wisdom Saving Throw: DC 17, each other creature of the swarm's choice within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Ilvareth Dusksong: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 28 taken name(s) the recording carried
[path] homebrew — "a swarm of funeral bells that ring themselves over the dying" (call)
[route] swarm type=Undead mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: on the GM's own words "a swarm of funeral bells" | swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a swarm of funeral bells that ring thems…" is the description, not a name
[concept] hints: swarm→body ✓ ("a swarm of funeral bells")
[concept] resolve: archetype=swarm type=Undead typeFrom=the route call themes=grave/voice mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: ringing over the dying [behavior] | chorus of self-tolling funeral bells [body] | funeral knell that hastens death [aura]
[concept] identity: The swarm does not pursue; it gathers over the dying and rings them into death, a chorus of funeral bells that peals louder as a victim's heart slows. Each round it drifts within reach and tolls as one — a necrotic knell that deafens, frightens, and hastens the end — while it shifts to keep the dying at its center and never willingly leaves a body still warm. It is patient, ceremonial, and cruel: it withdraws only when no life remains within its sound, and even then it lingers over the corpse, tolling the final rites.
[concept] lore: These are the bells left un-rung at unmarked graves, gathering where the dying lie unshriven; they ring not to mourn but to collect the last breath as their due.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] mind tier: INT 4 -> 15 — the call read this creature as capable at CR 13
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 13
[reskin] mind tier: CHA 2 -> 20 — the call read this creature as formidable at CR 13
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] seats: action <- "ringing over the dying" | trait <- "chorus of self-tolling funeral bells"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] swarm name stamped: "Unrung Knell" -> "Swarm of funeral bells" — the route call named the many; print names all seven of its swarms "Swarm of X", and the rules text says "the swarm"
[reskin] swarm type stamped: Undead -> Swarm of Tiny Undead
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the swarm" — the call answered "the knell" (kind), which the name does not support
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (mechanical) [asked: save_single] [askMechanic: dazzle]
[reskin] open asks handed to the idea call: "ring themselves over the dying" [dazzle]
[reskin] idea anchored: action — "The swarm rings a single, terrible knell at one creature it can see wi" answers the GM's "ring themselves over the dying"
[reskin] idea unanchored: trait — "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 40 of 40 answered; not true of this body: gaze-single, snare, seal, shield-bash, random-ray, spew, snare-bolt, zone-seed, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider
[reskin] menu: taste stands down — action answers the GM's "ring themselves over the dying", so role and style do not filter the menu (legality still does); 6 template(s) offered
[reskin] menu pruned: action — pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, push-prone, curse-debt, reveal, wind-up, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] signature idea (action): "The swarm rings a single, terrible knell at one creature it can see within range. That creature must make a Wisdom saving throw; on a failure, it is Frightened and Deafened by the tolling for the duration, hearing the bells over its own slowing heartbeat and unable to tell which way the swarm drifts." [action/save/condition] [family: mark] — menu: thrown-burst, execute, wail, lure, active-toll, ground-burst (+ shelf: patient-defense, second-wind, lay-on-hands, riposte, answering-strike, stunning-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] lead by this seat's own clause: action — "dazzle" from the clause this seat serves, not the sheet's "curse"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), thrown-burst (save/damage), execute (save/damage)
[reskin] keys would have bound: action — active-toll (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: active-toll, ground-burst, thrown-burst, execute, wail — the key word does not mean the mechanic here
[reskin] closest refused: action — "lure" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: imposes the Frightened and Deafened conditions on one target within ra)
[reskin] authored row answers the GM: action — "Over the Dying" was written for "ring themselves over the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("imposes the Frightened and Deafened conditions on one target within ra") and wrote an action instead: "Over the Dying" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Over the Dying" — the call declared (unanswered) number(s) promised
[reskin] value check: "Over the Dying" EV 49.5 vs floor 23.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Over the Dying" ("The swarm rings a single, terrible knell at one creature it can see within range. That creature must make a Wisdom saving throw; on a failure, it is Frightened  [authored: the catalog held no shape for it]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, pounce, isolation, life-drain, charge (+ shelf: resonant-body, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), pounce (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: trait — resonant-body (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: stunning-strike, pounce, life-drain, composed:payoff:condition, charge-push, isolation, charge, resonant-body — the key word does not mean the mechanic here
[reskin] closest refused: trait — "resonant-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers when another creature drops to 0 HP in reach, sapping bystand)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (refused: "Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine re); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Knellsong", and no such row is on this sheet — the clause stays open
[reskin] reaction damage set aside: "Knellsong" — the call set damage on this Reaction's save, and a Reaction's damage is not counted by the sheet's CR read, so the save keeps its Frightened condition and deals none (owner's hold, 2026-11-18)
[reskin] seat authored the row: trait — the call refused every template for no_fit ("triggers when another creature drops to 0 HP in reach, sapping bystand") and wrote a trait instead: "Knellsong" -> Reactions. *Trigger:* A creature within the swarm's reach drops to 0 Hit Points. *Response—Wisdom Saving Throw:* DC 17, each other 
[reskin] authored row numbers: "Knellsong" — the call declared 3 number(s) promised
[reskin] seat landed on the second try: trait — "Knellsong" after ""Final Rite" — a trait is not a save — the save form takes stat, target and effe"
[reskin] free signature row: "Knellsong" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Knellsong" ("Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choi [authored: the catalog held no shape for it]")
[reskin] weapons answered: Tolling = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Over the Dying.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 3 fixed row(s), so the free-row budget is 2 rather than 1 — the card is thin and can afford more
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 2) — "Knellsong" [no template]
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Knellsong carries "ringing over the dying" — "A creature within the swarm's reach drops to 0 Hit Points"
[reskin] audit: [Over the Dying: The signature 'ring over the dying…tened condition until the end of its next turn."), Over the Dying: Frightened's only escape is a save…tened condition until the end of its next turn."), Knellsong: The trigger references 'the swarm's rea…within the swarm's reach drops to 0 Hit Points."), Knellsong: Knellsong is the reaction written to ex…r creature of the swarm's choice within 30 feet")]
[reskin] audit rename: "Knellsong" -> "Death Knell"
[reskin] audit defect: Actions/"Over the Dying" [model-written] medium weak — The signature 'ring over the dying' action payloads a one-round Frightened on a Cone, which costs an attack from Multiattack and delivers nothing the creature's own fear-immune, already-frightened-by-Tolling targets will feel as a threat. — Give Over the Dying teeth: a rider tied to downed or dying creatures in the area rather than a plain repeat of the Frightened the reaction already hands out. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] audit defect: Actions/"Over the Dying" [model-written] low open_ended — Frightened's only escape is a save at the end of each turn outside the source's line of sight, but the swarm can follow a fleeing target freely with hover fly, so the imposed state in practice has no rules-legal break the entry provides. — Pair the Frightened with a concrete break clause or duration the target controls, or attach it to a condition that carries its own exit. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] clause unresolved: "Death Knell" carries "Whenever a creature within the swarm's reach drops to 0 ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 30-reliquary-vault-ooze

**Typed:** `a cathedral-vault ooze that digests reliquaries`

**signature elements:** dissolving reliquaries into its rot [behavior] | cathedral-vault sac of consecrated rot [body] | the swallowed shrines and gilt bones drifting inside it [object]

**identity:** A vast sacral ooze pools in the nave's shadow, waiting for the taste of gilt and saint-bone before it flows forward to fold reliquaries and their guardians into its gelatinous mass. Each round it engulfs again, drawing shrines and precious metal up into its body where rot-soaked acid strips gold from bone, and it pauses only to spindle pseudopods toward anything still shining. It is patient and single-minded: it does not retreat from the wounded, it simply keeps swallowing whatever gleams until the vault is bare.

**lore:** It seeped up from the crypts beneath a ruined cathedral, a spill of consecrated rot that learned the taste of relics and now haunts the vault it emptied, hungering for every holy thing still sealed in stone.

### The sheet

```
Reliquary Vault Ooze
Huge ooze, unaligned
Armor Class

10 (natural armor)

Hit Points: 

161 (17d12 + 51)

Speed: 

20 ft., climb 20 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

6 (-2)

	

16 (+3)

	

2 (-4)

	

15 (+2)

	

10 (+0)

Damage Immunities: 

acid, necrotic

Condition Immunities: 

charmed, deafened, exhaustion, frightened, grappled, prone, restrained

Senses: 

blindsight 60 ft. (blind beyond this radius), passive Perception 12

Languages: 

None

Challenge

9 (5,000 XP)

Proficiency Bonus:

+4

Consecrated Rot.When a creature begins its turn grappled by the vault ooze or standing within the vault ooze's space, the rot eats at the creature's consecrated flesh and bone, dealing 14 (4d6) necrotic damage.
Amorphous.The vault ooze can move through a space as narrow as 1 inch wide without squeezing.
Corrosive Form.A creature that touches the vault ooze or hits it with a melee attack while within 5 feet of it takes 9 (2d8) necrotic damage.
Spider Climb.The vault ooze can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Actions
Multiattack: The vault ooze makes two Pseudopod attacks. It can replace one attack with a use of Reliquary Engulf.
Pseudopod: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 28 (7d6 + 4) necrotic damage.
Reliquary Engulf: One creature within 10 feet must succeed on a DC 15 Strength saving throw or be pulled up to 10 feet straight toward the vault ooze and be grappled (escape DC 16).
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Swarm of Funeral Bells: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 29 taken name(s) the recording carried
[path] homebrew — "a cathedral-vault ooze that digests reliquaries" (call)
[route] ooze type=Ooze mechanics=none — casts: the call reads no worked magic here | hold_shape: contain on the GM's own words "cathedral-vault ooze that digests reliqu" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | ooze: ✓ ("cathedral-vault ooze") | ooze: no line key in the words — the model's read of its quote
[concept] hints: ooze→body ✓ ("a cathedral-vault ooze") | engulf→mechanics ✓ ("digests reliquaries")
[concept] resolve: archetype=ooze type=Ooze typeFrom=the route call themes=grave/devouring mind=mindless style=— energy=Necrotic mix=energy identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: dissolving reliquaries into its rot [behavior] | cathedral-vault sac of consecrated rot [body] | the swallowed shrines and gilt bones drifting inside it [object]
[concept] identity: A vast sacral ooze pools in the nave's shadow, waiting for the taste of gilt and saint-bone before it flows forward to fold reliquaries and their guardians into its gelatinous mass. Each round it engulfs again, drawing shrines and precious metal up into its body where rot-soaked acid strips gold from bone, and it pauses only to spindle pseudopods toward anything still shining. It is patient and single-minded: it does not retreat from the wounded, it simply keeps swallowing whatever gleams until the vault is bare.
[concept] lore: It seeped up from the crypts beneath a ruined cathedral, a spill of consecrated rot that learned the taste of relics and now haunts the vault it emptied, hungering for every holy thing still sealed in stone.
[reskin] body type: ooze — the body outranks the role (recorded: ooze)
[reskin] mind tier held: INT stays 2 against "feeble" — the call read this creature as mindless, and the card's 2 is already that dim
[reskin] mind tier: WIS 8 -> 15 — the call read this creature as capable at CR 9
[reskin] mind tier: CHA 1 -> 10 — the call read this creature as ordinary at CR 9
[reskin] donor: ooze-9 -> CR 9 (invented — no printed peer)
[reskin] row gated out: Engulf (engulf) — the concept did not claim this mechanic
[reskin] seats: action <- "dissolving reliquaries into its rot" | trait <- "cathedral-vault sac of consecrated rot"
[reskin] [path] decides: homebrew (the matcher would have said twist Gray Ooze)
[reskin] repair round 1: 1 defect(s) — "Pseudopod" deals Acid but this creature's energy is Necrotic — use Necrotic or a physical type
[reskin] alignment by body: Neutral -> Unaligned — a Ooze at INT 2 (print: Oozes 4/4 Unaligned; every Construct at INT 3 or less, 7/7; the first aligned one is the Flesh Golem at INT 6)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the vault ooze" — the call's own answer (kind), built from the name
[reskin] inline form: "the vault ooze" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 15 (8 + PB 4 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: swallow — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a cathedral-vault ooze" -> has (mechanical) [asked: attack] | "digests reliquaries" -> has (mechanical) [asked: attack]
[reskin] open asks handed to the idea call: "a cathedral-vault ooze" · "digests reliquaries"
[reskin] idea anchored: action — "The vault ooze rears and engulfs a reliquary or similar sacred object " answers the GM's "digests reliquaries"
[reskin] idea unanchored: trait — "Consecrated rot. Sacred objects left within the vault ooze's body are " names none of the 2 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, seal, shield-bash, wail, active-toll, random-ray, spew, snare-bolt, herd, blink, shell-withdraw, rally, phase-slip, false-appearance, absorption, bloodied-burst, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, mimicry, gaze-aura, blurred-form, death-burst, hook-rider
[reskin] menu: taste stands down — action answers the GM's "digests reliquaries", so role and style do not filter the menu (legality still does); 7 template(s) offered
[reskin] menu pruned: action — pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, push-prone, thrown-burst-seed, drain, zone-seed, wind-up, blighted-ground, disarm, curse-debt, reveal, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating (the sheet cannot render them)
[reskin] signature idea (action): "The vault ooze rears and engulfs a reliquary or similar sacred object it can see within reach, folding it inside its gelatinous mass. Any creature holding or wearing that object is pulled along with it unless it succeeds on a Strength saving throw, ending up Grappled and pulled into the ooze's space." [action/save/condition] [family: drag] — menu: trample, leap, thrown-burst, execute, lure, pull-through, ground-burst (+ shelf: rampage, patient-defense, second-wind, lay-on-hands, riposte, stunning-strike, charge-push, pounce, isolation, life-drain, charge)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), trample (save/damage), leap (save/damage)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: lure, trample, leap, thrown-burst, execute, ground-burst — the key word does not mean the mechanic here
[reskin] closest refused: action — "pull-through" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: pulls the holder into the ooze's space and grapples them rather than d)
[reskin] authored row answers the GM: action — "Reliquary Engulf" was written for "digests reliquaries", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("pulls the holder into the ooze's space and grapples them rather than d") and wrote an action instead: "Reliquary Engulf" -> Actions. *Strength Saving Throw*: DC 15, one creature within 10 feet. *Failure:* The target is pulled up to 10 feet straight towa
[reskin] authored row numbers: "Reliquary Engulf" — the call declared (unanswered) number(s) promised
[reskin] value check: "Reliquary Engulf" EV 14.9 vs floor 14 (one attack of 2) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Reliquary Engulf" ("The vault ooze rears and engulfs a reliquary or similar sacred object it can see within reach, folding it inside its gelatinous mass. Any creature holding or we [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Consecrated rot. Sacred objects left within the vault ooze's body are slowly stripped of their holiness; a creature that begins its turn Grappled by the ooze or standing within the ooze's space takes Necrotic damage as the rot eats at consecrated flesh and bone alike." [trait/start_of_turn/damage] [family: zone] — menu: adhesive, phobia, terrain-walk, aberrant-ground, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, warded-mending, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:damage (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does damage; leading: composed:zone:damage (start_of_turn/damage), noxious-aura (start_of_turn/condition), warded-mending (start_of_turn/resource)
[reskin] keys would have bound: trait — aberrant-ground (ooze)
[reskin] classification handed to the fit call: shape=attack
[reskin] closest refused: trait — "composed:zone:damage" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: damages creatures grappled by it or sharing its space, not just those )
[reskin] seat answered, but: the call said "Consecrated rot. Sacred objects left within the vault ooze's body are slowly stripped of their holiness; a creature that" is carried by "Consecrated Rot", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("damages creatures grappled by it or sharing its space, not just those ") and wrote a trait instead: "Consecrated Rot" -> Traits. When a creature begins its turn Grappled by the vault ooze or standing within the vault ooze's space, the rot eats at th
[reskin] authored row numbers: "Consecrated Rot" — the call declared 1 number(s) promised
[reskin] free signature row: "Consecrated Rot" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Consecrated Rot" ("Consecrated rot. Sacred objects left within the vault ooze's body are slowly stripped of their holiness; a creature that begins its turn Grappled by the ooze or [authored: the catalog held no shape for it]")
[reskin] weapons answered: Pseudopod = none
[reskin] speed by concept: dropped Climb 20 ft. — the concept's movement set decides
[reskin] climb speed: Climb 20 ft. — a creature that climbs difficult surfaces has a Climb Speed in print (the Vampire, the Giant Spider)
[reskin] languages held: None stands — INT 2 on a Ooze speaks nothing, whatever the mind read said
[reskin] element immunity: Necrotic (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid, Necrotic; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] name-canon stands down: the path answered homebrew on "a cathedral-vault ooze that digests reli" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Reliquary Engulf.
[reskin] free-row budget by card size: CR 9 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Consecrated Rot" [no template]
[reskin] lint: type-damage-affinity: Traits/Consecrated Rot: Necrotic damage on Ooze — no official Ooze deals Necrotic; re-theme the damage to the creature's substance (or the type itself is wrong) | type-damage-affinity: Traits/Corrosive Form: Necrotic damage on Ooze — no official Ooze deals Necrotic; re-theme the damage to the creature's substance (or the type itself is wrong) | type-damage-affinity: Actions/Pseudopod: Necrotic damage on Ooze — no official Ooze deals Necrotic; re-theme the damage to the creature's substance (or the type itself is wrong)
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Consecrated Rot carries "dissolving reliquaries into its rot" — "the rot eats at the creature's consecrated flesh and bone, dealing 14 (4d6) Necr"
[reskin] audit: [Reliquary Engulf: Grappling a target imposes the G…rget has the Grappled condition (escape DC 15).")]
[reskin] audit defect: Actions/"Reliquary Engulf" [model-written] medium other — Grappling a target imposes the Grappled condition on the ooze too, but the vault ooze is immune to Grappled, so the state cannot be tracked on the creature that applies it. — Rewrite the success clause so the ooze is not itself subjected to Grappled (e.g. targets captured within its space rather than ordinary grappling), keeping the escape DC. (about: "the target has the Grappled condition (escape DC 15).")
[reskin] clause unresolved: "Consecrated Rot" carries "Consecrated rot. Sacred objects left within the vault oo", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] size floor: STR 16 -> 18 — print prints no corporeal Huge body under 18 (the Archelon); the attack follows it, as print's own 49 do
[reskin] escape dc: Reliquary Engulf → DC 16 (8 + PB + STR; a late row wore another number)
[reskin] done: "Reliquary Vault Ooze" — donor ooze-9, CR 9
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 31-thunderwall-drake

**Typed:** `a young storm drake whose breath is a rolling wall of thunder`

**signature elements:** rolling wall of thunder breath [behavior] | storm-charged drake hide and wings [body] | thunderous wingbeat [aura]

**identity:** The storm drake opens with a rolling wall of thunder exhaled low and wide, flattening the field and deafening anything it does not pulp outright. Each round after, it wheels on the wing, diving to gore with horn and fang and re-laying its thunder-wall to herd prey back into the killing lane. Wary of a real threat to its hide, it retreats bloodied rather than dies for pride — but against anything it can still reach, it harries and toys, testing prey like a hawk before the final stoop.

**lore:** The storm drake whelps high in the thundering crags where squall-born lightning pricks the stone; it wants a storm-wrought territory it can call its own and a herd of screaming prey to prove it.

### The sheet

```
Thunderwall Drake

Large Dragon, Chaotic Neutral

AC 18
Initiative +1 (11)

HP 105 (14d10 + 28)

Speed 30 ft., Fly 60 ft.

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
12
+1
+4
WIS
15
+2
+5
MOD
SAVE
CON
15
+2
+2
CHA
14
+2
+2

Skills Perception +5, Stealth +4

Immunities Thunder

Senses blindsight 30 ft., darkvision 120 ft.; Passive Perception 15

Languages Common, Draconic

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. The drake makes two Horn attacks.

Horn. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Reliquary Vault Ooze: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 30 taken name(s) the recording carried
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("a young storm drake") | breath→mechanics ✓ ("its breath is a rolling wall")
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/aerial mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: rolling wall of thunder breath [behavior] | storm-charged drake hide and wings [body] | thunderous wingbeat [aura]
[concept] identity: The storm drake opens with a rolling wall of thunder exhaled low and wide, flattening the field and deafening anything it does not pulp outright. Each round after, it wheels on the wing, diving to gore with horn and fang and re-laying its thunder-wall to herd prey back into the killing lane. Wary of a real threat to its hide, it retreats bloodied rather than dies for pride — but against anything it can still reach, it harries and toys, testing prey like a hawk before the final stoop.
[concept] lore: The storm drake whelps high in the thundering crags where squall-born lightning pricks the stone; it wants a storm-wrought territory it can call its own and a herd of screaming prey to prove it.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] mind tier held: INT stays 12 against "ordinary" — the card's 12 is already ordinary
[reskin] mind tier held: CHA stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 7
[reskin] donor: dragon-2 -> CR 7
[reskin] seats: action <- "rolling wall of thunder breath" | trait <- "storm-charged drake hide and wings"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Thunder Wall = literal; Deafening Peal = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the drake" — the call's own answer (kind), built from the name
[reskin] inline form: "the drake" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: breath — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical) [asked: save_area] [askMechanic: breath]
[reskin] open asks handed to the idea call: "a young storm drake whose breath is a rolling wall of thunder" [breath]
[reskin] idea anchored: action — "The drake pours its thunder low along the ground, and where the wall h" answers the GM's "a young storm drake whose breath is a rolling wall of thunder"
[reskin] idea unanchored: trait — "The drake's hide and wings are storm-charged and it does not land: whi" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 35 of 35 answered; not true of this body: snare, zone, seal, shield-bash, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] menu: taste stands down — action answers the GM's "a young storm drake whose breath is a rolling wall of thunde", so role and style do not filter the menu (legality still does); 8 template(s) offered
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, thrown-burst-seed, pacify, slow-bolt, sensory-strike, disarm, delayed-brand, curse-debt, reveal, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] condition rider rides the attack: action — the payoff family composes a rider, so the idea is re-seated action/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (action): "The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strikes a creature standing in that brand-wake, the horn carries the withheld thunder through it and the target is stunned until the end of its next turn." [rider/on_hit/condition] [family: payoff] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge, isolation (+ shelf: gaze-single, execute, lure, rampage, lay-on-hands, second-wind, patient-defense, answering-strike, riposte)
[reskin] composed candidates on the menu: action — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), stunning-strike (on_hit/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: affliction, contagion, composed:payoff:condition — the key word does not mean the mechanic here
[reskin] closest refused: action — "stunning-strike" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: leaves a thunder-charged mark in the breath's area, and the next hit o)
[reskin] seat authored nothing: action — the call was asked to write an action for "The drake pours its thunder low along the ground, and where the wall h" and wrote no row of that kind (refused: "Deafening Peal" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: action — the first answer was refused ("Deafening Peal" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "The drake pours its thunder low along the ground, and where the wall h" and wrote no row of that kind
[reskin] seat refused twice: action — first: "Deafening Peal" — a trait is not a save — the save form takes stat, target and effect as ; second: you wrote no row of the kind asked for (an action); the seat stays empty
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strikes a creature standing in that brand-wake, the horn carries the withheld thunder through it and the target is stunned until the end of its next turn." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, pounce, composed:payoff:condition, charge-push, hook-rider, charge, isolation, execute)
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded — the key word does not mean the mechanic here
[reskin] closest refused: trait — "energy-aura" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a Dexterity-saving-throw area that deals a burst of thunder damage to )
[reskin] seat answered, but: the call said "while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Stormwake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind
[reskin] seat asked again: trait — the first answer was refused (you wrote no row of the kind asked for (a trait)); asking once more with the reason
[reskin] seat answered, but: the call said "while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Pressure Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Pressure Wake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: trait — first: you wrote no row of the kind asked for (a trait); second: "Pressure Wake" — a trait is not a save — the save form takes stat, target and effect as f; the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] — the model found no template that holds it (offered: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, energy-aura, phobia, berserk, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude)
[reskin] weapons answered: Horn = none; Thunder Wall = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] lint: 0 findings
[reskin] audit: [Thunder Wall (Recharge 5-6): The signature action …Throw*: DC 15, each creature in a 15-foot Cone.")]
[reskin] audit defect: Actions/"Thunder Wall" [catalog] high other (the audit said "undelivered") — The signature action named for a rolling wall of thunder carries no push, movement, or lingering barrier — just a single cone of damage, so the ask's 'rolling wall' is delivered only as a name. — Add a wall-like payload (forced movement or a persistent zone the wall leaves) so the effect matches the name. (about: "*Constitution Saving Throw*: DC 15, each creature in a 15-foot Cone.")
[reskin] [gap] leaves a thunder-charged mark in the breath's area, and the next hit on a creature standing in it discharges that mark t — "The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strikes a creature standing in that brand-wake, the horn carries the withheld thunder through it and the target is stunned until the end of its next turn." — Thunderwall Drake [seat: action [rider/on_hit/condition]] (closest offered: stunning-strike) [effect: condition] [menu: affliction contagion stunning-strike pounce composed:payoff:condition charge-push hook-rider charge isolation execute] [same-cell unoffered: life-drain snatch bolt-restrain bolt-mark] [same-seat rejected: life-drain:body-verdict snatch:engine-key bolt-restrain:host-row bolt-drag:host-row bolt-mark:host-row] [row dropped]
[reskin] [gap] a Dexterity-saving-throw area that deals a burst of thunder damage to every creature caught in the cone — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." — Thunderwall Drake [seat: trait [trait/start_of_turn/condition]] (closest offered: energy-aura) [effect: damage] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path homebrew
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 12 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 32-barrowstone-exile

**Typed:** `a stone giant exile who speaks only Giant and understands no Common`

**signature elements:** hurling torn boulders [behavior] | a body of living mountain stone [body] | speechless, understands only Giant [behavior]

**identity:** A stone giant exile opens the fight by hurling a boulder torn from the earth, then wades in swinging a hewn slab of mountain rock one-handed and simply outlasts smaller foes, trading blows without flinching. It knows the tongue of giants alone and answers any stranger's Common with silence and stone, reading intent from stance and gesture rather than words. Pressed and bloodied it does not flee — exile taught it there is nothing behind it — so it fights to the death with the grim patience of a thing that has already lost everything.

**lore:** Cast out of its steadhold for some forgotten transgression, this giant wanders the high barrens alone, and it attacks travelers not out of malice but because it cannot speak to them and will not be mocked again.

### The sheet

```
Barrowstone Exile
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

Barrow-Step.The exile ignores difficult terrain made of rock, rubble, or broken stone, and it leaves no tracks behind.
Deflect Missile (Recharge 5-6) (Reaction).When the exile is hit by a ranged attack roll and takes Bludgeoning, Piercing, or slashing damage from it, the exile reduces the damage it takes from the attack by 11 (1d10 + 6), and if that damage is reduced to 0, the exile can redirect some of the attack's force. One creature the exile can see within 60 feet must make a DC 18 Dexterity saving throw, taking 11 (1d10 + 6) force damage on a failed save.

Actions
Multiattack: The exile makes two attacks, using Stone Club or Boulder.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Thunderwall Drake: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 31 taken name(s) the recording carried
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a stone giant exile who speaks only Gian") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Giant typeFrom=the route call themes=elemental/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: hurling torn boulders [behavior] | a body of living mountain stone [body] | speechless, understands only Giant [behavior]
[concept] identity: A stone giant exile opens the fight by hurling a boulder torn from the earth, then wades in swinging a hewn slab of mountain rock one-handed and simply outlasts smaller foes, trading blows without flinching. It knows the tongue of giants alone and answers any stranger's Common with silence and stone, reading intent from stance and gesture rather than words. Pressed and bloodied it does not flee — exile taught it there is nothing behind it — so it fights to the death with the grim patience of a thing that has already lost everything.
[concept] lore: Cast out of its steadhold for some forgotten transgression, this giant wanders the high barrens alone, and it attacks travelers not out of malice but because it cannot speak to them and will not be mocked again.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +7, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] seats: action <- "speechless, understands only Giant" | trait <- "a body of living mountain stone"
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the exile" — the call's own answer (kind), built from the name
[reskin] inline form: "the exile" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The exile gestures for a traveler to come closer. If the target fails " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The exile can move across any rocky, broken, or uneven ground without " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The exile gestures for a traveler to come closer. If the target fails a Wisdom saving throw, it is overcome by the giant's profound loneliness and is frightened for 1 minute. A frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success." [action/save/condition] [family: mark] — menu: trample, leap, thrown-burst, throw-retrieve, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal (+ shelf: rampage, second-wind, aggro-curse, self-invisibility, focus, answering-strike, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), push-prone (save/condition)
[reskin] word match declined by the call: lure — the key word does not mean the mechanic here
[reskin] signature miss: action — "escalating-dread" quotes nothing the GM typed, matches no key-table verb, and the call named none of this creature's own elements for it: decoration, not a signature
[reskin] fallback stands down: the twist path has no shelf — the Stone Giant's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The exile can move across any rocky, broken, or uneven ground without it costing extra movement, and it leaves no tracks behind." [trait/always/movement] [family: breach] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/movement): terrain-walk, relentless-pursuit, bound; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] word match declined by the call: bound, terrain-walk, death-restoration — the key word does not mean the mechanic here
[reskin] closest refused: trait — "shielded-mind" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a one-way language barrier that blocks only the mind-reading and telep)
[reskin] seat answered, but: the call said "The exile can move across any rocky, broken, or uneven ground without it costing extra movement, and it leaves no tracks" is carried by "Barrow-Step", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a one-way language barrier that blocks only the mind-reading and telep") and wrote a trait instead: "Barrow-Step" -> Traits. The exile ignores difficult terrain made of rock, rubble, or broken stone, and it leaves no tracks behind.
[reskin] authored row numbers: "Barrow-Step" — the call declared 0 number(s) promised
[reskin] free signature row: "Barrow-Step" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Barrow-Step" is HANDED "a exile" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Barrow-Step" ("The exile can move across any rocky, broken, or uneven ground without it costing extra movement, and it leaves no tracks behind. [authored: the catalog held no shape for it]")
[reskin] weapons answered: Stone Fist = none; Boulder = none
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Stone Giant's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon attack: "Stone Fist" -> "Stone Club" — the Stone Giant's own row
[reskin] print canon row: Reactions/Deflect Missile (Recharge 5-6) — the Stone Giant's own
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Barrow-Step" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Barrow-Step: The trait written for the exile's sig…or broken stone, and it leaves no tracks behind")]
[reskin] audit defect: Traits/"Barrow-Step" [model-written] medium weak — The trait written for the exile's signature identity is a pure ribbon — terrain-walk and tracklessness give no combat leverage and nothing that distinguishes this exile from any stone giant on open ground. — Give the trait a second clause that matters in a fight, e.g. a stated benefit tied to standing on or moving through broken stone, so the trait's name carries a usable mechanic. (about: "ignores difficult terrain made of rock, rubble, or broken stone, and it leaves no tracks behind")
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] lack took nothing: "understands no Common" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Barrowstone Exile" — donor brute-9, CR 9
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 8 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 33-riverbank-reed-ascetic

**Typed:** `lizardfolk monk`

**signature elements:** joint-locks and grappling control [behavior] | scaled hide toughened by contemplative discipline [body] | the riverbank reed-temple where it learned stillness [aura]

**identity:** A scale-cloaked ascetic that opens combat by closing to grappling range and pinning a foe against its own weight, then works the captured limb with joint-locks and scaled elbow strikes while the fight stays exactly where it wants it. Every round thereafter it redirects aggression, using its tail sweep to foul footing and its clawed hands to keep one enemy controlled rather than trade blows with several. Disciplined rather than bloodthirsty, it disengages bloodied and slips into water or reeds to wait, but a cornered one fights to the death with unnerving calm.

**lore:** Hatched in a reed-temple where lizardfolk contemplatives meditate on the river's patient current, it wanders the banks testing travelers—not to rob them, but to learn whether they can be thrown off balance.

### The sheet

```
Riverbank Reed-Ascetic
Medium humanoid, neutral
Armor Class

13

Hit Points: 

94 (21d8)

Speed: 

30 ft., climb 30 ft., swim 30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

15 (+2)

	

10 (+0)

	

12 (+1)

	

14 (+2)

	

16 (+3)

Skills: 

Athletics +6, Perception +5

Saving Throws: 

STR +6, CON +3

Senses: 

passive Perception 15

Languages: 

Common plus one other language, Draconic

Challenge

5 (1,800 XP)

Proficiency Bonus:

+3

Reed-Walker's Stride.The reed-ascetic ignores difficult terrain, and it can move across the surface of still water at its full speed.
Hold Breath.The reed-ascetic can hold its breath for 15 minutes.

Actions
Multiattack: The reed-ascetic makes two attacks, using Unarmed Strike or Dart.
Unarmed Strike: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage. Once on each of the reed-ascetic's turns when it hits with this attack, the target is subjected to the following effect. The target must make a DC 14 Constitution saving throw. On a failed save, the target is stunned until the end of the reed-ascetic's next turn.
Dart: Ranged Weapon Attack: +5 to hit, range 20/60 ft., one target. Hit: 11 (2d8 + 2) piercing damage.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Barrowstone Exile: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 32 taken name(s) the recording carried
[concept] thin concept expanded before routing: lizardfolk monk — A scale-cloaked ascetic that opens combat by closing to grappling range and pinning a foe against its own weight, then works the captured limb with joint-locks and scaled elbow strikes while the fight stays exactly where it wants it. Every round thereafter it redirects aggression, 
[concept] expansion answered: type=Humanoid (type_source=inferred) material=hide size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] class_npc — class monk — species lizardfolk — "monk" (call)
[route] brute type=Humanoid mechanics=grapple — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "closing to grappling range and", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("closing to grappling range and pinning a") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | brute-grappler stands: every key that would override it was read as a figure of speech | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Humanoid typeFrom=the route call themes=armed/aquatic mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: joint-locks and grappling control [behavior] | scaled hide toughened by contemplative discipline [body] | the riverbank reed-temple where it learned stillness [aura]
[concept] identity: A scale-cloaked ascetic that opens combat by closing to grappling range and pinning a foe against its own weight, then works the captured limb with joint-locks and scaled elbow strikes while the fight stays exactly where it wants it. Every round thereafter it redirects aggression, using its tail sweep to foul footing and its clawed hands to keep one enemy controlled rather than trade blows with several. Disciplined rather than bloodthirsty, it disengages bloodied and slips into water or reeds to wait, but a cornered one fights to the death with unnerving calm.
[concept] lore: Hatched in a reed-temple where lizardfolk contemplatives meditate on the river's patient current, it wanders the banks testing travelers—not to rob them, but to learn whether they can be thrown off balance.
[reskin] [path] class body: the monk stands on the Spy — the class's own print block, nearest CR 5
[reskin] print canon array: STR 16, DEX 15, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, STR fitted to +6
[reskin] donor: brute-5 -> CR 5
[reskin] seats: action <- "joint-locks and grappling control" | trait <- "scaled hide toughened by contemplative discipline"
[reskin] [path] decides: class_npc on the Spy · class monk (the matcher would have said homebrew)
[reskin] print canon: "lizardfolk monk" heads on the Spy — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Claw" is a natural weapon on a Humanoid whose concept gives it none — a Humanoid swings a weapon (Scimitar, Club, Spear)
[reskin] species kit yields: Marsh Stride — the sheet is full (4 rows at CR 5, print's cap 4); the user's own rows stand
[reskin] species kit: lizardfolk — "monk": Hold Breath (Hydra/Hold Breath); Swim 30 ft.
[reskin] class kit: patient-defense — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: monk — "monk": Stunning Strike (stunning-strike, rides Claw)
[reskin] inline declared: "the reed-ascetic" — the call's own answer (kind), built from the name
[reskin] inline form: "the reed-ascetic" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "lizardfolk monk" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "As a creature comes within the reed-ascetic's reach, it flows around t" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The ascetic moves along reed, mud, and open water as if it were dry fl" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, life-drain
[reskin] signature idea (action): "As a creature comes within the reed-ascetic's reach, it flows around the strike and closes — a supple, unhurried redirect that seizes the offending limb. The attacker must succeed on a Dexterity saving throw or be caught fast: the Grappled condition (escape DC), its weapon arm locked against a scaled elbow so the ascetic's own Claw lands against it with advantage." [reaction/on_being_hit/condition] [family: body-reaction] — menu: answering-strike (+ shelf: condition-payoff, throw-retrieve, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, exploiter, rampage, second-wind, aggro-curse, self-invisibility, focus, affliction, contagion, charge-push, hook-rider, pounce, charge)
[reskin] composed candidates: none action — the body-reaction family composes a trait and this is the reaction seat
[reskin] menu ordered by the idea's stamps: action — idea fires on_being_hit/does condition; leading: answering-strike (on_being_hit/damage), exploiter (save/condition), condition-payoff (save/damage)
[reskin] classification handed to the fit call: mechanic=grapple
[reskin] word match declined by the call: answering-strike, exploiter, condition-payoff, throw-retrieve, thrown-burst-seed — the key word does not mean the mechanic here
[reskin] closest refused: action — "answering-strike" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grabs the attacker's limb and holds it, letting its next claw land wit)
[reskin] seat answered, but: the call said "The attacker must succeed on a Dexterity saving throw or be caught fast: the Grappled condition (escape DC), its weapon " is carried by "River's Reversal", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a reaction for "As a creature comes within the reed-ascetic's reach, it flows around t" and wrote no row of that kind (refused: "River's Reversal" — the response writes a saving throw as prose — put it in the "save" object (stat, target, damage, condition, success) and the engine renders it after "Response", as print does)
[reskin] seat asked again: action — the first answer was refused ("River's Reversal" — the response writes a saving throw as prose — put it in the "save" object (stat, target, ); asking once more with the reason
[reskin] seat answered, but: the call said "The attacker must succeed on a Dexterity saving throw or be caught fast: the Grappled condition (escape DC), its weapon " is carried by "River's Reversal", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("grabs the attacker's limb and holds it, letting its next claw land wit") and wrote a reaction instead: "River's Reversal" -> Reactions. *Trigger:* A creature within the reed-ascetic's reach makes a melee attack against it. *Response—Dexterity Saving Throw:
[reskin] authored row numbers: "River's Reversal" — the call declared 1 number(s) promised
[reskin] seat landed on the second try: action — "River's Reversal" after ""River's Reversal" — the response writes a saving throw as prose — put it in the"
[reskin] seat takes its clause: "River's Reversal" is HANDED "lizardfolk monk" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Reactions/"River's Reversal" ("As a creature comes within the reed-ascetic's reach, it flows around the strike and closes — a supple, unhurried redirect that seizes the offending limb. The at [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The ascetic moves along reed, mud, and open water as if it were dry flagstone — difficult terrain never slows it, and it can walk across the surface of still water at its full speed, a contemplative untroubled by what catches lesser feet." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), terrain-walk (always/movement), relentless-pursuit (always/movement)
[reskin] classification handed to the fit call: mechanic=grapple
[reskin] word match declined by the call: terrain-walk, spider-climb, relentless-pursuit, bound — the key word does not mean the mechanic here
[reskin] closest refused: trait — "terrain-walk" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a monk-like grapple that seizes and holds a target in place)
[reskin] seat answered, but: the call said "The ascetic moves along reed, mud, and open water as if it were dry flagstone — difficult terrain never slows it, and it" is carried by "Reed-Walker's Stride", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a monk-like grapple that seizes and holds a target in place") and wrote a trait instead: "Reed-Walker's Stride" -> Traits. The reed-ascetic ignores difficult terrain, and it can move across the surface of still water at its full Speed.
[reskin] authored row numbers: "Reed-Walker's Stride" — the call declared 0 number(s) promised
[reskin] seat takes its clause: "Reed-Walker's Stride" is HANDED "lizardfolk monk" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Reed-Walker's Stride" ("The ascetic moves along reed, mud, and open water as if it were dry flagstone — difficult terrain never slows it, and it can walk across the surface of still wa [authored: the catalog held no shape for it]")
[reskin] weapons answered: Claw = none; Tail Spike = none
[reskin] print canon modes: swim off — the Spy has no such mode and the words name none
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Swim 40 ft.; added Climb 40 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
[reskin] print canon languages: "Common, Draconic" -> "Common plus one other language, Draconic" — the Spy's plus the concept's Draconic
[reskin] print canon speed: Climb -> 30 ft. — the Spy's own
[reskin] print canon rider stays: "Claw" -> "Shortsword": the Stunned clause is the monk kit's, not the chassis's — on a class body the kit owns the class's rows
[reskin] print canon attack: "Claw" -> "Shortsword" — the Spy's own row
[reskin] print canon attack: "Tail Spike" -> "Hand Crossbow" — the Spy's own ranged row
[reskin] print canon row withheld: Bonus Actions/Cunning Action — the Spy's own, but the catalog gives it to the rogue and this sheet is a monk
[reskin] class weapon: Actions/"Shortsword" -> "Unarmed Strike" — a monk fights with its hands, not the Spy's; the body's rider folds in (+7)
[reskin] class weapon: "Dart" rolls Dexterity — a launcher is DEX in print: +6 -> +5
[reskin] class weapon: Actions/"Hand Crossbow" -> "Dart" — a monk fights with a dart, not the Spy's
[reskin] free row over budget: Reactions/"River's Reversal" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Reed-Walker's Stride" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Reed-Walker's Stride" claims "joint-locks and grappling control" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Reed-Walker's Stride")
[reskin] audit: [Unarmed Strike: The 2014-format phrasing 'is subje…he target is subjected to the following effect."), Reed-Walker's Stride: Walking on still water has n…s the surface of still water at its full Speed.")]
[reskin] audit defect: Actions/"Unarmed Strike" [print] high wording — The 2014-format phrasing 'is subjected to the following effect' is not 2024 Monster Manual action language and reads as a schema fragment rather than a statblock instruction. — Replace with the standard 2024 phrasing where the hit imposes a saving throw that the target makes immediately. (about: "the target is subjected to the following effect.")
[reskin] audit defect: Traits/"Reed-Walker's Stride" [model-written] medium untrackable — Walking on still water has no adjudicable trigger or ending condition, so the GM must decide each turn whether the water counts as 'still'—information the block does not provide. — State the water condition in a checkable way (e.g., calm or nonmagical water, or water not churned by a creature), or give the trait a defined trigger. (about: "it can move across the surface of still water at its full Speed.")
[reskin] clause id by substring: "Unarmed Strike" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] clause id by substring: "Hold Breath" carries "monk" which is not a whole clause — the seat surgery cut it; resolved to cl_xxau9
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] species kit: Swim 30 ft. — a lizardfolk's own
[reskin] done: "Riverbank Reed-Ascetic" — donor brute-5, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 34-krennik-skullstandard

**Typed:** `name: Krennik Skullstandard | riding a worg`

**signature elements:** ride-down charges that carry past the target [behavior] | an iron-shod warband standard used as a sweeping weapon [object] | a worg mount that seizes and drags prey [body]

**identity:** Krennik opens by wheeling his worg into a circling gallop and then commits to a flat-out ride-down, the worg's jaws seizing and shaking while his iron-shod standard sweeps down to finish the dragged prey. Every round he re-forms, circling wide to build momentum again, never trading blows at a standstill — he fights like a man on a moving platform, using the beast's speed as his armor and the standard's weight as his reach. Bloodied, he does not dismount or despair: he cuts the worg loose, spurs through the enemy's flank to scatter their line, and rides the momentum out — a raider's bully-captain who breaks when the field breaks, not before.

**lore:** Krennik Skullstandard is a border-raider captain who nailed his warband's standard to a heavy iron pole and never let go of it — he rides a worg he raised from a pup, and he wants the plunder, the fear, and the road back to the hills, in that order.

### The sheet

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

	

15 (+2)

	

8 (-1)

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

Charging Momentum.While mounted and wielding the standard, Krennik's Iron-Shod Standard attacks have a reach of 10 feet, and when Krennik moves at least 20 feet in a straight line toward a target immediately before the hit, the attack deals an extra 5 (1d10) bludgeoning damage; Krennik cannot use this reach or extra damage while unmounted.
Galloping Circle.Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility (Bonus Action).Krennik takes the Dash or Disengage action.

Actions
Multiattack: Krennik makes two attacks, using Iron-Shod Standard or Javelin.
Iron-Shod Standard: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) bludgeoning damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.
Ride-Down (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Each such creature must make a DC 13 Dexterity saving throw, taking 24 (7d6) bludgeoning damage on a failed save. On a failed save, the target is also knocked prone.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Riverbank Reed-Ascetic: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 33 taken name(s) the recording carried
[path] homebrew — "riding a worg" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] name: "Krennik Skullstandard" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/bestial mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Krennik Skullstandard"
[concept] mechanics: none claimed
[concept] signature elements: ride-down charges that carry past the target [behavior] | an iron-shod warband standard used as a sweeping weapon [object] | a worg mount that seizes and drags prey [body]
[concept] identity: Krennik opens by wheeling his worg into a circling gallop and then commits to a flat-out ride-down, the worg's jaws seizing and shaking while his iron-shod standard sweeps down to finish the dragged prey. Every round he re-forms, circling wide to build momentum again, never trading blows at a standstill — he fights like a man on a moving platform, using the beast's speed as his armor and the standard's weight as his reach. Bloodied, he does not dismount or despair: he cuts the worg loose, spurs through the enemy's flank to scatter their line, and rides the momentum out — a raider's bully-captain who breaks when the field breaks, not before.
[concept] lore: Krennik Skullstandard is a border-raider captain who nailed his warband's standard to a heavy iron pole and never let go of it — he rides a worg he raised from a pup, and he wants the plunder, the fear, and the road back to the hills, in that order.
[reskin] mind tier held: CHA stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 4
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 4
[reskin] donor: skirmisher-3-mounted -> CR 4 (invented — no printed peer)
[reskin] seats: package <- "an iron-shod warband standard used as a sweeping weapon"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] proper noun: "Krennik Skullstandard" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Krennik" — the call's own answer (person), built from the name
[reskin] inline form: "Krennik" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Krennik Skullstandard — riding a worg" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Krennik swings the iron-shod foot of his standard in a flat, low, warb" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Krennik fights from the moving platform of his worg, and his reach car" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 24 of 24 answered; not true of this body: snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "Krennik swings the iron-shod foot of his standard in a flat, low, warband-wide arc — each creature of his choosing in a wide sweep ahead of him must make a Dexterity saving throw. On a failure, the target takes Bludgeoning damage and has the Prone condition as the iron bar takes its legs out from under it." [action/save/condition] [family: nova] — menu: condition-payoff, throw-retrieve, lure, sensory-strike, disarm, exploiter, pacify, escalating-dread, terror-pulse, reveal (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, snap-shot, riposte, answering-strike, affliction, contagion, isolation, bolt-mark)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), sensory-strike (save/condition), exploiter (save/condition)
[reskin] word match declined by the call: lure, sensory-strike, exploiter, pacify, escalating-dread, terror-pulse, condition-payoff, disarm, throw-retrieve — the key word does not mean the mechanic here
[reskin] closest refused: action — "reveal" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: hits each of several chosen creatures in a wide arc, not one creature,)
[reskin] seat answered, but: the call said "Krennik swings the iron-shod foot of his standard in a flat, low, warband-wide arc — each creature of his choosing in a " is carried by "Scything Standard", and no such row is on this sheet — the clause stays open
[reskin] seat authoring refused: action — the authored row imposes Prone, which two rows on this sheet already impose, and no printed block imposes one condition three ways (0 of 329)
[reskin] seat asked again: action — the first answer was refused (the row imposes a condition two rows on this sheet already impose); asking once more with the reason
[reskin] seat answered, but: the call said "Krennik swings the iron-shod foot of his standard in a flat, low, warband-wide arc — each creature of his choosing in a " is carried by "Scything Standard", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("hits each of several chosen creatures in a wide arc, not one creature,") and wrote an action instead: "Scything Standard" -> Actions. *Dexterity Saving Throw*: DC 13, each creature in a 15-foot Cone. *Failure:* 14 (4d6) Bludgeoning damage, and the target
[reskin] authored row numbers: "Scything Standard" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Scything Standard" after "the row imposes a condition two rows on this sheet already impose"
[reskin] value check: "Scything Standard" EV 26.5 vs floor 5.2 (one attack of 2) — dice 14 → 10 (scaled down to the ceiling); a nova already stands — kept ungated, dice to 10 at the ceiling
[reskin] signature authored: no template — the seat wrote it -> Actions/"Scything Standard" ("Krennik swings the iron-shod foot of his standard in a flat, low, warband-wide arc — each creature of his choosing in a wide sweep ahead of him must make a Dext [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Krennik fights from the moving platform of his worg, and his reach carries the standard's weight through the beast's momentum: while mounted, his Iron-Shod Standard can strike creatures a stride beyond his own and he commits his movement to the swing, so the standard's blow lands harder the farther he has charged. When forced off his mount, the standard is dead weight and this reach is lost with t" [trait/always/damage] [family: payoff] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/damage): blood-frenzy, pack-tactics, assassinate; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] word match declined by the call: blood-frenzy, pack-tactics, relentless-pursuit, bound — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: extra damage that scales with distance charged before the hit, lost wh)
[reskin] seat answered, but: the call said "Krennik fights from the moving platform of his worg, and his reach carries the standard's weight through the beast's mom" is carried by "Charging Momentum", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("extra damage that scales with distance charged before the hit, lost wh") and wrote a trait instead: "Charging Momentum" -> Traits. While mounted and wielding the standard, Krennik's Iron-Shod Standard attacks have a reach of 10 feet, and when Krennik 
[reskin] authored row numbers: "Charging Momentum" — the call declared 2 number(s) promised
[reskin] free signature row: "Charging Momentum" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Charging Momentum" ("Krennik fights from the moving platform of his worg, and his reach carries the standard's weight through the beast's momentum: while mounted, his Iron-Shod Stan [authored: the catalog held no shape for it]")
[reskin] weapons answered: Iron-Shod Standard = a heavy iron pole, used as a greatclub; Javelin = a javelin
[reskin] weapon declared: "Iron-Shod Standard" is a greatclub — the call's own answer
[reskin] weapon dice follow the weapon: "Iron-Shod Standard" is a greatclub (d8) — "10 (2d6 + 3)" becomes "12 (2d8 + 3)", print's rule of keeping the die and scaling the count
[reskin] weapon dice follow the weapon: "Javelin" is a javelin (d6) — "7 (1d8 + 3)" becomes "6 (1d6 + 3)", print's rule of keeping the die and scaling the count
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Ride-Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "riding a worg" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Scything Standard.
[reskin] free-row budget by card size: CR 4 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free row over budget: Actions/"Scything Standard" leaves at ship — this sheet's free-row budget (0) is spent by a row that SHIPPED
[reskin] multiattack re-read — "Scything Standard" left; "Multiattack" now reads "Krennik makes two attacks, using Iron-Shod Standard or Javelin in any combination."
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Charging Momentum" [no template]
[reskin] save re-derived after a retype: Actions/Ride-Down — a Strength save for a condition the row IMPOSES, which calls for Dexterity or Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
audit finding below confidence gate: Galloping Circle Galloping Circle is a body-catalog row whose name claims a circular gallop but its text only grants Difficult-Terrain-ignoring and Disadvantage on Opportunity Attacks — nothing circular or galloping-momentum, so name and mechanics describe two different abilities.
[reskin] audit: [Charging Momentum: Charging Momentum grants an ext…tack deals an extra 5 (1d10) Bludgeoning damage"), Charging Momentum: The trait is keyed to being mou… use this reach or extra damage while unmounted"), Ride-Down (Recharge 5-6): Ride-Down is written as …its Speed without provoking Opportunity Attacks")]
[reskin] audit defect: Traits/"Charging Momentum" [model-written] high other — Charging Momentum grants an extra-damage rider for moving 20 feet before an Iron-Shod Standard hit, but Iron-Shod Standard already carries its own identical move-20-feet extra-damage-and-Pr prone clause, so this trait's payload is made redundant and the GM cannot tell whether both stack or one overrides. — Strip the extra-damage clause from Charging Momentum and leave it granting only the conditional reach, so the trait and the action no longer both define the same charge bonus. (about: "the attack deals an extra 5 (1d10) Bludgeoning damage")
[reskin] audit defect: Traits/"Charging Momentum" [model-written] medium dead_reference — The trait is keyed to being mounted, but nothing on this sheet provides a mount (no mount statblock, no worg, no "while mounted on a worg" clause), so the entire trait is dead whenever the GM runs Krennik without an external mount. — Note the required mount explicitly in the trait or fold the reach into the action so the trait does not reference a state the sheet never creates. (about: "Krennik cannot use this reach or extra damage while unmounted")
[reskin] audit defect: Actions/"Ride-Down" [catalog] medium other (the audit said "undelivered") — Ride-Down is written as the mounted rider charging through enemies' spaces, but the text describes Krennik himself moving through spaces, contradicting the mounted rider-worg premise the ask requires. — Word the movement as the mount carrying Krennik so the effect matches the loadout requested. (about: "Krennik moves up to its Speed without provoking Opportunity Attacks")
[reskin] clause unresolved: "Charging Momentum" carries "Krennik fights from the moving platform of his worg, and", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 1 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Krennik Skullstandard" — donor skirmisher-3-mounted, CR 4
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 35-well-drowned-worm

**Typed:** `name: the thing in the well |`

**signature elements:** dragging prey down into the well [behavior] | a body of black, brine-heavy coils [body] | the cold drowned dark of the well shaft [aura]

**identity:** The thing in the well waits beneath the surface, letting a bucket or a curious hand reach the water before it surges up in a coil of black brine to seize and drag the victim over the rim. Each round it fights from the waterline, lashing with brine-heavy coils and hauling prey toward the drowned dark, only withdrawing to the depths when badly hurt and circling to strike again when the screaming stops. It does not toy and it does not flee far — the well is its territory, and anything that enters the water becomes part of the well.

**lore:** A swallowing hunger sank into an old well and made the water its flesh; now it wants only to pull warm, breathing things down into the cold dark where it can feed at leisure.

### The sheet

```
Well Drowned Worm

Large Aberration, Unaligned

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

Speed 30 ft., Swim 30 ft., Climb 30 ft.

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
4
-3
-3

Skills Athletics +6, Perception +7

Senses blindsight 30 ft.; Passive Perception 17

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Black Brine Sleeve. The drowned worm can move through a space as narrow as a few inches wide without squeezing, and it can climb sheer surfaces and hang upside down from ceilings without a check.

Actions

Multiattack. The drowned worm makes two Coil attacks. It can replace one attack with a use of Creeping Dread.

Coil. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Creeping Dread. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the drowned worm's next turn. If the target was already Frightened by this ability, it also takes 18 (4d8) Psychic damage.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Krennik Skullstandard: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 34 taken name(s) the recording carried
[concept] thin concept expanded before routing: the thing in the well — The thing in the well waits beneath the surface, letting a bucket or a curious hand reach the water before it surges up in a coil of black brine to seize and drag the victim over the rim. Each round it fights from the waterline, lashing with brine-heavy coils and hauling prey
[concept] expansion answered: type=Aberration (type_source=inferred) material=brine size=Large mind=bestial
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] homebrew — "the thing in the well" (call)
[route] brute-grappler type=Aberration mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered reach but quoted "lashing with brine-heavy coils", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("surges up in a coil of black brine to se") | brute-grappler: key "seize" (class verb)
[concept] resolve: archetype=brute type=Aberration typeFrom=the route call themes=aquatic/grasping mind=bestial style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: dragging prey down into the well [behavior] | a body of black, brine-heavy coils [body] | the cold drowned dark of the well shaft [aura]
[concept] identity: The thing in the well waits beneath the surface, letting a bucket or a curious hand reach the water before it surges up in a coil of black brine to seize and drag the victim over the rim. Each round it fights from the waterline, lashing with brine-heavy coils and hauling prey toward the drowned dark, only withdrawing to the depths when badly hurt and circling to strike again when the screaming stops. It does not toy and it does not flee far — the well is its territory, and anything that enters the water becomes part of the well.
[concept] lore: A swallowing hunger sank into an old well and made the water its flesh; now it wants only to pull warm, breathing things down into the cold dark where it can feed at leisure.
[reskin] mind tier held: INT stays 4 against "capable" — the call read this creature as bestial, so only "feeble" could lower its INT
[reskin] mind tier held: CHA stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 18 — the call read this creature as formidable at CR 5
[reskin] donor: brute-5-grappler -> CR 5
[reskin] seats: action <- "dragging prey down into the well" | trait <- "a body of black, brine-heavy coils"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Whelm — the body's own verb
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the drowned worm" — the call's own answer (kind), built from the name
[reskin] inline form: "the drowned worm" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 3 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral Evil" -> Unaligned — a Aberration the call reads as bestial at INT 4 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (mechanical) [asked: condition] [askMechanic: grapple]
[reskin] answered by the chassis: "the thing in the well" asks grapple and "Coil" already carries it (declared imposes) — no row is requested for it, and the row now carries the GM's words
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The drowned worm hauls one creature it has Grappled up to its speed to" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The drowned worm's body is a sleeve of black brine and wet flesh that " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: shield-bash, active-toll, random-ray, herd, shell-withdraw, rally, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst
[reskin] engulf engine withheld: Bonus Actions/"Whelm" leaves — the route call read this creature's hold as unanswered, not contain; the grapple stands and citations of the row are swept
[reskin] menu pruned: action — push-prone, exploiter, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victim across the ground. If the target ends this move in water deep enough to submerge it, it has the Blinded and Restrained conditions until it escapes the grapple." [action/always/movement] [family: drag] — menu: leap, condition-payoff, ground-burst, spew, escalating-dread, terror-pulse, thrown-burst-seed, drain, wind-up, snare, seal, lure, pacify, snare-bolt, sensory-strike (+ shelf: gaze-single, second-wind, aggro-curse, self-invisibility, focus, coating, blink, feint-slip, answering-strike, stunning-strike, charge-push, hook-rider, pounce, life-drain)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — grapple: hook-rider
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: hook-rider (on_hit/movement), leap (save/damage), condition-payoff (save/damage)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition
[reskin] word match declined by the call: hook-rider, condition-payoff, snare, sensory-strike, drain — the key word does not mean the mechanic here
[reskin] closest refused: action — "hook-rider" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: drags a grappled creature toward water, and once submerged it is blind)
[reskin] seat answered, but: the call said "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victi" is carried by "Deepwater Haul", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write an action for "The drowned worm hauls one creature it has Grappled up to its speed to" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat answered, but: the call said "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victi" is carried by "Actions — Deepwater Haul", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write an action for "The drowned worm hauls one creature it has Grappled up to its speed to" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: it belongs in the description; the seat stays empty
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victim across the ground. If the target ends this move in water deep enough to submerge it, it has the Blinded and Restrained conditions until it escapes the grapple." [action/always/movement] — the model found no template that holds it (offered: hook-rider, leap, condition-payoff, ground-burst, spew, escalating-dread, terror-pulse, thrown-burst-seed, drain, wind-up, snare, seal, lure, pacify, snare-bolt, sensory-strike)
[reskin] fallback respects the call: condition-payoff left the shelf — the call declined it for this sheet
[reskin] fallback skipped: exploiter (the sheet cannot render it)
[reskin] fallback skipped: push-prone (the sheet cannot render it)
[reskin] value check: "Creeping Dread" EV 12.4 vs floor 9.4 (one attack of 2) — dice 9 → 18
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The drowned worm's body is a sleeve of black brine and wet flesh that flows through any gap or crack. It can move through a space as narrow as a few inches wide without squeezing, and it can climb sheer surfaces and hang upside down from ceilings without a check." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), terrain-walk (always/movement), relentless-pursuit (always/movement)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition
[reskin] closest refused: trait — "spider-climb" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: squeezes its whole body through narrow cracks and gaps)
[reskin] seat answered, but: the call said "The drowned worm's body is a sleeve of black brine and wet flesh that flows through any gap or crack. It can move throug" is carried by "Black Brine Sleeve", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("squeezes its whole body through narrow cracks and gaps") and wrote a trait instead: "Black Brine Sleeve" -> Traits. The drowned worm can move through a space as narrow as a few inches wide without squeezing, and it can climb sheer surfa
[reskin] authored row numbers: "Black Brine Sleeve" — the call declared 0 number(s) promised
[reskin] free signature row: "Black Brine Sleeve" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Black Brine Sleeve" ("The drowned worm's body is a sleeve of black brine and wet flesh that flows through any gap or crack. It can move through a space as narrow as a few inches wide [authored: the catalog held no shape for it]")
[reskin] weapons answered: Coil = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Black Brine Sleeve" [no template]
[reskin] lint: 0 findings
audit finding below confidence gate: Coil The escape clause lives on Coil but only the Grapple condition is named with it; the Restrained condition is then applied by a separate sentence, so the adjudicable exit for Restrained is inherited ambiguously rather than stated on the condition that removes agency.
[reskin] audit: nothing flagged
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Creeping Dread) — the sameness metric
[reskin] clause unresolved: "Black Brine Sleeve" carries "The drowned worm's body is a sleeve of black brine and w", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] drags a grappled creature toward water, and once submerged it is blinded and restrained until it escapes — "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victim across the ground. If the target ends this move in water deep enough to submerge it, it has the Blinded and Restrained conditions until it escapes the grapple." — Well Drowned Worm [seat: action [action/always/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider leap condition-payoff ground-burst spew escalating-dread terror-pulse thrown-burst-seed drain wind-up snare seal lure pacify snare-bolt sensory-strike] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:requires-row zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Well Drowned Worm" — donor brute-5-grappler, CR 5
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 37-meshrin

**Typed:** `name: Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points.`

**signature elements:** two-handed greataxe work [object] | rage that refuses to break [behavior] | frightening roar that scatters the line [aura]

**identity:** Meshrin opens by hurling a javelin as he closes, then plants himself in reach and lets the greataxe carry the fight — a rage-brute built to peel a line apart one swing at a time. Every round he keeps a body between himself and the squishiest target, roaring to break nerve before he charges the frightened one. He fights to the death once bloodied, and his rage only makes the roar uglier.

**lore:** Meshrin is a scar-backed lizardfolk war-captain who leads the marsh raiders out of the drowned reeds, and he wants the tributary villages paying him tribute in steel and meat rather than in soldiers.

### The sheet

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
Multiattack: Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of War Roar.
Greataxe: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.
Javelin: Ranged Weapon Attack: +7 to hit, range 30/120 ft., one target. Hit: 18 (4d6 + 4) piercing damage.
War Roar: Each creature of Meshrin's choice in a 30-foot radius originating from Meshrin that can see or hear it must make a DC 15 Wisdom saving throw. On a failed save, the target is frightened until the end of its next turn. On a successful save, the target is immune to this creature's terror for 24 hours.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Well Drowned Worm: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 36 taken name(s) the recording carried
[path] class_npc — class barbarian — species lizardfolk — "barbarian" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("Wields a greataxe two-handed") | brute -> skirmisher-hurler: the concept's VERB outranks the noun (key "throw", class verb) | skirmisher-hurler: key "throw" (class verb)
[concept] name: "Meshrin" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: hurler→style ✓ ("javelin for the throw")
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=bestial/terror mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Meshrin"
[concept] mechanics: thrown-weapon
[concept] signature elements: two-handed greataxe work [object] | rage that refuses to break [behavior] | frightening roar that scatters the line [aura]
[concept] identity: Meshrin opens by hurling a javelin as he closes, then plants himself in reach and lets the greataxe carry the fight — a rage-brute built to peel a line apart one swing at a time. Every round he keeps a body between himself and the squishiest target, roaring to break nerve before he charges the frightened one. He fights to the death once bloodied, and his rage only makes the roar uglier.
[concept] lore: Meshrin is a scar-backed lizardfolk war-captain who leads the marsh raiders out of the drowned reeds, and he wants the tributary villages paying him tribute in steel and meat rather than in soldiers.
[reskin] [path] class body: the barbarian stands on the Gladiator — the class's own print block, nearest CR 8
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's, STR fitted to +7
[reskin] donor: skirmisher-8-hurler -> CR 8 (invented — no printed peer)
[reskin] seats: action <- "rage that refuses to break" | trait <- "two-handed greataxe work"
[reskin] [path] decides: class_npc on the Gladiator · class barbarian (the matcher would have said homebrew)
[reskin] print canon: "Meshrin — Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points." heads on the Gladiator — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — "Rattling Roar" deals Psychic but this creature is declared fully physical — use Bludgeoning, Piercing, or Slashing | "Rattling Roar" deals Psychic on a Humanoid whose concept names no Psychic — a name is not a warrant; use a physical type
[reskin] named parts: Greataxe (slot), Javelin (slot, ranged) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Great Weapon Master (trait), Slow on Javelin — the feature table, no call
[reskin] row evicted for the cap: Traits/"Reedstalker" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "barbarian": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: rampage — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: barbarian — "barbarian": Bloodied Frenzy (Berserker/Bloodied Frenzy)
[reskin] proper noun: "Meshrin" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Meshrin" — the call's own answer (person), built from the name
[reskin] inline form: "Meshrin" — the model's own reading of the name
[reskin] returning clause dropped: "Javelin" throws a javelin — the call did not say this projectile is a single object the creature must recover (projectile_supply: ambient), so it stays where it lands; print writes a returning weapon 4 times in 1291 rows
[reskin] save dc derived: DC 16 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] final price: the chassis's Multiattack: the round ran 39 against the card's 54 — the attack rows re-solve at 138% (3 attacks on an authored sheet, under the card)
[reskin] the sheet's declared ask: fear — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "Give him a frightening roar" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "Give him a frightening roar" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Meshrin — Large lizard folk" -> has (header) | "30 feet of movement" -> has (header) | "Wields a greataxe two-handed" -> has (mechanical) [asked: attack] | "a javelin for the throw" -> has (mechanical) [asked: attack] | "He is a barbarian who rages" -> has (mechanical) [asked: when_bloodied/buff_self] [askMechanic: escalate] | "Give him a frightening roar" -> has (mechanical) [asked: at_will/at_will/condition] [askMechanic: fear] | "AC 16" -> has (header) | "120 hit points" -> has (header)
[reskin] extraction: 1 of 10 model clauses quote nothing the user typed and leave the record ("AC 16")
[reskin] open asks handed to the idea call: "Give him a frightening roar" [fear]
[reskin] idea anchored: action — "Meshrin throws his head back and looses a war-roar that rolls across t" answers the GM's "Give him a frightening roar"
[reskin] idea unanchored: trait — "Meshrin's rage is a refusal to break: the first time each fight he is " names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 26 of 26 answered; not true of this body: snare, shield-bash, snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "Give him a frightening roar", so role and style do not filter the menu (legality still does); 13 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed, push-prone (the sheet cannot render them)
[reskin] signature idea (action): "Meshrin throws his head back and looses a war-roar that rolls across the marsh like a breaking wave; each creature of his choosing within range that can hear him must succeed on a Wisdom saving throw or have the Frightened condition until the end of its next turn. While Meshrin is Bloodied, a creature that fails this save is Frightened for a longer stretch and cannot willingly move closer to him." [action/save/condition] [family: nova] — menu: condition-payoff, throw-retrieve, lure, sensory-strike, disarm, exploiter, execute, pacify, escalating-dread, terror-pulse, slow-bolt, curse-debt, reveal (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, rampage, lay-on-hands, rally, snap-shot, riposte, answering-strike, affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark, bolt-restrain, bolt-drag, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — fear: escalating-dread, terror-pulse
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), lure (save/condition)
[reskin] keys would have bound: action — terror-pulse, rampage, throw-retrieve (roar, rage, javelin)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=condition when=at_will often=at_will
[reskin] word match declined by the call: escalating-dread, lure, sensory-strike, pacify, reveal, condition-payoff, disarm, execute, slow-bolt, curse-debt, throw-retrieve, rampage — the key word does not mean the mechanic here
[reskin] signature template: terror-pulse -> Actions/"War Roar (2/Day)" ("each creature of his choosing within range that can hear him must succeed on a W [verb: roar:concept]")
[reskin] keys spent by the action: roar
[reskin] signature idea (trait): "Meshrin's rage is a refusal to break: the first time each fight he is reduced to fewer than half his hit points, the … rips out of him unbidden, and each creature within range that can hear him must succeed on a Wisdom saving throw or have the Frightened condition until the end of its next turn." [trait/always/condition] [family: nova] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — fear: phobia, fear-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), fear-aura (start_of_turn/condition), berserk (always/condition)
[reskin] keys would have bound: trait — fear-aura (frightens, frightening)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=condition when=at_will often=at_will
[reskin] word match declined by the call: phobia, berserk — the key word does not mean the mechanic here
[reskin] trait ceiling: "Terrifying Roar" does not ship — 4 traits already, and print's ceiling for a meat body is 3
[reskin] weapons answered: Greataxe = Greataxe; Javelin = Javelin; Knife Hurl = none; Rattling Roar = none
[reskin] weapon dice follow the weapon: the GM's "Greataxe" is a greataxe (d12) — "17 (3d8 + 4)" becomes "17 (2d12 + 4)"
[reskin] weapon dice follow the weapon: the GM's "Javelin" is a javelin (d6) — "17 (3d8 + 4)" becomes "18 (4d6 + 4)"
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Knife Hurl (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "Draconic" -> "Common, Draconic" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Gladiator's own type stands
[reskin] print canon alignment: Chaotic Neutral -> Neutral — the Gladiator's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common, Draconic" -> "Common, Draconic" — the Gladiator's plus the concept's Draconic
[reskin] print canon: chassis row leaves — Actions/"Knife Hurl (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] print canon row: Reactions/Parry — the Gladiator's own
[reskin] class weapon: Actions/"Shield Bash" leaves with the shield — a greataxe is two-handed and print pairs a shield with no heavy melee weapon (0 of 329 gear lines)
[reskin] class weapon: "greataxe" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] dead control row: "War Roar" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of War Roar.
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 8 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "War Roar" answers "Give him a frightening roar" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] asked but unanswered: "He is a barbarian who rages" asked for when_bloodied and no row binds the clause
[reskin] ask vs row ok: "Give him a frightening roar" -> "War Roar" — trigger at_will, limit at_will
[reskin] lint: 0 findings
audit finding below confidence gate: War Roar Meshrin chooses targets inside an emanation, so the roar can spare arbitrarily many creatures in range — the fiction of an area roar is defeated and the GM must adjudicate selective exclusion by sight and hearing that the creature cannot plausibly perceive through a wall of allies.
audit finding below confidence gate: Marsh Stride Nothing on the block creates or references mud or an ability check to cross it, so a GM running an ordinary battlefield has no trigger for this trait and must invent terrain to make it matter.
[reskin] audit: [War Roar: The success rider refers to 'this creatu… immune to this creature's terror for 24 hours."), Great Weapon Master: The trait's name is a player-…s Greataxe, the attack deals an extra 3 damage.")]
[reskin] audit rename blocked — "Great Weapon Master" is the user's own part name, a kit feature's real name, or print's own row
[reskin] audit defect: Actions/"War Roar" [catalog] high dead_reference — The success rider refers to 'this creature's terror', a named effect that no entry on the sheet creates, leaving the immunity clause with no referent. — Point the immunity at War Roar by name. (about: "The target is immune to this creature's terror for 24 hours.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Bloodied Frenzy" carries "barbarian" which is not a whole clause — the seat surgery cut it; resolved to cl_jeugdk
[reskin] clause id by substring: "Hold Breath" carries "barbarian" which is not a whole clause — the seat surgery cut it; resolved to cl_jeugdk
[reskin] clause id by substring: "Marsh Stride" carries "barbarian" which is not a whole clause — the seat surgery cut it; resolved to cl_jeugdk
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] user-set: HP 136 -> 120 — a declared field (Resolution 3)
[reskin] species kit: Swim 30 ft. — a lizardfolk's own
[reskin] done: "Meshrin" — donor skirmisher-8-hurler, CR 8
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 8 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 38-grave-reaper

**Typed:** `a skeleton with a greatsword`

**signature elements:** two-handed greatsword cleaves [object] | bone-frame that shrugs off pain [body] | advances without fear or retreat [behavior]

**identity:** It walks in silently behind a two-handed sword it barely seems strong enough to lift, then opens with a single committed overhead cleave meant to end the fight before it starts. Every round after, it wades forward through blows, chopping in wide, patient arcs and stepping over whatever it just dropped, indifferent to pain and to numbers. It never retreats and never feints — fight it to the death, because it will fight you to yours.

**lore:** Raised by a battlefield necromancer who needed a reaper that would not flinch, this skeleton still carries the greatsword it was buried with and wanders old killing fields, finishing duels long abandoned.

### The sheet

```
Grave-Reaper

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

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 12

Languages Understands Common plus one other language but can't speak

CR 6 (XP 2,300; PB +3)

Traits

Great Weapon Master. When the grave-reaper hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The grave-reaper makes two attacks, using Greatsword or Shortbow in any combination.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 14 (3d6 + 4) Slashing damage plus 7 (2d6) Necrotic damage.

Shortbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

Grave-Cleave (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 40-foot-long, 5-foot-wide Line. Failure: 28 (8d6) Slashing damage, and the target has the Prone condition.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Meshrin: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 37 taken name(s) the recording carried
[concept] thin but a print creature — keeping route-first: a skeleton with a greatsword
[path] twist — Skeleton (is) — "a skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a skeleton with a greatsword…" is the description, not a name
[concept] resolve: archetype=brute type=Undead typeFrom=the route call themes=grave/armed mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: two-handed greatsword cleaves [object] | bone-frame that shrugs off pain [body] | advances without fear or retreat [behavior]
[concept] identity: It walks in silently behind a two-handed sword it barely seems strong enough to lift, then opens with a single committed overhead cleave meant to end the fight before it starts. Every round after, it wades forward through blows, chopping in wide, patient arcs and stepping over whatever it just dropped, indifferent to pain and to numbers. It never retreats and never feints — fight it to the death, because it will fight you to yours.
[concept] lore: Raised by a battlefield necromancer who needed a reaper that would not flinch, this skeleton still carries the greatsword it was buried with and wanders old killing fields, finishing duels long abandoned.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] seats: action <- "advances without fear or retreat" | trait <- "two-handed greatsword cleaves"
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] energy rides the named weapon: "Greatsword" is a greatsword, so the blow stays Slashing and Necrotic rides it rather than folding into the blow (print: 11 of 53 weapon rows carry an energy rider)
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Great Weapon Master (trait) — the feature table, no call
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the grave-reaper" — the call's own answer (kind), built from the name
[reskin] inline form: "the grave-reaper" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] alignment by mind: "Neutral" -> Unaligned — a Undead the call reads as mindless at INT 6 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The grave-reaper plants its blade and lurches forward anyway: it moves" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Foes who break and run do not escape it: when a creature within the gr" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider
[reskin] signature idea (action): "The grave-reaper plants its blade and lurches forward anyway: it moves its Speed in a straight line through any number of creatures or obstacles, and each creature in that path must succeed on a Dexterity saving throw or take Slashing damage and be knocked Prone as the greatsword's flat sweeps them off their feet — the reaper never breaks stride and never turns aside." [action/save/condition] [family: breach] — menu: thrown-burst, throw-retrieve, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, gaze-single, snare, seal, lure, pacify, snare-bolt (+ shelf: rampage, second-wind, aggro-curse, self-invisibility, focus, answering-strike, affliction, contagion, stunning-strike, charge-push, pounce, life-drain, charge)
[reskin] composed candidates: none action — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), push-prone (save/condition)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: push-prone, snare, snare-bolt, seal, gaze-single — the key word does not mean the mechanic here
[reskin] closest refused: action — "ground-burst" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a multi-creature area of a line along the creature's own movement that)
[reskin] seat answered, but: the call said "The grave-reaper plants its blade and lurches forward anyway: it moves its Speed in a straight line through any number o" is carried by "Unbroken Death-Stride", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("a multi-creature area of a line along the creature's own movement that") and wrote an action instead: "Unbroken Death-Stride" -> Actions. *Dexterity Saving Throw*: DC 14, each creature in a 40-foot Line. *Failure:* 28 (8d6) Slashing damage, and the target ha
[reskin] authored row numbers: "Unbroken Death-Stride" — the call declared (unanswered) number(s) promised
[reskin] signature authored: no template — the seat wrote it -> Actions/"Unbroken Death-Stride" ("The grave-reaper plants its blade and lurches forward anyway: it moves its Speed in a straight line through any number of creatures or obstacles, and each creat [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Foes who break and run do not escape it: when a creature within the grave-reaper's reach or within the range of its Bone Shard moves away from it, the reaper can make one Greatsword attack against that creature as a Reaction before it leaves — the blade is already swinging through the space the coward vacated." [trait/start_of_turn/damage] [family: sentinel] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] signature miss: trait — "Foes who break and run do not escape it: when a creature within the grave-reaper's reach or within the range of its Bone Shard moves away from it, the reaper can make one Greatsword attack against that creature as a Reaction before it leaves — the blade is already swinging through the space the coward vacated." [trait/start_of_turn/damage] — no template on the shelf shares a verb with the concept or the idea (offered: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, weapon-lodge)
[reskin] weapons answered: Greatsword = greatsword; Bone Shard = none
[reskin] weapon dice follow the weapon: the GM's "Greatsword" is a greatsword (d6) — "13 (2d8 + 4)" becomes "14 (3d6 + 4)"
[reskin] weapon reach follows the weapon: the GM's "Greatsword" is a greatsword — reach 10 ft becomes 5 ft
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Skeleton's own type stands
[reskin] print canon alignment: Unaligned -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon attack: "Bone Shard" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] area swap gated: "Unbroken Death-Stride (Recharge 5-6)" deals 28 to an area in place of a 21 attack — print offers no at-will area swap that out-damages the attack it replaces (0 of its 24), so it takes print's Recharge
[reskin] multiattack replacement clause: It can replace one attack with a use of Unbroken Death-Stride (Recharge 5-6).
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Unbroken Death-Stride" [no template]
[reskin] name follows content: Actions/"Unbroken Death-Stride" promises movement the row never delivers — "Unbroken Death-Shove" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] multiattack re-read — "Unbroken Death-Stride" left; "Multiattack" now reads "The grave-reaper makes two Greatsword attacks."
[reskin] lint fixed: line-dimensions — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element expressed: Unbroken Death-Shove carries "two-handed greatsword cleaves" — "28 (8d6) Slashing damage"
[reskin] audit: [Unbroken Death-Shove (Recharge 5-6): The name prom…ch creature in a 40-foot-long, 5-foot-wide Line")]
[reskin] audit rename: "Unbroken Death-Shove (Recharge 5-6)" -> "Grave-Cleave (Recharge 5-6)"
[reskin] clause unresolved: "Grave-Cleave (Recharge 5-6)" carries "The grave-reaper plants its blade and lurches forward an", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] multiattack re-read — "Shortbow" joins the combination; "The grave-reaper makes two attacks, using Greatsword or Shortbow in any combination."
[reskin] done: "Grave-Reaper" — donor brute-5, CR 6
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 1 live (live from the audit call onward)
```

</details>

## 39-veteran-sellsword

**Typed:** `a sellsword who hurls a handaxe and closes with a shortsword`

**signature elements:** hurling a handaxe before closing [behavior] | shortsword work at close quarters [object] | sellsword's practical retreat when bloodied [behavior]

**identity:** A sellsword opens by hurling his handaxe at range — one heavy throw that thuds home — then draws steel and closes the distance on foot with shortsword and buckler, using the throw's stagger to time his advance. Each round after that he's a pressuring skirmisher: short in-and-out cuts, shoulder-first body-checks, and flanking footwork, always trying to force the enemy to fight him at blade length rather than at their own. Under pressure he fights to win, not to die — a bloodied sellsword backs off to re-hurl his axe or disengages, and only a cornered one fights to the death.

**lore:** A veteran of a dozen petty wars between border lords, he sells his axe-arm to whoever pays and wants only the next fight — and the purse that survives it.

### The sheet

```
Veteran Sellsword
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

Defensive Riposte.When the sellsword hits a creature with a Shortsword attack, the target has disadvantage on its next attack roll against the sellsword before the start of its next turn.
Riposte (Reaction).When a creature within 5 feet of the sellsword misses it with a melee attack roll, the sellsword makes one Handaxe attack against that creature.
Parry (Reaction).When the sellsword is hit by a melee attack roll while holding a weapon, the sellsword adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: The sellsword makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage. Immediately after the attack, his handaxe returns to the sellsword's grasp, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Shield Bash: One creature within 5 feet that the sellsword can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Grave-Reaper: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 38 taken name(s) the recording carried
[path] class_npc — class fighter — "sellsword" (call)
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] hints: hurler→style ✓ (""hurls a handaxe and closes"")
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=armed/bestial mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: thrown-weapon
[concept] signature elements: hurling a handaxe before closing [behavior] | shortsword work at close quarters [object] | sellsword's practical retreat when bloodied [behavior]
[concept] identity: A sellsword opens by hurling his handaxe at range — one heavy throw that thuds home — then draws steel and closes the distance on foot with shortsword and buckler, using the throw's stagger to time his advance. Each round after that he's a pressuring skirmisher: short in-and-out cuts, shoulder-first body-checks, and flanking footwork, always trying to force the enemy to fight him at blade length rather than at their own. Under pressure he fights to win, not to die — a bloodied sellsword backs off to re-hurl his axe or disengages, and only a cornered one fights to the death.
[concept] lore: A veteran of a dozen petty wars between border lords, he sells his axe-arm to whoever pays and wants only the next fight — and the purse that survives it.
[reskin] [path] class body: the fighter stands on the Gladiator — the class's own print block, nearest CR 5
[reskin] print canon defenses: HP 95 -> 112, AC 15 -> 16 — the Gladiator's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 16 (studded leather, shield) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 18, DEX 15, CON 16, INT 10, WIS 12, CHA 15 — the Gladiator's at its own CR; attack +6 -> +7, DC 15 (print's)
[reskin] donor: skirmisher-8-hurler -> CR 5 (invented — no printed peer)
[reskin] seats: action <- "sellsword's practical retreat when bloodied" | trait <- "shortsword work at close quarters"
[reskin] [path] decides: class_npc on the Gladiator · class fighter (the matcher would have said twist Warrior Veteran)
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Gladiator — print's rows ride along; the seat stays
[reskin] named parts: Handaxe (slot), Shortsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Vex on Handaxe, Vex on Shortsword — the feature table, no call
[reskin] class kit: fighter — "sellsword": Riposte (riposte)
[reskin] inline declared: "the sellsword" — the call's own answer (kind), built from the name
[reskin] inline form: "the sellsword" — the model's own reading of the name
[reskin] the sheet's declared ask: burst — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a sellsword" -> has (descriptive), head | "hurls a handaxe" -> has (mechanical) [asked: at_will/attack] | "closes with a shortsword" -> has (mechanical) [asked: attack]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "When the sellsword is Bloodied, it can Use an Action to make a tactica" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The sellsword's shortsword work is brutally efficient at close quarter" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 26 of 26 answered; not true of this body: snare, snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial, hook-rider, life-drain
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: action — thrown-burst-seed, snap-shot, guarded-stance (the sheet cannot render them)
[reskin] signature idea (action): "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without provoking Opportunity Attacks, and each creature that can see it must succeed on a Wisdom saving throw or have Disadvantage on its next attack roll against the sellsword before the start of its next turn, as the sellsword's feigned panic and sudden reversal sow doubt." [trait/start_of_turn/movement] [family: mark] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate (+ shelf: condition-payoff, throw-retrieve, shield-bash, lure, sensory-strike, disarm, delayed-brand, exploiter, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, affliction, contagion, stunning-strike, charge-push, pounce, isolation, bolt-mark)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires start_of_turn/does movement; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), relentless-pursuit (always/movement)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack when=at_will
[reskin] word match declined by the call: relentless-pursuit, berserk, bloodied-fury, blood-frenzy, bound — the key word does not mean the mechanic here
[reskin] closest refused: action — "aggro-curse" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: lets the sellsword move its Speed without provoking Opportunity Attack)
[reskin] seat answered, but: the call said "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without pro" is carried by "Feigned Rout", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (refused: "Feigned Rout" — the call counts 2 mechanics in one row — one row, one mechanic) (it belongs in the description)
[reskin] seat asked again: action — the first answer was refused ("Feigned Rout" — the call counts 2 mechanics in one row — one row, one mechanic); asking once more with the reason
[reskin] seat answered, but: the call said "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without pro" is carried by "Feigned Rout", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (refused: "Feigned Rout" — the call counts 2 mechanics in one row — one row, one mechanic) (it belongs in the description)
[reskin] seat refused twice: action — first: "Feigned Rout" — the call counts 2 mechanics in one row — one row, one mechanic; second: "Feigned Rout" — the call counts 2 mechanics in one row — one row, one mechanic; the seat stays empty
[reskin] closest refused — subject flipped: action — the call named "aggro-curse" nearest and judged its subject FLIPPED against the clause (lets the sellsword move its Speed without provoking Opportunity Attack); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without provoking Opportunity Attacks, and each creature that can see it must succeed on a Wisdom saving throw or have Disadvantage on its next attack roll against the sellsword before the start of its next turn, as the sellsword's feigned panic and sudden reversal sow doubt." [trait/start_of_turn/movement] — the model found no template that holds it (offered: truth-aura, fear-aura, relentless-pursuit, bound, aggro-curse, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relic-object, guarded-stance, undead-fortitude, assassinate)
[reskin] fallback stands down: the class_npc path has no shelf — the Gladiator's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 5, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against the sellsword before the start of its next turn, as the sellsword's buckler and footwork crowd the target's guard." [trait/always/condition] [family: mark] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (always/condition): phobia, berserk; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), berserk (always/condition), bloodied-fury (always/defense)
[reskin] classification handed to the fit call: mechanic=thrown-weapon shape=attack when=at_will
[reskin] word match declined by the call: phobia, berserk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, assassinate, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: makes the target's attack against the sellsword Disadvantage after a S)
[reskin] seat answered, but: the call said "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attac" is carried by "Crowded Guard", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("makes the target's attack against the sellsword Disadvantage after a S") and wrote a trait instead: "Crowded Guard" -> Traits. When the sellsword hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against
[reskin] authored row numbers: "Crowded Guard" — the call declared 0 number(s) promised
[reskin] free signature row: "Crowded Guard" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Crowded Guard" ("The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attack, the target has Disadvantage on its ne [authored: the catalog held no shape for it]")
[reskin] weapons answered: Shortsword = shortsword; Handaxe = handaxe; Hurlaxe Return = handaxe; Thorngrip Handaxe = handaxe
[reskin] weapon dice follow the weapon: the GM's "Shortsword" is a shortsword (d6) — "8 (1d8 + 4)" becomes "7 (1d6 + 4)"
[reskin] chassis nova: "Hurlaxe Return (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Gladiator's own type stands
[reskin] print canon multiattack: "the sellsword makes three Spear attacks. It can replace one attack with a use of Shield Bash." — the Gladiator's own
[reskin] print canon saves: proficient in STR, DEX, CON, WIS — the Gladiator's own set, at this sheet's stats and PB 3 (changed STR, CON)
[reskin] print canon skills: "Perception +4, Stealth +5" -> "Athletics +10, Performance +5" — the Gladiator's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Hurlaxe Return (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Gladiator's
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Skirmisher's Footwork" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Shield Bash — the Gladiator's own
[reskin] print canon row: Reactions/Parry — the Gladiator's own
[reskin] multiattack reconciled: "Spear" is no row on this sheet — the Multiattack cites "Handaxe" instead
[reskin] multiattack reconciled: "Shield Bash" is no row on this sheet — the Multiattack cites "Shortsword" instead
[reskin] free-row budget by card size: CR 5 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Crowded Guard" [no template]
[reskin] ask vs row ok: "hurls a handaxe" -> "Handaxe" — trigger at_will
[reskin] sheet lint: inline-weapon-collision: header/inline: "the sellsword" is the weapon "longsword" — its own rows will read as the weapon's
[reskin] lint: inline-weapon-collision: header/inline: "the sellsword" is the weapon "longsword" — its own rows will read as the weapon's
[reskin] element expressed: Crowded Guard carries "shortsword work at close quarters" — "When the sellsword hits a creature with a Shortsword attack, the target has Disa"
audit finding below confidence gate: Multiattack Three Handaxes at 20/60 ft. means the sellsword can kite at range with no need ever to close, so the Multiattack's 'replace one with Shortsword' option is nearly never worth taking.
[reskin] audit: [Shortsword: The Shortsword hit grants a handaxe-re…k, his handaxe returns to the sellsword's grasp"), Handaxe: The Handaxe grants Advantage against the …inst the target before the end of its next turn"), Crowded Guard: A trait named for guarding crowded …e on its next attack roll against the sellsword")]
[reskin] audit rename: "Crowded Guard" -> "Defensive Riposte"
[reskin] audit defect: Actions/"Shortsword" [model-written] high other — The Shortsword hit grants a handaxe-return effect that belongs to the thrown Handaxe, edits a weapon the attack doesn't use with a pronoun ('his'), and applies a fail-free Advantage rider on both hit and miss. — Move the handaxe-return clause onto the Handaxe attack and give Shortsword its own hit clause with a clean pronoun. (about: "*Hit or Miss:* Immediately after the attack, his handaxe returns to the sellsword's grasp")
[reskin] audit defect: Actions/"Handaxe" [model-written] medium dead_reference — The Handaxe grants Advantage against the target that survives to the end of the sellsword's next turn, but nothing states the thrown axe leaves its grasp during that window, so the 'returns to his grasp' text in Shortsword contradicts it. — State in the Handaxe that the thrown axe is away until it returns, so the Shortsword return clause has a referent. (about: "the sellsword has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Defensive Riposte" carries "The sellsword's shortsword work is brutally efficient at", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Riposte" carries "sellsword" which is not a whole clause — the seat surgery cut it; resolved to cl_16u4r8s
[reskin] [gap] lets the sellsword move its Speed without provoking Opportunity Attacks while doubting attackers suffer Disadvantage on  — "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without provoking Opportunity Attacks, and each creature that can see it must succeed on a Wisdom saving throw or have Disadvantage on its next attack roll against the sellsword before the start of its next turn, as the sellsword's feigned panic and sudden reversal sow doubt." — Veteran Sellsword [seat: action [trait/start_of_turn/movement]] (closest offered: aggro-curse) [effect: movement] [menu: truth-aura fear-aura relentless-pursuit bound aggro-curse phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind evasion relic-object guarded-stance undead-fortitude assassinate] [same-cell unoffered: none] [same-seat rejected: energy-aura:deny-type noxious-aura:deny-type warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Veteran Sellsword" — donor skirmisher-8-hurler, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 10 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>

## 40-brother-halric

**Typed:** `name: Brother Halric |`

**signature elements:** chains that snare and drag [object] | the stalking of the guilty at dusk [behavior] | a body of grave-dirt and cold iron [body]

**identity:** Brother Halric is a parish confessor whose secret penance is the hunt: he opens a fight from shadow with a hurled weight of grave-earth and iron chain, dragging his quarry off its feet before closing. Every round after he circles at the edge of lantern light, loosing chains to snare and wrench limbs while murmuring the sins of his target, and he prefers to take a struggling body alive. Under pressure he never breaks and runs; he goes quiet, retreats into the dark, and stalks the wounded until their fear does the work for him.

**lore:** A parish brother who buried too many secret sins in the churchyard and was bound to the dirt he buried, Halric now walks the roads at dusk dragging chains, collecting the guilty for a confession no one survives.

### The sheet

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
Multiattack: Halric makes two attacks, using Mace or Radiant Flame.
Mace: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 5 (2d4) radiant damage.
Radiant Flame: Ranged Weapon Attack: +5 to hit, range 60 ft., one target. Hit: 11 (2d10) radiant damage.
Snaring Chain (Recharge 5-6): One Large or smaller creature Halric can see within 60 feet must make a DC 13 Dexterity saving throw. On a failed save, the target is caught in chain and is restrained until the chain is destroyed (AC 10; HP 10; Vulnerability to slashing damage; Immunity to Poison and psychic damage).
Spellcasting: Halric casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 13): - At will: Light, Thaumaturgy
1/day each: Spirit Guardians
```

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Veteran Sellsword: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795046145347:663:5)
[harness] restored 39 taken name(s) the recording carried
[concept] thin concept expanded before routing: Brother Halric — Brother Halric is a parish confessor whose secret penance is the hunt: he opens a fight from shadow with a hurled weight of grave-earth and iron chain, dragging his quarry off its feet before closing. Every round after he circles at the edge of lantern light, loosing chains to snare
[concept] expansion answered: type=Undead (type_source=inferred) material=grave size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: snare
[path] class_npc — class cleric — "Brother" (call)
[route] skirmisher-skulker type=Humanoid mechanics=snare, thrown-weapon — casts: the call reads no worked magic here | hold_shape refused: the call answered reach but quoted "loosing chains to snare and wr", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("he opens a fight from shadow with a hurl") | skirmisher-hurler -> skirmisher-skulker: the concept's VERB outranks the noun (key "stalks", class verb) | skirmisher-skulker: key "stalks" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=grave/grasping mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Brother Halric"
[concept] mechanics: snare, thrown-weapon
[concept] signature elements: chains that snare and drag [object] | the stalking of the guilty at dusk [behavior] | a body of grave-dirt and cold iron [body]
[concept] identity: Brother Halric is a parish confessor whose secret penance is the hunt: he opens a fight from shadow with a hurled weight of grave-earth and iron chain, dragging his quarry off its feet before closing. Every round after he circles at the edge of lantern light, loosing chains to snare and wrench limbs while murmuring the sins of his target, and he prefers to take a struggling body alive. Under pressure he never breaks and runs; he goes quiet, retreats into the dark, and stalks the wounded until their fear does the work for him.
[concept] lore: A parish brother who buried too many secret sins in the churchyard and was bound to the dirt he buried, Halric now walks the roads at dusk dragging chains, collecting the guilty for a confession no one survives.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the cleric stands on the Priest — the class's own print block, nearest CR 3
[reskin] print canon route: the Priest's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 58 -> 38, AC 13 -> 13 — the Priest's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon armor: 13 (chain shirt) — print's Gear line; the 2014 sheet prints it (the Goblin Boss wore "splint", canaries 2026-10-12)
[reskin] print canon array: STR 16, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-3 -> CR 3
[reskin] seats: action <- "the stalking of the guilty at dusk" | trait <- "chains that snare and drag"
[reskin] [path] decides: class_npc on the Priest · class cleric (the matcher would have said homebrew)
[reskin] print canon: "Brother Halric" heads on the Priest — print's rows ride along; the seat stays
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Brother": nothing to add — the sheet already answers it
[reskin] proper noun: "Brother Halric" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Halric" — the call's own answer (person), built from the name; the rules would have said "the brother"
[reskin] inline on stamped rows: "the brother" -> "Halric" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "Halric" — the model's own reading of the name
[reskin] the sheet's declared ask: snare — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Brother Halric" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "Halric snaps a length of chain around the legs or neck of a creature w" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Halric's senses are bent toward the guilty: he knows the direction and" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: shield-bash, random-ray, spew, blink, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, web-walker, uncanny-sense, marking-light, warded-mending, gaze-aura, blurred-form, death-burst, kill-denial, life-drain
[reskin] signature idea (action): "Halric snaps a length of chain around the legs or neck of a creature within range; on a failed save the target is Restrained, and while Restrained it can be dragged along with him when he moves, the iron biting tighter the further he hauls. The snare ends if he is Incapacitated or the chain is severed." [action/save/condition] [family: drag] — menu: gaze-single, snare, throw-retrieve, lure, ground-burst, snare-bolt, sensory-strike, disarm, thrown-burst-seed, seal, pacify, escalating-dread, terror-pulse, push-prone, reveal (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, snap-shot, riposte, answering-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — snare: snare, snare-bolt
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: snare (save/condition), snare-bolt (save/condition), gaze-single (save/condition)
[reskin] classification handed to the fit call: mechanic=snare, thrown-weapon
[reskin] word match declined by the call: snare-bolt, throw-retrieve, hook-rider — the key word does not mean the mechanic here
[reskin] free signature row: "Snaring Chain (Recharge 5-6)" — a print body takes only what the user's words ask, but the call names the element it expresses: "chains that snare and drag". Earns no clause credit; the budget settles on the finished sheet
[reskin] signature template: snare -> Actions/"Snaring Chain (Recharge 5-6)" ("a chain that Restrains a creature until the physical thing holding it is destroy [verb: snare:idea, chain:idea]")
[reskin] signature idea (trait): "Halric's senses are bent toward the guilty: he knows the direction and rough distance of any creature that has harmed another creature since his last long rest, slipping through the dusk toward it as though following a scent only he can smell." [trait/always/movement] [family: mark] — menu: spider-climb, phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, mimicry, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] classification handed to the fit call: mechanic=snare, thrown-weapon
[reskin] word match declined by the call: bound, bloodied-fury, blood-frenzy, spider-climb — the key word does not mean the mechanic here
[reskin] trait declined: "Scent of Guilt" — a print body takes only what the user's words ask; the call quotes "brother halric", which is the creature itself, a header directive, the half of a clause the lack sweep takes away, or the weapon a part row already carries
[reskin] weapons answered: Chain = none; Grave-Earth = none
[reskin] weapon table: "Grave-Earth" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Evil -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Chain" -> "Mace" — the Priest's own row
[reskin] print canon multiattack: "Halric makes two attacks, using Mace or Radiant Flame in any combination." — the Priest's own
[reskin] print canon attack: "Radiant Flame" is print's own row — +5, 11 (2d10), range 60 ft. (an exact body at print's CR)
[reskin] print canon attack: "Grave-Earth" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon saves: proficient in nothing — the Priest's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon skills: "Perception +5, Stealth +2" -> "Medicine +7, Perception +5, Religion +5" — the Priest's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon: chassis row leaves — Traits/"Shadowstep" is the chassis's filler — on a class body the kit owns the class's rows
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] class weapon: "mace" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Snaring Chain" [action/save/condition]
[reskin] lint: 0 findings
[reskin] element expressed: Snaring Chain carries "chains that snare and drag" — "The target is caught in chain and has the Restrained condition until the chain i"
[reskin] audit: [Snaring Chain (Recharge 5-6): The text gives the c… damage; Immunity to Poison and Psychic damage)"), Snaring Chain (Recharge 5-6): The row's fiction pr…aught in chain and has the Restrained condition")]
[reskin] audit defect: Actions/"Snaring Chain" [model-written] high untrackable — The text gives the chain an AC, HP and damage defenses but never says where the chain is — whether it is a distinct object that occupies a space, is attached to the target, or is part of Halric — so the destroy-it escape cannot be resolved (who can reach it, where it stands, whether attacking it risks hitting the restrained target). — State the chain's location or attachment so the table knows what can attack it and from where. (about: "until the chain is destroyed (AC 10; HP 10; Vulnerability to Slashing damage; Immunity to Poison and Psychic damage)")
[reskin] audit defect: Actions/"Snaring Chain" [model-written] medium other (the audit said "undelivered") — The row's fiction promises a chain that snares and drags, but the rules only Restrain in place with no movement or drag anywhere in the text, so the 'drag' the row was written for is undelivered. — Add a movement clause that pulls the target toward Halric (or drop the drag framing from the name). (about: "caught in chain and has the Restrained condition")
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Brother Halric" — donor skirmisher-3, CR 3
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 2 live (live from the audit call onward)
```

</details>
