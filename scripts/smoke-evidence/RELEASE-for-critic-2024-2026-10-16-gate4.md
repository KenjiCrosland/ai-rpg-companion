# Case: the class/body release gate, and a prompt that was obeying orders

Run: `smoke-out/classes-eight-2026-10-16T22-10-02` — **0 FAIL of 16, notes only.**
Review: `scripts/smoke-evidence/REVIEW-classes-eight-2026-10-16T22-10-02.md`.
Check: `scripts/smoke-evidence/CHECK-classes-eight-2026-10-16T22-10-02.md`.
Gates: 71 suites / 2797 passed; `npm run build` clean.

This is stop point 4, the bar for the class/body landing. **Attack the evidence
before the result**: the two sections below are where I think it is weakest.

## 1. The gate is met, and one run is thin evidence for it

The two notes:

- `gates · SOFT · ko-at-will` — Open Palm applies Stunned at will, single target
- `structure · SOFT · reach` — Greataxe reach 10 on a Medium body, no tether word

**Why I would not trust this alone.** The same 16-prompt batch produced 2 FAILs
and then 0 FAILs within an hour today, and a metric on it swung 0/4 → 1/1 → 0/3
across three consecutive runs. classes-eight also repeats 16 fixed prompts, so it
cannot show variety problems by construction. A clean run here is necessary, not
sufficient, and I would not release on it without a varied batch beside it.

**The implied-class field barely appears in this run.** One sighting:
`"rogue"` on *"a ninja who moves through the shadows"*. Most classes-eight
prompts contain a table keyword, so the field is only exercised where the table
is silent — which is the correct design but means this batch says almost nothing
about it. Its real evidence is `stage34-2026-10-16T20-49-59` (ninja→rogue,
samurai→fighter, gladiator→fighter, druid refused, beast refused).

**The asked trigger/limit fields produced no verdicts at all here** (0 ok, 0
mismatch, 1 dropped). They only fire when a GM names a trigger or a limit, and
these 16 prompts rarely do. The field has, to date, one genuine finding to its
name across every run: the GM names a trigger and the engine ships an untriggered
row (`Slam` at `at_will`; `Misty Step` at `at_will`). Four corrections to my own
measurement bought that one finding. **It is fair to ask whether it earns its
place.**

## 2. The flying berserker: the call was obeying the prompt, not misreading the GM

The owner's example, `stage34-2026-10-16T20-49-59` block 07: *"a berserker who
flies into an unstoppable rage"* shipped Humanoid with **Fly 70 ft.** and DEX 20.

I first reported this as "both calls were right and the table overruled both."
**That was half wrong**, and the owner's reading was right: the identity call
itself answered `themes=aerial`. It did so because the prompt said

```
CHASSIS: ... routed onto the "skirmisher-winged" template — ...
The identity IS that chassis embodied
```

Measured with a new prompt-level probe (`scripts/probe-identity.mjs`, N samples
of one prompt, so a classification is a rate), 5 samples each:

| prompt | `aerial` |
|---|---|
| no `line` passed | **0/5** |
| `line: 'skirmisher-winged'` | **5/5** |
| + the `readPhrases` concept (the real flow exactly) | **5/5** |

One parameter, never → always. The call was following an instruction.

**The fix** gives the chassis HOW IT FIGHTS and the GM's words WHAT IT IS
(`themes`, `creature_type`, `mind`), with the user's words winning a disagreement
and the cue marked rejected. Verified with the line still forced on:

| case | result |
|---|---|
| berserker, `skirmisher-winged` forced | `aerial 0/5`, `hints: flies✗ winged✗` |
| storm roc on the SAME winged line (control) | `aerial 5/5` |
| iron golem (control) | `forged 5/5` |

Clean 6-concept probe: **0/30**, both controls intact. End to end
(`idiom-2026-10-16T22-03-01`): `bestial/terror` for the berserker, `armed/mind`
for an iron-willed inquisitor (was `forged/armed`), roc keeps `aerial` + Fly 120.

**The sheet still flies.** The donor is `skirmisher-8-winged`, chosen by the route
table; themes do not pick donors. The call's `winged→style ✗` is produced and
discarded — `rejectedCanon` is consumed at exactly one site, `generate.mjs:4468`,
the name-canon skip. The route never reads it.

**The architectural finding, and the one that constrains stage 4b step 3:**

```
line 91: [route]   brute: ✓ | brute -> skirmisher-winged: the VERB outranks the noun (key "flies")
line 92: [concept] hints: winged→style ✗ ("flies into a rage")
```

**The table decides before the call is asked.** A precedence flip that only
changes who wins a tie cannot fix this: at routing time there is no answer to
prefer, because the question has not been put. Step 3 needs *ask-before-routing*,
or a re-route when the call rejects a cue the router used.

## 3. Corrections to my earlier reports

1. "Both calls were right and the table overruled both" — the identity call said
   `aerial`; the prompt told it to.
2. I called the classifier nondeterministic from `✗` in one run and `✓` in the
   next. It is 5/5 stable asked cleanly; I was comparing two different prompts.
3. I guessed the archetype primed it. Measured: `skirmisher` gives `aerial 0/5`,
   identical to `brute`. The channel was `line`.
4. **In the stage34 package I filed that run's `attack-stat` FAIL (`Greataxe: +8
   derives from DEX`) as an unrelated pre-existing family — 12 of 188 runs, 7 of
   them the same "Mace derives from DEX" shape. The frequency is true and the new
   fields are not the cause, but the conclusion was wrong: on that block the DEX
   attack is downstream of the winged misroute, because the winged skirmisher
   chassis is DEX-based.** I classified a failure by its rule name and its history
   and never asked why that block had it. If one thing in this package deserves
   scrutiny, it is how many other "pre-existing family" calls I have made the same
   way.

## 4. Five latent defects the new fields flushed out

None caused by the fields; each was already in the engine and shipped once a door
opened wider. This was the stage's real yield.

- **The engine invented a weapon.** `ranged_name: ctx.rangedName ?? 'Longbow'` —
  a ranged-host template on a sheet with no ranged attack rendered a bow the
  creature does not have (Court Step-Wizard, beside Slam and Spellcasting). A
  template that cannot be filled now declines. Family: 6 of 186 runs, five
  shapes, including the Shadowblade "Poisoned Blade" bug chased separately.
- **A row named for a weapon took another weapon's range.** `Spear ... range
  30/120` (a javelin's). `e.weapon`, fitted from the row's numbers, outvoted the
  word a GM reads. Verified live: `Spear ... range 20/60` with `weapon=scimitar`
  underneath.
- **The dangling-reference scan lived in one reader**, so the checker failed
  sheets generation had built happily. One exported predicate now, both readers.
- **That scan's regex over-captured** — `uses Slam against the attacker` captured
  the whole tail and read a live row as dangling. Harmless while only the checker
  reported it; a silent false refusal once generation read it. Old vs new, 12 runs
  / ~117 blocks: identical verdicts.
- **Invented darkvision on 98% of Humanoids** against print's 1 of 26. The first
  fix was dead code: the prompt's own example read `e.g. 'darkvision 60 ft.'` and
  the call echoed it, so the fallback I changed was never reached.

## 5. Known and not fixed

- the flying berserker's wings (needs 4b step 3, above)
- `attack-stat`: a class kit's weapon not matching the chassis stat — a standing
  family, 12 of 188 runs, and at least one instance is a misroute symptom
- `lurker-5` under print's CR 5 HP band in 4 of 4 runs (owner's parked question 1)
- the generation-side dangling guard has 4 pins on its predicate but has never
  fired on a live run; the condition stopped recurring once the root cause landed
- three word rules I added today (`SAYS_WHEN`/`SAYS_OFTEN`, the darkvision
  `gmSaid`, `soloLen: 5`) are listed in `plans/stage4b-inventory.md` §C as
  violating the new ruling, pending the owner's call on revert vs fold

---

# 2024 blocks

## Review batch — classes-eight-2026-10-16T22-10-02

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Steam-Marsh Stillness | 5 | 2024 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok | soft (1) | 1/1 | 4/5 |
| Vesper of the Gables | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Dame Oriel | 5 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Kaelen the Shield-Wall | 6 (2014) | 2014 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Volkra Emberwrought | 8 | 2024 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 1/1 | 3/6 |
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Vigil of the Shrine Door | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/2 |
| Quillen Ashvale | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Thurivald | 6 (2014) | 2014 | defender-3-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/4 |
| Sera Vaelin | 8 | 2024 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 2/6 |
| Umbral Stalker | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 3/6 |
| Winter-Pack Dire Wolf | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/2 |
| Keyhole Shade | 4 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Labyrinth Warden | 6 | 2024 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Last Vow | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 2/4 |
| Mira the Cutpurse | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/5 |

**Dropped 3 of 19 user clauses** (coverage 84%); concept share 72% (57/79 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---


### Winter-Pack Dire Wolf — lowest CR

**Concept:** a dire wolf that hunts in a pack

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Winter-Pack Dire Wolf | 3 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "hunts in a pack"
- read: def 1 / off 3 → 2; sustained 24 (2 × Bite); nova none; dmg 24

```
Winter-Pack Dire Wolf

Large Beast, Unaligned

AC 15
Initiative +3 (13)

HP 60 (8d10 + 16)

Speed 50 ft.

MOD
SAVE
STR
17
+3
+3
INT
3
-4
-4
MOD
SAVE
DEX
16
+3
+5
WIS
12
+1
+1
MOD
SAVE
CON
15
+2
+2
CHA
7
-2
-2

Skills Perception +3, Stealth +5

Senses darkvision 60 ft.; Passive Perception 13

Languages None

CR 3 (XP 700; PB +2)

Traits

Pack Tactics. The dire wolf has Advantage on an attack roll against a creature if at least one of the dire wolf's allies is within 5 feet of the creature and the ally doesn't have the Incapacitated condition.

Actions

Multiattack. The dire wolf makes two Bite attacks.

Bite. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.

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

**Where each row came from**

- Traits/Pack Tactics — print's own row
- Actions/Multiattack — the chassis
- Actions/Bite — the chassis

**Engine trace**

