# Review batch — branch-holds-2026-10-16T09-38-31

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

## Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vareth Solmane | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/5 |
| Brother Aldren Vosch | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/1 |
| Voice-Thief of the Gallows Rookery | 3 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/6 |
| Templar of the Unmoved Stone | 4 | 2024 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/3 |
| Umbral Assassin | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 2/2 | 1/7 |

**Dropped 0 of 8 user clauses** (coverage 100%); concept share 55% (12/22 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- none



---

## Voice-Thief of the Gallows Rookery — lowest CR

**Concept:** a kenku thief who speaks only in stolen voices

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Voice-Thief of the Gallows Rookery | 3 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 1 / off 3 → 2; sustained 24 (2 × Dagger); nova none; dmg 24

```
Voice-Thief of the Gallows Rookery

Medium Humanoid, Neutral

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

Languages Speaks only in stolen voices

CR 3 (XP 700; PB +2)

Traits

Mimicry. The voice-thief can mimic animal sounds and humanoid voices. A creature that hears the sounds can tell they are imitations only with a successful DC 13 Wisdom (Insight) check.

Rooftop Stalk. The voice-thief ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The voice-thief makes two attacks, using Dagger or Crossbow in any combination. It can replace one attack with a use of Answering Call.

Dagger. Melee Attack Roll: +5, reach 5 ft. 12 (2d8 + 3) Piercing damage.

Crossbow. Ranged Attack Roll: +5, range 80/320 ft. 10 (2d6 + 3) Piercing damage.

Answering Call. Wisdom Saving Throw: DC 13, one creature within 60 feet that can see or hear the voice-thief. Failure: The target has the Charmed condition until the start of the voice-thief's next turn, and while Charmed this way, it must move toward the voice-thief by the safest available route on its turn.

Bonus Actions

Cunning Action. The voice-thief takes the Dash, Disengage, or Hide action.

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

- Traits/Mimicry — kenku kit; the GM's clause "speaks only in stolen voices"
- Traits/Rooftop Stalk — the chassis
- Actions/Multiattack — the chassis
- Actions/Dagger — weapon dagger
- Actions/Crossbow — weapon light crossbow
- Actions/Answering Call — template lure; library draw (seed unstamped); binds the GM's words: call
- Bonus Actions/Cunning Action — the chassis

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("a kenku thief who speaks only in stolen ") | skirmisher-skulker: no line key in the words — the model's read of its quote
[concept] resolve: archetype=skirmisher type=Humanoid themes=voice/grasping mind=sapient style=skulker energy=Psychic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: stolen voices as deception and weapon [behavior] | shadow-born stealth and ambush [body] | thief's blade and garrote [object]
[concept] identity: The kenku thief stalks from alley shadows and rooftops, opening with a stolen voice — a guard's own shout, a child's cry — to split attention and slip a blade between ribs. Every round it repeats the trick with a different voice, feinting and repositioning until it can strike from hiding with advantage; it fights only while unseen and will flee bloodied, never standing toe-to-toe, because the voice is the weapon and the silence is the escape.
[concept] lore: This kenku was hatched in a rookery above a city's gallows and grew up mimicking the last words of the condemned, and now it steals voices as eagerly as it steals purses, seeking the one perfect voice that will let it pass as anyone but itself.
[reskin] energy withheld: Psychic on a Humanoid with no Psychic in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-skulker -> CR 3
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] species kit: kenku — "a kenku thief": Mimicry (Green Hag/Mimicry, binds "speaks only in stolen voices")
[reskin] class kit: Cunning Action — the sheet already carries a row of that name
[reskin] class kit: rogue — "a kenku thief": nothing landed; Evasion yielded to print's row cap 4
[reskin] inline by rule: "the voice-thief" — the call answered "the gallows rookery" (kind), which the name does not support
[reskin] save dc derived: DC 12 -> 13 (8 + PB 2 + the sheet's best 3) — no stat on the sheet reached it
[reskin] lacks asked: "no voice of its own"
[reskin] lacks refused: "speaks only in stolen voices" names no absence — nothing in it takes anything away
[reskin] clauses: "a kenku thief" -> has (descriptive), head | "speaks only in stolen voices" -> has (header)
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "The voice-thief hurls a stolen voice at a foe — a plea, a scream, a name called in panic — and the hearer cannot help but turn and answer it, lowering its guard and stepping wrong. Anyone who hears the call is fooled into thinking it came from a friend until they actually look; the thief's next strike against that distracted foe lands where it hurts most." [action/save/condition] — menu: leap, gaze-single, snare, throw-retrieve, shield-bash, lure, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed (+ shelf: delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte, affliction, contagion, charge-push, hook-rider, pounce, isolation, bolt-mark)
[reskin] value check: "Answering Call" EV 6.6 vs floor 6.2 (one attack of 2) — worth the trade
[reskin] signature template: lure -> Actions/"Answering Call" ("The stolen voice is a call that the hearer cannot help but answer, drawing it to [verb: call:idea]")
[reskin] signature idea (trait): "When the voice-thief strikes a creature that cannot see it, the stolen voice it is wearing echoes that creature's own voice back at it, so the wound seems to come from the victim's own mouth or a trusted companion. Until the victim finds the thief with its own eyes, it cannot bring itself to cry out for help or warn its allies." [trait/always/condition] — menu: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] word match declined by the call: blurred-form, assassinate, marking-light, truth-aura — the key word does not mean the mechanic here
[reskin] signature miss: trait — "When the voice-thief strikes a creature that cannot see it, the stolen voice it is wearing echoes that creature's own voice back at it, so the wound seems to come from the victim's own mouth or a trusted companion. Until the victim finds the thief with its own eyes, it cannot bring itself to cry out for help or warn its allies." [trait/always/condition] — the model found no template that holds it (offered: false-appearance, adhesive, spider-climb, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, truth-aura, gaze-aura, assassinate, blurred-form, death-burst, bloodied-burst)
[reskin] seat owes nothing: the skulker line was the model's read of its quote, not a key in the words (a hermit was handed Assassinate, day-one 2026-09-30)
[reskin] weapons answered: Dagger = dagger; Crossbow = light crossbow
[reskin] weapon declared: "Crossbow" is a light crossbow — the call's own answer (the name alone read crossbow)
[reskin] weapon table: "Crossbow" — a launcher, never thrown, range 80/320
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept:  — the concept's movement set decides
[reskin] multiattack replacement clause: It can replace one attack with a use of Answering Call.
[reskin] species kit: Languages "Understands Common but can't speak except in stolen voices" -> "Common, Auran" — a kenku speaks (the sheet said it could not, and the words never said so)
[reskin] header clause: Languages "Common, Auran" -> "Speaks only in stolen voices" — the user typed it
```


---

## Brother Aldren Vosch — highest CR

**Concept:** a templar priest with a mace and no magic at all

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Brother Aldren Vosch | 6 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 5 / off 6 → 5.5; sustained 44 (2 × Mace); nova none; dmg 44

```
Brother Aldren Vosch

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

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. The brother makes two Mace attacks.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage, and the target has Disadvantage on its next attack roll before the start of the brother's next turn.

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

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender: ✓ ("a templar priest with a mace and no magi") | caster-warpriest: "priest" is a noun (a title), not a verb — no override | defender: no line key in the words — the model's read of its quote
[concept] resolve: archetype=defender type=Humanoid themes=armed/forged mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: unbreakable shield wall [behavior] | heavy iron mace [object] | disciplined self-sacrifice [behavior]
[concept] identity: The Templar Priest opens combat by anchoring itself in a doorway or chokepoint, shield high and mace ready, daring enemies to break its line. Every round it holds position, trading blows with disciplined efficiency and striking any foe that tries to slip past or target an ally behind it, punishing movement with a shield bash or mace blow. Under pressure it does not flee; it plants its feet, fights to the death, and trusts its armor and faith to outlast the enemy, only shifting to a fighting retreat if ordered by a superior.
[concept] lore: A veteran of a militant religious order, the Templar Priest has sworn to defend the faithful with flesh, iron, and bone, believing its mace is as holy as any prayer.
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "a templar priest with a mace and no magic at all" heads on the Priest — print's rows ride along; the seat stays
[reskin] repair round 1: 1 defect(s) — rename for "Hybrid Attack" takes the shelf's own row name "Shield Bash" — that name belongs to a template this sheet may still receive; choose another
[reskin] named parts: Mace (slot) — the user's words, the engine's numbers
[reskin] named parts landed: 1 attack row(s), 0 save, 0 trait(s), 0 reaction(s); 0 clause(s) unplaced
[reskin] chassis row off: Actions/"Mace Throw" leaves — the GM named a melee weapon (Mace); one weapon, one rule set
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "a templar priest with a mace": nothing to add — the sheet already answers it
[reskin] inline by rule: "the brother" — the call answered "Brother Aldren" (person), which the name does not support
[reskin] lacks asked: "no magic at all"
[reskin] clauses: "a templar priest with a mace" -> has (mechanical) | "no magic at all" -> LACKS (mechanical)
[reskin] signature idea (action): "The Templar Priest slams his shield down and becomes a held line. Until he moves, every foe that tries to slip past him or strike someone behind him is met with a shield bash and checked, and anyone who strikes an ally within his reach is punished by a sudden counterblow. The wall only holds while he stays put." [reaction/on_being_hit/condition] — menu: riposte (+ shelf: seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, stunning-strike, charge-push, hook-rider)
[reskin] word match declined by the call: shield-bash, push-prone, own-turn-punisher, rally, riposte — the key word does not mean the mechanic here
[reskin] signature miss: action — "The Templar Priest slams his shield down and becomes a held line. Until he moves, every foe that tries to slip past him or strike someone behind him is met with a shield bash and checked, and anyone who strikes an ally within his reach is punished by a sudden counterblow. The wall only holds while he stays put." [reaction/on_being_hit/condition] — the model found no template that holds it (offered: riposte, shield-bash, push-prone, own-turn-punisher, rally)
[reskin] fallback respects the call: rally, push-prone, own-turn-punisher left the shelf — the call declined them for this sheet
[reskin] fallback stands down: "a templar priest with a mace and no magic at all" heads on the Priest and asks for nothing — print's rows, nothing invented (the big ogre, critic-ten 2026-10-01)
[reskin] value check: "Dazzling Burst" EV 2.9 vs floor 10.9 (one attack of 2) — still under — needs a condition from the worth-an-attack list (logged)
[reskin] signature dropped by the floor: "Dazzling Burst" — a seed that cannot be lifted does not ship
[reskin] signature dropped — no template held the idea and no seed is legal on this sheet
[reskin] signature idea (trait): "His mace is a heavy iron weight of office, not a duelist's toy. When he brings it down on someone who is already bleeding and off balance from a previous hit, the blow lands crushing, driving them back and rattling their guard." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: guarded-stance, resonant-body, bloodied-fury, relentless-pursuit, marking-light, faultless-tracker — the key word does not mean the mechanic here
[reskin] signature miss: trait — "His mace is a heavy iron weight of office, not a duelist's toy. When he brings it down on someone who is already bleeding and off balance from a previous hit, the blow lands crushing, driving them back and rattling their guard." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] weapons answered: Mace = mace; Shield Bash = shield
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] print canon alignment: Lawful Neutral -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
[reskin] lacks clause: Actions/"Spellcasting" leaves — "no magic at all"
[reskin] dead wildcard name swept — "Divine Aid (3/Day)" was only about "Spellcasting"; the row drops
```


---

## Vareth Solmane — a 2024 sheet

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

Senses darkvision 60 ft.; Passive Perception 16

Languages Common plus one other language

CR 6 (XP 2,300; PB +3)

Actions

Multiattack. Vareth makes two attacks, using Mace or Radiant Flame in any combination.

Mace. Melee Attack Roll: +7, reach 5 ft. 22 (4d8 + 4) Bludgeoning damage plus 5 (2d4) Radiant damage.

Radiant Flame. Ranged Attack Roll: +7, range 60 ft. 22 (4d8 + 4) Radiant damage.

Spellcasting. Vareth casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 14):

