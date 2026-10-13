# Release candidate — the forty on commit eca4f6b — 2026-10-04

The forty (CR 1, 3, 5, 8, 10, 13, 15, 18, 20, 24 × a print name and a homebrew × 2024 and 2014) regenerated once on the committed engine — the runnability round plus your three regression fixes — with nothing landing during the run. Checker row above each sampled block, trace below; the gate table covers all forty. This is the regression confirmation you asked for; the acceptance suite ran alongside it.

---

---

# 2024 blocks

## Review batch — sweep-2026-10-04T09-58-22

The checker ran first. The gate table covers every block in the run; the blocks below span it (lowest CR, highest CR, a 2014 sheet, a 2024 sheet, a print donor, a homebrew with a nova, a legendary, one marked soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft, bands soft). Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 | 2024 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | clean |
| Bog Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Goblin Warrior | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | clean |
| Mirefather | 1 (2014) | 2014 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | clean |
| Owlbear | 3 | 2024 | brute-2 | ok | ok | ok | ok | ok | ok | ok | clean |
| Glass-Eyed Hermit | 3 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | clean |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | clean |
| Lampwife Maura | 3 (2014) | 2014 | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Troll | 5 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Brass Gate-Golem | 5 | 2024 | brute-5-grappler | ok | ok | SOFT: payoff-producer | SOFT: rider-no-save | ok | ok | ok | soft (2) |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Vault Warden | 5 (2014) | 2014 | brute-5-grappler | ok | ok | SOFT: payoff-producer | SOFT: rider-no-save | ok | ok | ok | soft (2) |
| Hydra | 8 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Grave Midwife | 8 | 2024 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Hydra | 8 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | clean |
| Plague-Seer | 8 (2014) | 2014 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Stone Golem | 10 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | clean |
| Hollow Ferryman | 10 | 2024 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | clean |
| Stone Golem | 10 (2014) | 2014 | brute-9 | ok | ok | ok | ok | ok | ok | ok | clean |
| Harbormantle | 10 (2014) | 2014 | lurker-5-phantom | ok | ok | ok | ok | ok | ok | ok | clean |
| Vampire | 13 | 2024 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | clean |
| Thunderherd | 13 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | clean |
| Vampire | 13 (2014) | 2014 | lurker-8 | ok | ok | ok | ok | ok | ok | ok | clean |
| Stave-Binder of the Herd | 13 (2014) | 2014 | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Adult Green Dragon | 15 | 2024 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | clean |
| Ossuary Ram | 15 | 2024 | brute-9-juggernaut | ok | ok | ok | ok | ok | ok | ok | clean |
| Adult Green Dragon | 15 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | clean |
| Thunderfall Colossus | 15 (2014) | 2014 | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok | soft (1) |
| Dragon Turtle | 18 | 2024 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | soft (1) |
| Mirror Assassin | 18 | 2024 | lurker-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | soft (1) |
| Dragon Turtle | 18 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | SOFT: lint:defense-overlap | ok | ok | soft (1) |
| Mirror Assassin | 18 (2014) | 2014 | lurker-17 | ok | ok | ok | ok | ok | ok | ok | clean |
| Pit Fiend | 20 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Vorenkaal | 20 | 2024 | dragon-22 | ok | SOFT: band, hot-offense | SOFT: payoff-producer | ok | ok | ok | ok | soft (2) |
| Pit Fiend | 20 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Glacier Wyrm | 20 (2014) | 2014 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | clean |
| Kraken | 24 | 2024 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Sun-Crowned Archlich | 24 | 2024 | caster-21 | ok | SOFT: aim-dpr, under | ok | ok | ok | ok | ok | soft (1) |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | clean |
| Solvenarch | 24 (2014) | 2014 | caster-21 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | ok | soft (1) |

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
[concept] signature elements: pack tactics and hit-and-run [behavior] | a crude weapon in hand [object] | leathery, wiry body [body]
[reskin] print canon array: STR 8, DEX 15, CON 10, INT 10, WIS 8, CHA 8 — the Goblin Warrior's, DEX fitted to +4
[reskin] print canon: "a goblin warrior" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 with no claimed mechanics — the wildcard slot drops (print: 74% of CR<=2 blocks carry no non-attack action)
[reskin] claim gate: the trait wildcard is closed at CR <= 2 — the chassis carries the traits
[reskin] print canon speed: modes walk only — the Goblin Warrior's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Warrior's
[reskin] print canon type: Humanoid -> Fey — the Goblin Warrior's (a Unicorn printed Fey, 2026-10-01)
[reskin] print canon attack: "Sling" -> "Shortbow" — the Goblin Warrior's own ranged row
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

