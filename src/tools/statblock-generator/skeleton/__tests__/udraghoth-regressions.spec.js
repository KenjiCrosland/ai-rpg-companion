/**
 * Regressions from the first LIVE block (the Udraghoth, CR 20 seed
 * 1565891686) and its two external reviews. Every finding here was verified
 * against the corpus before the fix — including two review claims that were
 * WRONG (attack bonus "unexplained": it was CHA-coherent; breath "too weak":
 * official legendary areas run 7-17, ours was 2x HOT, not weak).
 */
import { buildSkeleton, shapeKeyOf } from '../build-skeleton.mjs';
import { applyFlavor, flavorRequests, stampStats } from '../flavor-prompt.mjs';
import library from '@/data/ability-library.json';
import crTable from '@/data/cr-table.json';

const respond = (sk, extra = {}) => ({
  name: 'Udraghoth', size: sk.size, type: 'Dragon', alignment: 'Neutral Evil',
  speed: '40 ft., Fly 80 ft.', physical_damage: 'Piercing', energy_damage: 'Necrotic',
  stats: { STR: 18, DEX: 20, CON: 20, INT: 16, WIS: 18, CHA: 26 },
  entries: flavorRequests(sk).map((r) => ({
    id: r.id, name: r.placeholder_name,
    ...Object.fromEntries(r.slots.map((s) => [s, s === 'kindred_type' ? 'Dragon'
      : s === 'spells' ? '*Misty Step*, *Fear*' : s === 'spells_daily' ? '*Etherealness*' : 'grave ash'])),
  })),
  ...extra,
});

describe('striker stat is the engine\'s call', () => {
  test('a Huge melee body strikes with STR whatever the model ranked highest', () => {
    // The live block bit with CHA 26 over STR 18. Huge/Gargantuan melee is
    // STR in 100% of printed blocks.
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 1565891686, alternatives: 3, archetype: 'lurker' });
    if (sk.strike_stat !== 'STR') return; // ranged first attack: DEX is then correct
    const m = applyFlavor(sk, respond(sk));
    const req = (sk.attack_bonus - sk.pb) * 2 + 10;
    expect(m.stats.STR).toBe(req);
    for (const k of ['DEX', 'INT', 'WIS', 'CHA']) expect(m.stats[k]).toBeLessThanOrEqual(m.stats.STR);
  });

  test('small bodies and ranged attackers strike with DEX', () => {
    const sk = buildSkeleton({ cr: 2, size: 'Small', seed: 5 });
    expect(sk.strike_stat).toBe('DEX');
  });

  test('a declared mental striker is honored, never inferred', () => {
    const sk = buildSkeleton({ cr: 12, size: 'Medium', seed: 3, strikeStat: 'INT' });
    expect(sk.strike_stat).toBe('INT');
  });

  test('the casting stat lands exactly on the table DC', () => {
    // 8 + PB + mod must equal save_dc — one DC per block (live: spell DC 22
    // against DC 21 everywhere else).
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 1565891686, alternatives: 3, archetype: 'lurker' });
    const stats = stampStats({ STR: 18, DEX: 20, CON: 20, INT: 16, WIS: 18, CHA: 26 }, sk, { hasSpellcasting: true });
    const castMod = Math.floor((Math.max(stats.INT, stats.WIS, stats.CHA) - 10) / 2);
    expect(8 + sk.pb + castMod).toBe(sk.save_dc);
  });
});

describe('the legendary package is a rule, not a roll', () => {
  test('every block with legendary actions carries Legendary Resistance', () => {
    // 30 of 30 legendary SRD creatures have it; the extraction had dropped it.
    for (let seed = 1; seed <= 12; seed += 1) {
      const sk = buildSkeleton({ cr: 20, size: 'Huge', seed });
      if ((sk.counts.legendary ?? 0) > 0) {
        expect(sk.traits.map((t) => t.name)).toContain('Legendary Resistance (3/Day)');
      }
    }
  });

  test('full legendaries get a gated area ACTION slot', () => {
    // 22 of 30 printed legendary creatures have one; without it the set-piece
    // move only ever fires as a legendary action.
    for (let seed = 1; seed <= 12; seed += 1) {
      const sk = buildSkeleton({ cr: 24, size: 'Gargantuan', seed });
      if ((sk.counts.legendary ?? 0) >= 2) expect(sk.counts.area).toBeGreaterThan(0);
    }
  });
});

