/**
 * A STRIKE REACHES THE FINISHED SHEET (fault 1 and fault 5, owner 2026-11-20 and 21).
 *
 * Both faults were WIRING. The seat wrote the row and a later pass deleted it; the redundancy
 * refusal sat in a block the strike never reached. Every unit test passed over both, which is how
 * the suite stayed green with fault 1 open through three commits that each claimed to fix it.
 *
 * These drive `generateReskin` with a hand-written stub routed on each call's opening words, as
 * `the-seat-gets-one-more-try.spec.js` has since 17 November. No tape, no prompt assertion: the
 * stub answers by call, and every expectation reads the finished sheet or counts asks.
 *
 * VERIFIED TO FAIL WITHOUT THEIR FIXES, which is the only reason to keep them:
 *   `outsidePrintsAttackList` out of the `extraRows` melee site -> "it is in Actions" and "its text
 *     up to the save clause is the host's" go red, and the non-print case stays GREEN — the split
 *     that existed before the fix
 *   the host derivation out -> "its text up to the save clause is the host's" goes red alone
 */
import { generateReskin } from '../generate.mjs';

const CONCEPT = 'a skeleton with a greatsword';
const IDEA = 'The line-holder sweeps its blade low through a knot of legs.';
/** the attack rows the seat prompt lists, read from THE SHEET SO FAR — routing, not an assertion */
const attacksOffered = (p) => [...p.matchAll(/\*\*\*([^*]+?)\.\*\*\* \*Melee Attack Roll/g)].map((m) => m[1].trim());
/** does the attack the prompt offers already apply a condition on a hit? */
const hostGrapples = (p) => p.split('\n').some((l) => /\*Melee Attack Roll/.test(l) && /Grappled condition/.test(l));
const keysOf = (p, field) => { const i = p.indexOf(`"${field}": {`); if (i < 0) return []; return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]); };

/** s38's own recorded answer: a strike on the Greatsword whose save knocks Prone */
const A_STRIKE = (over = {}) => ({
  attacks: [], saves: [], traits: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [],
  strikes: [{ clause: CONCEPT, name: 'Leg-Cutting Sweep', attack: 'Greatsword', save: 'Strength', condition: 'Prone', movement: null, curse: false, ...over }],
});
/** a trait the parser accepts, for the second ask in the refusal test */
const A_PLAIN_TRAIT = {
  attacks: [], saves: [], strikes: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [],
  traits: [{ clause: CONCEPT, name: 'Bone-Deep Habit', trigger: 'While the line-holder holds a weapon in both hands',
    effect: 'it does not suffer Disadvantage on attack rolls while Prone', imposes: null, condition_relation: 'none',
    acts: null, heals: false, mechanics: 1, quantities: 0, passive_effect: 'defense' }],
};

