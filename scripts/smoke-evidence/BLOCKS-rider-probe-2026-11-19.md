# Blocks — the probes for Part 1 and Part 0

For the owner and Fable, 2026-11-19. Branch `statblock-enhancments-part-2`. Not a milestone.
**These are PROBE sheets, not the forty.** `baseline-2026-11-18` was not touched and
`BLOCKS-air-elemental-2026-11-18.md` remains the forty that matches it.

| probe | what was live | sheets |
|---|---|---|
| **Part 1** | `--live-from seat --rolls 3` on s04, s05, s09, s20, s23, s26, s27, s29, s31, s35, s39 | 33 rolls, then 6 more on s31 and s04 after the refusal redirect landed |
| **Part 0** (carried) | `--live-from audit`, 1 roll | s27, s29 — the two the last handoff asked to see in full |

Every sheet the probes made is here, the ones that threw included — none threw. Part 3 was not
built, so it has no probe sheets. See `HANDOFF-boxes-probe-2026-11-19.md` beside this file.


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

Ethereal Sight. The tollkeeper can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The tollkeeper can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The tollkeeper makes two Withering Touch attacks. It can replace one attack with a use of Restless Hex.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Restless Hex. Dexterity Saving Throw: DC 13, one creature within 60 feet. Failure: 7 (2d6) Necrotic damage, and the target is cursed. While cursed, the target gains no benefit from finishing Short Rests.

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
[reskin] lead by this seat's own clause: action — "curse" from the clause this seat serves, not the sheet's "drain"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — curse: curse-debt, delayed-brand
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: curse-debt (save/damage), delayed-brand (start_of_turn/damage), lure (save/condition)
[reskin] keys would have bound: action — active-toll, sensory-strike (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: delayed-brand, escalating-dread, sensory-strike, lure, pacify — the key word does not mean the mechanic here
[reskin] closest refused: action — "curse-debt" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: marks one target so it cannot regain hit points and takes damage at th)
[reskin] clause already answered: "tolls for the dying" is carried by "Grave Mark" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "tolls for the dying" is already carried by a row on this sheet; no second row is written for it
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "curse", the seat that carries it ended with no row, and "curse-debt" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] row kept the template's own name: action — "Ruinous Curse" is curse-debt's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] signature template: curse-debt -> Actions/"Ruinous Curse" ("The idea is a mark that forbids healing, deals Necrotic damage each turn, and tr [verb: toll:concept]")
[reskin] keys spent by the action: toll
[reskin] signature idea (trait): "A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of the clapper: a struck target that is marked as the dying cannot regain hit points for the duration of the …, and its wounds bleed black and will not close." [trait/always/defense] [family: mark] — menu: phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial, guarded-stance (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), uncanny-sense (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — resonant-body (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: kill-denial, undead-fortitude, relic-object, faultless-tracker — the key word does not mean the mechanic here
[reskin] closest refused: trait — "kill-denial" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a struck target can't regain hit points for the duration and its wound)
[reskin] clause already answered: "a chapel bell-ringer's ghost" is carried by "Ruinous Curse" — the seat read the sheet and declined to write a second row for it
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a struck target can't regain hit points for the duration and its wound") and wrote a trait instead: "Ruinous Curse" -> Traits. When the tollkeeper's Necrotic Clapper hits a creature, the target cannot regain hit points until the end of the tollkee
[reskin] authored row numbers: "Ruinous Curse" — the call declared 0 number(s) promised
[reskin] trait declined — the name is taken: "Ruinous Curse" already names a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one, so the row leaves and the fallback stands in
[reskin] weapons answered: Necrotic Clapper = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Ghost's own type stands
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Necrotic Clapper" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the tollkeeper makes two Withering Touch attacks." — the Ghost's own
[reskin] save follows the effect: Actions/"Ruinous Curse" Charisma -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in nothing — the Ghost's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Ruinous Curse.
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 7 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] asked but unanswered: "tolls for the dying" asked for at_will and no row binds the clause
[reskin] lint: 0 findings
audit finding below confidence gate: Possession (Recharge 6) The possessed tollkeeper keeps Flying with the target's Speed, but a possessed body with no wings or hover ability would fly on a borrowed Speed stat the text never reconciles — and the block's own Etherealness lets it leave the target's plane while possessing, which the possession text does not address.
[reskin] audit: [Ruinous Curse: The curse's payoff is nil in combat…get gains no benefit from finishing Short Rests"), Ruinous Curse: The curse has no duration and no en…et gains no benefit from finishing Short Rests."), Ruinous Curse: The name promises ruinous force but…e text to deliver ruin. (about: "Ruinous Curse.")]
[reskin] audit rename: "Ruinous Curse" -> "Restless Hex"
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] marks one target so it cannot regain hit points and takes damage at the start of each of its turns while the tollkeeper  — "The tollkeeper designates one living creature it can perceive as the dying, and the phantom bell tolls for it. Until the toll ends, the marked creature cannot regain hit points and takes Necrotic damage at the start of each of its turns, and the tollkeeper always knows the direction and distance to its mark. The toll ends early only if the mark dies, a cleric or paladin successfully turns the toll" — Tollkeeper of the Chapel [seat: action [action/save/condition]] (closest offered: curse-debt) [effect: condition] [menu: curse-debt delayed-brand lure pacify escalating-dread terror-pulse sensory-strike push-prone reveal execute active-toll ground-burst slow-bolt drain disarm thrown-burst-seed wind-up aggro-curse zone wail] [same-cell unoffered: swallow gaze-single snare seal shield-bash random-ray snare-bolt exploiter] [same-seat rejected: swallow:hold-shape trample:role leap:size thrown-burst:role gaze-single:body-verdict snare:role reel:role condition-payoff:needs-imposed seal:body-verdict shield-bash:role hook-drag:hold-shape pull-through:engine-key random-ray:body-verdict spew:body-verdict burrow-ambush:movement obstacle-pull:hold-shape snare-bolt:body-verdict herd:role exploiter:needs-imposed blighted-ground:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Tollkeeper of the Chapel" — donor lurker-2, CR 3
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 4 live (live from the seat call onward)
```

</details>

## 02-thunderwall-drake

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

Brand Stagger (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: The target has the Stunned condition until the end of its next turn.

Reactions

Downdraft. Trigger: A creature ends its turn beneath the airborne drake, within 15 feet of it on the ground. Response—Strength Saving Throw: DC 15, the triggering creature. Failure: The target has the Prone condition. Success: Half damage.

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
[reskin] authored row answers the GM: action — "Thunder Brand (Recharge 5-6)" was written for "a young storm drake whose breath is a rolling wall of thunder", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("leaves a thunder-charged mark in the breath's area, and the next hit o") and wrote an action instead: "Thunder Brand (Recharge 5-6)" -> Actions. *Constitution Saving Throw*: DC 15, each creature in a 15-foot Cone. *Failure:* The target has the Stunned condition unt
[reskin] authored row numbers: "Thunder Brand (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] one nova: "Thunder Brand" arrived gated on a sheet whose chassis already carries a Recharge nova — the gate leaves and the row prices at the ceiling (the wyrm's Shattering Ice Snare, step 7)
[reskin] value check: "Thunder Brand (Recharge 5-6)" EV 19.8 vs floor 9.4 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature authored: no template — the seat wrote it -> Actions/"Thunder Brand (Recharge 5-6)" ("The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strik [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: truth-aura, fear-aura, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, energy-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:poisoned" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an aura at the start of each of the drake's turns that damages or knoc)
[reskin] seat answered, but: the call said "while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Stormwake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Stormwake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Stormwake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine ren); asking once more with the reason
[reskin] seat answered, but: the call said "while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Downdraft", and no such row is on this sheet — the clause stays open
[reskin] reaction damage set aside: "Downdraft" — the call set damage on this Reaction's save, and a Reaction's damage is not counted by the sheet's CR read, so the save keeps its Prone condition and deals none (owner's hold, 2026-11-18)
[reskin] seat authored the row: trait — the call refused every template for no_fit ("an aura at the start of each of the drake's turns that damages or knoc") and wrote a trait instead: "Downdraft" -> Reactions. *Trigger:* A creature ends its turn beneath the airborne drake, within 15 feet of it on the ground. *Response—Strength S
[reskin] authored row numbers: "Downdraft" — the call declared 2 number(s) promised
[reskin] seat landed on the second try: trait — "Downdraft" after ""Stormwake" — a trait is not a save — the save form takes stat, target and effec"
[reskin] free signature row: "Downdraft" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Downdraft" ("The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are  [authored: the catalog held no shape for it]")
[reskin] weapons answered: Horn = none; Thunder Wall = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] chassis nova: "Thunder Brand (Recharge 5-6)" — the dragon-2's own nova row; geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Downdraft" [no template]
[reskin] name follows content: Actions/"Thunder Brand" carries Thunder the row never deals — "Brand Stagger" (the element word drops; the call's own noun stays)
[reskin] lint: success-damage-orphan: Reactions/Downdraft: the Success clause halves damage the Failure clause never deals — the phantom reference is stripped | dual-recharge: Two Recharge-gated entries (Thunder Wall (Recharge 5-6), Brand Stagger (Recharge 5-6)) — print never fields two; one should be 1/Day, ungated, or replaced
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Downdraft: The success branch of a save that never…on a success). (about: "*Success:* Half damage."), Brand Stagger (Recharge 5-6): Stunned removes the …unned condition until the end of its next turn."), Brand Stagger (Recharge 5-6): The action deals no …unned condition until the end of its next turn."), Downdraft: Whether a creature is 'beneath' the dra…borne drake, within 15 feet of it on the ground")]
[reskin] audit defect: Reactions/"Downdraft" [model-written] high wording — The success branch of a save that never deals damage says the target takes half damage, so the resolution is undefined. — Replace the success branch with a no-effect clause (e.g., nothing happens on a success). (about: "*Success:* Half damage.")
[reskin] audit defect: Actions/"Brand Stagger" [model-written] medium open_ended — Stunned removes the target's reactions and turn actions, so 'until the end of its next turn' never arrives for the creature to act on; the condition is effectively applied with no duration and no exit. — Anchor the duration to the end of the drake's next turn instead of the stunned creature's next turn. (about: "The target has the Stunned condition until the end of its next turn.")
[reskin] audit defect: Actions/"Brand Stagger" [model-written] medium weak — The action deals no damage and only lands one round of Stunned on a save, making it a strictly lesser pick than Thunder Wall on the same recharge; the 'brand' carries no lingering mark or teeth. — Add a damage payload or a lasting marked/penalized effect so the row has a reason to exist beside Thunder Wall. (about: "The target has the Stunned condition until the end of its next turn.")
[reskin] audit defect: Reactions/"Downdraft" [model-written] medium untrackable — Whether a creature is 'beneath' the drake depends on its horizontal position relative to the drake's space, which the table cannot reliably reconstruct from turn to turn. — Replace 'beneath the airborne drake' with a checkable area (e.g., a 15-foot Emanation or a ground area within range). (about: "A creature ends its turn beneath the airborne drake, within 15 feet of it on the ground")
[reskin] clause unresolved: "Downdraft" carries "while airborne, thunder crackles in its wake and creatur", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 03-thunderwall-drake

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

Brand-Wake Stagger (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: The target has the Stunned condition until the end of its next turn.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795101113253:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795101113253:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795101113253:663:5)
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
[reskin] authored row answers the GM: action — "Brand-Wake Charge" was written for "a young storm drake whose breath is a rolling wall of thunder", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("leaves a thunder-charged mark in the breath's area, and the next hit o") and wrote an action instead: "Brand-Wake Charge" -> Actions. *Constitution Saving Throw*: DC 15, each creature in a 15-foot Cone. *Failure:* The target has the Stunned condition unt
[reskin] authored row numbers: "Brand-Wake Charge" — the call declared (unanswered) number(s) promised
[reskin] value check: "Brand-Wake Charge (Recharge 5-6)" EV 19.8 vs floor 9.4 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature authored: no template — the seat wrote it -> Actions/"Brand-Wake Charge (Recharge 5-6)" ("The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strik [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:blinded, energy-aura, phobia, berserk, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:deafened" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a moving thunder zone under the drake's flight that knocks crowded cre)
[reskin] seat answered, but: the call said "while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Storm-Charged Wake", and no such row is on this sheet — the clause stays open
[reskin] seat answered, but: the call said "The drake's hide and wings are storm-charged and it does not land" is carried by "Storm-Charged Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Storm-Charged Wake" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Storm-Charged Wake" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount); asking once more with the reason
[reskin] seat answered, but: the call said "while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Thunderwake", and no such row is on this sheet — the clause stays open
[reskin] seat answered, but: the call said "The drake's hide and wings are storm-charged and it does not land" is carried by "Thunderwake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Thunderwake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: trait — first: "Storm-Charged Wake" — the call counts 2 number(s) the row promises and only 1 are written; second: "Thunderwake" — a trait is not a save — the save form takes stat, target and effect as fie; the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] — the model found no template that holds it (offered: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, energy-aura, phobia, berserk, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude)
[reskin] weapons answered: Horn = none; Thunder Wall = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] chassis nova: "Brand-Wake Charge (Recharge 5-6)" — the dragon-2's own nova row; geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] name follows content: Actions/"Brand-Wake Charge" promises movement the row never delivers — "Brand-Wake Stagger" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] lint: dual-recharge: Two Recharge-gated entries (Thunder Wall (Recharge 5-6), Brand-Wake Stagger (Recharge 5-6)) — print never fields two; one should be 1/Day, ungated, or replaced
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Brand-Wake Stagger (Recharge 5-6): The Stagger dea…unned condition until the end of its next turn."), Brand-Wake Stagger (Recharge 5-6): The name promis…te. (about: "Brand-Wake Stagger (Recharge 5-6)."), Brand-Wake Stagger (Recharge 5-6): The Stunned sta…unned condition until the end of its next turn.")]
[reskin] audit rename blocked — "Thunderclap Stagger" claims an element "Brand-Wake Stagger (Recharge 5-6)" does not pay (no damage)
[reskin] audit defect: Actions/"Brand-Wake Stagger" [model-written] medium weak — The Stagger deals no damage and inflicts a state the target simply walks out of at the end of its next turn, so the row is a dead payload next to Thunder Wall's 42 damage in the same cone and on the same recharge. — Give the Stagger its own teeth: add dice damage on the failure so the Stunned rider rides on a real hit rather than standing alone as the reward. (about: "The target has the Stunned condition until the end of its next turn.")
[reskin] audit defect: Actions/"Brand-Wake Stagger" [model-written] medium open_ended — The Stunned state has no repeat save, no escape DC, and no duration beyond the end of the target's next turn, and it lands with no damage, so the only response to the row is to lose a turn for free. — Anchor the Stunned to a save at the end of each of the target's turns or cap it with a fixed end condition the target can act against. (about: "The target has the Stunned condition until the end of its next turn.")
[reskin] [gap] a moving thunder zone under the drake's flight that knocks crowded creatures prone each turn — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." — Thunderwall Drake [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:deafened) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 04-thunderwall-drake

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
!! [ENRICHMENT] Failed to enrich Thunderwall Drake: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795101113253:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795101113253:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795101113253:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "The drake pours its thunder low along the ground, and where the wall h" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "The drake pours its thunder low along the ground, and where the wall h" and wrote no row of that kind (it belongs in the description)
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: it belongs in the description; the seat stays empty
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strikes a creature standing in that brand-wake, the horn carries the withheld thunder through it and the target is stunned until the end of its next turn." [rider/on_hit/condition] — the model found no template that holds it (offered: affliction, contagion, stunning-strike, pounce, composed:payoff:condition, charge-push, hook-rider, charge, isolation, execute)
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:blinded, energy-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:deafened" was named nearest, but the call declined it for already_answered ("already_answered") — the sheet already answers this; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: knocks creatures prone beneath it while it stays airborne)
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
audit finding below confidence gate: Multiattack The Multiattack offers only two Horn attacks and never integrates Thunder Wall, so the creature's signature rolling thunder wall is never part of its attack routine even though it is the thing the block is built around.
[reskin] audit: nothing flagged
[reskin] [gap] leaves a thunder-charged mark in the breath's area, and the next hit on a creature standing in it discharges that mark t — "The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strikes a creature standing in that brand-wake, the horn carries the withheld thunder through it and the target is stunned until the end of its next turn." — Thunderwall Drake [seat: action [rider/on_hit/condition]] (closest offered: stunning-strike) [effect: condition] [menu: affliction contagion stunning-strike pounce composed:payoff:condition charge-push hook-rider charge isolation execute] [same-cell unoffered: life-drain snatch bolt-restrain bolt-mark] [same-seat rejected: life-drain:body-verdict snatch:engine-key bolt-restrain:host-row bolt-drag:host-row bolt-mark:host-row] [row dropped]
[reskin] [gap] knocks creatures prone beneath it while it stays airborne — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." — Thunderwall Drake [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:deafened) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path homebrew
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 4 live (live from the seat call onward)
```

</details>

## 05-veteran-sellsword

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

Buckler Press.When the sellsword hits a creature with a Shortsword attack, the target has disadvantage on its next attack roll against the sellsword before the start of its next turn.
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
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (refused: "Feigned Rout" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Feigned Rout" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a ); asking once more with the reason
[reskin] seat answered, but: the call said "When the sellsword is Bloodied, it can Use an Action to make a tactical withdrawal: it moves up to its Speed without pro" is carried by "Feigned Rout", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a trait for "When the sellsword is Bloodied, it can Use an Action to make a tactica" and wrote no row of that kind (refused: "Feigned Rout" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: action — first: "Feigned Rout" — the row does nothing on a failed save — say what the target suffers: a co; second: "Feigned Rout" — a trait is not a save — the save form takes stat, target and effect as fi; the seat stays empty
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
[reskin] word match declined by the call: guarded-stance, evasion, pack-tactics, bloodied-fury — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: hits a target with a thrown handaxe and then closes to strike it with )
[reskin] seat answered, but: the call said "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attac" is carried by "Buckler Press", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("hits a target with a thrown handaxe and then closes to strike it with ") and wrote a trait instead: "Buckler Press" -> Traits. When the sellsword hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against
[reskin] authored row numbers: "Buckler Press" — the call declared 0 number(s) promised
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Buckler Press" ("The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attack, the target has Disadvantage on its ne [authored: the catalog held no shape for it]")
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
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Buckler Press" [no template]
[reskin] ask vs row ok: "hurls a handaxe" -> "Handaxe" — trigger at_will
[reskin] sheet lint: inline-weapon-collision: header/inline: "the sellsword" is the weapon "longsword" — its own rows will read as the weapon's
[reskin] lint: inline-weapon-collision: header/inline: "the sellsword" is the weapon "longsword" — its own rows will read as the weapon's
[reskin] element expressed: Buckler Press carries "hurling a handaxe before closing" — "When the sellsword hits a creature with a Shortsword attack"
audit finding below confidence gate: Riposte Riposte fires only when a melee attack misses, but any use of the named Handaxe attack is ambiguous about whether the ranged mode is allowed, and the reaction's payload duplicates Parry's trigger window while offering no ranged distinction.
audit finding below confidence gate: Multiattack The asked-for fantasy (hurl a handaxe and close with a shortsword) is not deliverable as rounds play: Multiattack makes three Handaxe attacks and lets one be swapped for Shortsword, but nothing makes thrown-then-melee a coherent tactical arc, and the Handaxe's Advantage rider only triggers after a hit, not after a throw.
[reskin] audit: [Shortsword: The Shortsword entry carries a thrown-…k, his handaxe returns to the sellsword's grasp"), Shortsword: Shortsword grants Advantage on its nex…inst the target before the end of its next turn"), Buckler Press: Buckler Press keys off a Shortsword…the sellsword before the start of its next turn")]
[reskin] audit defect: Actions/"Shortsword" [model-written] high other — The Shortsword entry carries a thrown-handaxe recall clause that contradicts the row's name and has no established state (no entry ever says the handaxe leaves the sellsword's grasp). — Move the handaxe-return fiction to the Handaxe (ranged) row or drop it; the Shortsword row should describe only the melee thrust. (about: "Immediately after the attack, his handaxe returns to the sellsword's grasp")
[reskin] audit defect: Actions/"Shortsword" [model-written] medium other — Shortsword grants Advantage on its next attack against the same target, but Buckler Press keys its Disadvantage rider to Shortsword hits, so the block's own chained benefit is undermined immediately and the two riders double up on one row. — Keep the Advantage rider on Handaxe (the thrown-then-close loop) and let Shortsword carry only the Buckler Press synergy, or remove the Advantage grant from Shortsword. (about: "the sellsword has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] audit defect: Traits/"Buckler Press" [model-written] low undelivered — Buckler Press keys off a Shortsword attack, but Shortsword is only ever a Multiattack replacement and the creature also has Shield Bash; the trait's trigger and the perceived 'hurling a handaxe before closing' fiction never meet, so the feature reads as a generic disadvantage rider rather than the sellsword's signature shield technique. — Reword Buckler Press to trigger when the sellsword hits with Shortsword after using Handaxe at range this turn, or tie it to Shield Bash so the shield is actually pressed. (about: "the target has Disadvantage on its next attack roll against the sellsword before the start of its next turn")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Buckler Press" carries "The sellsword's shortsword work is brutally efficient at", which matches no clause on the sheet — no coverage credit by id
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

## 06-veteran-sellsword

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

Crowding Guard.When the sellsword hits a creature with a Shortsword attack, the target has disadvantage on its next attack roll against the sellsword before the start of its next turn.
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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] word match declined by the call: bloodied-fury, death-restoration, relic-object, bound, pack-tactics — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: hits with a thrown handaxe before closing with a shortsword, a two-wea)
[reskin] seat answered, but: the call said "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attac" is carried by "Crowding Guard", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("hits with a thrown handaxe before closing with a shortsword, a two-wea") and wrote a trait instead: "Crowding Guard" -> Traits. When the sellsword hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against
[reskin] authored row numbers: "Crowding Guard" — the call declared 0 number(s) promised
[reskin] free signature row: "Crowding Guard" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Crowding Guard" ("The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attack, the target has Disadvantage on its ne [authored: the catalog held no shape for it]")
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
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Crowding Guard" [no template]
[reskin] ask vs row ok: "hurls a handaxe" -> "Handaxe" — trigger at_will
[reskin] sheet lint: inline-weapon-collision: header/inline: "the sellsword" is the weapon "longsword" — its own rows will read as the weapon's
[reskin] lint: inline-weapon-collision: header/inline: "the sellsword" is the weapon "longsword" — its own rows will read as the weapon's
[reskin] audit: [Shortsword: The Shortsword entry delivers the hand…k, his handaxe returns to the sellsword's grasp"), Shortsword: A Hit-or-Miss clause resolves after ev…an a free-floating rider. (about: "Hit or Miss:"), Crowding Guard: The trait's fiction of a guard who…e on its next attack roll against the sellsword"), Handaxe: The Handaxe grants Advantage on the sells…inst the target before the end of its next turn"), Shield Bash: The Shield Bash imposes Prone on a Me…ature within 5 feet that the sellsword can see.")]
[reskin] audit defect: Actions/"Shortsword" [model-written] high dead_reference — The Shortsword entry delivers the handaxe-return mechanic, but nothing in the block ever throws or relinquishes the handaxe (Handaxe is not a thrown-weapon action that leaves the hand, and no trait establishes a thrown handaxe state), so the clause references a state no entry creates. — Move the handaxe-return clause onto Handaxe (or drop it), so the return is tied to the thrown weapon that actually leaves the grasp. (about: "Immediately after the attack, his handaxe returns to the sellsword's grasp")
[reskin] audit defect: Actions/"Shortsword" [model-written] medium wording — A Hit-or-Miss clause resolves after every attack regardless of outcome, but it is written as a separate labelled rider with no stated effect on the attack's own result, making the timing ambiguous and the label resolve nothing in particular. — Fold the clause into the entry's normal text so its timing is explicit (after the attack, hit or miss), rather than a free-floating rider. (about: "Hit or Miss:")
[reskin] audit defect: Traits/"Crowding Guard" [model-written] medium undelivered — The trait's fiction of a guard who crowds a foe is delivered by a defensive debuff that only fires off a Shortsword hit, while the creature's name and Multiattack present it as a handaxe-then-shortsword sellsword, so the trait does not support the thrown-then-close identity the block was built to express. — Retie Crowding Guard to the Shortsword/close-combat fantasy in a way the sellsword's actual multiattack delivers, or recast it so it rewards closing after the throw. (about: "When the sellsword hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against the sellsword")
[reskin] audit defect: Actions/"Handaxe" [model-written] medium weak — The Handaxe grants Advantage on the sellsword's next attack against the target while Shortsword grants the same clause, and Multiattack resolves both before any single follow-up attack can benefit from the paired grants, so one of the two identical riders is redundant and contributes no distinct benefit at the point it is applied. — Give the thrown Handaxe and the closing Shortsword distinct riders (e.g., one grants the follow-up Advantage, the other punishes or controls) so both entries have separate table value. (about: "the sellsword has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] audit defect: Actions/"Shield Bash" [print] medium open_ended — The Shield Bash imposes Prone on a Medium or smaller target but never states a duration or the end condition, leaving the GM without a defined endpoint for the imposed state. — State the duration explicitly (e.g., until the start of the sellsword's next turn, or the target's next turn) instead of leaving the Prone open-ended. (about: "Strength Saving Throw: DC 15, one creature within 5 feet that the sellsword can see.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Crowding Guard" carries "The sellsword's shortsword work is brutally efficient at", which matches no clause on the sheet — no coverage credit by id
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

</details>

## 07-veteran-sellsword

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: applies a penalty to the victim's attack roll after the creature lands)
[reskin] seat answered, but: the call said "The sellsword's shortsword work is brutally efficient at close quarters: when it hits a creature with a Shortsword attac" is carried by "Crowded Guard", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("applies a penalty to the victim's attack roll after the creature lands") and wrote a trait instead: "Crowded Guard" -> Traits. When the sellsword hits a creature with a Shortsword attack, the target has Disadvantage on its next attack roll against
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
audit finding below confidence gate: Riposte The Riposte response triggers a Handaxe attack, but the Handaxe is written as a thrown weapon with a returning clause on the Shortsword — the reaction leaves the GM unsure whether the sellsword has an axe in hand at 5 feet.
[reskin] audit: [Shortsword: The Shortsword hit-or-miss clause tele…k, his handaxe returns to the sellsword's grasp"), Shortsword: The Shortsword grants the sellsword Ad…inst the target before the end of its next turn"), Handaxe: The Handaxe's built-in Advantage duplicat…inst the target before the end of its next turn")]
[reskin] audit defect: Actions/"Shortsword" [model-written] high dead_reference — The Shortsword hit-or-miss clause teleports the handaxe back mid-attack with no throwing or recall mechanic anywhere in the block, so the GM cannot tell when the axe was ever out of hand. — Either cut the recall clause or define a throw-and-return mechanic on the Handaxe row that this clause can resolve against. (about: "Immediately after the attack, his handaxe returns to the sellsword's grasp")
[reskin] audit defect: Actions/"Shortsword" [model-written] medium other — The Shortsword grants the sellsword Advantage on a follow-up attack while Crowded Guard already imposes Disadvantage on that same target's retaliation, giving one jab both a defensive and offensive rider with no shared cause. — Keep one rider on Shortsword — either the defensive Disadvantage or the offensive Advantage — and let Crowded Guard carry the other. (about: "the sellsword has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] audit defect: Actions/"Handaxe" [model-written] medium weak — The Handaxe's built-in Advantage duplicates the identical rider on Shortsword, so the throw's own payoff is not distinct from the follow-up melee strike. — Give the Handaxe a throw-specific payoff (reach/range consequence) rather than repeating the Shortsword's Advantage clause. (about: "and the sellsword has Advantage on its next attack roll against the target before the end of its next turn")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Crowded Guard" carries "The sellsword's shortsword work is brutally efficient at", which matches no clause on the sheet — no coverage credit by id
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

## 08-well-drowned-worm

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

Actions

Multiattack. The drowned worm makes two Coil attacks. It can replace one attack with a use of Drowned Drag.

Coil. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Drowned Drag. Strength Saving Throw: DC 14, each creature in a 30-foot Cone. Failure: The target is pulled up to 30 feet straight toward the drowned worm, and the target has the Blinded condition until the end of its next turn.

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
[reskin] seat answered, but: the call said "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victi" is carried by "Drowned Drag", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: action — the call refused every template for no_fit ("drags a grappled creature toward water, and once submerged it is blind") and wrote an action instead: "Drowned Drag" -> Actions. *Strength Saving Throw*: DC 14, one creature within 5 feet. *Failure:* The target is pulled up to 30 feet straight towar
[reskin] authored row numbers: "Drowned Drag" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Drowned Drag" after "you wrote no row of the kind asked for (an action)"
[reskin] value check: "Drowned Drag" EV 19.8 vs floor 9.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Drowned Drag" ("The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victim across the ground. If the target ends  [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The drowned worm's body is a sleeve of black brine and wet flesh that flows through any gap or crack. It can move through a space as narrow as a few inches wide without squeezing, and it can climb sheer surfaces and hang upside down from ceilings without a check." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), terrain-walk (always/movement), relentless-pursuit (always/movement)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition
[reskin] free signature row: "Slick Brine Form" — the trait seat cannot quote the GM, but the call names the element it expresses: "a body of black, brine-heavy coils". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): spider-climb -> Traits/"Slick Brine Form" ("It can move through a space as narrow as a few inches wide without squeezing, an [verb: climb:idea, climbs:idea, climbing:idea, ceilings:idea, sheer:idea, upside down:idea]")
[reskin] weapons answered: Coil = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Drowned Drag.
[reskin] free row over budget: Traits/"Slick Brine Form" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Drowned Drag" [no template]
[reskin] lint: 0 findings
[reskin] element expressed: Drowned Drag carries "dragging prey down into the well" — "The target is pulled up to 30 feet straight toward the drowned worm"
[reskin] audit: [Drowned Drag: A worm yanking prey toward itself is… worm. (about: "each creature in a 30-foot Cone"), Drowned Drag: The Blind happens after the pull, ye…linded condition until the end of its next turn")]
[reskin] audit defect: Actions/"Drowned Drag" [model-written] medium other — A worm yanking prey toward itself is a reach-scale grab, but rendering it as a 30-foot area cone means the pull drags distant creatures across open ground with nothing physically connecting them, which this body has no mechanism to perform. — Reconceive the mechanic as a drag/grab on a creature the worm already has Grappled, or otherwise ground the pull in a physical tether rather than an area centered on the worm. (about: "each creature in a 30-foot Cone")
[reskin] audit defect: Actions/"Drowned Drag" [model-written] medium undelivered — The Blind happens after the pull, yet nothing in the fiction explains why being dragged toward a worm blinds the target — the effect is a payload with no described cause, and the promised drowning-into-the-well is never delivered. — Tie the Blinded condition to a stated cause (muck, silt, water closing over the target) or replace it with a condition the drag itself justifies. (about: "the target has the Blinded condition until the end of its next turn")
[reskin] clause unresolved: "Drowned Drag" carries "The drowned worm hauls one creature it has Grappled up t", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Well Drowned Worm" — donor brute-5-grappler, CR 5
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 4 live (live from the seat call onward)
```

</details>

## 09-well-drowned-worm

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

Actions

Multiattack. The drowned worm makes two Coil attacks. It can replace one attack with a use of Drowned Drag.

Coil. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Drowned Drag. Strength Saving Throw: DC 14, each creature in a 30-foot Cone. Failure: The target is pulled up to 30 feet straight toward the drowned worm, and the target has the Blinded condition until the end of its next turn.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] seat authored the row: action — the call refused every template for no_fit ("drags a grappled creature toward water, and once submerged it is blind") and wrote an action instead: "Drowned Drag" -> Actions. *Strength Saving Throw*: DC 14, one creature within 5 feet. *Failure:* The target is pulled up to 30 feet straight towar
[reskin] authored row numbers: "Drowned Drag" — the call declared (unanswered) number(s) promised
[reskin] value check: "Drowned Drag" EV 19.8 vs floor 9.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Drowned Drag" ("The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victim across the ground. If the target ends  [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The drowned worm's body is a sleeve of black brine and wet flesh that flows through any gap or crack. It can move through a space as narrow as a few inches wide without squeezing, and it can climb sheer surfaces and hang upside down from ceilings without a check." [trait/always/movement] [family: breach] — menu: spider-climb, phobia, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial (+ shelf: weapon-lodge)
[reskin] composed candidates: none trait — the breach family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: spider-climb (always/movement), terrain-walk (always/movement), relentless-pursuit (always/movement)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=condition
[reskin] word match declined by the call: bound, terrain-walk, phobia, relentless-pursuit — the key word does not mean the mechanic here
[reskin] free signature row: "Brine Crawler" — the trait seat cannot quote the GM, but the call names the element it expresses: "a body of black, brine-heavy coils". Earns no clause credit; the homebrew path allows 1 and this is number 2
[reskin] signature template (trait): spider-climb -> Traits/"Brine Crawler" ("The worm flows through any gap or crack and can climb sheer surfaces and hang fr [verb: climb:idea, climbs:idea, climbing:idea, ceilings:idea, sheer:idea, upside down:idea]")
[reskin] weapons answered: Coil = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Drowned Drag.
[reskin] free row over budget: Traits/"Brine Crawler" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Drowned Drag" [no template]
[reskin] lint: 0 findings
[reskin] element expressed: Drowned Drag carries "dragging prey down into the well" — "The target is pulled up to 30 feet straight toward the drowned worm"
[reskin] audit: [Coil: Restrained is granted with no separate escap…ppled, the target has the Restrained condition."), Drowned Drag: The cone has no stated origin or dir…eable. (about: "each creature in a 30-foot Cone")]
[reskin] audit defect: Actions/"Coil" [catalog] medium open_ended — Restrained is granted with no separate escape or repeat condition of its own, and the only listed exit (escape DC 14) is attached to the Grappled condition, leaving the Restrained rider's termination unstated. — State that the Restrained condition ends when the escape succeeds or the grapple ends, keyed to the same escape DC. (about: "While Grappled, the target has the Restrained condition.")
[reskin] audit defect: Actions/"Drowned Drag" [model-written] medium untrackable — The cone has no stated origin or direction and the worm has no way to define where its cone begins, so the GM cannot place the area without inventing a facing rule. — Anchor the cone to the worm's space or a chosen direction so the area is placeable. (about: "each creature in a 30-foot Cone")
[reskin] clause unresolved: "Drowned Drag" carries "The drowned worm hauls one creature it has Grappled up t", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Well Drowned Worm" — donor brute-5-grappler, CR 5
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 10-well-drowned-worm

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

Flowing Brine Body. The drowned worm can climb difficult surfaces, including along ceilings, without needing to make an ability check. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The drowned worm makes two Coil attacks. It can replace one attack with a use of Well-Dread.

Coil. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Well-Dread. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Frightened condition until the end of the drowned worm's next turn. If the target was already Frightened by this ability, it also takes 18 (4d8) Psychic damage.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] free signature row: "Flowing Brine Body" — the trait seat cannot quote the GM, but the call names the element it expresses: "a body of black, brine-heavy coils". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): spider-climb -> Traits/"Flowing Brine Body" ("its body flows through gaps and cracks, climbing sheer surfaces and ceilings wit [verb: climb:idea, climbs:idea, climbing:idea, ceilings:idea, sheer:idea, upside down:idea]")
[reskin] weapons answered: Coil = none
[reskin] speed by concept: added Climb 30 ft. — the concept's movement set decides
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Creeping Dread.
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Flowing Brine Body" [trait/always/movement]
[reskin] lint: 0 findings
[reskin] element expressed: Flowing Brine Body carries "a body of black, brine-heavy coils" — "The drowned worm can climb difficult surfaces, including along ceilings, without"
[reskin] audit: [Creeping Dread: The rider keys off a target alread…e target was already Frightened by this ability")]
[reskin] audit rename: "Creeping Dread" -> "Well-Dread"
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Well-Dread) — the sameness metric
[reskin] [gap] drags a grappled creature toward water, and once submerged it is blinded and restrained until it escapes — "The drowned worm hauls one creature it has Grappled up to its speed toward the nearest body of water, dragging the victim across the ground. If the target ends this move in water deep enough to submerge it, it has the Blinded and Restrained conditions until it escapes the grapple." — Well Drowned Worm [seat: action [action/always/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider leap condition-payoff ground-burst spew escalating-dread terror-pulse thrown-burst-seed drain wind-up snare seal lure pacify snare-bolt sensory-strike] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler relentless-pursuit bound self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: throw-retrieve:requires-row zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Well Drowned Worm" — donor brute-5-grappler, CR 5
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 11-thunderwall-drake

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
[reskin] word match declined by the call: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:deafened, composed:zone:condition:blinded, energy-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:prone" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an aura that knocks creatures beneath its flight prone while it is air)
[reskin] seat answered, but: the call said "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and crea" is carried by "Stormwake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Stormwake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Stormwake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine ren); asking once more with the reason
[reskin] seat answered, but: the call said "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and crea" is carried by "Stormwake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Stormwake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: trait — first: "Stormwake" — a trait is not a save — the save form takes stat, target and effect as field; second: "Stormwake" — a trait is not a save — the save form takes stat, target and effect as field; the seat stays empty
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
[reskin] audit: [Thunder Wall (Recharge 5-6): The signature 'rollin…ashes. (about: "each creature in a 15-foot Cone")]
[reskin] audit defect: Actions/"Thunder Wall" [catalog] medium undelivered — The signature 'rolling wall of thunder' has no forced movement, no persistent wall, and no lingering state — it is a plain instantaneous cone blast with no counterplay or positional consequence, delivering nothing of the rolling wall the GM asked for. — Add a positional effect (push, knockdown, or a lingering thunder zone) so the wall rolls rather than flashes. (about: "each creature in a 15-foot Cone")
[reskin] [gap] leaves a thunder-charged mark in the breath's area, and the next hit on a creature standing in it discharges that mark t — "The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strikes a creature standing in that brand-wake, the horn carries the withheld thunder through it and the target is stunned until the end of its next turn." — Thunderwall Drake [seat: action [rider/on_hit/condition]] (closest offered: stunning-strike) [effect: condition] [menu: affliction contagion stunning-strike pounce composed:payoff:condition charge-push hook-rider charge isolation execute] [same-cell unoffered: life-drain snatch bolt-restrain bolt-mark] [same-seat rejected: life-drain:body-verdict snatch:engine-key bolt-restrain:host-row bolt-drag:host-row bolt-mark:host-row] [row dropped]
[reskin] [gap] an aura that knocks creatures beneath its flight prone while it is airborne — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." — Thunderwall Drake [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:prone — NOT ON THE MENU) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path homebrew
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 12-thunderwall-drake

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

Shrieking Brand-Wake (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: The target has the Stunned condition until the end of its next turn.

Reactions

Pressure Wake. Trigger: The drake flies at least 10 feet while airborne, passing over a creature. Response—Strength Saving Throw: DC 15, each creature beneath the drake's flight path in a 10-foot-wide Line. Failure: The target has the Prone condition.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
!! [ENRICHMENT] Failed to enrich Thunderwall Drake: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] authored row answers the GM: action — "Shrieking Brand-Wake (Recharge 5-6)" was written for "a young storm drake whose breath is a rolling wall of thunder", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("leaves a thunder-charged mark in the breath's area, and the next hit o") and wrote an action instead: "Shrieking Brand-Wake (Recharge 5-6)" -> Actions. *Constitution Saving Throw*: DC 15, each creature in a 15-foot Cone. *Failure:* The target has the Stunned condition unt
[reskin] authored row numbers: "Shrieking Brand-Wake (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] one nova: "Shrieking Brand-Wake" arrived gated on a sheet whose chassis already carries a Recharge nova — the gate leaves and the row prices at the ceiling (the wyrm's Shattering Ice Snare, step 7)
[reskin] value check: "Shrieking Brand-Wake (Recharge 5-6)" EV 19.8 vs floor 9.4 (one attack of 2) — over the ceiling — gated Recharge 5-6
[reskin] signature authored: no template — the seat wrote it -> Actions/"Shrieking Brand-Wake (Recharge 5-6)" ("The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strik [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: energy-aura, fear-aura, truth-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:poisoned" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a Cone save that knocks creatures beneath the drake's flight Prone)
[reskin] seat answered, but: the call said "while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Pressure Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Pressure Wake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Pressure Wake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine); asking once more with the reason
[reskin] seat answered, but: the call said "while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressu" is carried by "Pressure Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a Cone save that knocks creatures beneath the drake's flight Prone") and wrote a trait instead: "Pressure Wake" -> Reactions. *Trigger:* The drake flies at least 10 feet while airborne, passing over a creature. *Response—Strength Saving Throw:* D
[reskin] authored row numbers: "Pressure Wake" — the call declared 1 number(s) promised
[reskin] seat landed on the second try: trait — "Pressure Wake" after ""Pressure Wake" — a trait is not a save — the save form takes stat, target and e"
[reskin] free signature row: "Pressure Wake" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Pressure Wake" ("The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are  [authored: the catalog held no shape for it]")
[reskin] weapons answered: Horn = none; Thunder Wall = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] chassis nova: "Shrieking Brand-Wake (Recharge 5-6)" — the dragon-2's own nova row; geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Pressure Wake" [no template]
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: dual-recharge: Two Recharge-gated entries (Thunder Wall (Recharge 5-6), Shrieking Brand-Wake (Recharge 5-6)) — print never fields two; one should be 1/Day, ungated, or replaced
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element claim revoked: "Pressure Wake" claims "rolling wall of thunder breath" but the audit judged that nothing in the row carries it; the name advertises nothing, so the row stands as decoration
[reskin] sameness: 1 of 1 free row(s) express nothing their rules carry — counted as decoration ("Pressure Wake")
[reskin] audit: [Shrieking Brand-Wake (Recharge 5-6): The row deals…unned condition until the end of its next turn."), Pressure Wake: A flyby-pressure reaction that knoc…0 feet while airborne, passing over a creature."), Shrieking Brand-Wake (Recharge 5-6): The name prom… stunning shriek. (about: "Shrieking Brand-Wake")]
[reskin] audit rename blocked — "Thunder Shriek" claims an element "Shrieking Brand-Wake (Recharge 5-6)" does not pay (no damage)
[reskin] audit defect: Actions/"Shrieking Brand-Wake" [model-written] high undelivered — The row deals no damage and applies only a one-round Stun, so it is a strictly weaker choice than Thunder Wall on the same Recharge, and it was written to deliver the rolling wall of thunder breath but delivers no thunder at all. — Give the row its own damage payload or a rider that makes it worth the Recharge slot instead of a bare one-round Stun. (about: "The target has the Stunned condition until the end of its next turn.")
[reskin] audit defect: Reactions/"Pressure Wake" [model-written] medium undelivered — A flyby-pressure reaction that knocks targets Prone does not express thunder, and the row would read identically for a silent wind drake with no thunder breath at all. — Rewrite the response so its rules text carries the thunder/concussive nature the claim depends on. (about: "The drake flies at least 10 feet while airborne, passing over a creature.")
[reskin] clause unresolved: "Pressure Wake" carries "while airborne, thunder crackles in its wake and creatur", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 1 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 13-thunderwall-drake

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
!! [ENRICHMENT] Failed to enrich Thunderwall Drake: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] word match declined by the call: energy-aura, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:deafened" was named nearest, but the call declined it for already_answered ("already_answered") — the sheet already answers this; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an airborne-only pressure aura that knocks creatures beneath the drake)
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
audit finding below confidence gate: Horn The creature's horn attack carries a Thunder rider with no source of thunder in its body, so the row's fiction (a physical horn) and its damage type do not share a physical cause.
[reskin] audit: [Thunder Wall (Recharge 5-6): The signature ability…'Half damage.' (about: "*Success:* Half damage."), Thunder Wall (Recharge 5-6): The cone's origin is …drake. (about: "each creature in a 15-foot Cone")]
[reskin] audit defect: Actions/"Thunder Wall" [catalog] high undelivered — The signature ability is described as a rolling wall of thunder but is a plain instantaneous cone with no lingering wall, push, or forced-movement effect, so the GM cannot deliver the promised 'rolling wall' fiction at the table. — Give the cone a persistent push or knock-prone effect that reads as a wall moving through the targets, rather than ending with 'Half damage.' (about: "*Success:* Half damage.")
[reskin] audit defect: Actions/"Thunder Wall" [catalog] medium untrackable — The cone's origin is never stated; the entry does not say whether the cone originates from the drake, from a point in its space, or is anchored elsewhere. — State that the cone originates from the drake. (about: "each creature in a 15-foot Cone")
[reskin] [gap] leaves a thunder-charged mark in the breath's area, and the next hit on a creature standing in it discharges that mark t — "The drake pours its thunder low along the ground, and where the wall has passed the stone and soil are left shrieking with charge; the next time the drake strikes a creature standing in that brand-wake, the horn carries the withheld thunder through it and the target is stunned until the end of its next turn." — Thunderwall Drake [seat: action [rider/on_hit/condition]] (closest offered: stunning-strike) [effect: condition] [menu: affliction contagion stunning-strike pounce composed:payoff:condition charge-push hook-rider charge isolation execute] [same-cell unoffered: life-drain snatch bolt-restrain bolt-mark] [same-seat rejected: life-drain:body-verdict snatch:engine-key bolt-restrain:host-row bolt-drag:host-row bolt-mark:host-row] [row dropped]
[reskin] [gap] an airborne-only pressure aura that knocks creatures beneath the drake's flight prone — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." — Thunderwall Drake [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:deafened) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path homebrew
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 14-swarm-of-funeral-bells

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

Multiattack. The swarm makes two Tolling attacks.

Tolling. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

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
[reskin] authored row answers the GM: action — "Knelling Over the Dying (Recharge 5-6)" was written for "ring themselves over the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("imposes the Frightened and Deafened conditions on one target within ra") and wrote an action instead: "Knelling Over the Dying (Recharge 5-6)" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Knelling Over the Dying (Recharge 5-6)" — the call declared (unanswered) number(s) promised
[reskin] value check: "Knelling Over the Dying (Recharge 5-6)" EV 6.2 vs floor 23.4 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Knelling Over the Dying (Recharge 5-6)" — the ladder could not lift it; the fallback stands in
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, pounce, isolation, life-drain, charge (+ shelf: resonant-body, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), pounce (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: trait — resonant-body (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: stunning-strike, pounce, life-drain, composed:payoff:condition, charge-push, resonant-body, charge, isolation — the key word does not mean the mechanic here
[reskin] closest refused: trait — "resonant-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers an area burst of save-based damage and Deafened when another )
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (refused: "Final Rite" — the call counts 3 number(s) the row promises and only 2 are written — a promised amount, area or bonus with no number cannot be run) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Final Rite" — the call counts 3 number(s) the row promises and only 2 are written — a promised amount, area o); asking once more with the reason
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (refused: "Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: trait — first: "Final Rite" — the call counts 3 number(s) the row promises and only 2 are written — a pro; second: "Final Rite" — a trait is not a save — the save form takes stat, target and effect as fiel; the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "resonant-body" nearest and judged its subject FLIPPED against the clause (triggers an area burst of save-based damage and Deafened when another ); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key resonant-body, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "resonant-body" is keyed by the GM's ring+bell and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] — the model found no template that holds it (offered: stunning-strike, pounce, life-drain, composed:payoff:condition, charge-push, isolation, charge, resonant-body)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "ring themselves over the dying"; one targeted call with the sheet as context
[reskin] authored trait refused: "Death Knell" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence; the clause folds to description
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [], unplaced ["description:ring themselves over the dying"]
[reskin] clause answered in prose: "ring themselves over the dying" — the call read the sheet and judged it description, not a row; the words reach the description instead
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Tolling = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] immunities stamped for type: Swarm of Tiny Undead + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] name-canon stands down: the path answered homebrew on "a swarm of funeral bells that ring thems" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] vulnerability rejected — "Radiant" has no warrant in the concept's own text (print's default is none)
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 2 fixed row(s), so the free-row budget is 3 rather than 1 — the card is thin and can afford more
[reskin] lint: 0 findings
audit finding below confidence gate: Tolling The entry is named for the ringing of a bell but delivers no audible effect beyond raw damage, so the name promises a toll and the text only swings — the bell never rings anything (no sound, no dazed/deafened rider, no dying-creature trigger).
audit finding below confidence gate: Tolling A swarm of bells being wounded into ringing less weakly is backwards for the fiction — bells rung over the dying are expected to intensify, not diminish, as the creature is worn down.
[reskin] audit: nothing flagged
[reskin] [gap] triggers an area burst of save-based damage and Deafened when another creature drops to 0 HP within the swarm's reach — "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." — Swarm of Funeral Bells [seat: trait [rider/on_hit/condition]] (closest offered: resonant-body) [effect: damage] [menu: stunning-strike pounce life-drain composed:payoff:condition charge-push isolation charge resonant-body] [same-cell unoffered: affliction contagion snatch bolt-restrain bolt-mark] [same-seat rejected: affliction:cr-range contagion:requires-row hook-rider:body-verdict snatch:engine-key bolt-restrain:role bolt-drag:host-row bolt-mark:host-row] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 6 live (live from the seat call onward)
```

</details>

## 15-swarm-of-funeral-bells

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

Multiattack. The swarm makes two Tolling attacks. It can replace one attack with a use of Knelling Over the Dying.

Tolling. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Knelling Over the Dying. Wisdom Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] authored row answers the GM: action — "Knelling Over the Dying" was written for "ring themselves over the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("imposes the Frightened and Deafened conditions on one target within ra") and wrote an action instead: "Knelling Over the Dying" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Knelling Over the Dying" — the call declared (unanswered) number(s) promised
[reskin] value check: "Knelling Over the Dying" EV 49.5 vs floor 23.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Knelling Over the Dying" ("The swarm rings a single, terrible knell at one creature it can see within range. That creature must make a Wisdom saving throw; on a failure, it is Frightened  [authored: the catalog held no shape for it]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, pounce, isolation, life-drain, charge (+ shelf: resonant-body, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), pounce (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: trait — resonant-body (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: resonant-body, stunning-strike, composed:payoff:condition — the key word does not mean the mechanic here
[reskin] closest refused: trait — "resonant-body" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: triggers when a creature drops to 0 HP in the swarm's reach, hitting o)
[reskin] clause already answered: "a swarm of funeral bells" is carried by "Knelling Over the Dying" — the seat read the sheet and declined to write a second row for it
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (refused: "Knelling Over the Dying" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Knelling Over the Dying" — a trait is not a save — the save form takes stat, target and effect as fields and ); asking once more with the reason
[reskin] clause already answered: "a swarm of funeral bells" is carried by "Knelling Over the Dying" — the seat read the sheet and declined to write a second row for it
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind
[reskin] seat refused twice: trait — first: "Knelling Over the Dying" — a trait is not a save — the save form takes stat, target and e; second: you wrote no row of the kind asked for (a trait); the seat stays empty
[reskin] closest refused — subject flipped: trait — the call named "resonant-body" nearest and judged its subject FLIPPED against the clause (triggers when a creature drops to 0 HP in the swarm's reach, hitting o); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Knelling Over the Dying.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 3 fixed row(s), so the free-row budget is 2 rather than 1 — the card is thin and can afford more
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Knelling Over the Dying: The Frightened condition …tened condition until the end of its next turn."), Knelling Over the Dying: The cone has no stated or…acing. (about: "each creature in a 30-foot Cone")]
[reskin] audit defect: Actions/"Knelling Over the Dying" [model-written] medium undelivered — The Frightened condition imposed here does not prevent the target from approaching the swarm, so the bell's dread has no teeth — but more concretely the row only prolongs existing fear rather than creating it, meaning a target already Frightened has no new state imposed and a target not Frightened must be adjacent to nothing defined; the effect bears no connection to 'over the dying' as written. — Key the effect to creatures that are Bloodied or at 0 HP so the fear actually lands on the dying, and give the bell's ring something that matters on a failed save beyond a one-round condition. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] audit defect: Actions/"Knelling Over the Dying" [model-written] medium untrackable — The cone has no stated origin or facing, and the swarm is a Medium hovering body with no designated front — a GM cannot determine which creatures the cone covers without inventing the swarm's orientation. — State the cone's origin point from the swarm, or express the area as an Emanation centered on the swarm so adjudication does not require facing. (about: "each creature in a 30-foot Cone")
[reskin] [gap] triggers when a creature drops to 0 HP in the swarm's reach, hitting other creatures with a Wisdom save against Necrotic — "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." — Swarm of Funeral Bells [seat: trait [rider/on_hit/condition]] (closest offered: resonant-body) [effect: damage] [menu: stunning-strike pounce life-drain composed:payoff:condition charge-push isolation charge resonant-body] [same-cell unoffered: affliction contagion snatch bolt-restrain bolt-mark] [same-seat rejected: affliction:cr-range contagion:requires-row hook-rider:body-verdict snatch:engine-key bolt-restrain:role bolt-drag:host-row bolt-mark:host-row] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 16-swarm-of-funeral-bells

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

Multiattack. The swarm makes two Tolling attacks. It can replace one attack with a use of Death Knell.

Tolling. Melee Attack Roll: +10, reach 5 ft. 27 (5d8 + 5) Bludgeoning damage plus 18 (4d8) Necrotic damage, or 13 (3d8) Bludgeoning damage plus 9 (2d8) Necrotic damage if the swarm is Bloodied.

Death Knell. Wisdom Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

Reactions

Final Rite. Trigger: A creature within the swarm's reach drops to 0 Hit Points. Response—Wisdom Saving Throw: DC 17, each other creature of the swarm's choice within 60 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] authored row answers the GM: action — "Death Knell" was written for "ring themselves over the dying", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("imposes the Frightened and Deafened conditions on one target within ra") and wrote an action instead: "Death Knell" -> Actions. *Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* The target has the Frightened condition until the 
[reskin] authored row numbers: "Death Knell" — the call declared (unanswered) number(s) promised
[reskin] value check: "Death Knell" EV 49.5 vs floor 23.4 (one attack of 2) — widened to a 30-foot Cone (print writes this row as an area: Repulsion Breath, Blinding Breath); over the ceiling but a control row (no damage, no KO) — print leaves these ungated
[reskin] signature authored: no template — the seat wrote it -> Actions/"Death Knell" ("The swarm rings a single, terrible knell at one creature it can see within range. That creature must make a Wisdom saving throw; on a failure, it is Frightened  [authored: the catalog held no shape for it]")
[reskin] condition rider rides the attack: trait — the payoff family composes a rider, so the idea is re-seated trait/always -> rider/on_hit; a condition imposed on a hit belongs on the attack row, with print's escape DC
[reskin] signature idea (trait): "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite — each other creature of the swarm's choice within range must succeed on a Wisdom saving throw or take Necrotic damage and be Deafened until the end of its next turn as the chorus swells. The swarm cannot regain Hit Points or gain Temporary Hit Points from this, only the ringing." [rider/on_hit/condition] [family: payoff] — menu: stunning-strike, charge-push, pounce, isolation, life-drain, charge (+ shelf: resonant-body, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, evasion, relentless-pursuit, bound, guarded-stance, undead-fortitude, truth-aura, fear-aura, assassinate)
[reskin] composed candidates on the menu: trait — composed:payoff:condition (the payoff family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires on_hit/does condition; leading: stunning-strike (on_hit/condition), pounce (on_hit/condition), life-drain (on_hit/condition)
[reskin] keys would have bound: trait — resonant-body (ring, bell)
[reskin] classification handed to the fit call: mechanic=aura shape=save_single
[reskin] word match declined by the call: stunning-strike, pounce, life-drain, charge-push, isolation, charge, resonant-body — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:payoff:condition" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a passive death-triggered pulse that saves against Necrotic damage and)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Whenever a creature within the swarm's reach drops to 0 Hit Points, th" and wrote no row of that kind (refused: "Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Final Rite" — a trait is not a save — the save form takes stat, target and effect as fields and the engine re); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "Whenever a creature within the swarm's reach drops to 0 Hit Points, the swarm's bells all toll at once in a final rite —" is carried by "Final Rite", and no such row is on this sheet — the clause stays open
[reskin] reaction damage set aside: "Final Rite" — the call set damage on this Reaction's save, and a Reaction's damage is not counted by the sheet's CR read, so the save keeps its Frightened condition and deals none (owner's hold, 2026-11-18)
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a passive death-triggered pulse that saves against Necrotic damage and") and wrote a trait instead: "Final Rite" -> Reactions. *Trigger:* A creature within the swarm's reach drops to 0 Hit Points. *Response—Wisdom Saving Throw:* DC 17, each other 
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Death Knell.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 3 fixed row(s), so the free-row budget is 2 rather than 1 — the card is thin and can afford more
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 2) — "Final Rite" [no template]
[reskin] lint fixed: success-no-effect — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Final Rite carries "ringing over the dying" — "A creature within the swarm's reach drops to 0 Hit Points."
[reskin] audit: [Death Knell: A 30-foot cone of Frightened-until-en…tened condition until the end of its next turn."), Final Rite: 'each other creature of the swarm's ch…r creature of the swarm's choice within 60 feet"), Death Knell: The cone has no origin or direction —…Throw*: DC 17, each creature in a 30-foot Cone.")]
[reskin] audit defect: Actions/"Death Knell" [model-written] medium weak — A 30-foot cone of Frightened-until-end-of-next-turn is a dead payload: Frightened only imposes Disadvantage on checks and attacks while the source is in sight, and its rider leaves no lasting mark, so the row spends a Multiattack substitution on an effect weaker than simply attacking. — Give the failure a bite that matters past the target's next turn — e.g. also Deafened or a rider penalty — so replacing a Tolling attack is a real trade. (about: "The target has the Frightened condition until the end of its next turn.")
[reskin] audit defect: Reactions/"Final Rite" [model-written] high wording — 'each other creature of the swarm's choice' is ambiguous as written — it reads as either 'every creature the swarm chooses' or 'every member of the swarm,' and a swarm has no separate creatures to be 'other' than, so the GM cannot tell who is targeted. — State the targets plainly, e.g. 'each creature of the swarm's choice within 60 feet' without the word 'other.' (about: "each other creature of the swarm's choice within 60 feet")
[reskin] audit defect: Actions/"Death Knell" [model-written] medium other — The cone has no origin or direction — the single-word 'Cone' gives an area shape with no point it emanates from, and a swarm occupying another creature's space has no defined facing to anchor it. — Anchor the cone to the swarm ('a 30-foot Cone originating from the swarm') so the GM can place the area without inferring facing. (about: "*Wisdom Saving Throw*: DC 17, each creature in a 30-foot Cone.")
[reskin] clause unresolved: "Final Rite" carries "Whenever a creature within the swarm's reach drops to 0 ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] done: "Swarm of Funeral Bells" — donor swarm-9, CR 13
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 17-oathbroken-warder

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

Unprayed Strike. When the warder hits with a Mace attack, the warder can deal maximum damage instead of rolling, but he then takes Psychic damage equal to the damage dealt as the oath's silence turns inward.

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
[reskin] word match declined by the call: blood-frenzy, berserk, bloodied-fury, assassinate — the key word does not mean the mechanic here
[reskin] closest refused: trait — "blood-frenzy" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: spends its own Hit Points to deal maximum damage on a Mace hit)
[reskin] seat answered, but: the call said "The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximu" is carried by "Unprayed Strike", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("spends its own Hit Points to deal maximum damage on a Mace hit") and wrote a trait instead: "Unprayed Strike" -> Traits. When the warder hits with a Mace attack, the warder can deal maximum damage instead of rolling, but he then takes psychi
[reskin] authored row numbers: "Unprayed Strike" — the call declared 1 number(s) promised
[reskin] free signature row: "Unprayed Strike" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Unprayed Strike" ("The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he take [authored: the catalog held no shape for it]")
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
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Unprayed Strike" [no template]
[reskin] lint fixed: damage-type-caps — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit: [Unprayed Strike: The trait trades a slightly bette… takes Psychic damage equal to the damage dealt"), Unprayed Strike: The clause is flavor narration in…tence. (about: "the oath's silence turns inward"), Mace: Nothing in the block establishes why a mace …roll before the start of the warder's next turn"), Mace: The rider is a one-attack nuisance on a dama…roll before the start of the warder's next turn")]
[reskin] audit defect: Traits/"Unprayed Strike" [model-written] medium weak — The trait trades a slightly better Mace hit for the warder taking a like amount of Psychic damage, so on average it costs the creature HP to hit harder, and nothing in the block ever mitigates or rewards the self-damage for the prayerless template it is meant to express. — Give the trait a reason to be used — e.g. cap or reduce the reflected Psychic damage, or have it apply only on a trigger the GM can want — so the row is a real choice rather than a self-punishing trap. (about: "the warder can deal maximum damage instead of rolling, but he then takes Psychic damage equal to the damage dealt")
[reskin] audit defect: Traits/"Unprayed Strike" [model-written] high wording — The clause is flavor narration inside a rules trait rather than statblock language, and it carries no mechanic — the Psychic damage is already stated. — Strip the flavor clause and keep the trait to its mechanical sentence. (about: "the oath's silence turns inward")
[reskin] audit defect: Actions/"Mace" [model-written] medium undelivered — Nothing in the block establishes why a mace blow would leave a target disadvantaged on its next attack; the rider names no cause and is not delivered by any other entry, making it an unearned state with no fiction behind it. — Either tie the rider to the weapon's weight (e.g. a Staggered-style clause the trait text establishes) or remove it so the Mace is a clean bludgeoning strike. (about: "the target has Disadvantage on its next attack roll before the start of the warder's next turn")
[reskin] audit defect: Actions/"Mace" [model-written] low weak — The rider is a one-attack nuisance on a damage-dealing action, and the warder's own Multiattack already makes three such riders, so the row's fiction of a heavy templar mace promises a staggering blow and delivers a minor inconvenience. — Give the rider teeth that match the weapon — e.g. a condition that actually impedes the target for the round — or drop the rider and let the damage carry the row. (about: "the target has Disadvantage on its next attack roll before the start of the warder's next turn")
[reskin] clause unresolved: "Unprayed Strike" carries "The warder fights without a single prayer behind his mac", which matches no clause on the sheet — no coverage credit by id
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

</details>

## 18-oathbroken-warder

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

Martyr's Strike. When the warder hits with a Mace attack, the warder can choose to deal maximum damage instead of rolling, but takes Psychic damage equal to the damage dealt.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] word match declined by the call: blood-frenzy, pack-tactics, bloodied-fury, guarded-stance — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: lets the creature deal maximum damage on a hit at the cost of psychic )
[reskin] seat answered, but: the call said "The warder fights without a single prayer behind his mace. When he hits with a Mace attack, he can choose to deal maximu" is carried by "Silent Oath", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("lets the creature deal maximum damage on a hit at the cost of psychic ") and wrote a trait instead: "Silent Oath" -> Traits. When the warder hits with a Mace attack, the warder can choose to deal maximum damage instead of rolling, but takes psyc
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
audit finding below confidence gate: Shield Bash The Multiattack line permits replacing an attack with Shield Bash, but Shield Bash is a Strength save effect with no attack roll, so 'replacing an attack' with it creates ambiguity about whether the shield bash counts as one of the three named attacks for action economy.
[reskin] audit: [Silent Oath: The optional recoil is a self-inflict… takes Psychic damage equal to the damage dealt"), Silent Oath: The trait's payload is entirely self-…"takes Psychic damage equal to the damage dealt"), Silent Oath: The name promises a vow or binding me… or self-flagellant blow). (about: "Silent Oath"), Mace: The debuff applies to the target's 'next att…roll before the start of the warder's next turn"), Silent Oath: Because the Mace already has a fixed …(about: "deal maximum damage instead of rolling")]
[reskin] audit rename: "Silent Oath" -> "Martyr's Strike"
[reskin] audit defect: Actions/"Mace" [model-written] medium open_ended — The debuff applies to the target's 'next attack roll' but is defined relative to the warder's turn, so if the target makes no attack before the warder acts, it is unclear whether the Disadvantage carries over to a later turn or expires. — Clarify that the Disadvantage lasts until the start of the warder's next turn and applies to any attack roll made in that window, expiring unused. (about: "the target has Disadvantage on its next attack roll before the start of the warder's next turn")
[reskin] clause unresolved: "Martyr's Strike" carries "The warder fights without a single prayer behind his mac", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Aura of Authority" carries "templar" which is not a whole clause — the seat surgery cut it; resolved to cl_1yjcdus
[reskin] [gap] halts the movement of any creature that moves within the creature's reach, zeroing its Speed — "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during its turn must succeed on a Wisdom saving throw or have its Speed reduced to 0 until the end of that turn, as he steps into its path and cracks the offending limb." — Oathbroken Warder [seat: action [reaction/on_being_hit/movement]] (closest offered: riposte) [effect: movement] [menu: riposte answering-strike] [same-cell unoffered: none] [same-seat rejected: ward-retaliation:requires-style snap-shot:host-row interpose:requires-style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] lack took nothing: "no magic at all" removed no row and the call named no roll it spoils (costs: (unanswered)) — no flaw row, and the gap list carries it
[reskin] done: "Oathbroken Warder" — donor defender-5, CR 6
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
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

