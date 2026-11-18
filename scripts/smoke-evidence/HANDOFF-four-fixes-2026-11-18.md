# Handoff — four fixes, the re-record, and the tables that were owed

For Fable 5.2 and the owner, 2026-11-18. Branch `statblock-enhancments-part-2`.
Blocks: `BLOCKS-four-fixes-2026-11-18.md` beside this file — all forty as the baseline now holds them.

## Suite and replay

**250 suites, 5,627 passed, 26 skipped.** Strict replay of `baseline-2026-11-18` after the
re-record: **38 of 38 reproduced exactly, 2 skipped.**

Twenty-five sheets missed the old tape after the curse rewrite and the four fixes, and all
twenty-five were re-recorded live in one pass-through run. **Nothing threw and nothing timed out.**

**Twenty of the forty differ from the checkpoint.** The list is below.

## The four fixes

### Fix 1 — the audit does not rename a row written for the GM's words

Built. On the re-recorded forty, **four renames were held**, where the handoff's count on the old
tape found two:

| row the seat wrote | the audit's proposed name | the clause it was written for |
|---|---|---|
| Brineplate Detonation | Brine Burst | `cl_1h1f3n8` — "a leviathan of the trench whose song drowns fleets" |
| Command the Swarm | Blinding Gale | `cl_1x4jef1` — "commands lesser swarms" |
| Dusksong Shroud | Dusksong Bind | `cl_176teih` — "Ilvareth hurls a blot of living shadow at a point he can see" |
| Fen-Weight Hex | Mire Snare | `cl_a3qo0a` — "curses trespassers" |

Seven renames still landed, on rows with no clause binding. One predicate,
`writtenForATypedClause`, is now read by this pass and by print canon; `printCanonExempt` is that
same function under its original name.

### Fix 2 — the ceiling reads a Multiattack that offers two things

Built, and **it fires on no sheet of this forty**: not one Multiattack here offers a second option
beside its area row, so the fix is held by its unit tests on the three forms rather than by a block.
The three at-will area rows the forty does offer are all at or under half a whole hit:

| sheet | the row | it deals | the whole hit it replaces |
|---|---|---|---|
| s14 Glacierheart | Glacial Surge | 17 | 35 (Slam, 22 + 13) |
| s16 Brass Tyrant | Forge-Quake | 17 | 33 (Brass Fist, 19 + 14) |
| s20 Trenchsong Leviathan | Brineplate Detonation | 18 | 36 (Flukes, 22 + 14) |

**0 of 3 out-damages the hit it replaces** (it was 3 of 3 before R1).

### Fix 3 — a row that denies healing is not a heal

Built. **13 print rows deny healing and 0 are refused by the heal gate.** Two of the 13 — the
Aboleth's Mucus Cloud and the Pit Fiend's Bite — are still refused *as traits*, correctly: both
write a saving throw in sentence form and neither is a trait in print. My first measurement counted
those two as failures of this fix; they are not.

**The tollkeeper's trait did not recur.** On the re-recorded roll the seat's answer changed shape
entirely: it was refused once for "you wrote no row of the kind asked for (an action)", landed on
the second ask, and shipped as `Toll of the Dying — *Dexterity Saving Throw*: DC 13, one creature
within 60 feet. *Failure:* 13 (3d8) Necrotic damage.` The heal gate never fired, so the fix is held
by its test, which drives the exact answer captured from the old tape. Note what the row lost: the
idea was "marks one target so it cannot regain hit points", and the row that shipped is a plain
damage save. The seat lands now; the ask still is not on the card.

### Fix 4 — the juggernaut's two legendary actions

Built. On the Brass Tyrant the pair now reads:

```
Advance and Strike   The tyrant moves up to half its Speed without provoking Opportunity Attacks,
                     and it makes one Brass Fist attack.
Crush a Path         The tyrant moves up to its Speed without provoking Opportunity Attacks. During
                     this movement, it can move through Large or smaller objects and structures,
                     destroying them.
```

**The wording is mine** — "moves up to its Speed" — and is for the owner to change. The other three
chassis are untouched, and a data-integrity test now guards the whole catalog: no chassis holds two
legendary rows identical up to the first full stop.

## The twenty sheets that differ from the checkpoint

Read these and no others. Both printings were compared, which is why the last three are here: their
only change is in the 2014 half.

