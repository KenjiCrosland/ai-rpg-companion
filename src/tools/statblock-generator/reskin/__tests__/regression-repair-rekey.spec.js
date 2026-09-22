import { generateReskin as generateReskinRaw, renameKeysOf } from '../generate.mjs';
// these pins exercise the FREE-TEXT signature path (kept behind signatureMode 'freetext'
// since the template signature became the default, 2026-09-21)
const generateReskin = (opts, cb) => generateReskinRaw({ signatureMode: 'freetext', ...opts }, cb);
import { pickDonor, scaleDonor } from '../scale.mjs';

// THE HEADLESS HORSEMAN CRASH (2026-09-15, user-visible x3): damage
// types are RENAME-keyed; a repair that renamed the flagged row
// ("Flaming Skull" -> a fresh name) stranded its type under the old
// key, the round cap exited without re-validation, and the fill found
// nothing — the loud {damage_type} throw reached the user. The merge
// now re-keys surviving types when a repair renames their row.
test('a repair rename CARRIES its damage-type key — the Headless Horseman crash dies', async () => {
  const scaled = scaleDonor(pickDonor(10, null, 'brute'), 10, { mechanics: [] });
  const keys = renameKeysOf(scaled);
  const ranged = keys.find((k) => /Ranged/.test(k));
  const renames = {};
  keys.forEach((k, i) => { renames[k] = `Row${i}`; });
  renames[ranged] = 'Flaming Skull';
  const typed = Object.values(scaled.sections).flat()
    .filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
  try {
    const m = await generateReskin({ archetype: 'brute', concept: 'headless horseman', cr: 10, energy: 'Necrotic', mechanics: [] },
      async (prompt) => {
        if (prompt.startsWith('You are repairing')) return JSON.stringify({});
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        if (prompt.startsWith('You are completing')) {
          // the repair FIXES the flagged name without resupplying its type
          return JSON.stringify({ renames: { [ranged]: 'Screaming Skull Hurl' } });
        }
        return JSON.stringify({
          name: 'Headless Horseman', type: 'Undead', size: 'Medium', alignment: 'Neutral',
          senses: 'darkvision 60 ft.', languages: 'Common',
          renames, damage_types: Object.fromEntries(typed.map((n) => [n, n === 'Flaming Skull' ? 'Fire' : 'Necrotic'])),
          conditions: { condition_minor: 'Frightened' }, melee_rider: 'none', slot_save: 'Wisdom',
          wildcard: '*Wisdom Saving Throw*: DC 17, one creature within 30 feet. *Failure:* The target has Disadvantage on its next attack roll before the start of the creature\'s next turn.',
        });
      });
    expect(m.name).toBe('Headless Horseman');
    const row = Object.values(m.sections).flat().find((e) => e.name === 'Screaming Skull Hurl');
    expect(row.text).not.toMatch(/\{damage_type\}/);
  } catch (e) {
    throw new Error(`the crash class is back: ${e.message}`);
  }
}, 30000);
