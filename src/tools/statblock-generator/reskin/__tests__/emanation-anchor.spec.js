/**
 * AN EMANATION NAMES WHAT IT COMES FROM; A CONE AND A LINE DO NOT.
 *
 * The critic's §2a, gate of 2026-11-08. Their #25 was the Black Iron Sentinel's Iron Root:
 * "Each creature in a 10-foot-radius sphere must succeed on a DC 16 Strength saving throw"
 * — an area with no centre, which a GM cannot place on the table. The 2024 twin was no
 * better ("each creature in a 10-foot Emanation"), so the 2014 converter did not DROP the
 * anchor: it was never written. `author.mjs`'s TARGET_OK accepts a bare Cone/Line/Emanation
 * while requiring "centered on a point" for a Sphere, reasoning that an Emanation "comes
 * from the creature by definition".
 *
 * Print agrees for two of the three and disagrees for one, measured on srd52-monsters.json:
 *   Emanation: 33 of 34 mentions carry "originating from"
 *   Cone:       0 of 55
 *   Line:       0 of 24
 * So only the Emanation is anchored. The plan for this item said "Cone, Line or Emanation";
 * the corpus refused two thirds of that, and anchoring cones would have made 55 print-shaped
 * rows unlike print.
 *
 * Scope measured on three saved forties: 11 of 11 seat/repair-authored area rows shipped
 * with no anchor — ~3-4 rows a forty, not one sheet.
 */
import { renderForm } from '../forms.mjs';
import { readFileSync } from 'fs';

const save = (target, anchor = 'the sentinel') => ({
  kind: 'save', stat: 'Strength', dc: 16, target, anchor,
  failure: 'The target has the Restrained condition until the end of its next turn.', success: '',
});

describe('an authored Emanation carries its origin, in both printings', () => {
  it('2024 appends "originating from" the creature', () => {
    expect(renderForm(save('each creature in a 10-foot Emanation'), '2024'))
      .toMatch(/each creature in a 10-foot Emanation originating from the sentinel\./);
  });

  it('2014 uses its own aura idiom, which carries the anchor', () => {
    // the old conversion wrote "a 10-foot radius" — a shape with no centre, which is
    // exactly what shipped on the critic's #25
    const t = renderForm(save('each creature in a 10-foot Emanation'), '2014');
    expect(t).toMatch(/^Each creature within 10 feet of the sentinel must make a DC 16 Strength saving throw/);
    expect(t).not.toMatch(/radius|sphere/i);
  });

  it('does not touch a Cone or a Line — print never anchors those', () => {
    for (const [shape, n] of [['Cone', 30], ['Line', 60]]) {
      const t24 = renderForm(save(`each creature in a ${n}-foot ${shape}`), '2024');
      expect(t24).toMatch(new RegExp(`each creature in a ${n}-foot ${shape}\\.`));
      expect(t24).not.toMatch(/originating from/);
      expect(renderForm(save(`each creature in a ${n}-foot ${shape}`), '2014')).toMatch(new RegExp(`${n}-foot ${shape.toLowerCase()}`));
    }
  });

  it('leaves an already-anchored Emanation alone, in both printings', () => {
    const already = 'each creature in a 15-foot Emanation originating from the hag';
    expect(renderForm(save(already), '2024')).not.toMatch(/originating from the hag originating from/);
    expect(renderForm(save(already), '2014')).toMatch(/within 15 feet of the hag/);
  });

  it('is a no-op with no anchor, so every other caller is untouched', () => {
    const t = renderForm(save('each creature in a 10-foot Emanation', null), '2014');
    expect(t).toMatch(/in a 10-foot radius/); // the pre-existing fallback wording
    expect(renderForm(save('each creature in a 10-foot Emanation', null), '2024')).not.toMatch(/originating from/);
  });

  it('leaves a single-target row alone', () => {
    expect(renderForm(save('one creature within 30 feet'), '2024')).toMatch(/one creature within 30 feet\./);
  });

  it("print's own rates are what this rests on", () => {
    const corpus = JSON.parse(readFileSync('src/data/srd52-monsters.json', 'utf8'));
    const blocks = Array.isArray(corpus) ? corpus : Object.values(corpus).flat();
    const FLAT = ['abilities', 'actions', 'bonus_actions', 'reactions', 'legendary_actions'];
    const count = (re) => {
      let all = 0; let anchored = 0;
      for (const b of blocks) {
        for (const r of [...Object.values(b.sections ?? {}).flat(), ...FLAT.flatMap((k) => b[k] ?? [])].filter(Boolean)) {
          for (const m of String(r.text ?? r.description ?? '').replace(/\s+/g, ' ').matchAll(re)) {
            all += 1; if (/originating from/.test(m[0])) anchored += 1;
          }
        }
      }
      return { all, anchored };
    };
    const eman = count(/(\d+)-foot Emanation[^.]{0,60}/g);
    const cone = count(/(\d+)-foot Cone[^.]{0,60}/g);
    expect(eman.anchored / eman.all).toBeGreaterThan(0.9); // 33 of 34
    expect(cone.anchored).toBe(0);                          // 0 of 55
  });
});
