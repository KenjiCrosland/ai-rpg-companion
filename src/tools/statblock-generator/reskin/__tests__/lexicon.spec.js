import { lexicalHints, hintsBlock, filterVerdicts, rejectedCanon } from '../lexicon.mjs';
import { buildArchetypeResolvePrompt, buildSeedSynthesisPrompt } from '../../format-2024/generate.mjs';

describe('lexical hints (2026-09-21): guide the resolve call, never route it', () => {
  test('cues are found by field and deduped; plain text yields nothing', () => {
    const h = lexicalHints('a swarm of grave beetles that swarms over a troll, riding nothing');
    expect(h.map((x) => x.cue)).toEqual(expect.arrayContaining(['swarm', 'troll']));
    expect(h.filter((x) => x.cue === 'swarm')).toHaveLength(1);
    expect(lexicalHints('a river otter')).toHaveLength(0);
  });

  test('the block is a set of QUESTIONS with counter-cases, capped', () => {
    const b = hintsBlock('a knight who hunts trolls');
    expect(b).toMatch(/LEXICAL HINTS/);
    expect(b).toMatch(/"trolls" → canon=troll\?/);
    expect(b).toMatch(/only HUNTS, WEARS, or is NAMED AFTER/);
    expect(lexicalHints('swarm ooze dragon rides hurls grapples ghost mimic regenerates sentinel', { cap: 6 })).toHaveLength(6);
  });

  test('both resolve prompts carry the block and the hint_verdicts field only when cues exist', () => {
    const withCue = buildArchetypeResolvePrompt('a swarm of funeral bells', '', { cr: 13 });
    expect(withCue).toMatch(/LEXICAL HINTS/);
    expect(withCue).toMatch(/"hint_verdicts"/);
    const plain = buildArchetypeResolvePrompt('a river otter', '', { cr: 2 });
    expect(plain).not.toMatch(/LEXICAL HINTS|hint_verdicts/);
    const seeded = buildSeedSynthesisPrompt({ concept: 'a wight astride a skeletal warhorse' }, { cr: 8 });
    expect(seeded).toMatch(/"astride" → style=mounted\?/);
    expect(seeded).toMatch(/"hint_verdicts"/);
  });
});

describe('hint verdicts are filtered and rejected canon is honoured (2026-09-21)', () => {
  const text = 'a knight who hunts trolls and rides a stolen longboat';
  const raw = [
    { cue: 'trolls', field: 'canon', accepted: false, because: 'only hunts trolls' },
    { cue: 'rides', field: 'style', accepted: true, because: 'rides a longboat' },
    { cue: 'sailor', field: 'body', accepted: true, because: 'invented by the model' },
  ];
  test('invented cues are dropped; echoed words normalise to the lexicon key and field', () => {
    const kept = filterVerdicts(raw, text);
    expect(kept.map((v) => v.cue)).toEqual(['troll', 'mounted']);
    expect(kept.find((v) => v.cue === 'troll').field).toBe('canon'); // even if the model mislabels it
    expect(kept.some((v) => v.cue === 'sailor')).toBe(false);
  });
  test('a hyphenated echo ("golem-forged") still maps to its cue', () => {
    const t = 'a golem-forged greatsword that fights on its own';
    expect(rejectedCanon([{ cue: 'golem-forged', field: 'canon', accepted: false, because: 'a maker\'s mark' }], t)).toEqual(['golem']);
  });
  test('rejectedCanon returns the canon cues the model refused, by key', () => {
    expect(rejectedCanon([{ cue: 'trolls', field: 'body', accepted: false }], text)).toEqual(['troll']);
    expect(rejectedCanon([{ cue: 'trolls', field: 'canon', accepted: true }], text)).toEqual([]);
  });
});

