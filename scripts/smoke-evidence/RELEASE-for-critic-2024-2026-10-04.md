# Release table for the critic — runnability and cosmetic round — 2026-10-04

Your verdict on the blockers round was ship both; this round works your "worth fixing next round" list and the cosmetic set, under the owner's standard as you stated it (identity rows from print, numbers that work, nothing on the sheet contradicting anything else on it; row names, dice, Multiattack counts and header lines are the engine's). The forty, the twelve and your ten head-noun phrases were re-run in both formats on the fully-landed engine, with nothing landing during the run. Zero fails. Gate: 178 suites / 5,140 tests, build clean.

## 1. Runnability — your four, each landed

| Your finding | What landed | Receipt |
|---|---|---|
| Multiattack naming a row that doesn't exist ("Slam or Mirror Slam") | A rename no longer propagates into a row name that nests it; the checker gates every name in the "in any combination" list | Shatterglass: "Shard" → "Slam" had rewritten "Mirror Shard" |
| At-will mass lure, third sighting — promote to fail | Fail when wide (of its choice, or > 60 ft) and nothing is traded for it; soft when Multiattack trades an attack | Print has 15 rows of the shape and not one is wide and free: the 13 dragon breaths (Sleep, Repulsion, Paralyzing) are named in Multiattack's replacement clause |
| Lich borrows land on a Dex chassis | A print body that casts and strikes only with magic takes the caster line, so one stat carries the attack and the DC | The Lich's Eldritch Burst is Force and Paralyzing Touch is Cold; the Adult Green's Rend is Slashing and stays a brute. The old `casts` flag read false for the Lich because it has a melee row at all — that was the dragons' guard |
| Snare's object noun slot empty | `restraint` is a real slot with a blind fill | "Restrained until the Restrained is destroyed" |

## 2. Cosmetic — sheets that looked broken

- **Self-reference in borrowed text.** One pass, longest print name first, keeps the determiner the text already had: "the vampire's" → "the vampire lord's", "this pit fiend's aura" → "this pit fiend general's aura". The chained replaces re-entered their own output.
- **The inline follows the print name** even when the model coined one starting with "the" ("the blackroot wyrm" on Adult Green Dragon rows); `monster.inline` follows too, so the legendary header agrees.
- **". and"** — a print rider opening with a conjunction joins with a comma; ". and"/". plus" is a punctuation fail ("ft. or range" on a hybrid row is exempt).
- **"Medium or Small" parsed as Small.** Ten SRD 5.2 blocks in our corpus (Vampire, Vampire Spawn, Archmage, Mage, Assassin, Gladiator, Mummy Lord, Pirate Captain, Werebear, Wraith) carried `size: Small`. Set to Medium, ten lines.
- **2014 render:** the 2024 lead-in folds into an already-2014 save (the mounted nova); a bullet list becomes sentences (Vampire Weakness); a bare "-" line is dropped (the spell block); a hybrid row's label matches its range ("Melee or Ranged Spell Attack").

## 3. What the new gates then forced — two engine fixes

- **Save DC derives from a stat on the sheet.** The 2014 table's DC 21 sat on a caster's INT 18 (three rows on the archlich, two on its 2014 twin). The DC comes down to the best stat the sheet has — the owner's rule, a stat that makes attack rolls is never moved.
- **The final price.** When the returning-sword template supersedes the ranged row, one row serves the Multiattack and the legendary strike at a per-hit solved for two rows. The death knight at 18 swung 52 twice and once more free: 260 a round, offense CR 27. A final pass re-solves the attack rows to the card when the round runs more than 20% over. The same block now reads 170 a round, offense +5, soft — inside print's own ceiling (+7, the Adult Brass).

## 4. Gate summary — definitive run

| Run | Blocks | Fails | Softs |
|---|---|---|---|
| sweep-2026-10-04T08-59-26 | 40 | 0 | 17 |
| high-cr-2026-10-04T09-11-00 | 12 | 0 | 12 |
| print-heads-2026-10-04T09-15-17 | 10 | 0 | 11 |

Head-noun reads for you: the vampire lord reads 12.5 at 15 on the Vampire borrow; the Kraken and Pit Fiend are print's own numbers on both sheets; the death knight (no SRD entry, chassis line) reads 18 with offense +5; the archlich at 24 reads 23 with HP 442 under print's Gargantuan spread, soft by the ±1 rule. Legendary offense across the twelve sits at +4 to +5 on both editions.

Verdicts on your other reads: a reference ending in "stat block" is print's own idiom (the Treant's Animate Trees) and is exempt from dangling-ref. The Treant fire-vulnerability, the swallowers, idea-only trait binds, the hurler clause on mundane weapons, Humanoid claws, type drift, edition-purity case and the 2014 finesse list remain parked by the owner.

Three sweep tables this round were generated while edits were still landing and were not reported; this one had nothing land during it.

---

---

# 2024 blocks

## Review batch — sweep-2026-10-04T08-59-26

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | clean |
| Bog Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Goblin Warrior | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | clean |
| Fen Dragger | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | clean |
| Lantern Wretch | 3 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | clean |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | clean |
| Lantern Hermit | 3 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Troll | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Brass Gate-Golem | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Vault Warden | 5 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Rotbirth Seer | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Firstborn Blight | 8 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | clean |
| Cleric Drowned | 10 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | clean |
| Stone Golem | 10 (2014) | 2014 | brute-9 | ok | ok | ok | ok | ok | ok | ok | clean |
| Drowned Bell-Ringer | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | clean |
| Vampire | 13 | 2024 | skirmisher-13 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | soft (1) |
| Thunderherd Warden | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | clean |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | clean |
| Thunderherd Stormherder | 13 (2014) | 2014 | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Adult Green Dragon | 15 | 2024 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | clean |
| Ossuary Colossus | 15 | 2024 | brute-9-juggernaut | ok | ok | ok | ok | ok | ok | ok | clean |
| Adult Green Dragon | 15 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | clean |
| Bone-Siege Colossus | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Dragon Turtle | 18 | 2024 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | soft (1) |
| Looking-Glass Queen's Regent | 18 | 2024 | lurker-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Dragon Turtle | 18 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | soft (1) |
| Mirror Assassin | 18 (2014) | 2014 | lurker-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Glacier Wyrm | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Pit Fiend | 20 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Floe Devourer | 20 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | clean |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Crown of Bound Kings | 24 | 2024 | caster-21 | ok | SOFT: aim-dpr, under | ok | SOFT: rider-no-save | ok | ok | ok | soft (2) |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Crown of Bound Kings | 24 (2014) | 2014 | caster-21 | ok | SOFT: aim-dpr, band | ok | SOFT: rider-no-save | ok | ok | ok | soft (2) |

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

Small Fey, Neutral Evil

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
[concept] signature elements: pack skirmishing [behavior] | ragged hide armor [body] | scavenged weapons [object]
[reskin] print canon array: STR 8, DEX 15, CON 10, INT 10, WIS 8, CHA 8 — the Goblin Warrior's, DEX fitted to +4
[reskin] print canon: "a goblin warrior" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 with no claimed mechanics — the wildcard slot drops (print: 74% of CR<=2 blocks carry no non-attack action)
[reskin] claim gate: the trait wildcard is closed at CR <= 2 — the chassis carries the traits
[reskin] print canon modes: climb off — the Goblin Warrior has no such mode and the words name none
[reskin] print canon speed: modes walk only — the Goblin Warrior's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Warrior's
[reskin] print canon type: Humanoid -> Fey — the Goblin Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon: chassis row leaves — Traits/"Nimble" is the seat's, not the Goblin Warrior's
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

Medium Monstrosity, Neutral

AC 13
Initiative -1 (9)

HP 30 (4d8 + 12)

Speed 30 ft., Swim 30 ft.

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

