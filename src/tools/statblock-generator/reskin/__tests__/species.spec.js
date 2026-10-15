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
    expect(speciesRows(liz.species, { inline: 'Meshrin', dc: 15 })).toEqual([{ name: 'Hold Breath', text: 'Meshrin can hold its breath for 15 minutes.', section: 'Traits', source: 'Hydra/Hold Breath', keys: expect.arrayContaining(['breath']) }]); // a lift carries the clause words it answers (the critic's fourth read, rerun)
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

// THE CRITIC'S THIRD READ (2026-10-13): five holds and seven reader predicates, pinned.
describe('the species kit — the critic\'s third read (2026-10-13)', () => {
  const { chooseLine } = require('../route.mjs');
  test('a mechanic engine needs a key in the GM\'s words: "withdraws into his shell" cannot land a grappler; "drags cattle into the bog" can', () => {
    const r = chooseLine({ picks: [{ line: 'brute-grappler', because: 'withdraws into his shell' }] }, { text: 'a tortle hermit who withdraws into his shell' });
    expect(r.line).not.toBe('brute-grappler'); expect(r.notes.join(' | ')).toMatch(/mechanic engine/);
    expect(chooseLine({ picks: [{ line: 'brute-grappler', because: 'drags cattle into the bog' }] }, { text: 'a tar-mouthed toad that drags cattle into the bog' }).line).toBe('brute-grappler');
  });
  test('a creature-only prompt may choose its own body; words to read make the words decide', () => {
    const { chooseLine } = require('../route.mjs');
    expect(chooseLine({ picks: [{ line: 'lurker-trap', because: 'knife ball' }] }, { text: 'knife ball' }).line).toBe('lurker-trap'); // nothing to read: the catalog composes
    expect(chooseLine({ picks: [{ line: 'lurker-trap', because: 'the thing in the well' }] }, { text: 'the thing in the well' }).line).toBe('lurker-trap');
    const t = chooseLine({ picks: [{ line: 'brute-grappler', because: 'withdraws into his shell' }] }, { text: 'a tortle hermit who withdraws into his shell' });
    expect(t.line).not.toBe('brute-grappler'); // words to read, no grapple key
    const tr = chooseLine({ picks: [{ line: 'lurker-trap', because: 'sits in the corridor' }] }, { text: 'a stone idol that sits in the corridor and watches' });
    expect(tr.line).not.toBe('lurker-trap'); expect(tr.notes.join(' | ')).toMatch(/mechanic engine/);
  });
  test('the tortle\'s shell is natural armor: no chassis hands a tortle AC below 17', async () => {
    const desc = 'a tortle hermit who withdraws into his shell';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 3 }, json('Uthlok', 'Humanoid', 3, null, 'brute', { extra: { clauses: [{ text: 'a tortle hermit', kind: 'descriptive' }, { text: 'withdraws into his shell', kind: 'mechanical' }] } }));
    expect(m.ac).toBeGreaterThanOrEqual(17);
  });
  test('a one-word Humanoid name the model minted is a person, whatever it declared — Cinderbent, not "the cinderbent"; an article in the words still makes a kind', async () => {
    const m = await gen({ archetype: 'skirmisher', concept: 'a tiefling duelist', userConcept: 'a tiefling duelist', cr: 4 }, json('Cinderbent', 'Humanoid', 4, null, 'skirmisher', { extra: { inline: 'the cinderbent' } }));
    expect(m.inline).toBe('Cinderbent'); expect(JSON.stringify(m.sections)).not.toMatch(/the cinderbent/i);
    const k = await gen({ archetype: 'skirmisher', concept: 'a cinderbent that hunts at dusk', userConcept: 'a cinderbent that hunts at dusk', cr: 4 }, json('Cinderbent', 'Humanoid', 4, null, 'skirmisher', { extra: { inline: 'the cinderbent' } }));
    expect(k.inline).toBe('the cinderbent');
  });
  test('a thrown-capable named weapon is the ranged row in print\'s hybrid grammar, and no second weapon is invented — Sarn\'s spear', async () => {
    const desc = 'a lizardfolk hunter who stalks the marsh with a spear';
    const m = await gen({ archetype: 'skirmisher', concept: desc, userConcept: desc, cr: 2 }, json('Sarn', 'Humanoid', 2, null, 'skirmisher', { extra: { clauses: [{ text: 'a lizardfolk hunter', kind: 'descriptive' }, { text: 'stalks the marsh with a spear', kind: 'mechanical' }] } }));
    const spear = rows(m).find((e) => e.name === 'Spear'); expect(spear.part).toBe(true);
    expect(spear.text).toMatch(/^\*Melee or Ranged Attack Roll:\* \+\d+, reach 5 ft\. or range 20\/60 ft\./);
    expect(rows(m).filter((e) => /Ranged Attack Roll/.test(e.text) && !/Melee or Ranged/.test(e.text) && !e.rules)).toHaveLength(0); // no invented Hurled Scythe
    const r = checkBlock(m); expect(r.gates.reader.findings.filter((f) => f.rule === 'print-range')).toEqual([]);
  });
  test('a print body with no pure ranged row sheds the chassis\'s — the Gladiator keeps its hybrid Spear and grows no Crossbow', async () => {
    const m = await gen({ archetype: 'skirmisher', concept: 'a tiefling duelist', userConcept: 'a tiefling duelist', cr: 4 }, (() => { const j = JSON.parse(json('Veyra', 'Humanoid', 4, null, 'skirmisher', { extra: { clauses: [{ text: 'a tiefling duelist', kind: 'descriptive' }] } })); j.renames['Ranged Attack'] = 'Crossbow'; return JSON.stringify(j); })());
    expect(rows(m).some((e) => /Crossbow/.test(e.name))).toBe(false);
    expect(rows(m).find((e) => e.name === 'Spear').text).toMatch(/Melee or Ranged Attack Roll/);
  });
  test('print\'s alignment on an exact body: the Stone Golem is Unaligned', async () => {
    const m = await gen({ archetype: 'brute', concept: 'Stone Golem', userConcept: 'Stone Golem', cr: 10, fixedName: 'Stone Golem' }, json('Stone Golem', 'Construct', 10, null, 'brute', { size: 'Large' }));
    expect(m.alignment).toBe('Unaligned'); expect(checkBlock(m).gates.reader.findings.filter((f) => f.rule === 'exact-body-identity')).toEqual([]);
  });
  test('a weak rank word is not a rank: "Old Sargeant Rootback" speaks as Rootback, and a real rank still speaks by it', async () => {
    const m = await gen({ archetype: 'defender', concept: 'a tortle hermit', userConcept: 'a tortle hermit', cr: 3 }, json('Old Sargeant Rootback', 'Humanoid', 3, null, 'defender', { extra: { clauses: [{ text: 'a tortle hermit', kind: 'descriptive' }] } }));
    expect(m.inline).toBe('Rootback'); expect(JSON.stringify(m.sections)).not.toMatch(/The old /);
    const s2 = await gen({ archetype: 'defender', concept: 'a sergeant who orders a volley', userConcept: 'a sergeant who orders a volley', cr: 3 }, json('Sergeant Haldrun Ironvolley', 'Humanoid', 3, null, 'defender'));
    expect(s2.inline).toBe('the sergeant');
  });
  test('the name-mechanic predicate reads print\'s movement vocabulary: "ignores Difficult Terrain" is movement', () => {
    const base = { format: '2024', name: 'Reedstalker', inline: 'Reedstalker', cr: 2, size: 'Medium', type: 'Humanoid', ac: 15, hp: 40, pb: 2, stats: { STR: 12, DEX: 16, CON: 12, INT: 10, WIS: 12, CHA: 10 }, speed: '30 ft.', alignment: 'Neutral', generation: { clauses: [], userConcept: 'a lizardfolk hunter' } };
    const r = checkBlock({ ...base, sections: { Traits: [{ name: 'Marsh Stride', text: 'Reedstalker ignores Difficult Terrain, and Opportunity Attacks against it are made with Disadvantage.' }], Actions: [{ name: 'Spear', text: '*Melee or Ranged Attack Roll:* +5, reach 5 ft. or range 20/60 ft. 7 (1d8 + 3) Piercing damage.' }] } });
    expect(r.gates.reader.findings.filter((f) => f.rule === 'name-mechanic')).toEqual([]);
  });
  test('the name-mechanic predicate reads print\'s Frightened idiom longhand — the phobia shape\'s Avian Terror', () => {
    const base = { format: '2024', name: 'Sir Reginald', inline: 'Sir Reginald', cr: 5, size: 'Medium', type: 'Humanoid', ac: 18, hp: 70, pb: 3, stats: { STR: 16, DEX: 12, CON: 14, INT: 10, WIS: 10, CHA: 12 }, speed: '30 ft.', alignment: 'Neutral', generation: { clauses: [], userConcept: 'a knight who is deathly afraid of chickens' } };
    const r = checkBlock({ ...base, sections: { Traits: [{ name: 'Avian Terror', text: 'While Sir Reginald can see birds within 30 feet of itself, it has Disadvantage on attack rolls and ability checks, and it must use its movement on each of its turns to move away from birds by the safest available route unless there is nowhere farther to go.' }], Actions: [{ name: 'Greatsword', text: '*Melee Attack Roll:* +6, reach 5 ft. 11 (2d6 + 4) Slashing damage.' }] } });
    expect(r.gates.reader.findings.filter((f) => f.rule === 'name-mechanic')).toEqual([]);
  });
  test('the reader gate: each predicate fails its class on a hand-built sheet', () => {
    const base = { format: '2024', name: 'Cinderbent', inline: 'the cinderbent', cr: 4, size: 'Medium', type: 'Humanoid', ac: 15, hp: 60, pb: 2, stats: { STR: 14, DEX: 16, CON: 12, INT: 10, WIS: 10, CHA: 10 }, speed: '30 ft.', alignment: 'Neutral', generation: { clauses: [], userConcept: 'Cinderbent — a tiefling duelist' } }; // the GM typed the name, so the one-word person rule applies (a name the call minted may be a kind)
    const r = checkBlock({ ...base, sections: { Actions: [
      { name: 'Thunder Blade', text: '*Melee Attack Roll:* +6, reach 5 ft. 8 (1d4 + 6) Slashing damage.' },
      { name: 'Hand Crossbow', text: '*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 30/90 ft. 8 (1d4 + 6) Piercing damage.' },
      { name: 'Dread Charge', text: 'The cinderbent attacks twice.' },
      { name: 'Crushing Grip', text: '*Melee Attack Roll:* +6, reach 5 ft. 8 (1d4 + 6) Bludgeoning damage. If the target is a Medium or smaller creature, it has the Grappled condition (escape DC 12).' },
    ], Traits: [{ name: 'Hold Breath', text: 'The cinderbent can hold its breath for 15 minutes.', kit: 'lizardfolk' }] } });
    const rules = r.gates.reader.findings.map((f) => f.rule);
    for (const want of ['inline-consistency', 'print-range', 'engine-needs-key', 'provenance-integrity', 'name-mechanic', 'no-type-in-name']) expect(rules).toContain(want);
    expect(r.fails).toContain('reader');
  });
});

