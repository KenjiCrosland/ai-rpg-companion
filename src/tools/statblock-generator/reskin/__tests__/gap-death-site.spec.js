/**
 * WHERE AN ACCEPTED PICK DIED.
 *
 * `readGapOutcomes` could say WHICH accepted pick never reached the sheet — "2 of
 * 2 accepted signature pick(s) never reached the sheet — the seat shipped a
 * fallback or nothing" — but not where it died, and that gap cost a full
 * measurement pass. 59 sheets of 490 attempted seats, never logged a miss, and
 * landed no shape, 98% of them carrying a `closest accepted` line whose text
 * reads "it lands rather than the row being dropped". Reconstructing the death
 * site from the surrounding trace is archaeology and two readings of it were
 * wrong.
 *
 * The rule this pins: a pick with no record says UNRECORDED. An undiscovered
 * drop site must never look like a pick that shipped — silence is what made the
 * original investigation expensive.
 */
import { readGapOutcomes } from '@/tools/statblock-generator/reskin/generate.mjs';

const rec = (template, line = 'a mechanic no template did') => ({ line, template });

describe('a pick that shipped', () => {
  it('is reported as landed, with no death site', () => {
    const t = [];
    const out = readGapOutcomes({
      sections: { Actions: [{ name: 'X', template: 'riposte' }] },
      gapRecords: [rec('riposte')], dropLog: [], trace: (l, d) => t.push(`${l} ${d}`),
    });
    expect(out.vetoed).toBe(0);
    expect(t.join('\n')).toMatch(/\[landed: riposte\]/);
    expect(t.join('\n')).not.toMatch(/died at/);
  });

  // a rider owns no row — its template rides on the host, and counting it as
  // vetoed is a mistake this function already learned once
  it('counts a welded rider as landed', () => {
    const out = readGapOutcomes({
      sections: { Actions: [{ name: 'Bite', riderTemplates: ['charge-push'] }] },
      gapRecords: [rec('charge-push')], dropLog: [],
    });
    expect(out.vetoed).toBe(0);
  });
});

describe('a pick that died', () => {
  it('names the stage and the reason', () => {
    const t = [];
    const out = readGapOutcomes({
      sections: { Actions: [] },
      gapRecords: [rec('push-prone')],
      dropLog: [{ template: 'push-prone', stage: 'the value floor', why: 'EV under the attack it replaces' }],
      trace: (l, d) => t.push(`${l} ${d}`),
    });
    expect(out.vetoed).toBe(1);
    expect(t.join('\n')).toMatch(/VETOED AFTER ACCEPTANCE: push-prone.*died at the value floor \(EV under the attack it replaces\)/);
  });

  // THE POINT OF THE INSTRUMENT: an uninstrumented drop site is visible.
  it('says UNRECORDED when no drop site claimed it', () => {
    const t = [];
    readGapOutcomes({
      sections: { Actions: [] }, gapRecords: [rec('zone')], dropLog: [],
      trace: (l, d) => t.push(`${l} ${d}`),
    });
    expect(t.join('\n')).toMatch(/died at an UNRECORDED drop site/);
  });

  it('rolls the stages up so a run reads as a list', () => {
    const t = [];
    readGapOutcomes({
      sections: { Actions: [] },
      gapRecords: [rec('a'), rec('b'), rec('c')],
      dropLog: [
        { template: 'a', stage: 'the value floor', why: '' },
        { template: 'b', stage: 'the value floor', why: '' },
        { template: 'c', stage: 'the trait ceiling', why: '' },
      ],
      trace: (l, d) => t.push(`${l} ${d}`),
    });
    const line = t.find((x) => x.startsWith('signature outcome:'));
    expect(line).toMatch(/3 of 3/);
    expect(line).toMatch(/2x the value floor/);
    expect(line).toMatch(/1x the trait ceiling/);
  });

  it('records the roll-up on the generation for later reading', () => {
    const gen = {};
    readGapOutcomes({
      sections: { Actions: [] }, gapRecords: [rec('a')],
      dropLog: [{ template: 'a', stage: 'the weld (duplicate trigger)', why: '' }], generation: gen,
    });
    expect(gen.gap_death_sites).toMatch(/1x the weld \(duplicate trigger\)/);
    expect(gen.gap_vetoed).toBe('1 of 1');
  });

  // the LAST record wins: a pick can pass one gate and die at a later one
  it('reports the final stage when a pick was noted more than once', () => {
    const t = [];
    readGapOutcomes({
      sections: { Actions: [] }, gapRecords: [rec('a')],
      dropLog: [
        { template: 'a', stage: 'the value floor', why: 'first' },
        { template: 'a', stage: 'the trait ceiling', why: 'last' },
      ],
      trace: (l, d) => t.push(`${l} ${d}`),
    });
    expect(t.join('\n')).toMatch(/died at the trait ceiling \(last\)/);
  });
});

