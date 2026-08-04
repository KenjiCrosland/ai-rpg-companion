/**
 * The skeleton builder: numbers from cr-table, slot counts from observed
 * composition, parts from the ability library.
 *
 * The load-bearing assumption is that ANY ability works at ANY CR once its
 * numbers are restamped. That is what lets CR 27 — which has no natively
 * printed abilities at all — build a creature. If that assumption breaks, a
 * high-CR monster silently inherits a CR 3 creature's reach, area size or
 * damage, so most of these tests are pointed at it.
 */
import {
  buildSkeleton, makeRng, numbersFor, pickSlotCounts, pickAbilities, bandFor, crKey, FLAVOR_SLOTS,
} from '../build-skeleton.mjs';
import crTable from '@/data/cr-table.json';
import library from '@/data/ability-library.json';

const ALL_CRS = ['0', '1/8', '1/4', '1/2', ...Array.from({ length: 30 }, (_, i) => String(i + 1))];
// Flavor slots are the model's job, so an unfilled one is correct. Everything
// else is the engine's and must be gone before the skeleton is handed over.
// The module's own contract: anything in FLAVOR_SLOTS is the model's job.
const FLAVOR = FLAVOR_SLOTS;
const SLOT_TOKEN = new RegExp(`\\{(?!(?:${FLAVOR.join('|')})\\})[a-z_0-9]+\\}`);

