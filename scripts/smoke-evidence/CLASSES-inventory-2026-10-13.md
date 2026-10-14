# Class features: the inventory before landing two (2026-10-13)

The owner's question before building: "should these be templates?" This is the
reading that answers it with receipts. Three buckets: what the engine already
produces, what print lets us lift verbatim, and what has to be authored.

## The finding that decides it

Print's 2024 SRD carries **26 Humanoid blocks**, and between them exactly
**thirteen** distinct Traits, Bonus Actions and Reactions, plus two non-weapon
Actions. Of those, two are already in the engine and most of the rest are not
class features at all:

```
Cunning Action (Assassin 8, Spy 1)      Evasion (Assassin 8)
Bloodied Frenzy (Berserker 2)           Divine Aid (Priest 2, Priest Acolyte 1/4)
Protective Magic (Mage 6, Archmage 12)  Misty Step (Mage 6, Archmage 12)
Spiritual Weapon (Cultist Fanatic 2)    Captain's Charm (Pirate Captain 6)
Enthralling Panache (Pirate 1)          Shield Bash (Gladiator 5)
Pack Tactics, Training, Magic Resistance, Deathless Agility, Vampiric Connection
```

There is no Action Surge, no Second Wind, no Martial Arts, no Stunning Strike, no
Divine Smite, no Rage, no Wild Shape, no Hunter's Mark anywhere in print's
monsters. **The verbatim well is nearly dry**, so the species pattern — lift the
SRD row, rename it to the creature — covers only a handful of class features.
Everything a GM is most likely to name has to be authored in print's grammar, and
authored rules text in this engine has exactly one home: the catalog.

That settles it. **The rows are templates. The class is a kit entry.** A class
table says "a monk is these template ids plus this lift, in this order, under the
row cap", the way the species table already says "a lizardfolk is Hold Breath plus
a terrain-walk shape".

## A. Already in the engine

| class feature | where it lives | engine name | how close |
| --- | --- | --- | --- |
| Fighting Style ×6 | feature table `STYLES` | Archery, Defense, Dueling, Great Weapon Fighting, Protection, Two-Weapon Fighting | exact |
| Sneak Attack | feature table | Sneak Attack | exact |
| Great Weapon Master | feature table | Great Weapon Master | exact |
| weapon mastery ×7 | feature table | Topple, Push, Sap, Slow, Vex, Graze, Cleave | exact; Nick is the one 2024 property not mapped |
| Trip Attack, Riposte | feature table + catalog `riposte` | same | exact |
| Evasion | catalog `evasion` (cites Assassin) | Evasion | exact |
| Assassinate | catalog `assassinate` | Assassinate | exact |
| Cunning Action | the skulker chassis row | Cunning Action | exact |
| Rage / Reckless Attack | catalog `bloodied-fury` | Bloodied Fury | print's Bloodied Frenzy minus the saves half |
| Frenzy (going berserk) | catalog `berserk` | Berserk | print's Berserker idiom |
| Divine Smite | catalog `coating` | Venomed Edge | the shape IS a smite: a bonus action that charges the next hit for extra typed damage |
| Divine Strike | catalog `coating` | — | the same frame at will, once per turn |
| Step of the Wind | catalog `feint-slip` | Feinting Step | Disengage as a bonus action, plus a defensive clause |
| Bardic Inspiration | catalog seed `rally` | Bolstering Cry | the same seat, temporary Hit Points instead of a die |
| Hunter's Mark | catalog `bolt-mark` / seed `focus` | Marking Bolt / Predatory Focus | kin, not the spell |
| Wild Shape | the `shifter` style | — | the engine already shapes a shifter's rows |

**Three classes need no new catalog rows at all**: rogue (Cunning Action, Sneak
Attack, Evasion, Assassinate), fighter (six styles, seven masteries, Great Weapon
Master, Trip Attack, Riposte), barbarian (Bloodied Fury, Berserk, Rampage).

## B. Liftable verbatim from print (the species pattern)

