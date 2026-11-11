// HOW A CREATURE HOLDS IS DECIDED ONCE (owner, 2026-11-11: "might as well close the loop").
//
// The reach gate used to be a per-template body question — "does this body have a reaching part?" —
// asked of the body-verdict call. On a hound it was a CONSISTENT mistake: asked twice across two
// twelves, it answered "yes" twice, on a question whose own text names the hound as its
// counter-example. The owner's bar is "a stochastic guard, not a consistent mistake", so the
// question moved to the route call, where the whole creature is in view, as one enum answered once.
//
// This imports the real catalog and the real filter. A spec that re-implements either would pass
// while the engine shipped the bug — the lesson of header-speed.spec.js.
import { TEMPLATES, templatesFor } from '@/tools/statblock-generator/reskin/templates.mjs';

const ctx = (over = {}) => ({
  archetype: 'brute', style: 'grappler', cr: 5, type: 'Beast', size: 'Large',
  section: 'action', trigger: null, concept: 'a crocodile that drags swimmers under', ...over,
});
const ids = (over) => templatesFor(ctx(over)).map((t) => t.id);

describe('the catalog declares which rows ARE a hold of each shape', () => {
  it.each([['hook-drag', 'reach'], ['reel', 'reach'], ['swallow', 'contain']])('%s is %s', (id, shape) => {
    expect(TEMPLATES.find((t) => t.id === id)?.hold_shape).toBe(shape);
  });

  // a rider fires on a row that already hit, so it needs no shape of its own: this is the
  // "bites and hauls" the owner asked the drag to BE, and it stays available to every creature
  it.each(['hook-rider', 'bolt-drag'])('%s is a rider and declares no shape', (id) => {
    expect(TEMPLATES.find((t) => t.id === id)?.hold_shape ?? null).toBeNull();
  });
});

describe('the menu offers a hold only to a creature of that shape', () => {
  test('grip — a hound or a crocodile gets no reach row and no containing row', () => {
    const pool = ids({ holdShape: 'grip' });
    expect(pool).not.toContain('hook-drag');
    expect(pool).not.toContain('reel');
    expect(pool).not.toContain('swallow');
  });

  test('reach — a roper may have the reaching row', () => {
    expect(ids({ holdShape: 'reach' })).toContain('hook-drag');
  });

  test('contain — a gullet may have the containing row, but not the reaching one', () => {
    const pool = ids({ holdShape: 'contain' });
    expect(pool).toContain('swallow');
    expect(pool).not.toContain('hook-drag');
  });

  test('medium — a creature that commands mud gets neither (no medium-shape row exists yet)', () => {
    const pool = ids({ holdShape: 'medium' });
    expect(pool).not.toContain('hook-drag');
    expect(pool).not.toContain('swallow');
  });

  // the owner's option-3 ruling, 2026-11-10: the fallback for an unanswered exception is that the
  // exception does not happen. `null` is the route call declining to answer, or answering without
  // a quote from the GM's own words.
  test('UNANSWERED withholds every declared hold', () => {
    const pool = ids({ holdShape: null });
    expect(pool).not.toContain('hook-drag');
    expect(pool).not.toContain('swallow');
  });

  // a sheet generated before this field records no shape; its re-roll passes none, and the menu
  // must behave exactly as it did rather than silently losing rows
  test('ABSENT (an older call site, or a legacy sheet re-rolling) falls through as before', () => {
    const pool = ids({});
    expect(pool).toContain('hook-drag');
    expect(pool).toContain('swallow');
  });
});
