## 01. Oathsworn Pyre — CR 10

**Input:** `a war-priest in battle plate who calls down pillars of divine flame on the unfaithful and turns the dead with a raised holy symbol`
**Donor:** caster-10-warpriest -> CR 10
**Signature:** library · **elapsed** 16s

### Block
```
Oathsworn Pyre

Medium Humanoid, Lawful Neutral

AC 16
Initiative +1 (11)

HP 142 (19d8 + 57)

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
12
+1
+1
WIS
20
+5
+9
MOD
SAVE
CON
17
+3
+3
CHA
16
+3
+7

Skills Perception +9, Religion +5

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 19

Languages Common, Celestial

CR 10 (XP 5,900; PB +4)

Traits

Raised Holy Symbol. Undead creatures within 30 feet of the oathsworn pyre have Disadvantage on saving throws against its Pillar of Divine Flame. The oathsworn pyre has Advantage on saving throws against being Frightened.

Actions

Multiattack. The oathsworn pyre makes two Crusader's Warhammer attacks. It can replace one attack with a use of Spellcasting to cast Guiding Bolt.

Crusader's Warhammer. Melee Attack Roll: +9, reach 5 ft. 19 (4d6 + 5) Bludgeoning damage plus 14 (4d6) Fire damage.

Spellcasting. The oathsworn pyre casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Guiding Bolt, Light
- 1/Day Each: Wall of Fire (level 6 version), Burning Hands (level 7 version)

Pillar of Divine Flame (2/Day). The oathsworn pyre fills a 15-foot-radius Sphere centered on a point it can see within 60 feet. The area is Lightly Obscured and Difficult Terrain until the start of the oathsworn pyre's next turn.

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
[concept] synthesis: archetype=controller type=Humanoid themes=celestial/armed mind=sapient lore=✓
[concept] lore: A crusader who took an oath to purge the unfaithful from a fallen temple, it now stalks the ruins and roads of that faith, answering any challenge with pillar and flame.
[concept] resolve: archetype=controller type=Humanoid themes=celestial/armed mind=sapient style=warpriest energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: pillars of divine flame [behavior] | raised holy symbol that turns the dead [object] | battle plate [body]
[concept] identity: The war-priest opens by raising its holy symbol, turning the dead to break enemy lines before calling down a pillar of divine flame on the largest cluster. Every round thereafter it alternates between searing ranged pillars and wading into melee with its consecrated maul to punish those who close, using its battle plate to weather the counterattack. It fights to the death with grim certainty, never fleeing, because its faith is its shield.
[concept] lore: A crusader who took an oath to purge the unfaithful from a fallen temple, it now stalks the ruins and roads of that faith, answering any challenge with pillar and flame.
[reskin] donor: caster-10-warpriest -> CR 10
[reskin] seats: action <- "pillars of divine flame" | trait <- "raised holy symbol that turns the dead"
[reskin] repair round 1: 1 defect(s) — name "Consecrated Maul" claims an element its damage (Bludgeoning/Fire) does not pay
[reskin] trait wildcard: "Raised Holy Symbol"
[reskin] informed wildcard — written against the assembled sheet
[reskin] wildcard rejected — a trait never carries a damage roll, a save frame, or an on-hit trigger — an ON-HIT RIDER lives on the attack row itself (declare rider_on:<that row's new name> and write "When the creature hits with this attack, ..."); a triggered save is an action or reaction: The oathsworn pyre calls down a searing column of holy fire at a point it can see within 60 feet; *Dexterity Saving Thro
[reskin] repair draft rejected — an ungated area action prices per TARGET — halve the dice or add a use gate like "(Recharge 5-6)": The oathsworn pyre calls down a searing column of holy fire at a point it can see within 60 feet. *D
[reskin] repair draft rejected — an ungated area action prices per TARGET — halve the dice or add a use gate like "(Recharge 5-6)": The oathsworn pyre calls down a searing column of holy fire at a point it can see within 60 feet. *D
[reskin] repair draft rejected — an ungated area action prices per TARGET — halve the dice or add a use gate like "(Recharge 5-6)": The oathsworn pyre calls down a searing column of holy fire at a point it can see within 60 feet. *D
[reskin] wildcard repair skipped — Failed to generate a valid response. Please try again later.
[reskin] library seed drawn: zone -> Actions/"Pillar of Divine Flame (2/Day)" (the wildcard died; a proven shape stands in)
[reskin] resistances derived: Fire
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Guiding Bolt*.
[reskin] lint: 0 findings
[reskin] audit: [Raised Holy Symbol: Pillar of Divine Flame has no …ving throws against its Pillar of Divine Flame.")]
[reskin] done: "Oathsworn Pyre" — donor caster-10-warpriest, CR 10
```
