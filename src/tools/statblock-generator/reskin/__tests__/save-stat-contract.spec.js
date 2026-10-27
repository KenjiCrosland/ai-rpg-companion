/**
 * THE MODEL'S save_stat PICK IS CONSULTED. It used to be overwritten with zero
 * reads of the model's answer, so the VOCAB enum it chose from was decorative.
 * Now the pick stands unless print is decisive against it, and every override
 * carries its reason on the row.
 *
 * What the gate reads is DECLARED (owner's audit, 2026-10-25): the condition the
 * row IMPOSES comes from `imposedConditions`, and the mapping from condition to
 * stat is one shared closed-fact table, `saveStatsFor`. The prose ladder this
 * replaced carried the bug the last case here guards.
 */
import { TEMPLATES, renderTemplate } from '@/tools/statblock-generator/reskin/templates.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const cr = 11;
const ctx = () => ({ scaled: scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] }), archetype: 'brute', cr, imposed: [], name: 'H', energy: 'Fire', mix: 'both', meleeName: 'Slam' });
const stat = (r) => /\b(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw/.exec(r?.text ?? '')?.[1];
const burst = () => TEMPLATES.find((t) => t.id === 'ground-burst');

describe('save_stat: the model picks, the engine validates', () => {
  it('keeps Constitution on an area-plus-damage row (a breath is print-legal)', () => {
    const r = renderTemplate(burst(), ctx(), { save_stat: 'Constitution' });
    expect(stat(r)).toBe('Constitution'); expect(r.saveOverride).toBeUndefined();
  });

  it('keeps Dexterity on an area-plus-damage row', () => {
    expect(stat(renderTemplate(burst(), ctx(), { save_stat: 'Dexterity' }))).toBe('Dexterity');
  });

  it('overrides Wisdom on a damage-dominant row, to Dexterity, and says why', () => {
    const r = renderTemplate(burst(), ctx(), { save_stat: 'Wisdom' });
    expect(stat(r)).toBe('Dexterity');
    expect(r.saveOverride).toMatch(/never Wisdom/);
  });

  it('with no pick, a damage-dominant row defaults to Dexterity with no override recorded', () => {
    const r = renderTemplate(burst(), ctx(), {});
    expect(stat(r)).toBe('Dexterity'); expect(r.saveOverride).toBeUndefined();
  });

  it('a pick outside the enum is ignored, not trusted', () => {
    expect(stat(renderTemplate(burst(), ctx(), { save_stat: 'Luck' }))).toBe('Dexterity');
  });

  // THE BUG THE AUDIT FOUND, inside the gate built to stop it. `execute`'s CR 0-2
  // frame targets "one Frightened creature" — a condition it REQUIRES of its
  // target, not one it imposes — and the deleted prose ladder read the bare word
  // and answered Wisdom on a row whose point is damage. That is bar 1's own
  // failure. `imposedConditions` reads print's "has the X condition" grammar, so
  // a targeting clause cannot be mistaken for an imposition.
  it('a condition the row REQUIRES of its target never picks the stat', () => {
    const ex = TEMPLATES.find((t) => t.id === 'execute');
    const low = { ...ctx(), cr: 2, scaled: scaleDonor(pickDonor(2, null, 'brute'), 2, { mechanics: [] }) };
    const r = renderTemplate(ex, low, {});
    expect(r.text).toMatch(/Frightened creature/);      // the requirement is still in the row
    expect(stat(r)).not.toBe('Wisdom');                  // but it did not pick the stat
  });

  it('a damage-dominant row overrides a Wisdom pick whatever rider it carries', () => {
    const r = renderTemplate(burst(), ctx(), { save_stat: 'Wisdom' });
    expect(stat(r)).not.toBe('Wisdom');
    expect(r.saveOverride).toMatch(/never Wisdom|damage is the row/);
  });

  it('the guidance the model reads carries print\'s counts', () => {
    const src = require('fs').readFileSync(require.resolve('@/tools/statblock-generator/reskin/templates.mjs'), 'utf8');
    expect(src).toMatch(/save_stat: 'by what the row DOES/);
    expect(src).toMatch(/Dexterity \(46 rows\)/);
  });
});

// THE ROW DECLARES THE DAMAGE IT DEALS (owner, 2026-10-27: "we want to retire it
// with a declared damage type, we don't want to rely on regex where so many edge
// cases have been proven to pop up").
//
// `renderTemplate` and `drawLibraryRow` each make a chain of corrections to the
// type — a thrown weapon keeps its own, a mental shape becomes Psychic, a drain
// Necrotic, a spewed cloud Poison, an on-hit rider takes the host hit's type —
// so no downstream reader can recover it from the sentence without redoing all
// of them. The save-fit gate's `/(\w+) damage/` scrape was the reader that tried.
describe('every row-building path declares its damage type', () => {
  const { TEMPLATE_BY_ID: BY_ID, renderTemplate: render } = require('../templates.mjs');
  const ctxFor = (energy) => ({ ...ctx(), energy, mix: null, concept: 'a thing of flies that drains the living' });

  test('a shape stamps the type it rendered', () => {
    expect(render(BY_ID.get('condition-payoff'), ctxFor('Fire'), {}).damageType).toBe('Fire');
    expect(render(BY_ID.get('heated-body'), ctxFor('Cold'), {}).damageType).toBe('Cold');
  });

  test("a spewed cloud declares the engine's correction, not the weapon default", () => {
    // `spew` with no energy is Poison, never Piercing — the critic's 2026-10-14 case
    expect(render(BY_ID.get('spew'), ctxFor(null), {}).damageType).toBe('Poison');
  });

  test('a library SEED declares its type too, through the branch that rebuilds the row', () => {
    const r = render(BY_ID.get('drain'), ctxFor('Necrotic'), {});
    expect(r.damageType).toBe('Necrotic');
    expect(r.text).toMatch(/Necrotic damage/);
  });

  test('a seed whose frame spends no damage declares none, rather than a misleading default', () => {
    const fear = ['escalating-dread', 'terror-pulse', 'phobia', 'wail'].map((k) => BY_ID.get(k)).find((t) => t?.kind === 'seed');
    if (!fear) return; // no fear seed in the catalog: nothing to assert
    const r = render(fear, ctxFor(null), {});
    if (r && !/\d+ \(\d+d\d+\)/.test(r.text)) expect(r.damageType).toBeUndefined();
  });
});

// THE PAYLOAD PICKS THE SAVE, NOT THE PRECONDITION (critic, the forty of
// 2026-10-27): "Brass Tyrant's Merciless Strike … is still a STR save for 71
// fire. Meanwhile both grapple-payoffs are DEX. So the stat isn't coming from a
// leftover condition — it's keyed to the precondition: Prone → STR, Grappled →
// DEX. The payload has to pick, not the precondition."
//
// The shared reader was already clean (a payoff's `consumes` is not read as an
// imposition), so nothing was mis-keying the stat — the table simply had NO
// OPINION about a single-target damage row, and the model's own answer stood.
// Print never writes Strength there: of its single-target damage-only save rows,
// Dexterity 11, Constitution 11, Wisdom 3, Charisma 2, Intelligence 1,
// Strength 0 of 28.
describe('a damage row never saves by Strength unless it displaces', () => {
  const { damageIsThePoint } = require('../author.mjs');
  const { saveStatsFor: stats } = require('../templates.mjs');
  const allowed = (row) => stats({ imposes: row.imposes ?? null, damageDominant: damageIsThePoint(row) });

  test('the payoff: 71 Fire on an already-Prone target takes Dex or Con, never Strength', () => {
    const row = { consumes: 'Prone', text: '*Strength Saving Throw:* DC 19, one creature within 60 feet that has the Prone condition. *Failure:* 71 (13d10) Fire damage.' };
    expect(allowed(row)).toEqual(['Dexterity', 'Constitution']);
    expect(allowed(row)).not.toContain('Strength');
  });

  test('the Grappled form answers the same way — the precondition no longer decides', () => {
    const row = { consumes: 'Grappled', text: '*Dexterity Saving Throw:* DC 19, one creature that has the Grappled condition. *Failure:* 42 (12d6) Piercing damage.' };
    expect(allowed(row)).toEqual(['Dexterity', 'Constitution']);
  });

  test('a shove KEEPS Strength: it displaces, and that is what Strength is for', () => {
    const row = { imposes: 'Prone', text: '*Strength Saving Throw:* DC 15, one creature within 5 feet. *Failure:* The target is pushed 10 feet away and has the Prone condition.' };
    expect(allowed(row)).toContain('Strength');
  });

  test('a row that IMPOSES a condition is unaffected — its condition still picks', () => {
    expect(allowed({ imposes: 'Poisoned', text: '*Constitution Saving Throw:* DC 14, one creature. *Failure:* 12 (2d10) Poison damage, and the target has the Poisoned condition.' })).toEqual(['Constitution']);
    expect(allowed({ imposes: 'Frightened', text: '*Wisdom Saving Throw:* DC 13, one creature within 60 feet. *Failure:* The target has the Frightened condition.' })).toEqual(['Wisdom', 'Charisma']);
  });

  test('a DISPLACEMENT row keeps Strength even with damage on it', () => {
    // the false positive this rule had on its first cut (Mirelda Sedge's Mire
    // Sink, the balance twelve): "7 (2d6) Poison damage, and Mirelda drags the
    // target up to 15 feet through a wall ... the target emerges Prone". Its
    // point is the haul; print's save for a haul is Strength. The shared reader
    // sees no condition here only because the row says "emerges Prone" rather
    // than "has the Prone condition", so "no condition imposed" was the wrong
    // test — `consumes` is the right one.
    const drag = { text: '*Strength Saving Throw:* DC 14, one Medium or smaller creature it is touching. *Failure:* 7 (2d6) Poison damage, and it drags the target up to 15 feet; the target emerges Prone.' };
    expect(damageIsThePoint(drag)).toBe(false);
    expect(allowed(drag)).toEqual([]); // no opinion: the model's Strength stands
  });

  test('a row with no dice at all is not a damage row', () => {
    expect(damageIsThePoint({ text: 'The creature can climb difficult surfaces without needing to make an ability check.' })).toBe(false);
  });
});
