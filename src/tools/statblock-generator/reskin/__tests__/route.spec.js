import { LINES, buildRoutePrompt, validateRouteResponse, chooseLine, evidenceIn, familyFor, shelfCoverage, lineIdOf } from '../route.mjs';
import { pickDonor } from '../scale.mjs';

describe('the shelf', () => {
  test('every donor line is on the shelf and every shelf id has a donor', () => {
    expect(shelfCoverage()).toEqual({ missingFromShelf: [], missingDonor: [] });
  });
  test('every shelf id resolves to a donor of its own family and style through pickDonor', () => {
    for (const l of LINES) {
      const d = pickDonor(8, l.style, l.family);
      expect(d.archetypes).toContain(l.family);
      expect(d.style ?? null).toBe(l.style);
    }
  });
  test('the prompt lists the whole shelf, or only the user-fixed family', () => {
    const all = buildRoutePrompt('a brass bull that charges', { cr: 5 });
    for (const l of LINES) expect(all).toContain(`- ${l.id} —`);
    const brute = buildRoutePrompt('a brass bull that charges', { cr: 5, menuRole: 'brute' });
    expect(brute).toContain('- brute-charger —');
    expect(brute).not.toContain('- lurker-trap —');
    const ctl = buildRoutePrompt('a hag', { cr: 5, menuRole: 'controller' });
    expect(ctl).toContain('- caster-binder —');
    expect(ctl).not.toContain('- brute —');
    expect(familyFor('artillery')).toBe('caster');
  });
});

describe('evidenceIn', () => {
  test('a light paraphrase of the input passes; an invented quote or an empty one fails', () => {
    const t = 'a tar-mouthed toad the size of a cart that drags cattle into the bog';
    expect(evidenceIn('drags cattle into the bog', t)).toBe(true);
    expect(evidenceIn('tar-mouthed toad', t)).toBe(true);
    expect(evidenceIn('regenerates its wounds', t)).toBe(false);
    expect(evidenceIn('', t)).toBe(false);
    expect(evidenceIn('a', t)).toBe(false);
  });
});

describe('lineIdOf', () => {
  test('a decorated or re-cased id still resolves; nonsense does not', () => {
    expect(lineIdOf('brute-grappler (ooze?)')).toBe('brute-grappler');
    expect(lineIdOf('Brute Grappler')).toBe('brute-grappler');
    expect(lineIdOf('brute')).toBe('brute');
    expect(lineIdOf('the brute line')).toBe('brute');
    expect(lineIdOf('grappler')).toBeNull();
    expect(lineIdOf('')).toBeNull();
  });
});

describe('validateRouteResponse', () => {
  test('needs one pick on the shelf; tolerates the rest', () => {
    expect(validateRouteResponse(JSON.stringify({ picks: [{ line: 'brute-charger', because: 'x' }] }))).toBe(true);
    expect(validateRouteResponse(JSON.stringify({ picks: [{ line: 'grappler' }] }))).toBe(false);
    expect(validateRouteResponse('not json')).toBe(false);
    expect(validateRouteResponse('```json\n{"picks":[{"line":"ooze","because":"x"}]}\n```')).toBe(true);
  });
});

