/**
 * @jest-environment jsdom
 *
 * Coverage for `getNPCStatblockRef` — the helper that resolves an
 * NPC's statblock reference across the two stores involved in cross-
 * tool NPC display:
 *
 *   1. CANONICAL (`npcGeneratorNPCs`): nested under
 *      `npcDescriptionPart1.statblock_name` and `.statblock_folder`
 *      after the `promote-npc-statblock-ref-to-nested` migration.
 *   2. LOCAL fallback: dungeon/setting-local denormalized copy with
 *      top-level `statblock_name` (the correct shape for that store).
 *
 * The bug this helper exists to prevent: dungeon and setting NPC tabs
 * read only the legacy top-level location on the canonical record, so
 * when a user generated a statblock from inside the NPC Generator
 * (which writes to the canonical nested location), the dungeon's NPC
 * card showed no statblock — even though the linkage was saved
 * correctly. Helper centralizes the resolution; migration removed the
 * legacy-on-canonical case so the helper no longer needs to handle it.
 */

import { getNPCStatblockRef } from '../npc-storage.mjs';

describe('getNPCStatblockRef', () => {
  describe('canonical (nested) shape — NPC Generator write path', () => {
    it('reads statblock_name and statblock_folder nested under npcDescriptionPart1', () => {
      const canonicalNPC = {
        npc_id: 'npc_1',
        npcDescriptionPart1: {
          character_name: 'Vakhsh the Hider',
          statblock_name: 'Vakhsh-the-Hider',
          statblock_folder: 'NPC Statblocks',
        },
      };
      expect(getNPCStatblockRef(canonicalNPC)).toEqual({
        statblock_name: 'Vakhsh-the-Hider',
        statblock_folder: 'NPC Statblocks',
      });
    });

    it('returns nulls when canonicalNPC has neither nested nor any fallback', () => {
      // Post-migration shape: a canonical NPC without a statblock has
      // no `statblock_name` anywhere. The function returns nulls.
      const canonicalNPC = {
        npc_id: 'npc_1',
        npcDescriptionPart1: { character_name: 'Plain NPC' },
      };
      expect(getNPCStatblockRef(canonicalNPC)).toEqual({
        statblock_name: null,
        statblock_folder: null,
      });
    });
  });

  describe('local fallback NPC (dungeon/setting denormalized copy)', () => {
    it('reads from fallback when canonical is missing the field', () => {
      // The dungeon/setting NPCsTab passes the local NPC as fallback
      // for NPCs that aren't (yet) in shared storage. Top-level
      // `statblock_name` is the correct shape for the dungeon-local
      // record (per `canonicalToDungeonNPC`), so reading it here is
      // canonical, not legacy.
      const dungeonLocalNPC = {
        name: 'Local NPC',
        statblock_name: 'Local-Statblock',
        statblock_folder: 'Dungeon Folder',
      };
      expect(getNPCStatblockRef(null, dungeonLocalNPC)).toEqual({
        statblock_name: 'Local-Statblock',
        statblock_folder: 'Dungeon Folder',
      });
    });

    it('canonical (nested) wins over fallback when both have the field', () => {
      const canonicalNPC = {
        npcDescriptionPart1: {
          statblock_name: 'Canonical-Statblock',
          statblock_folder: 'NPC Statblocks',
        },
      };
      const fallbackNPC = {
        statblock_name: 'Local-Statblock',
        statblock_folder: 'Local Folder',
      };
      expect(getNPCStatblockRef(canonicalNPC, fallbackNPC)).toEqual({
        statblock_name: 'Canonical-Statblock',
        statblock_folder: 'NPC Statblocks',
      });
    });
  });

  describe('absence cases', () => {
    it('returns nulls when neither argument has the fields', () => {
      expect(getNPCStatblockRef({ npcDescriptionPart1: {} }, {})).toEqual({
        statblock_name: null,
        statblock_folder: null,
      });
    });

    it('returns nulls for null/undefined inputs', () => {
      expect(getNPCStatblockRef(null, null)).toEqual({
        statblock_name: null,
        statblock_folder: null,
      });
      expect(getNPCStatblockRef(undefined, undefined)).toEqual({
        statblock_name: null,
        statblock_folder: null,
      });
    });

    it('does NOT read top-level statblock_name on a canonical NPC (legacy location)', () => {
      // Regression guard: if a malformed/unmigrated canonical record
      // somehow has top-level `statblock_name` despite the migration,
      // the helper ignores it. Top-level on canonical was the bug
      // shape; the migration removes it. Reading it here would
      // re-introduce the dual-read pattern this consolidation aimed
      // to retire.
      const malformedCanonical = {
        npc_id: 'npc_1',
        npcDescriptionPart1: { character_name: 'Stripped' },
        statblock_name: 'Should-Be-Ignored',
        statblock_folder: 'Should-Be-Ignored',
      };
      expect(getNPCStatblockRef(malformedCanonical)).toEqual({
        statblock_name: null,
        statblock_folder: null,
      });
    });

    it('partial fields resolve independently', () => {
      // Name and folder resolve from independent sources — useful when
      // a fallback record carries one and the canonical the other.
      const canonicalNPC = {
        npcDescriptionPart1: { statblock_name: 'From-Canonical' },
      };
      const fallbackNPC = { statblock_folder: 'From-Local' };
      expect(getNPCStatblockRef(canonicalNPC, fallbackNPC)).toEqual({
        statblock_name: 'From-Canonical',
        statblock_folder: 'From-Local',
      });
    });
  });
});
