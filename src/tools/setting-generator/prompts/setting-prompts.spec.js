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

describe('settingOverviewPrompt — childrenSettings', () => {
  const baseArgs = {
    type: 'region',
    character: ['embattled', 'mercantile', 'wind-scoured'],
    register: 'Gothic-inspired',
    userName: 'Eldryssian Plain',
    tension: 'external-relationship',
    bannedTropes: [],
    description: 'A broad plain between two kingdoms.',
    lore: '',
  };

  it('emits the PLACES THIS SETTING CONTAINS block with full child content when present', () => {
    const child = `# Repubblica dei Cinque Martelli

A city-state cut into the side of a steep valley.

## Region

The Repubblica sits at the crossroads of the Via della Ruota.

## Leadership

The Consiglio dei Martelli governs.`;

    const prompt = settingOverviewPrompt({
      ...baseArgs,
      childrenSettings: [child],
    });

    expect(prompt).toContain('PLACES THIS SETTING CONTAINS');
    expect(prompt).toContain('--- Child 1 ---');
    expect(prompt).toContain('Repubblica dei Cinque Martelli');
    // The anti-peer directive is the load-bearing line that prevents
    // the Eldryssian-plain-treats-its-children-as-neighbors class of bug.
    expect(prompt).toContain('within its borders');
    expect(prompt).toMatch(/DO NOT describe them as.*neighboring/);
  });

  it('numbers multiple children with --- Child N --- separators', () => {
    const prompt = settingOverviewPrompt({
      ...baseArgs,
      childrenSettings: ['First child', 'Second child', 'Third child'],
    });
    expect(prompt).toContain('--- Child 1 ---');
    expect(prompt).toContain('--- Child 2 ---');
    expect(prompt).toContain('--- Child 3 ---');
  });

  it('omits the PLACES THIS SETTING CONTAINS block when childrenSettings is empty or missing', () => {
    const empty = settingOverviewPrompt({ ...baseArgs, childrenSettings: [] });
    expect(empty).not.toContain('PLACES THIS SETTING CONTAINS');

    const missing = settingOverviewPrompt({ ...baseArgs });
    expect(missing).not.toContain('PLACES THIS SETTING CONTAINS');
  });
});

describe('sublocationOverviewPrompt — childrenSettings', () => {
  const baseArgs = {
    type: 'duchy',
    character: ['feudal', 'tense', 'ancestral'],
    register: 'Anglo-Saxon-inspired',
    userName: 'Aethelmar',
    tension: 'inheritance-burden',
    bannedTropes: [],
    parentName: 'The Wider Realm',
    parentLore: 'A loose confederation of duchies.',
    subLocationDescription: '',
  };

  it('emits the PLACES THIS SETTING CONTAINS block for a sublocation that itself contains children', () => {
    const child = `# Salt-Quarter

A district by the wharves.

## Leadership

The Quarter-Reeve runs the toll-house.`;

    const prompt = sublocationOverviewPrompt({
      ...baseArgs,
      childrenSettings: [child],
    });
    expect(prompt).toContain('PLACES THIS SETTING CONTAINS');
    expect(prompt).toContain('Salt-Quarter');
  });

  it('omits the PLACES THIS SETTING CONTAINS block when no children are passed', () => {
    const prompt = sublocationOverviewPrompt(baseArgs);
    expect(prompt).not.toContain('PLACES THIS SETTING CONTAINS');
  });
});