| print row | source | what it serves |
| --- | --- | --- |
| Bloodied Frenzy | Berserker CR 2 | barbarian Rage, with the saving-throw half |
| Divine Aid | Priest CR 2 | cleric Channel Divinity |
| Spiritual Weapon | Cultist Fanatic CR 2 | cleric bonus-action attack |
| Protective Magic | Mage CR 6 | wizard/sorcerer defensive reaction |
| Misty Step | Mage CR 6 | sorcerer/wizard mobility |
| Captain's Charm | Pirate Captain CR 6 | bard/leader charm |
| Enthralling Panache | Pirate CR 1 | the same, at low CR |
| Shield Bash | Gladiator CR 5 | fighter/shield action |

Eight rows, each with its own CR so `liftSrdRow` can rewrite the self-reference
and the DC exactly as the species kit does.

## C. Must be authored as templates

Each needs CR frames, a role list, and a section, because each is a number that
scales. The nearest print kin is named so the grammar is print's, not ours.

| feature | section | nearest print kin |
| --- | --- | --- |
| Martial Arts | rider on the unarmed row | the Monk's own die progression; print's riders (`affliction`, `pounce`) give the frame |
| Stunning Strike | rider | `contagion` (an on-hit save that imposes a condition) |
| Action Surge | bonus action, 1/Day | print's legendary economy is the only kin; frame it as one extra attack |
| Second Wind | bonus action, 2/Day | `warded-mending` is the healing frame |
| Uncanny Dodge | reaction | `interpose` (the reaction frame; the effect is self, not an ally) |
| Deflect Attacks | reaction | the same frame, a damage reduction |
| Patient Defense | bonus action | `guarded-stance` is passive; this is the Dodge action |
| Aura of Protection | trait | `truth-aura`, `gaze-aura` (an emanation that changes saves) |
| Lay on Hands | bonus action, 2/Day | `warded-mending` |

Nine rows, four of them bonus actions or reactions, which the catalog's gate
chain and value check already know how to price. Monk and paladin account for six
of the nine, so they are the expensive classes; cleric, bard, wizard and sorcerer
are mostly lifts plus the Spellcasting row they already get.

## The landing order this implies

1. **The class table and the two paths**, with rogue, fighter and barbarian — no
   new catalog rows, so the first landing tests the mechanism, not new content.
   A class the GM names lands non-competitively, the way the seat's owed trait
   does. An implied cue goes through `templatesFor` and the fit call, where the
   GM's words rank the menu.
2. **The eight lifts**, which is table data in the species idiom.
3. **The nine authored templates**, monk and paladin first since they are the
   most-named.

Two rules carry over from this sprint. A class template needs a `requires_claim`
so it only enters a fit menu when a class cue is present, or every menu grows and
picks get weaker. And a class row that duplicates a chassis grant is dropped by
the dedupe-by-effect rule, which is what already keeps Cunning Action and Cat's
Dash from both granting Dash.

One open question for the owner, not blocking: the feature table is a third home
for class features, and its standalone traits (Sneak Attack, Great Weapon Master)
are template-shaped rows with no CR bands. Its weapon riders genuinely are edits
to another row and belong where they are. Folding the two traits into the catalog
would leave two homes instead of three, and the rogue needs Sneak Attack anyway.

---

## Landing one of two: the kit, and the three classes that needed no new rows

Landed the same day as the inventory. The table is `reskin/classes.mjs`, 50 lines,
the same shape as the species table.

**The two paths, one of which needed no code.** A class the GM *names* owes its
rows and lands them non-competitively, the way the seat's owed trait does. A class
the words only *imply* lands nothing from the kit, because the catalog already
offers every one of these templates and `rankByVerb` already ranks them by the
GM's own verbs. Their key lists are rich enough to carry it: `evasion` keys on
nimble, dodge, agile, tumbles; `assassinate` on stalk, unseen, ambush, first
strike; `bloodied-fury` on rage, frenzy, cornered. So the implied tier is the fit
call's, and "trigger is not eligibility" cost nothing to honour.

**Eligibility is by mind.** A bestial or mindless creature learns no class, and
with no declared mind the floor is INT 6, the same floor the alignment rule uses.
Nothing reads the creature's type, so an imp or a satyr may be a rogue.

**Two tiers, copied from the species table.** What the words owe is free: a print
lift the named class carries, and a row the GM's words asked for by name. What
the class merely implies waits for room under print's row cap at that CR.

**What the three classes now carry.** Receipts from live generations, all gates
clean:

