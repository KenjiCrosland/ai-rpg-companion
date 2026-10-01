import { PI_ALIASES, PI_DENYLIST, rewritePI, readPhrases, piAliasesIn, piGuard, piScrub, removalClauses } from '../lexicon.mjs';
import { printCanonFor } from '../generate.mjs';
import { chooseLine, verbLines } from '../route.mjs';
import { DONORS } from '../donors.mjs';

describe('the Product Identity alias layer (spec 2026-10-01)', () => {
  test('rewrite(): the rewritten text and an alias record per key; a no-op on non-PI input; the longest match wins; plurals, possessives, case and synonyms', () => {
    const r = rewritePI('a mind flayer that lost its tentacles and fights with a sword');
    expect(r.text).toBe('a tentacle-faced psychic aberration that stuns minds and eats brains that lost its tentacles and fights with a sword');
    expect(r.hits).toEqual([{ key: 'mind flayer', matched: 'mind flayer', text: PI_ALIASES[2].text }]);
    expect(rewritePI('a wolf that hunts the moon')).toEqual({ text: 'a wolf that hunts the moon', hits: [] });
    expect(rewritePI('a yuan-ti abomination').hits[0].key).toBe('yuan-ti abomination'); // not "yuan-ti"
    expect(rewritePI('a death slaad').hits[0].key).toBe('death slaad');
    expect(rewritePI("two Beholders' lair").text).toMatch(/^two A floating orb/); // plural + possessive, case carried
    expect(rewritePI('an illithid').hits[0].key).toBe('illithid'); expect(rewritePI('the Eye Tyrant').hits[0].text).toBe(PI_ALIASES[0].text);
    expect(rewritePI('a Mind-Flayer').hits.length).toBe(1); // hyphen tolerant
    expect(readPhrases('a mind flayer who fires at will')).toMatch(/aberration .* looses at will/); // aliases run before the fixed phrases, in the one reader
    expect(piAliasesIn('a beholder that guards a vault').length).toBe(1);
  });
  test('donor and print lookup return nothing for every alias key: the tables hold no Product Identity', () => {
    for (const a of PI_ALIASES) for (const k of a.keys) {
      expect(printCanonFor(`a ${k}`, 5)).toBeNull();
      expect(DONORS.some((d) => new RegExp(`\\b${k.replace(/[- ]/g, '[- ]')}\\b`, 'i').test(`${d.id} ${JSON.stringify(d.sections ?? {})}`))).toBe(false);
    }
  });
  test('routing on the rewritten text reaches a seat, with no error and no empty route', () => {
    for (const raw of ['a beholder that guards a vault', 'a mind flayer that lost its tentacles and fights with a sword']) {
      const text = readPhrases(raw);
      expect(text).not.toMatch(/beholder|mind flayer/i);
      const r = chooseLine({ picks: [{ line: raw.includes('vault') ? 'defender-warden' : 'skirmisher', because: raw.includes('vault') ? 'guards a vault' : 'fights with a sword' }], creature_type: 'Aberration' }, { text });
      expect(r.line).toBeTruthy(); expect(() => verbLines(text)).not.toThrow();
    }
    // the model quotes the DESCRIPTION it saw; the quote check must read the same rewritten text
    const q = chooseLine({ picks: [{ line: 'caster-binder', because: 'each fire a different ray' }], creature_type: 'Aberration' }, { text: readPhrases('a beholder that guards a vault') });
    expect(q.notes.join(' | ')).not.toMatch(/quote not found/); expect(q.line).toBe('defender'); // the quote is found; "guards a vault" is the defender's verb and outranks the pick
  });
  test('removal clauses on the rewritten text find their target: the second concept yields tentacles', () => {
    expect(removalClauses('a mind flayer that lost its tentacles and fights with a sword')).toEqual(['tentacles']);
    expect(removalClauses('an angel without wings, missing its halo')).toEqual(['wings', 'halo']); // one noun per clause
    expect(removalClauses('a wolf that hunts the moon')).toEqual([]);
  });
  test('the output guard: a denylisted token in the name or a row is scrubbed and reported; a clean block passes unchanged', () => {
    const dirty = { name: 'Mind Flayer Lord', sections: { Actions: [{ name: 'Illithid Grasp', text: 'The elder brain whispers.' }], Traits: [] } };
    const hits = piGuard(dirty);
    expect(hits).toEqual(expect.arrayContaining(['mind flayer', 'illithid', 'elder brain']));
    expect(JSON.stringify(dirty)).not.toMatch(new RegExp(PI_DENYLIST.map((t) => t.replace(/[- ]/g, '[- ]')).join('|'), 'i'));
    expect(dirty.name).toBe('Aberration Lord');
    const clean = { name: 'Vault Warden', sections: { Actions: [{ name: 'Ray Sweep', text: 'A floating orb fires a ray.' }] } };
    const before = JSON.stringify(clean); expect(piGuard(clean)).toEqual([]); expect(JSON.stringify(clean)).toBe(before);
    expect(piScrub('a gaunt githyanki knight').text).toBe('a gaunt warrior knight');
  });
});
