/**
 * ONE MECHANIC, ONE NAME — SPLIT BY WHETHER PRINT HAS THE ROW.
 *
 * Owner's ruling, 2026-10-29, amending his own of 2026-10-27. The 10-27 rule was
 * "unless it's mechanically different it needs the same name", widened to every
 * stock row. The critic's read of the 10-29 forty showed the cost of the widened
 * version: it erased 11 concept-specific names (Drowning Hymn, Siege Shoulder,
 * Smoking Stumps, Bone Sun Brand, Scythe Pin, Mire Curse, War Bellow, Storm
 * Retort, Thorn Seeds, Lance Vendetta, Rime Trail) and replaced them with labels
 * that then collided — Dazzling Burst x3, Sundering Shove x3, Resonant Body x3,
 * Horrid Display x2, Luring Presence x2, Searing Aura x2 with identical text at
 * CR 17 and CR 20.
 *
 * The purpose of the rule was recognition: a GM reads "Pack Tactics" and already
 * knows it. A print name delivers that; an invented one cannot, so broadcasting
 * it buys nothing and costs the concept its words.
 *
 *   print has the row      -> print's name, every time
 *   the engine invented it -> the name the call gave it
 *   the name overpromises  -> converge regardless (the critic's "Warded Charge")
 *   the row is augmented   -> its own name; it is not the stock mechanic any more
 *
 * `PRINT_ROW_NAMES` is read off the 329 blocks, never hand-kept: 402 names.
 */
import { labelFeatureRows, PRINT_ROW_NAMES } from '@/tools/statblock-generator/reskin/generate.mjs';
import { TEMPLATE_BY_ID } from '@/tools/statblock-generator/reskin/templates.mjs';

const nameOf = (id) => TEMPLATE_BY_ID.get(id).name;
const isPrint = (id) => PRINT_ROW_NAMES.has(nameOf(id).toLowerCase());
const run = (rows) => { const s = { Traits: rows }; labelFeatureRows(s); return s.Traits; };
const row = (name, template, over = {}) => ({ name, text: 'x', template, library: true, ...over });

describe('the print-name set is read off print, not maintained by hand', () => {
  it('holds every print row name', () => {
    expect(PRINT_ROW_NAMES.size).toBeGreaterThan(300);
    for (const n of ['bite', 'rend', 'mimicry', 'spider climb', 'pack tactics', 'fear aura', 'swallow', 'trample', 'fire aura', 'aura of authority'])
      expect(PRINT_ROW_NAMES.has(n)).toBe(true);
  });

  it('does not hold the names we invented', () => {
    for (const n of ['dazzling burst', 'sundering shove', 'resonant body', 'horrid display', 'threshold execute', 'bloodied burst', 'searing aura'])
      expect(PRINT_ROW_NAMES.has(n)).toBe(false);
  });
});

describe('a row reproducing a print row takes print\'s name', () => {
  it.each([['Stolen Voices', 'mimicry'], ['Wall-Crawler', 'spider-climb'], ['Formation Fighting', 'pack-tactics']])
    ('"%s" (%s) converges', (given, template) => {
      expect(isPrint(template)).toBe(true);
      expect(run([row(given, template)])[0].name).toBe(nameOf(template));
    });

  it('keeps a gate suffix while renaming', () => {
    expect(run([row('Wall-Crawler (Recharge 5-6)', 'spider-climb')])[0].name).toBe(`${nameOf('spider-climb')} (Recharge 5-6)`);
  });

  it('is a no-op on a row already carrying print\'s name', () => {
    expect(run([row(nameOf('mimicry'), 'mimicry')])[0].name).toBe(nameOf('mimicry'));
  });
});

describe('a row the engine invented keeps the name the call gave it', () => {
  it.each([['Reliquary Lurch', 'relentless-pursuit'], ['Skull-Trail Hunter', 'relentless-pursuit'], ['Killing Wake', 'terrain-walk'], ['Hull Resonance', 'uncanny-sense']])
    ('"%s" (%s) survives', (given, template) => {
      expect(isPrint(template)).toBe(false);
      expect(run([row(given, template)])[0].name).toBe(given);
    });

  it('so two sheets drawing it can read differently — the point of the amendment', () => {
    const [a] = run([row('Drowning Hymn', 'luring-presence')]);
    const [b] = run([row('Chorus of Screams', 'luring-presence')]);
    expect([a.name, b.name]).toEqual(['Drowning Hymn', 'Chorus of Screams']);
  });
});

describe('a name that promises a mechanic its text lacks converges anyway', () => {
  it('"Warded Charge" goes back to the template name — the critic\'s name-mechanic FAIL', () => {
    const r = { name: 'Warded Charge', template: 'relentless-pursuit', library: true, text: 'The vigil targets itself or one creature it can see within 60 feet. The target gains 20 temporary hit points.' };
    expect(isPrint('relentless-pursuit')).toBe(false);
    expect(run([r])[0].name).toBe(nameOf('relentless-pursuit'));
  });
});

describe('an augmented row is not the stock mechanic', () => {
  it('keeps its own name even when the template is print-named', () => {
    const r = row('Crevice Crawler', 'spider-climb', { augmented: { kind: 'squeeze' } });
    expect(isPrint('spider-climb')).toBe(true);
    expect(run([r])[0].name).toBe('Crevice Crawler');
  });

  it('while the same template unaugmented still converges', () => {
    expect(run([row('Crevice Crawler', 'spider-climb')])[0].name).toBe(nameOf('spider-climb'));
  });
});

describe('the exceptions that predate the split', () => {
  it('a kit row keeps its declared name — a paladin\'s smite is Divine Smite', () => {
    expect(run([row('Divine Smite', 'coating', { kit: true })])[0].name).toBe('Divine Smite');
  });

  it('a print row is never touched', () => {
    expect(run([row('Withering Touch', 'coating', { print: true })])[0].name).toBe('Withering Touch');
  });

  it('the three converged on 2026-10-27 stay converged despite invented names', () => {
    for (const id of ['condition-payoff', 'exploiter', 'riposte']) {
      expect(isPrint(id)).toBe(false);
      expect(run([row('Silvered Flourish', id)])[0].name).toBe(nameOf(id));
    }
  });
});
