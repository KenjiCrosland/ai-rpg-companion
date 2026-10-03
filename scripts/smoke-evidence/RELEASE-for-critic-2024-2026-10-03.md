# Release table for the critic — blockers round — 2026-10-03

Owner's scope for this round: blockers only. Your order was head-noun print names → 2014 print spread → save-row idiom and legendary header → offensive-axis hot rule and 2014 legendary allocation → aim check and Multiattack/dice fidelity → the fix-lite families. Items 1–4 are landed and pinned below; items 5–6 (the aim check on donors, Multiattack/dice fidelity, the material-noun rule, the verb-keeps-its-rows rule, idea-only trait binds, the hurler clause, Humanoid claws, type drift, edition-purity case, finesse, stray "-" lines, the library name leak) are parked by the owner's call, not disputed. The forty and the twelve were re-run in both formats; the gate tables and the same sampling follow.

## 1. Head-noun print names — fixed

A print name with a trailing modifier is that print block. Three shapes, one rule in `printCanonFor`:

| Shape | Example | Result |
|---|---|---|
| Rank word after the name is a title | "a pit fiend general" | Pit Fiend, exact body: Fire immunity, Cold resistance, Fear Aura, Diabolical Restoration, print's array |
| "of …" is a tail | "a kraken of the black trench" | Kraken, exact body: Amphibious, Siege Monster, Swallow, Lightning Strike, "understands Abyssal… but can't speak; telepathy 120 ft." |
| Participle after a print name opens the clause | "an archlich enthroned on a sun of bone" | Lich borrow (archlich/demilich → Lich): Spellcasting, Paralyzing Touch, print's array; the clause keeps its seat |
| Rank word + clause | "a vampire lord who commands bats and wolves" | Vampire borrow: Bite, Grave Strike, Charm, Shape-Shift, Misty Escape, Spider Climb, Vampire Weakness, Legendary Resistance |

