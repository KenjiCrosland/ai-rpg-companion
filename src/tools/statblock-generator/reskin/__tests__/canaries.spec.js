// THE CANARIES' FIRST READ (critic, 2026-10-12): what the ten regression canaries exposed before the reference could be trusted —
// print borrows above print's CR not re-solving (the Wolf, the Ogre), an exact body's ranged row off the chassis (the Stone Golem's
// Force Bolt), the Name field's short form taking a first word ("Headless", "Sir"), a seed with no provenance (the Kobold's Vanish),
// a Piercing Slam, the kit table's "splint" over print's chain shirt, and a translated block the checker could not read.
import { generateReskin, renameKeysOf } from '../generate.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';
import { checkBlock, fidelityOf, dmgRead } from '../checker.mjs';
import { toLegacyModel } from '../../format-2024/generate.mjs';
import { honestAttackNames } from '../header.mjs';

const mk = (cr, style, arch) => { const scaled = scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [] }); const renames = { Teleport: 'Blink Step', 'Ranged Attack': 'Hurl', 'Hybrid Attack': 'Hybrid Strike' }; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; }); const typed = [...Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name), 'Hurl', 'Hybrid Strike']; return { scaled, renames, typed }; };
const json = (name, type, cr, style, arch, over = {}) => { const { scaled, renames, typed } = mk(cr, style, arch); return JSON.stringify({ name, type, size: over.size ?? 'Medium', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, over.dtype ?? 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 10 feet. *Failure:* The target has the Prone condition.`, ...(over.extra ?? {}) }); };
const gen = (opts, answer) => generateReskin({ mechanics: [], ...opts }, async () => answer);
const rows = (m) => Object.values(m.sections).flat();
const avgOf = (e) => Number(/(\d+) \(\d+d\d+/.exec(e.text)?.[1]);

describe('the canaries\' first read (2026-10-12)', () => {
  test('an exact print body ABOVE print\'s CR keeps the chassis\'s solved dice — a CR 5 wolf is not the Wolf\'s 1d6', async () => {
    const m = await gen({ archetype: 'skirmisher', concept: 'a wolf', userConcept: 'a wolf', cr: 5 }, json('Timber Wolf', 'Beast', 5, null, 'skirmisher', { dtype: 'Piercing' }));
    const bite = rows(m).find((e) => e.name === 'Bite');
    expect(bite.text).not.toMatch(/1d6/); expect(avgOf(bite)).toBeGreaterThanOrEqual(12);
    expect(bite.text).toMatch(/Piercing damage\. If the target is a Medium or smaller creature, it has the Prone condition/); // print's type and rider still ride
    expect(dmgRead(m).sustained).toBeGreaterThanOrEqual(28); // two Bites against a CR 5 card of ~40, not 12
  });
  test('an exact body AT print\'s CR carries print\'s own ranged row verbatim — the Stone Golem\'s Force Bolt is +9, 22 (4d10) at 120 ft.', async () => {
    const m = await gen({ archetype: 'brute', concept: 'Stone Golem', userConcept: 'Stone Golem', cr: 10, fixedName: 'Stone Golem' }, json('Stone Golem', 'Construct', 10, null, 'brute', { size: 'Large' }));
    const bolt = rows(m).find((e) => e.name === 'Force Bolt');
    expect(bolt.text).toMatch(/^\*Ranged Attack Roll:\* \+9, range 120 ft\. 22 \(4d10\) Force damage\./);
    expect(rows(m).find((e) => e.name === 'Slam').text).toMatch(/\+10, reach 5 ft\. 15 \(2d8 \+ 6\) Bludgeoning damage plus 9 \(2d8\) Force damage/);
    expect(checkBlock(m).fails).toEqual([]);
  });
  test('print\'s array is RAISE-ONLY above print\'s CR, a part keeps the slot\'s whole damage, and a slam deals Bludgeoning — the big ogre at CR 5', async () => {
    const desc = 'big ogre with a club, cr 5';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 5 }, json('Clubtooth Marrowbelly', 'Giant', 5, null, 'brute', { size: 'Large', extra: { clauses: [{ text: 'big ogre with a club', kind: 'mechanical' }, { text: 'cr 5', kind: 'header' }] } }));
    expect(m.stats.STR).toBe(19); // print's 19, not fitted down to 16
    const club = rows(m).find((e) => e.name === 'Club'); const slam = rows(m).find((e) => e.name === 'Slam');
    expect(club.text).toMatch(/\+7, reach/); expect(avgOf(club)).toBeGreaterThanOrEqual(19); // the brute's 12 + 7 a hit, not 12
    expect(slam.text).toMatch(/Bludgeoning damage/); expect(slam.text).not.toMatch(/Piercing/);
    const r = checkBlock(m); expect(r.fails).toEqual([]); expect(r.fidelity.dropped).toEqual([]); // "cr 5" is honored: the sheet IS CR 5
  });
  test('the Name field\'s short form: a person by the given name, an honorific by its name, an epithet by its noun', async () => {
    const inl = async (name, arch, cr) => (await gen({ archetype: arch, concept: name, userConcept: name, cr, fixedName: name }, json(name, 'Humanoid', cr, null, arch))).inline;
    expect(await inl('Headless Horseman', 'skirmisher', 4)).toBe('the headless horseman'); // a two-word kind speaks whole, as print does (owner, 2026-10-12)
    expect(await inl('Sir Reginald Pemberton-Hughes', 'defender', 5)).toBe('Sir Reginald');
    expect(await inl('Gormak Skullsunder', 'brute', 5)).toBe('Gormak');
    expect(await inl('Meshrin', 'defender', 8)).toBe('Meshrin');
  });
  test('a seed the user\'s words drew carries them as provenance — the Kobold\'s Vanish covers "Can turn invisible once per day"', async () => {
    const desc = 'Kobold — Can turn invisible once per day';
    const m = await gen({ archetype: 'skirmisher', concept: desc, userConcept: desc, cr: 0.25, fixedName: 'Kobold' }, json('Kobold', 'Humanoid', 0.25, null, 'skirmisher', { size: 'Small', extra: { clauses: [{ text: 'Can turn invisible once per day', kind: 'mechanical' }] } }));
    const vanish = rows(m).find((e) => /Invisibility/.test(e.text));
    expect(vanish.boundKeys).toEqual(expect.arrayContaining(['invisible']));
    const fid = fidelityOf(m, m, { userConcept: desc, donorId: m.generation.donor });
    expect(fid.dropped).not.toEqual(expect.arrayContaining([expect.stringMatching(/invisible/)]));
  });
  test('print\'s Gear line names the 2014 armor — the Goblin Boss is chain shirt and shield, not the kit table\'s splint', async () => {
    const desc = 'Goblin Boss — riding a worg';
    const m = await gen({ archetype: 'skirmisher', style: 'mounted', concept: desc, userConcept: desc, cr: 1, fixedName: 'Goblin Boss', edition: '2014' }, json('Goblin Boss', 'Humanoid', 1, 'mounted', 'skirmisher', { size: 'Small' }));
    expect(m.ac).toBe(17); expect(m.ac_gear).toBe('chain shirt, shield');
    expect(toLegacyModel(m).armor_class).toBe('17 (chain shirt, shield)');
  });
  test('a translated block is checked on its English twin — the same gates, the same read', async () => {
    const en = await gen({ archetype: 'brute', concept: 'Stone Golem', userConcept: 'Stone Golem', cr: 10, fixedName: 'Stone Golem' }, json('Stone Golem', 'Construct', 10, null, 'brute', { size: 'Large' }));
    const de = JSON.parse(JSON.stringify(en)); for (const es of Object.values(de.sections)) for (const e of es) { e.name = `Angriff ${e.name}`; e.text = e.text.replace(/Melee Attack Roll/g, 'Nahkampfangriffswurf').replace(/Ranged Attack Roll/g, 'Fernkampfangriffswurf').replace(/damage/g, 'Schaden'); }
    de.english = en; de.language = 'de';
    const rDe = checkBlock(de); const rEn = checkBlock(en);
    expect(rDe.fails).toEqual([]); expect(rDe.gates.derivation.status).toBe(rEn.gates.derivation.status);
    expect(dmgRead(de.english).sustained).toBe(dmgRead(en).sustained);
  });
  test('honestAttackNames: a melee row renamed Slam deals Bludgeoning', () => {
    const sections = { Actions: [{ name: 'Javelin', text: '*Melee Attack Roll:* +6, reach 5 ft. 12 (2d8 + 3) Piercing damage.' }] };
    const changes = honestAttackNames(sections, {});
    expect(sections.Actions[0].name).toBe('Slam'); expect(sections.Actions[0].text).toMatch(/Bludgeoning damage/);
    expect(changes.map((c) => c.why)).toEqual(['javelin is a ranged noun on a melee row', 'a slam deals Bludgeoning, not Piercing']);
  });
});

// THE SPRINT FEATURE BATCH'S FIRST RUN (features-2026-10-2026-10-12T17-07-33): the parts group carried the defects — weapons that never
// landed, a ranged part on the melee slot, a lack unread, "the sir", "Thornback", provenance missing on feature rows.
describe('the sprint run\'s fix round (2026-10-12)', () => {
  const { partRows, groundedClauses } = require('../generate.mjs');
  test('the part reader: a wielded weapon inside a header clause, two weapons in one clause, a descriptive clause past a wield cue, plurals, kick and headbutt; a head clause with no cue yields nothing', () => {
    expect(partRows([{ text: 'Okhra the Hewer — A Large ogre champion wielding a huge two-handed greataxe with crushing force', kind: 'header' }, { text: 'she has a tusked bite', kind: 'mechanical' }], { cap: 4 }).map((p) => `${p.name}/${p.type}`)).toEqual(['Greataxe/Slashing', 'Tusked Bite/Piercing']); // not "Two-handed Greataxe", not Force
    expect(partRows([{ text: 'a vampire hunter with a silvered rapier and a crossbow', kind: 'mechanical' }], { cap: 4 }).map((p) => `${p.name}/${p.mode}`)).toEqual(['Silvered Rapier/melee', 'Crossbow/ranged']);
    expect(partRows([{ text: 'a bugbear brute with a flail', kind: 'descriptive', head: true }, { text: 'a kick that sends foes sprawling', kind: 'mechanical' }], { cap: 4 }).map((p) => `${p.name}/${p.rider}`)).toEqual(['Flail/null', 'Kick/Prone']);
    expect(partRows([{ text: 'with two longswords', kind: 'mechanical' }, { text: 'a crushing headbutt', kind: 'mechanical' }], { cap: 4 }).map((p) => `${p.name}/${p.type}`)).toEqual(['Longsword/Slashing', 'Crushing Headbutt/Bludgeoning']);
    expect(partRows([{ text: 'knife ball', kind: 'descriptive', head: true }], { cap: 4 })).toEqual([]); // a creature-only prompt stays the template's
    expect(groundedClauses([], 'Kobold — throws oil flasks that burn', () => {}).map((c) => c.text)).toEqual(['Kobold — throws oil flasks that burn']); // a one-word relative is not a clause
  });
  test('a ranged part takes a ranged or hybrid slot, never the melee slot; a chassis row the model named the same leaves — Dame Oriel keeps her rapier and one Crossbow', async () => {
    const desc = 'Dame Oriel Vance — a vampire hunter with a silvered rapier and a crossbow';
    const m = await gen({ archetype: 'defender', concept: desc, userConcept: desc, cr: 7, fixedName: 'Dame Oriel Vance', edition: '2014' }, (() => { const j = JSON.parse(json('Dame Oriel Vance', 'Humanoid', 7, null, 'defender', { extra: { clauses: [{ text: 'a vampire hunter with a silvered rapier and a crossbow', kind: 'mechanical' }] } })); j.renames['Hybrid Attack'] = 'Crossbow'; return JSON.stringify(j); })());
    const names = m.sections.Actions.map((e) => e.name);
    expect(names.filter((n) => n === 'Crossbow')).toHaveLength(1); expect(names).toContain('Silvered Rapier');
    expect(rows(m).find((e) => e.name === 'Silvered Rapier').text).toMatch(/^\*Melee Attack Roll:\*/); expect(rows(m).find((e) => e.name === 'Crossbow').text).toMatch(/^\*Ranged Attack Roll:\*/);
    expect(m.inline).toBe('Dame Oriel'); expect(JSON.stringify(m.sections)).not.toMatch(/\bDame has\b/); // the feature table's short form is the rows' short form
    expect(checkBlock(m).fails).toEqual([]);
  });
  test('a lack of a whole mode drops that mode\'s rows and the Multiattack re-reads — the hill giant archer has no melee attack', async () => {
    const desc = 'a hill giant archer who has no melee attack at all and shoots from the ridge';
    const m = await gen({ archetype: 'skirmisher', style: 'archer', concept: desc, userConcept: desc, cr: 7 }, json('Ridgefire Scorn', 'Giant', 7, 'archer', 'skirmisher', { size: 'Huge', extra: { clauses: [{ text: 'a hill giant archer', kind: 'mechanical' }, { text: 'has no melee attack at all', kind: 'mechanical' }, { text: 'shoots from the ridge', kind: 'descriptive' }] } }));
    expect(rows(m).some((e) => /^\*Melee Attack Roll/.test(e.text))).toBe(false);
    expect(rows(m).find((e) => e.name === 'Multiattack').text).toMatch(/makes two \w[\w' -]* attacks\.$/);
    expect(checkBlock(m).fidelity.dropped).toEqual([]);
  });
  test('a riposte asked for by name lands beside a named style; Sneak Attack binds the clause that says sneak attack', async () => {
    const salute = 'a six-armed stone giant duelist trained in the dueling style, with two longswords, a crushing headbutt, and a riposte for anyone who misses her';
    const m = await gen({ archetype: 'brute', concept: salute, userConcept: salute, cr: 18 }, json('Salute of Stone', 'Giant', 18, null, 'brute', { size: 'Huge', extra: { clauses: [{ text: 'a six-armed stone giant duelist trained in the dueling style', kind: 'mechanical' }, { text: 'with two longswords', kind: 'mechanical' }, { text: 'a crushing headbutt', kind: 'mechanical' }, { text: 'a riposte for anyone who misses her', kind: 'mechanical' }] } }));
    expect(rows(m).map((e) => e.name)).toEqual(expect.arrayContaining(['Dueling', 'Longsword', 'Crushing Headbutt', 'Riposte']));
    expect(checkBlock(m).fidelity.dropped).toEqual([]);
    const vell = 'Vell — A halfling assassin with a dagger and a hand crossbow who stabs exposed foes for a sneak attack and vanishes into shadows.';
    const v = await gen({ archetype: 'skirmisher', style: 'skulker', concept: vell, userConcept: vell, cr: 5, fixedName: 'Vell', edition: '2014' }, json('Vell', 'Humanoid', 5, 'skulker', 'skirmisher', { size: 'Small', extra: { clauses: [{ text: 'A halfling assassin with a dagger', kind: 'mechanical' }, { text: 'a hand crossbow', kind: 'mechanical' }, { text: 'stabs exposed foes for a sneak attack', kind: 'mechanical' }, { text: 'vanishes into shadows', kind: 'mechanical' }] } }));
    expect(rows(v).find((e) => e.name === 'Sneak Attack').clause).toBe('stabs exposed foes for a sneak attack');
    expect(checkBlock(v).fidelity.dropped).not.toContain('stabs exposed foes for a sneak attack');
  });
  test('the two-word convention: a kind speaks whole with the article, a person by the given name; a model-minted "Sir Lorn of the Briar Court" as Sir Lorn', async () => {
    expect((await gen({ archetype: 'skirmisher', concept: 'Thornback Marauder', userConcept: 'Thornback Marauder', cr: 3, fixedName: 'Thornback Marauder' }, json('Thornback Marauder', 'Humanoid', 3, null, 'skirmisher'))).inline).toBe('the thornback marauder');
    expect((await gen({ archetype: 'skirmisher', concept: 'Gutter King', userConcept: 'Gutter King', cr: 3, fixedName: 'Gutter King' }, json('Gutter King', 'Humanoid', 3, null, 'skirmisher'))).inline).toBe('the gutter king'); // a role noun, whole — not "the king"
    expect((await gen({ archetype: 'skirmisher', concept: 'Knife Ball', userConcept: 'Knife Ball', cr: 2, fixedName: 'Knife Ball' }, json('Knife Ball', 'Construct', 2, null, 'skirmisher', { extra: { inline: 'the knife ball' } }))).inline).toBe('the knife ball'); // the model declared the whole Name a kind — accepted on a multi-word Name
    expect((await gen({ archetype: 'defender', concept: 'Meshrin', userConcept: 'Meshrin', cr: 8, fixedName: 'Meshrin' }, json('Meshrin', 'Humanoid', 8, null, 'defender', { extra: { inline: 'the meshrin' } }))).inline).toBe('Meshrin'); // a one-word Name never takes the model's "the" (the user's complaint, step 4)
    expect((await gen({ archetype: 'brute', concept: 'Gormak Skullsunder', userConcept: 'Gormak Skullsunder', cr: 5, fixedName: 'Gormak Skullsunder' }, json('Gormak Skullsunder', 'Humanoid', 5, null, 'brute', { extra: { inline: 'the skullsunder' } }))).inline).toBe('Gormak'); // a coined surname is a person; a partial declaration does not make it a kind
    expect((await gen({ archetype: 'skirmisher', concept: 'a fey knight of the briar court', userConcept: 'a fey knight of the briar court', cr: 9 }, json('Sir Lorn of the Briar Court', 'Fey', 9, null, 'skirmisher'))).inline).toBe('Sir Lorn');
  });
  test('a part stays beside print\'s one melee row — Grik\'s Nasty Bite on the Kobold Warrior', async () => {
    const desc = 'Grik — A kobold with a spear and a sling, a nasty bite, and a knack for tripping bigger creatures.';
    const m = await gen({ archetype: 'skirmisher', style: 'hurler', concept: desc, userConcept: desc, cr: 1, fixedName: 'Grik' }, json('Grik', 'Humanoid', 1, 'hurler', 'skirmisher', { size: 'Small', extra: { projectile: 'a sling stone', clauses: [{ text: 'A kobold with a spear and a sling', kind: 'mechanical' }, { text: 'a nasty bite', kind: 'mechanical' }, { text: 'a knack for tripping bigger creatures', kind: 'descriptive' }] } }));
    expect(rows(m).map((e) => e.name)).toEqual(expect.arrayContaining(['Spear', 'Sling', 'Nasty Bite']));
    expect(checkBlock(m).fidelity.dropped).not.toContain('a nasty bite');
    expect(rows(m).some((e) => e.part && /Strength Saving Throw.*Prone condition/.test(e.text))).toBe(true); // "a knack for tripping" is Trip Attack on a melee part, no style word needed (the critic's green-light read)
    expect(checkBlock(m).fidelity.dropped).not.toContain('a knack for tripping bigger creatures');
  });
  test('an exact body at print\'s CR: the added print rows deal print\'s dice — the Pit Fiend\'s Devilish Claw and Fiery Mace', async () => {
    const m = await gen({ archetype: 'brute', concept: 'a pit fiend', userConcept: 'a pit fiend', cr: 20 }, json('Pit Fiend', 'Fiend', 20, null, 'brute', { size: 'Large' }));
    expect(rows(m).find((e) => e.name === 'Devilish Claw').text).toMatch(/\+14, reach 10 ft\. 26 \(4d8 \+ 8\) Necrotic damage/);
    expect(rows(m).find((e) => e.name === 'Fiery Mace').text).toMatch(/\+14, reach 10 ft\. 22 \(4d6 \+ 8\) Force damage plus 21 \(6d6\) Fire damage/);
    expect(checkBlock(m).fails).toEqual([]);
  });
  test('the engine\'s own Swallow row answers "swallows horses whole"', async () => {
    const desc = 'a gargantuan purple worm-thing that swallows horses whole and burrows under caravans';
    const m = await gen({ archetype: 'brute', style: 'grappler', concept: desc, userConcept: desc, cr: 16 }, json('Gorget Gnawer', 'Monstrosity', 16, 'grappler', 'brute', { size: 'Gargantuan', extra: { clauses: [{ text: 'a gargantuan purple worm-thing', kind: 'descriptive' }, { text: 'swallows horses whole', kind: 'mechanical' }, { text: 'burrows under caravans', kind: 'mechanical' }] } }));
    const sw = rows(m).find((e) => /^Swallow/.test(e.name)); expect(sw).toBeTruthy(); expect(sw.boundKeys).toEqual(expect.arrayContaining(['swallow']));
    expect(checkBlock(m).fidelity.dropped).not.toContain('swallows horses whole');
  });
  test('a caster who cannot cast swings his staff by hand — the weapon rolls a weapon stat once the lack removes every casting row', async () => {
    const desc = 'a wizard but he cannot cast any spells, he just hits people with his staff';
    const m = await gen({ archetype: 'caster', concept: desc, userConcept: desc, cr: 3, edition: '2014' }, json('Holdren Vask', 'Humanoid', 3, null, 'caster', { extra: { clauses: [{ text: 'a wizard', kind: 'descriptive' }, { text: 'he cannot cast any spells', kind: 'mechanical' }, { text: 'he just hits people with his staff', kind: 'mechanical' }] } }));
    expect(rows(m).some((e) => /^Spellcasting/.test(e.name))).toBe(false);
    const staff = rows(m).find((e) => /Staff/.test(e.name)); const pb = m.pb; const best = Math.max(Math.floor((m.stats.STR - 10) / 2), Math.floor((m.stats.DEX - 10) / 2));
    expect(staff.text).toMatch(new RegExp(`Attack Roll:\\*? \\+${pb + best},`));
    expect(checkBlock(m).fails).toEqual([]);
  });
  test('the checker: print\'s Evasion idiom is not a half-no-referent; "that creature" after a named point is one target', () => {
    const base = { format: '2024', name: 'T', cr: 5, size: 'Medium', type: 'Humanoid', ac: 15, hp: 60, pb: 3, stats: { STR: 14, DEX: 16, CON: 12, INT: 10, WIS: 10, CHA: 10 }, speed: '30 ft.', generation: { clauses: [], userConcept: 'a test' } };
    const r1 = checkBlock({ ...base, sections: { Traits: [{ name: 'Evasion', text: 'If T is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, T instead takes no damage if it succeeds on the save and only half damage if it fails.' }], Actions: [{ name: 'Dagger', text: '*Melee Attack Roll:* +6, reach 5 ft. 8 (1d4 + 6) Piercing damage.' }] } });
    expect(r1.fails.map((f) => f.rule ?? f)).not.toEqual(expect.arrayContaining([expect.stringMatching(/half-no-referent/)]));
    const r2 = checkBlock({ ...base, sections: { Actions: [{ name: 'Erupt (Recharge 5-6)', text: 'If T is burrowing, it erupts from the ground at a point within 5 feet of one creature. *Dexterity Saving Throw*: DC 14, that creature. *Failure:* 22 (4d10) Bludgeoning damage, and the target has the Prone condition. *Success:* Half damage only.' }, { name: 'Dagger', text: '*Melee Attack Roll:* +6, reach 5 ft. 8 (1d4 + 6) Piercing damage.' }] } });
    expect(JSON.stringify(r2.gates.adjudicability.findings.filter((f) => f.severity === 'fail'))).not.toMatch(/adjudicable-target/);
  });
});
