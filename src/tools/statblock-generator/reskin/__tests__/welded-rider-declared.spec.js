import { dropWeldedRiders } from '../generate.mjs';

// ROADMAP R3 site 2. The weld is the one site that knows a sentence was joined to
// a row, and it recorded nothing — so the print-canon strip and the
// one-fact-one-home shed both had to read the rider back out of the host's prose.
// Measured consequence: the shed could not act on 38 of its 77 firings across the
// saved runs ("the strip has no pattern for how this row words it").
//
// THE KNOWN-BAD CASE, replayed deterministically. This shape cannot be reached by
// a live batch any more — the rider is refused upstream for want of the GM's own
// ask — so a test that only passed live would be no test at all.
const PRINT_BITE = '*Melee Attack Roll:* +5, reach 5 ft. 8 (1d10 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Prone condition.';
const CONTAGION = "If the target is a creature and isn't already Poisoned by this creature, it is subjected to the following effect. *Constitution Saving Throw*: DC 13. *Failure:* The target has the Poisoned condition and can't regain Hit Points until it finishes a Long Rest.";

describe('the weld declares what it welded', () => {
  test("the Dire Wolf's rest-long contagion comes off print's own Bite, whole", () => {
    const row = { name: 'Bite', text: `${PRINT_BITE} ${CONTAGION}`, weldedRiders: [CONTAGION], print: true };
    const out = dropWeldedRiders(row);
    expect(out.taken).toEqual([CONTAGION]);
    expect(out.text).toBe(PRINT_BITE);                 // print's row, byte for byte
    expect(out.text).not.toMatch(/Long Rest|Poisoned/);
    expect(out.text).toMatch(/it has the Prone condition\.$/); // print's OWN rider survives
  });

  test('the old pattern could not see it — which is why the declaration exists', () => {
    const joined = `${PRINT_BITE} ${CONTAGION}`;
    // the print-canon strip's pattern, verbatim as it stood before R3
    const OLD = /,? and (?:the target|it) has the \{?[A-Za-z_]+\}? condition[^.]*\.?/;
    const cut = joined.replace(OLD, '.');
    expect(cut).toMatch(/Long Rest/);                  // the contagion survived the cut
    expect(cut).not.toBe(PRINT_BITE);                  // and print's row did not come back
  });

  test('a welded rider is taken whether or not the weld left its leading space', () => {
    for (const text of [`${PRINT_BITE} ${CONTAGION}`, `${PRINT_BITE}${CONTAGION}`]) {
      expect(dropWeldedRiders({ text, weldedRiders: [CONTAGION] }).text).toBe(PRINT_BITE.trim());
    }
  });

  test('`only` takes the rider naming one condition and leaves the others — what the shed asks for', () => {
    const prone = ', and the target has the Prone condition.';
    const row = { text: `${PRINT_BITE} ${CONTAGION}${prone}`, weldedRiders: [CONTAGION, prone] };
    const one = dropWeldedRiders(row, { only: 'Poisoned' });
    expect(one.taken).toEqual([CONTAGION]);
    expect(one.text).toContain('Prone condition');     // the other rider stays
    expect(one.text).not.toMatch(/Long Rest/);
    expect(dropWeldedRiders(row, { only: 'Restrained' }).taken).toEqual([]); // nothing named it
    expect(dropWeldedRiders(row, { only: 'Restrained' }).text).toBe(`${PRINT_BITE} ${CONTAGION}${prone}`);
  });

  test('a row the weld never touched is returned untouched', () => {
    expect(dropWeldedRiders({ text: PRINT_BITE }).taken).toEqual([]);
    expect(dropWeldedRiders({ text: PRINT_BITE }).text).toBe(PRINT_BITE);
    expect(dropWeldedRiders(null).text).toBe('');
    // a record that no longer matches the text is not forced
    expect(dropWeldedRiders({ text: PRINT_BITE, weldedRiders: ['something else entirely'] }).taken).toEqual([]);
  });
});
