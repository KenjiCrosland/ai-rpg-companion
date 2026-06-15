/**
 * infer-item-dungeon-mode.mjs
 *
 * When the dungeon generator is seeded from an item (item → dungeon
 * flow), this inference call reads the item's lore and determines
 * which of four modes best describes how the item appears in the
 * dungeon:
 *
 *   forgotten — lost, abandoned, sealed away; the dungeon's
 *               inhabitants are incidental to the item.
 *   revered   — worshipped, displayed, central to a cult or order's
 *               practice.
 *   carried   — currently in a named entity's possession (a king,
 *               a champion, a hoarder).
 *   trial     — granted to those who pass a structured test of
 *               worthiness. The dungeon IS the trial.
 *
 * The mode then maps via `MODE_TO_PRESETS` to a tuple of dimensional
 * pre-sets (driveType, powerStructure, organizingLogic) that the main
 * dungeon inference call honors instead of rolling.
 *
 * Output shape: { mode, reasoning }
 *   mode      — one of MODES (defaults to 'forgotten' on any failure)
 *   reasoning — one-sentence justification from the lore (or fallback
 *               text if the call failed)
 *
 * Graceful degradation: any failure (network, validation, malformed
 * JSON) returns { mode: 'forgotten', reasoning: '…' } so the caller's
 * pipeline keeps moving.
 */

import { generateGptResponse } from '@/util/ai-client.mjs';

export const MODES = Object.freeze(['forgotten', 'revered', 'carried', 'trial']);

/**
 * Rarity → tier mapping for item-seeded dungeons.
 *
 * The dungeon's difficulty tier should track the item's narrative
 * weight: a Common utility item shouldn't drive a T5 cosmic dungeon,
 * and an Artifact shouldn't roll a T1 hilltop barrow. Overlapping
 * tiers between adjacent rarities give a one-tier variance band so
 * the same-rarity item doesn't always produce the same-scope dungeon.
 *
 * Common is the sole single-tier rarity (always T1) — the framing is
 * tightest because common items rarely justify any escalation. The
 * middle rarities overlap one tier with each neighbor; Artifact pins
 * at T5 (cosmic-scale, hero of the realms).
 */
export const RARITY_TO_TIERS = Object.freeze({
  common: Object.freeze([1]),
  uncommon: Object.freeze([1, 2]),
  rare: Object.freeze([2, 3]),
  'very rare': Object.freeze([3, 4]),
  legendary: Object.freeze([4, 5]),
  artifact: Object.freeze([5]),
});

/**
 * Pick a tier for the given rarity. Returns null when the rarity
 * is unrecognized (so the caller falls back to the random-roll path).
 *
 * @param {string} rarity - The item's rarity string (case-insensitive)
 * @param {Function} [rng=Math.random] - Optional RNG for determinism
 * @returns {number|null} 1-5 or null
 */
export function pickTierForRarity(rarity, rng = Math.random) {
  const key = (rarity || '').toString().trim().toLowerCase();
  const tiers = RARITY_TO_TIERS[key];
  if (!tiers || tiers.length === 0) return null;
  return tiers[Math.floor(rng() * tiers.length)];
}

/**
 * Mode → dimensional pre-sets. The dungeon's main inference call
 * (`inferDungeonDimensions`) honors these pre-sets and rolls only
 * the dimensions not specified here.
 *
 * Each pre-set fixes the dimensions that the mode definitionally
 * implies. Other dimensions (tension, character, type, etc.) still
 * roll normally.
 */
export const MODE_TO_PRESETS = Object.freeze({
  forgotten: Object.freeze({
    driveType: 'recover_by_stealth',
    powerStructure: 'several_unrelated',
    organizingLogic: ['funerary'],
  }),
  revered: Object.freeze({
    driveType: 'acquire_by_theft',
    powerStructure: 'living_order',
    organizingLogic: ['funerary'],
  }),
  carried: Object.freeze({
    driveType: 'recover_by_force',
    powerStructure: 'single_apex',
    organizingLogic: ['inhabited_base'],
  }),
  trial: Object.freeze({
    driveType: 'prove_worthiness',
    powerStructure: 'single_apex',
    organizingLogic: ['containment'],
  }),
});

