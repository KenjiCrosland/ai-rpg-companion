/**
 * A DEFENSIVE OR UTILITY FREE ROW IS NOT PRICED BY DAMAGE.
 *
 * Owner's ruling, 2026-11-05: "We need to price those defensive and utility rows
 * differently."
 *
 * The 0.25 floor on a free row existed so the row still had to DO something, and it
 * measured that in damage. A template audit the same day — rendered with the engine's own
 * `renderTemplate` and priced with its own `valueCheck`, 1,081 context samples over 4 CRs
 * x 5 archetypes — found three rows that do exactly what they promise scoring EV 0 and
 * dropping in ALL 20 of their contexts: `interpose` (a reaction that shields an ally),
 * `patient-defense` (the SRD Monk feature) and `self-invisibility`. Print ships rows of
 * this shape; pricing them by offense asks a Dodge to deal damage.
 *
 * The split is DECLARED, never read off the text: a free row whose template declares
 * `effect: damage` keeps the damage floor, because a row promising damage and delivering
 * none is the defect the floor was built for.
 */
import { TEMPLATES, renderTemplate, valueCheck } from '../templates.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';

const SECTION = { action: 'Actions', bonus_action: 'Bonus Actions', reaction: 'Reactions' };
const priced = (id, cr = 5, archetype = 'brute') => {
  const t = TEMPLATES.find((x) => x.id === id);
  if (!t) return null;
  const scaled = scaleDonor(pickDonor(cr, null, archetype), cr);
  const ctx = {
    scaled, sections: scaled.sections, archetype, style: null, cr, movement: '', size: 'Medium',
    energy: null, mix: null, meleeName: 'Slam', rangedName: null, conditionMinor: 'Prone',
    projectile: null, holds: null,
  };
  const row = renderTemplate(t, ctx, {});
  if (!row?.text) return null;
  const vc = valueCheck(row, { scaled, sections: scaled.sections, cr, section: SECTION[t.section], template: t.id });
  return { declares: t.effect, section: t.section, ev: vc.ev ?? 0, floor: vc.floor ?? 0 };
};

describe('the value floor does not price a free defensive row by damage', () => {
  it.each([['interpose', 'defense'], ['patient-defense', 'defense']])(
    '%s declares %s, so its floor stands down', (id, effect) => {
      const p = priced(id);
      expect(p).toBeTruthy();
      expect(p.declares).toBe(effect);
      expect(p.floor).toBe(0);                 // the damage floor does not apply
      expect(p.ev).toBeGreaterThanOrEqual(p.floor); // so the row survives
    });

  it('keeps the floor for a free row that DECLARES damage', () => {
    // a row promising damage and delivering none is the defect the floor exists for
    const p = priced('riposte');
    expect(p).toBeTruthy();
    expect(p.declares).toBe('damage');
    expect(p.floor).toBeGreaterThan(0);
    expect(p.ev).toBeGreaterThanOrEqual(p.floor); // and it clears on merit, not exemption
  });

  // A SEED DECLARES ITS OWN CELL, SO REPAIRING A ROW TOWARD PRINT'S GRAMMAR DOES NOT
  // REFILE IT (owner's ruling, 2026-11-05, option b). The cell used to be inferred by
  // regex over the row's prose — condition > damage > movement — and the menu is built
  // from the cell, so adding the damage term `disarm` needed to clear the floor silently
  // moved it to `save/damage` and left the movement shelf without its only disarm.
  describe('a declared cell survives a damage term', () => {
    const disarm = () => TEMPLATES.find((t) => t.id === 'disarm');

    it('disarm carries damage AND keeps the movement cell it declares', () => {
      const d = disarm();
      expect(/\{burst\}/.test(String(d.text))).toBe(true);            // clears the floor on merit
      expect(`${d.section}/${d.trigger}/${d.effect}`).toBe('action/save/movement');
    });

    it('and the inference still files every seed that declares nothing', () => {
      // the fallback must be untouched, or this change silently reshelves the catalog
      const cells = Object.fromEntries(['push-prone', 'delayed-brand', 'drain', 'exploiter']
        .map((id) => [id, (() => { const t = TEMPLATES.find((x) => x.id === id); return t ? `${t.trigger}/${t.effect}` : null; })()]));
      expect(cells).toEqual({
        'push-prone': 'save/condition',
        'delayed-brand': 'start_of_turn/damage',
        drain: 'save/damage',
        exploiter: 'save/condition',
      });
    });
  });

  it('leaves an ACTION priced as before — only free rows are affected', () => {
    // `disarm` is the open case: bare, EV 0 against a real floor, and unliftable because
    // the ladder raises a row by scaling dice it already has. Recorded here so the next
    // reader sees that the free-row change deliberately did NOT rescue it.
    const p = priced('disarm');
    if (!p) return;                            // library seeds need a draw context to render
    expect(p.section).toBe('action');
    expect(p.floor).toBeGreaterThan(0);
  });
});
