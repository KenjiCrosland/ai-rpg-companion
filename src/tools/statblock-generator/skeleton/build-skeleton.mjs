/**
 * Skeleton builder: the replacement for chassisFor / applyArchetype / slotPlanFor.
 *
 * The old chassis COMPUTED every number from formulas. This builds a monster
 * out of parts that were measured off published creatures instead:
 *
 *   numbers      cr-table.json          frozen, provenanced per CR
 *   slot counts  composition.by_band    observed marginals, sampled independently
 *   the parts    categories / traits    796 templates lifted from the SRD
 *
 * Two rules do most of the work here, and both came out of measuring rather
 * than reasoning:
 *
 *  1. THE WHOLE LIBRARY IS ELIGIBLE AT EVERY CR. Source CR never encoded
 *     severity — the Ghoul paralyses at CR 1 and the Cockatrice petrifies at
 *     CR 1/2. What keeps those fair is the counterplay written into the
 *     template (a save, a duration, a repeat save), and that travels with the
 *     template. Restricting by source CR only starved the high end, where the
 *     library has nothing native at CR 18 and 25-29. Numbers get restamped
 *     from cr-table, so an ability's origin contributes none of them.
 *
 *  2. SLOT COUNTS ARE SAMPLED INDEPENDENTLY, never as a joint shape. At
 *     CR 8-14 there are 37 distinct shapes across 41 creatures and 33 occur
 *     exactly once, so the commonest joint shape describes 4% of monsters.
 *     Sampling joint shapes would reproduce one creature's skeleton, which is
 *     the failure the hand-built template library had.
 *
 * Everything is seeded. Math.random would make a generated skeleton
 * impossible to reproduce in a test or a bug report.
 */
import library from '@/data/ability-library.json';
import crTable from '@/data/cr-table.json';
import archetypeSpec from '@/data/archetype-chassis-spec.json';
import textureBanks from '@/data/texture-banks.json';
import { recencyWeight, rowKeyOf } from './frequency-ledger.mjs';
import { hpFormulaFor, attackDamageDiceFor, saveDamageDiceFor, riderDamageDiceFor } from '../format-2024/dice.mjs';

const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];

/**
 * Slots the ENGINE never fills — the creature's identity, supplied by the model:
 *
 *   {creature}   what it is
 *   {substance}  what a breath or aura is MADE of
 *   {delivery}   how it comes out (exhales, sprays, sheds)
 *   {terrain}    the surface a movement trait is keyed to
 *   {spells}     a spell list
 *
 * A template reading "exhales lightning" forced every creature built from it
 * to have lungs and a lightning theme. Removing that is also what let the
 * library consolidate: Acid Breath, Fire Breath and Lightning Breath are one
 * LINE mechanic with three names. Shape survives as mechanics — a brass
 * dragon's fire is a line, a red dragon's is a cone, and those stay distinct.
 */
export const FLAVOR_SLOTS = ['creature', 'substance', 'delivery', 'terrain', 'weakness_type', 'spells', 'spells_daily', 'kindred_type', 'home_plane', 'appendage', 'appendage_plural', 'signature_spell', 'signature_spell_2', 'anchor', 'undoing', 'legacy',
  'damage_type', 'rider_damage_type', 'rider2_damage_type', 'alt_damage_type', 'alt2_damage_type'];
// 19 library rows sit in a creature's Traits section (Death Burst, Fire Aura).
// The composition profiler counted those as TRAITS, so the ability pool must
// not draw them — otherwise the sampled counts and the pools disagree and a
// "trait" arrives under Actions.
// Swarm rows presume the creature IS a swarm — "the swarm can occupy another
// creature's space", and a type line reading "Swarm of Tiny beasts". They are
// also the one place generification deliberately left the word "swarm"
// standing, since it is part of the source's identity rather than a name to
// strip. Excluded from both pools until the builder can be told to make one.
const isSwarm = (r) => /Swarm/i.test(r.source) || /\bthe swarm\b/i.test(r.template_2024 ?? '');
// `excluded` rows are the short list of mechanics bound to ONE creature's
// identity — body theft, the vampire's stake-and-coffin liturgy — where no
// reskin works (owner call, 2026-08-02). Each row documents its reason.
// pool 'on_death' rows ship ONLY through pickOnDeath: the Balor's Death
// Throes carries slot_type 'area', and leaving it drawable here let the
// area machinery seat it beside an independently-drawn Restoration — two
// on-death occupants restating the same revival (live: the Brimstone
// Warden's triple-stated Nine Hells return).
const ABILITIES = Object.values(library.categories).flat()
  .filter((a) => a.pool !== 'trait' && a.pool !== 'on_death' && !isSwarm(a) && !a.excluded);
const TRAITS = [
  ...Object.values(library.traits.by_category).flat(),
  ...Object.values(library.categories).flat().filter((a) => a.pool === 'trait'),
].filter((t) => !isSwarm(t) && !t.package && !t.excluded && t.pool !== 'on_death');
// Guaranteed kit, injected by rule rather than rolled: Legendary Resistance
// is on 30 of 30 SRD creatures with legendary actions, so a legendary block
// without it is simply wrong.
const PACKAGE_TRAITS = Object.values(library.traits.by_category).flat().filter((t) => t.package);
const SLOT_TYPES = ['plain_attack', 'rider_attack', 'area', 'save_effect', 'save_damage', 'utility'];