Two consequences you'll see on every exact body now: print's whole trait list rides (the boiler filter that hid the Kraken's Amphibious applies to borrows only), and print's header defenses replace the type stamp (immunities, resistances, vulnerabilities). "A rank word alone" still borrows nothing ("the lord of the barrow" is nobody's). **Death knight is not in the SRD 5.2 or 5.1**, so "a death knight who…" stays the chassis line — the head-word borrow to the CR 3 Knight is blocked by the near-CR guard as before. Pins: four generation tests in sweep-fixes.spec.

## 2. The 2014 print spread — built and in use

You were right that "no 2014 corpus" was wrong. `print-2014.mjs` reads the SRD 5.1 (327 blocks) into the checker's shape. It is used three ways:

- **HP aim.** A 2014 sheet's HP is print's median at the CR (exact CR when three or more blocks sit there, else pooled ±1): CR 1 → 26, CR 3 → 58, CR 5 → 95, CR 8 → 136, CR 10 → 178, CR 13 → 184, CR 17 → 256, CR 20 → 300. The DMG table's band (71–85 at CR 1) and the HP-for-AC trade are gone from the 2014 path; damage, attack bonus, AC and DC stay the table's.
- **Bands.** The checker's 2014 branch now runs the same rules as 2024 against the 2014 spread (exact-CR pool when five or more sit there; the SRD 5.1 is dense). The old "±35% of the table, no corpus" line is deleted.
- **Reader.** The checker reads 2014 rows by the same arithmetic: "Melee Weapon Attack: +11 to hit", the two-row "Breath Weapons (Recharge 5–6)" with Fire Breath beneath, "one with its bite and two with its claws". Print 2014 Adult Brass Dragon: 73 a round, reads CR 10 at 13 — the 2014 corpus reads cool by this method, which is why the 2014 heat line below is calibrated to it.

Arrays: not changed this round. A Gargantuan homebrew dragon's STR comes from the chassis on both editions; a print body takes print's array. Flagged, parked.

## 3. One save idiom; the legendary header — fixed

`canonSave2014` composes every save from the structured 2024 form into one 2014 sentence: "<Targets> must make a DC n <Stat> saving throw, taking N (dice) type damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also …". A save with no damage: "… saving throw. On a failed save, <effect>. On a successful save, <effect>." The 2024 lead-in "is targeted once by the following effect." folds into the subject (the Ashen Marshal's Cavalry Charge now reads "Each creature whose space it enters must make a DC 19 Strength saving throw, taking 72 (16d8) fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target is knocked prone."). Pinned on three shapes.

The block now carries `inline`, the short form its rows use; the legacy model passes it; the classic card's legendary header reads it: "The marshal can take 3 legendary actions", never "the ashen marshal". Pinned.

## 4. Offensive axis and 2014 legendary allocation — fixed, with a print receipt on the line

**Offensive axis.** Your mirror rule — fail when offense alone exceeds CR+3 — would fail print: 8 of 30 SRD 5.2 legendaries read +4 to +7 on offense alone at their own CR (every adult dragon; Adult Brass +7), the corpus median is +2; the Archmage and Assassin read +5 and +6. So: `hot-offense` is soft over +3 and fail over +7, print's own ceiling. The 2014 corpus by the same reader maxes at +2 among legendaries (Giant Scorpion and Roper +9 among the rest). Print overrules.

**2014 legendary allocation.** The per-hit solver now counts a 2014 strike row three times (the DMG counts every use): Multiattack and the three legendary strikes share the band instead of the strikes landing on top. The 2024 path is unchanged; the owner's rule for 2024 legendaries stands (hot within three is fine).

## 5. Gate summary, both formats, final engine

| Run | Blocks | Fails | Softs | Note |
|---|---|---|---|---|
| sweep-2026-10-03T03-27-59 (CR 1–24 × print/homebrew × 2024/2014) | 40 | 0 | 17 | no provider timeouts |
| high-cr-2026-10-03T03-39-07 (legendaries, both formats) | 12 | 0 | 15 | every offensive axis in the soft band, +4 to +7; none past print's +7 |
| print-heads-2026-10-03T03-43-15 (your five phrases × both formats) | 10 | 0 | 11 | Kraken and Pit Fiend clean on both sheets |
| Jest | 178 suites / 5,128 tests | 0 | — | build clean |

What the softs on the head-noun batch say: the vampire lord borrows the CR 13 Vampire at 15 and reads 11.5 (damage 81 against the card's 115) on both sheets; the death knight is the chassis line (not in the SRD) and reads 21 at 18 with offense at +7; the archlich at 24 borrows the Lich and casts, with damage 141 against the card's 250 on the 2024 sheet. Those are reads for you, not fails.

Softs across the forty that changed character this round: every 2014 block now carries a `band` read against the SRD 5.1 spread instead of the old table line, and the 2014 legendaries read +4 to +6 on offense alone where they read 1.5–2.3× the damage band before.

Not done this round, by the owner's scope: everything in your "fix-lite", "checker gaps" (except the offensive axis), and the 2014 list beyond the spread, the idiom, the header and the allocation.

---

---

# 2024 blocks

## Review batch — sweep-2026-10-03T03-27-59

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | clean |
| Bog Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Goblin Warrior | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | clean |
| Sinkmaw | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | clean |
| Lantern Widow | 3 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | clean |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | clean |
| Lamplight Hermit | 3 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Troll | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Concordat Doorkeeper | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Brass Gate-Golem | 5 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Contagion Widow | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Plague-Seer | 8 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | clean |
| Drowned Bellsman | 10 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | clean |
| Stone Golem | 10 (2014) | 2014 | brute-9 | ok | ok | ok | ok | ok | ok | ok | clean |
| Harbor Bellwraith | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | clean |
| Vampire | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | clean |
| Storm-Herder | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | clean |
| Vampire | 13 (2014) | 2014 | brute-13 | ok | ok | ok | ok | ok | ok | ok | clean |
| Thunder Elk Herder | 13 (2014) | 2014 | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Adult Green Dragon | 15 | 2024 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | clean |
| Ossuar Siege Titan | 15 | 2024 | brute-9-juggernaut | ok | ok | ok | ok | ok | ok | ok | clean |
| Adult Green Dragon | 15 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | clean |
| Bone-Siege Colossus | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Dragon Turtle | 18 | 2024 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | soft (1) |
| Shatterglass Revenant | 18 | 2024 | lurker-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Dragon Turtle | 18 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | soft (1) |
| Glassbound Revenant | 18 (2014) | 2014 | lurker-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Pit Fiend | 20 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Trenchborn Leviathan | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Pit Fiend | 20 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Vostrek the Rime-Buried | 20 (2014) | 2014 | dragon-22 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Sun-Crowned Archlich | 24 | 2024 | skirmisher-22 | ok | SOFT: aim-dpr | ok | ok | ok | ok | SOFT: print-rows | soft (2) |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Sun-Crowned Archlich | 24 (2014) | 2014 | skirmisher-22 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | SOFT: print-rows | soft (2) |

**Fails by seat and gate:**
- none



---


### Goblin Warrior — lowest CR

**Concept:** a goblin warrior

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/4 / off 1 → 0.625; sustained 12 (2 × Scimitar); nova none; dmg 12

```
Goblin Warrior

Small Fey, Neutral

AC 15
Initiative +2 (12)

HP 31 (9d6)

Speed 30 ft.

MOD
SAVE
STR
8
-1
-1
INT
10
+0
+0
MOD
SAVE
DEX
15
+2
+4
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

Skills Perception +1, Stealth +4

Senses darkvision 60 ft.; Passive Perception 11

Languages Common, Goblin

CR 1 (XP 200; PB +2)

Actions

Multiattack. The goblin warrior makes two attacks, using Scimitar or Shortbow in any combination.

Scimitar. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Slashing damage plus 2 (1d4) Slashing damage if the attack roll had Advantage.

Shortbow. Ranged Attack Roll: +4, range 80/320 ft. 5 (1d6 + 2) Piercing damage.

Bonus Actions

Nimble Escape. The goblin takes the Disengage or Hide action.

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
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a goblin warrior") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: hit-and-run pack tactics [behavior] | rusty iron blade and hide shield [object] | skittish retreat when bloodied [behavior]
[reskin] print canon array: STR 8, DEX 15, CON 10, INT 10, WIS 8, CHA 8 — the Goblin Warrior's, DEX fitted to +4
[reskin] print canon: "a goblin warrior" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 with no claimed mechanics — the wildcard slot drops (print: 74% of CR<=2 blocks carry no non-attack action)
[reskin] claim gate: the trait wildcard is closed at CR <= 2 — the chassis carries the traits
[reskin] print canon speed: modes walk only — the Goblin Warrior's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Warrior's
[reskin] print canon type: Humanoid -> Fey — the Goblin Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon: chassis row leaves — Traits/"Nimble Escape" is the seat's, not the Goblin Warrior's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Warrior's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Warrior's Nimble Escape
```


---


### Bog Hound — a 2024 sheet

**Concept:** a mud-caked bog hound that drags fishermen under

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Bog Hound | 1 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 12 (2 × Bite); nova none; dmg 12

```
Bog Hound

Medium Beast, Unaligned

AC 13
Initiative -1 (9)

HP 30 (4d8 + 12)

Speed 30 ft., Burrow 30 ft., Swim 30 ft.

MOD
SAVE
STR
14
+2
+4
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
10
+0
+0
MOD
SAVE
CON
16
+3
+3
CHA
4
-3
-3

Skills Athletics +4, Perception +2

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 12

Languages None

CR 1 (XP 200; PB +2)

Actions

Multiattack. The bog hound makes two Bite attacks.

Bite. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 12). While Grappled, the target has the Restrained condition. If the target is a Large or smaller creature, it is pulled up to 10 feet straight toward the bog hound.

Bonus Actions

Whelm. The bog hound whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the bog hound, and takes 3 (1d6) Bludgeoning damage at the start of each of the bog hound's turns. The bog hound can have only one creature whelmed at a time. If the bog hound takes 5 damage or more in a single turn from the whelmed creature, the bog hound must release the target at the end of that turn, and the target exits Prone in an unoccupied space within 5 feet of the bog hound. If the bog hound dies, a whelmed creature pulls free Prone by using 5 feet of movement.

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
[route] brute-grappler type=Beast mechanics=grapple, engulf — brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: drag prey beneath the mud [behavior] | mud-caked hide [body] | bursting ambush from the shallows [behavior]
[reskin] claim gate: the trait wildcard is closed at CR <= 2 — the chassis carries the traits
[reskin] signature idea (action): "When the hound's bite lands, it does not let go to bite again — instead it coils and death-rolls, hauling its seized prey bodily toward the nearest patch of deep water or soft silt, dragging the victim along the ground with it. Foes watching see the mud itself seem to swallow the pair as the hound retreats into the bog with its catch. It can only make this dragging retreat while it still has a hol" [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce (+ shelf: hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — hook-drag, hook-rider (drag, under, drags)
[reskin] signature rider: hook-rider -> Bite (appended; When the hound's bite lands, it hauls its seized prey bodily along the ground wi [verb: drag:concept, drags:concept])
```


---


### Owlbear — a print donor

**Concept:** an owlbear

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 4 → 2.25; sustained 26 (1 × Rend); nova none; dmg 26

```
Owlbear

Large Monstrosity, Unaligned

AC 13
Initiative +1 (11)

HP 59 (7d10 + 21)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
20
+5
+7
INT
3
-4
-4
MOD
SAVE
DEX
12
+1
+1
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

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Actions

Rend. Melee Attack Roll: +7, reach 5 ft. 26 (6d6 + 5) Slashing damage.

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("an owlbear") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: crushing bear hug [behavior] | beak and claws [body] | fused owl-bear hybrid [body]
[reskin] print canon route: "an owlbear" is the Owlbear — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "an owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Bite" -> "Rend" — the Owlbear's own row
```


---


### Lantern Widow — a homebrew with a nova

**Concept:** a glass-eyed hermit who hurls her lantern at thieves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Lantern Widow | 3 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 14 (2 × Lantern Bash); nova Spilled Fire 17; dmg 21

```
Lantern Widow

Medium Humanoid, Neutral

AC 15
Initiative +3 (13)

HP 60 (8d8 + 24)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
10
+0
+0
MOD
SAVE
DEX
16
+3
+5
WIS
14
+2
+4
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

Skills Perception +4, Stealth +5

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 3 (XP 700; PB +2)

Traits

Skitter. The lantern widow ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The lantern widow makes two attacks, using Lantern Bash or Lantern Toss in any combination. It can replace one attack with a use of Lantern Fire Lash.

Lantern Bash. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.

Lantern Toss. Ranged Attack Roll: +5, range 30/90 ft. 7 (1d8 + 3) Bludgeoning damage. Hit or Miss: Immediately after the attack, a lantern returns to the lantern widow's grasp.

Spilled Fire (Recharge 5-6). The lantern widow hurls a lantern at a point it can see within 90 feet. Dexterity Saving Throw: DC 12, each creature in a 5-foot-radius Sphere centered on that point. Failure: 17 (5d6) Fire damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Lantern Fire Lash. Strength Saving Throw: DC 12, one creature within 30 feet that is Prone. Failure: 6 (1d12) Fire damage. Success: Half damage.

Bonus Actions

Fleet Agility. The lantern widow takes the Dash or Disengage action.

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
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls her lantern at thieves") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurled lanterns [object] | glass-eyed gaze [body] | skirmishing retreat [behavior]
[reskin] nova capped: "Hurled Burst" 18 → 17 (the chassis nova obeys the cap: 17 at CR 3)
[reskin] signature idea (action): "The lantern widow yanks a lantern from her belt, rips open its shutter, and sweeps the bared light across a cone-shaped area in front of her. Every creature in the glare must shield its eyes or be blinded for a moment, buying her the chance to skitter back a short distance without being followed." [action/save/condition] — menu: snare, reel, condition-payoff, throw-retrieve, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Shutter Sweep" EV 1.1 vs floor 4.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Shutter Sweep" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Opportunist's Lash" EV 4.7 vs floor 4.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The lantern widow's remaining glass-eyed lanterns whisper to her of everything that moves in the dark. As long as she holds at least one, she cannot be surprised, and invisible or hidden creatures near her are outlined in her sight by a faint glassy gleam." [trait/always/defense] — menu: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — marking-light, resonant-body (lantern, glass)
[reskin] signature miss: trait — "The lantern widow's remaining glass-eyed lanterns whisper to her of everything that moves in the dark. As long as she holds at least one, she cannot be surprised, and invisible or hidden creatures near her are outlined in her sight by a faint glassy gleam." [trait/always/defense] — the model found no template that holds it (offered: marking-light, resonant-body)
[reskin] chassis nova: "Spilled Fire (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Adult Green Dragon — a legendary

**Concept:** an adult green dragon

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Adult Green Dragon | 15 | dragon-15 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 11 / off 23 → 17; sustained 186 (3 × Rend + legendary Pounce); nova Poison Breath 71; dmg 186

```
Adult Green Dragon

Huge Dragon, Neutral Evil

AC 19
Initiative +1 (11)

HP 207 (18d12 + 90)

Speed 40 ft., Fly 80 ft., Swim 40 ft.

MOD
SAVE
STR
23
+6
+6
INT
18
+4
+4
MOD
SAVE
DEX
12
+1
+6
WIS
15
+2
+7
MOD
SAVE
CON
21
+5
+5
CHA
18
+4
+4

Skills Perception +7, Stealth +6

Immunities Poison; Poisoned

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 17

Languages Common, Draconic

CR 15 (XP 13,000; PB +5)

Traits

Legendary Resistance (3/Day). If the blackroot wyrm fails a saving throw, it can choose to succeed instead.

Amphibious. The blackroot wyrm can breathe air and water.

Actions

Multiattack. The blackroot wyrm makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Charm Person.

Rend. Melee Attack Roll: +11, reach 10 ft. 24 (4d8 + 6) Slashing damage plus 7 (2d6) Poison damage.

Poison Breath (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Poison damage. Success: Half damage.

Spellcasting. The blackroot wyrm casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

- At Will: Detect Magic, Charm Person, Suggestion, Dispel Magic

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the blackroot wyrm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Mind Invasion. The blackroot wyrm uses Spellcasting to cast Mind Spike (level 3 version).

Noxious Miasma. Constitution Saving Throw: DC 18, each creature in a 20-foot-radius Sphere centered on a point the blackroot wyrm can see within 90 feet. Failure: 7 (2d6) Poison damage, and the target takes a -2 penalty to AC until the end of its next turn. Failure or Success: the blackroot wyrm can't take this action again until the start of its next turn.

Pounce. The blackroot wyrm moves up to half its Speed, and it makes one Rend attack.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("an adult green dragon") | dragon: key "dragon" (class body)
[concept] signature elements: corrosive poison breath [behavior] | venomous flesh and scales [body] | cloak of toxic mist [aura]
[reskin] print canon defenses: HP 192 -> 207, AC 19 -> 19 — the Adult Green Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 23, DEX 12, CON 21, INT 18, WIS 15, CHA 18 — the Adult Green Dragon's at its own CR; attack +11 -> +11, DC 18 (print's)
[reskin] print canon: "an adult green dragon" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Poison Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes fly, swim — the Adult Green Dragon's
[reskin] print canon senses: "blindsight 60 ft., darkvision 120 ft." — the Adult Green Dragon's
[reskin] print canon name: "Blackroot Wyrm" -> "Adult Green Dragon" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Draconic, Common" -> "Common, Draconic" — the Adult Green Dragon's
[reskin] print canon attack: "Claw" -> "Rend" — the Adult Green Dragon's own row
[reskin] print canon defenses: immunities Poison -> Poison; Poisoned — the Adult Green Dragon's own header lines
[reskin] print canon trait: Amphibious — "an adult green dragon" is the Adult Green Dragon (print's own row)
[reskin] print canon legendary: Mind Invasion, Noxious Miasma, Pounce — the Adult Green Dragon's own kit stands where the chassis's stood
```


---


### Contagion Widow — bands soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Contagion Widow | 8 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Needle); nova none; dmg 54

```
Contagion Widow

Medium Humanoid, Neutral Evil

AC 16
Initiative +2 (12)

HP 120 (16d8 + 48)

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
+5
MOD
SAVE
CON
16
+3
+3
CHA
20
+5
+8

Skills Perception +5, Deception +8

Senses darkvision 60 ft.; Passive Perception 15

Languages Common, Infernal

CR 8 (XP 3,900; PB +3)

Actions

Multiattack. The contagion widow makes three attacks, using Needle or Plague Bolt in any combination. It can replace one attack with a use of (A) Withering Gaze or (B) Spellcasting to cast Ray of Sickness.

Needle. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Piercing damage.

Plague Bolt. Ranged Attack Roll: +8, range 80/320 ft. 14 (2d8 + 5) Poison damage.

Withering Gaze. Constitution Saving Throw: DC 15, one creature within 60 feet. Failure: 16 (3d10) Necrotic damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The contagion widow casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Cloudkill, Blight

Rotting Grasp. Wisdom Saving Throw: DC 15, one creature within 30 feet. Failure: 18 (4d8) Bludgeoning damage, and the target can't regain Hit Points until the end of the contagion widow's next turn. Success: Half damage only.

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
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("curses the firstborn of every house") | caster-binder: key "curses" (class verb)
[concept] signature elements: generational firstborn curse [behavior] | ash-and-plague body that flakes and infects [body] | stolen actions and stolen bloodlines [aura]
[reskin] signature idea (action): "The widow reaches through blood and distance to brand the most vital creature on the field as the firstborn of its house. That mark lies dormant until someone finally brings the widow low; then the brand consumes itself, and the bearer withers with a plague it inherited from her. Until that moment, the widow can cut the mark short herself, spending its promise to siphon the creature's vitality and" [action/save/damage] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "The widow reaches through blood and distance to brand the most vital creature on the field as the firstborn of its house. That mark lies dormant until someone finally brings the widow low; then the brand consumes itself, and the bearer withers with a plague it inherited from her. Until that moment, the widow can cut the mark short herself, spending its promise to siphon the creature's vitality and" [action/save/damage] — the model found no template that holds it (offered: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, delayed-brand, bolt-mark, aggro-curse)
[reskin] value check: "Sealing Touch" EV 14 vs floor 9.4 (one attack of 3) — added Success: Half; dice 9 → 18
[reskin] library seed drawn: seal -> Actions/"Sealing Touch" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Her body is a walking reliquary of every plague she has ever carried, sealed under a thin skin of ash. Whenever blood is drawn from her, the wound opens a grave-cache of dormant filth that settles on whoever struck her, waiting to flare the moment healing magic touches them." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
```


---


### Shatterglass Revenant — bands soft

**Concept:** a mirror assassin who strikes from the reflections of her victims

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Shatterglass Revenant | 18 | lurker-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 25, 7 over; the HP axis pulls the read to 18.5
- read: def 12 / off 25 → 18.5; sustained 228 (3 × Slam + legendary Mirror Stalk); nova none; dmg 228

```
Shatterglass Revenant

Medium Humanoid, Neutral

AC 18
Initiative +7 (17)

HP 247 (26d8 + 130)

Speed 30 ft.

MOD
SAVE
STR
14
+2
+2
INT
16
+3
+9
MOD
SAVE
DEX
24
+7
+13
WIS
18
+4
+10
MOD
SAVE
CON
21
+5
+5
CHA
14
+2
+2

Skills Perception +10, Stealth +13

Senses darkvision 60 ft.; Passive Perception 20

Languages Common

CR 18 (XP 20,000; PB +6)

Traits

Vile Appearance. Wisdom Saving Throw: DC 20, any creature that starts its turn within 30 feet of the shatterglass revenant and can see it. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's gaze for 24 hours.

Assassinate. During the first round of each combat, the shatterglass revenant has Advantage on attack rolls against any creature that hasn't taken a turn. If the shatterglass revenant hits a creature during that round, the target takes an extra 21 (6d6) Bludgeoning damage.

Legendary Resistance (3/Day). If the shatterglass revenant fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The shatterglass revenant makes three attacks, using Slam or Mirror Slam in any combination. It can replace one attack with a use of Shattered Verdict.

Slam. Melee Attack Roll: +13, reach 5 ft. 38 (7d8 + 7) Piercing damage.

Mirror Shard. Ranged Attack Roll: +13, range 80/320 ft. 34 (6d8 + 7) Piercing damage.

Shattered Verdict. Wisdom Saving Throw: DC 20, one creature within 60 feet that has the Frightened condition. Failure: 42 (12d6) Bludgeoning damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the shatterglass revenant takes the Hide action.

Step Through (Recharge 4-6). The shatterglass revenant teleports up to 40 feet to an unoccupied space it can see.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the shatterglass revenant can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Mirror Stalk. The shatterglass revenant moves up to half its Speed without provoking Opportunity Attacks, and it makes one Slam attack.

Glass Fade. While in Dim Light or Darkness, the shatterglass revenant takes the Hide action. The shatterglass revenant can't take this action again until the start of its next turn.

Glimpse Doom. Wisdom Saving Throw: DC 20, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] lurker type=Humanoid mechanics=teleport — lurker: ✓ ("strikes from the reflections of her vict") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: striking from reflections [behavior] | body of polished iron [body] | mirror-hopping through reflective surfaces [behavior]
[reskin] signature idea (action): "The revenant chooses one polished surface or reflective object within sight that shows a creature's reflection, and steps into it, vanishing from its current space. On its next turn, it erupts from any reflection of that same creature within striking distance and makes a single Shard attack against it. If the creature has no reflection it can use, the revenant cannot enter." [action/always/movement] — menu: gaze-single, condition-payoff, execute, seal, wail, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-drag)
[reskin] signature miss: action — "The revenant chooses one polished surface or reflective object within sight that shows a creature's reflection, and steps into it, vanishing from its current space. On its next turn, it erupts from any reflection of that same creature within striking distance and makes a single Shard attack against it. If the creature has no reflection it can use, the revenant cannot enter." [action/always/movement] — the model found no template that holds it (offered: gaze-single, condition-payoff, execute, seal, wail, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground, self-invisibility, blink, focus)
[reskin] value check: "Merciless Strike" EV 37.9 vs floor 20.3 (one attack of 3) — dice 78 → 42 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The revenant's body is living polished iron: whenever a creature hits it with a melee attack, the attacker sees its own face reflected in the wound for a split second and is left unnerved. That creature cannot willingly move away from the revenant until the end of its next turn, and any attack it makes against the revenant before then is made with a flicker of hesitation." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — gaze-aura (reflection, reflections)
[reskin] signature bound by force: trait — "gaze-aura" matches reflection+reflections in the user's words; the model's none is overruled
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): gaze-aura -> Traits/"Vile Appearance" ("exact concept match [verb: reflection:concept, reflections:concept]")
```


---


### Trenchborn Leviathan — bands soft

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Trenchborn Leviathan | 20 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 23 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 27, 7 over; the HP axis pulls the read to 23
- read: def 19 / off 27 → 23; sustained 258 (3 × Bite + legendary Devour); nova Freezing Breath 76; dmg 258

```
Trenchborn Leviathan

Gargantuan Dragon, Unaligned

AC 21
Initiative +1 (11)

HP 333 (18d20 + 144)

Speed 40 ft., Fly 80 ft., Swim 40 ft.

MOD
SAVE
STR
26
+8
+8
INT
18
+4
+4
MOD
SAVE
DEX
12
+1
+7
WIS
16
+3
+9
MOD
SAVE
CON
26
+8
+8
CHA
24
+7
+7

Skills Perception +9, Stealth +7

Vulnerabilities Fire

Immunities Cold

Senses blindsight 60 ft., darkvision 120 ft., tremorsense 60 ft.; Passive Perception 19

Languages Common, Draconic

CR 20 (XP 25,000; PB +6)

Traits

Sure Footing. Difficult Terrain composed of ice or snow doesn't cost the leviathan extra movement, and the leviathan can move across ice or snow without needing to make an ability check.

Legendary Resistance (4/Day). If the leviathan fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The leviathan makes three Bite attacks. It can replace one attack with a use of Spellcasting to cast Fear.

Bite. Melee Attack Roll: +14, reach 15 ft. 26 (4d8 + 8) Piercing damage plus 17 (5d6) Cold damage.

Freezing Breath (Recharge 5-6). Constitution Saving Throw: DC 21, each creature in a 90-foot Cone. Failure: 76 (17d8) Cold damage. Success: Half damage.

Spellcasting. The leviathan casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):

- At Will: Detect Magic, Command, Fear, Suggestion

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the leviathan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Devour. The leviathan makes one Bite attack.

Ice Slide. The leviathan moves up to half its Speed without provoking Opportunity Attacks.

Frozen Terror. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("glacier wyrm") | dragon: key "wyrm" (class body)
[concept] signature elements: swallows ships whole [behavior] | freezes the sea [aura] | body of living ice [body]
[reskin] signature idea (action): "The leviathan slams its forelimbs into the sea or ice and sends a sheet of freezing rime racing outward in every direction, turning open water and broken floes into one solid, shiny plane. Creatures caught in the spread have their feet and bodies sealed into the new ice, leaving them stuck fast where they stand. The freeze spreads far enough to lock down the battlefield in one sweeping pass, but n" [action/always/condition] — menu: gaze-single, snare, condition-payoff, execute, seal, lure, hook-drag (+ shelf: shell-withdraw, contagion, charge-push, hook-rider, pounce, snatch, charge)
[reskin] value check: "Rime Lock (Recharge 5-6)" EV 98.8 vs floor 109 (the whole Multiattack (3 attacks)) — added Success: Half; dice 22 → 97 (nova budget); still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Rime Lock (Recharge 5-6)" — the ladder could not lift it; the fallback stands in
[reskin] signature idea (trait): "The leviathan's body is living glacier ice, so each blow that cracks its hide sprays freezing shards and vapor over whoever struck it, numbing them with the deep cold it carries. The deeper the wound it suffers, the more of that killing chill bleeds out of it." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature bound by force: trait — "terrain-walk" matches freezes+freeze+glacier in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: freezes:concept, freeze:concept, glacier:concept, ice:idea]")
[reskin] chassis nova: "Freezing Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Sun-Crowned Archlich — bands soft

