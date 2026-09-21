## 04. Drowned Lady — CR 7

**Input:** `a drowned lady who drifts through the walls of a sunken chapel`
**Donor:** lurker-5-phantom -> CR 7
**Signature:** custom · **elapsed** 13s

### Block
```
Drowned Lady

Medium Undead, Neutral

AC 13
Initiative +4 (14)

HP 82 (11d8 + 33)

Speed 5 ft., Fly 60 ft. (hover), Swim 5 ft.

MOD
SAVE
STR
6
-2
-2
INT
12
+1
+1
MOD
SAVE
DEX
18
+4
+7
WIS
14
+2
+2
MOD
SAVE
CON
16
+3
+3
CHA
15
+2
+2

Skills Stealth +7

Resistances Bludgeoning, Cold, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained

Senses darkvision 60 ft.; Passive Perception 12

Languages understands Common but can't speak

CR 7 (XP 2,900; PB +3)

Traits

Drifting Through Stone. The drowned lady can move through creatures and objects as if they were Difficult Terrain, but it can't end its movement inside an object. While inside an object, it has total cover against attacks from outside.

Incorporeal Movement. The drowned lady can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.

Sunlight Sensitivity. While in sunlight, the drowned lady has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The drowned lady makes two Grave Hand attacks.

Grave Hand. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Necrotic damage.

Sudden Drowning (Recharge 4-6). The drowned lady chooses one creature that she moved through this turn; that target must make a DC 14 Constitution saving throw or become Restrained by spectral water and take 18 (4d8) Necrotic damage. A Restrained target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. While Restrained by this effect, the target takes 9 (2d8) Cold damage at the start of each of its turns as the drowned lady's grave-cold seeps into its flesh.

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
[concept] synthesis: archetype=lurker type=Undead themes=grave/aquatic mind=sapient lore=✓
[concept] lore: She was a bride who drowned in the chapel's flooded crypt on her wedding day; now she drifts through its walls, forever seeking the warmth of the living to ease her endless cold.
[concept] resolve: archetype=lurker type=Undead themes=grave/aquatic mind=sapient style=phantom energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: provided "Drowned Lady"
[concept] mechanics: engulf
[concept] signature elements: phasing through walls [behavior] | drowned bride's cold touch [body] | sunken chapel bound [aura]
[concept] identity: The Drowned Lady waits within the sunken chapel's walls, her grave-cold body pressed against the stone, until a living creature draws near — then she phases through the masonry to strike without warning, her touch carrying the chill of the deep. She drifts in and out of walls each round, using the architecture as her hunting ground, never staying in the open. If badly wounded, she retreats into the stone to recover, then resumes her silent stalking; she does not flee the chapel, for she is bound to it as surely as the tide to the moon.
[concept] lore: She was a bride who drowned in the chapel's flooded crypt on her wedding day; now she drifts through its walls, forever seeking the warmth of the living to ease her endless cold.
[reskin] donor: lurker-5-phantom -> CR 7
[reskin] seats: action <- "phasing through walls" | trait <- "drowned bride's cold touch"
[reskin] repair round 1: 1 defect(s) — "Grave-Cold Hand" deals Cold but this creature's energy is Necrotic — use Necrotic or a physical type
[reskin] trait wildcard: "Drifting Through Stone"
[reskin] informed wildcard — written against the assembled sheet
[reskin] wildcard accepted: The drowned lady chooses one creature that she moved through this turn; that target must make a DC 1
[reskin] immunities stamped for type: Undead + donor suite -> Poison; Charmed, Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained
[reskin] resistances derived: Bludgeoning, Cold, Piercing, Slashing
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] lint actuator rename: "Grave-Cold Hand" -> "Grave-Necrotic Hand"
[reskin] lint: entry-name-type-mismatch: Actions/Grave-Cold Hand: the name says Cold but the entry deals Necrotic — a type-named ability must deal its named type (0/329 officials mismatch). Renamed to "Grave-Necrotic Hand"
audit finding below confidence gate: Sudden Drowning The targeting depends on the drowned lady having moved through the creature this turn, but the block never states how a creature is eligible to be 'moved through' or whether the ghost must be inside/adjacent, leaving the GM without clear targets.
[reskin] audit: [Drifting Through Stone: This entry is near-identic…t has total cover against attacks from outside."), Grave-Necrotic Hand: The entry name's adjective pr…ck it actually is. (about: "Grave-Necrotic Hand")]
[reskin] audit rename: "Grave-Necrotic Hand" -> "Grave Hand"
[reskin] done: "Drowned Lady" — donor lurker-5-phantom, CR 7
```
