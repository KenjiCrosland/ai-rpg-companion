/**
 * Templates carry MECHANICS ONLY. Flavor is the model's job.
 *
 * A template reading "the dragon exhales lightning in a 30-foot line" forces
 * every creature built from it to have lungs, a lightning theme, and a
 * dragon's identity. Only the shape, the save, the damage and the counterplay
 * are reusable.
 *
 * Removing flavor is also what let the library consolidate: Acid Breath, Fire
 * Breath and Lightning Breath became ONE line mechanic with three names, and
 * the Bronze Dragon's Repulsion Breath stopped being four mechanics once its
 * push distance (30/40/60/60 by age) became a slot.
 */
const lib = require('../ability-library.json');

const ROWS = [
  ...Object.values(lib.categories).flat(),
  ...Object.values(lib.traits.by_category).flat(),
];
const label = (r) => `${r.source}/${r.ability ?? r.trait}`;
const texts = (r) => ['template_2024', 'template_2014'].map((f) => r[f]).filter(Boolean);

describe('no flavor in the mechanics', () => {
  test('no element or material word appears in any template', () => {
    const ELEM = /\b(fire|flames?|flaming|burning|lightning|thunder|acid|acidic|poisonous|frost|icy|ice|freezing|scalding|venomous|hail|steam|smoke|spores?|mist)\b/i;
    // Italic spans are RULES references (spell names: *Faerie Fire*, *Wall
    // of Fire*), not flavor — stripping "Fire" out of a spell name minted
    // "Wall of moss-sheathed root and stone" on a live block.
    const deSpell = (t) => t.replace(/\*[^*\n]+\*/g, '')
      // Defense clauses are RULES values, not flavor: the web's
      // "Vulnerability to Fire damage" is printed counterplay (a
      // {substance} slot there shipped "Vulnerability to alabaster dust
      // damage" — the circular-fill class, live on the Uulghoth).
      .replace(/(?:Vulnerability|Immunity|Resistance) to [\w, ]+ damage/g, '');
    const offenders = ROWS.filter((r) => texts(r).some((t) => ELEM.test(deSpell(t))))
      .map((r) => `${label(r)}: ${deSpell(texts(r).find((t) => ELEM.test(deSpell(t)))).match(ELEM)[0]}`);
    expect(offenders).toEqual([]);
  });

  test('no delivery verb assumes a body plan', () => {
    // "exhales" needs lungs. An ooze does not have lungs.
    const VERB = /\b(exhales?|spits?|vomits?|belches?)\b/i;
    expect(ROWS.filter((r) => texts(r).some((t) => VERB.test(t))).map(label)).toEqual([]);
  });

  test('no effect is named after the creature that had it', () => {
    const NAMED = /\blycanthropy\b|\b\w+ rot\b|\b\w+ Metal trait\b/i;
    expect(ROWS.filter((r) => texts(r).some((t) => NAMED.test(t))).map(label)).toEqual([]);
  });
});

describe('distances scale rather than sitting literal', () => {
  test('push, sight and teleport distances are slots', () => {
    // Ranges over 200 ft are pinned, not scaled: they are sensory reach
    // rather than combat range, and carry fixed_range with a reason. Same
    // rule as the Sphinx's 500-foot roar.
    const LIT = /pushed (?:up to )?\d+ feet|see within \d+ feet|up to \d+ feet to an unoccupied/;
    const offenders = ROWS.filter((r) => !r.fixed_range && texts(r).some((t) => LIT.test(t)))
      .map((r) => `${label(r)}: ${texts(r).find((t) => LIT.test(t)).match(LIT)[0]}`);
    expect(offenders).toEqual([]);
    for (const r of ROWS.filter((x) => x.fixed_range)) expect(r.scale_note).toBeTruthy();
  });

  test('every scale slot has a per-band table behind it', () => {
    for (const k of ['push_distance', 'sight_range', 'teleport_distance']) {
      expect(lib._meta.scale_slots[k].by_band).toBeDefined();
      for (const v of Object.values(lib._meta.scale_slots[k].by_band)) expect(v % 5).toBe(0);
    }
  });
});

