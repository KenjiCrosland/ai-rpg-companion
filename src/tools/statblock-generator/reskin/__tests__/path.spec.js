// THE PATH CALL AND THE DISPATCHER (Five Pipelines brief, step 2). Routing and data
// integrity only — no test here asserts on a prompt string; the call's behaviour is the
// probe set's business (step 3).
import { dispatch, readPath, printNameOf, matcherPath, pathLine, headClause, isPersonBody } from '../path.mjs';

const read = (over = {}, concept = '') => readPath({ assembly: 'homebrew', ...over }, { concept });

describe('ROUTING — the dispatcher picks once, from validated fields', () => {
  test('a whole print name in the Name field with no description is exact, by code, no call', () => {
    for (const n of ['Owlbear', 'owlbear', 'the Owlbear', 'Pit Fiend', 'Druid']) {
      const d = dispatch({ name: n, concept: '' }, null);
      expect(d.path).toBe('exact'); expect(d.by).toBe('code'); expect(d.print_body).toBe(printNameOf(n));
    }
  });
  test('a whole print name typed as the concept alone is exact too', () => {
    expect(dispatch({ name: '', concept: 'a goblin boss' }, null)).toMatchObject({ path: 'exact', by: 'code', print_body: 'Goblin Boss' });
  });
  test('a print name in the Name field beside a description is a twist on it, by code', () => {
    const d = dispatch({ name: 'Dire Wolf', concept: 'with a frost-rimed hide' }, null);
    expect(d).toMatchObject({ path: 'twist', by: 'code', print_body: 'Dire Wolf', relation: 'is' });
  });
  test('an empty form is a blank roll, by code, role or not', () => {
    expect(dispatch({ name: '', concept: '', role: 'brute' }, null).path).toBe('blank');
    expect(dispatch({ name: '', concept: '', role: null }, null).path).toBe('blank');
  });
  test('print_body with relation is → twist; resembles → homebrew and the body never lands', () => {
    const c = 'a troll that grows back unless the blade was silvered';
    expect(dispatch({ concept: c }, read({ print_body: 'Troll', print_body_receipt: 'a troll', relation: 'is' }, c))).toMatchObject({ path: 'twist', print_body: 'Troll' });
    const g = 'a golem of lashed timber that shoulders through walls';
    const d = dispatch({ concept: g }, read({ print_body: 'Clay Golem', print_body_receipt: 'golem', relation: 'resembles' }, g));
    expect(d.path).toBe('homebrew'); expect(d.relation).toBe('resembles');
  });
  test('a class word outranks a PERSON body (NPC block or folk) but not a MONSTER named as itself', () => {
    const k = 'a kuo-toa priest who drags swimmers under the ice';
    expect(dispatch({ concept: k }, read({ assembly: 'class_npc', print_body: 'Priest', print_body_receipt: 'priest', relation: 'is', class: 'cleric', class_receipt: 'priest' }, k))).toMatchObject({ path: 'class_npc', class: 'cleric', print_body: 'Priest' });
    const h = 'a hobgoblin warlord who fights from a shield wall';
    expect(dispatch({ concept: h }, read({ assembly: 'class_npc', print_body: 'Hobgoblin Warrior', print_body_receipt: 'hobgoblin', relation: 'is', class: 'fighter', class_receipt: 'warlord' }, h))).toMatchObject({ path: 'class_npc', class: 'fighter' });
    const j = 'a Huge frost giant jarl who throws boulders';
    expect(dispatch({ concept: j }, read({ assembly: 'twist', print_body: 'Frost Giant', print_body_receipt: 'frost giant', relation: 'is', class: 'fighter', class_receipt: 'jarl' }, j))).toMatchObject({ path: 'twist', print_body: 'Frost Giant' });
  });
  test('a class word with no body is class NPC; a title or name alone is class NPC on the call\'s word', () => {
    const n = 'lizardfolk ninja';
    expect(dispatch({ concept: n }, read({ assembly: 'class_npc', class: 'rogue', class_receipt: 'ninja', species: 'lizardfolk', species_receipt: 'lizardfolk' }, n))).toMatchObject({ path: 'class_npc', class: 'rogue', species: 'lizardfolk' });
    expect(dispatch({ concept: 'Grik' }, read({ assembly: 'class_npc', assembly_receipt: 'Grik' }, 'Grik')).path).toBe('class_npc');
  });
  test('a title on an invented creature is a LEADER signal, not a class: "pumpkin king" is homebrew carrying title king (owner, 2026-10-19); a personal name alone stays class NPC', () => {
    const pk = read({ assembly: 'class_npc', assembly_receipt: 'king', title: 'king' }, 'pumpkin king');
    const d = dispatch({ concept: 'pumpkin king' }, pk);
    expect(d.path).toBe('homebrew'); expect(d.title).toBe('king');
    expect(dispatch({ concept: 'a tyrant of burning brass' }, read({ assembly: 'class_npc', assembly_receipt: 'tyrant', title: 'tyrant' }, 'a tyrant of burning brass')).path).toBe('homebrew');
    expect(dispatch({ name: 'Dame Oriel', concept: '' }, read({ assembly: 'class_npc', assembly_receipt: 'Dame Oriel', title: 'Dame' }, 'Dame Oriel')).path).toBe('class_npc');
    expect(pathLine(d)).toMatch(/title king/);
  });
  test('nothing published and no class is homebrew', () => {
    const a = 'a plague-bearing archon of flies';
    expect(dispatch({ concept: a }, read({ assembly: 'homebrew', assembly_receipt: 'archon of flies' }, a)).path).toBe('homebrew');
  });
  test('a failed call is a FAIL, never a random seat', () => {
    const d = dispatch({ concept: 'a leviathan of the trench' }, null);
    expect(d.path).toBeNull(); expect(d.failed).toBe(true);
    expect(pathLine(d)).toMatch(/^\[path\] FAILED/);
  });
});

