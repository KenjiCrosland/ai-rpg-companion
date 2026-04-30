/**
 * seeded-input.mjs
 *
 * Substrate for cross-tool seeded entity flows.
 *
 * A "seeded input" describes a source-tool entity (item / dungeon / setting /
 * encounter) plus the named entities (NPCs, factions, locations, items) it
 * wants a destination tool to materialize. New flows slot in by adding a
 * builder + a row in `PROMOTION_RELATIONSHIPS` + (optionally) a prefill
 * renderer.
 *
 * This module is the single source of truth for source-tool ×
 * destination-entity → relationship lookups. The relationship strings
 * ('mentioned_in_item', 'appears_in_dungeon', 'appears_in_setting',
 * 'inspired_by_item', etc.) appear only in `PROMOTION_RELATIONSHIPS`
 * below and in `extract-existing-references.mjs` (the legacy-data
 * extractor that predates this module).
 *
 * Canonical SeededInput shape:
 *
 *   {
 *     source: {
 *       type: 'item' | 'dungeon' | 'setting' | 'encounter',
 *       id: string,
 *       name: string,
 *       description: string,
 *       quote?: string,
 *       // ...source-specific extras (e.g., item_type, rarity)
 *     },
 *     destination?: {
 *       // Set by the caller right after loadSeededInput. Defaults to
 *       // { type: 'npc' } at the dispatcher when absent (back-compat).
 *       type: 'npc' | 'setting' | 'dungeon' | 'statblock' | ...,
 *     },
 *     entities: Array<{
 *       type: 'npc' | 'faction' | 'location' | 'item',
 *       id?: string,
 *       name: string,
 *       role_or_description: string,
 *       seeded_from?: {
 *         // Cross-container provenance. Populated when this entity was
 *         // copied from another tool's stub (e.g., an item's stub seeded
 *         // into a setting's NPC tab). Lets the dispatcher write
 *         // secondary edges and update the origin-side stub on
 *         // promotion.
 *         source_type: 'item' | ...,
 *         source_id: string,
 *         source_name: string,
 *         stub_name: string,
 *       },
 *       // ...source-specific extras (e.g., context)
 *     }>
 *   }
 */

import { addReference } from './reference-storage.mjs';
import {
  buildSeededInputFromItem,
  linkNPCToItemStub,
  findItemStubsForNPC,
  resetItemStubsForDeletedNPC,
} from './item-storage.mjs';
import {
  buildSeededInputFromSetting,
  linkNPCToSettingStub,
  linkNPCToSettingStubsBySeed,
  findSettingStubsForNPC,
  resetSettingStubsForDeletedNPC,
} from './setting-storage.mjs';
import {
  buildSeededInputFromDungeon,
  linkNPCToDungeonStub,
  linkNPCToDungeonStubsBySeed,
  findDungeonStubsForNPC,
  resetDungeonStubsForDeletedNPC,
} from './dungeon-storage.mjs';
import { buildPrefilledTypeOfPlace } from '@/prompts/item-npc-prompts.mjs';

// ─── Lookup maps ─────────────────────────────────────────────────────────────

/**
 * Promotion relationships keyed on (source_tool, destination_entity_type).
 *
 * Direction of every edge written through this map: destination_entity →
 * relationship_name → source_tool_entity. (For NPC-as-destination edges
 * the destination IS an npc; for setting/dungeon-as-destination edges
 * the destination is the new setting/dungeon record.)
 *
 * Adding a new flow = adding a row. Adding a new destination type for an
 * existing source = adding a key.
 */
const PROMOTION_RELATIONSHIPS = Object.freeze({
  item: Object.freeze({
    npc:     'mentioned_in_item',
    setting: 'inspired_by_item',
    dungeon: 'inspired_by_item',
  }),
  setting: Object.freeze({
    npc: 'appears_in_setting',
  }),
  dungeon: Object.freeze({
    npc: 'appears_in_dungeon',
  }),
});

/**
 * Source-type → tool id (for navigateToTool) and display name. Generalizes
 * the previous hardcoded `sourceType === 'dungeon' ? 'Dungeon Generator' :
 * 'Setting Generator'` ternary in the NPC Generator's "back to source
 * tool" UI.
 */
