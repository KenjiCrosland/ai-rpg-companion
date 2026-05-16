/**
 * Tests for setting-prompts.mjs sibling-settings block emission.
 *
 * Coverage focuses on the structural contract: when sibling content is
 * passed in, the SIBLING SETTINGS section appears with the right
 * directives; when absent, the section is omitted. Open-ended prompt
 * wording is verified by manual production review per the project's
 * test-writing convention.
 */

import {
  settingOverviewPrompt,
  sublocationOverviewPrompt,
} from './setting-prompts.mjs';

describe('settingOverviewPrompt — siblingSettings', () => {
  const baseArgs = {
    type: 'town',
    character: ['ancient', 'lawful', 'mercantile'],
    register: 'Welsh-inspired',
    userName: null,
    tension: 'inheritance-burden',
    bannedTropes: [],
    description: 'A hill town in the moors.',
    lore: '',
  };

  it('emits the SIBLING SETTINGS block with full sibling content when present', () => {
    const sibling = `# Tockwrought Vault

A low, moss-crusted hill rises from the bracken.

## Region

The Vault lies within the territory of the Mwythig.

## Leadership

Llew ap Madog, the Gear-Keeper, holds nominal authority.`;

    const prompt = settingOverviewPrompt({
      ...baseArgs,
      siblingSettings: [sibling],
    });

    expect(prompt).toContain('SIBLING SETTINGS (already generated; treat as canonical context):');
    expect(prompt).toContain('--- Sibling 1 ---');
    expect(prompt).toContain('Tockwrought Vault');
    expect(prompt).toContain('Llew ap Madog, the Gear-Keeper');
    // The directive language matters — these are the rules that prevent
    // the Greta-is-founder-vs-thief class of drift.
    expect(prompt).toContain('NAMED CHARACTERS');
    expect(prompt).toContain('GEOGRAPHIC POSITIONING');
    expect(prompt).toContain('HISTORICAL EVENTS');
    expect(prompt).toContain('CANONICAL');
  });

  it('numbers multiple siblings with --- Sibling N --- separators', () => {
    const prompt = settingOverviewPrompt({
      ...baseArgs,
      siblingSettings: ['First sibling content', 'Second sibling content', 'Third sibling content'],
    });
    expect(prompt).toContain('--- Sibling 1 ---');
    expect(prompt).toContain('--- Sibling 2 ---');
    expect(prompt).toContain('--- Sibling 3 ---');
  });

  it('omits the SIBLING SETTINGS block when siblingSettings is empty or missing', () => {
    const empty = settingOverviewPrompt({ ...baseArgs, siblingSettings: [] });
    expect(empty).not.toContain('SIBLING SETTINGS');

    const missing = settingOverviewPrompt({ ...baseArgs });
    expect(missing).not.toContain('SIBLING SETTINGS');
  });
});

describe('sublocationOverviewPrompt — siblingSettings', () => {
  const baseArgs = {
    type: 'district',
    character: ['old', 'tense', 'merchant'],
    register: 'Welsh-inspired',
    userName: null,
    tension: 'inheritance-burden',
    bannedTropes: [],
    parentName: 'Parent City',
    parentLore: 'A walled city on a hill.',
    subLocationDescription: '',
  };

  it('emits the SIBLING SETTINGS block for sublocations sharing a parent', () => {
    const sibling = `# Other Quarter

A market district.

## Leadership

Watch-Master Veylin keeps order.`;

    const prompt = sublocationOverviewPrompt({
      ...baseArgs,
      siblingSettings: [sibling],
    });
    expect(prompt).toContain('SIBLING SETTINGS');
    expect(prompt).toContain('Watch-Master Veylin');
  });

  it('omits the SIBLING SETTINGS block when no siblings are passed', () => {
    const prompt = sublocationOverviewPrompt(baseArgs);
    expect(prompt).not.toContain('SIBLING SETTINGS');
  });
});
