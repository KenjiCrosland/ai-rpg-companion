import { LINES, buildRoutePrompt, validateRouteResponse, chooseLine, evidenceIn, familyFor, shelfCoverage, lineIdOf, verbLines, verbHits, keyClass } from '../route.mjs';
import { pickDonor } from '../scale.mjs';
import { readPhrases as readPhrasesFor } from '../lexicon.mjs';

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
    // THE VETO IS GONE AND THE CRAB STILL LANDS RIGHT (critic's hold 5,
    // 2026-10-15). A type list that read "a Beast commands no troops" dropped the
    // GM's own clause on "a death knight who leads a cavalry of the damned" — and
    // print contradicts it anyway: nine print Beasts carry an ally-affecting row,
    // because Pack Tactics is one. The crab is held by the rule that actually owns
    // this decision — its BODY outranks the noun — so the veto was redundant here
    // and wrong there. The outcome is pinned; the retired message is not.
    expect(r.notes.join(' ')).toMatch(/BODY outranks the noun/);
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
    // day-one (2026-09-30): a hermit who talks to crows is not a swarm; a kobold who sets traps is not a trap
    const hermit = chooseLine({ picks: [{ line: 'swarm', because: 'talks to crows' }], creature_type: 'Humanoid' }, { text: 'a hermit who talks to crows' });
    expect(hermit.line).toBe('skirmisher');
    expect(hermit.notes.join(' | ')).toMatch(/swarm: a swarm is a mass of many — no mass in the words/);
    expect(chooseLine({ picks: [{ line: 'swarm', because: 'a murder of crows' }], creature_type: 'Beast' }, { text: 'a murder of crows that follows a hermit' }).line).toBe('swarm');
    // 2026-11-08 — THE SWARM OF KNIFE BALLS. A thin concept is expanded before
    // routing, so `text` is the model's own identity prose while `rawText` is the
    // two words the GM typed. Neither arm of the swarm guard may read the expansion:
    // the call's quote has to land in the GM's words, and when the quote fails the
    // word table has to read the GM's words too. Both arms are replayed here on the
    // sentence that actually shipped the bug.
    const expanded = 'knife ball — a roiling mass of animated blades that rolls as one body';
    const laundered = chooseLine(
      { picks: [{ line: 'swarm', because: 'a roiling mass of animated blades' }], is_a_swarm: { yes: true, because: 'a roiling mass of animated blades' }, creature_type: 'Construct' },
      { text: expanded, rawText: 'knife ball' },
    );
    expect(laundered.body).not.toBe('swarm');
    expect(laundered.notes.join(' | ')).toMatch(/is_a_swarm refused: the call answered yes but quoted/);
    // and with no answer at all, the fallback table reads "knife ball", not the prose
    const byTable = chooseLine({ picks: [{ line: 'swarm', because: 'rolls as one body' }], creature_type: 'Construct' }, { text: expanded, rawText: 'knife ball' });
    expect(byTable.body).not.toBe('swarm');
    expect(byTable.notes.join(' | ')).toMatch(/swarm: a swarm is a mass of many — no mass in the words/);
    // WHY THE CALLER MUST PASS THE GM'S WORDS: hand the expansion in as `rawText`
    // too — the shape the pipeline actually had — and the vet checks the model
    // against its own sentence and calls it the GM's. This asserts the laundering
    // so that a caller ever passing the expansion as `rawText` again is a test failure.
    const selfEvidenced = chooseLine(
      { picks: [{ line: 'swarm', because: 'a roiling mass of animated blades' }], is_a_swarm: { yes: true, because: 'a roiling mass of animated blades' }, creature_type: 'Construct' },
      { text: expanded, rawText: expanded },
    );
    expect(selfEvidenced.body).toBe('swarm');
    expect(selfEvidenced.notes.join(' | ')).toMatch(/is_a_swarm: on the GM's own words/);
    // the GM who DOES type the mass still gets the swarm, expansion or not
    expect(chooseLine({ picks: [{ line: 'swarm', because: 'a mass of knives' }], creature_type: 'Construct' }, { text: expanded, rawText: 'a rolling mass of knives' }).body).toBe('swarm');
    const kobold = chooseLine({ picks: [{ line: 'lurker-trap', because: 'a kobold trapmaker' }], creature_type: 'Humanoid' }, { text: 'a kobold trapmaker' });
    expect(kobold.line).toBe('lurker');
    expect(kobold.notes.join(' | ')).toMatch(/lurker-trap: a Humanoid sets traps; it is not one/);
    // a shifter is named by its words; "guards the bridge" is the defender's
    const mf = chooseLine({ picks: [{ line: 'skirmisher-shifter', because: 'lost its tentacles and fights with a sword' }], creature_type: 'Aberration' }, { text: 'a mind flayer that lost its tentacles and fights with a sword' });
    expect(mf.line).not.toBe('skirmisher-shifter'); expect(mf.notes.join(' | ')).toMatch(/a shifter is named by its words/);
    expect(verbLines('a troll that guards the bridge and collects a toll')).toContain('defender');
    // a phantom has no body: a living Humanoid cultist is vetoed off the phantom seat
    const kt = chooseLine({ picks: [{ line: 'lurker-phantom', because: 'cultist of the deep' }], creature_type: 'Humanoid' }, { text: 'a fish-headed humanoid cultist of the deep who fights with net and spear' });
    expect(kt.line).not.toBe('lurker-phantom'); expect(kt.notes.join(' | ')).toMatch(/a Humanoid has a body; a phantom has none/);
    const kt2 = chooseLine({ picks: [{ line: 'skirmisher-hurler', because: 'fights with net and spear' }], creature_type: 'Humanoid' }, { text: 'a fish-headed humanoid cultist of the deep who drowns sailors and fights with net and spear' });
    expect(kt2.line).not.toBe('lurker-phantom'); // the verb override obeys the body veto too
    // an attribute inside an of-phrase modifies that noun: the drowned one is the god
    expect(verbHits('a fish-headed cultist priest of a drowned god').some((h) => h.id === 'lurker-phantom')).toBe(false);
    expect(verbHits("a lighthouse keeper's drowned wife").some((h) => h.id === 'lurker-phantom')).toBe(true);
    // a dragon is a body: a paraphrased quote on the dragon pick does not cost it the body seat
    const sd = chooseLine({ picks: [{ line: 'dragon', because: 'a true dragon — breath weapon, flight' }, { line: 'caster', because: 'breath is a rolling wall of thunder' }], creature_type: 'Dragon' }, { text: 'an adult storm dragon whose breath is a rolling wall of thunder' });
    expect(sd.line).toBe('dragon'); expect(sd.notes.join(' | ')).toMatch(/dragon: key "dragon" \(class body\)/); // the caster pick is now vetoed for carrying no magic word, so the dragon body stands without needing the override (the critic's fourth read)
    // the user's own noun outranks a pick quoted from the alias text: "kuo-toa priest" is a priest
    const pr = chooseLine({ picks: [{ line: 'skirmisher-hurler', because: 'fights with net and spear' }], creature_type: 'Humanoid' }, { text: readPhrasesFor('kuo-toa priest of a drowned god'), rawText: 'kuo-toa priest of a drowned god' });
    expect(pr.line).toBe('caster-warpriest'); expect(pr.notes.join(' | ')).toMatch(/the user's own word "priest" \(class noun\) outranks a pick quoted from the alias text/);
  });
});

