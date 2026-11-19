# Blocks — the probe for the reachable boxes

For the owner and Fable, 2026-11-19. Branch `statblock-enhancments-part-2`. Not a milestone.
**PROBE sheets, not the forty.** `baseline-2026-11-18` untouched; `BLOCKS-air-elemental-2026-11-18.md`
is still the forty that matches it, and `BLOCKS-rider-probe-2026-11-19.md` is the *before* for this.

`--live-from seat --rolls 3` on s04, s05, s09, s20, s23, s26, s27, s29, s31, s35, s39 — the same
eleven as last session, so the two lay side by side. Every sheet the probe made is here, the ones
that threw included: **s31 threw on 2 of 3 rolls**, which found two real bugs (one mine, one latent
and older). Those two crashed sheets are in this file as they came out, and the drake's three
re-rolls after the fix follow them.

See `HANDOFF-reachable-boxes-2026-11-19.md` beside this file.


## 01-tollkeeper-of-the-chapel

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

<details><summary>trace</summary>

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 9 prompt(s) had no recorded answer during this entry: fit x6, audit x3
[harness] 5 call(s) from the tape, 0 live (live from the seat call onward)
```

</details>

## 02-tollkeeper-of-the-chapel

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

<details><summary>trace</summary>

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
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
!! [ENRICHMENT] Failed to enrich Tollkeeper of the Chapel: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 9 prompt(s) had no recorded answer during this entry: fit x6, audit x3
[harness] 5 call(s) from the tape, 0 live (live from the seat call onward)
```

</details>

## 03-tollkeeper-of-the-chapel

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

<details><summary>trace</summary>

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

</details>

## 04-air-elemental

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

