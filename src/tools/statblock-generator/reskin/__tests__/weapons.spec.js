// ONE WEAPON TABLE (owner, 2026-10-15: "if we can ask llms specific questions to
// populate metadata, that's the route we usually want to go unless the options to
// choose from are too numerous and it dilutes the prompt").
//
// The split these pins hold: the TABLE holds facts (a shortsword is finesse
// Piercing with reach 5 and no range) because nobody is choosing between them;
// the CALL holds the judgement ("which weapon is a Hurlaxe?") because it is the
// one that coined the name. `weaponFor` is the fallback for when the call says
// nothing, not the decider.
import { WEAPONS, weaponFor, weaponNamed, weaponProp, namesWeapon, namesMelee, weaponNouns, weaponsIn } from '../weapons.mjs';
import { ANATOMY } from '../header.mjs';
import { buildReskinPrompt, generateReskin, renameKeysOf } from '../generate.mjs';
import { pickDonor, scaleDonor } from '../scale.mjs';

describe('the table holds facts, not judgement', () => {
  test('print\'s 2024 weapon table: the numbers a sheet prints', () => {
    expect(WEAPONS.shortsword).toMatchObject({ type: 'Piercing', reach: 5, finesse: true, mastery: 'Vex' });
    expect(WEAPONS.shortsword.range).toBeUndefined();
    expect(WEAPONS.longbow).toMatchObject({ type: 'Piercing', range: '150/600', launcher: true, heavy: true });
    expect(WEAPONS.lance).toMatchObject({ reach: 10, heavy: true, mastery: 'Topple' });
    expect(WEAPONS.handaxe).toMatchObject({ reach: 5, range: '20/60', thrown: true }); // a hybrid: melee AND thrown
  });

  test('a sword is not one weapon: the family never sets the type', () => {
    // the drift this file exists to end (critic, 2026-10-14: a Shortsword dealt
    // Slashing because one copy of the facts only knew the word "sword")
    expect(WEAPONS.shortsword.type).toBe('Piercing');
    expect(WEAPONS.longsword.type).toBe('Slashing');
    expect(WEAPONS.rapier.type).toBe('Piercing');
    expect(ANATOMY.shortsword).toEqual(['melee', 'Piercing', 'type']);
    expect(ANATOMY.longsword).toEqual(['melee', 'Slashing', 'type']);
  });

  test('the anatomy nouns are derived, so they cannot drift from the table', () => {
    for (const n of weaponNouns()) {
      const w = weaponProp(n); const a = ANATOMY[n];
      if (!a || !w || ['javelin', 'lance', 'spear', 'pike'].includes(n)) continue; // the four print tuned by hand
      expect(a[1]).toBe(w.type ?? null);
      expect(a[0]).toBe(w.reach ? 'melee' : 'ranged');
    }
  });
});

describe('weaponFor: the fallback reads the name', () => {
  test.each([
    ['Greatsword', 'greatsword'], ['Hurlaxe', 'handaxe'], ['Fangblade', 'longsword'],
    ['Forceful Staff', 'staff'], ['Stormbow', 'bow'], ['Barbed Lance', 'lance'],
    ['a veteran sellsword with a greatsword', 'greatsword'], ['Shortsword', 'shortsword'],
  ])('%s is a %s', (name, want) => expect(weaponFor(name)).toBe(want));

  test.each([['Thunder-Elk'], ['Shell Spikes'], ['waxes'], ['a rainbow serpent'], ['the cabinet golem'], ['a dire wolf'], ['bayonet charge']])(
    '%s is no weapon', (name) => expect(weaponFor(name)).toBeNull(),
  );
});

describe('the call judges, the engine validates', () => {
  test('a plain-words answer resolves through the table, articles and all', () => {
    expect(weaponNamed('a greatsword')).toBe('greatsword');
    expect(weaponNamed('its barbed trident')).toBe('trident');
    expect(weaponNamed('knife')).toBe('dagger');
    expect(weaponNamed('a greatsword held in both hands')).toBe('greatsword');
  });

  test('"none" is an answer: a body part, a spell, a thing no shop sells', () => {
    for (const a of ['none', 'None', 'no', 'n/a', 'nothing', 'unarmed', 'natural', '']) expect(weaponNamed(a)).toBeNull();
  });

  test('the call never invents a weapon the table does not hold', () => {
    expect(weaponNamed('a soulrender')).toBeNull();
    expect(weaponNamed('chain lightning')).toBeNull();
  });

  test('the prompt asks the question on the call that names the rows', () => {
    const p = buildReskinPrompt(scaleDonor(pickDonor(5, null, 'brute'), 5, { mechanics: [] }), { concept: 'a sellsword with a greatsword' });
    expect(p).toMatch(/WHICH WEAPON IS IT\?/);
    expect(p).toMatch(/"weapons"/);
  });
});

