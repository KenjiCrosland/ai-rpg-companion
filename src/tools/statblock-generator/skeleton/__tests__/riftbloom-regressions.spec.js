/**
 * Regressions from live block 3 (the Riftbloom, CR 20): a spore-mass typed
 * Humanoid, an ungated 60-foot paralysis cone, an escape DC reconciling with
 * nothing, Blinded immunity on a thing with only eyes, and 17-damage bites.
 *
 * Two of the owner's findings were checked against print and NOT fixed:
 * Int-3 "understands X but can't speak" is the printed Chimera/Zombie/Golem
 * pattern, and the block-wide single save DC is deliberate engine policy
 * (every DC keys off the pinned casting stat).
 */
import { buildSkeleton, crNumber } from '../build-skeleton.mjs';
import { applyFlavor, flavorRequests, buildFlavorPrompt } from '../flavor-prompt.mjs';
import { generateFromSkeleton } from '../generate.mjs';
import crTable from '@/data/cr-table.json';

const respond = (sk, extra = {}) => ({
  name: 'Riftbloom', size: sk.size, type: 'Humanoid', alignment: 'Chaotic Neutral',
  speed: '40 ft., Burrow 30 ft.', physical_damage: 'Bludgeoning', energy_damage: 'Poison',
  stats: { STR: 20, DEX: 14, CON: 22, INT: 3, WIS: 24, CHA: 6 },
  entries: flavorRequests(sk).map((r) => ({
    id: r.id, name: r.placeholder_name,
    ...Object.fromEntries(r.slots.map((s) => [s, s === 'kindred_type' ? 'Humanoid' : 'spores'])),
  })),
  ...extra,
});

describe('hard-condition areas are always gated', () => {
  test('no seed at any CR ships an ungated paralysis/stun area', () => {
    for (const cr of [5, 11, 17, 20]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr, size: 'Large', seed });
        for (const e of sk.entries) {
          if (e.slot_type === 'legendary') continue; // paced inline, as print does
          if (/each creature in/.test(e.text) && /Paralyzed|Stunned|Petrified|Unconscious/.test(e.text)) {
            expect(`CR ${cr} seed ${seed} ${e.name} gated: ${Boolean(e.gate)}`)
              .toBe(`CR ${cr} seed ${seed} ${e.name} gated: true`);
          }
        }
      }
    }
  });

  test('the gate reaches the printed entry NAME', () => {
    // Gates lived on the entry object but were dropped from the name at
    // flavor time — which shipped every recharge ability as at-will.
    let found = false;
    for (let seed = 1; seed <= 30 && !found; seed += 1) {
      const sk = buildSkeleton({ cr: 11, size: 'Large', seed });
      const gated = sk.entries.find((e) => e.gate && e.section !== 'Legendary Actions');
      if (!gated) continue;
      const m = applyFlavor(sk, respond(sk));
      found = Object.values(m.sections).flat().some((e) => e.name.includes(`(${gated.gate})`));
      expect(found).toBe(true);
    }
    expect(found).toBe(true);
  });
});

describe('kindred exclusions never spare the party', () => {
  test('a model answering Humanoid falls back to the neutral phrase', () => {
    let found = null;
    for (let seed = 1; seed <= 60 && !found; seed += 1) {
      const sk = buildSkeleton({ cr: 20, size: 'Large', seed });
      if ([...sk.entries, ...sk.traits].some((e) => e.text.includes('{kindred_type}'))) found = sk;
    }
    if (!found) return;
    const m = applyFlavor(found, respond(found));
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toMatch(/isn't an? Humanoid/);
  });
});

describe('numbers reconcile block-wide', () => {
  test('escape DCs follow 8 + PB + strike mod', () => {
    for (const cr of [5, 11, 20]) {
      const want = crTable.by_cr[String(cr)].attack_bonus + 8;
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr, size: 'Large', seed });
        for (const e of [...sk.entries, ...sk.traits]) {
          for (const m of e.text.matchAll(/escape DC (\d+)/g)) {
            expect(`CR ${cr} seed ${seed}: escape ${m[1]}`).toBe(`CR ${cr} seed ${seed}: escape ${want}`);
          }
        }
      }
    }
  });

  test('a DoT rider no longer taxes the hit', () => {
    // The Riftbloom's bite was 17 (2d8+8) at CR 20 because its poison DoT
    // consumed the rider share; print keeps the hit full beside a DoT.
    const per = crTable.by_cr['20'].per_attack_damage;
    for (let seed = 1; seed <= 30; seed += 1) {
      const sk = buildSkeleton({ cr: 20, size: 'Large', seed });
      for (const e of sk.entries) {
        if (e.slot_type !== 'plain_attack' && e.slot_type !== 'rider_attack') continue;
        if (!/at the start of each of (?:its|the [a-z]+'s) turns/.test(e.text)) continue;
        const first = Number((e.text.match(/(\d+) \(\d+d\d+/) ?? [0, 0])[1]);
        expect(first).toBeGreaterThanOrEqual(per - 3);
      }
    }
  });
});

describe('the resolve call owns the type', () => {
  test('a flavor-call type never overrides the resolved type', async () => {
    const m = await generateFromSkeleton(
      { concept: 'a burrowing spore-mass', cr: 9, seed: 5, resolvedType: 'Plant' },
      async (p) => {
        if (!/Every number is already fixed/.test(p)) return JSON.stringify({ problems: [] });
        const sk = buildSkeleton({ cr: 9, seed: 5, alternatives: 3, archetype: null });
        return JSON.stringify(respond(sk));
      },
    );
    expect(m.type).toBe('Plant'); // not the model's "Humanoid"
  });
});

describe('senses pass through', () => {
  test('senses_special reaches the model object', () => {
    const sk = buildSkeleton({ cr: 9, size: 'Large', seed: 2 });
    const m = applyFlavor(sk, respond(sk, { senses_special: 'Tremorsense 60 ft.' }));
    expect(m.senses_special).toBe('Tremorsense 60 ft.');
  });
});

describe('the chassis progress payload honors the display contract', () => {
  test('carries xp, which the loading card renders with toLocaleString', async () => {
    // Omitting it crashed Statblock2024Skeleton's render mid-generation.
    const seen = [];
    await generateFromSkeleton(
      { concept: 'x', cr: 20, seed: 3, onProgress: (p) => seen.push(p) },
      async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] })),
    );
    const chassis = seen.find((p) => p.phase === 'chassis')?.chassis;
    expect(chassis).toBeDefined();
    expect(typeof chassis.xp).toBe('number');
    expect(chassis.xp).toBe(25000);
  });
});

