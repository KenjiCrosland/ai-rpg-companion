/**
 * A TRAIT THAT ONLY MENTIONS SAVING THROWS IS NOT A SAVE (2026-11-17).
 *
 * `traitIsSave` was `/saving throw/` — true for ANY trait whose text contains the words. The
 * Steamclaw Ascetic's "Pressure Without Pause" gives the ascetic Advantage "on saving throws against
 * effects it imposes": it forces nothing, it was refused as a save row, and the second ask wrote the
 * same sentence and was refused again. Meshrin's "Barbarian Rage" went the same way for "Advantage
 * on Strength checks and Strength saving throws" — a barbarian with no Rage.
 *
 * THE CHECK IS PRINT'S OWN DATA, not taste. Of print's 324 traits, 85 mention a saving throw and
 * only 12 force one. The test must be false for the other 73 — a model that wrote print's own Magic
 * Resistance was being refused — and true for the 12 even when their save is rewritten as prose,
 * because that is the shape a model writes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { traitForcesASave } from '../author.mjs';

const STATS = 'Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma';
const HEADER = new RegExp(`\\*?\\s*(?:${STATS})\\s+Saving\\s+Throw\\s*\\*?\\s*:`, 'i');

/** every trait print writes, read off the corpus rather than listed here */
const printTraits = () => {
  const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../data/srd52-monsters.json'), 'utf8'));
  const list = Array.isArray(raw) ? raw : Object.values(raw);
  const out = [];
  for (const m of list) {
    for (const key of ['traits', 'special_abilities', 'abilities']) {
      for (const t of (m?.[key] ?? [])) if (t?.name) out.push({ creature: m.name, name: t.name, text: String(t.desc ?? t.text ?? t.description ?? '') });
    }
    for (const [sec, es] of Object.entries(m?.sections ?? {})) {
      if (!/Trait/i.test(sec)) continue;
      for (const t of (es ?? [])) if (t?.name) out.push({ creature: m.name, name: t.name, text: String(t.text ?? '') });
    }
  }
  return out;
};

describe("print's own traits decide what counts as a save", () => {
  const all = printTraits();
  const mentions = all.filter((t) => /saving throw/i.test(t.text));
  const forces = mentions.filter((t) => traitForcesASave(t.text));

  test('the corpus is the one we measured against', () => {
    expect(all.length).toBe(324);
    expect(mentions.length).toBe(85);
  });

  test('exactly 12 of print\'s traits force a save, and 73 only mention one', () => {
    expect(forces.length).toBe(12);
    expect(mentions.length - forces.length).toBe(73);
  });

  test('the 12 are the auras and the death bursts', () => {
    expect([...new Set(forces.map((t) => t.name.replace(/ \(.*\)$/, '')))].sort())
      .toEqual(['Death Burst', 'Death Throes', 'Fear Aura', 'Gibbering', 'Mucus Cloud', 'Stench', 'Vile Appearance']);
  });

  test('each of the 12 still reads as forcing a save when its save is written as PROSE', () => {
    // the shape a model writes: no save-form header, the demand in a sentence
    for (const t of forces) {
      const stat = (new RegExp(`(${STATS})`, 'i').exec(t.text) ?? [, 'Constitution'])[1];
      const dc = (/DC\s*(\d+)/.exec(t.text) ?? [, '14'])[1];
      expect(traitForcesASave(`Each creature in the area must succeed on a DC ${dc} ${stat} saving throw or suffer the effect.`)).toBe(true);
    }
  });

  test('not one of the 73 reads as forcing a save', () => {
    const wrong = mentions.filter((t) => !HEADER.test(t.text) && traitForcesASave(t.text) && !/must|has to|needs to/i.test(t.text));
    expect(wrong.map((t) => `${t.creature}/${t.name}`)).toEqual([]);
  });

  test("print's own Magic Resistance and Legendary Resistance would not be refused", () => {
    const byName = (n) => mentions.filter((t) => t.name.replace(/ \(.*\)$/, '') === n);
    expect(byName('Magic Resistance').length).toBeGreaterThan(20);
    for (const t of [...byName('Magic Resistance'), ...byName('Legendary Resistance')]) {
      expect(traitForcesASave(t.text)).toBe(false);
    }
  });
});

describe('the rule, case by case', () => {
  test.each([
    ['a save demanded of other creatures', true, 'When the ghost takes damage from a melee attack, each creature within 30 feet that can hear it must succeed on a {dc} Wisdom saving throw or have the Frightened condition.'],
    ['a save demanded with no DC written', true, 'When the leviathan hits a creature with Coils, the target must succeed on a Constitution saving throw or have the Deafened condition.'],
    ['the save form\'s own header', true, 'While underwater, the aboleth is surrounded by mucus. *Constitution Saving Throw*: DC 14, each creature in a 5-foot Emanation.'],
    ['Advantage on saving throws', false, 'The ascetic has Advantage on attack rolls against that creature and on saving throws against effects it imposes.'],
    ['Advantage on checks and saves', false, 'Meshrin has Advantage on Strength checks and Strength saving throws, and its Greataxe attacks deal an extra {dmg} damage.'],
    ['Magic Resistance', false, 'The creature has Advantage on saving throws against spells and other magical effects.'],
    ['Legendary Resistance', false, 'If the dragon fails a saving throw, it can choose to succeed instead.'],
    ['the creature rolling its OWN save', false, 'If damage reduces the zombie to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant.'],
    ['Evasion, which changes a save', false, 'If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds on the save.'],
    ['no mention at all', false, 'The hound has Advantage on attack rolls against a creature it can see.'],
  ])('%s', (_label, want, text) => {
    expect(traitForcesASave(text)).toBe(want);
  });

  test('"it must succeed" as the OBJECT of a verb is not the creature rolling its own save', () => {
    // "that can hear it must succeed on" — the first version of this anchored nothing and read the
    // "it" after "hear" as the roller, so a real save on other creatures came back false
    expect(traitForcesASave('each creature that can hear it must succeed on a {dc} Wisdom saving throw or be Frightened')).toBe(true);
  });

  test('empty and absent text force nothing', () => {
    for (const t of ['', null, undefined, '   ']) expect(traitForcesASave(t)).toBe(false);
  });
});
