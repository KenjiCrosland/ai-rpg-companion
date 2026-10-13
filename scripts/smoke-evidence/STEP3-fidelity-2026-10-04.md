# Fidelity pipeline — step 3: the four forms as fields, one renderer per edition, and the adjudicability gate

## The forms (`reskin/forms.mjs`)

Four closed shapes held as fields, rendered by one function per edition. Step 5 authors into these; the model never writes rules prose.

| Form | Fields | 2024 render | 2014 render |
|---|---|---|---|
| attack | bonus, reach / range, avg, dice, type, rider | `*Melee Attack Roll:* +7, reach 5 ft. 26 (5d8 + 4) Slashing damage.` | `Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) slashing damage.` |
| save | stat, dc, target, failure, success | `*Dexterity Saving Throw*: DC 15, each creature in a 60-foot Cone. *Failure:* 28 (8d6) Fire damage. *Success:* Half damage only.` | `Each creature in a 60-foot cone must make a DC 15 Dexterity saving throw, taking 28 (8d6) fire damage on a failed save, or half as much damage on a successful one.` |
| trait | trigger (optional), effect | `While the creature is in sunlight, it has Disadvantage on attack rolls.` | same |
| reaction | trigger, response | `*Trigger:* … *Response:* …` | `<trigger>, <response>` |

The save's 2014 render is, by pin, the same sentence `to2014Grammar` makes from the 2024 render: `canonSave2014` is the model. Every form may carry `flavor`, which no renderer prints inside the row (the step-2 italic aside is reverted; the field stays as the pipeline's holding slot and routes to the Languages line or the description in step 5).

## The gate (`adjudicability`, eighth in the table)

- `adjudicable-resolution`: a trait or reaction that deals damage or imposes a condition must state a trigger, an attack roll, or a save. An action resolves by being taken. A passive rule statement resolves by itself.
- `adjudicable-target`: a save's targets are a count or an area (aura, enter-the-space and can-see shapes accepted as print writes them).
- `adjudicable-outcome`: a save has an outcome (`*Failure:*`, "on a failed save", "or be …").
- Damage is always dice: the structure gate's existing `diceless-damage`.
- The `flavor` field is exempt from every predicate; print rows are exempt.

## Calibration — the gate passes everything shipping

Run over every saved run without regenerating: the last two forties, the twelve, the ten, and the eighteen-block baseline. Three false-positive families were found and removed before the count reached zero: a trait that *mentions* saving throws is not a save row (Magic Resistance, Legendary Resistance); the engine writes `*Stat Saving Throw*: DC` and the model's own rows write `*Stat Saving Throw:* DC`, so every save-head regex accepts both; print's relative-clause triggers ("a creature that touches the mimic", "adhered to") are triggers. **Adjudicability fails across 120 saved blocks: 0.** The gate would have failed each bad old-engine row named in the brief (a save whose only effect is losing socks has no outcome; "a new attack while barreling" has no resolution; "DON'T DEAL DAMAGE WITH THIS ACTION" has no dice).

## The regression forty after step 3

sweep-2026-10-04T13-10-40: **0 fails of 40, 20 softs** (the step-2 forties sat at 19, 21 and 18). The adjudicability column is clean on all forty. Gate: 179 suites / 5,156 tests, build clean.

## Meshrin after step 3

Meshrin | Large humanoid, neutral | 30 ft. | AC 14 (half plate) | HP 136 (16d10 + 48) | Common

- Multiattack. Meshrin makes two attacks: one with its Greatsword and one with its Hurled Debris. It can replace one attack with a use of Reaping Lunge.
- Greatsword. Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 26 (5d8 + 4) slashing damage.
- Hurled Debris. Ranged Weapon Attack: +7 to hit, range 60/240 ft., one target. Hit: 22 (4d8 + 4) bludgeoning damage.
- Reaping Lunge. One creature within 30 feet of Meshrin must succeed on a DC 15 Strength saving throw or be pulled up to 25 feet …

3/8: Large ✓, Speed 30 ✓, Greatsword ✓; no tail, claws, bite, or fighting styles; a chassis "Hurled Debris" row he was never given. One thing moved on its own: the rows read "Meshrin", not "the meshrin", this run. All four gates clean. The missing rows are step 5's, as before.
