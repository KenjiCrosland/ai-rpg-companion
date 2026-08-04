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
      // identity-bound (the original batch) + fingerprint exclusions
      // (2026-08-03: structurally one-of-a-kind subsystems no rename hides)
      'Gelatinous Cube/Engulf', 'Ghost/Possession', 'Night Hag/Nightmare Haunting',
      'Sphinx of Valor/Roar', 'Vampire Spawn/Vampire Weakness', 'Vampire/Misty Escape',
      'Vampire/Shape-Shift', 'Vampire/Vampire Weakness',
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

/**
 * Live block 11 (the Rift-Shell Crag, CR 20): Multiattack said "a use of
 * Lightning Blade" while the block's second attack had been renamed Folded
 * Aperture — the build-time clause held the DEFAULT name through a swap the
 * rename pass keyed past. Multiattack is now regenerated from final names
 * as applyFlavor's last step.
 */
describe('the Rift-Shell Crag: Multiattack never references a missing attack', () => {
  const attackNamesIn = (m) => new Set(Object.values(m.sections).flat().map((e) => e.name.replace(/\s*\(.*\)$/, '')));

  test('a renamed secondary attack keeps its Multiattack reference', () => {
    let checked = 0;
    for (let seed = 1; seed <= 80 && checked < 3; seed += 1) {
      const sk = buildSkeleton({ cr: 17, size: 'Huge', seed, alternatives: 3 });
      const atks = sk.entries.filter((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack');
      if (atks.length < 2 || !sk.entries.some((e) => e.slot_type === 'multiattack')) continue;
      checked += 1;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        name: 'Crag', size: 'Huge', type: 'Monstrosity', alignment: 'Unaligned', speed: '30 ft.',
        stats: { STR: 26, DEX: 10, CON: 24, INT: 2, WIS: 18, CHA: 8 },
        entries: reqs.map((r) => ({
          id: r.id,
          // rename EVERY attack; swap everything to its LAST option too
          name: r.id === atks[1].id ? 'Folded Aperture' : r.id === atks[0].id ? 'Rift Splinter' : r.placeholder_name,
          choose: r.options.length > 1 ? r.options[r.options.length - 1].key : undefined,
          ...Object.fromEntries(r.slots.map((s) => [s, 'rift glass'])),
        })),
      });
      const multi = Object.values(m.sections).flat().find((e) => e.name === 'Multiattack');
      const names = attackNamesIn(m);
      for (const mm of multi.text.matchAll(/a use of ([A-Z][\w' -]+?)\./g)) {
        expect(`seed ${seed} references ${mm[1]}: ${names.has(mm[1])}`).toBe(`seed ${seed} references ${mm[1]}: true`);
      }
      // and the primary reference resolves too
      const primary = multi.text.match(/makes \w+ (.+?) attacks\./)[1];
      expect(names.has(primary)).toBe(true);
    }
    expect(checked).toBeGreaterThan(0);
  });
});

/**
 * The Rift-Shell Crag part 2: the MIND axis. A Cha 26 lie-sensing
 * Fear-casting Int 2 mindless monstrosity — cognition rows had no gate.
 * Measured: zero printed mindless casters (66 casters, min INT 3 = the
 * Stone Golem, which understands languages) and zero mindless lie-sensers
 * (2 blocks, both INT 19+).
 */
describe('the Rift-Shell Crag: mindless blocks carry no cognition abilities', () => {
  const COGNITION = /spellcasting ability|knows if it hears a lie|intentions or sincerity/;

  test('no seed at any CR gives a mindless block a caster or lie-senser row', () => {
    for (const cr of [5, 11, 17, 20]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3, mind: 'mindless' });
        for (const e of [...sk.entries, ...sk.traits]) {
          expect(`CR ${cr} seed ${seed} ${e.name}: ${COGNITION.test(e.text)}`)
            .toBe(`CR ${cr} seed ${seed} ${e.name}: false`);
          for (const o of e.options ?? []) {
            expect(COGNITION.test(o.text)).toBe(false);
          }
        }
      }
    }
  });

  test('an explicit caster request overrides the mind profile', () => {
    // the user checked the spellcaster box — sapience is implied
    let sawCaster = false;
    for (let seed = 1; seed <= 30 && !sawCaster; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, caster: true, mind: 'mindless' });
      sawCaster = sk.entries.some((e) => /spellcasting ability/.test(e.text));
    }
    expect(sawCaster).toBe(true);
  });

  test('sapient (the default) still fields casters', () => {
    let sawCaster = false;
    for (let seed = 1; seed <= 30 && !sawCaster; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed });
      sawCaster = [...sk.entries, ...sk.traits].some((e) => /spellcasting ability/.test(e.text));
    }
    expect(sawCaster).toBe(true);
  });

  test('both concept prompts ask for the mind profile', async () => {
    const { buildArchetypeResolvePrompt, buildSeedSynthesisPrompt } = await import('../../format-2024/generate.mjs');
    for (const p of [
      buildArchetypeResolvePrompt('a stone colossus', '', { cr: 20 }),
      buildSeedSynthesisPrompt({ intelligence: 'mindless', physical: 'stone', silhouette: 'colossus', origin: 'the deep' }, { cr: 20 }),
    ]) {
      expect(p).toMatch(/"mind"/);
      expect(p).toMatch(/sapient\|bestial\|mindless/);
      expect(p).toMatch(/only sapient creatures cast spells/);
    }
  });
});