| sheet | what changed |
|---|---|
| s02 mire-hound | the push-away seed is gone; `Creeping Dread` (Frightened) stands in its place |
| s04 tollkeeper | the seat landed on the second ask: `Toll of the Dying` replaces `Lingering Brand` and `Death's Toll` |
| s05 air-elemental | `Howling Gust` is gone and **nothing replaced it** — see below |
| s07 hydra | `Smothering Stump (Recharge 5-6)` and `Ash Choke` for `Crushing Shove` and `Ash Miasma` |
| s10 drowned-choir | `Ever-Swelling Hymn` and `One Unbroken Voice` for `Anthem Unending` and `Unison Hymn` |
| s12 vesphidion | `Command the Swarm` kept its name — a held rename — where it had shipped as `Blinding Gale` |
| s14 glacierheart | `Glacial Surge` for `Glacial Advance`, repriced to 17 |
| s16 brass-tyrant | the most changed sheet: `Forge-Quake` for `Molten Seam` at 17, `Forge Blast` for `Forge-Heat Roar`, `Fear Aura` for `Resonant Body`, all three legendary rows renamed, and Crush a Path now at full Speed. HP and senses moved with the re-roll |
| s17 pit-fiend | `Glare the Dying Oath` for `Sworn Word` |
| s20 trenchsong-leviathan | `Crushing Hymn` for `Drowning Hymn`; Brineplate Detonation repriced to 18 and its rename held |
| s25 blackiron-sentinel | `Iron Interposition` and `Rune-Chain Aegis` for `Interposing Bulk` and `Rune-Chain Ward` |
| s26 mirewitch-sable | `Fen-Weight Hex` for `Fen-Whisper Blast`, and its rename held — **still no curse** |
| s28 ilvareth-dusksong | `Dusksong Shroud` for `Duskbind`, rename held; the doubled parenthesis is gone from the header |
| s29 swarm-of-funeral-bells | Knellsong now saves "each other creature of the swarm's choice", not the creature at 0 HP |
| s32 barrowstone-exile | 2014 only: the Multiattack keeps the choice of two Stone Clubs |
| s33 riverbank-reed-ascetic | 2014 only: the same |
| s34 krennik-skullstandard | Krennik keeps his capital in every row |
| s35 well-drowned-worm | the push-away seed is gone; `Brine-Drowned Terror` (Frightened) stands in its place |
| s37 meshrin | `War Roar` for `Frightening Roar` |
| s40 brother-halric | 2014 only: the Multiattack keeps the choice |

## The sheets you asked for in full

### s26 Mirewitch Sable — nothing on her sheet curses

```
Multiattack       Sable makes three Arcane Burst attacks. It can replace one attack with a use of Fen-Weight Hex.
Arcane Burst      *Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 120 ft. 16 (3d8 + 3) Force damage.
Spellcasting      At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
                  2/Day Each: Fireball, Invisibility · 1/Day Each: Cone of Cold, Fly
Fen-Weight Hex    *Strength Saving Throw*: DC 14, one creature within 60 feet. *Failure:* The target
                  has the Restrained condition until the end of its next turn.
Sodden Mire       The ground in a 10-foot Emanation originating from Sable is Difficult Terrain.
Protective Magic (3/Day), Misty Step (3/Day)
```

**By which route: none of the three.** Her own row landed on the first ask, so the second ask never
ran and R4 never fired — R4 only lands the catalog's template when the seat ends with *no* row. Her
row answers "curses trespassers" with Restrained, which is not a curse. 2.2 did not fire either: a
save carrying a condition is not an empty save. Fix 1 did hold the audit's rename, so the row is
still called a Hex rather than `Mire Snare`.

**Zero rows on the whole forty hold a curse.** R2 and R4 are built and unit-tested and no sheet
exercises them.

### s05 Air Elemental — Chorus of the Drowned is not on the sheet, under any name

```
Multiattack           The air elemental makes two Thunderous Slam attacks.
Thunderous Slam       *Melee Attack Roll:* +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.
Whirlwind (Recharge 4-6)  print's own row
Air Form              print's own row
```

Print's four rows and nothing else. This roll the seat wrote **two** rows and both were handed the
clause "carries stolen voices", and neither reached the sheet:

```
[reskin] free row over budget: Actions/"Stolen Voices" leaves at ship — this sheet's free-row
         budget (1) is spent by a row that SHIPPED
[reskin] unfinished row dropped: Reactions/"Engulfing Wake" — a save outcome has no effect after it
         — "ength Saving Throw: DC 13, the triggering creature. Failure:"; half a rule is worse than no row
```

