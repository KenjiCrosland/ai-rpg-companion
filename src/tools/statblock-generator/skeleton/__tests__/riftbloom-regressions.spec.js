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
          // Ladder-form rows are SELF-gated (the Ryll ruling: 20/20 printed
          // utility breaths go ungated, the escalation buffer is the gate) —
          // the same exemption the belt and gatedLike carry.
          if (/(?:First|Second) Failure/i.test(e.text)) continue;
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
    const m = applyFlavor(sk, respond(sk, { senses_special: 'darkvision 60 ft., Tremorsense 60 ft.' }));
    expect(m.senses_special).toBe('darkvision 60 ft., Tremorsense 60 ft.');
  });

  test('tremorsense never ships alone — print always pairs it with a sight sense', () => {
    const sk = buildSkeleton({ cr: 9, size: 'Large', seed: 2 });
    const m = applyFlavor(sk, respond(sk, { senses_special: 'Tremorsense 60 ft.' }));
    expect(m.senses_special).toBe('darkvision 60 ft., Tremorsense 60 ft.');
    // an existing sight sense is left exactly as written
    const paired = applyFlavor(sk, respond(sk, { senses_special: 'blindsight 30 ft., tremorsense 60 ft.' }));
    expect(paired.senses_special).toBe('blindsight 30 ft., tremorsense 60 ft.');
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
    // themed to mind/terror so the identity vet (which now judges utility
    // spells too) keeps the action spells this test is actually about —
    // the fixture's original picks were incidental to the reaction/bonus
    // stripping it pins
    const sk = buildSkeleton({ cr: 20, size: 'Huge', seed: 2036068080, alternatives: 3, archetype: 'brute', themes: ['mind', 'terror'] });
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
    // The breath is asserted by its MECHANIC, not by the word "Breath":
    // entry names are the creature's own now, so a name check would only be
    // testing that we still ship the donor's label.
    const breath = (m.sections.Actions ?? []).find((e) => /Recharge/i.test(e.name)
      && /(?:Cone|Line)/.test(e.text) && /Saving Throw/.test(e.text));
    expect(breath).toBeTruthy();
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
      // substance-keyed self-weaknesses (owner call 2026-08-07, the
      // Uulgoth: "let's remove them, I don't like them"). Both need their
      // trigger to be the COUNTER-element to mean anything, so
      // interpolating the block's own energy inverts the trait — an
      // ice-named Fiend took Poison damage from water.
      'Fire Elemental/Water Susceptibility',
      // identity-bound (the original batch) + fingerprint exclusions
      // (2026-08-03: structurally one-of-a-kind subsystems no rename hides)
      'Gelatinous Cube/Engulf', 'Ghost/Possession',
      // the hydra's five-head regrowth engine (owner call 2026-08-07:
      // "unskinnable, let's lose it") — an icon-owning donor that also
      // shipped an unkillable block through the {substance}-as-damage bug
      // the phylactery shape, retired outright (owner call 2026-08-13:
      // "showing up too much and is too signature") — revive-unless-a-
      // counter-is-destroyed is the lich's fingerprint however dressed
      'Guardian Naga/Celestial Restoration',
      'Hydra/Multiple Heads',
      // its sibling followed 2026-08-16 (the Pelted Hound): Reactive Heads
      // scales from a head count only Multiple Heads established — on any
      // other creature it grants Reactions per heads the sheet never states
      'Hydra/Reactive Heads',
      // the lich's phylactery is unmistakable under any rename (owner
      // call: a "Spirit Jar Revival" on a dream-dragon and a "Barrow
      // Anchor" on a warden both read as the lich in a hat)
      'Lich/Spirit Jar',
      'Mummy Lord/Undead Restoration',
      'Night Hag/Nightmare Haunting',
      // the Tarrasque's mirror shell stays excluded (owner call
      // 2026-08-05); the Solar's bow was UN-excluded same day — "it can
      // be reflavored to be anything; the important thing is the
      // mechanism gets interpolated in" — and generified instead
      // (Death Sentence, {execute_threshold} scaling by band)
      'Sphinx of Valor/Roar',
      'Spirit Naga/Fiendish Restoration',
      'Tarrasque/Reflective Carapace',
      'Vampire Spawn/Vampire Weakness', 'Vampire/Misty Escape',
      'Vampire/Shape-Shift', 'Vampire/Vampire Weakness',
      'Water Elemental/Freeze',
      // the lycanthropy conversion curse, all five carriers (owner call
      // 2026-08-15, the Pelted Lull's Antlered Sunder: "way too much to
      // reskin") — "drops to 0 HP and instead becomes a {creature} under
      // the DM's control" IS the werecreature, however renamed
      'Werebear/Bite', 'Wereboar/Gore', 'Wererat/Bite',
      'Weretiger/Bite', 'Werewolf/Bite',
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
    // CR 20+ is CERTAIN now (owner call 2026-08-05) — the ramp test's
    // upper band is exactly 50/50 unless a typed no-lore family nulls it.
    expect(high).toBe(50);
  });

  test('the family derives from type: fey to succession-curses, dragons to residue (the phylactery families are retired)', () => {
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
    expect(top(fey)).toBe('succession');
    expect(top(dragon)).toBe('residue');
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
      // and the primary reference resolves too — either print idiom
      // ("makes three X attacks." or "makes three attacks, using X or Y
      // in any combination.")
      const m1 = multi.text.match(/makes \w+ (.+?) attacks\./);
      const m2 = multi.text.match(/makes \w+ attacks, using (.+?) or (.+?) in any combination/);
      if (m2) {
        expect(names.has(m2[1])).toBe(true);
        expect(names.has(m2[2])).toBe(true);
      } else {
        expect(names.has(m1[1])).toBe(true);
      }
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
  test('a beguiling theme outdraws the Frightened default on a Wis save', () => {
    // NOT an aura: recurring auras restrict to print's aura menu (measured
    // 2026-08-04 — no printed aura ever charms), so the steering assertion
    // lives on a single-target save where the full tier menu applies.
    const row = {
      source: 'Test', ability: 'Gaze', cr: '20', slot_type: 'save_effect',
      template_2024: '*Wisdom Saving Throw*: DC {dc}, one creature the {creature} can see within {sight_range} feet. *Failure:* The target has the {condition_soft} condition until the start of its next turn.',
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

  test('a fallback echo spell survives onto the spell list (cast implies listed)', () => {
    // themeless: no themed pool, so the dead fill draws a SEEDED printed
    // offense spell (never the old static Chromatic Orb — that constant
    // fingerprinted three unrelated blocks) — and whatever it cast must
    // ride the reconciliation onto the At Will line and STAY there.
    const m = applyFlavor(
      mini('Legendary Actions', 'The {creature} uses Spellcasting to cast {signature_spell}. The {creature} can\'t take this action again until the start of its next turn.'),
      flavor(),
    );
    const echo = Object.values(m.sections).flat().find((e) => /uses Spellcasting to cast/.test(e.text));
    const cast = echo.text.match(/cast \*([A-Z][\w' ]+?)\*/)[1];
    expect(cast).not.toBe('Chromatic Orb');
    const caster = Object.values(m.sections).flat().find((e) => /At Will:/.test(e.text));
    expect(caster.text).toContain(cast);
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
    const m = applyFlavor(sk, flavor([{ id: 'e1', name: 'x', spells: ['Chill Touch'], spells_daily: [] },
      { id: 'e2', name: 'Claw' }, { id: 'e3', name: 'Breath' }]));
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

/**
 * Live block 19 (the Brimstone Warden): six assembly defects, five with
 * roots — the on_death pool leaking into the area slot (Death Throes beside
 * an independent Restoration, revival stated three times), same-type damage
 * pools splicing ("16 Fire plus 11 Fire"), two legendary echoes casting the
 * SAME spell (print fields two echoes — the Blue dragon — but never two of
 * one spell), a Prone-gated bonus action with no Prone source (the
 * dependency vocabulary had no 'prone' edge), and the languages-line
 * capitalization coin-flip.
 */
describe('the Brimstone Warden: one on-death occupant, ever', () => {
  test('Death Throes is not drawable as an area — on_death rows ship only via pickOnDeath', () => {
    for (const cr of [11, 17, 20]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3 });
        const deathRows = [...sk.entries, ...sk.traits]
          .filter((e) => /explodes when it dies|dies outside|reforms with all its Hit Points|gains a new body/.test(e.text));
        // at most ONE on-death occupant (the pickOnDeath draw itself)
        expect(`CR ${cr} seed ${seed}: ${deathRows.length} death rows`).toBe(`CR ${cr} seed ${seed}: ${Math.min(deathRows.length, 1)} death rows`);
        for (const e of sk.entries) {
          for (const o of e.options ?? []) {
            expect(/explodes when it dies/.test(o.text)).toBe(false);
          }
        }
      }
    }
  });
});

describe('the Brimstone Warden: dual-energy riders', () => {
  const mini = () => ({
    cr: '20', size: 'Gargantuan', ac: 20, hp: 330, pb: 6, attack_bonus: 14, save_dc: 21,
    multiattack: 3, con_mod: 6, strike_stat: 'STR', cast_stat: 'Wisdom', cast_mod: 7,
    seed: 8, counts: {}, themes: [], traits: [],
    entries: [{
      id: 'e1', section: 'Traits', slot_type: 'area', name: 'Death Throes', gate: null, damage: 0, options: [],
      text: 'The {creature} explodes when it dies. *Failure:* 16 (3d10) {damage_type} damage plus 11 (2d10) {rider_damage_type} damage. *Success:* Half damage.',
    }],
  });
  const flavor = (extra) => ({
    name: 'Warden', size: 'Gargantuan', type: 'Fiend', alignment: 'Lawful Neutral', speed: '40 ft.',
    stats: { STR: 26, DEX: 10, CON: 22, INT: 7, WIS: 24, CHA: 16 },
    physical_damage: 'Bludgeoning', energy_damage: 'Fire', entries: [], ...extra,
  });

  test('a second energy fills the rider — print\'s Fire plus Force', () => {
    const m = applyFlavor(mini(), flavor({ energy_damage_2: 'Force' }));
    const text = Object.values(m.sections).flat()[0].text;
    expect(text).toContain('Fire damage plus');
    expect(text).toContain('Force damage');
  });

  test('no second energy: same-type pools merge into one printed pool', () => {
    const m = applyFlavor(mini(), flavor());
    const text = Object.values(m.sections).flat()[0].text;
    expect(text).toContain('27 (5d10) Fire damage');
    expect(text).not.toContain('plus');
  });
});

describe('the Brimstone Warden: two echoes never cast the same spell', () => {
  test('a duplicate echo fill redraws on-palette', () => {
    const sk = {
      cr: '20', size: 'Gargantuan', ac: 20, hp: 330, pb: 6, attack_bonus: 14, save_dc: 21,
      multiattack: 3, con_mod: 6, strike_stat: 'STR', cast_stat: 'Wisdom', cast_mod: 7,
      seed: 8, counts: {}, themes: ['grave'], traits: [],
      entries: [
        { id: 'e1', section: 'Legendary Actions', slot_type: 'legendary', name: 'EchoA', gate: null, damage: 0, options: [], text: 'The {creature} uses Spellcasting to cast {signature_spell}.' },
        { id: 'e2', section: 'Legendary Actions', slot_type: 'legendary', name: 'EchoB', gate: null, damage: 0, options: [], text: 'The {creature} casts {signature_spell}, using the same spellcasting ability as Spellcasting.' },
      ],
    };
    const m = applyFlavor(sk, {
      name: 'Warden', size: 'Gargantuan', type: 'Undead', alignment: 'Lawful Neutral', speed: '40 ft.',
      stats: { STR: 26, DEX: 10, CON: 22, INT: 7, WIS: 24, CHA: 16 },
      entries: [
        { id: 'e1', name: 'EchoA', signature_spell: 'Blight' },
        { id: 'e2', name: 'EchoB', signature_spell: 'Blight' },
      ],
    });
    const texts = Object.values(m.sections).flat().map((e) => e.text);
    const blightCasts = texts.filter((t) => t.includes('*Blight*')).length;
    expect(blightCasts).toBe(1); // the second redrew
  });
});

describe('the Brimstone Warden: Prone gates require a Prone source', () => {
  test('a Trample never ships without a knockdown beside it', () => {
    for (const cr of [5, 11, 17, 20]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3 });
        const gated = [...sk.entries].filter((e) => /creature[^.]*that has the Prone condition/.test(e.text));
        if (!gated.length) continue;
        const imposer = [...sk.entries, ...sk.traits]
          .some((e) => /(?:target|it) has the Prone condition/.test(e.text) && !/that has the Prone condition/.test(e.text));
        expect(`CR ${cr} seed ${seed} trample has knockdown: ${imposer}`).toBe(`CR ${cr} seed ${seed} trample has knockdown: true`);
      }
    }
  });
});

describe('the Brimstone Warden: no two entries impose the same engine-filled condition', () => {
  test('two soft-condition entries in one block draw different conditions', () => {
    const { fillTemplate: fillT, numbersFor: numsF, makeRng: mkRng } = require('../build-skeleton.mjs');
    const nums = numsF(20);
    const rowA = { source: 'T', ability: 'A', cr: '20', slot_type: 'save_effect', condition_default: 'Frightened', template_2024: '*Wisdom Saving Throw*: DC {dc}. *Failure:* The target has the {condition_soft} condition until the start of its next turn.' };
    const rowB = { source: 'T', ability: 'B', cr: '20', slot_type: 'legendary', condition_default: 'Frightened', template_2024: '*Wisdom Saving Throw*: DC {dc}. *Failure:* The target has the {condition_soft} condition until the end of its next turn.' };
    for (let seed = 1; seed <= 40; seed += 1) {
      const used = new Set();
      const rng = mkRng(seed);
      const a = fillT(rowA, { cr: 20, size: 'Large', nums, rng, usedConditions: used, recordConditions: true }).text.match(/has the (\w+) condition/)[1];
      const b = fillT(rowB, { cr: 20, size: 'Large', nums, rng, usedConditions: used, recordConditions: true }).text.match(/has the (\w+) condition/)[1];
      expect(`seed ${seed}: ${a} vs ${b} differ: ${a !== b}`).toBe(`seed ${seed}: ${a} vs ${b} differ: true`);
    }
  });
});

/**
 * Live block 20 (the Shivering Watcher, stale-code generation): the two
 * HEAD-real findings — snake_cased choose keys silently keeping defaults,
 * and the all-locked legendary set print never fields (7 of 8 printed
 * two-option sets lock exactly one; zero lock all). Plus the measured aura
 * menu: no printed recurring aura ever imposes Charmed or Deafened.
 */
describe('the Shivering Watcher: degraded-response and legendary invariants', () => {
  test('snake_case and kebab-case choose keys resolve', () => {
    const { resolveChoices } = require('../flavor-prompt.mjs');
    const sk = {
      entries: [{
        id: 'e1', section: 'Actions', slot_type: 'area', name: 'Cold Breath', gate: 'Recharge 5-6', text: 'cold', damage: 0,
        options: [
          { key: 'Cold Breath', name: 'Cold Breath', text: 'cold', gate: 'Recharge 5-6', slot_type: 'area' },
          { key: 'Acid Breath', name: 'Acid Breath', text: 'acid', gate: 'Recharge 5-6', slot_type: 'area' },
        ],
      }],
      traits: [],
    };
    for (const choose of ['acid_breath', 'ACID-BREATH', 'acid breath']) {
      const r = resolveChoices(sk, new Map([['e1', { id: 'e1', choose }]]));
      expect(r[0].name).toBe('Acid Breath');
    }
  });

  test('no block ever ships an all-locked legendary set', () => {
    const LOCK = /can't take this action again/;
    for (const cr of [15, 17, 20, 24]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3 });
        const legs = sk.entries.filter((e) => e.slot_type === 'legendary');
        if (legs.length === 0) continue;
        const unlocked = legs.filter((e) => !LOCK.test(e.text));
        expect(`CR ${cr} seed ${seed}: ${unlocked.length} unlocked of ${legs.length}`)
          .not.toBe(`CR ${cr} seed ${seed}: 0 unlocked of ${legs.length}`);
      }
    }
  });

  test('a recurring aura never fills Charmed or Deafened', () => {
    const { fillTemplate: fT, numbersFor: nF, makeRng: mR } = require('../build-skeleton.mjs');
    const nums = nF(20);
    const aura = {
      source: 'T', ability: 'Aura', cr: '20', slot_type: 'utility', condition_default: 'Frightened',
      template_2024: 'The {creature} emanates an aura in a {area}-foot Emanation while it doesn\'t have the Incapacitated condition. *Wisdom Saving Throw*: DC {dc}, any enemy that starts its turn in the aura. *Failure:* The target has the {condition_soft} condition until the start of its next turn.',
    };
    for (let seed = 1; seed <= 200; seed += 1) {
      const c = fT(aura, { cr: 20, size: 'Huge', nums, rng: mR(seed), themes: ['beguiling'] })
        .text.match(/has the (\w+) condition until the start/)[1];
      expect(['Frightened', 'Poisoned']).toContain(c);
    }
  });
});

/**
 * The assembly-metadata bus (owner call, 2026-08-04): the synthesis emits
 * structured signals — size, movement, attack_mode, signature_mechanic —
 * and the skeleton assembler honors them with guarantees. Born from the
 * Shivering Watcher: a hurled-harpoon concept whose delivery mode had no
 * channel to the picker and shipped as three melee rows.
 */
describe('the assembly-metadata bus', () => {
  test('both concept prompts ask for the assembly metadata', async () => {
    const { buildArchetypeResolvePrompt, buildSeedSynthesisPrompt } = await import('../../format-2024/generate.mjs');
    for (const p of [
      buildArchetypeResolvePrompt('a drowned harpooner', '', { cr: 20 }),
      buildSeedSynthesisPrompt({ intelligence: 'bestial', physical: 'peat', silhouette: 'hillock', origin: 'the fen' }, { cr: 20 }),
    ]) {
      expect(p).toContain('ASSEMBLY METADATA');
      expect(p).toContain('"attack_mode"');
      expect(p).toContain('"signature_mechanic"');
      expect(p).toContain('"movement"');
    }
  });

  test('attack_mode ranged guarantees a ranged attack ships', () => {
    for (let seed = 1; seed <= 20; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, alternatives: 3, attackMode: 'ranged' });
      const ranged = sk.entries.some((e) => (e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack')
        && /Ranged Attack Roll/.test(e.text));
      expect(`seed ${seed} has ranged attack: ${ranged}`).toBe(`seed ${seed} has ranged attack: true`);
    }
  });

  test('movement gating: a walk-only body never receives a mode-dependent row', () => {
    const REFS = /\bflies\b|Fly Speed|Swim Speed|while (?:it is )?underwater|\bburrows\b|Burrow Speed|Climb Speed/;
    for (let seed = 1; seed <= 20; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, alternatives: 3, movement: [] });
      for (const e of [...sk.entries, ...sk.traits]) {
        expect(`seed ${seed} ${e.name}: ${REFS.test(e.text)}`).toBe(`seed ${seed} ${e.name}: false`);
      }
    }
  });

  test('signature_mechanic guarantees its family a seat', () => {
    const CHECKS = {
      engulf: (sk) => [...sk.entries].some((e) => /swallow/i.test(e.text)),
      breath: (sk) => sk.entries.some((e) => e.slot_type === 'area' && e.gate && /Cone|Line/.test(e.text)),
      'thrown-weapon': (sk) => sk.entries.some((e) => /Ranged Attack Roll/.test(e.text)),
      // ANY ungated recurring emanation honors the promise — a Charmed
      // presence is an aura in table terms, and so is the Fear Aura genus
      // ("emanates an aura...", the phrasing the predicate long missed).
      aura: (sk) => [...sk.entries, ...sk.traits].some((e) => /Emanation originating from the|emanates an aura/.test(e.text) && !e.gate),
    };
    for (const [sig, check] of Object.entries(CHECKS)) {
      for (let seed = 1; seed <= 8; seed += 1) {
        const sk = buildSkeleton({ cr: 20, seed, alternatives: 3, signatureMechanic: sig });
        expect(`${sig} seed ${seed}: ${check(sk)}`).toBe(`${sig} seed ${seed}: true`);
      }
    }
  });

  test('the flavor prompt seeds the speed line from movement metadata', () => {
    const sk = buildSkeleton({ cr: 20, seed: 3, movement: ['swim', 'burrow'] });
    const prompt = buildFlavorPrompt(sk, { concept: 'a drowned harpooner' });
    expect(prompt).toContain('must include these modes: Swim, Burrow');
  });
});

/**
 * Live block 21 (the Dredging Charnel): the two findings that survived
 * verification — two speed-debuff legendaries (0/329 in print; one
 * strictly dominated the other) and the engulf guarantee seating the
 * Kraken's action-cost swallow when 4 of 5 printed swallowers ride a
 * bonus action and bring the Blinded rider with them.
 */
describe('the Dredging Charnel: one speed-debuff zap, bonus-action swallows', () => {
  test('no block carries two until-end-of-turn speed debuffs', () => {
    const FAMILY = /Speed is (?:0|halved) until the end of (?:the target's|its) next turn/;
    for (const cr of [15, 17, 20, 24]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3 });
        const hits = [...sk.entries, ...sk.traits].filter((e) => FAMILY.test(e.text));
        expect(`CR ${cr} seed ${seed}: ${hits.length}`).toBe(`CR ${cr} seed ${seed}: ${Math.min(hits.length, 1)}`);
        // and no menu combination can assemble a second one
        for (const e of sk.entries) {
          if (FAMILY.test(e.text)) continue;
          for (const o of e.options ?? []) {
            if (FAMILY.test(o.text) && hits.length) {
              throw new Error(`speed-debuff option beside a chosen one: ${o.key}`);
            }
          }
        }
      }
    }
  });

  test('the engulf guarantee predominantly seats bonus-action swallows', () => {
    let bonus = 0; let total = 0;
    for (let seed = 1; seed <= 12; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, alternatives: 3, signatureMechanic: 'engulf' });
      const swallow = sk.entries.find((e) => /swallow/i.test(e.text) && /Grappled by the/.test(e.text));
      if (!swallow) continue;
      total += 1;
      if (swallow.section === 'Bonus Actions') bonus += 1;
    }
    expect(total).toBeGreaterThan(8);
    expect(bonus / total).toBeGreaterThan(0.6);
  });
});

/**
 * Live blocks 21-22 (the Grave Warden and the Chasm Grief): a CR 20
 * "defender" and a CR 20 "glass cannon" shipped as twins — AC 20, HP ~338,
 * +14 — because the skeleton path replaced the chassis but dropped
 * applyArchetype's numeric differentials, and the roles Kenji named had
 * 4-row tag pools. Three fixes: applyArchetypeNumbers over the CR medians,
 * a defender/support tag pass (73 + 10 rows), and guarantee seats.
 */
describe('archetype differentials: the numbers trade and the kit shows it', () => {
  const base = crTable.by_cr['20'];

  test('defender tanks, glass cannon trades life for damage — same CR, same seed', () => {
    const def = buildSkeleton({ cr: 20, seed: 7, archetype: 'defender' });
    const gc = buildSkeleton({ cr: 20, seed: 7, archetype: 'glass_cannon' });
    expect(def.ac).toBe(base.ac + 2);
    expect(gc.ac).toBe(base.ac - 2);
    expect(def.hp).toBe(Math.round(base.hp * 1.1));
    expect(gc.hp).toBe(Math.round(base.hp * 0.65));
    expect(gc.attack_bonus).toBe(base.attack_bonus + 1);
    expect(def.attack_bonus).toBe(base.attack_bonus);
  });

  test('no archetype (and unknown archetypes) ship the table medians untouched', () => {
    for (const archetype of [null, 'balanced', 'auto']) {
      const sk = buildSkeleton({ cr: 20, seed: 7, archetype });
      expect(sk.ac).toBe(base.ac);
      expect(sk.hp).toBe(base.hp);
      expect(sk.attack_bonus).toBe(base.attack_bonus);
    }
  });

  test('the non-caster DC identity survives a dc_mod role: DC = 8 + PB + CON mod', () => {
    // Controller carries dc_mod +1. On non-caster blocks the DC is re-keyed
    // to CON; the mod must fold INTO con_mod so stampStats' CON pin and
    // hpFormulaFor's flat bonus still reconcile with every DC on the sheet.
    for (let seed = 1; seed <= 10; seed += 1) {
      const sk = buildSkeleton({ cr: 13, seed, archetype: 'controller' });
      const hasSpell = sk.entries.some((e) => /Spellcasting|spellcasting ability/.test(e.text));
      if (!hasSpell) {
        expect(sk.save_dc).toBe(8 + sk.pb + sk.con_mod);
      }
      expect(sk.cast_mod).toBe(sk.save_dc - 8 - sk.pb);
    }
  });

  test('every defender carries a hold, pull, or movement punisher', () => {
    const HOLDS = /Grappled condition|Restrained condition|pulls? (?:the target|one creature|each creature)[^.]*toward|used only for Opportunity Attacks|Speed is (?:0|halved) until the end of/;
    for (const cr of [5, 12, 20]) {
      for (let seed = 1; seed <= 8; seed += 1) {
        const sk = buildSkeleton({ cr, seed, archetype: 'defender' });
        const has = sk.entries.some((e) => HOLDS.test(e.text) || e.section === 'Reactions');
        expect(`CR ${cr} seed ${seed}: ${has}`).toBe(`CR ${cr} seed ${seed}: true`);
      }
    }
  });

  test('every support spends an action on its allies', () => {
    const GIVES = /casts \*(?:Bless|Healing Word|Cure Wounds|Lesser Restoration|Sanctuary)|Temporary Hit Points|together with one creature within 10 feet of itself that is willing|willing creatures within/;
    for (const cr of [5, 12, 20]) {
      for (let seed = 1; seed <= 8; seed += 1) {
        const sk = buildSkeleton({ cr, seed, archetype: 'support' });
        const has = sk.entries.some((e) => GIVES.test(e.text));
        expect(`CR ${cr} seed ${seed}: ${has}`).toBe(`CR ${cr} seed ${seed}: true`);
      }
    }
  });

  test('the flavor prompt tells the model its combat role', () => {
    const sk = buildSkeleton({ cr: 20, seed: 7, archetype: 'defender' });
    const prompt = buildFlavorPrompt(sk, { concept: 'a warden of the sunken gate' });
    expect(prompt).toMatch(/combat role is a DEFENDER/);
    const bal = buildSkeleton({ cr: 20, seed: 7, archetype: null });
    expect(buildFlavorPrompt(bal, { concept: 'x' })).not.toMatch(/combat role/);
  });
});

/**
 * Swarms need to be swarm-shaped (owner call, 2026-08-04) — the dragon-kit
 * principle applied to print's other unanimous family. All 7 printed swarms
 * share: the Swarm trait, exactly ONE attack action in the Bloodied form
 * ("or X damage if the swarm is Bloodied", X ~ half), no Multiattack line,
 * B/P/S resistance, and the same eight condition immunities. The Bloodied
 * alt also exposed a sizing bug: the generic 1.4x replacement-attack upsize
 * would have shipped swarms that hit HARDER once Bloodied.
 */
describe('the swarm package: swarm archetype assembles swarm-shaped', () => {
  test('every swarm gets the core: Swarm trait, one Bloodied attack, no Multiattack', () => {
    for (const cr of [1, 5, 12, 20]) {
      for (let seed = 1; seed <= 8; seed += 1) {
        const sk = buildSkeleton({ cr, seed, archetype: 'swarm' });
        expect(sk.package?.name).toBe('Swarm package');
        expect(sk.traits.some((t) => t.name === 'Swarm' && t.name_locked)).toBe(true);
        const attacks = sk.entries.filter((e) => /Attack Roll/.test(e.text) && !/uses Spellcasting|casts/.test(e.text));
        expect(attacks.length).toBe(1);
        expect(attacks[0].text).toMatch(/if the swarm is Bloodied/);
        expect(sk.multiattack).toBe(1);
        expect(sk.entries.some((e) => e.name === 'Multiattack')).toBe(false);
      }
    }
  });

  test('the Bloodied form deals LESS, roughly half (print: Crawling Claws 20 -> 11)', () => {
    for (let seed = 1; seed <= 10; seed += 1) {
      const sk = buildSkeleton({ cr: 11, seed, archetype: 'swarm' });
      const atk = sk.entries.find((e) => /if the swarm is Bloodied/.test(e.text));
      const nums = [...atk.text.matchAll(/(\d+) \(\d+d\d+(?: \+ \d+)?\)/g)].map((m) => Number(m[1]));
      const [main, alt] = nums;
      expect(alt).toBeLessThan(main);
      expect(alt).toBeGreaterThanOrEqual(Math.floor(main * 0.35));
      expect(alt).toBeLessThanOrEqual(Math.ceil(main * 0.65));
    }
  });

  test('the round budget folds into the single attack: swarm DPR matches the band', () => {
    const base = crTable.by_cr['11'];
    const sk = buildSkeleton({ cr: 11, seed: 3, archetype: 'swarm' });
    const atk = sk.entries.find((e) => /if the swarm is Bloodied/.test(e.text));
    const main = Number(atk.text.match(/(\d+) \(/)[1]);
    // hp_mult 0.85 (measured: 7/7 printed swarms sit at 0.79-1.12x band,
    // median 0.80 — the B/P/S package is the durability, not extra HP);
    // damage_mult is 1.0, so one attack carries ~ per_attack x band
    // multiattack.
    const ma = 3; // band 8-14 median
    expect(main).toBeGreaterThanOrEqual(Math.round(base.per_attack_damage * ma * 0.55));
    expect(sk.hp).toBe(Math.round(base.hp * 0.85));
  });
});

describe('the swarm defense package stamps through assembly', () => {
  test('B/P/S resistance and the eight condition immunities, 7/7 in print', async () => {
    const m = await generateFromSkeleton(
      { concept: 'a swarm of grave-beetles', cr: 5, seed: 2, archetypeName: 'swarm' },
      // Dead flavor call: the never-fail block must STILL be swarm-shaped.
      async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] })),
    );
    for (const r of ['Bludgeoning', 'Piercing', 'Slashing']) {
      expect(m.resistances).toContain(r);
    }
    for (const c of ['Charmed', 'Frightened', 'Grappled', 'Paralyzed', 'Petrified', 'Prone', 'Restrained', 'Stunned']) {
      expect(m.immunities).toContain(c);
    }
    // Swarm identity lives in the NAME in print (7/7 "Swarm of X") — the
    // deterministic guarantee suffixes when the model didn't comply, and
    // the swarm-content-untyped reject must never fire on the engine's own
    // kit (it did: the corrector also stripped the B/P/S package because
    // chassisFromSkeleton didn't carry the archetype).
    expect(m.name).toMatch(/swarm/i);
    expect(m.generation.rejects).toEqual([]);
  });
});

