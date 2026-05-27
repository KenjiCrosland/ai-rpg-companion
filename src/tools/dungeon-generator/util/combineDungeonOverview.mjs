/**
 * combineDungeonOverview.mjs
 *
 * Consolidates a dungeon overview's structured fields into a flat,
 * paragraph-separated string. Parallel to combineSettingOverview.
 * Used to pre-populate the edit textarea when no `combined_content`
 * exists yet — the user sees a clean prose blob built from whichever
 * field shape the dungeon was generated under.
 *
 * Dual-read aware: each section reads the new canonical field first,
 * falling back to legacy field names. Empty sections are skipped.
 *
 * Note: this is the PLAIN-PROSE combiner used for edit-textarea
 * pre-fill. For markdown-with-section-headings (storage form of
 * `combined_content`), use consolidateOverviewToMarkdown from
 * renderDungeonOverview.mjs.
 */

export function combineDungeonOverview(overview) {
  if (!overview) return '';

  // Per-section field resolution. New shape first, legacy fallback
  // second. Each section becomes one paragraph in the output.
  const sections = [
    // Lead — overview is the same in both shapes.
    [overview.overview],
    // Quest hook — new shape only; absent on legacy dungeons.
    [overview.quest_hook],
    // Region — same field name in both shapes.
    [overview.relation_to_larger_setting],
    // Approach — new (approach_and_threshold) or legacy (finding_the_dungeon).
    [overview.approach_and_threshold || overview.finding_the_dungeon],
    // History — same field name.
    [overview.history],
    // Dominant Power — new is single field; legacy is split across
    // dominant_power + dominant_power_goals + miniboss_description.
    overview.central_dynamic
      ? [overview.dominant_power]
      : [overview.dominant_power, overview.dominant_power_goals, overview.miniboss_description],
    // Inhabitants — new field (with facet) or legacy dominant_power_minions.
    overview.central_dynamic
      ? [overview.inhabitants, overview.notable_inhabitant_facet]
      : [overview.dominant_power_minions],
    // Hazards — new shape only.
    [overview.hazards_and_dangers, overview.notable_hazard_facet],
    // Present State — new shape (central_dynamic + present_state)
    // or legacy (the dramatic-arc tail: dominant_power_event +
    // recent_event_consequences + secondary_* + main_problem +
    // potential_solutions + conclusion).
    overview.central_dynamic
      ? [overview.central_dynamic, overview.present_state]
      : [
          overview.dominant_power_event, overview.recent_event_consequences,
          overview.secondary_power, overview.secondary_power_event,
          overview.main_problem, overview.potential_solutions,
          overview.conclusion,
        ],
    // Resolution paths — new shape only; rendered as joined sentences
    // so downstream prose-aggregating consumers see the levers.
    [Array.isArray(overview.resolution_paths) ? overview.resolution_paths.join(' ') : null],
    // Difficulty — same field name in both shapes.
    [overview.difficulty_level],
  ];

  return sections
    .map(fieldValues => fieldValues
      .filter(v => typeof v === 'string' && v.trim())
      .map(v => v.trim())
      .join(' ')
    )
    .filter(paragraph => paragraph.length > 0)
    .join('\n\n');
}
