/**
 * A FRAME MAY NOT CLAIM WHAT IT HAS NOT SEEN.
 *
 * `relic-object` reads "The creature keeps {relic} within 30 feet of itself…".
 * The slot is filled by the call; the frame used to add ", a Tiny object that
 * has AC x, HP y" — print's own anchors are Tiny (the Mummy Lord's heart), so
 * the word was copied across. Measured over a day of runs the call answered:
 *
 *   its granite-crusted heart · its handaxe · a devoured reliquary
 *   the skull-standard banner · the skull standard · the drowned steed's remains
 *   the bone sun · its ash-wrapped armor · its thorn garden
 *
 * Six of nine are not Tiny by any reading, and the frame called each of them Tiny
 * anyway — the critic read back "a Tiny garden". Tightening the slot's contract
 * was the weaker option: it already asks for something the creature "keeps,
 * carries or wears" with three Tiny examples, and the call still said garden.
 *
 * The size was never load-bearing. The mechanic is an object with a statline the
 * party can attack.
 */
import { TEMPLATE_BY_ID, renderTemplate } from '@/tools/statblock-generator/reskin/templates.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const ctx = (cr) => ({
  scaled: scaleDonor(pickDonor(cr, null, 'caster'), cr, { mechanics: [] }),
  archetype: 'caster', cr, sections: {}, imposed: [], conditionMinor: 'Frightened',
  name: 'V', inline: 'the vampire', energy: null, mix: 'physical',
  meleeType: 'Slashing', concept: 'a thing with an anchor', size: 'Medium',
});
const render = (relic, cr = 13) => renderTemplate(TEMPLATE_BY_ID.get('relic-object'), ctx(cr), { relic }).text;

describe('the relic frame', () => {
  // every one of these is a real answer the call gave
  it.each([
    'its thorn garden', 'the drowned steed\'s remains', 'its ash-wrapped armor',
    'the skull-standard banner', 'its granite-crusted heart', 'a devoured reliquary',
  ])('does not call %s Tiny', (relic) => {
    expect(render(relic)).not.toMatch(/Tiny/);
  });

  it('still gives the object the statline the mechanic needs', () => {
    const t = render('its thorn garden');
    expect(t).toMatch(/That object has AC \d+, HP \d+, and Resistance to all damage/);
    expect(t).toMatch(/While it is intact, .* regains \d+ Hit Points/);
  });

  it('keeps the call\'s own words for the anchor', () => {
    expect(render('its granite-crusted heart')).toMatch(/keeps its granite-crusted heart within 30 feet/);
  });

  it('reads as one sentence per fact, at every band', () => {
    // the template's own cr_range — it does not render below it
    const { cr_range: [lo, hi] } = TEMPLATE_BY_ID.get('relic-object');
    for (const cr of [lo, 9, 13, 17, Math.min(21, hi)]) {
      const t = render('a devoured reliquary', cr);
      expect(t).not.toMatch(/[{}]/);
      expect(t).not.toMatch(/,\s*That object/); // the comma splice the old frame had
    }
  });
});