describe('DATA INTEGRITY — validators refuse, and name the refusal', () => {
  const c = 'a kuo-toa priest who drags swimmers under the ice';
  test('a print_body not in the corpus is nulled', () => { const r = read({ print_body: 'Kuo-toa Whip', print_body_receipt: 'kuo-toa' }, c); expect(r.print_body).toBeNull(); expect(r.refused.join()).toMatch(/not in the corpus/); });
  test('a variant name the corpus contains as its tail resolves to the printed creature ("Cave Troll" is the Troll); an invented tail does not', () => {
    const c2 = 'a cave troll that speaks only Giant';
    expect(read({ print_body: 'Cave Troll', print_body_receipt: 'cave troll', relation: 'is' }, c2).print_body).toBe('Troll');
    expect(read({ print_body: 'Stone Giant Exile', print_body_receipt: 'stone giant', relation: 'is' }, 'a stone giant exile').print_body).toBe('Stone Giant');
    expect(read({ print_body: 'Hobgoblin Warlord', print_body_receipt: 'hobgoblin' }, 'a hobgoblin warlord').print_body).toBeNull();
  });
  test('a print_body whose receipt is not the GM\'s words is refused with it', () => { const r = read({ print_body: 'Priest', print_body_receipt: 'a cleric of the deep' }, c); expect(r.print_body).toBeNull(); expect(r.refused.join()).toMatch(/not a span/); });
  test('a class outside the eight is nulled', () => { const r = read({ class: 'warlock', class_receipt: 'priest' }, c); expect(r.class).toBeNull(); expect(r.refused.join()).toMatch(/not one of the eight/); });
  test('a class receipt equal to the whole concept is refused; three words or fewer are exempt', () => {
    expect(read({ class: 'cleric', class_receipt: c }, c).class).toBeNull();
    expect(read({ class: 'rogue', class_receipt: 'lizardfolk ninja' }, 'lizardfolk ninja').class).toBe('rogue');
  });
  test('a class receipt outside the head clause is refused', () => {
    const r = read({ class: 'cleric', class_receipt: 'swimmers' }, c); expect(r.class).toBeNull(); expect(r.refused.join()).toMatch(/head clause/);
    expect(headClause(c)).toBe('a kuo-toa priest');
  });
  test('relation is only read beside a body; an unknown relation reads as resembles and is named', () => {
    expect(read({ relation: 'is' }, c).relation).toBeNull();
    const r = read({ print_body: 'Priest', print_body_receipt: 'priest', relation: 'maybe' }, c); expect(r.relation).toBe('resembles'); expect(r.refused.join()).toMatch(/neither is nor resembles/);
  });
  test('a species with no kit, or no receipt, is nulled', () => {
    expect(read({ species: 'kuo-toa', species_receipt: 'kuo-toa' }, c).species).toBeNull();
    expect(read({ species: 'lizardfolk' }, 'lizardfolk ninja').species).toBeNull();
    expect(read({ species: 'lizardfolk', species_receipt: 'lizardfolk' }, 'lizardfolk ninja').species).toBe('lizardfolk');
  });
  test('isPersonBody: NPC blocks and folk are persons; monsters are not', () => {
    expect(isPersonBody('Priest')).toBe(true); expect(isPersonBody('Hobgoblin Warrior')).toBe(true); expect(isPersonBody('Troll')).toBe(false); expect(isPersonBody('Frost Giant')).toBe(false);
  });
});

describe('THE TRACE LINE and the matcher\'s reading', () => {
  test('every decision prints as the brief\'s form', () => {
    expect(pathLine(dispatch({ name: 'Dire Wolf', concept: 'with a frost-rimed hide' }, null))).toMatch(/^\[path\] twist — Dire Wolf \(is\) — ".*" \(code\)$/);
    expect(pathLine(dispatch({ name: '', concept: '' }, null))).toMatch(/^\[path\] blank — /);
  });
  test('matcherPath reads the canon matcher\'s booleans in the dispatcher\'s vocabulary', () => {
    expect(matcherPath(null)).toEqual({ path: 'homebrew', print_body: null });
    expect(matcherPath({ exact: true, name: 'Owlbear' })).toEqual({ path: 'exact', print_body: 'Owlbear' });
    expect(matcherPath({ exact: false, borrowOnly: true, name: 'Troll' })).toEqual({ path: 'twist', print_body: 'Troll' });
  });
});
