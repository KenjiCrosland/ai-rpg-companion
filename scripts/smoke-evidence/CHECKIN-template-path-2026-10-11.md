# Template-path check-in before step 7 — 2026-10-11

A read, not a fix round. Twelve blocks, one roll each, on the engine as it stands after step 6 (working tree on `eca4f6b`, nothing committed since), compared row by row against the saved October 4 release sheets in `smoke-out/sweep-2026-10-04T09-58-22` (not regenerated). Nothing landed; the "authoring disabled" column was produced by refusing the authoring and repair calls at the network in a scratchpad copy of the smoke harness, so the engine's own catch took the template path.

Runs: `smoke-out/checkin-twelve-2026-10-11T13-51-05` (12 of 12 saved) and `smoke-out/checkin-noauthor-noauthor-2026-10-11T13-54-57` (5 of 5). Checker files: `CHECK-checkin-twelve-2026-10-11T13-51-05.md`, `CHECK-checkin-noauthor-noauthor-2026-10-11T13-54-57.md`. The six print names were rolled as 2014 (one roll yields both renderings: the 2024 original in `other_edition` and the converted 2014 sheet), and each is diffed against the release's 2014 roll on both renderings; the 2024 rendering is also laid against the release's separate 2024 roll. The six one-liners were rolled as 2024 against the release's 2024 rolls. The batch had no fixed seeds (the release batch carries none).

## Gate table — the twelve

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Goblin Warrior | 1 (2014) | 2014 | skirmisher-1 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Owlbear | 3 (2014) | 2014 | brute-2 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 1/1 |
| Troll | 5 (2014) | 2014 | brute-5 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Adult Green Dragon | 15 (2014) | 2014 | dragon-15 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 8/8 |
| Kraken | 24 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 9/9 |
| Pit Fiend | 20 (2014) | 2014 | brute-21 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 10/10 |
| Bog Hound | 1 | 2024 | brute-5-grappler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/2 |
| Glass-Eyed Hermit | 3 | 2024 | skirmisher-8-hurler | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 6/6 |
| Scourge of Firstborn | 8 | 2024 | caster-8-binder | ok | ok | ok | SOFT: rider-no-save, rider-no-save | ok | ok | ok | ok | soft (1) | 1/1 | 2/5 |
| Storm-Herder | 13 | 2024 | brute-11-charger | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | soft (1) | 1/1 | 1/2 |
| Glacier Wyrm | 20 | 2024 | dragon-22 | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/2 | 5/7 |
| Sunbound Archlich | 24 | 2024 | caster-21 | ok | SOFT: aim-dpr, under | ok | ok | ok | ok | SOFT: print-rows | ok | soft (2) | 1/1 | 12/12 |

0 fails of 12. The gates see none of what the diff below sees: every difference that matters here is a text defect or a changed composition, not a number the checker measures.

## The six print names

Trace on all six: `print canon: "a goblin warrior" is a print creature — the seats stand down; print's own rows are the composition` (the same line the release traces carry). No authoring line appears on any of the six: the authoring block is skipped before it can log, because a print body never reaches it. Every print identity row the release 2014 sheet carried is present on the new sheet (checked by name, six for six: 2, 0, 3, 6, 7, 6 rows). One flag moved: the Adult Green Dragon's Poison Breath is present but no longer carries the print mark (the release's own 2024 roll also lacked it; the flag is roll-dependent).

Row-level diffs, new 2014 roll against the release 2014 roll (both renderings), then the 2024 rendering against the release's 2024 roll:

**Goblin Warrior.** Identical rows on both renderings. Against the release's 2024 roll: Scimitar and Shortbow +4 → +3, 1d6 → 1d8, flat 2 → 1 — the 2014 roll's array (DEX fitted to +3, as the release 2014 roll also had) against the 2024 roll's; not a change. **Pass.**

**Owlbear.** Identical on every comparison. **Pass.**

**Troll.** 2024 rows identical. 2014: Loathsome Limbs "15 or more" → "15+", "troll limb" → "Troll Limb" — model variance in the conversion call, numbers identical. Against the release's 2024 roll: Rend 18 (4d6 + 4) → 17 (3d8 + 4), the difference between the two release rolls themselves. **Pass** (model variance only).

