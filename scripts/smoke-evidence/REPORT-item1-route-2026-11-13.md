# Item 1 — Route: split role from family. Evidence report, 2026-11-13

For Fable 5.2, against the brief's own done-when. Read the blocks cold first if you want to;
everything below is the instrument.

**Files to read:**

| | |
|---|---|
| blocks (8) | `scripts/smoke-evidence/BLOCKS-v-route-2026-11-13.md` |
| traces | `scripts/smoke-evidence/TRACES-v-route-2026-11-13.md` |
| checker | `scripts/smoke-evidence/CHECK-v-route-2026-11-13T20-23-54.md` |
| probe (raw) | reproduce with `node --import ./scripts/alias-loader.mjs scripts/probe-v-route.mjs 5` |
| the change | `src/tools/statblock-generator/reskin/route.mjs` — `ROLE_ALSO`, `shelfFor`, and four gates |

---

## What shipped

`shelfFor(menuRole)` returns the role's shelf as a set of line ids. Brute, skirmisher, lurker and
defender get exactly their family, unchanged. Artillery adds `skirmisher-hurler` and
`skirmisher-archer`; controller adds `brute-grappler` and `skirmisher-hurler`.

The caster gate the menu used to switch off now applies in all four places it lives — the pick loop,
the rank fallback, the verb override and the family fallback. Each read `!family && …`, which is
why picking a role disabled the one guard that keeps a non-magical creature off a caster line.

A job role's fallback now goes to its own non-magical line rather than back into the caster family
the gate just refused.

**Your diagnosis needed no adjustment.** The only thing I'd add is that the gate was off in four
places, not one, and the family fallback at generate-time was the one that actually caught Big Bob:
his trace shows the call picking the right line and the filter throwing it away.

## Rung 1 — the call alone (8 inputs × 5 rolls, no generation)

Your done-when: five non-casters off the caster family 5 of 5, three controls hold.

```
✓ #1 [artillery ] big bob — giant who throws boulders      skirmisher-hurler ×5
✓ #2 [artillery ] Old Marta — ballista crew sergeant       skirmisher-archer ×5
✓ #3 [artillery ] catapult ogre that lobs burning pitch    skirmisher-hurler ×5
✓ #4 [controller] net-and-trident arena fighter            skirmisher-hurler ×5
✓ #5 [controller] giant spider that webs up the whole room brute-grappler    ×5
✓ #6 [controller] Sister Maudra — cleric of the drowned god caster-warpriest ×5   CONTROL
✓ #7 [artillery ] storm sorcerer who rains lightning       caster           ×5   CONTROL
✓ #8 [lurker    ] Bramblejack                              lurker-trap      ×5   CONTROL

GREEN: five non-casters off the caster family 5/5 · three controls hold 3/3
```

**Zero variance** — five identical rolls on all eight. Your "revisit when: a control changes family"
did not fire.

The picks are right, not merely non-caster: a boulder giant and a pitch-lobbing ogre reach the
hurler (whose printed exemplar is the Hill Giant with rocks), a ballista sergeant reaches the
archer, a web-spinner reaches the grappler. The call could always do this. The shelf was hiding the
answers from it.

## Rung 2 — the deterministic step (Jest)

5114 tests pass, 205 suites. One existing test asserted the behaviour your audit reversed
(*"artillery and controller are the caster family"*) and was rewritten against the new contract,
with the known-bad sheet as the assertion and both controls kept.

Sensitivity: with `ROLE_ALSO` emptied the spec fails; with the caster gate restored to `!family &&`
it fails. Both arms are load-bearing.

## Rung 3 — whole blocks (v-route, 8 blocks)

**0 blocks with a FAIL of 8.** Clause lists: 404 concepts frozen, no drift.

| sheet | picked | routed | spells on the card |
|---|---|---|---|
| Big Bob | artillery | skirmisher-hurler | none — Stone Club, Stone Discus |
| Old Marta | artillery | skirmisher-archer | none — Siege Crossbow, Ranging Bolt |
| Cinderpot Marauder | artillery | skirmisher-hurler | none — Greatclub, Javelin, Tar Snatch |
| Salthusk Champion | controller | skirmisher-hurler | none — Trident, Weighted Cast |
| Loom Hall Orb-Weaver | controller | brute-grappler | none — Bite, Venom Burst, Web Walker |
| **Sister Maudra** | controller | caster-warpriest | **Spellcasting, Divine Aid** (control) |
| **Skyfeud** | artillery | caster | **Spellcasting, Protective Magic (3/Day)** (control) |
| **Bramblejack** | lurker | lurker-trap | none (control) |