```
[route] skirmisher type=Beast mechanics=none — skirmisher: ✓ ("hunts in a pack") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Beast themes=bestial/devouring mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: pack hunting with hit-and-run lunges [behavior] | a heavy hide built for shrugging off blows [body] | the freezing of prey through exhaustion and blood loss [behavior]
[concept] identity: The dire wolf opens from ambush, breaking from cover in a converging pack to drag down a single target before it can react. Every round after that is a spinning wheel of snapping feints and retreating lunges, each wolf peeling away as another closes, wearing prey down through bleeding flanks and exhausted legs rather than a stand-up fight. When bloodied, it does not fight to the death — it breaks off, circles, and waits for the pack to reform before striking again, and it flees outright if the pack is shattered.
[concept] lore: These oversize wolves run the old forest edges where livestock and lone travelers go missing, and they want only to feed the pack through a winter that never quite ends.
[reskin] print canon array: STR 17, DEX 16, CON 15, INT 3, WIS 12, CHA 7 — the Dire Wolf's, DEX fitted to +5
[reskin] donor: skirmisher-3 -> CR 3
[reskin] print canon: "a dire wolf that hunts in a pack" heads on the Dire Wolf — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the dire wolf" — the call's own answer (kind), built from the name
[reskin] inline form: "the dire wolf" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a dire wolf" -> has (descriptive), head | "hunts in a pack" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The wolf makes a lunging bite at a target, then immediately drags and shoves the victim in a direction of its choosing. The movement provokes no reaction from the victim. This lunge can only be used against a target that has already been bitten by any wolf this round, so the pack must draw first blood together." [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, charge (+ shelf: trample, leap, gaze-single, snare, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte)
[reskin] signature bound to the concept's verb: action — focus (hunt)
[reskin] word match declined by the call: hook-rider, rampage, charge-push, pounce, charge — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown focus, which the GM's words keyed
[reskin] key match declined: action — "focus" was ranked first on the call's own menu for hunt, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The wolf makes a lunging bite at a target, then immediately drags and shoves the victim in a direction of its choosing. The movement provokes no reaction from the victim. This lunge can only be used against a target that has already been bitten by any wolf this round, so the pack must draw first blood together." [rider/on_hit/movement] — the model found no template that holds it (offered: focus, affliction, contagion, charge-push, hook-rider, pounce, isolation, charge, rampage, lure, aggro-curse)
[reskin] fallback respects the call: focus, rampage left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a dire wolf that hunts in a pack" heads on the Dire Wolf and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Sundering Shove" EV 1.7 vs floor 6.2 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The wolf's heavy winter hide and thick scruff turn aside glancing hits. Whenever a blow fails to wound it deeply, the wolf can pivot and reposition slightly without opening itself to attack." [trait/on_being_hit/defense] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (hunts, hunted)
[reskin] word match declined by the call: faultless-tracker — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for hunts+hunted, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The wolf's heavy winter hide and thick scruff turn aside glancing hits. Whenever a blow fails to wound it deeply, the wolf can pivot and reposition slightly without opening itself to attack." [trait/on_being_hit/defense] — the model found no template that holds it (offered: faultless-tracker, heated-body, absorption, bloodied-burst, resonant-body, bloodied-fury, guarded-stance)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Bite = none
[reskin] languages held: None stands — INT 3 on a Beast speaks nothing, whatever the mind read said
[reskin] print canon trait: Pack Tactics — "a dire wolf that hunts in a pack" is the Dire Wolf (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Dire Wolf's
[reskin] print canon: chassis row leaves — Traits/"Pack Stalker" is the seat's, not the Dire Wolf's
```


---


### Sera Vaelin — highest CR

**Concept:** an oathsworn crusader who smites the unclean and mends her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Sera Vaelin | 8 | defender-8-leader | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 6 / off 8 → 7; sustained 54 (3 × Longsword); nova none; dmg 54

