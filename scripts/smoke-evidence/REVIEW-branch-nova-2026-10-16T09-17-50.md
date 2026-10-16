# Review batch — branch-nova-2026-10-16T09-17-50

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Dirge Swarm | 13 | 2024 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit | FAIL (1) | 0/1 | 3/3 |
| Altarstone Warden | 11 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok | soft (1) | 2/2 | 5/7 |
| Plaguecarrion Mote | 8 | 2024 | skirmisher-8-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/5 |
| Stormcore Detonant | 15 | 2024 | brute-13 | ok | FAIL: hot | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 3/3 |
| Hornwold Warden | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic | FAIL (1) | 1/2 | 1/3 |
| Bog Cauldron | 9 | 2024 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: engine-needs-key, engine-needs-key | FAIL (1) | 1/1 | 3/4 |

**Dropped 3 of 8 user clauses** (coverage 63%); concept share 72% (18/25 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- swarm-9 / reader: 1
- brute-13 / bands: 1
- defender-5 / reader: 1
- brute-8-grappler / reader: 1



---

## Hornwold Warden — lowest CR

**Concept:** a warden of the fold who shields the flock and never leaves the gate

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Hornwold Warden | 7 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: name-mechanic |

- reader · fail · name-mechanic: Actions/Trampling Charge: the name promises movement the text lacks
- **dropped clause:** "shields the flock"
- read: def 6 / off 8 → 7; sustained 52 (2 × Gore); nova none; dmg 52

```
Hornwold Warden

Large Monstrosity, Neutral

AC 19
Initiative +1 (11)

HP 105 (14d10 + 28)

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

Languages None

CR 7 (XP 2,900; PB +3)

Actions

Multiattack. The warden makes two attacks, using Gore or Trampling Charge in any combination.

Gore. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Piercing damage.

Trampling Charge. Melee Attack Roll: +7, reach 5 ft. 26 (5d8 + 4) Bludgeoning damage.

Bonus Actions

Answering Sting. One creature within 5 feet that hit the warden with an attack roll since the end of the warden's last turn takes 10 (3d6) Bludgeoning damage.

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
- Actions/Gore — the chassis
- Actions/Trampling Charge — the chassis
- Bonus Actions/Answering Sting — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Monstrosity mechanics=none — defender-warden: a Monstrosity is not a made or risen guardian | defender: ✓ ("never leaves the gate") | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Monstrosity themes=bestial/grave mind=bestial style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: rooted gate-defense that never leaves its post [behavior] | bone-plated hide and ribbed barricade body [body] | hooked claws that drag trespassers back [body]
[concept] identity: The Warden of the Fold opens combat by rooting itself in the gate-mouth — a bone-ribbed barricade that does not step, does not chase, and does not yield its ground. Every round after, it strikes at anything that approaches its threshold, punishing those who try to slip past with hooked claws that drag them back into its reach; it cannot pursue beyond the gate, so it relies on choking the entry with its own body. Under pressure it fights to the death without hesitation, because the flock behind it depends on its refusal to move, and its only tactic is to become the wall until it is broken.
[concept] lore: A monstrous warden grown from the discarded horns and bones of herd-beasts that died guarding their young, it rises wherever a gate or pass must be held against all comers, and it desires only to stand between the flock and the dark until nothing is left of it.
[reskin] donor: defender-5 -> CR 7
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] ranged row off: "Hybrid Attack" keeps its melee half only
[reskin] repair round 1: 1 defect(s) — name "Trampling Charge" promises movement but the row never delivers it — name what the rule does, or drop the claim word
[reskin] inline declared: "the warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the warden" — the model's own reading of the name
[reskin] save dc derived: DC 14 -> 15 (8 + PB 3 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: "never leaves the gate"
[reskin] lacks refused: "cannot pursue beyond" quotes nothing the user typed
[reskin] lacks refused: "does not step" quotes nothing the user typed
[reskin] lacks refused: "does not chase" quotes nothing the user typed
[reskin] lacks refused: "does not yield" quotes nothing the user typed
[reskin] clauses: "a warden of the fold" -> has (descriptive), head | "shields the flock" -> has (mechanical) | "never leaves the gate" -> LACKS (mechanical)
[reskin] signature idea (action): "The warden slams its body down and drives its horns into the ground, becoming a living gate that seals the passage it stands in. Until combat ends or it is destroyed, it does not move from that spot and any enemy trying to slip past it through the space it guards is hooked by the ribbed barricade, dragged back to the threshold, and pinned there beside the warden. The warden can only raise this sea" [action/once_per_fight/movement] — menu: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (shield, flock)
[reskin] word match declined by the call: hook-rider, seal, obstacle-pull, push-prone — the key word does not mean the mechanic here
[reskin] key match declined: action — "rally" was ranked first on the call's own menu for shield+flock, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: action — "The warden slams its body down and drives its horns into the ground, becoming a living gate that seals the passage it stands in. Until combat ends or it is destroyed, it does not move from that spot and any enemy trying to slip past it through the space it guards is hooked by the ribbed barricade, dragged back to the threshold, and pinned there beside the warden. The warden can only raise this sea" [action/once_per_fight/movement] — the model found no template that holds it (offered: rally, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, hook-rider)
[reskin] fallback respects the call: rally, push-prone left the shelf — the call declined them for this sheet
[reskin] value check: "Answering Sting" EV 5.5 vs floor 4.1 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "Bone plates and ribbed horn grow over the warden's hide in layered slabs, and each time something wounds it the cracked pieces keep working: any enemy standing next to the warden when it is bloodied finds the barricade's jagged edges grinding against them, costing them the sure footing they need to escape or strike cleanly." [trait/on_being_hit/condition] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — bound (never leaves, warden of)
[reskin] word match declined by the call: bound, aberrant-ground, heated-body, uncanny-sense, weapon-lodge — the key word does not mean the mechanic here
[reskin] trait declined: "Shattered Bastion" — bound only on the idea's own words (bloodied:idea, wounded:idea, crack:idea) with no key in the concept; a meat body earns its trait by the user's verb (the sniper's tracker, critic 2026-09-29)
[reskin] concept-first trait skipped: bound — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] repair: 1 clause(s) with no row — "shields the flock"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Gore = none; Trampling Charge = none
audit finding below confidence gate: Answering Sting The trigger requires tracking every creature that hit the warden over an entire round with no way to mark or track it in combat, making the bonus action unresolvable in ~10 seconds.
```


---

## Stormcore Detonant — highest CR

**Concept:** a thunder elemental that detonates once per fight in a ring of concussive force

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Stormcore Detonant | 15 | brute-13 | ok | FAIL: hot | ok | ok | ok | ok | ok | ok | ok |

- bands · soft · band: reads CR 18.5 (print at 15 reads 6.5–17.5, n=12)
- bands · fail · hot: reads CR 18.5, more than three over
- bands · soft · hot-offense: offense alone reads CR 20, 5 over; the HP axis pulls the read to 18.5
- **dropped clause:** "detonates once per fight in a ring of concussive force"
- read: def 17 / off 20 → 18.5; sustained 84 (2 × Thunderous Slam); nova Whirlwind 71; dmg 123

```
Stormcore Detonant

Large Elemental, Neutral

AC 17
Initiative +5 (15)

HP 262 (35d10 + 70)

Speed 10 ft., Fly 90 ft.

MOD
SAVE
STR
22
+6
+11
INT
6
-2
-2
MOD
SAVE
DEX
20
+5
+5
WIS
10
+0
+0
MOD
SAVE
CON
14
+2
+7
CHA
6
-2
-2

Skills Athletics +11, Perception +5

Resistances Bludgeoning, Lightning, Piercing, Slashing

Immunities Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious

Senses darkvision 60 ft.; Passive Perception 15

Languages Primordial (Auran)

CR 15 (XP 13,000; PB +5)

Traits

Air Form. The detonant can enter a creature's space and stop there. It can move through a space as narrow as 1 inch without expending extra movement to do so.

Actions

Multiattack. The detonant makes two Thunderous Slam attacks.

Thunderous Slam. Melee Attack Roll: +11, reach 10 ft. 42 (8d8 + 6) Thunder damage.

Whirlwind (Recharge 4-6). Constitution Saving Throw: DC 18, each creature in a 30-foot Cone. Failure: 71 (13d10) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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
- Actions/Thunderous Slam — print's row, renamed
- Actions/Whirlwind — print's own row
- Traits/Air Form — print's own row

**Engine trace**

```
[route] brute-juggernaut type=Elemental mechanics=none — brute-juggernaut: ✓ ("a thunder elemental that detonates once ") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] resolve: archetype=brute type=Elemental themes=elemental/forged mind=mindless style=juggernaut energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: detonates in a ring of concussive force [behavior] | body of bound storm-stone [body]
[concept] identity: The storm-forged thunder elemental opens by advancing directly toward the densest cluster of enemies, its ringed arms rotating like a generator. Every round it slams with concussive fists, building a rising hum until it detonates in a ring of thunderous force that scours everything around it; after detonation it staggers but never flees, fighting until destroyed.
[concept] lore: Forged in the heart of a perpetual storm by elemental lords who bound lightning into stone, it seeks only to discharge the unbearable pressure building within its core.
[reskin] print canon route: the Air Elemental's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon array: STR 22, DEX 20, CON 14, INT 6, WIS 10, CHA 6 — the Air Elemental's, STR fitted to +11
[reskin] donor: brute-13 -> CR 15 (invented — no printed peer)
[reskin] print canon: "a thunder elemental that detonates once per fight in a ring of concussive force" heads on the Air Elemental — print's rows ride along; the seat stays
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] name_element answered: Thunderfist = literal; Stormburst = literal; Stormcore Detonant = literal
[reskin] inline declared: "the detonant" — the call's own answer (kind), built from the name
[reskin] inline form: "the detonant" — the model's own reading of the name
[reskin] energy rider kept by the row's name: "Thunderfist" promises Thunder, so the rider stands on a Humanoid the concept never called thunder
[reskin] energy rider kept by the row's name: "Stormburst" promises Thunder, so the rider stands on a Humanoid the concept never called thunder
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a thunder elemental" -> has (descriptive), head | "detonates once per fight in a ring of concussive force" -> has (mechanical)
[reskin] menu pruned: action — thrown-burst-seed (the sheet cannot render them)
[reskin] signature idea (action): "When the detonant is surrounded or its core pressure peaks, it slams its fists and discharges a lingering collar of thunder that settles over the area around it. Enemies caught in that ring keep shaking from the aftershock; if they try to move out of it before the hum dies, the collar snaps and hurls them to the ground." [action/always/movement] — menu: condition-payoff, shield-bash, escalating-dread, terror-pulse, push-prone, herd, drain, exploiter (+ shelf: second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] word match declined by the call: condition-payoff, exploiter, shield-bash, escalating-dread, terror-pulse, herd, drain — the key word does not mean the mechanic here
[reskin] fit declined: "Thunder Collar" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] fallback respects the call: condition-payoff, escalating-dread, terror-pulse, herd, exploiter left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a thunder elemental that detonates once per fight in a ring of concussive force" heads on the Air Elemental and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 5.9 vs floor 22.4 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "Its ringed arms never stop spinning, and the rising hum grows louder with every concussive blow it lands. When the hum crests, the detonant can unleash its Stormburst immediately instead of waiting for its body to recharge." [trait/always/resource] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — death-burst, bloodied-burst, resonant-body (detonate, ring)
[reskin] key match declined: trait — "death-burst" was ranked first on the call's own menu for detonate, and the call read it as no fit; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Its ringed arms never stop spinning, and the rising hum grows louder with every concussive blow it lands. When the hum crests, the detonant can unleash its Stormburst immediately instead of waiting for its body to recharge." [trait/always/resource] — the model found no template that holds it (offered: death-burst, bloodied-burst, resonant-body, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] repair: 1 clause(s) with no row — "detonates once per fight in a ring of concussive force"; one targeted call with the sheet as context
[reskin] repair: the answer held no rows — the clauses stay unplaced
[reskin] weapons answered: Thunderfist = none; Stormburst = none; Pressure Vent = none
[reskin] chassis nova: "Stormburst (Recharge 5-6)" — the brute-13's own nova row (its "Area Nova", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] speed by concept: added Fly 40 ft. — the concept's movement set decides
[reskin] print canon size: Huge -> Large — the Air Elemental's
[reskin] print canon languages: "None" -> "Primordial (Auran)" — the Air Elemental's
[reskin] print canon speed: 40 ft. -> 10 ft. — the Air Elemental's walk; the concept's other modes stay
[reskin] print canon speed: Fly -> 90 ft. — the Air Elemental's own
[reskin] print canon attack: "Thunderfist" -> "Thunderous Slam" — the Air Elemental's own row
[reskin] immunities stamped for type: Elemental -> Poison; Exhaustion, Poisoned
[reskin] print canon defenses: immunities Poison; Exhaustion, Poisoned -> Poison, Thunder; Exhaustion, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Unconscious; resistances none -> Bludgeoning, Lightning, Piercing, Slashing — the Air Elemental's own header lines
[reskin] print canon trait: Air Form — "a thunder elemental that detonates once per fight in a ring of concussive force" is the Air Elemental (print's own row)
[reskin] print canon nova: "Stormburst (Recharge 5-6)" -> "Whirlwind (Recharge 4-6)" — one breath: the chassis nova at this sheet's CR carries the Air Elemental's name; print's own row stays out
```


---

## Dirge Swarm — a 2024 sheet

**Concept:** a swarm of funeral bells that ring themselves over the dying

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Dirge Swarm | 13 | swarm-9 | ok | SOFT: hot-offense | ok | ok | ok | ok | ok | ok | FAIL: alignment-fit |

- bands · soft · hot-offense: offense alone reads CR 17, 4 over; the HP axis pulls the read to 13.5
- reader · fail · alignment-fit: Unaligned on a Swarm of Tiny Constructs with INT 4 that speaks Understands the languages of its creator but can't speak — Unaligned is for a creature with no capacity for ethics
- **dropped clause:** "ring themselves over the dying"
- read: def 10 / off 17 → 13.5; sustained 90 (1 × Tolling); nova Cathedral Knell 67; dmg 105

```
Dirge Swarm

Medium Swarm of Tiny Constructs, Unaligned

AC 15
Initiative +5 (15)

HP 187 (22d8 + 88)

Speed 30 ft.

MOD
SAVE
STR
8
-1
-1
INT
4
-3
-3
MOD
SAVE
DEX
20
+5
+5
WIS
10
+0
+0
MOD
SAVE
CON
18
+4
+4
CHA
2
-4
-4

Resistances Bludgeoning, Piercing, Slashing

Immunities Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned

Senses blindsight 60 ft.; Passive Perception 10

Languages Understands the languages of its creator but can't speak

CR 13 (XP 10,000; PB +5)

Traits

Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain Hit Points or gain Temporary Hit Points.

Actions

Tolling. Melee Attack Roll: +10, reach 5 ft. 90 (19d8 + 5) Bludgeoning damage, or 45 (13d6) Bludgeoning damage if the swarm is Bloodied.

Cathedral Knell (Recharge 5-6). Constitution Saving Throw: DC 17, each creature in a 30-foot Emanation originating from the swarm. Failure: 67 (15d8) Thunder damage, and the target has the Deafened condition until the end of its next turn. Success: Half damage only.

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

- Traits/Swarm — the chassis
- Actions/Tolling — the chassis
- Actions/Cathedral Knell — template active-toll; library draw (seed unstamped); binds the GM's words: ring+bell+peal+deafen+knell

**Engine trace**

```
[route] swarm type=Construct mechanics=aura — swarm: ✓ ("a swarm of funeral bells") | swarm: no line key in the words — the model's read of its quote
[concept] hints: swarm→body ✓ ("swarm of funeral bells")
[concept] resolve: archetype=swarm type=Construct themes=forged/grave mind=mindless style=— energy=Thunder mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: funeral bells that ring themselves [body] | swarm that engulfs and tolls over the dying [behavior] | deafening knell that disorients [aura]
[concept] identity: The swarm drifts in as a tide of clappers and iron tongues, then fixes on the dying and rings itself into a suffocating corona of tolling. Every round it engulfs and bludgeons prey in a bronze-and-peal blender, and any creature that drops becomes a chord it must finish: it does not flee when bloodied, it only rings harder.
[concept] lore: Forged in cathedral bellfry fires, these unringable bells escaped when their tower fell; they seek out the dying to play a death-knell only they can hear, and they will not stop until every last breath has been tolled.
[reskin] body type: swarm — the body outranks the role (recorded: swarm)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] swarm type stamped: Construct -> Swarm of Tiny Constructs
[reskin] inline declared: "the swarm" — the call's own answer (kind), built from the name
[reskin] inline form: "the swarm" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "no magic at all" quotes nothing the user typed
[reskin] lacks refused: "no voice" quotes nothing the user typed
[reskin] lacks refused: "unringable" quotes nothing the user typed
[reskin] clauses: "a swarm of funeral bells" -> has (descriptive), head | "ring themselves over the dying" -> has (descriptive)
[reskin] extraction: 2 of 4 model clauses quote nothing the user typed and leave the record ("does not flee when bloodied", "only rings harder")
[reskin] menu pruned: action — obstacle-pull, pacify, escalating-dread, terror-pulse, snare-bolt, slow-bolt, sensory-strike, disarm, thrown-burst-seed, drain, zone-seed, blighted-ground, delayed-brand, aggro-curse, self-invisibility, focus, feint-slip, coating, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The Dirge Swarm rings its collective body into a single, catastrophic knell that rolls outward like a collapsing cathedral. Every creature caught in the peal is staggered and deafened, while the dying are marked by a resonant hum that the swarm can feel and follow, ensuring no last breath goes unheard." [action/save/damage] — menu: trample, thrown-burst, gaze-single, snare, execute, seal, shield-bash, wail, lure, active-toll, random-ray, ground-burst, spew (+ shelf: patient-defense, second-wind, riposte, stunning-strike, charge-push, hook-rider, pounce, isolation, charge)
[reskin] signature bound to the concept's verb: action — active-toll (ring, bell)
[reskin] word match declined by the call: wail — the key word does not mean the mechanic here
[reskin] value check: "Cathedral Knell (Recharge 5-6)" EV 240.1 vs floor 76.1 (the whole Multiattack (1 attacks)) — worth the trade
[reskin] signature template: active-toll -> Actions/"Cathedral Knell (Recharge 5-6)" ("The swarm rings a knell that rolls outward as a peal; every creature in the eman [verb: ring:concept, bell:concept, peal:idea, deafen:idea, knell:idea]")
[reskin] keys spent by the action: ring
[reskin] signature idea (trait): "Any creature reduced to zero hit points within the swarm's hearing becomes a sounding anchor: the bells nearest to it begin to toll its death in a private chord, granting the swarm a greater hunger and purpose. Until that creature's spark is fully extinguished or it is saved, the swarm's attacks against it carry an extra, awful resonance." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (bell, dying, the dying)
[reskin] word match declined by the call: death-burst, resonant-body, bloodied-burst, false-appearance — the key word does not mean the mechanic here
[reskin] key match declined: trait — "bloodied-burst" was ranked first on the call's own menu for bell+dying+the dying, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "Any creature reduced to zero hit points within the swarm's hearing becomes a sounding anchor: the bells nearest to it begin to toll its death in a private chord, granting the swarm a greater hunger and purpose. Until that creature's spark is fully extinguished or it is saved, the swarm's attacks against it carry an extra, awful resonance." [trait/always/damage] — the model found no template that holds it (offered: bloodied-burst, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, resonant-body)
[reskin] concept-first trait skipped: bloodied-burst — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] concept-first trait skipped: resonant-body — the call read its match as a collision (the word is a modifier, or the sheet already answers it)
[reskin] weapons answered: Tolling = none
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Understands the languages of its creator but can't speak" (mindless)
[reskin] immunities stamped for type: Swarm of Tiny Constructs + donor suite -> Poison; Charmed, Exhaustion, Frightened, Grappled, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] bloodied half re-derived: "Tolling" — 14 -> 45, half of the main 90 (print's ratio on all seven swarms)
[reskin] nova capped: Actions/Cathedral Knell (Recharge 5-6) — 91 over the CR 13 ceiling 67, dice to 67 (15d8)
```


---

## Altarstone Warden — a print donor

**Concept:** a reliquary golem that cracks open when wounded and floods the vault with holy fire

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Altarstone Warden | 11 | brute-9 | ok | ok | ok | ok | ok | ok | SOFT: print-rows | ok | ok |

- donor · soft · print-rows: rows outside print, the named seat and the keyed seeds: Traits/Magic Resistance
- read: def 10 / off 11 → 10.5; sustained 66 (2 × Slam); nova none; dmg 66

```
Altarstone Warden

Large Construct, Unaligned

AC 18
Initiative -1 (9)

HP 220 (21d10 + 105)

Speed 30 ft.

MOD
SAVE
STR
22
+6
+10
INT
3
-4
-4
MOD
SAVE
DEX
9
-1
-1
WIS
11
+0
+0
MOD
SAVE
CON
20
+5
+9
CHA
1
-5
-5

Skills Athletics +10, Perception +4

Resistances Fire

Immunities Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses darkvision 60 ft., tremorsense 30 ft.; Passive Perception 14

Languages Understands Common plus two other languages but can't speak

CR 11 (XP 7,200; PB +4)

Traits

Martyr's Embers. A creature that touches the warden or hits it with a melee attack while within 5 feet of it takes 10 (3d6) Fire damage.

Immutable Form. The warden can't shape-shift.

Magic Resistance. The warden has Advantage on saving throws against spells and other magical effects.

Actions

Multiattack. The warden makes two attacks, using Slam or Force Bolt in any combination.

Slam. Melee Attack Roll: +10, reach 5 ft. 24 (4d8 + 6) Bludgeoning damage plus 9 (2d8) Force damage.

Force Bolt. Ranged Attack Roll: +10, range 120 ft. 33 (6d8 + 6) Force damage.

Bonus Actions

Guardian's Pursuit (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the warden moves up to its Speed without provoking Opportunity Attacks, and it makes one Slam attack.

Slow (Recharge 5-6). The warden casts the Slow spell, requiring no spell components and using Constitution as the spellcasting ability (spell save DC 17).

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
- Actions/Slam — print's row, renamed
- Actions/Force Bolt — print's own row, renamed; weapon crossbow
- Bonus Actions/Guardian's Pursuit — library seed rampage; binds the GM's words: wound
- Bonus Actions/Slow — print's own row
- Traits/Martyr's Embers — template heated-body; library draw (seed unstamped); binds the GM's words: fire+heat+sear+flame
- Traits/Immutable Form — print's own row
- Traits/Magic Resistance — the chassis

**Engine trace**

```
[route] brute-juggernaut type=Construct mechanics=aura — brute-juggernaut: ✓ ("a reliquary golem") | brute-juggernaut: no line key in the words — the model's read of its quote
[concept] hints: golem→canon ✓ ("concept names it 'reliquary golem'")
[concept] resolve: archetype=brute type=Construct themes=forged/grave mind=mindless style=juggernaut energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: aura
[concept] signature elements: cracks open when wounded to release holy fire [behavior] | body of consecrated stone and relic fragments [body]
[concept] identity: The reliquary golem advances like a siege engine, methodically closing to deliver crushing blows from its consecrated stone fists. Each wound it suffers deepens the cracks in its shell, and at the start of its next turn it unleashes a torrent of holy fire from within, flooding the vault and scouring all in a radius. Under pressure it fights to the death, its purpose absolute: to ensure the relics it guards are never taken, even if it must immolate itself to do so.
[concept] lore: Forged from shattered altar stones and sealed with the ashes of martyrs, a reliquary golem stands eternal watch over vaults of divine relics, its holy fire reserved for those who would defile them.
[reskin] print canon route: the Stone Golem's body outranks the juggernaut seat — no verb in the words names it; the plain brute line
[reskin] print canon defenses: HP 198 -> 220, AC 15 -> 18 — the Stone Golem's at its own CR (a kobold sat at 21 HP where print is 7, critic form-ten 2026-10-01)
[reskin] print canon array: STR 22, DEX 9, CON 20, INT 3, WIS 11, CHA 1 — the Stone Golem's at its own CR; attack +9 -> +10, DC 17 (print's)
[reskin] donor: brute-9 -> CR 11
[reskin] print canon: "a reliquary golem that cracks open when wounded and floods the vault with holy fire" heads on the Stone Golem — print's rows ride along; the seat stays
[reskin] inline declared: "the warden" — the call's own answer (kind), built from the name
[reskin] inline form: "the warden" — the model's own reading of the name
[reskin] save dc derived: DC 16 -> 18 (8 + PB 4 + the sheet's best 6) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a reliquary golem" -> has (descriptive), head | "cracks open when wounded" -> has (mechanical) | "floods the vault with holy fire" -> has (mechanical)
[reskin] signature idea (action): "When the warden takes a wound from a blow or bolt, its shell splits further and its inner fire builds. At the start of its next turn, every crack opens at once and holy fire roars out of the reliquary in a spreading blast, scouring everything around it. The more wounds it has taken since last it vented, the wider and hotter the flood; then the pressure drops and the count begins again." [trait/start_of_turn/damage] — menu: fire-aura, warded-mending (+ shelf: trample, leap, thrown-burst, throw-retrieve, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, rampage, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, charge)
[reskin] signature bound to the concept's verb: action — affliction, rampage, riposte (wound, opening)
[reskin] fit declined: "Cracked Reliquary (Recharge 5-6)" — a print body takes only what the user's words ask; neither the call nor the key table finds the GM asking for it (the blacksmith's rally, critic-ten 2026-10-01)
[reskin] value check: "Rampage (1/Day)" EV 33 vs floor 6.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The warden's body is consecrated stone mortared with martyr ash, and its wounds let that holiness out. Anything that strikes it in melee and draws fire from the cracks is seared by the escaping flame, and the fragments clinging to its fists carry that same holy heat into every blow it lands." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst)
[reskin] signature bound to the concept's verb: trait — bloodied-burst (wounded, crack)
[reskin] word match declined by the call: bloodied-burst, adhesive, terrain-walk, fire-aura, warded-mending, absorption, resonant-body, weapon-lodge — the key word does not mean the mechanic here
[reskin] signature template (trait): heated-body -> Traits/"Martyr's Embers" ("The warden's wounds let consecrated flame escape, searing anything that strikes  [verb: fire:concept, heat:idea, sear:idea, flame:idea]")
[reskin] weapons answered: Fist = none; Stone Bolt = none; Cracked Pyre = none
[reskin] weapon table: "Stone Bolt" rolls Dexterity — +10 → +3
[reskin] weapon table: "Stone Bolt" damage off Dexterity — 33 (6d8 + 6) → 26 (6d8 - 1)
[reskin] weapon table: "Stone Bolt" — a launcher, never thrown, range 80/320
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] print canon size: Huge -> Large — the Stone Golem's
[reskin] print canon alignment: Lawful Neutral -> Unaligned — the Stone Golem's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Understands the languages of its creator but can't speak" -> "Understands Common plus two other languages but can't speak" — the Stone Golem's
[reskin] print canon speed: 40 ft. -> 30 ft. — the Stone Golem's walk; the concept's other modes stay
[reskin] print canon attack: "Fist" -> "Slam" — the Stone Golem's own row
[reskin] print canon attack: "Force Bolt" rolls print's +10 with +6 damage — a print row stands outside the weapon table
[reskin] print canon attack: "Stone Bolt" -> "Force Bolt" — the Stone Golem's own ranged row
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] print canon defenses: immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned -> Poison, Psychic; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned — the Stone Golem's own header lines
[reskin] resistances derived: Fire
[reskin] name-canon trait stamped: Immutable Form (the name says so; print says what it does)
[reskin] name-canon trait stamped: Magic Resistance (the name says so; print says what it does)
[reskin] print canon trait: Immutable Form — print's text replaces the chassis's (the Troll regenerates 15, not the chassis's 10 — critic's audit 2026-10-02)
[reskin] print canon row: Bonus Actions/Slow (Recharge 5-6) — the Stone Golem's own
[reskin] vulnerability rejected — "Cold" has no warrant in the concept's own text (print's default is none)
[reskin] audit rename: "Rampage (1/Day)" -> "Guardian's Pursuit (1/Day)"
[reskin] audit rename blocked — "Slow (Recharge 5-6)" is the user's own part name, a feature's real name, or print's own row
```


---

## Plaguecarrion Mote — a homebrew with a nova

**Concept:** a plague-bloated corpse-carrier that bursts in a cloud of flies when it dies

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Plaguecarrion Mote | 8 | skirmisher-8-winged | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 9 → 7; sustained 45 (3 × Talon); nova Swooping Pass 44; dmg 59

```
Plaguecarrion Mote