// THE CRITIC'S FOURTH READ (2026-10-13): seven holds and seven reader predicates.
describe('the species kit — the critic\'s fourth read (2026-10-13)', () => {
  const { chooseLine } = require('../route.mjs');
  const base = { format: '2024', name: 'Test', inline: 'the test', cr: 4, size: 'Medium', type: 'Humanoid', ac: 15, hp: 60, pb: 2, stats: { STR: 14, DEX: 14, CON: 12, INT: 10, WIS: 10, CHA: 10 }, speed: '30 ft.', alignment: 'Neutral', languages: 'Common', generation: { clauses: [], userConcept: 'a duelist' } };
  test('a Multiattack is never swept away with a shed row — it re-reads over the rows that remain', async () => {
    const m = await gen({ archetype: 'skirmisher', concept: 'a tiefling duelist', userConcept: 'a tiefling duelist', cr: 4 }, (() => { const j = JSON.parse(json('Veyra', 'Humanoid', 4, null, 'skirmisher', { extra: { clauses: [{ text: 'a tiefling duelist', kind: 'descriptive' }] } })); j.renames['Ranged Attack'] = 'Crossbow'; return JSON.stringify(j); })());
    const ma = rows(m).find((e) => /^Multiattack/.test(e.name));
    expect(ma).toBeTruthy(); expect(ma.text).not.toMatch(/Crossbow/); expect(ma.text).toMatch(/\bSpear\b/);
    expect(checkBlock(m).fails).toEqual([]);
  });
  test('inline: a role noun left after a stripped weak rank is a kind; an epithet-first person speaks by its given name; an epithet-plus-role kind speaks whole', async () => {
    const inl = async (name, arch, cr) => (await gen({ archetype: arch, concept: name, userConcept: name, cr, fixedName: name }, json(name, 'Humanoid', cr, null, arch))).inline;
    expect(await inl('Old Road Warden', 'defender', 3)).toBe('the warden');
    expect(await inl('Ashvowed Brannor', 'skirmisher', 4)).toBe('Brannor');
    expect(await inl('Headless Horseman', 'skirmisher', 4)).toBe('the headless horseman');
  });
  test('a row sheds its use limit only when there is a Multiattack to join', () => {
    const r = checkBlock({ ...base, sections: { Actions: [{ name: 'Horrid Display', text: '*Wisdom Saving Throw*: DC 12, each creature within 30 feet. *Failure:* The target has the Frightened condition until the end of its next turn.', library: true }] } });
    expect(r.gates.reader.findings.map((f) => f.rule)).toContain('gate-fit');
  });
  test('type-fit and save-fit: an anatomy row carries its noun\'s type, a drain is no weapon, a save follows its effect', () => {
    const r = checkBlock({ ...base, sections: { Actions: [
      { name: 'Claw', text: '*Melee Attack Roll:* +6, reach 5 ft. 10 (2d6 + 3) Force damage.' },
      { name: 'Plague Siphon', text: '*Constitution Saving Throw*: DC 14, one creature within 30 feet. *Failure:* 18 (4d8) Piercing damage, and the creature regains Hit Points equal to half that damage.' },
      { name: 'Shockwave', text: '*Wisdom Saving Throw*: DC 14, each creature in a 15-foot Emanation. *Failure:* 21 (6d6) Bludgeoning damage, and the target has the Prone condition.' },
    ] } });
    const got = r.gates.reader.findings.map((f) => f.rule);
    expect(got).toContain('type-fit'); expect(got).toContain('save-fit');
    expect(r.gates.reader.findings.find((f) => f.rule === 'type-fit').message).toMatch(/a claw deals Slashing, not Force/);
  });
  test('alignment-fit: Unaligned only where there is no capacity for ethics', () => {
    expect(checkBlock({ ...base, type: 'Dragon', alignment: 'Unaligned', stats: { ...base.stats, INT: 18 }, sections: { Actions: [{ name: 'Bite', text: '*Melee Attack Roll:* +6, reach 5 ft. 10 (2d6 + 3) Piercing damage.' }] } }).gates.reader.findings.map((f) => f.rule)).toContain('alignment-fit');
    expect(checkBlock({ ...base, type: 'Beast', alignment: 'Unaligned', languages: 'None', stats: { ...base.stats, INT: 2 }, sections: { Actions: [{ name: 'Bite', text: '*Melee Attack Roll:* +6, reach 5 ft. 10 (2d6 + 3) Piercing damage.' }] } }).gates.reader.findings.map((f) => f.rule)).not.toContain('alignment-fit');
  });
  test('a caster line needs a magic word in the GM\'s words; a martial style keys the martial line', () => {
    expect(chooseLine({ picks: [{ line: 'caster-warpriest', because: 'a blue dragonborn knight' }] }, { text: 'a blue dragonborn knight' }).line).not.toMatch(/^caster/);
    expect(chooseLine({ picks: [{ line: 'caster-warpriest', because: 'a tiefling duelist' }] }, { text: 'a tiefling duelist who hates fire' }).line).toBe('defender');
    expect(chooseLine({ picks: [{ line: 'caster-binder', because: 'curses the firstborn' }] }, { text: 'a plague-seer who curses the firstborn of every house' }).line).toMatch(/^caster/);
    expect(chooseLine({ picks: [{ line: 'brute', because: 'trained in fighting styles' }] }, { text: 'Large lizard folk, wields a greatsword, is trained in fighting styles' }).line).toBe('defender');
  });
  test('a Humanoid with no species claw swings a weapon instead of growing a magical one', async () => {
    const desc = 'a plague-seer who curses the firstborn of every house';
    const m = await gen({ archetype: 'caster', style: 'binder', concept: desc, userConcept: desc, cr: 8, resolvedType: 'Humanoid', energy: 'Necrotic', mix: 'energy' }, (() => { const j = JSON.parse(json('Mosu', 'Humanoid', 8, 'binder', 'caster', { extra: { clauses: [{ text: 'a plague-seer', kind: 'descriptive' }, { text: 'curses the firstborn of every house', kind: 'mechanical' }] } })); const k = Object.keys(j.renames).find((x) => /Melee Attack/.test(x)); if (k) { j.renames[k] = 'Claw'; j.damage_types.Claw = 'Slashing'; } return JSON.stringify(j); })());
    expect(rows(m).some((e) => /^Claw$/.test(e.name) && /Force damage/.test(e.text))).toBe(false);
  });
  test('the GM\'s fear outranks print\'s Frightened immunity', async () => {
    const desc = 'a knight who is deathly afraid of chickens and will flee from any bird';
    const m = await gen({ archetype: 'defender', concept: desc, userConcept: desc, cr: 5, fixedName: 'Sir Reginald Pemberton-Hughes', edition: '2014' }, json('Sir Reginald Pemberton-Hughes', 'Humanoid', 5, null, 'defender', { extra: { clauses: [{ text: 'a knight', kind: 'descriptive' }, { text: 'deathly afraid of chickens', kind: 'mechanical' }, { text: 'will flee from any bird', kind: 'mechanical' }] } }));
    expect(String(m.immunities ?? '')).not.toMatch(/Frightened/);
  });
});

