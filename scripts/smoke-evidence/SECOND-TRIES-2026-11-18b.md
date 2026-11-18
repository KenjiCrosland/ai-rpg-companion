# Second tries — every one, 2026-11-17

One run, live from the seat call, one roll on the 38. Within it, every refusal on the first try is
the before and what its second try did is the after — the same sheet, the same roll.

**14 first-try refusals. 10 landed on the second try, 4 were refused again.** Each entry names the FORM
each answer arrived in, which is this round's subject: the trait seat now takes a Reaction.


## 04-chapel-bell-ringer · the trait seat · **LANDED**

For: **a clause the GM typed**

Arrived as: **a trait** on the first try, **a Reaction, with the save in FIELDS** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "The bell-ringer's spectral bell hangs hollow and ringing with no hand to swing it; when it is struck, the blow sets the bell tolling, and every creature within reach that can hear it hears its own death rung and reels, Frightened until the toll fades.",
      "name": "Death Toll",
      "trigger": "when the chapel bell-ringer is struck by an attack",
      "effect": "The spectral bell tolls; each creature within 30 feet of the bell-ringer that can hear it must succeed on a {dc} Wisdom saving throw or have the Frightened condition until the end of its next turn.",
      "imposes": "Frightened",
      "condition_relation": "inflicts",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 2,
      "passive_effect": "threat"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "The bell-ringer's spectral bell hangs hollow and ringing with no hand to swing it; when it is struck, the blow sets the bell tolling, and every creature within reach that can hear it hears its own death rung and reels, Frightened until the toll fades.",
      "row": "Death Toll"
    }
  ],
  "unplaced": []
}
```

**Why it was refused**
> "Death Toll" — a trait is not a save — the save form takes stat, target and effect as fields and the engine re

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"The bell-ringer's spectral bell hangs hollow and ringing with no hand to swing it; when it is struck, the blow sets the bell tolling, and every creature within reach that can hear it hears its own death rung and reels, Frightened until the toll fades.","name":"Knell of the Struck Bell","trigger":"The chapel bell-ringer is struck by an attack.","save":{"stat":"Wisdom","target":"each creature within 30 feet of the chapel bell-ringer that can hear the bell","damage":false,"type":null,"condition":"Frightened","success":"none"},"imposes":"Frightened","condition_relation":"inflicts","acts":null,"heals":false,"mechanics":1,"quantities":1}],"crossRef":null,"answered":[{"clause":"The bell-ringer's spectral bell hangs hollow and ringing with no hand to swing it; when it is struck, the blow sets the bell tolling, and every creature within reach that can hear it hears its own death rung and reels, Frightened until the toll fades.","row":"Knell of the Struck Bell"}],"unplaced":[]}
```

**Outcome:** it landed as "Knell of the Struck Bell"

**The row as it prints**
> **Knell of the Struck Bell.** *Trigger:* The chapel bell-ringer is struck by an attack. *Response—Wisdom Saving Throw:* DC 13, each creature within 30 feet of the chapel bell-ringer that can hear the bell. *Failure:* The target has the Frightened condition until the end of its next turn.


## 08-orchard-ram-golem · the trait seat · **refused twice**

For: **the model's own idea**

