# BLOCKS — fault 1 proven, and the strike derived from its host (2026-11-21)

Every sheet this round produced.

**s01, s11 and s38** replayed from the tapes of `18bb4d19` — the tapes that showed the fault,
recovered with `git show` and held outside the repo — against the finished fixes. Each strike is on
the sheet and is its host's line plus its save.

**s35**, the same tape, `--live-from seat --rolls 3`: the refusal fires on rolls 2 and 3 and the
seat ends empty on all three.

**s06**, re-recorded from the call that missed (`--live-from legacy`), the only sheet of the forty
that needed it.


---

## s01 — replayed from the old tape

## 01. Dire Wolf — CR 1

**Input:** `name: Dire Wolf | with a frost-rimed hide`
**Donor:** skirmisher-1 -> CR 1
**Signature:** library · **elapsed** 2s

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

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Bite. Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

Flank the Herd (Recharge 5-6). Melee Attack Roll: +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of its next turn.

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
[reskin] signature authored: no template — the seat wrote it -> Actions/"Flank the Herd (Recharge 5-6)" ("null")
[reskin] signature idea (trait): "The frost-rimed hide sheds a creeping rime: at the start of the dire wolf's turn, each creature within 5 feet of it that has taken Cold damage since its last turn must succeed on a Constitution saving throw or be unable to take Reactions until the start of its next turn as the cold stiffens its joints." [trait/start_of_turn/condition] [family: zone] — menu: phobia, terrain-walk, faultless-tracker, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, kill-denial
[reskin] verb gate stands down: trait — no template shares a verb, but 2 template(s) whose declared stamps match the idea (start_of_turn/condition): truth-aura, fear-aura; the declared data is the warrant and the call is worth making
[reskin] menu ordered by the idea's stamps: trait — idea fires start_of_turn/does condition; leading: truth-aura (start_of_turn/condition), fear-aura (start_of_turn/condition), energy-aura (start_of_turn/damage)
[reskin] signature fit call failed — trait: Failed to generate a valid response. Please try again later.
[reskin] weapons answered: Bite = none
[reskin] chassis nova: "Flank the Herd (Recharge 5-6)" — the skirmisher-1's own nova row; geometry, cap and rider lines below are its edits
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
[reskin] print canon: the seat's own row STAYS — Actions/"Flank the Herd (Recharge 5-6)" answers "cl_d942pp", which the GM typed; print's nova rides beside it rather than over it
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Slip Through the Snowdrifts" is the seat's, not the Dire Wolf's
[reskin] save stat from print grammar: Actions/Flank the Herd imposes Stunned by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] sheet lint: strike-differs-from-host: Actions/Flank the Herd: its attack line is not "Bite"'s — "*Melee Attack Roll:* +5, reach 5 ft. 6 (1d6 + 3) Piercing damage.…" against "*Melee Attack Roll:* +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If …"
[reskin] lint: strike-differs-from-host: Actions/Flank the Herd: its attack line is not "Bite"'s — "*Melee Attack Roll:* +5, reach 5 ft. 6 (1d6 + 3) Piercing damage.…" against "*Melee Attack Roll:* +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If …"
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit skipped — Failed to generate a valid response. Please try again later.
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] record completed: "Flank the Herd (Recharge 5-6)" imposes Stunned by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] record recounted: free_rows 0 -> 0, expressed_rows undefined -> 0 — a pass after the budget removed a free row, and the record is the finished sheet's
[reskin] strike derived from its host: "Flank the Herd (Recharge 5-6)" takes "Bite" as the finished sheet has it — *Melee Attack Roll:* +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If …
[reskin] done: "Dire Wolf" — donor skirmisher-1, CR 1
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY MISS — the fit call (buildFitPrompt) — first differs at line 44 of 69
  nearest recorded prompt: the same call in this generation, 2739 characters shared
     43 | - fear-aura [Traits] (fires: start_of_turn, does: condition — matches the idea): The creature emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC {dc}, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition {duration}. Success: The target is immune to this creature's aura for 24 hours. — choose: {duration} ∈ target_end/target_start/source_end/source_start; "duration" ∈ target_end/target_start/source_end/source_start — how long the condition lasts
  -  44 | - composed:zone:condition:poisoned [Traits] (fires: start_of_turn, does: condition — matches the idea): {save_stat} Saving Throw: DC {dc}, any creature that starts its turn in a 5-foot Emanation originating from the creature. Failure: The target has the {condition_minor} condition {duration}. Success: The target is immune to this creature's aura for 24 hours. — choose: {save_stat} ∈ Strength/Dexterity/Constitution/Intelligence/Wisdom/Charisma — by what the row DOES, as print does it — measured over the corpus: an AREA that also deals damage takes Dexterity (46 rows) or Constitution for a breath, gas or spores (29); a shove, pull or knock-down takes Strength (5 rows to Dexterity's 2); a condition with little damage takes Constitution for a body effect (24) or Wisdom for fear, charm or compulsion (13). Damage-dominant never takes Wisdom; {condition_minor} ∈ Prone/Poisoned/Deafened/Frightened/Blinded; {duration} ∈ target_end/target_start/source_end/source_start; "duration" ∈ target_end/target_start/source_end/source_start — how long the condition lasts
  +  44 | - energy-aura [Traits] (fires: start_of_turn, does: damage): At the end of each of the creature's turns, each creature in a 5-foot Emanation originating from the creature takes 5 (1d10) {damage_type} damage. — may ALSO take ONE augmentation, or none: "space_hold" (nothing to fill)
     45 | - composed:zone:condition:frightened [Traits] (fires: start_of_turn, does: condition — matches the idea): {save_stat} Saving Throw: DC {dc}, any creature that starts its turn in a 5-foot Emanation originating from the creature. Failure: The target has the {condition_minor} condition {duration}. Success: The target is immune to this creature's aura for 24 hours. — choose: {save_stat} ∈ Strength/Dexterity/Constitution/Intelligence/Wisdom/Charisma — by what the row DOES, as print does it — measured over the corpus: an AREA that also deals damage takes Dexterity (46 rows) or Constitution for a breath, gas or spores (29); a shove, pull or knock-down takes Strength (5 rows to Dexterity's 2); a condition with little damage takes Constitution for a body effect (24) or Wisdom for fear, charm or compulsion (13). Damage-dominant never takes Wisdom; {condition_minor} ∈ Prone/Poisoned/Deafened/Frightened/Blinded; {duration} ∈ target_end/target_start/source_end/source_start; "duration" ∈ target_end/target_start/source_end/source_start — how long the condition lasts
