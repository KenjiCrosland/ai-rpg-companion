/**
 * FEAR DOES NOT COME FROM A BLOW.
 *
 * Owner, 2026-10-27: "Things that cause physical damage don't cause frightened
 * often yes? I feel like the damage families aligned with frightened are
 * psychic, necrotic, maybe radiant?"
 *
 * Measured over the 682 rows in srd52-monsters.json that deal a damage type:
 * print imposes Frightened on 11 rows, SEVEN of which deal no damage at all.
 * Of the four that do: Psychic 3, Thunder 1. Physical: 0 of 11, while physical
 * damage dominates every bodily condition (Prone 55 rows, Grappled 38,
 * Restrained 29, Poisoned 24). Necrotic and Radiant — the owner's other two
 * guesses — are 0; Radiant pairs with Blinded and Prone instead.
 *
 * Ours ran the other way: 62 of 101 Frightened rows carried damage print never
 * pairs it with (Fire 37, Bludgeoning 10, Necrotic 8, Cold 3, Lightning 2,
 * Slashing 2).
 */
import { conditionEarnedByDamage, renderTemplate, templatesFor, TEMPLATE_BY_ID } from '@/tools/statblock-generator/reskin/templates.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

describe('the rule itself', () => {
  it('allows the two damage types print pairs with fear, plus Necrotic by ruling', () => {
    expect(conditionEarnedByDamage('Frightened', 'Psychic')).toBe(true);
    expect(conditionEarnedByDamage('Frightened', 'Thunder')).toBe(true);
    // the owner's call where print is silent (2026-10-27): print has 0 Necrotic
    // fear rows but only FOUR damaging fear rows in total, too thin to exclude a
    // type, and our own Toll of Dread / Knell of Dread read right
    expect(conditionEarnedByDamage('Frightened', 'Necrotic')).toBe(true);
  });

  it('refuses every type print never pairs with fear', () => {
    // Necrotic is NOT here any more — see the ruling above. The physical half of
    // the rule is the one resting on real evidence and it stays.
    for (const d of ['Bludgeoning', 'Piercing', 'Slashing', 'Fire', 'Cold', 'Acid',
      'Lightning', 'Poison', 'Radiant', 'Force']) {
      expect(conditionEarnedByDamage('Frightened', d)).toBe(false);
    }
  });

  // print's MODAL fear row deals no damage at all — those must stay legal
  it('allows fear on a row that deals no damage', () => {
    expect(conditionEarnedByDamage('Frightened', null)).toBe(true);
    expect(conditionEarnedByDamage('Frightened', '')).toBe(true);
  });

  it('rules on Frightened only, and leaves the bodily conditions alone', () => {
    for (const c of ['Prone', 'Poisoned', 'Deafened', 'Blinded', 'Restrained', 'Grappled']) {
      for (const d of ['Fire', 'Bludgeoning', 'Cold', 'Psychic', null]) {
        expect(conditionEarnedByDamage(c, d)).toBe(true);
      }
    }
  });
});

