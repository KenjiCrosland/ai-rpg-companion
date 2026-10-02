# Signature-slot review — single run, no comparison

Run: `form-owlbear-2026-10-01T18-52-09`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.


---

## owlbear

**Concept:** name: Owlbear | Flying speed of 60ft

```
Owlbear

Large Monstrosity, Unaligned

AC 13
Initiative +1 (11)

HP 59 (7d10 + 21)

Speed 40 ft., Fly 60 ft., Climb 40 ft.

MOD
SAVE
STR
20
+5
+5
INT
3
-4
-4
MOD
SAVE
DEX
12
+1
+3
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
7
-2
-2

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Winged Dive. The owlbear ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The owlbear makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.

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
[route] skirmisher-winged type=Monstrosity mechanics=none — skirmisher-winged: ✓ ("Flying speed of 60ft") | skirmisher-winged: no line key in the words — the model's read of its quote
print canon route: the Owlbear's body outranks the winged seat — no verb in the words names it; the plain skirmisher line
print canon defenses: HP 54 -> 59, AC 15 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 12 (print's)
print canon: "Owlbear — Flying speed of 60ft" heads on the Owlbear — print's rows ride along; the seat stays
signature miss: action — "The owlbear launches itself at a creature it can see within reach, raking with talons and snapping with its beak in one fluid motion. If the creature is smaller than the owlbear, the owlbear can immediately pull back into the air, ending the movement out of the creature's reach without provoking a reaction from it." [rider/on_hit/movement] — the model found no template that holds it (offered: affliction, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge, leap, reel, aggro-curse)
fallback stands down: "Owlbear — Flying speed of 60ft" heads on the Owlbear and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
value check: "Horrid Display (2/Day)" EV 13.2 vs floor 20.3 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
trait declined: "Swooping Stride" — bound only on the idea's own words (scree:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
print canon speed: 50 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
print canon speed: Climb -> 40 ft. — the Owlbear's own
print canon attack: "Talons" -> "Rend" — the Owlbear's own row
print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Owlbear's
```