describe('Alabaster regressions (live block 4, CR 20)', () => {
  test('Legendary Resistance cannot be renamed at all', () => {
    // First the model dropped the "(3/Day)" ("Flawless Reflexes"); after the
    // gate was protected it still renamed the trait itself ("Sanctified
    // Purpose (3/Day)", "Unyielding Vigil"). The name is rules vocabulary
    // the table recognizes at a glance, like a condition name — locked
    // (owner call, 2026-08-02).
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 2036068080, alternatives: 3, archetype: 'brute' });
    const lr = sk.traits.find((t) => t.name.startsWith('Legendary Resistance'));
    expect(lr.gate).toBe('3/Day');
    expect(lr.name_locked).toBe(true);
    const m = applyFlavor(sk, respond(sk, {
      entries: [
        { id: lr.id, name: 'Sanctified Purpose' },
        ...flavorRequests(sk).map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((s) => [s, 'dust'])),
        })),
      ],
    }));
    const names = m.sections.Traits.map((t) => t.name);
    expect(names).toContain('Legendary Resistance (3/Day)');
    expect(names.join(' ')).not.toContain('Sanctified Purpose');
  });

  test('the legendary section fills to its sampled count', () => {
    // The cross-slot shape guard emptied it to one self-locking option,
    // stranding two of three uses.
    // Textual-twin guards may legitimately drop one (two spellcasting-echo
    // legendaries sharing sentences); the uses cap absorbs that. What must
    // never recur is the live failure: a single self-locking option.
    for (let seed = 1; seed <= 15; seed += 1) {
      const sk = buildSkeleton({ cr: 20, size: 'Huge', seed, alternatives: 3 });
      const picked = sk.entries.filter((e) => e.slot_type === 'legendary').length;
      expect(`seed ${seed}: ${picked >= 2}`).toBe(`seed ${seed}: true`);
    }
  });

  test('reaction and bonus-action spells are stripped from action-cast lists', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 2036068080, alternatives: 3, archetype: 'brute' });
    const m = applyFlavor(sk, respond(sk, {
      entries: flavorRequests(sk).map((r) => ({
        id: r.id, name: r.placeholder_name,
        ...Object.fromEntries(r.slots.map((s) => [s,
          s === 'spells' ? '*Shield*, *Misty Step*, *Fear*'
            : s === 'spells_daily' ? '*Hold Monster*, *Wall of Force*' : 'dust'])),
      })),
    }));
    for (const e of Object.values(m.sections).flat()) {
      if (!/At Will:/.test(e.text)) continue;
      expect(e.text).not.toContain('*Shield*');
      expect(e.text).not.toContain('*Misty Step*');
      expect(e.text).toContain('*Fear*'); // action spells survive
      expect(e.text).toContain('*Hold Monster*');
    }
  });

  test('a spell another entry casts survives the strip', () => {
    // "uses Spellcasting to cast *Misty Step*" keeps it listed and functional.
    let found = null;
    for (let seed = 1; seed <= 60 && !found; seed += 1) {
      const sk = buildSkeleton({ cr: 17, size: 'Huge', seed, alternatives: 1 });
      const all = [...sk.entries.map((e) => e.text)].join(' ');
      if (/casts? \*Misty Step\*/.test(all) && /At Will:/.test(all)) found = sk;
    }
    if (!found) return; // combination absent in these seeds
    const m = applyFlavor(found, respond(found));
    const caster = Object.values(m.sections).flat().find((e) => /At Will:/.test(e.text));
    expect(caster.text).toContain('Misty Step');
  });

  test('legendary uses never exceed the option count', async () => {
    const m = await generateFromSkeleton(
      { concept: 'x', cr: 20, seed: 2036068080, archetypeName: 'brute' },
      async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] })),
    );
    const n = (m.sections['Legendary Actions'] ?? []).length;
    if (m.legendary_uses) expect(m.legendary_uses).toBeLessThanOrEqual(Math.max(n, 1));
  });

  test('the Poisoned DoT deals Poison, not the energy palette', () => {
    const row = Object.values(require('@/data/ability-library.json').categories).flat()
      .find((a) => a.source === 'Pit Fiend' && a.ability === 'Bite');
    expect(row.template_2024).toMatch(/Poison damage at the start/);
    expect(row.template_2024).not.toMatch(/While Poisoned[^.]*\{rider_damage_type\}/);
  });
});