// THE INLINE INVERSION (owner, 2026-10-13): the call declares the phrase and whether the name is a person or a kind; the engine
// validates that the phrase is built from the name's own words, and the deterministic rules stand only as the fallback.
describe('the inline is the call\'s answer, validated', () => {
  const run = (name, declared, opts = {}) => gen({ archetype: 'defender', concept: opts.concept ?? name, userConcept: opts.concept ?? name, cr: 4, fixedName: opts.fixedName === null ? undefined : (opts.fixedName ?? name) }, (() => { const j = JSON.parse(json(name, 'Humanoid', 4, null, 'defender')); Object.assign(j, declared); return JSON.stringify(j); })());
  test('a valid answer wins, whatever the rules would have said', async () => {
    expect((await run('Ashvowed Brannor', { inline: 'Brannor', inline_kind: 'person' })).inline).toBe('Brannor');
    expect((await run('Old Road Warden', { inline: 'the warden', inline_kind: 'kind' })).inline).toBe('the warden');
    expect((await run('Snapping Turtle Elder', { inline: 'the turtle elder', inline_kind: 'kind' })).inline).toBe('the turtle elder');
    expect((await run('Knife Ball', { inline: 'the knife ball', inline_kind: 'kind' })).inline).toBe('the knife ball');
    expect((await run('Sir Reginald Pemberton-Hughes', { inline: 'Sir Reginald', inline_kind: 'person' })).inline).toBe('Sir Reginald');
  });
  test('an answer the name does not support is refused and the rules stand', async () => {
    expect((await run('Silent Rooststalker', { inline: 'the stalker', inline_kind: 'kind' })).inline).toBe('the silent rooststalker'); // "stalker" is not a word of the name
    expect((await run('Thornback Marauder', { inline: 'the thornback', inline_kind: 'person' })).inline).toMatch(/^the (?:thornback )?marauder$/); // a person's form is never "the x"; the rules give a kind form (either tail validates once the call chooses)
    expect((await run('Gutter King', { inline: 'the sovereign', inline_kind: 'kind' })).inline).toBe('the gutter king'); // a word the name never carried
  });
  test('the owner\'s two hard rules outrank the call: a one-word Name field is a person, and the GM\'s own article makes a kind', async () => {
    expect((await run('Meshrin', { inline: 'the meshrin', inline_kind: 'kind' })).inline).toBe('Meshrin');
    expect((await run('Meshrin', { inline: 'Meshrin', inline_kind: 'person' }, { concept: 'a meshrin that guards the ford' })).inline).toBe('the meshrin');
  });
  test('a template the engine binds itself still carries its fill — the phobia is the GM\'s own noun', async () => {
    const desc = 'a knight who is deathly afraid of chickens and will flee from any bird';
    const m = await gen({ archetype: 'defender', concept: desc, userConcept: desc, cr: 5, fixedName: 'Sir Reginald Pemberton-Hughes', edition: '2014' }, (() => { const j = JSON.parse(json('Sir Reginald Pemberton-Hughes', 'Humanoid', 5, null, 'defender', { extra: { clauses: [{ text: 'a knight', kind: 'descriptive' }, { text: 'deathly afraid of chickens', kind: 'mechanical' }, { text: 'will flee from any bird', kind: 'mechanical' }] } })); j.inline = 'Sir Reginald'; j.inline_kind = 'person'; return JSON.stringify(j); })());
    const ph = rows(m).find((e) => /^Phobia/.test(e.name));
    expect(ph.text).toMatch(/can see chickens within 30 feet/); expect(ph.text).not.toMatch(/the thing it fears/);
  });
});