So the owner's grade stands, for a different cause than last round: not a rename this time, but a
free-row budget of one and a Reaction whose save rendered an **empty failure clause**. That second
one is exactly the defect 2.2 closed for action saves — the Reaction path has the same hole, and
2.2's guard does not cover it. New, and not in any handoff.

### s16 Brass Tyrant

```
Multiattack   The tyrant makes two Brass Fist attacks. It can replace one attack with a use of Forge-Quake.
Forge-Quake   *Dexterity Saving Throw*: DC 19, each creature in a 60-foot-long, 5-foot-wide Line.
              *Failure:* 17 (5d6) Fire damage, and the target has the Prone condition. *Success:* Half damage only.
Advance and Strike  moves up to half its Speed without provoking Opportunity Attacks, and it makes one Brass Fist attack.
Crush a Path        moves up to its Speed without provoking Opportunity Attacks. During this movement, it can
                    move through Large or smaller objects and structures, destroying them.
```

The citation is bare because Forge-Quake carries no gate. 17 against a whole hit of 33.

### s04, s02, s35 — the three with a live template for the declared ask

None of the three took the catalog's template, because **all three seats landed a row**, and R4
never replaces a row that landed.

- **s04 tollkeeper** (ask `drain`): landed `Toll of the Dying` on the second try — a DC 13 Dexterity
  save for 13 (3d8) Necrotic. The trace also shows `curse-debt` named closest and declined `no_fit`.
- **s02 mire-hound** (ask `grapple`): landed `Creeping Dread` — Frightened on a Wisdom save.
- **s35 well-drowned-worm** (ask `grapple`): landed `Brine-Drowned Terror` — Frightened on a Wisdom save.

**No sheet holds two rows that do the same thing.** Across sheets, though, s02 and s35 now carry the
same shape: a Bite or Coil that grapples, beside a single-target Frightened save. That is the
"thin cards" item in your queue, and these two are its clearest pair.

### s13 Purple Worm, s29 Swarm of Funeral Bells, s34 Krennik

- **s13** is unchanged from the checkpoint. `Vomited Armoury (Recharge 5-6)` still deals
  60 (11d10) **Acid** in a 60-foot line. Your call on the damage type is still open.
- **s29** Knellsong now reads `*Trigger:* A creature within the swarm's reach drops to 0 Hit Points.
  *Response—Constitution Saving Throw:* DC 17, each other creature of the swarm's choice within 30
  feet.` The save is no longer asked of the creature that dropped.
- **s34** Krennik keeps his capital in all five places, in both printings.

## Every row on the forty that holds a curse

**None.** Zero of forty.

## What in this handoff turned out wrong when I read the code

1. **Fix 1's count.** The handoff said 2 of 12 audit renames hit a clause-bound row. On the
   re-recorded forty it is **4**, and the two the handoff named are not both among them — the Air
   Elemental's row never reached the sheet at all this roll.
2. **Fix 3's print check.** "Every printed row that denies healing should pass" — 13 do pass the heal
   gate, but 2 of the 13 are still refused as traits for an unrelated and correct reason. The
   question as posed has two answers depending on which gate is meant.
3. **The re-record changed the two unreplayable sheets' status.** `notReplayable` marks any entry
   whose CR field is `auto`, and s26's CR is in the words ("cr 7") rather than rolled — its own
   canary note says so. The fresh tape therefore marked s26 as unreplayable, which would have
   silently dropped the sheet you most want read from the gate. I removed that mark; strict replay
   then reproduced s26 exactly, which is the proof the mark was wrong. **The harness rule wants
   narrowing**: `cr: "auto"` is not the same as a rolled CR.
4. **Fix 2 cannot be shown on a block.** No Multiattack on the forty offers a second option beside
   an area row, so the fix has no sheet to stand on. Its three forms are covered by unit tests.

## 1.7 — donor chassis with two legendary rows that open with the same movement

Surveyed `donors.mjs`: 93 chassis, 29 declaring legendary rows, **4** holding two that open with the
same movement.

