## 04. Bone-Swarm — CR 13

**Input:** `a swarm of grave beetles that strips a body to bone in seconds`
**Donor:** swarm-9 -> CR 13 (invented — no printed peer)
**Signature:** custom · **elapsed** 15s

### Block
```
Bone-Swarm
Tiny swarm of Tiny beasts, unaligned
Armor Class

15

Hit Points: 

188 (29d4 + 116)

Speed: 

30 ft., climb 30 ft., burrow 30 ft.

STR	DEX	CON	INT	WIS	CHA


8 (-1)

	

20 (+5)

	

18 (+4)

	

4 (-3)

	

10 (+0)

	

2 (-4)

Damage Resistances: 

bludgeoning, piercing, slashing

Condition Immunities: 

charmed, frightened, grappled, paralyzed, petrified, prone, restrained, stunned

Senses: 

blindsight 30 ft., darkvision 60 ft., passive Perception 10

Languages: 

None

Challenge

13 (10,000 XP)

Proficiency Bonus:

+5

Carrion Dormancy. The swarm can burrow through corpses and loose earth, and it has advantage on Dexterity (Stealth) checks made to hide within a corpse or grave soil. While dormant inside a corpse, it is indistinguishable from ordinary carrion insects.
Swarm. The swarm can occupy another creature's space and vice versa, and the swarm can move through any opening large enough for a Tiny creature. The swarm can't regain hit points or gain temporary hit points.
Grave Tide (Recharge 5-6) (Reaction). When one creature within 30 feet that the swarm can see must make a DC 17 Dexterity saving throw, taking 14 (4d6) slashing damage plus 14 (4d6) necrotic damage on a failed save, or half as much damage on a successful one. If the target is poisoned by this swarm, it is also incapacitated until the end of its next turn. If this damage reduces the target to 0 hit points, the target is stripped to a skeleton and the swarm regains 10 hit points.
```

### Trace
```
[concept] synthesis: archetype=lurker type=Beast themes=grave/devouring mind=mindless lore=✓
[concept] lore: Grave beetles are a necromantic infestation that breeds in unburied battlefields, consuming the dead until their hunger turns to the living; they retain the memories of every corpse they have stripped, seeking out the living to add to their collective corpse-memory.
[concept] resolve: archetype=lurker type=Beast themes=grave/devouring mind=mindless style=trap energy=Necrotic mix=both identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: engulf
[concept] signature elements: stripping flesh to bone in seconds [behavior] | swarming mass of chitinous beetles [body] | burrowing into corpses [behavior]
[concept] identity: The grave-beetle swarm lies dormant within a corpse's ribcage or beneath the soil, indistinguishable from ordinary carrion insects, until a living creature comes within reach — then it erupts in a single black tide, stripping flesh to bone in seconds before the victim can react. After the first horrific round, the swarm disperses into chittering clouds that skitter across the battlefield, forcing enemies to flee or be caught in the grinding mass. When reduced to half its hit points, it does not retreat — it scatters into hundreds of individual beetles that burrow into the earth and reform at a nearby corpse, rising again in a fresh attack.
[concept] lore: Grave beetles are a necromantic infestation that breeds in unburied battlefields, consuming the dead until their hunger turns to the living; they retain the memories of every corpse they have stripped, seeking out the living to add to their collective corpse-memory.
[reskin] body type: swarm — the body outranks the role (recorded: lurker)
[reskin] donor: swarm-9 -> CR 13 (invented — no printed peer)
[reskin] seats: action <- "stripping flesh to bone in seconds" | trait <- "swarming mass of chitinous beetles"
[reskin] swarm type stamped: Beast -> Swarm of Tiny Beasts
[reskin] trait wildcard: "Carrion Dormancy"
[reskin] informed wildcard — written against the assembled sheet
[reskin] wildcard rejected — one save per action — a second nested save is the fragment class (3 sightings); print ESCALATES on the existing state instead: the Mummy's "If the target is already Frightened by this, it also..." — key the escalation on the condition, never on a second roll: One creature within 30 feet that the swarm can see must make a DC 17 Dexterity saving throw, taking 21 (6d6) slashing da
[reskin] wildcard repaired: One creature within 30 feet that the swarm can see must make a DC 17 Dexterity saving throw, taking 
[reskin] immunities stamped for type: Swarm of Tiny Beasts + donor suite -> Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned
[reskin] resistances derived: Bludgeoning, Piercing, Slashing
[reskin] vulnerability rejected — "Fire" has no warrant in the concept's own text (print's default is none)
[reskin] lint: reaction-trigger: Reactions/Grave Tide (Recharge 5-6) has no trigger — a Reaction is not a free action; it must state when it fires: "*Trigger:* <specific event>. *Response:* <what the creature does>." | swarm-heal-contradiction: Reactions/Grave Tide (Recharge 5-6) heals the swarm, but the Swarm trait says it can't regain Hit Points — the healing is stripped (heal-only entries are removed) | orphan-condition-ref: "Poisoned" is referenced as a state but nothing on the sheet applies it | phrasing-save-2014: Reactions/Grave Tide (Recharge 5-6): 2014 save grammar — the skeleton is "*<Ability> Saving Throw:* DC n, <target>. *Failure:* <effect>"
[reskin] audit: [Grave Tide (Recharge 5-6): Nothing in the statbloc…o Incapacitated until the end of its next turn."), Carrion Dormancy: The block provides no Dormant st…ndistinguishable from ordinary carrion insects.")]
[reskin] done: "Bone-Swarm" — donor swarm-9, CR 13
[reskin] 2014 conversion: one lint-gated call — both printings saved
```
