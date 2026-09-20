## 01. Still Harvest — CR 4

**Input:** `a scarecrow that only moves when nobody is looking`
**Donor:** lurker-2-trap -> CR 4
**Signature:** custom · **elapsed** 12s

### Block
```
Still Harvest

Medium Construct, Neutral

AC 13
Initiative +1 (11)

HP 91 (14d8 + 28)

Speed 20 ft.

MOD
SAVE
STR
18
+4
+6
INT
5
-3
-3
MOD
SAVE
DEX
12
+1
+1
WIS
13
+1
+1
MOD
SAVE
CON
15
+2
+2
CHA
8
-1
-1

Skills Stealth +5

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 11

Languages Understands Common but can't speak

CR 4 (XP 1,100; PB +2)

Traits

Frozen When Watched. The still harvest has the Invisible condition while no creature can see it and it hasn't moved or attacked since the end of its last turn. If a creature sees the still harvest move or attack, the still harvest is no longer Invisible to that creature until the end of its next turn.

Adhesive Hide. The still harvest adheres to anything that touches it. A Huge or smaller creature adhered to the still harvest has the Grappled condition (escape DC 14).

Actions

Splinter Claw. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the still harvest), reach 5 ft. 17 (3d8 + 4) Slashing damage plus 11 (2d10) Necrotic damage.

Sudden Dread (Recharge 4–6). One creature within 30 feet that sees the still harvest make this move must succeed on a DC 13 Wisdom saving throw or have the Frightened condition until the end of its next turn.

Bonus Actions

False Form. The still harvest shape-shifts to resemble a Medium or Small object while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from an ordinary object.

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
[concept] name: provided_name rejected — "scarecrow that only moves when nobody is…" is the description, not a name
[concept] synthesis: archetype=lurker type=Construct themes=terror/uncanny mind=sapient lore=✓
[concept] lore: Woven from the cast-off fears of a farming village and left to rot in a cursed field, this scarecrow no longer guards crops but hunts the living, feeding on the moment of startled recognition when prey realizes the straw man has moved.
[concept] resolve: archetype=lurker type=Construct themes=terror/uncanny mind=sapient style=trap energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: gaze, regeneration
[concept] signature elements: frozen when observed, mobile when unobserved [behavior] | body of rotting straw and worm-eaten burlap [body] | sudden lunging strike from stillness [behavior]
[concept] identity: The scarecrow stands motionless among the field's rows until an enemy's back is turned or a gaze wanders, then erupts into a single, rustling lunge with straw-stuffed fists and a splintering wooden claw. Every round it stalks the periphery of attention, freezing again the instant it is watched, and only commits to a kill when it can strike from behind an ally or from a distracted foe's blind spot. Wounded, it does not flee — it goes still and patient, letting its pursuers' own inattention deliver them to its next ambush.
[concept] lore: Woven from the cast-off fears of a farming village and left to rot in a cursed field, this scarecrow no longer guards crops but hunts the living, feeding on the moment of startled recognition when prey realizes the straw man has moved.
[reskin] donor: lurker-2-trap -> CR 4
[reskin] row gated out: Swallow (engulf) — the concept did not claim this mechanic
[reskin] seats: action <- "frozen when observed, mobile when unobserved" | trait <- "body of rotting straw and worm-eaten burlap"
[reskin] trait wildcard: "Frozen When Watched"
[reskin] informed wildcard — written against the assembled sheet
[reskin] wildcard accepted: The still harvest moves up to 30 feet toward a creature it is hidden from, then makes one Splinter C
[reskin] flat average recomputed: "Startled Recognition (Recharge 4–6)" 26 (6d8) -> 27
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] lint actuator: dropped the "surprised" sentence from "Startled Recognition (Recharge 4–6)" (not a 5e condition)
[reskin] lint: type-damage-affinity: Actions/Splinter Claw: Necrotic damage on Construct — no official Construct deals Necrotic; re-theme the damage to the creature's substance (or the type itself is wrong)
[reskin] audit: [Frozen When Watched: The entry grants Invisible on…nvisible condition while no creature can see it"), Adhesive Hide: The trait imposes Grappled on any c…vest has the Grappled condition (escape DC 14)."), Adhesive Hide: The trait provides no timing, range…'. (about: "adheres to anything that touches it"), Startled Recognition (Recharge 4–6): The phrase 'm…feet that sees the still harvest make this move"), Startled Recognition (Recharge 4–6): The name 'Sta…tened condition until the end of its next turn.")]
[reskin] audit rename: "Startled Recognition (Recharge 4–6)" -> "Sudden Dread (Recharge 4–6)"
[reskin] done: "Still Harvest" — donor lurker-2-trap, CR 4
```