/**
 * Live block 12 (the Dreamweb, CR 20 mindless Construct): shipped with the
 * audit skipped. A 30-damage no-save paralysis rider (print prices the
 * Lich's at half), legendary sight ranges doubling a blind-beyond-60 sense
 * line, "its a churning rush" (an option's slot the default never asked
 * for, plus an article-carrying fallback), and names lying about payloads
 * (Hypnotic aura that frightens, Colony Breath about not breathing).
 */
describe('the Dreamweb: save-less hard riders price at print', () => {
  test('the Lich touch template gets the measured discount', () => {
    const lich = Object.values(library.categories).flat()
      .find((r) => r.source === 'Lich' && r.ability === 'Paralyzing Touch');
    const { numbersFor: numsFor } = require('../build-skeleton.mjs');
    const nums = numsFor(20);
    const { damage } = fillTemplateX(lich, { cr: 20, size: 'Large', nums });
    expect(damage).toBeLessThanOrEqual(Math.ceil(nums.per_attack_damage * 0.55));
    expect(damage).toBeGreaterThanOrEqual(Math.floor(nums.per_attack_damage * 0.4));
  });
});
const { fillTemplate: fillTemplateX } = require('../build-skeleton.mjs');
const library = require('@/data/ability-library.json');

describe('the Dreamweb: text follows the senses line', () => {
  const mini = (text, senses) => ({
    cr: '20', size: 'Large', ac: 20, hp: 300, pb: 6, attack_bonus: 14, save_dc: 22,
    multiattack: 3, con_mod: 8, strike_stat: 'STR', cast_stat: 'Charisma', cast_mod: 8,
    counts: {}, themes: [], traits: [],
    entries: [{ id: 'e1', section: 'Legendary Actions', slot_type: 'legendary', name: 'Rattle', gate: null, text, damage: 0, options: [] }],
  });
  const flavor = (senses) => ({
    name: 'Dreamweb', size: 'Large', type: 'Construct', alignment: 'Unaligned', speed: '30 ft.',
    stats: { STR: 26, DEX: 14, CON: 26, INT: 2, WIS: 10, CHA: 6 },
    senses_special: senses, entries: [],
  });

  test('"can see within" clamps to a blind-beyond radius', () => {
    const m = applyFlavor(
      mini('*Constitution Saving Throw*: DC 22, each creature in a 20-foot-radius Sphere centered on a point the {creature} can see within 120 feet.'),
      flavor('blindsight 60 ft. (blind beyond this radius), tremorsense 60 ft.'),
    );
    const text = Object.values(m.sections).flat().map((e) => e.text).join('\n');
    expect(text).toContain('can see within 60 feet');
    expect(text).not.toContain('120 feet');
  });

  test('darkvision creatures are not clamped', () => {
    const m = applyFlavor(
      mini('one creature the {creature} can see within 120 feet.'),
      flavor('darkvision 60 ft.'),
    );
    const texts = Object.values(m.sections).flat().map((e) => e.text).join('\n');
    expect(texts).toContain('within 120 feet');
  });
});

