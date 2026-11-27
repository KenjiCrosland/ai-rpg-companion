# BLOCKS — the canary forty after the ledger and the protected row (2026-11-26)

Strict replay of `baseline-2026-11-25` after Parts A and B. Diffed block by block against
`BLOCKS-the-forty-broken-text-2026-11-25.md`: **38 of 38 identical, none changed.** No canary sheet
was re-recorded and none missed at any call.

Part B's guard fires three times here — on Pit Fiend's `Sulfurous Reek`, Vashka's `Hold the Wall`
and the marsh witch's `Cursed Wake` — and changes no block, because the old code kept all three by
the "first of its kind" allowance anyway. Under the six-sheet stop rule.

`generation.ledger` is new on every sheet and a bound row carries a `clauseBy` stamp, so a strict
replay reports `DIFFERS (generation)` on sheets whose printed block is byte-identical. Measured on
s13: its `Swallow` row is the only one carrying the new stamp, and its block is unchanged.

---

## 01-dire-wolf

## 01. Dire Wolf — CR 1

**Input:** `name: Dire Wolf | with a frost-rimed hide`
**Donor:** skirmisher-1 -> CR 1
**Signature:** library

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

Pack Tactics. The wolf has Advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Herd-Cutter (Recharge 5-6). Strength Saving Throw: DC 13, one creature within 5 feet. Failure: The target has the Prone condition.

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
[harness] restored 0 taken name(s) the recording carried
[path] twist — Dire Wolf (is) — "Name field: Dire Wolf" (code)
[route] skirmisher type=Beast mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher: ✓ ("Dire Wolf") | skirmisher-skulker: the call read "hide" as not meaning that mechanic here — no override | skirmisher stands: every key that would override it was read as a figure of speech | skirmisher: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "fire" is a guess from what the creature is, not the GM's ask
[concept] name: "Dire Wolf" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] mind promoted to sapient — the identity asserts performance/taunting
[concept] resolve: archetype=skirmisher type=Beast typeFrom=the route call themes=bestial mind=sapient style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: provided "Dire Wolf"
[concept] mechanics: none claimed
[concept] signature elements: frost-rimed hide [body] | pack-tactics flanking hunt [behavior] | hamstring-and-withdraw circling [behavior]
[concept] identity: A frost-rimed dire wolf opens by shadowing the pack's chosen prey at a lope, spreading wide so the herd's panic breaks toward its waiting kin, then darts in for a hamstringing bite and wheels away before retaliation can land. Every round it circles, feints, and snaps at the flank, using the frozen crust of its hide to shrug off the first weak blows while it waits for an opening to drag down a straggler. It is a patient, calculating pack hunter that does not toy with prey but will abandon a losing fight to regroup with the pack and come back at a better angle.
[concept] lore: Frost-rimed dire wolves are the lean winter-ghosts of the northern treeline, born where starving packs den through the killing frost, and they want only to drive a whole herd into the snow and take the weakest of it.
[reskin] print canon defenses: HP 30 -> 22, AC 15 -> 14 — the Dire Wolf's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 17, DEX 15, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's at its own CR; attack +4 -> +5, DC 13 (print's)
[reskin] donor: skirmisher-1 -> CR 1
[reskin] seats: action <- "pack-tactics flanking hunt" | trait <- "frost-rimed hide"
[reskin] [path] decides: twist on the Dire Wolf (the matcher agrees)
[reskin] print canon: "Dire Wolf — with a frost-rimed hide" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] claim gate: CR 1 but a Beast body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the wolf" — the call answered "the dire wolf" (kind), which the name does not support
[reskin] inline on stamped rows: "the dire wolf" -> "the wolf" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] final price: the chassis's Multiattack: the round ran 14 against the card's 10 — the attack rows re-solve at 75% (2 attacks off one row after a supersede)
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dire Wolf — with a frost-rimed hide" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "When the wolf hits a creature that has no ally of its own within reach" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The wolf moves along the line of its pack's pursuit as one, and when a" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: snare, shield-bash, snare-bolt, blink, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, web-walker, noxious-aura, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, life-drain
[reskin] signature idea (action): "When the wolf hits a creature that has no ally of its own within reach of it, the bite drops the target Prone as the wolf's weight and the frozen crust of its shoulder slam the legs out from under it — the straggler cut from the herd goes down in the snow." [rider/on_hit/condition] [family: payoff] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: lure, spew, sensory-strike, disarm, thrown-burst-seed, delayed-brand, slow-bolt, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, answering-strike)
[reskin] composed candidates on the menu: action — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: contagion (on_hit/condition), pounce (on_hit/condition), composed:payoff:condition (on_hit/condition)
[reskin] keys would have bound: action — slow-bolt (frost)
[reskin] word match declined by the call: contagion, composed:payoff:condition — the key word does not mean the mechanic here
[reskin] closest refused: action — "pounce" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: knocks the target Prone on a hit without requiring a charge, when no a)
[reskin] seat answered, but: the call said "When the wolf hits a creature that has no ally of its own within reach of it, the bite drops the target Prone as the wol" is carried by "Herd-Cutter", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write an action for "When the wolf hits a creature that has no ally of its own within reach" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat answered, but: the call said "When the wolf hits a creature that has no ally of its own within reach of it, the bite drops the target Prone as the wol" is carried by "Herd-Cutter", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("knocks the target Prone on a hit without requiring a charge, when no a") and wrote an action instead: "Herd-Cutter" -> Actions. *Strength Saving Throw*: DC 13, one creature within 5 feet. *Failure:* The target has the Prone condition.
[reskin] authored row numbers: "Herd-Cutter" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Herd-Cutter" after "you wrote no row of the kind asked for (an action)"
[reskin] signature authored: no template — the seat wrote it -> Actions/"Herd-Cutter" ("When the wolf hits a creature that has no ally of its own within reach of it, the bite drops the target Prone as the wolf's weight and the frozen crust of its s [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The wolf moves along the line of its pack's pursuit as one, and when another frost-rimed wolf has a creature within its reach, this wolf's Fang attacks against that creature are made with Advantage; it circles wide, feints, and closes only where its kin have already opened the flank." [trait/always/damage] [family: mark] — menu: phobia, terrain-walk, faultless-tracker, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), phobia (always/condition)
[reskin] word match declined by the call: blood-frenzy, uncanny-sense — the key word does not mean the mechanic here
[reskin] free signature row: "Pack Flank" — the trait seat cannot quote the GM, but the call names the element it expresses: "pack-tactics flanking hunt". Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] seat takes its clause: "Pack Flank" is HANDED "with a frost-rimed hide" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): pack-tactics -> Traits/"Pack Flank" ("another wolf with a creature in its reach gives this wolf Advantage on Fang atta [verb: pack:idea, flanks:idea]")
[reskin] one mechanic, one name: Traits/"Pack Flank" -> "Pack Tactics" — this row is pack-tactics and does what every pack-tactics row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Fang = none
[reskin] print canon size: Medium -> Large — the Dire Wolf's
[reskin] print canon speed: 30 ft. -> 50 ft. — the Dire Wolf's walk; the concept's other modes stay
[reskin] print canon attack: "Fang" -> "Bite" — the Dire Wolf's own row
[reskin] print canon multiattack: "The wolf makes two Bite attacks." leaves — the Dire Wolf makes ONE attack at its own CR (print names no Multiattack) and the sheet carries print's own row numbers
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] element immunity: Cold — the call read this creature's energy as Cold and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Cold (merged into the header write)
[reskin] immunities stamped for type: Beast -> Cold
[reskin] print canon saves: proficient in nothing — the Dire Wolf's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon skills: "Perception +3, Stealth +4" -> "Perception +5, Stealth +4" — the Dire Wolf's own skills, each derived from this sheet's stat and PB
[reskin] print canon trait: Pack Tactics — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Ward" is the seat's, not the Dire Wolf's
[reskin] dead control row: "Herd-Cutter (Recharge 5-6)" takes a Recharge — an at-will condition action with no Multiattack to join is a whole action for a condition, and print gates that shape
[reskin] free row kept as one of its kind: Actions/"Herd-Cutter" stays — the first non-trait row kept, and print's card for CR 1 has room for 3 (budget 1, 1 kept so far)
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 2 kept (budget 1) — "Pack Tactics" [trait/always/damage], "Herd-Cutter" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Pack Tactics carries "pack-tactics flanking hunt" — "at least one of the wolf's allies is within 5 feet of the creature"
[reskin] element claim revoked: "Herd-Cutter" claims "frost-rimed hide" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 2 free row(s) express nothing their rules carry — counted as decoration ("Herd-Cutter")
[reskin] audit: [Herd-Cutter (Recharge 5-6): The recharge action's …"*Failure:* The target has the Prone condition."), Herd-Cutter (Recharge 5-6): The name promises a sc…ving Throw*: DC 13, one creature within 5 feet."), Herd-Cutter (Recharge 5-6): Nothing in the row exp…"*Failure:* The target has the Prone condition."), Pack Tactics: The trait's text says 'the wolf' but… ally doesn't have the Incapacitated condition.")]
[reskin] audit defect: Actions/"Herd-Cutter" [model-written] high weak — The recharge action's entire payload is Prone, a condition the target can shed by standing at a cost of half its movement, making the row strictly worse than simply Biting. — Give the save a payload with real teeth beyond Prone — something the target cannot simply stand up from. (about: "*Failure:* The target has the Prone condition.")
[reskin] audit defect: Actions/"Herd-Cutter" [model-written] high misnamed — The name promises a scything, area-cutting frost attack, but the text resolves against a single adjacent creature with no cutting, area, or Cold element at all. — Rebuild the entry so the mechanics deliver a wide, Cutter-style assault in line with the name. (about: "*Strength Saving Throw*: DC 13, one creature within 5 feet.")
[reskin] audit defect: Actions/"Herd-Cutter" [model-written] high undelivered — Nothing in the row expresses the frost-rimed hide the GM asked for — no Cold damage, no slowing or numbing effect. — Have the row's payload carry the frost-rimed feature, e.g. Cold damage or a cold-themed condition rider. (about: "*Failure:* The target has the Prone condition.")
[reskin] audit defect: Traits/"Pack Tactics" [print] medium other — The trait's text says 'the wolf' but the statblock's name is Dire Wolf, an internally inconsistent referent. — Refer to the creature by its own name (Dire Wolf) rather than 'the wolf'. (about: "The wolf has Advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Herd-Cutter (Recharge 5-6)" carries "When the wolf hits a creature that has no ally of its ow", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 1 decoration, 2 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Dire Wolf" — donor skirmisher-1, CR 1
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 01-dire-wolf.json — fields: generation
```

---

## 02-bog-hound

## 02. Bog Hound — CR 1

**Input:** `a mud-caked bog hound that drags fishermen under`
**Donor:** brute-5-grappler -> CR 1
**Signature:** library

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

Living Mire.While it stands in water, mud, or marsh, the bog hound is invisible to creatures more than 30 feet away from it, and it leaves no trail.

Actions
Multiattack: The bog hound makes two Bite attacks. It can replace one attack with a use of Muck-Lunge.
Bite: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage. If the target is a Large or smaller creature, it is grappled (escape DC 11). While grappled, the target is restrained.
Muck-Lunge: One creature within 5 feet must succeed on a DC 13 Strength saving throw or take 3 (1d6) piercing damage, and the target is pulled up to 5 feet straight toward the bog hound, and the target is prone.
```

### Trace
```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
!! [ENRICHMENT] Failed to enrich Dire Wolf: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 1 taken name(s) the recording carried
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
[reskin] value check: "Muck-Lunge" EV 2.5 vs floor 3.1 (one attack of 2) — half a hit added: 3 (1d6) Piercing damage on a failed save — half of one 6-damage hit, the attack this row stands in place of; still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature under the floor, and kept: "Muck-Lunge" — the ladder could not lift it and nothing stands in, so the row the model wrote stays as written
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
[reskin] free row kept as one of its kind: Traits/"Living Mire" stays — the first trait kept, and print's card for CR 1 has room for 3 (budget 1, 1 kept so far)
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 2 kept (budget 1) — "Muck-Lunge" [no template], "Living Mire" [no template]
[reskin] ask vs row MISMATCH: "drags fishermen under" -> "Bite" — trigger: asked on_hit, row reads at_will
[reskin] lint: 0 findings
[reskin] element claim revoked: "Muck-Lunge" claims "dragging fishermen under the water" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] element claim revoked: "Living Mire" claims "dragging fishermen under the water" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 2 of 2 free row(s) express nothing their rules carry — counted as decoration ("Muck-Lunge", "Living Mire")
[reskin] audit: [Living Mire: The trait grants Invisible only relat…ion to creatures more than 30 feet away from it"), Muck-Lunge: The pull and the Prone both cost the t…g hound, and the target has the Prone condition"), Muck-Lunge: A creature already adjacent to the hou…lled up to 5 feet straight toward the bog hound")]
[reskin] audit defect: Traits/"Living Mire" [model-written] high untrackable — The trait grants Invisible only relative to far creatures but never states a radius or area of effect, so the GM cannot tell where the creature is hidden and players get no way to perceive or locate it. — State an area or radius the concealment applies within, and add a clause on how a creature can detect or reveal the hound despite it. (about: "has the Invisible condition to creatures more than 30 feet away from it")
[reskin] audit defect: Actions/"Muck-Lunge" [model-written] medium undelivered — The pull and the Prone both cost the target nothing to ignore if the hound cannot follow up, and nothing in the row does the dragging-under the request names; the target simply ends next to the hound. — Add a clause that keeps the pulled creature held in the muck or restrained until it escapes, so the grab actually delivers the drag. (about: "the target is pulled up to 5 feet straight toward the bog hound, and the target has the Prone condition")
[reskin] audit defect: Actions/"Muck-Lunge" [model-written] high other — A creature already adjacent to the hound (the only valid target, since reach is 5 feet) cannot be pulled closer than its own square, so the signature drag never moves the victim anywhere. — Make the pull happen before the target is considered adjacent, or replace it with a knockdown that keeps the hound's grip on the target. (about: "pulled up to 5 feet straight toward the bog hound")
[reskin] clause unresolved: "Muck-Lunge" carries "When the bog hound is grappling a creature, it can drag ", which matches no clause on the sheet — no coverage credit by id
[reskin] clause unresolved: "Living Mire" carries "The bog hound's hide is a working crust of living mud. W", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 2 decoration, 2 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Bog Hound" — donor brute-5-grappler, CR 1
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 1 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 02-bog-hound.json — fields: generation, other_edition
```

---

## 03-owlbear

## 03. Owlbear — CR 3

**Input:** `name: Owlbear | that has learned to climb`
**Donor:** skirmisher-3 -> CR 3
**Signature:** library

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
!! [ENRICHMENT] Failed to enrich Bog Hound: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 2 taken name(s) the recording carried
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
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 03-owlbear.json — fields: generation, other_edition
```

---

## 04-passing-bell-ringer

## 04. Passing Bell Ringer — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-2 -> CR 3
**Signature:** library

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
!! [ENRICHMENT] Failed to enrich Owlbear: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 3 taken name(s) the recording carried
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
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 04-passing-bell-ringer.json — fields: generation
```

---

## 05-air-elemental

## 05. Air Elemental — CR 5

**Input:** `name: Air Elemental | that carries stolen voices`
**Donor:** brute-5 -> CR 5
**Signature:** library

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

Skills Athletics +5, Perception +3

Resistances Bludgeoning, Lightning, Piercing, Slashing

Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious

Senses darkvision 60 ft.; Passive Perception 13

Languages Primordial (Auran)

CR 5 (XP 1,800; PB +3)

Traits

Cage of Stolen Cries. Whenever a creature dies within 10 feet of the elemental, the elemental regains 9 (2d8) Hit Points, and its Thunderous Slam deals an extra 9 (2d8) Thunder damage until the end of its next turn.

Air Form. The elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The elemental makes two Thunderous Slam attacks. It can replace one attack with a use of Howling Vortex.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Howling Vortex. Dexterity Saving Throw: DC 13, one creature within 10 feet. Failure: The target is pulled up to 10 feet straight toward the air elemental, and the target has the Deafened condition until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Passing Bell Ringer: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] twist — Air Elemental (is) — "Name field: Air Elemental" (code)
[route] brute-juggernaut type=Elemental mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("Air Elemental") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] name: "Air Elemental" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/voice mind=sapient style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "Air Elemental"
[concept] mechanics: none claimed
[concept] signature elements: engulfing screaming gale [behavior] | a cage of stolen voices [body] | the deafening shriek it vents [aura]
[concept] identity: A howling vortex of storm-air whose body is a churning cage of stolen voices, it opens by rushing a foe and engulfing them in screaming wind, drowning out thought and breath. Each round it keeps prey inside its gale, lashing with compressed air and venting a stolen scream as a Thunder crack that staggers and deafens. It fights to the death — an elemental has no self to preserve — but it toys with what it swallows, echoing fragments of the voices it has taken and shifting its shriek to match them before crushing them silent.
[concept] lore: Born from a killing wind that tore through a battlefield or a plague-town, it hoards the last cries of the dying and carries them forever, hunting new throats to fill the silence it cannot bear.
[reskin] print canon route: the Air Elemental's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 89 -> 90, AC 14 -> 15 — the Air Elemental's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 14, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's at its own CR; attack +6 -> +8, DC 13 (print's)
[reskin] donor: brute-5 -> CR 5
[reskin] seats: action <- "engulfing screaming gale" | trait <- "a cage of stolen voices"
[reskin] [path] decides: twist on the Air Elemental (the matcher agrees)
[reskin] print canon: "Air Elemental — that carries stolen voices" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the elemental" — the call answered "the air elemental" (kind), which the name does not support
[reskin] inline on stamped rows: "the air elemental" -> "the elemental" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "the air elemental" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Air Elemental —" -> has (descriptive), head | "carries stolen voices" -> has (mechanical) [asked: save_single] [askMechanic: dazzle]
[reskin] open asks handed to the idea call: "carries stolen voices" [dazzle]
[reskin] idea anchored: action — "The elemental drives its howling body over one creature it can see wit" answers the GM's "carries stolen voices"
[reskin] idea unanchored: trait — "Whenever a creature dies within the elemental's gale, its final cry is" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "carries stolen voices", so role and style do not filter the menu (legality still does); 17 template(s) offered
[reskin] signature idea (action): "The elemental drives its howling body over one creature it can see within reach: the target must succeed on a Dexterity saving throw or be engulfed, pulled into the vortex's space and Restrained there, deafened, and unable to speak or cast spells with verbal components as stolen voices scream around it. A Restrained creature repeats the save at the start of each of its turns, and on a success is f" [action/save/condition] [family: drag] — menu: trample, active-toll, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, execute, wail, lure, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: leap, delayed-brand, rampage, second-wind, aggro-curse, self-invisibility, focus, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, stunning-strike, charge-push, pounce, charge, isolation)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), push-prone (save/condition)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: escalating-dread, terror-pulse, push-prone, lure, pacify, sensory-strike, reveal, trample, active-toll, ground-burst, thrown-burst-seed, wind-up, execute, slow-bolt, disarm, curse-debt, wail — the key word does not mean the mechanic here
[reskin] closest refused: action — "sensory-strike" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a save that engulfs the target into the creature's space and restrains)
[reskin] authored row answers the GM: action — "Howling Vortex" was written for "carries stolen voices", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a save that engulfs the target into the creature's space and restrains") and wrote an action instead: "Howling Vortex" -> Actions. *Dexterity Saving Throw*: DC 13, one creature within 10 feet. *Failure:* The target is pulled up to 10 feet straight tow
[reskin] authored row numbers: "Howling Vortex" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Howling Vortex" is HANDED "carries stolen voices" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Howling Vortex" ("The elemental drives its howling body over one creature it can see within reach: the target must succeed on a Dexterity saving throw or be engulfed, pulled into [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Whenever a creature dies within the elemental's gale, its final cry is torn away and added to the churning cage: the elemental regains hit points and its Slam deals an extra die of Thunder damage until the end of its next turn, and the stolen voice is heard wailing in its body thereafter." [trait/always/resource] [family: heal] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, mimicry, truth-aura, fear-aura (+ shelf: resonant-body, weapon-lodge)
[reskin] lead by this seat's own clause: trait — "dazzle" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: phobia (always/condition), bloodied-fury (always/defense), blood-frenzy (always/damage)
[reskin] keys would have bound: trait — mimicry (stolen voice, stolen voices, voices)
[reskin] classification handed to the fit call: shape=save_single
[reskin] word match declined by the call: mimicry, death-restoration, fear-aura, truth-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "mimicry" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: regains hit points and adds Thunder damage when a creature dies in its)
[reskin] seat answered, but: the call said "Whenever a creature dies within the elemental's gale, its final cry is torn away and added to the churning cage: the ele" is carried by "Cage of Stolen Cries", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("regains hit points and adds Thunder damage when a creature dies in its") and wrote a trait instead: "Cage of Stolen Cries" -> Traits. Whenever a creature dies within 10 feet of the elemental, the elemental regains 9 (2d8) hit points, and its Slam deals a
[reskin] authored row numbers: "Cage of Stolen Cries" — the call declared 2 number(s) promised
[reskin] free signature row: "Cage of Stolen Cries" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Cage of Stolen Cries" ("Whenever a creature dies within the elemental's gale, its final cry is torn away and added to the churning cage: the elemental regains hit points and its Slam d [authored: the catalog held no shape for it]")
[reskin] weapons answered: Slam = none
[reskin] languages by mind: "None" -> "Primordial" (sapient)
[reskin] print canon languages: "Primordial" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 40 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Slam" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] print canon multiattack: "the elemental makes two Thunderous Slam attacks." — the Air Elemental's own
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in nothing — the Air Elemental's own set, at this sheet's stats and PB 3 (changed STR, CON)
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "Air Elemental — that carries stolen voices" is the Air Elemental (print's own row)
[reskin] print canon row: Actions/Whirlwind (Recharge 4-6) — the Air Elemental's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Howling Vortex.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Cage of Stolen Cries" [no template]
[reskin] 2024 caps: "Cage of Stolen Cries" — a condition or game term shipped lowercase
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Cage of Stolen Cries carries "a cage of stolen voices" — "Whenever a creature dies within 10 feet of the elemental, the elemental regains "
[reskin] audit: [Cage of Stolen Cries: The trigger harvests the dea…a creature dies within 10 feet of the elemental")]
[reskin] audit defect: Traits/"Cage of Stolen Cries" [model-written] medium undelivered — The trigger harvests the deaths of creatures within 10 feet but the trait's fiction is a cage of stolen voices the elemental carries, so nothing in the row captures, holds, or releases a voice; it reads identically for a creature with no voice motif at all. — Tie the healing bonus to harm the elemental deals or to a voice it has already taken, rather than to any nearby death. (about: "Whenever a creature dies within 10 feet of the elemental")
[reskin] clause unresolved: "Cage of Stolen Cries" carries "Whenever a creature dies within the elemental's gale, it", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Air Elemental" — donor brute-5, CR 5
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 05-air-elemental.json — fields: generation
```

---

## 06-spoilheap-lurker

## 06. Spoilheap Lurker — CR 5

**Input:** `a quarry-pit thing of living scree that buries what it catches`
**Donor:** brute-5-grappler -> CR 5
**Signature:** library

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

Loose Scree.The lurker can squeeze through any gap wider than a paving stone and move through spaces occupied by other creatures and ignores difficult terrain made of rubble, gravel, or broken quarry ground; a creature that starts its turn in a space of such ground the lurker has moved through has its speed halved until the end of its turn.
Entomb (Bonus Action).The lurker entombs one Medium or smaller creature it is grappling. While entombed, the target is blinded and restrained, has Total Cover against attacks and other effects outside the lurker, and takes 7 (2d6) bludgeoning damage at the start of each of the lurker's turns. The lurker can have only one creature entombed at a time. If the lurker takes 15 damage or more in a single turn from the entombed creature, the lurker must release the target at the end of that turn, and the target exits prone in an unoccupied space within 5 feet of the lurker. If the lurker dies, an entombed creature breaks free prone by using 5 feet of movement.

Actions
Multiattack: The lurker makes two Rubble Lash attacks. It can replace one attack with a use of Scree Snare.
Rubble Lash: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained.
Scree Snare: One creature within 5 feet of the lurker must succeed on a DC 14 Strength saving throw or take 9 (2d8) bludgeoning damage and be knocked prone.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Air Elemental: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 5 taken name(s) the recording carried
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
[reskin] seat answered, but: the call said "When the lurker hits a creature with Rubble Lash while that creature is Braced — standing on rubble, scree, or broken gr" is carried by "Scree Snare", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write an action for "When the lurker hits a creature with Rubble Lash while that creature i" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat answered, but: the call said "When the lurker hits a creature with Rubble Lash while that creature is Braced — standing on rubble, scree, or broken gr" is carried by "Scree Snare", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("prone plus halved speed on a hit while standing on broken ground, clea") and wrote an action instead: "Scree Snare" -> Actions. *Strength Saving Throw*: DC 14, one creature within 5 feet. *Failure:* The target has the Prone condition.
[reskin] authored row numbers: "Scree Snare" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Scree Snare" after "you wrote no row of the kind asked for (an action)"
[reskin] value check: "Scree Snare" EV 7.3 vs floor 8.8 (one attack of 2) — half a hit added: 9 (2d8) Bludgeoning damage on a failed save — half of one 17-damage hit, the attack this row stands in place of; still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature under the floor, and kept: "Scree Snare" — the ladder could not lift it and nothing stands in, so the row the model wrote stays as written
[reskin] signature authored: no template — the seat wrote it -> Actions/"Scree Snare" ("When the lurker hits a creature with Rubble Lash while that creature is Braced — standing on rubble, scree, or broken ground, or having just climbed or scramble [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Loose Scree: the lurker can squeeze through any gap wider than a paving stone and move through spaces occupied by other creatures, and it ignores Difficult Terrain made of rubble, gravel, or broken quarry ground. Anything in such a space it moves through is unsettled: a creature that starts its turn in that space has its Speed reduced by half until the end of its turn as the ground shifts out from" [trait/always/movement] [family: zone] — menu: false-appearance, phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), earth-glide (always/movement)
[reskin] keys would have bound: trait — terrain-walk, aberrant-ground (scree)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition when=on_hit
[reskin] word match declined by the call: terrain-walk, earth-glide, tunneler, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest refused: trait — "aberrant-ground" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: churns rubble it passes through into difficult ground that halves the )
[reskin] seat answered, but: the call said "the lurker can squeeze through any gap wider than a paving stone and move through spaces occupied by other creatures, an" is carried by "Loose Scree", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("churns rubble it passes through into difficult ground that halves the ") and wrote a trait instead: "Loose Scree" -> Traits. The lurker can squeeze through any gap wider than a paving stone and move through spaces occupied by other creatures and
[reskin] authored row numbers: "Loose Scree" — the call declared 0 number(s) promised
[reskin] free signature row: "Loose Scree" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Loose Scree" ("Loose Scree: the lurker can squeeze through any gap wider than a paving stone and move through spaces occupied by other creatures, and it ignores Difficult Terr [authored: the catalog held no shape for it]")
[reskin] weapons answered: Rubble Lash = none
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a quarry-pit thing of living scree that " and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Scree Snare.
[reskin] free row kept as one of its kind: Traits/"Loose Scree" stays — the first trait kept, and print's card for CR 5 has room for 3 (budget 1, 1 kept so far)
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 2 kept (budget 1) — "Scree Snare" [no template], "Loose Scree" [no template]
[reskin] ask vs row MISMATCH: "buries what it catches" -> "Entomb" — trigger: asked on_hit, row reads at_will
[reskin] lint: 0 findings
[reskin] element expressed: Scree Snare carries "a body of shifting loose quarry stone" — "the target has the Prone condition"
[reskin] audit: [Loose Scree: Nothing on the sheet lets the GM trac… has its Speed halved until the end of its turn"), Entomb: The release clause says the target exits P…an unoccupied space within 5 feet of the lurker"), Scree Snare: As a replacement for one Multiattack … damage, and the target has the Prone condition")]
[reskin] audit defect: Traits/"Loose Scree" [model-written] high untrackable — Nothing on the sheet lets the GM track which rubble/gravel spaces the lurker has moved through, so the halving trigger is uncheckable after the fact. — Anchor the effect to the lurker's current position or a defined area rather than a trail of previously occupied spaces. (about: "a creature that starts its turn in a space of such ground the lurker has moved through has its Speed halved until the end of its turn")
[reskin] audit defect: Bonus Actions/"Entomb" [print] medium dead_reference — The release clause says the target exits Prone even though nothing in Entomb ever applied Prone, and the exit is only forced on the 15-damage trigger, leaving a voluntary-release or normal-release path unstated. — State how the target is released when the lurker chooses or when other conditions end, and drop or reconcile the Prone reference. (about: "the target exits Prone in an unoccupied space within 5 feet of the lurker")
[reskin] audit defect: Actions/"Scree Snare" [model-written] medium weak — As a replacement for one Multiattack attack it deals less damage than Rubble Lash and only knocks the target Prone, which the Grapple/Restrained rider already outclasses. — Give the Snare a payload that Rubble Lash cannot already produce, such as denying a response or affecting a target the lash's Grapple cannot reach. (about: "9 (2d8) Bludgeoning damage, and the target has the Prone condition")
[reskin] clause unresolved: "Scree Snare" carries "When the lurker hits a creature with Rubble Lash while t", which matches no clause on the sheet — no coverage credit by id
[reskin] clause unresolved: "Loose Scree" carries "Loose Scree: the lurker can squeeze through any gap wide", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 2 expressed, 0 decoration, 2 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Spoilheap Lurker" — donor brute-5-grappler, CR 5
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 1 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 06-spoilheap-lurker.json — fields: generation, other_edition
```

---

## 07-hydra

## 07. Hydra — CR 8

**Input:** `name: Hydra | whose stumps smoke instead of regrowing`
**Donor:** brute-5 -> CR 8
**Signature:** library

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

Damage Resistances: 

fire

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

Searing Stumps.When the hydra takes piercing or slashing damage from a melee attack, one of its necks is severed and its stump smokes; until the end of its next turn its bite attacks deal an extra 13 (3d8) fire damage, but it has disadvantage on attack rolls against creatures other than the one that severed the head.
Hold Breath.The hydra can hold its breath for 1 hour.
Multiple Heads.The hydra has five heads. Whenever the hydra takes 25 damage or more on a single turn, one of its heads dies. The hydra dies if all its heads are dead.
Reactive Heads.For each head the hydra has beyond one, it gets an extra Reaction that can be used only for Opportunity Attacks.

Actions
Multiattack: The hydra makes as many Bite attacks as it has heads.
Bite: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.
Choking Reek (Recharge 5-6): Each creature in a 30-foot cone must make a DC 16 Constitution saving throw, taking 35 (10d6) fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also blinded until the end of its next turn.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Spoilheap Lurker: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] twist — Hydra (is) — "Name field: Hydra" (code)
[route] brute-regenerator type=Monstrosity mechanics=regeneration — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-regenerator: ✓ ("whose stumps smoke instead of regrowing") | brute-regenerator: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "fire" is a guess from what the creature is, not the GM's ask
[concept] name: "Hydra" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=venomous/bestial mind=bestial style=regenerator energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Hydra"
[concept] mechanics: regeneration
[concept] signature elements: stumps that smoke instead of regrowing [behavior] | many-headed lashing bite [body] | welling smoke that chokes the battlefield [aura]
[concept] identity: The hydra opens with a many-headed lunge to seize and pin, then settles into a grinding loop of bites while the heads it loses leave smoking stumps that belch scalding vapor into the fight. Wounds close and heads replace themselves, but every severance works against it — the smoke thickens, the beast grows frantic and blinded by its own fumes, and it fights to the death in a choking, thrashing spiral rather than ever retreating.
[concept] lore: Hatred of the first hero who burned it alive soaked into the marsh where it fell, so the creature reknits its flesh endlessly and its severed necks vent the same fire that once killed it, filling the air with a smoke it can never escape.
[reskin] print canon route: the Hydra's body outranks the regenerator seat — no verb in the words names it; the plain brute line
[reskin] print canon route: the regenerator seat's organ leaves too — the Hydra has no Regeneration of its own
[reskin] print canon defenses: HP 136 -> 184, AC 14 -> 15 — the Hydra's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 20, INT 2, WIS 10, CHA 7 — the Hydra's at its own CR; attack +7 -> +8, DC 16 (print's)
[reskin] donor: brute-5 -> CR 8
[reskin] seats: action <- "stumps that smoke instead of regrowing" | trait <- "many-headed lashing bite"
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
[reskin] clauses: "Hydra — whose stumps smoke instead of regrowing" -> LACKS (mechanical) [asked: at_will/at_will/save_area] [askMechanic: breath]
[reskin] open asks handed to the idea call: "Hydra — whose stumps smoke instead of regrowing" [breath]
[reskin] idea anchored: action — "The hydra rears back all its necks and vents a thick, scalding smoke f" answers the GM's "Hydra — whose stumps smoke instead of regrowing"
[reskin] idea unanchored: trait — "When the hydra takes Piercing or Slashing damage from a melee attack, " names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 35 of 35 answered; not true of this body: shield-bash, active-toll, random-ray, herd, drain, shell-withdraw, rally, coating, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "Hydra — whose stumps smoke instead of regrowing", so role and style do not filter the menu (legality still does); 20 template(s) offered
[reskin] signature idea (action): "The hydra rears back all its necks and vents a thick, scalding smoke from every mouth and smoking stump in a cone. Each creature in the cone must make a Constitution saving throw; on a failure, it takes Fire damage and is Blinded until the end of its next turn as the fumes sear its eyes and fill its lungs." [action/save/condition] [family: nova] — menu: trample, leap, thrown-burst, ground-burst, spew, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, zone, execute, lure, pacify, slow-bolt, sensory-strike, disarm, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, rampage, second-wind, aggro-curse, self-invisibility, focus, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, affliction, contagion, stunning-strike, charge-push, pounce, charge, isolation)
[reskin] lead by this seat's own clause: action — "breath" from the clause this seat serves, not the sheet's "escalate"
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — breath: spew
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: spew (save/damage), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] keys would have bound: action — zone, zone-seed (smoke)
[reskin] classification handed to the fit call: shape=save_area when=at_will often=at_will
[reskin] word match declined by the call: spew, ground-burst, sensory-strike — the key word does not mean the mechanic here
[reskin] closest refused: action — "sensory-strike" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a cone-shaped area that both deals Fire damage and Blinds on a failed )
[reskin] authored row answers the GM: action — "Choking Reek (Recharge 5-6)" was written for "Hydra — whose stumps smoke instead of regrowing", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a cone-shaped area that both deals Fire damage and Blinds on a failed ") and wrote an action instead: "Choking Reek (Recharge 5-6)" -> Actions. *Constitution Saving Throw*: DC 16, each creature in a 30-foot Cone. *Failure:* 35 (10d6) Fire damage, and the target ha
[reskin] authored row numbers: "Choking Reek (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Choking Reek (Recharge 5-6)" is HANDED "Hydra — whose stumps smoke instead of regrowing" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Choking Reek (Recharge 5-6)" ("The hydra rears back all its necks and vents a thick, scalding smoke from every mouth and smoking stump in a cone. Each creature in the cone must make a Constit [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "When the hydra takes Piercing or Slashing damage from a melee attack, one of its necks is severed and its stump immediately begins to smoke. Until the end of its next turn, the hydra's Bite attacks deal extra Fire damage, but it has disadvantage on attack rolls against creatures other than the one that severed the head, as its remaining heads lash out in frenzied, blinding pain." [trait/on_being_hit/damage] [family: payoff] — menu: heated-body, weapon-lodge (+ shelf: phobia, energy-aura, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does damage; leading: heated-body (on_being_hit/damage), weapon-lodge (on_being_hit/resource)
[reskin] classification handed to the fit call: shape=save_area when=at_will often=at_will
[reskin] word match declined by the call: heated-body — the key word does not mean the mechanic here
[reskin] closest refused: trait — "heated-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a punishes-the-attacker rider that also buffs the hydra's own Bite and)
[reskin] seat answered, but: the call said "When the hydra takes Piercing or Slashing damage from a melee attack, one of its necks is severed and its stump immediat" is carried by "Searing Stumps", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a punishes-the-attacker rider that also buffs the hydra's own Bite and") and wrote a trait instead: "Searing Stumps" -> Traits. When the hydra takes Piercing or Slashing damage from a melee attack, one of its necks is severed and its stump smokes; 
[reskin] authored row numbers: "Searing Stumps" — the call declared 1 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Searing Stumps" ("When the hydra takes Piercing or Slashing damage from a melee attack, one of its necks is severed and its stump immediately begins to smoke. Until the end of it [authored: the catalog held no shape for it]")
[reskin] weapons answered: Bite = none
[reskin] chassis nova: "Choking Reek (Recharge 5-6)" — the brute-5's own nova row; geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Swim 40 ft. — the concept's movement set decides
[reskin] print canon multiattack: "the hydra makes as many Bite attacks as it has heads." — the Hydra's own
[reskin] languages held: None stands — INT 2 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] element immunity: Fire — the call read this creature's energy as Fire and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Fire (merged into the header write)
[reskin] immunities stamped for type: Monstrosity -> Fire
[reskin] print canon saves: proficient in nothing — the Hydra's own set, at this sheet's stats and PB 3 (changed STR, CON)
[reskin] print canon skills: "Athletics +8, Perception +3" -> "Perception +6" — the Hydra's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Fire -> Blinded, Charmed, Deafened, Frightened, Stunned, Unconscious — the Hydra's own header lines
[reskin] resistances derived: Fire
[reskin] print canon trait: Hold Breath — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Multiple Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon trait: Reactive Heads — "Hydra — whose stumps smoke instead of regrowing" is the Hydra (print's own row)
[reskin] print canon: the seat's own row STAYS — Actions/"Choking Reek (Recharge 5-6)" answers "Hydra — whose stumps smoke instead of regrowing", which the GM typed; print's nova rides beside it rather than over it
[reskin] free-row budget by card size: CR 8 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Searing Stumps" [no template]
[reskin] 2024 caps: "Searing Stumps" — a condition or game term shipped lowercase
[reskin] ask vs row MISMATCH: "Hydra — whose stumps smoke instead of regrowing" -> "Choking Reek" — limit: asked at_will, row reads recharge
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Searing Stumps carries "stumps that smoke instead of regrowing" — "one of its necks is severed and its stump smokes; until the end of its next turn"
audit finding below confidence gate: Multiattack With five heads this is five separate attack rolls in one action, more than a GM can resolve inside a turn without slowing play, and it makes the single Bite action never worth taking.
[reskin] audit: [Searing Stumps: This trait severs a head on any qu…ne of its necks is severed and its stump smokes"), Searing Stumps: The trait keys its Disadvantage to…atures other than the one that severed the head")]
[reskin] audit defect: Traits/"Searing Stumps" [model-written] high other — This trait severs a head on any qualifying hit, while Multiple Heads severs a head only on 25+ damage in a turn and regrows heads two per death — two entries give two incompatible rules for how heads die, so the GM cannot tell which governs. — Make Searing Stumps grant its smoke/Fire rider off the head-death already defined by Multiple Heads rather than inventing a second severance trigger. (about: "When the hydra takes Piercing or Slashing damage from a melee attack, one of its necks is severed and its stump smokes")
[reskin] audit defect: Traits/"Searing Stumps" [model-written] medium untrackable — The trait keys its Disadvantage to "the one that severed the head," a creature the trait never identifies, and on a Multiattack of five Bites it gives the GM no way to track which head was severed by whom within a turn. — Replace the per-severer reference with a condition the block can track (e.g., Disadvantage against all creatures but one named target the hydra can see). (about: "its Bite attacks deal an extra 13 (3d8) Fire damage, but it has Disadvantage on attack rolls against creatures other than the one that severed the head")
[reskin] clause unresolved: "Searing Stumps" carries "When the hydra takes Piercing or Slashing damage from a ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] lacks clause: Traits/"Multiple Heads" keeps its blow, loses the regeneration — "Hydra — whose stumps smoke instead of regrowing"
[reskin] done: "Hydra" — donor brute-5, CR 8
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 1 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
!! [ENRICHMENT] Failed to enrich Hydra: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] enrichment not run (4 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 07-hydra.json — fields: generation, other_edition
```

---

## 08-lashed-siege-golem

## 08. Lashed Siege-Golem — CR 8

**Input:** `a siege-engine golem of lashed timber that shoulders through walls`
**Donor:** brute-5-juggernaut -> CR 8
**Signature:** library

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
[harness] restored 7 taken name(s) the recording carried
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
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
!! [ENRICHMENT] Failed to enrich Lashed Siege-Golem: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] REPLAY DIFFERS from 08-lashed-siege-golem.json — fields: generation
```

---

## 09-stone-golem

## 09. Stone Golem — CR 10

**Input:** `name: Stone Golem | carved as a weeping saint`
**Donor:** brute-9 -> CR 10
**Signature:** library

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

Immutable Form. The golem can't shape-shift.

Magic Resistance. The golem has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The golem makes two attacks, using Slam or Force Bolt in any combination. It can replace one attack with a use of Weeping Visage.

Slam. Melee Attack Roll: +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +9, range 120 ft. 22 (4d10) Force damage.

Weeping Visage. Wisdom Saving Throw: DC 17, each creature of the golem's choice in a 30-foot Emanation originating from the golem that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's terror for 24 hours.

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

### Trace
```
[harness] restored 8 taken name(s) the recording carried
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
[reskin] inline by rule: "the golem" — the call answered "the stone golem" (kind), which the name does not support
[reskin] inline on stamped rows: "the stone golem" -> "the golem" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "the stone golem" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Stone Golem — carved as a weeping saint" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "The golem raises its sorrow-streaked visage, and the stone tears on it" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The Weeping Saint's frozen tears are consecrated stone: while it is Bl" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The golem raises its sorrow-streaked visage, and the stone tears on its cheeks run wet with radiant grief. Each creature of its choice within 30 feet that can see it must make a Wisdom saving throw or be Frightened and Blinded until the end of its next turn, its own eyes flooding with borrowed tears." [action/save/condition] [family: nova] — menu: trample, leap, thrown-burst, throw-retrieve, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal (+ shelf: rampage, second-wind, aggro-curse, self-invisibility, focus, answering-strike, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), push-prone (save/condition)
[reskin] word match declined by the call: escalating-dread, sensory-strike, pacify, lure, reveal — the key word does not mean the mechanic here
[reskin] free signature row: action — "terror-pulse" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "weeping stone visage" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] seat takes its clause: "Weeping Visage (2/Day)" is HANDED "carved as a weeping saint" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: terror-pulse -> Actions/"Weeping Visage (2/Day)" ("each creature of its choice within 30 feet that can see it must make a Wisdom sa [shape fit, no verb match]")
[reskin] signature idea (trait): "The Weeping Saint's frozen tears are consecrated stone: while it is Bloodied, its carved face splits and weeps openly, and each creature that starts its turn within 10 feet of the golem must succeed on a Wisdom saving throw or be Frightened until the start of its next turn." [trait/start_of_turn/condition] [family: zone] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:frightened (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), gaze-aura (start_of_turn/condition)
[reskin] word match declined by the call: fear-aura, gaze-aura, truth-aura, phobia — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:condition:frightened: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:condition:frightened" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "weeping stone visage" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] free signature row: "Weeping Visage" — the trait seat cannot quote the GM, but the call names the element it expresses: "weeping stone visage". Earns no clause credit; the twist/class path allows 1 and this is number 3
[reskin] seat takes its clause: "Weeping Visage" is HANDED "carved as a weeping saint" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] trait declined — the name is taken: "Weeping Visage" already names a row on this sheet and there is no other name for it (its template's "Composed Row" is a placeholder); the engine will not mint one, so the row leaves and the fallback stands in
[reskin] weapons answered: Slam = none; Rock = none; Grief Made Rigid = none
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (sapient)
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon multiattack: "the golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
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
[reskin] dead control row: "Weeping Visage" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Weeping Visage.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Weeping Visage" [action/save/condition]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Weeping Visage: The signature 'weeping saint' terr…tened condition until the end of its next turn."), Weeping Visage: On a failure the Frightened condit…tened condition until the end of its next turn.")]
[reskin] audit defect: Actions/"Weeping Visage" [model-written] medium weak — The signature 'weeping saint' terror is a single round of Frightened with no damage, on a creature that already has better options every turn, so the row is a dead payload relative to the fiction promising a dread visage. — Give the fear real teeth — a longer or escalating fear, or an additional penalty while frightened — so the weep reads as a threat rather than a nuisance. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] audit defect: Actions/"Weeping Visage" [model-written] low open_ended — On a failure the Frightened condition ends at the end of the target's next turn with no repeated save, so the target has no agency over a state imposed on it beyond waiting one round. — Add a repeat save or a clear end condition tied to the target's own action so failure carries an escape the player can pursue. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 1 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Stone Golem" — donor brute-9, CR 10
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
!! [ENRICHMENT] Failed to enrich Stone Golem: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 09-stone-golem.json — fields: generation
```

---

## 10-drowned-antiphon

## 10. Drowned Antiphon — CR 10

**Input:** `a drowned cathedral choir that sings in one voice`
**Donor:** lurker-5-phantom -> CR 10
**Signature:** library

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
[harness] restored 9 taken name(s) the recording carried
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
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 1 open (1 never-written)
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 10-drowned-antiphon.json — fields: generation, other_edition
```

---

## 11-vampire

## 11. Vampire — CR 13

**Input:** `name: Vampire | who keeps a garden of thorns`
**Donor:** lurker-13 -> CR 13
**Signature:** dropped

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
Briar Blood (Reaction).When the vampire takes damage from a melee weapon, the triggering creature must succeed on a DC 17 Constitution saving throw or be poisoned until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Drowned Antiphon: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] twist — Vampire (is) — "Name field: Vampire" (code)
[route] lurker type=Undead mechanics=snare — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: the call reads no worked magic in these words | lurker-trap: ✓ ("a garden of thorns") | lurker-trap: no line key in the words — the model's read of its quote | lurker-trap -> lurker: a trap is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] name: "Vampire" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=lurker type=Undead typeFrom=the route call themes=grave/grasping mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Vampire"
[concept] mechanics: snare
[concept] signature elements: a garden of thorned briars [object] | striking from hiding to drain blood [behavior] | blood-veined undead body rooted in the soil [body]
[concept] identity: A blood-veined vampire who has made a walled garden of thorned briars its larder and its web: it opens by letting prey wander into the hedge-maze, then strikes from the black heart of the thorns with a single blood-draining grapple before melting back into the branches. Round after round it harries from cover, dragging the snared and bleeding deeper into the garden, and it fights to the death only when the thorns themselves are threatened — otherwise it toys, patient as a gardener, waiting for the wound to do its work.
[concept] lore: Once a noble who bartered with the grave to outlive the sun, this vampire rooted its coffin beneath a rose-bed and now tends the thorn-garden grown from its own thirst, wanting only a steady supply of warm blood led willingly down its winding paths.
[reskin] print canon defenses: HP 184 -> 195, AC 16 -> 16 — the Vampire's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 18, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's at its own CR; attack +8 -> +9, DC 17 (print's)
[reskin] donor: lurker-13 -> CR 13
[reskin] seats: action <- "striking from hiding to drain blood" | trait <- "a garden of thorned briars"
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
[reskin] idea unanchored: action — "When the vampire hits a creature with its Thorn Claw while it is Hidde" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Briar Blood. When the vampire takes damage from a melee weapon, its ve" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 38 of 38 answered; not true of this body: gaze-single, seal, wail, active-toll, random-ray, spew, snare-bolt, zone-seed, blighted-ground, blink, shell-withdraw, coating, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, kill-denial
[reskin] signature idea (action): "When the vampire hits a creature with its Thorn Claw while it is Hidden from that creature or the target is Frightened, the wounds left by the thorns writhe and it can immediately Stride down into the briar-rooted soil, hauling the victim along with it — the target must succeed on a Strength saving throw or be pulled into the hedgerow's interior, dragged a short distance toward the vampire's chose" [rider/on_hit/movement] [family: drag] — menu: contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, life-drain (+ shelf: condition-payoff, execute, lure, ground-burst, pacify, escalating-dread, terror-pulse, slow-bolt, sensory-strike, drain, delayed-brand, exploiter, patient-defense, self-invisibility, focus, feint-slip, riposte, answering-strike)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does movement; leading: charge-push (on_hit/movement), hook-rider (on_hit/movement), contagion (on_hit/condition)
[reskin] keys would have bound: action — drain (vampire)
[reskin] classification handed to the fit call: mechanic=snare
[reskin] word match declined by the call: charge-push, pounce, contagion, stunning-strike, isolation, life-drain, drain, pacify, exploiter — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Briar Pull" is HANDED "keeps a garden of thorns" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] rider refused — a push that undoes its own row: "hook-rider" moves the target away from "Thorn Claw", which swings 2x a round; the slot leaves and the seat looks elsewhere
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
[reskin] signature idea (trait): "Briar Blood. When the vampire takes damage from a melee weapon, its veins split the skin in a spray of thorn and black blood; the attacker is Splattered — it has the Poisoned condition as briar-dust-laced blood burns into its wounds until the end of its next turn. The thorns are the vampire's surface as much as its claws, and every cut opens the veins wider." [trait/on_being_hit/condition] [family: body-reaction] — menu: EMPTY (+ shelf: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, assassinate)
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition), composed:body-reaction:condition:t1:poisoned (on_being_hit/condition)
[reskin] classification handed to the fit call: mechanic=snare
[reskin] word match declined by the call: composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t2:poisoned — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:condition:t1:pois" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: plants and maintains a patch of thorned briars that snare or hinder cr)
[reskin] seat answered, but: the call said "Briar Blood. When the vampire takes damage from a melee weapon, its veins split the skin in a spray of thorn and black b" is carried by "Briar Blood", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Briar Blood. When the vampire takes damage from a melee weapon, its ve" and wrote no row of that kind (refused: "Briar Blood" — a trait cannot put the Poisoned condition on another creature with no saving throw, and a trait has nowhere to hold one. Where it fires because the creature was HIT, answer in "reactions" with a trigger and a "save" object; where it fires on creatures NEAR it, answer in "auras") (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Briar Blood" — a trait cannot put the Poisoned condition on another creature with no saving throw, and a trai); asking once more with the reason
[reskin] seat answered, but: the call said "Briar Blood. When the vampire takes damage from a melee weapon, its veins split the skin in a spray of thorn and black b" is carried by "Briar Blood", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("plants and maintains a patch of thorned briars that snare or hinder cr") and wrote a trait instead: "Briar Blood" -> Reactions. *Trigger:* The vampire takes damage from a melee weapon. *Response—Constitution Saving Throw:* DC 17, the triggering cre
[reskin] authored row numbers: "Briar Blood" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: trait — "Briar Blood" after ""Briar Blood" — a trait cannot put the Poisoned condition on another creature wi"
[reskin] free signature row: "Briar Blood" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Briar Blood" is HANDED "keeps a garden of thorns" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Briar Blood" ("Briar Blood. When the vampire takes damage from a melee weapon, its veins split the skin in a spray of thorn and black blood; the attacker is Splattered — it ha [authored: the catalog held no shape for it]")
[reskin] weapons answered: Thorn Claw = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Vampire's own type stands
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Vampire's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon attack: "Thorn Claw" -> "Grave Strike" — the Vampire's own row
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
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 11 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Briar Blood" [no template]
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: orphan-condition-ref: "Charmed" is referenced as a state but nothing on the sheet applies it | orphan-condition-ref: "Restrained" is referenced as a state but nothing on the sheet applies it
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Briar Blood" claims "a garden of thorned briars" but the audit judged that nothing in the row carries it; the name carries "briars" and may not advertise what the rules do not do — flagged decoration for the rename pass
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Briar Blood")
[reskin] audit: [Briar Blood: Nothing in the row delivers briars or…soned condition until the end of its next turn.")]
[reskin] audit rename blocked — "Briar Blood" -> "Thornbite" would drop the GM's own word "blood"
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
[reskin] done: "Vampire" — donor lurker-13, CR 13
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 11-vampire.json — fields: generation, other_edition
```

---

## 12-plague-archon

## 12. Plague Archon — CR 13

**Input:** `a plague-bearing archon of flies that commands lesser swarms`
**Donor:** defender-8-leader -> CR 13 (invented — no printed peer)
**Signature:** library

### Block
```
Plague Archon

Medium Celestial, Lawful Neutral

AC 18
Initiative +2 (12)

HP 187 (22d8 + 88)

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

Resistances Radiant

Immunities Charmed

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 13 (XP 10,000; PB +5)

Traits

Pack Tactics. The archon has Advantage on an attack roll against a target if at least one of the archon's allies is within 5 feet of that target and the ally doesn't have the Incapacitated condition.

Aura of Authority. While in a 10-foot Emanation originating from the archon, the archon and its allies have Advantage on attack rolls and saving throws, provided the archon doesn't have the Incapacitated condition.

Actions

Multiattack. The archon makes three attacks, using Lightblade or Flyblown Swarm in any combination.

Lightblade. Melee Attack Roll: +10, reach 5 ft. 33 (8d6 + 5) Slashing damage.

Flyblown Swarm. Melee Attack Roll: +10, reach 5 ft. 32 (6d8 + 5) Poison damage.

Bonus Actions

Plague Herald's Command. Constitution Saving Throw: DC 17, one creature within 60 feet. Failure: The target has the Poisoned condition until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Vampire: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] homebrew — "a plague-bearing archon of flies that commands lesser swarms" (call)
[route] defender-leader type=Celestial mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("commands lesser swarms") | defender-leader: key "commands" (class verb)
[concept] hints: swarm→body ✓ ("commands lesser swarms") | winged→style ✓ ("becomes a swarm (no flight verb found; '")
[concept] resolve: archetype=defender type=Celestial typeFrom=the route call themes=celestial/venomous mind=sapient style=leader energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: commands lesser swarms [behavior] | droning aura of affliction [aura] | plague bearing [body]
[concept] identity: The plague-archon opens by loosing a droning cloud of flies into the enemy line, then plants itself at the heart of the swarm, parrying blows with a blade of hardened light while its aura of corruption sickens nearby foes. Every round after, it gestures and the swarm splits, reforms, and answers its commands, prioritizing the wounded and the isolated, while the archon itself fights like a disciplined captain-patient, watchful, never needlessly exposed. Under pressure it does not flee; it tightens its swarm into a whirling shroud and redoubles its command until the field is a pulsing, insect-choked graveyard.
[concept] lore: A celestial of the plague-flies is not a creature of disease but a shepherd of it, sent from the upper realms to manage outbreaks among mortal cities by feeding its swarm on the corrupted humors of the sick; it wants a clean, orderly harvest of sickness, and it treats war and plague alike as a crop to be reaped.
[reskin] mind tier held: CHA stays 18 against "formidable" — the card's 18 is already formidable
[reskin] mind tier: INT 12 -> 15 — the call read this creature as capable at CR 13
[reskin] mind tier: WIS 13 -> 20 — the call read this creature as formidable at CR 13
[reskin] donor: defender-8-leader -> CR 13 (invented — no printed peer)
[reskin] seats: action <- "commands lesser swarms" | trait <- "droning aura of affliction"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the archon" — the call's own answer (kind), built from the name
[reskin] inline form: "the archon" — the model's own reading of the name
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "a plague-bearing archon of flies" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: limit "at_will" stands on "a plague-bearing archon of flies" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a plague-bearing archon of flies" -> has (mechanical) [asked: at_will/at_will/save_single] [askMechanic: curse] | "commands lesser swarms" -> has (mechanical) [asked: attack] [askMechanic: command]
[reskin] open asks handed to the idea call: "a plague-bearing archon of flies" [curse] · "commands lesser swarms" [command]
[reskin] idea anchored: action — "As a bonus action, the archon commands a cloud of plague-flies to desc" answers the GM's "commands lesser swarms"
[reskin] idea unanchored: trait — "Whenever a creature within 10 feet of the archon fails a saving throw " names none of the 2 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: seal, shield-bash, active-toll, random-ray, shell-withdraw, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "commands lesser swarms", so role and style do not filter the menu (legality still does); 10 template(s) offered
[reskin] signature idea (action): "As a bonus action, the archon commands a cloud of plague-flies to descend on one creature it can see within 60 feet. The target must succeed on a Constitution saving throw or have the Poisoned condition until the end of the archon's next turn." [bonus_action/save/condition] [family: mark] — menu: patient-defense, lay-on-hands, second-wind, volley-order, aggro-curse, self-invisibility, rally, focus, feint-slip, coating (+ shelf: throw-retrieve, ground-burst, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, thrown-burst, execute, lure, pacify, escalating-dread, sensory-strike, thrown-burst-seed, delayed-brand, riposte, answering-strike, stunning-strike, charge-push, contagion, pounce, isolation, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — command: volley-order, rally
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: volley-order (always/resource), rally (always/movement), aggro-curse (save/movement)
[reskin] keys would have bound: action — contagion (plague, plagued)
[reskin] classification handed to the fit call: shape=save_single when=at_will often=at_will
[reskin] word match declined by the call: aggro-curse, thrown-burst, thrown-burst-seed, delayed-brand — the key word does not mean the mechanic here
[reskin] closest refused: action — "aggro-curse" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a bonus-action single-target save that inflicts the Poisoned condition)
[reskin] authored row answers the GM: action — "Plague Herald's Command" was written for "commands lesser swarms", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a bonus-action single-target save that inflicts the Poisoned condition") and wrote a bonus action instead: "Plague Herald's Command" -> Bonus Actions. *Constitution Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Poisoned condition until 
[reskin] authored row numbers: "Plague Herald's Command" — the call declared (unanswered) number(s) promised
[reskin] value check: "Plague Herald's Command" EV 4.1 vs floor 4.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature under the floor, and kept: "Plague Herald's Command" — the ladder could not lift it and nothing stands in, so the row the model wrote stays as written
[reskin] signature authored: no template — the seat wrote it -> Bonus Actions/"Plague Herald's Command" ("As a bonus action, the archon commands a cloud of plague-flies to descend on one creature it can see within 60 feet. The target must succeed on a Constitution s [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Whenever a creature within 10 feet of the archon fails a saving throw against a disease or poison effect, the archon regains hit points equal to its proficiency bonus." [trait/always/resource] [family: heal] — menu: phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but a template declaring the mechanic the GM asked for (command): pack-tactics; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — command: pack-tactics
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: pack-tactics (always/damage), phobia (always/condition), bloodied-fury (always/defense)
[reskin] classification handed to the fit call: shape=save_single when=at_will often=at_will
[reskin] word match declined by the call: noxious-aura, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "noxious-aura" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: regains hit points when a nearby creature fails a save against a disea)
[reskin] clause already answered: "a plague-bearing archon of flies" is carried by "Plague Herald's Command" — the seat read the sheet and declined to write a second row for it
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within 10 feet of the archon fails a saving throw " and wrote no row of that kind (refused: "Plague Herald's Command" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Plague Herald's Command" — a trait is not a save — the save form takes stat, target and effect as fields and ); asking once more with the reason
[reskin] seat answered, but: the call said "Whenever a creature within 10 feet of the archon fails a saving throw against a disease or poison effect, the archon reg" is carried by "Miasmal Reprieve", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within 10 feet of the archon fails a saving throw " and wrote no row of that kind (refused: "Miasmal Reprieve" — the response writes a saving throw as prose — put it in the "save" object (stat, target, condition, movement, success — a Reaction's save hands out a condition or a forced movement and deals NO damage) and the engine renders it after "Response", as print does)
[reskin] seat refused twice: trait — first: "Plague Herald's Command" — a trait is not a save — the save form takes stat, target and e; second: "Miasmal Reprieve" — the response writes a saving throw as prose — put it in the "save" ob; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "noxious-aura" nearest and judged its subject FLIPPED against the clause (regains hit points when a nearby creature fails a save against a disea); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] the declared ask's own template lands: trait — the sheet's declared ask is "command", the seat that carries it ended with no row, and "pack-tactics" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] free signature row: trait — "pack-tactics" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "droning aura of affliction" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Plague Tithe" — the trait seat cannot quote the GM, but the call names the element it expresses: "droning aura of affliction". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): pack-tactics -> Traits/"Plague Tithe" ("the idea is a self-healing trigger tied to nearby creatures failing disease/pois [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Plague Tithe" -> "Pack Tactics" — this row is pack-tactics and does what every pack-tactics row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Lightblade = scimitar; Flyblown Swarm = none
[reskin] weapon declared: "Lightblade" is a scimitar — the call's own answer (the name alone read longsword)
[reskin] weapon dice follow the weapon: "Lightblade" is a scimitar (d6) — "32 (6d8 + 5)" becomes "33 (8d6 + 5)", print's rule of keeping the die and scaling the count
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] immunities stamped for type: Celestial -> Charmed
[reskin] resistances derived: Radiant
[reskin] name-canon stands down: the path answered homebrew on "a plague-bearing archon of flies that co" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Pack Tactics" [trait/always/damage]
[reskin] asked but unanswered: "a plague-bearing archon of flies" asked for at_will/at_will and no row binds the clause
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Pack Tactics" claims "droning aura of affliction" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Pack Tactics")
audit finding below confidence gate: Flyblown Swarm The entry is named for a swarm — multiple flies — but resolves as a single-target melee attack with no swarm behavior (no area, no poison lingering, no area denial), leaving the plague-of-flies fiction unexpressed on the sheet's only signature action.
audit finding below confidence gate: Flyblown Swarm Flyblown Swarm deals Poison damage but applies no Poisoned condition, so the poison damage type and the plague-bearing fiction have no rider tying them to disease; the block's only Poisoned source is a separate bonus action.
[reskin] audit: [Plague Herald's Command: The command's only payloa…soned condition until the end of its next turn."), Plague Herald's Command: The row written to 'comma…er swarms. (about: "one creature within 60 feet"), Pack Tactics: The archon has no summon, spawn, or …archon's allies is within 5 feet of that target")]
[reskin] audit defect: Bonus Actions/"Plague Herald's Command" [model-written] medium weak — The command's only payload is Poisoned, which by itself imposes merely Disadvantage on attack rolls and ability checks — the herald's plague-themed order carries no lingering effect, movement, or damage to justify spending the bonus action commanded by the GM's ask. — Give the command a payload worthy of a plague herald — a poisoned thrall that spreads, a compelled movement, or damage that lingers past the condition. (about: "The target has the Poisoned condition until the end of its next turn.")
[reskin] audit defect: Bonus Actions/"Plague Herald's Command" [model-written] high undelivered — The row written to 'command lesser swarms' targets a single creature and grants it no swarm-related function, so its rules do not deliver the swarm-commanding behavior the entry was authored for. — Retarget the command to the archon's swarm allies (multiple targets) so the text actually commands lesser swarms. (about: "one creature within 60 feet")
[reskin] audit defect: Traits/"Pack Tactics" [model-written] low dead_reference — The archon has no summon, spawn, or ally-creation entry, so Pack Tactics is dead on a solo herald unless the GM inserts allies the sheet never supplies; the aura similarly assumes allies exist. — Either give the sheet a means to create splinter swarms as allies or replace the ally-dependent trait with a self-contained effect. (about: "at least one of the archon's allies is within 5 feet of that target")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] regains hit points when a nearby creature fails a save against a disease or poison effect — "Whenever a creature within 10 feet of the archon fails a saving throw against a disease or poison effect, the archon regains hit points equal to its proficiency bonus." — Plague Archon [seat: trait [trait/always/resource]] (closest offered: noxious-aura) [effect: resource] [menu: pack-tactics phobia bloodied-fury blood-frenzy death-restoration berserk shielded-mind relentless-pursuit bound guarded-stance undead-fortitude noxious-aura truth-aura fear-aura] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:denied-clause adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict mimicry:body-verdict assassinate:role blurred-form:role death-burst:role kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] record reconciled: "Pack Tactics" no longer imposes Poisoned — the clause left, so the record goes with it
[reskin] done: "Plague Archon" — donor defender-8-leader, CR 13
[reskin] ledger: 2 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 1 open (1 claimed)
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 12-plague-archon.json — fields: generation, sections
```

---

## 13-purple-worm

## 13. Purple Worm — CR 15

**Input:** `name: Purple Worm | that swallowed a war-band's armoury`
**Donor:** brute-13 -> CR 15 (invented — no printed peer)
**Signature:** library

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

Tunneler. The worm can burrow through solid rock at half its Burrow Speed and leaves a 10-foot-diameter tunnel in its wake.

Actions

Multiattack. The worm makes one Bite attack and one Tail Stinger attack. It can replace one attack with a use of Swallow.

Bite. Melee Attack Roll: +14, reach 10 ft. 22 (3d8 + 9) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 22), and it has the Restrained condition until the grapple ends.

