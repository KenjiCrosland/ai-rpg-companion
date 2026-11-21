# The soundness round — six items built, and the replay stops the recording

Branch `statblock-enhancments-part-2`. Six commits: `186cdf8` item 1, `fabcfac` item 2,
`740059e` item 3, `d456be0` items 4 and 5, `78a71ce` the curse keys, and this one.

Blocks: `BLOCKS-soundness-2026-11-21.md`, all forty.

**THE ROUND STOPS BEFORE RECORDING.** The strict replay missed on **13** sheets, above your line
of eight. Nothing was re-recorded, `baseline-2026-11-20` is untouched, and no sheet of the owner's
marked forty has moved.

## 1. Item 1 — the strike points at its attack

The copied line, the derivation at ship, and `strike-differs-from-host` are gone. The row is:

> **The Hunted Road.** The headless horseman makes one Saber attack. If it hits a creature, that
> creature is subjected to the following effect. *Wisdom Saving Throw*: DC 17. *Failure:* …

The seat's ask is unchanged, so the recordings still replay to the seat. The seat refuses with the
reason and asks again when there is **no Multiattack** (verified firing on the Dire Wolf) or the
condition **takes a creature's turn away**. A strike is now exempt from the value floor, which is
what priced s06's at 2.3 against 8.8.

Checked once more at ship, which is your rule 7: a strike whose save hands out what its **finished**
host applies is removed with its clause. I also cover a missing Multiattack and a missing host
there; both are already settled at the seat, and neither of those two arms is proven by a test.

**Attack rows on the forty that force a save on a hit: 3. Unbounded — no exchange, no immunity on a
success: 2** (s17 Bite, s33 Unarmed Strike).

## 2. Item 2 — a row written and then thrown away

**Two forms land early**, pushed into `sections` as the seat returns: the **strike** and the
**aura**. Every other form lands after the drops have had their say. I made **the drop remove the
row** rather than move the landings — the two early forms return their row to the caller as the
seat's answer, so moving them changes what the seat returns on every path, not just the dropped
one. `dropLandedRow` takes it out and sweeps its citations.

**The eight sheets where a row was written and removed**, from the forty the owner marked:

| sheet | the row that left | why | what stands in its place |
|---|---|---|---|
| s01 | Herding Snap (action) | free row over budget | Frozen Shape, a passive trait — the wolf ships with nothing to run |
| s02 | Living Mire (trait) | free row over budget | the chassis's own rows |
| s09 | Trail of Tears (trait) | free row over budget | the chassis's own rows |
| s33 | Temple Stalker (trait) | free row over budget | the chassis's own rows |
| s36 | Read the Overextension (reaction) | free row over budget | the chassis's own rows |
| s40 | Bound Reliquary (trait) | free row over budget | the chassis's own rows |
| s06 | Scree Snare | dropped by the floor | **nothing — the row stayed on the sheet**, which is the fault this item fixes |
| s12 | Plague Herald's Command | dropped by the floor | the library seed that stood in |

And five sheets drew a **library seed** because no template held the idea: s06, s12, s24, s34, s35.

**What `valueCheck` does with a row holding both an attack and a save:** it prices the save alone.
Measured on s06 — the strike as written and its save clause alone both read **EV 1.5**, while the
host, Rubble Lash, reads **12.1**. The attack line contributes nothing because a row containing
"Saving Throw" is read as a save row. Item 1 takes the strike out of the floor's reach; **s06's
Screeburst Emergence is the other shape** (a save and then an attack) and is still priced that way.
No budget or floor was changed, as ordered.

## 3. Item 3 — an idea about damage on a row with none

**The count: 57 seats landed a row whose idea carried a stamp; 6 do not do what the idea said.**

| sheet | seat | stamped | the row | what it does |
|---|---|---|---|---|
| s01 | trait | movement | Frozen Shape | damage |
| s14 | trait | condition | Killing Cold Wake | damage |
| s16 | trait | damage | Fear Aura | condition |
| s25 | action | condition | Iron Advance | damage |
| s26 | action | condition | Fen Curse | damage |
| s40 | action | condition | Sanctified Hurl | damage and movement |

**None of the six is the kind that is fixed.** The fix is for an idea stamped damage landing on an
at-will **area row offered in place of one attack** that deals none — the Knife Ball's Blade
Barrage. s16 is a trait, not an attack's replacement. So the fix changes no sheet of this forty and
the other five are reported and left, as ordered.

## 4. Item 4 — a trait with no save

