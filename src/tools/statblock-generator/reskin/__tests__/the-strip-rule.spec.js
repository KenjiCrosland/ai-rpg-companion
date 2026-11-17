/**
 * ONE STRIP RULE, AND A BONUS REFUSED BEFORE ANYTHING STRIPS IT (2026-11-17).
 *
 * A `{dmg}` that deals nothing is dropped — the token stands only where damage is dealt or taken,
 * or where it names a quantity this engine prices. That rule existed TWICE, with different verb
 * lists: once where an answer is parsed, once where the row lands. Widening only the second meant
 * neither row the widening was written for was ever reached, because the parse had already stripped
 * the token and the refusal had nothing left to see.
 *
 * These are the two recorded answers from the baseline tape, fed to the real parser.
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseAuthorResponse, stripUnplacedDmg, dmgWrittenAsABonus, fillBonusDmg } from '../author.mjs';

const TAPE = path.resolve(__dirname, 'fixtures/recordings/baseline-2026-11-17b');
/**
 * Found by the CREATURE, never by the sheet number. Each generation of the tape is recorded by
 * replaying the last one, and a tape with 38 entries renumbers everything after the first skipped
 * input — so Vashka was `23-` on one tape and `22-` on the next, and a test keyed on the number
 * silently read another creature's answers.
 */
const seatAnswer = (creature, carrying) => {
  const f = fs.readdirSync(TAPE).find((x) => x.includes(creature) && x.endsWith('.json'));
  expect(f).toBeTruthy();
  for (const c of JSON.parse(fs.readFileSync(path.join(TAPE, f), 'utf8')).calls) {
    if (!String(c.prompt).startsWith('You are writing ONE ability')) continue;
    const body = JSON.parse(c.response).choices[0].message.content;
    if (carrying.test(body)) return body;
  }
  return null;
};

describe('the recorded answers the strip was written for', () => {
  test('Chain of Broken Oaths keeps BOTH tokens in its effect', () => {
    const body = seatAnswer('pit-fiend', /gains \{dmg\} Temporary Hit Points/);
    expect(body).toBeTruthy();
    const t = (parseAuthorResponse(body, {}).traits ?? [])[0];
    expect(t).toBeTruthy();
    expect(t.name).toBe('Chain of Broken Oaths');
    // it used to print "gains Temporary Hit Points" — a promise with no number
    expect(String(t.effect).match(/\{dmg\}/g) ?? []).toHaveLength(2);
    expect(t.effect).toMatch(/gains \{dmg\} Temporary Hit Points/);
    expect(t.effect).not.toMatch(/gains Temporary Hit Points/);
  });

  // THIS ROW IS NOW ACCEPTED, not refused (owner's ruling, 2026-11-17). Refusing it traded a blank
  // number for a missing ability: the sheet shipped with no shield-wall row at all, which is what
  // Vashka's GM typed. A bonus to AC, to attack rolls or to saving throws is filled with a flat 2.
  test('Dress the Line is ACCEPTED, with a number where the token stood', () => {
    const body = seatAnswer('vashka', /\+\{dmg\} bonus/);
    expect(body).toBeTruthy();
    const p = parseAuthorResponse(body, {});
    const row = (p.traits ?? []).find((t) => t.name === 'Dress the Line');
    expect(row).toBeTruthy();
    expect((p.refused ?? []).map((r) => r.name)).not.toContain('Dress the Line');
    expect(row.effect).toMatch(/a \+2 bonus to its AC/);
    expect(row.effect).not.toMatch(/\{dmg\}/);
    expect(row.effect).not.toMatch(/a \+ bonus/);
  });

  test('a bonus to anything else is still refused, on the same recorded answer', () => {
    const body = seatAnswer('vashka', /\+\{dmg\} bonus/);
    // the one word changed: the engine can state +2 to AC and cannot state a bonus to damage
    const p = parseAuthorResponse(body.replace(/bonus to its AC/g, 'bonus to its damage rolls'), {});
    expect((p.traits ?? []).map((t) => t.name)).not.toContain('Dress the Line');
    const refused = (p.refused ?? []).find((r) => r.name === 'Dress the Line');
    expect(refused).toBeTruthy();
    expect(refused.why).toMatch(/written as a bonus/);
  });
});

