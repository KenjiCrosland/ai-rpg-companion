/**
 * 2024 renderer tests — build-order step 3 of docs/2024-architecture.md.
 *
 * Snapshot exemplars (Aboleth, Air Elemental, Allosaurus) are rendered from
 * srd52-monsters.json per the contract; the convention checks assert the
 * 2024-format rules independently so a bad snapshot can't be blessed silently.
 */
import { renderStatblock2024 } from '../format-2024/render.mjs';
import monsters from '@/data/srd52-monsters.json';

const byName = (name) => {
  const m = monsters.find((x) => x.name === name);
  if (!m) throw new Error(`Exemplar missing from srd52-monsters.json: ${name}`);
  return m;
};

// ---------------------------------------------------------------------------
// 1. Exemplar snapshots
// ---------------------------------------------------------------------------
describe('SRD exemplar snapshots', () => {
  test.each([['Aboleth'], ['Air Elemental'], ['Allosaurus']])('%s renders stably', (name) => {
    expect(renderStatblock2024(byName(name))).toMatchSnapshot();
  });
});

// ---------------------------------------------------------------------------
// 2. 2024 convention checks
// ---------------------------------------------------------------------------
describe('2024 format conventions', () => {
  const aboleth = renderStatblock2024(byName('Aboleth'));

  test('ability table rows carry score, signed mod, and signed save', () => {
    expect(aboleth).toContain('| STR | 21 | +5 | +5 |');
    expect(aboleth).toContain('| DEX | 9 | -1 | +3 |'); // negative mod, proficient save
  });

  test('AC and Initiative share a line, initiative shows bonus + passive score', () => {
    expect(aboleth).toMatch(/\*\*AC\*\* 17 .* \*\*Initiative\*\* \+3 \(13\)/);
  });

  test('CR line format, including XP thousands separator', () => {
    expect(aboleth).toContain('**CR** 10 (XP 5,900; PB +4)');
  });

  test('fractional CR renders via cr_str', () => {
    const cockatrice = renderStatblock2024(byName('Cockatrice'));
    expect(cockatrice).toContain('**CR** 1/2 (XP 100; PB +2)');
  });

  test('HP line combines average and formula', () => {
    expect(aboleth).toContain('**HP** 150 (20d10 + 40)');
  });

  test('sections render in canonical 2024 order regardless of model key order', () => {
    const scrambled = {
      ...byName('Aboleth'),
      sections: {
        'Legendary Actions': [{ name: 'L', text: 'l.' }],
        Reactions: [{ name: 'R', text: 'r.' }],
        Actions: [{ name: 'A', text: 'a.' }],
        'Bonus Actions': [{ name: 'B', text: 'b.' }],
        Traits: [{ name: 'T', text: 't.' }],
      },
    };
    const out = renderStatblock2024(scrambled);
    const positions = ['### Traits', '### Actions', '### Bonus Actions', '### Reactions', '### Legendary Actions']
      .map((h) => out.indexOf(h));
    expect(positions.every((p) => p >= 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  test('no 2014 attack phrasing in rendered exemplars', () => {
    for (const name of ['Aboleth', 'Air Elemental', 'Allosaurus']) {
      const out = renderStatblock2024(byName(name));
      expect(out).not.toContain('Melee Weapon Attack');
      expect(out).not.toContain('Ranged Weapon Attack');
    }
    expect(aboleth).toContain('*Melee Attack Roll:* +9');
  });
});

// ---------------------------------------------------------------------------
// 3. Optional-field omission
// ---------------------------------------------------------------------------
describe('optional fields', () => {
  test('absent fields produce no line at all', () => {
    const allosaurus = renderStatblock2024(byName('Allosaurus'));
    expect(allosaurus).not.toContain('**Languages**');
    expect(allosaurus).not.toContain('**Resistances**');
    expect(allosaurus).not.toContain('**Gear**');
    const airElemental = renderStatblock2024(byName('Air Elemental'));
    expect(airElemental).not.toContain('**Skills**');
    expect(airElemental).toContain('**Resistances** Bludgeoning, Lightning, Piercing, Slashing');
    expect(airElemental).toContain('**Immunities** Poison, Thunder;');
  });

  test('gear renders when present', () => {
    expect(renderStatblock2024(byName('Archmage'))).toContain('**Gear** Wand');
  });

  test('subtype renders in the subtitle', () => {
    expect(renderStatblock2024(byName('Allosaurus'))).toContain('*Large Beast (Dinosaur), Unaligned*');
  });
});

// ---------------------------------------------------------------------------
// 4. Whole-corpus smoke
// ---------------------------------------------------------------------------
describe('whole-corpus render', () => {
  test('all 329 SRD monsters render with name, CR line, and their sections', () => {
    expect(monsters.length).toBe(329);
    for (const m of monsters) {
      const out = renderStatblock2024(m);
      expect(out.startsWith(`## ${m.name}\n`)).toBe(true);
      expect(out).toContain('**CR** ');
      // Shrieker Fungus is the lone parsed monster with zero section entries
      // (likely a parse gap — its Shriek reaction; noted for the next
      // errata re-parse). Everything else must render at least one section.
      const hasEntries = Object.values(m.sections ?? {}).some((arr) => arr.length);
      if (hasEntries) {
        expect(out).toContain('### ');
      } else {
        expect(m.name).toBe('Shrieker Fungus');
      }
    }
  });
});

// ---------------------------------------------------------------------------
// 5. Input guards
// ---------------------------------------------------------------------------
describe('input guards', () => {
  const minimal = {
    name: 'Test Beast',
    cr: 1,
    hp: 27,
    ac: 13,
    stats: { STR: 14, DEX: 12, CON: 13, INT: 3, WIS: 11, CHA: 6 },
  };

  test('missing essentials throw a clear error', () => {
    expect(() => renderStatblock2024(null)).toThrow(TypeError);
    expect(() => renderStatblock2024({ ...minimal, name: undefined })).toThrow(/name/);
    expect(() => renderStatblock2024({ ...minimal, stats: undefined })).toThrow(/stats/);
    expect(() => renderStatblock2024({ ...minimal, cr: undefined })).toThrow(/cr/);
    const { CHA, ...partialStats } = minimal.stats;
    expect(() => renderStatblock2024({ ...minimal, stats: partialStats })).toThrow(/abilities/);
  });

  test('without saves, the save column falls back to the plain mod', () => {
    const out = renderStatblock2024(minimal);
    expect(out).toContain('| STR | 14 | +2 | +2 |');
    expect(out).toContain('| INT | 3 | -4 | -4 |');
  });

  test('without initiative fields, initiative derives from DEX', () => {
    expect(renderStatblock2024(minimal)).toContain('**Initiative** +1 (11)');
  });
});
