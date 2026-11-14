/**
 * A BLIND PAYOFF KNOWS ITS TRIGGER (item 2, fix 3 — 2026-11-14).
 *
 * The fallback shelf renders `condition-payoff` with no fills (generate.mjs, the
 * `renderTemplate(t, ctxT, {}, { blind: true })` call). The slot that names the
 * condition the row REQUIRES defaulted to the sheet's first imposed condition only in
 * the final fill loop, after the guard that strips a reward equal to its own trigger
 * had already read the slot and found it empty. On a sheet that imposes Prone the row
 * shipped "If the target already has the Prone condition, it also has the Prone
 * condition" (Vhalgrin's Cracked-Core Strike; Ashen Kal's Thawless Heart).
 *
 * Every other payoff test passes `consumed_condition` in its fills, so none of them
 * walked the path that ships. These call the renderer the way the shelf does.
 */
import { TEMPLATE_BY_ID, renderTemplate } from '@/tools/statblock-generator/reskin/templates.mjs';
import { scaleDonor, pickDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const ctx = (cr, imposed) => ({
  scaled: scaleDonor(pickDonor(cr, null, 'skirmisher'), cr, { mechanics: [] }),
  archetype: 'skirmisher', cr, imposed, name: 'Vhalgrin', inline: 'Vhalgrin',
  energy: 'Radiant', mix: null, concept: 'a floating shard-glass construct', size: 'Medium',
});
const blind = (cr, imposed) => renderTemplate(TEMPLATE_BY_ID.get('condition-payoff'), ctx(cr, imposed), {}, { blind: true });
const pair = (row) => /already has the (\w+) condition, it also has the (\w+) condition/.exec(row?.text ?? '');

const SHEET_CONDITIONS = ['Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Incapacitated', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned', 'Unconscious'];
const CRS = [1, 5, 9, 10, 12, 17, 22];

describe('a blind payoff knows its trigger', () => {
  test.each(SHEET_CONDITIONS)('on a sheet that imposes %s, the reward is never the trigger', (c) => {
    for (const cr of CRS) {
      const row = blind(cr, [c]);
      expect(row).toBeTruthy();
      const m = pair(row);
      if (m) expect(m[2]).not.toBe(m[1]);
    }
  });

  test('the known-bad sheet: imposing Prone, the vestigial clause leaves and nothing claims a reward', () => {
    const row = blind(5, ['Prone']);
    expect(row.text).not.toMatch(/also has the Prone condition/);
    expect(row.text).toMatch(/Failure:\*? \d+ \(\d+d\d+\) Radiant damage\./);
    expect(row.imposes).toBeUndefined();
  });

  test('the blind render and the filled render of the same sheet agree', () => {
    const t = TEMPLATE_BY_ID.get('condition-payoff');
    const filled = renderTemplate(t, ctx(5, ['Prone']), { consumed_condition: 'Prone' }, { blind: true });
    expect(blind(5, ['Prone']).text).toBe(filled.text);
  });

  test('a template with no such slot acquires no requirement (noxious-aura)', () => {
    const t = TEMPLATE_BY_ID.get('noxious-aura');
    if (!t) return; // the catalog may rename it; the guard is what matters when it exists
    const row = renderTemplate(t, { ...ctx(5, ['Prone']), archetype: 'brute' }, {}, { blind: true });
    if (row) expect(row.text).not.toMatch(/already has the/);
  });
});
