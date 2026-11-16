# Blocks — the paladin with nothing to roll

Round of 2026-11-16, on top of `e6fffc7`. **All 54 sheets this round generated are here, marked as
they are: 20 measured before the fix, 34 after. None threw and none timed out.** Each carries its
`[concept] identity:` and `[concept] lore:` lines uncut, as last round.

`BLOCKS-ship-2026-11-16.md` and `BLOCKS-fix-ef-2026-11-16.md` are milestones and stay; the three
files together are the record of what shipped.

```
npx jest src/tools/statblock-generator src/util --maxWorkers=2 --silent  # 229 suites, 5372 passed, 26 skipped
npx jest --maxWorkers=2 --silent                                        # whole repo: 312 suites, 7438 passed
npm run build                                                           # succeeds
reference-lend-checks / class-on-people / mind-dc-sweep / one-name-one-row   all exit 0
```

## The measurement, before and after

Five rolls each of four prompts at CR 4, the same twenty both times.

| prompt | before `e6fffc7` | rolls with none | after | rolls with none |
|---|---|---|---|---|
| `a paladin` | 2, 0, 1, 0, 1 | **2 of 5** | 1, 1, 1, 1, 1 | **0** |
| `Sir Aldric, a paladin of the dawn` | 1, 0, 1, 0, 0 | **3 of 5** | 1, 2, 1, 1, 2 | **0** |
| `a fighter` | 1, 2, 0, 1, 2 | **1 of 5** | 2, 1, 1, 2, 2 | **0** |
| `a guard captain turned paladin` | 2, 0, 1, 0, 1 | **2 of 5** | 1, 1, 2, 1, 1 | **0** |
| | | **8 of 20** | | **0 of 20** |

Either side of the failing body, three rolls each: **`a paladin` at CR 3 — 2, 2, 2 attack rows; at
CR 5 — 1, 1, 1.** None empty.

**What the before-measurement settles: it was never the words, and never the Guard Captain.** Plain
"a paladin" did it twice in five and plain "a fighter" once in five. The rate is 40% of CR 4 class
NPCs on these four prompts, not the three-in-nine we had from one prompt.

The checker says the same thing in one line: **the before run's 8 failures are all
`multiattack-integrity` — "makes two attacks" on a sheet with no attack row at all — and the after
run has none.**

| run | FAIL | what |
|---|---|---|
| before, 20 | **8 of 20** | every one `multiattack-integrity` |
| after, 20 | 1 of 20 | `engine-needs-key` — a grapple engine with no key in the words; a known class, not this |
| CR 3 and CR 5, 6 | **0 of 6** | |
| ship-eight, 8 | 1 of 8 | the Headless Horseman's `attack-stat`, +9 from DEX on a STR row — the frozen gate's own, pre-existing |

## The cause, and a correction to my last report

The full trace of the collapsed roll, every line from the first rename to the last sweep:

```
[reskin] print canon: "a guard captain turned paladin" heads on the Guard Captain — print's rows ride along; the seat stays
[reskin] weapons answered: Longsword = longsword; Javelin = javelin
[reskin] weapon dice follow the weapon: "Javelin" is a javelin (d6) — "13 (2d8 + 4)" becomes "14 (3d6 + 4)"
[reskin] print canon: chassis row leaves — Actions/"Longsword" — the Guard Captain prints no row for it (2 melee, 0 ranged)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "The warden makes two Javelin attacks."
[reskin] print canon multiattack: "the warden makes two attacks, using Javelin or Longsword in any combination." — the Guard Captain's own
[reskin] ranged row narrowed, not removed: "Javelin" is the only attack on the sheet — the Guard Captain carries no
         ranged row, so the row becomes melee at reach 5 rather than leaving a sheet with nothing to attack with
[reskin] attack name by anatomy: "Javelin" -> "Slam" — javelin is a ranged noun on a melee row
[reskin] rename propagated: "Javelin" -> "Slam" in "Multiattack"
[reskin] attack name by anatomy: "Slam" -> "Slam" — a slam deals Bludgeoning, not Piercing
[reskin] print canon: chassis row leaves — Actions/"Slam" — the Guard Captain prints no row for it and no path stage claimed it
[reskin] multiattack re-read — "Slam" left; "Multiattack" now reads "the warden makes two Longsword attacks."
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "the warden makes two attacks."
[reskin] sheet lint: multiattack-cites-nothing: Actions/Multiattack: names no attack to roll — "the warden makes two attacks."
```

**Why does a Multiattack re-read remove an attack row? It does not — and my last report said it did.
That was wrong.** The three re-reads only rewrite the sentence after a row has already gone. Both
removals are **print canon's closed-path filler sweep**: on a closed path the Actions are closed
too, so a row carrying an attack that no stage claimed — not print's, not a part, feature, kit,
library, template, authored row, the GM's weapon or a rules row — is chassis filler and leaves.

**The narrowest wrong step is that sweep taking the LAST attack row**, and the engine already says
so one pass earlier: the line immediately above narrows the Javelin to melee *expressly* to avoid
"leaving a sheet with nothing to attack with", and then the sweep removes that very row for having
no provenance. Two passes disagreed and the sweep went last.

The fix makes the sweep honour the rule its neighbour states. It is inside `if (closedPath)` and
**touches neither the Multiattack re-read nor the dead-name sweep**, which is why it needed no
regression forty.

**Why is a person's Javelin renamed "Slam" by anatomy?** `header.mjs:184` reads
`const to = kind === 'ranged' ? proj : 'Slam'` — a hardcoded fallback noun for a ranged noun sitting
on a melee row, and its own comment names the creature it was written for: *"print's Javelin became
a Piercing Slam on the Ogre"*. Nothing makes it depend on the creature being a monster rather than a
person, so a paladin with hands gets a Slam. **It is not part of the collapse** — the sweep keys on
provenance, not on the name, so the row would have been removed as "Javelin" too. Reported, not
fixed, rather than widen this change.

## The guard, and where it did not fire

`assertSomethingToRoll` runs on the finished sheet, just before it is returned: a sheet that carries
a Multiattack and no row with an Attack Roll throws the way an unrenamed entry does, and the user is
shown "Failed to generate statblock. Please try again."

It is a net, not the fix. Where it fired:

| | |
|---|---|
| the 576-sheet stubbed class grid | **0** |
| the three other reference grids | **0** |
| the regression fixtures (229 suites, 5,372 tests) | **0** |
| the 34 live sheets after the fix | **0 — nothing threw** |

So the net has not had to catch anything yet, which is the point: the cause above is fixed, and the
guard is there for a cause nobody has found.

A sheet with one attack row and a Multiattack naming it is correct and untouched — that is most of
the after-run, and it is a test case.

## What the fix did on the sheets

The new trace line `print canon: chassis row STAYS` fired on **4 of the 20** after-fix rolls (Sir
Aldric 06 and 08, the guard captain 16 and 19) — exactly the rolls where the sweep would otherwise
have taken the last attack row. On the other sixteen the sweep had nothing to hold back and the
sheets are unchanged.

## Blockers

**None by my own read.** The two failures left in this round's 34 sheets are both known classes with
no bearing on it: a grapple engine with no key in the GM's words, and the Headless Horseman's saber
deriving +9 from DEX on a row that rolls STR, which the frozen ship gate already carried.

Still on the list after the ship, unchanged: the throw on an unrenamed "Signature Slot" (about 1 in
6 on one prompt, and `main` throws the same way), the free-row repair eating a word, and the
hardcoded "Slam" above.


# Pass 1 — the twenty, measured BEFORE the fix (on `e6fffc7`)

Five rolls each of four prompts at CR 4. **8 of 20 ship a Multiattack with nothing to roll**, and
every one of the run's 8 checker failures is that. These are the sheets the fix had to answer.

This run was taken on a clean `e6fffc7` tree. An earlier attempt was discarded: I edited
`generate.mjs` while it was in flight, which voids a smoke, so its first four sheets were
pre-fix and the rest post-fix.

`smoke-out/paladin20-2026-11-16T04-23-07`

---

## 01. Oathkeeper of the Gate — CR 4

**Input:** `a paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 27s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "a paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a paladin") | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "a paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Javelin" keeps its own name — "longsword" is already a row on this sheet (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> A veteran paladin of the city watch, sworn to a losing cause, holds the narrow ways and grand processions of his city with an iron shield and a leveled mace. He steps into the first swing each round, warding the right flank with a lifted shield-cantrip, and strikes only when a foe overreaches — any enemy who moves through his reach and past him eats a punishing counter on the instant. He never abandons ground and never flees; he sells the line at blood price, to the last breath of his oath, fighting to the death with the calm of a man who has already chosen it.

**`[concept] lore:`**, uncut

> The last sworn shield of a failed order, he took an oath to hold a single city gate and the plague-scarred road behind it, and he will not break faith even if the gate has fallen and the city behind him is ash.

**Every attack row**
```
Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Oathkeeper of the Gate

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the oathkeeper, the oathkeeper and its allies have Advantage on attack rolls and saving throws, provided the oathkeeper doesn't have the Incapacitated condition.

Actions

Multiattack. The oathkeeper makes two attacks, using Javelin or Longsword in any combination.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

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

---

## 02. Threshold Penitent — CR 4

**Input:** `a paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 32s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "a paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/grave mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "a paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "The penitent makes two Javelin attacks."
[reskin] multiattack re-read — "Slam" left; "Multiattack" now reads "the penitent makes two Longsword attacks."
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "the penitent makes two attacks."
[reskin] multiattack re-read — "Threshold Advance" left; "Multiattack" now reads "the penitent makes two attacks."
[reskin] free row repaired: "Planted Plate": "When an effect would push, pull, or knock the penitent Prone, the peni" -> "While the penitent isn't Incapacitated, the penitent can't be moved against its will, can'"
```

**`[concept] identity:`**, uncut

> A sworn champion in battered plate, it plants itself at the narrowest point and makes its body the wall — shield high, blade low, inviting the charge. Every round it punishes the reckless: a step past its guard earns a shove of iron and a strike of holy fire, and it steps to shadow the weakest ally with its bulk. Facing death it does not flee; it digs in, calls its oath aloud, and dares the line to break on it.

**`[concept] lore:`**, uncut

> Once a sworn guardian of a forgotten chapel, it took an oath to hold one threshold until relieved, and death has not released it from that post.

**Every attack row**
```
(no attack row)
```

```
Threshold Penitent

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Planted Plate. While the penitent isn't Incapacitated, the penitent can't be moved against its will, can't be knocked Prone, and can't be Grappled or Restrained; while the penitent's Aura of Authority is active, each ally within it is likewise protected from being moved against its will, knocked Prone, or Grappled.

Aura of Authority. While in a 10-foot Emanation originating from the penitent, the penitent and its allies have Advantage on attack rolls and saving throws, provided the penitent doesn't have the Incapacitated condition.

Actions

Multiattack. The penitent makes two attacks.

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

---

## 03. Covenant Shield — CR 4

**Input:** `a paladin`
**Donor:** defender-3 -> CR 4
**Signature:** dropped · **elapsed** 30s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "a paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a paladin") | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "a paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Shield-Wall Strike" left; "Multiattack" now reads "The covenant shield makes two attacks, using, Javelin, or Longsword in any combination."
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "the covenant shield makes two Longsword attacks."
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> A sworn shield of a holy order, the paladin plants itself in the gap and makes that ground sacred — it opens by stepping between the party and what it guards, laying a consecrated mark on the most dangerous foe. Every round after it stands fast in plate, offering a shield-wall strike that punishes anyone who tries to slip past, and calls down radiant smite on the wicked it has judged. Under pressure it never breaks ranks and never flees — wounded, it only sets its shield harder, spending its last strength to hold the line to the death.

**`[concept] lore:`**, uncut

> Sworn to a martial holy order whose oaths outlast the men who take them, a paladin holds its appointed ground as a living covenant — it guards a gate, a relic, or a fallen captain, and will not yield it while breath remains.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Covenant Shield

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the covenant shield, the covenant shield and its allies have Advantage on attack rolls and saving throws, provided the covenant shield doesn't have the Incapacitated condition.

Actions

Multiattack. The covenant shield makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

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

---

## 04. Vigil Iron-Knight — CR 4

**Input:** `a paladin`
**Donor:** defender-3 -> CR 4
**Signature:** dropped · **elapsed** 27s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "The iron-knight makes two Javelin attacks."
[reskin] multiattack re-read — "Slam" left; "Multiattack" now reads "the iron-knight makes two Longsword attacks."
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "the iron-knight makes two attacks."
```

**`[concept] identity:`**, uncut

> A sworn blade in consecrated iron, it opens by planting itself between the party and whatever it has vowed to hold, shield high and oath burning in its voice. Every round after that it holds that ground — stepping into the first swing meant for an ally and answering any foe who tries to slip past with a radiant, bone-rattling rebuke. It does not flee when bloodied; a broken oath is worse than a broken body, so it fights to the death and drags as many of the faithless down with it as it can.

**`[concept] lore:`**, uncut

> Sworn into an order of consecrated iron-knights, this paladin still keeps a vigil over a charge long dead, and it will not lay down its shield until its oath is released or its body fails.

**Every attack row**
```
(no attack row)
```

