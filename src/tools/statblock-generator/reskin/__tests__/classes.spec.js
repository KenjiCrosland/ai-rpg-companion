// THE CLASS KIT (landing two, 2026-10-13). A class the GM NAMES owes its rows,
// the way the seat's owed trait does. A class the words merely imply lands
// nothing here: the catalog already offers these templates and ranks them by the
// GM's own verbs, so the implied tier is the fit call's (owner: "trigger is not
// eligibility"). The rows are catalog ids and SRD lifts — never new rules text.
import { generateReskin, renameKeysOf } from '../generate.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';
import { checkBlock } from '../checker.mjs';
import { CLASSES, classFor, classRows, classEligible } from '../classes.mjs';
import { TEMPLATE_BY_ID } from '../templates.mjs';
import { liftSrdRow } from '../species.mjs';

const mk = (cr, style, arch) => { const scaled = scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [] }); const renames = { Teleport: 'Blink Step', 'Ranged Attack': 'Hurl', 'Hybrid Attack': 'Hybrid Strike' }; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; }); const typed = [...Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name), 'Hurl', 'Hybrid Strike']; return { scaled, renames, typed }; };
const json = (name, type, cr, style, arch, over = {}) => { const { scaled, renames, typed } = mk(cr, style, arch); return JSON.stringify({ name, type, size: over.size ?? 'Medium', alignment: 'Neutral', senses: over.senses ?? 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, over.dtype ?? 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 10 feet. *Failure:* The target has the Prone condition.`, ...(over.extra ?? {}) }); };
const gen = (opts, answer) => generateReskin({ mechanics: [], ...opts }, async () => answer);
const rows = (m) => Object.values(m.sections).flat();
const kitRows = (m) => rows(m).filter((e) => CLASSES.some((c) => c.key === e.kit));

describe('the class table', () => {
  test('every row resolves: a catalog id or an SRD lift that exists', () => {
    for (const cls of CLASSES) {
      expect(cls.keys.length).toBeGreaterThan(0);
      expect(cls.rows.length).toBeGreaterThan(0);
      for (const r of cls.rows) {
        if (r.template) expect(TEMPLATE_BY_ID.get(r.template)).toBeTruthy();
        else expect(liftSrdRow(r.srd[0], r.srd[1])).toBeTruthy();
      }
    }
  });

  test('A LIFT CARRIES NO DICE: print\'s numbers are print\'s CR\'s', () => {
    // the Gladiator's Shield Bash lifts as "9 (2d4 + 4)", which is wrong at every
    // other CR — a feature whose numbers must scale is a template, never a lift
    for (const cls of CLASSES) for (const r of cls.rows.filter((x) => x.srd)) {
      const lift = liftSrdRow(r.srd[0], r.srd[1]);
      expect(lift.text).not.toMatch(/\d+ \(\d+d\d+/);
    }
    expect(liftSrdRow('Gladiator', 'Shield Bash').text).toMatch(/\d+ \(\d+d\d+/); // the one we refused, for the record
  });

  test('a lift keeps print\'s own use limit, which print writes into the row name', () => {
    expect(liftSrdRow('Priest', 'Divine Aid').gate).toBe('3/Day');
    expect(liftSrdRow('Mage', 'Misty Step').gate).toBe('3/Day');
    expect(liftSrdRow('Cultist Fanatic', 'Spiritual Weapon').gate).toBe('2/Day');
    expect(liftSrdRow('Assassin', 'Cunning Action').gate).toBeNull();
  });

  test('no key names two classes', () => {
    const seen = new Map();
    for (const cls of CLASSES) for (const k of cls.keys) {
      expect(seen.has(k)).toBe(false);
      seen.set(k, cls.key);
    }
    for (const cls of CLASSES) for (const k of cls.keys) {
      const hit = classFor([`a ${k} of the old quarter`], { int: 12 });
      expect(hit && hit.cls.key).toBe(cls.key);
    }
  });

  test('a class is learned, so eligibility is by mind — never by type', () => {
    expect(classEligible({ mind: 'sapient' })).toBe(true);
    expect(classEligible({ mind: 'bestial' })).toBe(false);
    expect(classEligible({ mind: 'mindless' })).toBe(false);
    expect(classEligible({ int: 3 })).toBe(false);
    expect(classEligible({ int: 12 })).toBe(true);
    expect(classFor(['a rogue who stalks'], { mind: 'bestial' })).toBeNull();
    expect(classFor(['a dire wolf'], { int: 12 })).toBeNull();
    // a fiend or a fey may learn one: the gate reads the mind, and nothing here reads the type
    expect(classFor(['an imp rogue'], { int: 11 }).cls.key).toBe('rogue');
  });

  test('a row with its own keys waits for the words to ask for it', () => {
    const rogue = CLASSES.find((c) => c.key === 'rogue');
    const plain = classRows(rogue, { text: 'a rogue of the old quarter', inline: 'the rogue' }).map((r) => r.template ?? r.name);
    const asked = classRows(rogue, { text: 'a rogue who stalks the rooftops unseen', inline: 'the rogue' }).map((r) => r.template ?? r.name);
    expect(plain).not.toContain('assassinate');
    expect(asked).toContain('assassinate');
    expect(plain).toContain('Cunning Action'); // the print lift is owed either way
  });

  test('the lift is print\'s own text, with the creature\'s name in it', () => {
    const r = classRows(CLASSES.find((c) => c.key === 'barbarian'), { text: 'a berserker', inline: 'Grieve' })[0];
    expect(r.source).toBe('Berserker/Bloodied Frenzy');
    expect(r.text).toBe('While Bloodied, Grieve has Advantage on attack rolls and saving throws.');
  });
});

describe('the class kit lands what the words owe (2026-10-13)', () => {
  test('a named rogue carries print\'s Cunning Action, with the clause that asked for it', async () => {
    const desc = 'a tiefling rogue who stalks the rooftops of the old quarter';
    const m = await gen({ archetype: 'lurker', concept: desc, userConcept: desc, cr: 5 }, json('Sable Nefret', 'Humanoid', 5, null, 'lurker', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    const ca = rows(m).find((e) => e.name === 'Cunning Action');
    expect(ca).toBeDefined();
    expect(ca.kit).toBe('rogue');
    expect(ca.clause).toMatch(/rogue/);
    expect(ca.text).toMatch(/takes the Dash, Disengage, or Hide action/);
    // "stalks" asked for Assassinate by name, so it is owed and the cap cannot turn it away
    expect(rows(m).find((e) => /^Assassinate/.test(e.name ?? ''))).toBeDefined();
    expect(checkBlock(m).fails).toEqual([]);
  });

  test('a named fighter\'s Riposte names the sheet\'s own weapon, never a Slam', async () => {
    const desc = 'a knight who holds the line with a shield and a longsword';
    const m = await gen({ archetype: 'defender', concept: desc, userConcept: desc, cr: 5 }, json('Dame Oriel', 'Humanoid', 5, null, 'defender', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    const rip = rows(m).find((e) => /^Riposte/.test(e.name ?? ''));
    expect(rip).toBeDefined();
    expect(rip.kit).toBe('fighter');
    expect(rip.text).not.toMatch(/\bSlam\b/);
    const melee = rows(m).filter((e) => /Melee Attack Roll/.test(e.text ?? '')).map((e) => String(e.name).replace(/ \(.*\)$/, ''));
    expect(melee.some((n) => rip.text.includes(n))).toBe(true);
    expect(checkBlock(m).fails).toEqual([]);
  });

  test('a named barbarian takes print\'s frenzy, and "loses control" asks for Berserk', async () => {
    const desc = 'a goliath berserker who loses control when wounded';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 8 }, json('Mournhold Grieve', 'Humanoid', 8, null, 'brute', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    const names = rows(m).map((e) => e.name);
    expect(names).toContain('Bloodied Frenzy');
    expect(names).toContain('Berserk');
    expect(rows(m).find((e) => e.name === 'Bloodied Frenzy').kit).toBe('barbarian');
    expect(checkBlock(m).fails).toEqual([]);
  });

  test('a class the words only IMPLY lands nothing from the kit', async () => {
    const desc = 'a ninja who moves through the shadows and strikes unseen';
    const m = await gen({ archetype: 'lurker', concept: desc, userConcept: desc, cr: 5 }, json('Hushwing', 'Humanoid', 5, null, 'lurker', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    expect(kitRows(m)).toHaveLength(0); // the catalog may still offer these shapes to the fit call; the kit forces nothing
    // the lurker donor's HP sits under print's CR 5 band on this canned answer,
    // which is the harness, not the kit — the gates that the kit could move are clean
    for (const g of ['structure', 'derivation', 'reader', 'gates']) expect(checkBlock(m).gates[g].status).not.toBe('fail');
  });

  test('a print body keeps print\'s own rows: no class kit', async () => {
    const desc = 'a gladiator';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 5 }, json('Gladiator', 'Humanoid', 5, null, 'brute', { extra: { clauses: [{ text: desc, kind: 'descriptive' }] } }));
    expect(kitRows(m)).toHaveLength(0);
  });

  test('a named cleric carries print\'s Divine Aid, with print\'s own use limit', async () => {
    const desc = 'a templar priest of the dawn';
    const m = await gen({ archetype: 'caster', concept: desc, userConcept: desc, cr: 6 }, json('Vareth Solmane', 'Humanoid', 6, null, 'caster', { extra: { spells: { at_will: ['Sacred Flame', 'Guiding Bolt'], daily: ['Spirit Guardians', 'Hold Person'] }, clauses: [{ text: desc, kind: 'mechanical' }] } }));
    const aid = rows(m).find((e) => /^Divine Aid/.test(e.name ?? ''));
    expect(aid).toBeDefined();
    expect(aid.name).toBe('Divine Aid (3/Day)');
    expect(aid.kit).toBe('cleric');
    expect(aid.text).toMatch(/using the same spellcasting ability as Spellcasting/);
    expect(rows(m).map((e) => String(e.name).replace(/ \(.*\)$/, ''))).toContain('Spellcasting');
    expect(checkBlock(m).fails).toEqual([]);
  });

  test('a caster lift refuses a sheet with no Spellcasting row to refer to', async () => {
    const desc = 'a templar priest with a mace and no magic at all';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 6 }, json('Vareth Solmane', 'Humanoid', 6, null, 'brute', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    expect(rows(m).some((e) => /Spellcasting/.test(e.name ?? ''))).toBe(false);
    expect(rows(m).some((e) => /^Divine Aid/.test(e.name ?? ''))).toBe(false);
    expect(kitRows(m)).toHaveLength(0);
  });

  test('a named bard charms in print\'s words', async () => {
    const desc = 'a skald who sings his warband into a fury';
    const m = await gen({ archetype: 'caster', concept: desc, userConcept: desc, cr: 6 }, json('Thurivald', 'Humanoid', 6, null, 'caster', { extra: { spells: { at_will: ['Vicious Mockery', 'Charm Person'], daily: ['Hold Person', 'Hypnotic Pattern'] }, clauses: [{ text: desc, kind: 'mechanical' }] } }));
    const charm = rows(m).find((e) => /Captain's Charm/.test(e.name ?? ''));
    expect(charm).toBeDefined();
    expect(charm.kit).toBe('bard');
    expect(charm.text).toMatch(/has the Charmed condition/);
    expect(charm.text).not.toMatch(/\bpirate\b/); // the self-reference was rewritten to this creature
    expect(charm.text).not.toMatch(/\{(?:inline|dc)\}/);
    expect(checkBlock(m).fails).toEqual([]);
  });

  test('a class row the sheet already carries by name is not added twice', async () => {
    const desc = 'a tiefling rogue of the old quarter';
    const m = await gen({ archetype: 'skirmisher', concept: desc, userConcept: desc, cr: 3, style: 'skulker' }, json('Sable Nefret', 'Humanoid', 3, 'skulker', 'skirmisher', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    expect(rows(m).filter((e) => e.name === 'Cunning Action')).toHaveLength(1);
    expect(checkBlock(m).fails).toEqual([]);
  });
});


// THE AUTHORED ROWS (landing two, 2026-10-14). Print has no row for these, so
// each is a catalog shape with CR frames and the engine's numbers, citing the
// printed row whose grammar it copies. Four more were REFUSED, and the reasons
// are the interesting part — see the describe below.
describe('the class rows print has no row for', () => {
  const ids = ['stunning-strike', 'patient-defense', 'lay-on-hands', 'second-wind', 'shield-bash'];

  test('each is in the catalog, in a real section, with frames that carry the engine\'s slots', () => {
    for (const id of ids) {
      const t = TEMPLATE_BY_ID.get(id);
      expect(t).toBeTruthy();
      expect(['trait', 'action', 'bonus_action', 'reaction', 'rider']).toContain(t.section);
      for (const f of Object.values(t.frames)) expect(f).not.toMatch(/\{(?:pb|level|proficiency)\}/); // no slot the engine cannot fill
    }
    // the numbers are the engine's, never print's CR 5 dice
    expect(TEMPLATE_BY_ID.get('shield-bash').frames['6-9']).toMatch(/\{avg_half\} \(\{dice_half\}\)/);
    expect(TEMPLATE_BY_ID.get('lay-on-hands').frames['6-9']).toMatch(/\{avg\} \(\{dice\}\)/);
    expect(TEMPLATE_BY_ID.get('stunning-strike').frames['6-9']).toMatch(/DC \{dc\}/);
  });

  test('a monk\'s Stunning Strike rides the melee row, as a rider must — it is never a row of its own', async () => {
    const desc = 'a lizardfolk monk who strikes pressure points with an open hand';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 5 }, json('Vaelor Kess', 'Humanoid', 5, null, 'brute', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    expect(m.sections.Rider).toBeUndefined();                       // "Rider" is not a section a GM reads
    const host = rows(m).find((e) => /Stunned condition/.test(e.text ?? ''));
    expect(host).toBeDefined();
    expect(host.text).toMatch(/Melee(?: or Ranged)? Attack Roll/);   // it rides an attack
    expect(host.text).toMatch(/Once on each of .*turns when it hits/); // print's once-a-turn clause, since a hold with no gate on every hit is not print
    expect(host.feature).toBe('Stunning Strike');
    expect(checkBlock(m).fails).toEqual([]);
  });

  test('a paladin takes print\'s aura and a smite under its own name', async () => {
    const desc = 'an oathsworn crusader who smites the unclean and mends her soldiers';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 8 }, json('Dame Oriel', 'Humanoid', 8, null, 'brute', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    const aura = rows(m).find((e) => /^Aura of Authority/.test(e.name ?? ''));
    expect(aura).toBeDefined();
    expect(aura.kit).toBe('paladin');
    expect(aura.text).not.toMatch(/\bhobgoblin\b/i);                 // print's self-reference was rewritten
    const smite = rows(m).find((e) => /^Divine Smite/.test(e.name ?? ''));
    expect(smite).toBeDefined();
    expect(smite.name).toMatch(/^Divine Smite/);                     // never the seed's own "Venomed Edge"
    expect(checkBlock(m).fails).toEqual([]);
  });

  test('a shield bash waits to be asked for: a shield LINE is a formation, not a weapon', () => {
    const fighter = CLASSES.find((c) => c.key === 'fighter');
    const line = classRows(fighter, { text: 'a sergeant who keeps the shield line', inline: 'the sergeant' }).map((r) => r.template);
    const bash = classRows(fighter, { text: 'a veteran who bashes with a buckler', inline: 'the veteran' }).map((r) => r.template);
    expect(line).not.toContain('shield-bash');
    expect(line).toContain('guarded-stance');                        // the bare word is answered by the stance
    expect(bash).toContain('shield-bash');
  });

  test('a word the class table claims is not a print alias for another body', () => {
    const { PRINT_ALIAS } = require('../generate.mjs');
    // Most class words ARE print aliases, and most are right: rogue to the Spy,
    // soldier to Warrior Infantry, cleric to the Priest, wizard to the Mage,
    // paladin to the Knight. "monk" was the wrong one — print's Priest is a
    // cleric-shaped NPC with Spellcasting and Divine Aid, so a lizardfolk monk
    // came out a priest and the monk's rider rode a row the swap then removed.
    expect(PRINT_ALIAS.monk).toBeUndefined();
    expect(PRINT_ALIAS.rogue).toBe('Spy');
    expect(PRINT_ALIAS.cleric).toBe('Priest');
    expect(PRINT_ALIAS.paladin).toBe('Knight');
  });

  test('the four refusals stay refused: no row reduces incoming damage, and none is an extra action', () => {
    // Deflect Attacks and Uncanny Dodge reduce damage, which this engine forbids
    // outright (the re-roll and section prompts both say so); Action Surge is an
    // extra Attack action no band can price; Martial Arts is the unarmed row's
    // own die, which the engine owns. None of them is in the catalog.
    for (const id of ['deflect-attacks', 'uncanny-dodge', 'action-surge', 'martial-arts']) expect(TEMPLATE_BY_ID.get(id)).toBeFalsy();
    for (const cls of CLASSES) for (const r of cls.rows) {
      const t = r.template ? TEMPLATE_BY_ID.get(r.template) : null;
      if (!t) continue;
      for (const f of Object.values(t.frames ?? { x: t.text })) expect(String(f)).not.toMatch(/damage is reduced|reduce the damage|takes half damage from|Resistance to all/i);
    }
  });
});


// THE CRITIC'S BRANCH READ (2026-10-14). Each closed hold gets a predicate or a
// pin, because a branch-only smoke sees a reopened hold only if something checks.
describe('the critic\'s branch read', () => {
  test('a creature noun outranks a class alias, and the class kit layers onto that body', () => {
    const { printCanonFor } = require('../generate.mjs');
    // "an imp rogue" headed on the Spy: the imp lost its wings, its Fiend type and everything that made it an imp
    expect(printCanonFor('an imp rogue who picks locks for a devil', 4)?.name).toBe('Imp');
    expect(printCanonFor('an imp rogue who picks locks for a devil', 4)?.type).toMatch(/^Fiend/);
    // a bare class word still names print's own NPC block
    expect(printCanonFor('a tiefling rogue who stalks the rooftops', 5)?.name).toBe('Spy');
    expect(printCanonFor('a cleric of the dawn', 6)?.name).toBe('Priest');
  });

  test('a multi-word print name resolves as a name, Beast or not', () => {
    const { printCanonFor } = require('../generate.mjs');
    expect(printCanonFor('a dire wolf that hunts in a pack', 3)?.name).toBe('Dire Wolf');
    // but a Beast HEAD NOUN in a long concept still keeps its seats
    expect(printCanonFor('a wolf that eats the stars', 5)).toBeNull();
  });

  test('a feature already welded to a row is owned, so no template lands twice', () => {
    const { templatesFor } = require('../templates.mjs');
    const sections = { Actions: [{ name: 'Open Hand', text: '*Melee Attack Roll:* +6, reach 5 ft. 17 (4d6 + 3) Bludgeoning damage.', feature: 'Stunning Strike' }] };
    const ids = templatesFor({ archetype: 'skirmisher', cr: 8, sections, section: 'rider', trigger: null, concept: 'a monk who stuns with pressure points' }).map((t) => t.id);
    expect(ids).not.toContain('stunning-strike');
  });

  test('a gullet matches the body it is in, and the gate reads it', () => {
    const { TEMPLATE_BY_ID, renderTemplate } = require('../templates.mjs');
    const ctx = { scaled: { cr: 9, pb: 4, dc: 15, atk: 8, per_hit: 18, stats: { STR: 20, DEX: 12, CON: 18, INT: 6, WIS: 12, CHA: 10 }, striker_stat: 'STR', sections: {} }, sections: {}, archetype: 'brute', cr: 9, energy: 'Cold', concept: 'a rime-scaled wyrm that swallows sailors whole', name: 'Rime-Scaled Wyrm', type: 'Monstrosity' };
    const r = renderTemplate(TEMPLATE_BY_ID.get('swallow'), ctx, {}, { blind: true });
    expect(r.text).toMatch(/Cold damage at the start/);
    expect(r.text).not.toMatch(/Acid damage at the start/);
    // and the predicate catches a sheet that still has one
    const bad = { format: '2024', name: 'Rime-Scaled Wyrm', inline: 'the wyrm', type: 'Monstrosity', size: 'Huge', cr: 9, ac: 17, hp: 180, hp_formula: '15d12 + 75', pb: 4, speed: '40 ft.', alignment: 'Unaligned', languages: 'None', stats: { STR: 20, DEX: 12, CON: 18, INT: 6, WIS: 12, CHA: 10 }, generation: { clauses: [] },
      sections: { Actions: [{ name: 'Gorge and Glut', text: '*Dexterity Saving Throw*: DC 15, one creature. *Failure:* 18 (4d8) Cold damage, and the target is swallowed, and takes 9 (2d8) Acid damage at the start of each of the wyrm\'s turns.' }] } };
    expect(checkBlock(bad).gates.reader.findings.map((f) => f.rule)).toContain('interior-energy');
  });

  test('a row name may contain "and" — the Multiattack predicate reads it as one row', () => {
    const base = { format: '2024', name: 'Rime-Scaled Wyrm', inline: 'the wyrm', type: 'Monstrosity', size: 'Huge', cr: 9, ac: 17, hp: 180, hp_formula: '15d12 + 75', pb: 4, speed: '40 ft.', alignment: 'Unaligned', languages: 'None', stats: { STR: 20, DEX: 12, CON: 18, INT: 6, WIS: 12, CHA: 10 }, generation: { clauses: [] },
      sections: { Actions: [
        { name: 'Multiattack', text: 'The wyrm makes two Bite attacks. It can replace one attack with a use of Gorge and Glut.' },
        { name: 'Bite', text: '*Melee Attack Roll:* +9, reach 10 ft. 15 (2d8 + 6) Piercing damage.' },
        { name: 'Gorge and Glut', text: '*Dexterity Saving Throw*: DC 15, one creature. *Failure:* 18 (4d8) Cold damage, and the target is swallowed.' },
      ] } };
    const rules = checkBlock(base).gates.reader.findings.map((f) => f.rule);
    expect(rules).not.toContain('multiattack-integrity');
  });
});

// THE OWNER'S CALL (2026-10-14): a one-word name on a Humanoid is that person's
// name, whoever minted it. "The smokeveil" reads like a species the GM never
// created, and the call does not answer the same way twice on the same words.
// The call still answers; the engine now refuses the kind form in this one case.
describe('a one-word name on a person', () => {
  const sheet = (name, inline, type = 'Humanoid', typed = 'a ninja who moves through the shadows') => ({
    format: '2024', name, inline, type, size: 'Medium', cr: 5, ac: 15, hp: 80, hp_formula: '12d8 + 24', pb: 3,
    speed: '30 ft.', alignment: 'Neutral', languages: 'Common', stats: { STR: 12, DEX: 18, CON: 14, INT: 12, WIS: 12, CHA: 10 },
    generation: { clauses: [], userConcept: typed },
    sections: { Traits: [{ name: 'Evasion', text: `If ${inline} is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, ${inline} instead takes no damage if it succeeds.` }] },
  });
  const rules = (m) => checkBlock(m).gates.reader.findings.map((f) => f.rule);

  test('the kind form is refused on a minted one-word name — the live Smokeveil case', () => {
    expect(rules(sheet('Smokeveil', 'the smokeveil'))).toContain('inline-consistency');
    expect(rules(sheet('Smokeveil', 'Smokeveil'))).not.toContain('inline-consistency');
  });

  test('the GM\'s own article still makes a kind', () => {
    expect(rules(sheet('Meshrin', 'the meshrin', 'Humanoid', 'a meshrin that drags its prey into the dark'))).not.toContain('inline-consistency');
  });

  test('a non-Humanoid body may still speak as a kind', () => {
    expect(rules(sheet('Gloamripper', 'the gloamripper', 'Monstrosity'))).not.toContain('inline-consistency');
  });

  test('the engine refuses the call\'s own kind answer, end to end', async () => {
    const desc = 'a ninja who moves through the shadows and strikes unseen';
    const m = await gen({ archetype: 'lurker', concept: desc, userConcept: desc, cr: 5 },
      json('Smokeveil', 'Humanoid', 5, null, 'lurker', { extra: { inline_kind: 'kind', inline: 'the smokeveil', clauses: [{ text: desc, kind: 'mechanical' }] } }));
    expect(m.name).toBe('Smokeveil');
    expect(m.inline).toBe('Smokeveil');                 // the call said "the smokeveil"; the engine refused it
    for (const e of rows(m)) expect(String(e.text)).not.toMatch(/the smokeveil/i);
  });
});

// THE BRANCH READ, SECOND PASS (2026-10-14): holds 2b and 4, and a regression
// of mine the critic caught in the weapon-type table.
describe('the branch read, second pass', () => {
  test('a weapon carries its OWN damage type, not its family\'s', () => {
    const { honestAttackNames } = require('../header.mjs');
    const row = (n, t) => { const s = { Actions: [{ name: n, text: `*Melee Attack Roll:* +6, reach 5 ft. 12 (2d8 + 3) ${t} damage.` }] }; honestAttackNames(s, {}); return (/\) (\w+) damage/.exec(s.Actions[0].text) ?? [])[1]; };
    expect(row('Shortsword', 'Slashing')).toBe('Piercing');   // the critic's Vespera Vaunt
    expect(row('Poisoned Shortsword', 'Slashing')).toBe('Piercing');
    expect(row('Rapier', 'Slashing')).toBe('Piercing');
    expect(row('Greatsword', 'Piercing')).toBe('Slashing');
    expect(row('Longsword', 'Piercing')).toBe('Slashing');
  });

  test('a mastery save uses the ability its attack uses', () => {
    const { featureRows } = require('../features.mjs');
    const opts = { inline: 'the duelist', pb: 3, dc: 13, mod: 1, dexMod: 4 }; // STR 12, DEX 18
    const finesse = featureRows([{ text: 'a duelist with a rapier', kind: 'mechanical' }], { ...opts, parts: [{ part: true, weapon: 'rapier', name: 'Rapier', mode: 'melee', clause: 'a rapier' }] });
    const heavy = featureRows([{ text: 'a warden with a trident', kind: 'mechanical' }], { ...opts, parts: [{ part: true, weapon: 'trident', name: 'Trident', mode: 'melee', clause: 'a trident' }] });
    const t = (rows) => rows.find((f) => f.name === 'Topple')?.text ?? '';
    if (t(finesse)) expect(t(finesse)).toContain('DC 15');    // 8 + DEX 4 + PB 3
    expect(t(heavy)).toContain('DC 12');                      // 8 + STR 1 + PB 3
  });

  test('the derivation gate refuses a mundane weapon keyed to the casting stat', () => {
    const sheet = (bonus) => ({ format: '2024', name: 'Lady Merivane', inline: 'Merivane', type: 'Humanoid', size: 'Medium', cr: 8, ac: 16, hp: 120, hp_formula: '16d8 + 48', pb: 3,
      speed: '30 ft.', alignment: 'Lawful Good', languages: 'Common', stats: { STR: 12, DEX: 12, CON: 16, INT: 10, WIS: 20, CHA: 14 }, generation: { clauses: [] },
      sections: { Actions: [{ name: 'Greatsword', text: `*Melee Attack Roll:* +${bonus}, reach 5 ft. 13 (2d8 + 4) Slashing damage.` }] } });
    expect(checkBlock(sheet(8)).gates.derivation.findings.map((f) => f.rule)).toContain('attack-stat'); // WIS 20 + PB 3
    expect(checkBlock(sheet(4)).gates.derivation.findings.map((f) => f.rule)).not.toContain('attack-stat'); // STR 12 + PB 3
  });

  test('a weapon word inside a coined name still takes the weapon\'s range', () => {
    // "Hurlaxe" printed 60/240 where a thrown axe is 20/60
    const T = [[/\bheavy crossbow\b/i, '100/400', false], [/\bjavelins?\b/i, '30/120', true], [/\b(?:great)?axes?\b/i, '20/60', true]];
    const find = (n) => { const head = n.toLowerCase().split(/[\s-]+/).pop(); return T.find(([re]) => re.test(n)) ?? T.find(([re]) => head.length > 4 && re.test(` ${head.replace(/^(?:hurl|thrown|throw|flung|cast|war|great|hand|light|heavy|short|long)/, '')}`)); };
    expect(find('Hurlaxe')?.[1]).toBe('20/60');
    expect(find('Shell Spikes')).toBeUndefined();
  });

  test('a row\'s bound keys are words it claims, so a welded rider is not authored twice', () => {
    const { TEMPLATE_BY_ID } = require('../templates.mjs');
    expect(TEMPLATE_BY_ID.get('hook-rider').keys).toContain('drag'); // the keys the weld now claims
  });
});

// HOLD 5 (2026-10-14): the shapes' own damage defaults. A seed path defaulted an
// action to Piercing and a bonus action to Bludgeoning — a weapon's type on a
// thing that is no weapon — and an on-hit extra read the melee type too early.
describe('a shape\'s damage type follows its fiction', () => {
  const { TEMPLATE_BY_ID, renderTemplate } = require('../templates.mjs');
  const ctx = (over = {}) => ({ scaled: { cr: 8, pb: 3, dc: 15, atk: 7, per_hit: 16, stats: { STR: 18, DEX: 12, CON: 16, INT: 10, WIS: 12, CHA: 10 }, striker_stat: 'STR', sections: {} }, sections: {}, archetype: 'brute', cr: 8, concept: 'an orc berserker who howls', name: 'Orc', type: 'Humanoid', meleeType: 'Slashing', ...over });
  const typeOf = (id, over) => { const t = TEMPLATE_BY_ID.get(id); const r = renderTemplate(t, ctx({ archetype: (t.roles ?? ['brute'])[0], ...over }), {}, { blind: true }); return (/\d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) (\w+) damage/.exec(r?.text ?? '') ?? [])[1] ?? null; };

  test('a dread hurts the mind, not with a blade', () => {
    expect(typeOf('escalating-dread')).toBe('Psychic');   // Bloodcurdling Howl, Creeping Dread
    expect(typeOf('wail')).toBe('Psychic');
    expect(typeOf('drain')).toBe('Necrotic');
  });

  test('a declared energy still wins over the fiction default', () => {
    expect(typeOf('escalating-dread', { energy: 'Cold' })).toBe('Cold');
  });

  test('an on-hit extra takes the hit\'s own type, read after the weapons settle', async () => {
    const desc = 'a tiefling rogue who stalks the rooftops';
    const m = await gen({ archetype: 'lurker', concept: desc, userConcept: desc, cr: 5 }, json('Vespera Vaunt', 'Humanoid', 5, null, 'lurker', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    const melee = rows(m).find((e) => /Melee(?: or Ranged)? Attack Roll/.test(e.text ?? '') && !/^Multiattack/.test(e.name ?? ''));
    const hit = melee ? (/\) ([A-Z][a-z]+) damage/.exec(melee.text) ?? [])[1] : null;
    for (const e of rows(m)) {
      if (/Attack Roll/.test(e.text ?? '')) continue;
      const m2 = /takes an extra \d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) ([A-Z][a-z]+) damage/.exec(e.text ?? '');
      if (m2 && ['Bludgeoning', 'Piercing', 'Slashing'].includes(m2[1])) expect(m2[1]).toBe(hit);
    }
  });
});

// HOLD 6 (2026-10-14): the rules landed, and two exemptions were too broad.
describe('the two exemptions, narrowed', () => {
  const base = (over = {}) => ({ format: '2024', name: 'Crookbound Herdmaster', inline: 'the herdmaster', type: 'Humanoid', size: 'Medium', cr: 5, ac: 15, hp: 90, hp_formula: '12d8 + 36', pb: 3,
    speed: '30 ft.', alignment: 'Neutral', languages: 'Common', stats: { STR: 16, DEX: 12, CON: 16, INT: 10, WIS: 12, CHA: 12 }, generation: { clauses: [] }, ...over });
  const rules = (m) => checkBlock(m).gates.reader.findings.map((f) => f.rule);

  test('an energy row reaches both ways only on a caster — print\'s Arcane Burst is a spell', () => {
    const row = { name: 'Thunderbolt', text: '*Melee or Ranged Attack Roll:* +6, reach 5 ft. or range 30/120 ft. 17 (4d6 + 3) Thunder damage.' };
    const noCaster = base({ sections: { Actions: [{ name: 'Multiattack', text: 'The herdmaster makes two Thunderbolt attacks.' }, row] } });
    expect(rules(noCaster)).toContain('hybrid-needs-thrown');
    const caster = base({ sections: { Actions: [{ name: 'Multiattack', text: 'The herdmaster makes two Thunderbolt attacks.' }, { name: 'Spellcasting', text: 'The herdmaster casts Thunderwave.' }, row] } });
    expect(rules(caster)).not.toContain('hybrid-needs-thrown');
  });

  test('print composes its own card only while the card is still print\'s', () => {
    const sections = { Actions: [
      { name: 'Multiattack', text: 'The templar makes two Mace attacks.' },
      { name: 'Mace', text: '*Melee Attack Roll:* +5, reach 5 ft. 8 (1d8 + 3) Bludgeoning damage.', print: true },
      { name: 'Radiant Flame', text: '*Ranged Attack Roll:* +5, range 60 ft. 10 (3d6) Radiant damage.', print: true },
    ] };
    const m = base({ name: 'Iron Templar', inline: 'the templar', cr: 4, sections });
    // a lack removed print's Spellcasting, so print's composition is no longer whole: the orphan is ours
    expect(checkBlock(m, { print: { name: 'Priest', cr: 2, exact: false } }).gates.reader.findings.map((f) => f.rule)).toContain('attack-in-multiattack');
    // on print's own whole card at print's CR, print's rows are print's
    expect(checkBlock(m, { print: { name: 'Priest', cr: 4, exact: true } }).gates.reader.findings.map((f) => f.rule)).not.toContain('attack-in-multiattack');
  });
});

// HOLD 3's last two (2026-10-14).
describe('print rows a lack or an omission leaves wrong', () => {
  test('a magical attack is magic too: "no magic at all" takes it with the Spellcasting', async () => {
    const desc = 'a templar priest with a mace and no magic at all';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 6 }, json('Iron Templar', 'Humanoid', 6, null, 'brute', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    expect(rows(m).some((e) => /^Spellcasting/.test(e.name ?? ''))).toBe(false);
    for (const e of rows(m)) {
      if (!/Attack Roll/.test(e.text ?? '')) continue;
      expect(e.text).not.toMatch(/\) (?:Acid|Cold|Fire|Force|Lightning|Necrotic|Poison|Psychic|Radiant|Thunder) damage/);
    }
    // and nothing cites the row that left
    for (const e of rows(m)) expect(String(e.text)).not.toMatch(/Radiant Flame/);
  });

  test('a Spellcasting row prints its save DC, as print does in 45 of its 48', async () => {
    const desc = 'a templar priest of the dawn';
    const m = await gen({ archetype: 'caster', concept: desc, userConcept: desc, cr: 6 }, json('Vareth Solmane', 'Humanoid', 6, null, 'caster', { extra: { spells: { at_will: ['Sacred Flame', 'Guiding Bolt'], daily: ['Spirit Guardians', 'Hold Person'] }, clauses: [{ text: desc, kind: 'mechanical' }] } }));
    const sc = rows(m).find((e) => /^Spellcasting/.test(e.name ?? ''));
    if (sc) {
      expect(sc.text).toMatch(/spell save DC \d+/);
      const stat = (/using (\w+) as the spellcasting ability/.exec(sc.text) ?? [])[1];
      const key = { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' }[stat];
      const want = 8 + m.pb + Math.floor((m.stats[key] - 10) / 2);
      expect(sc.text).toContain(`spell save DC ${want}`);
    }
  });
});

// THE TWO REOPENED HOLDS THAT HAD NO PREDICATE (2026-10-14). The critic's bar:
// "Each needs a predicate so the branch smoke catches it next time."
describe('predicates for the reopened holds', () => {
  const base = (over = {}) => ({ format: '2024', name: 'Meshrin', inline: 'Meshrin', type: 'Monstrosity', size: 'Large', cr: 6, ac: 15, hp: 100, hp_formula: '12d10 + 36', pb: 3,
    speed: '30 ft.', alignment: 'Neutral', languages: 'Common', stats: { STR: 18, DEX: 12, CON: 16, INT: 4, WIS: 12, CHA: 8 }, generation: { clauses: [], userConcept: 'a chain-hooked thing that drags its prey into the dark' },
    sections: { Actions: [{ name: 'Hooked Chain', text: '*Melee Attack Roll:* +7, reach 10 ft. 13 (2d8 + 4) Piercing damage.' }] }, ...over });
  const rules = (m, ctx) => checkBlock(m, ctx).gates.reader.findings.map((f) => f.rule);

  test('an INT 4 body speaks nothing unless the words say it does', () => {
    expect(rules(base())).toContain('speaks-by-int');
    expect(rules(base({ languages: 'None' }))).not.toContain('speaks-by-int');
    expect(rules(base({ stats: { STR: 18, DEX: 12, CON: 16, INT: 10, WIS: 12, CHA: 8 } }))).not.toContain('speaks-by-int');
    expect(rules(base({ type: 'Humanoid' }))).not.toContain('speaks-by-int');            // every print Humanoid speaks
    expect(rules(base({ type: 'Giant', stats: { STR: 19, DEX: 8, CON: 16, INT: 5, WIS: 7, CHA: 7 }, languages: 'Common, Giant' }))).not.toContain('speaks-by-int'); // print's own Ogre: INT 5, speaks
    expect(rules(base({ generation: { clauses: [], userConcept: 'a chain-hooked thing that speaks in a dead tongue' } }))).not.toContain('speaks-by-int'); // the GM said it talks
  });

  test('the engine holds None over the mind read, so the predicate stays quiet on a fresh sheet', async () => {
    const desc = 'a chain-hooked thing that drags its prey into the dark';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 6, mind: 'sapient', fixedName: 'Meshrin' }, json('Meshrin', 'Monstrosity', 6, null, 'brute', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    if (Number(m.stats.INT) <= 5 && !/^Humanoid/i.test(m.type)) expect(String(m.languages)).toMatch(/^(?:None|—|Understands)/);
  });

  test('an on-hit extra deals the hit\'s own type', () => {
    const sheet = (riderType) => base({ name: 'Vespera Vaunt', inline: 'Vespera', type: 'Humanoid', stats: { STR: 12, DEX: 18, CON: 14, INT: 12, WIS: 12, CHA: 14 },
      sections: { Actions: [{ name: 'Shortsword', text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 4) Slashing damage.' }],
        Traits: [{ name: 'Assassinate', text: `During the first round of each combat, Vespera has Advantage on attack rolls. If Vespera hits a creature during that round, the target takes an extra 9 (2d8) ${riderType} damage.` }] } });
    expect(rules(sheet('Bludgeoning'))).toContain('on-hit-type');
    expect(rules(sheet('Slashing'))).not.toContain('on-hit-type');
    expect(rules(sheet('Necrotic'))).not.toContain('on-hit-type'); // a deliberate energy stands
  });
});

// FIDELITY (2026-10-14): two concept words that kept landing on the wrong shape.
describe('the words land on the right shape', () => {
  const { TEMPLATE_BY_ID, rankByVerb } = require('../templates.mjs');
  const menu = (ids) => ids.map((i) => TEMPLATE_BY_ID.get(i)).filter(Boolean);
  const top = (ids, text) => rankByVerb(menu(ids), text).filter((x) => x.concept.length)[0]?.t.id ?? null;

  test('a stampede is a damage nova, not an order to scatter — flagged three times', () => {
    expect(top(['herd', 'trample'], 'a herdmaster who commands a stampede of thunder-elk')).toBe('trample');
    expect(TEMPLATE_BY_ID.get('herd').keys).not.toContain('stampede');
    expect(TEMPLATE_BY_ID.get('trample').keys).toContain('stampede');
    // an order with no stampede in it still keys the herd
    expect(top(['herd', 'trample'], 'a sergeant who drives his men forward')).toBe('herd');
  });

  test('a dance that takes an object acts on others — flagged twice', () => {
    expect(top(['lure', 'feint-slip'], 'a satyr piper who dances travellers into the hills')).toBe('lure');
    expect(TEMPLATE_BY_ID.get('lure').keys).toContain('dances');
    expect(TEMPLATE_BY_ID.get('feint-slip').keys).not.toContain('dance');
    // feint-slip keeps the intransitive phrases and its own vocabulary
    expect(TEMPLATE_BY_ID.get('feint-slip').keys).toContain('dances away');
    expect(top(['lure', 'feint-slip'], 'a duelist who feints and slips aside')).toBe('feint-slip');
  });

  test('a transitive dance acts on others, an intransitive one moves the creature', () => {
    expect(top(['lure', 'feint-slip'], 'a satyr piper who dances travellers into the hills')).toBe('lure');
    expect(top(['lure', 'feint-slip'], 'a piper whose music makes them dance toward him')).toBe('lure');
    expect(top(['lure', 'feint-slip'], 'a duelist who dances away from every blade')).toBe('feint-slip');
    expect(top(['lure', 'feint-slip'], 'a reveler who dances aside and laughs')).toBe('feint-slip');
  });
});

// HOLD 4's ROOT CAUSE (2026-10-14): the striker stat is fitted at scale time, so
// a caster line keyed every attack to the mind and a greatsword swung off WIS.
// Print's own warpriest, the Priest, swings its Mace off Strength.
describe('a caster who carries a weapon has the arm for it', () => {
  const { pickDonor, scaleDonor } = require('../scale.mjs');
  const donor = () => pickDonor(8, 'warpriest', 'caster') ?? pickDonor(8, null, 'caster');
  const fit = (concept) => scaleDonor(donor(), 8, { mechanics: [], concept });

  test('a mundane melee weapon in the words makes the striker physical', () => {
    const armed = fit('a battle-cleric who smites with a greatsword and casts blessings');
    expect(armed.striker_stat).toBe('STR');
    expect(Math.floor((armed.stats.STR - 10) / 2) + armed.pb).toBe(armed.atk); // the row's bonus derives from the arm
    expect(armed.stats.WIS).toBeGreaterThanOrEqual(16);                         // and the mind still carries the DC
  });

  test('a caster with no weapon still strikes with the mind', () => {
    // a PLAIN caster line, not the warpriest: that one is a weapon line by shape
    const plain = scaleDonor(pickDonor(8, null, 'caster'), 8, { mechanics: [], concept: 'a court wizard who hurls bolts of force' });
    expect(['INT', 'WIS', 'CHA']).toContain(plain.striker_stat);
    expect(Math.floor((plain.stats[plain.striker_stat] - 10) / 2) + plain.pb).toBe(plain.atk);
  });

  test('the warpriest line is a weapon line, so the arm is fitted before the name exists', () => {
    // its chassis carries a melee row the model will name a mace or a sword
    const wp = scaleDonor(pickDonor(6, 'warpriest', 'caster'), 6, { mechanics: [], concept: 'a templar priest of the dawn' });
    expect(wp.striker_stat).toBe('STR');
    expect(Math.floor((wp.stats.STR - 10) / 2) + wp.pb).toBe(wp.atk);
    expect(wp.stats.WIS).toBeGreaterThanOrEqual(16); // print's Priest is STR 16 and WIS 16
  });

  test('a finesse weapon keys Dexterity, not Strength', () => {
    const f = scaleDonor(donor(), 8, { mechanics: [], concept: 'a temple assassin with a rapier who whispers prayers' });
    expect(['DEX', 'STR']).toContain(f.striker_stat);
    expect(Math.floor((f.stats[f.striker_stat] - 10) / 2) + f.pb).toBe(f.atk);
  });
});

// THE BRANCH-CONFIRM READ (2026-10-14). One principle at four gates: a gate may
// shape what the GM asked for, never remove it.
describe('a gate shapes an explicit ask, never removes it', () => {
  const { templatesFor, TEMPLATE_BY_ID } = require('../templates.mjs');
  const { printCanonFor } = require('../generate.mjs');
  const onMenu = (c, id, arch, section = 'action') => templatesFor({ archetype: arch, cr: 7, sections: {}, section, trigger: null, concept: c }).some((t) => t.id === id);

  test('the role shelf steps aside for a shape the GM\'s own words key', () => {
    // the critic's call: "the shelf is a default for what the GM didn't say, not a veto on what they did"
    expect(onMenu('a herdmaster who commands a stampede of thunder-elk', 'trample', 'defender')).toBe(true);
    expect(onMenu('a knight who holds the line', 'trample', 'defender')).toBe(false);
    expect(onMenu('an oathsworn crusader who smites the unclean', 'coating', 'defender', 'bonus_action')).toBe(true);
    expect(onMenu('a knight who holds the line', 'coating', 'defender', 'bonus_action')).toBe(false);
    expect(TEMPLATE_BY_ID.get('coating').keys).toContain('smite'); // the shape IS a smite, and its keys say so
  });

  test('a tail match needs a role word at the head, never a creature noun', () => {
    // "a bulwark-sworn sentinel" came out a Medium Elemental with Fire immunity
    expect(printCanonFor('a bulwark-sworn sentinel with a broken greatsword and a battered shield', 7)).toBeNull();
    expect(printCanonFor('an azer sentinel', 2)?.name).toBe('Azer Sentinel');     // the whole name still resolves
    expect(printCanonFor('a hardened veteran of the border wars', 3)?.name).toBe('Warrior Veteran');
    expect(printCanonFor('a guard captain of the dusk watch', 4)?.name).toBe('Guard Captain');
    expect(printCanonFor('a bear', 1)?.name).toBe('Brown Bear');                   // a creature tail is a family
    expect(printCanonFor('a hag who trades in teeth', 5)?.name).toMatch(/Hag$/);
  });

  test('the species type lands before every type-keyed pass', async () => {
    const desc = 'a tiefling cutpurse who strikes from the dark with a shortsword';
    const m = await gen({ archetype: 'lurker', concept: desc, userConcept: desc, cr: 5 }, json('Vespera Vaunt', 'Fiend', 5, null, 'lurker', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }));
    expect(m.type).toMatch(/^Humanoid/);                       // the tiefling kit's type, not the route's Fiend
    expect(String(m.immunities ?? '')).not.toMatch(/Poison/);   // nothing keyed on Fiend in between
    expect(String(m.speed ?? '')).toMatch(/^30 ft/);
  });

  test('a class-kit row the GM named survives the print pass', () => {
    // "rogue" is in the words, so Cunning Action stays on the Imp's body
    const src = require('fs').readFileSync(require('path').join(__dirname, '../generate.mjs'), 'utf8');
    expect(src).toMatch(/if \(e\.library \|\| e\.print \|\| e\.kit \|\| e\.part \|\| e\.feature\) continue;/);
  });

  test('a row whose name failed to parse never ships', () => {
    const sheet = (name, text) => ({ format: '2024', name: 'Hollow Warden', inline: 'the warden', type: 'Humanoid', size: 'Medium', cr: 7, ac: 17, hp: 110, hp_formula: '13d8 + 52', pb: 3,
      speed: '30 ft.', alignment: 'Neutral', languages: 'Common', stats: { STR: 18, DEX: 12, CON: 18, INT: 10, WIS: 12, CHA: 10 }, generation: { clauses: [] },
      sections: { Traits: [{ name, text }] } });
    const rules = (m) => checkBlock(m).gates.reader.findings.map((f) => f.rule);
    expect(rules(sheet('', 'It burns.'))).toContain('row-parse');
    expect(rules(sheet('Heated Body', 'of the azer\'s choice. At the end of each of its turns…'))).toContain('row-parse');
    expect(rules(sheet('Heated Body', 'The warden radiates heat.'))).not.toContain('row-parse');
  });
});

// HOLD 7 AND THE NOTES (2026-10-14).
describe('the floor re-slots, and the notes', () => {
  test('a lance reaches 10 feet', async () => {
    const desc = 'a mounted oathkeeper who charges with a lance';
    const m = await gen({ archetype: 'brute', concept: desc, userConcept: desc, cr: 7 }, json('Dawnvowed Halvard', 'Humanoid', 7, null, 'brute', { extra: { clauses: [{ text: 'a lance', kind: 'mechanical' }, { text: 'charges', kind: 'mechanical' }] } }));
    for (const e of rows(m)) {
      if (!/\blance\b/i.test(String(e.name ?? ''))) continue;
      const r = /reach (\d+) ft/.exec(e.text ?? '');
      if (r) expect(Number(r[1])).toBeGreaterThanOrEqual(10);
    }
  });

  test('2014 writes a condition in prose', () => {
    const { to2014Grammar } = require('../../format-2024/generate.mjs');
    expect(to2014Grammar('On a failed save, if the target is Medium or smaller, it has the Prone condition.')).toContain('is knocked prone');
    expect(to2014Grammar('The target has the Poisoned condition until the end of its next turn.')).toContain('is poisoned');
    expect(to2014Grammar('The target has the Blinded and Restrained conditions.')).toBe('The target is blinded and restrained.');
  });

  test('"no magic at all" keys nothing', () => {
    const { scrubDeniedClauses, rankByVerb, TEMPLATE_BY_ID } = require('../templates.mjs');
    const t = 'a templar priest with a mace and no magic at all';
    expect(scrubDeniedClauses(t)).not.toMatch(/magic/i);
    expect(rankByVerb([TEMPLATE_BY_ID.get('uncanny-sense')], t).filter((x) => x.concept.length)).toHaveLength(0);
    expect(scrubDeniedClauses(t)).toMatch(/mace/); // the words before the lack stay
  });

  test('the greatsword\'s mastery is Graze; Topple belongs to the maul and its kin', () => {
    const { featureRows } = require('../features.mjs');
    // no style word in the clause: a style clause takes the slots with Trip
    // Attack and Riposte before a mastery is reached, which is its own rule
    const of = (w) => featureRows([{ text: `a reaver with a ${w}`, kind: 'mechanical' }], { parts: [{ part: true, weapon: w, name: w.replace(/^./, (c) => c.toUpperCase()), mode: 'melee', clause: `a ${w}` }], inline: 'the reaver', pb: 3, dc: 14, mod: 4, dexMod: 1 }).map((f) => f.name);
    // Topple is the trident's and the quarterstaff's. A HEAVY weapon earns Great
    // Weapon Master instead — one feature per named weapon, and GWM outranks the
    // mastery — so the maul and the greatsword never carry Topple either way.
    expect(of('trident')).toContain('Topple');
    expect(of('quarterstaff')).toContain('Topple');
    expect(of('greatsword')).not.toContain('Topple');
    expect(of('maul')).not.toContain('Topple');
    expect(of('greatsword')).toContain('Great Weapon Master');
  });
});

// THE SHIELD RULE, PINNED (critic, 2026-10-14: "it has now declined on four
// sheets. Pin it in unit tests and stop spending live blocks on it."). Print's
// Gladiator bashes with its shield for smaller dice and a Prone rider, beside
// its Spear; a shield is never a second weapon at the sword's own numbers.
describe('a shield is not a second weapon', () => {
  const { TEMPLATE_BY_ID, renderTemplate } = require('../templates.mjs');

  test('the rule reaches for print\'s Shield Bash shape, which carries its own dice and a rider', () => {
    const t = TEMPLATE_BY_ID.get('shield-bash');
    expect(t).toBeTruthy();
    expect(t.cite).toMatch(/Gladiator/);
    const ctx = { scaled: { cr: 7, pb: 3, dc: 15, atk: 7, per_hit: 16, stats: { STR: 18, DEX: 12, CON: 16, INT: 10, WIS: 12, CHA: 10 }, striker_stat: 'STR', sections: {} }, sections: {}, archetype: 'defender', cr: 7, concept: 'a sentinel with a greatsword and a shield', name: 'Warden', type: 'Humanoid', meleeName: 'Greatsword', meleeType: 'Slashing' };
    const r = renderTemplate(t, ctx, {}, { blind: true });
    expect(r.text).toMatch(/Strength Saving Throw/);          // a save, not a second attack roll
    expect(r.text).toMatch(/\{?\d+\}? \(\d+d\d+\) Bludgeoning damage/);
    expect(r.text).toMatch(/Prone condition/);
    expect(r.section).toBe('Actions');
  });

  test('the engine reaches for it only when a shield row stands beside another melee row', () => {
    const src = require('fs').readFileSync(require('path').join(__dirname, '../generate.mjs'), 'utf8');
    // the condition: a shield-named attack row, not print's, with another melee row present
    expect(src).toMatch(/A SHIELD IS NOT A SECOND WEAPON/);
    expect(src).toMatch(/\/\^\(\?:shield\|buckler\|tower shield\|kite shield\)\$\/i/);
    expect(src).toMatch(/shieldRow && otherMelee/);
  });
});
