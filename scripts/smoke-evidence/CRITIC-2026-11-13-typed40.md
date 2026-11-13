# Critic brief — the GM forty, `typed40-2026-11-13T00-37-36`

Companion to `CRITIC-blocks-2026-11-13-typed40.md` (40 blocks). Read is **unscoped** — go wherever
the blocks take you, in whatever format you prefer. The four-dimension table is useful if you have
it, but nothing here is a request to limit the read.

## This is a different batch from the one you read on 11-12

That was `sweep` — the **crafted** forty: engineered canaries, each input written to exercise a
known path, several of them whole print creature names chosen to test fidelity.

This is `typed40` — the **GM register**: inputs as a GM actually types them. A name and a
profession (`Sister Maudra | cleric of the drowned god`). A paragraph of backstory with stats
buried in it (#23, #24, #26). A typo (`a drgon`). A question (`what would a CR 4 swamp monster
look like`). A bare name and nothing else (#39).

The two batches exercise different machinery:

| path | this forty | the crafted forty you read |
|---|---|---|
| class NPC | **14** | 8 |
| homebrew | **20** | 14 |
| print body (twist / exact) | 4 | **17** |

So print fidelity — most of what the crafted forty tests — is barely touched here, and the
catalog, the class kits and the free-authoring path carry almost everything.

## What is in this build that was not in the one you read

The crafted forty was rendered before two changes landed. This run has them:

- **The SRD corpus's Reactions sections went 3 → 22.** The source the corpus was parsed from had
  dropped almost all of them; they were merged back from a fuller copy of the same SRD. Print
  reactions (Parry, Riposte, Redirect Attack, Protective Magic, Interpose) are available to the
  engine for the first time. Several blocks here carry them.
- **A creature made of an element is immune to it** (dragons, oozes, and a body whose energy is
  Fire/Cold/Lightning/Acid).

Nothing from your 11-12 read has been fixed yet. Anything you flagged that reappears here is
unfixed, not regressed.

## Instrument read

**4 blocks of 40 carry a mechanical FAIL** (same batch at 6 of 40 four days ago):

- **#01 Grask Ironjaw** — a trait applies the Grappled condition with no escape DC.
- **#14 Ashen Kal** — 2024 vocabulary survived into a block asked for in 2014 wording.
- **#18 Ocularch**, **#19 Krevmaw** — offense under the band for their CR.

Of the four defect classes you named on 11-12, one recurs here and three do not:

- **A save with no stated outcome** — #13 and #14. Both end an attack with
  `Constitution Saving Throw: DC 14.` and stop. (The audit flagged both and filed them as published
  text, so nothing fixed them.)
- A stranded `replace one attack with (Recharge 5-6)`, a returning-weapon clause on a melee row,
  and an undefined sphere: **none appear on this batch.** Those inputs aren't in it.

## Things that are deliberate, so you can price them as you see fit

- **#18 Ocularch and #19 Krevmaw are Beholder and Mind Flayer.** Neither is in the SRD — they are
  Product Identity, so the engine may not use the name or the published block and must invent a
  creature from the idea. The invented name is the intended behaviour. Whether the invention is any
  good is a fair question.
- **#35 `a drgon`, #39 a bare name, #40 `sewer alligator`** are low-information inputs: the test is
  that a legal, playable block ships at all.
- **`[2014 rules]` on the card** means *2014 wording*. The body underneath is always SRD 5.2 — that
  is the designed behaviour, not a mislabel. You raised this on 11-12; it is now an open question
  for the owner about how the card should say so, not a defect being ignored.
- **Protective Magic**, for the third time: the SRD 5.2 **Lich** prints it with **no** use limit —
  only the **Mage** and **Archmage** have `(3/Day)`. Print writes it as prose with no `Trigger:`
  line. For reference, all three verbatim:

  > **Lich** — *Protective Magic.* The lich casts *Counterspell* or *Shield* in response to the
  > spell's trigger, using the same spellcasting ability as Spellcasting.
  >
  > **Mage** — *Protective Magic (3/Day).* The mage casts *Counterspell* or *Shield* in response to
  > the spell's trigger, using the same spellcasting ability as Spellcasting.
  >
  > **Archmage** — *Protective Magic (3/Day).* The archmage casts *Counterspell* or *Shield* in
  > response to the spell's trigger, using the same spellcasting ability as Spellcasting.

## The render, since your parser broke on it

Same renderer as 11-12. The shape, exactly:

```
## <run-id>#NN — <Name>

**Input:** `<the GM's typed input>`

```
<Name>
<Size> <Type>, <Alignment>
AC n   HP n (ndn + n)   Speed n ft.
STR n  DEX n  CON n  INT n  WIS n  CHA n
<optional: Skills / Saves / Resistances / Immunities / Senses / Languages lines>
CR n   [2014 rules|2024 rules]

Traits
  <Name>. <text>
Actions
  <Name>. <text>
Bonus Actions
Reactions
Legendary Actions
```

---
```

Blocks are separated by `---`. Section headers are bare words on their own line; every row is
indented two spaces and begins `<Name>. `. A row's use limit is inside the name —
`Fire Breath (Recharge 5-6)`, `War Chief's Command (2/Day)`. Header lines after the stat row are
optional and appear only when the creature has them.

If a different layout is easier to parse, say which and it will be rendered that way next time.
