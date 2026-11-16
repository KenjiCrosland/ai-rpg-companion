import { templatesFor, TEMPLATES, SIZES } from '@/tools/statblock-generator/reskin/templates.mjs';

// Step 2 of plans/declare-the-body-2026-10-22.md: a template may declare what
// must be TRUE of the creature, read off DECLARED facts (size, attack rows) and
// never off the concept's words. The gate is whether a GM would read a
// contradiction, NOT whether every print instance happens to satisfy it —
// print CORRELATION is not a requirement, which is how the circular Climb gate
// on spider-climb was caught.

const ids = (o) => new Set(templatesFor(o).map((t) => t.id));

const brute = {
  archetype: 'brute', cr: 5, movement: '40 ft.', type: 'Monstrosity', sections: {},
  concept: 'a charging beast that flattens what it hits', section: 'action', trigger: null,
};
const duelist = {
  archetype: 'defender', cr: 5, movement: '30 ft.', type: 'Humanoid',
  concept: 'a duelist who turns every thrust back', section: 'reaction', trigger: null,
};
const meleeRow = { Actions: [{ name: 'Rapier', text: '*Melee Attack Roll:* +7, reach 5 ft. 8 (1d8 + 4) Piercing damage.' }] };
const rangedRow = { Actions: [{ name: 'Bow', text: '*Ranged Attack Roll:* +7, range 150/600 ft. 8 (1d8 + 4) Piercing damage.' }] };

describe('requires_size — body mass, from the declared size', () => {
  it.each(['Tiny', 'Small', 'Medium'])('filters trample and leap on a %s body', (size) => {
    const offered = ids({ ...brute, size });
    expect(offered.has('trample')).toBe(false);
    expect(offered.has('leap')).toBe(false);
  });

  it.each(['Large', 'Huge', 'Gargantuan'])('offers trample and leap on a %s body', (size) => {
    const offered = ids({ ...brute, size });
    expect(offered.has('trample')).toBe(true);
    expect(offered.has('leap')).toBe(true);
  });

  it('FAILS OPEN when the size is unknown, like type and movement do', () => {
    // several templatesFor call sites pass no size; they must be unaffected
    const offered = ids({ ...brute, size: '' });
    expect(offered.has('trample')).toBe(true);
  });

  it('is declared by exactly the two templates measured against print', () => {
    expect(TEMPLATES.filter((t) => t.requires_size).map((t) => t.id).sort()).toEqual(['leap', 'trample']);
  });

  it('exports ONE size ladder (the checker reads this one, not a private copy)', () => {
    expect(SIZES).toEqual(['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']);
  });
});

describe('riposte needs something to strike back with', () => {
  it('is offered when a melee attack row is on the sheet', () => {
    expect(ids({ ...duelist, sections: meleeRow }).has('riposte')).toBe(true);
  });

  it('is filtered when the sheet carries only a ranged row', () => {
    expect(ids({ ...duelist, sections: rangedRow }).has('riposte')).toBe(false);
  });
});