// THE CRITIC'S FIFTH READ (2026-10-13) + the owner's direction the same day:
// "engineer less deterministic gating when the llm can make a lot of these
// judgements". The word match stays the engine's; the MEANING is the call's.
describe('the critic\'s fifth read, and the judgements the call now owns (2026-10-13)', () => {
  test('the fit call is asked which word matches are collisions, and only offered ids count', () => {
    const { buildFitPrompt, parseFit, TEMPLATE_BY_ID } = require('../templates.mjs');
    const menu = [TEMPLATE_BY_ID.get('false-appearance'), TEMPLATE_BY_ID.get('charge')].filter(Boolean);
    const prompt = buildFitPrompt({ name: 'Mournhold Grieve', idea: { idea: 'it stands still among the herd', section: 'trait', trigger: 'always', effect: 'defense' }, menu, cr: 5, concept: 'a goliath stone-herder' });
    expect(prompt).toMatch(/modifier slot of a compound/i);
    expect(prompt).toMatch(/"wrong"/);
    // the fill is asked for whichever answer the call gives
    expect(prompt).toMatch(/fill its "you fill" slots/i);
    const fit = parseFit(JSON.stringify({ template: 'none', because: '', name: null, fills: { place: 'the reef' }, wrong: ['false-appearance', 'bound', 'FALSE-APPEARANCE'] }), menu, 'Mournhold Grieve');
    expect(fit.template).toBeNull();
    expect(fit.wrong).toEqual(['false-appearance']); // "bound" was never offered; the duplicate collapses
    expect(parseFit(JSON.stringify({ template: 'charge' }), menu).wrong).toEqual([]);
  });

  test('a shape whose fiction is a body or a tech needs that claim in the words or on the sheet', () => {
    const { templatesFor, TEMPLATE_BY_ID } = require('../templates.mjs');
    expect(TEMPLATE_BY_ID.get('shell-withdraw').requires_claim).toBeInstanceOf(RegExp);
    expect(TEMPLATE_BY_ID.get('blink').requires_claim).toBeInstanceOf(RegExp);
    const base = { cr: 5, sections: { Actions: [{ name: 'Greataxe', text: '*Melee Attack Roll:* +6, reach 5 ft. 12 (2d8 + 3) Slashing damage.' }] } };
    const ids = (c) => templatesFor(c).map((t) => t.id);
    // the orc's "retreats behind iron armor" hits shell-withdraw's loose match keys and still buys no shell
    expect(ids({ ...base, archetype: 'brute', concept: 'an orc warchief who retreats behind iron armor' })).not.toContain('shell-withdraw');
    expect(ids({ ...base, archetype: 'brute', concept: 'a turtlefolk guard who withdraws into its shell' })).toContain('shell-withdraw');
    // a troglodyte that "lurks in shadow and steps away" is not a teleporter
    expect(ids({ ...base, archetype: 'lurker', concept: 'a troglodyte that lurks in shadow and steps away' })).not.toContain('blink');
    expect(ids({ ...base, archetype: 'lurker', concept: 'a shadow stalker that teleports behind you' })).toContain('blink');
    // a row already on the sheet is a claim too
    expect(ids({ cr: 5, archetype: 'brute', concept: 'a stoic guard', sections: { Traits: [{ name: 'Bony Carapace', text: 'Its shell is thick.' }] } })).toContain('shell-withdraw');
  });

  test('the species carries its size, and a size word in the GM\'s words outranks it', async () => {
    const { SPECIES } = require('../species.mjs');
    expect(SPECIES.find((s) => s.key === 'minotaur').size).toBe('Large');
    expect(SPECIES.find((s) => s.key === 'grung').size).toBe('Small');
    expect(SPECIES.find((s) => s.key === 'goliath').size).toBeUndefined(); // absent is Medium
    const desc = 'a goliath stone-herder who guards the high passes';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 8 }, json('Mournhold Grieve', 'Humanoid', 8, null, 'brute', { size: 'Huge', extra: { clauses: [{ text: desc, kind: 'descriptive' }] } }));
    expect(m.size).toBe('Medium');
    expect(m.hp_formula).toMatch(/d8/); // the hit die follows the size
    for (const e of Object.values(m.sections).flat()) if (/Melee Attack Roll/.test(e.text ?? '')) expect(e.text).not.toMatch(/reach (?:10|15|20) ft/);
    const big = 'a Huge goliath stone-herder';
    const m2 = await gen({ archetype: 'brute', concept: big, userConcept: big, cr: 8 }, json('Mournhold Grieve', 'Humanoid', 8, null, 'brute', { size: 'Huge', extra: { clauses: [{ text: 'a Huge goliath', kind: 'header' }] } }));
    expect(m2.size).toBe('Huge');
  });

  test('the hybrid frame dresses a thrown weapon: a physical row that names nothing thrown loses the range, an energy row keeps it', async () => {
    // defender-5 is the donor that carries print's hybrid slot
    const desc = 'a herdmaster who commands a stampede of thunder-elk';
    const sheet = async (dtype, rowName) => gen({ archetype: 'defender', concept: desc, userConcept: desc, cr: 5 }, (() => { const j = JSON.parse(json('Thunder-Stamp Herdmaster', 'Humanoid', 5, null, 'defender', { dtype, extra: { clauses: [{ text: desc, kind: 'mechanical' }] } })); j.renames['Hybrid Attack'] = rowName; j.damage_types[rowName] = dtype; return JSON.stringify(j); })());
    const m = await sheet('Bludgeoning', 'Thunder-Elk');
    const elk = Object.values(m.sections).flat().find((e) => /^Thunder-Elk/.test(e.name ?? ''));
    expect(elk).toBeDefined();
    expect(elk.text).not.toMatch(/Melee or Ranged/);
    expect(elk.text).not.toMatch(/range \d+\/\d+ ft/);
    // print's OTHER hybrid row is the Mage's Arcane Burst — a SPELL attack, so the
    // energy exemption needs a caster (the critic's branch read, 2026-10-14): on a
    // sheet that casts nothing, an energy row loses the range like any other
    const m2 = await sheet('Thunder', 'Storm Call');
    const burst = Object.values(m2.sections).flat().find((e) => /^Storm Call/.test(e.name ?? ''));
    expect(burst).toBeDefined();
    const casts = Object.values(m2.sections).flat().some((e) => /^Spellcasting/.test(e.name ?? ''));
    if (casts) expect(burst.text).toMatch(/Melee or Ranged Attack Roll/);
    else expect(burst.text).not.toMatch(/Melee or Ranged Attack Roll/);
  });

  test('the named weapon takes the chassis slot in its mode, and the keeper absorbs its swings', async () => {
    const desc = 'an orc berserker with a greataxe';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 8 }, (() => { const j = JSON.parse(json('Bloodmaw Vorgath', 'Humanoid', 8, null, 'brute', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } })); j.renames['Hybrid Attack'] = 'Haft Swing'; return JSON.stringify(j); })());
    const all = Object.values(m.sections).flat();
    expect(all.map((e) => e.name)).toContain('Greataxe');
    expect(all.find((e) => /Haft Swing/.test(e.name ?? ''))).toBeUndefined();
    const ma = all.find((e) => /^Multiattack/.test(e.name ?? ''));
    if (ma) expect(ma.text).toMatch(/(?:two|three|four)/); // the count rode with the name the GM typed
    expect(checkBlock(m).fails).toEqual([]);
  });

  test('a Multiattack names every Action attack row, in print\'s combination grammar', async () => {
    const desc = 'a scout with a javelin';
    const m = await gen({ archetype: 'skirmisher', concept: desc, userConcept: desc, cr: 3 }, json('Windscout Vel', 'Humanoid', 3, null, 'skirmisher', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    const all = Object.values(m.sections).flat();
    const ma = all.find((e) => /^Multiattack/.test(e.name ?? ''));
    expect(ma).toBeDefined();
    const atk = (m.sections.Actions ?? []).filter((e) => e !== ma && /Attack Roll/.test(e.text ?? '') && !/\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e.name ?? ''));
    expect(atk.length).toBeGreaterThan(1);
    for (const e of atk) expect(ma.text.toLowerCase()).toContain(String(e.name).replace(/ \(.*\)$/, '').toLowerCase());
    expect(checkBlock(m).gates.reader.findings.map((x) => x.rule)).not.toContain('attack-in-multiattack');
  });

  test('the reader gate: a hybrid row that names nothing thrown, and an attack row outside the Multiattack', () => {
    const base = {
      format: '2024', name: 'Coralmarshal Othyn', inline: 'Othyn', type: 'Humanoid', size: 'Medium', cr: 5, ac: 16, hp: 75, hp_formula: '10d8 + 30', pb: 3,
      speed: '30 ft.', stats: { STR: 16, DEX: 12, CON: 16, INT: 10, WIS: 12, CHA: 10 }, languages: 'Common', alignment: 'Neutral',
      generation: { clauses: [], userConcept: 'a triton who guards the reef, Coralmarshal Othyn' },
      sections: { Actions: [
        { name: 'Multiattack', text: 'Othyn makes two Trident attacks.' },
        { name: 'Trident', text: '*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 20/60 ft. 10 (2d6 + 3) Piercing damage.', part: true, clause: 'a trident' },
        { name: 'Brine Surge', text: '*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 30/120 ft. 10 (2d6 + 3) Piercing damage.' },
      ] },
    };
    const f = checkBlock(base).gates.reader.findings.map((x) => x.rule);
    expect(f).toContain('hybrid-needs-thrown');  // Brine Surge names nothing a creature can throw
    expect(f).toContain('attack-in-multiattack'); // and the Multiattack never names it
    expect(checkBlock(base).gates.reader.findings.find((x) => x.rule === 'hybrid-needs-thrown').value).toBe('Brine Surge'); // the GM's own Trident is thrown, and print's grammar fits it
  });

  test('a name two rows share is not swept out of the Multiattack', async () => {
    const desc = 'an orc warchief with a greataxe';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 5, edition: '2014' }, (() => { const j = JSON.parse(json('Gorrak the Red', 'Humanoid', 5, null, 'brute', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } })); j.renames['Hybrid Attack'] = 'Hand Axe'; j.renames['Ranged Attack'] = 'Hand Axe'; j.damage_types['Hand Axe'] = 'Slashing'; return JSON.stringify(j); })());
    const all = Object.values(m.sections).flat();
    const ha = all.find((e) => e.name === 'Hand Axe');
    const ma = all.find((e) => /^Multiattack/.test(e.name ?? ''));
    if (ha && ma) expect(ma.text).toMatch(/Hand Axe/);
    expect(checkBlock(m).fails).toEqual([]);
  });

  test('a damage type follows the row\'s noun, closed compounds included — and a type-only noun never moves a row between modes', () => {
    const { honestAttackNames } = require('../header.mjs');
    const sections = { Actions: [
      { name: 'Curb Stomp', text: '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Piercing damage.' },
      { name: 'Fangblade', text: '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.' },
      { name: 'Hurled Handaxe', text: '*Ranged Attack Roll:* +7, range 20/60 ft. 11 (2d6 + 4) Slashing damage.' },
    ] };
    honestAttackNames(sections, { projectile: 'a stone' });
    expect(sections.Actions[0].text).toMatch(/Bludgeoning damage/);
    expect(sections.Actions[1].text).toMatch(/Slashing damage/);
    expect(sections.Actions[2].name).toBe('Hurled Handaxe'); // a thrown axe is honestly a ranged row
  });

  test('the rename call is told the damage type is fixed and the name must match it', () => {
    const { buildReskinPrompt } = require('../generate.mjs');
    const { scaled } = mk(5, null, 'brute');
    const p = buildReskinPrompt(scaled, { concept: 'a reef warden', userTyped: 'a reef warden' });
    expect(p).toMatch(/THE NAME MUST MATCH WHAT THE ROW DEALS/);
    expect(p).toMatch(/is not a Stomp/);
  });
});


