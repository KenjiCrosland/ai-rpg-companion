/**
 * setting-storage.mjs
 *
 * Setting-side helpers for the cross-tool substrate. Read/write directly
 * against the `gameSettings` localStorage key — no Vue reactivity, no
 * Pinia, so the helpers are unit-testable in jsdom with just localStorage.
 *
 * Settings store NPC stubs in `setting.npcs[]` after overview generation.
 * Once a Phase 2 Item → Setting flow ships, those stubs may carry a
 * `seeded_from` metadata object whose `source_type` / `source_id` /
 * `stub_name` let promotion of the stub trace back to the originating
 * tool's stub (so cross-container back-link writes can fire).
 */

const STORAGE_KEY = 'gameSettings';

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function readSettings() {
  const parsed = safeParse(localStorage.getItem(STORAGE_KEY), null);
  return Array.isArray(parsed) ? parsed : [];
}

function persistSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

/**
 * Build a SeededInput from a setting record + the name of one of its NPC
 * stubs. Used when the user clicks "Create NPC" on a stub in the setting's
 * NPC tab.
 *
 * If the stub carries `seeded_from` (because it was originally seeded from
 * an item or another tool), that metadata is propagated onto the SeededInput
 * entity so the dispatcher can write secondary edges and cross-container
 * back-links on promotion.
 *
 * Returns null if the setting or stub cannot be located.
 *
 * @param {Object} params
 * @param {string} params.fromId       - Setting id (`set_${ts}_${rand}`)
 * @param {string} params.entityName   - Name of the NPC stub to seed from
 * @returns {Object|null}
 */
export function buildSeededInputFromSetting({ fromId, entityName }) {
  if (!fromId || !entityName) return null;
  const settings = readSettings();
  const setting = settings.find(s => s?.id === fromId);
  if (!setting || !Array.isArray(setting.npcs)) return null;

  const target = entityName.trim().toLowerCase();
  const stub = setting.npcs.find(n => (n?.name || '').trim().toLowerCase() === target);
  if (!stub) return null;

  return {
    source: {
      type: 'setting',
      id: setting.id,
      name: setting.place_name || 'Unnamed Setting',
      description: setting.setting_overview?.overview || '',
    },
    entities: [{
      type: 'npc',
      name: (stub.name || '').trim(),
      role_or_description: (stub.short_description || stub.description || '').trim(),
      seeded_from: stub.seeded_from || undefined,
    }],
  };
}

/**
 * Update the matching NPC stub in a setting with the canonical NPC's id
 * and folder. Called by the writeBack dispatcher after a successful NPC
 * promotion. Idempotent.
 *
 * @param {string} settingId
 * @param {string} stubName
 * @param {string} npcId
 * @returns {boolean} true if a stub was updated, false otherwise
 */
export function linkNPCToSettingStub(settingId, stubName, npcId) {
  if (!settingId || !stubName || !npcId) return false;

  const settings = readSettings();
  const setting = settings.find(s => s?.id === settingId);
  if (!setting || !Array.isArray(setting.npcs)) return false;

  const target = stubName.trim().toLowerCase();
  const stub = setting.npcs.find(n => (n?.name || '').trim().toLowerCase() === target);
  if (!stub) return false;

  stub.npc_id = npcId;
  // Defensive: legacy stubs may still carry npc_folder until the
  // drop-npc-folder migration runs for this user.
  delete stub.npc_folder;

  persistSettings(settings);
  return true;
}

/**
 * Direction-B sweep: walk every setting and update any stub whose
 * `seeded_from` points back at the given (sourceType, sourceId, stubName).
 * Called by source-side writeBack handlers (e.g., the item writeBack)
 * after they update their own stub, so settings that share the seed
 * also reflect the promotion.
 *
 * Idempotent — safe to call repeatedly.
 *
 * @param {string} originSourceType
 * @param {string} originSourceId
 * @param {string} originStubName
 * @param {string} npcId
 * @returns {number} count of setting stubs updated
 */
