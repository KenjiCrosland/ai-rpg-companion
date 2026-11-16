/**
 * THE VERB GATE STANDS DOWN ON DECLARED AGREEMENT, NOT ONLY ON A KEYWORD.
 *
 * Before the fit call is made, `fitSeat` checks whether any template on the menu
 * shares a key word with the concept or the idea; if none does it records a miss
 * and spends no call. That gate was written when a key word was the ONLY bridge
 * from the GM's text to a shape ("the fit would be a shape fit by construction").
 * It predates every declared field added since: `orderByStamps`, the resolve
 * call's `asked_mechanic`, and the idea call's `family`.
 *
 * Measured over the 7 tens of 2026-10-26: the gate fired 11 times — the largest
 * named loss cause in the run — and **8 of those 11 had a template on the menu
 * whose declared trigger AND effect already agreed with the idea's own tags**,
 * with 11 to 14 candidates offered. One also had a grammar for its family. The
 * ranking function's `matched` is `[...conceptKeywords, ...ideaKeywords]`; the
 * declared mechanic only ever affected the SORT. So the gate was discarding the
 * engine's own data.
 *
 * `gateStandsDown` is that predicate. No extra call is spent: the fit call was
 * already going to happen on these seats and the gate was preventing it.
 */
import { gateStandsDown, TEMPLATE_BY_ID, GRAMMARS } from '@/tools/statblock-generator/reskin/templates.mjs';

const byId = (ids) => ids.map((id) => TEMPLATE_BY_ID.get(id)).filter(Boolean);

// the five shapes that were gated out of a trait/always/defense seat, verbatim
// from the run traces, alongside the rest of that menu
const DEFENCE_MENU = byId(['spider-climb', 'phobia', 'bloodied-fury', 'shielded-mind', 'relic-object', 'undead-fortitude', 'evasion', 'relentless-pursuit', 'bound', 'berserk', 'assassinate', 'truth-aura']);

describe('the gate reads declared data, not only key words', () => {
  it('stands down when a template fires and acts the way the idea says', () => {
    const r = gateStandsDown(DEFENCE_MENU, { section: 'trait', trigger: 'always', effect: 'defense' });
    expect(r.down).toBe(true);
    expect(r.because).toMatch(/stamps/);
    expect(r.ids).toEqual(expect.arrayContaining(['bloodied-fury', 'shielded-mind', 'undead-fortitude', 'evasion']));
  });

  it('the other three real seats from the run stand down too', () => {
    expect(gateStandsDown(byId(['phobia', 'berserk', 'spider-climb']), { section: 'trait', trigger: 'always', effect: 'condition' }).down).toBe(true);
    expect(gateStandsDown(byId(['assassinate', 'spider-climb']), { section: 'trait', trigger: 'always', effect: 'damage' }).down).toBe(true);
    expect(gateStandsDown(byId(['stunning-strike', 'pounce', 'charge']), { section: 'rider', trigger: 'on_hit', effect: 'condition' }).down).toBe(true);
  });

  it('stands down for the declared mechanic the resolve call named, with no stamp match', () => {
    const t = TEMPLATE_BY_ID.get('swallow');
    const r = gateStandsDown([t], { section: 'trait', trigger: 'always', effect: 'defense' }, t.mechanic);
    expect(r.down).toBe(true);
    expect(r.because).toMatch(/mechanic/);
  });

  // A FAMILY WITH A GRAMMAR NO LONGER GETS ITS OWN ARM (2026-10-26). Its options
  // are composed into CANDIDATES and put on the pool, so a match arrives through
  // the stamps arm like any template's — one path, not two.
  it('a bare grammar is no warrant; its candidate on the pool is', () => {
    const idea = { section: 'trait', trigger: 'on_being_hit', effect: 'movement', family: 'body-reaction' };
    expect(gateStandsDown(byId(['spider-climb']), idea).down).toBe(false);
    const { composedCandidates } = require('@/tools/statblock-generator/reskin/templates.mjs');
    const pool = [...byId(['spider-climb']), ...composedCandidates(idea, {})];
    const r = gateStandsDown(pool, idea);
    expect(r.down).toBe(true);
    expect(r.because).toMatch(/stamps/);
  });

  it('HOLDS where nothing declared agrees — the three genuine shelf gaps', () => {
    // action/always/movement with no movement template on the menu: these three
    // were honest misses in the run and must stay misses
    const r = gateStandsDown(byId(['phobia', 'bloodied-fury', 'assassinate', 'truth-aura']), { section: 'action', trigger: 'always', effect: 'movement' });
    expect(r.down).toBe(false);
  });

  it('holds on an empty menu, and on an idea with no tags', () => {
    expect(gateStandsDown([], { section: 'trait', trigger: 'always', effect: 'damage' }).down).toBe(false);
    expect(gateStandsDown(DEFENCE_MENU, null).down).toBe(false);
  });

  it('requires BOTH cells to agree — a trigger match alone is not a warrant', () => {
    // spider-climb is always/movement; an always/damage idea must not be rescued by it
    const r = gateStandsDown(byId(['spider-climb', 'relentless-pursuit', 'bound']), { section: 'trait', trigger: 'always', effect: 'damage' });
    expect(r.down).toBe(false);
  });
});
