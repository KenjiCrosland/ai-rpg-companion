# Blocks — the Archmage repair, and dismissed findings in the CHECK file

Runs: `smoke-out/v-name-2026-11-14T17-17-09` (Vexmoor, the repaired body),
`smoke-out/v-regress-2026-11-14T17-17-56` (8 regression).
Baseline for comparison: `CHECK-v-regress-2026-11-14T16-07-18.md` (before any of fix 4).

---

## Lord Vexmoor — CR 12, "an archmage in a black doublet…"  ✅ FIXED

```
Spellcasting.             Lord Vexmoor casts one of the following spells, using Intelligence…
Misty Step (3/Day).       Lord Vexmoor casts Misty Step, using the same spellcasting ability…
Protective Magic (3/Day). Trigger: Lord Vexmoor is hit by an attack roll. Response: Lord Vexmoor casts Shield…
```

Was: `Misty Step (3/Day). **The mage** casts Misty Step…` — a creature not on the card.
All three spell rows now carry Vexmoor's name. This body is deterministic, so the block is
real evidence rather than a sample.

### What was wrong, and where

The Archmage named itself five times as "the archmage" and once as "the mage", and that one
row was word for word the Mage's. The engine swaps print's noun for the sheet's creature by
reading the nouns of the body's NAME — "mage" is not a word of "Archmage", only a trailing
substring — so nothing in code could reach it without a rule about print's text.

**It is the published SRD, not our parse.** Three witnesses, all agreeing:

```
scripts/srd-source/oldmanumby-monsters-A-Z.md:1184   "The mage casts *Misty Step* , …"
scripts/srd-source/springbov-12_MonstersA-Z.md:1282  "The mage casts *Misty Step*, …"      (an independent conversion)
Roll20's 2024 Archmage                               carries it beside its "The archmage" rows
```

Line 1184 sits inside the Archmage block — the rows around it are its +9 Arcane Burst and
its spell save DC 17. Two separate markdown conversions already carry it, so the parser did
not introduce it.

### The measurement behind the repair's narrowness

Asked whether this is one row or a class. Across both corpora:

| | |
|---|---|
| 2024, blocks that name themselves TWO different ways | **1** — the Archmage, 329 monsters |
| 2014 (`srd-monsters.json`) | **0** of 327 — its Archmage casts Misty Step from a spell list, not a row |
| same SHAPE but not a slip | the **Warhorse**: "the horse moved 20+ feet" is its only self-reference, so that is the block's own idiom. Left alone. |

Other "the X" nouns that are not words of the name are all about something else — "the armor"
(Black Pudding, Rust Monster), "the limb" (Troll), "the specter" (Wraith), "the sword" (Solar).
None is a self-reference, and none is touched.

`scripts/repair-srd-archmage-mage.py` refuses to write unless the unmodified parse reproduces
the file byte for byte, the target matches exactly once, the Mage's own row still says "The
mage casts", and exactly one row differs afterwards. **1 row changed, 1309 untouched**, and a
second run is a no-op.

---

## Audit findings dismissed on print rows — now in the CHECK file

Was a trace line only. Now recorded on the sheet (`generation.audit_dismissed_on_print`) and
listed per run. From `CHECK-v-regress-2026-11-14T17-17-56.md`:

```
## Audit findings dismissed on print rows

**1** finding(s) dismissed across 8 sheet(s) that carry the record.

- Sister Maudra · Actions/"Spellcasting" — *Hold Person* has no target or range in the entry
  and against a single target offers no repeat save or fixed duration, so the imposed
  Paralyzed state has no written exit. …

Reporting only: none of these raised a FAIL or changed a sheet.
```

One finding on eight sheets, and it is the "audit arguing with published text" kind rather
than our paste having broken print's row — which is the distinction the list exists to let a
reader make. The exemption is unchanged: it raises no FAIL and changes no sheet.

A run whose sheets predate this says so explicitly ("no sheet in this run carries the
record") rather than printing a zero, because those are different facts.

---

## Regression — `v-regress`, 8 blocks

| | baseline (16:07, before fix 4) | after fix 4 (16:56) | after the repair (17:17) |
|---|---|---|---|
| FAILs | 1 of 8 (Sisek `undefined-attack-ref`) | 1 of 8 (Bloodfed `engine-needs-key`) | **0 of 8** |
| lint | 0 except Sisek (2) | 0 | 0 |

Three fresh rolls, not replays, so the FAIL moving and then clearing is variance — **0 of 8 is
not a claim that anything improved.** What it supports is that nothing regressed.
