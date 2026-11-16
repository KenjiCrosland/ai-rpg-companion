// ONE WEAPON TABLE (owner, 2026-10-15: "if we can ask llms specific questions to
// populate metadata, that's the route we usually want to go unless the options to
// choose from are too numerous and it dilutes the prompt").
//
// The split these pins hold: the TABLE holds facts (a shortsword is finesse
// Piercing with reach 5 and no range) because nobody is choosing between them;
// the CALL holds the judgement ("which weapon is a Hurlaxe?") because it is the
// one that coined the name. `weaponFor` is the fallback for when the call says
// nothing, not the decider.
import { WEAPONS, weaponFor, weaponNamed, weaponProp, namesWeapon, namesMelee, weaponNouns, weaponsIn, finesseLike } from '../weapons.mjs';
import { LACKS_STOP } from '../generate.mjs'; // the receipt extractor's stop list (stage 2 item 2)
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
import { groundedClauses, nameClaimSatisfied, elementFused } from '../generate.mjs';

describe('lacks: one direct question, and the engine checks the receipt', () => {
  const run = (text, clauses, lacks) => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let out; try { out = groundedClauses(clauses, text, (l, d) => lines.push(`${l} ${d}`), lacks); } finally { console.log = orig; }
    return { out, trace: lines.join('\n') };
  };
  const polarityOf = (out, needle) => out.find((c) => c.text.includes(needle))?.polarity;

  test('an ability lack — the miss that ended the per-clause label', () => {
    // measured at a 40% miss rate when the call had to tag every clause
    // has|lacks, and randomly: the same sentence answered both ways on two
    // rolls. One list, quoting the GM's words, replaced it (2026-10-16).
    const { out, trace } = run('a templar priest with a mace and no magic at all', [
      { text: 'a templar priest with a mace', kind: 'mechanical' }, { text: 'no magic at all', kind: 'descriptive' },
    ], ['no magic at all']);
    expect(polarityOf(out, 'no magic')).toBe('lacks');
    expect(polarityOf(out, 'mace')).toBeUndefined();
    expect(trace).toMatch(/lacks asked: "no magic at all"/);
  });

  test('a body lack with no negative word in it', () => {
    const { out } = run('an eyeless hunter that tracks prey by scent alone', [
      { text: 'an eyeless hunter', kind: 'mechanical' }, { text: 'tracks prey by scent alone', kind: 'mechanical' },
    ], ['eyeless']);
    expect(polarityOf(out, 'eyeless')).toBe('lacks');
    expect(polarityOf(out, 'scent')).toBeUndefined(); // the ability the GM asked for survives
  });

  test('two lacks, one body and one gear, land on their own clauses', () => {
    const { out } = run('a born-mute bodyguard who carries no weapons at all', [
      { text: 'a born-mute bodyguard', kind: 'descriptive' }, { text: 'carries no weapons at all', kind: 'descriptive' },
    ], ['born mute', 'carries no weapons at all']);
    expect(polarityOf(out, 'born-mute')).toBe('lacks');
    expect(polarityOf(out, 'no weapons')).toBe('lacks');
  });

  test('a negative WORD in a positive clause is not a lack', () => {
    const { out, trace } = run('a watcher that has not one but three eyes', [{ text: 'has not one but three eyes', kind: 'mechanical' }], []);
    expect(out.every((c) => c.polarity !== 'lacks')).toBe(true);
    expect(trace).toMatch(/lacks not claimed/); // the words disagree, and that is on the record
  });

  test('RECEIPT ONE: an absence the GM never typed is refused', () => {
    const { out, trace } = run('a knight with a sword', [{ text: 'a knight with a sword', kind: 'mechanical' }], ['its honour', 'its mercy']);
    expect(out.every((c) => c.polarity !== 'lacks')).toBe(true);
    expect(trace).toMatch(/lacks refused: "its honour" quotes nothing the user typed/);
  });

  test("RECEIPT TWO: the GM's own words that take nothing away are refused", () => {
    // the first live run of this design caught 10 of 10 lacks and then listed
    // "tracks prey by scent alone" as one. It IS the GM's words, so provenance
    // passed — and the ability the GM asked for would have been deleted, which
    // is the exact harm the retired design did on 2026-10-15.
    const { out, trace } = run('an eyeless hunter that tracks prey by scent alone', [
      { text: 'an eyeless hunter', kind: 'mechanical' }, { text: 'tracks prey by scent alone', kind: 'mechanical' },
    ], ['eyeless', 'tracks prey by scent alone']);
    expect(polarityOf(out, 'eyeless')).toBe('lacks');
    expect(polarityOf(out, 'scent')).toBeUndefined();
    expect(trace).toMatch(/lacks refused: "tracks prey by scent alone" names no absence/);
  });

  test('each refusal says WHICH receipt failed, not a stock reason', () => {
    const { trace } = run('an eyeless hunter that tracks prey by scent alone', [{ text: 'an eyeless hunter', kind: 'mechanical' }], ['tracks prey by scent alone', 'its mercy']);
    expect(trace).toMatch(/"tracks prey by scent alone" names no absence/);
    expect(trace).toMatch(/"its mercy" quotes nothing the user typed/);
  });

  test('no answer at all: the words still carry it', () => {
    const { out } = run('a wyrm that cannot fly', [{ text: 'cannot fly', kind: 'mechanical' }], undefined);
    expect(polarityOf(out, 'fly')).toBe('lacks'); // NEG_CUE is the fallback, not the decider
  });

  test('the record puts every clause on the trace, lack or not', () => {
    const { trace } = run('a templar priest with a mace and no magic at all', [
      { text: 'a templar priest with a mace', kind: 'mechanical' }, { text: 'no magic at all', kind: 'descriptive' },
    ], ['no magic at all']);
    expect(trace).toMatch(/clauses: .*"no magic at all" -> LACKS/);
  });
});

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