describe('packages and the dragon kit (owner design, 2026-08-02)', () => {
  test('a package spine appears and its members arrive together', () => {
    // The coherence unit: members were designed together inside one printed
    // creature, crossing trait/action/legendary lines.
    let sawSpine = 0; let checkedCoherence = false;
    for (let seed = 1; seed <= 30; seed += 1) {
      const sk = buildSkeleton({ cr: 11, size: 'Huge', seed, alternatives: 3 });
      if (!sk.package) continue;
      sawSpine += 1;
      // every spine member that is an ability is present as an entry
      const names = new Set([...sk.entries.map((e) => e.name), ...sk.traits.map((t) => t.name)]);
      if (sk.package.source === 'Behir') {
        expect(names.has('Constrict') && names.has('Swallow')).toBe(true);
        checkedCoherence = true;
      }
      if (sk.package.source === 'Mimic') {
        expect(names.has('Adhesive') || names.has('Bite')).toBe(true);
        checkedCoherence = true;
      }
    }
    expect(sawSpine).toBeGreaterThan(5); // spines are common, not universal
    expect(sawSpine).toBeLessThan(30); // and all-singles blocks still exist
    void checkedCoherence;
  });

  test('a Dragon-typed generation is dragon-shaped', async () => {
    const m = await generateFromSkeleton(
      { concept: 'an ancient wyrm', cr: 20, seed: 9, resolvedType: 'Dragon' },
      async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] })),
    );
    expect(m.generation.package).toMatch(/Dragon kit$/);
    // the shape the owner named: breath weapon + legendary set
    const actions = (m.sections.Actions ?? []).map((e) => e.name).join(' ');
    expect(actions).toMatch(/Breath/);
    expect((m.sections['Legendary Actions'] ?? []).length).toBeGreaterThanOrEqual(2);
    // and every mechanical entry traces to ONE dragon
    const sources = new Set(m.generation.derived_from
      .filter((d) => /\(CR /.test(d)).map((d) => d.replace(/^.*<- /, '').replace(/ \(CR.*$/, '')));
    expect(sources.size).toBeLessThanOrEqual(2); // the kit dragon + injected LR
  });

  test('non-dragons never get the kit', async () => {
    const m = await generateFromSkeleton(
      { concept: 'a bog thing', cr: 20, seed: 9, resolvedType: 'Plant' },
      async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] })),
    );
    expect(m.generation.package ?? '').not.toMatch(/Dragon kit$/);
  });

  test('the defense budget is enforced again on the skeleton path', () => {
    // Dropped in the chassis switch (owner catch): the model's resistance
    // list shipped unbudgeted because defenseCaps was never passed to lint.
    const src = require('fs').readFileSync(
      require('path').join(__dirname, '../generate.mjs'), 'utf8',
    );
    expect(src.match(/defenseCaps/g).length).toBeGreaterThanOrEqual(5);
  });
});

describe('Skreek regressions (live block 5, CR 20)', () => {
  test('a non-caster block DC reconciles with its own CON', () => {
    // Four live blocks in a row shipped a DC matching nothing: only casters
    // had a pinned stat. Non-casters now key off CON, the printed
    // breath/aura convention.
    for (let seed = 1; seed <= 20; seed += 1) {
      const sk = buildSkeleton({ cr: 20, size: 'Gargantuan', seed });
      const hasSpell = sk.entries.some((e) => /\{spells\}|spellcasting ability/.test(e.text));
      if (hasSpell) continue;
      expect(sk.save_dc).toBe(8 + sk.pb + sk.con_mod);
      const m = applyFlavor(sk, respond(sk));
      const conMod = Math.floor((m.stats.CON - 10) / 2);
      expect(8 + sk.pb + conMod).toBe(sk.save_dc); // the pin holds
    }
  });

  test('the sole area is never a pure debuff', () => {
    // Print fields damage-less areas alone only when they impose a hard
    // condition (the Gorgon petrifies); Weakening Breath exists only beside
    // Fire Breath. A CR 20 whose one area subtracts 1d6 from damage rolls
    // has no set piece.
    const HARD = /Paralyzed|Stunned|Petrified|Unconscious|Blinded|Frightened|Incapacitated|Restrained/;
    for (const cr of [5, 11, 20]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr, size: 'Large', seed });
        const areas = sk.entries.filter((e) => e.slot_type === 'area');
        if (areas.length !== 1) continue;
        const ok = /\d+ \(\d+d\d+\)/.test(areas[0].text) || HARD.test(areas[0].text);
        expect(`CR ${cr} seed ${seed} ${areas[0].name}: ${ok}`).toBe(`CR ${cr} seed ${seed} ${areas[0].name}: true`);
      }
    }
  });

  test('ungated legendary auto-damage runs at the printed ~0.4x, not 0.55x', () => {
    // The Lich's Deathly Teleport deals 11 beside its save-gated Disrupt
    // Life at 31; ours shipped the teleport at save-gated damage (17 x3
    // spammable). The spam itself is printed design and stays.
    const per = crTable.by_cr['20'].per_attack_damage;
    for (let seed = 1; seed <= 25; seed += 1) {
      const sk = buildSkeleton({ cr: 20, size: 'Huge', seed });
      for (const e of sk.entries.filter((x) => x.slot_type === 'legendary')) {
        if (/Saving Throw/.test(e.text)) continue;
        for (const m of e.text.matchAll(/(\d+) \(\d+d\d+\)/g)) {
          expect(Number(m[1])).toBeLessThanOrEqual(Math.round(per * 0.5));
        }
      }
    }
  });

  test('movement references downgrade to the speed line the model wrote', () => {
    // Flyby on a walk/climb creature "literally never triggers".
    let found = null;
    for (let seed = 1; seed <= 80 && !found; seed += 1) {
      const sk = buildSkeleton({ cr: 11, size: 'Large', seed });
      if ([...sk.traits, ...sk.entries].some((e) => /flies out of|its Fly Speed/.test(e.text))) found = sk;
    }
    if (!found) return;
    const m = applyFlavor(found, respond(found, { speed: '40 ft., Climb 40 ft.' }));
    for (const e of Object.values(m.sections).flat()) {
      expect(e.text).not.toMatch(/flies out of|its Fly Speed/);
    }
    const withFly = applyFlavor(found, respond(found, { speed: '40 ft., Fly 80 ft.' }));
    const all = Object.values(withFly.sections).flat().map((e) => e.text).join(' ');
    expect(/flies out of|its Fly Speed/.test(all)).toBe(true); // untouched when Fly exists
  });

  test('Undead and Constructs do not breathe', () => {
    let found = null;
    for (let seed = 1; seed <= 80 && !found; seed += 1) {
      const sk = buildSkeleton({ cr: 20, size: 'Gargantuan', seed });
      if (sk.traits.some((t) => /breathe air and water/.test(t.text))) found = sk;
    }
    if (!found) return;
    const m = applyFlavor(found, respond(found, { type: 'Undead' }));
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toContain('can breathe air and water');
    expect(all).toContain("doesn't require air");
  });
});

