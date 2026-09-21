/**
 * Guards the composition data in src/data/ability-library.json.
 *
 * Composition is the slot-count layer: how many attacks, traits, areas and
 * legendary actions a creature of a given CR band should have. It is profiled
 * OFFLINE from the SRD; generation reads it and never profiles anything.
 *
 * The first version of this data shipped with two silent defects, and both
 * are the reason this file exists:
 *
 *  1. It stored only the top 8 joint shapes per band. At CR 8-14 that covered
 *     39% of creatures, so 14 of 41 monsters were simply invisible to the
 *     sampler. Nothing said so.
 *  2. Every stored shape recorded `trait: 0`, while 29 of 29 creatures at
 *     CR 15+ have traits (median 2). Any creature built from that data would
 *     have come out with no traits at all.
 *
 * Joint shapes are gone entirely: at CR 8-14 there are 37 distinct shapes
 * across 41 creatures, 33 of them one-offs, so the most common joint shape
 * describes 4% of monsters. Slot counts are now sampled independently.
 */
const lib = require('../ability-library.json');
const srd = require('../srd52-monsters.json');
const monsters = (Array.isArray(srd) ? srd : Object.values(srd))
  .filter((m) => (m.type || '').split(' ')[0] !== 'Beast');

const BANDS = ['0-2', '3-7', '8-14', '15-20', '21-30'];
const SLOTS = ['plain_attack', 'rider_attack', 'area', 'save_effect',
  'save_damage', 'utility', 'trait', 'legendary', 'gated'];
const VARIETY = ['plain_attack', 'rider_attack', 'area', 'save_effect', 'save_damage', 'utility'];
const COMPLEXITY = ['trait', 'legendary', 'gated'];
const band = (b) => lib.composition.by_band[b];

describe('composition data', () => {
  test('every band carries every slot type', () => {
    for (const b of BANDS) {
      expect(band(b)).toBeDefined();
      for (const s of SLOTS) expect(band(b).slots[s]).toBeDefined();
    }
  });

  test('no creature is truncated away: weights account for the whole sample', () => {
    // The original defect. A top-N cap leaves weights summing to less than
    // the population, which is exactly what this catches.
    for (const b of BANDS) {
      for (const s of SLOTS) {
        const slot = band(b).slots[s];
        const summed = Object.values(slot.weights).reduce((a, x) => a + x, 0);
        expect(`${b}/${s} weights sum to ${summed}`).toBe(`${b}/${s} weights sum to ${slot.n}`);
      }
    }
  });

  test('band creature counts match the SRD', () => {
    const counts = { '0-2': 0, '3-7': 0, '8-14': 0, '15-20': 0, '21-30': 0 };
    for (const m of monsters) {
      const b = m.cr <= 2 ? '0-2' : m.cr <= 7 ? '3-7' : m.cr <= 14 ? '8-14'
        : m.cr <= 20 ? '15-20' : '21-30';
      counts[b] += 1;
    }
    for (const b of BANDS) expect(band(b).creatures_in_band).toBe(counts[b]);
  });

  test('traits are present at every band', () => {
    // The second original defect: traits recorded as zero everywhere.
    for (const b of BANDS) expect(band(b).slots.trait.mean).toBeGreaterThan(0.5);
    // and they must actually grow with CR, which is the real signal
    expect(band('15-20').slots.trait.mean).toBeGreaterThan(band('0-2').slots.trait.mean * 2);
  });

  test('every CR 15+ creature can get traits and legendary actions', () => {
    // No "0" bucket at the top means the sampler can never roll a trait-less
    // or legendary-less high-CR monster, which matches the corpus.
    for (const b of ['15-20', '21-30']) {
      expect(band(b).slots.trait.weights['0']).toBeUndefined();
    }
    expect(band('21-30').slots.legendary.weights['0']).toBeUndefined();
  });
});