describe('the rule itself', () => {
  test('it keeps a token where a quantity is gained or damage is dealt', () => {
    for (const eff of ['gains {dmg} Temporary Hit Points', 'takes {dmg} Fire damage', 'deals an extra {dmg} Fire damage', 'regains {dmg} Hit Points']) {
      expect(stripUnplacedDmg(eff)).toContain('{dmg}');
    }
  });

  test('it drops a token that stands where no damage is dealt', () => {
    expect(stripUnplacedDmg('granting it {dmg} or a defensive benefit')).not.toContain('{dmg}');
  });

  test('"gains" cannot match inside "regains"', () => {
    // both keep their token, but for their own reason — the alternation is anchored with \b
    expect(stripUnplacedDmg('regains {dmg} Hit Points')).toContain('{dmg}');
    expect(stripUnplacedDmg('bargains {dmg} away')).not.toContain('{dmg}');
  });

  test('a bonus is recognised wherever it is written', () => {
    expect(dmgWrittenAsABonus('a +{dmg} bonus to its AC')).toBe(true);
    expect(dmgWrittenAsABonus('a {dmg} bonus')).toBe(true);
    expect(dmgWrittenAsABonus('takes {dmg} Fire damage')).toBe(false);
  });
});

describe('a bonus this engine can state is filled, and no other', () => {
  test.each([
    ['its AC', 'a +{dmg} bonus to its AC', 'a +2 bonus to its AC'],
    ['AC, no article', 'a +{dmg} bonus to AC', 'a +2 bonus to AC'],
    ['Armor Class', 'a +{dmg} bonus to Armor Class', 'a +2 bonus to Armor Class'],
    ['attack rolls', 'a +{dmg} bonus to its attack rolls', 'a +2 bonus to its attack rolls'],
    ['saving throws', 'a +{dmg} bonus to saving throws', 'a +2 bonus to saving throws'],
    ['no plus sign', 'a {dmg} bonus to its AC', 'a +2 bonus to its AC'],
  ])('%s is filled with a flat 2', (_label, before, after) => {
    expect(fillBonusDmg(before)).toBe(after);
  });

  test.each([
    'a +{dmg} bonus to its damage rolls',
    'a +{dmg} bonus to its Speed',
    'a +{dmg} bonus to Wisdom (Perception) checks',
    'a +{dmg} bonus to its Hit Point maximum',
  ])('%s is left exactly as it is, so the refusal still sees it', (text) => {
    expect(fillBonusDmg(text)).toBe(text);
    expect(dmgWrittenAsABonus(fillBonusDmg(text))).toBe(true);
  });

  test('a token that is not a bonus is untouched', () => {
    for (const t of ['takes {dmg} Fire damage', 'gains {dmg} Temporary Hit Points', '']) {
      expect(fillBonusDmg(t)).toBe(t);
    }
  });

  test('the fill is flat — the same number at CR 1 and CR 24', () => {
    // it is a constant, not a function of anything: a shield is +2 at every CR
    expect(fillBonusDmg('a +{dmg} bonus to its AC')).toBe(fillBonusDmg('a +{dmg} bonus to its AC'));
    expect(fillBonusDmg('a +{dmg} bonus to its AC')).toContain('+2');
  });

  test("last round's two cases keep their behaviour", () => {
    // priced as dice, not as a flat bonus
    const thp = parseAuthorResponse(JSON.stringify({ traits: [{ clause: 'c', name: 'R', trigger: 'While it is still',
      effect: 'the hound gains {dmg} Temporary Hit Points', condition_relation: 'none', heals: false, mechanics: 1,
      quantities: 1, passive_effect: 'defense' }] }), {});
    expect(thp.traits[0].effect).toContain('{dmg}');   // the landing prices it, not this
    expect(thp.traits[0].effect).not.toMatch(/\+2/);
  });
});
