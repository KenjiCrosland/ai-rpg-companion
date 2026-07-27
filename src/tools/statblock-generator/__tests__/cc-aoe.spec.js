/**
 * Ungated AoE that deals damage AND applies a hard condition is 0/329 in the
 * SRD (docs/investigations/04-hard-cc-detection.md). The rule stamps
 * (Recharge 5-6) — the official gated shape. Behavioral, no prompt-string asserts.
 */
import fs from 'fs';
import path from 'path';
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections } from '../format-2024/generate.mjs';

const chassis = { archetype: 'balanced', save_dc: 24 };
const ccFindings = (m) => lintStatblock(m, { chassis, edition: '2024' }).findings.filter((f) => f.rule === 'cc-aoe');
const wrap = (name, text) => ({ type: 'Plant', sections: { Actions: [{ name, text }] } });

describe('cc-aoe lint rule', () => {
  test('flags ungated AoE damage + Stunned (Spore Burst shape)', () => {
    const m = wrap('Spore Burst',
      '*Constitution Saving Throw*: DC 24, each creature in a 20-foot-radius sphere. *Failure:* 59 (17d6) Poison damage and the target has the Stunned condition until the end of its next turn. *Success:* Half damage only.');
    expect(ccFindings(m)).toHaveLength(1);
  });

  test('passes once (Recharge 5-6) is present', () => {
    const m = wrap('Spore Burst (Recharge 5-6)',
      '*Constitution Saving Throw*: DC 24, each creature in a 20-foot-radius sphere. *Failure:* 59 (17d6) Poison damage and the target has the Stunned condition. *Success:* Half damage.');
    expect(ccFindings(m)).toHaveLength(0);
  });

  test('passes a no-damage AoE hard condition (official Sleep Breath shape)', () => {
    const m = wrap('Sleep Breath',
      '*Constitution Saving Throw*: DC 24, each creature in a 60-foot Cone. *Failure:* The target has the Incapacitated condition until the end of its next turn.');
    expect(ccFindings(m)).toHaveLength(0);
  });

  test('does not flag Incapacitated (officials spend it freely)', () => {
    const m = wrap('Dazing Burst',
      '*Constitution Saving Throw*: DC 24, each creature in a 20-foot sphere. *Failure:* 30 (8d6) Force damage and the target has the Incapacitated condition. *Success:* Half damage.');
    expect(ccFindings(m)).toHaveLength(0);
  });

  test('does not flag a single-target save (no area)', () => {
    const m = wrap('Mind Spike',
      '*Wisdom Saving Throw*: DC 24, one creature within 60 feet. *Failure:* 30 (8d6) Psychic damage and the target has the Stunned condition. *Success:* Half damage.');
    expect(ccFindings(m)).toHaveLength(0);
  });

  test('does not flag an AoE hard condition with no damage in the fail clause', () => {
    const m = wrap('Petrifying Gaze',
      '*Constitution Saving Throw*: DC 24, each creature in a 30-foot Cone. *Failure:* The target has the Petrified condition. *Success:* No effect.');
    expect(ccFindings(m)).toHaveLength(0);
  });

  test('does not fire without a chassis (corpus sweep exempt)', () => {
    const m = wrap('Spore Burst',
      '*Constitution Saving Throw*: DC 24, each creature in a 20-foot sphere. *Failure:* 59 (17d6) Poison damage and the target has the Stunned condition. *Success:* Half.');
    expect(lintStatblock(m, { edition: '2024' }).findings.filter((f) => f.rule === 'cc-aoe')).toHaveLength(0);
  });
});

describe('cc-aoe correction (deterministic Recharge stamp)', () => {
  test('stamps (Recharge 5-6) onto the entry name and clears the finding', () => {
    const m = wrap('Spore Burst',
      '*Constitution Saving Throw*: DC 24, each creature in a 20-foot-radius sphere. *Failure:* 59 (17d6) Poison damage and the target has the Stunned condition until the end of its next turn. *Success:* Half damage only.');
    const fixed = applyCorrections(m, ccFindings(m), { chassis });
    expect(fixed.sections.Actions[0].name).toBe('Spore Burst (Recharge 5-6)');
    expect(ccFindings(fixed)).toHaveLength(0);
  });
});

describe('cc-aoe over the field-test fixtures', () => {
  test('flags exactly Sporegnash Spore Burst among the 16 blocks', () => {
    const dir = path.resolve(__dirname, '../../../../fixtures');
    const flagged = [];
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const sections = {};
      let section = null;
      for (const line of raw.split('\n')) {
        const t = line.trim();
        if (['Traits', 'Actions', 'Bonus Actions', 'Reactions', 'Legendary Actions'].includes(t)) { section = t; continue; }
        if (!section || !t || t.startsWith('Legendary Action Uses')) continue;
        const mm = /^([^.:]{2,60}?)[.:] (.*)$/.exec(t);
        if (mm) (sections[section] ??= []).push({ name: mm[1].trim(), text: mm[2] });
      }
      if (ccFindings({ type: 'Test', sections }).length) flagged.push(file);
    }
    expect(flagged).toEqual(['16-sporegnash.md']);
  });
});
