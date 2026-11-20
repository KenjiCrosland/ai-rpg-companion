# BLOCKS — the widened check (2026-11-20)

`--live-from seat` after fixes A, B, C, D1, D2, D3 and the lint, at `f4c8bb2`: s31 three rolls,
s26, s20 and s17 one roll each. Six sheets, none threw. The new lint counts **0** on all six.


---

## sweep index 31

# Smoke: sweep (2026-11-20T18-29-11)

- 01 Thunderwall Drake — ok, signature: dropped
- 02 Thunderwall Drake — ok, signature: dropped
- 03 Thunderwall Drake — ok, signature: dropped

---

## 01. Thunderwall Drake — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`
**Donor:** dragon-2 -> CR 7
**Signature:** dropped · **elapsed** 9s

### Block
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

Traits

Wake Shove. Strength Saving Throw: DC 15, any creature that starts its turn in a 10-foot Emanation originating from the drake. Failure: The target has the Prone condition. Success: The target is immune to this creature's aura for 24 hours.

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

### Trace
```
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
[reskin] clause already answered: "a young storm drake whose breath is a rolling wall of thunder" is carried by "Thunder Wall" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "a young storm drake whose breath is a rolling wall of thunde" is already carried by a row on this sheet; no second row is written for it
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strikes a creature standing in that brand-wake, the horn carries the withheld thunder through it and the target is stunned until the end of its next turn." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, pounce, composed:payoff:condition, charge-push, hook-rider, charge, isolation, execute)
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: truth-aura, fear-aura, energy-aura, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:condition:poisoned: the call picked it off the menu (what no printed template did: unstated)
[reskin] free signature row: trait — "composed:zone:condition:poisoned" quotes nothing the GM typed and matches no key-table verb, but the call names the element it expresses: "thunderous wingbeat" — a receipt the trait seat can produce. Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] free signature row: "Thunder Wake" — the trait seat cannot quote the GM, but the call names the element it expresses: "thunderous wingbeat". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): composed:zone:condition:poisoned -> Traits/"Thunder Wake" ("a zone under the drake's flight that knocks creatures prone when they start thei [shape fit, no verb match]")
[reskin] weapons answered: Horn = none; Thunder Wall = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Thunder Wake" [no template]
[reskin] name follows content: Traits/"Thunder Wake" carries Thunder the row never deals — "Wake Shove" (the element word drops; the call's own noun stays)
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element expressed: Wake Shove carries "thunderous wingbeat" — "The target has the Prone condition."
[reskin] audit: [Wake Shove: The row names the feature 'thunderous … a 10-foot Emanation originating from the drake"), Wake Shove: The name 'Wake' promises a wake or aft… a 10-foot Emanation originating from the drake"), Thunder Wall (Recharge 5-6): The feature is called… Throw: DC 15, each creature in a 15-foot Cone.")]
[reskin] audit rename blocked — "Shockwave Aura" claims an element "Wake Shove" does not pay (no damage)
[reskin] audit rename blocked — "Thunder Wall" -> "Thunder Cone" would drop the GM's own word "wall"
[reskin] audit defect: Traits/"Wake Shove" [model-written] medium undelivered — The row names the feature 'thunderous wingbeat' but neither the trigger nor the failure clause references a wingbeat or thunder; the aura fires on any turn start with no thunderous source, and the thunderstorm identity never appears. — Tie the trigger and effect to a wingbeat (e.g., Emanation originates from the drake's wingbeats, and the prone/thunder flavor matches), keeping the same stat and DC. (about: "any creature that starts its turn in a 10-foot Emanation originating from the drake")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] leaves a thunder-charged mark in the breath's area, and the next hit on a creature standing in it discharges that mark t — "The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strikes a creature standing in that brand-wake, the horn carries the withheld thunder through it and the target is stunned until the end of its next turn." — Thunderwall Drake [seat: action [rider/on_hit/condition]] (closest offered: stunning-strike) [effect: condition] [menu: affliction contagion stunning-strike pounce composed:payoff:condition charge-push hook-rider charge isolation execute] [same-cell unoffered: life-drain snatch bolt-restrain bolt-mark] [same-seat rejected: life-drain:body-verdict snatch:engine-key bolt-restrain:host-row bolt-drag:host-row bolt-mark:host-row] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 3 live (live from the seat call onward)
```

---

## 02. Thunderwall Drake — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`
**Donor:** dragon-2 -> CR 7
**Signature:** dropped · **elapsed** 13s