[harness] the whole prompt, and every recorded one, is in 01-REPLAY-MISS.txt
[harness] 6 prompt(s) had no recorded answer during this entry: fit x3, audit x3
```

---

## s11 — replayed from the old tape

## 01. Vampire — CR 13

**Input:** `name: Vampire | who keeps a garden of thorns`
**Donor:** lurker-13 -> CR 13
**Signature:** library · **elapsed** 2s

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
Charm (Recharge 5-6) (Bonus Action).The vampire casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of the vampire's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the vampire.

Actions
Multiattack (Vampire Form Only): The vampire makes two Grave Strike attacks and uses Bite. It can replace one attack with a use of Crimson Bramble Stalk.
Grave Strike: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Crimson Bramble Stalk: Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands. If the target is a creature, it is subjected to the following effect. The target must make a DC 17 Strength saving throw. On a failed save, the target is restrained until the end of its next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition must make a DC 17 Constitution saving throw, taking 6 (1d4 + 4) piercing damage on a failed save, plus 13 (3d8) necrotic damage. The target's Hit Point maximum decreases by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire's control.
Legendary Actions

The vampire can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The vampire regains spent legendary actions at the start of its turn.

Deathless Strike: The vampire moves up to half its Speed, and it makes one Grave Strike attack.
Beguile: The vampire casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17). The vampire can't take this action again until the start of its next turn.
```

### Trace
```
[harness] restored 10 taken name(s) the recording carried
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
[reskin] signature authored: no template — the seat wrote it -> Actions/"Crimson Bramble Stalk" ("null")
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
[reskin] multiattack replacement clause: It can replace one attack with a use of Crimson Bramble Stalk.
[reskin] free-row budget by card size: CR 13 sits in band 13-16, where print runs 5-10 rows (p20-p90, Multiattack excluded); this card already carries 13 fixed row(s), so the free-row budget is 0 rather than 1 — the card is already at print's high end
[reskin] save stat from print grammar: Actions/Crimson Bramble Stalk imposes Restrained by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] save re-derived after a retype: Actions/Crimson Bramble Stalk — a Constitution save for a condition the row IMPOSES, which calls for Strength or Dexterity (A2: a condition the row merely requires does not pick the stat)
[reskin] sheet lint: strike-differs-from-host: Actions/Crimson Bramble Stalk: its attack line is not "Grave Strike"'s — "*Melee Attack Roll:* +9, reach 5 ft. 13 (2d8 + 4) Slashing damage plus…" against "*Melee Attack Roll:* +9, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage pl…"
[reskin] lint: strike-differs-from-host: Actions/Crimson Bramble Stalk: its attack line is not "Grave Strike"'s — "*Melee Attack Roll:* +9, reach 5 ft. 13 (2d8 + 4) Slashing damage plus…" against "*Melee Attack Roll:* +9, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage pl…" | orphan-condition-ref: "Charmed" is referenced as a state but nothing on the sheet applies it
[reskin] audit sees the ask: 1 row(s) shown with the clause they were written for
[reskin] audit skipped — Failed to generate a valid response. Please try again later.
[reskin] seed share: 0 of 1 signature row(s) came from a seed — the sameness metric
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] record completed: "Crimson Bramble Stalk" imposes Restrained by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] escape dc: Grave Strike → DC 17 (8 + PB + STR; a late row wore another number)
[reskin] record recounted: free_rows 0 -> 0, expressed_rows undefined -> 0 — a pass after the budget removed a free row, and the record is the finished sheet's
[reskin] strike derived from its host: "Crimson Bramble Stalk" takes "Grave Strike" as the finished sheet has it — *Melee Attack Roll:* +9, reach 5 ft. 8 (1d8 + 4) Bludgeoning damage pl…
[reskin] done: "Vampire" — donor lurker-13, CR 13
!! [reskin] 2014 conversion failed — the deterministic shape ships with 2024 phrasing: Failed to generate a valid response. Please try again later.
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] REPLAY MISS — the audit call (buildAuditPrompt) — first differs at line 19 of 305
  nearest recorded prompt: the same call in this generation, 1339 characters shared
     18 | - THE BODY'S CATALOG ROW — ours, from the template catalog: Traits/Thornwalk
  -  19 | 
  +  19 | - WRITTEN FOR THIS CREATURE — ours, authored for this sheet: Actions/Crimson Bramble Stalk
     20 | - The OFFICIAL rows are Wizards of the Coast's own text, copied word for word from the published
[harness] the whole prompt, and every recorded one, is in 01-REPLAY-MISS.txt
[harness] 6 prompt(s) had no recorded answer during this entry: audit x3, legacy x3
```