<details><summary>trace</summary>

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
[reskin] seat answered, but: the call said "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and " is carried by "Howling Engulfment", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's howling wind-body engulfs its prey. A creature Frighte" and wrote no row of that kind (refused: "Howling Engulfment" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Howling Engulfment" — a trait is not a save — the save form takes stat, target and effect as fields and the e); asking once more with the reason
[reskin] seat answered, but: the call said "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and " is carried by "Howling Engulfment", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's howling wind-body engulfs its prey. A creature Frighte" and wrote no row of that kind (refused: "Howling Engulfment" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Howling Engulfment" — a trait is not a save — the save form takes stat, target and effect; second: "Howling Engulfment" — a reaction's save deals no damage here, so say what the target suff; the seat stays empty
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
[reskin] audit: [Stolen Voices: The damage rider can essentially ne… ability, it also takes 9 (2d8) Thunder damage."), Stolen Voices: The name promises stolen voices, bu…about: "The target has the Frightened condition"), Whirlwind (Recharge 4-6): Stray doubled space afte…bout: "*Failure:*  24 (4d10 + 2) Thunder damage")]
[reskin] audit rename blocked — "Stolen Voices" -> "Stolen Breath" would drop the GM's own word "voices"
[reskin] audit defect: Actions/"Stolen Voices" [model-written] medium weak — The damage rider can essentially never fire, since the only source of Frightened here ends at the end of the elemental's next turn and the attack can't be re-applied while the target is still frightened past the moment it ends, so the row's promised thunder bite is dead in practice. — Make the Frightened condition persist long enough to be restruck (e.g. until the end of the target's next turn), or make the rider trigger on the first application too. (about: "If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.")
[reskin] audit defect: Actions/"Whirlwind" [print] high wording — Stray doubled space after the Failure label breaks the statblock formatting of the entry. — Collapse to a single space so the label and damage value render cleanly. (about: "*Failure:*  24 (4d10 + 2) Thunder damage")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on a failed Strength save, drags a Frightened engulfed creature along with the elemental's movement — "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed on a Strength saving throw; on a failure it is dragged along in the elemental's wake, moving with it when the elemental moves, and it remains engulfed until it is no longer Frightened or the elemental lets it go." — Air Elemental [seat: trait [trait/always/movement]] (closest offered: mimicry) [effect: movement] [menu: relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind undead-fortitude mimicry truth-aura fear-aura] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role assassinate:role blurred-form:role death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Air Elemental" — donor brute-5, CR 5
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Air Elemental: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] seat authored the row: trait — the call refused every template for no_fit ("on a failed Strength save, drags a Frightened engulfed creature along ") and wrote a trait instead: "Engulfing Wake" -> Reactions. *Trigger:* A creature Frightened by the air elemental takes the Disengage action while inside its reach. *Response—Stren
[reskin] authored row numbers: "Engulfing Wake" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: trait — "Engulfing Wake" after ""Engulfing Wake" — a trait is not a save — the save form takes stat, target and "
[reskin] free signature row: "Engulfing Wake" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Engulfing Wake" is HANDED "carries stolen voices" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Engulfing Wake" ("The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed  [authored: the catalog held no shape for it]")
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
[reskin] free row over budget: Reactions/"Engulfing Wake" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Stolen Voices" [action/save/condition]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Stolen Voices: The secondary damage is the only pa… ability, it also takes 9 (2d8) Thunder damage."), Stolen Voices: Frightened imposed from up to 60 fe…until the end of the air elemental's next turn.")]
[reskin] audit defect: Actions/"Stolen Voices" [model-written] medium weak — The secondary damage is the only payload and it is gated behind the target already being Frightened by this same ability, so the opening use of the row is a Frightened condition with a single-turn duration and no further effect — Frightened on its own buys almost nothing before it expires. — Give the opening use a small direct payload so the row is worth an attack slot even when the target is not already Frightened, keeping the conditional rider as the escalation. (about: "If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.")
[reskin] audit defect: Actions/"Stolen Voices" [model-written] low undelivered — Frightened imposed from up to 60 feet with no position or movement interplay is largely inert on targets already in melee with this creature and expires in one round, so the name's promised theft of a victim's voice delivers no actual voice-stealing effect. — Have the condition or rider actually hinge on the creature using the target's voice (e.g. a readable or suppressing effect on speech), so the fiction of carried voices is mechanically real. (about: "The target has the Frightened condition until the end of the air elemental's next turn.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Air Elemental" — donor brute-5, CR 5
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 06-air-elemental

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Air Elemental: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] seat answered, but: the call said "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and " is carried by "Howling Engulf (trait)", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's howling wind-body engulfs its prey. A creature Frighte" and wrote no row of that kind (refused: "Howling Engulf" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Howling Engulf" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] seat answered, but: the call said "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and " is carried by "Howling Engulf", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's howling wind-body engulfs its prey. A creature Frighte" and wrote no row of that kind (refused: "Howling Engulf" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Howling Engulf" — a trait is not a save — the save form takes stat, target and effect as ; second: "Howling Engulf" — a reaction's save deals no damage here, so say what the target suffers ; the seat stays empty
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
[reskin] audit: [Stolen Voices: The damage clause can never fire: F… ability, it also takes 9 (2d8) Thunder damage."), Stolen Voices: As written the row is Frightened-on…. (about: "it also takes 9 (2d8) Thunder damage")]
[reskin] audit defect: Actions/"Stolen Voices" [model-written] high dead_reference — The damage clause can never fire: Frightened ends at the end of the elemental's next turn, so on the elemental's own turn the target can never already be Frightened by this ability when it is used again. — Restate the payload so it resolves within a single use (e.g. a rider to the save itself) rather than keying off a state that expires before the ability can recur. (about: "The target has the Frightened condition until the end of the air elemental's next turn. If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.")
[reskin] audit defect: Actions/"Stolen Voices" [model-written] high weak — As written the row is Frightened-only with no live damage clause, a nuisance rider that never delivers the 'stolen voice' threat the name promises. — Give the effect teeth that fire on every use — a damage or debuff payload carried by the voice-theft fiction. (about: "it also takes 9 (2d8) Thunder damage")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on a failed Strength save, drags a Frightened engulfed creature along with the elemental's movement — "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed on a Strength saving throw; on a failure it is dragged along in the elemental's wake, moving with it when the elemental moves, and it remains engulfed until it is no longer Frightened or the elemental lets it go." — Air Elemental [seat: trait [trait/always/movement]] (closest offered: mimicry) [effect: movement] [menu: relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind undead-fortitude mimicry truth-aura fear-aura] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role assassinate:role blurred-form:role death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Air Elemental" — donor brute-5, CR 5
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 07-stone-golem

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
[reskin] seat answered, but: the call said "whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible" is carried by "Tears of Dust", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Tears of Dust" — the response writes a saving throw as prose — put it in the "save" object (stat, target, damage, condition, success) and the engine renders it after "Response", as print does)
[reskin] seat asked again: trait — the first answer was refused ("Tears of Dust" — the response writes a saving throw as prose — put it in the "save" object (stat, target, dam); asking once more with the reason
[reskin] seat answered, but: the call said "whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible" is carried by "Tears of Dust", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Tears of Dust" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Tears of Dust" — the response writes a saving throw as prose — put it in the "save" objec; second: "Tears of Dust" — a reaction's save deals no damage here, so say what the target suffers a; the seat stays empty
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
[reskin] audit: [Keening Glare: The success line grants immunity to… immune to this creature's terror for 24 hours."), Keening Glare: The name promises a sight-based kee… text actually applies. (about: "Keening Glare.")]
[reskin] audit rename held — "Keening Glare" was written for the GM's own clause (cl_2cd3hd), so "Wail of the Weeping Saint" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Keening Glare" [model-written] high dead_reference — The success line grants immunity to a named effect ('this creature's terror') that no entry defines or carries, so a GM cannot tell what the immunity actually covers. — Point the immunity at a named, on-sheet effect such as Keening Glare by name, or drop the immunity clause if only the Frightened save matters. (about: "Success: The target is immune to this creature's terror for 24 hours.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on being hit or harmed, forces the attacker to make a Wisdom save or its attack misses/effect fails, with a day-long imm — "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible dust like tears, and that creature must succeed on a Wisdom saving throw or have the attack miss or the effect fail as remorse breaks its concentration. A creature that succeeds on this save is immune to the effect for a day." — Stone Golem [seat: trait [trait/on_being_hit/defense]] (closest offered: resonant-body) [effect: condition] [menu: resonant-body weapon-lodge] [same-cell unoffered: absorption interpose] [same-seat rejected: heated-body:body-verdict absorption:body-verdict bloodied-burst:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Stone Golem" — donor brute-9, CR 10
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 08-stone-golem

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
!! [ENRICHMENT] Failed to enrich Stone Golem: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Weeping Stone" — the response writes a saving throw as prose — put it in the "save" object (stat, target, damage, condition, success) and the engine renders it after "Response", as print does)
[reskin] seat asked again: trait — the first answer was refused ("Weeping Stone" — the response writes a saving throw as prose — put it in the "save" object (stat, target, dam); asking once more with the reason
[reskin] seat answered, but: the call said "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll agains" is carried by "Weeping Stone", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Weeping Stone" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Weeping Stone" — the response writes a saving throw as prose — put it in the "save" objec; second: "Weeping Stone" — a reaction's save deals no damage here, so say what the target suffers a; the seat stays empty
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
[reskin] audit: [Keening Glare: The name promises an audible keen (…und is the sole medium. (about: "Keening Glare."), Keening Glare: The success clause references immun… immune to this creature's terror for 24 hours."), Keening Glare: The terror row delivers only a one-…inating from the golem that can see or hear it.")]
[reskin] audit rename held — "Keening Glare" was written for the GM's own clause (cl_2cd3hd), so "Weeping Wail" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Keening Glare" [model-written] high dead_reference — The success clause references immunity to 'this creature's terror', a named state that exists nowhere on the sheet, so the GM cannot tell what is or is not being warded against. — Make the success clause reference the entry itself (or the condition it imposes) rather than an undefined 'terror'. (about: "*Failure:* The target has the Frightened condition until the end of its next turn. *Success:* The target is immune to this creature's terror for 24 hours.")
[reskin] audit defect: Actions/"Keening Glare" [model-written] medium weak — The terror row delivers only a one-round Frightened with no damage or lasting effect, so it does not carry the weeping-saint menace the ask wanted and is a nuisance rather than a threat. — Give the failed save a payload that persists beyond a single round or that the fiction (weeping, keening) implies, such as a lingering effect or damage. (about: "*Wisdom Saving Throw:* DC 17, each creature of the golem's choice in a 30-foot Emanation originating from the golem that can see or hear it.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on being hit or harmed, forces the attacker to make a Wisdom save or its attack misses/effect fails, with a day-long imm — "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible dust like tears, and that creature must succeed on a Wisdom saving throw or have the attack miss or the effect fail as remorse breaks its concentration. A creature that succeeds on this save is immune to the effect for a day." — Stone Golem [seat: trait [trait/on_being_hit/defense]] (closest offered: resonant-body) [effect: condition] [menu: resonant-body weapon-lodge] [same-cell unoffered: absorption interpose] [same-seat rejected: heated-body:body-verdict absorption:body-verdict bloodied-burst:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Stone Golem" — donor brute-9, CR 10
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
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
!! [ENRICHMENT] Failed to enrich Stone Golem: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] seat answered, but: the call said "whenever a creature within a short range makes an attack roll against it or otherwise harms it" is carried by "Tears of Stone", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Tears of Stone" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount, area or bonus with no number cannot be run)
[reskin] seat asked again: trait — the first answer was refused ("Tears of Stone" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount, ar); asking once more with the reason
[reskin] seat answered, but: the call said "whenever a creature within a short range makes an attack roll against it or otherwise harms it" is carried by "Tears of Stone", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Tears of Stone" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Tears of Stone" — the call counts 2 number(s) the row promises and only 1 are written — a; second: "Tears of Stone" — a reaction's save deals no damage here, so say what the target suffers ; the seat stays empty
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
[reskin] audit: [Keening Glare: A 'Glare' is a visual sense effect,…inating from the golem that can see or hear it."), Keening Glare: Frightened imposed without an escap…tened condition until the end of its next turn.")]
[reskin] audit rename held — "Keening Glare" was written for the GM's own clause (cl_2cd3hd), so "Keening Wail" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Keening Glare" [model-written] medium untrackable — Frightened imposed without an escape clause would normally be a defect, but the fixed end-of-next-turn duration is a stated interior escape, so this is not the finding; the real gap is that the golem has no way to re-apply the effect to a creature that succeeded, because 'immune to this creature's terror' is defined neither as a condition nor as a timer the GM can adjudicate on later turns. — State the immunity explicitly as a named state (e.g. 'immune to Keening Glare') so the GM can track when it expires. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on being hit or harmed, forces the attacker to make a Wisdom save or its attack misses/effect fails, with a day-long imm — "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible dust like tears, and that creature must succeed on a Wisdom saving throw or have the attack miss or the effect fail as remorse breaks its concentration. A creature that succeeds on this save is immune to the effect for a day." — Stone Golem [seat: trait [trait/on_being_hit/defense]] (closest offered: resonant-body) [effect: condition] [menu: resonant-body weapon-lodge] [same-cell unoffered: absorption interpose] [same-seat rejected: heated-body:body-verdict absorption:body-verdict bloodied-burst:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Stone Golem" — donor brute-9, CR 10
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 10-trenchsong-leviathan

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

Multiattack. The leviathan makes two Flukes attacks. It can replace one attack with a use of Brineplate Cadence.

Flukes. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Brineplate Cadence. Constitution Saving Throw: DC 24, each creature in a 20-foot Emanation originating from the leviathan. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Reactions

Brinebell Resonance. Trigger: The leviathan takes Thunder damage. Response—Wisdom Saving Throw: DC 24, each creature within 15 feet of the leviathan. Failure: The target has the Frightened condition until the end of its next turn.

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
[reskin] authored row answers the GM: action — "Brineplate Cadence" was written for "a leviathan of the trench whose song drowns fleets", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a Constitution-save area burst of Thunder damage with the Deafened con") and wrote an action instead: "Brineplate Cadence" -> Actions. *Constitution Saving Throw*: DC 24, each creature in a 20-foot Emanation originating from the leviathan. *Failure:* 52 (
[reskin] authored row numbers: "Brineplate Cadence" — the call declared (unanswered) number(s) promised
[reskin] value check: "Brineplate Cadence" EV 100.7 vs floor 19.8 (one attack of 2) — dice 52 → 38 (scaled down to the ceiling); a nova already stands — kept ungated, dice to 38 at the ceiling
[reskin] signature authored: no template — the seat wrote it -> Actions/"Brineplate Cadence" ("The leviathan's body is crusted in brine-heavy plates that split the air as it breaches. When it makes a Flukes attack, it can release that pressure in a boomin [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike echoes from its body in a painful chord—each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its next turn." [trait/on_being_hit/condition] [family: body-reaction] — menu: bloodied-burst, weapon-lodge (+ shelf: phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] lead by this seat's own clause: trait — "burst" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — burst: bloodied-burst
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: bloodied-burst (on_being_hit/damage), composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:deafened, bloodied-burst — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:condition:t0:deaf" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an area Constitution save that Deafens nearby creatures and has a chan)
[reskin] seat answered, but: the call said "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it re" is carried by "Brinebell Resonance", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The leviathan's hide is ridged with brine channels that ring like a st" and wrote no row of that kind (refused: "Brinebell Resonance" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Brinebell Resonance" — a trait is not a save — the save form takes stat, target and effect as fields and the ); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it re" is carried by "Brinebell Resonance", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("an area Constitution save that Deafens nearby creatures and has a chan") and wrote a trait instead: "Brinebell Resonance" -> Reactions. *Trigger:* The leviathan takes Thunder damage. *Response—Constitution Saving Throw:* DC 24, each creature within 15 feet
[reskin] authored row numbers: "Brinebell Resonance" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: trait — "Brinebell Resonance" after ""Brinebell Resonance" — a trait is not a save — the save form takes stat, target"
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Brinebell Resonance" ("The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a ro [authored: the catalog held no shape for it]")
[reskin] weapons answered: Flukes = none; Drowning Hymn = none; Abyssal Refrain = none; Circle and Strike = none; Breach Slam = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Flukes" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] area swap gated: "Brineplate Cadence (Recharge 5-6)" deals 38 to an area in place of a 36 attack — print offers no at-will area swap that out-damages the attack it replaces (0 of its 24), so it takes print's Recharge
[reskin] multiattack replacement clause: It can replace one attack with a use of Brineplate Cadence (Recharge 5-6).
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Brinebell Resonance" [no template]
[reskin] one nova at ship: "Brineplate Cadence (Recharge 5-6)" un-gated to "Brineplate Cadence" — "Drowning Hymn" already carries this sheet's Recharge nova (un-gated by the one-nova rule — dice to 38, at or under the Multiattack sum (49); the action economy is the limit)
[reskin] area swap priced at half a hit: "Brineplate Cadence" is offered in an attack's place AT WILL and dealt 38 against a whole hit of 36; the ceiling is half a hit (18) with a save for half — print offers 15 area rows in an attack's place and none deals damage (owner's R1)
[reskin] save re-derived after a retype: Reactions/Brinebell Resonance — a Constitution save for a condition the row IMPOSES, which calls for Wisdom or Charisma (A2: a condition the row merely requires does not pick the stat)
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Brinebell Resonance" claims "a song that drowns fleets" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Brinebell Resonance")
audit finding below confidence gate: Breach Slam A legendary action whose entire payload is Prone costs a use of Legendary Resistance-tier economy and delivers no damage, no control beyond standing up, and no reason to pick it over Circle and Strike's Flukes damage.
[reskin] audit: [Brinebell Resonance: The leviathan's own Flukes, D…: "Trigger: The leviathan takes Thunder damage."), Brineplate Cadence: The name promises plate armor …if the armor image is kept. (about: "Brineplate")]
[reskin] audit rename held — "Brineplate Cadence" was written for the GM's own clause (cl_1h1f3n8: "a leviathan of the trench whose song drowns fleets"), so "Brine Shockwave" does not land; the finding stands as logged
[reskin] audit defect: Reactions/"Brinebell Resonance" [model-written] medium undelivered — The leviathan's own Flukes, Drowning Hymn, and Brineplate Cadence all deal Thunder damage, so a GM running this lashing leviathan in mixed company will rarely see the trigger fire from an enemy, and the row's fiction of a resonant, fleet-drowning song is not delivered by a mere 15-foot Frightened pulse. — Retrigger on any damage the leviathan takes (or on being hit), keeping the same area and effect, so the bell actually rings when struck. (about: "Trigger: The leviathan takes Thunder damage.")
[reskin] clause unresolved: "Brinebell Resonance" carries "The leviathan's hide is ridged with brine channels that ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] multiattack citation synced: "Multiattack" cites each row as the row is named — a gated row reads "if available" as print writes it, an ungated row reads bare
[reskin] done: "Trenchsong Leviathan" — donor brute-21, CR 24
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 11-trenchsong-leviathan

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

Multiattack. The leviathan makes two Flukes attacks. It can replace one attack with a use of Brineplate Resonance.

Flukes. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Brineplate Resonance. Constitution Saving Throw: DC 24, each creature in a 15-foot Emanation originating from the leviathan. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Reactions

Painful Chord. Trigger: The leviathan takes Thunder damage, and it rolls 5-6 to recharge Drowning Hymn. Response—Wisdom Saving Throw: DC 24, each creature within 30 feet of the leviathan. Failure: The target has the Frightened condition until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Trenchsong Leviathan: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "The leviathan's body is crusted in brine-heavy plates that split the a" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] authored row answers the GM: action — "Brineplate Resonance (Recharge 5-6)" was written for "a leviathan of the trench whose song drowns fleets", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a Constitution-save area burst of Thunder damage with the Deafened con") and wrote an action instead: "Brineplate Resonance (Recharge 5-6)" -> Actions. *Constitution Saving Throw*: DC 24, each creature in a 15-foot Emanation originating from the leviathan. *Failure:* 52 (
[reskin] authored row numbers: "Brineplate Resonance (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Brineplate Resonance (Recharge 5-6)" after "you wrote no row of the kind asked for (an action)"
[reskin] one nova: "Brineplate Resonance" arrived gated on a sheet whose chassis already carries a Recharge nova — the gate leaves and the row prices at the ceiling (the wyrm's Shattering Ice Snare, step 7)
[reskin] value check: "Brineplate Resonance" EV 100.7 vs floor 19.8 (one attack of 2) — dice 52 → 38 (scaled down to the ceiling); a nova already stands — kept ungated, dice to 38 at the ceiling
[reskin] signature authored: no template — the seat wrote it -> Actions/"Brineplate Resonance" ("The leviathan's body is crusted in brine-heavy plates that split the air as it breaches. When it makes a Flukes attack, it can release that pressure in a boomin [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike echoes from its body in a painful chord—each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its next turn." [trait/on_being_hit/condition] [family: body-reaction] — menu: bloodied-burst, weapon-lodge (+ shelf: phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] lead by this seat's own clause: trait — "burst" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — burst: bloodied-burst
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: bloodied-burst (on_being_hit/damage), composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: weapon-lodge, composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t2:poisoned — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:condition:t0:deaf" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers only on a specific damage type (Thunder) and includes a recha)
[reskin] seat answered, but: the call said "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it re" is carried by "Bellchime Hide", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The leviathan's hide is ridged with brine channels that ring like a st" and wrote no row of that kind (refused: "Bellchime Hide" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Bellchime Hide" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike ec" is carried by "Painful Chord", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("triggers only on a specific damage type (Thunder) and includes a recha") and wrote a trait instead: "Painful Chord" -> Reactions. *Trigger:* The leviathan takes Thunder damage, and it rolls 5-6 to recharge Drowning Hymn. *Response—Constitution Saving
[reskin] authored row numbers: "Painful Chord" — the call declared 1 number(s) promised
[reskin] seat landed on the second try: trait — "Painful Chord" after ""Bellchime Hide" — a trait is not a save — the save form takes stat, target and "
[reskin] free signature row: "Painful Chord" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Painful Chord" ("The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a ro [authored: the catalog held no shape for it]")
[reskin] weapons answered: Flukes = none; Drowning Hymn = none; Abyssal Refrain = none; Circle and Strike = none; Breach Slam = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Flukes" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] area swap gated: "Brineplate Resonance (Recharge 5-6)" deals 38 to an area in place of a 36 attack — print offers no at-will area swap that out-damages the attack it replaces (0 of its 24), so it takes print's Recharge
[reskin] multiattack replacement clause: It can replace one attack with a use of Brineplate Resonance (Recharge 5-6).
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Painful Chord" [no template]
[reskin] one nova at ship: "Brineplate Resonance (Recharge 5-6)" un-gated to "Brineplate Resonance" — "Drowning Hymn" already carries this sheet's Recharge nova (un-gated by the one-nova rule — dice to 38, at or under the Multiattack sum (49); the action economy is the limit)
[reskin] area swap priced at half a hit: "Brineplate Resonance" is offered in an attack's place AT WILL and dealt 38 against a whole hit of 36; the ceiling is half a hit (18) with a save for half — print offers 15 area rows in an attack's place and none deals damage (owner's R1)
[reskin] save re-derived after a retype: Reactions/Painful Chord — a Constitution save for a condition the row IMPOSES, which calls for Wisdom or Charisma (A2: a condition the row merely requires does not pick the stat)
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
audit finding below confidence gate: Breach Slam A legendary action that costs a use and offers a save only to knock targets Prone has no payload beyond a state the targets can shed with movement, so it is not worth one of the leviathan's three legendary uses.
audit span not verbatim, dropped: Brineplate Resonance It can replace one attack with a use of Brineplate Resonance (Recharge 5-6).
[reskin] audit: [Painful Chord: The reaction's trigger depends on t…(about: "it rolls 5-6 to recharge Drowning Hymn"), Brineplate Resonance: The name promises a brine/pl…w*: DC 24, each creature in a 15-foot Emanation")]
[reskin] audit rename held — "Brineplate Resonance" was written for the GM's own clause (cl_1h1f3n8: "a leviathan of the trench whose song drowns fleets"), so "Shellburst Toll" does not land; the finding stands as logged
[reskin] audit defect: Reactions/"Painful Chord" [model-written] high untrackable — The reaction's trigger depends on the leviathan rolling a result on a recharge die it normally rolls at the start of its own turn, which the block never states it rolls as part of taking Thunder damage, so the GM cannot determine when the trigger is met. — State the trigger as an event the table can observe — e.g. that the leviathan has recharged or regained Drowning Hymn — or drop the recharge clause and trigger on taking Thunder damage alone. (about: "it rolls 5-6 to recharge Drowning Hymn")
[reskin] clause unresolved: "Painful Chord" carries "The leviathan's hide is ridged with brine channels that ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] multiattack citation synced: "Multiattack" cites each row as the row is named — a gated row reads "if available" as print writes it, an ungated row reads bare
[reskin] done: "Trenchsong Leviathan" — donor brute-21, CR 24
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 6 live (live from the seat call onward)
```

</details>

## 12-trenchsong-leviathan

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

Multiattack. The leviathan makes two attacks, using Flukes or Brineplate Detonation in any combination.

Flukes. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Brineplate Detonation. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 24. Failure: The target has the Deafened condition until the end of its next turn.

Bonus Actions

Binding Mark. Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: Until the start of the leviathan's next turn, the target has Disadvantage on attack rolls against creatures other than the leviathan.

Reactions

Struck-Bell Brine. Trigger: The leviathan takes Thunder damage. Response—Wisdom Saving Throw: DC 24, each creature within 20 feet of the leviathan. Failure: The target has the Frightened condition until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Trenchsong Leviathan: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] strike written from its attack: "Brineplate Detonation" clones "Flukes" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] value check: "Brineplate Detonation" EV 5.2 vs floor 19.8 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Brineplate Detonation" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: escalating-dread, terror-pulse, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback skipped: push-prone (the sheet cannot render it)
[reskin] value check: "Binding Mark" EV 11.4 vs floor 0 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike echoes from its body in a painful chord—each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its next turn." [trait/on_being_hit/condition] [family: body-reaction] — menu: bloodied-burst, weapon-lodge (+ shelf: phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] lead by this seat's own clause: trait — "burst" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — burst: bloodied-burst
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: bloodied-burst (on_being_hit/damage), composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:deafened, composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t2:poisoned — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:condition:t1:deaf" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers on taking Thunder damage and makes nearby creatures save or b)
[reskin] seat answered, but: the call said "Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and each creature within a sho" is carried by "Struck-Bell Brine", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The leviathan's hide is ridged with brine channels that ring like a st" and wrote no row of that kind (refused: "Struck-Bell Brine" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Struck-Bell Brine" — a trait is not a save — the save form takes stat, target and effect as fields and the en); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and each creature within a sho" is carried by "Struck-Bell Brine", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("triggers on taking Thunder damage and makes nearby creatures save or b") and wrote a trait instead: "Struck-Bell Brine" -> Reactions. *Trigger:* The leviathan takes Thunder damage. *Response—Constitution Saving Throw:* DC 24, each creature within 20 feet
[reskin] authored row numbers: "Struck-Bell Brine" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: trait — "Struck-Bell Brine" after ""Struck-Bell Brine" — a trait is not a save — the save form takes stat, target a"
[reskin] free signature row: "Struck-Bell Brine" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Struck-Bell Brine" ("The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a ro [authored: the catalog held no shape for it]")
[reskin] weapons answered: Flukes = none; Drowning Hymn = none; Abyssal Refrain = none; Circle and Strike = none; Breach Slam = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Flukes" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] reach follows the body: Actions/"Brineplate Detonation" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Struck-Bell Brine" [no template]
[reskin] save stat from print grammar: Actions/Brineplate Detonation imposes Deafened by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] save re-derived after a retype: Reactions/Struck-Bell Brine — a Constitution save for a condition the row IMPOSES, which calls for Wisdom or Charisma (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Struck-Bell Brine carries "a song that drowns fleets" — "each creature within 20 feet of the leviathan"
audit finding below confidence gate: Binding Mark The row is a generic engine mark whose name and effect have nothing to do with a trench leviathan's song or drowning fleets, so it reads as an out-of-place utility debuff the GM cannot tie to the creature's fiction.
audit finding below confidence gate: Drowning Hymn A hymn that drowns fleets leaves its targets only briefly Deafened, a nuisance with no drowning, suffocation, or lethal payload beyond raw thunder.
[reskin] audit: [Brineplate Detonation: The name promises a detonat…m that deafens. (about: "Brineplate Detonation.")]
[reskin] audit rename held — "Brineplate Detonation" was written for the GM's own clause (cl_1h1f3n8), so "Deafening Brine Slam" does not land; the finding stands as logged
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Binding Mark) — the sameness metric
[reskin] clause unresolved: "Struck-Bell Brine" carries "The leviathan's hide is ridged with brine channels that ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] record completed: "Brineplate Detonation" imposes Deafened by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] multiattack re-read — "Brineplate Detonation" joins the combination; "The leviathan makes two attacks, using Flukes or Brineplate Detonation in any combination."
[reskin] done: "Trenchsong Leviathan" — donor brute-21, CR 24
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 13-vashka-the-red

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

Shield Wall. While an ally with a shield is within 5 feet of Vashka, neither Vashka nor that ally can be forced to move from its space against its will.

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
[reskin] word match declined by the call: pack-tactics, bloodied-fury, evasion, undead-fortitude — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: adjacent shieldmate cannot be forced out of its space while the other )
[reskin] seat answered, but: the call said "So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share " is carried by "Shield Wall", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("adjacent shieldmate cannot be forced out of its space while the other ") and wrote a trait instead: "Shield Wall" -> Traits. While an ally with a shield is adjacent to Vashka, neither Vashka nor that ally can be forced to move from its space aga
[reskin] authored row numbers: "Shield Wall" — the call declared 0 number(s) promised
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
[reskin] lint fixed: vocab-adjacent — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Shield Wall carries "holding a shield wall without breaking ranks" — "neither Vashka nor that ally can be forced to move from its space against its wi"
[reskin] audit: [Shield Wall: The immunity requires the GM to track…forced to move from its space against its will."), Shield Wall: The trait is written for the GM asked… forced to move from its space against its will")]
[reskin] audit defect: Traits/"Shield Wall" [model-written] medium untrackable — The immunity requires the GM to track whether any adjacent ally carries a shield at the moment forced movement is imposed, a state the block never establishes or marks, and it grants nothing to Vashka alone. — State a condition checkable from the creature's own statblock (e.g., keyed to Vashka's own shield) rather than on another creature's equipment. (about: "While an ally with a shield is within 5 feet of Vashka, neither Vashka nor that ally can be forced to move from its space against its will.")
[reskin] audit defect: Traits/"Shield Wall" [model-written] low undelivered — The trait is written for the GM asked-for 'holds a shield wall without breaking ranks,' but nothing in the block gives Vashka a shield, and the effect protects against forced movement only, not the positioning a shield wall implies. — Tie the trait explicitly to Vashka's own shield and to adjacent allies so the fiction of a maintained line is expressed. (about: "neither Vashka nor that ally can be forced to move from its space against its will")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_zvh3r1
[reskin] [gap] grants each nearby ally a Reaction move into position and a bonus to AC until the warlord's next turn — "Vashka barks a command over his shield rim, and any ally within earshot who can see or hear him may immediately use its Reaction to form up on his line: each such ally moves to stand shoulder to shoulder with a shieldmate, and until the start of Vashka's next turn that creature's AC is increased by the interlocked shields around it." — Vashka the Red [seat: action [action/always/defense]] (closest offered: rally) [effect: defense] [menu: throw-retrieve rally shield-bash ground-burst terror-pulse slow-bolt disarm push-prone curse-debt reveal wind-up thrown-burst execute lure pacify escalating-dread sensory-strike thrown-burst-seed] [same-cell unoffered: false-appearance shell-withdraw bloodied-fury death-restoration uncanny-sense shielded-mind evasion patient-defense sealed-body relic-object guarded-stance undead-fortitude mimicry blurred-form] [same-seat rejected: zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Vashka the Red" — donor defender-5, CR 6
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 6 live (live from the seat call onward)
```

</details>

## 14-vashka-the-red

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

Unbroken Formation. While Vashka is within 5 feet of an ally that is not Incapacitated, Vashka has Advantage on saving throws against being Frightened or Charmed.

Shield Wall. While an ally with a shield is within 5 feet of Vashka, neither Vashka nor that ally can be forced to move from its space against its will while the other remains there.

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
[reskin] word match declined by the call: guarded-stance, bloodied-fury, death-restoration, shielded-mind, pack-tactics — the key word does not mean the mechanic here
[reskin] closest refused: trait — "bound" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: neither Vashka nor adjacent shielded ally can be forced to move from i)
[reskin] seat answered, but: the call said "So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share " is carried by "Shield Wall", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("neither Vashka nor adjacent shielded ally can be forced to move from i") and wrote a trait instead: "Shield Wall" -> Traits. While an ally with a shield is adjacent to Vashka, neither Vashka nor that ally can be forced to move from its space aga
[reskin] authored row numbers: "Shield Wall" — the call declared 0 number(s) promised
[reskin] free signature row: "Shield Wall" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Shield Wall" is HANDED "fights from a shield wall" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Shield Wall" ("So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share an interlocked fighting stance, and neit [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Unbroken Formation" — the call reads its condition as none, so no condition is recorded against it
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
[reskin] asked but unanswered: "fights from a shield wall" asked for at_will and no row binds the clause
[reskin] lint fixed: vocab-adjacent — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Shield Wall carries "holding a shield wall without breaking ranks" — "neither Vashka nor that ally can be forced to move from its space against its wi"
[reskin] audit: [Shield Wall: The trait protects the ally but the a…against its will while the other remains there.")]
[reskin] audit defect: Traits/"Shield Wall" [model-written] medium untrackable — The trait protects the ally but the ally's own armor and shield loadout is never defined by this block, so the GM cannot tell which nearby allies qualify as 'with a shield' without checking other statblocks. — Anchor the shield requirement to something the sheet can express (e.g., Vashka's own shield or a qualified 'ally wielding a shield' with a stated way to check), or drop the ally-shield qualifier and key on adjacency alone. (about: "While an ally with a shield is within 5 feet of Vashka, neither Vashka nor that ally can be forced to move from its space against its will while the other remains there.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_zvh3r1
[reskin] [gap] grants each nearby ally a Reaction move into position and a bonus to AC until the warlord's next turn — "Vashka barks a command over his shield rim, and any ally within earshot who can see or hear him may immediately use its Reaction to form up on his line: each such ally moves to stand shoulder to shoulder with a shieldmate, and until the start of Vashka's next turn that creature's AC is increased by the interlocked shields around it." — Vashka the Red [seat: action [action/always/defense]] (closest offered: rally) [effect: defense] [menu: throw-retrieve rally shield-bash ground-burst terror-pulse slow-bolt disarm push-prone curse-debt reveal wind-up thrown-burst execute lure pacify escalating-dread sensory-strike thrown-burst-seed] [same-cell unoffered: false-appearance shell-withdraw bloodied-fury death-restoration uncanny-sense shielded-mind evasion patient-defense sealed-body relic-object guarded-stance undead-fortitude mimicry blurred-form] [same-seat rejected: zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Vashka the Red" — donor defender-5, CR 6
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 6 live (live from the seat call onward)
```

</details>

## 15-vashka-the-red

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

Disciplined Ranks. While Vashka is within 5 feet of an ally wielding a shield, Vashka cannot be moved from its space against its will and does not flee, retreat, or abandon its formation; this holds until no such ally remains within 5 feet.

The Wall Holds. While Vashka is within 5 feet of an ally wielding a shield, neither Vashka nor that ally can be moved from its space against its will, and this protection ends for Vashka the moment no such ally remains within 5 feet.

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
!! [ENRICHMENT] Failed to enrich Vashka the Red: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] word match declined by the call: pack-tactics, guarded-stance, evasion, bound — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: prevents the creature and its adjacent shield-wielding ally from being)
[reskin] seat answered, but: the call said "So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share " is carried by "The Wall Holds", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("prevents the creature and its adjacent shield-wielding ally from being") and wrote a trait instead: "The Wall Holds" -> Traits. While Vashka is adjacent to an ally wielding a shield, neither Vashka nor that ally can be moved from its space against 
[reskin] authored row numbers: "The Wall Holds" — the call declared 0 number(s) promised
[reskin] free signature row: "The Wall Holds" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "The Wall Holds" is HANDED "fights from a shield wall" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"The Wall Holds" ("So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share an interlocked fighting stance, and neit [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [{"clause":"never breaks ranks","row":"The Wall Holds"}], unplaced []
[reskin] clause already answered: "never breaks ranks" is carried by "The Wall Holds" in different words — the call read the sheet and declined to answer it twice
[reskin] condition relation: "Disciplined Ranks" — the call reads its condition as none, so no condition is recorded against it
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
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "The Wall Holds" [no template]
[reskin] asked but unanswered: "fights from a shield wall" asked for at_will and no row binds the clause
[reskin] lint fixed: vocab-adjacent — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint actuator: "adjacent" -> "within 5 feet" in "Disciplined Ranks"
[reskin] lint actuator: "adjacent" -> "within 5 feet" in "The Wall Holds"
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: The Wall Holds carries "holding a shield wall without breaking ranks" — "neither Vashka nor that ally can be moved from its space against its will, and t"
[reskin] audit: [The Wall Holds: This trait duplicates the movement…ly can be moved from its space against its will"), The Wall Holds: The ally's protection has no state…a the moment no such ally remains within 5 feet"), Disciplined Ranks: The trait imposes behavior (no …oes not flee, retreat, or abandon its formation")]
[reskin] audit defect: Traits/"The Wall Holds" [model-written] high other — This trait duplicates the movement immunity already granted by Disciplined Ranks on the same trigger; the only new content is the ally protection, so the self-shadowing clause is dead text on one sheet. — Trim the self-protection clause so The Wall Holds grants only the ally-side benefit and leave Vashka's own immunity to Disciplined Ranks. (about: "While Vashka is within 5 feet of an ally wielding a shield, neither Vashka nor that ally can be moved from its space against its will")
[reskin] audit defect: Traits/"The Wall Holds" [model-written] medium open_ended — The ally's protection has no stated end condition (Range, duration, or break clause) while Vashka's does, so the GM must improvise when the ally's immunity stops. — State the same end condition (ally no longer within 5 feet of Vashka, or otherwise lost) for the ally's protection as for Vashka's. (about: "this protection ends for Vashka the moment no such ally remains within 5 feet")
[reskin] audit defect: Traits/"Disciplined Ranks" [model-written] medium other — The trait imposes behavior (no fleeing, no retreat, no abandoning formation) with no rule, save, or condition attached, leaving the GM to police narrative conduct the statblock cannot adjudicate. — Cut the behavioral clause and keep only the movement immunity, or give the behavior a concrete mechanical form (a condition it ignores, a save it auto-passes). (about: "does not flee, retreat, or abandon its formation")
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

</details>

## 16-mirewitch-sable

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

Actions

Multiattack. Sable makes three Arcane Burst attacks. It can replace one attack with a use of Bog-Spoken Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sable casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bog-Spoken Hex. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Bludgeoning damage.

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
[reskin] seat authored nothing: action — the call was asked to write an action for "Sable whispers a hex into a handful of fen-water and flicks it at one " and wrote no row of that kind (refused: "Bog-Spoken Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Bog-Spoken Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, ); asking once more with the reason
[reskin] the curse is the row: "Bog-Spoken Hex" was written for "curses trespassers" and the engine sets its curse; the Restrained it also carried is dropped — a curse, damage and a condition are more than one row buys
[reskin] authored row answers the GM: action — "Bog-Spoken Hex" was written for "curses trespassers", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a lasting curse that slows the target's movement and lets Sable track ") and wrote an action instead: "Bog-Spoken Hex" -> Actions. *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 19 (3d12) Bludgeoning damage.
[reskin] authored row numbers: "Bog-Spoken Hex" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Bog-Spoken Hex" after ""Bog-Spoken Hex" — the row does nothing on a failed save — say what the target s"
[reskin] seat takes its clause: "Bog-Spoken Hex" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Bog-Spoken Hex" ("Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, t [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, aberrant-ground — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:terrain" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: makes the fen's mire seize and drag down creatures other than her, not)
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "Sodden Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Where Sable stands, the fen answers her: the ground within a short rad" and wrote no row of that kind (refused: "Sodden Wake" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Sodden Wake" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount, area ); asking once more with the reason
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "Sodden Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Where Sable stands, the fen answers her: the ground within a short rad" and wrote no row of that kind (refused: "Sodden Wake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: trait — first: "Sodden Wake" — the call counts 2 number(s) the row promises and only 1 are written — a pr; second: "Sodden Wake" — a trait is not a save — the save form takes stat, target and effect as fie; the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key terrain-walk, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "terrain-walk" is keyed by the GM's marsh and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] — the model found no template that holds it (offered: terrain-walk, aberrant-ground, relentless-pursuit, bound, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, undead-fortitude, kill-denial, berserk, composed:zone:terrain, truth-aura, fear-aura, gaze-aura)
[reskin] weapons answered: Brine-Clawed Hand = none; Grave-Cold Ray = none; Drowning Chill = none; Fen-Weight Curse = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Mage's own type stands
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Brine-Clawed Hand" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "Sable makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Grave-Cold Ray" leaves — the Mage carries no ranged row and the words name none
[reskin] save follows the effect: Actions/"Bog-Spoken Hex" Wisdom -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] print canon saves: proficient in INT, WIS — the Mage's own set, at this sheet's stats and PB 3 (changed INT, CHA)
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Brine-Rot Gaze" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Bog-Spoken Hex.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: nothing flagged
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] [gap] makes the fen's mire seize and drag down creatures other than her, not just slow them — "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." — Mirewitch Sable [seat: trait [trait/always/movement]] (closest offered: composed:zone:terrain) [effect: condition] [menu: terrain-walk aberrant-ground relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind undead-fortitude kill-denial berserk composed:zone:terrain truth-aura fear-aura gaze-aura] [same-cell unoffered: blink spider-climb web-walker earth-glide tunneler self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:body-verdict adhesive:role spider-climb:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role mimicry:body-verdict assassinate:role blurred-form:body-verdict death-burst:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Mirewitch Sable" — donor caster-8-binder, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 6 live (live from the seat call onward)
```

</details>

## 17-mirewitch-sable

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

Actions

Multiattack. Sable makes three Arcane Burst attacks. It can replace one attack with a use of Fen-Weight Mark.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sable casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fen-Weight Mark. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Bludgeoning damage.

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
!! [ENRICHMENT] Failed to enrich Mirewitch Sable: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "Sable whispers a hex into a handful of fen-water and flicks it at one " and wrote no row of that kind (refused: "Fen-Weight Mark" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Fen-Weight Mark" — the row does nothing on a failed save — say what the target suffers: a condition it gains,); asking once more with the reason
[reskin] the curse is the row: "Fen-Weight Mark" was written for "curses trespassers" and the engine sets its curse; the Restrained it also carried is dropped — a curse, damage and a condition are more than one row buys
[reskin] authored row answers the GM: action — "Fen-Weight Mark" was written for "curses trespassers", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a lasting curse that slows the target's movement and lets Sable track ") and wrote an action instead: "Fen-Weight Mark" -> Actions. *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 19 (3d12) Bludgeoning damage.
[reskin] authored row numbers: "Fen-Weight Mark" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Fen-Weight Mark" after ""Fen-Weight Mark" — the row does nothing on a failed save — say what the target "
[reskin] seat takes its clause: "Fen-Weight Mark" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Fen-Weight Mark" ("Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, t [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, relentless-pursuit, bound, phobia — the key word does not mean the mechanic here
[reskin] closest refused: trait — "aberrant-ground" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: makes the ground difficult terrain for others only while leaving her u)
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "Sucking Fen", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Where Sable stands, the fen answers her: the ground within a short rad" and wrote no row of that kind (refused: "Sucking Fen" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Sucking Fen" — a trait is not a save — the save form takes stat, target and effect as fields and the engine r); asking once more with the reason
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "Sucking Fen", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Where Sable stands, the fen answers her: the ground within a short rad" and wrote no row of that kind
[reskin] seat refused twice: trait — first: "Sucking Fen" — a trait is not a save — the save form takes stat, target and effect as fie; second: you wrote no row of the kind asked for (a trait); the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key terrain-walk, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "terrain-walk" is keyed by the GM's marsh and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] — the model found no template that holds it (offered: terrain-walk, aberrant-ground, relentless-pursuit, bound, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, undead-fortitude, kill-denial, berserk, composed:zone:terrain, truth-aura, fear-aura, gaze-aura)
[reskin] weapons answered: Brine-Clawed Hand = none; Grave-Cold Ray = none; Drowning Chill = none; Fen-Weight Curse = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Mage's own type stands
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Brine-Clawed Hand" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "Sable makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Grave-Cold Ray" leaves — the Mage carries no ranged row and the words name none
[reskin] save follows the effect: Actions/"Fen-Weight Mark" Wisdom -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] print canon saves: proficient in INT, WIS — the Mage's own set, at this sheet's stats and PB 3 (changed INT, CHA)
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Brine-Rot Gaze" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Fen-Weight Mark.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Fen-Weight Mark: The row is the sheet's only expre…bout: "*Failure:* 19 (3d12) Bludgeoning damage."), Fen-Weight Mark: The name promises a weighing/miri…plain bludgeoning hex. (about: "Fen-Weight Mark")]
[reskin] audit rename held — "Fen-Weight Mark" was written for the GM's own clause (cl_a3qo0a: "curses trespassers"), so "Mire Bolt" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Fen-Weight Mark" [model-written] high undelivered — The row is the sheet's only expression of 'curses trespassers', but its entire payload is plain damage with no lingering effect, so the curse deals no curse. — Add a persistent, escapable condition or debuff to the failure clause so the mark reads as a curse rather than a second damage attack. (about: "*Failure:* 19 (3d12) Bludgeoning damage.")
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] [gap] makes the ground difficult terrain for others only while leaving her unaffected — "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." — Mirewitch Sable [seat: trait [trait/always/movement]] (closest offered: aberrant-ground) [effect: movement] [menu: terrain-walk aberrant-ground relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind undead-fortitude kill-denial berserk composed:zone:terrain truth-aura fear-aura gaze-aura] [same-cell unoffered: blink spider-climb web-walker earth-glide tunneler self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:body-verdict adhesive:role spider-climb:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role mimicry:body-verdict assassinate:role blurred-form:body-verdict death-burst:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Mirewitch Sable" — donor caster-8-binder, CR 7
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 6 live (live from the seat call onward)
```

</details>

## 18-mirewitch-sable

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

Fen Mire. The ground in a 10-foot Emanation originating from Sable is Difficult Terrain.

Actions

Multiattack. Sable makes three Arcane Burst attacks. It can replace one attack with a use of Fen Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sable casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fen Hex. Charisma Saving Throw: DC 14, one creature within 60 feet. Failure: 17 (5d6) Necrotic damage, and the target is cursed. While cursed, the target can't regain Hit Points.

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
!! [ENRICHMENT] Failed to enrich Mirewitch Sable: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "Sable whispers a hex into a handful of fen-water and flicks it at one " and wrote no row of that kind (refused: "Fen-Weight Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Fen-Weight Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, ); asking once more with the reason
[reskin] clause already answered: "curses trespassers" is carried by "Brine-Rot Gaze" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "curses trespassers" is already carried by a row on this sheet; no second row is written for it
[reskin] seat refused twice: action — first: "Fen-Weight Hex" — the row does nothing on a failed save — say what the target suffers: a ; second: the sheet already answers that clause; the seat stays empty
[reskin] closest refused — subject flipped: action — the call named "lure" nearest and judged its subject FLIPPED against the clause (a lasting curse that slows the target's movement and lets Sable track ); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "curse", the seat that carries it ended with no row, and "curse-debt" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] seat takes its clause: "Fen Hex" is HANDED "a marsh witch" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: curse-debt -> Actions/"Fen Hex" ("Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, t [verb: hex:idea]")
[reskin] signature idea (trait): "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, aberrant-ground — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:terrain: the call picked it off the menu (what no printed template did: unstated)
[reskin] pick kept on the GM's own words: trait — "composed:zone:terrain" has no key-table verb, but the call quotes "a marsh witch who curses trespassers cr" from the description
[reskin] seat takes its clause: "Fen Mire" is HANDED "a marsh witch" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template (trait): composed:zone:terrain -> Traits/"Fen Mire" ("The ground within a short radius of her is sodden, sucking mire that counts as d [shape fit, no verb match]")
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Fen Hex.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 6 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
audit finding below confidence gate: Fen Mire A 10-foot emanation of difficult terrain that follows the witch is too small to meaningfully slow approach and matches no mire the creature creates; the name promises a marsh hazard the text renders as a trivial aura.
[reskin] audit: [Fen Hex: The curse has no written end condition, r…ile cursed, the target can't regain Hit Points.")]
[reskin] audit defect: Actions/"Fen Hex" [catalog] high open_ended — The curse has no written end condition, removal path, or duration, so the no-healing state is open-ended with no rules-legal escape. — Give the curse a stated duration or a way to end it (e.g. a repeat save at the end of each turn). (about: "the target is cursed. While cursed, the target can't regain Hit Points.")
[reskin] seed share: 0 of 2 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] [gap] a lasting curse that slows the target's movement and lets Sable track where it goes — "Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, the mire marks it — for the next minute, whenever the cursed creature moves on its turn, it must spend movement slogging through phantom fen, and Sable always knows which way it went and how far, hearing the bog whisper its path back to her." — Mirewitch Sable [seat: action [action/save/condition]] (closest offered: lure) [effect: condition] [menu: curse-debt delayed-brand lure pacify escalating-dread sensory-strike reveal gaze-single terror-pulse push-prone exploiter condition-payoff ground-burst slow-bolt thrown-burst-seed drain wind-up blighted-ground thrown-burst execute disarm aggro-curse zone bolt-mark wail zone-seed throw-retrieve] [same-cell unoffered: swallow snare seal shield-bash random-ray snare-bolt] [same-seat rejected: swallow:role trample:role leap:role snare:style reel:style seal:body-verdict shield-bash:role hook-drag:role active-toll:body-verdict pull-through:role random-ray:body-verdict spew:body-verdict burrow-ambush:movement obstacle-pull:hold-shape snare-bolt:body-verdict herd:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Mirewitch Sable" — donor caster-8-binder, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 4 live (live from the seat call onward)
```

</details>

## 19-oathbroken-warder

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

Oath's Silence. When the warder hits with a Mace attack, the warder can choose to deal maximum damage instead of rolling, but takes Psychic damage equal to the damage dealt as the oath's silence turns inward.

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
[reskin] seat answered, but: the call said "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during" is carried by "Step Into the Path", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("halts the movement of any creature that moves within the creature's re") and wrote a reaction instead: "Step Into the Path" -> Reactions. *Trigger:* A creature the warder can see moves within the warder's reach. *Response:* The warder steps into the creature
[reskin] authored row numbers: "Step Into the Path" — the call declared 1 number(s) promised
[reskin] free signature row: "Step Into the Path" — a print body takes only what the user's words ask, but the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit; the budget settles on the finished sheet
[reskin] signature authored: no template — the seat wrote it -> Reactions/"Step Into the Path" ("The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom savin [authored: the catalog held no shape for it]")
[reskin] trait gated by AC: "guarded-stance" is off the menu — AC 16 already beats print's 15 at CR 6, and print ships no persistent Disadvantage-to-be-hit trait (0 of 329)
[reskin] menu pruned: trait — guarded-stance (the sheet cannot render them)
[reskin] signature idea (trait): "The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he takes psychic damage equal to the damage dealt as the oath's silence turns inward." [trait/always/damage] [family: payoff] — menu: phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, relic-object, warded-mending, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate
[reskin] composed candidates: none trait — the payoff family composes a rider and this is the trait seat
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does damage; leading: blood-frenzy (always/damage), pack-tactics (always/damage), assassinate (always/damage)
[reskin] classification handed to the fit call: shape=attack
[reskin] word match declined by the call: blood-frenzy, pack-tactics, assassinate, bloodied-fury, guarded-stance — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: lets the warder trade max damage on a hit for psychic damage to itself)
[reskin] seat answered, but: the call said "When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he takes psychic damage eq" is carried by "Oath's Silence", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("lets the warder trade max damage on a hit for psychic damage to itself") and wrote a trait instead: "Oath's Silence" -> Traits. When the warder hits with a Mace attack, the warder can choose to deal maximum damage instead of rolling, but takes psyc
[reskin] authored row numbers: "Oath's Silence" — the call declared 0 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Oath's Silence" ("The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he take [authored: the catalog held no shape for it]")
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
[reskin] free row over budget: Reactions/"Step Into the Path" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Oath's Silence" [no template]
[reskin] lint fixed: damage-type-caps — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element expressed: Oath's Silence carries "a mace swung without a single prayer behind it" — "the oath's silence turns inward"
audit span not verbatim, dropped: Oath's Silence deals maximum damage instead of rolling, but takes Psychic damage equal to the damage dealt
[reskin] audit: [Oath's Silence: The trait states no trigger, actio…hoose to deal maximum damage instead of rolling"), Oath's Silence: The Psychic damage is not self-app…"takes Psychic damage equal to the damage dealt")]
[reskin] audit defect: Traits/"Oath's Silence" [model-written] high open_ended — The trait states no trigger, action, or timing cost for choosing maximum damage, so the GM cannot tell when the choice is made or whether it consumes anything. — State when the choice is made (e.g. on a hit, before damage is rolled) as part of the attack resolution. (about: "the warder can choose to deal maximum damage instead of rolling")
[reskin] audit defect: Traits/"Oath's Silence" [model-written] medium open_ended — The Psychic damage is not self-apportioned to the warder's own HP by any stated cap or interaction, so a GM must derive whether it can kill itself and at what point the recourse ends — the payload and its end are undefined. — State that the warder takes the damage after the attack resolves, and whether this can reduce it to 0 HP. (about: "takes Psychic damage equal to the damage dealt")
[reskin] clause unresolved: "Oath's Silence" carries "When he hits with a Mace attack, he can choose to deal m", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Oathbroken Warder" — donor defender-5, CR 6
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 4 live (live from the seat call onward)
```

</details>

## 20-oathbroken-warder

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

Silent Oath. When the warder hits with a Mace attack, the warder can choose to deal maximum damage instead of rolling, but it takes Psychic damage equal to the damage dealt.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
!! [ENRICHMENT] Failed to enrich Oathbroken Warder: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write a reaction for "The warder plants his shield and dares the line to break. Each creatur" and wrote no row of that kind (refused: "Hold the Line" — the response writes a saving throw as prose — put it in the "save" object (stat, target, damage, condition, success) and the engine renders it after "Response", as print does)
[reskin] seat asked again: action — the first answer was refused ("Hold the Line" — the response writes a saving throw as prose — put it in the "save" object (stat, target, dam); asking once more with the reason
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
[reskin] word match declined by the call: blood-frenzy, pack-tactics, assassinate — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: spends its own hit points to turn a rolled hit into maximum damage)
[reskin] seat answered, but: the call said "When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he takes psychic damage eq" is carried by "Silent Oath", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("spends its own hit points to turn a rolled hit into maximum damage") and wrote a trait instead: "Silent Oath" -> Traits. When the warder hits with a Mace attack, the warder can choose to deal maximum damage instead of rolling, but it takes p
[reskin] authored row numbers: "Silent Oath" — the call declared 1 number(s) promised
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
[reskin] audit: [Silent Oath: The self-inflicted Psychic damage has… takes Psychic damage equal to the damage dealt"), Silent Oath: Maximum damage on a 3d8+4 mace is a v…hoose to deal maximum damage instead of rolling"), Mace: The Multiattack lets the warder make three M…roll before the start of the warder's next turn")]
[reskin] audit defect: Traits/"Silent Oath" [model-written] medium open_ended — The self-inflicted Psychic damage has no stated type source or resistance interaction and, more importantly, the trait gives no trigger timing for when the warder takes it relative to the hit resolving, leaving the GM to guess whether the damage can interrupt or kill before the attack lands. — State explicitly that the Psychic damage is taken immediately after the damage is dealt, as part of the same attack. (about: "but it takes Psychic damage equal to the damage dealt")
[reskin] audit defect: Traits/"Silent Oath" [model-written] medium weak — Maximum damage on a 3d8+4 mace is a very small gain for self-inflicted unresistable Psychic damage, making the trait a trap that a GM will never voluntarily use. — Give the trait a real payoff beyond average damage, such as ignoring Resistance or adding a condition rider, so the risk is worth taking. (about: "the warder can choose to deal maximum damage instead of rolling")
[reskin] audit defect: Actions/"Mace" [model-written] medium other — The Multiattack lets the warder make three Mace attacks, so the Disadvantage rider is applied up to three times to the same or different targets, but the wording gives no rule for whether multiple applications stack or are redundant, and no creature can have Disadvantage twice. — Clarify that the Disadvantage applies once per target regardless of how many Mace attacks hit, or change the rider to something that can meaningfully repeat. (about: "the target has Disadvantage on its next attack roll before the start of the warder's next turn")
[reskin] clause unresolved: "Silent Oath" carries "When he hits with a Mace attack, he can choose to deal m", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] [gap] halts the movement of any creature that moves within the creature's reach, zeroing its Speed — "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have its Speed reduced to 0 until the end of that turn, as he steps into its path and cracks the offending limb." — Oathbroken Warder [seat: action [reaction/on_being_hit/movement]] (closest offered: riposte) [effect: movement] [menu: riposte answering-strike] [same-cell unoffered: none] [same-seat rejected: ward-retaliation:requires-style snap-shot:host-row interpose:requires-style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Oathbroken Warder" — donor defender-5, CR 6
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 21-oathbroken-warder

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

Silent Vow. When the warder hits with a Mace attack, the warder can deal maximum damage with that attack instead of rolling, but then takes Psychic damage equal to the damage dealt.

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
!! [ENRICHMENT] Failed to enrich Oathbroken Warder: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] seat answered, but: the call said "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during" is carried by "Dares the Line to Break", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a reaction for "The warder plants his shield and dares the line to break. Each creatur" and wrote no row of that kind (refused: "Dares the Line to Break" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: action — first: "Hold the Line" — the response writes a saving throw as prose — put it in the "save" objec; second: "Dares the Line to Break" — a reaction's save deals no damage here, so say what the target; the seat stays empty
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
[reskin] word match declined by the call: blood-frenzy, pack-tactics, assassinate, bloodied-fury — the key word does not mean the mechanic here
[reskin] closest refused: trait — "blood-frenzy" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: trade the creature's own hit points for a maximum-damage blow on a hit)
[reskin] seat answered, but: the call said "When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he takes psychic damage eq" is carried by "Silent Vow", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("trade the creature's own hit points for a maximum-damage blow on a hit") and wrote a trait instead: "Silent Vow" -> Traits. When the warder hits with a Mace attack, the warder can deal maximum damage with that attack instead of rolling, but the
[reskin] authored row numbers: "Silent Vow" — the call declared 1 number(s) promised
[reskin] free signature row: "Silent Vow" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Silent Vow" ("The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he take [authored: the catalog held no shape for it]")
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
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Silent Vow" [no template]
[reskin] lint fixed: damage-type-caps — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] element claim revoked: "Silent Vow" claims "a mace swung without a single prayer behind it" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Silent Vow")
audit finding below confidence gate: Shield Bash The Multiattack lets this replace one Mace attack, but the bash deals less damage (2d4+4 vs 3d8+4) and only knocks Prone—a state the target simply stands up from—while the Mace it displaced also imposed Disadvantage, so the row is not worth trading for.
[reskin] audit: [Silent Vow: The trait's fiction is a mace swung wi… takes Psychic damage equal to the damage dealt"), Mace: Every Mace swing carries the same Disadvanta…roll before the start of the warder's next turn")]
[reskin] audit defect: Traits/"Silent Vow" [model-written] medium weak — The trait's fiction is a mace swung with no prayer behind it, but the mechanics grant nothing beyond a normal hit while charging the warder Psychic damage for it—a payoff-free rider that only hurts the wielder. — Either give the maximum-damage swing an actual edge the plain Mace lacks, or reframe the Psychic backlash as the trait's cost incurred for a real benefit. (about: "the warder can deal maximum damage with that attack instead of rolling, but then takes Psychic damage equal to the damage dealt")
[reskin] audit defect: Actions/"Mace" [model-written] low other — Every Mace swing carries the same Disadvantage rider on the target's next attack, so three swings per turn stack nothing and the third attack's rider is largely redundant against a target that already has it—the rider adds bookkeeping without scaling with the Multiattack. — Give the Disadvantage rider a once-per-turn clause or make only one of the three swings carry it, so the GM isn't tracking stacked copies of the same condition. (about: "the target has Disadvantage on its next attack roll before the start of the warder's next turn")
[reskin] clause unresolved: "Silent Vow" carries "When he hits with a Mace attack, he can choose to deal m", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] [gap] halts the movement of any creature that moves within the creature's reach, zeroing its Speed — "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have its Speed reduced to 0 until the end of that turn, as he steps into its path and cracks the offending limb." — Oathbroken Warder [seat: action [reaction/on_being_hit/movement]] (closest offered: riposte) [effect: movement] [menu: riposte answering-strike] [same-cell unoffered: none] [same-seat rejected: ward-retaliation:requires-style snap-shot:host-row interpose:requires-style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Oathbroken Warder" — donor defender-5, CR 6
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 22-swarm-of-funeral-bells

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

Multiattack. The swarm makes two Tolling attacks. It can replace one attack with a use of Passing Bell.

Tolling. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Passing Bell. Wisdom Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

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
[reskin] authored row answers the GM: action — "Passing Bell" was written for "ring themselves over the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("imposes the Frightened and Deafened conditions on one target within ra") and wrote an action instead: "Passing Bell" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Passing Bell" — the call declared (unanswered) number(s) promised
[reskin] value check: "Passing Bell" EV 49.5 vs floor 23.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Passing Bell" ("The swarm rings a single, terrible knell at one creature it can see within range. That creature must make a Wisdom saving throw; on a failure, it is Frightened  [authored: the catalog held no shape for it]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, pounce, isolation, life-drain, charge (+ shelf: resonant-body, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), pounce (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: trait — resonant-body (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: stunning-strike, pounce, life-drain, composed:payoff:condition, charge-push, isolation, charge, resonant-body — the key word does not mean the mechanic here
[reskin] closest refused: trait — "resonant-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers when a creature drops to 0 Hit Points nearby, not when the sw)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (refused: "Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine re); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] reaction damage set aside: "Final Rite" — the call set damage on this Reaction's save, and a Reaction's damage is not counted by the sheet's CR read, so the save keeps its Frightened condition and deals none (owner's hold, 2026-11-18)
[reskin] seat authored the row: trait — the call refused every template for no_fit ("triggers when a creature drops to 0 Hit Points nearby, not when the sw") and wrote a trait instead: "Final Rite" -> Reactions. *Trigger:* A creature within the swarm's reach drops to 0 Hit Points. *Response—Wisdom Saving Throw:* DC 17, each creatu
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Passing Bell.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 3 fixed row(s), so the free-row budget is 2 rather than 1 — the card is thin and can afford more
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 2) — "Final Rite" [no template]
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Final Rite" claims "ringing over the dying" but the quote was not in the row's own text; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Final Rite")
[reskin] audit: [Final Rite: The reaction's entire payload is a one…tened condition until the end of its next turn."), Passing Bell: Frightened carries no constraint on …tened condition until the end of its next turn."), Passing Bell: The cone has no stated origin or dir…ution. (about: "each creature in a 30-foot Cone")]
[reskin] audit defect: Reactions/"Final Rite" [model-written] medium weak — The reaction's entire payload is a one-turn Frightened on bystanders, so the bell-ringing over a dying creature never harms, marks, or threatens the dying creature itself and the reaction is not worth a slot. — Give the rite teeth: make the effect target the dying creature's allies in a way that punishes downing, or impose a condition with lingering value. (about: "Response—Wisdom Saving Throw: DC 17, each creature of the swarm's choice within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.")
[reskin] audit defect: Actions/"Passing Bell" [model-written] low undelivered — Frightened carries no constraint on the creature's actions beyond a Fear-out-of-line clause the entry never states, so the imposed state neither drives enemies off (the stated ask) nor imposes a movement penalty. — Have the Frightened creature also take on the bell's tolling theme, e.g. a clause that limits its movement toward the swarm or imposes a penalty while Frightened. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] audit defect: Actions/"Passing Bell" [model-written] low other — The cone has no stated origin or direction (from the swarm, aimed where?), so a GM cannot place it without inventing a facing rule the block never provides. — State the cone emanates from the swarm or in a direction the swarm chooses at resolution. (about: "each creature in a 30-foot Cone")
[reskin] clause unresolved: "Final Rite" carries "Whenever a creature within the swarm's reach drops to 0 ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 23-swarm-of-funeral-bells

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

Multiattack. The swarm makes two Tolling attacks. It can replace one attack with a use of Requiem for the Dying.

Tolling. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Requiem for the Dying. Wisdom Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

Reactions

Final Rite. Trigger: A creature within the swarm's reach drops to 0 Hit Points. Response—Wisdom Saving Throw: DC 17, each creature of the swarm's choice within 60 feet. Failure: The target has the Frightened condition until the end of its next turn. Success: Half.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
!! [ENRICHMENT] Failed to enrich Swarm of Funeral Bells: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] authored row answers the GM: action — "Requiem for the Dying" was written for "ring themselves over the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("imposes the Frightened and Deafened conditions on one target within ra") and wrote an action instead: "Requiem for the Dying" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Requiem for the Dying" — the call declared (unanswered) number(s) promised
[reskin] value check: "Requiem for the Dying" EV 49.5 vs floor 23.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Requiem for the Dying" ("The swarm rings a single, terrible knell at one creature it can see within range. That creature must make a Wisdom saving throw; on a failure, it is Frightened  [authored: the catalog held no shape for it]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, pounce, isolation, life-drain, charge (+ shelf: resonant-body, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), pounce (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: trait — resonant-body (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: stunning-strike, pounce, life-drain, composed:payoff:condition, charge-push, isolation, charge, resonant-body — the key word does not mean the mechanic here
[reskin] closest refused: trait — "resonant-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers off a victim dropping to 0 HP rather than off the swarm landi)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (refused: "Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine re); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] reaction damage set aside: "Final Rite" — the call set damage on this Reaction's save, and a Reaction's damage is not counted by the sheet's CR read, so the save keeps its Frightened condition and deals none (owner's hold, 2026-11-18)
[reskin] seat authored the row: trait — the call refused every template for no_fit ("triggers off a victim dropping to 0 HP rather than off the swarm landi") and wrote a trait instead: "Final Rite" -> Reactions. *Trigger:* A creature within the swarm's reach drops to 0 Hit Points. *Response—Constitution Saving Throw:* DC 17, each 
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Requiem for the Dying.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 3 fixed row(s), so the free-row budget is 2 rather than 1 — the card is thin and can afford more
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 2) — "Final Rite" [no template]
[reskin] save re-derived after a retype: Reactions/Final Rite — a Constitution save for a condition the row IMPOSES, which calls for Wisdom or Charisma (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Final Rite: The Frightened condition is usually a …ntil the end of its next turn. *Success:* Half.")]
[reskin] audit defect: Reactions/"Final Rite" [model-written] high dead_reference — The Frightened condition is usually a save-with-no-duration-exit; here it's a save, so it's fine. The 'Success: Half' is a dead clause because Frightened is a condition, not damage—there's nothing to halve on a successful save. — Remove the 'Success: Half' clause or replace it with a meaningful success effect (e.g., the Frightened condition ends immediately on a success). (about: "*Failure:* The target has the Frightened condition until the end of its next turn. *Success:* Half.")
[reskin] clause unresolved: "Final Rite" carries "Whenever a creature within the swarm's reach drops to 0 ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 24-swarm-of-funeral-bells

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

Multiattack. The swarm makes two Tolling attacks. It can replace one attack with a use of Knell for the Dying.

Tolling. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Knell for the Dying. Wisdom Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

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

<details><summary>trace</summary>

```
!! [ENRICHMENT] Failed to enrich Swarm of Funeral Bells: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] authored row answers the GM: action — "Knell for the Dying" was written for "ring themselves over the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("imposes the Frightened and Deafened conditions on one target within ra") and wrote an action instead: "Knell for the Dying" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Knell for the Dying" — the call declared (unanswered) number(s) promised
[reskin] value check: "Knell for the Dying" EV 49.5 vs floor 23.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Knell for the Dying" ("The swarm rings a single, terrible knell at one creature it can see within range. That creature must make a Wisdom saving throw; on a failure, it is Frightened  [authored: the catalog held no shape for it]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, pounce, isolation, life-drain, charge (+ shelf: resonant-body, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), pounce (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: trait — resonant-body (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: resonant-body, life-drain, charge-push, charge, isolation, pounce, composed:payoff:condition — the key word does not mean the mechanic here
[reskin] closest refused: trait — "stunning-strike" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: fires when some other creature drops to 0 HP, and hits many chosen cre)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (refused: "Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine re); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] reaction damage set aside: "Final Rite" — the call set damage on this Reaction's save, and a Reaction's damage is not counted by the sheet's CR read, so the save keeps its Frightened condition and deals none (owner's hold, 2026-11-18)
[reskin] seat authored the row: trait — the call refused every template for no_fit ("fires when some other creature drops to 0 HP, and hits many chosen cre") and wrote a trait instead: "Final Rite" -> Reactions. *Trigger:* A creature within the swarm's reach drops to 0 Hit Points. *Response—Wisdom Saving Throw:* DC 17, each creatu
[reskin] authored row numbers: "Final Rite" — the call declared 1 number(s) promised
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Knell for the Dying.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 3 fixed row(s), so the free-row budget is 2 rather than 1 — the card is thin and can afford more
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 2) — "Final Rite" [no template]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Final Rite carries "ringing over the dying" — "A creature within the swarm's reach drops to 0 Hit Points."
[reskin] audit: [Final Rite: The reaction is triggered by a creatur… creature of the swarm's choice within 30 feet."), Knell for the Dying: Frightened is imposed without…tened condition until the end of its next turn."), Final Rite: The Frightened condition is applied wi…tened condition until the end of its next turn."), Final Rite: Only one creature can drop to 0 HP in …within the swarm's reach drops to 0 Hit Points.")]
[reskin] audit defect: Reactions/"Final Rite" [model-written] high other — The reaction is triggered by a creature dropping to 0 HP within the swarm's 5-foot reach but then hits every creature of the swarm's choice within 30 feet, so the trigger and the affected area do not line up — the ability rings out over creatures the dying creature never touched, making the trigger irrelevant to who is affected. — Make the affected area the swarm's own space/reach (or the dying creature's space) so the reaction's reach and its trigger are the same, or state the ringing sweeps outward explicitly as a 30-foot emanation from the swarm. (about: "Response—Wisdom Saving Throw: DC 17, each creature of the swarm's choice within 30 feet.")
[reskin] audit defect: Actions/"Knell for the Dying" [model-written] high open_ended — Frightened is imposed without an escape or a specified source of fear, so the Frightened condition's own rules (can't willingly move closer to the source, Disadvantage while source in line of sight) cannot be adjudicated because the swarm is never named as the feared source. — Name the swarm as the source of the Frightened condition so its movement and Disadvantage clauses can be applied. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] audit defect: Reactions/"Final Rite" [model-written] high open_ended — The Frightened condition is applied with no source named, so its 'can't move closer to the source' and 'Disadvantage while source is in line of sight' clauses have no referent to check. — State that the swarm is the source of the Frightened condition. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] audit defect: Reactions/"Final Rite" [model-written] medium other — Only one creature can drop to 0 HP in a turn under this trigger, yet the reaction then makes a separate Wisdom save per creature within 30 feet — the trigger does not match the fiction of a bell-swarm ringing over the dying, which would ring on each death, and the reaction fires only for the first one even though a death is the sole fiction the ability is built on. — Reconsider whether the trigger should be 'a creature drops to 0 HP while within 30 feet of the swarm' so the ringing and the death share the same range. (about: "Trigger: A creature within the swarm's reach drops to 0 Hit Points.")
[reskin] clause unresolved: "Final Rite" carries "Whenever a creature within the swarm's reach drops to 0 ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 25-probe-a-young-storm-drake-whose-breath-is-a-rolling-wa

**Typed:** `a young storm drake whose breath is a rolling wall of thunder`

**signature elements:** rolling wall of thunder breath [behavior] | storm-charged drake hide and wings [body] | thunderous wingbeat [aura]

**identity:** The storm drake opens with a rolling wall of thunder exhaled low and wide, flattening the field and deafening anything it does not pulp outright. Each round after, it wheels on the wing, diving to gore with horn and fang and re-laying its thunder-wall to herd prey back into the killing lane. Wary of a real threat to its hide, it retreats bloodied rather than dies for pride — but against anything it can still reach, it harries and toys, testing prey like a hawk before the final stoop.

**lore:** The storm drake whelps high in the thundering crags where squall-born lightning pricks the stone; it wants a storm-wrought territory it can call its own and a herd of screaming prey to prove it.

### The sheet

```

```

<details><summary>trace</summary>

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
[reskin] strike written from its attack: "Charged Brand" clones "Horn" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] value check: "Charged Brand" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Charged Brand" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
!! Statblock generation failed: Cannot read properties of null (reading 'authoredSeat')
[harness] at timeout: {"ready":"complete","generating":false,"url":"http://localhost:5173/"}
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 1 live (live from the seat call onward)
```

</details>

## 26-thunderwall-drake

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

Traits

Storm-Down Aura. Strength Saving Throw: DC 15, any creature that starts its turn in a 10-foot Emanation originating from the drake. Failure: The target has the Prone condition. Success: The target is immune to this creature's aura for 24 hours.

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
[reskin] word match declined by the call: truth-aura, fear-aura, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, energy-aura — the key word does not mean the mechanic here
[reskin] row composed from the family's own options: trait — composed:zone:condition:poisoned: the call picked it off the menu (what no printed template did: unstated)
[reskin] pick kept on the GM's own words: trait — "composed:zone:condition:poisoned" has no key-table verb, but the call quotes "a young storm drake whose breath is a rolling wall of thunder" from the description
[reskin] signature template (trait): composed:zone:condition:poisoned -> Traits/"Storm-Down Aura" ("creatures that crowd beneath its flight are knocked prone by the pressure of its [shape fit, no verb match]")
[reskin] weapons answered: Horn = none; Thunder Wall = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
audit finding below confidence gate: Storm-Down Aura The aura forces a save at the start of every affected creature's turn, and each success creates a 24-hour immunity the GM must track per creature, which is hard to adjudicate during a combat turn without bookkeeping the statblock does not support.
audit finding below confidence gate: Thunder Wall The action is named for a wall but its area is a cone, so it does not produce a wall the creature or GM can use for positioning; the fiction promises a rolling barrier, not a cone burst.
[reskin] audit: [Storm-Down Aura: The aura knocks creatures Prone v… a 10-foot Emanation originating from the drake")]
[reskin] audit defect: Traits/"Storm-Down Aura" [catalog] medium undelivered — The aura knocks creatures Prone via a Strength save, but nothing in the block converts going Prone into the wall-of-thunder fantasy; as written the aura is a silent knockdown, not a storm that knocks targets down with thunder, so the effect is not delivered. — Have the aura deal Thunder damage or impose the Prone condition with thunder as the described cause, and state the save and area consistently. (about: "any creature that starts its turn in a 10-foot Emanation originating from the drake")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] leaves a thunder-charged mark in the breath's area, and the next hit on a creature standing in it discharges that mark t — "The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strikes a creature standing in that brand-wake, the horn carries the withheld thunder through it and the target is stunned until the end of its next turn." — Thunderwall Drake [seat: action [rider/on_hit/condition]] (closest offered: stunning-strike) [effect: condition] [menu: affliction contagion stunning-strike pounce composed:payoff:condition charge-push hook-rider charge isolation execute] [same-cell unoffered: life-drain snatch bolt-restrain bolt-mark] [same-seat rejected: life-drain:body-verdict snatch:engine-key bolt-restrain:host-row bolt-drag:host-row bolt-mark:host-row] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 27-probe-a-young-storm-drake-whose-breath-is-a-rolling-wa

**Typed:** `a young storm drake whose breath is a rolling wall of thunder`

**signature elements:** rolling wall of thunder breath [behavior] | storm-charged drake hide and wings [body] | thunderous wingbeat [aura]

**identity:** The storm drake opens with a rolling wall of thunder exhaled low and wide, flattening the field and deafening anything it does not pulp outright. Each round after, it wheels on the wing, diving to gore with horn and fang and re-laying its thunder-wall to herd prey back into the killing lane. Wary of a real threat to its hide, it retreats bloodied rather than dies for pride — but against anything it can still reach, it harries and toys, testing prey like a hawk before the final stoop.

**lore:** The storm drake whelps high in the thundering crags where squall-born lightning pricks the stone; it wants a storm-wrought territory it can call its own and a herd of screaming prey to prove it.

### The sheet

```

```

<details><summary>trace</summary>

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
!! [ENRICHMENT] Failed to enrich Thunderwall Drake: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] strike written from its attack: "Charged Wake" clones "Horn" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] value check: "Charged Wake" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Charged Wake" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
!! Statblock generation failed: Cannot read properties of null (reading 'authoredSeat')
[harness] at timeout: {"ready":"complete","generating":false,"url":"http://localhost:5173/"}
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 1 live (live from the seat call onward)
```

</details>

## 28-well-drowned-worm

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

Briny Sleeve. It can move through a space as narrow as 1 foot wide without squeezing, and it can climb sheer surfaces and hang upside down from ceilings without a check.

Actions

Multiattack. The drowned worm makes two Coil attacks. It can replace one attack with a use of Drowned Terror.

Coil. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Drowned Terror. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the drowned worm's next turn. If the target was already Frightened by this ability, it also takes 18 (4d8) Psychic damage.

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
[reskin] seat authored nothing: action — the call was asked to write an action for "The drowned worm hauls one creature it has Grappled up to its speed to" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
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
[reskin] word match declined by the call: spider-climb — the key word does not mean the mechanic here
[reskin] closest refused: trait — "spider-climb" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grabs a target and holds it fast so it cannot get free)
[reskin] seat answered, but: the call said "The drowned worm's body is a sleeve of black brine and wet flesh that flows through any gap or crack. It can move throug" is carried by "Briny Sleeve", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("grabs a target and holds it fast so it cannot get free") and wrote a trait instead: "Briny Sleeve" -> Traits. It can move through a space as narrow as 1 foot wide without squeezing, and it can climb sheer surfaces and hang upside 
[reskin] authored row numbers: "Briny Sleeve" — the call declared 1 number(s) promised
[reskin] free signature row: "Briny Sleeve" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Briny Sleeve" ("The drowned worm's body is a sleeve of black brine and wet flesh that flows through any gap or crack. It can move through a space as narrow as a few inches wide [authored: the catalog held no shape for it]")
[reskin] weapons answered: Coil = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Briny Sleeve" [no template]
[reskin] lint: 0 findings
[reskin] element expressed: Briny Sleeve carries "a body of black, brine-heavy coils" — "it can move through a space as narrow as 1 foot wide without squeezing"
[reskin] audit: [Briny Sleeve: The trait grants climb-climbing and … hang upside down from ceilings without a check"), Creeping Dread: The psychic payload only fires aga…ability, it also takes 18 (4d8) Psychic damage."), Creeping Dread: The generic name describes no well…ned well and its coils. (about: "Creeping Dread")]
[reskin] audit rename: "Creeping Dread" -> "Drowned Terror"
[reskin] audit defect: Traits/"Briny Sleeve" [model-written] high other — The trait grants climb-climbing and ceiling-hanging without a check but supplies no climb Speed, so the creature is described as performing a movement mode the chassis never establishes. — State the climb Speed this trait confers, or remove the movement clause and keep only the squeeze benefit. (about: "it can climb sheer surfaces and hang upside down from ceilings without a check")
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Drowned Terror) — the sameness metric
[reskin] clause unresolved: "Briny Sleeve" carries "The drowned worm's body is a sleeve of black brine and w", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] drags a grappled creature toward water, and once submerged it is blinded and restrained until it escapes — "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victim across the ground. If the target ends this move in water deep enough to submerge it, it has the Blinded and Restrained conditions until it escapes the grapple." — Well Drowned Worm [seat: action [action/always/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider leap condition-payoff ground-burst spew escalating-dread terror-pulse thrown-burst-seed drain wind-up snare seal lure pacify snare-bolt sensory-strike] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:requires-row zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Well Drowned Worm" — donor brute-5-grappler, CR 5
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 29-well-drowned-worm

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

Multiattack. The drowned worm makes two Coil attacks. It can replace one attack with a use of Drowned Terror.

Coil. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Drowned Terror. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the drowned worm's next turn. If the target was already Frightened by this ability, it also takes 18 (4d8) Psychic damage.

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
!! [ENRICHMENT] Failed to enrich Well Drowned Worm: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] word match declined by the call: bound, terrain-walk, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest refused: trait — "spider-climb" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: drags a grappled creature down into the creature's space and hides it )
[reskin] seat answered, but: the call said "It can move through a space as narrow as a few inches wide without squeezing, and it can climb sheer surfaces and hang u" is carried by "Black Brine Sleeve", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("drags a grappled creature down into the creature's space and hides it ") and wrote a trait instead: "Black Brine Sleeve" -> Traits. The drowned worm can move through a space as narrow as a few inches wide without squeezing, and it can climb sheer surfa
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
[reskin] element expressed: Black Brine Sleeve carries "a body of black, brine-heavy coils" — "can move through a space as narrow as a few inches wide without squeezing"
[reskin] audit: [Creeping Dread: The bonus damage needs the target …ability, it also takes 18 (4d8) Psychic damage.")]
[reskin] audit rename: "Creeping Dread" -> "Drowned Terror"
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Drowned Terror) — the sameness metric
[reskin] clause unresolved: "Black Brine Sleeve" carries "The drowned worm's body is a sleeve of black brine and w", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] drags a grappled creature toward water, and once submerged it is blinded and restrained until it escapes — "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victim across the ground. If the target ends this move in water deep enough to submerge it, it has the Blinded and Restrained conditions until it escapes the grapple." — Well Drowned Worm [seat: action [action/always/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider leap condition-payoff ground-burst spew escalating-dread terror-pulse thrown-burst-seed drain wind-up snare seal lure pacify snare-bolt sensory-strike] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:requires-row zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Well Drowned Worm" — donor brute-5-grappler, CR 5
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 4 live (live from the seat call onward)
```

</details>

## 30-well-drowned-worm

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

Sleeve of Brine. The drowned worm can move through a space as narrow as 1 foot wide without squeezing, and it can climb sheer surfaces and hang upside down from ceilings without a check.

Actions

Multiattack. The drowned worm makes two Coil attacks. It can replace one attack with a use of Well-Dark Dread.

Coil. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Well-Dark Dread. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the drowned worm's next turn. If the target was already Frightened by this ability, it also takes 18 (4d8) Psychic damage.

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
!! [ENRICHMENT] Failed to enrich Well Drowned Worm: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "The drowned worm hauls one creature it has Grappled up to its speed to" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
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
[reskin] word match declined by the call: spider-climb, terrain-walk — the key word does not mean the mechanic here
[reskin] closest refused: trait — "spider-climb" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: grabs a creature and submerges it inside the worm's body)
[reskin] seat answered, but: the call said "The drowned worm's body is a sleeve of black brine and wet flesh that flows through any gap or crack. It can move throug" is carried by "Sleeve of Brine", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drowned worm's body is a sleeve of black brine and wet flesh that " and wrote no row of that kind (refused: "Sleeve of Brine" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Sleeve of Brine" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, a); asking once more with the reason
[reskin] seat answered, but: the call said "The drowned worm's body is a sleeve of black brine and wet flesh that flows through any gap or crack. It can move throug" is carried by "Sleeve of Brine", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("grabs a creature and submerges it inside the worm's body") and wrote a trait instead: "Sleeve of Brine" -> Traits. The drowned worm can move through a space as narrow as 1 foot wide without squeezing, and it can climb sheer surfaces an
[reskin] authored row numbers: "Sleeve of Brine" — the call declared 1 number(s) promised
[reskin] seat landed on the second try: trait — "Sleeve of Brine" after ""Sleeve of Brine" — the call counts 1 number(s) the row promises and only 0 are "
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Sleeve of Brine" ("The drowned worm's body is a sleeve of black brine and wet flesh that flows through any gap or crack. It can move through a space as narrow as a few inches wide [authored: the catalog held no shape for it]")
[reskin] weapons answered: Coil = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Sleeve of Brine" [no template]
[reskin] lint: 0 findings
[reskin] audit: [Sleeve of Brine: The name 'Sleeve of Brine' promis…pace as narrow as 1 foot wide without squeezing"), Creeping Dread: The library stand-in name 'Creepin…c rules text unchanged. (about: "Creeping Dread")]
[reskin] audit rename blocked — "Sleeve of Brine" -> "Boneless Coil" would drop the GM's own words "sleeve", "brine"
[reskin] audit rename: "Creeping Dread" -> "Well-Dark Dread"
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Well-Dark Dread) — the sameness metric
[reskin] clause unresolved: "Sleeve of Brine" carries "The drowned worm's body is a sleeve of black brine and w", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] drags a grappled creature toward water, and once submerged it is blinded and restrained until it escapes — "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victim across the ground. If the target ends this move in water deep enough to submerge it, it has the Blinded and Restrained conditions until it escapes the grapple." — Well Drowned Worm [seat: action [action/always/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider leap condition-payoff ground-burst spew escalating-dread terror-pulse thrown-burst-seed drain wind-up snare seal lure pacify snare-bolt sensory-strike] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:requires-row zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Well Drowned Worm" — donor brute-5-grappler, CR 5
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 6 live (live from the seat call onward)
```

</details>

## 31-veteran-sellsword

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

Crowded Guard.When the sellsword hits a creature with a shortsword attack, the target has disadvantage on its next attack roll against the sellsword before the start of its next turn.
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
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (refused: "Feigned Rout" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: action — first: "Feigned Rout" — a trait is not a save — the save form takes stat, target and effect as fi; second: "Feigned Rout" — a reaction's save deals no damage here, so say what the target suffers as; the seat stays empty
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
[reskin] word match declined by the call: berserk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, assassinate, truth-aura, fear-aura, phobia — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a hit with the shortsword gives the target Disadvantage on its next at)
[reskin] seat answered, but: the call said "when it hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against the sellsw" is carried by "Crowded Guard", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a hit with the shortsword gives the target Disadvantage on its next at") and wrote a trait instead: "Crowded Guard" -> Traits. When the sellsword hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against
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
[reskin] element expressed: Crowded Guard carries "shortsword work at close quarters" — "When the sellsword hits a creature with a Shortsword attack, the target has Disa"
audit finding below confidence gate: Shield Bash The prerequisite clause gates a real effect on a target the block does not otherwise know — 'if the target is Medium or smaller' is a constant in the statblock, and the payload (2d4+4 and Prone) is far below a Shortsword's 1d6+4 plus Advantage or a Handaxe swing, making the row a dead option the GM will simply not pick.
[reskin] audit: [Shortsword: The Shortsword row grants a handaxe-re…k, his handaxe returns to the sellsword's grasp"), Riposte: Riposte is a reaction triggered by a mele…makes one Handaxe attack against that creature.")]
[reskin] audit rename blocked — "Riposte" is the user's own part name, a kit feature's real name, or print's own row
[reskin] audit defect: Actions/"Shortsword" [model-written] high dead_reference — The Shortsword row grants a handaxe-return mechanic that belongs to a thrown-weapon economy the block never establishes (no row throws the handaxe away, and Multiattack's Handaxe/Shortsword mix never empties the hand), and it refers to the creature as 'his' where the rest of the block uses 'the sellsword'. — Remove the handaxe-return clause from Shortsword (or move it onto the Handaxe row where a thrown weapon would actually be tracked) and use 'the sellsword'. (about: "Immediately after the attack, his handaxe returns to the sellsword's grasp")
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

</details>

## 32-veteran-sellsword

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

Crowded Guard.When the sellsword hits a creature with a shortsword attack, the target has disadvantage on its next attack roll against the sellsword before the start of its next turn.
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
!! [ENRICHMENT] Failed to enrich Veteran Sellsword: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (refused: "Feigned Rout" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: action — first: "Feigned Rout" — a trait is not a save — the save form takes stat, target and effect as fi; second: "Feigned Rout" — a reaction's save deals no damage here, so say what the target suffers as; the seat stays empty
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
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: makes the target it hits take Disadvantage on its next attack roll aga)
[reskin] seat answered, but: the call said "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attac" is carried by "Crowded Guard", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("makes the target it hits take Disadvantage on its next attack roll aga") and wrote a trait instead: "Crowded Guard" -> Traits. When the sellsword hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against
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
[reskin] element expressed: Crowded Guard carries "shortsword work at close quarters" — "the target has Disadvantage on its next attack roll against the sellsword before"
audit finding below confidence gate: Multiattack Three Handaxe attacks with the Handaxe Advantage rider stacking on each successive hit means the GM must track and resolve a growing chain of Advantage state across three attacks plus a Shortsword swap in one turn, which is more bookkeeping than a turn can carry cleanly.
[reskin] audit: [Shortsword: The Shortsword's Hit or Miss clause te…: "his handaxe returns to the sellsword's grasp"), Shortsword: This duplicates the identical Advantag…inst the target before the end of its next turn"), Shortsword: The name and the ask promise a shortsw…k, his handaxe returns to the sellsword's grasp"), Crowded Guard: The trait's imposed disadvantage is…the sellsword before the start of its next turn"), Crowded Guard: The trait's only teeth are one disa…e on its next attack roll against the sellsword")]
[reskin] audit defect: Actions/"Shortsword" [model-written] high wording — The Shortsword's Hit or Miss clause teleports the handaxe back at the moment of a shortsword strike, describing a mechanic nothing in the block sets up (no thrown-handaxe-away state exists) and contradicting the fiction that the handaxe is a separate weapon. — Remove the returning-handaxe clause from Shortsword and, if a return mechanic is wanted, attach it to the throw as a condition of the Handaxe attack itself. (about: "his handaxe returns to the sellsword's grasp")
[reskin] audit defect: Actions/"Shortsword" [model-written] high weak — This duplicates the identical Advantage rider already carried by Handaxe, so every Multiattack that swaps in a Shortsword grants the same reward twice from two rows, and it is not what a shortsword at close quarters should convey. — Strip the Advantage rider from Shortsword and let its effect be the close-quarters deliverable of Crowded Guard/shortsword work rather than a copy of Handaxe's rider. (about: "the sellsword has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] audit defect: Actions/"Shortsword" [model-written] high misnamed — The name and the ask promise a shortsword closing strike, but the row's actual payload is a handaxe retrieval — the Shortsword entry does something other than what its name says. — Rewrite the row so its text delivers a shortsword strike and any close-quarters effect, without relocating a different weapon. (about: "Immediately after the attack, his handaxe returns to the sellsword's grasp")
[reskin] audit defect: Traits/"Crowded Guard" [model-written] medium open_ended — The trait's imposed disadvantage is scheduled to lapse at the start of the target's next turn if it has not been used, but nothing states what happens to the state if the target does not attack the sellsword — it is keyed only to the sellsword, so the GM has no clean way to record or clear it when the target acts against anyone else. — State the exact window the disadvantage applies to (e.g. its next attack before the start of its next turn) so the condition resolves deterministically whether or not that attack is against the sellsword. (about: "the target has Disadvantage on its next attack roll against the sellsword before the start of its next turn")
[reskin] audit defect: Traits/"Crowded Guard" [model-written] medium weak — The trait's only teeth are one disadvantaged attack directed at the sellsword, a nuisance with no payload or duration that a target can simply ignore by attacking anyone else, so the row's fiction of guarded shortsword work delivers no real threat. — Give the trait something that matters at close quarters — e.g. a condition or effect that constrains the target's movement or attacks beyond a single redirected miss — while keeping it shortsword-triggered. (about: "Disadvantage on its next attack roll against the sellsword")
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

</details>

## 33-veteran-sellsword

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

Crowded Guard (Reaction).When the sellsword hits a creature with a Shortsword attack, the sellsword crowds the target's guard with buckler and footwork, and the target has disadvantage on its next attack roll against the sellsword before the start of its next turn.
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
!! [ENRICHMENT] Failed to enrich Veteran Sellsword: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795108620361:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (it belongs in the description)
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
[reskin] word match declined by the call: phobia, assassinate — the key word does not mean the mechanic here
[reskin] closest refused: trait — "phobia" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: applies Disadvantage on the victim's next attack against the creature )
[reskin] seat answered, but: the call said "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attac" is carried by "Crowded Guard", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The sellsword's shortsword work is brutally efficient at close quarter" and wrote no row of that kind (refused: "Shortsword" — a rider says what the hit does: a condition, a forced movement, or a curse)
[reskin] seat asked again: trait — the first answer was refused ("Shortsword" — a rider says what the hit does: a condition, a forced movement, or a curse); asking once more with the reason
[reskin] seat answered, but: the call said "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attac" is carried by "Crowded Guard", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("applies Disadvantage on the victim's next attack against the creature ") and wrote a trait instead: "Crowded Guard" -> Reactions. *Trigger:* The sellsword hits a creature with a Shortsword attack. *Response:* The sellsword crowds the target's guard w
[reskin] authored row numbers: "Crowded Guard" — the call declared 0 number(s) promised
[reskin] seat landed on the second try: trait — "Crowded Guard" after ""Shortsword" — a rider says what the hit does: a condition, a forced movement, o"
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Crowded Guard" ("The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attack, the target has Disadvantage on its ne [authored: the catalog held no shape for it]")
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
[reskin] element expressed: Crowded Guard carries "shortsword work at close quarters" — "the sellsword crowds the target's guard with buckler and footwork"
[reskin] audit: [Shortsword: The Shortsword row narrates a thrown h…k, his handaxe returns to the sellsword's grasp"), Shortsword: The Shortsword deals half the Handaxe'…placement. (about: "7 (1d6 + 4) Piercing damage"), Crowded Guard: The reaction triggers on a Shortswo…the sellsword before the start of its next turn"), Handaxe: The Advantage rider is ambiguous about wh…inst the target before the end of its next turn"), Riposte: Riposte lets the sellsword make a ranged … makes one Handaxe attack against that creature"), Crowded Guard: Disadvantage on one attack roll aga…e on its next attack roll against the sellsword")]
[reskin] audit defect: Actions/"Shortsword" [model-written] high dead_reference — The Shortsword row narrates a thrown handaxe returning, but nothing in the block ever throws the handaxe together with the shortsword — the Handaxe row's ranged use and the Shortsword row are separate actions — and the pronoun 'his' shifts person away from the rest of the block. — Remove the returning-handaxe clause or attach it to an actual thrown-handaxe action so it references an event the block creates. (about: "Immediately after the attack, his handaxe returns to the sellsword's grasp")
[reskin] audit defect: Actions/"Shortsword" [model-written] high weak — The Shortsword deals half the Handaxe's damage and grants the same Advantage rider, so within Multiattack it is strictly worse than the attack it replaces — there is no reason ever to swap. — Give the Shortsword a distinct payoff (a condition, a rider, or a damage component) that justifies spending the replacement. (about: "7 (1d6 + 4) Piercing damage")
[reskin] audit defect: Reactions/"Crowded Guard" [model-written] medium other — The reaction triggers on a Shortsword hit, but both Handaxe and Shortsword already grant the sellsword Advantage on its next attack; Crowded Guard stacks an additional debuff onto the same target, producing two overlapping riders on the same hit. — Either make Crowded Guard a distinct effect the Shortsword's own rider does not provide, or drop the duplicate rider from Shortsword. (about: "the target has Disadvantage on its next attack roll against the sellsword before the start of its next turn")
[reskin] audit defect: Actions/"Handaxe" [model-written] medium other — The Advantage rider is ambiguous about which attack it applies to (any subsequent attack? the next attack specifically from this creature?), and a ranged Handaxe's rider pushes advantage toward follow-up melee while the creature may be far away. — Clarify whose next attack roll and whether any attack qualifies, or drop the rider so the Handaxe row reads as a clean ranged/melee weapon attack. (about: "has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] audit defect: Reactions/"Riposte" [catalog] high other — Riposte lets the sellsword make a ranged Handaxe attack in response to a melee miss within 5 feet, which the fiction of a riposte (an immediate counterblow) does not support and which could hit at 20/60 ft. from a target that just missed at 5 ft. — Restrict the Riposte attack to a melee Handaxe attack (reach 5 ft.) so the counterblow makes sense at close range. (about: "The sellsword makes one Handaxe attack against that creature")
[reskin] audit defect: Reactions/"Crowded Guard" [model-written] medium weak — Disadvantage on one attack roll against the sellsword is a minor nuisance for a CR 5 reaction slot and does not deliver the crowd-control pressure the name implies. — Strengthen the reaction's effect to something the table will notice (a condition, a movement restriction, or a damage clause) rather than a single attack-roll debuff. (about: "the target has Disadvantage on its next attack roll against the sellsword")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Crowded Guard" carries "When the sellsword hits a creature with a Shortsword att", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Riposte" carries "sellsword" which is not a whole clause — the seat surgery cut it; resolved to cl_16u4r8s
[reskin] [gap] lets the sellsword move its Speed without provoking Opportunity Attacks while doubting attackers suffer Disadvantage on  — "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without provoking Opportunity Attacks, and each creature that can see it must succeed on a Wisdom saving throw or have Disadvantage on its next attack roll against the sellsword before the start of its next turn, as the sellsword's feigned panic and sudden reversal sow doubt." — Veteran Sellsword [seat: action [trait/start_of_turn/movement]] (closest offered: aggro-curse) [effect: movement] [menu: truth-aura fear-aura relentless-pursuit bound aggro-curse phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind evasion relic-object guarded-stance undead-fortitude assassinate] [same-cell unoffered: none] [same-seat rejected: energy-aura:deny-type noxious-aura:deny-type warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Veteran Sellsword" — donor skirmisher-8-hurler, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 6 live (live from the seat call onward)
```

</details>

## 34-probe-a-young-storm-drake-whose-breath-is-a-rolling-wa

**Typed:** `a young storm drake whose breath is a rolling wall of thunder`

**signature elements:** rolling wall of thunder breath [behavior] | storm-charged drake hide and wings [body] | thunderous wingbeat [aura]

**identity:** The storm drake opens with a rolling wall of thunder exhaled low and wide, flattening the field and deafening anything it does not pulp outright. Each round after, it wheels on the wing, diving to gore with horn and fang and re-laying its thunder-wall to herd prey back into the killing lane. Wary of a real threat to its hide, it retreats bloodied rather than dies for pride — but against anything it can still reach, it harries and toys, testing prey like a hawk before the final stoop.

**lore:** The storm drake whelps high in the thundering crags where squall-born lightning pricks the stone; it wants a storm-wrought territory it can call its own and a herd of screaming prey to prove it.

### The sheet

```

```

<details><summary>trace</summary>

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
[reskin] strike written from its attack: "Brand-Wake Thunder" clones "Horn" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] value check: "Brand-Wake Thunder" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Brand-Wake Thunder" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
!! Statblock generation failed: Cannot read properties of null (reading 'authoredSeat')
[harness] at timeout: {"ready":"complete","generating":false,"url":"http://localhost:5173/"}
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 1 live (live from the seat call onward)
```

</details>

## 35-thunderwall-drake

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
[reskin] word match declined by the call: energy-aura, phobia, fear-aura, truth-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:deafened" was named nearest, but the call declined it for already_answered ("already_answered") — the sheet already answers this; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: knocks creatures beneath its flight prone when it starts its turn airb)
[reskin] decline reason: trait — the call answered none and names it "already_answered"
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
[reskin] audit: [Thunder Wall (Recharge 5-6): The name promises a w…burst. (about: "each creature in a 15-foot Cone")]
[reskin] audit rename blocked — "Thunder Wall" -> "Thunder Burst" would drop the GM's own word "wall"
[reskin] [gap] leaves a thunder-charged mark in the breath's area, and the next hit on a creature standing in it discharges that mark t — "The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strikes a creature standing in that brand-wake, the horn carries the withheld thunder through it and the target is stunned until the end of its next turn." — Thunderwall Drake [seat: action [rider/on_hit/condition]] (closest offered: stunning-strike) [effect: condition] [menu: affliction contagion stunning-strike pounce composed:payoff:condition charge-push hook-rider charge isolation execute] [same-cell unoffered: life-drain snatch bolt-restrain bolt-mark] [same-seat rejected: life-drain:body-verdict snatch:engine-key bolt-restrain:host-row bolt-drag:host-row bolt-mark:host-row] [row dropped]
[reskin] [gap] knocks creatures beneath its flight prone when it starts its turn airborne — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." — Thunderwall Drake [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:deafened) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path homebrew
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 36-probe-a-young-storm-drake-whose-breath-is-a-rolling-wa

**Typed:** `a young storm drake whose breath is a rolling wall of thunder`

**signature elements:** rolling wall of thunder breath [behavior] | storm-charged drake hide and wings [body] | thunderous wingbeat [aura]

**identity:** The storm drake opens with a rolling wall of thunder exhaled low and wide, flattening the field and deafening anything it does not pulp outright. Each round after, it wheels on the wing, diving to gore with horn and fang and re-laying its thunder-wall to herd prey back into the killing lane. Wary of a real threat to its hide, it retreats bloodied rather than dies for pride — but against anything it can still reach, it harries and toys, testing prey like a hawk before the final stoop.

**lore:** The storm drake whelps high in the thundering crags where squall-born lightning pricks the stone; it wants a storm-wrought territory it can call its own and a herd of screaming prey to prove it.

### The sheet

```

```

<details><summary>trace</summary>

```
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110787734:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110787734:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110787734:663:5)
!! [ENRICHMENT] Failed to enrich Thunderwall Drake: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110787734:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110787734:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110787734:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "The drake pours its thunder low along the ground, and where the wall h" and wrote no row of that kind (refused: "Brand-Wake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: action — the first answer was refused ("Brand-Wake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine re); asking once more with the reason
[reskin] strike written from its attack: "Brand-Wake Discharge" clones "Horn" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] seat landed on the second try: action — "Brand-Wake Discharge" after ""Brand-Wake" — a trait is not a save — the save form takes stat, target and effe"
[reskin] value check: "Brand-Wake Discharge" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Brand-Wake Discharge" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
!! Statblock generation failed: Cannot read properties of null (reading 'authoredSeat')
[harness] at timeout: {"ready":"complete","generating":false,"url":"http://localhost:5173/"}
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 2 live (live from the seat call onward)
```

</details>

## 37-thunderwall-drake

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

Multiattack. The drake makes two attacks, using Horn or Charged Brand in any combination.

Horn. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Charged Brand. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target has the Stunned condition until the end of its next turn.

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
[reskin] strike written from its attack: "Charged Brand" clones "Horn" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] value check: "Charged Brand" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Charged Brand" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: truth-aura, fear-aura, energy-aura, phobia, berserk, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:poisoned" was named nearest, but the call declined it for already_answered ("already_answered") — the sheet already answers this; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: knocks creatures that crowd beneath its flight prone)
[reskin] decline reason: trait — the call answered none and names it "already_answered"
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
[reskin] save stat from print grammar: Actions/Charged Brand imposes Stunned by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Charged Brand: Stunned applied by an attack that o…unned condition until the end of its next turn."), Charged Brand: The name promises a charged/brandin…hanic the name implies. (about: "Charged Brand.")]
[reskin] audit rename held — "Charged Brand" was written for the GM's own clause (cl_v640f4: "a young storm drake whose breath is a rolling wall of thunde"), so "Thunderclap Strike" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Charged Brand" [model-written] medium weak — Stunned applied by an attack that only grants a save after the hit lands is a single-target hard CC with a built-in duration (until end of its next turn), which is legal counterplay — but the row also duplicates Horn's exact damage and adds Stunned with no limit, making the only choice between two identical-damage melee attacks trivially one-sided. — Give Charged Brand a distinct delivery or cost (e.g. a different damage split or a condition trigger) so it is not a strictly better Horn. (about: "The target has the Stunned condition until the end of its next turn.")
[reskin] [gap] knocks creatures that crowd beneath its flight prone — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." — Thunderwall Drake [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:poisoned) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] record completed: "Charged Brand" imposes Stunned by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] multiattack re-read — "Charged Brand" joins the combination; "The drake makes two attacks, using Horn or Charged Brand in any combination."
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 38-thunderwall-drake

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

