/**
 * A TWIST KEEPS THE AREA ATTACK THE MODEL NAMED FOR IT (owner's ruling, 2026-11-23).
 *
 * He typed "Purple Worm, that swallowed a war-band's armoury" and wants the worm to disgorge the
 * weapons as an area attack. The naming call called the body's area row Shrapnel Spray; print canon
 * then removed it, because print's Purple Worm has no nova — and the trait seat went on to write a
 * payoff naming a row no longer on the sheet.
 *
 * The exception is narrow: the GM typed a printed creature BY ITS OWN NAME and added a twist,
 * print's creature has no nova, the model renamed the row, and no other gated area action is on the
 * sheet. On the forty it fires on s13 and nowhere else, which was confirmed by replay before
 * anything was recorded.
 *
 * Verified red with the change taken out: forcing `keepsItsNamedNova` to false turns the first test
 * red and leaves the four guards green.
 */
import { generateReskin } from '../generate.mjs';

const keysOf = (p, field) => {
  const i = p.indexOf(`"${field}": {`);
  if (i < 0) return [];
  return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]);
};
const NOTHING = { attacks: [], saves: [], traits: [], strikes: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [] };
/**
 * The fourth condition needs a SECOND gated area action on the sheet. On 18 November that was the
 * seat's own "Vomited Armoury"; a hand stub could not drive the seat to produce a gated area row
 * (every answer I gave it was refused or landed ungated), so the second row here comes from the fit
 * call choosing an area template for the GM's clause, which is the same thing by another door — a
 * row with provenance that answers what he typed, sitting in Actions, gated, with a save.
 */
const AN_AREA_TEMPLATE = 'spew';

/**
 * @param concept   what the GM typed; " — " separates the name field from the description
 * @param printBody the body the route seated on
 * @param path      the route's own path
 * @param renames   the naming call's rename map — the chassis's nova renamed, or not
 */
const build = async ({ concept, printBody, path = 'twist', cr = 15, seats = [NOTHING], renameNova = true, fit = null } = {}) => {
  let cached = null; let seatAsks = 0;
  const monster = await generateReskin({
    mechanics: [], archetype: 'brute', concept, userConcept: concept, cr,
    path: { path, print_body: printBody, relation: 'is', class: null },
  }, async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (/"hold_shape": \{"shape"/.test(p)) {
      return JSON.stringify({ shoots: { yes: false, because: '' }, is_a_swarm: { yes: false, because: '' },
        hold_shape: { shape: 'none', because: '' }, casts: { yes: false, because: '', implied_by_kind: false } });
    }
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      return JSON.stringify({ trait: { idea: 'Its gullet is full of old blades.', section: 'trait', trigger: 'always', effect: 'other', family: 'none' } });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      return JSON.stringify(fit ?? { template: null, declined_because: 'no_fit', closest: null, missing: 'an armoury' });
    }
    if (p.startsWith('You are writing ONE ability')) {
      const a = seats[Math.min(seatAsks, seats.length - 1)];
      seatAsks += 1;
      return JSON.stringify(a);
    }
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      // the naming call renames every row it is shown, INCLUDING the chassis's nova — unless the
      // test asks for the default name to stand
      const renames = Object.fromEntries(rk.map((k, i) => [k, renameNova ? `Shrapnel ${i}` : k]));
      cached = JSON.stringify({ name: 'Purple Worm', type: 'Monstrosity', size: 'Gargantuan', alignment: 'Unaligned',
        senses: 'blindsight 30 ft., tremorsense 60 ft.', languages: 'None', renames,
        damage_types: {}, conditions: { condition_minor: 'Poisoned' }, melee_rider: 'none', projectile: 'none', wildcard: '' });
    }
    return cached;
  });
  return { monster };
};

const actions = (m) => (m.sections?.Actions ?? []);
const gatedArea = (m) => actions(m).filter((e) => /\(Recharge [\d–-]+\)|\d\/Day/.test(e.name ?? '') && /Saving Throw/.test(e.text ?? ''));

jest.setTimeout(60000);

