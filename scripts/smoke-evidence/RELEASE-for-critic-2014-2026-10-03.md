# Release table for the critic — 2014 blocks — 2026-10-03

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-03.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

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


### Sun-Crowned Archlich — highest CR

**Concept:** a sun-crowned archlich who binds the dead of a whole kingdom

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Sun-Crowned Archlich | 24 (2014) | skirmisher-22 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | SOFT: print-rows |

- bands · soft · aim-dpr: damage 153 a round is 40% under the table's 255
- bands · soft · band: reads CR 21.5 (print at 24 reads 20.5–24.5, n=5)
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Sovereign Slip
- read: def 22 / off 21 → 21.5; sustained 153 (3 × Crown-Ray + legendary Deathly Teleport); nova none; dmg 153

```
Sun-Crowned Archlich
Medium undead, neutral
Armor Class 19 (natural armor)
Hit Points 487 (65d8 + 195)
Speed 30 ft.
STR 11 (+0), DEX 18 (+4), CON 16 (+3), INT 21 (+5), WIS 14 (+2), CHA 16 (+3)
Saving Throws DEX +11, WIS +9
Skills Perception +9, Stealth +11
Damage Resistances cold
Damage Immunities necrotic, poison
Condition Immunities charmed, exhaustion, frightened, paralyzed, poisoned
Senses darkvision 60 ft., truesight 120 ft., passive Perception 19
Languages All
Challenge 24 (62,000 XP)
Proficiency Bonus +7

Traits
Legendary Resistance (4/Day): If the sun-crowned archlich fails a saving throw, it can choose to succeed instead.
Sovereign Slip: When a creature the sun-crowned archlich can see ends its turn within 5 feet of it, the sun-crowned archlich can move up to 20 feet without provoking Opportunity Attacks.
Spirit Jar: If destroyed, the sun-crowned archlich reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the sun-crowned archlich's lair.
Protective Magic (Reaction): The sun-crowned archlich casts *Counterspell* or *Shield* in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The sun-crowned archlich makes three attacks, using Eldritch Burst, Crown-Ray, or Paralyzing Touch. It can replace one attack with a use of Grasp of the Setting Sun.
Eldritch Burst: Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 28 (7d6 + 4) force damage.
Paralyzing Touch: Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 28 (7d6 + 4) cold damage. and the target has the Paralyzed condition until the start of the sun-crowned archlich's next turn.
Crown-Ray: Ranged Weapon Attack: +11 to hit, range 90/240 ft., one target. Hit: 40 (8d8 + 4) necrotic damage.
Grasp of the Setting Sun: *Dexterity Saving Throw:* DC 21, one creature within 60 feet. On a failed save, The target has the Restrained condition until the end of the sun-crowned archlich's next turn.
Spellcasting: The sun-crowned archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20): **At Will:** *Detect Magic*, *Detect Thoughts*, *Dispel Magic*, *Fireball*, *Invisibility*, *Lightning Bolt*, *Mage Hand*, *Prestidigitation*
**2/Day Each:** *Animate Dead*, *Dimension Door*, *Plane Shift*
**1/Day Each:** *Chain Lightning*, *Finger of Death*, *Power Word Kill*, *Scrying*

Legendary Actions
Deathly Teleport: The sun-crowned archlich teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an Undead in a 20-foot radius originating from the sun-crowned archlich must make a DC 21 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
Frightening Gaze: The sun-crowned archlich casts *Fear*, using the same spellcasting ability as Spellcasting. The sun-crowned archlich can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] caster-binder (controller) type=Undead mechanics=none — caster-binder: ✓ ("binds the dead of a whole kingdom") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: binding the dead of a whole kingdom to his will [behavior] | the sun-crown that marks and claims the living [object] | a body of grave-wax and stolen bone [body]
[reskin] print canon route: the Lich's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Lich is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 11, DEX 18, CON 16, INT 21, WIS 14, CHA 16 — the Lich's, DEX fitted to +11
[reskin] print canon: "a sun-crowned archlich who binds the dead of a whole kingdom" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The archlich slams a claim into the earth, and the ground opens in a broad ring around it. The last few creatures to die in that ring—whether enemy or ally—rise as silent, sun-marked thralls that turn on the living and obey only the archlich. Each is bound to its death spot and crumbles if it strays too far, so the battlefield itself becomes a shrinking kingdom of the dead." [action/once_per_fight/condition] — menu: gaze-single, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark, charge)
[reskin] signature bound to the concept's verb: action — snare-bolt (bind)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into snare-bolt
[reskin] signature miss: action — "The archlich slams a claim into the earth, and the ground opens in a broad ring around it. The last few creatures to die in that ring—whether enemy or ally—rise as silent, sun-marked thralls that turn on the living and obey only the archlich. Each is bound to its death spot and crumbles if it strays too far, so the battlefield itself becomes a shrinking kingdom of the dead." [action/once_per_fight/condition] — the model found no template that holds it (offered: snare-bolt)
[reskin] value check: "Binding Lash" EV 25.3 vs floor 23.9 (one attack of 3) — worth the trade
[reskin] library seed drawn: snare-bolt -> Actions/"Binding Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Any creature the archlich hits with Crown-Ray is marked by the sun-crown; a glowing ring of dawnlight stays on its flesh. While marked, it takes extra necrotic damage from every attack the archlich makes, and when it dies, it rises at once in a burst of sunfire as a short-lived thrall that attacks the nearest living thing before crumbling." [trait/always/damage] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "Any creature the archlich hits with Crown-Ray is marked by the sun-crown; a glowing ring of dawnlight stays on its flesh. While marked, it takes extra necrotic damage from every attack the archlich makes, and when it dies, it rises at once in a burst of sunfire as a short-lived thrall that attacks the nearest living thing before crumbling." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, bloodied-burst, heated-body, resonant-body)
[reskin] chassis nova: "Grave-Wax Tide (Recharge 5-6)" — the skirmisher-22's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon speed: 70 ft. -> 30 ft. — the Lich's walk; the concept's other modes stay
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Scepter" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "a sun-crowned archlich who binds the dead of a whole kingdom" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Grave-Wax Tide (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Lich's
[reskin] print canon: chassis row leaves — Traits/"Grave-Walk" is the seat's, not the Lich's
[reskin] print canon row: Actions/Spellcasting — the Lich's own
[reskin] print canon row: Reactions/Protective Magic — the Lich's own
```


---


### Goblin Warrior — a 2014 sheet

**Concept:** a goblin warrior

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 (2014) | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1/8 / off 1 → 0.5625; sustained 10 (2 × Scimitar); nova none; dmg 10

```
Goblin Warrior
Small humanoid, neutral
Armor Class 13 (studded leather)
Hit Points 24 (7d6)
Speed 30 ft.
STR 8 (-1), DEX 12 (+1), CON 10 (+0), INT 10 (+0), WIS 8 (-1), CHA 8 (-1)
Saving Throws DEX +3
Skills Perception +1, Stealth +3
Senses darkvision 60 ft., passive Perception 11
Languages Common, Goblin
Challenge 1 (200 XP)
Proficiency Bonus +2

Traits
Nimble Escape (Bonus Action): The goblin takes the Disengage or Hide action.

Actions
Multiattack: The goblin warrior makes two attacks, using Scimitar or Shortbow.
Scimitar: Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage plus 2 (1d4) slashing damage if the attack roll had Advantage.
Shortbow: Ranged Weapon Attack: +3 to hit, range 80/320 ft., one target. Hit: 5 (1d8 + 1) piercing damage.
```

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a goblin warrior") | skirmisher: no line key in the words — the model's read of its quote
[concept] signature elements: pack hit-and-run tactics [behavior] | jagged iron blade [object] | flees when bloodied [behavior]
[reskin] print canon array: STR 8, DEX 12, CON 10, INT 10, WIS 8, CHA 8 — the Goblin Warrior's, DEX fitted to +3
[reskin] print canon: "a goblin warrior" is a print creature — the seats stand down; print's own rows are the composition
[reskin] claim gate: CR 1 with no claimed mechanics — the wildcard slot drops (print: 74% of CR<=2 blocks carry no non-attack action)
[reskin] claim gate: the trait wildcard is closed at CR <= 2 — the chassis carries the traits
[reskin] print canon speed: modes walk only — the Goblin Warrior's
[reskin] print canon senses: "darkvision 60 ft." — the Goblin Warrior's
[reskin] print canon type: Humanoid stays — the Goblin Warrior is Fey in 2024 only; this is a 2014 sheet (form-ten 2026-10-01)
[reskin] print canon attack: "Silvered Blade" -> "Scimitar" — the Goblin Warrior's own row
[reskin] print canon attack: "Bone Javelin" -> "Shortbow" — the Goblin Warrior's own ranged row
[reskin] print canon: chassis row leaves — Traits/"Skulker" is the seat's, not the Goblin Warrior's
[reskin] print canon row: Bonus Actions/Nimble Escape — the Goblin Warrior's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Goblin Warrior's Nimble Escape
```


---


### Lamplight Hermit — one marked soft

**Concept:** a glass-eyed hermit who hurls her lantern at thieves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Lamplight Hermit | 3 (2014) | skirmisher-8-hurler | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 1.25 (print at 3 reads 0.125–6.5, n=23)
- read: def 1/2 / off 2 → 1.25; sustained 12 (2 × Staff); nova Lantern Shatter 17; dmg 19

```
Lamplight Hermit
Medium humanoid, neutral
Armor Class