Multiattack. The drake makes two attacks, using Horn or Charged Wake in any combination.

Horn. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Charged Wake. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target has the Stunned condition until the end of its next turn.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110941055:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110941055:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110941055:663:5)
!! [ENRICHMENT] Failed to enrich Thunderwall Drake: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110941055:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110941055:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110941055:663:5)
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
[reskin] strike written from its attack: "Charged Wake" clones "Horn" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] value check: "Charged Wake" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Charged Wake" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: truth-aura, fear-aura, energy-aura, phobia, berserk, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:deafened" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a start-of-turn emanation that knocks creatures beneath the drake pron)
[reskin] seat answered, but: the call said "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and crea" is carried by "Storm-Charged Passage", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Storm-Charged Passage" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Storm-Charged Passage" — a trait is not a save — the save form takes stat, target and effect as fields and th); asking once more with the reason
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: trait — first: "Storm-Charged Passage" — a trait is not a save — the save form takes stat, target and eff; second: it belongs in the description; the seat stays empty
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
[reskin] save stat from print grammar: Actions/Charged Wake imposes Stunned by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Charged Wake: Charged Wake is a duplicate of Horn …ature, it is subjected to the following effect."), Charged Wake: The save is nested inside an attack-…ing effect. *Constitution Saving Throw*: DC 15.")]
[reskin] audit defect: Actions/"Charged Wake" [model-written] medium weak — Charged Wake is a duplicate of Horn in damage and attack line, so the signature row adds nothing but a Stunned rider, leaving the drake no reason to choose it over its normal attack. — Give the row its own mechanic that expresses the charged/rolling-thunder identity rather than restating Horn's attack line. (about: "11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage. If the target is a creature, it is subjected to the following effect.")
[reskin] audit defect: Actions/"Charged Wake" [model-written] low untrackable — The save is nested inside an attack-roll hit, forcing the GM to resolve an attack, then a hit, then a second d20 saving throw per target in one row. — State the save and its scope as the row's primary resolution rather than chaining it after a hit. (about: "it is subjected to the following effect. *Constitution Saving Throw*: DC 15.")
[reskin] [gap] a start-of-turn emanation that knocks creatures beneath the drake prone — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." — Thunderwall Drake [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:deafened) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] record completed: "Charged Wake" imposes Stunned by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] multiattack re-read — "Charged Wake" joins the combination; "The drake makes two attacks, using Horn or Charged Wake in any combination."
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 39-thunderwall-drake

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