describe('generification never eats rules words', () => {
  test('no template grants "the {creature} condition"', () => {
    // The Invisible Stalker is NAMED after its condition, so the name-leak
    // sweep replaced "Invisible" in its own trait with {creature} — which
    // rendered as "has the shalefang condition" on a live block.
    const offenders = ROWS.filter((r) => texts(r).some((t) => /\{creature\} condition/.test(t)))
      .map(label);
    expect(offenders).toEqual([]);
  });
});

describe('signature abilities', () => {
  const abilities = Object.values(lib.categories).flat();

  test('an aura that spares its own kind uses a slot, not a named type', () => {
    // A Lich's Disrupt Life skips Undead; a fiendish creature built from that
    // template should skip fiends. The mechanic is "spares my kindred".
    const named = abilities.filter((a) => /isn't an? (Undead|Fiend|Celestial|Fey|Aberration|Construct|Elemental|Ooze|Plant)\b/.test(a.template_2024));
    expect(named.map(label)).toEqual([]);
    expect(abilities.filter((a) => a.kindred_gated).length).toBeGreaterThan(0);
  });

  test('a Humanoid VICTIM clause is left alone', () => {
    // Not flavor: a Wight raising a slain Humanoid as a zombie, or
    // lycanthropy infecting a Humanoid, is about the victim being a person
    // and stays correct on any creature carrying the ability.
    const wight = abilities.find((a) => a.source === 'Wight' && a.ability === 'Life Drain');
    expect(wight.template_2024).toMatch(/Humanoid/);
  });

  test('every row records how many creatures share its mechanic', () => {
    for (const a of abilities) expect(typeof a.sources_sharing).toBe('number');
    // One-offs are flagged so the prompt can reskin them harder. They are not
    // excluded: rarity is handled by the pool keeping duplicate rows, so a
    // one-off is drawn about 1% of the time against 18% for a common breath.
    const oneOffs = abilities.filter((a) => a.sources_sharing === 1);
    expect(oneOffs.every((a) => a.signature)).toBe(true);
    expect(abilities.filter((a) => a.sources_sharing > 1).some((a) => a.signature)).toBe(false);
  });
});

describe('consolidation', () => {
  const key = (a) => [a.template_2024, a.gate, a.section, a.slot_type].join('|');
  const groups = new Map();
  for (const a of Object.values(lib.categories).flat()) {
    if (!groups.has(key(a))) groups.set(key(a), []);
    groups.get(key(a)).push(a);
  }

  test('flavor removal collapsed variants into shared mechanics', () => {
    // 796 rows over 383 mechanics. If this climbs back toward one-row-per-
    // mechanic, flavor has crept back into the templates.
    expect(groups.size).toBeLessThan(450);
  });

  test('one breath mechanic covers several elements', () => {
    const line = [...groups.values()].find((g) => g.length > 10
      && /line_length/.test(g[0].template_2024) && g.some((a) => /Breath/.test(a.ability)));
    const names = new Set(line.map((a) => a.ability));
    expect(names.size).toBeGreaterThan(1); // Acid / Fire / Lightning, one mechanic
  });

  test('shape is still a real mechanical difference', () => {
    // Fire Breath is a LINE for a brass dragon and a CONE for a red one, and
    // those must NOT merge. Consolidating on flavor is right; consolidating
    // across shapes would be wrong.
    const fire = [...groups.values()].filter((g) => g.some((a) => a.ability === 'Fire Breath'));
    const shapes = new Set(fire.map((g) => (/line_length/.test(g[0].template_2024) ? 'line' : 'cone')));
    expect([...shapes].sort()).toEqual(['cone', 'line']);
  });

  test('the Bronze Dragon breath line is one mechanic, not four', () => {
    const rep = [...groups.values()].filter((g) => g.some((a) => a.ability === 'Repulsion Breath'));
    expect(rep.length).toBe(1);
    expect(rep[0].length).toBe(4); // wyrmling, young, adult, ancient
  });

  test('no two templates are the same mechanic in different words', () => {
    // Distinct strings that say the same thing defeat the cross-entry
    // dedupe, which compares templates literally. The printed Copper Dragon
    // "an 90-foot-long" typo split the line-breath mechanic into two
    // strings, both got offered as menu options, and after slot fill the
    // block carried one ability under two names. A 2026-08 hand review of
    // every high-similarity pair found the same split hiding behind word
    // order (two Shape-Shifts), dropped articles (Rhinoceros Gore), leaked
    // flavor words ("the horse moved", "Tiny bat"), and punctuation
    // ("reach 5 ft" vs "ft."). None of those differences survive this
    // normalization, and no real mechanical difference dies by it: two
    // mechanics that differ only in these ways are one mechanic.
    const bag = (t) => [...new Set(
      // condition-slot names survive normalization: the TIER is the
      // mechanic, so a soft row and a hard row with identical wording are
      // two mechanics (Quasit's Rend vs the Lich's Paralyzing Touch)
      t.replace(/\{condition_(soft|hard|pair)\}/g, ' condtier$1 ')
        .replace(/\{[a-z_0-9]+\}/g, ' SLOT ')
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, ' ')
        .split(/\s+/)
        .filter((w) => w && !['a', 'an', 'the'].includes(w)),
    )].sort().join(' ');
    for (const f of ['template_2024', 'template_2014']) {
      const byBag = new Map();
      for (const r of ROWS) {
        const t = r[f];
        if (!t) continue;
        if (!byBag.has(bag(t))) byBag.set(bag(t), new Set());
        byBag.get(bag(t)).add(t);
      }
      const split = [...byBag.values()].filter((raws) => raws.size > 1)
        .map((raws) => [...raws].map((t) => t.slice(0, 80)));
      expect(split).toEqual([]);
    }
  });
});