describe('form-ten route reads (2026-10-01)', () => {
  test('the route call carries its own CR read; a blank form takes it in place of the dice', () => {
    expect(chooseLine({ picks: [{ line: 'skirmisher-mounted', because: 'riding a worg' }], creature_type: 'Fey', cr: '5' }, { text: 'Goblin Boss — riding a worg' }).cr).toBe('5');
    expect(chooseLine({ picks: [{ line: 'skirmisher-mounted', because: 'riding a worg' }], creature_type: 'Fey', cr: '1/2' }, { text: 'Goblin Boss — riding a worg' }).cr).toBe('1/2');
    expect(chooseLine({ picks: [{ line: 'skirmisher-mounted', because: 'riding a worg' }], creature_type: 'Fey', cr: 'high' }, { text: 'Goblin Boss — riding a worg' }).cr).toBeNull();
    expect(chooseLine({ picks: [{ line: 'skirmisher-mounted', because: 'riding a worg' }], creature_type: 'Fey' }, { text: 'Goblin Boss — riding a worg' }).cr).toBeNull();
  });
  test('"riding a worg" is the mounted seat\'s verb (it stood down for want of the word, form-ten)', () => {
    expect(verbLines('Goblin Boss — riding a worg')).toContain('skirmisher-mounted');
    const r = chooseLine({ picks: [{ line: 'skirmisher-mounted', because: 'riding a worg' }], creature_type: 'Fey' }, { text: 'Goblin Boss — riding a worg' });
    expect(r.line).toBe('skirmisher-mounted');
  });
  test('"Headless Horseman" is a rider: the placeholder example reaches the mounted seat over a phantom pick', () => {
    expect(verbLines('Headless Horseman')).toContain('skirmisher-mounted');
    const r = chooseLine({ picks: [{ line: 'lurker-phantom', because: 'Headless Horseman' }], creature_type: 'Undead' }, { text: 'Headless Horseman' });
    expect(r.line).toBe('skirmisher-mounted');
  });
});