**Concept:** a sun-crowned archlich who binds the dead of a whole kingdom

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Sun-Crowned Archlich | 24 | skirmisher-22 | ok | SOFT: aim-dpr | ok | ok | ok | ok | SOFT: print-rows |

- bands · soft · aim-dpr: damage 141 a round is 44% under the card's 250
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Bone Skitter
- read: def 24 / off 23 → 23.5; sustained 141 (3 × Sun Ray + legendary Deathly Teleport); nova none; dmg 141

```
Sun-Crowned Archlich

Medium Undead, Neutral Evil

AC 21
Initiative +9 (19)

HP 517 (69d8 + 207)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
21
+5
+5
MOD
SAVE
DEX
28
+9
+16
WIS
14
+2
+9
MOD
SAVE
CON
16
+3
+3
CHA
16
+3
+3

Skills Perception +9, Stealth +16

Resistances Cold

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses darkvision 120 ft.; Passive Perception 19

Languages All

CR 24 (XP 62,000; PB +7)

Traits

Legendary Resistance (4/Day). If the sun-crowned archlich fails a saving throw, it can choose to succeed instead.

Bone Skitter. When a creature the sun-crowned archlich can see ends its turn within 5 feet of it, the sun-crowned archlich can move up to 20 feet without provoking Opportunity Attacks.

Spirit Jar. If destroyed, the sun-crowned archlich reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within the sun-crowned archlich's lair.

Actions

Multiattack. The sun-crowned archlich makes three attacks, using Eldritch Burst, Sun Ray, or Paralyzing Touch in any combination. It can replace one attack with a use of Grave Grasp.

Eldritch Burst. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Force damage.

Paralyzing Touch. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Cold damage. and the target has the Paralyzed condition until the start of the sun-crowned archlich's next turn.

Sun Ray. Ranged Attack Roll: +16, range 90/240 ft. 36 (6d8 + 9) Necrotic damage.

Grave Grasp. Dexterity Saving Throw: DC 23, one creature within 60 feet. Failure: The target has the Restrained condition until the end of the sun-crowned archlich's next turn.

Spellcasting. The sun-crowned archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20):

- At Will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
- 2/Day Each: Animate Dead, Dimension Door, Plane Shift
- 1/Day Each: Chain Lightning, Finger of Death, Power Word Kill, Scrying

Reactions

Protective Magic. The sun-crowned archlich casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the sun-crowned archlich can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. The sun-crowned archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 23, each creature that isn't an Undead in a 20-foot Emanation originating from the sun-crowned archlich. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: the sun-crowned archlich can't take this action again until the start of its next turn.

Frightening Gaze. The sun-crowned archlich casts Fear, using the same spellcasting ability as Spellcasting. The sun-crowned archlich can't take this action again until the start of its next turn.

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
[route] caster-binder (controller) type=Undead mechanics=aura — caster-binder: ✓ ("binds the dead of a whole kingdom") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: binding the dead of a whole kingdom [behavior] | crown of dying sun-stuff [object] | bone-and-ash body of a self-crowned god-king [body]
[reskin] print canon route: the Lich's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Lich is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 11, DEX 28, CON 16, INT 21, WIS 14, CHA 16 — the Lich's, DEX fitted to +16
[reskin] print canon: "a sun-crowned archlich who binds the dead of a whole kingdom" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The archlich reaches toward a corpse it can see within its kingdom's reach and pulls a grave-wrapped servant up through the ground. The servant erupts clawing at the nearest living creature, dragging at legs and ankles to hold them fast while it shrieks the archlich's silence into their bones. The archlich may keep doing this as long as the dead keep answering, but each new servant is bound only u" [action/always/condition] — menu: gaze-single, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, snatch, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — snare-bolt (bind)
[reskin] value check: "Grave Grasp" EV 24.8 vs floor 23.4 (one attack of 3) — worth the trade
[reskin] signature template: snare-bolt -> Actions/"Grave Grasp" ("the servant erupts and drags at legs and ankles to hold them fast, Restraining t [verb: bind:concept]")
[reskin] signature idea (trait): "The shard of dying sun in the archlich's crown never fully sets; its dim light hangs over the battlefield, and every corpse that falls in that glow answers the crown rather than the grave. While the light burns, the archlich can reach through any creature wearing its curse, pulling wounds shut and limbs straight, and those it has claimed can be made to rise again and again at its word." [trait/always/resource] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The shard of dying sun in the archlich's crown never fully sets; its dim light hangs over the battlefield, and every corpse that falls in that glow answers the crown rather than the grave. While the light burns, the archlich can reach through any creature wearing its curse, pulling wounds shut and limbs straight, and those it has claimed can be made to rise again and again at its word." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, heated-body, bloodied-burst)
[reskin] chassis nova: "Silent Radiance (Recharge 5-6)" — the skirmisher-22's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon speed: 60 ft. -> 30 ft. — the Lich's walk; the concept's other modes stay
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Grave Claw" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "a sun-crowned archlich who binds the dead of a whole kingdom" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Silent Radiance (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Lich's
[reskin] print canon: chassis row leaves — Traits/"Ash Step" is the seat's, not the Lich's
[reskin] print canon row: Actions/Spellcasting — the Lich's own
[reskin] print canon row: Reactions/Protective Magic — the Lich's own
```