Arrived as: **a trait** on the first try, **a trait** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "Whenever the ram-golem smashes through a wall, door, or barricade, the force of the breach shakes loose a hail of splinters and stone in a burst around the ruins that leaves nearby creatures Blinded until the end of their next turn.",
      "name": "Splintering Breach",
      "trigger": "When the ram-golem breaks through a wall, door, or barricade",
      "effect": "Splinters and stone burst from the ruins in a 15-foot Emanation; each creature in that area must succeed on a Constitution saving throw or be Blinded until the end of its next turn.",
      "imposes": "Blinded",
      "condition_relation": "inflicts",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 2,
      "passive_effect": "ability"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "whenever it smashes through a wall, door, or barricade, the force of the breach shakes loose a hail of splinters and stone in a burst around the ruins that leaves nearby creatures Blinded until the end of their next turn",
      "row": "Splintering Breach"
    }
  ],
  "unplaced": []
}
```

**Why it was refused**
> "Splintering Breach" — the call counts 2 number(s) the row promises and only 1 are written — a promised amount

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[{"clause":"Whenever the ram-golem smashes through a wall, door, or barricade, the force of the breach shakes loose a hail of splinters and stone in a burst around the ruins that leaves nearby creatures Blinded until the end of their next turn.","name":"Splintering Breach","trigger":"When the ram-golem breaks through a wall, door, or barricade","effect":"Splinters and stone burst from the ruins in a 15-foot Emanation; each creature in that area must succeed on a Constitution saving throw (DC {dc}) or be Blinded until the end of its next turn.","imposes":"Blinded","condition_relation":"inflicts","acts":null,"heals":false,"mechanics":1,"quantities":2,"passive_effect":"ability"}],"reactions":[],"crossRef":null,"answered":[{"clause":"whenever it smashes through a wall, door, or barricade, the force of the breach shakes loose a hail of splinters and stone in a burst around the ruins that leaves nearby creatures Blinded until the end of their next turn","row":"Splintering Breach"}],"unplaced":[]}
```

**Outcome:** refused again — "Splintering Breach" — a trait is not a save — the save form takes stat, target and effect


## 10-drowned-choir · the trait seat · **LANDED**

For: **the model's own idea**

Arrived as: **a trait** on the first try, **a Reaction, with the save in FIELDS** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "The choir has no single body to strike: it is one voice wearing many throats. When it takes damage, the wound passes through the chord — any ally of the choir (another drowned singer, a specter of the congregation) within reach of the attacker shrieks the same note, and the attacker must succeed on a Constitution saving throw or be Deafened until the end of its next turn.",
      "name": "Passed Through the Chord",
      "trigger": "when the choir takes damage from an attacker within reach of an ally of the choir",
      "effect": "The allied shrieker's note tears through the attacker; the attacker must succeed on a Constitution saving throw or be Deafened until the end of its next turn.",
      "imposes": "Deafened",
      "condition_relation": "inflicts",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 1,
      "passive_effect": "threat"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "When it takes damage, the wound passes through the chord — any ally of the choir (another drowned singer, a specter of the congregation) within reach of the attacker shrieks the same note, and the attacker must succeed on a Constitution saving throw or be Deafened until the end of its next turn.",
      "row": "Passed Through the Chord"
    }
  ],
  
```

**Why it was refused**
> "Passed Through the Chord" — the call counts 1 number(s) the row promises and only 0 are written — a promised 

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"The choir has no single body to strike: it is one voice wearing many throats. When it takes damage, the wound passes through the chord — any ally of the choir (another drowned singer, a specter of the congregation) within reach of the attacker shrieks the same note, and the attacker must succeed on a Constitution saving throw or be Deafened until the end of its next turn.","name":"The Wound Passes Through the Chord","trigger":"The choir takes damage from an attacker within reach of an ally of the choir.","response":"The ally shrieks the same note back through the chord; the attacker must succeed on a Constitution saving throw or be Deafened until the end of its next turn.","save":{"stat":"Constitution","target":"the attacker","damage":false,"type":null,"condition":"Deafened","success":"none"},"imposes":"Deafened","condition_relation":"inflicts","acts":null,"heals":false,"mechanics":1,"quantities":0}],"crossRef":null,"answered":[{"clause":"When it takes damage, the wound passes through the chord — any ally of the choir (another drowned singer, a specter of the congregation) within reach of the attacker shrieks the same note, and the attacker must succeed on a Constitution saving throw or be Deafened until the end of its next turn.","row":"The Wound Passes Through the Chord"}],"unplaced":[]}
```

**Outcome:** it landed as "The Wound Passes Through the Chord"

**The row as it prints**
> **The Wound Passes Through the Chord (Reaction).** 


