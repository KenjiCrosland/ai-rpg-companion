/**
 * A KIT THAT STOOD DOWN BECAUSE THE SHEET ALREADY ANSWERS IT IS NOT A MISS.
 *
 * `kit-lands` fails a class-NPC sheet carrying no row flagged `kit: <class>`, or no
 * print row named in the kit's SRD lifts. For the FIGHTER that is unsatisfiable:
 * its kit declares four rows and ZERO SRD lifts, so only a kit-flagged row can
 * answer the gate — and on the maul case the kit deliberately added nothing
 * because the sheet already answered it (Great Weapon Master arrived by the
 * FEATURE path). The engine traced exactly that; the gate could not see it.
 *
 * It surfaced by a ROUTE FLIP, not a code change: the same input answered
 * `class=None` on both 2026-10-30 twelves and `class=fighter` on 11-01, and the
 * current checker still reads those older sheets as clean.
 *
 * The fix is the shape every other writer uses this week — the pass records its
 * own verdict and the reader stops inferring one from an absence. The record was
 * already half-built: `scaled.classKit` existed and was never carried to the
 * sheet, the fourth "declared then not carried" of the day.
 */
import { checkBlock } from '@/tools/statblock-generator/reskin/checker.mjs';
import { CLASSES } from '@/tools/statblock-generator/reskin/classes.mjs';
import fs from 'node:fs';

const SHEET = 'smoke-out/twelve-1030-2026-11-01T17-34-33/09-bellbound-warden.json';
const has = fs.existsSync(SHEET);
const load = () => JSON.parse(fs.readFileSync(SHEET, 'utf8'));
const kitFinding = (s) => Object.values(checkBlock(s, {}).gates ?? {})
  .flatMap((g) => g.findings ?? []).find((f) => f.rule === 'kit-lands') ?? null;

describe('the gate was unsatisfiable for the fighter', () => {
  it('because the fighter kit declares no SRD lifts', () => {
    const fighter = CLASSES.find((c) => c.key === 'fighter');
    expect(fighter).toBeTruthy();
    expect((fighter.rows ?? []).length).toBeGreaterThan(0);          // it HAS rows
    expect((fighter.rows ?? []).filter((r) => r.srd)).toHaveLength(0); // and none can be matched by name
  });
});

(has ? describe : describe.skip)('the gate reads the record', () => {
  it('stands down to a soft when the kit stood down because the sheet answers it', () => {
    const s = load();
    s.generation.class_kit = { key: 'fighter', clause: 'temple warden', landed: 0, yielded: 0, stood_down: 'already_answered' };
    const f = kitFinding(s);
    expect(f.severity).toBe('soft');
    expect(f.message).toMatch(/stood down because the sheet already answers it/);
  });

  it('and still FAILS a kit that genuinely landed nothing', () => {
    const s = load();
    s.generation.class_kit = { key: 'fighter', clause: 'temple warden', landed: 0, yielded: 0, stood_down: null };
    expect(kitFinding(s).severity).toBe('fail');
  });

  it('a sheet with no record at all defaults to FAIL, not to silence', () => {
    const s = load();
    delete s.generation.class_kit;
    expect(kitFinding(s).severity).toBe('fail');
  });
});
