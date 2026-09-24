import fs from 'node:fs';
import path from 'node:path';
import { tagEntry, tagCorpus } from '../corpus-tags.mjs';
import { TRIGGERS, EFFECTS } from '../templates.mjs';

describe('corpus tags — the cookbook index speaks the template grammar', () => {
  test('a bare attack row and Multiattack are not signatures', () => {
    expect(tagEntry('Actions', 'Rend', '*Melee Attack Roll:* +11, reach 10 ft. 13 (2d6 + 6) Slashing damage plus 4 (1d8) Acid damage.')).toBeNull();
    expect(tagEntry('Actions', 'Multiattack', 'The kraken makes three Tentacle attacks.')).toBeNull();
  });

  test('an attack row with a clause after the damage is a rider (on_hit) tagged by its clause', () => {
    const tag = tagEntry('Actions', 'Tentacle', '*Melee Attack Roll:* +9, reach 15 ft. 12 (2d6 + 5) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).');
    expect(tag).toMatchObject({ section: 'rider', trigger: 'on_hit', effect: 'condition' });
    expect(tag.keys).toContain('grappled');
  });

  test('traits read their trigger from the print idiom', () => {
    expect(tagEntry('Traits', 'Death Burst', 'The mephit explodes when it dies. *Dexterity Saving Throw:* DC 10, each creature in a 5-foot Emanation. *Failure:* 5 (2d4) Slashing damage.')).toMatchObject({ section: 'trait', trigger: 'on_being_hit', effect: 'damage' });
    expect(tagEntry('Traits', 'Fire Aura', 'At the end of each of the elemental\'s turns, each creature in a 10-foot Emanation takes 5 (1d10) Fire damage.')).toMatchObject({ section: 'trait', trigger: 'start_of_turn', effect: 'damage' });
    expect(tagEntry('Reactions', 'Parry', 'The knight adds 2 to its AC against one melee attack that would hit it.')).toMatchObject({ section: 'reaction', trigger: 'on_being_hit', effect: 'defense' });
  });

  test('the whole print corpus tags inside TRIGGERS × EFFECTS, with riders split from bare attack rows', () => {
    const src = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../data/srd52-monsters.json'), 'utf8'));
    const rows = tagCorpus(Array.isArray(src) ? src : Object.values(src).flat());
    expect(rows.length).toBeGreaterThan(500);
    for (const r of rows) { expect(TRIGGERS).toContain(r.trigger); expect(EFFECTS).toContain(r.effect); }
    expect(rows.filter((r) => r.section === 'rider').length).toBeGreaterThan(50);
    expect(rows.some((r) => /Attack Roll/.test(r.text) && r.section !== 'rider')).toBe(false);
  });
});
