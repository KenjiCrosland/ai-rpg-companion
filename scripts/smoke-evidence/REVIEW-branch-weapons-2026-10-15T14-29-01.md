# Review batch — branch-weapons-2026-10-15T14-29-01

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Border Sellsword | 5 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: attack-in-multiattack | FAIL (1) | 2/2 | 3/3 |
| Highway Tollsman | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Deepforge Exile | 6 | 2024 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/5 |
| Quarry Palm | 5 | 2024 | defender-5 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 2/2 | 5/5 |

**Dropped 0 of 7 user clauses** (coverage 100%); concept share 81% (13/16 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-3 / reader: 1



---

## Border Sellsword — lowest CR

**Concept:** a sellsword who hurls a handaxe and closes with a shortsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Border Sellsword | 5 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: attack-in-multiattack |

- reader · fail · attack-in-multiattack: Actions/Heavy Crossbow is an attack row the Multiattack never names — a GM who reads the Multiattack never uses it
- read: def 3 / off 7 → 5; sustained 42 (2 × Shortsword); nova Hurled Burst 28; dmg 47

```
Border Sellsword

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

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
16
+3
+6
WIS
11
+0
+0
MOD
SAVE
CON
14
+2
+2
CHA
10
+0
+0

Skills Perception +3, Stealth +6

Senses darkvision 60 ft.; Passive Perception 13

Languages Common plus one other language

CR 5 (XP 1,800; PB +3)

Actions

Multiattack. The sellsword makes two Shortsword attacks.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Piercing damage, and the sellsword has Advantage on its next attack roll against the target before the end of its next turn.

Heavy Crossbow. Ranged Attack Roll: +6, range 100/400 ft. 16 (3d8 + 3) Piercing damage.

Hurled Burst (Recharge 5-6). Dexterity Saving Throw: DC 13, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. Failure: 28 (8d6) Piercing damage. Success: Half damage.

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
[route] skirmisher-hurler type=Humanoid mechanics=thrown-weapon — skirmisher-hurler: ✓ ("hurls a handaxe") | skirmisher-hurler: key "hurls" (class verb)
[concept] signature elements: hurled handaxe before the charge [behavior] | shortsword finish at close quarters [object] | belt of balanced throwing axes [object]
[reskin] print canon route: "a sellsword who hurls a handaxe and closes with a shortsword" is the Warrior Veteran, a bow-user — the hurler seat stands down for the plain line
[reskin] print canon array: STR 16, DEX 16, CON 14, INT 10, WIS 11, CHA 10 — the Warrior Veteran's, DEX fitted to +6
[reskin] print canon: "a sellsword who hurls a handaxe and closes with a shortsword" heads on the Warrior Veteran — print's rows ride along; the seat stays
[reskin] class kit: fighter — "a sellsword": nothing landed; Riposte yielded to print's row cap 4
[reskin] signature idea (action): "A sudden lunge finisher: the sellsword drives in low and cuts hard at the leg, not just to wound but to plant the target. Anyone it catches this way has a hard time pulling away from the fight for a few beats, which is exactly how a border sellsword pins a fleeing mark or sets up the next burst. It is a close-quarters move, not a throw." [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — thrown-burst-seed (hurl)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into thrown-burst-seed
[reskin] signature miss: action — "A sudden lunge finisher: the sellsword drives in low and cuts hard at the leg, not just to wound but to plant the target. Anyone it catches this way has a hard time pulling away from the fight for a few beats, which is exactly how a border sellsword pins a fleeing mark or sets up the next burst. It is a close-quarters move, not a throw." [rider/on_hit/movement] — the model found no template that holds it (offered: thrown-burst-seed)
[reskin] value check: "Hurled Burst (Recharge 5-6)" EV 43.4 vs floor 30.4 (the whole Multiattack (2 attacks)) — dice 18 → 28 (nova budget)
[reskin] library seed drawn: thrown-burst-seed -> Actions/"Hurled Burst (Recharge 5-6)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Hurl, finish, close: when the sellsword lands a handaxe throw, it immediately reads the opening and can surge a short distance straight toward the struck target, shortsword coming out as it moves. This is the other face of its skirmishing — the throw is never the end of the exchange, only the start of the close." [trait/always/movement] — menu: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "Hurl, finish, close: when the sellsword lands a handaxe throw, it immediately reads the opening and can surge a short distance straight toward the struck target, shortsword coming out as it moves. This is the other face of its skirmishing — the throw is never the end of the exchange, only the start of the close." [trait/always/movement] — no template on the shelf shares a verb with the concept or the idea (offered: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Warrior Veteran's
[reskin] print canon attack: "Handaxe" -> "Heavy Crossbow" — the Warrior Veteran's own ranged row
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Warrior Veteran's
[reskin] print canon: chassis row leaves — Traits/"Skirmisher" is the seat's, not the Warrior Veteran's
```


---

## Highway Tollsman — highest CR

**Concept:** a knight on a warhorse with a barbed lance

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Highway Tollsman | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 6 → 6; sustained 44 (2 × Barbed Lance); nova none; dmg 44

```
Highway Tollsman

Medium Humanoid, Neutral Evil

AC 19
Initiative +1 (11)

HP 104 (16d8 + 32)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
11
+0
+0
MOD
SAVE
DEX
12
+1
+1
WIS
13
+1
+1
MOD
SAVE
CON
15
+2
+5
CHA
14
+2
+2

Skills Athletics +7, Perception +4

Senses darkvision 60 ft.; Passive Perception 14

Languages understands Common but can't speak

CR 7 (XP 2,900; PB +3)

Traits

Great Weapon Master. When the tollsman hits a creature with its Barbed Lance, the attack deals an extra 3 damage.

Actions

Multiattack. The tollsman makes two Barbed Lance attacks.

Barbed Lance. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Piercing damage. If the target is a Large or smaller creature, it is pulled up to 10 feet straight toward the tollsman.

Reactions

Riposte. Trigger: A creature within 5 feet of the tollsman misses it with a melee attack roll. Response: The tollsman makes one Barbed Lance attack against that creature.

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
[route] defender type=Humanoid mechanics=none — skirmisher-mounted: ✓ ("a knight on a warhorse with a barbed lan") | skirmisher-mounted -> defender: the concept's VERB outranks the noun (key "knight", class verb) | defender: key "knight" (class verb)
[concept] signature elements: barbed lance that hooks and bleeds [object] | warhorse and rider as a single charging mass [body] | holds a line and punishes those who try to pass [behavior]
[reskin] class kit: fighter — "a knight on a warhorse with a barbed lance": Riposte (riposte)
[reskin] signature idea (action): "The knight drives its barbed lance into a creature and twists, leaving the barbs hooked deep, then uses the pinned foe as an anchor. It hauls the creature bodily into the knight's own space or drags it along as the warhorse steps, and any other enemy trying to move freely past the hooked victim must first deal with the tangled, thrashing body in the way." [rider/on_hit/movement] — menu: stunning-strike, charge-push, hook-rider, charge (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally)
[reskin] signature bound to the concept's verb: action — hook-rider (barb, barbed, barbs)
[reskin] signature rider: hook-rider -> Barbed Lance (appended; the lance barbs hook deep and the knight hauls/drags the pinned creature toward  [verb: barb:concept, barbed:concept, barbs:concept, hook:idea, hooks:idea, drag:idea, drags:idea])
[reskin] signature idea (trait): "The barbs on the lance are designed to stay in the wound. While the weapon remains embedded, the wounded creature keeps bleeding freely and the knight can exploit that hooked connection to reel the victim in or shove it away as the horse shifts." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] signature miss: trait — "The barbs on the lance are designed to stay in the wound. While the weapon remains embedded, the wounded creature keeps bleeding freely and the knight can exploit that hooked connection to reel the victim in or shove it away as the horse shifts." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, weapon-lodge)
```


---

## Deepforge Exile — a 2024 sheet

**Concept:** a dwarf marksman with a heavy crossbow who never draws a blade

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Deepforge Exile | 6 | skirmisher-3-archer | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Crossbow Butt); nova none; dmg 44

