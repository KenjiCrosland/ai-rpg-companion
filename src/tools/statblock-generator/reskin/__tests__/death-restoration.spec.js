/**
 * THE CREATURE COMES BACK — THE FORM PRINT USES MOST AND WE HAD NONE OF.
 *
 * Measured over print's 324 trait rows (2026-10-29): 32 fire on death, and 21 of
 * those bring the CREATURE back. We shipped `death-burst` (damage on death) and
 * `kill-denial` (the VICTIM cannot return) and nothing for the larger form.
 *
 * It cost a measurable thing. Asked for ten abilities for a Headless Horseman,
 * the first was "its severed head is hidden elsewhere, and until the party finds
 * and lays it to rest its body reforms after every defeat" — and a three-stage
 * probe could place NINE of its ten ideas nowhere, that one included.
 *
 * Unpriced on purpose: the return is days later, so the fight is over before it
 * matters. No damage, no condition, nothing the CR budget can see. What it buys is
 * a hook the arithmetic never charges for.
 */
import { TEMPLATE_BY_ID, TEMPLATES, MECHANIC_OF, renderTemplate } from '@/tools/statblock-generator/reskin/templates.mjs';
import { SHAPES } from '@/tools/statblock-generator/reskin/shapes.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';
import print from '@/data/srd52-monsters.json';

const ctx = (cr) => ({
  scaled: scaleDonor(pickDonor(cr, null, 'lurker'), cr, { mechanics: [] }),
  archetype: 'lurker', cr, sections: {}, imposed: [], conditionMinor: 'Frightened',
  name: 'X', inline: 'the horseman', energy: 'Necrotic', mix: null, meleeType: 'Slashing',
  concept: 'a headless horseman', size: 'Medium',
});
const render = (cr, fills = {}) => renderTemplate(TEMPLATE_BY_ID.get('death-restoration'), ctx(cr), fills, { blind: true });

describe('the template is registered, not inert', () => {
  // A shape added earlier this sprint shipped INERT because one registration
  // silently failed to match, and was caught only by a verification probe.
  it('is a fittable template under a print-style name', () => {
    expect(TEMPLATE_BY_ID.get('death-restoration')?.name).toBe('Restoration');
    expect(TEMPLATES.some((t) => t.id === 'death-restoration')).toBe(true);
    expect(MECHANIC_OF['death-restoration']).toBe('mend');
  });
  it('renders in every band inside its range', () => {
    for (const cr of [5, 9, 11, 17, 24]) expect(render(cr)?.section).toBe('Traits');
  });
  // print puts 21 of its 22 restoration rows at CR 5+ with a median of 12; the one
  // exception is the Lemure at CR 0, and one row is not a band. Eligibility is the
  // POOL's job, not the renderer's — `renderTemplate` will render any band it has a
  // frame for — so what is pinned here is the declared range and the absence of a
  // frame below it.
  it('declares CR 5 and up, and carries no frame below that', () => {
    expect(TEMPLATE_BY_ID.get('death-restoration').cr_range).toEqual([5, 30]);
    expect(Object.keys(SHAPES.find((x) => x.id === 'death-restoration').frames)).not.toContain('0-2');
  });
});