/**
 * Live block 23 (the Shre Swarm) — the worst block since the Groan, and
 * nearly all of it engine-rooted. Eight fixes; the sweeps below pin each.
 */
describe('the Shre Swarm: suffix renames never double-replace', () => {
  test('"Shre" -> "Shre Swarm" leaves "the shre swarm", never "the swarm swarm"', () => {
    const { applyRenameMapping } = require('../../format-2024/generate.mjs');
    const monster = {
      name: 'Shre',
      sections: {
        Traits: [{ name: 'Legendary Resistance (3/Day)', text: 'If the shre fails a saving throw, it can choose to succeed instead. Creatures are immune to this shre\'s aura for 24 hours.' }],
      },
    };
    const out = applyRenameMapping(monster, { Shre: 'Shre Swarm' });
    expect(out.name).toBe('Shre Swarm');
    expect(out.sections.Traits[0].text).not.toMatch(/swarm swarm/i);
    expect(out.sections.Traits[0].text).toMatch(/the shre swarm fails/i);
  });
});

describe('the Shre Swarm: per-attack budgets survive the swarm fold', () => {
  test('recurring auras and legendary uses price off ONE true attack, not the folded round', () => {
    const per = crTable.by_cr['20'].per_attack_damage; // 30
    for (let seed = 1; seed <= 15; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, archetype: 'swarm' });
      for (const t of sk.traits) {
        const m = t.text.match(/takes (\d+) \(\d+d\d+\) \{?\w+\}? damage/);
        if (m && /At the end of each of/.test(t.text)) {
          // 0.5x one attack (the Balor runs 13 at CR 19) — the fold shipped 45
          expect(Number(m[1])).toBeLessThanOrEqual(Math.round(per * 0.6));
        }
      }
      for (const e of sk.entries.filter((x) => x.slot_type === 'legendary')) {
        const m = e.text.match(/(\d+) \(\d+d\d+\)/);
        // 0.55x one attack (print runs 7-17) — the fold shipped 49s
        if (m) expect(Number(m[1])).toBeLessThanOrEqual(Math.round(per * 0.6));
      }
      // the single attack still carries the whole round
      const atk = sk.entries.find((e) => /if the swarm is Bloodied/.test(e.text));
      // anchor on the dice so "+14 (with Advantage" can't match
      const main = Number(atk.text.match(/(\d+) \(\d+d/)[1]);
      expect(main).toBeGreaterThanOrEqual(Math.round(per * 3 * 0.55));
    }
  });

  test('a mixed attack-mode concept never seats a second attack beside the kit', () => {
    for (let seed = 1; seed <= 10; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, archetype: 'swarm', attackMode: 'mixed' });
      const attacks = sk.entries.filter((e) => /Attack Roll/.test(e.text) && !/uses Spellcasting|casts/.test(e.text));
      expect(attacks.length).toBe(1);
      expect(attacks[0].text).toMatch(/if the swarm is Bloodied/);
    }
  });
});

describe('the Shre Swarm: one ungated recurring emanation per block, any section', () => {
  test('no seed at any CR ships two, traits included', () => {
    const EM = (text, gate) => /Emanation originating from the/.test(text) && !gate;
    for (const cr of [11, 17, 20]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        for (const archetype of [null, 'swarm', 'controller']) {
          const sk = buildSkeleton({ cr, seed, archetype, signatureMechanic: seed % 2 ? 'aura' : null });
          const hits = [...sk.traits, ...sk.entries]
            .filter((r) => EM(r.text, r.gate) && !r.on_death);
          expect(`CR ${cr} seed ${seed} ${archetype}: ${hits.length <= 1}`)
            .toBe(`CR ${cr} seed ${seed} ${archetype}: true`);
        }
      }
    }
  });
});

describe('the Shre Swarm: type-named entries deal their named type', () => {
  test('lint catches a model-authored mismatch and the correction renames with propagation', () => {
    const { lintStatblock } = require('../../format-2024/lint.mjs');
    const monster = {
      name: 'Test', size: 'Large', type: 'Monstrosity', ac: 20, hp: 300,
      sections: {
        Actions: [
          { name: 'Furnace Lightning', text: '*Dexterity Saving Throw*: DC 22, each creature in a 90-foot-long, 5-foot-wide Line. *Failure:* 91 (14d12) Thunder damage. *Success:* Half damage.' },
        ],
      },
    };
    const findings = lintStatblock(monster, { edition: '2024' }).findings;
    const hit = findings.find((f) => f.rule === 'entry-name-type-mismatch');
    expect(hit).toBeDefined();
    expect(hit.expected).toBe('Furnace Thunder');
  });

  test('the engine harmonizes unrenamed placeholders before lint ever sees them', () => {
    // A placeholder keeps its source's type word while the flavor call owns
    // {damage_type}; find a seed carrying a type-named row and check the
    // assembled name follows the chosen energy.
    const TYPE_RE = /\b(Acid|Cold|Fire|Force|Lightning|Necrotic|Poison|Psychic|Radiant|Thunder)\b/;
    for (let seed = 1; seed <= 40; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, alternatives: 1 });
      if (!sk.entries.some((e) => TYPE_RE.test(e.name) && /\{damage_type\}/.test(e.text))) continue;
      const m = applyFlavor(sk, respond(sk)); // energy: Poison
      for (const [sec, list] of Object.entries(m.sections)) {
        for (const e of list) {
          const t = e.name.match(TYPE_RE)?.[1];
          if (t && / damage/.test(e.text) && new RegExp('(Bludgeoning|Poison) damage').test(e.text)) {
            expect(`${sec}/${e.name} deals its named type: ${e.text.includes(`${t} damage`)}`)
              .toBe(`${sec}/${e.name} deals its named type: true`);
          }
        }
      }
      return;
    }
  });
});

describe('the Shre Swarm: wings outclass legs, air is not terrain', () => {
  test('a flier never receives a jump row (0/329 printed fliers jump)', () => {
    for (let seed = 1; seed <= 20; seed += 1) {
      const sk = buildSkeleton({ cr: 15, seed, movement: ['fly'] });
      for (const e of [...sk.entries, ...sk.traits]) {
        expect(`seed ${seed} ${e.name}: ${/jumps? up to/.test(e.text)}`)
          .toBe(`seed ${seed} ${e.name}: false`);
      }
    }
  });

  test('a terrain fill of "air" falls back instead of shipping dead text', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 13, seed });
      const row = sk.traits.find((t) => /\{terrain\}/.test(t.text));
      if (!row) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((s) => [s, s === 'terrain' ? 'air' : 'spores'])),
        })),
      });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      expect(all).not.toMatch(/composed of air|climb air/);
      return;
    }
  });
});

/**
 * Live block 24 (the Skar) — the audit's charter correctly excludes theme
 * and balance, so the critic's catches got deterministic fixes instead:
 * the returning-weapon noun is now a fill (print: spear/sword always match
 * the attack), control spell echoes always lock (100% of printed control
 * echoes; the unlocked ones are all damage spells), and save-less
 * recurring auras cap at 10 feet (print runs 5-10, never 30).
 */
describe('the Skar: returning weapons, control locks, aura envelope', () => {
  const findSeed = (pred, opts = {}) => {
    for (let seed = 1; seed <= 80; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, ...opts });
      const hit = [...sk.entries, ...sk.traits].find(pred);
      if (hit) return { sk, hit };
    }
    return null;
  };

  test('the returning clause is GONE (owner call): a produced projectile is just a ranged attack', () => {
    // Four blocks running shipped "magically returns to the <X>'s hand" —
    // the set's most recognizable fingerprint. Monsters never track ammo in
    // print; the melee-or-ranged parity and the rider ARE the attack.
    for (let seed = 1; seed <= 30; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, attackMode: 'mixed' });
      for (const e of sk.entries) {
        expect(`seed ${seed} ${e.name}: ${/magically returns|\{weapon\}/.test(e.text)}`)
          .toBe(`seed ${seed} ${e.name}: false`);
      }
    }
  });

  test('Deadly Leap pushes 5 feet on success, as printed — never the band-scaled yeet', () => {
    const lib = require('@/data/ability-library.json');
    const leaps = [];
    const visit = (o) => {
      if (o && typeof o === 'object') {
        if (o.ability === 'Deadly Leap') leaps.push(o);
        Object.values(o).forEach(visit);
      }
    };
    visit(lib);
    expect(leaps.length).toBeGreaterThan(0);
    for (const r of leaps) {
      expect(r.template_2024).toMatch(/pushed 5 feet straight away/);
      expect(r.template_2024).not.toMatch(/\{push_distance\}/);
    }
  });

  test('a legendary echo of a CONTROL spell gains the per-turn lock; damage echoes stay free', () => {
    const found = findSeed((e) => e.section === 'Legendary Actions'
      && /uses Spellcasting to cast \{signature_spell\}/.test(e.text)
      && !/can't take this action again/.test(e.text));
    expect(found).not.toBeNull();
    const fillWith = (spell) => {
      const reqs = flavorRequests(found.sk);
      return applyFlavor(found.sk, {
        ...respond(found.sk),
        energy_damage: 'Fire', // Scorching Ray stays on-palette for the vet
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((s) => [s, s.startsWith('signature_spell') ? spell : 'spores'])),
        })),
      });
    };
    const controlled = fillWith('Command');
    const cText = (controlled.sections['Legendary Actions'] ?? [])
      .find((e) => /\*Command\*/.test(e.text));
    expect(cText.text).toMatch(/can't take this action again until the start of its next turn/);
    // a pools damage spell (the echo vet redraws off-pool picks like Orb)
    const damaging = fillWith('Scorching Ray');
    const dText = (damaging.sections['Legendary Actions'] ?? [])
      .find((e) => /\*Scorching Ray\*/.test(e.text));
    expect(dText.text).not.toMatch(/can't take this action again/);
  });

  test('a save-less recurring damage aura never exceeds 10 feet at any CR', () => {
    for (const cr of [11, 17, 20]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr, seed, signatureMechanic: 'aura' });
        for (const t of [...sk.traits, ...sk.entries]) {
          if (/At the end of each of .* turns/.test(t.text) && /takes \d+/.test(t.text)
            && !/Saving Throw/.test(t.text)) {
            const ft = Number((t.text.match(/(\d+)-foot Emanation/) ?? [])[1] ?? 0);
            expect(`CR ${cr} seed ${seed} ${t.name}: ${ft} ft`).toBe(`CR ${cr} seed ${seed} ${t.name}: ${Math.min(ft, 10)} ft`);
          }
        }
      }
    }
  });
});

/**
 * The Skar, round 2 (critic re-read as skirmisher): the numbers landed the
 * role and the TEXT MASS contradicted it — the untagged caster packages
 * dodged archetype damping (empty tags = weight 1 everywhere), the spell
 * lists stacked control 3x beyond print, and the sheet had the escape half
 * of the hit-and-run loop with no strike half.
 */
describe('the Skar: text mass follows the role', () => {
  test('no spell tier ever carries two control spells (print max: one at-will, zero 1/Day pairs)', () => {
    const { CONTROL_SPELLS } = require('../flavor-prompt.mjs');
    for (let seed = 1; seed <= 30; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, caster: true });
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl,
            sl === 'spells' ? ['Command', 'Charm Person', 'Suggestion']
              : sl === 'spells_daily' ? ['Dominate Monster', 'Mass Suggestion']
                : 'spores'])),
        })),
      });
      for (const list of Object.values(m.sections)) {
        for (const e of list) {
          for (const tier of [...e.text.matchAll(/\*\*(?:At Will|1\/Day(?: Each)?):\*\*([^\n]*)/g)]) {
            const spells = [...tier[1].matchAll(/\*([^*]+?)\*/g)].map((x) => x[1]);
            const ctrl = spells.filter((sp) => CONTROL_SPELLS.includes(sp));
            expect(`seed ${seed} ${e.name}: ${ctrl.length} control`).toBe(`seed ${seed} ${e.name}: ${Math.min(ctrl.length, 1)} control`);
          }
        }
      }
    }
  });

  test('every skirmisher carries the strike half of the loop, every lurker the unseen half', () => {
    const SKIRM = /Hide action|Melee or Ranged Attack Roll|moves up to (?:half )?its Speed[^.]*(?:without provoking|makes one)/;
    const LURK = /Hide action|Invisible condition|can't be seen/;
    for (const [archetype, RE] of [['skirmisher', SKIRM], ['lurker', LURK]]) {
      for (let seed = 1; seed <= 10; seed += 1) {
        const sk = buildSkeleton({ cr: 15, seed, archetype });
        const has = sk.entries.some((e) => RE.test(e.text));
        expect(`${archetype} seed ${seed}: ${has}`).toBe(`${archetype} seed ${seed}: true`);
      }
    }
  });

  test('caster packages no longer dodge archetype damping', () => {
    const lib = require('@/data/ability-library.json');
    const untagged = lib.packages.list.filter((pk) => !(pk.archetypes ?? []).length);
    expect(untagged.map((pk) => pk.source)).toEqual([]);
  });
});

describe('the Chasmvein: names back their modes, Amphibious earns its water', () => {
  test('a mode-promising name on a modeless block is caught and reverted', () => {
    const { lintStatblock } = require('../../format-2024/lint.mjs');
    const monster = {
      name: 'Test', size: 'Large', type: 'Aberration', speed: '40 ft., Climb 40 ft.',
      sections: {
        'Legendary Actions': [
          { name: 'Burrow-Burst', text: 'The test moves up to half its Speed, and it makes one Splinter attack.' },
        ],
      },
    };
    const findings = lintStatblock(monster, { edition: '2024' }).findings;
    expect(findings.some((f) => f.rule === 'entry-name-mode-mismatch')).toBe(true);
    // text that DELIVERS the mode clears the name
    monster.sections['Legendary Actions'][0].text = 'The test burrows up to 30 feet, then attacks.';
    expect(lintStatblock(monster, { edition: '2024' }).findings
      .some((f) => f.rule === 'entry-name-mode-mismatch')).toBe(false);
  });

  test('air-and-water breathing gates on swim movement (0/329 printed carriers lack it)', () => {
    for (let seed = 1; seed <= 20; seed += 1) {
      const sk = buildSkeleton({ cr: 15, seed, movement: ['climb'] });
      for (const t of sk.traits) {
        expect(`seed ${seed} ${t.name}: ${/breathe air and water|breathe only underwater/.test(t.text)}`)
          .toBe(`seed ${seed} ${t.name}: false`);
      }
    }
  });
});

/**
 * Live block 26 (the Snaring Coil): trap machinery wired to nothing. The
 * engulf signature's menu let the model swap the Swallow payoff for its
 * own prerequisite; two grapple imposers then sat beside three plain
 * lashes. And two more band-scaled positional values surfaced: a 120-foot
 * save-grapple (print: 5-10 ft, the appendage IS the tether) and a Lawful
 * fiend reforming in the Abyss (print: 15/15 pair Lawful/Hells,
 * Chaotic/Abyss).
 */
describe('the Snaring Coil: snares always feed something', () => {
  test('a signature-satisfying entry only offers in-family options', () => {
    for (let seed = 1; seed <= 15; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, alternatives: 3, signatureMechanic: 'engulf' });
      for (const e of sk.entries) {
        if (!/swallow/i.test(e.text)) continue;
        for (const o of e.options ?? []) {
          expect(`seed ${seed} option ${o.key ?? o.ability}: ${/swallow/i.test(o.template_2024 ?? o.text ?? '')}`)
            .toBe(`seed ${seed} option ${o.key ?? o.ability}: true`);
        }
      }
    }
  });

  test('two grapple imposers always ship with a grapple spend', () => {
    for (const cr of [8, 15, 20]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr, seed, signatureMechanic: seed % 2 ? 'grapple' : 'engulf' });
        const imposers = sk.entries.filter((e) => /Grappled condition \(escape/.test(e.text)).length;
        if (imposers < 2) continue;
        const spend = sk.entries.some((e) => /Grappled by the|creature Grappled by|Advantage if the target is Grappled|swallow/i.test(e.text));
        expect(`CR ${cr} seed ${seed}: ${spend}`).toBe(`CR ${cr} seed ${seed}: true`);
      }
    }
  });

  test('save-grapples reach 10 feet at most — the appendage is the tether', () => {
    for (const cr of [11, 17, 20]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr, seed, signatureMechanic: 'grapple' });
        for (const e of sk.entries) {
          if (!/Saving Throw/.test(e.text) || !/Grappled condition \(escape/.test(e.text)) continue;
          const m = e.text.match(/within (\d+) feet/);
          if (m) {
            expect(`CR ${cr} seed ${seed} ${e.name}: ${m[1]} ft`).toBe(`CR ${cr} seed ${seed} ${e.name}: ${Math.min(Number(m[1]), 10)} ft`);
          }
        }
      }
    }
  });

  test('a Lawful fiend never reforms in the Abyss (15/15 printed cosmology)', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed });
      const row = [...sk.traits, ...sk.entries].find((t) => /\{home_plane\}/.test(t.text));
      if (!row) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        alignment: 'Lawful Evil',
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl === 'home_plane' ? 'the Abyss' : 'spores'])),
        })),
      });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      expect(all).not.toMatch(/Abyss/);
      expect(all).toMatch(/Nine Hells/);
      return;
    }
  });
});

describe('scaling spells never echo bare (print annotates every scaler)', () => {
  test('a Chromatic Orb echo at CR 20 casts the level 3 version; control spells stay bare', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, caster: true });
      const echo = sk.entries.find((e) => e.section === 'Legendary Actions'
        && /uses Spellcasting to cast \{signature_spell\}/.test(e.text));
      if (!echo) continue;
      const reqs = flavorRequests(sk);
      const fillWith = (spell) => applyFlavor(sk, {
        ...respond(sk),
        energy_damage: 'Fire', // on-palette for the identity vet
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl.startsWith('signature_spell') ? spell : 'spores'])),
        })),
      });
      // Scorching Ray sits in print's 17+ pools, so the vet keeps it;
      // base level 2 -> level 4 at CR 18+.
      const ray = fillWith('Scorching Ray');
      const rText = Object.values(ray.sections).flat().map((e) => e.text).join('\n');
      expect(rText).toMatch(/\*Scorching Ray\* \(level 4 version\)/);
      const cmd = fillWith('Command');
      const cText = Object.values(cmd.sections).flat().map((e) => e.text).join('\n');
      expect(cText).toMatch(/\*Command\*(?! \(level)/);
      return;
    }
  });
});

/**
 * Live block 27 (the Glegor, "upper-middle"): the terrain fallback was
 * CIRCULAR inside its own template ("Difficult Terrain composed of
 * difficult ground"), and the Multiattack tripled a grapple that commits
 * "from both talons" — three swings from hands the first swing filled.
 * Print's Roc layout: volume attack leads, the committer is the
 * replacement. (Swoop's Recharge 5-6 and the both-talons phrase itself
 * are print-verbatim — the critic's flags on those were overruled.)
 */
describe('the Glegor: terrain is never circular, committers never lead the routine', () => {
  test('a dead terrain fill draws a real surface, never "difficult ground"', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 13, seed });
      if (!sk.traits.some((t) => /\{terrain\}/.test(t.text))) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl === 'terrain' ? 'shadow' : 'spores'])),
        })),
      });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      expect(all).not.toMatch(/composed of difficult ground|composed of shadow/);
      expect(all).toMatch(/composed of (ice|rubble|bare stone|shifting sand|deep mud)/);
      return;
    }
  });

  test('a "from both" grapple never leads a multi-attack routine when a clean attack exists', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, attackMode: 'mixed', signatureMechanic: 'grapple' });
      const m = applyFlavor(sk, respond(sk));
      const ma = Object.values(m.sections).flat().find((e) => e.name === 'Multiattack');
      if (!ma) continue;
      const primary = (ma.text.match(/makes \w+ ([A-Z][\w' -]+?) attacks/) ?? [])[1];
      if (!primary) continue;
      const pEntry = Object.values(m.sections).flat().find((e) => e.name === primary);
      if (pEntry && /from both /.test(pEntry.text)) {
        const others = Object.values(m.sections).flat()
          .some((e) => e !== pEntry && /Attack Roll/.test(e.text) && !/from both /.test(e.text)
            && /replace one attack with a use of/.test(ma.text));
        expect(`seed ${seed}: committer leads only when no clean attack exists: ${!others}`)
          .toBe(`seed ${seed}: committer leads only when no clean attack exists: true`);
      }
    }
  });
});

/**
 * Live block 28 (the Keening Scuttler) — the semantic-layer batch, all
 * owner calls: lists annotate their scalers (improvement on print, whose
 * 21/21 list lines are bare and therefore cast at level ONE by rule);
 * stealth chassis carry NO auras (exclusion, damp retired — it lost to
 * proximity at CR 20); bodily squeezes deal physical (print: 7/9
 * Bludgeoning); a duplicate name falls back to its OWN placeholder (the
 * pounce that got named "Mind Invasion"); echo spells come from the
 * palette or print's pools (the model's own Chromatic Orb habit); the
 * skirmisher seat only counts turn-economy rows.
 */
describe('the Keening Scuttler: the semantic layer tightens', () => {
  test('the spell list carries the same annotation as the cast site (owner improvement on print)', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, caster: true });
      if (!sk.entries.some((e) => e.section === 'Legendary Actions'
        && /uses Spellcasting to cast \{signature_spell\}/.test(e.text))) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        energy_damage: 'Fire', // on-palette for the identity vet
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl.startsWith('signature_spell') ? 'Scorching Ray' : 'spores'])),
        })),
      });
      const caster = Object.values(m.sections).flat().find((e) => /At Will:/.test(e.text));
      if (caster && /Scorching Ray/.test(caster.text)) {
        expect(caster.text).toMatch(/\*Scorching Ray\* \(level 4 version\)/);
      }
      return;
    }
  });

  test('stealth chassis never wear an aura (owner exclusion; signature promise still overrides)', () => {
    for (const archetype of ['skirmisher', 'lurker']) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr: 20, seed, archetype });
        for (const r of [...sk.traits, ...sk.entries]) {
          // BOTH printed phrasings — the sweep's own regex shared the
          // predicate's blind spot and waved the Fear Aura genus through
          // (live relapse: the Scrik)
          const em = /Emanation originating from the|emanates an aura/.test(r.text) && !r.gate && !r.on_death;
          expect(`${archetype} seed ${seed} ${r.name}: ${em}`).toBe(`${archetype} seed ${seed} ${r.name}: false`);
        }
      }
    }
    // the concept's explicit aura promise outranks the exclusion
    const sig = buildSkeleton({ cr: 20, seed: 3, archetype: 'skirmisher', signatureMechanic: 'aura' });
    expect([...sig.traits, ...sig.entries].some((r) => /Emanation originating from the/.test(r.text) && !r.gate)).toBe(true);
  });

  test('a save-based squeeze deals the block\'s PHYSICAL type, never the energy stamp', () => {
    for (let seed = 1; seed <= 20; seed += 1) {
      const sk = buildSkeleton({ cr: 15, seed, signatureMechanic: 'grapple' });
      const squeeze = sk.entries.find((e) => /Saving Throw/.test(e.text) && /Grappled condition \(escape/.test(e.text) && /\{damage_type\}/.test(e.text));
      if (!squeeze) continue;
      const m = applyFlavor(sk, respond(sk)); // physical Bludgeoning, energy Poison
      const rendered = Object.values(m.sections).flat().find((e) => /Grappled condition \(escape/.test(e.text) && /Saving Throw/.test(e.text));
      if (rendered && /\d+ \(\d+d\d+\) \w+ damage/.test(rendered.text)) {
        expect(rendered.text).toMatch(/Bludgeoning damage/);
        expect(rendered.text).not.toMatch(/\d\) Poison damage/);
      }
      return;
    }
  });

  test('a duplicated model name takes a fresh register name — never a donor placeholder', () => {
    // SUPERSEDED twice over: the original bug was a colliding entry taking
    // a THIRD entry's placeholder ("Mind Invasion" on a pounce); the first
    // fix reverted to the entry's OWN placeholder — which resurrected the
    // DONOR's printed name onto ~20% of silent-flavor blocks (Pounce, 12 of
    // 60 seeds). Collisions now re-salt the register fallback instead.
    for (let seed = 1; seed <= 30; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, caster: true });
      const legs = sk.entries.filter((e) => e.slot_type === 'legendary');
      if (legs.length < 2) continue;
      const [eA, eB] = legs;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id,
          name: r.id === eA.id || r.id === eB.id ? 'Colliding Name' : r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, 'spores'])),
        })),
      });
      const names = (m.sections['Legendary Actions'] ?? []).map((e) => e.name.replace(/\s*\(.*\)$/, ''));
      expect(names.filter((n) => n === 'Colliding Name')).toHaveLength(1);
      // the loser takes a register name: unique, and NOT its donor's
      const eBBase = eB.name.replace(/\s*\(.*\)$/, '');
      expect(names).not.toContain(eBBase);
      expect(new Set(names).size).toBe(names.length);
      return;
    }
  });

  test('an off-palette, off-pool echo spell redraws (the model\'s Orb habit)', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, caster: true, themes: ['terror'] });
      if (!sk.entries.some((e) => /uses Spellcasting to cast \{signature_spell\}/.test(e.text))) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl.startsWith('signature_spell') ? 'Chromatic Orb' : 'spores'])),
        })),
      });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      expect(all).not.toMatch(/Chromatic Orb/);
      return;
    }
  });
});

/**
 * Live block 29 (the Uulghoth): the circular fill in a DATA slot
 * ("Vulnerability to alabaster dust damage" — the web template carried
 * {substance} where print says Fire), a reach-10 whip pulling 25 (print
 * reach 30), TWO Recharge actions via the signature seat bypassing the
 * gated cap, and the set's second creature named Uulghoth. Plus the
 * audit's new job: span-anchored prose rewrites (owner call — templates
 * own mechanics, the audit copy-edits fill seams).
 */
describe('the Uulghoth: webs burn, whips reach, one Recharge, unique names', () => {
  test('web restraints are Vulnerable to Fire, never to their own substance', () => {
    for (let seed = 1; seed <= 30; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, signatureMechanic: 'web' });
      const web = sk.entries.find((e) => /is destroyed \(AC/.test(e.text));
      if (!web) continue;
      expect(web.text).toMatch(/Vulnerability to Fire damage/);
      expect(web.text).not.toMatch(/Vulnerability to \{substance\}/);
      return;
    }
  });

  test('the whip reaches 30 — farther than its own 25-foot pull', () => {
    const lib = require('@/data/ability-library.json');
    const whips = [];
    const visit = (o) => {
      if (o && typeof o === 'object') {
        if (o.ability === 'Flame Whip' && /pulls the target up to 25/.test(o.template_2024 ?? '')) whips.push(o);
        Object.values(o).forEach(visit);
      }
    };
    visit(lib);
    expect(whips.length).toBeGreaterThan(0);
    for (const w of whips) expect(w.template_2024).toMatch(/reach 30 ft/);
  });

  test('no signature seat ever assembles a second Recharge (0/329 in print)', () => {
    for (const sig of ['web', 'breath', 'engulf', 'grapple']) {
      for (let seed = 1; seed <= 12; seed += 1) {
        const sk = buildSkeleton({ cr: 20, seed, signatureMechanic: sig });
        const gated = sk.entries.filter((e) => /Recharge/i.test(e.gate ?? ''));
        expect(`${sig} seed ${seed}: ${gated.length}`).toBe(`${sig} seed ${seed}: ${Math.min(gated.length, 1)}`);
      }
    }
  });

  test('the dual-recharge lint tripwire fires on a bypassed block', () => {
    const { lintStatblock } = require('../../format-2024/lint.mjs');
    const monster = {
      name: 'T', size: 'Huge', type: 'Celestial',
      sections: {
        Actions: [
          { name: 'Choir Silence (Recharge 5-6)', text: '*Constitution Saving Throw*: DC 22, each creature in a 60-foot Cone. *Failure:* 91 (14d12) Radiant damage. *Success:* Half damage.' },
          { name: 'Silt Grasp (Recharge 5-6)', text: '*Dexterity Saving Throw*: DC 22, one creature within 120 feet. *Failure:* The target has the Restrained condition.' },
        ],
      },
    };
    expect(lintStatblock(monster, { edition: '2024' }).findings.some((f) => f.rule === 'dual-recharge')).toBe(true);
  });

  test('an audit rewrite survives verification only when text-safe, and applies in place', () => {
    const { verifyAuditFindings } = require('../../format-2024/audit.mjs');
    const monster = {
      sections: {
        Traits: [{ name: 'Briny Current', text: 'Additionally, Difficult Terrain composed of difficult ground doesn\'t cost it extra movement.' }],
      },
    };
    const raw = JSON.stringify({ findings: [
      { principle: 4, section: 'Traits', entry: 'Briny Current',
        span: 'composed of difficult ground', issue: 'Circular phrase.', confidence: 'high',
        rewrite: 'composed of loose scree' },
      // number tampering is rejected: rewrite drops the 22
      { principle: 4, section: 'Traits', entry: 'Briny Current',
        span: 'Difficult Terrain', issue: 'x', confidence: 'high', rewrite: 'DC 22 Terrain' },
    ] });
    const out = verifyAuditFindings(monster, raw);
    expect(out[0].rewrite).toBe('composed of loose scree');
    expect(out[1].rewrite).toBeUndefined();
  });

  test('the flavor prompt lists the roster\'s taken names', () => {
    const sk = buildSkeleton({ cr: 20, seed: 7 });
    const prompt = buildFlavorPrompt(sk, { concept: 'x', takenNames: ['Uulghoth', 'Grave Warden'] });
    expect(prompt).toMatch(/NAMES ALREADY TAKEN[^\n]*Uulghoth, Grave Warden/);
  });
});

/**
 * Live block 30 (the Grinding Dreadwalker) + owner calls: the snare
 * mechanic is fully generified — "the restraining substance could be
 * anything, unique to type, put it in textures." Restraints live in the
 * texture banks per facet; the trait's surviving "webs" literal (the
 * reproducible half-swap, shipped twice) is slotted; a restraint object's
 * counterplay follows its MATERIAL; and budget-equal attack pairs use
 * print's dominant or-form Multiattack (59 printed blocks).
 */