// THE CASTER GATE HOLDS ON THE OVERRIDE TOO (critic, 2026-10-14: "the caster gate
// refused the warpriest line, then the verb override ('smites') put her back on
// it. The gate should hold."). Casting is a mechanic engine; a verb cannot
// conjure it, on the pick or on the override.
describe('the caster gate holds on the verb override', () => {
  const { chooseLine } = require('../route.mjs');
  const run = (text, quote) => chooseLine({ picks: [{ line: 'defender-leader', quote }], creature_type: 'Humanoid' }, { text });

  // OVERTURNED BY THE OWNER, 2026-10-17. This pin asserted that a crusader who
  // SMITES must not reach the divine line, because "smites" is not in
  // MAGIC_WORD. It is why Sister Elowen shipped on brute-regenerator with INT 6
  // and troll Regeneration — a holy knight that regrows limbs (critic's step-3
  // read). Smiting the unclean is divine magic, so the word's absence was never
  // the right test; the question is whether the creature works magic, and the
  // KIND answers it.
  // Measured before the change, 5 samples on each of the five pins defending the
  // gate: 35/35 correct. The call lets the crusader and the chaplain through and
  // still refuses a dragonborn knight and a satyr piper, which is what the gate
  // existed for — those pins are unchanged below.
  // The word table remains the fallback for a call that does not answer, so with
  // no `casts` field in a parsed fixture the old behaviour still holds; that is
  // what this test now pins.
  test('with no answer from the call, the word table still decides a smite', () => {
    const r = run('an oathsworn crusader who smites the unclean and mends her soldiers', 'oathsworn crusader');
    expect((r.notes ?? []).join(' ')).not.toMatch(/-> caster-warpriest/);
  });

  test('the call\'s own answer reaches the divine line, and its receipt says why', () => {
    const { chooseLine } = require('../route.mjs');
    const text = 'an oathsworn crusader who smites the unclean and mends her soldiers';
    const r = chooseLine(
      { picks: [{ line: 'caster-warpriest', because: 'smites the unclean' }], casts: { yes: true, because: 'an oathsworn crusader who smites', implied_by_kind: true } },
      { text, rawText: text },
    );
    expect((r.notes ?? []).join(' ')).toMatch(/casts: implied by the kind/);
    expect(r.archetype).toBe('caster');
  });

  test('a quote the GM never typed does not buy the caster line — the table decides', () => {
    const { chooseLine } = require('../route.mjs');
    const text = 'a blue dragonborn knight';
    const r = chooseLine(
      { picks: [{ line: 'caster-warpriest', because: 'knight' }], casts: { yes: true, because: 'chants the dawn liturgy', implied_by_kind: false } },
      { text, rawText: text },
    );
    expect((r.notes ?? []).join(' ')).toMatch(/casts refused:/);
  });

  test('a magic word still lets the verb override through', () => {
    const r = run('a battle-cleric who prays over her blade and casts blessings', 'battle-cleric');
    expect((r.notes ?? []).join(' ')).toMatch(/-> caster-warpriest/);
  });
});

// THE CASTER GATE HAS NO BACK DOOR (critic, 2026-10-14): the override was the
// first way around it, the family fallback the second. Llibran's trace read
// "caster-binder: a caster line needs a magic word — none here … fell to
// caster's plain line", and a satyr piper came out a wizard.
describe('the caster family fallback leaves the family', () => {
  const { chooseLine } = require('../route.mjs');
  const run = (text, line, type) => chooseLine({ picks: [{ line, quote: '' }], creature_type: type }, { text });

  test('a refusal for want of a magic word falls OUT of the caster family', () => {
    const r = run('a satyr piper who dances travellers into the hills', 'caster-binder', 'Fey');
    expect(r.line).toBeTruthy();                 // never nothing: the rule is never-fail
    expect(String(r.line)).not.toMatch(/^caster/);
    expect((r.notes ?? []).join(' ')).toMatch(/the family itself needs a magic word/);
  });

  test('a magic word keeps the caster line', () => {
    const r = run('a satyr sorcerer who casts charms and hexes', 'caster-binder', 'Fey');
    expect(String(r.line)).toMatch(/^caster/);
  });

  test('a Fey falls to the skirmisher line, not the brute one — print has no Fey brutes', () => {
    const r = run('a satyr piper who dances travellers into the hills', 'caster-binder', 'Fey');
    expect(r.line).toBe('skirmisher');
  });
});

