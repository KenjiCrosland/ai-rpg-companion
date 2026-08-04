/**
 * Engine-routed statblock generation for EMBEDDED contexts (dungeon
 * monsters, dungeon NPCs, NPC-generator statblocks). Phase 1 of the
 * embedded-tools edition migration (owner call, 2026-07-28): these tools
 * previously ran the legacy two-part pipeline with none of the engine's
 * machinery. Routing through the engine buys chassis-exact numbers, the
 * full lint/corrector stack, and both editions via the shared preference.
 *
 * Call-count parity with the old flow: resolve micro-call + one main call
 * = the same two calls the legacy part1/part2 flow made.
 *
 * The TOOL owns the creature's name (a dungeon room references "Skeleton
 * Guardian" by name) — if the engine's output drifted, the name is stamped
 * back deterministically, self-references included.
 */
import {
  generateMonster2024, buildArchetypeResolvePrompt, validateArchetypeResponse,
  parseGenerationResponse, pickRandomArchetype, applyRenameMapping, crNumberFor,
} from '@/tools/statblock-generator/format-2024/generate.mjs';
import { ref } from 'vue';
import { generateGptResponse, isDegradedMode } from '@/util/ai-client.mjs';
import { logger } from '@/util/logger.mjs';

// Combat-role select copy, shared by the statblock generator and the
// dungeon's create-monster form (single source — the forms are 1:1).
export const ARCHETYPE_HELP = {
  auto: "We'll pick the role that best fits your monster's name and description.",
  balanced: 'No role bias — the raw mathematical baseline for this CR.',
  brute: 'Hits hard up close, soaks damage, easy to hit. Ogres, zombies, giant hyenas.',
  defender: 'High AC, protects allies, punishes movement. Animated armor, ropers.',
  skirmisher: 'Mobile hit-and-run attacker with a movement trick.',
  artillery: 'Fragile long-range damage dealer with an escape tool.',
  glass_cannon: 'Hits harder than anything at its CR and dies fast. All offense, no cushion.',
  controller: 'Locks enemies down with conditions instead of raw damage. Aboleths.',
  lurker: "Fragile ambusher with a devastating opening strike. Ghosts, will-o'-wisps.",
  support: 'Buffs, heals, and enables allies — underperforms its CR when fought alone.',
  swarm: 'A mass of small creatures acting as one, hard to put down with weapons.',
};
export const ARCHETYPE_OPTIONS = [
  { label: 'Auto — match my concept', value: 'auto' },
  { label: 'Balanced (no role)', value: 'balanced' },
  ...Object.keys(ARCHETYPE_HELP)
    .filter((k) => k !== 'auto' && k !== 'balanced')
    // Multi-word keys (glass_cannon) render as "Glass cannon".
    .map((k) => ({
      label: k.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase()),
      value: k,
    })),
];

// The statblock generator's persisted rules toggle is the app-wide edition
// preference; embedded tools follow it (and may write it via their own
// rules switches — same key, one preference).
export const EDITION_STORAGE_KEY = 'statblock-format';

export function preferredEdition() {
  try {
    return localStorage.getItem(EDITION_STORAGE_KEY) === '2014' ? '2014' : '2024';
  } catch {
    return '2024';
  }
}

export function setPreferredEdition(edition) {
  const value = edition === '2014' ? '2014' : '2024';
  try {
    localStorage.setItem(EDITION_STORAGE_KEY, value);
  } catch {
    /* storage unavailable — preference just doesn't persist */
  }
  if (_editionRef) _editionRef.value = value;
}

// One shared reactive preference for every rules switch in the app — the
// dungeon's Monsters and NPCs tabs are mounted simultaneously, so
// per-component refs would drift out of sync.
let _editionRef = null;
export function editionPreferenceRef() {
  if (!_editionRef) _editionRef = ref(preferredEdition());
  return _editionRef;
}

/**
 * Generate a statblock for an embedded context.
 * Returns the engine's finished monster: legacy model shape for 2014
 * (drop-in for the existing storage/display/export chain), sections model
 * for 2024 (render with Statblock2024). Both carry `format`.
 *
 * @param {object} opts
 *   name        — the creature's name (kept authoritative)
 *   cr          — CR string or number ('1/2', 3)
 *   description — context prose for the concept
 *   caster      — spellcaster flag
 *   type        — creature type if the tool knows it ('Random'/null to let
 *                 the resolve call decide by substance)
 *   edition     — '2014' | '2024'; defaults to the shared preference
 *   onResolve   — optional callback fired after the archetype resolve call
 *                 (loading-state hook for the old part1/part2 UI flags)
 */
export async function generateEmbeddedStatblock({
  name, cr, description = '', caster = false, type = null, archetype = 'auto',
  edition = preferredEdition(), onResolve = null,
}) {
  const concept = [name, description].map((s) => String(s ?? '').trim()).filter(Boolean).join(' — ');
  let archetypeName = null;
  let archetypeSource = 'auto';
  let identity = null;
  let lore = null;
  let themes = null;
  let resolvedType = type && type !== 'Random' ? type : null;
  const typeSource = resolvedType ? 'user' : 'auto';
  // The resolve call runs for user-picked roles too (owner call,
  // 2026-08-04): skipping it left those generations with no identity, no
  // lore, and no type honesty. The picked role passes as GIVEN.
  const givenArchetype = archetype && archetype !== 'auto' ? archetype : null;
  if (givenArchetype) {
    archetypeName = givenArchetype;
    archetypeSource = 'user';
  }
  try {
    const raw = await generateGptResponse(buildArchetypeResolvePrompt(concept, '', { cr, archetype: givenArchetype }), validateArchetypeResponse, 2);
    const parsed = parseGenerationResponse(raw);
    archetypeName = givenArchetype ?? parsed?.archetype ?? null;
    if (typeof parsed?.identity === 'string' && parsed.identity.trim().length > 20) {
      identity = parsed.identity.trim();
    }
    if (typeof parsed?.lore === 'string' && parsed.lore.trim().length > 15) {
      lore = parsed.lore.trim();
    }
    if (!resolvedType && typeof parsed?.creature_type === 'string') {
      resolvedType = parsed.creature_type;
    }
    if (Array.isArray(parsed?.themes)) {
      const FACETS = ['bestial','armed','amorphous','grave','fiendish','celestial','fey','draconic','elemental','verdant','forged','mind','venomous','terror','beguiling','grasping','devouring','aquatic','subterranean','aerial','uncanny','arcane','voice','gaze','breath'];
      const t = parsed.themes.filter((x) => FACETS.includes(String(x).toLowerCase())).slice(0, 2);
      if (t.length) themes = t;
    }
  } catch (e) {
    logger.warn('Embedded archetype resolve failed, picking randomly:', e);
  }
  if (!archetypeName) archetypeName = pickRandomArchetype();
  if (onResolve) onResolve();
  return runGeneration();

  async function runGeneration() {
    const fullConcept = identity
      ? `${concept}\nCOMBAT IDENTITY (design every ability to serve this): ${identity}`
      : concept;

    let monster = await generateMonster2024(
      {
        concept: fullConcept,
        description,
        cr: crNumberFor(String(cr ?? '1')),
        archetypeName,
        caster: !!caster,
        archetypeSource,
        edition,
        resolvedType,
        typeSource,
        lore,
        themes,
        namePass: null,
        degraded: isDegradedMode(),
      },
      (prompt, validate) => generateGptResponse(prompt, validate, 3),
    );

    if (name && monster.name !== name) {
      monster = applyRenameMapping(monster, { [monster.name]: name });
    }
    return monster;
  }
}