describe('chooseLine', () => {
  const bull = 'a brass bull that charges down anyone who enters its pen';
  test('the top quoted pick wins and its line implies its engine', () => {
    const r = chooseLine({ picks: [{ line: 'brute-charger', because: 'charges down anyone' }, { line: 'brute-juggernaut', because: 'a brass bull' }], creature_type: 'Construct' }, { text: bull });
    expect(r).toMatchObject({ line: 'brute-charger', archetype: 'brute', role: 'brute', style: 'charger', body: null, mechanics: [], resolvedType: 'Construct' });
    const g = chooseLine({ picks: [{ line: 'brute-grappler', because: 'folds shut around whoever steps inside' }] }, { text: 'a rusted iron maiden that folds shut around whoever steps inside' });
    expect(g.mechanics).toEqual(['grapple', 'engulf']);
  });
  test('an unquotable pick falls to the NEXT pick, not to a plain line', () => {
    const r = chooseLine({ picks: [{ line: 'brute-regenerator', because: 'knits its wounds shut' }, { line: 'brute-charger', because: 'charges down anyone who enters' }] }, { text: bull });
    expect(r.line).toBe('brute-charger');
    expect(r.notes[0]).toMatch(/quote not found/);
  });
  test('a living juggernaut or warden is vetoed to the next pick', () => {
    const r = chooseLine({ picks: [{ line: 'brute-juggernaut', because: 'a swamp ogre' }, { line: 'brute', because: 'a swamp ogre' }], creature_type: 'Giant' }, { text: 'a swamp ogre that stands its ground' });
    expect(r.line).toBe('brute');
    const w = chooseLine({ picks: [{ line: 'defender-warden', because: 'sergeant sworn to guard the gate' }], creature_type: 'Humanoid' }, { text: 'a sergeant sworn to guard the gate' });
    expect(w.line).toBe('defender');
    expect(w.notes[0]).toMatch(/not a made or risen guardian/);
  });
  test('when every pick fails the family of the first known pick survives as its plain line', () => {
    const r = chooseLine({ picks: [{ line: 'lurker-trap', because: 'invented phrase here' }] }, { text: bull });
    expect(r).toMatchObject({ line: 'lurker', archetype: 'lurker', style: null });
    expect(r.notes.at(-1)).toMatch(/fell to lurker's plain line/);
    expect(chooseLine({ picks: [{ line: 'ninja', because: 'x' }] }, { text: bull }).line).toBeNull();
    expect(chooseLine(null, { text: bull }).line).toBeNull();
  });
  test('a user-fixed role keeps picks inside its family; artillery and controller are the caster family with their menu role recorded', () => {
    const r = chooseLine({ picks: [{ line: 'brute-charger', because: 'charges down anyone' }, { line: 'caster-binder', because: 'anyone who enters its pen' }] }, { text: bull, menuRole: 'controller' });
    expect(r).toMatchObject({ line: 'caster-binder', archetype: 'caster', role: 'controller', style: 'binder' });
    const a = chooseLine({ picks: [{ line: 'caster', because: 'brass bull' }] }, { text: bull, menuRole: 'artillery' });
    expect(a).toMatchObject({ archetype: 'caster', role: 'artillery', style: null });
    const none = chooseLine({ picks: [{ line: 'brute-charger', because: 'charges down anyone' }] }, { text: bull, menuRole: 'lurker' });
    expect(none).toMatchObject({ line: 'lurker', archetype: 'lurker' });
  });
  test('body lines carry the body and no role; dragon implies breath', () => {
    const r = chooseLine({ picks: [{ line: 'swarm', because: 'a swarm of grave beetles' }] }, { text: 'a swarm of grave beetles that strips a body to bone' });
    expect(r).toMatchObject({ archetype: 'swarm', body: 'swarm', role: null });
    const d = chooseLine({ picks: [{ line: 'dragon', because: 'a young brass dragon' }] }, { text: 'a young brass dragon of the dunes' });
    expect(d.mechanics).toEqual(['breath']);
  });
  test('extras need their own quote; the line\'s implied engine is never duplicated', () => {
    const r = chooseLine({
      picks: [{ line: 'brute-grappler', because: 'drags cattle into the bog' }],
      extras: [{ mechanic: 'grapple', because: 'drags cattle' }, { mechanic: 'gaze', because: 'petrifying stare' }, { mechanic: 'snare', because: 'tar-mouthed' }],
    }, { text: 'a tar-mouthed toad that drags cattle into the bog' });
    expect(r.mechanics).toEqual(['grapple', 'engulf', 'snare']);
    expect(r.notes).toContainEqual(expect.stringMatching(/extra gaze: quote not found/));
  });
});