// THE CRITIC'S A2 (2026-10-18): print prints no incorporeal creature above Medium
// in either corpus — Will-o'-Wisp Small, Ghost/Specter/Wraith/Banshee Medium — so a
// Gargantuan trench leviathan is not a phantom whatever the call picks. The route
// call now answers `size`, and the veto sits beside the type veto it mirrors.
describe('a big body is not incorporeal (print: nothing above Medium)', () => {
  const pick = (size, creature_type) => chooseLine(
    { picks: [{ line: 'lurker-phantom', because: 'drowns fleets' }], creature_type, size, cr: '24', shoots: { yes: false }, is_a_swarm: { yes: false }, holds: { yes: false }, casts: { yes: false } },
    { text: 'a leviathan of the trench whose song drowns fleets', rawText: 'a leviathan of the trench whose song drowns fleets' },
  );
  const idOf = (c) => String(c.line?.id ?? c.line ?? ''); // chooseLine returns the id as a string on this path
  test('Huge and Gargantuan stand the phantom seat down', () => {
    for (const sz of ['Huge', 'Gargantuan']) {
      const c = pick(sz, 'Monstrosity');
      expect(idOf(c)).not.toBe('lurker-phantom');
      expect(idOf(c)).toBe('lurker'); // it falls to the plain line of its own family
      expect(c.style).toBeNull();
      expect(c.notes.join(' ')).toMatch(/not incorporeal/);
    }
  });
  test('Medium and Small keep it — print\'s own incorporeals', () => {
    for (const sz of ['Small', 'Medium']) {
      const c = pick(sz, 'Undead');
      expect(idOf(c)).toBe('lurker-phantom');
      expect(c.style).toBe('phantom');
    }
  });
  test('the prompt asks for the size', () => {
    expect(buildRoutePrompt('a trench leviathan', { cr: 24 })).toMatch(/"size":/);
  });
});

// STEP 7 OF THE FIVE PIPELINES BRIEF — THE VERB OVERRIDE RETIRES AS A ROUTE
// DECISION ON THE HOMEBREW PATH. The keys stay as the menu the call is shown and
// as the fallback when the call gave nothing to stand on; they stop being the
// decision when the call ranked a line and quoted the GM's words for it.
//
// MEASURED LIVE BEFORE LANDING (scripts/probe-line.mjs, 13 prompts x 5 runs,
// 2026-10-20): the mechanism changed the answer on 0 of 13. The three cases the
// mocked pins below encode — the giant crab, the miller who turns into a boar,
// the drowned wife — all come back from the LIVE call already on the line the key
// would have promoted (crab -> brute-grappler 5/5, miller -> skirmisher-shifter
// 5/5). The route prompt now requires one consistent answer ("a cue you confirm
// is a pick you make"), which is what makes the key unnecessary as a decision.
// The mocks below therefore test the MECHANISM, and live behaviour no longer
// reaches them — that divergence is deliberate and recorded.
describe('step 7: the override stands down on the homebrew path', () => {
  const crab = { picks: [{ line: 'brute', because: 'a crab the size of a longboat' }], creature_type: 'Beast' };
  const crabText = "the drowned king's crown, a crab the size of a longboat that wears it and rules the wreck-fields";

  test("a verified pick stands, and the trace says the key was the menu and not the decision", () => {
    const r = chooseLine(crab, { text: crabText, rawText: crabText, path: 'homebrew' });
    expect(r.line).toBe('brute');
    expect(r.notes.join(' | ')).toMatch(/brute stands on the homebrew path: the call ranked it and quoted "a crab the size of a longboat" — the key "crab" is the menu, not the decision \(step 7\)/);
  });

  test('every other path keeps the override, because a print body or a class decides there anyway', () => {
    for (const path of ['twist', 'class_npc', 'exact', 'blank', null]) {
      const r = chooseLine(crab, { text: crabText, rawText: crabText, path });
      expect(r.line).toBe('brute-grappler');
    }
  });

  test('the override still runs on homebrew when no pick verified — the call gave nothing to stand on', () => {
    // the quote is not in the GM's words, so the pick does not earn the stand-down
    const unquoted = { picks: [{ line: 'brute', because: 'a big strong thing that hits hard' }], creature_type: 'Beast' };
    const r = chooseLine(unquoted, { text: crabText, rawText: crabText, path: 'homebrew' });
    expect(r.line).toBe('brute-grappler');
    expect(r.notes.join(' | ')).not.toMatch(/stands on the homebrew path/);
  });

  test('a cue the call read as a figure of speech still blocks the override, on every path', () => {
    const berserk = { picks: [{ line: 'brute', because: 'flies into an unstoppable rage' }], creature_type: 'Humanoid', cue_verdicts: [{ key: 'flies', means: false, because: 'flies into an unstoppable rage' }] };
    const t = 'a berserker who flies into an unstoppable rage';
    for (const path of ['homebrew', 'twist', null]) expect(chooseLine(berserk, { text: t, rawText: t, path }).line).toBe('brute');
  });
});
