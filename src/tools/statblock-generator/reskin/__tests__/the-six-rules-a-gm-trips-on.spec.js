/**
 * THE SIX RULES FOR WHAT A GM TRIPS ON (owner, 2026-11-20).
 *
 * The forty passed every check the engine had and still held four to six sheets a GM would trip
 * on. They were found by reading forty sheets, which does not scale. Each of the day's faults is a
 * pattern on the FINISHED sheet, so the finished sheet can be read for it.
 *
 * Each rule is tested in BOTH directions — it fires on a small sheet built to hold the fault, and
 * is silent on the same sheet with the fault removed — and the whole set is run over print, where
 * a rule that fires is wrong or print is the exception.
 */
import { lintSheet } from '../sheet-lints.mjs';
import srd from '@/data/srd52-monsters.json';

const hits = (sheet, rule) => lintSheet(sheet).filter((h) => h.rule === rule);
const sheetOf = (rows) => ({ name: 'Test', sections: rows });
const HORN = { name: 'Horn', text: '*Melee Attack Roll:* +7, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage.' };
const TENDRIL = { name: 'Tendril', text: '*Melee Attack Roll:* +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14).' };

describe('citation-gate-mismatch — s20', () => {
  const sheet = (cite, rowName) => sheetOf({ Actions: [
    { name: 'Multiattack', text: `The leviathan makes two Flukes attacks. It can replace one attack with a use of ${cite}.` },
    { name: 'Flukes', text: '*Melee Attack Roll:* +11, reach 15 ft. 21 (3d8 + 8) Bludgeoning damage.' },
    { name: rowName, text: '*Strength Saving Throw*: DC 19, each creature in a 60-foot Line. *Failure:* 18 (4d8) Thunder damage.' },
  ] });
  test('fires when the citation carries a gate the row lost — in the lettered form', () => {
    expect(hits(sheet('(A) Gravewake (Recharge 5-6) or (B) Spellcasting', 'Gravewake'), 'citation-gate-mismatch')).toHaveLength(1);
  });
  test('and is silent once the citation reads as the row is named', () => {
    expect(hits(sheet('(A) Gravewake or (B) Spellcasting', 'Gravewake'), 'citation-gate-mismatch')).toHaveLength(0);
  });
});

describe('deafened-alone — s01', () => {
  const aura = (text) => sheetOf({ Traits: [{ name: 'Rime-Stiffened Aura', text }] });
  test('fires when the whole payload is Deafened', () => {
    expect(hits(aura('*Constitution Saving Throw*: DC 13, any creature that starts its turn in a 5-foot Emanation. *Failure:* The target has the Deafened condition until the start of its next turn.'), 'deafened-alone')).toHaveLength(1);
  });
  test('and is silent when Deafened rides on damage, or carries print\'s own consequence', () => {
    expect(hits(aura('*Constitution Saving Throw*: DC 13, each creature in a 15-foot Cone. *Failure:* 14 (4d6) Thunder damage, and the target has the Deafened condition.'), 'deafened-alone')).toHaveLength(0);
    expect(hits(aura('*Wisdom Saving Throw*: DC 10, one creature. *Failure:* The target has the Deafened condition. While Deafened, the target also has Disadvantage on attack rolls.'), 'deafened-alone')).toHaveLength(0);
  });
});

describe('rider-without-an-attack — s26', () => {
  const trait = (text) => sheetOf({ Traits: [{ name: 'Spiteful Curse', text }] });
  test("fires on a rider's body standing alone as a trait", () => {
    expect(hits(trait('If the target is a creature and isn\'t already Poisoned by this creature, it is subjected to the following effect. *Constitution Saving Throw*: DC 14. *Failure:* The target has the Poisoned condition.'), 'rider-without-an-attack')).toHaveLength(1);
  });
  test('and is silent when the row says at whom, or is the attack itself', () => {
    expect(hits(trait('*Constitution Saving Throw*: DC 14, each creature in a 10-foot Emanation. *Failure:* The target has the Poisoned condition.'), 'rider-without-an-attack')).toHaveLength(0);
    expect(hits(sheetOf({ Actions: [TENDRIL] }), 'rider-without-an-attack')).toHaveLength(0);
  });
});

describe('strike-adds-nothing — s35, s36', () => {
  const strike = (cond) => sheetOf({ Actions: [TENDRIL, {
    name: 'Granite Manacle', strike: true,
    text: `*Melee Attack Roll:* +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a creature, it is subjected to the following effect. *Strength Saving Throw*: DC 13. *Failure:* The target has the ${cond} condition.`,
  }] });
  test("fires when the save hands out what the host already applies", () => {
    expect(hits(strike('Grappled'), 'strike-adds-nothing')).toHaveLength(1);
  });
  test('and is silent when the strike adds a condition the host does not apply', () => {
    expect(hits(strike('Prone'), 'strike-adds-nothing')).toHaveLength(0);
  });
});

