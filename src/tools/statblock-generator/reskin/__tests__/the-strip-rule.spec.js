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
import { parseAuthorResponse, stripUnplacedDmg, dmgWrittenAsABonus } from '../author.mjs';

const TAPE = path.resolve(__dirname, 'fixtures/recordings/sweep-2026-11-16T19-31-43');
const seatAnswer = (sheet, carrying) => {
  const f = fs.readdirSync(TAPE).find((x) => x.startsWith(`${sheet}-`) && x.endsWith('.json'));
  for (const c of JSON.parse(fs.readFileSync(path.join(TAPE, f), 'utf8')).calls) {
    if (!String(c.prompt).startsWith('You are writing ONE ability')) continue;
    const body = JSON.parse(c.response).choices[0].message.content;
    if (carrying.test(body)) return body;
  }
  return null;
};

describe('the recorded answers the strip was written for', () => {
  test('Chain of Broken Oaths keeps BOTH tokens in its effect', () => {
    const body = seatAnswer('17', /gains \{dmg\} Temporary Hit Points/);
    expect(body).toBeTruthy();
    const t = (parseAuthorResponse(body, {}).traits ?? [])[0];
    expect(t).toBeTruthy();
    expect(t.name).toBe('Chain of Broken Oaths');
    // it used to print "gains Temporary Hit Points" — a promise with no number
    expect(String(t.effect).match(/\{dmg\}/g) ?? []).toHaveLength(2);
    expect(t.effect).toMatch(/gains \{dmg\} Temporary Hit Points/);
    expect(t.effect).not.toMatch(/gains Temporary Hit Points/);
  });

  test('Dress the Line comes back REFUSED, not accepted with a hole', () => {
    const body = seatAnswer('23', /\+\{dmg\} bonus/);
    expect(body).toBeTruthy();
    const p = parseAuthorResponse(body, {});
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