Senses darkvision 60 ft.; Passive Perception 12

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("drags fishermen under") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: ambush from water's edge [behavior] | mud-caked hide [body] | drag prey under [behavior]
[reskin] claim gate: the trait wildcard is closed at CR <= 2 — the chassis carries the traits
[reskin] signature idea (action): "While fully submerged in water or mud, the bog hound is unseen and inaudible from the surface, indistinguishable from the bottom, so long as it does not move. The moment it bites a creature held or standing in water or mud, it latches on and surges upward or downward through the muck, pulling that creature with it up to its full swimming or burrowing movement without releasing its hold, so that pr" [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce (+ shelf: hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — hook-drag, hook-rider (drag, under, drags)
[reskin] signature rider: hook-rider -> Bite (appended; the bite latches on and the hound drags the creature along with it through the m [verb: drag:concept, drags:concept])
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
[concept] signature elements: crushing bear hug grapple [behavior] | owl-bear hybrid body [body]
[reskin] print canon route: "an owlbear" is the Owlbear — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "an owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Talons" -> "Rend" — the Owlbear's own row
```


---


### Lantern Wretch — a homebrew with a nova

**Concept:** a glass-eyed hermit who hurls her lantern at thieves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Lantern Wretch | 3 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 14 (2 × Scarred Hand); nova Oil Splash 17; dmg 21

```
Lantern Wretch

Medium Humanoid, Chaotic Neutral

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

Skittering Shuffle. The lantern wretch ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The lantern wretch makes two attacks, using Scarred Hand or Lantern Toss in any combination. It can replace one attack with a use of Opportunist's Lash.

Scarred Hand. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.

Lantern Toss. Ranged Attack Roll: +5, range 30/90 ft. 7 (1d8 + 3) Fire damage. Hit or Miss: Immediately after the attack, her lantern returns to the lantern wretch's grasp.

Oil Splash (Recharge 5-6). The lantern wretch hurls her lantern at a point it can see within 90 feet. Dexterity Saving Throw: DC 12, each creature in a 5-foot-radius Sphere centered on that point. Failure: 17 (5d6) Fire damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Opportunist's Lash. Strength Saving Throw: DC 12, one creature within 30 feet that is Prone. Failure: 6 (1d12) Fire damage. Success: Half damage.

Bonus Actions

Fleet Agility. The lantern wretch takes the Dash or Disengage action.

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
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon, snare — skirmisher-hurler: ✓ ("hurls her lantern") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurled lanterns that burst into flame [object] | glass eyes that watch every approach [body] | ash-choked hermitage in a ruined shrine [aura]
[reskin] nova capped: "Hurled Burst" 18 → 17 (the chassis nova obeys the cap: 17 at CR 3)
[reskin] signature idea (action): "The hermit flings a fistful of splintered lantern glass at the intruder she can see most clearly. The shards stick in the victim's eyes and skin, and while they cling they catch the light of every nearby flame, throwing the wretch's own fire back at the target whenever a lantern is thrown or splashed near it." [action/save/condition] — menu: snare, reel, condition-payoff, throw-retrieve, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature miss: action — "The hermit flings a fistful of splintered lantern glass at the intruder she can see most clearly. The shards stick in the victim's eyes and skin, and while they cling they catch the light of every nearby flame, throwing the wretch's own fire back at the target whenever a lantern is thrown or splashed near it." [action/save/condition] — the model found no template that holds it (offered: snare, reel, condition-payoff, throw-retrieve, snare-bolt, sensory-strike, disarm, exploiter)
[reskin] value check: "Opportunist's Lash" EV 4.7 vs floor 4.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Her glass eyes cannot close and never look away. She always knows when a creature that has hurt her is nearby and can see it even in the dark, though she can still be blinded in the usual ways." [trait/always/condition] — menu: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, gaze-aura)
[reskin] signature bound to the concept's verb: trait — marking-light, resonant-body (lantern, glass)
[reskin] signature miss: trait — "Her glass eyes cannot close and never look away. She always knows when a creature that has hurt her is nearby and can see it even in the dark, though she can still be blinded in the usual ways." [trait/always/condition] — the model found no template that holds it (offered: marking-light, resonant-body)
[reskin] chassis nova: "Oil Splash (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Adult Green Dragon — a legendary

**Concept:** an adult green dragon

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Adult Green Dragon | 15 | dragon-15 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 11 / off 21 → 16; sustained 156 (3 × Rend + legendary Pounce); nova Poison Breath 71; dmg 156

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

Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead.

Amphibious. The dragon can breathe air and water.

Actions

Multiattack. The dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Fear.

Rend. Melee Attack Roll: +11, reach 10 ft. 19 (3d8 + 6) Slashing damage plus 7 (2d6) Poison damage.

Poison Breath (Recharge 5-6). Dexterity Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Poison damage. Success: Half damage.

Spellcasting. The dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

- At Will: Detect Magic, Command, Fear, Suggestion

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the dragon can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Mind Invasion. The dragon uses Spellcasting to cast Mind Spike (level 3 version).

Noxious Miasma. Constitution Saving Throw: DC 18, each creature in a 20-foot-radius Sphere centered on a point the dragon can see within 90 feet. Failure: 7 (2d6) Poison damage, and the target takes a -2 penalty to AC until the end of its next turn. Failure or Success: the dragon can't take this action again until the start of its next turn.

Pounce. The dragon moves up to half its Speed, and it makes one Rend attack.

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
[concept] signature elements: chlorine breath weapon [body] | aerial strafing and feigned retreat [behavior] | tyrant's spite under pressure [behavior]
[reskin] print canon defenses: HP 192 -> 207, AC 19 -> 19 — the Adult Green Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 23, DEX 12, CON 21, INT 18, WIS 15, CHA 18 — the Adult Green Dragon's at its own CR; attack +11 -> +11, DC 18 (print's)
[reskin] print canon: "an adult green dragon" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Chlorine Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes fly, swim — the Adult Green Dragon's
[reskin] print canon senses: "blindsight 60 ft., darkvision 120 ft." — the Adult Green Dragon's
[reskin] print canon name: "Chlorine Tyrant" -> "Adult Green Dragon" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon attack: "Bite" -> "Rend" — the Adult Green Dragon's own row
[reskin] print canon defenses: immunities none -> Poison; Poisoned — the Adult Green Dragon's own header lines
[reskin] print canon trait: Amphibious — "an adult green dragon" is the Adult Green Dragon (print's own row)
[reskin] print canon legendary: Mind Invasion, Noxious Miasma, Pounce — the Adult Green Dragon's own kit stands where the chassis's stood
[reskin] print canon nova: "Chlorine Breath (Recharge 5-6)" -> "Poison Breath (Recharge 5-6)" — one breath: the chassis nova at this sheet's CR carries the Adult Green Dragon's name; print's own row stays out
```


---


### Rotbirth Seer — bands soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Rotbirth Seer | 8 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Claw); nova none; dmg 54

```
Rotbirth Seer

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

Languages Common

CR 8 (XP 3,900; PB +3)

Actions

Multiattack. The seer makes three attacks, using Claw or Hex Bolt in any combination. It can replace one attack with a use of (A) Blood Rot or (B) Spellcasting to cast Ray of Sickness.

Claw. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Force damage.

Hex Bolt. Ranged Attack Roll: +8, range 80/320 ft. 14 (2d8 + 5) Piercing damage.

Blood Rot. Constitution Saving Throw: DC 16, one creature within 60 feet. Failure: 16 (3d10) Bludgeoning damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The seer casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness, Detect Magic
- 1/Day Each: Bestow Curse, Blight

Rotbound Touch. Wisdom Saving Throw: DC 16, one creature within 30 feet. Failure: 18 (4d8) Bludgeoning damage, and the target can't regain Hit Points until the end of the seer's next turn. Success: Half damage only.

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
[concept] signature elements: curse of the firstborn [behavior] | rune-etched plague gaze [body] | hereditary wasting hex [aura]
[reskin] signature idea (action): "The seer fixes its rune-etched gaze on one living creature, marking it as the firstborn of its bloodline. A wisp of the plague-god's afterbirth settles into the mark, poisoning the victim's every ancestor and every unborn heir: whenever that creature would act or react, a wave of grave-rot eats the motion before it forms. The mark endures while the seer lives and fights only for that bloodline's e" [action/always/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Firstborn Brand" EV 5.5 vs floor 9.4 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Firstborn Brand" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Sealing Touch" EV 14 vs floor 9.4 (one attack of 3) — added Success: Half; dice 9 → 18
[reskin] library seed drawn: seal -> Actions/"Sealing Touch" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Anything struck by the seer's claw or hex bolt carries a splinter of its plague-gaze, so the seer can always sense and track that victim across any distance until the wound is ritually cleansed or healed by magic. The splinter also lets the seer direct its blood-rot at that creature even through walls or while blinded." [trait/always/resource] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, gaze-aura)
```


---


### Looking-Glass Queen's Regent — bands soft

**Concept:** a mirror assassin who strikes from the reflections of her victims

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Looking-Glass Queen's Regent | 18 | lurker-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 23, 5 over; the HP axis pulls the read to 17.5
- read: def 12 / off 23 → 17.5; sustained 174 (3 × Bone Hand + legendary Step Out); nova none; dmg 174

```
Looking-Glass Queen's Regent

Medium Monstrosity, Neutral Evil

AC 18
Initiative +7 (17)

HP 247 (26d8 + 130)

Speed 40 ft.

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

Senses darkvision 120 ft.; Passive Perception 20

Languages Common

CR 18 (XP 20,000; PB +6)

Traits

Vile Appearance. Wisdom Saving Throw: DC 21, any creature that starts its turn within 30 feet of the regent and can see it. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's gaze for 24 hours.

Assassinate. During the first round of each combat, the regent has Advantage on attack rolls against any creature that hasn't taken a turn. If the regent hits a creature during that round, the target takes an extra 21 (6d6) Psychic damage.

Legendary Resistance (3/Day). If the regent fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The regent makes three Bone Hand attacks. It can replace one attack with a use of Vitality Leech.

Bone Hand. Melee Attack Roll: +13, reach 5 ft. 16 (2d8 + 7) Piercing damage plus 13 (3d8) Psychic damage.

Vitality Leech. Constitution Saving Throw: DC 21, one creature within 30 feet. Failure: 39 (6d12) Psychic damage, and the regent regains Hit Points equal to half the damage dealt. Success: Half damage only.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the regent takes the Hide action.

Glass Step (Recharge 4-6). The regent teleports up to 40 feet to an unoccupied space it can see.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the regent can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Step Out. The regent moves up to half its Speed without provoking Opportunity Attacks, and it makes one Bone Hand attack.

Fold Back. While in Dim Light or Darkness, the regent takes the Hide action. The regent can't take this action again until the start of its next turn.

Cold Reflection. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] lurker type=Monstrosity mechanics=teleport — lurker: ✓ ("strikes from the reflections of her vict") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: stalking from reflections [behavior] | mirror-step ambush kill [behavior] | a body of polished bone [body]
[reskin] signature idea (action): "The regent selects a creature whose reflection she can see in the same scene, then fragments every image of that creature into a storm of silvered shards that knife through it. The victim is torn between its own scattered pieces, losing a piece of its vitality each time the glass bites; if the creature meets the regent's gaze in any mirror while stricken, the shards sharpen and the next cut bites " [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation (+ shelf: gaze-single, condition-payoff, execute, seal, wail, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature miss: action — "The regent selects a creature whose reflection she can see in the same scene, then fragments every image of that creature into a storm of silvered shards that knife through it. The victim is torn between its own scattered pieces, losing a piece of its vitality each time the glass bites; if the creature meets the regent's gaze in any mirror while stricken, the shards sharpen and the next cut bites " [rider/on_hit/damage] — the model found no template that holds it (offered: contagion, charge-push, hook-rider, pounce, isolation, gaze-single, terror-pulse)
[reskin] value check: "Vitality Leech" EV 30.2 vs floor 20.3 (one attack of 3) — added Success: Half; dice 24 → 39
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The regent carries a false life, a body of polished bone she inhabits from afar. When she takes a deadly blow in the open, the bone shell shatters into mirror shards, and she simply ceases to be where she stood. Somewhere else, in a prepared reflection, the true Regent stirs—and the one the heroes killed is revealed as an empty husk that never held her." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — gaze-aura (reflection, reflections)
[reskin] signature bound by force: trait — "gaze-aura" matches reflection+reflections in the user's words; the model's none is overruled
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): gaze-aura -> Traits/"Vile Appearance" ("exact concept match [verb: reflection:concept, reflections:concept]")
```


---


### Glacier Wyrm — bands soft

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Glacier Wyrm | 20 | dragon-22 | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- read: def 19 / off 25 → 22; sustained 204 (3 × Bite + legendary Snap Jaws); nova Rime Breath 76; dmg 204

```
Glacier Wyrm

Gargantuan Dragon, Unaligned

AC 21
Initiative +1 (11)

HP 333 (18d20 + 144)

Speed 40 ft., Fly 80 ft., Burrow 30 ft., Swim 40 ft.

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

Sure Footing. Difficult Terrain composed of ice or snow doesn't cost the glacier wyrm extra movement, and the glacier wyrm can move across ice or snow without needing to make an ability check.

Legendary Resistance (4/Day). If the glacier wyrm fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The glacier wyrm makes three Bite attacks. It can replace one attack with a use of Spellcasting to cast Fear.

Bite. Melee Attack Roll: +14, reach 15 ft. 21 (3d8 + 8) Piercing damage plus 13 (3d8) Cold damage.

Rime Breath (Recharge 5-6). Constitution Saving Throw: DC 21, each creature in a 90-foot Cone. Failure: 76 (17d8) Cold damage. Success: Half damage.

Spellcasting. The glacier wyrm casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):

- At Will: Fear, Darkness, Command, Suggestion

Bonus Actions

Rime Wake. One creature within 5 feet that hit the glacier wyrm with an attack roll since the end of the glacier wyrm's last turn takes 17 (5d6) Cold damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the glacier wyrm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Snap Jaws. The glacier wyrm makes one Bite attack.

Undertow Surge. The glacier wyrm moves up to half its Speed without provoking Opportunity Attacks.

Dread Breach. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] brute-grappler type=Dragon mechanics=grapple, engulf, breath — brute-grappler: ✓ ("swallows ships whole") | brute-grappler: key "swallows" (class verb)
[concept] signature elements: swallowing ships whole [behavior] | body of glacier ice and rime [body] | freezing the sea around it [aura]
[reskin] signature idea (action): "It rakes its enormous claws along a frozen surface or a vessel's hull, and the ice it drags up leashes itself to the wyrm. For a short while afterwards, the wyrm trails a wake of jagged ice that stabs at any creature that comes near it, punishing those who try to shelter close in its lee." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, charge (+ shelf: condition-payoff, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] value check: "Rime Wake" EV 9.4 vs floor 7 (a bonus action (free)) — worth the trade
[reskin] signature template: own-turn-punisher -> Bonus Actions/"Rime Wake" ("the wyrm trails a wake of jagged ice that stabs at any creature that comes near  [verb: punish:idea]")
[reskin] signature idea (trait): "The sea freezes solid around the glacier wyrm as it moves, locking the water's surface into a shelf of black rime. That sheet spreads outward from the wyrm as it swims, and any creature standing on it slides toward the wyrm, while the ice thickens into walls of pack that blunt attacks coming from outside it." [trait/always/movement] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature bound by force: trait — "terrain-walk" matches freezes+freeze+glacier in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: freezes:concept, freeze:concept, glacier:concept, ice:idea]")
[reskin] chassis nova: "Rime Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Crown of Bound Kings — bands soft