Medium Undead, Neutral

AC 17
Initiative +5 (15)

HP 120 (16d8 + 48)

Speed 40 ft., Fly 70 ft.

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
+8
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
10
+0
+0

Skills Perception +5, Stealth +8

Immunities Poison; Exhaustion, Poisoned

Senses darkvision 60 ft.; Passive Perception 15

Languages None

CR 8 (XP 3,900; PB +3)

Traits

Carrion Hive Rupture. The first time the mote is Bloodied in a fight, it releases a burst. Constitution Saving Throw: DC 16, each creature in a 15-foot Emanation originating from the mote. Failure: 14 (4d6) Poison damage, and the target has the Poisoned condition until the end of its next turn. Success: Half damage only.

Wing Drift. The mote doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.

Actions

Multiattack. The mote makes three Talon attacks.

Talon. Melee Attack Roll: +8, reach 5 ft. 9 (1d8 + 5) Slashing damage plus 6 (1d12) Poison damage. If the mote flew at least 20 feet in a straight line toward the target immediately before the hit, the target takes an extra 5 (1d10) Slashing damage and, if it is Large or smaller, has the Prone condition. If the target is a creature, it is subjected to the following effect. Constitution Saving Throw: DC 16. Failure: The target has the Poisoned condition. While Poisoned this way, the target can't regain Hit Points. The condition lasts until the target finishes a Long Rest or is cured by the Lesser Restoration spell or similar magic.

