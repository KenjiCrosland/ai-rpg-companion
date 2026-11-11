// A TEMPLATE'S OWN RECORD OF WHAT IT IMPOSES (2026-11-11). `wouldBeThird` keeps a third row that
// imposes an already-doubled condition off the menu — print has no block imposing one condition
// three ways. It read `IMPOSES_BY_TEMPLATE`, a hand-kept side table, and six seeds that declare
// `imposes` on themselves were never added to it, so the one reader that decides "would this be a
// third" could not see what the seed says. The Pit-Born Ooze shipped Restrained on its Slam, its
// Swallow and a Tar Glob (`snare-bolt`) — `conditionsImposedTwice` had counted the two correctly.
//
// Real catalog, real filter: a spec that re-implemented either would pass while the menu offered
// the third row.
import { TEMPLATES, templatesFor } from '@/tools/statblock-generator/reskin/templates.mjs';

const SEEDS = [['snare-bolt', 'Restrained'], ['push-prone', 'Prone'], ['terror-pulse', 'Frightened'],
  ['escalating-dread', 'Frightened'], ['sensory-strike', 'Blinded'], ['pacify', 'Incapacitated']];

const offered = (id, sections) => {
  const t = TEMPLATES.find((x) => x.id === id);
  return templatesFor({
    archetype: t.roles[0], cr: 3, movement: '30 ft.', type: 'Ooze', size: 'Large',
    sections, section: t.section, trigger: null, concept: 'a tar pit ooze that hurls sticky globs of tar',
  }).map((x) => x.id).includes(id);
};
const twice = (cond) => ({ Actions: [
  { name: 'Slam', imposes: ['Grappled', cond], text: '*Melee Attack Roll:* +5, reach 5 ft. 10 (2d6 + 3) Bludgeoning damage.' },
  { name: 'Swallow', imposes: ['Blinded', cond], text: 'The ooze swallows one creature it is grappling.' },
] });

describe('a seed that declares what it imposes is counted as the third', () => {
  it.each(SEEDS)('%s declares %s on its own catalog entry', (id, cond) => {
    expect(TEMPLATES.find((x) => x.id === id)?.imposes).toBe(cond);
  });

  it.each(SEEDS)('%s is offered on a clean sheet, and withheld once %s is imposed twice', (id, cond) => {
    expect(offered(id, {})).toBe(true);            // a gate, not a wall — the positive control
    expect(offered(id, twice(cond))).toBe(false);
  });

  // the side table stays for the shapes whose conditions live nowhere else: print's swallow text
  // imposes three at once in the compound idiom, and the template itself records none
  test('a shape with no record of its own still reads the table', () => {
    expect(TEMPLATES.find((x) => x.id === 'swallow')?.imposes ?? null).toBeNull();
    expect(offered('swallow', twice('Restrained'))).toBe(false);
  });
});
