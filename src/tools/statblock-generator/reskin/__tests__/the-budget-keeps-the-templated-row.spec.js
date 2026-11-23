/**
 * WITHIN ONE RECEIPT RANK, A TEMPLATED ROW BEATS AN UNTEMPLATED ONE (owner, 2026-11-14).
 *
 * Probe B's clockwork spider (probe B #01, 14 November; its blocks file has since gone and the
 * two rows are kept verbatim in `spiderPair()` below) had one package seat write two
 * rows for the same element: the action "Caught Line (Recharge 5-6)" on the snare template,
 * priced and accepted by the value check, and the trait "Mainspring Rewind" with no template.
 * Both ranked `element`. The sort is stable, so the tie fell to sheet order — Traits before
 * Actions — and with a budget of 0 the single held slot went to the trait.
 *
 * The audit then faulted the survivor twice, and the sheet shipped "while it is not grappling
 * or restraining a creature" with nothing left on it that restrains.
 *
 * This is a TIE-BREAK INSIDE the owner's 10-29 ruling (GM quote, then element, then
 * decoration), not a change to it: `receiptRank` still decides first and always, which is what
 * the second test here pins.
 *
 * WHERE THE TIE-BREAK IS NOW VISIBLE (owner, 2026-11-23). The ruling is unchanged, but the round
 * that gave a sheet one free trait AND one free row that is not a trait narrowed the cases in
 * which anything has to go. On a card with room, a trait and an action now BOTH stay and no order
 * decides anything. The tie-break still decides when the card is at print's high end, or between
 * two rows of the same kind — so every test below is run on a full card as well, which is where
 * the ordering still does its work.
 */
import { settleSheetBudgets } from '../generate.mjs';
import { lintStatblock } from '../../format-2024/lint.mjs';

/** probe B #01's two rows, as the run wrote them */
const spiderPair = () => ({
  Traits: [{ name: 'Mainspring Rewind', text: 'While it is not grappling or restraining a creature, the vermin-catcher winds itself back up and its Speed is unaffected by Difficult Terrain.', freeRow: true, expresses: 'tar', authored: true }],
  Actions: [
    { name: 'Multiattack', text: 'The vermin-catcher makes two Fangs attacks.' },
    { name: 'Fangs', text: '*Melee Attack Roll:* +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.' },
    { name: 'Caught Line (Recharge 5-6)', text: '*Dexterity Saving Throw*: DC 12, one creature the vermin-catcher can see within 30 feet. *Failure:* The target has the Restrained condition until the strand is destroyed.', freeRow: true, expresses: 'tar', template: 'snare' },
  ],
});
const settle = (sections, cr = 2) => { const lines = []; settleSheetBudgets({ sections, cr, trace: (a, b) => lines.push(`${a} ${b}`) }); return { sections, lines: lines.join(' | ') }; };
const names = (s) => Object.values(s).flat().map((e) => e.name);
/**
 * The same sheet on a card with NO room: print's high end for band 0-2 is 4 rows, so four fixed
 * ones leave nothing over and the ordering alone decides who stays. Multiattack is not counted.
 */
const onAFullCard = (sections) => {
  const fixed = Object.values(sections).flat().filter((e) => !e.freeRow && !/^Multiattack/.test(e.name)).length;
  const pad = Array.from({ length: Math.max(0, 4 - fixed) }, (_, i) => ({ name: `Fixed ${i}`, text: 'A printed row.' }));
  return { ...sections, Actions: [...(sections.Actions ?? []), ...pad] };
};

describe('a tie within a rank keeps the templated row', () => {
  test("probe B #01 replayed on a full card: Caught Line survives and Mainspring Rewind leaves", () => {
    const { sections, lines } = settle(onAFullCard(spiderPair()));
    expect(names(sections)).toContain('Caught Line (Recharge 5-6)');
    expect(names(sections)).not.toContain('Mainspring Rewind');
    expect(lines).toMatch(/free-row order: "Caught Line" \[element, snare\] > "Mainspring Rewind" \[element, no template\]/);
  });

  test('and on the card as the run actually had it, both now stay — one trait, one action', () => {
    // The spider's own card had room for three more rows. Under the 23 November rule nothing has
    // to go, and the sheet that shipped "while it is not grappling or restraining a creature" now
    // keeps the row that restrains as well.
    const { sections, lines } = settle(spiderPair());
    expect(names(sections).sort()).toEqual(['Caught Line (Recharge 5-6)', 'Fangs', 'Mainspring Rewind', 'Multiattack']);
    // the ordering still ran, and still ranked them the same way
    expect(lines).toMatch(/free-row order: "Caught Line" \[element, snare\] > "Mainspring Rewind" \[element, no template\]/);
  });

  test('sheet order no longer decides it — the trait wins when IT is the templated one', () => {
    const flipped = spiderPair();
    flipped.Traits[0].template = 'adhesive';
    delete flipped.Actions[2].template;
    const { sections } = settle(onAFullCard(flipped));
    expect(names(sections)).toContain('Mainspring Rewind');
    expect(names(sections)).not.toContain('Caught Line (Recharge 5-6)');
  });
});