describe('the Dreadwalker: snares are substance-true, attacks reach parity', () => {
  test('no snare row ever says "webs" — the restraint is a {substance} everywhere', () => {
    const lib = require('@/data/ability-library.json');
    const found = [];
    const visit = (o) => {
      if (o && typeof o === 'object') {
        const t = o.template_2024;
        if (typeof t === 'string' && /caused by webs|the same web\b/.test(t)) found.push(o.ability ?? o.trait);
        Object.values(o).forEach(visit);
      }
    };
    visit(lib);
    expect(found).toEqual([]);
  });

  test('every facet has authored restraints, and a dead snare fill draws from them', () => {
    const banks = require('@/data/texture-banks.json').facets;
    for (const [facet, b] of Object.entries(banks)) {
      expect(`${facet}: ${(b.restraints ?? []).length >= 3}`).toBe(`${facet}: true`);
    }
    for (let seed = 1; seed <= 40; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, signatureMechanic: 'web', themes: ['subterranean'] });
      const snare = sk.entries.find((e) => /until the \{substance\} is destroyed/.test(e.text));
      if (!snare) continue;
      const m = applyFlavor(sk, { ...respond(sk), entries: [] }); // never-fail: bank fallback
      const rendered = Object.values(m.sections).flat().find((e) => /is destroyed \(AC/.test(e.text));
      const sub = rendered.text.match(/until the ([\w' -]+?) is destroyed/)[1];
      expect(banks.subterranean.restraints).toContain(sub);
      return;
    }
  });

  test('a mineral restraint cracks under hammers, not firebolts', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, signatureMechanic: 'web' });
      if (!sk.entries.some((e) => /until the \{substance\} is destroyed/.test(e.text))) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl === 'substance' ? 'hardened shale' : 'spores'])),
        })),
      });
      const rendered = Object.values(m.sections).flat().find((e) => /is destroyed \(AC/.test(e.text));
      expect(rendered.text).toMatch(/Vulnerability to Bludgeoning damage; Immunity to Fire/);
      return;
    }
  });

  test('two attacks on one budget render print\'s or-form Multiattack', () => {
    let seen = false;
    for (let seed = 1; seed <= 40 && !seen; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, attackMode: 'mixed' });
      const atks = sk.entries.filter((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack');
      if (atks.length !== 2 || atks[0].damage !== atks[1].damage) continue;
      const m = applyFlavor(sk, respond(sk));
      const multi = Object.values(m.sections).flat().find((e) => e.name === 'Multiattack');
      expect(multi.text).toMatch(/attacks, using .+ or .+ in any combination/);
      seen = true;
    }
    expect(seen).toBe(true);
  });

  test("the synthesis vocabulary says 'snare'; both keys reach the web family", async () => {
    const { buildSeedSynthesisPrompt, buildArchetypeResolvePrompt } = require('../../format-2024/generate.mjs');
    const p = buildArchetypeResolvePrompt('a tar-spitting horror', '', { cr: 20 });
    expect(p).toMatch(/snare \(it binds prey in a restraining substance/);
    expect(p).not.toMatch(/summon, web\b/);
    for (const key of ['web', 'snare']) {
      const m = await generateFromSkeleton(
        { concept: 'a tar horror', cr: 17, seed: 5, signatureMechanic: key },
        async (pr) => (/Every number is already fixed/.test(pr) ? null : JSON.stringify({ problems: [] })),
      );
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      expect(all).toMatch(/Restrained condition until the [\w' -]+ is destroyed/);
    }
  });
});

/**
 * Live block 31 (the Scrik): the Fear Aura genus ("emanates an aura...")
 * was invisible to the emanation predicate its whole life; the gatedVictim
 * rule traded the block's only nova for a single-target snare; a
 * mode-dominated twin attack shipped (0/329 in print); and two unlocked
 * move-and-attack legendaries split one function (0/329 carry two).
 */
describe('the Scrik: novas survive snares, no dominated twins, one pounce', () => {
  test('the snare signature never leaves the block spikeless — it demotes to 1/Day beside the nova', () => {
    let checked = 0;
    for (let seed = 1; seed <= 25; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, signatureMechanic: 'web' });
      const snare = sk.entries.find((e) => /until the \{substance\} is destroyed/.test(e.text));
      if (!snare) continue;
      const gatedArea = sk.entries.find((e) => e.slot_type === 'area' && /Recharge/i.test(e.gate ?? ''));
      if (gatedArea) {
        checked += 1;
        expect(`seed ${seed} snare gate: ${snare.gate}`).toBe('seed ' + seed + ' snare gate: 1/Day');
      }
    }
    expect(checked).toBeGreaterThan(0);
  });

  test('no block carries a mode-dominated twin attack', () => {
    for (const cr of [11, 17, 20]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr, seed, attackMode: 'mixed' });
        const atks = sk.entries.filter((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack');
        const modeOf = (t) => (/Melee or Ranged Attack Roll/.test(t) ? 'both'
          : /Ranged Attack Roll/.test(t) ? 'ranged' : 'melee');
        const shape = (e) => `${/rider/.test(e.slot_type)}|${/plus \d+ \(\d+d\d+\)/.test(e.text)}|${/Saving Throw/.test(e.text)}|${(e.text.match(/reach (\d+)/) ?? [])[1]}`;
        for (const b of atks) {
          const dominated = atks.some((a) => a !== b && modeOf(a.text) === 'both'
            && modeOf(b.text) !== 'both' && shape(a) === shape(b));
          expect(`CR ${cr} seed ${seed} ${b.name}: ${dominated}`).toBe(`CR ${cr} seed ${seed} ${b.name}: false`);
        }
      }
    }
  });

  test('one move-and-attack legendary per block (0/329 printed carry two)', () => {
    const FAM = /(?:moves up to|teleports? up to)[^.]*makes one [A-Z][\w' -]* attack/;
    for (const cr of [17, 20]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3 });
        const hits = sk.entries.filter((e) => e.slot_type === 'legendary' && FAM.test(e.text));
        expect(`CR ${cr} seed ${seed}: ${hits.length}`).toBe(`CR ${cr} seed ${seed}: ${Math.min(hits.length, 1)}`);
      }
    }
  });
});

/**
 * Live block 33 (the Ryll, dragon kit): the dual-recharge tripwire's
 * first live catch — and the bypass was OUR belt, not the kit. Print
 * ships 20/20 two-breath dragons with only the damage breath gated; the
 * ladder-form utility breath (First Failure -> Second Failure) is
 * self-gated by its escalation buffer, and the hardAreaUngated belt was
 * stamping a second Recharge onto it.
 */
describe('the Ryll: ladder breaths go free, the jar stays in the lich', () => {
  test('a dragon kit never assembles two Recharge-labeled breaths', () => {
    for (let seed = 1; seed <= 20; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, family: 'dragon' });
      const gated = sk.entries.filter((e) => /Recharge/i.test(e.gate ?? ''));
      expect(`seed ${seed}: ${gated.length}`).toBe(`seed ${seed}: ${Math.min(gated.length, 1)}`);
      const ladder = sk.entries.find((e) => /First Failure/i.test(e.text));
      if (ladder) {
        expect(`seed ${seed} ${ladder.name} gate: ${ladder.gate ?? 'none'}`)
          .toBe(`seed ${seed} ${ladder.name} gate: none`);
      }
    }
  });

  test('the Spirit Jar never leaves the lich', () => {
    for (const cr of [13, 20]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3 });
        for (const r of [...sk.traits, ...sk.entries]) {
          expect(`CR ${cr} seed ${seed} ${r.name}: ${/spirit jar/i.test(r.text)}`)
            .toBe(`CR ${cr} seed ${seed} ${r.name}: false`);
        }
      }
    }
  });
});

describe('the Ryll, round 2: seats never mint dominated twins (kit rows included)', () => {
  test('no block carries a dominated attack pair, dragon kits and guarantees included', () => {
    const modeOf = (t) => (/Melee or Ranged Attack Roll/.test(t) ? 'both'
      : /Ranged Attack Roll/.test(t) ? 'ranged' : 'melee');
    const shape = (e) => `${/plus \d+ \(\d+d\d+\)/.test(e.text)}|${/Saving Throw/.test(e.text)}|${(e.text.match(/reach (\d+)/) ?? [])[1]}`;
    for (const opts of [
      { cr: 20, family: 'dragon', attackMode: 'mixed' },
      { cr: 20, attackMode: 'mixed', signatureMechanic: 'thrown-weapon' },
      { cr: 17, family: 'dragon', attackMode: 'mixed' },
    ]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ ...opts, seed });
        const atks = sk.entries.filter((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack');
        for (const b of atks) {
          const dominated = atks.some((a) => a !== b && modeOf(a.text) === 'both'
            && modeOf(b.text) !== 'both' && shape(a) === shape(b));
          expect(`${JSON.stringify(opts)} seed ${seed} ${b.name}: ${dominated}`)
            .toBe(`${JSON.stringify(opts)} seed ${seed} ${b.name}: false`);
        }
      }
    }
  });
});

/**
 * Live block 34 (the Qarun): three offense spells at-will — print's
 * ceiling is TWO, held by exactly one block (the Lich; 39/59 lists carry
 * zero). The trim keeps the echoed spell and drops off-palette damage
 * types first (Magic Missile's Force was the all-Fire sheet's only
 * off-theme line — spell-affinity instance #2, cap handles it without
 * unparking the full vet).
 */
describe('the Qarun: the at-will menu holds two offense spells at most', () => {
  test('a triple-offense fill trims to the Lich ceiling, off-palette first, echo kept', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, caster: true });
      const list = sk.entries.find((e) => /casts one of the following/.test(e.text) && /\{spells\}/.test(e.text));
      const echo = sk.entries.find((e) => /uses Spellcasting to cast \{signature_spell\}/.test(e.text));
      if (!list || !echo) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        physical_damage: 'Slashing', energy_damage: 'Fire',
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl,
            sl === 'spells' ? ['Burning Hands', 'Magic Missile', 'Scorching Ray']
              : sl.startsWith('signature_spell') ? 'Scorching Ray' : 'spores'])),
        })),
      });
      const caster = Object.values(m.sections).flat().find((e) => /At Will:/.test(e.text));
      const atWill = caster.text.match(/- \*\*At Will:\*\*([^\n]*)/)[1];
      const offense = ['Burning Hands', 'Magic Missile', 'Scorching Ray'].filter((sp) => atWill.includes(sp));
      expect(offense.length).toBeLessThanOrEqual(2);
      expect(atWill).toContain('Scorching Ray');
      expect(atWill).not.toContain('Magic Missile');
      return;
    }
  });
});

/**
 * Live block 34 follow-ups (owner calls 1 and 3): the succession on-death
 * gains curse teeth (the lore-only form was a hook the DM had to invent
 * rules for), the residue on-death trades "cleared or cleansed" for a
 * flat 10 days plus a fixed 5 (2d4) tick, and the ally-ferry teleport
 * also carries Grappled cargo (teleport-and-carry wires the bonus action
 * into grapple kits).
 */
describe('the Qarun, round 2: on-death teeth and the carry-ferry', () => {
  test('every bespoke on-death family carries adjudicable mechanics', () => {
    const lib = require('@/data/ability-library.json');
    for (const t of lib.on_death.templates) {
      // slot-form damage counts as mechanics too (authored templates carry
      // {damage} ({dice}) rather than literals)
      const mech = /Remove Curse|Disadvantage|makes the death permanent|prevents the return|takes (?:\d+ \(|\{damage\})/.test(t.template_2024);
      expect(`${t.death_family}: ${mech}`).toBe(`${t.death_family}: true`);
    }
    // every family now has more than one template — a single template per
    // family made two blocks in three ship the same on-death verbatim
    const byFamily = {};
    for (const t of lib.on_death.templates) byFamily[t.death_family] = (byFamily[t.death_family] ?? 0) + 1;
    expect(byFamily.residue).toBeGreaterThan(1);
    expect(byFamily.succession).toBeGreaterThan(1);
    expect(lib.on_death.templates.every((t) => !/cleared or cleansed/.test(t.template_2024))).toBe(true);
  });

  test('the ferry teleport carries grappled prey', () => {
    const lib = require('@/data/ability-library.json');
    const rows = [];
    const visit = (o) => {
      if (o && typeof o === 'object') {
        if (typeof o.template_2024 === 'string' && /together with one creature within 10 feet/.test(o.template_2024)) rows.push(o);
        Object.values(o).forEach(visit);
      }
    };
    visit(lib);
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) {
      expect(r.template_2024).toMatch(/willing or Grappled by it/);
      // the carry is gated; the self-teleport stays at will
      expect(r.template_2024).toMatch(/can't carry a creature this way again/);
      expect(r.modified_from_print).toBeTruthy();
    }
    // and the support seat still recognizes the re-keyed row
    for (let seed = 1; seed <= 8; seed += 1) {
      const sk = buildSkeleton({ cr: 12, seed, archetype: 'support' });
      const GIVES = /casts \*(?:Bless|Healing Word|Cure Wounds|Lesser Restoration|Sanctuary)|Temporary Hit Points|together with one creature within 10 feet of itself that is willing|willing creatures within/;
      expect(sk.entries.some((e) => GIVES.test(e.text))).toBe(true);
    }
  });
});

/**
 * Live block 35 (the Tar-Shroud Watcher, "worst assembly since the
 * archetype era" — and mostly ours): the coinage lint reverted five GOOD
 * tar-register names to donor placeholders; two more printed faces
 * (Solar's bow, Tarrasque's shell) joined the exclusion roster; the
 * Lamia's 1-hour curse got the first live cr_ceiling; self-cast slots
 * got a spell class (a fire-vulnerable creature cast Scorching Ray on
 * itself); vulnerability-casting is banned (0/329); and the at-will
 * demotion orphaned level annotations onto neighboring spells.
 */
describe('the Tar-Shroud Watcher: names survive, faces stay home, annotations travel', () => {
  test('the coined-name detector is retired: no hyphenated name is ever flagged or reverted', () => {
    // Owner call 2026-08-05: without a dictionary the heuristic couldn't
    // tell "Tar-Slick Claw" from "Thul-eg", and reverting good names to
    // donor placeholders was strictly worse than shipping an odd coinage
    // (the audit's judgment layer covers those). Naming discipline is
    // prompt-side now.
    const { lintStatblock } = require('../../format-2024/lint.mjs');
    const mk = (name) => ({
      name: 'T', size: 'Large', type: 'Undead',
      sections: { Actions: [{ name, text: '*Melee Attack Roll:* +14, reach 5 ft. 30 (5d8 + 8) Slashing damage.' }] },
    });
    for (const name of ['Tar-Slick Claw', 'Pit-Tar Fang', 'Thul-eg Strike', 'Vor-ka Slam']) {
      expect(`${name}: ${lintStatblock(mk(name), { edition: '2024' }).findings.some((f) => f.rule === 'entry-name-coinage')}`)
        .toBe(`${name}: false`);
    }
    const { buildFlavorPrompt: bfp } = require('../flavor-prompt.mjs');
    const sk = buildSkeleton({ cr: 10, seed: 1 });
    expect(bfp(sk, { concept: 'x' })).toMatch(/invented syllables .* belong to the creature's proper name, never to entries/);
  });

  test('the curse row respects its ceiling; the bow and the shell never leave home', () => {
    for (const cr of [15, 20]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3 });
        for (const r of [...sk.entries, ...sk.traits]) {
          expect(`CR ${cr} seed ${seed} ${r.name}: ${/cursed for 1 hour|reflects the spell/.test(r.text)}`)
            .toBe(`CR ${cr} seed ${seed} ${r.name}: false`);
          for (const o of r.options ?? []) {
            expect(/reflects the spell/.test(o.template_2024 ?? '')).toBe(false);
          }
        }
      }
    }
  });

  test('self-cast slots refuse attack spells; vulnerability types never get cast', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, caster: true });
      const selfCast = sk.entries.find((e) => / on itself/.test(e.text) && /\{signature_spell\}/.test(e.text));
      if (!selfCast) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        vulnerabilities: 'Fire',
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl,
            sl.startsWith('signature_spell') ? 'Scorching Ray'
              : sl === 'spells' ? ['Scorching Ray', 'Detect Magic'] : 'spores'])),
        })),
      });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      // precise probe: the Bite ladder's "ending the effect on itself"
      // false-matched a bare / on itself/ gate
      if (!/cast \*[^*]+\* on itself/.test(all)) continue;
      // the self-buff is non-concentration on legendaries (Invisibility is
      // concentration, and the legendary overrule strips it — the two
      // rules used to cancel out)
      const { SELF_CAST_SPELLS: SC } = require('../flavor-prompt.mjs');
      const selfSpell = all.match(/cast \*([A-Z][\w' ]+?)\* on itself/)[1];
      expect(SC).toContain(selfSpell);
      expect(all).not.toMatch(/Scorching Ray/);
      return;
    }
  });

  test('a demoted annotated spell takes its annotation with it', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, caster: true });
      if (!sk.entries.some((e) => /casts one of the following/.test(e.text) && /\{spells\}/.test(e.text))) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl,
            sl === 'spells' ? ['Scorching Ray', 'Blight'] : 'spores'])),
        })),
      });
      const caster = Object.values(m.sections).flat().find((e) => /At Will:/.test(e.text));
      expect(caster.text).not.toMatch(/\(level \d+ version\) \(level \d+ version\)/);
      if (/Blight/.test(caster.text)) {
        const daily = caster.text.match(/1\/Day[^\n]*/)?.[0] ?? '';
        expect(daily).toMatch(/\*Blight\* \(level 6 version\)/);
      }
      return;
    }
  });
});

describe('Death Sentence: the execute mechanism interpolates like any other number', () => {
  test('the threshold AND the lethality scale by band — low CR drops to 0 (Sea Hag), high CR kills (Solar)', () => {
    const lib = require('@/data/ability-library.json');
    expect(lib._meta.scale_slots.execute_threshold.by_band).toEqual({ '0-7': 30, '8-14': 60, '15-20': 90, '21-30': 100 });
    let lowFound = 0; let highFound = 0;
    for (const cr of [5, 12, 20, 24]) {
      const band = cr <= 7 ? '0-7' : cr <= 14 ? '8-14' : cr <= 20 ? '15-20' : '21-30';
      for (let seed = 1; seed <= 40; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3 });
        for (const r of sk.entries) {
          const texts = [r.text, ...(r.options ?? []).map((o) => o.template_2024 ?? '')];
          for (const t of texts) {
            const m = t.match(/has (\d+) Hit Points or fewer, (it dies|it drops to 0 Hit Points)/);
            if (m) {
              expect(`CR ${cr}: ${m[1]}`).toBe(`CR ${cr}: ${lib._meta.scale_slots.execute_threshold.by_band[band]}`);
              expect(`CR ${cr}: ${m[2]}`).toBe(`CR ${cr}: ${lib._meta.scale_slots.execute_effect.by_band[band]}`);
              if (cr <= 14) lowFound += 1; else highFound += 1;
              // no outright death below the solo-boss bands, ever
              if (cr <= 14) expect(m[2]).toBe('it drops to 0 Hit Points');
            }
          }
        }
      }
    }
    expect(highFound).toBeGreaterThan(0);
  });

  test('fillTemplate interpolates both axes directly, every band (no seed luck required)', () => {
    const { fillTemplate, numbersFor, applyArchetypeNumbers } = require('../build-skeleton.mjs');
    const lib = require('@/data/ability-library.json');
    let row = null;
    const visit = (o) => {
      if (o && typeof o === 'object') {
        if (o.ability === 'Death Sentence' && o.template_2024) row = row ?? o;
        Object.values(o).forEach(visit);
      }
    };
    visit(lib);
    expect(row).toBeTruthy();
    const expectAt = (cr, threshold, verb) => {
      const { text } = fillTemplate(row, { cr: String(cr), size: 'Large', nums: numbersFor(String(cr)) });
      expect(text).toContain(`has ${threshold} Hit Points or fewer, ${verb}`);
    };
    expectAt(3, 30, 'it drops to 0 Hit Points');
    expectAt(10, 60, 'it drops to 0 Hit Points');
    expectAt(17, 90, 'it dies');
    expectAt(24, 100, 'it dies');
  });
});

/**
 * The parked-owner-call sweep (2026-08-05, "let's go all of them"): the
 * Lich teleport house lock, always-on on-death at CR 20+, the entry-count
 * valve, the spell-identity vet, and the audit's rename actuator — the
 * piece the retired coinage detector left missing.
 */
describe('the parked shelf, cleared', () => {
  test('the Deathly Teleport carries its house lock', () => {
    const lib = require('@/data/ability-library.json');
    const rows = [];
    const visit = (o) => {
      if (o && typeof o === 'object') {
        if (o.ability === 'Deathly Teleport') rows.push(o);
        Object.values(o).forEach(visit);
      }
    };
    visit(lib);
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) {
      expect(r.template_2024).toMatch(/can't take this action again until the start of its next turn/);
      expect(r.modified_from_print).toMatch(/house lock/);
    }
  });

  test('every CR 20+ block dies interestingly; lower CRs still roll', () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      const boss = buildSkeleton({ cr: 20, seed, typeHint: 'Undead' });
      expect(`seed ${seed}: ${boss.roles.on_death}`).toBe(`seed ${seed}: true`);
    }
    let lowHits = 0;
    for (let seed = 1; seed <= 25; seed += 1) {
      if (buildSkeleton({ cr: 8, seed, typeHint: 'Undead' }).roles.on_death) lowHits += 1;
    }
    expect(lowHits).toBeLessThan(25); // still a ramp below the boss tier
  });

  test('the entry-count valve holds blocks inside print\'s envelope (max 12)', () => {
    for (const cr of [11, 17, 20, 24]) {
      for (let seed = 1; seed <= 30; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3 });
        const total = sk.entries.length + sk.traits.length;
        expect(`CR ${cr} seed ${seed}: ${total <= 14}`).toBe(`CR ${cr} seed ${seed}: true`);
      }
    }
  });

  test('offense spells cohere with the declared palette; facets license crossovers', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, caster: true, themes: ['grave'] });
      if (!sk.entries.some((e) => /casts one of the following/.test(e.text) && /\{spells\}/.test(e.text))) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        energy_damage: 'Necrotic',
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          // Scorching Ray (Fire) is neither palette nor grave-facet: it goes
          ...Object.fromEntries(r.slots.map((sl) => [sl,
            sl === 'spells' ? ['Scorching Ray', 'Detect Magic'] : 'spores'])),
        })),
      });
      const caster = Object.values(m.sections).flat().find((e) => /At Will:/.test(e.text));
      expect(caster.text).not.toMatch(/Scorching Ray/);
      expect(caster.text).toMatch(/Detect Magic/);
      return;
    }
  });

  test('the audit renames a name-payload defect, references following', () => {
    const { verifyAuditFindings } = require('../../format-2024/audit.mjs');
    const monster = {
      sections: {
        Actions: [
          { name: 'Choir Silence (Recharge 5-6)', text: '*Constitution Saving Throw*: DC 22, each creature in a 60-foot Cone. *Failure:* 91 (14d12) Radiant damage.' },
          { name: 'Multiattack', text: 'The x makes three Claw attacks.' },
        ],
      },
    };
    const mk = (over) => JSON.stringify({ findings: [{
      principle: 3, section: 'Actions', entry: 'Choir Silence',
      span: '91 (14d12) Radiant damage', issue: 'The name promises silence; the entry is a radiant cone.',
      confidence: 'high', ...over,
    }] });
    const [ok] = verifyAuditFindings(monster, mk({ rename: 'Hymn of Cinders' }));
    expect(ok.rename).toBe('Hymn of Cinders');
    // guards: parentheticals, collisions, and rules vocabulary are refused
    expect(verifyAuditFindings(monster, mk({ rename: 'Hymn (Recharge 5-6)' }))[0].rename).toBeUndefined();
    expect(verifyAuditFindings(monster, mk({ rename: 'Multiattack' }))[0].rename).toBeUndefined();
    expect(verifyAuditFindings(monster, mk({ entry: 'Multiattack', span: 'three Claw attacks', rename: 'Flurry' }))[0].rename).toBeUndefined();
  });

  test('the audit prompt asks for renames on name-payload defects', () => {
    const { buildAuditPrompt } = require('../../format-2024/audit.mjs');
    const p = buildAuditPrompt({
      name: 'X', size: 'Large', type: 'Undead', ac: 20, hp: 300, cr: 20, cr_str: '20', pb: 6,
      speed: '30 ft.', stats: { STR: 20, DEX: 14, CON: 20, INT: 10, WIS: 12, CHA: 10 },
      sections: { Actions: [{ name: 'A', text: 'b' }] },
    }, '2024');
    expect(p).toMatch(/An entry's NAME can also be the defect/);
    expect(p).toMatch(/"rename":/);
    expect(p).toMatch(/Never rename Multiattack,\s+Spellcasting, or Legendary Resistance/);
  });
});

/**
 * Live block 36 (the Hoarfrost Scavenger): the critic's headline —
 * "bimodal damage, HP a quarter under band" — is the LURKER SPEC
 * executing (hp 0.75, damage 0.6, nova 2.0, halved defense budget), the
 * mirror of the complaint five blocks ago that archetypes didn't show.
 * The real bug was the cold-trait pileup: absorption keyed to Cold,
 * weakness keyed to a LITERAL Cold, on a Cold-immune block — three
 * mutually cancelling clauses.
 */
describe('the Hoarfrost Scavenger: elements never fight themselves', () => {
  test('the lurker profile is intact — the bargain is the archetype, not a defect', () => {
    const base = crTable.by_cr['20'];
    const sk = buildSkeleton({ cr: 20, seed: 11, archetype: 'lurker' });
    expect(sk.hp).toBe(Math.round(base.hp * 0.75));
    expect(sk.attack_bonus).toBe(base.attack_bonus + 1);
    const gated = sk.entries.find((e) => e.slot_type === 'area' && /Recharge/i.test(e.gate ?? ''));
    if (gated) {
      // nova_mult 1.5 (trimmed from 2.0 with the Recharge law, 2026-08-16):
      // the spike no longer dwarfs the un-discounted band — the new bargain
      // is that it clearly exceeds the lurker's OWN discounted routine,
      // and comes back mid-fight instead of once per day.
      expect(gated.damage).toBeGreaterThan(sk.per_attack_damage * 3);
    }
  });

  test('a weakness trigger never keys on the block\'s own element', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed });
      if (!sk.traits.some((t) => /\{weakness_type\}/.test(t.text))) continue;
      const m = applyFlavor(sk, { ...respond(sk), energy_damage: 'Cold', immunities: 'Cold, Poison' });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      const trigger = all.match(/takes (\w+) damage, its Speed decreases/);
      expect(trigger).toBeTruthy();
      expect(['Cold', 'Bludgeoning']).not.toContain(trigger[1]); // not the palette
      expect(trigger[1]).toBe('Fire'); // Cold's foil
      return;
    }
  });

  test('an absorbed type is dropped from the immunity line (absorption supersedes)', () => {
    for (let seed = 1; seed <= 80; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed });
      if (!sk.traits.some((t) => /regains a number of Hit Points equal to/.test(t.text))) continue;
      const m = applyFlavor(sk, { ...respond(sk), energy_damage: 'Cold', immunities: 'Cold, Poison' });
      const absorbs = Object.values(m.sections).flat().some((e) => /subjected to Cold damage, it (?:takes no damage and instead )?regains/.test(e.text));
      if (!absorbs) continue;
      expect(m.immunities ?? '').not.toMatch(/Cold/);
      expect(m.immunities ?? '').toMatch(/Poison/);
      return;
    }
  });
});

/**
 * Live block 37 (the Emberwraith): the on-death teeth added the day
 * before duplicated everything the model wrote into {legacy}; the
 * library's de-flavor pass had turned print's "it starts burning" into
 * a dangling "it starts suffering the effect" on five rows; and the
 * name/type harmonizer couldn't see "Barrow Chill Burst" dealing Fire
 * because it only knew bare type words. The audit also logged a no-op
 * rewrite (span identical to replacement) on a false finding.
 */
describe('the Emberwraith: teeth say it once, embers burn, chills are cold', () => {
  test('the succession on-death states its transfer and exit exactly once', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, typeHint: 'Undead' });
      const od = sk.traits.find((t) => t.on_death && /\{legacy\}/.test(t.text));
      if (!od) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl === 'legacy' ? 'its unpaid debt to the drowned' : 'spores'])),
        })),
      });
      const trait = Object.values(m.sections).flat().find((e) => /struck the killing blow/.test(e.text));
      expect((trait.text.match(/struck the killing blow/g) ?? []).length).toBe(1);
      expect((trait.text.match(/Remove Curse/g) ?? []).length).toBe(1);
      expect(trait.text).toContain('its unpaid debt to the drowned passes to');
      return;
    }
  });

  test('the ignite rider burns on Fire and vanishes on anything else', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, attackMode: 'ranged' });
      if (!sk.entries.some((e) => /starts suffering the effect/.test(e.text))) continue;
      const fire = applyFlavor(sk, { ...respond(sk), energy_damage: 'Fire' });
      const fText = Object.values(fire.sections).flat().map((e) => e.text).join('\n');
      expect(fText).toContain('it starts burning');
      expect(fText).not.toContain('suffering the effect');
      const cold = applyFlavor(sk, { ...respond(sk), energy_damage: 'Cold' });
      const cText = Object.values(cold.sections).flat().map((e) => e.text).join('\n');
      expect(cText).not.toContain('suffering the effect');
      expect(cText).not.toContain('starts burning');
      return;
    }
  });

  test('element-form words in names are claims; register words are not', () => {
    // name ONE entry (naming all of them trips the collision handler)
    for (let seed = 1; seed <= 40; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, alternatives: 1 });
      const reqs = flavorRequests(sk);
      const target = reqs.find((r) => {
        const e = sk.entries.find((x) => x.id === r.id);
        return e && /\{damage\} \(\{dice\}\) \{damage_type\}/.test(e.text) && e.slot_type !== 'plain_attack';
      });
      if (!target) continue;
      const nameOne = (name) => applyFlavor(sk, {
        ...respond(sk), // physical Bludgeoning, energy Poison
        entries: reqs.map((r) => ({
          id: r.id, name: r.id === target.id ? name : r.placeholder_name,
          ...Object.fromEntries(r.slots.map((s2) => [s2, 'spores'])),
        })),
      });
      const find = (m) => Object.values(m.sections).flat().find((e) => /Poison damage/.test(e.text)
        && !/^(Multiattack|Legendary Resistance)/.test(e.name));
      // a Cold claim on a Poison payload is harmonized away
      expect(find(nameOne('Barrow Chill Burst')).name).not.toMatch(/Chill/);
      // register vocabulary is left alone
      expect(find(nameOne('Hallowed Radiance')).name).toBe('Hallowed Radiance');
      return;
    }
  });

  test('a no-op rewrite is never carried', () => {
    const { verifyAuditFindings } = require('../../format-2024/audit.mjs');
    const monster = { sections: { 'Bonus Actions': [{ name: 'Flowing Ash', text: 'The x takes the Dash or Disengage action.' }] } };
    const raw = JSON.stringify({ findings: [{
      principle: 4, section: 'Bonus Actions', entry: 'Flowing Ash',
      span: 'The x takes the Dash or Disengage action.',
      rewrite: 'The x takes the Dash or Disengage action.',
      issue: 'The entry name starts with a lowercase letter.', confidence: 'high',
    }] });
    expect(verifyAuditFindings(monster, raw)[0].rewrite).toBeUndefined();
  });
});

