/**
 * THE FUSE ENDS IN THE BIG MOVE. `tally` binds to the sheet's gated save nova
 * after the rows are final; with no such nova, it leaves and says why.
 */
import { tallyFeedsNova } from '@/tools/statblock-generator/reskin/generate.mjs';

const tallyRow = () => ({ name: 'Gathering Storm', template: 'tally', text: 'At the start of each of its turns, the creature gains a mark as the storm swells, to a maximum of 3. It can use its most powerful action only when it has 3 marks, and using it spends them.' });
const nova = () => ({ name: 'Forked Blast (Recharge 5-6)', gate: 'Recharge 5-6', text: '*Dexterity Saving Throw:* DC 16, each creature in a 30-foot Cone. *Failure:* 59 (17d6) Lightning damage.' });

describe('tallyFeedsNova', () => {
  it('re-gates the nova on 3 marks and names it in the tally', () => {
    const sections = { Traits: [tallyRow()], Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +9, reach 10 ft. 14 (2d8 + 5) Bludgeoning damage.' }, nova()] };
    const traces = []; const r = tallyFeedsNova(sections, (l, d) => traces.push(`${l} ${d}`));
    expect(r).toEqual({ nova: 'Forked Blast' });
    expect(sections.Actions[1].gate).toBe('3 Marks');
    expect(sections.Actions[1].name).toBe('Forked Blast (3 Marks)');
    expect(sections.Traits[0].text).toMatch(/use Forked Blast only when it has 3 marks/);
    expect(sections.Traits[0].text).not.toMatch(/most powerful action/);
    expect(traces.join('\n')).toMatch(/tally feeds the nova/);
  });

  it('leaves, and says why, when the sheet has no gated save nova', () => {
    const sections = { Traits: [tallyRow()], Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +9, reach 10 ft. 14 (2d8 + 5) Bludgeoning damage.' }] };
    const traces = []; const r = tallyFeedsNova(sections, (l, d) => traces.push(`${l} ${d}`));
    expect(r).toEqual({ declined: true });
    expect(sections.Traits).toEqual([]);
    expect(traces.join('\n')).toMatch(/tally declined/);
  });

  it('a gate that lives only in the NAME still counts — the recorded gate is read through gateOf', () => {
    const n = nova(); delete n.gate; // name-parse fallback
    const sections = { Traits: [tallyRow()], Actions: [n] };
    expect(tallyFeedsNova(sections)).toEqual({ nova: 'Forked Blast' });
  });

  it('is a no-op on a sheet with no tally', () => {
    const sections = { Traits: [], Actions: [nova()] };
    expect(tallyFeedsNova(sections)).toBeNull();
    expect(sections.Actions[0].gate).toBe('Recharge 5-6');
  });
});

describe('a fuse must not feed a fuse', () => {
  const tally = () => ({ name: 'Winding Spring', template: 'tally', text: 'At the start of each of its turns, the creature gains a mark as it coils, to a maximum of 3. It can use its most powerful action only when it has 3 marks, and using it spends them.' });
  const windUp = () => ({ name: 'Gathering Ruin (Recharge 5-6)', gate: 'Recharge 5-6', text: 'The creature begins gathering destructive power, its frame tensing. At the end of its next turn, after it has moved, the power erupts. *Dexterity Saving Throw:* DC 16, each creature in a 20-foot Emanation. *Failure:* 32 (5d12) Piercing damage.' });
  const plainNova = () => ({ name: 'Stone Barrage (Recharge 5-6)', gate: 'Recharge 5-6', text: '*Constitution Saving Throw:* DC 17, each creature in a 30-foot Cone. *Failure:* 55 (10d10) Thunder damage.' });

  it('refuses a delayed wind-up as the payoff and leaves, traced', () => {
    const sections = { Traits: [tally()], Actions: [windUp()] };
    const traces = []; const r = tallyFeedsNova(sections, (l, d) => traces.push(`${l} ${d}`));
    expect(r).toEqual({ declined: true });
    expect(sections.Traits).toEqual([]);
    expect(sections.Actions[0].gate).toBe('Recharge 5-6'); // untouched
    expect(traces.join('\n')).toMatch(/defers its own damage/);
  });

  it('picks the immediate nova when the sheet has both', () => {
    const sections = { Traits: [tally()], Actions: [windUp(), plainNova()] };
    expect(tallyFeedsNova(sections)).toEqual({ nova: 'Stone Barrage' });
    expect(sections.Actions[1].name).toBe('Stone Barrage (3 Marks)');
    expect(sections.Actions[0].gate).toBe('Recharge 5-6');
  });
});
