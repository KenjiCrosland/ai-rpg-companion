// A CLAUSE THE CHASSIS ALREADY ANSWERS IS NOT AN ASK (owner's ruling, 2026-11-11: "if it's already
// answered by the chassis then the request for a row should be dropped in the pipeline — this
// should never hit the repair").
//
// The engine's half of that is two things: the DECLARED-field table that says a chassis row serves
// the ask, and the credit that records it on the carrier so nothing downstream still sees an open
// ask AND nothing goes dark. The second half is the real import here — `creditAnsweredClauses` is
// the same helper the seat and the repair drive, so a spec that re-implemented it would pass while
// the pipeline shipped the duplicate.
import { creditAnsweredClauses } from '@/tools/statblock-generator/reskin/generate.mjs';

// the table, mirrored from the call site: enum -> declared field. Two pairs, approved row by row.
const CHASSIS_ANSWERS = {
  grapple: ['imposes', (e) => [].concat(e.imposes ?? []).includes('Grappled')],
  swallow: ['engulf_engine', (e) => e.engulf_engine === true],
};
const bite = () => ({ name: 'Bite', imposes: ['Grappled', 'Restrained'], text: '*Melee Attack Roll:* +6, reach 5 ft. 12 (2d8 + 3) Piercing damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 13).' });
const swallow = () => ({ name: 'Swallow', rules: true, engulf_engine: true, imposes: ['Blinded', 'Restrained'], text: 'The creature swallows one Medium or smaller creature it is grappling.' });
const clause = (text, askMechanic) => ({ text, handed: text, kind: 'mechanical', askMechanic });

// the drop, as the call site performs it
const drop = (rows, clauses) => {
  const chassisRows = rows.filter((e) => e && !e.authored && !e.template && !e.seed && !e.library && !e.freeRow);
  const credited = [];
  for (const c of clauses) {
    const pair = CHASSIS_ANSWERS[c.askMechanic];
    if (!pair) continue;
    const carrier = chassisRows.find(pair[1]);
    if (!carrier) continue;
    credited.push(...creditAnsweredClauses([{ clause: c.text, row: carrier.name }], rows, [c]));
  }
  // what the idea call, the seats and the repair all read afterwards
  const open = clauses.filter((c) => !rows.some((e) => e.clause === c.text || (e.answersAlso ?? []).includes(c.text)));
  return { credited, open };
};

describe('the ask is dropped where the chassis already answers it', () => {
  test('a grapple ask lands on the bite that already grapples, and leaves the open list', () => {
    const rows = [bite()];
    const { credited, open } = drop(rows, [clause('drags fishermen under', 'grapple')]);
    expect(credited).toHaveLength(1);
    expect(credited[0].row.name).toBe('Bite');
    expect(rows[0].clause).toBe('drags fishermen under');   // the receipt: the GM's words on the row that serves them
    expect(open).toEqual([]);                                // no idea anchors, no seat opens, no repair sees it
  });

  test('a swallow ask lands on the engulf engine', () => {
    const rows = [bite(), swallow()];
    const { credited, open } = drop(rows, [clause('swallows caravans whole', 'swallow')]);
    expect(credited[0].row.name).toBe('Swallow');
    expect(open).toEqual([]);
  });

  // the reverted 2026-11-10 gate closed the clause with no receipt; the owner's objection was the
  // darkness, not the upstream decision. The credit IS the difference.
  test('nothing goes dark — the carrier records the clause it answers', () => {
    const rows = [bite()];
    drop(rows, [clause('drags fishermen under', 'grapple')]);
    expect(rows[0].answersAlso).toContain('drags fishermen under');
  });

  test('with no such row on the sheet the ask is handed on unchanged', () => {
    const plain = [{ name: 'Bite', imposes: ['Prone'], text: '*Melee Attack Roll:* +6, reach 5 ft. 12 (2d8 + 3) Piercing damage.' }];
    const { credited, open } = drop(plain, [clause('drags fishermen under', 'grapple')]);
    expect(credited).toEqual([]);
    expect(open).toHaveLength(1);
  });

  // THE ROW A WRITER ADDED MUST NEVER ANSWER THE CLAUSE IT DUPLICATED: crediting the cone pull for
  // the drag it was wrongly written for would hide the defect instead of preventing it.
  test('an authored or template row does not count as the chassis', () => {
    for (const mark of [{ authored: true }, { template: 'obstacle-pull' }, { seed: 'x' }, { library: true }, { freeRow: true }]) {
      const rows = [{ name: 'Mire Haul', imposes: ['Grappled'], text: 'pulled 15 feet', ...mark }];
      expect(drop(rows, [clause('drags fishermen under', 'grapple')]).credited).toEqual([]);
    }
  });

  // only the two pairs the owner approved: a bite's Restrained is not a web, and a Frightened rider
  // is not the whole of a fear ask
  test('an ask outside the table is never dropped', () => {
    const rows = [{ name: 'Bite', imposes: ['Restrained', 'Frightened'], text: 'x' }];
    for (const m of ['snare', 'fear', 'charm', 'shove']) {
      expect(drop(rows, [clause('webs its prey', m)]).open).toHaveLength(1);
    }
  });

  test('a clause already credited elsewhere is not credited twice', () => {
    const rows = [bite()];
    const c = clause('drags fishermen under', 'grapple');
    drop(rows, [c]);
    const before = [...rows[0].answersAlso];
    drop(rows, [c]);
    expect(rows[0].answersAlso).toEqual(before);
  });
});