**Adult Green Dragon.** Both renderings: Rend RENUMBERED 15 (2d8 + 6) → 24 (4d8 + 6); print's Rend is 15 (2d8 + 6) plus 7 (2d6), the release 2014 roll had print's number, the release 2024 roll had 19 (3d8 + 6). The Rend is the chassis attack wearing print's name and is not print-flagged, so the final price pass re-solved it ("the round ran 198 against the card's 140 — re-solve at 74%"). **Unclassified** — a print identity attack row off print's number. 2014 only: Multiattack *suggestion* → *Suggestion* (variance); Spellcasting header now ends "(spell save DC 17): -" — the bullet strip left an inline dash (**unclassified**, cosmetic); Noxious Miasma rewritten from "taking 7 (2d6) poison damage on a failed save, or half as much damage on a successful one" to "must succeed … or take 7 (2d6) poison damage" — the half-damage clause is gone (**unclassified**: conversion variance that dropped a mechanic). **Fail** on zero-unclassified; identity rows and trace pass.

**Kraken.** 2024 rows identical. 2014: Swallow gains "On a failed save, if the target is Large or smaller…" where print says "If the target is Large or smaller" (variance, arguably tighter); Toxic Ink moves "while it is underwater" after the save (variance). **Pass** (model variance, numbers identical).

**Pit Fiend.** 2024 rendering: two legendary rows renamed with identical text (Wade in → Brutal Charge, Desecrate Ground → Trampling Stomp) — model variance. 2014: Multiattack reads "using Bite, Devilish Claw, or or Fiery Mace" — the step-6 `multiattack2014` renderer splits the 2024 list on commas and on " or ", and the 2024 text carries an Oxford comma, so "or Fiery Mace" survives as a name and gets a second "or" (**unclassified**: a step-6 defect). Bite: "it must make the following saving throw. The target must succeed on a DC 21 Constitution saving throw or be poisoned" — a doubled lead-in from the conversion (**unclassified**). Hellfire Spellcasting rewritten as a spell list with a literal "..." in it (**unclassified**). Fear Aura "20-foot radius" → "20-foot sphere" and the save restructured (variance). Against the release's 2024 roll the three attacks read 4d6 + 8 where that roll had 4d8 + 8 — the release 2014 roll also had 4d6; roll difference. **Fail** on zero-unclassified; identity rows and trace pass.

Print names overall: identity rows present six for six, trace says the template composed the sheet six for six, zero-unclassified passes four of six. The two fails are in the 2014 conversion text and one re-solved attack number, not in composition.

## The six one-liners

