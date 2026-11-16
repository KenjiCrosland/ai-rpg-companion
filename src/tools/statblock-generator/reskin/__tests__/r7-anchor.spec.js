/**
 * R7 · ANCHOR — the idea is told which of the GM's asks it must answer, and names it.
 *
 * The critic's forty #2: surprises retained across a re-roll **1 of 7**, because the
 * idea call rolled fresh with nothing tying it to the GM's sentence — so a surprise was
 * rolled rather than earned, and an idea often answered a clause the GM never typed
 * (sheet 30 authored a stealth trait for "makes you drop what you are carrying"; sheet
 * 34 authored a stealth trait for a duellist).
 *
 * The engine already knew which asks were open — `unansweredClauses`, the same
 * predicate the seats use to hand a clause a row. It was declared ~950 lines BELOW the
 * idea call and as a `const`, so calling it from there threw a TDZ ReferenceError; it is
 * hoisted, not copied, and `unansweredClause` is now the first of its list.
 *
 * The call's answer is validated by MEMBERSHIP against the lines handed over — never a
 * word match — exactly as `family`, `section` and `effect` already are.
 */
import { buildIdeaPrompt, parseIdeas } from '@/tools/statblock-generator/reskin/templates.mjs';
import { buildSeatPrompt } from '@/tools/statblock-generator/reskin/author.mjs';
import { generateReskin, renameKeysOf } from '@/tools/statblock-generator/reskin/generate.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const OPEN = [{ handed: 'drags fishermen under', mechanic: 'grapple' }, { handed: 'whose hide steams', mechanic: null }];
const idea = (over = {}) => ({ idea: 'x'.repeat(40), section: 'action', trigger: 'save', effect: 'damage', ...over });