| prompt | the kit landed | from |
| --- | --- | --- |
| a tiefling rogue who stalks the rooftops | Cunning Action, Assassinate | print's Assassin; "stalks" asked for the second |
| a knight who holds the line with a shield and a longsword | Riposte, Guarded Stance | catalog, and the Riposte names the sheet's own Longsword |
| a goliath berserker who loses control when wounded | Bloodied Frenzy, Berserk | print's Berserker; "loses control" asked for the second |

Evasion and Rampage yielded to the row cap on two of those sheets, which is print's
density doing its job and is visible in the trace.

**Two defects the landing surfaced and fixed.** The first context I built for the
class rows omitted the sheet's melee-row fields, so the knight's Riposte made a
"Slam" attack that was not a row, and the structure gate caught it. The row-cap
check also ran before the dedupe, so a row the sheet already carried was reported
as yielded rather than as already present.

**Pins:** `classes.spec.js`, ten tests — the table resolves, eligibility by mind,
a keyed row waiting for the words, the lift being print's own text, each of the
three classes end to end, an implied class landing nothing, a print body landing
nothing, and no row added twice.

```
full suite      185 suites, 5,294 passed, 26 skipped
npm run build   clean
```

**Next in this landing:** the eight print lifts (table data), then the nine
authored templates with monk and paladin first. One follow-up worth its own round:
the feature table's style cue does not include the word "fighter", so a named
fighter earns its styles only through this kit. Widening that cue is a behaviour
change that deserves its own evidence.

## Landing two of two: the print lifts

Six classes now. Three more entries — cleric, mage and bard — built entirely from
print's own rows, which is the species pattern with no new rules text at all.

| class | row | source | gate |
| --- | --- | --- | --- |
| cleric | Divine Aid | Priest CR 2 | 3/Day |
| cleric | Spiritual Weapon | Cultist Fanatic CR 2 | 2/Day |
| mage | Protective Magic | Mage CR 6 | 3/Day |
| mage | Misty Step | Mage CR 6 | 3/Day |
| bard | Captain's Charm | Pirate Captain CR 6 | at will |
| bard | Bolstering Cry | catalog `rally` | 2/Day |

The mage entry covers wizard and sorcerer words in one table row rather than two
near-identical entries; the trace and the row's `kit` field read `mage`.

**Three rules the lifts needed.**

*A lift keeps print's own use limit.* Print writes it into the row name, so
`liftSrdRow` was matching "Divine Aid" against "Divine Aid (3/Day)" and finding
nothing. It now matches the bare name and hands the gate back, and a lifted row
prints print's limit.

*A lift carries no dice.* Print's numbers are print's CR's. The Gladiator's Shield
Bash lifts as "9 (2d4 + 4)", which is wrong at every other CR, so it is **not** a
lift — it moves to the authored list. `classes.spec.js` pins the invariant across
the whole table, with Shield Bash as the counter-example on record, so a future
lift with dice cannot slip in.

*A caster feature needs something to refer to.* Print's rows say "using the same
spellcasting ability as Spellcasting", which refers to nothing on a sheet with no
Spellcasting row. A class row may now name a row the sheet must already carry,
and a priest the GM asked to have "no magic at all" gets no Divine Aid.

**A bug the pins caught.** The lifted rows template their DC as `{dc}`, and the
class path filled `{inline}` but not `{dc}`, so the bard's charm would have
shipped "DC {dc}". Fixed, and the landing now refuses any row with an unfilled
slot rather than shipping the token.

**Receipts**, all gates clean:

```
cleric  Multiattack | Mace | Spellcasting | Protective Magic (3/Day) | Divine Aid (3/Day)(cleric)
mage    Multiattack | Arcane Burst | Spellcasting | Sealing Touch | Protective Magic (3/Day) | Misty Step (3/Day)(mage)
bard    Multiattack | Rapier | Spellcasting | Debt of Ruin | Captain's Charm(bard)
```

On a caster chassis, Protective Magic is already a donor row, so the mage's lift
dedupes by name and only Misty Step lands — and Misty Step landed because "steps
away" asked for it by key.

```
full suite      185 suites, 5,300 passed, 26 skipped
npm run build   clean
```

**Still to author**, the nine templates from the inventory plus Shield Bash:
monk's Martial Arts and Stunning Strike, paladin's Divine Smite and Aura of
Protection, fighter's Action Surge and Second Wind, Uncanny Dodge, Deflect
Attacks, Patient Defense, Lay on Hands. Six of those are monk and paladin.