Senses darkvision 30 ft.; Passive Perception 12

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
[concept] signature elements: mud-caked bog camouflage [body] | drags prey underwater [behavior] | locking jaws [body]
[reskin] claim gate: the trait wildcard is closed at CR <= 2 — the chassis carries the traits
[reskin] signature idea (action): "Churning its body in the slick mud, the hound thrashes any creature whose leg it has locked in its jaws, wrenching the victim downward toward the water in a corkscrewing death-roll. The thrash rears the hound half out of the bank and hurls it a short distance through the muck, towing whatever it is holding along, so the pair skid and splash toward deeper water. It can only do this while something " [rider/on_hit/movement] — menu: contagion, charge-push, hook-rider, pounce (+ shelf: hook-drag, active-toll, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating)
[reskin] signature bound to the concept's verb: action — hook-rider, hook-drag (drag, drags, under)
[reskin] signature bound by force: action — "hook-rider" matches drag+drags in the user's words; the model's none is overruled
[reskin] signature rider: hook-rider -> Bite (appended; exact concept match [verb: drag:concept, drags:concept])
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
[concept] signature elements: bear-owl hybrid body [body] | crushing grapple with hooked claws [behavior] | territorial ambush from den or brush [behavior]
[reskin] print canon route: "an owlbear" is the Owlbear — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 66 -> 59, AC 12 -> 13 — the Owlbear's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7 — the Owlbear's at its own CR; attack +5 -> +7, DC 15 (print's)
[reskin] print canon: "an owlbear" is a print creature — the seats stand down; print's own rows are the composition
[reskin] print canon speed: modes climb — the Owlbear's
[reskin] print canon senses: "darkvision 60 ft." — the Owlbear's
[reskin] print canon speed: 30 ft. -> 40 ft. — the Owlbear's walk; the concept's other modes stay
[reskin] print canon speed: Climb -> 40 ft. — the Owlbear's own
[reskin] print canon attack: "Beak" -> "Rend" — the Owlbear's own row
```


---


### Glass-Eyed Hermit — a homebrew with a nova

**Concept:** a glass-eyed hermit who hurls her lantern at thieves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Glass-Eyed Hermit | 3 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 14 (2 × Cudgel); nova Lantern Burst 17; dmg 21

```
Glass-Eyed Hermit

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

Skirmisher. The hermit ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The hermit makes two attacks, using Cudgel or Lantern in any combination. It can replace one attack with a use of Opportunist's Lash.

Cudgel. Melee Attack Roll: +5, reach 5 ft. 7 (1d8 + 3) Bludgeoning damage.

Lantern. Ranged Attack Roll: +5, range 30/90 ft. 7 (1d8 + 3) Fire damage. Hit or Miss: Immediately after the attack, a lit lantern returns to the hermit's grasp.

Lantern Burst (Recharge 5-6). The hermit hurls a lit lantern at a point it can see within 90 feet. Dexterity Saving Throw: DC 12, each creature in a 5-foot-radius Sphere centered on that point. Failure: 17 (5d6) Fire damage. If the target is Large or smaller, it has the Prone condition. Success: Half damage.

Opportunist's Lash. Strength Saving Throw: DC 12, one creature within 30 feet that is Prone. Failure: 6 (1d12) Fire damage. Success: Half damage.

Bonus Actions

Fleet Agility. The hermit takes the Dash or Disengage action.

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
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls her lantern") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurling oil lanterns [object] | glass eyes that see in the dark [body] | a hermit's grudge against thieves [behavior]
[reskin] nova capped: "Hurled Burst" 18 → 17 (the chassis nova obeys the cap: 17 at CR 3)
[reskin] signature idea (action): "The hermit hurls a shard of her own cracked glass eye at a thief's lantern or light source. The shard seeks out any held or carried light — torch, lantern, glowing weapon — and pops it with a sharp crack, plunging that patch of dark into true blackness only her glass eyes can see through. A thief who was counting on that light to spot her ambush now stands blind while she skitters away." [action/always/condition] — menu: snare, reel, condition-payoff, throw-retrieve, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Glass Eye Snuff" EV 1.1 vs floor 4.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Glass Eye Snuff" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Opportunist's Lash" EV 4.7 vs floor 4.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The hermit's glass eyes never blink and never look away; whenever a thief flees from her through darkness, she sees the exact path they took, and her lantern throws true along that ghost-line without any guesswork. Those who try to vanish into the dark around her find she already knows the shape of their retreat." [trait/always/defense] — menu: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — marking-light, resonant-body (lantern, glass)
[reskin] signature miss: trait — "The hermit's glass eyes never blink and never look away; whenever a thief flees from her through darkness, she sees the exact path they took, and her lantern throws true along that ghost-line without any guesswork. Those who try to vanish into the dark around her find she already knows the shape of their retreat." [trait/always/defense] — the model found no template that holds it (offered: marking-light, resonant-body)
[reskin] chassis nova: "Lantern Burst (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
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

Huge Dragon, Lawful Evil

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

Legendary Resistance (3/Day). If the adult green dragon fails a saving throw, it can choose to succeed instead.

Amphibious. The adult green dragon can breathe air and water.

Actions

Multiattack. The adult green dragon makes three Rend attacks. It can replace one attack with a use of Spellcasting to cast Suggestion.

Rend. Melee Attack Roll: +11, reach 10 ft. 19 (3d8 + 6) Slashing damage plus 7 (2d6) Poison damage.

Poison Breath (Recharge 5-6). Constitution Saving Throw: DC 18, each creature in a 60-foot Cone. Failure: 71 (13d10) Poison damage. Success: Half damage.

Spellcasting. The adult green dragon casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 17):

