# Polish, deferred by the owner (2026-10-28)

**Owner:** *"might need trimming but that's polish and we're not there yet."*

Two findings from a spot check of a Will-o'-Wisp Queen (CR 12, homebrew path).
Both are real and both are DEFERRED. Do not pick these up ahead of structural
work; they are recorded only so the measurements are not re-derived.

## 1. A long creature name is never shortened for inline use

Print shortens a multi-word name to ONE word when referring to itself in row
text — **6 of 6** long-named print monsters do it:

| print name | inline |
|---|---|
| Adult Gold Dragon | "the dragon" |
| Ancient Silver Dragon | "the dragon" |
| Sphinx of Lore / of Valor | "the sphinx" |

We keep the whole name. The Queen's `Coaxing Glow` pays for it six times in one
sentence — about 150 characters of name where print would spend ~45:

> each creature of **the will-o'-the-wisp queen's** choice in a 60-foot Emanation
> originating from **the will-o'-the-wisp queen** that can see or hear **the
> will-o'-the-wisp queen's** false light … until the start of **the
> will-o'-the-wisp queen's** next turn … must move toward **the will-o'-the-wisp
> queen**

NOT the repetition count — print's Behir says "the behir" NINE times in Swallow,
and 54 print rows repeat a short name 3+ times. The length is the defect.
Print's self-references are 1-2 words across 420 samples, never 3.

Where it would go: the inline is chosen upstream of row rendering (`inline` /
`inline_kind` on the monster). A short form for a long name belongs there, once,
not in a text pass.

## 2. The per-attack die runs large at high CR

The Queen's Witchfire Touch is 42 (8d8 + 6), twice a round = 84.

- CR 12 rule-table target: 75-80/round. So **1.08x**.
- Print's CR 11-16 band (n=27, from
  `scripts/signature-measures/dpr-with-novas-and-legendaries.mjs`): median
  **0.63x**, p95 **0.97x**. So the round total is just above its band's 95th
  percentile. The global "grossly over" line is 1.60x — nowhere near.
- The round total is NOT the anomaly; the PER-ATTACK die is. Print reaches its
  band with more, smaller attacks: Adult Brass Dragon ~17 a Rend, Roc ~28 a
  Talon. Ours is 42 a hit — 1.5-2.5x print's per-attack at that CR, which also
  makes the sheet swingy (one hit or miss moves 42 points).
- Mitigations the raw number ignores: AC 15 is low for CR 12, there are no
  legendary actions, and the Multiattack can replace an attack with Coaxing Glow
  or a spell — on any controlling turn output is 42, not 84.

The checker raised NO band finding on this sheet, and the owner's standing bar is
that running hot is acceptable ("print does run hot especially 2024"). If it is
ever trimmed, the lever is the die size per attack, not the attack count.
