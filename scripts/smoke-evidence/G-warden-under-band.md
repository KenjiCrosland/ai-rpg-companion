## 05. Consecrated Sentinel — CR 11

**Input:** `a cathedral guardian that anchors itself before the altar and refuses to be moved`
**Donor:** defender-7-warden -> CR 11
**Signature:** library · **elapsed** 14s

### Block
```
Consecrated Sentinel

Huge Construct, Lawful Neutral

AC 18
Initiative -1 (9)

HP 210 (20d12 + 80)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+5
INT
7
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
18
+4
+8
CHA
3
-4
-4

Skills Perception +4

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 120 ft., tremorsense 60 ft.; Passive Perception 14

Languages understands Celestial and Common but can't speak; communicates through resonant tones and gestures

CR 11 (XP 7,200; PB +4)

Traits

Ward Bond. The consecrated sentinel is magically bound to a ward of its choosing, and it can have only one ward at a time. While the consecrated sentinel is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the consecrated sentinel.

Regeneration. The consecrated sentinel regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point. If the consecrated sentinel takes Necrotic damage, this trait doesn't function at the start of the consecrated sentinel's next turn.

Actions

Multiattack. The consecrated sentinel makes two Sanctified Fist attacks.

Sanctified Fist. Melee Attack Roll: +9, reach 10 ft. 18 (3d8 + 5) Bludgeoning damage plus 11 (2d10) Radiant damage.

Altar's Ward (2/Day). The consecrated sentinel targets itself or one creature it can see within 60 feet. The target gains 28 (8d6) Temporary Hit Points, and its AC increases by 2 until the end of the consecrated sentinel's next turn.

Consecrated Ground (2/Day). The consecrated sentinel fills a 15-foot-radius Sphere centered on a point it can see within 60 feet. The area is Lightly Obscured and Difficult Terrain until the start of the consecrated sentinel's next turn.

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
[concept] synthesis: archetype=defender type=Construct themes=forged/celestial mind=sapient lore=✓
[concept] lore: Consecrated from the living rock of a collapsed cathedral and the last breath of its dying bishop, the Cathedral Guardian wakes only when the altar is profaned and will not rest again until the intruders are cast out or dead.
[concept] resolve: archetype=defender type=Construct themes=forged/celestial mind=sapient style=warden energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: anchored before the altar, unmovable [behavior] | body of consecrated cathedral stone [body] | hovering halo of judgment-light [aura]
[concept] identity: The Cathedral Guardian does not pursue—it plants itself before the altar and becomes the altar's second wall, punishing any who approach with radiant hammer-blows of consecrated stone. It fights only when its charge is threatened, its every blow a verdict meant to drive blasphemers back rather than slaughter them, and it will stand until ground to rubble before yielding a single step. Under pressure it does not rage; it becomes stiller, colder, more absolute, its silence itself a warning that the next step forward will be answered with judgment.
[concept] lore: Consecrated from the living rock of a collapsed cathedral and the last breath of its dying bishop, the Cathedral Guardian wakes only when the altar is profaned and will not rest again until the intruders are cast out or dead.
[reskin] regeneration off-switch: Necrotic (foil of Radiant)
[reskin] donor: defender-7-warden -> CR 11
[reskin] seats: action <- "anchored before the altar, unmovable" | trait <- "body of consecrated cathedral stone"
[reskin] trait wildcard rejected — teleport beyond the chassis — a trait cannot grant movement the block does not carry (a "reposition" or vanish-and-reappear IS a teleport): The creature cannot willingly move more than 30 feet from the altar it guards. If forcibly moved beyond this range, it i
[reskin] informed wildcard — written against the assembled sheet
[reskin] wildcard rejected — teleport beyond the chassis (a "reposition" or vanish-and-reappear IS a teleport — print says the word): The consecrated sentinel plants itself and unleashes a wave of consecrated force in a 30-foot radius. *Strength Saving T
[reskin] repair draft rejected — an ungated area action prices per TARGET — halve the dice or add a use gate like "(Recharge 5-6)": The consecrated sentinel slams its hammer into the ground, anchoring itself before the altar. *Stren
[reskin] repair trait draft rejected — the trait keys on the state "its altar" that nothing on the sheet enters — write the sentence or action that establishes it (print's form: False Appearance's "while it remains motionless"), or key on a state the rules know: The creature's speed is 0 while within 30 feet of its altar, and it automatically fails any saving t
[reskin] repair draft rejected — an ungated area action prices per TARGET — halve the dice or add a use gate like "(Recharge 5-6)": The consecrated sentinel slams its hammer into the ground, anchoring itself before the altar. *Stren
[reskin] repair trait draft rejected — the trait keys on the state "its altar" that nothing on the sheet enters — write the sentence or action that establishes it (print's form: False Appearance's "while it remains motionless"), or key on a state the rules know: The creature's speed is 0 while within 30 feet of its altar, and it automatically fails any saving t
[reskin] repair draft rejected — an ungated area action prices per TARGET — halve the dice or add a use gate like "(Recharge 5-6)": The consecrated sentinel slams its hammer into the ground, anchoring itself before the altar. *Stren
[reskin] repair trait draft rejected — the trait keys on the state "its altar" that nothing on the sheet enters — write the sentence or action that establishes it (print's form: False Appearance's "while it remains motionless"), or key on a state the rules know: The creature's speed is 0 while within 30 feet of its altar, and it automatically fails any saving t
[reskin] wildcard repair skipped — Failed to generate a valid response. Please try again later.
[reskin] trait repair failed — no repair; no trait ships
[reskin] library seed drawn: zone -> Actions/"Consecrated Ground (2/Day)" (the wildcard died; a proven shape stands in)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] vulnerability rejected — "Thunder" has no warrant in the concept's own text (print's default is none)
[reskin] lint: 0 findings
[reskin] audit: nothing flagged
[reskin] done: "Consecrated Sentinel" — donor defender-7-warden, CR 11
```
