/**
 * A FORMATION CLAUSE HAS SOMEWHERE TO LAND.
 *
 * The 2026-10-28 forty graded Vashka the Red a `fix`: a hobgoblin warlord who
 * "fights from a shield wall and never breaks ranks" shipped an AUTHORED trait
 * reading "Vashka has a bonus to its Armor Class" — no number, the condition
 * stated twice, unrunnable. The clause had nowhere to land; "the call named no
 * template" was that run's largest death site for accepted picks.
 *
 * A priced AC bonus has no calibration to borrow — print writes "+N bonus to" in
 * none of its 329 blocks. Print's answer is Pack Tactics, 18 times, one of them
 * on the Hobgoblin Warrior.
 */
import { TEMPLATE_BY_ID, TEMPLATES, MECHANIC_OF, renderTemplate } from '@/tools/statblock-generator/reskin/templates.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';
import print from '@/data/srd52-monsters.json';

const ctx = (cr) => ({
  scaled: scaleDonor(pickDonor(cr, null, 'skirmisher'), cr, { mechanics: [] }),
  archetype: 'skirmisher', cr, sections: {}, imposed: [], conditionMinor: 'Frightened',
  name: 'Vashka', inline: 'Vashka', energy: 'Fire', mix: null, meleeType: 'Slashing',
  concept: 'fights from a shield wall', size: 'Medium',
});
const render = (cr) => renderTemplate(TEMPLATE_BY_ID.get('pack-tactics'), ctx(cr), {}, { blind: true });
// what a sheet actually shows: the frame's "the creature" is stamped with the short form
const asRead = (text) => String(text).split('The creature').join('Vashka').split('the creature').join('Vashka');

describe('the template is registered, not inert', () => {
  // A shape added earlier this sprint shipped INERT because one registration
  // patch silently failed to match; registration is pinned, not assumed.
  it('is in the catalog under its print name', () => {
    expect(TEMPLATE_BY_ID.get('pack-tactics')?.name).toBe('Pack Tactics');
    expect(TEMPLATES.some((t) => t.id === 'pack-tactics')).toBe(true);
  });
  it('carries a mechanic, so an idea can surface it', () => {
    expect(MECHANIC_OF['pack-tactics']).toBe('command');
  });
  it('renders in every CR band', () => {
    for (const cr of [0, 1, 5, 9, 12, 17, 24]) expect(render(cr)?.section).toBe('Traits');
  });
});

describe('the mechanic is print\'s, and the stamping does not invert it', () => {
  // Print writes "allies is within 5 feet of THE CREATURE", meaning the TARGET.
  // Our frames stamp every "the creature" with the monster's own short form, so
  // print's pronoun would have read "allies within 5 feet of Vashka" — the ally
  // standing beside its own warlord instead of flanking the target.
  it('requires the ally to be adjacent to the TARGET', () => {
    const read = asRead(render(6).text);
    expect(read).toMatch(/within 5 feet of that target/);
    expect(read).not.toMatch(/within 5 feet of Vashka/);
  });
  it('grants Advantage on an attack roll and nothing else', () => {
    const read = asRead(render(6).text);
    expect(read).toMatch(/has Advantage on an attack roll/);
    expect(read).not.toMatch(/bonus to/);
  });
  it('excludes an Incapacitated ally, as print does', () => {
    expect(asRead(render(6).text)).toMatch(/the ally doesn't have the Incapacitated condition/);
  });

  it('matches print\'s rule, which 18 blocks carry', () => {
    const rows = print.flatMap((m) => Object.values(m.sections ?? {}).flat().filter(Boolean)
      .filter((r) => /Pack Tactics/.test(String(r.name ?? ''))));
    expect(rows.length).toBeGreaterThanOrEqual(10);
    for (const r of rows.slice(0, 5)) expect(r.text).toMatch(/Advantage on an attack roll .*allies is within 5 feet/s);
  });

  it('is unpriced — a trait that costs the creature nothing needs no number', () => {
    expect(render(6).text).not.toMatch(/\d+ \(\d+d\d+/);
  });
});