## 11-vampire · the trait seat · **LANDED**

For: **a clause the GM typed**

Arrived as: **a trait** on the first try, **a Reaction, with the save in FIELDS** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "Thorn-brambles knit through the vampire's flesh, and when it is struck the wound splits open into a spray of living thorns that lash back at the attacker, leaving them Bleeding and Prone amid a sudden hedge.",
      "name": "Thorn-Quick Revenge",
      "trigger": "when a creature within 5 feet of the vampire hits it with a melee attack",
      "effect": "The attacker must succeed on a {dc} Strength saving throw or take {dmg} Piercing damage and have the Prone condition.",
      "imposes": "Prone",
      "condition_relation": "inflicts",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 2,
      "passive_effect": "threat"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "when it is struck the wound splits open into a spray of living thorns that lash back at the attacker, leaving them Bleeding and Prone amid a sudden hedge",
      "row": "Thorn-Quick Revenge"
    }
  ],
  "unplaced": [
    {
      "clause": "Bleeding",
      "where": "description"
    }
  ]
}
```

**Why it was refused**
> "Thorn-Quick Revenge" — a trait is not a save — the save form takes stat, target and effect as fields and the 

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"Thorn-brambles knit through the vampire's flesh, and when it is struck the wound splits open into a spray of living thorns that lash back at the attacker, leaving them Bleeding and Prone amid a sudden hedge.","name":"Thorn-Quick Revenge","trigger":"A creature within 5 feet of the vampire hits it with a melee attack.","response":"Living thorns burst from the wound and lash back at the attacker.","save":{"stat":"Strength","target":"the triggering creature","damage":true,"type":"Piercing","condition":"Prone","success":"none"},"imposes":"Prone","condition_relation":"inflicts","acts":null,"heals":false,"mechanics":1,"quantities":1}],"crossRef":null,"answered":[{"clause":"when it is struck the wound splits open into a spray of living thorns that lash back at the attacker, leaving them Bleeding and Prone amid a sudden hedge","row":"Thorn-Quick Revenge"}],"unplaced":[{"clause":"Bleeding","where":"description"}]}
```

**Outcome:** it landed as "Thorn-Quick Revenge"

**The row as it prints**
> **Thorn-Quick Revenge (Reaction).** 


## 14-glacier-heart · the action seat · **LANDED**

For: **a clause the GM typed**

Arrived as: **a trait** on the first try, **a trait** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "trailing a wake of killing cold",
      "name": "Rimewake",
      "trigger": "At the start of each of the glacier-heart's turns",
      "effect": "The ground within a 20-foot Emanation of the glacier-heart coats in rime and becomes Difficult Terrain, and a creature that begins its turn in that rime takes {dmg} Cold damage and has its Speed halved until the end of its next turn; the ice does not melt behind it.",
      "imposes": null,
      "condition_relation": "none",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 3,
      "passive_effect": "threat"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [],
  "unplaced": []
}
```

**Why it was refused**
> "Rimewake" — the call counts 3 number(s) the row promises and only 2 are written — a promised amount, area or 

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[{"clause":"trailing a wake of killing cold","name":"Rimewake","trigger":"At the start of each of the glacier-heart's turns","effect":"The ground within a 20-foot Emanation of the glacier-heart coats in rime and becomes Difficult Terrain, and a creature that begins its turn in that rime takes {dmg} Cold damage and has its Speed halved until the end of its next turn; the ice does not melt behind it.","imposes":null,"condition_relation":"none","acts":null,"heals":false,"mechanics":1,"quantities":2,"passive_effect":"threat"}],"reactions":[],"crossRef":null,"answered":[],"unplaced":[]}
```

**Outcome:** it landed as "Rimewake"

**The row as it prints**
> **Rimewake.** 


## 16-molten-king · the action seat · **LANDED**

For: **a clause the GM typed**

Arrived as: **nothing** on the first try, **a save row** on the second.

