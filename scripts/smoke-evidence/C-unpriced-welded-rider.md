## 01. Sable Vex — CR 7

**Input:** `a mercenary duelist with a notched saber and a dagger in the off hand`
**Donor:** skirmisher-3 -> CR 7
**Signature:** custom · **elapsed** 13s

### Block
```
Sable Vex
Medium humanoid, neutral
Armor Class

16 (chain mail)

Hit Points: 

117 (18d8 + 36)

Speed: 

50 ft.

STR	DEX	CON	INT	WIS	CHA


12 (+1)

	

18 (+4)

	

15 (+2)

	

8 (-1)

	

12 (+1)

	

8 (-1)

Skills: 

Perception +4, Stealth +7

Saving Throws: 

DEX +7

Senses: 

darkvision 60 ft., passive Perception 14

Languages: 

Common, Thieves' Cant

Challenge

7 (2,900 XP)

Proficiency Bonus:

+3

Crowd Step. The sable vex ignores difficult terrain, and opportunity attacks against it are made with disadvantage.
Fleet Agility. As a bonus action, the sable vex takes the Dash or Disengage action.
```

### Trace
```
[concept] synthesis: archetype=skirmisher type=Humanoid themes=armed mind=sapient lore=✓
[concept] lore: Once a celebrated champion of the fighting pits, she sold her blade to the highest bidder and now haunts the back alleys of merchant cities, taking contracts on those who can't afford protection.
[concept] resolve: archetype=skirmisher type=Humanoid themes=armed mind=sapient style=— energy=— mix=physical identity=✓ lore=✓
[concept] name: not provided — the input describes, the generator names it
[concept] mechanics: none claimed
[concept] signature elements: notched saber [object] | off-hand dagger [object] | mercenary duelist [behavior]
[concept] identity: The duelist opens by feinting with her dagger, then lunges with her notched saber to exploit any opening, using mobility to slip past defenders and cut down the weakest target. Each round she circles her prey, keeping them off-balance with alternating off-hand jabs and precise, bleeding slashes, never staying in one place. When bloodied, she disengages with a flourish and vanishes into the crowd, only to return when the odds favor her.
[concept] lore: Once a celebrated champion of the fighting pits, she sold her blade to the highest bidder and now haunts the back alleys of merchant cities, taking contracts on those who can't afford protection.
[reskin] donor: skirmisher-3 -> CR 7
[reskin] seats: action <- "mercenary duelist" | trait <- "notched saber"
[reskin] trait wildcard rejected — an ON-HIT RIDER lives on the attack row itself, never in a trait (0/329 print traits key on the creature's own hits; the Tollkeeper's crook rider, 2026-09-14) — weld the clause into that row's text instead: When the creature hits a creature with its Dagger attack, the target's next attack roll against the creature before the 
[reskin] informed wildcard — written against the assembled sheet
[reskin] wildcard rejected — a rider rides the hit — address "the target"; no separate targeting frame: One creature within 30 feet that the sable vex has hit with a Dagger or Notched Saber this turn must succeed on a DC 14 
[reskin] repair trait draft rejected — active mechanics in a passive trait (a damage roll, a save FRAME, a bonus action, or a use limit — mentioning saves or attack rolls passively is fine): When the creature hits with its Dagger attack, the target's next attack roll against the creature be
[reskin] trait repair failed — active mechanics in a passive trait (a damage roll, a save FRAME, a bonus action, or a use limit — mentioning saves or attack rolls passively is fine); no trait ships
[reskin] rider appended to "Dagger": When the sable vex hits with this attack, the target must succeed on a DC 14 Dexterity saving throw or take 18 (4d8) Slashing damage and have the Bleeding condition (1d6 damage at the start of each of its turns). Regardless of the save's outcome, the sable vex can immediately move up to half its speed without provoking Opportunity Attacks. — shipped over a judgment flag (call the creature "the creature" — the assembler stamps the printed short form, and "the bleeding" is a second nickname fracturing the sheet's voice)
[reskin] lint: phrasing-rider-save: 2014 rider-save phrasing in Actions/Dagger — rider saves use the skeleton too: "*<Ability> Saving Throw:* DC n, <target>. *Failure:* <effect>"
[reskin] audit: [Dagger: The single Dagger entry bundles a hit-trig… This effect can be applied only once per turn.")]
[reskin] done: "Sable Vex" — donor skirmisher-3, CR 7
[reskin] 2014 conversion: one lint-gated call — both printings saved
```