**Concept:** a sun-crowned archlich who binds the dead of a whole kingdom

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Crown of Bound Kings | 24 | caster-21 | ok | SOFT: aim-dpr, under | ok | SOFT: rider-no-save | ok | ok | ok |

- bands · soft · aim-dpr: damage 168 a round is 33% under the card's 250
- bands · soft · under: effective HP 442 sits under print at CR 24 (468–546, n=5); the read holds at 23, within print's own ±1
- gates · soft · rider-no-save: Actions/Eldritch Burst: a Poisoned rider on every hit with no save
- read: def 22 / off 24 → 23; sustained 168 (3 × Solar Blast + legendary Deathly Teleport); nova none; dmg 168

```
Crown of Bound Kings

Medium Undead, Lawful Evil

AC 21
Initiative +3 (13)

HP 442 (59d8 + 177)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
28
+9
+16
MOD
SAVE
DEX
16
+3
+3
WIS
14
+2
+9
MOD
SAVE
CON
16
+3
+10
CHA
16
+3
+3

Skills Arcana +16, Perception +9

Resistances Cold

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses darkvision 120 ft., truesight 60 ft.; Passive Perception 19

Languages All

CR 24 (XP 62,000; PB +7)

Traits

Legendary Resistance (3/Day). If the crown fails a saving throw, it can choose to succeed instead.

Spirit Jar. If destroyed, the crown reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within the crown's lair.

Actions

Multiattack. The crown makes three attacks, using Solar Blast, Eldritch Burst, or Paralyzing Touch in any combination. It can replace one attack with a use of (A) Binding Lash or (B) Spellcasting to cast Ray of Sickness.

Solar Blast. Melee or Ranged Attack Roll: +16, reach 5 ft. or range 120 ft. 45 (8d8 + 9) Radiant damage.

Eldritch Burst. Melee Attack Roll: +16, reach 5 ft. 45 (8d8 + 9) Force damage, and the target has the Poisoned condition until the start of the crown's next turn.

Paralyzing Touch. Melee Attack Roll: +16, reach 5 ft. 45 (8d8 + 9) Cold damage, and the target has the Poisoned condition until the start of the crown's next turn.

Spellcasting. The crown casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 24, +16 to hit with spell attacks):

- At Will: Ray of Sickness, Blindness/Deafness, Bestow Curse
- 1/Day Each: Blight (level 8 version)

Binding Lash. Dexterity Saving Throw: DC 24, one creature within 60 feet. Failure: The target has the Restrained condition until the end of the crown's next turn.

Reactions

Protective Magic (3/Day). Trigger: The crown is hit by an attack roll. Response: The crown casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the crown can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. The crown teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 24, each creature that isn't an Undead in a 20-foot Emanation originating from the crown. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: the crown can't take this action again until the start of its next turn.

Frightening Gaze. The crown casts Fear, using the same spellcasting ability as Spellcasting. The crown can't take this action again until the start of its next turn.

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
[route] caster-binder (controller) type=Undead mechanics=none — caster-binder: ✓ ("binds the dead of a whole kingdom") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: binding the dead of a whole kingdom [behavior] | sun-crowned skull and radiant crown [body] | throne of skeletal courtiers [object]
[reskin] print canon route: the Lich's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 28, WIS 14, CHA 16 — the Lich's, INT fitted to +16
[reskin] print canon: "a sun-crowned archlich who binds the dead of a whole kingdom" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The crown reaches toward every corpse it can see — not just the ones already bound to it — and forces them to its court as well. Each fallen creature in sight rises as a fresh member of the spectral court, swelling the wall of the dead the crown hides behind; the more that have died in this fight, the larger the court becomes by the time the crown next acts. It can call to the dead again only afte" [action/always/resource] — menu: gaze-single, execute, seal, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, drain, curse-debt, zone-seed, reveal (+ shelf: lure, herd, delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — snare-bolt, bolt-restrain (bind, binds)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into snare-bolt, bolt-restrain
[reskin] value check: "Binding Lash" EV 31.4 vs floor 29.6 (one attack of 3) — worth the trade
[reskin] signature template: snare-bolt -> Actions/"Binding Lash" ("the crown's verb is bind — it binds the dead of a whole kingdom; snare-bolt is t [verb: bind:concept]")
[reskin] signature idea (trait): "Every creature that dies in the crown's presence is drafted into its court whether it wishes it or not. The bound dead then claw and cling at any enemy trying to move through them, and the crown draws strength from the size of the court it commands." [trait/always/resource] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Every creature that dies in the crown's presence is drafted into its court whether it wishes it or not. The bound dead then claw and cling at any enemy trying to move through them, and the crown draws strength from the size of the court it commands." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form)
[reskin] chassis nova: "Throne of Bone (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon languages: "understands all languages but can't speak, telepathy 120 ft." -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Skeletal Claw" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "a sun-crowned archlich who binds the dead of a whole kingdom" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Throne of Bone (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
```