Tail Stinger. Melee Attack Roll: +14, reach 10 ft. 16 (2d6 + 9) Piercing damage plus 35 (10d6) Poison damage.

Shrapnel Spray (Recharge 5-6). Constitution Saving Throw: DC 22, each creature in a 60-foot Cone. Failure: 66 (12d10) Acid damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Swallow. Dexterity Saving Throw: DC 21, one Large or smaller creature within 10 feet that the worm hit with a melee attack this turn. Failure: The target is swallowed. A swallowed creature has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the worm, and takes 21 (6d6) Acid damage at the start of each of the worm's turns. If the worm takes 40 damage or more on a single turn from a creature inside it, it must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the worm and has the Prone condition. If the worm dies, a swallowed creature is no longer Restrained and can escape from the corpse using 15 feet of movement, exiting with the Prone condition.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
!! [ENRICHMENT] Failed to enrich Plague Archon: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 12 taken name(s) the recording carried
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
[reskin] inline by rule: "the worm" — the call answered "the purple worm" (kind), which the name does not support
[reskin] inline on stamped rows: "the purple worm" -> "the worm" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "the purple worm" — the model's own reading of the name
[reskin] save dc derived: DC 18 -> 22 (8 + PB 5 + the sheet's best 9) — no stat on the sheet reached it
[reskin] the sheet's declared ask: swallow — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Purple Worm —" -> has (descriptive), head | "swallowed a war-band's armoury" -> has (mechanical) [asked: attack] [askMechanic: swallow]
[reskin] open asks handed to the idea call: "swallowed a war-band's armoury" [swallow]
[reskin] idea anchored: action — "The worm erupts from the ground beneath a creature it can sense, its m" answers the GM's "swallowed a war-band's armoury"
[reskin] idea unanchored: trait — "The worm's gut is a churning mill of splintered blades and unspent pow" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 30 of 30 answered; not true of this body: shield-bash, herd, drain, shell-withdraw, rally, heated-body, false-appearance, absorption, resonant-body, adhesive, spider-climb, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "swallowed a war-band's armoury", so role and style do not filter the menu (legality still does); 16 template(s) offered
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The worm erupts from the ground beneath a creature it can sense, its maw gaping; the target must succeed on a Dexterity saving throw or be swallowed whole, vanishing into the grinding armoury of its gullet. A swallowed creature has the Restrained condition, has total cover from outside the worm, and takes Acid damage at the start of each of its turns as splintered steel and caustic bile scour it." [action/save/condition] [family: breach] — menu: swallow, condition-payoff, burrow-ambush, escalating-dread, terror-pulse, push-prone, exploiter, execute, lure, pull-through, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, second-wind, aggro-curse, self-invisibility, focus, coating, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, contagion, stunning-strike, charge-push, pounce, charge, isolation)
[reskin] composed candidates: none action — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — swallow: swallow
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: swallow (save/condition), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] keys would have bound: action — swallow (swallow, swallows, swallowed)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: burrow-ambush, condition-payoff, pull-through, exploiter, push-prone — the key word does not mean the mechanic here
[reskin] signature template: swallow -> Actions/"Swallow Whole" ("must succeed on a Dexterity saving throw or be swallowed whole, with Restrained, [verb: swallow:concept, swallows:concept, swallowed:concept, whole:idea]")
[reskin] keys spent by the action: swallow, swallows, swallowed
[reskin] signature idea (trait): "The worm's gut is a churning mill of splintered blades and unspent powder; whenever the worm takes Piercing or Slashing damage from a weapon within its body or at close range, a gout of scalding, shredded iron sprays from the wound. Each creature within reach must succeed on a Dexterity saving throw or take Acid damage." [trait/on_being_hit/damage] [family: body-reaction] — menu: bloodied-burst, weapon-lodge (+ shelf: phobia, terrain-walk, aberrant-ground, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, death-burst, kill-denial)
[reskin] composed candidates on the menu: trait — composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does damage; leading: bloodied-burst (on_being_hit/damage), composed:body-reaction:damage:t0 (on_being_hit/damage), composed:body-reaction:damage:t1 (on_being_hit/damage)
[reskin] keys would have bound: trait — tunneler (worm)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: bloodied-burst, weapon-lodge, composed:body-reaction:damage:t0, composed:body-reaction:damage:t1 — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:damage:t2" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grapples and engulfs a creature, holding it inside the worm's gut)
[reskin] seat answered, but: the call said "each creature within reach must succeed on a Dexterity saving throw or take Acid damage" is carried by "Gut-Mill Spray", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The worm's gut is a churning mill of splintered blades and unspent pow" and wrote no row of that kind (refused: "Gut-Mill Spray" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Gut-Mill Spray" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] seat answered, but: the call said "each creature within reach must succeed on a Dexterity saving throw or take Acid damage" is carried by "Gut-Mill Spray", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The worm's gut is a churning mill of splintered blades and unspent pow" and wrote no row of that kind (refused: "Gut-Mill Spray" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Gut-Mill Spray" — a trait is not a save — the save form takes stat, target and effect as ; second: "Gut-Mill Spray" — a reaction's save deals no damage here, so say what the target suffers ; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "composed:body-reaction:damage:t2" nearest and judged its subject FLIPPED against the clause (grapples and engulfs a creature, holding it inside the worm's gut); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key tunneler, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "tunneler" is keyed by the GM's worm and was on the call's menu, which the call read as no fit; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "The worm's gut is a churning mill of splintered blades and unspent powder; whenever the worm takes Piercing or Slashing damage from a weapon within its body or at close range, a gout of scalding, shredded iron sprays from the wound. Each creature within reach must succeed on a Dexterity saving throw or take Acid damage." [trait/on_being_hit/damage] — the model found no template that holds it (offered: bloodied-burst, composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2, weapon-lodge, pack-tactics, aberrant-ground, bloodied-fury)
[reskin] concept-first trait skipped: tunneler — the GM's words key it, but the call was offered it on this seat's menu and declined
[reskin] one mechanic, one name: Actions/"Swallow Whole" -> "Swallow" — this row is swallow and does what every swallow row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Bite = none
[reskin] chassis nova: "Shrapnel Spray (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: 40 ft. -> 50 ft. — the Purple Worm's walk; the concept's other modes stay
[reskin] print canon speed: Burrow -> 50 ft. — the Purple Worm's own
[reskin] print canon row: Actions/Tail Stinger — the Purple Worm's second melee row, beside the chassis's
[reskin] print canon multiattack: "the worm makes one Bite attack and one Tail Stinger attack." — the Purple Worm's own
[reskin] languages held: None stands — INT 1 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] element immunity: Acid — the call read this creature's energy as Acid and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Monstrosity -> Acid
[reskin] print canon saves: proficient in CON, WIS — the Purple Worm's own set, at this sheet's stats and PB 5 (changed STR, WIS)
[reskin] print canon trait: Tunneler — "Purple Worm — that swallowed a war-band's armoury" is the Purple Worm (print's own row)
[reskin] print canon: the twist KEEPS its area attack — Actions/"Shrapnel Spray (Recharge 5-6)" is the chassis's nova under the name the model gave it (its "Area Nova"); the Purple Worm prints no nova of its own and the GM typed it by name with a twist
[reskin] print canon row withheld: Bonus Actions/"Swallow" — the sheet's row of that name answers the GM ("swallowed a war band's armoury"), and the GM's words outrank print's name
[reskin] multiattack replacement clause: It can replace one attack with a use of Swallow.
[reskin] row binds its clause: "Swallow" answers "swallowed a war-band's armoury" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] lint: 0 findings
audit finding below confidence gate: Multiattack Swallow is a save-based effect rather than an attack, so replacing an attack roll with it makes the action economy ambiguous about whether the target still needs Bite to land for the swallow save to be legal.
audit finding below confidence gate: Shrapnel Spray The cone has no stated origin or orientation, so the GM cannot determine which creatures are caught without inventing a facing rule the block never provides.
[reskin] audit: [Swallow: The trigger requires the worm to have hit…hat the worm hit with a melee attack this turn.")]
[reskin] audit defect: Actions/"Swallow" [catalog] medium untrackable — The trigger requires the worm to have hit the target with a melee attack this turn, but Multiattack already lets it replace an attack with Swallow, so a GM cannot tell whether Swallow consumes the qualifying hit or can be used after Bite independent of hit order. — Make the trigger self-contained by specifying that Swallow applies to a creature the worm has Grappled (from Bite) rather than an untrackable 'hit this turn' condition. (about: "*Dexterity Saving Throw*: DC 21, one Large or smaller creature within 10 feet that the worm hit with a melee attack this turn.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] grapples and engulfs a creature, holding it inside the worm's gut — "The worm's gut is a churning mill of splintered blades and unspent powder; whenever the worm takes Piercing or Slashing damage from a weapon within its body or at close range, a gout of scalding, shredded iron sprays from the wound. Each creature within reach must succeed on a Dexterity saving throw or take Acid damage." — Purple Worm [seat: trait [trait/on_being_hit/damage]] (closest offered: composed:body-reaction:damage:t2) [effect: condition] [menu: bloodied-burst composed:body-reaction:damage:t0 composed:body-reaction:damage:t1 composed:body-reaction:damage:t2 weapon-lodge pack-tactics aberrant-ground bloodied-fury] [same-cell unoffered: heated-body resonant-body ward-retaliation snap-shot riposte answering-strike] [same-seat rejected: heated-body:body-verdict absorption:body-verdict resonant-body:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] escape dc: Bite → DC 22 (8 + PB + STR; a late row wore another number)
[reskin] done: "Purple Worm" — donor brute-13, CR 15
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (4 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 13-purple-worm.json — fields: generation, sections
```

---

## 14-heart-of-the-glacier

## 14. Heart of the Glacier — CR 15

**Input:** `a glacier's heart given legs, trailing a wake of killing cold`
**Donor:** brute-9-juggernaut -> CR 15
**Signature:** library

### Block
```
Heart of the Glacier
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

	

10 (+0)

	

20 (+5)

Skills: 

Athletics +8, Perception +5

Saving Throws: 

STR +8, CON +9

Damage Immunities: 

cold, poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 15

Languages: 

None

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Killing Cold Wake.At the end of each of the heart's turns, each creature in a 5-foot radius originating from the heart takes 13 (3d8) cold damage.
Cold Absorption.Whenever the heart is subjected to cold damage, it takes no damage and instead regains a number of hit points equal to the cold damage dealt.
Siege Monster.The heart deals double damage to objects and structures.

Actions
Multiattack: The heart makes two Icehaul Limb attacks. It can replace one attack with a use of Splintering Slick.
Icehaul Limb: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage plus 13 (3d8) cold damage.
Killing Cold (Recharge 5-6): Each creature in a 30-foot cone must make a DC 18 Constitution saving throw, taking 66 (12d10) cold damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Splintering Slick: One creature within 30 feet of the heart must succeed on a DC 18 Dexterity saving throw or take 31 (9d6) cold damage and be knocked prone.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Purple Worm: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] homebrew — "a glacier's heart given legs, trailing a wake of killing cold" (call)
[route] brute-juggernaut type=Elemental mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a glacier's heart given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental typeFrom=the route call themes=elemental/grave mind=mindless style=juggernaut energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: the killing-cold wake that trails behind it [aura] | a glacier's heart of core blue ice [body] | a slow, unstoppable, refusing-to-turn gait [behavior]
[concept] identity: The glacier's heart opens by simply walking into the thickest press of foes, its killing-cold wake freezing the ground beneath and behind it into a slick, splintering field. Every round it drives forward on its ice-hauled legs, shouldering through and over what it broke, its breath and stride bleeding Cold into everything it touches while its wake gnaws at anyone who follows or flees across it. It never retreats and never hurries: a tenth-millennium of ice has no fear, only mass and patience, and it will grind a foe flat as long as the foe stays near it.
[concept] lore: In the oldest deep of a living glacier, cold and pressure pressed a heart of blue ice into shape and gave it legs, and now it walks toward warmth to freeze it back into the shelf it came from.
[reskin] nova capped: "Area Nova" 71 → 66 (the chassis nova obeys the cap: 66 at CR 15)
[reskin] mind tier held: INT stays 6 against "feeble" — the call read this creature as mindless, and the card's 6 is already that dim
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 15
[reskin] donor: brute-9-juggernaut -> CR 15
[reskin] seats: action <- "a slow, unstoppable, refusing-to-turn gait" | trait <- "the killing-cold wake that trails behind it"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Icehaul Limb = literal
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline by rule: "the heart" — the call answered "the glacier" (kind), which the name does not support
[reskin] the sheet's declared ask: zone — the route call's one answer for the whole concept
[reskin] alignment by mind: "Neutral" -> Unaligned — a Elemental the call reads as mindless at INT 6 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "a glacier's heart given legs" — the call offered no separate quote and needs none (1b)
[reskin] the clause is its own quote: trigger "at_will" stands on "trailing a wake of killing cold" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "a glacier's heart given legs" -> has (mechanical) [asked: at_will/attack] | "trailing a wake of killing cold" -> has (mechanical) [asked: at_will/save_area] [askMechanic: zone]
[reskin] open asks handed to the idea call: "a glacier's heart given legs" · "trailing a wake of killing cold" [zone]
[reskin] idea anchored: action — "The heart never turns. It moves in a straight line on its turn, and ea" answers the GM's "trailing a wake of killing cold"
[reskin] idea unanchored: trait — "The heart's core is blue glacier ice, and the cold bleeds out of it: a" names none of the 2 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: shield-bash, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, bloodied-burst, adhesive, spider-climb, faultless-tracker, web-walker, noxious-aura, uncanny-sense, marking-light, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "trailing a wake of killing cold", so role and style do not filter the menu (legality still does); 12 template(s) offered
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The heart never turns. It moves in a straight line on its turn, and each time it enters a creature's space that creature must make a Dexterity saving throw; on a failure it is knocked Prone and the heart's heavy bulk grinds over it, dealing Cold damage that leaves the ground beneath slick and splintered, an area of difficult terrain that lasts until the heart moves on." [action/always/movement] [family: zone] — menu: condition-payoff, escalating-dread, terror-pulse, exploiter, execute, lure, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, second-wind, aggro-curse, self-invisibility, focus, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires always/does movement; leading: slow-bolt (save/movement), disarm (save/movement), condition-payoff (save/damage)
[reskin] keys would have bound: action — slow-bolt, execute (cold, kill)
[reskin] classification handed to the fit call: mechanic=aura shape=attack when=at_will
[reskin] word match declined by the call: charge, sensory-strike, reveal — the key word does not mean the mechanic here
[reskin] closest refused: action — "charge" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a lingering zone of cold-slicked difficult terrain dropped behind it a)
[reskin] authored row answers the GM: action — "Splintering Slick" was written for "trailing a wake of killing cold", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a lingering zone of cold-slicked difficult terrain dropped behind it a") and wrote an action instead: "Splintering Slick" -> Actions. *Dexterity Saving Throw*: DC 18, one creature within 30 feet. *Failure:* 31 (9d6) Cold damage, and the target has the Pr
[reskin] authored row numbers: "Splintering Slick" — the call declared (unanswered) number(s) promised
[reskin] value check: "Splintering Slick" EV 21.5 vs floor 16.6 (one attack of 2) — worth the trade
[reskin] signature authored: no template — the seat wrote it -> Actions/"Splintering Slick" ("The heart never turns. It moves in a straight line on its turn, and each time it enters a creature's space that creature must make a Dexterity saving throw; on  [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The heart's core is blue glacier ice, and the cold bleeds out of it: at the start of each of the heart's turns, every creature within its reach that is touching the ground must succeed on a Constitution saving throw or take Cold damage and have its Speed reduced until the end of its next turn, as the frost creeps up its legs." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: absorption, resonant-body, weapon-lodge)
[reskin] declared mechanic leads the menu: trait — zone: aberrant-ground, energy-aura
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: aberrant-ground (always/movement), energy-aura (start_of_turn/damage), truth-aura (start_of_turn/condition)
[reskin] keys would have bound: trait — aberrant-ground, terrain-walk (wake, glacier)
[reskin] classification handed to the fit call: mechanic=aura shape=attack when=at_will
[reskin] word match declined by the call: truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: trait — "energy-aura" has no key-table verb, but the call quotes "trailing a wake of killing cold" from the description
[reskin] signature template (trait): energy-aura -> Traits/"Killing Cold Wake" ("the cold bleeds out of the heart continuously, damaging and slowing creatures ne [shape fit, no verb match]")
[reskin] weapons answered: Icehaul Limb = none
[reskin] chassis nova: "Killing Cold (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] trait stripped: Traits/Immutable Form — a golem's trait on a Elemental
[reskin] defenses by material: an ice body is vulnerable to Fire and never resists, absorbs, or ignores it (named by the call's own material field) — the resistance is withheld; the vulnerability is the GM's to type (the Frostmaw carried a Fire vulnerability nobody typed — the critic's second species read)
[reskin] absorption re-keyed: Acid -> Cold (the donor organ obeys the concept energy)
[reskin] element immunity: Cold — the call read this creature's energy as Cold and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Cold (merged into the header write)
[reskin] immunities stamped for type: Elemental -> Cold, Poison; Exhaustion, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a glacier's heart given legs, trailing a" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Splintering Slick.
[reskin] asked but unanswered: "a glacier's heart given legs" asked for at_will and no row binds the clause
[reskin] ask vs row ok: "trailing a wake of killing cold" -> "Splintering Slick" — trigger at_will
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Splintering Slick: Splintering Slick is a near-exa…damage, and the target has the Prone condition."), Splintering Slick: The name describes a slick or s…ing Throw*: DC 18, one creature within 30 feet.")]
[reskin] audit rename held — "Splintering Slick" was written for the GM's own clause (cl_18mzopc: "trailing a wake of killing cold"), so "Splintering Shard" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Splintering Slick" [model-written] medium weak — Splintering Slick is a near-exact duplicate of the Icehaul Limb's damage band with the same Prone rider as two other rows, so it adds nothing the Multiattack and Killing Cold do not already deliver, and 'slick' promises a movement or terrain effect that the text never creates. — Give the clause a unique payload tied to ice on the ground (difficult terrain, Speed reduction, or a slip effect) instead of a second Prone rider. (about: "*Failure:* 31 (9d6) Cold damage, and the target has the Prone condition.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Heart of the Glacier" — donor brute-9-juggernaut, CR 15
[reskin] ledger: 2 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 1 open (1 never-written)
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 14-heart-of-the-glacier.json — fields: generation, other_edition
```

---

## 15-adult-red-dragon

## 15. Adult Red Dragon — CR 17

**Input:** `name: Adult Red Dragon | blind in one eye from an old lance`
**Donor:** dragon-15 -> CR 17
**Signature:** library

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

Legendary Resistance (3/Day).If the dragon fails a saving throw, it can choose to succeed instead.
Sight Weakness.The dragon has disadvantage on Wisdom (Perception) checks that rely on sight.

Actions
Multiattack: The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Scorching Ray.
Rend: Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 13 (1d10 + 8) slashing damage plus 5 (2d4) fire damage.
Spellcasting: The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 20, +12 to hit with spell attacks): - At will: Command, Detect Magic, Scorching Ray
1/day each: Fireball
Merciless Strike: The dragon sweeps the tail across the ground. One creature within 60 feet must make a DC 21 Dexterity saving throw, taking 36 (8d8) fire damage on a failed save, or half as much damage on a successful one.
Fire Breath (Recharge 5-6): Each creature in a 60-foot cone must make a DC 21 Dexterity saving throw, taking 59 (17d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary Actions

The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.

Commanding Presence: The dragon uses Spellcasting to cast Command (level 2 version). The dragon can't take this action again until the start of its next turn.
Fiery Rays: The dragon uses Spellcasting to cast Scorching Ray. The dragon can't take this action again until the start of its next turn.
Pounce: The dragon moves up to half its Speed, and it makes one Rend attack.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Heart of the Glacier: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 14 taken name(s) the recording carried
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
[reskin] inline by rule: "the dragon" — the call answered "the red dragon" (kind), which the name does not support
[reskin] inline on stamped rows: "the red dragon" -> "the dragon" on 0 rows — they were written before the name's form was settled
[reskin] inline form: "the red dragon" — the model's own reading of the name
[reskin] spell DC coherence: DC 19 -> 20 off Charisma 23 (print's array stays)
[reskin] save dc derived: DC 19 -> 20 (8 + PB 6 + Charisma's 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "blind in one eye"
[reskin] lacks refused: "old lance" names no absence — nothing in it takes anything away
[reskin] clauses: "Adult Red Dragon — blind in one eye from an old lance" -> LACKS (mechanical)
[reskin] open asks handed to the idea call: "Adult Red Dragon — blind in one eye from an old lance"
[reskin] idea anchored: action — "The dragon turns its blind side to a creature, presenting the old lanc" answers the GM's "Adult Red Dragon — blind in one eye from an old lance"
[reskin] idea unanchored: trait — "The dragon has blindsight out to twice its normal range against any cr" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 34 of 34 answered; not true of this body: snare, seal, shield-bash, herd, drain, shell-withdraw, rally, coating, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "Adult Red Dragon — blind in one eye from an old lance", so role and style do not filter the menu (legality still does); 3 template(s) offered
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, thrown-burst-seed, exploiter, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] signature idea (action): "The dragon turns its blind side to a creature, presenting the old lance scar, and its tail whips out at the unseen flank. Each creature of the dragon's choice within reach must succeed on a Dexterity saving throw or take bludgeoning damage and be knocked prone as the tail sweeps the ground behind the dragon." [action/save/condition] [family: sentinel] — menu: condition-payoff, execute, throw-retrieve (+ shelf: lure, lay-on-hands, second-wind, patient-defense, answering-strike, riposte, contagion, stunning-strike, charge-push, pounce, charge, isolation)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: condition-payoff (save/damage), execute (save/damage), throw-retrieve (always/damage)
[reskin] keys would have bound: action — throw-retrieve, charge (lance)
[reskin] classification handed to the fit call: mechanic=breath
[reskin] word match declined by the call: execute, throw-retrieve — the key word does not mean the mechanic here
[reskin] seat takes its clause: "Scarred Flank Sweep (Recharge 5-6)" is HANDED "Adult Red Dragon — blind in one eye from an old lance" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: condition-payoff -> Actions/"Scarred Flank Sweep (Recharge 5-6)" ("the tail whips out at the unseen flank and knocks creatures prone, paying off th [verb: prone:idea]")
[reskin] signature idea (trait): "The dragon has blindsight out to twice its normal range against any creature that is behind it or on its blind side, as it reads the heat and sound of foes it cannot see." [trait/always/defense] [family: payoff] — menu: spider-climb, phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial, evasion, guarded-stance (+ shelf: heated-body, weapon-lodge)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), death-restoration (always/defense), uncanny-sense (always/defense)
[reskin] classification handed to the fit call: mechanic=breath
[reskin] word match declined by the call: uncanny-sense, bloodied-fury, guarded-stance — the key word does not mean the mechanic here
[reskin] closest refused: trait — "uncanny-sense" was named nearest, but the call declined it for collision ("collision") — the word suggests this mechanic and the row does not carry it; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: the dragon's own impaired sight on its blind side, letting it sense cr)
[reskin] decline reason: trait — the call answered none and names it "collision"
[reskin] signature miss: trait — "The dragon has blindsight out to twice its normal range against any creature that is behind it or on its blind side, as it reads the heat and sound of foes it cannot see." [trait/always/defense] — the model found no template that holds it (offered: bloodied-fury, death-restoration, uncanny-sense, shielded-mind, undead-fortitude, evasion, guarded-stance, spider-climb, phobia, blood-frenzy, pack-tactics, berserk, relentless-pursuit, bound, kill-denial, energy-aura, truth-aura, fear-aura, heated-body)
[reskin] one mechanic, one name: Actions/"Scarred Flank Sweep (Recharge 5-6)" -> "Merciless Strike (Recharge 5-6)" — this row is condition-payoff and does what every condition-payoff row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Claw = none
[reskin] chassis nova: "Fire Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Climb 40 ft. — the concept's movement set decides
[reskin] print canon attack: "Claw" -> "Rend" — the Adult Red Dragon's own row
[reskin] print canon multiattack: "the dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast *Scorching Ray*." — the Adult Red Dragon's own
[reskin] element immunity: Fire (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 -> 60
[reskin] dragon spell DC derived: 20 (8 + PB + Cha mod — the breath keeps the card DC)
[reskin] dragon mental save DC derived: "Scarring Roar" -> 20 (the Frightful Presence class keys to Charisma)
[reskin] immunities stamped for type: Dragon -> Fire
[reskin] print canon skills: "Perception +7, Stealth +6" -> "Perception +13, Stealth +6" — the Adult Red Dragon's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Fire Breath (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Adult Red Dragon's
[reskin] print canon row: Actions/Fire Breath (Recharge 5-6) — the Adult Red Dragon's own
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] one recharge die: Actions/"Merciless Strike (Recharge 5-6)" becomes "Merciless Strike (1/Day)" — the Adult Red Dragon already fields a Recharge row, and 0 of print's 329 blocks field two
[reskin] print canon legendary: Commanding Presence, Fiery Rays, Pounce — the Adult Red Dragon's own kit stands where the chassis's stood
[reskin] free-row budget by card size: CR 17 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 9 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] one nova at ship: "Merciless Strike (1/Day)" un-gated to "Merciless Strike" — "Fire Breath" already carries this sheet's Recharge nova (priced at the floor: dice 24 → 42)
[reskin] payoff left unenabled: "Merciless Strike" requires Prone and no melee row on this sheet can carry the rider
[reskin] sheet lint: at-will-inline: Actions/Spellcasting: a 2024 spell bullet survived into a 2014 block
[reskin] lint: at-will-inline: Actions/Spellcasting: a 2024 spell bullet survived into a 2014 block
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
audit finding below confidence gate: Merciless Strike The written-for-the-ask row narrates a ground-level tail sweep but resolves as a single-target 60-foot Fire save, giving it no connection to the blindness-from-a-lance fiction and no tail/trip feel — the name and flavor promise a melee tail lash the mechanics never deliver.
[reskin] audit: [Legendary Resistance (3/Day): This is the body cat…saving throw, it can choose to succeed instead.")]
[reskin] audit defect: Traits/"Legendary Resistance" [catalog] high other — This is the body catalog's standard Legendary Resistance and is fine as written; included here only to note no escape/limit issue — no defect. — No change. (about: "If the dragon fails a saving throw, it can choose to succeed instead.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] the dragon's own impaired sight on its blind side, letting it sense creatures there it cannot see — not a sense that fin — "The dragon has blindsight out to twice its normal range against any creature that is behind it or on its blind side, as it reads the heat and sound of foes it cannot see." — Adult Red Dragon [seat: trait [trait/always/defense]] (closest offered: uncanny-sense) [effect: defense] [menu: bloodied-fury death-restoration uncanny-sense shielded-mind undead-fortitude evasion guarded-stance spider-climb phobia blood-frenzy pack-tactics berserk relentless-pursuit bound kill-denial energy-aura truth-aura fear-aura heated-body] [same-cell unoffered: false-appearance shell-withdraw patient-defense sealed-body relic-object mimicry blurred-form] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict earth-glide:movement tunneler:movement marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict mimicry:body-verdict assassinate:role blurred-form:body-verdict death-burst:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] record reconciled: "Merciless Strike" no longer imposes Restrained — the clause left, so the record goes with it
[reskin] single-target save capped: "Merciless Strike" 42 -> 36 — it targets "one creature", and print's hardest single-target save row at CR 17 is 36
[reskin] lacks clause: Actions/"Merciless Strike" STAYS — the seat wrote it for "Adult Red Dragon — blind in one eye from an old lance", so its name carrying that word is the lack expressed, not a capability the lack removes
[reskin] flaw row: "Sight Weakness" — "Adult Red Dragon — blind in one eye from an old lance" removed no row, so the absence costs the creature something instead (print's grammar: 11 of 329 blocks carry one; owner's ruling 1f)
[reskin] done: "Adult Red Dragon" — donor dragon-15, CR 17
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 15-adult-red-dragon.json — fields: generation, other_edition
```

---

## 16-brass-tyrant

## 16. Brass Tyrant — CR 17

**Input:** `a tyrant of burning brass who rules a city of forges`
**Donor:** brute-17-juggernaut -> CR 17
**Signature:** library

### Block
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

Senses darkvision 60 ft.; Passive Perception 21

Languages Common

CR 17 (XP 18,000; PB +6)

Traits

Fear Aura. The brass tyrant emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 19, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Legendary Resistance (3/Day). If the brass tyrant fails a saving throw, it can choose to succeed instead.

Immutable Form. The brass tyrant can't shape-shift.

Siege Monster. The brass tyrant deals double damage to objects and structures.

Actions

Multiattack. The brass tyrant makes two Brass Fist attacks. It can replace one attack with a use of Forge-Bell Decree.

Brass Fist. Melee Attack Roll: +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.

Furnace Vent (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 66 (12d10) Fire damage. Success: Half damage only.

Forge-Bell Decree. Wisdom Saving Throw: DC 19, each creature of the brass tyrant's choice in a 90-foot Emanation originating from the brass tyrant that can see or hear the brass tyrant. Failure: The target has the Charmed condition until the end of its next turn, and while Charmed this way, it must move toward the brass tyrant by the safest available route on its turn and can't take Reactions. Success: The target is immune to this creature's lure for 24 hours.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the brass tyrant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Throne Advance. The brass tyrant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Brass Fist attack.

Foundry Breaker. The brass tyrant moves up to its Speed without provoking Opportunity Attacks. During this movement, it can move through Large or smaller objects and structures, destroying them.

Seismic Stomp. Strength Saving Throw: DC 19, each creature within 10 feet of the brass tyrant. Failure: The target has the Prone condition.

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
!! [ENRICHMENT] Failed to enrich Adult Red Dragon: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] homebrew — title tyrant — "a tyrant of burning brass who rules a city of forges" (call)
[route] brute-juggernaut type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("a tyrant of burning brass") | brute-juggernaut: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "cold" is a guess from what the creature is, not the GM's ask
[concept] name: provided_name rejected — "a tyrant of burning brass who rules a ci…" is the description, not a name
[concept] resolve: archetype=brute type=Construct typeFrom=the route call themes=forged/terror mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: burning brass hide that sears on contact [body] | ruling a subjugated city of forges [behavior] | furnace-heat radiating from its presence [aura]
[concept] identity: The Brass Tyrant opens by wading straight into the thickest press, its molten-brass fists breaking shield walls and forge-parapets alike as it announces its rule with every step. Each round it hammers the nearest champion, shrugging off reprisals against its searing iron hide and venting furnace-heat into anything that dares crowd it. It does not flee or toy — it conquers, grinding down resistance until the city kneels or melts, and it fights to the last of its burning brass.
[concept] lore: Poured in the first forge of a city that crowned its own furnace, the Brass Tyrant was made to keep the smiths working forever and now rules them as a living throne of burning metal, demanding tribute in iron and lives.
[reskin] nova capped: "Area Nova" 72 → 66 (the chassis nova obeys the cap: 66 at CR 17)
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 17
[reskin] mind tier: WIS 10 -> 20 — the call read this creature as formidable at CR 17
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 17
[reskin] donor: brute-17-juggernaut -> CR 17
[reskin] seats: action <- "ruling a subjugated city of forges" | trait <- "burning brass hide that sears on contact"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the brass tyrant" — the call's own answer (kind), built from the name
[reskin] inline form: "the brass tyrant" — the model's own reading of the name
[reskin] fear unearned by the damage: "Furnace Vent (Recharge 5-6)" would have imposed Frightened on a Fire row — print pairs Frightened with Psychic or Thunder damage and with nothing else; the clause leaves and the row keeps its damage
[reskin] the sheet's declared ask: command — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tyrant of burning brass" -> has (descriptive), head | "rules a city of forges" -> has (mechanical) [asked: condition] [askMechanic: command]
[reskin] open asks handed to the idea call: "rules a city of forges" [command] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The Brass Tyrant's voice is the forge-bell of its own throne-city, and" answers the GM's "rules a city of forges"
[reskin] idea unanchored: trait — "The tyrant's brass hide runs molten when it is pressed: whenever a cre" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 29 of 29 answered; not true of this body: shield-bash, drain, shell-withdraw, coating, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, uncanny-sense, relic-object, warded-mending, mimicry, gaze-aura, death-burst, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "rules a city of forges", so role and style do not filter the menu (legality still does); 13 template(s) offered
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "The Brass Tyrant's voice is the forge-bell of its own throne-city, and when it speaks, molten law runs through the ground. *Charisma Saving Throw*: each creature of the tyrant's choice within range that can hear it. *Failure:* the target has the Frightened condition and must use its reaction, if available, to move toward the tyrant or kneel (Prone). A creature that fails by enough is instead Charm" [action/save/condition] [family: mark] — menu: condition-payoff, escalating-dread, terror-pulse, herd, exploiter, execute, lure, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, second-wind, aggro-curse, self-invisibility, rally, focus, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — command: herd
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: herd (save/damage), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: terror-pulse, escalating-dread, pacify, condition-payoff — the key word does not mean the mechanic here
[reskin] free signature row: action — "lure" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "ruling a subjugated city of forges" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] value check: "Forge-Bell Decree (Recharge 5-6)" EV 38.5 vs floor 18.2 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature template: lure -> Actions/"Forge-Bell Decree (Recharge 5-6)" ("when it speaks, molten law runs through the ground, drawing those who hear it in [shape fit, no verb match]")
[reskin] signature idea (trait): "The tyrant's brass hide runs molten when it is pressed: whenever a creature Grapples it or hits it with a melee attack from within its reach while the tyrant is not Incapacitated, a seam of the tyrant's burning brass bursts open, searing the offender and leaving the tyrant's surface glowing white-hot until the end of its next turn." [trait/on_being_hit/damage] [family: body-reaction] — menu: heated-body, resonant-body, weapon-lodge (+ shelf: phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, truth-aura, fear-aura, kill-denial)
[reskin] composed candidates on the menu: trait — composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does damage; leading: heated-body (on_being_hit/damage), resonant-body (on_being_hit/damage), composed:body-reaction:damage:t0 (on_being_hit/damage)
[reskin] keys would have bound: trait — heated-body (burn, brass)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: heated-body, composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, resonant-body — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:body-reaction:damage:t2: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:body-reaction:damage:t2" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "burning brass hide that sears on contact" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] fear moved to a row that deals no damage: the sheet declared Frightened and a Fire row cannot carry it by print — fear-aura carries it instead ("Fear Aura" in Traits)
[reskin] signature template (trait): fear-aura -> Traits/"Fear Aura" ("the sheet declared Frightened and its Fire damage cannot carry it by print")
[reskin] free signature row: "Molten Brass" — the trait seat cannot quote the GM, but the call names the element it expresses: "burning brass hide that sears on contact". Earns no clause credit; the homebrew path allows 1 and this is number 3
[reskin] trait ceiling: "Molten Brass" does not ship — 4 traits already, and print's ceiling for a material body is 4
[reskin] weapons answered: Brass Fist = none
[reskin] chassis nova: "Furnace Vent (Recharge 5-6)" — the brute-17-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Fire — the call read this creature's energy as Fire and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Fire (merged into the header write)
[reskin] immunities stamped for type: Construct -> Fire, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] name-canon stands down: the path answered homebrew on "a tyrant of burning brass who rules a ci" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] dead control row: "Forge-Bell Decree" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Forge-Bell Decree.
[reskin] free-row budget by card size: CR 17 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 10 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Forge-Bell Decree" [action/save/condition]
[reskin] lint: 0 findings
audit finding below confidence gate: Seismic Stomp A stomp by a Large brass tyrant that knocks targets Prone but shakes nothing else is disconnected from the creature's forge-city fiction and from Foundry Breaker, whose own text destroys structures.
[reskin] audit: [Forge-Bell Decree: Compelled movement toward the t…able route on its turn and can't take Reactions"), Forge-Bell Decree: Rider refers to a 'lure' that n…is immune to this creature's lure for 24 hours.")]
[reskin] audit defect: Actions/"Forge-Bell Decree" [model-written] high open_ended — Compelled movement toward the tyrant with no escape clause, repeat save, or interior-escape clause strands affected creatures in its melee reach with no rules-legal way out — the Charmed condition's own ends do not end the movement compulsion within the turn. — Give the forced-movement clause its own escape: e.g. it ends at the end of the target's turn or if the target takes damage, or allow a repeat save when the target is damaged. (about: "while Charmed this way, it must move toward the brass tyrant by the safest available route on its turn and can't take Reactions")
[reskin] audit defect: Actions/"Forge-Bell Decree" [model-written] high dead_reference — Rider refers to a 'lure' that no entry in the block defines or names. — Replace 'lure' with a reference to this entry (e.g. 'immune to Forge-Bell Decree'). (about: "The target is immune to this creature's lure for 24 hours.")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Brass Tyrant" — donor brute-17-juggernaut, CR 17
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 1 open (1 never-written)
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 16-brass-tyrant.json — fields: generation
```

---

## 17-pit-fiend

## 17. Pit Fiend — CR 20

**Input:** `name: Pit Fiend | who collects the oaths of dying knights`
**Donor:** defender-17 -> CR 20 (invented — no printed peer)
**Signature:** library

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

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Abyssal Ash Brand.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Abyssal Ash Brand. Charisma Saving Throw: DC 21, one creature within 60 feet. Failure: 28 (8d6) Fire damage, and the target is cursed. While cursed, the target can't regain Hit Points.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

Reactions

Sulfurous Reek. Trigger: The pit fiend takes damage from a melee attack. Response—Constitution Saving Throw: DC 21, the triggering creature. Failure: The target has the Poisoned condition until the end of its next turn. Success: The creature is immune to this effect for the next hour.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
!! [ENRICHMENT] Failed to enrich Brass Tyrant: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] twist — Pit Fiend (is) — "Name field: Pit Fiend" (code)
[route] defender-leader type=Fiend mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: the call reads no worked magic in these words | defender-leader: ✓ ("Pit Fiend — who collects the oaths of dy") | defender: the call read "knights" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote
[concept] name: "Pit Fiend" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] resolve: archetype=defender type=Fiend typeFrom=the route call themes=fiendish/grave mind=sapient style=leader energy=Fire mix=both identity=✓ lore=✓
[concept] name: provided "Pit Fiend"
[concept] mechanics: none claimed
[concept] signature elements: collecting the oaths of dying knights [behavior] | a body of smoldering abyssal ash [body] | an aura of dread authority that commands the sworn [aura]
[concept] identity: The Pit Fiend opens not with fire but with a demand: it breathes a gout of abyssal ash across a dying line and names every knight who flinches, daring them to swear. Every round after, it fights beside whatever it has claimed — a warlord whose aura of dread authority hardens its sworn, whose iron-mounted parry turns a deathblow aside, and who collects each oath as a trophy, punishing oath-breakers with the same ash it offers as communion. It never flees; when bloodied it becomes a grinning recruiter, toying with the survivors, because a knight who breaks is worth more to it than one who dies.
[concept] lore: Born in the ash-pits beneath a battlefield that never stopped burning, it descends to the field of the dying to buy their last breaths with promised glory, and every oath it collects becomes another link in the chain of lesser devils it commands.
[reskin] print canon route: the Pit Fiend's body outranks the leader seat — no verb in the words names it; the plain defender line
[reskin] print canon defenses: HP 281 -> 337, AC 22 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] donor: defender-17 -> CR 20 (invented — no printed peer)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] seats: action <- "collecting the oaths of dying knights" | trait <- "a body of smoldering abyssal ash"
[reskin] [path] decides: twist on the Pit Fiend (the matcher agrees)
[reskin] print canon: "Pit Fiend — who collects the oaths of dying knights" heads on the Pit Fiend — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline by rule: "the pit fiend" — the call answered "the pit fiend" (kind), which the name does not support
[reskin] inline form: "the pit fiend" — the model's own reading of the name
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] the clause is its own quote: trigger "at_will" stands on "collects the oaths of dying knights" — the call offered no separate quote and needs none (1b)
[reskin] clauses: "Pit Fiend —" -> has (descriptive), head | "collects the oaths of dying knights" -> has (mechanical) [asked: at_will/condition] [askMechanic: charm]
[reskin] open asks handed to the idea call: "collects the oaths of dying knights" [charm]
[reskin] idea anchored: action — "The pit fiend exhales a gout of abyssal ash over each creature of its " answers the GM's "collects the oaths of dying knights"
[reskin] idea unanchored: trait — "The pit fiend's body is a shell of smoldering abyssal ash that never c" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: seal, shield-bash, active-toll, random-ray, herd, shell-withdraw, rally, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "collects the oaths of dying knights", so role and style do not filter the menu (legality still does); 17 template(s) offered
[reskin] menu pruned: action — push-prone (the sheet cannot render them)
[reskin] signature idea (action): "The pit fiend exhales a gout of abyssal ash over each creature of its choice within a cone that it can see. Each target must succeed on a Charisma saving throw or be marked by the ash, its outline smoldering with a faint infernal script. While marked, the target is cursed: whenever it willingly moves away from the pit fiend or targets another creature with an attack, it takes fire damage as the oa" [action/save/condition] [family: mark] — menu: ground-burst, terror-pulse, slow-bolt, disarm, curse-debt, reveal, wind-up, exploiter, trample, thrown-burst, condition-payoff, execute, lure, pacify, escalating-dread, sensory-strike, thrown-burst-seed (+ shelf: delayed-brand, patient-defense, lay-on-hands, second-wind, aggro-curse, self-invisibility, focus, feint-slip, riposte, answering-strike, stunning-strike, charge-push, contagion, pounce, isolation, charge)
[reskin] lead by this seat's own clause: action — "charm" from the clause this seat serves, not the sheet's "curse"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — charm: lure, pacify, aggro-curse
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: lure (save/condition), pacify (save/condition), aggro-curse (save/movement)
[reskin] keys would have bound: action — aggro-curse, curse-debt (oath)
[reskin] classification handed to the fit call: shape=condition when=at_will
[reskin] word match declined by the call: lure, pacify, terror-pulse, reveal, exploiter, escalating-dread, sensory-strike — the key word does not mean the mechanic here
[reskin] signature template: curse-debt -> Actions/"Abyssal Ash Brand" ("the target is marked by abyssal ash and cursed, suffering fire damage when it mo [verb: oath:concept]")
[reskin] keys spent by the action: oath
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The pit fiend's body is a shell of smoldering abyssal ash that never cools. Whenever it takes damage from a melee attack, the attacker must succeed on a Constitution saving throw or be Poisoned until the end of its next turn by the choking, sulfurous reek of its burning form. A creature that succeeds is immune to this effect for the next hour." [trait/on_being_hit/condition] [family: body-reaction] — menu: heated-body, weapon-lodge (+ shelf: phobia, energy-aura, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial)
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition), composed:body-reaction:condition:t1:poisoned (on_being_hit/condition)
[reskin] classification handed to the fit call: shape=condition when=at_will
[reskin] word match declined by the call: composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t2:poisoned, heated-body, weapon-lodge, noxious-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:condition:t1:pois" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a rider that claims something from a dying creature (creatures that di)
[reskin] seat answered, but: the call said "The pit fiend's body is a shell of smoldering abyssal ash that never cools. Whenever it takes damage from a melee attack" is carried by "Sulfurous Reek", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The pit fiend's body is a shell of smoldering abyssal ash that never c" and wrote no row of that kind (refused: "Sulfurous Reek" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence. This fires in RESPONSE to something — being hit, damaged or moved — which print writes as a REACTION: answer in "reactions" with a trigger and a response, and put the save in the response's "save" object (${reactionSaveSpec()})) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Sulfurous Reek" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] seat answered, but: the call said "The pit fiend's body is a shell of smoldering abyssal ash that never cools. Whenever it takes damage from a melee attack" is carried by "Sulfurous Reek", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a rider that claims something from a dying creature (creatures that di") and wrote a trait instead: "Sulfurous Reek" -> Reactions. *Trigger:* The pit fiend takes damage from a melee attack. *Response—Constitution Saving Throw:* DC 21, the triggering c
[reskin] authored row numbers: "Sulfurous Reek" — the call declared 1 number(s) promised
[reskin] seat landed on the second try: trait — "Sulfurous Reek" after ""Sulfurous Reek" — a trait is not a save — the save form takes stat, target and "
[reskin] free signature row: "Sulfurous Reek" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Sulfurous Reek" is HANDED "collects the oaths of dying knights" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Sulfurous Reek" ("The pit fiend's body is a shell of smoldering abyssal ash that never cools. Whenever it takes damage from a melee attack, the attacker must succeed on a Constit [authored: the catalog held no shape for it]")
[reskin] weapons answered: Cinderscale Claw = none
[reskin] languages by mind: "Infernal; telepathy 120 ft." -> "Infernal, telepathy 120 ft." (sapient)
[reskin] print canon languages: "Infernal, telepathy 120 ft." -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Cinderscale Claw" -> "Bite" — the Pit Fiend's own row
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Abyssal Ash Brand.
[reskin] free-row budget by card size: CR 20 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 9 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] typed row kept over the budget: Reactions/"Sulfurous Reek" stays — it was written for the typed clause "collects the oaths of dying knights", and the budget limits only rows the engine invents
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Sulfurous Reek" [no template]
[reskin] row binds its clause: "Abyssal Ash Brand" answers "collects the oaths of dying knights" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "collects the oaths of dying knights" -> "Abyssal Ash Brand" — trigger at_will
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Sulfurous Reek" claims "collecting the oaths of dying knights" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Sulfurous Reek")
[reskin] audit: [Abyssal Ash Brand: The curse has no duration, no e…ile cursed, the target can't regain Hit Points."), Sulfurous Reek: The reaction only imposes a one-tu…soned condition until the end of its next turn.")]
[reskin] audit defect: Actions/"Abyssal Ash Brand" [catalog] high open_ended — The curse has no duration, no escape, and no end condition beyond the creature's death, so a Charisma save failure permanently denies healing with no rules-legal path out. — Give the curse a fixed duration or a repeat save to end it. (about: "While cursed, the target can't regain Hit Points.")
[reskin] audit defect: Reactions/"Sulfurous Reek" [model-written] medium weak — The reaction only imposes a one-turn Poisoned condition with no damage, healing denial, or other teeth — and it duplicates what Bite already applies more severely, so the row is not worth the reaction it spends. — Give the reaction a distinct payload (e.g. damage or a condition Bite does not already inflict) so it earns its slot. (about: "The target has the Poisoned condition until the end of its next turn.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Pit Fiend" — donor defender-17, CR 20
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 17-pit-fiend.json — fields: generation, sections
```

---

## 18-bone-sun-archlich

## 18. Bone-Sun Archlich — CR 20

**Input:** `an archlich enthroned on a sun of bone`
**Donor:** caster-21 -> CR 20
**Signature:** library

### Block
```
Bone-Sun Archlich
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

Legendary Resistance (3/Day).If the archlich fails a saving throw, it can choose to succeed instead.
Spirit Jar.If destroyed, the archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the archlich's lair.
Protective Magic (Reaction).The archlich casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The archlich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of Corona Through the Mark.
Eldritch Burst: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 31 (4d12 + 5) force damage.
Paralyzing Touch: Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the start of the archlich's next turn.
Spellcasting: The archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - At will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/day each: Animate Dead, Dimension Door, Plane Shift
1/day each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Corona Through the Mark: One creature within 30 feet of the archlich must make a DC 19 Dexterity saving throw, taking 28 (8d6) necrotic damage on a failed save, or half as much damage on a successful one.
Legendary Actions

The archlich can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The archlich regains spent legendary actions at the start of its turn.

Deathly Teleport: The archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an Undead in a 20-foot radius originating from the archlich must make a DC 19 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
Frightening Gaze: The archlich casts Fear, using the same spellcasting ability as Spellcasting. The archlich can't take this action again until the start of its next turn.
```

### Trace
```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
!! [ENRICHMENT] Failed to enrich Pit Fiend: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] twist — Lich (is) — "archlich" (call)
[route] caster (artillery) type=Undead mechanics=aura — casts: implied by the kind — "archlich" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("archlich enthroned") | caster: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an archlich enthroned on a sun of bone…" is the description, not a name
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=grave/arcane mind=sapient style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: the sun of bone it is enthroned upon [object] | bone-corona that lances and sheds shards at any who close [aura] | grave-cold spellcasting from a throne it never leaves [behavior]
[concept] identity: The archlich does not walk to war — it is borne upon a sun of bone, a whorl of fused skeletons and grave-ivory that hovers and turns, shedding shards and cold pressure as it comes. Every round it fights from the throne's height as a caster should, laying bolts and blasts of grave-cold radiance across the field and letting its bone-sun lash out at anything that closes, so that enemies must fight through the light before they reach the caster. It is patient and utterly unhurried, tasting the fight before committing, and it never flees — if its throne is shattered it rises from it armored in the shards of its own bone-crown.
[concept] lore: An archlich who refused death so often that it built its own heaven: it found no sky to rule, so it fused the skeletons of its slaughtered cult into a sun of bone and enthrones itself at the center, harvesting the dead of whole regions to keep the corona turning.
[reskin] nova capped: "Area Nova" 76 → 66 (the chassis nova obeys the cap: 66 at CR 20)
[reskin] print canon pb: print's +12 on PB +7 reads +11 on this sheet's PB +6; DCs follow
[reskin] print canon defenses: HP 300 -> 315, AC 19 -> 20 — the Lich's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's at its own CR; attack +10 -> +11, DC 19 (print's, on this sheet's PB)
[reskin] donor: caster-21 -> CR 20
[reskin] seats: action <- "grave-cold spellcasting from a throne it never leaves" | trait <- "the sun of bone it is enthroned upon"
[reskin] [path] decides: twist on the Lich (the matcher agrees)
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — name "Grave Bolt" is a launcher but the row swings in melee — a crossbow never has reach; use a thrown weapon or a blade
[reskin] mental-anatomy stamp: "Bone Shard" Piercing -> Necrotic (repair exhausted; the engine picks the magical type)
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the archlich" — the call's own answer (kind), built from the name
[reskin] inline form: "the archlich" — the model's own reading of the name
[reskin] the sheet's declared ask: relic — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an archlich enthroned on a sun of bone" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "When the archlich casts a spell that targets one creature, the bone-su" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The bone-sun it is enthroned upon drinks the dying: whenever a creatur" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: snare, seal, snare-bolt, herd, rally, phase-slip, heated-body, false-appearance, absorption, bloodied-burst, spider-climb, terrain-walk, faultless-tracker, web-walker, noxious-aura, uncanny-sense, sealed-body, warded-mending, mimicry, gaze-aura, blurred-form, kill-denial
[reskin] menu pruned: action — thrown-burst-seed, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When the archlich casts a spell that targets one creature, the bone-sun tilts and its corona flares through the spell, and the spell also lashes every creature of the archlich's choosing within a short emanation of the target, so that no one can stand beside the caster's mark and weather it for free." [action/always/damage] [family: zone] — menu: gaze-single, condition-payoff, execute, lure, pacify, escalating-dread, slow-bolt, sensory-strike, drain, curse-debt, zone-seed, reveal, throw-retrieve (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, life-drain, bolt-restrain, bolt-drag, bolt-mark)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires always/does damage; leading: zone-seed (always/damage), throw-retrieve (always/damage), condition-payoff (save/damage)
[reskin] classification handed to the fit call: mechanic=aura
[reskin] word match declined by the call: zone-seed, drain — the key word does not mean the mechanic here
[reskin] closest refused: action — "zone-seed" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a single-target spell also bursting in an aura around the marked creat)
[reskin] seat answered, but: the call said "When the archlich casts a spell that targets one creature, the bone-sun tilts and its corona flares through the spell, a" is carried by "Corona Through the Mark", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write an action for "When the archlich casts a spell that targets one creature, the bone-su" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat answered, but: the call said "When the archlich casts a spell that targets one creature, the bone-sun tilts and its corona flares through the spell, a" is carried by "Corona Through the Mark", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("a single-target spell also bursting in an aura around the marked creat") and wrote an action instead: "Corona Through the Mark" -> Actions. *Dexterity Saving Throw*: DC 19, one creature within 30 feet. *Failure:* 28 (8d6) Necrotic damage. *Success:* Half damag
[reskin] authored row numbers: "Corona Through the Mark" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Corona Through the Mark" after "you wrote no row of the kind asked for (an action)"
[reskin] seat takes its clause: "Corona Through the Mark" is HANDED "an archlich enthroned on a sun of bone" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Corona Through the Mark" ("When the archlich casts a spell that targets one creature, the bone-sun tilts and its corona flares through the spell, and the spell also lashes every creature  [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The bone-sun it is enthroned upon drinks the dying: whenever a creature dies within the reach of its cold corona, the throne seizes the departing life and knits fresh bone into itself, restoring the archlich's hit points and letting it shed a burst of grave radiance that leaves nearby enemies Poisoned until the start of its next turn." [trait/always/resource] [family: heal] — menu: phobia, aberrant-ground, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, marking-light, relic-object, undead-fortitude, truth-aura, fear-aura, death-burst (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the heal family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — relic: relic-object
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: relic-object (always/defense), phobia (always/condition), aberrant-ground (always/movement)
[reskin] classification handed to the fit call: mechanic=aura
[reskin] word match declined by the call: energy-aura, relic-object, death-restoration — the key word does not mean the mechanic here
[reskin] closest refused: trait — "energy-aura" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers only when a creature dies in the corona, healing the archlich)
[reskin] seat answered, but: the call said "The bone-sun it is enthroned upon drinks the dying: whenever a creature dies within the reach of its cold corona, the th" is carried by "Bone-Sun Thirst", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The bone-sun it is enthroned upon drinks the dying: whenever a creatur" and wrote no row of that kind (refused: "Bone-Sun Thirst" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Bone-Sun Thirst" — a trait is not a save — the save form takes stat, target and effect as fields and the engi); asking once more with the reason
[reskin] seat answered, but: the call said "The bone-sun it is enthroned upon drinks the dying: whenever a creature dies within the reach of its cold corona, the th" is carried by "Bone-Sun Thirst", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The bone-sun it is enthroned upon drinks the dying: whenever a creatur" and wrote no row of that kind (refused: "Bone-Sun Thirst" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: trait — first: "Bone-Sun Thirst" — a trait is not a save — the save form takes stat, target and effect as; second: "Bone-Sun Thirst" — a trait is not a save — the save form takes stat, target and effect as; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "energy-aura" nearest and judged its subject FLIPPED against the clause (triggers only when a creature dies in the corona, healing the archlich); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The bone-sun it is enthroned upon drinks the dying: whenever a creature dies within the reach of its cold corona, the throne seizes the departing life and knits fresh bone into itself, restoring the archlich's hit points and letting it shed a burst of grave radiance that leaves nearby enemies Poisoned until the start of its next turn." [trait/always/resource] — the model found no template that holds it (offered: relic-object, phobia, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, marking-light, undead-fortitude, death-burst, energy-aura, truth-aura, fear-aura)
[reskin] weapons answered: Grave Bolt = none; Bone Shard = none; Cold Corona = none
[reskin] weapon declined: "Grave Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Grave Bolt" — a launcher, never thrown, range 80/320
[reskin] chassis nova: "Cold Corona (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] speed by concept: dropped Fly 30 ft. (hover) — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon size: Large -> Medium — the Lich's
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Lich's own type stands
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Eldritch Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Lich's weapon is thrown)
[reskin] print canon attack: "Bone Shard" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon multiattack: "the archlich makes three attacks, using Eldritch Burst or Paralyzing Touch in any combination." — the Lich's own
[reskin] ranged row off: "Grave Bolt" leaves — the Lich carries no ranged row and the words name none
[reskin] dead wildcard name swept — "Lash Out" was only about "Grave Bolt"; the row drops
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in DEX, CON, INT, WIS — the Lich's own set, at this sheet's stats and PB 6 (changed DEX)
[reskin] print canon skills: "Arcana +11, Perception +8" -> "Arcana +17, History +11, Insight +8, Perception +8" — the Lich's own skills, each derived from this sheet's stat and PB
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] resistances derived withheld: print's Lich owns the line (Cold, Lightning)
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Cold Corona (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Lich's
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Reactions/"Protective Magic" — print's own row takes the name back from the engine's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] multiattack replacement clause: It can replace one attack with a use of Corona Through the Mark.
[reskin] free-row budget by card size: CR 20 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 10 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Corona Through the Mark" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Corona Through the Mark carries "bone-corona that lances and sheds shards at any who close" — "one creature within 30 feet"
[reskin] audit: [Corona Through the Mark: The row is nothing but a …) Necrotic damage. *Success:* Half damage only."), Corona Through the Mark: The name and target claus… in range. (about: "one creature within 30 feet")]
[reskin] audit rename blocked — "Corona Through the Mark" -> "Corona Lance" would drop the GM's own word "through"
[reskin] audit defect: Actions/"Corona Through the Mark" [model-written] high weak — The row is nothing but a save-for-damage cantrip in a block whose Multiattack already delivers roughly 93 damage a turn, so it is never worth the attack it replaces and delivers none of the corona's shard-shedding or any condition. — Give it a payload beyond damage — a lingering mark that lances the target, or an effect on creatures that close on the archlich — so spending an attack on it does something Eldritch Burst does not. (about: "28 (8d6) Necrotic damage. *Success:* Half damage only.")
[reskin] [gap] triggers only when a creature dies in the corona, healing the archlich and poisoning nearby foes — "The bone-sun it is enthroned upon drinks the dying: whenever a creature dies within the reach of its cold corona, the throne seizes the departing life and knits fresh bone into itself, restoring the archlich's hit points and letting it shed a burst of grave radiance that leaves nearby enemies Poisoned until the start of its next turn." — Bone-Sun Archlich [seat: trait [trait/always/resource]] (closest offered: energy-aura) [effect: resource] [menu: relic-object phobia aberrant-ground bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound marking-light undead-fortitude death-burst energy-aura truth-aura fear-aura] [same-cell unoffered: lay-on-hands second-wind volley-order] [same-seat rejected: false-appearance:body-verdict adhesive:role spider-climb:body-verdict terrain-walk:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement berserk:role evasion:role sealed-body:body-verdict guarded-stance:role mimicry:body-verdict assassinate:role blurred-form:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] record reconciled: "Eldritch Burst" no longer imposes Poisoned — the clause left, so the record goes with it
[reskin] record reconciled: "Paralyzing Touch" no longer imposes Poisoned — the clause left, so the record goes with it
[reskin] done: "Bone-Sun Archlich" — donor caster-21, CR 20
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 18-bone-sun-archlich.json — fields: generation, other_edition
```

---

## 19-ancient-gold-dragon

## 19. Ancient Gold Dragon — CR 24

**Input:** `name: Ancient Gold Dragon | `
**Donor:** —
**Signature:** —

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
!! [ENRICHMENT] Failed to enrich Bone-Sun Archlich: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 18 taken name(s) the recording carried
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
[harness] enrichment not run (4 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] replay identical to 19-ancient-gold-dragon.json
```