| chassis | the two rows | why it is or is not one move twice |
|---|---|---|
| `brute-17-juggernaut` | Legendary Move and Attack · **Legendary Wrecking Path** | **the same move twice** — both opened "moves up to half its Speed without provoking Opportunity Attacks". Fixed this round: Wrecking Path moves at full Speed. |
| `brute-17-charger` | Legendary Move and Attack (half Speed + an attack) · Legendary Stampede (**full** Speed, in a straight line) | different distance and shape. Left alone. |
| `brute-17-grappler` | Legendary Move and Attack · Legendary Drag (carries each creature it has grappled) | the drag brings its prey with it. Left alone. |
| `lurker-13` | Legendary Lunge (half Speed, **provokes**, + an attack) · Legendary Withdraw (half Speed, no Opportunity Attacks) | the no-provoke clause *is* the difference. Left alone. |

## 2.3 — the eight seats refused twice

On the checkpoint forty, 15 seats were asked again: 7 landed, 8 were refused twice. The answers are
quoted from `baseline-2026-11-18` as the model wrote them, captured before this round's re-record
replaced five of these sheets.

| sheet | seat | first refusal | second refusal | the form the ability was written in |
|---|---|---|---|---|
| s04 tollkeeper | trait | heal names no amount or no limit | same | a rider on its own attack — **a false refusal; fix 3 this round** |
| s05 air elemental | trait | 1 number promised, 0 written | a trait is not a save | a response to another creature's action (Disengage) |
| s20 leviathan | trait | a trait is not a save | it belongs in the description | a response to being hit, and two mechanics |
| s23 vashka | action | no row of the kind asked for (an action) | it belongs in the description | an order that grants allies a Reaction and AC |
| s31 drake | action | a trait is not a save | no row of the kind asked for (an action) | a rider on its own attack |
| s31 drake | trait | no row of the kind asked for (a trait) | a trait is not a save | nearest to an aura, but it fires on the drake's own movement |
| s35 worm | action | 1 number promised, 0 written | it belongs in the description | an action that drags a creature it has grappled |
| s39 sellsword | action | 2 mechanics in one row | same | a withdrawal that moves and forces a save |

Reasons across the sixteen refusals: *a trait is not a save* ×4, *no row of the kind asked for* ×3,
*it belongs in the description* ×3, *a number promised and not written* ×2, *heal* ×2,
*two mechanics in one row* ×2.

## Part 3 — the probe on the twists that never reach the page

Three twists, five live rolls each from the idea call (`--live-from idea --rolls 5`). The recordings
were not kept, as the handoff said; the ideas below are from the run's own traces.

**13 of 15 rolls completed.** The Purple Worm lost two: roll 1 threw (`GENERATION THREW — failed to
generate a valid response`) and roll 4 timed out at 1,003 seconds. The Air Elemental and the Hydra
ran 5 of 5.

| twist | ideas traced | naming a printed row |
|---|---|---|
| s05 Air Elemental — *carries stolen voices* | 10 | **0** |
| s07 Hydra — *whose stumps smoke instead of regrowing* | 10 | **0** |
| s13 Purple Worm — *that swallowed a war-band's armoury* | 8 | **7** — Swallow, and Bite |

The finding: **the idea call names the printed row only when the GM's own word IS the row's name.**
"Swallowed an armoury" reaches `Swallow` in 7 of 8 ideas. The hydra's ideas are *about* the severed
necks in 18 of 20 mentions and name `Multiple Heads` in none of them. The elemental never reaches
`Whirlwind` at all.

(Correcting last round's chat figure: the worm is 7 of 8, not 8 of 8. One roll's idea — the clattering
armoury that frightens — names no printed row.)

### The ideas, in the model's words


### s05 Air Elemental — carries stolen voices

**roll 01 · action seat** — names a printed row: no
> The elemental breathes out a stolen voice — a dead stranger's last plea, a child's name, a comrade's scream — aimed at one creature it can see. That creature must succeed on a Wisdom saving throw or be Frightened until the end of its next turn, and while Frightened this way it cannot willingly move closer to the elemental, its own legs locking against the sound of someone it failed.

**roll 01 · trait seat** — names a printed row: no
> The elemental's body is a howling vortex that will not let go of what it catches: a creature that starts its turn within the elemental's reach is battered by the wind and has its speed halved until the start of its next turn, and the elemental's Gale Slam deals extra Thunder damage to any creature whose speed is reduced this way — the chorus shrieks loudest around those it has already engulfed.

