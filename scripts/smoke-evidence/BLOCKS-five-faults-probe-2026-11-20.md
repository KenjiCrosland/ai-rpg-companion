# BLOCKS — the probe after the five faults (2026-11-20)

Eleven sweep sheets that reach the seat's forms, three live rolls each: s04, s05, s09, s20, s23,
s26, s27, s29, s31, s35, s39. Every generation replayed from its recording up to the seat call and
ran live from there. **33 of 33 rolls completed; none threw and none timed out.**

Every sheet of the round is here, none held back. Each block is followed by its own trace.


---

## sweep index 4

# Smoke: sweep (2026-11-20T15-28-51)

- 01 Tollkeeper of the Chapel — ok, signature: dropped
- 02 Tollkeeper of the Chapel — ok, signature: dropped
- 03 Tollkeeper of the Chapel — ok, signature: dropped

---

## 01. Tollkeeper of the Chapel — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-2 -> CR 3
**Signature:** dropped · **elapsed** 2s

### Block
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

Resonant Body. A creature that hits the tollkeeper with a melee attack while within 5 feet of it takes 5 (1d10) Thunder damage and has the Deafened condition until the end of its next turn.

Ethereal Sight. The tollkeeper can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The tollkeeper can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The tollkeeper makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

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

### Trace
```
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
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — drain: drain
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: drain (save/damage), lure (save/condition), pacify (save/condition)
[reskin] keys would have bound: action — active-toll, sensory-strike (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] signature fit call failed — action: Failed to generate a valid response. Please try again later.
[reskin] fallback stands down: the twist path has no shelf — the Ghost's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of the clapper: a struck target that is marked as the dying cannot regain hit points for the duration of the toll, and its wounds bleed black and will not close." [trait/always/defense] [family: mark] — menu: phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial, guarded-stance (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), uncanny-sense (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — resonant-body (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] signature fit call failed — trait: Failed to generate a valid response. Please try again later.
[reskin] trait bound to the concept's verb (concept-first): resonant-body — toll+bell in the user's words; the idea path had nothing
[reskin] signature template (trait): resonant-body -> Traits/"Resonant Body" ("exact concept match [verb: toll:concept, bell:concept]")
[reskin] weapons answered: Necrotic Clapper = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Ghost's own type stands
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Necrotic Clapper" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the tollkeeper makes two Withering Touch attacks." — the Ghost's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in nothing — the Ghost's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 7 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Resonant Body" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "tolls for the dying" -> "Resonant Body" — trigger at_will
[reskin] lint: 0 findings
[reskin] audit skipped — Failed to generate a valid response. Please try again later.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] record recounted: free_rows 0 -> 0, expressed_rows undefined -> 0 — a pass after the budget removed a free row, and the record is the finished sheet's
[reskin] done: "Tollkeeper of the Chapel" — donor lurker-2, CR 3
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
!! [ENRICHMENT] Failed to enrich Tollkeeper of the Chapel: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 9 prompt(s) had no recorded answer during this entry: fit x6, audit x3
[harness] 5 call(s) from the tape, 0 live (live from the seat call onward)
```

---

## 02. Tollkeeper of the Chapel — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-2 -> CR 3
**Signature:** dropped · **elapsed** 1s

### Block
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

Resonant Body. A creature that hits the tollkeeper with a melee attack while within 5 feet of it takes 5 (1d10) Thunder damage and has the Deafened condition until the end of its next turn.

Ethereal Sight. The tollkeeper can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The tollkeeper can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The tollkeeper makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

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

### Trace
```
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
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — drain: drain
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: drain (save/damage), lure (save/condition), pacify (save/condition)
[reskin] keys would have bound: action — active-toll, sensory-strike (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] signature fit call failed — action: Failed to generate a valid response. Please try again later.
[reskin] fallback stands down: the twist path has no shelf — the Ghost's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of the clapper: a struck target that is marked as the dying cannot regain hit points for the duration of the toll, and its wounds bleed black and will not close." [trait/always/defense] [family: mark] — menu: phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial, guarded-stance (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), uncanny-sense (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — resonant-body (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] signature fit call failed — trait: Failed to generate a valid response. Please try again later.
[reskin] trait bound to the concept's verb (concept-first): resonant-body — toll+bell in the user's words; the idea path had nothing
[reskin] signature template (trait): resonant-body -> Traits/"Resonant Body" ("exact concept match [verb: toll:concept, bell:concept]")
[reskin] weapons answered: Necrotic Clapper = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Ghost's own type stands
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Necrotic Clapper" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the tollkeeper makes two Withering Touch attacks." — the Ghost's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in nothing — the Ghost's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 7 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Resonant Body" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "tolls for the dying" -> "Resonant Body" — trigger at_will
[reskin] lint: 0 findings
[reskin] audit skipped — Failed to generate a valid response. Please try again later.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] record recounted: free_rows 0 -> 0, expressed_rows undefined -> 0 — a pass after the budget removed a free row, and the record is the finished sheet's
[reskin] done: "Tollkeeper of the Chapel" — donor lurker-2, CR 3
!! [ENRICHMENT] Failed to enrich Tollkeeper of the Chapel: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 9 prompt(s) had no recorded answer during this entry: fit x6, audit x3
[harness] 5 call(s) from the tape, 0 live (live from the seat call onward)
```

---

## 03. Tollkeeper of the Chapel — CR 3

**Input:** `a chapel bell-ringer's ghost that tolls for the dying`
**Donor:** lurker-2 -> CR 3
**Signature:** dropped · **elapsed** 1s

### Block
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

Resonant Body. A creature that hits the tollkeeper with a melee attack while within 5 feet of it takes 5 (1d10) Thunder damage and has the Deafened condition until the end of its next turn.

Ethereal Sight. The tollkeeper can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The tollkeeper can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The tollkeeper makes two Withering Touch attacks. It can replace one attack with a use of Horrific Visage.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

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

### Trace
```
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
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — drain: drain
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: drain (save/damage), lure (save/condition), pacify (save/condition)
[reskin] keys would have bound: action — active-toll, sensory-strike (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] signature fit call failed — action: Failed to generate a valid response. Please try again later.
[reskin] fallback stands down: the twist path has no shelf — the Ghost's rows plus the receipted seat are the composition
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of the clapper: a struck target that is marked as the dying cannot regain hit points for the duration of the toll, and its wounds bleed black and will not close." [trait/always/defense] [family: mark] — menu: phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial, guarded-stance (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), uncanny-sense (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — resonant-body (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] signature fit call failed — trait: Failed to generate a valid response. Please try again later.
[reskin] trait bound to the concept's verb (concept-first): resonant-body — toll+bell in the user's words; the idea path had nothing
[reskin] signature template (trait): resonant-body -> Traits/"Resonant Body" ("exact concept match [verb: toll:concept, bell:concept]")
[reskin] weapons answered: Necrotic Clapper = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Ghost's own type stands
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Necrotic Clapper" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the tollkeeper makes two Withering Touch attacks." — the Ghost's own
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in nothing — the Ghost's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Horrific Visage.
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 7 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] row binds its clause: "Resonant Body" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "tolls for the dying" -> "Resonant Body" — trigger at_will
[reskin] lint: 0 findings
[reskin] audit skipped — Failed to generate a valid response. Please try again later.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] record recounted: free_rows 0 -> 0, expressed_rows undefined -> 0 — a pass after the budget removed a free row, and the record is the finished sheet's
[reskin] done: "Tollkeeper of the Chapel" — donor lurker-2, CR 3
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 9 prompt(s) had no recorded answer during this entry: fit x6, audit x3
[harness] 5 call(s) from the tape, 0 live (live from the seat call onward)
```

---

## sweep index 5

# Smoke: sweep (2026-11-20T15-28-56)

- 01 Air Elemental — ok, signature: library
- 02 Air Elemental — ok, signature: library
- 03 Air Elemental — ok, signature: library

---

## 01. Air Elemental — CR 5

**Input:** `name: Air Elemental | that carries stolen voices`
**Donor:** brute-5 -> CR 5
**Signature:** library · **elapsed** 9s

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

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks. It can replace one attack with a use of Stolen Voices.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Stolen Voices. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the air elemental's next turn. If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.

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