### Block
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

Multiattack. The drake makes two Horn attacks. It can replace one attack with a use of Brand-Wake Discharge if available.

Horn. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Brand-Wake Discharge (Recharge 5-6). Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target has the Stunned condition until the end of its next turn.

Reactions

Wake Wash. Trigger: The drake moves while airborne and passes over a creature or ends that move above one. Response—Strength Saving Throw: DC 15, the triggering creature. Failure: The target has the Prone condition. Success: The creature keeps its footing and is not knocked Prone.

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
!! [ENRICHMENT] Failed to enrich Thunderwall Drake: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:663:5)
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
[reskin] strike written from its attack: "Brand-Wake Discharge (Recharge 5-6)" clones "Horn" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] value check: "Brand-Wake Discharge (Recharge 5-6)" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Brand-Wake Discharge (Recharge 5-6)" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: truth-aura, fear-aura, energy-aura, phobia, berserk, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:poisoned" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: creatures beneath its airborne flight are knocked prone by the thunder)
[reskin] seat answered, but: the call said "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and crea" is carried by "Storm-Wake Pressure", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Storm-Wake Pressure" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Storm-Wake Pressure" — a trait is not a save — the save form takes stat, target and effect as fields and the ); asking once more with the reason
[reskin] seat answered, but: the call said "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and crea" is carried by "Wake-Shock", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("creatures beneath its airborne flight are knocked prone by the thunder") and wrote a trait instead: "Wake-Shock" -> Reactions. *Trigger:* The drake moves while airborne and passes over a creature or ends that move above one. *Response—Strength Sav
[reskin] authored row numbers: "Wake-Shock" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: trait — "Wake-Shock" after ""Storm-Wake Pressure" — a trait is not a save — the save form takes stat, target"
[reskin] free signature row: "Wake-Shock" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Wake-Shock" ("The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are  [authored: the catalog held no shape for it]")
[reskin] weapons answered: Horn = none; Thunder Wall = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] chassis nova: "Brand-Wake Discharge (Recharge 5-6)" — the dragon-2's own nova row; geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Brand-Wake Discharge (Recharge 5-6).
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Wake-Shock" [no template]
[reskin] 2024 caps: "Wake-Shock" — a condition or game term shipped lowercase
[reskin] save stat from print grammar: Actions/Brand-Wake Discharge imposes Stunned by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] lint fixed: prone-vocab — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: prone-vocab: Reactions/Wake-Shock: "falls/knocked Prone" is 2014 phrasing — 2024 writes "has the Prone condition" | dual-recharge: Two Recharge-gated entries (Thunder Wall (Recharge 5-6), Brand-Wake Discharge (Recharge 5-6)) — print never fields two; one should be 1/Day, ungated, or replaced
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
audit finding below confidence gate: Multiattack Multiattack can slot Brand-Wake Discharge, which itself resolves as a full attack roll plus damage plus a second Constitution save against Stunned, so a single Multiattack turn requires the GM to resolve an attack, a damage roll, and an unrelated second save for a state that ends on the target's next turn without any tracking aid.
[reskin] audit: [Thunder Wall (Recharge 5-6): Despite the name 'Thu…ly is. (about: "each creature in a 15-foot Cone"), Wake-Shock: The trigger requires knowing the drake…es over a creature or ends that move above one."), Wake-Shock: The name 'Wake-Shock' and the trigger …n. (about: "The target has the Prone condition.")]
[reskin] audit rename blocked — "Thunder Wall" -> "Thunder Breath" would drop the GM's own word "wall"
[reskin] audit rename: "Wake-Shock" -> "Wake Wash"
[reskin] clause unresolved: "Wake Wash" carries "The drake's hide and wings are storm-charged and it does", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] record completed: "Brand-Wake Discharge (Recharge 5-6)" imposes Stunned by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] multiattack citation synced: "Multiattack" cites each row as the row is named — a gated row reads "if available" as print writes it, an ungated row reads bare
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## 03. Thunderwall Drake — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`
**Donor:** dragon-2 -> CR 7
**Signature:** dropped · **elapsed** 11s

### Block
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

Multiattack. The drake makes two Horn attacks. It can replace one attack with a use of Charged Wake if available.