describe('the idea call is handed the open asks', () => {
  const text = buildIdeaPrompt({ name: 'Bog Hound', cr: 5, concept: 'c', sheetLines: 's', openClauses: OPEN });

  test('every open ask is listed, with the mechanic the clause call declared for it', () => {
    expect(text).toMatch(/THE GM'S OWN ASKS THAT NOTHING ON THE SHEET ANSWERS YET/);
    expect(text).toMatch(/1\. "drags fishermen under" — an earlier call read this as asking for: grapple/);
    expect(text).toMatch(/2\. "whose hide steams"$/m); // no mechanic declared for this one, so none is claimed
  });

  // UPDATED (R9 · E14, forty #4): the answer is an INDEX now. Asking for the line back
  // produced 49 blanks and 20 copies of the whole rendered line, annotation included.
  test('the schema asks for the ask\'s NUMBER, and only when there are asks to name', () => {
    expect(text).toMatch(/"clause": <required: the NUMBER 1-2 of the ask this answers, or 0 for none>/);
    expect(buildIdeaPrompt({ name: 'X', cr: 5, concept: 'c', sheetLines: 's' })).not.toMatch(/"clause"/);
  });

  test('two seats are told to take different asks where there are two', () => {
    expect(text).toMatch(/give them DIFFERENT numbers where there are two to give/);
  });
});

describe('the answer is validated by membership, never by word match', () => {
  const handed = OPEN.map((c) => c.handed);

  test('a clause copied back exactly is kept', () => {
    expect(parseIdeas(JSON.stringify({ action: idea({ clause: 'drags fishermen under' }) }), handed).action.clause).toBe('drags fishermen under');
  });

  test('a clause the call invented is NOT kept — and it is not word-matched into one', () => {
    // "drags people under the water" shares four words with the real ask and is still refused
    expect(parseIdeas(JSON.stringify({ action: idea({ clause: 'drags people under the water' }) }), handed).action.clause).toBeNull();
  });

  test('no clause field, or no list handed over, leaves it null — today\'s behaviour', () => {
    expect(parseIdeas(JSON.stringify({ action: idea() }), handed).action.clause).toBeNull();
    expect(parseIdeas(JSON.stringify({ action: idea({ clause: 'drags fishermen under' }) }), []).action.clause).toBeNull();
  });

  test('the trait seat is validated the same way', () => {
    const p = parseIdeas(JSON.stringify({ trait: idea({ clause: 'whose hide steams', section: 'trait' }) }), handed);
    expect(p.trait.clause).toBe('whose hide steams');
  });
});

describe('the seat prompt names the clause the row must answer', () => {
  test('with a clause, it is stated as the row\'s whole purpose', () => {
    const t = buildSeatPrompt({ name: 'Bog Hound', inline: 'the hound', cr: 5, sheet: 's', idea: 'it heaves backward', kind: 'an action', clause: 'drags fishermen under' });
    expect(t).toMatch(/THE CLAUSE THIS ROW MUST ANSWER/);
    expect(t).toMatch(/\*\*"drags fishermen under"\*\*/);
    expect(t).toMatch(/A row that is good in itself and answers something else is the wrong row/);
  });

  test('with no clause, the prompt is unchanged from before R7', () => {
    expect(buildSeatPrompt({ name: 'X', inline: 'it', cr: 5, sheet: 's', idea: 'i', kind: 'an action' })).not.toMatch(/THE CLAUSE THIS ROW MUST ANSWER/);
  });
});

describe('in the pipeline', () => {
  const answer = (cr, archetype, clauses) => {
    const scaled = scaleDonor(pickDonor(cr, null, archetype), cr, { mechanics: [] });
    const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    return JSON.stringify({ name: 'Bog Hound', type: 'Monstrosity', size: 'Medium', alignment: 'Unaligned', senses: 'darkvision 60 ft.', languages: 'None', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 5 feet. *Failure:* The target has the Prone condition.`, extra: { clauses } });
  };
  const concept = 'a bog hound that drags fishermen under and whose hide steams';

  test('the open asks reach the prompt, and the anchored answer is traced', async () => {
    const lines = []; const prompts = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    try {
      await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 5, mechanics: [] }, async (prompt) => {
        prompts.push(prompt);
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) {
          // the call answers with the FIRST ask it was handed, copied back
          const listed = (/^1\. "([^"]+)"/m.exec(prompt) ?? [, ''])[1];
          return JSON.stringify({ action: { idea: 'It sets its paws and heaves backward, hauling what it holds off its feet.', section: 'action', trigger: 'save', effect: 'movement', clause: listed } });
        }
        if (prompt.startsWith("A monster's signature ability")) return JSON.stringify({ template: 'none', because: '', declined_because: 'no_fit', closest: 'bloodied-fury', missing: 'a haul that drags' });
        if (prompt.startsWith('You are writing ONE ability for a D&D monster')) return JSON.stringify({ attacks: [], saves: [{ clause: 'drags fishermen under', name: 'Heave Under', stat: 'Strength', target: 'one creature within 5 feet', damage: true, type: 'Bludgeoning', condition: null, movement: 'pulled up to 15 feet', success: 'none', recharge: false }], traits: [], reactions: [], crossRef: null, unplaced: [] });
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        return answer(5, 'brute', [{ text: 'drags fishermen under', kind: 'mechanical' }, { text: 'whose hide steams', kind: 'mechanical' }]);
      });
    } finally { console.log = orig; }
    const trace = lines.join('\n');
    expect(trace).toMatch(/open asks handed to the idea call:/);
    expect(trace).toMatch(/idea anchored: action/);                       // the membership check passed in-pipeline
    const ideaPrompt = prompts.find((q) => q.startsWith('You are inventing the SIGNATURE ability'));
    expect(ideaPrompt).toMatch(/THE GM'S OWN ASKS THAT NOTHING ON THE SHEET ANSWERS YET/);
    const seatPrompt = prompts.find((q) => q.startsWith('You are writing ONE ability for a D&D monster'));
    expect(seatPrompt).toMatch(/THE CLAUSE THIS ROW MUST ANSWER/);        // and it reached the authoring call
  }, 30000);

  test('an unanchored answer is traced as such and still generates', async () => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'brute', concept, userConcept: concept, cr: 5, mechanics: [] }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) return JSON.stringify({ action: { idea: 'It roars and something somewhere catches fire for no stated reason.', section: 'action', trigger: 'save', effect: 'damage', clause: 'an ask it made up' } });
        if (prompt.startsWith("A monster's signature ability")) return JSON.stringify({ template: 'none', because: '', declined_because: 'collision', closest: 'bloodied-fury', missing: 'x' });
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        return answer(5, 'brute', [{ text: 'drags fishermen under', kind: 'mechanical' }]);
      });
    } finally { console.log = orig; }
    expect(lines.join('\n')).toMatch(/idea unanchored: action/);
    expect(m).toBeTruthy(); // never-fail: an unanchored idea is the old behaviour, not a failure
  }, 30000);
});

/**
 * FORTY #3 PINS. The anchor fired on 16 of 78 seats; three causes, all ours, each
 * replayed on the sheet that earned it.
 */
describe('forty #3 — the list handed over is the GM\'s ASKS, not every open clause', () => {
  // Measured on homebrew40-2026-11-02T13-47-49: 68 lines handed, **31 descriptive
  // heads** — "a mud-caked bog hound" (01), "a cairn-wight" (09), "a reef-drake" (11).
  // The reader's head FALLBACK is right for a seat needing one clause and wrong for a
  // list; 46% noise invited the call to name nothing.
  const record = [
    { text: 'a mud-caked bog hound', kind: 'descriptive', head: true },
    { text: 'drags fishermen under', kind: 'mechanical', askMechanic: 'grapple' },
  ];
  const filt = (list) => list.filter((c) => c.kind === 'mechanical' && !c.head);

  test('the filter keeps the ask and drops the head — sheet 01', () => {
    const kept = filt(record.map((c) => ({ handed: c.text, kind: c.kind, head: !!c.head, mechanic: c.askMechanic ?? null })));
    expect(kept.map((c) => c.handed)).toEqual(['drags fishermen under']);
  });

  test('the idea prompt therefore never shows the creature itself', () => {
    const kept = filt(record.map((c) => ({ handed: c.text, kind: c.kind, head: !!c.head, mechanic: c.askMechanic ?? null })));
    const t = buildIdeaPrompt({ name: 'Bog Hound', cr: 1, concept: 'c', sheetLines: 's', openClauses: kept });
    expect(t).toMatch(/"drags fishermen under"/);
    expect(t).not.toMatch(/a mud-caked bog hound/);
  });
});

describe('forty #3 — a hyphen is part of a compound, not a word boundary', () => {
  // "a kiln-priest whose prayers are spoken in fire" minus the print body "priest"
  // shipped as "a kiln- whose prayers are spoken in fire", was handed to the idea call,
  // and was faithfully anchored to. The 10-22 fix excluded letters and left the hyphen.
  const cut = (t, q) => {
    const sx = String(t ?? ''); const needle = String(q ?? '').trim(); if (!needle) return sx;
    const bounded = new RegExp(`(?<![A-Za-z-])${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-z-])`, 'i');
    const i = sx.search(bounded) >= 0 ? sx.search(bounded) : -1;
    return (i < 0 ? sx : `${sx.slice(0, i)} ${sx.slice(i + needle.length)}`).replace(/\s{2,}/g, ' ').trim();
  };
  test('"a kiln-priest" keeps its compound when the body "priest" is cut', () => {
    expect(cut('a kiln-priest whose prayers are spoken in fire', 'priest')).toBe('a kiln-priest whose prayers are spoken in fire');
  });
  test('a compound is kept in the other direction too', () => {
    expect(cut('a dragon-blooded knight', 'dragon')).toBe('a dragon-blooded knight');
  });
  test('the 10-22 pin holds: "archlich" is not cut to "arch"', () => {
    expect(cut('an archlich enthroned on a sun of bone', 'Lich')).toBe('an archlich enthroned on a sun of bone');
  });
  test('and a real standalone body is still cut', () => {
    expect(cut('Dire Wolf with a frost-rimed hide', 'Dire Wolf')).toBe('with a frost-rimed hide');
  });
});

describe('forty #3 — a failed clause answer is recorded, not just counted', () => {
  const handed = ['drags fishermen under'];
  test('a near-miss keeps the rejected value so the next run can tell it from silence', () => {
    const p = parseIdeas(JSON.stringify({ action: idea({ clause: 'drags people under the water' }) }), handed);
    expect(p.action.clause).toBeNull();
    expect(p.action.clauseRaw).toBe('drags people under the water');
  });
  test('an absent field records null — which is non-compliance, and is reported not patched', () => {
    const p = parseIdeas(JSON.stringify({ action: idea() }), handed);
    expect(p.action.clause).toBeNull();
    expect(p.action.clauseRaw).toBeNull();
  });
  test('a match carries no raw value — there is nothing to explain', () => {
    expect(parseIdeas(JSON.stringify({ action: idea({ clause: 'drags fishermen under' }) }), handed).action.clauseRaw).toBeUndefined();
  });
});
