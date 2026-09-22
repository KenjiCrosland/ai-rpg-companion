import { SHAPES, STYLES, shapesFor, bandFor, BANDS } from '../shapes.mjs';

describe('the shape catalog: one template per band, cited or invented', () => {
  test('every shape has a print citation XOR an invented flag', () => {
    for (const s of SHAPES) {
      expect(`${s.id}: ${Boolean(s.cite) !== Boolean(s.invented) ? 'ok' : 'BAD PROVENANCE'}`).toBe(`${s.id}: ok`);
    }
  });

  test('band coverage: every band inside cr_range has a template; none outside', () => {
    const bandBounds = { '0-2': [0, 2], '3-5': [3, 5], '6-9': [6, 9], '10-12': [10, 12], '13-20': [13, 20], '21+': [21, 30] };
    for (const s of SHAPES) {
      for (const b of BANDS) {
        const [lo, hi] = bandBounds[b];
        const overlaps = s.cr_range[0] <= hi && s.cr_range[1] >= lo;
        expect(`${s.id} ${b}: ${Boolean(s.frames[b]) === overlaps ? 'ok' : overlaps ? 'MISSING BAND' : 'STRAY BAND'}`)
          .toBe(`${s.id} ${b}: ok`);
      }
    }
  });

  test('schema hygiene: known roles/styles, unique ids, every frame carries blanks or rules text', () => {
    const ROLES = ['skirmisher', 'brute', 'defender', 'artillery', 'controller', 'lurker'];
    expect(new Set(SHAPES.map((s) => s.id)).size).toBe(SHAPES.length);
    for (const s of SHAPES) {
      for (const r of s.roles) expect(ROLES).toContain(r);
      for (const st of s.styles) expect(Object.keys(STYLES)).toContain(st);
      for (const f of Object.values(s.frames)) expect(f).toMatch(/\{[a-z_]+\}|Saving Throw|attack|teleports|Speed/i);
    }
  });

  test('the triple filter resolves the band template', () => {
    const ids = (o) => shapesFor(o).map((s) => s.id);
    expect(ids({ role: 'skirmisher', style: 'mounted', cr: 8 })).toContain('trample');
    expect(ids({ role: 'controller', style: 'mounted', cr: 8 })).not.toContain('trample');
    expect(ids({ role: 'skirmisher', style: 'skulker', cr: 1 })).not.toContain('leap');
    expect(ids({ role: 'skirmisher', style: 'skulker', cr: 8, movement: '40 ft., Burrow 30 ft.' })).toContain('burrow-ambush');
    expect(ids({ role: 'skirmisher', style: 'skulker', cr: 8, movement: '40 ft.' })).not.toContain('burrow-ambush');
    expect(ids({ role: 'skirmisher', style: 'mounted', cr: 8 })).toContain('condition-payoff');
    // band resolution: the CR 15 gaze is the Mummy Lord rung, the CR 3 the Mummy's
    const at15 = shapesFor({ role: 'controller', cr: 15 }).find((s) => s.id === 'gaze-single');
    expect(at15.frame).toMatch(/Paralyzed/);
    const at3 = shapesFor({ role: 'controller', cr: 3 }).find((s) => s.id === 'gaze-single');
    expect(at3.frame).toMatch(/Frightened/);
    expect(at3.frame).not.toMatch(/Paralyzed/);
  });

  test('clause growth is real: high bands carry clauses low bands lack', () => {
    const t = SHAPES.find((s) => s.id === 'trample');
    expect(t.frames['21+']).toMatch(/Reactions/);
    expect(t.frames['0-2']).not.toMatch(/Reactions/);
    const e = SHAPES.find((s) => s.id === 'execute');
    expect(e.frames['21+']).toMatch(/it dies/);
    expect(e.frames['0-2']).toMatch(/drops to 0 Hit Points/);
  });

  test('the invention ledger holds', () => {
    expect(SHAPES.filter((s) => s.invented).map((s) => s.id).sort())
      .toEqual(['active-toll', 'bloodied-burst', 'burrow-ambush', 'charge', 'pull-through', 'resonant-body', 'seal', 'throw-recall', 'throw-retrieve']); // bloodied-burst joined 2026-09-21 (the bell hermit's wound-rung peal)
  });
});
