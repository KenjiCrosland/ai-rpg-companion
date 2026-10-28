/**
 * THE WRITER RECORDS THE DURATION IT WROTE.
 *
 * `renderTemplate` picks a duration KEY (the template's `duration_default`, or
 * the call's choice), turns it into a clause with `durationClause`, substitutes
 * it — and used to throw the key away. So `condition-duration` had to recover the
 * answer from prose, and its pattern reads "until the end of" but not a STATE
 * bound like "while swallowed". Every firing in its history was a false positive
 * on a containment row, which is why it was downgraded to `soft`.
 *
 * This is the same move that retired the prose reader for `imposes`: the fill
 * site that wrote it owes the field.
 */
import { TEMPLATE_BY_ID, renderTemplate, DURATIONS } from '@/tools/statblock-generator/reskin/templates.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const ctx = (cr) => ({
  scaled: scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] }),
  archetype: 'brute', cr, sections: {}, imposed: [], conditionMinor: 'Frightened',
  name: 'X', inline: 'it', energy: 'Fire', mix: null, meleeType: 'Bludgeoning',
  concept: 'c', size: 'Large',
});
const render = (id, cr = 9, fills = {}) => renderTemplate(TEMPLATE_BY_ID.get(id), ctx(cr), fills, { blind: true });

describe('a row that bounds a condition says so in a field', () => {
  it.each([
    ['gaze-aura', 'Frightened'],
    ['fear-aura', 'Frightened'],
    ['terror-pulse', 'Frightened'],
    ['sensory-strike', 'Blinded'],
  ])('%s records both what it imposes and how long for', (id, cond) => {
    const r = render(id);
    expect(r.imposes).toBe(cond);
    expect(r.duration).toBeTruthy();
    expect(DURATIONS).toContain(r.duration);
  });

  // the key is the engine's own vocabulary, not a scrape of the sentence
  it('records the KEY, not the rendered clause', () => {
    const r = render('gaze-aura');
    expect(r.duration).toBe('target_start');
    expect(r.duration).not.toMatch(/until|turn/);
  });

  it('agrees with the clause it actually printed', () => {
    const r = render('terror-pulse');
    expect(r.duration).toBe('target_end');
    expect(r.text).toMatch(/until the end of its next turn/);
  });

  it('records it at every band the template serves', () => {
    const { cr_range: [lo, hi] } = TEMPLATE_BY_ID.get('fear-aura');
    for (const cr of [lo, 5, 9, 13, Math.min(21, hi)]) {
      expect(DURATIONS).toContain(render('fear-aura', cr).duration);
    }
  });
});

describe('what it must not claim', () => {
  // a row that imposes nothing has no duration to record
  it('a plain damage row records none', () => {
    const r = render('charge-push');
    expect(r?.duration ?? null).toBeNull();
  });
});

/**
 * AND THE ROW MUST CARRY WHAT THE WRITER RECORDED.
 *
 * The field above was landed and verified at THIS level — and a ten then shipped
 * 17 rows imposing a condition with NOUGHT carrying a duration. Every
 * row-building site in `generate.mjs` copied the render result's declared keys
 * one at a time by name, so a newly recorded key was dropped by all six of them.
 * `carryDeclared` is now the single carry. The gate's three arms are pinned in
 * `checker.spec.js`, where the block harness lives.
 */
