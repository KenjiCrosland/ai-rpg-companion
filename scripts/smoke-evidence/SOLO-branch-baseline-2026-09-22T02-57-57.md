# Signature-slot review — single run, no comparison

Run: `branch-baseline-2026-09-22T02-57-57`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## bough-stalker

**Concept:** a leopard-thing that stalks the canopy and drops on stragglers from above

```
Bough Stalker

Medium Beast, Unaligned

AC 17
Initiative +5 (15)

HP 135 (18d8 + 54)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
14
+2
+2
INT
10
+0
+0
MOD
SAVE
DEX
20
+5
+8
WIS
14
+2
+5
MOD
SAVE
CON
16
+3
+3
CHA
10
+0
+0

Skills Perception +5, Stealth +11

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Canopy Stalker. The bough stalker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The bough stalker makes three attacks, using Bite or Claw in any combination.

Bite. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Piercing damage. If the bough stalker moved at least 20 feet straight toward the target immediately before the hit and the target is Large or smaller, the target has the Prone condition, and the bough stalker can make one Bite attack against it as a Bonus Action.

Claw. Ranged Attack Roll: +8, range 30/90 ft. 14 (2d8 + 5) Slashing damage.

Bonus Actions

Nimble Escape. The bough stalker takes the Disengage or Hide action.

Predatory Focus (2/Day). The bough stalker has Advantage on the next attack roll it makes before the end of its turn.

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
[route] skirmisher-skulker type=Beast mechanics=none — skirmisher-skulker: ✓ ("stalks the canopy and drops on straggler")
signature rider: pounce -> Bite (appended; The idea's central verb is dropping on the target from above, and the template c [verb: drops on:concept, from above:concept, stragglers:concept, pin:idea, pins:idea])
value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
signature miss: trait — "It knows every leaf-shadow and knothole in its canopy, so whenever it slips out of sight and then strikes from a new direction, the first moment of the attack comes with no sound or warning. The prey only learns where it is when the claws are already in them." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, assassinate, death-burst)
```


---

## brass-bull

**Concept:** a brass bull construct that charges through market stalls

```
Brass Bull

Large Construct, Unaligned

AC 14
Initiative +0 (10)

HP 102 (12d10 + 36)

Speed 40 ft.

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
10
+0
+0
WIS
12
+1
+1
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

Skills Athletics +6, Perception +4

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 5 (XP 1,800; PB +3)

Traits

Heated Brass. A creature that touches the brass bull or hits it with a melee attack while within 5 feet of it takes 13 (3d8) Fire damage.

Actions

Gore. Melee Attack Roll: +6, reach 5 ft. 12 (2d8 + 3) Piercing damage plus 10 (3d6) Fire damage. If the target is a Large or smaller creature and the brass bull moved 20+ feet straight toward it immediately before the hit, the target takes an extra 9 (2d8) Piercing damage and has the Prone condition.

Furnace Breath (Recharge 5-6). Constitution Saving Throw: DC 13, each creature in a 30-foot Cone. Failure: 31 (9d6) Fire damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Trample. Dexterity Saving Throw: DC 13, one creature within 5 feet that has the Prone condition. Failure: 13 (3d8) Bludgeoning damage. Success: Half damage.

Stamped by the Herd. Wisdom Saving Throw: DC 13, one creature within 30 feet. Failure: Until the start of the brass bull's next turn, the target has Disadvantage on attack rolls against creatures other than the brass bull.

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
[route] brute-charger type=Construct mechanics=none — brute-charger: ✓ ("charges through market stalls")
signature miss: action — "When the brass bull catches a creature flat on the ground in the lane it is charging down, it does not slow or sidestep: it lowers its head, scoops the body up onto its smoking brass brow, and keeps running at full gallop. The victim is carried along with the bull until the end of the bull's movement, then thrown off to land battered and still sprawled somewhere ahead along the same straight line," [trait/start_of_turn/movement] — no template exists for this section on this line
value check: "Binding Mark" EV 7.2 vs floor 3.9 (a bonus action (free)) — worth the trade
library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
signature template (trait): heated-body -> Traits/"Molten Mantle" ("the creature's hide carries flame that burns those who touch it, matching the tr [verb: brass:concept, heat:idea, burn:idea, furnace:idea, fire:idea, flame:idea]")
```


---

## thunderhead-hermit

**Concept:** a recluse who calls lightning down on trespassers from a mile away