describe('dragon de-skew', () => {
  /**
   * 8 of 12 creatures at CR 21-30 are dragons sharing one layout, so the
   * high bands as printed describe a dragon rather than a monster. Variety
   * slots pool in the CR 8-14 non-dragons; complexity slots must NOT, since
   * pooling collapsed legendary from 2.14 to 1.13 when every CR 21-30
   * creature has legendary actions.
   */
  test('variety slots pool at CR 15+, complexity slots never do', () => {
    for (const b of ['15-20', '21-30']) {
      for (const s of VARIETY) expect(band(b).slots[s].sampled_from).toBe('band + CR 8-14 non-dragons');
      for (const s of COMPLEXITY) expect(band(b).slots[s].sampled_from).toBe('band');
    }
    for (const b of ['0-2', '3-7', '8-14']) {
      for (const s of SLOTS) expect(band(b).slots[s].sampled_from).toBe('band');
    }
  });

  test('legendary actions survive the pooling', () => {
    // The thing pooling would have destroyed. Every CR 21-30 creature in the
    // SRD has 2 or 3; a mean under 2 means complexity got diluted.
    expect(band('21-30').slots.legendary.mean).toBeGreaterThanOrEqual(2);
    expect(band('15-20').slots.legendary.mean).toBeGreaterThan(band('8-14').slots.legendary.mean);
    expect(band('0-2').slots.legendary.mean).toBe(0);
  });

  test('area is de-skewed away from every-monster-has-a-breath-weapon', () => {
    // As printed the CR 15-20 area mean is 0.71, almost entirely dragon
    // breath. Collapsing the dragons to a single family vote independently
    // gives 0.35, so the pooled value belongs near there, not near 0.71.
    for (const b of ['15-20', '21-30']) {
      expect(band(b).slots.area.mean).toBeLessThan(0.55);
      expect(band(b).slots.area.mean).toBeGreaterThan(0.15);
    }
  });

  test('the skew and the sampling rule are documented in the file', () => {
    expect(lib.composition._dragon_skew).toMatch(/dragon/i);
    expect(lib.composition._note).toMatch(/INDEPENDENTLY/);
    expect(lib.composition.by_band['21-30'].dragons_in_band).toBeGreaterThan(0);
  });
});

