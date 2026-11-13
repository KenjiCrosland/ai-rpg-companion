# Critic response — the forty `sweep-2026-11-12T07-37-26` (2026-11-12)

Written by Fable for whoever implements next (Opus). No conversation history is assumed. Every
item below was traced on the saved run (`smoke-out/sweep-2026-11-12T07-37-26/NN-*.md`) and in the
code before it was written down; the sheet index is given with every row name. The critic's own
table is appended at the bottom, verbatim — read it after this, not instead of it.

**The critic's score: Keeper 12 · Runs 20 · Tweak 5 · Fix 3.** Baseline (11-08): Keeper 10 · Runs 18
· Tweak 8 · Fix 4. Release bar is Fix ≤ 2 — missed by one. He calls the read **provisional**: the
compact render broke his script, so this is a hand read (he checked the three sheets that were hot
last time and every "replace one attack" row).

**Two things about this forty the critic could not know:** it was run BEFORE the reactions merge
(`src/data/srd52-monsters.json` 3 → 22 Reactions sections) and before Item C (elemental
immunity). So #22's missing Redirect Attack is already fixed by data, and nothing here reflects
Item C.

---

## 1. His three Fixes, traced

| # | his claim | what the trace says | verdict |
|---|---|---|---|
| **33 Hatchery Warden** | Unarmed Strike ends "*Constitution Saving Throw*: DC 14." — a save with no Failure clause | The monk kit welded Stunning Strike onto the chassis Claw (`class kit: monk — Stunning Strike (stunning-strike, rides Claw)`) and recorded it as `host.kitRider` (generate.mjs 4303). The rebuild restores it (4616) and then **deletes the record** (4620). The print-canon rename Claw → Shortsword runs H14's per-condition strip (8129): the Spy's Shortsword imposes nothing, so the sentence naming Stunned leaves — the strip can no longer tell it was the kit's. It drops only the sentence with the condition word, leaving the two frame sentences. The audit then flagged it, read `row.print` and classified it "on print — no sheet-level fix". | **Ours.** Two defects in one: the monk lost its Stunning Strike, and the frame it rode in was left standing. |
| **28 Ilvareth Dusksong** | "Bound … to the shadow of the one who wronged it" — undefined referent, contradicts the teleport ask | The fit call refused every template (`declined_because: no_fit`), the seat tried to author and wrote nothing, and then **`closest accepted`** landed `bound` — the template the call had just refused (`closest accepted: trait — the call refused every template but named "bound" as nearest and declined it for no_fit; it lands rather than the row being dropped`). One-mechanic-one-name stamped it "Bound". The audit flagged it three times and classified "on the body [bound] — a catalog row" — no fix. | **Ours — but his root cause is wrong.** The Bound template is not missing an anchor; the row should not exist. The call judged, the engine overrode it. |
| **18 Osseous Heliarch** (a) Protective Magic | "no Trigger, and the 3/Day is gone … print's row replaced with a worse one on two sheets (#26 too)" | SRD 5.2's **Lich** row is `Protective Magic` with **no** 3/Day (both source copies: `scripts/srd-source/*.md` lines 5054 / 5117). Only the Mage and Archmage carry (3/Day). Print's text is prose — "in response to the spell's trigger" — with no Trigger: line (refuted on 11-10 too). The trace shows print's row pasted: `print canon row: Reactions/"Protective Magic" — print's own row takes the name back from the engine's`. "(Reaction)" is the 2014 render folding Reactions into Traits (format-2024/generate.mjs:1205) — the batch asked for 2014. **#26 Grandmother Fen** is the Mage's row word for word, 3/Day included. | **Critic error, both halves, third sighting.** Tell him. |
| **18 Osseous Heliarch** (b) Bone-Sun's Appetite | "chooses whether the 20-foot sphere is active or suppressed — no sphere is defined" | The free-row REPAIR rewrote the heal trait as a 2024 Emanation with an active/suppressed toggle (the 2024 printing reads coherently: "in a 20-foot Emanation originating from the heliarch … chooses whether the 20-foot Emanation is active"). The **2014 conversion** turned "Emanation" into "sphere" and dropped "originating from" — "the 20-foot sphere" now has no antecedent. | **Ours — a 2014-conversion leak**, same class as the two standing FAILs (#15's `at-will-inline`, #33's `vocab-2024-in-2014`). Also: the repair ADDED a light-emission mechanic to a heal trait — "we don't add new parts, we polish". |