**roll 02 · action seat** — names a printed row: no
> The elemental chooses one creature it can see within 60 feet and speaks in the voice of someone that creature has lost or betrayed. The target must succeed on a Wisdom saving throw or be Frightened until the end of its next turn and have Disadvantage on its next attack roll, as the stolen voice burrows into its thoughts.

**roll 02 · trait seat** — names a printed row: no
> The air elemental's body is a screaming vortex of stolen voices. When it moves, it can pass through spaces occupied by other creatures without squeezing, and each creature whose space it enters must succeed on a Strength saving throw or be pushed 5 feet away and knocked Prone as the howling wind hurls them aside.

**roll 03 · action seat** — names a printed row: no
> The elemental weaves a stolen voice into a mask of a fallen ally, speaking in that friend's dying tones to one creature that can hear it. That creature makes a Wisdom saving throw; on a failed save it is Frightened of the elemental and must use its reaction to move its speed away from the howling chorus, believing the dead are calling it.

**roll 03 · trait seat** — names a printed row: no
> A stolen voice the elemental has swallowed hovers in its winds and mocks its foes in the dead stranger's tones. At the start of its turn, the elemental can let one voice howl: one creature it can see makes a Wisdom saving throw or becomes Frightened of it until the end of that creature's next turn.

**roll 04 · action seat** — names a printed row: no
> The elemental looses a stolen voice from its chorus, mimicking a creature the target can hear or has heard, in a tone of desperate warning or betrayal. The target must succeed on a Wisdom saving throw or be Frightened of the elemental until the end of its next turn, unable to tell ally from foe in the echo.

**roll 04 · trait seat** — names a printed row: no
> A howling wind-body: the elemental constantly exhales a swirling emanation of gale-force air and stolen voices. At the start of each of its turns, it can push one creature of its choice within the emanation up to 10 feet in any direction as the wind snatches at them.

**roll 05 · action seat** — names a printed row: no
> The elemental inhales and looses its stolen voices as a single confused, overlapping chorus at one creature, each plea and taunt in a dead stranger's tone striking a different nerve — the target must succeed on a Wisdom saving throw or be Frightened, and while Frightened it cannot take Reactions and must shout its own name aloud at the start of each of its turns or be unable to speak (and thus una

**roll 05 · trait seat** — names a printed row: no
> A thousand stolen voices babble within its wind-body, so the air around it is never truly the air you thought: creatures that start their turn within the elemental's reach hear their own voice among the chorus and must succeed on a Wisdom saving throw or have the words they mean to speak come out as someone else's — they cannot verbally communicate, cast spells with verbal components, or use abili


### s07 Hydra — whose stumps smoke instead of regrowing

**roll 01 · action seat** — names a printed row: no
> The hydra rears and crashes down in a wide, churning arc, driving its bulk and every smoking stump through the space before it. Each creature in that area must make a Dexterity saving throw; on a failure it takes bludgeoning damage and is knocked Prone, and the smoldering neck-stumps leave a rolling cloud of searing smoke hanging over that ground until the end of the hydra's next turn, which heavi

**roll 01 · trait seat** — names a printed row: no
> A cauterized stump vents searing smoke rather than regrowing: at the start of each of its turns, the hydra emits a cloud of burning smog in an emanation around itself that heavily obscures the area, and any creature that starts its turn in the smog takes fire damage. The hydra sees through its own smoke and moves through it unhindered.

**roll 02 · action seat** — names a printed row: no
> The hydra lowers its many necks and barges in a straight line, and any creature in its path must make a Dexterity saving throw or be knocked Prone as the beast tramples over it; each creature it knocks down is left choking and Blinded until the end of its next turn as the searing smoke off its cauterized stumps is driven down over them.

**roll 02 · trait seat** — names a printed row: no
> Its cauterized stumps vent a rolling cloud of searing smoke in an emanation around the hydra whenever it takes piercing or slashing damage, heavily obscuring the area until the start of its next turn. The hydra suffers no penalty from the smoke — it hunts entirely by its other senses — and any creature that starts its turn inside the cloud is Blinded and choking.

**roll 03 · action seat** — names a printed row: no
> The hydra lowers its many heads and surges forward in a trampling charge, plowing through any creatures in a line; each creature in its path must make a Dexterity saving throw or take bludgeoning damage and be knocked Prone, and the hydra's smoldering stumps drag a bank of searing smoke along behind it that heavily obscures the ground it passes over until the end of its next turn.