describe('damage slots', () => {
  /**
   * Every multi-damage ability originally reused ONE {damage} slot for both
   * instances, so substituting a single value rendered the rider at full
   * main-damage value: the Ancient Red Dragon's Rend would read 38 instead
   * of 29, about 31% hot, on 157 rows.
   *
   * Two kinds of second instance exist and they must never be confused:
   *   additive    "plus 4 (1d8) Acid damage"                    -> sums
   *   alternative "or 12 (2d8+3) Piercing damage if Grappled"   -> replaces
   * Summing an alternative overstates the attack (the Mimic's Bite would
   * total 7 + 12 + 4 = 23 against a real ceiling of 16).
   */
  const abilities = Object.values(lib.categories).flat();
  const DMG = /(\d+) \((\d+d\d+(?: [+-] \d+)?)\) (\w+) damage/g;
  const TYPES = 'Piercing|Slashing|Bludgeoning|Fire|Cold|Acid|Poison|Necrotic|Radiant|Psychic|Force|Lightning|Thunder';

  // Every SRD creature, Beasts INCLUDED: Beasts are excluded from composition
  // sampling (they skew the low bands) but their abilities are in the library.
  const printed = {};
  for (const m of (Array.isArray(srd) ? srd : Object.values(srd))) {
    for (const arr of Object.values(m.sections || {})) {
      for (const e of arr || []) printed[`${m.name}|${(e.name || '').split(' (')[0]}`] = e.text || '';
    }
  }

  test('no template reuses a damage slot', () => {
    const offenders = abilities
      .filter((a) => (a.template_2024.match(/\{damage\}/g) || []).length > 1)
      .map((a) => `${a.source}/${a.ability}`);
    expect(offenders).toEqual([]);
  });

  test('no template carries a hard-coded damage number', () => {
    // Except self-damage weaknesses, which are fixed by rule not by CR.
    const offenders = abilities
      .filter((a) => !a.self_damage && new RegExp(`\\b\\d+ (${TYPES}) damage`).test(a.template_2024))
      .map((a) => `${a.source}/${a.ability}`);
    expect(offenders).toEqual([]);
  });

  test('substituting the recorded numbers reproduces the printed SRD damage', () => {
    // The strongest available check: the templates are only trustworthy if
    // they rebuild the statblock they came from.
    const offenders = [];
    for (const a of abilities) {
      if (!a.damage_instances || a.self_damage) continue;
      // generified rows (Binding Snare, nee Web) keep their print identity
      // in print_name
      const src = printed[`${a.source}|${a.print_name ?? a.ability}`];
      if (!src) { offenders.push(`${a.source}/${a.ability}: source entry missing`); continue; }
      const want = [...src.matchAll(DMG)].map((m) => m.slice(1, 4).join(' '));
      const n = a.numbers;
      const flat = n.flat_damage_source || n.dice === null;
      const subs = flat
        ? { '{damage}': n.damage, '{dice}': n.dice, '{damage_type}': n.damage_type }
        : { '{damage}': want[0].split(' ')[0], '{dice}': want[0].split(' ').slice(1, -1).join(' '), '{damage_type}': want[0].split(' ').pop() };
      for (const p of ['rider', 'rider2', 'rider3', 'alt', 'alt2']) {
        if (n[`${p}_damage`] === undefined) continue;
        subs[`{${p}_damage}`] = n[`${p}_damage`];
        subs[`{${p}_dice}`] = n[`${p}_dice`];
        subs[`{${p}_damage_type}`] = n[`${p}_damage_type`];
      }
      let out = a.template_2024;
      for (const [k, v] of Object.entries(subs)) out = out.split(k).join(String(v));
      const got = [...out.matchAll(DMG)].map((m) => m.slice(1, 4).join(' '));
      if (got.join(' | ') !== want.join(' | ')) {
        offenders.push(`${a.source}/${a.ability}: got [${got}] want [${want}]`);
      }
    }
    expect(offenders).toEqual([]);
  });

  test('additive and alternative instances are labelled, and both kinds exist', () => {
    const withInstances = abilities.filter((a) => a.damage_instances);
    expect(withInstances.length).toBeGreaterThan(150);
    for (const a of withInstances) {
      const { additive, alternative } = a.damage_instances;
      const slots = (a.template_2024.match(/\{(rider\d?|alt\d?)_damage\}/g) || []).length;
      expect(`${a.source}/${a.ability} declares ${additive + alternative}`)
        .toBe(`${a.source}/${a.ability} declares ${slots}`);
    }
    // The Mimic is the row that proves the distinction matters.
    const mimic = abilities.find((a) => a.source === 'Mimic' && a.ability === 'Bite');
    expect(mimic.damage_instances).toEqual({ additive: 1, alternative: 1 });
  });

  test('the budget split is documented', () => {
    expect(lib._meta.damage_slots.budget_split).toMatch(/61%/);
    expect(lib._meta.damage_slots.alternative).toMatch(/Never sum/);
  });
});

