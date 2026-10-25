/**
 * A PAYOFF NEEDS A REACHABLE PRECONDITION. The row records what it consumes
 * (the model's own consumed_condition); at ship time another row must impose it,
 * read through the one shared reader, on either printing.
 */
import { payoffReachable } from '@/tools/statblock-generator/reskin/generate.mjs';

const payoff = () => ({ name: 'Burning Brand', template: 'condition-payoff', consumes: 'Frightened', text: '*Wisdom Saving Throw:* DC 21, one creature within 60 feet that has the Frightened condition. *Failure:* 49 (14d6) Fire damage.' });

describe('payoffReachable', () => {
  it('keeps a payoff whose condition another row imposes (2024 grammar)', () => {
    const s = { Actions: [payoff(), { name: 'Frightful Presence', text: '*Wisdom Saving Throw:* DC 19. *Failure:* The target has the Frightened condition for 1 minute.' }] };
    expect(payoffReachable(s)).toEqual([]);
    expect(s.Actions.length).toBe(2);
  });

  it('keeps it when the imposer is a RECORDED field with no matching prose', () => {
    const s = { Actions: [payoff(), { name: 'Roar', imposes: 'Frightened', text: 'The creature roars.' }] };
    expect(payoffReachable(s)).toEqual([]);
  });

  it('keeps it when the imposer is written in the 2014 printing, lowercase', () => {
    const s = { Actions: [payoff(), { name: 'Frightful Presence', text: 'Each creature within 120 feet must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute.' }] };
    expect(payoffReachable(s)).toEqual([]);
  });

  it('drops it, traced, when nothing on the sheet imposes the condition', () => {
    const s = { Actions: [payoff(), { name: 'Rend', text: '*Melee Attack Roll:* +14, reach 10 ft. 13 (1d10 + 8) Slashing damage.' }] };
    const traces = []; const r = payoffReachable(s, (l, d) => traces.push(`${l} ${d}`));
    expect(r).toEqual([{ name: 'Burning Brand', need: 'Frightened' }]);
    expect(s.Actions.map((e) => e.name)).toEqual(['Rend']);
    expect(traces.join('\n')).toMatch(/payoff declined/);
  });

  it('the payoff cannot satisfy itself — its own target filter is not an imposer', () => {
    const s = { Actions: [payoff()] };
    expect(payoffReachable(s)).toHaveLength(1);
  });

  it('is a no-op on rows that consume nothing', () => {
    const s = { Actions: [{ name: 'Rend', text: 'x' }] };
    expect(payoffReachable(s)).toEqual([]);
  });
});
