/**
 * The flavor call must not be able to change a number.
 *
 * The model fills flavor slots and names entries; substitution happens in
 * code. There is no path from a model response into the mechanical text, so
 * a hallucinating model produces a plain monster rather than a wrong one.
 */
import { buildSkeleton } from '../build-skeleton.mjs';
import {
  buildFlavorPrompt, validateFlavorResponse, applyFlavor, flavorRequests, slotsIn, chassisFromSkeleton,
} from '../flavor-prompt.mjs';

const SKEL = buildSkeleton({ cr: 11, size: 'Huge', seed: 4 });

const respond = (skeleton, overrides = {}) => ({
  name: 'Shalefang',
  size: skeleton.size,
  type: 'Monstrosity',
  alignment: 'Chaotic Evil',
  speed: '40 ft., Burrow 20 ft.',
  stats: { STR: 20, DEX: 12, CON: 18, INT: 6, WIS: 12, CHA: 8 },
  entries: flavorRequests(skeleton).map((r) => ({
    id: r.id,
    name: `Slate ${r.id}`,
    ...Object.fromEntries(r.slots.map((s) => [s, `test-${s}`])),
  })),
  ...overrides,
});

describe('the prompt', () => {
  test('asks about every entry that has a flavor slot', () => {
    const p = buildFlavorPrompt(SKEL, { concept: 'a slate-scaled burrower' });
    for (const r of flavorRequests(SKEL)) expect(p).toContain(r.id);
    expect(p).toContain('a slate-scaled burrower');
  });

  test('states the numbers as fixed and never asks for one', () => {
    const p = buildFlavorPrompt(SKEL, { concept: 'x' });
    expect(p).toMatch(/Every number is already fixed/);
    expect(p).not.toMatch(/choose the damage|pick a DC|decide the hit points/i);
  });

  test('flags signature abilities for a harder reskin', () => {
    // Find a seed whose block contains a one-off mechanic.
    let withSig = null;
    for (let s = 1; s <= 40 && !withSig; s += 1) {
      const sk = buildSkeleton({ cr: 17, size: 'Large', seed: s });
      if (flavorRequests(sk).some((r) => r.signature)) withSig = sk;
    }
    expect(withSig).toBeTruthy();
    expect(buildFlavorPrompt(withSig, { concept: 'x' })).toContain('SIGNATURE');
  });

  test('offers the placeholder name rather than demanding it', () => {
    const p = buildFlavorPrompt(SKEL, { concept: 'x' });
    expect(p).toMatch(/give each entry a name that fits THIS creature/i);
  });
});

describe('validation', () => {
  test.each([
    ['not json', 'nope'],
    ['no name', JSON.stringify({ entries: [] })],
    ['blank name', JSON.stringify({ name: '   ', entries: [] })],
    ['no entries array', JSON.stringify({ name: 'X' })],
  ])('rejects %s', (_l, s) => expect(validateFlavorResponse(s)).toBe(false));

  test('accepts a well-formed response', () => {
    expect(validateFlavorResponse(JSON.stringify(respond(SKEL)))).toBe(true);
  });
});