### Trace
```
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
[reskin] seat answered, but: the call said "A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed on a Strengt" is carried by "Engulfing Howl", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's howling wind-body engulfs its prey. A creature Frighte" and wrote no row of that kind (refused: "Engulfing Howl" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Engulfing Howl" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] seat answered, but: the call said "A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed on a Strengt" is carried by "Engulfing Howl", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's howling wind-body engulfs its prey. A creature Frighte" and wrote no row of that kind (refused: "Engulfing Howl" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Engulfing Howl" — a trait is not a save — the save form takes stat, target and effect as ; second: "Engulfing Howl" — a reaction's save deals no damage here, so say what the target suffers ; the seat stays empty
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
[reskin] audit: [Stolen Voices: The conditional Thunder payload onl… ability, it also takes 9 (2d8) Thunder damage."), Stolen Voices: The name and the GM's ask ('carries…e fantasy are delivered. (about: "Stolen Voices"), Stolen Voices: The save line has no success clause… DC 13, one creature within 60 feet. *Failure:*")]
[reskin] audit rename blocked — "Stolen Voices" -> "Whispering Wail" would drop the GM's own words "stolen", "voices"
[reskin] audit defect: Actions/"Stolen Voices" [model-written] high weak — The conditional Thunder payload only fires on a repeat application, but Frightened from this ability ends at the start of the elemental's next turn, so the elemental cannot use it on a creature it already frightened on a following turn — the damage clause is dead as written, and the row is just a one-turn Frighten with no teeth. — Rewrite the conditioning so the damage can actually trigger (e.g. against a target currently Frightened by any source, or keyed to a condition the row itself sets and that can persist into its next use). (about: "If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.")
[reskin] audit defect: Actions/"Stolen Voices" [model-written] high wording — The save line has no success clause and states only what happens on a failure, leaving a GM who rolls a success with no stated outcome. — Add an explicit Success line (e.g. 'Success: No effect') so the save has two outcomes. (about: "*Wisdom Saving Throw:* DC 13, one creature within 60 feet. *Failure:*")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on a failed Strength save, drags a Frightened engulfed creature along with the elemental's movement — "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed on a Strength saving throw; on a failure it is dragged along in the elemental's wake, moving with it when the elemental moves, and it remains engulfed until it is no longer Frightened or the elemental lets it go." — Air Elemental [seat: trait [trait/always/movement]] (closest offered: mimicry) [effect: movement] [menu: relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind undead-fortitude mimicry truth-aura fear-aura] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role assassinate:role blurred-form:role death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Air Elemental" — donor brute-5, CR 5
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

---

## 02. Air Elemental — CR 5

**Input:** `name: Air Elemental | that carries stolen voices`
**Donor:** brute-5 -> CR 5
**Signature:** library · **elapsed** 9s

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

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks. It can replace one attack with a use of Stolen Voices.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Stolen Voices. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the air elemental's next turn. If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.

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

### Trace
```
!! [ENRICHMENT] Failed to enrich Air Elemental: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] seat answered, but: the call said "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and " is carried by "Engulfing Howl", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's howling wind-body engulfs its prey. A creature Frighte" and wrote no row of that kind (refused: "Engulfing Howl" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Engulfing Howl" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] seat answered, but: the call said "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and " is carried by "Engulfing Howl", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("on a failed Strength save, drags a Frightened engulfed creature along ") and wrote a trait instead: "Engulfing Howl" -> Reactions. *Trigger:* A creature Frightened by the elemental that is within its reach takes the Disengage action. *Response—Strengt
[reskin] authored row numbers: "Engulfing Howl" — the call declared 0 number(s) promised
[reskin] seat landed on the second try: trait — "Engulfing Howl" after ""Engulfing Howl" — a trait is not a save — the save form takes stat, target and "
[reskin] free signature row: "Engulfing Howl" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Engulfing Howl" is HANDED "carries stolen voices" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Engulfing Howl" ("The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed  [authored: the catalog held no shape for it]")
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
[reskin] free row over budget: Reactions/"Engulfing Howl" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Stolen Voices" [action/save/condition]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Stolen Voices: The bonus payload requires the targ… ability, it also takes 9 (2d8) Thunder damage.")]
[reskin] audit defect: Actions/"Stolen Voices" [model-written] high undelivered — The bonus payload requires the target to be Frightened 'by this ability', but nothing the elemental does can create a prior Frightened instance, so the damage clause is dead on arrival and the row never delivers the theft-of-voice threat the GM asked for. — Make the damage fire on the initial failure (or on a re-save while the Frightened condition persists) rather than gated on an unreachable prior-Frightened state, and give the Frightened condition a voice-stealing rider so the name delivers. (about: "If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Air Elemental" — donor brute-5, CR 5
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

---

## 03. Air Elemental — CR 5

**Input:** `name: Air Elemental | that carries stolen voices`
**Donor:** brute-5 -> CR 5
**Signature:** library · **elapsed** 8s

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

Air Form. The air elemental can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The air elemental makes two Thunderous Slam attacks. It can replace one attack with a use of Stolen Voices.

Thunderous Slam. Melee Attack Roll: +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.

Stolen Voices. Wisdom Saving Throw: DC 13, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the air elemental's next turn. If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.

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

### Trace
```
!! [ENRICHMENT] Failed to enrich Air Elemental: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] audit: [Stolen Voices: The payload is gated on the target … ability, it also takes 9 (2d8) Thunder damage.")]
[reskin] audit defect: Actions/"Stolen Voices" [model-written] high undelivered — The payload is gated on the target having been Frightened by this same ability on an earlier turn, but the Frightened condition this ability imposes expires at the end of the elemental's next turn, so a target fearing a second clause to trigger must already have ended the first fear mid-turn to be tagged for a later hit, the clause cannot be reached in normal play. — Drop the chained damage clause and give the failed save its own payoff, or make the extra damage resolve on the target that is currently Frightened by any source when this ability is used. (about: "If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on a failed Strength save, drags a Frightened engulfed creature along with the elemental's movement — "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed on a Strength saving throw; on a failure it is dragged along in the elemental's wake, moving with it when the elemental moves, and it remains engulfed until it is no longer Frightened or the elemental lets it go." — Air Elemental [seat: trait [trait/always/movement]] (closest offered: mimicry) [effect: movement] [menu: relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind undead-fortitude mimicry truth-aura fear-aura] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role assassinate:role blurred-form:role death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Air Elemental" — donor brute-5, CR 5
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

---

## sweep index 9

# Smoke: sweep (2026-11-20T15-29-22)

- 01 Stone Golem — ok, signature: library
- 02 Stone Golem — ok, signature: library
- 03 Stone Golem — ok, signature: library

---

## 01. Stone Golem — CR 10

**Input:** `name: Stone Golem | carved as a weeping saint`
**Donor:** brute-9 -> CR 10
**Signature:** library · **elapsed** 9s

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

### Trace
```
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
[reskin] seat answered, but: the call said "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll agains" is carried by "Dust of Remorse", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Dust of Remorse" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount, area or bonus with no number cannot be run)
[reskin] seat asked again: trait — the first answer was refused ("Dust of Remorse" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount, a); asking once more with the reason
[reskin] seat answered, but: the call said "whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible" is carried by "Dust of Remorse", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Dust of Remorse" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Dust of Remorse" — the call counts 2 number(s) the row promises and only 1 are written — ; second: "Dust of Remorse" — a reaction's save deals no damage here, so say what the target suffers; the seat stays empty
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
[reskin] audit: [Keening Glare: The name promises a visual effect (…medium the effect uses. (about: "Keening Glare."), Keening Glare: The effect requires knowing whether…ginating from the golem that can see or hear it")]
[reskin] audit rename held — "Keening Glare" was written for the GM's own clause (cl_2cd3hd), so "Wailing Gaze" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Keening Glare" [model-written] low untrackable — The effect requires knowing whether each target can see or hear the golem, but the block provides no orientation or line-of-sight state and no deafened/blinded tracking, leaving the GM to adjudicate perception mid-turn with no defined check. — State the eligibility in terms the table can check without tracking facing or sensory state (e.g., a save against a stated condition). (about: "each creature of the golem's choice in a 30-foot Emanation originating from the golem that can see or hear it")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on being hit or harmed, forces the attacker to make a Wisdom save or its attack misses/effect fails, with a day-long imm — "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible dust like tears, and that creature must succeed on a Wisdom saving throw or have the attack miss or the effect fail as remorse breaks its concentration. A creature that succeeds on this save is immune to the effect for a day." — Stone Golem [seat: trait [trait/on_being_hit/defense]] (closest offered: resonant-body) [effect: condition] [menu: resonant-body weapon-lodge] [same-cell unoffered: absorption interpose] [same-seat rejected: heated-body:body-verdict absorption:body-verdict bloodied-burst:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Stone Golem" — donor brute-9, CR 10
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

---

## 02. Stone Golem — CR 10

**Input:** `name: Stone Golem | carved as a weeping saint`
**Donor:** brute-9 -> CR 10
**Signature:** library · **elapsed** 10s

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

### Trace
```
!! [ENRICHMENT] Failed to enrich Stone Golem: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] seat answered, but: the call said "whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible" is carried by "Grief-Worn Countenance", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Grief-Worn Countenance" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount, area or bonus with no number cannot be run)
[reskin] seat asked again: trait — the first answer was refused ("Grief-Worn Countenance" — the call counts 2 number(s) the row promises and only 1 are written — a promised am); asking once more with the reason
[reskin] seat answered, but: the call said "whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible" is carried by "Grief-Worn Countenance", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Grief-Worn Countenance" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Grief-Worn Countenance" — the call counts 2 number(s) the row promises and only 1 are wri; second: "Grief-Worn Countenance" — a reaction's save deals no damage here, so say what the target ; the seat stays empty
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
[reskin] audit: [Keening Glare: A 'Glare' is a visual effect that r…inating from the golem that can see or hear it."), Keening Glare: A stone golem 'carved as a weeping …tened condition until the end of its next turn.")]
[reskin] audit rename held — "Keening Glare" was written for the GM's own clause (cl_2cd3hd), so "Keening Wail" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Keening Glare" [model-written] medium undelivered — A stone golem 'carved as a weeping saint' delivers sorrow as its signature effect, but the row resolves to plain fear with no weeping, grief, or saintly imagery expressed anywhere in the mechanics. — Rework the failure clause to carry the weeping-saint fiction (e.g. an incapacitating grief or compelled sorrow) rather than generic Frightened. (about: "*Failure:* The target has the Frightened condition until the end of its next turn.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on being hit or harmed, forces the attacker to make a Wisdom save or its attack misses/effect fails, with a day-long imm — "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible dust like tears, and that creature must succeed on a Wisdom saving throw or have the attack miss or the effect fail as remorse breaks its concentration. A creature that succeeds on this save is immune to the effect for a day." — Stone Golem [seat: trait [trait/on_being_hit/defense]] (closest offered: resonant-body) [effect: condition] [menu: resonant-body weapon-lodge] [same-cell unoffered: absorption interpose] [same-seat rejected: heated-body:body-verdict absorption:body-verdict bloodied-burst:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Stone Golem" — donor brute-9, CR 10
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

---

## 03. Stone Golem — CR 10

**Input:** `name: Stone Golem | carved as a weeping saint`
**Donor:** brute-9 -> CR 10
**Signature:** library · **elapsed** 9s

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

### Trace
```
!! [ENRICHMENT] Failed to enrich Stone Golem: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] seat answered, but: the call said "whenever a creature within a short range makes an attack roll against it or otherwise harms it... must succeed on a Wisd" is carried by "Weeping Countenance", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Weeping Countenance" — the response writes a saving throw as prose — put it in the "save" object (stat, target, condition, movement, success — a Reaction's save hands out a condition or a forced movement and deals NO damage) and the engine renders it after "Response", as print does)
[reskin] seat asked again: trait — the first answer was refused ("Weeping Countenance" — the response writes a saving throw as prose — put it in the "save" object (stat, targe); asking once more with the reason
[reskin] seat answered, but: the call said "whenever a creature within a short range makes an attack roll against it or otherwise harms it... must succeed on a Wisd" is carried by "Weeping Countenance", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("on being hit or harmed, forces the attacker to make a Wisdom save or i") and wrote a trait instead: "Weeping Countenance" -> Reactions. *Trigger:* A creature within 60 feet of the golem makes an attack roll against it or otherwise harms it. *Response—Wisdo
[reskin] authored row numbers: "Weeping Countenance" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: trait — "Weeping Countenance" after ""Weeping Countenance" — the response writes a saving throw as prose — put it in "
[reskin] free signature row: "Weeping Countenance" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Weeping Countenance" is HANDED "carved as a weeping saint" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Weeping Countenance" ("The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face str [authored: the catalog held no shape for it]")
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
[reskin] free row over budget: Reactions/"Weeping Countenance" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Keening Glare" [action/save/condition]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Keening Glare: The success rider grants immunity t… immune to this creature's terror for 24 hours."), Keening Glare: The name promises an auditory/sonic…causing a sonic effect. (about: "Keening Glare.")]
[reskin] audit rename held — "Keening Glare" was written for the GM's own clause (cl_2cd3hd), so "Withering Gaze" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Keening Glare" [model-written] high dead_reference — The success rider grants immunity to a 'terror' that no other entry creates or names, so the clause resolves to nothing for any target that saves. — Reference the Frightened condition this entry actually imposes, or drop the success clause entirely. (about: "*Success:* The target is immune to this creature's terror for 24 hours.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Stone Golem" — donor brute-9, CR 10
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

---

## sweep index 20

# Smoke: sweep (2026-11-20T15-29-50)

- 01 Trenchsong Leviathan — ok, signature: library
- 02 Trenchsong Leviathan — ok, signature: library
- 03 Trenchsong Leviathan — ok, signature: library

---

## 01. Trenchsong Leviathan — CR 24

**Input:** `a leviathan of the trench whose song drowns fleets`
**Donor:** brute-21 -> CR 24 (invented — no printed peer)
**Signature:** library · **elapsed** 14s

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

Multiattack. The leviathan makes two Flukes attacks.

Flukes. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Dirge-Locked Gaze. Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: Until the start of the leviathan's next turn, the target has Disadvantage on attack rolls against creatures other than the leviathan.

Reactions

Trench-Dread Toll. Trigger: The leviathan takes Thunder damage. Response—Wisdom Saving Throw: DC 24, each creature within 30 feet of the leviathan. Failure: The target has the Frightened condition until the end of its next turn.

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
[reskin] clause already answered: "a leviathan of the trench whose song drowns fleets" is carried by "Drowning Hymn" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "a leviathan of the trench whose song drowns fleets" is already carried by a row on this sheet; no second row is written for it
[reskin] decline reason: action — the call answered none and names it "no_fit" — the GM's words key lure, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: action — "lure" is keyed by the GM's song and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: action — "The leviathan's body is crusted in brine-heavy plates that split the air as it breaches. When it makes a Flukes attack, it can release that pressure in a booming pulse: each creature within a short distance must succeed on a Constitution saving throw or take Thunder damage and be Deafened until the end of its next turn." [action/save/damage] — the model found no template that holds it (offered: execute, curse-debt, escalating-dread, terror-pulse, exploiter, lure, pacify, slow-bolt, sensory-strike, disarm, reveal)
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
[reskin] word match declined by the call: composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:deafened, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] closest refused: trait — "bloodied-burst" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a save-based burst around the creature that triggers when it takes a g)
[reskin] seat answered, but: the call said "Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike ec" is carried by "Brinebell Resonances", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The leviathan's hide is ridged with brine channels that ring like a st" and wrote no row of that kind (refused: "Brinebell Resonances" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Brinebell Resonances" — a trait is not a save — the save form takes stat, target and effect as fields and the); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike ec" is carried by "Brinebell Resonances", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a save-based burst around the creature that triggers when it takes a g") and wrote a trait instead: "Brinebell Resonances" -> Reactions. *Trigger:* The leviathan takes Thunder damage. *Response—Constitution Saving Throw:* DC 24, each creature within 30 feet
[reskin] authored row numbers: "Brinebell Resonances" — the call declared 1 number(s) promised
[reskin] seat landed on the second try: trait — "Brinebell Resonances" after ""Brinebell Resonances" — a trait is not a save — the save form takes stat, targe"
[reskin] free signature row: "Brinebell Resonances" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Brinebell Resonances" ("The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a ro [authored: the catalog held no shape for it]")
[reskin] weapons answered: Flukes = none; Drowning Hymn = none; Abyssal Refrain = none; Circle and Strike = none; Breach Slam = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Flukes" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Brinebell Resonances" [no template]
[reskin] save re-derived after a retype: Reactions/Brinebell Resonances — a Constitution save for a condition the row IMPOSES, which calls for Wisdom or Charisma (A2: a condition the row merely requires does not pick the stat)
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
audit finding below confidence gate: Breach Slam A Strength save whose only payload is Prone costs a legendary action to stand right back up for a fraction of the target's movement, delivering no damage or lasting threat.
[reskin] audit: [Binding Mark: The generic stand-in name 'Binding M…lls against creatures other than the leviathan."), Brinebell Resonances: The name evokes a bell reson…ightened effect. (about: "Brinebell Resonances.")]
[reskin] audit rename: "Binding Mark" -> "Dirge-Locked Gaze"
[reskin] audit rename: "Brinebell Resonances" -> "Trench-Dread Toll"
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Dirge-Locked Gaze) — the sameness metric
[reskin] clause unresolved: "Trench-Dread Toll" carries "The leviathan's hide is ridged with brine channels that ", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] a Constitution-save area burst of Thunder damage with the Deafened condition — "The leviathan's body is crusted in brine-heavy plates that split the air as it breaches. When it makes a Flukes attack, it can release that pressure in a booming pulse: each creature within a short distance must succeed on a Constitution saving throw or take Thunder damage and be Deafened until the end of its next turn." — Trenchsong Leviathan [seat: action [action/save/damage]] (closest offered: execute) [effect: condition] [menu: execute curse-debt escalating-dread terror-pulse exploiter lure pacify slow-bolt sensory-strike disarm reveal] [same-cell unoffered: trample leap thrown-burst condition-payoff active-toll ground-burst spew burrow-ambush herd thrown-burst-seed drain wind-up blighted-ground] [same-seat rejected: swallow:hold-shape trample:nova-taken leap:cr-range thrown-burst:nova-taken gaze-single:role snare:role reel:role condition-payoff:cr-range seal:role shield-bash:body-verdict hook-drag:hold-shape active-toll:nova-taken pull-through:role random-ray:body-verdict ground-burst:nova-taken spew:body-verdict burrow-ambush:cr-range obstacle-pull:role snare-bolt:role herd:body-verdict drain:body-verdict wind-up:nova-taken blighted-ground:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Trenchsong Leviathan" — donor brute-21, CR 24
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## 02. Trenchsong Leviathan — CR 24

**Input:** `a leviathan of the trench whose song drowns fleets`
**Donor:** brute-21 -> CR 24 (invented — no printed peer)
**Signature:** library · **elapsed** 14s

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

Multiattack. The leviathan makes two Flukes attacks. It can replace one attack with a use of Brineburst Plating.

Flukes. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Brineburst Plating. Constitution Saving Throw: DC 24, each creature in a 15-foot Emanation originating from the leviathan. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Reactions

Resonant Brinehide. Trigger: The leviathan takes Thunder damage. Response—Wisdom Saving Throw: DC 24, each creature within 15 feet of the leviathan. Failure: The target has the Frightened condition until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Trenchsong Leviathan: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] authored row answers the GM: action — "Brineburst Plating" was written for "a leviathan of the trench whose song drowns fleets", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a Constitution-save area burst of Thunder damage with the Deafened con") and wrote an action instead: "Brineburst Plating" -> Actions. *Constitution Saving Throw*: DC 24, each creature in a 15-foot Emanation originating from the leviathan. *Failure:* 52 (
[reskin] authored row numbers: "Brineburst Plating" — the call declared (unanswered) number(s) promised
[reskin] value check: "Brineburst Plating" EV 100.7 vs floor 19.8 (one attack of 2) — dice 52 → 38 (scaled down to the ceiling); a nova already stands — kept ungated, dice to 38 at the ceiling
[reskin] signature authored: no template — the seat wrote it -> Actions/"Brineburst Plating" ("The leviathan's body is crusted in brine-heavy plates that split the air as it breaches. When it makes a Flukes attack, it can release that pressure in a boomin [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike echoes from its body in a painful chord—each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its next turn." [trait/on_being_hit/condition] [family: body-reaction] — menu: bloodied-burst, weapon-lodge (+ shelf: phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] lead by this seat's own clause: trait — "burst" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — burst: bloodied-burst
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: bloodied-burst (on_being_hit/damage), composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:deafened, bloodied-burst, weapon-lodge, noxious-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:condition:t1:deaf" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers on taking Thunder damage and affects every creature in an are)
[reskin] seat answered, but: the call said "Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike ec" is carried by "Resonant Brinehide", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The leviathan's hide is ridged with brine channels that ring like a st" and wrote no row of that kind (refused: "Resonant Brinehide" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Resonant Brinehide" — a trait is not a save — the save form takes stat, target and effect as fields and the e); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike ec" is carried by "Resonant Brinehide", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("triggers on taking Thunder damage and affects every creature in an are") and wrote a trait instead: "Resonant Brinehide" -> Reactions. *Trigger:* The leviathan takes Thunder damage. *Response—Constitution Saving Throw:* DC 24, each creature within 15 feet
[reskin] authored row numbers: "Resonant Brinehide" — the call declared 2 number(s) promised
[reskin] seat landed on the second try: trait — "Resonant Brinehide" after ""Resonant Brinehide" — a trait is not a save — the save form takes stat, target "
[reskin] free signature row: "Resonant Brinehide" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Resonant Brinehide" ("The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a ro [authored: the catalog held no shape for it]")
[reskin] weapons answered: Flukes = none; Drowning Hymn = none; Abyssal Refrain = none; Circle and Strike = none; Breach Slam = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Flukes" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] area swap gated: "Brineburst Plating (Recharge 5-6)" deals 38 to an area in place of a 36 attack — print offers no at-will area swap that out-damages the attack it replaces (0 of its 24), so it takes print's Recharge
[reskin] multiattack replacement clause: It can replace one attack with a use of Brineburst Plating (Recharge 5-6).
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Resonant Brinehide" [no template]
[reskin] one nova at ship: "Brineburst Plating (Recharge 5-6)" un-gated to "Brineburst Plating" — "Drowning Hymn" already carries this sheet's Recharge nova (un-gated by the one-nova rule — dice to 38, at or under the Multiattack sum (49); the action economy is the limit)
[reskin] area swap priced at half a hit: "Brineburst Plating" is offered in an attack's place AT WILL and dealt 38 against a whole hit of 36; the ceiling is half a hit (18) with a save for half — print offers 15 area rows in an attack's place and none deals damage (owner's R1)
[reskin] save re-derived after a retype: Reactions/Resonant Brinehide — a Constitution save for a condition the row IMPOSES, which calls for Wisdom or Charisma (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Brineburst Plating: The name promises erupting pla…5-foot Emanation originating from the leviathan"), Multiattack: The Multiattack rider references Brin…ith a use of Brineburst Plating (Recharge 5-6).")]
[reskin] audit rename held — "Brineburst Plating" was written for the GM's own clause (cl_1h1f3n8: "a leviathan of the trench whose song drowns fleets"), so "Thunderclap Shell" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Multiattack" [catalog] high wording — The Multiattack rider references Brineburst Plating by its (Recharge 5-6) gate, but Brineburst Plating's own statblock entry carries no Recharge limiter — the Recharge text exists only inside the Multiattack line, so a GM reading the action cannot tell whether it is always usable, and the action row itself is inconsistent with the one that cites it. — Put the Recharge 5-6 gate on the Brineburst Plating action entry too, or drop the parenthetical from Multiattack, so both rows agree. (about: "It can replace one attack with a use of Brineburst Plating (Recharge 5-6).")
[reskin] clause unresolved: "Resonant Brinehide" carries "The leviathan's hide is ridged with brine channels that ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] multiattack citation synced: "Multiattack" cites each row as the row is named — a gated row reads "if available" as print writes it, an ungated row reads bare
[reskin] done: "Trenchsong Leviathan" — donor brute-21, CR 24
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## 03. Trenchsong Leviathan — CR 24

**Input:** `a leviathan of the trench whose song drowns fleets`
**Donor:** brute-21 -> CR 24 (invented — no printed peer)
**Signature:** library · **elapsed** 15s

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

Multiattack. The leviathan makes two Flukes attacks.

Flukes. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Trenchsight Mark. Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: Until the start of the leviathan's next turn, the target has Disadvantage on attack rolls against creatures other than the leviathan.

Reactions

Bell-Ridged Hide. Trigger: The leviathan takes Thunder damage, and it then regains its Drowning Hymn recharge on a roll of 5-6. Response—Wisdom Saving Throw: DC 24, each creature within 15 feet of the leviathan. Failure: The target has the Frightened condition until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Trenchsong Leviathan: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] clause already answered: "a leviathan of the trench whose song drowns fleets" is carried by "Drowning Hymn" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "a leviathan of the trench whose song drowns fleets" is already carried by a row on this sheet; no second row is written for it
[reskin] decline reason: action — the call answered none and names it "no_fit" — the GM's words key lure, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: action — "lure" is keyed by the GM's song and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: action — "The leviathan's body is crusted in brine-heavy plates that split the air as it breaches. When it makes a Flukes attack, it can release that pressure in a booming pulse: each creature within a short distance must succeed on a Constitution saving throw or take Thunder damage and be Deafened until the end of its next turn." [action/save/damage] — the model found no template that holds it (offered: execute, curse-debt, escalating-dread, terror-pulse, exploiter, lure, pacify, slow-bolt, sensory-strike, disarm, reveal)
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
[reskin] word match declined by the call: resonant-body, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t2:deafened, weapon-lodge, bloodied-burst, noxious-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:condition:t1:deaf" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an area save that Deafens each creature within a radius when the creat)
[reskin] seat answered, but: the call said "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it re" is carried by "Bell-Ridged Hide", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The leviathan's hide is ridged with brine channels that ring like a st" and wrote no row of that kind (refused: "Bell-Ridged Hide" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Bell-Ridged Hide" — a trait is not a save — the save form takes stat, target and effect as fields and the eng); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it re" is carried by "Bell-Ridged Hide", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("an area save that Deafens each creature within a radius when the creat") and wrote a trait instead: "Bell-Ridged Hide" -> Reactions. *Trigger:* The leviathan takes Thunder damage, and it then regains its Drowning Hymn recharge on a roll of 5-6. *Respons
[reskin] authored row numbers: "Bell-Ridged Hide" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: trait — "Bell-Ridged Hide" after ""Bell-Ridged Hide" — a trait is not a save — the save form takes stat, target an"
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Bell-Ridged Hide" ("The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a ro [authored: the catalog held no shape for it]")
[reskin] weapons answered: Flukes = none; Drowning Hymn = none; Abyssal Refrain = none; Circle and Strike = none; Breach Slam = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Flukes" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Bell-Ridged Hide" [no template]
[reskin] save re-derived after a retype: Reactions/Bell-Ridged Hide — a Constitution save for a condition the row IMPOSES, which calls for Wisdom or Charisma (A2: a condition the row merely requires does not pick the stat)
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element claim revoked: "Bell-Ridged Hide" claims "a song that drowns fleets" but the quote was not in the row's own text; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Bell-Ridged Hide")
audit finding below confidence gate: Breach Slam The row spends a legendary action to inflict only Prone, which costs the target nothing beyond half movement to stand and carries no damage or lingering condition.
[reskin] audit: [Bell-Ridged Hide: The quoted target clause restric… each creature within 15 feet of the leviathan."), Bell-Ridged Hide: The name 'Hide' implies a defens… "*Trigger:* The leviathan takes Thunder damage"), Binding Mark: The generic name 'Binding Mark' prom…olls against creatures other than the leviathan")]
[reskin] audit rename blocked — "Bell-Ridged Hide" -> "Resonant Toll" would drop the GM's own words "bell", "ridged", "hide"
[reskin] audit rename: "Binding Mark" -> "Trenchsight Mark"
[reskin] audit defect: Reactions/"Bell-Ridged Hide" [model-written] low other — The quoted target clause restricts the reaction's effect to creatures within 15 feet of the leviathan is not present; the actual text reads 'each creature within 15 feet of the leviathan' without naming a target origin, leaving the area's anchor ambiguous. — Anchor the area explicitly ('each creature within 15 feet of the leviathan') — verify and correct if the anchor is not the leviathan itself. (about: "*Response—Wisdom Saving Throw:* DC 24, each creature within 15 feet of the leviathan.")
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Trenchsight Mark) — the sameness metric
[reskin] clause unresolved: "Bell-Ridged Hide" carries "The leviathan's hide is ridged with brine channels that ", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] a Constitution-save area burst of Thunder damage with the Deafened condition — "The leviathan's body is crusted in brine-heavy plates that split the air as it breaches. When it makes a Flukes attack, it can release that pressure in a booming pulse: each creature within a short distance must succeed on a Constitution saving throw or take Thunder damage and be Deafened until the end of its next turn." — Trenchsong Leviathan [seat: action [action/save/damage]] (closest offered: execute) [effect: condition] [menu: execute curse-debt escalating-dread terror-pulse exploiter lure pacify slow-bolt sensory-strike disarm reveal] [same-cell unoffered: trample leap thrown-burst condition-payoff active-toll ground-burst spew burrow-ambush herd thrown-burst-seed drain wind-up blighted-ground] [same-seat rejected: swallow:hold-shape trample:nova-taken leap:cr-range thrown-burst:nova-taken gaze-single:role snare:role reel:role condition-payoff:cr-range seal:role shield-bash:body-verdict hook-drag:hold-shape active-toll:nova-taken pull-through:role random-ray:body-verdict ground-burst:nova-taken spew:body-verdict burrow-ambush:cr-range obstacle-pull:role snare-bolt:role herd:body-verdict drain:body-verdict wind-up:nova-taken blighted-ground:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Trenchsong Leviathan" — donor brute-21, CR 24
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## sweep index 23

# Smoke: sweep (2026-11-20T15-30-33)

- 01 Vashka the Red — ok, signature: dropped
- 02 Vashka the Red — ok, signature: dropped
- 03 Vashka the Red — ok, signature: dropped

---

## 01. Vashka the Red — CR 6

**Input:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`
**Donor:** defender-5 -> CR 6
**Signature:** dropped · **elapsed** 16s

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

Shield Wall. While Vashka is within 5 feet of at least one ally wielding a shield, Vashka and each such within 5 feet shield-bearing ally cannot be moved from their spaces against their will for as long as the other remains in place.

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

### Trace
```
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
[reskin] seat authored nothing: action — the call was asked to write an action for "Vashka barks a command over his shield rim, and any ally within earsho" and wrote no row of that kind
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: you wrote no row of the kind asked for (an action); the seat stays empty
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
[reskin] word match declined by the call: bloodied-fury, death-restoration, shielded-mind, evasion, pack-tactics — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: prevents forced movement of the creature and adjacent shield-bearing a)
[reskin] seat answered, but: the call said "So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share " is carried by "Shield Wall", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("prevents forced movement of the creature and adjacent shield-bearing a") and wrote a trait instead: "Shield Wall" -> Traits. While Vashka is adjacent to at least one ally wielding a shield, Vashka and each such adjacent shield-bearing ally canno
[reskin] authored row numbers: "Shield Wall" — the call declared 0 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Shield Wall" ("So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share an interlocked fighting stance, and neit [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"never breaks ranks","row":"Shield Wall"}], unplaced []
[reskin] clause already answered: "never breaks ranks" is carried by "Shield Wall" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Broadsword = longsword; Javelin = javelin
[reskin] weapon dice follow the weapon: "Javelin" is a javelin (d6) — "22 (4d8 + 4)" becomes "21 (5d6 + 4)", print's rule of keeping the die and scaling the count
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Hobgoblin Warrior's own type stands
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the Hobgoblin Warrior is the class's BODY on this path, not this creature's kind (print's own NPC blocks are all Humanoid)
[reskin] print canon attack: "Broadsword" -> "Longsword" — the Hobgoblin Warrior's own row
[reskin] print canon attack: "Javelin" -> "Longbow" — the Hobgoblin Warrior's own ranged row
[reskin] print canon trait: Pack Tactics — "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." is the Hobgoblin Warrior (print's own row)
[reskin] class weapon: "longsword" and "longbow" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Shield Wall" [no template]
[reskin] asked but unanswered: "fights from a shield wall" asked for at_will and no row binds the clause
[reskin] lint fixed: vocab-adjacent — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint actuator: "adjacent" -> "within 5 feet" in "Shield Wall"
[reskin] lint: 0 findings
[reskin] element expressed: Shield Wall carries "holding a shield wall without breaking ranks" — "cannot be moved from their spaces against their will for as long as the other re"
[reskin] audit: [Shield Wall: The clause 'each such within 5 feet s…t: "each such within 5 feet shield-bearing ally"), Shield Wall: The trait's protection endures only '…out: "for as long as the other remains in place"), Shield Wall: The GM asked for a warlord who 'never…n 5 feet of at least one ally wielding a shield")]
[reskin] audit defect: Traits/"Shield Wall" [model-written] high wording — The clause 'each such within 5 feet shield-bearing ally' is a broken noun phrase with no antecedent — 'such' points at nothing and the adjective stack does not parse, leaving the GM unable to say who the protection applies to. — Rewrite the beneficiary clause so it names the ally explicitly (each ally within 5 feet of Vashka who is wielding a shield) and quote it in one clean phrase. (about: "each such within 5 feet shield-bearing ally")
[reskin] audit defect: Traits/"Shield Wall" [model-written] medium untrackable — The trait's protection endures only 'for as long as the other remains in place', a stance both Vashka and every protected ally must maintain; the GM must continuously track each shield-bearing ally's position relative to Vashka to know when the immunity lapses, and the phrase 'the other' has no clear referent. — State the position condition once in a form the table can check at a glance rather than an ongoing mutual-position requirement. (about: "for as long as the other remains in place")
[reskin] audit defect: Traits/"Shield Wall" [model-written] low undelivered — The GM asked for a warlord who 'never breaks ranks', but the trait's protection is contingent on an ally being present and in position — the mechanic rewards proximity to others rather than expressing a personal refusal to yield, and Vashka loses the whole fantasy the moment the shield wall thins. — Ground the immovability in the wall's integrity rather than in an individual ally's continued existence, so the fantasy survives the loss of a shield-bearer. (about: "While Vashka is within 5 feet of at least one ally wielding a shield")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Shield Wall" carries "So long as Vashka has a shieldmate adjacent to him, his ", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_zvh3r1
[reskin] [gap] grants each nearby ally a Reaction move into position and a bonus to AC until the warlord's next turn — "Vashka barks a command over his shield rim, and any ally within earshot who can see or hear him may immediately use its Reaction to form up on his line: each such ally moves to stand shoulder to shoulder with a shieldmate, and until the start of Vashka's next turn that creature's AC is increased by the interlocked shields around it." — Vashka the Red [seat: action [action/always/defense]] (closest offered: rally) [effect: defense] [menu: throw-retrieve rally shield-bash ground-burst terror-pulse slow-bolt disarm push-prone curse-debt reveal wind-up thrown-burst execute lure pacify escalating-dread sensory-strike thrown-burst-seed] [same-cell unoffered: false-appearance shell-withdraw bloodied-fury death-restoration uncanny-sense shielded-mind evasion patient-defense sealed-body relic-object guarded-stance undead-fortitude mimicry blurred-form] [same-seat rejected: zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Vashka the Red" — donor defender-5, CR 6
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 6 live (live from the seat call onward)
```

---

## 02. Vashka the Red — CR 6

**Input:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`
**Donor:** defender-5 -> CR 6
**Signature:** dropped · **elapsed** 14s

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

Shield Wall. While an ally wielding a shield is within 5 feet of Vashka, Vashka and that ally cannot be forced to move from their spaces against their will while the other still stands there.

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

### Trace
```
!! [ENRICHMENT] Failed to enrich Vashka the Red: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "Vashka barks a command over his shield rim, and any ally within earsho" and wrote no row of that kind (refused: "Bark the Line" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, area or bonus with no number cannot be run)
[reskin] seat asked again: action — the first answer was refused ("Bark the Line" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, are); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "Vashka barks a command over his shield rim, and any ally within earsho" and wrote no row of that kind
[reskin] seat refused twice: action — first: "Bark the Line" — the call counts 1 number(s) the row promises and only 0 are written — a ; second: you wrote no row of the kind asked for (an action); the seat stays empty
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
[reskin] word match declined by the call: pack-tactics, bloodied-fury, death-restoration, shielded-mind, guarded-stance, undead-fortitude, evasion, spider-climb, phobia, blood-frenzy, berserk, relentless-pursuit, bound, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: cannot be forced to move from its space while an adjacent shielded all)
[reskin] seat answered, but: the call said "neither of them can be forced to move from its space against its will while the other still stands there" is carried by "Shield Wall", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("cannot be forced to move from its space while an adjacent shielded all") and wrote a trait instead: "Shield Wall" -> Traits. While an ally wielding a shield is within 5 feet of Vashka, Vashka and that ally cannot be forced to move from their spa
[reskin] authored row numbers: "Shield Wall" — the call declared 1 number(s) promised
[reskin] free signature row: "Shield Wall" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Shield Wall" is HANDED "fights from a shield wall" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Shield Wall" ("So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share an interlocked fighting stance, and neit [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"never breaks ranks","row":"Shield Wall"}], unplaced []
[reskin] clause already answered: "never breaks ranks" is carried by "Shield Wall" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Broadsword = longsword; Javelin = javelin
[reskin] weapon dice follow the weapon: "Javelin" is a javelin (d6) — "22 (4d8 + 4)" becomes "21 (5d6 + 4)", print's rule of keeping the die and scaling the count
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Hobgoblin Warrior's own type stands
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the Hobgoblin Warrior is the class's BODY on this path, not this creature's kind (print's own NPC blocks are all Humanoid)
[reskin] print canon attack: "Broadsword" -> "Longsword" — the Hobgoblin Warrior's own row
[reskin] print canon attack: "Javelin" -> "Longbow" — the Hobgoblin Warrior's own ranged row
[reskin] print canon trait: Pack Tactics — "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." is the Hobgoblin Warrior (print's own row)
[reskin] class weapon: "longsword" and "longbow" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Shield Wall" [no template]
[reskin] asked but unanswered: "fights from a shield wall" asked for at_will and no row binds the clause
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Shield Wall carries "holding a shield wall without breaking ranks" — "cannot be forced to move from their spaces against their will"
[reskin] audit: [Shield Wall: The trait only blocks forced movement…t their will while the other still stands there"), Shield Wall: The trait's own defense is conditiona…ly wielding a shield is within 5 feet of Vashka")]
[reskin] audit defect: Traits/"Shield Wall" [model-written] medium weak — The trait only blocks forced movement, which is rare at most tables, and it never helps against the far more common attacks, so the shield wall fiction delivers no meaningful protection and reads as a dead passive. — Extend the benefit to something that actually matters in play, such as the ally-protection or defense the shield wall implies, rather than only forced movement. (about: "Vashka and that ally cannot be forced to move from their spaces against their will while the other still stands there")
[reskin] audit defect: Traits/"Shield Wall" [model-written] low other — The trait's own defense is conditional on an ally with a shield that exists by assumption of the ally's gear, and nothing in Vashka's block expresses holding a shield here, so the synergy depends on a state of another creature the sheet does not establish. — Tie the shield-wall clause to a condition this sheet can actually establish, such as an adjacent ally or Vashka's own plate and shield. (about: "While an ally wielding a shield is within 5 feet of Vashka")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_zvh3r1
[reskin] [gap] grants each nearby ally a Reaction move into position and a bonus to AC until the warlord's next turn — "Vashka barks a command over his shield rim, and any ally within earshot who can see or hear him may immediately use its Reaction to form up on his line: each such ally moves to stand shoulder to shoulder with a shieldmate, and until the start of Vashka's next turn that creature's AC is increased by the interlocked shields around it." — Vashka the Red [seat: action [action/always/defense]] (closest offered: rally) [effect: defense] [menu: throw-retrieve rally shield-bash ground-burst terror-pulse slow-bolt disarm push-prone curse-debt reveal wind-up thrown-burst execute lure pacify escalating-dread sensory-strike thrown-burst-seed] [same-cell unoffered: false-appearance shell-withdraw bloodied-fury death-restoration uncanny-sense shielded-mind evasion patient-defense sealed-body relic-object guarded-stance undead-fortitude mimicry blurred-form] [same-seat rejected: zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Vashka the Red" — donor defender-5, CR 6
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 6 live (live from the seat call onward)
```

---

## 03. Vashka the Red — CR 6

**Input:** `name: Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`
**Donor:** defender-5 -> CR 6
**Signature:** dropped · **elapsed** 17s

### Block
```
Vashka the Red

Medium Humanoid, Lawful Evil

AC 19
Initiative +1 (11)

HP 93 (17d8 + 17)

Speed 30 ft., Climb 30 ft.

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

Unbroken Rank. While within 5 feet of an ally that is not Incapacitated, Vashka has Advantage on saving throws against being Charmed or Frightened and cannot be forced to move away from that ally against its will.

Spider Climb. Vashka can climb difficult surfaces, including along ceilings, without needing to make an ability check.

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

### Trace
```
!! [ENRICHMENT] Failed to enrich Vashka the Red: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] word match declined by the call: pack-tactics, bound, death-restoration, bloodied-fury — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a shared stance that keeps Vashka and an adjacent shielded ally from b)
[reskin] seat answered, but: the call said "So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share " is carried by "The Wall Holds", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "So long as Vashka has a shieldmate adjacent to him, his shield wall ho" and wrote no row of that kind (refused: "The Wall Holds" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("The Wall Holds" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] seat authored nothing: trait — the call was asked to write a trait for "So long as Vashka has a shieldmate adjacent to him, his shield wall ho" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: trait — first: "The Wall Holds" — a trait is not a save — the save form takes stat, target and effect as ; second: it belongs in the description; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "guarded-stance" nearest and judged its subject FLIPPED against the clause (a shared stance that keeps Vashka and an adjacent shielded ally from b); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key pack-tactics, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "pack-tactics" is keyed by the GM's shield wall+ranks+never breaks ranks and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share an interlocked fighting stance, and neither of them can be forced to move from its space against its will while the other still stands there. When his last shieldmate falls, the wall is broken and he fights on alone." [trait/always/defense] — the model found no template that holds it (offered: pack-tactics, bloodied-fury, death-restoration, shielded-mind, guarded-stance, undead-fortitude, evasion, spider-climb, phobia, blood-frenzy, berserk, relentless-pursuit, bound, truth-aura, fear-aura)
[reskin] concept-first trait skipped: pack-tactics — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] trait bound to the concept's verb (concept-first): spider-climb — walls+wall in the user's words; the idea path had nothing
[reskin] signature template (trait): spider-climb -> Traits/"Spider Climb" ("exact concept match [verb: walls:concept, wall:concept]")
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Unbroken Rank" — the call reads its condition as immune, so no condition is recorded against it
[reskin] repaired sheet: 2 attack row(s), 0 save, 1 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] weapons answered: Broadsword = longsword; Javelin = javelin
[reskin] weapon dice follow the weapon: "Javelin" is a javelin (d6) — "22 (4d8 + 4)" becomes "21 (5d6 + 4)", print's rule of keeping the die and scaling the count
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Hobgoblin Warrior's own type stands
[reskin] print canon alignment: Lawful Neutral -> Lawful Evil — the Hobgoblin Warrior's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon type: Humanoid stays — the Hobgoblin Warrior is the class's BODY on this path, not this creature's kind (print's own NPC blocks are all Humanoid)
[reskin] print canon attack: "Broadsword" -> "Longsword" — the Hobgoblin Warrior's own row
[reskin] print canon attack: "Javelin" -> "Longbow" — the Hobgoblin Warrior's own ranged row
[reskin] climb speed: Climb 30 ft. — a creature that climbs difficult surfaces has a Climb Speed in print (the Vampire, the Giant Spider)
[reskin] print canon trait: Pack Tactics — "Vashka the Red — A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks." is the Hobgoblin Warrior (print's own row)
[reskin] class weapon: "longsword" and "longbow" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] free-row budget by card size: CR 6 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] 2024 caps: "Unbroken Rank" — a condition or game term shipped lowercase
[reskin] row binds its clause: "Spider Climb" answers "fights from a shield wall" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "fights from a shield wall" -> "Spider Climb" — limit at_will
[reskin] lint: 0 findings
[reskin] audit: [Spider Climb: Climb speed plus ceiling-walking is …ings, without needing to make an ability check."), Unbroken Rank: The name promises the rank never br…hin 5 feet of an ally that is not Incapacitated")]
[reskin] audit defect: Traits/"Spider Climb" [catalog] high undelivered — Climb speed plus ceiling-walking is spider anatomy grafted onto a plate-armored hobgoblin shield-wall fighter; it contradicts the creature's body and the owner's ask, and the catalog row is what to fix. — Replace in the shared catalog with a trait that expresses steady footing/formation instead of arachnid wall-crawling. (about: "Vashka can climb difficult surfaces, including along ceilings, without needing to make an ability check.")
[reskin] audit defect: Traits/"Unbroken Rank" [model-written] medium undelivered — The name promises the rank never breaks, but the mechanic only grants save Advantage and anti-forced-movement; it does nothing to keep the wall's formation or grant the shield-wall benefit the ask names, so the name oversells what the text delivers. — Have the trait state a formation benefit (e.g. imposing displacement or static defenses while ranks hold) rather than only save Advantage. (about: "While within 5 feet of an ally that is not Incapacitated")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_zvh3r1
[reskin] [gap] grants each nearby ally a Reaction move into position and a bonus to AC until the warlord's next turn — "Vashka barks a command over his shield rim, and any ally within earshot who can see or hear him may immediately use its Reaction to form up on his line: each such ally moves to stand shoulder to shoulder with a shieldmate, and until the start of Vashka's next turn that creature's AC is increased by the interlocked shields around it." — Vashka the Red [seat: action [action/always/defense]] (closest offered: rally) [effect: defense] [menu: throw-retrieve rally shield-bash ground-burst terror-pulse slow-bolt disarm push-prone curse-debt reveal wind-up thrown-burst execute lure pacify escalating-dread sensory-strike thrown-burst-seed] [same-cell unoffered: false-appearance shell-withdraw bloodied-fury death-restoration uncanny-sense shielded-mind evasion patient-defense sealed-body relic-object guarded-stance undead-fortitude mimicry blurred-form] [same-seat rejected: zone-seed:role] [row dropped]
[reskin] [gap] a shared stance that keeps Vashka and an adjacent shielded ally from being moved against their will while the other stan — "So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share an interlocked fighting stance, and neither of them can be forced to move from its space against its will while the other still stands there. When his last shieldmate falls, the wall is broken and he fights on alone." — Vashka the Red [seat: trait [trait/always/defense]] (closest offered: guarded-stance) [effect: defense] [menu: pack-tactics bloodied-fury death-restoration shielded-mind guarded-stance undead-fortitude evasion spider-climb phobia blood-frenzy berserk relentless-pursuit bound truth-aura fear-aura] [same-cell unoffered: false-appearance shell-withdraw uncanny-sense patient-defense sealed-body relic-object mimicry blurred-form] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict mimicry:body-verdict assassinate:role blurred-form:role death-burst:role kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path class_npc
[reskin] done: "Vashka the Red" — donor defender-5, CR 6
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 7 live (live from the seat call onward)
```

---

## sweep index 26

# Smoke: sweep (2026-11-20T15-31-21)

- 01 Mirewitch Sable — ok, signature: library
- 02 Mirewitch Sable — ok, signature: library
- 03 Mirewitch Sable — ok, signature: library

---

## 01. Mirewitch Sable — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library · **elapsed** 9s

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

Mire Terrain. The ground in a 10-foot Emanation originating from Sable is Difficult Terrain.

Actions

Multiattack. Sable makes three Arcane Burst attacks. It can replace one attack with a use of Mirebrand Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sable casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Mirebrand Hex. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Bludgeoning damage, and the target is cursed. While cursed, the target can't regain Hit Points.

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
[reskin] the curse is the row: "Mirebrand Hex" was written for "curses trespassers" and the engine sets its curse; the Restrained it also carried is dropped — a curse, damage and a condition are more than one row buys
[reskin] authored row answers the GM: action — "Mirebrand Hex" was written for "curses trespassers", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a lasting curse that slows the target's movement and lets Sable track ") and wrote an action instead: "Mirebrand Hex" -> Actions. *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 19 (3d12) Bludgeoning damage, and the target is cu
[reskin] authored row numbers: "Mirebrand Hex" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Mirebrand Hex" after ""Fen-Whisper Hex" — the row does nothing on a failed save — say what the target "
[reskin] seat takes its clause: "Mirebrand Hex" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Mirebrand Hex" ("Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, t [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, aberrant-ground, bound, phobia — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:terrain: the call picked it off the menu (what no printed template did: unstated)
[reskin] pick kept on the GM's own words: trait — "composed:zone:terrain" has no key-table verb, but the call quotes "a marsh witch who curses trespassers cr" from the description
[reskin] seat takes its clause: "Mire Terrain" is HANDED "a marsh witch" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): composed:zone:terrain -> Traits/"Mire Terrain" ("the ground within a short radius of her is sodden, sucking mire that counts as d [shape fit, no verb match]")
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Mirebrand Hex.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] audit: [Mirebrand Hex: The curse imposes a persistent stat…hile cursed, the target can't regain Hit Points"), Mire Terrain: The name promises marsh terrain but …on originating from Sable is Difficult Terrain.")]
[reskin] audit rename held — "Mire Terrain" was written for the GM's own clause (cl_1enkq57), so "Bogward" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Mirebrand Hex" [model-written] high open_ended — The curse imposes a persistent state with no stated duration and no repeat save, escape clause, or end condition, so the target has no rules-legal way out. — Give the curse a fixed duration (e.g., ends at the start of Sable's next turn, or 1 minute with a repeat save at end of turn). (about: "the target is cursed. While cursed, the target can't regain Hit Points")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Mirewitch Sable" — donor caster-8-binder, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 4 live (live from the seat call onward)
```

