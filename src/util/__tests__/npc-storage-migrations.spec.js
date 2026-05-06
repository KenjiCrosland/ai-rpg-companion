/**
 * @jest-environment jsdom
 *
 * Regression coverage for `migrateSettingNPCsToSharedStorage` and
 * `migrateDungeonNPCsToSharedStorage`. These run on every NPCGenerator
 * load, so they must respect user-driven folder moves: an NPC that the
 * user dragged out of the setting/dungeon folder into a folder of their
 * own choosing must NOT get yanked back on next load.
 */

import {
  migrateSettingNPCsToSharedStorage,
  migrateDungeonNPCsToSharedStorage,
} from '../npc-storage.mjs';

describe('cross-tool NPC migrations respect user folder organization', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('migrateSettingNPCsToSharedStorage', () => {
    it('does not re-migrate an NPC that has been moved to another folder', () => {
      // Setting still has the NPC entry (with full content) — that's
      // expected after a successful generation.
      localStorage.setItem('gameSettings', JSON.stringify([
        {
          id: 'set_a',
          place_name: 'Whitepeak',
          npcs: [
            {
              npc_id: 'npc_yel',
              name: 'Yelena',
              read_aloud_description: 'A tall woman with piercing eyes.',
              description_of_position: 'Town oracle.',
            },
          ],
        },
      ]));

      // Canonical NPC currently lives in the user's "Heroes" folder, NOT
      // in the setting-named "Whitepeak" folder.
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Heroes': [{
          npc_id: 'npc_yel',
          npcDescriptionPart1: {
            character_name: 'Yelena',
            read_aloud_description: 'A tall woman with piercing eyes.',
            description_of_position: 'Town oracle.',
          },
        }],
      }));

      const migrated = migrateSettingNPCsToSharedStorage();

      // Migration should treat the NPC as already-present and leave it
      // alone. No new copy in "Whitepeak"; the NPC stays in "Heroes".
      expect(migrated).toBe(0);

      const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(stored.Heroes).toHaveLength(1);
      expect(stored.Heroes[0].npc_id).toBe('npc_yel');
      expect(stored).not.toHaveProperty('Whitepeak');
    });

    it('still migrates an NPC that genuinely is missing from the canonical store', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        {
          id: 'set_a',
          place_name: 'Whitepeak',
          npcs: [
            {
              npc_id: 'npc_new',
              name: 'New NPC',
              read_aloud_description: 'desc',
              description_of_position: 'role',
            },
          ],
        },
      ]));
      // Canonical store has no record of this NPC.
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({}));

      const migrated = migrateSettingNPCsToSharedStorage();

      expect(migrated).toBe(1);
      const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(stored.Whitepeak).toHaveLength(1);
      expect(stored.Whitepeak[0].npc_id).toBe('npc_new');
    });

    it('skips entries without read_aloud_description or description_of_position', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        {
          id: 'set_a',
          place_name: 'Whitepeak',
          npcs: [
            // Bare stub — no rich content.
            { npc_id: 'npc_stub', name: 'Bare Stub', description: 'a wanderer' },
          ],
        },
      ]));
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({}));

      const migrated = migrateSettingNPCsToSharedStorage();

      expect(migrated).toBe(0);
      const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(stored).not.toHaveProperty('Whitepeak');
    });
  });

  describe('migrateDungeonNPCsToSharedStorage', () => {
    it('does not re-migrate an NPC that has been moved to another folder', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dng_a',
          dungeonOverview: { name: 'Crypt of Ash' },
          npcs: [
            {
              npc_id: 'npc_skg',
              name: 'Skragbit',
              read_aloud_description: 'A wiry goblin shaman.',
              description_of_position: 'Tribal shaman.',
            },
          ],
        },
      ]));

      // User moved the canonical to "Villains".
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Villains': [{
          npc_id: 'npc_skg',
          npcDescriptionPart1: {
            character_name: 'Skragbit',
            read_aloud_description: 'A wiry goblin shaman.',
            description_of_position: 'Tribal shaman.',
          },
        }],
      }));

      const migrated = migrateDungeonNPCsToSharedStorage();

      expect(migrated).toBe(0);
      const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(stored.Villains).toHaveLength(1);
      expect(stored).not.toHaveProperty('Crypt of Ash');
    });
  });
});