### The known-bad case, before and after

Same input, `big bob — giant who throws boulders`, role artillery.

**Before** (typed40 #12, `donor: caster-6`):

```
Boulder Toss: Melee or Ranged SPELL Attack: +7 to hit … 16 (3d8 + 3) thunder damage.
Spellcasting: … using Intelligence as the spellcasting ability (DC 15):
             1/day each: Thunderwave, Shatter, Ice Storm, Lightning Bolt
Protective Magic (3/Day) (Reaction): … Bob casts Shield …
```

**After** (`donor: skirmisher-8-hurler`):

```
Multiattack | Stone Club | Stone Discus | Blood Frenzy | Deflect Missile (Recharge 5-6) (Reaction)
```

Deflect Missile is print's own Stone Giant reaction, pasted — a rock-deflecting reaction on a
rock-throwing giant.

## What this did NOT fix — and one of them is yours

**1. Your finding 3, intact and visible on the same sheet.** Bob's trait seat was handed
*"Bob's quarrier's eye never loses a stone in flight — he ignores Half Cover when hurling a
boulder."* No effect in the vocabulary says *ignores cover*, so the fit call landed `blood-frenzy`
(advantage against wounded creatures) on a `[shape fit, no verb match]`, and one-mechanic-one-name
then renamed "Quarrier's Eye" to "Blood Frenzy". The idea was cover; the row is bloodlust; the name
is the catalog's. Exactly the mechanism in your finding 3, surviving a correct donor — which is the
useful part: **fixing the body does not fix the vocabulary.** Item 5 stands on its own.

**2. A label defect this change exposed, and partly caused.** Six of the eight sheets record an
archetype the user did not pick, every one stamped `archetype_source: "user"`:

```
Big Bob              picked artillery   recorded skirmisher
Old Marta            picked artillery   recorded skirmisher
Cinderpot Marauder   picked artillery   recorded skirmisher
Salthusk Champion    picked controller  recorded skirmisher
Loom Hall Orb-Weaver picked controller  recorded brute
Sister Maudra        picked controller  recorded artillery      <- PRE-EXISTING
```

Maudra is the proof it predates the change: `caster-warpriest` carries `role: 'artillery'` in the
shelf table, so a controller pick has always recorded artillery. But five of the six are mine — the
routed line's family is now genuinely different from the picked role, where before everything went
to `caster` and the menu label survived.

The user picks **Artillery**, saves, reopens, and the role reads **Skirmisher**. One field is doing
two jobs: the family the engine routed on, and the label the user chose. They are different facts
and the sheet should carry the one the user set. Fixing it next; it needs no ruling.

The owner's framing of the question was the sharp one: *what happens when someone creates Big Bob
and selects artillery because as a user they think that's what it is?* They now get the right
monster and the wrong label.

## Method notes, since you flagged the trace-reading risk

Three numbers I reported today were read off trace lines or a wrong parser and were wrong — the
31-of-40 you caught, "the mage leaking on three sheets" (it is on **one** card; the other two were
my own engine's narration), and a first pass at this report that showed four blocks with no rows
(my reader only knew the 2014 sheet shape; 2024 sheets keep rows under `sections`). All three are
corrected in place. The rule I have added: read the card, not the log, and print one real input
before trusting any probe.

## Next

Item 2's small items, each with a known-bad sheet to replay: the archetype label · rider on the
attack always (the owner ruled it general, not holds-only) · the monk's kit rider surviving the
print rename (3 of 3 monks ship a save with no outcome) · they/them for a named Humanoid · the
template-name leaks (#05 `The mage`, #33 `the ankheg`, #31 `toward Troll`).

On the monk fix, one design change from your brief: matching the kit rider's **text** is fragile —
the template frame says *"the creature's turns"* and the sheet ships *"Sarn's turns"*, so something
rewrites inside the welded text. The weld will stamp the conditions the kit's rider imposes
(`imposedConditions`, which already exists and reads declared data first), and the strip will keep a
sentence whose conditions the kit owns. Declared data rather than a text match.