describe('damage budgets match the printed curves', () => {
  test('a recurring aura deals about half a single attack', () => {
    // Balor 13 at CR 19, Salamander 7 at CR 5. The live block shipped 31.
    for (const cr of ['5', '19', '24']) {
      const per = crTable.by_cr[cr].per_attack_damage;
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr, size: 'Large', seed });
        for (const t of [...sk.traits, ...sk.entries]) {
          if (/At the end of each of the \{creature\}'s turns/.test(t.text)) {
            const dmg = Number((t.text.match(/(\d+) \(\d+d\d+\)/) ?? [])[1] ?? 0);
            if (dmg) expect(dmg).toBeLessThanOrEqual(Math.round(per * 0.7));
          }
        }
      }
    }
  });

  test('legendary-action damage runs small, like the printed 7-17 band', () => {
    const per = crTable.by_cr['20'].per_attack_damage;
    for (let seed = 1; seed <= 20; seed += 1) {
      const sk = buildSkeleton({ cr: 20, size: 'Huge', seed });
      for (const e of sk.entries.filter((x) => x.slot_type === 'legendary')) {
        for (const m of e.text.matchAll(/(\d+) \(\d+d\d+\)/g)) {
          expect(Number(m[1])).toBeLessThanOrEqual(Math.round(per * 0.8));
        }
      }
    }
  });
});

describe('structural-shape dedupe', () => {
  test('shapeKeyOf distinguishes what matters', () => {
    expect(shapeKeyOf('*Melee Attack Roll:* {attack}, reach {reach} ft. {damage} ({dice}) {damage_type} damage.')).toBe('close|damage');
    expect(shapeKeyOf('*Constitution Saving Throw*: DC {dc}, one creature within 10 feet. *Failure:* {damage} ({dice}) {damage_type} damage.')).toBe('close|damage');
    expect(shapeKeyOf('*Dexterity Saving Throw*: DC {dc}, each creature in a {area}-foot Cone. *Failure:* {damage} ({dice}) {damage_type} damage.')).toBe('area-damage');
    expect(shapeKeyOf('The {creature} takes the Dash action.')).toBeNull();
  });

  test('no block carries two single-target damage-primary non-attacks', () => {
    // The live block's "Bite" beside "Ruin-Fed Bite": an attack and a save
    // that are the same move at the table.
    for (const cr of [5, 11, 20]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr, size: 'Large', seed });
        const attackShapes = sk.entries
          .filter((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack')
          .map((e) => shapeKeyOf(e.text));
        for (const e of sk.entries) {
          // Legendary echoes of turn actions are printed design (Kraken:
          // Lightning Strike beside legendary Lightning Storm) — exempt.
          if (['plain_attack', 'rider_attack', 'multiattack', 'legendary'].includes(e.slot_type)) continue;
          const shape = shapeKeyOf(e.text);
          if (shape && shape.endsWith('|damage')) {
            expect(`CR ${cr} seed ${seed} ${e.name}: ${attackShapes.includes(shape)}`)
              .toBe(`CR ${cr} seed ${seed} ${e.name}: false`);
          }
        }
      }
    }
  });
});

describe('spellcasting hygiene', () => {
  test('the 1/Day line never duplicates the at-will list', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 1565891686, alternatives: 3, archetype: 'lurker' });
    const m = applyFlavor(sk, respond(sk, {
      entries: flavorRequests(sk).map((r) => ({
        id: r.id, name: r.placeholder_name,
        ...Object.fromEntries(r.slots.map((s) => [s,
          s === 'spells' ? '*Misty Step*, *Fear*' : s === 'spells_daily' ? '*Misty Step*, *Etherealness*' : 'ash'])),
      })),
    }));
    for (const e of Object.values(m.sections).flat()) {
      const daily = (e.text.match(/1\/Day Each:\*\*([^\n]*)/) ?? [])[1];
      if (daily) expect(daily).not.toContain('Misty Step');
    }
  });

  test('a spell an entry casts is guaranteed on the spell list', () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      const sk = buildSkeleton({ cr: 17, size: 'Huge', seed, alternatives: 1 });
      const m = applyFlavor(sk, respond(sk));
      const all = Object.values(m.sections).flat();
      const casterEntry = all.find((e) => /At Will:/.test(e.text));
      if (!casterEntry) continue;
      for (const e of all) {
        if (e === casterEntry) continue;
        // ROUTED casts only ("uses Spellcasting to cast *X*") — print keeps
        // inline casts self-contained: the 2024 Deva's Divine Aid casts
        // *Cure Wounds* and *Remove Curse*, neither on its Spellcasting list.
        for (const mm of e.text.matchAll(/uses (?:its )?[\w ]*Spellcasting to cast \*([A-Z][\w' ]+?)\*/g)) {
          expect(`seed ${seed} ${mm[1]} listed: ${casterEntry.text.includes(mm[1])}`)
            .toBe(`seed ${seed} ${mm[1]} listed: true`);
        }
      }
    }
  });

  test('save and skill proficiencies pass through to assembly', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 3 });
    const m = applyFlavor(sk, respond(sk, {
      save_proficiencies: ['CON', 'WIS', 'CHA'], skill_proficiencies: ['Perception', 'Stealth'],
    }));
    expect(m.save_proficiencies).toEqual(['CON', 'WIS', 'CHA']);
    expect(m.skill_proficiencies).toEqual(['Perception', 'Stealth']);
  });
});

