# For the critic — the sweep forty of 2026-11-12 (`sweep-2026-11-12T07-37-26`)

The same forty inputs you last read on `sweep-2026-11-08T05-42-47` at **Keeper 10 · Runs 18 · Tweak 8 ·
Fix 4 · ‼ 0** — "the best forty so far; land §2a and this ships at 0 Fix." Re-run on commit `1dbec6d`,
eighteen commits later. Your 11-08 read is the baseline. Read as you always do — nothing here is a
scope; it is where to look first.

The blocks are in `CRITIC-blocks-2026-11-12-sweep.md` (rendered from the saved JSON, print's section
order, header lines included). The owner's own read of this run, done before yours and not shown to
you until after: **Keeper 12 · Runs 7 · Tweak 14 · Fix 5**.

## Your four 11-08 Fixes, on this run

| # | sheet then → now | your fix | now |
|---|---|---|---|
| 18 | Ossuar the Bone Sun → Osseous Heliarch | drop "to cast Hold Person" from Multiattack | Multiattack names no spell: *"three attacks, using Eldritch Burst or Paralyzing Touch"* |
| 26 | Marshena Debtbinder → Grandmother Fen | drop "(B) … Ray of Sickness" | Multiattack names no spell: *"three Arcane Burst attacks … Marsh Rot"* |
| 25 | Black Iron Sentinel → Iron Tomb Gate Sentinel | Emanation with no origin | 0 Emanation rows without "originating from" on the sheet |
| 16 | Brass Tyrant | Forge Sovereign needs "As a Bonus Action" | the row is gone; the sheet's Bonus Actions are print-shaped (Wade Through, Smash Cover, Forge Quake are legendary actions) |

§2a (the sheet lints wired into the pipeline) landed 11-09. The offlist-spell class has not recurred on
a forty since.

## What changed in the engine since you read (18 commits; the ones that touch what you grade)

1. **How a creature HOLDS is decided once**, at the route call — grip / reach / contain / medium — and
   read everywhere: a gripping body (hound, crocodile, eel) is offered no reaching pull, a containing
   body keeps its Engulf/Swallow, a reaching one (roper, kraken-spawn) may pull. Your "magnet pull on
   a crocodile" class: 0 on this forty's gripping bodies.
2. **A clause the body already answers never becomes a request.** "Drags swimmers under" on a body
   whose Bite already grapples is credited to the Bite and no second row is written — upstream, from
   declared data, with a receipt on the row. On a PRINT body whose own row does not serve the ask
   (the Troll's Rend holds nothing), the ask stays open and if nothing answers it the sheet FAILs
   `owed-clause` rather than shipping a row that pretends to.
3. **The writer is told what the body is** — the hold shape, and which families the sheet already
   carries — so it stops hand-writing the pull the catalog would have refused, or a second retaliation
   beside Searing Hide.
4. **Retaliation is a reaction.** The bonus-action "whoever hit me since my last turn" punisher is
   retired (a reaction's trigger at a bonus action's price); `Answering Strike` — on a HIT, one melee
   attack back — is riposte's sibling and brute-legal, picked, never dealt.
5. **The audit is told where each row came from** — official (verbatim Monster Manual: the standard,
   not under review), the body's (catalog), or written for this creature — and judges **playability,
   worth-the-action and practical sense** beside correctness; "flavor is not a defect" is gone. Its
   gate now keeps any spanned finding on a row a fix can reach (the owner hand-scored 33 dropped
   findings at 67% "should have acted"), and the fix is told the finding's class (a two-in-one is
   split; a dead row gains its payload). A repair that would make the sheet fail a gate it did not
   fail before is refused — by asking the checker, not by a list.
6. **Data:** the corpus was missing 19 of the SRD's 22 Reactions sections (the Goblin Boss had no
   Redirect Attack; the Knight no Parry). Merged; print rows ride along with no engine change. **Print
   is immunity, not resistance, for a body of its element** — Winter Wolf, Hell Hound, Remorhaz, 8 of
   8 — so a frost-rimed wolf is Cold-immune with a Piercing bite.
7. Print's Troll Rend no longer carries the grappler chassis's rider (13 of 13 trolls had a Restrained
   nothing could impose); print's Reel reaches the roper (its name was a substring of the seat's
   "Reeling Tendril" and was skipped); print's Tentacle keeps print's text (a conditions-only attack
   row was being cloned from a damage row).

## Our instrument's read

**2 FAILs of 40** (was 3): #33 Hatchery Warden `vocab-2024-in-2014` (a 2024 phrase in a 2014 block),
#34 Krennik Skullstandard `print-range` (Cavalry Bow 150/600 vs print's 80/320). Both old classes.
Defense reads 2+ under the card on 14 of 38 — 9 of them 2014 sheets, and the exact Purple Worm reads
def 12 at CR 15 with HP above print's median, so we believe that is the **ruler** running cold on the
2014 side, not the sheets; it is being measured before anything is changed. Do grade what you see;
tell us if the 2014 sheets read thin to you by eye.

## Where the owner's read and ours disagree, or want a third eye

- **Twists losing their fiction to a template's name.** "Vampire who keeps a garden of thorns" ships
  `Binding Snare`; the 11-10 run had an authored *Briar Sovereign*. On this forty 6 rows took a
  template's name and **5 of them lost a word the GM typed** (Thorned Grasp → Binding Snare, Stolen
  Chorus → Fear Aura, Steps Between Places → Bound). The mechanic is right; the card no longer says
  what the GM said. The rule is the owner's own (10-27, "stock rows take the template's name"); he is
  deciding whether to keep it. **Your read of the cost would help.**
- **#9 Stone Golem "carved as a weeping saint"** — the owner: "nothing says statue." The clause was read
  as a descriptive head and withheld from the idea call.
- **#13 Purple Worm "that swallowed a war-band's armoury"** — the clause was read as the swallow
  mechanic; the armoury (shards in its hide, a crush) that the 11-10 run authored is gone.
- **#23 Vashka, #31 Thunderhead Drake** — the owner read both as soft on offense; our read agrees on
  neither (off 5 on a 6, off 8 on a 7).
- **#28 Ilvareth** — he / it / her on one NPC. A known class (referent drift, 16 of 37 cross-row audit
  findings); the pass that fixes it is next.
- **#40 Brother Halric** — "Grave-Rot" on a Priest body the GM typed only a name for. The seat invented
  a theme.

## What not to spend your read on

The two checker FAILs above (old classes, being traced). The `owed-clause` FAIL you will NOT see here
but will on the hold twelve — a Troll twist asking for a hold that print's Rend cannot carry; that
FAIL is the engine saying so rather than pretending, and it is intended.

## The owner's own table, after yours

Not included in this file by design — read first. It is in `plans/HANDOVER-2026-11-11.md` under
"THE OWNER'S FORTY READ".
