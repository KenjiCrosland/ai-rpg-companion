# Second tries — every one, 2026-11-17

One run, live from the seat call, one roll on the 38. Within it, every refusal on the first try is
the before and what its second try did is the after — the same sheet, the same roll.

**13 first-try refusals. 5 landed on the second try, 8 were refused again.** Each entry names the FORM
each answer arrived in, which is this round's subject: the trait seat now takes a Reaction.


## 04-chapel-bell-ringer · the trait seat · **refused twice**

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
      "name": "Soul's Knell",
      "trigger": "when the bell-ringer is struck by an attack",
      "effect": "The bell tolls, and each creature within 30 feet of the bell-ringer that can hear it must succeed on a {dc} Wisdom saving throw or become Frightened of the bell-ringer until the end of its next turn.",
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
      "clause": "when it is struck, the blow sets the bell tolling, and every creature within reach that can hear it hears its own death rung and reels, Frightened until the toll fades",
      "row": "Soul's Knell"
    }
  ],
  "unplaced": []
}
```

**Why it was refused**
> "Soul's Knell" — a trait is not a save — the save form takes stat, target and effect as fields and the engine 

**The second answer**
```json
{ "attacks": [], "saves": [], "traits": [], "reactions": [{ "clause": "The bell-ringer's spectral bell hangs hollow and ringing with no hand to swing it; when it is struck, the blow sets the bell tolling, and every creature within reach that can hear it hears its own death rung and reels, Frightened until the toll fades.", "name": "Toll of Her Own Death", "trigger": "The bell-ringer is struck by an attack.", "save": { "stat": "Wisdom", "target": "each creature within 30 feet of the bell-ringer that can hear it", "damage": false, "type": null, "condition": "Frightened", "success": "none" }, "imposes": "Frightened", "condition_relation": "inflicts", "acts": null, "heals": false, "mechanics": 1, "quantities": 1 }], "crossRef": null, "answered": [{ "clause": "when it is struck, the blow sets the bell tolling, and every creature within reach that can hear it hears its own death rung and reels, Frightened until the toll fades", "row": "Toll of Her Own Death" }], "unplaced": [] }
```

**Outcome:** refused again — "Toll of Her Own Death" — the call counts 1 number(s) the row promises and only 0 are writ


## 07-hydra · the trait seat · **LANDED**

For: **a clause the GM typed**

Arrived as: **a trait** on the first try, **a trait** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "Whenever the hydra takes Slashing or Piercing damage that would sever flesh, caustic smoke billows from the wound and its flesh knits itself closed, and its severed stumps smolder and seal instead of sprouting new heads — so that at the start of each of its turns, if it has been wounded since its last turn, it regains a portion of its hit points in a haze of scalding vapor.",
      "name": "Sealing Smoke",
      "trigger": "when the hydra has been wounded since its last turn",
      "effect": "At the start of its turn, the hydra regains {dmg} Hit Points in a haze of scalding vapor.",
      "imposes": null,
      "condition_relation": "none",
      "acts": null,
      "heals": true,
      "mechanics": 1,
      "quantities": 1,
      "passive_effect": "protection"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "Whenever the hydra takes Slashing or Piercing damage that would sever flesh, caustic smoke billows from the wound and its flesh knits itself closed, and its severed stumps smolder and seal instead of sprouting new heads — so that at the start of each of its turns, if it has been wounded since its last turn, it regains a portion of its hit points in a haze of scalding vapor.",
      "row": "Sealing Smoke"
    }
  ],
  "unplaced": []
}
```