- At Will: Light, Thaumaturgy
- 1/Day Each: Spirit Guardians

Bonus Actions

Dawn Mantle (2/Day). Each ally within 30 feet of Vareth gains 11 (2d10) Temporary Hit Points.

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

- Actions/Multiattack — the chassis
- Actions/Mace — weapon mace
- Actions/Radiant Flame — print's own row, renamed
- Actions/Spellcasting — print's own row
- Bonus Actions/Dawn Mantle — template rally; library draw (seed unstamped); binds the GM's words: blessing+bless+prayer+troops
- Bonus Actions/Divine Aid — print's own row

**Engine trace**

```
[route] caster-warpriest (artillery) type=Humanoid mechanics=none — caster-warpriest: ✓ ("a templar priest of the dawn") | caster-warpriest: key "blesses" (class verb)
[concept] resolve: archetype=caster type=Humanoid themes=celestial/armed mind=sapient style=warpriest energy=Radiant mix=both identity=✓ lore=✓
[concept] name: provided "Vareth Solmane"
[concept] mechanics: none claimed
[concept] signature elements: blessing her soldiers with prayers of dawn [behavior] | iron mace wreathed in holy light [object] | iron shield and plate of the templar [body]
[concept] identity: Vareth Solmane is an armored dawn-priest who fights as a war-priest at the head of her soldiers, opening combat by raising a radiant blessing over her allies before closing to hammer enemies with a mace that carries holy fire. Every round she holds the front line, striking with her weapon and sustaining her troops with prayers of dawn; when bloodied, she does not flee but withdraws behind her blessed shield, healing herself and calling down a final searing light to cover her soldiers' advance.
[concept] lore: Vareth Solmane is a templar-priest of the Dawn Order, a militant sect that believes the rising sun is a weapon to be wielded, and she seeks to reclaim a fallen shrine from the shadow-cults that defiled it.
[reskin] energy withheld: Radiant on a Humanoid with no Radiant in the concept's own words (fixed phrases read first)
[reskin] print canon route: the Priest is not a caster first and keys STR 16 over DEX 10 (its own Spellcasting rides as print's row) — the caster family stands down for the plain defender line
[reskin] print canon array: STR 18, DEX 10, CON 12, INT 13, WIS 16, CHA 13 — the Priest's, STR fitted to +7
[reskin] donor: defender-5 -> CR 6
[reskin] style unserved: "warpriest" has no defender line — the plain line ships (resolve's style signal is noisy; not re-routed)
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] print canon: "Vareth Solmane — a templar priest of the dawn who blesses her soldiers" heads on the Priest — print's rows ride along; the seat stays
[reskin] name_element answered: Dawnfire = imagery
[reskin] name element refused: "Dawnfire" was called imagery, but its element word stands alone — a fused compound makes no claim, a bare one does
[reskin] repair round 1: 1 defect(s) — "Dawnfire" deals Radiant on a Humanoid whose concept names no Radiant — a name is not a warrant; use a physical type
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Vareth Solmane — a templar priest of the dawn": nothing to add — the sheet already answers it
[reskin] proper noun: "Vareth Solmane" — the Name field is a person, not a kind (no print match, no article in the words)
[reskin] inline declared: "Vareth" — the call's own answer (person), built from the name
[reskin] inline form: "Vareth" — the model's own reading of the name
[reskin] energy rider withheld: Radiant on a Humanoid with no Radiant in the concept's own words
[reskin] energy withheld on a base row: "Dawnfire" Radiant -> Piercing (the body's physical type; a Humanoid deals no Radiant its concept never gave it)
[reskin] energy rider kept by the row's name: "Radiant Blessing" promises Radiant, so the rider stands on a Humanoid the concept never called radiant
[reskin] lacks asked: nothing taken away
[reskin] clauses: "Vareth Solmane — a templar priest of the dawn" -> has (descriptive), head | "blesses her soldiers" -> has (mechanical)
[reskin] extraction: 6 of 15 model clauses quote nothing the user typed and leave the record ("closing to hammer enemies with a mace that carries holy fire", "Every round she holds the front line", "when bloodied, she does not flee", …)
[reskin] signature idea (action): "Vareth raises her holy symbol and speaks a dawn-prayer over her soldiers, wreathing each ally she can see in a shimmering mantle of first light. For a short while their weapon strikes carry a spark of that sunlight, letting her troops hit harder than they otherwise could — and she can keep the prayer going round after round as long as she holds the line." [action/always/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, stunning-strike, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — rally (blessing, bless)
[reskin] value check: "Dawn Mantle (2/Day)" EV 6.1 vs floor 3.4 (a bonus action (free)) — worth the trade
[reskin] signature template: rally -> Bonus Actions/"Dawn Mantle (2/Day)" ("A bonus-action blessing she can keep going round after round, wreathing visible  [verb: blessing:concept, bless:concept, prayer:idea, troops:idea]")
[reskin] keys spent by the action: blessing, bless
[reskin] signature idea (trait): "The head of Vareth's iron mace is wreathed in banked holy light that flares awake whenever the weapon lands — a struck foe is briefly limned in dawnfire, and the next of her allies to swing at that enemy strikes with the same opening-light guidance she gave them." [trait/always/damage] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending, weapon-lodge)
[reskin] word match declined by the call: marking-light — the key word does not mean the mechanic here
[reskin] signature miss: trait — "The head of Vareth's iron mace is wreathed in banked holy light that flares awake whenever the weapon lands — a struck foe is briefly limned in dawnfire, and the next of her allies to swing at that enemy strikes with the same opening-light guidance she gave them." [trait/always/damage] — the model found no template that holds it (offered: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, resonant-body)
[reskin] weapons answered: Mace = mace; Dawnfire = none
[reskin] print canon alignment: Lawful Good -> Neutral — the Priest's (the Kobold printed Chaotic Neutral — the critic's second species read)
[reskin] print canon languages: "Common" -> "Common plus one other language" — the Priest's
[reskin] print canon attack: "Dawnfire" -> "Radiant Flame" — the Priest's own ranged row
[reskin] print canon row: Actions/Spellcasting — the Priest's own
[reskin] print canon row: Bonus Actions/Divine Aid (3/Day) — the Priest's own
[reskin] spellcasting dc: "Spellcasting" prints spell save DC 14 — 8 + PB + Wisdom (print carries it in 45 of 48 rows)
```