/** mulberry32 — small, fast, and good enough for content selection. */
export function makeRng(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function crNumber(cr) {
  const s = String(cr).trim();
  if (s.includes('/')) { const [a, b] = s.split('/').map(Number); return a / b; }
  return Number(s);
}

export function crKey(cr) {
  const n = crNumber(cr);
  if (n === 0.125) return '1/8';
  if (n === 0.25) return '1/4';
  if (n === 0.5) return '1/2';
  return String(n);
}

/** Composition bands. Two bands above CR 14 because the top is where creatures diverge. */
export function bandFor(cr) {
  const n = crNumber(cr);
  if (n <= 2) return '0-2';
  if (n <= 7) return '3-7';
  if (n <= 14) return '8-14';
  if (n <= 20) return '15-20';
  return '21-30';
}

/** Scale bands, which are coarser than composition bands (see _meta.scale_slots). */
function scaleBand(cr) {
  const n = crNumber(cr);
  if (n <= 7) return '0-7';
  if (n <= 14) return '8-14';
  if (n <= 20) return '15-20';
  return '21-30';
}

/** Weighted pick from {value: weight}; returns a Number-keyed value. */
function pickWeighted(weights, rng) {
  const entries = Object.entries(weights);
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let r = rng() * total;
  for (const [k, w] of entries) { r -= w; if (r <= 0) return Number(k); }
  return Number(entries[entries.length - 1][0]);
}

/**
 * The archetype's numeric differentials, applied over the CR medians. The
 * cr-table row is the BALANCED creature at this CR; the archetype is a
 * deliberate trade away from it (defender: tougher but hits softer; glass
 * cannon: the reverse). These are the applyArchetype deltas the skeleton
 * path dropped when it replaced the chassis — two CR 20s at different
 * archetypes shipped identical AC/HP/attack (live: the Grave Warden and
 * the Chasm Grief, twins at AC 20 / HP ~338 / +14). Owner-authored spec,
 * not corpus-measured: print doesn't label archetypes, and the trades are
 * DMG-style design intent. Ceilings match capToAbilityCeiling — an attack
 * bonus needs a +10 mod behind it at most.
 */
export function applyArchetypeNumbers(nums, archetype) {
  const p = archetypeSpec.archetypes?.[archetype];
  if (!p) return nums;
  nums.hp = Math.max(1, Math.round(nums.hp * (p.hp_mult ?? 1)));
  nums.ac += p.ac_mod ?? 0;
  nums.attack_bonus = Math.min(nums.attack_bonus + (p.attack_mod ?? 0), nums.pb + 10);
  nums.save_dc = Math.min(nums.save_dc + (p.dc_mod ?? 0), nums.pb + 18);
  // Kept separately so the non-caster CON-keyed DC recompute can preserve it.
  nums.dc_mod = p.dc_mod ?? 0;
  nums.per_attack_damage = Math.max(1, Math.round(nums.per_attack_damage * (p.damage_mult ?? 1)));
  if (nums.dpr_target != null) nums.dpr_target = Math.round(nums.dpr_target * (p.damage_mult ?? 1));
  // The lurker's bargain: weak sustained damage (damage_mult 0.6) bought a
  // double-size once-per-fight nova. Applies to the GATED area budget only.
  if (p.nova_mult != null) nums.nova_mult = p.nova_mult;
  // Speed is the mobile roles' actual identity and nothing carried it —
  // a skirmisher's numbers were baseline plus a rounding error.
  if (p.speed_mod) nums.speed_mod = p.speed_mod;
  // Swarms attack ONCE: 7 of 7 printed swarms have a single attack and no
  // Multiattack line — the mass is the multiattack. Only the ATTACK class
  // absorbs the round's budget (damageBudgetFor reads attack_fold);
  // per_attack_damage stays TRUE because every per-attack-keyed ratio
  // reads it — folding it tripled recurring auras (45 vs the Balor's 13),
  // legendary uses (49 vs print's 7-17), and heals (live: the Shre Swarm).
  if (archetype === 'swarm') {
    nums.attacks_per_round = nums.multiattack;
    nums.attack_fold = true;
    nums.multiattack = 1;
  }
  return nums;
}

/** The frozen numbers for a CR, plus the multiattack count for its band. */
export function numbersFor(cr) {
  const row = crTable.by_cr[crKey(cr)];
  if (!row) throw new Error(`no cr-table row for CR ${cr}`);
  const ma = library.composition.multiattack.by_band[bandFor(cr)];
  return { cr, ...row, multiattack: ma ? ma.median : 1 };
}

/**
 * Sample how many of each slot the creature gets, each from its own observed
 * distribution. Traits and legendary actions come from the band untouched;
 * the variety slots at CR 15+ already pool in the CR 8-14 non-dragons,
 * because 8 of 12 creatures at CR 21-30 are dragons sharing one layout.
 */
export function pickSlotCounts(cr, rng) {
  const slots = library.composition.by_band[bandFor(cr)].slots;
  const counts = {};
  for (const s of [...SLOT_TYPES, 'trait', 'legendary']) {
    counts[s] = pickWeighted(slots[s].weights, rng);
  }
  // NO LEGENDARY MACHINERY BELOW CR 10 (owner call, 2026-08-16, the
  // Clacking Tide: LR 3/Day plus three legendary actions a round on a
  // CR 8, stacked onto a full band routine the budget never discounted —
  // "seems overpowered" was arithmetic, ~+60% DPR over band). Measured:
  // 29 of 30 printed legendary blocks are CR 10+; CR 6-9 has zero. The
  // lone exception is the CR 5 Unicorn, a guardian whose legendary
  // actions heal and reposition rather than add damage — a shape we
  // decline to reproduce, same shelf as the melee floor's Shrieker.
  // The band-sampled weights can't see this edge: band 8-14 pools
  // CR 10-14's legendary rate onto CR 8-9. LR follows automatically
  // (the trait is added only when legendary slots exist).
  if (crNumber(cr) < 10) counts.legendary = 0;
  // Legendary actions ramp with CR (owner call, 2026-08-02). Print offers no
  // gradient to follow — CR 15 is 3/4 legendary, CR 16 is 2/5, CR 20 is 2/3,
  // because the pattern is by FAMILY (dragons yes; the 2024 MM strips them
  // from horde-leader archfiends like the Balor and Pit Fiend, from
  // constructs, and from big beasts), and a single-monster generator serves
  // bosses, not hordes. So the rule is the product's: at CR 15 the sampled
  // odds stand (~59% legendary), ramping linearly to CERTAIN at CR 20+. A
  // zero roll re-rolls from the nonzero buckets with probability
  // (CR - 15) / 5, keeping the printed 2-vs-3 split when it fires. Having
  // legendary actions also trips the gated-area floor below, so those blocks
  // keep all three damage outlets the aggregate DPR target assumes (live:
  // the Tarwhelm rolled area=0 and legendary=0 and landed at 0.59x target).
  if (crNumber(cr) >= 15 && !counts.legendary) {
    const forceP = Math.min(1, (crNumber(cr) - 15) / 5);
    if (rng() < forceP) {
      const nonzero = Object.fromEntries(
        Object.entries(library.composition.by_band[bandFor(cr)].slots.legendary.weights)
          .filter(([k]) => k !== '0'),
      );
      counts.legendary = pickWeighted(nonzero, rng);
    }
  }
  // A legendary MENU needs choices: measured at CR 15+, print offers three
  // options on 18 blocks and two on 4 — never one (0/22). A single-entry
  // menu leaves two of three uses unspendable and the between-turns
  // economy with no decisions (live: the Graspwarden's lone Hooked Leap;
  // the Alabaster's all-locked pair was this same class one door over).
  if (crNumber(cr) >= 15 && counts.legendary === 1) counts.legendary = 2;
  // Floor: every creature gets at least one ATTACK entry, not merely some way
  // to deal damage. 85% of the corpus has one, and sampling the slots
  // independently otherwise produces things like a CR 3 with two breath
  // weapons and no melee — each count individually plausible, the combination
  // not. This is the cost of independent sampling, and it is worth paying,
  // because joint shapes reproduce single creatures instead.
  if (!counts.plain_attack && !counts.rider_attack) counts.plain_attack = 1;
  // 22 of 30 legendary SRD creatures carry a Recharge-gated area ACTION (the
  // breath weapon slot). A legendary block whose only areas are legendary
  // actions fights strangely — the big set-piece move never lands on its own
  // turn — so give full legendaries one area action when the dice gave none.
  if ((counts.legendary ?? 0) >= 2 && !counts.area) counts.area = 1;
  return counts;
}

/**
 * CR-proximity weighting: prefer abilities printed near this CR, with a long
 * tail so nothing is ever excluded. The tail matters — it is what lets CR 27,
 * which has no native abilities at all, still draw from the whole library.
 */
function proximityWeight(sourceCr, targetCr) {
  return 1 / ((1 + Math.abs(crNumber(sourceCr) - crNumber(targetCr))) ** 2);
}

/**
 * Archetype affinity: a GUIDE, never a constraint (owner call).
 *
 * Abilities carry overlapping archetype tags derived from their mechanics —
 * a Constrictor's Constrict is both brute and controller. Choosing "lurker"
 * makes lurker-ish mechanics likelier without ever excluding the rest, so a
 * lurker can still surprise you with a breath weapon. Untagged rows (most
 * passive traits) stay neutral, since Amphibious suits any archetype.
 *
 * Nothing is ever weighted to zero. The old archetype system CONSTRAINED the
 * slot plan, which is part of why every monster of a role felt alike.
 */
const THEME_MATCH = 2.5;
const THEME_MISS = 0.6;
/**
 * Theme facets: a GUIDE like the archetype weight, never a filter. The
 * resolve call names 2-3 facets for the concept; rows and packages whose
 * mechanics express one of them become likelier, mismatches are damped,
 * untagged rows stay neutral. This is the selection half of the
 * anti-theme-soup layer — the naming half is the palette line in the
 * flavor prompt (owner call, 2026-08-02).
 */
function themeWeight(row, themes) {
  if (!themes || !themes.length) return 1;
  const f = row.facets;
  if (!f || !f.length) return 1;
  return f.some((x) => themes.includes(x)) ? THEME_MATCH : THEME_MISS;
}

const ARCHETYPE_MATCH = 3;
const ARCHETYPE_MISS = 0.5;
function archetypeWeight(row, archetype) {
  if (!archetype) return 1;
  const tags = row.archetypes;
  if (!tags || !tags.length) return 1; // neutral, eligible for everyone
  return tags.includes(archetype) ? ARCHETYPE_MATCH : ARCHETYPE_MISS;
}

/**
 * Structural fingerprint of what an entry DOES, ignoring how it's worded.
 *
 * The sentence-overlap guard catches textual twins; this catches functional
 * ones. A melee attack dealing damage+rider and a save-based "bite" dealing
 * damage+rider are the same move to the player at the table, even though one
 * rolls to hit and one forces a save (live: Ruin-Fed Bite next to Bite).
 */
// The {condition_*} slots count as conditions: they are engine-filled with
// one AFTER shape classification and pick-time gating have already run.
const SHAPE_CONDS = /\b(Paralyzed|Stunned|Petrified|Unconscious|Charmed|Frightened|Incapacitated|Blinded|Restrained|Grappled|Poisoned|Prone)\b|\{condition_(soft|hard|pair)\}/;
export function shapeKeyOf(template) {
  const t = template ?? '';
  if (!/damage/.test(t)) return null; // non-damage entries are shaped by their effect text
  // Matches both the slotted form ({line_length}) and the FILLED form
  // ("90-foot-long, 5-foot-wide Line") — callers hand in either.
  const areaish = /\{area\}|\{line_length\}|\{radius\}|-foot[- ](?:long|wide|radius|Cone|Emanation|Line|Sphere|Cube)/i.test(t);
  if (areaish) return 'area-damage';
  const far = /Ranged Attack Roll|range \d|\{sight_range\}|within (?:90|120) feet/.test(t);
  const control = SHAPE_CONDS.test(t);
  return `${far ? 'far' : 'close'}|${control ? 'control' : 'damage'}`;
}

/**
 * Which dependency tags a set of already-chosen entries satisfies. An entry
 * that says "uses Consume Memories" or "the Draconic Origin trait" needs that
 * thing to exist in the same block, or the unknown-action-ref lint rule
 * rejects it — and a Dungeon Master reading it finds a dead end.
 */
function satisfiedBy(chosen, traits = []) {
  const met = new Set();
  for (const a of chosen) {
    if (a.slot_type === 'plain_attack' || a.slot_type === 'rider_attack') met.add('attack:any');
    // `imposes` is written offline from the template text. Sniffing for the
    // bare word "Grappled" here counted an entry that CONSUMES the condition
    // ("one creature Grappled by the...") as one that CREATES it, so a block
    // could satisfy its own grapple dependency with nothing that grapples.
    for (const tag of a.imposes ?? []) met.add(tag);
    met.add(`ability:${a.ability}`);
  }
  for (const t of traits) {
    met.add(`trait:${t.trait ?? t.ability}`);
    // A trait can PROVIDE a capability, not just exist. Five traits carry
    // `imposes` (the Mimic's Adhesive grapples; the four elemental
    // form-traits grant space_sharing), and ignoring them meant every row
    // requiring what a trait provides failed the dependency fixpoint and
    // silently died — Whirlwind, Whelm and Vortex could NEVER ship beside
    // the form-trait that exists to enable them (the Dreamt Leech: Air
    // Form shipped as Memory Passage, Whirlwind vanished, and the block's
    // Recharge died with it).
    for (const tag of t.imposes ?? []) met.add(tag);
  }
  return met;
}

/**
 * Fill the sampled slots. Attacks are drawn FIRST so that the 25 abilities
 * referencing another entry by name ("makes one Rend attack") have something
 * to point at — otherwise the unknown-action-ref lint rule rejects the block.
 */
/**
 * Draw N candidates for one slot instead of one, so the concept can choose.
 *
 * The engine still decides HOW MANY of each slot and guarantees every option
 * is dependency-safe and correctly scaled; the model decides WHICH, because
 * "a swamp ambusher" wants grapple-and-drag over a breath cone and that
 * preference is visible in the mechanics. Costs no extra call — the choice
 * rides along with the flavor request.
 */
/**
 * Cognition gate: abilities that only make sense on a comprehending mind.
 * Measured across all 329 printed blocks: zero mindless or bestial creatures
 * cast spells (66 casters, min INT 3 — the Stone Golem, which understands
 * languages), zero sense lies (2 blocks, both INT 19+), and the Sphinx's
 * "intentions or sincerity" Insight clause presumes intentions worth reading
 * (live: Inscrutable on an Int 3 stone guardian). Computed from the template
 * rather than tagged, so new rows can't dodge it.
 */
// Charm joined the gate 2026-08-12 (owner question: "charming someone
// requires at least INT 10?"). Print's actual line is not an INT floor —
// the Harpy charms at INT 7 — it is SPEECH: all five printed
// Charmed-imposers (Harpy 7, Pirate 8, Pirate Captain 10, Sprite 14,
// Aboleth 18) comprehend language. That boundary is exactly what
// `sapient` already means here, so charm needs no fourth mind tier — it
// needs to be in this gate. The {condition_soft} menu is also charm-
// capable, so engine-filled rows consult the same rule at fill time.
// The charm patterns cover IMPOSING the condition and EXPLOITING it
// ("Charmed or Grappled by the {creature}" — the Aboleth's phrasing, which
// "Charmed condition" alone missed), but deliberately not RESISTING it: a
// beast with Advantage against being Charmed is fine, it is the charmer
// that needs the mind.
const needsMind = (a) => /spellcasting ability|knows if it hears a lie|intentions or sincerity|has the Charmed condition|Charmed (?:condition until|or Grappled)|Charmed by the \{creature\}/.test(a.template_2024 ?? '');

/**
 * The concept's ASSEMBLY METADATA (owner call, 2026-08-04): structured
 * signals the synthesis emits so the skeleton can honor the concept —
 * prose steers the flavor call, metadata steers the picks.
 *   attack_mode         melee|ranged|mixed — weights attack rows, with a
 *                       guarantee pass so a ranged identity always ships
 *                       at least one ranged attack (live: the Shivering
 *                       Watcher's hurled bone-fetish arrived as three
 *                       melee rows because delivery mode wasn't a signal)
 *   movement            modes the body has; rows REFERENCING a mode the
 *                       concept lacks are gated out at pick time (the
 *                       Flyby-on-a-walker class, killed at the root)
 *   signature_mechanic  the ONE mechanic the creature IS, from a
 *                       controlled family list — guaranteed a seat, the
 *                       caster-checkbox pattern generalized
 */
const MODE_REFS = {
  fly: /\bflies\b|Fly Speed/,
  swim: /Swim Speed|while (?:it is )?underwater|breathe (?:air and water|only underwater)/,
  burrow: /\bburrows\b|Burrow Speed/,
  climb: /Climb Speed/,
};
export const SIGNATURE_FAMILIES = {
  'thrown-weapon': (a) => /Ranged Attack Roll/.test(a.template_2024) && (a.slot_type === 'plain_attack' || a.slot_type === 'rider_attack'),
  breath: (a) => a.slot_type === 'area' && Boolean(a.gate) && /Cone|Line/.test(a.template_2024),
  engulf: (a) => /swallow/i.test(a.template_2024),
  grapple: (a) => (a.imposes ?? []).includes('grapple'),
  gaze: (a) => (a.facets ?? []).includes('gaze'),
  aura: (a) => /Emanation originating from the \{creature\}(?: takes| while it doesn't have)/.test(a.template_2024),
  teleport: (a) => /teleports? (?:up to|itself)/.test(a.template_2024),
  summon: (a) => /animates|conjures/.test(a.template_2024),
  web: (a) => /Restrained condition until the \{substance\} is destroyed/.test(a.template_2024),
};
// One ungated recurring emanation per block — the family cap's aura entry,
// the trait pool's cap, and the aura-signature guarantee all consult this
// one predicate. Gated actions (the Vrock's Spores + Stunning Screech, the
// only printed pair) and on-death bursts (the Balor's Death Throes beside
// its Fire Aura) are exempt, keeping the rule at 0/329 printed flags.
// Two printed phrasings: "Emanation originating from the {creature}"
// (damage auras, presences) AND "emanates an aura in a N-foot Emanation"
// (the Pit Fiend's Fear Aura genus). The predicate missed the second for
// its whole life — the fear aura was invisible to the family cap AND the
// stealth exclusion (live: the relapse on the Scrik after two clean
// blocks; the Shre's dual aura before that).
export const RECURRING_EMANATION = (a) => /Emanation originating from the \{creature\}|emanates an aura/.test(a.template_2024 ?? '')
  && !a.gate && a.pool !== 'on_death';

const FAMILIES = [
  (a) => /teleports? (?:up to|itself)/.test(a.template_2024 ?? ''),
  // one RECURRING EMANATION per block, ANY flavor (damage aura,
  // condition aura, presence): 0 of 329 printed blocks carry two
  // ungated ones — the only printed pair is the Vrock's, and BOTH are
  // gated actions (Recharge 6 / 1/Day), which stay legal. The old
  // regex keyed on " takes"/"while it doesn't have" and missed the
  // presence shape (live: the Shre Swarm ran a Frightened aura, a
  // damage aura, and a Charmed emanation legendary at once).
  RECURRING_EMANATION,
  // one TIERED SPELL LIST per block: 0 of 329 printed blocks carry
  // two (the Night Hag's second entry is an echo, not a list). Two
  // lists shipped live (Spellcasting + Hellfire Spellcasting — the
  // Groan) because the name dedupe saw two different names.
  (a) => /\*\*(?:At Will|\d+\/Day(?: Each)?):\*\*/.test(a.template_2024 ?? ''),
  // one MOBILITY legendary per block, whatever the verb: 0 of 329 printed
  // blocks pair a move-and-attack legendary with a teleport legendary
  // (measured 2026-08-05), and 0 carry two move-and-attacks. A pounce, a
  // teleport-strike and a blink-splash are one function in three costumes
  // (live: Pounce beside Cinder Step on a creature that also burrows,
  // climbs and jumps).
  (a) => (a.slot_type === 'legendary' || a.section === 'Legendary Actions')
    && /(?:moves up to|teleports? up to|flies up to)/.test(a.template_2024 ?? ''),
  // one SPEED-DEBUFF zap per block: 0 of 329 printed blocks carry two
  // (live: Brine-Spray Rupture beside Rotting Tide Exhalation — same
  // damage, same function, one strictly dominated). Scoped to the
  // until-end-of-turn form so the Slowing Breath's repeat-save form
  // stays free.
  (a) => /Speed is (?:0|halved) until the end of (?:the target's|its) next turn/.test(a.template_2024 ?? ''),
];
// A row can sit in SEVERAL families (the Solar's Radiant Teleport is both a
// teleport and an emanation) — findIndex's first-match let it slip past the
// emanation guard as "a teleport" while Frightful Presence stood beside it
// (live-sweep, CR 20 seed 8). Every comparison uses the full set.
const familiesOf = (row) => {
  const out = [];
  FAMILIES.forEach((f, i) => { if (f(row)) out.push(i); });
  return out;
};

// Rows a movement mode makes REDUNDANT — the inverse of the missing-mode
// gate below: 0 printed fliers carry a jump entry; wings outclass legs
// (live: a bonus-action 30-foot jump on a Fly 60 (hover) swarm).
// One Recharge per block (0/329 printed carry two) — consulted by the pick
// loop, the menu safety rule, AND swapIn's victim search: the signature
// seat once added a Recharge Web beside a Recharge breath (live: the
// Uulghoth, Choir Silence + Silt Grasp idling on the same dice).
const gatedLike = (a) => /Recharge/i.test(a.gate ?? '')
  || (!a.gate && a.slot_type === 'area'
    && /Paralyzed|Stunned|Petrified|Unconscious|\{condition_hard\}/.test(a.template_2024)
    // Ladder-form rows are SELF-gated by their escalation buffer, the same
    // exemption the hardAreaUngated belt carries (the Ryll fix). This
    // predicate was the fix's THIRD seam and never got it: the one-Recharge
    // arbitration counted a Sleep Breath as gated-like and rationed it to
    // 1/Day beside the fire breath (live: the Ssvorrach's Dream-Salt
    // Exhalation) — print ships the ladder ungated BESIDE the Recharge on
    // all 20 two-breath dragons.
    && !/(?:First|Second) Failure/i.test(a.template_2024 ?? ''));

// A pure-mobility row is an ESCAPE HATCH, and print never rations one:
// Nimble Escape and Cunning Action are at-will. So when the one-Recharge
// rule forces a gated row to yield, a mobility row ungates rather than
// demoting to 1/Day — a once-per-day Disengage is a dead line on a
// skirmisher, not a reduced one (live: the Hollowscrabbler's Hasten).
const PURE_MOBILITY = (a) => /takes the (?:Dash|Disengage)/.test(a.template_2024 ?? '')
  && !/\{damage\}/.test(a.template_2024 ?? '');

// Attack SHAPE: the fields that determine an attack's rendered numbers and
// menu role. Two attacks sharing a shape render identical lines off one
// budget; if their modes then nest, one is strictly dominated dead text
// (live twice: Scale Shredder beside Brine Spur, the kit's Rend beside a
// seated Scale Shard).
const attackShapeKey = (a) => [
  /\{rider_damage\}/.test(a.template_2024 ?? ''), /\{alt_damage\}/.test(a.template_2024 ?? ''),
  /Saving Throw/.test(a.template_2024 ?? ''), ((a.template_2024 ?? '').match(/reach ([^ ]+) ft/) ?? [])[1],
].join('|');
const isAttackRow = (a) => a.slot_type === 'plain_attack' || a.slot_type === 'rider_attack';

// Rows that FIGHT a role's core loop, excluded from its pool rather than
// merely damped (owner call, 2026-08-06 — role legibility). Narrow by
// design: a hit-and-run creature that grapples has stopped running. This
// is the documented-exception shelf the cognition gate and the
// stealth-aura bar already sit on; everything else stays on weights,
// because guide-not-constrain is still the rule. Signature promises are
// unaffected — a conflicting one is vetoed upstream, a permitted one is
// honored at its seat.
export const ROLE_EXCLUSIONS = {
  skirmisher: (a) => /Grappled condition \(escape|swallow/i.test(a.template_2024 ?? ''),
  lurker: (a) => /Grappled condition \(escape|swallow/i.test(a.template_2024 ?? ''),
  artillery: (a) => /Grappled condition \(escape|swallow/i.test(a.template_2024 ?? ''),
};

/**
 * Energy coupling: a row whose mechanic IS an energy type only belongs on a
 * block whose register actually speaks that energy. The threshold is
 * DOMINANCE, not presence — `forged` lists Poison at 1 against Fire 5, so a
 * bare `> 0` let the coupled Poison package onto a foundry creature. A
 * facet qualifies when the needed energy is at least a third of its top
 * affinity.
 */
const energyFits = (a, themes) => {
  const need = a.requires_energy;
  if (!need) return true;
  if (!themes || !themes.length) return false;
  return themes.some((t) => {
    const aff = Object.fromEntries(Object.entries(textureBanks.facets?.[t]?.damage_affinity ?? {})
      .filter(([k, v]) => !k.startsWith('_') && typeof v === 'number'));
    const top = Math.max(0, ...Object.values(aff));
    return top > 0 && (aff[need] ?? 0) >= top / 3;
  });
};

// A row that carries an energy rider, or is energy-coupled, cannot sit on a
// PHYSICAL-ONLY block — its rider slot would have no energy to render.
// Printed physical-only creatures (bulette, gorgon, stone giant,
// tyrannosaur) carry plain attacks for exactly this reason.
const CARRIES_ENERGY = (a) => Boolean(a.requires_energy)
  || /\{(?:rider|rider2|alt|alt2)_damage_type\}/.test(a.template_2024 ?? '');

// A CR 20 creature's signature attack does not come from a CR 1/8 Guard.
// The attack pool is 70% CR<=5, so CR-proximity weighting — a weight, not a
// bound — left a persistent ~8% tail of sub-tier sources (live: "Spear <-
// Guard (CR 1/8)" on two separate CR 20 blocks). A floor at a quarter of the
// block's CR still leaves 159 of 422 attack rows at CR 20, so the pool stays
// wide; it removes only the bottom print would never use at this tier.
const attackSourceTooWeak = (a, cr) => {
  if (a.slot_type !== 'plain_attack' && a.slot_type !== 'rider_attack') return false;
  const blockCr = crNumber(cr);
  if (blockCr < 5) return false;
  return crNumber(a.cr) < blockCr / 4;
};

const JUMP_ROW = (a) => /jumps? up to/.test(a.template_2024 ?? '');
const redundantWithMode = (a, movement) => Boolean(movement?.includes('fly')) && JUMP_ROW(a);

const referencesMissingMode = (a, movement) => {
  if (!movement) return false; // no metadata: legacy behavior, nothing gated
  return Object.entries(MODE_REFS).some(([mode, re]) => !movement.includes(mode)
    && re.test(a.template_2024 ?? ''));
};
const attackModeWeight = (a, mode) => {
  if (!mode || mode === 'mixed') return 1;
  const isAttack = a.slot_type === 'plain_attack' || a.slot_type === 'rider_attack';
  if (!isAttack) return 1;
  const ranged = /Ranged Attack Roll/.test(a.template_2024);
  if (mode === 'ranged') return ranged ? 6 : 0.5;
  return ranged ? 0.5 : 6; // melee
};

export function pickAbilities(cr, counts, rng, traits = [], alternatives = 1, archetype = null, spineRows = [], themes = null, mind = 'sapient', meta = {}) {
  const chosen = [];
  const usedTemplates = new Set();
  const usedNames = new Set();
  // Package members enter first, exempt from the cross-pick guards among
  // themselves — they were designed together — but registered, so every
  // single picked afterwards dedupes against the spine.
  const remaining = { ...counts };
  for (const r of spineRows) {
    usedTemplates.add(r.template_2024);
    usedNames.add(r.ability);
    if (remaining[r.slot_type] > 0) remaining[r.slot_type] -= 1;
    chosen.push(r);
  }
  const order = ['plain_attack', 'rider_attack', 'area', 'save_effect', 'save_damage', 'utility', 'legendary'];

  for (const slot of order) {
    for (let i = 0; i < (remaining[slot] ?? 0); i += 1) {
      const met = satisfiedBy(chosen, traits);
      // The FIRST area is the block's set piece and must be a real NOVA: a
      // gated burst (immediate damage on the failed save) or a gated
      // hard-condition breath. Six live blocks budgeted sustained damage
      // fine and never allocated a spike — a Concentration whirlwind
      // satisfying the area slot leaves the biggest single action weaker
      // than one round of claws. Control areas remain available as SECOND
      // areas beside a real nova.
      const firstArea = slot === 'area' && !chosen.some((c) => c.slot_type === 'area');
      const isBurst = (a) => Boolean(a.gate)
        && (/\*(?:First |Second )?Failure:?\*?:?\s*\{damage\}/.test(a.template_2024)
          // {condition_hard} counts: the tier is in the slot name precisely
          // so pick-time rules can read severity before the engine fills it.
          || /Paralyzed|Stunned|Petrified|Unconscious|Blinded|Incapacitated|\{condition_hard\}/.test(a.template_2024));
      // One RECHARGE entry per block: 0 of 329 printed blocks carry two
      // (one Recharge beside legendaries is the norm — 23 of 30). A row
      // counts as gated-like if it carries a Recharge gate OR is an ungated
      // hard-condition area, because the belt-and-braces injection below
      // will gate that one at assembly.
      const haveGated = chosen.some(gatedLike);
      const pool = ABILITIES.filter((a) => a.slot_type === slot
        && !(gatedLike(a) && haveGated)
        && (mind === 'sapient' || !needsMind(a))
        && !referencesMissingMode(a, meta.movement)
        && !redundantWithMode(a, meta.movement)
        // a 30-foot jump is dead text beside a 60-foot teleport, the same
        // way it is beside wings (live: Slagbound Leap on a block with
        // Cinder Step, burrow, and climb)
        && !(JUMP_ROW(a) && chosen.some((c) => /teleports? up to/.test(c.template_2024 ?? '')))
        // rows that fight the role's loop are out of its pool entirely
        && !(ROLE_EXCLUSIONS[archetype]?.(a))
        && energyFits(a, themes)
        && !(meta.damageMix === 'physical' && CARRIES_ENERGY(a))
        && !attackSourceTooWeak(a, cr)
        // stealth chassis: see the trait pool's aura exclusion
        && !(RECURRING_EMANATION(a) && (archetype === 'skirmisher' || archetype === 'lurker'))
        // A ceiling-tagged row's counterplay stops working above its tier
        // (the Ghost's Possession is body-HP-gated); the one deliberate
        // exception to whole-library-eligible, documented on the row.
        && (a.cr_ceiling == null || crNumber(cr) <= a.cr_ceiling)
        // The block's ONLY area is its set piece: it must deal damage or
        // impose a hard condition. Print never fields a pure-debuff breath
        // alone — Weakening Breath exists only beside Fire Breath, while the
        // Gorgon's damage-less breath stands alone because it PETRIFIES
        // (live: a CR 20 whose sole area subtracted 1d6 from damage rolls).
        && (!firstArea || isBurst(a))
        && !usedTemplates.has(a.template_2024)
        // Dedupe on NAME as well as mechanic: two different templates both
        // called "Hurl Flame" read as a mistake even though the mechanics
        // differ, and the Multiattack line can no longer name one of them.
        && !usedNames.has(a.ability)
        && (a.requires ?? []).every((r) => met.has(r)));
      if (!pool.length) continue; // leave the slot empty rather than repeat
      const weights = {};
      pool.forEach((a, idx) => { weights[idx] = proximityWeight(a.cr, cr) * archetypeWeight(a, archetype) * themeWeight(a, themes) * recencyWeight(a, meta.recent) * attackModeWeight(a, meta.attackMode) * (meta.signatureMechanic && SIGNATURE_FAMILIES[meta.signatureMechanic]?.(a) ? 6 : 1); });
      // Two different mechanics can still share most of their sentences
      // (Weight of Years and Blinding Gaze differ in one clause). The lint
      // reads that as one ability written twice, and a reader would agree.
      const sentences = (t) => new Set(
        t.replace(/\b(makes? (?:one|two|three) )[A-Z][a-z]+(?: [A-Z][a-z]+)? attack/g, '$1X attack')
          .split(/(?<=\.)\s+/).map((x) => x.trim()).filter((x) => x.length > 30),
      );
      // Same predicate lint's legendary-no-damage applies post-fill, phrased
      // for templates (placeholders, not literal dice).
      const paysLike = (a) => /\{damage\}|\b(?:makes|uses)\b/.test(a.template_2024);
      // The post-draw guards, as PREDICATES. They used to be `continue`
      // statements — which skipped the whole slot iteration, not just the
      // candidate, so every rejection silently cost the block an entry.
      // Invisible while the guards were few; the broadened mobility family
      // (2026-08-05) made legendary menus collapse to one option on ~15% of
      // skirmisher draws with counts.legendary = 3 (live: the Starless
      // Warden). Rejections now REDRAW.
      const rejects = (cand) => {
        const picked = sentences(cand.template_2024);
        const overlaps = chosen.some((c) => {
          const other = sentences(c.template_2024);
          let shared = 0;
          for (const sIn of picked) if (other.has(sIn)) shared += 1;
          return shared >= 2;
        });
        if (overlaps) return true;
        // BONUS ACTIONS cap at two: 257 printed blocks carry none, 68 one,
        // 4 two, and ZERO three (measured 2026-08-06). Ours shipped three,
        // which is how an abductor ended up holding a carry, a
        // teleport-carry and a re-hide at once (live: the Balefire).
        if (cand.section === 'Bonus Actions'
          && chosen.filter((c) => c.section === 'Bonus Actions').length >= 2) return true;
        // Mechanic families that read as "the same trick again" whatever
        // their wording: one per block.
        if (familiesOf(cand).some((f) => chosen.some((c) => familiesOf(c).includes(f)))) return true;
        // Structural dedupe ACROSS slot types: attack slots may repeat their
        // shape (counts govern them, and melee+thrown pairs are printed), but
        // a save/utility/legendary entry that is just another single-target
        // damage nuke duplicates the attack the block already has. An EXECUTE
        // row is exempt — the death clause is the mechanic and the shape key
        // can't see it.
        const shape2 = shapeKeyOf(cand.template_2024);
        const isExecute = /, \{execute_effect\}|, it dies/.test(cand.template_2024);
        return Boolean(shape2 && shape2.endsWith('|damage') && !isExecute
          && slot !== 'plain_attack' && slot !== 'rider_attack'
          // Legendary actions ECHO turn actions in print (Kraken: Lightning
          // Strike beside legendary Lightning Storm).
          && slot !== 'legendary'
          && chosen.some((c) => shapeKeyOf(c.template_2024) === shape2));
      };
      let pick = null;
      {
        const spent = new Set();
        for (let attempt = 0; attempt < 8 && !pick; attempt += 1) {
          const avail = pool.filter((a) => !spent.has(a));
          if (!avail.length) break;
          const w = {};
          avail.forEach((a, idx) => { w[idx] = weights[pool.indexOf(a)]; });
          const cand = avail[pickWeighted(w, rng)];
          if (rejects(cand)) { spent.add(cand); continue; }
          pick = cand;
        }
      }
      if (!pick) continue; // genuinely nothing legal left for this slot
      usedTemplates.add(pick.template_2024);
      usedNames.add(pick.ability);

      // Alternatives for the same slot, drawn the same way and subject to the
      // same guards, so whichever the concept picks is equally valid.
      const options = [pick];
      for (let k = 1; k < alternatives; k += 1) {
        // Same SECTION as the entry being replaced: a Reactions slot filled
        // with non-reaction text fails reaction-trigger, which requires the
        // *Trigger:*/*Response:* form.
        const rest = pool.filter((a) => !usedTemplates.has(a.template_2024) && !usedNames.has(a.ability)
          && a.section === pick.section
          // Combination safety for the Recharge cap: a gated alternative is
          // legal only on the entry whose DEFAULT is the block's gated one,
          // so no set of menu choices can assemble two Recharge entries.
          && (!gatedLike(a) || gatedLike(pick))
          // Combination safety for EVERY family cap (the gatedLike rule):
          // a family-carrying alternative is legal only on an entry whose
          // DEFAULT is in that family — checking chosen-so-far missed the
          // earlier-menu/later-pick ordering (live-sweep: a Scorching Sands
          // option beside a chosen Freezing Burst, two speed debuffs one
          // swap away).
          && familiesOf(a).every((f) => familiesOf(pick).includes(f))
          // The SIGNATURE's menu stays in-family: the concept promised the
          // mechanic, and a menu that offers the prerequisite beside the
          // payoff lets the flavor call swap the payoff away (live: the
          // engulf signature's Swallow seat offered Quick Grapple and the
          // model took it — two grapple imposers, no spend, promise lost).
          && (!meta.signatureMechanic || !SIGNATURE_FAMILIES[meta.signatureMechanic]
            || !SIGNATURE_FAMILIES[meta.signatureMechanic](pick)
            || SIGNATURE_FAMILIES[meta.signatureMechanic](a))
          // Combination safety for the legendary damage invariant: a paying
          // legendary (damage dice or makes/uses delegation) only offers
          // paying alternatives, so any set of menu choices keeps at least
          // the payers the default set had (which lint already verified).
          && (pick.slot_type !== 'legendary' || !paysLike(pick) || paysLike(a))
          && !options.some((o) => o.ability === a.ability));
        if (!rest.length) break;
        const w = {};
        rest.forEach((a, idx) => { w[idx] = proximityWeight(a.cr, cr) * archetypeWeight(a, archetype) * themeWeight(a, themes) * recencyWeight(a, meta.recent); });
        const alt = rest[pickWeighted(w, rng)];
        const altS = sentences(alt.template_2024);
        let clash = 0;
        for (const c of [...chosen, ...options]) {
          const other = sentences(c.template_2024);
          let shared = 0;
          for (const sIn of altS) if (other.has(sIn)) shared += 1;
          if (shared >= 2) clash += 1;
        }
        if (clash) continue;
        usedTemplates.add(alt.template_2024);
        usedNames.add(alt.ability);
        options.push(alt);
      }
      // Never mutate a library row: they are module-level and shared across
      // every generation in the process.
      chosen.push({ ...pick, options });
    }
  }
  // Print's legendary invariant (measured 2026-08-04): at least one option
  // is always UNLOCKED — 7 of 8 printed two-option sets lock exactly one,
  // and zero printed sets lock everything. An all-locked draw (live: the
  // Shivering Watcher's two-lock, no-decision turn) swaps its last
  // legendary for an unlocked row.
  {
    const LOCK = /can't take this action again/;
    const legendaries = chosen.filter((c) => c.slot_type === 'legendary');
    if (legendaries.length && legendaries.every((c) => LOCK.test(c.template_2024))) {
      const replaceable = legendaries[legendaries.length - 1];
      // The swap must SURVIVE the downstream dependency filter: an unlocked
      // echo requiring Spellcasting on a casterless block gets dropped and
      // the all-locked pair quietly returns (live-sweep: CR 15 seed 7).
      const met = satisfiedBy(chosen.filter((c) => c !== replaceable), traits);
      const alt = ABILITIES.filter((a) => a.slot_type === 'legendary'
        && !LOCK.test(a.template_2024)
        && !usedTemplates.has(a.template_2024) && !usedNames.has(a.ability)
        && (a.requires ?? []).every((r) => met.has(r))
        // The family caps apply to this swap too — it once pulled an
        // unlocked Radiant Teleport in beside Frightful Presence, a second
        // emanation AND a second teleport in one move (live-sweep, CR 20
        // seed 8 swarm).
        && !familiesOf(a).some((f) => chosen.some((c) => c !== replaceable && familiesOf(c).includes(f)))
        && (a.cr_ceiling == null || crNumber(cr) <= a.cr_ceiling));
      if (alt.length) {
        const weights = {};
        alt.forEach((a, idx) => { weights[idx] = proximityWeight(a.cr, cr) * archetypeWeight(a, archetype) * themeWeight(a, themes) * recencyWeight(a, meta.recent); });
        const swap = alt[pickWeighted(weights, rng)];
        usedTemplates.add(swap.template_2024);
        usedNames.add(swap.ability);
        chosen[chosen.indexOf(replaceable)] = { ...swap, options: [swap] };
      }
    }
  }
  // GUARANTEE PASSES — the metadata's promises are non-negotiable, the
  // caster-checkbox pattern: weight first, then verify, then swap.
  const guaranteed = new Set();
  const swapIn = (predicate, slotTypes, prefer = null) => {
    if (chosen.some((c) => predicate(c))) return;
    const met = satisfiedBy(chosen, traits);
    let pool = ABILITIES.filter((a) => predicate(a)
      && slotTypes.includes(a.slot_type)
      && !usedTemplates.has(a.template_2024) && !usedNames.has(a.ability)
      && (a.requires ?? []).every((r) => met.has(r))
      && !referencesMissingMode(a, meta.movement)
      && !redundantWithMode(a, meta.movement)
      // seats run downstream of the pick loop, so the bonus-action cap has
      // to be repeated here or a guarantee walks straight past it
      && !(a.section === 'Bonus Actions'
        && chosen.filter((c) => c.section === 'Bonus Actions').length >= 2)
      // ...same for the role exclusions, EXCEPT when a seat is fulfilling a
      // signature the role permitted: an explicit concept promise that
      // survived the veto outranks the general exclusion.
      && !(ROLE_EXCLUSIONS[archetype]?.(a)
        && !(meta.signatureMechanic && SIGNATURE_FAMILIES[meta.signatureMechanic]?.(a)))
      && energyFits(a, themes)
      && !(meta.damageMix === 'physical' && CARRIES_ENERGY(a))
      // NOTE: the CR floor is deliberately NOT applied here. swapIn exists
      // to satisfy promises the block must keep — the melee floor, the
      // range band, the signature seat — and only 21 dual-mode attack rows
      // exist, most of them low-CR. Filtering them out left CR 15
      // skirmishers with no melee-or-ranged option at all. A sub-tier row
      // whose numbers the engine restamps beats an unkept guarantee.
      && (mind === 'sapient' || !needsMind(a))
      && (a.cr_ceiling == null || crNumber(cr) <= a.cr_ceiling));
    if (!pool.length) return;
    // Shape-aware seating (owner call, 2026-08-05): a seated ATTACK must
    // not shape-match an attack the block already has — kit and guarantee
    // rows are exempt from the dominated-twin dedupe, so the seat is where
    // the twin gets minted (live: the attack-mode guarantee put Scale
    // Shard beside the Silver kit's Rend). Soft: if every candidate
    // collides, the promise outranks the diversity.
    {
      const chosenShapes = new Set(chosen.filter(isAttackRow).map(attackShapeKey));
      const diverse = pool.filter((a) => !isAttackRow(a) || !chosenShapes.has(attackShapeKey(a)));
      if (diverse.length) pool = diverse;
      // ...and prefer a candidate that collides with NO family already on
      // the block: a pick can belong to SEVERAL (the Solar's Radiant
      // Teleport is a teleport AND an emanation AND a mobility legendary),
      // so evicting one collision can leave another standing (live-sweep:
      // it displaced a Frightful Presence and left a Pounce beside it).
      const clean = pool.filter((a) => !familiesOf(a).some((f) => chosen.some((c) => familiesOf(c).includes(f))));
      if (clean.length) pool = clean;
    }
    const weights = {};
    pool.forEach((a, idx) => { weights[idx] = proximityWeight(a.cr, cr) * archetypeWeight(a, archetype) * themeWeight(a, themes) * recencyWeight(a, meta.recent) * (prefer && prefer(a) ? 8 : 1); });
    const pick = pool[pickWeighted(weights, rng)];
    // Replace the LAST same-slot pick; append if none. Never a spine row,
    // never an earlier guarantee, and never a row the pick's own requires
    // depend on — checked with full satisfiedBy semantics, not just
    // imposes: the engulf chain's swallow once evicted its just-seated
    // grappler (imposes), and the defender seat's Protective Magic evicted
    // the Spellcasting entry it casts through (satisfiedBy), destroying its
    // own prerequisite so the dependency fixpoint dropped BOTH.
    const spineSet = new Set(spineRows);
    // A Recharge-gated pick must evict the block's EXISTING gated row —
    // seating beside it assembles the two-Recharge block print never
    // fields (0/329; live: the web signature beside a breath). EXCEPT
    // when that row is the block's only gated AREA and the pick isn't an
    // area: evicting it trades the 91-damage nova for the incoming
    // single-target effect (live: the Scrik shipped with no spike
    // anywhere). The pick demotes to 1/Day instead — the same demotion
    // the assembly belts use — and both the one-Recharge law and the
    // nova survive.
    let demoteTo1Day = false;
    // A seated row that shares a FAMILY with one already chosen must
    // replace it, not join it: the guarantee bypasses the pick loop's
    // family cap entirely, which is how a teleport signature seated a
    // second mobility legendary beside a pounce (live-sweep, CR 15 seed
    // 10). Same bypass class as the Recharge cap below.
    const famConflicts = (() => {
      const fams = familiesOf(pick);
      if (!fams.length) return [];
      return chosen.map((c, i) => (familiesOf(c).some((f) => fams.includes(f))
        && !spineSet.has(c) && !guaranteed.has(c) ? i : -1))
        .filter((i) => i !== -1);
    })();
    // ALL of them, not the last one — a multi-family pick conflicts with
    // every row it shares a family with, and leaving any behind breaks the
    // law the cap exists to keep. Rare after the soft filter above.
    // Splicing the earlier conflicts shifts every later index down, so the
    // surviving victim's position must be re-based or the swap lands on
    // the wrong row.
    const doomed = famConflicts.slice(0, -1);
    const famVictim = famConflicts.length
      ? famConflicts[famConflicts.length - 1] - doomed.length : undefined;
    for (const idx of [...doomed].sort((a, b) => b - a)) chosen.splice(idx, 1);
    let gatedVictim = famVictim ?? (gatedLike(pick)
      ? chosen.map((c, i) => (gatedLike(c) && !spineSet.has(c) && !guaranteed.has(c) ? i : -1))
        .filter((i) => i !== -1).pop()
      : undefined);
    if (famVictim == null && gatedVictim != null
      && chosen[gatedVictim].slot_type === 'area' && pick.slot_type !== 'area') {
      demoteTo1Day = true;
      gatedVictim = undefined;
    }
    const victimIdx = gatedVictim ?? chosen.map((c, i) => {
      if (c.slot_type !== pick.slot_type || spineSet.has(c) || guaranteed.has(c)) return -1;
      const without = satisfiedBy(chosen.filter((x) => x !== c), traits);
      return (pick.requires ?? []).every((r) => without.has(r)) ? i : -1;
    })
      .filter((i) => i !== -1).pop();
    usedTemplates.add(pick.template_2024);
    usedNames.add(pick.ability);
    const entry = { ...pick, options: [pick],
      ...(demoteTo1Day ? { gate: PURE_MOBILITY(pick) ? null : '1/Day' } : {}) };
    guaranteed.add(entry);
    if (victimIdx != null) chosen[victimIdx] = entry;
    else chosen.push(entry);
  };
  // The swarm kit owns the attack section (7/7 printed swarms: one melee
  // attack) — the attack-mode guarantee seating a ranged row beside it
  // shipped a returning SWORD on a swarm of Tiny crystal shards (live:
  // Wing Blade Return, "returns to the swarm's hand").
  // NOTHING ABOVE CR 4 FIGHTS ONLY AT RANGE (owner call, 2026-08-07, the
  // Uulgroth: Dreamshard was Ranged-only at 60 ft., so a party that closed
  // to 5 feet switched the block's entire offense off). Measured, and it is
  // the strongest rule in the corpus: EVERY printed monster from CR 5 up
  // has a melee-capable attack — 113 of 113 — and the only two exceptions
  // anywhere are a sessile Shrieker Fungus and a Seahorse.
  //
  // Sited HERE, before the seats, deliberately. Moving it after them (the
  // "rules belong after all contributors" shape of the invariant pass) lets
  // it evict SEATED rows and breaks the archetype and signature guarantees
  // outright. The cost of staying here is a residue of ~1 block in 2,592
  // where a later seat evicts the melee row — well inside print's own
  // tolerance, which carries 2 exceptions in 329.
  //
  // A dual-mode row is preferred first so a one-slot block satisfies the
  // melee floor and the range band with the same entry, instead of having
  // the two guarantees evict each other; the ranged predicate below
  // no-ops on "Melee or Ranged Attack Roll".
  const isAttackRow = (a) => a.slot_type === 'plain_attack' || a.slot_type === 'rider_attack';
  const meleeCapable = (a) => /Melee (?:or Ranged )?Attack Roll/.test(a.template_2024 ?? '');
  if (cr >= 5 && archetype !== 'swarm') {
    if (meta.attackMode === 'ranged' || meta.attackMode === 'mixed') {
      swapIn((a) => /Melee or Ranged Attack Roll/.test(a.template_2024 ?? '') && isAttackRow(a),
        ['plain_attack', 'rider_attack']);
    }
    swapIn((a) => meleeCapable(a) && isAttackRow(a), ['plain_attack', 'rider_attack']);
  }
  if ((meta.attackMode === 'ranged' || meta.attackMode === 'mixed') && archetype !== 'swarm') {
    swapIn((a) => /Ranged Attack Roll/.test(a.template_2024 ?? '')
      && (a.slot_type === 'plain_attack' || a.slot_type === 'rider_attack'),
    ['plain_attack', 'rider_attack']);
  }
  if (meta.signatureMechanic && SIGNATURE_FAMILIES[meta.signatureMechanic]) {
    // A signature implies its CHAIN: engulf requires a grappler, so the
    // prerequisite is seated first (swapIn no-ops when already present) —
    // otherwise the swallow pool is empty on any block without a grapple
    // and the guarantee silently starves.
    if (meta.signatureMechanic === 'engulf') {
      swapIn((a) => (a.imposes ?? []).includes('grapple'), ['plain_attack', 'rider_attack', 'save_effect']);
    }
    // Bonus-action swallows preferred (4 of 5 printed swallowers): the
    // swallow rides the turn instead of replacing it, and the Blinded
    // rider arrives with the family (the Kraken's action-cost, riderless
    // swallow stays reachable — every row remains print-verbatim).
    swapIn(SIGNATURE_FAMILIES[meta.signatureMechanic], SLOT_TYPES.concat('legendary'),
      meta.signatureMechanic === 'engulf' ? (a) => a.section === 'Bonus Actions' : null);
  }
  // ARCHETYPE SEATS (owner call, 2026-08-04): the role's signature slot,
  // guaranteed the way the metadata promises are — weight first, verify,
  // swap. The numbers already carry the archetype's trade
  // (applyArchetypeNumbers); this makes the KIT show it (live: a "defender"
  // whose picks were Fire Aura, Spellcasting, and a breath — nothing held
  // ground). Defender seats one hold/pull/punish-movement row (the old
  // spec's required slot, reborn as a guarantee); support seats one row
  // that spends the creature's action making someone else stronger. Entry
  // side only, no legendary: the locked speed-debuff zaps would re-create
  // the all-locked set the unlocked-invariant just repaired, so those
  // shapes satisfy the predicate but are never swapped in. No other
  // archetype gets a seat: brute/artillery/controller/lurker are the
  // weight system's best-covered roles (67-386 tagged rows each), and a
  // glass cannon IS its numbers — its one-row bargain-trait pool would
  // stamp Blood Frenzy on every block, the 60%-frequency generator tell.
  const ARCHETYPE_SEATS = {
    defender: (a) => /Grappled condition|Restrained condition|pulls? (?:the target|one creature|each creature)[^.]*toward|used only for Opportunity Attacks|Speed is (?:0|halved) until the end of/.test(a.template_2024 ?? '')
      || a.section === 'Reactions',
    support: (a) => /casts \*(?:Bless|Healing Word|Cure Wounds|Lesser Restoration|Sanctuary)|gains \d+ \([^)]*\) Temporary Hit Points|together with one creature within 10 feet of itself that is willing|and up to three willing creatures/.test(a.template_2024 ?? ''),
    // Skirmisher seats the STRIKE half of the hit-and-run loop (live: the
    // Skar had the escape teleport and nothing that pays the return trip);
    // lurker seats the unseen half. Both pools are print-verbatim
    // move-and-strike, re-hide, and vanish rows.
    // slot_type gate: a legendary move-attack satisfied the seat while the
    // TURN economy stayed empty (live: the Keening Scuttler's loop had an
    // exit and no entrance, again) — the strike half must be action-tier.
    // A CHARGE is not a withdrawal: Trampling Charge matched the old
    // "moves without provoking" clause and satisfied the seat, so a
    // skirmisher shipped a brute's run-them-over bonus action and never
    // reached for Cunning Action (live: Quenching Rush on the Riveted
    // Bellows). Rows that move THROUGH creatures are excluded by shape.
    // Hide and Disengage are the EXIT, not the strike, and the seat exists
    // precisely because a block had "the escape teleport and nothing that
    // pays the return trip". Accepting them let a Dash/Disengage row satisfy
    // the strike half and ship a skirmisher with no way back in — passing
    // only while the pick loop happened to draw a striker anyway.
    skirmisher: (a) => a.slot_type !== 'legendary'
      && !/through the spaces of/.test(a.template_2024 ?? '')
      && /Melee or Ranged Attack Roll|moves up to (?:half )?its Speed[^.]*(?:without provoking|makes one)/.test(a.template_2024 ?? ''),
    lurker: (a) => a.slot_type !== 'legendary'
      && /Hide action|Invisible condition|can't be seen/.test(a.template_2024 ?? ''),
  };
  if (ARCHETYPE_SEATS[archetype]) {
    swapIn(ARCHETYPE_SEATS[archetype], SLOT_TYPES,
      (a) => (a.archetypes ?? []).includes(archetype));
  }
  // A melee-only skirmisher has the strike half and no way to leave: the
  // concept's attack_mode is honored (it said "lunges"), but the loop
  // needs BOTH halves and a hit-and-run with no run is a brute (live: the
  // Riveted Bellows, three reach-5 attacks and no disengage). The exit
  // seat is additional, never a replacement for the strike.
  if (archetype === 'skirmisher' && meta.attackMode === 'melee') {
    const EXIT = /Hide action|Disengage|doesn't provoke an Opportunity Attack|teleports? up to/;
    if (!chosen.some((c) => EXIT.test(c.template_2024 ?? ''))
      && !traits.some((t) => EXIT.test(t.template_2024 ?? ''))) {
      swapIn((a) => EXIT.test(a.template_2024 ?? '') && !/through the spaces of/.test(a.template_2024 ?? ''),
        ['utility', 'save_effect']);
    }
  }
  // No attack is strictly DOMINATED (owner call; 0/329 printed blocks
  // carry a twin): two attacks on one budget render identical numbers, so
  // if one is melee-or-ranged and the other single-mode with the same
  // damage shape and reach, the second exists to never be picked (live:
  // Scale Shredder beside Brine Spur). The dominated pick redraws into a
  // different damage shape.
  {
    const modeOf = (t) => (/Melee or Ranged Attack Roll/.test(t) ? 'both'
      : /Ranged Attack Roll/.test(t) ? 'ranged' : /Melee Attack Roll/.test(t) ? 'melee' : null);
    const shapeKey = attackShapeKey;
    const attacks = () => chosen.filter(isAttackRow);
    for (const b of attacks()) {
      if (guaranteed.has(b) || spineRows.includes(b)) continue;
      const dominator = attacks().find((a) => a !== b && modeOf(a.template_2024) === 'both'
        && modeOf(b.template_2024) !== 'both' && shapeKey(a) === shapeKey(b));
      if (!dominator) continue;
      const idx = chosen.indexOf(b);
      const pool = ABILITIES.filter((a) => (a.slot_type === 'plain_attack' || a.slot_type === 'rider_attack')
        && !usedTemplates.has(a.template_2024) && !usedNames.has(a.ability)
        && a.section === b.section
        && shapeKey(a) !== shapeKey(dominator)
        && !referencesMissingMode(a, meta.movement)
        && !redundantWithMode(a, meta.movement)
        && (a.cr_ceiling == null || crNumber(cr) <= a.cr_ceiling));
      if (!pool.length) { chosen.splice(idx, 1); continue; }
      const w = {};
      pool.forEach((a, i2) => { w[i2] = proximityWeight(a.cr, cr) * archetypeWeight(a, archetype) * themeWeight(a, themes) * recencyWeight(a, meta.recent) * attackModeWeight(a, meta.attackMode); });
      const redraw = pool[pickWeighted(w, rng)];
      usedTemplates.add(redraw.template_2024);
      usedNames.add(redraw.ability);
      chosen[idx] = { ...redraw, options: [redraw] };
    }
  }
  // The legendary MENU floor, re-checked AFTER every guarantee: seats and
  // family evictions run downstream of pickSlotCounts, so a block that
  // sampled three options could still ship one (a multi-family seat
  // displacing two rows). Print offers 2-3 at CR 15+ and never 1.
  if (crNumber(cr) >= 15) {
    const legCount = () => chosen.filter((c) => c.slot_type === 'legendary').length;
    for (let tries = 0; tries < 3 && legCount() === 1; tries += 1) {
      const before = legCount();
      swapIn((a) => a.slot_type === 'legendary'
        && !familiesOf(a).some((f) => chosen.some((c) => familiesOf(c).includes(f))),
      ['legendary']);
      if (legCount() === before) break; // nothing legal left; take the one
    }
  }

  // A jump is dead text beside a teleport, and the pick-time guard can't
  // see a teleport the signature guarantee seats AFTER it (live-sweep:
  // CR 11 seed 23 kept both). Settle it on the finished set.
  if (chosen.some((c) => /teleports? up to/.test(c.template_2024 ?? ''))) {
    for (let i = chosen.length - 1; i >= 0; i -= 1) {
      if (JUMP_ROW(chosen[i]) && !guaranteed.has(chosen[i]) && !spineRows.includes(chosen[i])) {
        chosen.splice(i, 1);
      }
    }
  }
  // Setup always gets a SPEND: a block with two ways to grapple and no row
  // that uses the grapple is trap machinery wired to nothing (live: the
  // Snaring Coil lashed three times plain while five restraint layers sat
  // idle). Print never strands it — the only printed 2+-imposer block, the
  // Mimic, carries its Bite. One imposer needs no guarantee (Restrained's
  // inherent Advantage is a spend); two is a commitment.
  {
    const imposers = chosen.filter((c) => (c.imposes ?? []).includes('grapple')).length;
    if (imposers >= 2) {
      swapIn((a) => (a.requires ?? []).includes('grapple'), SLOT_TYPES);
    }
  }
  // ── THE INVARIANT PASS ──────────────────────────────────────────────
  // Runs AFTER every path that can contribute a row: the spine, the pick
  // loop, the seats/guarantees, and the backfills. Owner call, 2026-08-06.
  //
  // Every "regression" this sprint had one shape — a constraint
  // implemented at one entry path, walked past by another. Seats bypassed
  // the pick loop's Recharge cap, then its bonus-action cap; the Roc spine
  // walked its grapple past ROLE_EXCLUSIONS onto a skirmisher. Rules
  // belong AFTER all contributors, not at each one.
  //
  // A dragon KIT is exempt: it is the block, not a suggestion.
  {
    const spineOnly = new Set(spineRows.filter((r) => /^(Adult|Ancient|Young) .*Dragon$/.test(r.source ?? '')));
    const dropWhere = (pred) => {
      for (let i = chosen.length - 1; i >= 0; i -= 1) {
        if (pred(chosen[i]) && !spineOnly.has(chosen[i])) chosen.splice(i, 1);
      }
    };
    // 1. the role's exclusions hold against every entry path.
    //    The signature exemption is scoped to the signature's OWN family.
    //    It used to be `!meta.signatureMechanic`, so ANY signature switched
    //    off ALL of a role's exclusions — a skirmisher whose signature was
    //    TELEPORT had its grapple/swallow ban disabled wholesale and shipped
    //    the Tarrasque's Bite and Swallow (live: the Vanteg). A promise
    //    outranks the exclusion it is about, and nothing else.
    if (ROLE_EXCLUSIONS[archetype]) {
      const sigFamily = meta.signatureMechanic ? SIGNATURE_FAMILIES[meta.signatureMechanic] : null;
      dropWhere((c) => ROLE_EXCLUSIONS[archetype](c) && !(sigFamily && sigFamily(c)));
    }
    // 1b. the cognition gate holds against every entry path too — the
    //     Aboleth SPINE walked Consume Memories and Psychic Drain (both
    //     Charmed-dependent) straight past needsMind onto a bestial block.
    if (mind !== 'sapient') dropWhere((c) => needsMind(c));
    // 2. energy-coupled rows only on blocks that speak the energy —
    //    and no energy-bearing row at all on a physical-only block
    dropWhere((c) => !energyFits(c, themes));
    if (meta.damageMix === 'physical') dropWhere((c) => CARRIES_ENERGY(c));
    // 3. ONE Recharge per block (0/329 printed carry two). The extras are
    //    demoted rather than dropped, so the slot survives — but a
    //    PURE-MOBILITY row ungates entirely instead of being rationed to
    //    1/Day. A once-per-day Disengage is not a skirmisher's exit, it is
    //    a dead line; print gates escape hatches not at all (Nimble Escape
    //    is at-will). The nova it collided with is the row that should keep
    //    the Recharge, so mobility rows sort to the back of the queue.
    {
      const gated = chosen.filter(gatedLike)
        .sort((a, b) => Number(PURE_MOBILITY(a)) - Number(PURE_MOBILITY(b)));
      for (const extra of gated.slice(1)) {
        const i = chosen.indexOf(extra);
        if (i === -1) continue;
        chosen[i] = PURE_MOBILITY(extra)
          ? { ...extra, gate: null }
          // The original gate is stashed so step 9 can restore it if the
          // row that KEPT the Recharge is dropped by a later pass — a
          // demotion is an arbitration between two live rows, not a fact
          // about this one.
          : { ...extra, gate: '1/Day', gate_demoted_from: extra.gate };
      }
    }
    // 4. one row per family
    {
      const seen = new Set();
      for (let i = 0; i < chosen.length; i += 1) {
        const fams = familiesOf(chosen[i]);
        if (fams.some((f) => seen.has(f))) { chosen.splice(i, 1); i -= 1; continue; }
        fams.forEach((f) => seen.add(f));
      }
    }
    // 5. at most two Bonus Actions
    {
      const bonus = chosen.filter((c) => c.section === 'Bonus Actions');
      for (const extra of bonus.slice(2)) {
        const i = chosen.indexOf(extra);
        if (i !== -1) chosen.splice(i, 1);
      }
    }
    // 6. the SIGNATURE promise RE-CHECKS after the drops — the melee
    //    floor's disease, one guarantee over: the seat runs before this
    //    pass, so any drop here can evict the one row the metadata
    //    promised, and nothing verified the promise at the end (live: the
    //    Pelted Lull — "signature teleport", a concept that opens by
    //    blinking beside its prey, zero teleport rows shipped). swapIn
    //    re-verifies first, keeps every filter, and seats a single-option
    //    guaranteed menu, so nothing this pass dropped can come back and
    //    the flavor call can't choose the promise away. Sited BEFORE the
    //    melee re-check deliberately: the re-seated signature is in
    //    `guaranteed` so the melee swap can't evict it, and the melee
    //    floor re-verifies last — the pair can't cycle.
    if (meta.signatureMechanic && SIGNATURE_FAMILIES[meta.signatureMechanic]) {
      if (meta.signatureMechanic === 'engulf') {
        swapIn((a) => (a.imposes ?? []).includes('grapple'), ['plain_attack', 'rider_attack', 'save_effect']);
      }
      swapIn(SIGNATURE_FAMILIES[meta.signatureMechanic], SLOT_TYPES.concat('legendary'),
        meta.signatureMechanic === 'engulf' ? (a) => a.section === 'Bonus Actions' : null);
    }
    // 7. the melee floor RE-CHECKS after the drops. The floor's swapIn runs
    //    before the seats and before this pass, so a drop here could remove
    //    the very row that satisfied it — the Roc spine's talons satisfied
    //    the floor, then invariant 1 correctly dropped them (grapple on a
    //    skirmisher) and the block shipped ranged-only (live: the
    //    Brinewrack, one attack, 60 ft., nothing in melee). Re-seating
    //    through swapIn keeps every filter: nothing this pass dropped can
    //    come back.
    if (crNumber(cr) >= 5 && archetype !== 'swarm'
      && !chosen.some((c) => isAttackRow(c) && meleeCapable(c))) {
      swapIn((a) => meleeCapable(a) && isAttackRow(a), ['plain_attack', 'rider_attack']);
    }
    // 8. the DEMOTION'S PREMISE re-checks (the Dreamt Leech, 2026-08-16):
    //    step 3 demotes extra gated rows to 1/Day on the premise that the
    //    Recharge-keeper survives — but any later pass can drop the keeper
    //    (live: the Air Elemental spine's Whirlwind held the Recharge and
    //    died at the dependency fixpoint, so the breath shipped 1/Day with
    //    no Recharge anywhere — print's CR 8 breaths are all Recharge 5-6).
    //    When no Recharge remains, the first demoted survivor gets its
    //    printed gate back; the one-Recharge law holds trivially either way.
    //    Runs BEFORE the generic promotion below so an exact printed gate
    //    (Recharge 4-6) beats the generic 5-6 stamp.
    if (!chosen.some((c) => /Recharge/i.test(c.gate ?? ''))) {
      const demoted = chosen.find((c) => c.gate_demoted_from);
      if (demoted) {
        chosen[chosen.indexOf(demoted)] = { ...demoted, gate: demoted.gate_demoted_from, gate_demoted_from: undefined };
      }
    }
    // 9. NO 1/DAY-ONLY NOVAS, any tier (owner call, 2026-08-16). Measured
    //    twice, both unanimous: all 18 CR 15+ area-damage actions are
    //    Recharge-gated, and across the WHOLE corpus zero blocks field a
    //    1/Day damage area as their only nova — the single printed 1/Day
    //    damage area (the Vrock's Stunning Screech) sits beside a Recharge.
    //    A 1/Day-only nova front-loads one big turn and then flatlines
    //    (live: the Brinewrack's 91-damage Shell-Song at CR 20; the Dreamt
    //    Leech's 60-damage breath at CR 8 — the "damage light" read).
    //    Promoted only when NO Recharge row exists, so the one-Recharge
    //    invariant above is never violated. This pairs with lurker
    //    nova_mult 2.0 -> 1.5 in the spec: a Recharge nova returns
    //    mid-fight, so it no longer needs to carry the whole discount in
    //    one swing.
    if (!chosen.some((c) => /Recharge/i.test(c.gate ?? ''))) {
      const nova = chosen.find((c) => c.slot_type === 'area'
        && /\{damage\}|\d+d\d+/.test(c.template_2024 ?? '') && /1\/Day/i.test(c.gate ?? ''));
      if (nova) chosen[chosen.indexOf(nova)] = { ...nova, gate: 'Recharge 5-6' };
    }
    // 10. the legendary MENU floor re-checks HERE too — its earlier
    //     re-check runs before this pass, and the family cap (step 4) can
    //     drop a legendary after it (surfaced by the Skorvith area floor
    //     shifting draws: CR 17 lurker seed 6 shipped exactly one).
    if (crNumber(cr) >= 15) {
      const legCount = () => chosen.filter((c) => c.slot_type === 'legendary').length;
      for (let tries = 0; tries < 3 && legCount() === 1; tries += 1) {
        const before = legCount();
        swapIn((a) => a.slot_type === 'legendary'
          && !familiesOf(a).some((f) => chosen.some((c) => familiesOf(c).includes(f))),
        ['legendary']);
        if (legCount() === before) break; // nothing legal left; take the one
      }
    }
  }
  return chosen;
}

/** Traits, deduped, same proximity weighting. */
export function pickTraits(cr, n, rng, chosenAbilities = [], archetype = null, themes = null, mind = 'sapient', meta = {}) {
  const out = []; const used = new Set();
  // Whole-text containment reads as redundancy however the wording lands:
  // Amorphous ("move through a 1-inch space") is the entire second half of
  // Water Form, so a block carrying both states the same rule twice. Slots
  // are canonicalized first so {creature}/{substance} spelling can't hide a
  // containment, and the length floor keeps short boilerplate ("The X takes
  // the Dash action.") from tripping it inside longer lists.
  const canon = (t) => String(t).replace(/\{[a-z_0-9]+\}/g, 'X').toLowerCase();
  const contains = (a, b) => {
    const [ca, cb] = [canon(a), canon(b)];
    if (Math.min(ca.length, cb.length) < 60) return false;
    return ca.includes(cb) || cb.includes(ca);
  };
  for (let i = 0; i < n; i += 1) {
    const met = satisfiedBy(chosenAbilities, out);
    const pool = TRAITS.filter((t) => !used.has(t.template_2024)
      && (mind === 'sapient' || !needsMind(t))
      && !referencesMissingMode(t, meta.movement)
      && (t.requires ?? []).every((r) => met.has(r))
      // The emanation family cap never reached the TRAIT pool — the entry
      // loop's family guard can't see it (live: a Frightened aura and a
      // damage aura shipped side by side as traits on the Shre Swarm, the
      // Udraghoth's bug reborn one pool over).
      && !(RECURRING_EMANATION(t) && [...chosenAbilities, ...out].some(RECURRING_EMANATION))
      // ...and neither did the ROLE exclusions. The invariant pass walks
      // entries, so a role-forbidden mechanic arriving as a TRAIT was never
      // checked by anything: the Mimic's Adhesive put a grapple on a
      // skirmisher one pool over from the ban (live, seed 33). Same
      // signature-family exemption as the entry side.
      && !(ROLE_EXCLUSIONS[archetype]?.(t)
        && !(meta.signatureMechanic && SIGNATURE_FAMILIES[meta.signatureMechanic]?.(t)))
      // NO auras on stealth chassis (owner call, 2026-08-04 — a documented
      // exclusion, like the cognition gate): five straight skirmisher
      // blocks wore announce-yourself auras; the x0.3 damp lost to
      // proximity weighting at CR 20 (the Pit Fiend's aura is native
      // there). The aura-signature guarantee still overrides — an explicit
      // concept promise outranks the exclusion, caster-checkbox style.
      && !(RECURRING_EMANATION(t) && (archetype === 'skirmisher' || archetype === 'lurker'))
      && ![...chosenAbilities, ...out].some((c) => contains(t.template_2024, c.template_2024)));
    if (!pool.length) break;
    const weights = {};
    pool.forEach((t, idx) => { weights[idx] = proximityWeight(t.cr, cr) * archetypeWeight(t, archetype) * themeWeight(t, themes) * recencyWeight(t, meta.recent); });
    const pick = pool[pickWeighted(weights, rng)];
    used.add(pick.template_2024);
    out.push(pick);
  }
  return out;
}

/**
 * The damage budget for one entry.
 *
 * Area effects get a FULL round of attacks, not half: measured at a median
 * 1.01x across the 64 SRD creatures that have both. Gating is what pays for
 * it — a gated area runs 1.03x and an ungated one 0.30x.
 */
/**
 * Text fallback for rows without a stamped class (synthetic package traits,
 * future hand-added rows). Mirrors the offline classifier exactly.
 */
function inferDamageClass(ability) {
  const text = ability.template_2024 ?? '';
  if (/At the end of each of the \{creature\}'s turns/.test(text)
      || /starts its turn (?:in|within)/.test(text)) return 'recurring';
  if (ability.section === 'Legendary Actions' || ability.slot_type === 'legendary') return 'legendary';
  if (ability.slot_type === 'area') return 'area';
  if (ability.slot_type === 'save_damage') return 'save_nuke';
  return 'attack';
}

/**
 * Budgets read the stamped damage CLASS, not slot_type. slot_type is a
 * sampling category and using it for budgets is how a legendary entry with
 * area text bypassed area budgeting entirely (the 31-damage breath).
 *
 * The curves, all measured off print:
 *   attack     one attack's worth
 *   area       a full round when gated (1.01x measured), 0.3x ungated
 *   save_nuke  0.3x a round
 *   legendary  0.55x one attack — printed legendary uses run 7-17
 *   recurring  0.5x one attack — printed auras run half an attack (Balor 13 @ CR 19)
 */
function damageBudgetFor(ability, nums) {
  // attacks_per_round survives shape folds (the swarm's Multiattack-less
  // single attack) so area/nova budgets keep pricing a REAL round.
  const round = nums.per_attack_damage * (nums.attacks_per_round ?? nums.multiattack);
  const r = library._meta.damage_ratios;
  switch (ability.damage_class ?? inferDamageClass(ability)) {
    case 'recurring': return Math.max(1, Math.round(nums.per_attack_damage * 0.5));
    case 'legendary': {
      // Save-gated legendary uses run ~0.55x an attack; UNGATED auto-damage
      // runs lower still — the Lich's Deathly Teleport deals 11 where its
      // save-gated Disrupt Life deals 31. Print allows the spam (no lockout
      // on the teleport); what it does not allow is spamming at save-gated
      // damage, which is what 0.55x shipped (live: Rift Step at 17 x3).
      const gated = /Saving Throw/.test(ability.template_2024 ?? '');
      return Math.max(1, Math.round(nums.per_attack_damage * (gated ? 0.55 : 0.4)));
    }
    case 'area': {
      const raw = Math.round(round * (ability.gate ? r.gated_area_multiplier * (nums.nova_mult ?? 1) : r.ungated_area_multiplier));
      // The multiplier is calibrated where print's nova/round ratio is ~1.0
      // (91 vs a 90 round at CR 20) and it held at spec all sprint up there
      // — but print's LOW bands cap harder in absolute terms than a ratio
      // reaches: the strongest sub-5 recharge novas are the wyrmlings at
      // 21-22 (5d8/6d6), CR 1 tops at 18, CR 4 at 24. A ratio-priced 28
      // shipped at CR 2 — above every printed peer and most of a level-3
      // PC's HP. Ceiling from the printed curve, low bands only.
      const crn = crNumber(nums.cr ?? 99);
      const CEIL = crn <= 1 ? 18 : crn <= 3 ? 22 : crn <= 4 ? 24 : null;
      return CEIL ? Math.min(raw, CEIL) : raw;
    }
    case 'save_nuke': return Math.round(round * r.ungated_area_multiplier);
    default: {
      // A SAVE-LESS hard-condition rider pays for itself in damage: print's
      // only such attack, the Lich's Paralyzing Touch, deals 15 beside its
      // 31-damage Eldritch Burst (0.48x) — while the SAVED paralysis
      // carriers (Ghoul, Ghast) take no discount. Full-pool pricing shipped
      // a 30-damage no-save paralyzer whose crit follow-ups cleared 135 a
      // round (live: Spore-Laced Claw).
      const savelessHard = /Attack Roll/.test(ability.template_2024 ?? '')
        && !/Saving Throw/.test(ability.template_2024 ?? '')
        && /Paralyzed|Stunned|Petrified|Unconscious|\{condition_hard\}/.test(ability.template_2024 ?? '');
      if (savelessHard) return Math.max(1, Math.round(nums.per_attack_damage * 0.5));
      // A folded shape's single attack IS the routine — it carries the round.
      return nums.attack_fold ? round : nums.per_attack_damage;
    }
  }
}

/**
 * Substitute every slot in a template. The engine owns all of these; the
 * model's job downstream is the prose around them.
 */
/**
 * Engine-side condition fill (owner call, 2026-08-03). A condition rider is
 * a mechanic, so the flavor model is never asked; the ENGINE picks from the
 * measured menu in _meta.condition_slots at build time. The tier is baked
 * into the slot name ({condition_soft} / {condition_hard}) because severity
 * lives in the row's gate and duration clause, which are fixed. The menu is
 * filtered to conditions print pairs with the row's save stat (Frightened
 * is a Wisdom save 12/13 in print, the hard tier is Constitution), weighted
 * toward the row's printed original (x4) and the block's theme affinities
 * (x3) — guide, never constrain. Without an rng the printed original ships,
 * which keeps no-seed fills and never-fail fallbacks print-identical.
 */
function pickCondition(ability, slot, rng, themes, usedConditions = null, recordConditions = false, mind = 'sapient') {
  const meta = library._meta.condition_slots;
  const dflt = ability.condition_default
    ?? (slot === 'condition_pair' ? meta.pairs[0].pair
      : slot === 'condition_hard' ? 'Paralyzed' : 'Frightened');
  if (!rng) return dflt;
  const save = (ability.template_2024.match(/\*(\w+) Saving Throw\*/) ?? [])[1] ?? null;
  const boosted = new Set((themes ?? []).flatMap((th) => meta.theme_affinity[th] ?? []));
  let options;
  if (slot === 'condition_pair') {
    options = meta.pairs
      .filter((x) => !save || !x.saves.length || x.saves.includes(save))
      .map((x) => x.pair);
  } else {
    const tier = meta.tiers[slot === 'condition_hard' ? 'hard' : 'soft'];
    options = Object.entries(tier)
      .filter(([, saves]) => !save || saves.includes(save))
      .map(([c]) => c);
  }
  // No Charmed on a mind that cannot comprehend speech: all five printed
  // Charmed-imposers speak (the floor is speech, not INT — the Harpy
  // charms at INT 7). Applied to the MENU, so an engine fill can never
  // land Charmed on a bestial block even when the printed default is
  // Charmed — that default falls to Frightened instead.
  if (mind !== 'sapient') {
    options = options.filter((c) => !c.split(' and ').includes('Charmed'));
    if (dflt.split(' and ').includes('Charmed')) return options[rng ? Math.floor(rng() * options.length) : 0] ?? 'Frightened';
  }
  if (!options.includes(dflt)) options.push(dflt); // print is always legal
  // RECURRING AURAS use print's aura menu only (measured 2026-08-04: every
  // printed start-of-turn aura imposes Frightened, Poisoned, Incapacitated
  // or Paralyzed — never Charmed or Deafened). A once-per-round party-wide
  // charm field is a combination print never mints.
  if (/starts its turn in the aura|Emanation while it doesn't have/.test(ability.template_2024 ?? '')) {
    const AURA_CONDITIONS = ['Frightened', 'Poisoned', 'Incapacitated', 'Paralyzed'];
    const auraLegal = options.filter((c) => c.split(' and ').every((w) => AURA_CONDITIONS.includes(w)));
    if (auraLegal.length) options = auraLegal;
  }
  // Cross-entry dedupe (owner-approved 2026-08-04): a condition another
  // entry already imposes leaves the menu — the live Seam's aura granted
  // 24-hour Frightened immunity that a second Frightened emanation then
  // ignored. Never empties: a menu with no fresh options keeps them all.
  if (usedConditions && usedConditions.size) {
    const fresh = options.filter((c) => !c.split(' and ').some((w) => usedConditions.has(w)));
    if (fresh.length) options = fresh;
  }
  const weights = {};
  options.forEach((c, i) => {
    let w = c === dflt ? 4 : 1;
    // The boost must OUTWEIGH the bare default or it never steers: at x3 a
    // theme-boosted alternative (3) always lost to the printed default (4),
    // and four consecutive live blocks shipped the same Frightened aura
    // while their themes pointed elsewhere.
    if (c.split(' and ').some((word) => boosted.has(word))) w *= 6;
    weights[i] = w;
  });
  return options[pickWeighted(weights, rng)];
}

export function fillTemplate(ability, { cr, size, nums, rng = null, themes = null, usedConditions = null, recordConditions = false, mind = 'sapient' }) {
  const sb = scaleBand(cr);
  const area = library._meta.scale_slots.area;
  const attackMod = nums.attack_bonus - nums.pb;
  const budget = damageBudgetFor(ability, nums);
  const usesAttackRoll = /\{attack\}/.test(ability.template_2024);

  // Main vs rider split: across the 136 purely additive multi-damage attacks
  // in the SRD the main instance carries a median 61% of the total.
  const hasRider = /\{rider_damage\}/.test(ability.template_2024);
  // A recurring rider ("takes X at the start of each of its turns") is a
  // save-ends pressure effect, not part of the hit: print keeps the main
  // damage full-size beside it (the Remorhaz's bite is not discounted for
  // its swallow DoT). Splitting the budget 61/39 against a DoT shipped
  // 17-damage bites at CR 20 (live: the Riftbloom, ~70 effective DPR).
  const riderIsDoT = hasRider
    && /at the start of each of (?:its|the \{creature\}'s) turns/.test(ability.template_2024);
  const share = library._meta.damage_ratios.main_damage_share;
  const mainAvg = (hasRider && !riderIsDoT) ? Math.max(1, Math.round(budget * share)) : budget;
  const riderAvg = riderIsDoT
    ? Math.max(1, Math.round(budget * (1 - share)))
    : Math.max(1, budget - mainAvg);

  const main = usesAttackRoll ? attackDamageDiceFor(mainAvg, attackMod) : saveDamageDiceFor(mainAvg);
  const rider = riderDamageDiceFor(riderAvg);

  const sizeIdx = SIZES.indexOf(size);
  // Size-gate floor: zero printed grapple/swallow gates sit below Medium at
  // CR 5+ (all 329 blocks; the CR 11+ floor is the Marilith's Medium, on a
  // Large creature). The printed offsets are RELATIVE (Purple Worm swallows
  // two steps below its own size), so a Large creature inherited "Small or
  // smaller" — a CR 20 whose entire engulf kit was dead text against a
  // Medium party (live: the Bogstone).
  const sizeFloor = crNumber(cr) >= 5 ? SIZES.indexOf('Medium') : 0;
  const shift = (off) => SIZES[Math.min(SIZES.length - 1, Math.max(sizeFloor, Math.max(0, sizeIdx + (off ?? 0))))];
  const n = ability.numbers ?? {};

  const values = {
    attack: `+${nums.attack_bonus}`,
    cast_stat: nums.cast_stat_word ?? 'Charisma',
    // Regeneration and drain amounts: ~0.75x one attack, rounded to the
    // nearest 5 like every printed value (Troll 10 at CR 5, Vampire 20 at
    // CR 13). Another slot the filler never handled — it surfaced the third
    // time the RNG stream shifted, same as {rider2_damage} and {heal} before
    // it; the property test below now sweeps for stragglers.
    heal: Math.max(5, Math.round((nums.per_attack_damage * 0.75) / 5) * 5),
    // Spell attack bonus = PB + cast mod, and the cast mod is pinned to
    // save_dc - 8 - PB, so this collapses to save_dc - 8. One DC, one spell
    // attack, both the engine's (a source literal "+15 to hit" leaked
    // through and tripped spell-dc-ability once the option swap could pull
    // Spellcasting into a block).
    spell_attack: `+${nums.save_dc - 8}`,
    dc: nums.save_dc,
    // Escape DC = 8 + PB + strike mod (which collapses to attack_bonus + 8).
    // 46% of printed escape DCs match this exactly and the rest sit 1-3
    // BELOW it; the old save_dc - 2 policy matched only 17% (live: an
    // escape DC 19 that reconciled with nothing on the block).
    escape_dc: nums.attack_bonus + 8,
    damage: main.avg,
    dice: main.dice,
    rider_damage: rider.avg,
    rider_dice: rider.dice,
    // A third instance exists on exactly one row (the Mimic's Bite). Cheap to
    // support, and leaving it out shipped a literal "{rider2_damage}".
    rider2_damage: rider.avg,
    rider2_dice: rider.dice,
    alt2_damage: Math.round(main.avg * 1.4),
    alt2_dice: main.dice,
    // An alternative REPLACES the main damage under a condition, so it is
    // sized off the main value rather than added to the budget. The swarm's
    // Bloodied form runs the OTHER way — 7 of 7 printed swarms roughly halve
    // (Crawling Claws 20 -> 11, Bats 5 -> 2); the 1.4x upsize would have
    // shipped swarms that hit HARDER once Bloodied.
    ...(/if the swarm is Bloodied/.test(ability.template_2024)
      ? (() => {
        const half = attackDamageDiceFor(Math.max(1, Math.round(mainAvg * 0.5)), attackMod);
        return { alt_damage: half.avg, alt_dice: half.dice };
      })()
      : { alt_damage: Math.round(main.avg * 1.4), alt_dice: main.dice }),
    reach: library._meta.scale_slots.reach.by_size[size] ?? 5,
    target_size: shift(n.target_size_offset),
    capacity_size: shift(n.capacity_size_offset),
    capacity_size_minor: shift(n.capacity_size_minor_offset),
    // Read the shape from the TEMPLATE, not from stored numbers. Trait rows
    // were slotted in a separate pass that never recorded area_shape, so every
    // trait emanation fell through to the CONE table — a Balor's 10-foot Fire
    // Aura rendered as a 60-foot aura dealing full damage with no save.
    // Save-less recurring damage auras cap at 10 feet: print runs 5-10
    // (Azer 5, Balor 5, Fire Elemental 10, Remorhaz 5, Salamander 5 — all
    // CRs, no trend). The pooled emanation band table includes presences
    // (60-240 ft) and shipped a 30-foot no-save party-wide tax at CR 20
    // (live: Masquerade Glitter; the Shre Swarm's Scree before it).
    area: /\{area\}-foot Emanation/.test(ability.template_2024)
      ? (/At the end of each of the \{creature\}'s turns/.test(ability.template_2024)
          && !/Saving Throw/.test(ability.template_2024)
        ? Math.min(area.emanation_by_band[sb], 10)
        : area.emanation_by_band[sb])
      : area.cone_by_band[sb],
    line_length: area.line_length_by_band[sb],
    line_width: area.line_width_by_band[sb],
    radius: area.radius_by_band[sb],
    height: n.height ?? 40,
    // Distances that track the creature rather than the one it was lifted
    // from. The Bronze Dragon's Repulsion Breath pushes 30/40/60/60 feet by
    // age, and leaving that literal split one mechanic into four.
    push_distance: library._meta.scale_slots.push_distance.by_band[sb],
    // the execute threshold tracks tier (print anchor: Solar 100 @ CR 21)
    // so a low-CR draw threatens the wounded, never the whole party — and
    // the LETHALITY tracks tier too: the Sea Hag's CR-2 version drops to
    // 0 (dying, savable); only the high bands kill outright (print's own
    // ladder; owner call: no instakill at low levels)
    execute_threshold: library._meta.scale_slots.execute_threshold.by_band[sb],
    execute_effect: library._meta.scale_slots.execute_effect.by_band[sb],
    sight_range: library._meta.scale_slots.sight_range.by_band[sb],
    teleport_distance: library._meta.scale_slots.teleport_distance.by_band[sb],
  };

  let text = ability.template_2024;
  for (const [k, v] of Object.entries(values)) text = text.split(`{${k}}`).join(String(v));
  for (const slot of ['condition_soft', 'condition_hard', 'condition_pair']) {
    if (!text.includes(`{${slot}}`)) continue;
    const picked = pickCondition(ability, slot, rng, themes, usedConditions, recordConditions, mind);
    if (recordConditions && usedConditions) {
      for (const w of picked.split(' and ')) usedConditions.add(w);
    }
    text = text.split(`{${slot}}`).join(picked);
  }
  return { text, damage: main.avg + (hasRider ? rider.avg : 0) };
}

/**
 * Build a complete mechanical skeleton for a CR. Numbers are final; the
 * prose is a placeholder for the model to reskin.
 */
/**
 * Creature size for a CR, sampled from the observed distribution.
 *
 * The engine picks size BEFORE the flavor call because reach and the hit-die
 * face both follow from it: a Gargantuan creature has 15 ft. reach and d20
 * hit dice. The model is told the size rather than asked for one, so it can
 * never contradict the dice already rolled into the block.
 */
/**
 * The casting stat is engine-owned and BLOCK-WIDE, like the striker. Each
 * template used to carry its source's stat as a literal word, so a block
 * assembling a dragon's Spellcasting (Charisma) beside a lich's legendary
 * (Intelligence... actually Charisma-vs-Intelligence in the live failure)
 * named two different casting stats and only one could be pinned. Weighted
 * by print: Charisma 41, Wisdom 13, Intelligence 8.
 */
/**
 * Row lookup for package members: packages store (source, name) refs so the
 * data stays normalized; members resolve to live rows at build time.
 */
const ROW_INDEX = new Map();
for (const r of [...Object.values(library.categories).flat(), ...Object.values(library.traits.by_category).flat()]) {
  ROW_INDEX.set(`${r.source}|${r.ability ?? r.trait}`, r);
}

/**
 * A synergy package as the block's SPINE (owner call): its members were
 * designed together inside one printed creature — the Mimic's Adhesive is
 * why its Bite has advantage; the Behir's Constrict is what its Swallow
 * eats. Slot sampling can only avoid incompatibility; a package supplies
 * belonging. Crosses trait/action/legendary lines deliberately.
 *
 * Returns { rows, traitRows } or null when nothing fits the sampled counts —
 * in which case the block is all singles, as before.
 */
export function pickPackage(cr, counts, rng, archetype = null, themes = null, mind = 'sapient', recent = null) {
  // Packages bypass the pool filters (they enter as a spine), so the
  // cognition gate must apply to the package as a whole: a mindless block
  // must not receive a Spellcasting member through the side door.
  const list = (library.packages?.list ?? []).filter((pk) => pk.members.length >= 2
    && (mind === 'sapient' || !pk.members.some((m) => {
      const row = ROW_INDEX.get(`${pk.source}|${m.name.replace(/ \(.*\)$/, '')}`) ?? ROW_INDEX.get(`${pk.source}|${m.name}`);
      return row && needsMind(row);
    })));
  if (!list.length) return null;
  const weights = {};
  list.forEach((pk, i) => {
    const arch = !archetype || !pk.archetypes.length ? 1
      : pk.archetypes.includes(archetype) ? ARCHETYPE_MATCH : ARCHETYPE_MISS;
    weights[i] = proximityWeight(pk.cr, cr) * arch * themeWeight(pk, themes) * recencyWeight(pk, recent);
  });
  // A few weighted draws; first package whose ability members FIT the
  // sampled counts wins. "Slip one or two in if we can't add a full
  // package" — smaller packages fit more often, and a no-fit falls through
  // to plain singles.
  for (let tries = 0; tries < 6; tries += 1) {
    const pk = list[pickWeighted(weights, rng)];
    const rows = []; const traitRows = [];
    let ok = true;
    const need = {};
    for (const m of pk.members) {
      const row = ROW_INDEX.get(`${pk.source}|${m.name.replace(/ \(.*\)$/, '')}`) ?? ROW_INDEX.get(`${pk.source}|${m.name}`);
      if (!row || row.excluded) { ok = false; break; }
      if (m.kind === 'trait' || row.pool === 'trait' || row.trait) traitRows.push(row);
      else { rows.push(row); need[row.slot_type] = (need[row.slot_type] ?? 0) + 1; }
    }
    if (!ok) continue;
    for (const [slot, n] of Object.entries(need)) {
      if ((counts[slot] ?? 0) < n) { ok = false; break; }
    }
    if (ok && rows.every((r) => r.cr_ceiling == null || crNumber(cr) <= r.cr_ceiling)) {
      return { name: `${pk.source} package`, source: pk.source, rows, traitRows };
    }
  }
  return null;
}

/**
 * The dragon exception (owner call): dragons are the one family users
 * expect a SHAPE from — breath weapon, frightful presence, the legendary
 * trio. Composition sampling cannot promise that, so a Dragon-typed
 * generation takes a whole printed dragon as its kit, rescaled through the
 * same machinery as everything else. Golems/elementals may earn the same
 * treatment later; nothing else should.
 */
export function pickDragonKit(cr, rng) {
  const dragons = {};
  for (const r of [...Object.values(library.categories).flat(), ...Object.values(library.traits.by_category).flat()]) {
    if (/^(Adult|Ancient|Young) .*Dragon$/.test(r.source) && !r.package) {
      (dragons[r.source] ??= []).push(r);
    }
  }
  const names = Object.keys(dragons);
  if (!names.length) return null;
  const weights = {};
  names.forEach((n, i) => { weights[i] = proximityWeight(dragons[n][0].cr, cr); });
  const chosen = names[pickWeighted(weights, rng)];
  return {
    name: `${chosen} kit`,
    source: chosen,
    rows: dragons[chosen].filter((r) => !(r.trait || r.pool === 'trait')),
    traitRows: dragons[chosen].filter((r) => r.trait || r.pool === 'trait'),
  };
}

/**
 * The swarm package (owner call, 2026-08-04): swarms need to be swarm-shaped,
 * the dragon-kit principle applied to print's other unanimous family. All 7
 * printed swarms share the same core — the Swarm trait, one Bloodied-form
 * attack, Bludgeoning/Piercing/Slashing resistance, and the same eight
 * condition immunities (the defenses stamp in skeleton/generate.mjs). Unlike
 * the dragon kit this is a CORE, not the whole layout: sampled slots still
 * ride along (print's precedent — the Swarm of Ravens carries Cacophony
 * beside its Beaks). Constituent-specific accessories (Water Breathing,
 * Spider Climb) are deliberately NOT inherited — the trait pool supplies
 * those when the concept earns them.
 */
export function pickSwarmKit(cr, rng) {
  const attacks = Object.values(library.categories).flat()
    .filter((r) => /if the swarm is Bloodied/.test(r.template_2024 ?? '') && !r.excluded);
  const swarmTrait = Object.values(library.traits.by_category).flat()
    .find((t) => t.trait === 'Swarm');
  if (!attacks.length || !swarmTrait) return null;
  const weights = {};
  attacks.forEach((a, i) => { weights[i] = proximityWeight(a.cr, cr); });
  const attack = attacks[pickWeighted(weights, rng)];
  return {
    name: 'Swarm package',
    source: attack.source,
    rows: [attack],
    // "Swarm" is rules vocabulary the table recognizes at a glance, like
    // Legendary Resistance — the name survives the flavor pass.
    traitRows: [{ ...swarmTrait, name_locked: true }],
  };
}

/**
 * The after-death slot (owner design): optional, CR-ramped, two sentences.
 * The family derives from the creature type; themes pick among candidates.
 * The old Restoration rows flooded the general trait pool (20 near-identical
 * rows = 20x draw weight, picked on three of eight live blocks); frequency
 * now sits under this ramp instead of pool arithmetic.
 */
export function pickOnDeath(cr, rng, { typeHint = null, themes = null, recent = null, mind = 'sapient' } = {}) {
  const od = library.on_death;
  if (!od) return null;
  const n = crNumber(cr);
  // CR 20+ bosses ALWAYS die interestingly (owner call, 2026-08-05 —
  // parked since the on-death system landed; three consecutive CR 20
  // blocks rolled empty slots and drew reviewer comment, and every
  // family now carries adjudicable teeth worth rolling).
  const chance = n >= 20 ? 1 : (od.chance_by_band[n < 5 ? '0-4' : n <= 10 ? '5-10' : n <= 16 ? '11-16' : '17+'] ?? 0);
  if (rng() >= chance) return null;
  const family = typeHint ? od.type_default[typeHint] : null;
  if (typeHint && family === null && od.type_default[typeHint] === null) return null; // typed "no lore" families
  const poolRows = [
    ...Object.values(library.traits.by_category).flat(),
    ...Object.values(library.categories).flat(),
  ].filter((r) => r.pool === 'on_death' && !r.excluded);
  // Printed on-death traits (the Mummy Lord's heart, the Lich's spirit jar)
  // compete with the bespoke templates; the type's default family gets a
  // 3x thumb on the scale below, never a filter.
  // Dedupe by template: 20+ fiends carry the same planar Restoration, and
  // as rows they out-vote any family thumb (the same duplicate-flooding
  // that made Restorations ubiquitous before the slot existed).
  const seen = new Set();
  const candidates = [...od.templates, ...poolRows].filter((t) => {
    // An "unfinished purpose" that hounds a killer's dreams requires a
    // PURPOSEFUL mind (owner call, 2026-08-12: "a creature with 6 Int
    // doesn't do bargains"). Bestial and mindless creatures die into
    // residue, anchors, and regrowth — never into a vow.
    if (t.excluded) return false;
    if (t.needs_mind && mind !== 'sapient') return false;
    // UNCONDITIONAL revival floors at CR 10 (owner call, 2026-08-16, the
    // Ashfall: a full-HP 5d10-day resurrection on a CR 8 scavenger drake).
    // Print's split is exact: CONDITIONAL planar restoration ("dies
    // outside the Abyss -> revives in the Abyss") ships at every tier —
    // Lemure CR 0, Vrock 6, Hezrou 8 — because the counterplay is where
    // you kill it; revival with no locational condition starts at the
    // Aboleth's CR 10 and nothing below. cr_floor rides the data rows.
    if (t.cr_floor != null && n < t.cr_floor) return false;
    const k = t.template_2024;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  if (!candidates.length) return null;
  const weights = {};
  // FAMILY-level weighting: each family carries one vote (x6 for the type
  // default), split among its templates. Per-row weighting let the place
  // family win on sheer variant count — the same duplicate-flooding that
  // made Restorations ubiquitous before the slot existed, one level up.
  const famSize = {};
  for (const t of candidates) famSize[t.death_family] = (famSize[t.death_family] ?? 0) + 1;
  candidates.forEach((t, i) => {
    weights[i] = (themeWeight(t, themes) * recencyWeight(t, recent) * (t.death_family === family ? 6 : 1)) / famSize[t.death_family];
  });
  const pick = candidates[pickWeighted(weights, rng)];
  return { ...pick, trait: pick.trait ?? 'Deathless Return', section: 'Traits', cr: crKey(cr), source: pick.source ?? 'on-death slot', on_death: true };
}

export function pickCastStat(rng) {
  const roll = rng() * 62;
  return roll < 41 ? 'Charisma' : roll < 54 ? 'Wisdom' : 'Intelligence';
}

export function pickSize(cr, rng) {
  const dist = library.composition.size.by_band[bandFor(cr)];
  const total = Object.values(dist).reduce((a, b) => a + b, 0);
  let r = rng() * total;
  for (const [name, n] of Object.entries(dist)) { r -= n; if (r <= 0) return name; }
  return 'Medium';
}

export function buildSkeleton({
  cr, size = null, seed = 1, alternatives = 1, archetype = null, caster = false,
  strikeStat = null, family = null, themes = null, typeHint = null, mind = 'sapient',
  attackMode = null, movement = null, signatureMechanic = null, recent = null,
  damageMix = null,
}) {
  const meta = { attackMode, movement, signatureMechanic, recent, damageMix };
  const rng = makeRng(seed);
  // One condition ledger per block: entries and traits RECORD their
  // engine-filled conditions, menu options only consult, so no two entries
  // impose the same condition through different delivery paths (the
  // double-fear laundering class).
  const usedConditions = new Set();
  // eslint-disable-next-line no-param-reassign
  size = size ?? pickSize(cr, rng);
  const nums = applyArchetypeNumbers(numbersFor(cr), archetype);
  const castStatWord = pickCastStat(rng);
  nums.cast_stat_word = castStatWord;
  const counts = pickSlotCounts(cr, rng);
  // THE DISCOUNT NEEDS ITS OUTLET (owner catch 2026-08-17, the Skorvith:
  // a CR 8 lurker rolled area=0, its signature resolved to a zero-damage
  // snare, and the block shipped 27 total DPR against a ~50 band — the
  // 0.6x sustained discount applied with NO spike to pay it back). The
  // legendary tier has this exact floor already; any archetype whose
  // nova_mult > 1 assumes a gated damage area exists, so one is
  // guaranteed the same way.
  if ((nums.nova_mult ?? 1) > 1 && !counts.area) counts.area = 1;
  // ...and a CONTROLLER'S outlet is its save rows (owner agreement,
  // 2026-08-17, the Old Dreamknot: a DC 16 controller shipped with ZERO
  // save rows — dc_mod pays for a consumer that sampling never rolled).
  if (archetype === 'controller' && !counts.save_effect && !counts.save_damage) {
    counts.save_effect = 1;
  }
  // ENTRY-COUNT VALVE (owner call, 2026-08-05): print's total entry count
  // maxes at 12 (Tarrasque) with a median of 8 at CR 10+; independent
  // sampling occasionally stacks every slot hot and guarantees pile on
  // top (live: 16 entries on the Tar-Shroud Watcher). Shed the sampled
  // slots least central to a block's identity until the projected total
  // (slots + Multiattack + Legendary Resistance) fits the printed
  // envelope; floors and guarantees still add after, so this is a soft
  // ceiling, not a cap.
  {
    const SHED_ORDER = ['save_effect', 'save_damage', 'utility', 'trait', 'area', 'legendary'];
    const FLOORS = { trait: 2, area: 1, legendary: 2 };
    const projected = () => [...SLOT_TYPES, 'trait', 'legendary'].reduce((t, k) => t + (counts[k] ?? 0), 0) + 2;
    let guard = 12;
    while (projected() > 12 && guard-- > 0) {
      const shed = SHED_ORDER.find((k) => (counts[k] ?? 0) > (FLOORS[k] ?? 0));
      if (!shed) break;
      counts[shed] -= 1;
    }
  }
  // Abilities first, then traits WITH the abilities visible: a trait like
  // Misty Escape says "uses Shape-Shift", and picking traits first left that
  // reference dangling because the ability list did not exist yet. Any
  // ability whose own trait dependency ends up unmet is dropped afterwards.
  // The caster flag guarantees a Spellcasting entry rather than leaving it
  // to the dice — the chassis honored it and the skeleton had dropped it.
  if (caster) counts.utility = Math.max(counts.utility ?? 0, 1);

  // An explicit caster request overrides the mind profile: the user asked
  // for spells, so the concept is sapient whatever the seed rolled. Dragons
  // are sapient by definition (every printed dragon speaks).
  const effMind = caster || family === 'dragon' ? 'sapient' : mind;

  // The spine: a whole printed dragon for Dragon-typed generations (the one
  // family users expect a SHAPE from), else a mined synergy package when one
  // fits the sampled counts, else nothing and the block is all singles.
  let spine = null;
  if (family === 'dragon') spine = pickDragonKit(cr, rng);
  if (!spine && archetype === 'swarm') {
    spine = pickSwarmKit(cr, rng);
    // The kit's Bloodied-form attack IS the attack section: 7 of 7 printed
    // swarms have exactly one attack action (the mass is the multiattack —
    // the round's whole budget is already folded into it). Non-attack slots
    // stay sampled: the Swarm of Ravens carries Cacophony beside its Beaks.
    if (spine) {
      counts.plain_attack = 0;
      counts.rider_attack = 0;
    }
  }
  if (!spine) spine = pickPackage(cr, counts, rng, archetype, themes, effMind, recent);
  const spineTraits = spine?.traitRows ?? [];
  if (family === 'dragon' && spine) {
    // A dragon kit IS the layout: counts follow it instead of the dice.
    for (const t of SLOT_TYPES) counts[t] = 0;
    counts.legendary = spine.rows.filter((r) => r.section === 'Legendary Actions').length;
    counts.trait = 0;
  }
  const abilities = pickAbilities(cr, counts, rng, [], alternatives, archetype, spine?.rows ?? [], themes, effMind, meta);
  if (caster && !abilities.some((a) => /\{spells\}/.test(a.template_2024))) {
    const pool = ABILITIES.filter((a) => a.slot_type === 'utility' && /\{spells\}/.test(a.template_2024));
    if (pool.length) {
      const w = {};
      pool.forEach((a, i) => { w[i] = proximityWeight(a.cr, cr); });
      abilities.push({ ...pool[pickWeighted(w, rng)], options: undefined });
    }
  }
  let traits = pickTraits(cr, counts.trait, rng, abilities, archetype, themes, effMind, meta);
  // The aura signature lives in the TRAIT pool, out of swapIn's reach: if
  // the concept named it and neither side carries one, seat an aura trait.
  if (signatureMechanic === 'aura') {
    const AURA = /Emanation originating from the \{creature\}(?: takes| while it doesn't have)/;
    // Satisfied by ANY ungated recurring emanation (same predicate as the
    // family cap) — checking only the aura shapes would seat a second
    // emanation beside a presence-style one.
    const has = [...abilities, ...traits].some(RECURRING_EMANATION);
    if (!has) {
      const metA = satisfiedBy(abilities, traits);
      const pool = TRAITS.filter((t) => AURA.test(t.template_2024 ?? '')
        && !traits.some((x) => x.template_2024 === t.template_2024)
        && ((t.requires ?? []).every((r) => metA.has(r))));
      if (pool.length) {
        const w = {};
        pool.forEach((t, idx) => { w[idx] = proximityWeight(t.cr, cr) * archetypeWeight(t, archetype) * themeWeight(t, themes) * recencyWeight(t, meta.recent); });
        traits = [...traits, pool[pickWeighted(w, rng)]];
      }
    }
  }
  const onDeath = pickOnDeath(cr, rng, { typeHint: family === 'dragon' ? 'Dragon' : typeHint, themes, recent, mind: effMind });
  if (onDeath) traits = [...traits, onDeath];
  // Spine traits ride along (the Mimic's Adhesive arrives WITH its Bite),
  // deduped against the sampled ones.
  for (const t of spineTraits) {
    if (!traits.some((x) => x.template_2024 === t.template_2024)) traits.unshift(t);
  }
  // The legendary package is a RULE, not a roll: 30 of 30 SRD creatures with
  // legendary actions carry Legendary Resistance. It rides on top of the
  // sampled trait count instead of consuming it.
  if ((counts.legendary ?? 0) > 0) {
    traits = [...PACKAGE_TRAITS.filter((t) => t.package === 'legendary')
      // name_locked: "Legendary Resistance" is rules vocabulary the table
      // recognizes at a glance, like a condition name. The model renamed it
      // "Sanctified Purpose" and "Unyielding Vigil" on live blocks — the
      // gate survived (the earlier fix) but the recognizability didn't.
      .map((t) => ({ ...t, trait: `${t.trait} (${t.gate})`, name_locked: true })), ...traits];
  }
  // Now that BOTH lists exist, drop anything whose dependencies still are not
  // met. Traits can satisfy an ability (the Mimic's Adhesive is what grapples)
  // and abilities can satisfy a trait, so settle it to a fixpoint rather than
  // in one direction: removing an entry can strand the entry that needed it.
  let kept = abilities;
  for (let pass = 0; pass < 4; pass += 1) {
    const met = satisfiedBy(kept, traits);
    const next = kept.filter((a) => (a.requires ?? []).every((r) => met.has(r)));
    if (next.length === kept.length) break;
    kept = next;
  }
  // The demotion's premise re-checks HERE too, not just inside the invariant
  // pass: this fixpoint runs downstream of it and is the pass that killed
  // the live keeper (the Dreamt Leech's Whirlwind). A 1/Day-demoted row on
  // a block whose Recharge died gets its printed gate back.
  if (!kept.some((c) => /Recharge/i.test(c.gate ?? ''))) {
    const demoted = kept.find((c) => c.gate_demoted_from);
    if (demoted) {
      kept = kept.map((c) => (c === demoted
        ? { ...c, gate: c.gate_demoted_from, gate_demoted_from: undefined } : c));
    }
  }
  // ...and the no-1/Day-only-nova law (invariant step 9) holds here too,
  // for the natively-1/Day area whose Recharge keeper died at the fixpoint.
  if (!kept.some((c) => /Recharge/i.test(c.gate ?? ''))) {
    const nova = kept.find((c) => c.slot_type === 'area'
      && /\{damage\}|\d+d\d+/.test(c.template_2024 ?? '') && /1\/Day/i.test(c.gate ?? ''));
    if (nova) kept = kept.map((c) => (c === nova ? { ...c, gate: 'Recharge 5-6' } : c));
  }

  // DC coherence (4 live blocks in a row flagged it): only CASTERS had a
  // stat pinned to support the block DC — a non-caster's DCs matched
  // nothing on its sheet. Non-casters now key the block DC off CON, the
  // printed convention for breaths and auras: DC = 8 + PB + table CON mod,
  // and stampStats pins CON to exactly that. Every DC on the sheet then
  // reconciles with either CON or the striker.
  const hasSpell = kept.some((a) => /\{spells\}|spellcasting ability/.test(a.template_2024));
  if (!hasSpell) {
    // The archetype's dc_mod folds into CON here so every downstream
    // identity still holds: DC = 8 + PB + CON mod, stampStats pins CON to
    // that mod, and hpFormulaFor sizes the flat bonus off the same value.
    nums.con_mod = (nums.con_mod ?? 0) + (nums.dc_mod ?? 0);
    nums.save_dc = 8 + nums.pb + nums.con_mod;
  }

  // The belts below ADD gates at assembly, invisible to the pick-time
  // Recharge cap — a belt-gated control BA beside a row-gated breath
  // assembled the two-Recharge block print never fields (live-sweep:
  // Quick Grapple (Recharge 4-6) beside Acid Breath (Recharge 5-6)). One
  // Recharge per block: once taken, belts fall back to 1/Day (printed
  // shape — the Vrock's Stunning Screech).
  let rechargeTaken = kept.some((k) => /Recharge/i.test(k.gate ?? ''));
  const entries = kept.map((a, i) => {
    const { text, damage } = fillTemplate(a, { cr, size, nums, rng, themes, usedConditions, recordConditions: true, mind: effMind });
    // A repeatable 60-foot paralysis cone is the class of thing no printed
    // block ships: hard-condition areas are ALWAYS gated. Belt-and-braces
    // over the data fix, because one ungated row slipping through is a
    // balance hole, not a wart (live: Rooting Spore Cloud, every turn).
    // Ladder-form rows (First Failure -> Second Failure) are SELF-gated:
    // the escalation buffer is the counterplay, and print ships them
    // ungated — 20/20 two-breath dragons label only the damage breath
    // "(Recharge 5-6)" while Sleep/Paralyzing/Weakening Breath go free.
    // The belt stamping them minted the two-Recharge dragon the tripwire
    // caught (live: the Ryll's Delirium Breath).
    const hardAreaUngated = !a.gate
      && (a.slot_type === 'area' || /each creature in/.test(text))
      && /Paralyzed|Stunned|Petrified|Unconscious/.test(text)
      && !/(?:First|Second) Failure/i.test(text);
    // An at-will no-damage save-condition BONUS ACTION is printed at low CR
    // (the Pirate Captain's Captain's Charm, CR 6) but never at high CR,
    // where a free charm every round stacks into a sealed defense beside
    // Legendary Resistance and a control nova (live: Glamour of the Broken
    // Pact). Gated at CR 11+ only, so the printed low-CR shape stays legal.
    const ungatedControlBA = !a.gate && a.section === 'Bonus Actions'
      && /Saving Throw/.test(text) && SHAPE_CONDS.test(text)
      && !/\d+ \(\d+d\d+\)/.test(text) && crNumber(cr) >= 11;
    let gate = a.gate ?? null;
    if (!gate && (hardAreaUngated || ungatedControlBA)) {
      gate = rechargeTaken ? '1/Day' : (hardAreaUngated ? 'Recharge 5-6' : 'Recharge 4-6');
      rechargeTaken = true;
    }
    return {
      // Stable handle so the flavor call can address an entry without
      // repeating its text back, which is where drift gets in.
      id: `e${i + 1}`,
      section: a.section,
      slot_type: a.slot_type,
      name: a.ability,
      gate,
      text,
      damage,
      derived_from: `${a.source} (CR ${a.cr})`,
      row_key: rowKeyOf(a),
      // Print never renames these (Spellcasting, Immutable Form) — and spell
      // echoes route through the literal name "Spellcasting", so a rename
      // strands every "uses Spellcasting to cast X" reference (live: the
      // Groan's echo pointed at an entry renamed "Buried King's Litany").
      name_locked: Boolean(a.name_locked),
      // How hard the model should work to make this its own. A Bite shared by
      // 131 creatures needs no disguise; an ability printed on exactly one
      // creature will be recognised by anyone who knows the SRD.
      sources_sharing: a.sources_sharing,
      signature: Boolean(a.signature),
      archetypes: a.archetypes ?? [],
      facets: a.facets ?? [],
      // The dependency layer reads these off ENTRIES, and they were only ever
      // copied onto the options — so every default was invisible to it: a
      // block could swap away its Constrict and nothing knew grapple had
      // left (live: grapple-dependency-orphan under a last-option sweep).
      requires: a.requires ?? [],
      imposes: a.imposes ?? [],
      // Every alternative for this slot, already filled and scaled. The
      // concept picks one; whichever it picks is mechanically valid, so the
      // choice cannot break the block.
      options: (a.options ?? [a]).map((o) => {
        const filled = fillTemplate(o, { cr, size, nums, rng, themes, usedConditions, mind: effMind });
        return {
          key: o.ability,
          name: o.ability,
          text: filled.text,
          damage: filled.damage,
          gate: o.gate,
          name_locked: Boolean(o.name_locked),
          signature: Boolean(o.signature),
          derived_from: `${o.source} (CR ${o.cr})`,
          // Carried so a swap can be checked: choosing an option that no
          // longer imposes Grappled would strand a grapple-dependent entry.
          requires: o.requires ?? [],
          imposes: o.imposes ?? [],
          slot_type: o.slot_type,
        };
      }),
      // The library's full name list for this mechanic, offered as vocabulary
      // rather than stamped: a non-fiery creature should not arrive already
      // called Fire Breath.
      name_is_flavor: true,
    };
  });

  const attacks = entries.filter((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack');

  // The striker stat is the ENGINE's decision, measured, not the model's
  // ranking: of 314 SRD melee attackers the flat bonus resolves to STR 72%,
  // DEX 24%, a mental stat 2.5% — and at Huge/Gargantuan it is STR in 100%
  // of printed blocks. Letting the model's highest stat become the striker
  // shipped a Huge dragon biting with CHA 26 over STR 18, an inversion no
  // printed dragon exhibits (Ancients run STR 26-30 with CHA always lower).
  // A mental striker stays possible, but only by explicit declaration (the
  // Ghost/Lich touch-attack class), never by inference.
  const firstAttack = attacks[0];
  const ranged = firstAttack
    && /Ranged Attack Roll|range \d+/.test(firstAttack.text)
    && !/Melee or Ranged/.test(firstAttack.text);
  const bigBody = ['Large', 'Huge', 'Gargantuan'].includes(size);
  const smallBody = ['Tiny', 'Small'].includes(size);
  const strike = strikeStat
    ?? (ranged ? 'DEX' : bigBody ? 'STR' : smallBody ? 'DEX' : 'STR');

  // Entries lifted from other creatures name THEIR attack ("makes one Rend
  // attack"). The dependency tag guarantees an attack exists, but not that
  // it is called Rend. Repoint every such reference at this block's own
  // attack, or the reader hits a dead end and unknown-action-ref rejects it.
  if (attacks.length) {
    const own = attacks[0].name;
    for (const e of entries) {
      e.text = e.text.replace(
        /\b(makes?|replace|repeats?) (one|two|three|its|a|an|the) ([A-Z][a-z]+(?: [A-Z][a-z]+)?) attack/g,
        (m, verb, count, named) => (named === own ? m : `${verb} ${count} ${own} attack`),
      );
    }
  }

  // Repointing references can make two entries identical: Pounce and
  // Deathless Strike are both "moves up to half its Speed and makes one X
  // attack", distinct only in the attack they named. Drop the collision.
  const byText = new Set();
  for (let i = entries.length - 1; i >= 0; i -= 1) {
    if (byText.has(entries[i].text)) entries.splice(i, 1);
    else byText.add(entries[i].text);
  }

  if (attacks.length && nums.multiattack > 1) {
    // Print enumerates every attack option in the Multiattack line (the 2024
    // Vampire: "makes two Grave Strike attacks. It can replace one attack
    // with a use of Bite."). A second attack the line never names reads as
    // an editing mistake (live: the Udraghoth's Bite, then the Groan's maw).
    const secondary = attacks.slice(1)
      .map((a) => ` It can replace one attack with a use of ${a.name}.`).join('');
    entries.unshift({
      section: 'Actions',
      slot_type: 'multiattack',
      name: 'Multiattack',
      text: `The {creature} makes ${['', 'one', 'two', 'three', 'four', 'five', 'six'][nums.multiattack]} ${attacks[0].name} attacks.${secondary}`,
      derived_from: `observed median for CR band ${bandFor(cr)}`,
    });
  }

  return {
    cr: crKey(cr),
    size,
    seed,
    archetype,
    ac: nums.ac,
    hp: nums.hp,
    hp_formula: hpFormulaFor(nums.hp, size, nums.con_mod),
    pb: nums.pb,
    attack_bonus: nums.attack_bonus,
    save_dc: nums.save_dc,
    per_attack_damage: nums.per_attack_damage,
    multiattack: nums.multiattack,
    con_mod: nums.con_mod,
    speed_mod: nums.speed_mod ?? 0,
    strike_stat: strike,
    cast_stat: castStatWord,
    // The spellcasting stat's required modifier: pinning a mental stat to
    // exactly this makes 8 + PB + mod equal the table DC, so a block never
    // prints two different save DCs (live: spell DC 22 against DC 21
    // everywhere else — a chassis-era correction re-derived the DC from an
    // unpinned CHA and overrode the engine).
    cast_mod: nums.save_dc - 8 - nums.pb,
    counts,
    package: spine ? { name: spine.name, source: spine.source } : null,
    // The functional-slot view: which boss roles this block fills. The
    // floors already ENFORCE the load-bearing ones at tier; this makes an
    // empty slot visible instead of implicit (the Alabaster's missing
    // legendary set was an invisible empty slot for four fixes).
    roles: {
      defiance: traits.some((t) => (t.trait ?? '').startsWith('Legendary Resistance')),
      nova: kept.some((a) => a.gate && a.slot_type === 'area'),
      aura: [...traits, ...kept].some((r) => /Emanation originating from the \{creature\}/.test(r.template_2024 ?? '')),
      mobility: kept.some((a) => /teleports? |Dash|flies|moves up to/.test(a.template_2024 ?? '')),
      rider: kept.some((a) => a.slot_type === 'rider_attack' || /\{rider_damage\}/.test(a.template_2024 ?? '')),
      on_death: traits.some((t) => t.on_death),
      legendary: (counts.legendary ?? 0) > 0,
    },
    themes: themes ?? [],
    movement: movement ?? null,
    // the chassis's range posture, so downstream passes can aim
    // mobility references at an attack the body can deliver
    attack_mode: attackMode ?? null,
    mind: effMind,
    traits: traits.map((t, i) => ({
      // gate and section ride along so the flavor step can re-append the
      // use limit after a rename: the model renamed Legendary Resistance to
      // "Flawless Reflexes" and the "(3/Day)" baked into the NAME went with
      // it — an auto-succeed-forever trait (live: the Alabaster).
      gate: t.gate ?? null,
      section: 'Traits',
      facets: t.facets ?? [],
      name_locked: Boolean(t.name_locked),
      on_death: Boolean(t.on_death),
      // Traits need a handle too. Without one the flavor call cannot address
      // them, so every trait silently kept its fallback text — a trait asking
      // for {substance} always read "a churning rush" however good the model's
      // answer was.
      id: `t${i + 1}`,
      name: t.trait ?? t.ability,
      // Traits go through the SAME substitution as abilities. Handling only
      // {dc} here left "{radius}-foot radius" rendering literally.
      text: fillTemplate({ ...t, slot_type: t.slot_type ?? 'utility' }, { cr, size, nums, rng, themes, usedConditions, recordConditions: true, mind: effMind }).text,
      derived_from: `${t.source} (CR ${t.cr})`,
      row_key: rowKeyOf(t),
    })),
    entries,
    // dpr_target is the AGGREGATE round — attacks plus one area plus two
    // legendary uses — not the multiattack routine. Measured against the
    // corpus the aggregate lands at 1.00 / 0.99 / 0.95 of it by band, while
    // the routine alone is 0.86 / 0.72 / 0.47, since high-CR creatures move
    // their damage into area and legendary. Reporting the routine against
    // this target makes every high-CR block look broken when it isn't.
    routine_damage: attacks.length ? attacks[0].damage * nums.multiattack : 0,
    aggregate_damage: (attacks.length ? attacks[0].damage * nums.multiattack : 0)
      + (entries.find((e) => e.slot_type === 'area')?.damage ?? 0)
      + 2 * (entries.find((e) => e.slot_type === 'legendary')?.damage ?? 0),
    dpr_target: nums.dpr_target,
  };
}