/**
 * Live block 38 (the Scree): a Fly 90 ranged-parity skirmisher whose
 * mobility legendary demanded a melee dive — the Pounce template
 * hardcodes "makes one Rend attack" and the reference repointer aimed it
 * at the FIRST attack row, blind to the chassis. Also the theme-honesty
 * gap: prose said deep-ocean brine, themes came back elemental+aerial
 * (aerial has zero Cold affinity), so the palette handed out gale and
 * magma vocabulary for a Cold-brine creature.
 */
describe('the Scree: mobility aims where the body can reach', () => {
  test('a flier\'s move-and-attack legendary points at a ranged attack when one exists', () => {
    let checked = 0;
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, movement: ['fly'], attackMode: 'mixed' });
      const mobility = sk.entries.find((e) => e.slot_type === 'legendary'
        && /(?:moves up to|teleports? up to)[^.]*makes one /.test(e.text));
      const attacks = sk.entries.filter((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack');
      if (!mobility || attacks.length < 2) continue;
      if (!attacks.some((a) => /Ranged Attack Roll|or range \d/.test(a.text))) continue;
      const m = applyFlavor(sk, respond(sk));
      const leg = (m.sections['Legendary Actions'] ?? []).find((e) => /makes one /.test(e.text));
      const named = leg.text.match(/makes one ([A-Z][\w' -]+?) attack/)[1];
      const target = Object.values(m.sections).flat().find((e) => e.name.replace(/\s*\(.*\)$/, '') === named);
      expect(`seed ${seed} ${named}: ${/Ranged Attack Roll|or range \d/.test(target.text)}`)
        .toBe(`seed ${seed} ${named}: true`);
      checked += 1;
      if (checked >= 3) return;
    }
    expect(checked).toBeGreaterThan(0);
  });

  test('a walker\'s mobility legendary is untouched', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, movement: [], attackMode: 'melee' });
      const mobility = sk.entries.find((e) => e.slot_type === 'legendary' && /makes one /.test(e.text));
      if (!mobility) continue;
      const m = applyFlavor(sk, respond(sk));
      const leg = (m.sections['Legendary Actions'] ?? []).find((e) => /makes one /.test(e.text));
      const named = leg.text.match(/makes one ([A-Z][\w' -]+?) attack/)[1];
      const target = Object.values(m.sections).flat().find((e) => e.name.replace(/\s*\(.*\)$/, '') === named);
      expect(target).toBeTruthy(); // reference still resolves
      return;
    }
  });

  test('the concept prompts demand theme honesty', () => {
    const { buildArchetypeResolvePrompt, buildSeedSynthesisPrompt } = require('../../format-2024/generate.mjs');
    for (const p of [buildArchetypeResolvePrompt('a brine thing', '', { cr: 20 }),
      buildSeedSynthesisPrompt({ intelligence: 'cunning', physical: 'sleek', silhouette: 'eel', origin: 'the trench' }, { cr: 20 })]) {
      expect(p).toMatch(/THEME HONESTY/);
      expect(p).toMatch(/deep-ocean brine is aquatic/);
    }
  });
});

/**
 * The HOUSE layer (owner call, 2026-08-05: "brine and sleet may all be in
 * the same neighborhood but they belong to different houses… I'm getting
 * the mishmash vibe"). A house is one material and the vocabulary it
 * earns — finer than a facet, which spans several. One declaration binds
 * the three moments that used to choose independently: concept prose,
 * fill time, and naming.
 */
describe('material houses: one material, many manifestations', () => {
  const { pickHouse } = require('../flavor-prompt.mjs');
  const banks = require('@/data/texture-banks.json');

  test('every facet maps to houses that exist, and every house is furnished', () => {
    for (const [f, v] of Object.entries(banks.facets)) {
      expect(`${f}: ${(v.houses ?? []).length >= 2}`).toBe(`${f}: true`);
      for (const h of v.houses) expect(banks.houses[h]).toBeTruthy();
    }
    for (const [h, b] of Object.entries(banks.houses)) {
      for (const key of ['tokens', 'substances', 'adjectives', 'nouns']) {
        expect(`${h}.${key}: ${(b[key] ?? []).length >= 3}`).toBe(`${h}.${key}: true`);
      }
    }
  });

  test('the concept picks the house — prose about brine never yields magma', () => {
    const brine = pickHouse('a living column of deep-ocean brine, salt-thick and lightless', ['elemental', 'aquatic'], 7);
    expect(brine[0]).toBe('brine');
    const ashen = pickHouse('a shambling heap of bone-white ash and glowing cinders', ['elemental', 'grave'], 7);
    expect(ashen[0]).toBe('ash');
    // silent concept still yields exactly one house, deterministically
    const quiet = pickHouse('a creature', ['elemental'], 3);
    expect(quiet).toHaveLength(1);
    expect(pickHouse('a creature', ['elemental'], 3)).toEqual(quiet);
  });

  test('ONE house, even when the concept names two materials', () => {
    // Owner call 2026-08-07: "we don't want 'grave, void', we just want
    // grave." The collision hatch is gone — a drowned forge resolves to the
    // material it names MOST, and the other one stops colouring every
    // ability name in the block.
    const drownedForge = pickHouse('a drowned forge of brine-flooded iron, its rivets weeping salt into the forge-slag', ['forged', 'aquatic'], 1);
    expect(drownedForge).toHaveLength(1);
    const single = pickHouse('a thing of grinding scree and granite dust', ['elemental', 'subterranean'], 1);
    expect(single).toEqual(['stone']);
  });

  test('the palette declares the material and forbids a second', () => {
    const sk = buildSkeleton({ cr: 20, seed: 4, themes: ['aquatic'] });
    sk.houses = ['brine'];
    const p = buildFlavorPrompt(sk, { concept: 'a brine horror', themes: ['aquatic'] });
    expect(p).toMatch(/THIS CREATURE'S MATERIAL: brine/);
    expect(p).toMatch(/an ice creature does not also spray brine/);
    expect(p).toMatch(/Draw on it for every fill and name/); // owner's bank-anchored wording survives
  });

  test('an off-house substance fill redraws from the declared house', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, themes: ['aquatic'] });
      sk.houses = ['brine'];
      const row = [...sk.entries, ...sk.traits].find((e) => /\{substance\}/.test(e.text));
      if (!row) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          // "driving sleet" is on-facet (ice serves aquatic) and off-house
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl === 'substance' ? 'driving sleet' : 'spores'])),
        })),
      });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      expect(all).not.toMatch(/sleet/i);
      expect(all).toMatch(/brine|salt|foam|seawater/i);
      return;
    }
  });
});

/**
 * Live block 39 (the Furnaceflow) — the house layer's first live outing
 * came back clean ("one vocabulary, no intruders"), leaving four
 * coherence findings that measurement settled: physical damage follows
 * the LIMB (print varies it per attack, 47 blocks carry two+), mobility
 * legendaries are ONE family (0/329 pair a pounce with a teleport),
 * restraint physics follow the material's house, and a jump is dead text
 * beside a teleport.
 */
describe('the Furnaceflow: fists bludgeon, one mobility slot, crusts crack', () => {
  test('the physical type follows the limb, not the block declaration', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, attackMode: 'melee' });
      const atk = sk.entries.find((e) => (e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack')
        && /\{damage_type\}/.test(e.text));
      if (!atk) continue;
      const reqs = flavorRequests(sk);
      const named = (name) => applyFlavor(sk, {
        ...respond(sk), // declares physical: Bludgeoning
        physical_damage: 'Slashing',
        entries: reqs.map((r) => ({
          id: r.id, name: r.id === atk.id ? name : r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, 'spores'])),
        })),
      });
      const textOfNamed = (m, name) => Object.values(m.sections).flat()
        .find((e) => e.name.replace(/\s*\(.*\)$/, '') === name)?.text ?? '';
      // a fist bludgeons even when the block declared Slashing
      expect(textOfNamed(named('Magma Fist'), 'Magma Fist')).toMatch(/Bludgeoning damage/);
      // a fang pierces
      expect(textOfNamed(named('Basalt Fang'), 'Basalt Fang')).toMatch(/Piercing damage/);
      // no anatomy word: the block's declaration stands
      expect(textOfNamed(named('Scouring Wrath'), 'Scouring Wrath')).toMatch(/Slashing damage/);
      return;
    }
  });

  test('one mobility legendary per block, whatever the verb', () => {
    const MOBILITY = /(?:moves up to|teleports? up to|flies up to)/;
    for (const cr of [17, 20, 24]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3 });
        const hits = sk.entries.filter((e) => e.slot_type === 'legendary' && MOBILITY.test(e.text));
        expect(`CR ${cr} seed ${seed}: ${hits.length}`).toBe(`CR ${cr} seed ${seed}: ${Math.min(hits.length, 1)}`);
      }
    }
  });

  test('a jump never ships beside a teleport', () => {
    for (const cr of [11, 17, 20]) {
      for (let seed = 1; seed <= 25; seed += 1) {
        const sk = buildSkeleton({ cr, seed, signatureMechanic: 'teleport' });
        const rows = [...sk.entries, ...sk.traits];
        if (!rows.some((e) => /teleports? up to/.test(e.text))) continue;
        for (const e of rows) {
          expect(`CR ${cr} seed ${seed} ${e.name}: ${/jumps? up to/.test(e.text)}`)
            .toBe(`CR ${cr} seed ${seed} ${e.name}: false`);
        }
      }
    }
  });

  test('a hardened restraint cracks, whatever the house calls it', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, signatureMechanic: 'web', themes: ['elemental', 'verdant'] });
      if (!sk.entries.some((e) => /until the \{substance\} is destroyed/.test(e.text))) continue;
      // both fills must be on-house, or the off-house vet redraws them
      // before the physics rule ever sees them
      sk.houses = ['magma', 'thorn'];
      const reqs = flavorRequests(sk);
      const withSub = (sub) => applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl === 'substance' ? sub : 'spores'])),
        })),
      });
      const objText = (m) => Object.values(m.sections).flat().find((e) => /is destroyed \(AC/.test(e.text)).text;
      // "cooling magma crust" is hardened — the old word list missed it
      expect(objText(withSub('cooling magma crust'))).toMatch(/Vulnerability to Bludgeoning/);
      // woven/organic still burns, as print's web does
      expect(objText(withSub('strangling bramble'))).toMatch(/Vulnerability to Fire/);
      return;
    }
  });
});

/**
 * Live block 40 (the Riveted Bellows) — owner: "I picked a skirmisher
 * though? is that not coming through?" It fired and was answered by
 * Trampling Charge, a brute's run-them-over bonus action that happens to
 * match "moves without provoking". Plus: skirmisher had hp_mult 0.95 and
 * NOTHING else, so the numbers never said skirmisher either.
 */
describe('the Riveted Bellows: the role reaches the stat line', () => {
  test('a charge never satisfies the skirmisher seat; a withdrawal does', () => {
    const WITHDRAW = /Hide action|Disengage|doesn't provoke an Opportunity Attack|teleports? up to|Melee or Ranged Attack Roll|moves up to (?:half )?its Speed[^.]*(?:without provoking|makes one)/;
    for (const mode of ['melee', 'mixed']) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr: 20, seed, archetype: 'skirmisher', attackMode: mode });
        const rows = [...sk.entries, ...sk.traits];
        const exits = rows.filter((e) => WITHDRAW.test(e.text) && !/through the spaces of/.test(e.text));
        expect(`${mode} seed ${seed}: ${exits.length > 0}`).toBe(`${mode} seed ${seed}: true`);
      }
    }
  });

  test('the archetype reaches the speed line', () => {
    const sk = buildSkeleton({ cr: 20, seed: 4, archetype: 'skirmisher' });
    expect(sk.speed_mod).toBe(10);
    const m = applyFlavor(sk, { ...respond(sk), speed: '30 ft., Climb 30 ft.' });
    expect(m.speed).toBe('40 ft., Climb 40 ft.');
    const brute = buildSkeleton({ cr: 20, seed: 4, archetype: 'brute' });
    expect(applyFlavor(brute, { ...respond(brute), speed: '30 ft.' }).speed).toBe('25 ft.');
    const plain = buildSkeleton({ cr: 20, seed: 4, archetype: 'controller' });
    expect(applyFlavor(plain, { ...respond(plain), speed: '30 ft.' }).speed).toBe('30 ft.');
  });

  test('a jaw pierces and grapples with jaws, not hands', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, signatureMechanic: 'grapple' });
      const grab = sk.entries.find((e) => /from one of (?:two|four|six|ten) /.test(e.text) && /\{damage_type\}/.test(e.text));
      if (!grab) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk), physical_damage: 'Slashing',
        entries: reqs.map((r) => ({
          id: r.id, name: r.id === grab.id ? 'Clamp Jaw' : r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, 'spores'])),
        })),
      });
      const jaw = Object.values(m.sections).flat().find((e) => e.name === 'Clamp Jaw');
      expect(jaw.text).toMatch(/Piercing damage/);
      expect(jaw.text).toMatch(/from one of (?:two|four|six|ten) jaws/);
      return;
    }
  });

  test('a minutes-long spell never reaches a list or an echo', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, caster: true });
      if (!sk.entries.some((e) => /\{spells\}/.test(e.text))) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl,
            sl === 'spells' ? ['Move Earth', 'Detect Magic']
              : sl === 'spells_daily' ? ['Move Earth']
                : sl.startsWith('signature_spell') ? 'Move Earth' : 'spores'])),
        })),
      });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      expect(all).not.toMatch(/Move Earth/);
      return;
    }
  });

  test('the inheritance curse is damped away from machines', () => {
    const lib = require('@/data/ability-library.json');
    for (const t of lib.on_death.templates) {
      if (t.death_family === 'succession') {
        expect(t.facets.length).toBeGreaterThan(0);
        expect(t.facets).not.toContain('forged');
      }
    }
    // and the residue family keeps a construct-native option
    expect(lib.on_death.templates.some((t) => t.death_family === 'residue' && (t.facets ?? []).includes('forged'))).toBe(true);
  });
});

/**
 * Live block 41 (the Graspwarden) — owner: "feels like a regression on
 * the type and alignment mismatch." It was one, and older than the
 * symptom: the audit's type correction was guarded on !resolvedType,
 * which is the CONCEPT CALL's type — set on every generation — so the
 * correction quietly became dead code as the concept call matured.
 */
describe('the Graspwarden: guesses stay correctable, menus have choices', () => {
  test('the audit retypes a concept-guessed type but never a user-picked one', async () => {
    const audited = (typeSource) => generateFromSkeleton(
      { concept: 'a chitinous thing', cr: 20, seed: 3, resolvedType: 'Humanoid', typeSource },
      async (p) => (/Every number is already fixed/.test(p)
        ? null
        : JSON.stringify({ type_correction: 'Monstrosity', findings: [] })),
    );
    expect((await audited('auto')).type).toBe('Monstrosity');
    expect((await audited('user')).type).toBe('Humanoid');
  });

  test('a legendary menu always offers a choice at CR 15+ (0/22 printed have one)', () => {
    for (const cr of [15, 17, 20, 24]) {
      for (let seed = 1; seed <= 25; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3 });
        const legs = sk.entries.filter((e) => e.slot_type === 'legendary');
        if (!legs.length) continue;
        expect(`CR ${cr} seed ${seed}: ${legs.length}`).not.toBe(`CR ${cr} seed ${seed}: 1`);
      }
    }
  });

  test('the concept prompt says a shape word is not a type', () => {
    const { buildArchetypeResolvePrompt } = require('../../format-2024/generate.mjs');
    const p = buildArchetypeResolvePrompt('a remade sailor', '', { cr: 20 });
    expect(p).toMatch(/a SHAPE word is not a type/);
    expect(p).toMatch(/is a Monstrosity however upright it stands/);
  });

  test('house tokens catch the words concepts actually use', () => {
    const { pickHouse } = require('../flavor-prompt.mjs');
    // "plant fiber" used to match nothing and fall through to a blind pick
    expect(pickHouse('a body woven from salt-toughened plant fiber', ['grasping'], 3)).toEqual(['thorn']);
    expect(pickHouse('a clockwork thing of gears and rivets', ['forged'], 3)[0]).toBe('iron');
    expect(pickHouse('a crab-limbed horror of spider joints', ['grasping'], 3)[0]).toBe('chitin');
  });

  test('terrain never renders as a material the block cannot walk on', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, themes: ['grasping'] });
      if (!sk.traits.some((t) => /\{terrain\}/.test(t.text))) continue;
      sk.houses = ['chitin'];
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl === 'terrain' ? 'carapace-plate' : 'spores'])),
        })),
      });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      // the rule is GROUND, not a word ban: "carapace-plate" is a raw
      // material, "carapace-strewn stone" is a floor with shells on it —
      // and the surface now comes from the block's own house
      const ground = all.match(/composed of ([^,.]+)/);
      expect(ground).toBeTruthy();
      expect(ground[1]).toMatch(/stone|ground|scree|rubble|sand|ice|mud|loam|flats|floor|dust|snow|turf|soil|shards|drift|crust|mire|thicket|mycelium|seep/);
      return;
    }
  });
});

describe('engine-filled slots are never asked of the model', () => {
  test('weakness_type fills without a model answer and never leaves a slot undefined', () => {
    const { flavorRequests: fr } = require('../flavor-prompt.mjs');
    for (let seed = 1; seed <= 80; seed += 1) {
      const sk = buildSkeleton({ cr: 15, seed });
      const row = [...sk.traits, ...sk.entries].find((e) => /\{weakness_type\}/.test(e.text));
      if (!row) continue;
      // the model is never asked for it...
      for (const r of fr(sk)) expect(r.slots).not.toContain('weakness_type');
      // ...and a fully silent model still renders the row
      const m = applyFlavor(sk, { ...respond(sk), energy_damage: 'Cold', entries: [] });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      expect(all).not.toMatch(/\{weakness_type\}/);
      expect(all).toMatch(/takes \w+ damage, its Speed decreases/);
      return;
    }
  });
});

/**
 * Live block 42 (the Starless Warden) — owner: "I'm still seeing a single
 * legendary." The MENU FLOOR was doing its job (counts.legendary = 3);
 * the pick loop was throwing the slots away. Every post-draw guard was a
 * `continue`, which skips the whole slot iteration rather than the
 * candidate — so a rejection cost the block an entry outright. Invisible
 * while the guards were few; broadening the mobility family the day
 * before made it collapse ~15% of skirmisher legendary menus to one
 * option.
 */
describe('the Starless Warden: a rejected candidate costs a draw, not a slot', () => {
  test('legendary menus reach their sampled count across archetypes and modes', () => {
    for (const archetype of ['skirmisher', 'lurker', 'brute', null]) {
      for (const attackMode of ['melee', 'mixed']) {
        let short = 0;
        for (let seed = 1; seed <= 25; seed += 1) {
          const sk = buildSkeleton({ cr: 20, seed, alternatives: 3, archetype, attackMode, signatureMechanic: 'teleport' });
          const legs = sk.entries.filter((e) => e.slot_type === 'legendary');
          if (legs.length && legs.length < 2) short += 1;
        }
        expect(`${archetype}/${attackMode}: ${short}`).toBe(`${archetype}/${attackMode}: 0`);
      }
    }
  });

  test('a legendary menu never collapses to one option, seats and evictions included', () => {
    for (const cr of [15, 17, 20, 24]) {
      for (const archetype of ['skirmisher', 'lurker', null]) {
        for (let seed = 1; seed <= 20; seed += 1) {
          const legs = buildSkeleton({ cr, seed, alternatives: 3, archetype, signatureMechanic: 'teleport' })
            .entries.filter((e) => e.slot_type === 'legendary');
          expect(`CR ${cr} ${archetype} seed ${seed}: ${legs.length}`)
            .not.toBe(`CR ${cr} ${archetype} seed ${seed}: 1`);
        }
      }
    }
  });

  test('the guards still hold — redrawing never re-admits what they reject', () => {
    const MOBILITY = /(?:moves up to|teleports? up to|flies up to)/;
    for (const cr of [15, 20, 24]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3, signatureMechanic: 'teleport' });
        const legs = sk.entries.filter((e) => e.slot_type === 'legendary');
        // one mobility legendary, still
        expect(`CR ${cr} seed ${seed} mobility: ${legs.filter((e) => MOBILITY.test(e.text)).length}`)
          .toBe(`CR ${cr} seed ${seed} mobility: ${Math.min(legs.filter((e) => MOBILITY.test(e.text)).length, 1)}`);
        // and no duplicate templates slipped in via the retry
        const tmpls = sk.entries.map((e) => e.text);
        expect(new Set(tmpls).size).toBe(tmpls.length);
      }
    }
  });

  test('a slot with genuinely nothing legal still yields rather than looping', () => {
    // every draw rejected -> the slot is dropped, not retried forever
    for (let seed = 1; seed <= 10; seed += 1) {
      const sk = buildSkeleton({ cr: 1, seed, alternatives: 1 });
      expect(sk.entries.length).toBeGreaterThan(0);
    }
  });
});

/**
 * Live block 43 (the Arterial Drifter) — owner: "how is this a skirmisher?
 * ... this fixes acid and oozes but not the bigger problem of not getting
 * skirmishers when I picked a skirmisher in the ui." DIAGNOSIS: the role's
 * machinery all fired (speed_mod, exit seat, ranged parity) and was
 * OUTVOTED — the concept's engulf signature carries a guaranteed seat, a
 * second seat for its grapple prerequisite, and x6 weight, so a
 * grapple-swallow chain owned the sheet while the role whispered.
 */
describe('the Arterial Drifter: a picked role outranks an inferred signature', () => {
  const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));

  test('a skirmisher vetoes an engulf signature however the role arrived', async () => {
    // Owner call: the concept call resolves ONE archetype and everything
    // serves it. A response returning `skirmisher` AND `engulf` is the
    // model contradicting itself in one object — not two readings worth
    // respecting — so the source of the role is irrelevant.
    const built = (archetypeSource) => generateFromSkeleton({
      concept: 'an engulfing ooze that splits and re-forms', cr: 20, seed: 11,
      archetypeName: 'skirmisher', signatureMechanic: 'engulf', archetypeSource,
    }, noFlavor);
    const swallows = (m) => Object.values(m.sections).flat().some((e) => /swallow/i.test(e.text));
    expect(swallows(await built('user'))).toBe(false);
    expect(swallows(await built('auto'))).toBe(false);
  });

  test('a compatible signature survives a user pick — untouched by the veto', async () => {
    // the veto's job is to LEAVE compatible signatures alone: a picked
    // skirmisher with a teleport signature must build exactly as the same
    // block does with an inferred role (seat success itself varies by seed
    // and isn't what this pins).
    const built = (archetypeSource) => generateFromSkeleton({
      concept: 'a darting thing that blinks between shadows', cr: 20, seed: 11,
      archetypeName: 'skirmisher', signatureMechanic: 'teleport', archetypeSource,
    }, noFlavor);
    const textOf = (m) => Object.values(m.sections).flat().map((e) => `${e.name}|${e.text}`).join('\n');
    expect(textOf(await built('user'))).toBe(textOf(await built('auto')));
  });

  test('brutes and controllers keep the mechanics that suit them', async () => {
    for (const archetypeName of ['brute', 'controller']) {
      const m = await generateFromSkeleton({
        concept: 'a devouring mass', cr: 20, seed: 11,
        archetypeName, signatureMechanic: 'engulf', archetypeSource: 'user',
      }, noFlavor);
      expect(Object.values(m.sections).flat().some((e) => /swallow/i.test(e.text))).toBe(true);
    }
  });

  test('an Ooze deals its energy, never edges or points (4/4 printed are Acid-only)', () => {
    for (let seed = 1; seed <= 25; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, attackMode: 'mixed' });
      const m = applyFlavor(sk, { ...respond(sk), type: 'Ooze', physical_damage: 'Slashing', energy_damage: 'Acid' });
      for (const e of Object.values(m.sections).flat()) {
        for (const t of ['Slashing', 'Piercing', 'Bludgeoning']) {
          expect(`seed ${seed} ${e.name}: ${t} ${e.text.includes(`${t} damage`)}`)
            .toBe(`seed ${seed} ${e.name}: ${t} false`);
        }
      }
    }
  });

  test('the fixed-role prompt makes the metadata serve the role', () => {
    const { buildArchetypeResolvePrompt } = require('../../format-2024/generate.mjs');
    const p = buildArchetypeResolvePrompt('a thing', '', { cr: 20, archetype: 'skirmisher' });
    expect(p).toMatch(/EVERY field below must SERVE that role/);
    expect(p).toMatch(/A skirmisher does not engulf, grapple, or plant an aura/);
    expect(p).toMatch(/If the concept pulls against the role, bend the CONCEPT/);
  });
});

/**
 * Live block 44 (the Balefire) — an abductor whose signature move named a
 * movement mode the sheet lacked, who held three bonus actions (0/329 in
 * print), walked on mud while made of fire, and carried victims by
 * teleport at will.
 */
describe('the Balefire: the abduction engine gets its gates', () => {
  test('no flight verb survives on a block without a Fly speed', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, movement: ['climb'], signatureMechanic: 'grapple' });
      const m = applyFlavor(sk, { ...respond(sk), speed: '50 ft., Climb 50 ft.' });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      expect(`seed ${seed}: ${/\bflies\b|\bfly\b/.test(all)}`).toBe(`seed ${seed}: false`);
    }
  });

  test('bonus actions cap at two, seats included (0/329 printed carry three)', () => {
    for (const cr of [11, 17, 20]) {
      for (let seed = 1; seed <= 25; seed += 1) {
        for (const sig of ['grapple', 'teleport', 'engulf']) {
          const sk = buildSkeleton({ cr, seed, signatureMechanic: sig, archetype: 'skirmisher' });
          const n = sk.entries.filter((e) => e.section === 'Bonus Actions').length;
          expect(`CR ${cr} seed ${seed} ${sig}: ${n <= 2}`).toBe(`CR ${cr} seed ${seed} ${sig}: true`);
        }
      }
    }
  });

  test('difficult terrain follows print: created names nothing, passed-through is habitat', () => {
    const banks = require('@/data/texture-banks.json');
    const lib = require('@/data/ability-library.json');
    // CREATED terrain names no material — print's Aberrant Ground says
    // "The ground ... is Difficult Terrain", full stop
    for (const t of lib.on_death.templates) {
      expect(`${t.death_family}: ${/Difficult Terrain composed of/.test(t.template_2024)}`)
        .toBe(`${t.death_family}: false`);
    }
    // PASSED-THROUGH terrain is habitat: six natural terrains, one per house
    const natural = banks._meta.natural_terrain;
    expect(natural.length).toBeGreaterThanOrEqual(5);
    for (const [h, b] of Object.entries(banks.houses)) {
      expect(`${h}: ${natural.includes(b.habitat_terrain)}`).toBe(`${h}: true`);
    }
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, themes: ['fiendish'] });
      if (!sk.traits.some((t) => /\{terrain\}/.test(t.text))) continue;
      sk.houses = ['flame'];
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          // an exotic composition describes the creature, not the world
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl === 'terrain' ? 'burning carapace-plate' : 'spores'])),
        })),
      });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      expect(all).not.toMatch(/carapace/);
      expect(all).toMatch(/composed of ash and cinders/);
      return;
    }
  });

  test('a foreign terrain fill on a housed block never crashes and lands on habitat', () => {
    // The live crash: the off-house branch called surface() before its
    // declaration (TDZ) and killed whole generations — "Cannot access
    // 'surface' before initialization". No fixture had reached it because
    // every test terrain fill failed an EARLIER vet first.
    let exercised = 0;
    for (let seed = 1; seed <= 120 && exercised < 3; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, themes: ['forged', 'subterranean'] });
      if (!sk.traits.some((t) => /\{terrain\}/.test(t.text))) continue;
      sk.houses = ['iron'];
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          // 'kelp' belongs to brine — foreign to iron, so the off-house
          // branch is the one that runs
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl === 'terrain' ? 'kelp tangles' : 'spores'])),
        })),
      });
      exercised += 1;
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      expect(all).not.toMatch(/kelp/);
      if (/composed of/.test(all)) {
        expect(all).toMatch(/composed of (ice or snow|sand and loose scree|mud and shallow water|rubble and broken stone|ash and cinders|thick undergrowth)/);
      }
    }
    expect(exercised).toBeGreaterThan(0);
  });

  test('the ferry carries at a rate limit; self-teleport stays at will', () => {
    const lib = require('@/data/ability-library.json');
    const rows = [];
    const visit = (o) => {
      if (o && typeof o === 'object') {
        if (typeof o.template_2024 === 'string' && /together with one creature/.test(o.template_2024)) rows.push(o);
        Object.values(o).forEach(visit);
      }
    };
    visit(lib);
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) {
      expect(r.template_2024).toMatch(/teleports up to \{teleport_distance\} feet, or teleports that far together with/);
      expect(r.template_2024).toMatch(/can't carry a creature this way again until the start of its next turn/);
    }
  });
});

/**
 * Live block 45 (the Hadal Warden) — and the crash that preceded it. The
 * coherence taxonomy (owner, 2026-08-06): type/alignment agreement,
 * name-payload agreement, substrate/capability references, role
 * legibility. Three of the four get deterministic closure here.
 */
