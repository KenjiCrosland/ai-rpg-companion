/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import StatblockGenerator from '../StatblockGenerator.vue';
import * as referenceStorage from '@/util/reference-storage.mjs';

// Mock Cedar components
jest.mock('@rei/cedar', () => ({
  CdrButton: { name: 'CdrButton', template: '<button><slot /></button>' },
  CdrInput: { name: 'CdrInput', template: '<input />', props: ['modelValue'] },
  CdrSelect: { name: 'CdrSelect', template: '<select><slot /></select>', props: ['modelValue', 'options'] },
  CdrCheckbox: { name: 'CdrCheckbox', template: '<input type="checkbox" />', props: ['modelValue'] },
  CdrToggleButton: { name: 'CdrToggleButton', template: '<button><slot /></button>', props: ['toggleValue'] },
  CdrToggleGroup: { name: 'CdrToggleGroup', template: '<div><slot /></div>', props: ['modelValue'] },
  CdrAccordion: { name: 'CdrAccordion', template: '<div><slot name="label" /><slot /></div>', props: ['opened'] },
  CdrAccordionGroup: { name: 'CdrAccordionGroup', template: '<div><slot /></div>' },
}));

// Mock child components
jest.mock('@/components/Statblock.vue', () => ({
  name: 'Statblock',
  template: '<div class="mock-statblock"></div>',
  props: ['monster', 'linkedNpcsCount'],
  emits: ['create-npc']
}));

jest.mock('@/components/GeneratorLayout.vue', () => ({
  name: 'GeneratorLayout',
  template: '<div><slot name="sidebar" /><slot /></div>',
  props: ['premium']
}));

jest.mock('../components/StatblockExports.vue', () => ({
  name: 'StatblockExports',
  template: '<div class="mock-exports"></div>',
  props: ['monster']
}));

jest.mock('@/components/DataManagerModal.vue', () => ({
  name: 'DataManagerModal',
  template: '<div class="mock-data-manager"></div>',
  props: ['opened', 'premium', 'currentApp']
}));

// Mock API calls
jest.mock('@/util/open-ai.mjs', () => ({
  generateGptResponse: jest.fn()
}));

// Mock navigation
jest.mock('@/util/navigation.mjs', () => ({
  navigateToTool: jest.fn()
}));