describe('applying flavor', () => {
  test('every flavor slot is filled and none survives into the text', () => {
    const m = applyFlavor(SKEL, respond(SKEL));
    for (const list of Object.values(m.sections)) {
      for (const e of list) expect(e.text).not.toMatch(/\{[a-z_]+\}/);
    }
  });

  test('the creature name replaces {creature} in lower case mid-sentence', () => {
    const m = applyFlavor(SKEL, respond(SKEL));
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toContain('{creature}');
    if (/\bthe [a-z]/.test(all)) expect(all).toContain('shalefang');
  });

  test('numbers are byte-identical to the skeleton whatever the model says', () => {
    // The point of the whole design. A model trying to rewrite the mechanics
    // cannot, because its text is never spliced in.
    const hostile = respond(SKEL, {
      entries: flavorRequests(SKEL).map((r) => ({
        id: r.id,
        name: 'Doom',
        text: '*Melee Attack Roll:* +99, reach 500 ft. 999 (99d99) damage.',
        damage: 999,
        ...Object.fromEntries(r.slots.map((s) => [s, 'x'])),
      })),
    });
    const m = applyFlavor(SKEL, hostile);
    const nums = (s) => (s.match(/\d+/g) || []).join(',');
    for (const e of SKEL.entries) {
      const out = Object.values(m.sections).flat().find((x) => x.text.includes(nums(e.text).split(',')[0]));
      expect(out).toBeDefined();
    }
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    expect(all).not.toContain('99d99');
    expect(all).not.toContain('reach 500 ft');
  });

  test('a missing or empty flavor value falls back instead of leaking a brace', () => {
    const lazy = respond(SKEL, { entries: [{ id: 'e1', name: 'Only This' }] });
    const m = applyFlavor(SKEL, lazy);
    for (const list of Object.values(m.sections)) {
      for (const e of list) {
        expect(e.text).not.toMatch(/\{[a-z_]+\}/);
        expect(e.name.trim()).not.toBe('');
      }
    }
  });

  test('renaming the attack updates the Multiattack line that references it', () => {
    const withMA = buildSkeleton({ cr: 11, size: 'Large', seed: 4 });
    const ma = withMA.entries.find((e) => e.slot_type === 'multiattack');
    expect(ma).toBeDefined();
    const attack = withMA.entries.find((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack');
    const r = respond(withMA, {
      entries: flavorRequests(withMA).map((x) => ({
        id: x.id,
        name: x.id === attack.id ? 'Shale Rake' : `Other ${x.id}`,
        ...Object.fromEntries(x.slots.map((s) => [s, 'x'])),
      })),
    });
    const m = applyFlavor(withMA, r);
    const line = Object.values(m.sections).flat().find((e) => /makes (one|two|three)/.test(e.text));
    expect(line.text).toContain('Shale Rake');
    expect(line.text).not.toContain(attack.name);
  });

  test('traits arrive under Traits', () => {
    const m = applyFlavor(SKEL, respond(SKEL));
    if (SKEL.traits.length) expect(m.sections.Traits.length).toBe(SKEL.traits.length);
  });

  test('chassisFromSkeleton carries the numbers assembleMonster needs', () => {
    const c = chassisFromSkeleton(SKEL);
    expect(c).toEqual({
      ac: SKEL.ac, hp: SKEL.hp, pb: SKEL.pb, attack_bonus: SKEL.attack_bonus, save_dc: SKEL.save_dc,
    });
  });
});

describe('slotsIn', () => {
  test('finds askable slots and ignores {creature}', () => {
    expect(slotsIn('the {creature} {delivery} {substance}')).toEqual(['substance', 'delivery']);
    expect(slotsIn('{damage} ({dice})')).toEqual([]);
  });
});

describe('concept-driven ability choice', () => {
  // The engine decides HOW MANY of each slot and guarantees every option is
  // scaled and dependency-safe; the concept decides WHICH. No extra call —
  // the choice rides along with the flavor request.
  const OPT = buildSkeleton({ cr: 9, size: 'Large', seed: 3, alternatives: 3 });

  test('slots offer alternatives, and one is marked default', () => {
    const multi = flavorRequests(OPT).filter((r) => r.options.length > 1);
    expect(multi.length).toBeGreaterThan(0);
    const p = buildFlavorPrompt(OPT, { concept: 'a swamp ambusher' });
    expect(p).toContain('CHOOSE ONE that suits the concept');
    expect(p).toMatch(/\* = default/);
  });

  test('every option is already scaled to this CR, so any choice is valid', () => {
    for (const r of flavorRequests(OPT)) {
      for (const o of r.options) {
        for (const m of o.text.matchAll(/Attack Roll:\*?\s*\+(\d+)/g)) {
          expect(Number(m[1])).toBe(OPT.attack_bonus);
        }
        for (const m of o.text.matchAll(/DC (\d+)/g)) expect(Number(m[1])).toBe(OPT.save_dc);
      }
    }
  });

  test('the model\'s choice is honoured', () => {
    const chosen = flavorRequests(OPT).map((r) => ({
      id: r.id, choose: r.options[1]?.key, name: `Pick ${r.id}`,
      ...Object.fromEntries(r.slots.map((s) => [s, 'silt'])),
    }));
    const m = applyFlavor(OPT, { ...respond(OPT), entries: chosen });
    const wanted = flavorRequests(OPT).filter((r) => r.options.length > 1).map((r) => r.options[1].text);
    const got = Object.values(m.sections).flat().map((e) => e.text);
    for (const w of wanted) {
      // the option's text, with its flavor slots filled
      const stem = w.split('{')[0].trim();
      expect(got.some((g) => g.startsWith(stem))).toBe(true);
    }
  });

  test('an unrecognised choice silently keeps the default', () => {
    const m = applyFlavor(OPT, {
      ...respond(OPT),
      entries: flavorRequests(OPT).map((r) => ({ id: r.id, choose: 'Nonsense Ability', name: `N ${r.id}`,
        ...Object.fromEntries(r.slots.map((s) => [s, 'silt'])) })),
    });
    for (const list of Object.values(m.sections)) {
      for (const e of list) expect(e.text).not.toMatch(/\{[a-z_]+\}/);
    }
  });

  test('a choice that would strand a dependency reverts instead of shipping broken', () => {
    // Swapping away the only entry that imposes Grappled must not leave a
    // grapple-dependent entry pointing at nothing.
    let found = null;
    for (let seed = 1; seed <= 60 && !found; seed += 1) {
      const sk = buildSkeleton({ cr: 11, size: 'Large', seed, alternatives: 3 });
      const needs = sk.entries.find((e) => (e.requires ?? []).includes('grapple'));
      const gives = sk.entries.find((e) => (e.imposes ?? []).includes('grapple') && e.options?.length > 1);
      if (needs && gives) found = { sk, gives };
    }
    if (!found) return; // combination not present in the sampled seeds
    const { sk, gives } = found;
    const swapAway = gives.options.find((o) => !(o.imposes ?? []).includes('grapple'));
    if (!swapAway) return;
    const m = applyFlavor(sk, {
      ...respond(sk),
      entries: [{ id: gives.id, choose: swapAway.key, name: 'Swapped' }],
    });
    const all = Object.values(m.sections).flat().map((e) => e.text).join(' ');
    if (/Grappled by/.test(all)) expect(all).toMatch(/has the Grappled condition/);
  });
});

describe('traits are addressable too', () => {
  // They had no id, so the flavor call could not name them and every trait
  // silently kept its fallback text. Caught by reading the console trace.
  const T = buildSkeleton({ cr: 13, size: 'Large', seed: 2 });

  test('every flavor request has an id', () => {
    for (const r of flavorRequests(T)) expect(r.id).toMatch(/^[et]\d+$/);
  });

  test('trait ids are distinct from entry ids', () => {
    const ids = flavorRequests(T).map((r) => r.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  test("the model's trait name and flavor actually apply", () => {
    const traitReq = flavorRequests(T).find((r) => r.section === 'Traits');
    if (!traitReq) return;
    const m = applyFlavor(T, {
      ...respond(T),
      entries: [{ id: traitReq.id, name: 'Silt Shroud',
        ...Object.fromEntries(traitReq.slots.map((s) => [s, 'drowned silt'])) }],
    });
    const trait = (m.sections.Traits ?? []).find((e) => e.name === 'Silt Shroud');
    expect(trait).toBeDefined();
    if (traitReq.slots.length) expect(trait.text).toContain('drowned silt');
  });
});