describe('scale slots: reach, target size, area', () => {
  /**
   * These scale off DIFFERENT things and getting that wrong is silent:
   *
   *   reach  -> creature SIZE. Holding size at Medium, reach stays 5 ft
   *             across every CR band; varying size gives 5/5/5/10/15. The
   *             apparent CR correlation is only that big creatures are rarer
   *             at low CR.
   *   area   -> CR, on the dragon-breath ladder (15/30/60/90, Tarrasque 150).
   *   target -> the creature's OWN size (median offset 0).
   *
   * Emanations above 60 ft are audible-range control effects, not blast
   * radii, and are pinned rather than scaled: the Harpy's Luring Song is a
   * 300-foot emanation at CR 1.
   */
  const abilities = Object.values(lib.categories).flat();
  const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
  // Deliberately matches ANY "N-foot" phrase, not a list of known shapes. The
  // first version of this checked only Cone and Emanation, and 24 Lines plus
  // 11 radii sailed through unslotted while the test stayed green.
  const SCALE = /reach \d+ ft|(?:Tiny|Small|Medium|Large|Huge|Gargantuan) (?:or smaller|creature)|\d+-foot[- ]?\w*/g;
  const SCALE_KEYS = ['reach', 'target_size', 'area', 'capacity_size', 'capacity_size_minor',
    'line_length', 'line_width', 'radius', 'height'];

  const printed = {};
  for (const m of (Array.isArray(srd) ? srd : Object.values(srd))) {
    for (const arr of Object.values(m.sections || {})) {
      for (const e of arr || []) printed[`${m.name}|${(e.name || '').split(' (')[0]}`] = e.text || '';
    }
  }

  test('every row knows the size of the creature it came from', () => {
    // Was `?` on all 612 rows, which made reach unscalable.
    for (const a of abilities) expect(SIZES).toContain(a.source_size);
  });

  test('no unslotted scale literal survives, in any shape', () => {
    const offenders = [];
    for (const a of abilities) {
      // fixed_range rows keep printed reach deliberately (the Balor's
      // whip reaches 30 so its 25-foot pull isn't dead range)
      if (!a.fixed_range && /reach \d+ ft/.test(a.template_2024)) offenders.push(`${a.source}/${a.ability}: reach`);
      if (/(Tiny|Small|Medium|Large|Huge|Gargantuan) (or smaller|creature)/.test(a.template_2024)) {
        offenders.push(`${a.source}/${a.ability}: size gate`);
      }
      // any N-foot phrase, whatever the shape — Cone, Line, Sphere, Cylinder
      if (!a.fixed_area && /\d+-foot/.test(a.template_2024)) {
        offenders.push(`${a.source}/${a.ability}: ${a.template_2024.match(/\d+-foot[- ]?\w*/)[0]}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  test('substituting the recorded scale values reproduces the printed SRD text', () => {
    const offenders = [];
    for (const a of abilities) {
      const n = a.numbers || {};
      if (!SCALE_KEYS.some((k) => k in n)) continue;
      // generified rows (Binding Snare, nee Web) keep their print identity
      // in print_name
      const src = printed[`${a.source}|${a.print_name ?? a.ability}`];
      let out = a.template_2024;
      for (const k of SCALE_KEYS) if (k in n) out = out.split(`{${k}}`).join(n[k]);
      const got = (out.match(SCALE) || []).join(' | ');
      const want = (src.match(SCALE) || []).join(' | ');
      if (got !== want) offenders.push(`${a.source}/${a.ability}: got [${got}] want [${want}]`);
    }
    expect(offenders).toEqual([]);
  });

  test('the 2014 side is generified and scales like the 2024 side', () => {
    // The 2014 templates were extracted separately and kept literal creature
    // types ("The dragon exhales") and literal areas ("a 15-foot cone") while
    // the 2024 side had slots. A converted monster would have announced
    // itself as a dragon and refused to scale its breath.
    const named = abilities.filter((a) => a.template_2014
      && /\b[Tt]he (dragon|elemental|giant|golem|mephit|devil|demon|hag|naga|sphinx)\b/.test(a.template_2014));
    expect(named.map((a) => `${a.source}/${a.ability}`)).toEqual([]);

    const unscaled = abilities.filter((a) => a.template_2014 && !a.fixed_area
      && /\{(area|line_length)\}/.test(a.template_2024)
      && /\d+-foot (cone|line|radius)/.test(a.template_2014));
    expect(unscaled.map((a) => `${a.source}/${a.ability}`)).toEqual([]);
  });

  test('every derived area value is a multiple of 5 feet', () => {
    const t = lib._meta.scale_slots.area;
    const offenders = [];
    for (const key of ['cone_by_band', 'emanation_by_band', 'line_length_by_band',
      'line_width_by_band', 'radius_by_band']) {
      for (const [b, v] of Object.entries(t[key])) {
        if (v % 5 !== 0) offenders.push(`${key}[${b}] = ${v}`);
      }
    }
    // A raw median produced 7-foot and 25-foot radii, which are not D&D numbers.
    expect(offenders).toEqual([]);
  });

  test('reach follows size and never CR', () => {
    const t = lib._meta.scale_slots.reach.by_size;
    expect(t.Small).toBe(5);
    expect(t.Medium).toBe(5);
    expect(t.Huge).toBe(10);
    expect(t.Gargantuan).toBe(15);
    // strictly non-decreasing as the creature gets bigger
    const seq = SIZES.filter((s) => t[s] !== undefined).map((s) => t[s]);
    for (let i = 1; i < seq.length; i += 1) expect(seq[i]).toBeGreaterThanOrEqual(seq[i - 1]);
  });

  test('cone size follows the dragon-breath ladder', () => {
    const c = lib._meta.scale_slots.area.cone_by_band;
    expect([c['0-7'], c['8-14'], c['15-20'], c['21-30']]).toEqual([15, 30, 60, 90]);
  });

  test('long-range emanations are pinned, not scaled', () => {
    // `fixed_area` covers two different reasons, so check the emanation ones
    // specifically. The others are lengths that are not areas of effect at
    // all: a Magmin's light radius, and the 1-foot Cube of a metal OBJECT the
    // Rust Monster destroys. Scaling either would be nonsense.
    const pinned = abilities.filter((a) => a.fixed_area && /Emanation/.test(a.template_2024));
    expect(pinned.map((a) => a.source).sort()).toEqual(['Harpy', 'Sphinx of Lore', 'Sphinx of Valor']);
    for (const a of abilities.filter((x) => x.fixed_area)) expect(a.scale_note).toBeTruthy();
    // the Harpy is the proof: 300 ft at CR 1, so this is not a CR axis
    const harpy = pinned.find((a) => a.source === 'Harpy');
    expect(harpy.cr).toBe('1');
    expect(harpy.template_2024).toMatch(/300-foot Emanation/);
    // and every emanation band value stays at combat scale
    for (const v of Object.values(lib._meta.scale_slots.area.emanation_by_band)) {
      expect(v).toBeLessThanOrEqual(60);
    }
  });

  test('no template starts a sentence in lower case', () => {
    // Generifying "The elemental" to "{creature}" dropped the capital.
    const offenders = abilities
      .filter((a) => /^[a-z]/.test(a.template_2024)
        || /(?<=[.!?]) +(the|a|an|it|its|each|any)\b/.test(a.template_2024))
      .map((a) => `${a.source}/${a.ability}`);
    expect(offenders).toEqual([]);
  });
});

describe('slot counts that must not be "corrected" into rising with CR', () => {
  test('attack count is flat across every band', () => {
    // Monsters have one or two attack ENTRIES at any CR; Multiattack is what
    // scales. Observed means run 1.04 / 1.15 / 1.07 / 1.12 / 1.05. If a later
    // pass makes this climb, someone has mistaken attack count for a CR axis
    // and high-CR blocks will double-count their damage.
    const means = BANDS.map((b) => band(b).slots.plain_attack.mean);
    expect(Math.max(...means) - Math.min(...means)).toBeLessThan(0.4);
    const riders = BANDS.map((b) => band(b).slots.rider_attack.mean);
    expect(Math.max(...riders) - Math.min(...riders)).toBeLessThan(0.4);
  });

  test('weights are counts keyed by slot count', () => {
    for (const b of BANDS) {
      for (const s of SLOTS) {
        for (const [k, v] of Object.entries(band(b).slots[s].weights)) {
          expect(k).toMatch(/^\d+$/);
          expect(Number.isInteger(v) && v > 0).toBe(true);
        }
      }
    }
  });
});