---

## 02. Mirewitch Sable — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library · **elapsed** 14s

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

The Fen Answers. The ground in a 20-foot Emanation of Sable is difficult terrain for creatures other than her; a creature that starts its turn there either loses its movement or starts sinking, reducing its Speed by feet until the end of that turn.

Actions

Multiattack. Sable makes three Arcane Burst attacks. It can replace one attack with a use of Mire-Mark Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sable casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Mire-Mark Hex. Strength Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Bludgeoning damage, and the target is pulled up to 10 feet straight toward Sable, and the target is cursed. While cursed, the target gains no benefit from finishing a Short or Long Rest.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
!! [ENRICHMENT] Failed to enrich Mirewitch Sable: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "Sable whispers a hex into a handful of fen-water and flicks it at one " and wrote no row of that kind (refused: "Fen-Weight Curse" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Fen-Weight Curse" — the row does nothing on a failed save — say what the target suffers: a condition it gains); asking once more with the reason
[reskin] the curse is the row: "Mire-Mark Hex" was written for "curses trespassers" and the engine sets its curse and its damage
[reskin] authored row answers the GM: action — "Mire-Mark Hex" was written for "curses trespassers", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a lasting curse that slows the target's movement and lets Sable track ") and wrote an action instead: "Mire-Mark Hex" -> Actions. *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 19 (3d12) Bludgeoning damage, and the target is pu
[reskin] authored row numbers: "Mire-Mark Hex" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Mire-Mark Hex" after ""Fen-Weight Curse" — the row does nothing on a failed save — say what the target"
[reskin] seat takes its clause: "Mire-Mark Hex" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Mire-Mark Hex" ("Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, t [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] word match declined by the call: aberrant-ground, composed:zone:terrain, terrain-walk — the key word does not mean the mechanic here
[reskin] closest refused: trait — "aberrant-ground" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: difficult terrain that spares Sable and makes trespassers choose betwe)
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "The Fen Answers", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("difficult terrain that spares Sable and makes trespassers choose betwe") and wrote a trait instead: "The Fen Answers" -> Traits. The ground within a 20-foot Emanation of Sable is difficult terrain for creatures other than her; a creature that starts
[reskin] authored row numbers: "The Fen Answers" — the call declared 2 number(s) promised
[reskin] free signature row: "The Fen Answers" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "The Fen Answers" is HANDED "a marsh witch" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"The Fen Answers" ("Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but [authored: the catalog held no shape for it]")
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Mire-Mark Hex.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "The Fen Answers" [no template]
[reskin] save re-derived after a retype: Actions/Mire-Mark Hex — a Wisdom save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint fixed: emanation-form — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] element expressed: The Fen Answers carries "the fen itself rising as her weapon" — "The ground in a 20-foot Emanation of Sable is difficult terrain for creatures ot"
[reskin] audit: [Mire-Mark Hex: The curse has no duration, no escap…no benefit from finishing a Short or Long Rest."), The Fen Answers: The amount of Speed lost by sinki…ng its Speed by feet until the end of that turn"), The Fen Answers: The trait does not say who choose…t: "either loses its movement or starts sinking"), Mire-Mark Hex: This is a 60-foot-range curse that …t is pulled up to 10 feet straight toward Sable")]
[reskin] audit defect: Actions/"Mire-Mark Hex" [model-written] high open_ended — The curse has no duration, no escape DC, and no repeated save, and it also denies the target the very rests that could plausibly end it, so there is no rules-legal path out. — Give the curse an end condition the target can reach — a repeat save with timing, a fixed duration, or removal via a stated action. (about: "the target is cursed. While cursed, the target gains no benefit from finishing a Short or Long Rest.")
[reskin] audit defect: Traits/"The Fen Answers" [model-written] high wording — The amount of Speed lost by sinking is left blank, so the GM cannot resolve the sink branch. — State the number of feet of Speed lost. (about: "reducing its Speed by feet until the end of that turn")
[reskin] audit defect: Traits/"The Fen Answers" [model-written] medium other — The trait does not say who chooses between losing movement and sinking, leaving the affected creature's turn ambiguous. — Specify whether the creature or Sable picks the branch. (about: "either loses its movement or starts sinking")
[reskin] audit defect: Actions/"Mire-Mark Hex" [model-written] medium other — This is a 60-foot-range curse that yanks a victim toward a Medium humanoid witch, a pull that only makes sense for a melee reach and does nothing for the hex's stated range. — Replace the pull with an effect the range supports, such as rooting the target in the fen. (about: "the target is pulled up to 10 feet straight toward Sable")
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Mirewitch Sable" — donor caster-8-binder, CR 7
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## 03. Mirewitch Sable — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library · **elapsed** 9s

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