describe('what the tie-break must not change', () => {
  test('a receipt still beats a decoration, templated or not', () => {
    // the decoration is the one on a template; the element row is not. The RANK wins.
    // On a full card, where one of the two has to go.
    const { sections, lines } = settle(onAFullCard({
      Traits: [{ name: 'Deco', text: 'A decorative trait.', freeRow: true, decoration: true, template: 'terrain-walk' }],
      Actions: [{ name: 'Multiattack', text: 'two attacks.' }, { name: 'Elem', text: 'An element row.', freeRow: true, expresses: 'e' }],
    }));
    expect(names(sections)).toContain('Elem');
    expect(names(sections)).not.toContain('Deco');
    expect(lines).toMatch(/"Elem" \[element, no template\] > "Deco" \[decoration, terrain-walk\]/);
  });

  test('a budget with room keeps BOTH — the tie-break only decides who goes when one must', () => {
    // CR 2 sits in print's thinnest band, where the budget settles at 1 however bare the card:
    // at that CR the tie-break is the whole decision. At CR 6 and up there is room for two, and
    // the templated row must not evict a row the budget could have afforded.
    const pair = () => ({
      Traits: [{ name: 'Mainspring Rewind', text: 'A trait.', freeRow: true, expresses: 'gears', authored: true }],
      Actions: [{ name: 'Caught Line', text: 'A save row.', freeRow: true, expresses: 'tar', template: 'snare' }],
    });
    for (const cr of [6, 12, 18]) {
      expect(names(settle(pair(), cr).sections).sort()).toEqual(['Caught Line', 'Mainspring Rewind']);
    }
    // and on a card with no room, where only one fits, it is the templated one
    expect(names(settle(onAFullCard(pair()), 2).sections).filter((n) => !/^Fixed /.test(n)))
      .toEqual(['Caught Line']);
  });
});

describe('a row that waits on a hold the sheet never makes', () => {
  const sheet = (sections) => ({ name: 'Brass Vermin-Catcher', size: 'Small', type: 'Construct', cr: '2', ac: 13, hp: 30, speed: '30 ft.', stats: { STR: 16, DEX: 12, CON: 14, INT: 3, WIS: 10, CHA: 3 }, sections });
  const rules = (m) => (lintStatblock(m, { edition: '2024' })?.findings ?? []).map((f) => f.rule);

  test('it fires on #01 as it shipped — the restraining row was evicted', () => {
    const shipped = sheet({ Traits: [{ name: 'Mainspring Rewind', text: 'While it is not grappling or restraining a creature, the vermin-catcher winds itself back up.' }], Actions: [{ name: 'Fangs', text: '*Melee Attack Roll:* +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.' }] });
    expect(rules(shipped)).toContain('holds-nothing');
  });

  test('it stays quiet when the sheet DOES restrain — #01 after the tie-break, and #02', () => {
    const fixed = sheet({ Traits: [{ name: 'Mainspring Rewind', text: 'While it is not grappling or restraining a creature, the vermin-catcher winds itself back up.' }], Actions: [{ name: 'Caught Line (Recharge 5-6)', text: '*Dexterity Saving Throw*: DC 12, one creature. *Failure:* The target has the Restrained condition until the strand is destroyed.' }] });
    expect(rules(fixed)).not.toContain('holds-nothing');
    // #02, the untouched baseline: a wire snare and no trait that waits on a hold
    const baseline = sheet({ Traits: [], Actions: [{ name: 'Snare Wire (Recharge 5-6)', text: '*Dexterity Saving Throw*: DC 12, one creature. *Failure:* The target has the Restrained condition.' }] });
    expect(rules(baseline)).not.toContain('holds-nothing');
  });

  test('it reports and never rewrites — the row is untouched', () => {
    const shipped = sheet({ Traits: [{ name: 'Mainspring Rewind', text: 'While it is not grappling or restraining a creature, it winds up.' }], Actions: [{ name: 'Fangs', text: '*Melee Attack Roll:* +5, reach 5 ft. 7 (1d8 + 3) Piercing damage.' }] });
    const before = shipped.sections.Traits[0].text;
    lintStatblock(shipped, { edition: '2024' });
    expect(shipped.sections.Traits[0].text).toBe(before);
  });
});