const build = async (answers, { path, mechanics, holds, cr, concept } = {}) => {
  const seatPrompts = [];
  let cached = null;
  let hostHeld = false;
  const monster = await generateReskin({
    mechanics: mechanics ?? [], archetype: 'brute', concept: concept ?? CONCEPT, userConcept: concept ?? CONCEPT, cr: cr ?? 6,
    path: path ?? { path: 'twist', print_body: 'Skeleton', relation: 'is', class: null },
  }, async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (/"hold_shape": \{"shape"/.test(p)) {
      // THE ROUTE CALL. A chassis attack grapples because the route call says the creature HOLDS,
      // so a redundancy case needs that answer rather than a flag on the options.
      return JSON.stringify({ shoots: { yes: false, because: '' }, is_a_swarm: { yes: false, because: '' },
        hold_shape: { shape: holds ?? 'none', because: holds ? 'it drags what it catches' : '' },
        casts: { yes: false, because: '', implied_by_kind: false } });
    }
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      return JSON.stringify({ action: { idea: IDEA, section: 'action', trigger: 'on_hit', effect: 'condition', family: 'none' } });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a low sweep through a knot of legs' });
    }
    if (p.startsWith('You are writing ONE ability')) {
      seatPrompts.push(p);
      if (hostGrapples(p)) hostHeld = true;
      const a = answers[Math.min(seatPrompts.length - 1, answers.length - 1)];
      return JSON.stringify(typeof a === 'function' ? a(p) : a);
    }
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      const renames = Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`]));
      cached = JSON.stringify({ name: 'Gravebound Line-Holder', type: 'Undead', size: 'Medium', alignment: 'Lawful Evil',
        senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: {},
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'bone', wildcard: '' });
    }
    return cached;
  });
  return { monster, seatAsks: seatPrompts.length, hostHeld };
};

const rows = (m) => Object.values(m.sections ?? {}).flat().filter((e) => e?.name);
const named = (m, n) => rows(m).find((e) => String(e.name).replace(/ \(.*\)$/, '') === n);
const ma = (m) => rows(m).find((e) => /^Multiattack/.test(String(e.name)));
/**
 * THE ROW'S OWN DECLARATION, NOT ITS NAME. `name follows content` renames a strike whose name
 * promises something the row does not deliver — "Reeling Snare" became "Tentacle Slam" — so a test
 * that looks for the name it was written under reads a rename as a deletion, which is the very
 * confusion this round is about.
 */
const strikeOf = (m) => rows(m).find((e) => e.strike);

describe('a strike survives on a printed body', () => {
  test('it is in Actions, and Multiattack offers it in place of one attack', async () => {
    const { monster } = await build([A_STRIKE()]);
    const strike = named(monster, 'Leg-Cutting Sweep');
    expect(strike).toBeDefined();                                        // the subject is present
    expect(monster.sections.Actions.map((e) => String(e.name).replace(/ \(.*\)$/, ''))).toContain('Leg-Cutting Sweep');
    expect(ma(monster).text).toMatch(/It can replace one attack with a use of Leg-Cutting Sweep/);
  }, 30000);

  test('and on a body that is not print\'s, so the pair would have split before the fix', async () => {
    const { monster } = await build([A_STRIKE()], { path: { path: 'homebrew', print_body: null, relation: null, class: null } });
    expect(named(monster, 'Leg-Cutting Sweep')).toBeDefined();
  }, 30000);
});

describe('a strike points at its attack and does not copy it', () => {
  test("its text names the host and holds no attack roll of its own", async () => {
    const { monster } = await build([A_STRIKE()]);
    const strike = strikeOf(monster);
    const host = named(monster, 'Greatsword');
    expect([strike, host].every(Boolean)).toBe(true);                    // both present
    expect(strike.text).toMatch(/makes one Greatsword attack/);
    expect(strike.text).not.toMatch(/Attack Roll/);
    expect(strike.text).not.toMatch(/\d+ \(\d+d\d+/);
  }, 30000);

  test("and the host's own row is untouched — the same as when the seat declines", async () => {
    const withStrike = await build([A_STRIKE()]);
    const without = await build([A_PLAIN_TRAIT]);
    expect(named(withStrike.monster, 'Greatsword').text).toBe(named(without.monster, 'Greatsword').text);
  }, 30000);

  test('A SHEET WITH NO MULTIATTACK TAKES NO STRIKE — the exchange is the whole limit', async () => {
    // the Dire Wolf's case: print gives it one melee row and no Multiattack
    // The attack must be named as the SEAT sees it — print canon renames it afterwards — so the
    // answer reads the name the prompt offers, or the strike is refused for naming a row that is
    // not there and the test passes for the wrong reason.
    const onOffered = (p) => ({ attacks: [], saves: [], traits: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [],
      strikes: [{ clause: CONCEPT, name: 'Flank the Herd', attack: attacksOffered(p)[0], save: 'Constitution', condition: 'Frightened', movement: null, curse: false }] });
    const { monster } = await build([onOffered], {
      concept: 'a dire wolf with a frost-rimed hide', cr: 1,
      path: { path: 'twist', print_body: 'Dire Wolf', relation: 'is', class: null },
    });
    // print gives the wolf one melee row and no Multiattack, and removes the chassis's AFTER the
    // seat — so this is settled at ship, not at the seat
    expect(rows(monster).some((e) => /^Multiattack/.test(String(e.name)))).toBe(false); // the premise
    expect(strikeOf(monster)).toBeUndefined();
  }, 30000);

  test('A STRIKE THAT TAKES A TURN AWAY IS REFUSED, and the seat is asked again', async () => {
    const { monster, seatAsks } = await build([A_STRIKE({ condition: 'Stunned' }), A_PLAIN_TRAIT]);
    expect(strikeOf(monster)).toBeUndefined();
    expect(seatAsks).toBe(2);
  }, 30000);

  test("and on a printed body it names the host as the FINISHED sheet has it, after the rename", async () => {
    const { monster } = await build([A_STRIKE()]);
    const strike = strikeOf(monster);
    const host = rows(monster).find((e) => String(e.name).replace(/ \(.*\)$/, '') === strike.strikeHost);
    expect(host).toBeDefined();                                          // the name it prints resolves
    expect(strike.text).toContain(`makes one ${strike.strikeHost} attack`);
  }, 30000);
});

describe('a redundant strike is refused and asked again', () => {
  /**
   * The host has to grapple AT SEAT TIME, which a printed body does not: on a twist path the host
   * is still the chassis's own row and print's text — grapple and all — is stamped on later. That
   * is s06's whole story, and it is why this case needs a chassis that holds from the start.
   */
  // s35's own shape, which is the one that puts a grappling row in front of the seat. On a twist
  // path the host is still the chassis's row and print's grapple is stamped on later, so a printed
  // body cannot make this case — which is s06's whole story.
  const GRAPPLER = { mechanics: ['grapple', 'engulf'], holds: 'grip', cr: 5, concept: 'the thing in the well',
    path: { path: 'homebrew', print_body: null, relation: null, class: null } };
  const onOffered = (condition) => (p) => ({
    attacks: [], saves: [], traits: [], reactions: [], riders: [], auras: [], crossRef: null, unplaced: [],
    strikes: [{ clause: 'the thing in the well', name: 'Reeling Snare', attack: attacksOffered(p)[0], save: 'Strength', condition, movement: null, curse: false }],
  });

  test('a save that hands out what the host already applies: no strike, and the seat was asked twice', async () => {
    const { monster, seatAsks, hostHeld } = await build([onOffered('Grappled'), A_PLAIN_TRAIT], GRAPPLER);
    expect(hostHeld).toBe(true);                                         // the host does grapple at seat time
    expect(strikeOf(monster)).toBeUndefined();
    expect(seatAsks).toBe(2);
  }, 30000);

  test('and a condition the host does NOT apply lands on the first ask', async () => {
    const { monster, seatAsks } = await build([onOffered('Prone')], GRAPPLER);
    expect(strikeOf(monster)).toBeDefined();
    expect(seatAsks).toBe(1);
  }, 30000);
});

/**
 * THE STORED FINDINGS ARE THE FINISHED SHEET'S (owner, 2026-11-21).
 *
 * The sheet lints read the finished sheet, and three passes ran after their findings were stored:
 * the audit port and its renames, the citation sync, and the derivation of a strike from its host.
 * s06 shipped "strike-differs-from-host: Actions/Scree Snare" with no Scree Snare on it.
 */
describe('a sheet carries the findings of the sheet it is', () => {
  const { lintSheet } = require('../sheet-lints.mjs');
  const { SHEET_LINTS } = require('../sheet-lints.mjs');
  const sheetRules = new Set(SHEET_LINTS.map((l) => l.rule));
  const ruleOf = (line) => (/^([a-z0-9-]+):/.exec(String(line)) ?? [])[1];

  test('every sheet-lint finding stored on the sheet is one the finished sheet still has', async () => {
    const { monster } = await build([A_STRIKE()]);
    const stored = (monster.lint_findings ?? []).filter((f) => sheetRules.has(ruleOf(f)));
    const live = lintSheet(monster).map((h) => `${h.rule}: ${h.message}`);
    expect(stored).toEqual(live);
  }, 30000);

  test('and that holds on the body where the derivation rewrites the strike', async () => {
    const { monster } = await build([A_STRIKE()], { path: { path: 'twist', print_body: 'Skeleton', relation: 'is', class: null } });
    const stored = (monster.lint_findings ?? []).filter((f) => sheetRules.has(ruleOf(f)));
    expect(stored).toEqual(lintSheet(monster).map((h) => `${h.rule}: ${h.message}`));
  }, 30000);
});

/**
 * A DROP REMOVES THE ROW (item 2, owner 2026-11-21). Two forms land early — the strike and the
 * aura — and a drop that only set `actionT = null` left them on the sheet while the trace said
 * they had gone. s06 shipped "signature dropped by the floor: Scree Snare" with Scree Snare on the
 * sheet and cited by its Multiattack.
 */
describe('a form that lands early and is then dropped is not on the sheet', () => {
  test('the strike lands early, and when a drop takes it the row and its citation go', async () => {
    // the name-collision drop is the one that can be provoked from here: the strike is given the
    // name its own host already carries, which `uniqueRowName` refuses with no template name to
    // fall back on.
    const { monster } = await build([A_STRIKE({ name: 'Greatsword' })]);
    const ma = rows(monster).find((e) => /^Multiattack/.test(String(e.name)));
    expect(strikeOf(monster)).toBeUndefined();
    expect(rows(monster).filter((e) => String(e.name) === 'Greatsword')).toHaveLength(1); // the host, once
    expect(String(ma?.text ?? '')).not.toMatch(/replace one attack with a use of/);
  }, 30000);
});

/**
 * AN IDEA ABOUT DAMAGE LANDS ON A ROW THAT DEALS SOME (item 3, owner 2026-11-21). His Knife Ball
 * shipped Blade Barrage — a 30-foot cone that pushes and knocks Prone, in an attack's place, with
 * no damage: "Blade barrage should deal damage. They are blades."
 */
describe('an at-will area swap written for a damage idea deals damage', () => {
  const { priceAreaSwapAtHalfAHit } = require('../generate.mjs');
  const sheet = (ideaEffect) => ({
    Actions: [
      { name: 'Multiattack', text: 'The ball makes two Blade attacks. It can replace one attack with a use of Blade Barrage.' },
      { name: 'Blade', text: '*Melee Attack Roll:* +7, reach 5 ft. 18 (4d6 + 4) Slashing damage.' },
      { name: 'Blade Barrage', ideaEffect, text: '*Dexterity Saving Throw*: DC 15, each creature in a 30-foot Cone. *Failure:* The target is pushed up to 10 feet and has the Prone condition.' },
    ],
  });
  const barrage = (s) => s.Actions.find((r) => r.name === 'Blade Barrage');

  test('it is given half of one whole hit of the attack it replaces, in that attack\'s type', () => {
    const s = sheet('damage');
    expect(barrage(s).text).not.toMatch(/\d+ \(\d+d\d+/);          // the defect is present
    priceAreaSwapAtHalfAHit(s);
    expect(barrage(s).text).toMatch(/\d+ \(\d+d\d+[^)]*\) Slashing damage/);
    expect(barrage(s).text).toMatch(/\*Success:\* Half damage only\./);
    expect(barrage(s).text).toMatch(/Prone condition/);            // and keeps what it did
  });

  test('and the same pick under an idea stamped condition deals none', () => {
    const s = sheet('condition');
    priceAreaSwapAtHalfAHit(s);
    expect(barrage(s).text).not.toMatch(/\d+ \(\d+d\d+/);
  });

  test('a row with no idea stamp is untouched', () => {
    const s = sheet(undefined);
    priceAreaSwapAtHalfAHit(s);
    expect(barrage(s).text).not.toMatch(/\d+ \(\d+d\d+/);
  });
});