**The first answer**
```json
{ "attacks": [], "saves": [], "traits": [], "reactions": [], "crossRef": null, "answered": [], "unplaced": [] }
```

**Why it was refused**
> you wrote no row of the kind asked for (an action)

**The second answer**
```json
{"attacks":[],"saves":[{"clause":"rules a city of forges","name":"Weld to the Hand","stat":"Constitution","target":"one creature within 10 feet","damage":false,"type":null,"condition":"Blinded","success":"none","recharge":false}],"traits":[],"reactions":[],"crossRef":null,"answered":[],"unplaced":[]}
```

**Outcome:** it landed as "Weld to the Hand"

**The row as it prints**
> **Weld to the Hand.** *Constitution Saving Throw*: DC 19, each creature in a 30-foot Cone. *Failure:* The target has the Blinded condition until the end of its next turn.


## 17-pit-fiend · the action seat · **refused twice**

For: **a clause the GM typed**

Arrived as: **a trait** on the first try, **a trait** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "collects the oaths of dying knights",
      "name": "Harvest of Broken Oaths",
      "trigger": "when a creature that has sworn an oath dies within 60 feet of the pit fiend",
      "effect": "The pit fiend's eyes flare with pale fire as it draws the dying oath into itself; it regains {dmg} Hit Points and, until the end of its next turn, its Shackle-Flail attacks and Oath-Flense each deal an extra {dmg} Fire damage.",
      "imposes": null,
      "condition_relation": "none",
      "acts": null,
      "heals": true,
      "mechanics": 1,
      "quantities": 2,
      "passive_effect": "ability"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [],
  "unplaced": []
}
```

**Why it was refused**
> "Harvest of Broken Oaths" — it deals damage and heals in one row, which no printed block does (0 of 329)

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[{"clause":"collects the oaths of dying knights","name":"Harvest of Broken Oaths","trigger":"when a creature that has sworn an oath dies within 60 feet of the pit fiend","effect":"The pit fiend draws the dying oath into itself; it regains {dmg} Hit Points.","imposes":null,"condition_relation":"none","acts":null,"heals":true,"mechanics":1,"quantities":1,"passive_effect":"ability"}],"reactions":[],"crossRef":null,"answered":[],"unplaced":[]}
```

**Outcome:** refused again — you wrote no row of the kind asked for (an action)


## 22-vashka-the-red · the trait seat · **refused twice**

For: **a clause the GM typed**

Arrived as: **a trait** on the first try, **a Reaction, with the save in FIELDS** on the second.

**The first answer**
```json
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "As long as Vashka remains adjacent to at least one ally, whenever she or an adjacent ally would be moved against their will, the moving creature must succeed on a Strength saving throw or the movement is prevented.",
      "name": "Shoulder to Shoulder",
      "trigger": "when Vashka or an adjacent ally is subjected to forced movement while she is adjacent to at least one ally",
      "effect": "The creature causing the movement must succeed on a DC {dc} Strength saving throw or the movement is prevented.",
      "imposes": null,
      "condition_relation": "none",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 1,
      "passive_effect": "protection"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "As long as Vashka remains within her planted wall — adjacent to at least one ally — her lacquered plate locks shoulder-to-shoulder with theirs, and whenever she or an adjacent ally would be moved against their will, the moving creature must succeed on a saving throw or the movement is prevented; she will not be shifted from the line while one soldier still stands beside her.",
      "row": "Shoulder to Shoulder"
    }
  ],
  "unplaced": []
}
```
```

**Why it was refused**
> "Shoulder to Shoulder" — a trait is not a save — the save form takes stat, target and effect as fields and the

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"As long as Vashka remains within her planted wall — adjacent to at least one ally — her lacquered plate locks shoulder-to-shoulder with theirs, and whenever she or an adjacent ally would be moved against their will, she will not be shifted from the line while one soldier still stands beside her.","name":"The Line Holds","trigger":"Vashka or an adjacent ally is subjected to forced movement while Vashka is adjacent to at least one ally.","response":"Vashka braces the wall and the moving creature must make a saving throw.","save":{"stat":"Strength","target":"one creature within 5 feet","damage":false,"type":null,"condition":null,"success":"none"},"imposes":null,"condition_relation":"none","acts":null,"heals":false,"mechanics":1,"quantities":0}],"crossRef":null,"answered":[{"clause":"As long as Vashka remains within her planted wall — adjacent to at least one ally — her lacquered plate locks shoulder-to-shoulder with theirs, and whenever she or an adjacent ally would be moved against their will, the moving creature must succeed on a saving throw or the movement is prevented; she will not be shifted from the line while one soldier still stands beside her.","row":"The Line Holds"}],"unplaced":[]}
```