13 (leather)

Hit Points: 

60 (8d8 + 24)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

14 (+2)

	

16 (+3)

	

10 (+0)

	

14 (+2)

	

10 (+0)

Skills: 

Perception +4, Stealth +4

Saving Throws: 

DEX +4, WIS +4

Damage Resistances: 

fire

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common

Challenge

3 (700 XP)

Proficiency Bonus:

+2

Glassback Flare. A creature the hermit damages sheds dim light in a 5-foot radius until the end of the hermit's next turn and can't benefit from being invisible while it does.
Skittering. The hermit ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the hermit takes the Dash or Disengage action.

Actions
Multiattack: The hermit makes two attacks: one with its Staff and one with its Lantern. It can replace one attack with a use of Lantern Backlash.
Staff: Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage.
Lantern: Ranged Weapon Attack: +4 to hit, range 30/90 ft., one target. Hit: 6 (1d8 + 2) fire damage. Immediately after the attack, a lantern returns to the hermit's grasp.
Lantern Shatter (Recharge 5-6): The hermit hurls a lantern at a point it can see within 90 feet. Each creature in a 5-foot-radius sphere centered on that point must make a DC 13 Dexterity saving throw, taking 17 (5d6) fire damage on a failed save, or half as much damage on a successful one. On a failed save, if the target is Large or smaller, it is knocked prone.
Lantern Backlash: One creature within 30 feet that is prone must make a DC 13 Strength saving throw, taking 6 (1d12) fire damage on a failed save, or half as much damage on a successful one.
```

**Engine trace**

```
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls her lantern at thieves") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurls her lantern [object] | glass-eyed hermit [body] | thief-hating recluse [behavior]
[reskin] nova capped: "Hurled Burst" 18 → 17 (the chassis nova obeys the cap: 17 at CR 3)
[reskin] signature idea (action): "The hermit reaches out and douses the light around a creature it can see, plunging that creature into a pocket of gloom that clings to it. While wrapped in that gloom, the creature cannot be seen by any light-based sense and must rely on its own eyes alone. The gloom lasts until the hermit's next turn, and the hermit can use this action again only after a short rest." [action/once_per_fight/condition] — menu: snare, reel, condition-payoff, throw-retrieve, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Gloom Snuffer" EV 1.1 vs floor 4.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Gloom Snuffer" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Opportunist's Lash" EV 4.7 vs floor 4.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever a creature strikes the hermit in melee, the hermit's lantern flares wildly, spraying burning glass into the attacker's face. The attacker is momentarily blinded by the flash and takes a small amount of fire damage." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — resonant-body, marking-light (glass, lantern)
[reskin] signature template (trait): marking-light -> Traits/"Glassback Flare" ("The idea's core is the lantern's damaging flare that sprays burning glass, but t [verb: lantern:concept]")
[reskin] chassis nova: "Lantern Shatter (Recharge 5-6)" — the skirmisher-8-hurler's own nova row (its "Hurled Burst", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Plague-Seer — bands soft

**Concept:** a plague-seer who curses the firstborn of every house

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Plague-Seer | 8 (2014) | caster-8-binder | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 6.5 (print at 8 reads 2–8.5, n=10)
- read: def 5 / off 8 → 6.5; sustained 51 (3 × Hexed Touch); nova none; dmg 51

```
Plague-Seer
Medium humanoid, neutral evil
Armor Class

15 (chain shirt)

Hit Points: 

135 (18d8 + 54)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

15 (+2)

	

16 (+3)

	

14 (+2)

	

15 (+2)

	

18 (+4)

Skills: 

Perception +5, Deception +7

Saving Throws: 

WIS +5, CHA +7

Senses: 

darkvision 60 ft., passive Perception 15

Languages: 

Common

Challenge

8 (3,900 XP)

Proficiency Bonus:

+3

Festering Hex. As a bonus action, the plague-seer targets one creature within 30 feet of it. The target must succeed on a DC 16 Wisdom saving throw or have disadvantage on attack rolls against creatures other than the plague-seer until the start of the plague-seer's next turn.

Actions
Multiattack: The plague-seer makes three attacks, using Hexed Touch, Withering Ray, or both. It can replace one attack with a use of Plague Curse or its Spellcasting to cast ray of sickness.
Hexed Touch: Melee Spell Attack: +7 to hit, reach 5 ft., one target. Hit: 17 (3d8 + 4) bludgeoning damage.
Withering Ray: Ranged Spell Attack: +7 to hit, range 60 ft., one target. Hit: 13 (2d8 + 4) necrotic damage.
Plague Curse: One creature within 60 feet of the plague-seer must succeed on a DC 16 Constitution saving throw or take 14 (4d6) necrotic damage and be poisoned until the end of its next turn.
Spellcasting: The plague-seer casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 15): -

At will: ray of sickness
-

1/day each: bestow curse, cloudkill
```

**Engine trace**

```
[route] caster-binder (controller) type=Humanoid mechanics=none — caster-binder: ✓ ("curses the firstborn of every house") | caster-binder: key "curses" (class verb)
[concept] signature elements: cursing the firstborn of every house [behavior] | body of venomous ichor [body] | hexed finger pointing [body]
[reskin] signature idea (action): "The plague-seer points a finger and lays the Curse of the Firstborn on one foe, branding them as eldest of their line so the plague can claim them. While the curse holds, moving and acting fight each other in the target's body: if it moves, it cannot act, and if it acts, it cannot move, each round the choice must be made again. The curse lingers until it is shaken off or the seer dies." [action/save/condition] — menu: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "The plague-seer points a finger and lays the Curse of the Firstborn on one foe, branding them as eldest of their line so the plague can claim them. While the curse holds, moving and acting fight each other in the target's body: if it moves, it cannot act, and if it acts, it cannot move, each round the choice must be made again. The curse lingers until it is shaken off or the seer dies." [action/save/condition] — the model found no template that holds it (offered: condition-payoff, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground, delayed-brand, bolt-mark, aggro-curse)
[reskin] value check: "Binding Mark" EV 5.1 vs floor 2.8 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: aggro-curse -> Bonus Actions/"Binding Mark" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The plague-seer's flesh is a wet, venomous ichor that spits back whenever it is struck in melee: the blood that lands on an attacker threatens to pass the plague, leaving them vulnerable to its curses. If that attacker is already plagued by one of its curses, the infection deepens and spreads to one creature of the seer's choice nearby." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] signature miss: trait — "The plague-seer's flesh is a wet, venomous ichor that spits back whenever it is struck in melee: the blood that lands on an attacker threatens to pass the plague, leaving them vulnerable to its curses. If that attacker is already plagued by one of its curses, the infection deepens and spreads to one creature of the seer's choice nearby." [trait/on_being_hit/condition] — the model found no template that holds it (offered: absorption, bloodied-burst, resonant-body, bloodied-fury, uncanny-sense)
```


---


### Thunder Elk Herder — bands soft

**Concept:** a storm-herder who commands a stampede of thunder-elk

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Thunder Elk Herder | 13 (2014) | defender-8-leader | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 10.5 (print at 13 reads 5.5–13.5, n=6)
- read: def 9 / off 12 → 10.5; sustained 78 (3 × Rune Staff); nova none; dmg 78

