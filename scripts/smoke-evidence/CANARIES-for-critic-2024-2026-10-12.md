# Regression canaries — ten fixed blocks that run with every feature-branch landing — 2026-10-12 (canaries: the reference run and the run after the sprint fix round)

Owner's rule (2026-10-12): the forty waits for the critic's green light on a feature; in the meantime a few regression canaries run with every landing so the numbers stay intact. These are the ten, drawn from the old form-ten, critic-ten and day-one smoke batches, one roll each, with a numbers reference the script compares against.

## The batch (`scripts/smoke-batches/canaries.json`)

| # | shape | prompt | mode |
|---|---|---|---|
| 1 | single Name, print, 2024 | Name "Owlbear", CR 3 | exact |
| 2 | single Name, not print, CR from the words | Name "Headless Horseman", CR auto | band |
| 3 | description only, print head above its CR | "a wolf", CR 5 | band |
| 4 | print Name + a language addition | Name "Stone Golem" — "Output statblock in German", CR auto | exact |
| 5 | print Name + a claim | Name "Kobold" — "Can turn invisible once per day", CR 1/4 | band (a borrow: the chassis prices it) |
| 6 | print Name + a seat verb, 2014 | Name "Goblin Boss" — "riding a worg", 2014 | band (a borrow) |
| 7 | print head in a one-liner | "a troll that guards the bridge and collects a toll", CR 5 | band (a borrow) |
| 8 | description with a CR in the words | "big ogre with a club, cr 5" | band |
| 9 | print, 2014 | "a vampire spawn", CR 5, 2014 | exact |
| 10 | single Name, lowercase, not print | Name "the thing in the well", CR 5 | band |

## The check (`node scripts/canaries.mjs <run-dir>`)

Per block: AC, HP, every attack's bonus and average, every DC, the Multiattack count, against `scripts/smoke-evidence/canaries-reference.json`. **Exact** blocks (print bodies) must match to the digit. **Band** blocks hold AC ±1, HP ±15%, bonuses ±1, damage ±25%, DCs ±1; a band that moves together with a donor flip is reported as the route's roll, not a regression. The reference is re-baselined with `--write-reference` only at a release, in the same commit as the change that moved a number.

## What the first run caught (both fixed and gated before the reference was written)

- Print's Owlbear shipped with no Multiattack: the chassis at CR 3 carried no Multiattack row and the print rule only replaced an existing one. On an exact body print's Multiattack is now added when the chassis has none ("The owlbear makes two Rend attacks").
- The checker failed print's own Vampire Spawn: Spider Climb with no Climb speed. That is print's text at print's speed; a print-flagged Spider Climb is exempt from the predicate.

## The reference run (`canaries-2026-10-12T16-10-32`): 10 of 10 saved, 0 fails, 10 of 10 intact

| # | canary | mode | AC | HP | attacks (bonus/avg) | DCs | Multiattack | verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | single Name, print, 2024 | exact | 13 | 59 | Rend +7/14 |  | 2 | intact |
| 2 | single Name, not print, CR from the words | band | 16 | 78 | Saber +6/7 | 14 | 2 | intact |
| 3 | description only, print head scaled above its CR | band | 16 | 88 | Bite +6/6 |  | 2 | intact |
| 4 | print Name + a language addition | exact | 18 | 220 |  |  | 0 | intact |
| 5 | print Name + a claim (the Vanish seed) (a borrow: the chassis prices it) | band | 14 | 7 | Dagger +4/6, Sling +4/6 |  | 0 | intact |
| 6 | print Name + a seat verb, 2014 (a borrow: the chassis prices it) | band | 17 | 21 | Scimitar +4/6, Shortbow +4/6 | 12 | 2 | intact |
| 7 | print head in a one-liner (a borrow: the chassis prices it) | band | 15 | 94 | Rend +7/18 |  | 2 | intact |
| 8 | description with a CR in the words | band | 14 | 102 | Club +6/12, Slam +6/12, Boulder +6/16 |  | 2 | intact |
| 9 | print, 2014 | exact | 16 | 90 | Claw +6/8 | 14 | 2 | intact |
| 10 | single Name, lowercase, not print | band | 20 | 90 | Slam +6/12 | 14 | 2 | intact |

**Canaries:** 10 of 10 intact against the reference from `canaries-2026-10-12T16-10-32`.

Gate: 181 suites, 5,184 tests, build clean. The blocks follow, each with its checker row and trace.

## The critic's read of the reference (2026-10-12), and the fix round before it is trusted

The critic held the reference for two things and named five smaller ones. All landed in the engine, each with a pin in `reskin/__tests__/canaries.spec.js`:

