/**
 * THE ASK LANDS: A MECHANIC PER CLAUSE, A LEAD PER SEAT
 * (plans/the-ask-lands-2026-10-27.md — priority 1 from the owner's GM read).
 *
 * A GM who types two things gets the first and loses the second. Measured over
 * the four tens of 2026-10-26/27 (`scripts/signature-measures/ask-lands.mjs`):
 * the sheet's declared ask lands on **6 of 18** sheets, and on the sheets with
 * two or more mechanical clauses, **0 of 4**.
 *
 * The case, from save10-2026-10-27T00-36-54 #01 — "a brass tyrant whose furnace
 * breath terrifies and whose hammer finds the terrified":
 *
 *   clauses: "furnace breath terrifies" -> [asked: condition]
 *          | "whose hammer finds the terrified" -> [asked: attack]
 *   declared mechanic leads the menu: action — fear: escalating-dread, terror-pulse
 *
 * `condition-payoff` WAS on the hammer seat's menu (the Meshrin menu-widening
 * held), but the sheet's one `asked_mechanic` is `fear`, read off the BREATH, and
 * tier 0 of `orderByStamps` put two fear templates ahead of it on the HAMMER's
 * seat. The call refused them — correctly, for a hammer — and landed on filler.
 * The hammer's own ask was never declared: `escalate` is in ASKED_MECHANICS and
 * maps to `condition-payoff`, but there is one slot per sheet and the breath
 * took it. The clause call tags each clause with a SHAPE (`attack`), which is
 * true of a hammer and useless for choosing a payoff.
 */
import { groundedClauses } from '@/tools/statblock-generator/reskin/generate.mjs';
import { leadForSeat, orderByStamps, TEMPLATE_BY_ID, MECHANIC } from '@/tools/statblock-generator/reskin/templates.mjs';

const CONCEPT = 'a brass tyrant whose furnace breath terrifies and whose hammer finds the terrified';
const clauseAnswer = (over = {}) => [
  { text: 'a brass tyrant whose furnace breath terrifies', kind: 'mechanical', shape: 'condition', mechanic: 'fear', mechanic_quote: 'furnace breath terrifies' },
  { text: 'whose hammer finds the terrified', kind: 'mechanical', shape: 'attack', mechanic: 'escalate', mechanic_quote: 'hammer finds the terrified', ...over },
];

describe('the clause call answers a mechanic per clause', () => {
  it('stamps askMechanic when the word is in the list and the quote is the GM\'s', () => {
    const rec = groundedClauses(clauseAnswer(), CONCEPT);
    const byText = (frag) => rec.find((c) => String(c.text).includes(frag));
    expect(byText('furnace breath').askMechanic).toBe('fear');
    expect(byText('hammer finds').askMechanic).toBe('escalate');
  });

  it('refuses a mechanic outside the closed list', () => {
    const rec = groundedClauses(clauseAnswer({ mechanic: 'teleports-everyone' }), CONCEPT);
    expect(rec.find((c) => String(c.text).includes('hammer')).askMechanic).toBeUndefined();
  });

  it('drops a mechanic whose quote is not the GM\'s words, like the other asked fields', () => {
    // judged by the same `vetQuote` the trigger and limit use, so the quote has
    // to be genuinely foreign — one that merely reuses a word the GM typed
    // ("the hammer glows with holy fire") vouches, exactly as it would for those
    // two fields. That leniency is the 1b ruling, not a gap in this field.
    const rec = groundedClauses(clauseAnswer({ mechanic_quote: 'it sprouts wings and ascends to the moon' }), CONCEPT);
    expect(rec.find((c) => String(c.text).includes('hammer')).askMechanic).toBeUndefined();
    const lenient = groundedClauses(clauseAnswer({ mechanic_quote: 'the hammer glows with holy fire' }), CONCEPT);
    expect(lenient.find((c) => String(c.text).includes('hammer')).askMechanic).toBe('escalate');
  });

  it('a clause that is its own quote keeps the mechanic (1b)', () => {
    const rec = groundedClauses(clauseAnswer({ mechanic_quote: '' }), CONCEPT);
    expect(rec.find((c) => String(c.text).includes('hammer')).askMechanic).toBe('escalate');
  });

  it('a descriptive clause declares no mechanic', () => {
    const rec = groundedClauses([{ text: 'a brass tyrant', kind: 'descriptive', mechanic: 'fear', mechanic_quote: 'a brass tyrant' }], 'a brass tyrant');
    expect(rec[0].askMechanic).toBeUndefined();
  });
});

describe('each seat is led by its own clause', () => {
  const records = () => groundedClauses(clauseAnswer(), CONCEPT);
  const seats = { action: 'furnace breath that terrifies', trait: 'hammer that finds the terrified' };

  it('the action seat takes the breath\'s mechanic, the trait seat the hammer\'s', () => {
    const rec = records();
    expect(leadForSeat(seats.action, rec, 'zone')).toBe('fear');
    expect(leadForSeat(seats.trait, rec, 'zone')).toBe('escalate');
  });

  it('falls back to the sheet\'s mechanic when the seat has no clause of its own', () => {
    expect(leadForSeat('some element nobody typed', records(), 'zone')).toBe('zone');
    expect(leadForSeat(null, records(), 'zone')).toBe('zone');
    expect(leadForSeat('whatever', [], 'zone')).toBe('zone');
  });

  it('falls back when the matched clause declared no mechanic', () => {
    const rec = groundedClauses([{ text: 'whose hammer finds the terrified', kind: 'mechanical', shape: 'attack' }], CONCEPT);
    expect(leadForSeat('hammer that finds the terrified', rec, 'fear')).toBe('fear');
  });
});

describe('the lead changes what the hammer seat is shown first', () => {
  // #01's real action pool, from the trace
  const POOL = ['condition-payoff', 'escalating-dread', 'terror-pulse', 'isolation', 'exploiter'].map((id) => TEMPLATE_BY_ID.get(id)).filter(Boolean);
  const HAMMER_IDEA = { section: 'action', trigger: 'on_hit', effect: 'damage' };

  it('led by the hammer\'s own "escalate", the payoff comes first', () => {
    expect(orderByStamps(POOL, HAMMER_IDEA, 'escalate')[0].id).toBe('condition-payoff');
    expect(MECHANIC.escalate).toContain('condition-payoff');
  });

  it('led by the breath\'s "fear" — the bug — a fear template comes first', () => {
    expect(['escalating-dread', 'terror-pulse']).toContain(orderByStamps(POOL, HAMMER_IDEA, 'fear')[0].id);
  });
});