describe('the Dreamweb: menu options get their slots asked and filled', () => {
  test('flavorRequests unions slots across the whole menu', () => {
    const sk = {
      cr: '20', entries: [{
        id: 'e1', section: 'Bonus Actions', slot_type: 'utility', name: 'Teleport',
        text: 'The {creature} teleports up to 60 feet.', gate: null,
        options: [{ key: 'Ignited Illumination', text: 'The {creature} activates or suppresses its {substance}.' }],
      }],
      traits: [],
    };
    expect(flavorRequests(sk)[0].slots).toContain('substance');
  });

  test('an unfilled possessive substance falls back without an article', () => {
    const m = applyFlavor({
      cr: '20', size: 'Large', ac: 20, hp: 300, pb: 6, attack_bonus: 14, save_dc: 22,
      multiattack: 3, con_mod: 8, strike_stat: 'STR', cast_stat: 'Charisma', cast_mod: 8,
      counts: {}, themes: [], traits: [],
      entries: [{ id: 'e1', section: 'Bonus Actions', slot_type: 'utility', name: 'Lantern', gate: null, text: 'The {creature} activates or suppresses its {substance}.', damage: 0, options: [] }],
    }, {
      name: 'Dreamweb', size: 'Large', type: 'Construct', alignment: 'Unaligned', speed: '30 ft.',
      stats: { STR: 26, DEX: 14, CON: 26, INT: 2, WIS: 10, CHA: 6 }, entries: [],
    });
    const text = Object.values(m.sections).flat().find((e) => /suppresses/.test(e.text)).text;
    expect(text).not.toMatch(/its a /);
    // a Construct now draws its fallback from the forged bank (Phase 3);
    // the static article-free phrase remains the floor for bankless blocks
    const banks3 = require('@/data/texture-banks.json').facets;
    const legal = [...banks3.forged.substances, 'churning vapor'];
    expect(legal.some((sub) => text.includes(`its ${sub}`))).toBe(true);
  });
});


/**
 * Live block 13 (the Bogstone, CR 20 Large Fey): a swallow kit gated
 * "Small or smaller" — dead text against a Medium party — because the
 * Purple Worm's printed RELATIVE offset (two sizes down) was applied to a
 * Large creature. Zero printed grapple/swallow gates sit below Medium at
 * CR 5+. Plus: the condition-slot theme boost (x3) always lost to the
 * printed default (x4), shipping the same Frightened aura four blocks
 * running.
 */
describe('the Bogstone: size gates never fall below Medium at CR 5+', () => {
  test('the Purple Worm swallow row on a Large CR 20 gates Medium, not Small', () => {
    const worm = Object.values(library.categories).flat()
      .find((r) => r.source === 'Purple Worm' && r.ability === 'Swallow');
    const nums = numbersForB(20);
    const { text } = fillTemplateB(worm, { cr: 20, size: 'Large', nums });
    expect(text).toContain('Medium or smaller');
    expect(text).not.toContain('Small or smaller');
  });

  test('low-CR blocks keep gates below Medium (floor only applies at CR 5+)', () => {
    const frog = Object.values(library.categories).flat()
      .find((r) => r.source === 'Giant Frog' && r.ability === 'Bite');
    const nums = numbersForB(0.25);
    const { text } = fillTemplateB(frog, { cr: 0.25, size: 'Small', nums });
    expect(text).toContain('Small or smaller');
  });
});
const { fillTemplate: fillTemplateB, numbersFor: numbersForB, makeRng: makeRngB } = require('../build-skeleton.mjs');

describe('the Bogstone: theme affinity actually steers conditions now', () => {
  test('a beguiling theme outdraws the Frightened default on a Wis-save aura', () => {
    const row = {
      source: 'Test', ability: 'Aura', cr: '20', slot_type: 'save_effect',
      template_2024: '*Wisdom Saving Throw*: DC {dc}, any enemy that starts its turn in the aura. *Failure:* The target has the {condition_soft} condition until the start of its next turn.',
      condition_default: 'Frightened',
    };
    const nums = numbersForB(20);
    const seen = {};
    for (let s = 1; s <= 400; s += 1) {
      const c = fillTemplateB(row, { cr: 20, size: 'Large', nums, rng: makeRngB(s), themes: ['beguiling'] })
        .text.match(/has the (\w+) condition/)[1];
      seen[c] = (seen[c] ?? 0) + 1;
    }
    expect(seen.Charmed).toBeGreaterThan(seen.Frightened); // steering wins
    expect(seen.Frightened).toBeGreaterThan(0); // guide, never constrain
  });
});

/**
 * Phase 3 wiring (owner-approved 2026-08-03): the texture banks feed the
 * flavor prompt in full (menus), replace off-domain fills (vet), and back
 * missing fills (banked never-fail). Banks are data in
 * src/data/texture-banks.json; guide, never constrain — themes license
 * crossovers.
 */