```
Vigil Iron-Knight

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Unmoving Oath. While the iron-knight is within its Aura of Authority and doesn't have the Incapacitated condition, the iron-knight can't be moved against its will, and any effect that would teleport it or force it to move is suppressed.

Aura of Authority. While in a 10-foot Emanation originating from the iron-knight, the iron-knight and its allies have Advantage on attack rolls and saving throws, provided the iron-knight doesn't have the Incapacitated condition.

Actions

Multiattack. The iron-knight makes two attacks.

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

---

## 05. Vigil — CR 4

**Input:** `a paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 24s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a paladin") | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Javelin" -> "Longsword" — a paladin fights with a longsword, not the Guard Captain's
```

**`[concept] identity:`**, uncut

> A sworn knight in consecrated plate, it plants its shield and holds the line, opening by taunting the strongest foe into single combat while its Radiance-washed blade keeps lesser attackers at bay. Each round it stays shoulder-to-shoulder with its allies, punishing anyone who tries to slip past with a smite that flares on the weapon's edge, and it will not abandon the ground it has chosen. Under pressure it does not flee — it digs in harder, spending its own blood to keep the oath-bond burning, and fights to the death because a broken oath is worse than a grave.

**`[concept] lore:`**, uncut

> A paladin who swore its final vigil over a doomed gate, still holding a line that fell centuries ago, bound to rise and defend that ground until the oath itself is released.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Vigil

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the vigil, the vigil and its allies have Advantage on attack rolls and saving throws, provided the vigil doesn't have the Incapacitated condition.

Actions

Multiattack. The vigil makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.

Bonus Actions

Shield Challenge. Wisdom Saving Throw: DC 14, one creature within 30 feet. Failure: Until the start of the vigil's next turn, the target has Disadvantage on attack rolls against creatures other than the vigil.

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

---

## 06. Sir Aldric — CR 4

**Input:** `name: Sir Aldric | a paladin of the dawn`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 26s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "Sir" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "paladin of the dawn" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin of the dawn") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "Sir": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Greatsword" left; "Multiattack" now reads "Sir Aldric makes two attacks, using, Javelin, or Longsword in any combination."
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "Sir Aldric makes two Longsword attacks."
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> Sir Aldric plants himself at the front line and opens by announcing the dawn — a radiant flare off his blade and shield that marks the first foe to step within his reach. Every round after, he holds ground and punishes those who try to slip past him, shearing through the line with measured, armored swordwork rather than chasing. He is patient and unbroken under pressure, giving ground only to buy a better stance, never breaking and never fleeing.

**`[concept] lore:`**, uncut

> Once the last knight of a broken dawn-order, Sir Aldric kept his oath past the death of his chapel and now walks the roads at first light, testing whether anyone still holds a line worth the holding.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Sir Aldric

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Dawn Mark. A creature Sir Aldric damages sheds Dim Light in a 5-foot radius until the end of its next turn and can't benefit from the Invisible condition while it does.

Aura of Authority. While in a 10-foot Emanation originating from Sir Aldric, Sir Aldric and its allies have Advantage on attack rolls and saving throws, provided Sir Aldric doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Aldric makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

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

---

## 07. Sir Aldric — CR 4

**Input:** `name: Sir Aldric | a paladin of the dawn`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 20s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin of the dawn" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin of the dawn") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=celestial/armed mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Sir Aldric makes two Javelin attacks."
[reskin] multiattack re-read — "Slam" left; "Multiattack" now reads "Sir Aldric makes two Longsword attacks."
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Sir Aldric makes two attacks."
```

**`[concept] identity:`**, uncut

> Sir Aldric opens every fight by planting his shield and calling down a dawn-charged smite on the nearest foe, then holds a 10-foot line that punishes any enemy who tries to slip past him with a reactive strike. Every round after that he advances one step at a time, trading blows behind his armor and pressing foes toward his allies, and he fights to the death rather than flee—though he will disengage only long enough to drag a downed comrade behind his shield.

**`[concept] lore:`**, uncut

> A sworn knight of the Dawn Order, Sir Aldric left his chapterhouse to redeem a broken vow by standing as the unyielding shield between the innocent and the dark.

**Every attack row**
```
(no attack row)
```

```
Sir Aldric

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Fear Aura. Sir Aldric emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 14, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's aura for 24 hours.

Aura of Authority. While in a 10-foot Emanation originating from Sir Aldric, Sir Aldric and its allies have Advantage on attack rolls and saving throws, provided Sir Aldric doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Aldric makes two attacks.

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

---

## 08. Sir Aldric — CR 4

**Input:** `name: Sir Aldric | a paladin of the dawn`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 27s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "Sir" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin of the dawn" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin of the dawn") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=celestial/armed mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "Sir": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Javelin" -> "Longsword" — a paladin fights with a longsword, not the Guard Captain's
[reskin] free row repaired: "Dawnlight Mark": "While a creature Sir Aldric hit since the start of his last turn remai" -> "When Sir Aldric hits a creature with a Longsword attack, the hit creature is marked for 1 "
```

**`[concept] identity:`**, uncut

> Sir Aldric advances behind his shield to plant himself between the party and whatever they are sworn to protect, opening with a leveled blade that flares dawn-bright to mark the first enemy to close. Each round he holds the line, punishing anyone who tries to slip past with a searing riposte while steadying an ally beside him. He is unshakable rather than berserk — he does not flee when bloodied, but plants his feet harder and calls down the light until the field is clear.

**`[concept] lore:`**, uncut

> Sir Aldric is the last sworn blade of a dissolved dawn-order, bound by an oath that outlived his chapter-house to stand watch wherever the helpless gather.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Sir Aldric

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Dawnlight Mark. When Sir Aldric hits a creature with a Longsword attack, the hit creature is marked for 1 minute; a creature marked this way has Disadvantage on attack rolls against creatures other than Sir Aldric while within 60 feet of him.

Aura of Authority. While in a 10-foot Emanation originating from Sir Aldric, Sir Aldric and its allies have Advantage on attack rolls and saving throws, provided Sir Aldric doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Aldric makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.

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

---

## 09. Sir Aldric — CR 4

**Input:** `name: Sir Aldric | a paladin of the dawn`
**Donor:** defender-3 -> CR 4
**Signature:** dropped · **elapsed** 24s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin of the dawn" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin of the dawn") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Sir Aldric makes two Javelin attacks."
[reskin] multiattack re-read — "Slam" left; "Multiattack" now reads "Sir Aldric makes two Longsword attacks."
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Sir Aldric makes two attacks."
[reskin] free row repaired: "Dawn-Oath Unyielding": "While Sir Aldric has the Blinded, Frightened, or Prone condition, or i" -> "While Sir Aldric has the Blinded, Frightened, or Prone condition, or is Bloodied, the radi"
```

**`[concept] identity:`**, uncut

> Sir Aldric opens by planting his shield and calling the dawn-light down his blade, then advances slowly, forcing foes to come to him or be cut down crossing his reach; his oath-bound aura steadies allies and sears the unholy. Every round he holds the line — shield-high, punishing any who try to slip past him with a radiant riposte — and he never flees while the light still burns. Under pressure he grows more deliberate, not more desperate, giving ground only to re-anchor beside the wounded and spend his last strength to drag them from death.

**`[concept] lore:`**, uncut

> Once a knight of a broken dawn-order, Sir Aldric was left sole survivor of a massacre at first light; he swore an oath to the rising sun to stand between the dark and the living, and now he walks the roads at daybreak, seeking the ones who broke his brothers.

**Every attack row**
```
(no attack row)
```

```
Sir Aldric

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Dawn-Oath Unyielding. While Sir Aldric has the Blinded, Frightened, or Prone condition, or is Bloodied, the radius of Sir Aldric's Aura of Authority increases to 20 feet, and any Fiend or Undead that starts its turn within that Emanation takes 7 (2d6) Radiant damage.

Aura of Authority. While in a 10-foot Emanation originating from Sir Aldric, Sir Aldric and its allies have Advantage on attack rolls and saving throws, provided Sir Aldric doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Aldric makes two attacks.

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

---

## 10. Sir Aldric — CR 4

**Input:** `name: Sir Aldric | a paladin of the dawn`
**Donor:** defender-3 -> CR 4
**Signature:** dropped · **elapsed** 31s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "a paladin of the dawn" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin of the dawn") | defender: the call read "paladin" as not meaning that mechanic here — no override | caster-warpriest stands: every key that would override it was read as a figure of speech | caster-warpriest: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Sir Aldric makes two Javelin attacks."
[reskin] multiattack re-read — "Slam" left; "Multiattack" now reads "Sir Aldric makes two Longsword attacks."
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Sir Aldric makes two attacks."
[reskin] free row repaired: "Dawn-Lit Blade": "A creature Sir Aldric damages sheds Dim Light in a 5-foot radius until" -> "When one of Sir Aldric's attacks hits a creature, the hit creature sheds Dim Light in a 5-"
```

**`[concept] identity:`**, uncut

> Sir Aldric strides into battle in his heavy plate, opening with a two-handed overhead strike of a blade crackling with dawn-light — a smite meant to drop the strongest foe in the first rush. Every round after, he holds the center with weapon-and-shield discipline, marking the deadliest threat and answering it with holy steel while he wards nearby foes with his faith. Under pressure he does not flinch or flee — he anchors himself between his allies and the enemy and grinds the fight down to his pacing, saving his last smites for the moment the line threatens to break.

**`[concept] lore:`**, uncut

> Once a sworn knight of the Dawn Order, Sir Aldric now walks the roads as his order's last vigil, and he wants nothing from the world but to see the light sever darkness wherever he finds it.

**Every attack row**
```
(no attack row)
```

```
Sir Aldric

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Dawn-Lit Blade. When one of Sir Aldric's attacks hits a creature, the hit creature sheds Dim Light in a 5-foot radius until the start of its next turn and can't benefit from the Invisible condition while it does.

Aura of Authority. While in a 10-foot Emanation originating from Sir Aldric, Sir Aldric and its allies have Advantage on attack rolls and saving throws, provided Sir Aldric doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Aldric makes two attacks.

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

---

## 11. Oathsworn Duelist — CR 4

