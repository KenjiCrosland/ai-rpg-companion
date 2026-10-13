/**
 * THE SPECIES KIT (step 9a, owner's brief 2026-10-13). A species word in the GM's own words lands that species' header lines and
 * free traits, deterministically, with the clause as provenance. Two kinds of row and no third: an SRD 5.2 row lifted from the
 * corpus and renamed to the creature (the Hydra's Hold Breath becomes the lizardfolk's, 15 minutes), or a catalog shape with fixed
 * fills (a marsh stride as the terrain-walk frame). Species the SRD carries as bodies (kobold, goblin, hobgoblin, bugbear, gnoll,
 * merfolk, sahuagin) are print aliases and take print's body — they are not here. Nothing here is Monster Manual or PHB text:
 * the SRD is the only verbatim source (owner, 2026-10-13); where the SRD has no trait, the flavor is authored in its idiom.
 *
 * Header lines are free. Lifted traits are the free tier (the words owe them). Flavor rows are the implied tier and land only
 * under the row cap, which is print's own density at the CR (the median row count of SRD blocks in the band, plus one).
 */
import printBlocks from '@/data/srd52-monsters.json';
import { TEMPLATES, renderTemplate } from './templates.mjs';

const DRAGON_COLOR = [[/\b(?:red|gold|brass)\b/i, 'Fire'], [/\b(?:blue|bronze)\b/i, 'Lightning'], [/\b(?:white|silver)\b/i, 'Cold'], [/\bgreen\b/i, 'Poison'], [/\b(?:black|copper)\b/i, 'Acid']];

/** `size`: the species' own size — absent means Medium, which is every entry but the grung (Small), the centaur and the minotaur (Large). A size word in the GM's own text outranks it (the critic's fifth read: a Huge Humanoid goliath on 16d12 with reach 10).
 *  `type`: the creature type the species carries (2024: centaurs and satyrs are Fey, minotaurs and yuan-ti Monstrosities, the player species Humanoid); the aarakocra's is left to the words. */