---

## s38 — replayed from the old tape

## 01. Gravebound Line-Holder — CR 6

**Input:** `a skeleton with a greatsword`
**Donor:** brute-5 -> CR 6
**Signature:** library · **elapsed** 2s

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

Multiattack. The line-holder makes two attacks, using Greatsword or Shortbow in any combination. It can replace one attack with a use of Leg-Cutting Sweep.

Greatsword. Melee Attack Roll: +7, reach 5 ft. 14 (3d6 + 4) Slashing damage plus 7 (2d6) Necrotic damage.

Shortbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage.

Leg-Cutting Sweep. Melee Attack Roll: +7, reach 5 ft. 14 (3d6 + 4) Slashing damage plus 7 (2d6) Necrotic damage. If the target is a creature, it is subjected to the following effect. Strength Saving Throw: DC 14. Failure: The target has the Prone condition.

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
[harness] restored 37 taken name(s) the recording carried
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
[reskin] signature authored: no template — the seat wrote it -> Actions/"Leg-Cutting Sweep" ("null")
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
[reskin] print canon attack: "Debris" -> "Shortbow" — the Skeleton's own ranged row
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: vulnerabilities none -> Bludgeoning — the Skeleton's own header lines
[reskin] trait-granted condition immunity merged into header: Frightened
[reskin] emptied trait dropped — its only clause moved to the header
[reskin] vulnerability rejected — "Bludgeoning" has no warrant in the concept's own text (print's default is none)
[reskin] multiattack replacement clause: It can replace one attack with a use of Leg-Cutting Sweep.
[reskin] ask vs row ok: "a skeleton with a greatsword" -> "Greatsword" — trigger at_will, limit at_will
[reskin] save stat from print grammar: Actions/Leg-Cutting Sweep imposes Prone by its own text — no record on the row, so the grammar stood in (A2 gap)
[reskin] sheet lint: strike-differs-from-host: Actions/Leg-Cutting Sweep: its attack line is not "Greatsword"'s — "*Melee Attack Roll:* +7, reach 10 ft. 13 (2d8 + 4) Slashing damage plu…" against "*Melee Attack Roll:* +7, reach 5 ft. 14 (3d6 + 4) Slashing damage plus…"
[reskin] lint: strike-differs-from-host: Actions/Leg-Cutting Sweep: its attack line is not "Greatsword"'s — "*Melee Attack Roll:* +7, reach 10 ft. 13 (2d8 + 4) Slashing damage plu…" against "*Melee Attack Roll:* +7, reach 5 ft. 14 (3d6 + 4) Slashing damage plus…"
[reskin] audit skipped — Failed to generate a valid response. Please try again later.
[reskin] signature tally: 2 seat(s) -> 0 shape(s) on the sheet · 0 expressed, 0 decoration, 0 free · accepted picks lost: 0 of 0 · path twist
[reskin] record completed: "Leg-Cutting Sweep" imposes Prone by its own text and carried no record — the fill site that wrote it owes this field (template=chassis)
[reskin] multiattack re-read — "Shortbow" joins the combination; "The line-holder makes two attacks, using Greatsword or Shortbow in any combination. It can"
[reskin] record recounted: free_rows 0 -> 0, expressed_rows undefined -> 0 — a pass after the budget removed a free row, and the record is the finished sheet's
[reskin] strike derived from its host: "Leg-Cutting Sweep" takes "Greatsword" as the finished sheet has it — *Melee Attack Roll:* +7, reach 5 ft. 14 (3d6 + 4) Slashing damage plus…
[reskin] done: "Gravebound Line-Holder" — donor brute-5, CR 6
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
!! [ENRICHMENT] Failed to enrich Gravebound Line-Holder: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795239106739:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795239106739:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795239106739:663:5)
[harness] REPLAY MISS — the audit call (buildAuditPrompt) — first differs at line 18 of 270
  nearest recorded prompt: the same call in this generation, 1100 characters shared
     17 | - THE BODY'S OWN ROW — ours, from the donor catalog: Actions/Multiattack, Traits/Great Weapon Master
  -  18 | - WRITTEN FOR THIS CREATURE — ours, authored for this sheet: Actions/Greatsword
  +  18 | - WRITTEN FOR THIS CREATURE — ours, authored for this sheet: Actions/Greatsword, Actions/Leg-Cutting Sweep
     19 | 
