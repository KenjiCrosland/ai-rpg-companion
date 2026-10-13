# Fidelity baseline — the "before" — commit eca4f6b, run baseline-fidelity-2026-10-04T10-44-11

Eighteen prompts composed to the brief's shape spec (no production-log access from the agent; swap real ones in before step 4 without changing anything else) plus Meshrin verbatim. Run once on the released engine. Gate table: 0 fails of 18, 6 softs. Coverage and concept share are HAND-COUNTED against the `clauses` list in `scripts/smoke-batches/baseline-fidelity.json` (header + mechanical clauses; descriptive words excluded); concept share counts rows other than Multiattack and the legendary-uses line, a row tracing to the user's words over the total. The automated versions arrive in step 4 and must land within a block or two of these.

| # | Block | Shape | Coverage | Concept share | What's missing / wrong |
|---|---|---|---|---|---|
| 1 | Meshrin (2014) | Meshrin verbatim | 4/8 | 3/3 | no claws, no bite, no fighting styles, not lizard folk; "the meshrin"; the tail is a hybrid row that throws at range 30/120 |
| 2 | Knife Ball (2014) | 2 words | 2/2 | 2/3 | the Cage trait is the grappler chassis's |
| 3 | Mire Grudge (2024) | 2 words, blank CR | 2/2 | 4/6 | Claw/Hex Bolt and Spiteful Mending are chassis and seed |
| 4 | Troll (2014) | print name, blank CR | 1/1 | 3/4 | the chassis's Charge rides beside print's rows; CR 5 is print's |
| 5 | Vasarch (2024) | head-noun, blank CR | 2/3 | 8/10 | no thralls/command; blank CR took the donor's 8 (print Vampire 13) |
| 6 | Mogwurt Netcaster (2014) | one-liner | 2/3 | 4/6 | the net became a row NAMED Shortbow that restrains; no frog mount row (speed 50 only) |
| 7 | Stillstone Gargoyle (2024) | one-liner | 2/3 | 2/4 | "moves when unobserved" absent; Adhesive Hide is the mimic chassis's |
| 8 | Oaksworn Remembrancer (2014) | removal clause | 2/3 | 1/5 | the removal was ignored: Spellcasting, Misty Step and Shield all shipped |
| 9 | Siltclaw Snapper (2024) | user numbers | 2/4 | 2/3 | AC 22 → 15; bite 50 → 31; the user's numbers were overwritten silently |
| 10 | Pikachu (2024) | IP name | 2/2 | 1/3 | Lightning typed on a row named Hurled Debris; Spellcasting/Shield are the caster chassis; IP rule held (no Thunder Shock) |
| 11 | Sir Reginald (2014) | named individual | 1/3 | 1/3 | fear of birds and fleeing absent; "the sir" |
| 12 | Lintbound Smotherer (2024) | joke | 2/4 | 2/4 | smell inverted (Scenting Stalker smells OTHERS); sock language dropped (Languages: None) |
| 13 | Grandmother Ash (2014) | paragraph | 2/6 | 2/5 | fire vulnerability INVERTED to Heated Body; no ash-cloud form; no crows; no hag rows |
| 14 | Ore-Road Warden (2024) | paragraph | 5/7 | 3/6 | no steam breath; adamantine-only immunity replaced by Fire riders throughout |
| 15 | Lantern Drowned (2014) | paragraph | 3/4 | 3/5 | shoreline restriction absent; numbing is cold damage only |
| 16 | Owlbear (2024) | print, 1 word | 1/1 | 1/1 | one Rend, no Multiattack — correct and bare |
| 17 | Grubbin Sootscale (2014) | one-liner | 2/3 | 1/4 | caltrops/traps absent; Trap Runner is the opposite (ignores terrain) |
| 18 | Apiary Wyrm (2024) | joke body | 1/2 | 1/3 | bees absent beyond Poison Breath; Slashing Rend on a bee body |

**Totals: coverage 38 of 61 clauses (62%); concept share 44 of 78 rows (56%).** Dropped: 23 of 61 user clauses, all silently. Three inversions (Heated Body on a fire-vulnerable hag, Scenting Stalker on a creature that smells, Trap Runner on a trapmaker) and two silent overrides of user numbers are the sharpest losses — each is a sheet contradiction under the owner's standard, not just a gap.

## Meshrin, as rendered (2014)

Meshrin | Large humanoid, lawful neutral | 30 ft. | AC 19 (splint, shield) | HP 136 (16d10 + 48) | Common

- Multiattack. The meshrin makes two attacks, using Greatsword or Tail Sweep. It can replace one attack with a use of Trenching Tail Sweep.
- Greatsword. Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 26 (5d8 + 4) slashing damage.
- Tail Sweep. Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 26 (5d8 + 4) bludgeoning damage.
- Trenching Tail Sweep. Strength Saving Throw: DC 15, one creature within 30 feet. On a failed save, the target is pulled up to 25 feet…

Against the regression case: Large ✓, Speed 30 ✓, greatsword ✓, tail ✓ (as a thrown hybrid, which is wrong), claw ✗, bite ✗, fighting styles ✗, "Meshrin" throughout ✗ ("the meshrin"), gates ok ✓, coverage 4/8 ✗.
