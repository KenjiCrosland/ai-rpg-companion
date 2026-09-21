## 01. Mire Father — CR 8

**Input:** `a bog troll that drags victims under the mire and holds them down`
**Donor:** caster-6 -> CR 8
**Signature:** library · **elapsed** 13s

### Block
```
Mire Father

Large Monstrosity, Neutral

AC 16
Initiative +2 (12)

HP 110 (13d10 + 39)

Speed 30 ft., Burrow 30 ft., Swim 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
20
+5
+8
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
16
+3
+3
CHA
11
+0
+0

Skills Arcana +8, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Peat-Clogged Hide. The mire father can hold its breath indefinitely while submerged in the mire. While in the mire, the mire father has Advantage on Dexterity (Stealth) checks.

Regeneration. The mire father regains 15 Hit Points at the start of each of its turns. If the mire father takes Acid or Fire damage, this trait doesn't function on the mire father's next turn. The mire father dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Actions

Multiattack. The mire father makes three Grasp attacks. It can replace one attack with a use of (A) Drowning Drag or (B) Spellcasting to cast Hold Person.

Grasp. Melee or Ranged Attack Roll: +8, reach 5 ft. or range 120 ft. 18 (3d8 + 5) Bludgeoning damage.

Spellcasting. The mire father casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 15):

- At Will: Fog Cloud, Hold Person
- 1/Day Each: Blight, Cloudkill

Drowning Drag. Strength Saving Throw: DC 15, one creature within 30 feet. Failure: The target is pulled up to 20 feet straight toward the mire father and has the Grappled condition (escape DC 15).

Reactions

Protective Magic (3/Day). Trigger: The mire father is hit by an attack roll. Response: The mire father casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[concept] synthesis: archetype=controller type=Monstrosity themes=grasping/devouring mind=sapient lore=✓
[concept] lore: Born from a troll that drowned and kept regenerating in the same bog for centuries, it is a mire-bound hunger that wants nothing more than to pull all air-breathers into its dark.
[concept] resolve: archetype=controller type=Monstrosity themes=grasping/devouring mind=sapient style=grappler energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf, regeneration
[concept] signature elements: dragging victims beneath the mire [behavior] | slick, brine-soaked hide [body] | regenerates while submerged [aura]
[concept] identity: The bog troll wades through the mire, its hide slick with black water and rot, and opens by lurching from beneath the surface to seize the nearest victim. Once its grasping hands clamp onto a target, it drags them down into a cocoon of peat and silt, pinning them beneath the bog where only a grappled victim's panic and swallowed screams remain. It fights with patience, holding prey under until they drown or its own regeneration makes it nearly impossible to dislodge.
[concept] lore: Born from a troll that drowned and kept regenerating in the same bog for centuries, it is a mire-bound hunger that wants nothing more than to pull all air-breathers into its dark.
[reskin] donor: caster-6 -> CR 8
[reskin] seats: action <- "dragging victims beneath the mire" | trait <- "slick, brine-soaked hide"
[reskin] trait wildcard rejected — typed damage defenses are the derivation engine's — the concept's energy earns its resistance deterministically; a trait never grants resistance or immunity to damage types: The creature has resistance to poison damage and advantage on saving throws against being poisoned. It can hold its brea
[reskin] informed wildcard — written against the assembled sheet
[reskin] wildcard rejected — a trait never carries a damage roll, a save frame, or an on-hit trigger — an ON-HIT RIDER lives on the attack row itself (declare rider_on:<that row's new name> and write "When the creature hits with this attack, ..."); a triggered save is an action or reaction: One creature within 30 feet that is grappled by the mire father must make a DC 15 Strength saving throw or be pulled 15 
[reskin] repair draft rejected — a trait never carries a damage roll, a save frame, or an on-hit trigger — an ON-HIT RIDER lives on the attack row itself (declare rider_on:<that row's new name> and write "When the creature hits with this attack, ..."); a triggered save is an action or reaction: One creature within 30 feet that is grappled by the creature is dragged 15 feet toward the creature 
[reskin] trait wildcard repaired: "Peat-Clogged Hide"
[reskin] library seed drawn: hook-drag -> Actions/"Drowning Drag" (the wildcard died; a proven shape stands in)
[reskin] languages defaulted for sapient: Common
[reskin] name-canon trait stamped: Regeneration (the name says so; print says what it does)
[reskin] multiattack replacement clause: It can replace one attack with a use of (A) Drowning Drag or (B) Spellcasting to cast *Hold Person*.
[reskin] lint: 0 findings
audit rewrite meta-language, dropped: Multiattack It can replace one attack with a use of Drowning Drag or Spellcasting to cast *Hold Person*.
[reskin] audit: [Peat-Clogged Hide: The trait references 'the mire'…er has Advantage on Dexterity (Stealth) checks."), Multiattack: The parenthetical option letters are …Drag or (B) Spellcasting to cast *Hold Person*.")]
[reskin] done: "Mire Father" — donor caster-6, CR 8
```