**Why it was refused**
> the row keys on a state it never defines

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[{"clause":"Whenever the hydra takes Slashing or Piercing damage that would sever flesh, caustic smoke billows from the wound and its flesh knits itself closed, and its severed stumps smolder and seal instead of sprouting new heads — so that at the start of each of its turns, if it has been wounded since its last turn, it regains a portion of its hit points in a haze of scalding vapor.","name":"Sealing Smoke","trigger":"the hydra has taken damage from an attack since the end of its last turn","effect":"At the start of its turn, the hydra regains {dmg} Hit Points in a haze of scalding vapor.","imposes":null,"condition_relation":"none","acts":null,"heals":true,"mechanics":1,"quantities":1,"passive_effect":"protection"}],"reactions":[],"crossRef":null,"answered":[{"clause":"Whenever the hydra takes Slashing or Piercing damage that would sever flesh, caustic smoke billows from the wound and its flesh knits itself closed, and its severed stumps smolder and seal instead of sprouting new heads — so that at the start of each of its turns, if it has been wounded since its last turn, it regains a portion of its hit points in a haze of scalding vapor.","row":"Sealing Smoke"}],"unplaced":[]}
```

**Outcome:** it landed as "Sealing Smoke"

**The row as it prints**
> **Sealing Smoke.** 


## 08-orchard-ram-golem · the trait seat · **refused twice**

For: **the model's own idea**

Arrived as: **a trait** on the first try, **a Reaction, with the save in FIELDS** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "The ram-golem's body is iron-shot timber lashed with living orchard bark, and whenever it smashes through a wall, door, or barricade, the force of the breach shakes loose a hail of splinters and stone in a burst around the ruins that leaves nearby creatures Blinded until the end of their next turn.",
      "name": "Splintering Breach",
      "trigger": "When the ram-golem smashes through a wall, door, or barricade",
      "effect": "Splinters and stone burst in a 15-foot Emanation; each creature in that area must make a DC {dc} Dexterity saving throw or be Blinded until the end of its next turn.",
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
      "clause": "The ram-golem's body is iron-shot timber lashed with living orchard bark, and whenever it smashes through a wall, door, or barricade, the force of the breach shakes loose a hail of splinters and stone in a burst around the ruins that leaves nearby creatures Blinded until the end of their next turn.",
      "row": "Splintering Breach"
    }
  ],
  "unplaced": []
}
```

**Why it was refused**
> "Splintering Breach" — a trait is not a save — the save form takes stat, target and effect as fields and the e

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"The ram-golem's body is iron-shot timber lashed with living orchard bark, and whenever it smashes through a wall, door, or barricade, the force of the breach shakes loose a hail of splinters and stone in a burst around the ruins that leaves nearby creatures Blinded until the end of their next turn.","name":"Splintering Breach","trigger":"The ram-golem smashes through a wall, door, or barricade.","response":"","save":{"stat":"Dexterity","target":"each creature in a 15-foot Emanation originating from the breach","damage":false,"type":null,"condition":"Blinded","success":"none"},"imposes":"Blinded","condition_relation":"inflicts","acts":null,"heals":false,"mechanics":1,"quantities":1}],"crossRef":null,"answered":[{"clause":"The ram-golem's body is iron-shot timber lashed with living orchard bark, and whenever it smashes through a wall, door, or barricade, the force of the breach shakes loose a hail of splinters and stone in a burst around the ruins that leaves nearby creatures Blinded until the end of their next turn.","row":"Splintering Breach"}],"unplaced":[]}
```

**Outcome:** refused again — "Splintering Breach" — the call counts 1 number(s) the row promises and only 0 are written


## 10-drowned-choir · the trait seat · **refused twice**

For: **the model's own idea**

Arrived as: **a trait** on the first try, **a Reaction, with the save in FIELDS** on the second.

**The first answer**
```json
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "The choir has no single body to strike: it is one voice wearing many throats. When it takes damage, the wound passes through the chord — any ally of the choir (another drowned singer, a specter of the congregation) within reach of the attacker shrieks the same note, and the attacker must succeed on a Constitution saving throw or be Deafened until the end of its next turn.",
      "name": "Chorus of Wounds",
      "trigger": "While an ally of the choir is within reach of a creature that damages the choir",
      "effect": "That ally shrieks the wound's note back at the attacker, which must succeed on a Constitution saving throw ({dc}) or be Deafened until the end of its next turn.",
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
      "clause": "The choir has no single body to strike: it is one voice wearing many throats. When it takes damage, the wound passes through the chord — any ally of the choir (another drowned singer, a specter of the congregation) within reach of the attacker shrieks the same note, and the attacker must succeed on a Constitution saving throw or be Deafened until the
