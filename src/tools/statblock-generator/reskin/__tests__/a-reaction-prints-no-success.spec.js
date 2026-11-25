/**
 * A SEAT-WRITTEN REACTION PRINTS NO SUCCESS SENTENCE (Fable, 2026-11-24).
 *
 * The Oathbound Bulwark's seat wrote `success: "The creature is not knocked prone and is not
 * pushed."` on its Reaction. A Reaction's save deals no damage by the owner's hold of 18 November,
 * so its success can only restate the failure in the negative — and the sheet shipped a BROKEN
 * FRAGMENT of it: "…straight away from Bulwark. Prone and is not pushed."
 *
 * Verified red with the change taken out: restoring `success: r.save.success ?? null` puts the
 * success sentence back on the finished sheet.
 */
import { generateReskin } from '../generate.mjs';

const keysOf = (p, field) => {
  const i = p.indexOf(`"${field}": {`);
  if (i < 0) return [];
  return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]);
};
const CONCEPT = 'a sentinel of black iron that guards a ward';
const A_REACTION_WITH_A_SUCCESS = {
  attacks: [], saves: [], traits: [], strikes: [], riders: [], auras: [], crossRef: null, unplaced: [],
  reactions: [{
    clause: 'guards a ward', name: "Oathkeeper's Backhand",
    trigger: 'A hostile creature moves within 10 feet of the ward',
    response: 'the sentinel swings the back of its fist',
    save: {
      stat: 'Strength', target: 'the triggering creature', condition: 'Prone',
      movement: 'pushed up to 10 feet',
      success: 'The creature is not knocked prone and is not pushed.',
    },
  }],
};

const build = async () => {
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
    if (p.startsWith('You are writing ONE ability')) return JSON.stringify(A_REACTION_WITH_A_SUCCESS);
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      cached = JSON.stringify({ name: 'Oathbound Bulwark', type: 'Construct', size: 'Huge', alignment: 'Lawful Neutral',
        senses: 'blindsight 60 ft.', languages: 'Common', renames: Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`])),
        damage_types: {}, conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'none', wildcard: '' });
    }
    return cached;
  });
  return { monster };
};

const reactionText = (m) => {
  for (const es of Object.values(m.sections ?? {})) {
    for (const e of es ?? []) if (/Backhand/.test(String(e.name ?? ''))) return String(e.text ?? '');
  }
  return null;
};

jest.setTimeout(60000);

describe("a seat-written Reaction's success sentence", () => {
  let text;
  beforeAll(async () => { ({ monster: text } = await build()); text = reactionText(text); });

  it('the Reaction is on the sheet — the premise this rests on', () => {
    expect(text).not.toBeNull();
  });

  it('it has no Success clause', () => {
    expect(text).not.toMatch(/\*Success:\*/);
  });

  it('and no words from the success sentence survive anywhere in it', () => {
    expect(text).not.toMatch(/is not knocked/);
    expect(text).not.toMatch(/is not pushed/);
    // the fragment the Bulwark actually shipped
    expect(text).not.toMatch(/Prone and is not pushed/);
  });

  it('it ends on its failure clause', () => {
    expect(text.trim()).toMatch(/\.$/);
    expect(text).toMatch(/\*Failure:\*/);
  });
});