```
Sera Vaelin

Medium Humanoid, Lawful Neutral

AC 17
Initiative +2 (12)

HP 135 (18d8 + 54)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+5
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
13
+1
+1
MOD
SAVE
CON
16
+3
+6
CHA
18
+4
+7

Skills Athletics +8, Persuasion +7

Senses Passive Perception 11

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from Sera, Sera and its allies have Advantage on attack rolls and saving throws, provided Sera doesn't have the Incapacitated condition.

Actions

Multiattack. Sera makes three attacks, using Longsword or Javelin in any combination.

Longsword. Melee Attack Roll: +8, reach 5 ft. 18 (3d8 + 5) Slashing damage.

Javelin. Melee or Ranged Attack Roll: +8, reach 5 ft. or range 30/120 ft. 18 (3d8 + 5) Piercing damage.

Bonus Actions

Lay on Hands (2/Day). Sera touches a creature within 5 feet of itself and restores 18 (4d8) Hit Points to it.

Divine Smite (2/Day). Sera charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra 9 (2d8) Radiant damage.

Reprisal. One creature within 5 feet that hit Sera with an attack roll since the end of Sera's last turn takes 7 (2d6) Bludgeoning damage.

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

**Where each row came from**

- Traits/Aura of Authority — the chassis
- Actions/Multiattack — the chassis
- Actions/Longsword — weapon longsword
- Actions/Javelin — weapon javelin
- Bonus Actions/Lay on Hands — template lay-on-hands; paladin kit; the GM's clause "mends her soldiers"
- Bonus Actions/Divine Smite — template coating; paladin kit; the GM's clause "smites the unclean"; energy Radiant
- Bonus Actions/Reprisal — library seed own-turn-punisher

**Engine trace**

```
[route] defender-leader type=Humanoid mechanics=none — caster-warpriest: a caster line needs a magic word in the words — none here | defender-leader: ✓ ("mends her soldiers") | defender-leader: no line key in the words — the model's read of its quote
[concept] hints: warpriest→style ✓ ("smites the unclean and mends her soldier")
[concept] resolve: archetype=defender type=Humanoid themes=armed/celestial mind=sapient style=leader energy=Radiant mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: radiant smite against the unclean [behavior] | parrying guard that shields nearby allies [behavior] | armor and blade of consecrated iron [object]
[concept] identity: A plate-clad oathsworn crusader who opens combat by calling down a radiant smite on the most profane foe she can see, then plants herself beside her soldiers and becomes the wall they fight behind — parrying blades meant for them and mending their wounds with a touch of consecrated steel. She does not chase; she holds the line, and she will die on it before she flees.
[concept] lore: Bound by an oath sworn over the grave of a fallen company, she wanders the borderlands seeking the unclean that slew her soldiers, and she will not rest until every profane thing that draws breath is laid low.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] donor: defender-8-leader -> CR 8 (invented — no printed peer)
[reskin] class kit: Aura of Authority — the sheet already carries a row of that name
[reskin] kit energy: "Divine Smite" deals Radiant, not Bludgeoning — the shape's own fiction
[reskin] class kit: paladin — "an oathsworn crusader": Lay on Hands (2/Day) (lay-on-hands), Divine Smite (2/Day) (coating as Divine Smite)
[reskin] inline declared: "Sera" — the call's own answer (person), built from the name
[reskin] inline form: "Sera" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an oathsworn crusader" -> has (descriptive), head | "smites the unclean" -> has (mechanical) [asked: attack] | "mends her soldiers" -> has (mechanical) [asked: heal]
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "When an enemy she can see strikes one of her nearby allies, Sera interposes her own consecrated steel with a shout of command, turning the blow aside and leaving the attacker open for a heartbeat. Until the start of her next turn, her ally is shielded by her oath and the next attack Sera makes against that same enemy lands true." [reaction/on_being_hit/defense] — menu: riposte (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, second-wind, volley-order, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (mend)
[reskin] word match declined by the call: curse-debt, aggro-curse, rally, riposte, herd — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown rally, which the GM's words keyed
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for mend, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When an enemy she can see strikes one of her nearby allies, Sera interposes her own consecrated steel with a shout of command, turning the blow aside and leaving the attacker open for a heartbeat. Until the start of her next turn, her ally is shielded by her oath and the next attack Sera makes against that same enemy lands true." [reaction/on_being_hit/defense] — the model found no template that holds it (offered: rally, riposte, herd, curse-debt, aggro-curse)
[reskin] fallback respects the call: coating (already on the sheet), rally, herd left the shelf — the call declined them for this sheet
[reskin] value check: "Answering Sting" EV 3.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Her armor is not merely plate; it is iron quenched in holy rites and never cooled by fear. When she stands firm and does not move on her turn, her oath sets like a wall around her, and enemies who strike her in that stance find their blows turned by the weight of her consecrated conviction." [trait/always/condition] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] trait declined: "Consecrated Bulwark" — bound only on the idea's own words (stance:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Longsword = longsword; Javelin = javelin
audit finding below confidence gate: Aura of Authority The trait requires tracking Sera's Incapacitated condition to determine the aura's active state, adding combat-state bookkeeping not needed for the rest of the entry.
[reskin] audit rename blocked — "Divine Smite (2/Day)" is the user's own part name, a kit feature's real name, or print's own row
[reskin] audit rename: "Answering Sting" -> "Reprisal"
```


---


### Steam-Marsh Stillness — a 2024 sheet

**Concept:** a lizardfolk monk who strikes pressure points with an open hand

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Steam-Marsh Stillness | 5 | skirmisher-3 | ok | ok | ok | SOFT: ko-at-will | ok | ok | ok | ok | ok |

- gates · soft · ko-at-will: Actions/Open Palm: Stunned at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)
- read: def 3 / off 5 → 4; sustained 34 (2 × Open Palm); nova none; dmg 34

```
Steam-Marsh Stillness

Medium Humanoid, Lawful Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft., Swim 40 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
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

Skills Perception +4, Stealth +6

Senses Passive Perception 14

Languages Common, Draconic

CR 5 (XP 1,800; PB +3)

Traits

Hold Breath. The stillness can hold its breath for 15 minutes.

Marsh Stride. Difficult Terrain composed of mud doesn't cost the stillness extra movement, and the stillness can move across mud without needing to make an ability check.

Actions

Multiattack. The stillness makes two attacks, using Open Palm or Pressure Dart in any combination.

Open Palm. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage. Once on each of the stillness's turns when it hits with this attack, the target is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target has the Stunned condition until the end of the stillness's next turn. If the target is a creature and doesn't already have a deadened limb, it is subjected to the following effect. Constitution Saving Throw: DC 13. Failure: The target receives a deadened limb. While wounded, the target loses 5 (1d10) Hit Points at the start of each of its turns. The wound closes after 1 minute, after a spell restores Hit Points to the target, or after the target or a creature within 5 feet of it takes an action to stanch the wound, succeeding on a DC 13 Wisdom (Medicine) check.

Pressure Dart. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Fleet Agility. The stillness takes the Dash or Disengage action.

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

**Where each row came from**

- Traits/Hold Breath — lizardfolk kit; the GM's clause "a lizardfolk monk"
- Traits/Marsh Stride — lizardfolk kit; the GM's clause "a lizardfolk monk"
- Actions/Multiattack — the chassis
- Actions/Open Palm — a declared feature; the GM's clause "strikes pressure points with an open hand"
- Actions/Pressure Dart — weapon dart
- Bonus Actions/Fleet Agility — the chassis

**Engine trace**

```
[route] skirmisher type=Humanoid mechanics=none — skirmisher: ✓ ("a lizardfolk monk who strikes pressure p") | skirmisher: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/mind mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: open-hand pressure-point strikes that cripple limbs [behavior] | lizardfolk hide and marsh-born patience [body] | hit-and-run pack skirmishing [behavior]
[concept] identity: The pressure-point monk opens from stealth or cover, closing in a single burst to land a precise open-hand strike that locks a joint or numbs a limb — then flows out of reach before the target can retaliate. Every round is a darting rhythm: feint, dart in, deliver one crippling touch, dart back, letting the pack's numbers and the target's own deadened body do the rest. Under pressure it fights with cold discipline, withdrawing bloodied only to circle back and exploit a foe already slowed by its earlier strikes.
[concept] lore: A lizardfolk ascetic from the steam-marsh monasteries, it hunts trespassers not for meat but to test the body's hidden shut-off points, believing every creature's pressure points are a map to the same primordial stillness.
[reskin] donor: skirmisher-3 -> CR 5
[reskin] row evicted for the cap: Traits/"Flowing Step" (chassis filler) leaves so "Marsh Stride" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] species kit: lizardfolk — "a lizardfolk monk": Hold Breath (Hydra/Hold Breath), Marsh Stride (terrain-walk, authored); Swim 30 ft.
[reskin] class kit: monk — "strikes pressure points with an open hand": Stunning Strike (stunning-strike, rides Open Palm); Patient Defense yielded to print's row cap 4
[reskin] inline declared: "the stillness" — the call's own answer (kind), built from the name
[reskin] inline form: "the stillness" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a lizardfolk monk" -> has (descriptive), head | "strikes pressure points with an open hand" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The stillness feints low with an open palm at one foe's guard, then darts through the gap and lands a precise touch on a different creature's already-numbed pressure point, locking that limb so the target cannot bring its weapon or shield to bear. Until the target shakes the deadness off, it fights with one arm or leg crippled, and any ally of the stillness can exploit the opening." [rider/on_hit/condition] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, charge (+ shelf: trample, leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — riposte (opening)
[reskin] pick kept on the GM's own words: action — "affliction" has no key-table verb, but the call quotes "who strikes pressure points with an open hand" from the description
[reskin] signature rider: affliction -> Open Palm (appended; The precise touch on an already-numbed pressure point locks the limb until the t [shape fit, no verb match])
[reskin] signature idea (trait): "The stillness's marsh-born patience lets it read a body's hidden shut-off points the longer it observes a foe. If the stillness spends its turn motionless in mud, reeds, or steam, watching a creature it can see, its next open-hand touch against that creature lands with unnerving certainty, slipping past armor and unnatural toughness." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: terrain-walk — the key word does not mean the mechanic here
[reskin] trait declined: "Still Marsh Veil" — bound only on the idea's own words (motionless:idea, hidden:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] weapons answered: Open Palm = none; Pressure Dart = dart
[reskin] weapon table: "Pressure Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] languages by species: Draconic — the concept names the species; print's NPCs of it speak it
```


---


### Vesper of the Gables — a print donor

**Concept:** a tiefling rogue who stalks the rooftops of the old quarter

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vesper of the Gables | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 7 → 5; sustained 48 (2 × Shortsword); nova none; dmg 48

```
Vesper of the Gables

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 90 (20d8)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
10
+0
+0
INT
12
+1
+1
MOD
SAVE
DEX
16
+3
+6
WIS
14
+2
+2
MOD
SAVE
CON
10
+0
+0
CHA
16
+3
+3

Skills Perception +5, Stealth +9

Resistances Fire

Senses darkvision 60 ft.; Passive Perception 15

Languages Common plus one other language, Infernal

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, Vesper has Advantage on attack rolls against any creature that hasn't taken a turn. If Vesper hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Evasion. If Vesper is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Vesper instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Vesper makes two attacks, using Shortsword or Hand Crossbow in any combination.

Shortsword. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage plus 7 (2d6) Poison damage.

Hand Crossbow. Ranged Attack Roll: +6, range 30/120 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. Vesper takes the Dash, Disengage, or Hide action.

Predatory Focus (2/Day). Vesper has Advantage on the next attack roll it makes before the end of its turn.

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

**Where each row came from**

- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "stalks the rooftops of the old quarter"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "a tiefling rogue"
- Actions/Multiattack — the chassis
- Actions/Shortsword — print's row, renamed; weapon dagger
- Actions/Hand Crossbow — print's own row; weapon hand crossbow
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Predatory Focus — library seed focus; the GM's clause "stalks the rooftops of the old quarter"; binds the GM's words: stalk

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("stalks the rooftops of the old quarter") | skirmisher-skulker: key "stalks" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=grasping/terror mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rooftop stalking [behavior] | sneak attack from hiding [behavior] | tiefling shadow-blood heritage [body]
[concept] identity: The tiefling rogue opens from the rooftops, using the old quarter's gables and chimneys to line up a sneak attack before any victim knows they are watched. Once blood is drawn, it never stays in one alley — it vaults, climbs, and slinks through the vertical maze, striking only when advantage is reborn, then fading back into soot and shadow. Under pressure it fights with cold, grinning patience, preferring to bleed a pursuer into exhaustion before finishing them from a ledge they cannot reach.
[concept] lore: Born of a noble house's devil-pact and cast into the old quarter's gutters, this rogue now taxes the district in blood, stealing what the law won't miss and leaving the rest to fear the silhouette on the tiles.
[reskin] print canon array: STR 10, DEX 16, CON 10, INT 12, WIS 14, CHA 16 — the Spy's, DEX fitted to +6
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] print canon: "a tiefling rogue who stalks the rooftops of the old quarter" heads on the Spy — print's rows ride along; the seat stays
[reskin] species kit: tiefling — "a tiefling rogue": header lines only; darkvision 60 ft.; resistance Fire
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] row evicted for the cap: Traits/"Rooftop Stalker" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "a tiefling rogue": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "Vesper" — the call's own answer (person), built from the name
[reskin] inline form: "Vesper" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tiefling rogue" -> has (descriptive), head | "stalks the rooftops of the old quarter" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Vesper scuttles along rooftops and chimneys to get above a prey, then drops with a blade-first plunge that leaves a jagged wound weeping soot. For a short while, if the wounded prey speaks or moves too obviously, Vesper can hear the stain from anywhere in the district and knows exactly which way it runs." [rider/on_hit/condition] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — focus (stalk)
[reskin] fit declined: "Sootfall Wound" — a print body takes only what the user's words ask; the call offered no quote, and the key table finds no verb either (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] value check: "Predatory Focus (2/Day)" EV 2.9 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: focus -> Bonus Actions/"Predatory Focus (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Vesper never fights in the open when the old quarter's vertical maze is near. After attacking, if there is a roof, wall, or chimney it could plausibly use to break line of sight, it slips into that cover and becomes very hard to pin down until it strikes again from a new angle." [trait/always/movement] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — faultless-tracker (stalks, stalk)
[reskin] word match declined by the call: faultless-tracker, spider-climb — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "collision" after being shown faultless-tracker, which the GM's words keyed
[reskin] key match declined: trait — "faultless-tracker" was ranked first on the call's own menu for stalks+stalk, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Vesper never fights in the open when the old quarter's vertical maze is near. After attacking, if there is a roof, wall, or chimney it could plausibly use to break line of sight, it slips into that cover and becomes very hard to pin down until it strikes again from a new angle." [trait/always/movement] — the model found no template that holds it (offered: faultless-tracker, false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] concept-first trait skipped: faultless-tracker — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Shiv = dagger; Hand Crossbow = hand crossbow
[reskin] weapon declared: "Shiv" is a dagger — the call's own answer
[reskin] weapon table: "Hand Crossbow" — a launcher, never thrown, range 30/120
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] print canon languages: "Common, Infernal" -> "Common plus one other language, Infernal" — the Spy's plus the concept's Infernal
[reskin] print canon attack: "Shiv" -> "Shortsword" — the Spy's own row
[reskin] on-hit extra retyped: "Assassinate" adds Piercing, not Bludgeoning — the hit's own type (Shortsword)
[reskin] row binds its clause: "Predatory Focus" answers "stalks the rooftops of the old quarter" — the keys it matched came from that clause, so the coverage credit has a receipt
audit finding below confidence gate: Shortsword The 2024 format requires the damage to be written as 'plus 7 (2d6) Poison damage' but this span follows '17 (4d6 + 3) Piercing damage' without a comma and uses 'plus' correctly, yet the overall line is grammatically a fragment because it lacks a subject and verb, making the sentence ungrammatical.
[reskin] audit rename blocked — "Assassinate" is the user's own part name, a kit feature's real name, or print's own row
[reskin] species kit: resistance Fire — the tiefling's
[harness] re-rolled Traits/"Assassinate" -> "Rooftop Stalker" [catalog: faultless-tracker]
```

**Re-roll — one entry, replaced**

```
Traits / BEFORE  Assassinate: During the first round of each combat, Vesper has Advantage on attack rolls against any creature that hasn't taken a turn. If Vesper hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.
Traits / AFTER   Rooftop Stalker: Vesper knows the direction and distance to any creature it has damaged within the last 24 hours, as long as the two of them are on the same plane of existence.
provenance: catalog template "faultless-tracker", binds stalks, stalk
```


---


### Volkra Emberwrought — one marked soft

**Concept:** a goliath berserker who loses control when wounded

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Volkra Emberwrought | 8 | brute-5 | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok |

- structure · soft · reach: Actions/Greataxe: reach 10 on a Medium body with no tether word
- read: def 6 / off 8 → 7; sustained 54 (2 × Greataxe); nova none; dmg 54

```
Volkra Emberwrought

Medium Humanoid, Neutral

AC 15
Initiative -1 (9)

HP 150 (20d8 + 60)

Speed 30 ft.

MOD
SAVE
STR
20
+5
+8
INT
6
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
16
+3
+6
CHA
6
-2
-2

Skills Athletics +8, Perception +3

Senses Passive Perception 13

Languages Common

CR 8 (XP 3,900; PB +3)

Traits

Berserk. Whenever Volkra starts its turn Bloodied, roll 1d6. On a 6, Volkra goes berserk. On each of its turns while berserk, Volkra attacks the nearest creature it can see. If no creature is near enough to move to and attack, Volkra attacks an object. Once Volkra goes berserk, it remains so until it is destroyed or it is no longer Bloodied.

Bloodied Frenzy. While Bloodied, Volkra has Advantage on attack rolls and saving throws.

Mountain Stride. Difficult Terrain composed of ice or snow doesn't cost Volkra extra movement, and Volkra can move across ice or snow without needing to make an ability check.

Actions

Multiattack. Volkra makes two attacks, using Greataxe or Handaxe in any combination.

Greataxe. Melee Attack Roll: +8, reach 10 ft. 27 (5d8 + 5) Slashing damage.

Handaxe. Ranged Attack Roll: +8, range 20/60 ft. 23 (4d8 + 5) Slashing damage.

Bonus Actions

Answering Sting. One creature within 5 feet that hit Volkra with an attack roll since the end of Volkra's last turn takes 11 (2d10) Bludgeoning damage.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Greataxe — weapon greataxe
- Actions/Handaxe — weapon handaxe
- Traits/Berserk — template berserk; barbarian kit; the GM's clause "loses control when wounded"
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a goliath berserker"
- Traits/Mountain Stride — goliath kit; the GM's clause "a goliath berserker"
- Bonus Actions/Answering Sting — library seed own-turn-punisher

**Engine trace**

```
[route] brute type=Humanoid mechanics=none — brute: ✓ ("a goliath berserker who loses control wh") | brute: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Humanoid themes=bestial/elemental mind=sapient style=— energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: wounded frenzy [behavior] | iron-skinned goliath frame [body] | blood-ignited aura of rage [aura]
[concept] identity: A goliath berserker opens the fight by hurling itself into the enemy line, swinging a massive greata weapon in wide, punishing arcs. Every round it stays in melee, trading blows without flinching, and when it is first wounded its rage floods its body with volatile, blood-born fire: its attacks ignite and its tempo accelerates. Under pressure it never retreats, fighting to the death with a howling fury that makes it more dangerous the bloodier it becomes.
[concept] lore: Born of goliath tribes that ritually temper their warriors in volcanic blood-iron, this berserker seeks a glorious death in battle, believing that each wound it survives brings it closer to its ancestors' fire.
[reskin] energy withheld: Fire on a Humanoid with no Fire in the concept's own words (fixed phrases read first)
[reskin] donor: brute-5 -> CR 8
[reskin] name_element answered: Emberwrought = imagery
[reskin] species kit: goliath — "a goliath berserker": Mountain Stride (terrain-walk, authored)
[reskin] class kit: barbarian — "a goliath berserker": Bloodied Frenzy (Berserker/Bloodied Frenzy), Berserk (berserk); Rampage yielded to print's row cap 5
[reskin] inline declared: "Volkra" — the call's own answer (person), built from the name
[reskin] inline form: "Volkra" — the model's own reading of the name
[reskin] energy rider withheld: Fire on a Humanoid with no Fire in the concept's own words
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a goliath berserker" -> has (descriptive), head | "loses control when wounded" -> has (descriptive)
[reskin] signature idea (action): "When Volkra is wounded and its blood-fire surges, it can instantly vent that heat as a violent forward burst, attempting to crash into and bowl over the creature that struck it. If the shove connects, Volkra slams into that foe, knocking it off balance and leaving it exposed to the berserker's next swing." [reaction/on_being_hit/condition] — menu: EMPTY (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — rampage, affliction (wound)
[reskin] word match declined by the call: rampage, affliction, thrown-burst, ground-burst, thrown-burst-seed, rally — the key word does not mean the mechanic here
[reskin] value check: "Sundering Shove" EV 3.7 vs floor 14 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — the ladder could not lift it; the fallback stands in
[reskin] fallback respects the call: rampage, rally left the shelf — the call declined them for this sheet
[reskin] fallback skipped by the floor: terror-pulse (EV 29.7 vs 45.6)
[reskin] fallback skipped by the floor: push-prone (EV 3.7 vs 14)
[reskin] fallback skipped by the floor: herd (EV 10.5 vs 45.6)
[reskin] value check: "Answering Sting" EV 6.1 vs floor 4.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Volkra's molten blood-iron nature makes every blow against it a gamble: when a nearby attacker lands a hit, searing heat flares through the wound, punishing the attacker with a flash of fire that also leaves Volkra's own blood running hotter and its vision redder." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst, bloodied-fury (wounded)
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown bloodied-burst, bloodied-fury, which the GM's words keyed
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for wounded, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Volkra's molten blood-iron nature makes every blow against it a gamble: when a nearby attacker lands a hit, searing heat flares through the wound, punishing the attacker with a flash of fire that also leaves Volkra's own blood running hotter and its vision redder." [trait/on_being_hit/damage] — the model found no template that holds it (offered: bloodied-burst, bloodied-fury, absorption, resonant-body, weapon-lodge, uncanny-sense)
[reskin] weapons answered: Greataxe = greataxe; Handaxe = handaxe
[reskin] weapon table: "Handaxe" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
```


---


### Dame Oriel — in the run

**Concept:** name: Dame Oriel | a knight who holds the line with a shield and a longsword

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dame Oriel | 5 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 42 (2 × Longsword); nova none; dmg 42

```
Dame Oriel

Medium Humanoid, Lawful Neutral

AC 19
Initiative +1 (11)

HP 78 (12d8 + 24)

Speed 30 ft.

MOD
SAVE
STR
16
+3
+6
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
14
+2
+5
CHA
14
+2
+2

Skills Athletics +6, Perception +4

Senses Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Guarded Stance. While Dame Oriel isn't Bloodied, melee attack rolls against it are made with Disadvantage.

Actions

Multiattack. Dame Oriel makes two Longsword attacks.

Longsword. Melee Attack Roll: +6, reach 5 ft. 21 (4d8 + 3) Slashing damage, and the target has Disadvantage on its next attack roll before the start of Dame Oriel's next turn.

Bonus Actions

Shieldwall Bulwark (2/Day). Each ally within 30 feet of Dame Oriel gains 9 (2d8) Temporary Hit Points.

Reactions

Riposte. Trigger: A creature within 5 feet of Dame Oriel misses it with a melee attack roll. Response: Dame Oriel makes one Longsword attack against that creature.

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

**Where each row came from**

- Traits/Guarded Stance — template guarded-stance; fighter kit; the GM's clause "keeps the line with a shield and a longsword"
- Actions/Multiattack — the chassis
- Actions/Longsword — authored for this sheet; a named part; a declared feature; the GM's clause "keeps the line with a shield and a longsword"; weapon longsword
- Reactions/Riposte — template riposte; fighter kit; the GM's clause "Dame Oriel — a knight"
- Bonus Actions/Shieldwall Bulwark — template rally; library draw (seed unstamped); the GM's clause "keeps the line with a shield and a longsword"; binds the GM's words: shield

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a knight who keeps the line with a shiel") | defender: key "keeps the line" (class verb)
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: provided "Dame Oriel"
[concept] mechanics: none claimed
[concept] signature elements: shield wall defense [behavior] | longsword riposte [object] | unyielding line-holder [behavior]
[concept] identity: Dame Oriel plants her shield and holds the line, punishing any foe that tries to slip past her with a precise longsword cut. Every round she advances a single step, forcing enemies back and daring them to break her guard. She fights with cold discipline and never flees, even bloodied, because the line is her sacred duty.
[concept] lore: Dame Oriel is a sworn shield of a fallen order, bound by oath to hold a crumbling pass until relieved — she does not know the relief column was lost years ago.
[reskin] donor: defender-5 -> CR 5
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Longsword (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Sword Thrust" leaves — the GM named a melee weapon (Longsword); one weapon, one rule set
[reskin] class kit: fighter — "Dame Oriel — a knight": Riposte (riposte), Guarded Stance (guarded-stance)
[reskin] proper noun: "Dame Oriel" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Dame Oriel" — the call's own answer (person), built from the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Dame Oriel — a knight" -> has (descriptive), head | "keeps the line with a shield and a longsword" -> has (mechanical)
[reskin] signature idea (action): "Dame Oriel slams her shield into the ground, raising a shimmering wall of force that pins enemies in place and shields her allies. While the wall stands, any enemy who tries to cross it is stopped and takes the full weight of her reprisal, and those behind her gain cover from her unwavering guard." [action/always/defense] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield)
[reskin] word match declined by the call: push-prone, own-turn-punisher — the key word does not mean the mechanic here
[reskin] value check: "Shieldwall Bulwark (2/Day)" EV 5 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Shieldwall Bulwark (2/Day)" ("Dame Oriel plants her shield to shield her allies — the unwavering guard grants  [verb: shield:concept]")
[reskin] keys spent by the action: shield
[reskin] signature idea (trait): "Whenever Dame Oriel blocks or turns aside a blow with her …, she immediately answers with a precise longsword cut, punishing the attacker for daring to test her guard." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Whenever Dame Oriel blocks or turns aside a blow with her …, she immediately answers with a precise longsword cut, punishing the attacker for daring to test her guard." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Longsword = longsword; Shield Bash = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] row binds its clause: "Shieldwall Bulwark" answers "keeps the line with a shield and a longsword" — the keys it matched came from that clause, so the coverage credit has a receipt
```


---


### Vareth Solmane — in the run

**Concept:** name: Vareth Solmane | a templar priest of the dawn who blesses her soldiers

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 8 → 6.5; sustained 54 (2 × Mace); nova none; dmg 54

```
Vareth Solmane

Medium Humanoid, Neutral

AC 19
Initiative +0 (10)

HP 93 (17d8 + 17)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+7
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+3
MOD
SAVE
CON
12
+1
+4
CHA
13
+1
+1

Skills Athletics +7, Perception +6

Senses Passive Perception 16

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Traits

Guard Aura. While in a 10-foot Emanation originating from Vareth, Vareth's allies have Advantage on saving throws, provided Vareth doesn't have the Incapacitated condition.

Actions

Multiattack. Vareth makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +7, range 60 ft. 22 (4d8 + 4) Radiant damage.

Spellcasting. Vareth casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Dawnward Benediction (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

Divine Aid (3/Day). Vareth casts Bless, Dispel Magic, Healing Word, or Lesser Restoration, using the same spellcasting ability as Spellcasting.

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

**Where each row came from**

- Traits/Guard Aura — the chassis
- Actions/Multiattack — the chassis
- Actions/Mace — weapon mace
- Actions/Radiant Flame — print's own row, renamed; weapon mace
- Actions/Spellcasting — print's own row
- Bonus Actions/Dawnward Benediction — template rally; library draw (seed unstamped); the GM's clause "blesses her soldiers"; binds the GM's words: blessing+bless+prayer+mend+troops
- Bonus Actions/Divine Aid — print's own row

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=aura — defender-leader: ✓ ("templar priest of the dawn who blesses h") | defender-leader -> caster-warpriest: the concept's VERB outranks the noun (key "blesses", class verb) | caster-warpriest: key "blesses" (class verb)
[concept] resolve: archetype=caster type=Humanoid themes=armed/celestial mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: aura
[concept] signature elements: blessing her soldiers with dawn-lit prayers [behavior] | radiant mace and holy war-gear [object] | aura of the dawn that heartens allies [aura]
[concept] identity: Vareth Solmane advances at the head of her soldiers, calling down the dawn's radiance to bless her allies and sear her enemies; once engaged, she fights as an armored war-priest, striking with a radiant mace while keeping her troops standing through healing prayers. She is a disciplined fanatic who never flees while her flock remains, and when wounded she grows more zealous, spending her last miracles to turn the tide.
[concept] lore: Vareth Solmane was once a mortal templar who led a doomed dawn assault against a siege of shadows, and now she wanders battlefields where hope is thin, seeking to gather the faithful and prove the dawn never truly dies.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Priest is not a caster first and keys STR 16 over DEX 10 (its own Spellcasting rides as print's row) — the caster family stands down for the plain defender line
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] name_element answered: Searing Light = literal; Dawnward Blessing = imagery
[reskin] repair round 1: 2 defect(s) — "Searing Light" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type | name "Searing Light" claims an element its damage (Radiant) does not pay
[reskin] name_element answered: Searing Light = literal; Dawnward Blessing = imagery
[reskin] repair round 2: 1 defect(s) — "Blessed Mace Swing" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Blessed Mace Swing" Radiant -> Bludgeoning (the row's own noun; a Humanoid deals no Radiant its concept never gave it)
[reskin] damage type by the row's own noun: "Blessed Mace Swing" Bludgeoning -> Radiant
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Vareth calls down a dawn-lit prayer over her troops the instant the fighting turns. Every ally close enough to hear her faith is steadied and mended as the light breaks over them, and the same radiance clings to her mace, letting her next swing sear whoever stands against the faithful." [action/once_per_fight/resource] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] word match declined by the call: lay-on-hands — the key word does not mean the mechanic here
[reskin] value check: "Dawnward Benediction (2/Day)" EV 6.1 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Dawnward Benediction (2/Day)" ("Vareth calls down a prayer that steadies and mends allies close enough to hear h [verb: blessing:concept, bless:concept, prayer:idea, mend:idea, troops:idea]")
[reskin] keys spent by the action: blessing, bless
[reskin] signature idea (trait): "The more wounded Vareth becomes, the more fiercely the dawn burns inside her. While she is bloodied, her radiant strikes grow heavier and her prayer-light clings to her soldiers, keeping them standing in the face of the shadows she has sworn to break." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The more wounded Vareth becomes, the more fiercely the dawn burns inside her. While she is bloodied, her radiant strikes grow heavier and her prayer-light clings to her soldiers, keeping them standing in the face of the shadows she has sworn to break." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, bloodied-burst, warded-mending)
[reskin] weapons answered: Mace = mace; Searing Light = none; Dawnward Blessing = none
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Blessed Mace Swing" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] row binds its clause: "Dawnward Benediction" answers "blesses her soldiers" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rewrite blocked — "Guard Aura" is engine-authored chassis text
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[harness] re-rolled Actions/"Mace" -> "Mace" [the call's own text]
```

**Re-roll — one entry, replaced**

```
Actions / BEFORE  Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.
Actions / AFTER   Mace: *Melee Attack Roll:* +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage. On a hit, one ally within 30 feet of Vareth that can see or hear Vareth gains Advantage on the next attack roll it makes before the end of its next turn.
provenance: none — the call wrote the text itself
```


---


### Vigil of the Shrine Door — in the run

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Vigil of the Shrine Door | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Mace); nova none; dmg 26

```
Vigil of the Shrine Door

Medium Humanoid, Neutral

AC 19
Initiative +0 (10)

HP 66 (12d8 + 12)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
13
+1
+1
MOD
SAVE
DEX
10
+0
+0
WIS
16
+3
+5
MOD
SAVE
CON
12
+1
+3
CHA
13
+1
+1

Skills Athletics +6, Perception +5

Senses Passive Perception 15

Languages Common plus one other language

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The vigil makes two attacks, using Mace or Hurl-Mace in any combination.

Mace. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the vigil's next turn.

Hurl-Mace. Ranged Attack Roll: +6, range 30/120 ft. 13 (2d8 + 4) Bludgeoning damage.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Mace — authored for this sheet; a named part; a declared feature; the GM's clause "a templar priest with a mace"; weapon mace
- Actions/Hurl-Mace — print's own row; weapon mace

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a templar priest with a mace") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "a templar priest with a mace and no magi…" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: mace-and-shield hold-the-line [behavior] | no magic, only iron faith [body] | the mace itself [object]
[concept] identity: The templar opens by stepping into the narrowest ground it can find and raising its mace — not to strike first, but to make the first strike cost. Every round after, it holds that line and answers any foe who tries to slip past with a crushing, bone-breaking blow. It does not chase; it does not flee; it simply refuses to yield the ground it has claimed, grinding down anyone foolish enough to come within reach.
[concept] lore: Stripped of orders and faith by a church that no longer answers, these former templars keep the vigil anyway, holding doorways, bridges, and shrines with nothing but iron and stubborn flesh.
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +6
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] inline by rule: "the vigil" — the call answered "the shrine door" (kind), which the name does not support
[reskin] lacks asked: "no magic at all"
[reskin] asked field dropped: "a templar priest with a mace" carries no frequency word, so the call's "at_will" has no receipt in the GM's own clause
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) [asked: attack] | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "The vigil sets its shield and swings its mace low, shattering the bones of a foe within reach. Until the vigil's next turn, shields and all armor help that foe no more, so every later strike lands as cleanly as the first. This blow is only for a creature already hurt or unsteady — never a fresh, untouched enemy." [rider/on_hit/damage] — menu: charge-push, hook-rider (+ shelf: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte)
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The vigil sets its shield and swings its mace low, shattering the bones of a foe within reach. Until the vigil's next turn, shields and all armor help that foe no more, so every later strike lands as cleanly as the first. This blow is only for a creature already hurt or unsteady — never a fresh, untouched enemy." [rider/on_hit/damage] — the model found no template that holds it (offered: charge-push, hook-rider, rally)
[reskin] fallback stands down: "a templar priest with a mace and no magic at all" heads on the Priest and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Disarming Twist" EV 0 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Disarming Twist" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "While the vigil holds its ground without moving from where it stands, its refusal to yield grinds at nearby foes: any creature that starts its turn in contact with the vigil and tries to slip away finds the way blocked by iron and stubborn flesh, costing it the freedom to leave without a fight." [trait/start_of_turn/movement] — menu: warded-mending (+ shelf: false-appearance, absorption, bloodied-burst, resonant-body, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, weapon-lodge)
[reskin] word match declined by the call: resonant-body, uncanny-sense — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "While the vigil holds its ground without moving from where it stands, its refusal to yield grinds at nearby foes: any creature that starts its turn in contact with the vigil and tries to slip away finds the way blocked by iron and stubborn flesh, costing it the freedom to leave without a fight." [trait/start_of_turn/movement] — the model found no template that holds it (offered: warded-mending, resonant-body, uncanny-sense)
[reskin] weapons answered: Mace = mace; Hurl-Mace = mace (thrown)
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon yields: "Hurl-Mace" keeps its mace — the GM typed it; the Priest's Radiant Flame prices the row but does not replace the weapon
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
audit finding below confidence gate: Multiattack The subject 'vigil' is a lowercase non-creature referent (the creature is 'Vigil of the Shrine Door'), so the sentence does not start with a proper referent for the monster.
[reskin] audit rename blocked — "Hurl-Mace" is the user's own part name, a kit feature's real name, or print's own row
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 13 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] multiattack re-read — "Hurl-Mace" joins the combination; "The vigil makes two attacks, using Mace or Hurl-Mace in any combination."
[reskin] lacks clause: Actions/"Spellcasting" leaves — "no magic at all"
[reskin] dead wildcard name swept — "Divine Aid (3/Day)" was only about "Spellcasting"; the row drops
```


---


### Quillen Ashvale — in the run

**Concept:** a court wizard who is never where you struck and steps away

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Quillen Ashvale | 6 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 2 / off 5 → 3.5; sustained 36 (3 × Arcane Burst); nova none; dmg 36

```
Quillen Ashvale

Medium Humanoid, Neutral

AC 15
Initiative +2 (12)

HP 81 (18d8)

Speed 30 ft.

MOD
SAVE
STR
9
-1
-1
INT
17
+3
+6
MOD
SAVE
DEX
14
+2
+2
WIS
12
+1
+4
MOD
SAVE
CON
11
+0
+0
CHA
11
+0
+0

Skills Arcana +6, Perception +4

Senses Passive Perception 14

Languages Common and any three languages, Sylvan

CR 6 (XP 2,300; PB +3)

Traits

Flickering Sidestep. If Quillen is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Quillen instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Quillen makes three Arcane Burst attacks.

Arcane Burst. Melee or Ranged Attack Roll: +6, reach 5 ft. or range 120 ft. 12 (2d8 + 3) Force damage.

Spellcasting. Quillen casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 14):