const SOURCE_TYPE_TO_TOOL = Object.freeze({
  item:    { id: 'item-generator',    name: 'Item Generator' },
  dungeon: { id: 'dungeon-generator', name: 'Dungeon Generator' },
  setting: { id: 'setting-generator', name: 'Setting Generator' },
});

// ─── Per-source dispatchers ──────────────────────────────────────────────────
//
// New source types slot in by adding a builder / writeBack / stub finder /
// stub resetter / prefill entry below. NPCGenerator.vue does not branch on
// source type; it calls the dispatcher and the right per-source code runs.

const builders = Object.freeze({
  item: buildSeededInputFromItem,
  setting: buildSeededInputFromSetting,
  dungeon: buildSeededInputFromDungeon,
});

const writeBacks = Object.freeze({
  // Item writeBack: update the item's own stub (existing behavior) AND
  // sweep settings/dungeons for stubs whose `seeded_from` points back at
  // this item-stub (Direction-B cross-container symmetry — prevents
  // duplicate-Yelena across sessions when the user promotes from the
  // item card).
  item: (seededInput, npc) => {
    const stubName = seededInput?.entities?.[0]?.name;
    if (!stubName || !npc?.npc_id) return false;
    const folder = npc.folderName || 'Uncategorized';
    const linked = linkNPCToItemStub(seededInput.source.id, stubName, npc.npc_id, folder);
    linkNPCToSettingStubsBySeed('item', seededInput.source.id, stubName, npc.npc_id, folder);
    linkNPCToDungeonStubsBySeed('item', seededInput.source.id, stubName, npc.npc_id, folder);
    return linked;
  },
  // Setting/dungeon writeBacks update only their own stub; the dispatcher's
  // entities[i].seeded_from iteration handles the reverse direction by
  // calling the seeded_from source-type's writeBack (typically item),
  // which itself runs the Direction-B sweep above.
  setting: (seededInput, npc) => {
    const stubName = seededInput?.entities?.[0]?.name;
    if (!stubName || !npc?.npc_id) return false;
    return linkNPCToSettingStub(
      seededInput.source.id,
      stubName,
      npc.npc_id,
      npc.folderName || 'Uncategorized'
    );
  },
  dungeon: (seededInput, npc) => {
    const stubName = seededInput?.entities?.[0]?.name;
    if (!stubName || !npc?.npc_id) return false;
    return linkNPCToDungeonStub(
      seededInput.source.id,
      stubName,
      npc.npc_id,
      npc.folderName || 'Uncategorized'
    );
  },
});

const stubFinders = Object.freeze({
  item: (npcId) => findItemStubsForNPC(npcId).map(m => ({
    sourceType: 'item',
    sourceId: m.itemName,
    sourceName: m.itemName,
    stubName: m.stubName,
  })),
  setting: (npcId) => findSettingStubsForNPC(npcId).map(m => ({
    sourceType: 'setting',
    sourceId: m.settingId,
    sourceName: m.settingName,
    stubName: m.stubName,
  })),
  dungeon: (npcId) => findDungeonStubsForNPC(npcId).map(m => ({
    sourceType: 'dungeon',
    sourceId: m.dungeonId,
    sourceName: m.dungeonName,
    stubName: m.stubName,
  })),
});

const stubResetters = Object.freeze({
  item: resetItemStubsForDeletedNPC,
  setting: resetSettingStubsForDeletedNPC,
  dungeon: resetDungeonStubsForDeletedNPC,
});

const prefills = Object.freeze({
  item: buildPrefilledTypeOfPlace,
  // Setting/dungeon prefills are minimal — the destination's own form is
  // the user-facing prompt assembly; here we just give the typeOfPlace
  // input something useful to start from. Flow-side work can refine.
  setting: (seededInput) => prefillFromStub(seededInput),
  dungeon: (seededInput) => prefillFromStub(seededInput),
});