describe('spider-climb: the circular gate is gone', () => {
  // print's Vampire Spawn is Medium, "30 ft.", and carries Spider Climb with no
  // Climb speed. Requiring a Climb speed required what the trait GRANTS, so a
  // vampire-shaped concept could never be offered it.
  it('is offered to a creature with no Climb speed', () => {
    const offered = ids({
      archetype: 'lurker', cr: 5, movement: '30 ft.', type: 'Undead', sections: {},
      concept: 'a vampire spawn that walks on ceilings', section: 'trait', trigger: null,
    });
    expect(offered.has('spider-climb')).toBe(true);
  });

  it('declares no movement requirement at all', () => {
    expect(TEMPLATES.find((t) => t.id === 'spider-climb').requires_movement).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Steps 1/3/5: the template DECLARES what must be true of the body in plain
// words; the CALL judges it; `keys` is the fallback for a failed call only.
import { NEEDS_BODY, readBodyVerdicts, liveBodyRequirements, buildIdeaPrompt, significantWords } from '@/tools/statblock-generator/reskin/templates.mjs';

const owlbear = {
  archetype: 'brute', cr: 3, movement: '40 ft.', type: 'Monstrosity', sections: {}, size: 'Large',
  concept: 'a fierce owlbear that hunts the pine woods and screams when it charges',
  section: 'trait', trigger: null,
};

describe('NEEDS_BODY — the declarations', () => {
  it('declares 41 requirements, every one for a template that exists', () => {
    const { TEMPLATES } = require('@/tools/statblock-generator/reskin/templates.mjs');
    // the count is not the point and a hardcoded one breaks on every honest
    // addition (it broke when `life-drain` was authored). What matters is that
    // every declaration REACHES a template, which the it.each below asserts.
    expect(Object.keys(NEEDS_BODY).length).toBeGreaterThanOrEqual(41);
    for (const id of Object.keys(NEEDS_BODY)) {
      expect(TEMPLATES.find((t) => t.id === id)).toBeDefined();
      expect(NEEDS_BODY[id].length).toBeGreaterThan(20); // a question, not a word
    }
  });

  it('holds no regexes — these are questions for the call, never patterns', () => {
    for (const v of Object.values(NEEDS_BODY)) expect(typeof v).toBe('string');
  });
});

describe('the verdict decides, and the sticky owlbear does not ship', () => {
  const ids = (o) => new Set(require('@/tools/statblock-generator/reskin/templates.mjs').templatesFor(o).map((t) => t.id));

  it('keeps adhesive off the owlbear when the call says it is not true', () => {
    expect(ids({ ...owlbear, bodyVerdicts: { adhesive: false } }).has('adhesive')).toBe(false);
  });

  it('lets it through when the call says it IS true — a gate, not a wall', () => {
    expect(ids({ ...owlbear, bodyVerdicts: { adhesive: true } }).has('adhesive')).toBe(true);
  });

  it('OVERRULES the word list in both directions', () => {
    const base = { archetype: 'defender', cr: 4, movement: '25 ft.', type: 'Humanoid', sections: {}, size: 'Medium', section: 'bonus_action', trigger: null };
    // the word is there and the shell is not: the retired regex shipped this
    const orc = { ...base, concept: 'an orc warchief who withdraws into his shell' };
    expect(ids(orc).has('shell-withdraw')).toBe(true);                                   // keys alone
    expect(ids({ ...orc, bodyVerdicts: { 'shell-withdraw': false } }).has('shell-withdraw')).toBe(false);
    // the shell is there and the word is not: the retired regex refused this
    const tortle = { ...base, concept: 'an ancient thing carrying a stone house on its back' };
    expect(ids(tortle).has('shell-withdraw')).toBe(false);                                // keys alone
    expect(ids({ ...tortle, bodyVerdicts: { 'shell-withdraw': true } }).has('shell-withdraw')).toBe(true);
  });
});

describe('the fallback, for a failed call only', () => {
  const ids = (o) => new Set(require('@/tools/statblock-generator/reskin/templates.mjs').templatesFor(o).map((t) => t.id));

  it('does not gate a concept too thin to judge ("no type known: no exclusion")', () => {
    expect(significantWords('').length).toBeLessThanOrEqual(3);
    expect(ids({ ...owlbear, concept: '' }).has('adhesive')).toBe(true);
  });

  it('counts a row already on the sheet as a claim, as the retired regex did', () => {
    const guard = {
      archetype: 'brute', cr: 5, type: 'Humanoid', movement: '30 ft.', size: 'Medium',
      concept: 'a stoic guard who stands his ground at the gate', section: 'bonus_action', trigger: null,
      sections: { Traits: [{ name: 'Bony Carapace', text: 'Its shell is thick.' }] },
    };
    expect(ids(guard).has('shell-withdraw')).toBe(true);
  });

  it('never lets keys overrule a verdict', () => {
    // "tar" is one of adhesive's keys, so the fallback would say yes
    const tar = { ...owlbear, concept: 'a tar-pit horror that drags what it touches into the black sludge' };
    expect(ids(tar).has('adhesive')).toBe(true);
    expect(ids({ ...tar, bodyVerdicts: { adhesive: false } }).has('adhesive')).toBe(false);
  });
});

describe('asking the question costs no extra call', () => {
  it('asks only the requirements a template could actually reach here', () => {
    const live = liveBodyRequirements({ archetype: 'artillery', cr: 3, type: 'Humanoid', movement: '30 ft.', size: 'Medium', sections: {}, concept: 'an archer' });
    expect(live.length).toBeGreaterThan(0);
    expect(live.length).toBeLessThan(Object.keys(NEEDS_BODY).length);
    for (const r of live) expect(NEEDS_BODY[r.id]).toBe(r.needs);
  });

  it('rides on the idea prompt, and is absent when nothing is live', () => {
    const live = liveBodyRequirements({ archetype: 'brute', cr: 5, type: 'Monstrosity', movement: '40 ft.', size: 'Large', sections: {}, concept: 'a beast' });
    const withBlock = buildIdeaPrompt({ name: 'X', cr: 5, concept: 'a beast', sheetLines: '-', bodyRequirements: live });
    expect(withBlock).toMatch(/IS IT TRUE OF THIS BODY\?/);
    expect(withBlock.split('Return ONLY JSON')[1]).toMatch(/body_verdicts/);
    expect(buildIdeaPrompt({ name: 'X', cr: 5, concept: 'a beast', sheetLines: '-' })).not.toMatch(/IS IT TRUE OF THIS BODY/);
  });
});

describe('readBodyVerdicts', () => {
  // the expression judge never functioned because callLLM returns a STRING and
  // the reader read a field off it. This reader takes either.
  const raw = JSON.stringify({ action: { idea: 'x' }, body_verdicts: [{ id: 'adhesive', means: false }, { id: 'wail', means: true, because: 'screams' }] });

  it('reads a raw string, a fenced string, and an object alike', () => {
    const want = { adhesive: false, wail: true };
    expect(readBodyVerdicts(raw)).toEqual(want);
    expect(readBodyVerdicts(`\`\`\`json\n${raw}\n\`\`\``)).toEqual(want);
    expect(readBodyVerdicts(JSON.parse(raw))).toEqual(want);
  });

  it('drops unknown ids and non-boolean verdicts rather than trusting them', () => {
    expect(readBodyVerdicts({ body_verdicts: [{ id: 'nope', means: true }, { id: 'wail', means: 'yes' }, { id: 'adhesive', means: true }] }))
      .toEqual({ adhesive: true });
  });

  it('returns null for garbage, so a body question can never fail a generation', () => {
    expect(readBodyVerdicts('not json')).toBeNull();
    expect(readBodyVerdicts({})).toBeNull();
    expect(readBodyVerdicts(null)).toBeNull();
  });
});

describe('the retired concept regexes', () => {
  it('are gone, and no template carries requires_claim any more', () => {
    const { TEMPLATES } = require('@/tools/statblock-generator/reskin/templates.mjs');
    expect(TEMPLATES.filter((t) => t.requires_claim)).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// THE GUARD THAT WOULD HAVE CAUGHT IT. The catalog is built from TWO branches —
// SHAPES and LIBRARY_SEEDS — and `needs_body` was added to only one. Eight
// requirements (coating, phase-slip, herd, rally, snare-bolt, zone-seed,
// blighted-ground, drain) were silently inert from the moment they were written,
// because their templates are `kind: 'seed'`. A declaration that never reaches
// its template is worse than no declaration: the table reads complete.
describe('every declaration reaches its template, on BOTH catalog branches', () => {
  const { TEMPLATES, NEEDS_BODY, FAMILY } = require('@/tools/statblock-generator/reskin/templates.mjs');

  it.each(Object.keys(NEEDS_BODY))('needs_body reaches %s', (id) => {
    const t = TEMPLATES.find((x) => x.id === id);
    expect(t).toBeDefined();
    expect(t.needs_body).toBe(NEEDS_BODY[id]);
  });

  it.each(Object.keys(FAMILY))('family reaches %s', (id) => {
    const t = TEMPLATES.find((x) => x.id === id);
    expect(t).toBeDefined();
    expect(t.family).toBe(FAMILY[id]);
  });

  it('covers seed-built templates, the branch that was missed', () => {
    const seeds = Object.keys(NEEDS_BODY).filter((id) => TEMPLATES.find((x) => x.id === id)?.kind === 'seed');
    expect(seeds.length).toBeGreaterThan(0); // if this ever hits 0 the test has stopped guarding anything
    for (const id of seeds) expect(TEMPLATES.find((x) => x.id === id).needs_body).toBeTruthy();
  });
});

// ONE OF EACH FAMILY A SHEET (the critic's item 2 condition 3 / item 3's
// "own-turn-punisher into the family cap"). The declared CELL is not the family:
// retaliation spans trait/on_being_hit/damage, reaction/on_being_hit/damage AND
// bonus_action/always/damage, so the cell-based cap could not see
// own-turn-punisher at all.
describe('the declared family keeps a second row of it off the menu', () => {
  const { templatesFor, FAMILY } = require('@/tools/statblock-generator/reskin/templates.mjs');
  const ids = (sections, section) => new Set(templatesFor({
    archetype: 'brute', cr: 6, movement: '30 ft.', type: 'Monstrosity', size: 'Large', sections, section, trigger: null,
    concept: 'a thing that punishes whoever touches it and marks them with light',
    bodyVerdicts: { 'own-turn-punisher': true, 'marking-light': true, reveal: true, snatch: true },
  }).map((t) => t.id));

  // Was written on `own-turn-punisher`, the third member of this family, which was RETIRED
  // 2026-11-11 (a reaction's trigger at a bonus action's price; print has no such row). The rule it
  // guards is the family's, not that seed's, so it moves to a surviving member: a sheet that
  // already punishes a hit is offered no second way to do it.
  it('retaliation: no riposte beside a row that already punishes a hit', () => {
    // THE MELEE ROW IS ALWAYS PRESENT. A reaction that strikes back needs something to strike with,
    // so a sheet with no melee row is offered none of these for a reason that has nothing to do with
    // the family — the first cut of this test proved the HOST rule and called it the family cap.
    const bite = { name: 'Bite', text: '*Melee Attack Roll:* +6, reach 5 ft. 12 (2d8 + 3) Piercing damage.' };
    const punisher = { name: 'Lacquered Answer', family: 'punisher', text: 'When a creature within 5 feet hits the thing with a melee attack, it makes one attack against that creature.' };
    const searing = { name: 'Searing Hide', text: 'A creature that touches the creature or hits it with a melee attack while within 5 feet of it takes 7 (2d6) Fire damage.' };
    const live = (sections) => new Set(templatesFor({
      archetype: 'brute', cr: 6, movement: '30 ft.', type: 'Monstrosity', size: 'Large',
      sections: { Actions: [bite], ...sections }, section: 'reaction', trigger: null,
      concept: 'a thing that strikes back at whoever hits it',
    }).map((t) => t.id));
    expect(live({})).toContain('answering-strike');                        // a gate, not a wall
    expect(live({ Reactions: [punisher] })).not.toContain('answering-strike'); // one answer to a blow per sheet
    expect(live({ Traits: [searing] })).not.toContain('answering-strike');  // …and never beside the trait that IS this fiction
  });

  it('light-mark: no reveal beside a marking-light row', () => {
    expect(ids({ Traits: [{ name: 'Marking Light', text: 'x', family: 'light-mark' }] }, 'action').has('reveal')).toBe(false);
  });

  it('grapple: no snatch beside a containment engine (Scree-Pit\'s third grapple)', () => {
    expect(ids({ Actions: [{ name: 'Engulf', text: 'x', engine: 'containment' }] }, 'rider').has('snatch')).toBe(false);
  });

  it('reuses the engine vocabulary donor rows already carry, so one name means one thing', () => {
    // `contact-damage` joined 2026-11-11: heated-body and resonant-body ARE that family, and it was
    // being detected from their prose instead of declared — so neither the cap nor the authoring
    // call could read it as a fact (the cinder brute took Searing Hide and then authored a magma
    // reaction that did the same thing). It is an engine name `sheetEngines` already emits, which
    // is the invariant this test exists for.
    expect(new Set(Object.values(FAMILY))).toEqual(new Set(['punisher', 'light-mark', 'containment', 'contact-damage']));
  });

  it('reads the DECLARED family off the row before any text rule', () => {
    const { sheetEngines } = require('@/tools/statblock-generator/reskin/templates.mjs');
    // a row with no matching prose at all, carrying only the stamp
    expect(sheetEngines({ Traits: [{ name: 'Whatever', text: 'Nothing here matches a text rule.', family: 'light-mark' }] })).toContain('light-mark');
  });
});

// ---------------------------------------------------------------------------
// AREA SHAPE AS A PARAMETER (2026-10-22). Every gated area template was locked
// to ONE shape and the catalog could not produce a LINE at all — print's
// second-commonest area shape, 22 of 109 area clauses. The MODEL picks the shape
// from a closed enum; the ENGINE owns the size, because a distance is a pricing
// input and engine slots are never the model's.
//
// CONSERVATIVE, by the owner's ruling: an area shape is honoured only on a
// template that is already GATED. Nothing in the engine prices an ungated area
// row — not valueCheck (budget0 = perHit, no area term), not calculateCR — so
// widening one would inflate CR invisibly. A gated row routes into pricing
// valueCheck already backs.
describe('area shape is a parameter, sized by the engine', () => {
  const { TEMPLATES, renderTemplate, AREA_SHAPES, areaClause, templateMenuLines } = require('@/tools/statblock-generator/reskin/templates.mjs');
  const spew = () => TEMPLATES.find((t) => t.id === 'spew');
  const ctx = (cr) => ({ scaled: { per_hit: 10 }, archetype: 'brute', cr, energy: 'Poison', mix: 'energy', meleeName: 'Slam', imposed: [], name: 'X' });
  const shapeOf = (r) => /each creature in a [^.]*/.exec(r?.text ?? '')?.[0] ?? null;

  it('offers only the two shapes print gives enough instances to size', () => {
    expect(AREA_SHAPES).toEqual(['Cone', 'Line']);
  });

  it("sizes each shape from print's median for the CR band", () => {
    expect(areaClause('Cone', '0-2')).toBe('each creature in a 15-foot Cone');
    expect(areaClause('Cone', '13-20')).toBe('each creature in a 60-foot Cone');
    expect(areaClause('Line', '6-9')).toBe('each creature in a 40-foot-long, 5-foot-wide Line');
    expect(areaClause('Line', '21+')).toBe('each creature in a 90-foot-long, 5-foot-wide Line');
  });

  it('renders the shape the call asked for', () => {
    expect(shapeOf(renderTemplate(spew(), ctx(8), { area_shape: 'Cone' }))).toBe('each creature in a 30-foot Cone');
    expect(shapeOf(renderTemplate(spew(), ctx(8), { area_shape: 'Line' }))).toBe('each creature in a 40-foot-long, 5-foot-wide Line');
  });

  it('scales the same choice by band, and the model never sets the distance', () => {
    expect(shapeOf(renderTemplate(spew(), ctx(2), { area_shape: 'Line' }))).toMatch(/20-foot-long/);
    expect(shapeOf(renderTemplate(spew(), ctx(24), { area_shape: 'Line' }))).toMatch(/90-foot-long/);
    // a distance the model tries to set is not a shape, so it is simply not in the enum
    expect(shapeOf(renderTemplate(spew(), ctx(8), { area_shape: '120-foot Cone' }))).toBe('each creature in a 30-foot Cone');
  });

  it('falls to the first declared shape for an off-enum or absent choice, never to a miss', () => {
    expect(shapeOf(renderTemplate(spew(), ctx(8), { area_shape: 'Sphere' }))).toBe('each creature in a 30-foot Cone');
    expect(shapeOf(renderTemplate(spew(), ctx(8), {}))).toBe('each creature in a 30-foot Cone');
  });

  it('CONSERVATIVE: an UNGATED template never widens, even when asked', () => {
    const ungated = { ...spew(), gate: null };
    expect(shapeOf(renderTemplate(ungated, ctx(8), { area_shape: 'Line' }))).toBe('each creature in a 30-foot Cone');
  });

  it('tells the model the choice exists, since the frame slot has a different name', () => {
    const line = templateMenuLines([spew()], { cr: 8, concept: '', idea: '' });
    expect(line).toMatch(/\{target\}/);                       // the frame's engine slot
    expect(line).toMatch(/"area_shape" ∈ Cone\/Line/);        // the model's choice
  });

  it('only advertises a choice where there IS one', () => {
    // picked DYNAMICALLY: naming a template here went stale the moment
    // ground-burst was parameterised (2026-10-22), and a test that names the
    // thing it is asserting the absence of will keep going stale.
    const fixed = TEMPLATES.find((t) => (t.targets ?? []).length <= 1 && t.frames);
    expect(fixed).toBeDefined();
    expect(templateMenuLines([fixed], { cr: 8, concept: '', idea: '' })).not.toMatch(/"area_shape" ∈/);
  });

  it('a parameterised template keeps its DEFAULT shape byte for byte', () => {
    // the point of per-template sizes: today's output must not move
    const gb = TEMPLATES.find((t) => t.id === 'ground-burst');
    const ctx8 = { scaled: { per_hit: 10 }, archetype: 'brute', cr: 8, energy: null, mix: 'physical', meleeName: 'Slam', imposed: [], name: 'X' };
    expect(renderTemplate(gb, ctx8, {}).text).toMatch(/each creature in a 15-foot Emanation originating from the creature/);
    expect(renderTemplate(gb, ctx8, { area_shape: 'Cone' }).text).toMatch(/each creature in a 30-foot Cone/);
  });
});

// A ROW THAT CLAIMS NOTHING MAY NOT WEAR THE GM'S WORDS (2026-10-23). The Vampire
// asked for "a garden of thorns" and shipped "Bloodthorn Garden. While it has half
// its hit points or fewer, the vampire has advantage on attack rolls." — the
// generic bloodied buff with the twist's words as a NAME. That is the package-six
// complaint the element receipt was meant to close, and it was still live on the
// forty (1 of 16 generic rows). It is the worst class of defect because the sheet
// LOOKS like it answered the GM.
describe("a decoration row does not borrow the GM's vocabulary", () => {
  const { TEMPLATES } = require('@/tools/statblock-generator/reskin/templates.mjs');

  // the unit of the rule, exercised directly — the engine's own guard lives at the
  // row-build site and is covered end to end by the pipelines suite
  const wouldRename = (callName, concept, creatureName, templateName) => {
    const splitW = (x) => String(x ?? '').toLowerCase().replace(/[^a-z' -]/g, ' ').split(/[\s-]+/).filter(Boolean);
    const stop = new Set(['the', 'and', 'with', 'that', 'who', 'its', 'his', 'her', 'their', 'from', 'into', 'this', 'which', 'what', 'when', 'where', 'while']);
    const own = new Set(splitW(creatureName));
    const gm = new Set(splitW(concept).filter((w) => w.length >= 5 && !stop.has(w) && !own.has(w)));
    const borrowed = splitW(callName).filter((w) => gm.has(w));
    return borrowed.length && templateName && templateName !== callName ? templateName : callName;
  };

  it("renames the Vampire's 'Bloodthorn Garden' to the template's own name", () => {
    expect(wouldRename('Bloodthorn Garden', 'Vampire who keeps a garden of thorns', 'Vampire', 'Bloodied Fury'))
      .toBe('Bloodied Fury');
  });

  it("does not touch a name that borrows nothing from the GM", () => {
    expect(wouldRename('Answering Sting', 'a bog witch\'s iron cauldron that cooks whatever climbs in', 'Kettlewright', 'Opportunist\'s Lash'))
      .toBe('Answering Sting');
  });

  it("never counts the creature's OWN name as the GM's vocabulary", () => {
    // every row says "the vampire ...", so the creature's name must not trip it
    expect(wouldRename('Vampire Resolve', 'Vampire who keeps a garden of thorns', 'Vampire', 'Bloodied Fury'))
      .toBe('Vampire Resolve');
  });

  it('ignores stop words, so a shared "which" or "while" does not trigger it', () => {
    // "which" is 5 letters and in both strings, but it carries no concept — only a
    // CONTENT word the GM chose should cost a decoration its name
    expect(wouldRename('Which Stands Fast', 'a sentinel which guards the broken gate', 'Gate Sentinel', 'Bloodied Fury'))
      .toBe('Which Stands Fast');
  });

  it('DOES trigger on a content word, even an unremarkable one', () => {
    // the counter-case to the above: "waits" is the GM's own word for what this
    // thing does, so a row expressing nothing may not take it
    expect(wouldRename('That Which Waits', 'a thing that waits in the well', 'Well Thing', 'Bloodied Fury'))
      .toBe('Bloodied Fury');
  });

  it('every template it can fall back to HAS a name of its own', () => {
    for (const t of TEMPLATES) expect(typeof t.name).toBe('string');
  });
});

// HOW LONG IT LASTS, as a parameter (2026-10-23). 11 of 39 named gaps on the forty
// asked for persistence where a template hard-codes a one-shot. Print attests all
// four condition-duration forms (n=71) and attests NO lengthening for a self-buff,
// recurring damage or a persistent area — its persistence is always ANCHORED (a
// grapple, a wound, concentration, an environment) — so the parameter is offered
// only on condition-effect templates.
describe('duration is a parameter on condition-effect templates', () => {
  const { TEMPLATES, renderTemplate, DURATIONS, durationClause } = require('@/tools/statblock-generator/reskin/templates.mjs');
  const ctx = (cr) => ({ scaled: { per_hit: 10 }, archetype: 'controller', cr, energy: null, mix: 'physical', meleeName: 'Slam', imposed: [], name: 'X' });
  const dur = (r) => /until the (?:start|end) of (?:its|the creature's) next turn/.exec(r?.text ?? '')?.[0] ?? null;
  const gaze = () => TEMPLATES.find((t) => t.id === 'gaze-single');

  it("offers only print's four condition-duration forms", () => {
    expect(DURATIONS).toEqual(['target_end', 'target_start', 'source_end', 'source_start']);
    expect(durationClause('source_start')).toBe("until the start of the creature's next turn");
  });

  it('renders the form the call asked for', () => {
    expect(dur(renderTemplate(gaze(), ctx(9), { condition_minor: 'Blinded', duration: 'target_end' }))).toBe('until the end of its next turn');
    expect(dur(renderTemplate(gaze(), ctx(9), { condition_minor: 'Blinded', duration: 'source_start' }))).toBe("until the start of the creature's next turn");
  });

  it('falls to the template default for an absent or off-enum choice, never to a miss', () => {
    expect(dur(renderTemplate(gaze(), ctx(9), { condition_minor: 'Blinded' }))).toBe("until the end of the creature's next turn");
    expect(dur(renderTemplate(gaze(), ctx(9), { condition_minor: 'Blinded', duration: 'forever' }))).toBe("until the end of the creature's next turn");
  });

  it('honours a PER-BAND default, which is why the parameter changed no printed text', () => {
    // gaze-single's 21+ frame always read a different form from its lower bands;
    // collapsing them would have silently rewritten that band
    expect(dur(renderTemplate(gaze(), ctx(22), { condition_minor: 'Blinded' }))).toBe('until the start of its next turn');
    expect(dur(renderTemplate(gaze(), ctx(9), { condition_minor: 'Blinded' }))).toBe("until the end of the creature's next turn");
  });

  // 14 since `fear-aura` joined (2026-10-27, print's Pit Fiend Fear Aura — the
  // at-will non-visual fear form the catalog had no shape for). The count is a
  // ledger; the assertion that matters is the one below it.
  it('is carried by 14 templates, every one condition-effect', () => {
    const carry = TEMPLATES.filter((t) => {
      const f = t.frames ? Object.values(t.frames).join(' ') : (t.text ?? '');
      return f.includes('{duration}');
    });
    expect(carry).toHaveLength(14);
    for (const t of carry) expect(t.effect).toBe('condition');
  });

  it('works on the SEED render path too, which fills slots separately', () => {
    const seed = TEMPLATES.find((t) => t.id === 'terror-pulse');
    expect(seed.kind).toBe('seed');
    const r = renderTemplate(seed, { ...ctx(7), archetype: 'brute' }, { duration: 'source_end' });
    expect(dur(r)).toBe("until the end of the creature's next turn");
  });
});
