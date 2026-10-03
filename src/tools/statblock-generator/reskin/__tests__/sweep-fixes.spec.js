// PINS FROM THE FIRST SWEEP (checker, 2026-10-02): the engine defects the gate
// table surfaced, each held by a hand-built case.
import { generateReskin, printCanonFor } from '../generate.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';
import { to2014Grammar } from '../../format-2024/generate.mjs';
import { checkBlock } from '../checker.mjs';

const answer = (over = {}) => JSON.stringify({ name: 'Test', type: 'Beast', size: 'Medium', alignment: 'Unaligned', senses: 'darkvision 60 ft.', languages: 'None',
  renames: { 'Melee Attack': 'Thorn Rake', 'Ranged Attack': 'Cast Thorn', 'Sweeping Area Attack': 'Bramble Sweep', 'Signature Slot': 'Waylay', 'Escape Action': 'Fade', 'Mobility Trait': 'Hedge Runner', 'Reactive Reposition': 'Slip', 'Legendary Move and Attack': 'Circling Cut', 'Legendary Ranged Attack': 'Parting Thorn', 'Legendary Escape': 'Gone' },
  damage_types: { 'Thorn Rake': 'Slashing', 'Cast Thorn': 'Piercing', 'Bramble Sweep': 'Slashing' }, conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: 'x', ...over });

describe('the print window on fractional CRs', () => {
  test('a CR 1 goblin warrior does not wear the CR 1/4 Goblin Warrior\'s 10 HP; a CR 1/4 kobold still takes the CR 1/8 Kobold Warrior\'s 7', async () => {
    const g = await generateReskin({ archetype: 'skirmisher', concept: 'a goblin warrior', userConcept: 'a goblin warrior', cr: 1 }, async () => answer({ name: 'Goblin Warrior', type: 'Fey', size: 'Small' }));
    expect(g.hp).toBeGreaterThan(15);
    const k = await generateReskin({ archetype: 'skirmisher', concept: 'Kobold', userConcept: 'Kobold', cr: 0.25 }, async () => answer({ name: 'Kobold', type: 'Humanoid', size: 'Small' }));
    expect(k.hp).toBe(7);
  });
});

describe('print rows a print row references ride along', () => {
  test('the Vampire\'s Shape-Shift is stamped even though Misty Escape names it in its text (names-only hasRow)', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(13, null, 'lurker'), 13, { mechanics: [] });
    const renames = { Teleport: 'Blink Step' }; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; }); // the engine adds a Teleport row the chassis list does not carry
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const vamp = JSON.stringify({ name: 'Vampire', type: 'Undead', size: 'Medium', alignment: 'Lawful Evil', senses: 'darkvision 120 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 30 feet. *Failure:* The target has the Frightened condition.` });
    const m = await generateReskin({ archetype: 'lurker', concept: 'a vampire', userConcept: 'a vampire', cr: 13 }, async () => vamp);
    expect((m.sections['Bonus Actions'] ?? []).map((e) => e.name)).toEqual(expect.arrayContaining(['Shape-Shift', 'Charm (Recharge 5-6)']));
  });
});