1. **Print borrows above print's CR now re-solve.** An exact print body copies print's dice only *at* print's CR (`nearPrintCr`); above it the chassis's solved dice stand with print's type and rider. The CR 5 wolf bites for the skirmisher's dice, not the Wolf's 1d6. Print's array is **raise-only** above its CR: the Ogre keeps STR 19 over the card's +6 and the sheet rolls +7 with every flat following; a user's part row now keeps the slot's *whole* damage (the brute's energy clause folds into the weapon's dice instead of leaving 7 a hit on the floor).
2. **Exact canaries check every attack.** An exact body at print's CR carries print's own ranged row verbatim — bonus, dice, range — so the Stone Golem's Force Bolt is +9, 22 (4d10) at 120 ft., not the chassis's 7d6 + 6 at 60/240. For the German golem the checker and the canary read the **English twin** the translation call already stores on the block (`english`): the engine builds and checks in English, the translation holds the numbers, and no parser learns German (owner: "doing extra work for other languages is not worth it — unless we check before a translation call"). "Groß Konstrukt" stays as the translation wrote it, by the same rule.
3. **The Name field's short form:** a person speaks by the given name ("Gormak Skullsunder" → Gormak, "Meshrin" → Meshrin), an honorific keeps its name ("Sir Reginald Pemberton-Hughes" → Sir Reginald), an epithet heads on its noun ("Headless Horseman" → the horseman). No more "Headless makes two Saber attacks", no more "Sir".
4. **A seed the user's words drew carries them as provenance** (`boundKeys` = the keys the words matched): the Kobold's Vanish covers "Can turn invisible once per day".
5. **A row renamed Slam deals Bludgeoning** (print's Javelin on the Ogre).
6. **Print's Gear line names the 2014 armor**: the Goblin Boss prints "17 (chain shirt, shield)", not the kit table's "splint". The 2024 card shows AC alone, as print does.

Not fixed, by the owner's call: German grammar in the translated block.

## The reference, rewritten (`canaries-2026-10-12T16-43-57`): 10 of 10 saved, 0 fails, coverage 12/12 (100%), concept 88%

(The first read of this run said 11/12: the ogre's "cr 5" was the dropped clause — two letters and a digit, nothing a row could carry. The checker now reads a CR directive as honored when the sheet's CR matches; pinned.)

Against the *old* reference the fix round moved exactly the three blocks it meant to, and nothing else:

| # | canary | mode | AC | HP | attacks (bonus/avg) | DCs | Multiattack | verdict against the old reference |
|---|---|---|---|---|---|---|---|---|
| 1 | single Name, print, 2024 | exact | 13 | 59 | Rend +7/14 |  | 2 | intact |
| 2 | single Name, not print, CR from the words | band | 16 | 78 | Saber +6/8 | 14 | 2 | intact ("The horseman makes two Saber attacks") |
| 3 | description only, print head scaled above its CR | band | 16 | 88 | Bite +6/17 |  | 2 | **moved**: Bite 6→17 — two Bites, 34 a round against a CR 5 card of 40 |
| 4 | print Name + a language addition | exact | 18 | 220 | Slam +10/15, Force Bolt +9/22 | 17 | 2 | **moved**: the row was blank; it now reads every attack off the English twin, and the Force Bolt is print's +9, 22 (4d10) at 120 ft. |
| 5 | print Name + a claim (the Vanish seed) | band | 14 | 7 | Dagger +4/6, Sling +4/6 |  | 0 | intact; coverage 1/1 (the seed carries "invisible") |
| 6 | print Name + a seat verb, 2014 | band | 17 | 21 | Scimitar +4/6, Shortbow +4/6 | 12 | 2 | intact; the 2014 sheet prints "17 (chain shirt, shield)" |
| 7 | print head in a one-liner | band | 15 | 94 | Rend +7/18 |  | 2 | intact |
| 8 | description with a CR in the words | band | 14 | 102 | Club +7/22, Slam +7/22, Hurlstone +7/17 |  | 2 | **moved**: STR 19 stands, +7; Club 12→22, Slam 12→22 (Bludgeoning), 44 a round against 40 |
| 9 | print, 2014 | exact | 16 | 90 | Claw +6/8 | 14 | 2 | intact |
| 10 | single Name, lowercase, not print | band | 20 | 93 | Spur +6/12 | 14 | 2 | intact |

The reference is written from this run; 10 of 10 intact against itself. One soft in the run: the well-thing's "Mirrored Riposte" pays off Charmed with no producer on the sheet (a library seed past the imposed guard — not a numbers matter; on the close-out list). Gate: 182 suites, 5,199 tests (8 new pins in `canaries.spec.js`; the form-ten Stone Golem pin now asserts print's verbatim Force Bolt), build clean.

## The sprint batch's fix round, and the canaries after it (`canaries-2026-10-12T17-48-40`): 10 of 10 intact, 0 fails

Between the reference run and this one, the sprint feature batch (`FEATURES-case-2026-10.md`, 32 blocks) ran twice and its first read drove a second engine round, all pinned in `canaries.spec.js`: the part reader learned weapons inside a header clause, two weapons in one clause, a descriptive clause past a wield cue, plurals, and kick/headbutt/fingers; a part takes a slot of its own mode (a crossbow on the melee slot had turned the only melee row ranged); a part evicts a chassis row the model named the same; a lack of a whole attack mode drops that mode's rows; honorifics hold on every path ("Sir Lorn", never "the sir") and a role-noun epithet heads on its noun ("the marauder"); template rows carry the user's words as provenance; a riposte asked for by name lands beside a named style; the checker reads print's Evasion idiom and "that creature" after a named point. Gate: 182 suites, 5,199 tests, build clean.