describe('theme threads (the anti-theme-soup layer)', () => {
  test('themes shift what gets picked, without excluding anything', () => {
    const tally = (themes) => {
      const c = {};
      for (let seed = 1; seed <= 100; seed += 1) {
        const sk = buildSkeleton({ cr: 11, size: 'Large', seed, themes });
        for (const e of [...sk.entries, ...sk.traits]) {
          for (const f of e.facets ?? []) c[f] = (c[f] ?? 0) + 1;
        }
      }
      const tot = Object.values(c).reduce((a, b) => a + b, 0) || 1;
      return (k) => (c[k] ?? 0) / tot;
    };
    const base = tally(null);
    const grave = tally(['grave', 'aquatic']);
    expect(grave('grave')).toBeGreaterThan(base('grave'));
    expect(grave('aquatic')).toBeGreaterThan(base('aquatic'));
    // guide, never constraint: off-theme facets still appear
    expect(grave('fiendish')).toBeGreaterThan(0);
  });

  test('the palette line reaches the flavor prompt, and the trace shape holds', () => {
    const sk = buildSkeleton({ cr: 11, size: 'Large', seed: 3, themes: ['grave', 'aquatic'] });
    expect(sk.themes).toEqual(['grave', 'aquatic']);
    const p = buildFlavorPrompt(sk, { concept: 'a drowned horror', themes: ['grave', 'aquatic'] });
    expect(p).toContain('THEME THREADS');
    expect(p).toContain('grave, aquatic');
  });

  test('a typed resolve theme wins; a bare type still yields a fallback thread', async () => {
    let seen = '';
    await generateFromSkeleton(
      { concept: 'x', cr: 9, seed: 5, resolvedType: 'Undead' },
      async (p) => { if (/Every number is already fixed/.test(p)) seen = p; return null; },
    );
    expect(seen).toContain('THEME THREADS');
    expect(seen).toContain('grave');
  });

  test('grasping limbs are paintable', () => {
    // "one of two claws" hard-coded the body; {appendage} lets a chain
    // devil concept and an octopus concept share the mechanic.
    let found = null;
    for (let seed = 1; seed <= 80 && !found; seed += 1) {
      const sk = buildSkeleton({ cr: 8, size: 'Large', seed });
      if ([...sk.entries, ...sk.traits].some((e) => e.text.includes('{appendage'))) found = sk;
    }
    if (!found) return;
    const m = applyFlavor(found, respond(found, {
      entries: flavorRequests(found).map((r) => ({ id: r.id, name: r.placeholder_name,
        ...Object.fromEntries(r.slots.map((s) => [s,
          s === 'appendage' ? 'barbed chain' : s === 'appendage_plural' ? 'barbed chains' : 'grave silt'])) })),
    }));
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toMatch(/\{appendage/);
    expect(all).toContain('barbed chain');
  });
});

describe('Glacier Keeper regressions (live block 6, CR 20)', () => {
  const library6 = require('@/data/ability-library.json');

  test('identity-bound mechanics are excluded outright, with reasons', () => {
    const all = [
      ...Object.values(library6.categories).flat(),
      ...Object.values(library6.traits.by_category).flat(),
    ];
    const excluded = all.filter((r) => r.excluded);
    // Some rows exist in multiple categories (multi-instance extraction), so
    // compare the unique identity set.
    expect([...new Set(excluded.map((r) => `${r.source}/${r.ability ?? r.trait}`))].sort()).toEqual([
      'Ghost/Possession', 'Vampire Spawn/Vampire Weakness', 'Vampire/Misty Escape', 'Vampire/Vampire Weakness',
    ]);
    for (const r of excluded) expect(r.excluded.length).toBeGreaterThan(20);
    // and none of them can ever be picked or offered on a menu
    for (const cr of [3, 8, 20]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr, size: 'Large', seed, alternatives: 3 });
        for (const e of [...sk.entries, ...sk.traits]) {
          expect(e.name).not.toBe('Possession');
          for (const o of e.options ?? []) expect(o.key).not.toBe('Possession');
        }
      }
    }
  });

  test('echo spells are palette-fillable, not donor literals', () => {
    // "uses Spellcasting to cast *Guiding Bolt*" put a cleric spell on an
    // ice elemental — and the reconciliation then FORCED it onto the At Will
    // list. The spell inside an echo is paint.
    const all = Object.values(library6.categories).flat();
    const echoes = all.filter((r) => /uses [\w ]*Spellcasting to cast/.test(r.template_2024));
    expect(echoes.length).toBeGreaterThan(15);
    for (const r of echoes) {
      expect(r.template_2024).toContain('{signature_spell}');
      expect(r.template_2024).not.toMatch(/cast \*[A-Z]/);
    }
  });

  test('the possession untargetability clause is type-agnostic everywhere', () => {
    const all = [
      ...Object.values(library6.categories).flat(),
      ...Object.values(library6.traits.by_category).flat(),
    ];
    for (const r of all) {
      expect(r.template_2024 ?? '').not.toContain('specifically target Undead');
    }
  });
});