Traits

Wake of the Storm. Strength Saving Throw: DC 15, any creature that starts its turn in a 10-foot Emanation originating from the drake. Failure: The target has the Prone condition. Success: The target is immune to this drake's Wake of the Storm for 24 hours.

Actions

Multiattack. The drake makes two attacks, using Horn or Brand-Wake Thunder in any combination.

Horn. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Brand-Wake Thunder. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target has the Stunned condition until the end of its next turn.

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
!! [ENRICHMENT] Failed to enrich Thunderwall Drake: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110941055:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110941055:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795110941055:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "The drake pours its thunder low along the ground, and where the wall h" and wrote no row of that kind (refused: "Brand-Wake Charge" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description)
[reskin] seat asked again: action — the first answer was refused ("Brand-Wake Charge" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount,); asking once more with the reason
[reskin] strike written from its attack: "Brand-Wake Thunder" clones "Horn" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] seat landed on the second try: action — "Brand-Wake Thunder" after ""Brand-Wake Charge" — the call counts 1 number(s) the row promises and only 0 ar"
[reskin] value check: "Brand-Wake Thunder" EV 9.9 vs floor 9.4 (one attack of 2) — worth the trade
[reskin] row refused — the name is taken: "Brand-Wake Thunder" collides with a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:poisoned" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an aura beneath the airborne drake that damages or knocks prone creatu)
[reskin] seat answered, but: the call said "While airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Wake of the Storm", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Wake of the Storm" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Wake of the Storm" — a trait is not a save — the save form takes stat, target and effect as fields and the en); asking once more with the reason
[reskin] seat answered, but: the call said "While airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Wake of the Storm", and no such row is on this sheet — the clause stays open
[reskin] aura written from print's own form: "Wake of the Storm" — a 10-foot Emanation, Prone until the start of the target's next turn, with print's immunity line (the Ghast's Stench)
[reskin] seat landed on the second try: trait — "Wake of the Storm" after ""Wake of the Storm" — a trait is not a save — the save form takes stat, target a"
[reskin] free signature row: "Wake of the Storm" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] trait declined — the name is taken: "Wake of the Storm" already names a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one, so the row leaves and the fallback stands in
[reskin] weapons answered: Horn = none; Thunder Wall = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Wake of the Storm" [no template]
[reskin] save stat from print grammar: Actions/Brand-Wake Thunder imposes Stunned by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
audit finding below confidence gate: Thunder Wall Thunder Wall is the creature's signature rolled-thunder breath, yet it deals no Thunder-flavored condition or lingering wall effect — it is a plain damage cone that could be any breath weapon, leaving the 'wall' in the name pure flavor.
[reskin] audit: [Brand-Wake Thunder: This signature row is a near-c… 4) Piercing damage plus 7 (2d6) Thunder damage")]
[reskin] audit defect: Actions/"Brand-Wake Thunder" [model-written] medium weak — This signature row is a near-clone of Horn with only a save-or-Stun tacked on, so it adds little reason to ever pick it over two Horn attacks and its thunder 'brand' delivers nothing beyond the damage type already on Horn. — Bend the row toward the ask — a rolling thunder wall — by making it the wall's ongoing effect (a line/cone of thunder that moves or persists) rather than a single-target copy of Horn. (about: "11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage")
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] record completed: "Brand-Wake Thunder" imposes Stunned by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] multiattack re-read — "Brand-Wake Thunder" joins the combination; "The drake makes two attacks, using Horn or Brand-Wake Thunder in any combination."
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 6 live (live from the seat call onward)
```

</details>
