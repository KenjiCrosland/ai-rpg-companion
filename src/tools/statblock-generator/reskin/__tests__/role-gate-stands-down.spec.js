/**
 * ROLE IS A TASTE FILTER, AND TASTE DOES NOT OVERRULE AN ASK.
 *
 * Owner's ruling, 2026-11-05: "lets not role gate if the gm is asking for something...but
 * we want to keep gating when the gm doesn't ask for specific abilities or modifications".
 *
 * The chain that produced it (#30 Ledger Ghaunt, homebrew40 2026-11-05T15-02-18). The GM
 * typed "a tax-ghost that makes you drop what you are carrying". The catalog HAS the
 * mechanic — `disarm`, "Disarming Twist" — but it declares `roles: ["skirmisher",
 * "defender"]` and the concept routed to `lurker`, so it never reached the menu. Every
 * step after that was correct on a false premise: the action menu held 12 templates and
 * none disarmed, the fit call answered `no_fit` truthfully, the seat authored a Wisdom-save
 * substitute, and the trait seat reached for `phobia` — the critic's §3 subject flip, which
 * made the ghost flee carried coin and crippled it, since every party carries coin.
 *
 * `templatesFor` already lifted role and style for an "asked" template; its TRIGGER was a
 * word list. `askedFor` matches the GM's text against each template's `keys`, and
 * `disarm.keys` holds disarm/twist/strip/weapon/snatch/steal/pluck/wrench/knock away/take
 * — not "drop". Adding "drop" would fix one sheet and is the move the house rule forbids,
 * so the lift keys off the idea call's own anchoring instead and judges nothing itself.
 */
import { templatesFor, TEMPLATES } from '../templates.mjs';

const GHOST = {
  archetype: 'lurker', cr: 5, type: 'Undead', sections: {},
  concept: 'a tax-ghost that makes you drop what you are carrying',
  section: 'action', trigger: 'save',
};
const ids = (opts) => (templatesFor({ ...GHOST, ...opts }) ?? []).map((t) => t.id);

describe("role and style stand down for a clause the GM typed", () => {
  it('is the real case: disarm exists, does the mechanic, and is role-gated away from lurker', () => {
    const d = TEMPLATES.find((t) => t.id === 'disarm');
    expect(d).toBeTruthy();
    expect(d.roles).toEqual(['skirmisher', 'defender']);   // the filter that hid it
    expect(d.section).toBe('action');
    expect(`${d.trigger}/${d.effect}`).toBe('save/movement');
    // and the word list is why the existing lift did not fire — recorded, not fixed
    expect(d.keys).not.toContain('drop');
  });

  it('hides disarm from a lurker when the engine is inventing the row', () => {
    expect(ids({ gmAsked: false })).not.toContain('disarm');
  });

  it('offers it once the seat answers something the GM asked for', () => {
    expect(ids({ gmAsked: true })).toContain('disarm');
  });

  it('APPENDS rather than reorders — every template the shelf had keeps its place', () => {
    // "a longer menu must not reorder a pick the shelf already had" (the re-roll's reel pin)
    const shelf = ids({ gmAsked: false });
    const lifted = ids({ gmAsked: true });
    expect(lifted.slice(0, shelf.length)).toEqual(shelf);
    expect(lifted.length).toBeGreaterThan(shelf.length);
  });

  it('lifts taste only — legality still filters, so the menu is not the whole catalog', () => {
    // CR range, engine family, movement and denials are renderability, never taste
    expect(ids({ gmAsked: true }).length).toBeLessThan(TEMPLATES.length);
  });

  it('keeps the gate for the half of the ruling that protects a caster', () => {
    // the shove a caster should never be offered stays off an unanchored caster menu
    const casterInventing = (templatesFor({
      ...GHOST, archetype: 'caster', gmAsked: false,
    }) ?? []).map((t) => t.id);
    expect(casterInventing).not.toContain('disarm');
  });
});
