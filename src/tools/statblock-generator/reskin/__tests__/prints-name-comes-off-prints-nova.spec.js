/**
 * PRINT'S NAME COMES OFF PRINT'S NOVA (fault 6, owner 2026-11-20).
 *
 * s32, the stone giant, shipped a 30-foot bludgeoning cone called "Deflect Missile (Recharge 5-6)".
 * In print, Deflect Missile is the Stone Giant's REACTION — the giant catches a missile and may
 * hurl it back. The pass that gives a chassis nova print's own name asked only that the printed row
 * be gated, force a save and roll damage, and never which section it was in. The audit's rename was
 * then blocked, correctly by its own rule, because the name is "print's own row".
 *
 * This is data integrity over the corpus: the section is the whole discriminator, and the test says
 * so by counting.
 */
import srd from '@/data/srd52-monsters.json';

const GATED = / \((?:Recharge [\d–-]+|\d\/Day)\)$/;
const novaShaped = (r) => GATED.test(String(r.name ?? '')) && /Saving Throw/.test(String(r.text ?? '')) && /\d+ \(\d+d\d+/.test(String(r.text ?? ''));

const shaped = [];
for (const m of srd) for (const [section, rows] of Object.entries(m.sections ?? {})) for (const r of rows ?? []) {
  if (novaShaped(r)) shaped.push({ creature: m.name, section, name: r.name, text: r.text });
}

describe('which printed rows may lend their name to a chassis nova', () => {
  test('the corpus holds rows that are nova-SHAPED but are not novas', () => {
    expect(shaped.length).toBeGreaterThan(0);                       // the subject is present
    const notActions = shaped.filter((r) => r.section !== 'Actions');
    expect(notActions.map((r) => `${r.creature} [${r.section}] ${r.name}`).sort()).toEqual([
      'Centaur Trooper [Bonus Actions] Trampling Charge (Recharge 5-6)',
      'Incubus [Bonus Actions] Nightmare (Recharge 6)',
      'Nalfeshnee [Bonus Actions] Horror Nimbus (Recharge 5-6)',
      'Stone Giant [Reactions] Deflect Missile (Recharge 5-6)',
    ]);
  });

  test("the Stone Giant's Deflect Missile is a Reaction, which is s32's whole fault", () => {
    const giant = srd.find((m) => m.name === 'Stone Giant');
    expect(giant).toBeDefined();
    const deflect = Object.entries(giant.sections).flatMap(([sec, rows]) => rows.map((r) => ({ sec, ...r }))).find((r) => /^Deflect Missile/.test(r.name));
    expect(deflect.sec).toBe('Reactions');
    expect(novaShaped(deflect)).toBe(true);                         // it passes the old gate
  });

  test('and the Stone Giant has NO nova of its own, so its chassis nova keeps the model\'s name', () => {
    const giant = srd.find((m) => m.name === 'Stone Giant');
    const ownNovas = (giant.sections.Actions ?? []).filter(novaShaped);
    expect(ownNovas).toEqual([]);
  });

  test('the section is the discriminator, not the geometry', () => {
    // requiring an AREA as well would drop legitimate single-target print novas, so it is not used
    const actions = shaped.filter((r) => r.section === 'Actions');
    const singleTarget = actions.filter((r) => !/each creature|Emanation|Cone|Line|Cube|Sphere/i.test(r.text));
    expect(actions.length).toBeGreaterThan(0);
    expect(singleTarget.length).toBeGreaterThan(0);                 // they exist, and they are real novas
  });
});
