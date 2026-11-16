/**
 * A PRINT NAME IS EXEMPT FROM THE NAME CHECK, NOT FROM THE WARRANT CHECK.
 *
 * The critic asked for this twice (2026-10-28, 2026-10-30) and asked for it as a
 * word rule — "shield rows need a shield in the gear; climb rows need a climb
 * word". That is the thing this file's mechanism exists to replace:
 * `requires_claim`, a RegExp over the concept, was retired on 2026-10-22 for
 * exactly that reason. These are NEEDS_BODY questions instead, judged by the call.
 *
 * What the sweep shipped: Spider Climb on a warlord in lacquered plate and a
 * timber siege golem; Shield Bash on a drake and a scree-wight carrying no
 * shield. Each of those rows arrived from a TEMPLATE with no `expresses` — which
 * is why the menu-side body question reaches them.
 *
 * Measured first, because print overrules the reviewer: print has one Shield Bash
 * (the Gladiator, AC 16 = armor plus shield) and fourteen Spider Climbers, all of
 * them oozes, many-legged monstrosities, lizards, vampires, a roper or a swarm.
 *
 * The call's verdicts can only be exercised in-pipeline; this locks the shape of
 * the declaration and the print facts it was calibrated to.
 */
import printBlocks from '@/data/srd52-monsters.json';
import { NEEDS_BODY } from '@/tools/statblock-generator/reskin/templates.mjs';
import { SHAPES } from '@/tools/statblock-generator/reskin/shapes.mjs';

const rowsNamed = (re) => printBlocks.flatMap((b) => Object.values(b.sections ?? {}).flat()
  .filter((r) => re.test(String(r?.name ?? ''))).map(() => b));

describe('the two stock rows now declare what they need', () => {
  it.each(['spider-climb', 'shield-bash'])('%s has a body question', (id) => {
    expect(typeof NEEDS_BODY[id]).toBe('string');
    expect(NEEDS_BODY[id].length).toBeGreaterThan(60);     // a question, not a token
    expect(SHAPES.some((s) => s.id === id)).toBe(true);     // and a shape to attach to
  });

  it('asks a question, never a pattern — no entry is a regex or a word list', () => {
    for (const [id, q] of Object.entries(NEEDS_BODY)) {
      expect(q).not.toMatch(/[|\\]|\.\*|\[\^/);             // regex metacharacters
      expect(String(q).split(/\s+/).length).toBeGreaterThanOrEqual(5); // prose, not a token list — the tersest is web-walker's "webs it spins or lives in"
      expect(id).toBeTruthy();
    }
  });

  it('does NOT ask for a Climb speed — print grants the climbing in the trait itself', () => {
    expect(NEEDS_BODY['spider-climb']).not.toMatch(/climb speed/i);
    const spawn = printBlocks.find((b) => b.name === 'Vampire Spawn');
    const hasTrait = Object.values(spawn.sections ?? {}).flat().some((r) => /Spider Climb/.test(String(r?.name ?? '')));
    expect(hasTrait).toBe(true);
    expect(String(spawn.speed ?? '')).not.toMatch(/Climb/); // the counterexample, in print
  });
});

describe('the print sample these were calibrated to', () => {
  it('print writes Shield Bash exactly once, on a shield-bearer', () => {
    const hosts = rowsNamed(/^Shield Bash$/);
    expect(hosts.map((b) => b.name)).toEqual(['Gladiator']);
    expect(Number(hosts[0].ac)).toBe(16); // studded leather plus a shield
  });

  it('every print Spider Climber is a clinging body, none armored or rigid', () => {
    const hosts = rowsNamed(/^Spider Climb$/);
    expect(hosts.length).toBeGreaterThanOrEqual(13);
    const kinds = new Set(hosts.map((b) => String(b.type)));
    expect([...kinds].sort()).toEqual(['Aberration', 'Beast', 'Monstrosity', 'Ooze', 'Undead']);
    expect(kinds.has('Construct')).toBe(false);
    expect(kinds.has('Humanoid')).toBe(false);
  });
});
