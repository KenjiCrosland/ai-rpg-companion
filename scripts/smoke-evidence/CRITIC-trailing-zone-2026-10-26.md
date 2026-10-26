# The trailing-zone shape — a read as a GM running it

**What this is.** Four CR 8–15 blocks. Three carry a PROPOSED new trait shape at
three different table costs; the fourth is the shape that already ships, as a
control. Nothing here is in the catalog — these were grafted onto real generated
sheets so the row can be judged in context.

**Why it is being proposed.** "A zone" is the kind of signature ability the
model asks for most (6 of 18 ideas in each of three runs), and over half of
those are a TRAILING effect — "the ground it has just crossed", "a scree apron
behind it", "its footsteps glaze the ground to ice". The catalog has only
around-the-creature auras. Offered one, the model refused it and named the
difference itself: *"the wake left behind its path as it moves, NOT an aura
around it."* So the ask is real and specific.

**What the engine already says.** All four blocks pass the checker with zero
findings, so this is not a soundness question a predicate can settle. It is a
PLAYABILITY question, which is why it is here.

**What print says — the one fact that matters most.** Searching all 329 SRD
monsters for a row that refers to a space the creature has left returns exactly
one: the Lich's Deathly Teleport, *"each creature within 10 feet of the space it
left takes 11 (2d10) Necrotic damage"* — and it resolves IMMEDIATELY. print has
28 rows that create a lasting area the GM must track, and not one of them is
tied to where the creature used to be. **Print never asks a GM to remember a
vacated space across time.** That is the bar these three variants are being
measured against, and it is the reason this is a critic question rather than a
build.

## The question for the read

For each of #01, #02, #03, running it at a real table:

1. **Can you adjudicate it from the one sentence**, mid-combat, without
   re-reading? (A monster shape was cut last week for failing exactly this.)
2. **What must you hold in your head that the table does not already show
   you?** Round number, HP and conditions are free. Is "which squares it
   vacated" free on a grid? In theatre of the mind?
3. Does it make the monster **more memorable**, or only more fiddly?
4. **ship / fix-lite / fix** — and if fix-lite, what wording fixes it?
5. Compare each against **#04, the control**, which costs the GM nothing and is
   print-exact. Is the trailing version worth the extra cost over that?

## The three variants, by cost

- **#01 Melt-Reaver — "Killing Frost Wake"** (terrain only, the whole path).
  The cheapest payload, the most expensive bookkeeping: every square a Huge
  creature vacated this round.
- **#02 Pit Scree — "Spilling Scree"** (terrain + damage, the whole path). The
  shape the model keeps asking for. Same bookkeeping, and now the GM must also
  ask "did anyone enter one of those squares" on every creature's turn.
- **#03 Melt-Reaver — "Settling Frost"** (ONE square, damage). Closest to the
  Lich's precedent: one space, one round. Cheap to run — possibly too weak to
  be worth the ink, which is its own kind of failure.
- **#04 Rimewake Colossus — "Killing Cold Wake"** (CONTROL, already ships).
  An around-the-creature aura. No tracking at all.

My own read as the implementer, for what it is worth and not as the verdict:
#02 is the idea everyone keeps describing and the one I would least want to run;
#03 I would run without complaint and might not notice. If the read lands on
#03, the honest conclusion may be that the trailing shape is not worth building
and the around-form plus a better body question is the whole answer.

---

# Blocks for review

4 blocks, rendered from the saved JSON, keyed by run and sheet index.

---

## trailing-critic#01 — Melt-Reaver

**Input:** ``

```
Melt-Reaver
Huge Elemental, Neutral
AC 16   HP 262 (25d12 + 100)   Speed 30 ft.
STR 22  DEX 8  CON 19  INT 6  WIS 10  CHA 4
CR 15   [2024 rules]

Traits
  Killing Frost Wake. Each space the melt-reaver leaves as it moves becomes Difficult Terrain until the start of its next turn.
  Cold Absorption. Whenever the melt-reaver is subjected to Cold damage, it takes no damage and instead regains a number of Hit Points equal to the Cold damage dealt.
  Siege Monster. The melt-reaver deals double damage to objects and structures.
Actions
  Multiattack. The melt-reaver makes two Frozen Limbs attacks.
  Frozen Limbs. Melee Attack Roll: +11, reach 10 ft. 42 (8d8 + 6) Cold damage.
  Creeping Field (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 30-foot Cone. Failure: 71 (13d10) Cold damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.
Bonus Actions
  Answering Sting. One creature within 5 feet that hit the melt-reaver with an attack roll since the end of the melt-reaver's last turn takes 17 (5d6) Cold damage.
```