describe('StatblockGenerator - Linked NPCs', () => {
  let wrapper;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();

    // Set up default localStorage
    localStorage.setItem('monsters', JSON.stringify({
      'NPC Statblocks': [
        {
          name: 'Eithan Deeproot',
          challenge_rating: '2',
          type_and_alignment: 'Medium humanoid (half-elf), neutral good'
        }
      ],
      "Tariel's Cloister": [
        {
          name: 'Zathira, the Resolute Seer',
          challenge_rating: '5',
          type_and_alignment: 'Medium humanoid (human), neutral'
        },
        {
          name: 'Wyrm-Mayor Velathor',
          challenge_rating: '7',
          type_and_alignment: 'Large dragon, lawful neutral'
        }
      ]
    }));

    localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
      'Uncategorized': [
        {
          npc_id: 'npc_123_abc',
          npcDescriptionPart1: {
            character_name: 'Eithan Deeproot',
            statblock_name: 'Eithan Deeproot',
            statblock_folder: 'NPC Statblocks'
          }
        }
      ],
      "Tariel's Cloister": [
        {
          npc_id: 'npc_456_def',
          npcDescriptionPart1: {
            character_name: 'Zathira, the Resolute Seer',
            statblock_name: 'Zathira, the Resolute Seer',
            statblock_folder: "Tariel's Cloister"
          }
        }
      ]
    }));
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Linked NPCs Display
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Linked NPCs Display', () => {
    it('should display linked NPCs when reference exists', async () => {
      // Create reference
      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([
        {
          id: 'ref_123',
          source_type: 'npc',
          source_id: 'npc_123_abc',
          source_name: 'Eithan Deeproot',
          target_type: 'statblock',
          target_id: 'Eithan Deeproot__NPC Statblocks',
          target_name: 'Eithan Deeproot',
          relationship: 'has_statblock'
        }
      ]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      // Select the statblock
      const monsters = JSON.parse(localStorage.getItem('monsters'));
      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      // Should show linked NPCs section
      const linkedNPCsEl = wrapper.find('.linked-npcs');
      expect(linkedNPCsEl.exists()).toBe(true);
      expect(linkedNPCsEl.text()).toContain('Linked NPCs:');
      expect(linkedNPCsEl.text()).toContain('Eithan Deeproot');
    });

    it('should not display linked NPCs section when no references exist', async () => {
      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      const linkedNPCsEl = wrapper.find('.linked-npcs');
      expect(linkedNPCsEl.exists()).toBe(false);
    });

    it('should display multiple linked NPCs separated by commas', async () => {
      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([
        {
          source_id: 'npc_123_abc',
          source_name: 'Eithan Deeproot',
          target_type: 'statblock',
          relationship: 'has_statblock'
        },
        {
          source_id: 'npc_789_ghi',
          source_name: 'Lyra Mosskeeper',
          target_type: 'statblock',
          relationship: 'has_statblock'
        }
      ]);

      // Add second NPC to localStorage
      const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      npcs['Uncategorized'].push({
        npc_id: 'npc_789_ghi',
        npcDescriptionPart1: {
          character_name: 'Lyra Mosskeeper',
          statblock_name: 'Eithan Deeproot',
          statblock_folder: 'NPC Statblocks'
        }
      });
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify(npcs));

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      const linkedNPCsEl = wrapper.find('.linked-npcs');
      expect(linkedNPCsEl.text()).toContain('Eithan Deeproot');
      expect(linkedNPCsEl.text()).toContain(',');
      expect(linkedNPCsEl.text()).toContain('Lyra Mosskeeper');
    });

    it('should filter out non-has_statblock relationships', async () => {
      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([
        {
          source_id: 'npc_123_abc',
          source_name: 'Eithan Deeproot',
          target_type: 'statblock',
          relationship: 'has_statblock'
        },
        {
          source_id: 'dungeon_456',
          source_name: 'Some Dungeon',
          target_type: 'dungeon',
          relationship: 'appears_in_dungeon'
        }
      ]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      const linkedNPCsEl = wrapper.find('.linked-npcs');
      expect(linkedNPCsEl.text()).toContain('Eithan Deeproot');
      expect(linkedNPCsEl.text()).not.toContain('Some Dungeon');
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Folder Lookup
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Folder Lookup for NPCs', () => {
    it('should find NPC in correct folder', async () => {
      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([
        {
          source_id: 'npc_456_def',
          source_name: 'Zathira, the Resolute Seer',
          target_type: 'statblock',
          relationship: 'has_statblock'
        }
      ]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster("Tariel's Cloister", 0);
      await nextTick();

      const linkedNPCs = wrapper.vm.linkedNPCs;
      expect(linkedNPCs).toHaveLength(1);
      expect(linkedNPCs[0].folder).toBe("Tariel's Cloister");
    });

    it('should default to Uncategorized when NPC folder not found', async () => {
      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([
        {
          source_id: 'npc_999_xyz',
          source_name: 'Mystery NPC',
          target_type: 'statblock',
          relationship: 'has_statblock'
        }
      ]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      const linkedNPCs = wrapper.vm.linkedNPCs;
      expect(linkedNPCs).toHaveLength(1);
      expect(linkedNPCs[0].folder).toBe('Uncategorized');
    });

    it('should handle NPCs with legacy id field instead of npc_id', async () => {
      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([
        {
          source_id: 'legacy_npc_123',
          source_name: 'Legacy NPC',
          target_type: 'statblock',
          relationship: 'has_statblock'
        }
      ]);

      // Add NPC with id instead of npc_id
      const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      npcs['Uncategorized'].push({
        id: 'legacy_npc_123',
        npcDescriptionPart1: {
          character_name: 'Legacy NPC',
          statblock_name: 'Eithan Deeproot',
          statblock_folder: 'NPC Statblocks'
        }
      });
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify(npcs));

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      const linkedNPCs = wrapper.vm.linkedNPCs;
      expect(linkedNPCs).toHaveLength(1);
      expect(linkedNPCs[0].name).toBe('Legacy NPC');
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Navigation to Linked NPCs
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Navigation to Linked NPCs', () => {
    it('should navigate to NPC when link is clicked', async () => {
      const navigateToTool = require('@/util/navigation.mjs').navigateToTool;

      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([
        {
          source_id: 'npc_123_abc',
          source_name: 'Eithan Deeproot',
          target_type: 'statblock',
          relationship: 'has_statblock'
        }
      ]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      const link = wrapper.find('.linked-npc-link');
      await link.trigger('click');

      expect(navigateToTool).toHaveBeenCalledWith('npc-generator', {
        folder: 'Uncategorized',
        npc_name: 'Eithan Deeproot'
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // "Create Another NPC" Button
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Create NPC Button Text', () => {
    it('should pass linkedNpcsCount prop to Statblock component when NPCs exist', async () => {
      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([
        {
          source_id: 'npc_123_abc',
          source_name: 'Eithan Deeproot',
          target_type: 'statblock',
          relationship: 'has_statblock'
        }
      ]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      const statblockComponent = wrapper.findComponent({ name: 'Statblock' });
      expect(statblockComponent.props('linkedNpcsCount')).toBe(1);
    });

    it('should pass linkedNpcsCount as 0 when no NPCs exist', async () => {
      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      const statblockComponent = wrapper.findComponent({ name: 'Statblock' });
      expect(statblockComponent.props('linkedNpcsCount')).toBe(0);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Statblock Deletion Cascade
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Statblock Deletion Cascade', () => {
    beforeEach(() => {
      // Mock window.confirm to auto-accept deletions
      global.confirm = jest.fn(() => true);
    });

    afterEach(() => {
      global.confirm.mockRestore();
    });

    it('should remove all references when deleting a statblock', async () => {
      const removeReferencesForEntitySpy = jest.spyOn(referenceStorage, 'removeReferencesForEntity')
        .mockImplementation(() => {});

      // Set up statblock with references
      localStorage.setItem('monsters', JSON.stringify({
        'Boss Monsters': [
          {
            name: 'Ancient Lich',
            challenge_rating: '21',
            type: 'Undead'
          }
        ]
      }));

      // Set up references to this statblock
      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([
        {
          id: 'ref_1',
          source_type: 'npc',
          source_id: 'npc_123',
          source_name: 'Evil Wizard',
          target_type: 'statblock',
          target_id: 'Ancient Lich__Boss Monsters',
          relationship: 'has_statblock'
        },
        {
          id: 'ref_2',
          source_type: 'npc',
          source_id: 'npc_456',
          source_name: 'Dark Cultist',
          target_type: 'statblock',
          target_id: 'Ancient Lich__Boss Monsters',
          relationship: 'has_statblock'
        }
      ]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      // Select the statblock
      wrapper.vm.selectMonster('Boss Monsters', 0);
      await nextTick();

      // Delete the statblock
      wrapper.vm.deleteStatblock();
      await nextTick();

      // Wait for dynamic import to resolve
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should have called removeReferencesForEntity for the statblock
      expect(removeReferencesForEntitySpy).toHaveBeenCalledWith(
        'statblock',
        'Ancient Lich__Boss Monsters'
      );
    });

    it('should handle deletion when statblock has no references', async () => {
      const removeReferencesForEntitySpy = jest.spyOn(referenceStorage, 'removeReferencesForEntity')
        .mockImplementation(() => {});

      localStorage.setItem('monsters', JSON.stringify({
        'Uncategorized': [
          {
            name: 'Lonely Monster',
            challenge_rating: '5'
          }
        ]
      }));

      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('Uncategorized', 0);
      await nextTick();

      // Should not throw when deleting
      expect(() => wrapper.vm.deleteStatblock()).not.toThrow();
      await nextTick();

      await new Promise(resolve => setTimeout(resolve, 100));

      // Should still call removeReferencesForEntity (even if no refs exist)
      expect(removeReferencesForEntitySpy).toHaveBeenCalledWith(
        'statblock',
        'Lonely Monster__Uncategorized'
      );
    });

    it('should remove statblock from localStorage after deletion', async () => {
      jest.spyOn(referenceStorage, 'removeReferencesForEntity').mockImplementation(() => {});

      localStorage.setItem('monsters', JSON.stringify({
        'Dragons': [
          {
            name: 'Red Dragon',
            challenge_rating: '17'
          },
          {
            name: 'Blue Dragon',
            challenge_rating: '16'
          }
        ]
      }));

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('Dragons', 0);
      await nextTick();

      wrapper.vm.deleteStatblock();
      await nextTick();

      const monstersData = JSON.parse(localStorage.getItem('monsters') || '{}');
      expect(monstersData.Dragons).toHaveLength(1);
      expect(monstersData.Dragons[0].name).toBe('Blue Dragon');
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Edge Cases
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Edge Cases', () => {
    it('should handle empty npcGeneratorNPCs localStorage', async () => {
      localStorage.removeItem('npcGeneratorNPCs');

      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([
        {
          source_id: 'npc_123_abc',
          source_name: 'Eithan Deeproot',
          target_type: 'statblock',
          relationship: 'has_statblock'
        }
      ]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      // Should default to Uncategorized
      const linkedNPCs = wrapper.vm.linkedNPCs;
      expect(linkedNPCs).toHaveLength(1);
      expect(linkedNPCs[0].folder).toBe('Uncategorized');
    });

    it('should handle corrupted npcGeneratorNPCs JSON', async () => {
      localStorage.setItem('npcGeneratorNPCs', 'invalid json{');

      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([
        {
          source_id: 'npc_123_abc',
          source_name: 'Eithan Deeproot',
          target_type: 'statblock',
          relationship: 'has_statblock'
        }
      ]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      // Should handle gracefully and default to Uncategorized
      const linkedNPCs = wrapper.vm.linkedNPCs;
      expect(linkedNPCs).toHaveLength(1);
      expect(linkedNPCs[0].folder).toBe('Uncategorized');
    });

    it('should handle non-array folder values in npcGeneratorNPCs', async () => {
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'BadFolder': 'not an array',
        'Uncategorized': [
          {
            npc_id: 'npc_123_abc',
            npcDescriptionPart1: {
              character_name: 'Eithan Deeproot'
            }
          }
        ]
      }));

      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([
        {
          source_id: 'npc_123_abc',
          source_name: 'Eithan Deeproot',
          target_type: 'statblock',
          relationship: 'has_statblock'
        }
      ]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      // Should skip bad folder and find NPC in Uncategorized
      const linkedNPCs = wrapper.vm.linkedNPCs;
      expect(linkedNPCs).toHaveLength(1);
      expect(linkedNPCs[0].folder).toBe('Uncategorized');
    });

    it('should handle statblock without active folder', async () => {
      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      // Don't select any monster (activeFolder is null)
      const linkedNPCs = wrapper.vm.linkedNPCs;
      expect(linkedNPCs).toEqual([]);
    });

    it('should handle statblock without monster value', async () => {
      jest.spyOn(referenceStorage, 'getReferencesForEntity').mockReturnValue([]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      // monster.value is null
      const linkedNPCs = wrapper.vm.linkedNPCs;
      expect(linkedNPCs).toEqual([]);
    });

    it('should update linkedNPCs when switching between statblocks', async () => {
      jest.spyOn(referenceStorage, 'getReferencesForEntity')
        .mockReturnValueOnce([
          {
            source_id: 'npc_123_abc',
            source_name: 'Eithan Deeproot',
            target_type: 'statblock',
            relationship: 'has_statblock'
          }
        ])
        .mockReturnValueOnce([
          {
            source_id: 'npc_456_def',
            source_name: 'Zathira, the Resolute Seer',
            target_type: 'statblock',
            relationship: 'has_statblock'
          }
        ]);

      wrapper = mount(StatblockGenerator, { props: { premium: false } });
      await nextTick();

      // Select first statblock
      wrapper.vm.selectMonster('NPC Statblocks', 0);
      await nextTick();

      expect(wrapper.vm.linkedNPCs).toHaveLength(1);
      expect(wrapper.vm.linkedNPCs[0].name).toBe('Eithan Deeproot');

      // Switch to second statblock
      wrapper.vm.selectMonster("Tariel's Cloister", 0);
      await nextTick();

      expect(wrapper.vm.linkedNPCs).toHaveLength(1);
      expect(wrapper.vm.linkedNPCs[0].name).toBe('Zathira, the Resolute Seer');
    });
  });
});