export function linkNPCToSettingStubsBySeed(originSourceType, originSourceId, originStubName, npcId) {
  if (!originSourceType || !originSourceId || !originStubName || !npcId) return 0;

  const settings = readSettings();
  let updated = 0;
  const targetStubName = originStubName.trim().toLowerCase();

  for (const setting of settings) {
    if (!Array.isArray(setting?.npcs)) continue;
    for (const stub of setting.npcs) {
      const from = stub?.seeded_from;
      if (!from) continue;
      if (from.source_type !== originSourceType) continue;
      if (from.source_id !== originSourceId) continue;
      const fromStub = (from.stub_name || '').trim().toLowerCase();
      if (fromStub !== targetStubName) continue;
      // Skip if already pointing at this npc — keeps the operation idempotent.
      if (stub.npc_id === npcId) continue;
      stub.npc_id = npcId;
      delete stub.npc_folder;
      updated++;
    }
  }

  if (updated > 0) {
    persistSettings(settings);
  }
  return updated;
}

/**
 * Find stubs in any setting whose `npc_id` matches the given canonical
 * NPC id. Used by the dispatcher to enumerate stubs that point at an NPC
 * being deleted, so the "Create NPC" affordance returns where the user
 * sees the stub.
 *
 * @param {string} npcId
 * @returns {Array<{settingId, settingName, stubName}>}
 */
export function findSettingStubsForNPC(npcId) {
  if (!npcId) return [];
  const settings = readSettings();
  const matches = [];
  for (const setting of settings) {
    if (!setting?.id || !Array.isArray(setting.npcs)) continue;
    for (const stub of setting.npcs) {
      if (stub?.npc_id === npcId) {
        matches.push({
          settingId: setting.id,
          settingName: setting.place_name || 'Unnamed Setting',
          stubName: stub.name,
        });
      }
    }
  }
  return matches;
}

/**
 * Fields produced by the full NPC generation pipeline. These get stripped
 * on stub-reset so the entry reverts to its pre-promotion shape and the
 * `migrateSettingNPCsToSharedStorage` re-sync path can't recreate the
 * canonical NPC the user just deleted.
 *
 * The two skip-rule fields the migration keys on (`read_aloud_description`
 * and `description_of_position`) MUST be in this list. Everything else is
 * generated metadata the stub doesn't need to retain.
 */
const NPC_GENERATED_FIELDS = [
  'read_aloud_description',
  'description_of_position',
  'reason_for_being_there',
  'distinctive_feature_or_mannerism',
  'character_secret',
  'character_name',
  'roleplaying_tips',
  'combined_details',
  'npcDescriptionPart1',
  'npcDescriptionPart2',
  'relationships',
  'statblock_name',
  'statblock_folder',
  'statblock_source',
  'statblock_id',
  'detailedDescription',
];

/**
 * Locate a setting by its stable id. Returns null when not found.
 *
 * @param {string} settingId
 * @returns {Object|null}
 */
export function getSettingById(settingId) {
  if (!settingId) return null;
  const settings = readSettings();
  return settings.find(s => s?.id === settingId) || null;
}

/**
 * All settings whose parentId matches the given id. Top-level settings
 * are reachable by passing `null`. Returns an empty array when nothing
 * matches.
 *
 * @param {string|null} parentId
 * @returns {Array<Object>}
 */
export function getChildSettings(parentId) {
  const settings = readSettings();
  return settings.filter(s => (s?.parentId ?? null) === (parentId ?? null));
}

/**
 * All settings that share a parent with the given setting, excluding
 * the setting itself. Returns an empty array when the setting can't be
 * found (so the caller never has to special-case the not-found case
 * for downstream `applyInheritanceFromSiblings`).
 *
 * @param {string} settingId
 * @returns {Array<Object>}
 */
export function getSiblingSettings(settingId) {
  if (!settingId) return [];
  const settings = readSettings();
  const self = settings.find(s => s?.id === settingId);
  if (!self) return [];
  const parentId = self.parentId ?? null;
  return settings.filter(s =>
    s?.id !== settingId
    && (s?.parentId ?? null) === parentId
  );
}

/**
 * Names that should be treated as "scale-mismatched siblings" for the
 * given setting — places that are really at the parent's scale, but
 * tend to surface in this setting's prose because they're mentioned as
 * adjacent regions/polities. The extraction LLM has no aunt/uncle slot
 * in the parent/sibling/sublocation/feature schema, so it defaults to
 * 'sibling' and produces incoherent peer claims (a city listed as
 * sibling of a region, etc.).
 *
 * Returns names from two sources:
 *   - Realized: settings that share the parent's parentId (the
 *     parent's tree-siblings, i.e. this setting's aunts/uncles).
 *   - Stubs: sibling-kind entries on the parent's own related_places
 *     list (the parent's extraction already labelled them as
 *     parent-scale peers, promoted or not).
 *
 * Top-level settings (no parent) return an empty array — they have no
 * scale above them to mismatch against.
 *
 * Pure function — does not mutate inputs. Names are returned with
 * original casing; callers normalize for matching.
 *
 * @param {Object} setting
 * @param {Array<Object>} allSettings
 * @returns {Array<string>}
 */