[harness] the whole prompt, and every recorded one, is in 01-REPLAY-MISS.txt
[harness] 3 prompt(s) had no recorded answer during this entry: audit x3
```

---

## s35 — three live rolls from the seat

# Smoke: sweep (2026-11-21T05-34-46)

- 01 Thing in the Well — ok, signature: library
- 02 Thing in the Well — ok, signature: library
- 03 Thing in the Well — ok, signature: library

---

## 01. Thing in the Well — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 13s

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

Darkwater Sense. The thing knows the exact location of any creature touching or moving in water within its reach and has Advantage on attacks against such a creature, but it cannot locate a target that is dry and still.

Actions

Multiattack. The thing makes two Tendril attacks.

Tendril. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Merciless Strike (Recharge 5-6). The thing strikes where the target cannot guard. Dexterity Saving Throw: DC 13, one creature within 30 feet. Failure: 18 (4d8) Cold damage. If the target already has the Grappled condition, it also has the Prone condition. Success: Half damage.

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
[reskin] seat authored nothing: action — the call was asked to write an action for "The thing's tendril lashes out at a creature within reach, and on a hi" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] clause already answered: "the thing in the well" is carried by "Wellwater Drag" — the seat read the sheet and declined to write a second row for it
[reskin] seat authoring refused: action — the authored row re-imposes Grappled, which this sheet's own attack row already applies; that fiction belongs in the attack's rider and the nearest template stands in
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: the row re-imposes a condition this sheet's own attack already applies; the seat stays empty
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The thing's tendril lashes out at a creature within reach, and on a hit the target is snared and hauled toward the well-thing before being Grappled by it — the water remembers the shape of a hunger and reels its catch in." [rider/on_hit/movement] — the model found no template that holds it (offered: hook-rider, charge-push, stunning-strike, pounce, life-drain, drain)
[reskin] fallback skipped: exploiter (the sheet cannot render it)
[reskin] value check: "Merciless Strike (Recharge 5-6)" EV 23.9 vs floor 9.4 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The thing has no eyes that see above the waterline, but it feels every disturbance in the flooded dark — it knows the exact location of any creature touching or moving in water within its reach, and has Advantage on attacks against such a creature. It cannot see a target that is dry and still." [trait/always/condition] [family: sentinel] — menu: adhesive, spider-climb, phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/condition): adhesive, phobia, berserk; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — grapple: adhesive
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: adhesive (always/condition), phobia (always/condition), berserk (always/condition)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=save_single
[reskin] word match declined by the call: adhesive, phobia, berserk, spider-climb, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, energy-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "uncanny-sense" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: advantage on attacks against creatures touching or moving in water whi)
[reskin] seat answered, but: the call said "The thing has no eyes that see above the waterline, but it feels every disturbance in the flooded dark — it knows the ex" is carried by "Darkwater Sense", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("advantage on attacks against creatures touching or moving in water whi") and wrote a trait instead: "Darkwater Sense" -> Traits. The thing knows the exact location of any creature touching or moving in water within its reach and has Advantage on att
[reskin] authored row numbers: "Darkwater Sense" — the call declared 0 number(s) promised
[reskin] free signature row: "Darkwater Sense" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Darkwater Sense" ("The thing has no eyes that see above the waterline, but it feels every disturbance in the flooded dark — it knows the exact location of any creature touching or [authored: the catalog held no shape for it]")
[reskin] weapons answered: Tendril = none
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] element immunity: Cold — the call read this creature's energy as Cold and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Cold (merged into the header write)
[reskin] immunities stamped for type: Aberration -> Cold
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Darkwater Sense" [no template]
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit: [Merciless Strike (Recharge 5-6): The Grappled ride…led condition, it also has the Prone condition."), Darkwater Sense: The trait grants unerring locatio…it cannot locate a target that is dry and still")]
[reskin] audit defect: Actions/"Merciless Strike" [catalog] high undelivered — The Grappled rider is ungated by reach or restraint state, and nothing in the block lets the thing grapple at 30 feet, so the Prone payload is unreachable except through the 5-ft Tendril — a name promising a cruel follow-up that most uses of the action cannot deliver. — Either state that the target must be Grappled by this creature's Tendril and within reach, or drop the Grappled rider and give the action its own consistent payload. (about: "If the target already has the Grappled condition, it also has the Prone condition.")
[reskin] audit defect: Traits/"Darkwater Sense" [model-written] medium other — The trait grants unerring location and Advantage in water but gives no rules for how the thing behaves or is penalized when it cannot locate a dry, still creature — no condition, no targetability stated, leaving the GM to invent the consequence. — Add a stated end condition for the sense — e.g. the creature has the Blinded condition against, or cannot target, a dry and still creature until it moves or the thing takes another action to search. (about: "it cannot locate a target that is dry and still")
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Merciless Strike (Recharge 5-6)) — the sameness metric
[reskin] clause unresolved: "Darkwater Sense" carries "The thing has no eyes that see above the waterline, but ", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] a saving throw that drags the target in and grapples or engulfs it — "The thing's tendril lashes out at a creature within reach, and on a hit the target is snared and hauled toward the well-thing before being Grappled by it — the water remembers the shape of a hunger and reels its catch in." — Thing in the Well [seat: action [rider/on_hit/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider charge-push stunning-strike pounce life-drain drain] [same-cell unoffered: bolt-drag] [same-seat rejected: affliction:requires-row contagion:requires-row isolation:role snatch:movement bolt-restrain:role bolt-drag:role bolt-mark:role charge:style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Thing in the Well" — donor brute-5-grappler, CR 5
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## 02. Thing in the Well — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 14s

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

Stillwater Sense. While a creature is touching or moving in water within the thing's reach, the thing knows the creature's exact location and has Advantage on attacks against it; a target that is dry and still is unseen by the thing.

Actions

Multiattack. The thing makes two Tendril attacks.

Tendril. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Well-Spring Chill (Recharge 5-6). The thing strikes where the target cannot guard. Dexterity Saving Throw: DC 13, one creature within 30 feet. Failure: 18 (4d8) Cold damage. If the target already has the Grappled condition, it also has the Prone condition. Success: Half damage.

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
!! [ENRICHMENT] Failed to enrich Thing in the Well: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795239218620:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795239218620:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795239218620:663:5)
[harness] restored 34 taken name(s) the recording carried
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
[reskin] seat answered, but: the call said "The thing's tendril lashes out at a creature within reach, and on a hit the target is snared and hauled toward the well-" is carried by "Reeling Snare", and no such row is on this sheet — the clause stays open
[reskin] strike not landed — it adds nothing: "Reeling Snare" clones "Tendril", which already applies Grappled on a hit; the seat is asked again rather than trading an attack for a worse one
[reskin] seat authored nothing: action — the call was asked to write an action for "The thing's tendril lashes out at a creature within reach, and on a hi" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat answered, but: the call said "The thing's tendril lashes out at a creature within reach, and on a hit the target is snared and hauled toward the well-" is carried by "Reeling Snare", and no such row is on this sheet — the clause stays open
[reskin] seat authoring refused: action — the authored row re-imposes Grappled, which this sheet's own attack row already applies; that fiction belongs in the attack's rider and the nearest template stands in
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: the row re-imposes a condition this sheet's own attack already applies; the seat stays empty
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The thing's tendril lashes out at a creature within reach, and on a hit the target is snared and hauled toward the well-thing before being Grappled by it — the water remembers the shape of a hunger and reels its catch in." [rider/on_hit/movement] — the model found no template that holds it (offered: hook-rider, charge-push, stunning-strike, pounce, life-drain, drain)
[reskin] fallback skipped: exploiter (the sheet cannot render it)
[reskin] value check: "Merciless Strike (Recharge 5-6)" EV 23.9 vs floor 9.4 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The thing has no eyes that see above the waterline, but it feels every disturbance in the flooded dark — it knows the exact location of any creature touching or moving in water within its reach, and has Advantage on attacks against such a creature. It cannot see a target that is dry and still." [trait/always/condition] [family: sentinel] — menu: adhesive, spider-climb, phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/condition): adhesive, phobia, berserk; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — grapple: adhesive
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: adhesive (always/condition), phobia (always/condition), berserk (always/condition)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=save_single
[reskin] word match declined by the call: adhesive, pack-tactics, blood-frenzy — the key word does not mean the mechanic here
[reskin] closest refused: trait — "uncanny-sense" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: locates and gains Advantage against creatures in the water, but leaves)
[reskin] seat answered, but: the call said "The thing has no eyes that see above the waterline, but it feels every disturbance in the flooded dark — it knows the ex" is carried by "Stillwater Sense", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("locates and gains Advantage against creatures in the water, but leaves") and wrote a trait instead: "Stillwater Sense" -> Traits. While a creature is touching or moving in water within the thing's reach, the thing knows the creature's exact location 
[reskin] authored row numbers: "Stillwater Sense" — the call declared 0 number(s) promised
[reskin] free signature row: "Stillwater Sense" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Stillwater Sense" ("The thing has no eyes that see above the waterline, but it feels every disturbance in the flooded dark — it knows the exact location of any creature touching or [authored: the catalog held no shape for it]")
[reskin] weapons answered: Tendril = none
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] element immunity: Cold — the call read this creature's energy as Cold and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Cold (merged into the header write)
[reskin] immunities stamped for type: Aberration -> Cold
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Stillwater Sense" [no template]
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
[reskin] audit: [Stillwater Sense: The trait requires the table to …et that is dry and still is unseen by the thing"), Stillwater Sense: Exact-location knowledge and Adv…ocation and has Advantage on attacks against it"), Merciless Strike (Recharge 5-6): The surname 'Merc…led condition, it also has the Prone condition."), Stillwater Sense: The passive grants Advantage on …e. (about: "has Advantage on attacks against it")]
[reskin] audit rename: "Merciless Strike (Recharge 5-6)" -> "Well-Spring Chill (Recharge 5-6)"
[reskin] audit defect: Traits/"Stillwater Sense" [model-written] high untrackable — The trait requires the table to determine whether a target has been 'still' — a motion state with no tracking rule in the block — making the creature's ability to perceive a creature unadjudicable in play. — Replace the stillness exception with a checkable condition (e.g., a creature that has not moved on its last turn is unseen). (about: "a target that is dry and still is unseen by the thing")
[reskin] audit defect: Traits/"Stillwater Sense" [model-written] low other — Exact-location knowledge and Advantage are two distinct benefits stacked in one clause, but the trait is a passive with no action cost and no range beyond reach, so it reads as a 2014-style sensing passive rather than an adjudicable 2024 trait. — Split the sensing benefit from the combat benefit so each has its own trigger and scope. (about: "the thing knows the creature's exact location and has Advantage on attacks against it")
[reskin] audit defect: Traits/"Stillwater Sense" [model-written] low weak — The passive grants Advantage on attacks but provides no damage, no condition, and no follow-up, so it is a passive with no teeth beyond the ordinary attack roll and does not give the creature a reason to remain in the water. — Give the trait a tangible payload tied to its water theme or remove the combat clause. (about: "has Advantage on attacks against it")
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Well-Spring Chill (Recharge 5-6)) — the sameness metric
[reskin] clause unresolved: "Stillwater Sense" carries "The thing has no eyes that see above the waterline, but ", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] a saving throw that drags the target in and grapples or engulfs it — "The thing's tendril lashes out at a creature within reach, and on a hit the target is snared and hauled toward the well-thing before being Grappled by it — the water remembers the shape of a hunger and reels its catch in." — Thing in the Well [seat: action [rider/on_hit/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider charge-push stunning-strike pounce life-drain drain] [same-cell unoffered: bolt-drag] [same-seat rejected: affliction:requires-row contagion:requires-row isolation:role snatch:movement bolt-restrain:role bolt-drag:role bolt-mark:role charge:style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Thing in the Well" — donor brute-5-grappler, CR 5
[harness] enrichment not run (3 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## 03. Thing in the Well — CR 5

**Input:** `name: the thing in the well | `
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 14s

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

Tremor-Sight. While a creature touching or moving in water is within its reach, the thing pinpoints that creature exactly and has Advantage on attacks against it, but it cannot see a creature that is dry and still.

Actions

Multiattack. The thing makes two Tendril attacks.

Tendril. Melee Attack Roll: +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Well-Burst (Recharge 5-6). The thing strikes where the target cannot guard. Dexterity Saving Throw: DC 13, one creature within 30 feet. Failure: 18 (4d8) Cold damage. If the target already has the Grappled condition, it also has the Prone condition. Success: Half damage.

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
!! [ENRICHMENT] Failed to enrich Thing in the Well: Error: Failed to generate a valid response. Please try again later.
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:341:11)
    at async enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:20)
    at async saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795239218620:1732:24)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795239218620:1557:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1795239218620:663:5)
[harness] restored 34 taken name(s) the recording carried
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
[reskin] seat answered, but: the call said "The thing's tendril lashes out at a creature within reach, and on a hit the target is snared and hauled toward the well-" is carried by "Reeling Hunger", and no such row is on this sheet — the clause stays open
[reskin] strike not landed — it adds nothing: "Reeling Hunger" clones "Tendril", which already applies Grappled on a hit; the seat is asked again rather than trading an attack for a worse one
[reskin] seat authored nothing: action — the call was asked to write an action for "The thing's tendril lashes out at a creature within reach, and on a hi" and wrote no row of that kind
[reskin] seat asked again: action — the first answer was refused (you wrote no row of the kind asked for (an action)); asking once more with the reason
[reskin] seat answered, but: the call said "The thing's tendril lashes out at a creature within reach, and on a hit the target is snared and hauled toward the well-" is carried by "Reeling Hunger", and no such row is on this sheet — the clause stays open
[reskin] seat authoring refused: action — the authored row re-imposes Grappled, which this sheet's own attack row already applies; that fiction belongs in the attack's rider and the nearest template stands in
[reskin] seat refused twice: action — first: you wrote no row of the kind asked for (an action); second: the row re-imposes a condition this sheet's own attack already applies; the seat stays empty
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The thing's tendril lashes out at a creature within reach, and on a hit the target is snared and hauled toward the well-thing before being Grappled by it — the water remembers the shape of a hunger and reels its catch in." [rider/on_hit/movement] — the model found no template that holds it (offered: hook-rider, charge-push, stunning-strike, pounce, life-drain, drain)
[reskin] fallback skipped: exploiter (the sheet cannot render it)
[reskin] value check: "Merciless Strike (Recharge 5-6)" EV 23.9 vs floor 9.4 (the whole Multiattack (2 attacks)) — worth the trade
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The thing has no eyes that see above the waterline, but it feels every disturbance in the flooded dark — it knows the exact location of any creature touching or moving in water within its reach, and has Advantage on attacks against such a creature. It cannot see a target that is dry and still." [trait/always/condition] [family: sentinel] — menu: adhesive, spider-climb, phobia, terrain-walk, energy-aura, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura (+ shelf: weapon-lodge)
[reskin] verb gate stands down: trait — no template shares a verb, but 3 template(s) whose declared stamps match the idea (always/condition): adhesive, phobia, berserk; the declared data is the warrant and the call is worth making
[reskin] composed candidates: none trait — the sentinel family has no grammar — composable families are payoff, body-reaction, zone
[reskin] declared mechanic leads the menu: trait — grapple: adhesive
[reskin] menu ordered by the idea's stamps: trait — idea fires always/does condition; leading: adhesive (always/condition), phobia (always/condition), berserk (always/condition)
[reskin] classification handed to the fit call: mechanic=grapple, engulf shape=save_single
[reskin] word match declined by the call: adhesive, phobia, berserk, spider-climb, terrain-walk, bloodied-fury, blood-frenzy, pack-tactics, death-restoration, uncanny-sense, shielded-mind, relentless-pursuit, bound, undead-fortitude, truth-aura, fear-aura, energy-aura — the key word does not mean the mechanic here
[reskin] closest refused: trait — "uncanny-sense" was named nearest, but the call declined it for no_fit ("no_fit") — nothing offered carries the mechanic, and a nearest row was measured as the wrong row five times in six; the seat stays empty rather than ship a row the call said does not mean it (what it wanted: pinpoints creatures touching or moving in water and grants Advantage a)
[reskin] seat answered, but: the call said "The thing has no eyes that see above the waterline, but it feels every disturbance in the flooded dark — it knows the ex" is carried by "Tremor-Sight", and no such row is on this sheet — the clause stays open
[reskin] seat authored the row: trait — the call refused every template for no_fit ("pinpoints creatures touching or moving in water and grants Advantage a") and wrote a trait instead: "Tremor-Sight" -> Traits. While a creature touching or moving in water is within its reach, the thing pinpoints that creature exactly and has Adva
[reskin] authored row numbers: "Tremor-Sight" — the call declared 0 number(s) promised
[reskin] free signature row: "Tremor-Sight" — the trait seat cannot quote the GM, and the call picked this row off no menu: it WROTE it for the idea the catalog had no shape for. Earns no clause credit
[reskin] signature authored (trait): no template — the seat wrote it -> Traits/"Tremor-Sight" ("The thing has no eyes that see above the waterline, but it feels every disturbance in the flooded dark — it knows the exact location of any creature touching or [authored: the catalog held no shape for it]")
[reskin] weapons answered: Tendril = none
[reskin] languages held: None stands — INT 4 on a Aberration speaks nothing, whatever the mind read said
[reskin] element immunity: Cold — the call read this creature's energy as Cold and print gives a body of its element immunity to it (Winter Wolf, Hell Hound, Remorhaz: 8 of 8 immune, 0 resistant); its melee rows stay physical
[reskin] element immunity: Cold (merged into the header write)
[reskin] immunities stamped for type: Aberration -> Cold
[reskin] name-canon stands down: the path answered homebrew on "the thing in the well" and named no print body — no published trait lands on a word alone (owner's ruling)
[reskin] free-row budget: 1 candidate(s) reached the finished sheet, 1 kept (budget 1) — "Tremor-Sight" [no template]
[reskin] lint fixed: prone-duration — the lint's own deterministic surgery, applied before the gate reads the sheet
[reskin] lint: 0 findings
audit finding below confidence gate: Merciless Strike (Recharge 5-6) The conditional payload only matters on a target the thing has already Grappled (Restrained, implying it is held in place at reach), where Prone adds almost nothing beyond what Restrained already imposes.
[reskin] audit: [Merciless Strike (Recharge 5-6): The entry name is…he thing strikes where the target cannot guard."), Tremor-Sight: The negated clause grants blanket bl… it cannot see a creature that is dry and still"), Tremor-Sight: The trait triggers only on creatures…touching or moving in water is within its reach")]
[reskin] audit rename: "Merciless Strike (Recharge 5-6)" -> "Well-Burst (Recharge 5-6)"
[reskin] audit defect: Traits/"Tremor-Sight" [model-written] high untrackable — The negated clause grants blanket blindness to any dry, motionless creature regardless of distance, line of sight, or whether it is even in the creature's reach — the GM cannot adjudicate what the thing perceives or whether 'still' persists across turns. — Scope the limitation to its reach and state that the creature cannot perceive a dry, motionless creature in that range. (about: "but it cannot see a creature that is dry and still")
[reskin] audit defect: Traits/"Tremor-Sight" [model-written] medium undelivered — The trait triggers only on creatures touching or moving in water, but this well-dweller fights on land with Swim 30 ft and no way to keep a target submerged, so its signature sense is inert in most encounters with no trait or action that wets a target. — Broaden the sense to any creature touching water or moving on wet/soft ground, or add a mechanism that puts water where the fight happens. (about: "While a creature touching or moving in water is within its reach")
[reskin] seed share: 1 of 1 signature row(s) came from a seed (Well-Burst (Recharge 5-6)) — the sameness metric
[reskin] clause unresolved: "Tremor-Sight" carries "The thing has no eyes that see above the waterline, but ", which matches no clause on the sheet — no coverage credit by id
[reskin] [gap] a saving throw that drags the target in and grapples or engulfs it — "The thing's tendril lashes out at a creature within reach, and on a hit the target is snared and hauled toward the well-thing before being Grappled by it — the water remembers the shape of a hunger and reels its catch in." — Thing in the Well [seat: action [rider/on_hit/movement]] (closest offered: hook-rider) [effect: movement] [menu: hook-rider charge-push stunning-strike pounce life-drain drain] [same-cell unoffered: bolt-drag] [same-seat rejected: affliction:requires-row contagion:requires-row isolation:role snatch:movement bolt-restrain:role bolt-drag:role bolt-mark:role charge:style] [row dropped]
[reskin] signature outcome: 1 of 1 accepted signature pick(s) never reached the sheet — 1x the call named no template for the pick
[reskin] signature tally: 2 seat(s) -> 1 shape(s) on the sheet · 1 expressed, 0 decoration, 1 free · accepted picks lost: 1 of 1 (1x the call named no template for the pick) · path homebrew
[reskin] done: "Thing in the Well" — donor brute-5-grappler, CR 5
[harness] enrichment not run (1 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 6 call(s) from the tape, 5 live (live from the seat call onward)
```

