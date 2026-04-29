/**
 * item-npc-prompts tests
 */

import {
  createItemNPCExtractionPrompt,
  validateItemNPCExtraction,
  buildPrefilledTypeOfPlace,
} from './item-npc-prompts.mjs';

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

    it('includes the stub name and role brief in the headline', () => {
      const text = buildPrefilledTypeOfPlace({ stub, item });
      expect(text).toContain('Yelena of the Duskwood — oracle who received the vision.');
    });

    it('includes the item name with rarity and type in the connection line', () => {
      const text = buildPrefilledTypeOfPlace({ stub, item });
      expect(text).toContain('Mentioned in connection with the magic item "Krovnik\'s Hearthstaff" (Common Staff):');
    });

    it('includes the item physical description and lore', () => {
      const text = buildPrefilledTypeOfPlace({ stub, item });
      expect(text).toContain(item.physical_description);
      expect(text).toContain('Lore:');
      expect(text).toContain(item.lore);
    });

    it('includes the stub-specific role at the end', () => {
      const text = buildPrefilledTypeOfPlace({ stub, item });
      expect(text).toContain('Specific role: Granted a prophetic vision describing the staff.');
    });

    it('omits an empty role_brief gracefully', () => {
      const text = buildPrefilledTypeOfPlace({
        stub: { name: 'Anonymous', role_brief: '', context: '' },
        item,
      });
      expect(text).toContain('Anonymous.');
      expect(text).not.toContain('— .');
      expect(text).not.toContain('Specific role:');
    });

    it('returns empty string when stub or item is missing', () => {
      expect(buildPrefilledTypeOfPlace({ stub: null, item })).toBe('');
      expect(buildPrefilledTypeOfPlace({ stub, item: null })).toBe('');
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
      const text = buildPrefilledTypeOfPlace({ stub: richStub, item: richItem });
      expect(text).toContain('Where this NPC appears in the source text:');
      expect(text).toContain('In 1100 DR, goblin scavenger Grishak Nailtooth found the Sturmzund Earring');
    });

    it('omits source_quote when it is already contained in the main lore (no duplication)', () => {
      const lore = 'Grishak Nailtooth found this earring in 1100 DR.';
      const text = buildPrefilledTypeOfPlace({
        stub: { name: 'Grishak', role_brief: 'finder', context: '', source_quote: lore },
        item: { name: 'Earring', item_type: 'Wondrous Item', rarity: 'Rare', physical_description: '', lore },
      });
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
  });
});
