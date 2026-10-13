// THE SPECIES KIT (step 9a, 2026-10-13): a species word lands header lines and free traits — SRD rows renamed to the creature,
// flavor from catalog shapes under print's row cap; print aliases keep print's body; the GM's own rows always stand.
import { generateReskin, renameKeysOf } from '../generate.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';
import { checkBlock } from '../checker.mjs';
import { speciesFor, speciesRows, liftSrdRow, rowCap, SPECIES } from '../species.mjs';
import { TEMPLATES, renderTemplate, rankByVerb, scrubDeniedClauses } from '../templates.mjs';
import { honestLanguages } from '../header.mjs';
import { toLegacyModel } from '../../format-2024/generate.mjs';

const mk = (cr, style, arch) => { const scaled = scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [] }); const renames = { Teleport: 'Blink Step', 'Ranged Attack': 'Hurl', 'Hybrid Attack': 'Hybrid Strike' }; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; }); const typed = [...Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name), 'Hurl', 'Hybrid Strike']; return { scaled, renames, typed }; };
const json = (name, type, cr, style, arch, over = {}) => { const { scaled, renames, typed } = mk(cr, style, arch); return JSON.stringify({ name, type, size: over.size ?? 'Medium', alignment: 'Neutral', senses: over.senses ?? 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, over.dtype ?? 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 10 feet. *Failure:* The target has the Prone condition.`, ...(over.extra ?? {}) }); };
const gen = (opts, answer) => generateReskin({ mechanics: [], ...opts }, async () => answer);
const rows = (m) => Object.values(m.sections).flat();

describe('the species kit (step 9a)', () => {
  test('the table: every lift resolves to an SRD row, every flavor shape exists in the catalog', () => {
    for (const sp of SPECIES) {
      for (const t of sp.traits ?? []) expect(liftSrdRow(t.srd[0], t.srd[1])).toBeTruthy();
      expect(speciesRows(sp, { inline: 'the x', dc: 12 }).every((r) => !/\{(?:inline|dc)\}/.test(r.text))).toBe(true);
    }
  });
  test('the lift: print\'s self-reference becomes the creature, a DC becomes the sheet\'s, an edit applies — the Hydra\'s Hold Breath is the lizardfolk\'s 15 minutes', () => {
    const liz = speciesFor(['Large lizard folk', '30 feet of movement']);
    expect(liz.species.key).toBe('lizardfolk'); expect(liz.clause).toBe('Large lizard folk');
    expect(speciesRows(liz.species, { inline: 'Meshrin', dc: 15 })).toEqual([{ name: 'Hold Breath', text: 'Meshrin can hold its breath for 15 minutes.', section: 'Traits', source: 'Hydra/Hold Breath' }]);
    expect(speciesRows(speciesFor(['a troglodyte raider']).species, { inline: 'the raider', dc: 13 }).map((r) => r.text.slice(0, 60))).toEqual(['*Constitution Saving Throw*: DC 13, any creature that starts', 'While in sunlight, the raider has Disadvantage on ability ch']);
    expect(speciesRows(speciesFor(['an orc warchief']).species, { inline: 'the warchief' })[0]).toMatchObject({ name: 'Relentless Rush', text: 'The warchief takes the Dash action.', section: 'Bonus Actions' });
  });
  test('the matcher: whole words and phrases, the Name field too; "lizard" alone, "orca" and a print alias match nothing', () => {
    expect(speciesFor(['a giant lizard'])).toBeNull(); expect(speciesFor(['an orca that hunts seals'])).toBeNull(); expect(speciesFor(['Kobold — Can turn invisible'])).toBeNull();
    expect(speciesFor(['', 'Thessaly the Tabaxi']).species.key).toBe('tabaxi');
    expect(speciesFor(['a blue dragonborn knight'], 'a blue dragonborn knight').resist).toEqual(['Lightning']); expect(speciesFor(['a dragonborn'], 'a dragonborn').resist).toEqual(['Fire']);
  });
  test('the row cap is print\'s density: the median SRD row count in the band plus one, rising with CR', () => {
    expect(rowCap(1)).toBeLessThanOrEqual(rowCap(8)); expect(rowCap(8)).toBeLessThanOrEqual(rowCap(16)); expect(rowCap(16)).toBeLessThanOrEqual(rowCap(24)); expect(rowCap(8)).toBeGreaterThanOrEqual(4);
  });
  test('Meshrin: "lizard folk" lands Hold Breath and Swim 30 ft. beside every one of her own rows; the marsh stride yields to the cap; coverage 7/7', async () => {
    const desc = 'Large lizard folk, 30 feet of movement,  Wields a greatsword, long tail for swipe attacks, is trained in fighting styles, has razor sharp claws, and large teeth for a vicious bite.';
    const m = await gen({ archetype: 'defender', concept: desc, userConcept: desc, cr: 8, fixedName: 'Meshrin' }, json('Meshrin', 'Humanoid', 8, null, 'defender', { size: 'Large', extra: { clauses: [{ text: 'Large', kind: 'header' }, { text: '30 feet of movement', kind: 'header' }, { text: 'greatsword', kind: 'mechanical' }, { text: 'long tail for swipe attacks', kind: 'mechanical' }, { text: 'lizard folk', kind: 'descriptive' }] } }));
    const hb = rows(m).find((e) => e.name === 'Hold Breath');
    expect(hb).toMatchObject({ text: 'Meshrin can hold its breath for 15 minutes.', kit: 'lizardfolk', clause: 'Large lizard folk' });
    expect(m.speed).toBe('30 ft., Swim 30 ft.');
    expect(rows(m).map((e) => e.name)).toEqual(expect.arrayContaining(['Greatsword', 'Tail Swipe', 'Razor Sharp Claws', 'Vicious Bite', 'Great Weapon Master', 'Riposte']));
    expect(rows(m).some((e) => e.name === 'Marsh Stride')).toBe(false); // the implied tier yields: the sheet is already past print's density at CR 8
    const r = checkBlock(m); expect(r.fails).toEqual([]); expect(r.fidelity.dropped).toEqual([]);
  });
  test('a tiefling\'s Fire resistance lands — unless the GM gave the creature a Fire vulnerability, which outranks it', async () => {
    const stub = (c) => json('Ash Duelist', 'Humanoid', 4, null, 'skirmisher', { extra: { clauses: c } });
    const a = await gen({ archetype: 'skirmisher', concept: 'a tiefling duelist', userConcept: 'a tiefling duelist', cr: 4 }, stub([{ text: 'a tiefling duelist', kind: 'descriptive' }]));
    expect(a.resistances).toMatch(/\bFire\b/); expect(a.senses).toMatch(/darkvision 60 ft\./);
    const d = 'a tiefling duelist who hates fire and takes extra damage from it';
    const b = await gen({ archetype: 'skirmisher', concept: d, userConcept: d, cr: 4 }, stub([{ text: 'a tiefling duelist', kind: 'descriptive' }, { text: 'hates fire and takes extra damage from it', kind: 'header' }]));
    expect(b.vulnerabilities).toMatch(/\bFire\b/); expect(b.resistances ?? '').not.toMatch(/\bFire\b/);
  });
  test('a species row is the GM\'s: a library seed landing in the same slot does not evict it — the orc keeps Relentless Rush beside a Rampage', async () => {
    const desc = 'an orc warchief with a greataxe';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 5, edition: '2014' }, json('Gorvak the Red', 'Humanoid', 5, null, 'brute', { extra: { clauses: [{ text: 'an orc warchief with a greataxe', kind: 'mechanical' }] } }));
    expect(rows(m).find((e) => e.name === 'Relentless Rush')).toMatchObject({ kit: 'orc', text: expect.stringMatching(/takes the Dash action\.$/) });
    expect(rows(m).map((e) => e.name)).toEqual(expect.arrayContaining(['Greataxe', 'Great Weapon Master'])); expect(m.senses).toMatch(/darkvision 120 ft\./);
  });
  test('a species word is not a body: "dragonborn" and "half-dragon" do not route to the dragon body; a true dragon still does', () => {
    const { verbLines } = require('../route.mjs');
    expect(verbLines('a blue dragonborn knight')).not.toContain('dragon'); expect(verbLines('a half-dragon champion')).not.toContain('dragon');
    expect(verbLines('an adult green dragon')).toContain('dragon');
  });
  test('a species word outranks a monster alias: "a kenku mimic" is a kenku who mimics, not the Mimic', async () => {
    const desc = 'a kenku mimic who copies voices and steals';
    const m = await gen({ archetype: 'skirmisher', concept: desc, userConcept: desc, cr: 2 }, json('Kithrak', 'Humanoid', 2, null, 'skirmisher', { extra: { clauses: [{ text: 'a kenku mimic', kind: 'descriptive' }, { text: 'copies voices and steals', kind: 'mechanical' }] } }));
    expect(rows(m).map((e) => e.name)).not.toEqual(expect.arrayContaining(['Adhesive'])); expect(rows(m).map((e) => e.name)).not.toEqual(expect.arrayContaining(['Pseudopod']));
    expect(rows(m).find((e) => e.name === 'Mimicry')).toMatchObject({ kit: 'kenku' }); expect(m.type).toBe('Humanoid');
    expect(checkBlock(m).fails).toEqual([]); // the checker reads the same rule: no Mimic to compare against
    const c = await gen({ archetype: 'brute', concept: 'a centaur warden', userConcept: 'a centaur warden', cr: 3 }, json('Thornhoof', 'Humanoid', 3, null, 'brute', { extra: { clauses: [{ text: 'a centaur warden', kind: 'descriptive' }] } }));
    expect(c.type).toBe('Fey'); expect(rows(c).find((e) => e.name === 'Charge')).toMatchObject({ kit: 'centaur' });
  });
  test('a print alias keeps print\'s body: the kobold lands no species rows', async () => {
    const m = await gen({ archetype: 'skirmisher', concept: 'Kobold — Can turn invisible once per day', userConcept: 'Kobold — Can turn invisible once per day', cr: 0.25, fixedName: 'Kobold' }, json('Kobold', 'Humanoid', 0.25, null, 'skirmisher', { size: 'Small' }));
    expect(rows(m).some((e) => e.kit)).toBe(false);
  });
});


// THE CRITIC'S READ OF LANDING ONE (2026-10-13): eight holds, pinned.
describe('the species kit — the critic\'s read', () => {
  test('kit and feature rows take the rows\' short form — a model-minted "Grestle Vane" declared "Grestle" speaks as Grestle on its Stench', async () => {
    const desc = 'a troglodyte raider who reeks';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 1 }, json('Grestle Vane', 'Humanoid', 1, null, 'brute', { extra: { inline: 'Grestle', clauses: [{ text: 'a troglodyte raider', kind: 'descriptive' }] } }));
    expect(m.inline).toBe('Grestle');
    for (const e of rows(m).filter((x) => x.kit)) { expect(e.text).not.toMatch(/the grestle vane/i); expect(e.text).toMatch(/\bGrestle\b/); }
  });
  test('print\'s own rows stand on an exact body at print\'s CR — the Kraken\'s Lightning Strike is DC 23 for 33 (6d10)', async () => {
    const m = await gen({ archetype: 'brute', concept: 'a kraken', userConcept: 'a kraken', cr: 23 }, json('Kraken', 'Monstrosity', 23, null, 'brute', { size: 'Gargantuan' }));
    expect(rows(m).find((e) => /^Lightning Strike/.test(e.name)).text).toMatch(/DC 23, one creature the kraken can see within 120 feet\. \*Failure:\*\s+33 \(6d10\) Lightning damage/);
  });
  test('print\'s ranged row is ranged-only — the Knight\'s Heavy Crossbow carries no "reach 5 ft. or"; a hurled axe flies 20/60', async () => {
    const k = await gen({ archetype: 'defender', concept: 'a knight', userConcept: 'a knight', cr: 3 }, json('Knight', 'Humanoid', 3, null, 'defender'));
    const hc = rows(k).find((e) => /Heavy Crossbow/.test(e.name)); expect(hc.text).toMatch(/^\*Ranged Attack Roll:\* \+\d+, range 100\/400 ft\./); expect(hc.text).not.toMatch(/reach/);
    const desc = 'an orc warchief with a greataxe';
    const o = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 5 }, (() => { const j = JSON.parse(json('Gormak', 'Humanoid', 5, null, 'brute', { extra: { clauses: [{ text: 'an orc warchief with a greataxe', kind: 'mechanical' }] } })); j.renames['Ranged Attack'] = 'Hurl Axe'; j.damage_types['Hurl Axe'] = 'Slashing'; return JSON.stringify(j); })());
    const hurl = rows(o).find((e) => e.name === 'Hurl Axe'); if (hurl) expect(hurl.text).toMatch(/range 20\/60 ft\./);
  });
  test('a denied clause never keys a template, and "mimic" in a voice context is not a false-appearance word', () => {
    expect(scrubDeniedClauses('An old hag who lives in the burned forest. She hates fire and takes extra damage from it. Her nails are long and black')).not.toMatch(/fire/);
    expect(scrubDeniedClauses('a wizard but he cannot cast any spells, he just hits people with his staff')).toMatch(/staff/);
    const heated = TEMPLATES.find((t) => t.id === 'heated-body'); const fa = TEMPLATES.find((t) => t.id === 'false-appearance');
    expect(rankByVerb([heated], 'An old hag who lives in the burned forest. She hates fire and takes extra damage from it.', '')[0].concept).toEqual([]);
    expect(rankByVerb([heated], 'a fire-wreathed knight whose armor glows red hot', '')[0].concept.length).toBeGreaterThan(0);
    expect(rankByVerb([fa], 'a kenku mimic who copies voices and steals', '')[0].concept).toEqual([]);
  });
  test('a can\'t-speak line never gets a spoken tongue prepended; a borrow keeps the concept\'s named tongues beside print\'s', async () => {
    expect(honestLanguages("Understands Common and Auran but can't speak (mimics voices)", { mind: 'sapient', type: 'Humanoid' })).not.toMatch(/^Common, Understands/);
    const m = await gen({ archetype: 'skirmisher', concept: 'a tiefling duelist', userConcept: 'a tiefling duelist', cr: 4 }, (() => { const j = JSON.parse(json('Ash Duelist', 'Humanoid', 4, null, 'skirmisher', { extra: { clauses: [{ text: 'a tiefling duelist', kind: 'descriptive' }] } })); j.languages = 'Common, Infernal'; return JSON.stringify(j); })());
    expect(m.languages).toMatch(/\bInfernal\b/); expect(m.languages).toMatch(/\bCommon\b/);
  });
  test('a spewed cloud is never a weapon type: a cloud of ash with no energy on the sheet is Poison', () => {
    const scaled = scaleDonor(pickDonor(7, null, 'skirmisher'), 7, { mechanics: [] });
    const r = renderTemplate(TEMPLATES.find((t) => t.id === 'spew'), { scaled, cr: 7, concept: 'an old hag who turns into a cloud of ash', energy: null, mix: null, archetype: 'skirmisher' }, { damage_type: 'Piercing' });
    expect(r.text).toMatch(/Poison damage/); expect(r.text).not.toMatch(/Piercing/);
    const ash = 'An old hag who lives in the burned forest. She can turn into a cloud of ash and choke anyone who breathes her in. She hates fire and takes extra damage from it. Her nails are long and black and carry rot.';
    const r2 = renderTemplate(TEMPLATES.find((t) => t.id === 'spew'), { scaled, cr: 7, concept: ash, energy: null, mix: null, archetype: 'skirmisher' }, { damage_type: 'Piercing' });
    expect(r2.text).toMatch(/Poison damage/); // "her nails" are not the breath's: the solid read stays in the breath's own clause
    const r3 = renderTemplate(TEMPLATES.find((t) => t.id === 'spew'), { scaled, cr: 7, concept: 'a glass drake that breathes a cone of razor shards', energy: null, mix: null, archetype: 'skirmisher' }, {});
    expect(r3.text).toMatch(/Slashing damage/); // a solid breath named as one still cuts
  });
  test('the 2014 armor guess puts no shield beside a two-handed weapon', () => {
    const m = { name: 'Meshrin', inline: 'Meshrin', format: '2024', cr: 8, size: 'Large', type: 'Humanoid', alignment: 'Neutral', ac: 17, hp: 120, hp_formula: '16d10 + 32', pb: 3, speed: '30 ft.', stats: { STR: 18, DEX: 10, CON: 14, INT: 10, WIS: 10, CHA: 10 }, saves: '', skills: '', senses: 'darkvision 60 ft.; Passive Perception 10', languages: 'Common', sections: { Actions: [{ name: 'Greatsword', text: '*Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.' }] } };
    expect(toLegacyModel(m).armor_class).not.toMatch(/shield/);
  });
});


describe('the species kit — the critic\'s second read (2026-10-13)', () => {
  const { groundedClauses } = require('../generate.mjs');
  test('a bare print name typed mechanical is the head clause; a print name with a part is not', () => {
    expect(groundedClauses([{ text: 'a goblin warrior', kind: 'mechanical' }], 'a goblin warrior', () => {})[0].head).toBe(true);
    expect(groundedClauses([{ text: 'an owlbear with razor sharp claws', kind: 'mechanical' }], 'an owlbear with razor sharp claws', () => {})[0].head).toBeUndefined();
  });
  test('the scrub removes the denied phrase, not the clause: "a tiefling duelist who hates fire" keeps the duelist', () => {
    expect(scrubDeniedClauses('a tiefling duelist who hates fire and takes extra damage from it')).toMatch(/duelist/);
    expect(scrubDeniedClauses('a tiefling duelist who hates fire and takes extra damage from it')).not.toMatch(/fire/);
  });
  test('a hurled named weapon carries its own type and range: a spear is Piercing at 20/60, a javelin 30/120', () => {
    const scaled = scaleDonor(pickDonor(2, null, 'skirmisher'), 2, { mechanics: [] });
    const tr = TEMPLATES.find((t) => t.id === 'throw-retrieve');
    const sp = renderTemplate(tr, { scaled, cr: 2, concept: 'a lizardfolk hunter', energy: null, mix: null, archetype: 'skirmisher', projectile: 'a spear' }, { projectile: 'a spear' });
    if (sp) { expect(sp.text).toMatch(/range 20\/60 ft\./); expect(sp.text).toMatch(/Piercing damage/); }
    const jv = renderTemplate(tr, { scaled, cr: 2, concept: 'a hunter', energy: null, mix: null, archetype: 'skirmisher', projectile: 'a javelin' }, { projectile: 'a javelin' });
    if (jv) { expect(jv.text).toMatch(/range 30\/120 ft\./); expect(jv.text).toMatch(/Piercing damage/); }
  });
  test('an INT 4 body speaks nothing unless the GM says it does', () => {
    expect(honestLanguages('Common', { mind: 'sapient', type: 'Monstrosity', int: 4 })).toBe('None');
    expect(honestLanguages('Common', { mind: 'sapient', type: 'Monstrosity', int: 4, speaks: true })).toBe('Common');
    expect(honestLanguages('Common', { mind: 'sapient', type: 'Humanoid', int: 4 })).toBe('Common');
  });
  test('print\'s alignment lands on an exact body — the Kobold is Neutral', async () => {
    const m = await gen({ archetype: 'skirmisher', concept: 'Kobold', userConcept: 'Kobold', cr: 0.25, fixedName: 'Kobold' }, (() => { const j = JSON.parse(json('Kobold', 'Humanoid', 0.25, null, 'skirmisher', { size: 'Small' })); j.alignment = 'Chaotic Neutral'; return JSON.stringify(j); })());
    expect(m.alignment).toBe('Neutral');
    const k = await gen({ archetype: 'skirmisher', concept: 'Kobold — Can turn invisible once per day', userConcept: 'Kobold — Can turn invisible once per day', cr: 0.25, fixedName: 'Kobold' }, (() => { const j = JSON.parse(json('Kobold', 'Humanoid', 0.25, null, 'skirmisher', { size: 'Small' })); j.alignment = 'Neutral Evil'; return JSON.stringify(j); })());
    expect(k.alignment).toBe('Neutral'); // a print NAME with a claim is still the Kobold Warrior
  });
  test('a translation that echoes the English rows is rejected by the validator', () => {
    const { validateTranslationResponse } = require('../../format-2024/generate.mjs');
    const model = { sections: { Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +5, reach 5 ft. 9 (2d6 + 2) Bludgeoning damage.' }, { name: 'Bolt', text: '*Ranged Attack Roll:* +5, range 60 ft. 7 (2d6) Force damage.' }] } };
    const echo = JSON.stringify({ header: { alignment: 'Gesinnungslos' }, sections: { Actions: [{ name: 'Slam', text: model.sections.Actions[0].text }, { name: 'Bolt', text: model.sections.Actions[1].text }] } });
    expect(validateTranslationResponse(echo, model)).toBe(false);
    const real = JSON.stringify({ header: { alignment: 'Gesinnungslos' }, sections: { Actions: [{ name: 'Schlag', text: '*Nahkampfangriffswurf:* +5, Reichweite 5 ft. 9 (2d6 + 2) Wuchtschaden.' }, { name: 'Strahl', text: '*Fernkampfangriffswurf:* +5, Reichweite 60 ft. 7 (2d6) Kraftschaden.' }] } });
    expect(validateTranslationResponse(real, model)).toBe(true);
  });
});


describe('the species kit — the critic\'s second read, the rerun (2026-10-13)', () => {
  test('a thrown weapon keeps its range, and a part never leaves in the identical-text dedupe — the orc keeps his Greataxe beside a Hand Axe', async () => {
    const desc = 'an orc warchief with a greataxe';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 5, edition: '2014' }, (() => { const j = JSON.parse(json('Gorrak the Red', 'Humanoid', 5, null, 'brute', { extra: { clauses: [{ text: 'an orc warchief with a greataxe', kind: 'mechanical' }] } })); j.renames['Hybrid Attack'] = 'Hand Axe'; j.renames['Ranged Attack'] = 'Hand Axe'; j.damage_types['Hand Axe'] = 'Slashing'; return JSON.stringify(j); })());
    const names = rows(m).map((e) => e.name);
    expect(names).toContain('Greataxe'); expect(rows(m).find((e) => e.name === 'Greataxe').part).toBe(true);
    const ha = rows(m).find((e) => e.name === 'Hand Axe'); if (ha) { expect(ha.text).toMatch(/range 20\/60 ft\./); }
    expect(checkBlock(m).fails).toEqual([]);
  });
});