function stripCodeFences(s) {
  if (typeof s !== 'string') return '';
  return s
    .replace(/^```(?:json)?\s*\n?/i, '')
    .replace(/\n?```\s*$/i, '')
    .trim();
}

/**
 * Validate the raw response. Exported for tests.
 */
export function validateModeResponse(raw) {
  const cleaned = stripCodeFences(raw);
  if (!cleaned) return false;
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    return false;
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;
  if (typeof parsed.mode !== 'string') return false;
  return MODES.includes(parsed.mode);
}

/**
 * Build the inference prompt. Exported for tests.
 */
export function buildModeInferencePrompt(item) {
  const name = (item && item.name) || '(unnamed)';
  const type = (item && item.item_type) || '(unspecified)';
  const physical = (item && item.physical_description) || '(none)';
  const lore = (item && item.lore) || '(none)';

  return `Analyze this magic item's lore to determine how it would appear in a dungeon. Pick exactly ONE of four modes:

- "forgotten": the item was LOST, ABANDONED, SEALED AWAY, or its bearer died and it was left behind. The dungeon's current inhabitants are INCIDENTAL to the item — they live there for their own reasons, the item is incidental scenery.

- "revered": the item is WORSHIPPED, displayed on a pedestal, central to a cult or order's practice, carried in religious procession, or treated as a holy object. The dungeon revolves around protecting / venerating / using it.

- "carried": the item is in the PRESENT POSSESSION of a specific named entity — wielded by a king, hoarded by a dragon, worn by an undead champion, kept in a master craftsman's workshop. The dungeon is built around the carrier; the item moves with them.

- "trial": the item is GRANTED to those who pass a structured test of worthiness administered by guardians. The dungeon IS the trial — a sequence of stages designed to measure fitness. Guardians are adjudicators, not adversaries.

ITEM NAME: ${name}
ITEM TYPE: ${type}
PHYSICAL DESCRIPTION: ${physical}
LORE: ${lore}

Pick the mode whose framing BEST FITS what the lore describes. Read for verbs of fate:
- 'lost', 'sealed', 'left', 'abandoned', 'forgotten' → forgotten
- 'worshipped', 'venerated', 'displayed', 'shrine', 'cult' → revered
- 'wielded by', 'hoarded by', 'carried by', 'in the hands of [name]' → carried
- 'awarded to', 'granted to', 'won by', 'trial', 'test', 'proves worthy' → trial

If the lore is ambiguous or silent on this question, default to "forgotten" (the most generic shape — most items end up forgotten somewhere eventually).

Return ONLY valid JSON, no prose:
{ "mode": "forgotten" | "revered" | "carried" | "trial", "reasoning": "one-sentence justification anchored in a specific phrase from the lore" }`;
}

/**
 * Run the mode inference call. On any failure, returns
 * { mode: 'forgotten', reasoning: '<reason>' } so the caller's
 * generation pipeline keeps moving.
 *
 * @param {object} item - the item record (must at minimum have a name
 *   and lore; type / physical_description are used when present)
 * @returns {Promise<{mode: string, reasoning: string}>}
 */
export async function inferItemDungeonMode(item) {
  if (!item || typeof item !== 'object') {
    return { mode: 'forgotten', reasoning: 'no item provided' };
  }
  const prompt = buildModeInferencePrompt(item);

  let response;
  try {
    response = await generateGptResponse(prompt, validateModeResponse, 3);
  } catch (e) {
    return { mode: 'forgotten', reasoning: 'inference call failed; defaulted to forgotten' };
  }
  if (!response) {
    return { mode: 'forgotten', reasoning: 'empty inference response; defaulted to forgotten' };
  }

  let parsed;
  try {
    parsed = JSON.parse(stripCodeFences(response));
  } catch (e) {
    return { mode: 'forgotten', reasoning: 'parse failed; defaulted to forgotten' };
  }

  const mode = MODES.includes(parsed.mode) ? parsed.mode : 'forgotten';
  const reasoning = typeof parsed.reasoning === 'string' && parsed.reasoning.trim().length > 0
    ? parsed.reasoning.trim()
    : '';
  return { mode, reasoning };
}