**Input:** `a fighter`
**Donor:** defender-3 -> CR 4
**Signature:** dropped · **elapsed** 28s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a fighter — A duelist who opens with a measured advance and a probing cut, testing reach and rhythm before committing; once it has read an opponent it presses with precise, economical strikes, deflecting rather than dodging. It fights to win, not to slaughter—breaking off bloodied to honor a withdra
[concept] expansion answered: type=Humanoid (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: summon
[path] class_npc — class fighter — "a fighter" (call)
[route] defender type=Construct mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("deflecting rather than dodging") | defender: key "duelist" (class verb)
[concept] type settled: Construct -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Construct
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: fighter — "a fighter": Riposte (riposte)
[reskin] class weapon: Actions/"Javelin" -> "Longsword" — a fighter fights with a longsword, not the Guard Captain's
```

**`[concept] identity:`**, uncut

> A duelist who opens with a measured advance and a probing cut, testing reach and rhythm before committing; once it has read an opponent it presses with precise, economical strikes, deflecting rather than dodging. It fights to win, not to slaughter—breaking off bloodied to honor a withdrawal, but returning with a counter to the same opponent's tricks.

**`[concept] lore:`**, uncut

> A veteran duelist bound to an old arena's oath, it walks the roads of the living to find worthy opponents and settle debts of honor left unpaid.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Oathsworn Duelist

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
13
+1
+1

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Binding Parry. If the target is a Large or smaller creature, it has the Restrained condition until the end of the duelist's next turn.

Actions

Multiattack. The duelist makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.

Reactions

Riposte. Trigger: A creature within 5 feet of the duelist misses it with a melee attack roll. Response: The duelist makes one Longsword attack against that creature.

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

---

## 12. Unfinished Oath — CR 4

**Input:** `a fighter`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 29s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a fighter — A blunt instrument of a soldier that wades in shield-first, absorbing the first blows and answering with grinding, methodical strikes. Every round it presses its advantage, herding foes toward the terrain it has chosen and punishing any who try to circle it. It is stubborn rather than re
[concept] expansion answered: type=Construct (type_source=inferred) material=bone size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: —
[path] class_npc — class fighter — "fighter" (call)
[route] defender type=Undead mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("wades in shield-first, absorbing the fir") | defender: no line key in the words — the model's read of its quote
[concept] type settled: Undead -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Undead
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=forged/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: fighter — "fighter": Riposte (riposte)
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Javelin" keeps its own name — "longsword" is already a row on this sheet (fix F: one name, one row)
[reskin] free row repaired: "Relentless Press": "*Strength Saving Throw*: DC 14, one creature within 5 feet. *Failure:*" -> "*Strength Saving Throw*: DC 14, one creature within 5 feet. *Failure:* 14 (4d6) Bludgeonin"
```

**`[concept] identity:`**, uncut

> A blunt instrument of a soldier that wades in shield-first, absorbing the first blows and answering with grinding, methodical strikes. Every round it presses its advantage, herding foes toward the terrain it has chosen and punishing any who try to circle it. It is stubborn rather than reckless — it beats a foe down steadily and only disengages when the fight is clearly lost.

**`[concept] lore:`**, uncut

> Forged from the bones of a fallen champion and bound by an oath that outlived him, this warrior walks the old battlefield looking for one worthy enough to end its watch.

**Every attack row**
```
Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Unfinished Oath

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
13
+1
+1

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The unfinished oath makes two attacks, using Javelin or Longsword in any combination. It can replace one attack with a use of Shield Bash.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the unfinished oath can see. Failure: 7 (2d6) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition.

Relentless Press. Strength Saving Throw: DC 14, one creature within 5 feet. Failure: 14 (4d6) Bludgeoning damage, and the target has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of the unfinished oath misses it with a melee attack roll. Response: The unfinished oath makes one Javelin attack against that creature.

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

---

## 13. Ledgerblade — CR 4

**Input:** `a fighter`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 25s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a fighter — A duelist-for-hire who opens every fight by declaring a challenge and marking one foe, then spends each round circling to keep that mark between itself and the rest of the field, punishing any who break formation to flank it. It fights with patient, drilled economy — feints, measured adv
[concept] expansion answered: type=Humanoid (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: thrown-weapon
[path] class_npc — class fighter — "a fighter" (call)
[route] defender type=Construct mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("declaring a challenge and marking one fo") | defender: key "duelist" (class verb)
[concept] type settled: Construct -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Construct
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=armed/uncanny mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: fighter — "a fighter": Riposte (riposte)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "The ledgerblade makes two Javelin attacks."
[reskin] multiattack re-read — "Slam" left; "Multiattack" now reads "the ledgerblade makes two Longsword attacks."
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "the ledgerblade makes two attacks."
[reskin] free row repaired: "Marked Challenge": "*Wisdom Saving Throw:* DC 14, one creature within 30 feet. *Failure:* " -> "*Wisdom Saving Throw*: DC 14, one creature within 30 feet. *Failure:* 14 (4d6) Bludgeoning"
```

**`[concept] identity:`**, uncut

> A duelist-for-hire who opens every fight by declaring a challenge and marking one foe, then spends each round circling to keep that mark between itself and the rest of the field, punishing any who break formation to flank it. It fights with patient, drilled economy — feints, measured advances, a blade turned aside — and only commits once its marked opponent is off balance. When bloodied it does not flee; it fights colder and more precisely, taking down its mark before considering withdrawal.

**`[concept] lore:`**, uncut

> The fighter is a sword-for-hire who sold the last of its own name to a dueling school, and now honors every contract to the letter because the letter is all it has left.

**Every attack row**
```
(no attack row)
```

```
Ledgerblade

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
13
+1
+1

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The ledgerblade makes two attacks.

Bonus Actions

Marked Challenge. Wisdom Saving Throw: DC 14, one creature within 30 feet. Failure: 14 (4d6) Bludgeoning damage.

Reactions

Riposte. Trigger: A creature within 5 feet of the ledgerblade misses it with a melee attack roll.

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

---

## 14. Duelbroker — CR 4

**Input:** `a fighter`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 29s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a fighter — A duelist-for-hire who opens every fight by demanding a formal challenge and naming the price of surrender, closing distance behind a shield of shouting bravado and a blade held in textbook guard. Each round it fights like a student of the forms — parrying, feinting, testing — and answer
[concept] expansion answered: type=Humanoid (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class fighter — "fighter" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("closing distance behind a shield of shou") | defender: key "duelist" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/beguiling mind=sapient style=— energy=Psychic mix=both identity=✓ lore=✓
[reskin] class kit: fighter — "fighter": Riposte (riposte)
[reskin] class weapon: Actions/"Javelin" -> "Longsword" — a fighter fights with a longsword, not the Guard Captain's
[reskin] free row repaired: "Named Challenge": "*Wisdom Saving Throw:* DC 14, one creature within 30 feet. *Failure:* " -> "*Wisdom Saving Throw*: DC 14, one creature within 30 feet. *Failure:* 14 (4d6) Bludgeoning"
```

**`[concept] identity:`**, uncut

> A duelist-for-hire who opens every fight by demanding a formal challenge and naming the price of surrender, closing distance behind a shield of shouting bravado and a blade held in textbook guard. Each round it fights like a student of the forms — parrying, feinting, testing — and answers any foe who reads its rhythm with a punishing counter rather than raw aggression. Bloodied, it stops performing: the drills drop away, it takes the cheap shot, and it backs toward an exit while promising revenge, never dying for a contract that's already gone bad.

**`[concept] lore:`**, uncut

> A sellsword from a cutthroat dueling school that sells its champions by the hour, this fighter takes any contract that pays and honors the letter of the bargain while quietly resenting every minute of it.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Duelbroker

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
13
+1
+1

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The duelbroker makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.

Bonus Actions

Named Challenge. Wisdom Saving Throw: DC 14, one creature within 30 feet. Failure: 14 (4d6) Bludgeoning damage.

Reactions

Riposte. Trigger: A creature within 5 feet of the duelbroker misses it with a melee attack roll. Response: The duelbroker makes one Longsword attack against that creature.

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

---

## 15. Sablegeist Duelist — CR 4

**Input:** `a fighter`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 28s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a fighter — A dueling blade-spirit who opens by naming a challenger and forcing the fight into single combat, its shadow-form coiling into a lash-and-parry rhythm of black steel. Every round it feints with its shadow to draw a guard wide, then drives its edge into the opening, fighting with cold cer
[concept] expansion answered: type=Fey (type_source=inferred) material=shadow size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: gaze
[path] class_npc — class fighter — "a fighter" (call)
[route] defender type=Fey mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("opens by naming a challenger and forcing") | defender: no line key in the words — the model's read of its quote
[concept] type settled: Fey -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Fey
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=fey/terror mind=sapient style=— energy=Psychic mix=both identity=✓ lore=✓
[reskin] class kit: fighter — "a fighter": Riposte (riposte)
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Javelin" keeps its own name — "longsword" is already a row on this sheet (fix F: one name, one row)
[reskin] free row repaired: "Formal Challenge": "*Wisdom Saving Throw:* DC 14, one creature within 60 feet that can see" -> "*Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* The target has the C"
```

**`[concept] identity:`**, uncut

> A dueling blade-spirit who opens by naming a challenger and forcing the fight into single combat, its shadow-form coiling into a lash-and-parry rhythm of black steel. Every round it feints with its shadow to draw a guard wide, then drives its edge into the opening, fighting with cold ceremony and never striking an opponent who has yielded. When bloodied it does not flee — it salutes, drops its guard deliberately, and fights to the death to honor the duel, mocking any who break form. The creature is a sapient fey made of shadow — a living blade-and-code, not a corpse or a soldier.

**`[concept] lore:`**, uncut

> A duelist who swore an oath before a dreaming court and was remade into living shadow to keep it, it now wanders the borderlands seeking worthy opponents to test its endless contract upon.

**Every attack row**
```
Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Sablegeist Duelist

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
13
+1
+1

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The duelist makes two attacks, using Javelin or Longsword in any combination. It can replace one attack with a use of Formal Challenge.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Formal Challenge. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: The target has the Charmed condition until the end of its next turn.

Reactions

Riposte. Trigger: A creature within 5 feet of the duelist misses it with a melee attack roll. Response: The duelist makes one Javelin attack against that creature.

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

---

## 16. Captain Aldren — CR 4

**Input:** `a guard captain turned paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 27s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("guard captain") | defender-leader -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Javelin" keeps its own name — "longsword" is already a row on this sheet (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> A shield-first line-holder, the captain opens by planting his shield and daring the enemy to come to him, and every round after he anchors the front rank and strikes down anyone who tries to slip past him. Under pressure he does not break or chase — he tightens his formation, calls retreats for his guards, and makes himself the last door out of the room, fighting to the death if the line must hold.

**`[concept] lore:`**, uncut

> Once a city watch captain who took a holy oath after his garrison was slaughtered on his watch, he now drills the faithful like soldiers and stands over them as a living wall of consecrated iron.

**Every attack row**
```
Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Captain Aldren

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Aldren, Aldren and its allies have Advantage on attack rolls and saving throws, provided Aldren doesn't have the Incapacitated condition.

Actions

Multiattack. Aldren makes two attacks, using Javelin or Longsword in any combination.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Bonus Actions

Challenging Duel. Wisdom Saving Throw: DC 14, one creature within 30 feet. Failure: Until the start of Aldren's next turn, the target has Disadvantage on attack rolls against creatures other than Aldren.

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

---

## 17. Captain Vaelric — CR 4

**Input:** `a guard captain turned paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 25s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "guard captain turned paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("guard captain turned paladin") | defender-leader: "captain" is a noun (a title), not a verb — no override | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/grave mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Vaelric makes two Javelin attacks."
[reskin] multiattack re-read — "Slam" left; "Multiattack" now reads "Vaelric makes two Longsword attacks."
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Vaelric makes two attacks."
```

**`[concept] identity:`**, uncut

> A veteran guard captain who took a paladin's oath, this iron-bodied soldier opens by planting at the choke point and calling out the enemy's intent, shield high and blade low. Every round after, it holds ground, daring foes to slip past so it can punish the crossing with a radiant, oath-backed strike. Under pressure it refuses to break — it keeps formation, covers the wounded behind it, and fights to the death rather than yield a single step.

**`[concept] lore:`**, uncut

> Sworn to a city that forgot his name, the captain kept his oath long after his watch ended, and grave-iron and a paladin's vow remade him into a sentinel who still guards a gate no one else remembers.

**Every attack row**
```
(no attack row)
```

```
Captain Vaelric

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Undead Fortitude. If damage reduces Vaelric to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a successful save, Vaelric drops to 1 Hit Point instead.

Aura of Authority. While in a 10-foot Emanation originating from Vaelric, Vaelric and its allies have Advantage on attack rolls and saving throws, provided Vaelric doesn't have the Incapacitated condition.

Actions

Multiattack. Vaelric makes two attacks.

Reactions

Oathbound Retaliation. Trigger: A creature Vaelric can see moves to within 5 feet of it.

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

---

## 18. Captain Halvard — CR 4

**Input:** `a guard captain turned paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 30s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender-leader type=Humanoid mechanics=none — casts: implied by the kind — "paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("guard captain") | defender: the call read "paladin" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: key "captain" (class noun)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/voice mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Javelin" -> "Longsword" — a paladin fights with a longsword, not the Guard Captain's
[reskin] multiattack re-read — "Measured Rebuke" left; "Multiattack" now reads "Halvard makes two Longsword attacks."
[reskin] free row repaired: "The Line Holds": "While Halvard is Bloodied and at least one ally that can hear him is w" -> "While Halvard is Bloodied and at least one ally is in his Aura of Authority, when Halvard "
```

**`[concept] identity:`**, uncut

> The captain opens by planting a standard and leading from the front ranks, fighting beside whatever troops it has, and every ally that keeps within the reach of its voice fights better for it. Round after round it parries with a shield and calls out orders and openings, punishing mistakes with a measured counterstrike rather than wild offense. When the line breaks and its troops fall, it holds the ground anyway and fights to the death, guarding the retreat it ordered — it does not abandon its own.

**`[concept] lore:`**, uncut

> Once a city's guard captain, this soldier took a paladin's oath after watching the watch it commanded die on a broken defensive line, and now it wanders seeking worthy troops to lead and a standard worth dying under.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Captain Halvard

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

The Line Holds. While Halvard is Bloodied and at least one ally is in his Aura of Authority, when Halvard would be reduced to 0 Hit Points, he instead drops to 1 Hit Point, and the ally nearest him takes 7 (2d6) damage in his place.

Aura of Authority. While in a 10-foot Emanation originating from Halvard, Halvard and its allies have Advantage on attack rolls and saving throws, provided Halvard doesn't have the Incapacitated condition.

Actions

Multiattack. Halvard makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.

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

---

## 19. Captain Corvane — CR 4

**Input:** `a guard captain turned paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 29s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "guard captain turned paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("guard captain turned paladin") | defender-leader: "captain" is a noun (a title), not a verb — no override | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Corvane makes two Javelin attacks."
[reskin] multiattack re-read — "Slam" left; "Multiattack" now reads "Corvane makes two Longsword attacks."
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Corvane makes two attacks."
```

**`[concept] identity:`**, uncut

> A shield-arm that has become a promise: the guard captain holds the doorway, the bridge, or the captain's body, and the first enemy who tries to slip past eats a radiant-edged blade in the back. Every round after that it plants itself, trades blows it can afford to trade, and dares the line to break on its terms — it does not flee while anyone it swore to is still standing.

**`[concept] lore:`**, uncut

> Sworn to a city watch that was betrayed from within, this captain took the oath of a paladin so that the wall they once guarded with a spear would be guarded by something the traitors could not simply walk around.

**Every attack row**
```
(no attack row)
```

```
Captain Corvane

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Oathbrand. When Corvane hits a creature with a melee weapon, the target is marked by searing light until the end of Corvane's next turn; while marked, the target cannot willingly move away from Corvane without provoking an Opportunity Attack from Corvane.

Aura of Authority. While in a 10-foot Emanation originating from Corvane, Corvane and its allies have Advantage on attack rolls and saving throws, provided Corvane doesn't have the Incapacitated condition.

Actions

Multiattack. Corvane makes two attacks.

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

---

## 20. Captain Bramwell Voss — CR 4

**Input:** `a guard captain turned paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 25s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("paladin") | defender-leader: "captain" is a noun (a title), not a verb — no override | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Warhammer" left; "Multiattack" now reads "Captain Bramwell makes two attacks, using, Javelin, or Longsword in any combination."
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "Captain Bramwell makes two Longsword attacks."
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> A scarred guard captain who took the oath late, this paladin opens by planting his shield and daring the enemy line to come to him, holding a doorway or bridge like it's the last gate in the city. Each round he trades ground for openings — shield-bash to stagger, then a punishing hammer blow as the offender tries to slip past, refusing to yield an inch. He fights to the death for the people behind him, but has enough soldier's sense to fall back to a tighter chokepoint rather than die in the open.

**`[concept] lore:`**, uncut

> Once the captain of a city watch who watched his garrison break at the gates, he swore a paladin's oath over the bodies of the men he couldn't save and now serves as the unbreakable shield his city never had.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Captain Bramwell Voss

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Captain Bramwell, Captain Bramwell and its allies have Advantage on attack rolls and saving throws, provided Captain Bramwell doesn't have the Incapacitated condition.

Actions

Multiattack. Captain Bramwell makes two Longsword attacks. It can replace one attack with a use of Shield Slam Terror.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Shield Slam Terror. Wisdom Saving Throw: DC 14, each creature of Captain Bramwell's choice in a 30-foot Emanation originating from Captain Bramwell that can see or hear it. Failure: The target has the Frightened condition until the end of its next turn. Success: The target is immune to this creature's terror for 24 hours.

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


# Pass 2 — the same twenty, AFTER the fix

**0 of 20 with nothing to roll.** `chassis row STAYS` fired on four of them — 06, 08, 16 and 19 —
which are the rolls where the sweep would have taken the last attack row. 1 FAIL of 20, a grapple
engine with no key in the words, unrelated.

`smoke-out/paladin20-2026-11-16T04-35-29`

---

## 01. Vowiron — CR 4

**Input:** `a paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 31s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a paladin") | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Warhammer" left; "Multiattack" now reads "The vowiron makes two attacks, using, Javelin, or Longsword in any combination."
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "the vowiron makes two Longsword attacks."
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] free row repaired: "Oathbound Iron": "When the vowiron takes damage from a source within its Aura of Authori" -> "When the vowiron takes damage from a creature inside its Aura of Authority, the first time"
```

**`[concept] identity:`**, uncut

> A sworn shield of beaten iron, the paladin plants itself in the doorway of the fight and makes the ground it stands on the only ground that matters — it opens by shrugging off the first blows and answering with a radiant, bone-jarring strike, then every round it pins the line, punishing anyone who tries to slip past with a burst of consecrated force. Under pressure it does not flinch, does not break, and does not run: it grinds the fight to a halt, absorbing punishment with grim certainty and dragging the battle into a war of attrition it has already vowed to win.

**`[concept] lore:`**, uncut

> Oathbound wanderers whose vows hardened into the iron of their own plate, they hold ground they never owned and ask only that something worth defending be standing behind them.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Vowiron

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Oathbound Iron. When the vowiron takes damage from a creature inside its Aura of Authority, the first time each round this happens, the damage is reduced by an amount equal to its Charisma modifier, and while the vowiron has the Incapacitated condition its Aura of Authority remains active.

Aura of Authority. While in a 10-foot Emanation originating from the vowiron, the vowiron and its allies have Advantage on attack rolls and saving throws, provided the vowiron doesn't have the Incapacitated condition.

Actions

Multiattack. The vowiron makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

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

---

## 02. Oathwall — CR 4

**Input:** `a paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 26s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Javelin" -> "Longsword" — a paladin fights with a longsword, not the Guard Captain's
```

**`[concept] identity:`**, uncut

> A veteran holy knight in sanctified plate, it plants itself between the innocent and the wicked, opening with a shouted challenge and a shield-first advance. Each round it holds the line with shield bashes and sword strokes, punishing any foe that turns its back or slips past with a radiant burst of holy reprisal. Under pressure it does not flee — it anchors harder, spending its last lay-on-hands on itself and daring the enemy to break upon it.

**`[concept] lore:`**, uncut

> A paladin who swore to be the wall between the innocent and the dark; its oath still rings from the iron of its breastplate, and it will not yield the ground it was set to hold.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Oathwall

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the oathwall, the oathwall and its allies have Advantage on attack rolls and saving throws, provided the oathwall doesn't have the Incapacitated condition.

Actions

Multiattack. The oathwall makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.

Shield Burst (Recharge 5-6). Dexterity Saving Throw: DC 14, each creature in a 10-foot Emanation originating from the oathwall. Failure: 14 (4d6) Bludgeoning damage. Success: Half damage.

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

---

## 03. Sir Aldric Vowbrand — CR 4

**Input:** `a paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 28s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Blessed Blade" left; "Multiattack" now reads "Sir Aldric makes two attacks, using, Javelin, or Longsword in any combination."
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "Sir Aldric makes two Longsword attacks."
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] multiattack re-read — "Radiant Mark" left; "Multiattack" now reads "Sir Aldric makes two Longsword attacks."
```

**`[concept] identity:`**, uncut

> The paladin opens by planting its shield and calling down a radiant glare that marks the boldest foe, then strides into the thick of melee where its blessed blade channels searing light through every swing. It fights as a bastion, stepping in front of allies and smiting any who try to slip past, and it never yields ground while a comrade still stands.

**`[concept] lore:`**, uncut

> Sworn to a martial holy order, the paladin ventures into the world to smite corruption and uphold its creed, regarding every battlefield as a test of faith.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Sir Aldric Vowbrand

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Relentless Spacing. Whenever a creature within Sir Aldric's reach moves, Sir Aldric can move into the space the creature left, and he ignores difficult terrain made of rubble, wreckage, or fallen bodies.

Aura of Authority. While in a 10-foot Emanation originating from Sir Aldric, Sir Aldric and its allies have Advantage on attack rolls and saving throws, provided Sir Aldric doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Aldric makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

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

---

## 04. Oathsworn Sentinel — CR 4

**Input:** `a paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 29s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "a paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "a paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Warhammer" left; "Multiattack" now reads "The sentinel makes two attacks, using, Javelin, or Longsword in any combination."
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "the sentinel makes two Longsword attacks."
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] multiattack re-read — "Shield Ringer" left; "Multiattack" now reads "the sentinel makes two Longsword attacks."
[reskin] free row repaired: "Sanctified Toll": "Whenever the sentinel takes damage from a creature it can see, the sen" -> "When the sentinel takes damage from a creature it can see, the ally of the sentinel's choi"
```

**`[concept] identity:`**, uncut

> The paladin opens by planting its shield and daring the enemy line to break on it, its sanctified armor ringing like a bell as it strikes. Every round it holds a choke point, healing its own wounds with a word and punishing any foe that tries to slip past with a radiant rebuke. Under pressure it does not flee; it tightens the line, calls down its oath, and fights to the last breath.

**`[concept] lore:`**, uncut

> A sworn knight of a militant order, the paladin has bound its soul to a sacred vow and now walks the battlefield as a living bulwark, seeking to prove its faith by never yielding ground.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Oathsworn Sentinel

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Sanctified Toll. When the sentinel takes damage from a creature it can see, the ally of the sentinel's choice that is within the sentinel's Aura of Authority at that moment has Advantage on its next attack roll against the damaging creature.

Aura of Authority. While in a 10-foot Emanation originating from the sentinel, the sentinel and its allies have Advantage on attack rolls and saving throws, provided the sentinel doesn't have the Incapacitated condition.

Actions

Multiattack. The sentinel makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

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

---

## 05. Hallowed Vigil — CR 4

**Input:** `a paladin`
**Donor:** defender-3 -> CR 4
**Signature:** dropped · **elapsed** 26s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "a paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "a paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Javelin" -> "Longsword" — a paladin fights with a longsword, not the Guard Captain's
```