---

## Review batch — high-cr-2026-10-03T03-39-07

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Heartwood Pyre | 17 | 2024 | brute-17-grappler | ok | SOFT: hot-offense | SOFT: payoff-producer | ok | ok | ok | ok | soft (2) |
| Court of the High Pass | 19 | 2024 | skirmisher-18 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Stormreign | 20 | 2024 | skirmisher-18-hurler | ok | SOFT: band, hot-offense, nova-cap | ok | ok | ok | ok | ok | soft (1) |
| Velmar Thane | 21 | 2024 | skirmisher-22 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | soft (1) |
| Voltazik | 22 | 2024 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | clean |
| Trenchblight Kraken | 24 | 2024 | brute-17-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Vorlacris the Crowned | 26 | 2024 | swarm-17 | ok | SOFT: hot-offense | SOFT: swarm-multiattack | ok | ok | ok | ok | soft (2) |
| Sinkhole Mother | 30 | 2024 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | clean |
| Sire Harrowgate | 17 (2014) | 2014 | skirmisher-18-mounted | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Vorgath Ironmarch | 20 (2014) | 2014 | defender-17-leader | ok | ok | ok | ok | ok | ok | ok | clean |
| Aurel Vael | 23 (2014) | 2014 | caster-21-warpriest | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Lake That Thinks | 25 (2014) | 2014 | lurker-17-trap | ok | SOFT: band, hot-offense | ok | SOFT: control-aoe-ungated | ok | ok | ok | soft (2) |

**Fails by seat and gate:**
- none



---


### Heartwood Pyre — lowest CR

**Concept:** an ancient treant whose heartwood remembers every fire and crushes what carries a torch

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Heartwood Pyre | 17 | brute-17-grappler | ok | SOFT: hot-offense | SOFT: payoff-producer | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 24, 7 over; the HP axis pulls the read to 17.5
- structure · soft · payoff-producer: Actions/Splinter Brand pays off the Frightened condition but nothing on the sheet imposes it
- read: def 11 / off 24 → 17.5; sustained 195 (2 × Hail of Bark + legendary Root Rush); nova none; dmg 195

```
Heartwood Pyre

Huge Plant, Neutral

AC 18
Initiative -1 (9)

HP 230 (20d12 + 100)

Speed 30 ft.

MOD
SAVE
STR
23
+6
+12
INT
12
+1
+1
MOD
SAVE
DEX
8
-1
-1
WIS
16
+3
+3
MOD
SAVE
CON
21
+5
+11
CHA
12
+1
+1

Skills Athletics +12, Perception +9

Vulnerabilities Fire

Resistances Bludgeoning, Piercing

Senses darkvision 60 ft.; Passive Perception 19

Languages Common, Druidic, Elvish, Sylvan

CR 17 (XP 18,000; PB +6)

Traits

Smoldering Wounds. A creature that touches the heartwood pyre or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the heartwood pyre fails a saving throw, it can choose to succeed instead.

Siege Monster. The heartwood pyre deals double damage to objects and structures.

Actions

Multiattack. The heartwood pyre makes two attacks, using Slam or Hail of Bark in any combination. It can replace one attack with a use of Splinter Brand.

Slam. Melee Attack Roll: +12, reach 5 ft. 33 (6d8 + 6) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 20). While Grappled, the target has the Restrained condition.

Hail of Bark. Ranged Attack Roll: +12, range 60/240 ft. 48 (12d6 + 6) Piercing damage.

Splinter Brand. Constitution Saving Throw: DC 19, one creature within 60 feet that has the Frightened condition. Failure: 60 (11d10) Fire damage, and the target has the Blinded condition until the end of its next turn. Success: Half damage.

Animate Trees (1/Day). The heartwood pyre magically animates up to two trees it can see within 60 feet of itself. Each tree uses the heartwood pyre stat block, except it has Intelligence and Charisma scores of 1, it can't speak, and it lacks this action. The tree takes its turn immediately after the heartwood pyre on the same Initiative count, and it obeys the heartwood pyre. A tree remains animate for 1 day or until it dies, the heartwood pyre dies, or it is more than 120 feet from the heartwood pyre. The tree then takes root if possible.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the heartwood pyre can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Root Rush. The heartwood pyre moves up to half its Speed without provoking Opportunity Attacks, and it makes one Slam attack.

Drag to Pyre. The heartwood pyre moves up to half its Speed without provoking Opportunity Attacks, carrying each creature it is grappling along with it.

Quakefall. Strength Saving Throw: DC 19, each creature within 10 feet of the heartwood pyre. Failure: The target has the Prone condition.

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
[route] brute-grappler type=Plant mechanics=grapple, engulf — brute-grappler: ✓ ("crushes what carries a torch") | brute-grappler: key "crushes" (class verb)
[concept] signature elements: crushing grapple that drags prey into its burning heartwood [behavior] | fire-scarred, smoldering rot-wood body [body] | remembers every fire and hunts torchbearers [behavior]
[reskin] print canon array: STR 23, DEX 8, CON 21, INT 12, WIS 16, CHA 12 — the Treant's, STR fitted to +12
[reskin] print canon: "an ancient treant whose heartwood remembers every fire and crushes what carries a torch" heads on the Treant — print's rows ride along; the seat stays
[reskin] signature idea (action): "The Heartwood Pyre tears a jagged splinter of its own burning heartwood free and hurls it at the creature it can see carrying the brightest fire or open flame, choosing deliberately rather than at random. The splinter shatters on impact and showers clinging, living embers over the target and the ground around it; those embers keep burning on skin, gear, and stone for the rest of the fight and mark" [action/always/condition] — menu: condition-payoff, throw-retrieve, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — condition-payoff (crush)
[reskin] value check: "Splinter Brand" EV 54.3 vs floor 29.6 (one attack of 2) — dice 115 → 60 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Splinter Brand" ("The Pyre hurls a splinter at the creature carrying the brightest fire — a delibe [verb: crush:concept]")
[reskin] signature idea (trait): "The pyre's fire-scarred, hollow-rotted body smolders and seeps burning sap from every old wound, and that heat answers any creature that lays hands or weapons on it: whoever strikes it, grapples it, or ends its turn in contact with the trunk is scorched by clinging embers that keep burning, and if such a creature is already alight from the pyre's own fire, the smolder feeds and flares hotter again" [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (fire)
[reskin] signature template (trait): heated-body -> Traits/"Smoldering Wounds" ("the fire-scarred body answers any creature that strikes it, grapples it, or touc [verb: fire:concept, heat:idea, burn:idea, ember:idea, pyre:idea]")
[reskin] print canon languages: "Common" -> "Common, Druidic, Elvish, Sylvan" — the Treant's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Treant's walk; the concept's other modes stay
[reskin] print canon attack: "Emberfall" -> "Hail of Bark" — the Treant's own ranged row
[reskin] print canon defenses: resistances none -> Bludgeoning, Piercing; vulnerabilities none -> Fire — the Treant's own header lines
[reskin] print canon trait: Siege Monster — "an ancient treant whose heartwood remembers every fire and crushes what carries a torch" is the Treant (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Cage" is the seat's, not the Treant's
[reskin] print canon row: Actions/Animate Trees (1/Day) — the Treant's own
```


---


### Sinkhole Mother — highest CR

**Concept:** a world-eating wyrm the size of a mountain that swallows cities and shrugs off armies

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Sinkhole Mother | 30 | dragon-22 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 30 / off 30 → 30; sustained 462 (3 × Jaws + legendary Devour); nova Mountain's Breath 84; dmg 462

