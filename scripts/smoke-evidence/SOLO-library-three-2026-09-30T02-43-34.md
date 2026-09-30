# Signature-slot review — single run, no comparison

Run: `library-three-2026-09-30T02-43-34`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## sergeant-koldrek

**Concept:** a dwarven crossbow sergeant who orders a volley and holds the shield line

```
Sergeant Koldrek

Medium Humanoid, Lawful Neutral

AC 16
Initiative +2 (12)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
WIS
11
+0
+0
MOD
SAVE
CON
14
+2
+5
CHA
15
+2
+5

Skills Athletics +6, Persuasion +5

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Dwarvish

CR 5 (XP 1,800; PB +3)

Traits

Guarded Stance. While the sergeant isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Aura of Authority. While in a 10-foot Emanation originating from the sergeant, the sergeant and its allies have Advantage on attack rolls and saving throws, provided the sergeant doesn't have the Incapacitated condition.

Actions

Multiattack. The sergeant makes two attacks, using Warhammer or Heavy Crossbow in any combination.

Warhammer. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage.

Heavy Crossbow. Ranged Attack Roll: +5, range 100/400 ft. 16 (4d6 + 2) Piercing damage.

Bonus Actions

Volley Order (2/Day). Each ally within 30 feet of the sergeant that can see or hear it can take a Reaction to make one ranged attack roll.

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

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=thrown-weapon — defender-leader: ✓ ("orders a volley") | skirmisher-archer: "crossbow" is a noun (a title), not a verb — no override | defender-leader: key "orders a" (class verb)
value check: "Volley Order (2/Day)" EV 11.7 vs floor 2.9 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Volley Order (2/Day)" ("Every ally in his aura who is wielding a ranged weapon can loose a single shot r [verb: volley:concept, orders a volley:concept, loose:idea]")
signature template (trait): guarded-stance -> Traits/"Guarded Stance" ("exact concept match [verb: keeps the shield line:concept, shield line:concept]")
```


---

## siege-line-sharpshooter

**Concept:** a hobgoblin sniper who snaps off a shot at anyone who closes to melee with him

```
Siege Line Sharpshooter

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 78 (12d8 + 24)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
11
+0
+0
MOD
SAVE
DEX
18
+4
+6
WIS
14
+2
+2
MOD
SAVE
CON
14
+2
+2
CHA
11
+0
+0

Skills Perception +4, Stealth +6

Senses darkvision 60 ft.; Passive Perception 14

Languages Common, Goblin

CR 4 (XP 1,100; PB +2)

Traits

Discipline. The sharpshooter ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The sharpshooter makes two attacks, using Blade or Longbow in any combination.

Blade. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Slashing damage.

Longbow. Ranged Attack Roll: +6, range 150/600 ft. 13 (2d8 + 4) Piercing damage.

Bonus Actions

Fleet Agility. The sharpshooter takes the Dash or Disengage action.

Reactions

Snap Shot. Trigger: A creature the sharpshooter can see moves to within 5 feet of it. Response: The sharpshooter makes one Longbow attack against that creature.

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

**Engine trace**

```
[route] skirmisher-archer type=Humanoid mechanics=none — skirmisher-archer: ✓ ("snaps off a shot at anyone who closes to") | skirmisher-archer: key "sniper" (class noun)
value check: "Snap Shot" EV 9.1 vs floor 2.3 (a reaction (free)) — worth the trade
signature template: snap-shot -> Reactions/"Snap Shot" ("A creature comes within a few strides (5 feet) of the sharpshooter, and the reac [verb: snaps off:concept, closes to melee:concept, snap shot:idea, comes within:idea]")
trait declined: "Iron Parry" — bound only on the idea's own words (parry:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
```


---

## barrow-warden

**Concept:** a barrow-wight that erupts in a shockwave of grave earth around it when roused

```
Barrow Warden

Large Undead, Neutral

AC 14
Initiative +2 (12)

HP 136 (16d10 + 48)

Speed 40 ft., Burrow 30 ft.

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
14
+2
+2
WIS
13
+1
+1
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

Skills Athletics +7, Perception +3

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 13

Languages Common plus the languages it knew in life

CR 7 (XP 2,900; PB +3)

Traits

Sunlight Sensitivity. While in sunlight, the barrow warden has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The barrow warden makes two Necrotic Sword attacks. It can replace one attack with a use of Life Drain.

Necrotic Sword. Melee Attack Roll: +7, reach 10 ft. 13 (2d8 + 4) Slashing damage plus 4 (1d8) Necrotic damage.