- At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation
- 2/Day Each: Fireball, Invisibility
- 1/Day Each: Cone of Cold, Fly

Bonus Actions

Misty Step (3/Day). Quillen casts Misty Step, using the same spellcasting ability as Spellcasting.

Shimmering Step (2/Day). Quillen teleports up to 30 feet to an unoccupied space it can see.

Reactions

Protective Magic (3/Day). Trigger: Quillen is hit by an attack roll. Response: Quillen casts Shield in response, gaining a +5 bonus to AC until the start of its next turn, including against the triggering attack.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Arcane Burst — print's own row, renamed; weapon rapier
- Actions/Spellcasting — print's own row
- Reactions/Protective Magic — the chassis
- Bonus Actions/Misty Step — mage kit; the GM's clause "is never where you struck and steps away"
- Bonus Actions/Shimmering Step — template phase-slip; library draw (seed unstamped); the GM's clause "is never where you struck and steps away"; binds the GM's words: step
- Traits/Flickering Sidestep — template evasion; library draw (seed unstamped); the GM's clause "is never where you struck and steps away"; binds the GM's words: never where

**Engine trace**

```
[route] lurker type=Humanoid mechanics=teleport — lurker: ✓ ("never where you struck") | lurker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=lurker type=Humanoid themes=arcane/uncanny mind=sapient style=— energy=Psychic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: teleport
[concept] signature elements: steps away from every strike [behavior] | afterimage decoy [body]
[concept] identity: The court wizard opens by seeming to stand exactly where the enemy's blow lands, then is revealed as an afterimage as the real wizard steps aside and answers with a precise, punishing strike. Every round it refuses to be pinned, stepping out of reach after each attack and forcing foes to chase a target that is never quite there. It is a duelist at heart, calm under pressure and willing to withdraw from a losing fight only to return when the odds favor it again.
[concept] lore: A palace-trained spellcaster who traded a court appointment for a life of quiet predation, it haunts noble ruins and forgotten estates, seeking to prove that the best wizard is the one never touched by a blade.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Mage casts and strikes only with magic (Force) — the caster family takes the line from lurker, so the attack bonus and the spell DC key to one stat
[reskin] print canon defenses: HP 84 -> 81, AC 15 -> 15 — the Mage's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 9, DEX 14, CON 11, INT 17, WIS 12, CHA 11 — the Mage's at its own CR; attack +7 -> +6, DC 14 (print's)
[reskin] donor: caster-6 -> CR 6
[reskin] print canon: "a court wizard who is never where you struck and steps away" heads on the Mage — print's rows ride along; the seat stays
[reskin] class kit: Protective Magic — the sheet already carries a row of that name
[reskin] class kit: mage — "a court wizard": Misty Step (3/Day) (Mage/Misty Step)
[reskin] inline declared: "Quillen" — the call's own answer (person), built from the name; the rules would have said "Ashvale"
[reskin] inline on kit rows: "Ashvale" -> "Quillen"
[reskin] inline form: "Quillen" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "is never where you struck and steps away" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "a court wizard" -> has (descriptive), head | "is never where you struck and steps away" -> has (descriptive)
[reskin] menu pruned: action — snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "Quillen leaves behind a shimmering afterimage where it stood, which mindlessly mimics its motion and draws attackers' eyes. Foes who mistake the afterimage for the real wizard waste their strikes, while Quillen watches and learns their attack patterns, sharpening its own responses. The decoy lasts only moments before dissolving, and its trickery can be seen through by a wary observer." [action/always/defense] — menu: thrown-burst, gaze-single, snare, zone, execute, seal, wail, lure, active-toll, random-ray, ground-burst, spew, obstacle-pull, pacify, escalating-dread, snare-bolt, slow-bolt, sensory-strike, herd, thrown-burst-seed, drain, curse-debt, zone-seed, reveal, wind-up, blighted-ground (+ shelf: delayed-brand, lay-on-hands, aggro-curse, self-invisibility, rally, phase-slip, bolt-restrain, bolt-drag, bolt-mark)
[reskin] signature bound to the concept's verb: action — phase-slip (step)
[reskin] value check: "Shimmering Step (2/Day)" EV 2.7 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] signature template: phase-slip -> Bonus Actions/"Shimmering Step (2/Day)" ("the afterimage lets Quillen be 'never where you struck' — the shimmering decoy l [verb: step:concept]")
[reskin] keys spent by the action: step
[reskin] signature idea (trait): "Whenever Quillen slips away from a melee, the space it just left flickers with a taunting afterimage that punishes those who lunge after it. Anyone who chases through that space is thrown off balance, leaving themselves open to Quillen's precise counterstrike." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, evasion)
[reskin] signature bound to the concept's verb: trait — evasion (never where)
[reskin] word match declined by the call: blurred-form — the key word does not mean the mechanic here
[reskin] signature template (trait): evasion -> Traits/"Flickering Sidestep" ("the wizard is never where the strike lands — the attack that reaches it finds no [verb: never where:concept]")
[reskin] weapons answered: Cane Blade = rapier
[reskin] weapon declared: "Cane Blade" is a rapier — the call's own answer (the name alone read longsword)
[reskin] print canon languages: "Common, Sylvan" -> "Common and any three languages, Sylvan" — the Mage's plus the concept's Sylvan
[reskin] print canon attack: "Cane Blade" -> "Arcane Burst" — the Mage's own row
[reskin] print canon row: Actions/Spellcasting — print's own list replaces the chassis's
[reskin] row binds its clause: "Shimmering Step" answers "is never where you struck and steps away" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] row binds its clause: "Flickering Sidestep" answers "is never where you struck and steps away" — the keys it matched came from that clause, so the coverage credit has a receipt
```


