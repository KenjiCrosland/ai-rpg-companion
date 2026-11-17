# Second tries — every one, 2026-11-17

One run, live from the seat call, one roll on the 38. Within it, every refusal on the first try is
the before and what its second try did is the after — the same sheet, the same roll.

**13 first-try refusals. 3 landed on the second try, 10 were refused again.** That is under half, so
by the handoff's own rule this stops here and is reported rather than built on.


## 04-chapel-bell-ringer · the trait seat · **refused twice**

For: **a clause the GM typed**

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "The bell-ringer's spectral bell hangs hollow and ringing with no hand to swing it; when it is struck, the blow sets the bell tolling, and every creature within reach that can hear it hears its own death rung and reels, Frightened until the toll fades.",
      "name": "Hollow Toll",
      "trigger": "when the chapel bell-ringer takes damage from a melee attack",
      "effect": "The spectral bell tolls, and each creature within 30 feet that can hear it must succeed on a {dc} Wisdom saving throw or have the Frightened condition until the end of its next turn.",
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
      "row": "Hollow Toll"
    }
  ],
  "unplaced": []
}
```

**Why it was refused**
> "Hollow Toll" — a trait is not a save — the save form takes stat, target and effect as fields and the engine r

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[],"crossRef":null,"answered":[],"unplaced":[{"clause":"The bell-ringer's spectral bell hangs hollow and ringing with no hand to swing it; when it is struck, the blow sets the bell tolling, and every creature within reach that can hear it hears its own death rung and reels, Frightened until the toll fades.","row":"Written as the save form (the form its mechanic belongs in): trigger when the chapel bell-ringer takes damage from a melee attack; the spectral bell tolls; each creature within 30 feet that can hear it makes a Wisdom saving throw, Frightened until the end of its next turn on a failure, as a recharge-limited effect. It cannot be a trait, which costs nothing and holds no save; and it cannot be a reaction without rewriting into a Reaction trigger and response."}]}
```

**Outcome:** refused again — it belongs in the description


## 08-orchard-ram-golem · the trait seat · **refused twice**

