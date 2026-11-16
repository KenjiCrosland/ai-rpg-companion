/**
 * A ROW NEVER NAMES ANOTHER CREATURE (fix 4, 2026-11-14).
 *
 * Print writes its own noun into its rows — the Ankheg's Bite says "Grappled by the
 * ankheg", the Mage's rows say "The mage casts". Thirteen print-canon paste sites run
 * every borrowed string through `asInline`, which swaps print's noun for this sheet's.
 * Three paths did not, and each shipped a card naming a creature that is not on it:
 *
 *   #05 Lord Vexmoor  "The mage casts Misty Step"            — the class kit's own rows
 *   #33 Thornback     "Grappled by the ankheg"               — print's roll parenthetical
 *   #31 Rimebound Troll "pulled 10 feet straight toward Troll" — the early inline guess
 *
 * Each has a different cause, so each gets its own test.
 *
 * The Thornback case is the one worth remembering: the audit CAUGHT it and let it go,
 * because the row carries print's stamp and the exemption reads that as "this is
 * published text, so the audit is arguing with print". It was our paste.
 */
import { generateReskin } from '../generate.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';
import { renameKeysOf } from '../generate.mjs';

const mk = (cr, style, arch) => { const scaled = scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [] }); const renames = { Teleport: 'Blink Step', 'Ranged Attack': 'Hurl', 'Hybrid Attack': 'Hybrid Strike' }; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; }); const typed = [...Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name), 'Hurl', 'Hybrid Strike']; return { scaled, renames, typed }; };
const json = (name, type, cr, style, arch, over = {}) => { const { scaled, renames, typed } = mk(cr, style, arch); return JSON.stringify({ name, type, size: over.size ?? 'Medium', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 10 feet. *Failure:* The target has the Prone condition.`, ...(over.extra ?? {}) }); };
const gen = (opts, answer) => generateReskin({ mechanics: [], ...opts }, async () => answer);
const textOf = (m) => Object.values(m.sections).flat().map((e) => `${e.name}. ${e.text}`).join('\n');

describe('a row never names another creature', () => {
  test("print's roll parenthetical takes this creature's name — the Ankheg's own words say \"by the ankheg\"", async () => {
    const desc = 'an ankheg but legendary, boss fight for level 5';
    const m = await gen(
      { archetype: 'brute', concept: desc, userConcept: desc, cr: 5, fixedName: 'Thornback', path: { path: 'twist', print_body: 'Ankheg' } },
      json('Thornback', 'Monstrosity', 5, null, 'brute', { extra: { clauses: [{ text: desc, kind: 'mechanical' }] } }),
    );
    const t = textOf(m);
    // print's own Bite carries the parenthetical; it may ride along, but not with print's noun
    expect(t).not.toMatch(/\bthe ankheg\b/i);
    if (/with Advantage if the target is Grappled by/i.test(t)) expect(t).toMatch(new RegExp(`Grappled by ${m.inline}`, 'i'));
  });

  // PASS 3 (the seat and repair calls take the settled name, not the guess) HAS NO UNIT
  // TEST HERE, deliberately. The row that shipped "toward Troll" was SEAT-AUTHORED — the
  // seat call runs ~1,600 lines after the name settles and was handed the guess as the
  // creature's name, so the model wrote it; the repair the audit then ordered was handed
  // the same guess and wrote it back. This harness answers every call with one stub, which
  // makes the idea call's fit succeed, so the seat call never runs and any test written
  // here passes whether the fix is in or out. A test that cannot fail is worse than none.
  // Its evidence is the traced root cause on 31-rimebound-troll and the v-regress run.

  test('the re-stamp still fires when the NAME sits inside the guess, not the other way round', async () => {
    // "Cinderbent" declared "the cinderbent"; the rule makes it a person. The mask that
    // protects "Rimebound Troll" must not protect "Cinderbent" here, or this row keeps
    // the guess forever. This is the regression the mask caused and the narrowing fixed.
    const m = await gen(
      { archetype: 'skirmisher', concept: 'a tiefling duelist', userConcept: 'a tiefling duelist', cr: 4 },
      json('Cinderbent', 'Humanoid', 4, null, 'skirmisher', { extra: { inline: 'the cinderbent' } }),
    );
    expect(m.inline).toBe('Cinderbent');
    expect(textOf(m)).not.toMatch(/the cinderbent/i);
  });
});