describe('it stays quiet where it should', () => {
  it('reports nothing with no gap records at all', () => {
    const t = [];
    const out = readGapOutcomes({ sections: {}, gapRecords: [], dropLog: [], trace: (l) => t.push(l) });
    expect(out).toEqual({ vetoed: 0, landed: 0 });
    expect(t).toEqual([]);
  });

  // a refusal the call never named a mechanic for was never an acceptance
  it('does not count a missing_unstated record as a vetoed pick', () => {
    const out = readGapOutcomes({
      sections: { Actions: [] },
      gapRecords: [{ line: 'x', template: 'zone', missing_unstated: true }], dropLog: [],
    });
    expect(out.vetoed).toBe(0);
  });
});

describe('the roll-up reconciles with its own count', () => {
  // THE INSTRUMENT'S OWN FIRST RUN caught this: the Furnace Tyrant reported
  // "1 of 2 accepted signature pick(s) never reached the sheet" with no stage
  // named, because the vetoed record carried no template and the stage list
  // filtered those out. A count without an explanation is the silence this
  // whole instrument exists to remove.
  const stages = (line) => (line.match(/(\d+)x /g) ?? []).reduce((a, m) => a + Number(m.slice(0, -2)), 0);

  it('names a stage for a vetoed pick that has no template at all', () => {
    const t = [];
    const out = readGapOutcomes({
      sections: { Actions: [] },
      gapRecords: [{ line: 'a mechanic none of them does', template: null }],
      dropLog: [], trace: (l, d) => t.push(`${l} ${d}`),
    });
    expect(out.vetoed).toBe(1);
    const line = t.find((x) => x.startsWith('signature outcome:'));
    expect(line).toMatch(/1x the call named no template for the pick/);
    expect(stages(line)).toBe(out.vetoed);
  });

  it('accounts for every vetoed pick across a mixed sheet', () => {
    const t = [];
    const out = readGapOutcomes({
      sections: { Actions: [{ name: 'A', template: 'fear-aura' }] },
      gapRecords: [
        { line: 'shipped', template: 'fear-aura' },        // landed
        { line: 'no template', template: null },            // vetoed, untemplated
        { line: 'floored', template: 'delayed-brand' },     // vetoed, attributed
        { line: 'unknown site', template: 'mystery' },      // vetoed, unrecorded
      ],
      dropLog: [{ template: 'delayed-brand', stage: 'the value floor', why: '' }],
      trace: (l, d) => t.push(`${l} ${d}`),
    });
    expect(out.vetoed).toBe(3);
    const line = t.find((x) => x.startsWith('signature outcome:'));
    expect(stages(line)).toBe(3); // the invariant: every vetoed pick is explained
    expect(line).toMatch(/1x the value floor/);
    expect(line).toMatch(/1x an UNRECORDED drop site/);
    expect(line).toMatch(/1x the call named no template for the pick/);
  });
});