So on the critic's bar, as traced: **Fix 2 of ours** (#33, #28) plus one conversion leak (#18b) he
counted under a wrong headline. Not a release call either way — the owner makes that.

## 2. His "claims to re-check"

| claim | trace | verdict |
|---|---|---|
| **#39 Veteran Sellsword** — Shortsword still says "a handaxe returns to the sellsword's grasp" (8 of 8) | `named parts: Handaxe (slot), Shortsword (slot)`. Line 3543 lets a melee part take a leftover **ranged** slot; the hurler's Ranged Attack carries `*Hit or Miss:* Immediately after the attack, {projectile} returns to the creature's grasp.` The retype at 3903 rewrites only the attack HEAD (`*Melee Attack Roll:* +7, reach 5 ft.`) and keeps the throw's clause. The existing drop at 4744 fires only when `projectile_supply ≠ single` — the handaxe IS single, so the clause stayed, on the wrong row. | **Ours.** This is handover item 18 (melee half), still open; now 8/8. |
| **#34 Krennik** — Cavalry Bow restrains (the web rider again) | The seat's idea named Restrained (the worg's jaws); the fit call chose `bolt-restrain`, a template that cannot say "worg". `hold_shape: none` on the route. **I measured a gate** (hold_shape none → no hold-imposing template): it fires on **2 of 32** hold_shape-none sheets — #34 (his Tweak) and **#11 Vampire's Binding Snare, which he scored a Keeper**. | **Refused build.** A gate that kills a Keeper to fix a Tweak. Leave as Runs. |
| **`[2014 rules]` tag on 2024 bodies** (#07 Hydra HP 184, #11 Vampire, #15 Adult Red) | sweep.json asks `rules: 2014` on all three; the engine's 2014 move is the SRD 5.2 body in 2014 wording ("2014 conversion: one lint-gated call — both printings saved"), on 20 of 40 sheets. SRD 5.2 is the only verbatim source (memory `srd-only-verbatim`). | **Owner ruling, not a bug.** His GM-facing point is fair: a 2014 header on a 5.2 body "tells them the wrong book". Options: label the review page "2014 wording · 2024 SRD body", or accept. See §5. |

## 3. Everything else his table surfaced that traced to a cause

| # | row | trace | verdict |
|---|---|---|---|
| **38 Barrow Duelist** | Multiattack: "It can replace one attack with (Recharge 5-6)." | `name follows content` (9872) renamed Charnel Charge → Charnel Shove and then called **`sweepDeadName`** — which treats the old name as DEAD and strips its citations — instead of re-citing. Its Multiattack fallback removed "a use of Charnel Charge" and left "(Recharge 5-6)."; the stump guard (`with.` / `with a use of.`) does not see a trailing gate. Three rename sites re-cite (one-mechanic-one-name 2391 split/join; audit rename 10440 `citeRe`; print-canon rename `citeRe`, "one definition"); this one sweeps. The audit's Multiattack finding was classified `[chassis] — fix belongs in the donor` and dropped; a Multiattack is engine-composed, never the donor's. | **Ours.** Rename family. |
| **20 Trench Leviathan** | Multiattack cites "Song-Drowned Nerves (Recharge 5-6)" after `one nova at ship` un-gated the row to "Song-Drowned Nerves" | Same family: a rename that does not re-cite. | **Ours.** Rename family. |
| **22 Goblin Boss** | Redirect Attack missing (2nd sweep) | The corpus now carries it; `printCanonFor('goblin boss')` returns `Reactions/Redirect Attack` in `rulesRows` (probe, today). The forty predates the merge. A stale comment at generate.mjs ~9005 still says "print's Goblin Boss has NO Redirect Attack" — fix the comment when touched. | **Fixed by data after the run.** Next run shows it. |
| **30 Reliquary Vault Ooze** | no blindsight — Senses is passive Perception only | Donors carry no senses; the concept call writes them ("ONLY if this creature's own kind has one") and a floor exists for **dragons only** (8587). Print oozes: **4 of 4** blindsight 60 ft. `bodyType === 'ooze'` is already a declared value (Item C uses it). | **Ours.** One line beside the dragon floor. |
| **17 Pit Fiend** truesight 60 (print 120); **09 Stone Golem** darkvision 60 (print 120); **18 Lich** darkvision 120 (print truesight 120) | `print canon senses` runs only under `pcSpeed`, which is null when `borrowOnly` — every twist on a whole print name. Probe over the forty's 16 print-body sheets: senses wrong on **3 of 11 twists** (punctuation differences excluded). | **Ours.** The twist path is a print body; its senses are print's. |
| **05 Air Elemental** Stealth +8; **04 Ghost** Stealth +5; **09 Stone Golem** Athletics +10; **13 Purple Worm** Athletics +14; **38 Skeleton** Athletics +7 — skills print does not have | `print canon skills` (8684) runs only `if (pcPlain?.skills …)` — an EMPTY print skills line is read as "unknown", so the chassis's skills stand. Same lesson the languages line already learned: an absent field IS print's None. **5 of 16** print-body sheets. (#32 Stone Giant's Athletics +10 vs print +12 is a different thing — stat-derived; leave it.) | **Ours.** Closed fact. |
| **14 Thawless Heart** | Merciless Strike: "if the target already is knocked prone, it also is knocked prone" | 2024 printing: "If the target already has the Prone condition, it also has the Prone condition." — the chassis nova's payoff clause filled Prone into both slots (`imposes: "Prone"`). Not a conversion bug; a fill whose precondition equals its payoff. | **Ours, small.** Where the payoff fill is chosen, refuse `payoff === precondition`. Trace which pass fills it before building. |
| **11 Vampire** | "until the brambles is destroyed" | The `snare` template's `{object}` fill with a plural noun. | Grammar; Tweak. Note only. |
| **39 Veteran Sellsword** | "Pair of Hands" — a free Handaxe attack on every Shortsword hit | Authored free row; the audit is told NOT to judge strength (audit.mjs ~203: "if your reasoning contains 'too strong' … the chassis owns it"). Nothing prices an authored trait that grants attacks. | **Design gap, not a build.** Owner's free-row bar is "sound + action economy + not a dead row"; the audit cannot see action economy on an authored row. Park with a note. |
| **35 Wellmouth Mimic** | "name field still not the header (4/4)" | sweep.json[34] is `{"name":"the thing in the well","description":""}` — a NEVER-FAIL canary with no information. The engine named it. | Not a defect; the canary's purpose. |
| **24 Sump Gallowsman** | also had a `multiattack re-read` | Keeper. No harm there. | — |

## 4. The measurement the owner asked for on 11-11: `closest accepted`

The owner parked this arm's direction ("not clear on closest accepted direction"). Now there is a
number. The arm fires ONLY on `no_fit` (the enum is `collision | already_answered | no_fit`;
`nearBlocked` already stops the first two). On this forty it fired on **10 of 40 sheets, 11
landings**, and by the critic's own table:

| landing | sheet | his read |
|---|---|---|
| `bound` → "Bound" | #28 | **Fix** |
| `lure` → "Luring Presence" | #31 Thunderhead Drake | named misfit — "the siren row again, on a storm drake" |
| `pull-through` → "Engulf" | #30 Reliquary Vault Ooze | named misfit — "drags a creature through a wall"; the audit flagged it 3× as a template row, no fix |
| `fear-aura` → "Fear Aura" | #04 Chapel Bell-Ringer | named — "Fear Aura unasked" |
| `guarded-stance` | #33 | vetoed by the free-row budget; never shipped |
| `feint-slip`, `fear-aura`, `noxious-aura`, `aberrant-ground`, `relic-object`, `warded-mending` | #02, #05, #07, #14, #17, #30 | Runs (the hydra's Keeper is for regrowth-removed + the zone row, not this one) |

**1 Fix, 3 named misfits, 0 Keepers, out of 11.** The arm has already been patched once (the
`closest_subject: flipped` guard, 11-05). Recommendation: **retire it** — the call said nothing
fits; the owner's own rule for an unanswered exception is that it does not happen. Cost: ~11 rows
a forty, none of them Keepers. This is the owner's call (§5 A).

## 5. Asks — the owner rules before Opus writes

- **A. Retire `closest accepted`** (generate.mjs 6195–6215). Recommend yes, per §4.
- **B. A checker FAIL for a save with no outcome** — a row whose text has `*X Saving Throw*: DC N.`
  and no `*Failure:*` / `*Success:*` after it. This reads the engine's own form token, not meaning —
  but it is a text match, so it is an ask. Recommend yes as a FAIL (`save-no-effect`): print never
  writes a save without an outcome; measure 0 of N on the corpus before shipping.
- **C. The 2014 tag.** A `rules: 2014` sheet is the SRD 5.2 body in 2014 wording. Label it on the
  review page ("2014 wording · 2024 SRD body") or accept as-is.
- **D. #39's fix reuses the existing Hit-or-Miss strip regex (4744) at a second site (3903).** Same
  definition, engine's own donor text. Alternative: a melee part never takes a ranged slot (clone
  instead). Handover item 18 said "fix at the mapping" — either is one line.

## 6. Order for Opus (each: site · test · canary). Twelves per feature; `--only N` first.

1. **#33 — the kit's rider survives the rename.** Do not `delete e.kitRider` at 4620 (it is declared
   data a later pass needs); at the H14 strip (8129) a sentence contained in `e.kitRider` stays —
   the engine's own rule, "on a class body the kit owns the class's rows". Spec: a monk on the Spy
   keeps Stunning Strike's save AND its Failure after the print rename. Canary: sweep #33
   (`lizardfolk monk`, CR 5, 2014). Also remove the stale Goblin Boss comment at ~9005 while there.