---

## Review batch — high-cr-2026-10-04T09-11-00

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Heartwood Pyre | 17 | 2024 | brute-17-grappler | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Corvath the Pass-Bound | 19 | 2024 | skirmisher-18 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Thunderhead Titan | 20 | 2024 | skirmisher-18-hurler | ok | SOFT: aim-dpr, per-attack-floor | ok | ok | ok | ok | ok | soft (1) |
| Vellum the Unfinished | 21 | 2024 | caster-21 | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok | soft (1) |
| Siriath the Glass Sovereign | 22 | 2024 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | clean |
| Black Trench Kraken | 24 | 2024 | brute-17-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Vorlath the Locust Crown | 26 | 2024 | swarm-17 | ok | SOFT: hot-offense | SOFT: swarm-multiattack | ok | ok | ok | ok | soft (2) |
| Slumbering Char | 30 | 2024 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | clean |
| Ser Kaelthas the Ashen | 17 (2014) | 2014 | skirmisher-18-mounted | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Torvax the Iron | 20 (2014) | 2014 | defender-17-leader | ok | ok | ok | ok | ok | ok | ok | clean |
| Empyrean Verdict | 23 (2014) | 2014 | caster-21-warpriest | ok | ok | ok | ok | ok | ok | ok | clean |
| Vastmire Choir | 25 (2014) | 2014 | caster-21 | ok | SOFT: band, hot-offense | ok | SOFT: rider-no-save | ok | ok | ok | soft (2) |

**Fails by seat and gate:**
- none



---


### Heartwood Pyre — lowest CR

**Concept:** an ancient treant whose heartwood remembers every fire and crushes what carries a torch

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Heartwood Pyre | 17 | brute-17-grappler | ok | SOFT: aim-dpr, hot-offense | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 138 a round is 27% under the card's 190
- bands · soft · hot-offense: offense alone reads CR 21, 4 over; the HP axis pulls the read to 16
- read: def 11 / off 21 → 16; sustained 138 (2 × Hail of Bark + legendary Crush Advance); nova none; dmg 138

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

Senses blindsight 30 ft., darkvision 60 ft.; Passive Perception 19

Languages Common, Druidic, Elvish, Sylvan

CR 17 (XP 18,000; PB +6)

Traits

Emberheart Recoil. A creature that touches the heartwood pyre or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Legendary Resistance (3/Day). If the heartwood pyre fails a saving throw, it can choose to succeed instead.

Siege Monster. The heartwood pyre deals double damage to objects and structures.

Actions

Multiattack. The heartwood pyre makes two attacks, using Slam or Hail of Bark in any combination. It can replace one attack with a use of Merciless Strike.

Slam. Melee Attack Roll: +12, reach 5 ft. 24 (4d8 + 6) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 20). While Grappled, the target has the Restrained condition.

Hail of Bark. Ranged Attack Roll: +12, range 60/240 ft. 33 (6d8 + 6) Piercing damage.

Merciless Strike. Strength Saving Throw: DC 19, one creature within 60 feet that has the Grappled condition. Failure: 60 (11d10) Fire damage, and the target has the Prone condition until the end of its next turn. Success: Half damage.

Animate Trees (1/Day). The heartwood pyre magically animates up to two trees it can see within 60 feet of itself. Each tree uses the heartwood pyre stat block, except it has Intelligence and Charisma scores of 1, it can't speak, and it lacks this action. The tree takes its turn immediately after the heartwood pyre on the same Initiative count, and it obeys the heartwood pyre. A tree remains animate for 1 day or until it dies, the heartwood pyre dies, or it is more than 120 feet from the heartwood pyre. The tree then takes root if possible.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the heartwood pyre can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Crush Advance. The heartwood pyre moves up to half its Speed without provoking Opportunity Attacks, and it makes one Slam attack.

Pyre Drag. The heartwood pyre moves up to half its Speed without provoking Opportunity Attacks, carrying each creature it is grappling along with it.

Root Quake. Strength Saving Throw: DC 19, each creature within 10 feet of the heartwood pyre. Failure: The target has the Prone condition.

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
[route] brute-grappler type=Plant mechanics=grapple, engulf — brute-juggernaut: ✓ ("whose heartwood remembers every fire") | brute-juggernaut -> brute-grappler: the concept's VERB outranks the noun (key "crushes", class verb) | brute-grappler: key "crushes" (class verb)
[concept] signature elements: heartwood that remembers every fire [body] | crushes what carries a torch [behavior] | engulfing burning core [behavior]
[reskin] print canon array: STR 23, DEX 8, CON 21, INT 12, WIS 16, CHA 12 — the Treant's, STR fitted to +12
[reskin] print canon: "an ancient treant whose heartwood remembers every fire and crushes what carries a torch" heads on the Treant — print's rows ride along; the seat stays
[reskin] signature idea (action): "The pyre tears its own still-burning heartwood loose and hurls it, a living coal that lodges in the first creature it strikes and keeps burning where that creature goes. The burning seed shrinks as it chews, but any torch, fire, or open flame the burning creature passes near feeds the ember inside it and briefly swells it, so fleeing into more fire only makes the seed hungrier." [rider/on_hit/damage] — menu: charge-push, hook-rider, pounce (+ shelf: condition-payoff, throw-retrieve, hook-drag, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, herd, thrown-burst-seed, drain, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — condition-payoff (crush)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into condition-payoff
[reskin] value check: "Merciless Strike" EV 54.3 vs floor 29.6 (one attack of 2) — dice 115 → 60 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Merciless Strike" ("the concept's own verb is crush, and the ability should punish what carries a to [verb: crush:concept]")
[reskin] signature idea (trait): "Fire that would scorch it is swallowed whole and remembered: whenever the pyre burns, glimpse-fires roar and flicker across its bark, and any creature that grapples, strikes, or comes into pressing contact with the pyre is drawn toward those remembered flames, pulled bodily closer to the heartwood. The hungrier the pyre has grown with fire, the stronger that pull." [trait/always/movement] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (fire)
[reskin] signature template (trait): heated-body -> Traits/"Emberheart Recoil" ("fire that would scorch it is swallowed whole and any creature that grapples, str [verb: fire:concept, burn:idea, flame:idea, pyre:idea]")
[reskin] print canon languages: "Common" -> "Common, Druidic, Elvish, Sylvan" — the Treant's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Treant's walk; the concept's other modes stay
[reskin] print canon attack: "Cinderlance" -> "Hail of Bark" — the Treant's own ranged row
[reskin] print canon defenses: resistances none -> Bludgeoning, Piercing; vulnerabilities none -> Fire — the Treant's own header lines
[reskin] print canon trait: Siege Monster — "an ancient treant whose heartwood remembers every fire and crushes what carries a torch" is the Treant (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Cage" is the seat's, not the Treant's
[reskin] print canon row: Actions/Animate Trees (1/Day) — the Treant's own
```


---


### Slumbering Char — highest CR

**Concept:** a world-eating wyrm the size of a mountain that swallows cities and shrugs off armies

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Slumbering Char | 30 | dragon-22 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 30 / off 30 → 30; sustained 366 (3 × Crushing Maw + legendary Savage Bite); nova Pyroclastic Breath 84; dmg 366

```
Slumbering Char

Gargantuan Dragon, Unaligned

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

Senses blindsight 60 ft., tremorsense 120 ft., darkvision 120 ft.; Passive Perception 22

Languages Common, Draconic

CR 30 (XP 155,000; PB +9)

Traits

Legendary Resistance (4/Day). If the slumbering char fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The slumbering char makes three Crushing Maw attacks.

Crushing Maw. Melee Attack Roll: +19, reach 15 ft. 37 (6d8 + 10) Piercing damage plus 24 (7d6) Fire damage.

Pyroclastic Breath (Recharge 5-6). Dexterity Saving Throw: DC 26, each creature in a 90-foot Cone. Failure: 84 (13d12) Fire damage. Success: Half damage.

Spellcasting. The slumbering char casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 26):

- At Will: Detect Magic, Command, Telekinesis
- 1/Day Each: Scrying

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the slumbering char can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Savage Bite. The slumbering char makes one Crushing Maw attack.

Continent Shift. The slumbering char moves up to half its Speed without provoking Opportunity Attacks.

Chthonic Roar. Wisdom Saving Throw: DC 26, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] brute-grappler type=Dragon mechanics=grapple, engulf — brute-grappler: ✓ ("swallows cities") | brute-grappler: key "swallows" (class verb)
[concept] signature elements: swallows cities whole [behavior] | mountain-sized body of molten rock and flame [body] | armies break against its hide [aura]
[reskin] signature idea (action): "The char gathers all the fire burning inside it and releases it in a single, blinding detonation that washes over everything nearby, scorching even those who manage to turn away. The blast does not just burn; it clings to any who flee, leaving them trailing fire until they drop and roll or risk being consumed from within. The ground where the blast touches is left molten and treacherous for a time" [action/always/damage] — menu: hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce, charge)
[reskin] signature miss: action — "The char gathers all the fire burning inside it and releases it in a single, blinding detonation that washes over everything nearby, scorching even those who manage to turn away. The blast does not just burn; it clings to any who flee, leaving them trailing fire until they drop and roll or risk being consumed from within. The ground where the blast touches is left molten and treacherous for a time" [action/always/damage] — the model found no template that holds it (offered: hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter)
[reskin] signature idea (trait): "The char's body is a walking volcano; any weapon or creature that strikes it is met with a gout of molten rock and flame that erupts from the wound, punishing the attacker. Even those who merely stand too close feel the unbearable heat radiating from its crust, and the air around it shimmers with distortion." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — absorption (eat)
[reskin] signature miss: trait — "The char's body is a walking volcano; any weapon or creature that strikes it is met with a gout of molten rock and flame that erupts from the wound, punishing the attacker. Even those who merely stand too close feel the unbearable heat radiating from its crust, and the air around it shimmers with distortion." [trait/on_being_hit/damage] — the model found no template that holds it (offered: absorption)
[reskin] chassis nova: "Pyroclastic Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Corvath the Pass-Bound — a 2024 sheet