**The canaries held through all of it.** Against the reference written at 16:43: every exact block to the digit (Owlbear, Steingolem with its English twin, Vampire Spawn), every band block inside its band, every Multiattack count the same, every DC the same. The one movement is block 10, the thing in the well, whose route rolled a different donor (lurker-5-trap → brute-5-grappler): AC 20 → 14 and its one attack 12 → 17 — reported by the script as the route's roll, not a regression, which is exactly the case the band mode exists for. Checker: 0 fails of 10, coverage 11/12 (the troll's "collects a fee" — the model paraphrased "toll" and the extraction's word-overlap kept it; a wording item, not a sheet item), concept share 90%.

| # | canary | mode | AC | HP | attacks (bonus/avg) | DCs | Multiattack | verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | single Name, print, 2024 | exact | 13 | 59 | Rend +7/14 |  | 2 | intact |
| 2 | single Name, not print, CR from the words | band | 16 | 78 | Saber +6/7 | 14 | 2 | intact ("The horseman makes two Saber attacks") |
| 3 | description only, print head above its CR | band | 16 | 88 | Bite +6/17 |  | 2 | intact |
| 4 | print Name + a language addition | exact | 18 | 220 | Slam +10/15, Force Bolt +9/22 | 17 | 2 | intact |
| 5 | print Name + a claim (the Vanish seed) | band | 14 | 7 | Dagger +4/6, Sling +4/6 |  | 0 | intact |
| 6 | print Name + a seat verb, 2014 | band | 17 | 21 | Scimitar +4/6, Shortbow +4/6 | 12 | 2 | intact |
| 7 | print head in a one-liner | band | 15 | 94 | Rend +7/18 |  | 2 | intact |
| 8 | description with a CR in the words | band | 14 | 102 | Club +7/22, Slam +7/22, Boulder +7/17 |  | 2 | intact |
| 9 | print, 2014 | exact | 16 | 90 | Claw +6/8 | 14 | 2 | intact |
| 10 | single Name, lowercase, not print | band | 14 | 102 | Hooklimb +6/17 | 14 | 2 | band moved with the donor (lurker-5-trap → brute-5-grappler, the route's roll) |

**Canaries:** 10 of 10 intact against the reference from `canaries-2026-10-12T16-43-57`. The reference stands.

---

# 2024 blocks

## Review batch — canaries-2026-10-12T17-48-40

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Headless Horseman | 4 | 2024 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Wolf | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Span-Warden | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 4/5 |
| Gorehide | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/3 |
| Vampire Spawn | 5 (2014) | 2014 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Well Drowned Brood | 5 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/3 |

**Dropped 1 of 12 user clauses** (coverage 92%); concept share 90% (36/40 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Kobold — lowest CR

**Concept:** name: Kobold | Can turn invisible once per day

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Kobold | 0.25 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1/2 → 0.3125; sustained 6 (1 × Dagger); nova none; dmg 6

```
Kobold

Small Dragon, Neutral

AC 14
Initiative +2 (12)

HP 7 (3d6 - 3)

Speed 30 ft.

MOD
SAVE
STR
7
-2
-2
INT
8
-1
-1
MOD
SAVE
DEX
15
+2
+4
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

Skills Perception +0, Stealth +4

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Draconic

CR 1/4 (XP 50; PB +2)

Traits

Pack Tactics. The kobold has Advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the kobold has Disadvantage on ability checks and attack rolls.

Actions

Dagger. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage.

Sling. Ranged Attack Roll: +4, range 30/120 ft. 6 (1d8 + 2) Bludgeoning damage.

Bonus Actions

Slippery Skulk (1/Day). The kobold casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("Can turn invisible once per day") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: one daily vanishing [behavior] | small reptilian hide [body] | sling and spear [object]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "The kobold clutches its holy relic-shard and blinks out of sight, leaving only a shimmer where it stood. It stays unseen until it attacks, until it takes a hit, or until the warren's blessing fades a short while later — enough for one ambush, one escape, or one last sling stone from nowhere. Once the gift is spent, the shard goes dull and the kobold must survive on its wits alone until the next da" [action/once_per_fight/condition] — menu: spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: lure, delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Shard Veil (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Shard Veil (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its hide is a patchwork of small, drab scales that drinks the shadows of narrow tunnels and loose stone. When it presses itself into cover — rubble, masonry, a crack in the warren wall — it simply reads as another piece of the dark to anything larger than itself, and sneaking past a bigger creature is as natural to it as breathing." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Spear" -> "Dagger" — the Kobold Warrior's own row
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Clinging" is the seat's, not the Kobold Warrior's
```


---


### Stone Golem — highest CR

**Concept:** name: Stone Golem | Output statblock in German

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 9 → 9.5; sustained 48 (2 × Slam); nova none; dmg 48

```
Steingolem

Groß Konstrukt, Neutral

RK 18
Initiative -1 (9)

TP 220 (21d10 + 105)

Bewegungsrate 30 ft.

MOD
RW
STÄ
22
+6
+10
INT
3
-4
-4
MOD
RW
GES
9
-1
-1
WEI
11
+0
+0
MOD
RW
KON
20
+5
+9
CHA
1
-5
-5

Fertigkeiten Athletik +10, Wahrnehmung +4

Immunitäten Gift, Psychisch; Bezaubert, Erschöpfung, Verängstigt, Gelähmt, Versteinert, Vergiftet

Sinne Dunkelsicht 120 ft.; Passive Wahrnehmung 14

Sprachen Versteht Gemeinsprache plus zwei weitere Sprachen, kann aber nicht sprechen

HG 10 (EP 5,900; ÜB +4)

Eigenschaften

Unveränderliche Gestalt. Der Steingolem kann seine Gestalt nicht ändern.

Magieresistenz. Der Steingolem hat Vorteil auf Rettungswürfe gegen Zauber und andere magische Effekte.

Aktionen

Mehrfachangriff. Der Steingolem führt zwei Angriffe aus und verwendet dabei Schlag oder Kraftstrahl in beliebiger Kombination.

Schlag. Nahkampfangriffswurf: +10, Reichweite 5 ft. 15 (2d8 + 6) Wuchtschaden plus 9 (2d8) Kraftschaden.

Kraftstrahl. Fernkampfangriffswurf: +9, Reichweite 120 ft. 22 (4d10) Kraftschaden.

Bonusaktionen

Verlangsamen (Aufladen 5-6). Der Steingolem wirkt den Zauber Verlangsamen, benötigt keine Zauberkomponenten und verwendet Konstitution als Zauberfähigkeit (Zauberrettungswurf-SG 17).

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
[route] brute-juggernaut type=Construct mechanics=none — brute-juggernaut: ✓ ("Stone Golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] cr from print: 10 — a print creature heads the words and the user set none
[concept] signature elements: walking through walls and crushing buildings [behavior] | immune to being reshaped or slowed by mortal magic [aura] | pulses of measured elemental force [body]
[reskin] print canon route: "Stone Golem — " is the Stone Golem — the juggernaut seat stands down for the plain line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] print canon: "Stone Golem — " is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Stone Golem's
[reskin] print canon senses: "darkvision 120 ft." — the Stone Golem's
[reskin] print canon languages: "Common" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon multiattack: "The stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Boulder" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
```


---


### Owlbear — a 2024 sheet

**Concept:** name: Owlbear | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("Owlbear") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: crushing bear-hug grapple [behavior] | beak that shears into pinned prey [body] | shaggy hide and feathers [body]
[reskin] print canon route: "Owlbear" is the Owlbear — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Bite" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
```


---


### Span-Warden — a print donor

**Concept:** a troll that guards the bridge and collects a toll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Span-Warden | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 36 (2 × Rend); nova none; dmg 36

```
Span-Warden

Large Giant, Lawful Neutral

AC 15
Initiative +1 (11)

HP 94 (9d10 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
7
-2
-2
MOD
SAVE
DEX
13
+1
+1
WIS
9
-1
-1
MOD
SAVE
CON
20
+5
+8
CHA
7
-2
-2

Skills Athletics +7, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages Giant

CR 5 (XP 1,800; PB +3)

Traits

Warding Vigil. While the span-warden isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Regeneration. The span-warden regains 15 Hit Points at the start of each of its turns. If the span-warden takes Acid or Fire damage, this trait doesn't function on the span-warden's next turn. The span-warden dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the span-warden ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the span-warden's limbs is severed, falls into the span-warden's space, and becomes a Troll Limb. The limb acts immediately after the span-warden's turn. The span-warden has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The span-warden makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 18 (4d6 + 4) Slashing damage.

Bonus Actions

Charge. The span-warden moves up to half its Speed straight toward an enemy it can see.

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
[route] defender type=Giant mechanics=none — brute-regenerator: ✓ ("a troll that guards the bridge") | brute-regenerator -> defender: the concept's VERB outranks the noun (key "guards the", class verb) | defender: key "guards the" (class verb)
[concept] signature elements: bridge-guard duty and toll collection [behavior] | stone-shrugging hide and regeneration [body] | poleaxe and shield used as a barrier [object]
[reskin] print canon defenses: HP 78 -> 94, AC 19 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll that guards the bridge and collects a fee" heads on the Troll — print's rows ride along; the seat stays
[reskin] signature idea (action): "The span-warden slams its shield down and declares the bridge closed, demanding a toll from everyone on the span. Anyone who wants to cross must pay in coin, livestock, or plunder dropped at its feet and step back while it counts; intruders who refuse are simply beaten off the edge and forced back to the near side. The warden only makes this demand once, and it keeps its word — whoever pays is wav" [action/always/condition] — menu: swallow, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, charge-push, hook-rider)
[reskin] signature miss: action — "The span-warden slams its shield down and declares the bridge closed, demanding a toll from everyone on the span. Anyone who wants to cross must pay in coin, livestock, or plunder dropped at its feet and step back while it counts; intruders who refuse are simply beaten off the edge and forced back to the near side. The warden only makes this demand once, and it keeps its word — whoever pays is wav" [action/always/condition] — the model found no template that holds it (offered: swallow, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, rally, charge-push)
[reskin] value check: "Horrid Display (2/Day)" EV 19.8 vs floor 30.4 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The warden's hide is bridge-stone cured by toll-silver, so the wounds it takes on the span knit closed faster the longer it stands its post, while any who strike it are drenched in the same stony, settling weight and grow briefly too heavy to slip past it." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bound, guarded-stance (guards the, guard)
[reskin] signature template (trait): guarded-stance -> Traits/"Toll-Stone Vigil" ("the warden's wounds knit closed while it stands its post — a defensive stance ro [verb: guard:concept]")
[reskin] print canon languages: "Common, Giant" -> "Giant" — the Troll's
[reskin] print canon attack: "Poleaxe" -> "Rend" — the Troll's own row
[reskin] print canon rows: Shield leave — the Troll has one melee row (Rend), and Multiattack reads print's
[reskin] print canon trait: Loathsome Limbs — "a troll that guards the bridge and collects a fee" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
```


---


### Headless Horseman — a homebrew with a nova

**Concept:** name: Headless Horseman | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Headless Horseman | 4 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 4 → 3; sustained 22 (2 × Saber); nova Hell Ride 22; dmg 29

```
Headless Horseman

Medium Undead, Neutral Evil

AC 16
Initiative +4 (14)

HP 78 (12d8 + 24)

Speed 50 ft.

MOD
SAVE
STR
14
+2
+2
INT
8
-1
-1
MOD
SAVE
DEX
18
+4
+6
WIS
12
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
8
-1
-1

Skills Perception +3, Stealth +6

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus the languages it knew in life

CR 4 (XP 1,100; PB +2)

Traits

Headlong Gallop. The horseman ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The horseman makes two Saber attacks. It can replace one attack with a use of Opportunist's Lash.

Saber. Melee Attack Roll: +6, reach 5 ft. 7 (1d6 + 4) Slashing damage plus 4 (1d8) Necrotic damage. If the horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Hell Ride (Recharge 5-6). The horseman moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Strength Saving Throw: DC 14. Failure: 22 (5d8) Bludgeoning damage, and the target has the Prone condition.

Opportunist's Lash. Strength Saving Throw: DC 14, one creature within 30 feet that is Prone. Failure: 7 (2d6) Necrotic damage. Success: Half damage.

Bonus Actions

Mounted Agility. The horseman takes the Dash or Disengage action.

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
[route] skirmisher-mounted type=Undead mechanics=none — skirmisher-mounted: ✓ ("Headless Horseman") | skirmisher-mounted: key "horseman" (class body)
[concept] cr from the words: 4 — the user set none and no print name heads the words; a fixed ladder, never the model's read (critic form-ten 2026-10-01)
[concept] signature elements: headless charge that rides down prey [behavior] | separated head and neck stump that spouts grave-dust [body] | cursed midnight road [aura]
[reskin] nova capped: "Trampling Rush" 24 → 22 (the chassis nova obeys the cap: 22 at CR 4)
[reskin] signature idea (action): "The horseman tears its own head free and hurls it at a creature it can see — the severed head shrieks through the air and buries itself in the victim, gnawing and riding them from within while the headless body keeps fighting. While the head is lodged, grave-dust streams from the neck stump, and the buried head can be wrenched free by the victim's allies, which only sends it flying back to its nec" [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: swallow, condition-payoff, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] value check: "Opportunist's Lash" EV 5.4 vs floor 5.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever the horseman is struck in melee, its neck stump erupts with a choking spout of grave-dust that clings to the attacker, blinding them and marking them for the horseman's next pass. This dust also settles on any creature the horseman leaves Prone, letting it sense exactly where they are as it circles back." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature miss: trait — "Whenever the horseman is struck in melee, its neck stump erupts with a choking spout of grave-dust that clings to the attacker, blinding them and marking them for the horseman's next pass. This dust also settles on any creature the horseman leaves Prone, letting it sense exactly where they are as it circles back." [trait/on_being_hit/condition] — the model found no template that holds it (offered: heated-body, absorption, bloodied-burst, resonant-body, faultless-tracker)
[reskin] chassis nova: "Hell Ride (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
```


---

## Review batch — canaries-2026-10-12T16-43-57

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, one marked soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Headless Horseman | 4 | 2024 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Wolf | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Kobold | 0.25 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Goblin Boss | 1 (2014) | 2014 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Bridge Toll | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 5/5 |
| Hollowstone Ogre | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 3/3 |
| Vampire Spawn | 5 (2014) | 2014 | lurker-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Drowned Reflection | 5 | 2024 | lurker-5-trap | ok | ok | SOFT: payoff-producer | ok | ok | ok | ok | ok | soft (1) | 1/1 | 0/3 |

**Dropped 1 of 12 user clauses** (coverage 92%); concept share 88% (35/40 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Kobold — lowest CR

**Concept:** name: Kobold | Can turn invisible once per day

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Kobold | 0.25 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1/2 → 0.3125; sustained 6 (1 × Dagger); nova none; dmg 6

```
Kobold

Small Dragon, Chaotic Neutral

AC 14
Initiative +2 (12)

HP 7 (3d6 - 3)

Speed 30 ft.

MOD
SAVE
STR
7
-2
-2
INT
8
-1
-1
MOD
SAVE
DEX
15
+2
+4
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

Skills Perception +0, Stealth +4

Senses darkvision 60 ft.; Passive Perception 10

Languages Common, Draconic

CR 1/4 (XP 50; PB +2)

Traits

Pack Tactics. The kobold has Advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Sunlight Sensitivity. While in sunlight, the kobold has Disadvantage on ability checks and attack rolls.

Actions

Dagger. Melee Attack Roll: +4, reach 5 ft. 6 (1d8 + 2) Piercing damage.

Sling. Ranged Attack Roll: +4, range 30/120 ft. 6 (1d8 + 2) Bludgeoning damage.

Bonus Actions

Slippery Escape (1/Day). The kobold casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("Can turn invisible once per day") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] signature elements: once-per-day invisibility [behavior] | lair-scavenging skirmisher [behavior] | venomous dragon-kin blood [body]
[reskin] print canon route: the Kobold Warrior's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon defenses: HP 15 -> 7, AC 14 -> 14 — the Kobold Warrior's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 7, DEX 15, CON 9, INT 8, WIS 7, CHA 8 — the Kobold Warrior's at its own CR; attack +4 -> +4, DC 12 (print's)
[reskin] print canon: "Kobold — Can turn invisible once per day" heads on the Kobold Warrior — print's rows ride along; the seat stays
[reskin] claim gate: CR 0.25 but the words claim a capability ("Can") — the wildcard stays open
[reskin] claim gate: CR 0.25 but a Humanoid body — the trait seat stays open (print: a material body carries a trait at every tier)
[reskin] signature idea (action): "Squeezing its dragon-blood until it dims to nothing, the kobold simply ceases to be seen, staying that way until it either scratches someone or loses its nerve. Calling on the gift again before it has rested and bled out the day's spark leaves it wracked and feeble, unable to keep up the vanishing act until the next dawn." [bonus_action/once_per_fight/condition] — menu: blink, aggro-curse, self-invisibility, focus, feint-slip, coating (+ shelf: lure, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, contagion, pounce)
[reskin] signature bound to the concept's verb: action — self-invisibility (invisible, turn invisible)
[reskin] value check: "Dimming Spark (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Dimming Spark (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 1 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The kobold's blood runs with a dwindling draconic spite, so any creature that sinks teeth or claws into it feels a sharp, slowing burn that lingers for a moment after the bite." [trait/on_being_hit/condition] — menu: EMPTY (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, bound, undead-fortitude, mimicry)
[reskin] signature miss: trait — "The kobold's blood runs with a dwindling draconic spite, so any creature that sinks teeth or claws into it feels a sharp, slowing burn that lingers for a moment after the bite." [trait/on_being_hit/condition] — the model found no template that holds it (offered: bloodied-fury, uncanny-sense)
[reskin] print canon type: Humanoid -> Dragon — the Kobold Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon trait: Pack Tactics — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon trait: Sunlight Sensitivity — "Kobold — Can turn invisible once per day" is the Kobold Warrior (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Kobold Warrior's
[reskin] print canon: chassis row leaves — Traits/"Skitter" is the seat's, not the Kobold Warrior's
```


---


### Stone Golem — highest CR

**Concept:** name: Stone Golem | Output statblock in German

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Stone Golem | 10 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 10 / off 9 → 9.5; sustained 48 (2 × Slam); nova none; dmg 48

```
Steingolem

Groß Konstrukt, Neutral

RK 18
Initiative -1 (9)

TP 220 (21d10 + 105)

Bewegungsrate 30 ft.

MOD
RW
STÄ
22
+6
+10
INT
3
-4
-4
MOD
RW
GES
9
-1
-1
WEI
11
+0
+0
MOD
RW
KON
20
+5
+9
CHA
1
-5
-5

Fertigkeiten Athletik +10, Wahrnehmung +4

Immunitäten Gift, Psychisch; Bezaubert, Erschöpfung, Verängstigt, Gelähmt, Versteinert, Vergiftet

Sinne Dunkelsicht 120 ft.; Passive Wahrnehmung 14

Sprachen Versteht Gemeinsprache sowie zwei andere Sprachen, kann aber nicht sprechen

HG 10 (EP 5,900; ÜB +4)

Eigenschaften

Unveränderliche Form. Der Steingolem kann seine Gestalt nicht verändern.

Magieresistenz. Der Steingolem hat Vorteil bei Rettungswürfen gegen Zauber und andere magische Effekte.

Aktionen

Multiangriff. Der Steingolem führt zwei Angriffe aus und verwendet dabei beliebig Kombinationen aus Schlag oder Kraftstrahl.

Schlag. Nahkampfangriffswurf: +10, Reichweite 5 ft. 15 (2d8 + 6) WuchtSchaden plus 9 (2d8) Kraftschaden.

Kraftstrahl. Fernkampfangriffswurf: +9, Reichweite 120 ft. 22 (4d10) Kraftschaden.

Bonusaktionen

Verlangsamen (Aufladen 5-6). Der Steingolem wirkt den Zauber Verlangsamen, wobei er keine Zauberkomponenten benötigt und Konstitution als Zauberfähigkeit verwendet (Zauberrettungswurf-SG 17).

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
[route] brute-juggernaut type=Construct mechanics=none — brute-juggernaut: ✓ ("Stone Golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] cr from print: 10 — a print creature heads the words and the user set none
[concept] signature elements: Immutable stone body [body] | Relentless, tactical juggernaut advance [behavior] | Magic immunity and spell absorption [aura]
[reskin] print canon route: "Stone Golem — " is the Stone Golem — the juggernaut seat stands down for the plain line
[reskin] print canon defenses: HP 182 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] print canon: "Stone Golem — " is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes walk only — the Stone Golem's
[reskin] print canon senses: "darkvision 120 ft." — the Stone Golem's
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon multiattack: "The stone golem makes two attacks, using Slam or Force Bolt in any combination." — the Stone Golem's own
[reskin] print canon attack: "Force Bolt" is print's own row — +9, 22 (4d10), range 120 ft. (an exact body at print's CR)
[reskin] print canon attack: "Hurl Debris" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon trait: Magic Resistance — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
```


---


### Owlbear — a 2024 sheet

**Concept:** name: Owlbear | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Owlbear | 3 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/2 / off 5 → 2.75; sustained 28 (2 × Rend); nova none; dmg 28

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
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("Owlbear") | brute-grappler: no line key in the words — the model's read of its quote
[concept] signature elements: crushing bear hug [behavior] | hooked beak [body] | raking claws [body]
[reskin] print canon route: "Owlbear" is the Owlbear — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "Owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Beak" -> "Rend" — the Owlbear's own row
[reskin] print canon multiattack: "The owlbear makes two Rend attacks." — the Owlbear's own, added (the chassis carried none; the Owlbear makes two Rend attacks — canaries 2026-10-12)
```


