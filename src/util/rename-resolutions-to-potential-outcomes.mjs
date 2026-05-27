/**
 * rename-resolutions-to-potential-outcomes.mjs
 *
 * One-shot migration that renames the dungeon-overview `resolutions`
 * field to `potential_outcomes` on every saved dungeon.
 *
 * The field carries free GM-facing prose about how the party can end
 * the dungeon. It was originally named `resolutions` (when the levers-
 * and-costs split collapsed into a single paragraph), and was renamed
 * to `potential_outcomes` because "outcomes" reads more clearly as the
 * GM-facing toolkit it actually is — "resolutions" implied the prose
 * was prescriptive.
 *
 * Walks the `dungeons` localStorage key, and for each dungeon's
 * `dungeonOverview` object, copies `resolutions` → `potential_outcomes`
 * and deletes the old field. If `potential_outcomes` is already set
 * (a re-run, or a freshly-generated dungeon), the existing value wins.
 * Dungeons without the field are skipped silently — legacy pre-2026-05
 * dungeons used a different overview shape entirely.
 */

export function renameResolutionsToPotentialOutcomes() {
  let raw;
  try {
    raw = localStorage.getItem('dungeons');
  } catch (error) {
    console.warn('rename-resolutions-to-potential-outcomes: failed to read dungeons:', error);
    return;
  }
  if (!raw) return;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.warn('rename-resolutions-to-potential-outcomes: failed to parse dungeons, skipping:', error);
    return;
  }
  if (!Array.isArray(parsed)) return;

  let modified = false;
  for (const dungeon of parsed) {
    const ov = dungeon?.dungeonOverview;
    if (!ov || typeof ov !== 'object') continue;
    if (!Object.prototype.hasOwnProperty.call(ov, 'resolutions')) continue;
    if (!Object.prototype.hasOwnProperty.call(ov, 'potential_outcomes')) {
      ov.potential_outcomes = ov.resolutions;
    }
    delete ov.resolutions;
    modified = true;
  }

  if (modified) {
    try {
      localStorage.setItem('dungeons', JSON.stringify(parsed));
    } catch (error) {
      console.warn('rename-resolutions-to-potential-outcomes: failed to write dungeons:', error);
    }
  }
}