describe('no raw markup survives in the data', () => {
  test('no template contains a pipe character', () => {
    // The scrape carried 5etools cross-reference tags ("Cover|XPHB|Total
    // Cover") into 9 rows, and one shipped verbatim on a live block —
    // machine markup with the serial number showing. Print prose never
    // needs a pipe, so the ban is absolute.
    const offenders = ROWS.filter((r) => texts(r).some((t) => t.includes('|'))).map(label);
    expect(offenders).toEqual([]);
  });
});

describe('spell names are sacred', () => {
  test('no flavor slot sits inside an italicized spell name', () => {
    // The flavor-stripper ate "Fire" out of *Wall of Fire* and *Faerie
    // Fire*, minting "Wall of moss-sheathed root and stone" on a live block
    // (the Groan). A spell name is a rules reference, never flavor.
    const offenders = ROWS.filter((r) => texts(r).some(
      (t) => /\*[A-Z][a-zA-Z' ]*\{[a-z_0-9]+\}[a-zA-Z' ]*\*/.test(t),
    )).map(label);
    expect(offenders).toEqual([]);
  });

  test('a cast-twice template names its spell by slot, not half by literal', () => {
    // Print's Hellfire Spellcasting casts *Fireball* twice and can replace
    // one *Fireball*; slotting only the FIRST mention left "replace one
    // Fireball" beside whatever the slot filled.
    for (const r of ROWS) {
      for (const t of texts(r)) {
        if (/casts \{(?:spells|signature_spell)\} twice/.test(t)) {
          expect(t).not.toMatch(/replace one \*[A-Z]/);
        }
      }
    }
  });
});

