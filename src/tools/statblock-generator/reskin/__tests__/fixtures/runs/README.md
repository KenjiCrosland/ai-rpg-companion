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