```
Thunder Elk Herder
Medium humanoid, neutral
Armor Class

18 (plate)

Hit Points: 

187 (22d8 + 88)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

14 (+2)

	

18 (+4)

	

12 (+1)

	

13 (+1)

	

18 (+4)

Skills: 

Athletics +8, Persuasion +9

Saving Throws: 

CON +9, CHA +9

Senses: 

darkvision 60 ft., passive Perception 11

Languages: 

Common

Challenge

13 (10,000 XP)

Proficiency Bonus:

+5

Aura of Authority. While within 10 feet of the thunder elk herder, the thunder elk herder and its allies have advantage on attack rolls and saving throws, provided the thunder elk herder isn't incapacitated.
Bolstering Cry (2/Day). As a bonus action, the thunder elk herder grants each ally within 30 feet of it 13 (3d8) temporary hit points.

Actions
Multiattack: The thunder elk herder makes three attacks, using Rune Staff or Staff Throw.
Rune Staff: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (3d8 + 3) bludgeoning damage plus 10 (3d6) thunder damage.
Staff Throw: Melee or Ranged Weapon Attack: +8 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 25 (5d8 + 3) bludgeoning damage.
```

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — defender-leader: ✓ ("commands a stampede of thunder-elk") | defender-leader: key "commands" (class verb)
[concept] signature elements: commanding the thunder-elk stampede [behavior] | wind-whipped hide cloak and rune-carved thunder-staff [object] | crackling storm-aura that charges allies [aura]
[reskin] signature idea (action): "The herder slams its rune staff into the ground and bellows, and a charging line of thunder-elk stampedes into being from the storm-lit horizon. The phantom herd thunders across a wide stretch of ground in a direction the herder chooses, and any creature caught in its path is battered and thrown aside by lightning-slick antlers and hooves. The herd then wheels and lingers as a crackling, stamping " [action/always/movement] — menu: seal, hook-drag, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: shell-withdraw, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — herd (command, stampede)
[reskin] signature bound by force: action — "herd" matches command+stampede in the user's words; the model's none is overruled
[reskin] value check: "Driving Bellow (2/Day)" EV 10.1 vs floor 65.9 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Driving Bellow (2/Day)" — the ladder could not lift it; the fallback stands in
[reskin] value check: "Bolstering Cry (2/Day)" EV 7.2 vs floor 4.2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The thunder-elk's hide cloak and rune-carved staff drink the storm the herder walks in, lashing out with a whip-crack of thunder whenever a foe lands a blow on the herder or an ally within the herd's reach. The retort slams the attacker back a step and leaves them deafened and staggering, so striking the herd's edge is paid for in thunder." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
```


---


### Bone-Siege Colossus — bands soft

**Concept:** a bone-wrought siege titan that stomps and shakes the walls

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Bone-Siege Colossus | 15 (2014) | brute-9-juggernaut | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 12.5 (print at 15 reads 6.25–14.5, n=12)
- read: def 10 / off 15 → 12.5; sustained 68 (2 × Slam); nova Rubble Wave 71; dmg 93

```
Bone-Siege Colossus
Huge construct, unaligned
Armor Class

16 (natural armor)

Hit Points: 

210 (20d12 + 80)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


16 (+3)

	

8 (-1)

	

19 (+4)

	

6 (-2)

	

10 (+0)

	

4 (-3)

Skills: 

Athletics +8, Perception +5

Saving Throws: 

STR +8, CON +9

Damage Immunities: 

poison, thunder

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, petrified, poisoned

Senses: 

darkvision 120 ft., tremorsense 60 ft., passive Perception 15

Languages: 

understands the languages of its creator but can't speak

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Grinding Mortar. A creature that touches the colossus or hits it with a melee attack while within 5 feet of it takes 10 (3d6) thunder damage.
Thunder Absorption. Whenever the colossus is subjected to thunder damage, it takes no damage and instead regains a number of hit points equal to the thunder damage dealt.
Immutable Form. The colossus can't shape-shift.
Siege Monster. The colossus deals double damage to objects and structures.
Grinding Crack. As a bonus action, the colossus targets one creature within 5 feet of it that hit it with an attack roll since the end of the colossus's last turn. The target takes 13 (3d8) thunder damage.

Actions
Multiattack: The colossus makes two Slam attacks.
Slam: Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 21 (4d8 + 3) bludgeoning damage plus 13 (3d8) thunder damage.
Rubble Wave (Recharge 5-6): Each creature in a 30-foot cone must make a DC 18 Constitution saving throw, taking 71 (13d10) thunder damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone until the end of its next turn.
```

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=none — brute-juggernaut: ✓ ("bone-wrought siege titan") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] signature elements: earth-shaking stomps [behavior] | bone-wrought body [body] | wall-shattering tremors [behavior]
[reskin] signature idea (action): "The colossus slams its fists down and drives a buried fault line across the battlefield. The ground buckles in a long path away from it, leaving a broken, uneven trench; the area only settles back to solid footing once the colossus stops using this action for a while." [action/always/movement] — menu: condition-payoff, hook-drag, escalating-dread, terror-pulse, herd, drain, exploiter (+ shelf: shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, charge-push, hook-rider, pounce)
[reskin] signature miss: action — "The colossus slams its fists down and drives a buried fault line across the battlefield. The ground buckles in a long path away from it, leaving a broken, uneven trench; the area only settles back to solid footing once the colossus stops using this action for a while." [action/always/movement] — the model found no template that holds it (offered: condition-payoff, hook-drag, escalating-dread, terror-pulse, herd, drain, exploiter)
[reskin] value check: "Answering Sting" EV 7.2 vs floor 5.2 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Its bones are bolted together with the wreckage of siege engines, and the mortar never stops grinding. Each time it stomps or takes a solid hit, loose shards shake free and spray outward, wearing down anyone standing too close." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Grinding Mortar" ("each time it stomps or takes a solid hit, loose shards shake free and spray outw [verb: shard:idea]")
[reskin] chassis nova: "Rubble Wave (Recharge 5-6)" — the brute-9-juggernaut's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Glassbound Revenant — bands soft

**Concept:** a mirror assassin who strikes from the reflections of her victims

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Glassbound Revenant | 18 (2014) | lurker-17 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 23, 5 over; the HP axis pulls the read to 18
- read: def 13 / off 23 → 18; sustained 186 (3 × Shardfang + legendary Reflected Rush); nova none; dmg 186

```
Glassbound Revenant
Medium humanoid, neutral
Armor Class

18 (plate)

Hit Points: 

256 (27d8 + 135)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


14 (+2)

	

18 (+4)

	

21 (+5)

	

16 (+3)

	

18 (+4)

	

14 (+2)

Skills: 

Perception +10, Stealth +10

Saving Throws: 

DEX +10, INT +9, WIS +10

Senses: 

darkvision 60 ft., passive Perception 20

Languages: 

Common

Challenge

18 (20,000 XP)

Proficiency Bonus:

+6

Vile Appearance. Any creature that starts its turn within 30 feet of the glassbound revenant and can see it must make a DC 19 Wisdom saving throw. On a failed save, the target is frightened until the start of its next turn. On a successful save, the target is immune to this creature's gaze for 24 hours.
Assassinate. During the first round of each combat, the glassbound revenant has advantage on attack rolls against any creature that hasn't taken a turn. If the glassbound revenant hits a creature during that round, the target takes an extra 17 (5d6) bludgeoning damage.
Legendary Resistance (3/Day). If the glassbound revenant fails a saving throw, it can choose to succeed instead.
Umbral Step. As a bonus action, while in dim light or darkness, the glassbound revenant takes the Hide action.
Mirror Step (Recharge 4-6). As a bonus action, the glassbound revenant teleports up to 40 feet to an unoccupied space it can see.

Actions
Multiattack: The glassbound revenant makes three attacks, using Shardfang or Mirror Shard. It can replace one attack with a use of Mirror Terror.
Shardfang: Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 31 (6d8 + 4) piercing damage.
Mirror Shard: Ranged Weapon Attack: +10 to hit, range 80/320 ft., one target. Hit: 28 (7d6 + 4) slashing damage.
Mirror Terror: One creature within 60 feet must make a DC 19 Wisdom saving throw. On a failed save, the target is frightened until the end of the glassbound revenant's next turn. If the target was already frightened by this ability, it also takes 33 (6d10) piercing damage.
Legendary Actions

The glassbound revenant can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The glassbound revenant regains spent legendary actions at the start of its turn.

