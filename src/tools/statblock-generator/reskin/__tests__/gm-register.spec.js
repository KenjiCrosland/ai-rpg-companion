// THE GM-REGISTER FORTY'S FIXES (critic read 2026-11-09: 4 Keeper / 19 Runs / 7 Tweak / 10 Fix
// against the crafted forty's 14/21/3/2). Every rule here was SIZED against all five saved
// fortys before it was built, because the obvious version of each was wrong.
import { printCanonFor } from '../generate.mjs';
import { corpusEntry, printAliasFor, PRINT_ALIAS, hagFor } from '../path.mjs';
import { composeRayTable, renderTemplate, TEMPLATE_BY_ID } from '../templates.mjs';

describe('item 9 — one print lookup, not two', () => {
  // `printCanonFor('kobold')` returned Kobold Warrior while path.mjs's `corpusEntry('Kobold')`
  // said "not in the corpus", so Pip's bio lost the one row it asked for (Pack Tactics,
  // "dangerous in a group"). 2024 renamed the commons with a role suffix; both readers now
  // consult the same closed fact.
  test('a bare folk word resolves to print\'s role-suffixed block in BOTH lookups', () => {
    for (const [typed, block] of [['Kobold', 'Kobold Warrior'], ['Goblin', 'Goblin Warrior'], ['Hobgoblin', 'Hobgoblin Warrior'], ['Bugbear', 'Bugbear Warrior']]) {
      expect(corpusEntry(typed)?.name).toBe(block);
      expect(printCanonFor(typed.toLowerCase(), 2)?.name).toBe(block);
    }
  });
  test('the other direction still works, and a non-print name is still nobody', () => {
    expect(corpusEntry('Cave Troll')?.name).toBe('Troll');   // a corpus name INSIDE the phrase
    expect(corpusEntry('Kobold Warrior')?.name).toBe('Kobold Warrior');
    expect(corpusEntry('Beholder')).toBeNull();              // Product Identity: nobody's block
  });
  test('a hag resolves by context through the one reader', () => {
    expect(printAliasFor('hag', 'a hag of the salt shore')).toBe('Sea Hag');
    expect(printAliasFor('hag', 'a hag of the deep forest')).toBe('Green Hag');
    expect(hagFor('nightmares')).toBe('Night Hag');
    expect(PRINT_ALIAS.kobold).toBe('Kobold Warrior'); // the re-export every caller already used
  });
});

describe('item 5 — a whole print name in the GM\'s words is a fact', () => {
  // The line is `exact`, and it was measured: "a print body always stands" changes 25 sheets of
  // 200 across five fortys, most uncomplained-about and several where the call is right — "a
  // cathedral-vault ooze" matches Gray Ooze on the generic word *ooze*, "a templar priest"
  // matches Priest on *priest*, "goblin wizard" reaches Mage through a job alias. Those are
  // CATEGORIES. `exact` means the GM typed the creature's whole printed name.
  test('the two Fixes read exact — the GM named the creature', () => {
    expect(printCanonFor('Krug — ogre', 2)).toMatchObject({ name: 'Ogre', exact: true });
    expect(printCanonFor('owlbear but CR 8', 8)).toMatchObject({ name: 'Owlbear', exact: true });
  });
  test('and every category match does NOT, so the call still judges those', () => {
    for (const [c, cr] of [['a cathedral-vault ooze that digests reliquaries', 9], ['a siege-engine golem of lashed timber', 8],
      ['a templar priest with a mace and no magic at all', 6], ['goblin wizard', 3], ['elf ranger, twin shortswords', 4]]) {
      expect(printCanonFor(c, cr)?.exact).not.toBe(true);
    }
  });
  test('a two-noun compound is still nobody — the Keel-Captain stays open', () => {
    expect(printCanonFor('vampire pirate', 10)).toBeNull(); // documented as NOT fixed by this rule
  });
});

describe('item 7 — print\'s spell list carries print\'s CR, one-sidedly', () => {
  // The first cut was two-sided (`!nearPrintCr`) and `sweep-fixes.spec.js` caught it: the CR 24
  // archlich standing on print's CR 21 Lich must KEEP Power Word Kill — pasting print's list
  // UPWARD is the rule's purpose. Only a list too strong for the sheet is withheld.
  const tooStrong = (sheetCr, body) => Number(printCanonFor(body, sheetCr)?.cr) - sheetCr > 1;
  test('the CR 6 Mage\'s list is too strong for a CR 3 goblin wizard', () => {
    expect(printCanonFor('Mage', 6)?.cr).toBe(6);
    expect(tooStrong(3, 'Mage')).toBe(true);
  });
  test('and a caster at or above print\'s CR keeps print\'s identity', () => {
    expect(tooStrong(6, 'Mage')).toBe(false);   // at print's CR
    expect(tooStrong(24, 'Lich')).toBe(false);  // the archlich, above it — Power Word Kill stands
    expect(tooStrong(20, 'Lich')).toBe(false);  // one under is still print's
    expect(tooStrong(10, 'Lich')).toBe(true);   // eleven under is not
  });
});

describe('item 8 — the engine\'s own text', () => {
  test('a non-damaging ray leaves no "condition ,." behind', () => {
    for (const band of ['3-5', '6-9', '10-12', '13-20', '21+']) {
      const t = composeRayTable(band);
      expect(t).not.toMatch(/,\s*\./);
      expect(t).toMatch(/Saving Throw/);     // the table is really being composed
    }
  });
  test('only a body made of its element may share a space', () => {
    const t = TEMPLATE_BY_ID.get('energy-aura');
    const base = { cr: 11, scaled: { cr: 11, dc: 17, pb: 4, per_hit: 14, stats: { STR: 18, DEX: 12, CON: 18, INT: 10, WIS: 12, CHA: 14 }, sections: {}, ac: 17, hp: 170 }, sections: {}, archetype: 'brute', name: 'Queen', energy: 'Cold', imposed: [] };
    const has = (ty) => /enter a creature's space/.test(String(renderTemplate(t, { ...base, type: ty }, { augmentation: 'space_hold', damage_type: 'Cold' })?.text ?? ''));
    expect(has('Elemental')).toBe(true);   // print: Air Elemental, Fire Elemental — the only two
    expect(has('Ooze')).toBe(true);        // Amorphous earns it the same way
    expect(has('Undead')).toBe(false);     // Queen Ysolde's Grave-Rime Aura (#24)
    expect(has('Dragon')).toBe(false);     // the drake's Scalding Ash Wake (#35)
  });
});