---


### Bridge Toll — a print donor

**Concept:** a troll that guards the bridge and collects a toll

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Bridge Toll | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 36 (2 × Rend); nova none; dmg 36

```
Bridge Toll

Large Giant, Neutral

AC 15
Initiative +1 (11)

HP 94 (9d10 + 45)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
7
-2
-2
MOD
SAVE
DEX
13
+1
+1
WIS
9
-1
-1
MOD
SAVE
CON
20
+5
+8
CHA
7
-2
-2

Skills Athletics +7, Perception +2

Senses darkvision 60 ft.; Passive Perception 12

Languages Giant

CR 5 (XP 1,800; PB +3)

Traits

Rooted Bulwark. While the bridge troll isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Regeneration. The bridge troll regains 15 Hit Points at the start of each of its turns. If the bridge troll takes Acid or Fire damage, this trait doesn't function on the bridge troll's next turn. The bridge troll dies only if it starts its turn with 0 Hit Points and doesn't regenerate.

Loathsome Limbs. If the bridge troll ends any turn Bloodied and took 15+ Slashing damage during that turn, one of the bridge troll's limbs is severed, falls into the bridge troll's space, and becomes a Troll Limb. The limb acts immediately after the bridge troll's turn. The bridge troll has 1 Exhaustion level for each missing limb, and it grows replacement limbs the next time it regains Hit Points.

Actions

Multiattack. The bridge troll makes two Rend attacks.

Rend. Melee Attack Roll: +7, reach 10 ft. 18 (4d6 + 4) Slashing damage.

Bonus Actions

Charge. The bridge troll moves up to half its Speed straight toward an enemy it can see.

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
[route] defender type=Giant mechanics=none — defender: ✓ ("guards the bridge") | defender: key "guards the" (class verb)
[concept] signature elements: blocks the bridge and demands a toll [behavior] | shield and club stance [object] | tough, regenerating hide [body]
[reskin] print canon defenses: HP 78 -> 94, AC 19 -> 15 — the Troll's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 18, DEX 13, CON 20, INT 7, WIS 9, CHA 7 — the Troll's at its own CR; attack +6 -> +7, DC 16 (print's)
[reskin] print canon: "a troll that guards the bridge and collects a fee" heads on the Troll — print's rows ride along; the seat stays
[reskin] signature idea (action): "The toll demands to be paid. Any creature on the bridge must hand over something of value or blood — a violent act of surrender, refusing it means the troll focuses only on them. The troll hammers a warning onto the bridge planks, and anyone who ignores the toll finds the club coming for them first." [rider/on_hit/condition] — menu: charge-push, hook-rider (+ shelf: swallow, seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] value check: "Disarming Twist" EV 0 vs floor 9.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The troll fights from a rooted stance, shield always between it and the bridge. As long as it has not moved since its last turn, anyone who strikes it in melee gets shoved back a step by the shield's rim, and the club is already swinging before they recover. It never takes a step back from its post." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — bound, guarded-stance (guards the, guard)
[reskin] signature template (trait): guarded-stance -> Traits/"Rooted Bulwark" ("the troll's shield is always between it and the bridge, so while it holds its ro [verb: guard:concept, stance:idea]")
[reskin] print canon languages: "Common" -> "Giant" — the Troll's
[reskin] print canon attack: "Club" -> "Rend" — the Troll's own row
[reskin] print canon rows: Shield Bash leave — the Troll has one melee row (Rend), and Multiattack reads print's
[reskin] print canon trait: Loathsome Limbs — "a troll that guards the bridge and collects a fee" is the Troll (print's own row)
[reskin] print canon trait: Regeneration — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Charge — the Troll's own
```