```

**Why it was refused**
> "Chorus of Wounds" — a trait is not a save — the save form takes stat, target and effect as fields and the eng

**The second answer**
```json
{ "attacks": [], "saves": [], "traits": [], "reactions": [{ "clause": "The choir has no single body to strike: it is one voice wearing many throats. When it takes damage, the wound passes through the chord — any ally of the choir (another drowned singer, a specter of the congregation) within reach of the attacker shrieks the same note, and the attacker must succeed on a Constitution saving throw or be Deafened until the end of its next turn.", "name": "Chorus of Wounds", "trigger": "A creature within reach of an ally of the choir deals damage to the choir.", "response": "That ally shrieks the wound's note back at the attacker.", "save": { "stat": "Constitution", "target": "the triggering creature", "damage": false, "type": null, "condition": "Deafened", "success": null }, "imposes": "Deafened", "condition_relation": "inflicts", "acts": null, "heals": false, "mechanics": 1, "quantities": 1 }], "crossRef": null, "answered": [{ "clause": "The choir has no single body to strike: it is one voice wearing many throats. When it takes damage, the wound passes through the chord — any ally of the choir (another drowned singer, a specter of the congregation) within reach of the attacker shrieks the same note, and the attacker must succeed on a Constitution saving throw or be Deafened until the end of its next turn.", "row": "Chorus of Wounds" }], "unplaced": [] }
```

**Outcome:** refused again — "Chorus of Wounds" — the call counts 1 number(s) the row promises and only 0 are written —


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
      "name": "Thorn-Crown Reprisal",
      "trigger": "when a creature hits the vampire with a melee attack",
      "effect": "Living thorns burst from the wound and lash the attacker: it makes a Constitution saving throw ({dc}) or takes {dmg} Piercing damage and has the Prone condition as a hedge of brambles coils around it.",
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
      "clause": "when it is struck the wound splits open into a spray of living thorns that lash back at the attacker",
      "row": "Thorn-Crown Reprisal"
    },
    {
      "clause": "leaving them Bleeding and Prone amid a sudden hedge",
      "row": "Thorn-Crown Reprisal"
    }
  ],
  "unplaced": []
}
```

**Why it was refused**
> "Thorn-Crown Reprisal" — a trait is not a save — the save form takes stat, target and effect as fields and the

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"Thorn-brambles knit through the vampire's flesh, and when it is struck the wound splits open into a spray of living thorns that lash back at the attacker, leaving them Bleeding and Prone amid a sudden hedge.","name":"Thorn-Crown Reprisal","trigger":"when a creature hits the vampire with a melee attack","response":"Living thorns burst from the wound and lash back at the attacker, coiling a hedge of brambles around it","save":{"stat":"Constitution","target":"the triggering creature","damage":true,"type":"Piercing","condition":"Prone","success":"none"}}],"crossRef":null,"answered":[{"clause":"when it is struck the wound splits open into a spray of living thorns that lash back at the attacker","row":"Thorn-Crown Reprisal"},{"clause":"leaving them Bleeding and Prone amid a sudden hedge","row":"Thorn-Crown Reprisal"}],"unplaced":[{"clause":"Bleeding","where":"description"}]}
```

**Outcome:** it landed as "Thorn-Crown Reprisal"

**The row as it prints**
> **Thorn-Crown Reprisal (Reaction).** 


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
      "name": "Rime Trail",
      "trigger": "At the start of each of its turns",
      "effect": "The ground within a 20-foot Emanation and along the swath the glacier-heart has already crossed coats in rime and becomes Difficult Terrain until the glacier-heart moves or is destroyed; a creature that begins its turn in this frozen wake takes {dmg} Cold damage and its Speed is halved until the end of its next turn.",
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
> "Rime Trail" — the call counts 3 number(s) the row promises and only 2 are written — a promised amount, area o

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[{"clause":"trailing a wake of killing cold","name":"Campaign of Ice","trigger":"At the start of each of its turns","effect":"The ground within a 20-foot Emanation of the glacier-heart and along the swath it has already crossed coats in rime and becomes Difficult Terrain until the glacier-heart is destroyed; a creature that begins its turn there takes {dmg} Cold damage and its Speed is halved until the end of its next turn.","imposes":null,"condition_relation":"none","acts":null,"heals":false,"mechanics":1,"quantities":2,"passive_effect":"threat"}],"reactions":[],"crossRef":null,"answered":[],"unplaced":[]}
```

**Outcome:** it landed as "Campaign of Ice"

**The row as it prints**
> **Campaign of Ice.** 


## 17-pit-fiend · the action seat · **refused twice**

For: **a clause the GM typed**

Arrived as: **nothing** on the first try, **a trait** on the second.