---

## 20-trench-siren

## 20. Trench Siren — CR 24

**Input:** `a leviathan of the trench whose song drowns fleets`
**Donor:** brute-21 -> CR 24 (invented — no printed peer)
**Signature:** library

### Block
```
Trench Siren

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
10
+0
+0
MOD
SAVE
DEX
10
+0
+0
WIS
14
+2
+9
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

Skills Athletics +16, Perception +9

Senses darkvision 120 ft., tremorsense 120 ft.; Passive Perception 19

Languages Common

CR 24 (XP 62,000; PB +7)

Traits

Amphibious. The siren can breathe air and water.

Legendary Resistance (3/Day). If the siren fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The siren makes two Fluke attacks. It can replace one attack with a use of Drowning Lure.

Fluke. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Verse (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Drowning Lure. Wisdom Saving Throw: DC 24, each creature of the siren's choice in a 120-foot Emanation originating from the siren that can see or hear the siren. Failure: The target has the Charmed condition until the end of its next turn, and while Charmed this way, it must move toward the siren by the safest available route on its turn and can't take Reactions. Success: The target is immune to this creature's lure for 24 hours.

Reactions

Resonant Shell. Trigger: The siren takes Thunder damage. Response: The sound rolls through its plates, and the siren immediately makes one Fluke attack.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the siren can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Breach Strike. The siren moves up to half its Speed without provoking Opportunity Attacks, and it makes one Fluke attack.

Wave Slam. Strength Saving Throw: DC 24, each creature within 10 feet of the siren. Failure: The target has the Prone condition.

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
!! [ENRICHMENT] Failed to enrich Ancient Gold Dragon: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] homebrew — "a leviathan of the trench whose song drowns fleets" (call)
[route] brute type=Beast mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("a leviathan of the trench") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] name: provided_name rejected — "the leviathan of the trench whose song d…" is the description, not a name
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=aquatic/voice mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: the drowning song of the trench [behavior] | barnacled bone-plated leviathan body [body] | a pressure of sound that rolls through hulls [aura]
[concept] identity: The leviathan opens a battle from beneath the fleet, releasing a low, subsonic verse that rolls through hulls and skull alike, then rises to smash with fluke and body while the song keeps drowning the crew's ears. Round after round it drags itself through the water, battering ships and swimmers with its mass, and it does not retreat — a wounded leviathan only deepens its song into something desperate and crushing. It is a patient, arrogant thing that toys with the surface-dwellers, circling a crippled ship and singing until the timbers split and the last voices fail.
[concept] lore: Old trench-beasts learned that the surface world makes noise — keels, engines, and shouting crews — and the leviathan sings back until the noise stops, feeding on the wrecks that settle to its dark domain.
[reskin] mind tier held: INT stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: WIS stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier: CHA 14 -> 20 — the call read this creature as formidable at CR 24
[reskin] donor: brute-21 -> CR 24 (invented — no printed peer)
[reskin] seats: action <- "the drowning song of the trench" | trait <- "barnacled bone-plated leviathan body"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: "Legendary Ranged Attack" leaves with it (it made a Ranged Attack attack)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] type honesty: Beast above CR 10 -> Monstrosity (print ceiling: CR 8)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the siren" — the call's own answer (kind), built from the name
[reskin] inline form: "the siren" — the model's own reading of the name
[reskin] save dc derived: DC 23 -> 24 (8 + PB 7 + the sheet's best 9) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a leviathan of the trench whose song drowns fleets" -> has (mechanical) [asked: save_single] [askMechanic: dazzle]
[reskin] open asks handed to the idea call: "a leviathan of the trench whose song drowns fleets" [dazzle]
[reskin] idea anchored: action — "The siren's subsonic verse settles into the timbers and bone of every " answers the GM's "a leviathan of the trench whose song drowns fleets"
[reskin] idea unanchored: trait — "The siren's barnacled, bone-plated hide is a living reef of resonating" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 27 of 27 answered; not true of this body: shield-bash, herd, drain, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, hook-rider, life-drain
[reskin] menu: taste stands down — action answers the GM's "a leviathan of the trench whose song drowns fleets", so role and style do not filter the menu (legality still does); 5 template(s) offered
[reskin] menu pruned: action — push-prone, thrown-burst-seed (the sheet cannot render them)
[reskin] condition rider rides the attack: action — the payoff family composes a rider, so the idea is re-seated action/save -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (action): "The siren's subsonic verse settles into the timbers and bone of every creature that can hear it, filling them with a creeping dread that leaves them Frightened of the siren until the end of its next turn; a creature that succeeds on the saving throw is instead Deafened until the end of its next turn as the verse rings in its skull." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, pounce, charge, isolation (+ shelf: escalating-dread, terror-pulse, exploiter, execute, lure, pacify, slow-bolt, sensory-strike, disarm, delayed-brand, curse-debt, reveal, shell-withdraw, second-wind, aggro-curse, self-invisibility, focus, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte)
[reskin] lead by this seat's own clause: action — "dazzle" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: action — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] declared mechanic leads the menu: action — dazzle: sensory-strike
[reskin] menu ordered by the idea's stamps: action — idea fires on_hit/does condition; leading: sensory-strike (save/condition), stunning-strike (on_hit/condition), pounce (on_hit/condition)
[reskin] keys would have bound: action — lure (song)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: escalating-dread, stunning-strike, composed:payoff:condition — the key word does not mean the mechanic here
[reskin] value check: "Drowning Lure (Recharge 5-6)" EV 41.8 vs floor 19.8 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature template: lure -> Actions/"Drowning Lure (Recharge 5-6)" ("The siren's song compels creatures that hear it to move toward it and be charmed [verb: song:concept, siren:idea]")
[reskin] keys spent by the action: song
[reskin] signature idea (trait): "The siren's barnacled, bone-plated hide is a living reef of resonating shell; whenever it takes Thunder damage, the sound rolls through its plates and it can immediately make a Fluke attack as a reaction." [trait/on_being_hit/damage] [family: body-reaction] — menu: resonant-body, weapon-lodge (+ shelf: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] lead by this seat's own clause: trait — "dazzle" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2 (the body-reaction family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does damage; leading: resonant-body (on_being_hit/damage), composed:body-reaction:damage:t0 (on_being_hit/damage), composed:body-reaction:damage:t1 (on_being_hit/damage)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: resonant-body, composed:body-reaction:damage:t0, composed:body-reaction:damage:t1, composed:body-reaction:damage:t2, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest refused: trait — "resonant-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: strikes back with a Fluke attack when it takes Thunder damage, not whe)
[reskin] seat answered, but: the call said "The siren's barnacled, bone-plated hide is a living reef of resonating shell; whenever it takes Thunder damage, the soun" is carried by "Resonant Shell", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("strikes back with a Fluke attack when it takes Thunder damage, not whe") and wrote a trait instead: "Resonant Shell" -> Reactions. *Trigger:* The siren takes Thunder damage. *Response:* The sound rolls through its plates, and the siren immediately mak
[reskin] authored row numbers: "Resonant Shell" — the call declared 0 number(s) promised
[reskin] free signature row: "Resonant Shell" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Resonant Shell" ("The siren's barnacled, bone-plated hide is a living reef of resonating shell; whenever it takes Thunder damage, the sound rolls through its plates and it can im [authored: the catalog held no shape for it]")
[reskin] weapons answered: Fluke = none; Drowning Verse = none; Abyssal Toll = none; Breach Strike = none; Wave Slam = none
[reskin] chassis nova: "Drowning Verse (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Fluke" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] dead control row: "Drowning Lure" sheds its gate — no damage, no KO condition; it joins the Multiattack menu instead
[reskin] multiattack replacement clause: It can replace one attack with a use of Drowning Lure.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Resonant Shell" [no template]
[reskin] row binds its clause: "Drowning Lure" answers "a leviathan of the trench whose song drowns fleets" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] lint: 0 findings
audit finding below confidence gate: Wave Slam Wave Slam costs a legendary action to impose only Prone with no damage and no follow-up, a nuisance payload where the name and the siren's Thunder/orison identity promise a concussive hit.
[reskin] audit: [Drowning Lure: The Charmed target is compelled to …siren by the safest available route on its turn"), Resonant Shell: The reaction's flavor (sound rolli…d the siren immediately makes one Fluke attack.")]
[reskin] audit rename blocked — "Resonant Shell" -> "Plate Retort" would drop the GM's own word "shell"
[reskin] audit defect: Actions/"Drowning Lure" [catalog] medium open_ended — The Charmed target is compelled to move toward the siren with no escape written in the entry and no statement of what happens when it reaches the siren — the compulsion has an end condition for the condition but no stated behavior at contact. — State what the compelled movement does on arrival (e.g., the target stops when adjacent) or that the condition ends on reaching the siren. (about: "it must move toward the siren by the safest available route on its turn")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Resonant Shell" carries "The siren's barnacled, bone-plated hide is a living reef", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Trench Siren" — donor brute-21, CR 24
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 20-trench-siren.json — fields: generation, sections
```