---

## Templar of the Unmoved Stone — in the run

**Concept:** name: Templar of the Unmoved Stone | a templar who guards a standing stone and never yields ground

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Templar of the Unmoved Stone | 4 | defender-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 4 → 3.5; sustained 26 (2 × Warhammer); nova none; dmg 26

```
Templar of the Unmoved Stone

Medium Humanoid, Lawful Neutral

AC 19
Initiative +0 (10)

HP 65 (10d8 + 20)

Speed 30 ft.

MOD
SAVE
STR
18
+4
+4
INT
11
+0
+0
MOD
SAVE
DEX
11
+0
+0
WIS
12
+1
+3
MOD
SAVE
CON
14
+2
+4
CHA
14
+2
+2

Skills Athletics +6, Perception +3

Senses darkvision 60 ft.; Passive Perception 13

Languages Common

CR 4 (XP 1,100; PB +2)

Actions

Multiattack. The templar makes two attacks, using Warhammer or Greatstone Throw in any combination.

Warhammer. Melee Attack Roll: +6, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.

Greatstone Throw. Ranged Attack Roll: +6, range 30/120 ft. 13 (2d8 + 4) Bludgeoning damage.

Bonus Actions

Stone Reprisal. One creature within 5 feet that hit the templar with an attack roll since the end of the templar's last turn takes 6 (1d12) Bludgeoning damage.

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
- Actions/Warhammer — weapon warhammer
- Actions/Greatstone Throw — the chassis
- Bonus Actions/Stone Reprisal — library seed own-turn-punisher

**Engine trace**

```
[route] defender type=Humanoid mechanics=none — defender-warden: a Humanoid is not a made or risen guardian | defender: ✓ ("never yields ground") | defender: key "guards a" (class verb)
[concept] name: provided_name rejected — "Templar of the Unmoved Stone" is written in lowercase inside a description; the generator names it
[concept] resolve: archetype=defender type=Humanoid themes=forged/armed mind=sapient style=— energy=Force mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: never yields ground [behavior] | iron body and shield [body] | guards a standing stone [behavior]
[concept] identity: The Templar of the Unmoved Stone plants itself beside its ward and becomes the line, meeting every advance with shield and hammer while its stance turns the ground beneath it into an anchor. Every round it refuses to move, punishing any foe that tries to slip past with a crushing blow and a pulse of force-laden stone. It never flees, fighting to the death with grim patience, because yielding the stone is the only defeat it recognizes.
[concept] lore: Sworn to a standing stone older than any kingdom, the templar's oath was reforged into iron flesh, and it will hold that patch of earth until the stone itself is dust.
[reskin] energy withheld: Force on a Humanoid with no Force in the concept's own words (fixed phrases read first)
[reskin] donor: defender-3 -> CR 4
[reskin] row gated out: Guard Aura (aura) — the concept did not claim this mechanic
[reskin] class kit: Divine Aid — the sheet carries no row it could refer to (/^Spellcasting$/)
[reskin] class kit: cleric — "Templar of the Unmoved Stone — a templar": nothing to add — the sheet already answers it
[reskin] inline declared: "the templar" — the call's own answer (kind), built from the name
[reskin] inline form: "the templar" — the model's own reading of the name
[reskin] save dc derived: DC 13 -> 14 (8 + PB 2 + the sheet's best 4) — no stat on the sheet reached it
[reskin] lacks asked: nothing taken away
[reskin] lacks not claimed: "never yields ground" reads like a lack to the words, and the call's list did not name it
[reskin] clauses: "Templar of the Unmoved Stone — a templar" -> has (descriptive), head | "guards a standing stone" -> has (descriptive) | "never yields ground" -> has (descriptive)
[reskin] signature idea (action): "The templar drives its hammer into the ground, sending a pulse of force through the stone beneath its feet. Enemies standing near the templar are battered and their legs turn heavy, as the earth itself grips them and refuses to let them advance past the templar's line. The templar cannot use this again until it has taken a moment to recover, and it never affects the ground behind it." [action/save/damage] — menu: throw-retrieve, seal, shield-bash, active-toll, random-ray, ground-burst, obstacle-pull, terror-pulse, slow-bolt, disarm, push-prone, herd, curse-debt, reveal, wind-up, blighted-ground (+ shelf: patient-defense, lay-on-hands, second-wind, aggro-curse, own-turn-punisher, self-invisibility, rally, snap-shot, riposte, charge-push, hook-rider)
[reskin] signature bound to the concept's verb: action — blighted-ground (ground)
[reskin] nova declined: "Shockwave (Recharge 5-6)" — a whole-round ability the GM never asked for: neither the call nor the key table finds the GM asking for it (the idea's own words: pulse:idea); the fallback stands in (the cauldron's spill, 2026-09-29)
[reskin] fallback skipped by the floor: herd (EV 5.5 vs 23.7)
[reskin] value check: "Answering Sting" EV 3.3 vs floor 2.3 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: own-turn-punisher -> Bonus Actions/"Answering Sting" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The templar's iron body and shield are one: whenever a foe strikes it in melee, the attacker's weapon rings against iron-hard faith. The blow rebounds, and the foe is left briefly staggered and exposed, their stance broken against the templar's unmoved stone." [trait/on_being_hit/condition] — menu: absorption, bloodied-burst, resonant-body, weapon-lodge (+ shelf: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, relentless-pursuit, bound, marking-light, sealed-body, warded-mending, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura)
[reskin] signature bound to the concept's verb: trait — guarded-stance, false-appearance (guard, stone)
[reskin] word match declined by the call: guarded-stance, false-appearance, resonant-body, sealed-body, absorption, bloodied-burst, weapon-lodge — the key word does not mean the mechanic here
[reskin] key match declined: trait — "guarded-stance" was ranked first on the call's own menu for guard, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The templar's iron body and shield are one: whenever a foe strikes it in melee, the attacker's weapon rings against iron-hard faith. The blow rebounds, and the foe is left briefly staggered and exposed, their stance broken against the templar's unmoved stone." [trait/on_being_hit/condition] — the model found no template that holds it (offered: guarded-stance, false-appearance, absorption, bloodied-burst, resonant-body, weapon-lodge, sealed-body)
[reskin] weapons answered: Warhammer = warhammer; Greatstone Throw = none
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rename: "Answering Sting" -> "Stone Reprisal"
```


---

## Umbral Assassin — in the run

**Concept:** a ninja who moves through the shadows and strikes unseen

| block | CR | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Umbral Assassin | 5 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok |

- clean
- read: def 3 / off 5 → 4; sustained 34 (2 × Kunai); nova none; dmg 34

```
Umbral Assassin

Medium Humanoid, Lawful Neutral

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

Senses darkvision 60 ft.; Passive Perception 14

Languages Common

CR 5 (XP 1,800; PB +3)

Traits

Evasion. If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds on the save and only half damage if it fails. It can't use this trait if it has the Incapacitated condition.

Assassinate. During the first round of each combat, the assassin has Advantage on attack rolls against any creature that hasn't taken a turn. If the assassin hits a creature during that round, the target takes an extra 9 (2d8) Piercing damage.

Shadowstep. The assassin ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.

Actions

Multiattack. The assassin makes two attacks, using Kunai or Shuriken in any combination.

Kunai. Melee Attack Roll: +6, reach 5 ft. 17 (4d6 + 3) Piercing damage.

Shuriken. Ranged Attack Roll: +6, range 20/60 ft. 16 (3d8 + 3) Piercing damage.

Bonus Actions

Cunning Action. The assassin takes the Dash, Disengage, or Hide action.

Rampage (1/Day). Immediately after dealing damage to a creature that is already Bloodied, the assassin moves up to half its Speed, and it makes one Kunai attack.

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

- Traits/Evasion — template evasion; library draw (seed unstamped)
- Traits/Assassinate — template assassinate; library draw (seed unstamped); binds the GM's words: unseen
- Traits/Shadowstep — the chassis
- Actions/Multiattack — the chassis
- Actions/Kunai — weapon dagger
- Actions/Shuriken — weapon dart
- Bonus Actions/Cunning Action — the chassis
- Bonus Actions/Rampage — library seed rampage

**Engine trace**

```
[route] skirmisher-skulker type=Humanoid mechanics=none — skirmisher-skulker: ✓ ("moves through the shadows and strikes un") | skirmisher-skulker: key "unseen" (class verb)
[concept] resolve: archetype=skirmisher type=Humanoid themes=uncanny/armed mind=sapient style=skulker energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: striking from concealment [behavior] | living shadow body [body] | smoke bomb and shuriken [object]
[concept] identity: The shadow ninja fights only from concealment, opening with a thrown shuriken from darkness and then closing to strike with advantage before melting back into shadow with a smoke bomb. Every round it alternates between a ranged feint and a burst of unseen melee, always repositioning to remain hidden. When bloodied, it does not flee but becomes desperate and reckless, using its shadow step to escape and re‑engage from a new angle rather than stand and trade blows.
[concept] lore: These assassins are trained in a hidden monastery where initiates are ritually bound to living shadow, and they now sell their skills to the highest bidder, seeking only the perfect kill.
[reskin] energy withheld: Necrotic on a Humanoid with no Necrotic in the concept's own words (fixed phrases read first)
[reskin] donor: skirmisher-3-skulker -> CR 5
[reskin] row gated out: Ranged Save Effect (gaze) — the concept did not claim this mechanic
[reskin] row gated out: Teleport (teleport) — the concept did not claim this mechanic
[reskin] inline declared: "the assassin" — the call's own answer (kind), built from the name
[reskin] inline form: "the assassin" — the model's own reading of the name
[reskin] lacks asked: nothing taken away
[reskin] clauses: "a ninja" -> has (descriptive), head | "moves through the shadows" -> has (descriptive) | "strikes unseen" -> has (mechanical)
[reskin] extraction: 3 of 8 model clauses quote nothing the user typed and leave the record ("opening with a thrown shuriken from darkness", "always repositioning to remain hidden", "When bloodied, it does not flee but becomes desperate and reckless")
[reskin] menu pruned: action — phase-slip (the sheet cannot render them)
[reskin] signature idea (action): "When the assassin attacks a target that cannot see it, it is considered unseen for that attack and can apply its full damage even if the target is not surprised. After the attack, whether it hits or misses, the assassin can immediately hide again as part of the same action, using its Cunning Action to slip back into shadow." [rider/on_hit/damage] — menu: affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark (+ shelf: leap, gaze-single, snare, throw-retrieve, shield-bash, random-ray, ground-burst, spew, snare-bolt, sensory-strike, disarm, thrown-burst-seed, delayed-brand, rampage, patient-defense, second-wind, aggro-curse, self-invisibility, focus, feint-slip, coating, snap-shot, riposte)
[reskin] signature bound to the concept's verb: action — self-invisibility (unseen)
[reskin] word match declined by the call: feint-slip, self-invisibility, bolt-mark — the key word does not mean the mechanic here
[reskin] key match declined: action — "self-invisibility" was ranked first on the call's own menu for unseen, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: action — "When the assassin attacks a target that cannot see it, it is considered unseen for that attack and can apply its full damage even if the target is not surprised. After the attack, whether it hits or misses, the assassin can immediately hide again as part of the same action, using its Cunning Action to slip back into shadow." [rider/on_hit/damage] — the model found no template that holds it (offered: self-invisibility, affliction, contagion, stunning-strike, charge-push, hook-rider, pounce, isolation, bolt-mark, feint-slip)
[reskin] fallback respects the call: self-invisibility left the shelf — the call declined it for this sheet
[reskin] fallback skipped: phase-slip (the sheet cannot render it)
[reskin] fallback skipped by the floor: gaze-single (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: sensory-strike (EV 2.5 vs 9.4)
[reskin] fallback skipped by the floor: disarm (EV 0 vs 9.4)
[reskin] value check: "Rampage (1/Day)" EV 15.2 vs floor 2.9 (a bonus action (free)) — worth the trade
[reskin] library seed drawn: rampage -> Bonus Actions/"Rampage (1/Day)" (no template held the idea; a proven shape stands in)
[reskin] signature idea (trait): "The assassin's body is partially composed of living shadow. While in dim light or darkness, it can use a bonus action to become invisible until the start of its next turn, or until it attacks or casts a spell." [trait/always/defense] — menu: false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, assassinate, blurred-form, death-burst (+ shelf: absorption, bloodied-burst, resonant-body, warded-mending)
[reskin] signature bound to the concept's verb: trait — assassinate (unseen)
[reskin] word match declined by the call: blurred-form, false-appearance, assassinate, marking-light — the key word does not mean the mechanic here
[reskin] key match declined: trait — "assassinate" was ranked first on the call's own menu for unseen, and the call read it as a collision, not the mechanic; the words keep their claim and nothing is forced
[reskin] signature miss: trait — "The assassin's body is partially composed of living shadow. While in dim light or darkness, it can use a bonus action to become invisible until the start of its next turn, or until it attacks or casts a spell." [trait/always/defense] — the model found no template that holds it (offered: assassinate, false-appearance, adhesive, phobia, terrain-walk, aberrant-ground, faultless-tracker, web-walker, bloodied-fury, uncanny-sense, berserk, shielded-mind, evasion, relentless-pursuit, bound, marking-light, guarded-stance, undead-fortitude, mimicry, truth-aura, gaze-aura, blurred-form, death-burst)
[reskin] seat default: skulker owes assassinate by print — it seats before the idea
[reskin] signature template (trait): assassinate -> Traits/"Assassinate" ("the seat owes it by print")
[reskin] seat default: skulker owes evasion by print — it seats before the idea
[reskin] signature template (trait): evasion -> Traits/"Evasion" ("the seat owes it by print")
[reskin] weapons answered: Kunai = dagger; Shuriken = dart
[reskin] weapon declared: "Kunai" is a dagger — the call's own answer
[reskin] weapon declared: "Shuriken" is a dart — the call's own answer
[reskin] weapon table: "Shuriken" — thrown, range 20/60
[reskin] speed by body: a Humanoid walks 30 ft. (print's people; a hermit ran 50 — critic's audit 2026-10-02)
[reskin] speed by concept: dropped Climb 30 ft. — the concept's movement set decides
[reskin] languages by mind: "None" -> "Common" (sapient)
[reskin] audit rewrite blocked — "Shadowstep" is engine-authored chassis text
```