export function auntUncleNamesFor(setting, allSettings) {
  const out = [];
  if (!setting || !setting.parentId) return out;
  const all = Array.isArray(allSettings) ? allSettings : [];
  const parent = all.find(s => s?.id === setting.parentId);
  if (!parent) return out;

  const parentParentId = parent.parentId ?? null;
  for (const s of all) {
    if (!s || s.id === parent.id) continue;
    if ((s.parentId ?? null) !== parentParentId) continue;
    if (s.place_name) out.push(s.place_name);
  }

  if (Array.isArray(parent.related_places)) {
    for (const stub of parent.related_places) {
      if (stub?.kind === 'sibling' && stub.name) out.push(stub.name);
    }
  }

  return out;
}

/**
 * Reconcile a freshly-extracted batch of related_places against the
 * setting's existing array. Mirrors `mergeStubs` from the item-side
 * related-settings extraction:
 *
 *   - Promoted stubs (`promoted_setting_id` present) are sacred and
 *     survive every rescan untouched — the user has invested an
 *     LLM call into promoting them; we don't drop or rename.
 *   - Unpromoted stubs are dropped; the fresh extraction is
 *     authoritative for the unpromoted slice. Variant names from
 *     prior scans evaporate (the LLM's latest read of the prose wins).
 *   - Fresh stubs whose case-insensitive name matches a promoted stub
 *     are dropped — keeps re-extractions from resurrecting an unpromoted
 *     twin alongside the promoted one.
 *   - Fresh stubs are deduped by case-insensitive name (defensive
 *     against the LLM emitting the same place twice with different
 *     casing).
 *
 * Pure function — does not mutate inputs.
 *
 * @param {Array<Object>} existing - current setting.related_places
 * @param {Array<Object>} fresh    - newly-extracted stubs (validated shape)
 * @returns {Array<Object>}
 */
export function mergeRelatedPlaces(existing, fresh) {
  const existingArr = Array.isArray(existing) ? existing : [];
  const freshArr = Array.isArray(fresh) ? fresh : [];

  // Keep promoted entries verbatim.
  const promoted = existingArr
    .filter(s => s && s.promoted_setting_id)
    .map(s => ({ ...s }));

  const seen = new Set(
    promoted
      .map(s => (s.name || '').trim().toLowerCase())
      .filter(Boolean)
  );

  const reconciled = [...promoted];
  for (const stub of freshArr) {
    const name = (stub?.name || '').trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    reconciled.push({
      name,
      kind: stub.kind || 'feature',
      source_quote: (stub.source_quote || '').trim(),
      role_brief: (stub.role_brief || '').trim(),
      suggested_setting_type: (stub.suggested_setting_type || '').trim(),
      promoted_setting_id: null,
    });
  }

  return reconciled;
}

/**
 * For each fresh related-places stub whose name matches an existing
 * setting in the library (case-insensitive), pre-fill its
 * `promoted_setting_id` so the UI shows "View in Setting Generator"
 * instead of "Create Setting" — and so the next promote click links
 * to the existing setting rather than creating a duplicate.
 *
 * Skips entries that already carry a `promoted_setting_id` (caller
 * may have set them explicitly).
 *
 * Pure function — does not mutate inputs. Returns a new array.
 *
 * @param {Array<Object>} places   - fresh stubs from extraction
 * @param {Array<Object>} allSettings - the user's full library
 * @returns {Array<Object>}
 */
export function linkExistingSettingsByName(places, allSettings) {
  if (!Array.isArray(places)) return [];
  const settings = Array.isArray(allSettings) ? allSettings : [];
  const byName = new Map();
  for (const s of settings) {
    if (!s?.id || !s.place_name) continue;
    const key = s.place_name.trim().toLowerCase();
    if (!key || byName.has(key)) continue; // first-match wins on duplicate names
    byName.set(key, s.id);
  }
  return places.map(p => {
    if (!p || typeof p !== 'object') return p;
    if (p.promoted_setting_id) return p;
    const key = (p.name || '').trim().toLowerCase();
    if (!key) return p;
    const existingId = byName.get(key);
    if (!existingId) return p;
    return { ...p, promoted_setting_id: existingId };
  });
}