---

## Landing three: the authored rows (2026-10-14)

The inventory listed nine features to author plus Shield Bash. **Five were
written. Five were refused, and the refusals are the more useful half.**

### Written, as catalog shapes with CR frames and the engine's numbers

| id | section | gate | the printed row whose grammar it copies |
| --- | --- | --- | --- |
| `stunning-strike` | rider on the melee row | — | Contagion's on-hit save frame |
| `patient-defense` | bonus action | — | Cunning Action's grammar, on print's Dodge |
| `lay-on-hands` | bonus action | 2/Day | Warded Mending's healing frame |
| `second-wind` | bonus action | 2/Day | the same frame, turned on itself |
| `shield-bash` | action | — | Gladiator/Shield Bash, with our dice for print's |

Four are marked `invented` and sit in the catalog's own invention ledger, which a
test holds exactly. Shield Bash is **cited**, not invented: print's row with the
engine's `{avg_half} ({dice_half})` in place of print's CR 5 "9 (2d4 + 4)".

### Refused, with reasons

- **Deflect Attacks** and **Uncanny Dodge** reduce incoming damage, which this
  engine forbids outright: its own prompts say "No traits that halve/reduce
  incoming damage or grant resistance to everything." Authoring them would have
  contradicted the instruction the engine gives the model.
- **Action Surge** is an extra Attack action. No band can price it, and the value
  check would have no floor to measure it against.
- **Martial Arts** is invisible on a statblock. It is the unarmed row's own die,
  which the engine owns. A monk's identity on a sheet is Stunning Strike and its
  mobility, not a die the reader never sees.
- **Aura of Protection** turned out not to need authoring at all: print's
  Hobgoblin Captain carries **Aura of Authority**, dice-free, which lifts cleanly.

A test pins all four refusals so none of them creeps back in, and scans every
class row's frames for damage-reduction language.

### Monk and paladin

```
monk      Multiattack | Open Hand[+Stunning Strike] | ... | Hold Breath(lizardfolk)
paladin   Multiattack | ... | Aura of Authority(paladin) | Divine Smite (2/Day)(paladin)
fighter   Guarded Stance | ... | Shield Bash(fighter) | Riposte(fighter) | Second Wind (2/Day)(fighter)
```

The paladin's smite is the `coating` seed under the table's own name. A seed named
"Venomed Edge" on a paladin was the first thing this landing got wrong, and the
table now names a row when the name means something to the class.

### Four defects this landing surfaced, all fixed

1. **A rider is not a section.** The first version pushed Stunning Strike into a
   section called "Rider", which no GM reads. A rider rides its host attack row,
   as the signature path has always done, and the host carries the provenance.
2. **The rider was silently dropped.** A later pass restores an attack row's
   pristine pre-rename text when a damage rider collapses, and that capture
   predates the class kit, so the monk's clause vanished from the sheet after the
   trace said it landed. The kit's clause now survives that rebuild.
3. **"monk" was a print alias for the Priest.** A lizardfolk monk came out with
   Mace, Radiant Flame, Spellcasting and Divine Aid — a cleric-shaped NPC — and
   the monk's rider rode a row the swap then removed. The alias is gone; the
   class table owns the word. Most class words *are* print aliases and most are
   right (rogue to the Spy, cleric to the Priest, paladin to the Knight, wizard
   to the Mage), and a test now records which.
4. **A new shape outbid an old one on a formation phrase.** `shield-bash` keyed on
   the bare word "shield", so a sergeant who "keeps the shield line" drew a shield
   bash instead of the Volley Order an existing pin expects. A shield line is a
   formation; the bash now waits for bash, buckler or "slams its shield", and the
   bare word is still answered by Guarded Stance.

### Known gap for the critic

A kit rider rides a chassis row. If a print body later replaces that row set, the
rider leaves with the row it rode. The monk-to-Priest alias was the one case that
did this and it is fixed, but the shape of the exposure remains: the trace will
say the rider landed and the sheet will not have it. The host selection now
refuses print's own rows, which closes the common half.

```
full suite      185 suites, 5,306 passed, 26 skipped
npm run build   clean
```

Classes now cover eight: rogue, fighter, barbarian, cleric, mage, bard, monk,
paladin. Three took no new rows, three took print's lifts, two took the five
authored shapes.