2. **#28 — retire `closest accepted`** (if A is yes). Spec: on `no_fit` with no authored row, the
   seat ships nothing. Canaries: #28 Ilvareth (no Bound), #31 Thunderhead (no Luring Presence),
   #30 Ooze (no Engulf-through-wall). Expect the sameness/free-row counts to move; state them.
3. **Rename family — re-cite, never sweep.** `name follows content` (9867 and 9872) and
   `one nova at ship` un-gate use the same `citeRe` rename the audit rename uses; `sweepDeadName`'s
   stump guard also eats a trailing `(Recharge …)`/`(N/Day)`. Count the copies first (four rename
   sites, two mechanisms) — one helper if it falls out cleanly. Canaries: #38 Barrow Duelist,
   #20 Trench Leviathan.
4. **#39 — the retype drops the throw clause** (per D). Canary: #39 (8/8 → 0/8). Control: a GM-named
   handaxe keeps its return.
5. **Print header on the twist path.** Senses: a twist on a whole print name takes print's senses
   (3/11). Skills: print's empty skills line is None (5/16), the way languages already read it.
   Canaries: #17 Pit Fiend truesight 120; #05 Air Elemental no Stealth. Control: #01 Dire Wolf
   unchanged.
6. **Ooze blindsight floor** — `bodyType === 'ooze'` → blindsight 60 ft., beside the dragon floor
   (8587). Canary: #30.