**`[concept] identity:`**, uncut

> A sworn knight in blood-blessed plate who plants a shield and makes itself the wall between the wicked and the flock; it opens by advancing into the nearest foe and seizing ground, then holds, bleeding holy fire into anyone who strikes it and striking down with sword and shield what does not break. Under pressure it neither flees nor toys — it anchors, endures, and spends its own blood to keep the line, dying on its feet before yielding a step.

**`[concept] lore:`**, uncut

> A paladin who swore its final oath over the corpse of the town it failed to save, and now walks the roads as living armor that will not let another slaughter pass behind it.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Hallowed Vigil

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Consecrated Flame. The first time the vigil is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 14, each creature in a 15-foot Emanation originating from the vigil. Failure: 7 (2d6) Bludgeoning damage, and the target has the Blinded condition until the end of its next turn.

Aura of Authority. While in a 10-foot Emanation originating from the vigil, the vigil and its allies have Advantage on attack rolls and saving throws, provided the vigil doesn't have the Incapacitated condition.

Actions

Multiattack. The vigil makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet that the vigil can see. Failure: 7 (2d6) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition.

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

---

## 06. Sir Aldric — CR 4

**Input:** `name: Sir Aldric | a paladin of the dawn`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 30s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin of the dawn" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a paladin of the dawn") | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Sir Aldric makes two Javelin attacks."
[reskin] class weapon: Actions/"Slam" -> "Longsword" — a paladin fights with a longsword, not the Guard Captain's
[reskin] free row repaired: "Shield Pin": "*Strength Saving Throw*: DC 14, one creature within 5 feet. *Failure:*" -> "*Strength Saving Throw*: DC 14, one creature within 5 feet. *Failure:* The target has the "
```

**`[concept] identity:`**, uncut

> Sir Aldric opens by planting his shield and calling down the dawn — a radiant flare that marks the field as his — then advances with measured, unbroken steps, sword held low, daring enemies to break past him. Every round he anchors the line: he takes the blow on iron and answers with a radiant riposte, punishing any who turn their back or step around him. Under pressure he does not flee; he plants harder, shifting his stance to cover the wounded and the narrow ground, and fights to the last until the dawn goes out.

**`[concept] lore:`**, uncut

> Sir Aldric was the last paladin of a dawn-order whose chapel burned at first light; he rose from the ashes still in his plate, sworn to hold every threshold until the sun returns to it.

**Every attack row**
```
Longsword. Melee Attack Roll: +6 reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Sir Aldric

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Sir Aldric, Sir Aldric and its allies have Advantage on attack rolls and saving throws, provided Sir Aldric doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Aldric makes two Longsword attacks. It can replace one attack with a use of Shield Pin.

Longsword. Melee Attack Roll: +6 reach 5 ft. 14 (3d6 + 4) Slashing damage.

Shield Pin. Strength Saving Throw: DC 14, one creature within 5 feet. Failure: The target has the Grappled condition (escape DC 14).

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

---

## 07. Sir Aldric — CR 4

**Input:** `name: Sir Aldric | a paladin of the dawn`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 21s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "Sir" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin of the dawn" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin of the dawn") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "Sir": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Javelin" keeps its own name — "longsword" is already a row on this sheet (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> Sir Aldric opens by planting himself at the chokepoint, forcing attackers to break on his shield while his dawn-blessed blade sears whatever touches it. Each round he holds the line and answers any foe who slips past with a punishing radiant counter, never yielding ground he has claimed. He fights to the death with grim, unhurried patience — a soldier of the dawn who sees retreat as betrayal of the light.

**`[concept] lore:`**, uncut

> Sworn to a dawn-god whose covenant demands the last stand, Sir Aldric guards a fallen shrine at the pass, waiting for the one pilgrim worthy of the light he still carries.

**Every attack row**
```
Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Sir Aldric

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Sir Aldric, Sir Aldric and its allies have Advantage on attack rolls and saving throws, provided Sir Aldric doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Aldric makes two attacks, using Javelin or Longsword in any combination.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

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

---

## 08. Sir Aldric — CR 4

**Input:** `name: Sir Aldric | a paladin of the dawn`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 22s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "paladin of the dawn" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("paladin of the dawn") | defender: the call read "paladin" as not meaning that mechanic here — no override | caster-warpriest stands: every key that would override it was read as a figure of speech | caster-warpriest: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Sir Aldric makes two Javelin attacks."
[reskin] class weapon: Actions/"Slam" -> "Longsword" — a paladin fights with a longsword, not the Guard Captain's
[reskin] free row repaired: "Dawnfire Wound": "*Constitution Saving Throw*: DC 14, one creature within 5 feet. *Failu" -> "*Constitution Saving Throw*: DC 14, one creature within 5 feet. *Failure:* The target has "
```

**`[concept] identity:`**, uncut

> Sir Aldric opens every fight by announcing his dawn-lit judgment aloud, then wades in with his blade while holy fire climbs each strike — a war-priest who fights like a sermon he expects you to answer. Each round he keeps pressure with weapon and prayer together, walking forward into the thick of it rather than dueling at distance. He does not flee while bloodied; he calls on the dawn he serves and prays louder, fighting to the death as a martyr's witness.

**`[concept] lore:`**, uncut

> A paladin sworn to the dawn, Sir Aldric rode out from a burning chapel with his god's light still smoking on his armor and has never once turned his back on a fight, believing each enemy felled before sunrise is a soul redeemed.

**Every attack row**
```
Longsword. Melee Attack Roll: +6 reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Sir Aldric

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Sir Aldric, Sir Aldric and its allies have Advantage on attack rolls and saving throws, provided Sir Aldric doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Aldric makes two Longsword attacks. It can replace one attack with a use of Dawnfire Wound.

Longsword. Melee Attack Roll: +6 reach 5 ft. 14 (3d6 + 4) Slashing damage.

Dawnfire Wound. Constitution Saving Throw: DC 14, one creature within 5 feet. Failure: The target has the Blinded condition until the end of its next turn.

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

---

## 09. Sir Aldric — CR 4

**Input:** `name: Sir Aldric | a paladin of the dawn`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 24s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "Sir" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin of the dawn" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin of the dawn") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=celestial/armed mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "Sir": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Javelin" -> "Longsword" — a paladin fights with a longsword, not the Guard Captain's
[reskin] free row repaired: "Blinding Dawn": "*Constitution Saving Throw*: DC 14, any creature that starts its turn " -> "*Constitution Saving Throw*: DC 14, each creature in a 5-foot Emanation originating from S"
```

**`[concept] identity:`**, uncut

> Sir Aldric opens by planting his shield and calling down a flare of dawnlight, then advances at a measured pace — every step a threat zone that punishes anyone who tries to slip past him. He fights as a deliberate line-holder, daring foes to break his guard while his blade carries radiant judgment; when bloodied he does not flee but doubles down, becoming a sunburst of retribution that turns his own wounds into a blinding consecration of the field.

**`[concept] lore:`**, uncut

> Once a knight of a fallen dawn-order, Sir Aldric was remade by the first light of a broken sun-god and now walks the borderlands as a living oath, holding every bridge and gate he swore to protect until the light itself can be restored.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Sir Aldric

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Sir Aldric, Sir Aldric and its allies have Advantage on attack rolls and saving throws, provided Sir Aldric doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Aldric makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.

Blinding Dawn. Constitution Saving Throw: DC 14, each creature in a 5-foot Emanation originating from Sir Aldric. Failure: The target has the Blinded condition until the end of its next turn.

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

---

## 10. Sir Aldric — CR 4

**Input:** `name: Sir Aldric | a paladin of the dawn`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 22s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "a paladin of the dawn" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin of the dawn") | defender: the call read "paladin" as not meaning that mechanic here — no override | caster-warpriest stands: every key that would override it was read as a figure of speech | caster-warpriest: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=celestial/armed mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Javelin" keeps its own name — "longsword" is already a row on this sheet (fix F: one name, one row)
[reskin] free row repaired: "Mark of the Dawn": "When Sir Aldric hits a creature with an attack, the target is marked u" -> "When Sir Aldric hits a creature with an attack, the target is marked until the end of Sir "
```

**`[concept] identity:`**, uncut

> Sir Aldric opens every fight by planting his shield and calling down the dawn — a flare of holy light that marks the wicked before he closes — then grinds forward in iron plate, each hammer-strike and blade-cut trailing radiant fire that burns as much as it breaks. He fights like a man who has already decided he cannot lose, stepping into blows and daring foes to break their blades on him, but he is no fool: bloodied, he falls back behind his shield and answers with a prayer that mends or sears before he re-engages.

**`[concept] lore:`**, uncut

> Sir Aldric was the last knight standing when his chapel fell to raiders, and the dawn answered his dying oath by pouring itself into his plate, so he now wanders the ruins of the faithful to see that every oath-breaker meets the light he has become bone-deep.

**Every attack row**
```
Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Sir Aldric

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Mark of the Dawn. When Sir Aldric hits a creature with an attack, the target is marked until the end of Sir Aldric's next turn; while marked, Sir Aldric's attacks against it deal an extra 7 (2d6) Radiant damage, and the target can't take Reactions.

Aura of Authority. While in a 10-foot Emanation originating from Sir Aldric, Sir Aldric and its allies have Advantage on attack rolls and saving throws, provided Sir Aldric doesn't have the Incapacitated condition.

Actions

Multiattack. Sir Aldric makes two attacks, using Javelin or Longsword in any combination. It can replace one attack with a use of Dawnfire Flare.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Dawnfire Flare. Dexterity Saving Throw: DC 14, one creature within 60 feet. Failure: 7 (2d6) Piercing damage, and until the end of Sir Aldric's next turn the target sheds dim light in a 10-foot radius, it can't benefit from the Invisible condition, and attack rolls against it have Advantage.

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

---

## 11. Tourney Verdict — CR 4