---

## 21-owlbear

## 21. Owlbear — CR 3

**Input:** `name: Owlbear | `
**Donor:** brute-2 -> CR 3
**Signature:** dropped

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
!! [ENRICHMENT] Failed to enrich Trench Siren: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 20 taken name(s) the recording carried
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
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 21-owlbear.json — fields: generation
```

---

## 23-vashka-the-red

## 23. Vashka the Red — CR 6

**Input:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`
**Donor:** defender-5 -> CR 6
**Signature:** dropped

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
!! [ENRICHMENT] Failed to enrich Owlbear: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 22 taken name(s) the recording carried
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
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
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
[reskin] typed row kept over the budget: Reactions/"Hold the Wall" stays — it was written for the typed clause "fights from a shield wall", and the budget limits only rows the engine invents
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
[reskin] ledger: 2 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 1 open (1 spell-missing)
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 23-vashka-the-red.json — fields: generation
```

---

## 24-titan-hollow-scythe

## 24. Titan-Hollow Scythe — CR 9

**Input:** `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by pinning prey with two arms and carving with the others.`
**Donor:** brute-8-grappler -> CR 9
**Signature:** library

### Block
```
Titan-Hollow Scythe

Large Monstrosity, Unaligned

AC 15
Initiative -1 (9)

HP 161 (19d10 + 57)