Silent Oath. When the warder hits with a Mace attack, the warder can deal maximum damage with that attack instead of rolling, but then takes Psychic damage equal to the damage dealt.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] seat answered, but: the call said "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during" is carried by "Shieldline Rebuke", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a reaction for "The warder plants his shield and dares the line to break. Each creatur" and wrote no row of that kind (refused: "Shieldline Rebuke" — the response writes a saving throw as prose — put it in the "save" object (stat, target, damage, condition, success) and the engine renders it after "Response", as print does)
[reskin] seat asked again: action — the first answer was refused ("Shieldline Rebuke" — the response writes a saving throw as prose — put it in the "save" object (stat, target,); asking once more with the reason
[reskin] seat answered, but: the call said "The warder plants his shield and dares the line to break. Each creature of his choice that moves within his reach during" is carried by "Shieldline Rebuke", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: action — the call was asked to write a reaction for "The warder plants his shield and dares the line to break. Each creatur" and wrote no row of that kind (refused: "Shieldline Rebuke" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: action — first: "Shieldline Rebuke" — the response writes a saving throw as prose — put it in the "save" o; second: "Shieldline Rebuke" — a reaction's save deals no damage here, so say what the target suffe; the seat stays empty
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
[reskin] word match declined by the call: blood-frenzy, pack-tactics, assassinate, bloodied-fury, guarded-stance — the key word does not mean the mechanic here
[reskin] closest refused: trait — "assassinate" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: on a hit, deal maximum damage instead of rolling and take psychic dama)
[reskin] seat answered, but: the call said "When he hits with a Mace attack, he can choose to deal maximum damage instead of rolling, but he takes psychic damage eq" is carried by "Silent Oath", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("on a hit, deal maximum damage instead of rolling and take psychic dama") and wrote a trait instead: "Silent Oath" -> Traits. When the warder hits with a Mace attack, the warder can deal maximum damage with that attack instead of rolling, but the
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
[reskin] element expressed: Silent Oath carries "a mace swung without a single prayer behind it" — "the warder can deal maximum damage with that attack instead of rolling, but then"
[reskin] audit: [Silent Oath: The trait has no trigger timing — it … takes Psychic damage equal to the damage dealt"), Mace: The condition is trackable but adds a second…roll before the start of the warder's next turn"), Mace: The rider is a repeatable debuff on a target…roll before the start of the warder's next turn")]
[reskin] audit defect: Traits/"Silent Oath" [model-written] medium open_ended — The trait has no trigger timing — it is unclear whether the warder chooses to deal maximum damage before or after the attack roll, nor is it clear whether the self-damage can be prevented by resistance. — State that the warder chooses when it hits, before damage is rolled, and clarify whether the Psychic damage ignores resistance. (about: "but then takes Psychic damage equal to the damage dealt")
[reskin] audit defect: Actions/"Mace" [model-written] medium weak — The condition is trackable but adds a second bookkeeping state to every Mace hit across a three-attack Multiattack, slowing the table for marginal value. — Simplify to the damage only or replace the rider with a single effect that does not require per-target turn tracking. (about: "and the target has Disadvantage on its next attack roll before the start of the warder's next turn")
[reskin] audit defect: Actions/"Mace" [model-written] low other — The rider is a repeatable debuff on a target the Mace already hits, but the fiction of a mace blow does not support a lingering will-sapping effect; the name and text describe different abilities. — Replace the Disadvantage rider with a short-duration effect that follows from bludgeoning force, such as a movement penalty or a save to maintain concentration. (about: "and the target has Disadvantage on its next attack roll before the start of the warder's next turn")
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

## 20-mirewitch-sable

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

Multiattack. Sable makes three Arcane Burst attacks. It can replace one attack with a use of Fen Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sable casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fen Hex. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: 10 (3d6) Necrotic damage, and the target is cursed. While cursed, the target can't regain Hit Points.

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
[reskin] seat authored nothing: action — the call was asked to write an action for "Sable whispers a hex into a handful of fen-water and flicks it at one " and wrote no row of that kind (refused: "Fen-Spent Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Fen-Spent Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a); asking once more with the reason
[reskin] seat authored nothing: action — the call was asked to write an action for "Sable whispers a hex into a handful of fen-water and flicks it at one " and wrote no row of that kind (refused: "Fen-Spent Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat refused twice: action — first: "Fen-Spent Hex" — the row does nothing on a failed save — say what the target suffers: a c; second: "Fen-Spent Hex" — the row does nothing on a failed save — say what the target suffers: a c; the seat stays empty
[reskin] closest refused — subject flipped: action — the call named "lure" nearest and judged its subject FLIPPED against the clause (a lasting curse that slows the target's movement and lets Sable track ); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "curse", the seat that carries it ended with no row, and "curse-debt" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] seat takes its clause: "Fen Hex" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature template: curse-debt -> Actions/"Fen Hex" ("Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, t [verb: hex:idea]")
[reskin] signature idea (trait): "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] classification handed to the fit call: shape=condition
[reskin] word match declined by the call: aberrant-ground, composed:zone:terrain, terrain-walk — the key word does not mean the mechanic here
[reskin] closest refused: trait — "aberrant-ground" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: forces a saving throw on intruders in her mire and saddles them with a)
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "Sucking Fen", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Where Sable stands, the fen answers her: the ground within a short rad" and wrote no row of that kind (refused: "Sucking Fen" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Sucking Fen" — a trait is not a save — the save form takes stat, target and effect as fields and the engine r); asking once more with the reason
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "Sucking Fen", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Where Sable stands, the fen answers her: the ground within a short rad" and wrote no row of that kind
[reskin] seat refused twice: trait — first: "Sucking Fen" — a trait is not a save — the save form takes stat, target and effect as fie; second: you wrote no row of the kind asked for (a trait); the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key terrain-walk, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "terrain-walk" is keyed by the GM's marsh and was on the call's menu, which the call read as a collision, not the mechanic; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
[reskin] signature miss: trait — "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] — the model found no template that holds it (offered: terrain-walk, aberrant-ground, relentless-pursuit, bound, phobia, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, undead-fortitude, kill-denial, berserk, composed:zone:terrain, truth-aura, fear-aura, gaze-aura)
[reskin] repair: 1 clause(s) with no row — "curses trespassers"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 0, reactions 0, answered [{"clause":"curses trespassers","row":"Fen Hex"}], unplaced []
[reskin] clause already answered: "curses trespassers" is carried by "Fen Hex" in different words — the call read the sheet and declined to answer it twice
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Brine-Clawed Hand = none; Grave-Cold Ray = none; Drowning Chill = none; Fen-Weight Curse = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon type: the call answered type_source=user for humanoid, but the GM's words do not name it — the Mage's own type stands
[reskin] print canon alignment: Neutral Evil -> Neutral — the Mage's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common and any three languages" — the Mage's
[reskin] print canon attack: "Arcane Burst" keeps print's hybrid frame — reach 5 ft. or range 120 ft. (the Mage's weapon is thrown)
[reskin] print canon attack: "Brine-Clawed Hand" -> "Arcane Burst" — the Mage's own row
[reskin] print canon multiattack: "Sable makes three Arcane Burst attacks." — the Mage's own
[reskin] ranged row off: "Grave-Cold Ray" leaves — the Mage carries no ranged row and the words name none
[reskin] save follows the effect: Actions/"Fen Hex" Charisma -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] print canon saves: proficient in INT, WIS — the Mage's own set, at this sheet's stats and PB 3 (changed INT, CHA)
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Brine-Rot Gaze" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Fen Hex.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Fen Hex: The curse has no stated duration, end con…ile cursed, the target can't regain Hit Points.")]
[reskin] audit defect: Actions/"Fen Hex" [catalog] high open_ended — The curse has no stated duration, end condition, or save-to-end clause, so the target is permanently barred from healing with no rules-legal way out. — Give the curse a fixed duration or a repeat-save / end-of-turn escape clause. (about: "the target is cursed. While cursed, the target can't regain Hit Points.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] [gap] a lasting curse that slows the target's movement and lets Sable track where it goes — "Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, the mire marks it — for the next minute, whenever the cursed creature moves on its turn, it must spend movement slogging through phantom fen, and Sable always knows which way it went and how far, hearing the bog whisper its path back to her." — Mirewitch Sable [seat: action [action/save/condition]] (closest offered: lure) [effect: condition] [menu: curse-debt delayed-brand lure pacify escalating-dread sensory-strike reveal gaze-single terror-pulse push-prone exploiter condition-payoff ground-burst slow-bolt thrown-burst-seed drain wind-up blighted-ground thrown-burst execute disarm aggro-curse zone bolt-mark wail zone-seed throw-retrieve] [same-cell unoffered: swallow snare seal shield-bash random-ray snare-bolt] [same-seat rejected: swallow:role trample:role leap:role snare:style reel:style seal:body-verdict shield-bash:role hook-drag:role active-toll:body-verdict pull-through:role random-ray:body-verdict spew:body-verdict burrow-ambush:movement obstacle-pull:hold-shape snare-bolt:body-verdict herd:body-verdict] [row dropped]
[reskin] [gap] forces a saving throw on intruders in her mire and saddles them with a lasting condition or hex — "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." — Mirewitch Sable [seat: trait [trait/always/movement]] (closest offered: aberrant-ground) [effect: condition] [menu: terrain-walk aberrant-ground relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind undead-fortitude kill-denial berserk composed:zone:terrain truth-aura fear-aura gaze-aura] [same-cell unoffered: blink spider-climb web-walker earth-glide tunneler self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:body-verdict adhesive:role spider-climb:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role mimicry:body-verdict assassinate:role blurred-form:body-verdict death-burst:body-verdict] [row dropped]
[reskin] signature outcome: 2 of 2 accepted signature pick(s) never reached the sheet — 2x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 2 of 2 (2x the call named no template for the pick) · path class_npc
[reskin] done: "Mirewitch Sable" — donor caster-8-binder, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 7 live (live from the seat call onward)
```

</details>

## 21-mirewitch-sable

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

Multiattack. Sable makes three Arcane Burst attacks. It can replace one attack with a use of Bogwhisper Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sable casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bogwhisper Hex. Strength Saving Throw: DC 14, one creature within 30 feet. Failure: The target has the Restrained condition until the end of its next turn.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
!! [ENRICHMENT] Failed to enrich Mirewitch Sable: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "Sable whispers a hex into a handful of fen-water and flicks it at one " and wrote no row of that kind (refused: "Bogwhisper Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Bogwhisper Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, ); asking once more with the reason
[reskin] authored row answers the GM: action — "Bogwhisper Hex" was written for "curses trespassers", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a lasting curse that slows the target's movement and lets Sable track ") and wrote an action instead: "Bogwhisper Hex" -> Actions. *Wisdom Saving Throw*: DC 14, one creature within 30 feet. *Failure:* The target has the Restrained condition until the 
[reskin] authored row numbers: "Bogwhisper Hex" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Bogwhisper Hex" after ""Bogwhisper Hex" — the row does nothing on a failed save — say what the target s"
[reskin] seat takes its clause: "Bogwhisper Hex" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Bogwhisper Hex" ("Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, t [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] word match declined by the call: aberrant-ground, relentless-pursuit — the key word does not mean the mechanic here
[reskin] closest refused: trait — "terrain-walk" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a ground aura of difficult mire that spares her and taxes each creatur)
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "The Fen Answers", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Where Sable stands, the fen answers her: the ground within a short rad" and wrote no row of that kind (refused: "The Fen Answers" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("The Fen Answers" — a trait is not a save — the save form takes stat, target and effect as fields and the engi); asking once more with the reason
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "The Fen Answers", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Where Sable stands, the fen answers her: the ground within a short rad" and wrote no row of that kind (refused: "The Fen Answers" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat refused twice: trait — first: "The Fen Answers" — a trait is not a save — the save form takes stat, target and effect as; second: "The Fen Answers" — a trait is not a save — the save form takes stat, target and effect as; the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit" — the GM's words key terrain-walk, which the pool did not offer for this idea's declared trigger (since 2026-10-27 the keys rank and gate but no longer inject)
[reskin] key match declined: trait — "terrain-walk" is keyed by the GM's marsh and was on the call's menu, which the call read as no fit; since 2026-10-26 the words no longer seat it first — the idea's stamps order the menu — so this records a decline, not an overruled nomination
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
[reskin] print canon saves: proficient in INT, WIS — the Mage's own set, at this sheet's stats and PB 3 (changed INT, CHA)
[reskin] print canon skills: "Perception +4, Deception +3" -> "Arcana +6, History +6, Perception +4" — the Mage's own skills, each derived from this sheet's stat and PB
[reskin] print canon: chassis row leaves — Actions/"Brine-Rot Gaze" — the Mage prints no row for it and no path stage claimed it
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] print canon row: Bonus Actions/Misty Step (3/Day) — the Mage's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Bogwhisper Hex.
[reskin] free-row budget by card size: CR 7 sits in band 6-9, where print runs 3-5 rows (p20-p90, Multiattack excluded); this card already carries 5 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] save re-derived after a retype: Actions/Bogwhisper Hex — a Wisdom save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Bogwhisper Hex: The hex is named for a curse but d…ained condition until the end of its next turn.")]
[reskin] audit rename held — "Bogwhisper Hex" was written for the GM's own clause (cl_a3qo0a: "curses trespassers"), so "Mirebind" does not land; the finding stands as logged
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] [gap] a ground aura of difficult mire that spares her and taxes each creature starting its turn there — "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." — Mirewitch Sable [seat: trait [trait/always/movement]] (closest offered: terrain-walk) [effect: movement] [menu: terrain-walk aberrant-ground relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind undead-fortitude kill-denial berserk composed:zone:terrain truth-aura fear-aura gaze-aura] [same-cell unoffered: blink spider-climb web-walker earth-glide tunneler self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:body-verdict adhesive:role spider-climb:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role mimicry:body-verdict assassinate:role blurred-form:body-verdict death-burst:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Mirewitch Sable" — donor caster-8-binder, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 6 live (live from the seat call onward)
```

</details>

## 22-mirewitch-sable

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

Sable's Sucking Fen. While a creature other than Sable is in the mire within 15 feet of her, the ground within 15 feet of Sable is difficult terrain for every creature but her; a creature that starts its turn there must spend its movement or sink, losing its Speed until the end of that turn.

Actions

Multiattack. Sable makes three Arcane Burst attacks. It can replace one attack with a use of Mire-Mark Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sable casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Mire-Mark Hex. Strength Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Restrained condition until the end of its next turn.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "Sable whispers a hex into a handful of fen-water and flicks it at one " and wrote no row of that kind (refused: "Mire-Mark Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Mire-Mark Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a); asking once more with the reason
[reskin] authored row answers the GM: action — "Mire-Mark Hex" was written for "curses trespassers", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a lasting curse that slows the target's movement and lets Sable track ") and wrote an action instead: "Mire-Mark Hex" -> Actions. *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* The target has the Restrained condition until the 
[reskin] authored row numbers: "Mire-Mark Hex" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Mire-Mark Hex" after ""Mire-Mark Hex" — the row does nothing on a failed save — say what the target su"
[reskin] seat takes its clause: "Mire-Mark Hex" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Mire-Mark Hex" ("Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, t [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, aberrant-ground, fear-aura, gaze-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:terrain" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: difficult terrain that spares her and forces a sink-or-lose-movement c)
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "Sable's Sucking Fen", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("difficult terrain that spares her and forces a sink-or-lose-movement c") and wrote a trait instead: "Sable's Sucking Fen" -> Traits. While a creature other than Sable is in the mire within 15 feet of her, the ground within 15 feet of Sable is difficult 
[reskin] authored row numbers: "Sable's Sucking Fen" — the call declared 1 number(s) promised
[reskin] seat takes its clause: "Sable's Sucking Fen" is HANDED "a marsh witch" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Sable's Sucking Fen" ("Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but [authored: the catalog held no shape for it]")
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
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Sable's Sucking Fen" [no template]
[reskin] save re-derived after a retype: Actions/Mire-Mark Hex — a Wisdom save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] element expressed: Sable's Sucking Fen carries "the fen itself rising as her weapon" — "the ground within 15 feet of Sable is difficult terrain for every creature but h"
[reskin] audit: [Sable's Sucking Fen: The trait's trigger reference…than Sable is in the mire within 15 feet of her"), Sable's Sucking Fen: The name promises a fen that …nk, losing its Speed until the end of that turn"), Sable's Sucking Fen: 'Spend its movement' has no s…iture. (about: "must spend its movement or sink"), Sable's Sucking Fen: The trait reads as a sentence… its turn there must spend its movement or sink")]
[reskin] audit rename blocked — "Clutching Muck" promises the Grappled condition that "Sable's Sucking Fen" does not deliver
[reskin] audit defect: Traits/"Sable's Sucking Fen" [model-written] high dead_reference — The trait's trigger references 'the mire', a zone the block never defines, creates, or bounds, so a GM cannot tell whether a given creature is in it. — Define the mire within the trait itself, e.g. as the ground within 15 feet of Sable, and drop the separate undefined zone reference. (about: "While a creature other than Sable is in the mire within 15 feet of her")
[reskin] audit defect: Traits/"Sable's Sucking Fen" [model-written] medium untrackable — 'Spend its movement' has no stated amount or cost, so the GM must invent how much movement avoids sinking. — State the movement cost (or the choice) explicitly as a fixed expenditure. (about: "must spend its movement or sink")
[reskin] audit defect: Traits/"Sable's Sucking Fen" [model-written] low wording — The trait reads as a sentence fragment lacking a subject-verb statement of the effect's timing as a rules entry, and the semicolon splices two unconnected rules onto one dangling clause. — Rewrite as clean declarative rules sentences, each effect its own sentence with its own timing. (about: "the ground within 15 feet of Sable is difficult terrain for every creature but her; a creature that starts its turn there must spend its movement or sink")
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Mirewitch Sable" — donor caster-8-binder, CR 7
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
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

Unbroken Line. While an ally with a shield is within 5 feet of Vashka, Vashka cannot be given the Frightened condition, and he can move only to remain beside that ally or to close back into rank; if no such ally stands beside him, this trait ends until one does.

Shield Wall. While an ally with a shield is within 5 feet of Vashka, Vashka and that ally cannot be forced to move from their spaces against their will; the protection ends for Vashka when no such ally stands beside him.

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
[reskin] clause already answered: "fights from a shield wall" is carried by "Riposte" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "fights from a shield wall" is already carried by a row on this sheet; no second row is written for it
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
[reskin] word match declined by the call: pack-tactics, bloodied-fury, death-restoration, shielded-mind, undead-fortitude, evasion, bound — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: resists being forced to move from its space while a shieldmate stands )
[reskin] seat answered, but: the call said "neither of them can be forced to move from its space against its will while the other still stands there" is carried by "Shield Wall", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("resists being forced to move from its space while a shieldmate stands ") and wrote a trait instead: "Shield Wall" -> Traits. While an ally with a shield is adjacent to Vashka, Vashka and that ally cannot be forced to move from their spaces again
[reskin] authored row numbers: "Shield Wall" — the call declared 0 number(s) promised
[reskin] free signature row: "Shield Wall" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Shield Wall" is HANDED "fights from a shield wall" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Shield Wall" ("So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share an interlocked fighting stance, and neit [authored: the catalog held no shape for it]")
[reskin] repair: 1 clause(s) with no row — "never breaks ranks"; one targeted call with the sheet as context
[reskin] repair answer: attacks 0, saves 0, traits 1, reactions 0, answered [], unplaced []
[reskin] condition relation: "Unbroken Line" — the call reads its condition as immune, so no condition is recorded against it
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
[reskin] element expressed: Shield Wall carries "holding a shield wall without breaking ranks" — "Vashka and that ally cannot be forced to move from their spaces against their wi"
[reskin] audit: [Unbroken Line: The trait restricts Vashka's moveme…ands beside him, this trait ends until one does"), Unbroken Line: The trait says it 'ends' when no sh…suming. (about: "this trait ends until one does"), Shield Wall: It is unclear whether the ally's half… for Vashka when no such ally stands beside him")]
[reskin] audit defect: Traits/"Unbroken Line" [model-written] high open_ended — The trait restricts Vashka's movement but never states an action cost, trigger, or timing for the restriction, so a GM cannot adjudicate when it applies or what 'close back into rank' permits. — State it as a passive condition on his movement (e.g., while the condition holds, his Speed can only be spent to stay within 5 feet of that ally) and drop the undefined 'close back into rank' phrasing. (about: "he can move only to remain beside that ally or to close back into rank; if no such ally stands beside him, this trait ends until one does")
[reskin] audit defect: Traits/"Unbroken Line" [model-written] medium other — The trait says it 'ends' when no shielded ally is beside him, but the fright immunity and movement clamp are the trait's entire content, so 'ends until one does' describes a state the entry never actually defines. — Rewrite the end clause so the trait is clearly conditional on the ally's presence rather than 'ending' and then resuming. (about: "this trait ends until one does")
[reskin] audit defect: Traits/"Shield Wall" [model-written] medium untrackable — It is unclear whether the ally's half of the protection persists independently once Vashka is no longer adjacent, forcing the GM to track a shared state across two creatures. — Make the protection apply to both Vashka and the ally only while they are within 5 feet of each other, ending for both simultaneously. (about: "the protection ends for Vashka when no such ally stands beside him")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_zvh3r1
[reskin] [gap] grants each nearby ally a Reaction move into position and a bonus to AC until the warlord's next turn — "Vashka barks a command over his shield rim, and any ally within earshot who can see or hear him may immediately use its Reaction to form up on his line: each such ally moves to stand shoulder to shoulder with a shieldmate, and until the start of Vashka's next turn that creature's AC is increased by the interlocked shields around it." — Vashka the Red [seat: action [action/always/defense]] (closest offered: rally) [effect: defense] [menu: throw-retrieve rally shield-bash ground-burst terror-pulse slow-bolt disarm push-prone curse-debt reveal wind-up thrown-burst execute lure pacify escalating-dread sensory-strike thrown-burst-seed] [same-cell unoffered: false-appearance shell-withdraw bloodied-fury death-restoration uncanny-sense shielded-mind evasion patient-defense sealed-body relic-object guarded-stance undead-fortitude mimicry blurred-form] [same-seat rejected: zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Vashka the Red" — donor defender-5, CR 6
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 24-vashka-the-red

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

Shield Wall. While an ally wielding a shield is within 5 feet of Vashka, Vashka and that ally cannot be forced to move from their spaces against their will, and the protection ends for Vashka when his last shield-bearing ally within 5 feet of him falls.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
!! [ENRICHMENT] Failed to enrich Vashka the Red: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:246:26)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "Vashka barks a command over his shield rim, and any ally within earsho" and wrote no row of that kind (refused: "Shield Wall Command" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount, area or bonus with no number cannot be run)
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: "Shield Wall Command" — the call counts 2 number(s) the row promises and only 1 are writte; the seat stays empty
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
[reskin] word match declined by the call: pack-tactics, bloodied-fury, shielded-mind, evasion — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: refuses forced movement while an adjacent shielded ally remains)
[reskin] seat answered, but: the call said "So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share " is carried by "Shield Wall", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("refuses forced movement while an adjacent shielded ally remains") and wrote a trait instead: "Shield Wall" -> Traits. While an ally wielding a shield is adjacent to Vashka, Vashka and that ally cannot be forced to move from their spaces a
[reskin] authored row numbers: "Shield Wall" — the call declared 0 number(s) promised
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
[reskin] element expressed: Shield Wall carries "holding a shield wall without breaking ranks" — "Vashka and that ally cannot be forced to move from their spaces against their wi"
[reskin] audit: [Shield Wall: The trait grants protection to 'that …ly wielding a shield is within 5 feet of Vashka")]
[reskin] audit defect: Traits/"Shield Wall" [model-written] high untrackable — The trait grants protection to 'that ally' but never says which ally among several shield-bearers, and the condition 'wielding a shield' requires the GM to track each ally's equipment and moving adjacency continuously. — Anchor the protection to a single named companion or to a clearly checkable condition that names which ally is protected. (about: "While an ally wielding a shield is within 5 feet of Vashka")
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

## 25-vashka-the-red

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

Shield Wall. While a shield-bearing ally is within 5 feet of Vashka, Vashka and that ally cannot be forced to move from their spaces against their will while the other remains in its space.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] clause already answered: "fights from a shield wall" is carried by "Riposte" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "fights from a shield wall" is already carried by a row on this sheet; no second row is written for it
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
[reskin] word match declined by the call: pack-tactics, bloodied-fury, death-restoration, evasion, berserk — the key word does not mean the mechanic here
[reskin] closest refused: trait — "guarded-stance" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: prevents the creature and an adjacent shielded ally from being forced )
[reskin] seat answered, but: the call said "So long as Vashka has a shieldmate adjacent to him, his shield wall holds: he and any adjacent ally with a shield share " is carried by "Shield Wall", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("prevents the creature and an adjacent shielded ally from being forced ") and wrote a trait instead: "Shield Wall" -> Traits. While a shield-bearing ally is adjacent to Vashka, Vashka and that ally cannot be forced to move from their spaces again
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
[reskin] lint: 0 findings
[reskin] element expressed: Shield Wall carries "holding a shield wall without breaking ranks" — "Vashka and that ally cannot be forced to move from their spaces against their wi"
[reskin] audit: [Shield Wall: The trait requires a shield-bearing a… shield-bearing ally is within 5 feet of Vashka"), Shield Wall: The name promises a shield wall forme…ed to move from their spaces against their will")]
[reskin] audit rename blocked — "Shield Wall" -> "Lockstep Guard" would drop the GM's own words "shield", "wall"
[reskin] audit defect: Traits/"Shield Wall" [model-written] medium untrackable — The trait requires a shield-bearing ally but nothing on the sheet defines what counts as shield-bearing or creates such an ally, so the GM cannot adjudicate the condition. — Define the ally condition concretely (e.g., an ally wielding a shield, or Vashka alone while holding its shield) so the trigger is checkable. (about: "While a shield-bearing ally is within 5 feet of Vashka")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] clause unresolved: "Shield Wall" carries "While Vashka has a shieldmate adjacent to him, the wall ", which matches no clause on the sheet — no coverage credit by id
[reskin] clause id by substring: "Riposte" carries "warlord" which is not a whole clause — the seat surgery cut it; resolved to cl_zvh3r1
[reskin] [gap] grants each nearby ally a Reaction move into position and a bonus to AC until the warlord's next turn — "Vashka barks a command over his shield rim, and any ally within earshot who can see or hear him may immediately use its Reaction to form up on his line: each such ally moves to stand shoulder to shoulder with a shieldmate, and until the start of Vashka's next turn that creature's AC is increased by the interlocked shields around it." — Vashka the Red [seat: action [action/always/defense]] (closest offered: rally) [effect: defense] [menu: throw-retrieve rally shield-bash ground-burst terror-pulse slow-bolt disarm push-prone curse-debt reveal wind-up thrown-burst execute lure pacify escalating-dread sensory-strike thrown-burst-seed] [same-cell unoffered: false-appearance shell-withdraw bloodied-fury death-restoration uncanny-sense shielded-mind evasion patient-defense sealed-body relic-object guarded-stance undead-fortitude mimicry blurred-form] [same-seat rejected: zone-seed:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path class_npc
[reskin] done: "Vashka the Red" — donor defender-5, CR 6
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