**Outcome:** refused again — it wrote a Reaction, which this seat can take — but "Riposte" is already on the sheet and 


## 27-ilvareth-dusksong · the trait seat · **LANDED**

For: **the model's own idea**

Arrived as: **a trait** on the first try, **a trait** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "Ilvareth's body is not wholly here: dim light and darkness bend toward him, and he can hide from creatures that rely on sight even when only lightly obscured, leaving a smear of deepening gloom where he stood.",
      "name": "Gloamwake",
      "trigger": null,
      "effect": "Ilvareth can take the Hide action while only lightly obscured by dim light or darkness, and he can teleport to an unoccupied space he can see within 30 feet; each creature that relies on sight and is within 10 feet of the space he leaves must succeed on a {dc} Wisdom saving throw or have the Blinded condition until the start of its next turn.",
      "imposes": "Blinded",
      "condition_relation": "inflicts",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 2,
      "passive_effect": "ability"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "lets the creature teleport to a spot it can see instead of walking there",
      "row": "Gloamwake"
    },
    {
      "clause": "dim light and darkness bend toward him, and he can hide from creatures that rely on sight even when only lightly obscured",
      "row": "Gloamwake"
    }
  ],
  "unplaced": [
    {
      "clause": "leaving a smear of deepening gloom where he stood",
      "where": "description"
    }
  ]
}
```

**Why it was refused**
> "Gloamwake" — a trait is not a save — the save form takes stat, target and effect as fields and the engine ren

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[{"clause":"Ilvareth's body is not wholly here: dim light and darkness bend toward him, and he can hide from creatures that rely on sight even when only lightly obscured, leaving a smear of deepening gloom where he stood.","name":"Gloamwake","trigger":null,"effect":"Ilvareth can take the Hide action while only lightly obscured, and he can teleport to an unoccupied space he can see within 30 feet instead of walking there.","imposes":null,"condition_relation":"none","acts":null,"heals":false,"mechanics":1,"quantities":1,"passive_effect":"ability"}],"reactions":[],"crossRef":null,"answered":[{"clause":"lets the creature teleport to a spot it can see instead of walking there","row":"Gloamwake"},{"clause":"dim light and darkness bend toward him, and he can hide from creatures that rely on sight even when only lightly obscured","row":"Gloamwake"}],"unplaced":[{"clause":"leaving a smear of deepening gloom where he stood","where":"description"}]}
```

**Outcome:** it landed as "Gloamwake"

**The row as it prints**
> **Gloamwake.** 


## 28-unblessed-bell-swarm · the trait seat · **LANDED**

For: **the model's own idea**

