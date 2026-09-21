/**
 * 2024-format export interop (resolves plans/statblock-2024-export-mappers.md):
 * both converters accept 2024 blocks via toLegacyModel; Improved Initiative
 * additionally gets the native fields its schema has that 2014 lacks.
 */
import { convertToFoundryVTT } from './convertToFoundryVTT.mjs';
import { convertToImprovedInitiative } from './convertToImprovedInitiative.mjs';

const monster2024 = {
  name: 'Iron Sentinel', format: '2024', size: 'Large', type: 'Construct',
  alignment: 'Unaligned', ac: 17, hp: 105, hp_formula: '14d10 + 28',
  speed: '30 ft.', initiative_bonus: 0, initiative_score: 10,
  stats: { STR: 18, DEX: 10, CON: 14, INT: 6, WIS: 12, CHA: 4 },
  saves: { STR: 7, DEX: 0, CON: 2, INT: -2, WIS: 1, CHA: -3 },
  immunities: 'Poison; Poisoned, Frightened', resistances: 'Cold',
  senses: 'darkvision 60 ft.; Passive Perception 11', languages: 'Common',
  skills: 'Perception +4',
  cr: 5, cr_str: '5', pb: 3, xp: 1800, challenge_rating: '5 (XP 1,800; PB +3)',
  sections: {
    Traits: [{ name: 'Immutable Form', text: 'The sentinel is immune to any spell that would alter its form.' }],
    Actions: [
      { name: 'Multiattack', text: 'The sentinel makes two Slam attacks.' },
      { name: 'Slam', text: '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.' },
    ],
    'Bonus Actions': [{ name: 'Brace', text: 'The sentinel roots itself; it has Advantage on Strength saving throws until it moves.' }],
    Reactions: [{ name: 'Intercept', text: '*Trigger:* An ally within 5 feet is hit. *Response:* The sentinel becomes the target instead.' }],
    'Legendary Actions': [{ name: 'Slam', text: 'The sentinel makes one Slam attack.' }],
  },
};

describe('2024 exports', () => {
  test('Foundry text export renders the classic parseable structure', () => {
    const text = convertToFoundryVTT(monster2024);
    expect(text).toContain('Iron Sentinel');
    expect(text).toContain('Large construct, unaligned');
    expect(text).toContain('Armor Class 17');
    expect(text).toContain('Hit Points 105');
    expect(text).toContain('STR DEX CON INT WIS CHA');
    expect(text).toContain('Challenge 5');
    expect(text).toContain('Immutable Form.');
    expect(text).toContain('Actions');
    // 2024 phrasing rides inside the description as prose.
    expect(text).toContain('Melee Attack Roll:');
  });

  test('Improved Initiative export carries native BonusActions and InitiativeModifier', () => {
    const out = convertToImprovedInitiative(monster2024);
    expect(out.HP).toEqual({ Value: 105, Notes: '14d10 + 28' });
    expect(out.AC.Value).toBe(17);
    expect(out.InitiativeModifier).toBe(0);
    expect(out.Abilities.Str).toBe(18);
    expect(out.Challenge).toBe('5');
    expect(out.BonusActions).toEqual([{ Name: 'Brace', Content: expect.stringContaining('roots itself') }]);
    expect(out.Reactions).toEqual([{ Name: 'Intercept', Content: expect.stringContaining('Trigger:') }]);
    expect(out.LegendaryActions).toHaveLength(1);
    // The legacy fold's suffixed copies never leak into Traits.
    expect(out.Traits.map((t) => t.Name)).toEqual(['Immutable Form']);
    expect(out.DamageImmunities.join(' ')).toContain('poison');
    expect(out.ConditionImmunities.join(' ')).toContain('poisoned');
  });

  test('2014 blocks are untouched by the new branches', () => {
    const legacy2014 = {
      name: 'Old Guard', type_and_alignment: 'Medium humanoid, lawful neutral',
      armor_class: '16 (chain mail)', hit_points: '52 (8d8 + 16)', speed: '30 ft.',
      attributes: 'STR 16 (+3), DEX 10 (+0), CON 14 (+2), INT 10 (+0), WIS 12 (+1), CHA 10 (+0)',
      saving_throws: 'STR +5', skills: 'Perception +3', damage_resistances: '',
      damage_immunities: '', condition_immunities: '', senses: 'passive Perception 13',
      languages: 'Common', challenge_rating: '3 (700 XP)',
      abilities: [{ name: 'Brave', description: 'Advantage on saves against being frightened.' }],
      actions: [{ name: 'Longsword', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage.' }],
    };
    const text = convertToFoundryVTT(legacy2014);
    expect(text).toContain('Armor Class 16 (chain mail)');
    const out = convertToImprovedInitiative(legacy2014);
    expect(out.Abilities.Str).toBe(16);
    expect(out.BonusActions).toEqual([]);
  });
});

describe('Homebrewery 2024 monster frame (owner-provided example format)', () => {
  test('renders the frame, :: stat lines, three-group table, and legend block', async () => {
    const { renderStatblock2024Homebrewery } = await import('@/tools/statblock-generator/format-2024/render.mjs');
    const md = renderStatblock2024Homebrewery({
      ...monster2024,
      legendary_uses: 3,
      stats: { ...monster2024.stats, INT: 9 },
    });
    expect(md.startsWith('{{monster,frame\n## Iron Sentinel')).toBe(true);
    expect(md.trim().endsWith('}}')).toBe(true);
    expect(md).toContain('**AC**         :: 17');
    expect(md).toContain('**HP**         :: 105 (14d10 + 28)');
    expect(md).toContain('**Initiative** :: +0 (10)');
    expect(md).toContain('|   |   | MOD | SAVE |   |   | MOD | SAVE |   |   | MOD | SAVE |');
    expect(md).toContain('|Str| 18| +4 | +7 |Dex| 10| +0 | +0 |Con| 14| +2 | +2 |');
    // Negative numbers use the double-hyphen form from Homebrewery's example.
    expect(md).toContain('|Int| 9| --1 | --2 |');
    expect(md).toContain('**CR**         :: 5 (XP 1,800; PB +3)');
    expect(md).toContain('### Traits\n\n***Immutable Form.***');
    expect(md).toContain('{{legend Legendary Action Uses: 3.');
    expect(md).toContain('### Bonus Actions');
  });
});