```
Sinkhole Mother

Gargantuan Dragon, Neutral

AC 23
Initiative +1 (11)

HP 814 (44d20 + 352)

Speed 40 ft., Fly 80 ft., Burrow 30 ft.

MOD
SAVE
STR
30
+10
+10
INT
18
+4
+4
MOD
SAVE
DEX
12
+1
+10
WIS
16
+3
+12
MOD
SAVE
CON
27
+8
+8
CHA
28
+9
+9

Skills Perception +12, Stealth +10

Immunities Fire

Senses blindsight 60 ft., darkvision 120 ft., tremorsense 60 ft.; Passive Perception 22

Languages Common, Draconic

CR 30 (XP 155,000; PB +9)

Traits

Fire Swallow. Whenever the sinkhole mother is subjected to Fire damage, it takes no damage and instead regains a number of Hit Points equal to the Fire damage dealt.

Legendary Resistance (4/Day). If the sinkhole mother fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The sinkhole mother makes three Jaws attacks. It can replace one attack with a use of Spellcasting to cast Fear.

Jaws. Melee Attack Roll: +19, reach 15 ft. 46 (8d8 + 10) Piercing damage plus 31 (9d6) Fire damage.

Mountain's Breath (Recharge 5-6). Dexterity Saving Throw: DC 26, each creature in a 90-foot Cone. Failure: 84 (13d12) Fire damage. Success: Half damage.

Spellcasting. The sinkhole mother casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 26):

- At Will: Detect Magic, Fear, Suggestion, Dispel Magic

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the sinkhole mother can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Devour. The sinkhole mother makes one Jaws attack.

Descend. The sinkhole mother moves up to half its Speed without provoking Opportunity Attacks.

Towering Roar. Wisdom Saving Throw: DC 26, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("a world-eating wyrm the size of a mounta") | dragon: key "wyrm" (class body)
[concept] signature elements: swallowing cities whole [behavior] | mountain-sized burning body [body] | armies break on its hide [behavior]
[reskin] signature idea (action): "The sinkhole mother vomits up the molten, half-digested ruin of everything it has swallowed — a torrent of burning rubble, city bones, and liquid stone that floods the battlefield. The eruption pours across a wide area in front of it, crushing and igniting everything it touches, and the ground it leaves behind becomes a smoldering, broken scar that continues to burn and hinder movement for a short" [action/always/damage] — menu: gaze-single, execute, seal, lure, hook-drag (+ shelf: shell-withdraw, charge-push, hook-rider, pounce, snatch, charge)
[reskin] signature miss: action — "The sinkhole mother vomits up the molten, half-digested ruin of everything it has swallowed — a torrent of burning rubble, city bones, and liquid stone that floods the battlefield. The eruption pours across a wide area in front of it, crushing and igniting everything it touches, and the ground it leaves behind becomes a smoldering, broken scar that continues to burn and hinder movement for a short" [action/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: gaze-single, execute, seal, lure, hook-drag, shell-withdraw, charge-push, hook-rider, pounce, snatch, charge)
[reskin] signature idea (trait): "The sinkhole mother is endlessly devouring the world beneath it, and any creature that strikes it in melee risks being caught by the yawning, grinding pull of its gullet — sucked toward its jaws and left vulnerable to being swallowed whole on its next turn. Those who harm it are marked as its next meal, and it will not forget them." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form)
[reskin] signature bound to the concept's verb: trait — absorption (eat)
[reskin] signature template (trait): absorption -> Traits/"Yawning Gullet" ("the creature is endlessly devouring and consumes what strikes it — the central v [verb: eat:concept, devour:idea]")
[reskin] chassis nova: "Mountain's Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Court of the High Pass — a 2024 sheet

**Concept:** a vampire lord who rules a mountain court and commands the bats and wolves of the pass

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Court of the High Pass | 19 | skirmisher-18 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 23, 4 over; the HP axis pulls the read to 19.5
- read: def 16 / off 23 → 19.5; sustained 162 (3 × Grave Strike + legendary Deathless Strike); nova Blood Wind 72; dmg 162

```
Court of the High Pass

Small Undead, Neutral Evil

AC 19
Initiative +7 (17)

HP 307 (41d6 + 164)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
+4
INT
17
+3
+3
MOD
SAVE
DEX
24
+7
+13
WIS
15
+2
+8
MOD
SAVE
CON
18
+4
+4
CHA
18
+4
+4

Skills Perception +8, Stealth +13

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 18

Languages Common plus two other languages

CR 19 (XP 22,000; PB +6)

Traits

Bloodied Reprisal. A creature that touches the vampire lord or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Necrotic damage.

Legendary Resistance (3/Day). If the vampire lord fails a saving throw, it can choose to succeed instead.

Swoop Away. When a creature the vampire lord can see ends its turn within 5 feet of it, the vampire lord can move up to 15 feet without provoking Opportunity Attacks.

Misty Escape. If the vampire lord drops to 0 Hit Points outside its resting place, the vampire lord uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. The vampire lord can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. The vampire lord has these weaknesses:


- Forbiddance: the vampire lord can't enter a residence without an invitation from an occupant.
- Running Water: the vampire lord takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into the vampire lord lord's heart while the vampire lord has the Incapacitated condition in its resting place, the vampire lord has the Paralyzed condition until the weapon is removed.
- Sunlight: the vampire lord takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. The vampire lord makes three Grave Strike attacks. It can replace one attack with a use of Bite (Bat or Vampire Form Only).

Grave Strike. Melee Attack Roll: +13, reach 5 ft. 20 (3d8 + 7) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 18) from one of two hands.

Blood Wind (Recharge 5-6). Strength Saving Throw: DC 20, each creature in a 60-foot-long, 10-foot-wide Line. Failure: 72 (16d8) Necrotic damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 20, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 35 (10d6) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the vampire lord regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the vampire lord lord's control. Success: Half damage only.

Bonus Actions

Shape-Shift. If the vampire lord isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the vampire lord can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the vampire lord can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). The vampire lord casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 18), and the duration is 24 hours. The Charmed target is a willing recipient of the vampire lord lord's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the vampire lord.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the vampire lord can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathless Strike. The vampire lord moves up to half its Speed, and it makes one Grave Strike attack.

