/**
 * PART B — the facts call's answer is validated against the GM's own words (Fable §7 and §12).
 * These were proposed in section 7 and owed; item 7 of §12 added the third.
 */
import { validateFacts } from '../facts.mjs';

const GM = { name: 'Nib', description: 'pixie thief, steals one thing and runs' };
const fact = (over) => ({ field: 'size', value: 'Tiny', quote: 'pixie', from: 'kind', ...over });

describe('a quote the GM did not write', () => {
  it('is dropped, with the reason', () => {
    const { kept, dropped } = validateFacts({ facts: [fact({ quote: 'a tiny winged sprite' })] }, GM);
    expect(kept).toHaveLength(0);
    expect(dropped[0].why).toMatch(/is not in the game master's words/);
  });

  it('and a quote the GM did write is kept', () => {
    const { kept } = validateFacts({ facts: [fact()] }, GM);
    expect(kept).toEqual([{ field: 'size', value: 'Tiny', quote: 'pixie', from: 'kind' }]);
  });

  it('must match WHOLE words: "elf" is not inside "herself"', () => {
    const { kept, dropped } = validateFacts(
      { facts: [fact({ field: 'type', value: 'Humanoid', quote: 'elf' })] },
      { name: '', description: 'a witch who keeps herself hidden' },
    );
    expect(kept).toHaveLength(0);
    expect(dropped[0].why).toMatch(/not in the game master's words/);
  });

  it('and "ac" is not inside "attack"', () => {
    const { kept } = validateFacts(
      { facts: [{ field: 'ac', value: 17, quote: 'ac', from: 'stated' }] },
      { name: '', description: 'a duelist whose attack never misses' },
    );
    expect(kept).toHaveLength(0);
  });
});

describe('a field or a value off the lists', () => {
  it('drops a field the engine does not read', () => {
    const { kept, dropped } = validateFacts({ facts: [fact({ field: 'alignment', value: 'Chaotic Evil' })] }, GM);
    expect(kept).toHaveLength(0);
    expect(dropped[0].why).toMatch(/is not one the engine reads/);
  });

  it('drops a value off that field\'s list', () => {
    const { kept, dropped } = validateFacts({ facts: [fact({ value: 'Minuscule' })] }, GM);
    expect(kept).toHaveLength(0);
    expect(dropped[0].why).toMatch(/is not on that field's list/);
  });

  it('drops a number field that is not a number', () => {
    const { kept } = validateFacts({ facts: [{ field: 'hp', value: 'lots', quote: 'pixie', from: 'stated' }] }, GM);
    expect(kept).toHaveLength(0);
  });

  it('drops a quote longer than six words, and a "from" that is neither stated nor kind', () => {
    expect(validateFacts({ facts: [fact({ quote: 'pixie thief, steals one thing and runs' })] }, GM).kept).toHaveLength(0);
    expect(validateFacts({ facts: [fact({ from: 'guessed' })] }, GM).kept).toHaveLength(0);
  });
});