**Input:** `a fighter`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 29s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a fighter — A rival duelist who opens every fight by seizing the best ground and testing the party's weakest guard with measured thrusts, then reads their rhythm and answers each pattern with the counter it punishes. Every round it presses a press-and-retreat cadence — engage, punish a mistake, side
[concept] expansion answered: type=Humanoid (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: thrown-weapon
[path] class_npc — class fighter — "a fighter" (call)
[route] defender-leader type=Construct mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("then reads their rhythm and answers each") | defender: the call read "duelist" as not meaning that mechanic here — no override | defender-leader stands: every key that would override it was read as a figure of speech | defender-leader: no line key in the words — the model's read of its quote | bane refused: the words carry no weakness clause and the call did not claim one, so "Radiant" is a guess from what the creature is, not the GM's ask
[concept] type settled: Construct -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Construct
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=armed/terror mind=sapient style=leader energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: fighter — "a fighter": Riposte (riposte)
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Javelin" keeps its own name — "longsword" is already a row on this sheet (fix F: one name, one row)
[reskin] free row repaired: "Read the Opponent": "The first round of combat, the verdict has Advantage on its first atta" -> "On its first turn of combat, it has Advantage on its first attack roll of the combat, and "
```

**`[concept] identity:`**, uncut

> A rival duelist who opens every fight by seizing the best ground and testing the party's weakest guard with measured thrusts, then reads their rhythm and answers each pattern with the counter it punishes. Every round it presses a press-and-retreat cadence — engage, punish a mistake, sidestep out of reach — treating the battle as a bout to be won by pacing rather than by blood. It never fights to the death on its own terms: bloodied, it offers a grudging yield or disengages for a rematch, and only fights mad when its opponent cheats.

**`[concept] lore:`**, uncut

> A duelist who lost one bout too many and now stalks the old tourney road, challenging every armed traveler to prove the verdict was a mistake.

**Every attack row**
```
Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Tourney Verdict

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
13
+1
+1

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Read the Opponent. On its first turn of combat, it has Advantage on its first attack roll of the combat, and it can take the Disengage action as a bonus action.

Actions

Multiattack. The verdict makes two attacks, using Javelin or Longsword in any combination.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Reactions

Riposte. Trigger: A creature within 5 feet of the verdict misses it with a melee attack roll. Response: The verdict makes one Javelin attack against that creature.

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

---

## 12. Last Ranker — CR 4

**Input:** `a fighter`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 29s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a fighter — A raw recruit drilled until the drill became its whole self, it opens with a reckless charge and a shield-first shove to seize the best ground, then settles into an exhausting rhythm of blade-work, shoulder-checks, and shouted footwork. Every round it fights like it's still in the yard —
[concept] expansion answered: type=Construct (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: aura
[path] class_npc — class fighter — "fighter" (call)
[route] defender type=Construct mechanics=aura — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "a shield-first shove to seize ", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("refusing to break formation even alone") | brute-charger: the call read "charge" as not meaning that mechanic here — no override | brute-grappler: the call read "seize" as not meaning that mechanic here — no override | defender stands: every key that would override it was read as a figure of speech | defender: no line key in the words — the model's read of its quote
[concept] type settled: Construct -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Construct
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=forged/armed mind=sapient style=— energy=Thunder mix=both identity=✓ lore=✓
[reskin] class kit: fighter — "fighter": Riposte (riposte)
[reskin] multiattack re-read — "Broadsword" left; "Multiattack" now reads "Last makes two attacks, using, Javelin, or Longsword in any combination."
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "Last makes two Longsword attacks."
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] free row repaired: "Shield Bash": "*Strength Saving Throw*: DC 14, one creature within 5 feet that Last c" -> "*Strength Saving Throw*: DC 14, one creature within 5 feet. *Failure:* 14 (4d6) Bludgeonin"
```

**`[concept] identity:`**, uncut

> A raw recruit drilled until the drill became its whole self, it opens with a reckless charge and a shield-first shove to seize the best ground, then settles into an exhausting rhythm of blade-work, shoulder-checks, and shouted footwork. Every round it fights like it's still in the yard — correcting its stance aloud, refusing to break formation even alone, and growing louder and more personally insulting as the fight drags on. Under pressure it does not flee; it digs in, plants its feet, and tries to out-last and out-talk the enemy, holding its ground until it drops.

**`[concept] lore:`**, uncut

> It is the last fighter of a company that never got the order to stand down — a ranker-ghost, or a training-yard construct still passing out shields, that wants only one more clean bout to prove the drill took.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Last Ranker

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
13
+1
+1

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. Last makes two Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 14, one creature within 5 feet. Failure: 14 (4d6) Bludgeoning damage, and the target has the Prone condition.

Reactions

Riposte. Trigger: A creature within 5 feet of Last misses it with a melee attack roll.

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

---

## 13. Everson Duelblade — CR 4

**Input:** `a fighter`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 24s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a fighter — A duelist who opens with a shallow, deliberate cut meant to be answered, then spends every round reading the reply and stepping inside it — parry, clinch, and counter cut in one motion. Each exchange it survives teaches it the opponent's rhythm, so the second strike is always better plac
[concept] expansion answered: type=Humanoid (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] class_npc — class fighter — "a fighter" (call)
[route] defender type=Construct mechanics=grapple — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "parry, clinch, and counter cut", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("opens with a shallow, deliberate cut mea") | defender: key "duelist" (class verb)
[concept] type settled: Construct -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Construct
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=armed/uncanny mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: fighter — "a fighter": Riposte (riposte)
[reskin] multiattack re-read — "Saber" left; "Multiattack" now reads "Everson makes two attacks, using, Javelin, or Longsword in any combination."
[reskin] multiattack re-read — "Javelin" left; "Multiattack" now reads "Everson makes two Longsword attacks."
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> A duelist who opens with a shallow, deliberate cut meant to be answered, then spends every round reading the reply and stepping inside it — parry, clinch, and counter cut in one motion. Each exchange it survives teaches it the opponent's rhythm, so the second strike is always better placed than the first. It fights to the death but never to the finish: it disengages at half blood only to circle and re-engage from the other side, refusing to be the one who commits first.

**`[concept] lore:`**, uncut

> A fighting-school's prized pupil who lost a wager to a hag and was taught one perfect technique too many, it now wanders the roads picking fights it can survive, looking for the cut that will finally answer the one that killed it.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Everson Duelblade

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
13
+1
+1

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. Everson makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Reactions

Riposte. Trigger: A creature within 5 feet of Everson misses it with a melee attack roll.

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

---

## 14. Sandpit Duelist — CR 4

**Input:** `a fighter`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 31s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a fighter — A dueling blade given appetite, it opens by circling to claim the sun-side of its opponent, then lunges in a flurry of probing cuts aimed to disarm and bleed before the real thrust lands. Every round it reads the foe's guard and feints to open a seam, then punishes hesitation with a seco
[concept] expansion answered: type=Construct (type_source=user) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: thrown-weapon
[path] class_npc — class fighter — "a fighter" (call)
[route] defender type=Construct mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("Every round it reads the foe's guard and") | defender: no line key in the words — the model's read of its quote
[concept] type settled: Construct -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Construct
[concept] resolve: archetype=defender type=Humanoid typeFrom=fix A/E (a person with no named body) themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: fighter — "a fighter": Riposte (riposte)
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Javelin" keeps its own name — "longsword" is already a row on this sheet (fix F: one name, one row)
[reskin] multiattack re-read — "Opened Seam" left; "Multiattack" now reads "the duelist makes two attacks, using Javelin or Longsword in any combination."
[reskin] free row repaired: "Blood in the Sand": "While any creature within 5 feet of the duelist is Bloodied, the dueli" -> "While a creature other than the duelist within 5 feet of it is Bloodied, the duelist has A"
```

**`[concept] identity:`**, uncut

> A dueling blade given appetite, it opens by circling to claim the sun-side of its opponent, then lunges in a flurry of probing cuts aimed to disarm and bleed before the real thrust lands. Every round it reads the foe's guard and feints to open a seam, then punishes hesitation with a second, deeper cut at the joint of that opening. Wounded, it does not retreat — it fights harder and faster, more eager the more blood is on the ground, until one of them stops moving.

**`[concept] lore:`**, uncut

> Forged in a coliseum's sand from the blades of fallen champions and given a fighter's ghost of a will, it haunts arenas and tourney grounds seeking a duel worth the death it was made from.

**Every attack row**
```
Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Sandpit Duelist

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
13
+1
+1

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Blood in the Sand. While a creature other than the duelist within 5 feet of it is Bloodied, the duelist has Advantage on attack rolls against that creature, and its Speed increases by 10 feet, lasting only while such a creature is within 5 feet of it.

Actions

Multiattack. The duelist makes two attacks, using Javelin or Longsword in any combination.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Reactions

Riposte. Trigger: A creature within 5 feet of the duelist misses it with a melee attack roll. Response: The duelist makes one Javelin attack against that creature.

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

---

## 15. Saltfield Challenger — CR 4

**Input:** `a fighter`
**Donor:** brute-2 -> CR 4
**Signature:** library · **elapsed** 29s

**Type line:** `Medium Humanoid, Neutral` — **set by** fix A/E (a person with no named body)

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a fighter — A disciplined skirmisher that opens by closing distance and pinning a single target with short, efficient blade work, then holds that target between itself and the rest of the fight. Every round it advances behind its guard, trading one clean strike for a step of ground and punishing any
[concept] expansion answered: type=Undead (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] class_npc — class fighter — "a fighter" (call)
[route] brute-grappler type=Construct mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "pinning a single target with s", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("then holds that target between itself an") | defender -> brute-grappler: the concept's VERB outranks the noun (key "holds", class verb) | brute-grappler: key "holds" (class verb)
[concept] type settled: Construct -> Humanoid — the GM's words are a name and the class word and nothing else, and a person with no named body is a Humanoid (owner's ruling, 2026-11-15, widened 2026-11-16); the route call had answered Construct
[concept] resolve: archetype=brute type=Humanoid typeFrom=fix A/E (a person with no named body) themes=grave/armed mind=sapient style=grappler energy=Necrotic mix=both identity=✓ lore=✓
[reskin] class kit: riposte — the sheet cannot carry it here (role, CR band, movement or a denial)
[reskin] class kit: fighter — "a fighter": nothing to add — the sheet already answers it
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Javelin" keeps its own name — "longsword" is already a row on this sheet (fix F: one name, one row)
[reskin] free row repaired: "Clinch": "*Strength Saving Throw*: DC 14, one creature within 5 feet. *Failure:*" -> "*Strength Saving Throw*: DC 14, one creature within 5 feet. *Failure:* 24 (7d6) Bludgeonin"
```

**`[concept] identity:`**, uncut

> A disciplined skirmisher that opens by closing distance and pinning a single target with short, efficient blade work, then holds that target between itself and the rest of the fight. Every round it advances behind its guard, trading one clean strike for a step of ground and punishing anyone who overcommits. When bloodied it does not rout — it tightens, picks the wounded mark, and finishes the duel it started.

**`[concept] lore:`**, uncut

> A sellsword resurrected in the arena's salt and iron, it rises each dusk to fight a duel no living champion ever paid it for.

**Every attack row**
```
Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Saltfield Challenger

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
13
+1
+1

Skills Athletics +6, Perception +4

Immunities Grappled

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The challenger makes two attacks, using Javelin or Longsword in any combination. It can replace one attack with a use of Clinch.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

Clinch. Strength Saving Throw: DC 14, one creature within 5 feet. Failure: 24 (7d6) Bludgeoning damage, and the target has the Grappled condition (escape DC 14).

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

---

## 16. Captain Maren Ironvow — CR 4

**Input:** `a guard captain turned paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 27s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "turned paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("guard captain turned paladin") | defender-leader: "captain" is a noun (a title), not a verb — no override | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/grave mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "Maren makes two Javelin attacks."
[reskin] class weapon: Actions/"Slam" -> "Longsword" — a paladin fights with a longsword, not the Guard Captain's
```

**`[concept] identity:`**, uncut

> A veteran guard captain who took the paladin's oath, she opens every fight planted behind her shield, daring the enemy line to come to her. Each round she locks down the nearest foe with shield and blade, then punishes anyone who tries to slip past her toward her allies with a rebuke of holy force. She does not flee — she sells ground only to buy the party time, and holds to the last breath.

**`[concept] lore:`**, uncut

> Once the captain of the city watch, she swore her oath over the graves of the men who fell under her command, and now she stands the same wall in iron and faith, refusing to lose another soul.

**Every attack row**
```
Longsword. Melee Attack Roll: +6 reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Captain Maren Ironvow

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Maren, Maren and its allies have Advantage on attack rolls and saving throws, provided Maren doesn't have the Incapacitated condition.

Actions

Multiattack. Maren makes two Longsword attacks.

Longsword. Melee Attack Roll: +6 reach 5 ft. 14 (3d6 + 4) Slashing damage.

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

---

## 17. Oathcaptain Serise Marrow — CR 4

**Input:** `a guard captain turned paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 27s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("turned paladin") | defender-leader: "captain" is a noun (a title), not a verb — no override | defender: the call read "paladin" as not meaning that mechanic here — no override | caster-warpriest stands: every key that would override it was read as a figure of speech | caster-warpriest: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Javelin" -> "Longsword" — a paladin fights with a longsword, not the Guard Captain's
```

**`[concept] identity:`**, uncut

> A career watchman who took holy vows, this captain fights like a shield wall with a sermon: he closes to the front rank, plants himself between the party and whatever he's sworn to defend, and lets his blade carry the judgment he pronounces. Every round he trades ground for tempo — calling out a target's sins, marking the guilty, and spending his prayers as armor and reprisal rather than distance. He does not flee; he falls back in order, covering allies, and only breaks when his oath is already broken.

**`[concept] lore:`**, uncut

> Promoted from the night watch of a city whose magistrates were rotten, he swore his captain's oath to a higher court and now patrols the same streets as an enforcer of divine law, hunting the corrupted officials he once answered to.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Oathcaptain Serise Marrow

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Oath's Backlash. A creature that touches Serise or hits it with a melee attack while within 5 feet of it takes 5 (1d10) Bludgeoning damage.

Aura of Authority. While in a 10-foot Emanation originating from Serise, Serise and its allies have Advantage on attack rolls and saving throws, provided Serise doesn't have the Incapacitated condition.

Actions

Multiattack. Serise makes two Longsword attacks. It can replace one attack with a use of Pronouncement of Guilt.

Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.

Pronouncement of Guilt. Wisdom Saving Throw: DC 14, one creature within 60 feet. Failure: 14 (4d6) Radiant damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

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

---

## 18. Captain Thane Halloran — CR 4

**Input:** `a guard captain turned paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 27s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "guard captain turned paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("guard captain turned paladin") | defender-leader: "captain" is a noun (a title), not a verb — no override | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: "longsword" already names a row on this body — no row is renamed to it (fix F: one name, one row)
[reskin] class weapon: Actions/"Javelin" keeps its own name — "longsword" is already a row on this sheet (fix F: one name, one row)
```

**`[concept] identity:`**, uncut

> A veteran guard captain who took the paladin's oath mid-watch, this armored defender plants the shield wall at whatever chokepoint the fight offers and dares the enemy line to break on it. Every round it punishes reach and movement — stepping into an ally's place to intercept, then answering an overextension with a shield boss and a blade strike carrying its oath's radiance. It holds to the death, never yields ground while an ally stands behind it, and grows more deliberate, not more reckless, as the blood runs.

**`[concept] lore:`**, uncut

> Sworn to a city watch that had no god, the captain took a battlefield oath over fallen comrades and now guards the last threshold of whatever line he is ordered to hold, calling the light down from duty alone.

**Every attack row**
```
Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.
Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.
```

```
Captain Thane Halloran

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Pack Tactics. Thane has Advantage on an attack roll against a target if at least one of Thane's allies is within 5 feet of that target and the ally doesn't have the Incapacitated condition.

Aura of Authority. While in a 10-foot Emanation originating from Thane, Thane and its allies have Advantage on attack rolls and saving throws, provided Thane doesn't have the Incapacitated condition.

Actions

Multiattack. Thane makes two attacks, using Javelin or Longsword in any combination.

Javelin. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 30/120 ft. 14 (3d6 + 4) Piercing damage.

Longsword. Melee Attack Roll: +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.

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

---

## 19. Gatewarden — CR 4

**Input:** `a guard captain turned paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 23s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "guard captain turned paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("turned paladin") | defender-leader: "captain" is a noun (a title), not a verb — no override | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] multiattack re-read — "Longsword" left; "Multiattack" now reads "The gatewarden makes two Javelin attacks."
[reskin] class weapon: Actions/"Slam" -> "Longsword" — a paladin fights with a longsword, not the Guard Captain's
```

**`[concept] identity:`**, uncut

> A veteran guard captain who took a paladin's oath, this humanoid fights as an armored anchor: it plants itself on the line, shield high, and opens by bellowing a challenge that draws the nearest foe onto its blade. Every round after it holds that ground, shoving back anyone who tries to slip past and hammering the one who stayed with a longsword that carries a faint radiant judgment. Its discipline never breaks, it fights to the death it does not expect, but it will reposition and shield another before it ever gives ground.

**`[concept] lore:`**, uncut

> Sworn from the city watch into a holy order after a siege he refused to abandon, the captain now guards the gate he failed to save, testing every soul that would pass it.

**Every attack row**
```
Longsword. Melee Attack Roll: +6 reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Gatewarden

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the gatewarden, the gatewarden and its allies have Advantage on attack rolls and saving throws, provided the gatewarden doesn't have the Incapacitated condition.

Actions

Multiattack. The gatewarden makes two Longsword attacks.

Longsword. Melee Attack Roll: +6 reach 5 ft. 14 (3d6 + 4) Slashing damage.

Bonus Actions

Shield Challenge. Wisdom Saving Throw: DC 14, one creature within 30 feet. Failure: Until the start of the gatewarden's next turn, the target has Disadvantage on attack rolls against creatures other than the gatewarden.

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

---

## 20. Captain Malrec Thorn — CR 4

**Input:** `a guard captain turned paladin`
**Donor:** defender-3 -> CR 4
**Signature:** library · **elapsed** 25s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender-leader: ✓ ("guard captain turned paladin") | defender-leader -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Javelin" -> "Longsword" — a paladin fights with a longsword, not the Guard Captain's
```

**`[concept] identity:`**, uncut

> A sworn shield who stepped from the city watch into holy orders, this captain opens by planting at the mouth of the road and daring the party to come through, shield high and blade low. Every round he holds the line — his faith lets him shrug off wounds that would drop a lesser soldier, and anyone who tries to slip past his guard eats a smite-backed strike for the trouble. Wounded, he does not break; his oath is to the post, not to his own life, so he fights to the death, calling out the names of the citizens behind him.

**`[concept] lore:`**, uncut

> Once a mere captain of the guard, he took the paladin's oath the night his watch was overrun, and now he stands the same post forever, sworn to hold a ground no living commander would still defend.

**Every attack row**
```
Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.
```

```
Captain Malrec Thorn

Medium Humanoid, Neutral

AC 18
Initiative +2 (12)

HP 75 (10d8 + 30)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
12
+1
+1
MOD
SAVE
DEX
14
+2
+2
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
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 4 (XP 1,100; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Malrec, Malrec and its allies have Advantage on attack rolls and saving throws, provided Malrec doesn't have the Incapacitated condition.

Actions

Multiattack. Malrec makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 14 (3d6 + 4) Slashing damage.

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


# Pass 2 — either side of the failing body: `a paladin` at CR 3 and CR 5

Three rolls each. **0 FAIL of 6**, and no sheet is empty: CR 3 reads 2, 2, 2 attack rows and CR 5
reads 1, 1, 1.

`smoke-out/paladin-sides-2026-11-16T04-44-46`

---

## 01. Oathgate Warden — CR 3

**Input:** `a paladin`
**Donor:** defender-3 -> CR 3
**Signature:** library · **elapsed** 29s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "a paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "a paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Greatsword" -> "Longsword" — a paladin fights with a longsword, not the Knight's; the body's rider folds in (+4)
```

**`[concept] identity:`**, uncut

> A sword-and-board holy champion who plants itself in the gap and fights to hold that ground, opening by advancing behind its shield to pin the most dangerous foe in reach. Each round it refuses to be flanked, using shield pressure to deny lines and punishing anyone who tries to slip past by breaking the move with a shove or a smite-charged blade. It does not flee and does not toy — wounded, it draws tighter around the thing it is sworn to defend and grinds attackers down at the threshold.

**`[concept] lore:`**, uncut

> A consecrated soldier of an embattled order, this paladin holds a fixed ward or oath-gate, and it wants only to keep that chosen line standing until relief arrives.

**Every attack row**
```
Longsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.
Heavy Crossbow. Ranged Attack Roll: +2, range 100/400 ft. 11 (2d10) Piercing damage.
```

```
Oathgate Warden

Medium Humanoid, Neutral

AC 18
Initiative +0 (10)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
11
+0
+0
MOD
SAVE
DEX
11
+0
+0
WIS
11
+0
+2
MOD
SAVE
CON
14
+2
+4
CHA
15
+2
+2

Skills Athletics +5, Perception +2

Immunities Frightened

Senses Passive Perception 12

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the warden, the warden and its allies have Advantage on attack rolls and saving throws, provided the warden doesn't have the Incapacitated condition.

Actions

Multiattack. The warden makes two attacks, using Longsword or Heavy Crossbow in any combination. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Heavy Crossbow. Ranged Attack Roll: +2, range 100/400 ft. 11 (2d10) Piercing damage.

Shield Bash. Strength Saving Throw: DC 13, one creature within 5 feet. Failure: The target is pushed up to 5 feet straight away from the warden.

Reactions

Parry. Trigger: The warden is hit by a melee attack roll while holding a weapon. Response: The warden adds 2 to its AC against that attack, possibly causing it to miss.

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

---

## 02. Sworn Sentinel — CR 3

**Input:** `a paladin`
**Donor:** defender-3 -> CR 3
**Signature:** library · **elapsed** 27s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "a paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] class kit: paladin — "a paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Greatsword" -> "Longsword" — a paladin fights with a longsword, not the Knight's; the body's rider folds in (+4)
```

**`[concept] identity:`**, uncut

> The paladin opens by anchoring the field behind a raised shield, daring foes to come to it while its oath-warded plate turns the first blow aside. Every round thereafter it holds the line and punishes any who try to slip past, stepping into the gap with a crushing mace or sword to make the trespasser pay. It does not break or flee when bloodied — it plants its feet, certain that its conviction will outlast blade and nerve alike.

**`[concept] lore:`**, uncut

> A sworn guard who fused with the iron of its own armor over decades of standing watch, it now seeks to find the one line it failed to hold.

**Every attack row**
```
Longsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.
Heavy Crossbow. Ranged Attack Roll: +2, range 100/400 ft. 11 (2d10) Piercing damage.
```

```
Sworn Sentinel

Medium Humanoid, Neutral

AC 18
Initiative +0 (10)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
11
+0
+0
MOD
SAVE
DEX
11
+0
+0
WIS
11
+0
+2
MOD
SAVE
CON
14
+2
+4
CHA
15
+2
+2

Skills Athletics +5, Perception +2

Immunities Frightened

Senses Passive Perception 12

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the sentinel, the sentinel and its allies have Advantage on attack rolls and saving throws, provided the sentinel doesn't have the Incapacitated condition.

Actions

Multiattack. The sentinel makes two attacks, using Longsword or Heavy Crossbow in any combination.

Longsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Heavy Crossbow. Ranged Attack Roll: +2, range 100/400 ft. 11 (2d10) Piercing damage.

Reactions

Parry. Trigger: The sentinel is hit by a melee attack roll while holding a weapon. Response: The sentinel adds 2 to its AC against that attack, possibly causing it to miss.

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

---

## 03. Ashvowed Brannor — CR 3

**Input:** `a paladin`
**Donor:** defender-3 -> CR 3
**Signature:** dropped · **elapsed** 25s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "a paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a paladin") | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "a paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Greatsword" -> "Longsword" — a paladin fights with a longsword, not the Knight's; the body's rider folds in (+4)
[reskin] free row repaired: "Unbroken Stance": "While Brannor has not moved since the start of its last turn, Brannor " -> "While Brannor hasn't used any of its Speed since the end of its last turn, Brannor can't b"
```

**`[concept] identity:`**, uncut

> A sworn shield of the faith, this paladin opens by planting itself between the party and whoever it protects, shield high and blade ready, daring foes to commit. Every round it answers aggression with righteous steel and a flash of searing light, punishing anyone who tries to slip past its reach toward the ward behind it. It does not flee — it holds until bloodied past reason, and even then it retreats only in good order, shield still facing the enemy.

**`[concept] lore:`**, uncut

> Sworn to a temple or a liege and bound by an oath stronger than fear, the paladin stands its ground where lesser soldiers would break, and its patron's light bleeds through every blow it lands.

**Every attack row**
```
Longsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.
Heavy Crossbow. Ranged Attack Roll: +2, range 100/400 ft. 11 (2d10) Piercing damage.
```

```
Ashvowed Brannor

Medium Humanoid, Neutral

AC 18
Initiative +0 (10)

HP 52 (8d8 + 16)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+3
INT
11
+0
+0
MOD
SAVE
DEX
11
+0
+0
WIS
11
+0
+2
MOD
SAVE
CON
14
+2
+4
CHA
15
+2
+2

Skills Athletics +5, Perception +2

Immunities Frightened

Senses Passive Perception 12

Languages Common plus one other language

CR 3 (XP 700; PB +2)

Traits

Unbroken Stance. While Brannor hasn't used any of its Speed since the end of its last turn, Brannor can't be moved against its will, and attack rolls against it gain no Advantage from flanking or from an unseen attacker.

Aura of Authority. While in a 10-foot Emanation originating from Brannor, Brannor and its allies have Advantage on attack rolls and saving throws, provided Brannor doesn't have the Incapacitated condition.

Actions

Multiattack. Brannor makes two attacks, using Longsword or Heavy Crossbow in any combination.

Longsword. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Slashing damage.

Heavy Crossbow. Ranged Attack Roll: +2, range 100/400 ft. 11 (2d10) Piercing damage.

Reactions

Parry. Trigger: Brannor is hit by a melee attack roll while holding a weapon. Response: Brannor adds 2 to its AC against that attack, possibly causing it to miss.

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

---

## 04. Oathbinder — CR 5

**Input:** `a paladin`
**Donor:** defender-5 -> CR 5
**Signature:** dropped · **elapsed** 28s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a paladin") | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
```

**`[concept] identity:`**, uncut

> A sworn champion whose oath is a wall: it plants itself in the center of the line and dares the enemy to come through, shield high and blade low, and punishes the first fool to try by moving past. Every round it holds ground, giving ground only in measured steps, and marks the enemy's strongest striker for a smite the moment it commits. It does not flee bloodied — a paladin's oath outlives its blood — but it will call for the enemy to yield, and will honor a yield it earns.

**`[concept] lore:`**, uncut

> Sworn to a crusading order, this paladin holds a bridge, a door, or a shrine it promised to keep, and will not leave the ground it swore to defend while breath remains in it.

**Every attack row**
```
Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.
```

```
Oathbinder

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+5
WIS
12
+1
+4
MOD
SAVE
CON
16
+3
+6
CHA
15
+2
+2

Skills Athletics +10, Performance +5

Senses Passive Perception 11

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the oathbinder, the oathbinder and its allies have Advantage on attack rolls and saving throws, provided the oathbinder doesn't have the Incapacitated condition.

Actions

Multiattack. The oathbinder makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the oathbinder can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Parry. Trigger: The oathbinder is hit by a melee attack roll while holding a weapon. Response: The oathbinder adds 3 to its AC against that attack, possibly causing it to miss.

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

---

## 05. Iron Vow — CR 5

**Input:** `a paladin`
**Donor:** defender-5 -> CR 5
**Signature:** dropped · **elapsed** 32s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | defender: ✓ ("a paladin") | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] free row repaired: "Blood-Iron Oath": "While the vow is Bloodied, the vow's Aura of Authority becomes a 20-fo" -> "While the vow is Bloodied, the Aura of Authority becomes a 20-foot Emanation, Longsword at"
```

**`[concept] identity:`**, uncut

> A sworn knight in blood-iron plate who plants shield and blade at the front of the line, challenging the strongest foe to single combat while denying every path past. Each round the paladin's oath drives it to lay hands on its own wounds and strike the challenger with a searing oath-branded blow; it will not retreat while its oath stands, fighting to the death and dragging any who flee back into the contest.

**`[concept] lore:`**, uncut

> Sworn to a cause it will not name, the paladin rides the roads as an unbroken oath made flesh, and it seeks the one duel that will finally prove its vow was worth the iron it wears.

**Every attack row**
```
Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.
```

```
Iron Vow

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+5
WIS
12
+1
+4
MOD
SAVE
CON
16
+3
+6
CHA
15
+2
+2