Arrived as: **a trait** on the first try, **a Reaction** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "Whenever the swarm deals Necrotic damage to a creature, the tolling buries itself in the victim's flesh — the creature is Deafened until the end of its next turn and can't be magically healed until it takes a turn outside the swarm's space.",
      "name": "Toll Buries Deep",
      "trigger": "When the swarm deals Necrotic damage to a creature",
      "effect": "The target is Deafened until the end of its next turn, and it can't be magically healed until it takes a turn outside the swarm's space.",
      "imposes": "Deafened",
      "condition_relation": "inflicts",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 0,
      "passive_effect": "threat"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "Whenever the swarm deals Necrotic damage to a creature, the tolling buries itself in the victim's flesh — the creature is Deafened until the end of its next turn and can't be magically healed until it takes a turn outside the swarm's space.",
      "row": "Toll Buries Deep"
    }
  ],
  "unplaced": []
}
```

**Why it was refused**
> a condition imposed on a hit rides the attack row, never a trait

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"Whenever the swarm deals Necrotic damage to a creature, the tolling buries itself in the victim's flesh — the creature is Deafened until the end of its next turn and can't be magically healed until it takes a turn outside the swarm's space.","name":"Toll Buries Deep","trigger":"When the swarm deals Necrotic damage to a creature","response":"That creature is Deafened until the end of its next turn, and it can't be magically healed until it takes a turn outside the swarm's space.","imposes":"Deafened","condition_relation":"inflicts","acts":null,"heals":false,"mechanics":1,"quantities":0}],"crossRef":null,"answered":[{"clause":"Whenever the swarm deals Necrotic damage to a creature, the tolling buries itself in the victim's flesh — the creature is Deafened until the end of its next turn and can't be magically healed until it takes a turn outside the swarm's space.","row":"Toll Buries Deep"}],"unplaced":[]}
```

**Outcome:** it landed as "Toll Buries Deep"

**The row as it prints**
> **Toll Buries Deep.** *Trigger:* When the swarm deals Necrotic damage to a creature. *Response:* That creature is Deafened until the end of its next turn, and it can't be magically healed until it takes a turn outside the swarm's space.


## 32-steamclaw-ascetic · the action seat · **refused twice**

For: **a clause the GM typed**

Arrived as: **a trait** on the first try, **a decline (it named where the clause belongs)** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "The ascetic flows from form to form without a break: when it hits with Tail Lash and the target fails its save against that attack, the ascetic immediately slips behind the Stunned creature's guard — it may move up to half its Speed without provoking Opportunity Attacks and make one Claw Flurry attack against that target as part of the same action.",
      "name": "Flowing Form",
      "trigger": "When the ascetic hits with Tail Lash and the target fails its save against that attack",
      "effect": "The ascetic moves up to half its Speed without provoking Opportunity Attacks and makes one Claw Flurry attack against that target as part of the same action.",
      "imposes": null,
      "condition_relation": "requires",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 1,
      "passive_effect": "ability"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "The ascetic flows from form to form without a break: when it hits with Tail Lash and the target fails its save against that attack, the ascetic immediately slips behind the Stunned creature's guard — it may move up to half its Speed without provoking Opportunity Attacks and make one Claw Flurry attack against that target as part of the same action.",
      "row": "Flowing Form"
    }
  
```

**Why it was refused**
> "Flowing Form" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, area

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[],"crossRef":null,"answered":[],"unplaced":[{"clause":"The ascetic flows from form to form without a break: when it hits with Tail Lash and the target fails its save against that attack, the ascetic immediately slips behind the Stunned creature's guard — it may move up to half its Speed without provoking Opportunity Attacks and make one Claw Flurry attack against that target as part of the same action.","where":"description"}]}
```

**Outcome:** refused again — it belongs in the description


## 35-meshrin · the action seat · **LANDED**

For: **a clause the GM typed**

Arrived as: **nothing** on the first try, **a save row** on the second.

**The first answer**
```json
{ "attacks": [], "saves": [], "traits": [], "reactions": [], "crossRef": null, "answered": [], "unplaced": [] }
```

**Why it was refused**
> you wrote no row of the kind asked for (a bonus action)

**The second answer**
```json
{"attacks":[],"saves":[{"clause":"Give him a frightening roar","name":"Bone-Challenge","stat":"Wisdom","target":"each creature in a 30-foot Cone","damage":false,"type":null,"condition":"Frightened","movement":null,"success":"none","recharge":false}],"traits":[],"reactions":[],"crossRef":null,"answered":[],"unplaced":[]}
```