- At Will: Detect Magic, Mind Spike
- 1/Day Each: Geas

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the adult green dragon can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Mind Invasion. The adult green dragon uses Spellcasting to cast Mind Spike (level 3 version).

Noxious Miasma. Constitution Saving Throw: DC 18, each creature in a 20-foot-radius Sphere centered on a point the adult green dragon can see within 90 feet. Failure: 7 (2d6) Poison damage, and the target takes a -2 penalty to AC until the end of its next turn. Failure or Success: the adult green dragon can't take this action again until the start of its next turn.

Pounce. The adult green dragon moves up to half its Speed, and it makes one Rend attack.

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
[concept] signature elements: poisonous breath weapon [behavior] | amphibious forest predator [body] | cunning manipulator [behavior]
[reskin] print canon defenses: HP 192 -> 207, AC 19 -> 19 — the Adult Green Dragon's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 23, DEX 12, CON 21, INT 18, WIS 15, CHA 18 — the Adult Green Dragon's at its own CR; attack +11 -> +11, DC 18 (print's)
[reskin] print canon: "an adult green dragon" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Poison Breath (Recharge 5-6)" — the dragon-15's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes fly, swim — the Adult Green Dragon's
[reskin] print canon senses: "blindsight 60 ft., darkvision 120 ft." — the Adult Green Dragon's
[reskin] print canon languages: "Common, Draconic, Sylvan" -> "Common, Draconic" — the Adult Green Dragon's
[reskin] print canon attack: "Bite" -> "Rend" — the Adult Green Dragon's own row
[reskin] print canon defenses: immunities Poison -> Poison; Poisoned — the Adult Green Dragon's own header lines
[reskin] print canon trait: Amphibious — "an adult green dragon" is the Adult Green Dragon (print's own row)
[reskin] print canon legendary: Mind Invasion, Noxious Miasma, Pounce — the Adult Green Dragon's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```


---


### Grave Midwife — bands soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Grave Midwife | 8 | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–10.5, n=24)
- read: def 5 / off 8 → 6.5; sustained 54 (3 × Claw); nova none; dmg 54

```
Grave Midwife

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

Multiattack. The grave midwife makes three attacks, using Claw or Withering Bolt in any combination. It can replace one attack with a use of (A) Withering Curse or (B) Spellcasting to cast Ray of Sickness.

Claw. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Force damage.

Withering Bolt. Ranged Attack Roll: +8, range 80/320 ft. 14 (2d8 + 5) Piercing damage.

Withering Curse. Constitution Saving Throw: DC 16, one creature within 60 feet. Failure: 16 (3d10) Bludgeoning damage, and the target has the Poisoned condition until the end of its next turn.

Spellcasting. The grave midwife casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 16, +8 to hit with spell attacks):

- At Will: Ray of Sickness
- 1/Day Each: Bestow Curse, Blight, Cloudkill

Stillborn Draught. Constitution Saving Throw: DC 16, one creature within 30 feet. Failure: 18 (4d8) Piercing damage, and the grave midwife regains Hit Points equal to half the damage dealt. Success: Half damage only.

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
[concept] signature elements: cursing the firstborn [behavior] | contagious hexes [behavior] | blood-borne plague [body]
[reskin] signature idea (action): "The midwife picks out the one among its enemies carrying the mark it left at birth — the eldest, the heir, the firstborn — and speaks their true name aloud. That one's blood turns in their veins: they take steady harm that gnaws at them every moment they remain standing, and while it runs they cannot act, their body locking up around the rot even as their mind screams. It fires whenever the midwif" [action/once_per_fight/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] value check: "Blood-Writ Name" EV 5.5 vs floor 9.4 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Blood-Writ Name" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Vitality Leech" EV 14 vs floor 9.4 (one attack of 3) — added Success: Half; dice 11 → 18
[reskin] library seed drawn: drain -> Actions/"Vitality Leech" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The plague does not stay where it is put. Any wound the midwife opens with its claw or bolt festers past the closing — the struck creature's blood carries the rot on beyond them, so that each of its own nearby allies sickens quietly as the fight wears on. The contamination only spreads from a creature still bleeding from the midwife's touch, and it reaches no further than the air can carry a smell" [trait/always/condition] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The plague does not stay where it is put. Any wound the midwife opens with its claw or bolt festers past the closing — the struck creature's blood carries the rot on beyond them, so that each of its own nearby allies sickens quietly as the fight wears on. The contamination only spreads from a creature still bleeding from the midwife's touch, and it reaches no further than the air can carry a smell" [trait/always/condition] — the model found no template that holds it (offered: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, bloodied-burst)
```


---


### Mirror Assassin — bands soft

**Concept:** a mirror assassin who strikes from the reflections of her victims

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Mirror Assassin | 18 | lurker-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 23, 5 over; the HP axis pulls the read to 17.5
- read: def 12 / off 23 → 17.5; sustained 174 (3 × Glassblade + legendary Reflection Pounce); nova none; dmg 174

```
Mirror Assassin

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

Senses darkvision 60 ft.; Passive Perception 20

Languages Common

CR 18 (XP 20,000; PB +6)

Traits

Vile Appearance. Wisdom Saving Throw: DC 21, any creature that starts its turn within 30 feet of the mirror assassin and can see it. Failure: The target has the Frightened condition until the start of its next turn. Success: The target is immune to this creature's gaze for 24 hours.

Assassinate. During the first round of each combat, the mirror assassin has Advantage on attack rolls against any creature that hasn't taken a turn. If the mirror assassin hits a creature during that round, the target takes an extra 21 (6d6) Psychic damage.

Legendary Resistance (3/Day). If the mirror assassin fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. The mirror assassin makes three Glassblade attacks. It can replace one attack with a use of Reflected Terror.

Glassblade. Melee Attack Roll: +13, reach 5 ft. 16 (2d8 + 7) Slashing damage plus 13 (3d8) Psychic damage.

Reflected Terror. Strength Saving Throw: DC 21, one creature within 30 feet that is Frightened of the mirror assassin. Failure: 31 (9d6) Psychic damage. Success: Half damage.

Bonus Actions

Umbral Step. While in Dim Light or Darkness, the mirror assassin takes the Hide action.

Shadowslip (Recharge 4-6). The mirror assassin teleports up to 40 feet to an unoccupied space it can see.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the mirror assassin can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Reflection Pounce. The mirror assassin moves up to half its Speed without provoking Opportunity Attacks, and it makes one Glassblade attack.

Glassmelt. While in Dim Light or Darkness, the mirror assassin takes the Hide action. The mirror assassin can't take this action again until the start of its next turn.

Mirror Terror. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[concept] signature elements: striking from reflections [behavior] | shadow-stuff body that mimics the victim [body] | a cursed mirror-blade [object]
[reskin] signature idea (action): "The mirror assassin strikes at a creature whose reflection it is wearing, and that reflection's stolen face shatters in sympathy. The victim's own likeness rebels, wounding body and mind as if it had been struck instead." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation (+ shelf: gaze-single, condition-payoff, execute, seal, wail, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, delayed-brand, zone-seed, exploiter, blighted-ground, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature re-seated: action — no rider shares the verb; the idea "The mirror assassin strikes at a creature whose reflection i…" is tried as an action
[reskin] signature idea (action): "The mirror assassin strikes at a creature whose reflection it is wearing, and that reflection's stolen face shatters in sympathy. The victim's own likeness rebels, wounding body and mind as if it had been struck instead." [action/save/damage] — menu: gaze-single, condition-payoff, execute, seal, wail, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation)
[reskin] signature miss: action — "The mirror assassin strikes at a creature whose reflection it is wearing, and that reflection's stolen face shatters in sympathy. The victim's own likeness rebels, wounding body and mind as if it had been struck instead." [action/save/damage] — no template on the shelf shares a verb with the concept or the idea (offered: gaze-single, condition-payoff, execute, seal, wail, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground, delayed-brand, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation)
[reskin] value check: "Opportunist's Lash" EV 24 vs floor 20.3 (one attack of 3) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The assassin's body is unstable shadow-stuff, and it instinctively mimics the appearance of whoever last wounded it. Until it strikes again, it wears that creature's face and form, moving and sounding like them, though the disguise frays when it attacks." [trait/always/defense] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — gaze-aura (reflection, reflections)
[reskin] signature bound by force: trait — "gaze-aura" matches reflection+reflections in the user's words; the model's none is overruled
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): gaze-aura -> Traits/"Vile Appearance" ("exact concept match [verb: reflection:concept, reflections:concept]")
```


---


### Vorenkaal — bands soft

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Vorenkaal | 20 | dragon-22 | ok | SOFT: band, hot-offense | SOFT: payoff-producer | ok | ok | ok | ok |

- bands · soft · band: reads CR 22 (print at 20 reads 12.5–22.5, n=8)
- bands · soft · hot-offense: offense alone reads CR 25, 5 over; the HP axis pulls the read to 22
- structure · soft · payoff-producer: Actions/Rimebite Consumption pays off the Restrained condition but nothing on the sheet imposes it
- read: def 19 / off 25 → 22; sustained 204 (3 × Bite + legendary Snap); nova Freezing Breath 76; dmg 204

```
Vorenkaal

Gargantuan Dragon, Neutral

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

Sure Footing. Difficult Terrain composed of ice or snow doesn't cost Vorenkaal extra movement, and Vorenkaal can move across ice or snow without needing to make an ability check.

Legendary Resistance (4/Day). If Vorenkaal fails a saving throw, it can choose to succeed instead.

Actions

Multiattack. Vorenkaal makes three Bite attacks. It can replace one attack with a use of (A) Rimebite Consumption or (B) Spellcasting to cast Fear.

Bite. Melee Attack Roll: +14, reach 15 ft. 21 (3d8 + 8) Piercing damage plus 13 (3d8) Cold damage.

Freezing Breath (Recharge 5-6). Constitution Saving Throw: DC 21, each creature in a 90-foot Cone. Failure: 76 (17d8) Cold damage. Success: Half damage.

Spellcasting. Vorenkaal casts one of the following spells, requiring no Material components and using Charisma as the spellcasting ability (spell save DC 21):

- At Will: Command, Fear, Dispel Magic
- 1/Day Each: Scrying

Rimebite Consumption. Strength Saving Throw: DC 21, one creature within 60 feet that has the Restrained condition. Failure: 45 (13d6) Cold damage, and the target has the Prone condition until the end of its next turn. Success: Half damage.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, Vorenkaal can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Snap. Vorenkaal makes one Bite attack.

Surge. Vorenkaal moves up to half its Speed without provoking Opportunity Attacks.

Deep Maw. Wisdom Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Frightened condition until the end of its next turn.

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
[concept] signature elements: swallowing ships whole [behavior] | breath that freezes the sea [body] | ice-encased body [body]
[reskin] signature idea (action): "Vorenkaal focuses its glacial breath through its fangs and leaves a creeping rime on everything its frost has already touched. Any creature still carrying the chill from a previous breath is gripped by ferocious cold that spreads and deepens across its body, turning water and flesh alike into cracked, brittle ice. This new assault is strongest against the already-frozen, and each victim it fells b" [action/always/damage] — menu: condition-payoff, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] value check: "Rimebite Consumption" EV 40.8 vs floor 22.4 (one attack of 3) — dice 84 → 45 (scaled down to the ceiling)
[reskin] signature template: condition-payoff -> Actions/"Rimebite Consumption" ("strongest against creatures already carrying the chill of a previous breath, gri [shape fit, no verb match]")
[reskin] signature idea (trait): "Vorenkaal's hide is not merely cold but actively hungry for warmth. Whenever intense heat or flame touches the wyrm's scales, the ice there shrieks, shatters, and re-forms, and any creature who dared to strike it with fire or fight it up close is lashed by an explosive blast of frozen shards and killing frost rising off its body." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature bound by force: trait — "terrain-walk" matches freezes+freeze+glacier in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: freezes:concept, freeze:concept, glacier:concept, ice:idea, frozen:idea]")
[reskin] chassis nova: "Freezing Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Sun-Crowned Archlich — bands soft

**Concept:** a sun-crowned archlich who binds the dead of a whole kingdom

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Sun-Crowned Archlich | 24 | caster-21 | ok | SOFT: aim-dpr, under | ok | ok | ok | ok | ok |

- bands · soft · aim-dpr: damage 168 a round is 33% under the card's 250
- bands · soft · under: effective HP 442 sits under print at CR 24 (468–546, n=5); the read holds at 23, within print's own ±1
- read: def 22 / off 24 → 23; sustained 168 (3 × Necrotic Bolt + legendary Deathly Teleport); nova none; dmg 168

```
Sun-Crowned Archlich

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

Senses darkvision 120 ft.; Passive Perception 19

Languages All

CR 24 (XP 62,000; PB +7)

Traits

Legendary Resistance (3/Day). If the sun-crowned archlich fails a saving throw, it can choose to succeed instead.

Spirit Jar. If destroyed, the sun-crowned archlich reforms in 1d10 days if it has a spirit jar, reviving with all its Hit Points. The new body appears in an unoccupied space within the sun-crowned archlich's lair.

Actions

Multiattack. The sun-crowned archlich makes three attacks, using Necrotic Bolt, Eldritch Burst, or Numbing Touch in any combination. It can replace one attack with a use of (A) Sovereign Binding or (B) Spellcasting to cast Bestow Curse.

Necrotic Bolt. Melee or Ranged Attack Roll: +16, reach 5 ft. or range 120 ft. 45 (8d8 + 9) Necrotic damage.

Eldritch Burst. Melee Attack Roll: +16, reach 5 ft. 45 (8d8 + 9) Force damage.

Numbing Touch. Melee Attack Roll: +16, reach 5 ft. 45 (8d8 + 9) Cold damage, and the target has the Paralyzed condition until the start of the sun-crowned archlich's next turn.

Spellcasting. The sun-crowned archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 24):

- At Will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
- 2/Day Each: Animate Dead, Dimension Door, Plane Shift
- 1/Day Each: Chain Lightning, Finger of Death, Power Word Kill, Scrying

Sovereign Binding. Dexterity Saving Throw: DC 24, one creature within 60 feet. Failure: The target has the Restrained condition until the end of the sun-crowned archlich's next turn.

Reactions

Protective Magic (3/Day). Trigger: The sun-crowned archlich is hit by an attack roll. Response: The sun-crowned archlich casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

Legendary Actions

Legendary Action Uses: 3. Immediately after another creature's turn, the sun-crowned archlich can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.

Deathly Teleport. The sun-crowned archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) Necrotic damage.