</details>

## 26-trenchsong-leviathan

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

Brine Bell Resonance. A creature that hits the leviathan with a melee attack while within 5 feet of it takes 14 (4d6) Thunder damage and has the Deafened condition until the end of its next turn.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes two Flukes attacks.

Flukes. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Bonus Actions

Drowned Attention. Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: Until the start of the leviathan's next turn, the target has Disadvantage on attack rolls against creatures other than the leviathan.

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
[reskin] word match declined by the call: composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:deafened, bloodied-burst — the key word does not mean the mechanic here
[reskin] free signature row: "Brine Bell Resonance" — the trait seat cannot quote the GM, but the call names the element it expresses: "brine-crusted trench leviathan body". Earns no clause credit; the homebrew path allows 1 and this is number 1
[reskin] signature template (trait): resonant-body -> Traits/"Brine Bell Resonance" ("The hide's brine channels ring when struck with Thunder, echoing a painful chord [verb: ring:idea, bell:idea]")
[reskin] weapons answered: Flukes = none; Drowning Hymn = none; Abyssal Refrain = none; Circle and Strike = none; Breach Slam = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Flukes" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Brine Bell Resonance" [trait/on_being_hit/damage]
[reskin] lint: 0 findings
[reskin] element expressed: Brine Bell Resonance carries "brine-crusted trench leviathan body" — "A creature that hits the leviathan with a melee attack while within 5 feet of it"
audit finding below confidence gate: Breach Slam Breach Slam is named for a breaching slam but deals no damage and only applies Prone, a condition that costs a target 15 feet of movement to stand from; with three legendary uses competing against Circle and Strike, this row has no payload worth spending a use on.
[reskin] audit: [Binding Mark: The name 'Binding Mark' promises a b…lls against creatures other than the leviathan."), Brine Bell Resonance: A creature deafened by a res…afened condition until the end of its next turn")]
[reskin] audit rename: "Binding Mark" -> "Drowned Attention"
[reskin] audit defect: Traits/"Brine Bell Resonance" [model-written] medium undelivered — A creature deafened by a resonance bell should be less able to hear the leviathan's song, but Deafened carries no interaction with the song here; the condition is applied as a pure damage rider with no sonic consequence, so the 'resonance' fiction is not mechanically present. — Either give the Deafened condition a sonic payoff against Drowning Hymn, or rename the trait to describe the briny retaliatory burst it actually delivers. (about: "takes 14 (4d6) Thunder damage and has the Deafened condition until the end of its next turn")
[reskin] seed share: 1 of 2 signature row(s) came from a seed (Drowned Attention) — the sameness metric
[reskin] [gap] a Constitution-save area burst of Thunder damage with the Deafened condition — "The leviathan's body is crusted in brine-heavy plates that split the air as it breaches. When it makes a Flukes attack, it can release that pressure in a booming pulse: each creature within a short distance must succeed on a Constitution saving throw or take Thunder damage and be Deafened until the end of its next turn." — Trenchsong Leviathan [seat: action [action/save/damage]] (closest offered: execute) [effect: condition] [menu: execute curse-debt escalating-dread terror-pulse exploiter lure pacify slow-bolt sensory-strike disarm reveal] [same-cell unoffered: trample leap thrown-burst condition-payoff active-toll ground-burst spew burrow-ambush herd thrown-burst-seed drain wind-up blighted-ground] [same-seat rejected: swallow:hold-shape trample:nova-taken leap:cr-range thrown-burst:nova-taken gaze-single:role snare:role reel:role condition-payoff:cr-range seal:role shield-bash:body-verdict hook-drag:hold-shape active-toll:nova-taken pull-through:role random-ray:body-verdict ground-burst:nova-taken spew:body-verdict burrow-ambush:cr-range obstacle-pull:role snare-bolt:role herd:body-verdict drain:body-verdict wind-up:nova-taken blighted-ground:role] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 2 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Trenchsong Leviathan" — donor brute-21, CR 24
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
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