describe('stock-template-name — s18, s24', () => {
  test("fires on a row wearing its template's default name", () => {
    expect(hits(sheetOf({ Actions: [{ name: 'Ruinous Curse', text: '*Charisma Saving Throw:* DC 19, one creature within 60 feet. *Failure:* 24 (7d6) Necrotic damage.' }] }), 'stock-template-name')).toHaveLength(1);
  });
  test('and is silent on a name of the creature\'s own', () => {
    expect(hits(sheetOf({ Actions: [{ name: 'Backwards Name', text: '*Wisdom Saving Throw*: DC 14, one creature within 60 feet. *Failure:* 19 (3d12) Necrotic damage.' }] }), 'stock-template-name')).toHaveLength(0);
  });
});

describe('two-recharge-rows — s31', () => {
  const two = (secondName) => sheetOf({ Actions: [
    { name: 'Thunder Breath (Recharge 5-6)', text: '*Constitution Saving Throw*: DC 15, each creature in a 15-foot Cone. *Failure:* 42 (12d6) Thunder damage.' },
    { name: secondName, text: '*Constitution Saving Throw*: DC 15, each creature in a 30-foot Emanation. *Failure:* The target has the Stunned condition.' },
  ] });
  test('fires on two Recharge rows, neither a strike', () => {
    const h = hits(two('Shockwave Wings (Recharge 5-6)'), 'two-recharge-rows');
    expect(h).toHaveLength(1);
    expect(h[0].message).toMatch(/neither is a strike/);
  });
  test('and is silent on one Recharge row', () => {
    expect(hits(two('Shockwave Wings'), 'two-recharge-rows')).toHaveLength(0);
  });
  test('a usage limit that is not a Recharge does not count — Legendary Resistance is not a nova', () => {
    const s = two('Shockwave Wings');
    s.sections.Traits = [{ name: 'Legendary Resistance (3/Day)', text: 'If the creature fails a saving throw, it can choose to succeed instead.' }];
    expect(hits(s, 'two-recharge-rows')).toHaveLength(0);
  });
});

describe('and none of the eight fires on a printed creature', () => {
  // THE EIGHT THIS INSTRUMENT COMPRISES. A rule that fires on a printed creature is wrong, or
  // print is the exception and the report says which. Writing this found one of each: my
  // `deafened-alone` fired on the Swarm of Ravens' Cacophony, whose Deafened carries "While
  // Deafened, the target also has Disadvantage…" — print making the condition matter, which is
  // exactly what the Dire Wolf's bare aura does not do, so the rule reads for that consequence now.
  //
  // The older `at-will-inline` rule fires on 7 printed blocks (the ancient dragons, the Cultist
  // Fanatic, the Green Hag, the Mummy Lord). That is not this instrument's and is not touched
  // here; it is in the report for the owner.
  const EIGHT = ['uncited-replacement-row', 'ungated-turn-denial', 'citation-gate-mismatch', 'deafened-alone',
    'rider-without-an-attack', 'strike-adds-nothing', 'stock-template-name', 'two-recharge-rows'];

  test('all 329 printed blocks are silent under all eight', () => {
    const found = [];
    let read = 0;
    for (const m of srd) {
      if (!m?.sections) continue;
      read += 1;
      const marked = { ...m, sections: Object.fromEntries(Object.entries(m.sections).map(([s, rows]) => [s, rows.map((r) => ({ ...r, print: true }))])) };
      for (const h of lintSheet(marked)) if (EIGHT.includes(h.rule)) found.push(`${m.name} — ${h.rule}: ${h.message.slice(0, 80)}`);
    }
    expect(read).toBeGreaterThan(300);                       // the corpus is present
    expect(found).toEqual([]);
  });
});

describe('strike-adds-nothing reads what the save hands out', () => {
  const RUBBLE_LASH = { name: 'Rubble Lash', text: '*Melee Attack Roll:* +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.' };
  const derived = (saveCondition, record) => ({ name: 'Scree Buckle', sections: { Actions: [RUBBLE_LASH, {
    name: 'Scree Buckle', strike: true, strikeHost: 'Rubble Lash', ...(record ? { imposes: record } : {}),
    text: `${RUBBLE_LASH.text} If the target is a creature, it is subjected to the following effect. *Strength Saving Throw*: DC 14. *Failure:* The target has the ${saveCondition} condition.`,
  }] } });

  test('s06: the host grapples and the save knocks Prone — silent', () => {
    expect(hits(derived('Prone', 'Prone'), 'strike-adds-nothing')).toHaveLength(0);
    expect(hits(derived('Prone'), 'strike-adds-nothing')).toHaveLength(0);   // and with no record, off the text
  });

  test('and it still fires when the save hands out what the host applies', () => {
    expect(hits(derived('Grappled', 'Grappled'), 'strike-adds-nothing')).toHaveLength(1);
    expect(hits(derived('Grappled'), 'strike-adds-nothing')).toHaveLength(1);
  });
});