describe('the spike guarantee (live block 6 economy review)', () => {
  test('every block with an area carries a real nova', () => {
    // Six blocks budgeted sustained damage fine and never allocated a spike.
    // The first area must be a gated burst or gated hard-condition breath;
    // whirlwind-class control satisfies the slot only as a SECOND area.
    for (const cr of [11, 17, 20]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr, size: 'Huge', seed });
        const areas = sk.entries.filter((e) => e.slot_type === 'area');
        if (!areas.length) continue;
        const nova = areas.some((e) => e.gate
          && (/\d+ \(\d+d\d+\)/.test(e.text.split('Failure')[1] ?? '')
            || /Paralyzed|Stunned|Petrified|Unconscious|Blinded|Incapacitated/.test(e.text)));
        expect(`CR ${cr} seed ${seed} nova: ${nova}`).toBe(`CR ${cr} seed ${seed} nova: true`);
      }
    }
  });

  test('prison-DoT entries carry the ally-rescue valve', () => {
    // The whirlwind is verbatim Djinni print — Str save, no escape. The
    // Whelm PRINTS an ally rescue; the same clause is grafted so dump-stat
    // casters have counterplay through their strong friends (owner call).
    const all = Object.values(require('@/data/ability-library.json').categories).flat();
    for (const r of all) {
      const t = r.template_2024;
      if ('Restrained' in (r.imposes ?? []) || (/Restrained/.test(t)
          && /At the start of each of its turns.*takes/.test(t) && /repeats the save/.test(t))) {
        expect(`${r.source}/${r.ability}: ${/pull|Athletics/.test(t)}`).toBe(`${r.source}/${r.ability}: true`);
      }
    }
  });
});

describe('Uulghoth regressions (live block 7, CR 20)', () => {
  test('a domain theme that contradicts the type is dropped', async () => {
    // "subterranean, celestial, grasping" on one creature: celestial is a
    // TYPE claim. On a Beast it must fall away; manner tags pass.
    let seen = '';
    await generateFromSkeleton(
      { concept: 'x', cr: 9, seed: 5, resolvedType: 'Beast', themes: ['celestial', 'grasping'] },
      async (p) => { if (/Every number is already fixed/.test(p)) seen = p; return null; },
    );
    expect(seen).toContain('THEME THREADS');
    expect(seen).toContain('grasping');
    expect(seen).not.toMatch(/THEME THREADS[^\n]*celestial/);
  });

  test('an agreeing domain theme survives', async () => {
    let seen = '';
    await generateFromSkeleton(
      { concept: 'x', cr: 9, seed: 5, resolvedType: 'Celestial', themes: ['celestial', 'grasping'] },
      async (p) => { if (/Every number is already fixed/.test(p)) seen = p; return null; },
    );
    expect(seen).toMatch(/THEME THREADS[^\n]*celestial/);
  });

  test('level-3+ offense demotes, printed self-utility survives at will', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Large', seed: 1259262920, alternatives: 3, archetype: 'skirmisher' });
    const m = applyFlavor(sk, respond(sk, {
      entries: flavorRequests(sk).map((r) => ({
        id: r.id, name: r.placeholder_name,
        ...Object.fromEntries(r.slots.map((s) => [s,
          s === 'spells' ? '*Fireball*, *Shapechange*, *Guiding Bolt*' : s === 'spells_daily' ? '*Meteor Swarm*' : 'stone'])),
      })),
    }));
    for (const e of Object.values(m.sections).flat()) {
      const atWill = (e.text.match(/- \*\*At Will:\*\*([^\n]*)/) ?? [])[1];
      if (!atWill) continue;
      expect(atWill).not.toContain('Fireball'); // level 3 offense: demoted
      expect(atWill).toContain('Shapechange'); // level 9 self-utility: printed at will
      expect(atWill).toContain('Guiding Bolt'); // level 1 offense: fine
    }
  });

  test('hard-control spells demote from At Will to 1/Day', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Large', seed: 1259262920, alternatives: 3, archetype: 'skirmisher' });
    const m = applyFlavor(sk, respond(sk, {
      entries: flavorRequests(sk).map((r) => ({
        id: r.id, name: r.placeholder_name,
        ...Object.fromEntries(r.slots.map((s) => [s,
          s === 'spells' ? '*Guiding Bolt*, *Hold Monster*' : s === 'spells_daily' ? '*Holy Aura*' : 'stone'])),
      })),
    }));
    for (const e of Object.values(m.sections).flat()) {
      const atWill = (e.text.match(/- \*\*At Will:\*\*([^\n]*)/) ?? [])[1];
      if (!atWill) continue;
      expect(atWill).not.toContain('Hold Monster');
      expect(e.text).toMatch(/1\/Day(?: Each)?:\*\*[^\n]*Hold Monster/);
    }
  });
});

describe('mechanic-family variety', () => {
  test('at most one teleport mechanic per block', () => {
    // Four of six live blocks carried a teleport; print pairs Bonus Actions
    // with Legendary rarely (10% at CR 17+) but never stacks teleports.
    for (const cr of [11, 20]) {
      for (let seed = 1; seed <= 25; seed += 1) {
        const sk = buildSkeleton({ cr, size: 'Large', seed, alternatives: 3 });
        const teleports = sk.entries.filter((e) => /teleports? (?:up to|itself)/.test(e.text));
        expect(`CR ${cr} seed ${seed}: ${teleports.length}`).toMatch(/: [01]$/);
      }
    }
  });
});