```
Thunderhead Hermit

Medium Humanoid, Neutral

AC 17
Initiative +2 (12)

HP 170 (20d8 + 80)

Speed 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
22
+6
+10
MOD
SAVE
DEX
14
+2
+2
WIS
15
+2
+6
MOD
SAVE
CON
18
+4
+4
CHA
16
+3
+3

Skills Arcana +10, Perception +6

Resistances Lightning

Senses darkvision 120 ft.; Passive Perception 16

Languages Common, Auran

CR 12 (XP 8,400; PB +4)

Actions

Multiattack. The thunderhead hermit makes four Call Bolt attacks. It can replace one attack with a use of Binding Lash.

Call Bolt. Melee or Ranged Attack Roll: +10, reach 5 ft. or range 150 ft. 20 (4d6 + 6) Lightning damage.

Spellcasting. The thunderhead hermit casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 17):

- At Will: Detect Magic, Misty Step, Mage Hand
- 1/Day Each: Lightning Bolt

Binding Lash. Dexterity Saving Throw: DC 17, one creature within 60 feet. Failure: The target has the Restrained condition until the end of the thunderhead hermit's next turn.

Reactions

Protective Magic (3/Day). Trigger: The thunderhead hermit is hit by an attack roll. Response: The thunderhead hermit casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[route] caster (artillery) type=Humanoid mechanics=none — caster: ✓ ("calls lightning down on trespassers from")
signature miss: action — "The hermit points at a spot on the highland it can see from a mile off and calls a sky-bolt down onto that spot. The bolt strikes with a thunderclap, and any intruder standing near the mark feels the air turn to lightning — the hermit's answer to anyone who crosses the ridgeline before they ever see it move. It can call this from far beyond where most attackers can answer, then slip away through r" [rider/on_hit/damage] — no template exists for this section on this line
value check: "Binding Lash" EV 11.6 vs floor 10.9 (one attack of 4) — worth the trade
library seed drawn: snare-bolt -> Actions/"Binding Lash" (no template held the idea; a proven shape stands in)
signature miss: trait — "The hermit's mile of empty highland is its true lair: while it stands within that mile of open, unbroken terrain it has claimed, lightning answers it more readily and it can read the sky to know exactly when and where each bolt will fall. Trespassers feel the storm's attention settle on them long before the first strike, and the hermit never loses track of who crossed into its solitude." [trait/always/defense] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, death-burst)
```


---

## troll-mound

**Concept:** a mountain of troll-flesh that knits shut around the axes left in it

```
Troll Mound

Gargantuan Monstrosity, Unaligned

AC 17
Initiative +1 (11)

HP 232 (15d20 + 75)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+12
INT
6
-2
-2
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
20
+5
+11
CHA
8
-1
-1

Skills Athletics +12, Perception +6

Senses darkvision 60 ft., tremorsense 60 ft.; Passive Perception 16

Languages None

CR 17 (XP 18,000; PB +6)

Traits

Blade-Fed Hide. A creature that touches the troll mound or hits it with a melee attack while within 5 feet of it takes 22 (5d8) Piercing damage.

Legendary Resistance (3/Day). If the troll mound fails a saving throw, it can choose to succeed instead.

Regeneration. The troll mound regains 20 Hit Points at the start of each of its turns. If the troll mound takes Acid or Fire damage, this trait doesn't function on the troll mound's next turn. The troll mound dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. The troll mound makes three Slam attacks. It can replace one attack with a use of Grinding Embrace.

Slam. Melee Attack Roll: +12, reach 10 ft. 42 (8d8 + 6) Bludgeoning damage.

Grinding Embrace. Strength Saving Throw: DC 19, one Huge or smaller creature within 60 feet. Failure: The target is pulled up to 30 feet straight toward the troll mound by a crushing tide of old iron and has the Grappled condition (escape DC 19). While Grappled this way, the target has the Restrained condition.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the troll mound can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Slow Advance. The troll mound moves up to half its Speed without provoking Opportunity Attacks, and it makes one Slam attack.

Glutting Maw. Wisdom Saving Throw: DC 19, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

Quaking Bulk. Strength Saving Throw: DC 19, each creature within 10 feet of the troll mound. Failure: The target has the Prone condition.

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
[route] brute-regenerator type=Monstrosity mechanics=regeneration — brute-regenerator: ✓ ("knits shut around the axes left in it")
value check: "Grinding Embrace" EV 23.7 vs floor 22.4 (one attack of 3) — worth the trade
signature template: hook-drag -> Actions/"Grinding Embrace" ("The troll mound drags creatures caught in its crush along as it moves, keeping t [verb: drag:idea]")
signature template (trait): heated-body -> Traits/"Blade-Fed Hide" ("weapons remain buried in the healing flesh and later surface to jab outward and  [shape fit, no verb match]")
```