Speed 40 ft.

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
6
-2
-2

Skills Athletics +8, Perception +6

Immunities Acid

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 16

Languages None

CR 9 (XP 5,000; PB +4)

Actions

Multiattack. The scythe makes two attacks, using Scythe or Spitting Maw in any combination.

Scythe. Melee Attack Roll: +8, reach 10 ft. 17 (3d8 + 4) Slashing damage plus 13 (3d8) Acid damage.

Spitting Maw. Melee Attack Roll: +8, reach 5 ft. 17 (3d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16).

Reactions

Thrashing Prey. Trigger: A creature the scythe is grappling attacks it. Response: The scythe makes a Scythe attack against that creature.

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
!! [ENRICHMENT] Failed to enrich Vashka the Red: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] homebrew — "A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell t" (call)
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape: grip on the GM's own words "pinning prey with two arms" | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("pinning prey with two arms and carving w") | brute-grappler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Monstrosity typeFrom=the route call themes=bestial/venomous mind=bestial style=grappler energy=Acid mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf
[concept] signature elements: two arms pin while two carve [behavior] | four scythe-arms [body] | acid-shedding shell [body]
[concept] identity: A four-armed scythe horror that opens by spitting a caustic gob to stagger a target, then lunges to clamp two scythe-arms into a pinning hold while the other two carve the held prey apart. It never releases early and never retreats, its shedding acid shell punishing anyone who strikes it or lingers in its reach, so bloodied quarry only makes it clamp tighter and cut faster.
[concept] lore: Hatched from a clutch buried in the acid-fouled hollow of a dead titan's shell, it wants nothing but a warm struggling body to hold still beneath its blades.
[reskin] mind tier held: INT stays 4 against "feeble" — the call read this creature as bestial, and the card's 4 is already that dim
[reskin] mind tier held: CHA stays 6 against "feeble" — the card's 6 is already feeble
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 9
[reskin] donor: brute-8-grappler -> CR 9
[reskin] seats: action <- "two arms pin while two carve" | trait <- "four scythe-arms"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] engulf engine: Cocoon — the body's own verb
[reskin] named parts: Scythe (slot), Spitting Maw (clone, Grappled) — the user's words, the engine's numbers
[reskin] energy rides the named weapon: "Scythe" is a scythe, so the blow stays Slashing and Acid rides it rather than folding into the blow (print: 11 of 53 weapon rows carry an energy rider)
[reskin] named parts landed: 2 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the scythe" — the call's own answer (kind), built from the name
[reskin] inline form: "the scythe" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "A Large insectile horror" -> has (header) | "It has four scythe-arms" -> has (mechanical) [asked: attack] | "a spitting maw" -> has (mechanical) [asked: save_single] [askMechanic: burst] | "a shell that sheds acid" -> has (mechanical) [asked: on_being_hit/attack] [askMechanic: retaliate] | "It fights by pinning prey with two arms" -> has (mechanical) [asked: on_hit/condition] [askMechanic: grapple] | "carving with the others" -> has (mechanical) [asked: attack]
[reskin] open asks handed to the idea call: "a shell that sheds acid" [retaliate] · "It fights by pinning prey with two arms" [grapple] · "carving with the others"
[reskin] idea anchored: action — "As part of a Scythe attack, the scythe can hook a creature it is grapp" answers the GM's "It fights by pinning prey with two arms"
[reskin] idea unanchored: trait — "The scythe does not reel when struck — while it has a creature grapple" names none of the 3 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 31 of 31 answered; not true of this body: shield-bash, active-toll, random-ray, herd, drain, rally, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, life-drain
[reskin] engulf engine withheld: Bonus Actions/"Cocoon" leaves — the route call read this creature's hold as grip, not contain; the grapple stands and citations of the row are swept
[reskin] menu: taste stands down — action answers the GM's "It fights by pinning prey with two arms", so role and style do not filter the menu (legality still does); 19 template(s) offered
[reskin] menu pruned: action — push-prone, exploiter (the sheet cannot render them)
[reskin] signature idea (action): "As part of a Scythe attack, the scythe can hook a creature it is grappling and drag it along its reach before the blades bite, pulling the pinned prey into the arc of the other arms; the target must succeed on a Strength saving throw or be pulled to a space of the scythe's choosing within its reach and have the Prone condition." [action/save/movement] [family: drag] — menu: leap, condition-payoff, ground-burst, spew, escalating-dread, terror-pulse, thrown-burst-seed, wind-up, trample, thrown-burst, execute, lure, pull-through, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal (+ shelf: delayed-brand, shell-withdraw, second-wind, aggro-curse, self-invisibility, focus, coating, rampage, patient-defense, lay-on-hands, feint-slip, answering-strike, riposte, affliction, contagion, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — grapple: pull-through
[reskin] menu ordered by the idea's stamps: action — idea fires save/does movement; leading: pull-through (save/movement), slow-bolt (save/movement), disarm (save/movement)
[reskin] keys would have bound: action — spew, escalating-dread, sensory-strike, shell-withdraw (spits, horror, spit, shell)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: leap, trample, thrown-burst, ground-burst, condition-payoff, spew, execute, wind-up — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "pull-through" has no key-table verb, but the call quotes "it fights by pinning prey with two arms and carving with the others" from the description
[reskin] value check: "Hooked Reel" EV 29.2 vs floor 16.6 (one attack of 2) — added Success: Half; dice 14 → 32
[reskin] pull-through declined — no verb matched: "Hooked Reel" fitted by shape alone, and this template is reached by a verb — through walls, drown, phase — because what it writes is a body passing through solid matter. The seat goes on as it does for any other miss (owner, 21 November)
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/on_being_hit -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "The scythe does not reel when struck — while it has a creature grappled, the acid shedding from its shell sharpens its focus, and it can make a Scythe attack as a reaction when a creature it is grappling attacks it. The wounded, thrashing prey only makes it clamp tighter and cut faster." [rider/on_hit/condition] [family: payoff] — menu: affliction, contagion, stunning-strike, charge-push, pounce (+ shelf: spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, weapon-lodge, death-burst, kill-denial)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: affliction (on_hit/condition), contagion (on_hit/condition), stunning-strike (on_hit/condition)
[reskin] keys would have bound: trait — fear-aura (horror)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=attack
[reskin] word match declined by the call: affliction, contagion, stunning-strike, pounce, charge-push, bloodied-fury — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:payoff:condition" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants the creature an extra attack as a reaction when a creature it h)
[reskin] seat answered, but: the call said "while it has a creature grappled... it can make a Scythe attack as a reaction when a creature it is grappling attacks it" is carried by "Thrashing Prey", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("grants the creature an extra attack as a reaction when a creature it h") and wrote a trait instead: "Thrashing Prey" -> Reactions. *Trigger:* A creature the scythe is grappling attacks it. *Response:* The scythe makes a Scythe attack against that crea
[reskin] authored row numbers: "Thrashing Prey" — the call declared 0 number(s) promised
[reskin] free signature row: "Thrashing Prey" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Thrashing Prey" ("The scythe does not reel when struck — while it has a creature grappled, the acid shedding from its shell sharpens its focus, and it can make a Scythe attack as [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "carving with the others"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"carving with the others","row":"Multiattack"}], unplaced []
[reskin] clause already answered: "carving with the others" is carried by "Multiattack" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Scythe-Arms = none
[reskin] languages held: None stands — INT 4 on a Monstrosity speaks nothing, whatever the mind read said
[reskin] element immunity: Acid — the call read this creature's energy as Acid and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Acid (merged into the header write)
[reskin] immunities stamped for type: Monstrosity -> Acid
[reskin] name-canon stands down: the path answered homebrew on "A Large insectile horror. It has four sc" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Thrashing Prey" [no template]
[reskin] asked but unanswered: "a shell that sheds acid" asked for on_being_hit and no row binds the clause
[reskin] asked but unanswered: "It fights by pinning prey with two arms" asked for on_hit and no row binds the clause
[reskin] lint: 0 findings
[reskin] element claim revoked: "Thrashing Prey" claims "two arms pin while two carve" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Thrashing Prey")
[reskin] audit: [Multiattack: The scythe has four scythe-arms but t…using Scythe or Spitting Maw in any combination"), Spitting Maw: A maw that SPITS should be a ranged …. (about: "*Melee Attack Roll:* +8, reach 5 ft."), Spitting Maw: The grapple is the entire point of t…: "it has the Grappled condition (escape DC 16)"), Thrashing Prey: The reaction rewards the prey for …he makes a Scythe attack against that creature.")]
[reskin] audit defect: Actions/"Multiattack" [catalog] medium undelivered — The scythe has four scythe-arms but the Multiattack only offers two attacks, so the fantasy of two arms pinning and two carving can never be assembled via Multiattack (Spitting Maw grapples but no Scythe attack pairs with it beyond the base two). — Consider a pin-then-carve structure that lets it grapple with one arm and carve with another, as the creature fiction implies. (about: "using Scythe or Spitting Maw in any combination")
[reskin] audit defect: Actions/"Spitting Maw" [model-written] high misnamed — A maw that SPITS should be a ranged attack; written as a 5 ft. melee attack the name and text describe two different abilities. — Make Spitting Maw a ranged attack (or rename to a bite/grapple to match the melee reach). (about: "*Melee Attack Roll:* +8, reach 5 ft.")
[reskin] audit defect: Actions/"Spitting Maw" [model-written] medium weak — The grapple is the entire point of the pin, yet it imposes no Restrained and no follow-up damage per turn, so the pin is a nuisance the prey can simply walk out of by using its own attacks. — Give the grapple some teeth (Restrained, or damage on escape/start of turn) so pinning is worth an attack. (about: "it has the Grappled condition (escape DC 16)")
[reskin] audit defect: Reactions/"Thrashing Prey" [model-written] low weak — The reaction rewards the prey for attacking while grappled by simply carving it — but it grants no benefit tied to the pin and cannot miss less than a normal attack, making it identical in value to a free Multiattack half. — Have the reaction reinforce the hold (e.g., apply damage that keeps the grapple meaningful, or Restrained until end of turn). (about: "The scythe makes a Scythe attack against that creature.")
[reskin] clause unresolved: "Thrashing Prey" carries "The scythe does not reel when struck — while it has a cr", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] record reconciled: "Scythe" no longer imposes Grappled, Restrained — the clause left, so the record goes with it
[reskin] done: "Titan-Hollow Scythe" — donor brute-8-grappler, CR 9
[reskin] ledger: 5 ask(s) — 3 answered (3 by receipt or anchor, 0 handed), 0 mismatch, 2 open (2 never-written)
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 24-titan-hollow-scythe.json — fields: generation, sections
```

---

## 25-oathbound-bulwark

## 25. Oathbound Bulwark — CR 11

**Input:** `a sentinel of black iron, AC 20, Huge, speed 20 feet`
**Donor:** defender-7-warden -> CR 11
**Signature:** library

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
Oathkeeper's Backhand (Reaction).When a hostile creature moves within 10 feet of the bulwark's ward while the bulwark is within 10 feet of that creature, the triggering creature must succeed on a DC 17 Strength saving throw or be knocked prone and pushed up to 10 feet straight away from the bulwark.
Interpose (Reaction).When a creature within 5 feet of the bulwark that it guards is hit by an attack roll, the attack hits the bulwark instead, and the bulwark has Resistance to the attack's damage.

Actions
Multiattack: The bulwark makes two Fist attacks. It can replace one attack with a use of Iron Advance.
Fist: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
Iron Ward (2/Day): The bulwark targets itself or one creature it can see within 60 feet. The target gains 24 (7d6) temporary hit points, and it gains a +2 bonus to AC until the end of the bulwark's next turn.
Iron Advance: One creature within 5 feet must make a DC 17 Strength saving throw, taking 13 (3d8) bludgeoning damage on a failed save. On a failed save, the target is pushed up to 15 feet away from the bulwark and is knocked prone.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Titan-Hollow Scythe: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 24 taken name(s) the recording carried
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
[reskin] value check: "Iron Advance" EV 10.5 vs floor 12.5 (one attack of 2) — half a hit added: 13 (3d8) Bludgeoning damage on a failed save — half of one 24-damage hit, the attack this row stands in place of; still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature under the floor, and kept: "Iron Advance" — the ladder could not lift it and nothing stands in, so the row the model wrote stays as written
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
[reskin] element expressed: Oathkeeper's Backhand carries "interposing warden's bulk" — "A hostile creature moves within 10 feet of the bulwark's ward while the bulwark "
audit finding below confidence gate: Interpose The row spends the bulwark's reaction to absorb a hit but carries no retaliation or follow-up payload, making it a purely defensive tax with no teeth.
[reskin] audit: [Ward Bond: The ability to pick and reassign a ward…osing, and it can have only one ward at a time."), Interpose: The trigger references a creature 'that…ulwark that it guards is hit by an attack roll."), Ward Bond: The trait binds the bulwark to a ward b…rk is magically bound to a ward of its choosing"), Oathkeeper's Backhand: The trigger requires cross-…the bulwark is within 10 feet of that creature.")]
[reskin] audit defect: Traits/"Ward Bond" [print] high open_ended — The ability to pick and reassign a ward has no stated action, timing, or range within which a candidate qualifies, so the GM cannot adjudicate when the bond is declared or switched, nor what 'a ward of its choosing' is restricted to. — State the action cost/timing for choosing a ward and what kinds of creatures can serve as one. (about: "The bulwark is magically bound to a ward of its choosing, and it can have only one ward at a time.")
[reskin] audit defect: Reactions/"Interpose" [catalog] high dead_reference — The trigger references a creature 'that it guards', but nothing on the sheet establishes which creatures it guards or how guarding is chosen, so the reaction can never fire deterministically. — Tie the trigger to the Ward Bond target (or add a guarding designation) so the protected creature is defined. (about: "A creature within 5 feet of the bulwark that it guards is hit by an attack roll.")
[reskin] audit defect: Traits/"Ward Bond" [print] medium dead_reference — The trait binds the bulwark to a ward but never creates or designates one, and Oathkeeper's Backhand and Interpose both depend on a ward existing, leaving those rows inert unless the GM invents a target. — Define how the ward is designated so dependent rows have a state to reference. (about: "The bulwark is magically bound to a ward of its choosing")
[reskin] audit defect: Reactions/"Oathkeeper's Backhand" [model-written] medium untrackable — The trigger requires cross-checking two separate distance conditions against a ward that the block never defines, so the GM cannot resolve it in the time a reaction allows. — Simplify to a single defined distance between bulwark and creature, keyed to the established ward. (about: "Trigger: A hostile creature moves within 10 feet of the bulwark's ward while the bulwark is within 10 feet of that creature.")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Oathkeeper's Backhand" carries "The bulwark will not abandon its post. While it remains ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] header clause: speed 30 ft. -> 20 ft. — the user typed 20 feet
[reskin] user-set: AC 18 -> 20 — a declared field, not a derivation (Resolution 3)
[reskin] done: "Oathbound Bulwark" — donor defender-7-warden, CR 11
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 25-oathbound-bulwark.json — fields: generation, other_edition
```