---


### Umbral Stalker — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Umbral Stalker | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Kusarigama); nova none; dmg 34

```
Umbral Stalker

Medium Humanoid, Neutral

AC 16
Initiative +3 (13)

HP 91 (14d8 + 28)

Speed 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
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

Skills Perception +4, Stealth +9

Senses Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Assassinate. During the first round of each combat, the stalker has Advantage on attack rolls against any creature that hasn't taken a turn. If the stalker hits a creature during that round, the target takes an extra 9 (2d8) Slashing damage.

Evasion. If the stalker is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the stalker instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. The stalker makes two attacks, using Kusarigama or Shuriken in any combination.

Kusarigama. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Slashing damage.

Shuriken. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The stalker takes the Dash, Disengage, or Hide action.

Shadow Slip (1/Day). The stalker casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

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

**Where each row came from**

- Traits/Assassinate — template assassinate; rogue kit; the GM's clause "strikes unseen"
- Traits/Evasion — template evasion; rogue kit; the GM's clause "a ninja who moves through the shadows and strikes unseen"
- Actions/Multiattack — the chassis
- Actions/Kusarigama — the chassis
- Actions/Shuriken — the chassis
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Shadow Slip — library seed self-invisibility; the GM's clause "strikes unseen"; binds the GM's words: unseen

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("moves through the shadows and strikes un") | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=uncanny/armed mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: strikes unseen from darkness [behavior] | shadow-cloaked body [body] | vanishes into shadows [behavior]
[concept] identity: The shadow-ninja is never seen; it opens a fight from darkness, striking with advantage before melting back into the gloom. Every round it harries, vanishes, and reappears to cut down isolated prey, using shadow-stuff as both cloak and blade.
[concept] lore: These assassins are born from a hidden order that trains its members to become one with the shadow, their bodies slowly infused with living darkness until they can step through any unlit space.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] implied class kept: "rogue" on the GM's own words "a ninja who moves through the shadows and strikes unseen" — the key table found none
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] row evicted for the cap: Traits/"Shadowstep" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "a ninja who moves through the shadows and strikes unseen": Evasion (evasion), Assassinate (assassinate)
[reskin] inline declared: "the stalker" — the call's own answer (kind), built from the name
[reskin] inline form: "the stalker" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (descriptive) | "strikes unseen" -> has (mechanical)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The stalker dissolves into its own shadow and slides through an unlit space to reappear within reach of a creature that has not yet seen it this fight, then strikes from that darkness. The victim is left unable to track where the blow came from, so its next attempt to defend against the stalker is compromised." [action/always/condition] — menu: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] value check: "Umbral Veil (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] signature dropped by the floor: "Umbral Veil (1/Day)" — the ladder could not lift it; the fallback stands in
[reskin] fallback floor waived: self-invisibility — a self-buff the user's words ask for is its own worth (print: the Imp's Invisibility)
[reskin] value check: "Vanish (1/Day)" EV 0 vs floor 2.9 (a bonus action (free)) — a free row that does nothing (logged)
[reskin] library seed drawn: self-invisibility -> Bonus Actions/"Vanish (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "While the stalker is in darkness, its shadowy body bleeds into the gloom, making it impossible to discern its true position. Any creature relying on sight to attack it must guess where it is, and the stalker's own attacks from that darkness go unseen until they land." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature miss: trait — "While the stalker is in darkness, its shadowy body bleeds into the gloom, making it impossible to discern its true position. Any creature relying on sight to attack it must guess where it is, and the stalker's own attacks from that darkness go unseen until they land." [trait/always/defense] — no template on the shelf shares a verb with the concept or the idea (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst, absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] weapons answered: Kusarigama = kusarigama; Shuriken = shuriken
[reskin] weapon table: "Shuriken" — range 30/90 ft. is not a print range; an unlisted thrown thing is 20/60, a hurled mass 60/240 (the critic's third species read)
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] on-hit extra retyped: "Assassinate" adds Slashing, not Bludgeoning — the hit's own type (Kusarigama)
[reskin] darkvision withheld: a Humanoid with no species kit granting it, no word for it in the GM's own text, and no print body that has it — print gives darkvision to 1 of 26 Humanoids ("darkvision 60 ft.; Passive Perception 14" -> "Passive Perception 14")
[reskin] row binds its clause: "Vanish" answers "strikes unseen" — the keys it matched came from that clause, so the coverage credit has a receipt
[reskin] audit rename: "Vanish (1/Day)" -> "Shadow Slip (1/Day)"
```