Skills Athletics +10, Performance +5

Resistances Fire

Senses Passive Perception 11

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Blood-Iron Oath. While the vow is Bloodied, the Aura of Authority becomes a 20-foot Emanation, Longsword attacks each deal an extra 9 (2d8) Fire damage, and a creature of the vow's choice that starts its turn in that Emanation has its Speed reduced by 10 feet until the end of the vow's next turn.

Aura of Authority. While in a 10-foot Emanation originating from the vow, the vow and its allies have Advantage on attack rolls and saving throws, provided the vow doesn't have the Incapacitated condition.

Actions

Multiattack. The vow makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the vow can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Parry. Trigger: The vow is hit by a melee attack roll while holding a weapon. Response: The vow adds 3 to its AC against that attack, possibly causing it to miss.

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

---

## 06. Vowbound Thresher — CR 5

**Input:** `a paladin`
**Donor:** defender-5 -> CR 5
**Signature:** dropped · **elapsed** 31s

**Type line:** `Medium Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: a paladin
[path] class_npc — class paladin — "paladin" (call)
[route] defender type=Humanoid mechanics=none — casts: implied by the kind — "a paladin" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-warpriest: ✓ ("a paladin") | caster-warpriest -> defender: the concept's VERB outranks the noun (key "paladin", class verb) | defender: key "paladin" (class verb)
[concept] resolve: archetype=defender type=Humanoid typeFrom=the route call themes=armed/celestial mind=sapient style=— energy=Radiant mix=both identity=✓ lore=✓
[reskin] class kit: paladin — "paladin": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] class weapon: Actions/"Spear" -> "Longsword" — a paladin fights with a longsword, not the Gladiator's
[reskin] free row repaired: "Oath-Forged Seam": "When the thresher takes the Dodge action, the thresher gains Resistanc" -> "When the thresher takes the Dodge action, the thresher gains Resistance to all damage unti"
```