Reflected Rush: The glassbound revenant moves up to half its speed without provoking opportunity attacks, and it makes one Shardfang attack.
Mirror Slip: While in dim light or darkness, the glassbound revenant takes the Hide action. The glassbound revenant can't take this action again until the start of its next turn.
Shatter Nerves: One creature within 30 feet must succeed on a DC 19 Wisdom saving throw or be frightened until the end of its next turn.
```

**Engine trace**

```
[route] lurker type=Humanoid mechanics=teleport — lurker: ✓ ("strikes from the reflections of her vict") | lurker: no line key in the words — the model's read of its quote
[concept] signature elements: strikes from reflections [behavior] | mirror-bound body [body] | reflective surfaces as portals [object]
[reskin] signature idea (action): "When the revenant attacks, she can strike her target through its own reflection instead of from where she stands: the wound opens on the victim while the blow seems to come out of the nearest mirror, still water, polished helm, or blade. This lets her attack a creature she can see reflected even when it has cover or is nowhere near her, so long as some reflective surface shows its image, and it tu" [action/always/damage] — menu: gaze-single, condition-payoff, execute, seal, wail, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, blink, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, bolt-drag)
[reskin] signature miss: action — "When the revenant attacks, she can strike her target through its own reflection instead of from where she stands: the wound opens on the victim while the blow seems to come out of the nearest mirror, still water, polished helm, or blade. This lets her attack a creature she can see reflected even when it has cover or is nowhere near her, so long as some reflective surface shows its image, and it tu" [action/always/damage] — the model found no template that holds it (offered: gaze-single, condition-payoff, execute, seal, wail, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground, riposte)
[reskin] value check: "Creeping Dread" EV 22.7 vs floor 17.2 (one attack of 3) — dice 17 → 33
[reskin] library seed drawn: escalating-dread -> Actions/"Creeping Dread" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Any reflective surface the revenant can see becomes a doorway: at the start of her turn she can choose one reflection within her sight and emerge from it as though she had stepped through, treating every mirror, window, puddle, and polished blade as part of one connected space. She cannot use the same surface to leave and return in the same breath, and a surface that is broken or covered while she" [trait/start_of_turn/movement] — menu: warded-mending (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — gaze-aura (reflection, reflections)
[reskin] signature bound by force: trait — "gaze-aura" matches reflection+reflections in the user's words; the model's none is overruled
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] signature template (trait): gaze-aura -> Traits/"Vile Appearance" ("exact concept match [verb: reflection:concept, reflections:concept]")
```


---


### Vostrek the Rime-Buried — bands soft

**Concept:** a glacier wyrm that swallows ships whole and freezes the sea

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Vostrek the Rime-Buried | 20 (2014) | dragon-22 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 24, 4 over; the HP axis pulls the read to 20.5
- read: def 17 / off 24 → 20.5; sustained 216 (3 × Bite + legendary Rime Fang); nova Rime Breath 76; dmg 216

```
Vostrek the Rime-Buried
Gargantuan dragon, neutral
Armor Class

20 (natural armor)

Hit Points: 

296 (16d20 + 128)

Speed: 

40 ft., fly 80 ft., burrow 30 ft., swim 40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

12 (+1)

	

26 (+8)

	

18 (+4)

	

16 (+3)

	

22 (+6)

Skills: 

Perception +9, Stealth +7

Saving Throws: 

DEX +7, WIS +9

Damage Immunities: 

cold

Senses: 

blindsight 120 ft., darkvision 240 ft., tremorsense 120 ft., passive Perception 19

Languages: 

Common, Draconic

Challenge

20 (25,000 XP)

Proficiency Bonus:

+6

Sure Footing. Difficult terrain composed of ice or snow doesn't cost Vostrek extra movement, and Vostrek can move across ice or snow without needing to make an ability check.
Legendary Resistance (4/Day). If Vostrek fails a saving throw, it can choose to succeed instead.
Rime Burrow. At the end of each of Vostrek's turns, each creature within 5 feet of it takes 13 (3d8) cold damage.

Actions
Multiattack: Vostrek makes three Bite attacks. It can replace one attack with a use of Spellcasting to cast fear.
Bite: Melee Weapon Attack: +10 to hit, reach 15 ft., one target. Hit: 22 (4d8 + 4) piercing damage plus 14 (4d6) cold damage.
Rime Breath (Recharge 5-6): Each creature in a 90-foot cone must make a DC 19 Constitution saving throw, taking 76 (17d8) cold damage on a failed save, or half as much damage on a successful one.
Spellcasting: Vostrek casts one of the following spells, requiring no material components and using Charisma as the spellcasting ability (spell save DC 20):

At will: detect magic, command, fear, suggestion
Legendary Actions

Vostrek can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Vostrek regains spent legendary actions at the start of its turn.

Rime Fang: Vostrek makes one Bite attack.
Flaw Breach: Vostrek moves up to half its speed without provoking opportunity attacks.
Deep Terror: One creature within 30 feet of Vostrek must succeed on a DC 20 Wisdom saving throw or be frightened of Vostrek until the end of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Dragon mechanics=grapple, engulf, breath — brute-grappler: ✓ ("swallows ships whole") | brute-grappler: key "swallows" (class verb)
[concept] signature elements: swallowing ships whole [behavior] | freezing the sea [behavior] | glacier body [body]
[reskin] signature idea (action): "Vostrek exhales a clinging soup of freezing air that sinks and spreads across the water or ground, turning the area around itself into a field of jagged, shifting floe. The ice grips at anything standing or swimming in it, locking prey in place, and then hardens around the wounds of anyone it has already hurt—sealing cuts shut with frost so their bodies cannot keep up the fight. It can pour this c" [trait/start_of_turn/condition] — menu: fire-aura, warded-mending (+ shelf: condition-payoff, hook-drag, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter, shell-withdraw, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, contagion, charge-push, hook-rider, pounce, charge)
[reskin] signature template: fire-aura -> Traits/"Rime Burrow" ("The idea is an exhalation of freezing air that spreads around Vostrek as a cloyi [verb: freezing air:idea]")
[reskin] signature idea (trait): "Vostrek's body is a moving glacier: the air around it frosts over, and any creature that strikes it in melee is chilled to the bone—its next burst of speed or exertion is slowed as the cold congeals in its limbs. The deep frost also makes Vostrek's own hide crawl with rime, so that when it is wounded in melee, a shard of that rime snaps off and briefly sheathes the attacker's weapon or claw in bri" [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, weapon-lodge (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, earth-glide, tunneler, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, death-burst)
[reskin] signature bound to the concept's verb: trait — terrain-walk (freezes, freeze, glacier)
[reskin] signature bound by force: trait — "terrain-walk" matches freezes+freeze+glacier in the user's words; the model's none is overruled
[reskin] signature template (trait): terrain-walk -> Traits/"Sure Footing" ("exact concept match [verb: freezes:concept, freeze:concept, glacier:concept]")
[reskin] chassis nova: "Rime Breath (Recharge 5-6)" — the dragon-22's own nova row (its "Breath Weapon", renamed by the model); geometry, cap and rider lines below are its edits
```


---


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


### Sire Harrowgate — a 2014 sheet

**Concept:** a death knight who leads a cavalry of the damned and burns the living with hellfire

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Sire Harrowgate | 17 (2014) | skirmisher-18-mounted | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 23, 6 over; the HP axis pulls the read to 18
- read: def 13 / off 23 → 18; sustained 180 (3 × Lance + legendary Deathless Charge); nova Ride Down 72; dmg 180

```
Sire Harrowgate
Large undead, lawful neutral
Armor Class

19 (natural armor)

Hit Points: 

252 (24d10 + 120)

Speed: 

70 ft.

STR	DEX	CON	INT	WIS	CHA


20 (+5)

	

18 (+4)

	

20 (+5)

	

14 (+2)

	

18 (+4)

	

16 (+3)

Skills: 

Perception +10, Stealth +10

Saving Throws: 

DEX +10, WIS +10

Damage Resistances: 

fire

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 20

Languages: 

Common plus the languages it knew in life

Challenge

17 (18,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day). If the sire harrowgate fails a saving throw, it can choose to succeed instead.
Ashen Wake. The sire harrowgate ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Cavalry Pivot. When a creature the sire harrowgate can see ends its turn within 5 feet of it, the sire harrowgate can move up to 15 feet without provoking opportunity attacks.
Mounted Agility. As a bonus action, the sire harrowgate takes the Dash or Disengage action.

Actions
Multiattack: The sire harrowgate makes three Lance attacks. It can replace one attack with a use of Merciless Strike.
Lance: Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (3d8 + 4) piercing damage plus 13 (3d8) fire damage. If the sire harrowgate moved at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 9 (2d8) piercing damage and, if it is Huge or smaller, is knocked prone.
Ride Down (Recharge 5-6): The sire harrowgate moves up to its speed without provoking opportunity attacks and can move through the spaces of Huge or smaller creatures. Each creature whose space it enters is targeted once by the following effect. The target must make a DC 19 Strength saving throw, taking 72 (16d8) fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Merciless Strike: One creature within 60 feet that is prone must make a DC 19 Strength saving throw, taking 31 (9d6) fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target is knocked prone until the end of its next turn.
Legendary Actions

The sire harrowgate can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The sire harrowgate regains spent legendary actions at the start of its turn.

Deathless Charge: The sire harrowgate moves up to half its speed without provoking opportunity attacks, and it makes one Lance attack.
Withdraw: The sire harrowgate takes the Dash or Disengage action.
```

**Engine trace**

```
[route] skirmisher-mounted type=Undead mechanics=none — skirmisher-mounted: ✓ ("leads a cavalry of the damned") | skirmisher-mounted: no line key in the words — the model's read of its quote
[concept] signature elements: hellfire cavalry charge that carries past its target [behavior] | a burning wake of hellfire left in its path [aura] | ash-and-bone body fused with a knight's hell-forged armor [body]
[reskin] signature idea (action): "The sire harrowgate lowers its lance and charges in a straight line through the living, spearheading a wedge of spectral riders that only exist in the moment of impact. It strikes every creature in its path as it passes, and each creature it skewers is set alight with clinging hellfire, branded so its fleeing companions can see the flames guttering in the dark behind them." [rider/on_hit/damage] — menu: contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: condition-payoff, lure, snare-bolt, sensory-strike, disarm, delayed-brand, exploiter, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] value check: "Merciless Strike" EV 28 vs floor 15.1 (one attack of 3) — dice 58 → 31 (scaled down to the ceiling)
[reskin] library seed drawn: condition-payoff -> Actions/"Merciless Strike" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Where the sire harrowgate rides at a gallop, the ground itself keeps burning — a trailing wake of green flame that lingers after it has passed and sears anything that steps into it, punishing pursuers and herding survivors away from the path the knight intends to charge next. The fire answers only to its rider and snuffs out when fresh hellfire is laid over it." [trait/always/damage] — menu: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, false-appearance, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — heated-body, death-burst (burn, death)
[reskin] signature miss: trait — "Where the sire harrowgate rides at a gallop, the ground itself keeps burning — a trailing wake of green flame that lingers after it has passed and sears anything that steps into it, punishing pursuers and herding survivors away from the path the knight intends to charge next. The fire answers only to its rider and snuffs out when fresh hellfire is laid over it." [trait/always/damage] — the model found no template that holds it (offered: heated-body, death-burst)
[reskin] chassis nova: "Ride Down (Recharge 5-6)" — the skirmisher-18-mounted's own nova row (its "Trampling Rush", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Aurel Vael — bands soft