---


### Keyhole Shade — in the run

**Concept:** an imp rogue who picks locks for a devil

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Keyhole Shade | 4 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 6 → 3.5; sustained 40 (2 × Sting); nova none; dmg 40

```
Keyhole Shade

Small Fiend, Lawful Evil

AC 16
Initiative +4 (14)

HP 67 (15d6 + 15)

Speed 20 ft., Fly 40 ft. (hover)

MOD
SAVE
STR
6
-2
-2
INT
11
+0
+0
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
13
+1
+1
CHA
14
+2
+2

Skills Perception +3, Stealth +6

Resistances Cold

Immunities Fire, Poison; Poisoned

Senses darkvision 120 ft.; Passive Perception 13

Languages Common, Infernal

CR 4 (XP 1,100; PB +2)

Traits

Evasion. If the shade is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the shade instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Magic Resistance. The shade has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The shade makes two Sting attacks.

Sting. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Piercing damage plus 7 (2d6) Poison damage.

Shape-Shift. The shade shape-shifts to resemble a rat (Speed 20 ft.), a raven (20 ft., Fly 60 ft.), or a spider (20 ft., Climb 20 ft.), or it returns to its true form. Its statistics are the same in each form, except for its Speed. Any equipment it is wearing or carrying isn't transformed.

Invisibility. The shade casts Invisibility on itself, requiring no spell components and using Charisma as the spellcasting ability.

Bonus Actions

Nimble Escape. The shade takes the Disengage or Hide action.

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

**Where each row came from**

- Traits/Evasion — template evasion; rogue kit; the GM's clause "an imp rogue"
- Traits/Magic Resistance — print's own row
- Actions/Multiattack — the chassis
- Actions/Sting — print's row, renamed
- Actions/Shape-Shift — print's own row
- Actions/Invisibility — print's own row
- Bonus Actions/Nimble Escape — rogue kit; the GM's clause "an imp rogue"

**Engine trace**

```
[route] skirmisher-skulker type=Fiend mechanics=none — skirmisher-skulker: ✓ ("picks locks for a devil") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] name: provided_name rejected — "an imp rogue who picks locks for a devil…" is the description, not a name
[concept] resolve: archetype=skirmisher type=Fiend themes=fiendish/grasping mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: picking locks and stealing keys [behavior] | vanishing into shadow between strikes [behavior] | a body of living darkness [body]
[concept] identity: A keyhole-shaped shadow that walks like a creature, the imp rogue opens a fight from the dark, its needle-thin claws finding the seam between armor and throat before it vanishes into a fold of its own darkness. Every round after that, it works a lock: on doors, on wrists, on the valves of a wary heart, slipping away the moment an enemy gets a clean grip. It is a coward with an agenda, fleeing bloodied, toying with those it can outmaneuver, and never staying in a fair fight a breath longer than necessary.
[concept] lore: Forged from shadow and notarial ink in a devil's scriptorium, this imp picks the locks of mortal vaults and infernal contracts alike, trading stolen secrets for a rung on the Nine Hells' endless ladder.
[reskin] print canon route: the Imp's body outranks the skulker seat — no verb in the words names it; the plain skirmisher line
[reskin] print canon array: STR 6, DEX 18, CON 13, INT 11, WIS 12, CHA 14 — the Imp's, DEX fitted to +6
[reskin] donor: skirmisher-3 -> CR 4
[reskin] print canon: "an imp rogue who picks locks for a devil" heads on the Imp — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] row evicted for the cap: Traits/"Slippery" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "an imp rogue": Cunning Action (Assassin/Cunning Action), Evasion (evasion)
[reskin] inline declared: "the shade" — the call's own answer (kind), built from the name
[reskin] inline form: "the shade" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "an imp rogue" -> has (descriptive), head | "picks locks for a devil" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The shade presses a claw into the seam of an object or a creature's guard and spends its turn working that lock open. Against an object, it unlatches, unbolts, or empties whatever was fastened shut — doors, manacles, chests, a heart-valve — leaving the thing hanging open and vulnerable. Against a creature it has already hurt, it picks the seam between armor and flesh wide, so the next strike again" [action/always/condition] — menu: trample, leap, gaze-single, snare, condition-payoff, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, charge-push, hook-rider, pounce, isolation, charge)
[reskin] word match declined by the call: disarm, riposte — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit"
[reskin] signature miss: action — "The shade presses a claw into the seam of an object or a creature's guard and spends its turn working that lock open. Against an object, it unlatches, unbolts, or empties whatever was fastened shut — doors, manacles, chests, a heart-valve — leaving the thing hanging open and vulnerable. Against a creature it has already hurt, it picks the seam between armor and flesh wide, so the next strike again" [action/always/condition] — the model found no template that holds it (offered: trample, leap, gaze-single, snare, condition-payoff, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, exploiter, riposte)
[reskin] fallback respects the call: disarm left the shelf — the call declined it for this sheet
[reskin] fallback stands down: "an imp rogue who picks locks for a devil" heads on the Imp and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Sundering Shove" EV 1.9 vs floor 7.3 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Sundering Shove" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "The shade's body is a thing of living darkness with no fixed shape to grab. Whenever someone tries to seize, grapple, swallow, or cage it, it simply folds away through the keyhole-thin gap of itself, slipping out before the grip closes. This does not help it escape damage or effects that simply happen to it — only attempts to physically contain it." [trait/on_being_hit/movement] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, sealed-body)
[reskin] signature bound to the concept's verb: trait — sealed-body (locked)
[reskin] word match declined by the call: sealed-body, adhesive — the key word does not mean the mechanic here
[reskin] decline reason: trait — the call answered none and names it "no_fit" after being shown sealed-body, which the GM's words keyed
[reskin] key match declined: trait — "sealed-body" was ranked first on the call's own menu for locked, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The shade's body is a thing of living darkness with no fixed shape to grab. Whenever someone tries to seize, grapple, swallow, or cage it, it simply folds away through the keyhole-thin gap of itself, slipping out before the grip closes. This does not help it escape damage or effects that simply happen to it — only attempts to physically contain it." [trait/on_being_hit/movement] — the model found no template that holds it (offered: sealed-body, heated-body, absorption, bloodied-burst, resonant-body, adhesive)
[reskin] weapons answered: Needle-Claw = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] print canon size: Tiny -> Small — the Imp's
[reskin] print canon alignment: Neutral Evil -> Lawful Evil — the Imp's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon speed: 40 ft. -> 20 ft. — the Imp's walk; the concept's other modes stay
[reskin] print canon attack: "Needle-Claw" -> "Sting" — the Imp's own row
[reskin] immunities stamped for type: Fiend -> Poison; Poisoned
[reskin] print canon defenses: immunities Poison; Poisoned -> Fire, Poison; Poisoned; resistances none -> Cold — the Imp's own header lines
[reskin] resistances derived: Cold
[reskin] print canon trait: Magic Resistance — "an imp rogue who picks locks for a devil" is the Imp (print's own row)
[reskin] print canon: chassis row leaves — Bonus Actions/"Fleet Agility" is the seat's, not the Imp's
[reskin] print canon row: Actions/Shape-Shift — the Imp's own
[reskin] print canon row: Actions/Invisibility — the Imp's own
```


---


### Labyrinth Warden — in the run

**Concept:** a minotaur reaver who herds prey into the maze

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Labyrinth Warden | 6 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 4 / off 6 → 5; sustained 44 (2 × Greataxe); nova none; dmg 44

```
Labyrinth Warden

Large Monstrosity, Lawful Neutral

AC 14
Initiative -1 (9)

HP 119 (14d10 + 42)

Speed 40 ft.

MOD
SAVE
STR
18
+4
+7
INT
6
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
16
+3
+6
CHA
6
-2
-2

Skills Athletics +7, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 6 (XP 2,300; PB +3)

Traits

Bloodied Frenzy. While Bloodied, the warden has Advantage on attack rolls and saving throws.

Actions

Multiattack. The warden makes two Greataxe attacks.

Greataxe. Melee Attack Roll: +7, reach 10 ft. 22 (4d8 + 4) Slashing damage.

Bonus Actions

Charge. The warden moves up to half its Speed straight toward an enemy it can see.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the warden moves up to half its Speed without provoking Opportunity Attacks, and it makes one Greataxe attack.

Answering Sting. One creature within 5 feet that hit the warden with an attack roll since the end of the warden's last turn takes 7 (2d6) Bludgeoning damage.

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

**Where each row came from**

- Actions/Multiattack — the chassis
- Actions/Greataxe — weapon greataxe
- Bonus Actions/Charge — minotaur kit; the GM's clause "a minotaur reaver"
- Bonus Actions/Rampage — template rampage; barbarian kit; the GM's clause "a minotaur reaver"
- Bonus Actions/Answering Sting — library seed own-turn-punisher
- Traits/Bloodied Frenzy — barbarian kit; the GM's clause "a minotaur reaver"

**Engine trace**

```
[route] brute type=Monstrosity mechanics=none — brute-charger: ✓ ("herds prey into the maze") | brute-charger: no line key in the words — the model's read of its quote | brute-charger -> brute: a charger is a mechanic engine and needs a key in the words — the model's read of its quote cannot land it
[concept] resolve: archetype=brute type=Monstrosity themes=subterranean/bestial mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: herding prey into the maze [behavior] | massive reaver greataxe [object] | perfect knowledge of the labyrinth [behavior]
[concept] identity: The minotaur reaver opens by positioning itself between the prey and the maze's exit, slamming its greataxe into stone and letting the echoes drive the herd deeper. Each round it advances slowly, cutting off side passages and forcing the group toward the warren's dead ends, where it can corner and gore the isolated. It never flees and never toys; it fights with patient, methodical brutality until every invader is broken or lost.
[concept] lore: Born in the cursed labyrinth beneath the broken keep, this minotaur reaver remembers every twisting passage and hunts intruders not for food but to feed the maze its fill of souls, believing each victim's terror keeps the stone alive.
[reskin] donor: brute-5 -> CR 6
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] species kit: minotaur — "a minotaur reaver": Charge (Troll/Charge); darkvision 60 ft.
[reskin] class kit: barbarian — "a minotaur reaver": Bloodied Frenzy (Berserker/Bloodied Frenzy), Rampage (1/Day) (rampage)
[reskin] inline declared: "the warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the warden" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a minotaur reaver" -> has (descriptive), head | "herds prey into the maze" -> has (descriptive)
[reskin] signature idea (action): "The warden slams its greataxe into the surrounding stone, and the labyrinth answers — every wall, arch, and dead end shifts and groans, sealing the passage the prey came from and opening a deeper, darker one behind them. Creatures that can hear the echoes are overcome with panic and instinctively scatter away from the warden, driven toward whatever corner the maze has prepared." [action/save/movement] — menu: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — herd (herd)
[reskin] signature miss: action — "The warden slams its greataxe into the surrounding stone, and the labyrinth answers — every wall, arch, and dead end shifts and groans, sealing the passage the prey came from and opening a deeper, darker one behind them. Creatures that can hear the echoes are overcome with panic and instinctively scatter away from the warden, driven toward whatever corner the maze has prepared." [action/save/movement] — the model picked "wind-up" (no verb, and it quotes nothing the GM typed) over a concept-verb template (herd)
[reskin] fallback skipped by the floor: herd (EV 8.2 vs 35.5)
[reskin] fallback skipped by the floor: push-prone (EV 2.9 vs 10.9)
[reskin] value check: "Answering Sting" EV 3.9 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The warden's greataxe is not just a weapon but a tool of the maze — when it strikes, the blow carries the weight of every wall the labyrinth has ever closed, and the target feels the stone's hunger pressing them backward, dragging them off balance and away from their allies." [trait/always/movement] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] decline reason: trait — the call answered none and names it "no_fit"
[reskin] signature miss: trait — "The warden's greataxe is not just a weapon but a tool of the maze — when it strikes, the blow carries the weight of every wall the labyrinth has ever closed, and the target feels the stone's hunger pressing them backward, dragging them off balance and away from their allies." [trait/always/movement] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] weapons answered: Greataxe = greataxe
[reskin] languages by mind: "None" -> "Common" (sapient)
audit finding below confidence gate: Answering Sting The trigger is a long memory window over which the GM must track every hit against the warden, which is difficult to adjudicate quickly in combat.
[reskin] audit rewrite blocked — "Answering Sting" is engine-authored chassis text
```


---


### Last Vow — in the run

**Concept:** a knight-errant of the fallen order who shields the weak

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Last Vow | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- **dropped clause:** "shields the weak"
- read: def 6 / off 8 → 7; sustained 52 (2 × Counterthrust); nova none; dmg 52

```
Last Vow

Medium Humanoid, Lawful Neutral

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

Senses Passive Perception 14

Languages Common

CR 7 (XP 2,900; PB +3)

Traits

Aura of Authority. While in a 10-foot Emanation originating from the last vow, the last vow and its allies have Advantage on attack rolls and saving throws, provided the last vow doesn't have the Incapacitated condition.

Actions

Multiattack. The last vow makes two Counterthrust attacks.

Shield. Strength Saving Throw: DC 15, one creature within 5 feet that the last vow can see. Failure: 13 (3d8) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition.

Counterthrust. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Piercing damage.

Bonus Actions

Driving Bellow (Recharge 5-6). Wisdom Saving Throw: DC 15, each creature of the last vow's choice within 30 feet. Failure: The target immediately moves up to half its Speed in a direction of the last vow's choice, using the safest available route.

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

**Where each row came from**

- Traits/Aura of Authority — paladin kit; the GM's clause "a knight-errant of the fallen order"
- Actions/Multiattack — the chassis
- Actions/Shield — template shield-bash
- Actions/Counterthrust — weapon spear
- Bonus Actions/Driving Bellow — template herd; library draw (seed unstamped); binds the GM's words: order+command

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("shields the weak") | defender: key "knight" (class verb)
[concept] name: provided_name rejected — "a knight-errant of the fallen order who …" is the description, not a name
[concept] resolve: archetype=defender type=Humanoid themes=armed/grave mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: shielding the weak [behavior] | the fallen order's battered plate [body] | the unbroken oath-vow [aura]
[concept] identity: A knight-errant of the fallen order opens combat not with a charge but by stepping into the path of the nearest ally, raising a battered shield to catch the blow meant for the weak. Every round after, it fights a deliberate, grinding defensive war: it shepherds the wounded behind its guard, punishes any foe that tries to slip past with a sudden counterthrust, and refuses to give ground even as its armor splinters. Under pressure it grows colder and more methodical, treating the battlefield as a wall it must hold rather than a field it must win, and it fights to the death without breaking formation.
[concept] lore: When the fallen order's banner hit the mud, this knight did not; it kept the last vow that still had a witness, and now it walks the ruined roads as a living shield for anyone too weak to raise one.
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] class kit: paladin — "a knight-errant of the fallen order": Aura of Authority (Hobgoblin Captain/Aura of Authority)
[reskin] shield is not a weapon: "Shield" takes print's Shield Bash shape beside Counterthrust — it was "*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) {damage_ty…"
[reskin] inline declared: "the last vow" — the call's own answer (kind), built from the name
[reskin] inline form: "the last vow" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a knight-errant of the fallen order" -> has (descriptive), head | "shields the weak" -> has (descriptive)
[reskin] menu pruned: action — push-prone, snap-shot (the sheet cannot render them)
[reskin] signature idea (action): "The knight raises its battered shield and lets out a single command that echoes with the last authority of its fallen order. Every enemy in front of it that hears the order must turn away and step back, opening a gap the knight's allies can use to slip through or strike. Those who stand their ground are instead left exposed, their attention fixed on the knight as it slowly advances without breakin" [action/once_per_fight/condition] — menu: throw-retrieve, seal, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, herd, curse-debt, reveal, wind-up, exploiter, condition-payoff (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte)
[reskin] signature bound to the concept's verb: action — rally (shield, orders)
[reskin] value check: "Driving Bellow (2/Day)" EV 9.8 vs floor 42.3 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature re-slotted: "Driving Bellow" moves to a bonus action, Recharge-gated because it reaches an area (print: the Centaur Trooper's Trampling Charge) — EV 9.8 vs floor 4.1 there; the GM's verb keeps its row
[reskin] signature template: herd -> Bonus Actions/"Driving Bellow (Recharge 5-6)" ("Every enemy in front of it that hears the order must turn away and step back, op [verb: order:concept, command:idea]")
[reskin] signature idea (trait): "Whenever the knight interposes its shield to protect an ally and the blow lands on the shield instead, the force of the impact is stored in the battered plate. The next time the knight lashes out with its counterthrust, that stored force is released, making the thrust hit harder and shove the foe back a step." [trait/on_being_hit/damage] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature miss: trait — "Whenever the knight interposes its shield to protect an ally and the blow lands on the shield instead, the force of the impact is stored in the battered plate. The next time the knight lashes out with its counterthrust, that stored force is released, making the thrust hit harder and shove the foe back a step." [trait/on_being_hit/damage] — no template on the shelf shares a verb with the concept or the idea (offered: absorption, bloodied-burst, resonant-body, weapon-lodge, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] weapons answered: Shield = shield; Counterthrust = spear
[reskin] weapon declared: "Counterthrust" is a spear — the call's own answer
[reskin] weapon table: "Counterthrust" — thrown, range 20/60
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] multiattack normalised: "The last vow makes two Counterthrust attacks."
[reskin] audit rename blocked — "Shield Shove" promises a push that "Shield" does not deliver
[reskin] row narrowed: "Counterthrust" names nothing that can be thrown — the range leaves (print dresses only a thrown weapon in "Melee or Ranged")
```


---


### Mira the Cutpurse — in the run

**Concept:** a tabaxi cutpurse who slips through the market crowd

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mira the Cutpurse | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Kerambit); nova none; dmg 24