For: **the model's own idea**

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "Whenever the ram-golem smashes through a wall, door, or barricade, the force of the breach shakes loose a hail of splinters and stone in a burst around the ruins.",
      "name": "Splintering Breach",
      "trigger": "when the ram-golem smashes through a wall, door, or barricade",
      "effect": "Splinters and stone burst in a 15-foot Emanation centered on the breached structure; each creature in that Emanation must succeed on a DC {dc} Dexterity saving throw or take {dmg} Piercing damage and have the Blinded condition until the end of its next turn.",
      "imposes": "Blinded",
      "condition_relation": "inflicts",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 3,
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
{"attacks":[],"saves":[{"clause":"Whenever the ram-golem smashes through a wall, door, or barricade, the force of the breach shakes loose a hail of splinters and stone in a burst around the ruins.","name":"Splintering Breach","stat":"Constitution","target":"each creature in a 15-foot Emanation centered on the breached structure","damage":false,"type":null,"condition":"Blinded","movement":null,"success":"none","recharge":false}],"traits":[],"reactions":[],"crossRef":null,"answered":[{"clause":"The ram-golem's body is iron-shot timber lashed with living orchard bark, and whenever it smashes through a wall, door, or barricade, the force of the breach shakes loose a hail of splinters and stone in a burst around the ruins that leaves nearby creatures Blinded until the end of their next turn.","row":"Splintering Breach"}],"unplaced":[]}
```

**Outcome:** refused again — you wrote no a trait


## 10-drowned-choir · the trait seat · **refused twice**

For: **the model's own idea**

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "The choir has no single body to strike: it is one voice wearing many throats. When it takes damage, the wound passes through the chord — any ally of the choir (another drowned singer, a specter of the congregation) within reach of the attacker shrieks the same note, and the attacker must succeed on a Constitution saving throw or be Deafened until the end of its next turn.",
      "name": "Shriek Back Through the Chord",
      "trigger": "When the choir is damaged by a creature while an ally of the choir is within reach of that creature",
      "effect": "That ally shrieks the wound back at the attacker, who must succeed on a {dc} Constitution saving throw or be Deafened until the end of its next turn.",
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

**Why it was refused**
> "Shriek Back Through the Chord" — a trait is not a save — the save form takes stat, target and effect as field

**The second answer**
```json
{"attacks":[],"saves":[{"clause":"The choir has no single body to strike: it is one voice wearing many throats. When it takes damage, the wound passes through the chord — any ally of the choir (another drowned singer, a specter of the congregation) within reach of the attacker shrieks the same note, and the attacker must succeed on a Constitution saving throw or be Deafened until the end of its next turn.","name":"Shriek Back Through the Chord","stat":"Constitution","target":"one creature within 5 feet","damage":false,"type":null,"condition":"Deafened","movement":null,"success":"none","recharge":false}],"traits":[],"reactions":[],"crossRef":null,"answered":[{"clause":"any ally of the choir ... within reach of the attacker shrieks the same note, and the attacker must succeed on a Constitution saving throw or be Deafened until the end of its next turn","row":"Shriek Back Through the Chord"}],"unplaced":[]}
```

**Outcome:** refused again — you wrote no a trait


## 11-vampire · the trait seat · **refused twice**

For: **a clause the GM typed**

**The first answer**
```json
{ "attacks": [], "saves": [], "traits": [ { "clause": "Thorn-brambles knit through the vampire's flesh, and when it is struck the wound splits open into a spray of living thorns that lash back at the attacker, leaving them Bleeding and Prone amid a sudden hedge.", "name": "Wound-Split Brambles", "trigger": "when a creature within 5 feet hits the vampire with a melee attack", "effect": "The attacker must succeed on a {dc} Strength saving throw or take {dmg} Piercing damage and have the Prone condition as the thorns lash it down into a sudden hedge.", "imposes": "Prone", "condition_relation": "inflicts", "acts": null, "heals": false, "mechanics": 1, "quantities": 2, "passive_effect": "threat" } ], "reactions": [], "crossRef": null, "answered": [ { "clause": "Thorn-brambles knit through the vampire's flesh, and when it is struck the wound splits open into a spray of living thorns that lash back at the attacker, leaving them Bleeding and Prone amid a sudden hedge.", "row": "Wound-Split Brambles" } ], "unplaced": [] }
```

**Why it was refused**
> "Wound-Split Brambles" — a trait is not a save — the save form takes stat, target and effect as fields and the

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"Thorn-brambles knit through the vampire's flesh, and when it is struck the wound splits open into a spray of living thorns that lash back at the attacker, leaving them Bleeding and Prone amid a sudden hedge.","name":"Wound-Split Brambles","trigger":"when a creature hits the vampire with a melee attack","response":"The attacker must succeed on a {dc} Strength saving throw or take {dmg} Piercing damage and have the Prone condition as living thorns lash it down into a sudden hedge.","imposes":"Prone","condition_relation":"inflicts","acts":null,"heals":false,"mechanics":1,"quantities":2}],"crossRef":null,"answered":[{"clause":"Thorn-brambles knit through the vampire's flesh, and when it is struck the wound splits open into a spray of living thorns that lash back at the attacker, leaving them Bleeding and Prone amid a sudden hedge.","row":"Wound-Split Brambles"}],"unplaced":[]}
```

**Outcome:** refused again — you wrote no a trait


## 14-glacier-heart · the action seat · **LANDED**

For: **a clause the GM typed**

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "trailing a wake of killing cold",
      "name": "Rime-Wake",
      "trigger": "At the start of each of its turns",
      "effect": "The ground within a 15-foot Emanation of the glacier-heart coats in rime and becomes Difficult Terrain until the end of its next turn; a creature that begins its turn in that rime takes {dmg} Cold damage and has its Speed halved until the end of its next turn.",
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
> "Rime-Wake" — the call counts 3 number(s) the row promises and only 2 are written — a promised amount, area or

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[{"clause":"trailing a wake of killing cold","name":"Rime-Wake","trigger":"At the start of each of its turns","effect":"The ground within a 15-foot Emanation of the glacier-heart coats in rime and becomes Difficult Terrain until the end of its next turn; a creature that begins its turn in that rime takes {dmg} Cold damage and has its Speed halved until the end of its next turn.","imposes":null,"condition_relation":"none","acts":null,"heals":false,"mechanics":1,"quantities":2,"passive_effect":"threat"}],"reactions":[],"crossRef":null,"answered":[],"unplaced":[]}
```

**Outcome:** it landed as "Rime-Wake"

**The row as it prints**
> **Rime-Wake.** 


## 17-pit-fiend · the action seat · **refused twice**

For: **the model's own idea**

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "collects the oaths of dying knights",
      "name": "Harvest of Broken Vows",
      "trigger": "when a creature within 60 feet of the pit fiend drops to 0 Hit Points",
      "effect": "The pit fiend gathers the dying creature's oath, gaining {dmg} Temporary Hit Points and, until the end of its next turn, its Shackle-Flail attacks deal an extra {dmg} Fire damage.",
      "imposes": null,
      "condition_relation": "none",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 3,
      "passive_effect": "bonus"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [],
  "unplaced": []
}
```