**Concept:** a vampire lord who rules a mountain court and commands the bats and wolves of the pass

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Corvath the Pass-Bound | 19 | skirmisher-18 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 23, 4 over; the HP axis pulls the read to 19.5
- read: def 16 / off 23 → 19.5; sustained 162 (3 × Grave Strike + legendary Deathless Strike); nova Gravewind Scour 72; dmg 162

```
Corvath the Pass-Bound

Medium Undead, Neutral Evil

AC 19
Initiative +7 (17)

HP 306 (36d8 + 144)

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

Batswarm Rebuke. A creature that touches Corvath or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Necrotic damage.

Legendary Resistance (3/Day). If Corvath fails a saving throw, it can choose to succeed instead.

Mist Reel. When a creature Corvath can see ends its turn within 5 feet of it, Corvath can move up to 15 feet without provoking Opportunity Attacks.

Misty Escape. If Corvath drops to 0 Hit Points outside its resting place, Corvath uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its Corvath form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its Corvath form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. Corvath can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. Corvath has these weaknesses:


- Forbiddance: Corvath can't enter a residence without an invitation from an occupant.
- Running Water: Corvath takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into Corvath's heart while Corvath has the Incapacitated condition in its resting place, Corvath has the Paralyzed condition until the weapon is removed.
- Sunlight: Corvath takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. Corvath makes three Grave Strike attacks. It can replace one attack with a use of Bite (Bat or Vampire Form Only).

Grave Strike. Melee Attack Roll: +13, reach 5 ft. 20 (3d8 + 7) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 18) from one of two hands.

Gravewind Scour (Recharge 5-6). Strength Saving Throw: DC 21, each creature in a 60-foot-long, 10-foot-wide Line. Failure: 72 (16d8) Necrotic damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 21, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 35 (10d6) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and Corvath regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Corvath Spawn under Corvath's control. Success: Half damage only.

Bonus Actions

Shape-Shift. If Corvath isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its Corvath form. Anything it is wearing transforms with it.
While in bat form, Corvath can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, Corvath can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). Corvath casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 18), and the duration is 24 hours. The Charmed target is a willing recipient of Corvath's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by Corvath.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Corvath can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathless Strike. Corvath moves up to half its Speed, and it makes one Grave Strike attack.

Beguile. Corvath casts Command, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 21). Corvath can't take this action again until the start of its next turn.

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
[route] caster-binder (controller) type=Undead mechanics=none — defender-leader: a Undead commands no troops | caster-binder: ✓ ("commands the bats and wolves of the pass") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: commands the bats and wolves of the pass [behavior] | curses and rays that steal actions [behavior] | grave-cold mountain court [aura]
[reskin] print canon route: the Vampire's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Vampire is not a caster first — it casts no spells — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 24, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +13
[reskin] print canon: "a vampire lord who rules a mountain court and commands the bats and wolves of the pass" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "Corvath looses a piercing shriek that only the beasts of the pass can hear, and every bat and wolf within a half-mile answers by hurling itself at whatever he wills. He picks the targets he can see, and the swarm savages each one in turn, clawing and biting before scattering back into the dark. He can call the pack only so often before the mountains fall silent and he must wait for the wild to gat" [action/always/damage] — menu: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] value check: "Disarming Twist" EV 0 vs floor 17.7 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The bats of the pass are Corvath's second body: while he hovers, a shrieking swirl surrounds him, and every foe who closes to strike him must fight through the swarm. Any creature that wounds him in melee finds the bats turn on it, tearing at the wound and dragging its aim and footfalls wide until it has shaken them off." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Batswarm Rebuke" ("Any creature that wounds him in melee — the bats turn on it — is exactly the ret [shape fit, no verb match]")
[reskin] chassis nova: "Gravewind Scour (Recharge 5-6)" — the skirmisher-18's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon languages: "Common, Abyssal, telepathy 120 ft." -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 60 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Vampire's own
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Misty Escape — "a vampire lord who rules a mountain court and commands the bats and wolves of the pass" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who rules a mountain court and commands the bats and wolves of the pass" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who rules a mountain court and commands the bats and wolves of the pass" is the Vampire (print's own row)
[reskin] print canon legendary: Deathless Strike, Beguile — the Vampire's own kit stands where the chassis's stood
[reskin] print canon: chassis row leaves — Traits/"Batswarm Grace" is the seat's, not the Vampire's
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 35
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---


### Vellum the Unfinished — a print donor

**Concept:** an archlich enthroned in a library of screaming books who binds the living with words

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Vellum the Unfinished | 21 | caster-21 | ok | ok | ok | SOFT: rider-no-save | ok | ok | ok |

- gates · soft · rider-no-save: Actions/Eldritch Burst: a Deafened rider on every hit with no save
- read: def 17 / off 21 → 19; sustained 141 (3 × Screaming Page + legendary Deathly Teleport); nova none; dmg 141

```
Vellum the Unfinished

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
+12
MOD
SAVE
DEX
16
+3
+3
WIS
14
+2
+9
MOD
SAVE
CON
16
+3
+10
CHA
16
+3
+3

Skills Arcana +12, Perception +9

Resistances Cold

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses darkvision 120 ft., truesight 30 ft.; Passive Perception 19

Languages All

CR 21 (XP 33,000; PB +7)

Traits

Legendary Resistance (3/Day). If Vellum fails a saving throw, it can choose to succeed instead.

Spirit Jar. If destroyed, Vellum reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within Vellum's lair.

Actions

Multiattack. Vellum makes three attacks, using Screaming Page, Eldritch Burst, or Numbing Touch in any combination. It can replace one attack with a use of Spellcasting to cast Bestow Curse.

Screaming Page. Melee or Ranged Attack Roll: +12, reach 5 ft. or range 120 ft. 36 (7d8 + 5) Psychic damage. If the target is a Large or smaller creature, it has the Restrained condition until the end of its next turn. This effect can be applied only once per turn.

Eldritch Burst. Melee Attack Roll: +12, reach 5 ft. 23 (4d8 + 5) Force damage, and the target has the Deafened condition until the start of Vellum's next turn.

Numbing Touch. Melee Attack Roll: +12, reach 5 ft. 23 (4d8 + 5) Cold damage, and the target has the Deafened condition until the start of Vellum's next turn.

Spellcasting. Vellum casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 20):

- At Will: Detect Magic, Minor Illusion, Bestow Curse
- 1/Day Each: Hypnotic Pattern

Reactions

Protective Magic (3/Day). Trigger: Vellum is hit by an attack roll. Response: Vellum casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Vellum can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. Vellum teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 20, each creature that isn't an Undead in a 20-foot Emanation originating from Vellum. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: Vellum can't take this action again until the start of its next turn.

