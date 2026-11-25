/**
 * HALF A HIT, ON A FINISHED SHEET (Fable, 2026-11-24).
 *
 * Every other test of this rung calls `valueCheck` directly. This one runs a whole creature through
 * `generateReskin` and reads the printed row, so it covers the wiring as well as the rung: the
 * attack type read off the sheet, the row reaching the ladder, the mark surviving the rename.
 */
import { generateReskin } from '../generate.mjs';

const keysOf = (p, field) => {
  const i = p.indexOf(`"${field}": {`);
  if (i < 0) return [];
  return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]);
};
const CONCEPT = 'a duelist who batters a single foe off balance';
const ONE_SOFT_SAVE_AND_AN_ATTACK = {
  attacks: [{ clause: 'batters', name: 'Riposting Blade', reach: 5, damage_type: 'slashing', targets: 1 }],
  saves: [{
    clause: 'off balance', name: 'Wrongfoot', stat: 'Dexterity', target: 'one creature the duelist can see within 30 feet',
    condition: 'Prone', damage: null, success: null,
  }],
  traits: [], strikes: [], riders: [], auras: [], reactions: [], crossRef: null, unplaced: [],
};

const build = async () => {
  let cached = null;
  return generateReskin({
    mechanics: [], archetype: 'defender', concept: CONCEPT, userConcept: CONCEPT, cr: 9,
    path: { path: 'homebrew', print_body: null, relation: null, class: null },
  }, async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (/"hold_shape": \{"shape"/.test(p)) {
      return JSON.stringify({ shoots: { yes: false, because: '' }, is_a_swarm: { yes: false, because: '' },
        hold_shape: { shape: 'none', because: '' }, casts: { yes: false, because: '', implied_by_kind: false } });
    }
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      return JSON.stringify({ action: { idea: 'It wrongfoots a single opponent and puts them on the floor.', section: 'action', trigger: 'on_action', effect: 'condition', family: 'duelist' } });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a wrongfooting' });
    }
    if (p.startsWith('You are writing ONE ability')) return JSON.stringify(ONE_SOFT_SAVE_AND_AN_ATTACK);
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      cached = JSON.stringify({ name: 'Bladed Provocateur', type: 'Humanoid', size: 'Medium', alignment: 'Neutral',
        senses: '', languages: 'Common', renames: Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`])),
        damage_types: {}, conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'none', wildcard: '' });
    }
    return cached;
  });
};

const rowsOf = (m) => Object.values(m.sections ?? {}).flat().filter(Boolean);
jest.setTimeout(60000);

describe('a soft one-creature row on a finished sheet', () => {
  let widened; let attackType;
  beforeAll(async () => {
    const monster = await build();
    const rows = rowsOf(monster);
    widened = rows.find((e) => /\*Failure:\*/.test(String(e.text ?? '')));
    const atk = rows.find((e) => /Attack Roll:/.test(String(e.text ?? '')));
    attackType = String(atk?.text ?? '').match(/\) (\w+) damage/)?.[1] ?? null;
  });

  it('the sheet has the save row and an attack to price it against — the premise', () => {
    expect(widened).toBeDefined();
    expect(String(widened.text)).toMatch(/\*Failure:\*/);
    expect(attackType).not.toBeNull();
  });

  it("its failure leads with damage in the attack row's own type", () => {
    expect(String(widened.text)).toMatch(
      new RegExp(`\\*Failure:\\*\\s*\\d+ \\(\\d+d\\d+(?: [+-] \\d+)?\\) ${attackType} damage, and `),
    );
  });

  it('and it is still one creature, not a cone', () => {
    expect(String(widened.text)).not.toMatch(/\d+-foot (?:cone|line|radius|cube|emanation)/i);
    expect(String(widened.text)).not.toMatch(/Each creature/i);
  });
});
