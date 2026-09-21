## 05. Altar Warden — CR 11

**Input:** `a cathedral guardian that anchors itself before the altar and refuses to be moved`
**Donor:** defender-7-warden -> CR 11
**Signature:** library · **elapsed** 13s

### Block
```
Altar Warden

Large Construct, Lawful Neutral

AC 18
Initiative -1 (9)

HP 209 (22d10 + 88)

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

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 14

Languages understands Celestial but can't speak

CR 11 (XP 7,200; PB +4)

Traits

Anchored Before the Altar. The altar warden can't be moved against its will by any effect unless that effect also knocks it Prone. While it remains in its original space, it has Advantage on Strength and Constitution saving throws.

Ward Bond. The altar warden is magically bound to a ward of its choosing, and it can have only one ward at a time. While the altar warden is within 60 feet of its ward, half of any damage the ward takes (round up) is transferred to the altar warden.

Regeneration. The altar warden regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point. If the altar warden takes Necrotic damage, this trait doesn't function at the start of the altar warden's next turn.

Actions

Multiattack. The altar warden makes two Slam attacks.

Slam. Melee Attack Roll: +9, reach 10 ft. 18 (3d8 + 5) Bludgeoning damage plus 11 (2d10) Radiant damage.

Consecrated Aegis (2/Day). The altar warden targets itself or one creature it can see within 60 feet. The target gains 28 (8d6) Temporary Hit Points, and its AC increases by 2 until the end of the altar warden's next turn.

Bonus Actions

Sacred Ground (2/Day). The altar warden fills a 15-foot-radius Sphere centered on a point it can see within 60 feet. The area is Lightly Obscured and Difficult Terrain until the start of the altar warden's next turn.

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
!! Error generating response: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:241:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1789926908380:1376:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1789926908380:1215:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1789926908380:653:5)
!! [ENRICHMENT] Failed to enrich Drowned Bride: TypeError: Failed to fetch
    at generateGptResponse (http://localhost:5173/src/util/ai-client.mjs:241:26)
    at enrichCustomStatblock (http://localhost:5173/src/util/statblock-enrichment.mjs:303:26)
    at saveGeneratedMonster (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1789926908380:1376:30)
    at async generateStatblockEngine (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1789926908380:1215:3)
    at async generateStatblock (http://localhost:5173/src/tools/statblock-generator/StatblockGenerator.vue?t=1789926908380:653:5)
[concept] synthesis: archetype=defender type=Construct themes=grave/forged mind=sapient lore=✓
[concept] lore: Born when a dying saint's prayer fused with the cathedral's worked stone, it now waits before the altar, certain that only its stillness keeps the holy from spilling out into the world.
[concept] resolve: archetype=defender type=Construct themes=grave/forged mind=sapient style=warden energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura, regeneration
[concept] signature elements: rooting itself before the altar and refusing to be moved [behavior] | a body of sanctified worked stone and bone [body] | the consecrated guardian aura that wards the sacred ground [aura]
[concept] identity: The cathedral guardian anchors itself before the altar, roots of worked stone spreading across the flagstones, and refuses to be moved or flanked. It opens by slamming its massive bulk and raising a consecrated barrier of kneeling-stone vines; thereafter it locks the enemy down with its mass and seals off the sacred ground, fighting to the death rather than abandon its charge.
[concept] lore: Born when a dying saint's prayer fused with the cathedral's worked stone, it now waits before the altar, certain that only its stillness keeps the holy from spilling out into the world.
[reskin] regeneration off-switch: Necrotic (foil of Radiant)
[reskin] donor: defender-7-warden -> CR 11
[reskin] seats: action <- "rooting itself before the altar and refusing to be moved" | trait <- "a body of sanctified worked stone and bone"
[reskin] trait wildcard: "Anchored Before the Altar"
[reskin] informed wildcard — written against the assembled sheet
[reskin] wildcard rejected — the chassis already carries its priced Recharge nova — print never fields two; use "2/Day", or make this modest and ungated: The altar warden chooses up to three creatures it can see within 30 feet, each of which must make a DC 16 Strength savin
[reskin] repair draft rejected — the chassis already carries its priced Recharge nova — print never fields two; use "2/Day", or make this modest and ungated: The altar warden slams its bulk into the flagstones, and up to three creatures within 30 feet make a
[reskin] repair draft rejected — the chassis already carries its priced Recharge nova — print never fields two; use "2/Day", or make this modest and ungated: The altar warden slams its bulk into the flagstones, and up to three creatures within 30 feet make a
[reskin] repair draft rejected — the chassis already carries its priced Recharge nova — print never fields two; use "2/Day", or make this modest and ungated: The altar warden slams its bulk into the flagstones, and up to three creatures within 30 feet make a
[reskin] wildcard repair skipped — Failed to generate a valid response. Please try again later.
[reskin] library seed drawn: zone -> Actions/"Sacred Ground (2/Day)" (the wildcard died; a proven shape stands in)
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] dead control row: "Sacred Ground (2/Day)" moves to Bonus Actions — no damage, no save, no KO condition
[reskin] lint: 0 findings
[reskin] audit: [Anchored Before the Altar: The trait references be…effect unless that effect also knocks it Prone.")]
[reskin] done: "Altar Warden" — donor defender-7-warden, CR 11
```