**`[concept] identity:`**, uncut

> A sworn shield of living iron, it plants itself in the breach and opens by naming its challenge aloud, daring the strongest foe to break upon it. Every round it holds that ground — shield high, warhammer low — punishing any enemy that tries to slip past with a ringing blow; under pressure it does not yield or flee, but goes still and serene, letting the enemy exhaust itself against a wall of conviction.

**`[concept] lore:`**, uncut

> These paladins are sworn to a border-shrine and bound in iron by the same oath, sworn to guard a road they may never leave until relieved — or until nothing is left to guard.

**Every attack row**
```
Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.
```

```
Vowbound Thresher

Medium Humanoid, Neutral

AC 16
Initiative +2 (12)

HP 112 (15d8 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+5
WIS
12
+1
+4
MOD
SAVE
CON
16
+3
+6
CHA
15
+2
+2

Skills Athletics +10, Performance +5

Senses Passive Perception 11

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Oath-Forged Seam. When the thresher takes the Dodge action, the thresher gains Resistance to all damage until the start of its next turn.

Aura of Authority. While in a 10-foot Emanation originating from the thresher, the thresher and its allies have Advantage on attack rolls and saving throws, provided the thresher doesn't have the Incapacitated condition.

Actions

Multiattack. The thresher makes three Longsword attacks. It can replace one attack with a use of Shield Bash.

Longsword. Melee Attack Roll: +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.

Shield Bash. Strength Saving Throw: DC 15, one creature within 5 feet that the thresher can see. Failure: 9 (2d4 + 4) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Prone condition.

Reactions

Parry. Trigger: The thresher is hit by a melee attack roll while holding a weapon. Response: The thresher adds 3 to its AC against that attack, possibly causing it to miss.

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


# Pass 2 — the ship gate eight

**All eight generated.** 1 FAIL of 8 — the Headless Horseman's saber taking +9 from DEX on a row
that rolls STR, which the frozen ship gate already carried and which no fix this round touches.

`smoke-out/ship-eight-2026-11-16T04-47-40`

---

## 01. Headless Horseman — CR 11

**Input:** `name: Headless Horseman | `
**Donor:** skirmisher-8-mounted -> CR 11 (invented — no printed peer)
**Signature:** library · **elapsed** 33s

**Type line:** `Medium Undead, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Headless Horseman — The Horseman rides down the road at a canter that never quite becomes a gallop, hurling its severed head ahead of it to burst against a traveler's chest in a spray of grave-cold and howling dread while the body closes the distance behind. Each round it presses the hunt — tramplin
[concept] expansion answered: type=Undead (type_source=inferred) material=grave size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: thrown-weapon
[path] homebrew — "Headless Horseman" (call)
[route] skirmisher-mounted type=Undead mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-mounted: ✓ ("The Horseman rides down the road at a ca") | skirmisher-mounted: key "rides" (class verb)
[concept] resolve: archetype=skirmisher type=Undead typeFrom=the route call themes=grave/terror mind=sapient style=mounted energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier held: WIS stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier: CHA 10 -> 20 — the call read this creature as formidable at CR 11
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> The Horseman rides down the road at a canter that never quite becomes a gallop, hurling its severed head ahead of it to burst against a traveler's chest in a spray of grave-cold and howling dread while the body closes the distance behind. Each round it presses the hunt — trampling, saber-work, and the head flung again from wherever it rolls — and it dreads nothing in this world, fighting to the death unless whatever pact binds it is broken. It toys with prey it has marked, letting them run just far enough to believe they've escaped before the hoofbeats start again.

**`[concept] lore:`**, uncut

> A rider who swore to cross a haunted bridge before dawn and failed, its soul is bound to that road, doomed to hunt riders and travelers until a living horse outruns it to the far bank.

**Every attack row**
```
Saber. Melee Attack Roll: +9, reach 5 ft. 23 (4d8 + 5) Slashing damage. If the headless horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) Slashing damage and, if it is Large or smaller, has the Prone condition.
Severed Head. Ranged Attack Roll: +9, range 20/60 ft. 18 (3d8 + 5) Necrotic damage.
```

```
Headless Horseman

Medium Undead, Neutral

AC 17
Initiative +5 (15)

HP 180 (24d8 + 72)

Speed 50 ft.

MOD
SAVE
STR
16
+3
+3
INT
10
+0
+0
MOD
SAVE
DEX
20
+5
+9
WIS
14
+2
+6
MOD
SAVE
CON
17
+3
+3
CHA
20
+5
+5

Skills Perception +6, Stealth +9

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus the languages it knew in life

CR 11 (XP 7,200; PB +4)

Traits

Roadrun. The headless horseman ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Sight Weakness. The headless horseman has Disadvantage on Wisdom (Perception) checks that rely on sight.

Actions

Multiattack. The headless horseman makes three attacks, using Saber or Severed Head in any combination. It can replace one attack with a use of Grave-Cold Shroud.

Saber. Melee Attack Roll: +9, reach 5 ft. 23 (4d8 + 5) Slashing damage. If the headless horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) Slashing damage and, if it is Large or smaller, has the Prone condition.

Severed Head. Ranged Attack Roll: +9, range 20/60 ft. 18 (3d8 + 5) Necrotic damage.

Hoofcharge (Recharge 5-6). The headless horseman moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Large or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Dexterity Saving Throw: DC 17. Failure: 66 (12d10) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Grave-Cold Shroud. Charisma Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: The target has the Frightened condition until the end of its next turn.

Bonus Actions

Mounted Agility. The headless horseman takes the Dash or Disengage action.

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

---

## 02. Pumpkin King — CR 10

**Input:** `name: Pumpkin King | `
**Donor:** brute-9-juggernaut -> CR 10
**Signature:** library · **elapsed** 28s

**Type line:** `Large Plant, Neutral Evil` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Pumpkin King — The Pumpkin King opens combat by hurling a searing, face-carved pumpkin like a grenade, scattering burning seeds and slewing fear through the ranks. Every round after, it strides through its own harvest of fire, slashing with a jagged blade of hardened gourd and igniting any who dare
[concept] expansion answered: type=Plant (type_source=inferred) material=rot size=Large mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: engulf
[path] homebrew — title King — "Pumpkin King" (call)
[route] brute-juggernaut type=Plant mechanics=aura — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-juggernaut: ✓ ("its body is rot — mixed — engulf") | brute-grappler: the call read "engulf" as not meaning that mechanic here — no override | brute-juggernaut stands: every key that would override it was read as a figure of speech | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Plant typeFrom=the route call themes=terror/verdant mind=sapient style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[reskin] mind tier held: WIS stays 10 against "ordinary" — the card's 10 is already ordinary
[reskin] mind tier: INT 6 -> 15 — the call read this creature as capable at CR 10
[reskin] mind tier: CHA 4 -> 20 — the call read this creature as formidable at CR 10
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Grinning Gourd Blaze": "*Wisdom Saving Throw:* DC 17, one creature within 60 feet. *Failure:* " -> "*Wisdom Saving Throw*: DC 17, one creature within 60 feet. *Failure:* 28 (8d6) Fire damage"
```

**`[concept] identity:`**, uncut

> The Pumpkin King opens combat by hurling a searing, face-carved pumpkin like a grenade, scattering burning seeds and slewing fear through the ranks. Every round after, it strides through its own harvest of fire, slashing with a jagged blade of hardened gourd and igniting any who dare close, its grinning face a beacon of ruin. Under pressure it does not flee — it toys with the survivors, choosing the boldest to burn last, savoring the harvest of terror as much as the kill.

**`[concept] lore:`**, uncut

> Born from a cursed harvest festival where the last pumpkin was offered to a dying hearth-god, the Pumpkin King rises each autumn to reap what was sown in fear and claim the souls of those who mock the old rites.

**Every attack row**
```
Gourd Blade. Melee Attack Roll: +9, reach 5 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Fire damage.
```

```
Pumpkin King

Large Plant, Neutral Evil

AC 15
Initiative -1 (9)

HP 178 (21d10 + 63)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+9
INT
15
+2
+2
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
17
+3
+7
CHA
20
+5
+5

Skills Athletics +9, Perception +4

Immunities Fire

Senses Passive Perception 14

Languages Common

CR 10 (XP 5,900; PB +4)

Traits

Fire Absorption. Whenever the pumpkin king is subjected to Fire damage, it takes no damage and instead regains a number of Hit Points equal to the Fire damage dealt.

Siege Monster. The pumpkin king deals double damage to objects and structures.

Actions

Multiattack. The pumpkin king makes two Gourd Blade attacks. It can replace one attack with a use of Grinning Gourd Blaze.

Gourd Blade. Melee Attack Roll: +9, reach 5 ft. 14 (2d8 + 5) Slashing damage plus 10 (3d6) Fire damage.

Harvest Flame (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Cone. Failure: 60 (11d10) Fire damage. Success: Half damage only.

Grinning Gourd Blaze. Wisdom Saving Throw: DC 17, one creature within 60 feet. Failure: 28 (8d6) Fire damage, and the target has the Frightened condition until the end of its next turn.

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

---

## 03. Knife Ball — CR 5

**Input:** `name: Knife Ball | `
**Donor:** skirmisher-8-hurler -> CR 5 (invented — no printed peer)
**Signature:** library · **elapsed** 32s

**Type line:** `Medium Construct, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: Knife Ball — A Knife Ball is an animated knot of blades that rolls into the fight and unfolds into a whirling storm of edge, flinging knives as it closes and raking any prey that stays near. Every round it chooses between spinning through clustered foes and hurling blades at those who retreat, harry
[concept] expansion answered: type=Construct (type_source=inferred) material=iron size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: thrown-weapon
[path] homebrew — "Knife Ball" (call)
[route] skirmisher-hurler type=Construct mechanics=thrown-weapon — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | skirmisher-hurler: ✓ ("flinging knives as it closes") | skirmisher-hurler: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Construct typeFrom=the route call themes=armed/forged mind=sapient style=hurler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: WIS stays 14 against "ordinary" — the card's save DC 13 derives from WIS 14 and from no physical score
[reskin] mind tier: INT 10 -> 6 — the call read this creature as feeble at CR 5
[reskin] mind tier: CHA 10 -> 6 — the call read this creature as feeble at CR 5
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] multiattack re-read — "Knife" left; "Multiattack" now reads "The knife ball makes three Knives attacks."
[reskin] multiattack re-read — "Dead Pile Lunge" joins the combination; "The knife ball makes three attacks, using Knives or Dead Pile Lunge in any combination."
```

**`[concept] identity:`**, uncut

> A Knife Ball is an animated knot of blades that rolls into the fight and unfolds into a whirling storm of edge, flinging knives as it closes and raking any prey that stays near. Every round it chooses between spinning through clustered foes and hurling blades at those who retreat, harrying rather than committing. Under pressure it plays dead, collapsing into a still pile of cutlery to ambush whoever comes to loot or finish it — a coward's cunning, not a duelist's pride.

**`[concept] lore:`**, uncut

> A Knife Ball is what remains when a cutler's warehouse of unfinished blades is bound by a spiteful animating ritual: it rolls the roads looking for warm hands to take up its knives, and takes them apart when they refuse.

**Every attack row**
```
Knives. Melee Attack Roll: +6, reach 5 ft. 10 (3d4 + 3) Piercing damage.
Dead Pile Lunge. The knife ball hurls a knife. Ranged Attack Roll: +6, range 20/60 ft. 10 (2d6 + 3) Piercing damage. The weapon lands in an unoccupied space within 5 feet of the target; until the knife ball spends 5 feet of movement in that space to recover it, the knife ball's Speed is halved and it can't use this action.
```

```
Knife Ball

Medium Construct, Neutral

AC 16
Initiative +3 (13)

HP 90 (12d8 + 36)

Speed 50 ft.

MOD
SAVE
STR
18
+4
+4
INT
6
-2
-2
MOD
SAVE
DEX
16
+3
+6
WIS
14
+2
+5
MOD
SAVE
CON
16
+3
+3
CHA
6
-2
-2

Skills Perception +5, Stealth +6

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Unfettered Roll. The knife ball ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The knife ball makes three attacks, using Knives or Dead Pile Lunge in any combination.

Knives. Melee Attack Roll: +6, reach 5 ft. 10 (3d4 + 3) Piercing damage.

Knife Burst (Recharge 5-6). The knife ball hurls a knife at a point it can see within 90 feet. Dexterity Saving Throw: DC 13, each creature in a 5-foot-radius Sphere centered on that point. Failure: 31 (9d6) Slashing damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Dead Pile Lunge. The knife ball hurls a knife. Ranged Attack Roll: +6, range 20/60 ft. 10 (2d6 + 3) Piercing damage. The weapon lands in an unoccupied space within 5 feet of the target; until the knife ball spends 5 feet of movement in that space to recover it, the knife ball's Speed is halved and it can't use this action.

Bonus Actions

Fleet Agility. The knife ball takes the Dash or Disengage action.

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

---

## 04. Goblin Wizard — CR 3

**Input:** `goblin wizard`
**Donor:** skirmisher-3 -> CR 3
**Signature:** dropped · **elapsed** 32s

**Type line:** `Small Humanoid, Chaotic Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: goblin wizard
[path] filled: the head clause names the Goblin Warrior, a people — a mage who is visibly one stands on its printed body (owner's ruling, 2026-11-15)
[path] filled: the head clause names the mage's "wizard" and the call named no class — a Goblin Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Goblin Warrior (is) — class mage — "wizard" (call)
[route] caster (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "goblin wizard" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("goblin wizard") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=arcane/subterranean mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 3 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Goblin Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "wizard": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] class weapon: Actions/"Scimitar" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Goblin Warrior's
```

**`[concept] identity:`**, uncut

> A goblin wizard opens from cover at range, hurling arcane bolts and a small, nasty spell list while chittering orders to anyone foolish enough to stand near it; every round after that it repositions to keep a body between itself and the fight, spending its weakest magic first and saving its one real spell for a cornered moment. Under pressure it bolts for the nearest bolt-hole rather than duel, and only turns to fight to the death when flight is cut off and its back is to the wall.

**`[concept] lore:`**, uncut

> Goblin wizards are the rare runty outcasts who survived a tribe's mockery by finding a spellbook on a dead adventurer, and they use every trick they learn to stay alive in a world that would happily eat them.

**The Spellcasting row, in full**
```
Spellcasting. The goblin wizard casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.
```