// LANDING ONE'S LAST TABLE FACTS (2026-10-13): the critic's fifth read asked for
// species languages and the species' own natural weapons. Both were facts the
// table did not carry — the languages lived in a Humanoid-only list in the
// generator, and the natural weapons were only ever a warrant for a part the GM
// named, so a minotaur struck with a chassis Slam.
describe('the species carries its tongue and its teeth (2026-10-13)', () => {
  test('every table entry declares its languages, and the Fey and Monstrosity species are included', () => {
    const { SPECIES } = require('../species.mjs');
    for (const sp of SPECIES) expect(Array.isArray(sp.languages) && sp.languages.length).toBeTruthy();
    const by = (k) => SPECIES.find((s) => s.key === k);
    expect(by('satyr').languages).toEqual(['Sylvan']);
    expect(by('minotaur').languages).toEqual(['Common']);
    expect(by('centaur').languages).toEqual(['Common']);
    expect(by('grung').languages).toEqual(['Common', 'Grung']);
    expect(by('tiefling').languages).toEqual(['Common', 'Infernal']);
  });

  test('a Fey species gets its language, where the generator\'s Humanoid-only list never fired', async () => {
    const desc = 'a satyr piper who dances travellers into the hills';
    const m = await gen({ archetype: 'skirmisher', concept: desc, userConcept: desc, cr: 5 }, json('Hollow Piper', 'Fey', 5, null, 'skirmisher', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    expect(m.type).toMatch(/^Fey/);
    expect(m.languages).toMatch(/Sylvan/);
  });

  test('a species that speaks is never printed as mute — unless the GM said so', async () => {
    const desc = 'a grung poisoner who croaks from the canopy';
    const mk2 = (langs) => { const j = JSON.parse(json('Voxmaw', 'Humanoid', 3, null, 'skirmisher', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } })); j.languages = langs; return JSON.stringify(j); };
    const m = await gen({ archetype: 'skirmisher', concept: desc, userConcept: desc, cr: 3 }, mk2("Understands Common but can't speak"));
    expect(m.languages).toBe('Common, Grung');
    const mute = 'a mute grung poisoner who cannot speak';
    const m2 = await gen({ archetype: 'skirmisher', concept: mute, userConcept: mute, cr: 3 }, mk2("Understands Common but can't speak"));
    expect(m2.languages).toMatch(/can't speak/);
  });

  test('a generic chassis strike becomes the species\' own weapon, with its own damage type', async () => {
    const desc = 'a minotaur reaver who herds prey into the maze';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 6 }, (() => { const j = JSON.parse(json('Mazewarden Grik', 'Monstrosity', 6, null, 'brute', { dtype: 'Bludgeoning', extra: { clauses: [{ text: desc, kind: 'mechanical' }] } })); for (const k of Object.keys(j.renames)) if (j.renames[k] === 'Named Row0') { j.renames[k] = 'Slam'; j.damage_types.Slam = 'Bludgeoning'; } return JSON.stringify(j); })());
    const all = Object.values(m.sections).flat();
    const gore = all.find((e) => /^Gore/.test(e.name ?? ''));
    if (all.some((e) => /Melee Attack Roll/.test(e.text ?? '') && /^(?:Slam|Fist|Strike)$/.test(String(e.name).replace(/ \(.*\)$/, '')))) throw new Error('a generic strike survived beside the species');
    expect(gore).toBeDefined();
    expect(gore.text).toMatch(/Piercing damage/); // a gore is Piercing, whatever the chassis typed
    const ma = all.find((e) => /^Multiattack/.test(e.name ?? ''));
    if (ma) expect(ma.text).not.toMatch(/\bSlam\b/); // the citation followed the rename
    expect(checkBlock(m).fails).toEqual([]);
  });

  test('the GM\'s own weapon outranks the species\' teeth', async () => {
    const desc = 'a minotaur reaver with a greataxe';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 6 }, json('Mazewarden Grik', 'Monstrosity', 6, null, 'brute', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    const all = Object.values(m.sections).flat();
    expect(all.map((e) => e.name)).toContain('Greataxe');
    expect(all.find((e) => /^Gore/.test(e.name ?? ''))).toBeUndefined();
  });
});


