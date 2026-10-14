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
