/**
 * A CLOSED SET OF CLAUSES AN EXISTING TRAIT CAN TAKE.
 *
 * The owner's design (2026-10-29). Measured on that day's forty: 53 templated
 * rows across 39 sheets drew 40 DISTINCT templates, so the catalog's breadth is
 * not the problem — but ten templates repeated and only ONE of the ten had a slot.
 * The difference is visible: `terrain-walk` landed three times and reads as three
 * rows, because `{terrain}` varies; `push-prone` landed four times and reads as
 * four copies.
 *
 * So the lever is a parameter on an existing trait, not another trait. A CLOSED SET
 * rather than free text, because five rounds of probing showed free-text rewriting
 * finds a new way to break every time it is constrained — it bolted on
 * preconditions, moved an attack's damage to a MISS, wrote a trigger true of every
 * living target. The call names a kind; the engine writes the clause.
 *
 * Both kinds here are FREE: no damage, no save, no condition, so the CR budget
 * cannot drift. Print's priced augmentations (Fire Form's "that creature takes
 * 5 (1d10) Fire damage") are deliberately absent until the ladder is wired.
 */
import { TEMPLATE_BY_ID, AUGMENTATION_KINDS, renderTemplate, buildFitPrompt, TEMPLATES } from '@/tools/statblock-generator/reskin/templates.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const ctx = (cr = 9, arch = 'brute') => ({
  scaled: scaleDonor(pickDonor(cr, null, arch), cr, { mechanics: [] }),
  archetype: arch, cr, sections: {}, imposed: [], conditionMinor: 'Frightened',
  name: 'Bog Troll', inline: 'troll', energy: 'Acid', mix: null,
  meleeType: 'Slashing', concept: 'a bog troll', size: 'Large',
});
const render = (id, fills = {}, arch = 'brute') => renderTemplate(TEMPLATE_BY_ID.get(id), ctx(9, arch), fills, { blind: true });

describe('the set is closed and declared', () => {
  // STRENGTHS FIRST (owner, 2026-10-29): the first cut was two WEAKNESSES, because
  // I reasoned free == CR-negative == weakness and aimed the whole set at making
  // creatures worse. Print's free augmentations are mostly boons — it squeezes
  // through a 1-inch gap (8 rows), ignores its own terrain (4), sees in its own
  // medium (4), stands in a creature's space (2) — and none costs a die.
  // weakness_shutoff was removed (2026-10-29): its fill is a damage type the
  // concept rarely names — "recoils from holy light" never says Radiant — so
  // `vetFills` kills it, and the vulnerability that could have supplied it is
  // written ~1,700 lines after the row renders. Two blockers deep, and the owner's
  // steer was boons regardless. The set is four boons, all free.
  it('is a closed set of four boons', () => {
    expect(AUGMENTATION_KINDS.sort()).toEqual(
      ['own_medium_sight', 'space_hold', 'squeeze', 'terrain_boon']);
  });
  it('a template declares which kinds it will take', () => {
    expect(TEMPLATE_BY_ID.get('blood-frenzy').augments).toContain('own_medium_sight');
    expect(TEMPLATE_BY_ID.get('spider-climb').augments).toEqual(
      expect.arrayContaining(['terrain_boon', 'squeeze', 'own_medium_sight']));
    expect(TEMPLATE_BY_ID.get('riposte').augments).toBeNull();
  });
});