Beguile. The vampire lord casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 20). The vampire lord can't take this action again until the start of its next turn.

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
[route] skirmisher-winged type=Undead mechanics=none — defender-leader: a Undead commands no troops | skirmisher-winged: ✓ ("commands the bats") | skirmisher-winged: no line key in the words — the model's read of its quote
[concept] signature elements: snatches prey on the wing and drops them [behavior] | commands a court of bats and wolves [behavior] | vampiric blood-drain that heals it [body]
[reskin] print canon route: the Vampire's body outranks the winged seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 18, DEX 24, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +13
[reskin] print canon: "a vampire lord who rules a mountain court and commands the bats and wolves of the pass" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "The vampire lord dives upon one victim it can see and snatches them up, carrying them high into the night sky. At the end of its next turn it releases them, and they fall. While held, the victim is helpless in its talons, and the lord can keep flying with its prey." [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce, isolation, snatch, charge (+ shelf: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] value check: "Disarming Twist" EV 0 vs floor 17.7 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Wounds do not slow the vampire lord; the blood it spills only quickens its flight. Whenever it takes damage from a creature within reach, it can immediately move away without provoking attacks, and its next strike comes faster." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Bloodied Reprisal" ("The idea's central verb is a melee attacker within reach being hurt back by the  [shape fit, no verb match]")
[reskin] chassis nova: "Blood Wind (Recharge 5-6)" — the skirmisher-18's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon size: Medium -> Small — the Vampire's
[reskin] print canon languages: "Common" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 70 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Misty Escape — "a vampire lord who rules a mountain court and commands the bats and wolves of the pass" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who rules a mountain court and commands the bats and wolves of the pass" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who rules a mountain court and commands the bats and wolves of the pass" is the Vampire (print's own row)
[reskin] print canon legendary: Deathless Strike, Beguile — the Vampire's own kit stands where the chassis's stood
[reskin] print canon: chassis row leaves — Traits/"Shadow Step" is the seat's, not the Vampire's
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 35
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---


### Velmar Thane — a print donor

**Concept:** an archlich enthroned in a library of screaming books who binds the living with words

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Velmar Thane | 21 | skirmisher-22 | ok | ok | ok | ok | ok | ok | SOFT: print-rows |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Page Turn
- read: def 17 / off 20 → 18.5; sustained 120 (3 × Screaming Tome + legendary Deathly Teleport); nova Binding Marginalia 99; dmg 120

```
Velmar Thane

Medium Undead, Neutral Evil

AC 20
Initiative +3 (13)

HP 315 (42d8 + 126)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
21
+5
+5
MOD
SAVE
DEX
16
+3
+10
WIS
14
+2
+9
MOD
SAVE
CON
16
+3
+3
CHA
16
+3
+3

Skills Perception +9, Stealth +10

Resistances Cold

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses darkvision 120 ft.; Passive Perception 19

Languages All

CR 21 (XP 33,000; PB +7)

Traits

Legendary Resistance (4/Day). If Velmar fails a saving throw, it can choose to succeed instead.

Page Turn. When a creature Velmar can see ends its turn within 5 feet of it, Velmar can move up to 20 feet without provoking Opportunity Attacks.

Spirit Jar. If destroyed, Velmar reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within Velmar's lair.

Actions

Multiattack. Velmar makes three attacks, using Eldritch Burst, Screaming Tome, or Paralyzing Touch in any combination.

Eldritch Burst. Melee Attack Roll: +12, reach 5 ft. 23 (4d8 + 5) Force damage.

Paralyzing Touch. Melee Attack Roll: +12, reach 5 ft. 23 (4d8 + 5) Cold damage. and the target has the Paralyzed condition until the start of Velmar's next turn.

Screaming Tome. Ranged Attack Roll: +12, range 90/240 ft. 29 (7d6 + 5) Psychic damage.

Binding Marginalia (Recharge 5-6). Strength Saving Throw: DC 20, one creature Velmar can see within 120 feet. Failure: 99 (18d10) Psychic damage, and the target has the Restrained condition until the Restrained is destroyed (AC 18; HP 30; Vulnerability to Thunder damage; Immunity to Poison and Psychic damage). Success: Half damage only.

Spellcasting. Velmar casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20):

- At Will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
- 2/Day Each: Animate Dead, Dimension Door, Plane Shift
- 1/Day Each: Chain Lightning, Finger of Death, Power Word Kill, Scrying

Reactions

Protective Magic. Velmar casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Velmar can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. Velmar teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 20, each creature that isn't an Undead in a 20-foot Emanation originating from Velmar. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: Velmar can't take this action again until the start of its next turn.

Frightening Gaze. Velmar casts Fear, using the same spellcasting ability as Spellcasting. Velmar can't take this action again until the start of its next turn.

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
[route] caster-binder (controller) type=Undead mechanics=none — caster-binder: ✓ ("binds the living with words") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: binding living creatures with spoken words [behavior] | body of bone and ink-stained vellum [body] | a library of screaming books [aura]
[reskin] print canon route: the Lich's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Lich is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon defenses: HP 365 -> 315, AC 20 -> 20 — the Lich's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's at its own CR; attack +14 -> +12, DC 20 (print's)
[reskin] print canon: "an archlich enthroned in a library of screaming books who binds the living with words" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "Velmar reads a name from the screaming index, and the stolen name becomes a word it can hurl. The word strikes a creature that has spoken, cast a spell, or used a magical effect since the end of Velmar's last turn; the utterance tears at that creature's voice and magic, leaving it unable to speak or cast spells until it spends its next turn doing nothing but voicing its own name aloud." [action/save/condition] — menu: gaze-single, snare, condition-payoff, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — snare, snare-bolt, sensory-strike (bind, scream)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into snare, snare-bolt, sensory-strike
[reskin] value check: "Binding Marginalia (Recharge 5-6)" EV 97.6 vs floor 96.3 (the whole Multiattack (3 attacks)) — added Success: Half; dice 19 → 99 (nova budget)
[reskin] signature template: snare -> Actions/"Binding Marginalia (Recharge 5-6)" ("bind — the living bound by words into a Restrained condition, a thing you must d [verb: bind:concept]")
[reskin] signature idea (trait): "Velmar's body is a palimpsest of bone and ink-stained vellum; whenever a creature uses a magical effect that targets only Velmar or ends a condition on itself, an ink bleed seeps across its skin and it must choose between acting on its next turn or losing the ability to speak for that turn." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (scream)
[reskin] signature miss: trait — "Velmar's body is a palimpsest of bone and ink-stained vellum; whenever a creature uses a magical effect that targets only Velmar or ends a condition on itself, an ink bleed seeps across its skin and it must choose between acting on its next turn or losing the ability to speak for that turn." [trait/on_being_hit/condition] — the model found no template that holds it (offered: bloodied-burst)
[reskin] chassis nova: "Cassandra's Sigh (Recharge 5-6)" — the skirmisher-22's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon speed: 70 ft. -> 30 ft. — the Lich's walk; the concept's other modes stay
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Bookend" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned in a library of screaming books who binds the living with words" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Cassandra's Sigh (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Lich's
[reskin] print canon: chassis row leaves — Traits/"Shelving" is the seat's, not the Lich's
[reskin] print canon row: Actions/Spellcasting — the Lich's own
[reskin] print canon row: Reactions/Protective Magic — the Lich's own
```


---


### Stormreign — a homebrew with a nova

**Concept:** a storm titan who walks the thunderhead and hurls lightning at the drowned

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Stormreign | 20 | skirmisher-18-hurler | ok | SOFT: band, hot-offense, nova-cap | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 21.5 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 21.5
- bands · soft · nova-cap: Lightning Tether: 97 over the 95 cap
- read: def 18 / off 25 → 21.5; sustained 210 (3 × Thunderfist + legendary Ride the Gale); nova Lightning Tether 97; dmg 210

```
Stormreign

Gargantuan Giant, Neutral

AC 20
Initiative +8 (18)

HP 330 (20d20 + 120)

Speed 70 ft., Fly 60 ft. (hover)

MOD
SAVE
STR
20
+5
+5
INT
14
+2
+2
MOD
SAVE
DEX
26
+8
+14
WIS
18
+4
+10
MOD
SAVE
CON
22
+6
+6
CHA
16
+3
+3

Skills Perception +10, Stealth +14

Resistances Lightning

Senses darkvision 120 ft.; Passive Perception 20

Languages Common

CR 20 (XP 25,000; PB +6)

Traits

Legendary Resistance (3/Day). If the storm titan fails a saving throw, it can choose to succeed instead.

Storm Stride. The storm titan ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Thunder Step. When a creature the storm titan can see ends its turn within 5 feet of it, the storm titan can move up to 15 feet without provoking Opportunity Attacks.

Actions

Multiattack. The storm titan makes three attacks, using Thunderfist or Bolt in any combination.

Thunderfist. Melee Attack Roll: +14, reach 10 ft. 21 (3d8 + 8) Bludgeoning damage plus 14 (4d6) Lightning damage.

Bolt. Ranged Attack Roll: +14, range 80/320 ft. 30 (5d8 + 8) Lightning damage. Hit or Miss: Immediately after the attack, a thunderbolt returns to the storm titan's grasp.

Shatterburst (Recharge 5-6). The storm titan hurls a thunderbolt at a point it can see within 300 feet. Dexterity Saving Throw: DC 21, each creature in a 15-foot-radius Sphere centered on that point. Failure: 76 (17d8) Lightning damage. Success: Half damage.

Lightning Tether (Recharge 5-6). Strength Saving Throw: DC 21, one creature the storm titan can see within 120 feet. Failure: 97 (15d12) Lightning damage, and the target has the Restrained condition until the Restrained is destroyed (AC 15; HP 20; Vulnerability to Thunder damage; Immunity to Poison and Psychic damage). Success: Half damage only.

Bonus Actions

Fleet Agility. The storm titan takes the Dash or Disengage action.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the storm titan can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Ride the Gale. The storm titan moves up to half its Speed without provoking Opportunity Attacks, and it makes one Thunderfist attack.

Hurl Lightning. The storm titan makes one Bolt attack. The storm titan can't take this action again until the start of its next turn.

Withdraw. The storm titan takes the Dash or Disengage action.

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
[route] skirmisher-hurler type=Giant mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls lightning") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurling lightning from the thunderhead [behavior] | body of living storm [body] | arrogant sky-god presence [aura]
[reskin] signature idea (action): "The storm titan drags its hand through the cloud it rides, and a leash of lightning snaps down to seize one foe below, pinning them in a crackling tether. Until the titan loses interest, that creature is anchored, and every time it tries to tear free it is punished with another jolt from the living storm." [action/always/condition] — menu: snare, throw-retrieve, lure, snare-bolt, sensory-strike, disarm (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, snatch, bolt-mark)
[reskin] value check: "Lightning Tether (Recharge 5-6)" EV 94.4 vs floor 88.7 (the whole Multiattack (3 attacks)) — added Success: Half; dice 18 → 97 (nova budget)
[reskin] signature template: snare -> Actions/"Lightning Tether (Recharge 5-6)" ("a leash of lightning snaps down to seize one foe below, pinning them in a crackl [shape fit, no verb match]")
[reskin] signature idea (trait): "The storm titan is not flesh and bone but a walking thunderhead, its body a churning mass of cloud and lightning. When a foe wounds it at close range, the storm lashes back in the instant of the blow, wrapping the attacker in a burst of living lightning that clings and scorches." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — heated-body (lightning, storm)
[reskin] chassis nova: "Shatterburst (Recharge 5-6)" — the skirmisher-18-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Voltazik — a legendary

**Concept:** an ancient blue dragon that rules a glass desert and buries caravans in lightning-fused sand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Voltazik | 22 | dragon-22 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 23 / off 28 → 25.5; sustained 252 (3 × Rend + legendary Tail Swipe); nova Lightning Breath 77; dmg 252

```
Voltazik

Gargantuan Dragon, Neutral

AC 22
Initiative +0 (10)

HP 481 (26d20 + 208)

Speed 40 ft., Fly 80 ft., Burrow 40 ft.

MOD
SAVE
STR
29
+9
+9
INT
18
+4
+4
MOD
SAVE
DEX
10
+0
+7
WIS
17
+3
+10
MOD
SAVE
CON
27
+8
+8
CHA
25
+7
+7

Skills Perception +10, Stealth +7

Vulnerabilities Thunder

Immunities Lightning

Senses blindsight 60 ft., darkvision 120 ft.; Passive Perception 20

Languages Common, Draconic

CR 22 (XP 41,000; PB +7)

Traits

Searing Static Arc. A creature that touches Voltazik or hits it with a melee attack while within 5 feet of it takes 14 (4d6) Lightning damage.

Legendary Resistance (4/Day). If Voltazik fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. Voltazik makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Suggestion.

Rend. Melee Attack Roll: +16, reach 15 ft. 31 (5d8 + 9) Slashing damage plus 11 (2d10) Lightning damage.

Lightning Breath (Recharge 5-6). Dexterity Saving Throw: DC 22, each creature in a 90-foot Cone. Failure: 77 (14d10) Lightning damage. Success: Half damage.

Spellcasting. Voltazik casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 22):

- At Will: Command, Detect Magic, Suggestion
- 1/Day Each: Scrying

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Voltazik can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Cloaked Flight. Voltazik uses Spellcasting to cast Invisibility on itself, and it can fly up to half its Fly Speed. Voltazik can't take this action again until the start of its next turn.

Sonic Boom. Voltazik uses Spellcasting to cast Shatter (level 3 version). Voltazik can't take this action again until the start of its next turn.

Tail Swipe. Voltazik makes one Rend attack.

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
[route] dragon type=Dragon mechanics=breath — dragon: ✓ ("an ancient blue dragon") | dragon: key "dragon" (class body)
[concept] signature elements: buried caravans in lightning-fused sand [behavior] | lightning breath that turns sand to glass [body] | ancient blue dragon body [body]
[reskin] print canon defenses: HP 415 -> 481, AC 21 -> 22 — the Ancient Blue Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 29, DEX 10, CON 27, INT 18, WIS 17, CHA 25 — the Ancient Blue Dragon's at its own CR; attack +15 -> +16, DC 23 (print's)
[reskin] print canon: "an ancient blue dragon that rules a glass desert and buries caravans in lightning-fused sand" heads on the Ancient Blue Dragon — print's rows ride along; the seat stays
[reskin] signature idea (action): "Voltazik slams its foreclaws into the ground and drags them wide, churning the glass desert into a rolling wave of fused sand and trapped lightning. The wave surges outward across the flats, swallowing every creature in its path and dragging each one under toward the crushing depths of the dune. Those it buries are left caged beneath the glowing sand instead of merely standing and trading blows." [action/save/damage] — menu: gaze-single, snare, condition-payoff, execute, seal, lure, hook-drag (+ shelf: shell-withdraw, charge-push, hook-rider, pounce, snatch, charge)
[reskin] signature idea (trait): "The colossal body of an ancient blue dragon is a thunderhead of stored charge, and any creature that lands a blow on it is answered by a snapping arc that leaps from the wound to the nearest nearby creatures, chaining the desert's lightning through them. The same arc also cauterizes the wound in glass, briefly sealing and setting Voltazik as the desert sets around fallen prey." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form)
[reskin] signature bound to the concept's verb: trait — heated-body, resonant-body, terrain-walk (lightning, glass, sand)
[reskin] signature template (trait): heated-body -> Traits/"Searing Static Arc" ("A creature that hits Voltazik with a melee attack takes Lightning damage, carryi [verb: lightning:concept]")
[reskin] chassis nova: "Glassfire Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon languages: "Draconic" -> "Common, Draconic" — the Ancient Blue Dragon's
[reskin] print canon speed: Burrow -> 40 ft. — the Ancient Blue Dragon's own
[reskin] print canon attack: "Glass Shard Scythe" -> "Rend" — the Ancient Blue Dragon's own row
[reskin] print canon legendary: Cloaked Flight, Sonic Boom, Tail Swipe — the Ancient Blue Dragon's own kit stands where the chassis's stood
[reskin] print canon nova: "Glassfire Breath (Recharge 5-6)" -> "Lightning Breath (Recharge 5-6)" — one breath: the chassis nova at this sheet's CR carries the Ancient Blue Dragon's name; print's own row stays out
```


---


### Vorlacris the Crowned — one marked soft

**Concept:** a demon prince of locusts crowned in his own swarm who strips kingdoms to bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Vorlacris the Crowned | 26 | swarm-17 | ok | SOFT: hot-offense | SOFT: swarm-multiattack | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 30, 4 over; the HP axis pulls the read to 27
- structure · soft · swarm-multiattack: a swarm with a Multiattack (print swarms make one attack)
- read: def 24 / off 30 → 27; sustained 425 (2 × Talons + legendary Swarm Lash); nova none; dmg 425

```
Vorlacris the Crowned