```
Deepforge Exile

Medium Humanoid, Neutral

AC 16
Initiative +4 (14)

HP 104 (16d8 + 32)

Speed 30 ft.

MOD
SAVE
STR
11
+0
+0
INT
11
+0
+0
MOD
SAVE
DEX
18
+4
+7
WIS
14
+2
+2
MOD
SAVE
CON
15
+2
+2
CHA
11
+0
+0

Skills Perception +5, Stealth +7

Senses darkvision 60 ft.; Passive Perception 15

Languages Common, Dwarvish

CR 6 (XP 2,300; PB +3)

Traits

Skirmisher. The exile ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The exile makes two attacks, using Crossbow or Crossbow Butt in any combination. It can replace one attack with a use of Hunter's Allure.

Crossbow Butt. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage.

Crossbow. Ranged Attack Roll: +7, range 80/320 ft. 17 (3d8 + 4) Piercing damage, and the exile has Advantage on its next attack roll against the target before the end of its next turn.

Hunter's Allure. Wisdom Saving Throw: DC 15, one creature within 60 feet that can see or hear the exile. Failure: The target has the Charmed condition until the start of the exile's next turn, and while Charmed this way, it must move toward the exile by the safest available route on its turn and can't take Reactions.

Bonus Actions

Fleet Agility. The exile takes the Dash or Disengage action.

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
[route] skirmisher-archer type=Humanoid mechanics=none — skirmisher-archer: ✓ ("a dwarf marksman with a heavy crossbow w") | skirmisher-archer: key "marksman" (class noun)
[concept] signature elements: heavy crossbow with never a blade drawn [object] | shoot-and-scoot skirmish discipline [behavior] | iron-forged dwarven craftsmanship [body]
[reskin] signature idea (action): "The exile snaps off a shot aimed not to wound but to pin, driving the bolt through a foe's gear or clothing and into the ground or wall behind. Until the target tears free or the exile looses its next bolt, that foe is stuck where it stands, unable to close the distance while the exile calmly reloads. The shot itself is weaker than a true killing bolt, but it buys exactly the space the sniper need" [rider/on_hit/movement] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — lure (draw)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into lure
[reskin] signature miss: action — "The exile snaps off a shot aimed not to wound but to pin, driving the bolt through a foe's gear or clothing and into the ground or wall behind. Until the target tears free or the exile looses its next bolt, that foe is stuck where it stands, unable to close the distance while the exile calmly reloads. The shot itself is weaker than a true killing bolt, but it buys exactly the space the sniper need" [rider/on_hit/movement] — the model found no template that holds it (offered: lure)
[reskin] value check: "Luring Presence" EV 11.6 vs floor 10.9 (one attack of 2) — worth the trade
[reskin] library seed drawn: lure -> Actions/"Luring Presence" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The exile's heavy crossbow is fitted with a specialized self-cocking lever and groove, letting the dwarf reload it with a fluid, practiced motion that never exposes it to a counter-charge. As long as the exile keeps moving between shots, it can loose a bolt and still slip away before anyone can answer." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "The exile's heavy crossbow is fitted with a specialized self-cocking lever and groove, letting the dwarf reload it with a fluid, practiced motion that never exposes it to a counter-charge. As long as the exile keeps moving between shots, it can loose a bolt and still slip away before anyone can answer." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
```


