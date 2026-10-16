# Release table for the critic — 2014 blocks — 2026-10-16

The case is at the top of the 2024 file (RELEASE-for-critic-2024-2026-10-16-stage34.md). This file carries the same gate tables and every sampled 2014 block, rendered from the saved 2014 JSON. Checker row above each block, trace below.

---

## Review batch — stage34-2026-10-16T20-49-59

The checker ran first. The gate table covers every block in the run; every block of the run follows. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.

### Gate table — the whole run

| block | CR | ed | donor | derivation | bands | structure | gates | headerBody | edition | donor | adjudicability | reader | verdict | coverage | concept |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Reedwraith | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/6 |
| Katsuro | 6 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 2/4 |
| Sandpit Champion | 7 | 2024 | defender-5 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 3/3 |
| Standing Stone Druid | 6 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/4 |
| Packshadow Dire Wolf | 3 | 2024 | skirmisher-3 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 0/1 | 3/3 |
| Sootpearl | 5 | 2024 | skirmisher-3-skulker | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 5/6 |
| Oathwound Vangard | 8 | 2024 | skirmisher-8-winged | FAIL: attack-stat | ok | ok | ok | ok | ok | ok | ok | ok | FAIL (1) | 0/1 | 4/4 |
| Cathedral Warden | 9 | 2024 | brute-9 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Vexmoor the Thinshade | 6 | 2024 | caster-6 | ok | ok | ok | ok | ok | ok | ok | ok | ok | clean | 1/1 | 4/5 |
| Ashvowed Serrin | 8 | 2024 | brute-5-regenerator | ok | ok | SOFT: reach | ok | ok | ok | ok | ok | ok | soft (1) | 2/2 | 3/6 |

**Dropped 2 of 11 user clauses** (coverage 82%); concept share 74% (34/46 rows). A run with zero fails and 60% coverage is a failing run.
**Fails by seat and gate:**
- skirmisher-8-winged / derivation: 1



---


_No 2014 blocks sampled in this run._