**Concept:** an empyrean child of the gods who walks the mortal world in judgment

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Aurel Vael | 23 (2014) | caster-21-warpriest | ok | SOFT: band, hot-offense | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 25.5 (print at 23 reads 20.5–24.5, n=7)
- bands · soft · hot-offense: offense alone reads CR 29, 6 over; the HP axis pulls the read to 25.5
- read: def 22 / off 29 → 25.5; sustained 355 (2 × Greatsword + legendary Blade Descends); nova Empyrean Verdict 78; dmg 355

```
Aurel Vael
Medium celestial, lawful neutral
Armor Class

19 (natural armor)

Hit Points: 

483 (46d8 + 276)

Speed: 

40 ft., fly 40 ft. (hover)

STR	DEX	CON	INT	WIS	CHA


22 (+6)

	

16 (+3)

	

23 (+6)

	

16 (+3)

	

18 (+4)

	

20 (+5)

Skills: 

Perception +11, Religion +10

Saving Throws: 

CON +13, WIS +11, CHA +12

Damage Resistances: 

radiant

Condition Immunities: 

charmed

Senses: 

darkvision 120 ft., passive Perception 21

Languages: 

telepathy 120 ft.

Challenge

23 (50,000 XP)

Proficiency Bonus:

+7

Legendary Resistance (3/Day). If Aurel fails a saving throw, it can choose to succeed instead.

Actions
Multiattack: Aurel makes two Greatsword attacks. It can replace one attack with a use of Radiant Doom or Spellcasting to cast guiding bolt.
Greatsword: Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 71 (15d8 + 4) slashing damage. The weapon magically returns to Aurel's hand.
Empyrean Verdict (Recharge 5-6): Each creature within 20 feet of Aurel must make a DC 20 Constitution saving throw, taking 78 (12d12) radiant damage on a failed save, or half as much damage on a successful one.
Spellcasting: Aurel casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 19, +11 to hit with spell attacks):

At will: guiding bolt, light, dispel magic, hold person
Radiant Doom: One creature within 60 feet must make a DC 20 Charisma saving throw, taking 71 (13d10) radiant damage on a failed save, or half as much damage on a successful one. On a failed save, the target is cursed until the end of Aurel's next turn. The first time the cursed target deals damage to any creature before then, it takes 71 (13d10) radiant damage.
Legendary Actions

Aurel can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Aurel regains spent legendary actions at the start of its turn.

Blade Descends: Aurel makes one Greatsword attack.
Heavenly Stride: Aurel moves up to half its Speed without provoking opportunity attacks.
Cast Out: One creature within 30 feet must succeed on a DC 20 Wisdom saving throw or be frightened of Aurel until the end of its next turn.
```

**Engine trace**

```
[route] caster-warpriest (artillery) type=Celestial mechanics=none — caster-warpriest: ✓ ("walks the mortal world in judgment") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] signature elements: divine judgment pronouncement [behavior] | radiant greatsword strikes [object] | aura of sacred authority [aura]
[reskin] signature idea (action): "Aurel pronounces a mortal's name and its fate aloud, and for a time its greatsword strikes against that soul burn with far greater radiance while the pronouncement holds. It can pronounce only one such doom at a time, and while the doom is in force Aurel's blade leaves a searing brand on the one it named." [action/always/damage] — menu: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, curse-debt, zone-seed, reveal (+ shelf: delayed-brand, aggro-curse, self-invisibility, rally, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — curse-debt (judgment)
[reskin] value check: "Radiant Doom" EV 55 vs floor 36.9 (one attack of 2) — added Success: Half; dice 42 → 71
[reskin] signature template: curse-debt -> Actions/"Radiant Doom" ("Only one doomed target at a time, the pronouncement curses the named creature, t [verb: judgment:concept]")
[reskin] signature idea (trait): "Aurel's Greatsword and Blade Descends strikes carry the same radiant light as its verdict — each hit sears with radiant energy, and a creature struck is lit by that … until the end of Aurel's next turn, staying visible even through magical darkness or invisibility." [trait/always/damage] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] chassis nova: "Empyrean Verdict (Recharge 5-6)" — the caster-21-warpriest's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---


### Lake That Thinks — bands soft

**Concept:** an elder brain the size of a lake that dominates every mind for a hundred miles

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Lake That Thinks | 25 (2014) | lurker-17-trap | ok | SOFT: band, hot-offense | ok | SOFT: control-aoe-ungated | ok | ok | ok |

- bands · soft · band: reads CR 27 (print at 25 reads 20.5–24.5, n=5)
- bands · soft · hot-offense: offense alone reads CR 29, 4 over; the HP axis pulls the read to 27
- gates · soft · control-aoe-ungated: Actions/Tether Call: at-will multi-target control with no damage and no gate
- read: def 25 / off 29 → 27; sustained 384 (3 × Tendril + legendary Lash Coil); nova none; dmg 384

```
Lake That Thinks
Gargantuan aberration, neutral
Armor Class

21 (natural armor)

Hit Points: 

542 (31d20 + 217)

Speed: 

20 ft., swim 10 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

10 (+0)

	

24 (+7)

	

10 (+0)

	

18 (+4)

	

8 (-1)

Skills: 

Perception +12, Stealth +8

Saving Throws: 

STR +12, CON +15, WIS +12

Senses: 

blindsight 120 ft., darkvision 120 ft., passive Perception 22

Languages: 

Deep Speech

Challenge

25 (75,000 XP)

Proficiency Bonus:

+8

Legendary Resistance (3/Day). If the lake fails a saving throw, it can choose to succeed instead.
Still Water Guise. As a bonus action, the lake shape-shifts to resemble an ordinary object or fixture of the place it waits in while retaining its game statistics, or it returns to its true form. While it is motionless in its false form, it is indistinguishable from that feature.

Actions
Multiattack: The lake makes three Tendril attacks. It can replace one attack with a use of Tether Call.
Tendril: Melee Weapon Attack: +12 to hit (with advantage if the target is grappled by the lake), reach 5 ft., one target. Hit: 40 (8d8 + 4) bludgeoning damage plus 24 (7d6) psychic damage. If the target is a Large or smaller creature, it is grappled (escape DC 20).
Tether Call: Each creature of the lake's choice within 120 feet that can see or hear the lake's tendrils or its waiting waters must make a DC 21 Wisdom saving throw. On a failed save, the target is charmed until the start of the lake's next turn, and while charmed this way, it must move toward the lake by the safest available route on its turn and can't take reactions.
Legendary Actions

The lake can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The lake regains spent legendary actions at the start of its turn.