Disrupt Life. Constitution Saving Throw: DC 24, each creature that isn't an Undead in a 20-foot Emanation originating from the sun-crowned archlich. Failure: 31 (9d6) Necrotic damage. Success: Half damage. Failure or Success: the sun-crowned archlich can't take this action again until the start of its next turn.

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
[concept] signature elements: binding the dead of a kingdom [behavior] | sun-bleached crown of bone [body] | curses that steal actions [aura]
[reskin] print canon route: the Lich's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon array: STR 11, DEX 16, CON 16, INT 28, WIS 14, CHA 16 — the Lich's, INT fitted to +16
[reskin] print canon: "a sun-crowned archlich who binds the dead of a whole kingdom" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The archlich forces the memory of a buried monarch to rise and serve. One enemy who can see it is wracked by the stolen authority of the dead king, and for as long as the archlich keeps its attention fixed on that enemy, the victim is dazed, unable to act freely, and whenever it tries to strike the archlich, the dead king's grief lashes back and steals something from it." [action/save/condition] — menu: gaze-single, execute, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — snare-bolt, bolt-restrain (bind, binds)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into snare-bolt, bolt-restrain
[reskin] value check: "Sovereign Binding" EV 31.4 vs floor 29.6 (one attack of 3) — worth the trade
[reskin] signature template: snare-bolt -> Actions/"Sovereign Binding" ("The idea says the archlich 'binds' the dead of a whole kingdom; the snare-bolt t [verb: bind:concept]")
[reskin] signature idea (trait): "The archlich's curses are not merely magic but binding law of its court: every creature within its domain that is frightened, blinded, or otherwise cursed finds its reactions stripped away, as though the dead kingdom's silence has already claimed its voice and movement." [trait/always/condition] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, gaze-aura)
[reskin] signature miss: trait — "The archlich's curses are not merely magic but binding law of its court: every creature within its domain that is frightened, blinded, or otherwise cursed finds its reactions stripped away, as though the dead kingdom's silence has already claimed its voice and movement." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, blurred-form)
[reskin] chassis nova: "Blinding Corona (Recharge 5-6)" — the caster-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon languages: "understands all languages but can't speak, telepathy 120 ft." -> "All" — the Lich's
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Necrotic Claw" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "a sun-crowned archlich who binds the dead of a whole kingdom" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Blinding Corona (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
```