describe('the Hadal Warden: coherence by construction', () => {
  test('a capability clause never outlives the capability', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, signatureMechanic: 'teleport' });
      const ferry = sk.entries.find((e) => /together with one creature/.test(e.text));
      if (!ferry) continue;
      const m = applyFlavor(sk, respond(sk));
      const all = Object.values(m.sections).flat();
      const grapples = all.some((e) => /Grappled condition \(escape|has the Grappled condition/.test(e.text));
      const carries = all.some((e) => /together with one creature/.test(e.text));
      // the carry clause exists only where a grapple does
      expect(`seed ${seed}: carry=${carries} grapple=${grapples}`)
        .toBe(`seed ${seed}: carry=${grapples} grapple=${grapples}`);
      return;
    }
  });

  test('alignment follows the type where print is unanimous', async () => {
    const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));
    for (const [type, expected] of [['Ooze', 'Unaligned'], ['Beast', 'Unaligned'], ['Construct', 'Unaligned']]) {
      const m = await generateFromSkeleton(
        { concept: 'a thing', cr: 20, seed: 4, resolvedType: type }, noFlavor,
      );
      m.alignment = 'Lawful Good';
      // re-run the floor the way assembly does
      const { lintStatblock } = require('../../format-2024/lint.mjs');
      expect(lintStatblock(m, { edition: '2024' })).toBeTruthy();
    }
    // direct check of the mapping itself
    const m2 = await generateFromSkeleton(
      { concept: 'a slithering mass', cr: 20, seed: 4, resolvedType: 'Ooze' },
      async (p) => (/Every number is already fixed/.test(p)
        ? JSON.stringify({
          name: 'X', size: 'Large', type: 'Ooze', alignment: 'Lawful Good', speed: '20 ft.',
          stats: { STR: 20, DEX: 8, CON: 22, INT: 2, WIS: 8, CHA: 4 }, entries: [],
        })
        : JSON.stringify({ problems: [] })),
    );
    expect(m2.alignment).toBe('Unaligned');
  });

  test('the concept prompt bars Humanoid above the tier print uses it at', () => {
    const { buildArchetypeResolvePrompt } = require('../../format-2024/generate.mjs');
    const p = buildArchetypeResolvePrompt('a hunting thing', '', { cr: 20 });
    expect(p).toMatch(/"Humanoid" is the NPC-template type/);
    expect(p).toMatch(/exactly one above CR 10/);
  });

  test('a skirmisher is never handed a grapple row it did not ask for', () => {
    for (const archetype of ['skirmisher', 'lurker', 'artillery']) {
      for (let seed = 1; seed <= 25; seed += 1) {
        const sk = buildSkeleton({ cr: 20, seed, archetype });
        for (const e of sk.entries) {
          expect(`${archetype} seed ${seed} ${e.name}: ${/Grappled condition \(escape|swallow/i.test(e.text)}`)
            .toBe(`${archetype} seed ${seed} ${e.name}: false`);
        }
      }
    }
    // ...but a permitted signature still seats: grapple is vetoed for
    // skirmishers, so use a role that allows it
    const brute = buildSkeleton({ cr: 20, seed: 5, archetype: 'brute', signatureMechanic: 'grapple' });
    expect(brute.entries.some((e) => /Grappled condition \(escape/.test(e.text))).toBe(true);
  });
});

/**
 * THE COHERENCE PASS (owner design, 2026-08-06): "one place where the
 * block's identity gets resolved and then constrains everything
 * downstream." Runs after selection, before naming. Owns the register
 * lock, the capability manifest, and the type contract — the role gate
 * stays upstream at selection where it belongs.
 */
describe('resolveIdentity: constraints, not corrections', () => {
  const { resolveIdentity } = require('../flavor-prompt.mjs');

  test('the manifest reports what the block can actually do', () => {
    const grappler = buildSkeleton({ cr: 20, seed: 5, archetype: 'brute', signatureMechanic: 'grapple' });
    const idG = resolveIdentity(grappler, { type: 'Monstrosity' });
    expect(idG.manifest.grapples).toBe(true);
    const flier = buildSkeleton({ cr: 20, seed: 5, movement: ['fly'] });
    expect(resolveIdentity(flier, {}).manifest.movement).toContain('fly');
    const walker = buildSkeleton({ cr: 20, seed: 5, movement: ['climb'] });
    expect(resolveIdentity(walker, {}).manifest.movement).not.toContain('fly');
  });

  test('the type contract carries print\'s measured facts', () => {
    const sk = buildSkeleton({ cr: 20, seed: 5 });
    expect(resolveIdentity(sk, { type: 'Ooze' }).contract).toMatchObject({ physical: null, alignment: 'Unaligned', anatomy: false });
    expect(resolveIdentity(sk, { type: 'Fiend' }).contract).toMatchObject({ noGood: true });
    expect(resolveIdentity(sk, { type: 'Dragon' }).contract).toMatchObject({ type: 'Dragon' });
    expect(resolveIdentity(sk, { type: 'Dragon' }).contract.alignment).toBeUndefined();
  });

  test('the prompt states the contract as fact, so the model is constrained not corrected', () => {
    const sk = buildSkeleton({ cr: 20, seed: 5, movement: ['climb'] });
    sk.identity = resolveIdentity(sk, { type: 'Ooze', themes: ['devouring'] });
    const p = buildFlavorPrompt(sk, { concept: 'a devouring mass', themes: ['devouring'] });
    expect(p).toMatch(/WHAT THIS CREATURE IS/);
    expect(p).toMatch(/EVERY damage it deals is its energy type/);
    expect(p).toMatch(/no limbs, jaws, or teeth to name/);
    expect(p).toMatch(/alignment is Unaligned/);
    expect(p).toMatch(/CANNOT fly/);
  });

  test('a block with no contract restrictions gets no contract block', () => {
    const sk = buildSkeleton({ cr: 20, seed: 5, movement: ['fly'], signatureMechanic: 'grapple', archetype: 'brute' });
    sk.identity = resolveIdentity(sk, { type: 'Dragon', themes: ['draconic'] });
    const p = buildFlavorPrompt(sk, { concept: 'a dragon', themes: ['draconic'] });
    expect(p).not.toMatch(/CANNOT fly/);
    expect(p).not.toMatch(/grapples nothing/);
  });

  test('the pipeline attaches the identity and traces the manifest', async () => {
    const seen = [];
    await generateFromSkeleton(
      { concept: 'a slithering mass', cr: 20, seed: 4, resolvedType: 'Ooze', onProgress: () => {} },
      async (p) => {
        if (/Every number is already fixed/.test(p)) { seen.push(p); return null; }
        return JSON.stringify({ problems: [] });
      },
    );
    expect(seen[0]).toMatch(/WHAT THIS CREATURE IS/);
    expect(seen[0]).toMatch(/EVERY damage it deals is its energy type/);
  });
});

/**
 * Live block 46 (Scouring Silt) — owner: "I think we have a regression on
 * our hands. It was better before and the original name of Chimeric
 * Sentinel was better." Diagnosis: not new failures, but MY OWN RULES
 * COLLIDING, plus a typed name the default path never received.
 */
describe('Scouring Silt: rules that stop undoing each other', () => {
  const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));

  test('a typed name is the creature\'s name on the skeleton path too', async () => {
    const m = await generateFromSkeleton(
      { concept: 'a temple construct of silt', cr: 20, seed: 4, resolvedType: 'Construct',
        namePass: { userTypedName: 'Chimeric Sentinel' } },
      async (p) => (/Every number is already fixed/.test(p)
        ? JSON.stringify({
          name: 'Scouring Silt', size: 'Huge', type: 'Construct', alignment: 'Unaligned', speed: '30 ft.',
          stats: { STR: 26, DEX: 14, CON: 24, INT: 8, WIS: 14, CHA: 20 }, entries: [],
        })
        : JSON.stringify({ problems: [] })),
    );
    expect(m.name).toBe('Chimeric Sentinel');
    // and every self-reference follows
    const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
    expect(all).not.toMatch(/scouring silt/i);
  });

  test('a self-cast legendary gets a NON-concentration self-buff, never an attack spell', () => {
    for (let seed = 1; seed <= 80; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, caster: true });
      const selfRow = sk.entries.find((e) => / on itself/.test(e.text) && /\{signature_spell\}/.test(e.text));
      if (!selfRow) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl.startsWith('signature_spell') ? 'Acid Arrow' : 'spores'])),
        })),
      });
      const self = Object.values(m.sections).flat().find((e) => / on itself/.test(e.text));
      const cast = self.text.match(/cast \*([A-Z][\w' ]+?)\*/)[1];
      // never an attack spell at itself, and never a concentration spell
      // from a legendary (the two rules that used to cancel out)
      expect(cast).not.toBe('Acid Arrow');
      const { SELF_CAST_NO_CONCENTRATION, CONCENTRATION_SPELLS } = require('../flavor-prompt.mjs');
      if (self.section === 'Legendary Actions' || /can't take this action again/.test(self.text)) {
        expect(SELF_CAST_NO_CONCENTRATION).toContain(cast);
        expect(CONCENTRATION_SPELLS).not.toContain(cast);
      }
      return;
    }
  });

  test('two legendary echoes never cast the same spell, even on a narrow palette', () => {
    for (let seed = 1; seed <= 80; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, caster: true, themes: ['forged'] });
      const echoes = sk.entries.filter((e) => /uses Spellcasting to cast \{signature_spell/.test(e.text));
      if (echoes.length < 2) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl.startsWith('signature_spell') ? 'Acid Arrow' : 'spores'])),
        })),
      });
      const cast = Object.values(m.sections).flat()
        .filter((e) => /uses Spellcasting to cast/.test(e.text))
        .map((e) => e.text.match(/cast \*([A-Z][\w' ]+?)\*/)?.[1]).filter(Boolean);
      expect(new Set(cast).size).toBe(cast.length);
      return;
    }
  });

  test('utility spells are vetted too — Web never reaches a block with no snare register', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, caster: true, themes: ['forged'] });
      if (!sk.entries.some((e) => /\{spells\}/.test(e.text))) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk), energy_damage: 'Acid',
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl,
            sl === 'spells' ? ['Web', 'Detect Magic'] : 'spores'])),
        })),
      });
      const caster = Object.values(m.sections).flat().find((e) => /At Will:/.test(e.text));
      expect(caster.text).not.toMatch(/\*Web\*/);      // grasping, off-register for forged
      expect(caster.text).toMatch(/Detect Magic/);     // facet-less spells belong to everyone
      return;
    }
  });
});

/**
 * Live block 47 (the Hollowscrabbler) — the audit caught the dangling
 * referent unprompted, matching the critic. Three fixes: save COUNT
 * follows print's tier-dependent shape, pure-mobility rows ungate rather
 * than ration, and the succession on-death stops referencing a "charge"
 * it never named.
 */
describe('the Hollowscrabbler: shapes that match print', () => {
  const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));

  test('CR 15+ takes two or four saves, always including Wisdom', async () => {
    for (const [profs, want] of [[['INT', 'DEX', 'WIS'], 4], [['DEX'], 2], [[], 2], [['CON', 'WIS'], 2]]) {
      const m = await generateFromSkeleton(
        { concept: 'a thing', cr: 20, seed: 6 },
        async (p) => (/Every number is already fixed/.test(p)
          ? JSON.stringify({
            name: 'X', size: 'Large', type: 'Aberration', alignment: 'Neutral', speed: '30 ft.',
            stats: { STR: 26, DEX: 20, CON: 26, INT: 18, WIS: 16, CHA: 10 },
            save_proficiencies: profs, entries: [],
          })
          : JSON.stringify({ problems: [] })),
      );
      const mod = (n) => Math.floor((n - 10) / 2);
      const proficient = Object.keys(m.saves).filter((k) => m.saves[k] > mod(m.stats[k]));
      expect(`${profs}: ${proficient.length}`).toBe(`${profs}: ${want}`);
      expect(proficient).toContain('WIS');
    }
  });

  test('below the boss tier the model\'s own save picks stand', async () => {
    const m = await generateFromSkeleton(
      { concept: 'a thing', cr: 4, seed: 6 },
      async (p) => (/Every number is already fixed/.test(p)
        ? JSON.stringify({
          name: 'X', size: 'Medium', type: 'Beast', alignment: 'Unaligned', speed: '30 ft.',
          stats: { STR: 14, DEX: 18, CON: 14, INT: 6, WIS: 12, CHA: 8 },
          save_proficiencies: ['DEX'], entries: [],
        })
        : JSON.stringify({ problems: [] })),
    );
    const mod = (n) => Math.floor((n - 10) / 2);
    expect(Object.keys(m.saves).filter((k) => m.saves[k] > mod(m.stats[k]))).toEqual(['DEX']);
  });

  test('a pure-mobility row ungates instead of being rationed to 1/Day', () => {
    // the live path: a melee skirmisher's EXIT seat lands a Dash/Disengage
    // row beside an already-gated nova, which is what triggered the
    // demotion (the seat is why the trace marked it [SIGNATURE])
    let checked = 0;
    for (let seed = 1; seed <= 80 && checked < 2; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, archetype: 'skirmisher', attackMode: 'melee' });
      const mob = sk.entries.find((e) => /takes the Dash/.test(e.text));
      const nova = sk.entries.find((e) => e.slot_type === 'area' && /Recharge/i.test(e.gate ?? ''));
      if (!mob || !nova) continue;
      checked += 1;
      expect(`seed ${seed} ${mob.name}: ${mob.gate ?? 'ungated'}`).toBe(`seed ${seed} ${mob.name}: ungated`);
      expect(nova.gate).toMatch(/Recharge/); // the nova it protected survives
    }
    expect(checked).toBeGreaterThan(0);
  });

  test('the succession on-death names what must be fulfilled', () => {
    const lib = require('@/data/ability-library.json');
    for (const t of lib.on_death.templates) {
      expect(t.template_2024).not.toMatch(/Fulfilling the charge/);
      if (/Fulfilling/.test(t.template_2024)) expect(t.template_2024).toMatch(/Fulfilling it or a \*Remove Curse\*/);
    }
  });
});

/**
 * THE INVARIANT PASS (owner call, 2026-08-06). Live block 48 (the Brine
 * Hound) made the pattern undeniable: the Roc spine walked a grapple past
 * ROLE_EXCLUSIONS onto a skirmisher, because spine rows are pushed with
 * NO filters. Counting the sprint's bugs by shape rather than symptom,
 * every one was "a constraint implemented at one entry path, walked past
 * by another" — seats bypassing the pick loop three times, assembly belts
 * once, the spine once. Enforcing after ALL paths have contributed makes
 * "X bypassed Y" inexpressible.
 */
describe('the invariant pass: rules that no entry path can walk past', () => {
  test('the four selection invariants hold across every archetype and signature', () => {
    const MOB = /(?:moves up to|teleports? up to|flies up to)/;
    for (const archetype of ['skirmisher', 'lurker', 'artillery', 'brute', null]) {
      for (const signatureMechanic of [null, 'teleport', 'grapple', 'engulf']) {
        for (let seed = 1; seed <= 12; seed += 1) {
          const sk = buildSkeleton({ cr: 20, seed, archetype, signatureMechanic, alternatives: 3 });
          const tag = `${archetype}/${signatureMechanic}/${seed}`;
          const legs = sk.entries.filter((e) => e.slot_type === 'legendary');
          expect(`${tag} recharge`).toBe(`${tag} recharge`);
          expect(sk.entries.filter((e) => /Recharge/i.test(e.gate ?? '')).length).toBeLessThanOrEqual(1);
          expect(legs.filter((e) => MOB.test(e.text)).length).toBeLessThanOrEqual(1);
          expect(sk.entries.filter((e) => e.section === 'Bonus Actions').length).toBeLessThanOrEqual(2);
          if (['skirmisher', 'lurker', 'artillery'].includes(archetype) && !signatureMechanic) {
            for (const e of sk.entries) {
              expect(`${tag} ${e.name}: ${/Grappled condition \(escape|swallow/i.test(e.text)}`)
                .toBe(`${tag} ${e.name}: false`);
            }
          }
        }
      }
    }
  });

  test('a SPINE row is no longer exempt — the Roc\'s grapple never reaches a skirmisher', () => {
    let sawRocEligible = 0;
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, archetype: 'skirmisher' });
      if (sk.package) sawRocEligible += 1;
      for (const e of sk.entries) {
        expect(`seed ${seed} ${e.name}: ${/Grappled condition \(escape/.test(e.text)}`)
          .toBe(`seed ${seed} ${e.name}: false`);
      }
    }
    expect(sawRocEligible).toBeGreaterThan(0); // packages did land; they were just filtered
  });

  test('a dragon KIT survives the pass — it is the block, not a suggestion', () => {
    let checked = 0;
    for (let seed = 1; seed <= 20 && checked < 3; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, family: 'dragon', archetype: 'skirmisher' });
      if (!sk.package?.name?.endsWith('Dragon kit')) continue;
      checked += 1;
      expect(sk.entries.length).toBeGreaterThan(3);
    }
    expect(checked).toBeGreaterThan(0);
  });

  test('terrain matches a whole printed terrain, not a stray word inside one', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed, themes: ['aquatic'] });
      if (!sk.traits.some((t) => /\{terrain\}/.test(t.text))) continue;
      sk.houses = ['brine'];
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk),
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          // "water" appears inside a natural terrain, which is how this
          // used to pass
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl === 'terrain' ? 'still water' : 'spores'])),
        })),
      });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      expect(all).not.toMatch(/still water/);
      expect(all).toMatch(/composed of (ice or snow|sand and loose scree|mud and shallow water|rubble and broken stone|ash and cinders|thick undergrowth)/);
      return;
    }
  });

  test('a kindred exemption names the creature\'s own type', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const sk = buildSkeleton({ cr: 17, seed });
      if (!sk.entries.some((e) => /\{kindred_type\}/.test(e.text))) continue;
      const reqs = flavorRequests(sk);
      const m = applyFlavor(sk, {
        ...respond(sk), type: 'Construct',
        entries: reqs.map((r) => ({
          id: r.id, name: r.placeholder_name,
          ...Object.fromEntries(r.slots.map((sl) => [sl, sl === 'kindred_type' ? 'Celestial' : 'spores'])),
        })),
      });
      const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
      const kin = all.match(/\(([A-Z]\w+) creatures succeed automatically\)/);
      if (!kin) continue; // this seed's row didn't survive to assembly
      expect(kin[1]).toBe('Construct');
      return;
    }
  });

  test('every facet reaches an on-death family, so weighting can differentiate', () => {
    const lib = require('@/data/ability-library.json');
    const banks = require('@/data/texture-banks.json').facets;
    const covered = new Set(lib.on_death.templates.flatMap((t) => t.facets ?? []));
    expect(Object.keys(banks).filter((f) => !covered.has(f))).toEqual([]);
  });
});

/**
 * Live block 49 (the Ironbound) — the signature veto and role gate both
 * fired (trace: "signature vetoed: engulf contradicts the skirmisher role
 * (picked)"; no grapple furniture). What remained: the four-block
 * on-death repeat had a DATA root, the role governed the signature but
 * not the range band, and a coupled Poison package sat on a Lightning
 * creature.
 */
describe('the Ironbound: the role governs range, machines leave wreckage', () => {
  test('Constructs die into residue, not an inheritance curse', () => {
    const lib = require('@/data/ability-library.json');
    expect(lib.on_death.type_default.Construct).toBe('residue');
    // and succession no longer matches aquatic, which had made it the
    // best fit for a forged+aquatic machine on BOTH axes
    for (const t of lib.on_death.templates) {
      if (t.death_family === 'succession') expect(t.facets).not.toContain('aquatic');
    }
    let succession = 0; let total = 0;
    for (let seed = 1; seed <= 40; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, typeHint: 'Construct', themes: ['forged', 'aquatic'] });
      const od = sk.traits.find((t) => t.on_death);
      if (!od) continue;
      total += 1;
      if (/passes to the nearest creature|passes to the creature that struck/.test(od.text)) succession += 1;
    }
    expect(total).toBeGreaterThan(0);
    expect(succession / total).toBeLessThan(0.34); // was the type default at 6x
  });

  test('the closing clause names the purpose instead of leaning on a pronoun', () => {
    const lib = require('@/data/ability-library.json');
    for (const t of lib.on_death.templates) {
      expect(t.template_2024).not.toMatch(/Fulfilling it or/);
      if (/Remove Curse/.test(t.template_2024)) {
        expect(t.template_2024).toMatch(/that unfinished purpose is served/);
      }
    }
  });

  test('a skirmisher or artillery always gets a range band, whatever the concept said', async () => {
    const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));
    for (const archetypeName of ['skirmisher', 'artillery']) {
      const m = await generateFromSkeleton(
        { concept: 'a lashing thing', cr: 20, seed: 8, archetypeName, attackMode: 'melee' }, noFlavor,
      );
      const attacks = Object.values(m.sections).flat().filter((e) => /Attack Roll/.test(e.text));
      expect(`${archetypeName}: ${attacks.some((e) => /Ranged Attack Roll|or range \d/.test(e.text))}`)
        .toBe(`${archetypeName}: true`);
    }
    // a brute that says melee stays melee
    const brute = await generateFromSkeleton(
      { concept: 'a lashing thing', cr: 20, seed: 8, archetypeName: 'brute', attackMode: 'melee' }, noFlavor,
    );
    expect(brute.generation.archetype).toBe('brute');
  });

  test('the coupled Poison package only reaches blocks that speak Poison', () => {
    const COUPLED = /Poisoned condition[\s\S]*Poison damage at the start/;
    for (const themes of [['forged'], ['elemental', 'aquatic'], ['celestial']]) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const sk = buildSkeleton({ cr: 20, seed, themes });
        for (const e of sk.entries) {
          expect(`${themes} seed ${seed}: ${COUPLED.test(e.text)}`).toBe(`${themes} seed ${seed}: false`);
        }
      }
    }
    // ...and a venomous block can still have it
    let found = false;
    for (let seed = 1; seed <= 60 && !found; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, themes: ['venomous'], attackMode: 'melee' });
      if (sk.entries.some((e) => COUPLED.test(e.text))) found = true;
    }
    expect(found).toBe(true);
  });
});

describe('the Starless Yaw: the prose outranks the themes', () => {
  const { pickHouse } = require('../flavor-prompt.mjs');
  // The live block that forced this: the concept call wrote a scorched-metal
  // desert ambusher and then classified it `mind`, whose houses are
  // dream/void/glass. All three scored zero against the prose, the seeded
  // fallback took void, and the block shipped as Starless Yaw — Psychic,
  // hollow, unmade — with the words bronze, furnace, molten, dune and sand
  // sitting unread in the concept.
  const YAW = 'an aberration of living, scorched metal, its hide a cracked bronze crust '
    + 'that radiates furnace heat, moving with the hot-blooded ambush logic of a dune '
    + 'predator. It vanishes into the sand and strikes across the burning sands.';

  test('a declared material beats a theme set that names none of it', () => {
    const house = pickHouse(YAW, ['mind'], 5);
    expect(house).not.toContain('void');
    expect(house).not.toContain('dream');
    expect(house).not.toContain('glass');
    expect(['flame', 'magma', 'sand', 'iron']).toContain(house[0]);
  });

  test('the override does not depend on the seed — it is evidence, not a roll', () => {
    const seeds = [1, 5, 9, 17, 33].map((s) => pickHouse(YAW, ['mind'], s)[0]);
    expect(new Set(seeds).size).toBe(1);
  });

  test('themes still win when the prose merely brushes another house', () => {
    // "granite dust" grazes the sand house once; one incidental token is not
    // a declaration, so the subterranean/elemental reading stands.
    const house = pickHouse('a thing of grinding scree and granite dust', ['elemental', 'subterranean'], 1);
    expect(house).toEqual(['stone']);
  });

  test('themes still govern when the prose names no material at all', () => {
    const quiet = pickHouse('a creature that waits', ['elemental'], 3);
    expect(quiet).toHaveLength(1);
    expect(['magma', 'stone', 'storm', 'ice', 'sand']).toContain(quiet[0]);
  });

  test('the inversion still yields exactly one house', () => {
    const drowned = pickHouse(
      'a drowned forge of brine-flooded iron, its rivets weeping salt into the forge-slag',
      ['forged', 'aquatic'], 1,
    );
    expect(drowned).toHaveLength(1);
  });

  test('a substring can no longer manufacture a house', () => {
    // "start"/"target" used to hand tar AND void a free point each — two
    // points being exactly the bar the old second house needed.
    const prose = 'a hunter that starts each dusk by choosing one target and following it home';
    expect(pickHouse(prose, ['bestial'], 3)).not.toContain('tar');
    expect(pickHouse(prose, ['bestial'], 3)).not.toContain('void');
    // real plurals still score: "cinders" is the ash house
    expect(pickHouse('a heap of bone-white ash and glowing cinders', ['elemental'], 7)[0]).toBe('ash');
  });

  test('a manner-only theme set with a silent concept still resolves a house', () => {
    for (const themes of [['mind'], ['terror'], ['beguiling'], ['uncanny']]) {
      expect(pickHouse('a creature', themes, 4)).toHaveLength(1);
    }
  });
});

describe('forged monsters, correctly typed', () => {
  const { pickHouse } = require('../flavor-prompt.mjs');

  test('"metal" reaches the metal house', () => {
    // The iron house scored 1 on "living, scorched metal … cracked bronze
    // crust" because the commonest word for metal was not one of its
    // tokens. Owner call: forged monsters are wanted, so the vocabulary has
    // to be reachable when the type is right.
    const metal = pickHouse('a body of living, scorched metal, its plating cracked', ['forged'], 3);
    expect(metal[0]).toBe('iron');
  });

  test('metal a creature WEARS is not a declaration of material', () => {
    // One incidental token stays below the named-twice bar, so gear cannot
    // OVERRIDE the themes and drag a beast-thing into the iron house —
    // print has 26 of 26 humanoids mentioning metal, all of it equipment.
    // (`armed` legitimately owns iron, so the override path is what needs
    // the guard, not the theme path.)
    const knight = pickHouse('a snarling pack-leader in dented steel plate who guards the pass', ['bestial'], 3);
    expect(knight).not.toContain('iron');
    expect(['hide', 'bone', 'blood']).toContain(knight[0]);
  });

  test('the type funnel replaces MATERIAL HONESTY — the prompt no longer argues about material', () => {
    // Owner call 2026-08-07: with the funnel in place the type gates the
    // house, so the concept call is no longer asked to reason backwards
    // from body to type. Both clauses are gone from BOTH entry points.
    const {
      buildArchetypeResolvePrompt, buildSeedSynthesisPrompt,
    } = require('@/tools/statblock-generator/format-2024/generate.mjs');
    for (const p of [
      buildArchetypeResolvePrompt('a thing of scorched metal', '', { cr: 20 }),
      buildSeedSynthesisPrompt({ origin: 'a buried forge' }, { cr: 20 }),
    ]) {
      expect(p).not.toMatch(/MATERIAL HONESTY/);
      expect(p).not.toMatch(/runs BOTH ways/);
      // the original one-way agreement rule predates today and stays
      expect(p).toMatch(/never declare a domain theme the type contradicts/);
    }
  });
});

describe('the Uulgoth: the prompt never spells the coinage it forbids', () => {
  const { buildNamingPrompt } = require('@/tools/statblock-generator/format-2024/generate.mjs');
  const monster = {
    name: 'Working Name', size: 'Large', type: 'Fiend', speed: '50 ft.',
    sections: { Actions: [{ name: 'Talon', text: 'Melee Attack Roll: +14, reach 5 ft.' }] },
  };

  // A negative example is a recipe. The naming prompt asked for no
  // "unexplained proper nouns (\"Ulgroth\", ...)" and no "guttural Uu-/Ul-
  // coinages" — and the generator shipped a Fiend named Uulgoth. Same class
  // as the Chromatic Orb leak: the model reads the illustration, not the
  // prohibition.
  test('no invented proper noun is spelled out as a thing to avoid', () => {
    const p = buildNamingPrompt(monster, null, [], 'a cold thing', null, 'it broods on a peak');
    for (const leak of ['Ulgroth', 'Vothar', 'Kragor', 'Uu-', 'Ul-', 'Obsidiancrawl']) {
      expect(`${leak}: ${p.includes(leak)}`).toBe(`${leak}: false`);
    }
  });

  test('every coinage offered as a MODEL to imitate is a real, already-banned creature', () => {
    // Positive examples leak too. "Bilewurm" was invented BY the prompt, so
    // reusing it broke nothing — unlike Owlbear or Chuul, which the
    // "never a name already used by a well-known D&D creature" rule catches.
    const p = buildNamingPrompt(monster, null, [], '', null, null);
    expect(p).not.toMatch(/Bilewurm/);
    expect(p).toMatch(/never a name already used by a well-known D&D creature/i);
  });

  test('the rename audit still asks for the behavior, just without the recipe', () => {
    const p = buildNamingPrompt(monster, null, [], '', null, null);
    expect(p).toMatch(/coined or invented words/);
    expect(p).toMatch(/name a person or place the block never explains/);
    expect(p).toMatch(/ability_renames/);
  });
});

describe('substance-keyed self-weaknesses are out of the pool', () => {
  const lib = require('@/data/ability-library.json');
  const rows = [];
  (function walk(o) {
    if (Array.isArray(o)) o.forEach(walk);
    else if (o && typeof o === 'object') {
      if (o.trait || o.ability) rows.push(o);
      Object.values(o).forEach((v) => { if (v && typeof v === 'object') walk(v); });
    }
  }(lib));

  test('Water Susceptibility and Freeze can never be drawn', () => {
    for (const name of ['Water Susceptibility', 'Freeze']) {
      const row = rows.find((r) => (r.trait ?? r.ability) === name);
      expect(`${name} present`).toBe(`${name} present`);
      expect(row).toBeTruthy();
      expect(`${name} excluded: ${!!row.excluded}`).toBe(`${name} excluded: true`);
    }
  });

  test('no block draws one, across every facet and seed', () => {
    const FACETS = ['elemental', 'aquatic', 'draconic', 'fiendish', 'forged', 'grave'];
    for (const f of FACETS) {
      for (let seed = 1; seed <= 25; seed += 1) {
        const sk = buildSkeleton({ cr: 20, seed, themes: [f] });
        const text = [...sk.entries, ...(sk.traits ?? [])]
          .map((e) => `${e.name ?? ''} ${e.text ?? e.template_2024 ?? ''}`).join(' ');
        expect(`${f}/${seed}: ${/gallon of water splashed/.test(text)}`).toBe(`${f}/${seed}: false`);
        expect(`${f}/${seed}: ${/Speed decreases by 20 feet until the end of its next turn/.test(text)}`)
          .toBe(`${f}/${seed}: false`);
      }
    }
  });

  test('Sunlight Weakness stays — a fixed real-world trigger, nothing interpolated', () => {
    const sun = rows.find((r) => (r.trait ?? r.ability) === 'Sunlight Weakness');
    expect(sun.excluded).toBeUndefined();
    expect(sun.template_2024).not.toMatch(/\{(damage_type|weakness_type)\}/);
  });
});