describe('a print block with no DC of its own', () => {
  test('the Flesh Golem borrow derives a DC from print\'s array instead of keeping the card\'s', async () => {
    const pc = printCanonFor('a brass gate-golem that crushes anyone who forces the lock', 5); expect(pc?.name).toBe('Flesh Golem'); expect(Number.isFinite(pc.dc)).toBe(false);
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(5, 'grappler', 'brute'), 5, { mechanics: [] });
    const renames = {}; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const concept = 'a brass gate-golem that crushes anyone who forces the lock';
    const golem = JSON.stringify({ name: 'Jamb Warden', type: 'Construct', size: 'Medium', alignment: 'Unaligned', senses: 'darkvision 60 ft.', languages: 'None', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 5 feet. *Failure:* The target has the Prone condition.` });
    const m = await generateReskin({ archetype: 'brute', style: 'grappler', concept, userConcept: concept, cr: 5 }, async () => golem);
    const dcs = [...JSON.stringify(m.sections).matchAll(/(?<!escape )DC (\d+)/g)].map((x) => Number(x[1]));
    const pb = m.pb; const mods = Object.fromEntries(Object.entries(m.stats).map(([k, v]) => [k, Math.floor((v - 10) / 2)]));
    for (const dc of dcs) expect(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].some((k) => Math.abs(8 + pb + mods[k] - dc) <= 1)).toBe(true);
    expect(m.hp).toBe(127); // print's HP survives the size stamp's rebuild (127 → 123 → 119 was two roundings)
  });
});

describe('the 2014 grammar pass', () => {
  test('attack rolls, saving throws, Failure/Success, Bloodied and capitalized types become 2014 idiom', () => {
    expect(to2014Grammar('*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage.')).toBe('Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 20 (3d10 + 4) slashing damage.');
    expect(to2014Grammar('*Ranged Attack Roll:* +6, range 30/120 ft. 7 (1d8 + 3) Piercing damage.')).toBe('Ranged Weapon Attack: +6 to hit, range 30/120 ft., one target. Hit: 7 (1d8 + 3) piercing damage.');
    expect(to2014Grammar('*Dexterity Saving Throw*: DC 15, each creature in a 60-foot Cone. *Failure:* 28 (8d6) Fire damage. *Success:* Half damage.')).toBe('Each creature in a 60-foot cone must make a DC 15 Dexterity saving throw, taking 28 (8d6) fire damage on a failed save, or half as much damage on a successful one.');
    expect(to2014Grammar('If the swarm is Bloodied, it deals half damage.')).toBe('If the swarm has half its hit points or fewer, it deals half damage.');
    expect(to2014Grammar('Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage.')).toBe('Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage.'); // already 2014: untouched
  });
});

describe('the spell DC coherence (checker sweep 2026-10-02)', () => {
  test('a caster whose spellcasting stat also makes its attack rolls keeps the stat and lowers the DC; a stat that makes no attack rises to support the DC', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(8, 'binder', 'caster'), 8, { mechanics: [] });
    const renames = {}; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const seer = JSON.stringify({ name: 'Firstborn Seer', type: 'Humanoid', size: 'Medium', alignment: 'Neutral Evil', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Necrotic'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Wisdom', spells: { at_will: ['Detect Magic', 'Minor Illusion'], daily: ['Hold Person', 'Darkness'] }, wildcard: `*Wisdom Saving Throw*: DC ${scaled.dc}, one creature within 60 feet. *Failure:* The target has the Frightened condition until the end of its next turn.` });
    const m = await generateReskin({ archetype: 'caster', style: 'binder', concept: 'a plague-seer who curses the firstborn of every house', userConcept: 'a plague-seer who curses the firstborn of every house', cr: 8, mechanics: [] }, async () => seer);
    const pb = m.pb; const mods = Object.fromEntries(Object.entries(m.stats).map(([k, v]) => [k, Math.floor((v - 10) / 2)]));
    for (const e of Object.values(m.sections).flat()) {
      const atk = /Attack Roll:\*?\s*\+(\d+)/.exec(e.text ?? ''); if (atk) expect(Object.values(mods).some((x) => x + pb === Number(atk[1]))).toBe(true);
      const sm = /using (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) as the spellcasting ability \(spell save DC (\d+)/.exec(e.text ?? '');
      if (sm) { const key = { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' }[sm[1]]; expect(8 + pb + mods[key]).toBe(Number(sm[2])); }
    }
  });
});
describe('row names are unique across sections', () => {
  test('a legendary row that collides with an action takes a distinct verb', async () => {
    const { renameKeysOf: rk } = require('../generate.mjs');
    const scaled = scaleDonor(pickDonor(17, null, 'brute'), 17, { mechanics: [] });
    const renames = {}; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    for (const k of Object.keys(renames)) if (/^Legendary Move and Attack$/.test(k)) renames[k] = renames['Melee Attack'] ?? 'Rend';
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}')).map((e) => renames[e.name] ?? e.name);
    const b = JSON.stringify({ name: 'Collider', type: 'Monstrosity', size: 'Huge', alignment: 'Unaligned', senses: 'darkvision 60 ft.', languages: 'None', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 10 feet. *Failure:* The target has the Prone condition.` });
    const m = await generateReskin({ archetype: 'brute', concept: 'a hulk', userConcept: 'a hulk', cr: 17 }, async () => b);
    const names = Object.values(m.sections).flat().map((e) => String(e.name).replace(/ \(.*\)$/, '').toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('the final derivations: the checker\'s own derivation gate on generated blocks', () => {
  const rows = (cr, style, arch) => { const { renameKeysOf: rk } = require('../generate.mjs'); const scaled = scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [] }); const renames = { Teleport: 'Blink Step', 'Ranged Attack': 'Hurl' }; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; }); const typed = [...Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name), 'Hurl']; return { scaled, renames, typed }; };
  for (const [cr, style, arch, type] of [[5, 'grappler', 'brute', 'Monstrosity'], [8, 'binder', 'caster', 'Humanoid'], [13, null, 'lurker', 'Undead'], [18, 'mounted', 'skirmisher', 'Fiend']]) {
    test(`${arch}${style ? '-' + style : ''} at CR ${cr}: no derivation finding past the chassis DC float`, async () => {
      const { scaled, renames, typed } = rows(cr, style, arch);
      const json = JSON.stringify({ name: 'Derived', type, size: 'Medium', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', slot_save: 'Wisdom', spells: { at_will: ['Detect Magic', 'Minor Illusion'], daily: ['Hold Person', 'Darkness'] }, wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 10 feet. *Failure:* The target has the Prone condition.` });
      const m = await generateReskin({ archetype: arch, style: style ?? undefined, concept: 'a thing that fights', userConcept: 'a thing that fights', cr, mechanics: [] }, async () => json);
      const r = checkBlock(m);
      expect(r.gates.derivation.findings.filter((f) => f.severity !== 'ok').map((f) => `${f.rule}: ${f.message}`)).toEqual([]);
    });
  }
});

describe('the critic\'s audit, engine side (2026-10-02)', () => {
  const mk = (cr, style, arch, extraRenames = {}) => { const { renameKeysOf: rk } = require('../generate.mjs'); const scaled = scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [] }); const renames = { Teleport: 'Blink Step', 'Ranged Attack': 'Hurl' }; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; }); for (const e of scaled.sections['Legendary Actions'] ?? []) if (!renames[e.name] && !/^Legendary Action Uses/.test(e.name)) renames[e.name] = `Grave ${e.name.replace(/^Legendary /, '')}`; Object.assign(renames, extraRenames); const typed = [...Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name), 'Hurl']; return { scaled, renames, typed }; };
  const json = (name, type, cr, style, arch, over = {}) => { const { scaled, renames, typed } = mk(cr, style, arch, over.renames ?? {}); return JSON.stringify({ name, type, size: over.size ?? 'Medium', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: over.languages ?? 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, over.dtype ?? 'Slashing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 10 feet. *Failure:* The target has the Prone condition.`, ...(over.extra ?? {}) }); };
  test('print\'s own legendary rows stand where the chassis\'s stood: the Adult Green Dragon pounces', async () => {
    const m = await generateReskin({ archetype: 'brute', bodyType: 'dragon', concept: 'an adult green dragon', userConcept: 'an adult green dragon', cr: 15, mechanics: ['breath'] }, async () => json('Adult Green Dragon', 'Dragon', 15, null, 'dragon', { size: 'Huge' }));
    const names = (m.sections['Legendary Actions'] ?? []).map((e) => e.name);
    expect(names).toEqual(expect.arrayContaining(['Pounce']));
    expect(names.some((n) => /Mind Invasion|Noxious Miasma/.test(n))).toBe(true);
  });
  test('print\'s Regeneration number replaces the chassis\'s on the Troll', async () => {
    const m = await generateReskin({ archetype: 'brute', style: 'regenerator', concept: 'a troll', userConcept: 'a troll', cr: 5 }, async () => json('Troll', 'Giant', 5, 'regenerator', 'brute', { size: 'Large' }));
    const regen = (m.sections.Traits ?? []).find((e) => /^Regeneration/.test(e.name));
    expect(regen?.text).toMatch(/regains 15 Hit Points/);
  });
  test('a lantern warrants Fire in the user\'s words without making a row named for it owe Fire; "glass-eyed" is no glass body; a Humanoid walks 30', async () => {
    const concept = 'a glass-eyed hermit who hurls her lantern at thieves';
    const m = await generateReskin({ archetype: 'skirmisher', style: 'hurler', concept, userConcept: concept, cr: 3, energy: 'Fire', resolvedType: 'Humanoid' }, async () => json('Lamplighter', 'Humanoid', 3, 'hurler', 'skirmisher', { dtype: 'Fire', renames: { 'Ranged Attack': 'Lantern Toss' }, extra: { projectile: 'her lantern' } }));
    expect(String(m.vulnerabilities ?? '')).not.toMatch(/Thunder/);
    expect(m.speed).toMatch(/^30 ft\./);
    expect(JSON.stringify(m.sections)).toMatch(/Fire damage/);
  });
  test('a row named Slam deals Bludgeoning whatever the model typed', async () => {
    const m = await generateReskin({ archetype: 'brute', concept: 'a stone brute', userConcept: 'a stone brute', cr: 5 }, async () => json('Brute', 'Monstrosity', 5, null, 'brute', { size: 'Large', dtype: 'Piercing', renames: { 'Melee Attack': 'Slam' } }));
    const slam = Object.values(m.sections).flat().find((e) => e.name === 'Slam');
    expect(slam?.text).toMatch(/Bludgeoning damage/);
  });
  test('a caster that casts is not mute; the inline is capitalized at a sentence start', async () => {
    const m = await generateReskin({ archetype: 'caster', style: 'binder', concept: 'an archlich who binds the dead', userConcept: 'an archlich who binds the dead', cr: 17, mechanics: [] }, async () => json('Aurex the Deathless', 'Undead', 17, 'binder', 'caster', { languages: "understands Common but can't speak", extra: { slot_save: 'Wisdom', spells: { at_will: ['Detect Magic', 'Minor Illusion'], daily: ['Hold Person', 'Darkness'] } } }));
    expect(m.languages).not.toMatch(/can['’]t speak/);
    for (const e of Object.values(m.sections).flat()) expect(e.text).not.toMatch(/[.!?]\s+the \w/);
  });

  test('the user\'s wildcard cannot carry its own escape DC: every escape DC is 8 + PB + STR (the Peat Hound\'s Silt Drag, sweep 2026-10-02)', async () => {
    const m = await generateReskin({ archetype: 'brute', style: 'grappler', concept: 'a peat hound that drags prey into the bog', userConcept: 'a peat hound that drags prey into the bog', cr: 1 }, async () => json('Peat Hound', 'Monstrosity', 1, 'grappler', 'brute', { extra: { wildcard: '*Strength Saving Throw:* DC 11, one creature within 20 feet. *Failure:* The target is pulled up to 15 feet straight toward the peat hound and has the Grappled condition (escape DC 11).' } }));
    const escDC = 8 + m.pb + Math.floor((m.stats.STR - 10) / 2);
    const dcs = [...JSON.stringify(m.sections).matchAll(/escape DC (\d+)/g)].map((x) => Number(x[1]));
    expect(dcs.length).toBeGreaterThan(0); expect(new Set(dcs)).toEqual(new Set([escDC]));
  });

  test('a print body with one melee row keeps one: the Shield Guardian\'s Fist stands alone and Multiattack reads print\'s (the Bedrock Warden\'s Heavy Fist, goldens 2026-10-03)', async () => {
    const concept = 'a stone shrine-guardian bound to the high priest it was made to protect';
    const m = await generateReskin({ archetype: 'defender', concept, userConcept: concept, cr: 7, mechanics: [] }, async () => json('Bedrock Warden', 'Construct', 7, null, 'defender', { size: 'Large' }));
    const melee = Object.values(m.sections).flat().filter((e) => /Melee Attack Roll/.test(e.text));
    expect(melee.map((e) => e.name)).toEqual(['Fist']);
    const texts = Object.values(m.sections).flat().map((e) => e.text); expect(new Set(texts).size).toBe(texts.length);
    expect(Object.values(m.sections).flat().find((e) => e.name === 'Multiattack')?.text).toMatch(/makes two Fist attacks/);
  });

  test('"a hydra" carries print\'s traits and no Regeneration: the regenerator seat\'s organ leaves with the seat (rerun 2026-10-03)', async () => {
    const m = await generateReskin({ archetype: 'brute', style: 'regenerator', mechanics: ['regeneration'], concept: 'a hydra', userConcept: 'a hydra', cr: 8 }, async () => json('Hydra', 'Monstrosity', 8, null, 'brute', { size: 'Huge' }));
    const traits = (m.sections.Traits ?? []).map((e) => e.name);
    expect(traits).toEqual(expect.arrayContaining(['Multiple Heads', 'Reactive Heads'])); expect(traits).not.toContain('Regeneration');
  });

  describe('a print name with a trailing modifier is that print block (critic\'s release audit 2026-10-03)', () => {
    test('"a vampire lord who…" borrows the Vampire: its rows and array ride', async () => {
      const c = 'a vampire lord who commands bats and wolves';
      const m = await generateReskin({ archetype: 'lurker', concept: c, userConcept: c, cr: 15, mechanics: [] }, async () => json('Count Vel', 'Undead', 15, null, 'lurker', { size: 'Medium' }));
      const names = Object.values(m.sections).flat().map((e) => e.name.replace(/ \(.*\)$/, ''));
      expect(names).toEqual(expect.arrayContaining(['Bite', 'Charm', 'Misty Escape', 'Spider Climb'])); // print's 2024 Vampire (no Children of the Night in the SRD 5.2)
    });
    test('"a kraken of the black trench" is the Kraken: Amphibious, Swallow, print\'s languages', async () => {
      const c = 'a kraken of the black trench';
      const m = await generateReskin({ archetype: 'brute', concept: c, userConcept: c, cr: 24, mechanics: [] }, async () => json('Black Trench Kraken', 'Monstrosity', 24, null, 'brute', { size: 'Gargantuan', languages: 'Common' }));
      const names = Object.values(m.sections).flat().map((e) => e.name.replace(/ \(.*\)$/, ''));
      expect(names).toEqual(expect.arrayContaining(['Amphibious', 'Swallow']));
      expect(m.languages).not.toMatch(/^Common$/);
    });
    test('"a pit fiend general" is the Pit Fiend: Fire immunity and Fear Aura', async () => {
      const c = 'a pit fiend general';
      const m = await generateReskin({ archetype: 'brute', concept: c, userConcept: c, cr: 20, mechanics: [] }, async () => json('General Vhorzak', 'Fiend', 20, null, 'brute', { size: 'Large' }));
      expect(String(m.immunities)).toMatch(/Fire/); expect(String(m.resistances ?? '')).not.toMatch(/Fire/);
      expect(Object.values(m.sections).flat().some((e) => /^Fear Aura/.test(e.name))).toBe(true);
    });
    test('"an archlich enthroned…" borrows the Lich and casts', async () => {
      const c = 'an archlich enthroned on a sun of bone';
      const m = await generateReskin({ archetype: 'lurker', style: 'phantom', concept: c, userConcept: c, cr: 24, mechanics: [] }, async () => json('Sun-Crowned Archlich', 'Undead', 24, null, 'lurker', { size: 'Medium' })); // the print route stands the phantom seat down: the plain lurker chassis
      expect(JSON.stringify({ names: Object.values(m.sections).flat().map((e) => e.name), trace: (m.trace ?? []).filter((x) => /Spellcasting|rules row|print canon/.test(x)).map((x) => x.slice(0, 160)) })).toMatch(/"Spellcasting/);
    });
  });

  test('one 2014 save idiom: damage leads with "taking … on a failed save"; a bare condition save keeps its own clause; the lead-in folds (the Ashen Marshal and Lysandra, critic 2026-10-03)', () => {
    const { canonSave2014 } = require('../../format-2024/generate.mjs');
    expect(to2014Grammar('Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC 19. *Failure:* 72 (16d8) Fire damage, and the target has the Prone condition. *Success:* Half damage only.'))
      .toBe('Each creature whose space it enters must make a DC 19 Strength saving throw, taking 72 (16d8) fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target has the Prone condition.');
    expect(canonSave2014('*Wisdom Saving Throw*: DC 16, one creature within 60 feet. *Failure:* The target has the Paralyzed condition until the end of its next turn.'))
      .toBe('One creature within 60 feet must make a DC 16 Wisdom saving throw. On a failed save, the target has the Paralyzed condition until the end of its next turn.');
    expect(canonSave2014('*Constitution Saving Throw*: DC 14, each creature in a 20-foot Sphere. *Failure:* 21 (6d6) Poison damage. *Success:* The target is Poisoned until the end of its next turn.'))
      .toMatch(/taking 21 \(6d6\) Poison damage on a failed save\. On a successful save, the target is Poisoned/);
  });
});
