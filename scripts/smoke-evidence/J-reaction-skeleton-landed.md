## 01. She Who Answers — CR 7

**Input:** `a duelist who ripostes the instant a blade misses her guard`
**Donor:** skirmisher-3-skulker -> CR 7
**Signature:** custom · **elapsed** 19s

### Block
```
She Who Answers

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 117 (18d8 + 36)

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
18
+4
+7
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
8
-1
-1

Skills Perception +4, Stealth +10

Vulnerabilities Thunder

Resistances Lightning

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Stormbound Reflex. When a creature misses her with an attack roll, lightning arcs through the attacker and the she's next attack roll against that creature has Advantage. The she can't gain this Advantage more than once per turn.

Footwork. The she ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The she makes two attacks, using Rapier or Sparking Wand in any combination.

Rapier. Melee Attack Roll: +7, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 10 (3d6) Lightning damage.

Sparking Wand. Ranged Attack Roll: +7, range 30/90 ft. 22 (4d8 + 4) Lightning damage.

Bonus Actions

Cunning Action. The she takes the Dash, Disengage, or Hide action.

Reactions

Answered Promise. Trigger: A creature within 30 feet misses the she with an attack roll. Response: The target must succeed on a DC 14 Dexterity saving throw or take 18 (4d8) Lightning damage and have the Prone condition; if the target is bloodied, it has Disadvantage on this save and takes an additional 9 (2d8) Lightning damage on a failure. After the save resolves, the she may move up to half its Speed without provoking Opportunity Attacks.

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
[concept] synthesis: archetype=skirmisher type=Humanoid themes=armed/elemental mind=sapient lore=✓
[concept] lore: Born of a duelist's final undischarged promise and the lightning that struck the field where she fell, she wanders dueling-grounds seeking the single opponent who can beat her clean.
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed/elemental mind=sapient style=skulker energy=Lightning mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: the instant riposte that answers any missed blow [behavior] | a body crackling with contained storm-lightning [body] | a slender dueling blade that hums with charge [object]
[concept] identity: She opens by fending off an enemy's first strike, then punishes the miss with a lightning-fast riposte; every round she baits, slips, and counters, threading through blades with a fencer's economy of motion. Bloodied, she does not lose composure — she turns desperate, all-in, trading her defense for one perfect reply and withdrawing in a spray of sparks if it fails.
[concept] lore: Born of a duelist's final undischarged promise and the lightning that struck the field where she fell, she wanders dueling-grounds seeking the single opponent who can beat her clean.
[reskin] donor: skirmisher-3-skulker -> CR 7
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] seats: action <- "the instant riposte that answers any missed blow" | trait <- "a body crackling with contained storm-lightning"
[reskin] trait wildcard: "Stormbound Reflex"
[reskin] informed wildcard — written against the assembled sheet
[reskin] wildcard rejected — a Reaction must state when it fires — write print's skeleton: "*Trigger:* <specific event>. *Response:* <what the creature does>." — or declare it an action: One creature within 30 feet that missed the she with an attack roll since the end of her last turn must succeed on a DC 
[reskin] wildcard repaired: *Trigger:* A creature within 30 feet misses the she with an attack roll. *Response:* The target must
[reskin] resistances derived: Lightning
[reskin] vulnerability shipped: Thunder
[reskin] lint: phrasing-rider-save: 2014 rider-save phrasing in Reactions/Answered Promise — rider saves use the skeleton too: "*<Ability> Saving Throw:* DC n, <target>. *Failure:* <effect>" | vocab-register: Reactions/Answered Promise: off-corpus register — "opportunity attacks" (never "attacks of opportunity") and "can" (never "may")
[reskin] audit: [Stormbound Reflex: Ungrammatical phrasing; "misses…n a creature misses the she with an attack roll"), Answered Promise: The Reaction's move is not defin…ts Speed without provoking Opportunity Attacks."), Stormbound Reflex: The trait's trigger and benefit…ttack roll against that creature has Advantage.")]
[reskin] audit rewrite: Stormbound Reflex: "When a creature misses the she with an attack roll" -> "When a creature misses her with an attack roll"
[reskin] done: "She Who Answers" — donor skirmisher-3-skulker, CR 7
```
