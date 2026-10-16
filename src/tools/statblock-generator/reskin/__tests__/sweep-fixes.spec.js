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
  const rows = (cr, style, arch) => { const { renameKeysOf: rk } = require('../generate.mjs'); const scaled = scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [] }); const renames = { Teleport: 'Blink Step', 'Ranged Attack': 'Hurl', 'Hybrid Attack': 'Hybrid Strike' }; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; }); const typed = [...Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name), 'Hurl', 'Hybrid Strike']; return { scaled, renames, typed }; };
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
  const mk = (cr, style, arch, extraRenames = {}) => { const { renameKeysOf: rk } = require('../generate.mjs'); const scaled = scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [] }); const renames = { Teleport: 'Blink Step', 'Ranged Attack': 'Hurl', 'Hybrid Attack': 'Hybrid Strike' }; rk(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; }); for (const e of scaled.sections['Legendary Actions'] ?? []) if (!renames[e.name] && !/^Legendary Action Uses/.test(e.name)) renames[e.name] = `Grave ${e.name.replace(/^Legendary /, '')}`; Object.assign(renames, extraRenames); const typed = [...Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name), 'Hurl', 'Hybrid Strike']; return { scaled, renames, typed }; };
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
      const m = await generateReskin({ archetype: 'lurker', style: 'phantom', concept: c, userConcept: c, cr: 24, mechanics: [] }, async () => json('Sun-Crowned Archlich', 'Undead', 24, null, 'caster', { size: 'Medium' })); // the print route stands the phantom seat down: the plain lurker chassis
      expect(JSON.stringify({ names: Object.values(m.sections).flat().map((e) => e.name), trace: (m.trace ?? []).filter((x) => /Spellcasting|rules row|print canon/.test(x)).map((x) => x.slice(0, 160)) })).toMatch(/"Spellcasting/);
    });
  });

  test('one 2014 save idiom: damage leads with "taking … on a failed save"; a bare condition save keeps its own clause; the lead-in folds (the Ashen Marshal and Lysandra, critic 2026-10-03)', () => {
    const { canonSave2014 } = require('../../format-2024/generate.mjs');
    expect(to2014Grammar('Each creature whose space it enters is targeted once by the following effect. *Strength Saving Throw*: DC 19. *Failure:* 72 (16d8) Fire damage, and the target has the Prone condition. *Success:* Half damage only.'))
      // 2014 writes a condition in prose (critic, 2026-10-14): "is knocked prone",
      // never "has the Prone condition". The structure this pin is about is unchanged.
      .toBe('Each creature whose space it enters must make a DC 19 Strength saving throw, taking 72 (16d8) fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target is knocked prone.');
    expect(canonSave2014('*Wisdom Saving Throw*: DC 16, one creature within 60 feet. *Failure:* The target has the Paralyzed condition until the end of its next turn.'))
      .toBe('One creature within 60 feet must make a DC 16 Wisdom saving throw. On a failed save, the target has the Paralyzed condition until the end of its next turn.');
    expect(canonSave2014('*Constitution Saving Throw*: DC 14, each creature in a 20-foot Sphere. *Failure:* 21 (6d6) Poison damage. *Success:* The target is Poisoned until the end of its next turn.'))
      .toMatch(/taking 21 \(6d6\) Poison damage on a failed save\. On a successful save, the target is Poisoned/);
  });

  describe("the critic's blockers audit, engine side (2026-10-03)", () => {
    test("print's self-reference becomes the inline in one pass: no \"the vampire lord lord's\", no \"this pit the pit fiend general's\"", async () => {
      const c = 'a vampire lord who commands bats and wolves';
      const m = await generateReskin({ archetype: 'lurker', concept: c, userConcept: c, cr: 15, mechanics: [] }, async () => json('Count Vel', 'Undead', 15, null, 'lurker', { size: 'Medium' }));
      const all = JSON.stringify(m.sections);
      expect(all).not.toMatch(/lord lord|the the |this the /i);
      const p = 'a pit fiend general';
      const pf = await generateReskin({ archetype: 'brute', concept: p, userConcept: p, cr: 20, mechanics: [] }, async () => json('General Vhorzak', 'Fiend', 20, null, 'brute', { size: 'Large' }));
      const aura = (pf.sections.Traits ?? []).find((e) => /^Fear Aura/.test(e.name));
      expect(aura.text).toMatch(/aura for 24 hours/); expect(aura.text).not.toMatch(/this (?:the|pit the)/);
    });
    test("the inline follows the print name even when the model coined one with \"the\" (Green Dragon rows read \"the dragon\", not \"the blackroot wyrm\")", async () => {
      const c = 'an adult green dragon';
      const m = await generateReskin({ archetype: 'brute', bodyType: 'dragon', concept: c, userConcept: c, cr: 15, mechanics: ['breath'] }, async () => json('Blackroot Wyrm', 'Dragon', 15, null, 'dragon', { size: 'Huge' }));
      expect(m.name).toBe('Adult Green Dragon');
      expect(m.inline).toBe('the dragon');
      expect(JSON.stringify(m.sections)).not.toMatch(/blackroot/i);
    });
    test('a print caster body takes the caster line so one stat carries the attack and the DC (the Lich on a Dex chassis)', async () => {
      const c = 'an archlich enthroned on a sun of bone';
      const m = await generateReskin({ archetype: 'lurker', style: 'phantom', concept: c, userConcept: c, cr: 24, mechanics: [] }, async () => json('Sun-Crowned Archlich', 'Undead', 24, null, 'caster', { size: 'Medium', extra: { slot_save: 'Intelligence', spells: { at_will: ['Detect Magic', 'Minor Illusion'], daily: ['Hold Person', 'Darkness'] } } }));
      expect(Object.values(m.sections).flat().some((e) => /^Spellcasting/.test(e.name))).toBe(true);
      const cast = Object.values(m.sections).flat().find((e) => /^Spellcasting/.test(e.name));
      const stat = /using (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) as the spellcasting ability/.exec(cast?.text ?? '')?.[1];
      const KEY = { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' };
      const want = m.pb + Math.floor((m.stats[KEY[stat]] - 10) / 2);
      for (const e of Object.values(m.sections).flat()) { const atk = /Attack Roll:\*? \+(\d+)/.exec(e.text ?? ''); if (atk) expect([e.name, Number(atk[1])]).toEqual([e.name, want]); }
    });
    test("a print block that prints \"Medium or Small\" is Medium, not Small (the vampire lord came out Small)", () => {
      const corpus = require('@/data/srd52-monsters.json');
      for (const n of ['Vampire', 'Archmage', 'Mummy Lord', 'Wraith', 'Mage', 'Assassin', 'Gladiator', 'Werebear', 'Vampire Spawn', 'Pirate Captain']) expect([n, corpus.find((x) => x.name === n).size]).toEqual([n, 'Medium']);
    });
  });

  describe("the 2014 sheet's render repairs (critic's blockers audit 2026-10-03)", () => {
    test('the 2024 lead-in folds into an already-2014 save; a bullet list becomes sentences; a hybrid row\'s label matches its range', () => {
      expect(to2014Grammar('The creature moves up to its Speed. Each creature whose space it enters is targeted once by the following effect. The target must make a DC 19 Strength saving throw, taking 72 (16d8) fire damage on a failed save.'))
        .toBe('The creature moves up to its Speed. Each creature whose space it enters must make a DC 19 Strength saving throw, taking 72 (16d8) fire damage on a failed save.');
      expect(to2014Grammar("The vampire has these weaknesses:\n\n\n- **Forbiddance**: The vampire can't enter a residence.\n- **Running Water**: The vampire takes 20 Acid damage."))
        .toBe("The vampire has these weaknesses: Forbiddance: The vampire can't enter a residence.\nRunning Water: The vampire takes 20 acid damage.");
      expect(to2014Grammar('Melee Spell Attack: +10 to hit, reach 5 ft. or range 120 ft., one target. Hit: 40 (8d8 + 4) necrotic damage.'))
        .toMatch(/^Melee or Ranged Spell Attack: \+10 to hit, reach 5 ft\. or range 120 ft\./);
      expect(to2014Grammar('*Melee Attack Roll:* +7, reach 10 ft. 20 (3d10 + 4) Slashing damage.'))
        .toBe('Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 20 (3d10 + 4) slashing damage.');
    });
  });

  test("the sheet's save DC derives from a stat the sheet has: the 2014 table's DC 21 on a caster's INT 18 comes down to 19 (sweep 2026-10-04)", async () => {
    const c = 'a bone-crowned necromancer who binds the dead';
    const m = await generateReskin({ archetype: 'caster', style: 'binder', concept: c, userConcept: c, cr: 24, edition: '2014', mechanics: [] }, async () => json('Ossuar Rex', 'Undead', 24, 'binder', 'caster', { size: 'Medium', extra: { slot_save: 'Intelligence', spells: { at_will: ['Detect Magic', 'Minor Illusion'], daily: ['Hold Person', 'Darkness'] } } }));
    const mods = Object.fromEntries(Object.entries(m.stats).map(([k, v]) => [k, Math.floor((v - 10) / 2)]));
    for (const d of [...new Set([...JSON.stringify(m.sections).matchAll(/DC (\d+)/g)].map((x) => Number(x[1])))]) {
      if (/escape DC/.test(JSON.stringify(m.sections)) && d === 8 + m.pb + mods.STR) continue;
      expect([d, Object.values(mods).some((v) => Math.abs(8 + m.pb + v - d) <= 1)]).toEqual([d, true]);
    }
  });

  test("the final price: one row serving Multiattack AND a legendary strike after a supersede is re-solved to the card (the death knight at 18 read CR 27 on offense, print-heads 2026-10-04)", async () => {
    const c = 'a death knight who hurls his greatsword and calls it back';
    const m = await generateReskin({ archetype: 'caster', style: 'warpriest', concept: c, userConcept: c, cr: 18, mechanics: [] }, async () => json('Mortis Anselm', 'Undead', 18, 'warpriest', 'caster', { size: 'Medium', renames: { 'Ranged Attack': 'Graveblade' }, extra: { projectile: 'his greatsword', slot_save: 'Constitution' } }));
    const { cardBudget: cb } = require('../card-budgets.mjs');
    const rows = Object.values(m.sections).flat();
    const avgOf = (t) => [...String(t).split(/\bIf\b|\bWhen\b/)[0].matchAll(/(\d+) \(\d+d\d+(?: [+-] \d+)?\)/g)].reduce((a, x) => a + Number(x[1]), 0);
    const atk = rows.filter((e) => /Attack Roll/.test(e.text ?? ''));
    const best = Math.max(...atk.map((e) => avgOf(e.text)));
    const n = ({ one: 1, two: 2, three: 3 }[(/makes (\w+)/i.exec(rows.find((e) => /^Multiattack/.test(e.name))?.text ?? '') ?? [])[1]?.toLowerCase()] ?? 1);
    const legStrikes = (m.sections['Legendary Actions'] ?? []).filter((e) => /makes one [A-Z][\w' -]*? attack/.test(e.text ?? '') && !/can['’]t take this action again/.test(e.text ?? '')).length;
    const round = best * n + best * (legStrikes ? 3 : 0);
    expect(round).toBeLessThanOrEqual(cb(18, { legendary: true }).dpr * 1.25);
  });

  describe("the critic's regressions brief (2026-10-04)", () => {
    test('the vampire\'s common noun stays print\'s: "Vampire Spawn", "vampire form", and "the vampire lord\'s" all intact', async () => {
      const c = 'a vampire lord who commands bats and wolves';
      const m = await generateReskin({ archetype: 'lurker', concept: c, userConcept: c, cr: 15, mechanics: [] }, async () => json('Count Vel', 'Undead', 15, null, 'lurker', { size: 'Medium' }));
      const all = JSON.stringify(m.sections);
      expect(all).toMatch(/Vampire Spawn/); expect(all).toMatch(/vampire form/i); expect(all).not.toMatch(/Count Vel Spawn|lord Spawn|lord form|lord lord/i);
    });
    test('the Lich on the caster chassis keeps print\'s slots: its spell list, a Paralyzing Touch that paralyzes, an Eldritch Burst with no rider', async () => {
      const c = 'an archlich enthroned on a sun of bone';
      const m = await generateReskin({ archetype: 'lurker', style: 'phantom', concept: c, userConcept: c, cr: 24, mechanics: [] }, async () => json('Sun-Crowned Archlich', 'Undead', 24, null, 'caster', { size: 'Medium', extra: { slot_save: 'Intelligence', spells: { at_will: ['Detect Magic', 'Minor Illusion'], daily: ['Hold Person', 'Darkness'] } } }));
      const rows = Object.values(m.sections).flat();
      const cast = rows.find((e) => /^Spellcasting/.test(e.name)); expect(cast?.text).toMatch(/Power Word Kill|Finger of Death/);
      const touch = rows.find((e) => e.name === 'Paralyzing Touch'); expect(touch?.text).toMatch(/has the Paralyzed condition/); expect(touch?.text).not.toMatch(/Poisoned|Frightened|Deafened/);
      const burst = rows.find((e) => e.name === 'Eldritch Burst'); expect(burst?.text).not.toMatch(/has the \w+ condition/);
    });
    test('the 2014 hybrid label is built once; the lead-in folds for "That creature" too', () => {
      expect(to2014Grammar('Melee or Ranged Spell Attack: +11 to hit, reach 5 ft. or range 120 ft., one target. Hit: 71 (15d8 + 4) slashing damage.')).not.toMatch(/Melee or Melee/);
      expect(to2014Grammar('Each creature whose space it enters is targeted once by the following effect. That creature must make a DC 19 Strength saving throw, taking 72 (16d8) fire damage on a failed save.')).toMatch(/^Each creature whose space it enters must make a DC 19/);
    });
  });

  describe('the flavor field (fidelity pipeline step 2)', () => {
    test('a row\'s flavor is a held field, never printed inside the row; the PI guard still scrubs a franchise token hiding in it', async () => {
      const { toLegacyModel } = require('../../format-2024/generate.mjs'); const { piGuard } = require('../lexicon.mjs');
      const c = 'a sentient pile of laundry that smothers people';
      const m = await generateReskin({ archetype: 'brute', style: 'grappler', concept: c, userConcept: c, cr: 3, mechanics: [] }, async () => json('Sock Pile', 'Monstrosity', 3, 'grappler', 'brute', { size: 'Medium' }));
      const row = m.sections.Actions.find((e) => /Attack Roll/.test(e.text)); row.flavor = 'It speaks only in the language of socks.';
      const L = toLegacyModel(m); expect(L.actions.find((a) => a.name === row.name).description).not.toMatch(/language of socks/); expect(row.flavor).toMatch(/socks/); // the field is kept; no card prints it inside a row (owner 2026-10-04)
      const g = { name: 'Pile', sections: { Actions: [{ name: 'Wrappings', text: 'Hits.', flavor: 'It once met a beholder.' }] } }; piGuard(g);
      expect(g.sections.Actions[0].flavor).not.toMatch(/beholder/);
    });
  });

  describe('two sweep defects the flavor forty surfaced (2026-10-04)', () => {
    test('a print rename does not reach into a row whose name STARTS with the old name: Scepter -> Eldritch Burst leaves "Scepter Blast" alone', async () => {
      const c = 'an archlich enthroned on a sun of bone';
      const m = await generateReskin({ archetype: 'lurker', style: 'phantom', concept: c, userConcept: c, cr: 24, mechanics: [] }, async () => json('Sun-Crowned Archlich', 'Undead', 24, null, 'caster', { size: 'Medium', renames: { 'Hybrid Attack': 'Scepter Blast' }, extra: { slot_save: 'Intelligence', spells: { at_will: ['Detect Magic', 'Minor Illusion'], daily: ['Hold Person', 'Darkness'] } } }));
      const names = Object.values(m.sections).flat().map((e) => e.name.replace(/ \(.*\)$/, ''));
      const ma = Object.values(m.sections).flat().find((e) => /^Multiattack/.test(e.name))?.text ?? '';
      for (const nm of [...ma.matchAll(/using ([^.]*?) in any combination/g)].flatMap((x) => x[1].split(/,|\bor\b/)).map((x) => x.trim()).filter(Boolean)) expect([nm, names.includes(nm)]).toEqual([nm, true]);
      expect(ma).not.toMatch(/Eldritch Burst Blast/);
    });
    test('two rows with identical text collapse to one before the audit can rename the second', async () => {
      const c = 'a mirror assassin who strikes from the reflections and blinks between them';
      const m = await generateReskin({ archetype: 'lurker', concept: c, userConcept: c, cr: 18, mechanics: [] }, async () => json('Glass Widow', 'Monstrosity', 18, null, 'lurker', { size: 'Medium' }));
      const texts = Object.values(m.sections).flat().map((e) => String(e.text).replace(/\s+/g, ' ').trim().toLowerCase());
      expect(new Set(texts).size).toBe(texts.length);
    });
  });

  describe('the slot-yield rule (fidelity pipeline step 2)', () => {
    test('a fitted thrown weapon takes the ranged slot: the chassis\'s Hurled Debris leaves and Multiattack names the keeper', async () => {
      const c = 'a hermit who hurls her javelin at thieves and calls it back';
      const main = json('Lamplighter', 'Humanoid', 3, null, 'skirmisher', { dtype: 'Fire', renames: { 'Ranged Attack': 'Hurled Debris' }, extra: { projectile: 'her javelin' } }); // a plain skirmisher: its chassis ranged row is not the throw
      const m = await generateReskin({ archetype: 'skirmisher', style: null, concept: c, userConcept: c, cr: 3, energy: 'Fire', resolvedType: 'Humanoid' },
        async (prompt) => (prompt.startsWith('You are inventing the SIGNATURE ability') ? JSON.stringify({ action: { idea: 'She hurls her javelin at a thief and it flies back to her hand.', section: 'action', trigger: 'attack', effect: 'damage' }, trait: null })
          : prompt.startsWith('You are auditing') ? JSON.stringify({ findings: [] })
            : prompt.startsWith("A monster's signature ability") ? JSON.stringify({ template: 'throw-retrieve', because: 'hurls her javelin and calls it back', name: 'Javelin Toss', fills: { projectile: 'her javelin' } }) : main));
      const rows = Object.values(m.sections).flat();
      const ranged = rows.filter((e) => /Ranged Attack Roll/.test(e.text ?? '') && !/Melee or Ranged/.test(e.text ?? ''));
      expect(rows.some((e) => e.name === 'Hurled Debris')).toBe(false); // the chassis's ranged row yielded the slot
      expect(ranged.length).toBe(1); expect(ranged[0].template ?? ranged[0].library).toBeTruthy();
      const ma = rows.find((e) => /^Multiattack/.test(e.name))?.text ?? '';
      if (/using/.test(ma)) expect(ma).toMatch(new RegExp(ranged[0].name.replace(/ \(.*\)$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    });
  });

  describe('extraction and the proper noun (fidelity pipeline step 4)', () => {
    test('the clause list rides on the main call and is saved with the block; a Name field that is no print creature and carries no article is a proper noun on every row', async () => {
      const desc = 'Large lizard folk, 30 feet of movement, wields a greatsword, long tail for swipe attacks';
      const main = json('Meshrin', 'Humanoid', 8, null, 'defender', { size: 'Large', extra: { clauses: [{ text: 'Large', kind: 'header' }, { text: '30 feet of movement', kind: 'header' }, { text: 'greatsword', kind: 'mechanical' }, { text: 'long tail for swipe attacks', kind: 'mechanical' }, { text: 'lizard folk', kind: 'descriptive' }] } });
      const m = await generateReskin({ archetype: 'defender', concept: desc, userConcept: desc, cr: 8, fixedName: 'Meshrin', mechanics: [] }, async () => main);
      expect(m.generation.clauses.map((c) => c.text)).toEqual(['Large lizard folk', '30 feet of movement', 'wields a greatsword', 'long tail for swipe attacks']); expect(m.generation.userConcept).toBe(desc);
      expect(m.inline).toBe('Meshrin'); expect(JSON.stringify(m.sections)).not.toMatch(/the meshrin/i);
      const m2 = await generateReskin({ archetype: 'defender', concept: `a meshrin: ${desc}`, userConcept: `a meshrin: ${desc}`, cr: 8, fixedName: 'Meshrin', mechanics: [] }, async () => main);
      expect(m2.inline).toBe('the meshrin');
    });
  });

  describe('the extraction is grounded; the 2014 label follows the stat (fidelity pipeline step 4)', () => {
    test('clauses not in the user\'s words leave the record; a user-set CR survives', () => {
      const { groundedClauses } = require('../generate.mjs');
      const kept = groundedClauses([{ text: 'hooked beak to seize and crush', kind: 'mechanical' }, { text: 'razor sharp claws', kind: 'mechanical' }, { text: 'CR 5', kind: 'header' }, { text: 'owlbear', kind: 'descriptive' }], 'an owlbear with razor sharp claws, CR 5');
      expect(kept).toEqual([{ text: 'an owlbear with razor sharp claws', kind: 'mechanical' }, { text: 'CR 5', kind: 'header' }]); // the user's phrases are the record; the model's invented beak is gone
      expect(groundedClauses([], 'knife ball')).toEqual([{ text: 'knife ball', kind: 'descriptive', head: true }]); // the head phrase: the creature itself, the one clause of a creature-only prompt (step 6) // no verb, two words: the template composes the whole sheet
      expect(groundedClauses([{ text: 'lizard folk', kind: 'descriptive' }], 'Large lizard folk, 30 feet of movement, wields a greatsword and a long tail').map((c) => `${c.kind[0]}:${c.text}`)).toEqual(['h:Large lizard folk', 'h:30 feet of movement', 'm:wields a greatsword', 'm:a long tail']);
    });
    test('a Spell label on a bonus that derives from Dex with no caster becomes Weapon; a Spell label that derives only from the casting stat stays', () => {
      const { relabel2014Attacks } = require('../../format-2024/generate.mjs');
      const rows = [{ name: 'Spectral Rope', description: 'Melee Spell Attack: +7 to hit, reach 5 ft., one target. Hit: 30 (6d8 + 3) necrotic damage.' }];
      relabel2014Attacks(rows, { STR: 6, DEX: 16, CON: 17, INT: 12, WIS: 14, CHA: 15 }, 4, null);
      expect(rows[0].description).toMatch(/^Melee Weapon Attack: \+7 to hit/);
      const spell = [{ name: 'Eldritch Touch', description: 'Melee Spell Attack: +9 to hit, reach 5 ft., one target. Hit: 10 (3d6) cold damage.' }];
      relabel2014Attacks(spell, { STR: 10, DEX: 10, CON: 16, INT: 20, WIS: 14, CHA: 16 }, 4, 'INT');
      expect(spell[0].description).toMatch(/^Melee Spell Attack: \+9/);
    });
  });

  describe('authoring (fidelity pipeline step 5): Meshrin, the regression case', () => {
    test('every typed weapon and body part is an attack row, Multiattack names them, fighting styles is a trait, Meshrin on every row, coverage 7 of 8 or better', async () => {
      const desc = 'Large lizard folk, 30 feet of movement,  Wields a greatsword, long tail for swipe attacks, is trained in fighting styles, has razor sharp claws, and large teeth for a vicious bite.';
      const main = json('Meshrin', 'Humanoid', 8, null, 'defender', { size: 'Large', extra: { clauses: [{ text: 'Large lizard folk', kind: 'header' }, { text: '30 feet of movement', kind: 'header' }, { text: 'Wields a greatsword', kind: 'mechanical' }, { text: 'long tail for swipe attacks', kind: 'mechanical' }, { text: 'is trained in fighting styles', kind: 'mechanical' }, { text: 'has razor sharp claws', kind: 'mechanical' }, { text: 'large teeth for a vicious bite', kind: 'mechanical' }] } });
      const author = JSON.stringify({ attacks: [{ key: 'Melee Attack', clause: 'Wields a greatsword', name: 'Greatsword', mode: 'melee', type: 'Slashing', rider: null }, { key: 'Hybrid Attack', clause: 'long tail for swipe attacks', name: 'Tail Swipe', mode: 'melee', type: 'Bludgeoning', rider: 'Prone' }, { key: null, clause: 'has razor sharp claws', name: 'Claw', mode: 'melee', type: 'Slashing', rider: null }, { key: null, clause: 'large teeth for a vicious bite', name: 'Bite', mode: 'melee', type: 'Piercing', rider: null }],
        traits: [{ clause: 'is trained in fighting styles', name: 'Fighting Styles', trigger: 'When Meshrin hits a creature that has the Prone condition with a melee attack', effect: 'the attack deals an extra {dmg} damage' }], saves: [], reactions: [], crossRef: { riderRow: 'Tail Swipe', payoffRow: 'Bite', condition: 'Prone' }, unplaced: [] });
      const m = await generateReskin({ archetype: 'defender', concept: desc, userConcept: desc, cr: 8, fixedName: 'Meshrin', mechanics: [] }, async (prompt) => (prompt.startsWith('You are authoring the ABILITIES') ? author : main));
      const rows = Object.values(m.sections).flat(); const names = rows.map((e) => e.name.replace(/ \(.*\)$/, ''));
      expect(names).toEqual(expect.arrayContaining(['Greatsword', 'Tail Swipe', 'Razor Sharp Claws', 'Vicious Bite'])); // step 7: the parts are engine rows named from the user's phrases; the fighting style is the template path's (the live twelve carries that check)
      // print's serial comma (2026-10-16): its one 3-item combination is the
      // Merrow's "using Bite, Claw, or Harpoon" — comma before the "or". The
      // list grammar landed with the one-row collapse, which had been producing
      // "using A in any combination" for a single row where print writes
      // "makes two A attacks" — two of our own rules disagreeing.
      expect(rows.find((e) => /^Multiattack/.test(e.name)).text).toMatch(/Greatsword, Tail Swipe, Razor Sharp Claws, or Vicious Bite in any combination/);
      expect(rows.filter((e) => e.part).length).toBe(4);
      expect(m.size).toBe('Large'); expect(m.speed).toMatch(/^30 ft\./); expect(m.inline).toBe('Meshrin'); expect(JSON.stringify(m.sections)).not.toMatch(/the meshrin/i);
      for (const e of rows) if (/Attack Roll/.test(e.text)) expect(e.text).toMatch(/\+\d+(?: \([^)]*\))?, reach \d+ ft\. \d+ \(\d+d\d+(?: \+ \d+)?\) \w+ damage/); // a roll parenthetical (the cross-row Advantage) is print's shape
      const { checkBlock } = require('../checker.mjs'); const f = checkBlock(m, { userConcept: desc }).fidelity; expect(f.dropped.filter((d) => !/fighting styles/.test(d))).toEqual([]); // the fighting style needs the idea call, which this mock does not answer
    });
  });
  describe('step 6: repair, same-form yield, the escape DC, lacks, header directives, declared numbers', () => {
    const wyrmDesc = 'a glacier wyrm that swallows ships whole and breathes a freezing wind';
    const wyrmMain = () => json('Glacier Wyrm', 'Dragon', 20, null, 'dragon', { size: 'Gargantuan', extra: { clauses: [{ text: 'swallows ships whole', kind: 'mechanical' }, { text: 'breathes a freezing wind', kind: 'mechanical' }] } });
    test('an authored Recharge save is the nova: one Recharge row on the sheet; a Grappled rider carries its escape DC; one attack row is "makes N X attacks"', async () => {
      const author = JSON.stringify({ attacks: [{ key: null, clause: 'swallows ships whole', name: 'Devouring Maw', mode: 'melee', type: 'Piercing', rider: 'Grappled' }], saves: [{ clause: 'breathes a freezing wind', name: 'Glacial Breath', stat: 'Constitution', target: 'each creature in a 60-foot Cone', damage: true, condition: 'Restrained', movement: null, success: 'half', recharge: true }], traits: [], reactions: [], crossRef: null, unplaced: [] });
      let repairCalled = 0;
      const m = await generateReskin({ archetype: 'brute', bodyType: 'dragon', concept: wyrmDesc, userConcept: wyrmDesc, cr: 20, mechanics: ['breath'] }, async (prompt) => (prompt.startsWith('You are repairing') ? ((repairCalled += 1), author) : wyrmMain())); // step 7: the forms arrive through the repair call, after the template path
      expect(repairCalled).toBe(1);
      const acts = m.sections.Actions;
      expect(acts.filter((e) => /\(Recharge/.test(e.name)).map((e) => e.name)).toEqual(['Glacial Breath (Recharge 5-6)']);
      expect(acts.find((e) => e.name === 'Devouring Maw').text).toMatch(/has the Grappled condition \(escape DC \d+\)/);
      expect(acts.find((e) => /^Multiattack/.test(e.name)).text).toMatch(/using Named Row0 or Devouring Maw in any combination/); // step 7: a repaired row joins the Multiattack; the chassis row it cited stays
      const { checkBlock } = require('../checker.mjs'); const r = checkBlock(m, { userConcept: wyrmDesc }); expect(r.fails.filter((g) => /two-novas|grapple-no-escape|multiattack-combination/.test(g))).toEqual([]);
    });
    test('an authored sheet with attacks only: the unfilled Signature Slot leaves and nothing cites it', async () => {
      const desc = 'a lizard that wields a greatsword and has razor claws';
      const main = json('Scalebrand', 'Humanoid', 8, null, 'defender', { extra: { clauses: [{ text: 'wields a greatsword', kind: 'mechanical' }, { text: 'has razor claws', kind: 'mechanical' }] } });
      const author = JSON.stringify({ attacks: [{ key: 'Melee Attack', clause: 'wields a greatsword', name: 'Greatsword', mode: 'melee', type: 'Slashing', rider: null }, { key: null, clause: 'has razor claws', name: 'Razor Claws', mode: 'melee', type: 'Slashing', rider: null }], saves: [], traits: [], reactions: [], crossRef: null, unplaced: [] });
      const m = await generateReskin({ archetype: 'defender', concept: desc, userConcept: desc, cr: 8, mechanics: [] }, async (prompt) => (prompt.startsWith('You are authoring the ABILITIES') ? author : prompt.startsWith('You are repairing') ? JSON.stringify({ attacks: [], saves: [], traits: [], reactions: [], unplaced: [] }) : main));
      expect(JSON.stringify(m.sections)).not.toMatch(/Disadvantage on its next attack roll before the start/);
      const { checkBlock } = require('../checker.mjs'); expect(checkBlock(m, { userConcept: desc }).fails.filter((g) => /dangling-ref|multiattack-row/.test(g))).toEqual([]);
    });
    test('the feature table (step 8): a greatsword earns Great Weapon Master; a style clause earns Trip Attack on the weapon and Riposte; the repair call does not fire for them', async () => {
      const desc = 'Large lizard folk, 30 feet of movement, wields a greatsword, is trained in fighting styles';
      const main = json('Meshrin', 'Humanoid', 8, null, 'defender', { size: 'Large', extra: { clauses: [{ text: 'wields a greatsword', kind: 'mechanical' }, { text: 'is trained in fighting styles', kind: 'mechanical' }] } });
      let repairCalled = 0;
      const m = await generateReskin({ archetype: 'defender', concept: desc, userConcept: desc, cr: 8, fixedName: 'Meshrin', mechanics: [] }, async (prompt) => (prompt.startsWith('You are repairing') ? ((repairCalled += 1), JSON.stringify({ attacks: [], saves: [], traits: [], reactions: [], unplaced: [] })) : main));
      expect(repairCalled).toBe(0);
      const rows = Object.values(m.sections).flat();
      expect((m.sections.Traits ?? []).map((e) => e.name)).toContain('Great Weapon Master');
      expect((m.sections.Reactions ?? []).map((e) => e.name)).toContain('Riposte');
      const gs = rows.find((e) => e.name === 'Greatsword'); expect(gs.text).toMatch(/\*Strength Saving Throw\*: DC \d+\. \*Failure:\* The target has the Prone condition\./); expect(gs.feature).toBe('Trip Attack');
      const { checkBlock } = require('../checker.mjs'); const r = checkBlock(m, { userConcept: desc }); expect(r.fidelity.dropped).toEqual([]); expect(r.fails).toEqual([]);
    });
    test('a lacks clause strips what it names: the spell-less wizard keeps his staff and loses the Mage\'s spells; the router does not key on the negated noun', async () => {
      const desc = 'a wizard but he cannot cast any spells, he just hits people with his staff';
      const m = await generateReskin({ archetype: 'brute', concept: desc, userConcept: desc, cr: 3, mechanics: [] }, async (prompt) => (prompt.startsWith('You are authoring the ABILITIES') ? JSON.stringify({ attacks: [{ key: null, clause: 'he just hits people with his staff', name: 'Staff', mode: 'melee', type: 'Bludgeoning', rider: null }], saves: [], traits: [], reactions: [], crossRef: null, unplaced: [] }) : prompt.startsWith('You are repairing') ? JSON.stringify({ attacks: [], saves: [], traits: [], reactions: [], unplaced: [] }) : json('Staffbound Caster', 'Humanoid', 3, null, 'brute', { extra: { clauses: [{ text: 'he cannot cast any spells', kind: 'mechanical' }, { text: 'hits people with his staff', kind: 'mechanical' }] } })));
      const all = Object.values(m.sections).flat();
      expect(all.some((e) => /^Spellcasting/.test(e.name) || /\bcasts?\b/i.test(e.text))).toBe(false);
      expect(all.find((e) => /^Multiattack/.test(e.name))?.text ?? '').not.toMatch(/Spellcasting/);
      const { checkBlock } = require('../checker.mjs'); const f = checkBlock(m, { userConcept: desc }).fidelity; expect(f.dropped).not.toContain('he cannot cast any spells');
    });
    test('header directives: a vulnerability typed in prose is a Vulnerabilities line; a typed AC is a declared field the bands stand down for', async () => {
      const hag = 'a thing that fights and hates fire and takes extra damage from it';
      const m = await generateReskin({ archetype: 'brute', concept: hag, userConcept: hag, cr: 7, mechanics: [] }, async (prompt) => (prompt.startsWith('You are authoring the ABILITIES') ? JSON.stringify({ attacks: [{ key: null, clause: 'fights', name: 'Fist', mode: 'melee', type: 'Bludgeoning', rider: null }], saves: [], traits: [], reactions: [], crossRef: null, unplaced: [] }) : prompt.startsWith('You are repairing') ? JSON.stringify({ attacks: [], saves: [], traits: [], reactions: [], unplaced: [] }) : json('Ember Brute', 'Fey', 7, null, 'brute', { extra: { clauses: [{ text: 'takes extra damage from it', kind: 'header' }] } })));
      expect(m.vulnerabilities).toMatch(/\bFire\b/);
      const turtle = 'a giant snapping turtle with AC 22 that bites for 50 damage';
      const t = await generateReskin({ archetype: 'brute', concept: turtle, userConcept: turtle, cr: 9, mechanics: [] }, async (prompt) => (prompt.startsWith('You are authoring the ABILITIES') ? JSON.stringify({ attacks: [{ key: null, clause: 'bites for 50 damage', name: 'Bite', mode: 'melee', type: 'Piercing', rider: null }], saves: [], traits: [], reactions: [], crossRef: null, unplaced: [] }) : prompt.startsWith('You are repairing') ? JSON.stringify({ attacks: [], saves: [], traits: [], reactions: [], unplaced: [] }) : json('Snapping Maw', 'Beast', 9, null, 'brute', { extra: { clauses: [{ text: 'AC 22', kind: 'header' }, { text: 'bites for 50 damage', kind: 'mechanical' }] } })));
      expect(t.ac).toBe(22); expect(t.generation.declared.ac).toBe(22);
      const bite = Object.values(t.sections).flat().find((e) => e.name === 'Bite'); expect(Number(/(\d+) \(/.exec(bite.text)[1])).toBeGreaterThanOrEqual(47); expect(t.generation.declared.rows.Bite).toBe(50);
      const { checkBlock, checkTable } = require('../checker.mjs'); const r = checkBlock(t, { userConcept: turtle }); expect(checkTable([r])).toMatch(/user-set: AC 22 · reads CR/);
    });
  });

});