Swooping Pass (Recharge 5-6). The mote flies up to its Speed without provoking Opportunity Attacks. Each creature it passes within 5 feet during this movement is targeted once by the following effect. Strength Saving Throw: DC 16. Failure: 44 (8d10) Poison damage, and the target has the Prone condition. Success: Half damage only.

Bonus Actions

Aerial Agility. The mote takes the Dash or Disengage action.

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

- Traits/Carrion Hive Rupture — template bloodied-burst; library draw (seed unstamped); binds the GM's words: burst+bloodied
- Traits/Wing Drift — the chassis
- Actions/Multiattack — the chassis
- Actions/Talon — binds the GM's words: plague+plagued
- Actions/Swooping Pass — the chassis
- Bonus Actions/Aerial Agility — the chassis

**Engine trace**

```
[route] skirmisher-winged type=Undead mechanics=none — brute-grappler: ✓ ("plague-bloated corpse-carrier") | brute-grappler -> skirmisher-winged: the concept's VERB outranks the noun (key "flies", class verb) | skirmisher-winged: key "flies" (class verb)
[concept] name: provided_name rejected — "a plague-bloated corpse-carrier that bur…" is the description, not a name
[concept] hints: winged→style ✓ ("cloud of flies")
[concept] resolve: archetype=skirmisher type=Undead themes=grave/aerial mind=bestial style=winged energy=Poison mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: snatching and dropping prey from the air [behavior] | bloated, fly-ridden corpse body [body] | bursting into a cloud of flies upon death [behavior]
[concept] identity: A bloated, fly-blown corpse that patrols the sky on ragged, buzzing wings, it opens with a swooping dive to snatch a single victim and carry them aloft. Each round thereafter it drops its prey from height, then regains altitude to repeat the maneuver, its body swelling with every kill. When bloodied, it does not flee but spirals downward to burst deliberately, engulfing its tormentors in a plague of flies.
[concept] lore: A plague-bloated corpse-carrier is the final molt of a battlefield scavenger that fed too long on plague victims, its body now a living hive that seeks to spread its swarm to fresh flesh.
[reskin] nova capped: "Diving Attack" 49 → 44 (the chassis nova obeys the cap: 44 at CR 8)
[reskin] donor: skirmisher-8-winged -> CR 8 (invented — no printed peer)
[reskin] ranged row off: Ranged Attack — this body is not a thrower, a caster, artillery, or a giant, and the concept claims no ranged mode (print: a claw-and-bite body has no ranged row)
[reskin] inline declared: "the mote" — the call's own answer (kind), built from the name
[reskin] inline form: "the mote" — the model's own reading of the name
[reskin] save dc derived: DC 15 -> 16 (8 + PB 3 + the sheet's best 5) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a plague-bloated corpse-carrier" -> has (descriptive), head | "bursts in a cloud of flies when it dies" -> has (mechanical)
[reskin] menu pruned: action — thrown-burst-seed, phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the mote is bloodied, it stops fighting and spirals down to the ground, crashing and bursting open early. This eruption wakes its hive: a buzzing cloud tears free of the corpse and chases the creature that struck the blow which bloodied it, clinging to that one victim and only that one. The cloud harries that victim steadily for the rest of the fight, biting and blinding, and drifts with them" [action/once_per_fight/damage] — menu: condition-payoff, shield-bash, lure, snare-bolt, sensory-strike, disarm, exploiter, zone-seed (+ shelf: delayed-brand, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, riposte, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation)
[reskin] signature bound to the concept's verb: action — contagion (plague, plagued)
[reskin] signature rider: contagion -> Talon (appended; The cloud tears free and chases the one creature that bloodied the mote, clingin [verb: plague:concept, plagued:concept])
[reskin] signature idea (trait): "The hive inside the mote is always awake, and the swarm leaks from its bloated seams and torn belly. Flies pour off the body constantly, so anything that strikes it in melee or grapples it gets a faceful of biting, diseased insects. The more it has fed on living blood, the fouler and more aggressive this leakage becomes." [trait/on_being_hit/damage] — menu: heated-body, absorption, bloodied-burst, resonant-body (+ shelf: adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, fire-aura, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst)
[reskin] signature bound to the concept's verb: trait — death-burst (burst, die)
[reskin] word match declined by the call: heated-body, death-burst — the key word does not mean the mechanic here
[reskin] signature template (trait): bloodied-burst -> Traits/"Carrion Hive Rupture" ("The hive inside the mote is always awake; the more it has fed, the fouler and ag [verb: burst:concept, bloodied:idea]")
[reskin] weapons answered: Talon = none; Swoop Snatch = none
[reskin] chassis nova: "Swoop Snatch (Recharge 5-6)" — the skirmisher-8-winged's own nova row (its "Diving Attack", renamed by the model); geometry, cap and rider lines below are its edits
[reskin] immunities stamped for type: Undead -> Poison; Exhaustion, Poisoned
audit finding below confidence gate: Carrion Hive Rupture The block grants immunity to Poisoned to the mote itself but does not clarify how this condition applies to other creatures or whether the mote is unaffected due to immunity; no external creation of the condition is defined.
[reskin] audit rename: "Swoop Snatch (Recharge 5-6)" -> "Swooping Pass (Recharge 5-6)"
```