Lash Coil: The lake makes one Tendril attack.
Drag Under: The lake pulls one creature grappled by it up to 15 feet straight toward it.
Mind Stun: One creature within 30 feet must succeed on a DC 21 Wisdom saving throw or be frightened until the end of its next turn.
```

**Engine trace**

```
[route] lurker-trap type=Aberration mechanics=aura — lurker-trap: ✓ ("the size of a lake") | lurker-trap: no line key in the words — the model's read of its quote
[concept] signature elements: dominates every mind for a hundred miles [behavior] | a lake of brine that is alive [body] | psychic tendrils that drag prey under [behavior]
[reskin] signature idea (action): "The lake reaches out through the psychic tethers already binding its puppets: every creature it has grappled or frightened suddenly feels its mind yanked sideways, and those who cannot hold their own thoughts are pulled wading, stumbling, straight toward the water's edge where the tendrils wait. The more minds it already holds, the harder the pull is to refuse." [action/save/movement] — menu: seal, wail, lure, hook-drag, active-toll, pull-through, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, drain, zone-seed, exploiter, blighted-ground (+ shelf: delayed-brand, shell-withdraw, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation)
[reskin] value check: "Tether Call (Recharge 5-6)" EV 69.3 vs floor 32.8 (one attack of 3) — over the ceiling — gated Recharge 5-6
[reskin] signature template: lure -> Actions/"Tether Call (Recharge 5-6)" ("every creature already grappled or frightened feels its mind yanked sideways and [shape fit, no verb match]")
[reskin] signature idea (trait): "Anything standing in or drinking from the lake's water hears its thoughts surface as its own. Whatever the lake believes in that moment, they briefly believe too — a fear, a memory, a command — and the lake can feel the shape of every mind that touches its brine, knowing exactly where each one stands." [trait/always/condition] — menu: adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, evasion, relentless-pursuit, bound, marking-light, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — shielded-mind (mind)
[reskin] signature miss: trait — "Anything standing in or drinking from the lake's water hears its thoughts surface as its own. Whatever the lake believes in that moment, they briefly believe too — a fear, a memory, a command — and the lake can feel the shape of every mind that touches its brine, knowing exactly where each one stands." [trait/always/condition] — the model found no template that holds it (offered: shielded-mind)
```


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


### Ossun Sovereign — highest CR

**Concept:** an archlich enthroned on a sun of bone

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Ossun Sovereign | 24 (2014) | skirmisher-22 | ok | SOFT: aim-dpr, band | ok | ok | ok | ok | SOFT: print-rows |

- bands · soft · aim-dpr: damage 153 a round is 40% under the table's 255
- bands · soft · band: reads CR 21.5 (print at 24 reads 20.5–24.5, n=5)
- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Orbit Shift
- read: def 22 / off 21 → 21.5; sustained 153 (3 × Bone Bolt + legendary Deathly Teleport); nova none; dmg 153

```
Ossun Sovereign
Medium undead, neutral evil
Armor Class

19 (natural armor)

Hit Points: 

487 (65d8 + 195)

Speed: 

30 ft.

STR	DEX	CON	INT	WIS	CHA


11 (+0)

	

18 (+4)

	

16 (+3)

	

21 (+5)

	

14 (+2)

	

16 (+3)

Skills: 

Perception +9, Stealth +11

Saving Throws: 

DEX +11, WIS +9

Damage Resistances: 

cold

Damage Immunities: 

necrotic, poison

Condition Immunities: 

charmed, exhaustion, frightened, paralyzed, poisoned

Senses: 

darkvision 120 ft., passive Perception 19

Languages: 

All

Challenge

24 (62,000 XP)

Proficiency Bonus:

+7

Legendary Resistance (4/Day). If the ossun sovereign fails a saving throw, it can choose to succeed instead.
Orbit Shift. When a creature the ossun sovereign can see ends its turn within 5 feet of it, the ossun sovereign can move up to 20 feet without provoking Opportunity Attacks.
Spirit Jar. If destroyed, the ossun sovereign reforms in 1d10 days if it has a spirit jar, reviving with all its hit points. The new body appears in an unoccupied space within the ossun sovereign's lair.
Protective Magic (Reaction). The ossun sovereign casts Counterspell or Shield in response to the spell's trigger, using the same spellcasting ability as Spellcasting.

Actions
Multiattack: The ossun sovereign makes three attacks, using Eldritch Burst, Bone Bolt, or Paralyzing Touch.
Eldritch Burst: Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 28 (7d6 + 4) force damage.
Paralyzing Touch: Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 28 (7d6 + 4) cold damage. and the target has the Paralyzed condition until the start of the ossun sovereign's next turn.
Bone Bolt: Ranged Weapon Attack: +11 to hit, range 80/320 ft., one target. Hit: 40 (8d8 + 4) necrotic damage.
Spellcasting: The ossun sovereign casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 20): At Will: Detect Magic, Detect Thoughts, Dispel Magic, Fireball, Invisibility, Lightning Bolt, Mage Hand, Prestidigitation
2/Day Each: Animate Dead, Dimension Door, Plane Shift
1/Day Each: Chain Lightning, Finger of Death, Power Word Kill, Scrying
Legendary Actions

The ossun sovereign can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ossun sovereign regains spent legendary actions at the start of its turn.