/**
 * Drop extracted entries whose name matches a place already realized
 * in the user's setting tree (ancestors or siblings of the current
 * setting). Compare case-insensitively. Pure function — does not
 * mutate inputs.
 *
 * Why this isn't in the prompt: the live tree changes between
 * generations (a sibling promoted yesterday should suppress today's
 * re-extraction of the same name). The merge step has the live tree
 * state; the prompt does not.
 *
 * @param {Array<Object>} places   - freshly-extracted stubs
 * @param {Array<string>} excludeNames - names of settings that already
 *   exist in the relevant tree slice (the current setting itself,
 *   its ancestors, its siblings under the same parent)
 * @returns {Array<Object>}
 */
export function filterRelatedPlacesByExistingNames(places, excludeNames) {
  if (!Array.isArray(places)) return [];
  const blocked = new Set(
    (Array.isArray(excludeNames) ? excludeNames : [])
      .map(n => (n || '').trim().toLowerCase())
      .filter(Boolean)
  );
  if (blocked.size === 0) return places.slice();
  return places.filter(p => !blocked.has((p?.name || '').trim().toLowerCase()));
}

/**
 * Move a setting under a different parent (or to top-level when
 * `newParentId` is null). The atomic primitive behind the "promote
 * region-named entity as the new parent of this setting" flow in the
 * Locations tab.
 *
 * Refuses to write — and returns a structured reason — when:
 *   - settingId is missing or doesn't resolve in storage
 *   - newParentId is set but doesn't resolve in storage
 *   - newParentId === settingId (self-loop)
 *   - newParentId is a descendant of settingId (cycle, per wouldCreateCycle)
 *
 * Idempotent: when the setting is already under the requested parent,
 * returns ok without writing.
 *
 * @param {string} settingId
 * @param {string|null} newParentId  - null promotes to top-level
 * @returns {{ok: boolean, reason?: string}}
 */
export function reparentSetting(settingId, newParentId) {
  if (!settingId) return { ok: false, reason: 'missing-setting-id' };

  const settings = readSettings();
  const target = settings.find(s => s?.id === settingId);
  if (!target) return { ok: false, reason: 'setting-not-found' };

  // Normalize: explicit null → top-level. undefined treated the same
  // so callers don't have to be precious about which falsy value to pass.
  const resolvedParentId = newParentId || null;

  if (resolvedParentId && !settings.some(s => s?.id === resolvedParentId)) {
    return { ok: false, reason: 'parent-not-found' };
  }
  if (resolvedParentId === settingId) {
    return { ok: false, reason: 'self-parent' };
  }
  if (wouldCreateCycle(settingId, resolvedParentId)) {
    return { ok: false, reason: 'would-create-cycle' };
  }

  if ((target.parentId ?? null) === resolvedParentId) {
    // Already under that parent — no write needed. Returning ok keeps
    // callers from having to special-case the no-op.
    return { ok: true };
  }

  target.parentId = resolvedParentId;
  persistSettings(settings);
  return { ok: true };
}

/**
 * Guard for the reparent operation. Returns true when reparenting
 * `settingId` under `proposedParentId` would create a cycle in the
 * parent chain — either because the proposed parent is the setting
 * itself, or because the proposed parent is a descendant of the
 * setting.
 *
 * Walks up from the proposed parent following parentId pointers; if
 * the walk reaches `settingId`, the proposed reparent would close a
 * loop. The walk also bails out if it visits any id twice (defensive
 * against pre-existing malformed data), so this returns true rather
 * than spinning.
 *
 * Passing a null proposed parent (promoting to top-level) is always
 * safe and returns false.
 *
 * @param {string} settingId           - setting being reparented
 * @param {string|null} proposedParentId
 * @returns {boolean}
 */
export function wouldCreateCycle(settingId, proposedParentId) {
  if (!settingId) return false;
  if (proposedParentId == null) return false;
  if (proposedParentId === settingId) return true;

  const settings = readSettings();
  const byId = new Map();
  for (const s of settings) {
    if (s?.id) byId.set(s.id, s);
  }

  const visited = new Set();
  let cursor = proposedParentId;
  while (cursor) {
    if (cursor === settingId) return true;
    if (visited.has(cursor)) return true;
    visited.add(cursor);
    const node = byId.get(cursor);
    if (!node) return false;
    cursor = node.parentId ?? null;
  }
  return false;
}

