/**
 * AN AUTHORED ESCALATION MUST NAME ITS AMOUNT.
 *
 * Glacier's Heart shipped "this bonus increases each time it applies" — no
 * amount, unadjudicable — beside Regeneration 15/turn that reset it every turn.
 * The audit flagged it and could not repair it (rewrites touch `entry.model`
 * rows only; authored rows are not marked), so parseAuthorResponse is the gate.
 */
import { parseAuthorResponse } from '@/tools/statblock-generator/reskin/author.mjs';

const author = (effect, trigger = 'At the start of each of its turns while it has lost Hit Points') => parseAuthorResponse(JSON.stringify({
  attacks: [], saves: [], reactions: [],
  traits: [{ clause: 'grows more dangerous', name: 'Deepening Cold', trigger, effect }],
}), { attackKeys: [], attackCap: 3, riderSlots: 2, traitSlots: 2 });

describe('escalationOk', () => {
  it('refuses an escalation with no amount', () => {
    const r = author("the creature's Slam attacks deal extra Cold damage; this bonus increases each time it applies and resets when it regains Hit Points");
    expect(r.traits.map((t) => t.name)).not.toContain('Deepening Cold');
  });

  it('refuses an escalation with an amount but no ceiling', () => {
    const r = author("the creature's Slam attacks deal an extra 9 (2d8) Cold damage; this bonus increases each time it applies");
    expect(r.traits.map((t) => t.name)).not.toContain('Deepening Cold');
  });

  it('accepts an escalation that names its amount and its ceiling', () => {
    const r = author("the creature's Slam attacks deal an extra 9 (2d8) Cold damage; this bonus increases by 9 (2d8) each time it applies, to a maximum of 36 (8d8)");
    expect(r.traits.map((t) => t.name)).toContain('Deepening Cold');
  });

  it('leaves a non-escalating trait alone', () => {
    const r = author("the creature's Slam attacks deal an extra 9 (2d8) Cold damage until the end of its next turn");
    expect(r.traits.map((t) => t.name)).toContain('Deepening Cold');
  });
});