Deathly Teleport: The ossun sovereign teleports up to 60 feet to an unoccupied space it can see, and each creature within 10 feet of the space it left takes 11 (2d10) necrotic damage.
Disrupt Life: Each creature that isn't an Undead in a 20-foot radius originating from the ossun sovereign must make a DC 21 Constitution saving throw, taking 31 (9d6) necrotic damage on a failed save, or half as much damage on a successful one.
Frightening Gaze: The ossun sovereign casts Fear, using the same spellcasting ability as Spellcasting. The ossun sovereign can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] caster (artillery) type=Undead mechanics=none — caster: ✓ ("archlich") | caster: no line key in the words — the model's read of its quote
[concept] signature elements: bone-shard volleys from the orbiting throne [behavior] | the enthroned sun of calcified bone [body] | deathless spellcasting from a floating throne [behavior]
[reskin] print canon route: the Lich is not a caster first (its own Spellcasting rides as print's row) — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 11, DEX 18, CON 16, INT 21, WIS 14, CHA 16 — the Lich's, DEX fitted to +11
[reskin] print canon: "an archlich enthroned on a sun of bone" heads on the Lich — print's rows ride along; the seat stays
[reskin] signature idea (action): "The sovereign's ribcage cracks open and it looses a sweeping volley of bone shards in a wide arc before it. The shards rake everything in the area, and any living creature struck feels its warmth bled away, giving the throne's cold an opening." [action/always/damage] — menu: gaze-single, throw-retrieve, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, charge-push, hook-rider, pounce, isolation, snatch, bolt-mark, charge)
[reskin] value check: "Disarming Twist" EV 0 vs floor 23.9 (one attack of 3) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The sovereign's orbit is its weapon: whenever it glides around a creature, the air churns with shed bone dust that clings and eats at warmth, marking prey for its next volley." [trait/always/damage] — menu: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature miss: trait — "The sovereign's orbit is its weapon: whenever it glides around a creature, the air churns with shed bone dust that clings and eats at warmth, marking prey for its next volley." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, absorption)
[reskin] chassis nova: "Sunfall Beams (Recharge 5-6)" — the skirmisher-22's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Lich has no such mode and the words name none
[reskin] print canon size: Huge -> Medium — the Lich's
[reskin] print canon languages: "Common plus the languages it knew in life" -> "All" — the Lich's
[reskin] print canon speed: 70 ft. -> 30 ft. — the Lich's walk; the concept's other modes stay
[reskin] print canon row: Actions/Paralyzing Touch — the Lich's second melee row, beside the chassis's
[reskin] print canon attack: "Claw" -> "Eldritch Burst" — the Lich's own row
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Necrotic, Poison; Charmed, Exhaustion, Frightened, Paralyzed, Poisoned; resistances none -> Cold, Lightning — the Lich's own header lines
[reskin] print canon trait: Spirit Jar — "an archlich enthroned on a sun of bone" is the Lich (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Sunfall Beams (Recharge 5-6)" is the seat's nova, not the Lich's
[reskin] print canon legendary: Deathly Teleport, Disrupt Life, Frightening Gaze — the Lich's own kit stands where the chassis's stood
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Lich's
[reskin] print canon: chassis row leaves — Traits/"Throne Drift" is the seat's, not the Lich's
[reskin] print canon row: Actions/Spellcasting — the Lich's own
[reskin] print canon row: Reactions/Protective Magic — the Lich's own
```


---


### Lord Duskworth — a 2014 sheet

**Concept:** a vampire lord who commands bats and wolves

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Lord Duskworth | 15 (2014) | skirmisher-13 | ok | SOFT: band | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 11.5 (print at 15 reads 6.25–14.5, n=12)
- read: def 10 / off 13 → 11.5; sustained 57 (3 × Grave Strike); nova Cursed Blood Tide 71; dmg 85

```
Lord Duskworth
Small undead, neutral evil
Armor Class

18 (natural armor)

Hit Points: 

210 (28d6 + 112)

Speed: 

40 ft., climb 40 ft.

STR	DEX	CON	INT	WIS	CHA


18 (+4)

	

16 (+3)

	

18 (+4)

	

17 (+3)

	

15 (+2)

	

18 (+4)

Skills: 

Perception +7, Stealth +8

Saving Throws: 

DEX +8, WIS +7

Damage Resistances: 

necrotic

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 17

Languages: 

Common plus two other languages

Challenge

15 (13,000 XP)

Proficiency Bonus:

+5

Wound-Drinking Dark. A creature that touches the lord or hits it with a melee attack while within 5 feet of it takes 10 (3d6) necrotic damage.
Sidestep. When a creature the lord can see ends its turn within 5 feet of it, the lord can move up to 10 feet without provoking opportunity attacks.
Legendary Resistance (3/Day). If the lord fails a saving throw, it can choose to succeed instead.
Misty Escape. If the lord drops to 0 hit points outside its resting place, the lord uses Shape-Shift to become mist (no action required). If it can't use Shape-Shift, it is destroyed.
While it has 0 hit points in mist form, it can't return to its vampire form, and it must reach its resting place within 2 hours or be destroyed. Once in its resting place, it returns to its vampire form and is paralyzed until it regains any hit points, and it regains 1 hit point after spending 1 hour there.
Spider Climb. The lord can climb difficult surfaces, including along ceilings, without needing to make an ability check.
Vampire Weakness. The lord has these weaknesses: - Forbiddance: the lord can't enter a residence without an invitation from an occupant.
Running Water: the lord takes 20 acid damage if it ends its turn in running water.
Stake to the Heart: If a weapon that deals piercing damage is driven into the lord's heart while the lord is incapacitated in its resting place, the lord is paralyzed until the weapon is removed.
Sunlight: the lord takes 20 radiant damage if it starts its turn in sunlight. While in sunlight, it has disadvantage on attack rolls and ability checks.
Shape-Shift (Bonus Action). If the lord isn't in sunlight or running water, it shape-shifts into a Tiny bat (Speed 5 ft., Fly Speed 30 ft.) or a Medium cloud of mist (Speed 5 ft., Fly Speed 20 ft. [hover]), or it returns to its vampire form. Anything it is wearing transforms with it.
While in bat form, the lord can't speak. Its game statistics, other than its size and Speed, are unchanged.
While in mist form, the lord can't take any actions, speak, or manipulate objects. It is weightless and can enter an enemy's space and stop there. If air can pass through a space, the mist can do so, but it can't pass through liquid. It has resistance to all damage, except the damage it takes from sunlight.
Charm (Recharge 5-6) (Bonus Action). The lord casts charm person, requiring no spell components and using Charisma as the spellcasting ability (spell save DC 17), and the duration is 24 hours. The charmed target is a willing recipient of the lord's Bite, the damage of which doesn't end the spell. When the spell ends, the target is unaware it was charmed by the lord.

Actions
Multiattack: The lord makes three Grave Strike attacks. It can replace one attack with a use of Bite (Bat or Vampire Form Only).
Grave Strike: Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage plus 7 (2d6) necrotic damage. If the target is a Large or smaller creature, it is grappled (escape DC 17) from one of two hands.
Cursed Blood Tide (Recharge 5-6): Each creature in a 60-foot-long, 5-foot-wide line must make a DC 18 Strength saving throw, taking 71 (13d10) necrotic damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also frightened until the end of its next turn.
Bite (Bat or Vampire Form Only): One creature within 5 feet that is willing or that is grappled, incapacitated, or restrained must make a DC 18 Constitution saving throw, taking 24 (7d6) piercing damage plus 13 (3d8) necrotic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum decreases by an amount equal to the necrotic damage taken, and the lord regains hit points equal to that amount. A Humanoid reduced to 0 hit points by this damage and then buried rises the following sunset as a vampire spawn under the lord's control.
```

**Engine trace**

```
[route] caster-binder (controller) type=Undead mechanics=none — caster-binder: ✓ ("a vampire lord who commands bats and wol") | caster-binder: no line key in the words — the model's read of its quote
[concept] signature elements: commanding swarms of bats and wolves [behavior] | blood-binding curses that steal a hero's turn [behavior] | a blood-fed undead lord [body]
[reskin] print canon route: the Vampire's body outranks the binder seat — no verb in the words names it; the plain caster line
[reskin] print canon route: the Vampire is not a caster first — it casts no spells — the caster family stands down for the plain skirmisher line
[reskin] print canon array: STR 18, DEX 16, CON 18, INT 17, WIS 15, CHA 18 — the Vampire's, DEX fitted to +8
[reskin] print canon: "a vampire lord who commands bats and wolves" heads on the Vampire — print's rows ride along; the seat stays
[reskin] signature idea (action): "Lord Duskworth calls the night's beasts to obey him, and the swarm he summons fights on for a while even after he has moved on. He does not need to keep commanding it, and when it goes down it does not simply vanish." [action/always/condition] — menu: gaze-single, snare, reel, condition-payoff, lure, snare-bolt, sensory-strike, disarm, exploiter (+ shelf: delayed-brand, blink, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, contagion, charge-push, hook-rider, pounce, isolation, snatch, charge)
[reskin] value check: "Horrid Display (2/Day)" EV 26.4 vs floor 60.8 (the whole Multiattack (3 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Horrid Display (2/Day)" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Those who strike Lord Duskworth with a blade find their wounds refuse to close, as if the night itself drinks from them. This lingering curse does not fade on its own." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature template (trait): heated-body -> Traits/"Wound-Drinking Dark" ("Those who strike Lord Duskworth with a melee attack are punished for it — the ni [shape fit, no verb match]")
[reskin] chassis nova: "Cursed Blood Tide (Recharge 5-6)" — the skirmisher-13's own nova row (its "Sweeping Area Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon modes: fly off — the Vampire has no such mode and the words name none
[reskin] print canon size: Medium -> Small — the Vampire's
[reskin] print canon languages: "Common, Undercommon" -> "Common plus two other languages" — the Vampire's
[reskin] print canon speed: 50 ft. -> 40 ft. — the Vampire's walk; the concept's other modes stay
[reskin] print canon attack: "Claw" -> "Grave Strike" — the Vampire's own row
[reskin] print canon defenses: resistances none -> Necrotic — the Vampire's own header lines
[reskin] print canon trait: Legendary Resistance — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Misty Escape — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Spider Climb — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon trait: Vampire Weakness — "a vampire lord who commands bats and wolves" is the Vampire (print's own row)
[reskin] print canon: chassis row leaves — Traits/"Nightspeed" is the seat's, not the Vampire's
[reskin] print canon row priced: Bite (Bat or Vampire Form Only) — dice 6 → 24
[reskin] print canon row: Actions/Bite (Bat or Vampire Form Only) — the Vampire's own
[reskin] print canon row: Bonus Actions/Shape-Shift — the Vampire's own
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" yields to the Vampire's Shape-Shift
[reskin] print canon row: Bonus Actions/Charm (Recharge 5-6) — the Vampire's own
```


---


### Kraken — a print donor

**Concept:** a kraken of the black trench

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Kraken | 24 (2014) | brute-21 | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 22 / off 17 → 19.5; sustained 82 (2 × Tentacle); nova none; dmg 82

```
Kraken
Gargantuan monstrosity, unaligned
Armor Class 18 (natural armor)
Hit Points 481 (26d20 + 208)
Speed 30 ft., swim 120 ft.
STR 30 (+10), DEX 11 (+0), CON 26 (+8), INT 22 (+6), WIS 18 (+4), CHA 20 (+5)
Saving Throws STR +17, CON +15, WIS +11
Skills Athletics +17, Perception +11
Damage Immunities cold, lightning
Condition Immunities frightened, grappled, paralyzed, restrained
Senses truesight 120 ft., passive Perception 21
Languages understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft.
Challenge 24 (62,000 XP)
Proficiency Bonus +7

Traits
Legendary Resistance (3/Day): If the kraken fails a saving throw, it can choose to succeed instead.
Amphibious: The kraken can breathe air and water.
Siege Monster: The kraken deals double damage to objects and structures.

Actions
Multiattack: The kraken makes two Tentacle attacks. It can replace one attack with a use of Fling.
Tentacle: Melee Weapon Attack: +17 to hit, reach 30 ft., one target. Hit: 41 (7d8 + 10) bludgeoning damage. The target is grappled (escape DC 25) from one of ten tentacles, and it is restrained until the grapple ends.
Fling: The kraken throws a Large or smaller creature grappled by it to a space it can see within 60 feet of itself that isn't in the air. The thrown creature and each creature in the destination space must make a DC 25 Dexterity saving throw, taking 18 (4d8) bludgeoning damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also knocked prone.
Lightning Strike: One creature the kraken can see within 120 feet of it must make a DC 25 Dexterity saving throw, taking 58 (13d8) lightning damage on a failed save, or half as much damage on a successful one.
Swallow: One creature grappled by the kraken must make a DC 25 Dexterity saving throw (it can have up to four creatures swallowed at a time), taking 23 (3d8 + 10) piercing damage on a failed save, or half as much damage on a successful one. If the target is Large or smaller, it is swallowed and no longer grappled. A swallowed creature is restrained, has total cover against attacks and other effects outside the kraken, and takes 24 (7d6) acid damage at the start of each of its turns.
If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, each of which falls prone in a space within 10 feet of the kraken. If the kraken dies, any swallowed creature is no longer restrained and can escape from the corpse using 15 feet of movement, exiting prone.

Legendary Actions
Storm Bolt: The kraken uses Lightning Strike.
Toxic Ink: Each creature within 15 feet of the kraken while it is underwater must make a DC 25 Constitution saving throw. On a failed save, the target is blinded and poisoned until the end of the kraken's next turn. The kraken then moves up to its Speed. Whether the saving throw succeeds or fails, the kraken can't take this action again until the start of its next turn.
```

**Engine trace**

```
[route] brute-grappler type=Monstrosity mechanics=grapple, engulf — brute-grappler: ✓ ("a kraken of the black trench") | brute-grappler: key "kraken" (class body)
[concept] signature elements: tentacle grapple and drag [behavior] | engulfing maw [behavior] | brine-soaked abyssal hide [body]
[reskin] print canon route: "a kraken of the black trench" is the Kraken — the grappler seat stands down for the plain line
[reskin] print canon defenses: HP 487 -> 481, AC 19 -> 18 — the Kraken's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 30, DEX 11, CON 26, INT 22, WIS 18, CHA 20 — the Kraken's at its own CR; attack +11 -> +17, DC 25 (print's)
[reskin] print canon: "a kraken of the black trench" is a print creature — the seats stand down; print's own rows are the composition
[reskin] chassis nova: "Crushing Brine (Recharge 5-6)" — the brute-21's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] print canon speed: modes swim — the Kraken's
[reskin] print canon senses: "truesight 120 ft." — the Kraken's
[reskin] print canon name: "Mother Brine" -> "Kraken" — a whole print name is the creature's name (the Goblin Boss shipped as Krag the Iron Standard, 2026-10-01)
[reskin] print canon languages: "Common" -> "Understands Abyssal, Celestial, Infernal, And Primordial but can't speak; telepathy 120 ft." — the Kraken's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Kraken's walk; the concept's other modes stay
[reskin] print canon speed: Swim -> 120 ft. — the Kraken's own
[reskin] print canon defenses: immunities none -> Cold, Lightning; Frightened, Grappled, Paralyzed, Restrained — the Kraken's own header lines
[reskin] print canon trait: Amphibious — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon trait: Siege Monster — "a kraken of the black trench" is the Kraken (print's own row)
[reskin] print canon: chassis row leaves — Actions/"Crushing Brine (Recharge 5-6)" is the seat's nova, not the Kraken's
[reskin] print canon legendary: Storm Bolt, Toxic Ink — the Kraken's own kit stands where the chassis's stood
[reskin] print canon row: Actions/Fling — the Kraken's own
[reskin] print canon row priced: Lightning Strike — dice 33 → 58
[reskin] print canon row: Actions/Lightning Strike — the Kraken's own
[reskin] print canon row: Actions/Swallow — the Kraken's own
```


---


### Saint Corvath the Oathsworn — one marked soft

**Concept:** a death knight who leads a damned legion

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor |
|---|---|---|---|---|---|---|---|---|---|
| Saint Corvath the Oathsworn | 18 (2014) | caster-21-warpriest | ok | SOFT: hot-offense | ok | ok | ok | ok | ok |

- bands · soft · hot-offense: offense alone reads CR 24, 6 over; the HP axis pulls the read to 18.5
- read: def 13 / off 24 → 18.5; sustained 200 (2 × Blackened Greatsword + legendary Sword Stroke); nova Unholy Pyre 72; dmg 200

```
Saint Corvath the Oathsworn
Medium undead, neutral
Armor Class

19 (natural armor)

Hit Points: 

256 (27d8 + 135)

Speed: 

40 ft.

STR	DEX	CON	INT	WIS	CHA


22 (+6)

	

16 (+3)

	

21 (+5)

	

16 (+3)

	

18 (+4)

	

20 (+5)

Skills: 

Perception +10, Religion +9

Saving Throws: 

CON +11, WIS +10, CHA +11

Damage Immunities: 

poison

Condition Immunities: 

exhaustion, poisoned

Senses: 

darkvision 120 ft., passive Perception 20

Languages: 

All languages

Challenge

18 (20,000 XP)

Proficiency Bonus:

+6

Legendary Resistance (3/Day). If Corvath fails a saving throw, it can choose to succeed instead.
Bolstering Cry (2/Day). As a bonus action, each ally within 30 feet of Corvath gains 21 (6d6) temporary hit points.

Actions
Multiattack: Corvath makes two Blackened Greatsword attacks. It can replace one attack with a use of Spellcasting to cast bestow curse.
Blackened Greatsword: Melee Spell Attack: +10 to hit, reach 5 ft. or range 120 ft., one target. Hit: 40 (8d8 + 4) necrotic damage. The weapon magically returns to Corvath's hand.
Unholy Pyre (Recharge 5-6): Each creature within 20 feet of Corvath must make a DC 19 Constitution saving throw, taking 72 (16d8) necrotic damage on a failed save, or half as much damage on a successful one.
Spellcasting: Corvath casts one of the following spells, requiring no material components and using Wisdom as the spellcasting ability (spell save DC 18): - At will: bestow curse, fear
1/day each: blight (cast at 5th level), cloudkill (cast at 9th level)
Legendary Actions

Corvath can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. Corvath regains spent legendary actions at the start of its turn.

Sword Stroke: Corvath makes one Blackened Greatsword attack.
Dead March: Corvath moves up to half its Speed without provoking opportunity attacks.
Cull the Faithless: One creature within 30 feet of Corvath must succeed on a DC 19 Wisdom saving throw or be frightened of Corvath until the end of its next turn.
```

**Engine trace**

```
[route] caster-warpriest (artillery) type=Undead mechanics=aura — defender-leader: a Undead commands no troops | caster-warpriest: ✓ ("a death knight") | caster-warpriest: no line key in the words — the model's read of its quote
[concept] signature elements: raises a damned legion that fights and dies on command [behavior] | profane war-priest magic and battle-prayer [behavior] | grave-armored death knight with a blackened greatsword [body]
[reskin] signature idea (action): "Corvath snarls a command and a spectral soldier under its banner dissolves into unholy fire, killing itself and burning everything close to it in a burst of necrotic flame. If no soldier remains, Corvath instead hardens the oath-flesh of the last remnant into a jagged shell of grave-iron that shields it until it strikes again." [bonus_action/always/damage] — menu: aggro-curse, self-invisibility, rally (+ shelf: condition-payoff, seal, lure, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, drain, delayed-brand, curse-debt, zone-seed, reveal, snap-shot, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature miss: action — "Corvath snarls a command and a spectral soldier under its banner dissolves into unholy fire, killing itself and burning everything close to it in a burst of necrotic flame. If no soldier remains, Corvath instead hardens the oath-flesh of the last remnant into a jagged shell of grave-iron that shields it until it strikes again." [bonus_action/always/damage] — the model found no template that holds it (offered: aggro-curse, self-invisibility, rally, herd, curse-debt)
[reskin] value check: "Bolstering Cry (2/Day)" EV 11.6 vs floor 6.7 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rally -> Bonus Actions/"Bolstering Cry (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Whenever one of the soldiers raised by its war-cadence falls, Corvath’s own deathless body knits a shard of that soldier’s oath into its armor, leaving it harder to wound until the next soldier dies in its place." [trait/always/defense] — menu: false-appearance, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — death-burst (death)
[reskin] signature miss: trait — "Whenever one of the soldiers raised by its war-cadence falls, Corvath’s own deathless body knits a shard of that soldier’s oath into its armor, leaving it harder to wound until the next soldier dies in its place." [trait/always/defense] — the model found no template that holds it (offered: death-burst)
[reskin] chassis nova: "Unholy Pyre (Recharge 5-6)" — the caster-21-warpriest's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
```


---