describe('condition slots (engine-filled, owner call 2026-08-03)', () => {
  const lib2 = require('../ability-library.json');
  const rows = [
    ...Object.values(lib2.categories).flat(),
    ...Object.values(lib2.traits.by_category).flat(),
  ];
  const meta = lib2._meta.condition_slots;
  const slotted = rows.filter((r) => /\{condition_(soft|hard|pair)\}/.test(r.template_2024 ?? ''));

  test('the measured menu exists and stays sane', () => {
    expect(Object.keys(meta.tiers.soft).length).toBeGreaterThanOrEqual(4);
    expect(Object.keys(meta.tiers.hard)).toEqual(['Paralyzed', 'Stunned']);
    for (const saves of [...Object.values(meta.tiers.soft), ...Object.values(meta.tiers.hard)]) {
      for (const s of saves) expect(['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']).toContain(s);
    }
    // pairs are printed combos, never composed
    expect(meta.pairs.length).toBe(5);
  });

  test('every slotted row records its printed original, legal for its slot', () => {
    expect(slotted.length).toBeGreaterThan(30);
    for (const r of slotted) {
      expect(r.condition_default).toBeTruthy();
      const t = r.template_2024;
      if (t.includes('{condition_pair}')) {
        expect(meta.pairs.map((x) => x.pair)).toContain(r.condition_default);
      } else if (t.includes('{condition_hard}')) {
        expect(Object.keys(meta.tiers.hard)).toContain(r.condition_default);
      } else {
        expect(Object.keys(meta.tiers.soft)).toContain(r.condition_default);
      }
    }
  });

  test('a slot never lands where the condition is structural', () => {
    for (const r of slotted) {
      const t = r.template_2024;
      // one slot per template — two would fill identically and read twice
      expect((t.match(/\{condition_/g) ?? []).length).toBe(1);
      // riders only: a save or attack context, never weakness/escape machinery
      expect(t).toMatch(/Saving Throw|Attack Roll/);
      expect(t).not.toMatch(/escape DC|instead of the|Unconscious|Petrified/);
      // a row whose condition IS its dependency edge keeps it literal:
      // imposes ["charm"] with a Frightened fill satisfies the graph while
      // the text no longer charms (the Pirate's Enthralling Panache)
      expect((r.imposes ?? []).length).toBe(0);
    }
  });

  test('structural conditions never got slotted anywhere', () => {
    for (const r of rows) {
      const t = r.template_2024 ?? '';
      // Grappled/Restrained/Prone/Petrified/Unconscious/Incapacitated
      // singles stay literal — their support clauses name them
      expect(t).not.toMatch(/\{condition_[a-z]+\} condition \(escape/);
    }
  });
});

describe('fingerprint exclusions (the Possession precedent)', () => {
  // Structurally one-of-a-kind subsystems that no rename disguises: the
  // sphinx's escalating roar sequence, the cube's engulf machinery, the
  // vampire's sunlight-gated forms, the hag's ethereal dream-murder. Length
  // alone never excludes — the swallow family and the whirlwind reskin
  // fine; STRUCTURE is the fingerprint.
  const lib3 = require('../ability-library.json');
  const rows3 = Object.values(lib3.categories).flat();

  test('the four fingerprint rows are excluded, with documented reasons', () => {
    for (const [src, ab] of [
      ['Sphinx of Valor', 'Roar'], ['Gelatinous Cube', 'Engulf'],
      ['Vampire', 'Shape-Shift'], ['Night Hag', 'Nightmare Haunting'],
    ]) {
      const matches = rows3.filter((r) => r.source === src && r.ability === ab);
      expect(matches.length).toBeGreaterThan(0);
      for (const r of matches) {
        expect(typeof r.excluded).toBe('string');
        expect(r.excluded.length).toBeGreaterThan(30);
      }
    }
  });

  test('the Chain Devil conjures an appendage, never a second {creature}', () => {
    // The generifier ate "chain": "conjures a fiery {creature}" rendered as
    // "the grave vow conjures a fiery grave vow" — the Invisible Stalker
    // class of name-leak, fourth instance.
    const cd = rows3.find((r) => r.source === 'Chain Devil' && /Conjure/.test(r.ability));
    expect(cd.template_2024).toContain('conjures a fiery {appendage}');
    expect(cd.template_2024).toContain('the {appendage} disappears');
    expect(cd.template_2024).not.toMatch(/conjures a fiery \{creature\}/);
  });
});