---


### Headless Horseman — a homebrew with a nova

**Concept:** name: Headless Horseman | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Headless Horseman | 4 | skirmisher-3-mounted | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 4 → 3; sustained 16 (2 × Saber); nova Trampling Charge 22; dmg 25

```
Headless Horseman

Medium Undead, Neutral

AC 16
Initiative +4 (14)

HP 78 (12d8 + 24)

Speed 50 ft.

MOD
SAVE
STR
14
+2
+2
INT
8
-1
-1
MOD
SAVE
DEX
18
+4
+6
WIS
12
+1
+1
MOD
SAVE
CON
14
+2
+2
CHA
8
-1
-1

Skills Perception +3, Stealth +6

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus the languages it knew in life

CR 4 (XP 1,100; PB +2)

Traits

Rider's Wake. The horseman ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The horseman makes two Saber attacks. It can replace one attack with a use of Merciless Strike.

Saber. Melee Attack Roll: +6, reach 5 ft. 8 (1d8 + 4) Slashing damage. If the horseman moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 4 (1d8) Slashing damage and, if it is Medium or smaller, has the Prone condition.

Trampling Charge (Recharge 5-6). The horseman moves up to its Speed without provoking Opportunity Attacks and can move through the spaces of Medium or smaller creatures. Each creature whose space it enters is targeted once by the following effect. Strength Saving Throw: DC 14. Failure: 22 (5d8) Necrotic damage, and the target has the Prone condition.

Merciless Strike. Wisdom Saving Throw: DC 14, one creature within 30 feet that has the Prone condition. Failure: 10 (3d6) Necrotic damage. Success: Half damage.

Bonus Actions

Mounted Agility. The horseman takes the Dash or Disengage action.

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
[route] skirmisher-mounted type=Undead mechanics=none — skirmisher-mounted: ✓ ("Headless Horseman") | skirmisher-mounted: key "horseman" (class body)
[concept] cr from the words: 4 — the user set none and no print name heads the words; a fixed ladder, never the model's read (critic form-ten 2026-10-01)
[concept] signature elements: headless spectral rider [body] | trampling charge [behavior] | necrotic saber [object]
[reskin] nova capped: "Trampling Rush" 24 → 22 (the chassis nova obeys the cap: 22 at CR 4)
[reskin] signature idea (action): "The horseman hurls a shrieking knot of spectral grave-light torn from the stump of its neck at a foe it just staggered. The blast is raw necrotic decay: it leaves the victim's flesh grey and slow-healing, so they take more punishment from the saber's next pass and cannot be mended by ordinary means for a short while. It can unleash this only a few times before its stolen death-magic thins." [rider/on_hit/damage] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: swallow, condition-payoff, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, rampage, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] value check: "Merciless Strike" EV 7.8 vs floor 5.2 (one attack of 2) — dice 21 → 10 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The horseman's empty saddle leaks a trail of necrotic chill. Any creature that ends its turn within that wake is seared by it, and the horseman can feel exactly where the trail still clings, marking those who linger in its path as its chosen prey until they shake it off." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The horseman's empty saddle leaks a trail of necrotic chill. Any creature that ends its turn within that wake is seared by it, and the horseman can feel exactly where the trail still clings, marking those who linger in its path as its chosen prey until they shake it off." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, heated-body)
[reskin] chassis nova: "Trampling Charge (Recharge 5-6)" — the skirmisher-3-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Drowned Reflection — one marked soft

**Concept:** name: the thing in the well | 

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability |
|---|---|---|---|---|---|---|---|---|---|---|
| Drowned Reflection | 5 | lurker-5-trap | ok | ok | SOFT: payoff-producer | ok | ok | ok | ok | ok |

- structure · soft · payoff-producer: Actions/Mirrored Riposte pays off the Charmed condition but nothing on the sheet imposes it
- read: def 5 / off 5 → 5; sustained 38 (2 × Spur); nova none; dmg 38

```
Drowned Reflection