---

## s06 — re-recorded from the legacy call

## 01. Spoilheap Lurker — CR 5

**Input:** `a quarry-pit thing of living scree that buries what it catches`
**Donor:** brute-5-grappler -> CR 5
**Signature:** library · **elapsed** 5s

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
Scree Buckle: Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage. If the target is a Large or smaller creature, it is grappled (escape DC 14). While grappled, the target is restrained. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be knocked prone.
Screeburst Emergence (Recharge 5-6): If the lurker is burrowing, it erupts from the ground at a point within 5 feet of one creature. That creature must make a DC 14 Dexterity saving throw, taking 9 (2d8) bludgeoning damage on a failed save. On a failed save, the target is knocked prone. The lurker then makes one Rubble Lash attack against the target.
```

### Trace
```
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
[reskin] sheet lint: strike-differs-from-host: Actions/Scree Snare: its attack line is not "Rubble Lash"'s — "*Melee Attack Roll:* +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage.…" against "*Melee Attack Roll:* +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. …"
[reskin] lint: strike-differs-from-host: Actions/Scree Snare: its attack line is not "Rubble Lash"'s — "*Melee Attack Roll:* +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage.…" against "*Melee Attack Roll:* +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. …"
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
[reskin] strike derived from its host: "Scree Buckle" takes "Rubble Lash" as the finished sheet has it — *Melee Attack Roll:* +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. …
[reskin] done: "Spoilheap Lurker" — donor brute-5-grappler, CR 5
[reskin] 2014 conversion: one lint-gated call — both printings saved
[harness] enrichment not run (0 request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet
[harness] live-from: the sheet is not compared with the recording — the point is that it may differ
[harness] 11 call(s) from the tape, 1 live (live from the legacy call onward)
```
