## 03. Storm Titan Who Walks the Thunderhead and Judges the Drowned — CR 20

**Input:** `a storm titan who walks the thunderhead and judges the drowned`
**Donor:** caster-12 -> CR 20
**Signature:** custom · **elapsed** 14s

### Block
```
Storm Titan Who Walks the Thunderhead and Judges the Drowned

Gargantuan Giant, Lawful Neutral

AC 19
Initiative +2 (12)

HP 247 (15d20 + 90)

Speed 30 ft., Fly 30 ft. (hover)

MOD
SAVE
STR
10
+0
+0
INT
26
+8
+14
MOD
SAVE
DEX
14
+2
+2
WIS
15
+2
+8
MOD
SAVE
CON
22
+6
+6
CHA
16
+3
+3

Skills Arcana +14, Perception +8

Immunities Deafened

Senses truesight 120 ft.; Passive Perception 18

Languages Common, Giant, Primordial

CR 20 (XP 25,000; PB +6)

Traits

Body of Living Storm. The storm titan can move through the space of any creature as if it were Difficult Terrain, and it can walk on clouds and fog as if they were solid ground.

Actions

Multiattack. The storm titan makes four Thunderbolt attacks. It can replace one attack with a use of Spellcasting to cast Lightning Bolt.

Thunderbolt. Melee or Ranged Attack Roll: +14, reach 5 ft. or range 150 ft. 35 (6d8 + 8) Thunder damage.

Spellcasting. The storm titan casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 21):

- At Will: Lightning Bolt
- 1/Day Each: Thunderwave (level 6 version), Ice Storm (level 7 version), Cloudkill (level 7 version)

Thunder Verdict (Recharge 5–6). The storm titan pronounces doom on one creature it can see within 150 feet that is missing any Hit Points: the target makes a DC 21 Wisdom saving throw or takes 36 (8d8) Thunder damage, is Blinded until the start of the titan's next turn, and its Speed is halved until the end of its next turn. If the target is in water, fog, or Difficult Terrain created by the titan, it has Disadvantage on this saving throw. A creature that succeeds instead takes 18 (4d8) Thunder damage and is Deafened until the start of the titan's next turn.

Reactions

Protective Magic (3/Day). Trigger: The storm titan is hit by an attack roll. Response: The storm titan casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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
[concept] synthesis: archetype=controller type=Giant themes=elemental/grave mind=sapient lore=✓
[concept] lore: Born from the last breath of a drowned armada, the storm titan walks the thunderhead to judge those who escaped the sea's embrace and send them back to it.
[concept] resolve: archetype=controller type=Giant themes=elemental/grave mind=sapient style=winged energy=Thunder mix=both identity=✓ lore=✓
[concept] name: provided "storm titan who walks the thunderhead and judges the drowned"
[concept] mechanics: summon, breath, aura
[concept] signature elements: judgment of the drowned [behavior] | body of living storm [body] | walking the thunderhead [aura]
[concept] identity: It opens by summoning a thunderhead that floods the field with freezing brine, then each round it hurls thunderbolts and pronounces drowning verdicts that bind and blind the guilty. It never brawls — it stands at the center of its storm and rearranges the battlefield, and if bloodied it simply flies to a higher cloud and rewrites the terms of the fight.
[concept] lore: Born from the last breath of a drowned armada, the storm titan walks the thunderhead to judge those who escaped the sea's embrace and send them back to it.
[reskin] donor: caster-12 -> CR 20
[reskin] seats: action <- "judgment of the drowned" | trait <- "body of living storm"
[reskin] repair round 1: 1 defect(s) — the wildcard deals Cold but this creature's energy is Thunder — use Thunder or a physical type
[reskin] trait wildcard: "Body of Living Storm"
[reskin] informed wildcard — written against the assembled sheet
[reskin] wildcard accepted: The storm titan pronounces doom on one creature it can see within 150 feet that is missing any Hit P
[reskin] trait-granted condition immunity merged into header: Deafened
[reskin] multiattack replacement clause: It can replace one attack with a use of Spellcasting to cast *Lightning Bolt*.
[reskin] lint: 0 findings
[reskin] audit: [Multiattack: The Spellcasting entry contains Light…a use of Spellcasting to cast *Lightning Bolt*."), Spellcasting: The name 'Spellcasting' promises a s…n costs. (about: "**At Will:** *Lightning Bolt*"), Drowning Verdict (Recharge 5–6): The name 'Drownin…afened until the start of the titan's next turn"), Drowning Verdict (Recharge 5–6): The Blinded condi…linded until the start of the titan's next turn")]
[reskin] audit rename: "Drowning Verdict (Recharge 5–6)" -> "Thunder Verdict (Recharge 5–6)"
[reskin] done: "Storm Titan Who Walks the Thunderhead and Judges the Drowned" — donor caster-12, CR 20
```