---

## 26-mire-huldra

## 26. Mire Huldra — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library

### Block
```
Mire Huldra

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

Cursed Wake. Constitution Saving Throw: DC 14, any creature that starts its turn in a 10-foot Emanation originating from the huldra. Failure: The target has the Poisoned condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Actions

Multiattack. The huldra makes three Arcane Burst attacks. It can replace one attack with a use of Fen Curse.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. The huldra casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fen Curse. Charisma Saving Throw: DC 14, one creature within 60 feet. Failure: 17 (5d6) Necrotic damage, and the target is cursed. While cursed, the target can't regain Hit Points.

Bonus Actions

Misty Step (3/Day). The huldra casts Misty Step, using the same spellcasting ability as Spellcasting.

Reactions

Protective Magic (3/Day). The huldra casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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
!! [ENRICHMENT] Failed to enrich Oathbound Bulwark: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] class_npc — class mage — "witch" (call)
[route] caster-binder (controller) type=Humanoid mechanics=none — casts: implied by the kind — "curses trespassers" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("curses trespassers") | caster-binder: key "curses" (class verb)
[concept] hints: binder→style ✓ ("a marsh witch who curses trespassers")
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/venomous mind=sapient style=binder energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: cursing trespassers who enter her fen [behavior] | a brine-soaked, half-drowned body [body] | hexes that steal actions from her victims [aura]
[concept] identity: The marsh witch opens by marking trespassers with a hex hurled from among the reeds, then spends each round layering curses that rob them of actions — roots that seize ankles, tongues that fail mid-word, senses that curdle — while keeping her own brine-soaked body at the fen's edge and out of reach. She never closes to trade blows; she retreats through water and mud she alone can read, letting the marsh and her curses do the killing. Cornered and bloodied, she turns vicious and spiteful, spending her last curses to drag a killer down into the muck with her rather than flee clean.
[concept] lore: A hedge-hexer who drowned in the fen and refused to leave it, she now claims the marsh as her parish and curses every stranger who wades in, hoarding their stolen luck and breath among the reeds.
[reskin] energy withheld: Poison on a Humanoid with no Poison in the concept's own words (fixed phrases read first)
[reskin] [path] class body: the mage stands on the Mage — the class's own print block, nearest CR 7
[reskin] print canon defenses: HP 108 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-8-binder -> CR 7
[reskin] seats: action <- "cursing trespassers who enter her fen" | trait <- "a brine-soaked, half-drowned body"
[reskin] [path] decides: class_npc on the Mage · class mage (the matcher would have said homebrew)
[reskin] print canon: "a marsh witch who curses trespassers, cr 7" heads on the Mage — print's rows ride along; the seat stays
[reskin] repair round 1: 2 defect(s) — "Hex Bolt" deals Necrotic on a Humanoid whose concept names no Necrotic — a name is not a warrant; use a physical type | "Rotting Curse" deals Poison on a Humanoid whose concept names no Poison — a name is not a warrant; use a physical type
[reskin] class kit: mage — "witch": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] inline declared: "the huldra" — the call's own answer (kind), built from the name
[reskin] inline form: "the huldra" — the model's own reading of the name
[reskin] energy rider withheld: Poison on a Humanoid with no Poison in the concept's own words
[reskin] energy dropped — no rider slot: "Hex Bolt" is a crossbow and the blow must be Piercing, but this row has no rider slot to carry Necrotic; the energy is lost rather than re-split by hand
[reskin] energy withheld on a base row: "Rotting Curse" Poison -> Necrotic (the row's own noun; a Humanoid deals no Poison its concept never gave it)
[reskin] control spell gated to daily — Bestow Curse (level 3 control at will is print's CR 13+ shape; at CR 7 it is 1/Day)
[reskin] spell DC coherence: DC 14 -> 11 off Charisma 11 (print's array stays)
[reskin] the sheet's declared ask: curse — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a marsh witch" -> has (descriptive), head | "curses trespassers" -> has (mechanical) [asked: condition] [askMechanic: curse] | "cr 7" -> has (header)
[reskin] extraction: 1 of 3 model clauses quote nothing the user typed and leave the record ("cr 7")
[reskin] open asks handed to the idea call: "curses trespassers" [curse] (1 descriptive head(s) withheld — the call is shown asks, not the creature)
[reskin] idea anchored: action — "The huldra spits a mouthful of fen-water at one creature she can see, " answers the GM's "curses trespassers"
[reskin] idea unanchored: trait — "The huldra's brine-soaked body leaves a slick, cursed wake: ground she" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 32 of 32 answered; not true of this body: seal, active-toll, random-ray, snare-bolt, drain, rally, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, spider-climb, faultless-tracker, web-walker, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, gaze-aura, blurred-form, death-burst, life-drain
[reskin] menu: taste stands down — action answers the GM's "curses trespassers", so role and style do not filter the menu (legality still does); 25 template(s) offered
[reskin] signature idea (action): "The huldra spits a mouthful of fen-water at one creature she can see, muttering a drowning word into it. The target must succeed on a Constitution saving throw or its lungs fill — it has the Poisoned condition and can't speak or cast spells with verbal components until the end of its next turn." [action/save/condition] [family: mark] — menu: condition-payoff, wail, lure, ground-burst, spew, pacify, escalating-dread, slow-bolt, sensory-strike, herd, thrown-burst-seed, curse-debt, zone-seed, reveal, wind-up, blighted-ground, thrown-burst, snare, zone, execute, throw-retrieve, terror-pulse, disarm, push-prone, exploiter (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rampage, patient-defense, second-wind, focus, feint-slip, snap-shot, riposte, answering-strike, bolt-restrain, bolt-drag, bolt-mark, affliction, contagion, stunning-strike, charge-push, pounce, isolation, charge)
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — curse: curse-debt, delayed-brand, affliction
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: curse-debt (save/damage), delayed-brand (start_of_turn/damage), affliction (on_hit/condition)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: slow-bolt, lure, pacify, escalating-dread, sensory-strike, reveal, snare, terror-pulse, push-prone, exploiter, condition-payoff, spew, delayed-brand, affliction — the key word does not mean the mechanic here
[reskin] pick kept on the GM's own words: action — "curse-debt" has no key-table verb, but the call quotes "a marsh witch who curses trespassers cr" from the description
[reskin] seat takes its clause: "Fen Curse" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: curse-debt -> Actions/"Fen Curse" ("curses trespassers — the clause asks for a curse laid on a creature that fails a [shape fit, no verb match]")
[reskin] signature idea (trait): "The huldra's brine-soaked body leaves a slick, cursed wake: ground she moves through becomes difficult terrain for other creatures until the end of her next turn, and a creature that starts its turn in that slick must succeed on a Constitution saving throw or be Poisoned until the start of its next turn." [trait/always/condition] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, mimicry, truth-aura, fear-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: phobia (always/condition), kill-denial (always/condition), berserk (always/condition)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: phobia, kill-denial, berserk, terrain-walk, aberrant-ground — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:condition:poisoned: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:condition:poisoned" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "cursing trespassers who enter her fen" — a receipt the trait seat can produce. Earns no clause credit; the twist/class path allows 1 and this is number 1
[reskin] free signature row: "Cursed Wake" — the trait seat cannot quote the GM, but the call names the element it expresses: "cursing trespassers who enter her fen". Earns no clause credit; the twist/class path allows 1 and this is number 2
[reskin] seat takes its clause: "Cursed Wake" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): composed:zone:condition:poisoned -> Traits/"Cursed Wake" ("A creature that starts its turn in the marsh witch's slickened ground must succe [shape fit, no verb match]")
[reskin] repair: 1 clause(s) with no row — "curses trespassers"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:curses trespassers"]
[reskin] clause answered in prose: "curses trespassers" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Bog Iron Nails = none; Hex Bolt = none; Rotting Curse = none; Ankle Snare = none
[reskin] weapon declined: "Hex Bolt" reads crossbow from its name, but the call answered none — the row carries no weapon
[reskin] weapon table: "Hex Bolt" — a launcher, never thrown, range 80/320
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Mage's own type stands
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Bog Iron Nails" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "the huldra makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Hex Bolt" leaves — the Mage carries no ranged row and the words name none
[reskin] print canon saves: proficient in INT, WIS — the Mage's own set, at this sheet's stats and PB 3 (changed INT, CHA)
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Rotting Curse" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Fen Curse.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] typed row kept over the budget: Traits/"Cursed Wake" stays — it was written for the typed clause "curses trespassers", and the budget limits only rows the engine invents
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Cursed Wake" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] element expressed: Cursed Wake carries "cursing trespassers who enter her fen" — "any creature that starts its turn in a 10-foot Emanation originating from the hu"
audit finding below confidence gate: Fen Curse A Charisma save is used to resist a physical necrotic draining curse, which contradicts what the save stat represents for this effect.
[reskin] audit: [Fen Curse: The cursed state has no duration, repea…ile cursed, the target can't regain Hit Points."), Cursed Wake: The aura's affected area is stated bu… 10-foot Emanation originating from the huldra."), Cursed Wake: A 'curse' trait delivers only the Poi…ned condition until the start of its next turn.")]
[reskin] audit type correction refused: Humanoid stands — the GM's words name the type
[reskin] audit rename held — "Cursed Wake" was written for the GM's own clause (cl_a3qo0a), so "Miasmal Wake" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Fen Curse" [catalog] high open_ended — The cursed state has no duration, repeat save, or removal clause, so it never ends by any rules-legal path. — Give the curse a stated end condition — a duration, a repeat save at the end of each turn, or an explicit removal clause. (about: "While cursed, the target can't regain Hit Points.")
[reskin] audit defect: Traits/"Cursed Wake" [model-written] medium other — The aura's affected area is stated but the trigger is a turn-start check with no clause for whether the huldra or allies are excluded, and the trait has no passive always-on framing that tells the GM when the emanation exists. — State plainly that the emanation is always active and whether the huldra and its allies are exempt from the save. (about: "*Constitution Saving Throw*: DC 14, any creature that starts its turn in a 10-foot Emanation originating from the huldra.")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Mire Huldra" — donor caster-8-binder, CR 7
[reskin] ledger: 1 ask(s) — 1 answered (0 by receipt or anchor, 1 handed), 0 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 26-mire-huldra.json — fields: generation
```

