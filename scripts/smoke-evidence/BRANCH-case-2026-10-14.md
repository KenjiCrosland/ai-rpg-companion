# The case for the critic — species rounds five to seven, the re-roll, the class kit (2026-10-14)

Everything in this branch landed after the last release and none of it has been
read by a critic. Three things to know before the blocks.

## 1. The measurement method changed, on the owner's call

The owner, today: the per-branch smoke "should always only test the features
we've developed since the last release… the generation is taking a lot of
needless time." So there is no fixed twelve in this run and no replay of the
species batch. Two batches were built for this branch and will die with it:

| batch | blocks | what each entry is for |
| --- | --- | --- |
| `classes-eight` | 16 | the eight classes, the print lifts, the five authored rows, the negative cases, two re-rolls |
| `branch-rounds` | 10 | the inline inversion, holds one/two/four, the species facts, the three repeat offenders, the mastery DC, one re-roll |
| canaries | 10 | the numbers reference, unchanged |

36 blocks where the old reading would have run 57. Every entry carries a `mech`
field naming the behaviour it exists to check, so a block that passes its gates
but misses its behaviour is still a miss.

## 2. The per-entry re-roll can now appear in a critic doc at all

Users said the re-roll "seems incredibly random as though it doesn't take the
whole creature into consideration." It was: the call saw the monster's name, its
CR, and the NAMES of its other entries — not the concept, not the header, not one
word of any sibling's rules, and no catalog. It is now catalog-first in one call,
with the whole creature in view (`REROLL-case-2026-10-13.md`).

But the re-roll is a card button, so no harness could show it. The smoke runner
now re-rolls a named entry and prints before, after, and provenance. **That paid
for itself on the first live block**: see §4.

## 3. What the blocks are expected to show

Nine of the ten `branch-rounds` behaviours are visible on the sheets:

| block | the behaviour, as it reads on the sheet |
| --- | --- |
| Bloodmaw Orc | the GM's Greataxe took the chassis slot; **no Shell Defense** from "retreats behind iron armor" |
| Sir Reginald | 2014 Multiattack reads "using Greatsword or Crossbow", never "one with … and one with" — flagged three times, now fixed |
| Sir Reginald | the phobia names **live chickens**, not "the thing it fears" |
| Coral Vurthax | the trident's Topple is **DC 15** = 8 + STR 4 + PB 3, and the derivation gate now reads mastery DCs |
| Yewshrine Warden | Shell Defense with **no speed-discord finding** — flagged three times, now fixed |
| Thornpiper Reveler | a **Fey** species gets its language: Common, Sylvan |
| Gloamripper | "lurks in shadow and steps away" buys **no teleport** |
| Stormwrought Oathkeeper | `inline declared: "the oathkeeper" — the call's own answer; the rules would have said "Stormwrought"` |
| Stormwrought Oathkeeper | a **stomp** deals Bludgeoning and **venom** deals Poison, never the weapon's type |
| Meshrin | the Name field speaks as **Meshrin**, never "the meshrin" |

The tenth, the cold-wyrm swallow interior, is **not exercised**: that roll took a
Bite-and-Breath line rather than the engulf line, so no Swallow row exists to
inspect. Every damage type on that sheet is Cold. The fix is pinned in tests only.

The class traces read as designed across all sixteen: the monk's Stunning Strike
rode a part row the GM's own words named ("Open Hand"); an **imp** rogue got
Cunning Action, which is eligibility by mind rather than type; "knight-errant"
resolved to paladin over fighter; and the dire wolf and the ninja drew no class
line at all, which is the bestial refusal and the implied-class rule.

## 4. What the live blocks found that no unit test had reached

Five defects, all fixed in this branch, each with its receipt:

1. **The re-roll re-picked the template it was replacing.** Re-rolling a rogue's
   Assassinate returned `assassinate` again under a new name. The same-name check
   catches a repeated name, never a repeated mechanic. The replaced row's template
   now leaves the menu. After: Assassinate → "Bloodhound Pursuit" from
   `faultless-tracker`.
2. **A trait was climbing the value ladder**, which appended a save row's
   "Success: Half damage only" to a trait and shipped a dangling `*Success:* H`.
   The signature path has always exempted traits and riders; the re-roll now does.
3. **A rewrite re-diced the row it was only rewording.** An Oathblade rewrite came
   back 25 (6d6 + 4) where the row read 26 (5d8 + 4): the skeletons hand the model
   the budget for a NEW row. A row being reworded keeps its own numbers.
4. **`entryRows` dropped the catalog provenance** it reads off a saved sheet, so
   the exclusion in (1) had nothing to match on. Found by writing the pin for (1).
5. **A re-roll probe aimed at Multiattack** told us nothing, because that name is
   structural and protected, so the call rewrote text under the same name. Both
   batches now exclude Multiattack and Spellcasting from a re-roll probe.

## 5. For the critic's eye — not fixed, deliberately