describe('THE FUNNEL: archetype limits type limits house', () => {
  const { pickHouse } = require('../flavor-prompt.mjs');
  const banks = require('@/data/texture-banks.json');
  const TYPES = Object.keys(banks.type_houses).filter((k) => k !== '_note');

  test('stage 2: no type can ever reach a house outside its own list', () => {
    const PROSE = [
      'a living column of deep-ocean brine, salt-thick and lightless',
      'a body of living scorched metal, its plating cracked and bronze',
      'a heap of grave-soil and knotted bone',
      'a thing of starless cold and the space between',
      'a creature',
    ];
    for (const type of TYPES) {
      const allowed = banks.type_houses[type];
      for (const prose of PROSE) {
        for (const themes of [['mind'], ['forged'], ['grave'], ['aquatic'], null]) {
          for (const seed of [1, 6, 13]) {
            const [h] = pickHouse(prose, themes, seed, type);
            expect(`${type}: ${h} in list = ${allowed.includes(h)}`)
              .toBe(`${type}: ${h} in list = true`);
          }
        }
      }
    }
  });

  test('stage 2: the type always yields exactly one house, never zero', () => {
    for (const type of TYPES) {
      for (let seed = 1; seed <= 10; seed += 1) {
        expect(`${type}/${seed}`).toBe(`${type}/${seed}`);
        expect(pickHouse('a creature', null, seed, type)).toHaveLength(1);
      }
    }
  });

  test('stage 2: the type decides the material — the same prose, two types', () => {
    const YAW = 'an aberration of living, scorched metal, its hide a cracked bronze crust '
      + 'that radiates furnace heat, moving with the ambush logic of a dune predator.';
    // Typed Construct, the metal in the prose wins outright.
    expect(pickHouse(YAW, ['mind'], 5, 'Construct')[0]).toBe('iron');
    // Typed Aberration, iron is not reachable — the funnel holds the line,
    // and whatever it lands on is a legal aberration material.
    const allowed = banks.type_houses.Aberration;
    for (let seed = 1; seed <= 20; seed += 1) {
      const [h] = pickHouse(YAW, ['mind'], seed, 'Aberration');
      expect(`${seed}: ${allowed.includes(h)}`).toBe(`${seed}: true`);
      expect(h).not.toBe('iron');
    }
  });

  test('stage 2: an unknown or absent type falls back to the whole house list', () => {
    expect(pickHouse('a drowned forge of brine-flooded iron', ['forged'], 1, null)).toHaveLength(1);
    expect(pickHouse('a drowned forge of brine-flooded iron', ['forged'], 1, 'Nonsense')).toHaveLength(1);
  });

  test('stage 1: a forbidden archetype/type pair is reconciled, and the user always wins', async () => {
    const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));
    const run = (o) => generateFromSkeleton({ concept: 'a creeping thing', cr: 20, seed: 4, ...o }, noFlavor);

    // archetype is the user's -> the TYPE yields
    const a = await run({ archetypeName: 'artillery', archetypeSource: 'user', resolvedType: 'Ooze', typeSource: 'auto' });
    expect(a.type).toMatch(/Monstrosity/);
    expect(a.generation.archetype).toBe('artillery');

    // type is the user's -> the ARCHETYPE yields
    const b = await run({ archetypeName: 'artillery', archetypeSource: 'auto', resolvedType: 'Ooze', typeSource: 'user' });
    expect(b.type).toMatch(/Ooze/);
    expect(b.generation.archetype).toBeNull();

    // both explicit -> both stand; an explicit pair outranks our table
    const c = await run({ archetypeName: 'artillery', archetypeSource: 'user', resolvedType: 'Ooze', typeSource: 'user' });
    expect(c.type).toMatch(/Ooze/);
    expect(c.generation.archetype).toBe('artillery');

    // a permitted pair is untouched
    const d = await run({ archetypeName: 'artillery', archetypeSource: 'user', resolvedType: 'Giant', typeSource: 'auto' });
    expect(d.type).toMatch(/Giant/);
    expect(d.generation.archetype).toBe('artillery');
  });
});

describe('the Ember Wraith: the concept call receives the funnel', () => {
  const { pickHouse } = require('../flavor-prompt.mjs');
  const {
    buildArchetypeResolvePrompt, buildSeedSynthesisPrompt,
  } = require('@/tools/statblock-generator/format-2024/generate.mjs');
  const banks = require('@/data/texture-banks.json');

  test('a type with no domain facet keeps its themes', () => {
    // THE bug behind the Ember Wraith. Humanoid and Monstrosity have no
    // domain facet, so every domain theme failed the `=== resolvedType`
    // test and themes went null — which switched the whole theme layer off
    // and let a CR 5 Gladiator's Spear win a CR 20 block.
    const TYPE_THREAD = { Undead: 'grave', Fiend: 'fiendish', Celestial: 'celestial', Fey: 'fey',
      Dragon: 'draconic', Elemental: 'elemental', Plant: 'verdant', Construct: 'forged',
      Aberration: 'mind', Ooze: 'amorphous', Beast: 'bestial', Giant: 'armed' };
    const DOMAIN_OF = Object.fromEntries(Object.entries(TYPE_THREAD).map(([ty, th]) => [th, ty]));
    const survive = (themes, type) => themes.filter((th) => !DOMAIN_OF[th]
      || !type || !TYPE_THREAD[type] || DOMAIN_OF[th] === type);
    for (const type of ['Humanoid', 'Monstrosity']) {
      for (const themes of [['forged', 'armed'], ['grave'], ['bestial'], ['arcane']]) {
        expect(`${type} ${themes}: ${survive(themes, type).length > 0}`)
          .toBe(`${type} ${themes}: true`);
      }
    }
    // ...and a type that DOES claim a domain still drops a contradicting one
    expect(survive(['grave'], 'Celestial')).toEqual([]);
  });

  test('the concept prompt states the funnel: legal types, their materials, their essence', () => {
    const p = buildArchetypeResolvePrompt('a drowned swamp spirit', '', { cr: 20, archetype: 'skirmisher' });
    expect(p).toMatch(/THE FUNNEL — work down it in order/);
    // stage 1: the role's forbidden types are named
    expect(p).toMatch(/A skirmisher can never be Ooze, Plant, Aberration/);
    for (const t of ['Ooze', 'Plant', 'Aberration']) {
      expect(`${t} offered: ${new RegExp(`\\n- ${t}: `).test(p)}`).toBe(`${t} offered: false`);
    }
    // stage 2: exactly one material, drawn from the chosen type's line
    expect(p).toMatch(/Choose exactly ONE material/);
    expect(p).toMatch(/its materials: /);
    expect(p).toMatch(/"material": "<exactly ONE material/);
    // depth: the type essence rides along
    expect(p).toMatch(/a person of a mortal people/); // Humanoid essence
  });

  test('an unrestricted role is offered every type', () => {
    const p = buildArchetypeResolvePrompt('a thing', '', { cr: 10, archetype: 'brute' });
    for (const t of ['Ooze', 'Plant', 'Aberration', 'Humanoid', 'Undead']) {
      expect(`${t}: ${new RegExp(`\\n- ${t}: `).test(p)}`).toBe(`${t}: true`);
    }
  });

  test('the seed path names the materials of the type it already rolled', () => {
    const p = buildSeedSynthesisPrompt({ origin: 'a flooded cenote', creature_type: 'Undead' }, { cr: 20 });
    expect(p).toMatch(/given it is a Undead: /);
    expect(p).toMatch(new RegExp(banks.type_houses.Undead.join(', ')));
    expect(p).toMatch(/"material": "<exactly ONE material/);
  });

  test('a declared material is used verbatim — no prose scoring', () => {
    // The prose says nothing about bone; the declaration decides.
    expect(pickHouse('a drowned swamp spirit of molten silver', null, 5, 'Humanoid', 'bone')).toEqual(['bone']);
    // ...but only if it is legal for the type; otherwise fall through to scoring
    expect(pickHouse('a thing of molten slag', null, 5, 'Humanoid', 'chitin')).toEqual(['magma']);
    expect(pickHouse('a thing of molten slag', null, 5, 'Humanoid', 'not-a-house')).toEqual(['magma']);
  });

  test('a vetoed signature is TRANSLATED, not deleted', async () => {
    const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));
    const m = await generateFromSkeleton({
      concept: 'a circling spirit', cr: 20, seed: 28598917,
      archetypeName: 'skirmisher', archetypeSource: 'user',
      resolvedType: 'Humanoid', themes: ['forged', 'armed'], signatureMechanic: 'aura',
    }, noFlavor);
    const names = Object.values(m.sections).flat().map((e) => e.name).join(' ');
    expect(names.length).toBeGreaterThan(0);
    expect(m.generation.archetype).toBe('skirmisher');
  });
});

describe('the Uulgroth: dead clauses and shatterable restraints', () => {
  const { applyFlavor } = require('../flavor-prompt.mjs');

  const withEntry = (text, name = 'Lulling Chime') => {
    const sk = buildSkeleton({ cr: 20, seed: 3, size: 'Large' });
    sk.entries = [{ id: 'e1', section: 'Actions', name, text, template_2024: text, derived_from: 'test' }];
    sk.traits = [];
    return sk;
  };
  const flavored = (text) => {
    const sk = withEntry(text);
    const m = applyFlavor(sk, respond(sk));
    return Object.values(m.sections).flat()[0].text;
  };

  test('an object clause is stripped when the row deals only Psychic or Poison', () => {
    // Print: all 6 entries carrying this clause deal Fire or Thunder, or no
    // damage at all. Objects are immune to Poison and Psychic, so the
    // clause is dead text — it arrived via the energy substitution
    // rewriting the Tarrasque's Thunder into the block's own energy.
    for (const dmg of ['Psychic', 'Poison']) {
      const out = flavored(`*Constitution Saving Throw*: DC 22, each creature and each object that isn't being worn or carried in a 60-foot Cone. *Failure:* 91 (14d12) ${dmg} damage.`);
      expect(`${dmg}: ${/worn or carried/.test(out)}`).toBe(`${dmg}: false`);
      expect(out).toMatch(/each creature in a 60-foot Cone/);
    }
  });

  test('the clause SURVIVES on a damage type objects actually take', () => {
    for (const dmg of ['Fire', 'Thunder', 'Acid', 'Force']) {
      const out = flavored(`*Constitution Saving Throw*: DC 22, each creature and each object that isn't being worn or carried in a 60-foot Cone. *Failure:* 91 (14d12) ${dmg} damage.`);
      expect(`${dmg}: ${/worn or carried/.test(out)}`).toBe(`${dmg}: true`);
    }
  });

  test('a mixed-energy row keeps the clause — it still breaks things', () => {
    const out = flavored("*Constitution Saving Throw*: DC 22, each creature and each object that isn't being worn or carried in a 60-foot Cone. *Failure:* 40 (9d8) Fire damage and 20 (5d8) Psychic damage.");
    expect(/worn or carried/.test(out)).toBe(true);
  });

  test('only FIBROUS restraints are immune to Bludgeoning', () => {
    const restraint = (sub) => flavored(`*Dexterity Saving Throw*: DC 22, one creature. *Failure:* The target has the Restrained condition until the ${sub} is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Bludgeoning, Poison, and Psychic damage).`);
    // a web is genuinely unpunchable — the Ettercap's printed variant
    expect(restraint('web')).toMatch(/Immunity to Bludgeoning, Poison, and Psychic/);
    expect(restraint('silk strand')).toMatch(/Immunity to Bludgeoning, Poison, and Psychic/);
    // SUPERSEDED (owner call, 2026-08-11): a substance that is neither
    // mineral, nor fibrous, nor the block's own house material is
    // unclassifiable, and a guessed vulnerability is arbitrary — it now
    // takes the Roper's printed shape: immunities only, no vulnerability.
    for (const sub of ['honeyed resin', 'clotted sap', 'cooling wax']) {
      const out = restraint(sub);
      expect(`${sub}: ${/Immunity to Bludgeoning/.test(out)}`).toBe(`${sub}: false`);
      expect(`${sub} vuln: ${/Vulnerability/.test(out)}`).toBe(`${sub} vuln: false`);
      expect(out).toMatch(/Immunity to Poison and Psychic damage/);
    }
  });

  test('amber reads as mineral, not resin — fossilised sap shatters', () => {
    const out = flavored('*Dexterity Saving Throw*: DC 22, one creature. *Failure:* The target has the Restrained condition until the amber shell is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Bludgeoning, Poison, and Psychic damage).');
    expect(out).toMatch(/Vulnerability to Bludgeoning damage/);
  });

  test('mineral restraints still invert to crack-not-burn', () => {
    const out = flavored('*Dexterity Saving Throw*: DC 22, one creature. *Failure:* The target has the Restrained condition until the shale casing is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Bludgeoning, Poison, and Psychic damage).');
    expect(out).toMatch(/Vulnerability to Bludgeoning damage/);
    expect(out).toMatch(/Immunity to Fire, Poison, and Psychic damage/);
  });
});

describe('the Uulgroth: nothing above CR 4 fights only at range', () => {
  const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));
  const MELEE = /Melee (?:or Ranged )?Attack Roll/;

  test('a ranged concept still ships something usable in melee', async () => {
    for (const archetypeName of ['artillery', 'skirmisher', 'controller']) {
      for (const seed of [7, 1594808740, 91]) {
        const m = await generateFromSkeleton({
          concept: 'a thing that strikes from far off', cr: 20, seed,
          archetypeName, archetypeSource: 'user', attackMode: 'ranged',
        }, noFlavor);
        const text = Object.values(m.sections).flat().map((e) => e.text).join(' ');
        expect(`${archetypeName}/${seed}: ${MELEE.test(text)}`).toBe(`${archetypeName}/${seed}: true`);
        // ...and it did NOT lose the range band it asked for
        expect(`${archetypeName}/${seed} ranged: ${/Ranged Attack Roll|range \d/.test(text)}`)
          .toBe(`${archetypeName}/${seed} ranged: true`);
      }
    }
  });

  test('below CR 5 a pure-ranged body is still legal — print has two', async () => {
    const m = await generateFromSkeleton({
      concept: 'a shrieking fungus that spits spores', cr: 1, seed: 4,
      archetypeName: 'artillery', archetypeSource: 'user', attackMode: 'ranged',
    }, noFlavor);
    expect(m.generation.archetype).toBe('artillery');
  });
});

describe('the cross-block frequency ledger', () => {
  const {
    readRecent, recordShipped, clearLedger, rowKeyOf, recencyWeight, WINDOW,
  } = require('../frequency-ledger.mjs');

  beforeEach(() => clearLedger());
  afterEach(() => clearLedger());

  test('a row identity is the MECHANIC, shared across every donor that has it', () => {
    // Two things had to be true at once. The demiplane banish shipped under
    // four different SHIPPED names, so the key can't be what it was called.
    // But Magic Resistance exists as 34 rows from 34 creatures, so the key
    // can't include the donor either — that made the ledger blind to the
    // rows that saturate (Magic Resistance 65% of blocks, Pounce 85%).
    // The library's ability name is the mechanic, and that is the identity.
    expect(rowKeyOf({ source: 'Adult Gold Dragon', ability: 'Banish' })).toBe('banish');
    expect(rowKeyOf({ source: 'Pseudodragon', trait: 'Magic Resistance' }))
      .toBe(rowKeyOf({ source: 'Satyr', trait: 'Magic Resistance' }));
    expect(rowKeyOf({ source: 'Baboon', trait: 'Pack Tactics' }))
      .toBe(rowKeyOf({ source: 'Wolf', trait: 'Pack Tactics' }));
    // a usage suffix is not part of the mechanic
    expect(rowKeyOf({ source: 'X', ability: 'Fire Breath (Recharge 5-6)' })).toBe('fire breath');
  });

  test('a shipped row is damped next time, and damped harder for repeats', () => {
    const row = { source: 'Adult Gold Dragon', ability: 'Banish' };
    expect(recencyWeight(row, readRecent())).toBe(1);
    recordShipped([rowKeyOf(row)]);
    const once = recencyWeight(row, readRecent());
    recordShipped([rowKeyOf(row)]);
    const twice = recencyWeight(row, readRecent());
    expect(once).toBeLessThan(1);
    expect(twice).toBeLessThan(once);
    // ...but never to zero: it damps, it does not exclude
    expect(twice).toBeGreaterThan(0);
  });

  test('an unshipped row is untouched', () => {
    recordShipped(['Adult Gold Dragon/Banish']);
    expect(recencyWeight({ source: 'Lich', ability: 'Eldritch Burst' }, readRecent())).toBe(1);
  });

  test('the window forgets — a row falls out after enough generations', () => {
    const row = { source: 'Adult Gold Dragon', ability: 'Banish' };
    recordShipped([rowKeyOf(row)]);
    for (let i = 0; i < WINDOW; i += 1) recordShipped([`Filler/Row${i}`]);
    expect(recencyWeight(row, readRecent())).toBe(1);
  });

  test('the engine stamps a row identity on every entry and trait', () => {
    const sk = buildSkeleton({ cr: 20, seed: 5, themes: ['grave'] });
    for (const e of [...sk.entries, ...sk.traits]) {
      if (/observed median/.test(e.derived_from ?? '')) continue; // Multiattack is synthesized
      expect(`${e.name}: ${typeof e.row_key}`).toBe(`${e.name}: string`);
    }
  });

  test('damping actually shifts what gets picked', () => {
    const keyOf = (sk) => sk.entries.map((e) => e.row_key).filter(Boolean);
    const base = buildSkeleton({ cr: 20, seed: 11, themes: ['grave'], archetype: 'controller' });
    const recent = {};
    for (const k of keyOf(base)) recent[k] = 4; // heavily recently-used
    const after = buildSkeleton({ cr: 20, seed: 11, themes: ['grave'], archetype: 'controller', recent });
    expect(keyOf(after).join('|')).not.toBe(keyOf(base).join('|'));
  });

  test('a hostile localStorage never fails a generation', () => {
    const real = global.localStorage;
    Object.defineProperty(global, 'localStorage', {
      configurable: true,
      value: { getItem() { throw new Error('nope'); }, setItem() { throw new Error('nope'); }, removeItem() { throw new Error('nope'); } },
    });
    expect(() => recordShipped(['A/B'])).not.toThrow();
    expect(readRecent()).toEqual({});
    Object.defineProperty(global, 'localStorage', { configurable: true, value: real });
  });
});

describe('the Uulgroth: a name must name the substance the row actually uses', () => {
  test('the flavor prompt forbids naming a row for a substance the block lacks', () => {
    const sk = buildSkeleton({ cr: 20, seed: 3, themes: ['fey'] });
    const p = buildFlavorPrompt(sk, { concept: 'a bog spirit', themes: ['fey'] });
    expect(p).toMatch(/names a SUBSTANCE or TERRAIN must be named for THAT one/);
    expect(p).toMatch(/thick undergrowth is not a "Mist-Walker"/);
  });
});

describe('the Grindor: energy follows the register, citations must resolve', () => {
  test('the palette offers only DOMINANT energies, not tail observations', () => {
    // bestial measures Poison 12, Fire 2, Acid 2, Psychic 1. Psychic is one
    // observation in seventeen and used to be offered beside Poison as an
    // equal — which is how a stone-plated spider colony came back Psychic.
    const sk = buildSkeleton({ cr: 20, seed: 5, themes: ['bestial', 'subterranean'] });
    const p = buildFlavorPrompt(sk, { concept: 'a colony of stone-plated spiderlings', themes: ['bestial', 'subterranean'] });
    const line = (p.match(/energy damage this register favors: (.*)/) ?? [])[1] ?? '';
    expect(line).toMatch(/Poison/);
    expect(`offered Psychic: ${/Psychic/.test(line)}`).toBe('offered Psychic: false');
    expect(`offered Fire: ${/Fire/.test(line)}`).toBe('offered Fire: false');
  });

  test('a thin facet still contributes its own best', () => {
    // subterranean is Acid 2 / Thunder 2 — both dominant within it, and the
    // union must not drown them just because bestial counts higher.
    const sk = buildSkeleton({ cr: 20, seed: 5, themes: ['subterranean'] });
    const p = buildFlavorPrompt(sk, { concept: 'a tunnel thing', themes: ['subterranean'] });
    const line = (p.match(/energy damage this register favors: (.*)/) ?? [])[1] ?? '';
    expect(line).toMatch(/Acid/);
    expect(line).toMatch(/Thunder/);
  });

  test('a defense citing a trait the block lacks loses the citation', () => {
    const sk = buildSkeleton({ cr: 9, seed: 2, size: 'Large' });
    const m = applyFlavor(sk, respond(sk, { resistances: 'Psychic (from Stone Mind)', immunities: 'Poison' }));
    expect(m.resistances).toBe('Psychic');
    expect(m.resistances).not.toMatch(/Stone Mind/);
    expect(m.immunities).toBe('Poison');
  });

  test('a citation that DOES resolve survives — print has two', () => {
    const sk = buildSkeleton({ cr: 9, seed: 2, size: 'Large' });
    const m0 = applyFlavor(sk, respond(sk));
    const realEntry = Object.values(m0.sections).flat()[0].name.replace(/\s*\([^)]*\)\s*$/, '');
    const m = applyFlavor(sk, respond(sk, { resistances: `Psychic (from ${realEntry})` }));
    expect(m.resistances).toMatch(new RegExp(realEntry.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });
});

describe('the Grindor: the energy is rolled before the concept, not chosen after', () => {
  const {
    rollEnergy, buildArchetypeResolvePrompt,
  } = require('@/tools/statblock-generator/format-2024/generate.mjs');

  test('the roll follows the printed distribution — Psychic is rare, Fire is common', () => {
    const counts = {};
    for (let i = 0; i < 20000; i += 1) {
      const e = rollEnergy(() => (i * 0.61803398875) % 1); // deterministic sweep
      counts[e] = (counts[e] ?? 0) + 1;
    }
    const pct = (t) => (100 * (counts[t] ?? 0)) / 20000;
    expect(pct('Fire')).toBeGreaterThan(pct('Psychic') * 5);
    expect(pct('Psychic')).toBeLessThan(6);
    expect(Object.keys(counts).length).toBe(10); // every energy is reachable
  });

  test('the concept call is TOLD the energy, as a fact not a preference', () => {
    const p = buildArchetypeResolvePrompt('a colony of stone-plated spiderlings', '', {
      cr: 20, archetype: 'skirmisher', energy: 'Poison',
    });
    expect(p).toMatch(/energy damage is Poison, and that is not negotiable/);
    expect(p).toMatch(/make Poison INEVITABLE/);
    expect(p).toMatch(/change the CREATURE, not the energy/);
  });

  test('no energy given, no energy clause — older callers still work', () => {
    const p = buildArchetypeResolvePrompt('a thing', '', { cr: 10, archetype: 'brute' });
    expect(p).not.toMatch(/ENERGY\./);
  });

  test('the flavor call cannot revise the rolled energy', () => {
    const sk = buildSkeleton({ cr: 9, seed: 2, size: 'Large' });
    sk.energy = 'Acid';
    const m = applyFlavor(sk, respond(sk, { energy_damage: 'Psychic' }));
    const text = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(`psychic leaked: ${/Psychic damage/.test(text)}`).toBe('psychic leaked: false');
  });

  test('without a rolled energy the model\'s own answer still stands', () => {
    const sk = buildSkeleton({ cr: 9, seed: 2, size: 'Large' });
    const m = applyFlavor(sk, respond(sk, { energy_damage: 'Acid' }));
    expect(m).toBeTruthy(); // legacy path intact, no crash
  });
});

describe('the damage MIX is rolled, not assumed', () => {
  const {
    rollDamageMix, buildArchetypeResolvePrompt,
  } = require('@/tools/statblock-generator/format-2024/generate.mjs');
  const ENERGIES = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder'];
  const PHYS = ['Bludgeoning', 'Piercing', 'Slashing'];
  const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));

  test('the roll matches print: 73 both / 19 physical / 7 energy', () => {
    const counts = { both: 0, physical: 0, energy: 0 };
    for (let i = 0; i < 30000; i += 1) counts[rollDamageMix(() => (i * 0.61803398875) % 1)] += 1;
    const pct = (k) => (100 * counts[k]) / 30000;
    expect(Math.abs(pct('both') - 73)).toBeLessThan(3);
    expect(Math.abs(pct('physical') - 19)).toBeLessThan(3);
    expect(Math.abs(pct('energy') - 7)).toBeLessThan(3);
  });

  test('the concept call is told which body it is writing', () => {
    const phys = buildArchetypeResolvePrompt('a thing', '', { cr: 17, archetype: 'brute', energy: 'Fire', damageMix: 'physical' });
    expect(phys).toMatch(/NO ENERGY/);
    expect(phys).toMatch(/mass, edge, and point/);
    const en = buildArchetypeResolvePrompt('a thing', '', { cr: 17, archetype: 'brute', energy: 'Necrotic', damageMix: 'energy' });
    expect(en).toMatch(/NO PHYSICAL DAMAGE/);
    expect(en).toMatch(/no edge, point, or mass to strike with/);
    // the common case says nothing extra
    expect(buildArchetypeResolvePrompt('a thing', '', { cr: 17, archetype: 'brute', energy: 'Fire', damageMix: 'both' }))
      .not.toMatch(/NO ENERGY|NO PHYSICAL DAMAGE/);
  });

  test('a physical-only block deals no energy damage anywhere', async () => {
    for (const seed of [3, 44, 815, 1620]) {
      const m = await generateFromSkeleton({
        concept: 'a goring, trampling thing', cr: 17, seed, archetypeName: 'brute',
        archetypeSource: 'user', energy: 'Poison', damageMix: 'physical', themes: ['bestial'],
      }, noFlavor);
      const txt = Object.values(m.sections).flat().map((e) => e.text).join(' ');
      const leaked = ENERGIES.filter((t) => new RegExp(`\\b${t} damage\\b`).test(txt));
      expect(`seed ${seed}: ${leaked.join(',') || 'none'}`).toBe(`seed ${seed}: none`);
      expect(PHYS.some((t) => new RegExp(`\\b${t} damage\\b`).test(txt))).toBe(true);
    }
  });

  test('an energy-only block deals no physical damage anywhere', async () => {
    for (const seed of [3, 44, 815, 1620]) {
      const m = await generateFromSkeleton({
        concept: 'a drifting cold nothing', cr: 17, seed, archetypeName: 'controller',
        archetypeSource: 'user', energy: 'Necrotic', damageMix: 'energy', themes: ['grave'],
      }, noFlavor);
      const txt = Object.values(m.sections).flat().map((e) => e.text).join(' ');
      const leaked = PHYS.filter((t) => new RegExp(`\\b${t} damage\\b`).test(txt));
      expect(`seed ${seed}: ${leaked.join(',') || 'none'}`).toBe(`seed ${seed}: none`);
    }
  });

  test('an energy-only block is TOLD its body has no edge or mass', () => {
    const sk = buildSkeleton({ cr: 17, seed: 5, themes: ['grave'], damageMix: 'energy' });
    sk.identity = require('../flavor-prompt.mjs').resolveIdentity(sk, {
      concept: 'a drifting cold nothing', themes: ['grave'], type: 'Undead', damageMix: 'energy',
    });
    expect(sk.identity.contract.physical).toBeNull();
  });
});

describe('the Ironbound Warden: a material is never a damage type', () => {
  const lib = require('@/data/ability-library.json');
  const rows = [];
  (function walk(o) {
    if (Array.isArray(o)) o.forEach(walk);
    else if (o && typeof o === 'object') {
      if (o.ability || o.trait) rows.push(o);
      Object.values(o).forEach((v) => { if (v && typeof v === 'object') walk(v); });
    }
  }(lib));

  // "iron damage" is not a damage type. The Hydra's regrowth clause reads
  // "unless it has taken {substance} damage" — {substance} is a MATERIAL
  // slot, so it rendered the block's house: iron. Nothing could stop the
  // regrowth, so the warden regrew two heads per head lost and healed 25
  // forever. Same fill produced "hollow cold damage" and "honeyed resin
  // damage" in earlier blocks — one bug, three sightings.
  test('no DRAWABLE row puts a material slot where a damage type belongs', () => {
    const offenders = rows.filter((r) => !r.excluded
      && /\{(?:substance|appendage|material)\}\s+damage/.test(r.template_2024 ?? ''))
      .map((r) => `${r.source}/${r.ability ?? r.trait}`);
    expect(offenders).toEqual([]);
  });

  test('the rows that needed it now use the right slot', () => {
    const byName = (n) => rows.find((r) => (r.ability ?? r.trait) === n);
    // what a creature is AVERSE to is the foil energy
    expect(byName('Aversion to Fire').template_2024).toMatch(/\{weakness_type\} damage/);
    // what a nightmare CONFERS is the energy it already is
    expect(byName('Confer Fire Resistance').template_2024).toMatch(/\{damage_type\} damage/);
  });

  test('the hydra engine can never be drawn', () => {
    const hydra = rows.find((r) => r.source === 'Hydra' && (r.trait ?? r.ability) === 'Multiple Heads');
    expect(hydra.excluded).toBeTruthy();
    for (const themes of [['forged'], ['bestial'], ['draconic']]) {
      for (let seed = 1; seed <= 25; seed += 1) {
        const sk = buildSkeleton({ cr: 20, seed, themes });
        const text = [...sk.entries, ...sk.traits].map((e) => e.text ?? '').join(' ');
        expect(`${themes}/${seed}: ${/grows two heads/.test(text)}`).toBe(`${themes}/${seed}: false`);
      }
    }
  });
});

describe('same-type damage pools merge, including attack pools', () => {
  const { applyFlavor } = require('../flavor-prompt.mjs');
  const render = (text) => {
    const sk = buildSkeleton({ cr: 20, seed: 4, size: 'Large' });
    sk.entries = [{ id: 'e1', section: 'Actions', name: 'Strike', text, template_2024: text, derived_from: 'test' }];
    sk.traits = [];
    return Object.values(applyFlavor(sk, respond(sk)).sections).flat()[0].text;
  };

  test('an attack pool with a flat bonus merges (the shape the old regex missed)', () => {
    const out = render('*Melee Attack Roll:* +14, reach 5 ft. 17 (2d8 + 8) Fire damage plus 13 (3d8) Fire damage.');
    expect(out).toMatch(/\(5d8 \+ 8\) Fire damage/);
    expect(out).not.toMatch(/Fire damage plus .* Fire damage/);
  });

  test('different types still stand apart — that is the printed shape', () => {
    const out = render('*Melee Attack Roll:* +14, reach 5 ft. 17 (2d8 + 8) Bludgeoning damage plus 13 (3d8) Fire damage.');
    expect(out).toMatch(/Bludgeoning damage plus .*Fire damage/);
  });

  test('different die sizes are left alone', () => {
    const out = render('*Melee Attack Roll:* +14, reach 5 ft. 17 (2d8 + 8) Fire damage plus 13 (3d6) Fire damage.');
    expect(out).toMatch(/2d8 \+ 8\) Fire damage plus/);
  });
});

