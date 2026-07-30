# 2024 statblocks, and how the generator got rebuilt to make them

*Working title. Alternates at the bottom of this file.*

The statblock generator now works in both editions of 5e, and there is a new tool for converting the monsters you already have.

**Generate in 2014 or 2024 format.** One switch, any challenge rating, and the output uses the right layout and phrasing for its edition. The 2024 cards have the official structure: merged immunities, the MOD and SAVE grid, saving throws written as Failure and Success.

**Pick a combat role, or let it read your concept.** Brute, defender, skirmisher, artillery, controller, lurker, support, and swarm. The role changes the actual math, so a lurker and a brute at the same CR are meaningfully different creatures.

**Flip any saved monster between editions.** Tabs on the statblock card switch between printings once both exist. Converting rewrites the wording only. Every number stays exactly where it was.

**Convert statblocks you already have.** The [statblock converter](https://cros.land/dnd-5e-statblock-converter-2014-to-2024/) is a new tool: paste a monster in from a book, a PDF, or D&D Beyond, and it works out which edition it came from and converts it. Conversions count as generations against the daily limit rather than sitting behind a separate gate.

**Export in both editions.** Homebrewery markdown in the official 2024 frame style, Foundry VTT, and Improved Initiative. The dungeon, NPC, and encounter tools also generate statblocks in whichever edition you prefer.

That is the announcement. The rest of this post is the dev journal, because supporting a second edition is what finally forced me to rebuild the generator from the inside out, and that rebuild changed the monsters far more than the new layout did.

## The library I built by hand

For most of this tool's life, the monster generator worked from a library I built by hand.

I went through the SRD one monster at a time and had ChatGPT strip each one down to its mechanics. Take a creature, remove everything that makes it that creature, and keep what is left: the armor class, the hit points, the attack routine, the number and shape of its abilities. Do that across the whole book and you end up with a library of generic templates sorted by challenge rating, which I labeled with the only three distinctions I bothered to draw at the time: stronger defense, stronger offense, and balanced.

Generating a monster meant picking a template that matched what you asked for and having the model reskin it. The AI never decided the numbers then either. They came from a template, which came from a creature a professional had already balanced, and that is why the output was mechanically sound.

The limitation was never the numbers. It was that every monster you got was shaped like whatever template came up. Ability slots were inherited along with the math, so if the template underneath happened to come from something with a breath weapon and an aura, you got a breath weapon and an aura, however they were dressed. The model was adapting abilities rather than inventing them. With a finite library and three labels, you eventually start seeing the same creatures wearing different coats.

Adding the 2024 rules is what made this a decision I could not put off. Every template in that library came out of the 2014 SRD. Supporting a second edition properly meant either doing the whole stripping exercise again against a different book, or building something that could produce a template on demand.

So I took the leap I had been avoiding. Instead of drawing a template from a shelf, compute one.

## What a chassis is

The core of the new generator is what I ended up calling a chassis. Give it a challenge rating and a combat role, and it computes every number in the statblock before the AI is involved at all, along with a plan for what kinds of abilities the creature should have. Not which abilities. What kinds: a signature attack here, a defensive trait there, one nova effect at this damage ceiling, a reaction if the role wants one. Slots to be filled rather than abilities to be reskinned.

The math comes from the same place a designer's does. The Dungeon Master's Guide gives target values by CR for defense and offense, and the chassis derives from those: armor class, hit points, proficiency bonus, attack bonus, save DC, and a total damage budget for the creature's turn. That budget then gets divided up. If the monster makes three attacks, each one is a third. Area effects get roughly half the single-target number, because an area effect that hits four people is doing four times the work. Creatures with legendary actions get a discount on their basic turn, because they act more often than once a round.

The combat role is where it gets fun. My old three labels became eight roles, and each one shifts the math the way official monsters actually differ from each other:

- **Brute:** more hit points, lower armor class. Easy to hit, hard to drop.
- **Defender:** high armor class, slightly reduced damage.
- **Lurker:** fragile, low sustained damage, and a much larger once-per-fight nova.
- **Controller:** less damage, higher save DC, because its job is conditions.
- **Swarm, artillery, skirmisher, support:** each with their own shape.

This is the part that expanded what the generator can produce. A lurker and a brute at the same CR are genuinely different creatures now, with different survivability and different damage patterns, because the numbers say so before a single word gets written. Nothing is drawn from a shelf, so nothing is constrained to the shape of the creature a template was stripped from. Old monsters saved under the previous labels still map onto the new roles, so regenerating one lands where you would expect.

The AI's job changed in kind. It used to adapt: here is a creature's mechanics, make it something else. Now it invents into a container. It receives a filled-in skeleton that says, in effect, "your melee attack is +7 for 14 damage in two dice plus five, your area effect is a 21-point save for half, you have one trait slot and three action slots, one of which should be a once-per-fight nova," and its entire job is to decide what those things *are*. What the creature is made of, what its abilities do, what they are called. Then assembly stamps the engine's numbers back over whatever the model wrote, so even a model having a bad day cannot ship a CR 3 monster with CR 12 damage.

A side effect I did not expect: because every number exists before the first API call, the loading state can show you the real armor class and hit points immediately while the rest fills in. The architecture leaked into the interface in a nice way.

## The cost

Here is the honest part. The template library gave up variety in exchange for guaranteed sanity. Generating the template gives up some of that sanity in exchange for variety.

A template stripped from a published monster carried more than numbers. It carried a professional's judgment about which abilities belong on the same creature, even after the flavor was gone. A computed chassis has the numbers and none of that judgment. It is assembled from correct parts, and correct parts can still combine into something odd. The failure mode is not usually broken math, since the engine owns the math. It is coherence. A creature whose abilities do not quite belong to the same animal. A name that describes an attack routine instead of a creature. An elemental that reads like an undead.

Most of the last few months has been closing that gap.

## Roughly a hundred and fifty checks

Every generated block runs through a linter before it ships. The rules are boring individually and powerful together: an area effect that deals damage cannot also stun without a recharge gate, a grapple must carry an escape DC, a restrained condition needs a way out, Prone never takes a duration because standing up is the exit, a damage rider is extra dice rather than a flat bonus, an entry cannot reference an ability that does not exist in the block.

Where I could, the fix is deterministic. The linter does not just flag a missing escape DC, it stamps the right one in. About half of everything the linter catches gets repaired without another API call. What remains goes back to the model as a short list of specific problems with the exact text to fix.

The discipline that made this work is a rule I set early: no check ships until it has been swept against all 329 monsters in the 2024 SRD without a single false positive. Any rule that fires on an official monster is wrong about D&D, no matter how sensible it sounded when I wrote it.

That killed a lot of my ideas, and the kills were more useful than the survivors. I wanted a rule that no monster should have four different energy damage types. The sweep found exactly one official monster that does, so the threshold moved. I wanted to flag raise-the-dead necromancy on creatures that are not undead. An official dragon casts Create Undead. I wanted to catch monsters that give themselves conditions they are immune to, which is a real defect, and the first version of that rule flagged the Air Elemental, because "pushed away from the elemental and knocked prone" puts the elemental's name in the wrong grammatical position. Each of those taught me something about how the actual game is written that I would have gotten wrong from memory.

## One judgment call

Deterministic rules only catch patterns you can describe. They cannot catch a cloud of spores that no ability ever creates, or a trait named Steam Shroud that produces no steam.

So every generated monster now gets one extra API call: an audit that reads the finished block and looks for problems a Dungeon Master would hit at the table. Can every effect be adjudicated? Does every imposed condition have a way out? Does anything contradict anything else? It also grades the monster's name and flags a creature type that the content does not support.

The important part is that the audit has to show its work. Every finding must quote the exact text it is complaining about, verbatim. If the quote does not appear in the block, the finding is thrown away before it reaches anything. That one rule makes a nondeterministic judge safe to wire into a pipeline, because a hallucinated complaint costs nothing.

When the audit is right, its findings ride along with the linter's into the same repair call, so a block with both kinds of problems is fixed in one pass instead of two.

## Where I decided to stop

The generator still produces the occasional strange monster. A creature that would have been better classified as a monstrosity than an elemental. An ability with a condition that is technically always true. A name that is fine but not great.

I spent a while treating each of those as a bug, and eventually landed on a better test: would this break a table, or would a Dungeon Master fix it in half a second without noticing they had? Published monsters have oddities that fall in that second category all the time. That is the bar the generator is held to now, and it clears it.

What I got in exchange is worth it. The abilities coming out of the generator are dramatically more interesting than anything the template library produced, because they are being invented for a creature rather than inherited from one. The monster that eats a party member and drags them underground, the construct whose cracked bell forces it to ring, the swarm that shatters and reforms with half its hit points. None of those are variations on an SRD entry. They exist because the math was already handled and the model had nothing left to do except be imaginative about what a monster could be.

---

## Alternate titles

- The monster generator now speaks both editions of 5e
- What happened when I threw out my monster template library
- 2024 rules support, and the rebuild underneath it
- Building D&D monsters from math instead of from other monsters
