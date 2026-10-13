# Step 7 — named parts are engine rows, the template path composes, authoring is the repair call — 2026-10-11

Brief: `STEP7-brief-2026-10-11.md`. Measure: the fixed twelve (`scripts/smoke-batches/step7-twelve.json`): six that exercise the change (Meshrin, the Iron Bull, Grandmother Ash, the bog hound, the glacier wyrm, the storm-herder) and six sentinels (the goblin warrior 2024, the kraken 2014, the plague-seer, Sir Reginald, knife ball, the AC 22 turtle), diffed row by row against the saved October 4 release rolls where one exists (`sweep-2026-10-04T09-58-22`) and against the step-6 round-two baseline (`baseline-fidelity-2026-10-04T19-26-50`) for the four prompts that postdate the release. Gate before every run: `npx jest` 181 suites / 5,182 tests, `npm run build` clean. Nothing landed while a run was in flight.

## What landed

**Move 1 — named parts are engine rows, no call.** `partRows(record)` in `generate.mjs`: a mechanical clause that names a part or weapon (the `PART_NOUN` list — no wings, shield or lantern: parts that do not strike, or that the thrown-weapon template owns; a hurled part is skipped for the same reason) becomes an attack form — the user's phrase as the name ("has razor sharp claws" → Razor Sharp Claws; "long tail for swipe attacks" → Tail Swipe; "large teeth for a vicious bite" → Vicious Bite; "bites for 50 damage" → Bite), type from `TYPE_BY_NOUN` then `PART_TYPE` (a part with no type never ships), mode from the noun, a rider only from `PART_RIDER` (tail, hooves, slam → Prone; jaws, maw, tentacles → Grappled with the escape DC; stinger → Poisoned; net → Restrained) or a condition word in the phrase. Parts take the chassis's attack slots in order (the rename pass carries the citations) and clone the priced slot past them; the cap stays; the Multiattack names every part. Part rows carry `part: true`: the slot-yield eviction, the identical-row dedupe, the lint's duplicate-entry rule and the audit's rename all leave them alone. Trace: `named parts: Greatsword (slot), Tail Swipe (slot, Prone), Razor Sharp Claws (clone), Vicious Bite (clone) — the user's words, the engine's numbers`.

**Move 2 — the template path composes on every sheet.** The `authoredSheet` flag and its skips are gone: the signature path, the trait seat, the library fallback and slot yield run as they did at the release, on part-row sheets too. The same-form wildcard yield and the unfilled-slot eviction are deleted (the signature path fills the slot again). `buildAuthorPrompt` and the pre-rename authoring call are deleted. The condition-payoff template's keys gained "fighting style", "trained", "martial", "technique", "discipline", so Meshrin's style binds by the user's words to the payoff on the tail's Prone — the live sheet shows it ("Marsh Pit Sweep: one creature within 30 feet that has the Prone condition").