```
Goblin Wizard

Small Humanoid, Chaotic Neutral

AC 15
Initiative +3 (13)

HP 59 (17d6)

Speed 30 ft.

MOD
SAVE
STR
8
-1
-1
INT
14
+2
+2
MOD
SAVE
DEX
16
+3
+5
WIS
8
-1
-1
MOD
SAVE
CON
10
+0
+0
CHA
8
-1
-1

Skills Perception +1, Stealth +5

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Goblin

CR 3 (XP 700; PB +2)

Traits

Shadow-Wrapped. While in Dim Light or Darkness, the goblin wizard can take the Hide action even when only lightly obscured, and a creature that tries to pinpoint it by its shadow does so with Disadvantage.

Actions

Multiattack. The goblin wizard makes two attacks, using Quarterstaff or Shortbow in any combination.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Shortbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Spellcasting. The goblin wizard casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Bonus Actions

Nimble Escape. The goblin wizard takes the Disengage or Hide action.

Reactions

Protective Magic (3/Day). The goblin wizard casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

---

## 05. Skitterbolt Sorcerer — CR 2

**Input:** `kobold sorcerer`
**Donor:** skirmisher-1 -> CR 2
**Signature:** library · **elapsed** 28s

**Type line:** `Small Humanoid, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin but a print creature — keeping route-first: kobold sorcerer
[path] refused: species "kobold" has no kit
[path] filled: species "kobold" has no kit, but print carries it as Kobold Warrior — the body stands so the people is not erased
[path] filled: the head clause names the mage's "sorcerer" and the call named no class — a Kobold Warrior who is one stands on its own body with the class on top (owner's ruling, 2026-11-15)
[path] class_npc — Kobold Warrior (is) — class mage — "sorcerer" (call)
[route] caster (artillery) type=Humanoid mechanics=none — casts: implied by the kind — "kobold sorcerer" | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster: ✓ ("kobold sorcerer") | caster: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Humanoid typeFrom=the route call themes=draconic/arcane mind=sapient style=— energy=Lightning mix=energy identity=✓ lore=✓
[reskin] class kit: lent list trimmed — the Mage's list is written for CR 6 and this sheet is CR 2 — the gated spells go and the At Will line stays (item 7's rule, reused)
[reskin] class kit: Spellcasting lent by the Mage — this sheet stands on the Kobold Warrior, a body that carries no spellcasting, and a mage without it is not a mage
[reskin] class kit: mage — "sorcerer": Protective Magic (3/Day) (Mage/Protective Magic)
[reskin] multiattack re-read — "Crackling Bolt" left; "Multiattack" now reads "The sorcerer makes two Dagger attacks."
[reskin] class weapon: Actions/"Dagger" -> "Quarterstaff" — a mage fights with a quarterstaff, not the Kobold Warrior's
```

**`[concept] identity:`**, uncut

> A kobold sorcerer opens by scuttling to cover and hurling a crackling bolt of raw sorcerous power at the biggest threat it can see, shrieking to its kin all the while. Each round after it stays at range, alternating probing cantrips with one or two flashy blasts that hit harder than its small frame should allow, always keeping a bolt-hole or an exit between itself and the front line. Once bloodied it would rather flee and boast later than die — but cornered, it empties everything it has in a spiteful, screaming last stand.

**`[concept] lore:`**, uncut

> Born in the warrens beneath a dragon's shadow, a kobold sorcerer's magic is a scrap of its patron's blood awakened in a scaly little body, and it wants nothing more than to be noticed by something greater than itself.

**The Spellcasting row, in full**
```
Spellcasting. The sorcerer casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):
- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
```

**Every attack row**
```
Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.
```

```
Skitterbolt Sorcerer

Small Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 45 (18d6 - 18)

Speed 30 ft.

MOD
SAVE
STR
7
-2
-2
INT
14
+2
+2
MOD
SAVE
DEX
16
+3
+5
WIS
7
-2
-2
MOD
SAVE
CON
9
-1
-1
CHA
8
-1
-1

Skills Perception +0, Stealth +5

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Draconic

CR 2 (XP 450; PB +2)

Traits

Pack Tactics. The sorcerer has Advantage on an attack roll against a creature if at least one of the sorcerer's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the sorcerer has Disadvantage on ability checks and attack rolls.

Actions

Multiattack. The sorcerer makes two Quarterstaff attacks. It can replace one attack with a use of Shocking Bolt.

Quarterstaff. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.

Spellcasting. The sorcerer casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 12):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation

Shocking Bolt. Dexterity Saving Throw: DC 12, one creature within 30 feet. Failure: 7 (2d6) Lightning damage.

Reactions

Protective Magic (3/Day). The sorcerer casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

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

---

## 06. Overdue Scribe — CR 3

**Input:** `mummy librarian`
**Donor:** caster-8-binder -> CR 3
**Signature:** library · **elapsed** 27s

**Type line:** `Medium Undead, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: mummy librarian — A mummy librarian opens a fight by shuffling forward with the patience of a shelving cart, hurling cursed volumes like flung bricks and reading a ward aloud to bind a trespasser in dried, sealing book-wax. Every round after that it catalogues and punishes: it recites a passage that
[concept] expansion answered: type=Undead (type_source=user) material=grave size=Medium mind=sapient
[concept] expansion attack mode: mixed
[concept] expansion signature: snare
[path] homebrew — Mummy (resembles) — "mummy librarian" (call)
[route] caster-binder (controller) type=Undead mechanics=snare, thrown-weapon — casts refused: the call answered yes but quoted "reading a ward aloud", which is not in the GM's words — the word table decides | hold_shape refused: the call answered medium but quoted "bind a trespasser in dried, se", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | caster-binder: ✓ ("reading a ward aloud to bind a trespasse") | caster-binder: no line key in the words — the model's read of its quote
[concept] resolve: archetype=caster type=Undead typeFrom=the route call themes=grave/arcane mind=sapient style=binder energy=Necrotic mix=both identity=✓ lore=✓
[reskin] mind tier held: INT stays 14 against "capable" — the card's 14 is already capable
[reskin] mind tier held: WIS stays 15 against "capable" — the card's 15 is already capable
[reskin] mind tier held: CHA stays 16 against "ordinary" — CHA is the attacking score
[reskin] class kit: none — the homebrew path takes no class kit
```

**`[concept] identity:`**, uncut

> A mummy librarian opens a fight by shuffling forward with the patience of a shelving cart, hurling cursed volumes like flung bricks and reading a ward aloud to bind a trespasser in dried, sealing book-wax. Every round after that it catalogues and punishes: it recites a passage that makes the air remember rot, and it reseals the room's doorways with its own grave-linen. Under pressure it does not flee — it backs into the stacks it has spent centuries guarding and fights to the death of its binding, because a stolen page outlives any intruder.

**`[concept] lore:`**, uncut

> Bound at its death to catalogue a library that no patron should ever reach, this dried scribe still shelves, still stamps, and still collects overdue books — by taking the borrower.

**The Spellcasting row, in full**
```
Spellcasting. The overdue scribe casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 13):
- At Will: Detect Magic, Mage Hand
- 1/Day Each: Hold Person, Bestow Curse
```

**Every attack row**
```
Papercut. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Slashing damage plus 5 (1d10) Necrotic damage.
Ledger Bolt. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Necrotic damage.
```

```
Overdue Scribe

Medium Undead, Neutral

AC 14
Initiative +2 (12)

HP 55 (10d8 + 10)

Speed 30 ft.

MOD
SAVE
STR
14
+2
+2
INT
14
+2
+2
MOD
SAVE
DEX
15
+2
+2
WIS
15
+2
+4
MOD
SAVE
CON
13
+1
+1
CHA
16
+3
+5

Skills Perception +4, Deception +5

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 14

Languages Common plus the languages it knew in life

CR 3 (XP 700; PB +2)

Traits

Sealing Wraps. If the target is a creature and doesn't already have a grave-linen wound, it is subjected to the following effect. Constitution Saving Throw: DC 12. Failure: The target receives a grave-linen wound. While wounded, the target loses 5 (1d10) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 12 Wisdom (Medicine) check.

Actions

Multiattack. The overdue scribe makes two attacks, using Papercut or Ledger Bolt in any combination. It can replace one attack with a use of Rotting Recital.

Papercut. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Slashing damage plus 5 (1d10) Necrotic damage.

Ledger Bolt. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Necrotic damage.

Rotting Recital. Constitution Saving Throw: DC 12, one creature within 60 feet. Failure: 11 (2d10) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The overdue scribe casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 13):

- At Will: Detect Magic, Mage Hand
- 1/Day Each: Hold Person, Bestow Curse

Grave-Linen Seal (Recharge 5-6). Dexterity Saving Throw: DC 12, one Large or smaller creature the overdue scribe can see within 60 feet. Failure: The target is caught in wrappings and has the Restrained condition until the wrappings is destroyed (AC 10; HP 10; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).

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

---

## 07. Coinpurse Croaker — CR 2

**Input:** `a silver-tongued toad the size of a pony`
**Donor:** brute-2 -> CR 2
**Signature:** library · **elapsed** 28s

**Type line:** `Medium Monstrosity, Neutral` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[path] homebrew — "a silver-tongued toad the size of a pony" (call)
[route] brute type=Beast mechanics=grapple — casts: the call reads no worked magic here | hold_shape: none — the call reads no hold in these words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("a silver-tongued toad the size of a pony") | brute-grappler: no line key in the words — the model's read of its quote | brute-grappler -> brute: a grappler is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=grasping/voice mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier: INT 6 -> 10 — the call read this creature as ordinary at CR 2
[reskin] mind tier: WIS 8 -> 15 — the call read this creature as capable at CR 2
[reskin] mind tier: CHA 6 -> 18 — the call read this creature as formidable at CR 2
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Coin-Jingling Lure (Recharge 5-6)": "*Wisdom Saving Throw*: DC 12, each creature in a 30-foot Emanation ori" -> "*Wisdom Saving Throw*: DC 12, each creature in a 30-foot Emanation originating from the cr"
```

**`[concept] identity:`**, uncut

> It opens with a hypnotic croak and a lightning-fast sticky tongue that yanks a target off its feet and reels it in like a hooked fish. Every round after that it plants its bulk, swallows the grappled victim whole, and bullies the rest with a one-two of bludgeoning hops and a silver tongue that lashes out as a whip. It is a patient ambush predator that toys with prey while its throat works — but once bloodied it disgorges its meal and bounds away, croaking silver threats back over its shoulder.

**`[concept] lore:`**, uncut

> Hatched in a flooded silver mine after a vein of living ore pooled in a stagnant sump, the silver-tongued toad croaks in a voice that sounds like coins in a purse and lures travelers to the water's edge to be swallowed alive.

**Every attack row**
```
Tongue Lash. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.
```

```
Coinpurse Croaker

Medium Monstrosity, Neutral

AC 12
Initiative -1 (9)

HP 52 (8d8 + 16)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
16
+3
+5
INT
10
+0
+0
MOD
SAVE
DEX
8
-1
-1
WIS
15
+2
+2
MOD
SAVE
CON
15
+2
+2
CHA
18
+4
+4

Skills Athletics +5, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 2 (XP 450; PB +2)

Actions

Tongue Lash. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.

Coin-Jingling Lure (Recharge 5-6). Wisdom Saving Throw: DC 12, each creature in a 30-foot Emanation originating from the croaker. Failure: The target has the Charmed condition until the end of its next turn.

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

---

## 08. Deepchannel Pike — CR 3

**Input:** `a giant river pike`
**Donor:** brute-5-grappler -> CR 3
**Signature:** library · **elapsed** 28s

**Type line:** `Huge Monstrosity, Unaligned` — **set by** the route call

**`[path]`, `[route]` and the lines that decided it**
```
[concept] thin concept expanded before routing: a giant river pike — The giant river pike holds station in the current, nearly invisible against the riverbed, then lunges on a surge of water to seize prey in its tooth-lined jaws and thrash it toward deeper water. Each round it strikes from an unexpected angle, dragging anything it latches onto a
[concept] expansion answered: type=Beast (type_source=inferred) material=hide size=Large mind=sapient
[concept] expansion attack mode: melee
[concept] expansion signature: grapple
[path] homebrew — "a giant river pike" (call)
[route] brute-grappler type=Beast mechanics=grapple, engulf — casts: the call reads no worked magic here | hold_shape refused: the call answered grip but quoted "seize prey in its tooth-lined ", which is not in the GM's words | shoots: the call reads none in these words | is_a_swarm: the call reads none in these words | brute-grappler: ✓ ("seize prey in its tooth-lined jaws and t") | brute-grappler: key "seize" (class verb)
[concept] resolve: archetype=brute type=Beast typeFrom=the route call themes=bestial/aquatic mind=sapient style=grappler energy=— mix=physical identity=✓ lore=✓
[reskin] mind tier held: INT stays 4 against "feeble" — the card's 4 is already feeble
[reskin] mind tier: WIS 10 -> 15 — the call read this creature as capable at CR 3
[reskin] mind tier: CHA 4 -> 10 — the call read this creature as ordinary at CR 3
[reskin] class kit: none — the homebrew path takes no class kit
[reskin] free row repaired: "Riptide Ambush": "*Strength Saving Throw*: DC 12, each creature in a 15-foot Cone. *Fail" -> "*Strength Saving Throw*: DC 12, each creature in a 15-foot Cone. *Failure:* The target has"
```

**`[concept] identity:`**, uncut

> The giant river pike holds station in the current, nearly invisible against the riverbed, then lunges on a surge of water to seize prey in its tooth-lined jaws and thrash it toward deeper water. Each round it strikes from an unexpected angle, dragging anything it latches onto a length toward the channel, breaking off and circling only once its hunger is bloodied. It is an ambusher by temperament: it does not toy with prey, and it flees upriver only when struck hard and outmatched.

**`[concept] lore:`**, uncut

> A pike grown monstrous over a century in the slow, deep stretch of a river, it holds its hunting ground against all comers and eats whatever the current delivers.

**Every attack row**
```
Jaws. Melee Attack Roll: +6, reach 10 ft. 13 (2d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.
```

```
Deepchannel Pike

Huge Monstrosity, Unaligned

AC 13
Initiative -1 (9)

HP 66 (7d12 + 21)

Speed 30 ft., Swim 30 ft.

MOD
SAVE
STR
18
+4
+6
INT
4
-3
-3
MOD
SAVE
DEX
8
-1
-1
WIS
15
+2
+2
MOD
SAVE
CON
16
+3
+3
CHA
10
+0
+0

Skills Athletics +6, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages None

CR 3 (XP 700; PB +2)

Actions

Multiattack. The pike makes two Jaws attacks. It can replace one attack with a use of Riptide Ambush.

Jaws. Melee Attack Roll: +6, reach 10 ft. 13 (2d8 + 4) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.

Riptide Ambush. Strength Saving Throw: DC 12, each creature in a 15-foot Cone. Failure: The target has the Prone condition.

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