Frightening Gaze. Vellum casts Fear, using the same spellcasting ability as Spellcasting. Vellum can't take this action again until the start of its next turn.

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
[route] caster-binder (controller) type=Undead mechanics=snare — caster-binder: ✓ ("binds the living with words") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: binding the living with spoken words [behavior] | screaming books in a dead library [object] | a bone throne grown from the spines of read men [body]
[reskin] print canon route: the Lich's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon defenses: HP 314 -> 315, AC 20 -> 20 — the Lich's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 21, WIS 14, CHA 16 — the Lich's at its own CR; attack +14 -> +12, DC 20 (print's)
[reskin] print canon: "an archlich enthroned in a library of screaming books who binds the living with words" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "Vellum reads aloud a line from its unfinished forbidden sentence, and that line becomes true of one creature it can see: every wound the target has yet to suffer on that same spot take root in its body before it happens. The target begins accumulating unmarked pain — future harm echoes backward and detonates the moment Vellum closes the sentence at the start of its next turn, or the creature is un" [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, snare, condition-payoff, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] signature bound to the concept's verb: action — bolt-restrain, snare, snare-bolt, sensory-strike (binds, bind, scream)
[reskin] signature rider: bolt-restrain -> Screaming Page (appended; the idea is a spoken line that binds a creature to a delayed echoing harm, leavi [verb: binds:concept])
[reskin] signature idea (trait): "The throne Vellum sits upon is grown from the spines of every reader it has ever finished, and those spines still remember being held. Whenever a creature that has heard Vellum speak (anyone who has been targeted by one of its verbal curses, attacks, or shrieks this fight) tries to leave its presence, the throne wrenches the memory of being read into their body — they cannot willingly move farther" [trait/always/movement] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (scream)
[reskin] signature miss: trait — "The throne Vellum sits upon is grown from the spines of every reader it has ever finished, and those spines still remember being held. Whenever a creature that has heard Vellum speak (anyone who has been targeted by one of its verbal curses, attacks, or shrieks this fight) tries to leave its presence, the throne wrenches the memory of being read into their body — they cannot willingly move farther" [trait/always/movement] — the model found no template that holds it (offered: bloodied-burst)
[reskin] chassis nova: "Librarian's Shriek (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Scripture" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned in a library of screaming books who binds the living with words" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Librarian's Shriek (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
```


---


### Thunderhead Titan — a legendary

**Concept:** a storm titan who walks the thunderhead and hurls lightning at the drowned

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Thunderhead Titan | 20 | skirmisher-18-hurler | ok | SOFT: aim-dpr, per-attack-floor | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 140 a round is 26% under the card's 190
- bands · soft · per-attack-floor: Fist: 35 a hit is under a quarter share of 190 across 1
- read: def 17 / off 22 → 19.5; sustained 140 (1 × Fist + legendary Storm Lunge); nova none; dmg 140

```
Thunderhead Titan

Huge Giant, Neutral

AC 20
Initiative +8 (18)

HP 325 (26d12 + 156)

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

Legendary Resistance (3/Day). If the thunderhead fails a saving throw, it can choose to succeed instead.

Storm Stride. The thunderhead ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Gale Shift. When a creature the thunderhead can see ends its turn within 5 feet of it, the thunderhead can move up to 15 feet without provoking Opportunity Attacks.

Actions

Fist. Melee Attack Roll: +14, reach 10 ft. 21 (3d8 + 8) Bludgeoning damage plus 14 (4d6) Lightning damage.

Anchored Thunderlance. The thunderhead hurls a braided lance of lightning. Ranged Attack Roll: +14, range 30/120 ft. 35 (6d8 + 8) Lightning damage. The weapon lands in an unoccupied space within 5 feet of the target; until the thunderhead spends 5 feet of movement in that space to recover it, the thunderhead's Speed is halved and it can't use this action.

Bonus Actions

Fleet Agility. The thunderhead takes the Dash or Disengage action.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the thunderhead can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Storm Lunge. The thunderhead moves up to half its Speed without provoking Opportunity Attacks, and it makes one Fist attack.

Storm Volley. The thunderhead can't take this action again until the start of its next turn.

Withdraw. The thunderhead takes the Dash or Disengage action.

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
[concept] signature elements: walking the thunderhead [behavior] | hurling lightning from the sky [behavior] | body of storm [body]
[reskin] signature idea (action): "The titan wrings the storm inside its own body and hurls a braided lance of lightning down at a single foe, and the bolt does not vanish on impact — it stays anchored in the struck creature, crackling there, so that every other bolt the titan throws this fight leaps first to that anchored mark and forks from it to nearby enemies. The anchor holds only while the titan keeps line of sight to its vic" [rider/on_hit/damage] — menu: charge-push, hook-rider, pounce, isolation, snatch, bolt-mark (+ shelf: snare, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] value check: "Anchored Thunderlance" EV 24.1 vs floor 18.2 (one attack of 3) — worth the trade
[reskin] signature template: throw-retrieve -> Actions/"Anchored Thunderlance" ("The titan hurls a bolt (a lance of lightning) at a single foe, and the bolt does [verb: lance:idea, anchor:idea]")
[reskin] signature idea (trait): "The titan is weather given a body, and its body answers weather: whenever lightning of any kind — its own bolts, a rival's storm, a thunderclap — goes off within sight of it, the charge pours into the titan and it moves like a gale in the same breath, sliding across the sky without giving anyone a parting swing. The titan cannot bank this; it simply happens every time the sky speaks." [trait/always/movement] — menu: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body (lightning, storm)
[reskin] signature bound by force: trait — "heated-body" matches lightning+storm in the user's words; the model's none is overruled
```


---


### Vorlath the Locust Crown — one marked soft

**Concept:** a demon prince of locusts crowned in his own swarm who strips kingdoms to bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Vorlath the Locust Crown | 26 | swarm-17 | ok | SOFT: hot-offense | SOFT: swarm-multiattack | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 30, 4 over; the HP axis pulls the read to 27
- structure · soft · swarm-multiattack: a swarm with a Multiattack (print swarms make one attack)
- read: def 24 / off 30 → 27; sustained 445 (2 × Mandibles + legendary Strip the Field); nova none; dmg 445

```
Vorlath the Locust Crown

Medium Swarm of Tiny Fiends, Neutral Evil

AC 18
Initiative +9 (19)

HP 552 (48d8 + 336)

Speed 30 ft., Fly 30 ft. (hover)

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

Senses blindsight 120 ft., darkvision 120 ft.; Passive Perception 11

Languages Common

CR 26 (XP 90,000; PB +8)

Traits

Legendary Resistance (3/Day). If the swarm fails a saving throw, it can choose to succeed instead.

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Multiattack. The swarm makes two Mandibles attacks.

Mandibles. Melee Attack Roll: +17, reach 5 ft. 54 (10d8 + 9) Piercing damage plus 35 (10d6) Necrotic damage, or 27 (6d8) Piercing damage plus 17 (5d6) Necrotic damage if the swarm is Bloodied.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the swarm can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Strip the Field. The swarm makes one Mandibles attack.

Tide Advance. The swarm moves up to half its Speed without provoking Opportunity Attacks.

Swarm Call. Wisdom Saving Throw: DC 25, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] swarm type=Fiend mechanics=aura — swarm: ✓ ("crowned in his own swarm") | swarm: no line key in the words — the model's read of its quote
[concept] signature elements: stripping kingdoms to bone [behavior] | crown formed from its own swarm [body] | the land stripped to famine [aura]
[reskin] signature idea (action): "The swarm pours itself over every creature in a wide line in front of it, grinding them with a hurricane of wings and teeth as it passes. Every creature caught in that sweep is left picked at, their flesh and armor scoured, so they take more harm from the swarm's bites until they tear free of the clinging stragglers. The tide then ends its move on the far side of the line, having swept straight th" [action/always/damage] — menu: trample, thrown-burst, gaze-single, execute, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew (+ shelf: blink, shell-withdraw, riposte, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] signature idea (trait): "Wherever the locust crown settles, the living world is consumed. At the start of the swarm's turn, the ground within its reach becomes stripped of all sustenance, and any creature that begins its turn in that blighted ground is weakened as its own body is gnawed by the crawling famine. The blight spreads each round the swarm remains, turning fertile ground into a spreading waste that lingers after" [trait/start_of_turn/condition] — menu: fire-aura, warded-mending (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form)
[reskin] signature miss: trait — "Wherever the locust crown settles, the living world is consumed. At the start of the swarm's turn, the ground within its reach becomes stripped of all sustenance, and any creature that begins its turn in that blighted ground is weakened as its own body is gnawed by the crawling famine. The blight spreads each round the swarm remains, turning fertile ground into a spreading waste that lingers after" [trait/start_of_turn/condition] — no template on the shelf shares a verb with the concept or the idea (offered: fire-aura, warded-mending, heated-body, false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form)
```


---


---

## Review batch — print-heads-2026-10-04T09-15-17

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Varcolac the Undying | 15 | 2024 | skirmisher-13 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |
| Sanguine Sovereign | 15 (2014) | 2014 | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 | 2024 | defender-17 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | soft (1) |
| Pit Fiend | 20 (2014) | 2014 | defender-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Oathsworn Thanegrast | 18 | 2024 | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Morgrave the Muster | 18 (2014) | 2014 | caster-21-warpriest | ok | ok | ok | ok | ok | ok | ok | clean |
| Ossuar the Thronebound | 24 | 2024 | caster-21 | ok | SOFT: aim-dpr, under | ok | SOFT: rider-no-save | ok | ok | ok | soft (2) |
| Sunreaper Osswald | 24 (2014) | 2014 | caster-21 | ok | SOFT: aim-dpr, band | ok | SOFT: rider-no-save | ok | ok | ok | soft (2) |

**Fails by seat and gate:**
- none



---


### Varcolac the Undying — lowest CR

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Varcolac the Undying | 15 | skirmisher-13 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 91 a round is 21% under the card's 115
- bands · soft · band: reads CR 12.5 (print at 15 reads 6.5–17.5, n=12)
- read: def 10 / off 15 → 12.5; sustained 66 (3 × Grave Strike); nova Crimson Rush 71; dmg 91

```
Varcolac the Undying

