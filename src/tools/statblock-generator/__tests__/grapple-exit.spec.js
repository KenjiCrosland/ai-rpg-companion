/**
 * Grapple/Restrain machinery must carry counterplay (docs/investigations/
 * 07-grapple-machinery.md). Behavioral coverage: the real lint + applyCorrections
 * over the field-test fixtures and synthetic edge cases. No prompt-string asserts.
 */
import fs from 'fs';
import path from 'path';
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections } from '../format-2024/generate.mjs';

const FIXTURE_DIR = path.resolve(__dirname, '../../../../fixtures');
const chassis = { archetype: 'balanced', save_dc: 23 };
const findingsFor = (monster, opts = {}) =>
  lintStatblock(monster, { chassis, edition: '2024', ...opts }).findings.filter((f) => f.rule === 'grapple-exit');

const entry = (name, text) => ({ name, text });
const wrap = (section, e) => ({ type: 'Monstrosity', sections: { [section]: [e] } });

describe('grapple-exit lint rule', () => {
  test('flags a Restrained condition with no counterplay (Coiling Grasp shape)', () => {
    const m = wrap('Actions', entry('Coiling Grasp',
      '*Strength Saving Throw*: DC 23, one creature within 30 feet. *Failure:* The target has the Restrained condition. At the start of each of the target’s turns, it takes 22 (4d10) Psychic damage. *Success:* None.'));
    const [f] = findingsFor(m);
    expect(f).toBeTruthy();
    expect(f.expected).toBe('Restrained');
  });

  test('flags a Grappled condition with no escape DC', () => {
    const m = wrap('Actions', entry('Clutch',
      '*Strength Saving Throw*: DC 23, one creature. *Failure:* The target has the Grappled condition and takes 10 (3d6) damage.'));
    expect(findingsFor(m)[0]?.expected).toBe('Grappled');
  });

  test('flags a maintained hold even though it has a duration clause', () => {
    // Whisper Shifter Buried Grasp: bounded by a duration BUT sustainable
    // forever via a bonus action, with no target counterplay.
    const m = wrap('Actions', entry('Buried Grasp',
      '*Strength Saving Throw*: DC 23, one creature. *Failure:* The target has the Restrained condition. The creature may maintain the Restrained condition on subsequent turns by using a bonus action; otherwise the condition ends at the end of the creature’s next turn. *Success:* Half damage.'));
    expect(findingsFor(m)).toHaveLength(1);
  });

  test('passes a Grappled condition that carries an escape DC (Engulf shape)', () => {
    const m = wrap('Actions', entry('Engulf',
      '*Strength Saving Throw*: DC 23. *Failure:* The target has the Grappled condition (escape DC 23) and takes Acid damage.'));
    expect(findingsFor(m)).toHaveLength(0);
  });

  test('passes a Restrained condition with a repeat save', () => {
    const m = wrap('Actions', entry('Web',
      '*Dexterity Saving Throw*: DC 23. *Failure:* The target has the Restrained condition. The target repeats the save at the end of each of its turns, ending the effect on a success.'));
    expect(findingsFor(m)).toHaveLength(0);
  });

  test('passes a plain duration-bounded Restrain (no maintenance clause)', () => {
    const m = wrap('Actions', entry('Snare',
      '*Dexterity Saving Throw*: DC 23. *Failure:* The target has the Restrained condition until the end of its next turn.'));
    expect(findingsFor(m)).toHaveLength(0);
  });

  test('does not fire without a chassis (the corpus sweep is exempt)', () => {
    const m = wrap('Actions', entry('Coiling Grasp',
      '*Failure:* The target has the Restrained condition.'));
    expect(lintStatblock(m, { edition: '2024' }).findings.filter((f) => f.rule === 'grapple-exit')).toHaveLength(0);
  });
});

describe('grapple-exit correction (deterministic injection)', () => {
  test('injects an escape DC rider on a bare Grappled (save_dc − 2)', () => {
    const m = wrap('Actions', entry('Clutch',
      '*Failure:* The target has the Grappled condition and takes 10 (3d6) damage.'));
    const fixed = applyCorrections(m, findingsFor(m), { chassis });
    expect(fixed.sections.Actions[0].text).toContain('has the Grappled condition (escape DC 21)');
    expect(findingsFor(fixed)).toHaveLength(0);
  });

  test('injects a repeat-save sentence before *Success:* on a bare Restrain', () => {
    const m = wrap('Actions', entry('Coiling Grasp',
      '*Failure:* The target has the Restrained condition. *Success:* None.'));
    const fixed = applyCorrections(m, findingsFor(m), { chassis });
    const text = fixed.sections.Actions[0].text;
    expect(text).toContain('repeats the save at the end of each of its turns');
    expect(text.indexOf('repeats the save')).toBeLessThan(text.indexOf('*Success:*'));
    expect(findingsFor(fixed)).toHaveLength(0);
  });

  test('appends the repeat-save sentence when there is no *Success:* clause', () => {
    const m = wrap('Actions', entry('Grip',
      '*Failure:* The target has the Restrained condition.'));
    const fixed = applyCorrections(m, findingsFor(m), { chassis });
    expect(fixed.sections.Actions[0].text.trimEnd())
      .toMatch(/ending the effect on a success\.$/);
    expect(findingsFor(fixed)).toHaveLength(0);
  });
});

describe('grapple-exit over the field-test fixtures', () => {
  const modelFor = (file) => {
    const raw = fs.readFileSync(path.join(FIXTURE_DIR, file), 'utf8');
    const sections = {};
    let section = null;
    for (const line of raw.split('\n')) {
      const t = line.trim();
      if (['Traits', 'Actions', 'Bonus Actions', 'Reactions', 'Legendary Actions'].includes(t)) { section = t; continue; }
      if (!section || !t || t.startsWith('Legendary Action Uses')) continue;
      const mm = /^([^.:]{2,60}?)[.:] (.*)$/.exec(t);
      if (mm) (sections[section] ??= []).push({ name: mm[1].trim(), text: mm[2] });
    }
    return { type: 'Test', sections };
  };

  test('flags the two broken holds (Skittering Hive, Whisper Shifter)', () => {
    expect(findingsFor(modelFor('07-skittering-hive.md')).length).toBeGreaterThan(0);
    expect(findingsFor(modelFor('11-whisper-shifter.md')).length).toBeGreaterThan(0);
  });

  test('passes the correct Engulf (Scuttling Jellypack, escape DC present)', () => {
    // Fixture 14 already renders "(escape DC 14)" on its Grappled clause.
    expect(findingsFor(modelFor('14-scuttling-jellypack.md'))).toHaveLength(0);
  });
});