export const SPECIES = [
  { key: 'lizardfolk', naturalWeapons: ['bite','claw','tail','jaws'], type: 'Humanoid', keys: ['lizardfolk', 'lizard folk', 'lizard-folk'], modes: { Swim: 30 }, traits: [{ srd: ['Hydra', 'Hold Breath'], keys: ['breath', 'breathe', 'breathes', 'underwater', 'submerge', 'submerges', 'dives', 'dive', 'holds its breath'], edits: [[/1 hour/, '15 minutes']] }], flavor: [{ shape: 'terrain-walk', name: 'Marsh Stride', fills: { terrain: 'mud' } }] },
  { key: 'tortle', naturalWeapons: ['bite'], type: 'Humanoid', ac_floor: 17, keys: ['tortle', 'tortles', 'turtlefolk', 'turtle folk'], traits: [{ srd: ['Hydra', 'Hold Breath'] }], flavor: [{ shape: 'shell-withdraw', name: 'Shell Defense' }] },
  { key: 'triton', type: 'Humanoid', keys: ['triton', 'tritons'], modes: { Swim: 30 }, senses: 'darkvision 60 ft.', traits: [{ srd: ['Aboleth', 'Amphibious'], keys: ['swim', 'swims', 'water', 'underwater', 'reef', 'river', 'sea', 'tide', 'marsh', 'amphibious'] }] },
  { key: 'grung', naturalWeapons: ['bite'], type: 'Humanoid', size: 'Small', keys: ['grung', 'grungs', 'frogfolk', 'frog folk'], modes: { Climb: 25 }, traits: [{ srd: ['Aboleth', 'Amphibious'], keys: ['swim', 'swims', 'water', 'underwater', 'reef', 'river', 'sea', 'tide', 'marsh', 'amphibious'] }, { srd: ['Frog', 'Standing Leap'], keys: ['leap', 'leaps', 'bound', 'bounds', 'jump', 'jumps', 'hop', 'hops', 'spring', 'springs', 'branch', 'branches'] }] }, /* a frogfolk leaps as print's Frog does (the critic's fourth read, rerun) */
  { key: 'kenku', naturalWeapons: ['talon','beak','claw'], type: 'Humanoid', keys: ['kenku', 'kenkus'], traits: [{ srd: ['Green Hag', 'Mimicry'], keys: ['mimic', 'mimics', 'copies voices', 'imitate', 'imitates', 'voices', 'mockingbird', 'echo', 'echoes'] }] },
  { key: 'serpentfolk', naturalWeapons: ['bite','fang'], type: 'Monstrosity', keys: ['snakefolk', 'snake folk', 'serpentfolk', 'serpent folk', 'serpent-blooded', 'scales and fangs'], /* the PI name is paraphrased by the lexicon before the engine sees it, so the table keys on the words that arrive (the critic's fourth read, rerun) */ senses: 'darkvision 60 ft.', traits: [{ srd: ['Archmage', 'Magic Resistance'], keys: ['magic', 'magical', 'spell', 'spells', 'resist', 'resists', 'warded', 'blessed'] }] },
  { key: 'satyr', naturalWeapons: ['horn','headbutt'], type: 'Fey', keys: ['satyr', 'satyrs', 'faun', 'fauns'], traits: [{ srd: ['Archmage', 'Magic Resistance'], keys: ['magic', 'magical', 'spell', 'spells', 'resist', 'resists', 'warded', 'blessed'] }] },
  { key: 'troglodyte', naturalWeapons: ['claw','bite'], type: 'Humanoid', keys: ['troglodyte', 'troglodytes'], senses: 'darkvision 60 ft.', traits: [{ srd: ['Ghast', 'Stench'], keys: ['reek', 'reeks', 'stink', 'stinks', 'stench', 'smell', 'smells', 'foul', 'rancid'] }, { srd: ['Drider', 'Sunlight Sensitivity'] }] },
  { key: 'aarakocra', naturalWeapons: ['talon','beak','claw'], keys: ['aarakocra', 'birdfolk', 'bird folk'], modes: { Fly: 50 }, traits: [{ srd: ['Gargoyle', 'Flyby'], keys: ['fly', 'flies', 'flying', 'swoop', 'swoops', 'dive', 'dives', 'wheels', 'circles', 'wing', 'wings'] }] },
  { key: 'owlin', naturalWeapons: ['talon','beak','claw'], type: 'Humanoid', keys: ['owlin', 'owlins', 'owlfolk', 'owl folk'], modes: { Fly: 30 }, senses: 'darkvision 120 ft.', traits: [{ srd: ['Gargoyle', 'Flyby'], keys: ['fly', 'flies', 'flying', 'swoop', 'swoops', 'dive', 'dives', 'wheels', 'circles', 'wing', 'wings'] }] },
  { key: 'harengon', naturalWeapons: ['kick'], type: 'Humanoid', keys: ['harengon', 'harengons', 'rabbitfolk', 'rabbit folk', 'harefolk'], traits: [{ srd: ['Frog', 'Standing Leap'], keys: ['leap', 'leaps', 'bound', 'bounds', 'bounding', 'jump', 'jumps', 'hop', 'hops', 'spring', 'springs', 'vault', 'vaults'], edits: [[/10 feet/, '20 feet'], [/5 feet/, '10 feet']] }] },
  { key: 'tiefling', type: 'Humanoid', keys: ['tiefling', 'tieflings'], senses: 'darkvision 60 ft.', resist: ['Fire'] },
  { key: 'aasimar', type: 'Humanoid', keys: ['aasimar'], senses: 'darkvision 60 ft.', resist: ['Necrotic', 'Radiant'] },
  { key: 'dragonborn', type: 'Humanoid', keys: ['dragonborn', 'dragon-born', 'half-dragon', 'half dragon'], senses: 'darkvision 60 ft.', resist: (concept) => [(DRAGON_COLOR.find(([re]) => re.test(concept)) ?? [null, 'Fire'])[1]] },
  { key: 'orc', type: 'Humanoid', keys: ['orc', 'orcs', 'half-orc', 'half orc'], senses: 'darkvision 120 ft.', traits: [{ srd: ['Goblin Boss', 'Nimble Escape'], name: 'Relentless Rush', edits: [[/the Disengage or Hide action/, 'the Dash action']] }] },
  { key: 'tabaxi', naturalWeapons: ['claw','bite'], type: 'Humanoid', keys: ['tabaxi', 'catfolk', 'cat folk', 'cat-folk'], modes: { Climb: 30 }, senses: 'darkvision 60 ft.', traits: [{ srd: ['Goblin Boss', 'Nimble Escape'], name: "Cat's Dash", edits: [[/the Disengage or Hide action/, 'the Dash action']] }] },
  { key: 'goliath', type: 'Humanoid', keys: ['goliath', 'goliaths'], flavor: [{ shape: 'terrain-walk', name: 'Mountain Stride', fills: { terrain: 'ice or snow' } }] },
  { key: 'centaur', naturalWeapons: ['hoof','hooves'], type: 'Fey', size: 'Large', keys: ['centaur', 'centaurs'], traits: [{ srd: ['Troll', 'Charge'], keys: ['charge', 'charges', 'charging', 'ram', 'rams', 'gallop', 'gallops', 'trample', 'tramples', 'outrider'] }] },
  { key: 'minotaur', naturalWeapons: ['horn','gore','hoof','hooves'], type: 'Monstrosity', size: 'Large', keys: ['minotaur', 'minotaurs'], senses: 'darkvision 60 ft.', traits: [{ srd: ['Troll', 'Charge'], keys: ['charge', 'charges', 'charging', 'ram', 'rams', 'gallop', 'gallops', 'trample', 'tramples', 'outrider'] }] },
];

