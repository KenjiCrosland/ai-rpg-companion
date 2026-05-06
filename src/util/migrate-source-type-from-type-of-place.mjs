/**
 * migrate-source-type-from-type-of-place.mjs
 *
 * Best-effort backfill that sets `sourceType` on NPCs whose `typeOfPlace`
 * matches a known dungeon or setting name. Used at NPC Generator mount
 * to recover the source attribution of NPCs created before the
 * `sourceType` field existed.
 *
 * IMPORTANT: this migration only sets `sourceType` on NPCs that don't
 * already have one. Item-sourced NPCs (and any other source-tagged NPC)
 * are left untouched even if their `typeOfPlace` happens to match a
 * dungeon / setting name — which protects against the edge case where
 * an item-sourced NPC's role_brief shares a name with an unrelated
 * dungeon (e.g., the role_brief "Creator of the Crypt of Ash" and a
 * dungeon also named "Crypt of Ash").
 */

const NPCS_KEY = 'npcGeneratorNPCs';
const DUNGEONS_KEY = 'dungeons';
const SETTINGS_KEY = 'gameSettings';

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function migrateSourceTypeFromTypeOfPlace() {
  const npcs = safeParse(localStorage.getItem(NPCS_KEY), null);
  if (!npcs || typeof npcs !== 'object') return 0;

  const dungeons = safeParse(localStorage.getItem(DUNGEONS_KEY), []);
  const dungeonNames = new Set(
    Array.isArray(dungeons)
      ? dungeons.map(d => d?.dungeonOverview?.name || d?.overview?.name).filter(Boolean)
      : []
  );

  const settings = safeParse(localStorage.getItem(SETTINGS_KEY), []);
  const settingNames = new Set(
    Array.isArray(settings)
      ? settings.map(s => s?.place_name || s?.setting_overview?.name).filter(Boolean)
      : []
  );

  let migratedCount = 0;
  let changed = false;

  for (const folderName in npcs) {
    const folder = npcs[folderName];
    if (!Array.isArray(folder)) continue;

    for (const npc of folder) {
      if (!npc || npc.sourceType) continue;
      if (!npc.typeOfPlace) continue;

      if (dungeonNames.has(npc.typeOfPlace)) {
        npc.sourceType = 'dungeon';
        migratedCount++;
        changed = true;
      } else if (settingNames.has(npc.typeOfPlace)) {
        npc.sourceType = 'setting';
        migratedCount++;
        changed = true;
      }
    }
  }

  if (changed) {
    localStorage.setItem(NPCS_KEY, JSON.stringify(npcs));
  }

  return migratedCount;
}