---

## shrine-warden

**Concept:** a stone shrine-guardian bound to the high priest it was made to protect

```
Shrine Warden

Large Construct, Lawful Neutral

AC 17
Initiative -1 (9)

HP 142 (15d10 + 60)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
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
+7
CHA
3
-4
-4

Skills Perception +3

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 13

Languages understands the languages of its high priest but can't speak

CR 7 (XP 2,900; PB +3)

Traits

Ward Bond. The shrine warden is magically bound to a ward of its choosing, and it can have only one ward at a time. While the shrine warden is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the shrine warden.

Regeneration. The shrine warden regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.

Actions

Multiattack. The shrine warden makes two Granite Fist attacks.

Granite Fist. Melee Attack Roll: +7, reach 10 ft. 11 (2d6 + 4) Bludgeoning damage plus 7 (2d6) Force damage.

Stone Aegis (2/Day). The shrine warden targets itself or one creature it can see within 60 feet. The target gains 18 (4d8) Temporary Hit Points, and its AC increases by 2 until the end of the shrine warden's next turn.

Bonus Actions

Consecrated Ridge (2/Day). Each ally within 30 feet of the shrine warden gains 9 (2d8) Temporary Hit Points.

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
[route] defender-warden type=Construct mechanics=none — defender-warden: ✓ ("a stone shrine-guardian bound to the hig")
value check: "Consecrated Ridge (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
signature template: rally -> Bonus Actions/"Consecrated Ridge (2/Day)" ("The slams a fist into the ground and a jagged ridge of consecrated stone erupts  [verb: shield:concept, protect:concept, ward:idea]")
signature miss: trait — "Whenever the shrine warden is within reach of its ward and that ward is hit by an attack, the shrine warden can lurch in front of the blow, taking the hit itself and letting its own body absorb the force. The attacker's weapon or spell crashes against the guardian's granite frame instead of the priest." [trait/on_being_hit/defense] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body)
```


---

## bellwether-choir

**Concept:** a swarm of funeral bells that ring themselves over the dying

```
Bellwether Choir

Medium Swarm of Tiny Constructs, Neutral

AC 15
Initiative +5 (15)

HP 170 (20d8 + 80)

Speed 40 ft., Fly 30 ft. (hover)

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
10
+0
+0
MOD
SAVE
CON
18
+4
+4
CHA
2
-4
-4

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses darkvision 60 ft.; Passive Perception 10

Languages Understands Common but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Clapper attacks.

Clapper. Melee Attack Roll: +10, reach 5 ft. 45 (9d8 + 5) Bludgeoning damage, or 14 (4d6) Bludgeoning damage if the swarm is Bloodied.

Funeral Toll (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 45 (13d6) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
[route] swarm type=Construct mechanics=aura — swarm: ✓ ("a swarm of funeral bells")
value check: "Funeral Toll (Recharge 5-6)" EV 119.3 vs floor 76.1 (the whole Multiattack (2 attacks)) — worth the trade
signature template: active-toll -> Actions/"Funeral Toll (Recharge 5-6)" ("the funeral bells ringing themselves over the dying is a ringing emanation that  [verb: ring:concept, bell:concept, toll:idea, peal:idea, knell:idea]")
signature miss: trait — "Every toll the Choir rings over a dying creature is one note closer to the end, and the swarm itself takes on that gathering weight: while it is locked onto a wounded target, its ringing grows more resonant and punishing with each successive knell, and the resonant edge of the sound is necrotic rather than merely loud. When the swarm is bloodied, the ringing curdles entirely — the accumulated peal" [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, assassinate, death-burst)
```


---

## thunder-anvil

**Concept:** an adult storm dragon whose breath is a rolling wall of thunder