Sinking Mire. The ground in a 10-foot Emanation originating from Sable is Difficult Terrain.

Actions

Multiattack. Sable makes three Arcane Burst attacks. It can replace one attack with a use of Fen-Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sable casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fen-Hex. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Bludgeoning damage, and the target is cursed. While cursed, the target can't regain Hit Points.

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
!! [ENRICHMENT] Failed to enrich Mirewitch Sable: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "Sable whispers a hex into a handful of fen-water and flicks it at one " and wrote no row of that kind (refused: "Fen-Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Fen-Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a force); asking once more with the reason
[reskin] the curse is the row: "Fen-Hex" was written for "curses trespassers" and the engine sets its curse; the Restrained it also carried is dropped — a curse, damage and a condition are more than one row buys
[reskin] authored row answers the GM: action — "Fen-Hex" was written for "curses trespassers", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a lasting curse that slows the target's movement and lets Sable track ") and wrote an action instead: "Fen-Hex" -> Actions. *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 19 (3d12) Bludgeoning damage, and the target is cu
[reskin] authored row numbers: "Fen-Hex" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Fen-Hex" after ""Fen-Hex" — the row does nothing on a failed save — say what the target suffers:"
[reskin] seat takes its clause: "Fen-Hex" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Fen-Hex" ("Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, t [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, aberrant-ground, bound — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:terrain: the call picked it off the menu (what no printed template did: unstated)
[reskin] pick kept on the GM's own words: trait — "composed:zone:terrain" has no key-table verb, but the call quotes "a marsh witch who curses trespassers cr" from the description
[reskin] seat takes its clause: "Sinking Mire" is HANDED "a marsh witch" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): composed:zone:terrain -> Traits/"Sinking Mire" ("the ground within a short radius of her is sodden, sucking mire that counts as d [shape fit, no verb match]")
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Fen-Hex.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] audit: [Fen-Hex: The curse imposes a persistent state with…ile cursed, the target can't regain Hit Points."), Sinking Mire: The emanation's area applies to 'the…on originating from Sable is Difficult Terrain."), Fen-Hex: The name and the GM ask promise a witch's…arget heals. (about: "and the target is cursed.")]
[reskin] audit defect: Actions/"Fen-Hex" [model-written] high open_ended — The curse imposes a persistent state with no escape clause, repeat save, duration, or removal condition, and its only listed effect is blocking healing rather than delivering the hex the fiction promises. — Give the curse an end condition (repeat save at end of turn, or a fixed duration) and add an immediate effect on the failed save beyond the HP-regain lock. (about: "and the target is cursed. While cursed, the target can't regain Hit Points.")
[reskin] audit defect: Traits/"Sinking Mire" [catalog] medium untrackable — The emanation's area applies to 'the ground,' so it is unclear whether creatures in the air, on structures, or in water are affected, and the trait gives no timing for when the terrain resolves or persists. — Anchor the terrain to spaces within the emanation on the ground and state when it applies (e.g., 'while Sable is on the ground'). (about: "The ground in a 10-foot Emanation originating from Sable is Difficult Terrain.")
[reskin] audit defect: Actions/"Fen-Hex" [model-written] medium undelivered — The name and the GM ask promise a witch's curse, but the only effect is a healing lock that many creatures never trigger, so the hex reads as a non-event against most targets. — Make the curse deliver a visible, immediately felt penalty (e.g., a condition or disadvantage) alongside the healing lock so the hex lands whether or not the target heals. (about: "and the target is cursed.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Mirewitch Sable" — donor caster-8-binder, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 4 live (live from the seat call onward)
```

---

## sweep index 27

# Smoke: sweep (2026-11-20T15-31-53)

- 01 Oathbroken Warder — ok, signature: dropped
- 02 Oathbroken Warder — ok, signature: dropped
- 03 Oathbroken Warder — ok, signature: dropped

---

## 01. Oathbroken Warder — CR 6

**Input:** `a templar priest with a mace and no magic at all`
**Donor:** defender-5 -> CR 6
**Signature:** dropped · **elapsed** 17s

### Block
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

Silent Oath. When the warder hits with a Mace attack, the warder can deal maximum damage instead of rolling, but then takes Psychic damage equal to the damage dealt as the oath's silence turns inward.

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

### Trace
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
[reskin] seat answered, but: the call said "halts the movement of any creature that moves within the creature's reach, zeroing its Speed" is carried by "Hold the Line", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a reaction for "The warder plants his shield and dares the line to break. Each creatur" and wrote no row of that kind (refused: "Hold the Line" — the response writes a saving throw as prose — put it in the "save" object (stat, target, condition, movement, success — a Reaction's save hands out a condition or a forced movement and deals NO damage) and the engine renders it after "Response", as print does)
[reskin] seat asked again: action — the first answer was refused ("Hold the Line" — the response writes a saving throw as prose — put it in the "save" object (stat, target, con); asking once more with the reason
[reskin] seat answered, but: the call said "halts the movement of any creature that moves within the creature's reach, zeroing its Speed" is carried by "Hold the Line", and no such row is on this sheet — the clause stays open
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
[reskin] word match declined by the call: blood-frenzy, pack-tactics, bloodied-fury — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on a hit, deal maximum damage instead of rolling and take equal psychi)
[reskin] clause already answered: "a templar priest with a mace" is carried by "Mace" — the seat read the sheet and declined to write a second row for it
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The warder fights without a single prayer behind his mace. When he hit" and wrote no row of that kind (refused: "Mace" — a rider says what the hit does: a condition, a forced movement, or a curse)
[reskin] seat asked again: trait — the first answer was refused ("Mace" — a rider says what the hit does: a condition, a forced movement, or a curse); asking once more with the reason
[reskin] seat answered, but: the call said "The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximu" is carried by "Silent Oath", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("on a hit, deal maximum damage instead of rolling and take equal psychi") and wrote a trait instead: "Silent Oath" -> Traits. When the warder hits with a Mace attack, the warder can deal maximum damage instead of rolling, but then takes psychic d
[reskin] authored row numbers: "Silent Oath" — the call declared 1 number(s) promised
[reskin] seat landed on the second try: trait — "Silent Oath" after ""Mace" — a rider says what the hit does: a condition, a forced movement, or a cu"
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Silent Oath" ("The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he take [authored: the catalog held no shape for it]")
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
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Silent Oath" [no template]
[reskin] lint fixed: damage-type-caps — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element expressed: Silent Oath carries "a mace swung without a single prayer behind it" — "the oath's silence turns inward"
audit finding below confidence gate: Shield Bash Replacing a 17-damage Mace attack with Shield Bash deals less damage and only knocks Prone, so it is a strictly worse use of the Multiattack slot unless the victim is already prone-adjacent.
[reskin] audit: [Silent Oath: The trait's cost scales with the Mace… takes Psychic damage equal to the damage dealt"), Mace: A templar with no magic and a plain mace imp…roll before the start of the warder's next turn")]
[reskin] audit defect: Traits/"Silent Oath" [model-written] medium other — The trait's cost scales with the Mace's fixed maximum (always 26 Psychic), so the warder reliably damages itself for almost a quarter of its HP on a normal hit, and nothing in the block connects 'silence' or an oath to this self-harm beyond flavour. — Make the trade-off an actual oath mechanic the GM can track and the fiction can express, or strip the recoil clause so the trait carries a mace-without-prayer effect the block can enforce. (about: "the warder can deal maximum damage instead of rolling, but then takes Psychic damage equal to the damage dealt")
[reskin] audit defect: Actions/"Mace" [model-written] medium untrackable — A templar with no magic and a plain mace imposes an untrackable rider — the GM must remember a per-target attack-roll debuff across every target without any marker on the sheet. — Remove the Disadvantage rider from the mace; the weapon should hit hard and let Silent Oath carry the signature effect. (about: "the target has Disadvantage on its next attack roll before the start of the warder's next turn")
[reskin] clause unresolved: "Silent Oath" carries "When he hits with a Mace attack, he can choose to deal m", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] [gap] halts the movement of any creature that moves within the creature's reach, zeroing its Speed — "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have its Speed reduced to 0 until the end of that turn, as he steps into its path and cracks the offending limb." — Oathbroken Warder [seat: action [reaction/on_being_hit/movement]] (closest offered: riposte) [effect: movement] [menu: riposte answering-strike] [same-cell unoffered: none] [same-seat rejected: ward-retaliation:requires-style snap-shot:host-row interpose:requires-style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Oathbroken Warder" — donor defender-5, CR 6
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 6 live (live from the seat call onward)
```