**Why it was refused**
> you wrote no an action

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[],"crossRef":null,"answered":[],"unplaced":[{"clause":"collects the oaths of dying knights","where":"description"}]}
```

**Outcome:** refused again — it belongs in the description


## 20-trench-leviathan · the trait seat · **refused twice**

For: **the model's own idea**

**The first answer**
```json
{ "attacks": [], "saves": [], "traits": [ { "clause": "When it hits with Coils, the target must succeed on a Constitution saving throw or have the Deafened condition until the start of the leviathan's next turn as the impact rings through its bones.", "name": "Hull-Drowning Resonance", "trigger": "When the leviathan hits with Coils", "effect": "The target must succeed on a {dc} Constitution saving throw or have the Deafened condition until the start of the leviathan's next turn.", "imposes": "Deafened", "condition_relation": "inflicts", "acts": null, "heals": false, "mechanics": 1, "quantities": 1, "passive_effect": "threat" } ], "reactions": [], "crossRef": null, "answered": [ { "clause": "When it hits with Coils, the target must succeed on a Constitution saving throw or have the Deafened condition until the start of the leviathan's next turn as the impact rings through its bones.", "row": "Hull-Drowning Resonance" } ], "unplaced": [] }
```

**Why it was refused**
> "Hull-Drowning Resonance" — a trait is not a save — the save form takes stat, target and effect as fields and 

**The second answer**
```json
{"attacks":[],"saves":[{"clause":"When it hits with Coils, the target must succeed on a Constitution saving throw or have the Deafened condition until the start of the leviathan's next turn as the impact rings through its bones.","name":"Hull-Drowning Resonance","stat":"Constitution","target":"one creature within 10 feet","damage":false,"type":null,"condition":"Deafened","movement":null,"success":"none","recharge":false}],"traits":[],"reactions":[],"crossRef":null,"answered":[{"clause":"When it hits with Coils, the target must succeed on a Constitution saving throw or have the Deafened condition until the start of the leviathan's next turn as the impact rings through its bones.","row":"Hull-Drowning Resonance"}],"unplaced":[]}
```

**Outcome:** refused again — you wrote no a trait


## 22-vashka-the-red · the trait seat · **refused twice**

For: **a clause the GM typed**

**The first answer**
```json
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "Vashka's lacquered plate locks shoulder-to-shoulder with an adjacent ally's; while she is adjacent to at least one ally, whenever she or that ally would be moved against their will, the moving creature must succeed on a {dc} Strength saving throw or the movement is prevented.",
      "name": "Shoulder to Shoulder",
      "trigger": "while Vashka is adjacent to at least one ally and she or that ally would be moved against their will",
      "effect": "The creature moving Vashka or her adjacent ally must succeed on a {dc} Strength saving throw or the forced movement is prevented.",
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
  "answered": [],
  "unplaced": []
}
```
```

**Why it was refused**
> "Shoulder to Shoulder" — a trait is not a save — the save form takes stat, target and effect as fields and the

**The second answer**
```json
{"attacks": [], "saves": [], "traits": [], "reactions": [], "crossRef": null, "answered": [], "unplaced": [{"clause": "Vashka's lacquered plate locks shoulder-to-shoulder with an adjacent ally's; while she is adjacent to at least one ally, whenever she or that ally would be moved against their will, the moving creature must succeed on a {dc} Strength saving throw or the movement is prevented.", "where": "description"}]}
```

**Outcome:** refused again — it belongs in the description


## 28-unblessed-bell-swarm · the trait seat · **refused twice**

For: **the model's own idea**