**roll 03 · trait seat** — names a printed row: no
> Cauterized Stumps. Whenever one of the hydra's necks is severed or it takes slashing damage, the wound burns shut with a hiss and immediately vents a cloud of searing smoke in a sphere centered on the hydra that heavily obscures the area and deals fire damage to creatures that start their turn within it; the smoke lingers until the start of the hydra's next turn.

**roll 04 · action seat** — names a printed row: no
> The hydra rears and crashes down, trampling a line through its own smoke. Each creature in a line within its reach must make a Dexterity saving throw; on a failure, it takes bludgeoning damage and is knocked Prone, and the hydra can move through the space it just trampled without provoking opportunity attacks.

**roll 04 · trait seat** — names a printed row: no
> Each time a neck is severed, the cauterized stump vents searing smoke in a 15-foot emanation until the end of the hydra's next turn. The area is heavily obscured, and any creature that starts its turn in the smoke must succeed on a Constitution saving throw or be Poisoned until the start of its next turn.

**roll 05 · action seat** — names a printed row: no
> The Hydra rears and tramples forward in a churning line, and every creature in its path must make a Dexterity saving throw; a creature that fails is knocked Prone and takes Bludgeoning damage as the beast's bulk grinds over it, while the smoking stumps trail thick smog behind the charge that heavily obscures the area it crosses.

**roll 05 · trait seat** — names a printed row: no
> Wherever the hydra's cauterized necks smoke, the air around its body is a stinging emanation: any creature that starts its turn within the smog is Poisoned and Blinded until the start of its next turn, and the hydra ignores this obscurement, wading through its own wound-cloud with heads high.


### s13 Purple Worm — that swallowed a war-band's armoury

**roll 02 · action seat** — names a printed row: Swallow
> When the worm hits with its Bite, it can also seize the target in its maw — the creature has the Grappled condition, and while grappled this way it is pulled with the worm, taking Acid damage at the start of each of its turns as swallowed blades and mail grate against it. A creature can only be seized this way if the worm's maw already holds nothing; the worm may release a creature to swallow a ne

**roll 02 · trait seat** — names a printed row: Swallow
> The worm's gut is a packed armoury of broken blades and mail: whenever a creature is inside the worm and takes Acid damage from it, it also takes the slashing grind of that swallowed steel. The worm itself is untroubled by its hoard — but each time it swallows, the keep of blades lets it recover as the metal slakes its endless hunger.

**roll 03 · action seat** — names a printed row: no
> As the worm moves, the armoury in its gut clatters and scrapes; each creature within reach of the sound must succeed on a Wisdom saving throw or have the Frightened condition until the end of its next turn, believing the shrieking steel is the worm's own shriek.

**roll 03 · trait seat** — names a printed row: Swallow
> The worm's gut is packed with swallowed blades and mail; whenever it takes Piercing or Slashing damage, it can use its Reaction to grind the broken steel together, letting it immediately make one Bite attack.

**roll 04 · action seat** — names a printed row: Swallow
> The worm's gut grinds its swallowed armoury into a whirling spray of broken steel. When the worm takes damage from a creature within its reach, it reflexively convulses, and shrapnel-torn blades and bent mail explode from its mouth and wounds in a cone. Each creature in the cone must succeed on a Dexterity saving throw or take piercing damage and have the Blinded condition until the end of its nex

**roll 04 · trait seat** — names a printed row: Swallow
> The worm's body is a walking armoury: when it hits with a Bite attack, it can forgo the acid damage to instead ingurgitate a fragment of the target's gear (a shield strap, a weapon haft, a buckle), lodging it in its gut. The target must succeed on a Strength saving throw or have one item it is holding or wearing wrenched away and swallowed, leaving that item unavailable until the worm is slain and

**roll 05 · action seat** — names a printed row: Swallow
> The worm's gut is a mill of swallowed steel: when it hits with a Bite, the target must succeed on a Dexterity saving throw or have a fragment of blade or mail driven into it, taking Piercing damage and having the Blinded or Prone condition (its choice of which wound the shrapnel makes) until it uses its action to tear the metal free.

**roll 05 · trait seat** — names a printed row: Swallow
> The armoury it swallowed grinds and clatters inside it, and it can taste the ring of steel through the earth: the worm always knows the location of any creature within its tremorsense that wears or carries metal, and has advantage on attacks against such a creature.

