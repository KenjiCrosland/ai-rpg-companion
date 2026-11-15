/**
 * THE MIND TIERS ON A WHOLE SHEET (item 4, 2026-11-15) — categories 2, 3 and 4.
 *
 * 2  the parse boundary: a missing, malformed or numeric answer yields today's sheet
 * 3  the path decision: only a homebrew sheet differs, and only in the mentals
 * 4  the maths invariant: every attack bonus, save DC, HP and AC is equal with and without
 *    the tiers — including a caster and a sheet whose attacking score is mental
 *
 * The invariant is why `applyMindTiers` holds the named casting ability as well as the striker:
 * the final derivation pass rewrites a Spellcasting row's DC upward when the stat derives a
 * higher one, and a moved stat can also match an attack bonus by accident and pull a DC down.
 * Holding the casting ability keeps the DC out of reach of any tier on any card.
 */
import { generateReskin, renameKeysOf } from '../generate.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';
import { DONORS } from '../donors.mjs';

const mk = (cr, style, arch) => { const scaled = scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [] }); const renames = { Teleport: 'Blink Step', 'Ranged Attack': 'Hurl', 'Hybrid Attack': 'Hybrid Strike' }; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; }); const typed = [...Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name), 'Hurl', 'Hybrid Strike']; return { scaled, renames, typed }; };
const json = (name, type, cr, style, arch, over = {}) => { const { scaled, renames, typed } = mk(cr, style, arch); return JSON.stringify({ name, type, size: 'Medium', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', wildcard: `*Strength Saving Throw*: DC ${scaled.dc}, one creature within 10 feet. *Failure:* The target has the Prone condition.`, ...(over.extra ?? {}) }); };
const gen = (opts, answer) => generateReskin({ mechanics: [], ...opts }, async () => answer);

const TIERS = { INT: 'formidable', WIS: 'formidable', CHA: 'formidable' };
const numbersOf = (m) => ({
  ac: m.ac, hp: m.hp,
  atk: Object.values(m.sections).flat().flatMap((e) => [...String(e.text ?? '').matchAll(/Attack Roll:\*?\s*\+(\d+)/g)].map((x) => x[1])).join(','),
  dc: Object.values(m.sections).flat().flatMap((e) => [...String(e.text ?? '').matchAll(/DC (\d+)/g)].map((x) => x[1])).join(','),
});
const pair = async (base, answer, tiers = TIERS) => [await gen(base, answer), await gen({ ...base, mindTiers: tiers, mind: 'sapient' }, answer)];

describe('the parse boundary (category 2)', () => {
  // the concept must match NO print block, or the sheet is not homebrew and the stamp rightly
  // declines — "a stone bruiser" matches print's Tough, which cost a first version of this test
  const base = { archetype: 'brute', concept: 'a clattering heap of fused scrap', userConcept: 'a clattering heap of fused scrap', cr: 3 };
  test('a missing, malformed or numeric answer yields a sheet identical to today', async () => {
    const answer = json('Scrapheap', 'Construct', 3, null, 'brute');
    const plain = await gen(base, answer);
    for (const bad of [null, undefined, {}, { INT: 14 }, { INT: 'brilliant' }, 'capable']) {
      const other = await gen({ ...base, mindTiers: bad, mind: 'sapient' }, answer);
      expect(other.stats).toEqual(plain.stats);
      expect(numbersOf(other)).toEqual(numbersOf(plain));
    }
  });
});

describe('the path decision (category 3)', () => {
  test('a homebrew sheet differs only in the mentals', async () => {
    const answer = json('Scrapheap', 'Construct', 3, null, 'brute');
    const [a, b] = await pair({ archetype: 'brute', concept: 'a clattering heap of fused scrap', userConcept: 'a clattering heap of fused scrap', cr: 3 }, answer);
    for (const k of ['STR', 'DEX', 'CON']) expect(b.stats[k]).toBe(a.stats[k]);
    expect([b.stats.INT, b.stats.WIS, b.stats.CHA]).not.toEqual([a.stats.INT, a.stats.WIS, a.stats.CHA]);
    expect(b.generation?.mind_tiers).toBeTruthy(); // recorded on the sheet for a reader
  });

  test('an exact print body is identical with and without the tiers', async () => {
    const answer = json('Ogre', 'Giant', 2, null, 'brute');
    const base = { archetype: 'brute', concept: 'Ogre', userConcept: 'Ogre', cr: 2, path: { path: 'exact', print_body: 'Ogre', relation: 'is' } };
    const [a, b] = await pair(base, answer);
    expect(b.stats).toEqual(a.stats);
    expect(numbersOf(b)).toEqual(numbersOf(a));
  });

  test('a twist on a print body is identical with and without the tiers', async () => {
    const answer = json('Thornback', 'Monstrosity', 5, null, 'brute');
    const base = { archetype: 'brute', concept: 'an ankheg but legendary', userConcept: 'an ankheg but legendary', cr: 5, path: { path: 'twist', print_body: 'Ankheg', relation: 'is' } };
    const [a, b] = await pair(base, answer);
    expect(b.stats).toEqual(a.stats);
    expect(numbersOf(b)).toEqual(numbersOf(a));
  });

  test('a class NPC keeps its own mechanism', async () => {
    const answer = json('Dame Oriel', 'Humanoid', 4, null, 'defender');
    const base = { archetype: 'defender', concept: 'a knight', userConcept: 'a knight', cr: 4, path: { path: 'class_npc', print_body: 'Knight', relation: 'is', class: 'fighter' } };
    const [a, b] = await pair(base, answer);
    expect(b.stats).toEqual(a.stats);
    expect(numbersOf(b)).toEqual(numbersOf(a));
  });
});

describe('the maths invariant (category 4) — every donor card', () => {
  // THE SWEEP, not four hand-picked cases. Four formidable pairs passed while 35 rows across
  // the cards sat a point or two further above the card's DC than they do without the tiers
  // (measured 2026-11-15). `scripts/reference-mind-dc-sweep.mjs` is the same check at three
  // CRs per card; this runs each card at its own CR to stay inside a suite's time.
  //
  // THE RULE: with the tiers, no save DC sits further above the card's DC than the same
  // sheet's DC without them. Onto the card's DC, or down, is the better outcome. Attack
  // bonus, Hit Points and Armor Class are identical.
  const CONCEPT = 'a clattering heap of fused scrap'; // matches no print block, so homebrew
  const TIERS = ['feeble', 'ordinary', 'capable', 'formidable'];
  const dcs = (m) => Object.values(m.sections).flat().flatMap((e) => [...String(e.text ?? '').matchAll(/DC (\d+)/g)].map((x) => Number(x[1])));

  test('no row sits further above the card\'s DC, and AC, HP and attack bonuses are equal', async () => {
    const above = []; const other = []; let pairs = 0; let onto = 0;
    for (const d of DONORS) {
      const arch = (d.archetypes ?? [])[0]; if (!arch) continue;
      const base = { archetype: arch, style: d.style ?? null, concept: CONCEPT, userConcept: CONCEPT, cr: d.cr, donorPin: d.id };
      let answer; let plain;
      try { answer = json('Scrapheap', 'Aberration', d.cr, d.style ?? null, arch); plain = await gen(base, answer); } catch { continue; }
      if (plain.generation?.donor !== d.id) continue;
      const card = scaleDonor(d, d.cr, { mechanics: [] }).dc;
      const a = numbersOf(plain); const aDc = dcs(plain);
      for (const t of TIERS) {
        let tiered; try { tiered = await gen({ ...base, mindTiers: { INT: t, WIS: t, CHA: t }, mind: 'sapient' }, answer); } catch { continue; }
        pairs += 1;
        const b = numbersOf(tiered); const bDc = dcs(tiered);
        if (a.ac !== b.ac || a.hp !== b.hp || a.atk !== b.atk) other.push(`${d.id} all ${t}`);
        aDc.forEach((x, i2) => {
          const y = bDc[i2]; if (y === x || y === undefined) return;
          if (y - card > Math.max(0, x - card)) above.push(`${d.id} at CR ${d.cr}, all ${t}: card DC ${card}, without ${x}, with ${y}`);
          else onto += 1;
        });
      }
    }
    expect(pairs).toBeGreaterThan(200); // the sweep actually ran
    expect(other).toEqual([]);
    expect(above).toEqual([]);
    expect(onto).toBeGreaterThan(0); // and rows still move ONTO the card's DC, which is the gain
  }, 600000);

  const CASES = [
    ['a brute on the homebrew path', { archetype: 'brute', concept: 'a clattering heap of fused scrap', userConcept: 'a clattering heap of fused scrap', cr: 3 }, ['Scrapheap', 'Construct', 3, null, 'brute']],
    ['a CASTER, whose DC derives from a mental', { archetype: 'caster', concept: 'a hedge witch who binds with briars', userConcept: 'a hedge witch who binds with briars', cr: 8 }, ['Mother Briar', 'Fey', 8, null, 'caster']],
    ['a lurker at CR 12, past the first CR column', { archetype: 'lurker', concept: 'a thing that waits in the dark', userConcept: 'a thing that waits in the dark', cr: 12 }, ['The Waiting', 'Aberration', 12, null, 'lurker']],
  ];
  test.each(CASES)('%s: every attack bonus, save DC, HP and AC is equal', async (_label, base, j) => {
    const answer = json(...j);
    const [a, b] = await pair(base, answer);
    expect(numbersOf(b)).toEqual(numbersOf(a));
  });

  test('a sheet whose ATTACKING score is mental keeps its attack bonus', async () => {
    const answer = json('Mind Eater', 'Aberration', 8, null, 'caster');
    const base = { archetype: 'caster', concept: 'a mind eater that strikes with thought alone', userConcept: 'a mind eater that strikes with thought alone', cr: 8 };
    const [a, b] = await pair(base, answer);
    expect(numbersOf(b).atk).toEqual(numbersOf(a).atk);
    expect(numbersOf(b).dc).toEqual(numbersOf(a).dc);
  });

  test('every saving throw and skill modifier follows from its final score', async () => {
    const answer = json('Scrapheap', 'Construct', 3, null, 'brute');
    const [, b] = await pair({ archetype: 'brute', concept: 'a clattering heap of fused scrap', userConcept: 'a clattering heap of fused scrap', cr: 3 }, answer);
    const SK = { Athletics: 'STR', Acrobatics: 'DEX', Stealth: 'DEX', Arcana: 'INT', History: 'INT', Investigation: 'INT', Perception: 'WIS', Insight: 'WIS', Survival: 'WIS', Medicine: 'WIS', Deception: 'CHA', Intimidation: 'CHA', Persuasion: 'CHA', Performance: 'CHA' };
    const mod = (k) => Math.floor((b.stats[k] - 10) / 2);
    for (const [, nm, n] of [...String(b.skills ?? '').matchAll(/([A-Za-z][A-Za-z' ]*?)\s*\+(\d+)/g)].map((m) => [0, m[1].trim(), Number(m[2])])) {
      const st = SK[nm]; if (!st) continue;
      // mod + PB, or more where proficiency is doubled; never less than the bare modifier
      expect(n).toBeGreaterThanOrEqual(mod(st));
    }
  });
});