## 27-trenchsong-leviathan

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

Multiattack. The leviathan makes two Flukes attacks. It can replace one attack with a use of Brineplate Requiem.

Flukes. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Brineplate Requiem. Constitution Saving Throw: DC 24, each creature in a 30-foot Emanation originating from the leviathan. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] authored row answers the GM: action — "Brineplate Requiem" was written for "a leviathan of the trench whose song drowns fleets", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a Constitution-save area burst of Thunder damage with the Deafened con") and wrote an action instead: "Brineplate Requiem" -> Actions. *Constitution Saving Throw*: DC 24, each creature in a 30-foot Emanation originating from the leviathan. *Failure:* 52 (
[reskin] authored row numbers: "Brineplate Requiem" — the call declared (unanswered) number(s) promised
[reskin] value check: "Brineplate Requiem" EV 100.7 vs floor 19.8 (one attack of 2) — dice 52 → 38 (scaled down to the ceiling); a nova already stands — kept ungated, dice to 38 at the ceiling
[reskin] signature authored: no template — the seat wrote it -> Actions/"Brineplate Requiem" ("The leviathan's body is crusted in brine-heavy plates that split the air as it breaches. When it makes a Flukes attack, it can release that pressure in a boomin [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike echoes from its body in a painful chord—each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its next turn." [trait/on_being_hit/condition] [family: body-reaction] — menu: bloodied-burst, weapon-lodge (+ shelf: phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] lead by this seat's own clause: trait — "burst" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — burst: bloodied-burst
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: bloodied-burst (on_being_hit/damage), composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: bloodied-burst, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:deafened — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:condition:t1:deaf" was named nearest, but the call declined it for collision ("collision") — the word suggests this mechanic and the row does not carry it; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a save for every creature near the leviathan when it takes Thunder dam)
[reskin] closest refused — subject flipped: trait — the call named "composed:body-reaction:condition:t1:deaf" nearest and judged its subject FLIPPED against the clause (a save for every creature near the leviathan when it takes Thunder dam); a row that turns the clause around is worse than no row, so the seat stays empty (the critic's §3, homebrew40 2026-11-05)
[reskin] decline reason: trait — the call answered none and names it "collision"
[reskin] signature miss: trait — "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike echoes from its body in a painful chord—each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its next turn." [trait/on_being_hit/condition] — the model found no template that holds it (offered: bloodied-burst, composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened, weapon-lodge, noxious-aura)
[reskin] weapons answered: Flukes = none; Drowning Hymn = none; Abyssal Refrain = none; Circle and Strike = none; Breach Slam = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Flukes" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] area swap gated: "Brineplate Requiem (Recharge 5-6)" deals 38 to an area in place of a 36 attack — print offers no at-will area swap that out-damages the attack it replaces (0 of its 24), so it takes print's Recharge
[reskin] multiattack replacement clause: It can replace one attack with a use of Brineplate Requiem (Recharge 5-6).
[reskin] one nova at ship: "Brineplate Requiem (Recharge 5-6)" un-gated to "Brineplate Requiem" — "Drowning Hymn" already carries this sheet's Recharge nova (un-gated by the one-nova rule — dice to 38, at or under the Multiattack sum (49); the action economy is the limit)
[reskin] area swap priced at half a hit: "Brineplate Requiem" is offered in an attack's place AT WILL and dealt 38 against a whole hit of 36; the ceiling is half a hit (18) with a save for half — print offers 15 area rows in an attack's place and none deals damage (owner's R1)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Breach Slam: Breach Slam imposes Prone with no rem…"*Failure:* The target has the Prone condition."), Brineplate Requiem: The signature row is a straigh…fened condition until the end of its next turn."), Brineplate Requiem: The name promises brine platin…c the name implies. (about: "Brineplate Requiem")]
[reskin] audit rename held — "Brineplate Requiem" was written for the GM's own clause (cl_1h1f3n8: "a leviathan of the trench whose song drowns fleets"), so "Shuddering Requiem" does not land; the finding stands as logged
[reskin] audit defect: Legendary Actions/"Breach Slam" [catalog] medium weak — Breach Slam imposes Prone with no removal from play, so its only lasting value is a one-turn save-or-Prone that the target erases by standing up on its own turn, making the legendary action not worth its use. — Give the slam a real payload beyond Prone: add damage or a movement/restraint clause that matters after the save resolves. (about: "*Failure:* The target has the Prone condition.")
[reskin] audit defect: Actions/"Brineplate Requiem" [model-written] high undelivered — The signature row is a straight copy of Drowning Hymn at smaller radius and damage, so the action written for the 'song drowns fleets' ask delivers nothing distinct and does not deliver the drowning, water, or fleet-scale fantasy the prompt names. — Differentiate the requiem from the cone hymn: make it a sustained or spreading aura/song effect that threatens creatures over time rather than a one-shot mini-hymn. (about: "*Failure:* 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn.")
[reskin] [gap] a save for every creature near the leviathan when it takes Thunder damage, Deafening those that fail, instead of only th — "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike echoes from its body in a painful chord—each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its next turn." — Trenchsong Leviathan [seat: trait [trait/on_being_hit/condition]] (closest offered: composed:body-reaction:condition:t1:deaf — NOT ON THE MENU) [effect: condition] [menu: bloodied-burst composed:body-reaction:condition:t0:poisoned composed:body-reaction:condition:t0:deafened composed:body-reaction:condition:t1:poisoned composed:body-reaction:condition:t1:deafened composed:body-reaction:condition:t2:poisoned composed:body-reaction:condition:t2:deafened weapon-lodge noxious-aura] [same-cell unoffered: none] [same-seat rejected: heated-body:body-verdict absorption:body-verdict resonant-body:condition-three-ways] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] multiattack citation synced: "Multiattack" cites each row as the row is named — a gated row reads "if available" as print writes it, an ungated row reads bare
[reskin] done: "Trenchsong Leviathan" — donor brute-21, CR 24
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 28-trenchsong-leviathan

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

Brinechime Resonance. When the leviathan takes Thunder damage, the leviathan regains the use of Drowning Hymn on a roll of 5-6.

Legendary Resistance (3/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes two Flukes attacks. It can replace one attack with a use of Brineplate Thunderclap.

Flukes. Melee Attack Roll: +16, reach 15 ft. 22 (3d8 + 9) Bludgeoning damage plus 14 (4d6) Thunder damage.

Drowning Hymn (Recharge 5-6). Constitution Saving Throw: DC 24, each creature in a 60-foot Cone. Failure: 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

Brineplate Thunderclap. Constitution Saving Throw: DC 24, each creature in a 30-foot Emanation originating from the leviathan. Failure: 18 (4d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] authored row answers the GM: action — "Brineplate Thunderclap" was written for "a leviathan of the trench whose song drowns fleets", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a Constitution-save area burst of Thunder damage with the Deafened con") and wrote an action instead: "Brineplate Thunderclap" -> Actions. *Constitution Saving Throw*: DC 24, each creature in a 30-foot Emanation originating from the leviathan. *Failure:* 52 (
[reskin] authored row numbers: "Brineplate Thunderclap" — the call declared (unanswered) number(s) promised
[reskin] value check: "Brineplate Thunderclap" EV 100.7 vs floor 19.8 (one attack of 2) — dice 52 → 38 (scaled down to the ceiling); a nova already stands — kept ungated, dice to 38 at the ceiling
[reskin] signature authored: no template — the seat wrote it -> Actions/"Brineplate Thunderclap" ("The leviathan's body is crusted in brine-heavy plates that split the air as it breaches. When it makes a Flukes attack, it can release that pressure in a boomin [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a roll of 5-6, and the sound of the strike echoes from its body in a painful chord—each creature within a short distance must succeed on a Constitution saving throw or be Deafened until the end of its next turn." [trait/on_being_hit/condition] [family: body-reaction] — menu: bloodied-burst, weapon-lodge (+ shelf: phobia, noxious-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura)
[reskin] lead by this seat's own clause: trait — "burst" from the clause this seat serves, not the sheet's "none"
[reskin] composed candidates on the menu: trait — composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:poisoned, composed:body-reaction:condition:t2:deafened (the body-reaction family's options, built before the call looks)
[reskin] declared mechanic leads the menu: trait — burst: bloodied-burst
[reskin] menu ordered by the idea's stamps: trait — idea fires on_being_hit/does condition; leading: bloodied-burst (on_being_hit/damage), composed:body-reaction:condition:t0:poisoned (on_being_hit/condition), composed:body-reaction:condition:t0:deafened (on_being_hit/condition)
[reskin] classification handed to the fit call: shape=save_area
[reskin] word match declined by the call: composed:body-reaction:condition:t0:deafened, composed:body-reaction:condition:t1:deafened, composed:body-reaction:condition:t2:deafened, composed:body-reaction:condition:t0:poisoned, composed:body-reaction:condition:t1:poisoned, composed:body-reaction:condition:t2:poisoned, bloodied-burst, weapon-lodge, noxious-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:body-reaction:condition:t0:deaf" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a thunder-struck hide that deafens every creature within a short radiu)
[reskin] seat answered, but: the call said "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it re" is carried by "Brinechime Resonance", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The leviathan's hide is ridged with brine channels that ring like a st" and wrote no row of that kind (refused: "Brinechime Resonance" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Brinechime Resonance" — a trait is not a save — the save form takes stat, target and effect as fields and the); asking once more with the reason
[reskin] Deafened swapped for Frightened: trait — the second answer was refused for Deafened alone and for nothing else, so the engine made it Frightened and kept the row (owner's ruling)
[reskin] seat answered, but: the call said "The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it re" is carried by "Brinechime Resonance / Brinechime Chord", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a thunder-struck hide that deafens every creature within a short radiu") and wrote a trait instead: "Brinechime Resonance" -> Traits. When the leviathan takes Thunder damage, the leviathan regains the use of Drowning Hymn on a roll of 5-6.
[reskin] authored row numbers: "Brinechime Resonance" — the call declared 0 number(s) promised
[reskin] seat landed on the second try: trait — "Brinechime Resonance" after ""Brinechime Resonance" — a trait is not a save — the save form takes stat, targe"
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Brinechime Resonance" ("The leviathan's hide is ridged with brine channels that ring like a struck bell. Whenever it takes Thunder damage, it regains its Drowning Hymn recharge on a ro [authored: the catalog held no shape for it]")
[reskin] weapons answered: Flukes = none; Drowning Hymn = none; Abyssal Refrain = none; Circle and Strike = none; Breach Slam = none
[reskin] chassis nova: "Drowning Hymn (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] amphibious by concept: a creature of the deep breathes both (print: the Sea Hag's)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] name-canon stands down: the path answered homebrew on "a leviathan of the trench whose song dro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] reach follows the body: Actions/"Flukes" reach 10 → 15 ft. on a Gargantuan body (print's modal reach at that size)
[reskin] area swap gated: "Brineplate Thunderclap (Recharge 5-6)" deals 38 to an area in place of a 36 attack — print offers no at-will area swap that out-damages the attack it replaces (0 of its 24), so it takes print's Recharge
[reskin] multiattack replacement clause: It can replace one attack with a use of Brineplate Thunderclap (Recharge 5-6).
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Brinechime Resonance" [no template]
[reskin] one nova at ship: "Brineplate Thunderclap (Recharge 5-6)" un-gated to "Brineplate Thunderclap" — "Drowning Hymn" already carries this sheet's Recharge nova (un-gated by the one-nova rule — dice to 38, at or under the Multiattack sum (49); the action economy is the limit)
[reskin] area swap priced at half a hit: "Brineplate Thunderclap" is offered in an attack's place AT WILL and dealt 38 against a whole hit of 36; the ceiling is half a hit (18) with a save for half — print offers 15 area rows in an attack's place and none deals damage (owner's R1)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Brinechime Resonance carries "brine-crusted trench leviathan body" — "When the leviathan takes Thunder damage, the leviathan regains the use of Drowni"
audit finding below confidence gate: Breach Slam A slam-and-pronation effect named for breaching (erupting out of the water/a surface) resolves as a flat Strength save for Prone with no damage and no breach/ramming fiction in the text.
[reskin] audit: [Brinechime Resonance: The trait's only payoff is r…gains the use of Drowning Hymn on a roll of 5-6")]
[reskin] audit defect: Traits/"Brinechime Resonance" [model-written] medium weak — The trait's only payoff is recycling Drowning Hymn's recharge, which is exactly what Drowning Hymn's own Recharge 5-6 already does at the start of every turn, so the trait adds a second identical gate the GM must track without producing any distinct effect. — Replace the recharge-refresh clause with a distinct self-buff or retaliation on taking Thunder damage so the trait does something the recharge line does not already cover. (about: "the leviathan regains the use of Drowning Hymn on a roll of 5-6")
[reskin] clause unresolved: "Brinechime Resonance" carries "The leviathan's hide is ridged with brine channels that ", which matches no clause on the sheet — no coverage credit by id
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path homebrew
[reskin] multiattack citation synced: "Multiattack" cites each row as the row is named — a gated row reads "if available" as print writes it, an ungated row reads bare
[reskin] done: "Trenchsong Leviathan" — donor brute-21, CR 24
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
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

## 29-stone-golem

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
[reskin] seat answered, but: the call said "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll agains" is carried by "Weeping Countenance", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Weeping Countenance" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Weeping Countenance" — a trait is not a save — the save form takes stat, target and effect as fields and the ); asking once more with the reason
[reskin] seat answered, but: the call said "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll agains" is carried by "Weeping Countenance", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Weeping Countenance" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Weeping Countenance" — a trait is not a save — the save form takes stat, target and effec; second: "Weeping Countenance" — a reaction's save deals no damage here, so say what the target suf; the seat stays empty
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
[reskin] audit: [Keening Glare: The entry is named a Glare but its … the mechanic. (about: "that can see or hear it"), Keening Glare: A carved stone saint with no mouth …tened condition until the end of its next turn.")]
[reskin] audit rename held — "Keening Glare" was written for the GM's own clause (cl_2cd3hd), so "Keening Wail" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Keening Glare" [model-written] low other — A carved stone saint with no mouth ("can't speak") and no stated light or voice source imposes Frightened via a keening glare whose fiction the block never supports. — Ground the effect in a described visual or sonic source consistent with a mute carved stone body. (about: "The target has the Frightened condition until the end of its next turn.")
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

## 30-stone-golem

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] seat answered, but: the call said "A creature that succeeds on this save is immune to the effect for a day." is carried by "Weeping Stone", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Weeping Stone" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Weeping Stone" — a trait is not a save — the save form takes stat, target and effect as fields and the engine); asking once more with the reason
[reskin] seat answered, but: the call said "A creature that succeeds on this save is immune to the effect for a day." is carried by "Weeping Stone", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Weeping Stone" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Weeping Stone" — a trait is not a save — the save form takes stat, target and effect as f; second: "Weeping Stone" — a reaction's save deals no damage here, so say what the target suffers a; the seat stays empty
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
[reskin] audit: [Keening Glare: The success clause grants immunity … immune to this creature's terror for 24 hours."), Keening Glare: Success is written with an unmodifi… immune to this creature's terror for 24 hours.")]
[reskin] audit defect: Actions/"Keening Glare" [model-written] high dead_reference — The success clause grants immunity to a named state ('this creature's terror') that no entry defines or creates, so the GM cannot adjudicate what the immunity actually suppresses. — Anchor the immunity to the specific condition the ability imposes (the Frightened condition from this action) rather than an undefined 'terror' state. (about: "The target is immune to this creature's terror for 24 hours.")
[reskin] audit defect: Actions/"Keening Glare" [model-written] medium wording — Success is written with an unmodified noun 'Success:' and refers to 'this creature' where the block consistently names 'the golem', giving a pronoun/format inconsistency against the surrounding official phrasing. — Rewrite the success clause in the same save-node phrasing used elsewhere and name the golem rather than 'this creature'. (about: "Success: The target is immune to this creature's terror for 24 hours.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on being hit or harmed, forces the attacker to make a Wisdom save or its attack misses/effect fails, with a day-long imm — "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll against it or otherwise harms it, the face streams visible dust like tears, and that creature must succeed on a Wisdom saving throw or have the attack miss or the effect fail as remorse breaks its concentration. A creature that succeeds on this save is immune to the effect for a day." — Stone Golem [seat: trait [trait/on_being_hit/defense]] (closest offered: resonant-body) [effect: condition] [menu: resonant-body weapon-lodge] [same-cell unoffered: absorption interpose] [same-seat rejected: heated-body:body-verdict absorption:body-verdict bloodied-burst:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Stone Golem" — donor brute-9, CR 10
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 31-stone-golem

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] seat answered, but: the call said "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll agains" is carried by "Tears of the Carved Face", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Tears of the Carved Face" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Tears of the Carved Face" — a trait is not a save — the save form takes stat, target and effect as fields and); asking once more with the reason
[reskin] seat answered, but: the call said "The golem's carved face is a channel for its grief; whenever a creature within a short range makes an attack roll agains" is carried by "Tears of the Carved Face", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The golem's carved face is a channel for its grief; whenever a creatur" and wrote no row of that kind (refused: "Tears of the Carved Face" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Tears of the Carved Face" — a trait is not a save — the save form takes stat, target and ; second: "Tears of the Carved Face" — a reaction's save deals no damage here, so say what the targe; the seat stays empty
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
[reskin] audit: [Keening Glare: The signature 'weeping saint' terro…tened condition until the end of its next turn.")]
[reskin] audit defect: Actions/"Keening Glare" [model-written] medium weak — The signature 'weeping saint' terror is a one-turn Frightened, which for a single attack-replacement round is a thin payload for a creature whose Multiattack already deals heavy damage from range. — Give the fear teeth on failure — a lasting condition or a movement/attack penalty that survives past the Frightened's end of next turn. (about: "*Failure:* The target has the Frightened condition until the end of its next turn.")
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

## 32-air-elemental

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
[reskin] seat authored the row: trait — the call refused every template for no_fit ("on a failed Strength save, drags a Frightened engulfed creature along ") and wrote a trait instead: "Howling Engulfment" -> Reactions. *Trigger:* A creature Frightened by the air elemental that is inside its reach takes the Disengage action. *Response—Str
[reskin] authored row numbers: "Howling Engulfment" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: trait — "Howling Engulfment" after ""Howling Engulfment" — a trait is not a save — the save form takes stat, target "
[reskin] free signature row: "Howling Engulfment" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Howling Engulfment" is HANDED "carries stolen voices" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Reactions/"Howling Engulfment" ("The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed  [authored: the catalog held no shape for it]")
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
[reskin] free row over budget: Reactions/"Howling Engulfment" leaves at ship — this sheet's free-row budget (1) is spent by a row that SHIPPED
[reskin] free-row budget: 2 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Stolen Voices" [action/save/condition]
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Stolen Voices: The bonus payload repeats the Frigh… ability, it also takes 9 (2d8) Thunder damage.")]
[reskin] audit defect: Actions/"Stolen Voices" [model-written] medium undelivered — The bonus payload repeats the Frightened condition rather than delivering the stolen-voice fiction: the action is named for carrying stolen voices but its mechanics only frighten and then chip damage, with nothing that expresses a voice, sound, or the carried-voice premise. — Rewrite the rider so the second application actually expresses the stolen voices (e.g., a save-penalty or a thunder-voiced effect), so the name's promise is mechanically delivered. (about: "If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path twist
[reskin] done: "Air Elemental" — donor brute-5, CR 5
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 33-air-elemental

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
audit finding below confidence gate: Whirlwind Double space after the italicized Failure label is a stray whitespace artifact in the published-format text.
[reskin] audit: [Stolen Voices: The bonus-damage clause keys off an… ability, it also takes 9 (2d8) Thunder damage.")]
[reskin] audit defect: Actions/"Stolen Voices" [model-written] medium untrackable — The bonus-damage clause keys off an existing Frightened state whose only creation is this same ability's own one-round Frightened, so the rider fires only on a second use while the first is still live and its whole value depends on tracking a prior application rather than a lasting condition. — Make the extra effect stand on its own as part of the failed save rather than conditioning it on a prior application of the same ability. (about: "If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] on a failed Strength save, drags a Frightened engulfed creature along with the elemental's movement — "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and takes the Disengage action must succeed on a Strength saving throw; on a failure it is dragged along in the elemental's wake, moving with it when the elemental moves, and it remains engulfed until it is no longer Frightened or the elemental lets it go." — Air Elemental [seat: trait [trait/always/movement]] (closest offered: mimicry) [effect: movement] [menu: relentless-pursuit bound phobia bloodied-fury blood-frenzy pack-tactics death-restoration berserk shielded-mind undead-fortitude mimicry truth-aura fear-aura] [same-cell unoffered: blink spider-climb terrain-walk aberrant-ground web-walker earth-glide tunneler self-invisibility rally focus feint-slip phase-slip] [same-seat rejected: false-appearance:body-verdict adhesive:body-verdict spider-climb:body-verdict terrain-walk:body-verdict aberrant-ground:body-verdict faultless-tracker:body-verdict web-walker:body-verdict uncanny-sense:body-verdict earth-glide:movement tunneler:movement evasion:role marking-light:body-verdict sealed-body:body-verdict relic-object:body-verdict guarded-stance:role assassinate:role blurred-form:role death-burst:body-verdict kill-denial:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Air Elemental" — donor brute-5, CR 5
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 3 live (live from the seat call onward)
```

</details>

## 34-air-elemental

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
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] seat answered, but: the call said "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and " is carried by "Gale Abduction", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's howling wind-body engulfs its prey. A creature Frighte" and wrote no row of that kind (refused: "Gale Abduction" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Gale Abduction" — a trait is not a save — the save form takes stat, target and effect as fields and the engin); asking once more with the reason
[reskin] seat answered, but: the call said "The elemental's howling wind-body engulfs its prey. A creature Frightened by the elemental that is inside its reach and " is carried by "Gale Abduction", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The elemental's howling wind-body engulfs its prey. A creature Frighte" and wrote no row of that kind (refused: "Gale Abduction" — a reaction's save deals no damage here, so say what the target suffers as a condition or a forced movement, or write the response with no save)
[reskin] seat refused twice: trait — first: "Gale Abduction" — a trait is not a save — the save form takes stat, target and effect as ; second: "Gale Abduction" — a reaction's save deals no damage here, so say what the target suffers ; the seat stays empty
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
[reskin] audit: [Stolen Voices: The signature ability's Thunder pay… ability, it also takes 9 (2d8) Thunder damage.")]
[reskin] audit defect: Actions/"Stolen Voices" [model-written] medium weak — The signature ability's Thunder payload only fires on a target already Frightened by the same ability, but Frightened lasts only until the end of the elemental's next turn, so the second use in a single turn from Multiattack's replacement clause can never reach the damage branch and the row is a pure Frightened rider with a dead half. — Make the damage branch trigger on a target Frightened by any source, or open with damage and let the repeated use add the Frightened condition, so both halves of the row can actually fire. (about: "If the target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.")
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

## 35-tollkeeper-of-the-chapel

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

Iron Clapper. When the tollkeeper's Withering Touch attack hits a creature that has heard its bell, the target cannot regain Hit Points for 1 minute, and its wounds bleed black and will not close.

Ethereal Sight. The tollkeeper can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The tollkeeper can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The tollkeeper makes two Withering Touch attacks. It can replace one attack with a use of Ruinous Curse.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Ruinous Curse. Dexterity Saving Throw: DC 13, one creature within 60 feet. Failure: 7 (2d6) Necrotic damage, and the target is cursed. While cursed, the target gains no benefit from finishing Short Rests.

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
[reskin] lead by this seat's own clause: action — "curse" from the clause this seat serves, not the sheet's "drain"
[reskin] composed candidates: none action — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: action — curse: curse-debt, delayed-brand
[reskin] menu ordered by the idea's stamps: action — idea fires save/does condition; leading: curse-debt (save/damage), delayed-brand (start_of_turn/damage), lure (save/condition)
[reskin] keys would have bound: action — active-toll, sensory-strike (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: delayed-brand, escalating-dread, sensory-strike, lure, pacify — the key word does not mean the mechanic here
[reskin] closest refused: action — "curse-debt" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: marks one target so it cannot regain hit points and takes damage at th)
[reskin] clause already answered: "tolls for the dying" is carried by "Grave Mark" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "tolls for the dying" is already carried by a row on this sheet; no second row is written for it
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "curse", the seat that carries it ended with no row, and "curse-debt" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] row kept the template's own name: action — "Ruinous Curse" is curse-debt's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] signature template: curse-debt -> Actions/"Ruinous Curse" ("The idea is a mark that forbids healing, deals Necrotic damage each turn, and tr [verb: toll:concept]")
[reskin] keys spent by the action: toll
[reskin] signature idea (trait): "A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of the clapper: a struck target that is marked as the dying cannot regain hit points for the duration of the …, and its wounds bleed black and will not close." [trait/always/defense] [family: mark] — menu: phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial, guarded-stance (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), uncanny-sense (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — resonant-body (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: kill-denial, resonant-body, fear-aura, bloodied-fury, undead-fortitude — the key word does not mean the mechanic here
[reskin] closest refused: trait — "kill-denial" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: blocks hit point recovery of a marked wounded target rather than preve)
[reskin] seat answered, but: the call said "A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of" is carried by "Cold Iron Clapper", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("blocks hit point recovery of a marked wounded target rather than preve") and wrote a trait instead: "Cold Iron Clapper" -> Traits. When the tollkeeper's Necrotic Clapper attack hits a creature that has heard its bell, the target cannot regain hit poin
[reskin] authored row numbers: "Cold Iron Clapper" — the call declared 1 number(s) promised
[reskin] free signature row: "Cold Iron Clapper" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Cold Iron Clapper" is HANDED "tolls for the dying" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Cold Iron Clapper" ("A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of the clapper: a struck target that is ma [authored: the catalog held no shape for it]")
[reskin] weapons answered: Necrotic Clapper = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Ghost's own type stands
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Necrotic Clapper" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the tollkeeper makes two Withering Touch attacks." — the Ghost's own
[reskin] save follows the effect: Actions/"Ruinous Curse" Charisma -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in nothing — the Ghost's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Ruinous Curse.
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 7 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Cold Iron Clapper" [no template]
[reskin] 2024 caps: "Cold Iron Clapper" — a condition or game term shipped lowercase
[reskin] row binds its clause: "Ruinous Curse" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "tolls for the dying" -> "Ruinous Curse" — trigger at_will
[reskin] name follows content: Traits/"Cold Iron Clapper" carries Cold the row never deals — "Iron Clapper" (the element word drops; the call's own noun stays)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: nothing flagged
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] marks one target so it cannot regain hit points and takes damage at the start of each of its turns while the tollkeeper  — "The tollkeeper designates one living creature it can perceive as the dying, and the phantom bell tolls for it. Until the toll ends, the marked creature cannot regain hit points and takes Necrotic damage at the start of each of its turns, and the tollkeeper always knows the direction and distance to its mark. The toll ends early only if the mark dies, a cleric or paladin successfully turns the toll" — Tollkeeper of the Chapel [seat: action [action/save/condition]] (closest offered: curse-debt) [effect: condition] [menu: curse-debt delayed-brand lure pacify escalating-dread terror-pulse sensory-strike push-prone reveal execute active-toll ground-burst slow-bolt drain disarm thrown-burst-seed wind-up aggro-curse zone wail] [same-cell unoffered: swallow gaze-single snare seal shield-bash random-ray snare-bolt exploiter] [same-seat rejected: swallow:hold-shape trample:role leap:size thrown-burst:role gaze-single:body-verdict snare:role reel:role condition-payoff:needs-imposed seal:body-verdict shield-bash:role hook-drag:hold-shape pull-through:engine-key random-ray:body-verdict spew:body-verdict burrow-ambush:movement obstacle-pull:hold-shape snare-bolt:body-verdict herd:role exploiter:needs-imposed blighted-ground:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Tollkeeper of the Chapel" — donor lurker-2, CR 3
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 4 live (live from the seat call onward)
```

</details>

## 36-tollkeeper-of-the-chapel

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

Congealed Tithe. Once per turn, a creature that can hear the tollkeeper's bell is hit by its Withering Touch, the struck creature cannot regain Hit Points until the end of its next turn, and its wounds bleed black.

Ethereal Sight. The tollkeeper can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The tollkeeper can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The tollkeeper makes two Withering Touch attacks. It can replace one attack with a use of Ruinous Curse.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Ruinous Curse. Dexterity Saving Throw: DC 13, one creature within 60 feet. Failure: 7 (2d6) Necrotic damage, and the target is cursed. While cursed, the target gains no benefit from finishing Short Rests.

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
!! [ENRICHMENT] Failed to enrich Tollkeeper of the Chapel: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] clause already answered: "tolls for the dying" is carried by "Grave Mark" — the seat read the sheet and declined to write a second row for it
[reskin] seat stands down: action — "tolls for the dying" is already carried by a row on this sheet; no second row is written for it
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "curse", the seat that carries it ended with no row, and "curse-debt" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] row kept the template's own name: action — "Ruinous Curse" is curse-debt's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] signature template: curse-debt -> Actions/"Ruinous Curse" ("The idea is a mark that forbids healing, deals Necrotic damage each turn, and tr [verb: toll:concept]")
[reskin] keys spent by the action: toll
[reskin] signature idea (trait): "A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of the clapper: a struck target that is marked as the dying cannot regain hit points for the duration of the …, and its wounds bleed black and will not close." [trait/always/defense] [family: mark] — menu: phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial, guarded-stance (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), uncanny-sense (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — resonant-body (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: relic-object, kill-denial, blood-frenzy — the key word does not mean the mechanic here
[reskin] closest refused: trait — "kill-denial" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: seals a hit target's wounds so it can't regain hit points until the du)
[reskin] seat answered, but: the call said "A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of" is carried by "Congealed Tithe", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("seals a hit target's wounds so it can't regain hit points until the du") and wrote a trait instead: "Congealed Tithe" -> Traits. Once per turn, a creature that can hear the tollkeeper's bell is hit by its Necrotic Clapper, the struck creature cannot
[reskin] authored row numbers: "Congealed Tithe" — the call declared 0 number(s) promised
[reskin] free signature row: "Congealed Tithe" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Congealed Tithe" is HANDED "tolls for the dying" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Congealed Tithe" ("A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of the clapper: a struck target that is ma [authored: the catalog held no shape for it]")
[reskin] weapons answered: Necrotic Clapper = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Ghost's own type stands
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Necrotic Clapper" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the tollkeeper makes two Withering Touch attacks." — the Ghost's own
[reskin] save follows the effect: Actions/"Ruinous Curse" Charisma -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in nothing — the Ghost's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Ruinous Curse.
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 7 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Congealed Tithe" [no template]
[reskin] row binds its clause: "Ruinous Curse" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "tolls for the dying" -> "Ruinous Curse" — trigger at_will
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: Congealed Tithe carries "marks one living soul as the dying" — "the struck creature cannot regain Hit Points until the end of its next turn"
[reskin] audit: [Ruinous Curse: The curse has no stated duration or…et gains no benefit from finishing Short Rests."), Congealed Tithe: The trait gives no timing, no tri…d of its next turn, and its wounds bleed black."), Congealed Tithe: The trigger rests on 'the tollkee… a creature that can hear the tollkeeper's bell"), Congealed Tithe: Blocking healing for a single rou…egain Hit Points until the end of its next turn")]
[reskin] audit defect: Actions/"Ruinous Curse" [catalog] high open_ended — The curse has no stated duration or end condition, so a creature that fails the save is permanently barred from Short Rest benefits with no rules-legal way to clear it. — Give the curse a fixed duration or an end condition (e.g., a repeat save, or 'until the tollkeeper dies or is reduced to 0 Hit Points'). (about: "While cursed, the target gains no benefit from finishing Short Rests.")
[reskin] audit defect: Traits/"Congealed Tithe" [model-written] high untrackable — The trait gives no timing, no trigger, and no target selection: it is unclear whether this fires when the tollkeeper itself hits with Withering Touch, whether it is a separate free attack each turn, or whether it procs off a bell sound that no action creates. — Rewrite as a rider triggered on a specific event (e.g., 'When the tollkeeper hits a creature with Withering Touch') with a stated target. (about: "Once per turn, a creature that can hear the tollkeeper's bell is hit by its Withering Touch, the struck creature cannot regain Hit Points until the end of its next turn, and its wounds bleed black.")
[reskin] audit defect: Traits/"Congealed Tithe" [model-written] high dead_reference — The trigger rests on 'the tollkeeper's bell,' but no entry on the sheet ever has the tollkeeper ring, toll, or produce a bell sound, so the condition it depends on is never created by the block. — Either fold the bell toll into a stated action/timing on this sheet, or replace the hearing-the-bell trigger with a concrete event the block already defines. (about: "Once per turn, a creature that can hear the tollkeeper's bell")
[reskin] audit defect: Traits/"Congealed Tithe" [model-written] medium weak — Blocking healing for a single round on a creature that is simultaneously taking Necrotic damage is a nuisance payload with no teeth; the fiction of a death-toll bell promises a threat the row does not deliver. — Give the toll a concrete consequence the table can feel (a condition, a debuff, or a lasting mark), not just a one-round no-heal. (about: "the struck creature cannot regain Hit Points until the end of its next turn")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] marks one target so it cannot regain hit points and takes damage at the start of each of its turns while the tollkeeper  — "The tollkeeper designates one living creature it can perceive as the dying, and the phantom bell tolls for it. Until the toll ends, the marked creature cannot regain hit points and takes Necrotic damage at the start of each of its turns, and the tollkeeper always knows the direction and distance to its mark. The toll ends early only if the mark dies, a cleric or paladin successfully turns the toll" — Tollkeeper of the Chapel [seat: action [action/save/condition]] (closest offered: curse-debt) [effect: condition] [menu: curse-debt delayed-brand lure pacify escalating-dread terror-pulse sensory-strike push-prone reveal execute active-toll ground-burst slow-bolt drain disarm thrown-burst-seed wind-up aggro-curse zone wail] [same-cell unoffered: swallow gaze-single snare seal shield-bash random-ray snare-bolt exploiter] [same-seat rejected: swallow:hold-shape trample:role leap:size thrown-burst:role gaze-single:body-verdict snare:role reel:role condition-payoff:needs-imposed seal:body-verdict shield-bash:role hook-drag:hold-shape pull-through:engine-key random-ray:body-verdict spew:body-verdict burrow-ambush:movement obstacle-pull:hold-shape snare-bolt:body-verdict herd:role exploiter:needs-imposed blighted-ground:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Tollkeeper of the Chapel" — donor lurker-2, CR 3
[harness] enrichment not run (2 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 4 live (live from the seat call onward)
```

</details>

## 37-tollkeeper-of-the-chapel

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

The Bell That Draws the Warmth. When the tollkeeper hits a creature with its Withering Touch and that creature has not regained Hit Points since the start of the tollkeeper's previous turn, the target is marked as the dying and cannot regain Hit Points until it finishes a short or Long Rest; its wounds bleed black and will not close.

Ethereal Sight. The tollkeeper can see 60 feet into the Ethereal Plane when it is on the Material Plane.

Incorporeal Movement. The tollkeeper can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Actions

Multiattack. The tollkeeper makes two Withering Touch attacks. It can replace one attack with a use of Ruinous Curse.

Withering Touch. Melee Attack Roll: +5, reach 5 ft. 19 (3d10 + 3) Necrotic damage.

Ruinous Curse. Dexterity Saving Throw: DC 13, one creature within 60 feet. Failure: 7 (2d6) Necrotic damage, and the target is cursed. While cursed, the target gains no benefit from finishing Short Rests.

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
!! [ENRICHMENT] Failed to enrich Tollkeeper of the Chapel: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795100155507:663:5)
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
[reskin] seat authored nothing: action — the call was asked to write an action for "The tollkeeper designates one living creature it can perceive as the d" and wrote no row of that kind (it belongs in the description)
[reskin] the declared ask's own template lands: action — the sheet's declared ask is "curse", the seat that carries it ended with no row, and "curse-debt" answers that mechanic and was not declined as a word mismatch (owner's R4)
[reskin] row kept the template's own name: action — "Ruinous Curse" is curse-debt's default and the call named nothing usable; on a reskinned creature that reads as catalog furniture
[reskin] signature template: curse-debt -> Actions/"Ruinous Curse" ("The idea is a mark that forbids healing, deals Necrotic damage each turn, and tr [verb: toll:concept]")
[reskin] keys spent by the action: toll
[reskin] signature idea (trait): "A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of the clapper: a struck target that is marked as the dying cannot regain hit points for the duration of the …, and its wounds bleed black and will not close." [trait/always/defense] [family: mark] — menu: phobia, faultless-tracker, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, relic-object, undead-fortitude, truth-aura, fear-aura, assassinate, kill-denial, guarded-stance (+ shelf: resonant-body)
[reskin] composed candidates: none trait — the mark family has no grammar — composable families are payoff, body-reaction, zone
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does defense; leading: bloodied-fury (always/defense), uncanny-sense (always/defense), shielded-mind (always/defense)
[reskin] keys would have bound: trait — resonant-body (toll, bell)
[reskin] classification handed to the fit call: shape=save_single when=at_will
[reskin] word match declined by the call: kill-denial, faultless-tracker, bound, relic-object — the key word does not mean the mechanic here
[reskin] closest refused: trait — "kill-denial" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: a hit marks the target so it can't regain hit points and its wounds st)
[reskin] seat answered, but: the call said "A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of" is carried by "The Bell That Draws the Warmth", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("a hit marks the target so it can't regain hit points and its wounds st") and wrote a trait instead: "The Bell That Draws the Warmth" -> Traits. When the tollkeeper hits a creature with its Necrotic Clapper and that creature has not regained hit points since the st
[reskin] authored row numbers: "The Bell That Draws the Warmth" — the call declared 0 number(s) promised
[reskin] free signature row: "The Bell That Draws the Warmth" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "The Bell That Draws the Warmth" is HANDED "tolls for the dying" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"The Bell That Draws the Warmth" ("A creature that has heard the tollkeeper's bell and then touches the spirit feels its warmth drawn into the cold iron of the clapper: a struck target that is ma [authored: the catalog held no shape for it]")
[reskin] weapons answered: Necrotic Clapper = none
[reskin] languages by mind: "None" -> "Common plus the languages it knew in life" (sapient)
[reskin] print canon type: the call answered type_source=user for undead, but the GM's words do not name it — the Ghost's own type stands
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus one other language" — the Ghost's
[reskin] print canon speed: 30 ft. -> 5 ft. — the Ghost's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 40 ft. — the Ghost's own
[reskin] print canon attack: "Necrotic Clapper" -> "Withering Touch" — the Ghost's own row
[reskin] print canon multiattack: "the tollkeeper makes two Withering Touch attacks." — the Ghost's own
[reskin] save follows the effect: Actions/"Ruinous Curse" Charisma -> Dexterity — the row's point is its damage; a condition it hands out alongside does not pick the stat
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon saves: proficient in nothing — the Ghost's own set, at this sheet's stats and PB 2 (changed DEX)
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained; resistances none -> Acid, Bludgeoning, Cold, Fire, Lightning, Piercing, Slashing, Thunder — the Ghost's own header lines
[reskin] print canon trait: Ethereal Sight — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon trait: Incorporeal Movement — "a chapel bell-ringer's ghost that tolls for the dying" is the Ghost (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" is the seat's, not the Ghost's
[reskin] print canon row: Actions/Horrific Visage — the Ghost's own
[reskin] print canon row: Actions/Possession (Recharge 6) — the Ghost's own
[reskin] print canon row: Actions/Etherealness — the Ghost's own
[reskin] multiattack replacement clause: It can replace one attack with a use of Ruinous Curse.
[reskin] free-row budget by card size: CR 3 sits in band 3-5, where print runs 2-5 rows (p20-p90, Multiattack excluded); this card already carries 7 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "The Bell That Draws the Warmth" [no template]
[reskin] 2024 caps: "The Bell That Draws the Warmth" — a condition or game term shipped lowercase
[reskin] row binds its clause: "Ruinous Curse" answers "tolls for the dying" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] ask vs row ok: "tolls for the dying" -> "Ruinous Curse" — trigger at_will
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] element expressed: The Bell That Draws the Warmth carries "marks one living soul as the dying" — "the target is marked as the dying and cannot regain Hit Points until it finishes"
[reskin] audit: [The Bell That Draws the Warmth: The mark has no ex…t Points until it finishes a short or Long Rest"), The Bell That Draws the Warmth: The trigger requir…nce the start of the tollkeeper's previous turn"), Ruinous Curse: The curse's only effect is on Short…et gains no benefit from finishing Short Rests."), Ruinous Curse: The cursed state has no stated dura…et gains no benefit from finishing Short Rests.")]
[reskin] audit defect: Traits/"The Bell That Draws the Warmth" [model-written] high open_ended — The mark has no exit written for the victim in combat: no save, no repeat check, no duration in combat time, and a short or Long Rest is not reachable under fire, so the victim is locked out of all healing until the fight ends. — Give the mark a bounded end inside the encounter — a repeat save at the start of each of the target's turns, or a fixed duration — so the victim has agency once marked. (about: "cannot regain Hit Points until it finishes a short or Long Rest")
[reskin] audit defect: Traits/"The Bell That Draws the Warmth" [model-written] medium untrackable — The trigger requires the table to know whether the target regained Hit Points on its turn before last, state that must be tracked across rounds with nothing on the sheet marking it and no reminder in the entry. — Tie the trigger to a condition readable in the moment — the target being at full Hit Points, or wounded — rather than to a remembered prior-round event. (about: "has not regained Hit Points since the start of the tollkeeper's previous turn")
[reskin] audit defect: Actions/"Ruinous Curse" [catalog] high weak — The curse's only effect is on Short Rests, and the Bell trait already denies Hit Point regrowth until a short or Long Rest, so the curse delivers effectively nothing at the table. — Give the curse an in-combat payload or a condition that matters during the fight rather than resting. (about: "While cursed, the target gains no benefit from finishing Short Rests.")
[reskin] audit defect: Actions/"Ruinous Curse" [catalog] high open_ended — The cursed state has no stated duration and no end condition, and Short Rest benefit is an out-of-combat resolution the block never bounds. — State when the curse ends — a duration, a save, or removal on the tollkeeper's death — so the state can be adjudicated. (about: "the target is cursed. While cursed, the target gains no benefit from finishing Short Rests.")
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] [gap] marks one target so it cannot regain hit points and takes damage at the start of each of its turns while the tollkeeper  — "The tollkeeper designates one living creature it can perceive as the dying, and the phantom bell tolls for it. Until the toll ends, the marked creature cannot regain hit points and takes Necrotic damage at the start of each of its turns, and the tollkeeper always knows the direction and distance to its mark. The toll ends early only if the mark dies, a cleric or paladin successfully turns the toll" — Tollkeeper of the Chapel [seat: action [action/save/condition]] (closest offered: curse-debt) [effect: condition] [menu: curse-debt delayed-brand lure pacify escalating-dread terror-pulse sensory-strike push-prone reveal execute active-toll ground-burst slow-bolt drain disarm thrown-burst-seed wind-up aggro-curse zone wail] [same-cell unoffered: swallow gaze-single snare seal shield-bash random-ray snare-bolt exploiter] [same-seat rejected: swallow:hold-shape trample:role leap:size thrown-burst:role gaze-single:body-verdict snare:role reel:role condition-payoff:needs-imposed seal:body-verdict shield-bash:role hook-drag:hold-shape pull-through:engine-key random-ray:body-verdict spew:body-verdict burrow-ambush:movement obstacle-pull:hold-shape snare-bolt:body-verdict herd:role exploiter:needs-imposed blighted-ground:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path twist
[reskin] done: "Tollkeeper of the Chapel" — donor lurker-2, CR 3
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 4 live (live from the seat call onward)
```

</details>