function prefillFromStub(seededInput) {
  const stub = seededInput?.entities?.[0];
  if (!stub?.name) return '';
  const role = stub.role_or_description ? ` — ${stub.role_or_description}` : '';
  return `${stub.name}${role}`;
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Build a SeededInput from navigation params. Returns null if the source
 * type is unknown or the entity cannot be located.
 *
 * @param {Object} params
 * @param {string} params.fromType
 * @param {string} params.fromId
 * @param {string} [params.entityName]
 * @returns {Object|null}
 */
export function loadSeededInput({ fromType, fromId, entityName }) {
  if (!fromType || !fromId) return null;
  const builder = builders[fromType];
  if (!builder) return null;
  return builder({ fromId, entityName });
}

/**
 * Render the seeded entities + source quote as a prompt fragment for
 * paragraph generators (Setting / Dungeon overview prompts). No-op for
 * empty inputs. Quotes >800 chars are truncated to keep the paragraph
 * prompt within budget.
 *
 * @param {Object|null} seeded
 * @returns {string}
 */
export function renderSeededInputBlock(seeded) {
  if (!seeded || !Array.isArray(seeded.entities) || seeded.entities.length === 0) {
    return '';
  }

  const lines = ['SEEDED ENTITIES (must appear verbatim in the output):'];
  for (const e of seeded.entities) {
    const desc = e.role_or_description ? ` — ${e.role_or_description}` : '';
    lines.push(`- ${e.name} (${e.type})${desc}`);
  }

  const quote = seeded.source?.quote;
  if (quote) {
    const trimmed = quote.length > 800 ? `${quote.slice(0, 800)}…` : quote;
    lines.push('', 'SOURCE QUOTE:', trimmed);
  }

  return lines.join('\n');
}

/**
 * Build the destination-side prefill string (e.g., the NPC Generator's
 * `typeOfPlace` input). Dispatches on source type so future flows can
 * register their own prefill renderers without the NPC Generator
 * branching on source type.
 *
 * @param {Object} seededInput
 * @returns {string}
 */
export function buildPrefillForSeed(seededInput) {
  const fn = prefills[seededInput?.source?.type];
  return fn ? fn(seededInput) : '';
}

/**
 * Write the source-side back-link for a freshly promoted NPC.
 *
 * Two passes:
 *   1. Primary: call the writeBack for `seededInput.source.type` (e.g.,
 *      setting handler updates the setting's stub).
 *   2. Secondary: for each entity carrying `seeded_from`, call the
 *      writeBack registered for `seeded_from.source_type` so the
 *      origin-tool's stub is updated too. This is the Direction-A
 *      cross-container update — when a setting-tab promotion completes,
 *      the originating item-stub gets `npc_id` set so its UI flips from
 *      "Create NPC" to "View NPC."
 *
 * The secondary pass synthesizes a minimal SeededInput for the seeded_from
 * source so the writeBack can resolve its own stub.
 *
 * @param {Object} seededInput
 * @param {Object} npc          - { npc_id, name?, folderName? }
 * @returns {boolean}           True if the primary writeBack succeeded.
 */
export function writeBackPromotedNPC(seededInput, npc) {
  const primary = writeBacks[seededInput?.source?.type];
  const result = primary ? primary(seededInput, npc) : false;

  // Direction-A cross-container update: walk entities for seeded_from
  // metadata and run the corresponding writeBack against a synthesized
  // single-entity SeededInput pointing at the origin tool.
  for (const entity of (seededInput?.entities || [])) {
    const from = entity?.seeded_from;
    if (!from?.source_type || !from?.source_id || !from?.stub_name) continue;
    const secondary = writeBacks[from.source_type];
    if (!secondary) continue;
    secondary(
      {
        source: { type: from.source_type, id: from.source_id, name: from.source_name || from.source_id },
        entities: [{ type: entity.type, name: from.stub_name }],
      },
      npc
    );
  }

  return result;
}

/**
 * Write the promotion edge for a freshly-created destination entity.
 *
 * Direction: destination_entity → relationship → source_tool_entity. The
 * relationship is looked up from PROMOTION_RELATIONSHIPS keyed on
 * (source.type, destination.type). For NPC destinations carrying entities
 * with `seeded_from`, secondary edges are written too (cross-container
 * provenance — e.g., a setting-tab promotion of an item-seeded stub
 * writes both `appears_in_setting` and `mentioned_in_item`).
 *
 * @param {Object} seededInput
 * @param {Object} destination  - { type, id, name }. type defaults to 'npc'
 *                                for back-compat with Phase 1 callers that
 *                                passed an NPC object literal here.
 * @returns {string|null}       The primary reference id, or null.
 */
export function addReferenceForSeed(seededInput, destination) {
  // Resolve destination from the explicit arg first, falling back to
  // seededInput.destination for callers that stamp it on the seed.
  const dest = destination?.id ? destination : seededInput?.destination;
  const sourceType = seededInput?.source?.type;
  const destType = dest?.type || destination?.type || 'npc';
  const destId = dest?.id;
  const destName = dest?.name || destId;
  const relationship = PROMOTION_RELATIONSHIPS[sourceType]?.[destType];
  if (!relationship || !destId || !seededInput?.source?.id) return null;

  // Primary edge: destination → relationship → source_tool_entity.
  const primaryId = addReference({
    source_type: destType,
    source_id: destId,
    source_name: destName,
    target_type: sourceType,
    target_id: seededInput.source.id,
    target_name: seededInput.source.name || seededInput.source.id,
    relationship,
    context: seededInput.entities?.[0]?.name || '',
  });

  // Secondary edges: when the destination is an NPC and its source-side
  // entity carries cross-container provenance, write the additional edge
  // back to the original source-tool. This is the "promote a setting-tab
  // stub that originated as an item-stub" case — the resulting NPC needs
  // both `appears_in_setting` and `mentioned_in_item` edges.
  if (destType === 'npc') {
    for (const entity of (seededInput.entities || [])) {
      const from = entity?.seeded_from;
      if (!from) continue;
      const secondaryRel = PROMOTION_RELATIONSHIPS[from.source_type]?.npc;
      if (!secondaryRel || !from.source_id) continue;
      addReference({
        source_type: 'npc',
        source_id: destId,
        source_name: destName,
        target_type: from.source_type,
        target_id: from.source_id,
        target_name: from.source_name || from.source_id,
        relationship: secondaryRel,
        context: from.stub_name || '',
      });
    }
  }

  return primaryId;
}

/**
 * Walk every source tool's stub store and return matches that point to the
 * given NPC id. Today only items have stubs; future stub stores register
 * via the `stubFinders` map.
 *
 * @param {string} npcId
 * @returns {Array<{sourceType, sourceId, sourceName, stubName}>}
 */
export function findStubsReferencingNPC(npcId) {
  if (!npcId) return [];
  const matches = [];
  for (const finder of Object.values(stubFinders)) {
    const found = finder(npcId);
    if (Array.isArray(found)) matches.push(...found);
  }
  return matches;
}

/**
 * Reset every source tool's stub that pointed to the given NPC id (e.g.,
 * clear `npc_id` on item stubs so the source UI shows "Create NPC"
 * again). Returns the total count reset.
 *
 * @param {string} npcId
 * @returns {number}
 */
export function resetStubsForDeletedNPC(npcId) {
  if (!npcId) return 0;
  let total = 0;
  for (const reset of Object.values(stubResetters)) {
    total += reset(npcId) || 0;
  }
  return total;
}

/**
 * Look up the destination-tool display info for a source type.
 * Used by the NPC Generator's "back to source" link.
 *
 * @param {string} sourceType
 * @returns {{id: string, name: string} | null}
 */
export function getToolForSourceType(sourceType) {
  return SOURCE_TYPE_TO_TOOL[sourceType] || null;
}

/**
 * Targeted existence check for a single source-tool entity. Used by:
 *   - NPCCard.vue at render time, to suppress a "back to source" link
 *     when the source has been deleted (and append a "(deleted)" marker
 *     instead).
 *   - NPCGenerator.vue at save time, to auto-clear stale `sourceId` /
 *     `sourceName` fields so they don't accumulate.
 *
 * Mirrors the resolution logic in `sweep-orphan-references.mjs` but
 * targeted (no full-index build) so it's cheap to call per-NPC at render
 * time.
 *
 * Settings accept either a real `id` or the legacy `place_name` form
 * (mirrors orphan-sweep's defensive fallback). Dungeons string-coerce
 * for legacy numeric ids that may have escaped Phase 1's id migration.
 *
 * @param {string} type   - 'item' | 'setting' | 'dungeon' | 'statblock' | 'npc' | 'encounter'
 * @param {string} id
 * @returns {boolean}
 */
export function sourceExists(type, id) {
  if (!type || !id) return false;
  const safeParse = (raw, fallback) => {
    if (!raw) return fallback;
    try { return JSON.parse(raw); } catch { return fallback; }
  };

  switch (type) {
    case 'item': {
      const items = safeParse(localStorage.getItem('savedItems'), []);
      return Array.isArray(items) && items.some(i => i?.name === id);
    }
    case 'setting': {
      const settings = safeParse(localStorage.getItem('gameSettings'), []);
      if (!Array.isArray(settings)) return false;
      return settings.some(s => s?.id === id || s?.place_name === id);
    }
    case 'dungeon': {
      const dungeons = safeParse(localStorage.getItem('dungeons'), []);
      if (!Array.isArray(dungeons)) return false;
      const key = String(id);
      return dungeons.some(d => d?.id !== undefined && d?.id !== null && String(d.id) === key);
    }
    case 'statblock': {
      // Statblock id form: `${name}__${folder}` (mirrors reference-storage convention).
      const sep = id.lastIndexOf('__');
      if (sep === -1) return false;
      const sbName = id.slice(0, sep);
      const sbFolder = id.slice(sep + 2);
      const monsters = safeParse(localStorage.getItem('monsters'), {});
      const folder = monsters?.[sbFolder];
      return Array.isArray(folder) && folder.some(s => s?.name === sbName);
    }
    case 'npc': {
      const npcs = safeParse(localStorage.getItem('npcGeneratorNPCs'), {});
      if (!npcs || typeof npcs !== 'object') return false;
      for (const folder of Object.values(npcs)) {
        if (Array.isArray(folder) && folder.some(n => n?.npc_id === id)) return true;
      }
      return false;
    }
    case 'encounter': {
      // Encounter id form: `${folder}__${index}`.
      const sep = id.lastIndexOf('__');
      if (sep === -1) return false;
      const folder = id.slice(0, sep);
      const idx = Number(id.slice(sep + 2));
      if (!Number.isInteger(idx) || idx < 0) return false;
      const encounters = safeParse(localStorage.getItem('encounters'), {});
      const list = encounters?.[folder];
      return Array.isArray(list) && idx < list.length;
    }
    default:
      return false;
  }
}

/**
 * Write a membership edge for a member entity that is *already canonical*
 * (has its own id) into a container entity. Used at setting/dungeon
 * creation when a seeded stub turns out to be an existing real NPC — we
 * want the membership edge written immediately rather than waiting for a
 * promotion that won't happen.
 *
 * Edge direction: member → relationship → container. The relationship is
 * looked up from PROMOTION_RELATIONSHIPS[container.type][member.type],
 * which surfaces the same `appears_in_setting` / `appears_in_dungeon`
 * relationships used by the promotion path.
 *
 * Idempotent — `addReference` skips duplicates.
 *
 * @param {Object} member       - { type: 'npc', id, name }
 * @param {Object} container    - { type: 'setting' | 'dungeon', id, name }
 * @returns {string|null}       The new reference id, or null if dedup'd
 *                              or the relationship can't be looked up.
 */
export function addMembershipReferenceForCanonical(member, container) {
  if (!member?.id || !container?.id) return null;
  const memberType = member.type || 'npc';
  const containerType = container.type;
  const relationship = PROMOTION_RELATIONSHIPS[containerType]?.[memberType];
  if (!relationship) return null;

  return addReference({
    source_type: memberType,
    source_id: member.id,
    source_name: member.name || member.id,
    target_type: containerType,
    target_id: container.id,
    target_name: container.name || container.id,
    relationship,
    context: '',
  });
}
