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
export const FLAVOR_SLOTS = ['creature', 'substance', 'delivery', 'terrain', 'spells', 'spells_daily', 'kindred_type', 'home_plane', 'appendage', 'appendage_plural', 'signature_spell', 'signature_spell_2', 'anchor', 'undoing', 'legacy',
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
const ABILITIES = Object.values(library.categories).flat()
  .filter((a) => a.pool !== 'trait' && !isSwarm(a) && !a.excluded);
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

/** The frozen numbers for a CR, plus the multiattack count for its band. */
export function numbersFor(cr) {
  const row = crTable.by_cr[crKey(cr)];
  if (!row) throw new Error(`no cr-table row for CR ${cr}`);
  const ma = library.composition.multiattack.by_band[bandFor(cr)];
  return { ...row, multiattack: ma ? ma.median : 1 };
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
  for (const t of traits) met.add(`trait:${t.trait ?? t.ability}`);
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
export function pickAbilities(cr, counts, rng, traits = [], alternatives = 1, archetype = null, spineRows = [], themes = null) {
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
      const gatedLike = (a) => /Recharge/i.test(a.gate ?? '')
        || (!a.gate && a.slot_type === 'area'
          && /Paralyzed|Stunned|Petrified|Unconscious|\{condition_hard\}/.test(a.template_2024));
      const haveGated = chosen.some(gatedLike);
      const pool = ABILITIES.filter((a) => a.slot_type === slot
        && !(gatedLike(a) && haveGated)
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
      pool.forEach((a, idx) => { weights[idx] = proximityWeight(a.cr, cr) * archetypeWeight(a, archetype) * themeWeight(a, themes); });
      const pick = pool[pickWeighted(weights, rng)];
      // Two different mechanics can still share most of their sentences
      // (Weight of Years and Blinding Gaze differ in one clause). The lint
      // reads that as one ability written twice, and a reader would agree.
      const sentences = (t) => new Set(
        t.replace(/\b(makes? (?:one|two|three) )[A-Z][a-z]+(?: [A-Z][a-z]+)? attack/g, '$1X attack')
          .split(/(?<=\.)\s+/).map((x) => x.trim()).filter((x) => x.length > 30),
      );
      const picked = sentences(pick.template_2024);
      const overlaps = chosen.some((c) => {
        const other = sentences(c.template_2024);
        let shared = 0;
        for (const sIn of picked) if (other.has(sIn)) shared += 1;
        return shared >= 2;
      });
      if (overlaps) continue;
      // Mechanic families that read as "the same trick again" whatever
      // their wording: one per block. Four of six live blocks carried a
      // teleport — three teleport rows sit in a small legendary/bonus pool,
      // all facet-boosted on grave/celestial themes, so they recurred far
      // above their printed rate.
      const FAMILIES = [
        /teleports? (?:up to|itself)/,
        // one AURA per block: a damage aura and a control aura passed the
        // shape guard together (the Udraghoth ran both at once) because
        // only one carried damage
        /Emanation originating from the \{creature\}(?: takes| while it doesn't have)/,
        // one TIERED SPELL LIST per block: 0 of 329 printed blocks carry
        // two (the Night Hag's second entry is an echo, not a list). Two
        // lists shipped live (Spellcasting + Hellfire Spellcasting — the
        // Groan) because the name dedupe saw two different names.
        /\*\*(?:At Will|\d+\/Day(?: Each)?):\*\*/,
      ];
      const familyOf = (t) => FAMILIES.findIndex((re) => re.test(t));
      if (familyOf(pick.template_2024) !== -1
          && chosen.some((c) => familyOf(c.template_2024) === familyOf(pick.template_2024))) {
        continue;
      }
      // Structural dedupe ACROSS slot types: attack slots may repeat their
      // shape (counts govern them, and melee+thrown pairs are printed), but a
      // save/utility/legendary entry that is just another single-target
      // damage nuke duplicates the attack the block already has.
      const shape = shapeKeyOf(pick.template_2024);
      if (shape && shape.endsWith('|damage')
          && slot !== 'plain_attack' && slot !== 'rider_attack'
          // Legendary actions ECHO turn actions in print (Kraken: Lightning
          // Strike beside legendary Lightning Storm), and this guard was
          // emptying the section — a 3-use block shipped one option that
          // locks itself per turn, stranding two uses (live: the Alabaster).
          && slot !== 'legendary'
          && chosen.some((c) => shapeKeyOf(c.template_2024) === shape)) {
        continue;
      }
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
          // family guard applies to menu alternatives too, or a swap could
          // reintroduce the second teleport the pick loop just prevented
          && !(familyOf(a.template_2024) !== -1
            && chosen.some((c) => familyOf(c.template_2024) === familyOf(a.template_2024)))
          && !options.some((o) => o.ability === a.ability));
        if (!rest.length) break;
        const w = {};
        rest.forEach((a, idx) => { w[idx] = proximityWeight(a.cr, cr) * archetypeWeight(a, archetype) * themeWeight(a, themes); });
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
  return chosen;
}

/** Traits, deduped, same proximity weighting. */
export function pickTraits(cr, n, rng, chosenAbilities = [], archetype = null, themes = null) {
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
      && (t.requires ?? []).every((r) => met.has(r))
      && ![...chosenAbilities, ...out].some((c) => contains(t.template_2024, c.template_2024)));
    if (!pool.length) break;
    const weights = {};
    pool.forEach((t, idx) => { weights[idx] = proximityWeight(t.cr, cr) * archetypeWeight(t, archetype) * themeWeight(t, themes); });
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
  const round = nums.per_attack_damage * nums.multiattack;
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
    case 'area': return Math.round(round * (ability.gate ? r.gated_area_multiplier : r.ungated_area_multiplier));
    case 'save_nuke': return Math.round(round * r.ungated_area_multiplier);
    default: return nums.per_attack_damage;
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
function pickCondition(ability, slot, rng, themes) {
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
  if (!options.includes(dflt)) options.push(dflt); // print is always legal
  const weights = {};
  options.forEach((c, i) => {
    let w = c === dflt ? 4 : 1;
    if (c.split(' and ').some((word) => boosted.has(word))) w *= 3;
    weights[i] = w;
  });
  return options[pickWeighted(weights, rng)];
}

export function fillTemplate(ability, { cr, size, nums, rng = null, themes = null }) {
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
  const shift = (off) => SIZES[Math.min(SIZES.length - 1, Math.max(0, sizeIdx + (off ?? 0)))];
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
    // sized off the main value rather than added to the budget.
    alt_damage: Math.round(main.avg * 1.4),
    alt_dice: main.dice,
    reach: library._meta.scale_slots.reach.by_size[size] ?? 5,
    target_size: shift(n.target_size_offset),
    capacity_size: shift(n.capacity_size_offset),
    capacity_size_minor: shift(n.capacity_size_minor_offset),
    // Read the shape from the TEMPLATE, not from stored numbers. Trait rows
    // were slotted in a separate pass that never recorded area_shape, so every
    // trait emanation fell through to the CONE table — a Balor's 10-foot Fire
    // Aura rendered as a 60-foot aura dealing full damage with no save.
    area: /\{area\}-foot Emanation/.test(ability.template_2024)
      ? area.emanation_by_band[sb] : area.cone_by_band[sb],
    line_length: area.line_length_by_band[sb],
    line_width: area.line_width_by_band[sb],
    radius: area.radius_by_band[sb],
    height: n.height ?? 40,
    // Distances that track the creature rather than the one it was lifted
    // from. The Bronze Dragon's Repulsion Breath pushes 30/40/60/60 feet by
    // age, and leaving that literal split one mechanic into four.
    push_distance: library._meta.scale_slots.push_distance.by_band[sb],
    sight_range: library._meta.scale_slots.sight_range.by_band[sb],
    teleport_distance: library._meta.scale_slots.teleport_distance.by_band[sb],
  };

  let text = ability.template_2024;
  for (const [k, v] of Object.entries(values)) text = text.split(`{${k}}`).join(String(v));
  for (const slot of ['condition_soft', 'condition_hard', 'condition_pair']) {
    if (!text.includes(`{${slot}}`)) continue;
    text = text.split(`{${slot}}`).join(pickCondition(ability, slot, rng, themes));
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
export function pickPackage(cr, counts, rng, archetype = null, themes = null) {
  const list = (library.packages?.list ?? []).filter((pk) => pk.members.length >= 2);
  if (!list.length) return null;
  const weights = {};
  list.forEach((pk, i) => {
    const arch = !archetype || !pk.archetypes.length ? 1
      : pk.archetypes.includes(archetype) ? ARCHETYPE_MATCH : ARCHETYPE_MISS;
    weights[i] = proximityWeight(pk.cr, cr) * arch * themeWeight(pk, themes);
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
 * The after-death slot (owner design): optional, CR-ramped, two sentences.
 * The family derives from the creature type; themes pick among candidates.
 * The old Restoration rows flooded the general trait pool (20 near-identical
 * rows = 20x draw weight, picked on three of eight live blocks); frequency
 * now sits under this ramp instead of pool arithmetic.
 */
export function pickOnDeath(cr, rng, { typeHint = null, themes = null } = {}) {
  const od = library.on_death;
  if (!od) return null;
  const n = crNumber(cr);
  const chance = od.chance_by_band[n < 5 ? '0-4' : n <= 10 ? '5-10' : n <= 16 ? '11-16' : '17+'] ?? 0;
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
    weights[i] = (themeWeight(t, themes) * (t.death_family === family ? 6 : 1)) / famSize[t.death_family];
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
  strikeStat = null, family = null, themes = null, typeHint = null,
}) {
  const rng = makeRng(seed);
  // eslint-disable-next-line no-param-reassign
  size = size ?? pickSize(cr, rng);
  const nums = numbersFor(cr);
  const castStatWord = pickCastStat(rng);
  nums.cast_stat_word = castStatWord;
  const counts = pickSlotCounts(cr, rng);
  // Abilities first, then traits WITH the abilities visible: a trait like
  // Misty Escape says "uses Shape-Shift", and picking traits first left that
  // reference dangling because the ability list did not exist yet. Any
  // ability whose own trait dependency ends up unmet is dropped afterwards.
  // The caster flag guarantees a Spellcasting entry rather than leaving it
  // to the dice — the chassis honored it and the skeleton had dropped it.
  if (caster) counts.utility = Math.max(counts.utility ?? 0, 1);

  // The spine: a whole printed dragon for Dragon-typed generations (the one
  // family users expect a SHAPE from), else a mined synergy package when one
  // fits the sampled counts, else nothing and the block is all singles.
  let spine = null;
  if (family === 'dragon') spine = pickDragonKit(cr, rng);
  if (!spine) spine = pickPackage(cr, counts, rng, archetype, themes);
  const spineTraits = spine?.traitRows ?? [];
  if (family === 'dragon' && spine) {
    // A dragon kit IS the layout: counts follow it instead of the dice.
    for (const t of SLOT_TYPES) counts[t] = 0;
    counts.legendary = spine.rows.filter((r) => r.section === 'Legendary Actions').length;
    counts.trait = 0;
  }
  const abilities = pickAbilities(cr, counts, rng, [], alternatives, archetype, spine?.rows ?? [], themes);
  if (caster && !abilities.some((a) => /\{spells\}/.test(a.template_2024))) {
    const pool = ABILITIES.filter((a) => a.slot_type === 'utility' && /\{spells\}/.test(a.template_2024));
    if (pool.length) {
      const w = {};
      pool.forEach((a, i) => { w[i] = proximityWeight(a.cr, cr); });
      abilities.push({ ...pool[pickWeighted(w, rng)], options: undefined });
    }
  }
  let traits = pickTraits(cr, counts.trait, rng, abilities, archetype, themes);
  const onDeath = pickOnDeath(cr, rng, { typeHint: family === 'dragon' ? 'Dragon' : typeHint, themes });
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

  // DC coherence (4 live blocks in a row flagged it): only CASTERS had a
  // stat pinned to support the block DC — a non-caster's DCs matched
  // nothing on its sheet. Non-casters now key the block DC off CON, the
  // printed convention for breaths and auras: DC = 8 + PB + table CON mod,
  // and stampStats pins CON to exactly that. Every DC on the sheet then
  // reconciles with either CON or the striker.
  const hasSpell = kept.some((a) => /\{spells\}|spellcasting ability/.test(a.template_2024));
  if (!hasSpell) {
    nums.save_dc = 8 + nums.pb + (nums.con_mod ?? 0);
  }

  const entries = kept.map((a, i) => {
    const { text, damage } = fillTemplate(a, { cr, size, nums, rng, themes });
    // A repeatable 60-foot paralysis cone is the class of thing no printed
    // block ships: hard-condition areas are ALWAYS gated. Belt-and-braces
    // over the data fix, because one ungated row slipping through is a
    // balance hole, not a wart (live: Rooting Spore Cloud, every turn).
    const hardAreaUngated = !a.gate
      && (a.slot_type === 'area' || /each creature in/.test(text))
      && /Paralyzed|Stunned|Petrified|Unconscious/.test(text);
    // An at-will no-damage save-condition BONUS ACTION is printed at low CR
    // (the Pirate Captain's Captain's Charm, CR 6) but never at high CR,
    // where a free charm every round stacks into a sealed defense beside
    // Legendary Resistance and a control nova (live: Glamour of the Broken
    // Pact). Gated at CR 11+ only, so the printed low-CR shape stays legal.
    const ungatedControlBA = !a.gate && a.section === 'Bonus Actions'
      && /Saving Throw/.test(text) && SHAPE_CONDS.test(text)
      && !/\d+ \(\d+d\d+\)/.test(text) && crNumber(cr) >= 11;
    const gate = a.gate ?? (hardAreaUngated ? 'Recharge 5-6' : ungatedControlBA ? 'Recharge 4-6' : null);
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
        const filled = fillTemplate(o, { cr, size, nums, rng, themes });
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
    multiattack: nums.multiattack,
    con_mod: nums.con_mod,
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
      text: fillTemplate({ ...t, slot_type: t.slot_type ?? 'utility' }, { cr, size, nums, rng, themes }).text,
      derived_from: `${t.source} (CR ${t.cr})`,
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