Horn. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Charged Wake (Recharge 5-6). Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target has the Stunned condition until the end of its next turn.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:663:5)
!! [ENRICHMENT] Failed to enrich Thunderwall Drake: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795199033886:663:5)
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
[reskin] strike written from its attack: "Charged Wake (Recharge 5-6)" clones "Horn" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] value check: "Charged Wake (Recharge 5-6)" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Charged Wake (Recharge 5-6)" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: truth-aura, fear-aura, energy-aura, terrain-walk, bloodied-fury, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:deafened" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a start-of-turn emanation that knocks creatures prone beneath the flyi)
[reskin] seat answered, but: the call said "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and crea" is carried by "Stormtrodden Sky", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Stormtrodden Sky" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Stormtrodden Sky" — a trait is not a save — the save form takes stat, target and effect as fields and the eng); asking once more with the reason
[reskin] seat answered, but: the call said "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and crea" is carried by "Downdraft", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind
[reskin] seat refused twice: trait — first: "Stormtrodden Sky" — a trait is not a save — the save form takes stat, target and effect a; second: you wrote no row of the kind asked for (a trait); the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] — the model found no template that holds it (offered: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, energy-aura, phobia, berserk, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude)
[reskin] weapons answered: Horn = none; Thunder Wall = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] chassis nova: "Charged Wake (Recharge 5-6)" — the dragon-2's own nova row; geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Charged Wake (Recharge 5-6).
[reskin] save stat from print grammar: Actions/Charged Wake imposes Stunned by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] lint: dual-recharge: Two Recharge-gated entries (Thunder Wall (Recharge 5-6), Charged Wake (Recharge 5-6)) — print never fields two; one should be 1/Day, ungated, or replaced
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Charged Wake (Recharge 5-6): Charged Wake reads as…unned condition until the end of its next turn.")]
[reskin] audit rename held — "Charged Wake" was written for the GM's own clause (cl_v640f4: "a young storm drake whose breath is a rolling wall of thunde"), so "Thunder Wave" does not land; the finding stands as logged
[reskin] [gap] a start-of-turn emanation that knocks creatures prone beneath the flying drake — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." — Thunderwall Drake [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:deafened) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] record completed: "Charged Wake (Recharge 5-6)" imposes Stunned by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] multiattack citation synced: "Multiattack" cites each row as the row is named — a gated row reads "if available" as print writes it, an ungated row reads bare
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## sweep index 26

# Smoke: sweep (2026-11-20T18-29-45)

- 01 Mirewitch Sable — ok, signature: library

---

## 01. Mirewitch Sable — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library · **elapsed** 13s

### Block
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

Sodden Ground. The ground in a 20-foot Emanation of Sable is difficult terrain for every creature but her, and a creature that starts its turn there must spend its movement to wade free or else sink a little, its Speed reduced by 10 feet until the start of its next turn.

Actions

Multiattack. Sable makes three Arcane Burst attacks. It can replace one attack with a use of Fen-Whisper Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sable casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fen-Whisper Hex. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Necrotic damage, and the target is cursed. While cursed, the target can't regain Hit Points.

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