| block | path | release signature row | now |
|---|---|---|---|
| Bog Hound | authored (1 attack) | Whelm (the grappler's engine; the release had no template signature beside it) | **present**; authored Mud-Drag Bite replaced Bite |
| Glass-Eyed Hermit | authored (2 attacks) | Lantern Burst (Recharge 5-6) | **present, renamed** Lantern Shatter, same numbers; Opportunist's Lash **replaced** by Last Lantern (a pull save) |
| Plague-seer | authored (2 attacks, 1 trait) | Stillborn Draught (the drain; the release's "lure"-slot row) | **gone** — the authored trait took the slot |
| Storm-herder | authored (1 attack) | Herd Resolve (2/Day) (the release's stampede idea fell to the floor and a rally stood in) | **gone** — the donor flipped to brute-11-charger; the stampede is now the attack row |
| Glacier Wyrm | authored (1 attack, 1 Recharge save) | Rimebite Consumption (the Restrained exploiter; the chassis's Swallowing Maw slot) | **gone** — the authored save evicted the save-form slot; Freezing Breath replaced by the authored Sea-Freezing Breath |
| Sun-crowned archlich | print body (Lich), authoring skipped, **repair** added one trait | Sovereign Binding (the snare-bolt save) | **replaced** — the binding is now a Restrained rider on Solaflare; the repair added Bound Dead of the Kingdom |

Row-level diffs with classification:

**Bog Hound** (release Bog Hound, same donor). Bite REMOVED, Mud-Drag Bite ADDED: same numbers, Grappled rider in print's form "If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12)" (the release said Large), plus "(with Advantage if the target has the Grappled condition)" — the cross-row reference landed on the row that itself grapples. Multiattack retexted to the new name. Whelm unchanged. Classification: authoring took the slot (Mud-Drag Bite for Bite); escape DC present either way. Zero unclassified. **Verdict: same** — Whelm is still the row that drags fishermen under; the authored bite only renames the jaws.

**Glass-Eyed Hermit** (same donor). Cudgel REMOVED, Glass-Cut Stare ADDED ("*Melee Attack Roll:* +5, reach 5 ft. 12 (2d8 + 3) Psychic damage"); Lantern REMOVED, Hurled Lantern ADDED (same shape, 12 for 7 after the final price pass solved up); Lantern Burst RENAMED Lantern Shatter (same 17 (5d6), Prone rider kept); Opportunist's Lash REMOVED, Last Lantern ADDED (DC 12 pull, 7 (2d6) Fire); Skirmisher RENAMED Circling Watch. Classification: authoring took the slots (Glass-Cut Stare for Cudgel, Hurled Lantern for Lantern); Lantern Shatter and Circling Watch model variance; Last Lantern for Opportunist's Lash is the template path re-rolling its signature (variance). Zero unclassified. **Verdict: worse** — "Glass-Cut Stare" is a stare priced as a melee weapon attack with reach 5 ft.; a GM cannot run that row as written. Decided by Glass-Cut Stare.

**Plague-seer** (release Grave Midwife, same donor). Claw and Withering Bolt REMOVED, Curse-Touch (Necrotic, Poisoned rider, Advantage against Frightened) and Plague-Sight (Psychic, Frightened rider) ADDED; Withering Curse RENAMED Venom Ray (same text — a "ray" dealing Bludgeoning); Stillborn Draught REMOVED; Curse of the Firstborn ADDED: "When the firstborn targets a creature that is the firstborn of its house, the target must succeed on a 15 Charisma saving throw or be cursed; while cursed, the target takes 9 (2d8) Necrotic at the start of each of its turns and cannot regain Hit Points." Classification: authoring took the slots (the two attacks; the trait for the Stillborn Draught slot); Venom Ray variance; Curse of the Firstborn **unclassified** — the `{dc}` token was written without "DC" and the subject is garbled ("the firstborn targets a creature that is the firstborn"). **Verdict: worse** — decided by Curse of the Firstborn, which a GM has to repair before use; the two rider-no-save softs are its attacks.

**Storm-herder** (release Thunderherd on defender-8-leader; now brute-11-charger). Header changed with the donor (AC 18 → 16, HP 209 → 229, Large → Medium, the leader's array for the charger's). Aura of Authority, Storm-Crook, Antler Hurl, Herd Resolve REMOVED; Storm Stampede ADDED ("+10, reach 10 ft. 50 (10d8 + 5) Thunder damage, and the target has the Prone condition"), Trample ADDED (the charger's engine). Classification: the donor flip is route variance — the model read "commands a stampede" as a charger this roll and as a leader in the release and in the no-authoring roll below — **unclassified** (not one of the four classes; not step 6); inside the chassis, authoring took the slot (Storm Stampede for the charger's attack) and the unfilled Signature Slot left. **Verdict: worse** — the herder commands no herd: the sheet is two identical Stampede attacks and a Trample, Medium with reach 10 (the structure soft). Decided by the Multiattack: "makes two Storm Stampede attacks."

**Glacier Wyrm** (release Vorenkaal, same donor). Bite REMOVED, Devouring Maw ADDED ("26 (4d8 + 8) Piercing … Grappled condition (escape DC 22)"); Freezing Breath REMOVED, Sea-Freezing Breath (Recharge 5-6) ADDED (60 (11d10) Cold, Restrained rider, half on success); Rimebite Consumption REMOVED; Sure Footing REMOVED; Snap REMOVED, Fanged Lunge ADDED (the strike follows the attack's name); Surge → Ice Shear and Deep Maw → Flood the Wreck RENAMED; Spellcasting list reshuffled. Classification: authoring took the slots (Devouring Maw for Bite; Sea-Freezing Breath for Freezing Breath — one Recharge nova on the sheet, the step-6 rule; the escape DC on the grapple, the step-6 rule); Rimebite Consumption left because the authored save evicted the save-form slot (the step-6 same-form rule, applied as written); Sure Footing left because the trait seat does not run on an authored sheet (the step-5 rule); the legendary names and the spell list are model variance. Zero unclassified. "freezes the sea" is dropped (1/2). **Verdict: same** — a real hold with an escape DC and a Restraining breath replaced a plain bite and a Restrained-exploiter that nothing on the sheet set up; it lost Sure Footing. Decided by Devouring Maw.

**Sun-crowned archlich** (release on the Lich borrow, same donor). Necrotic Bolt REMOVED, Solaflare ADDED (same +16 / 45 (8d8 + 9), Radiant, with "If the target is a Large or smaller creature, it has the Restrained condition until the end of its next turn. This effect can be applied only once per turn" — the snare rider gated by the step-6 once-per-turn rule); Sovereign Binding REMOVED; Numbing Touch REMOVED, Paralyzing Touch ADDED (print's own name for print's own row — the step-5 rule; the text is the release's Numbing Touch at 27 for 45); Eldritch Burst RENUMBERED 45 (8d8 + 9) → 27 (4d8 + 9) (print's is 31 (4d8 + 13); the final price pass at 75%); Crown's Afterglow ADDED (14 (4d6) Radiant on touch — the heated-body template, the signature path running on a sheet the repair touched); Bound Dead of the Kingdom ADDED: "The sunbound archlich animates and commands the dead of kingdoms it has claimed, raising them as servants bound to its will." Classification: Paralyzing Touch and the once-per-turn rider are engine rules landed since the release (steps 5 and 6); Solaflare and the legendary wording model variance; Eldritch Burst's renumber **unclassified** (a print row's number moved by the final price pass); Bound Dead of the Kingdom **unclassified** — the repair call on a print body shipped a trait with no mechanic, and the adjudicability gate passes a passive trait that deals no damage and imposes no condition. **Verdict: worse** — decided by Bound Dead of the Kingdom, a rules row with no rules.

One-liners overall: zero-unclassified passes three of six (Bog Hound, Hermit, Wyrm). Verdicts: same 2 (Bog Hound, Wyrm), worse 4 (Hermit, Plague-seer, Storm-herder, Archlich), better 0.

## Authoring on and off, side by side

The threshold the request names — under two mechanical clauses with no named body part or weapon — disables authoring for five of the six one-liners; the hermit's "lantern" is a named object and keeps authoring, so its column is the same roll twice. The print names author nothing on either side.

| prompt | authoring on (the twelve) | authoring off (the column) |
|---|---|---|
| bog hound | brute-5-grappler · Mud-Drag Bite (grapple, escape DC 12, Advantage vs Grappled) · Whelm · 1/1 · 2/2 · clean | brute-5-grappler · Bite (grapple) · **Mudslide Lock** (hook-drag pull, DC 13) · Whelm · Sure Footing · 0/1 · 3/4 · clean |
| glass-eyed hermit | skirmisher-8-hurler · Glass-Cut Stare · Hurled Lantern · Lantern Shatter · Last Lantern · Circling Watch · Fleet Agility · 1/1 · 6/6 | (same roll — above the threshold) |
| plague-seer | caster-8-binder · Curse-Touch · Plague-Sight · Venom Ray · Spellcasting · Curse of the Firstborn (broken DC) · 1/1 · 2/5 · soft rider-no-save ×2 | caster-8-binder · Claw · Affliction Ray · Withering Bolt (save) · Spellcasting · **Firstborn Brand** (curse-debt) · 1/1 · 2/5 · soft band |
| storm-herder | brute-11-charger · Storm Stampede ×2 · Trample · 1/1 · 1/2 · soft reach | **defender-8-leader** · Aura of Authority · Thunder Hide · Slashing-Lash · Goring Antlers · Bolstering Cry (2/Day) (the stampede dropped by the floor, as in the release) · 1/1 · 4/5 · clean |
| glacier wyrm | dragon-22 · Devouring Maw (grapple, escape DC 22) · Sea-Freezing Breath (Restrained) · Spellcasting · legendary ×3 · 1/2 · 5/7 · clean | dragon-22 · Bite · Glacier Breath · **Undertow Breach** (hook-drag, Huge or smaller, pulled 30 ft.) · Spellcasting · Sure Footing · legendary ×3 · 1/2 · 7/9 · soft band, hot-offense |
| sun-crowned archlich | caster-21 (Lich) · print rows · Solaflare (Restrained rider) · Crown's Afterglow · Bound Dead of the Kingdom (no mechanic) · 1/1 · 12/12 · soft aim-dpr, under, print-rows | caster-21 (Lich) · print rows · Blighted Ray · **Shadowbrand Mote** (snare-bolt save) · Bound (bound to its resting place) · 1/1 · 9/12 · soft aim-dpr, under |

Read across: with authoring off, the template path produced the release's shapes again — the drag as a pull save, the curse as a curse-debt brand, the leader's aura and rally, the wyrm's Sure Footing and a pull, the Lich with a snare save — and the string-match coverage number on the bog hound reads 0/1 for a sheet that drags fishermen under (Mudslide Lock pulls 15 feet toward the hound; "drags" and "pulled" share no stem). Concept share is higher with authoring off on four of five (3/4 vs 2/2 is the exception, on two rows).

## Broken — for the step-7 brief, no fixes here

1. `multiattack2014` doubles "or" when the 2024 list carries an Oxford comma ("using Bite, Devilish Claw, or or Fiery Mace" — Pit Fiend 2014). Step-6 code.
2. The 2014 Spellcasting header ends "(spell save DC 17): -" — the bullet strip removes bare "-" lines but not an inline dash after the colon (Adult Green Dragon 2014).
3. The 2014 conversion call rewrites print's save sentences and the lint does not catch it: a doubled lead-in ("it must make the following saving throw. The target must succeed on…" — Pit Fiend Bite), a dropped half-damage clause (Noxious Miasma), a spell list with a literal "..." (Hellfire Spellcasting). Pre-existing variance, visible now because the diff is row-level.
4. The final price pass re-solves attack rows that wear print's name but carry no print flag: the Adult Green Dragon's Rend 15 → 24 (print 15), the Lich's Eldritch Burst 45 → 27 (print 31). Both editions.
5. An authored trait's `{dc}` can arrive without "DC" ("a 15 Charisma saving throw"); the renderer substitutes the number and ships it. The same trait's subject is garbled.
6. The repair call on a print body shipped a flavor sentence as a Traits row (Bound Dead of the Kingdom). The adjudicability gate exempts a passive trait that deals no damage and imposes no condition, so nothing caught it.
7. The attack form accepts a body part that does not strike: "Glass-Cut Stare" as a melee weapon attack.
8. On an authored sheet the trait seat and the signature exploiter do not run (by the step-5 rule), so the one-liners lose the template's identity rows — Sure Footing, Aura of Authority, the drain, the exploiter — and concept share falls (wyrm 7/9 → 5/7, herder 4/5 → 1/2). This is the invariance question for the brief: a one-clause prompt with no named body part or weapon reads better through the template path on four of five here.
9. Route variance flipped the storm-herder's donor (leader → charger) on this roll and not on the no-authoring roll minutes later. Not step 6; a known variance the brief should name.
10. The cross-row reference can land on the row that produces the condition (Mud-Drag Bite has Advantage against Grappled targets and is the grappler). Legal, pointless.

## Pass conditions, stated plainly

- Print names: identity rows present 6/6; trace says the template composed the sheet 6/6; zero unclassified differences 4/6 (Adult Green Dragon and Pit Fiend fail on 2014 conversion text and the Rend renumber). **Not a pass.**
- One-liners: zero unclassified 3/6; verdicts same 2, worse 4, better 0. **Not a pass.**