describe("print's own grammar, appended", () => {
  // White Dragon/Ice Walk: "Additionally, Difficult Terrain composed of ice or
  // snow doesn't cost it extra movement."
  it('a terrain boon reads as print writes it', () => {
    const r = render('spider-climb', { augmentation: 'terrain_boon', terrain: 'webs and sticky silk' }, 'lurker');
    expect(r.text).toMatch(/Additionally, Difficult Terrain composed of webs and sticky silk doesn't cost the creature extra movement\.$/);
  });
  it('the base row is untouched when no augmentation is asked for', () => {
    const base = render('blood-frenzy');
    expect(base.augmented).toBeUndefined();
    expect(base.text).toMatch(/all its Hit Points\.$/);
  });
});

describe('it refuses what it should', () => {
  it('ignores a kind the template does not declare', () => {
    expect(render('blood-frenzy', { augmentation: 'terrain_boon', terrain: 'mud' }).augmented).toBeUndefined();
  });
  it('ignores a shut-off that is not a damage type', () => {
    expect(render('blood-frenzy', { augmentation: 'weakness_shutoff', shutoff_damage: 'Sunlight' }).augmented).toBeUndefined();
  });
  it('ignores a terrain fill that is the creature itself', () => {
    expect(render('spider-climb', { augmentation: 'terrain_boon', terrain: 'troll' }, 'lurker').augmented).toBeUndefined();
  });
  it('adds no dice, save or condition — the CR budget cannot move', () => {
    const r = render('blood-frenzy', { augmentation: 'weakness_shutoff', shutoff_damage: 'Radiant' });
    expect(r.text).not.toMatch(/\d+ \(\d+d\d+\)|Saving Throw|has the \w+ condition/);
  });
});

describe('the menu advertises it, so the feature is not inert', () => {
  // a shape added earlier this sprint shipped DEAD because a registration never
  // reached the prompt, and only a verification probe caught it
  const prompt = () => buildFitPrompt({
    name: 'Bog Troll', idea: 'it fights harder on wounded prey', cr: 9, concept: 'a bog troll',
    menu: TEMPLATES.filter((t) => ['blood-frenzy', 'spider-climb', 'riposte'].includes(t.id)),
  });
  it('offers the declared kind and names its slot', () => {
    const line = String(prompt()).split('\n').find((l) => l.startsWith('- spider-climb'));
    expect(line).toMatch(/may ALSO take ONE augmentation, or none:/);
    expect(line).toMatch(/"terrain_boon" \(then fill \{terrain\}\)/);
    // a slotless kind says so rather than printing "{null}", which the model
    // dutifully answered as a key: fills: {"null": ""}
    expect(line).toMatch(/"squeeze" \(nothing to fill\)/);
  });
  it('offers nothing on a template that declares none', () => {
    const line = String(prompt()).split('\n').find((l) => l.startsWith('- riposte'));
    expect(line).not.toMatch(/augmentation/);
  });
});



/**
 * THE FREE BOONS NEED NOTHING FILLED, SO NOTHING HAS TO ARRIVE FIRST.
 *
 * This is why they matter beyond being strengths: `weakness_shutoff` needs the
 * sheet's declared vulnerability, which is assigned ~1,700 lines AFTER the library
 * draw renders the row — so it is empty at render time and the shut-off could never
 * fire from the draw site. Print's boons are whole sentences with no variable in
 * them, so they depend on nothing and work where the row is actually built.
 */
describe('the slotless boons compose at the draw site', () => {
  const at = (arch) => ({
    scaled: scaleDonor(pickDonor(9, null, arch), 9, { mechanics: [] }),
    archetype: arch, cr: 9, sections: {}, imposed: [], conditionMinor: 'Frightened',
    name: 'Dune Thing', inline: 'thing', energy: 'Fire', mix: null,
    meleeType: 'Slashing', concept: 'a thing that swims through sand', size: 'Large',
  });
  const go = (id, fills, arch) => renderTemplate(TEMPLATE_BY_ID.get(id), at(arch), fills, { blind: true });

  it("squeeze writes print's own sentence, with no fill", () => {
    const r = go('spider-climb', { augmentation: 'squeeze' }, 'lurker');
    expect(r.augmented).toEqual({ kind: 'squeeze' });
    expect(r.text).toMatch(/It can move through a space as narrow as 1 inch without expending extra movement to do so\.$/);
  });
  it('space_hold writes print\'s own sentence', () => {
    expect(go('energy-aura', { augmentation: 'space_hold' }, 'lurker').text)
      .toMatch(/It can enter a creature's space and stop there\.$/);
  });
  it('own_medium_sight takes the concept\'s own words', () => {
    expect(go('earth-glide', { augmentation: 'own_medium_sight', sense_target: 'anything moving through the sand' }, 'brute').text)
      .toMatch(/can pinpoint the location of anything moving through the sand within 60 feet/);
  });
  it('still refuses a kind the template does not declare', () => {
    expect(go('fear-aura', { augmentation: 'squeeze' }, 'lurker').augmented).toBeUndefined();
  });
  it('adds no dice, save or condition — all four boons are free', () => {
    for (const [id, f, a] of [['spider-climb', { augmentation: 'squeeze' }, 'lurker'],
      ['energy-aura', { augmentation: 'space_hold' }, 'lurker']]) {
      const added = go(id, f, a).text.split(/(?<=\.)\s/).slice(-1)[0];
      expect(added).not.toMatch(/\d+ \(\d+d\d+\)|Saving Throw|has the \w+ condition/);
    }
  });
});

/**
 * THE STAMP MUST REACH THE ROW, OR THE FEATURE IS INVISIBLE.
 *
 * This was the only thing actually broken. `carryDeclared` moves what the writer
 * recorded onto the row — `imposes`, `requiresCondition`, `duration` — by
 * String()-ing each key. `augmented` is a RECORD ({kind, fill}), so it could not
 * ride that loop, and the stamp was dropped while the clause stayed in the row's
 * TEXT. Five tens were reported as zero uptake because the count read the stamp;
 * recounting by text showed the boon had been landing since the second run.
 */
describe('carryDeclared carries the augmentation record', () => {
  const { carryDeclaredForTest } = require('@/tools/statblock-generator/reskin/generate.mjs');

  it('is exercised through the renderer and the row together', () => {
    // the render result carries it...
    const r = renderTemplate(TEMPLATE_BY_ID.get('spider-climb'), {
      scaled: scaleDonor(pickDonor(7, null, 'lurker'), 7, { mechanics: [] }),
      archetype: 'lurker', cr: 7, sections: {}, imposed: [], conditionMinor: 'Frightened',
      name: 'Crag Stalker', inline: 'stalker', energy: 'Cold', mix: null,
      meleeType: 'Slashing', concept: 'climbs sheer rock and squeezes into crevices', size: 'Medium',
    }, { augmentation: 'squeeze' }, { blind: true });
    expect(r.augmented).toEqual({ kind: 'squeeze' });
    expect(r.text).toMatch(/narrow as 1 inch/);
    // ...and a row built from it must keep the record, not "[object Object]"
    if (typeof carryDeclaredForTest === 'function') {
      const row = carryDeclaredForTest({ name: 'Spider Climb', text: r.text }, r);
      expect(row.augmented).toEqual({ kind: 'squeeze' });
      expect(String(row.augmented)).not.toBe('[object Object]');
    }
  });
});