describe('grapple-gated drains stay out of grapple-less blocks', () => {
  test('the Vampire Spawn Bite carries the dependency now', () => {
    const row = Object.values(library.categories).flat()
      .find((a) => a.source === 'Vampire Spawn' && a.ability === 'Bite');
    expect(row.requires).toContain('grapple');
  });
});

describe('caster flag', () => {
  test('caster: true guarantees a spell-list entry', () => {
    for (let seed = 1; seed <= 10; seed += 1) {
      const sk = buildSkeleton({ cr: 9, size: 'Medium', seed, caster: true });
      expect(sk.entries.some((e) => /\{spells\}|At Will:/.test(e.text))).toBe(true);
    }
  });
});

describe('Tarwhelm regressions (live block 2, CR 20)', () => {
  test('legendary actions ramp with CR: certain at 20+, mixed at 15', () => {
    // Print has no gradient (the zeros are horde-leader fiends and constructs
    // at every CR), so the ramp encodes the product's need: a CR 20 is always
    // a boss, a CR 15 is usually one.
    for (const cr of [20, 24, 30]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr, size: 'Huge', seed });
        expect(`CR ${cr} seed ${seed}: ${sk.counts.legendary >= 2}`).toBe(`CR ${cr} seed ${seed}: true`);
        // which also trips the gated-area floor: all three damage outlets exist
        expect(sk.counts.area).toBeGreaterThan(0);
      }
    }
    const at15 = Array.from({ length: 40 }, (_, i) => buildSkeleton({ cr: 15, size: 'Huge', seed: i + 1 }).counts.legendary);
    expect(at15.some((n) => n === 0)).toBe(true); // non-legendary CR 15s exist
    expect(at15.some((n) => n >= 2)).toBe(true); // and legendary ones dominate
    const at18 = Array.from({ length: 40 }, (_, i) => buildSkeleton({ cr: 18, size: 'Huge', seed: i + 1 }).counts.legendary);
    const share = (a) => a.filter((n) => n >= 2).length / a.length;
    expect(share(at18)).toBeGreaterThan(share(at15)); // the ramp actually ramps
  });

  test('no template binds a creature to a printed plane or type', () => {
    // "dies outside the Nine Hells" on a tar-wyrm typed Dragon is Pit Fiend
    // identity leaking through. The realm is flavor, exactly like {substance}.
    const all = [
      ...Object.values(library.categories).flat(),
      ...Object.values(library.traits.by_category).flat(),
    ];
    const offenders = all.filter((r) => ['template_2024', 'template_2014'].some(
      (f) => /Nine Hells|Mount Celestia|the Abyss\b|Plane of (?:Air|Fire|Water|Earth)|willing (?:demon|devil)/.test(r[f] ?? ''),
    )).map((r) => `${r.source}/${r.ability ?? r.trait}`);
    expect(offenders).toEqual([]);
  });

  test('the home_plane slot fills from the model and falls back cleanly', () => {
    let found = null;
    for (let seed = 1; seed <= 60 && !found; seed += 1) {
      const sk = buildSkeleton({ cr: 20, size: 'Large', seed });
      if ([...sk.traits, ...sk.entries].some((e) => e.text.includes('{home_plane}'))) found = sk;
    }
    if (!found) return; // restoration traits not drawn in these seeds
    const reqs = flavorRequests(found);
    const withPlane = reqs.find((r) => r.slots.includes('home_plane'));
    expect(withPlane).toBeDefined();
    const m = applyFlavor(found, respond(found, {
      entries: reqs.map((r) => ({ id: r.id, name: r.placeholder_name,
        ...Object.fromEntries(r.slots.map((s) => [s, s === 'home_plane' ? 'the Drowned Vault' : 'ash'])) })),
    }));
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toContain('{home_plane}');
    expect(all).toContain('the Drowned Vault');
  });

  test('high-CR aggregate damage lands near its target with all outlets present', () => {
    // The Tarwhelm hit 0.59x its target because area and legendary both
    // rolled zero. With the floors in, the outlets exist; printed with-area
    // creatures run 1.08-1.39x, so accept a wide band around 1.
    for (let seed = 1; seed <= 12; seed += 1) {
      const sk = buildSkeleton({ cr: 20, size: 'Huge', seed });
      const target = sk.dpr_target;
      const attack = sk.entries.find((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack');
      const area = sk.entries.find((e) => e.slot_type === 'area');
      const leg = sk.entries.filter((e) => e.slot_type === 'legendary');
      const legDmg = leg.length
        ? Math.max(...leg.map((e) => Number((e.text.match(/(\d+) \(\d+d\d+/) ?? [0, 0])[1])), 0) : 0;
      const aggregate = (attack?.damage ?? 0) * sk.multiattack + (area?.damage ?? 0) + 2 * legDmg;
      expect(aggregate / target).toBeGreaterThan(0.7);
      expect(aggregate / target).toBeLessThan(1.8);
    }
  });
});