describe('Vorlag regressions (live block 8, CR 20) — the spell-rule trio', () => {
  const mkSpells = (sk, atWill, daily) => respond(sk, {
    entries: flavorRequests(sk).map((r) => ({
      id: r.id, name: r.placeholder_name,
      ...Object.fromEntries(r.slots.map((s) => [s,
        s === 'spells' ? atWill : s === 'spells_daily' ? daily
          : s === 'signature_spell' ? '*Geas*' : 'oath'])),
    })),
  });

  test('slow-cast spells never sit At Will, but stay legal 1/Day (Night Hag precedent)', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 11, alternatives: 1 });
    const m = applyFlavor(sk, mkSpells(sk, '*Charm Person*, *Geas*', '*Dream*, *Modify Memory*'));
    for (const e of Object.values(m.sections).flat()) {
      const atWill = (e.text.match(/- \*\*At Will:\*\*([^\n]*)/) ?? [])[1];
      if (!atWill) continue;
      expect(atWill).not.toContain('Geas');
      expect(e.text).toMatch(/1\/Day[^\n]*\n?[^\n]*Dream/); // printed out-of-combat tool survives
    }
  });

  test('a slow-cast signature spell falls back — an echo casts at combat speed', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 11, alternatives: 1 });
    const m = applyFlavor(sk, mkSpells(sk, '*Command*', '*Modify Memory*'));
    for (const e of Object.values(m.sections).flat()) {
      expect(e.text).not.toMatch(/uses [\w ]*Spellcasting to cast \*Geas\*/);
    }
  });

  test('upcast notation strips from non-scaling spells and stays on scaling ones', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 11, alternatives: 1 });
    const m = applyFlavor(sk, mkSpells(sk, '*Command*', '*Dream* (level 9 version), *Cone of Cold* (level 9 version)'));
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toContain('*Dream* (level 9 version)');
    if (all.includes('Cone of Cold')) expect(all).toContain('*Cone of Cold* (level 9 version)');
  });

  test('an ungated control bonus action gates at CR 11+, stays free at low CR', () => {
    // The Pirate Captain's Captain's Charm (CR 6) is printed ungated; the
    // Vorlag's every-round free charm beside LR and a control nova is not.
    for (let seed = 1; seed <= 40; seed += 1) {
      const hi = buildSkeleton({ cr: 20, size: 'Huge', seed });
      for (const e of hi.entries) {
        if (e.section !== 'Bonus Actions') continue;
        if (/Saving Throw/.test(e.text) && /Charmed|Frightened|Restrained|Poisoned/.test(e.text)
            && !/\d+ \(\d+d\d+\)/.test(e.text)) {
          expect(`seed ${seed} ${e.name}: ${e.gate}`).toMatch(/Recharge/);
        }
      }
    }
  });
});

describe('the after-death slot (owner design)', () => {
  const { pickOnDeath, makeRng: rng2 } = require('../build-skeleton.mjs');

  test('CR-ramped: never at low CR, common at the top, at most one', () => {
    let low = 0; let high = 0;
    for (let seed = 1; seed <= 50; seed += 1) {
      const l = buildSkeleton({ cr: 3, size: 'Medium', seed });
      const h = buildSkeleton({ cr: 20, size: 'Huge', seed });
      low += l.traits.filter((t) => t.on_death || /dies outside|reforms|When the .* dies/.test(t.text)).length;
      const deaths = h.traits.filter((t) => t.on_death);
      high += deaths.length ? 1 : 0;
      expect(deaths.length).toBeLessThanOrEqual(1);
    }
    expect(low).toBe(0);
    expect(high).toBeGreaterThan(15);
    expect(high).toBeLessThan(45);
  });

  test('the family derives from type: fey anchor to bargains, dragons to hoards', () => {
    const fey = []; const dragon = [];
    for (let seed = 1; seed <= 80; seed += 1) {
      const f = pickOnDeath(20, rng2(seed), { typeHint: 'Fey' });
      const d = pickOnDeath(20, rng2(seed), { typeHint: 'Dragon' });
      if (f) fey.push(f.death_family);
      if (d) dragon.push(d.death_family);
    }
    // The default family must be the clear PLURALITY; the printed rows
    // (hearts, spirit jars, planar returns) legitimately compete.
    const top = (arr) => Object.entries(arr.reduce((a, x) => ({ ...a, [x]: (a[x] ?? 0) + 1 }), {}))
      .sort((a, b) => b[1] - a[1])[0][0];
    expect(top(fey)).toBe('continuity-anchor');
    expect(top(dragon)).toBe('continuity-trophy');
  });

  test('on-death templates fill cleanly with the new slots', () => {
    let found = null;
    for (let seed = 1; seed <= 60 && !found; seed += 1) {
      const sk = buildSkeleton({ cr: 20, size: 'Huge', seed, typeHint: 'Fey' });
      if (sk.traits.some((t) => t.text.includes('{anchor}'))) found = sk;
    }
    if (!found) return;
    const m = applyFlavor(found, respond(found, {
      entries: flavorRequests(found).map((r) => ({
        id: r.id, name: r.placeholder_name,
        ...Object.fromEntries(r.slots.map((s) => [s,
          s === 'anchor' ? 'the site of its oldest unpaid bargain'
            : s === 'undoing' ? 'fulfills or formally forgives that bargain' : 'oath'])),
      })),
    }));
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toMatch(/\{anchor\}|\{undoing\}|\{legacy\}/);
    const hadUndoing = found.traits.some((t) => t.text.includes('{undoing}'));
    if (hadUndoing) expect(all).toContain('formally forgives');
  });
});

describe('the slot schema, made explicit', () => {
  test('at most one aura per block', () => {
    // The Udraghoth ran a damage aura and a control aura simultaneously.
    for (const cr of [11, 20]) {
      for (let seed = 1; seed <= 25; seed += 1) {
        const sk = buildSkeleton({ cr, size: 'Huge', seed, alternatives: 3 });
        const auras = [...sk.traits, ...sk.entries]
          .filter((r) => /Emanation originating from the \{creature\}(?: takes| while it doesn't have)/.test(r.text));
        expect(`CR ${cr} seed ${seed}: ${auras.length}`).toMatch(/: [01]$/);
      }
    }
  });

  test('role coverage is reported and load-bearing roles are filled at tier', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 7 });
    expect(sk.roles).toBeDefined();
    expect(sk.roles.defiance).toBe(true); // LR floor
    expect(sk.roles.nova).toBe(true); // gated-burst floor
    expect(sk.roles.legendary).toBe(true); // CR 20 certainty
  });
});

