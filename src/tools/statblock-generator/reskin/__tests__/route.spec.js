import { LINES, buildRoutePrompt, validateRouteResponse, chooseLine, evidenceIn, familyFor, shelfCoverage, lineIdOf, verbLines, verbHits, keyClass } from '../route.mjs';
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

describe('the shelf rules', () => {
  test('a drowned dead thing that pulls the living is told it is a phantom, not a grappler', () => {
    const p = buildRoutePrompt('a drowned wife who pulls anyone who follows her down into the surf', { cr: 7 });
    expect(p).toMatch(/drowned dead thing that pulls, drags, or drowns the living is lurker-phantom, never brute-grappler/);
    expect(p).toMatch(/a ghost that pulls you under is lurker-phantom/);
  });
});

describe('the verb decides the seat', () => {
  test('a glass ox that CHARGES is a charger however made it is; a goat that vomits is not a hurler; a hound that surfaces beneath is a lurker, not a trap', () => {
    expect(verbLines('a glass ox forged for a parade that charges the loudest voice')).toContain('brute-charger');
    const ox = chooseLine({ picks: [{ line: 'brute-juggernaut', because: 'a glass ox forged for a parade' }], creature_type: 'Construct' }, { text: 'a glass ox forged for a parade that charges the loudest voice in the square' });
    expect(ox.line).toBe('brute-charger');
    expect(ox.notes.join(' | ')).toMatch(/VERB outranks the noun/); // the primary line's key-and-class note now closes the list
    const hound = chooseLine({ picks: [{ line: 'lurker-trap', because: 'surfaces beneath sleepers' }], creature_type: 'Beast' }, { text: 'a burrowing mole-hound that hunts by tremor and surfaces beneath sleepers' });
    expect(hound.line).toBe('lurker');
    const goat = chooseLine({ picks: [{ line: 'skirmisher-hurler', because: 'vomits a choking cloud' }], creature_type: 'Beast' }, { text: 'a carrion goat that eats grave-flowers and vomits a choking cloud when cornered' });
    expect(goat.line).toBe('skirmisher'); // an emission verb is a signature's business; the chassis is the plain line
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
    expect(w.line).toBe('defender-leader'); // the veto falls to the family, and a SERGEANT's own rank then routes it to the leader line (2026-09-28)
    expect(w.notes[0]).toMatch(/not a made or risen guardian/);
  });
  test('when every pick fails the family of the first known pick survives as its plain line', () => {
    const r = chooseLine({ picks: [{ line: 'lurker-trap', because: 'invented phrase here' }] }, { text: bull });
    expect(r).toMatchObject({ line: 'brute-charger', archetype: 'brute', style: 'charger' }); // ranked, then the VERB: the bull charges
    expect(r.notes.some((n) => /taken on rank/.test(n))).toBe(true);
    expect(r.notes.join(' | ')).toMatch(/VERB outranks the noun/);
    const quiet = chooseLine({ picks: [{ line: 'lurker-trap', because: 'invented phrase here' }] }, { text: 'a brass ornament in a pen' });
    expect(quiet.line).toBe('lurker-trap'); // no verb in the text: the ranked pick stands
    expect(chooseLine({ picks: [{ line: 'brute-juggernaut', because: 'x' }], creature_type: 'Beast' }, { text: bull }).line).toBe('brute-charger'); // a hard veto falls to the plain line, then the VERB lifts it to the charger
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

describe('homographs in the verb table (2026-09-28): a noun is not a verb', () => {
  const { verbLines } = require('../route.mjs');
  test('"whose hide crumbles" is the noun — a rockslide never routes to the skulker line', () => {
    expect(verbLines('a ridge exile of living scree whose hide crumbles into a wake of rubble')).not.toContain('skirmisher-skulker');
    expect(verbLines('its hide is stone-hard')).not.toContain('skirmisher-skulker');
    // the verb read survives intact
    expect(verbLines('a gutter assassin that hides between lantern-flickers')).toContain('skirmisher-skulker');
    expect(verbLines('it will hide until the lamps gutter')).toContain('skirmisher-skulker');
  });
  test("a warden's charge is a person, not a rush", () => {
    expect(verbLines('a knight sworn to stand between its charge and every blade')).not.toContain('brute-charger');
    expect(verbLines('a brass bull construct that charges through market stalls')).toContain('brute-charger');
  });
  test('a noun that still names its own engine is NOT guarded — the bishop keeps its cage (goldens 2026-09-28)', () => {
    expect(verbLines('a clockwork bishop that unfolds into a cage of brass ribs around whoever it has chosen')).toContain('brute-grappler');
  });
  test('mimicking VOICES is the lure, not the Mimic (the magpie, fresh three)', () => {
    expect(verbLines('a magpie-thing that steals voices and mimics them to lure travelers off the road')).not.toContain('lurker-trap');
    // an object-mimic still routes to the trap line
    expect(verbLines('a strongroom chest that mimics the furniture until someone reaches in')).toContain('lurker-trap');
  });
});

test("a thing you climb into is a grappler: 'cooks whatever climbs in' names the engulf engine (golden 2026-09-28)", () => {
  const { verbLines } = require('../route.mjs');
  expect(verbLines("a bog witch's iron cauldron that walks on three legs and cooks whatever climbs in")).toContain('brute-grappler');
});

test("subject inversion: 'runs anyone who blocks it off the cliff' is the courier's run, not the blocker's block (blind A/B 2026-09-28)", () => {
  const { verbLines } = require('../route.mjs');
  expect(verbLines("a courier's ghost who still runs the mountain road, and runs anyone who blocks it off the cliff")).not.toContain('defender');
  expect(verbLines('a shield-bearer who blocks the bridge')).toContain('defender');
});

test("'eats sheep' is a grappler's verb (the hedge, fresh six)", () => {
  const { verbLines } = require('../route.mjs');
  expect(verbLines('a hedge that eats sheep')).toContain('brute-grappler');
});

describe('the three new lines (2026-09-28): archer, shifter, leader', () => {
  const { verbLines, LINES } = require('../route.mjs');
  const { pickDonor } = require('../scale.mjs');
  test('each line is on the shelf with a style, and its verbs route to it', () => {
    for (const id of ['skirmisher-archer', 'skirmisher-shifter', 'defender-leader']) expect(LINES.find((l) => l.id === id)?.style).toBeTruthy();
    expect(verbLines('a hobgoblin sniper who picks off torch-bearers from the ridge')).toContain('skirmisher-archer');
    expect(verbLines('a miller who turns into a boar under the moon')).toContain('skirmisher-shifter');
    expect(verbLines('an orc warlord at the head of his warband')).toContain('defender-leader');
    expect(verbLines("a lighthouse hermit-mage whose lantern beam brands whoever it touches, so her bolts find them again in the dark")).not.toContain('skirmisher-archer'); // a caster's bolts are not arrows
  });
  test('the donors draw by style at every rung', () => {
    expect(pickDonor(3, 'archer', 'skirmisher').id).toBe('skirmisher-3-archer');
    expect(pickDonor(10, 'archer', 'skirmisher').id).toBe('skirmisher-8-archer');
    expect(pickDonor(6, 'archer', 'artillery').id).toBe('skirmisher-3-archer'); // the artillery menu role draws a shooter, not a thrower
    expect(pickDonor(5, 'shifter', 'skirmisher').id).toBe('skirmisher-3-shifter');
    expect(pickDonor(9, 'leader', 'defender').id).toBe('defender-8-leader');
  });
});

describe('the new lines\' first read (critic, new-lines 2026-09-28)', () => {
  test('a print NOUN is not a line verb: "doppelganger" routes by print canon, not by the shifter\'s verb rule', () => {
    expect(verbLines('a doppelganger who wears the faces of the dead in Ash Row')).not.toContain('skirmisher-shifter');
    expect(verbLines('a miller who turns into a boar under the moon')).toContain('skirmisher-shifter');
  });
  test('a leader is print\'s Humanoid class: a Beast that "rules" is vetoed off the leader line (the crab golden)', () => {
    const r = chooseLine({ picks: [{ line: 'defender-leader', because: 'wears it and rules the wreck-fields' }, { line: 'brute-grappler', because: 'a crab the size of a longboat' }], creature_type: 'Beast' }, { text: "the drowned king's crown, a crab the size of a longboat that wears it and rules the wreck-fields" });
    expect(r.line).not.toBe('defender-leader');
    expect(r.notes.join(' ')).toMatch(/a Beast commands no troops/);
    expect(r.line).toBe('brute-grappler'); // a crab is print's grappling body (Giant Crab's Claw grapples)
    const h = chooseLine({ picks: [{ line: 'defender-leader', because: 'commands from the quarterdeck' }], creature_type: 'Humanoid' }, { text: 'a pirate queen who commands from the quarterdeck' });
    expect(h.line).toBe('defender-leader');
  });
  test('an archer shoots a named weapon: a lantern-mage whose bolts find them is vetoed off the archer line', () => {
    const t = "a lighthouse hermit-mage whose lantern beam brands whoever it lights, and her bolts find them again in the dark";
    const r = chooseLine({ picks: [{ line: 'skirmisher-archer', because: 'her bolts find them again in the dark' }, { line: 'caster-binder', because: 'lantern beam brands whoever it lights' }], creature_type: 'Humanoid' }, { text: t });
    expect(r.line).toBe('caster-binder');
    expect(r.notes.join(' ')).toMatch(/no bow, arrow or shot in the words/);
    const a = chooseLine({ picks: [{ line: 'skirmisher-archer', because: 'picks off torch-bearers' }], creature_type: 'Humanoid' }, { text: 'a hobgoblin sniper who picks off torch-bearers from the ridge with a heavy crossbow' });
    expect(a.line).toBe('skirmisher-archer');
    expect(verbLines('a goblin warchief who screams fire at will to her archers from the palisade')).not.toContain('skirmisher-archer'); // "her archers" are a leader's troops
  });
  test('key classes: a job noun never wins the override, a body noun may, and the log names the key and its class', () => {
    expect(keyClass('archers')).toBe('noun'); expect(keyClass('sergeant')).toBe('noun'); expect(keyClass('crab')).toBe('body'); expect(keyClass('werewolf')).toBe('body'); expect(keyClass('picks off')).toBe('verb');
    // a title alone: the route model's leader pick stands, and the note says why
    const w = chooseLine({ picks: [{ line: 'defender-leader', because: 'rallies the archers' }], creature_type: 'Humanoid' }, { text: 'a captain who rallies archers on the wall' });
    expect(w.line).toBe('defender-leader');
    expect(w.notes.join(' ')).toMatch(/skirmisher-archer: "archers" is a noun \(a title\), not a verb — no override/);
    // a body noun overrides, and says so as a BODY
    const c = chooseLine({ picks: [{ line: 'brute', because: 'a crab the size of a longboat' }], creature_type: 'Beast' }, { text: "the drowned king's crown, a crab the size of a longboat that wears it and rules the wreck-fields" });
    expect(c.line).toBe('brute-grappler');
    expect(c.notes.join(' ')).toMatch(/brute -> brute-grappler: the concept's BODY outranks the noun \(key "crab", class body\)/);
    // a verb overrides, and says so as a VERB with its key
    const v = chooseLine({ picks: [{ line: 'skirmisher', because: 'a miller' }], creature_type: 'Humanoid' }, { text: 'a miller who turns into a boar under the moon' });
    expect(v.line).toBe('skirmisher-shifter');
    expect(v.notes.join(' ')).toMatch(/VERB outranks the noun \(key "turns into", class verb\)/);
    expect(verbHits('a sergeant who picks off stragglers').map((h) => `${h.id}:${h.key}:${h.cls}`)).toEqual(expect.arrayContaining(['skirmisher-archer:picks off:verb', 'defender-leader:sergeant:noun']));
    // "holds the shield line" is a stand, not a grapple: the sergeant keeps the leader line by its own verbs
    const s = chooseLine({ picks: [{ line: 'defender-leader', because: 'orders a volley' }], creature_type: 'Humanoid' }, { text: 'a dwarven crossbow sergeant who orders a volley and holds the shield line' });
    expect(s.line).toBe('defender-leader');
    expect(verbLines('a dwarven crossbow sergeant who orders a volley and holds the shield line')).not.toContain('brute-grappler');
    expect(verbLines('a swamp thing that holds its prey under the water')).toContain('brute-grappler');
    // the PRIMARY line prints its key and class, or says the model read its quote
    expect(s.notes.join(' | ')).toMatch(/defender-leader: key "orders a" \(class verb\)|defender-leader: key "holds the line" \(class verb\)/);
    const t = chooseLine({ picks: [{ line: 'lurker-trap', because: 'erupts in a shockwave of grave earth around it when roused' }], creature_type: 'Undead' }, { text: 'a barrow-wight that erupts in a shockwave of grave earth around it when roused' });
    expect(t.notes.join(' | ')).toMatch(/lurker-trap: no line key in the words — the model's read of its quote/);
    // a drowned wife is a phantom by BODY: the seat is her words', not the route model's paraphrased quote
    const wife = chooseLine({ picks: [{ line: 'lurker-phantom', because: 'an incorporeal dead or spectral thing' }, { line: 'brute-grappler', because: 'pulls anyone who follows her back down' }], creature_type: 'Undead' }, { text: "a lighthouse keeper's drowned wife who still climbs the stairs each night to light the lamp, and pulls anyone who follows her back down into the surf" });
    expect(wife.line).toBe('lurker-phantom');
    expect(wife.notes.join(' | ')).toMatch(/brute-grappler -> lurker-phantom: the concept's BODY outranks the noun \(key "drowned", class body\)/);
  });
});
