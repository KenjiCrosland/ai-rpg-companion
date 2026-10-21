// OWNER'S RULING (2026-10-20): an exact print name on a 2014 sheet is the 2014
// book's own creature, served straight from the SRD 5.1 corpus with no call.
// The two books hold different monsters, which is the whole reason: a GM on 2014
// rules who typed "Vampire" was getting the 5.2 creature with 2014 phrasing.
// Narrow by ruling — twists on a 2014 sheet still start from the 5.2 body.
import { exact2014Record, exact2014Printing, PRINT_2014_RAW } from '../print-2014.mjs';
import { dispatch, printNameOf, corpusEntry } from '../path.mjs';
import printBlocks from '@/data/srd52-monsters.json';

describe('the 2014 exact path', () => {
  test('the two books really do hold different creatures — which is why this exists', () => {
    const a = exact2014Record('Vampire');
    const b = (Array.isArray(printBlocks) ? printBlocks : []).find((x) => /^Vampire$/i.test(x.name));
    expect(a).toBeTruthy(); expect(b).toBeTruthy();
    expect(a.hit_points).toMatch(/144/);
    expect(b.hp).toBe(195);
  });

  test('a whole name matches, case and spacing aside; a partial name never does', () => {
    expect(exact2014Record('Owlbear')?.name).toBe('Owlbear');
    expect(exact2014Record('  vAmPiRe ')?.name).toBe('Vampire');
    expect(exact2014Record('vampire spawn of the north')).toBeNull();
    expect(exact2014Record('a vampire who keeps a garden of thorns')).toBeNull();
    expect(exact2014Record('')).toBeNull();
    expect(exact2014Record(null)).toBeNull();
  });

  test('the printing carries the 5.1 numbers verbatim, and nothing is rephrased', () => {
    const v = exact2014Printing('Vampire');
    expect(v.armor_class).toBe('16 (Natural Armor)');
    expect(v.hit_points).toBe('144 (17d8 + 68)');
    expect(v.challenge_rating).toBe('13');
    // print's own trait names, rate and all
    expect(v.abilities.map((e) => e.name)).toContain('Legendary Resistance (3/Day)');
    expect(v.abilities.map((e) => e.name)).toContain('Misty Escape');
    // and the text is the corpus text, untouched
    const src = exact2014Record('Vampire').abilities.find((e) => e.name === 'Misty Escape');
    expect(v.abilities.find((e) => e.name === 'Misty Escape').description).toBe(src.description);
  });

  test('the provenance says it took no call', () => {
    const v = exact2014Printing('Owlbear');
    expect(v.generation.calls).toBe(0);
    expect(v.generation.source).toBe('srd-5.1');
    expect(v.generation.pipeline.path).toBe('exact');
    expect(v.generation.pipeline.by).toBe('code');
  });

  test('the card fields the 2014 printing needs are all present across the whole corpus', () => {
    expect(PRINT_2014_RAW.length).toBeGreaterThan(300);
    for (const x of PRINT_2014_RAW) {
      const v = exact2014Printing(x.name);
      expect(v).toBeTruthy();
      expect(typeof v.armor_class).toBe('string');
      expect(typeof v.hit_points).toBe('string');
      expect(typeof v.challenge_rating).toBe('string');
      expect(Array.isArray(v.abilities)).toBe(true);
      expect(Array.isArray(v.actions)).toBe(true);
      for (const e of [...v.abilities, ...v.actions, ...v.legendary_actions]) {
        expect(typeof e.name).toBe('string');
        expect(typeof e.description).toBe('string');
      }
    }
  });

  test('a name only the 5.2 book has falls through, so the 5.2 block converts as before', () => {
    const only52 = (Array.isArray(printBlocks) ? printBlocks : []).map((x) => x.name).find((n) => !exact2014Record(n));
    expect(only52).toBeTruthy();
    expect(exact2014Printing(only52)).toBeNull();
  });
});

// FOUND BY THIS RULING'S OWN SMOKE (2026-10-20): the two corpora do not share
// every name. 5.1 has "Goblin" where 5.2 has "Goblin Warrior", so a 2014 GM
// typing "Goblin" had the path call's print_body refused for not being in the
// corpus — checked against the 5.2 book alone — and the sheet fell to homebrew
// instead of being served. A name print carries in EITHER book is a print name;
// the EDITION decides which block gets served, not whether the name is real.
describe('a name only the 2014 book carries', () => {
  test('dispatches as exact on a 2014 sheet, by code, with no call', () => {
    const d = dispatch({ name: 'Goblin', concept: '', role: null, edition: '2014' });
    expect(d.path).toBe('exact');
    expect(d.by).toBe('code');
    expect(d.print_body).toBe('Goblin');
  });

  test('does NOT dispatch as exact on a 2024 sheet — it would name a block the 5.2 book has not got', () => {
    const d = dispatch({ name: 'Goblin', concept: '', role: null, edition: '2024' });
    expect(d.path).not.toBe('exact');
    expect(printNameOf('Goblin', { edition: '2024' })).toBeNull();
    expect(printNameOf('Goblin', { edition: '2014' })).toBe('Goblin');
  });

  test('the edition gate applies to the corpus validator too, and 2024 defaults unchanged', () => {
    expect(corpusEntry('Goblin', { edition: '2014' })?.name).toBe('Goblin');
    expect(corpusEntry('Goblin')?.name).not.toBe('Goblin'); // the 5.2 book's own match, or a variant
    // a name BOTH books carry resolves on either edition
    expect(corpusEntry('Owlbear', { edition: '2024' })?.name).toBe('Owlbear');
    expect(corpusEntry('Owlbear', { edition: '2014' })?.name).toBe('Owlbear');
  });
});