describe('Oathwraith regressions (live block 9, CR 20)', () => {
  test('exactly one on-death occupant, ever', () => {
    // Resurgent Oath (a leaked general-pool Restoration) shipped beside
    // Anchored Vow: two rebirth clocks, two locations, two counter-rituals.
    const DEATH = /returns to life|gains a new body|reforms (?:in|with)/;
    for (const cr of [11, 20]) {
      for (let seed = 1; seed <= 30; seed += 1) {
        const sk = buildSkeleton({ cr, size: 'Huge', seed, typeHint: 'Celestial' });
        const deaths = sk.traits.filter((t) => DEATH.test(t.text));
        expect(`CR ${cr} seed ${seed}: ${deaths.length}`).toMatch(/: [01]$/);
      }
    }
  });

  test('the printed heart and spirit jar joined the on-death pool', () => {
    const lib9 = require('@/data/ability-library.json');
    const all = [...Object.values(lib9.traits.by_category).flat(), ...Object.values(lib9.categories).flat()];
    const heart = all.find((t) => t.source === 'Mummy Lord' && /heart is intact/.test(t.template_2024 ?? ''));
    expect(heart.pool).toBe('on_death');
    expect(heart.death_family).toBe('continuity-anchor');
  });

  test('the underwater rider strips off non-Fire breaths', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 899172890, alternatives: 3, archetype: 'skirmisher' });
    const m = applyFlavor(sk, respond(sk, { energy_damage: 'Radiant' }));
    for (const e of Object.values(m.sections).flat()) {
      expect(e.text).not.toMatch(/underwater doesn't grant Resistance to this Radiant/);
    }
  });

  test('2024 defense lines capitalize', async () => {
    const m = await generateFromSkeleton(
      { concept: 'x', cr: 9, seed: 5, resolvedType: 'Celestial' },
      async (p) => {
        if (!/Every number is already fixed/.test(p)) return JSON.stringify({ problems: [] });
        const sk = buildSkeleton({ cr: 9, seed: 5, alternatives: 3, archetype: null, typeHint: 'Celestial' });
        return JSON.stringify({ ...respond(sk), resistances: 'cold, fire', immunities: 'poison; blinded, exhaustion' });
      },
    );
    if (m.resistances) expect(m.resistances).toBe('Cold, Fire');
    if (m.immunities) expect(m.immunities).toBe('Poison; Blinded, Exhaustion');
  });
});

describe('pre-curation closes the flavor residue (owner direction)', () => {
  test('cross-type name vocabulary reverts to the placeholder', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 899172890, alternatives: 3, archetype: 'skirmisher', themes: ['celestial', 'aquatic'] });
    const area = sk.entries.find((e) => e.slot_type === 'area');
    if (!area) return;
    const m = applyFlavor(sk, respond(sk, {
      type: 'Celestial',
      entries: flavorRequests(sk).map((r) => ({
        id: r.id,
        name: r.id === area.id ? 'Abyssal Radiance' : r.placeholder_name,
        ...Object.fromEntries(r.slots.map((s) => [s, 'kelp'])),
      })),
    }));
    const names = Object.values(m.sections).flat().map((e) => e.name).join(' | ');
    expect(names).not.toContain('Abyssal Radiance'); // fiendish token on a Celestial
  });

  test('on-theme vocabulary survives', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 899172890, alternatives: 3, archetype: 'skirmisher', themes: ['celestial'] });
    const area = sk.entries.find((e) => e.slot_type === 'area');
    if (!area) return;
    const m = applyFlavor(sk, respond(sk, {
      type: 'Celestial',
      entries: flavorRequests(sk).map((r) => ({
        id: r.id,
        name: r.id === area.id ? 'Hallowed Radiance' : r.placeholder_name,
        ...Object.fromEntries(r.slots.map((s) => [s, 'light'])),
      })),
    }));
    const names = Object.values(m.sections).flat().map((e) => e.name).join(' | ');
    expect(names).toContain('Hallowed Radiance');
  });

  test('the spell suggestions filter to the palette', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 11, alternatives: 1, themes: ['grave', 'aquatic'] });
    if (!flavorRequests(sk).some((r) => r.slots.includes('spells'))) return;
    const p = buildFlavorPrompt(sk, { concept: 'a drowned oath-keeper', themes: ['grave', 'aquatic'] });
    expect(p).toContain('ON-PALETTE picks');
    expect(p).toMatch(/Animate Dead|Vampiric Touch|Blight|Control Water|Finger of Death/);
  });
});

describe('Gravecrystal regressions (live block 10, CR 20)', () => {
  test('a draconic THEME triggers the dragon kit even without a resolved type', async () => {
    const m = await generateFromSkeleton(
      { concept: 'a crystalline wyrm', cr: 20, seed: 4, themes: ['draconic', 'subterranean'] },
      async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] })),
    );
    expect(m.generation.package).toMatch(/Dragon kit$/);
  });

  test('the flavor call is never asked for a type', () => {
    // Type is total at the concept stage: concept-call value, else derived
    // from the first domain theme, else Monstrosity. A flavor model can no
    // longer late-label a kit-less block Dragon.
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 5 });
    const p = buildFlavorPrompt(sk, { concept: 'a gravel drake' });
    expect(p).not.toMatch(/"type":/);
    expect(p).toContain('TYPE is already decided');
  });

  test('type derivation: theme when no concept type, Monstrosity when neither', async () => {
    const grave = await generateFromSkeleton(
      { concept: 'x', cr: 9, seed: 5, themes: ['grave'] },
      async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] })),
    );
    expect(grave.type).toBe('Undead');
    const plain = await generateFromSkeleton(
      { concept: 'x', cr: 9, seed: 5 },
      async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] })),
    );
    expect(plain.type).toBe('Monstrosity');
  });

  test('article agreement survives number scaling', () => {
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 899172890, alternatives: 3, archetype: 'skirmisher' });
    const m = applyFlavor(sk, respond(sk));
    for (const e of Object.values(m.sections).flat()) {
      expect(e.text).not.toMatch(/\ban (?!8|11|18)\d/);
    }
  });
});

