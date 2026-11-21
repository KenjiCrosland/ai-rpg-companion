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
 * AND THE NOUN IS ONLY HALF OF IT. A part with no damage type never ships (`if (!type) continue`),
 * and the type comes from the weapon table: `sickle` is an SRD weapon and has one, `scythe` is not
 * and has none. So the scythe is RECOGNISED here and still does not become a part. Reported to the
 * owner rather than fixed: his exception was for this list and these two words, and the type table
 * is a different list.
 */
import { partRows, TYPE_BY_NOUN } from '../generate.mjs';

const parts = (text) => partRows([{ text, kind: 'mechanical', head: false, polarity: null }]).map((p) => p.name);

describe('the two words the owner added', () => {
  test('a sickle is a part, because the weapon table gives it a damage type', () => {
    expect(parts('a reaper with a sickle')).toEqual(['Sickle']);
  });

  test('a scythe is RECOGNISED as a noun and still has no damage type, so no part ships', () => {
    expect(TYPE_BY_NOUN.sickle).toBe('Slashing');
    expect(TYPE_BY_NOUN.scythe).toBeUndefined();       // the gap, named
    expect(parts('It has four scythe-arms')).toEqual([]);
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