---

## 27-displaced-templar

## 27. Displaced Templar — CR 6

**Input:** `a templar priest with a mace and no magic at all`
**Donor:** defender-5 -> CR 6
**Signature:** dropped

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
!! [ENRICHMENT] Failed to enrich Mire Huldra: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 26 taken name(s) the recording carried
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
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
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
[reskin] ledger: 2 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 1 open (1 never-written)
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 27-displaced-templar.json — fields: generation
```

---

## 28-ilvareth-dusksong

## 28. Ilvareth Dusksong — CR 12

**Input:** `name: Ilvareth Dusksong | An elf archmage who bends shadow and steps between places.`
**Donor:** caster-12 -> CR 12
**Signature:** library

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
!! [ENRICHMENT] Failed to enrich Displaced Templar: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 27 taken name(s) the recording carried
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
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 1 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 28-ilvareth-dusksong.json — fields: generation, other_edition
```

---

## 29-swarm-of-funeral-bells

## 29. Swarm of Funeral Bells — CR 13

**Input:** `a swarm of funeral bells that ring themselves over the dying`
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
**Signature:** library

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

The Last Note Is For You. Wisdom Saving Throw: DC 17, one creature within 5 feet. Failure: 24 (7d6) Bludgeoning damage, and the target has the Frightened condition until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Ilvareth Dusksong: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 28 taken name(s) the recording carried
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
[reskin] value check: "The Last Note Is For You" EV 19.4 vs floor 23.4 (one attack of 2) — half a hit added: 24 (7d6) Bludgeoning damage on a failed save — half of one 45-damage hit, the attack this row stands in place of; still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature under the floor, and kept: "The Last Note Is For You" — the ladder could not lift it and nothing stands in, so the row the model wrote stays as written
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
[reskin] element expressed: Ragged Peal carries "self-ringing over the dying" — "each of its Bell attacks deals its damage as Necrotic instead of Bludgeoning"
audit finding below confidence gate: Bell Bell is strictly worse than The Last Note Is For You in the same slot for every target (same DC-less attack roll vs. save, but TNIFY adds Frightened on top of comparable damage with no downside), so Bell is never worth choosing and the Multiattack's replacement clause makes the choice a no-op.
[reskin] audit: [Ragged Peal: The trait rewrites Bell's damage type…s its damage as Necrotic instead of Bludgeoning")]
[reskin] audit defect: Traits/"Ragged Peal" [model-written] low untrackable — The trait rewrites Bell's damage type but the Bell row itself still reads a single fixed Bludgeoning type with no cross-reference, and the replacement does not touch the Bell's Bloodied scaling text — a GM running the statblock off the Bell entry alone can miss the conditional, leaving the conversion untrackable from the attack row. — State the conversion inside the Bell row itself (damage type conditional on Bloodied) rather than only in a separate trait. (about: "each of its Bell attacks deals its damage as Necrotic instead of Bludgeoning")
[reskin] clause unresolved: "Ragged Peal" carries "While the swarm is Bloodied, its ragged peal quickens; e", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 29-swarm-of-funeral-bells.json — fields: generation
```

---

## 30-reliquary-ooze

## 30. Reliquary Ooze — CR 9

**Input:** `a cathedral-vault ooze that digests reliquaries`
**Donor:** ooze-9 -> CR 9 (invented — no printed peer)
**Signature:** library

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
!! [ENRICHMENT] Failed to enrich Swarm of Funeral Bells: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 29 taken name(s) the recording carried
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
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
!! [ENRICHMENT] Failed to enrich Reliquary Ooze: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 30-reliquary-ooze.json — fields: generation, other_edition
```

---

## 31-thunderhead-whelp

## 31. Thunderhead Whelp — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`
**Donor:** dragon-2 -> CR 7
**Signature:** dropped

### Block
```
Thunderhead Whelp

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

Traits

Storm-Charged Hide. Whenever it takes Lightning or Thunder damage, its next Jaws attack deals an extra 9 (2d8) Thunder damage, and it sheds bright light until the end of its next turn.

Actions

Multiattack. The whelp makes two Jaws attacks.

Jaws. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Roll (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

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
[harness] restored 0 taken name(s) the recording carried
[path] homebrew — "a young storm drake whose breath is a rolling wall of thunder" (call)
[route] dragon type=Dragon mechanics=breath — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | dragon: ✓ ("a young storm drake whose breath is a ro") | dragon: key "drake" (class body)
[concept] hints: dragon→body ✓ ("a young storm drake") | breath→mechanics ✓ ("breath is a rolling wall of thunder")
[concept] resolve: archetype=dragon type=Dragon typeFrom=the route call themes=draconic/breath mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: breath
[concept] signature elements: a rolling wall of thunder loosed as breath [behavior] | storm-charged scales and wings [body] | concussive thunder that bowles prey over [aura]
[concept] identity: The young storm drake opens by inhaling until its scales crackle, then exhales a rolling wall of thunder that bulldozes across the ground and bowls over anything in its path. Each round after, it glides above the battlefield on wind-torn wings, repositioning to line up another thunder-roll while snapping at stragglers with jaws and talons. When bloodied, it does not flee; it climbs high and dives, riding its own concussion down to crush what the wall failed to scatter.
[concept] lore: Hatched in the thunderheads above a storm-battered coast, the young storm drake considers every grounded creature prey, and it will not leave a valley until it has heard the last of its own thunder echo back off the hills.
[reskin] body type: dragon — the body outranks the role (recorded: dragon)
[reskin] mind tier held: INT stays 12 against "ordinary" — the card's 12 is already ordinary
[reskin] mind tier held: CHA stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 7
[reskin] donor: dragon-2 -> CR 7
[reskin] seats: action <- "a rolling wall of thunder loosed as breath" | trait <- "storm-charged scales and wings"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] name_element answered: Thunderhead Whelp = imagery; Thunder Roll = literal; Crackling Roar = imagery
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the whelp" — the call's own answer (kind), built from the name
[reskin] inline form: "the whelp" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] the sheet's declared ask: breath — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a young storm drake whose breath is a rolling wall of thunder" -> has (mechanical) [asked: save_area] [askMechanic: breath]
[reskin] open asks handed to the idea call: "a young storm drake whose breath is a rolling wall of thunder" [breath]
[reskin] idea anchored: action — "The whelp's scales crack and arc with blue-white static as it inhales," answers the GM's "a young storm drake whose breath is a rolling wall of thunder"
[reskin] idea unanchored: trait — "The whelp's hide crackles with storm-charge; whenever it takes Lightni" names none of the 1 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 1 of 35 answered; not true of this body: none
[reskin] menu: taste stands down — action answers the GM's "a young storm drake whose breath is a rolling wall of thunde", so role and style do not filter the menu (legality still does); 2 template(s) offered
[reskin] menu pruned: action — escalating-dread, terror-pulse, push-prone, thrown-burst-seed, pacify, slow-bolt, sensory-strike, disarm, curse-debt, reveal, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip (the sheet cannot render them)
[reskin] signature idea (action): "The whelp's scales crack and arc with blue-white static as it inhales, and any creature that hits it with a melee attack before the start of its next turn takes Thunder damage and must succeed on a Constitution saving throw or have its speed halved until the end of its next turn, its limbs jittering with the charge." [action/always/damage] [family: nova] — menu: execute, lure (+ shelf: rampage, lay-on-hands, second-wind, patient-defense, answering-strike, riposte, affliction, contagion, stunning-strike, charge-push, pounce, charge, isolation)
[reskin] composed candidates: none action — the nova family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires always/does damage; leading: execute (save/damage), charge (on_hit/damage), lure (save/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: execute, charge, lure — the key word does not mean the mechanic here
[reskin] closest refused: action — "execute" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a reactive aura that harms and slows creatures that hit the whelp in m)
[reskin] seat authored nothing: action — the call was asked to write an action for "The whelp's scales crack and arc with blue-white static as it inhales," and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "The whelp's scales crack and arc with blue-white static as it inhales," and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: it belongs in the description; the seat stays empty
[reskin] closest refused — subject flipped: action — the call named "execute" nearest and judged its subject FLIPPED against the clause (a reactive aura that harms and slows creatures that hit the whelp in m); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The whelp's scales crack and arc with blue-white static as it inhales, and any creature that hits it with a melee attack before the start of its next turn takes Thunder damage and must succeed on a Constitution saving throw or have its speed halved until the end of its next turn, its limbs jittering with the charge." [action/always/damage] — the model found no template that holds it (offered: execute, charge, lure)
[reskin] signature idea (trait): "The whelp's hide crackles with storm-charge; whenever it takes Lightning or Thunder damage, its next Jaws attack deals an extra 1d6 Thunder damage and it sheds bright light until the end of its next turn, its scales glowing white-hot." [trait/on_being_hit/damage] [family: payoff] — menu: heated-body, weapon-lodge (+ shelf: spider-climb, phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does damage; leading: heated-body (on_being_hit/damage), weapon-lodge (on_being_hit/resource), energy-aura (start_of_turn/damage)
[reskin] keys would have bound: trait — spider-climb (walls, wall)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: heated-body, weapon-lodge, energy-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "heated-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a save-area cone that deals thunder damage to each creature in it)
[reskin] seat answered, but: the call said "The whelp's hide crackles with storm-charge; whenever it takes Lightning or Thunder damage, its next Jaws attack deals a" is carried by "Storm-Charged Hide", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a save-area cone that deals thunder damage to each creature in it") and wrote a trait instead: "Storm-Charged Hide" -> Traits. Whenever it takes Lightning or Thunder damage, its next Jaws attack deals an extra 9 (2d8) Thunder damage, and it sheds 
[reskin] authored row numbers: "Storm-Charged Hide" — the call declared 1 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Storm-Charged Hide" ("The whelp's hide crackles with storm-charge; whenever it takes Lightning or Thunder damage, its next Jaws attack deals an extra 1d6 Thunder damage and it sheds  [authored: the catalog held no shape for it]")
[reskin] weapons answered: Jaws = none; Thunder Roll = none
[reskin] chassis nova: "Thunder Roll (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Storm-Charged Hide" [no template]
[reskin] lint: 0 findings
[reskin] element claim revoked: "Storm-Charged Hide" claims "a rolling wall of thunder loosed as breath" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Storm-Charged Hide")
audit finding below confidence gate: Thunder Roll Despite the name and the GM's brief for a rolling wall of thunder loosed as breath, the row is a static 15-foot Cone save-for-half with no movement, no push, and no lingering effect — it delivers damage but none of the rolling-wall fiction.
[reskin] audit: [Storm-Charged Hide: The whelp is immune to Thunder…ws attack deals an extra 9 (2d8) Thunder damage"), Storm-Charged Hide: The bright-light clause is a n…eds bright light until the end of its next turn")]
[reskin] audit defect: Traits/"Storm-Charged Hide" [model-written] high undelivered — The whelp is immune to Thunder, so the trigger can never fire from its own Thunder Roll nor from any Thunder source; only Lightning — which nothing in the block deals — can charge the trait, making the feature effectively undeliverable and its light-shedding dead. — Broaden the trigger to a condition the creature itself creates or encounters, or key the charge to its own Thunder Roll rather than damage taken. (about: "Whenever it takes Lightning or Thunder damage, its next Jaws attack deals an extra 9 (2d8) Thunder damage")
[reskin] audit defect: Traits/"Storm-Charged Hide" [model-written] medium weak — The bright-light clause is a nuisance rider with no mechanical teeth and no interaction with any other row, so the trait's second half is dead weight a GM must track for nothing. — Either give the light a concrete effect (e.g. making it visible/negating its Stealth advantage) or cut the clause. (about: "it sheds bright light until the end of its next turn")
[reskin] clause unresolved: "Storm-Charged Hide" carries "The whelp's hide crackles with storm-charge; whenever it", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] a reactive aura that harms and slows creatures that hit the whelp in melee — "The whelp's scales crack and arc with blue-white static as it inhales, and any creature that hits it with a melee attack before the start of its next turn takes Thunder damage and must succeed on a Constitution saving throw or have its speed halved until the end of its next turn, its limbs jittering with the charge." — Thunderhead Whelp [seat: action [action/always/damage]] (closest offered: execute) [effect: condition] [menu: execute charge lure] [same-cell unoffered: throw-retrieve blood-frenzy pack-tactics assassinate death-burst zone-seed coating] [same-seat rejected: throw-retrieve:requires-row zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Thunderhead Whelp" — donor dragon-2, CR 7
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 1 open (1 never-written)
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 31-thunderhead-whelp.json — fields: generation
```

---

## 32-grumalk-the-exile

## 32. Grumalk the Exile — CR 9

**Input:** `a stone giant exile who speaks only Giant and understands no Common`
**Donor:** brute-9 -> CR 9
**Signature:** library

### Block
```
Grumalk the Exile
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

Deflect Missile (Recharge 5-6) (Reaction).When Grumalk is hit by a ranged attack roll and takes Bludgeoning, Piercing, or slashing damage from it, Grumalk reduces the damage it takes from the attack by 11 (1d10 + 6), and if that damage is reduced to 0, Grumalk can redirect some of the attack's force. One creature Grumalk can see within 60 feet must make a DC 18 Dexterity saving throw, taking 11 (1d10 + 6) force damage on a failed save.

Actions
Multiattack: Grumalk makes two attacks, using Stone Club or Boulder.
Stone Club: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 28 (5d8 + 6) bludgeoning damage.
Boulder: Ranged Weapon Attack: +10 to hit, range 60/240 ft., one target. Hit: 24 (4d8 + 6) bludgeoning damage.
Earthshaker Slam (1/Day): Each creature within 20 feet of Grumalk must make a DC 18 Constitution saving throw, taking 38 (11d6) thunder damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Thunderhead Whelp: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[path] twist — Stone Giant (is) — "stone giant" (call)
[route] brute type=Giant mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a stone giant exile") | brute: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "stone giant exile who speaks only Giant …" is the description, not a name
[concept] resolve: archetype=brute type=Giant typeFrom=the route call themes=elemental/terror mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: a stone body that trades blows from a rooted stance [body] | challenges foes in Giant, an exile with no common tongue [behavior] | pinning prey under club-blows and heaped stone [behavior]
[concept] identity: A stone giant exile fights as a deliberate, patient wall of living rock: it opens by leaning on its great stone club and challenging the loudest foe in Giant, then settles into a grinding, weight-forward trade of blows that it wins by outlasting. Every round it works to pin a foe against terrain with its bulk and club, breaking limbs and shield-arms rather than chasing, and when bloodied it does not flee — it digs in, backs against a cliff, and fights to the death with a grim, stubborn silence because it has nowhere left to go.
[concept] lore: Cast out by its tribe for a crime it will not name to strangers, this giant wanders the high scree alone and seeks only a place to stand and be left alone — but anything that answers its challenge with a weapon is answered in stone.
[reskin] print canon array: STR 23, DEX 15, CON 20, INT 10, WIS 12, CHA 9 — the Stone Giant's; STR 23 outranks the card's +7, so the sheet rolls +10 (raise-only)
[reskin] donor: brute-9 -> CR 9
[reskin] seats: action <- "challenges foes in Giant, an exile with no common tongue" | trait <- "a stone body that trades blows from a rooted stance"
[reskin] [path] decides: twist on the Stone Giant (the matcher would have said homebrew)
[reskin] print canon: "a stone giant exile who speaks only Giant and understands no Common" heads on the Stone Giant — print's rows ride along; the seat stays
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "Grumalk" — the call's own answer (person), built from the name
[reskin] inline form: "Grumalk" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] lacks asked: "understands no Common"
[reskin] lacks refused: "speaks only Giant" names no absence — nothing in it takes anything away
[reskin] clauses: "a stone giant exile" -> has (descriptive), head | "speaks only Giant" -> has (header) | "understands no Common" -> LACKS (mechanical)
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Grumalk slams his club into the ground, sending a thunderous shockwave" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Grumalk is a creature of living stone, and when he plants his feet, th" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "Grumalk slams his club into the ground, sending a thunderous shockwave through the earth. Each creature within a radius centered on him must make a Constitution saving throw; on a failure, it takes Thunder damage and has the Prone condition, knocked flat by the concussive force." [action/save/condition] [family: zone] — menu: trample, leap, thrown-burst, throw-retrieve, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, lure, pacify, sensory-strike, reveal (+ shelf: rampage, second-wind, aggro-curse, self-invisibility, focus, answering-strike, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: escalating-dread (save/condition), terror-pulse (save/condition), push-prone (save/condition)
[reskin] word match declined by the call: escalating-dread, terror-pulse, push-prone, lure, pacify, sensory-strike, reveal, trample, leap, thrown-burst, thrown-burst-seed, wind-up, aggro-curse, throw-retrieve — the key word does not mean the mechanic here
[reskin] closest refused: action — "ground-burst" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an area shockwave that knocks prone, not just area damage)
[reskin] seat answered, but: the call said "Grumalk slams his club into the ground, sending a thunderous shockwave through the earth. Each creature within a radius " is carried by "Earthshaker Slam", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("an area shockwave that knocks prone, not just area damage") and wrote an action instead: "Earthshaker Slam (Recharge 5-6)" -> Actions. *Constitution Saving Throw*: DC 18, each creature in a 20-foot Emanation originating from Grumalk. *Failure:* 38 (11d6) 
[reskin] authored row numbers: "Earthshaker Slam (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Earthshaker Slam (Recharge 5-6)" is HANDED "a exile" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Earthshaker Slam (Recharge 5-6)" ("Grumalk slams his club into the ground, sending a thunderous shockwave through the earth. Each creature within a radius centered on him must make a Constitution [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Grumalk is a creature of living stone, and when he plants his feet, the earth answers. At the start of each of his turns, if he has not moved since his last turn, the ground within a radius around him trembles; each creature of his choice in that area must succeed on a Strength saving throw or have its Speed reduced to 0 until the start of its next turn, as the stone grips its ankles." [trait/start_of_turn/movement] [family: zone] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but "a exile" is a clause the sheet has not answered; the GM's own words are the warrant
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does movement; leading: composed:zone:terrain (start_of_turn/movement), truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition)
[reskin] closest refused: trait — "terrain-walk" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: restrains creatures in the tremble radius with a Strength save, slowin)
[reskin] seat answered, but: the call said "At the start of each of his turns, if he has not moved since his last turn, the ground within a radius around him trembl" is carried by "Earthgrip Stance", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Grumalk is a creature of living stone, and when he plants his feet, th" and wrote no row of that kind (refused: "Earthgrip Stance" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Earthgrip Stance" — a trait is not a save — the save form takes stat, target and effect as fields and the eng); asking once more with the reason
[reskin] seat answered, but: the call said "At the start of each of his turns, if he has not moved since his last turn, the ground within a radius around him trembl" is carried by "Earthgrip Tremor", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Grumalk is a creature of living stone, and when he plants his feet, th" and wrote no row of that kind (refused: "Earthgrip Tremor" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat refused twice: trait — first: "Earthgrip Stance" — a trait is not a save — the save form takes stat, target and effect a; second: "Earthgrip Tremor" — the row does nothing on a failed save — say what the target suffers: ; the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "Grumalk is a creature of living stone, and when he plants his feet, the earth answers. At the start of each of his turns, if he has not moved since his last turn, the ground within a radius around him trembles; each creature of his choice in that area must succeed on a Strength saving throw or have its Speed reduced to 0 until the start of its next turn, as the stone grips its ankles." [trait/start_of_turn/movement] — the model found no template that holds it (offered: composed:zone:terrain, truth-aura, fear-aura, terrain-walk, relentless-pursuit, bound, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, undead-fortitude)
[reskin] weapons answered: Greatclub = greatclub; Boulder = none
[reskin] weapon dice follow the weapon: "Greatclub" is a greatclub (d8) — "30 (7d6 + 6)" becomes "28 (5d8 + 6)", print's rule of keeping the die and scaling the count
[reskin] weapon reach follows the weapon: "Greatclub" is a greatclub — reach 10 ft becomes 5 ft (the table's own)
[reskin] chassis nova: "Earthshaker Slam (Recharge 5-6)" — the brute-9's own nova row; geometry, cap and rider lines below are its edits
[reskin] print canon attack: "Greatclub" -> "Stone Club" — the Stone Giant's own row
[reskin] print canon: the seat's own row STAYS — Actions/"Earthshaker Slam (Recharge 5-6)" answers "Grumalk slams his club into the ground, sending a thunderous", which the GM typed; print's nova rides beside it rather than over it
[reskin] print canon row: Reactions/Deflect Missile (Recharge 5-6) — the Stone Giant's own
[reskin] one recharge die: Actions/"Earthshaker Slam (Recharge 5-6)" becomes "Earthshaker Slam (1/Day)" — the Stone Giant already fields a Recharge row, and 0 of print's 329 blocks field two
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Earthshaker Slam" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Earthshaker Slam (1/Day): The save entry substitut…w*: DC 18, each creature in a 20-foot Emanation"), Earthshaker Slam (1/Day): A slam that quakes the e…ries Thunder. (about: "38 (11d6) Thunder damage"), Earthshaker Slam (1/Day): The save's only escape i…e Prone condition. *Success:* Half damage only.")]
[reskin] audit rename held — "Earthshaker Slam" was written for the GM's own clause (cl_aa862i: "Grumalk slams his club into the ground, sending a thunderous"), so "Thunderous Stomp" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Earthshaker Slam" [model-written] high wording — The save entry substitutes a nonstandard 'Constitution Saving Throw' label for the 2024 format 'Constitution Saving Throw:' or the published 'DC 18 Constitution Saving Throw' phrasing used on official rows, producing a rules fragment instead of a proper save line. — Rewrite the save line using the standard 2024 save format (ability name plus DC, then target area). (about: "*Constitution Saving Throw*: DC 18, each creature in a 20-foot Emanation")
[reskin] audit defect: Actions/"Earthshaker Slam" [model-written] low open_ended — The save's only escape is the initial Constitution save; a failed creature has no listed way to end the Prone state within the entry itself, leaving the GM to rely on the base condition's standing-up rule with no prompt, and nothing lets a creature that succeeded avoid being knocked down on a later shove from the same effect. — State that a creature can stand up from the Prone condition (or that the condition ends at the end of its turn) so the exit is present in the row. (about: "the target has the Prone condition. *Success:* Half damage only.")
[reskin] [gap] restrains creatures in the tremble radius with a Strength save, slowing them to 0 — "Grumalk is a creature of living stone, and when he plants his feet, the earth answers. At the start of each of his turns, if he has not moved since his last turn, the ground within a radius around him trembles; each creature of his choice in that area must succeed on a Strength saving throw or have its Speed reduced to 0 until the start of its next turn, as the stone grips its ankles." — Grumalk the Exile [seat: trait [trait/start_of_turn/movement]] (closest offered: terrain-walk) [effect: condition] [menu: composed:zone:terrain truth-aura fear-aura terrain-walk relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind undead-fortitude] [same-cell unoffered: none] [same-seat rejected: energy-aura:body-verdict noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] lack took nothing: "understands no Common" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Grumalk the Exile" — donor brute-9, CR 9
[reskin] ledger: 1 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 1 open (1 never-written)
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 32-grumalk-the-exile.json — fields: generation, other_edition
```

---

## 33-reedtemple-warden

## 33. Reedtemple Warden — CR 5

**Input:** `lizardfolk monk`
**Donor:** skirmisher-3 -> CR 5
**Signature:** library

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
!! [ENRICHMENT] Failed to enrich Grumalk the Exile: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 32 taken name(s) the recording carried
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
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
!! [ENRICHMENT] Failed to enrich Reedtemple Warden: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] enrichment not run (4 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 33-reedtemple-warden.json — fields: generation, other_edition
```

---

## 34-krennik-skullstandard

## 34. Krennik Skullstandard — CR 4

**Input:** `name: Krennik Skullstandard | riding a worg`
**Donor:** skirmisher-3-mounted -> CR 4 (invented — no printed peer)
**Signature:** dropped

### Block
```
Krennik Skullstandard
Medium humanoid, lawful neutral
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

Common, Goblin

Challenge

4 (1,100 XP)

Proficiency Bonus:

+2

Fear Aura.Krennik emanates an aura in a 20-foot radius while it is not incapacitated. Any enemy that starts its turn in the aura must make a DC 13 Wisdom saving throw. On a failed save, the target is frightened until the start of its next turn. On a successful save, the target is immune to this creature's aura for 24 hours.
Worgrider's Arc.Krennik ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Mounted Agility (Bonus Action).Krennik takes the Dash or Disengage action.

Actions
Multiattack: Krennik makes two attacks, using Boar Spear or Javelin.
Boar Spear: Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If Krennik moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) piercing damage and, if it is Medium or smaller, is knocked prone.
Javelin: Ranged Weapon Attack: +5 to hit, range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.
Ride-Down (Recharge 5-6): Krennik moves up to its speed without provoking opportunity attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. That creature must succeed on a DC 13 Dexterity saving throw or take 24 (7d6) bludgeoning damage and be knocked prone.
```

### Trace
```
[harness] restored 0 taken name(s) the recording carried
[path] homebrew — "riding a worg" (call)
[route] skirmisher-mounted type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-mounted: ✓ ("riding a worg") | skirmisher-mounted: key "riding" (class verb)
[concept] name: "Krennik Skullstandard" — the Name field, beside a description; the field is the fact, the call is not asked
[concept] hints: mounted→style ✓ ("riding a worg")
[concept] resolve: archetype=skirmisher type=Humanoid typeFrom=the route call themes=bestial/armed mind=sapient style=mounted energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Krennik Skullstandard"
[concept] mechanics: none claimed
[concept] signature elements: ride-down charge that carries him past the target [behavior] | the worg he rides and controls [object] | the skull-topped standard he carries [object]
[concept] identity: Krennik opens by driving his worg in a wide arc to build momentum, then commits to a ride-down charge that carries him past the struck target, wheeling for another pass rather than stopping to trade blows. Between charges he keeps the beast circling at the edge of reach, jabbing with his spear and letting the worg's jaws punish anyone who closes, and he calls the charge again the moment a formation breaks. When his worg is bloodied he cuts the beast loose and fights on foot with a shield-line ferocity, but if his own blood runs it becomes a fighting withdrawal — he has no intention of dying beside a dead mount.
[concept] lore: Krennik earned his skull-topped standard as a raider captain on the border marches, and he rides a worg he fed and beat into loyalty because a mounted column can outrun any militia sent to answer it.
[reskin] mind tier held: CHA stays 8 against "ordinary" — the card's 8 is already ordinary
[reskin] mind tier: INT 8 -> 15 — the call read this creature as capable at CR 4
[reskin] mind tier: WIS 12 -> 15 — the call read this creature as capable at CR 4
[reskin] donor: skirmisher-3-mounted -> CR 4 (invented — no printed peer)
[reskin] seats: package <- "the skull-topped standard he carries"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] proper noun: "Krennik Skullstandard" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Krennik" — the call's own answer (person), built from the name
[reskin] inline form: "Krennik" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] the sheet's declared ask: charge — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Krennik Skullstandard — riding a worg" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause (1 descriptive head(s) withheld); the call rolls unanchored as before
[reskin] idea unanchored: action — "Krennik plants the skull-topped standard and gives a curt order; the b" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "Krennik's standard is tall and skull-crowned, catching the eye; a foe " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 24 of 24 answered; not true of this body: snare-bolt, coating, phase-slip, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, uncanny-sense, marking-light, warded-mending, mimicry, gaze-aura, blurred-form, death-burst, hook-rider, life-drain
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "Krennik plants the skull-topped standard and gives a curt order; the banner's fear spreads through his raiders. Each ally of Krennik's choice within range can move up to its Speed as a Reaction without provoking Opportunity Attacks until the end of the round." [action/save/movement] [family: sentinel] — menu: condition-payoff, throw-retrieve, lure, sensory-strike, disarm, exploiter, slow-bolt (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, snap-shot, riposte, answering-strike, affliction, contagion, isolation, bolt-mark)
[reskin] composed candidates: none action — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: action — idea fires save/does movement; leading: disarm (save/movement), slow-bolt (save/movement), aggro-curse (save/movement)
[reskin] word match declined by the call: disarm, slow-bolt, aggro-curse, condition-payoff, lure, sensory-strike, exploiter, throw-retrieve — the key word does not mean the mechanic here
[reskin] closest refused: action — "slow-bolt" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grants each chosen ally a free move as a Reaction without provoking Op)
[reskin] seat answered, but: the call said "Krennik plants the skull-topped standard and gives a curt order; the banner's fear spreads through his raiders. Each all" is carried by "Standard's Order", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write an action for "Krennik plants the skull-topped standard and gives a curt order; the b" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat answered, but: the call said "Krennik plants the skull-topped standard and gives a curt order; the banner's fear spreads through his raiders. Each all" is carried by "Skullstandard's Command", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write an action for "Krennik plants the skull-topped standard and gives a curt order; the b" and wrote no row of that kind (refused: "Skullstandard's Command" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: "Skullstandard's Command" — the row does nothing on a failed save — say what the target su; the seat stays empty
[reskin] closest refused — subject flipped: action — the call named "slow-bolt" nearest and judged its subject FLIPPED against the clause (grants each chosen ally a free move as a Reaction without provoking Op); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "Krennik plants the skull-topped standard and gives a curt order; the banner's fear spreads through his raiders. Each ally of Krennik's choice within range can move up to its Speed as a Reaction without provoking Opportunity Attacks until the end of the round." [action/save/movement] — the model found no template that holds it (offered: disarm, slow-bolt, aggro-curse, condition-payoff, lure, sensory-strike, exploiter, throw-retrieve)
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
[reskin] signature idea (trait): "Krennik's standard is tall and skull-crowned, catching the eye; a foe that starts its turn within sight of it must steel itself or hesitate, unable to take Reactions until the start of its next turn." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, berserk, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (start_of_turn/condition): truth-aura, fear-aura; the declared data is the warrant and the call is worth making
[reskin] declared mechanic leads the menu: trait — charge: relentless-pursuit
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: relentless-pursuit (always/movement), truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition)
[reskin] word match declined by the call: truth-aura, relentless-pursuit, bound, relic-object, phobia — the key word does not mean the mechanic here
[reskin] free signature row: trait — "fear-aura" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "the skull-topped standard he carries" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Skull Standard Aura" — the trait seat cannot quote the GM, but the call names the element it expresses: "the skull-topped standard he carries". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): fear-aura -> Traits/"Skull Standard Aura" ("a foe that starts its turn within sight of the skull-crowned standard must steel [shape fit, no verb match]")
[reskin] one mechanic, one name: Traits/"Skull Standard Aura" -> "Fear Aura" — this row is fear-aura and does what every fear-aura row does; a bespoke name would promise more than the text delivers
[reskin] weapons answered: Boar Spear = spear; Javelin = javelin; Ride-Down = none
[reskin] weapon dice follow the weapon: "Javelin" is a javelin (d6) — "7 (1d8 + 3)" becomes "6 (1d6 + 3)", print's rule of keeping the die and scaling the count
[reskin] weapon table: "Javelin" — thrown, range 30/120
[reskin] chassis nova: "Ride-Down (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] name-canon stands down: the path answered homebrew on "riding a worg" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget by card size: CR 4 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Fear Aura" [trait/start_of_turn/condition]
[reskin] save re-derived after a retype: Actions/Ride-Down — a Strength save for a condition the row IMPOSES, which calls for Dexterity or Constitution (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] element claim revoked: "Fear Aura" claims "the skull-topped standard he carries" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Fear Aura")
audit finding below confidence gate: Javelin Javelin is strictly weaker than Boar Spear for this creature — less damage, no rider — so it is only worth its action at range, where the creature has no better option; the range is short enough that Boar Spear's reach option is almost always preferable.
[reskin] audit: [Worgrider's Arc: This duplicates the Opportunity A…y Attacks against it are made with Disadvantage"), Fear Aura: The Fear Aura's area is stated as an Em…le it doesn't have the Incapacitated condition.")]
[reskin] audit defect: Traits/"Worgrider's Arc" [catalog] medium other — This duplicates the Opportunity Attack protection already granted by Ride-Down, making one of the two clauses redundant. — Trim the duplicate clause from one of the two entries so each grants distinct movement benefits. (about: "Opportunity Attacks against it are made with Disadvantage")
[reskin] audit defect: Traits/"Fear Aura" [model-written] medium untrackable — The Fear Aura's area is stated as an Emanation centered on Krennik, but nothing in the block places, anchors, or moves the aura, so a GM cannot adjudicate where it applies at a table. — State the aura's origin explicitly as a 20-foot Emanation originating from Krennik itself. (about: "Krennik emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] grants each chosen ally a free move as a Reaction without provoking Opportunity Attacks — "Krennik plants the skull-topped standard and gives a curt order; the banner's fear spreads through his raiders. Each ally of Krennik's choice within range can move up to its Speed as a Reaction without provoking Opportunity Attacks until the end of the round." — Krennik Skullstandard [seat: action [action/save/movement]] (closest offered: slow-bolt) [effect: movement] [menu: disarm slow-bolt aggro-curse condition-payoff lure sensory-strike exploiter throw-retrieve] [same-cell unoffered: reel hook-drag pull-through obstacle-pull] [same-seat rejected: swallow:deny-type trample:condition-three-ways leap:condition-three-ways thrown-burst:style gaze-single:style snare:style reel:style execute:role seal:role shield-bash:condition-three-ways hook-drag:role active-toll:role pull-through:role random-ray:body-verdict ground-burst:nova-taken spew:body-verdict burrow-ambush:movement obstacle-pull:role pacify:role escalating-dread:role terror-pulse:role snare-bolt:body-verdict push-prone:role herd:role drain:role curse-debt:role reveal:role wind-up:role blighted-ground:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 1 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Krennik Skullstandard" — donor skirmisher-3-mounted, CR 4
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 34-krennik-skullstandard.json — fields: generation, other_edition
```

---

## 35-well-drowned

## 35. Well Drowned — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5 -> CR 5
**Signature:** dropped

### Block
```
Well Drowned

Large Ooze, Neutral Evil

AC 14
Initiative -1 (9)

HP 102 (12d10 + 36)

Speed 40 ft., Swim 40 ft.

MOD
SAVE
STR
16
+3
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
+6
CHA
10
+0
+0

Skills Athletics +6, Perception +7

Immunities Acid, Cold; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained

Senses Passive Perception 17

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Brine Flow. The drowned can move through any gap or crack without squeezing, and the ground it passes over becomes difficult terrain for other creatures until the end of the drowned's next turn.

Actions

Multiattack. The drowned makes two Slam attacks.

Slam. Melee Attack Roll: +6, reach 10 ft. 12 (2d8 + 3) Bludgeoning damage plus 7 (2d6) Cold damage.

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
!! [ENRICHMENT] Failed to enrich Krennik Skullstandard: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 0 taken name(s) the recording carried
[concept] name: provided_name rejected — "the thing in the well" is written in lowercase inside a description; the generator names it
[concept] thin concept expanded before routing: the thing in the well — The thing in the well waits below with the patience of deep water, opening a fight by letting a rope or bucket touch it and answering with a sudden lunge up the shaft, dragging the curious down to drown quietly in the dark. Every round it works to keep prey in the water — gra
[concept] expansion answered: type=Aberration (type_source=inferred) material=brine size=Large mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] homebrew — "the thing in the well" (call)
[route] brute type=Ooze mechanics=grapple — casts: the call reads no worked magic here | hold_shape refused: the call answered contain but quoted "dragging the curious down to d", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("Every round it works to keep prey in the") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Ooze typeFrom=the route call themes=grasping/aquatic mind=sapient style=— energy=Cold mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple
[concept] signature elements: dragging prey under the water [behavior] | a body of living brine and silt [body] | baited coins afloat on the surface [object]
[concept] identity: The thing in the well waits below with the patience of deep water, opening a fight by letting a rope or bucket touch it and answering with a sudden lunge up the shaft, dragging the curious down to drown quietly in the dark. Every round it works to keep prey in the water — grappling, pulling under, and letting the brine-slick walls of the well finish the job — and it is not mindless: it baits with coins and trinkets afloat on the surface, and if hurt badly it retreats to the bottom silt to heal and resume its vigil rather than die in the open light.
[concept] lore: Something fell or was thrown into the well long ago and the dark wet kept it, until a mind grew around the hunger — now it hoards what the village drops in and takes whatever it can coax down after the coins.
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 5
[reskin] mind tier: WIS 10 -> 18 — the call read this creature as formidable at CR 5
[reskin] mind tier: CHA 6 -> 10 — the call read this creature as ordinary at CR 5
[reskin] donor: brute-5 -> CR 5
[reskin] seats: action <- "dragging prey under the water" | trait <- "a body of living brine and silt"
[reskin] [path] decides: homebrew (the matcher agrees)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] inline declared: "the drowned" — the call's own answer (kind), built from the name
[reskin] inline form: "the drowned" — the model's own reading of the name
[reskin] the sheet's declared ask: grapple — the route call's one answer for the whole concept
[reskin] lacks asked: nothing taken away
[reskin] clauses: "the thing in the well" -> has (descriptive), head
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The drowned lashes out with a rope of living brine that coils around a" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "A body of living brine and silt, the drowned can flow through any gap " names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, terrain-walk, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, relic-object, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, life-drain
[reskin] signature idea (action): "The drowned lashes out with a rope of living brine that coils around a creature it can see. The target must succeed on a Strength saving throw or be pulled up to its speed toward the drowned and become Grappled by it; while Grappled this way, the target is also dragged with the drowned whenever it moves." [action/save/condition] [family: drag] — menu: trample, leap, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, gaze-single, snare, seal, lure, pacify, snare-bolt (+ shelf: rampage, second-wind, aggro-curse, self-invisibility, focus, answering-strike, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] composed candidates: none action — the drag family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — grapple: hook-rider
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: hook-rider (on_hit/movement), escalating-dread (save/condition), terror-pulse (save/condition)
[reskin] classification handed to the fit call: mechanic=grapple
[reskin] word match declined by the call: escalating-dread, terror-pulse, push-prone, gaze-single, snare, seal, lure, pacify, snare-bolt, trample, leap, ground-burst, thrown-burst-seed, wind-up — the key word does not mean the mechanic here
[reskin] free signature row: "Brine Lash" — a rider rides the user's own attack, so it needs the user's own ask, but the call names the element it expresses: "dragging prey under the water". Earns no clause credit; the budget settles on the finished sheet
[reskin] rider refused — a push that undoes its own row: "hook-rider" moves the target away from "Slam", which swings 2x a round; the slot leaves and the seat looks elsewhere
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
[reskin] signature idea (trait): "A body of living brine and silt, the drowned can flow through any gap or crack without squeezing, and it leaves a slick, salty trail of brine in its wake that makes the ground difficult terrain for other creatures until the end of its next turn." [trait/always/movement] [family: zone] — menu: adhesive, spider-climb, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/movement): spider-climb, relentless-pursuit, bound; the declared data is the warrant and the call is worth making
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — grapple: adhesive
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: adhesive (always/condition), spider-climb (always/movement), relentless-pursuit (always/movement)
[reskin] classification handed to the fit call: mechanic=grapple
[reskin] word match declined by the call: adhesive, spider-climb, relentless-pursuit, bound, composed:zone:terrain — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:terrain" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: leaves a slick trail of difficult terrain in its wake while flowing th)
[reskin] seat answered, but: the call said "A body of living brine and silt, the drowned can flow through any gap or crack without squeezing, and it leaves a slick," is carried by "Brine Flow", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("leaves a slick trail of difficult terrain in its wake while flowing th") and wrote a trait instead: "Brine Flow" -> Traits. The drowned can move through any gap or crack without squeezing, and the ground it passes over becomes difficult terrain
[reskin] authored row numbers: "Brine Flow" — the call declared 0 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Brine Flow" ("A body of living brine and silt, the drowned can flow through any gap or crack without squeezing, and it leaves a slick, salty trail of brine in its wake that m [authored: the catalog held no shape for it]")
[reskin] weapons answered: Slam = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Cold — the call read this creature's energy as Cold and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Cold (merged into the header write)
[reskin] immunities stamped for type: Ooze -> Acid, Cold; Charmed, Deafened, Exhaustion, Frightened, Grappled, Prone, Restrained
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Brine Flow" [no template]
[reskin] darkvision withheld: a Ooze with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 17" -> "Passive Perception 17")
[reskin] lint: 0 findings
[reskin] element expressed: Brine Flow carries "a body of living brine and silt" — "The drowned can move through any gap or crack without squeezing, and the ground "
[reskin] audit: [Brine Flow: The trait requires the GM to remember …atures until the end of the drowned's next turn"), Brine Flow: The difficult terrain has no defined a…atures until the end of the drowned's next turn"), Brine Flow: A Large ooze with a speed of 40 ft. cl…move through any gap or crack without squeezing")]
[reskin] audit defect: Traits/"Brine Flow" [model-written] medium untrackable — The trait requires the GM to remember the exact path of ground a moving creature has crossed and when each patch of it expires, state the block gives no way to mark or track. — Have the trail affect a single defined area at a defined moment (e.g. squares the drowned occupies, checked at the time of its move) rather than a historical path. (about: "the ground it passes over becomes difficult terrain for other creatures until the end of the drowned's next turn")
[reskin] audit defect: Traits/"Brine Flow" [model-written] medium other — The difficult terrain has no defined area — 'the ground it passes over' is unbounded, so the GM cannot adjudicate which squares are affected. — Define a bounded footprint or radius of ground that becomes difficult terrain. (about: "becomes difficult terrain for other creatures until the end of the drowned's next turn")
[reskin] audit defect: Traits/"Brine Flow" [model-written] low other — A Large ooze with a speed of 40 ft. claims a brine/silt body that squeezes freely through cracks, yet nothing about its body or the trait accounts for it as a substance that flows rather than a gap-passing trick. — Frame the squeeze clause around the creature's flowing brine body instead of treating it as a generic tight-space allowance. (about: "move through any gap or crack without squeezing")
[reskin] clause unresolved: "Brine Flow" carries "A body of living brine and silt, the drowned can flow th", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Well Drowned" — donor brute-5, CR 5
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 35-well-drowned.json — fields: generation
```

---

## 37-meshrin

## 37. Meshrin — CR 8

**Input:** `name: Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He is a barbarian who rages. Give him a frightening roar. AC 16, 120 hit points.`
**Donor:** skirmisher-8-hurler -> CR 8 (invented — no printed peer)
**Signature:** library

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
!! [ENRICHMENT] Failed to enrich Well Drowned: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 36 taken name(s) the recording carried
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
[reskin] ledger: 4 ask(s) — 4 answered (3 by receipt or anchor, 1 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
!! [ENRICHMENT] Failed to enrich Meshrin: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] enrichment not run (4 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 37-meshrin.json — fields: generation, other_edition
```

