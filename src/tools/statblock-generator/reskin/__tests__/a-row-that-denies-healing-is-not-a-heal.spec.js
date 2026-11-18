/**
 * A ROW THAT DENIES HEALING IS NOT A HEAL (fix 3, 2026-11-18).
 *
 * The tollkeeper's trait was refused twice with "heal names no amount or no limit":
 *
 *   When the tollkeeper hits a creature with Necrotic Clapper, the target is marked as dying;
 *   until the end of the tollkeeper's next turn, the marked creature cannot regain hit points.
 *
 * There is no amount to name, because nothing is healed. `healOk` matched "regain … hit points" and
 * asked for a number. It is the Mummy's own sentence — "While cursed, the target can't regain Hit
 * Points" — and as of this morning it is also the engine's severe curse.
 *
 * The denial is read in the SENTENCE THE VERB SITS IN, so a denial elsewhere in a long trait does
 * not excuse a heal that names no amount. A heal that grants Hit Points with no amount is still
 * refused, which is the rule this gate exists for.
 *
 * MEASURED AGAINST PRINT: 13 rows deny healing, and 0 of them are refused by the heal gate. Two of
 * the 13 — the Aboleth's Mucus Cloud and the Pit Fiend's Bite — are still refused AS TRAITS, for a
 * different and correct reason: both write a saving throw in sentence form, and in print neither is
 * a trait at all.
 */
import { parseAuthorResponse } from '../author.mjs';
import srd from '@/data/srd52-monsters.json';

const trait = (effect, trigger = 'when the tollkeeper hits a creature with Necrotic Clapper') => parseAuthorResponse(
  JSON.stringify({ traits: [{ clause: 'the toll marks the dying', name: 'Toll of the Dying', trigger, effect, passive_effect: 'threat' }] }), {},
);
const healWhy = (p) => p.refused.find((r) => /heal names no amount/.test(String(r.why)))?.why ?? null;

describe('a row that denies healing is not a heal', () => {
  test("THE TOLLKEEPER'S TRAIT LANDS", () => {
    const p = trait("the target is marked as dying; until the end of the tollkeeper's next turn, the marked creature cannot regain hit points");
    expect(p).toBeTruthy();                                   // the parse ran
    expect(p.traits).toHaveLength(1);
    expect(p.traits[0].name).toBe('Toll of the Dying');
    expect(healWhy(p)).toBeNull();
  });

  test("every way of denying it passes, in the owner's own words", () => {
    for (const eff of [
      'the target cannot regain hit points',
      "the target can't regain Hit Points",
      'the target can not regain hit points',
      'the target does not regain hit points',
      "the target doesn't regain Hit Points",
      'the target is unable to regain hit points',
      'the target no longer regains hit points',
      'the target will not regain hit points',
      'the target gains no benefit from finishing a Short Rest and regains Hit Points only on a Long Rest',
    ]) expect(trait(eff).traits).toHaveLength(1);
  });

  test('A HEAL THAT NAMES NO AMOUNT IS STILL REFUSED, with the reason returned', () => {
    const p = trait('the tollkeeper regains hit points equal to half the damage dealt');
    expect(p.traits).toHaveLength(0);
    expect(healWhy(p)).toMatch(/heal names no amount or no limit/);
  });

  test('a heal that names its amount still lands', () => {
    expect(trait('the tollkeeper regains {dmg} hit points').traits).toHaveLength(1);
  });

  // THE DENIAL MUST BE IN THE VERB'S OWN SENTENCE, or a long trait could smuggle a free heal past
  // the gate by denying something unrelated earlier.
  test('a denial in another sentence does not excuse a heal with no amount', () => {
    const p = trait('the target cannot move away from the tollkeeper. The tollkeeper regains hit points equal to the damage dealt');
    expect(p.traits).toHaveLength(0);
    expect(healWhy(p)).toMatch(/heal names no amount/);
  });

  test("print's 13 rows that deny healing are not refused as heals", () => {
    const list = Array.isArray(srd) ? srd : (srd.monsters ?? Object.values(srd).flat());
    const DENY = /\b(?:can't|cannot|can not|won't|will not|doesn't|does not|unable to|no longer|never)\b[^.]*\b(?:regains?|restores?|heals?|recovers?)\b[^.]*\bhit points\b/i;
    const denies = list.flatMap((x) => Object.values(x.sections ?? {}).flat().filter((r) => r?.text && DENY.test(r.text)).map((r) => ({ mon: x.name, r })));
    expect(denies.length).toBe(13);                           // the corpus really holds them
    const refused = [];
    for (const { mon, r } of denies) {
      const p = trait(String(r.text).replace(/\d+ \(\d+d\d+[^)]*\)/g, '{dmg}'), '');
      if (healWhy(p)) refused.push(`${mon}/${r.name}`);
    }
    expect(refused).toEqual([]);
  });
});