### Trace
```
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
[reskin] the curse is the row: "Fen-Whisper Hex" was written for "curses trespassers" and the engine sets its curse; the Restrained it also carried is dropped — a curse, damage and a condition are more than one row buys
[reskin] authored row answers the GM: action — "Fen-Whisper Hex" was written for "curses trespassers", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a lasting curse that slows the target's movement and lets Sable track ") and wrote an action instead: "Fen-Whisper Hex" -> Actions. *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 19 (3d12) Necrotic damage, and the target is curse
[reskin] authored row numbers: "Fen-Whisper Hex" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Fen-Whisper Hex" after ""Fen-Whisper Hex" — the row does nothing on a failed save — say what the target "
[reskin] seat takes its clause: "Fen-Whisper Hex" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Fen-Whisper Hex" ("Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, t [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, relentless-pursuit, bound — the key word does not mean the mechanic here
[reskin] closest refused: trait — "aberrant-ground" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: makes the ground around her difficult terrain yet leaves her unaffecte)
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "Sodden Ground", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("makes the ground around her difficult terrain yet leaves her unaffecte") and wrote a trait instead: "Sodden Ground" -> Traits. The ground within a 20-foot Emanation of Sable is difficult terrain for every creature but her, and a creature that star
[reskin] authored row numbers: "Sodden Ground" — the call declared 2 number(s) promised
[reskin] free signature row: "Sodden Ground" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Sodden Ground" is HANDED "a marsh witch" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Sodden Ground" ("Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but [authored: the catalog held no shape for it]")
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Fen-Whisper Hex.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Sodden Ground" [no template]
[reskin] lint fixed: emanation-form — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] audit: [Fen-Whisper Hex: The cursed state that blocks heal…ile cursed, the target can't regain Hit Points."), Sodden Ground: A Speed reduction of 10 feet is ine…ced by 10 feet until the start of its next turn"), Sodden Ground: "Wade free" has no defined cost — w…its movement to wade free or else sink a little"), Sodden Ground: The trait makes the ground difficul…is difficult terrain for every creature but her")]
[reskin] audit defect: Actions/"Fen-Whisper Hex" [model-written] high open_ended — The cursed state that blocks healing has no duration, no repeat save, and no escape clause, so the target is permanently denied healing with no rules-legal way out. — Give the curse a fixed end condition (a duration, a repeat save at the end of each turn, or a removal clause) written into the entry. (about: "and the target is cursed. While cursed, the target can't regain Hit Points.")
[reskin] audit defect: Traits/"Sodden Ground" [model-written] medium weak — A Speed reduction of 10 feet is inert against a creature whose Speed is already 0 (a Grappled or Restrained creature, or one that has spent all its movement to enter the terrain), and the trait gives no floor or exception to stop it applying to a body that cannot move. — Qualify the reduction so it only bites against a creature with Speed remaining, or state the floor at which the reduction stops mattering. (about: "a creature that starts its turn there must spend its movement to wade free or else sink a little, its Speed reduced by 10 feet until the start of its next turn")
[reskin] audit defect: Traits/"Sodden Ground" [model-written] high untrackable — "Wade free" has no defined cost — whether it consumes the creature's whole movement, an amount equal to half its Speed, or a flat number is left to the GM to guess each turn. — State the exact movement cost (or a fixed figure) required to wade free so the choice is adjudicable in one read. (about: "a creature that starts its turn there must spend its movement to wade free or else sink a little")
[reskin] audit defect: Traits/"Sodden Ground" [model-written] low other — The trait makes the ground difficult terrain for everyone but Sable but never states whether the marsh she walks on is her own creation or pre-existing; as written the aura is carried with her, and that reading makes her a walking hazard rather than a witch of a marsh. — Make explicit that the emanation travels with Sable and follows her, so the GM knows whether it is a personal aura or a place-bound feature. (about: "The ground in a 20-foot Emanation of Sable is difficult terrain for every creature but her")
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Mirewitch Sable" — donor caster-8-binder, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## sweep index 20

# Smoke: sweep (2026-11-20T18-29-59)

- 01 Trenchsong Leviathan — ok, signature: library

---

## 01. Trenchsong Leviathan — CR 24

**Input:** `a leviathan of the trench whose song drowns fleets`
**Donor:** brute-21 -> CR 24 (invented — no printed peer)
**Signature:** library · **elapsed** 13s

### Block
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

Multiattack. The leviathan makes two Flukes attacks. It can replace one attack with a use of Brineburst Pulse.

Flukes. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Brineburst Pulse. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage. If the target is a creature, it is subjected to the following effect. Wisdom Saving Throw: DC 24. Failure: The target has the Frightened condition until the end of its next turn.

Bonus Actions

Binding Mark. Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: Until the start of the leviathan's next turn, the target has Disadvantage on attack rolls against creatures other than the leviathan.

Reactions

Resonant Brine. Trigger: The leviathan takes Thunder damage. Response—Wisdom Saving Throw: DC 24, each creature within 15 feet of the leviathan. Failure: The target has the Frightened condition until the end of its next turn.

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

### Trace
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
[reskin] seat authored nothing: action — the call was asked to write an action for "The leviathan's body is crusted in brine-heavy plates that split the a" and wrote no row of that kind (refused: "Brineburst Pulse" — Deafened alone is too slight to be what a strike adds — choose Frightened or Charmed, whichever fits this creature)
[reskin] seat asked again: action — the first answer was refused ("Brineburst Pulse" — Deafened alone is too slight to be what a strike adds — choose Frightened or Charmed, whi); asking once more with the reason
[reskin] strike written from its attack: "Brineburst Pulse" clones "Flukes" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] seat landed on the second try: action — "Brineburst Pulse" after ""Brineburst Pulse" — Deafened alone is too slight to be what a strike adds — cho"
[reskin] value check: "Brineburst Pulse" EV 5.2 vs floor 19.8 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Brineburst Pulse" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: escalating-dread, terror-pulse, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback skipped: push-prone (the sheet cannot render it)
[reskin] value check: "Binding Mark" EV 11.4 vs floor 0 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike echoes from its body in a painful chord—each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its next turn." [trait/on_being_hit/condition] [family: body-reaction] — menu: bloodied-burst, resonant-body, weapon-lodge (+ shelf: phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] lead by this seat's own clause: trait — "burst" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — burst: bloodied-burst
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: bloodied-burst (on_being_hit/damage), composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: resonant-body, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:deafened, bloodied-burst — the key word does not mean the mechanic here
[reskin] closest refused: trait — "resonant-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers only on taking Thunder damage and hits everyone in an area wi)
[reskin] seat answered, but: the call said "Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike ec" is carried by "Resonant Brine", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The leviathan's hide is ridged with brine channels that ring like a st" and wrote no row of that kind (refused: "Resonant Brine" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Resonant Brine" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its ne" is carried by "Resonant Brine", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("triggers only on taking Thunder damage and hits everyone in an area wi") and wrote a trait instead: "Resonant Brine" -> Reactions. *Trigger:* The leviathan takes Thunder damage. *Response—Constitution Saving Throw:* DC 24, each creature within 15 feet
[reskin] authored row numbers: "Resonant Brine" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: trait — "Resonant Brine" after ""Resonant Brine" — a trait is not a save — the save form takes stat, target and "
[reskin] free signature row: "Resonant Brine" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Resonant Brine" ("The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a ro [authored: the catalog held no shape for it]")
[reskin] weapons answered: Flukes = none; Drowning Hymn = none; Abyssal Refrain = none; Circle and Strike = none; Breach Slam = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Flukes" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] reach follows the body: Actions/"Brineburst Pulse" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] multiattack replacement clause: It can replace one attack with a use of Brineburst Pulse.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Resonant Brine" [no template]
[reskin] save stat from print grammar: Actions/Brineburst Pulse imposes Frightened by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] save re-derived after a retype: Actions/Brineburst Pulse — a Constitution save for a condition the row IMPOSES, which calls for Wisdom or Charisma (A2: a condition the row merely requires does not pick the stat)
[reskin] save re-derived after a retype: Reactions/Resonant Brine — a Constitution save for a condition the row IMPOSES, which calls for Wisdom or Charisma (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Resonant Brine carries "brine-crusted trench leviathan body" — "each creature within 15 feet of the leviathan"
[reskin] audit: [Resonant Brine: The reaction's payoff is a save im…"*Trigger:* The leviathan takes Thunder damage.")]
[reskin] audit defect: Reactions/"Resonant Brine" [model-written] medium untrackable — The reaction's payoff is a save imposed on all nearby creatures for a Thunder-type trigger the leviathan itself cannot reliably receive, and the reaction gives no benefit that isn't already covered by the Frightened-conditioned Brineburst Pulse. — Replace the trigger with something the creature can reliably receive, or tie the response to the leviathan's own song rather than incoming Thunder damage. (about: "*Trigger:* The leviathan takes Thunder damage.")
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Binding Mark) — the sameness metric
[reskin] clause unresolved: "Resonant Brine" carries "The leviathan's hide is ridged with brine channels that ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] record completed: "Brineburst Pulse" imposes Frightened by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] done: "Trenchsong Leviathan" — donor brute-21, CR 24
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 6 live (live from the seat call onward)
```