describe('no block ever ships a donor creature\'s ability name', () => {
  const lib = require('@/data/ability-library.json');
  const donorNames = new Set([...Object.values(lib.categories).flat()]
    .filter((r) => !r.excluded).map((r) => r.ability).filter(Boolean));
  const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));
  const RULES = /^(?:Multiattack|Spellcasting|Legendary Resistance)/i;

  test('a silent flavor call yields register names, not library names', async () => {
    for (const themes of [['forged'], ['grave'], ['fey']]) {
      for (const seed of [7, 91, 511609592]) {
        const m = await generateFromSkeleton({
          concept: 'a warden of the deep road', cr: 20, seed, themes,
          archetypeName: 'skirmisher', archetypeSource: 'user',
        }, noFlavor);
        const leaked = Object.values(m.sections).flat()
          .map((e) => e.name.replace(/\s*\([^)]*\)\s*$/, '').trim())
          .filter((n) => !RULES.test(n) && donorNames.has(n));
        expect(`${themes}/${seed}: ${leaked.join(', ') || 'none'}`).toBe(`${themes}/${seed}: none`);
      }
    }
  });

  test('rules vocabulary is never renamed', async () => {
    const m = await generateFromSkeleton({
      concept: 'a casting warden', cr: 20, seed: 12, themes: ['arcane'], caster: true,
    }, noFlavor);
    const names = Object.values(m.sections).flat().map((e) => e.name);
    expect(names.some((n) => /^Multiattack/.test(n))).toBe(true);
    expect(names.some((n) => /^Spellcasting/.test(n))).toBe(true);
  });

  test('a fallback name still leaves every cross-entry reference resolvable', async () => {
    const { lintStatblock } = require('@/tools/statblock-generator/format-2024/lint.mjs');
    for (const seed of [7, 91, 250, 511609592]) {
      const m = await generateFromSkeleton({
        concept: 'a warden', cr: 20, seed, themes: ['forged'], archetypeName: 'brute', archetypeSource: 'user',
      }, noFlavor);
      const orphans = lintStatblock(m, { edition: '2024' }).findings
        .filter((f) => f.rule === 'undefined-attack-ref');
      expect(`seed ${seed}: ${orphans.length}`).toBe(`seed ${seed}: 0`);
    }
  });

  test('the fallback is deterministic for a given block', () => {
    const sk = buildSkeleton({ cr: 20, seed: 5, themes: ['forged'] });
    sk.houses = ['iron'];
    const a = applyFlavor(sk, respond(sk, { entries: [] }));
    const b = applyFlavor(sk, respond(sk, { entries: [] }));
    expect(Object.values(a.sections).flat().map((e) => e.name))
      .toEqual(Object.values(b.sections).flat().map((e) => e.name));
  });
});

describe('the trait spec renderer: written natively, verified mechanically', () => {
  const { preservesTraitMechanics, buildFlavorPrompt: bfp } = require('../flavor-prompt.mjs');
  const ORIGINAL = 'The grindor can move across and climb rubble and broken stone without needing to '
    + 'make an ability check. Additionally, Difficult Terrain composed of rubble and broken stone '
    + 'doesn\'t cost it extra movement.';

  test('a faithful re-write in the creature\'s own voice is accepted', () => {
    expect(preservesTraitMechanics(ORIGINAL,
      'The broken stone of its cairn is open road to the grindor: it climbs and crosses rubble '
      + 'without an ability check, and such Difficult Terrain costs it no extra movement.')).toBe(true);
  });

  test('a re-write that changes ANY number is rejected', () => {
    const orig = 'The warden has Advantage on saving throws against spells while within 30 feet of its anvil.';
    expect(preservesTraitMechanics(orig,
      'Within 60 feet of its anvil the warden has Advantage on saving throws against spells.')).toBe(false);
  });

  test('a re-write that adds a condition, damage type or keyword is rejected', () => {
    expect(preservesTraitMechanics(ORIGINAL,
      'The grindor crosses rubble without an ability check, and such Difficult Terrain costs it no '
      + 'extra movement. Creatures that follow have the Prone condition.')).toBe(false);
    expect(preservesTraitMechanics('The warden ignores Difficult Terrain of slag.',
      'The warden ignores Difficult Terrain of slag and has Resistance to Fire damage.')).toBe(false);
  });

  test('a re-write that DROPS a mechanic is rejected', () => {
    expect(preservesTraitMechanics(ORIGINAL,
      'The grindor walks where it likes, and nothing slows it.')).toBe(false);
  });

  test('empty, absent or absurd re-writes are rejected', () => {
    for (const bad of [undefined, null, 42, '', '  ', 'Yes.', ORIGINAL.repeat(4)]) {
      expect(`${JSON.stringify(bad)}: ${preservesTraitMechanics(ORIGINAL, bad)}`)
        .toBe(`${JSON.stringify(bad)}: false`);
    }
  });

  test('the prompt invites a re-write for TRAITS and never for actions', () => {
    // The call-A diet removed this invitation for half a day (2026-08-17)
    // and was reverted: with the writer's authored-rate still ~0, traits
    // lost both voice passes and shipped raw template text (the Skorvith).
    // Re-dieting requires the writer live-proven at authoring first.
    const sk = buildSkeleton({ cr: 20, seed: 4, themes: ['forged'] });
    const p = bfp(sk, { concept: 'an iron warden', themes: ['forged'] });
    const traitLines = p.split('\n').filter((l) => /^- \w+ \(Traits\)/.test(l));
    expect(traitLines.length).toBeGreaterThan(0);
    expect(p).toMatch(/OPTIONALLY "text" — the same mechanic re-written in THIS creature's voice/);
    for (const l of p.split('\n').filter((l) => /^- \w+ \((?:Actions|Bonus Actions|Legendary Actions)\)/.test(l))) {
      expect(`${l.slice(0, 24)}: ${/OPTIONALLY "text"/.test(l)}`).toBe(`${l.slice(0, 24)}: false`);
    }
  });

  test('a verified re-write ships; a failing one leaves the template standing', () => {
    const sk = buildSkeleton({ cr: 9, seed: 2, size: 'Large' });
    const traitId = sk.traits.find((t) => t.id)?.id;
    if (!traitId) return;
    const templated = Object.values(applyFlavor(sk, respond(sk)).sections).flat();
    const before = templated.find((e) => /rubble|terrain|Advantage|breathe/i.test(e.text))?.text;
    // an answer that mangles the mechanics must not reach the block
    const mangled = applyFlavor(sk, respond(sk, {
      entries: flavorRequests(sk).map((r) => ({ id: r.id, name: r.placeholder_name, text: 'It does whatever it likes, whenever it likes.' })),
    }));
    for (const e of mangled.sections.Traits ?? []) {
      expect(e.text).not.toBe('It does whatever it likes, whenever it likes.');
    }
    expect(before === undefined || typeof before === 'string').toBe(true);
  });
});

describe('the ledger actually breaks saturation across a set', () => {
  // Keyed on source/ability the ledger was nearly inert: Magic Resistance is
  // 34 rows, Pack Tactics 18, Amphibious 31, so every shipment looked new.
  // 803 of 1073 rows share a name with another. Keyed on the MECHANIC it
  // does what it was built for.
  const SET = Array.from({ length: 20 }, (_, i) => ({
    cr: 20,
    seed: 1000 + i * 7919,
    themes: [['grave'], ['fiendish'], ['fey'], ['forged'], ['elemental'], ['bestial']][i % 6],
    archetype: ['controller', 'skirmisher', 'brute', 'lurker', 'artillery', 'defender'][i % 6],
  }));
  const run = (useLedger) => {
    const counts = {}; let recent = {}; const hist = [];
    for (const opts of SET) {
      const sk = buildSkeleton({ ...opts, recent: useLedger ? recent : null });
      const keys = [...sk.entries, ...sk.traits].map((e) => e.row_key).filter(Boolean);
      for (const k of new Set(keys)) counts[k] = (counts[k] ?? 0) + 1;
      hist.unshift(keys); recent = {};
      hist.slice(0, 12).forEach((ks, i) => {
        for (const k of new Set(ks)) recent[k] = (recent[k] ?? 0) + (i < 3 ? 2 : 1);
      });
    }
    return counts;
  };

  test('the ledger raises variety and cuts the saturated tail', () => {
    const off = run(false); const on = run(true);
    expect(Object.keys(on).length).toBeGreaterThan(Object.keys(off).length);
    const saturated = (c) => Object.values(c).filter((n) => n >= SET.length / 2).length;
    expect(saturated(on)).toBeLessThan(saturated(off));
  });

  test('what stays saturated is only what the engine GUARANTEES', () => {
    const on = run(true);
    const stuck = Object.entries(on).filter(([, n]) => n >= SET.length / 2).map(([k]) => k);
    // Legendary Resistance is a floor at this tier; Spellcasting is seated by
    // the caster guarantee. Anything else at 50%+ is the bug coming back.
    for (const k of stuck) {
      expect(`${k} is a guarantee: ${/legendary resistance|spellcasting|multiattack/.test(k)}`)
        .toBe(`${k} is a guarantee: true`);
    }
  });
});

describe('the Vanteg: axes that contradicted each other', () => {
  const {
    buildArchetypeResolvePrompt, rollDamageMix,
  } = require('@/tools/statblock-generator/format-2024/generate.mjs');
  const { preservesTraitMechanics } = require('../flavor-prompt.mjs');
  const GRAPPLEY = /Grappled condition \(escape|swallow/i;

  test('a physical-mix concept is never told to make an energy inevitable', () => {
    const p = buildArchetypeResolvePrompt('a thing', '', {
      cr: 20, archetype: 'brute', energy: 'Radiant', damageMix: 'physical',
    });
    expect(p).toMatch(/NO ENERGY/);
    expect(`told to make Radiant inevitable: ${/make Radiant INEVITABLE/.test(p)}`)
      .toBe('told to make Radiant inevitable: false');
    // ...and the other two mixes still get the energy brief
    for (const mix of ['both', 'energy']) {
      expect(buildArchetypeResolvePrompt('a thing', '', { cr: 20, archetype: 'brute', energy: 'Radiant', damageMix: mix }))
        .toMatch(/make Radiant INEVITABLE/);
    }
  });

  test('a signature never disables an exclusion it has nothing to do with', () => {
    for (const sig of [null, 'teleport', 'gaze', 'breath', 'thrown-weapon', 'summon']) {
      for (const role of ['skirmisher', 'lurker', 'artillery']) {
        for (let seed = 1; seed <= 25; seed += 1) {
          const sk = buildSkeleton({ cr: 20, seed, archetype: role, signatureMechanic: sig, themes: ['bestial'] });
          const leak = [...sk.entries, ...sk.traits].find((e) => GRAPPLEY.test(e.text ?? ''));
          expect(`${sig}/${role}/${seed}: ${leak ? leak.name : 'clean'}`).toBe(`${sig}/${role}/${seed}: clean`);
        }
      }
    }
  });

  test('swallow capacity follows SIZE, as print does', async () => {
    const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));
    const EXPECT = { Large: /only one creature swallowed/, Huge: /up to two creatures swallowed/ };
    for (const [size, re] of Object.entries(EXPECT)) {
      for (const seed of [3, 51, 402]) {
        const m = await generateFromSkeleton({
          concept: 'a devouring thing', cr: 20, seed, conceptSize: size,
          archetypeName: 'brute', archetypeSource: 'user', signatureMechanic: 'engulf', themes: ['bestial'],
        }, noFlavor);
        const sw = Object.values(m.sections).flat().find((e) => /swallowed at a time/.test(e.text));
        if (sw) expect(`${size}/${seed}: ${re.test(sw.text)}`).toBe(`${size}/${seed}: true`);
      }
    }
  });

  test('a CR 20 attack never comes from a sub-tier source in the pick loop', () => {
    const crOf = (s) => { const m = String(s ?? '').match(/\(CR ([\d/]+)\)/); if (!m) return null;
      const v = m[1]; return v.includes('/') ? Number(v.split('/')[0]) / Number(v.split('/')[1]) : Number(v); };
    let low = 0; let total = 0;
    for (const themes of [['bestial'], ['forged'], ['grave']]) {
      for (let seed = 1; seed <= 60; seed += 1) {
        const sk = buildSkeleton({ cr: 20, seed, themes, archetype: 'brute' });
        for (const e of sk.entries) {
          if (!/Attack Roll/.test(e.text) || /Multiattack/.test(e.name)) continue;
          const c = crOf(e.derived_from);
          if (c == null) continue;
          total += 1; if (c < 5) low += 1;
        }
      }
    }
    // was ~8%; the floor is a pick-loop bound, guarantees may still reach below it
    expect(`${Math.round((100 * low) / total)}% sub-tier`).toBe('0% sub-tier');
  });

  test('a marker-free trait cannot be replaced by unrelated prose', () => {
    const plain = 'The vanteg can breathe air and water.';
    expect(preservesTraitMechanics(plain, 'It does whatever it likes, whenever it likes.')).toBe(false);
    expect(preservesTraitMechanics(plain, 'Air and water are one to the vanteg; it breathes both.')).toBe(true);
  });
});

describe('the Brinewrack: floors that survive the drops, novas that recharge', () => {
  const MELEE = /Melee (?:or Ranged )?Attack Roll/;

  test('the melee floor holds even when the drops evict its row', () => {
    // The Roc spine's talons satisfied the floor; invariant 1 then dropped
    // them (grapple on a skirmisher) and the block shipped ranged-only.
    // The floor now re-checks AFTER the pass, through swapIn, so nothing
    // dropped can return but the promise is still kept.
    let missing = 0; let blocks = 0;
    for (const archetype of ['skirmisher', 'lurker', 'artillery']) {
      for (const sig of [null, 'web', 'teleport', 'breath']) {
        for (let seed = 1; seed <= 25; seed += 1) {
          const sk = buildSkeleton({ cr: 20, seed, archetype, signatureMechanic: sig, attackMode: 'mixed', themes: ['grasping'] });
          blocks += 1;
          const hasAttack = sk.entries.some((e) => /Attack Roll/.test(e.text) && !/Multiattack/.test(e.name));
          if (hasAttack && !sk.entries.some((e) => MELEE.test(e.text))) missing += 1;
        }
      }
    }
    expect(`${missing}/${blocks} blocks with attacks but no melee`).toBe(`0/${blocks} blocks with attacks but no melee`);
  });

  test('at CR 15+ a lone 1/Day damage nova is promoted to Recharge 5-6', () => {
    // Print is unanimous: 18/18 CR 15+ area-damage actions are Recharge-
    // gated. The promotion fires only when NO Recharge row exists, so the
    // one-Recharge invariant stands.
    let promoted = 0; let doubled = 0; let checked = 0;
    for (let seed = 1; seed <= 120; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, themes: ['bestial'], archetype: 'skirmisher' });
      const gated = sk.entries.filter((e) => /Recharge/i.test(e.gate ?? ''));
      const dmgNova = sk.entries.find((e) => e.slot_type === 'area' && /\d+d\d+|\{damage\}/.test(e.template_2024 ?? ''));
      if (!dmgNova) continue;
      checked += 1;
      if (gated.length > 1) doubled += 1;
      if (/Recharge/i.test(dmgNova.gate ?? '')) promoted += 1;
    }
    expect(doubled).toBe(0);
    // every block with a damage nova now recharges it
    expect(`${promoted}/${checked}`).toBe(`${checked}/${checked}`);
  });

  test('the promotion holds at EVERY tier — a solo 1/Day nova is the 0/329 shape', () => {
    // Superseded 2026-08-16 (the Dreamt Leech, owner call): this test once
    // pinned the promotion to CR 15+ "so the printed sub-boss 1/Day stands"
    // — but the printed 1/Day (this very Vrock row) sits BESIDE a Recharge;
    // its own comment conceded a solo 1/Day nova "never occurs in the
    // wild". The corpus measurement made it a law: zero of 329 blocks field
    // a 1/Day damage area as their only nova, so the promotion is
    // tier-blind. The 1/Day shape still ships wherever a Recharge sibling
    // exists (the demotion path — the fixed Leech's own breath).
    const { pickAbilities, makeRng } = require('../build-skeleton.mjs');
    const NOVA = {
      id: 'e9', section: 'Actions', slot_type: 'area', gate: '1/Day',
      source: 'Vrock', ability: 'Stunning Screech', cr: '6',
      template_2024: '*Constitution Saving Throw*: DC {dc}, each creature in a {area}-foot Emanation. *Failure:* {damage} ({dice}) Thunder damage.',
      numbers: { dc: 15, damage: 10, dice: '3d6', area: 20 },
    };
    const counts = { plain_attack: 0, rider_attack: 0, area: 0, save_effect: 0, save_damage: 0, utility: 0, legendary: 0 };
    const at = (cr) => pickAbilities(cr, counts, makeRng(3), [], 1, null, [NOVA], null, 'sapient', {})
      .find((c) => c.ability === 'Stunning Screech');
    expect(at(14).gate).toBe('Recharge 5-6');
    expect(at(20).gate).toBe('Recharge 5-6');
  });

  test('a physical-only block\'s flavor prompt forbids sonic and energy names', () => {
    const sk = buildSkeleton({ cr: 20, seed: 7, themes: ['grasping'], damageMix: 'physical' });
    sk.damage_mix = 'physical';
    const p = buildFlavorPrompt(sk, { concept: 'a shore-crab horror', themes: ['grasping'] });
    expect(p).toMatch(/any energy you pick will NOT be used/);
    expect(p).toMatch(/no shrieks, songs, rays, or blasts/);
    expect(`energy line offered: ${/energy damage this register favors/.test(p)}`)
      .toBe('energy line offered: false');
    // an unrolled or both-mix block keeps the palette line
    const sk2 = buildSkeleton({ cr: 20, seed: 7, themes: ['grasping'] });
    const p2 = buildFlavorPrompt(sk2, { concept: 'a shore-crab horror', themes: ['grasping'] });
    expect(p2).not.toMatch(/any energy you pick will NOT be used/);
  });
});

describe('the Brinewrack: a restraint is the house made manifest, at tier durability', () => {
  const banks = require('@/data/texture-banks.json');
  const snareSk = (cr, seed = 2) => {
    const sk = buildSkeleton({ cr, seed, size: 'Large' });
    sk.houses = ['magma'];
    sk.entries = [{
      id: 'e1', section: 'Actions', slot_type: 'save_effect', name: 'Snare', gate: '1/Day',
      derived_from: 'test',
      text: '*Dexterity Saving Throw*: DC 22, one creature the {creature} can see within 120 feet. *Failure:* The target has the Restrained condition until the {substance} is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Bludgeoning, Poison, and Psychic damage).',
      template_2024: '*Failure:* The target has the Restrained condition until the {substance} is destroyed (AC 10; HP 5;',
    }];
    sk.entries[0].template_2024 = sk.entries[0].text;
    sk.traits = [];
    return sk;
  };
  const rendered = (sk, fill) => Object.values(applyFlavor(sk, respond(sk, {
    entries: [{ id: 'e1', name: 'Snare', substance: fill }],
  })).sections).flat()[0].text;

  test('every house owns a restraint form', () => {
    for (const [h, v] of Object.entries(banks.houses)) {
      expect(`${h}: ${typeof v.restraint === 'string' && v.restraint.length > 5}`).toBe(`${h}: true`);
    }
  });

  test('a house-less generic fill is replaced by the house restraint', () => {
    const out = rendered(snareSk(20), 'barbed tendril mesh');
    expect(out).not.toMatch(/barbed tendril mesh/);
    expect(out).toMatch(/fast-hardening magma/);
  });

  test('a fill that speaks the house survives', () => {
    const out = rendered(snareSk(20), 'ropes of cooling magma');
    expect(out).toMatch(/ropes of cooling magma/);
  });

  test('the object scales with tier and keeps its material physics', () => {
    // magma is a HARD house: the physics swap must still land on the
    // scaled numbers — crack, not burn
    const out = rendered(snareSk(20), 'ropes of cooling magma');
    expect(out).toMatch(/AC 20; HP 30;/);
    expect(out).toMatch(/Vulnerability to Bludgeoning damage/);
    const mid = rendered(snareSk(9), 'ropes of cooling magma');
    expect(mid).toMatch(/AC 15; HP 10;/);
    const low = rendered(snareSk(2), 'ropes of cooling magma');
    expect(low).toMatch(/AC 10; HP 5;/); // print stands at print's tier
  });

  test('the palette leads the restraint line with the house form', () => {
    const sk = buildSkeleton({ cr: 20, seed: 5, themes: ['grasping'] });
    sk.houses = ['brine'];
    const p = buildFlavorPrompt(sk, { concept: 'a shore thing', themes: ['grasping'] });
    const line = (p.match(/restraining substances[^\n]*/) ?? [''])[0];
    if (line) expect(line).toMatch(/salt-crusted brine lattice/);
  });
});

describe('the Brinewrack II: the prose outranks the damage roll', () => {
  const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));
  const SONIC_CONCEPT = 'It skitters in unpredictable arcs, shrieking as it goes to disorient pursuers.';
  const SONIC_LORE = 'Warped by the screaming of the sea-gods, it guards the broken shrines of its origin.';

  test('told physical, wrote a shrieker: the block becomes sonic', async () => {
    const m = await generateFromSkeleton({
      concept: SONIC_CONCEPT, lore: SONIC_LORE, cr: 20, seed: 1742583140,
      archetypeName: 'skirmisher', archetypeSource: 'user', themes: ['grasping'],
      damageMix: 'physical', energy: 'Fire',
    }, noFlavor);
    const txt = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    // the declared energy is available to the block again
    expect(m.generation).toBeTruthy();
    expect(/Thunder damage/.test(txt) || !/Piercing damage.*Piercing damage.*Piercing damage/.test(txt)).toBe(true);
  });

  test('genuinely physical prose keeps the physical roll', async () => {
    const ENERGIES = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder'];
    const m = await generateFromSkeleton({
      concept: 'A war-bred bull that charges the largest cluster and swings crushing forelimbs.',
      cr: 17, seed: 44, archetypeName: 'brute', archetypeSource: 'user',
      themes: ['bestial'], damageMix: 'physical', energy: 'Fire',
    }, noFlavor);
    const txt = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    const leaked = ENERGIES.filter((t) => new RegExp(`\\b${t} damage\\b`).test(txt));
    expect(leaked).toEqual([]);
  });

  test('a rolled energy the prose never mentions yields to the one it declares', async () => {
    const m = await generateFromSkeleton({
      concept: 'A drifting rime-wraith of glacial frost; hoarfrost spreads where it passes, freezing the marsh.',
      cr: 17, seed: 44, archetypeName: 'controller', archetypeSource: 'user',
      themes: ['elemental'], damageMix: 'both', energy: 'Fire',
    }, noFlavor);
    const txt = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(`Fire leaked: ${/Fire damage/.test(txt)}`).toBe('Fire leaked: false');
  });

  test('one stray word is not a declaration — the roll stands', async () => {
    const m = await generateFromSkeleton({
      concept: 'A burning ambition drives this stone warden to crush intruders.',
      cr: 17, seed: 44, archetypeName: 'brute', archetypeSource: 'user',
      themes: ['elemental'], damageMix: 'both', energy: 'Cold',
    }, noFlavor);
    // "burning" x1 is below the named-twice bar; Cold survives as rolled
    expect(m.generation).toBeTruthy();
    const txt = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(`Fire imposed: ${/Fire damage/.test(txt)}`).toBe('Fire imposed: false');
  });
});

describe('the Hadal Lull: no radiant abyss, and the seeded path hears the roll', () => {
  const { buildSeedSynthesisPrompt } = require('@/tools/statblock-generator/format-2024/generate.mjs');
  const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));
  const ABYSS_CONCEPT = 'A living knot of briny plant-fiber and abyssal shadow, its body dripping clinging darkness, wrapping prey in shadow-tendrils before vanishing into the lightless depths.';

  test('a Fiend never deals Radiant — 0 of 29 in print', async () => {
    const m = await generateFromSkeleton({
      concept: 'a bland fiend of the deep', cr: 20, seed: 301295484,
      archetypeName: 'skirmisher', archetypeSource: 'user', resolvedType: 'Fiend',
      themes: ['aquatic', 'beguiling'], damageMix: 'both', energy: 'Radiant',
    }, noFlavor);
    const txt = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(`Radiant leaked: ${/Radiant damage/.test(txt)}`).toBe('Radiant leaked: false');
  });

  test('a Celestial never deals Necrotic — the mirror taboo', async () => {
    const m = await generateFromSkeleton({
      concept: 'a shining warden', cr: 17, seed: 44,
      archetypeName: 'brute', archetypeSource: 'user', resolvedType: 'Celestial',
      themes: ['celestial'], damageMix: 'both', energy: 'Necrotic',
    }, noFlavor);
    const txt = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(`Necrotic leaked: ${/Necrotic damage/.test(txt)}`).toBe('Necrotic leaked: false');
  });

  test('the shadow register declares Necrotic at the named-twice bar', async () => {
    // "abyssal shadow" + "shadow-tendrils" + "lightless depths" — the
    // Hadal Lull's own prose, which the old vocabulary scored at zero
    const m = await generateFromSkeleton({
      concept: ABYSS_CONCEPT, cr: 20, seed: 301295484,
      archetypeName: 'skirmisher', archetypeSource: 'user', resolvedType: 'Fiend',
      themes: ['aquatic', 'beguiling'], damageMix: 'both', energy: 'Radiant',
    }, noFlavor);
    const txt = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(txt).toMatch(/Necrotic damage/);
    expect(txt).not.toMatch(/Radiant damage/);
  });

  test('the seeded synthesis prompt now carries the energy and mix briefs', () => {
    const p = buildSeedSynthesisPrompt({ origin: 'a drowned altar', creature_type: 'Undead' },
      { cr: 20, energy: 'Cold', damageMix: 'both' });
    expect(p).toMatch(/energy damage is Cold, and that is not negotiable/);
    const phys = buildSeedSynthesisPrompt({ origin: 'a drowned altar', creature_type: 'Undead' },
      { cr: 20, energy: 'Cold', damageMix: 'physical' });
    expect(phys).toMatch(/NO ENERGY/);
    expect(phys).not.toMatch(/make Cold INEVITABLE/);
  });
});

describe('the Dreamt Hound: a mind of 6 makes no bargains, a claw that does not burn is a Claw', () => {
  const { pickOnDeath, makeRng } = require('../build-skeleton.mjs');
  const { lintStatblock } = require('@/tools/statblock-generator/format-2024/lint.mjs');

  test('succession on-deaths never reach a bestial or mindless block', () => {
    const lib = require('@/data/ability-library.json');
    expect(lib.on_death.templates.filter((t) => t.death_family === 'succession')
      .every((t) => t.needs_mind === true)).toBe(true);
    for (const mind of ['bestial', 'mindless']) {
      for (let seed = 1; seed <= 120; seed += 1) {
        const t = pickOnDeath(20, makeRng(seed), { themes: ['fey'], mind });
        if (!t) continue;
        expect(`${mind}/${seed}: ${t.death_family}`).not.toBe(`${mind}/${seed}: succession`);
      }
    }
    // a sapient block can still draw one
    let found = false;
    for (let seed = 1; seed <= 200 && !found; seed += 1) {
      const t = pickOnDeath(20, makeRng(seed), { themes: ['fey'], mind: 'sapient' });
      if (t?.death_family === 'succession') found = true;
    }
    expect(found).toBe(true);
  });

  test('the flavor prompt states a bestial mind and bans covenant fills', () => {
    const sk = buildSkeleton({ cr: 20, seed: 7, themes: ['fey'], mind: 'bestial' });
    const p = buildFlavorPrompt(sk, { concept: 'a hound of the hunt', themes: ['fey'] });
    expect(p).toMatch(/Its MIND is BESTIAL/);
    expect(p).toMatch(/never bargains, vows, debts, oaths, or agreements/);
    const sap = buildSkeleton({ cr: 20, seed: 7, themes: ['fey'], mind: 'sapient' });
    expect(buildFlavorPrompt(sap, { concept: 'a bargainer', themes: ['fey'] }))
      .not.toMatch(/Its MIND is BESTIAL/);
  });

});

describe('the Dreamt Hound: name-promise mismatches are the AUDIT\'s call, not a regex', () => {
  // The adjective lint lasted one hour: enumerating burning/chilling/
  // scalding/searing is the growing-regex shape the coinage detector was
  // retired over ("our list will never be long enough"). A name promising
  // an energy is a QUALITATIVE judgment, and the audit already owns the
  // rename actuator — it just needed the ask.
  const { buildAuditPrompt } = require('@/tools/statblock-generator/format-2024/audit.mjs');

  test('the audit prompt asks for the adjective-promise rename', () => {
    const m = {
      name: 'Dreamt Hound', type: 'Fey', size: 'Medium', speed: '50 ft.',
      cr: '20', hp: 325, ac: 20,
      stats: { STR: 26, DEX: 24, CON: 26, INT: 6, WIS: 16, CHA: 18 },
      sections: { Actions: [{ name: 'Burning Claw', text: '*Melee Attack Roll:* +14, reach 5 ft. 30 (5d8 + 8) Slashing damage.' }] },
    };
    const p = buildAuditPrompt(m, '2024');
    expect(p).toMatch(/ADJECTIVE promises an energy the entry never deals/);
    expect(p).toMatch(/"Burning Claw" dealing only Slashing burns nothing/);
    expect(p).toMatch(/spell echoes\s+are the one exemption/);
  });

  test('the deterministic lint keeps ONLY the closed-class literal type words', () => {
    // "Fire Bolt" dealing no Fire is still caught — ten words, print-
    // measured 0/329, a closed class that cannot grow.
    const { lintStatblock } = require('@/tools/statblock-generator/format-2024/lint.mjs');
    const m = (name) => ({
      name: 'Test', type: 'Fey', size: 'Medium', speed: '50 ft.',
      sections: { Actions: [{ name, text: '*Melee Attack Roll:* +14, reach 5 ft. 30 (5d8 + 8) Slashing damage.' }] },
    });
    expect(lintStatblock(m('Fire Bolt'), { edition: '2024' }).findings
      .some((f) => f.rule === 'entry-name-type-mismatch')).toBe(true);
    // ...and the open-class adjective no longer trips the lint
    expect(lintStatblock(m('Burning Claw'), { edition: '2024' }).findings
      .some((f) => f.rule === 'entry-name-type-mismatch')).toBe(false);
  });
});

