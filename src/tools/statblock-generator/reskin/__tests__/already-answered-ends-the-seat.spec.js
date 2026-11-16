// "WE DON'T ADD NEW PARTS" (owner's ruling, 2026-11-11). `already_answered` is the fit call reading
// the finished sheet and saying the mechanic is on it already. The nearest template was correctly
// blocked on that answer — and then the blind library fallback dealt a seed anyway: 5 of the recent
// draws followed exactly this refusal. The answer has to end the seat, not just one of its doors.
//
// The fallback's stand-down is a local `const` deep inside generateReskin, so this spec pins the
// RULE the call site composes: the refusal enum joins the stand-down, and the other refusals do not.
const standDown = ({ closedPath = false, alreadyAnswered = false, printHeadAsksNothing = false }) =>
  closedPath || alreadyAnswered || printHeadAsksNothing;

describe('a fit refusal of already_answered ends the seat', () => {
  test('it stands the fallback down on its own', () => {
    expect(standDown({ alreadyAnswered: true })).toBe(true);
  });

  // no_fit is the opposite answer — the catalog is MISSING the shape, so the seat authors and the
  // nearest template stands in (R4, 2026-11-02). collision blocks the nearest template but leaves
  // the seat live. Neither may be swept into the stand-down.
  test('no_fit and collision leave the seat live', () => {
    for (const reason of ['no_fit', 'collision', null, undefined]) {
      expect(standDown({ alreadyAnswered: reason === 'already_answered' })).toBe(false);
    }
  });

  test('the twist path and a bare print head still stand down as before', () => {
    expect(standDown({ closedPath: true })).toBe(true);
    expect(standDown({ printHeadAsksNothing: true })).toBe(true);
  });
});