```
Thunder Anvil

Huge Dragon, Neutral

AC 19
Initiative +1 (11)

HP 175 (14d12 + 84)

Speed 40 ft., Fly 80 ft.

MOD
SAVE
STR
22
+6
+6
INT
16
+3
+3
MOD
SAVE
DEX
12
+1
+6
WIS
14
+2
+7
MOD
SAVE
CON
22
+6
+6
CHA
18
+4
+4

Skills Perception +7, Stealth +6

Immunities Thunder

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 17

Languages Common, Draconic

CR 15 (XP 13,000; PB +5)

Traits

Stormwracked Retort. A creature that touches the thunder anvil or hits it with a melee attack while within 5 feet of it takes 21 (6d6) Thunder damage.

Legendary Resistance (3/Day). If the thunder anvil fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The thunder anvil makes three Bite attacks. It can replace one attack with a use of (A) Rolling Thunder Pull or (B) Spellcasting to cast Fear.

Bite. Melee Attack Roll: +11, reach 10 ft. 24 (4d8 + 6) Piercing damage plus 16 (3d10) Thunder damage.

Thunder Wall (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Thunder damage. Success: Half damage.

Spellcasting. The thunder anvil casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

- At Will: Command, Detect Magic, Fear, Suggestion

Rolling Thunder Pull. Strength Saving Throw: DC 18, one Huge or smaller creature within 60 feet. Failure: 21 (6d6) Thunder damage, and the target is pulled up to 25 feet straight toward the thunder anvil, and it has the Prone condition. Success: Half damage only.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the thunder anvil can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Rake. The thunder anvil makes one Bite attack.

Storm Strafe. The thunder anvil moves up to half its Speed without provoking Opportunity Attacks.

Voice Toll. Wisdom Saving Throw: DC 17, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("an adult storm dragon")
value check: "Rolling Thunder Pull" EV 21.6 vs floor 20.3 (one attack of 3) — added Success: Half
signature template: reel -> Actions/"Rolling Thunder Pull" ("The dragon's thunder breath is used to drag creatures straight toward it and kno [verb: drag:concept, pull:idea]")
signature template (trait): heated-body -> Traits/"Stormwracked Retort" ("a creature that hits it with a melee attack takes lightning damage as the charge [verb: lightning:concept, storm:concept, shock:idea]")
```


---

## gutter-lurk

**Concept:** a gutter assassin that hides between lantern-flickers

```
Gutter Lurk

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 50 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+5
WIS
12
+1
+1
MOD
SAVE
CON
13
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +7

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Thieves' Cant

CR 3 (XP 700; PB +2)

Traits

Between Lights. The gutter lurk ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The gutter lurk makes two attacks, using Stiletto or Dart in any combination.

Stiletto. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Dart. Ranged Attack Roll: +5, range 30/90 ft. 10 (2d6 + 3) Piercing damage.

Bonus Actions

Cunning Action. The gutter lurk takes the Dash, Disengage, or Hide action.

Lantern Flicker (Recharge 4-6). The gutter lurk teleports up to 40 feet to an unoccupied space it can see.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("hides between lantern-flickers")
value check: "Lantern Flicker (Recharge 4-6)" EV 2.3 vs floor 2 (a bonus action (free)) — worth the trade
signature template: blink -> Bonus Actions/"Lantern Flicker (Recharge 4-6)" ("the creature vanishes between lantern-flickers and reappears elsewhere — a flick [verb: flicker:concept]")
signature miss: trait — "The gutter lurk's body is woven from shadow-stuff that drinks nearby light, dimming any nonmagical flame or lantern within a short stretch around it. When a creature uses a light source to directly illuminate the lurk, the light gutters violently and goes out, leaving that creature blinded for a heartbeat as the shadows surge." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, assassinate, death-burst)
```


---

## vault-devourer

**Concept:** a vault that grew a hunger — the strongroom itself is the mimic