**The first answer**
```json
{ "attacks": [], "saves": [], "traits": [], "reactions": [], "crossRef": null, "answered": [], "unplaced": [] }
```

**Why it was refused**
> you wrote no row of the kind asked for (an action)

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[{"clause":"collects the oaths of dying knights","name":"Ledger of Broken Vows","trigger":"when a creature dies within 120 feet of the pit fiend","effect":"The pit fiend gathers the dead creature's final oath into its chain and regains {dmg} Hit Points; if the creature swore an oath to a deity or a code, the pit fiend also regains one expended use of Legendary Resistance","imposes":null,"condition_relation":"none","acts":null,"heals":false,"mechanics":1,"quantities":1,"passive_effect":"none"}],"reactions":[],"crossRef":null,"answered":[],"unplaced":[]}
```

**Outcome:** refused again — you wrote no row of the kind asked for (an action)


## 20-trench-leviathan · the trait seat · **LANDED**

For: **the model's own idea**

Arrived as: **a trait** on the first try, **a Reaction, with the save in FIELDS** on the second.

**The first answer**
```json
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "The leviathan's body is a resonant chamber of trench-pressure and black water. When it hits with Coils, the target must succeed on a Constitution saving throw or have the Deafened condition until the start of the leviathan's next turn as the impact rings through its bones.",
      "name": "Ringing of the Deep",
      "trigger": "When the leviathan hits with Coils",
      "effect": "The target must succeed on a {dc} Constitution saving throw or have the Deafened condition until the start of the leviathan's next turn.",
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
  "answered": [],
  "unplaced": []
}
```
```

**Why it was refused**
> "Ringing of the Deep" — a trait is not a save — the save form takes stat, target and effect as fields and the 

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"The leviathan's body is a resonant chamber of trench-pressure and black water. When it hits with Coils, the target must succeed on a Constitution saving throw or have the Deafened condition until the start of the leviathan's next turn as the impact rings through its bones.","name":"Ringing of the Deep","trigger":"The leviathan hits a creature with Coils.","response":"The blow rings through the target's bones.","save":{"stat":"Constitution","target":"one creature within 10 feet","damage":false,"type":null,"condition":"Deafened","success":null},"imposes":"Deafened","condition_relation":"inflicts","acts":null,"heals":false,"mechanics":1,"quantities":0}],"crossRef":null,"answered":[{"clause":"The leviathan's body is a resonant chamber of trench-pressure and black water. When it hits with Coils, the target must succeed on a Constitution saving throw or have the Deafened condition until the start of the leviathan's next turn as the impact rings through its bones.","row":"Ringing of the Deep"}],"unplaced":[]}
```

**Outcome:** it landed as "Ringing of the Deep"

**The row as it prints**
> **Ringing of the Deep.** *Trigger:* The leviathan hits a creature with Coils. *Response—Constitution Saving Throw:* DC 24, one creature within 10 feet. *Failure:* The target has the Deafened condition.


## 22-vashka-the-red · the trait seat · **refused twice**

For: **a clause the GM typed**

Arrived as: **a trait** on the first try, **a Reaction, with the save in FIELDS** on the second.

**The first answer**
```json
{ "attacks": [], "saves": [], "traits": [ { "clause": "As long as Vashka remains within her planted wall — adjacent to at least one ally — her lacquered plate locks shoulder-to-shoulder with theirs, and whenever she or an adjacent ally would be moved against their will, the moving creature must succeed on a saving throw or the movement is prevented.", "name": "Locked Shields", "trigger": "While Vashka is adjacent to at least one ally, when she or an adjacent ally would be moved against their will", "effect": "The creature attempting the movement must succeed on a {dc} Strength saving throw, or the movement is prevented and she will not be shifted from the line while one soldier still stands beside her.", "imposes": null, "condition_relation": "none", "acts": null, "heals": false, "mechanics": 1, "quantities": 1, "passive_effect": "protection" } ], "reactions": [], "crossRef": null, "answered": [ { "clause": "whenever she or an adjacent ally would be moved against their will, the moving creature must succeed on a saving throw or the movement is prevented", "row": "Locked Shields" } ], "unplaced": [] }
```

**Why it was refused**
> "Locked Shields" — a trait is not a save — the save form takes stat, target and effect as fields and the engin

**The second answer**
```json
{ "attacks": [], "saves": [], "traits": [], "reactions": [ { "clause": "As long as Vashka remains within her planted wall — adjacent to at least one ally — her lacquered plate locks shoulder-to-shoulder with theirs, and whenever she or an adjacent ally would be moved against their will, the moving creature must succeed on a saving throw or the movement is prevented; she will not be shifted from the line while one soldier still stands beside her.", "name": "Locked Shields", "trigger": "While Vashka is adjacent to at least one ally, when she or that ally would be moved against their will.", "response": "The movement is prevented.", "save": { "stat": "Strength", "target": "one creature within 5 feet", "damage": false, "type": null, "condition": null, "success": "none" } } ], "crossRef": null, "answered": [ { "clause": "whenever she or an adjacent ally would be moved against their will, the moving creature must succeed on a saving throw or the movement is prevented", "row": "Locked Shields" } ], "unplaced": [] }
```

**Outcome:** refused again — it wrote a Reaction, which this seat can take — but "Riposte" is already on the sheet and 


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
      "name": "Toll Buries Itself",
      "trigger": "Whenever the swarm deals Necrotic damage to a creature",
      "effect": "The target is Deafened until the end of its next turn and can't be magically healed until it takes a turn outside the swarm's space.",
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
      "clause": "the creature is Deafened until the end of its next turn",
      "row": "Toll Buries Itself"
    },
    {
      "clause": "can't be magically healed until it takes a turn outside the swarm's space",
      "row": "Toll Buries Itself"
    }
  ],
  "unplaced": []
}
```