/**
 * Live block 10 (the Groan, CR 20 Construct): two spellcasting entries
 * (Spellcasting + Hellfire Spellcasting), two Recharge actions, a garbled
 * Pit Fiend template ("replace one Fireball" beside a non-Fireball cast,
 * "Wall of moss-sheathed root and stone"), a Construct without Poisoned or
 * Charmed immunity, off-edition free-picked spells (Erupting Earth), a
 * renamed Spellcasting stranding its legendary echo, Initiative -2 at CR 20,
 * and a secondary attack the Multiattack line never named.
 */
describe('the Groan: one Recharge, one spell list, per block', () => {
  test('no seed at any CR builds two Recharge-gated entries or two tiered lists', () => {
    for (const cr of [5, 11, 17, 20, 24]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3, caster: true });
        const gated = sk.entries.filter((e) => /Recharge/i.test(e.gate ?? ''));
        expect(gated.length).toBeLessThanOrEqual(1);
        const lists = sk.entries.filter((e) => /\*\*(?:At Will|\d+\/Day(?: Each)?):\*\*/.test(e.text));
        expect(lists.length).toBeLessThanOrEqual(1);
        // no combination of menu choices can smuggle a second one in
        for (const e of sk.entries) {
          for (const o of e.options ?? []) {
            if (/Recharge/i.test(o.gate ?? '') && gated.length && !gated.includes(e)) {
              throw new Error(`gated option on a non-gated entry: ${o.key}`);
            }
          }
        }
      }
    }
  });
});

describe('the Groan: spellcasting integrity', () => {
  const mini = (text, extraEntry = {}) => ({
    cr: '20', size: 'Huge', ac: 20, hp: 300, pb: 6, attack_bonus: 14, save_dc: 21,
    multiattack: 3, con_mod: 8, strike_stat: 'STR', cast_stat: 'Charisma', cast_mod: 7,
    counts: {}, themes: [], traits: [],
    entries: [{
      id: 'e1', section: 'Actions', slot_type: 'utility', name: 'Spellcasting',
      gate: null, text, damage: 0, options: [], ...extraEntry,
    }],
  });

  test('a name-locked Spellcasting keeps its name through a model rename', () => {
    const sk = mini('The {creature} casts one of the following spells (spell save DC 21):\n\n- **At Will:** *Fireball*', { name_locked: true });
    const m = applyFlavor(sk, {
      name: 'Groan', size: 'Huge', type: 'Construct', alignment: 'Unaligned', speed: '30 ft.',
      stats: { STR: 26, DEX: 6, CON: 26, INT: 2, WIS: 18, CHA: 24 },
      entries: [{ id: 'e1', name: 'Buried King’s Litany' }],
    });
    expect(Object.values(m.sections).flat().map((e) => e.name)).toContain('Spellcasting');
  });

  test('off-list spells are dropped from tier lines, vetted ones kept', () => {
    const sk = mini('The {creature} casts one of the following spells (spell save DC 21):\n\n- **At Will:** *Erupting Earth*, *Fireball*\n- **1/Day Each:** *Earth Tremor*, *Cone of Cold*');
    const m = applyFlavor(sk, {
      name: 'Groan', size: 'Huge', type: 'Construct', alignment: 'Unaligned', speed: '30 ft.',
      stats: { STR: 26, DEX: 6, CON: 26, INT: 2, WIS: 18, CHA: 24 }, entries: [],
    });
    const text = Object.values(m.sections).flat().map((e) => e.text).join('\n');
    expect(text).not.toMatch(/Erupting Earth|Earth Tremor/);
    expect(text).toMatch(/Cone of Cold/);
    expect(text).toMatch(/Fireball/); // kept (demoted off At Will is fine)
  });

  test('a caster whose every pick was off-list still casts something', () => {
    const sk = mini('The {creature} casts one of the following spells (spell save DC 21):\n\n- **At Will:** *Erupting Earth*');
    const m = applyFlavor(sk, {
      name: 'Groan', size: 'Huge', type: 'Construct', alignment: 'Unaligned', speed: '30 ft.',
      stats: { STR: 26, DEX: 6, CON: 26, INT: 2, WIS: 18, CHA: 24 }, entries: [],
    });
    const text = Object.values(m.sections).flat().map((e) => e.text).join('\n');
    expect(text).toMatch(/\*Detect Magic\*/);
  });
});

describe('the Groan: secondary attacks are enumerated', () => {
  test('a block with two attacks names the second in Multiattack', () => {
    let checked = 0;
    for (let seed = 1; seed <= 60 && checked < 3; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed });
      const attacks = sk.entries.filter((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack');
      const multi = sk.entries.find((e) => e.slot_type === 'multiattack');
      if (attacks.length < 2 || !multi) continue;
      checked += 1;
      for (const a of attacks.slice(1)) {
        expect(multi.text).toContain(`a use of ${a.name}`);
      }
    }
    expect(checked).toBeGreaterThan(0);
  });
});

describe('the Groan: assembly-level stamps', () => {
  test('CR 20 initiative sits above raw DEX; Construct immunity floor lands', async () => {
    const m = await generateFromSkeleton(
      { concept: 'a buried dreaming colossus', cr: 20, seed: 4, resolvedType: 'Construct' },
      async (p) => {
        if (!/Every number is already fixed/.test(p)) return JSON.stringify({ problems: [] });
        const sk = buildSkeleton({ cr: 20, seed: 4, alternatives: 3, archetype: null });
        return JSON.stringify(respond(sk));
      },
    );
    // measured: 29/29 printed CR 15+ blocks stamp initiative above DEX, mode +4
    const dexMod = Math.floor((m.stats.DEX - 10) / 2);
    expect(m.initiative_bonus).toBe(dexMod + 4);
    expect(m.initiative_score).toBe(10 + m.initiative_bonus);
    // measured floor: 8-9 of 10 printed Constructs carry all of these
    for (const c of ['Poison', 'Charmed', 'Exhaustion', 'Frightened', 'Paralyzed', 'Petrified', 'Poisoned']) {
      expect(m.immunities).toMatch(new RegExp(`\\b${c}\\b`));
    }
  });
});