- **The cleric's lifts depend on a routing decision upstream.** Divine Aid was
  refused on both priest blocks because neither sheet got a Spellcasting row: the
  route gave "a templar priest of the dawn who blesses her soldiers" a non-caster
  body. The guard is right (print's row says "using the same spellcasting ability
  as Spellcasting"), but a GM who types "priest" and gets no magic gets no cleric
  features either.
- **Free text can still invent an unpriced extra attack.** The Oathblade rewrite
  added "On a hit or miss, the oathkeeper can spit venom at the same target using
  Venom Spit" — a free extra attack on every hit AND miss, referencing a real row,
  which passed the lint. The catalog path cannot do this; the free-text floor can.
  Constraining it is a judgement about how tight to make the floor.
- **A rider weld capitalises mid-sentence.** Meshrin reads "When Meshrin hits a
  creature with its Hooked Chain, If the target is a Large or smaller creature…".
- **One dangling reference, soft:** the Rime-Scaled Wyrm's Multiattack uses
  "Gorge", which is not a row on that sheet.
- **`ko-at-will` on the monk's Open Hand is expected.** The checker's own words:
  "Stunned at will, single target with a repeat save or a one-turn cap (the
  Ghoul's shape)". My frame is print's Ghoul exactly — single target, one-turn
  cap, once per turn. Soft, informational, not a defect.

## 6. Gates

```
classes-eight   16/16 blocks, 0 FAIL, 3 soft, coverage 90% (2 of 20 clauses), concept share 64%
branch-rounds   10/10 blocks, 0 FAIL, 2 soft, coverage 100% (0 of 13 clauses), concept share 69%
soft rules seen band ×4, ko-at-will ×2, multiattack-integrity ×2, reach ×2
full suite      185 suites, 5,300+ tests; npm run build clean
```

The forty is not in this run: it is the close-out gate and this branch is not at
close-out. The species nineteen is not in this run either — it measured the last
release's feature, and re-running it is the waste the owner named.

---

# Addendum — answering the branch read (2026-10-14)

## The two send items

**The 2014 file** is `BRANCH-for-critic-2014-2026-10-14.md`, built in the same
pass and never sent. It carries Sir Reginald, Gloamripper, Sergeant Aldric Vane
and Thurivald, so the two unconfirmed branch behaviours and Aldric Vane's 0/1
clause can be read.

**The re-roll output** was written per block by the runner but `review-batch.mjs`
carried only the card and the gate table, so it never reached the doc. Fixed: the
review now carries the re-roll block and the class-kit and species-kit trace
lines. Both files are rebuilt with it.

## Your question on hold 6: the rules landed; the exemptions swallowed every case

Not one of the five is the rule failing to fire. Each falls in a different place:

| sheet | why nothing fired |
| --- | --- |
| Crookbound Herdmaster "Thunderbolt" | **two** exemptions: its head noun "bolt" is thrown-capable, and it deals Thunder, which `hybrid-needs-thrown` exempts as print's Arcane Burst idiom |
| Bloodmaw Orc "Hurlaxe" at 60/240 | a **pure ranged** row, so the hybrid rule never applies. The defect is the range: the weapon table keys on exact weapon names and "Hurlaxe" is not one |
| Yewshrine Warden "Shell Spikes" 30/120 | also pure ranged. The defect is that a tortle has a ranged row at all, which is the ranged-row shed, not this rule |
| Iron Templar Radiant Flame orphaned | `attack-in-multiattack` **exempts print's own rows** ("print composes its own card"). On a sheet where we removed Spellcasting, print's composition is already broken, so that exemption is wrong there |
| Oathbroken Vigil "Shield" as an attack | a part extracted from the **verb** in "shields the weak". Part extraction, not composition |

So three belong to other rules and two exemptions are too broad. The energy
exemption should require a caster (print's hybrid energy row is the Mage's), and
print's exemption should not apply once a lack has removed one of print's rows.

## Fixed from this read, each verified

1. **Hold 2, the rider printed twice.** Mine. The class kit welds a rider to its
   host row, where it has no row name, so the signature's own fit picked the same
   template off the menu and welded it again. A **feature on a row now counts as
   owned**. Rruzhk re-run: one copy.
2. **Hold 1, the creature noun.** A creature word that names a print monster now
   outranks a class alias, and the class kit layers onto that body. "An imp rogue
   who picks locks for a devil" is now a Small Fiend, Fly 40 ft. (hover), Magic
   Resistance, print's Sting with Poison, Shape-Shift, Invisibility, Common and
   Infernal — **with Cunning Action layered on**. A bare class word still names
   print's NPC block (rogue → Spy, cleric → Priest).
3. **Hold 1, multi-word print names.** "A dire wolf that hunts in a pack" now
   resolves to the Dire Wolf. A Beast *head noun* in a long concept still keeps
   its seats, so "a wolf that eats the stars" is unchanged.
4. **Hold 7, the swallow interior.** You were right that it was exercised and I
   was wrong to say it wasn't. The chassis fix from round seven never touched the
   `swallow` **shape**, whose frame hardcodes Acid. A gullet now takes the
   creature's energy, and print's Acid stands only where no energy is declared.
5. **"Gorge" was a predicate bug**, as you said. The Multiattack predicate split
   its list on "and". It now consumes the longest known row name first, so a row
   named "Gorge and Glut" reads as one row.

New predicates: `interior-energy` (a gullet that digests in a type the creature
does not deal) and the owned-by-feature rule above. Pins for all five.

## Still open from this read

Holds 3, 4, 5 and 6's two exemption narrowings; Meshrin's rider landing as a
trait as well as a weld; the three fidelity items (the stampede, the satyr's
lure, the Vigil's missing paladin rows); and predicates for the remaining
reopened holds (an INT 4 Monstrosity speaking Common, shape damage defaults,
Assassinate adding Bludgeoning to a blade).

**Your naming question needs your call, not mine:** for a one-word minted
Humanoid name, the third read made it a person and the inline inversion lets the
call's own answer through. Those conflict by design now. Say which wins and I
will make the other a validator.

```
full suite      185 suites, 5,314 passed, 26 skipped; build clean
```

---

# Addendum two — holds 2b, 4 and 5 (2026-10-14)

**Hold 2b, the rider that also lands as a trait.** Meshrin's hook rider welded
onto the chain row and the repair then authored the same clause again as the trait
"Drag into the Dark", which is where the mid-sentence "If" came from. A welded
rider adds no row, so its template's keys never reached the repair's claim set.
**A row's bound keys now count as words it claims.** Re-run: one copy of the
clause, no stray trait, and the capital "If" is gone with it.

**A regression of mine, which you caught.** The weapon-type table I added in round
seven read a shortsword as Slashing, because the compound read ended in "sword".
Weapons now carry their own type: shortsword and rapier are Piercing, longsword
and greatsword Slashing. That is Vespera Vaunt's row.

**Hold 4, in three parts.**

1. *The mastery DC* now uses the ability its attack uses — Dexterity for a finesse
   weapon, Strength otherwise — so the trident's Topple and the trident's attack
   can no longer disagree.
2. *The Hurlaxe range.* A weapon word inside a coined name now takes that
   weapon's range, so a thrown axe is 20/60 rather than 60/240. The table's word
   boundary never saw the axe inside hurl+axe.
3. *The weapon's stat.* **Not fixed — made visible.** Re-keying an attack bonus
   late cascades into the damage bonus, the bands and the budget, and I would not
   do that at the end of a long session. Instead the derivation gate now refuses a
   mundane weapon keyed to the casting stat, and it fails Lady Merivane exactly as
   you described: `Greatsword: +8 derives from WIS, but an attack row rolls
   STR/DEX`. Your own note points at the better fix anyway — the caster gate
   holding against the "smites" override, rather than the row being re-keyed after.

**Hold 5, the damage defaults.** Three rules, because the four rows had three
causes.

- A **seed** path defaulted an action to Piercing and a bonus action to
  Bludgeoning, which is a weapon's type on a thing that is no weapon. A seed now
  takes its own fiction first: a dread or a sensory strike is Psychic, a drain or
  a brand Necrotic, blighted ground Poison. Bloodcurdling Howl and Creeping Dread
  are both that seed, and both now read Psychic. A declared energy still wins.
- The same rule for **shapes**: a wail is Psychic.
- The **on-hit extra** now reads the hit's type after the weapon rows settle. It
  renders in the trait seat, before the weapons have their final types, which is
  why Assassinate added Bludgeoning to a blade. A rider the concept deliberately
  coloured still stands.

**Still open:** hold 3's four cases, hold 6's two exemption narrowings, the weapon
re-key above, and the three fidelity items (the stampede, the satyr's lure, the
Vigil's missing paladin rows).

```
full suite      185 suites, 5,326 passed, 26 skipped; build clean
new pins        classes.spec.js, 39 tests
```

---

# Addendum three — hold 6's exemptions, and hold 3's first case (2026-10-14)

**Hold 6, both exemptions narrowed.** I answered your question with a diagnosis;
here are the two fixes it implied.

- *The energy exemption needs a caster.* Print's hybrid energy row is the Mage's
  Arcane Burst, which is a **spell** attack. The Herdmaster's "Thunderbolt" kept
  reach 5 and range 30/120 on a sheet that casts nothing. The exemption now
  requires a Spellcasting row, in the engine and in `hybrid-needs-thrown` alike.
  The predicate fires on that exact block.
- *Print's exemption needs print's whole card.* `attack-in-multiattack` exempted
  print's own rows on the grounds that print composes its own card. Once a lack
  removes one of print's rows that is no longer true, so the exemption now
  requires an exact print body at print's CR. It fires on the Iron Templar's
  orphaned Radiant Flame.

**Hold 3, Crown's Echo.** The Mage's Force attack became "Forceful Staff",
melee-only Bludgeoning. Two of my own rules did that, in sequence: the
melee-weapon narrowing from the step-five read took the range off print's hybrid
row because the model had named it a staff, and the anatomy pass then retyped the
now-melee row to Bludgeoning. **Print's own hybrid row is exempt from the
narrowing**, and with the range intact the anatomy pass skips it anyway, since it
has always skipped hybrid rows. One guard fixes both.

I tried a broader guard first — print's rows exempt from the anatomy pass
entirely — and a canary caught it: print's Ogre carries a Javelin, and on a sheet
with only a melee slot that name is dishonest and must become Slam. So the
anatomy pass still corrects print's rows where print's row is in the wrong slot.
Only the hybrid narrowing is guarded.

**A consequence of your naming decision, for the record.** The one-word rule is
keyed on type, so every Humanoid-typed creature is treated as a person. That
includes monstrous Humanoids: Gloamripper, a troglodyte, now speaks as
"Gloamripper" rather than "the gloamripper", and the predicate says so on the
saved block. If you want it narrower — a Name-field name only, say — that is a
follow-up, not something I would decide.

**Where the predicates now stand on the saved runs.** Three of the defects you
reported fail their own gate rather than passing silently:

```
Crookbound Herdmaster   FAIL hybrid-needs-thrown   (Thunderbolt at 30/120, no caster)
Rime-Scaled Wyrm        FAIL interior-energy       (deals Cold, digests in Acid)
Iron Templar            FAIL attack-in-multiattack (Radiant Flame orphaned)
Gloamripper             FAIL inline-consistency    (the one-word rule)
Lady Merivane           FAIL attack-stat           (greatsword off WIS)
Smokeveil               FAIL inline-consistency    (the one-word rule)
```

**Still open:** hold 3's other three cases (Vareth's missing Spellcasting DC, the
Iron Templar keeping a magical print row after "no magic at all", Vespera's
weapon type is fixed), the weapon re-key itself, and the three fidelity items.

```
full suite      185 suites, 5,328 passed, 26 skipped; build clean
new pins        classes.spec.js, 41 tests
```

---

# Addendum four — hold 3 closed (2026-10-14)

**"No magic at all" now takes the magical attack with the Spellcasting.** The
lacks clause deliberately skipped attack rows, so that a weapon row could not be
deleted, and the Priest's Radiant Flame survived as an orphan. An attack row is
now taken too when it deals a non-physical type and its name does not name a
mundane weapon — a magical attack is magic. Re-run of the Iron Templar: the
Spellcasting and the Radiant Flame both leave, the Mace stands, and nothing cites
the row that went.

**A Spellcasting row prints its save DC.** Vareth's printed none, so its Spirit
Guardians could not be run. Print carries "(spell save DC N)" in **45 of its 48**
Spellcasting rows; the Priest and the Priest Acolyte are the outliers, and our
sheet had faithfully reproduced their omission. A row that names its ability and
omits the DC now gets the row's own: 8 + PB + that ability's modifier. Vareth's
re-run reads "using Wisdom as the spellcasting ability (spell save DC 14)".

That closes hold 3. Of its four cases: Crown's Echo and Vespera were mine to fix
in the rules I added, and these two were print's own rows left wrong by a lack and
by an omission.

**What is left from the read**, all of it named rather than quietly dropped:

- **The weapon re-key** (hold 4's third part). Visible through the derivation
  gate, not fixed, because re-keying an attack bonus late cascades into the
  damage bonus, the bands and the budget. Your note points at the better fix:
  the caster gate holding against the "smites" override.
- **Three fidelity items:** the Herdmaster's stampede dropped a third time, the
  satyr's lure missed a second time, and the Oathbroken Vigil's missing paladin
  rows.
- **Two predicates** for reopened holds that still have none: an INT 4 Monstrosity
  speaking Common, and Assassinate adding Bludgeoning to a blade (fixed at the
  source, but nothing checks it).

```
full suite      185 suites, 5,330 passed, 26 skipped; build clean
new pins        classes.spec.js, 43 tests
```

---

# Addendum five — the two missing predicates (2026-10-14)

Your bar: "Each needs a predicate so the branch smoke catches it next time." Both
now exist, and one of them corrected my first attempt at it.

**`speaks-by-int`.** Meshrin is an INT 4 Monstrosity that spoke Common. Two rules
disagreed: `honestLanguages` had already answered None for the number, and the
later sapient default — keyed on the concept call's mind read — overwrote it with
Common. **A number on the sheet beats a judgement about the sheet**, so the
default no longer fires on a low-INT body.

My first predicate for it was wrong, and a canary caught it inside a minute: it
failed print's own Ogre. So I measured print instead of guessing. Of 139
non-Humanoid blocks at INT 5 or less, **8 speak**, and they cluster by type:

```
Beast 0/88   Monstrosity 0/19   Ooze 0/4   Plant 0/3   Undead 0/4   Aberration 0/4
Giant 2/3    Fiend 2/3          Elemental 2/2   Dragon 1/2   Construct 1/7
```

The rule is now type-aware: a Beast, Monstrosity, Ooze, Plant, Undead or
Aberration at INT 5 or less speaks nothing unless the GM's words say it does; a
Giant, Fiend, Elemental, Dragon or Construct may, because print's do. The engine
rule and the predicate use the same list. Print's Ogre keeps Common and Giant.

**`on-hit-type`.** An on-hit extra rides the hit, so it deals the hit's own type.
Fixed at the source last round; now checked. It fails Vespera Vaunt on the saved
block: `Traits/Assassinate: it adds Bludgeoning to a hit that deals Slashing
(Shortsword)`. A rider the concept deliberately coloured — an energy — still
passes.

**Seven of your reported defects now fail their own gate** on the two saved runs,
where every one of them passed silently when you read them:

```
attack-in-multiattack 1   attack-stat 1   hybrid-needs-thrown 1
inline-consistency 2      interior-energy 1   on-hit-type 1   speaks-by-int 1
```

**Left, and named:** the weapon re-key itself (hold 4's third part, visible
through `attack-stat`), and the three fidelity items — the Herdmaster's stampede,
the satyr's lure, and the Vigil's missing paladin rows.

```
full suite      185 suites, 5,333 passed, 26 skipped; build clean
new pins        classes.spec.js, 46 tests
```

---

# Addendum six — the fidelity items (2026-10-14)

**The stampede, flagged three times.** "Stampede" was a key on *both* the herd
order and the trample nova, and it sat in two places — the shape's key table and
the seed's own list — so removing it from one left it in the other. Gone from
both. "A herdmaster who commands a stampede of thunder-elk" now ranks
`trample(stampede+thunder)` over `herd(command)`. An order with no stampede in it
still keys the herd.

**The satyr's lure, flagged twice.** "Dance" was a key on feint-slip, the piper's
own evasion, and not on the lure at all, so the force-bind poured the GM's
transitive dance into an intransitive shape. The lure now owns the word and
feint-slip keeps the intransitive phrases ("dances away", "dances aside") plus
its own eight keys. "Dances travellers into the hills" ranks the lure alone.

*Residual, stated:* an intransitive "dances away from every blade" now scores the
lure's "dances" level with feint-slip's "dances away", and table order decides.
I tried a tiebreak on the longest matched key — the same most-specific-wins rule
I used for class names — and it reordered an established pin: "a mimic posing as a
strongroom chest" flipped from Adhesive to Mimicry. I reverted it. Changing a
behaviour an earlier read settled, to fix a phrasing no read has reported, is the
wrong trade. If "dances away" turns up in a sheet, the fix is your own
transitive/intransitive test, not a tiebreak.

**The Oathbroken Vigil: the paladin is there, and the trace says where.** The kit
landed `paladin — Aura of Authority`. Lay on Hands and Divine Smite are **keyed**
rows, and the GM's words — "a knight-errant of the fallen order who shields the
weak" — contain no heal word and no smite word, so both waited by design. That is
the rule you set: do not pepper class traits that were not asked for.

What is wrong on that sheet is a different thing, and your note names it: Shield
and Sword are two attack rows at identical dice, 26 (5d8 + 4) each. The trace
shows where they came from — the concept call's own signature elements, "broken
longsword and shield [object]" — not from the verb in "shields the weak" as the
read supposed. A shield is not a second weapon at the sword's dice; it is either
Shield Bash, which is now in the catalog, or armor. That is a composition fix I
have not made.

```
full suite      185 suites, 5,335 passed, 26 skipped; build clean
new pins        classes.spec.js, 48 tests
```

**Open, with nothing hidden:** the weapon re-key (hold 4's third part, visible
through `attack-stat`), the shield-as-second-weapon composition above, and the
intransitive-dance residual.

---

# Addendum seven — the caster gate, and the shield (2026-10-14)

**The caster gate holds on the override.** Your note: "The caster gate refused the
warpriest line, then the verb override ('smites') put her back on it. The gate
should hold." The trace confirmed it exactly:

```
caster-warpriest: a caster line needs a magic word in the words — none here
defender-leader -> caster-warpriest: the concept's VERB outranks the noun (key "smites", class verb)
```

The pick loop checked for a magic word; the override's filter honoured every body
veto but not that one. It does now. "An oathsworn crusader who smites the unclean"
stays on the defender line, and "a battle-cleric who prays over her blade and
casts blessings" still overrides to the warpriest, because that one has the magic
word. Pinned both ways in `route.spec.js`.

That is also the better half of hold 4. Lady Merivane swung a greatsword off WIS
because the **caster chassis** keys every attack to one stat; with the gate
holding, she is not on the caster chassis to begin with. The re-key itself stays
unfixed and visible through `attack-stat`, and the root cause is worth naming
plainly: the striker stat is fitted at scale time, before the GM's weapon rows
exist, so a sheet that will carry a greatsword can be built on a mental array.
Fixing that properly is a landing, not a tail-end patch.

**A shield is not a second weapon.** Where a shield row stands beside another
melee row, it now takes print's Shield Bash shape — the Gladiator bashes for
smaller dice with a Prone rider beside its Spear — instead of the weapon's own
numbers.

*Verified only partly, and I would rather say so.* Two live re-rolls of the Vigil
produced no Shield row at all to test it on. One of them is instructive: "a knight
with a longsword and a shield" heads on print's **Knight**, and print answers a
shield with armor rather than an attack, so no shield row is created. That is the
right behaviour arriving by a different road. The rule is landed and inert when
nothing matches; it needs a sheet whose signature elements name a shield on a
non-print body to exercise, and I did not get one.

```
full suite      185 suites, 5,337 passed, 26 skipped; build clean
pins            classes.spec.js 48, route.spec.js 33
```

**Open, and that is the whole list:** the weapon re-key (root cause named above),
the shield rule's end-to-end verification, and the intransitive-dance residual.

---

# Addendum eight — hold 4's root cause, fixed at the array (2026-10-14)

I named this one as a landing rather than a patch, and it turned out to be four
lines in the right place.

**The cause.** The striker stat is fitted at **scale time**, before any of the
GM's weapon rows exist. A caster line picks its best mental stat as the striker
and fits that stat to the attack bonus, leaving STR wherever the donor had it.
So Lady Merivane got WIS 20 fitted to +8 and kept STR 12, and her greatsword
swung off the mind.

**The fix, at the array rather than the row.** When the GM's words name a mundane
melee weapon, the striker is physical — Strength, or Dexterity for a finesse
weapon — and the mind keeps the DC. That is print's own warpriest: the Priest
swings its Mace off STR 16 and casts off WIS 16.

```
concept                                     striker   STR  WIS   attack
(none)                                      WIS        12   20   +8 = mod 5 + pb 3
"smites with a greatsword and casts…"       STR        20   16   +8 = mod 5 + pb 3
"a court wizard who hurls bolts"            WIS        12   20   +8 = mod 5 + pb 3
```

Re-keying at the row would have been the wrong layer: it changes the bonus and
the flat damage, which cascades into the band read, and it leaves the array
itself incoherent. Fixing the array makes the numbers agree from the start and
nothing downstream has to be touched — every attack bonus already derives from
`striker_stat`.

A live re-run of the paladin now reads STR 20, WIS 13, Longsword at +8 = STR 5 +
PB 3. With the caster gate also holding, that concept no longer reaches a caster
chassis at all, so the two fixes meet in the middle.

**The gate table on the saved runs**, which is the honest summary of this whole
read: eight of your reported defects now fail a gate where every one of them
passed silently when you read them.

```
attack-in-multiattack 1   attack-stat 1       hybrid-needs-thrown 1
inline-consistency 2      interior-energy 1   on-hit-type 1   speaks-by-int 1
```

```
full suite      185 suites, 5,340 passed, 26 skipped; build clean
pins            classes.spec.js 51, route.spec.js 33
```

**Open, and short:** the shield rule needs a sheet whose signature elements name a
shield on a non-print body to exercise end to end, and the intransitive-dance
residual stands by choice.

---

# Addendum nine — the last two fixes, and the blocks to confirm them (2026-10-14)

**The intransitive dance.** Fixed with the mechanism that already existed rather
than a tiebreak. `SENSE_DENY` denies a key when the text uses it in the wrong
sense, and the lure's "dances" is now denied when the dance is intransitive —
away, aside, back, off, clear, free, out, round. That leaves feint-slip's phrase
to win, and it reorders no pin:

```
"dances travellers into the hills"        -> lure
"music makes them dance toward him"       -> lure
"dances away from every blade"            -> feint-slip
"dances aside and laughs"                 -> feint-slip
```

That is your own transitive/intransitive rule, encoded where senses live.

**The shield rule** needed a sheet to exercise, not a change: two Vigil re-rolls
produced no shield row, and one of them headed on print's Knight, which answers a
shield with armor. The confirmation batch carries a concept with no print alias in
it at all — "a bulwark-sworn sentinel with a broken greatsword and a battered
shield" — so a shield object can land on a chassis body.

## The confirmation batch: `branch-confirm.json`, 16 blocks

One entry per fix, each carrying the hold it answers in its own `mech` field, so a
block that passes its gates but misses its behaviour is still a miss.

| # | prompt | what it confirms |
| --- | --- | --- |
| 1 | an oathsworn crusader who smites the unclean | hold 4 + the caster gate: no warpriest line on a verb alone |
| 2 | a battle-cleric who prays over her greatsword | hold 4's root cause: the mind keeps the DC, the arm keeps the sword |
| 3 | a tiefling cutpurse with a shortsword | hold 3 + hold 5: Piercing, and an on-hit extra takes the hit's type |
| 4 | a bulwark-sworn sentinel with a greatsword and a shield | the shield rule, with no print alias to intercept it |
| 5 | a rime-scaled wyrm that swallows sailors | hold 7, flagged four times: the gullet digests in Cold |
| 6 | Meshrin, a chain-hooked thing | hold 2b: one weld, no twin trait; and an INT 4 body says None |
| 7 | a lizardfolk monk with an open hand | hold 2: the rider prints once; "monk" is not the Priest |
| 8 | an imp rogue who picks locks | hold 1: the imp keeps its wings, its type and its rows |
| 9 | a dire wolf that hunts in a pack | hold 1: a multi-word print name resolves as a name |
| 10 | an orc warlord who howls | hold 5: the dread is Psychic; no shell from "armor" |
| 11 | a herdmaster who commands a stampede | fidelity: the stampede is the trample nova |
| 12 | a satyr piper who dances travellers | fidelity: a transitive dance is the lure |
| 13 | a templar priest with no magic at all | hold 3: the magical attack leaves with the Spellcasting |
| 14 | Vareth Solmane, a templar priest | hold 3: the Spellcasting row prints its DC |
| 15 | a ninja who moves through the shadows | the naming decision, plus a re-roll through the catalog |
| 16 | a veteran sellsword, 2014 | hold 4's mastery DC, the 2014 Multiattack, Shield Bash |

Eight predicates now stand behind these: `attack-stat`, `attack-in-multiattack`,
`hybrid-needs-thrown`, `inline-consistency`, `interior-energy`, `on-hit-type`,
`speaks-by-int`, `mastery-dc`. A regression in any of them fails a gate rather
than waiting for a reader.

---

# Addendum ten — the confirmation run (branch-confirm, 16 blocks)

```
16/16 generated, 2 blocks with a FAIL, coverage 77% (5 of 22 clauses)
```

Both fails are informative rather than inert, and one is already closed.

| # | block | verdict | the evidence on the sheet |
| --- | --- | --- | --- |
| 1 | Oathmender Seraphine | **confirmed** | route `defender-leader`; trace: "a caster line needs a magic word — none here". The override did not fire |
| 2 | Vaelrix Stormvow | **confirmed** | STR 20, greatsword +8 = mod 5 + PB 3; WIS 18 keeps Spellcasting |
| 3 | Vespera Vaunt | partly | Shortsword deals **Piercing**. No on-hit extra rolled this time, so that half is untested |
| 4 | Hollow Warden | not exercised | only "Broken Greatsword" — no shield row again, in a third attempt |
| 5 | Rimewake Wyrm | **confirmed** | "9 (2d8) **Cold** damage at the start" — the defect flagged four times |
| 6 | Meshrin | **confirmed ×2** | no "Drag into the Dark" twin; Languages **None** on an INT 4 Monstrosity |
| 7 | Kithral the Palm-Sage | **confirmed** | "Once on each of" appears exactly once on Open Palm |
| 8 | Quillwretch the Lockless | **confirmed** | Small Fiend, Fly 40 ft. (hover), Magic Resistance, with Cunning Action layered on |
| 9 | Greyfen Howler | **confirmed** | Large Beast, **Pack Tactics**, print's Dire Wolf array (STR 17, INT 3) |
| 10 | Volgrun Ironmaw | partly | no Shell Defense from "iron armor". No dread row rolled, so the Psychic half is untested |
| 11 | Roan Hearthorn | **not confirmed** | the stampede keyed `active-toll`, not the trample nova — see below |
| 12 | Llibran the Piperspawn | **confirmed** | `signature template: lure -> "Pied Piper's Reel"` — the lure missed twice before |
| 13 | Iron Diocese | **confirmed** | Spellcasting left on the lacks clause and no magical attack row survived |
| 14 | Vareth Solmane | **confirmed** | "spell save DC 15" printed. Its `attack-stat` fail is closed: see below |
| 15 | Kanagi the Shroud-Bound | **confirmed ×2** | `inline declared: "Kanagi"` — the person form; and the re-roll replaced Evasion with Shadowsight from `uncanny-sense` |
| 16 | Karrow Vane (2014) | **confirmed** | "Karrow makes two Greatsword attacks" — no forced crossbow shot; Shield Bash present |

## The two fails

**Vareth's Mace rolled +7 off WIS** — the same hold-4 class, arriving by a third
road: not the GM's words and not print's body, but the **warpriest chassis itself**,
whose melee row the model names a mace only after the striker has been fitted. So
the warpriest line is a weapon line by shape, and its arm is now fitted before
that name exists. Print's Priest is STR 16 and WIS 16 — one for the swing, one for
the spell. A re-run of block 14 proves it:

```
STR 18, WIS 16, pb 3 — Mace +7 = STR mod 4 + PB 3; spell save DC 14
0 block(s) with a FAIL of 1
```

**Roan Hearthorn's "Thunder Stampede" is a static burst** and the
`name-mechanic` predicate caught it: the name promises movement the text lacks.
The keys are right — "stampede" no longer keys the herding order — but `trample`
is not on a **defender's** shelf, so the only nova available to that line was
`active-toll`, a Thunder emanation, which the word "thunder-elk" then keyed. Two
honest options, and this one is yours: widen trample's roles to include defender,
or leave it and let the predicate catch the overpromising name. I did neither.

## Still not exercised

The shield rule has now declined three sheets: two Vigil re-rolls and this
sentinel. Each time the model named one weapon rather than two, which is the right
outcome by a different road. The rule stays landed and inert.

```
full suite      185 suites, 5,342 passed, 26 skipped; build clean
pins            classes.spec.js 53, route.spec.js 33
```

---

# Addendum eleven — the branch-confirm read: one principle, four gates (2026-10-14)

Your framing is the right one and I took it as the organizing rule: **a gate may
shape what the GM asked for, never remove it.** Six fixes, your corrections
accepted, and the process ask done.

## Your call on #4, taken as written

The role shelf now **steps aside for a shape the GM's own words key**. CR band,
nova cap, structure, ownership and pricing all still apply; only the role filter
yields. The key must be distinctive — five letters or a phrase — so a loose word
cannot open the catalog, and off-shelf templates are **appended** rather than
mixed in, because a longer menu must not reorder a pick the shelf already had.

```
defender + "commands a stampede"  -> trample on the menu
defender + "holds the line"       -> trample absent
defender + "smites the unclean"   -> coating on the menu
defender + "holds the line"       -> coating absent
```

`coating`'s own key list now says it is a smite, which is what the inventory
called it. One rule, both holds: Roan's stampede and Seraphine's smite.

It did move one existing pick, and I let it: on the re-roll's reef-warden,
`hook-drag` now outranks `reel`, because it matches two of the GM's words — drag
and under — where reel matches one. I rewrote that pin to assert the principle
rather than the winner.

## Hold 1 — the sentinel

**Tail matching.** The test is what the **tail** word is. A creature tail is a
family ("Brown Bear", "Green Hag", "Fire Giant") and its tail may match; a **job**
tail is one creature holding a post ("Azer Sentinel", "Goblin Boss") and anyone
can hold it, so a job tail matches only when the head is itself a role word, which
is how print writes its NPC families.

```
"a bulwark-sworn sentinel…"        -> none          (was: Azer Sentinel)
"an azer sentinel"                 -> Azer Sentinel  (the whole name still resolves)
"a hardened veteran of the border" -> Warrior Veteran
"a guard captain of the dusk watch"-> Guard Captain
"a bear" (CR 1)                    -> Brown Bear
```

My first attempt used a head whitelist and a canary caught it inside a minute: it
broke "a bear".

**The garbled row.** A row with no name, or whose text opens mid-sentence because a
sweep cut its first clause away, is a parse failure and never ships. New predicate
`row-parse` catches it on a saved block too.

## Hold 2 — the species type

It now lands **when the monster is built**, before every type-keyed pass, rather
than after them. The kit already knows the type; it was only stamped late. The
GM's own type word still outranks it. That closes the Fiend-keyed floors, the
Speed 50 and the Nimble-Escape-for-Cunning-Action swap in one move.

## Hold 3 — the print pass and the role shelf

**The print pass now spares a row the GM asked for.** A part, a species row, a
feature and a class-kit row are the GM's own; only the seat's rows stand down. So
"rogue" in the words keeps Cunning Action on the Imp's body. You were right that
the trace mislabelled it as the seat's.

**Seraphine's smite** is the role shelf, closed by your #4 call above.

## Hold 5 — the magical ranged row

Hold 4's fix sent every ranged row to Dexterity. It now uses the same test as
Addendum four: a non-physical type on a row whose name is no mundane weapon is
magic, and magic keys the casting stat. Vaelrix's bolt would read +7, not +3.

## Hold 6 — the caster fallback

A refusal for want of a magic word now falls **out** of the caster family. My
first version fell to nothing, which breaks never-fail, so it falls to the plain
line by type — the same place a body veto falls. And print has no Fey brutes, so
Fey joins Humanoid in reaching for the skirmisher line: the piper lands there
rather than on a brute.

## The process ask — done

The review now prints each dropped clause's text under its block. Your three
guesses were right:

```
- **dropped clause:** "bashes with a buckler"      (Karrow)
- **dropped clause:** "smites the unclean"         (Seraphine)
- **dropped clause:** "a battered shield"          (Hollow Warden)
```

## Corrections accepted

#1 Seraphine 1/2, #3 Vespera's Fiend header leak, #4 the Azer, #8 Quillwretch's
Cunning Action absent, #10 Volgrun's howl dropped rather than untested. All five
are in the fixes above except Volgrun's floor, which is hold 7 and **not yet
done** — the re-slot ladder (one attack, then a bonus action, then a recharge,
before a seed stands in) is the next piece of work.

```
full suite      185 suites, 5,350 passed, 26 skipped; build clean
new pins        classes.spec.js 58, route.spec.js 36
```

**Still open:** hold 7's re-slot ladder, and the notes — the greatsword's mastery
should be Graze rather than Topple, 2014 says "is knocked prone", a lance has
reach, "no magic" belongs in the lack scrub, and the shield rule wants a unit pin
rather than more live blocks.

---

# Addendum twelve — hold 7 and the notes (2026-10-14)

**Hold 7, the floor re-slots before it drops.** A signature the GM's own verb
bound now tries the cheaper slots in your order before anything stands in: one
attack of the Multiattack, then a bonus action, then a recharge. The first slot
that clears the floor keeps the row, and the trace says which and why. A seed is
the last resort, as you asked. Volgrun's "howls" bound terror-pulse at 19.8
against a whole-Multiattack floor of 45.6; as one attack of the Multiattack the
floor is 0.8 × one attack, which it clears.

Guarded: a recharge is only tried where the sheet has no other nova, so the
re-slot cannot create a second one.

**The notes.**

- **The greatsword's mastery.** The table is already right — greatsword is Graze,
  and Topple belongs to the maul, lance, trident and quarterstaff. What put a
  Prone rider on Karrow's greatsword is **Trip Attack**, earned by "veteran"
  through the style cue, not a mastery. One wrinkle in your favour: the rider is
  appended to the row anonymously, so the sheet never says "Trip Attack" and it
  reads like a mastery. Worth a name, and I have not done that.
  A second wrinkle: a HEAVY weapon earns Great Weapon Master instead of its
  mastery, one feature per weapon, so the maul never shows Topple either. Pinned
  as it actually behaves.
- **2014 writes a condition in prose.** "has the Prone condition" is now "is
  knocked prone", and the other eleven conditions lowercase the same way. This
  contradicted a pin from the 2026-10-02 audit whose expected string carried the
  2024 wording; your later instruction wins and I updated the pin rather than
  the rule.
- **A lance has reach.** Lance, glaive, halberd, pike and whip now print reach
  10 ft., and a longer reach from a big body still stands.
- **"No magic at all" keys nothing.** A lack phrase naming magic is scrubbed
  before any key match, so the words before it still key ("a mace" survives) and
  the lack itself offers nothing.
- **The shield rule** takes a unit pin and no more live blocks, as you asked.

```
full suite      185 suites, 5,354 passed, 26 skipped; build clean
new pins        classes.spec.js 62, route.spec.js 36
```

**Not done, and these are the only ones left:** naming the anonymous Trip Attack
rider on its row, and Kithral's three small numbers (unarmored AC, the Stunning
Strike DC, two Disengage bonus actions), which are a monk-chassis cleanup rather
than a rule.

---

# Addendum thirteen — the four verifications are blocked upstream (2026-10-14)

The four blocks meant to confirm the species-type fix, the kit-row fix, the
stampende re-slot and the battle-cleric's array **all timed out with no save**,
at 902, 1211, 960 and 966 seconds. The cause is upstream, not the code:

```
!! Error generating response: TypeError: Failed to fetch
!! [route] call failed: Failed to fetch
```

A direct POST to the dev server's DeepSeek proxy returns nothing in 30 seconds
(HTTP 000), while the dev server itself answers 200. The 16-block confirmation
run earlier in the same session completed normally, and a canary stalled the same
way mid-session, so this looks like the provider or the path to it rather than a
change of ours.

**What that means for these four, stated plainly:** the fixes are landed and
unit-verified, and they are **not** live-verified. They are:

| fix | unit proof | live proof |
| --- | --- | --- |
| the species type before the type-keyed passes | yes | **blocked** |
| the kit row surviving the print pass | yes (source-level) | **blocked** |
| the floor re-slotting the GM's verb | yes | **blocked** |
| a caster with a weapon keeping the arm | yes | yes (block 14 re-run, earlier) |

The first three want one short run when the provider is back:
`node scripts/smoke-statblock.mjs branch-verify` — four blocks, about two minutes
when the API is healthy.

```
full suite      185 suites, 5,354 passed, 26 skipped; build clean
```

---

# Addendum fourteen — the blocked verifications, run (2026-10-15)

The provider came back; `branch-verify` ran clean, 4/4 generated.

**Hold 2 and hold 3's kit row, both on one sheet.** Vespera Vaunt:

```
type Humanoid (not Fiend) · Speed 30 ft. (not 50) · Immunities None (no Poison)
Resistances Fire (the tiefling kit's) · Bonus Actions: Umbral Step, Cunning Action
```

The species type lands before the type-keyed passes, and the rogue kit's Cunning
Action survives the print pass — it is on the sheet, not renamed to Nimble Escape.

**Hold 7, the ladder, in the trace:**

```
value check: "Stampede Command (2/Day)" EV 7 vs floor 30.4 (the whole Multiattack) — still under
signature re-slotted: "Stampede Command" moves to a bonus action — EV 7 vs floor 2.9 there; the GM's verb keeps its row
```

"Stampede Command" is on the sheet. The GM's verb kept its row instead of being
dropped for a seed that carried none of their words.

**Hold 4's root cause, confirmed again.** The battle-cleric: STR 20, WIS 18,
Greatsword +8 off Strength, Spellcasting off Wisdom.

**Hold 5 is only half fixed, and I would rather say so.** Vaelrix's bolt was +3
off DEX 10; the re-run reads **+8**, which is the striker's Strength, not the
casting stat's +7. My fix stopped the DEX re-key but nothing re-keys a magical row
*to* the mind, so it keeps the sheet's attack bonus. Your rule — "a magical row
keys the casting stat" — needs that second half.

**A new finding, from my own predicate.** `inline-correctness` fails
"Herdmaster of the Storm-Plains" speaking as "the herdmaster", because the
predicate accepts any contiguous *tail* of the name and "herdmaster" is a
**prefix**. A name with an "of the …" tail heads on its first word, and that is
the natural short form. The predicate is wrong, not the sheet.

Two fails in the run, both pre-existing or mine-to-fix, neither from the holds:
Vespera's `bands under` is the lurker-5 donor's HP at CR 5, which this session
identified earlier as a donor characteristic; the Herdmaster's is the predicate
gap above.

```
full suite      185 suites, 5,356 passed, 26 skipped; build clean
new pins        classes.spec.js 64 (the shield rule is now pinned, as asked)
```