/**
 * Compose a concise brief for a setting from its existing structured
 * fields. Used by cross-tool seeded prompts to surface relationship-
 * critical context for sibling settings (e.g., "the Tockwrought Vault
 * is in the Mwythig, ruled by Llew ap Madog") so the LLM doesn't
 * reinvent regions / rulers / families when generating co-realized
 * settings from the same item.
 *
 * Pure function — no AI call, no localStorage. Reads only the
 * structured fields the overview-generation prompt populates:
 *   - place_name (or setting_overview.name)
 *   - setting_overview.title (epithet)
 *   - setting_overview.relation_to_larger_setting (Region section)
 *   - setting_overview.current_ruler_sentence (Leadership section)
 *
 * Returns an empty string when there's no setting or it has no
 * meaningful structured data. Token budget: ~80-150 tokens per
 * brief on a fully-fleshed setting.
 *
 * @param {Object|null} setting
 * @returns {string}
 */
export function getSettingBrief(setting) {
  if (!setting || typeof setting !== 'object') return '';
  const ov = setting.setting_overview || {};

  const name = (setting.place_name || ov.name || '').trim();
  const title = (ov.title || '').trim();
  const region = (ov.relation_to_larger_setting || '').trim();
  const leadership = (ov.current_ruler_sentence || '').trim();

  if (!name && !region && !leadership) return '';

  const lines = [];
  if (name) {
    lines.push(title ? `${name} (${title})` : name);
  }
  if (region) {
    lines.push(`Region: ${region}`);
  }
  if (leadership) {
    lines.push(`Leadership: ${leadership}`);
  }
  return lines.join('\n');
}

/**
 * Clear the denormalized source-provenance fields on every setting
 * whose `sourceType` / `sourceId` points at the given source entity.
 * Called when the source entity is deleted (e.g., an item is removed
 * in the Item Generator) so the setting's "Inspired by [X]" link
 * doesn't keep rendering as a live link to a gone-source.
 *
 * The reference graph (`tool-references`) is cleaned up separately by
 * `removeReferencesForEntity` — this helper just clears the
 * denormalized fast-path fields the setting card reads at render
 * time.
 *
 * @param {string} sourceType - 'item' | 'dungeon' | 'setting' | …
 * @param {string} sourceId
 * @returns {number} count of settings cleared
 */
export function resetSettingSourceForDeletedEntity(sourceType, sourceId) {
  if (!sourceType || !sourceId) return 0;
  const settings = readSettings();
  let resetCount = 0;
  for (const setting of settings) {
    if (setting?.sourceType !== sourceType) continue;
    if (setting.sourceId !== sourceId) continue;
    delete setting.sourceType;
    delete setting.sourceId;
    delete setting.sourceName;
    resetCount++;
  }
  if (resetCount > 0) {
    persistSettings(settings);
  }
  return resetCount;
}

/**
 * Reset every setting stub pointing to the given NPC id back to its
 * pre-promotion shape. Counterpart to `findSettingStubsForNPC`, called
 * when the canonical NPC is deleted.
 *
 * Behavior: drop fields produced by full NPC generation (read_aloud_description,
 * description_of_position, npcDescriptionPart1, statblock pointers, etc.)
 * while preserving whatever stub-shape fields the entry started with —
 * `name`, `description` (setting-native short description), `role_or_description`
 * (cross-tool stubs), `seeded_from` (cross-container provenance), `faction`,
 * and any other non-generated fields. Also clears `npc_id`/`npc_folder`.
 *
 * Why drop the generated fields: `migrateSettingNPCsToSharedStorage` runs
 * on every NPCGenerator load and re-syncs entries with `read_aloud_description`
 * or `description_of_position` into the canonical store. Without stripping,
 * the next load recreates the deleted NPC.
 *
 * The user can re-promote the stub later, getting a fresh generation
 * that starts from the preserved short description.
 *
 * @param {string} npcId
 * @returns {number} count of stubs reset
 */
export function resetSettingStubsForDeletedNPC(npcId) {
  if (!npcId) return 0;
  const settings = readSettings();
  let resetCount = 0;
  for (const setting of settings) {
    if (!Array.isArray(setting?.npcs)) continue;
    for (const stub of setting.npcs) {
      if (stub?.npc_id !== npcId) continue;
      stub.npc_id = null;
      delete stub.npc_folder;
      for (const field of NPC_GENERATED_FIELDS) {
        delete stub[field];
      }
      resetCount++;
    }
  }
  if (resetCount > 0) {
    persistSettings(settings);
  }
  return resetCount;
}
