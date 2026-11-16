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

// A GATED CONTROL ROW PRICES AS AN ATTACK, NOT A ROUND (owner's ruling, 2026-11-07).
// The gated floor asks 1.3x the whole Multiattack and a qualifying condition credits one
// attack, so a control row with no damage could never clear it by arithmetic. Print ships
// that row anyway: 10 of its 81 gated action rows impose a condition and deal NO damage —
// the Gorgon's Petrifying Breath, the Doppelganger's Unsettling Visage, the Dust Mephit's
// Blinding Breath, the Ettercap's Web Strand, the Aboleth's Dominate Mind. The gate is the
// price of such a row; print pays in frequency, not damage.
describe('a gated row that declares a condition is held to one attack, not the round', () => {
  const SECTION = { action: 'Actions', bonus_action: 'Bonus Actions', reaction: 'Reactions' };
  const price = (id, cr = 9, archetype = 'brute') => {
    const { TEMPLATES, renderTemplate, valueCheck } = require('../templates.mjs');
    const { pickDonor, scaleDonor } = require('../scale.mjs');
    const t = TEMPLATES.find((x) => x.id === id); if (!t) return null;
    const scaled = scaleDonor(pickDonor(cr, null, archetype), cr);
    const ctx = { scaled, sections: scaled.sections, archetype, style: null, cr, movement: '', size: 'Medium',
      energy: null, mix: null, meleeName: 'Slam', rangedName: null, conditionMinor: 'Prone', projectile: null, holds: null };
    const row = renderTemplate(t, ctx, {}); if (!row?.text) return null;
    const vc = valueCheck(row, { scaled, sections: scaled.sections, cr, section: SECTION[t.section], template: t.id });
    return { imposes: row.imposes ?? null, gate: row.gate ?? null, ev: vc.ev ?? 0, floor: vc.floor ?? 0, ceiling: vc.ceiling };
  };

  it.each([['pacify', 'Incapacitated'], ['terror-pulse', 'Frightened']])(
    '%s declares %s and a gate, so it clears on the condition', (id, cond) => {
      const p = price(id);
      expect(p).toBeTruthy();
      expect(p.imposes).toBe(cond);          // DECLARED, not read off the text
      expect(p.gate).toBeTruthy();           // the gate is what pays for it
      expect(p.ev).toBeGreaterThanOrEqual(p.floor);
    });

  it('a gated row that declares NO condition still answers to the nova floor', () => {
    // `zone` ("Sustained Zone") is gated 1/Day and imposes nothing, so it must NOT ride
    // the stand-down — it owes damage like print's other 80% of gated rows. An earlier
    // cut of this test used `zone-seed` as the control and then that row was fixed
    // (ungated, damage on entry), which is exactly how a control case rots: pick one that
    // is still in the state being asserted.
    const p = price('zone');
    expect(p).toBeTruthy();
    expect(p.gate).toBeTruthy();
    expect(p.imposes).toBeNull();
    expect(p.ev).toBeLessThan(p.floor);
  });
});

// THE GATED FLOOR IS PRINT'S, NOT ITS HOTTEST ROWS' (owner's ruling, 2026-11-07).
// Measured by taking each of print's gated action rows and comparing its damage with its
// OWN monster's round (best attack x Multiattack count): breaths p25 0.86 / median 1.02,
// every other gated row median 0.85, all gated p25 0.85. At the old 1.3x, 55 of print's
// 64 gated damage rows (86%) sat below our floor — including about half its dragon
// breaths — so our gated rows answered to a bar print itself does not meet. The 1.5-2.5x
// the old comment cited is the p90-and-above of breaths alone.
describe('the gated floor sits where print sits', () => {
  it('is 0.85x the round, and the constant is the single definition', () => {
    const src = require('fs').readFileSync(require('path').join(__dirname, '..', 'templates.mjs'), 'utf8');
    expect(src).toMatch(/const GATED_FLOOR = 0\.85;/);
    // one definition: the floor expression reads the constant, never a literal
    expect(src).toMatch(/gatedControl \? 0\.8 \* attackEV : GATED_FLOOR \* maEV/);
    expect(src).not.toMatch(/1\.3 \* maEV/);
  });

  it('a gated damage row at print\'s median clears it', () => {
    const { valueCheck, multiattackShape } = require('../templates.mjs');
    const { pickDonor, scaleDonor } = require('../scale.mjs');
    const cr = 9; const scaled = scaleDonor(pickDonor(cr, null, 'brute'), cr);
    const sections = scaled.sections;
    // print's median gated row deals about its monster's whole ROUND, and the round is
    // RAW damage (best attack x Multiattack count), not an EV-weighted figure — an
    // earlier cut of this test used 0.65 x per-hit x attacks, which lands the row exactly
    // ON the floor and then fails on floating point.
    const perHit = Math.max(3, Math.round(scaled.per_hit ?? 6));
    const round = perHit * multiattackShape(sections).attacks;
    const row = { name: 'Toll (Recharge 5-6)', text: `*Constitution Saving Throw*: DC 15, each creature within 15 feet. *Failure:* ${round} (2d8) Thunder damage. *Success:* Half damage only.` };
    const vc = valueCheck(row, { scaled, sections, cr, section: 'Actions' });
    expect(vc.ev).toBeGreaterThanOrEqual(vc.floor);
  });
});