**Why it was refused**
> a condition imposed on a hit rides the attack row, never a trait

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"Whenever the swarm deals Necrotic damage to a creature, the tolling buries itself in the victim's flesh — the creature is Deafened until the end of its next turn and can't be magically healed until it takes a turn outside the swarm's space.","name":"Toll Buries Itself","trigger":"The swarm deals Necrotic damage to a creature.","response":"The tolling buries itself in the victim's flesh: the creature is Deafened until the end of its next turn and can't be magically healed until it takes a turn outside the swarm's space.","imposes":"Deafened","condition_relation":"inflicts","acts":null,"heals":false,"mechanics":1,"quantities":0}],"crossRef":null,"answered":[{"clause":"the creature is Deafened until the end of its next turn","row":"Toll Buries Itself"},{"clause":"can't be magically healed until it takes a turn outside the swarm's space","row":"Toll Buries Itself"}],"unplaced":[]}
```

**Outcome:** it landed as "Toll Buries Itself"

**The row as it prints**
> **Toll Buries Itself.** *Trigger:* The swarm deals Necrotic damage to a creature. *Response:* The tolling buries itself in the victim's flesh: the creature is Deafened until the end of its next turn and can't be magically healed until it takes a turn outside the swarm's space.


## 35-meshrin · the trait seat · **refused twice**

For: **the model's own idea**

Arrived as: **a trait** on the first try, **a decline (it named where the clause belongs)** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "Meshrin never suffers the Frightened condition, and at the start of each of its turns each creature within 30 feet of it that can see or hear it must succeed on a Wisdom saving throw or have the Frightened condition for 1 minute, the condition ending early on a creature that ends its turn more than 30 feet from Meshrin.",
      "name": "River-War Bellow",
      "trigger": "At the start of each of Meshrin's turns",
      "effect": "Each creature within 30 feet of Meshrin that can see or hear it must succeed on a {dc} Wisdom saving throw or have the Frightened condition for 1 minute, and Meshrin is immune to the Frightened condition.",
      "imposes": "Frightened",
      "condition_relation": "inflicts",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 2,
      "passive_effect": "protection"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "while he starts his turn with no ally within reach and any foe Frightened of him, he only presses deeper",
      "row": "River-War Bellow"
    },
    {
      "clause": "Meshrin never suffers the Frightened condition",
      "row": "River-War Bellow"
    }
  ],
  "unplaced": [
    {
      "clause": "his face turns red in a way a reader recognizes as a red haze",
      "where": "description"
    },
   
```

**Why it was refused**
> "River-War Bellow" — a trait is not a save — the save form takes stat, target and effect as fields and the eng