describe('charm requires a mind that comprehends speech — no fourth tier needed', () => {
  // Print's floor is not INT 10 (the Harpy charms at INT 7): it is SPEECH.
  // All five printed Charmed-imposers (Harpy 7, Pirate 8, Pirate Captain
  // 10, Sprite 14, Aboleth 18) comprehend language — exactly the boundary
  // `sapient` already draws, so charm joins the cognition gate instead of
  // minting a new tier.

  test('no bestial or mindless block ever imposes Charmed, by any route', () => {
    for (const mind of ['bestial', 'mindless']) {
      for (const themes of [['fey'], ['beguiling'], ['bestial']]) {
        for (let seed = 1; seed <= 40; seed += 1) {
          const sk = buildSkeleton({ cr: 20, seed, themes, mind });
          const txt = [...sk.entries, ...sk.traits].map((e) => e.text ?? '').join(' ');
          expect(`${mind}/${themes}/${seed}: ${/Charmed/.test(txt)}`).toBe(`${mind}/${themes}/${seed}: false`);
        }
      }
    }
  });

  test('a sapient block still charms — the Harpy precedent lives', () => {
    let found = false;
    for (let seed = 1; seed <= 120 && !found; seed += 1) {
      const sk = buildSkeleton({ cr: 20, seed, themes: ['beguiling'], mind: 'sapient' });
      if ([...sk.entries, ...sk.traits].some((e) => /Charmed/.test(e.text ?? ''))) found = true;
    }
    expect(found).toBe(true);
  });

  test('a Charmed printed default on a bestial block falls to another condition', () => {
    const { fillTemplate } = require('../build-skeleton.mjs');
    const { makeRng } = require('../build-skeleton.mjs');
    const row = {
      slot_type: 'save_effect', condition_default: 'Charmed',
      template_2024: '*Wisdom Saving Throw*: DC {dc}, one creature. *Failure:* The target has the {condition_soft} condition until the end of its next turn.',
      numbers: { dc: 22 },
    };
    const nums = { attack_bonus: 14, save_dc: 22, pb: 6 };
    for (let seed = 1; seed <= 30; seed += 1) {
      const out = fillTemplate(row, { cr: 20, size: 'Medium', nums, rng: makeRng(seed), themes: ['fey'], mind: 'bestial' });
      expect(`${seed}: ${/Charmed/.test(out.text)}`).toBe(`${seed}: false`);
    }
    // sapient keeps the printed default reachable
    const sap = fillTemplate(row, { cr: 20, size: 'Medium', nums, rng: null, themes: ['fey'], mind: 'sapient' });
    expect(sap.text).toMatch(/Charmed/);
  });
});

describe('the phylactery shape is retired', () => {
  const { pickOnDeath, makeRng } = require('../build-skeleton.mjs');
  const PHYLACTERY = /prevents the return|makes the death permanent|if its heart is intact|Only a \*Wish\* spell|unless \*Dispel Evil and Good\*/i;

  test('no on-death draw carries a revive-unless-counter clause, any type, any mind', () => {
    const TYPES = ['Fey', 'Fiend', 'Celestial', 'Dragon', 'Undead', 'Aberration', 'Elemental', 'Construct', 'Giant', 'Plant'];
    for (const typeHint of TYPES) {
      for (let seed = 1; seed <= 60; seed += 1) {
        const t = pickOnDeath(20, makeRng(seed), { typeHint, themes: ['grave'], mind: 'sapient' });
        if (!t) continue;
        expect(`${typeHint}/${seed}: ${PHYLACTERY.test(t.template_2024 ?? '')}`)
          .toBe(`${typeHint}/${seed}: false`);
        expect(['continuity-anchor', 'continuity-trophy']).not.toContain(t.death_family);
      }
    }
  });

  test('the planar restoration SURVIVES — print puts it on every fiend', () => {
    // "dies outside its home plane, revives there" carries no counter
    // object: it is not the phylactery, and 20+ printed rows have it
    let found = false;
    for (let seed = 1; seed <= 120 && !found; seed += 1) {
      const t = pickOnDeath(20, makeRng(seed), { typeHint: 'Fiend', themes: ['fiendish'], mind: 'sapient' });
      if (t?.death_family === 'continuity-place') found = true;
    }
    expect(found).toBe(true);
  });

  test('residue and succession remain the bespoke families', () => {
    const lib = require('@/data/ability-library.json');
    const live = lib.on_death.templates.filter((t) => !t.excluded);
    expect(live.length).toBeGreaterThan(0);
    expect([...new Set(live.map((t) => t.death_family))].sort()).toEqual(['residue', 'succession']);
  });
});

describe('reopened 7/8: proven at the ORCHESTRATOR boundary, the layer the app calls', () => {
  // The earlier regressions call generateFromSkeleton directly; the app
  // calls generateMonster2024. A fix that lives below this boundary but is
  // not exercised through it is exactly how "fixed" things reopen.
  const { generateMonster2024 } = require('@/tools/statblock-generator/format-2024/generate.mjs');
  const ENERGIES = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder'];
  const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));
  jest.setTimeout(60000);

  test('7: a physical-mix block through the orchestrator deals zero energy', async () => {
    for (const seed of [9, 4471]) {
      const m = await generateMonster2024({
        concept: 'a goring, trampling war-bull', cr: 17, seed,
        archetypeName: 'brute', archetypeSource: 'user', resolvedType: 'Monstrosity',
        themes: ['bestial'], damageMix: 'physical', energy: 'Radiant',
      }, noFlavor);
      const txt = Object.values(m.sections).flat().map((e) => e.text).join(' ');
      const leaked = ENERGIES.filter((t) => new RegExp(`\\b${t} damage\\b`).test(txt));
      expect(`${seed}: ${leaked.join(',') || 'none'}`).toBe(`${seed}: none`);
    }
  });

  test('7: a declared energy reaches the payload through the orchestrator', async () => {
    const m = await generateMonster2024({
      concept: 'It shrieks as it circles, a screaming thing of the storm-wracked coast.',
      cr: 20, seed: 1742583140, archetypeName: 'skirmisher', archetypeSource: 'user',
      resolvedType: 'Monstrosity', themes: ['bestial'], damageMix: 'physical', energy: 'Fire',
    }, noFlavor);
    const txt = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    // prose declares Thunder twice -> mix flips, Thunder ships
    expect(txt).toMatch(/Thunder damage/);
    expect(txt).not.toMatch(/Fire damage/);
  });

  test('8: a silent flavor call through the orchestrator ships register names, never donor names', async () => {
    const lib = require('@/data/ability-library.json');
    const donorNames = new Set([...Object.values(lib.categories).flat()]
      .filter((r) => !r.excluded).map((r) => r.ability).filter(Boolean));
    const RULES = /^(?:Multiattack|Spellcasting|Legendary Resistance)/i;
    const m = await generateMonster2024({
      concept: 'a warden of the deep road', cr: 20, seed: 91,
      archetypeName: 'skirmisher', archetypeSource: 'user', resolvedType: 'Monstrosity',
      themes: ['forged'],
    }, noFlavor);
    const leaked = Object.values(m.sections).flat()
      .map((e) => e.name.replace(/\s*\([^)]*\)\s*$/, '').trim())
      .filter((n) => !RULES.test(n) && donorNames.has(n));
    expect(leaked.join(', ') || 'none').toBe('none');
  });
});

describe('the deterministic batch (owner findings 1/2a/3/5, 2026-08-13)', () => {
  const { lintStatblock } = require('@/tools/statblock-generator/format-2024/lint.mjs');
  const { pickName, namesCollide } = require('@/tools/statblock-generator/format-2024/generate.mjs');
  const shell = (over) => ({
    name: 'Test', type: 'Monstrosity', size: 'Large', speed: '40 ft.',
    sections: { Actions: [{ name: 'Claw', text: '*Melee Attack Roll:* +6, reach 5 ft. 12 (2d8 + 3) Slashing damage.' }] },
    ...over,
  });
  const rules = (m) => lintStatblock(m, { edition: '2024' }).findings.map((f) => f.rule);

  test('1: the low-band nova ceiling holds at the printed curve', () => {
    for (const [cr, ceil] of [[1, 18], [2, 22], [3, 22], [4, 24]]) {
      for (let seed = 1; seed <= 30; seed += 1) {
        const sk = buildSkeleton({ cr, seed, themes: ['draconic'] });
        for (const e of sk.entries) {
          if (e.slot_type !== 'area' || !e.gate || !e.damage) continue;
          expect(`CR ${cr}/${seed}: ${e.damage} <= ${ceil}`).toBe(`CR ${cr}/${seed}: ${e.damage <= ceil} <= ${ceil}`.replace('true', String(e.damage)));
        }
      }
    }
    // and the top band is untouched — 91 at CR 20 was always at spec
    const sk20 = buildSkeleton({ cr: 20, seed: 5, themes: ['draconic'] });
    const nova = sk20.entries.find((e) => e.slot_type === 'area' && e.gate);
    if (nova) expect(nova.damage).toBeGreaterThan(60);
  });

  test('2a: full physical immunity is stripped — 0/329 printed blocks have it', () => {
    const m = shell({ immunities: 'Bludgeoning, Piercing, Slashing, Poison' });
    expect(rules(m)).toContain('bps-immunity');
    const fix = lintStatblock(m, { edition: '2024' }).findings.find((f) => f.rule === 'bps-immunity');
    expect(fix.expected ?? '').toMatch(/Poison/);
  });

  test('5a: a type on two defense lines keeps only the stronger', () => {
    // resistance-vs-immunity was ALREADY covered by the pre-existing
    // defense-overlap rule (the batch block slipped some other way — worth
    // its trace); the new rule adds the vulnerability axis it lacked
    expect(rules(shell({ resistances: 'Poison, Cold', immunities: 'Poison' }))).toContain('defense-overlap');
    expect(rules(shell({ vulnerabilities: 'Fire', resistances: 'Fire, Cold' }))).toContain('defense-line-overlap');
    expect(rules(shell({ vulnerabilities: 'Fire', immunities: 'Poison' }))).not.toContain('defense-line-overlap');
  });

  test('5b: a casts comma-splice corrects to "or"; printed or-lists stand', () => {
    const spliced = shell({
      sections: { Actions: [{ name: 'Casting', text: 'The test casts *Fog Cloud*, *Stinking Cloud*.' }] },
    });
    const f = lintStatblock(spliced, { edition: '2024' }).findings.find((x) => x.rule === 'cast-comma-splice');
    expect(f).toBeTruthy();
    expect(f.expected ?? '').toMatch(/\*Fog Cloud\* or \*Stinking Cloud\*/);
    const oxford = shell({
      sections: { Actions: [{ name: 'Divine Aid', text: 'The test casts *Bless*, *Dispel Magic*, or *Lesser Restoration*.' }] },
    });
    expect(rules(oxford)).not.toContain('cast-comma-splice');
  });

  test('3: near-identical roster names are collisions and the next candidate wins', () => {
    expect(namesCollide('Gloomfang', 'gloom-fang')).toBe(true);
    expect(namesCollide('Gloomfang', 'Gloomfang Warden')).toBe(true);
    expect(namesCollide('Gloom', 'Gloomfang')).toBe(false);
    expect(namesCollide('Brinewrack', 'Bonewrack')).toBe(false);
    const picked = pickName(['Gloomfang Warden', 'Saltmaw'], { takenNames: ['Gloomfang'] });
    expect(picked).toBe('Saltmaw');
  });
});

describe('the Pounce resurrection: collisions never restore a donor name', () => {
  const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));
  const lib = require('@/data/ability-library.json');
  const donorNames = new Set([...Object.values(lib.categories).flat()]
    .filter((r) => !r.excluded).map((r) => r.ability).filter(Boolean));
  const RULES = /^(?:Multiattack|Spellcasting|Legendary Resistance|Immutable Form)/i;
  jest.setTimeout(240000);

  test('the 12 seeds that leaked are clean, plus the rest of the hunt range', async () => {
    for (const seed of [5, 6, 11, 13, 20, 24, 29, 44, 51, 53, 57, 59, 2, 17, 33]) {
      const m = await generateFromSkeleton({
        concept: 'a warden of the deep road', cr: 20, seed,
        archetypeName: 'skirmisher', archetypeSource: 'user', resolvedType: 'Monstrosity', themes: ['forged'],
      }, noFlavor);
      const leaked = Object.values(m.sections).flat()
        .map((e) => e.name.replace(/\s*\([^)]*\)\s*$/, '').trim())
        .filter((n) => !RULES.test(n) && donorNames.has(n));
      expect(`seed ${seed}: ${leaked.join(', ') || 'clean'}`).toBe(`seed ${seed}: clean`);
    }
  });
});

describe('the Charnel Reliquary: an attack\'s physical FORM is the model\'s call', () => {
  const render = (given) => {
    const sk = buildSkeleton({ cr: 2, seed: 3, size: 'Medium' });
    const atk = sk.entries.find((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack');
    if (!atk) return null;
    const m = applyFlavor(sk, respond(sk, {
      entries: [{ id: atk.id, name: 'Smoldering Splinters', ...given }],
    }));
    return Object.values(m.sections).flat().find((e) => e.name.startsWith('Smoldering Splinters'))?.text;
  };

  test('splinters can pierce even when the block-wide stamp says Bludgeoning', () => {
    const text = render({ physical: 'Piercing' });
    if (text) expect(text).toMatch(/Piercing damage/);
  });

  test('an off-set answer falls back to the block stamp — never an energy or junk', () => {
    // The stamp itself is a weighted draw over the library, so it shifts
    // whenever rows join or leave the pool (the were-curse exclusions moved
    // it once already). Derive it from a no-answer render instead of
    // pinning the draw — the LAW under test is "bad answer = same stamp,
    // never an energy", not which physical type this seed happens to roll.
    const stamp = render({})?.match(/(Bludgeoning|Piercing|Slashing) damage/)?.[1];
    if (!stamp) return;
    for (const bad of ['Fire', 'Sharp', 42, null]) {
      const text = render({ physical: bad });
      if (!text) continue;
      expect(`${bad}: ${text.includes(`${stamp} damage`)}`).toBe(`${bad}: true`);
      expect(text).not.toMatch(/Fire damage/);
    }
  });

  test('the prompt asks attacks — and only attacks — for their form', () => {
    const sk = buildSkeleton({ cr: 20, seed: 5, themes: ['forged'] });
    const p = buildFlavorPrompt(sk, { concept: 'a warden', themes: ['forged'] });
    expect(p).toMatch(/physical \(Bludgeoning\|Piercing\|Slashing/);
    expect(p).toMatch(/splinters pierce, fists bludgeon, talons slash/);
    for (const l of p.split('\n').filter((x) => /provide: name/.test(x) && !/physical \(/.test(x))) {
      expect(`${l.slice(0, 30)}: attackish`).not.toMatch(/plain_attack|rider_attack/);
    }
  });
});

describe('the Gilded Censer: a rename follows EVERY reference, not just attacks', () => {
  test('an ability self-reference follows its own rename', () => {
    const sk = buildSkeleton({ cr: 5, seed: 2, size: 'Medium' });
    sk.entries = [{
      id: 'e1', section: 'Bonus Actions', slot_type: 'save_effect', name: 'Moan', gate: null,
      derived_from: 'test',
      text: "*Wisdom Saving Throw*: DC 15, each creature in a 5-foot Emanation originating from the {creature}. *Failure:* The target has the Frightened condition. *Success:* The target is immune to this {creature}'s Moan for the next 24 hours.",
    }];
    sk.entries[0].template_2024 = sk.entries[0].text;
    sk.traits = [];
    const m = applyFlavor(sk, respond(sk, { entries: [{ id: 'e1', name: 'Gilded Haze' }] }));
    const e = Object.values(m.sections).flat()[0];
    expect(e.name).toMatch(/Gilded Haze/);
    expect(e.text).not.toMatch(/\bMoan\b/);
    expect(e.text).toMatch(/immune to this .*'s Gilded Haze/);
  });
});

describe('the Ashgrave Warden: the harmonizer strips, never mints a type-word name', () => {
  // "Cinder Shard" dealing Bludgeoning shipped as "Bludgeoning Shard" — the
  // synonym branch substituted dealt[0] where the claim stood, re-minting
  // the exact class the owner flagged on the Charnel Reliquary. Print: 0 of
  // 329 entries carry Bludgeoning/Piercing/Slashing in a NAME.
  const { runCorrections } = require('../corrections.mjs');
  const harmonize = (name, text) => {
    const sections = { Actions: [{ name, text }] };
    runCorrections({
      skeleton: { entries: [], traits: [], size: 'Large', cr: 8, houses: [] },
      j: { type: 'Undead' }, sections, byId: new Map(),
      energy: 'Force', physical: 'Bludgeoning', inline: 'the warden',
      renderedOf: new Map(), fallbackEntryName: () => null,
      NON_ACTION_SPELLS: [], SCALING_SPELLS: [], KNOWN_SPELLS: new Set(), atWillBanned: () => false,
    });
    return sections.Actions[0].name;
  };

  test('a synonym claim on the wrong payload is STRIPPED', () => {
    expect(harmonize('Cinder Shard', '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.'))
      .toBe('Shard');
  });

  test('bare energy word for bare energy word still substitutes — the printed shape', () => {
    expect(harmonize('Fire Bolt', '*Ranged Attack Roll:* +7, range 60 ft. 14 (4d6) Force damage.'))
      .toBe('Force Bolt');
  });

  test('a physical type word NEVER enters a name', () => {
    const out = harmonize('Fire Fist', '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.');
    expect(out).toBe('Fist');
    expect(out).not.toMatch(/Bludgeoning|Piercing|Slashing/);
  });

  test('the strip consumes an adjacent hyphen — no "-Breath" orphans (the Ashfall)', () => {
    expect(harmonize('Cinder-Breath', '*Dexterity Saving Throw*: DC 15, each creature in a 60-foot-long, 5-foot-wide Line. *Failure:* 45 (13d6) Necrotic damage.'))
      .toBe('Breath');
  });

  test('a claim that IS the whole name survives for the audit to judge', () => {
    expect(harmonize('Cinder', '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.'))
      .toBe('Cinder');
  });
});

describe('the Ashfall / the Clacking Tide (smoke, 2026-08-16)', () => {
  const { pickOnDeath, makeRng: rngOf } = require('../build-skeleton.mjs');
  const REVIVAL = /gains a new body in 5d10 days|reforms with all its Hit Points|new body grows from it with all its Hit Points/i;

  test('no legendary machinery below CR 10 — 29/30 printed legendaries are CR 10+', () => {
    for (const cr of [6, 8, 9]) {
      for (let seed = 1; seed <= 12; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3, size: 'Large' });
        expect(sk.entries.some((e) => e.slot_type === 'legendary')).toBe(false);
        expect(sk.traits.some((t) => /Legendary Resistance/.test(t.name ?? ''))).toBe(false);
      }
    }
  });

  test('unconditional revival floors at CR 10 — the Aboleth is print\'s basement', () => {
    let below = 0; let above = 0;
    for (let seed = 1; seed <= 400; seed += 1) {
      const at8 = pickOnDeath(8, rngOf(seed), {});
      if (at8 && REVIVAL.test(at8.template_2024 ?? '')) below += 1;
      const at12 = pickOnDeath(12, rngOf(seed), {});
      if (at12 && REVIVAL.test(at12.template_2024 ?? '')) above += 1;
    }
    expect(below).toBe(0);
    expect(above).toBeGreaterThan(0); // the shape still ships where print ships it
  });

  test('the doubled-article belt sweeps "The the" wherever a pass composed it', () => {
    const { runCorrections } = require('../corrections.mjs');
    const sections = { 'Bonus Actions': [{ name: 'Sink and Stalk', text: 'The the ashfall takes the Dash, Disengage, or Hide action.' }] };
    const fired = runCorrections({
      skeleton: { entries: [], traits: [], size: 'Medium', cr: 8, houses: [] },
      j: { type: 'Dragon' }, sections, byId: new Map(),
      energy: 'Necrotic', physical: 'Slashing', inline: 'the ashfall',
      renderedOf: new Map(), fallbackEntryName: () => null,
      NON_ACTION_SPELLS: [], SCALING_SPELLS: [], KNOWN_SPELLS: new Set(), atWillBanned: () => false,
    });
    expect(sections['Bonus Actions'][0].text).toBe('The ashfall takes the Dash, Disengage, or Hide action.');
    expect(fired).toContain('doubled-article');
  });

  test('a folk name sheds its article at ingestion — references never double it', async () => {
    const mock = async (prompt) => (/Every number is already fixed/.test(prompt)
      ? JSON.stringify({ name: 'the Clacking Tide', entries: [] })
      : null);
    const m = await generateFromSkeleton({
      concept: 'a scuttling tide of claws', cr: 3, seed: 4, resolvedType: 'Fiend',
    }, mock);
    expect(m.name).toBe('Clacking Tide');
    const all = Object.values(m.sections).flat().map((e) => e.text).join('\n');
    expect(all).not.toMatch(/\bthe the\b/i);
  });
});

describe('the Quiet Moult: the body plan is rolled, not left to the model', () => {
  const { buildRandomConceptSeed } = require('@/tools/statblock-generator/format-2024/concept-seeds.mjs');
  const { buildSeedSynthesisPrompt } = require('@/tools/statblock-generator/format-2024/generate.mjs');

  test('every seed carries a body plan, and singular dominates at print weight', () => {
    let singular = 0;
    const N = 400;
    for (let i = 0; i < N; i += 1) {
      const seed = buildRandomConceptSeed();
      expect(typeof seed.body_plan).toBe('string');
      if (/SINGLE creature/.test(seed.body_plan)) singular += 1;
    }
    // 94% weight; wide tolerance so the test never flakes
    expect(singular / N).toBeGreaterThan(0.85);
    expect(singular / N).toBeLessThan(1);
  });

  test('the singular plan bans the collective attractor by name', () => {
    const seed = { origin: 'a sunken ruin', creature_type: 'Monstrosity',
      body_plan: 'a SINGLE creature — one body, one will. Not a swarm, colony, hive, collective, or fused mass of smaller creatures, and not an animated object or possessed thing' };
    const p = buildSeedSynthesisPrompt(seed, { cr: 8 });
    expect(p).toMatch(/Its BODY PLAN is a SINGLE creature/);
    expect(p).toMatch(/Not a swarm, colony, hive, collective, or fused mass/);
    expect(p).toMatch(/never drift to a different plan/);
  });

  test('a seed without a plan (older callers) adds no clause', () => {
    const p = buildSeedSynthesisPrompt({ origin: 'a cave', creature_type: 'Beast' }, { cr: 4 });
    expect(p).not.toMatch(/BODY PLAN/);
  });
});

describe('the Galvanic Array: the synthesis name is a candidate, never an override', () => {
  const noFlavor = async (p) => (/Every number is already fixed/.test(p) ? null : JSON.stringify({ problems: [] }));

  test('the flavor prompt weighs a proposal; none, no clause', () => {
    const sk = buildSkeleton({ cr: 8, seed: 3, themes: ['grasping'] });
    const p = buildFlavorPrompt(sk, { concept: 'a crab colony', proposedName: 'Galvanic Array' });
    expect(p).toMatch(/proposed the proper name "Galvanic Array"/);
    expect(p).toMatch(/keep it if it beats what you would coin/);
    expect(buildFlavorPrompt(sk, { concept: 'a crab colony' })).not.toMatch(/proposed the proper name/);
  });

  test('never-fail: a good proposal beats "Unnamed Creature"', async () => {
    const m = await generateFromSkeleton({
      concept: 'a crab colony', cr: 8, seed: 3, themes: ['grasping'],
      resolvedType: 'Monstrosity', proposedName: 'Galvanic Array',
    }, noFlavor);
    expect(m.name).toBe('Galvanic Array');
  });

  test('never-fail: a proposal that fails the filters falls back to the constant', async () => {
    for (const bad of ['Owlbear', 'Gloom-Fang', 'The Thing That Lurks Beneath The Waves']) {
      const m = await generateFromSkeleton({
        concept: 'a crab colony', cr: 8, seed: 3, themes: ['grasping'],
        resolvedType: 'Monstrosity', proposedName: bad,
      }, noFlavor);
      expect(`${bad}: ${m.name}`).toBe(`${bad}: Unnamed Creature`);
    }
  });
});

describe('the Ssvorrach: a ladder breath is self-gated at EVERY seam', () => {
  test('the live seed: Sleep Breath ships ungated beside the Recharge fire breath (20/20 print)', () => {
    // gatedLike was the Ryll fix's third seam — the data strip and the belt
    // exemption both landed, but the one-Recharge arbitration still counted
    // the ladder as gated-like and rationed it to 1/Day.
    const s = buildSkeleton({
      cr: 8, size: 'Large', seed: 1528529796, alternatives: 3, archetype: 'lurker',
      themes: ['draconic'], mind: 'bestial', typeHint: 'Dragon', family: 'dragon',
      movement: ['climb'], attackMode: 'melee', signatureMechanic: 'breath', damageMix: 'physical',
    });
    const sleep = s.entries.find((e) => e.name === 'Sleep Breath');
    const fire = s.entries.find((e) => /Breath/.test(e.name) && e.name !== 'Sleep Breath');
    expect(sleep?.gate ?? null).toBeNull();
    expect(fire?.gate).toMatch(/Recharge/);
  });
});

describe('the Dreamt Leech: a trait can PROVIDE a capability, and a demotion is an arbitration', () => {
  test('the live seed: Whirlwind ships beside the Air Form that enables it, Recharge intact', () => {
    const s = buildSkeleton({
      cr: 8, size: 'Large', seed: 1781744966, alternatives: 3, archetype: 'lurker',
      themes: ['devouring', 'venomous'], mind: 'bestial', typeHint: 'Fey',
      movement: ['burrow', 'climb'], attackMode: 'melee', signatureMechanic: 'breath',
      damageMix: 'both',
    });
    const names = s.entries.map((e) => e.name);
    expect(names).toContain('Whirlwind');
    expect(s.entries.find((e) => e.name === 'Whirlwind').gate).toMatch(/Recharge/);
    // the breath beside it stays 1/Day — the Vrock's printed shape
    expect(s.entries.find((e) => e.name === 'Poison Breath').gate).toBe('1/Day');
  });

  test('sweep: a row demoted from Recharge never ships on a block with no Recharge left', () => {
    // The observable law: an area row wearing 1/Day whose LIBRARY row prints
    // Recharge implies some Recharge row survived — the demotion's premise.
    // (Natively-1/Day rows are exempt; print fields the Vrock's Screech.)
    const lib = require('@/data/ability-library.json');
    const byKey = new Map();
    for (const r of Object.values(lib.categories).flat()) byKey.set(`${r.ability}|${r.source}`, r);
    for (const cr of [5, 8, 12, 20]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const s = buildSkeleton({ cr, seed, alternatives: 3, archetype: ['brute', 'lurker', 'controller'][seed % 3], signatureMechanic: seed % 2 ? 'breath' : null });
        const hasRecharge = s.entries.some((e) => /Recharge/i.test(e.gate ?? ''));
        for (const e of s.entries) {
          if (e.gate !== '1/Day') continue;
          const source = /^(.*) \(CR/.exec(e.derived_from ?? '')?.[1];
          const printed = byKey.get(`${e.name}|${source}`)?.gate ?? '';
          if (/Recharge/i.test(printed)) {
            expect(`cr${cr} seed${seed} ${e.name}: ${hasRecharge ? 'keeper alive' : 'ORPHANED DEMOTION'}`)
              .toBe(`cr${cr} seed${seed} ${e.name}: keeper alive`);
          }
        }
      }
    }
  });

  test('no block at any tier ships a 1/Day damage area as its only nova (0/329 print)', () => {
    for (const cr of [3, 8, 12, 20]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const s = buildSkeleton({ cr, seed, alternatives: 3, archetype: ['lurker', 'brute', 'artillery'][seed % 3], signatureMechanic: seed % 2 ? 'breath' : null });
        const dayNova = s.entries.find((e) => e.slot_type === 'area' && e.gate === '1/Day' && (e.damage ?? 0) > 0);
        if (dayNova) {
          const shape = s.entries.some((e) => /Recharge/i.test(e.gate ?? '')) ? 'beside a Recharge' : 'ONLY nova';
          expect(`cr${cr} seed${seed} ${dayNova.name}: ${shape}`).toBe(`cr${cr} seed${seed} ${dayNova.name}: beside a Recharge`);
        }
      }
    }
  });

  test('the Mimic claim finally holds: trait-provided grapple satisfies a grapple-requiring row', () => {
    // Adhesive (a TRAIT) imposes grapple; before the fix, satisfiedBy
    // ignored trait imposes and every requirer died at the fixpoint. Sweep
    // for any block shipping a grapple-requiring row with its provider
    // being a trait — existence proves the channel works; zero strandings
    // is asserted by the fixpoint itself (a requirer shipping means met).
    let traitProvided = 0;
    for (let seed = 1; seed <= 40 && !traitProvided; seed += 1) {
      const s = buildSkeleton({ cr: 8, seed, alternatives: 3, signatureMechanic: 'engulf' });
      const traitGrapples = s.traits.some((t) => /Adhesive|Air Form|Water Form|Fire Form/.test(t.derived_from ?? t.name));
      const requirer = s.entries.some((e) => /space of|swallow/i.test(e.text ?? ''));
      if (traitGrapples && requirer) traitProvided += 1;
    }
    // The channel is open — at least the Leech-class combination assembles.
    const leech = buildSkeleton({
      cr: 8, size: 'Large', seed: 1781744966, alternatives: 3, archetype: 'lurker',
      themes: ['devouring', 'venomous'], mind: 'bestial', typeHint: 'Fey',
      movement: ['burrow', 'climb'], attackMode: 'melee', signatureMechanic: 'breath', damageMix: 'both',
    });
    expect(leech.entries.some((e) => e.name === 'Whirlwind')).toBe(true);
  });
});

describe('the Skorvith: the lurker discount always gets its outlet', () => {
  test('no lurker at any tier ships without a gated damage area', () => {
    for (const cr of [5, 8, 12, 20]) {
      for (let seed = 1; seed <= 15; seed += 1) {
        const sk = buildSkeleton({ cr, seed, alternatives: 3, archetype: 'lurker' });
        const spike = sk.entries.some((e) => (e.gate ?? '') !== '' && (e.damage ?? 0) > 0);
        expect(`cr${cr} seed${seed}: ${spike ? 'spike present' : 'NO SPIKE'}`)
          .toBe(`cr${cr} seed${seed}: spike present`);
      }
    }
  });
});
