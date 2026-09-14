// THE FALLBACK LIBRARY (owner go 2026-09-13: "deletion plus fallback
// library makes sense"; shape agreed 2026-09-04 and deferred until all
// families shipped). When a concept's wildcard dies in vetting and
// repair, the slot no longer ships the dominated placeholder (deleted —
// 0/329 print Actions lose to their own Multiattack) and no longer has
// to ship nothing: the engine draws a GENERIFIED golden seed — an
// ability shape proven through live vetting during the family sprints —
// priced at the block's own numbers. The model's rename re-attaches the
// fiction; the audit's rename machinery judges name-vs-payload as it
// already does. Fires only after wildcard+repair fail. Never forced:
// an empty draw falls back to the deletion.
//
// LAW: every seed is print-shaped and vet-legal BY CONSTRUCTION — a
// seed that a current guard would reject may not enter the library.
// (Credit Due, the reload-gated negation reaction, was tagged a golden
// seed in the caster era and is CUT here: it predates the Parry
// retirement — print's 2024 protectors wear their defense, and a
// negation reaction is 0/329 under that pin.)
//
// Numbers: {dc} stamps the card DC; damage-bearing seeds carry a
// dpr_frac of the block's per-hit and re-dice through the engine —
// the library never invents a number.

import { saveDamageDiceFor } from '../format-2024/dice.mjs';

export const LIBRARY_SEEDS = [
  {
    key: 'aggro-curse', // Brinefrost Salt Demand, generified
    section: 'Bonus Actions',
    archetypes: ['defender', 'brute', 'skirmisher'],
    name: 'Binding Mark',
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 30 feet. *Failure:* Until the start of the creature's next turn, the target has Disadvantage on attack rolls against creatures other than the creature.",
  },
  {
    key: 'obstacle-pull', // Polite Beckon, generified
    section: 'Actions',
    archetypes: ['caster', 'defender', 'lurker'],
    name: 'Beckoning Pull',
    text: "*Strength Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target is pulled up to 15 feet straight toward the creature, and its Speed is 0 until the start of the creature's next turn.",
  },
  {
    key: 'lure', // Dull Compliance — and the Bog Lantern proved the shape live
    section: 'Actions',
    archetypes: ['lurker', 'caster', 'skirmisher'],
    name: 'Luring Presence',
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 30 feet that can see or hear the creature. *Failure:* The target has the Charmed condition until the start of the creature's next turn, and while Charmed this way, it must move toward the creature by the safest available route on its turn.",
  },
  {
    key: 'pacify', // Weight of Attention, generified and gated
    section: 'Actions',
    archetypes: ['caster', 'lurker'],
    name: 'Transfixing Regard (2/Day)',
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target has the Incapacitated condition and its Speed is 0 until the end of its next turn.",
  },
  {
    key: 'thrown-burst', // Borrowed Light, generified; priced at ONE
    // per-hit and skipped entirely when the chassis already fields a
    // Recharge nova (print never fields two)
    section: 'Actions',
    archetypes: ['caster', 'skirmisher', 'brute'],
    name: 'Hurled Burst (Recharge 5-6)',
    dpr_frac: 1.0,
    text: '*Dexterity Saving Throw:* DC {dc}, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. *Failure:* {burst} {damage_type} damage. *Success:* Half damage.',
  },
  {
    key: 'own-turn-punisher', // Gentle Rebuke — the punisher fantasy on
    // the creature's OWN turn, no reaction economy
    section: 'Bonus Actions',
    archetypes: ['defender', 'brute'],
    name: 'Answering Sting',
    dpr_frac: 0.4,
    text: 'One creature within 5 feet that hit the creature with an attack roll since the end of the creature\'s last turn takes {burst} {damage_type} damage.',
  },
];

// deterministic, block-varied: the same block always draws the same
// seed (re-rolls stay stable under the pin), different blocks rotate
// through their eligible shelf — the library must never become the
// next ten-of-twelve monotony
const nameHash = (s) => [...String(s)].reduce((h, c) => ((h * 31) + c.charCodeAt(0)) >>> 0, 7);

export function drawLibraryRow(scaled, { archetype = null, energy = null, mix = null, name = '' } = {}) {
  // the gate lives in the row FIELD at scale time (donor `gate:`) and
  // moves into the printed name only at assembly — check both homes
  const hasNova = Object.values(scaled.sections ?? {}).flat()
    .some((e) => (/^Recharge/.test(e.gate ?? '') || /\(Recharge [\d–-]+\)/.test(e.name ?? '')) && /\d+ \(\d+d\d+/.test(e.text ?? ''));
  const shelf = LIBRARY_SEEDS.filter((seed) => (!archetype || seed.archetypes.includes(archetype))
    && !(seed.key === 'thrown-burst' && hasNova));
  if (!shelf.length) return null;
  const seed = shelf[nameHash(name) % shelf.length];
  let text = seed.text.split('{dc}').join(String(scaled.dc));
  if (seed.dpr_frac) {
    const { avg, dice } = saveDamageDiceFor(Math.max(3, Math.round((scaled.per_hit ?? 6) * seed.dpr_frac)));
    text = text.split('{burst}').join(`${avg} (${dice})`);
    // the energy weld holds in the library too: concept energy, else a
    // physical type that fits the shape
    const dtype = mix === 'physical' || !energy ? (seed.key === 'own-turn-punisher' ? 'Bludgeoning' : 'Piercing') : energy;
    text = text.split('{damage_type}').join(dtype);
  }
  return { seed: seed.key, section: seed.section, row: { name: seed.name, text, library: true } };
}
