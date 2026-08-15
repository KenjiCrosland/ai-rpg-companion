/**
 * THE WRITER CALL (owner-approved, 2026-08-15 — the expressiveness package,
 * component 3).
 *
 * A second, small LLM call that runs AFTER the block is assembled and
 * corrected: it sees a digest of what exists and may write ONE ability the
 * concept demands that nothing on the block provides — the Gilded Censer's
 * mirage, the Ashgrave Warden's protective ring. Fidelity over tokens
 * (owner call): a 2k-character prompt whose only job is "write this thing
 * to these exact numbers" obeys where a 20k-character prompt drifts.
 *
 * The trust boundary is the same one the trait renderer proved: the model
 * REPRODUCES engine numbers, never invents them, and verification is
 * mechanical equality. Any failure drops the slot — one optional entry,
 * never the block.
 */
import { CONDITIONS } from '../format-2024/lint.mjs';
import { saveDamageDiceFor } from '../format-2024/dice.mjs';

const ENERGY_AND_PHYSICAL = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic',
  'Poison', 'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing'];

/** The engine-priced envelopes the writer may use. */
export function writerEnvelopes(skeleton) {
  const dmg = saveDamageDiceFor(Math.max(4, Math.round(skeleton.per_attack_damage * 0.55)));
  return {
    save: { dc: skeleton.save_dc, damage: dmg.avg, dice: dmg.dice },
    conditionMenu: ['Frightened', 'Poisoned', 'Blinded', 'Deafened'],
  };
}

export function buildWriterPrompt(monster, skeleton, { concept = '', proposedTraits = null } = {}) {
  const env = writerEnvelopes(skeleton);
  const digest = Object.entries(monster.sections ?? {})
    .flatMap(([sec, list]) => list.map((e) => `- [${sec}] ${e.name}: ${e.text.replace(/\*/g, '').slice(0, 80)}`))
    .join('\n');
  return `You are finishing a D&D 2024 monster. The block below is COMPLETE and correct; do not restate or modify it.

CONCEPT: ${concept}

THE BLOCK (digest):
${digest}

If the concept promises one distinctive thing this block does not deliver — a signature behavior a reader would miss — write it as ONE ability. If the block already says everything the concept does, omit it: an empty answer is a good answer.

Pick exactly one SHAPE and reproduce its numbers EXACTLY:
(a) save: "*[Strength|Dexterity|Constitution|Wisdom] Saving Throw*: DC ${env.save.dc}, one creature the creature can see within 60 feet. *Failure:* ${env.save.damage} (${env.save.dice}) <one damage type the block already deals> damage." — you may add ONE rider from: the target's Speed is halved until the end of its next turn / the target can't take Reactions until the start of the creature's next turn.
(b) condition: no damage. "*[same saves] Saving Throw*: DC ${env.save.dc}, one creature within 60 feet. *Failure:* The target has the <one of: ${env.conditionMenu.join(', ')}> condition until the end of the creature's next turn."
(c) utility: no damage, no saving throw, no conditions — movement, stance, senses, or trickery only, at most 45 words.

Rules: never a Recharge or /Day gate; never a condition the block already imposes; write "the creature" for the monster's name (it is substituted); the NAME is plain English in the creature's own register.

Return ONLY JSON: {"use": true|false, "section": "Actions"|"Bonus Actions"|"Traits", "shape": "a"|"b"|"c", "name": "<entry name>", "text": "<the ability text>"}
If omitting: {"use": false}`;
}

export function validateWriterResponse(jsonString) {
  try {
    const p = JSON.parse(String(jsonString).replace(/^```json\s*|```\s*$/g, '').trim());
    if (p && p.use === false) return true;
    return !!p && p.use === true
      && ['Actions', 'Bonus Actions', 'Traits'].includes(p.section)
      && ['a', 'b', 'c'].includes(p.shape)
      && typeof p.name === 'string' && p.name.trim().length > 1 && p.name.trim().split(/\s+/).length <= 4
      && typeof p.text === 'string' && p.text.trim().length > 10;
  } catch { return false; }
}

/**
 * Mechanical verification: the written entry must live inside its envelope.
 * Returns null when it passes, or the reason it fails.
 */
export function verifyWrittenEntry(entry, monster, skeleton, { roleExclusion = null } = {}) {
  const env = writerEnvelopes(skeleton);
  const text = entry.text;
  const blockText = Object.values(monster.sections ?? {}).flat().map((e) => e.text).join(' ');

  if (/Recharge|\/Day/i.test(entry.name + text)) return 'gate invented';
  if (/Attack Roll/.test(text)) return 'attack roll outside every shape';
  const conds = CONDITIONS.filter((c) => new RegExp(`\\b${c} condition\\b`).test(text));
  const dealt = ENERGY_AND_PHYSICAL.filter((t) => new RegExp(`\\b${t} damage\\b`).test(text));
  const blockDealt = ENERGY_AND_PHYSICAL.filter((t) => new RegExp(`\\b${t} damage\\b`).test(blockText));

  if (entry.shape === 'a') {
    if (!text.includes(`DC ${env.save.dc}`)) return 'DC not the engine DC';
    if (!text.includes(`${env.save.damage} (${env.save.dice})`)) return 'damage not the engine dice';
    if (!dealt.length || dealt.some((t) => !blockDealt.includes(t))) return 'damage type outside the block palette';
    if (conds.length) return 'shape a carries no conditions';
  } else if (entry.shape === 'b') {
    if (/\d+\s*\(\d+d\d+/.test(text)) return 'shape b deals no damage';
    if (conds.length !== 1) return 'shape b imposes exactly one condition';
    if (!env.conditionMenu.includes(conds[0])) return 'condition off the menu';
    if (new RegExp(`\\b${conds[0]} condition\\b`).test(blockText)) return 'condition already imposed by the block';
    if (!text.includes(`DC ${env.save.dc}`)) return 'DC not the engine DC';
  } else {
    if (/\d+\s*\(\d+d\d+|Saving Throw|DC \d+/.test(text)) return 'shape c is pure utility';
    if (conds.length) return 'shape c carries no conditions';
    if (text.split(/\s+/).length > 55) return 'shape c over length';
  }
  if (roleExclusion && roleExclusion(({ template_2024: text }))) return 'fights the combat role';
  // structural dedupe: a rewrite of an existing entry is a duplicate, not a gift
  const sentences = (t) => new Set(t.split(/(?<=\.)\s+/).map((x) => x.trim().toLowerCase()).filter((x) => x.length > 30));
  const mine = sentences(text);
  for (const e of Object.values(monster.sections ?? {}).flat()) {
    let overlap = 0;
    for (const sN of sentences(e.text)) if (mine.has(sN)) overlap += 1;
    if (overlap >= 1) return `duplicates "${e.name}"`;
    if (e.name.trim().toLowerCase() === entry.name.trim().toLowerCase()) return 'name collides';
  }
  return null;
}