---

## sweep index 17

# Smoke: sweep (2026-11-20T18-30-12)

- 01 Pit Fiend — ok, signature: library

---

## 01. Pit Fiend — CR 20

**Input:** `name: Pit Fiend | who collects the oaths of dying knights`
**Donor:** defender-17 -> CR 20 (invented — no printed peer)
**Signature:** library · **elapsed** 10s

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

Oath-Collector. Whenever the pit fiend drops a creature that was Frightened or bound by its oath, the pit fiend regains one spent use of Legendary Resistance.

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Oath Demand.

Bite. Melee Attack Roll: +14, reach 10 ft. 18 (3d6 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 22 (4d6 + 8) Force damage plus 21 (6d6) Fire damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Oath Demand. Charisma Saving Throw: DC 21, one creature within 10 feet. Failure: 32 (5d12) Psychic damage, and the target has the Frightened condition until the end of its next turn.

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
[reskin] authored row answers the GM: action — "Oath Demand" was written for "collects the oaths of dying knights", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("seizes a dying or Bloodied creature in reach and brands it with a last") and wrote an action instead: "Oath Demand" -> Actions. *Charisma Saving Throw*: DC 21, one creature within 10 feet. *Failure:* 32 (5d12) Psychic damage, and the target has the
[reskin] authored row numbers: "Oath Demand" — the call declared (unanswered) number(s) promised
[reskin] seat takes its clause: "Oath Demand" is HANDED "collects the oaths of dying knights" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Oath Demand" ("The pit fiend seizes the dying oath from a creature within reach that is Bloodied or Prone — laying its vast scorched palm upon them and *swearing them in*. The [authored: the catalog held no shape for it]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 21 already beats print's 19 at CR 20, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "Oath-Collector. The pit fiend's authority sits on the battlefield like a weight: creatures sworn to it — and any creature frightened by it — feel their knees bend toward it, and whenever it drops a creature that was Frightened or bound by its oath, it regains a spent use of Legendary Resistance, the promise knitting itself into its iron plate." [trait/always/resource] [family: kill-growth] — menu: phobia, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, evasion (+ shelf: heated-body, resonant-body, weapon-lodge)
[reskin] lead by this seat's own clause: trait — "escalate" from the clause this seat serves, not the sheet's "curse"
[reskin] composed candidates: none trait — the kill-growth family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — escalate: bloodied-fury, blood-frenzy, berserk
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does resource; leading: bloodied-fury (always/defense), blood-frenzy (always/damage), berserk (always/condition)
[reskin] classification handed to the fit call: shape=buff_self when=on_death
[reskin] word match declined by the call: death-restoration, bloodied-fury, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "fear-aura" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: regains a spent Legendary Resistance use when it drops a creature that)
[reskin] seat answered, but: the call said "whenever it drops a creature that was Frightened or bound by its oath, it regains a spent use of Legendary Resistance" is carried by "Oath-Collector", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("regains a spent Legendary Resistance use when it drops a creature that") and wrote a trait instead: "Oath-Collector" -> Traits. Whenever the pit fiend drops a creature that was Frightened or bound by its oath, the pit fiend regains one spent use of
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Oath Demand.
[reskin] free-row budget by card size: CR 20 sits in band 17-20, where print runs 7-9 rows (p20-p90, Multiattack excluded); this card already carries 9 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Oath-Collector" [no template]
[reskin] ask vs row MISMATCH: "collects the oaths of dying knights" -> "Oath Demand" — trigger: asked on_death, row reads at_will
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Oath-Collector carries "collecting the oaths of dying knights" — "bound by its oath"
[reskin] audit: [Oath-Collector: The trait's trigger requires a cre…on from Oath Demand. (about: "bound by its oath"), Oath Demand: Nothing in the entry's fiction or mec…htened condition until the end of its next turn"), Oath-Collector: The entire payoff of the trait is … "regains one spent use of Legendary Resistance")]
[reskin] audit defect: Traits/"Oath-Collector" [model-written] high dead_reference — The trait's trigger requires a creature 'bound by its oath,' but nothing on the sheet creates or defines an oath-bound state, so the trigger can never be evaluated at the table. — Either define a condition that counts as 'bound by its oath' (e.g., one imposed by Oath Demand) or restate the trigger around a state the block actually creates such as the Frightened condition from Oath Demand. (about: "bound by its oath")
[reskin] audit defect: Actions/"Oath Demand" [model-written] high undelivered — Nothing in the entry's fiction or mechanics collects an oath — the demanded oath is never taken, recorded, or given any consequence, so the row is plain psychic damage and fear rather than the oath-collecting act the creature is built around. — Add a clause that marks a failed save as an oath sworn (a state Oath-Collector and the Multiattack rider can reference) with its own duration or end condition. (about: "the target has the Frightened condition until the end of its next turn")
[reskin] audit defect: Traits/"Oath-Collector" [model-written] medium weak — The entire payoff of the trait is recovering a Legendary Resistance use, a defensive resource with no offensive or narrative teeth, so the oath-collecting identity pays out as a silent bookkeeping tick. — Give the trait a payload that reads at the table (a condition, damage, or repositioning tied to the collected oath) rather than only restoring a spent defensive use. (about: "regains one spent use of Legendary Resistance")
[reskin] clause unresolved: "Oath-Collector" carries "Oath-Collector. The pit fiend's authority sits on the ba", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Pit Fiend" — donor defender-17, CR 20
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 5 call(s) from the tape, 4 live (live from the seat call onward)
```