7. **2014 conversion leaks** — already in the plan: trace one each of `vocab-2024-in-2014` (#33
   FAIL), `at-will-inline` (#15), and now Emanation → "sphere" losing "originating from" (#18b).
8. **Audit classification** — a Multiattack finding is ours (engine-composed), never `[chassis]`;
   route it to the deterministic re-read rather than dropping it. Secondary; the rename fix removes
   this instance.
9. **#14 payoff = precondition** — trace the fill site, refuse the equality. Small.

Parked with a note: #39 Pair of Hands (the audit cannot price an authored row's action economy);
#11 brambles grammar; #34 bolt-restrain (gate refused, §2).

## 7. What to tell the critic

- The SRD 5.2 **Lich's** Protective Magic has no 3/Day (Mage and Archmage do); print's shape is
  prose with no Trigger line; "(Reaction)" is our 2014 render. #26 is the Mage's row verbatim.
  Third time on this row — the next brief carries the Lich/Mage/Archmage rows side by side.
- #22 is fixed by data landed after this run.
- The forty predates the reactions merge and Item C.
- His parser broke on the compact render. Next package: offer `review.html` or the earlier layout.
- His "the note said 0 of 8" on #39 — no note was sent this time; the item is open at 8/8.

---

## Appendix — the critic's response, verbatim (2026-11-12)

# Critic — crafted forty, sweep `2026-11-12T07-37-26`

Blocks only this time, no note, so this is scored against the release list from sweep `05-57-15` (A(i) blind eye, B at-will AoE, C citations/triggers) and the same four-dimension format.

**Keeper 12 · Runs 20 · Tweak 5 · Fix 3.** Sweep 3 was 9 / 23 / 4 / 4.

**Hot: none by hand read.** The compact render broke my parser, so this is not the scripted DMG read; I checked the three sheets that were hot last time and every "replace one attack" row. Treat it as provisional until the script is re-pointed.

### 1. The release list, on this roll

| item | state | evidence |
|---|---|---|
| **A(i)** lack-removal keeps the flaw row | **landed on this roll** | #15: "Sight Weakness. Disadvantage on Wisdom (Perception) checks that rely on sight." Subtractive, adjudicable, and Rend is print's 13 + 5. One roll of a flicker; needs 3/3 on "blind in one eye" without the lance |
| **B** at-will AoE in Multiattack | **holds** | no at-will damaging area row inside any Multiattack. Grumm (was Gormak, +3.2) swaps in a no-damage roar; the Duelist's line is Recharge 5-6; the Leviathan's second cone is tagged Recharge |
| **C** citation / event / precondition | **Krennik's phantom trigger is gone; three new missing referents** | #28, #18, #33 below |

So A and B read closed on one roll. C's original instance is closed, and the same family produced all three Fixes.

### 2. The three Fixes

**#33 Hatchery Warden (lizardfolk monk)** — Unarmed Strike ends: "…the target is subjected to the following effect. Constitution Saving Throw: DC 14." and stops. No Failure clause. The stun was removed and the save was left behind. A save with no effect is the simplest possible form of the missing-number family.

**#28 Ilvareth Dusksong** — "Bound. Ilvareth is bound to the shadow of the one who wronged it. It can't willingly move more than 120 feet from the shadow of the one who wronged it…" This is the Pale Warden's door template with a phrase nobody typed in the slot. No one wronged Ilvareth; no such shadow exists on the sheet; and it leashes an archmage whose ask was "steps between places." Undefined referent, and it contradicts the clause it was written for.

**#18 Osseous Heliarch** — two defects on a print body:
- "Protective Magic (Reaction). The heliarch casts Counterspell or Shield in response to the spell's trigger" — no Trigger, and the 3/Day is gone. On sweep 3 this row was print's clean text. This is the name-collision guard's exception (Grizzelda, 11-09) now reaching the lich. Grandmother Fen (#26) has the same broken row. **A fix is replacing print's row with a worse one on two sheets.**
- "Bone-Sun's Appetite … the heliarch chooses whether the 20-foot sphere is active or suppressed" — no sphere is defined anywhere on the sheet.

### 3. Claims to re-check

- **Returning clause "0 shipped"** — #39 Veteran Sellsword: "Shortsword … Immediately after the attack, a handaxe returns to the sellsword's grasp." Still there (8 of 8 on this input), and a new trait repeats it ("…and the handaxe is back in its grasp").
- **The web rider is still migrating** — #34 Krennik's Cavalry Bow: "If the target is a Large or smaller creature, it is restrained until the end of its next turn. This effect can be applied only once per turn." Same sentence as Skritch's crossbow on 11-09.
- **The `[2014 rules]` / `[2024 rules]` tag is wrong on print bodies.** #11 Vampire (Grave Strike, no Regeneration), #15 Adult Red (three Rends + Spellcasting) and #07 Hydra (HP 184) are 2024 bodies tagged 2014. If a GM sees that tag, it tells them the wrong book.

### 4. Per block

| # | sheet | runs | got | keeper | tw | verdict | notes |
|---|---|---|---|---|---|---|---|
| 01 | Dire Wolf | ✓ | 1/1 | **Pale Rime** (frost hide → Stealth in snow), one Bite, print body | 0 | Keeper | cleanest draw on this input; Dust-Death Bite gone |
| 02 | Mud Sump Hound | ✓ | 1/2 | — | 1 | Runs | grapples, but nothing drags under this roll (no Whelm) |
| 03 | Owlbear (climb) | ✓ | 1/1 | fidelity | 1 | Tweak | Mauling Slam: 24 on a save replacing a 14 Rend, at will, at CR 3; "Learned to Climb" misnomer gone ✓ |
| 04 | Chapel Bell-Ringer | ✓ | 1.5/3 | 2024 ghost kit | 2 | Runs | Knell *of the Dying* is a bludgeoning bolt with no dying trigger; Fear Aura unasked |
| 05 | Air Elemental | ✓ | 0.5/1 | print | 1 | Runs | Stolen Shriek deafens — a voice row at least; Stealth +8 added to print |
| 06 | Living Scree | ✓ | 2/2 | Avalanche Grip → Entomb, all Bludgeoning now ✓ | 1 | Keeper | "strikes where the target cannot guard" is filler prose (also #14) |
| 07 | Hydra | ✓ | 2/2 | regrowth removed + Choking Haze | 1 | Keeper | haze gives *each creature* in it disadvantage, the hydra included |
| 08 | Gatebreaker Golem | ✓ | 0.5/2 | — | 2 | Runs | no Siege Monster (again), no timber row this roll; name is the only wall |
| 09 | Stone Golem | ✓ | 0/1 | print 2024, clean | 0 | Runs | saint ✗; no filler added ✓ |
| 10 | Drowned Choir | ✓ | 1.5/3 | One Sustained Note | 2 | Runs | a choir that Bites and Hides (Stealth +11); Aura of Truth gone ✓ |
| 11 | Vampire | ✓ | 1/1 | **Binding Snare** (brambles, object exists) + full kit | 1 | Keeper | "until the brambles is destroyed" |
| 12 | Plaguebearing Archon | ✓ | 2/3 | **Brood Hive Aura** (Poisoned — plague landed) + AoA | 2 | Runs | Brood *Command* is a blinding cone; nothing commands swarms this roll |
| 13 | Purple Worm | ✓ | 0/1 | print | 1 | Runs | armoury ✗ (Grinding Gullet gone); Swallow still the rewritten action (4th sweep) |
| 14 | Thawless Heart | ✓ | 1.5/2 | Cold Absorption + Siege Monster | 2 | Runs | Merciless Strike: "if the target already is knocked prone, it also is knocked prone"; still no wake |
| 15 | Adult Red Dragon | ✓ | 1/1 | **Sight Weakness** + print Rend + Pounce | 1 | Keeper | A(i) ✓. Scarred Socket's Regard is a free-standing frighten with no place in the turn |
| 16 | Brass Tyrant | ✓ | 1/2 | Molten Brass Sheath + Furnace Blast | 2 | Runs | rules ✗ (3rd of 4 rolls); Large this roll (was Huge) |
| 17 | Pit Fiend | ✓ | 0.5/1 | fidelity; Oathreaving Utterance (psychic + Frightened — closer than a bludgeoning save) | 1 | Runs | truesight 60 ft (print 120) |
| 18 | Osseous Heliarch | ✗ | 1/2 | lich kit | 2 | **Fix** | §2 |
| 19 | Ancient Gold Dragon | ✓ | print | fidelity | 0 | Keeper | |
| 20 | Trench Leviathan | ✓ | 1.5/2 | Trench-Song | 2 | Runs | two near-identical cones; the Recharge tag sits in the Multiattack sentence, not on the row; fleets ✗ |
| 21 | Owlbear | ✓ | print | fidelity | 0 | Keeper | |
| 22 | Goblin Boss | ✓ | print | fidelity | 1 | Runs | Redirect Attack missing (2nd sweep) |
| 23 | Vashka the Red | ✓ | 2/4 | **Locked Wall** (+2 AC with shielded allies in reach) | 2 | Keeper | AC 16 in "lacquered plate" (2nd); Pack Tactics gone; Performance +5 |
| 24 | Sump Gallowsman | ✓ | 4/5 | **Scythe-Arm Strike + Two-Armed Pin + Caustic Runoff** — scythes, pin and acid shell all landed | 1 | Keeper | first roll with a scythe attack. Spitting Maw still melee (7/7); the name has nothing to do with an insect |
| 25 | Iron Tomb Gate Sentinel | ✓ | 3/3 | Ward Bond + Interpose + Iron Bulwark — a sentinel that guards | 0 | Keeper | AC 20 / Huge / 20 ft ✓ |
| 26 | Grandmother Fen | ✓ | 1.5/3 | — | 3 | Tweak | curses → Marsh Rot (no healing) ~; Fireball and Cone of Cold on a marsh witch; the broken Protective Magic (§2); HP 81 at CR 7 |
| 27 | Gateworn Templar | warm | 2/3 | no magic ✓ | 2 | Tweak | Gladiator ×3 Mace 3d8+4 + rider + AoA (12/12); Iron Line cites flanking, an optional rule |
| 28 | Ilvareth Dusksong | ✗ ‼ | 1.5/3 | Shadow Step | 1 | **Fix** | §2 |
| 29 | Swarm of Funeral Bells | ✓ | 1/3 | — | 2 | Runs | bells that attack with *Talons*; Toll deals bludgeoning, no dying trigger |
| 30 | Reliquary Vault Ooze | ✓ | 1/2 | ooze kit, acid now ✓ | 2 | Runs | **no blindsight — Senses line is passive Perception only**; Engulf drags a creature through a wall |
| 31 | Thunderhead Drake | ✓ | 1/2 | Thunder Wall | 2 | Runs | **Luring Presence** on a storm drake (the siren row again); wall is a 15-ft cone (13/13) |
| 32 | Grumm Stonebrow | ✓ | 2/2 | Languages: Giant ✓; Quarry-Stone Stance | 1 | Keeper | B ✓ — not hot. AC 14 (print 17) |
| 33 | Hatchery Warden | ✗ | 2/2 | — | 1 | **Fix** | §2. Cunning Action gone ✓ |
| 34 | Krennik Skullstandard | ✓ | 1/1 | Worgrider's Charge + Mounted Agility | 3 | Runs | C's instance closed ✓. Bow restrains (§3); Stampede's sentence is doubled; no standard, despite the name |
| 35 | Wellmouth Mimic | ✓ | ✓ | Tendril → Thirsting Call | 0 | Runs | name field still not the header (4/4) |
| 36 | Ember Cordgrass | ✓ | role ✓ | — | 0 | Runs | Multiattack present ✓ |
| 37 | Meshrin | ✓ | 8/9 | six numbers ✓, Terrifying Roar | 1 | Keeper | Wounded Frenzy for Rage (8th); 120 vs 119 |
| 38 | Barrow Duelist | ✓ | 2/2 | skeleton kit | 2 | Tweak | **"It can replace one attack with (Recharge 5-6)."** — the row name is missing from the sentence; Great Weapon Master; CR 6 for "a skeleton" (9th) |
| 39 | Veteran Sellsword | ✓ | 2/2 | Riposte | 3 | Tweak | §3; "Pair of Hands" gives a free Handaxe attack on every Shortsword hit |
| 40 | Brother Halric | ✓ | blank ✓ | 2024 Priest kit | 1 | Runs | Grave-Rot Rite (necrotic + Poisoned) on a parish priest |

### 5. Reading

Three things are true at once.

1. **The sweep-3 release list is met on this roll.** A(i) and B need their 3-roll and replay confirmations, but nothing on this forty contradicts them.
2. **The Fix family didn't shrink; it moved.** All three Fixes are "a row that points at something that isn't there" — a save with no effect, a leash to an undefined shadow, a reaction with no trigger and a sphere nobody defined. Two of the three come from templates or guards added in the last week (Bound; the name-collision exception). That's the same pattern as the `legendary` field: recent fixes are now the main source of new Fixes.
3. **The good draws are better than they've been.** The Gallowsman finally has scythes, a pin and an acid shell on one sheet. The Sentinel guards. The Dire Wolf's frost is one clean trait. The dragon's blind eye is a subtraction a GM can run.

**Shortest path from here:**
- Revert or narrow the name-collision exception so print's Protective Magic always wins (#18, #26). Deterministic, one roll.
- A save row must have a Failure clause or it doesn't ship (#33). Deterministic lint.
- The Bound template only fires when the call names the thing it's bound to (#28). Deterministic.
- Find out why #39 still carries the returning clause when the note said 0 of 8.

That is four small items, all one-roll verifiable, none of them new rules. After those, I'd stop adding and ship.
