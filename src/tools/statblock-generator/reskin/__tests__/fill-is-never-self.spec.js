/**
 * A FLAVOR FILL IS NEVER THE CREATURE ITSELF (the forty of 2026-10-27, #20).
 *
 * The Trench Choir Leviathan shipped:
 *
 *   "While the leviathan can see the leviathan within 30 feet of itself, it has
 *    Disadvantage on attack rolls … and must move away from the leviathan."
 *
 * `phobia` names what the creature is AFRAID OF, and the call answered with the
 * creature. A 542-HP monster fled its own position, on a sheet whose next row
 * pulls creatures toward it — the critic read the two as contradicting each
 * other. Every flavor slot can take this fault: a `relic` it keeps, a `disguise`
 * it passes for, a `sense_target` it tracks. None of them is the creature.
 */
import { TEMPLATE_BY_ID, renderTemplate } from '@/tools/statblock-generator/reskin/templates.mjs';
import { scaleDonor, pickDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const ctx = () => ({ scaled: scaleDonor(pickDonor(17, null, 'brute'), 17, { mechanics: [] }), archetype: 'brute', cr: 17, imposed: [], name: 'Trench Choir Leviathan', inline: 'the leviathan', energy: 'Cold', mix: null, concept: 'a leviathan of the trench choirs', size: 'Gargantuan' });
const fears = (v) => (/can see (.*?) within/.exec(String(renderTemplate(TEMPLATE_BY_ID.get('phobia'), ctx(), { phobia: v })?.text ?? '').replace(/\*/g, '')) ?? [])[1]?.trim() ?? null;

describe('the creature cannot be its own phobia', () => {
  test.each([['the leviathan'], ['Trench Choir Leviathan'], ['leviathan'], ['The Leviathan']])('%s is refused', (v) => {
    expect(fears(v)).toBe('the thing it fears'); // the blind fill
  });

  test('a name the creature merely ENDS with is refused too', () => {
    // "the trench choir leviathan" contains the inline; a fill that ends in the
    // creature's own name is the same fault wearing a longer coat
    expect(fears('the drowned leviathan')).toBe('the thing it fears');
  });
});

describe('a real fear is kept', () => {
  test.each([['open flame'], ['the sound of bells'], ['sunlight'], ['its own reflection']])('%s', (v) => {
    expect(fears(v)).toBe(v);
  });
});
