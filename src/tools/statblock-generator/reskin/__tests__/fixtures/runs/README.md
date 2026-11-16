# Saved sheets the suite reads

Committed on 2026-11-14 (owner's ruling). Five specs read saved runs to assert against real
generated sheets rather than hand-built ones, which is the right instinct — but they read them from
`smoke-out/`, which `.gitignore:52` excludes. The suite therefore passed on machines that happened
to have those runs and failed on a fresh clone: 15 tests, for no reason but a missing folder. Our
green was partly local.

These are the **JSON sheets only** — the `.md` traces are the bulk of a run and nothing reads them
here. 212 sheets, 1.7 MB.

**Do not regenerate these to make a test pass.** They are frozen evidence: each spec asserts
something a real run once produced, and replacing them with a fresh run would quietly re-baseline
the assertion. Add a new run folder instead, and say in the spec why the old one no longer serves.

## `../recordings/` — record-and-replay

Added 2026-11-16. A sibling folder holds **recordings**: one file per generation, carrying the
form inputs, the ordered prompts and raw answers of every model call, and the sheet that run
produced. `scripts/smoke-statblock.mjs --record <batch>` writes one; `--replay <dir>` drives the
same inputs with the network intercepted and every answer served from the file, then compares the
sheet it gets with the sheet that was saved.

They exist so a refactor can be checked without the model: same prompts, same sheet, and any
difference is the code's. A prompt with no recorded answer fails loudly and names the prompt —
that is how a behaviour change shows itself, and it is wanted.

Like the runs beside them these are **test data, not evidence**: the evidence standing order does
not delete them, and a fresh recording is added rather than an old one replaced. A change that
alters a prompt needs a new recording; replay proves nothing about the model.