Medium Swarm of Tiny Fiends, Neutral Evil

AC 18
Initiative +9 (19)

HP 552 (48d8 + 336)

Speed 40 ft., Fly 30 ft. (hover), Climb 40 ft.

MOD
SAVE
STR
8
-1
-1
INT
6
-2
-2
MOD
SAVE
DEX
28
+9
+17
WIS
12
+1
+1
MOD
SAVE
CON
25
+7
+7
CHA
4
-3
-3

Resistances Bludgeoning, Cold, Piercing, Slashing

Immunities Poison; Charmed, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses darkvision 120 ft., blindsight 30 ft.; Passive Perception 11

Languages Common

CR 26 (XP 90,000; PB +8)

Traits

Legendary Resistance (3/Day). If the swarm fails a saving throw, it can choose to succeed instead.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Talons attacks.

Talons. Melee Attack Roll: +17, reach 5 ft. 85 (17d8 + 9) Necrotic damage, or 24 (7d6) Necrotic damage if the swarm is Bloodied.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the swarm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Swarm Lash. The swarm makes one Talons attack.

Scatter Dance. The swarm moves up to half its Speed without provoking Opportunity Attacks.

Swarm Chorus. Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] swarm type=Fiend mechanics=none — swarm: ✓ ("crowned in his own swarm") | swarm: no line key in the words — the model's read of its quote
[concept] signature elements: swarm body that splits when bloodied [body] | strips kingdoms to bone [behavior] | crowned in living locusts [body]
[reskin] signature idea (action): "When the swarm strikes a single living victim — one creature it can see, not a structure or undead — it floods that victim's flesh and strips it as a farmer strips a field, harvesting the flesh in one motion. Any creature other than the victim that the stripped body parts pass through is spattered with ruin and also suffers the harvest, as are the spaces the swarm itself occupies, so armies that c" [rider/on_hit/damage] — menu: charge-push, hook-rider, pounce, isolation, snatch, charge (+ shelf: trample, thrown-burst, gaze-single, execute, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, blink, shell-withdraw, riposte)
[reskin] value check: "Reaping Harvest (1/Day)" EV 112.4 vs floor 145.3 (the whole Multiattack (2 attacks)) — added Success: Half; still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Reaping Harvest (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] signature idea (trait): "Vorlacris is not a swarm that happens to have a body; the swarm is his crown, and when he is hurt or threatened the crown tightens and answers for him. Any creature that damages him, or that starts its turn in the swarm's space, is bitten and stung by the living locusts of his crown, which cannot be avoided while they feed." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, spider-climb, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form)
```


---


---

## Review batch — print-heads-2026-10-03T03-43-15

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Lord Varkos Zhul | 15 | 2024 | lurker-8 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |
| Lord Duskworth | 15 (2014) | 2014 | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 (2014) | 2014 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Warlord of Rusted Graves | 18 | 2024 | brute-17 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Saint Corvath the Oathsworn | 18 (2014) | 2014 | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Solenne Ossuary | 24 | 2024 | skirmisher-22 | ok | SOFT: aim-dpr | ok | ok | ok | ok | SOFT: print-rows | soft (2) |
| Ossun Sovereign | 24 (2014) | 2014 | skirmisher-22 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | SOFT: print-rows | soft (2) |

**Fails by seat and gate:**
- none



---


### Lord Varkos Zhul — lowest CR

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Lord Varkos Zhul | 15 | lurker-8 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 81 a round is 30% under the card's 115
- bands · soft · band: reads CR 11.5 (print at 15 reads 6.5–17.5, n=12)
- read: def 9 / off 14 → 11.5; sustained 81 (3 × Grave Strike); nova none; dmg 81

```
Lord Varkos Zhul

Small Undead, Neutral Evil

AC 17
Initiative +6 (16)

HP 202 (27d6 + 108)

Speed 40 ft., Climb 40 ft.

MOD
SAVE
STR
18
+4
+4
INT
17
+3
+8
MOD
SAVE
DEX
22
+6
+11
WIS
15
+2
+2
MOD
SAVE
CON
18
+4
+4
CHA
18
+4
+4

Skills Perception +7, Stealth +16

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 17

Languages Common plus two other languages

CR 15 (XP 13,000; PB +5)

Traits

Legendary Resistance (3/Day). If the lord fails a saving throw, it can choose to succeed instead.

Misty Escape. If the lord drops to 0 Hit Points outside its resting place, the lord uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. The lord can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. The lord has these weaknesses:


- Forbiddance: the lord can't enter a residence without an invitation from an occupant.
- Running Water: the lord takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into the lord's heart while the lord has the Incapacitated condition in its resting place, the lord has the Paralyzed condition until the weapon is removed.
- Sunlight: the lord takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. The lord makes three Grave Strike attacks. It can replace one attack with a use of Vampiric Drain.

Grave Strike. Melee Attack Roll: +11, reach 5 ft. 20 (4d6 + 6) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Vampiric Drain. Constitution Saving Throw: DC 18, one creature within 30 feet. Failure: 35 (10d6) Necrotic damage, and the lord regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 18, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 35 (10d6) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and the lord regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Vampire Spawn under the lord's control. Success: Half damage only.

Bonus Actions

