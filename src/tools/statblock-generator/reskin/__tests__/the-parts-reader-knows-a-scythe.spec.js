/**
 * THE PARTS READER AND THE SCYTHE (owner's exception, 2026-11-21: "ok let's grow the list").
 *
 * s24's GM typed "It has four scythe-arms, a spitting maw". The clause call marked the scythe-arms
 * as a mechanical ask for an attack, and `partRows` then found no noun it knew, so the melee slot
 * went to the maw and nothing on the sheet was a scythe.
 *
 * `scythes?` and `sickles?` are added to PART_NOUN: both are weapons and the list already holds the
 * glaive, the halberd and the whip. `arms?` is NOT added — it is in "men-at-arms", "takes up arms"
 * and "a coat of arms" — and "scythe-arms" is caught by `scythe`.
 *
 * AND THE NOUN WAS ONLY HALF OF IT. A part with no damage type never ships (`if (!type) continue`),
 * and the type comes from the weapon table: `sickle` is an SRD weapon and has one, `scythe` is not.
 * So the scythe was recognised and still did not become a part. The owner read his own ruling as
 * covering the type — it was given so the four scythe-arms would become an attack — and
 * `scythe: 'Slashing'` sits beside the glaive and the halberd in PART_TYPE.
 */
import { partRows } from '../generate.mjs';

const parts = (text) => partRows([{ text, kind: 'mechanical', head: false, polarity: null }]).map((p) => p.name);

describe('the two words the owner added', () => {
  test('a sickle is a part, because the weapon table gives it a damage type', () => {
    expect(parts('a reaper with a sickle')).toEqual(['Sickle']);
  });

  test('a scythe yields a part, with a damage type — s24\'s four scythe-arms', () => {
    const got = partRows([{ text: 'It has four scythe-arms', kind: 'mechanical', head: false, polarity: null }]);
    expect(got).toHaveLength(1);
    expect([got[0].name, got[0].type, got[0].mode]).toEqual(['Scythe', 'Slashing', 'melee']);
  });
});

describe('and the clauses the list is there to keep out still yield nothing', () => {
  // all four are marked by the clause call as asking for an attack on the forty
  test.each([
    'commands lesser swarms',
    "swallowed a war-band's armoury",
    'fights from a shield wall and never breaks ranks',
    'digests reliquaries',
    'It has four arms',
  ])('%s', (text) => {
    expect(parts(text)).toEqual([]);
  });
});