// THE LAST TWO COPIES (consolidation, 2026-10-15). `ANAT_STAMP` and
// `CASTER_WEAPON` each carried 4 commits of churn and each restated a table that
// already existed: all but three of ANAT_STAMP's words were ANATOMY keys, and 8
// of CASTER_WEAPON's 14 were weapons.mjs entries.
import { anatomyIn } from '../header.mjs';

describe('anatomyIn: a body part, never a thing you hold', () => {
  test('the limb a name carries, longest noun first', () => {
    expect(anatomyIn('Crushing Tail')).toBe('tail');
    expect(anatomyIn('Barbed Stingers')).toBe('stingers');
    expect(anatomyIn('Hooked Talons')).toBe('talons');
    expect(anatomyIn('Bite')).toBe('bite');
  });

  test('a weapon noun is not a limb — the weapon table draws the line', () => {
    // ANATOMY holds weapon nouns too, because they TYPE a row; nobody grows a
    // Staff, so the caller asking for a limb must not be handed one.
    for (const n of ['Staff', 'Mace', 'Greatsword', 'Barbed Lance']) expect(anatomyIn(n)).toBeNull();
  });

  test('the three nouns the regex knew and the table did not', () => {
    for (const w of ['stingers', 'pincer', 'pincers']) expect(ANATOMY[w]).toBeTruthy();
  });

  test('a name with neither carries nothing', () => {
    for (const n of ['Dreadful Glare', 'Thunder Wall', '']) expect(anatomyIn(n)).toBeNull();
  });
});

describe("a caster's weapon comes from the table's own columns", () => {
  // the question is "what can it hold in one hand and still cast" — melee, not
  // heavy, not a launcher. That reproduces every real weapon the old list had.
  const casterOk = (k) => { const q = WEAPONS[k]; return !!(q?.reach && !q.heavy && !q.launcher); };

  test("every weapon the old CASTER_WEAPON list named still qualifies", () => {
    for (const w of ['staff', 'quarterstaff', 'dagger', 'scimitar', 'club', 'mace', 'spear', 'sickle']) {
      expect(casterOk(w)).toBe(true);
    }
  });

  test('and the two-handed and the shot are refused', () => {
    for (const w of ['greatsword', 'greataxe', 'maul', 'pike', 'halberd', 'longbow', 'heavy crossbow']) {
      expect(casterOk(w)).toBe(false);
    }
  });

  test('the GM naming one picks it out of the concept', () => {
    expect(weaponsIn('a court wizard with a gnarled staff').find(casterOk)).toBe('staff');
    expect(weaponsIn('an archmage who carries a dagger').find(casterOk)).toBe('dagger');
    expect(weaponsIn('a storm titan with a greataxe').find(casterOk)).toBeUndefined(); // nothing a caster holds
  });
});

