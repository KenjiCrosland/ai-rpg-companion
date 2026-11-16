// "SLOW" IS A SPEED, NOT A MOOD (the critic's fifth GM forty, 2026-11-09: "slow -> Speed 40",
// inverted on 2 of 3 rolls and never once 20).
//
// The extraction filed "slow" as DESCRIPTIVE — flavour — so it produced nothing and the creature
// kept the chassis's speed. Two cuts failed before this one, and both are worth remembering:
//   1. The prompt gained an example teaching that a speed adjective is a HEADER clause. Live, the
//      call still answered descriptive and the Speed line still didn't move.
//   2. The engine gained a pass that applies a header clause's speed. It never ran, because the
//      clause NORMALISER whitelists the fields it copies and `header_speed` was not among them —
//      the call's answer was discarded one step before anything could read it.
// So the field has to survive normalisation, and answering a Speed in feet is itself the act of
// filing the clause as a header: the specific answer outranks the coarse one.
//
// HOW FAST "SLOW" IS stays a judgement, and judgements are call fields (CLAUDE.md). The engine
// only applies the number it was given, bounded so a bad answer cannot make a creature that does
// not move or one that outruns a dragon.

const normalise = (c) => ({
  text: String(c.text ?? '').trim(),
  kind: Number.isFinite(Number(c.header_speed)) && Number(c.header_speed) > 0 ? 'header'
    : (/^(?:header|descriptive|mechanical)$/.test(c.kind) ? c.kind : null),
  header_speed: Number.isFinite(Number(c.header_speed)) && Number(c.header_speed) > 0 ? Number(c.header_speed) : null,
});
const apply = (speed, clauses) => {
  const sc = clauses.find((c) => c.kind === 'header' && Number.isFinite(Number(c.header_speed)) && Number(c.header_speed) > 0);
  if (!sc) return speed;
  const want = Math.max(5, Math.min(60, Math.round(Number(sc.header_speed) / 5) * 5));
  return /^\d+ ft\./.test(speed) && Number(/^(\d+)/.exec(speed)[1]) !== want
    ? speed.replace(/^\d+ ft\./, `${want} ft.`) : speed;
};

describe('a speed the call named survives normalisation', () => {
  test('and files the clause as a header even when the call also said descriptive', () => {
    const c = normalise({ text: 'slow', kind: 'descriptive', header_speed: 20 });
    expect(c.kind).toBe('header');          // the specific answer wins
    expect(c.header_speed).toBe(20);        // and is not dropped
  });

  test('a clause with no speed keeps the kind the call gave it', () => {
    expect(normalise({ text: 'carved as a weeping saint', kind: 'descriptive' }).kind).toBe('descriptive');
    expect(normalise({ text: 'a spitting maw', kind: 'mechanical' }).kind).toBe('mechanical');
    expect(normalise({ text: 'a spitting maw', kind: 'mechanical' }).header_speed).toBeNull();
  });

  test('garbage in the field is ignored rather than trusted', () => {
    for (const bad of ['fast', '', null, 0, -10, {}]) {
      const c = normalise({ text: 'slow', kind: 'descriptive', header_speed: bad });
      expect(c.kind).toBe('descriptive');
      expect(c.header_speed).toBeNull();
    }
  });
});

describe('the engine applies the number and nothing more', () => {
  test('the critic\'s sheet: slow at Speed 40 becomes Speed 20', () => {
    expect(apply('40 ft.', [normalise({ text: 'slow', kind: 'descriptive', header_speed: 20 })])).toBe('20 ft.');
  });

  test('other movement modes keep theirs', () => {
    const out = apply('40 ft., Fly 80 ft., Swim 30 ft.', [normalise({ text: 'slow', header_speed: 20 })]);
    expect(out).toBe('20 ft., Fly 80 ft., Swim 30 ft.');
  });

  test('"fast" raises it, by the same one path', () => {
    expect(apply('30 ft.', [normalise({ text: 'fast', header_speed: 40 })])).toBe('40 ft.');
  });

  test('no speed clause leaves the chassis alone', () => {
    expect(apply('30 ft.', [normalise({ text: 'a cave troll', kind: 'mechanical' })])).toBe('30 ft.');
  });

  test('a wild answer is clamped to print\'s own range, never obeyed', () => {
    expect(apply('30 ft.', [normalise({ text: 'slow', header_speed: 1 })])).toBe('5 ft.');
    expect(apply('30 ft.', [normalise({ text: 'fast', header_speed: 500 })])).toBe('60 ft.');
  });

  test('and it rounds to a 5-foot step, as every print speed is', () => {
    expect(apply('30 ft.', [normalise({ text: 'slow', header_speed: 22 })])).toBe('20 ft.');
  });
});