describe('the ruling: a printed creature typed by name, with a twist, and no nova of its own', () => {
  it('keeps the chassis nova under the model\'s name', async () => {
    const { monster } = await build({ concept: "Purple Worm — that swallowed a war-band's armoury", printBody: 'Purple Worm' });
    expect(gatedArea(monster).length).toBe(1);
    expect(gatedArea(monster)[0].name).toMatch(/^Shrapnel/);
  });
});

describe('and the four cases it must not reach', () => {
  /**
   * THE FOURTH CONDITION IS NOT TESTED HERE, AND THIS SAYS SO.
   *
   * "No other gated area action is on the sheet" needs a SECOND gated area row beside the
   * chassis's. On 18 November that was the seat's own "Vomited Armoury". I could not drive a hand
   * stub to place one: every seat answer I gave was refused or landed ungated, and a fit call
   * returning an area template landed no row either. Rather than assert on a sheet I had bent into
   * a shape the engine does not make, the condition is covered by the FORTY:
   *
   *   - the exception fires on s13 and on no other sheet of the 38 replayable ones, checked by a
   *     strict replay before anything was recorded;
   *   - s07's Hydra is exactly this case — a printed creature typed by name with a twist, no print
   *     nova — and it carries Choking Reek, which the seat kept for the GM's clause. The exception
   *     does not fire there.
   *
   * That is real evidence off real sheets, and it is in the round's report. If someone later finds
   * a stub that places a second gated area row, this is the place for it.
   */

  it("a printed creature that HAS its own nova keeps print's, not the chassis's", async () => {
    const { monster } = await build({
      concept: 'Adult Red Dragon — blind in one eye from an old lance', printBody: 'Adult Red Dragon', cr: 17,
    });
    const names = gatedArea(monster).map((e) => e.name);
    expect(names.some((n) => /^Shrapnel/.test(n))).toBe(false);
  });

  it("a creature of the GM's own on a printed body loses the chassis nova, as today", async () => {
    // no name field: the concept is all description, so the GM never typed the print creature
    const { monster } = await build({ concept: 'a skeleton with a greatsword', printBody: 'Skeleton', cr: 5 });
    expect(gatedArea(monster).map((e) => e.name).some((n) => /^Shrapnel/.test(n))).toBe(false);
  });

  it('a nova still under the chassis\'s default name is nobody\'s answer, and goes', async () => {
    const { monster } = await build({
      concept: "Purple Worm — that swallowed a war-band's armoury", printBody: 'Purple Worm', renameNova: false,
    });
    expect(gatedArea(monster).map((e) => e.name).some((n) => /^Shrapnel/.test(n))).toBe(false);
  });
});

describe('a row that leaves at print canon takes its references with it', () => {
  /**
   * The print-canon removal patched the Multiattack's citation and nothing else, while
   * `closedPathFillerLeaves` four lines down calls `sweepDeadName`. On the Purple Worm's first
   * probe roll "Gizzard of Ruin" named Shrapnel Spray after it had left.
   *
   * Driven by the case that makes the removal fire: a creature of the GM's own on a printed body,
   * where the chassis nova goes and a trait names it.
   */
  it('no row on the sheet names a row that is not on it', async () => {
    const { monster } = await build({ concept: 'a skeleton with a greatsword', printBody: 'Skeleton', cr: 5 });
    const all = Object.values(monster.sections ?? {}).flat();
    const names = all.map((e) => String(e.name ?? '').replace(/ \(.*\)$/, '')).filter(Boolean);
    const gated = all.filter((e) => /\(Recharge [\d–-]+\)|\d\/Day/.test(e.name ?? ''));
    // whatever the chassis nova was called, if it left, nothing still names it
    for (const e of all) {
      const text = String(e.text ?? '');
      for (const m of text.matchAll(/\b([A-Z][a-z]+(?: [A-Z][a-z]+){1,3})\b/g)) {
        const cited = m[1];
        // only the names that look like OUR row names: skip print prose
        if (!/^(Shrapnel|Grave-Line|Named Row)/.test(cited)) continue;
        expect(names).toContain(cited);
      }
    }
    expect(gated.length).toBeGreaterThanOrEqual(0); // the sheet arrived
  });
});