---

## trailing-critic#02 — Pit Scree

**Input:** ``

```
Pit Scree
Large Elemental, Neutral
AC 15   HP 153 (18d10 + 54)   Speed 40 ft., Burrow 30 ft.
STR 20  DEX 8  CON 17  INT 4  WIS 12  CHA 6
CR 8   [2024 rules]

Traits
  Spilling Scree. Each space the pit scree leaves as it moves becomes Difficult Terrain until the start of its next turn. A creature that enters one of those spaces or starts its turn there takes 7 (2d6) Bludgeoning damage.
Actions
  Multiattack. The pit scree makes two Slam attacks.
  Slam. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition. If the pit scree moved at least 20 feet straight toward the target immediately before the hit and the target is Large or smaller, the target has the Prone condition, and the pit scree can make one Slam attack against it as a Bonus Action.
Bonus Actions
  Entomb. The pit scree entombs one Medium or smaller creature it is grappling. While entombed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the pit scree, and takes 10 (3d6) Bludgeoning damage at the start of each of the pit scree's turns. The pit scree can have only one creature entombed at a time. If the pit scree takes 25 damage or more on a single turn from the entombed creature, the pit scree must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the pit scree. If the pit scree dies, an entombed creature breaks free Prone by using 10 feet of movement.
```

---

## trailing-critic#03 — Melt-Reaver

**Input:** ``

```
Melt-Reaver
Huge Elemental, Neutral
AC 16   HP 262 (25d12 + 100)   Speed 30 ft.
STR 22  DEX 8  CON 19  INT 6  WIS 10  CHA 4
CR 15   [2024 rules]

Traits
  Settling Frost. The space the melt-reaver most recently left is hazardous until the start of its next turn. A creature that enters that space or starts its turn there takes 13 (3d8) Cold damage.
  Cold Absorption. Whenever the melt-reaver is subjected to Cold damage, it takes no damage and instead regains a number of Hit Points equal to the Cold damage dealt.
  Siege Monster. The melt-reaver deals double damage to objects and structures.
Actions
  Multiattack. The melt-reaver makes two Frozen Limbs attacks.
  Frozen Limbs. Melee Attack Roll: +11, reach 10 ft. 42 (8d8 + 6) Cold damage.
  Creeping Field (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 30-foot Cone. Failure: 71 (13d10) Cold damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.
Bonus Actions
  Answering Sting. One creature within 5 feet that hit the melt-reaver with an attack roll since the end of the melt-reaver's last turn takes 17 (5d6) Cold damage.
```

---

## trailing-critic#04 — Rimewake Colossus

**Input:** ``

```
Rimewake Colossus
Huge Elemental, Neutral
AC 16   HP 262 (25d12 + 100)   Speed 30 ft.
STR 22  DEX 8  CON 19  INT 6  WIS 10  CHA 4
CR 15   [2024 rules]

Traits
  Killing Cold Wake. At the end of each of the colossus's turns, each creature in a 5-foot Emanation originating from the colossus takes 13 (3d8) Cold damage.
  Cold Absorption. Whenever the colossus is subjected to Cold damage, it takes no damage and instead regains a number of Hit Points equal to the Cold damage dealt.
  Siege Monster. The colossus deals double damage to objects and structures.
Actions
  Multiattack. The colossus makes two Slam attacks.
  Slam. Melee Attack Roll: +11, reach 10 ft. 27 (6d6 + 6) Bludgeoning damage plus 17 (5d6) Cold damage. If the colossus moved at least 20 feet straight toward the target immediately before the hit and the target is Large or smaller, the target has the Prone condition, and the colossus can make one Slam attack against it as a Bonus Action.
  Cold Wake (Recharge 5-6). Constitution Saving Throw: DC 19, each creature in a 30-foot Cone. Failure: 71 (13d10) Cold damage, and the target has the Prone condition. Success: Half damage only.
```
