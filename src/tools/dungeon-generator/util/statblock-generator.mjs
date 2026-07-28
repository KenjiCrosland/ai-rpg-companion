import { canGenerateStatblock } from '@/util/can-generate-statblock.mjs';
import { generateEmbeddedStatblock } from '@/util/embedded-statblock.mjs';

/**
 * Engine-routed (phase 1 of the embedded edition migration, 2026-07-28):
 * previously the legacy two-part pipeline. Same two LLM calls, now with
 * chassis-exact numbers, the full lint stack, and the shared edition
 * preference. 2014 output is the legacy model shape (drop-in); 2024 output
 * is the sections model carrying `format: '2024'`.
 */
export async function generateStatblockForCreature({
  name,
  CR,
  description,
  isSpellcaster,
  premium,
}) {
  const canGenerate = await canGenerateStatblock(premium);
  if (!canGenerate) {
    throw new Error('Cannot generate statblock. Limit reached or not allowed.');
  }

  return generateEmbeddedStatblock({
    name,
    cr: CR,
    description,
    caster: isSpellcaster,
  });
}
