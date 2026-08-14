# 2014-engine coverage debt from the 2024 chassis retirement

**Trigger: the next piece of work touching the 2014 engine path** (the
chassis flow in `format-2024/generate.mjs`, `buildGenerationPrompt2014`, or
`toLegacyModel`).

When the 2024 chassis path was retired (2026-08-14), 23 tests across
`audit-layer.spec.js`, `generate-2024.spec.js` and `batch3-regressions.spec.js`
became unrunnable as written: they exercised the fix ladder, targeted rename
fix calls, defense-budget trimming and the audit grade gate THROUGH the 2024
chassis orchestration, with 2024-phrased fixtures. They are `test.skip`ed in
place, not deleted, because the machinery they cover is alive — it is the
2014 engine now — but it currently has NO orchestration-level tests in its
own phrasing.

Resolution, whichever comes first:
- retarget the skipped tests to `edition: '2014'` with 2014-phrased fixtures, or
- if the 2014 engine is itself retired or rebuilt on the skeleton, delete
  them and this plan.

Do not un-skip them as-is: they will run the skeleton path and fail on
behaviors that path intentionally does not have (the entry-rewrite ladder is
the door the skeleton architecture closed).
