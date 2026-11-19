/**
 * A TEMPLATE WHOSE OWN TEXT DEPENDS ON ITS DURATION KEEPS IT (2026-11-18).
 *
 * The Air Elemental's Stolen Voices shipped:
 *
 *   *Failure:* The target has the Frightened condition until the end of ITS next turn. If the
 *   target was already Frightened by this ability, it also takes 9 (2d8) Thunder damage.
 *
 * The second sentence can never fire. "Its" is the target's turn, so the fear is over before the
 * elemental acts again, and the escalation is dead text on the card.
 *
 * THE HANDOFF'S DIAGNOSIS WAS WRONG, and reading the tape is what showed it. It said a `source_end`
 * duration was being WRITTEN as "its next turn" on a printed body. It is not: the fit call ANSWERED
 * `duration: "target_end"` on both sheets that have this — the Air Elemental and the Quarry
 * Scree-Wyrm, which is not a printed body — and the fill lets the call's answer override the
 * template's `duration_default`. That override is the 2026-10-23 rule and is right everywhere else.
 *
 * `escalating-dread` is the one template of 114 with both a {duration} slot and a sentence that
 * refers back to the condition it just applied, so it declares `duration_fixed` and the call does
 * not get to choose. Counted on the baseline: 4 rows come from a `source_end` template and 2 were
 * written as "its next turn" — these two.
 */
import { TEMPLATE_BY_ID, TEMPLATES, renderTemplate } from '../templates.mjs';
import { LIBRARY_SEEDS } from '../library.mjs';
import { SHAPES } from '../shapes.mjs';

const ctx = { cr: 5, dc: 13, pb: 3, per_hit: 11, sections: {}, archetype: 'lurker', name: 'Air Elemental',
  scaled: { cr: 5, dc: 13, pb: 3, per_hit: 11, sections: {} } };
const durationOf = (tpl, fills) => (/until the (?:end|start) of [^.]*/.exec(String(renderTemplate(tpl, ctx, fills)?.text ?? '')) ?? [])[0] ?? null;

describe('a duration its own text needs', () => {
  test('the declaration reaches the catalog, which is where it has been lost before', () => {
    const t = TEMPLATE_BY_ID.get('escalating-dread');
    expect(t).toBeDefined();                       // the subject is present
    expect(t.duration_default).toBe('source_end');
    expect(t.duration_fixed).toBe(true);
  });

  test("the call's answer does not override it, whichever way it answers", () => {
    const t = TEMPLATE_BY_ID.get('escalating-dread');
    for (const asked of ['target_end', 'target_start', 'source_start', 'source_end', undefined]) {
      expect(durationOf(t, asked ? { duration: asked } : {})).toBe("until the end of the creature's next turn");
    }
  });

  test('every other template still takes the call\'s answer — the 10-23 rule stands', () => {
    const t = TEMPLATE_BY_ID.get('sensory-strike');
    expect(t.duration_fixed).toBe(false);
    expect(durationOf(t, { duration: 'target_end' })).toBe('until the end of its next turn');
    expect(durationOf(t, { duration: 'source_end' })).toBe("until the end of the creature's next turn");
  });

  // DATA INTEGRITY: the flag is on exactly the templates that need it, so a new row with the same
  // shape of sentence cannot be added without this failing.
  test('every template whose text refers back to the condition it applied, and can take a duration, declares it', () => {
    const REFERS_BACK = /\balready\b[^.]*\bby this (?:ability|creature)\b/i;
    const all = [
      ...LIBRARY_SEEDS.map((x) => ({ id: x.key, texts: [x.text] })),
      ...SHAPES.map((x) => ({ id: x.id, texts: [x.text, ...Object.values(x.frames ?? {})] })),
    ];
    const needIt = all.filter((x) => x.texts.filter(Boolean).some((tx) => REFERS_BACK.test(tx) && tx.includes('{duration}')));
    expect(needIt.map((x) => x.id)).toEqual(['escalating-dread']);   // the sweep found the subject
    for (const x of needIt) expect(TEMPLATE_BY_ID.get(x.id)?.duration_fixed).toBe(true);
  });

  test('no template declares the flag without needing it', () => {
    const flagged = TEMPLATES.filter((t) => t.duration_fixed).map((t) => t.id);
    expect(flagged).toEqual(['escalating-dread']);
  });
});
