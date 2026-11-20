/**
 * A STRIKE ADDS SOMETHING TO THE ATTACK IT CLONES (fault 5, owner 2026-11-20).
 *
 * Two sheets of the forty spent their replacement clause on a row strictly worse than the attack
 * it replaces:
 *
 *   s35  Tendril         — on a HIT: Grappled, and while Grappled, Restrained
 *        Wellwater Drag  — on a hit, THEN a DC 13 Strength save: Grappled, and pulled 5 feet
 *   s36  Gray Coil       — on a HIT: Grappled, and while Grappled, Restrained
 *        Granite Manacle — on a hit, THEN a DC 13 Strength save: Grappled, and nothing else
 *
 * The refusal for this already existed — "the row re-imposes a condition this sheet's own attack
 * already applies" — and read `form.f.imposes`, which a strike does not carry: its condition is on
 * `condition`. So no strike ever reached it.
 *
 * The rows are quoted from baseline-2026-11-20 as they shipped.
 */
import { strikeAddsNothing, imposedConditions } from '../author.mjs';

const TENDRIL = { name: 'Tendril', text: '*Melee Attack Roll:* +6, reach 5 ft. 16 (3d8 + 3) Bludgeoning damage. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 14). While Grappled, the target has the Restrained condition.' };
const HORN = { name: 'Horn', text: '*Melee Attack Roll:* +7, reach 10 ft. 12 (2d6 + 5) Piercing damage.' };

describe('the predicate the refusal and the lint both read', () => {
  test('the host is present and does apply the condition — the subject of the test', () => {
    expect(imposedConditions(TENDRIL)).toContain('Grappled');
  });

  test('s36 GRANITE MANACLE: the save hands out what the host already applies', () => {
    expect(strikeAddsNothing({ attack: 'Tendril', condition: 'Grappled' }, TENDRIL)).toBe(true);
  });

  test('s35 WELLWATER DRAG: a forced movement does not rescue it', () => {
    // 5 feet of pull does not buy back an attack that grappled outright, and print has no row
    // that trades a certainty for a saving throw at the same damage.
    expect(strikeAddsNothing({ attack: 'Tendril', condition: 'Grappled', movement: 'pulled up to 5 feet' }, TENDRIL)).toBe(true);
  });

  test('a condition the host does NOT apply is fine', () => {
    expect(strikeAddsNothing({ attack: 'Tendril', condition: 'Prone' }, TENDRIL)).toBe(false);
    expect(strikeAddsNothing({ attack: 'Horn', condition: 'Stunned' }, HORN)).toBe(false);
  });

  test('and it reads the HOST, not any attack on the sheet', () => {
    // the drake's Horn grapples nothing, so a Grappled strike on Horn is a real addition even
    // though some other row on the sheet might grapple
    expect(strikeAddsNothing({ attack: 'Horn', condition: 'Grappled' }, HORN)).toBe(false);
  });

  test('a strike with no condition at all is not caught by this rule', () => {
    expect(strikeAddsNothing({ attack: 'Tendril', condition: null }, TENDRIL)).toBe(false);
    expect(strikeAddsNothing({ attack: 'Tendril' }, TENDRIL)).toBe(false);
  });
});