```
Mira the Cutpurse

Medium Humanoid, Chaotic Neutral

AC 15
Initiative +3 (13)

HP 60 (11d8 + 11)

Speed 30 ft., Climb 30 ft.

MOD
SAVE
STR
12
+1
+1
INT
8
-1
-1
MOD
SAVE
DEX
16
+3
+5
WIS
12
+1
+1
MOD
SAVE
CON
13
+1
+1
CHA
8
-1
-1

Skills Perception +3, Stealth +7

Senses darkvision 60 ft.; Passive Perception 13

Languages Common, Thieves' Cant

CR 3 (XP 700; PB +2)

Traits

Evasion. If Mira is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, Mira instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Actions

Multiattack. Mira makes two attacks, using Kerambit or Dart in any combination. It can replace one attack with a use of Cutpurse's Finisher.

Kerambit. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Dart. Ranged Attack Roll: +5, range 20/60 ft. 10 (2d6 + 3) Piercing damage.

Cutpurse's Finisher. Strength Saving Throw: DC 13, one creature within 30 feet that is Incapacitated. Failure: 10 (3d6) Piercing damage. Success: Half damage.

Bonus Actions

Cunning Action. Mira takes the Dash, Disengage, or Hide action.

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

**Where each row came from**

- Traits/Evasion — template evasion; rogue kit; the GM's clause "a tabaxi cutpurse"
- Actions/Multiattack — the chassis
- Actions/Kerambit — weapon dagger
- Actions/Dart — weapon dart
- Actions/Cutpurse's Finisher — library seed exploiter
- Bonus Actions/Cunning Action — the chassis

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("slips through the market crowd") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=bestial/grasping mind=sapient style=skulker energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: slipping through market crowds [behavior] | cutpurse blade [object] | tabaxi agility and climbing [body]
[concept] identity: The tabaxi cutpurse opens by melting into the market crowd, using the bustle as cover to close in and slash with a concealed blade for sneak-attack precision — its prey rarely sees the first cut. Every round after, it strikes and then slips back into the crowd or darts behind a stall, forcing pursuers to guess which face is the threat. When bloodied, it abandons the fight and flees through the press of bodies, preferring survival and another day's hunt over a stand-up brawl.
[concept] lore: Born to the shadowed alleys of a bustling trade city, this tabaxi cutpurse stalks the market for coin and the thrill of the perfect theft, vanishing into the throng before the alarm can be raised.
[reskin] donor: skirmisher-3-skulker -> CR 3
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] species kit: Cat's Dash — "Cunning Action" already grants Dash; one mechanic, one row
[reskin] species kit: tabaxi — "a tabaxi cutpurse": header lines only; Climb 30 ft.; darkvision 60 ft.
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] row evicted for the cap: Traits/"Crowd Slip" (chassis filler) leaves so "Evasion" fits — the cap evicts by priority, it does not refuse the newcomer
[reskin] class kit: rogue — "a tabaxi cutpurse": Evasion (evasion)
[reskin] inline declared: "Mira" — the call's own answer (person), built from the name
[reskin] inline form: "Mira" — the model's own reading of the name
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a tabaxi cutpurse" -> has (descriptive), head | "slips through the market crowd" -> has (descriptive)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "Mira makes a cut at a nearby foe and immediately slips into the surrounding throng of market-goers, ending her move pressed into the nearest crowd, doorway, or stall clutter. While she stays buried in that press of bodies, would-be attackers struggle to pick her out as the threat — the first strike she lands each round comes while her prey's eyes are still scanning the crowd for her, and pursuing " [rider/on_hit/movement] — menu: affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, condition-payoff, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, exploiter, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — feint-slip (slip)
[reskin] word match declined by the call: feint-slip — the key word does not mean the mechanic here
[reskin] decline reason: action — the call answered none and names it "no_fit" after being shown feint-slip, which the GM's words keyed
[reskin] key match declined: action — "feint-slip" was ranked first on the call's own menu for slip, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "Mira makes a cut at a nearby foe and immediately slips into the surrounding throng of market-goers, ending her move pressed into the nearest crowd, doorway, or stall clutter. While she stays buried in that press of bodies, would-be attackers struggle to pick her out as the threat — the first strike she lands each round comes while her prey's eyes are still scanning the crowd for her, and pursuing " [rider/on_hit/movement] — the model found no template that holds it (offered: feint-slip, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark, gaze-single, patient-defense)
[reskin] fallback respects the call: feint-slip left the shelf — the call declined it for this sheet
[reskin] fallback skipped: phase-slip (the sheet cannot render it)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 6.2)
[reskin] value check: "Opportunist's Lash" EV 7.8 vs floor 6.2 (one attack of 2) — worth the trade
[reskin] library seed drawn: exploiter -> Actions/"Opportunist's Lash" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The kerambit is a curving blade made for hooking and opening flesh, and Mira knows exactly where the purse-strings and the arteries lie. Creatures wounded by her blade bleed freely and leave a smear they cannot simply hide, keeping her mark marked and telling her exactly where her quarry fled." [trait/always/damage] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: faultless-tracker, bloodied-fury, bloodied-burst, marking-light — the key word does not mean the mechanic here
[reskin] seat owes nothing: the skulker line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] trait declined: "Relentless Pursuit" — a shape fit with no verb match on a Humanoid body; a meat body earns its trait by a verb
[reskin] weapons answered: Kerambit = dagger; Dart = dart
[reskin] weapon declared: "Kerambit" is a dagger — the call's own answer
[reskin] weapon table: "Dart" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] multiattack replacement clause: It can replace one attack with a use of Opportunist's Lash.
[reskin] audit rename: "Opportunist's Lash" -> "Cutpurse's Finisher"
```