Medium Undead, Neutral Evil

AC 18
Initiative +6 (16)

HP 212 (25d8 + 100)

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
22
+6
+11
WIS
15
+2
+7
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

Skills Perception +7, Stealth +11

Resistances Necrotic

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft.; Passive Perception 17

Languages Common plus two other languages

CR 15 (XP 13,000; PB +5)

Traits

Slip Step. When a creature Varcolac can see ends its turn within 5 feet of it, Varcolac can move up to 10 feet without provoking Opportunity Attacks.

Legendary Resistance (3/Day). If Varcolac fails a saving throw, it can choose to succeed instead.

Misty Escape. If Varcolac drops to 0 Hit Points outside its resting place, Varcolac uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 Hit Points in mist form, it can't return to its Varcolac form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its Varcolac form and has the Paralyzed condition until it regains any Hit Points, and it regains 1 Hit Point after spending 1 hour there.

Spider Climb. Varcolac can climb difficult surfaces, including along ceilings, without needing to make an ability check.

Vampire Weakness. Varcolac has these weaknesses:


- Forbiddance: Varcolac can't enter a residence without an invitation from an occupant.
- Running Water: Varcolac takes 20 Acid damage if it ends its turn in running water.
- Stake to the Heart: If a weapon that deals Piercing damage is driven into Varcolac's heart while Varcolac has the Incapacitated condition in its resting place, Varcolac has the Paralyzed condition until the weapon is removed.
- Sunlight: Varcolac takes 20 Radiant damage if it starts its turn in sunlight. While in sunlight, it has Disadvantage on attack rolls and ability checks.

Actions

Multiattack. Varcolac makes three Grave Strike attacks. It can replace one attack with a use of Vampire's Reprisal.

Grave Strike. Melee Attack Roll: +11, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage plus 7 (2d6) Necrotic damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 17) from one of two hands.

Crimson Rush (Recharge 5-6). Strength Saving Throw: DC 19, each creature in a 60-foot-long, 5-foot-wide Line. Failure: 71 (13d10) Necrotic damage, and the target has the Prone condition until the end of its next turn. Success: Half damage only.

Vampire's Reprisal. Strength Saving Throw: DC 19, one creature within 30 feet that is Prone. Failure: 24 (7d6) Necrotic damage. Success: Half damage.

Bite (Bat or Vampire Form Only). Constitution Saving Throw: DC 19, one creature within 5 feet that is willing or that has the Grappled, Incapacitated, or Restrained condition. Failure: 28 (8d6) Piercing damage plus 13 (3d8) Necrotic damage. The target's Hit Point maximum decreases by an amount equal to the Necrotic damage taken, and Varcolac regains Hit Points equal to that amount. A Humanoid reduced to 0 Hit Points by this damage and then buried rises the following sunset as a Varcolac Spawn under Varcolac's control. Success: Half damage only.

Bonus Actions

Shape-Shift. If Varcolac isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its Varcolac form. Anything it is wearing transforms with it.
While in bat form, Varcolac can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, Varcolac can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has Resistance to all damage, except the damage it takes from sunlight.

Charm (Recharge 5-6). Varcolac casts Charm Person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The Charmed target is a willing recipient of Varcolac's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was Charmed by Varcolac.

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
[route] caster-binder (controller) type=Undead mechanics=none — defender-leader: a Undead commands no troops | caster-binder: ✓ ("a vampire lord") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: commands bats and wolves [behavior] | hexing curses that bind actions [behavior] | blood-fuelled regeneration [body]
[reskin] print canon route: the Vampire's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Vampire is not a caster first — it casts no spells — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 22, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +11
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "Varcolac curses the strongest foe he can see, binding their will so their limbs answer to him instead of themselves. Until the curse is broken, the victim is dragged one step closer to obeying Varcolac as one of his pack, and he can spend that victim's own movement to pull them into the jaws of his waiting wolves." [action/save/condition] — menu: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] value check: "Opportunist's Lash" EV 18.6 vs floor 15.1 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever a living creature is harmed by Varcolac or one of his beasts, some of its spilled vitality seeps through the shroud of bats and into him, knitting his wounds even as he remains untouched in the fight. The more prey his pack savages, the faster their master heals." [trait/always/resource] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Whenever a living creature is harmed by Varcolac or one of his beasts, some of its spilled vitality seeps through the shroud of bats and into him, knitting his wounds even as he remains untouched in the fight. The more prey his pack savages, the faster their master heals." [trait/always/resource] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst, warded-mending)
[reskin] chassis nova: "Wolf Rush (Recharge 5-6)" — the skirmisher-13's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon languages: "Common" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 50 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon: chassis row leaves — Traits/"Bat Shroud" is the seat's, not the Vampire's
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 28
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---


### Kraken — a 2024 sheet

**Concept:** a kraken of the black trench

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Kraken | 24 | brute-21 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 22 / off 15 → 18.5; sustained 68 (2 × Tentacle); nova none; dmg 68

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

Resistances Fire

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

Tentacle. Melee Attack Roll: +17, reach 30 ft. 34 (7d6 + 10) Bludgeoning damage. The target has the Grappled condition (escape DC 25) from one of ten tentacles, and it has the Restrained condition until the grapple ends.

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
[concept] signature elements: tentacle constriction and dragging prey to its maw [behavior] | a body of hyper-pressurized, scalding brine [body] | the crushing, lightless depths of the black trench [aura]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 541 -> 481, AC 21 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +16 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Scalding Brine (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Trench Kraken" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Scalding Brine (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row priced: Lightning Strike — dice 33 → 58
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
```


---


### Oathsworn Thanegrast — a homebrew with a nova

**Concept:** a death knight who leads a damned legion

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Oathsworn Thanegrast | 18 | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 23, 5 over; the HP axis pulls the read to 18
- read: def 13 / off 23 → 18; sustained 170 (2 × Graveblade + legendary Render Blow); nova Grave-Soil Bloom 72; dmg 170

```
Oathsworn Thanegrast

Medium Undead, Neutral

AC 19
Initiative +3 (13)

HP 247 (26d8 + 130)

Speed 40 ft.

MOD
SAVE
STR
22
+6
+6
INT
16
+3
+3
MOD
SAVE
DEX
16
+3
+3
WIS
24
+7
+13
MOD
SAVE
CON
21
+5
+11
CHA
20
+5
+11

Skills Perception +13, Religion +9

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 120 ft., tremorsense 30 ft.; Passive Perception 23

Languages the languages it knew in life

CR 18 (XP 20,000; PB +6)

Traits

Legendary Resistance (3/Day). If Thanegrast fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. Thanegrast makes two Graveblade attacks. It can replace one attack with a use of Spellcasting to cast Bestow Curse.

Graveblade. Melee or Ranged Attack Roll: +13, reach 5 ft. or range 120 ft. 34 (6d8 + 7) Slashing damage. Hit or Miss: The weapon magically returns to Thanegrast's hand.

Grave-Soil Bloom (Recharge 5-6). Constitution Saving Throw: DC 20, each creature in a 20-foot Emanation originating from Thanegrast. Failure: 72 (16d8) Necrotic damage. Success: Half damage only.

Spellcasting. Thanegrast casts one of the following spells, requiring no Material components and using Wisdom as the spellcasting ability (spell save DC 21):

- At Will: Bestow Curse, Blindness/Deafness, Fear
- 1/Day Each: Cloudkill (level 9 version)

Bonus Actions

On the Grave Oath (2/Day). Each ally within 30 feet of Thanegrast gains 26 (4d12) Temporary Hit Points.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Thanegrast can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Render Blow. Thanegrast makes one Graveblade attack.

Death March. Thanegrast moves up to half its Speed without provoking Opportunity Attacks.

Dread Muster. Wisdom Saving Throw: DC 20, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[route] caster-warpriest (artillery) type=Undead mechanics=none — defender-leader: a Undead commands no troops | caster-warpriest: ✓ ("death knight") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] signature elements: raises and commands a damned legion [behavior] | profane war-prayers that heal allies and wither enemies [behavior] | sword wreathed in grave-soil and unholy fire [object]
[reskin] signature idea (action): "Thanegrast plants its blade and calls up every corpse it has ever commanded, and a ring of spectral soldiers rises around it, striking as it strikes. While the circle stands, each time Thanegrast lands a hit, the soldiers replay the same blow on the same foe, and each time an enemy wounds him, one soldier steps in and takes the wound instead, crumbling to dust." [action/once_per_fight/damage] — menu: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "Thanegrast plants its blade and calls up every corpse it has ever commanded, and a ring of spectral soldiers rises around it, striking as it strikes. While the circle stands, each time Thanegrast lands a hit, the soldiers replay the same blow on the same foe, and each time an enemy wounds him, one soldier steps in and takes the wound instead, crumbling to dust." [action/once_per_fight/damage] — the model found no template that holds it (offered: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal, rally)
[reskin] value check: "Bolstering Cry (2/Day)" EV 14.3 vs floor 8.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Thanegrast's authority over his dead is absolute; whenever a creature he has raised is destroyed, its bones drag themselves back into rank beside him at the start of his next turn, healed enough to fight on." [trait/always/resource] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — death-burst (death)
[reskin] signature miss: trait — "Thanegrast's authority over his dead is absolute; whenever a creature he has raised is destroyed, its bones drag themselves back into rank beside him at the start of his next turn, healed enough to fight on." [trait/always/resource] — the model found no template that holds it (offered: death-burst)
[reskin] chassis nova: "Grave-Soil Bloom (Recharge 5-6)" — the caster-21-warpriest's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Pit Fiend — a legendary

