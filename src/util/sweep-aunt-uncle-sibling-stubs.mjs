/**
 * sweep-aunt-uncle-sibling-stubs.mjs
 *
 * One-shot data sweep: removes sibling-kind related_places stubs
 * whose names match the setting's "aunt/uncle" set — places that are
 * really at the parent's scale, which the extraction LLM bucketed as
 * 'sibling' because the parent/sibling/sublocation/feature schema has
 * no aunt/uncle slot.
 *
 * Example bug this cleans up: "Union of Verdant States" (a region-
 * scale polity that's a peer of "Eldryssian plain") appeared as a
 * sibling on the Repubblica dei Cinque Martelli (a city-state under
 * the plain) AND on Aethelmar (a kingdom under the plain). Three
 * different scales, three duplicate stubs, all incoherent peer claims.
 *
 * The sweep drops the offending stubs regardless of promotion state.
 * If a promoted aunt/uncle existed, the underlying setting entity
 * stays in the graph — only the wrong cross-reference disappears.
 * Users can still reach the entity through its real parent.
 *
 * Extraction-side prevention runs alongside this sweep (see
 * `collectRelatedSettingNames` in SettingGenerator.vue, which calls
 * `auntUncleNamesFor` to expand the LLM's exclude list) so future
 * extractions don't re-introduce the same stubs.
 *
 * Idempotent: a settings store with no offending stubs is left
 * untouched.
 */

import { auntUncleNamesFor } from './setting-storage.mjs';

const SETTINGS_KEY = 'gameSettings';

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function sweepAuntUncleSiblingStubs() {
  const settings = safeParse(localStorage.getItem(SETTINGS_KEY), null);
  if (!Array.isArray(settings) || settings.length === 0) return;

  let dropped = 0;

  for (const setting of settings) {
    if (!setting || !Array.isArray(setting.related_places)) continue;

    const blocked = new Set(
      auntUncleNamesFor(setting, settings)
        .map(n => (n || '').trim().toLowerCase())
        .filter(Boolean),
    );
    if (blocked.size === 0) continue;

    const before = setting.related_places.length;
    setting.related_places = setting.related_places.filter(p => {
      if (p?.kind !== 'sibling') return true;
      const key = (p?.name || '').trim().toLowerCase();
      return !blocked.has(key);
    });
    dropped += before - setting.related_places.length;
  }

  if (dropped > 0) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  console.log(
    `sweep-aunt-uncle-sibling-stubs: dropped ${dropped} scale-mismatched sibling stub(s)`,
  );
}