---

## 38-oathsworn-gravebound

## 38. Oathsworn Gravebound — CR 6

**Input:** `a skeleton with a greatsword`
**Donor:** brute-5 -> CR 6
**Signature:** library

### Block
```
Oathsworn Gravebound

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

Great Weapon Master. When the gravebound hits a creature with its Greatsword, the attack deals an extra 3 damage.

Actions

Multiattack. The gravebound makes two attacks, using Greatsword or Shortbow in any combination.

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
[harness] restored 0 taken name(s) the recording carried
[concept] thin but a print creature — keeping route-first: a skeleton with a greatsword
[path] twist — Skeleton (is) — "skeleton" (call)
[route] brute type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute: ✓ ("a skeleton with a greatsword") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Undead typeFrom=the route call themes=grave/armed mind=mindless style=— energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: bone [body] | greatsword [object] | relentless advance [behavior]
[concept] identity: A grave-bound skeleton that advances without ceremony, greatsword tipped forward, and opens with one committed overhead cleave meant to end the fight in a single stroke. After that it settles into a slow, grinding rhythm — step, windup, heavy sweep — taking hits it barely registers and answering each with bone-deep weight behind the blade. It does not pause, does not flee, and does not tire; it simply keeps swinging until nothing in front of it moves.
[concept] lore: Raised from an unanointed battlefield grave by a curse that never released it, the skeleton still believes it is fighting a war that ended centuries ago and will attack anything that enters its ground.
[reskin] print canon array: STR 18, DEX 16, CON 15, INT 6, WIS 8, CHA 5 — the Skeleton's, STR fitted to +7
[reskin] donor: brute-5 -> CR 6
[reskin] seats: action <- "relentless advance" | trait <- "bone"
[reskin] [path] decides: twist on the Skeleton (the matcher agrees)
[reskin] print canon: "a skeleton with a greatsword" heads on the Skeleton — print's rows ride along; the seat stays
[reskin] named parts: Greatsword (slot) — the user's words, the engine's numbers
[reskin] energy rides the named weapon: "Greatsword" is a greatsword, so the blow stays Slashing and Necrotic rides it rather than folding into the blow (print: 11 of 53 weapon rows carry an energy rider)
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] features: Great Weapon Master (trait) — the feature table, no call
[reskin] class kit: none — the twist path takes no class kit
[reskin] inline declared: "the gravebound" — the call's own answer (kind), built from the name; the rules would have said "Gravebound"
[reskin] inline on stamped rows: "Gravebound" -> "the gravebound" on 1 row — they were written before the name's form was settled
[reskin] inline form: "the gravebound" — the model's own reading of the name
[reskin] the sheet's declared ask: none — the route call named no mechanic
[reskin] alignment by mind: "Lawful Neutral" -> Unaligned — a Undead the call reads as mindless at INT 6 holds no ethics (owner's ruling, 2026-11-15)
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a skeleton with a greatsword" -> has (mechanical) [asked: attack]
[reskin] open asks handed to the idea call: none — the record holds no unanswered MECHANICAL clause; the call rolls unanchored as before
[reskin] idea unanchored: action — "The gravebound plants its blade point-first and hurls itself forward a" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] idea unanchored: trait — "The gravebound cannot be slowed or turned aside: difficult terrain, ma" names none of the 0 open ask(s); it answered NOTHING (the field was absent or empty) and rolls as it did before R7
[reskin] body verdicts: 33 of 33 answered; not true of this body: shield-bash, active-toll, random-ray, spew, herd, drain, shell-withdraw, rally, coating, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, spider-climb, aberrant-ground, faultless-tracker, web-walker, energy-aura, noxious-aura, uncanny-sense, marking-light, sealed-body, warded-mending, mimicry, gaze-aura, death-burst, kill-denial, hook-rider, life-drain
[reskin] signature idea (action): "The gravebound plants its blade point-first and hurls itself forward along the sword's line — every creature in a line between it and the weapon's reach must make a Dexterity saving throw, and on a failure is knocked Prone and takes the greatsword's damage as the bone-and-iron mass drives over them. The gravebound ends this move standing over whatever it flattened, blade already rising." [action/save/damage] [family: zone] — menu: thrown-burst, throw-retrieve, ground-burst, escalating-dread, terror-pulse, push-prone, thrown-burst-seed, wind-up, execute, curse-debt, blighted-ground (+ shelf: rampage, second-wind, aggro-curse, self-invisibility, focus, answering-strike, affliction, contagion, stunning-strike, charge-push, pounce, charge)
[reskin] composed candidates: none action — the zone family composes a trait and this is the action seat
[reskin] menu ordered by the idea's stamps: action — idea fires save/does damage; leading: thrown-burst (save/damage), ground-burst (save/damage), thrown-burst-seed (save/damage)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: thrown-burst, thrown-burst-seed, push-prone, throw-retrieve, wind-up — the key word does not mean the mechanic here
[reskin] closest refused: action — "ground-burst" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a line-shaped charge that moves the gravebound along the line, knocks )
[reskin] seat answered, but: the call said "The gravebound plants its blade point-first and hurls itself forward along the sword's line — every creature in a line b" is carried by "Grave-Line Charge", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("a line-shaped charge that moves the gravebound along the line, knocks ") and wrote an action instead: "Grave-Line Charge (Recharge 5-6)" -> Actions. *Dexterity Saving Throw*: DC 14, each creature in a 30-foot Line. *Failure:* 28 (8d6) Slashing damage, and the target ha
[reskin] authored row numbers: "Grave-Line Charge (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] free signature row: "Grave-Line Charge (Recharge 5-6)" — a print body takes only what the user's words ask, but the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit; the budget settles on the finished sheet
[reskin] signature authored: no template — the seat wrote it -> Actions/"Grave-Line Charge (Recharge 5-6)" ("The gravebound plants its blade point-first and hurls itself forward along the sword's line — every creature in a line between it and the weapon's reach must ma [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The gravebound cannot be slowed or turned aside: difficult terrain, magical or otherwise, costs it no extra movement, and it automatically succeeds on saving throws against being Grappled, Restrained, or knocked Prone. It advances the same grinding step whether the ground is mud, rubble, or a wall of the dead." [trait/always/movement] [family: breach] — menu: phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), relentless-pursuit (always/movement), bound (always/movement)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: terrain-walk, bound, phobia — the key word does not mean the mechanic here
[reskin] signature miss: trait — "relentless-pursuit" quotes nothing the GM typed, matches no key-table verb, and the call named none of this creature's own elements for it: decoration, not a signature
[reskin] weapons answered: Greatsword = greatsword; Hurled Femur = none; Grave-Debt Cleave = none
[reskin] weapon dice follow the weapon: the GM's "Greatsword" is a greatsword (d6) — "13 (2d8 + 4)" becomes "14 (3d6 + 4)"
[reskin] weapon reach follows the weapon: the GM's "Greatsword" is a greatsword — reach 10 ft becomes 5 ft
[reskin] chassis nova: "Grave-Line Charge (Recharge 5-6)" — the brute-5's own nova row; geometry, cap and rider lines below are its edits
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Skeleton's own type stands
[reskin] print canon alignment: Unaligned -> Lawful Evil — the Skeleton's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "None" -> "Understands Common plus one other language but can't speak" — the Skeleton's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Skeleton's walk; the concept's other modes stay
[reskin] print canon attack: "Hurled Femur" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] print canon: chassis row leaves — Actions/"Grave-Line Charge (Recharge 5-6)" is the chassis's own nova (the model renamed it), not the Skeleton's
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] lint: 0 findings
[reskin] audit: nothing flagged
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] multiattack re-read — "Shortbow" joins the combination; "The gravebound makes two attacks, using Greatsword or Shortbow in any combination."
[reskin] done: "Oathsworn Gravebound" — donor brute-5, CR 6
[reskin] ledger: 1 ask(s) — 1 answered (1 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 38-oathsworn-gravebound.json — fields: generation
```

---

## 39-vellick-the-last-contract

## 39. Vellick the Last Contract — CR 5

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
**Signature:** dropped

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
!! [ENRICHMENT] Failed to enrich Oathsworn Gravebound: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 38 taken name(s) the recording carried
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
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "burst", the seat that carries it ended with no row, and "throw-retrieve" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] signature miss: action — "throw-retrieve" quotes nothing the GM typed, matches no key-table verb, and the call named none of this creature's own elements for it: decoration, not a signature
[reskin] signature seat empty — no template held the idea and the seat wrote no row; nothing stands in (owner, 2026-11-23)
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
[reskin] ledger: 2 ask(s) — 2 answered (2 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 39-vellick-the-last-contract.json — fields: generation, other_edition
```

---

## 40-brother-halric

## 40. Brother Halric — CR 3

**Input:** `name: Brother Halric | `
**Donor:** brute-2 -> CR 3
**Signature:** library

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
!! [ENRICHMENT] Failed to enrich Vellick the Last Contract: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] restored 39 taken name(s) the recording carried
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
[reskin] ledger: 0 ask(s) — 0 answered (0 by receipt or anchor, 0 handed), 0 mismatch, 0 open
[reskin] 2014 conversion: one lint-gated call — both printings saved
!! [ENRICHMENT] Failed to enrich Brother Halric: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1752:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:1577:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795709051173:664:5)
[harness] enrichment not run (4 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY DIFFERS from 40-brother-halric.json — fields: generation, other_edition
```

---