**The count: three traits impose a condition with no save, and two are print's own Vampire rows**
(Misty Escape, Vampire Weakness). **One is the model's: s11's Briar Blood.**

Refused with the reason, which names the Reaction form and the aura. **A re-seated idea is left
alone** — `traitWritesARider` turns an inflicting trait into a rider on the creature's own attack,
print's Dire Wolf bite, and that path fires only on a re-seated idea. Three tests found that for me.

## 5. Item 5 — false appearance

**The count: one sheet landed it — s01, a Beast.** Declined at the landing for anything but a
Construct, Plant, Elemental or Ooze, so the fit prompt is unchanged. Two older tests used it on a
Skeleton and now read the decline.

## 6. The curse keys, and what the gate cost

The four curse words bind on anything; **debt, price, bargain, owe, tithe, toll, judgment, rebuke,
sin and oath bind only on a Fiend, Fey, Undead or Aberration.** s17 keeps it on "oath".

**IT CHANGES THE FIT PROMPT ON 8 SHEETS OF THE FORTY** — s05, s07, s08, s13, s14, s16, s25, s37 —
and that is 8 of the 13 replay misses. `curse-debt` was on 26 sheets' menus and landed on 2.

## 7. s24 — the cause, and why I stopped

The clause reader is right: `"It has four scythe-arms" -> has (mechanical) [asked: attack]`.

**The cause is not a condition. It is the contents of a closed word list.** `partRows` lets the
clause straight through — it is mechanical and not a head, so it is not even cue-gated — and what
stops it is `PART_NOUN`, a regex of weapon and body-part nouns. Measured directly:

| phrase | becomes a part |
|---|---|
| `a skeleton with a greatsword` | **Greatsword** |
| `a spitting maw` | **Spitting Maw** |
| `It has four claws` | **Claws** |
| `It has four scythe-arms` | — |
| `It has four arms` | — |

`greatsword`, `maw` and `claws` are in the list; `arm` is not, and neither is `scythe`. Fixing it
means adding words to that list, which is the one thing the standing order forbids. Reported and
stopped, as you asked.

Your second hypothesis is also right: `inline declared: "the scythe" — the call's own answer (kind),
built from the name`. The sheet calls the creature "the scythe" while nothing on it is one.

## 8. The lint, eight rules, two columns

| rule | 20 Nov as recorded | after this round |
|---|---|---|
| uncited-replacement-row | 0 | 0 |
| ungated-turn-denial | 0 | 0 |
| citation-gate-mismatch | 1 — s20 | 0 |
| deafened-alone | 1 — s01 | 0 |
| rider-without-an-attack | 1 — s26 | 0 |
| strike-adds-nothing | 2 — s35, s36 | 0 |
| **stock-template-name** | 2 — s18, s24 | **6 — s08, s12, s14, s16, s25** |
| two-recharge-rows | 1 — s31 | 0 |

`strike-differs-from-host` is retired with the copied strike.

## 9. ANYTHING A FIX MADE WORSE

**`stock-template-name` went from 2 to 6.** The curse gate takes `curse-debt` off 8 sheets' menus,
and on five of them the template that lands instead ships under its own stock name. That is the
cost of the gate as it stands, measured, and it is the owner's to weigh — the alternative is a
curse on a creature nobody asked to curse.

## 10. The replay, and why nothing was recorded

**27 of 40 did not reproduce; 13 of those are prompt misses**, above your line of eight.

| call | sheets |
|---|---|
| fit | s05, s07, s08, s13, s14, s16, s25, s37 — all eight are the curse gate |
| seat | s06, s11 — items 1 and 4 |
| audit | s01 — item 5 changed the sheet |
| route / seed | s22, s36 — as always |

The other 14 differ without a prompt miss: s02, s03, s04, s09, s10, s17, s18, s20, s26, s28, s29,
s30, s32, s40.

You expected s06, s11, s01 and item 3's sheets. The eight fit misses are the curse gate, which you
asked me to list if it moved the prompt — it moves it on eight.

## 11. The suite

**exit 0 — 269 suites, 5808 passed, 26 skipped, 5834 total**, at `--maxWorkers=2`, no crash.
22 tests added. Each fix was shown red with itself removed: the two strike refusals, the copied
line, the drop's removal, the damage-idea pricing, the trait refusal and the type gate.

## 12. What I did not do

No re-record, no second replay, and no `strike removed at ship` arm proven beyond the seat's own.
The forty above is the replay's output, not a baseline.