**Concept:** a pit fiend general

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Pit Fiend | 20 | defender-17 | ok | ok | ok | ok | ok | ok | SOFT: print-rows |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Guard Aura
- read: def 19 / off 22 → 20.5; sustained 126 (3 × Bite + legendary Parry For the Line); nova none; dmg 126

```
Pit Fiend

Large Fiend, Lawful Evil

AC 21
Initiative +2 (12)

HP 337 (27d10 + 189)

Speed 30 ft., Fly 60 ft. (hover)

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

Guard Aura. While in a 10-foot Emanation originating from the pit fiend, the pit fiend's allies have Advantage on saving throws, provided the pit fiend doesn't have the Incapacitated condition.

Diabolical Restoration. If the pit fiend dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.

Fear Aura. The pit fiend emanates an aura in a 20-foot Emanation while it doesn't have the Incapacitated condition. Wisdom Saving Throw: DC 21, any enemy that starts its turn in the aura. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this pit fiend's aura for 24 hours.

Magic Resistance. The pit fiend has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The pit fiend makes three attacks, using Bite, Devilish Claw, or Fiery Mace in any combination.

Bite. Melee Attack Roll: +14, reach 10 ft. 21 (3d8 + 8) Piercing damage. If the target is a creature, it must make the following saving throw. Constitution Saving Throw: DC 21. Failure: The target has the Poisoned condition. While Poisoned, the target can't regain Hit Points and takes 21 (6d6) Poison damage at the start of each of its turns, and it repeats the save at the end of each of its turns, ending the effect on itself on a success. After 1 minute, it succeeds automatically.

Fiery Mace. Melee Attack Roll: +14, reach 10 ft. 21 (3d8 + 8) Force damage.

Devilish Claw. Melee Attack Roll: +14, reach 10 ft. 21 (3d8 + 8) Necrotic damage.

Hellfire Spellcasting (Recharge 4-6). The pit fiend casts Fireball (level 5 version) twice, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21). It can replace one Fireball with Hold Monster (level 7 version) or Wall of Fire.

- At Will:

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the pit fiend can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Parry For the Line. The pit fiend makes one Bite attack.

Hold the Line. The pit fiend takes the Dodge action. The pit fiend can't take this action again until the start of its next turn.

Break Rank. Strength Saving Throw: DC 21, one creature within 5 feet. Failure: The target is pushed up to 15 feet away from the pit fiend and has the Prone condition.

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
[route] defender-leader type=Fiend mechanics=teleport, aura — defender-leader: ✓ ("general") | defender-leader: no line key in the words — the model's read of its quote
[concept] signature elements: aura of command that buffs allies [aura] | iron-hardened devil body and parry [body] | tactical repositioning and extra attacks for troops [behavior]
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
[reskin] print canon attack: "Iron Glaive" -> "Bite" — the Pit Fiend's own row
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Pit Fiend's own header lines
[reskin] print canon trait: Diabolical Restoration — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Fear Aura — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon trait: Magic Resistance — "a pit fiend general" is the Pit Fiend (print's own row)
[reskin] print canon row: Actions/Hellfire Spellcasting (Recharge 4-6) — the Pit Fiend's own
```


---


### Ossuar the Thronebound — one marked soft

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Ossuar the Thronebound | 24 | caster-21 | ok | SOFT: aim-dpr, under | ok | SOFT: rider-no-save | ok | ok | ok |

- bands · soft · aim-dpr: damage 168 a round is 33% under the card's 250
- bands · soft · under: effective HP 442 sits under print at CR 24 (468–546, n=5); the read holds at 23, within print's own ±1
- gates · soft · rider-no-save: Actions/Eldritch Burst: a Frightened rider on every hit with no save
- read: def 22 / off 24 → 23; sustained 168 (3 × Bone Bolt + legendary Deathly Teleport); nova none; dmg 168

```
Ossuar the Thronebound

Medium Undead, Neutral Evil

AC 21
Initiative +3 (13)

HP 442 (59d8 + 177)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
28
+9
+16
MOD
SAVE
DEX
16
+3
+3
WIS
14
+2
+9
MOD
SAVE
CON
16
+3
+10
CHA
16
+3
+3

Skills Arcana +16, Perception +9

Resistances Cold

Immunities Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

Senses truesight 120 ft.; Passive Perception 19

Languages All

CR 24 (XP 62,000; PB +7)

Traits

Legendary Resistance (3/Day). If Ossuar fails a saving throw, it can choose to succeed instead.

Spirit Jar. If destroyed, Ossuar reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within Ossuar's lair.

Actions

Multiattack. Ossuar makes three attacks, using Bone Bolt, Eldritch Burst, or Dread Touch in any combination. It can replace one attack with a use of Spellcasting to cast Ray of Sickness.

Bone Bolt. Ranged Attack Roll: +16, range 80/320 ft. 45 (8d8 + 9) Necrotic damage.

Eldritch Burst. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Force damage, and the target has the Frightened condition until the start of Ossuar's next turn.

Dread Touch. Melee Attack Roll: +16, reach 5 ft. 27 (4d8 + 9) Cold damage, and the target has the Frightened condition until the start of Ossuar's next turn.

Spellcasting. Ossuar casts one of the following spells, requiring no Material components and using Intelligence as the spellcasting ability (spell save DC 24, +16 to hit with spell attacks):

- At Will: Ray of Sickness, Misty Step, Bestow Curse
- 1/Day Each: Blight (level 8 version)

Reactions

Protective Magic (3/Day). Trigger: Ossuar is hit by an attack roll. Response: Ossuar casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Ossuar can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. Ossuar teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 24, each creature that isn't an Undead in a 20-foot Emanation originating from Ossuar. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: Ossuar can't take this action again until the start of its next turn.

Frightening Gaze. Ossuar casts Fear, using the same spellcasting ability as Spellcasting. Ossuar can't take this action again until the start of its next turn.

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
[route] caster (artillery) type=Undead mechanics=none — caster: ✓ ("an archlich enthroned on a sun of bone") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: bolts of death loosed from a bone throne [behavior] | a throne that is a sun of bone [object] | the marrow-light of a dead star [aura]
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 28, WIS 14, CHA 16 — the Lich's, INT fitted to +16
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "Gathering the throne's cold marrow, Ossuar fires a single great bolt of necrotic death at one enemy it can see. The bolt tears through flesh and soul alike, and the wound it leaves keeps burning: for a short while, every time that enemy is hurt, the same cold eats deeper into it." [rider/on_hit/damage] — menu: bolt-restrain, bolt-drag, bolt-mark (+ shelf: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, aggro-curse, self-invisibility, rally, snap-shot)
[reskin] value check: "Leaden Touch" EV 7.8 vs floor 29.6 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Leaden Touch" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Ossuar draws its power from the bone sun it sits upon; when it strikes down a living creature, a mote of that stolen life rises to the throne and steadies its next shot. Until the end of its next turn, attacks loosed from the throne bite deeper." [trait/always/damage] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Ossuar draws its power from the bone sun it sits upon; when it strikes down a living creature, a mote of that stolen life rises to the throne and steadies its next shot. Until the end of its next turn, attacks loosed from the throne bite deeper." [trait/always/damage] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] chassis nova: "Solar Flare (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon size: Large -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Sceptre" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Solar Flare (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
```

