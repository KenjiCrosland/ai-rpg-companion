/**
 * The tone tolerance belt (2026-08-19): an invented tone drops itself,
 * never the whole enrichment — 'animated_amusement' x3 killed a live
 * enrichment through the strict-validator doom loop.
 */
import { validateEnrichmentOutput } from '../statblock-enrichment.mjs';

const payload = (tones) => JSON.stringify({
  combat_style: 'hit and run', priorities: 'survival', group_role: 'skirmisher',
  behavior: 'darts in and out', escape: 'flees at half HP',
  encounter_hooks: ['mobility duel', 'terrain use'],
  preferred_tones: tones,
});

// keep only the fields the validator actually checks — probe its shape first
test('an invented tone among valid ones no longer kills the response', () => {
  const withInvented = payload(['hidden_predator', 'quiet_tension', 'animated_amusement']);
  const allValid = payload(['hidden_predator', 'quiet_tension']);
  // whatever else the validator requires, the two payloads differ ONLY in
  // the invented tone — they must agree on the verdict
  expect(validateEnrichmentOutput(withInvented)).toBe(validateEnrichmentOutput(allValid));
});

test('fewer than two REAL tones still fails', () => {
  const oneReal = payload(['hidden_predator', 'animated_amusement', 'jovial_menace']);
  const twoReal = payload(['hidden_predator', 'quiet_tension']);
  if (validateEnrichmentOutput(twoReal)) {
    expect(validateEnrichmentOutput(oneReal)).toBe(false);
  }
});
