/**
 * `{restraint}` IS THE THING THAT HOLDS YOU, NOT THE CONDITION.
 *
 * Owner's spot check, 2026-10-27 — the Pumpkin King shipped:
 *
 *   "the target has the Restrained condition until the Restrained is destroyed
 *    (AC 15; HP 20; Vulnerability to Slashing damage...)"
 *
 * Print writes the destructible thing as an object every time: "until the rope
 * is destroyed" (Erinyes/Entangling Rope), "until the web is destroyed"
 * (Ettercap/Web Strand, Giant Spider/Web). Three of three.
 *
 * TWO faults, which is why both halves are tested: the slot was listed in VOCAB
 * against ['Grappled','Restrained'], so the prompt asked for a condition and the
 * fill ladder SUBSTITUTED one over any real answer; and once that was removed,
 * nothing stopped the call from answering a condition name anyway.
 */
import { TEMPLATE_BY_ID, renderTemplate } from '@/tools/statblock-generator/reskin/templates.mjs';
import { scaleDonor, pickDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const ctx = () => ({ scaled: scaleDonor(pickDonor(10, null, 'brute'), 10, { mechanics: [] }), archetype: 'brute', cr: 10, imposed: [], name: 'King', energy: 'Poison', mix: null, concept: 'a pumpkin king whose roots snare trespassers', size: 'Large' });
const held = (fills) => {
  const r = renderTemplate(TEMPLATE_BY_ID.get('snare'), ctx(), { r_vuln: 'Slashing', ...fills });
  return (/until the ([^(]*?) is destroyed/.exec(String(r?.text ?? '').replace(/\*/g, '')) ?? [])[1]?.trim() ?? null;
};

describe('the call\'s object answer is used as written', () => {
  test.each([['web'], ['tangle of roots'], ['brambles'], ['needles']])('%s', (v) => expect(held({ restraint: v })).toBe(v));
});

describe('a condition name is refused, whoever supplies it', () => {
  test.each([['Restrained'], ['Grappled'], ['restrained'], ['PRONE']])('%s falls to the blind object', (v) => {
    const h = held({ restraint: v });
    expect(h).toBe('binding');
    expect(h).not.toMatch(/restrained|grappled|prone/i);
  });
});

describe('the frame supplies the article, so the fill must not', () => {
  test('the blind fill is a bare noun — "the the binding" shipped once', () => {
    const r = renderTemplate(TEMPLATE_BY_ID.get('snare'), ctx(), { r_vuln: 'Slashing' });
    expect(String(r.text)).toMatch(/until the binding is destroyed/);
    expect(String(r.text)).not.toMatch(/the the/);
  });
});