describe('texture banks: menus, vet, fallbacks', () => {
  const banks = require('@/data/texture-banks.json').facets;
  const mini = (text, themes, type = 'Construct', extra = {}) => ({
    cr: '20', size: 'Large', ac: 20, hp: 300, pb: 6, attack_bonus: 14, save_dc: 22,
    multiattack: 3, con_mod: 8, strike_stat: 'STR', cast_stat: 'Charisma', cast_mod: 8,
    seed: 42, counts: {}, themes, traits: [],
    entries: [{ id: 'e1', section: 'Actions', slot_type: 'utility', name: 'Vent', gate: null, text, damage: 0, options: [] }],
    ...extra,
  });
  const flavor = (type, entries = []) => ({
    name: 'Testling', size: 'Large', type, alignment: 'Unaligned', speed: '30 ft.',
    stats: { STR: 26, DEX: 10, CON: 26, INT: 6, WIS: 12, CHA: 8 }, entries,
  });
  const textOf = (m) => Object.values(m.sections).flat().map((e) => e.text).join('\n');

  test('the flavor prompt carries the FULL banks for the block\'s facets', () => {
    const sk = mini('The {creature} vents {substance}.', ['forged']);
    const prompt = buildFlavorPrompt(sk, { concept: 'a furnace colossus', themes: ['forged'] });
    expect(prompt).toContain('TEXTURE PALETTE');
    for (const s of banks.forged.substances) expect(prompt).toContain(s);
    expect(prompt).toContain('energy damage this register favors');
  });

  test('a missing fill draws from the block\'s own banks, deterministically', () => {
    const sk = mini('The {creature} vents {substance}.', ['forged']);
    const a = textOf(applyFlavor(sk, flavor('Construct')));
    const b = textOf(applyFlavor(sk, flavor('Construct')));
    expect(a).toBe(b); // seeded
    const filled = a.match(/vents (.+)\./)[1];
    expect(banks.forged.substances).toContain(filled);
  });

  test('an off-domain fill is vetted and replaced on-theme', () => {
    const sk = mini('The {creature} vents {substance}.', ['forged']);
    const m = applyFlavor(sk, flavor('Construct', [{ id: 'e1', name: 'Vent', substance: 'spore-laced haze' }]));
    const text = textOf(m);
    expect(text).not.toContain('spore');
    expect(banks.forged.substances.some((s) => text.includes(s))).toBe(true);
  });

  test('themes license crossovers: verdant theme keeps spore vocabulary', () => {
    const sk = mini('The {creature} vents {substance}.', ['forged', 'verdant']);
    const m = applyFlavor(sk, flavor('Construct', [{ id: 'e1', name: 'Vent', substance: 'spore-laced haze' }]));
    expect(textOf(m)).toContain('spore-laced haze');
  });

  test('the TYPE facet licenses its own register with no themes at all', () => {
    const sk = mini('The {creature} vents {substance}.', []);
    const m = applyFlavor(sk, flavor('Plant', [{ id: 'e1', name: 'Vent', substance: 'spore cloud' }]));
    expect(textOf(m)).toContain('spore cloud');
  });

  test('appendage pairs stay coherent when both slots fall back', () => {
    const sk = mini('One {appendage}; many {appendage_plural}.', ['forged']);
    const text = textOf(applyFlavor(sk, flavor('Construct')));
    const [, one, many] = text.match(/One (.+); many (.+)\./);
    const pair = banks.forged.appendages.find((p) => p.one === one);
    expect(pair).toBeTruthy();
    expect(many).toBe(pair.many);
  });

  test('no themes, no banks: the static fallback still ships', () => {
    const sk = mini('The {creature} vents {substance}.', []);
    const text = textOf(applyFlavor(sk, flavor('Monstrosity')));
    expect(text).toContain('churning vapor');
  });
});

/**
 * Owner overrule (2026-08-03): no concentration spell casts from a
 * LEGENDARY action. Print's single instance (White Dragon Frightful
 * Presence casting *Fear*) is judged errata-shaped; those rows are
 * rewritten as a native fear emanation (modified_from_print). Slotted
 * legendary echoes vet their fills; daily/at-will lists stay legal homes
 * (the Night Hag precedent).
 */
