// A CITED ROW MAY BE NAMED WITH ITS KIND (critic's release ruling + our §3, 2026-11-09).
//
// "the prowler can immediately use its Umbral Step bonus action" is how a GM writes it: the row
// is "Umbral Step", it sits under Bonus Actions, and nobody reading the card is confused. Both
// citation readers matched the captured phrase literally, so #20 Thin-Seam Prowler FAILed twice
// on one correct row. `dangling-use-ref`'s own capture is why "bonus" needs stripping on its own:
// the optional group eats the word "action" and leaves "Umbral Step bonus".
//
// This is ONE of the three citation shapes measured across the week's fortys (3 of 7 carry one).
// The other two MUST still refuse and are asserted here:
//   - a row that genuinely is not on the sheet (Thornback's "Eruptive Ambush")
//   - a trigger naming an event or precondition nothing produces (Krennik's "witnessed his
//     standard break"; Rotbark's Grappled/Restrained/Prone with no row imposing one) — NOT YET
//     BUILT, see the plan's item 14 move 2; no test here claims it is.
import { lintStatblock } from '@/tools/statblock-generator/format-2024/lint.mjs';
import PRINT from '@/data/srd52-monsters.json';

const sheet = (entries) => ({
  name: 'Thin-Seam Prowler', format: '2024', size: 'Medium', type: 'Aberration', alignment: 'Neutral',
  ac: 15, hp: 45, hp_formula: '10d8', speed: '30 ft.',
  stats: { STR: 12, DEX: 16, CON: 10, INT: 10, WIS: 12, CHA: 10 }, saves: {}, skills: '',
  senses: 'darkvision 60 ft.; Passive Perception 11', languages: 'Deep Speech',
  initiative_bonus: 3, cr: 3, cr_str: '3', pb: 2, xp: 700,
  sections: {
    Traits: [entries.trait],
    Actions: [{ name: 'Tentacles', text: '*Melee Attack Roll:* +5, reach 10 ft. 9 (2d6 + 2) Bludgeoning damage.' }],
    'Bonus Actions': entries.bonus ? [entries.bonus] : [],
  },
});
const umbral = { name: 'Umbral Step', text: 'While in Dim Light or Darkness, the prowler takes the Hide action.' };
const refs = (b) => lintStatblock(JSON.parse(JSON.stringify(b)), { edition: '2024' }).findings.filter((f) => /ref/.test(f.rule)).map((f) => f.rule);

describe('a citation that names the row plus its kind resolves', () => {
  for (const cite of ['its Umbral Step bonus action', 'its Umbral Step bonus', 'Umbral Step', 'its Umbral Step reaction', 'Umbral Step twice']) {
    test(`"…can immediately use ${cite} to…" resolves to the row`, () => {
      const trait = { name: 'Flicker Afterimage', text: `When a creature misses the prowler with an attack, the prowler can immediately use ${cite} to vanish.` };
      expect(refs(sheet({ trait, bonus: umbral }))).toEqual([]);
    });
  }
});

describe('and the shapes that must still refuse', () => {
  test('a cited row that is not on the sheet', () => {
    const trait = { name: 'Flicker Afterimage', text: 'When a creature misses the prowler with an attack, the prowler can immediately use Eruptive Ambush to vanish.' };
    expect(refs(sheet({ trait, bonus: umbral })).length).toBeGreaterThan(0);
  });
  test('the kind word alone does not conjure a row', () => {
    const trait = { name: 'Flicker Afterimage', text: 'When a creature misses the prowler with an attack, the prowler can immediately use its Seam Step bonus action to vanish.' };
    expect(refs(sheet({ trait, bonus: umbral })).length).toBeGreaterThan(0);
  });
});

describe('print is untouched', () => {
  test('no citation finding across print 329 blocks', () => {
    let n = 0, scanned = 0;
    for (const m of PRINT) { try { n += lintStatblock(JSON.parse(JSON.stringify(m)), { edition: '2024' }).findings.filter((f) => /ref/.test(f.rule)).length; scanned++; } catch { /* unscorable */ } }
    expect(scanned).toBeGreaterThan(300); // the zero is not an empty scan
    expect(n).toBe(0);
  });
});