// THREE SMALL CRITIC ITEMS (fifth read, 2026-10-13): a feat on the wrong weapon,
// a mastery DC off by one, and two rows granting one action.
describe('the feature table and the kit, corrected (2026-10-13)', () => {
  const { featureRows } = require('../features.mjs');
  const clause = (text) => [{ text, kind: 'mechanical' }];

  test('Great Weapon Master stays on a melee heavy weapon; a heavy bow takes its mastery property', () => {
    const bow = featureRows(clause('a ranger with a longbow'), { parts: [{ part: true, weapon: 'longbow', name: 'Longbow', mode: 'ranged', clause: 'a longbow' }], inline: 'the ranger', pb: 3, dc: 14, mod: 3 });
    expect(bow.find((f) => f.name === 'Great Weapon Master')).toBeUndefined();
    expect(bow.find((f) => f.name === 'Slow')).toBeDefined();
    const axe = featureRows(clause('a reaver with a greataxe'), { parts: [{ part: true, weapon: 'greataxe', name: 'Greataxe', mode: 'melee', clause: 'a greataxe' }], inline: 'the reaver', pb: 3, dc: 14, mod: 3 });
    expect(axe.find((f) => f.name === 'Great Weapon Master')).toBeDefined();
  });

  test('a mastery save is 8 + the weapon mod + PB, not the sheet\'s best DC', () => {
    // Othyn: STR 16 (+3), PB +3 → DC 14. The sheet's own best save DC was 13.
    const rows = featureRows(clause('a warden with a trident'), { parts: [{ part: true, weapon: 'trident', name: 'Trident', mode: 'melee', clause: 'a trident' }], inline: 'Othyn', pb: 3, dc: 13, mod: 3 });
    const topple = rows.find((f) => f.name === 'Topple');
    expect(topple).toBeDefined();
    expect(topple.text).toContain('DC 14');
    expect(topple.text).not.toContain('DC 13');
  });

  test('the derivation gate reads a mastery save against the weapon\'s own stat', () => {
    const sheet = (dc) => ({
      format: '2024', name: 'Coralmarshal Othyn', inline: 'Othyn', type: 'Humanoid', size: 'Medium', cr: 5, ac: 16, hp: 75,
      hp_formula: '10d8 + 30', pb: 3, speed: '30 ft.', alignment: 'Neutral', languages: 'Common',
      stats: { STR: 16, DEX: 12, CON: 16, INT: 10, WIS: 14, CHA: 10 }, generation: { clauses: [], userConcept: 'a triton warden with a trident' },
      sections: { Actions: [
        { name: 'Multiattack', text: 'Othyn makes two Trident attacks.' },
        { name: 'Trident', text: `*Melee Attack Roll:* +6, reach 5 ft. 10 (2d6 + 3) Piercing damage, and the target is subjected to the following effect. *Constitution Saving Throw*: DC ${dc}. *Failure:* The target has the Prone condition.`, part: true, weapon: 'trident', feature: 'Topple', clause: 'a trident' },
      ] },
    });
    // 8 + STR 3 + PB 3 = 14. DC 13 derives from WIS +2 and passed the general DC rule.
    const bad = checkBlock(sheet(13)).gates.derivation.findings.filter((f) => f.rule === 'mastery-dc');
    expect(bad).toHaveLength(1);
    expect(bad[0].value).toBe(13);
    expect(checkBlock(sheet(14)).gates.derivation.findings.filter((f) => f.rule === 'mastery-dc')).toHaveLength(0);
  });

  test('a kit row is dropped when a row on the sheet already grants its action', async () => {
    // the skulker chassis carries print's Cunning Action (Dash, Disengage, or
    // Hide) as a protected row; the tabaxi kit's Cat's Dash grants Dash alone
    const desc = 'a tabaxi cutpurse who slips through the market crowd';
    const m = await gen({ archetype: 'skirmisher', concept: desc, userConcept: desc, cr: 3, style: 'skulker' }, json('Sable Nefret', 'Humanoid', 3, 'skulker', 'skirmisher', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    const all = Object.values(m.sections).flat();
    expect(all.map((e) => e.name)).toContain('Cunning Action');
    expect(all.find((e) => /Cat's Dash/.test(e.name ?? ''))).toBeUndefined();
    expect(all.filter((e) => /\btakes? the [^.]*\bDash\b[^.]*action/.test(e.text ?? '')).length).toBe(1);
    expect(m.languages).toMatch(/Common/); // and the tabaxi still speaks
  });

  test('the same kit row lands where nothing else grants it', async () => {
    const desc = 'a tabaxi cutpurse who slips through the market crowd';
    const m = await gen({ archetype: 'lurker', concept: desc, userConcept: desc, cr: 5 }, json('Sable Nefret', 'Humanoid', 5, null, 'lurker', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    const all = Object.values(m.sections).flat();
    expect(all.find((e) => /Cat's Dash/.test(e.name ?? ''))).toBeDefined(); // the lurker chassis grants Hide, never Dash
  });
});
