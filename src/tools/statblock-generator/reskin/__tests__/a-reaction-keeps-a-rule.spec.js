/**
 * A REACTION'S SUCCESS SENTENCE: DROPPED WHEN IT SAYS NOTHING, KEPT WHEN IT CARRIES A RULE
 * (Fable, 2026-11-25, narrowing the order of 11-24).
 *
 * The Oathbound Bulwark shipped a FRAGMENT — "…straight away from Bulwark. Prone and is not
 * pushed." — because `success-no-effect` matched a PREFIX of its success sentence and cut there.
 * The first fix for it suppressed every seat-written Reaction's success sentence; that was too
 * wide. Two of the forty's six carry a real rule, and a row the model wrote is not silently
 * dropped. The pattern is what needed fixing, and it now drops a sentence only when every clause
 * in it negates.
 */
import { generateReskin } from '../generate.mjs';
import { applyCorrections } from '../../format-2024/generate.mjs';

const keysOf = (p, field) => {
  const i = p.indexOf(`"${field}": {`);
  if (i < 0) return [];
  return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]);
};

const CONCEPT = 'a sentinel of black iron that guards a ward';
const seatWritingAReactionWhoseSuccessSays = (success, extra = {}) => ({
  attacks: [], saves: [], traits: [], strikes: [], riders: [], auras: [], crossRef: null, unplaced: [],
  reactions: [{
    clause: 'guards a ward', name: 'Oathkeeper’s Backhand',
    trigger: 'A hostile creature moves within 10 feet of the ward',
    response: 'the sentinel swings the back of its fist',
    save: { stat: 'Strength', target: 'the triggering creature', condition: 'Prone', movement: 'pushed up to 10 feet', success, ...extra },
  }],
});

const build = async (seat) => {
  let cached = null;
  const monster = await generateReskin({
    mechanics: [], archetype: 'defender', concept: CONCEPT, userConcept: CONCEPT, cr: 11,
    path: { path: 'homebrew', print_body: null, relation: null, class: null },
  }, async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (/"hold_shape": \{"shape"/.test(p)) {
      return JSON.stringify({ shoots: { yes: false, because: '' }, is_a_swarm: { yes: false, because: '' },
        hold_shape: { shape: 'none', because: '' }, casts: { yes: false, because: '', implied_by_kind: false } });
    }
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      return JSON.stringify({ action: { idea: 'It answers a step toward its ward with the back of its fist.', section: 'reaction', trigger: 'on_being_hit', effect: 'condition', family: 'sentinel' } });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a backhand' });
    }
    if (p.startsWith('You are writing ONE ability')) return JSON.stringify(seat);
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      cached = JSON.stringify({ name: 'Oathbound Bulwark', type: 'Construct', size: 'Huge', alignment: 'Lawful Neutral',
        senses: 'blindsight 60 ft.', languages: 'Common', renames: Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`])),
        damage_types: {}, conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'none', wildcard: '' });
    }
    return cached;
  });
  for (const es of Object.values(monster.sections ?? {})) {
    for (const e of es ?? []) if (/Backhand/.test(String(e.name ?? ''))) return String(e.text ?? '');
  }
  return null;
};

jest.setTimeout(60000);

describe('a success sentence that says nothing happened', () => {
  let text;
  beforeAll(async () => { text = await build(seatWritingAReactionWhoseSuccessSays('The creature is not knocked prone and is not pushed.')); });

  it('the Reaction is on the sheet — the premise this rests on', () => {
    expect(text).not.toBeNull();
    expect(text).toMatch(/\*Failure:\*/);
  });

  it('leaves no fragment of itself behind', () => {
    // what the Bulwark actually shipped, twice, in both printings
    expect(text).not.toMatch(/Prone and is not pushed/);
    expect(text).not.toMatch(/is not knocked/);
  });

  it('ends on its failure clause, with nothing after it', () => {
    // The name in that clause is covered by measurement on the real s25, not here: this stub's
    // guessed short form and its settled one are the same string, so no assertion on the name
    // could go red. On the forty, reverting `settledInline()` to the guess brings "from Bulwark"
    // straight back — recorded in the round's report.
    expect(text.trim()).toMatch(/straight away from \S+\.$/);
    expect(text).not.toMatch(/\*Success:\*/);
  });
});

describe('a success sentence that carries a rule', () => {
  let text;
  beforeAll(async () => { text = await build(seatWritingAReactionWhoseSuccessSays('The creature is immune to this effect for the next hour.')); });

  it('is still on the finished Reaction', () => {
    expect(text).not.toBeNull();
    expect(text).toMatch(/immune to this effect for the next hour/);
  });
});

describe('the pass itself, on the four sentences', () => {
  // `applyCorrections` runs a text fix only when a finding names its rule.
  const FINDING = [{ rule: 'success-no-effect', severity: 'correctable' }];
  const through = (success) => {
    const row = { name: 'Row', text: `*Failure:* The target has the Prone condition. *Success:* ${success}` };
    const out = applyCorrections({ sections: { Reactions: [row] } }, FINDING, { chassis: {} });
    return out.sections.Reactions[0].text;
  };

  it('drops one whose every clause negates', () => {
    expect(through('The creature is not knocked prone and is not pushed.')).not.toMatch(/Success/);
  });

  it('keeps one that negates and then deals half damage', () => {
    expect(through('The target is not Frightened but takes half damage.')).toMatch(/takes half damage/);
  });

  it('keeps one that negates and then grants an immunity', () => {
    expect(through('The target is not Restrained, and it is immune to this for 24 hours.')).toMatch(/immune to this for 24 hours/);
  });

  it('keeps one that never negates at all', () => {
    expect(through('The creature is immune to this effect for the next hour.')).toMatch(/immune to this effect/);
  });
});