describe('RECEIPT THREE: a lack is a phrase, not a sentence', () => {
  const run = (text, clauses, lacks) => {
    const lines = []; const orig = console.log; console.log = (...a) => { lines.push(a.join(' ')); };
    let out; try { out = groundedClauses(clauses, text, (l, d) => lines.push(`${l} ${d}`), lacks); } finally { console.log = orig; }
    return { out, trace: lines.join('\n') };
  };

  test("the live garble: eleven words that quote the GM and contain 'no'", () => {
    // canaries 2026-10-16: the call answered "no breath weapon that is a rolling
    // wall of thunder is permanently silenced" for a storm dragon. It passed both
    // earlier receipts — it quotes the GM AND names an absence — then matched the
    // only clause and marked the dragon's own breath weapon absent, which
    // `lack-honored` then correctly failed.
    const text = 'an adult storm dragon whose breath is a rolling wall of thunder';
    const { out, trace } = run(text, [{ text, kind: 'mechanical' }], ['no breath weapon that is a rolling wall of thunder is permanently silenced']);
    expect(out.every((c) => c.polarity !== 'lacks')).toBe(true);
    expect(trace).toMatch(/is a sentence, not a phrase/);
  });

  test('and every real answer measured so far still passes', () => {
    for (const [text, lacks] of [
      ['a templar priest with a mace and no magic at all', ['no magic at all']],
      ['an eyeless hunter that tracks prey by scent alone', ['eyeless']],
      ['a wyvern that lost its wings in the fall', ['lost its wings']],
      ['a born-mute bodyguard who carries no weapons at all', ['born-mute', 'carries no weapons at all']],
    ]) {
      const { trace } = run(text, [{ text, kind: 'mechanical' }], lacks);
      expect(trace).toMatch(/lacks asked: "/);
      expect(trace).not.toMatch(/lacks refused/);
    }
  });
});

// THE FINESSE EQUIVALENT (critic's hold 7, 2026-10-16). The Shadow-Veil Shinobi
// rolled +6 off DEX 16 on a longsword — the alias table answers "blade" with a
// Strength weapon — and the derivation gate failed the sheet. The ranking is
// print's: across SRD 5.2's creatures with DEX above STR, the finesse melee rows
// are Shortsword 4, Scimitar 4, Dagger 3, Rapier 2, Sickle 0, Whip 0.
describe('finesseLike: the finesse weapon print would have armed it with', () => {
  test('the damage type is kept, and print names the weapon', () => {
    expect(finesseLike('longsword')).toBe('scimitar');   // Slashing reach 5 — not the sickle that table order first answered
    expect(finesseLike('greatsword')).toBe('scimitar');
    expect(finesseLike('spear')).toBe('shortsword');     // Piercing reach 5
    expect(finesseLike('pike')).toBe('shortsword');
  });
  test('reach is kept where the rules offer it', () => {
    expect(finesseLike('glaive')).toBe('whip');          // the only finesse Slashing weapon at reach 10
  });
  test('already finesse, a launcher, and Bludgeoning are left alone', () => {
    expect(finesseLike('shortsword')).toBe(null);
    expect(finesseLike('dagger')).toBe(null);
    expect(finesseLike('rapier')).toBe(null);
    expect(finesseLike('longbow')).toBe(null);
    // 5e has no finesse Bludgeoning weapon, so nothing is invented and the
    // derivation gate reports the array instead of a swap being made up
    expect(finesseLike('mace')).toBe(null);
    expect(finesseLike('warhammer')).toBe(null);
    expect(finesseLike('club')).toBe(null);
  });
});

// STAGE 1, THE REMAINING SHIP BLOCKERS (owner's fix order, 2026-10-16; categories
// confirmed before writing). These assert the data each fix produces, not prose.
describe('stage 1: capped values, long riders, re-slots and the inline validator', () => {
  // (2) DATA INTEGRITY — the Dirge Swarm, canaries-2026-10-16T09-26-32: a 1/Day
  // row dropped any target with 75 HP or fewer to 0, beside a nova-capped damage
  // branch of 67, so the kill branch was strictly better than the damage and a
  // full-HP caster died at CR 13. Print gates its executes on a condition the
  // target is ALREADY in (Sea Hag/Death Glare: "one Frightened creature").
  test('an execute takes a Bloodied target, and its threshold never exceeds its own damage', async () => {
    const { TEMPLATES } = await import('../templates.mjs');
    const ex = TEMPLATES.find((t) => t.id === 'execute');
    for (const [band, frame] of Object.entries(ex.frames)) {
      if (band === '0-2') { expect(frame).toMatch(/one Frightened creature/); continue; } // print's own Sea Hag wording
      // the 3-5 frame is print's INCUBUS exactly — ≤20 HP to Unconscious, not to
      // 0 — so it needs no prerequisite: it downs nobody.
      if (/Unconscious condition/.test(frame)) { expect(frame).not.toMatch(/drops to 0 Hit Points|it dies/); continue; }
      expect(frame).toMatch(/one Bloodied creature/);
    }
    // print's own ceiling: the Solar at CR 21 executes at 100 HP, and no frame may ask for more
    for (const frame of Object.values(ex.frames)) {
      const t = /has (\d+) Hit Points or fewer/.exec(frame); if (!t) continue;
      expect(Number(t[1])).toBeLessThanOrEqual(100);
    }
  });

  // (3) DATA INTEGRITY — the Plaguecarrion Mote, branch-nova-2026-10-16T09-17-50:
  // three Talon attacks each offered a fresh save against Poisoned-with-no-healing
  // until a Long Rest. PRINT DOES NOT USE the once-per-turn gate (0 of 329 SRD 5.2
  // rows say "Once on each of its turns"); its answer is immunity on a successful
  // save (Werewolf/Bite: "immune to this werewolf's curse for 24 hours").
  test('a rider that outlasts the turn carries print\'s immunity-on-success clause', async () => {
    const { TEMPLATES } = await import('../templates.mjs');
    const ct = TEMPLATES.find((t) => t.id === 'contagion');
    for (const frame of Object.values(ct.frames)) {
      expect(frame).toMatch(/until the target finishes a Long Rest/);      // it does outlast the turn
      expect(frame).toMatch(/\*Success:\* The target is immune to this creature's contagion for 24 hours\./);
    }
  });

  // (4) ROUTING — the Bone-Labyrinth Reaver, classes-eight-2026-10-16T09-20-14:
  // Labyrinth Thrum was priced out as an action, re-slotted to a bonus action,
  // and became area forced movement every turn. PRINT gates this exact shape
  // (Centaur Trooper/Trampling Charge, Recharge 5-6) while leaving its 51
  // non-area bonus actions ungated, so the gate keys on AREA, not the re-slot.
  test('a re-slotted bonus action is Recharge-gated only when it reaches an area', () => {
    const AREA = /each creature|Emanation|\bCone\b|\bSphere\b|\bCylinder\b|creature of the \w+'s choice within/i;
    expect(AREA.test('*Wisdom Saving Throw*: DC 14, each creature of the reaver\'s choice within 30 feet.')).toBe(true);
    expect(AREA.test('One creature within 5 feet that hit the warden with an attack roll takes 10 (3d6) damage.')).toBe(false);
  });
});

// STAGE 2 ITEM 2 — the `asked` receipt, after the collection runs (2026-10-16).
// Requiring every significant word of the call's quote to be the GM's refused 5
// of 5 real asks, because the call quotes ITS OWN IDEA TEXT rather than the GM's
// description. The engine now extracts the longest verbatim span of the GM's own
// words out of whatever comes back; that span is the receipt. Cases are the five
// live refusals plus the forged quote the hold-1 pin turns on.
describe('stage 2 item 2: the asked receipt is extracted, not demanded whole', () => {
  const vet = (asked, src) => {
    const norm = (t) => String(t ?? '').toLowerCase().replace(/[^a-z' ]+/g, ' ').replace(/\s+/g, ' ').trim();
    const hay = ` ${norm(src)} `; const ws = norm(asked).split(' ').filter(Boolean);
    let best = '';
    for (let i = 0; i < ws.length; i += 1) for (let j = ws.length; j > i; j -= 1) {
      const span = ws.slice(i, j).join(' ');
      if (span.length <= best.length) break;
      if (!hay.includes(` ${span} `)) continue;
      const sig = span.split(' ').filter((w) => w.length > 2 && !LACKS_STOP.has(w));
      if (sig.length >= 2 || (sig.length === 1 && sig[0].length >= 6)) best = span;
      break;
    }
    return best;
  };
  const cauldron = "a bog witch's iron cauldron that vents scalding steam over whatever climbs in";
  test('the GM\'s own span is found inside the call\'s own prose', () => {
    expect(vet('vomit a roaring fan of scalding steam in a broad cone ahead of it', cauldron)).toBe('scalding steam');
    expect(vet('vents scalding steam', cauldron)).toBe('vents scalding steam');
  });
  test('a quote with none of the GM\'s words is still refused', () => {
    expect(vet('yanks it taut, snagging flesh or cloth', 'a tiefling rogue who stalks the rooftops of the old quarter')).toBe('');
    expect(vet('The blast scours a wide ring around it', 'a reliquary golem that cracks open when wounded and floods the vault with holy fire')).toBe('');
  });
  test('one shared word is not a receipt — the forged quote stays refused', () => {
    expect(vet('hurls molten iron', cauldron)).toBe('');                       // shares only "iron"
    expect(vet('The flies bite and burrow with necrotic rot', 'a corpse-carrier that bursts in a cloud of flies when it dies')).toBe('');
  });
});

// THE CRITIC'S HOLDS ON THE STAGE 1/2 PACKAGE (2026-10-16). Each was found in a
// shipped sheet; each fix is print-backed or closes a receipt the GM never gave.
describe('critic holds, stages 1-2 package', () => {
  // HOLD 2 — the negation word was satisfying the quote-the-GM receipt. Every
  // lack phrase contains one, so any concept with a "not" in it passed anything:
  // "does not flee" matched a gravecrawler that "will NOT let go" and flipped
  // the GM's own grip into an absence.
  test('a lack must quote a CONTENT word the GM typed, not just a negation', async () => {
    const { groundedClauses } = await import('../generate.mjs');
    const ask = (concept, lacks) => {
      const out = groundedClauses([{ text: concept, kind: 'mechanical' }], concept, () => {}, lacks);
      return out.some((c) => c.polarity === 'lacks');
    };
    const crawler = 'a gravecrawler that drags the living into its pit and will not let go';
    expect(ask(crawler, ['does not flee'])).toBe(false);                      // "not" is the only shared word
    expect(ask('a templar who guards a standing stone and never yields ground', ['never lets a single enemy pass'])).toBe(false);
    // the real lacks still land
    expect(ask('an eyeless hunter that tracks prey by scent alone', ['eyeless'])).toBe(true);
    expect(ask('a templar priest with a mace and no magic at all', ['no magic at all'])).toBe(true);
  });

  // HOLD 3 — "whose" was missing from a relative-pronoun list that already held
  // that/which/who, so the part extractor walked back through it.
  test('the named-part extractor stops at a relative pronoun', async () => {
    const { partRows } = await import('../generate.mjs');
    const rows = partRows([{ text: 'a plague-rat swarmlord whose bite rots the wound', kind: 'mechanical' }], { cap: 4 });
    for (const r of rows) expect(r.name).not.toMatch(/whose/i);
    expect(rows.map((r) => r.name)).toContain('Bite');
  });

  // HOLD 4 — a withheld energy fell back to the body's physical type and ignored
  // the weapon the call had declared: Sister Aurelia's Censer is a flail and
  // shipped Piercing.
  test('a declared weapon\'s own damage type outranks the body default', () => {
    expect(WEAPONS.flail.type).toBe('Bludgeoning');
    expect(WEAPONS.mace.type).toBe('Bludgeoning');
    expect(WEAPONS.longsword.type).toBe('Slashing');
  });
});
