// Tones map to parchment-compatible backgrounds with readable text.
// Borders are rendered in CSS as filter: brightness(0.75) of the fill.
export const PILL_TONES = {
  neutral: { fill: '#d9c28d', text: '#2e2114', name: 'Neutral' },
  warm:    { fill: '#c46a3b', text: '#f5ede0', name: 'Warm' },
  danger:  { fill: '#8a2a2a', text: '#f5ede0', name: 'Danger' },
  muted:   { fill: '#8a8270', text: '#f5ede0', name: 'Muted' },
  mystery: { fill: '#5c3762', text: '#f5ede0', name: 'Mystery' },
};

export const PILL_TONE_ORDER = ['neutral', 'warm', 'danger', 'muted', 'mystery'];

// Quick-add presets in the pill manager. Each click creates a pill with a
// fresh id, so the same preset can be added multiple times.
export const PILL_PRESETS = [
  { label: 'Crowded',   tone: 'warm',   detail: 'Packed with bystanders. Disadvantage on stealth and moves that need elbow room.' },
  { label: 'Obstacle',  tone: 'danger', detail: 'Something in the way — debris, a closed door, a chokepoint. Athletics or Acrobatics to cross.' },
  { label: 'Closed',    tone: 'muted',  detail: 'Blocked outright. Entry requires breaking, picking, or persuading.' },
  { label: 'On Fire',   tone: 'danger', detail: 'Fire hazard. Passing through costs HP or imposes Dex saves.' },
  { label: 'Dark',      tone: 'muted',  detail: 'No natural light. Sight-based actions at disadvantage without a lantern or darkvision.' },
  { label: 'Slippery',  tone: 'warm',   detail: 'Ice, oil, blood. Dash here and risk a Dex save or fall prone.' },
  { label: 'Loud',      tone: 'warm',   detail: 'Noisy enough that stealth is pointless but voices carry further.' },
];