---

## Bog Cauldron — in the run

**Concept:** a bog witch's iron cauldron that vents scalding steam over whatever climbs in

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Bog Cauldron | 9 | brute-8-grappler | ok | ok | ok | ok | ok | ok | ok | ok | FAIL: engine-needs-key, engine-needs-key |

- reader · fail · engine-needs-key: Actions/Boiling Ladle: a grapple or engulf engine with no key in the words
- reader · fail · engine-needs-key: Bonus Actions/Swallow: a grapple or engulf engine with no key in the words
- read: def 7 / off 9 → 8; sustained 62 (2 × Boiling Ladle); nova none; dmg 62

```
Bog Cauldron

Large Construct, Unaligned

AC 15
Initiative -1 (9)

HP 161 (19d10 + 57)

Speed 40 ft.

MOD
SAVE
STR
18
+4
+8
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
12
+1
+1
MOD
SAVE
CON
17
+3
+7
CHA
6
-2
-2

Skills Athletics +8, Perception +5

Resistances Fire

Immunities Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned

Senses blindsight 30 ft., darkvision 60 ft.; Passive Perception 15

Languages Understands the languages of its creator but can't speak

CR 9 (XP 5,000; PB +4)

Traits

Scalding Touch. A creature that touches the bog cauldron or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Fire damage.

Actions

Multiattack. The bog cauldron makes two Boiling Ladle attacks.

Boiling Ladle. Melee Attack Roll: +8, reach 10 ft. 18 (4d6 + 4) Bludgeoning damage plus 13 (3d8) Fire damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 16). While Grappled, the target has the Restrained condition.

Bonus Actions

Swallow. The bog cauldron swallows one Medium or smaller creature it is grappling. While swallowed, the target has the Blinded and Restrained conditions, has Total Cover against attacks and other effects outside the bog cauldron, and takes 10 (3d6) Fire damage at the start of each of the bog cauldron's turns. The bog cauldron can have only one creature swallowed at a time. If the bog cauldron takes 25 damage or more on a single turn from the swallowed creature, the bog cauldron must regurgitate the target at the end of that turn, and the target exits Prone in an unoccupied space within 10 feet of the bog cauldron. If the bog cauldron dies, a swallowed creature exits the body Prone by using 10 feet of movement.

Cauldron Overflow (2/Day). The bog cauldron fills a 15-foot-radius Sphere centered on a point it can see within 60 feet. The area is Lightly Obscured and Difficult Terrain until the start of the bog cauldron's next turn.

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
- Actions/Boiling Ladle — the chassis
- Bonus Actions/Swallow — binds the GM's words: swallow+swallows+engulf+engulfs+devour+devours+gulp+smother+entomb+cocoon+whelm
- Bonus Actions/Cauldron Overflow — library seed zone-seed; binds the GM's words: steam
- Traits/Scalding Touch — template heated-body; library draw (seed unstamped); binds the GM's words: scald+iron+heat+burn+touch

**Engine trace**

```
[route] brute-grappler type=Construct mechanics=grapple, engulf, breath — brute-juggernaut: ✓ ("a bog witch's iron cauldron") | brute-juggernaut -> brute-grappler: the concept's VERB outranks the noun (key "climbs in", class verb) | brute-grappler: key "climbs in" (class verb)
[concept] name: provided_name rejected — "iron cauldron that vents scalding steam …" is the description, not a name
[concept] hints: binder→style ✗ ("the cauldron is the witch's object, not ")
[concept] resolve: archetype=brute type=Construct themes=forged/devouring mind=mindless style=grappler energy=Fire mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: grapple, engulf, breath
[concept] signature elements: hauling prey into its bowl [behavior] | scalding steam vented over the contents [body] | lidded iron cauldron body [object]
[concept] identity: The Iron Cauldron fights by laying a corridor of scald-wreathed iron along the ground, then letting the fight come to it: anything that presses within reach is seized by cauldron hooks and hauled into the bowl. Once a victim is inside, the cauldron packs it down and seals it under a lid of rolling steam, venting scalding breath over the contents each round until the shape stops moving. It does not pursue or flee; it is a siege object that treats the battlefield as a pot to be filled, and fights to the death with boiler-patience.
[concept] lore: Left to rust on a witch's hearth, the iron cauldron drank the flesh and breath of everything she discarded, and now it lumbers the bog seeking more warmth to hold.
[reskin] donor: brute-8-grappler -> CR 9
[reskin] name_element answered: Scald-Sluice = imagery; Steam Seal = literal
[reskin] name element refused: "Scald-Sluice" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] name_element answered: Scald-Sluice = imagery; Steam Seal = literal
[reskin] name element refused: "Scald-Sluice" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] inline declared: "the bog cauldron" — the call's own answer (kind), built from the name
[reskin] inline form: "the bog cauldron" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] lacks refused: "does not pursue" quotes nothing the user typed
[reskin] lacks refused: "does not flee" quotes nothing the user typed
[reskin] clauses: "a bog witch's iron cauldron" -> has (descriptive), head | "vents scalding steam over whatever climbs in" -> has (descriptive)
[reskin] signature idea (action): "The cauldron claps its lid down and cooks — this is a slow, grinding reprise of the swallowing already done, made crueler by the fact that it cannot be interrupted: it simply keeps cooking whatever it holds and vents the scalding steam that has built up inside it over everything immediately around it, friend or foe alike, since the bog does not care whose flesh tenderizes. The steam pours from eve" [action/always/damage] — menu: condition-payoff, shield-bash, active-toll, random-ray, ground-burst, spew, escalating-dread, terror-pulse, push-prone, herd, thrown-burst-seed, drain, wind-up, exploiter, zone-seed (+ shelf: leap, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, focus, coating, stunning-strike, charge-push, hook-rider, pounce)
[reskin] signature bound to the concept's verb: action — zone-seed (steam)
[reskin] nova declined: "Lidclap Vent (Recharge 5-6)" — a whole-round ability the GM never asked for: neither the call nor the key table finds the GM asking for it (the idea's own words: around it:idea); the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] fallback floor waived: zone-seed — a self-buff the user's words ask for is its own worth (print: the Imp's Invisibility)
[reskin] value check: "Clinging Murk (2/Day)" EV 0 vs floor 54.1 (the whole Multiattack (2 attacks)) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] library seed drawn: zone-seed -> Actions/"Clinging Murk (2/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The cauldron's belly is always at a rolling boil, and the steam that leaks from its seam does not stop — anything that comes into contact with the iron, whether it grabs on, climbs in, or is pulled close, gets a face full of scalding vapor that keeps burning as long as it stays in contact. The heat clings to whatever it touches, so the cauldron's own hooks and hull are as dangerous to hold as they" [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, noxious-aura, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, undead-fortitude, mimicry, truth-aura, gaze-aura, death-burst (+ shelf: heated-body, absorption, bloodied-burst, resonant-body, fire-aura, warded-mending, weapon-lodge)
[reskin] signature bound to the concept's verb: trait — heated-body (scald, iron)
[reskin] signature template (trait): heated-body -> Traits/"Boiling Hull" ("The cauldron's searing iron and leaking scalding vapor punish anything that touc [verb: scald:concept, iron:concept, heat:idea, burn:idea, touch:idea]")
[reskin] weapons answered: Scald-Sluice = none
[reskin] languages by body: a trap-line Construct with no voice in the concept
[reskin] immunities stamped for type: Construct -> Poison; Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned
[reskin] resistances derived: Fire
[reskin] dead control row: "Clinging Murk (2/Day)" moves to Bonus Actions — no damage, no save, no KO condition
[reskin] audit rename: "Boiling Hull" -> "Scalding Touch"
[reskin] audit rename: "Scald-Sluice" -> "Boiling Ladle"
[reskin] audit rename: "Clinging Murk (2/Day)" -> "Cauldron Overflow (2/Day)"
```