---

## Quarry Palm — a print donor

**Concept:** a temple guardian with no weapons at all who strikes with open palms

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Quarry Palm | 5 | defender-5 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Fist: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 4 / off 7 → 5.5; sustained 50 (2 × Fist); nova none; dmg 50

```
Quarry Palm

Large Construct, Unaligned

AC 19
Initiative -1 (9)

HP 76 (8d10 + 32)

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
18
+4
+7
CHA
3
-4
-4

Skills Athletics +7, Perception +3

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft.; Passive Perception 13

Languages Understands commands given in any language but can't speak

CR 5 (XP 1,800; PB +3)

Traits

Clinging Grip. The palm adheres to anything that touches it. A Huge or smaller creature adhered to the palm is also Grappled by it (escape DC 15). Ability checks made to escape this grapple have Disadvantage.

Bound. The palm is magically bound to an amulet. While the palm and its amulet are on the same plane of existence, the amulet's wearer can telepathically call the palm to travel to it, and the palm knows the distance and direction to the amulet. If the palm is within 60 feet of the amulet's wearer, half of any damage the wearer takes (round up) is transferred to the palm.

Regeneration. The palm regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point.

Spell Storing. A spellcaster who wears the palm's amulet can cause the palm to store one spell of level 4 or lower. To do so, the wearer must cast the spell on the palm while within 5 feet of it. The spell has no effect but is stored within the palm. Any previously stored spell is lost when a new spell is stored. The palm can cast the spell stored with any parameters set by the original caster, requiring no spell components and using the caster's spellcasting ability. The stored spell is then lost.

Actions

Multiattack. The palm makes two Fist attacks.

Fist. Melee Attack Roll: +7, reach 10 ft. 18 (4d6 + 4) Bludgeoning damage plus 7 (2d6) Force damage. Once on each of the palm's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 15. Failure: The target has the Stunned condition until the end of the palm's next turn.

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
[route] defender-warden type=Construct mechanics=none — defender-warden: ✓ ("a temple guardian") | defender-warden: no line key in the words — the model's read of its quote
[concept] signature elements: open-palm strikes that break formations instead of bones [behavior] | living stone body with no weapon grips [body] | silent, patient, never-fleeing posture at a threshold [aura]
[reskin] print canon route: the Shield Guardian's body outranks the warden seat — no verb in the words names it; the plain defender line
[reskin] print canon array: STR 18, DEX 8, CON 18, INT 7, WIS 10, CHA 3 — the Shield Guardian's; STR 18 outranks the card's +6, so the sheet rolls +7 (raise-only)
[reskin] print canon: "a temple guardian with no weapons at all who strikes with open palms" heads on the Shield Guardian — print's rows ride along; the seat stays
[reskin] signature idea (action): "It drives a flat palm into the ground at its feet, and the shock travels outward through stone and soil as a spreading crack. Anyone standing on that same stone is thrown off balance and left clinging to their guard; the palm then steps through the broken line it just carved." [action/always/condition] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — disarm, riposte, stunning-strike (weapon, opening, palm)
[reskin] signature re-poured: action — the idea left the concept's verb; the concept itself is poured into disarm, riposte, stunning-strike
[reskin] signature rider: stunning-strike -> Palm (appended; an open-palm strike that can stun the target [verb: palm:concept])
[reskin] signature idea (trait): "Its hands are the only weapon it has ever owned, so when something tries to slip free of its grip or slip past its reach, the stone itself remembers the maker's vow and simply refuses to let go. What it closes on, it keeps." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature template (trait): adhesive -> Traits/"Clinging Grip" ("What it closes on, it keeps — something that slips free of its grip is Grappled, [verb: grip:idea]")
[reskin] print canon size: Medium -> Large — the Shield Guardian's
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands commands given in any language but can't speak" — the Shield Guardian's
[reskin] print canon attack: "Palm" -> "Fist" — the Shield Guardian's own row
[reskin] print canon rows: Force Palm leave — the Shield Guardian has one melee row (Fist), and Multiattack reads print's
[reskin] print canon trait: Bound — "a temple guardian with no weapons at all who strikes with open palms" is the Shield Guardian (print's own row)
[reskin] print canon trait: Regeneration — "a temple guardian with no weapons at all who strikes with open palms" is the Shield Guardian (print's own row)
[reskin] print canon trait: Spell Storing — "a temple guardian with no weapons at all who strikes with open palms" is the Shield Guardian (print's own row)
```