describe('weaponsIn: which weapons the GM asked for', () => {
  test('a GM asks for two, and a job title is not a weapon', () => {
    expect(weaponsIn('a sellsword who hurls a handaxe and closes with a shortsword').sort()).toEqual(['handaxe', 'shortsword']);
    expect(weaponsIn('a swordsman')).toEqual([]); // "sellsword"/"swordsman" is a job; only whole words count
    expect(weaponsIn('a temple guardian with no weapons at all')).toEqual([]);
  });
});

describe('the answer beats the name, and the name carries a missing answer', () => {
  // "Fangblade" is the disagreement that matters: the NAME reads a blade, which
  // the table calls a longsword (Slashing). The CALL that coined it says
  // shortsword (Piercing) — the defect class the critic caught on 2026-10-14.
  const mk = (cr, style, arch) => { const scaled = scaleDonor(pickDonor(cr, style, arch), cr, { mechanics: [] }); const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = i === 0 ? 'Fangblade' : `Named Row${i}`; }); return { scaled, renames }; };
  const run = async (weapons) => {
    const { scaled, renames } = mk(5, null, 'brute');
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const answer = JSON.stringify({ name: 'Fangward', type: 'Humanoid', size: 'Medium', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Slashing'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', ...(weapons ? { weapons } : {}) });
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    try { await generateReskin({ cr: 5, concept: 'a sellsword with a fanged blade', mechanics: [], archetype: 'brute' }, async () => answer); } finally { console.log = orig; }
    return lines;
  };

  test('the call\'s own answer decides, and the engine says whose answer it took', async () => {
    const t = (await run({ Fangblade: 'a shortsword' })).join('\n');
    expect(t).toMatch(/"Fangblade" is a shortsword — the call's own answer \(the name alone read longsword\)/);
  });

  test('a launcher on a row with no range is refused: the row\'s shape beats the name', async () => {
    // branch-weapons 03, 2026-10-15: the call named a melee row "Crossbow Butt".
    // Taking its name's reading would hand a bludgeoning butt-strike a bow's
    // mastery and a bow's range.
    const { scaled, renames } = (() => { const s = scaleDonor(pickDonor(5, null, 'brute'), 5, { mechanics: [] }); const r = {}; renameKeysOf(s).forEach((k, i) => { r[k] = i === 0 ? 'Crossbow Butt' : `Named Row${i}`; }); return { scaled: s, renames: r }; })();
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const answer = JSON.stringify({ name: 'Buttstroke', type: 'Humanoid', size: 'Medium', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none' });
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let m; try { m = await generateReskin({ cr: 5, concept: 'a soldier who clubs with a crossbow stock', mechanics: [], archetype: 'brute' }, async () => answer); } finally { console.log = orig; }
    const row = Object.values(m.sections).flat().find((e) => /Crossbow Butt/.test(e.name ?? ''));
    if (row && !/range \d/.test(row.text ?? '')) {
      expect(row.weapon).toBeUndefined();
      expect(lines.join('\n')).toMatch(/weapon refused: "Crossbow Butt" reads crossbow, but the row has no range/);
    }
  });

  test('no answer is not a failure: the name still reads', async () => {
    const t = (await run(null)).join('\n');
    expect(t).not.toMatch(/weapon declared/); // nothing to validate, so nothing claimed
  });
});

// ---------------------------------------------------------------------------
// POLARITY, folded into the clause object the call already returns (audit,
// 2026-10-15). Same split as the weapon field: the call judges whether the GM
// is taking something away, the engine validates and keeps the regex as the
// fallback. NEG_CUE reads the GRAMMAR of negation and misread 13 of 17
// realistic phrasings; an adjective ("eyeless") and a verb ("lost its wings")
// are how English usually says lacks.
import { groundedClauses } from '../generate.mjs';

describe('polarity: the call judges, the regex falls back', () => {
  const run = (text, clauses) => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let out; try { out = groundedClauses(clauses, text, (l, d) => lines.push(`${l} ${d}`)); } finally { console.log = orig; }
    return { out, trace: lines.join('\n') };
  };

  test('an adjective lack the regex cannot see: the call carries it', () => {
    const { out, trace } = run('an eyeless hunter that tracks by scent', [
      { text: 'eyeless', kind: 'mechanical', polarity: 'lacks' },
      { text: 'tracks by scent', kind: 'mechanical', polarity: 'has' },
    ]);
    expect(out.find((c) => /eyeless/.test(c.text))?.polarity).toBe('lacks');
    expect(trace).toMatch(/polarity declared: "an eyeless hunter" lacks — the call's own reading \(the words alone read has\)/);
    expect((trace.match(/polarity declared/g) ?? []).length).toBe(1); // one receipt per clause, not one per consumer
    expect(out.find((c) => /scent/.test(c.text))?.polarity).toBeUndefined(); // a has carries no polarity key
  });

  test('a negative WORD in a positive clause: the call overrules the regex', () => {
    const { out, trace } = run('a watcher that has not one but three eyes', [
      { text: 'has not one but three eyes', kind: 'mechanical', polarity: 'has' },
    ]);
    expect(out.every((c) => c.polarity !== 'lacks')).toBe(true);
    expect(trace).toMatch(/polarity declared: .* has — the call's own reading \(the words alone read lacks\)/);
  });

  test('no answer is not a failure: the words still read', () => {
    const { out, trace } = run('a wyrm that cannot fly', [{ text: 'cannot fly', kind: 'mechanical' }]);
    expect(out.find((c) => /fly/.test(c.text))?.polarity).toBe('lacks'); // NEG_CUE still carries it
    expect(trace).not.toMatch(/polarity declared/);
  });

  test('a junk answer is refused: the words read instead', () => {
    const { out } = run('a wyrm that cannot fly', [{ text: 'cannot fly', kind: 'mechanical', polarity: 'maybe' }]);
    expect(out.find((c) => /fly/.test(c.text))?.polarity).toBe('lacks');
  });

  test('a lack with no receipt is refused — the live failure that deleted a GM ability', () => {
    // branch-polarity 01, 2026-10-15: the call marked BOTH clauses of "an
    // eyeless hunter that tracks prey by scent alone" as lacks, and the engine
    // deleted the GM's own Scent-Stalk. The lack is kept, the smear is refused.
    const { out, trace } = run('an eyeless hunter that tracks prey by scent alone', [
      { text: 'an eyeless hunter', kind: 'mechanical', polarity: 'lacks' },
      { text: 'tracks prey by scent alone', kind: 'mechanical', polarity: 'lacks' },
    ]);
    expect(out.find((c) => /eyeless/.test(c.text))?.polarity).toBe('lacks'); // -less is a receipt
    expect(out.find((c) => /scent/.test(c.text))?.polarity).toBeUndefined(); // nothing in it takes anything away
    expect(trace).toMatch(/polarity refused: "tracks prey by scent alone" was called lacks, but nothing in it takes anything away/);
  });

  test('the receipt accepts how English actually says lacks', () => {
    for (const [text, want] of [['sightless', 'lacks'], ['a born-mute bodyguard', 'lacks'], ['lost its wings in the fall', 'lacks'], ['bereft of legs', 'lacks'], ['its eyes are hollow', 'lacks'], ['now hunts on foot', undefined], ['a wyvern', undefined]]) {
      const { out } = run(`a creature, ${text}`, [{ text, kind: 'mechanical', polarity: 'lacks' }]);
      expect(out.find((c) => c.text.includes(text.replace(/^a /, '')))?.polarity).toBe(want);
    }
  });

  test('the prompt asks for it on the clause object, not in a pass of its own', () => {
    const prompt = buildReskinPrompt(scaleDonor(pickDonor(5, null, 'brute'), 5, { mechanics: [] }), { concept: 'a blind ogre', userTyped: 'a blind ogre' });
    expect(prompt).toMatch(/"polarity": "has\|lacks"/);
    expect(prompt).toMatch(/POLARITY is per clause, and MOST CLAUSES ARE "has"/);
    expect(prompt).toMatch(/Do NOT spread one clause's lack over its neighbours/);
    expect((prompt.match(/"clauses"/g) ?? []).length).toBe(1); // one key on one existing call
  });
});

// ---------------------------------------------------------------------------
// NAME_ELEMENT, ranked-list item 1 (audit, 2026-10-15). SPECTRAL_COMPOUNDS was
// the fastest-growing exception list in the engine — six patches, one per newly
// coined folklore compound, over a space a model can coin from forever.
//
// The measurement that reframed the fix: a CLOSED compound already claims
// nothing, because the word boundary blocks a match inside it. All six patches
// were adding HYPHEN spellings, where a regex reads a boundary and morphology
// says fusion. So the deterministic half is a question about FORM (is the
// element word fused, or standing alone?) and the judgement half — which fused
// compounds are imagery — belongs to the call that coined the name.
import { nameClaimSatisfied, elementFused } from '../generate.mjs';

describe('name_element: the call reads its own name, the engine checks the form', () => {
  test('the boundary already handles closed compounds — the list never needed them', () => {
    for (const n of ['Witchfire Lash', 'Foxfire Veil', 'Balefire Brand', 'Soulfire Brand', 'Moonfire Arc', 'Hexfire Bolt', 'Spiritfire Wail']) {
      expect(nameClaimSatisfied(n, ['Cold'])).toBe(true); // no claim to pay
    }
  });

  test('a hyphen is where the regex and morphology disagree', () => {
    expect(elementFused('Witch-Fire Lash')).toBe(true);
    expect(elementFused('Flame Lash')).toBe(false);
    expect(elementFused('Radiant Flame')).toBe(false);
  });

  test('a coined compound the list has never seen: the call carries it', () => {
    // the 7th patch that now never has to be written
    expect(nameClaimSatisfied('Grave-Fire Touch', ['Necrotic'])).toBe(false); // the regex alone fails it
    expect(nameClaimSatisfied('Grave-Fire Touch', ['Necrotic'], 'imagery')).toBe(true); // the call's own reading
  });

  test('a bare element word called imagery is refused — the gate is not dodgeable', () => {
    expect(nameClaimSatisfied('Flame Lash', ['Cold'], 'imagery')).toBe(false);
    expect(nameClaimSatisfied('Radiant Flame', ['Cold'], 'imagery')).toBe(false);
  });

  test('literal still has to be paid, and an unpaid claim still fails', () => {
    expect(nameClaimSatisfied('Burning Brand', ['Cold'], 'literal')).toBe(false);
    expect(nameClaimSatisfied('Burning Brand', ['Fire'], 'literal')).toBe(true);
    expect(nameClaimSatisfied('Witch-Fire Lash', ['Cold'], 'literal')).toBe(false); // called literal, so it owes Fire
  });

  test('no answer is not a failure: the list still carries the ones it knows', () => {
    expect(nameClaimSatisfied('Witch-Fire Lash', ['Cold'])).toBe(true); // SPECTRAL_COMPOUNDS, now the fallback
    expect(nameClaimSatisfied('Flame Lash', ['Cold'])).toBe(false);
  });

  test('the question rides the call that already declares the damage', () => {
    const prompt = buildReskinPrompt(scaleDonor(pickDonor(5, null, 'brute'), 5, { mechanics: [] }), { concept: 'a witch-fire haunt' });
    expect(prompt).toMatch(/"name_element"/);
    expect(prompt).toMatch(/Say "imagery" ONLY where the element word is half of a compound word/);
    expect(prompt.indexOf('"name_element"')).toBeLessThan(prompt.indexOf('"damage_types"')); // one breath, beside the type it declares
  });
});

describe('name_element: the answer goes on the record', () => {
  test('the whole answer is traced once, so the answer rate stays measurable', async () => {
    const scaled = scaleDonor(pickDonor(5, null, 'brute'), 5, { mechanics: [] });
    const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = i === 0 ? 'Witch-Fire' : `Named Row${i}`; });
    const typed = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}') && !e.rules).map((e) => renames[e.name] ?? e.name);
    const answer = JSON.stringify({ name: 'Drowned Witch', type: 'Undead', size: 'Medium', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames, damage_types: Object.fromEntries(typed.map((n) => [n, 'Cold'])), name_element: { 'Witch-Fire': 'imagery' }, conditions: { condition_minor: 'Prone' }, melee_rider: 'none' });
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    try { await generateReskin({ cr: 5, concept: 'a drowned haunt whose witch-fire touch freezes', mechanics: [], archetype: 'brute' }, async () => answer); } finally { console.log = orig; }
    const t = lines.join('\n');
    expect(t).toMatch(/name_element answered: Witch-Fire = imagery/);
    expect((t.match(/name_element answered/g) ?? []).length).toBe(1); // once per sheet, not once per row
  });
});
