# Replace the disposition axis with a rolled archetype (blank-form seeds)

## Trigger

The next lurker-cluster complaint on blank-form generations, or the next
seed-axis work. Deferred 2026-08-17 (owner: "let's wait on removing the
axis now that we've removed colonies") — the colony/mind-word lane
violations are already fixed, which may be enough.

## The decision, pre-made

Owner position: "disposition shouldn't be rolled, but come as part of the
concept." The agreed design (one sitting when triggered):

1. Blank forms roll the ARCHETYPE directly (pickRandomArchetype, uniform to
   start) and pass it down the existing FIXED-ROLE path in
   buildSeedSynthesisPrompt ("the combat role is FIXED: X... bend the
   CONCEPT to the role") — machinery already built and live-proven.
2. The disposition axis dies; temperament becomes concept-derived (the
   identity prompt already asks for it: "does it flee bloodied, toy with
   prey").
3. Relocations: the alignment steer ("guardians aren't evil") moves from
   the disposition option text into the synthesis prompt as a general
   line; seedLeakTokens drops 'disposition'.

## Why not pure removal

Measured 2026-08-16/17: 6 of 8 blank rolls classified lurker, the model
overriding even rolled dispositions toward "erupts from ambush." A free
disposition hands temperament to that prior. The axis is currently the
main source of role variety (the brute and controller in that set trace to
it) — it may only be removed if the role variety it provides is replaced
by a direct roll.

## Observability follow-ups (independent, cheap, undone)

- Trace the rolled disposition (today it's only recoverable by reading
  concept prose).
- reconcileConcept: disposition-vs-archetype compatibility check (a sworn
  guardian classified lurker is the Vanteg contradiction class).
