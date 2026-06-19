/**
 * Injection key shared between ParToggleGroup (provides the selected value)
 * and ParToggleButton (reads it to compute its active state). A module-level
 * Symbol keeps the channel private to the pair, mirroring Cedar's
 * `selectedToggleKey`.
 */
export const PAR_TOGGLE_KEY = Symbol('par-toggle-selected');
