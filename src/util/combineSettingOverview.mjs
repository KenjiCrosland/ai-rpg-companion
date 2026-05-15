/**
 * combineSettingOverview.mjs
 *
 * Consolidates a setting_overview's individual fields into a single
 * paragraph-separated string. Used in two places:
 *
 *   1. `OverviewTab.startEditing` — pre-populates the edit textarea
 *      when the user wants to edit a setting that hasn't been edited
 *      before (no `combined_content` yet).
 *
 *   2. `SettingGenerator.loadSettingsFromLocalStorage` — one-time
 *      migration that consolidates legacy settings (generated with
 *      the pre-renamed key set: main_problem, potential_solutions,
 *      conclusion, recent_event_*, impactful_economic_event) into
 *      `combined_content`. After migration runs, render and export
 *      paths read `combined_content` for legacy data and the new
 *      key set for fresh generations — no more dual-read scaffolding
 *      across render/export sites.
 *
 * Dual-read is contained here, in one function. The function
 * understands both the legacy key names and the new ones, picking
 * whichever is present. Future renames can be absorbed by adding
 * another fallback layer in this single place.
 */

export function combineSettingOverview(overview) {
  if (!overview) return '';

  // Each pair reads the new canonical key first, falling back to one
  // or more legacy names. Order matters: most-canonical first.
  const rulerActivity =
    overview.notable_ruler_activity || overview.recent_event_current_ruler;
  const socialFacet =
    overview.notable_social_facet
    || overview.notable_social_development
    || overview.recent_event_social;
  const economicFacet =
    overview.notable_economic_facet
    || overview.notable_economic_development
    || overview.impactful_economic_event;
  const securityFacet =
    overview.notable_security_facet
    || overview.notable_security_development
    || overview.recent_event_military;
  const centralDynamic = overview.central_dynamic || overview.main_problem;
  const responses = overview.responses_in_motion || overview.potential_solutions;
  const presentState = overview.present_state || overview.conclusion;

  const parts = [];
  if (overview.overview || overview.relation_to_larger_setting) {
    parts.push(
      [overview.overview, overview.relation_to_larger_setting]
        .filter(Boolean)
        .join(' ')
    );
  }
  if (overview.history) parts.push(overview.history);
  if (
    overview.current_ruler_sentence
    || rulerActivity
    || overview.recent_event_consequences
  ) {
    parts.push(
      [
        overview.current_ruler_sentence,
        rulerActivity,
        overview.recent_event_consequences,
      ]
        .filter(Boolean)
        .join(' ')
    );
  }
  if (overview.social_history || socialFacet) {
    parts.push([overview.social_history, socialFacet].filter(Boolean).join(' '));
  }
  if (overview.economic_history || economicFacet) {
    parts.push(
      [overview.economic_history, economicFacet].filter(Boolean).join(' ')
    );
  }
  if (overview.military_history || securityFacet) {
    parts.push(
      [overview.military_history, securityFacet].filter(Boolean).join(' ')
    );
  }
  if (centralDynamic || responses) {
    parts.push([centralDynamic, responses].filter(Boolean).join(' '));
  }
  if (presentState) parts.push(presentState);

  return parts.filter(Boolean).join('\n\n');
}