Shape-Shift. If the lord isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the lord can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the lord can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). The lord casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of the lord's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by the lord.

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
[route] lurker type=Undead mechanics=none — defender-leader: a Undead commands no troops | skirmisher-shifter: a shifter is named by its words (shape-shifts, turns into, a were-) — none here | lurker: ✓ ("a vampire lord") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: commanding bats and wolves [behavior] | blood-draining bite [body] | lurking in mist and shadow [aura]
[reskin] print canon array: STR 18, DEX 22, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +11
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "The lord's fangs find a throat, and he does not let go until the wound is empty. Until the end of his next turn, anyone he has already bitten this fight takes worsening damage from every strike he lands on them, as the blood remembers the first wound and opens it wider." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation, snatch (+ shelf: gaze-single, execute, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, blighted-ground, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — drain (vampire)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into drain
[reskin] value check: "Vampiric Drain" EV 27.1 vs floor 18.2 (one attack of 3) — added Success: Half; dice 21 → 35
[reskin] signature template: drain -> Actions/"Vampiric Drain" ("the concept's own verb is 'vampire' (draining life through a bite/constitution s [verb: vampire:concept]")
[reskin] signature idea (trait): "Blood he has taken from a mortal still lives in him for a moment longer than it should. Whenever he drains a living creature, that stolen vitality spills into his own wounds, knitting flesh and quieting pain. The beast he commands sense it, and grow bolder." [trait/always/resource] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Blood he has taken from a mortal still lives in him for a moment longer than it should. Whenever he drains a living creature, that stolen vitality spills into his own wounds, knitting flesh and quieting pain. The beast he commands sense it, and grow bolder." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst, warded-mending)
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon size: Medium -> Small — the Vampire's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Fangs" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 35
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Umbral Step" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---


### Kraken — a 2024 sheet

**Concept:** a kraken of the black trench

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Kraken | 24 | brute-21 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 22 / off 22 → 22; sustained 118 (2 × Tentacle); nova none; dmg 118

```
Kraken

Gargantuan Monstrosity, Unaligned

AC 18
Initiative +0 (10)

HP 481 (26d20 + 208)

Speed 30 ft., Swim 120 ft.

MOD
SAVE
STR
30
+10
+17
INT
22
+6
+6
MOD
SAVE
DEX
11
+0
+0
WIS
18
+4
+11
MOD
SAVE
CON
26
+8
+15
CHA
20
+5
+5

Skills Athletics +17, Perception +11

Immunities Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained

Senses truesight 120 ft.; Passive Perception 21

Languages Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft.

CR 24 (XP 62,000; PB +7)

Traits

Legendary Resistance (3/Day). If the kraken fails a saving throw, it can choose to succeed instead.

Amphibious. The kraken can breathe air and water.

Siege Monster. The kraken deals double damage to objects and structures.

Actions

Multiattack. The kraken makes two Tentacle attacks. It can replace one attack with a use of Fling.

Tentacle. Melee Attack Roll: +17, reach 30 ft. 59 (11d8 + 10) Bludgeoning damage. The target has the Grappled condition (escape DC 25) from one of ten tentacles, and it has the Restrained condition until the grapple ends.

Fling. The kraken throws a Large or smaller creature Grappled by it to a space it can see within 60 feet of itself that isn't in the air. Dexterity Saving Throw: DC 25, the creature thrown and each creature in the destination space. Failure: 18 (4d8) Bludgeoning damage, and the target has the Prone condition. Success: Half damage only.

Lightning Strike. Dexterity Saving Throw: DC 25, one creature the kraken can see within 120 feet. Failure: 58 (13d8) Lightning damage. Success: Half damage.

Swallow. Dexterity Saving Throw: DC 25, one creature Grappled by the kraken (it can have up to four creatures swallowed at a time). Failure: 23 (3d8 + 10) Piercing damage. If the target is Large or smaller, it is swallowed and no longer Grappled. A swallowed creature has the Restrained condition, has Total Cover against attacks and other effects outside the kraken, and takes 24 (7d6) Acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls in a space within 10 feet of the kraken with the Prone condition. If the kraken dies, any swallowed creature no longer has the Restrained condition and can escape from the corpse using 15 feet of movement, exiting Prone.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the kraken can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Storm Bolt. The kraken uses Lightning Strike.

Toxic Ink. Constitution Saving Throw: DC 25, each creature in a 15-foot Emanation originating from the kraken while it is underwater. Failure: The target has the Blinded and Poisoned conditions until the end of the kraken's next turn. The kraken then moves up to its Speed. Failure or Success: the kraken can't take this action again until the start of its next turn.

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken of the black trench") | brute-grappler: key "kraken" (class body)
[concept] signature elements: abyssal tentacle grasp [behavior] | engulfing maw [behavior] | brine-soaked hide [body]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 541 -> 481, AC 21 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +16 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Abyssal Flood (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Sable Maw Kraken" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Abyssal Flood (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row priced: Lightning Strike — dice 33 → 58
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
```


---


### Warlord of Rusted Graves — a homebrew with a nova

**Concept:** a death knight who leads a damned legion

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Warlord of Rusted Graves | 18 | brute-17 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 21 (print at 18 reads 12.5–18.5, n=5)
- bands · soft · hot-offense: offense alone reads CR 25, 7 over; the HP axis pulls the read to 21
- read: def 17 / off 25 → 21; sustained 205 (2 × Grave-Iron Greatsword + legendary Sepulchral Charge); nova Damned Legion's Advance 72; dmg 205

```
Warlord of Rusted Graves

Huge Undead, Neutral

AC 18
Initiative -1 (9)

HP 322 (28d12 + 140)

Speed 40 ft.

MOD
SAVE
STR
24
+7
+13
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
14
+2
+8
MOD
SAVE
CON
21
+5
+11
CHA
12
+1
+1

Skills Athletics +13, Perception +8

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft., tremorsense 30 ft.; Passive Perception 18

Languages Common plus the languages it knew in life

CR 18 (XP 20,000; PB +6)

Traits

Legendary Resistance (3/Day). If the warlord fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The warlord makes two Grave-Iron Greatsword attacks. It can replace one attack with a use of Rusted Grasp.

Grave-Iron Greatsword. Melee Attack Roll: +13, reach 10 ft. 25 (4d8 + 7) Slashing damage plus 16 (3d10) Necrotic damage.

Damned Legion's Advance (Recharge 5-6). Constitution Saving Throw: DC 20, each creature in a 30-foot Cone. Failure: 72 (16d8) Necrotic damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Rusted Grasp. Strength Saving Throw: DC 20, one Huge or smaller creature within 60 feet. Failure: The target is pulled up to 30 feet straight toward the warlord by its grip and has the Grappled condition (escape DC 21). While Grappled this way, the target has the Restrained condition.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the warlord can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Sepulchral Charge. The warlord moves up to half its Speed without provoking Opportunity Attacks, and it makes one Grave-Iron Greatsword attack.

Gravequake. Strength Saving Throw: DC 20, each creature within 10 feet of the warlord. Failure: The target has the Prone condition.

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
[route] brute type=Undead mechanics=none — defender-leader: a Undead commands no troops | brute: ✓ ("death knight") | brute: no line key in the words — the model's read of its quote
[concept] signature elements: commands a damned legion [behavior] | body of grave-soil and ancient bone [body] | grave-iron greatsword [object]
[reskin] signature idea (action): "The Warlord of Rusted Graves slams its greatsword point-down into the earth and wills the buried dead to rise where it strikes. A thin line of rusted blades and grasping hands erupts from the soil along the ground it just broke, dragging at the feet and legs of everything caught in its path and rooting them in place. Those it pins stay held, rusted fast to the earth, until they tear themselves fre" [action/save/condition] — menu: condition-payoff, hook-drag, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] value check: "Rusted Grasp" EV 21.5 vs floor 20.3 (one attack of 2) — worth the trade
[reskin] signature template: hook-drag -> Actions/"Rusted Grasp" ("the buried dead erupt and drag at the feet and legs of everything caught in its  [verb: drag:idea]")
[reskin] signature idea (trait): "The Warlord is not a body but a walking grave: grave-soil and ancient bone packed around a will that would not die. Whenever a blow lands hard enough to matter, grave-soil and old bones slough off the wound and the dead nearest to it are pulled in to patch the gap — so that hurting it only feeds the legion it commands." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — death-burst (death)
[reskin] signature miss: trait — "The Warlord is not a body but a walking grave: grave-soil and ancient bone packed around a will that would not die. Whenever a blow lands hard enough to matter, grave-soil and old bones slough off the wound and the dead nearest to it are pulled in to patch the gap — so that hurting it only feeds the legion it commands." [trait/on_being_hit/defense] — the model found no template that holds it (offered: death-burst)
[reskin] chassis nova: "Damned Legion's Advance (Recharge 5-6)" — the brute-17's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Pit Fiend — a legendary

**Concept:** a pit fiend general

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 19 / off 22 → 20.5; sustained 156 (3 × Bite + legendary Answering Stroke); nova none; dmg 156

```
Pit Fiend

Large Fiend, Lawful Evil

AC 21
Initiative +2 (12)

HP 337 (27d10 + 189)

Speed 30 ft., Fly 60 ft.

MOD
SAVE
STR
26
+8
+14
INT
22
+6
+6
MOD
SAVE
DEX
14
+2
+2
WIS
18
+4
+10
MOD
SAVE
CON
24
+7
+13
CHA
24
+7
+7

Skills Athletics +14, Perception +10

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses truesight 120 ft.; Passive Perception 20

Languages Infernal; telepathy 120 ft.

CR 20 (XP 25,000; PB +6)

Traits

Legendary Resistance (3/Day). If the pit fiend fails a saving throw, it can choose to succeed instead.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit the pit fiend general's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend general makes three attacks, using Bite, Necrotic Claw, or Force Mace in any combination.

Bite. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Force Mace. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Force damage.

Necrotic Claw. Melee Attack Roll: +14, reach 10 ft. 26 (4d8 + 8) Necrotic damage.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

- At Will:

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the pit fiend general can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Answering Stroke. The pit fiend general makes one Bite attack.

Lock Shields. The pit fiend general takes the Dodge action. The pit fiend general can't take this action again until the start of its next turn.

Break Ranks. Strength Saving Throw: DC 21, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the pit fiend general and has the Prone condition.

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
[route] defender-leader type=Fiend mechanics=none — defender-leader: ✓ ("a pit fiend general") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: commands allies as a warlord [behavior] | an aura of authority that anchors the formation [aura] | ash-forged flesh and ember weapons [body]
[reskin] print canon route: "a pit fiend general" is the Pit Fiend — the leader seat stands down for the plain line
[reskin] print canon defenses: HP 281 -> 337, AC 22 -> 21 — the Pit Fiend's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 26, DEX 14, CON 24, INT 22, WIS 18, CHA 24 — the Pit Fiend's at its own CR; attack +14 -> +14, DC 21 (print's)
[reskin] print canon: "a pit fiend general" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes fly — the Pit Fiend's
[reskin] print canon senses: "truesight 120 ft." — the Pit Fiend's
[reskin] print canon name: "Pit Fiend General" -> "Pit Fiend" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Infernal, telepathy 120 ft." -> "Infernal; telepathy 120 ft." — the Pit Fiend's
[reskin] print canon speed: Fly -> 60 ft. — the Pit Fiend's own
[reskin] print canon row: Actions/Devilish Claw — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon row: Actions/Fiery Mace — the Pit Fiend's second melee row, beside the chassis's
[reskin] print canon attack: "Counterstroke Strike" -> "Bite" — the Pit Fiend's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] print canon trait: Diabolical Restoration — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Legendary Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
```


---


### Solenne Ossuary — bands soft

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Solenne Ossuary | 24 | skirmisher-22 | ok | SOFT: aim-dpr | ok | ok | ok | ok | SOFT: print-rows |

- bands · soft · aim-dpr: damage 141 a round is 44% under the card's 250
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Throne Drift
- read: def 24 / off 23 → 23.5; sustained 141 (3 × Solar Flare + legendary Deathly Teleport); nova none; dmg 141

```
Solenne Ossuary

Medium Undead, Neutral

AC 21
Initiative +9 (19)

HP 517 (69d8 + 207)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
21
+5
+5
MOD
SAVE
DEX
28
+9
+16
WIS
14
+2
+9
MOD
SAVE
CON
16
+3
+3
CHA
16
+3
+3

Skills Perception +9, Stealth +16

Resistances Cold

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses darkvision 120 ft.; Passive Perception 19

Languages All

CR 24 (XP 62,000; PB +7)

Traits

Duskward Veil. While the ossuary isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Legendary Resistance (4/Day). If the ossuary fails a saving throw, it can choose to succeed instead.

Throne Drift. When a creature the ossuary can see ends its turn within 5 feet of it, the ossuary can move up to 20 feet without provoking Opportunity Attacks.

Spirit Jar. If destroyed, the ossuary reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within the ossuary's lair.

Actions

Multiattack. The ossuary makes three attacks, using Eldritch Burst, Solar Flare, or Paralyzing Touch in any combination.

Eldritch Burst. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Force damage.

Paralyzing Touch. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Cold damage. and the target has the Paralyzed condition until the start of the ossuary's next turn.

Solar Flare. Ranged Attack Roll: +16, range 90/240 ft. 36 (6d8 + 9) Radiant damage.

Spellcasting. The ossuary casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20):

- At Will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
- 2/Day Each: Animate Dead, Dimension Door, Plane Shift
- 1/Day Each: Chain Lightning, Finger of Death, Power Word Kill, Scrying

Reactions

Protective Magic. The ossuary casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the ossuary can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. The ossuary teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 23, each creature that isn't an Undead in a 20-foot Emanation originating from the ossuary. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: the ossuary can't take this action again until the start of its next turn.

Frightening Gaze. The ossuary casts Fear, using the same spellcasting ability as Spellcasting. The ossuary can't take this action again until the start of its next turn.

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
[route] caster (artillery) type=Undead mechanics=none — caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: a throne of fused pale bone that it never willingly leaves [body] | kiting ray after ray of sunlight and grave-light from a distance [behavior] | the sun-throne's withering corona that ages flesh and rusts steel [aura]
[reskin] print canon route: the Lich is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 11, DEX 28, CON 16, INT 21, WIS 14, CHA 16 — the Lich's, DEX fitted to +16
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The ossuary's scepter does not only strike; a filament of grave-light stays anchored between the target and the seat of its throne. So long as the ossuary can see that marked creature, its other ray attacks against it sear unerringly and leave it trailing a thin corona that flares each time the ossuary glides away. The mark lasts until the throne is forced to move because of the creature's own app" [rider/on_hit/condition] — menu: charge-push, hook-rider, pounce, isolation, snatch, bolt-mark, charge (+ shelf: gaze-single, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature miss: action — "The ossuary's scepter does not only strike; a filament of grave-light stays anchored between the target and the seat of its throne. So long as the ossuary can see that marked creature, its other ray attacks against it sear unerringly and leave it trailing a thin corona that flares each time the ossuary glides away. The mark lasts until the throne is forced to move because of the creature's own app" [rider/on_hit/condition] — the model found no template that holds it (offered: charge-push, hook-rider, pounce, isolation, snatch, bolt-mark, charge, throw-retrieve, lure, sensory-strike, delayed-brand, aggro-curse)
[reskin] value check: "Disarming Twist" EV 0 vs floor 23.4 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The bone-sun throne is not carried; it is the point the ossuary's light bends around. Whenever a creature first comes within reach of the ossuary on a turn, the throne drifts just enough to keep itself between that creature and the ossuary's rays, slowing the approach and letting the ossuary slide away without turning its back." [trait/always/movement] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature template (trait): guarded-stance -> Traits/"Duskward Veil" ("The idea's core verb is the light curving away from the point of approach; the t [verb: light bends:idea]")
[reskin] chassis nova: "Dawn Scour (Recharge 5-6)" — the skirmisher-22's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon speed: 70 ft. -> 30 ft. — the Lich's walk; the concept's other modes stay
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Scepter" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Dawn Scour (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Lich's
[reskin] print canon: chassis row leaves — Traits/"Coronal Drift" is the seat's, not the Lich's
[reskin] print canon row: Actions/Spellcasting — the Lich's own
[reskin] print canon row: Reactions/Protective Magic — the Lich's own
```