describe('the donor chassis fill site — the one that matters', () => {
  // 26 of the 33 off-print rows measured were donor "Area Nova" breaths, so a
  // rule that lived only in the template validator would reach almost nothing.
  const NOVA = '*Constitution Saving Throw*: DC 19, each creature in a 30-foot Cone. *Failure:* 55 (10d10) Fire damage, and the target has the {condition_minor} condition until the end of its next turn. *Success:* Half damage only.';
  const strip = (t) => t.replace(/,? and (?:the target|it) has the \{condition_minor\} condition[^.]*?\./, '.');

  it('removes the whole clause and leaves a legal sentence', () => {
    const out = strip(NOVA);
    expect(out).toBe('*Constitution Saving Throw*: DC 19, each creature in a 30-foot Cone. *Failure:* 55 (10d10) Fire damage. *Success:* Half damage only.');
    expect(out).not.toMatch(/\{condition_minor\}/);
    expect(out).not.toMatch(/ and $| and \./); // no dangling conjunction
  });

  it('keeps the damage, the area and the save', () => {
    const out = strip(NOVA);
    expect(out).toMatch(/55 \(10d10\) Fire damage/);
    expect(out).toMatch(/30-foot Cone/);
    expect(out).toMatch(/Constitution Saving Throw/);
  });

  // The gate's precondition is that the row DEALS damage. Some donor rows carry
  // the slot as their entire effect — a gaze whose Failure line IS the condition
  // and which deals nothing — and those are print's modal fear row (7 of 11), so
  // the gate must never touch them. Asserted both ways below.
  it('strips cleanly on every DAMAGING donor row that carries the slot', async () => {
    const { DONORS } = await import('@/tools/statblock-generator/reskin/donors.mjs');
    const rows = Object.values(DONORS ?? {}).flatMap((d) => Object.values(d?.sections ?? d ?? {}))
      .flat().filter((r) => typeof r?.text === 'string' && r.text.includes('{condition_minor}'));
    expect(rows.length).toBeGreaterThan(0); // the probe must find real donor text
    const damaging = rows.filter((r) => /\d+ \(\d+d\d+/.test(r.text));
    expect(damaging.length).toBeGreaterThan(0);
    for (const r of damaging) {
      const out = strip(r.text);
      expect(out).not.toMatch(/\{condition_minor\}/);
      expect(out).not.toMatch(/,\s*\./);
      expect(out).not.toMatch(/\band\s*\./);
    }
  });

  it('leaves a no-damage donor row alone — its condition IS the effect', async () => {
    const { DONORS } = await import('@/tools/statblock-generator/reskin/donors.mjs');
    const rows = Object.values(DONORS ?? {}).flatMap((d) => Object.values(d?.sections ?? d ?? {}))
      .flat().filter((r) => typeof r?.text === 'string' && r.text.includes('{condition_minor}'));
    const bare = rows.filter((r) => !/\d+ \(\d+d\d+/.test(r.text));
    expect(bare.length).toBeGreaterThan(0); // e.g. the gaze rows
    for (const r of bare) {
      // the gate's own precondition fails, so the clause is never considered
      expect(/\d+ \(\d+d\d+/.test(r.text)).toBe(false);
      expect(conditionEarnedByDamage('Frightened', null)).toBe(true);
    }
  });
});

describe('the template validator', () => {
  const ctx = (energy, mix = null) => ({
    scaled: scaleDonor(pickDonor(13, null, 'brute'), 13, { mechanics: [] }),
    archetype: 'brute', cr: 13, imposed: ['Restrained'], conditionMinor: 'Frightened',
    name: 'X', inline: 'it', energy, mix, meleeType: 'Bludgeoning', concept: 'c', size: 'Large',
  });
  const payoff = () => TEMPLATE_BY_ID.get('condition-payoff');
  const render = (energy, mix, condition_minor = 'Frightened') => renderTemplate(
    payoff(), ctx(energy, mix), { condition_minor, consumed_condition: 'Restrained' },
  );

  it('strips fear from a Fire row and records no imposition', () => {
    const r = render('Fire', null);
    expect(r.text).not.toMatch(/Frightened condition until/);
    expect(r.imposes).toBeUndefined();
  });

  it('keeps fear on a Psychic row and records it', () => {
    const r = render('Psychic', null);
    expect(r.text).toMatch(/Frightened condition until/);
    expect(r.imposes).toBe('Frightened');
  });

  it('strips fear from a physical row', () => {
    expect(render(null, 'physical').text).not.toMatch(/Frightened condition until/);
  });

  it('leaves a non-fear condition on the same Fire row', () => {
    const r = render('Fire', null, 'Prone');
    expect(r.text).toMatch(/Prone condition until/);
    expect(r.imposes).toBe('Prone');
  });

  it('leaves no unfilled token or broken sentence when it strips', () => {
    const { text } = render('Fire', null);
    expect(text).not.toMatch(/\{/);
    expect(text).not.toMatch(/,\s*\./);
    expect(text).toMatch(/\*Success:\*/); // the save outcome survives
  });
});

describe('the fear the gate takes off a row is MOVED, not deleted', () => {
  // Stripping alone answered nothing: the brass tyrant was typed "whose furnace
  // breath terrifies and whose hammer finds the terrified" and lost BOTH halves,
  // because the fear left the breath and that made the payoff rider unreachable.
  // Print's modal fear row deals no damage (7 of 11), so the condition relocates.
  // Must match the list in generate.mjs. `gaze-single` is deliberately absent:
  // its frames vary by band and above CR 10 it is no longer a no-damage fear row
  // (CR 11 and 15 deal damage, 15 imposes Paralyzed, 21 Blinded), so it would
  // have paid a fear debt with a damaging Paralyzed gaze on the high-CR sheets
  // this fires on most.
  const CANDIDATES = ['fear-aura', 'terror-pulse', 'gaze-aura'];

  // Asserted on the RENDERED row, not on `frames`: terror-pulse is a library
  // seed and carries no `frames` on the template object — renderTemplate
  // resolves its text internally. What ships is the thing worth pinning.
  const ctxAt = (cr, arch) => ({
    scaled: scaleDonor(pickDonor(cr, null, arch), cr, { mechanics: [] }),
    archetype: arch, cr, sections: {}, imposed: [], conditionMinor: 'Frightened',
    name: 'X', inline: 'it', energy: 'Fire', mix: null, meleeType: 'Bludgeoning',
    concept: 'a thing whose breath terrifies', size: 'Large',
  });

  // EVERY BAND, not one. Checking a single CR is how `gaze-single` nearly got on
  // the list: it is a clean no-damage fear row at CR 1-8 and something else
  // entirely above CR 10.
  it('every candidate is a no-damage Frightened row at EVERY band', () => {
    for (const id of CANDIDATES) {
      const t = TEMPLATE_BY_ID.get(id);
      expect(t).toBeTruthy();
      expect(t.effect).toBe('condition');
      for (const cr of [1, 4, 8, 11, 15, 21]) {
        const r = renderTemplate(t, ctxAt(cr, 'brute'), {}, { blind: true });
        expect(r).toBeTruthy();
        expect(r.text).toMatch(/Frightened condition/);
        expect(r.text).not.toMatch(/\d+ \(\d+d\d+/); // no damage, or it hits the same gate
        expect(r.text).not.toMatch(/[{}]/);
      }
    }
  });

  it('and gaze-single is excluded for exactly that reason', () => {
    const bad = [11, 15, 21].map((cr) => renderTemplate(TEMPLATE_BY_ID.get('gaze-single'), ctxAt(cr, 'brute'), {}, { blind: true }).text);
    expect(bad.some((t) => /\d+ \(\d+d\d+/.test(t))).toBe(true);
    expect(bad.some((t) => /has the (?:Paralyzed|Blinded) condition/.test(t))).toBe(true);
    expect(CANDIDATES).not.toContain('gaze-single');
  });

  // THE ORDER IS LOAD-BEARING. The gaze rows require sight, so paying a
  // breath-borne terror with one would change the creature.
  // Print, 11 rows imposing Frightened: only 4 gated, so 7 of 11 are AT WILL,
  // and its highest-CR fear (Pit Fiend, CR 20) is an at-will trait aura with no
  // sight clause. The at-will aura therefore leads the list.
  it('leads with the at-will aura that needs no eyes', () => {
    expect(CANDIDATES[0]).toBe('fear-aura');
    const lead = TEMPLATE_BY_ID.get('fear-aura');
    expect(lead.needs_body).toBeNull();      // no organ: a voice or a breath carries it
    expect(lead.section).toBe('trait');      // costs the creature no action
    const r = renderTemplate(lead, ctxAt(17, 'brute'), {}, { blind: true });
    expect(r.gate).toBeFalsy();              // at will, as print's majority are
  });

  it('falls back to the gated action, then to the sight-gated aura', () => {
    expect(CANDIDATES[1]).toBe('terror-pulse');
    expect(TEMPLATE_BY_ID.get('terror-pulse').needs_body).toBeNull();
    expect(CANDIDATES[2]).toBe('gaze-aura');
    expect(TEMPLATE_BY_ID.get('gaze-aura').needs_body).toMatch(/look at/);
    expect(TEMPLATE_BY_ID.get('gaze-single').needs_body).toMatch(/sight/);
  });

  // the registrations a shape needs, or it ships inert (SHAPE_TAGS was missed
  // on the first attempt and the shape was silently dropped from the catalog)
  it('fear-aura is fully registered, not inert', async () => {
    const { MECHANIC, NEEDS_BODY, templatesFor: tf } = await import('@/tools/statblock-generator/reskin/templates.mjs');
    const t = TEMPLATE_BY_ID.get('fear-aura');
    expect(t).toBeTruthy();                                  // SHAPE_TAGS, or it is dropped
    expect(t.trigger).toBe('start_of_turn');
    expect(t.effect).toBe('condition');
    expect(MECHANIC.fear).toContain('fear-aura');            // the route call can reach it
    expect(NEEDS_BODY['fear-aura'] ?? null).toBeNull();      // deliberately no organ
    expect(renderTemplate(t, ctxAt(9, 'brute'), {}, { blind: true }).imposes).toBe('Frightened');
    expect(tf({ ...ctxAt(9, 'brute'), section: 'trait', trigger: null }).some((x) => x.id === 'fear-aura')).toBe(true);
  });

  it('cites print rather than claiming invention', async () => {
    const { SHAPES } = await import('@/tools/statblock-generator/reskin/shapes.mjs');
    const sh = SHAPES.find((x) => x.id === 'fear-aura');
    expect(sh.cite).toMatch(/Pit Fiend/);
    expect(sh.invented).toBeFalsy();
  });

  it('terror-pulse carries fear by sound as well as sight, so a breath can pay it', () => {
    const r = renderTemplate(TEMPLATE_BY_ID.get('terror-pulse'), ctxAt(17, 'brute'), {}, { blind: true });
    expect(r.text).toMatch(/can see or hear/);
  });

  it('renders on the body that motivated the fix (CR 17 brute) with a real name', () => {
    const scaled = scaleDonor(pickDonor(17, null, 'brute'), 17, { mechanics: [] });
    const ctxT = {
      scaled, archetype: 'brute', cr: 17, sections: {}, imposed: [], conditionMinor: 'Frightened',
      name: 'Brass Tyrant', inline: 'the tyrant', energy: 'Fire', mix: null,
      meleeType: 'Bludgeoning', concept: 'a brass tyrant whose furnace breath terrifies', size: 'Large',
    };
    expect(templatesFor({ ...ctxT, section: 'action', trigger: null }).some((x) => x.id === 'terror-pulse')).toBe(true);
    const r = renderTemplate(TEMPLATE_BY_ID.get('terror-pulse'), ctxT, {}, { blind: true });
    expect(r).toBeTruthy();
    expect(r.name).toBeTruthy();
    expect(r.text).toMatch(/Frightened condition/);
    expect(r.text).not.toMatch(/[{}]/);
  });
});

describe('the relocated row lands where it belongs', () => {
  // `shipTrait` hardcodes Traits/Reactions, so routing an Actions template
  // through it put "Horrid Display" among the traits, where the 4-trait ceiling
  // evicted it — the fear was paid and then silently lost. Print's commoner form
  // is an action anyway: 4 of its 7 no-damage fear rows are Actions.
  const ctxT = (cr) => ({
    scaled: scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] }),
    archetype: 'brute', cr, sections: {}, imposed: [], conditionMinor: 'Frightened',
    name: 'T', inline: 'the tyrant', energy: 'Fire', mix: null,
    meleeType: 'Bludgeoning', concept: 'c', size: 'Large',
  });

  it('terror-pulse is an Actions row and must not be shipped as a trait', () => {
    const r = renderTemplate(TEMPLATE_BY_ID.get('terror-pulse'), ctxT(17), {}, { blind: true });
    expect(r.section).toBe('Actions');
  });

  it('gaze-aura is a Traits row, so the fallback does go through the trait path', () => {
    const r = renderTemplate(TEMPLATE_BY_ID.get('gaze-aura'), ctxT(17), {}, { blind: true });
    expect(r.section).toBe('Traits');
  });

  it('a gated candidate keeps its gate in the row name, as every other ship site does', () => {
    const r = renderTemplate(TEMPLATE_BY_ID.get('terror-pulse'), ctxT(17), {}, { blind: true });
    expect(r.gate).toBe('2/Day');
    expect(`${r.name}${r.gate ? ` (${r.gate})` : ''}`).toBe('Horrid Display (2/Day)');
  });
});