**The first answer**
```json
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "Whenever the swarm deals Necrotic damage to a creature, the tolling buries itself in the victim's flesh — the creature is Deafened until the end of its next turn and can't be magically healed until it takes a turn outside the swarm's space.",
      "name": "Toll Buries In",
      "trigger": "Whenever the swarm deals Necrotic damage to a creature",
      "effect": "The creature is Deafened until the end of its next turn and can't be magically healed until it takes a turn outside the swarm's space.",
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
      "row": "Toll Buries In"
    }
  ],
  "unplaced": []
}
```
```

**Why it was refused**
> a condition imposed on a hit rides the attack row, never a trait

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[],"crossRef":null,"answered":[],"unplaced":[{"clause":"Whenever the swarm deals Necrotic damage to a creature, the tolling buries itself in the victim's flesh — the creature is Deafened until the end of its next turn and can't be magically healed until it takes a turn outside the swarm's space.","where":"the Censer Swing row: it is a rider on the attack (Deafened until the end of its next turn, and no magical healing until it takes a turn outside the swarm's space), not a standalone trait — the Deafened condition and the healing block must attach to the hit that delivers the Necrotic damage"}]}
```

**Outcome:** refused again — it belongs in the description


## 32-steamclaw-ascetic · the trait seat · **refused twice**

For: **the model's own idea**

**The first answer**
```json
{
  "attacks": [],
  "saves": [],
  "traits": [
    {
      "clause": "Pressure Without Pause. The ascetic reads stances the way others read faces: when a creature within its reach has been Stunned, Grappled, or knocked Prone since the end of the ascetic's last turn, the ascetic's attacks against that creature are made with Advantage, and the ascetic has Advantage on saves against effects the creature imposes on it.",
      "name": "Pressure Without Pause",
      "trigger": "When a creature within the ascetic's reach has been Stunned, Grappled, or knocked Prone since the end of the ascetic's last turn",
      "effect": "The ascetic has Advantage on attack rolls against that creature and on saving throws against effects it imposes.",
      "imposes": null,
      "condition_relation": "requires",
      "acts": null,
      "heals": false,
      "mechanics": 1,
      "quantities": 0,
      "passive_effect": "bonus"
    }
  ],
  "reactions": [],
  "crossRef": null,
  "answered": [
    {
      "clause": "Pressure Without Pause. The ascetic reads stances the way others read faces: when a creature within its reach has been Stunned, Grappled, or knocked Prone since the end of the ascetic's last turn, the ascetic's attacks against that creature are made with Advantage, and the ascetic has Advantage on saves against effects the creature imposes on it.",
      "row": "Pressure Without Paus
```

**Why it was refused**
> "Pressure Without Pause" — a trait is not a save — the save form takes stat, target and effect as fields and t

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[{"clause":"Pressure Without Pause. The ascetic reads stances the way others read faces: when a creature within its reach has been Stunned, Grappled, or knocked Prone since the end of the ascetic's last turn, the ascetic's attacks against that creature are made with Advantage, and the ascetic has Advantage on saves against effects the creature imposes on it.","name":"Pressure Without Pause","trigger":"While a creature within the ascetic's reach has been Stunned, Grappled, or knocked Prone since the end of the ascetic's last turn","effect":"The ascetic has Advantage on attack rolls against that creature and on saving throws against effects it imposes.","imposes":null,"condition_relation":"requires","acts":null,"heals":false,"mechanics":1,"quantities":0,"passive_effect":"bonus"}],"reactions":[],"crossRef":null,"answered":[{"clause":"Pressure Without Pause. The ascetic reads stances the way others read faces: when a creature within its reach has been Stunned, Grappled, or knocked Prone since the end of the ascetic's last turn, the ascetic's attacks against that creature are made with Advantage, and the ascetic has Advantage on saves against effects the creature imposes on it.","row":"Pressure Without Pause"}],"unplaced":[]}
```

**Outcome:** refused again — "Pressure Without Pause" — a trait is not a save — the save form takes stat, target and ef


## 35-meshrin · the action seat · **refused twice**

For: **the model's own idea**

**The first answer**
```json
{ "attacks": [], "saves": [], "traits": [], "reactions": [], "crossRef": null, "answered": [], "unplaced": [] }
```

**Why it was refused**
> you wrote no a bonus action

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[],"crossRef":null,"answered":[],"unplaced":[{"clause":"Give him a frightening roar","where":"bonus action — the prompt's own forms provide no bonus-action array (only attacks, saves, traits and reactions), so a Cone Wisdom save that Frightens and bars approach cannot be placed without being wrongly filed as a save, trait or reaction"}]}
```