**Outcome:** it landed as "Bone-Challenge"

**The row as it prints**
> **Bone-Challenge (Bonus Action).** 


## 36-unyielded-champion · the action seat · **LANDED**

For: **the model's own idea**

Arrived as: **a Reaction** on the first try, **a Reaction** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [],
  "reactions": [
    {
      "clause": "The champion minds nothing but the attack, and steps through the swing that would have turned it aside.",
      "name": "Steps Through the Swing",
      "trigger": "A creature within the champion's reach makes a melee attack against it.",
      "response": "The champion moves up to its Speed straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it makes one Greatsword attack against it.",
      "imposes": null,
      "condition_relation": "none",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 1
    }
  ],
  "crossRef": null,
  "answered": [
    {
      "clause": "When a creature within its reach makes a melee attack against it, the champion can move up to its Speed straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it can make one Greatsword attack against it.",
      "row": "Steps Through the Swing"
    }
  ],
  "unplaced": []
}
```

**Why it was refused**
> "Steps Through the Swing" — the call counts 1 number(s) the row promises and only 0 are written — a promised a

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"The champion minds nothing but the attack, and steps through the swing that would have turned it aside.","name":"Steps Through the Swing","trigger":"A creature within the champion's reach makes a melee attack against it.","response":"The champion moves up to its Speed straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it makes one Greatsword attack against it.","imposes":null,"condition_relation":"none","acts":null,"heals":false,"mechanics":1,"quantities":0}],"crossRef":null,"answered":[{"clause":"When a creature within its reach makes a melee attack against it, the champion can move up to its Speed straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it can make one Greatsword attack against it.","row":"Steps Through the Swing"}],"unplaced":[]}
```

**Outcome:** it landed as "Steps Through the Swing"

**The row as it prints**
> **Steps Through the Swing.** *Trigger:* A creature within the champion's reach makes a melee attack against it. *Response:* The champion moves up to its Speed straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it makes one Greatsword attack against it.


## 38-brother-halric · the trait seat · **LANDED**

For: **the model's own idea**

Arrived as: **a trait** on the first try, **a Reaction, with the save in FIELDS** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "Halric's grave-wrappings are soaked in the seep of the village he poisoned; a creature that grapples him or clings to him takes in the rot through every seam it finds, so laying hands on the shepherd is its own kind of confession.",
      "name": "Confession of Seams",
      "trigger": "when a creature starts its turn grappling Brother Halric or clinging to him",
      "effect": "That creature must make a Constitution saving throw ({dc}) or have the Poisoned condition until the end of its next turn.",
      "imposes": "Poisoned",
      "condition_relation": "inflicts",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 1,
      "passive_effect": "threat"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "a creature that grapples him or clings to him takes in the rot through every seam it finds",
      "row": "Confession of Seams"
    },
    {
      "clause": "laying hands on the shepherd is its own kind of confession",
      "row": "Confession of Seams"
    }
  ],
  "unplaced": []
}
```

**Why it was refused**
> "Confession of Seams" — a trait is not a save — the save form takes stat, target and effect as fields and the 

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"Halric's grave-wrappings are soaked in the seep of the village he poisoned; a creature that grapples him or clings to him takes in the rot through every seam it finds, so laying hands on the shepherd is its own kind of confession.","name":"Confession of Seams","trigger":"A creature grapples Brother Halric or starts its turn grappling or clinging to him.","response":"The rot seeps through every seam it finds.","save":{"stat":"Constitution","target":"the triggering creature","damage":false,"type":null,"condition":"Poisoned","success":"none"}}],"crossRef":null,"answered":[{"clause":"a creature that grapples him or clings to him takes in the rot through every seam it finds","row":"Confession of Seams"},{"clause":"laying hands on the shepherd is its own kind of confession","row":"Confession of Seams"}],"unplaced":[]}
```

**Outcome:** it landed as "Confession of Seams"