describe('determinism', () => {
  test('the same seed builds the same creature', () => {
    const a = buildSkeleton({ cr: 11, size: 'Large', seed: 42 });
    const b = buildSkeleton({ cr: 11, size: 'Large', seed: 42 });
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  test('different seeds build different creatures', () => {
    // Not a strict guarantee for any single pair, so sample: if 12 seeds all
    // produce one creature, selection is broken.
    const shapes = new Set(Array.from({ length: 12 }, (_, i) => JSON.stringify(
      buildSkeleton({ cr: 11, size: 'Large', seed: i + 1 }).entries.map((e) => e.name),
    )));
    expect(shapes.size).toBeGreaterThan(4);
  });

  test('makeRng is a stable stream', () => {
    expect(Array.from({ length: 3 }, makeRng(7))).toEqual(Array.from({ length: 3 }, makeRng(7)));
  });
});

describe('numbers come from the frozen table, never from the ability', () => {
  test.each(ALL_CRS)('CR %s matches cr-table exactly', (cr) => {
    const s = buildSkeleton({ cr, size: 'Large', seed: 5 });
    const row = crTable.by_cr[crKey(cr)];
    expect(s.ac).toBe(row.ac);
    expect(s.hp).toBe(row.hp);
    expect(s.attack_bonus).toBe(row.attack_bonus);
    // The DC contract: casters use the table DC (their cast stat is pinned
    // to support it); non-casters key off CON so the sheet reconciles —
    // 8 + PB + table CON mod (four live blocks in a row shipped a DC that
    // matched nothing before this).
    const hasSpell = s.entries.some((e) => /\{spells\}|spellcasting ability/.test(e.text));
    expect(s.save_dc).toBe(hasSpell ? row.save_dc : 8 + row.pb + (row.con_mod ?? 0));
    expect(s.pb).toBe(row.pb);
    expect(typeof s.pb).toBe('number'); // CR 18 and 25-29 had no pb until it was derived
  });

  test('the printed attack bonus is the table value, whatever CR the ability came from', () => {
    for (const cr of ['1', '9', '18', '27', '30']) {
      const s = buildSkeleton({ cr, size: 'Huge', seed: 3 });
      const row = crTable.by_cr[crKey(cr)];
      for (const e of s.entries) {
        for (const m of e.text.matchAll(/Attack Roll:\*?\s*\+(\d+)/g)) {
          expect(`CR ${cr} ${e.name} attack +${m[1]}`).toBe(`CR ${cr} ${e.name} attack +${row.attack_bonus}`);
        }
      }
    }
  });
});

describe('the high-CR assumption', () => {
  // CR 18 and 25-29 have no natively printed abilities. If eligibility were
  // still restricted by source CR these would be empty.
  test.each(['18', '25', '26', '27', '28', '29'])('CR %s still builds a full creature', (cr) => {
    const s = buildSkeleton({ cr, size: 'Gargantuan', seed: 11 });
    expect(s.entries.length).toBeGreaterThan(0);
    expect(s.entries.some((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack')).toBe(true);
  });

  test('an ability borrowed from a much lower CR is fully restamped', () => {
    // The real risk: a CR 27 block keeping a CR 3 creature's reach or damage.
    // Search seeds for a block that borrows low — WHICH seed borrows shifts
    // whenever the RNG stream changes, and that is fine; that borrowing
    // happens at all is the invariant.
    let s = null; let borrowed = [];
    for (let seed = 1; seed <= 40 && !borrowed.length; seed += 1) {
      s = buildSkeleton({ cr: 27, size: 'Gargantuan', seed });
      borrowed = s.entries.filter((e) => /CR (0|1|2|3|4|5)\)/.test(e.derived_from ?? ''));
    }
    const row = crTable.by_cr['27'];
    expect(borrowed.length).toBeGreaterThan(0); // the whole library really is eligible
    for (const e of borrowed) {
      for (const m of e.text.matchAll(/reach (\d+) ft/g)) expect(Number(m[1])).toBe(15); // Gargantuan
      for (const m of e.text.matchAll(/Attack Roll:\*?\s*\+(\d+)/g)) expect(Number(m[1])).toBe(row.attack_bonus);
      for (const m of e.text.matchAll(/DC (\d+)/g)) expect(Number(m[1])).toBe(row.save_dc);
    }
  });

  test('reach follows the size given, not the source creature', () => {
    for (const [size, want] of [['Small', 5], ['Medium', 5], ['Huge', 10], ['Gargantuan', 15]]) {
      const s = buildSkeleton({ cr: 12, size, seed: 8 });
      for (const e of s.entries) {
        for (const m of e.text.matchAll(/reach (\d+) ft/g)) {
          expect(`${size} reach ${m[1]}`).toBe(`${size} reach ${want}`);
        }
      }
    }
  });
});

describe('nothing ships half-rendered', () => {
  test.each(ALL_CRS)('CR %s leaves no unsubstituted slot', (cr) => {
    const s = buildSkeleton({ cr, size: 'Large', seed: 9 });
    const offenders = [...s.entries, ...s.traits]
      .filter((e) => SLOT_TOKEN.test(e.text))
      .map((e) => `${e.name}: ${e.text.match(SLOT_TOKEN)[0]}`);
    // {creature} is deliberately left for the naming step; everything else is
    // the engine's job. Traits used to keep "{radius}-foot radius" literally.
    expect(offenders).toEqual([]);
  });

  test('no entry names a creature the block is not', () => {
    for (let seed = 1; seed <= 8; seed += 1) {
      const s = buildSkeleton({ cr: 14, size: 'Large', seed });
      for (const e of [...s.entries, ...s.traits]) {
        // Creature nouns used as the SUBJECT. "the Elemental Plane of Air"
        // is a place, so exclude a following proper noun.
        expect(e.text).not.toMatch(/\bthe (dragon|elemental|bugbear|azer|roc|hag|merfolk|sphinx|wisp)\b(?! [A-Z])/i);
      }
    }
  });
});

describe('the block holds together', () => {
  test('every referenced attack exists in the block', () => {
    // Borrowed entries name THEIR creature's attack ("makes one Rend attack").
    // Left alone that is a dead end, and unknown-action-ref rejects it.
    for (let seed = 1; seed <= 20; seed += 1) {
      const s = buildSkeleton({ cr: 21, size: 'Huge', seed });
      const names = new Set(s.entries.map((e) => e.name));
      for (const e of s.entries) {
        for (const m of e.text.matchAll(/\b(?:makes?|replace|repeats?) (?:one|two|three|its|a|an|the) ([A-Z][a-z]+(?: [A-Z][a-z]+)?) attack/g)) {
          expect(`seed ${seed}: ${m[1]}`).toBe(`seed ${seed}: ${names.has(m[1]) ? m[1] : [...names].join('/')}`);
        }
      }
    }
  });

  test('an entry that needs another ability only appears alongside it', () => {
    for (let seed = 1; seed <= 20; seed += 1) {
      const s = buildSkeleton({ cr: 20, size: 'Large', seed });
      const present = new Set([...s.entries.map((e) => e.name), ...s.traits.map((t) => t.name)]);
      for (const e of s.entries) {
        for (const m of e.text.matchAll(/\buses? (?:its )?([A-Z][a-z]+(?: [A-Z][a-z]+)*)\b/g)) {
          const ref = m[1];
          if (['Advantage', 'Disadvantage', 'Hit', 'Failure', 'Success', 'Speed', 'Reaction', 'Legendary'].includes(ref)) continue;
          expect(`seed ${seed} ${e.name} -> ${ref}: ${present.has(ref)}`).toBe(`seed ${seed} ${e.name} -> ${ref}: true`);
        }
      }
    }
  });

  test('every creature can attack', () => {
    // Independent slot sampling otherwise yields a CR 3 with two breath
    // weapons and no melee: each count plausible, the combination not.
    for (const cr of ALL_CRS) {
      for (let seed = 1; seed <= 6; seed += 1) {
        const s = buildSkeleton({ cr, size: 'Medium', seed });
        const hasAttack = s.entries.some((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack');
        expect(`CR ${cr} seed ${seed} has an attack: ${hasAttack}`).toBe(`CR ${cr} seed ${seed} has an attack: true`);
      }
    }
  });

  test('no ability or name is used twice in one block', () => {
    for (let seed = 1; seed <= 20; seed += 1) {
      const s = buildSkeleton({ cr: 11, size: 'Large', seed });
      const names = s.entries.filter((e) => e.slot_type !== 'multiattack').map((e) => e.name);
      expect(names.length).toBe(new Set(names).size);
    }
  });

  test('trait-section abilities never arrive as actions', () => {
    // Composition counted Death Burst and Fire Aura as TRAITS, so the ability
    // pool must not draw them or the sampled counts become unfillable.
    const traitPool = new Set(Object.values(library.categories).flat()
      .filter((a) => a.pool === 'trait').map((a) => a.ability));
    for (let seed = 1; seed <= 15; seed += 1) {
      const s = buildSkeleton({ cr: 5, size: 'Medium', seed });
      for (const e of s.entries) {
        if (e.slot_type === 'multiattack') continue;
        expect(`${e.name} in actions: ${traitPool.has(e.name) && e.section !== 'Traits'}`)
          .toBe(`${e.name} in actions: false`);
      }
    }
  });
});

describe('slot counts and multiattack', () => {
  test('sampled counts stay inside the observed range for the band', () => {
    for (const cr of ALL_CRS) {
      const slots = library.composition.by_band[bandFor(cr)].slots;
      for (let seed = 1; seed <= 10; seed += 1) {
        const counts = pickSlotCounts(cr, makeRng(seed));
        for (const [slot, n] of Object.entries(counts)) {
          const observed = Object.keys(slots[slot].weights).map(Number);
          // plain_attack may be raised to 1 by the floor above
          if (slot === 'plain_attack' && n === 1) continue;
          expect(`CR ${cr} ${slot}=${n}`).toBe(`CR ${cr} ${slot}=${observed.includes(n) ? n : observed.join('|')}`);
        }
      }
    }
  });

  test('multiattack comes from the band median and is stated in words', () => {
    for (const cr of ALL_CRS) {
      const s = buildSkeleton({ cr, size: 'Large', seed: 2 });
      expect(s.multiattack).toBe(library.composition.multiattack.by_band[bandFor(cr)].median);
      const ma = s.entries.find((e) => e.slot_type === 'multiattack');
      if (ma) expect(ma.text).toMatch(/makes (one|two|three|four|five|six) /);
    }
  });

  test('numbersFor rejects a CR that is not in the table', () => {
    expect(() => numbersFor(31)).toThrow();
    expect(numbersFor(30).multiattack).toBeGreaterThan(0);
  });
});

describe('damage', () => {
  test('a gated area gets a full round of attacks, an ungated one does not', () => {
    // Measured: gated areas run 1.03x a round of attacks, ungated 0.30x. The
    // recharge gate is what pays for it.
    const r = library._meta.damage_ratios;
    expect(r.gated_area_multiplier).toBe(1);
    expect(r.ungated_area_multiplier).toBeLessThan(0.5);
  });

  test('routine damage tracks the table rather than the borrowed ability', () => {
    for (const cr of ['5', '11', '17', '24']) {
      const s = buildSkeleton({ cr, size: 'Large', seed: 6 });
      const row = crTable.by_cr[crKey(cr)];
      const expected = row.per_attack_damage * s.multiattack;
      // one dice-rounding step of slack either way
      expect(Math.abs(s.routine_damage - expected) / expected).toBeLessThan(0.35);
    }
  });

  test('a block with an area may exceed dpr_target, and that is correct', () => {
    // Published blocks with an area run 1.57x / 1.39x / 1.08x of dpr_target by
    // band, and the dragon wyrmlings reach 2.0-2.56x. Clamping generated
    // blocks back to the target would make every breath weapon weak.
    expect(crTable._meta.dpr_target_with_area).toMatch(/2\.56x|exceed/i);
  });
});

describe('archetype affinity guides selection without constraining it', () => {
  /**
   * Abilities carry OVERLAPPING archetype tags derived from their mechanics —
   * a Constrictor's Constrict is both brute and controller. The archetype
   * comes from the existing resolve micro-call, so a concept reaches ability
   * selection with no extra LLM round.
   *
   * Weighting, never filtering. The old archetype system constrained the slot
   * plan, which is part of why every monster of a role felt alike.
   */
  const tally = (archetype, cr = 9, n = 150) => {
    const counts = {};
    for (let seed = 1; seed <= n; seed += 1) {
      for (const e of buildSkeleton({ cr, size: 'Large', seed, archetype }).entries) {
        for (const t of e.archetypes ?? []) counts[t] = (counts[t] ?? 0) + 1;
      }
    }
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    return (k) => (counts[k] ?? 0) / total;
  };

  test('asking for an archetype raises its share', () => {
    const base = tally(null);
    for (const arch of ['brute', 'controller', 'lurker', 'artillery']) {
      const withArch = tally(arch);
      expect(`${arch}: ${withArch(arch) > base(arch)}`).toBe(`${arch}: true`);
    }
  });

  test('but never excludes the others', () => {
    // A lurker can still surprise you with a breath weapon. Every archetype
    // must remain represented whatever was asked for.
    for (const arch of ['brute', 'controller', 'lurker', 'artillery']) {
      const t = tally(arch);
      for (const other of ['brute', 'artillery', 'controller', 'lurker']) {
        expect(`${arch} still yields ${other}: ${t(other) > 0}`).toBe(`${arch} still yields ${other}: true`);
      }
    }
  });

  test('untagged abilities stay neutral and remain available', () => {
    // Most passive traits carry no archetype: Amphibious suits anyone.
    const untagged = Object.values(library.categories).flat().filter((a) => !(a.archetypes ?? []).length);
    expect(untagged.length).toBeGreaterThan(0);
    const seen = new Set();
    for (let seed = 1; seed <= 60; seed += 1) {
      for (const e of buildSkeleton({ cr: 9, size: 'Large', seed, archetype: 'brute' }).entries) {
        if (!(e.archetypes ?? []).length) seen.add(e.name);
      }
    }
    expect(seen.size).toBeGreaterThan(0);
  });

  test('tags are multi-label, so one ability serves several roles', () => {
    const abilities = Object.values(library.categories).flat();
    const multi = abilities.filter((a) => (a.archetypes ?? []).length > 1);
    expect(multi.length).toBeGreaterThan(50);
    const constrict = abilities.find((a) => a.ability === 'Constrict');
    expect(constrict.archetypes).toEqual(expect.arrayContaining(['brute', 'controller']));
  });

  test('the skeleton records which archetype it was built for', () => {
    expect(buildSkeleton({ cr: 9, size: 'Large', seed: 1, archetype: 'lurker' }).archetype).toBe('lurker');
    expect(buildSkeleton({ cr: 9, size: 'Large', seed: 1 }).archetype).toBeNull();
  });
});

describe('every engine slot in the library is fillable', () => {
  // The {rider2_damage}, {heal} and {spell_attack} gaps each surfaced only
  // when an RNG stream shift happened to pick the row that used them. This
  // sweeps ALL rows so a new slot can never hide behind pick luck.
  test('fillTemplate leaves no engine slot in any row', () => {
    const { fillTemplate } = require('../build-skeleton.mjs');
    const nums = numbersFor(10);
    const offenders = [];
    const rows = [
      ...Object.values(library.categories).flat(),
      ...Object.values(library.traits.by_category).flat(),
    ];
    for (const a of rows) {
      let text;
      try { text = fillTemplate(a, { cr: 10, size: 'Large', nums }).text; } catch { continue; }
      const m = text.match(new RegExp(`\\{(?!(?:${FLAVOR.join('|')})\\})[a-z_0-9]+\\}`));
      if (m) offenders.push(`${a.source}/${a.ability ?? a.trait}: ${m[0]}`);
    }
    expect(offenders).toEqual([]);
  });
});

describe('form invariants: slotted and filled text must agree', () => {
  /**
   * Helpers here see entry text in TWO forms — slotted ({line_length}) at
   * pick time, filled ("90-foot-long") after substitution — and a regex
   * written against one silently misses the other. shapeKeyOf had exactly
   * this bug within an hour of being written: a filled Line read as a
   * single-target attack and slipped past the structural dedupe.
   */
  const { shapeKeyOf, fillTemplate } = require('../build-skeleton.mjs');
  const abilities = Object.values(library.categories).flat();

  test('shapeKeyOf gives the same answer for every row in both forms', () => {
    const nums = numbersFor(10);
    const offenders = [];
    for (const a of abilities) {
      const slotted = shapeKeyOf(a.template_2024);
      let filledText;
      try {
        filledText = fillTemplate(a, { cr: 10, size: 'Large', nums }).text;
      } catch { continue; } // rows the filler can't process alone are not pickable alone
      const filled = shapeKeyOf(filledText);
      if (slotted !== filled) offenders.push(`${a.source}/${a.ability}: ${slotted} -> ${filled}`);
    }
    expect(offenders).toEqual([]);
  });

  test('every damage-bearing row carries a stamped damage_class', () => {
    const CLASSES = ['attack', 'area', 'save_nuke', 'legendary', 'recurring'];
    const offenders = [];
    for (const a of abilities) {
      const hasDamage = /\{damage\}|\{rider_damage\}|\d+ \(\d+d\d+/.test(a.template_2024);
      if (hasDamage && !CLASSES.includes(a.damage_class)) offenders.push(`${a.source}/${a.ability}`);
      if (!hasDamage && a.damage_class) offenders.push(`${a.source}/${a.ability}: class on damage-less row`);
    }
    expect(offenders).toEqual([]);
  });

  test('the stamped class matches what the text says it is', () => {
    // The stamp is a cache of the classifier, and a stale cache budgets
    // damage off the wrong curve. Recompute and compare.
    const offenders = [];
    for (const a of abilities) {
      if (!a.damage_class) continue;
      const recomputed = /At the end of each of the \{creature\}'s turns|starts its turn (?:in|within)/.test(a.template_2024) ? 'recurring'
        : a.section === 'Legendary Actions' ? 'legendary'
          : a.slot_type === 'area' ? 'area'
            : a.slot_type === 'save_damage' ? 'save_nuke' : 'attack';
      if (recomputed !== a.damage_class) offenders.push(`${a.source}/${a.ability}: ${a.damage_class} vs ${recomputed}`);
    }
    expect(offenders).toEqual([]);
  });
});

describe('engine-filled condition slots', () => {
  const { fillTemplate } = require('../build-skeleton.mjs');
  const nums = numbersFor(10);
  const softRow = {
    source: 'Test', ability: 'Gaze', cr: '10', slot_type: 'save_effect',
    template_2024: '*Wisdom Saving Throw*: DC {dc}, one creature within {sight_range} feet. *Failure:* The target has the {condition_soft} condition until the start of its next turn.',
    condition_default: 'Frightened',
  };
  const hardRow = {
    source: 'Test', ability: 'Screech', cr: '10', slot_type: 'area', gate: 'Recharge 5-6',
    template_2024: '*Constitution Saving Throw*: DC {dc}, each creature in a {area}-foot Cone. *Failure:* The target has the {condition_hard} condition until the end of its next turn.',
    condition_default: 'Stunned',
  };

  test('no rng ships the printed original — never-fail stays print-identical', () => {
    expect(fillTemplate(softRow, { cr: 10, size: 'Large', nums }).text).toContain('Frightened');
    expect(fillTemplate(hardRow, { cr: 10, size: 'Large', nums }).text).toContain('Stunned');
  });

  test('fills never leave the save-stat menu print uses', () => {
    // Wis save: Frightened/Charmed/Deafened are printed on Wis; Poisoned is
    // Constitution 13/13 and must never appear on a Wisdom save.
    const seen = new Set();
    for (let s = 1; s <= 300; s += 1) {
      const t = fillTemplate(softRow, { cr: 10, size: 'Large', nums, rng: makeRng(s) }).text;
      seen.add(t.match(/has the (\w+) condition/)[1]);
    }
    expect(seen.has('Poisoned')).toBe(false);
    expect(seen.has('Frightened')).toBe(true);
    expect(seen.size).toBeGreaterThan(1); // it does vary
    // hard tier stays hard: nothing outside Paralyzed/Stunned
    for (let s = 1; s <= 100; s += 1) {
      const t = fillTemplate(hardRow, { cr: 10, size: 'Large', nums, rng: makeRng(s) }).text;
      expect(['Paralyzed', 'Stunned']).toContain(t.match(/has the (\w+) condition/)[1]);
    }
  });

  test('themes damp toward affinity without excluding the rest', () => {
    const conRow = { ...softRow, template_2024: softRow.template_2024.replace('Wisdom', 'Constitution'), condition_default: 'Blinded' };
    let poisoned = 0; let other = 0;
    for (let s = 1; s <= 400; s += 1) {
      const t = fillTemplate(conRow, { cr: 10, size: 'Large', nums, rng: makeRng(s), themes: ['venomous'] }).text;
      if (/Poisoned/.test(t)) poisoned += 1; else other += 1;
    }
    expect(poisoned).toBeGreaterThan(100); // boosted well above its 1-in-3 base
    expect(other).toBeGreaterThan(0); // guide, never constrain
  });

  test('same seed, same fill', () => {
    const a = fillTemplate(softRow, { cr: 10, size: 'Large', nums, rng: makeRng(7) }).text;
    const b = fillTemplate(softRow, { cr: 10, size: 'Large', nums, rng: makeRng(7) }).text;
    expect(a).toBe(b);
  });
});
