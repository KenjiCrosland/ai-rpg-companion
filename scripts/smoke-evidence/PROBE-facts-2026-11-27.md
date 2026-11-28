# PROBE — the facts call, read against the bar (2026-11-27)

91 inputs, three rolls each, **273 readings**. 230 facts kept, 8 dropped.

The call is `buildFactsPrompt` + `validateFacts` in `reskin/facts.mjs`, wired to nothing. It was run
through the app's own endpoint with **the settings the generator's reader calls use**, read off
`ai-client.mjs` and `ai-adapters.mjs`: model `deepseek-flash`, the system message "You are an
assistant Game Master.", `thinking: { type: 'disabled' }`, and **no temperature** — the provider's
default.

**91 inputs, not 92.** The two batches hold 40 rows each; gm40 skips 1 (s40, `cr: auto`) and the
canary skips 2 (s22 `cr: auto`, s36 a blank form), so 77 replayable, plus 6 hazards and 8 held out.
Fable's count of 78 replayable is one high.

## The verdict: it does not meet the bar

| the bar | result |
|---|---|
| no **stated** size on the nine must-find-none inputs | **PASS, 0 of 9** |
| the six hazards return no fact of their field | **PASS, 0 of 6 tripped** |
| each must-find fact on at least 2 of 3 rolls | **FAIL — 14 of 34 missed** |

Grandeur is never read as a size, and not one of Fable's four ability-shaped traps produced a fact.
Those were the two things most likely to go wrong and both hold.

### The fourteen misses, and they are two different problems

**Two are my validator, not the call.** The model returned the right thing and I threw it away:

| input | the model returned | dropped because |
|---|---|---|
| gm40 s28 | `immune "charm"` | "charm" is not on the condition list; the list holds "Charmed" |
| gm40 s27 | `resistant "nonmagical weapons"` | not a damage type — and print writes that resistance as the three physical ones |

`typedFactsIn` already resolves a GM's root to the condition the sheet carries, and already reads
"nonmagical" as Bludgeoning/Piercing/Slashing. `validateFacts` does neither. That is a fix, not a
finding about the model, and it is not made here because this round stops at the probe.

**Twelve are the call reading less than the GM typed, or reading it wrong.** Almost all are
`kind` facts:

| input | wanted | got |
|---|---|---|
| gm40 s06 pixie thief | fly, Tiny, Fey | Fey only — 0/3 for fly and Tiny |
| held1 a sprite archer | fly, Tiny | Fey only |
| gm40 s11 gnome illusionist | Small | **type Fey**, which a gnome is not |
| held2 a halfling necromancer | Small, Humanoid | **type Undead**, read off "necromancer" |
| gm40 s07 dwarf artificer | Humanoid | 1/3 |
| gm40 s14 Mimic, a whole house | Gargantuan or Huge | Monstrosity, no size |
| gm40 s30 lance and shield | shield | nothing at all |
| gm40 s37 flying monkey | fly | 1/3 |
| canary s23 lacquered plate | plate | 1/3 (the shield passed 2/3) |

The shape of it: the call is good at a fact **written as the sheet writes it** — AC, HP, speed,
attacks, a named armour, a size word, a vulnerability all pass 3/3, including every held-out input
of that kind. It is poor at a fact that **follows from a kind of creature**, which is the half Part
A cannot do and the reason the call exists. And twice it answered a type the words do not support.

### Facts on neither list

**78 input-and-field pairs.** Almost all are one thing: the call returns a `type` for nearly every
input, usually right (Beast for a wolf pack leader, Construct for a golem, Undead for an archlich)
and sometimes not — Fey for a gnome, Undead for a halfling necromancer, and on canary s12 three
different types across three rolls (Aberration, Celestial, Fiend).

The ones worth a look beside the types:

| input | fact | rolls |
|---|---|---|
| canary s37 | `ac 16`, `hp 120` stated | 3/3 each — Fable confirmed these are right |
| gm40 s17 | `immune Necrotic` stated | 2/3 — from "breath is necrotic", which is a damage type, not an immunity |
| gm40 s13 | `size Huge` kind | 1/3 — a giant spider is Large in print |
| gm40 s39 | `size Huge` kind | 2/3 — a giant toad is Large in print |
| canary s03, s20, gm40 s20 | `movement climb`/`swim` stated | 1/3 each |
| gm40 s26 | `movement climb` kind | 1/3 — an assassin vine does not climb |
| gm40 s30 | `movement fly` kind | 1/3 — right for the wyvern, not for the knight |
| extra6 | `shield True` | 3/3 — the sixth hazard's shield, as Fable expected |

## Every reading

### canary s01 — `Dire Wolf | with a frost-rimed hide`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** type Beast (kind) · **dropped** none
- roll 3: **kept** type Beast (kind) · **dropped** none

### canary s02 — `a mud-caked bog hound that drags fishermen under`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** type Beast (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s03 — `Owlbear | that has learned to climb`

- roll 1: **kept** type Monstrosity (kind), movement climb (stated) · **dropped** none
- roll 2: **kept** type Monstrosity (kind) · **dropped** none
- roll 3: **kept** type Monstrosity (kind) · **dropped** none

### canary s04 — `a chapel bell-ringer's ghost that tolls for the dying`

- roll 1: **kept** type Undead (kind) · **dropped** none
- roll 2: **kept** type Undead (kind) · **dropped** none
- roll 3: **kept** type Undead (kind) · **dropped** none

### canary s05 — `Air Elemental | that carries stolen voices`

- roll 1: **kept** type Elemental (stated) · **dropped** none
- roll 2: **kept** type Elemental (stated) · **dropped** none
- roll 3: **kept** type Elemental (stated) · **dropped** none

### canary s06 — `a quarry-pit thing of living scree that buries what it catches`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s07 — `Hydra | whose stumps smoke instead of regrowing`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s08 — `a siege-engine golem of lashed timber that shoulders through walls`