**Outcome:** refused again — it belongs in the description


## 36-unyielded-champion · the action seat · **LANDED**

For: **the model's own idea**

**The first answer**
```json
{ "attacks": [], "saves": [], "traits": [], "reactions": [ { "clause": "The champion minds nothing but the attack, and steps through the swing that would have turned it aside.", "name": "Through the Swing", "trigger": "A creature within the champion's reach makes a melee attack against it.", "response": "The champion moves up to its Speed straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it makes one Greatsword attack against it.", "imposes": null, "condition_relation": "none", "acts": "Greatsword", "heals": false, "mechanics": 1, "quantities": 1 } ], "crossRef": null, "answered": [ { "clause": "The champion minds nothing but the attack, and steps through the swing that would have turned it aside. When a creature within its reach makes a melee attack against it, the champion can move up to its Speed straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it can make one Greatsword attack against it.", "row": "Through the Swing" } ], "unplaced": [] }
```

**Why it was refused**
> "Through the Swing" — the call counts 1 number(s) the row promises and only 0 are written — a promised amount,

**The second answer**
```json
{"attacks":[],"saves":[],"traits":[],"reactions":[{"clause":"The champion minds nothing but the attack, and steps through the swing that would have turned it aside.","name":"Through the Swing","trigger":"A creature within the champion's reach makes a melee attack against it.","response":"The champion moves up to 40 feet straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it makes one Greatsword attack against it.","imposes":null,"condition_relation":"none","acts":"Greatsword","heals":false,"mechanics":1,"quantities":1}],"crossRef":null,"answered":[{"clause":"The champion minds nothing but the attack, and steps through the swing that would have turned it aside. When a creature within its reach makes a melee attack against it, the champion can move up to its Speed straight toward that creature without provoking Opportunity Attacks, and if it ends this move within reach of the attacker, it can make one Greatsword attack against it.","row":"Through the Swing"}],"unplaced":[]}
```

**Outcome:** it landed as "Through the Swing"


## 36-unyielded-champion · the trait seat · **LANDED**

For: **the model's own idea**

**The first answer**
```json
{ "attacks": [], "saves": [], "traits": [], "reactions": [ { "clause": "The first time in each round that a creature moves out of the champion's reach, the champion can use its Reaction to make one Greatsword attack against that creature. The champion never tires, and its blade closes the gap others make.", "name": "Through the Swing", "trigger": "The first time in each round that a creature moves out of the champion's reach.", "response": "The champion makes one Greatsword attack against that creature.", "imposes": null, "condition_relation": "none", "acts": null, "heals": false, "mechanics": 1, "quantities": 0 } ], "crossRef": null, "answered": [ { "clause": "The first time in each round that a creature moves out of the champion's reach, the champion can use its Reaction to make one Greatsword attack against that creature. The champion never tires, and its blade closes the gap others make.", "row": "Through the Swing" } ], "unplaced": [] }
```

**Why it was refused**
> you wrote no a trait

**The second answer**
```json
{"attacks": [], "saves": [], "traits": [{"clause": "The first time in each round that a creature moves out of the champion's reach, the champion can use its Reaction to make one Greatsword attack against that creature. The champion never tires, and its blade closes the gap others make.", "name": "Closes the Gap", "trigger": "The first time in each round that a creature moves out of the champion's reach.", "effect": "The champion makes one Greatsword attack against that creature.", "imposes": null, "condition_relation": "none", "acts": null, "heals": false, "mechanics": 1, "quantities": 0, "passive_effect": "threat"}], "reactions": [], "crossRef": null, "answered": [{"clause": "The first time in each round that a creature moves out of the champion's reach, the champion can use its Reaction to make one Greatsword attack against that creature. The champion never tires, and its blade closes the gap others make.", "row": "Closes the Gap"}], "unplaced": []}
```

**Outcome:** it landed as "Closes the Gap"

**The row as it prints**
> **Closes the Gap.** The first time in each round that a creature moves out of the champion's reach, the champion makes one Greatsword attack against that creature.