**Move 3 — authoring is the repair call, last and strict.** One call after the signature path, never on a print body, for at most two mechanical clauses that no part row, template row (its text and its template's keys), library seed, or the donor's own style word (charger, grappler, hurler) claims. It may add one attack, one save, one trait, one reaction. The parser refuses: a non-striking noun as an attack (stare, gaze, glare, eye, voice, aura, presence, scent, stench, song, shadow, breath); a trait with no mechanic after a dealing-nothing `{dmg}` is scrubbed; a trait that carries a prose saving throw (saves are the save form); `{dc}` used as a distance; a cross-row reference whose payoff is its own rider row. A repaired row that doubles an existing name leaves. The Multiattack gains the repaired attack beside what it already cited; it never shrinks. A well-formed answer with nothing to add is valid, not a retry. `{dc}` always renders with its "DC".

**Defects 1–4.** `multiattack2014` strips a leading "or" from each name (the Pit Fiend's "or or"). The 2014 header dash ": -" is stripped. A print row's 2014 text is `to2014Grammar` of its 2024 text, never the conversion model's; the checker's edition gate adds `conversion-dropped-half`. A chassis row renamed to print's attack carries `printNamed` and the final price pass leaves it (the Green Dragon's Rend, the Lich's Eldritch Burst).

**One nova per sheet, template side.** A fitted or seeded row that arrives gated on a sheet whose chassis already carries a Recharge nova loses its gate and prices at the ceiling (`valueCheck … noGate`); the two-novas structure gate now has no template-path source left.

**Checker.** `adjudicable-mechanic` (a Traits row with no rule in it — flavor on a rules row), calibrated to 1 false positive in 822 saved blocks before the print idioms were added (False Appearance's "indistinguishable"; the Half-Dragon's "damage types"; the Cat's "rather than"; the Mule's "counts as"), 0 after; `conversion-dropped-half`; the lint's duplicate-entry exempts two part rows with one text.

## The rounds

Five runs of the twelve on the day; the engine was frozen for each.

| round | engine | saved | fails | what the round taught |
|---|---|---|---|---|
| 1 | moves 1–3 + defects, first landing | 12/12 | 5 | the repair call fired on nearly every sheet: "claimed" missed template rows' keys and the donor's own style (the bull's "It charges" on a charger); it returned four rows for the hag, two identical attacks, a flavor trait with a dealing-nothing `{dmg}`; the Multiattack cited a row the dedupe later removed; the snare template gated beside the dragon's breath (two novas) |
| 2 | + claimed by template keys and donor style; cap 2 clauses / 1 row each; dedupe drops the authored duplicate and sweeps citations; one-nova on the template path (ungated at the ceiling); `{dmg}` scrubbed before the mechanic test; part pairs exempt from duplicate-entry; "fire" is a noun | 12/12 | 1 | the wyrm's repaired trait carried a prose save ("must succeed on a DC 21 Dexterity saving throw") — 2014 wording and no target; Sir Reginald's repaired trait used `{dc}` as a distance; the audit renamed Razor Sharp Claws to Rending Claws; Meshrin's repair call failed validation on an answer with no rows |
| 3 | + a trait is not a save; `{dc}` is a DC; part names are the user's; an empty answer is valid | 12/12 | 1 | the snare template arrived already gated (the model's proposal, not the value check) — two novas on the wyrm; Meshrin's fighting style was unplaced by both paths |
| 4 | + a gated arrival loses its gate when a nova stands; the payoff template holds "fighting style" | 4/12 (provider stalls: 926 s and 430 s, then the harness aborted) | 0 | Meshrin's style lands as the Prone payoff; the wyrm keeps one nova |
| 5 | same engine | 8/12 (four provider timeouts: the bull at 926 s, the wyrm, the goblin, knife ball) | 0 | the measured result below; rounds 4 and 5 together cover nine of the twelve prompts on the final engine; the bull, the goblin warrior and knife ball stand on round 3, one landing earlier (the two later changes — the gate strip when a nova stands, and the payoff template's new keys — touch neither of those three sheets) |

After round 5 one constant moved: the part cap is `max(4, slots + 2)` (was 3), because Meshrin's Vicious Bite went to the repair call on a brute-5 variant with one attack slot. Pinned (`partRows` on Meshrin's record yields four rows); gated; not run live.

## Round 5 — the measured result (`step7-twelve-2026-10-11T20-01-55`, with `…T19-23-30` for the wyrm and `…T18-18-17` for the three the provider never returned)

0 fails of 8 saved; 0 of 4 in round 4; round 3's three stand-ins clean. Coverage 68% (15/22), concept share 73% (30/41) on round 5 — counts, not percentages, at this size: the dropped clauses are "is trained in fighting styles" (Meshrin — the row exists as Merciless Strike, the payoff on the tail's Prone; the string match does not see "fighting" in it), "drags fishermen under" (the hound — Bog Snatch pulls and pins; the match does not see "drag"), "swallows ships whole" (the wyrm — nothing holds it; the repair declined), "is deathly afraid of chickens" (Sir Reginald — Avian Terror covers it under "bird"), and four of Grandmother Ash's seven (her roll landed on the caster-binder chassis this time: nails, crows and choking all went unplaced; the repair added one trait).

### The six feature prompts

| prompt | path | rows that matter | verdict against the step-6 sheet (the release never ran these four) or the release sheet |
|---|---|---|---|
| Meshrin (2014) | parts + template | Greatsword (slot), Tail Swipe (Prone), Razor Sharp Claws, Bite — the user's four; Multiattack "using Greatsword, Tail Swipe, Razor Sharp Claws, or Bite" on the 2014 card; Merciless Strike, a Wisdom save that pays off the Prone the tail sets (the fighting style, by the template's new keys); Large, 30 ft., "Meshrin" throughout; gates ok | **same** as step 6's live Meshrin, by a different route: the parts are deterministic and the style came from the library, not a model call. Decided by Merciless Strike. (Round 5's Bite came from the repair; the cap fix makes it a part.) |
| Iron Bull (2024) — round 3 | parts + template | Gore (slot), Hooves (clone, Prone); Shockwave (Recharge 5-6), the ground-burst for "its hooves shake the ground when it stomps"; Trample; Searing Body for the scalding steam; Immutable Form, Magic Resistance | **same**. Lost against step 6: the adamantine trait (the repair declined it — "immune to anything but adamantine weapons" has no template and the strict repair refuses a rule with no number); gained a stomp nova and a steam trait that step 6 had turned into attack rows. Decided by Shockwave. |
| Grandmother Ash (2014) | template + repair | Noxious Spew (Recharge 5-6) — the cloud of ash as a spew; Heated Body for "hates fire"; Vulnerabilities fire on the card; Rotclaw; one repaired trait (Crow Sentinels, round 3: "aware of any intruders the crows detect") | **worse** than step 6 on this roll: the caster-binder chassis dropped the hover, the nails and the choke went unplaced (3/7). Decided by the Multiattack, which names Rotclaw and nothing of hers. The lurker-phantom roll (round 2, same engine) read 6/7. Route variance, named. |
| bog hound (2024) | template | Bite with the grapple and escape DC; Bog Snatch (hook-drag: pulled and pinned); Whelm; Sure Footing | **better** than the release (Bite + Whelm only) and the same as the check-in's authoring-off column. Decided by Bog Snatch. |
| glacier wyrm (2024) — round 4 | template + repair | Bite (Jaws), Glacier Breath (Recharge 5-6), Glacier Bind (the snare, **ungated at the ceiling** beside the breath — one nova), Rime Sovereign (Sure Footing's shape), legendary trio; "swallows ships whole" unplaced (the repair declined) | **same** as the release (Rimebite Consumption → Glacier Bind; Sure Footing kept). Decided by Glacier Bind standing ungated. |
| storm-herder (2024) | template | defender-8-leader again: Aura of Authority, Staff, Thunderlance, Bolstering Cry (2/Day) (the stampede idea fell to the floor, as in the release) | **same** as the release row for row. Decided by Aura of Authority. |

### The six sentinels

| prompt | rows | verdict |
|---|---|---|
| goblin warrior (2024) — round 3 | Scimitar, Shortbow, Nimble Escape; Multiattack "using Scimitar or Shortbow in any combination" | identical to the release but the Multiattack's phrasing (release: "makes two attacks, using Scimitar or Shortbow in any combination" — same). **Same.** |
| kraken (2014) | identical rows, both renderings | **Same.** |
| plague-seer (2024) | Nails, Wasting Ray, Mother's Tithe (the drain, renamed), Pestilent Ray, Curse of the Firstborn (repaired: Charisma save, Charmed) | **same** as the release shape (the drain is back); the repaired curse is a real save row. Decided by Mother's Tithe. |
| Sir Reginald (2014) | Longsword, Hurled Debris, Bellowing Quarry (aggro-curse), Avian Terror (repaired: "must flee from the bird by the safest route … until the bird is no longer visible") | **same** as step 6 (Avian Panic → Avian Terror, the one repaired trait that reads as a rule). Decided by Avian Terror. |
| knife ball (2014) — round 3 | Kick, Knife (returns), Fan of Knives (Recharge 5-6), Opportunist's Lash, Rolling Retreat, Fleet Agility | the hurler chassis this roll (step 6 rolled a grappler); **same** quality, different donor — route variance on a two-word prompt. |
| AC 22 turtle (2024) | Bite 49 (10d8 + 4) — the user's 50; AC 22 user-set; Swallow; Shell Defense | **same** as step 6; the declared fields hold. |

### Zero unclassified

Every difference in the nine diffs is one of: a part row for an authored row (same name or the user's phrase), a template row for an authored row (the one the check-in column predicted), a repaired row (five across nine sheets, every one a rule the gate can read), a renamed or re-flavored row with identical numbers, or a donor flip the route rolled (Grandmother Ash, knife ball). No row was lost to a skip; no placeholder shipped; no stare, flavor trait, bare DC or doubled "or" appears.

## What is not done

- The bull, the goblin warrior and knife ball never returned on the final engine (provider stalls at the route, fit and audit calls). Their round-3 sheets differ from the final engine by two changes that do not reach them. The next twelve is their proof.
- "swallows ships whole" has no row: no template holds a swallow for a non-engulfer dragon, and the strict repair declines. The old release also had none (Rimebite Consumption was an exploiter, not a swallow). A swallow template is a library item for the close-out list.
- "immune to anything but adamantine weapons": the repair refuses a rule with no number and no closed condition, so the adamantine clause is unplaced on the bull. It needs a header idiom (the 2014 Iron Golem's) or a template; close-out list.
- Coverage's string match undercounts rows that paraphrase the clause (Merciless Strike for "fighting styles", Bog Snatch for "drags"). The metric, not the sheet.
- Grandmother Ash's two rolls differ by donor (lurker-phantom 6/7, caster-binder 3/7). Route variance on a paragraph prompt, as named in the brief.

## Gate at close

181 suites, 5,182 tests, build clean, every landing. Pins: `step6.spec.js` (named parts, the mechanic predicate, the DC exemption, the Multiattack renderer), `sweep-fixes.spec.js` ("step 6" and the Meshrin regression case, rewritten for parts), `author.spec.js` (the validator accepts an empty answer), `engine-2014.spec.js` unchanged.