**The second answer**
```json
{ "attacks": [], "saves": [], "traits": [], "reactions": [], "crossRef": null, "answered": [], "unplaced": [ { "clause": "While Meshrin is Frightened himself — nothing dares flee from him, so instead the fury turns inward: when he starts his turn with no ally within reach and any foe Frightened of him, he only presses deeper, and his face turns red in a way a reader recognizes as a red haze; but the mechanical truth is that Meshrin never suffers the Frightened condition — a veteran of river wars has screamed down the", "where": "description" }, { "clause": "an at-will roar that forces nearby foes to make a save or become Frightened of Meshrin for a short duration", "where": "description" } ] }
```

**Outcome:** refused again — it belongs in the description


## 36-unyielded-champion · the action seat · **refused twice**

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
      "clause": "The champion minds nothing but the attack, and steps through the swing that would have turned it aside. When a creature within its reach makes a melee attack against it, the champion can move up to its Speed straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it can make one Greatsword attack against it.",
      "name": "Close the Gap",
      "trigger": "A creature within the champion's reach makes a melee attack against it.",
      "response": "The champion moves up to its Speed straight toward that creature without provoking Opportunity Attacks, then makes one Greatsword attack against it if it ends this move within reach.",
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
      "clause": "The champion minds nothing but the attack, and steps through the swing that would have turned it aside. When a creature within its reach makes a melee attack against it, the champion can move up to its Speed straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it can make one Greatsword attack against it.",
      "r
```

**Why it was refused**
> "Close the Gap" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount, are

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"The champion minds nothing but the attack, and steps through the swing that would have turned it aside. When a creature within its reach makes a melee attack against it, the champion can move up to its Speed straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it can make one Greatsword attack against it.","name":"Close the Gap","trigger":"A creature within the champion's reach makes a melee attack against it.","response":"The champion moves up to its Speed straight toward that creature without provoking Opportunity Attacks, then, if it ends this move within reach of the attacker, makes one Greatsword attack against it.","imposes":null,"condition_relation":"none","acts":null,"heals":false,"mechanics":1,"quantities":1}],"crossRef":null,"answered":[{"clause":"The champion minds nothing but the attack, and steps through the swing that would have turned it aside. When a creature within its reach makes a melee attack against it, the champion can move up to its Speed straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it can make one Greatsword attack against it.","row":"Close the Gap"}],"unplaced":[]}
```

**Outcome:** refused again — "Close the Gap" — the call counts 1 number(s) the row promises and only 0 are written — a 


## 38-brother-halric · the action seat · **refused twice**

For: **the model's own idea**

Arrived as: **a trait** on the first try, **a decline (it named where the clause belongs)** on the second.

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "The wound from Halric's grave-wrapped hand does not shut — it blackens, itches, and will not be healed; a creature he wounds is plague-touched, and while that rot holds, his diagnoses find their mark and his touch against that creature bites deeper. The rot is written into the flesh, not the air, so it must be scoured or allowed to run its course.",
      "name": "Plague-Touched Wound",
      "trigger": "When Brother Halric hits a creature with Grave-Wrapped Hand",
      "effect": "The target is plague-touched until it finishes a Long Rest: it has Disadvantage on saving throws against Brother Halric's Diagnosis of Sin, Brother Halric has Advantage on attack rolls against it, and Grave-Wrapped Hand deals an extra {dmg} Necrotic damage to it. The rot cannot be ended by healing and only a Remove Curse or Greater Restoration spells scours it early.",
      "imposes": null,
      "condition_relation": "none",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 1,
      "passive_effect": "bonus"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "a creature he wounds is plague-touched, and while that rot holds, his diagnoses find their mark and his touch against that creature bites deeper",
      "row": "Plague-Touched Wound"
    },
    {
      "
```

**Why it was refused**
> you wrote no row of the kind asked for (an action)

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[],"crossRef":null,"answered":[],"unplaced":[{"clause":"The wound from Halric's grave-wrapped hand does not shut — it blackens, itches, and will not be healed; a creature he wounds is plague-touched, and while that rot holds, his diagnoses find their mark and his touch against that creature bites deeper. The rot is written into the flesh, not the air, so it must be scoured or allowed to run its course.","where":"description","note":"This is a lasting mark applied by an existing attack (Grave-Wrapped Hand), not an action of its own. Written as a rider inside an action it would duplicate the attack row; written as a trait it is a passive, not the action asked for. It belongs as prose attached to Grave-Wrapped Hand, or as an attack rider — neither of which is one of the closed forms offered here."}]}
```

**Outcome:** refused again — it belongs in the description