describe("the counter is where the creature's own story goes", () => {
  it("takes the concept's own words", () => {
    expect(render(9, { counter: 'the severed head is laid to rest' }).text)
      .toMatch(/unless the severed head is laid to rest\.$/);
  });

  // The frame reads "...unless {counter}", so a bare condition renders "unless
  // Restrained." — the nonsense `{restraint}` shipped before its own guard was
  // written. Checked against the declared condition list, not a word list.
  it.each(['Restrained', 'Prone', 'Frightened'])('refuses the bare condition %s', (c) => {
    expect(render(9, { counter: c }).text).not.toMatch(new RegExp(`unless ${c}`));
  });

  it('falls back to a print-shaped counter rather than rendering a hole', () => {
    const t = render(9).text;
    expect(t).toMatch(/unless its remains are burned and the ashes scattered\./);
    expect(t).not.toMatch(/\{/);
  });
});

describe('it costs the CR budget nothing, which is why the form is safe', () => {
  it('deals no damage and imposes no condition at any band', () => {
    for (const cr of [5, 9, 24]) {
      const t = render(cr).text;
      // the dice it DOES carry are the return delay ("1d10 days"), never damage —
      // print's damage is always "17 (5d6)", an average beside its dice
      expect(t).not.toMatch(/\d+ \(\d+d\d+\)|Saving Throw|damage|condition/);
      expect(t).toMatch(/returns to life in \dd\d+ days/);
      expect(render(cr).imposes ?? null).toBeNull();
    }
  });
  // print's own ladder: Lemure CR 0 takes 1d10 days, Guardian Naga CR 10 takes
  // 1d6, Djinni CR 11 takes 1d4 — stronger things come back faster
  it.each([[5, '1d10'], [9, '1d6'], [12, '1d6'], [17, '1d4'], [24, '1d4']])
    ('CR %i returns in %s days, following print', (cr, dice) => {
      expect(render(cr).text).toMatch(new RegExp(`returns to life in ${dice} days`));
    });
});

describe('the form is print\'s, not invented', () => {
  it('print brings a creature back in at least 15 trait rows', () => {
    const rows = print.flatMap((m) => (m.sections?.Traits ?? []))
      .filter((r) => /(?:dies|drops to 0 Hit Points)/i.test(String(r.text ?? '')))
      .filter((r) => /reform|revive|returns to life|new body|regains all its Hit Points/i.test(String(r.text ?? '')));
    expect(rows.length).toBeGreaterThanOrEqual(15);
  });
  it('declares where it came from, and is not marked invented', () => {
    const s = SHAPES.find((x) => x.id === 'death-restoration');
    expect(s.cite).toMatch(/Guardian Naga/);
    expect(s.invented).toBeUndefined();
  });
});

/**
 * A FILL IS NEVER THE CREATURE ITSELF — IN EITHER DIRECTION.
 *
 * `fillIsSelf` only caught a fill that ENDS WITH the creature's name, so the
 * 2026-10-28 forty shipped a Trench Sovereign Leviathan with a `{phobia}` fill of
 * "the leviathan": "While the leviathan can see the leviathan within 30 feet of
 * itself" — a creature afraid of itself. The fill was the TAIL of the name, so the
 * name has to be tested against the fill as well.
 */
describe('a fill that is the creature is refused whichever way round it is', () => {
  const leviathan = {
    scaled: scaleDonor(pickDonor(24, null, 'brute'), 24, { mechanics: [] }),
    archetype: 'brute', cr: 24, sections: {}, imposed: [], conditionMinor: 'Frightened',
    name: 'Trench Sovereign Leviathan', inline: 'leviathan', energy: 'Thunder', mix: null,
    meleeType: 'Bludgeoning', concept: 'a leviathan of the trench', size: 'Gargantuan',
  };
  const phobia = (v) => renderTemplate(TEMPLATE_BY_ID.get('phobia'), leviathan, { phobia: v }, { blind: true }).text;

  it.each(['the leviathan', 'leviathan', 'Trench Sovereign Leviathan'])('refuses %s', (v) => {
    expect(phobia(v)).not.toMatch(new RegExp(`can see (?:the )?${v}\\b`, 'i'));
  });
  it.each(['open flame', 'running water'])('still takes a real answer: %s', (v) => {
    expect(phobia(v)).toContain(v);
  });
});

/**
 * WHAT IT MIMICS IS PRINT'S OWN VARIABLE.
 *
 * Of 41 trait shapes only 9 carried a slot the GM's concept could fill; the other
 * 32 rendered fixed text with the creature's name substituted, which is how a
 * sheet lands the right row, in the right form, and still reads like nothing the
 * GM typed. Swept for which of those 32 print itself varies: six are print-fixed
 * (web-walker, evasion, berserk, tunneler, earth-glide, aberrant-ground), nine are
 * our own inventions with no grammar to follow, and mimicry is the one where
 * print's instances differ — Green Hag "animal sounds and humanoid voices", Raven
 * "simple sounds it has heard, such as a whisper or chitter".
 */
describe('mimicry takes the sounds the concept names', () => {
  const wraith = {
    scaled: scaleDonor(pickDonor(9, null, 'lurker'), 9, { mechanics: [] }),
    archetype: 'lurker', cr: 9, sections: {}, imposed: [], conditionMinor: 'Frightened',
    name: 'Bell Wraith', inline: 'wraith', energy: 'Thunder', mix: null,
    meleeType: 'Slashing', concept: 'a wraith of funeral bells', size: 'Medium',
  };
  const mimic = (v) => renderTemplate(TEMPLATE_BY_ID.get('mimicry'), wraith, v ? { mimicked: v } : {}, { blind: true }).text;

  it.each(['tolling bells', 'the voices of the drowned', 'a child crying'])('takes %s', (v) => {
    expect(mimic(v)).toMatch(new RegExp(`can mimic ${v}\\.`));
  });
  it('refuses the creature itself, either way round', () => {
    for (const v of ['wraith', 'Bell Wraith']) expect(mimic(v)).not.toMatch(new RegExp(`can mimic ${v}\\.`));
  });
  it('refuses rules text in a flavour slot', () => {
    expect(mimic('a DC 12 check')).not.toMatch(/can mimic a DC 12 check/);
  });
  it("falls back to print's own wording rather than a hole", () => {
    expect(mimic(null)).toMatch(/can mimic animal sounds and humanoid voices\./);
    expect(mimic(null)).not.toMatch(/\{/);
  });
  it('renders in every band it declares', () => {
    for (const cr of [0, 3, 9, 17, 24]) {
      const ctx = { ...wraith, cr, scaled: scaleDonor(pickDonor(cr, null, 'lurker'), cr, { mechanics: [] }) };
      expect(renderTemplate(TEMPLATE_BY_ID.get('mimicry'), ctx, {}, { blind: true })?.section).toBe('Traits');
    }
  });
});
