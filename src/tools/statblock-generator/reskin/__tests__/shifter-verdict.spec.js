/**
 * THE CALL'S VERDICT ON A CUE MUST REACH THE GUARD THAT USES IT.
 *
 * Critic, 2026-11-05: "a hunger that wears the shape of a staircase" drew print's
 * Werewolf — Shape-Shift, "its true humanoid form", and a Bite that curses Humanoids —
 * on 6 of 6 rolls. The concept matched the shifter key `wears the shape`.
 *
 * The key list cannot separate the senses and should not try: it holds BOTH "wears the
 * shape" (one fixed form, a disguise) and "wears other faces" (many forms). The route
 * prompt already asks the call to judge each matched key — "false if it is a figure of
 * speech, a thing it carries or wears" — and `rejectedCues` already recorded the answer.
 * Both shifter guards read `verbHits` RAW, so the verdict was computed and then ignored.
 */
import fs from 'node:fs';
import path from 'node:path';

const SRC = fs.readFileSync(path.join(__dirname, '..', 'route.mjs'), 'utf8');

describe('the shifter line honours the call\'s cue verdict', () => {
  it('both guards read the VETTED hits, not the raw word hits', () => {
    const raw = SRC.match(/!verbHits\(text\)\.some\(\(h\) => h\.id === 'skirmisher-shifter'\)/g) ?? [];
    expect(raw).toHaveLength(0);                       // no guard reads the raw list any more
    const vetted = SRC.match(/!vettedHits\(text\)\.some\(\(h\) => h\.id === 'skirmisher-shifter'\)/g) ?? [];
    expect(vetted).toHaveLength(2);                    // the pick loop AND the rank fallback
  });

  it('and the vetted list is the word hits minus the cues the call rejected', () => {
    expect(SRC).toMatch(/const vettedHits = \(t\) => verbHits\(t\)\.filter\(\(h\) => !rejectedCues\.has\(h\.key\)\)/);
  });

  it('the key list still carries both senses, because separating them is the call\'s job', () => {
    // if these ever diverge the fix is the verdict, never a narrower word list
    expect(SRC).toMatch(/'wears the shape'/);
    expect(SRC).toMatch(/'wears other faces'/);
  });

  it('the rank fallback cannot readmit a line the pick loop vetoed', () => {
    // the hole this closed: the guard above shut the door and rank opened it again
    const i = SRC.indexOf('taken on rank');
    expect(i).toBeGreaterThan(-1);
    const rankRegion = SRC.slice(Math.max(0, i - 2500), i);
    expect(rankRegion).toMatch(/vettedHits\(text\)\.some\(\(h\) => h\.id === 'skirmisher-shifter'\)/);
  });
});