```
Vault Devourer

Huge Construct, Unaligned

AC 14
Initiative +2 (12)

HP 123 (13d12 + 39)

Speed 10 ft., Fly 40 ft.

MOD
SAVE
STR
20
+5
+5
INT
13
+1
+1
MOD
SAVE
DEX
15
+2
+6
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
13
+1
+1

Skills Stealth +6

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses blindsight 30 ft., darkvision 60 ft.; Passive Perception 11

Languages Undercommon (understands Dwarvish, cannot speak)

CR 11 (XP 7,200; PB +4)

Traits

Coinsnap Maw. The vault devourer adheres to anything that touches it. A Huge or smaller creature adhered to the vault devourer is also Grappled by it (escape DC 16). Ability checks made to escape this grapple have Disadvantage.

Light Sensitivity. While in Bright Light, the vault devourer has Disadvantage on attack rolls.

Actions

Multiattack. The vault devourer makes two Iron Slam attacks.

Iron Slam. Melee Attack Roll: +9 (with Advantage if the target is Grappled by the vault devourer), reach 10 ft. 23 (4d8 + 5) Bludgeoning damage plus 16 (3d10) Acid damage.

Engulf. Melee Attack Roll: +9, reach 5 ft. 23 (4d8 + 5) Bludgeoning damage plus 16 (3d10) Acid damage. If the target is a Large or smaller creature, the vault devourer attaches to it: the target has the Grappled condition (escape DC 17), and the vault devourer's attacks hit only the Grappled target while attached.

Vaulting Ambush (Recharge 5-6). The vault devourer spends 5 feet of movement to jump to a space within 30 feet that contains one or more Huge or smaller creatures. Dexterity Saving Throw: DC 16, each creature in the destination space. Failure: 39 (6d12) Acid damage, and the target has the Prone condition. Success: Half damage, and the target is pushed 5 feet straight away.

Bonus Actions

Camouflage. The vault devourer shape-shifts to resemble a natural feature of its surroundings while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
[route] lurker-trap type=Construct mechanics=none — lurker-trap: quote not found in the input ("it IS the ambush") | brute-grappler: quote not found in the input ("folds shut around prey") | brute-juggernaut: quote not found in the input ("is a MADE thing") | lurker-trap: taken on rank — its quote was not found, no hard veto | extra grapple: quote not found
value check: "Vaulting Ambush (Recharge 5-6)" EV 103.4 vs floor 20.3 (one attack of 2) — over the ceiling — gated Recharge 5-6
signature template: leap -> Actions/"Vaulting Ambush (Recharge 5-6)" ("ambush from (concept) — the vault itself lunges from a deceptively harmless vaul [verb: ambush from:concept]")
signature template (trait): adhesive -> Traits/"Coinsnap Maw" ("The vault devourer snaps shut on the would-be thief before it can touch a single [verb: mimic:concept, strongroom:concept, vault:concept]")
```


---

## scarp-troll

**Concept:** a cliff troll that shears slabs off the rockface and hurls them at climbers

```
Scarp Troll

Large Giant, Neutral

AC 16
Initiative +3 (13)

HP 93 (11d10 + 33)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
+4
INT
10
+0
+0
MOD
SAVE
DEX
16
+3
+6
WIS
14
+2
+5
MOD
SAVE
CON
16
+3
+3
CHA
10
+0
+0

Skills Perception +5, Stealth +6

Senses darkvision 60 ft.; Passive Perception 15

Languages Giant

CR 5 (XP 1,800; PB +3)

Traits

Shard Spray. A creature that touches the scarp troll or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Piercing damage.

Wall Crawler. The scarp troll ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The scarp troll makes three attacks, using Shearing Slab or Hurled Scythe in any combination. It can replace one attack with a use of Shard Brand.

Shearing Slab. Melee Attack Roll: +6, reach 5 ft. 10 (2d6 + 3) Bludgeoning damage.

Hurled Scythe. Ranged Attack Roll: +6, range 30/90 ft. 7 (1d8 + 3) Bludgeoning damage.

Rockfall (Recharge 5-6). The scarp troll hurls a stone slab at a point it can see within 90 feet. Dexterity Saving Throw: DC 13, each creature in a 5-foot-radius Sphere centered on that point. Failure: 31 (9d6) Bludgeoning damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Shard Brand. Constitution Saving Throw: DC 13, one creature within 60 feet. Failure: The target is branded: it takes 10 (3d6) Piercing damage at the start of each of its turns until it uses its action to tear the brand away Success: Half damage only.

Bonus Actions

Fleet Agility. The scarp troll takes the Dash or Disengage action.

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
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls them at climbers")
signature miss: action — "The scarp troll rips a jagged plate of stone from the wall and hurls it with both hands at a climber it can see. The stone shatters across the target's grip, and for a short while any surface they cling to crumbles under their fingers." [rider/on_hit/condition] — "thrown-burst-seed" is not legal on this sheet (its library gate — dominance, nova, or a missing imposed condition)
value check: "Lingering Brand" EV 7.8 vs floor 5.2 (one attack of 3) — added Success: Half; dice 6 → 10
library seed drawn: delayed-brand -> Actions/"Lingering Brand" (no template held the idea; a proven shape stands in)
signature template (trait): heated-body -> Traits/"Shard Spray" ("a solid blow lands and a shard cracks free, spraying the attacker who hit it in  [verb: shard:idea]")
```
