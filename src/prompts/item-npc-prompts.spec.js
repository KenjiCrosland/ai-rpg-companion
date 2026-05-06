/**
 * item-npc-prompts tests
 */

import {
  createItemNPCExtractionPrompt,
  validateItemNPCExtraction,
  buildPrefilledTypeOfPlace,
} from './item-npc-prompts.mjs';

// Adapter: build a SeededInput in the shape produced by
// `buildSeededInputFromItem` so the test fixtures stay readable.
function seed({ stub, item }) {
  if (!stub || !item) {
    return {
      source: item ? { type: 'item', id: item.name, name: item.name } : null,
      entities: stub ? [{ type: 'npc', name: stub.name }] : [],
    };
  }
  return {
    source: {
      type: 'item',
      id: item.name,
      name: item.name,
      item_type: item.item_type || '',
      rarity: item.rarity || '',
      physical_description: item.physical_description || '',
      lore: item.lore || '',
      quote: stub.source_quote || undefined,
    },
    entities: [{
      type: 'npc',
      name: stub.name,
      role_or_description: stub.role_brief || '',
      context: stub.context || '',
    }],
  };
}

describe('item-npc-prompts', () => {
  describe('buildPrefilledTypeOfPlace', () => {
    const item = {
      name: 'Krovnik\'s Hearthstaff',
      item_type: 'Staff',
      rarity: 'Common',
      physical_description: 'A gnarled staff of aged blackwood capped with a twisted cage of dark, blood-red blood iron.',
      lore: 'A vision granted to the oracle Yelena of the Duskwood: You shall see a branch that does not grow.',
    };
    const stub = {
      name: 'Yelena of the Duskwood',
      role_brief: 'oracle who received the vision',
      context: 'Granted a prophetic vision describing the staff.',
    };

    it('puts the stub name on a labeled Name line so the LLM can\'t fuse it with the role description', () => {
      const text = buildPrefilledTypeOfPlace(seed({ stub, item }));
      expect(text).toContain('Name: Yelena of the Duskwood');
      expect(text).toContain('Role: oracle who received the vision.');
      expect(text).toContain('Mentioned in lore of Krovnik\'s Hearthstaff.');
      // The dash-joined form is what tripped up character_name extraction;
      // explicitly assert it's gone so it doesn't sneak back in.
      expect(text).not.toContain('— oracle who received the vision');
    });

    it('includes the item physical description and lore', () => {
      const text = buildPrefilledTypeOfPlace(seed({ stub, item }));
      expect(text).toContain(item.physical_description);
      expect(text).toContain('Lore:');
      expect(text).toContain(item.lore);
    });

    it('includes the stub-specific role at the end', () => {
      const text = buildPrefilledTypeOfPlace(seed({ stub, item }));
      expect(text).toContain('Specific role: Granted a prophetic vision describing the staff.');
    });

    it('omits the Role line gracefully when role_brief is empty', () => {
      const text = buildPrefilledTypeOfPlace(seed({
        stub: { name: 'Anonymous', role_brief: '', context: '' },
        item,
      }));
      expect(text).toContain('Name: Anonymous');
      expect(text).toContain('Mentioned in lore of Krovnik\'s Hearthstaff.');
      expect(text).not.toContain('Role:');
      expect(text).not.toContain('Specific role:');
    });

    it('returns empty string when stub or item is missing', () => {
      expect(buildPrefilledTypeOfPlace(seed({ stub: null, item }))).toBe('');
      expect(buildPrefilledTypeOfPlace(seed({ stub, item: null }))).toBe('');
    });

    it('includes source_quote when present and not redundant with lore', () => {
      const richStub = {
        name: 'Grishak Nailtooth',
        role_brief: 'Discoverer of Sturmzund Earring',
        context: 'Goblin scavenger who found it in a sealed cairn.',
        source_quote: "In 1100 DR, goblin scavenger Grishak Nailtooth found the Sturmzund Earring when his pick shattered the sealed cairn north of Sundered Pass.",
      };
      const richItem = {
        name: 'Sturmzund Earring',
        item_type: 'Wondrous Item',
        rarity: 'Rare',
        physical_description: 'A small dwarven earring.',
        lore: 'Forged in some forgotten age.',
      };
      const text = buildPrefilledTypeOfPlace(seed({ stub: richStub, item: richItem }));
      expect(text).toContain('Where this NPC appears in the source text:');
      expect(text).toContain('In 1100 DR, goblin scavenger Grishak Nailtooth found the Sturmzund Earring');
    });

    it('omits source_quote when it is already contained in the main lore (no duplication)', () => {
      const lore = 'Grishak Nailtooth found this earring in 1100 DR.';
      const text = buildPrefilledTypeOfPlace(seed({
        stub: { name: 'Grishak', role_brief: 'finder', context: '', source_quote: lore },
        item: { name: 'Earring', item_type: 'Wondrous Item', rarity: 'Rare', physical_description: '', lore },
      }));
      expect(text).not.toContain('Where this NPC appears in the source text:');
    });
  });

  describe('validateItemNPCExtraction', () => {
    it('accepts a valid array of stubs', () => {
      const json = JSON.stringify([
        { name: 'Yelena', role_brief: 'oracle', context: 'received the vision' },
        { name: 'Morghul', role_brief: 'watcher', context: 'tends the embers' },
      ]);
      expect(validateItemNPCExtraction(json)).toBe(true);
    });

    it('accepts an empty array', () => {
      expect(validateItemNPCExtraction('[]')).toBe(true);
    });

    it('rejects non-arrays', () => {
      expect(validateItemNPCExtraction('{"name":"x","role_brief":"","context":""}')).toBe(false);
    });

    it('rejects entries without a string name', () => {
      const bad = JSON.stringify([{ name: '', role_brief: 'x', context: 'y' }]);
      expect(validateItemNPCExtraction(bad)).toBe(false);
    });

    it('rejects malformed JSON', () => {
      expect(validateItemNPCExtraction('not-json')).toBe(false);
    });

    it('rejects entries missing role_brief or context', () => {
      const bad = JSON.stringify([{ name: 'A' }]);
      expect(validateItemNPCExtraction(bad)).toBe(false);
    });

    it('accepts entries with optional source_quote', () => {
      const good = JSON.stringify([
        { name: 'A', role_brief: 'r', context: 'c', source_quote: 'verbatim sentence' },
      ]);
      expect(validateItemNPCExtraction(good)).toBe(true);
    });

    it('rejects entries where source_quote is not a string', () => {
      const bad = JSON.stringify([
        { name: 'A', role_brief: 'r', context: 'c', source_quote: 42 },
      ]);
      expect(validateItemNPCExtraction(bad)).toBe(false);
    });
  });

  describe('createItemNPCExtractionPrompt', () => {
    it('includes the item name, type, rarity, physical description, and lore', () => {
      const prompt = createItemNPCExtractionPrompt({
        name: 'Hearthstaff',
        item_type: 'Staff',
        rarity: 'Common',
        physical_description: 'desc',
        lore: 'lore body',
      });
      expect(prompt).toContain('Hearthstaff');
      expect(prompt).toContain('Staff');
      expect(prompt).toContain('Common');
      expect(prompt).toContain('desc');
      expect(prompt).toContain('lore body');
      expect(prompt).toContain('JSON array');
    });

    it('instructs role_brief to contain the item name verbatim', () => {
      const prompt = createItemNPCExtractionPrompt({
        name: 'Hearthstaff', item_type: 'Staff', rarity: 'Common',
        physical_description: '', lore: '',
      });
      // Examples should reference the actual item name, and the instruction
      // should require the name verbatim so the UI can linkify it.
      expect(prompt).toContain('Creator of Hearthstaff');
      expect(prompt).toContain('item name verbatim');
    });

    it('instructs the model to invent an individual when only a group is named', () => {
      const prompt = createItemNPCExtractionPrompt({
        name: 'Hearthstaff', item_type: 'Staff', rarity: 'Common',
        physical_description: '', lore: '',
      });
      // Group/faction/cult/tribe handling — invent a plausible individual member
      // rather than using the group's name as an NPC.
      expect(prompt).toMatch(/group[\s\S]*INVENT[\s\S]*individual member/i);
      expect(prompt).toContain('Do NOT use the group');
    });

    it('instructs the model to invent a name for individuals identified only by relationship to a named person', () => {
      const prompt = createItemNPCExtractionPrompt({
        name: 'Hearthstaff', item_type: 'Staff', rarity: 'Common',
        physical_description: '', lore: '',
      });
      // "Jara's daughter", "King Aldric's son" — real specific characters
      // who lack their own proper name. Must invent in the linguistic style
      // of the named relative, and surface both invented name and the
      // relationship in role_brief/context.
      expect(prompt).toMatch(/relationship to a named person/i);
      expect(prompt).toContain("Jara's daughter");
      expect(prompt).toMatch(/INVENT a plausible given name/i);
      expect(prompt).toMatch(/linguistic style as the named relative/i);
      // The skip rule for true archetypes must explicitly carve out
      // relationship-named individuals so the model doesn't lump them in.
      expect(prompt).toMatch(/no naming relationship to a named person/i);
    });

    it('asks for source_quote with timeline-event preference', () => {
      const prompt = createItemNPCExtractionPrompt({
        name: 'Hearthstaff', item_type: 'Staff', rarity: 'Common',
        physical_description: '', lore: '',
      });
      // Verbatim snippet preserves year/location/action detail for the
      // downstream NPC-creation prompt (especially for timeline events).
      expect(prompt).toContain('"source_quote"');
      expect(prompt).toMatch(/character-for-character/);
      expect(prompt).toMatch(/TIMELINE EVENT/);
    });

    it('includes timeline events when present', () => {
      const prompt = createItemNPCExtractionPrompt({
        name: 'X',
        item_type: 'Wondrous Item',
        rarity: 'Rare',
        physical_description: '',
        lore: '',
        timelineEvents: [
          { title: 'Forging', description: 'Master Smith Gorvak completed the work.' },
          { title: '', description: 'A nameless event' },
        ],
      });
      expect(prompt).toContain('TIMELINE EVENTS');
      expect(prompt).toContain('Forging');
      expect(prompt).toContain('Master Smith Gorvak');
    });

    it('handles items with no lore by emitting `(none)`', () => {
      const prompt = createItemNPCExtractionPrompt({
        name: '', item_type: '', rarity: '', physical_description: '', lore: '',
      });
      expect(prompt).toContain('LORE:\n(none)');
    });

    it('includes ITEM LEGACY when present and not already in the lore', () => {
      const prompt = createItemNPCExtractionPrompt({
        name: 'X', item_type: 'Staff', rarity: 'Rare',
        physical_description: '', lore: 'Some unrelated lore.',
        itemLegacy: 'Captain Veylin recovered the staff at the siege of Marrowdeep.',
      });
      expect(prompt).toContain('ITEM LEGACY:');
      expect(prompt).toContain('Captain Veylin recovered the staff at the siege of Marrowdeep.');
    });

    it('omits HISTORICAL SUMMARY when its text is already contained in the lore', () => {
      const summary = 'A vision granted to the oracle Yelena of the Duskwood.';
      const prompt = createItemNPCExtractionPrompt({
        name: 'X', item_type: 'Staff', rarity: 'Rare',
        physical_description: '',
        lore: `${summary}\n\nMore lore body.`,
        historicalSummary: summary,
      });
      expect(prompt).not.toContain('HISTORICAL SUMMARY:');
    });

    it('omits ITEM LEGACY when its text is already contained in the lore', () => {
      const legacy = 'Captain Veylin recovered the staff at the siege of Marrowdeep.';
      const prompt = createItemNPCExtractionPrompt({
        name: 'X', item_type: 'Staff', rarity: 'Rare',
        physical_description: '',
        lore: `Some lore.\n\n${legacy}`,
        itemLegacy: legacy,
      });
      expect(prompt).not.toContain('ITEM LEGACY:');
    });

    it('renders summary and legacy independently — duplicate guard is per-block', () => {
      const summary = 'A vision granted to Yelena.';
      const legacy = 'Veylin recovered the staff.';
      const prompt = createItemNPCExtractionPrompt({
        name: 'X', item_type: 'Staff', rarity: 'Rare',
        physical_description: '',
        // Lore contains the summary but not the legacy; only the legacy
        // block should render.
        lore: `${summary}\n\nUnrelated body.`,
        historicalSummary: summary,
        itemLegacy: legacy,
      });
      expect(prompt).not.toContain('HISTORICAL SUMMARY:');
      expect(prompt).toContain('ITEM LEGACY:');
      expect(prompt).toContain(legacy);
    });

    it('omits the EXISTING NPC STUBS block when no existing stubs are passed', () => {
      const prompt = createItemNPCExtractionPrompt({
        name: 'X', item_type: 'Wondrous Item', rarity: 'Rare',
        physical_description: '', lore: '',
      });
      expect(prompt).not.toContain('EXISTING NPC STUBS');
    });

    it('includes the EXISTING NPC STUBS block with the stub names listed', () => {
      const prompt = createItemNPCExtractionPrompt(
        { name: 'X', item_type: 'Staff', rarity: 'Rare', physical_description: '', lore: '' },
        { existingStubs: [
          { name: 'Dragana' },
          { name: 'Master Smith Gorvak' },
        ] },
      );
      expect(prompt).toContain('EXISTING NPC STUBS');
      expect(prompt).toContain('- Dragana');
      expect(prompt).toContain('- Master Smith Gorvak');
    });

    it('instructs the model to use existing names verbatim and forbid variant forms', () => {
      const prompt = createItemNPCExtractionPrompt(
        { name: 'X', item_type: 'Staff', rarity: 'Rare', physical_description: '', lore: '' },
        { existingStubs: [{ name: 'Dragana' }] },
      );
      // The consistency rule should be present and explicit about variant forms.
      expect(prompt).toMatch(/use the existing name VERBATIM/i);
      expect(prompt).toMatch(/no added titles/i);
      expect(prompt).toMatch(/no expanded full names/i);
      expect(prompt).toMatch(/no epithets/i);
    });

    it('ignores existing stubs with empty names', () => {
      const prompt = createItemNPCExtractionPrompt(
        { name: 'X', item_type: 'Staff', rarity: 'Rare', physical_description: '', lore: '' },
        { existingStubs: [{ name: '' }, { name: '   ' }, { name: 'Dragana' }] },
      );
      expect(prompt).toContain('EXISTING NPC STUBS');
      expect(prompt).toContain('- Dragana');
      // No empty bullet lines.
      expect(prompt).not.toMatch(/^- $/m);
    });
  });
});