- roll 1: **kept** type Construct (kind) · **dropped** none
- roll 2: **kept** type Construct (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s09 — `Stone Golem | carved as a weeping saint`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** type Construct (kind) · **dropped** none
- roll 3: **kept** type Construct (kind) · **dropped** none

### canary s10 — `a drowned cathedral choir that sings in one voice`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s11 — `Vampire | who keeps a garden of thorns`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** type Undead (kind) · **dropped** none
- roll 3: **kept** type Undead (kind) · **dropped** none

### canary s12 — `a plague-bearing archon of flies that commands lesser swarms`

- roll 1: **kept** type Fiend (kind) · **dropped** none
- roll 2: **kept** type Celestial (kind) · **dropped** none
- roll 3: **kept** type Aberration (kind) · **dropped** none

### canary s13 — `Purple Worm | that swallowed a war-band's armoury`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s14 — `a glacier's heart given legs, trailing a wake of killing cold`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s15 — `Adult Red Dragon | blind in one eye from an old lance`

- roll 1: **kept** type Dragon (kind) · **dropped** none
- roll 2: **kept** type Dragon (kind) · **dropped** none
- roll 3: **kept** type Dragon (kind) · **dropped** none

### canary s16 — `a tyrant of burning brass who rules a city of forges`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s17 — `Pit Fiend | who collects the oaths of dying knights`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** type Fiend (kind) · **dropped** none
- roll 3: **kept** type Fiend (kind) · **dropped** none

### canary s18 — `an archlich enthroned on a sun of bone`

- roll 1: **kept** type Undead (kind) · **dropped** none
- roll 2: **kept** type Undead (kind) · **dropped** none
- roll 3: **kept** type Undead (kind) · **dropped** none

### canary s19 — `Ancient Gold Dragon | `

- roll 1: **kept** type Dragon (stated) · **dropped** none
- roll 2: **kept** type Dragon (stated) · **dropped** none
- roll 3: **kept** type Dragon (stated) · **dropped** none

### canary s20 — `a leviathan of the trench whose song drowns fleets`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** movement swim (stated) · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s21 — `Owlbear | `

- roll 1: **kept** type Monstrosity (kind) · **dropped** none
- roll 2: **kept** type Monstrosity (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s23 — `Vashka the Red | A hobgoblin warlord in lacquered plate who fights from a shield wall and never breaks ranks.`

- roll 1: **kept** type Humanoid (kind), armour plate (stated), shield True (stated) · **dropped** none
- roll 2: **kept** type Humanoid (kind), armour half plate (stated), shield True (stated) · **dropped** none
- roll 3: **kept** type Humanoid (kind) · **dropped** none

### canary s24 — `A Large insectile horror. It has four scythe-arms, a spitting maw, and a shell that sheds acid. It fights by p`

- roll 1: **kept** size Large (stated) · **dropped** none
- roll 2: **kept** size Large (stated), type Monstrosity (kind) · **dropped** none
- roll 3: **kept** size Large (stated), type Monstrosity (kind) · **dropped** none

### canary s25 — `a sentinel of black iron, AC 20, Huge, speed 20 feet`

- roll 1: **kept** ac 20 (stated), size Huge (stated), speed 20 (stated) · **dropped** none
- roll 2: **kept** ac 20 (stated), size Huge (stated), speed 20 (stated) · **dropped** none
- roll 3: **kept** ac 20 (stated), size Huge (stated), speed 20 (stated) · **dropped** none

### canary s26 — `a marsh witch who curses trespassers, cr 7`

- roll 1: **kept** type Fey (kind) · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s27 — `a templar priest with a mace and no magic at all`

- roll 1: **kept** type Humanoid (kind) · **dropped** none
- roll 2: **kept** type Humanoid (kind) · **dropped** none
- roll 3: **kept** type Humanoid (kind) · **dropped** none

### canary s28 — `Ilvareth Dusksong | An elf archmage who bends shadow and steps between places.`

- roll 1: **kept** type Humanoid (kind) · **dropped** none
- roll 2: **kept** type Humanoid (kind) · **dropped** none
- roll 3: **kept** type Humanoid (kind) · **dropped** none

### canary s29 — `a swarm of funeral bells that ring themselves over the dying`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** size Medium (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s30 — `a cathedral-vault ooze that digests reliquaries`

- roll 1: **kept** type Ooze (stated) · **dropped** none
- roll 2: **kept** type Ooze (kind) · **dropped** none
- roll 3: **kept** type Ooze (stated) · **dropped** none

### canary s31 — `a young storm drake whose breath is a rolling wall of thunder`

- roll 1: **kept** type Dragon (kind) · **dropped** none
- roll 2: **kept** type Dragon (kind) · **dropped** none
- roll 3: **kept** type Dragon (kind) · **dropped** none

### canary s32 — `a stone giant exile who speaks only Giant and understands no Common`

- roll 1: **kept** type Giant (stated) · **dropped** none
- roll 2: **kept** type Giant (stated) · **dropped** none
- roll 3: **kept** type Giant (kind) · **dropped** none

### canary s33 — `lizardfolk monk`

- roll 1: **kept** type Humanoid (kind) · **dropped** none
- roll 2: **kept** type Humanoid (kind) · **dropped** none
- roll 3: **kept** type Humanoid (kind) · **dropped** none

### canary s34 — `Krennik Skullstandard | riding a worg`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s35 — `the thing in the well | `

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s37 — `Meshrin | Large lizard folk, 30 feet of movement, Wields a greataxe two-handed and a javelin for the throw. He`

- roll 1: **kept** size Large (stated), type Humanoid (kind), speed 30 (stated), ac 16 (stated), hp 120 (stated) · **dropped** none
- roll 2: **kept** size Large (stated), type Humanoid (kind), ac 16 (stated), hp 120 (stated), speed 30 (stated) · **dropped** none
- roll 3: **kept** type Humanoid (kind), speed 30 (stated), ac 16 (stated), hp 120 (stated) · **dropped** none

### canary s38 — `a skeleton with a greatsword`

- roll 1: **kept** type Undead (kind) · **dropped** none
- roll 2: **kept** type Undead (kind) · **dropped** none
- roll 3: **kept** type Undead (kind) · **dropped** none

### canary s39 — `a sellsword who hurls a handaxe and closes with a shortsword`

- roll 1: **kept** type Humanoid (kind) · **dropped** none
- roll 2: **kept** type Humanoid (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### canary s40 — `Brother Halric | `

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### extra1 — `a troll that regains 10 HP at the start of its turn`

- roll 1: **kept** type Giant (kind) · **dropped** none
- roll 2: **kept** type Giant (kind) · **dropped** none
- roll 3: **kept** type Giant (kind) · **dropped** none

### extra2 — `a golem that explodes when it drops to 0 HP`

- roll 1: **kept** type Construct (kind) · **dropped** none
- roll 2: **kept** type Construct (kind) · **dropped** none
- roll 3: **kept** type Construct (kind) · **dropped** none

### extra3 — `a wolf that makes 2 attacks when bloodied`

- roll 1: **kept** type Beast (kind) · **dropped** none
- roll 2: **kept** type Beast (kind) · **dropped** none
- roll 3: **kept** type Beast (kind) · **dropped** none

### extra4 — `a knight whose allies within 10 feet are immune to fear`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** type Humanoid (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### extra5 — `a spider that pulls its prey 10 ft`

- roll 1: **kept** type Beast (kind) · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** type Beast (kind) · **dropped** none

### extra6 — `an ogre with a large shield`

- roll 1: **kept** type Giant (kind), shield True (stated) · **dropped** none
- roll 2: **kept** shield True (stated) · **dropped** none
- roll 3: **kept** shield True (stated) · **dropped** none

### gm40 s01 — `Old Marta | innkeeper, retired adventurer, keeps a crossbow under the bar`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s02 — `Sergeant Dunmore | town guard sergeant, halberd, by the book`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** type Humanoid (kind) · **dropped** none
- roll 3: **kept** type Humanoid (kind) · **dropped** none

### gm40 s03 — `Yx'theral | drow priestess of the spider goddess`

- roll 1: **kept** type Humanoid (kind) · **dropped** none
- roll 2: **kept** type Humanoid (kind) · **dropped** none
- roll 3: **kept** type Humanoid (kind) · **dropped** none

### gm40 s04 — `Tobias Crane | bounty hunter, nets and a hand crossbow, takes people alive`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** type Humanoid (kind) · **dropped** none

### gm40 s05 — `The Butcher of Karrow | cult enforcer with a meat cleaver, heals when he kills`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s06 — `Nib | pixie thief, steals one thing and runs`

- roll 1: **kept** type Fey (kind) · **dropped** none
- roll 2: **kept** type Fey (kind) · **dropped** none
- roll 3: **kept** type Fey (kind) · **dropped** none

### gm40 s07 — `dwarf artificer`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** type Humanoid (kind) · **dropped** none

### gm40 s08 — `tabaxi assassin`

- roll 1: **kept** type Humanoid (kind) · **dropped** none
- roll 2: **kept** type Humanoid (kind) · **dropped** none
- roll 3: **kept** type Humanoid (kind) · **dropped** none

### gm40 s09 — `bugbear barbarian chief`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s10 — `fallen aasimar paladin`

- roll 1: **kept** type Celestial (kind), type Humanoid (kind) · **dropped** none
- roll 2: **kept** type Celestial (kind) · **dropped** none
- roll 3: **kept** type Celestial (kind) · **dropped** none

### gm40 s11 — `gnome illusionist`

- roll 1: **kept** type Fey (kind) · **dropped** none
- roll 2: **kept** type Fey (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s12 — `Ogre | wearing full plate looted from a knight`

- roll 1: **kept** armour plate (stated) · **dropped** none
- roll 2: **kept** armour plate (stated) · **dropped** none
- roll 3: **kept** armour plate (stated) · **dropped** none

### gm40 s13 — `giant spider that spits fire instead of webs`

- roll 1: **kept** size Huge (kind), type Beast (kind) · **dropped** none
- roll 2: **kept** type Beast (kind) · **dropped** none
- roll 3: **kept** type Beast (kind) · **dropped** none

### gm40 s14 — `Mimic | but it's a whole house`

- roll 1: **kept** type Monstrosity (kind) · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** type Monstrosity (kind) · **dropped** none

### gm40 s15 — `wolf pack leader, smarter than the rest, calls the pack`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s16 — `Gelatinous Cube | full of the skeletons it ate and they fight for it`

- roll 1: **kept** type Ooze (kind) · **dropped** none
- roll 2: **kept** type Ooze (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s17 — `Young Black Dragon | undead, breath is necrotic`

- roll 1: **kept** type Undead (stated) · **dropped** none
- roll 2: **kept** type Undead (stated), immune Necrotic (stated) · **dropped** none
- roll 3: **kept** type Undead (stated), immune Necrotic (stated) · **dropped** none

### gm40 s18 — `a bandit captain but for level 1 players, should not kill them`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s19 — `Warden Halvek | Runs the prison under the lighthouse. Used to be a paladin, broke his oath when he let a priso`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s20 — `The Lady in the Reeds | River spirit that takes the shape of whoever the victim misses most. Lures people into`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** movement swim (stated), type Fey (kind) · **dropped** none

### gm40 s21 — `Gorrak Splitjaw | Gnoll warlord for my level 6 party's boss fight. Has a pet hyena that fights next to him. Us`

- roll 1: **kept** type Humanoid (kind) · **dropped** none
- roll 2: **kept** type Humanoid (kind) · **dropped** none
- roll 3: **kept** type Humanoid (kind) · **dropped** none

### gm40 s22 — `My players are going into a wizard's abandoned tower and I need the thing that's been living in the library. I`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** size Large (stated), type Beast (kind) · **dropped** movement teleport — movement "teleport" is not on that field's list
- roll 3: **kept** size Large (stated), type Beast (kind) · **dropped** none

### gm40 s23 — `Captain Iress Vane | Airship captain, half-elf, ex-navy. Rapier and pistol. She's a duelist who uses the terra`

- roll 1: **kept** type Humanoid (kind), ac 17 (stated), hp 110 (stated), attacks 3 (stated) · **dropped** none
- roll 2: **kept** type Humanoid (kind), ac 17 (stated), hp 110 (stated), attacks 3 (stated) · **dropped** none
- roll 3: **kept** type Humanoid (kind), ac 17 (stated), hp 110 (stated), attacks 3 (stated) · **dropped** none

### gm40 s24 — `ice elemental, cone of cold breath recharge 5-6, leaves difficult terrain, slows on hit`

- roll 1: **kept** type Elemental (stated) · **dropped** none
- roll 2: **kept** type Elemental (stated) · **dropped** none
- roll 3: **kept** type Elemental (stated) · **dropped** none

### gm40 s25 — `Grumm | troll shaman. 3/day he can heal another troll 2d8. totem that gives allies +2 to hit within 30 ft. spe`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** type Giant (kind) · **dropped** none
- roll 3: **kept** type Giant (kind) · **dropped** none

### gm40 s26 — `assassin vine that grapples on hit and pulls 10 ft, restrained while grappled, 2d6 poison at start of turn`

- roll 1: **kept** type Plant (kind) · **dropped** none
- roll 2: **kept** type Plant (kind) · **dropped** none
- roll 3: **kept** type Plant (kind), movement climb (kind) · **dropped** none

### gm40 s27 — `ghost knight, resistant to nonmagical weapons, lance attack does extra 3d8 on a charge, reaction to parry, fri`

- roll 1: **kept** none · **dropped** resistant nonmagical weapons — resistant "nonmagical weapons" is not on that field's list
- roll 2: **kept** type Undead (kind) · **dropped** resistant nonmagical weapons — resistant "nonmagical weapons" is not on that field's list
- roll 3: **kept** none · **dropped** resistant nonmagical weapons — resistant "nonmagical weapons" is not on that field's list

### gm40 s28 — `Madame Zolga | fortune teller. legendary actions: 3. can reroll one attack against her per round. casts hold p`

- roll 1: **kept** none · **dropped** immune charm — immune "charm" is not on that field's list
- roll 2: **kept** none · **dropped** immune charm — immune "charm" is not on that field's list
- roll 3: **kept** none · **dropped** immune charm — immune "charm" is not on that field's list

### gm40 s29 — `golem that explodes when it dies, 30 ft radius, 6d6 fire, dex save half`

- roll 1: **kept** type Construct (kind) · **dropped** none
- roll 2: **kept** type Construct (kind) · **dropped** none
- roll 3: **kept** type Construct (kind) · **dropped** none

### gm40 s30 — `wyvern rider knight, mounted, lance and shield, wyvern has the stinger`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** type Humanoid (kind), movement fly (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s31 — `like the predator, invisible hunter with a shoulder cannon, collects trophies`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** type Monstrosity (kind) · **dropped** none

### gm40 s32 — `jaws but its a lake and the shark is a ghost`

- roll 1: **kept** type Undead (kind) · **dropped** none
- roll 2: **kept** type Undead (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s33 — `weeping angel type statue, only moves when nobody is looking at it`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s34 — `skelton archer capt`

- roll 1: **kept** type Undead (kind) · **dropped** none
- roll 2: **kept** type Undead (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s35 — `need a quick mook for a cult, 5 of them, knife guys`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** type Humanoid — the quote "cult... knife guys" is not in the game master's words

### gm40 s36 — `something for a desert`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s37 — `can you make a flying monkey that steals hats lol`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** movement fly (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s38 — `The Hollow King | final boss of a level 15 campaign, lich-like but not a lich, three phases`

- roll 1: **kept** none · **dropped** none
- roll 2: **kept** type Undead (kind) · **dropped** none
- roll 3: **kept** none · **dropped** none

### gm40 s39 — `solo boss for 4 level 3 players, a giant toad with a crown`

- roll 1: **kept** type Beast (kind) · **dropped** none
- roll 2: **kept** size Huge (kind), type Beast (kind) · **dropped** none
- roll 3: **kept** size Huge (kind), type Beast (kind) · **dropped** none

### held1 — `a sprite archer`

- roll 1: **kept** type Fey (kind) · **dropped** none
- roll 2: **kept** none · **dropped** none
- roll 3: **kept** type Fey (kind) · **dropped** none

### held2 — `a halfling necromancer`

- roll 1: **kept** type Undead (kind) · **dropped** none
- roll 2: **kept** type Undead (kind) · **dropped** none
- roll 3: **kept** type Undead (kind) · **dropped** none

### held3 — `a hobgoblin sergeant in chain mail`

- roll 1: **kept** type Humanoid (kind), armour chain mail (stated) · **dropped** none
- roll 2: **kept** type Humanoid (kind), armour chain mail (stated) · **dropped** none
- roll 3: **kept** type Humanoid (kind), armour chain mail (stated) · **dropped** none

### held4 — `a rat as big as a wagon`

- roll 1: **kept** size Huge (stated), type Beast (kind) · **dropped** none
- roll 2: **kept** size Huge (stated), type Beast (kind) · **dropped** none
- roll 3: **kept** size Huge (stated), type Beast (kind) · **dropped** none

### held5 — `a scarecrow, vulnerable to fire, 60 HP`

- roll 1: **kept** vulnerable Fire (stated), hp 60 (stated) · **dropped** none
- roll 2: **kept** type Construct (kind), vulnerable Fire (stated), hp 60 (stated) · **dropped** none
- roll 3: **kept** vulnerable Fire (stated), hp 60 (stated) · **dropped** none

### held6 — `a hill giant chief with 4 attacks`

- roll 1: **kept** type Giant (kind), attacks 4 (stated) · **dropped** none
- roll 2: **kept** attacks 4 (stated), type Giant (kind) · **dropped** none
- roll 3: **kept** attacks 4 (stated) · **dropped** none

### held7 — `a lich-queen crowned in black fire`

- roll 1: **kept** type Undead (kind) · **dropped** none
- roll 2: **kept** type Undead (kind) · **dropped** none
- roll 3: **kept** type Undead (kind) · **dropped** none

### held8 — `a bear that heals 5 hit points whenever it bites`

- roll 1: **kept** type Beast (kind) · **dropped** none
- roll 2: **kept** type Beast (kind) · **dropped** none
- roll 3: **kept** type Beast (kind) · **dropped** none
