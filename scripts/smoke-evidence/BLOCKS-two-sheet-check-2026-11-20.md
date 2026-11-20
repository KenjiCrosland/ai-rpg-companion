# BLOCKS — the two-sheet check after fixes A, B and C (2026-11-20)

`--live-from seat --rolls 1` on s26 (Mirewitch Sable) and s31 (the Thunderwall Drake), at
`446fe6a`. Both completed; neither threw.

**s26 reads right. s31 reads wrong, so the forty was not recorded.**


---

## sweep index 26

# Smoke: sweep (2026-11-20T17-10-42)

- 01 Mirewitch Sable — ok, signature: library

---

## 01. Mirewitch Sable — CR auto

**Input:** `a marsh witch who curses trespassers, cr 7`
**Donor:** caster-8-binder -> CR 7
**Signature:** library · **elapsed** 15s

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

Sodden Fen. Strength Saving Throw: DC 14, any creature that starts its turn in a 10-foot Emanation originating from Sable. Failure: The target has the Prone condition. Success: The target is immune to this Sable's Sodden Fen for 24 hours.

Actions

Multiattack. Sable makes three Arcane Burst attacks. It can replace one attack with a use of Fen-Weight Hex.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.

Spellcasting. Sable casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Fen-Weight Hex. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: 19 (3d12) Necrotic damage, and the target is cursed. While cursed, the target can't regain Hit Points.

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
[reskin] seat authored nothing: action — the call was asked to write an action for "Sable whispers a hex into a handful of fen-water and flicks it at one " and wrote no row of that kind (refused: "Fen-Weight Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, a forced movement, or damage)
[reskin] seat asked again: action — the first answer was refused ("Fen-Weight Hex" — the row does nothing on a failed save — say what the target suffers: a condition it gains, ); asking once more with the reason
[reskin] the curse is the row: "Fen-Weight Hex" was written for "curses trespassers" and the engine sets its curse; the Restrained it also carried is dropped — a curse, damage and a condition are more than one row buys
[reskin] authored row answers the GM: action — "Fen-Weight Hex" was written for "curses trespassers", so it is NOT a free row and never competes for the free-row slot; the card ceiling still governs it
[reskin] seat authored the row: action — the call refused every template for no_fit ("a lasting curse that slows the target's movement and lets Sable track ") and wrote an action instead: "Fen-Weight Hex" -> Actions. *Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 19 (3d12) Necrotic damage, and the target is curse
[reskin] authored row numbers: "Fen-Weight Hex" — the call declared (unanswered) number(s) promised
[reskin] seat landed on the second try: action — "Fen-Weight Hex" after ""Fen-Weight Hex" — the row does nothing on a failed save — say what the target s"
[reskin] seat takes its clause: "Fen-Weight Hex" is HANDED "curses trespassers" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] signature authored: no template — the seat wrote it -> Actions/"Fen-Weight Hex" ("Sable whispers a hex into a handful of fen-water and flicks it at one creature she can see within range. The target makes a Wisdom saving throw; on a failure, t [authored: the catalog held no shape for it]")
[reskin] signature idea (trait): "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as difficult terrain for every creature but her, and any creature that starts its turn there must choose between losing movement or sinking a little — the marsh itself serving as her weapon at her feet." [trait/always/movement] [family: zone] — menu: phobia, terrain-walk, aberrant-ground, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, gaze-aura, kill-denial, berserk
[reskin] composed candidates on the menu: trait — composed:zone:terrain (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does movement; leading: terrain-walk (always/movement), aberrant-ground (always/movement), relentless-pursuit (always/movement)
[reskin] keys would have bound: trait — terrain-walk (marsh)
[reskin] word match declined by the call: terrain-walk, relentless-pursuit, bound, phobia — the key word does not mean the mechanic here
[reskin] closest refused: trait — "aberrant-ground" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: makes the ground around her difficult terrain that slows other creatur)
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "Fen-Weight Hex", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "Where Sable stands, the fen answers her: the ground within a short rad" and wrote no row of that kind (refused: "Fen-Weight Hex" — a trait is not a save, and this fires on creatures NEAR the creature at the start of their turns — that is an aura, which print writes as a trait (the Ghast's Stench). Answer in "auras" with "name", "stat", "radius" (5, 10, 20 or 30) and "condition" (one of Poisoned/Frightened/Charmed/Prone). The engine writes the sentence, the DC, the ending and the immunity line) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Fen-Weight Hex" — a trait is not a save, and this fires on creatures NEAR the creature at the start of their ); asking once more with the reason
[reskin] seat answered, but: the call said "Where Sable stands, the fen answers her: the ground within a short radius of her is sodden, sucking mire that counts as " is carried by "Sodden Fen", and no such row is on this sheet — the clause stays open
[reskin] aura written from print's own form: "Sodden Fen" — a 10-foot Emanation, Prone until the start of the target's next turn, with print's immunity line (the Ghast's Stench)
[reskin] seat landed on the second try: trait — "Sodden Fen" after ""Fen-Weight Hex" — a trait is not a save, and this fires on creatures NEAR the c"
[reskin] free signature row: "Sodden Fen" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] seat takes its clause: "Sodden Fen" is HANDED "a marsh witch" (this is not a receipt and buys no coverage credit — the critic, 2026-10-22: the Owlbear's Adhesive "took" the climb clause) — the engine hands the seat the clause it is for; the call only picked the template
[reskin] trait declined — the name is taken: "Sodden Fen" already names a row on this sheet and there is no other name for it (it carries no template name); the engine will not mint one, so the row leaves and the fallback stands in
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
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 0) — "Sodden Fen" [no template]
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit sees the ask: 2 row(s) shown with the clause they were written for
[reskin] audit: [Fen-Weight Hex: The curse has no exit — no duratio…ile cursed, the target can't regain Hit Points."), Sodden Fen: The Fen-Weight Hex is written for curs…n in a 10-foot Emanation originating from Sable"), Sodden Fen: Prone is a nuisance state the target i…immune to this Sable's Sodden Fen for 24 hours."), Sodden Fen: The trait calls her 'this Sable' — the…immune to this Sable's Sodden Fen for 24 hours.")]
[reskin] audit defect: Actions/"Fen-Weight Hex" [model-written] high open_ended — The curse has no exit — no duration, no repeat save, no removal condition — so a cursed target is permanently barred from healing with nothing in the entry to end it. — Add an end condition the target can reach: a duration, a repeat save at end of each turn, or a removal clause keyed to something in the block. (about: "While cursed, the target can't regain Hit Points.")
[reskin] audit defect: Traits/"Sodden Fen" [model-written] medium undelivered — The Fen-Weight Hex is written for cursing trespassers, but this trait turns the marsh into a constant Prone field around her — a repeat-save stomp with no curse, no lingering mark, and no relation to the hex the GM asked for; the marsh witch's signature trait should deliver the curse, not a knockdown. — Rework the trait to apply the Hex (or a marshy cursing effect) rather than Prone, so the 'curses trespassers' ask and the block's own signature action line up. (about: "any creature that starts its turn in a 10-foot Emanation originating from Sable")
[reskin] audit defect: Traits/"Sodden Fen" [model-written] medium weak — Prone is a nuisance state the target immediately stands from, so the trait consumes a trait slot to cost a creature half its movement — the marsh has no teeth: no damage, no slowing, no inability to stand, nothing that makes the fen feel dangerous. — Give the fen a real payload — difficult terrain that persists, a curse marker, or an effect that lingers after the save — rather than a bare Prone that vanishes on the target's next turn. (about: "The target has the Prone condition. *Success:* The target is immune to this Sable's Sodden Fen for 24 hours.")
[reskin] audit defect: Traits/"Sodden Fen" [model-written] low wording — The trait calls her 'this Sable' — the block's own name is Mirewitch Sable, and the possessive 'this Sable's' is a garbled referent that reads as leftover assembly text rather than the creature's name. — Refer to the creature by her full name or simply 'Sable' consistently. (about: "The target is immune to this Sable's Sodden Fen for 24 hours.")
[reskin] clause id by substring: "Protective Magic (3/Day)" carries "witch" which is not a whole clause — the seat surgery cut it; resolved to cl_1enkq57
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 0 of 0 · path class_npc
[reskin] done: "Mirewitch Sable" — donor caster-8-binder, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 6 live (live from the seat call onward)
```

---

## sweep index 31

# Smoke: sweep (2026-11-20T17-10-58)

- 01 Thunderwall Drake — ok, signature: dropped

---

## 01. Thunderwall Drake — CR 7

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

Multiattack. The drake makes two Horn attacks.

Horn. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Cone. Failure: 42 (12d6) Thunder damage. Success: Half damage.

Stagger-Wake. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target has the Stunned condition until the end of its next turn.

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
[reskin] strike written from its attack: "Charge-Wake (Recharge 5-6)" clones "Horn" and adds a Constitution save — Multiattack offers it in place of one attack, which is the once-a-turn limit (owner's ruling)
[reskin] value check: "Charge-Wake (Recharge 5-6)" EV 9.9 vs floor 19.9 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Charge-Wake (Recharge 5-6)" — the ladder could not lift it; the fallback stands in
[reskin] signature idea (trait): "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] composed candidates on the menu: trait — composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded (the zone family's options, built before the call looks)
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), composed:zone:condition:poisoned (start_of_turn/condition)
[reskin] classification handed to the fit call: mechanic=breath shape=save_area
[reskin] word match declined by the call: energy-aura, truth-aura, fear-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "composed:zone:condition:poisoned" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: an aura that knocks creatures beneath the drake's flight prone (a knoc)
[reskin] seat answered, but: the call said "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and crea" is carried by "Pressure Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind (refused: "Pressure Wake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine renders the sentence) (it belongs in the description)
[reskin] seat asked again: trait — the first answer was refused ("Pressure Wake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine); asking once more with the reason
[reskin] seat answered, but: the call said "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and crea" is carried by "Pressure Wake", and no such row is on this sheet — the clause stays open
[reskin] seat authored nothing: trait — the call was asked to write a trait for "The drake's hide and wings are storm-charged and it does not land: whi" and wrote no row of that kind
[reskin] seat refused twice: trait — first: "Pressure Wake" — a trait is not a save — the save form takes stat, target and effect as f; second: you wrote no row of the kind asked for (a trait); the seat stays empty
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." [trait/start_of_turn/condition] — the model found no template that holds it (offered: truth-aura, fear-aura, composed:zone:condition:poisoned, composed:zone:condition:frightened, composed:zone:condition:deafened, composed:zone:condition:blinded, energy-aura, phobia, berserk, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude)
[reskin] weapons answered: Horn = none; Thunder Wall = none; Deafening Peal = none
[reskin] chassis nova: "Thunder Wall (Recharge 5-6)" — the dragon-2's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] chassis nova: "Charge-Wake (Recharge 5-6)" — the dragon-2's own nova row; geometry, cap and rider lines below are its edits
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] element immunity: Thunder (merged into the header write)
[reskin] dragon senses raised to tier: blindsight 30 added
[reskin] dragon senses raised to tier: darkvision 60 -> 120
[reskin] dragon languages: Draconic added (42/42 print dragons speak it)
[reskin] immunities stamped for type: Dragon -> Thunder
[reskin] name-canon stands down: the path answered homebrew on "a young storm drake whose breath is a ro" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] multiattack replacement clause: It can replace one attack with a use of Charge-Wake (Recharge 5-6).
[reskin] one nova at ship: "Charge-Wake (Recharge 5-6)" un-gated to "Charge-Wake" — "Thunder Wall" already carries this sheet's Recharge nova
[reskin] name follows content: Actions/"Charge-Wake" promises movement the row never delivers — "Stagger-Wake" (the call's modifier kept, the claim word swapped for a noun the row earns)
[reskin] multiattack re-read — "Charge-Wake" left; "Multiattack" now reads "The drake makes two Horn attacks."
[reskin] save stat from print grammar: Actions/Stagger-Wake imposes Stunned by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] lint: 0 findings
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit: [Stagger-Wake: Stagger-Wake duplicates Horn's attac…unned condition until the end of its next turn."), Stagger-Wake: The name promises a wake-like or rol…al single-target strike. (about: "Stagger-Wake."), Stagger-Wake: This 'if the target is a creature' q…ature, it is subjected to the following effect.")]
[reskin] audit rename held — "Stagger-Wake" was written for the GM's own clause (cl_v640f4: "a young storm drake whose breath is a rolling wall of thunde"), so "Stunning Horn" does not land; the finding stands as logged
[reskin] audit defect: Actions/"Stagger-Wake" [model-written] medium weak — Stagger-Wake duplicates Horn's attack roll and damage exactly and tacks on a Stunned rider without Recharge, making Horn pointless and the row redundant. — Give Stagger-Wake its own distinct effect (e.g., a separate delivery or non-damage payload) so it does not restate Horn. (about: "The target has the Stunned condition until the end of its next turn.")
[reskin] audit defect: Actions/"Stagger-Wake" [model-written] low other — This 'if the target is a creature' qualifier is dead weight on a melee Horn attack that by block design only hits creatures, so the clause adds nothing. — Remove the redundant conditional or replace it with a meaningful qualification. (about: "If the target is a creature, it is subjected to the following effect.")
[reskin] [gap] an aura that knocks creatures beneath the drake's flight prone (a knock-down, not damage) — "The drake's hide and wings are storm-charged and it does not land: while airborne, thunder crackles in its wake and creatures that crowd beneath its flight are knocked prone by the pressure of its passing." — Thunderwall Drake [seat: trait [trait/start_of_turn/condition]] (closest offered: composed:zone:condition:poisoned) [effect: condition] [menu: truth-aura fear-aura composed:zone:condition:poisoned composed:zone:condition:frightened composed:zone:condition:deafened composed:zone:condition:blinded energy-aura phobia berserk terrain-walk bloodied-fury blood-frenzy pack-tactics death-restoration shielded-mind relentless-pursuit bound undead-fortitude] [same-cell unoffered: noxious-aura gaze-aura] [same-seat rejected: noxious-aura:body-verdict warded-mending:body-verdict gaze-aura:body-verdict] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] record completed: "Stagger-Wake" imposes Stunned by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] done: "Thunderwall Drake" — donor dragon-2, CR 7
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 7 call(s) from the tape, 5 live (live from the seat call onward)
```