---

## 02. Oathbroken Warder — CR 6

**Input:** `a templar priest with a mace and no magic at all`
**Donor:** defender-5 -> CR 6
**Signature:** dropped · **elapsed** 13s

### Block
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

Silent Oath. When the warder hits with a Mace attack, the warder can choose to deal maximum damage instead of rolling, but then takes Psychic damage equal to the damage dealt.

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

### Trace
```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
!! [ENRICHMENT] Failed to enrich Oathbroken Warder: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write a reaction for "The warder plants his shield and dares the line to break. Each creatur" and wrote no row of that kind (refused: "Hold the Line" — the response writes a saving throw as prose — put it in the "save" object (stat, target, condition, movement, success — a Reaction's save hands out a condition or a forced movement and deals NO damage) and the engine renders it after "Response", as print does)
[reskin] seat asked again: action — the first answer was refused ("Hold the Line" — the response writes a saving throw as prose — put it in the "save" object (stat, target, con); asking once more with the reason
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
[reskin] word match declined by the call: blood-frenzy, pack-tactics, bloodied-fury — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on a hit, choose to deal maximum damage and take that much psychic dam)
[reskin] seat answered, but: the call said "The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximu" is carried by "Silent Oath", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("on a hit, choose to deal maximum damage and take that much psychic dam") and wrote a trait instead: "Silent Oath" -> Traits. When the warder hits with a Mace attack, the warder can choose to deal maximum damage instead of rolling, but then takes
[reskin] authored row numbers: "Silent Oath" — the call declared 0 number(s) promised
[reskin] free signature row: "Silent Oath" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Silent Oath" ("The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he take [authored: the catalog held no shape for it]")
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
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Silent Oath" [no template]
[reskin] lint fixed: damage-type-caps — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element expressed: Silent Oath carries "a mace swung without a single prayer behind it" — "the warder can choose to deal maximum damage instead of rolling"
audit finding below confidence gate: Aura of Authority The aura grants identical Advantage to the warder and all allies, so the warder (and any ally) gains Advantage on saving throws against effects that would Incapacitate it; the trait explicitly only shuts off once Incapacitated is already applied, which reads as a contradiction between the benefit and its own shutoff clause.
[reskin] audit: [Silent Oath: The trait's only cost is self-inflict… takes Psychic damage equal to the damage dealt"), Mace: The mace's rider is keyed to a purely non-ma…roll before the start of the warder's next turn")]
[reskin] audit defect: Traits/"Silent Oath" [model-written] medium undelivered — The trait's only cost is self-inflicted Psychic damage, which is magic in substance; a priest with no magic at all cannot deal it to itself, and nothing else on the sheet produces Psychic damage. — Make the self-inflicted cost a non-magical one (e.g., the warder cannot take Reactions until its next turn, or takes damage of a type consistent with exertion) rather than Psychic. (about: "but then takes Psychic damage equal to the damage dealt")
[reskin] audit defect: Actions/"Mace" [model-written] medium undelivered — The mace's rider is keyed to a purely non-magical weapon swing but inflicts a coercive, oath-like debuff the sheet's fiction never establishes; the weapon functions as a magic effect with no magic on the creature. — Either drop the Disadvantage rider so the mace is a plain bludgeon, or give it a non-magical basis consistent with the no-magic templar concept. (about: "the target has Disadvantage on its next attack roll before the start of the warder's next turn")
[reskin] clause unresolved: "Silent Oath" carries "The warder fights without a single prayer behind his mac", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] [gap] halts the movement of any creature that moves within the creature's reach, zeroing its Speed — "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have its Speed reduced to 0 until the end of that turn, as he steps into its path and cracks the offending limb." — Oathbroken Warder [seat: action [reaction/on_being_hit/movement]] (closest offered: riposte) [effect: movement] [menu: riposte answering-strike] [same-cell unoffered: none] [same-seat rejected: ward-retaliation:requires-style snap-shot:host-row interpose:requires-style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Oathbroken Warder" — donor defender-5, CR 6
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
!! [ENRICHMENT] Failed to enrich Oathbroken Warder: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## 03. Oathbroken Warder — CR 6

**Input:** `a templar priest with a mace and no magic at all`
**Donor:** defender-5 -> CR 6
**Signature:** dropped · **elapsed** 14s

### Block
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

Martyr's Strike. When the warder hits with a Mace attack, the warder can deal maximum damage with that attack instead of rolling, then takes Psychic damage equal to the damage dealt.

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

### Trace
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
[reskin] seat answered, but: the call said "Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have it" is carried by "Hold the Line", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a reaction for "The warder plants his shield and dares the line to break. Each creatur" and wrote no row of that kind (refused: "Hold the Line" — the response writes a saving throw as prose — put it in the "save" object (stat, target, condition, movement, success — a Reaction's save hands out a condition or a forced movement and deals NO damage) and the engine renders it after "Response", as print does)
[reskin] seat asked again: action — the first answer was refused ("Hold the Line" — the response writes a saving throw as prose — put it in the "save" object (stat, target, con); asking once more with the reason
[reskin] seat answered, but: the call said "Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have it" is carried by "Hold the Line", and no such row is on this sheet — the clause stays open
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
[reskin] word match declined by the call: blood-frenzy, pack-tactics, assassinate, bloodied-fury, berserk — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: lets the creature choose maximum damage on a hit at a cost to itself)
[reskin] seat answered, but: the call said "When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he takes psychic damage eq" is carried by "Silent Oath", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("lets the creature choose maximum damage on a hit at a cost to itself") and wrote a trait instead: "Silent Oath" -> Traits. When the warder hits with a Mace attack, the warder can deal maximum damage with that attack instead of rolling, then ta
[reskin] authored row numbers: "Silent Oath" — the call declared 0 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Silent Oath" ("The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he take [authored: the catalog held no shape for it]")
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
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Silent Oath" [no template]
[reskin] lint fixed: damage-type-caps — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element expressed: Silent Oath carries "a mace swung without a single prayer behind it" — "the warder can deal maximum damage with that attack instead of rolling"
audit finding below confidence gate: Shield Bash The row's only real payload is Prone, which a standing creature shakes off for half its movement, so the action costs the warder a Mace attack for a nuisance condition rather than a threat.
[reskin] audit: [Silent Oath: The recoil is unresisted self-damage … takes Psychic damage equal to the damage dealt"), Shield Bash: The save is missing the standard 'DC … order. (about: "*Strength Saving Throw*: DC 15"), Silent Oath: The name promises a vow of silence or…a self-sacrificing strike. (about: "Silent Oath"), Mace: The imposed state has no save and applies au…oll before the start of the warder's next turn.")]
[reskin] audit rename: "Silent Oath" -> "Martyr's Strike"
[reskin] audit defect: Actions/"Shield Bash" [print] high wording — The save is missing the standard 'DC X Strength saving throw' phrasing and the target/timing clause reads as a detached fragment, leaving the trigger sentence grammatically incomplete. — Rewrite the opening as a complete save sentence naming the save type and DC in standard order. (about: "*Strength Saving Throw*: DC 15")
[reskin] audit defect: Actions/"Mace" [model-written] medium open_ended — The imposed state has no save and applies automatically on any hit, so the victim has no rules-legal response or escape clause. — Add a saving throw or a repeat/end condition so the Disadvantage effect can be resisted or ended. (about: "the target has Disadvantage on its next attack roll before the start of the warder's next turn.")
[reskin] clause unresolved: "Martyr's Strike" carries "When he hits with a Mace attack, he can choose to deal m", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] [gap] halts the movement of any creature that moves within the creature's reach, zeroing its Speed — "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have its Speed reduced to 0 until the end of that turn, as he steps into its path and cracks the offending limb." — Oathbroken Warder [seat: action [reaction/on_being_hit/movement]] (closest offered: riposte) [effect: movement] [menu: riposte answering-strike] [same-cell unoffered: none] [same-seat rejected: ward-retaliation:requires-style snap-shot:host-row interpose:requires-style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Oathbroken Warder" — donor defender-5, CR 6
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## sweep index 29

# Smoke: sweep (2026-11-20T15-32-38)

- 01 Swarm of Funeral Bells — ok, signature: library
- 02 Swarm of Funeral Bells — ok, signature: library
- 03 Swarm of Funeral Bells — ok, signature: library

---

## 01. Swarm of Funeral Bells — CR 13

**Input:** `a swarm of funeral bells that ring themselves over the dying`
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 15s

### Block
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

Multiattack. The swarm makes two Tolling attacks. It can replace one attack with a use of Funeral Knell.

Tolling. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Funeral Knell. Wisdom Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

Reactions

Final Rite. Trigger: A creature within the swarm's reach drops to 0 Hit Points. Response—Wisdom Saving Throw: DC 17, each creature of the swarm's choice within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[reskin] authored row answers the GM: action — "Funeral Knell" was written for "ring themselves over the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("imposes the Frightened and Deafened conditions on one target within ra") and wrote an action instead: "Funeral Knell" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Funeral Knell" — the call declared (unanswered) number(s) promised
[reskin] value check: "Funeral Knell" EV 49.5 vs floor 23.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Funeral Knell" ("The swarm rings a single, terrible knell at one creature it can see within range. That creature must make a Wisdom saving throw; on a failure, it is Frightened  [authored: the catalog held no shape for it]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, pounce, isolation, life-drain, charge (+ shelf: resonant-body, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), pounce (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: trait — resonant-body (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: stunning-strike, pounce, life-drain, composed:payoff:condition, charge-push, isolation, charge, resonant-body — the key word does not mean the mechanic here
[reskin] closest refused: trait — "resonant-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers when a creature near the swarm drops to 0 hit points, hitting)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (refused: "Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine re); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("triggers when a creature near the swarm drops to 0 hit points, hitting") and wrote a trait instead: "Final Rite" -> Reactions. *Trigger:* A creature within the swarm's reach drops to 0 Hit Points. *Response—Wisdom Saving Throw:* DC 17, each creatu
[reskin] authored row numbers: "Final Rite" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: trait — "Final Rite" after ""Final Rite" — a trait is not a save — the save form takes stat, target and effe"
[reskin] free signature row: "Final Rite" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Final Rite" ("Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choi [authored: the catalog held no shape for it]")
[reskin] weapons answered: Tolling = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Funeral Knell.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 3 fixed row(s), so the free-row budget is 2 rather than 1 — the card is thin and can afford more
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 2) — "Final Rite" [no template]
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Final Rite carries "ringing over the dying" — "A creature within the swarm's reach drops to 0 Hit Points."
[reskin] audit: [Funeral Knell: The knell is called out as the swar…tened condition until the end of its next turn."), Funeral Knell: A cone must originate from the crea…Throw*: DC 17, each creature in a 30-foot Cone."), Final Rite: The reaction targets 'each creature of…h creature of the swarm's choice within 30 feet")]
[reskin] audit defect: Actions/"Funeral Knell" [model-written] medium weak — The knell is called out as the swarm's signature 'ringing over the dying' action, yet it deals no Necrotic damage and imposes only Frightened — the same condition in the same duration that Final Rite already hands out — so it carries no bell, no death, and no payoff the swarm lacks elsewhere. — Give Funeral Knell a payload its fiction promises: a life-drawing effect on creatures already Frightened, or let it mark targets so Tolling or Final Rite strikes them harder, so the bell itself has teeth. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] audit defect: Actions/"Funeral Knell" [model-written] medium untrackable — A cone must originate from the creature and point in a direction, but the swarm can occupy other creatures' spaces and hover midair, so the GM must track which way the swarm is facing on top of a move-and-attack turn — orientation state the block gives no way to hold. — Change the area to something origin-independent, such as an Emanation or a radius centered on the swarm, so no facing is needed. (about: "*Wisdom Saving Throw*: DC 17, each creature in a 30-foot Cone.")
[reskin] audit defect: Reactions/"Final Rite" [model-written] medium other — The reaction targets 'each creature of the swarm's choice', which reads as any creature including allies and the dying creature itself, so the GM must decide an unimposed targeting intent that the wording leaves open. — Restrict the targeting to creatures the swarm can see, or to enemies, with an explicit exclusion. (about: "each creature of the swarm's choice within 30 feet")
[reskin] clause unresolved: "Final Rite" carries "Whenever a creature within the swarm's reach drops to 0 ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## 02. Swarm of Funeral Bells — CR 13

**Input:** `a swarm of funeral bells that ring themselves over the dying`
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 12s

### Block
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

Multiattack. The swarm makes two Tolling attacks. It can replace one attack with a use of Dirge of the Dying.

Tolling. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Dirge of the Dying. Wisdom Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

Reactions

Cascade of Endings. Trigger: A creature within 5 feet of the swarm drops to 0 Hit Points. Response—Wisdom Saving Throw: DC 17, each creature of the swarm's choice within 30 feet. Failure: The target has the Frightened condition until the end of its next turn. Success: Half.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
!! [ENRICHMENT] Failed to enrich Swarm of Funeral Bells: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] authored row answers the GM: action — "Dirge of the Dying" was written for "ring themselves over the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("imposes the Frightened and Deafened conditions on one target within ra") and wrote an action instead: "Dirge of the Dying" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Dirge of the Dying" — the call declared (unanswered) number(s) promised
[reskin] value check: "Dirge of the Dying" EV 49.5 vs floor 23.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Dirge of the Dying" ("The swarm rings a single, terrible knell at one creature it can see within range. That creature must make a Wisdom saving throw; on a failure, it is Frightened  [authored: the catalog held no shape for it]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, pounce, isolation, life-drain, charge (+ shelf: resonant-body, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), pounce (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: trait — resonant-body (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: stunning-strike, pounce, life-drain, composed:payoff:condition, charge-push, isolation, charge, resonant-body — the key word does not mean the mechanic here
[reskin] closest refused: trait — "resonant-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers on a creature dropping to 0 HP nearby and forces a save on ot)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite" is carried by "Cascade of Endings", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (refused: "Cascade of Endings" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Cascade of Endings" — a trait is not a save — the save form takes stat, target and effect as fields and the e); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite" is carried by "Cascade of Endings", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("triggers on a creature dropping to 0 HP nearby and forces a save on ot") and wrote a trait instead: "Cascade of Endings" -> Reactions. *Trigger:* A creature within 5 feet of the swarm drops to 0 Hit Points. *Response—Wisdom Saving Throw:* DC 17, each crea
[reskin] authored row numbers: "Cascade of Endings" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: trait — "Cascade of Endings" after ""Cascade of Endings" — a trait is not a save — the save form takes stat, target "
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Cascade of Endings" ("Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choi [authored: the catalog held no shape for it]")
[reskin] weapons answered: Tolling = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Dirge of the Dying.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 3 fixed row(s), so the free-row budget is 2 rather than 1 — the card is thin and can afford more
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 2) — "Cascade of Endings" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Cascade of Endings carries "ringing over the dying" — "A creature within 5 feet of the swarm drops to 0 Hit Points"
[reskin] audit: [Cascade of Endings: The reaction's save deals no d…ses only a condition. (about: "*Success:* Half."), Dirge of the Dying: The cone has no stated origin …Throw*: DC 17, each creature in a 30-foot Cone."), Cascade of Endings: The reaction allows the swarm …h creature of the swarm's choice within 30 feet")]
[reskin] audit defect: Reactions/"Cascade of Endings" [model-written] high wording — The reaction's save deals no damage, so a successful save has nothing to halve. — Replace the success line with a no-effect clause (save negates), matching that the failure imposes only a condition. (about: "*Success:* Half.")
[reskin] audit defect: Actions/"Dirge of the Dying" [model-written] medium open_ended — The cone has no stated origin direction, so the GM cannot place the 30-foot cone from the swarm's position. — State the cone emanates from the swarm (e.g., "emanates from the swarm in a direction it chooses"). (about: "*Wisdom Saving Throw*: DC 17, each creature in a 30-foot Cone.")
[reskin] audit defect: Reactions/"Cascade of Endings" [model-written] medium other — The reaction allows the swarm to Frighten any creature within 30 feet regardless of line of sight or cover, with no targeting limit by visibility or distance to the falling creature. — Limit the reaction's targets to creatures that can see or hear the dying creature, or to those within the trigger's radius only. (about: "each creature of the swarm's choice within 30 feet")
[reskin] clause unresolved: "Cascade of Endings" carries "Whenever a creature within the swarm's reach drops to 0 ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## 03. Swarm of Funeral Bells — CR 13

**Input:** `a swarm of funeral bells that ring themselves over the dying`
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
**Signature:** library · **elapsed** 10s

### Block
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

Multiattack. The swarm makes two Tolling attacks. It can replace one attack with a use of Knell of the Last Heartbeat.

Tolling. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Knell of the Last Heartbeat. Wisdom Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Swarm of Funeral Bells: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] authored row answers the GM: action — "Knell of the Last Heartbeat" was written for "ring themselves over the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("imposes the Frightened and Deafened conditions on one target within ra") and wrote an action instead: "Knell of the Last Heartbeat" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Knell of the Last Heartbeat" — the call declared (unanswered) number(s) promised
[reskin] value check: "Knell of the Last Heartbeat" EV 49.5 vs floor 23.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Knell of the Last Heartbeat" ("The swarm rings a single, terrible knell at one creature it can see within range. That creature must make a Wisdom saving throw; on a failure, it is Frightened  [authored: the catalog held no shape for it]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, pounce, isolation, life-drain, charge (+ shelf: resonant-body, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), pounce (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: trait — resonant-body (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: stunning-strike, pounce, life-drain, composed:payoff:condition, charge-push, isolation, charge, resonant-body — the key word does not mean the mechanic here
[reskin] closest refused: trait — "resonant-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers when a creature drops to 0 HP in reach, forcing a save on nea)
[reskin] clause already answered: "a swarm of funeral bells" is carried by "Knell of the Last Heartbeat" — the seat read the sheet and declined to write a second row for it
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (refused: "Knell of the Last Heartbeat" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Knell of the Last Heartbeat" — a trait is not a save — the save form takes stat, target and effect as fields ); asking once more with the reason
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: trait — first: "Knell of the Last Heartbeat" — a trait is not a save — the save form takes stat, target a; second: it belongs in the description; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "resonant-body" nearest and judged its subject FLIPPED against the clause (triggers when a creature drops to 0 HP in reach, forcing a save on nea); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key resonant-body, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "resonant-body" is keyed by the GM's ring+bell and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] — the model found no template that holds it (offered: stunning-strike, pounce, life-drain, composed:payoff:condition, charge-push, isolation, charge, resonant-body)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Tolling = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Knell of the Last Heartbeat.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 3 fixed row(s), so the free-row budget is 2 rather than 1 — the card is thin and can afford more
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Knell of the Last Heartbeat: Each target gets only…tened condition until the end of its next turn.")]
[reskin] audit defect: Actions/"Knell of the Last Heartbeat" [model-written] medium weak — Each target gets only one round of Frightened, so the bell's signature toll leaves no lasting mark and the damage-to-incapacitation fantasy the name promises is a one-turn nuisance. — Extend the condition's reach — a longer duration, or an additional rider that the frightened creature suffers while the fear holds — so the row lands as a threat rather than a speed bump. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] [gap] triggers when a creature drops to 0 HP in reach, forcing a save on nearby creatures — "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." — Swarm of Funeral Bells [seat: trait [rider/on_hit/condition]] (closest offered: resonant-body) [effect: damage] [menu: stunning-strike pounce life-drain composed:payoff:condition charge-push isolation charge resonant-body] [same-cell unoffered: affliction contagion snatch bolt-restrain bolt-mark] [same-seat rejected: affliction:cr-range contagion:requires-row hook-rider:body-verdict snatch:engine-key bolt-restrain:role bolt-drag:host-row bolt-mark:host-row] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## sweep index 31

# Smoke: sweep (2026-11-20T15-33-17)

- 01 Thunderwall Drake — ok, signature: dropped
- 02 Thunderwall Drake — ok, signature: dropped
- 03 Thunderwall Drake — ok, signature: dropped

---

## 01. Thunderwall Drake — CR 7

**Input:** `a young storm drake whose breath is a rolling wall of thunder`
**Donor:** dragon-2 -> CR 7
**Signature:** dropped · **elapsed** 12s

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

Multiattack. The drake makes two Horn attacks. It can replace one attack with a use of Charged Brand-Wake.

Horn. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Charged Brand-Wake. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target has the Stunned condition until the end of its next turn.

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
[reskin] strike written from its attack: "Charged Brand-Wake (Recharge 5-6)" clones "Horn" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] one nova: "Charged Brand-Wake" arrived gated on a sheet whose chassis already carries a Recharge nova — the gate leaves and the row prices at the ceiling (the wyrm's Shattering Ice Snare, step 7)
[reskin] value check: "Charged Brand-Wake" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Charged Brand-Wake" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: energy-aura, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "energy-aura" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a start-of-turn zone use that knocks creatures beneath the flier Prone)
[reskin] seat answered, but: the call said "while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Storm-Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Storm-Wake" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Storm-Wake" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount, area o); asking once more with the reason
[reskin] seat answered, but: the call said "while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Storm-Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Storm-Wake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: trait — first: "Storm-Wake" — the call counts 2 number(s) the row promises and only 1 are written — a pro; second: "Storm-Wake" — a trait is not a save — the save form takes stat, target and effect as fiel; the seat stays empty
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Charged Brand-Wake.
[reskin] save stat from print grammar: Actions/Charged Brand-Wake imposes Stunned by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Charged Brand-Wake: This row reproduces the Horn's…unned condition until the end of its next turn.")]
[reskin] audit defect: Actions/"Charged Brand-Wake" [model-written] medium weak — This row reproduces the Horn's damage exactly and adds only a one-turn Stun, making it a straight upgrade the Multiattack will always convert one Horn into, so Horn is never chosen on its own and the 'brand' delivers no Thunder-flavored payload of its own. — Give Charged Brand-Wake a distinct Thunder-flavored effect (a lingering charge, a Thunder damage rider on the save, or a movement-thwarting state) so it is not a pure damage-identical clone of Horn. (about: "The target has the Stunned condition until the end of its next turn.")
[reskin] [gap] a start-of-turn zone use that knocks creatures beneath the flier Prone — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." — Thunderwall Drake [seat: trait [trait/start_of_turn/condition]] (closest offered: energy-aura) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] record completed: "Charged Brand-Wake" imposes Stunned by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## 02. Thunderwall Drake — CR 7

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

Multiattack. The drake makes two Horn attacks. It can replace one attack with a use of Brand-Wake Discharge.

Horn. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Brand-Wake Discharge. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target has the Stunned condition until the end of its next turn.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
!! [ENRICHMENT] Failed to enrich Thunderwall Drake: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] strike written from its attack: "Brand-Wake Discharge (Recharge 5-6)" clones "Horn" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] one nova: "Brand-Wake Discharge" arrived gated on a sheet whose chassis already carries a Recharge nova — the gate leaves and the row prices at the ceiling (the wyrm's Shattering Ice Snare, step 7)
[reskin] value check: "Brand-Wake Discharge" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Brand-Wake Discharge" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: truth-aura, fear-aura, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, energy-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:poisoned" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: knocks creatures beneath its flight prone as it passes overhead)
[reskin] seat answered, but: the call said "creatures that crowd beneath its flight are knocked prone by the pressure of its passing" is carried by "Brand-Wake Discharge", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Brand-Wake Discharge" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Brand-Wake Discharge" — a trait is not a save — the save form takes stat, target and effect as fields and the); asking once more with the reason
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: trait — first: "Brand-Wake Discharge" — a trait is not a save — the save form takes stat, target and effe; second: it belongs in the description; the seat stays empty
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Brand-Wake Discharge.
[reskin] save stat from print grammar: Actions/Brand-Wake Discharge imposes Stunned by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Brand-Wake Discharge: Brand-Wake Discharge is a ne… 4) Piercing damage plus 7 (2d6) Thunder damage")]
[reskin] audit defect: Actions/"Brand-Wake Discharge" [model-written] medium other — Brand-Wake Discharge is a near-verbatim duplicate of Horn (same attack bonus, same reach, same Piercing and Thunder damage), so the 'replace one attack with a use of Brand-Wake Discharge' rider merely re-delivers the same attack while adding a Stunned save, leaving no distinct ability for the name to describe. — Rework the entry so its name communicates a distinct discharge mechanic (e.g., an area or rider tied to thunder) rather than carbon-copying Horn's damage line. (about: "11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage")
[reskin] [gap] knocks creatures beneath its flight prone as it passes overhead — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." — Thunderwall Drake [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:poisoned) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] record completed: "Brand-Wake Discharge" imposes Stunned by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
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

Traits

Storm-Wake Pressure. Strength Saving Throw: DC 15, any creature that starts its turn in a 10-foot Emanation originating from the drake. Failure: The target has the Prone condition. Success: The target is immune to this drake's Storm-Wake Pressure for 24 hours.

Actions

Multiattack. The drake makes two Horn attacks. It can replace one attack with a use of Brand-Wake Discharge.

Horn. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Brand-Wake Discharge. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target has the Stunned condition until the end of its next turn.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] one nova: "Brand-Wake Discharge" arrived gated on a sheet whose chassis already carries a Recharge nova — the gate leaves and the row prices at the ceiling (the wyrm's Shattering Ice Snare, step 7)
[reskin] value check: "Brand-Wake Discharge" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Brand-Wake Discharge" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: energy-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:poisoned" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: knocks creatures beneath its flight Prone via a save while airborne, n)
[reskin] seat answered, but: the call said "While airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Storm-Wake Pressure", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Storm-Wake Pressure" — a trait is not a save, and this fires on creatures NEAR the creature at the start of their turns — that is an aura, which print writes as a trait (the Ghast's Stench). Answer in "auras" with "name", "stat", "radius" (5, 10, 20 or 30) and "condition" (one of Poisoned/Frightened/Charmed/Prone). The engine writes the sentence, the DC, the ending and the immunity line) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Storm-Wake Pressure" — a trait is not a save, and this fires on creatures NEAR the creature at the start of t); asking once more with the reason
[reskin] seat answered, but: the call said "While airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Storm-Wake Pressure", and no such row is on this sheet — the clause stays open
[reskin] aura written from print's own form: "Storm-Wake Pressure" — a 10-foot Emanation, Prone until the start of the target's next turn, with print's immunity line (the Ghast's Stench)
[reskin] seat landed on the second try: trait — "Storm-Wake Pressure" after ""Storm-Wake Pressure" — a trait is not a save, and this fires on creatures NEAR "
[reskin] free signature row: "Storm-Wake Pressure" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] trait declined — the name is taken: "Storm-Wake Pressure" already names a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one, so the row leaves and the fallback stands in
[reskin] weapons answered: Horn = none; Thunder Wall = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Brand-Wake Discharge.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Storm-Wake Pressure" [no template]
[reskin] save stat from print grammar: Actions/Brand-Wake Discharge imposes Stunned by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Storm-Wake Pressure: The trait forces a save again…"*Failure:* The target has the Prone condition."), Brand-Wake Discharge: This replaces one Horn attac…unned condition until the end of its next turn.")]
[reskin] audit defect: Traits/"Storm-Wake Pressure" [model-written] low weak — The trait forces a save against Prone at the start of every turn a creature spends within the 10-foot emanation, and a creature that fails can simply be re-Prdened the next turn after standing, so there is no lasting exit for a creature that stays near the drake. — Give the failed save a condition that carries its own exit or add a 'can't be affected again' clause beyond the success-only immunity. (about: "*Failure:* The target has the Prone condition.")
[reskin] audit defect: Actions/"Brand-Wake Discharge" [model-written] medium weak — This replaces one Horn attack in Multiattack but deals exactly the same damage as Horn and adds only a one-round Stun, so it is a strictly-better-or-equal copy of Horn rather than a distinct option worth naming. — Give the discharge a payload distinct from Horn — extra damage, a condition with more teeth, or an area element — so choosing it is a real decision. (about: "it is subjected to the following effect. *Constitution Saving Throw*: DC 15. *Failure:* The target has the Stunned condition until the end of its next turn.")
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] record completed: "Brand-Wake Discharge" imposes Stunned by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## sweep index 35

# Smoke: sweep (2026-11-20T15-33-53)

- 01 Well Drowned Worm — ok, signature: library
- 02 Well Drowned Worm — ok, signature: library
- 03 Well Drowned Worm — ok, signature: library

---

## 01. Well Drowned Worm — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 11s

### Block
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

Wellspring Crawl. The drowned worm can climb difficult surfaces, including along ceilings, without needing to make an ability check. It can move through a space as narrow as 1 inch without expending extra movement to do so.

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

### Trace
```
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
[reskin] seat authored nothing: action — the call was asked to write an action for "The drowned worm hauls one creature it has Grappled up to its speed to" and wrote no row of that kind (it belongs in the description)
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
[reskin] free signature row: "Wellspring Crawl" — the trait seat cannot quote the GM, but the call names the element it expresses: "a body of black, brine-heavy coils". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): spider-climb -> Traits/"Wellspring Crawl" ("The worm's body is a sleeve of black brine and wet flesh that flows through any  [verb: climb:idea, climbs:idea, climbing:idea, ceilings:idea, sheer:idea, upside down:idea]")
[reskin] weapons answered: Coil = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Wellspring Crawl" [trait/always/movement]
[reskin] lint: 0 findings
[reskin] element expressed: Wellspring Crawl carries "a body of black, brine-heavy coils" — "It can move through a space as narrow as 1 inch without expending extra movement"
[reskin] audit: [Creeping Dread: The clause is written as a conditi…ability, it also takes 18 (4d8) Psychic damage."), Creeping Dread: The rider triggers on a state ('Fr…ability, it also takes 18 (4d8) Psychic damage."), Coil: The Restrained condition is gratuitous on to…ppled, the target has the Restrained condition."), Wellspring Crawl: A Large worm (coils, 3d8+3 bludg…inch without expending extra movement to do so.")]
[reskin] audit defect: Actions/"Creeping Dread" [catalog] medium wording — The clause is written as a conditional sentence with no conditional conjunction — 'If the target was already Frightened by this ability, it also takes' lacks 'then' and reads as a dangling fragment, which makes the follow-up damage's trigger ambiguous. — Rewrite as a proper conditional with an explicit 'then' clause or a comma-spliced compound, e.g. 'If the target was already Frightened by this ability, it takes an extra 18 (4d8) Psychic damage.' (about: "If the target was already Frightened by this ability, it also takes 18 (4d8) Psychic damage.")
[reskin] audit defect: Actions/"Creeping Dread" [catalog] high untrackable — The rider triggers on a state ('Frightened by this ability') the block cannot track: Frightened is a condition with several sources, and this ability applies no marker distinguishing its own fear from any other Frightened effect, so the table cannot tell whether a previously-frightened target qualifies. — Give this ability its own marker or spell out which frightened condition (e.g. 'Frightened by Creeping Dread') the bonus damage keys off, or drop the 'already Frightened' condition and make the damage unconditional. (about: "If the target was already Frightened by this ability, it also takes 18 (4d8) Psychic damage.")
[reskin] audit defect: Actions/"Coil" [catalog] medium open_ended — The Restrained condition is gratuitous on top of Grappled — Grappled already reduces Speed to 0, and Restrained adds Disadvantage on attacks and DEX saves that the Grapple condition does not — but the entry never states when the Restraint begins or ends independently of the Grapple, so a target that escapes the Grapple still bears Restrained until the GM decides otherwise. — Tie the Restrained rider explicitly to the Grapple's duration with 'while Grappled in this way' and state it ends when the Grapple ends, or remove the redundant Restrained clause. (about: "While Grappled, the target has the Restrained condition.")
[reskin] audit defect: Traits/"Wellspring Crawl" [model-written] low other — A Large worm (coils, 3d8+3 bludgeoning, Grapple) negotiating a 1-inch gap is geometrically implausible without a compression/fluid-body clause, and the trait also claims climbing along ceilings with no adhesive or fluidity fiction to justify it. — Reframe the trait around a brine-slick or boneless-compression body that credibly justifies the 1-inch squeeze and ceiling crawl, rather than bare locomotion numbers. (about: "It can move through a space as narrow as 1 inch without expending extra movement to do so.")
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Creeping Dread) — the sameness metric
[reskin] [gap] drags a grappled creature toward water, and once submerged it is blinded and restrained until it escapes — "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victim across the ground. If the target ends this move in water deep enough to submerge it, it has the Blinded and Restrained conditions until it escapes the grapple." — Well Drowned Worm [seat: action [action/always/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider leap condition-payoff ground-burst spew escalating-dread terror-pulse thrown-burst-seed drain wind-up snare seal lure pacify snare-bolt sensory-strike] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:requires-row zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Well Drowned Worm" — donor brute-5-grappler, CR 5
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

---

## 02. Well Drowned Worm — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 8s

### Block
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

Brine Crawl. The drowned worm can climb difficult surfaces, including along ceilings, without needing to make an ability check. It can move through a space as narrow as 1 inch without expending extra movement to do so.

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

### Trace
```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
!! [ENRICHMENT] Failed to enrich Well Drowned Worm: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "The drowned worm hauls one creature it has Grappled up to its speed to" and wrote no row of that kind (it belongs in the description)
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
[reskin] word match declined by the call: bound, phobia, kill-denial — the key word does not mean the mechanic here
[reskin] free signature row: "Brine Crawl" — the trait seat cannot quote the GM, but the call names the element it expresses: "a body of black, brine-heavy coils". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): spider-climb -> Traits/"Brine Crawl" ("The worm's body flows through any gap or crack and it hangs from ceilings withou [verb: climb:idea, climbs:idea, climbing:idea, ceilings:idea, sheer:idea, upside down:idea]")
[reskin] weapons answered: Coil = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Brine Crawl" [trait/always/movement]
[reskin] lint: 0 findings
[reskin] element expressed: Brine Crawl carries "a body of black, brine-heavy coils" — "can climb difficult surfaces, including along ceilings, without needing to make "
audit finding below confidence gate: Creeping Dread The engine's generic name suggests a fear aura, but the row is a single-target save with a one-turn Frightened and an unreachable bonus clause, making it read as a generic fear bolt that does not suit a drowned well-creature.
[reskin] audit: [Creeping Dread: The bonus damage references a targ…e target was already Frightened by this ability")]
[reskin] audit defect: Actions/"Creeping Dread" [catalog] high dead_reference — The bonus damage references a target 'already Frightened by this ability,' but the ability itself imposes Frightened only on a failure, so a creature can never be Frightened by it at the moment of use and the clause is unreachable without an external source. — Rework the condition so the extra effect fires against any Frightened target or is removed. (about: "If the target was already Frightened by this ability")
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Creeping Dread) — the sameness metric
[reskin] [gap] drags a grappled creature toward water, and once submerged it is blinded and restrained until it escapes — "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victim across the ground. If the target ends this move in water deep enough to submerge it, it has the Blinded and Restrained conditions until it escapes the grapple." — Well Drowned Worm [seat: action [action/always/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider leap condition-payoff ground-burst spew escalating-dread terror-pulse thrown-burst-seed drain wind-up snare seal lure pacify snare-bolt sensory-strike] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:requires-row zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Well Drowned Worm" — donor brute-5-grappler, CR 5
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

---

## 03. Well Drowned Worm — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 12s

### Block
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

Sleeve of Brine. The drowned worm can move through a space as narrow as a few inches wide without squeezing, and it can climb sheer surfaces and hang upside down from ceilings without a check.

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

### Trace
```
!! [ENRICHMENT] Failed to enrich Well Drowned Worm: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] seat answered, but: the call said "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victi" is carried by "Drowned Drag", and no such row is on this sheet — the clause stays open
[reskin] seat authoring refused: action — the authored row re-imposes Restrained, which this sheet's own attack row already applies; that fiction belongs in the attack's rider and the nearest template stands in
[reskin] seat asked again: action — the first answer was refused (the row re-imposes a condition this sheet's own attack already applies); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "The drowned worm hauls one creature it has Grappled up to its speed to" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: action — first: the row re-imposes a condition this sheet's own attack already applies; second: it belongs in the description; the seat stays empty
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
[reskin] word match declined by the call: spider-climb, terrain-walk, bound — the key word does not mean the mechanic here
[reskin] closest refused: trait — "spider-climb" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: lets it flow through narrow gaps and cracks without squeezing)
[reskin] seat answered, but: the call said "The drowned worm's body is a sleeve of black brine and wet flesh that flows through any gap or crack. It can move throug" is carried by "Sleeve of Brine", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("lets it flow through narrow gaps and cracks without squeezing") and wrote a trait instead: "Sleeve of Brine" -> Traits. The drowned worm can move through a space as narrow as a few inches wide without squeezing, and it can climb sheer surfa
[reskin] authored row numbers: "Sleeve of Brine" — the call declared 0 number(s) promised
[reskin] free signature row: "Sleeve of Brine" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Sleeve of Brine" ("The drowned worm's body is a sleeve of black brine and wet flesh that flows through any gap or crack. It can move through a space as narrow as a few inches wide [authored: the catalog held no shape for it]")
[reskin] weapons answered: Coil = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Sleeve of Brine" [no template]
[reskin] lint: 0 findings
audit finding below confidence gate: Creeping Dread The name 'Creeping Dread' promises escalating, creeping fear, but the payload is a flat single-target Frightened and a conditional 4d8; the escalation mechanic lives only in a clause, not in the name.
[reskin] audit: [Creeping Dread: This action can only deal its Psyc…ability, it also takes 18 (4d8) Psychic damage.")]
[reskin] audit defect: Actions/"Creeping Dread" [catalog] high weak — This action can only deal its Psychic payload on a second hit against a target that is already Frightened until the end of the worm's next turn, so in a typical round the action is just a single-target Frightened with no damage. — Make the psychic damage part of the initial failed save (or add a separate damage clause) so the signature action has an immediate payload. (about: "If the target was already Frightened by this ability, it also takes 18 (4d8) Psychic damage.")
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Creeping Dread) — the sameness metric
[reskin] clause unresolved: "Sleeve of Brine" carries "The drowned worm's body is a sleeve of black brine and w", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] drags a grappled creature toward water, and once submerged it is blinded and restrained until it escapes — "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victim across the ground. If the target ends this move in water deep enough to submerge it, it has the Blinded and Restrained conditions until it escapes the grapple." — Well Drowned Worm [seat: action [action/always/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider leap condition-payoff ground-burst spew escalating-dread terror-pulse thrown-burst-seed drain wind-up snare seal lure pacify snare-bolt sensory-strike] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:requires-row zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Well Drowned Worm" — donor brute-5-grappler, CR 5
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## sweep index 39

# Smoke: sweep (2026-11-20T15-34-24)

- 01 Veteran Sellsword — ok, signature: dropped
- 02 Veteran Sellsword — ok, signature: dropped
- 03 Veteran Sellsword — ok, signature: dropped

---

## 01. Veteran Sellsword — CR 5

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
**Signature:** dropped · **elapsed** 18s

### Block
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

Crowded Guard.When the sellsword hits a creature with a Shortsword attack, the target has disadvantage on its next attack roll against the sellsword before the start of its next turn.
Riposte (Reaction).When a creature within 5 feet of the sellsword misses it with a melee attack roll, the sellsword makes one Handaxe attack against that creature.
Parry (Reaction).When the sellsword is hit by a melee attack roll while holding a weapon, the sellsword adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: The sellsword makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage. Immediately after the attack, his handaxe returns to the sellsword's grasp, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Shield Bash: One creature within 5 feet that the sellsword can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

### Trace
```
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
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (refused: "Feigned Rout" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: action — the first answer was refused ("Feigned Rout" — a trait is not a save — the save form takes stat, target and effect as fields and the engine ); asking once more with the reason
[reskin] seat answered, but: the call said "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without pro" is carried by "Feigned Rout", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (refused: "Feigned Rout" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat refused twice: action — first: "Feigned Rout" — a trait is not a save — the save form takes stat, target and effect as fi; second: "Feigned Rout" — the row does nothing on a failed save — say what the target suffers: a co; the seat stays empty
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
[reskin] word match declined by the call: phobia, berserk, blood-frenzy, relic-object — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: imposes Disadvantage on the victim's next attack roll against the crea)
[reskin] seat answered, but: the call said "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attac" is carried by "Crowded Guard", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("imposes Disadvantage on the victim's next attack roll against the crea") and wrote a trait instead: "Crowded Guard" -> Traits. When the sellsword hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against
[reskin] authored row numbers: "Crowded Guard" — the call declared 0 number(s) promised
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
[reskin] audit: [Shortsword: A sword attack's hit/miss text discuss…k, his handaxe returns to the sellsword's grasp"), Multiattack: Shortsword deals less damage (1d6+4) …an replace one attack with a use of Shortsword."), Crowded Guard: This trait is dead payload on this …e on its next attack roll against the sellsword"), Handaxe: The row is the sole attack in Multiattack…inst the target before the end of its next turn")]
[reskin] audit defect: Actions/"Shortsword" [model-written] high wording — A sword attack's hit/miss text discusses the handaxe returning with no throw-and-return mechanic anywhere, and the pronoun 'his' is inconsistent with 'the sellsword' used elsewhere. — Cut the handaxe-return clause from Shortsword; if a returning-weapon fiction is wanted, attach it to the Handaxe row where the throw happens. (about: "Immediately after the attack, his handaxe returns to the sellsword's grasp")
[reskin] audit defect: Actions/"Multiattack" [catalog] high weak — Shortsword deals less damage (1d6+4) than the Handaxe it replaces (2d6+4) and its only rider duplicates the Handaxe's own Advantage rider, so the 'closes with a shortsword' branch is never worth choosing. — Give Shortsword a distinct payoff (the Crowded Guard disadvantage rider, or a condition) so trading an attack for it buys something the Handaxe doesn't already grant. (about: "It can replace one attack with a use of Shortsword.")
[reskin] audit defect: Traits/"Crowded Guard" [model-written] medium weak — This trait is dead payload on this sheet: Shortsword already grants Advantage on the sellsword's next attack, so the 'crowded guard' defensive identity never meaningfully changes what the GM picks, and the name promises a guard stance the text does not create. — Rebuild the trait around an actual guard effect (e.g. a reaction-friendly defensive benefit) rather than a debuff that competes with an identical existing rider. (about: "the target has Disadvantage on its next attack roll against the sellsword")
[reskin] audit defect: Actions/"Handaxe" [model-written] low weak — The row is the sole attack in Multiattack (used three times), yet its Advantage rider only ever matters for a follow-up attack, so the 'hurls a handaxe' fantasy resolves as a triple throw with a dead rider on the last one. — Move the Advantage to trigger off the throw to distinguish ranged use from melee use, so the hurled-handaxe identity actually reads in play. (about: "the sellsword has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Crowded Guard" carries "The sellsword's shortsword work is brutally efficient at", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Riposte" carries "sellsword" which is not a whole clause — the seat surgery cut it; resolved to cl_16u4r8s
[reskin] [gap] lets the sellsword move its Speed without provoking Opportunity Attacks while doubting attackers suffer Disadvantage on  — "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without provoking Opportunity Attacks, and each creature that can see it must succeed on a Wisdom saving throw or have Disadvantage on its next attack roll against the sellsword before the start of its next turn, as the sellsword's feigned panic and sudden reversal sow doubt." — Veteran Sellsword [seat: action [trait/start_of_turn/movement]] (closest offered: aggro-curse) [effect: movement] [menu: truth-aura fear-aura relentless-pursuit bound aggro-curse phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind evasion relic-object guarded-stance undead-fortitude assassinate] [same-cell unoffered: none] [same-seat rejected: energy-aura:deny-type noxious-aura:deny-type warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Veteran Sellsword" — donor skirmisher-8-hurler, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 6 live (live from the seat call onward)
```

---

## 02. Veteran Sellsword — CR 5

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
**Signature:** dropped · **elapsed** 16s

### Block
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

Defensive Stance.When the sellsword hits a creature with a shortsword attack, the target has disadvantage on its next attack roll against the sellsword before the start of its next turn.
Riposte (Reaction).When a creature within 5 feet of the sellsword misses it with a melee attack roll, the sellsword makes one Handaxe attack against that creature.
Parry (Reaction).When the sellsword is hit by a melee attack roll while holding a weapon, the sellsword adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: The sellsword makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage. Immediately after the attack, his handaxe returns to the sellsword's grasp, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Shield Bash: One creature within 5 feet that the sellsword can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

### Trace
```
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
[reskin] seat answered, but: the call said "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without pro" is carried by "Feigned Retreat", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (refused: "Feigned Retreat" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: action — the first answer was refused ("Feigned Retreat" — a trait is not a save — the save form takes stat, target and effect as fields and the engi); asking once more with the reason
[reskin] seat answered, but: the call said "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without pro" is carried by "Feigned Retreat", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (refused: "Feigned Retreat" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat refused twice: action — first: "Feigned Retreat" — a trait is not a save — the save form takes stat, target and effect as; second: "Feigned Retreat" — the row does nothing on a failed save — say what the target suffers: a; the seat stays empty
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
[reskin] word match declined by the call: guarded-stance, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: subtracts the shortsword fighter's presence from the target's attacks )
[reskin] seat answered, but: the call said "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attac" is carried by "Crowded Guard", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("subtracts the shortsword fighter's presence from the target's attacks ") and wrote a trait instead: "Crowded Guard" -> Traits. When the sellsword hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against
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
audit finding below confidence gate: Multiattack A sellsword has only two hands; making three handaxe attacks and a shortsword attack in one turn strains the action economy's physical fiction as written.
audit finding below confidence gate: Shield Bash Prone has its own standing-up exit, but no escape or duration is stated for the knockback state on a creature that might be Shield-Bashed repeatedly, leaving the table to infer the end condition each time.
[reskin] audit: [Shortsword: The Shortsword row carries a handaxe-r…k, his handaxe returns to the sellsword's grasp"), Shortsword: Shortsword duplicates the exact Advant…inst the target before the end of its next turn"), Crowded Guard: The trait's name promises a guardia…the sellsword before the start of its next turn")]
[reskin] audit rename: "Crowded Guard" -> "Defensive Stance"
[reskin] audit defect: Actions/"Shortsword" [model-written] high dead_reference — The Shortsword row carries a handaxe-return mechanic nothing on the sheet establishes (no thrown handaxe is created or tracked), so the clause references a state the block never produces. — Remove the return clause or move it to Handaxe's own row where the throwing actually occurs. (about: "Immediately after the attack, his handaxe returns to the sellsword's grasp")
[reskin] audit defect: Actions/"Shortsword" [model-written] medium wording — Shortsword duplicates the exact Advantage rider already carried by Handaxe, making Crowded Guard and the two attack rows stack the same bonus without distinction. — Trim the Advantage clause from one of the two attacks so each weapon grants a distinct benefit. (about: "the sellsword has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Defensive Stance" carries "The sellsword's shortsword work is brutally efficient at", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Riposte" carries "sellsword" which is not a whole clause — the seat surgery cut it; resolved to cl_16u4r8s
[reskin] [gap] lets the sellsword move its Speed without provoking Opportunity Attacks while doubting attackers suffer Disadvantage on  — "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without provoking Opportunity Attacks, and each creature that can see it must succeed on a Wisdom saving throw or have Disadvantage on its next attack roll against the sellsword before the start of its next turn, as the sellsword's feigned panic and sudden reversal sow doubt." — Veteran Sellsword [seat: action [trait/start_of_turn/movement]] (closest offered: aggro-curse) [effect: movement] [menu: truth-aura fear-aura relentless-pursuit bound aggro-curse phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind evasion relic-object guarded-stance undead-fortitude assassinate] [same-cell unoffered: none] [same-seat rejected: energy-aura:deny-type noxious-aura:deny-type warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Veteran Sellsword" — donor skirmisher-8-hurler, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 6 live (live from the seat call onward)
```

---

## 03. Veteran Sellsword — CR 5

**Input:** `a sellsword who hurls a handaxe and closes with a shortsword`
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
**Signature:** dropped · **elapsed** 18s

### Block
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

Riposte (Reaction).When a creature within 5 feet of the sellsword misses it with a melee attack roll, the sellsword makes one Handaxe attack against that creature.
Parry (Reaction).When the sellsword is hit by a melee attack roll while holding a weapon, the sellsword adds 3 to its AC against that attack, possibly causing it to miss.

Actions
Multiattack: The sellsword makes three Handaxe attacks. It can replace one attack with a use of Shortsword.
Handaxe: Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) slashing damage, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Shortsword: Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage. Immediately after the attack, his handaxe returns to the sellsword's grasp, and the sellsword has advantage on its next attack roll against the target before the end of its next turn.
Shield Bash: One creature within 5 feet that the sellsword can see must make a DC 15 Strength saving throw, taking 9 (2d4 + 4) bludgeoning damage on a failed save. On a failed save, if the target is a Medium or smaller creature, it is knocked prone.
```

### Trace
```
!! [ENRICHMENT] Failed to enrich Veteran Sellsword: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795188332840:663:5)
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
[reskin] seat answered, but: the call said "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without pro" is carried by "Feigned Flight", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (refused: "Feigned Flight" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: action — the first answer was refused ("Feigned Flight" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] seat answered, but: the call said "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without pro" is carried by "Feigned Flight", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (refused: "Feigned Flight" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: action — first: "Feigned Flight" — a trait is not a save — the save form takes stat, target and effect as ; second: "Feigned Flight" — a reaction's save deals no damage here, so say what the target suffers ; the seat stays empty
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
[reskin] word match declined by the call: phobia, berserk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, assassinate, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on a hit, the target's next attack against the creature is made with D)
[reskin] seat answered, but: the call said "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attac" is carried by "Crowding Guard", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The sellsword's shortsword work is brutally efficient at close quarter" and wrote no row of that kind (refused: "Shortsword" — a rider says what the hit does: a condition, a forced movement, or a curse)
[reskin] seat asked again: trait — the first answer was refused ("Shortsword" — a rider says what the hit does: a condition, a forced movement, or a curse); asking once more with the reason
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The sellsword's shortsword work is brutally efficient at close quarter" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: trait — first: "Shortsword" — a rider says what the hit does: a condition, a forced movement, or a curse; second: it belongs in the description; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "guarded-stance" nearest and judged its subject FLIPPED against the clause (on a hit, the target's next attack against the creature is made with D); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against the sellsword before the start of its next turn, as the sellsword's buckler and footwork crowd the target's guard." [trait/always/condition] — the model found no template that holds it (offered: phobia, berserk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, relic-object, guarded-stance, undead-fortitude, assassinate, truth-aura, fear-aura)
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
[reskin] ask vs row ok: "hurls a handaxe" -> "Handaxe" — trigger at_will
[reskin] sheet lint: inline-weapon-collision: header/inline: "the sellsword" is the weapon "longsword" — its own rows will read as the weapon's
[reskin] lint: inline-weapon-collision: header/inline: "the sellsword" is the weapon "longsword" — its own rows will read as the weapon's
audit span not verbatim, dropped: Handaxe The sellsword makes three Handaxe attacks.
[reskin] audit: [Shortsword: The shortsword entry references a thro…k, his handaxe returns to the sellsword's grasp"), Handaxe: Every Handaxe attack in a three-attack Mu…inst the target before the end of its next turn"), Shortsword: The Shortsword duplicates the Handaxe'…inst the target before the end of its next turn"), Multiattack: The Shortsword rider says the handaxe…an replace one attack with a use of Shortsword.")]
[reskin] audit defect: Actions/"Shortsword" [model-written] high dead_reference — The shortsword entry references a thrown handaxe returning, a mechanic no row creates or defines, and pronouns the creature as 'his' while the block never establishes the sellsword threw a handaxe that turn. — Remove the returning-handaxe clause or move it to the Handaxe row where a throw actually occurs. (about: "Immediately after the attack, his handaxe returns to the sellsword's grasp")
[reskin] audit defect: Actions/"Handaxe" [model-written] medium untrackable — Every Handaxe attack in a three-attack Multiattack grants Advantage, so the GM must track a chained Advantage state across up to three attacks and the target's next turn; Advantage already applies to any attack against the same target this turn. — Trim the rider to a single grant or state the Advantage applies only to the first attack each turn. (about: "the sellsword has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] audit defect: Actions/"Shortsword" [model-written] medium other — The Shortsword duplicates the Handaxe's Advantage rider verbatim while the two are alternatives in the same Multiattack, giving the same buff twice through two different rows. — Keep the Advantage rider on one weapon only. (about: "the sellsword has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] audit defect: Actions/"Multiattack" [catalog] medium other (the audit said "adjudicability") — The Shortsword rider says the handaxe returns 'immediately after the attack,' which only makes sense if a handaxe was thrown, but the Multiattack permits swapping the throw for a melee Shortsword with no stated thrown state to return from. — Clarify whether the return rider fires on melee or ranged Shortsword use, or drop it. (about: "It can replace one attack with a use of Shortsword.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "sellsword" which is not a whole clause — the seat surgery cut it; resolved to cl_16u4r8s
[reskin] [gap] lets the sellsword move its Speed without provoking Opportunity Attacks while doubting attackers suffer Disadvantage on  — "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without provoking Opportunity Attacks, and each creature that can see it must succeed on a Wisdom saving throw or have Disadvantage on its next attack roll against the sellsword before the start of its next turn, as the sellsword's feigned panic and sudden reversal sow doubt." — Veteran Sellsword [seat: action [trait/start_of_turn/movement]] (closest offered: aggro-curse) [effect: movement] [menu: truth-aura fear-aura relentless-pursuit bound aggro-curse phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind evasion relic-object guarded-stance undead-fortitude assassinate] [same-cell unoffered: none] [same-seat rejected: energy-aura:deny-type noxious-aura:deny-type warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] [gap] on a hit, the target's next attack against the creature is made with Disadvantage — "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against the sellsword before the start of its next turn, as the sellsword's buckler and footwork crowd the target's guard." — Veteran Sellsword [seat: trait [trait/always/condition]] (closest offered: guarded-stance) [effect: condition] [menu: phobia berserk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind evasion relentless-pursuit bound relic-object guarded-stance undead-fortitude assassinate truth-aura fear-aura] [same-cell unoffered: adhesive faultless-tracker marking-light kill-denial] [same-seat rejected: false-appearance:denied-clause adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement marking-light:body-verdict sealed-body:role mimicry:body-verdict blurred-form:body-verdict death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path class_npc
[reskin] done: "Veteran Sellsword" — donor skirmisher-8-hurler, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 7 live (live from the seat call onward)
```