/** The first species whose key appears as a whole word or phrase in the GM's words (the clause record and the Name). */
export function speciesFor(texts, concept = '') {
  const list = (texts ?? []).map((t) => String(t ?? '')).filter(Boolean);
  for (const sp of SPECIES) {
    const re = new RegExp(`\\b(?:${sp.keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'i');
    const hit = list.find((t) => re.test(t));
    if (hit) return { species: sp, clause: hit, resist: typeof sp.resist === 'function' ? sp.resist(concept) : (sp.resist ?? null) };
  }
  return null;
}

/** An SRD row lifted from the corpus: print's self-reference becomes {inline}, a save DC becomes {dc}. */
export function liftSrdRow(monsterName, rowName) {
  const block = printBlocks.find((m) => m.name === monsterName); if (!block) return null;
  let found = null;
  for (const [sec, es] of Object.entries(block.sections ?? {})) for (const e of es) if (e.name === rowName && !found) found = { section: sec, text: String(e.text ?? '') };
  if (!found) return null;
  const words = monsterName.toLowerCase().split(/\s+/);
  const selfRe = new RegExp(`\\b(?:[Tt]he|[Tt]his) (${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})('s)?\\b`, 'g'); // "the hydra", "this ghast's Stench"
  const text = found.text.replace(selfRe, (m0, w, pos) => `{inline}${pos ?? ''}`).replace(/\bDC \d+\b/g, 'DC {dc}').replace(/\s{2,}/g, ' ');
  return { section: found.section, text, source: `${monsterName}/${rowName}` };
}

const stampInline = (text, inline, dc) => String(text).split('{dc}').join(String(dc)).split('{inline}').join(inline).replace(/(^|[.!?*]\s+|^\*[^*]*\*\s*)the /g, '$1The ').replace(/^the /, 'The ');

/** The species' lifted rows (the free tier), renamed to the creature. */
export function speciesRows(species, { inline = 'the creature', dc = 12 } = {}) {
  const out = [];
  for (const t of species.traits ?? []) {
    const lifted = liftSrdRow(t.srd[0], t.srd[1]); if (!lifted) continue;
    let text = lifted.text; for (const [re, to] of t.edits ?? []) text = text.replace(re, to);
    out.push({ name: t.name ?? t.srd[1], text: stampInline(text, inline, dc), section: lifted.section, source: lifted.source, keys: t.keys ?? null });
  }
  return out;
}

/** A flavor row (the implied tier) rendered from a catalog shape with fixed fills; null when the shape cannot render on this sheet. */
export function speciesFlavorRow(f, ctx, { inline = 'the creature' } = {}) {
  const t = TEMPLATES.find((x) => x.id === f.shape); if (!t) return null;
  const r = renderTemplate(t, ctx, f.fills ?? {}, { blind: true }); if (!r || /\{[a-z_]+\}/.test(r.text)) return null;
  return { name: f.name ?? r.name, text: stampInline(r.text.split('The creature').join('{inline}').split('the creature').join('{inline}'), inline, ctx.scaled?.dc ?? 12), section: r.section ?? 'Traits', shape: f.shape };
}

/** Print's own density: the median count of rows (Multiattack and the legendary preamble excluded) across SRD blocks in the CR band, plus one. */
const CAP_BANDS = [[0, 2], [3, 5], [6, 9], [10, 12], [13, 20], [21, 30]];
const capCache = new Map();
export function rowCap(cr) {
  const band = CAP_BANDS.find(([lo, hi]) => cr >= lo && cr <= hi) ?? CAP_BANDS.at(-1);
  const k = band.join('-'); if (capCache.has(k)) return capCache.get(k);
  const counts = printBlocks.filter((m) => Number(m.cr) >= band[0] && Number(m.cr) <= band[1]).map((m) => Object.values(m.sections ?? {}).flat().filter((e) => !/^(?:Multiattack|Legendary Action Uses)/.test(e.name ?? '')).length).sort((a, b) => a - b);
  const median = counts.length ? counts[Math.floor(counts.length / 2)] : 6;
  capCache.set(k, median + 1); return median + 1;
}