Large Monstrosity, Neutral

AC 20
Initiative -1 (9)

HP 93 (11d10 + 33)

Speed 10 ft., Climb 20 ft.

MOD
SAVE
STR
16
+3
+6
INT
7
-2
-2
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
17
+3
+3
CHA
6
-2
-2

Skills Perception +6, Stealth +5

Senses darkvision 60 ft.; Passive Perception 16

Languages None

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The drowned reflection makes two Spur attacks. It can replace one attack with a use of Mirrored Riposte.

Spur. Melee Attack Roll: +6 (with Advantage if the target is Grappled by the drowned reflection), reach 5 ft. 12 (2d8 + 3) Piercing damage plus 7 (2d6) Acid damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).

Mirrored Riposte. Wisdom Saving Throw: DC 14, one creature within 30 feet that has the Charmed condition. Failure: 22 (5d8) Acid damage. Success: Half damage.

Bonus Actions

False Form. The drowned reflection shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

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
[route] lurker-trap type=Monstrosity mechanics=grapple — lurker-trap: ✓ ("the thing in the well") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: waiting in a well to ambush reflections [behavior] | body of interlocking bone-spurs [body] | acid-dripping bone spurs [body]
[reskin] signature idea (action): "The drowned reflection turns its body into a still, perfect image of the water's surface, and any creature that meets its gaze sees its own reflection staring back with no sign of the monster behind it. The creature is lured into leaning closer or reaching out, giving the reflection the opening it needs to surge up and resolve its reflection where the prey's guard is down." [action/always/condition] — menu: swallow, leap, condition-payoff, seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation)
[reskin] value check: "Mirrored Riposte" EV 17.1 vs floor 9.4 (one attack of 2) — dice 36 → 22 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Mirrored Riposte" ("the creature that meets its gaze sees its own reflection staring back with no si [shape fit, no verb match]")
[reskin] signature idea (trait): "Because its body is an interlocking cage of bone-spurs, every wound it takes makes its own hide worse to be near: the spurs grind and spray droplets of the same acid that coats its attacks. Anyone who lands a blow on it gets a faceful of that spray, and the acid clings and eats at armor and flesh alike." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```