describe('no concentration spell ever casts from a legendary action', () => {
  const { CONCENTRATION_SPELLS } = require('../flavor-prompt.mjs');
  const library2 = require('@/data/ability-library.json');

  test('no legendary row hardcodes a concentration cast (data)', () => {
    const offenders = [];
    for (const r of Object.values(library2.categories).flat()) {
      if (r.slot_type !== 'legendary') continue;
      for (const m of (r.template_2024 ?? '').matchAll(/casts \*([A-Z][\w' ]+?)\*/g)) {
        if (CONCENTRATION_SPELLS.includes(m[1])) offenders.push(`${r.source}/${r.ability}: ${m[1]}`);
      }
    }
    expect(offenders).toEqual([]);
    // and the rewritten rows carry their provenance
    const white = Object.values(library2.categories).flat()
      .filter((r) => /White Dragon/.test(r.source) && r.ability === 'Frightful Presence');
    expect(white.length).toBe(2);
    for (const r of white) {
      expect(r.modified_from_print).toMatch(/overrule/i);
      expect(r.condition_default).toBe('Frightened');
    }
  });

  test('a legendary echo fill of a concentration spell is vetted out', () => {
    const mini = (section) => ({
      cr: '20', size: 'Large', ac: 20, hp: 300, pb: 6, attack_bonus: 14, save_dc: 22,
      multiattack: 3, con_mod: 8, strike_stat: 'STR', cast_stat: 'Charisma', cast_mod: 8,
      seed: 9, counts: {}, themes: [], traits: [],
      entries: [{ id: 'e1', section, slot_type: 'legendary', name: 'Echo', gate: null, text: 'The {creature} casts {spells}, using the same spellcasting ability as Spellcasting.', damage: 0, options: [] }],
    });
    const flavor = { name: 'Testling', size: 'Large', type: 'Monstrosity', alignment: 'Unaligned', speed: '30 ft.', stats: { STR: 26, DEX: 10, CON: 26, INT: 6, WIS: 12, CHA: 8 }, entries: [{ id: 'e1', name: 'Echo', spells: '*Hold Monster*' }] };
    const leg = applyFlavor(mini('Legendary Actions'), flavor);
    const legText = Object.values(leg.sections).flat().map((e) => e.text).join('\n');
    expect(legText).not.toContain('Hold Monster');
    expect(legText).toContain('*Detect Magic*'); // never-fail fallback
    // the rule is legendary-only: the same fill in Actions is untouched
    const act = applyFlavor(mini('Actions'), flavor);
    expect(Object.values(act.sections).flat().map((e) => e.text).join('\n')).toContain('Hold Monster');
  });
});

/**
 * Live block 15 (the Foundry Stag, CR 20, user-typed name): the signature
 * FALLBACK (*Chromatic Orb*) wasn't in KNOWN_SPELLS, so the reconciliation
 * appended it to the At Will list and the off-list filter stripped it right
 * back out — a legendary echo casting a spell the sheet didn't carry. Plus
 * a splice artifact: a sentence-shaped legacy fill ending in "." before the
 * template's own "." shipped a double period.
 */
describe('the Foundry Stag: fallback spells are citizens of their own universe', () => {
  const mini = (section, tmpl, themes = [], seed = 9) => ({
    cr: '20', size: 'Large', ac: 20, hp: 300, pb: 6, attack_bonus: 14, save_dc: 21,
    multiattack: 3, con_mod: 6, strike_stat: 'STR', cast_stat: 'Charisma', cast_mod: 7,
    seed, counts: {}, themes, traits: [],
    entries: [
      { id: 'e1', section: 'Actions', slot_type: 'utility', name: 'Spellcasting', name_locked: true, gate: null, text: 'The {creature} casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 21):\n\n- **At Will:** *Scorching Ray*', damage: 0, options: [] },
      { id: 'e2', section, slot_type: 'legendary', name: 'Echo', gate: null, text: tmpl, damage: 0, options: [] },
    ],
  });
  const flavor = (entries = []) => ({
    name: 'Stag', size: 'Large', type: 'Construct', alignment: 'Unaligned', speed: '30 ft.',
    stats: { STR: 26, DEX: 12, CON: 22, INT: 6, WIS: 16, CHA: 24 }, entries,
  });
  const textOf = (m) => Object.values(m.sections).flat().map((e) => e.text).join('\n');

  test('a static-fallback echo spell survives onto the spell list (cast implies listed)', () => {
    // themeless: no themed pool, falls to *Chromatic Orb* — which must now
    // ride the reconciliation onto the At Will line and STAY there
    const m = applyFlavor(
      mini('Legendary Actions', 'The {creature} uses Spellcasting to cast {signature_spell}. The {creature} can\'t take this action again until the start of its next turn.'),
      flavor(),
    );
    const caster = Object.values(m.sections).flat().find((e) => /At Will:/.test(e.text));
    expect(caster.text).toContain('Chromatic Orb');
  });

  test('a themed block\'s dead signature fill draws an on-palette spell instead', () => {
    const m = applyFlavor(
      mini('Legendary Actions', 'The {creature} uses Spellcasting to cast {signature_spell}. The {creature} can\'t take this action again until the start of its next turn.', ['grave']),
      flavor(),
    );
    const text = textOf(m);
    const cast = text.match(/to cast \*([A-Z][\w' ]+?)\*/)[1];
    const graveSpells = Object.entries(require('@/data/ability-library.json')._meta.spell_facets)
      .filter(([, fs]) => fs.includes('grave')).map(([sp]) => sp);
    expect(graveSpells).toContain(cast);
    // and never a concentration spell from a legendary, nor a slow cast
    expect(['Darkness', 'Animate Dead', 'Create Undead']).not.toContain(cast);
    // cast-implies-listed holds for the themed pick too
    const caster = Object.values(m.sections).flat().find((e) => /At Will:/.test(e.text));
    expect(caster.text).toContain(cast);
  });

  test('sentence-shaped fills never splice a double period', () => {
    const sk = {
      cr: '20', size: 'Large', ac: 20, hp: 300, pb: 6, attack_bonus: 14, save_dc: 21,
      multiattack: 3, con_mod: 6, strike_stat: 'STR', cast_stat: 'Charisma', cast_mod: 7,
      seed: 9, counts: {}, themes: [], traits: [],
      entries: [{ id: 'e1', section: 'Traits', slot_type: 'utility', name: 'Legacy', gate: null, text: 'When the {creature} dies, {legacy}.', damage: 0, options: [] }],
    };
    const m = applyFlavor(sk, flavor([{ id: 'e1', name: 'Furnace Heart', legacy: 'its core cools into a lump of slag that hums with heat.' }]));
    const text = textOf(m);
    expect(text).toContain('hums with heat.');
    expect(text).not.toMatch(/\.\./);
  });

  test('the palette prompt uses the bank-anchored wording (invention reframe reverted)', () => {
    // The "invent most fills fresh" experiment correlated with conceptually
    // hollow blocks — invented CONCEPT names (tallying, unremembering)
    // write mechanical promises no printed template keeps. Reverted to the
    // tested "draw on it" framing (owner call, 2026-08-03).
    const sk = mini('Legendary Actions', 'The {creature} casts {signature_spell}.', ['forged']);
    const prompt = buildFlavorPrompt(sk, { concept: 'a foundry stag', themes: ['forged'] });
    expect(prompt).toContain('Draw on it for every fill and name');
    expect(prompt).not.toContain('CALIBRATION');
  });
});

/**
 * Live block 16 (the Lidless Prismatic Scribe): the model wrapped its menu
 * choices in markdown ("*Blinding Gaze") and the exact-key match silently
 * kept the default — the block shipped a gaze-named PUSH mechanic because
 * the model named the entry for the choice it believed it had made.
 */
describe('the Scribe: markdown-wrapped choices still resolve', () => {
  const { resolveChoices } = require('../flavor-prompt.mjs');
  test('starred, bolded, and case-shifted choose keys all match', () => {
    const sk = {
      cr: '20', size: 'Huge', ac: 20, hp: 300, pb: 6, attack_bonus: 14, save_dc: 21,
      multiattack: 3, con_mod: 6, strike_stat: 'STR', cast_stat: 'Charisma', cast_mod: 7,
      seed: 3, counts: {}, themes: [], traits: [],
      entries: [{
        id: 'e1', section: 'Legendary Actions', slot_type: 'legendary', name: 'Cold Gale',
        gate: null, text: 'Push text.', damage: 0,
        options: [
          { key: 'Cold Gale', name: 'Cold Gale', text: 'Push text.', gate: null, slot_type: 'legendary' },
          { key: 'Blinding Gaze', name: 'Blinding Gaze', text: 'Blind text.', gate: null, slot_type: 'legendary' },
        ],
      }],
    };
    for (const choose of ['*Blinding Gaze', '**Blinding Gaze**', 'blinding gaze', '`Blinding Gaze`']) {
      const resolved = resolveChoices(sk, new Map([['e1', { id: 'e1', choose }]]));
      expect(resolved[0].name).toBe('Blinding Gaze');
    }
    // garbage still keeps the default rather than throwing
    const kept = resolveChoices(sk, new Map([['e1', { id: 'e1', choose: 'Nonexistent Pick' }]]));
    expect(kept[0].name).toBe('Cold Gale');
  });
});

/**
 * Live block 17 (the Grave Vow, audit-flake day): a degraded response
 * dropped markdown everywhere — plain-text spell fills emptied the
 * Spellcasting list to bare dashes, a plain "Blight" echo dangled unlisted,
 * senses doubled Passive Perception, "isn't a Undead" shipped, a legendary
 * named itself "Grave Vow", and Spellcasting rendered second instead of
 * last. Root fix: spell fills are STRUCTURED DATA (plain names, arrays) and
 * the ENGINE writes every asterisk; strings normalize through the same path.
 */
describe('the Grave Vow: the engine owns all spell markup', () => {
  const mini = (entries, seed = 5) => ({
    cr: '20', size: 'Large', ac: 20, hp: 300, pb: 6, attack_bonus: 14, save_dc: 21,
    multiattack: 3, con_mod: 7, strike_stat: 'STR', cast_stat: 'Charisma', cast_mod: 7,
    seed, counts: {}, themes: ['grave'], traits: [],
    entries,
  });
  const flavor = (entries, extra = {}) => ({
    name: 'Grave Vow', size: 'Large', type: 'Undead', alignment: 'Lawful Neutral', speed: '25 ft.',
    stats: { STR: 26, DEX: 8, CON: 24, INT: 18, WIS: 16, CHA: 24 }, entries, ...extra,
  });
  const CASTER = {
    id: 'e1', section: 'Actions', slot_type: 'utility', name: 'Spellcasting', name_locked: true,
    gate: null, damage: 0, options: [],
    text: 'The {creature} casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 21):\n\n- **At Will:** {spells}\n- **1/Day Each:** {spells_daily}',
  };
  const textOf = (m) => Object.values(m.sections).flat().map((e) => e.text).join('\n');

  test('array fills arrive plain and leave italicized, vetted, upcast preserved', () => {
    const m = applyFlavor(mini([CASTER]), flavor([{
      id: 'e1', name: 'x',
      spells: ['Scorching Ray', 'Erupting Earth', 'command'],
      spells_daily: ['Fireball (level 9 version)'],
    }]));
    const text = textOf(m);
    expect(text).toContain('*Scorching Ray*');
    expect(text).toContain('*Command*'); // case-normalized to canonical
    expect(text).toContain('*Fireball* (level 9 version)');
    expect(text).not.toContain('Erupting Earth'); // off-list never survives
  });

  test('a plain-text STRING fill normalizes through the same path (the belt)', () => {
    const m = applyFlavor(mini([CASTER]), flavor([{
      id: 'e1', name: 'x', spells: 'Chill Touch, Blight', spells_daily: '',
    }]));
    const text = textOf(m);
    expect(text).toContain('*Blight*');
    expect(text).not.toMatch(/^\s*-\s*$/m); // never an orphan dash
  });

  test('garbage fills leave no bare bullets — the rescue line stands alone', () => {
    const m = applyFlavor(mini([CASTER]), flavor([{
      id: 'e1', name: 'x', spells: 'Grave Vow', spells_daily: 'nonsense words',
    }]));
    const text = Object.values(m.sections).flat().find((e) => /casts one of the following/.test(e.text)).text;
    expect(text).toContain('- **At Will:** *Detect Magic*');
    expect(text).not.toMatch(/^\s*-\s*$/m);
  });

  test('a plain-name signature echo still reaches the spell list (cast implies listed)', () => {
    const ECHO = {
      id: 'e2', section: 'Legendary Actions', slot_type: 'legendary', name: 'Echo', gate: null,
      damage: 0, options: [],
      text: 'The {creature} uses Spellcasting to cast {signature_spell}.',
    };
    const m = applyFlavor(mini([CASTER, ECHO]), flavor([
      { id: 'e1', name: 'x', spells: ['Chill Touch'], spells_daily: [] },
      { id: 'e2', name: 'Echo', signature_spell: 'Blight' },
    ]));
    const caster = Object.values(m.sections).flat().find((e) => /At Will:/.test(e.text));
    expect(textOf(m)).toContain('cast *Blight*');
    expect(caster.text).toContain('*Blight*');
  });

  test('kindred article agreement: an Undead, not a Undead', () => {
    const AURA = {
      id: 'e1', section: 'Legendary Actions', slot_type: 'legendary', name: 'Aura', gate: null,
      damage: 0, options: [],
      text: "each creature that isn't a {kindred_type} in a 30-foot Emanation takes damage.",
    };
    const m = applyFlavor(mini([AURA]), flavor([{ id: 'e1', name: 'Aura', kindred_type: 'Undead' }]));
    expect(textOf(m)).toContain("isn't an Undead");
  });

  test('Actions order: Multiattack, attacks, Recharge, Spellcasting LAST', () => {
    const sk = mini([
      CASTER,
      { id: 'e2', section: 'Actions', slot_type: 'plain_attack', name: 'Claw', gate: null, damage: 30, options: [], text: '*Melee Attack Roll:* +14, reach 5 ft. 30 (5d8 + 8) {damage_type} damage.' },
      { id: 'e3', section: 'Actions', slot_type: 'area', name: 'Breath', gate: 'Recharge 5-6', damage: 91, options: [], text: '*Constitution Saving Throw*: DC 21, each creature in a 60-foot Cone. *Failure:* 91 (14d12) {damage_type} damage. *Success:* Half damage.' },
    ]);
    sk.entries.push({ id: undefined, section: 'Actions', slot_type: 'multiattack', name: 'Multiattack', gate: null, damage: 0, options: [], text: 'The {creature} makes three Claw attacks.' });
    const m = applyFlavor(sk, flavor([{ id: 'e1', name: 'x', spells: ['Chill Touch'], spells_daily: [] }]));
    const names = m.sections.Actions.map((e) => e.name.replace(/\s*\(.*\)$/, ''));
    expect(names[0]).toBe('Multiattack');
    expect(names[names.length - 1]).toBe('Spellcasting');
    expect(names.indexOf('Breath')).toBeLessThan(names.indexOf('Spellcasting'));
    expect(names.indexOf('Claw')).toBeLessThan(names.indexOf('Breath'));
  });
});

describe('the Grave Vow: assembly-level cleanups', () => {
  test('a model-embedded Passive Perception is stripped — computed value is authoritative', async () => {
    const m = await generateFromSkeleton(
      { concept: 'a grave guardian', cr: 20, seed: 6, resolvedType: 'Undead' },
      async (p) => {
        if (!/Every number is already fixed/.test(p)) return JSON.stringify({ problems: [] });
        const sk = buildSkeleton({ cr: 20, seed: 6, alternatives: 3, archetype: null });
        return JSON.stringify(respond(sk, {
          senses_special: 'blindsight 60 ft. (blind beyond this radius), Passive Perception 18',
        }));
      },
    );
    expect((m.senses.match(/Passive Perception/g) ?? []).length).toBe(1);
    expect(m.senses).not.toContain('Passive Perception 18,');
  });

  test('an entry named after the monster reverts to its placeholder (no-audit backstop)', async () => {
    const m = await generateFromSkeleton(
      { concept: 'a grave guardian', cr: 20, seed: 6, resolvedType: 'Undead' },
      async (p) => {
        if (!/Every number is already fixed/.test(p)) throw new Error('audit down'); // audit-flake day
        const sk = buildSkeleton({ cr: 20, seed: 6, alternatives: 3, archetype: null });
        const r = respond(sk);
        r.name = 'Riftbloom';
        r.entries[0].name = 'Riftbloom'; // model names an entry after the monster
        return JSON.stringify(r);
      },
    );
    for (const [sec, list] of Object.entries(m.sections)) {
      for (const e of list) {
        expect(`${sec}/${e.name} self-named: ${e.name.replace(/\s*\(.*\)$/, '') === 'Riftbloom'}`)
          .toBe(`${sec}/${e.name} self-named: false`);
      }
    }
  });
});

/**
 * Live block 18 (the Tallying Seam): Census Command cast Earthquake from a
 * legendary action — the concentration overrule was implemented but its
 * list was short. The gap audit swept the known universe against the SRD.
 */
describe('the Tallying Seam: the concentration list covers the known universe', () => {
  test('Earthquake-class spells are vetted out of legendary echoes', () => {
    const { CONCENTRATION_SPELLS } = require('../flavor-prompt.mjs');
    for (const sp of ['Earthquake', 'Vampiric Touch', 'Control Water', 'Control Weather']) {
      expect(CONCENTRATION_SPELLS).toContain(sp);
    }
  });

  test('a legendary echo filling Earthquake takes the vetted fallback', () => {
    const sk = {
      cr: '20', size: 'Huge', ac: 20, hp: 300, pb: 6, attack_bonus: 14, save_dc: 21,
      multiattack: 3, con_mod: 6, strike_stat: 'STR', cast_stat: 'Charisma', cast_mod: 7,
      seed: 4, counts: {}, themes: [], traits: [],
      entries: [{ id: 'e1', section: 'Legendary Actions', slot_type: 'legendary', name: 'Echo', gate: null, damage: 0, options: [], text: 'The {creature} uses Spellcasting to cast {signature_spell}.' }],
    };
    const m = applyFlavor(sk, {
      name: 'Seam', size: 'Huge', type: 'Elemental', alignment: 'Lawful Neutral', speed: '40 ft.',
      stats: { STR: 26, DEX: 14, CON: 22, INT: 16, WIS: 16, CHA: 24 },
      entries: [{ id: 'e1', name: 'Echo', signature_spell: 'Earthquake' }],
    });
    expect(Object.values(m.sections).flat().map((e) => e.text).join('\n')).not.toContain('Earthquake');
  });
});