Grave Earth Eruption (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the barrow warden. Failure: 39 (6d12) Bludgeoning damage. Success: Half damage.

Life Drain. Constitution Saving Throw: DC 14, one creature within 5 feet. Failure: 24 (7d6) Necrotic damage, and the target's Hit Point maximum decreases by an amount equal to the damage taken.
A Humanoid slain by this attack rises 24 hours later as a Zombie under the barrow warden's control, unless the Humanoid is restored to life or its body is destroyed. the barrow warden can have no more than twelve zombies under its control at a time. Success: Half damage only.

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

**Engine trace**

```
[route] brute type=Undead mechanics=aura — brute: ✓ ("a barrow-wight that erupts in a shockwav") | brute: no line key in the words — the model's read of its quote
print canon array: STR 18, DEX 14, CON 16, INT 10, WIS 13, CHA 15 — the Wight's, STR fitted to +7
print canon: "a barrow-wight that erupts in a shockwave of grave earth around it when roused" heads on the Wight — print's rows ride along; the seat stays
value check: "Grave Earth Eruption (Recharge 5-6)" EV 60.5 vs floor 42.3 (the whole Multiattack (2 attacks)) — dice 24 → 39 (nova budget)
signature template: ground-burst -> Actions/"Grave Earth Eruption (Recharge 5-6)" ("the idea's central verb is 'bursts outward' and the template is a ground-burst s [verb: erupt:concept, erupts:concept, shockwave:concept, around it:concept, wave of:concept, eruption:idea, burst:idea]")
signature miss: trait — "The barrow warden's body is a heap of loose grave-earth and splintered coffin-wood, so any living creature that strikes it in melee drives its weapon into clinging soil and has the corpse-filth latch on, dragging that attacker a step toward the warden's hungry grasp. The earth then crumbles back into place, ready to snare the next fool who comes within reach." [trait/on_being_hit/movement] — the model found no template that holds it (offered: earth-glide)
print canon attack: "Grave Fist" -> "Necrotic Sword" — the Wight's own row
print canon trait: Sunlight Sensitivity — "a barrow-wight that erupts in a shockwave of grave earth around it when roused" is the Wight (print's own row)
print canon row priced: Life Drain — dice 6 → 24
print canon row: Actions/Life Drain — the Wight's own
```


---

## resonance-sentinel

**Concept:** a temple gong given legs that stomps and sends a tremor in all directions

```
Resonance Sentinel

Large Construct, Lawful Neutral

AC 15
Initiative -1 (9)

HP 161 (19d10 + 57)

Speed 30 ft.

MOD
SAVE
STR
18
+4
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
17
+3
+7
CHA
4
-3
-3

Skills Athletics +8, Perception +4

Immunities Poison, Thunder; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses blindsight 60 ft. (blind beyond this radius); Passive Perception 14

Languages Understands the languages of its creator but can't speak

CR 9 (XP 5,000; PB +4)

Traits

Bone-Ringing Reprisal. A creature that hits the resonance sentinel with a melee attack while within 5 feet of it takes 7 (2d6) Thunder damage and has the Deafened condition until the end of its next turn.

Thunder Absorption. Whenever the resonance sentinel is subjected to Thunder damage, it takes no damage and instead regains a number of Hit Points equal to the Thunder damage dealt.

Immutable Form. The resonance sentinel can't shape-shift.

Siege Monster. The resonance sentinel deals double damage to objects and structures.

Actions

Multiattack. The resonance sentinel makes two Slam attacks.

Slam. Melee Attack Roll: +8, reach 10 ft. 13 (2d8 + 4) Bludgeoning damage plus 9 (2d8) Thunder damage. If the target is a creature and doesn't already have a Bone-Rattling Note, it is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target receives a Bone-Rattling Note. While wounded, the target loses 7 (2d6) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 15 Wisdom (Medicine) check.

Tremor Stomp (Recharge 5-6). Constitution Saving Throw: DC 15, each creature in a 15-foot Emanation originating from the resonance sentinel. Failure: 49 (14d6) Thunder damage, and the target has the Prone condition until the end of its next turn. Success: Half damage only.

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

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=aura — brute-juggernaut: ✓ ("a temple gong given legs") | brute-juggernaut: no line key in the words — the model's read of its quote
nova capped: "Area Nova" 54 → 49 (the chassis nova obeys the cap: 50 at CR 9)
signature rider: affliction -> Slam (appended; the sentinel's ringing note steals hearing and shakes balance; anyone caught in  [shape fit, no verb match])
signature template (trait): resonant-body -> Traits/"Bone-Ringing Reprisal" ("the sentinel's body being struck rings back at the attacker with a lingering not [verb: gong:concept, iron:idea]")
chassis nova: "Tremor Stomp (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
nova geometry: "Tremor Stomp (Recharge 5-6)" — 30-foot Cone → 15-foot Emanation (the concept says in all directions)
```


---

## ash-standard

**Concept:** a goblin warchief who screams fire at will to her archers from the palisade

```
Ash Standard

Small Humanoid, Chaotic Neutral

AC 15
Initiative +2 (12)

HP 60 (11d6 + 22)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
WIS
11
+0
+0
MOD
SAVE
CON
14
+2
+4
CHA
15
+2
+4

Skills Athletics +5, Persuasion +4

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Goblin

CR 3 (XP 700; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the ash standard, the ash standard and its allies have Advantage on attack rolls and saving throws, provided the ash standard doesn't have the Incapacitated condition.

Actions

Multiattack. The ash standard makes two attacks, using Claw or Flaming Arrow in any combination.

Claw. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Flaming Arrow. Ranged Attack Roll: +4, range 150/600 ft. 11 (2d8 + 2) Fire damage.

Bonus Actions

Ragged Volley (2/Day). Each ally within 30 feet of the ash standard that can see or hear it can take a Reaction to make one ranged attack roll.

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

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("screams fire at will to her archers from") | defender-leader: no line key in the words — the model's read of its quote
energy withheld: Fire on a Humanoid with no Fire in the concept's own words (fixed phrases read first)
value check: "Ragged Volley (2/Day)" EV 7.8 vs floor 2 (a bonus action (free)) — worth the trade
signature template: volley-order -> Bonus Actions/"Ragged Volley (2/Day)" ("every ally within earshot who has a bow or lit arrow looses a shot at the target [verb: looses at will:concept, archers:concept, volley:idea]")
signature miss: trait — "She has been ash so long it answers her: the first time each round an enemy closes to melee with her, a faceful of burning cinders flares off her and she can slip back a few steps through the smoke, pulling the brawler out of reach of the palisade and into her …' lanes." [trait/on_being_hit/movement] — the model found no template that holds it (offered: bloodied-burst)
```
