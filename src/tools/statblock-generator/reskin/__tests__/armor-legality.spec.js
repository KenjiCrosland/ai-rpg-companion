// 4a, ARMOUR LEGALITY (critic, 2026-10-20). 2024 prints no armour label, so the
// 2014 converter invented one by trying kits heaviest-first until the number
// matched — knowing nothing about proficiency. Live: splint on Thurivald (a
// BARD) and Ilvareth (an archmage), a chain shirt on Sisshar (a MONK), chain
// mail on Meshrin (a barbarian).
//
// The proficiency table is a closed fact from the rules, not a judgement, and
// the class rides on the block from the path decision.
//
// OWNER'S CALL, RECORDED: when no LEGAL kit reaches the number, print the number
// alone rather than invent a label the class cannot wear or quietly move the AC.
// The number is the sheet's; the label is only a gloss on it.
import { toLegacyModel } from '@/tools/statblock-generator/format-2024/generate.mjs';
import { canWear, canShield, ARMOR_PROFICIENCY, ARMOR_CATEGORY } from '../classes.mjs';

const sheet = (over) => ({
  name: 'X', type: 'Humanoid', size: 'Medium', alignment: 'Neutral', ac: 17, hp: 100, hp_formula: '12d8+36',
  speed: '30 ft.', stats: { STR: 14, DEX: 14, CON: 16, INT: 10, WIS: 12, CHA: 16 },
  saves: { STR: 2, DEX: 2, CON: 3, INT: 0, WIS: 1, CHA: 3 }, cr: 7, pb: 3, senses: '', languages: 'Common',
  sections: { Actions: [] }, immunities: '', resistances: '', ...over,
});
const labelFor = (cls, ac, extra = {}) => toLegacyModel(sheet({ ac, ...(cls ? { generation: { pipeline: { class: cls } } } : {}), ...extra })).armor_class;

describe('4a: the label never names armour the class cannot wear', () => {
  test("the four live defects: a bard, a monk, a barbarian and a mage no longer wear what they can't", () => {
    expect(labelFor('bard', 17)).toBe('17');            // was "17 (splint)"
    expect(labelFor('monk', 16)).toBe('16');            // was "16 (chain shirt)"
    expect(labelFor('mage', 15)).toBe('15');            // an archmage wears none
    expect(labelFor('barbarian', 16)).not.toMatch(/chain mail|splint|ring mail|(?<!breast)plate\b/); // heavy is out; breastplate is medium and legal
  });

  test('a legal kit is still named, heaviest-first as before', () => {
    expect(labelFor('fighter', 17)).toBe('17 (splint)');
    expect(labelFor('paladin', 18)).toBe('18 (plate)');
    expect(labelFor('barbarian', 16)).toBe('16 (breastplate)'); // medium is legal
    expect(labelFor('rogue', 14)).toBe('14 (studded leather)'); // light is legal
  });

  test("print's own gear line outranks the table, whatever the class", () => {
    expect(labelFor('monk', 17, { ac_gear: 'chain shirt, shield' })).toBe('17 (chain shirt, shield)');
    expect(labelFor('bard', 19, { ac_note: '19 (splint, shield)' })).toMatch(/splint/);
  });

  test('a block with no class behaves exactly as before — nothing is narrowed by accident', () => {
    expect(labelFor(null, 17)).toBe('17 (splint)');
  });

  test('a class that cannot carry a shield is never given one', () => {
    // 13 = studded leather (12) + Dex 2 would need a shield to reach 14+2; a rogue may not
    for (const cls of ['bard', 'monk', 'rogue', 'mage']) expect(canShield(cls)).toBe(false);
    for (const cls of ['fighter', 'paladin', 'cleric', 'barbarian']) expect(canShield(cls)).toBe(true);
  });

  test('the proficiency table is the rules, and every kit the converter can print is categorised', () => {
    expect(canWear('bard', 'splint')).toBe(false);
    expect(canWear('monk', 'chain shirt')).toBe(false);
    expect(canWear('barbarian', 'chain mail')).toBe(false);
    expect(canWear('barbarian', 'half plate')).toBe(true);
    expect(canWear('fighter', 'plate')).toBe(true);
    // an unknown class is unconstrained, so nothing outside the eight changes
    expect(canWear('druid', 'splint')).toBe(true);
    expect(canWear(null, 'splint')).toBe(true);
    for (const kit of Object.keys(ARMOR_CATEGORY)) expect(['light', 'medium', 'heavy']).toContain(ARMOR_CATEGORY[kit]);
    for (const cls of Object.keys(ARMOR_PROFICIENCY)) expect(Array.isArray(ARMOR_PROFICIENCY[cls].categories)).toBe(true);
  });
});
