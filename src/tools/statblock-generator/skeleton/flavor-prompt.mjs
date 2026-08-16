/**
 * The flavor call: one LLM round that turns a mechanical skeleton into a
 * creature.
 *
 * The contract is narrow on purpose. The model NEVER writes mechanics. It
 * fills the flavor slots the templates left open and names things; the
 * substitution happens here, in code. That is what makes the numbers
 * un-driftable — there is no path by which a model response changes a damage
 * figure, a save DC or an area, because it is never asked for one and its
 * answer is never spliced into the mechanical text.
 *
 * It also means a bad response degrades instead of failing: an entry whose
 * flavor is missing keeps its slot defaults and still ships as a correct,
 * if plain, statblock.
 */
import library from '@/data/ability-library.json';
import textureBanks from '@/data/texture-banks.json';
import { FLAVOR_SLOTS, makeRng, crNumber } from './build-skeleton.mjs';
import { CONDITIONS } from '../format-2024/lint.mjs';
import { runCorrections } from './corrections.mjs';
import { buildNamingBrief } from './name-registers.mjs';

/**
 * The texture-bank layer (Phase 3, owner-approved 2026-08-03). Three duties,
 * wired inside-out:
 *   1. FALLBACKS: a missing fill draws from the block's own facet banks,
 *      seeded — the never-fail floor is on-theme, not generic.
 *   2. VET: a model fill carrying another facet's domain-claiming token
 *      (spore on a forged block, gear on a grove) is replaced the same way.
 *      Token match is word-boundary-anchored and prefix-style, the
 *      NAME_LEXICON semantics. Themes license crossovers: forged+verdant
 *      makes spore vocabulary legal.
 *   3. MENUS: the flavor prompt carries the block's facet banks IN FULL as
 *      the model's working vocabulary, so replacements stay rare (see
 *      texturePalette).
 * Banks are data (src/data/texture-banks.json), authored to the printed
 * register and owner-reviewed; guide, never constrain.
 */
const BANK_FACETS = textureBanks.facets ?? {};
// full type -> facet map (the name-vetting TYPE_FACET below is the 3-domain
// subset that predates it)
const TYPE_BANK_FACET = {
  Undead: 'grave', Fiend: 'fiendish', Celestial: 'celestial', Fey: 'fey',
  Dragon: 'draconic', Elemental: 'elemental', Plant: 'verdant', Construct: 'forged',
  Aberration: 'mind', Ooze: 'amorphous', Beast: 'bestial', Giant: 'armed',
};
const VET_TOKEN_OWNER = (() => {
  const m = new Map();
  for (const [facet, bank] of Object.entries(BANK_FACETS)) {
    for (const t of bank.vet_tokens ?? []) m.set(t, facet);
  }
  return m;
})();
/** The facets this block may legally speak in: its type's facet + themes. */
function ownFacets(type, themes) {
  return new Set([TYPE_BANK_FACET[type], ...(themes ?? [])].filter(Boolean));
}
/**
 * The first off-domain token a fill carries, or null if it's clean.
 *
 * The block's HOUSE vocabulary is always admissible (owner-visible bug,
 * 2026-08-11): 16 of 25 houses carry a word some facet's vet claims —
 * "magma" is elemental's vet token, "brine" is aquatic's via barnacle,
 * "grave" is grave's own. So a block whose funnel-chosen house was magma
 * but whose themes lacked `elemental` had every house-true fill VETOED as
 * a foreign-facet claim, and the generic fallback shipped instead. The
 * funnel picks the house; the vet must not forbid speaking it.
 */
function offDomainToken(value, own, houseTokens = null) {
  for (const [tok, owner] of VET_TOKEN_OWNER) {
    if (houseTokens && houseTokens.has(tok)) continue;
    if (!own.has(owner) && new RegExp(`\\b${tok}`, 'i').test(value)) return tok;
  }
  return null;
}
/** Seeded pick from the union of the block's facet banks for a field. */
function bankDraw(field, own, rng) {
  const pool = [...own].flatMap((f) => BANK_FACETS[f]?.[field] ?? []);
  if (!pool.length || !rng) return null;
  return pool[Math.floor(rng() * pool.length)];
}

/**
 * Slots asked about PER ENTRY. {creature} is the name itself, and the damage
 * types are asked once for the whole creature rather than per entry: a
 * skeleton assembles parts from different monsters, so inheriting each part's
 * damage type produced creatures dealing Fire, Cold, Poison and Necrotic at
 * once (live: energy-type-spread and damage-type-caps both firing).
 */
const DAMAGE_SLOTS = FLAVOR_SLOTS.filter((s) => s.endsWith('damage_type'));
// weakness_type is ENGINE-filled (the energy's foil, further down) — it
// rides FLAVOR_SLOTS so slotsIn can see it, but asking the MODEL for it
// left the fill loop with no answer and no FALLBACK entry, so `value`
// arrived at the punctuation strip undefined and threw. Rare, because
// only the Freeze row carries the slot — which is why it surfaced as an
// intermittent full-suite failure rather than a reproducible one.
const ENGINE_FILLED = ['weakness_type'];
const ASKABLE = FLAVOR_SLOTS.filter((s) => s !== 'creature'
  && !DAMAGE_SLOTS.includes(s) && !ENGINE_FILLED.includes(s));

const PHYSICAL = ['Bludgeoning', 'Piercing', 'Slashing'];

const SLOT_BRIEF = {
  substance: 'what the effect is MADE of — a short noun phrase ("caustic brine", "shrieking dust")',
  delivery: 'how it leaves the body, third person singular ("exhales", "sprays", "sheds")',
  terrain: 'the surface this movement is keyed to ("loose scree", "still water")',
  spells: 'the at-will spell list: a JSON ARRAY of 2-3 plain spell names, e.g. ["Scorching Ray", "Command"] — NO markup, no asterisks, the engine formats them. Modest ACTION-castable spells, level 3 or lower, from the 2024 core rules only, and only spells this creature would actually use in a fight — no utility-cantrip padding. Never Reaction or Bonus Action spells (Shield, Misty Step, Counterspell)',
  spells_daily: 'the 1/Day list: a JSON ARRAY of 1-2 BIGGER plain spell names, never repeating the at-will list. Above CR 12, upcast a spell that actually scales — "Cone of Cold (level 9 version)" — never annotate a non-scaling spell (Dream has no level 9 version)',
  kindred_type: 'the creature\'s OWN type, so its aura spares its own kind (Undead, Fiend, Plant…)',
  home_plane: 'a CANONICAL plane with its article ("the Nine Hells", "the Feywild", "the Abyss") — never invented geography; a made-up realm reads tacked on',
  anchor: 'a thing the creature itself establishes — "the site of its oldest unpaid bargain", "a coin from its hoard", "the deepest root of its grove"',
  undoing: 'what makes the death permanent, as a verb phrase — "fulfills or formally forgives that bargain", "melts the coin in dragonfire"',
  legacy: 'the unfinished business ITSELF as a short noun phrase, nothing more — "its unpaid debt to the drowned", "the vigil it never finished", "its hunt for the thief who wronged it". Do NOT write who inherits it, what it costs, or how it ends: the engine writes all three around your phrase',
  appendage: 'the grasping limb, singular ("tentacle", "barbed chain")',
  appendage_plural: 'the same limb, plural ("tentacles", "barbed chains")',
  signature_spell: 'ONE damaging or controlling spell as a plain name, no markup ("Ice Knife", "Fear") — the engine formats it and adds it to the spell list automatically',
  signature_spell_2: 'a SECOND, different spell as a plain name, same rules as the first — an alternative cast, not a repeat',
};

/** Which flavor slots an entry actually contains. */
export function slotsIn(text) {
  return ASKABLE.filter((s) => text.includes(`{${s}}`));
}

/**
 * Entries needing flavor input, with the vocabulary the library carries for
 * that mechanic. Names are offered as suggestions, never stamped: a mechanic
 * shared by 131 creatures answers to Beak, Bite, Claw and Greataxe, and a
 * creature that is not fiery should not arrive called Fire Breath.
 */
export function flavorRequests(skeleton) {
  return [...skeleton.entries, ...skeleton.traits.map((t) => ({ ...t, section: 'Traits' }))]
    .filter((e) => e.slot_type !== 'multiattack')
    .filter((e) => !e.name_locked || slotsIn(e.text).length)
    .map((e) => ({
      id: e.id,
      section: e.section,
      slot_type: e.slot_type,
      placeholder_name: e.name,
      // Union across the MENU, not just the default: an option carrying a
      // slot the default lacks was never asked for, so choosing it spliced
      // the raw fallback ("its a churning rush" — live, the Dreamweb's
      // lantern: the default Teleport had no {substance}, the chosen
      // Ignited Illumination did).
      slots: [...new Set([e.text, ...(e.options ?? []).map((o) => o.text)]
        .flatMap((t) => slotsIn(t)))],
      signature: Boolean(e.signature),
      text: e.text,
      options: e.options ?? [],
    }));
}

/**
 * The TEXTURE PALETTE section: the block's facet banks IN FULL, injected
 * into every flavor prompt as the model's working vocabulary (the themed
 * spell menus' pattern — menus, not pre-stamps; the model may also write
 * new words that belong beside these). Whole banks, not samples (owner
 * call): a block carries at most two facets, the token cost is trivial,
 * and a thin sample would make outputs MORE repetitive, not less.
 *
 * REVERTED EXPERIMENT (owner call, 2026-08-03): a "calibration, not a
 * checklist — invent most fills fresh" reframe correlated with a run of
 * conceptually hollow blocks (census-keepers and memory-scribes whose
 * mechanics couldn't cash their names' checks). Bank-anchored naming keeps
 * names TEXTURAL (moonfrost, thistledown) — texture decorates mechanics;
 * invented CONCEPTS (tallying, unremembering) write promises no printed
 * mechanic can keep. "Draw on it" is the tested wording.
 */
/**
 * The block's HOUSE: one material, and the vocabulary it earns (owner
 * call, 2026-08-05 — "brine and sleet are in the same neighborhood but
 * different houses"). The facet was too coarse a unit: `elemental` alone
 * offers magma, stone, storm, ice and sand, so a single well-chosen theme
 * still handed the model four materials and asked it to pick freely. The
 * three moments that each chose independently — concept prose, fill time,
 * naming — now share one declaration.
 *
 * Scored from the concept, not rolled: the prose usually names the
 * material already ("a living column of deep-ocean brine"), and an engine
 * that ignored it would just move the mismatch. A tie or a silent concept
 * falls back to a seeded pick from the themes' candidates.
 *
 * TWO houses survive when the concept scores both strongly — a drowned
 * forge or a frozen abyss is a deliberate collision, which is a different
 * thing from three houses arriving by accident.
 */
// Whole-word match for a bank token, plural allowed. Tokens carry hyphens
// ("deep-ocean", "rivet-work"); \b sits correctly at both ends of those
// because the hyphen is already a non-word character. The trailing (e?s)?
// is load-bearing — a bare \b drops "cinders", "sands" and "rivets", which
// is most of how these words actually appear in prose — and it stays tight
// enough to reject the substring hits: "target"/"start" no longer score
// `tar`, "start" no longer scores void's `star`, "smash"/"ashen" no longer
// score `ash`, "restrained" no longer scores storm's `rain`.
const wordReCache = new Map();
function wordRe(token) {
  if (!wordReCache.has(token)) {
    wordReCache.set(token, new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:e?s)?\\b`, 'i'));
  }
  return wordReCache.get(token);
}

export function pickHouse(concept, themes, seed = 1, type = null, declared = null) {
  const houses = textureBanks.houses ?? {};
  // A DECLARED material wins outright (owner call, 2026-08-07). The concept
  // call now names exactly one material from its type's line, so there is
  // nothing left to infer — scoring prose was only ever a way of guessing
  // at this. It still has to be a real house and legal for the type; a
  // model naming something off its own line falls through to the scoring
  // path below rather than failing the generation.
  {
    const want = String(declared ?? '').trim().toLowerCase();
    const legal = textureBanks.type_houses?.[type];
    if (houses[want] && (!legal || legal.includes(want))) return [want];
  }
  // STAGE 2 OF THE FUNNEL (owner call, 2026-08-07): archetype limits type,
  // type limits material house. The type is a HARD boundary — themes and
  // prose select WITHIN it, they no longer reach past it. This is what
  // stops a metal-bodied "Aberration" from resolving to void: void is not
  // an aberration material, and now it cannot be reached from one.
  const allowed = textureBanks.type_houses?.[type];
  const universe = (allowed ?? Object.keys(houses)).filter((h) => houses[h]);
  const candidates = [...new Set((themes ?? [])
    .flatMap((t) => textureBanks.facets?.[t]?.houses ?? []))]
    .filter((h) => houses[h] && universe.includes(h));
  const text = String(concept ?? '').toLowerCase();
  // WHOLE WORDS ONLY (owner call, 2026-08-07). `includes` matched tokens
  // INSIDE other words, and the collisions were not rare ones: `tar` fires
  // inside "target" and "start", void's `star` inside "start", `ash` inside
  // "smash"/"flash"/"ashen", storm's `rain` inside "restrained". Any prose
  // containing "starts" handed tar AND void a free point each — and two
  // free points is exactly the named-twice bar the second house needed.
  // A measurable share of "grave, void"-style mashups were manufactured
  // here rather than described by the concept.
  const scoreOf = (h) => (houses[h].tokens ?? [])
    .reduce((n, tok) => n + (wordRe(tok).test(text) ? 1 : 0), 0);
  const byTheme = candidates.map((h) => [h, scoreOf(h)]);
  const themeBest = Math.max(0, ...byTheme.map(([, n]) => n));

  // THE PROSE OUTRANKS THE THEMES (owner call, 2026-08-07). `themes` is one
  // unvalidated field from the concept call, and it conflates two kinds of
  // facet: MATERIALS (forged, grave, aquatic) and MANNERS (mind, terror,
  // beguiling — the banks annotate `venomous` as "manner facet, no home
  // type"). A manner-only theme set leaves the material layer with nothing
  // to stand on, so it invents one: "aberration of living, scorched metal
  // … burning sands" came back themed `mind`, whose houses are dream/void/
  // glass. All three scored zero, the seeded fallback landed on void, and
  // the block shipped as Starless Yaw — Psychic, hollow, unmade. The words
  // bronze, furnace, molten, dune and sand were right there and were never
  // on the ballot.
  //
  // So score every house, not just the themes' candidates, and let the
  // concept override when it has DECLARED a material — the same
  // named-twice standard the collision hatch uses, since one incidental
  // token is not a declaration. Themes still win ties, still govern the
  // register banks, and still supply the fallback when the prose is silent.
  const byAll = universe.map((h) => [h, scoreOf(h)]);
  const allBest = Math.max(0, ...byAll.map(([, n]) => n));
  const proseOverrules = candidates.length ? allBest >= 2 && allBest > themeBest : allBest > 0;
  if (!candidates.length && !proseOverrules) {
    // The type still owes the block a material even when themes and prose
    // both come back empty — a palette-less block is the failure the
    // seeded fallback exists to prevent.
    if (!universe.length) return [];
    const rng0 = makeRng(seed);
    return [universe[Math.floor(rng0() * universe.length)]];
  }

  const scored = proseOverrules ? byAll : byTheme;
  const best = proseOverrules ? allBest : themeBest;
  // ONE HOUSE, ALWAYS (owner call, 2026-08-07: "we don't want 'grave,
  // void', we just want grave"). The collision hatch let a second house in
  // when both scored twice, on the theory that a drowned forge is a
  // deliberate fusion. In practice the second house bought nothing
  // mechanical — houses have no reach into row selection at all — and cost
  // coherence at the only layer they do reach: every ability NAME drew from
  // a pooled two-material vocabulary, so blocks read as two creatures
  // sharing a statblock. Depth now comes from pursuing one material,
  // not from reaching sideways for a second.
  if (best > 0) return [scored.filter(([, n]) => n === best).map(([h]) => h)[0]];
  const rng = makeRng(seed);
  return [candidates[Math.floor(rng() * candidates.length)]];
}

/**
 * THE COHERENCE PASS (owner design, 2026-08-06). One place where the
 * block's identity is resolved — after row selection, before naming — so
 * that everything downstream is CONSTRAINED rather than corrected.
 *
 * It owns three of the four coherence decisions (the fourth, the role
 * gate, is upstream at selection where it belongs):
 *
 *   houses     the register lock — one material, every name-fill draws
 *              from it
 *   manifest   the capability manifest — what this block can actually DO,
 *              computed from the rows it ended up with. Previously
 *              re-derived ad hoc at every site that cared, which is why
 *              "flies" survived three phrasings, a carry clause outlived
 *              its grapple, and terrain mastery pointed at nothing.
 *   contract   the type contract — damage vocabulary and alignment range
 *              a creature of this type may have. Enforced only in
 *              ASSEMBLY before now, i.e. after the model had already
 *              written; resolving it here makes it an instruction.
 *
 * Floors downstream stay as backstops — the model still drifts.
 */
export function resolveIdentity(skeleton, { concept = '', themes = null, type = null, seed = 1, house = null, damageMix = null } = {}) {
  const rows = [...(skeleton.entries ?? []), ...(skeleton.traits ?? [])];
  const text = rows.map((r) => r.text ?? r.template_2024 ?? '').join(' ');
  const manifest = {
    movement: skeleton.movement ?? [],
    grapples: /Grappled condition \(escape|has the Grappled condition/.test(text),
    restrains: /Restrained condition/.test(text),
    swallows: /swallow/i.test(text),
    casts: /\{spells\}|spellcasting ability/.test(text),
    // substrates the block actually PRODUCES, for rows that reference one
    produces: [
      /is destroyed \(AC/.test(text) && 'restraint',
      /becomes Difficult Terrain/.test(text) && 'terrain',
    ].filter(Boolean),
  };
  // measured 2026-08-06: Ooze deals Acid 4/4 and no physical at all;
  // Beast/Ooze/Construct/Plant/Monstrosity are Unaligned by default;
  // Fiend and Undead are never Good.
  const CONTRACT = {
    Ooze: { physical: null, alignment: 'Unaligned', anatomy: false },
    Beast: { alignment: 'Unaligned' },
    Construct: { alignment: 'Unaligned' },
    Plant: { alignment: 'Unaligned' },
    Monstrosity: { alignment: 'Unaligned' },
    Fiend: { noGood: true },
    Undead: { noGood: true },
  };
  return {
    houses: pickHouse(concept, themes, seed, type, house),
    manifest,
    contract: { type, ...(CONTRACT[type] ?? {}), ...(damageMix === 'energy' ? { physical: null } : {}) },
  };
}

function texturePalette(skeleton, themes) {
  const facetNames = [...new Set(themes ?? [])].filter((t) => BANK_FACETS[t]);
  if (!facetNames.length) return '';
  const banks = facetNames.map((f) => BANK_FACETS[f]);
  const substances = [...new Set(banks.flatMap((b) => b.substances ?? []))];
  const limbs = [...new Set(banks.flatMap((b) => (b.appendages ?? []).map((a) => a.one)))];
  const verbs = [...new Set(banks.flatMap((b) => b.deliveries ?? []))];
  const houseRestraints = (skeleton.houses ?? [])
    .map((h) => textureBanks.houses?.[h]?.restraint).filter(Boolean);
  const restraints = [...new Set([...houseRestraints, ...banks.flatMap((b) => b.restraints ?? [])])];
  const adjs = [...new Set(banks.flatMap((b) => b.name_adjectives ?? []))];
  const nouns = [...new Set(banks.flatMap((b) => b.name_nouns ?? []))];
  // DOMINANCE, NOT PRESENCE (owner call, 2026-08-07, the Grindor: a colony
  // of stone-plated spiderlings raining heat-baked chitin shards came back
  // dealing PSYCHIC). This list is the only energy guidance the flavor call
  // gets, and it used to name every affinity above zero as equally favored.
  // `bestial` measures Poison 12, Fire 2, Acid 2, Psychic 1 — so a single
  // tail observation out of seventeen was offered beside Poison as though
  // the register spoke it.
  //
  // Same threshold the ROW selector already uses (energyFits): an energy
  // qualifies when it reaches a third of its facet's top affinity. Applied
  // per facet before the union, so a thin facet still contributes its own
  // best rather than being drowned by a fat one.
  const dmg = [...new Set(banks.flatMap((b) => {
    const aff = Object.entries(b.damage_affinity ?? {})
      .filter(([k, v]) => !k.startsWith('_') && typeof v === 'number' && v > 0);
    const top = Math.max(0, ...aff.map(([, v]) => v));
    return aff.filter(([, v]) => v >= top / 3).sort((x, y) => y[1] - x[1]).map(([k]) => k);
  }))];
  const id = skeleton.identity ?? {};
  const contract = id.contract ?? {};
  const manifest = id.manifest ?? {};
  const contractLines = [
    contract.physical === null && `Its ${contract.type} body has no edge, point, or mass: EVERY damage it deals is its energy type. Never Slashing, Piercing, or Bludgeoning.`,
    // The flavor call was never told the mix, so on a physical-only block
    // it picked Thunder and named a shriek, a song and a spray — and the
    // engine then rendered every one of them as Piercing (live: the
    // Brinewrack, which even RESISTS the Thunder its own names promise).
    skeleton.damage_mix === 'physical' && 'Every damage this creature deals is PHYSICAL (its weapon type) — any energy you pick will NOT be used. Never name an entry for a sound, light, or energy (no shrieks, songs, rays, or blasts): name what its body does — rake, lunge, slam, barrage.',
    contract.anatomy === false && 'It has no limbs, jaws, or teeth to name — its attacks are extrusions, surges, and engulfings.',
    contract.alignment && `Its alignment is ${contract.alignment}: creatures of this type have no moral axis.`,
    contract.noGood && 'Its alignment is never Good.',
    !(manifest.movement ?? []).includes('fly') && 'It CANNOT fly: never write "flies", "flying", or a Fly Speed.',
    manifest.grapples === false && 'It grapples nothing: never reference a creature it has Grappled.',
  ].filter(Boolean);
  const contractBlock = contractLines.length
    ? `\nWHAT THIS CREATURE IS — these are facts about its body, not suggestions:\n${contractLines.map((l) => `- ${l}`).join('\n')}\n`
    : '';
  const houseNames = skeleton.houses ?? [];
  const houseBanks = houseNames.map((h) => textureBanks.houses?.[h]).filter(Boolean);
  const houseLine = houseBanks.length
    ? `\nTHIS CREATURE'S MATERIAL: ${houseNames.join(' and ')}. Every substance, every material noun, and every name in the block — the creature's own included — must BE this material or something it does. Its words:
- made of: ${houseBanks.flatMap((b) => b.substances ?? []).join(', ')}
- name words: ${houseBanks.flatMap((b) => b.adjectives ?? []).join(', ')} / ${houseBanks.flatMap((b) => b.nouns ?? []).join(', ')}
Never reach for a neighbouring material: an ice creature does not also spray brine, and a brine creature does not also shed sleet — both are cold, and they belong to different things.`
    : '';
  return `${contractBlock}${houseLine}\nTEXTURE PALETTE — this register's full vocabulary. Draw on it for every fill and name: choose from it, combine from it, or write words that belong beside it.${houseLine ? ' It never introduces a SECOND material — where it offers one the material above forbids, take the material above.' : ''}
- substances: ${substances.join(', ')}
- restraining substances (for anything that binds, snares, or entombs — "until the <substance> is destroyed"): ${restraints.join(', ')}
- limbs: ${limbs.join(', ')}
- delivery verbs: ${verbs.join(', ')}
- name words: ${adjs.join(', ')} / ${nouns.join(', ')}${dmg.length && skeleton.damage_mix !== 'physical' ? `\n- energy damage this register favors: ${dmg.join(', ')}` : ''}`;
}

// One line per combat role, fed to the flavor call so names and prose lean
// into the trade the numbers already made (the numeric differentials live in
// applyArchetypeNumbers). Same weight class as the mute-caster line: a
// nudge, not a mechanic. Balanced/unknown roles say nothing.
const ROLE_BRIEF = {
  brute: 'a BRUTE — it wades in and hits very hard; name and describe it as overwhelming force, not finesse',
  defender: 'a DEFENDER — it holds ground and protects; its names and prose should feel like a wall, a warden, a punisher of those who push past it',
  skirmisher: 'a SKIRMISHER — it darts in and out; its names and prose should feel quick, slippery, hit-and-run',
  artillery: 'ARTILLERY — it kills from far away and avoids melee; its names and prose should feel like range, aim, and distance',
  glass_cannon: 'a GLASS CANNON — it hits harder than anything at its CR and dies fast; its names and prose should feel reckless, all-in, nothing held back for defense',
  controller: 'a CONTROLLER — it wins by imposing conditions, not raw damage; its names and prose should feel like domination, binding, and denial',
  lurker: 'a LURKER — it ambushes with one devastating strike, then hides; its names and prose should feel patient, unseen, sudden',
  support: 'SUPPORT — it exists to make its allies stronger; its names and prose should feel like blessing, mending, and command',
  swarm: 'a SWARM — it is many acting as one; its names and prose should feel like mass, tide, and numberless motion. Name the block the printed way: "Swarm of <plural constituents>" (like Swarm of Ravens)',
};

export function buildFlavorPrompt(skeleton, { concept, description = '', themes = null, takenNames = [], proposedName = null, naming = null } = {}) {

  const reqs = flavorRequests(skeleton);
  const needsSpells = reqs.some((r) => r.slots.includes('spells') || r.slots.includes('spells_daily'));
  const crNum = Number(String(skeleton.cr).includes('/') ? 0.5 : skeleton.cr);
  const spellBand = crNum < 5 ? '0-4' : crNum <= 10 ? '5-10' : crNum <= 16 ? '11-16' : '17+';
  // The suggestion pool filters to the palette: off-theme picks were the
  // last recurring spell defect (Chromatic Orb on an oath celestial). The
  // model still CHOOSES — menus, not pre-stamps.
  const facets = library._meta.spell_facets ?? {};
  const onPalette = (sp) => !themes || !themes.length || !facets[sp]
    || facets[sp].some((f) => themes.includes(f));
  const themedPool = (list) => {
    const kept = list.filter(onPalette);
    return (kept.length >= 3 ? kept : list);
  };
  const themedSuggestions = themes && themes.length
    ? Object.keys(facets).filter((sp) => facets[sp].some((f) => themes.includes(f))).slice(0, 8)
    : [];
  const spellPolicyLine = needsSpells
    ? `\nSPELLS at this tier, from print: at-will lists are cantrips and level 1-2 offense (printed examples: ${themedPool(SPELL_POLICY.printed_pools[spellBand].at_will).slice(0, 8).join(', ')}); level 3+ offense goes in the 1/Day list (printed examples: ${themedPool(SPELL_POLICY.printed_pools[spellBand].daily).slice(0, 6).join(', ') || 'Fireball, Cone of Cold'}).${themedSuggestions.length ? ` ON-PALETTE picks for this creature's themes: ${themedSuggestions.join(', ')}.` : ''} 2024 core spells only.`
    : '';
  const lines = reqs.map((r) => {
    // WHICH physical type an attack deals is FORM, not balance — B/P/S are
    // budget-identical in print (owner call, 2026-08-14: a block-wide stamp
    // shipped "Smoldering Splinters" dealing Bludgeoning, and then named a
    // second attack "Bludgeoning Bolt" AFTER the wrong type — a name
    // generated from the bug). The engine keeps the numbers; the model
    // names the form per attack.
    const isAttack = r.slot_type === 'plain_attack' || r.slot_type === 'rider_attack';
    const asks = [
      'name',
      ...(isAttack ? ['physical (Bludgeoning|Piercing|Slashing — what this attack\'s FORM deals: splinters pierce, fists bludgeon, talons slash)'] : []),
      ...r.slots,
    ].join(', ');
    const flag = r.signature
      ? '  [SIGNATURE: printed on exactly one creature in the SRD. Rename and re-flavor it hard enough that a reader who knows that creature would not place it.]'
      : '';
    // With alternatives on offer, show them and let the concept choose. The
    // engine guarantees every option is correctly scaled and dependency-safe,
    // so the choice cannot produce an invalid block — only a better-fitting
    // one. This is what makes the concept actually reach ability selection.
    if (r.options.length > 1) {
      // THE MENU NO LONGER NAMES ITS DONOR (owner call, 2026-08-07). The
      // options used to be listed by the printed ability's own name — "Ice
      // Walk", "Pounce", "Multiple Heads" — so the model was anchored to a
      // specific SRD creature before it read a word of the mechanics, and
      // the name then leaked into the block whenever it echoed the label.
      // Options are numbered; the choice comes back as the number.
      const menu = r.options
        .map((o, i) => `    ${i + 1}${i === 0 ? ' (default)' : ''}: ${o.text}`)
        .join('\n');
      return `- ${r.id} (${r.section}) — CHOOSE ONE by NUMBER, whichever suits the concept:\n${menu}\n  provide: choose, ${asks}${flag ? `\n${flag}` : ''}`;
    }
    // TRAITS may be re-written, actions may not. 2024 action grammar is
    // nearly fixed (the attack and save lines are rules format), so there is
    // nothing to write; a trait is free prose and is where a donor's
    // fiction shows.
    if (r.section === 'Traits') {
      return `- ${r.id} (Traits): ${r.text}\n  provide: ${asks}, and OPTIONALLY "text" — the same mechanic re-written in THIS creature's voice.`
        + '\n  If you write it: change no number, add or remove no condition, no damage type, and no rules keyword'
        + ' (Advantage, Resistance, Difficult Terrain, Saving Throw...). Say the same thing as this creature would say it, or omit "text" and the line above ships unchanged.';
    }
    return `- ${r.id} (${r.section}): ${r.text}\n  provide: ${asks}${flag ? `\n${flag}` : ''}`;
  }).join('\n');

  return `You are writing the flavor for a D&D 2024 monster. Every number is already fixed and is NOT your concern.

CONCEPT: ${concept}${description ? `\nDETAILS: ${description}` : ''}${proposedName ? `\nThe concept synthesis proposed the proper name "${proposedName}". Weigh it as a strong candidate: keep it if it beats what you would coin, improve on it freely if not${naming ? ' — but stay inside the naming convention below either way' : ''}.` : ''}${naming ? buildNamingBrief(naming.convention, { type: naming.type, seed: skeleton.seed }) : ''}${takenNames.length ? `\nNAMES ALREADY TAKEN in this user's collection — NEVER reuse or closely echo any of them: ${takenNames.slice(0, 40).join(', ')}` : ''}${themes && themes.length ? `\nTHEME THREADS — the block's ENTIRE palette. Every name, every {substance}, every {delivery} and {appendage} draws from these and nothing else: ${themes.join(', ')}` : ''}${texturePalette(skeleton, themes)}

The creature is CR ${skeleton.cr}, ${skeleton.size}, AC ${skeleton.ac}, HP ${skeleton.hp}.${skeleton.mind === 'bestial' ? `
Its MIND is BESTIAL: animal cunning, no speech, no concepts. Every fill must fit that head — its anchors are dens, carcasses, and territories, never bargains, vows, debts, oaths, or agreements; it remembers places and scents, not purposes. Entry names likewise: an animal has no "Bargain", "Vigil", or "Covenant".` : skeleton.mind === 'mindless' ? `
Its MIND is MINDLESS: no comprehension at all. Fills and names must be pure process — growths, discharges, reflexes. Nothing it does is chosen, remembered, or owed.` : ''}${ROLE_BRIEF[skeleton.archetype] ? `\nIts combat role is ${ROLE_BRIEF[skeleton.archetype]}. Spend the block's text on that role: when an entry offers a menu, choose the option that serves this loop, and fill spell lists with spells this role would lean on — a reader infers the role from where the words go.` : ''}

Its abilities are written out below with blanks in {braces}. Fill ONLY the blanks and give EVERY entry a name that fits THIS creature — a name is required for every id listed, not just the ones that interest you. Do not rewrite any other word, and do not invent, remove or renumber abilities.

${lines}${spellPolicyLine}

Blanks mean:
${ASKABLE.map((s) => `  {${s}} — ${SLOT_BRIEF[s]}`).join('\n')}

Intelligence must support the mind you give it: an alignment other than Unaligned, any language, or judgment/arcane themes all need Intelligence 6+; at Intelligence 4 or below the creature is Unaligned instinct. Every name in the block shares ONE identity: choose at most two thematic threads from the concept and use them consistently — a block that is simultaneously swamp, frost, bone and planar-rift reads as a random-adjective table. Truesight belongs to high-planar minds; a lurking beast takes Tremorsense or Blindsight. Never borrow another type's vocabulary for names: no "wraith" on a living creature, no "Abyssal" on a Celestial, no "infernal" on a fey — the audience reads those as template seams. A name must FIT its mechanics: a shriek or roar is Thunder damage against a Constitution save; a beam or bolt is Dexterity; don't name a Dexterity-save Force bolt "Piercing Shriek". A row whose text names a SUBSTANCE or TERRAIN must be named for THAT one and no other — a trait granting passage through thick undergrowth is not a "Mist-Walker", because the block has no mist in it and the reader now looks for some. An attack with a thrown RANGE must name what is thrown — every printed giant hurls "Rock"; a "Fist" with a 120-foot range throws nothing (name the stone, the spear, the shard of its own body). Names should say what the creature IS, not what the ability does: prefer a name drawn from the creature's nature over a description of its mechanics. Entry names are PLAIN ENGLISH — real words only; invented syllables ("Thul-eg Strike") belong to the creature's proper name, never to entries.

The creature's TYPE is already decided by the engine — do not choose one. Senses must support the body: a burrower or anything immune to the Blinded condition needs Tremorsense or Blindsight, not just eyes. Languages at Intelligence 4 or below follow the Zombie pattern ("Understands X but can't speak") or none. Vulnerabilities above CR 10 are almost never printed — only take one as a deliberate, concept-central choice.

Resistances and immunities are a budget, not a list: below CR 5 usually none or one; at high CR two or three resistances and one or two immunities, chosen for the concept. Damage immunities cost double a resistance.

Pick save proficiencies to match the tier: below CR 5 usually none, CR 5-10 up to two, CR 11+ two to four. Pick zero to three skills (Perception and Stealth are by far the most common in print).

${skeleton.damage_mix === 'physical' ? 'Pick ONE physical damage type for the whole creature — it deals no energy damage, and no energy field is wanted.' : 'Pick ONE physical damage type and ONE energy damage type for the whole creature.'} Its parts were assembled from several monsters, so choosing per ability produces something that deals fire, cold, poison and necrotic at once. You may ALSO pick an optional second energy type ("energy_damage_2") for dual-natured effects — a demon that burns AND blasts (Fire + Force) — only when the concept genuinely has two energies; omit it otherwise.
If the creature cannot speak, give it telepathy in senses_special or pick only spells it could deliver without a voice.

Return ONLY JSON:
{
  "physical_damage": "Bludgeoning|Piercing|Slashing",
  "energy_damage": "Acid|Cold|Fire|Force|Lightning|Necrotic|Poison|Psychic|Radiant|Thunder",
  "energy_damage_2": "optional second energy type, or omit",
  "name": "the creature's name",
  "size": "${skeleton.size}",

  "alignment": "e.g. Chaotic Evil",
  "speed": "${skeleton.movement && skeleton.movement.length ? `must include these modes: ${skeleton.movement.map((m) => m[0].toUpperCase() + m.slice(1)).join(', ')} — e.g. '30 ft., ${skeleton.movement.map((m) => `${m[0].toUpperCase() + m.slice(1)} 40 ft.`).join(', ')}'` : 'e.g. 30 ft., Fly 60 ft.'}",
  "stats": { "STR": 10, "DEX": 10, "CON": 10, "INT": 10, "WIS": 10, "CHA": 10 },
  "senses_special": "e.g. Darkvision 60 ft., Tremorsense 60 ft. — or omit",
  "save_proficiencies": ["zero to four of STR|DEX|CON|INT|WIS|CHA"],
  "skill_proficiencies": ["zero to three, e.g. Perception, Stealth"],
  "languages": "or omit",
  "resistances": "or omit", "immunities": "or omit", "vulnerabilities": "or omit",
  "entries": [
    { "id": "e1", "choose": "the NUMBER of the option you picked, when offered", "name": "an entry name", "text": "traits only, optional — your own wording of the same mechanic"${ASKABLE.map((s) => `, "${s}": "only if e1 asks for it"`).join('')} }
  ]
}`;
}

/** A response is usable if it names the creature and returns an entries array. */
export function validateFlavorResponse(jsonString) {
  try {
    const j = JSON.parse(jsonString);
    if (!j || typeof j.name !== 'string' || !j.name.trim()) return false;
    if (!Array.isArray(j.entries)) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Substitute the model's flavor into the skeleton and hand back the shape
 * assembleMonster expects.
 *
 * Anything the model failed to supply falls back to a neutral default rather
 * than leaving a literal "{substance}" in the text. A plain monster beats a
 * broken one, and beats a failed generation.
 */
const FALLBACK = {
  // Avoid any word that is also a damage type: "raw force" tripped
  // damage-type-caps, which reads a lowercase "force" as a miscased type.
  // And ARTICLE-FREE: templates use both "unleashes {substance}" and "its
  // {substance}" — "its a churning rush" shipped live (the Dreamweb).
  substance: 'churning vapor',
  delivery: 'unleashes',
  terrain: 'ice',
  spells: '*Detect Magic*',
  spells_daily: '',
  kindred_type: 'creature of its own kind',
  home_plane: 'its home realm',
  appendage: 'grasping limb',
  appendage_plural: 'grasping limbs',
  // Last-resort constants sit INSIDE print's pools so the echo vet never
  // has to re-touch them (the old '*Chromatic Orb*' was in no pool and
  // fingerprinted the set).
  signature_spell: '*Scorching Ray*',
  signature_spell_2: '*Ice Knife*',
  anchor: 'the place of its making',
  undoing: 'destroys that place',
  legacy: 'its unfinished purpose',
};

/**
 * Spells that cannot be cast through an action-based "casts one of the
 * following" entry. Zero printed action lists carry any of these; a model
 * picking Shield by vibe ships a spell list where half the entries do
 * nothing (live: the Alabaster's at-will Shield and Misty Step).
 */
const NON_ACTION_SPELLS = ['Shield', 'Misty Step', 'Counterspell', 'Hellish Rebuke',
  'Absorb Elements', 'Silvery Barbs', 'Feather Fall', 'Healing Word', 'Spiritual Weapon',
  'Shield of Faith', 'Expeditious Retreat'];

/**
 * Hard-control spells never sit At Will: print lists them 1/Day (the Adult
 * Silver Dragon's Hold Monster) even when a legendary action echoes them.
 * At-will Hold Monster is an unrelenting no-cost paralysis engine — the
 * audit flagged it on a live block but justified itself with a hallucinated
 * precedent, so the rule lives here, deterministically.
 */
const NO_AT_WILL_SPELLS = ['Hold Monster', 'Hold Person', 'Banishment', 'Dominate Person',
  'Dominate Monster', 'Forcecage', 'Maze', 'Plane Shift', 'Power Word Kill', 'Power Word Stun'];

/**
 * Spell levels for the well-known list, high-confidence subset. The rule
 * (owner call, 2026-08-02, third live occurrence of tier misfiling): no
 * spell of level 4+ ever sits At Will. Unknown names pass — a wrong level
 * would misfile someone's homebrew; a missing one only means the name-list
 * above and the audit still stand.
 */
const SPELL_LEVELS = {
  'Guiding Bolt': 1, 'Ice Knife': 1, 'Entangle': 1, 'Fog Cloud': 1, 'Thunderwave': 1,
  'Misty Step': 2, 'Invisibility': 2, 'Shatter': 2, 'Mind Spike': 2, 'Web': 2, 'Darkness': 2,
  'Hold Person': 2, 'Scorching Ray': 2, 'Gust of Wind': 2, 'Mirror Image': 2,
  'Fear': 3, 'Fireball': 3, 'Counterspell': 3, 'Fly': 3, 'Lightning Bolt': 3, 'Slow': 3,
  'Sleet Storm': 3, 'Stinking Cloud': 3, 'Command': 1,
  'Banishment': 4, 'Ice Storm': 4, 'Wall of Fire': 4, 'Polymorph': 4, 'Dimension Door': 4,
  'Confusion': 4, 'Blight': 4, 'Phantasmal Killer': 4,
  'Hold Monster': 5, 'Cone of Cold': 5, 'Wall of Force': 5, 'Cloudkill': 5, 'Dominate Person': 5,
  'Wall of Stone': 5, 'Telekinesis': 5, 'Flame Strike': 5, 'Insect Plague': 5,
  'Wall of Ice': 6, 'Chain Lightning': 6, 'Disintegrate': 6, 'Eyebite': 6, 'Sunbeam': 6,
  'Harm': 6, 'Heal': 6, 'Mass Suggestion': 6,
  'Prismatic Spray': 7, 'Reverse Gravity': 7, 'Teleport': 7, 'Finger of Death': 7, 'Etherealness': 7,
  'Dominate Monster': 8, 'Earthquake': 8, 'Sunburst': 8, 'Holy Aura': 8, 'Incendiary Cloud': 8,
  'Maze': 8, 'Power Word Stun': 8,
  'Meteor Swarm': 9, 'Power Word Kill': 9, 'Time Stop': 9, 'Storm of Vengeance': 9, 'Gate': 9,
  'Geas': 5, 'Modify Memory': 5, 'Dream': 5, 'Legend Lore': 5, 'Scrying': 5, 'Seeming': 5,
  'Mislead': 5, 'Commune': 5, 'Charm Person': 1, 'Suggestion': 2, 'Charm Monster': 4,
  'Divination': 4, 'Animate Dead': 3, 'Bestow Curse': 3, 'Vampiric Touch': 3, 'Haste': 3,
  'Blink': 3, 'Gaseous Form': 3, 'Create Undead': 6, 'Contact Other Plane': 5,
};

/**
 * Spells whose casting time exceeds one action (Geas: 1 minute; Dream: 1
 * minute). They CANNOT be cast in combat, so they never sit At Will and
 * never fill a combat-speed echo — but they stay legal in the 1/Day list,
 * because print puts them there as out-of-combat tools (the Night Hag's
 * Dream). Live: at-will Geas plus a legendary casting it three times a
 * round, all physically impossible under its own casting time.
 */
// Spells that CANNOT be cast as an action. Audited against the whole
// KNOWN_SPELLS universe (2026-08-05) rather than grown one live failure
// at a time — Move Earth's 10-minute cast shipped at-will AND as a
// legendary echo because it simply wasn't on the old list, which is the
// failure mode of every hand-maintained ban list. A spell-hygiene test
// pins the audit: any castable-slot spell not listed here is asserted
// action-castable.
const SLOW_CAST = ['Geas', 'Dream', 'Scrying', 'Commune', 'Legend Lore', 'Animate Dead',
  'Create Undead', 'Raise Dead', 'Symbol', 'Hallow', 'Forbiddance', 'Magic Circle',
  'Identify', 'Astral Projection', 'Contact Other Plane', 'Divination', 'Awaken', 'Simulacrum',
  'Glyph of Warding', 'Find Familiar', 'Modify Memory',
  // the 2026-08-05 audit's additions: minutes-or-longer casts
  'Move Earth', 'Antipathy/Sympathy', 'Create Homunculus', 'Drawmij\'s Instant Summons',
  'Programmed Illusion', 'Guards and Wards', 'Imprisonment', 'Sequester', 'Clone',
  'Magic Mouth', 'Nondetection', 'Water Breathing', 'Water Walk', 'Arcane Lock',
  'Continual Flame', 'Gentle Repose', 'Silence', 'Comprehend Languages', 'Detect Poison and Disease',
  'Purify Food and Drink', 'Alarm', 'Tiny Hut', 'Private Sanctum', 'Mordenkainen\'s Faithful Hound',
  'True Seeing', 'Contagion', 'Planar Binding', 'Teleportation Circle', 'Demiplane'];

/**
 * Concentration spells never cast from a LEGENDARY action (owner overrule,
 * 2026-08-03, modified_from_print on the White Dragon rows): the corpus's
 * one example reads as WotC errata, not policy — and a legendary-action
 * concentration cast is self-defeating anyway, competing with the
 * creature's own turn. Daily and at-will lists remain legal homes for
 * these (the Night Hag precedent).
 */
// Spells that deny or seize actions — the class print always locks when
// echoed from a legendary action (measured 2026-08-04: 100% of printed
// control echoes carry the lock; the unlocked echoes are all damage).
export const CONTROL_SPELLS = ['Command', 'Charm Person', 'Suggestion', 'Mass Suggestion',
  'Dominate Person', 'Dominate Monster', 'Fear', 'Hold Person', 'Hold Monster', 'Sleep',
  'Slow', 'Banishment', 'Confusion', 'Hypnotic Pattern', 'Crown of Madness',
  'Tasha\'s Hideous Laughter', 'Bestow Curse', 'Blindness/Deafness', 'Charm Monster'];

// Damage spells that scale with slot level, base level attached. Print
// ALWAYS annotates these in echoes and casts — "(level N version)" — and
// the level ramps with CR (Mind Spike L3 adult -> L5 ancient, Guiding
// Bolt L2 -> L4, Fireball L5 on the Pit Fiend). A bare echo of one is a
// level-ONE casting by rule: a CR 20 legendary throwing a 3d8 orb (live:
// Grasping Snare). Control spells stay bare legally (the Vampire's
// base-level Command).
export const SCALING_DAMAGE_SPELLS = {
  'Chromatic Orb': 1, 'Guiding Bolt': 1, 'Magic Missile': 1, 'Thunderwave': 1,
  'Burning Hands': 1, 'Ice Knife': 1, 'Witch Bolt': 1,
  'Scorching Ray': 2, 'Mind Spike': 2, 'Shatter': 2, 'Acid Arrow': 2, 'Moonbeam': 2,
  'Fireball': 3, 'Lightning Bolt': 3, 'Call Lightning': 3,
  'Vitriolic Sphere': 4, 'Ice Storm': 4, 'Blight': 4,
};

// Offense spells and the damage type each deals — the at-will density cap
// reads these (print: 39/59 at-will lists carry ZERO offense spells, 19
// one, only the Lich two, none three).
export const OFFENSE_SPELL_TYPES = {
  'Scorching Ray': 'Fire', 'Guiding Bolt': 'Radiant', 'Mind Spike': 'Psychic',
  'Shatter': 'Thunder', 'Acid Arrow': 'Acid', 'Ice Knife': 'Cold',
  'Fireball': 'Fire', 'Lightning Bolt': 'Lightning', 'Magic Missile': 'Force',
  'Chromatic Orb': null, 'Burning Hands': 'Fire', 'Fire Bolt': 'Fire',
  'Ray of Frost': 'Cold', 'Sacred Flame': 'Radiant', 'Poison Spray': 'Poison',
  'Eldritch Blast': 'Force', 'Witch Bolt': 'Lightning', 'Moonbeam': 'Radiant',
  'Cone of Cold': 'Cold', 'Ice Storm': 'Cold', 'Blight': 'Necrotic',
  'Call Lightning': 'Lightning', 'Vitriolic Sphere': 'Acid', 'Thunderwave': 'Thunder',
};

// Spells a creature can meaningfully cast ON ITSELF — the fill class for
// "casts {signature_spell} on itself" rows (the Blue's Cloaked Flight
// casts Invisibility). An attack spell in that slot self-immolates: a
// fire-VULNERABLE tar creature cast Scorching Ray on itself as movement
// tech (live: Slickstep, the Tar-Shroud Watcher).
export const SELF_CAST_SPELLS = ['Invisibility', 'Blur', 'Mirror Image', 'Shield of Faith',
  'Mage Armor', 'Sanctuary', 'Protection from Evil and Good', 'Gaseous Form', 'Misty Step'];
// ...and the subset a LEGENDARY may cast, because the concentration
// overrule (owner call: print's one example reads as errata) strips the
// rest. Two of our own rules were undoing each other — the self-cast vet
// set Invisibility, the concentration vet stripped it as concentration,
// and the redraw landed on an attack spell, so a creature cast Acid Arrow
// at itself as movement tech (live: the tar block, then Scouring Silt).
// The irony was exact: print's Cloaked Flight casts Invisibility, which
// is the very example the overrule targets.
export const SELF_CAST_NO_CONCENTRATION = ['Mirror Image', 'Mage Armor', 'Sanctuary',
  'Protection from Evil and Good', 'Misty Step'];

export const CONCENTRATION_SPELLS = ['Fear', 'Hold Person', 'Hold Monster', 'Dominate Person',
  'Dominate Monster', 'Dominate Beast', 'Hypnotic Pattern', 'Slow', 'Haste', 'Invisibility',
  'Greater Invisibility', 'Fly', 'Levitate', 'Blur', 'Banishment', 'Confusion',
  'Phantasmal Killer', 'Spirit Guardians', 'Bless', 'Bane', 'Faerie Fire', 'Web', 'Entangle',
  'Darkness', 'Fog Cloud', 'Silence', 'Moonbeam', 'Call Lightning', 'Flaming Sphere',
  'Witch Bolt', 'Eyebite', 'Sunbeam', 'Telekinesis', 'Polymorph', 'Charm Monster',
  'Compulsion', 'Stinking Cloud', 'Sleet Storm', 'Gaseous Form', 'Detect Thoughts',
  'Insect Plague', 'Cloudkill', 'Wall of Fire', 'Wall of Ice', 'Wall of Force', 'Wall of Stone',
  // gap-audit additions (live: Census Command cast Earthquake from a
  // legendary action — the rule was right, the list was short)
  'Earthquake', 'Vampiric Touch', 'Control Water', 'Control Weather'];

/**
 * Spells where "(level N version)" actually changes anything. Dream has no
 * upcast — "(level 9 version)" on it is noise the spike nudge invited.
 */
const SCALING_SPELLS = [...new Set([...Object.keys(SCALING_DAMAGE_SPELLS),
  'Cone of Cold', 'Hold Person', 'Hold Monster', 'Phantasmal Killer', 'Cure Wounds',
  'Sleep', 'Command', 'Wall of Ice', 'Chain Lightning', 'Flame Strike', 'Spirit Guardians'])];
// Corpus policy: at-will OFFENSE caps at level 2 in print; self-utility is
// exempt (metallic dragons carry Shapechange at will). Unknown names pass.
// (import, not require — this module runs in the browser; a stray require()
// here failed the first live generation after the policy shipped.)
const SPELL_POLICY = library._meta.spell_policy;
const atWillBanned = (sp) => NO_AT_WILL_SPELLS.includes(sp) || SLOW_CAST.includes(sp)
  || ((SPELL_LEVELS[sp] ?? 0) >= 3 && !SPELL_POLICY.self_utility_exempt.includes(sp));

/**
 * The curated spell universe: the union of every vetting table. A spell
 * outside it is off-palette BY DEFINITION — the tier rules can't judge what
 * they can't tier, which is exactly how Earth Tremor and Erupting Earth
 * (Xanathar's picks on a 2024-core block) sailed past every rule (live: the
 * Groan). Off-list names are dropped from list lines, never rewritten.
 */
const KNOWN_SPELLS = new Set([
  ...Object.keys(SPELL_LEVELS), ...NO_AT_WILL_SPELLS, ...SLOW_CAST, ...SCALING_SPELLS,
  ...NON_ACTION_SPELLS, ...(SPELL_POLICY.self_utility_exempt ?? []),
  ...Object.values(SPELL_POLICY.printed_pools ?? {})
    .flatMap((b) => [...(b.at_will ?? []), ...(b.daily ?? [])]),
  ...Object.keys(library._meta.spell_facets ?? {}),
  // every spell a printed template names inline is vetted by definition
  // (the Deva's *Bless*, the Pit Fiend's *Hold Monster*) — dropping one of
  // those would break the cast-implies-listed guarantee
  ...[...Object.values(library.categories).flat(), ...Object.values(library.traits.by_category).flat()]
    .flatMap((r) => [...(r.template_2024 ?? '').matchAll(/\*([A-Z][\w' ]+?)\*/g)].map((m) => m[1]))
    .filter((s) => !['Failure or Success', 'Hit or Miss', 'First Failure', 'Second Failure',
      'Failure', 'Success', 'Hit', 'Miss', 'Trigger', 'Response'].includes(s)),
]);

/**
 * Resolve which option fills each slot.
 *
 * The model's pick wins when it names a real option. The safety net is that
 * the DEFAULT combination (every entry's first option) was validated when the
 * skeleton was built, so if a set of swaps leaves some entry's dependency
 * unmet — swapping away the only grappler while a grapple-dependent entry
 * remains — the offending entries revert rather than shipping stranded.
 */
export function resolveChoices(skeleton, byId) {
  // Choices match on NORMALIZED keys: the model wraps picks in markdown
  // ("*Blinding Gaze*"), and an exact match silently kept the default — the
  // model then named the entry for the mechanic it believed it had (live:
  // "Lidless Glare" that pushes, because *Blinding Gaze matched nothing and
  // Cold Gale stayed).
  const normKey = (s) => String(s ?? '').replace(/[*`]/g, '')
    // snake_case and kebab-case arrive from the model ("cold_breath") —
    // separators normalize to spaces, not deletion ("coldbreath" matched
    // nothing and every multi-word choice silently kept its default; live:
    // the Shivering Watcher's trace)
    .replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  const chosen = skeleton.entries.map((e) => {
    if (!e.options || e.options.length < 2) return e;
    const raw = byId.get(e.id)?.choose;
    const want = normKey(raw);
    // The menu is numbered now, so a bare index is the expected answer; the
    // key is still accepted for responses written against the old prompt.
    const idx = Number(String(raw ?? '').trim().match(/^\d+$/)?.[0]);
    const hit = (Number.isInteger(idx) && idx >= 1 && idx <= e.options.length)
      ? e.options[idx - 1]
      : (want && e.options.find((o) => normKey(o.key) === want));
    return hit ? { ...e, ...hit, id: e.id, section: e.section } : e;
  });
  // Dependency repair BEFORE the clash pass. A swap can remove the block's
  // only imposer of a condition — swap away the grappler and a "creature
  // Grappled by the {creature}" entry strands (live: grapple-dependency-
  // orphan after a last-option sweep). Reverting the CONSUMER doesn't help:
  // its default needs the condition too. The right revert target is the
  // SWAP that removed the imposer, so restore that entry's default, which
  // satisfied everyone at build time.
  const satisfies = (e, r) => {
    if (r === 'attack:any') return e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack';
    if (r.startsWith('ability:')) return `ability:${e.name}` === r;
    if (r.startsWith('trait:')) return false; // traits are never swapped
    return (e.imposes ?? []).includes(r);
  };
  const buildMet = () => {
    const m = new Set();
    for (const e of chosen) {
      if (e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack') m.add('attack:any');
      for (const t of e.imposes ?? []) m.add(t);
      m.add(`ability:${e.name}`);
    }
    for (const t of skeleton.traits) m.add(`trait:${t.name}`);
    return m;
  };
  let met = buildMet();
  for (let guard = 0; guard < chosen.length; guard += 1) {
    let repaired = false;
    for (const e of chosen) {
      for (const r of e.requires ?? []) {
        if (met.has(r)) continue;
        const j = chosen.findIndex((c, idx) => c !== skeleton.entries[idx]
          && satisfies(skeleton.entries[idx], r));
        if (j !== -1) { chosen[j] = skeleton.entries[j]; repaired = true; }
      }
    }
    if (!repaired) break;
    met = buildMet();
  }
  // Sentence overlap is only checkable once the full combination is known:
  // two entries' NON-default options can duplicate each other even though
  // each was distinct from the defaults at build time.
  // Attack references are normalized before comparing: repointing later
  // renames them ALL to the block's own attack, so "makes one Rend attack"
  // and "makes one Claw attack" become the same sentence (live: Pounce and
  // Giggling Magic collided only after the swap).
  const sentences = (t) => new Set(String(t)
    .replace(/\b(makes? (?:one|two|three) )[A-Z][a-z]+(?: [A-Z][a-z]+)? attack/g, '$1X attack')
    .split(/(?<=\.)\s+/).map((x) => x.trim()).filter((x) => x.length > 30));
  const overlap = (a, b) => {
    let shared = 0;
    for (const line of a) if (b.has(line)) shared += 1;
    return shared >= 2;
  };
  const kept = [];
  for (let i = 0; i < chosen.length; i += 1) {
    const unmet = (chosen[i].requires ?? []).some((r) => !met.has(r));
    let e = unmet ? skeleton.entries[i] : chosen[i];
    let mine = sentences(e.text);
    const j = kept.findIndex((k) => overlap(mine, sentences(k.text)));
    if (j !== -1) {
      // First try reverting THIS entry to its default.
      e = skeleton.entries[i];
      mine = sentences(e.text);
      // If the default still clashes, the earlier entry's SWAP is the real
      // problem (defaults are mutually clash-free by construction at build
      // time) — revert that one instead. Order must not decide which swap
      // survives a collision the model could not have foreseen.
      if (overlap(mine, sentences(kept[j].text))) {
        kept[j] = skeleton.entries[j];
      }
    }
    kept.push(e);
  }
  return kept;
}

/**
 * Advance the named entries to their next alternative.
 *
 * This is how an audit finding is acted on. The old pipeline answered a
 * finding by asking the model to rewrite the entry's TEXT, which is the door
 * this architecture closes — a rewrite can change a damage figure. Swapping
 * the whole mechanic for another pre-scaled option fixes the creature without
 * ever letting prose become mechanics, and costs no call.
 *
 * An entry with no alternative left is kept as-is: shipping a block with a
 * known wart beats failing the generation.
 */
export function swapEntries(skeleton, entryNames) {
  const wanted = new Set(entryNames);
  const choices = new Map();
  for (const e of skeleton.entries) {
    if (!wanted.has(e.name) || !e.options || e.options.length < 2) continue;
    const at = e.options.findIndex((o) => o.key === e.name);
    const next = e.options[(at + 1) % e.options.length];
    if (next && next.key !== e.name) choices.set(e.id, next.key);
  }
  return choices;
}

/**
 * Strip a parenthetical citation from a defense line when nothing in the
 * block answers to it. Names are matched bare, so "(from Stone Mind)"
 * survives only if a Stone Mind entry or trait actually shipped.
 */
function dropDanglingCitations(value, sections) {
  if (typeof value !== 'string' || !value.includes('(')) return value;
  const names = Object.values(sections ?? {}).flat()
    .map((e) => String(e.name ?? '').replace(/\s*\([^)]*\)\s*$/, '').trim().toLowerCase())
    .filter(Boolean);
  const spellText = Object.values(sections ?? {}).flat()
    .filter((e) => /Spellcasting/i.test(e.name ?? '')).map((e) => e.text ?? '').join(' ').toLowerCase();
  return value.replace(/\s*\(([^)]*)\)/g, (whole, inner) => {
    const note = inner.toLowerCase();
    const namedEntry = names.some((n) => n && note.includes(n));
    const namedSpell = [...inner.matchAll(/\*([^*]+)\*/g)].some((m) => spellText.includes(m[1].toLowerCase()));
    return namedEntry || namedSpell ? whole : '';
  }).replace(/\s{2,}/g, ' ').trim();
}

/**
 * A NON-DONOR FALLBACK NAME (owner call, 2026-08-07).
 *
 * `given.name || entry.name` meant that whenever the flavor call omitted a
 * name for an entry, the SOURCE CREATURE'S name shipped — which is where
 * "Ice Walk" on an iron construct, "Multiple Heads" on a headless one, and
 * "Pounce" in 85% of blocks all came from. The mechanics were already
 * donor-free (11 of 788 rows name a donor body part); the NAME was the leak.
 *
 * The fallback is built from the block's own material register plus a plain
 * mechanical head noun, so an unnamed entry reads as this creature's rather
 * than as a transplant. Deterministic per entry id, so a block is stable.
 * name_locked entries (Multiattack, Spellcasting, Legendary Resistance) are
 * rules vocabulary and keep their printed names.
 */
const MECHANIC_NOUN = {
  plain_attack: ['Strike', 'Blow', 'Lash'],
  rider_attack: ['Rake', 'Gouge', 'Cleave'],
  area: ['Burst', 'Wave', 'Surge'],
  save_effect: ['Grasp', 'Snare', 'Hold'],
  save_damage: ['Torrent', 'Scour', 'Sear'],
  utility: ['Step', 'Shift', 'Guard'],
  legendary: ['Riposte', 'Answer', 'Reprisal'],
};

function fallbackEntryName(entry, skeleton, salt = 0) {
  const houses = skeleton.houses ?? [];
  const adjs = houses.flatMap((h) => textureBanks.houses?.[h]?.adjectives ?? []);
  const nouns = MECHANIC_NOUN[entry.slot_type] ?? ['Aspect', 'Trait', 'Habit'];
  // stable per entry, so the same block always renders the same name
  const seed = String(entry.id ?? entry.name ?? '')
    .split('').reduce((n, c) => ((n * 31) + c.charCodeAt(0)) >>> 0, 7) + salt * 101;
  const adj = adjs.length ? adjs[seed % adjs.length] : null;
  const noun = nouns[(seed >> 3) % nouns.length];
  return adj ? `${adj} ${noun}` : noun;
}

/**
 * The single place an entry's final name is decided. fill() and the
 * reference-propagation pass below must agree, or a fallback name renames
 * the attack while "makes three <old name> attacks" still points at the
 * name it used to have (live symptom: undefined-attack-ref).
 */
function resolveEntryName(entry, given, skeleton) {
  const printed = String(entry?.name ?? '').trim();
  const isRulesName = /^(?:Multiattack|Spellcasting|Legendary Resistance)\b/i.test(printed);
  if (entry?.name_locked || isRulesName) return printed;
  const modelName = typeof given?.name === 'string' ? given.name.trim() : '';
  return (modelName || fallbackEntryName(entry, skeleton) || printed).trim();
}

/**
 * THE TRAIT SPEC CONTRACT (owner call, 2026-08-07).
 *
 * Traits are 97% free prose (median 90 characters of real sentence, against
 * 59 for actions, whose 2024 grammar is nearly fixed), so they are where a
 * donor's fiction is most visible and where writing natively buys most.
 * The model may therefore RE-WRITE a trait in the creature's own voice —
 * but only if the rewrite says the same mechanical thing.
 *
 * This is the door the architecture closed ("never let a model edit
 * mechanics"), so the contract is mechanical, never editorial: every number,
 * every condition, every damage type and every rules keyword must survive
 * unchanged, and nothing new may appear. A rewrite that fails ANY clause is
 * discarded and the templated text ships — per entry, so one bad answer
 * costs one trait's prose and nothing else.
 */
const RULES_KEYWORDS = [
  'Saving Throw', 'Attack Roll', 'Advantage', 'Disadvantage', 'Resistance',
  'Immunity', 'Vulnerability', 'Difficult Terrain', 'Concentration',
  'Hit Points', 'Recharge', 'opportunity attack',
];

export function preservesTraitMechanics(original, rewrite) {
  if (typeof rewrite !== 'string') return false;
  const clean = rewrite.trim();
  if (clean.length < 15 || clean.length > original.length * 2.5 + 40) return false;

  const nums = (t) => (t.match(/\d+(?:d\d+)?/g) ?? []).sort();
  const a = nums(original); const b = nums(clean);
  if (a.join(',') !== b.join(',')) return false;               // no number may change

  const setOf = (t, list) => new Set(list.filter((w) => new RegExp(`\\b${w}\\b`, 'i').test(t)));
  const eq = (x, y) => x.size === y.size && [...x].every((v) => y.has(v));
  if (!eq(setOf(original, CONDITIONS), setOf(clean, CONDITIONS))) return false;
  const DAMAGE = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison',
    'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing'];
  if (!eq(setOf(original, DAMAGE), setOf(clean, DAMAGE))) return false;
  if (!eq(setOf(original, RULES_KEYWORDS), setOf(clean, RULES_KEYWORDS))) return false;

  // A trait carrying NO numbers, conditions, damage types or keywords has
  // nothing for the clauses above to check, so the contract was vacuous for
  // it: "The creature can breathe air and water" accepted "It does whatever
  // it likes, whenever it likes." For those traits the MEANING is the words,
  // so a rewrite must keep most of the original's concrete vocabulary.
  // Prefix-matched, so inflection ("climb"/"climbs") is not a difference.
  const STOP = new Set(['that', 'this', 'with', 'from', 'into', 'they', 'them', 'their', 'have',
    'while', 'when', 'each', 'other', 'than', 'then', 'must', 'been', 'does', 'doesn', 'until',
    'creature', 'target', 'itself', 'which', 'there', 'those', 'these', 'also', 'more', 'most']);
  const content = (t) => new Set((String(t).toLowerCase().replace(/\{[^}]*\}/g, ' ')
    .match(/[a-z]{4,}/g) ?? []).filter((w) => !STOP.has(w)).map((w) => w.slice(0, 5)));
  const want = content(original);
  if (want.size) {
    const kept = [...want].filter((w) => content(clean).has(w)).length;
    if (kept / want.size < 0.4) return false;
  }
  return true;
}

export function applyFlavor(skeleton, llmJson) {
  // Defensive against a PARTIAL object, not merely a malformed one. The
  // validator rejects a nameless response, but callers can bypass validation
  // (a mocked client, a retry handing back the last raw body), and throwing
  // here would fail the entire generation — the one thing this path promises
  // never to do. A block with a placeholder name is still a usable block.
  const j = llmJson && typeof llmJson === 'object' ? llmJson : {};
  const given = Array.isArray(j.entries) ? j.entries : [];
  const byId = new Map(given.filter((e) => e && e.id).map((e) => [e.id, e]));
  // eslint-disable-next-line no-param-reassign
  skeleton = { ...skeleton, entries: resolveChoices(skeleton, byId) };
  const creatureName = (typeof j.name === 'string' && j.name.trim())
    ? j.name.trim() : 'Unnamed Creature';
  // The lower-case form reads correctly mid-sentence ("the shalefang exhales").
  const inline = creatureName.toLowerCase();

  // One palette for the whole creature. A weapon swing is physical; a breath,
  // aura or rider is the creature's energy. Riders on a weapon attack are the
  // energy type, which is how official blocks read ("Slashing damage plus
  // Fire damage").
  const physical = PHYSICAL.includes(j.physical_damage) ? j.physical_damage : 'Bludgeoning';
  const ENERGY_TYPES = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder'];
  // The energy was ROLLED before the concept call and the concept was
  // written to it, so the flavor call does not get to revise it — its own
  // answer is only a fallback for generations that predate the roll.
  const rolledEnergy = (skeleton.energy && ENERGY_TYPES.includes(skeleton.energy))
    ? skeleton.energy
    : (typeof j.energy_damage === 'string' && j.energy_damage.trim()
      ? j.energy_damage.trim() : 'Force');
  // A PHYSICAL-ONLY block has no energy to render. Selection already keeps
  // energy-bearing rows out of it; this is the backstop, so a row that
  // slipped through prints a physical type rather than the energy the
  // creature was told it does not have.
  const energy = skeleton.damage_mix === 'physical' ? physical : rolledEnergy;
  // Optional SECOND energy for dual-natured effects (owner call, 2026-08-04):
  // a dual-pool print row (the Balor's Fire + Force Death Throes) fills its
  // rider with the second energy when the concept granted one; otherwise the
  // same-type pools merge downstream.
  const energy2 = typeof j.energy_damage_2 === 'string'
    && ENERGY_TYPES.includes(j.energy_damage_2.trim())
    && j.energy_damage_2.trim() !== energy
    ? j.energy_damage_2.trim() : null;

  // Facets this block may speak in, for the fill vet and banked fallbacks.
  const own = ownFacets(j.type, skeleton.themes);
  const TEXTURE_SLOTS = ['substance', 'delivery', 'terrain', 'appendage', 'appendage_plural'];
  // Echo-spell uniqueness across the block: print fields TWO spell-echo
  // legendaries (the Blue's Cloaked Flight + Sonic Boom) but never two
  // echoes of the SAME spell — the live Warden cast Command from two
  // legendary actions at once. A duplicate fill redraws on-palette.
  const usedEchoSpells = new Set();

  const fill = (entry) => {
    const given = byId.get(entry.id) ?? {};
    let text = entry.text;
    // Seeded per entry so fallback texture varies across a block instead of
    // repeating one phrase, yet stays reproducible from the block's seed.
    const entryRng = makeRng(((skeleton.seed ?? 1) >>> 0)
      + [...String(entry.id ?? '')].reduce((s, c) => s + c.charCodeAt(0), 0));
    // One appendage PAIR per entry: {appendage} and {appendage_plural} must
    // agree ("piston arm" / "piston arms"), so both draw from the same pick.
    let appendagePair = null;
    const bankFallback = (slot) => {
      if (slot === 'appendage' || slot === 'appendage_plural') {
        appendagePair = appendagePair ?? bankDraw('appendages', own, entryRng);
        return appendagePair ? (slot === 'appendage' ? appendagePair.one : appendagePair.many) : null;
      }
      // A snare row's substance is a RESTRAINT (owner call: unique to the
      // creature's register, never generically "webs") — draw from the
      // facet's restraints bank first.
      if (slot === 'substance' && /until the \{substance\} is destroyed|caused by \{substance\}/.test(entry.text)) {
        const houseRestraint = (skeleton.houses ?? [])
          .map((h) => textureBanks.houses?.[h]?.restraint).find(Boolean);
        return houseRestraint ?? bankDraw('restraints', own, entryRng) ?? bankDraw('substances', own, entryRng);
      }
      if (slot === 'substance') return bankDraw('substances', own, entryRng);
      if (slot === 'delivery') return bankDraw('deliveries', own, entryRng);
      return null; // terrain has no bank; the static fallback covers it
    };
    // Spell fills are STRUCTURED DATA, not markup (owner call, 2026-08-03):
    // the contract asks for plain names (arrays for lists), and the ENGINE
    // writes every asterisk. The model authoring its own italics made a
    // stylistic convention load-bearing — a degraded response dropped it and
    // every spell-recognizing layer went blind at once (live: the Grave
    // Vow's empty list and its dangling Blight echo). Strings still
    // normalize through the same path as a compatibility belt.
    const SPELL_SLOTS = (slot) => ['spells', 'spells_daily'].includes(slot) || slot.startsWith('signature_spell');
    const canonicalSpell = (rawName) => {
      const upcast = (rawName.match(/\s*\((level \d+ version)\)\s*$/) ?? [])[1];
      const bare = rawName.replace(/[*_`]/g, '').replace(/\s*\(level \d+ version\)\s*$/, '').trim();
      const hit = [...KNOWN_SPELLS].find((k) => k.toLowerCase() === bare.toLowerCase());
      if (!hit) return null;
      return `*${hit}*${upcast ? ` (${upcast})` : ''}`;
    };
    const normalizeSpellFill = (slot, raw) => {
      const names = Array.isArray(raw) ? raw.map(String)
        : typeof raw === 'string' ? raw.split(',') : [];
      const kept = names.map((n) => canonicalSpell(n)).filter(Boolean);
      const limit = slot === 'spells' || slot === 'spells_daily' ? kept.length : 1;
      return kept.length ? kept.slice(0, Math.max(1, limit)).join(', ') : null;
    };
    for (const slot of slotsIn(entry.text)) {
      let value;
      if (SPELL_SLOTS(slot)) {
        value = normalizeSpellFill(slot, given[slot]);
      } else {
        value = typeof given[slot] === 'string' && given[slot].trim()
          ? given[slot].trim() : null;
      }
      // The fill vet: a texture fill claiming a facet this block doesn't own
      // ("spore-laced" on a forged block whose themes never said verdant) is
      // replaced from the block's own banks, exactly like a missing fill.
      const houseTokens = new Set((skeleton.houses ?? [])
        .flatMap((h) => [h, ...(textureBanks.houses?.[h]?.tokens ?? [])]));
      if (value && TEXTURE_SLOTS.includes(slot) && offDomainToken(value, own, houseTokens)) {
        value = null;
      }
      // OFF-HOUSE vet (owner call, 2026-08-05): a fill may be perfectly
      // on-facet and still name a neighbouring material — brine and sleet
      // are both cold, both legal, and wrong together. A material fill
      // that names a house the block didn't declare redraws from the
      // house it did (live: the Scree spoke brine, sleet, and scree).
      if (value && ['substance', 'terrain'].includes(slot) && (skeleton.houses ?? []).length) {
        const mine = new Set((skeleton.houses ?? []).flatMap((h) => textureBanks.houses?.[h]?.tokens ?? []));
        // A RESTRAINT is the house made manifest (owner call, 2026-08-07:
        // "the mesh is obviously a web... it could be fast-hardening magma
        // or molten crystal — use textures"). The foreign-token vet let a
        // house-less generic through: "barbed tendril mesh" on a brine
        // block names no material at all, so the web survived its reskin.
        // A restraint fill that speaks NO house word takes the house's own
        // restraint form instead.
        const isRestraint = /until the \{substance\} is destroyed|caused by \{substance\}/.test(entry.text);
        if (isRestraint && ![...mine].some((tok) => new RegExp(`\\b${tok}`, 'i').test(value))) {
          const houseRestraint = (skeleton.houses ?? [])
            .map((h) => textureBanks.houses?.[h]?.restraint).find(Boolean);
          if (houseRestraint) value = houseRestraint;
        }
        const foreign = Object.entries(textureBanks.houses ?? {})
          .filter(([h]) => !(skeleton.houses ?? []).includes(h))
          .some(([, b]) => (b.tokens ?? []).some((tok) => new RegExp(`\\b${tok}`, 'i').test(value)
            && !mine.has(tok)));
        if (foreign) {
          // TERRAIN is ground, not stuff, so it never redraws from the
          // house's MATERIALS — nulling it here hands it to the habitat
          // fallback below. (It used to call surface() directly, which is
          // declared further down: a temporal-dead-zone crash that killed
          // whole generations live — "Cannot access 'surface' before
          // initialization" — and that no test reached, because every
          // fixture happened to fail an earlier terrain vet first.)
          if (slot === 'terrain') {
            value = null;
          } else {
            const pool = (skeleton.houses ?? []).flatMap((h) => textureBanks.houses?.[h]?.substances ?? []);
            value = pool.length ? pool[Math.floor(entryRng() * pool.length)] : null;
          }
        }
      }
      // Fiend cosmology is a closed book the audience knows cold: 15 of 15
      // printed fiends pair Lawful with the Nine Hells and Chaotic with
      // the Abyss (measured 2026-08-04). A Lawful block reforming in the
      // Abyss (live: the Snaring Coil) is a one-line contradiction.
      if (value && slot === 'home_plane') {
        const align = String(j.alignment ?? '');
        if (/lawful/i.test(align) && /abyss/i.test(value)) value = 'the Nine Hells';
        else if (/chaotic/i.test(align) && /hells|hell\b/i.test(value)) value = 'the Abyss';
      }
      // {terrain} fills are ONE surface: the model handed back "loose
      // scree, rockfall dust" and the comma splice shipped verbatim into
      // two sentences (live: Subterranean Slide).
      if (value && slot === 'terrain' && value.includes(',')) {
        value = value.split(',')[0].trim();
      }
      // {terrain} must be a SURFACE the creature could walk or climb:
      // media fills produce dead text — "Difficult Terrain composed of
      // air" grants mastery over a thing that can't be terrain (live:
      // Windborne Passage). Water stays legal (print walks on it); dead
      // fills fall through to the static fallback like any other.
      // {terrain} must name GROUND — a positive test, not a ban list.
      // The media ban caught air and mist; it could never catch
      // "carapace-plate", which is the block's own on-house material and
      // still not something anyone walks on (live: Cliff-Stride granting
      // passage over carapace, the Graspwarden). A fill that names no
      // walkable surface falls through to the seeded surface list.
      if (value && slot === 'terrain'
        && !/\b(stone|rock|scree|gravel|slate|shale|sand|dune|silt|mud|soil|earth|clay|ice|snow|frost|ash|dust|rubble|moss|root|bramble|water|brine|tar|pitch|slick|crust|ground|floor|glass|bone|salt|grit|loam|peat|slag|cinder|char)\b/i.test(value)) {
        value = null;
      }
      // ...and the terrain a creature IGNORES is environmental: it must be
      // ground a DM's map plausibly contains, so the model's fill is kept
      // only when it names one of the natural terrains. Everything else
      // redraws to the creature's habitat. (An exotic composition —
      // carapace-plate, grave-wax, burning ground — describes the
      // creature, not the world it walks through, and the trait then
      // never triggers.)
      if (value && slot === 'terrain') {
        // EXACT phrase, not stray words: matching word-by-word against the
        // joined list let "still water" through on the strength of "water"
        // inside "mud and shallow water" — and "deep mud" the same way,
        // which is the fill this vet was built to stop (live: Ice Walk on
        // the Brine Hound, shipping the same broken trait twice).
        const natural = (textureBanks._meta?.natural_terrain ?? []).map((t) => t.toLowerCase());
        if (!natural.includes(value.toLowerCase().trim())) value = null;
      }
      // Theme-aware spell draw (owner-approved 2026-08-03): on-palette,
      // pre-filtered against everything the downstream vets would reject,
      // so a pick always survives. Used for dead signature fills AND for
      // echo-spell dedupe redraws.
      const themedSpell = (exclude) => {
        const legendary = entry.section === 'Legendary Actions';
        const pool = Object.entries(library._meta.spell_facets ?? {})
          .filter(([, fs]) => fs.some((f) => own.has(f)))
          .map(([sp]) => sp)
          .filter((sp) => !SLOW_CAST.includes(sp) && !NON_ACTION_SPELLS.includes(sp)
            && !(exclude && exclude.has(sp))
            && !(legendary && CONCENTRATION_SPELLS.includes(sp)));
        return pool.length ? `*${pool[Math.floor(entryRng() * pool.length)]}*` : null;
      };
      // Dead-fill fallbacks, also used by the echo-spell vet below. The
      // terrain surface is SEEDED (the static 'difficult ground' was
      // CIRCULAR inside "Difficult Terrain composed of {terrain}"); the
      // offense pool is SEEDED print (the static '*Chromatic Orb*'
      // fingerprinted three unrelated blocks).
      const surface = () => {
        // HABITAT, not material (measured 2026-08-06): print's only
        // pass-through trait is Ice Walk, keyed to "ice or snow" — the
        // ground a snow creature lives on. Keying it to what the creature
        // is MADE of produced a fire thing striding over deep mud and a
        // spider-limbed thing over carapace-plate. Six real terrains; the
        // house names which one its creature would inhabit.
        const own2 = (skeleton.houses ?? []).map((h) => textureBanks.houses?.[h]?.habitat_terrain).filter(Boolean);
        const pool = own2.length ? own2 : (textureBanks._meta?.natural_terrain ?? ['rubble and broken stone']);
        return pool[Math.floor(entryRng() * pool.length)];
      };
      const printedOffense = () => {
        const base2 = ['Scorching Ray', 'Guiding Bolt', 'Mind Spike', 'Shatter', 'Ice Knife', 'Acid Arrow']
          .filter((sp) => !(entry.section === 'Legendary Actions' && CONCENTRATION_SPELLS.includes(sp)));
        // palette-first: a cold block's fallback should not be Scorching Ray
        const onPal = base2.filter((sp) => [physical, energy, energy2].includes(OFFENSE_SPELL_TYPES[sp]));
        const pool = onPal.length ? onPal : base2;
        return `*${pool[Math.floor(entryRng() * pool.length)]}*`;
      };
      if (!value) {
        value = (TEXTURE_SLOTS.includes(slot) ? bankFallback(slot) : null)
          ?? (slot.startsWith('signature_spell') ? (themedSpell() ?? printedOffense()) : null)
          ?? (slot === 'terrain' ? surface() : null)
          ?? FALLBACK[slot];
      }
      // Fills never carry their own terminal punctuation: the template
      // supplies it, and a sentence-shaped fill ("...every forge it
      // consumed.") spliced before the template's period shipped a live
      // double period (the Foundry Stag's Furnace Heart).
      value = value.replace(/\.+$/, '');
      // Echo spells come from the creature's palette or print's pools —
      // the model's repertoire staples fingerprinted the set (Chromatic
      // Orb on three unrelated blocks, its OWN pick each time: the spell
      // is in no pool, facet, or prompt example). Themes license
      // crossovers exactly like texture fills; off-everything picks
      // redraw on-palette, then from printed offense.
      if (slot.startsWith('signature_spell') && value) {
        const bareName = value.replace(/\*/g, '').replace(/\s*\(.*\)$/, '').trim();
        const facets = library._meta.spell_facets ?? {};
        const pools = SPELL_POLICY.printed_pools ?? {};
        const inPools = Object.values(pools).some((b) => [...(b.at_will ?? []), ...(b.daily ?? [])].includes(bareName));
        const onPalette = facets[bareName]?.some((f) => own.has(f));
        if (!inPools && !onPalette) {
          value = themedSpell(new Set([bareName])) ?? printedOffense();
        }
      }
      // an echo casts at combat speed: a 1-minute spell in it is impossible
      if (slot.startsWith('signature_spell') && SLOW_CAST.includes(value.replace(/\*/g, '').replace(/\s*\(.*\)$/, '').trim())) {
        value = FALLBACK[slot];
      }
      // ...and a minutes-long cast is just as impossible in a LIST slot:
      // atWillBanned only DEMOTED such spells to the 1/Day line, where
      // they are equally uncastable in a fight (live: Move Earth at will
      // AND echoed, the Riveted Bellows).
      if (['spells', 'spells_daily'].includes(slot)) {
        const parts4 = [...value.matchAll(/\*([A-Z][\w' /]+?)\*( \(level \d+ version\))?/g)];
        const fast = parts4.filter((mm) => !SLOW_CAST.includes(mm[1]));
        if (parts4.length && fast.length !== parts4.length) {
          value = fast.map((mm) => `*${mm[1]}*${mm[2] ?? ''}`).join(', ') || FALLBACK[slot];
        }
      }
      // No concentration spell casts from a LEGENDARY action (owner
      // overrule, see CONCENTRATION_SPELLS). List-shaped fills keep their
      // clean members; a fill emptied by the filter takes the fallback.
      if (entry.section === 'Legendary Actions'
        && (['spells', 'spells_daily'].includes(slot) || slot.startsWith('signature_spell'))) {
        const names = [...value.matchAll(/\*([A-Z][\w' ]+?)\*( \(level \d+ version\))?/g)];
        if (names.length) {
          const kept = names.filter((mm) => !CONCENTRATION_SPELLS.includes(mm[1]))
            .map((mm) => `*${mm[1]}*${mm[2] ?? ''}`);
          if (kept.length !== names.length) value = kept.join(', ') || FALLBACK[slot];
        }
      }
      // Control-spell density cap (measured 2026-08-04): no printed at-will
      // list carries more than ONE control spell, and no printed 1/Day list
      // carries two. The model stacked Command + Charm Person + Suggestion
      // at-will beside Dominate Monster + Mass Suggestion 1/Day (live: the
      // Skar — four DC-21 action denials a round as the floor). Extras
      // redraw on-palette as non-control; a dead redraw just drops.
      if (['spells', 'spells_daily'].includes(slot)) {
        const names = [...value.matchAll(/\*([A-Z][\w' /]+?)\*( \(level \d+ version\))?/g)];
        let controlSeen = 0;
        const kept = [];
        for (const mm of names) {
          if (CONTROL_SPELLS.includes(mm[1])) {
            controlSeen += 1;
            if (controlSeen > 1) {
              const alt = themedSpell(new Set([...names.map((x) => x[1]), ...CONTROL_SPELLS, ...usedEchoSpells]));
              if (alt) kept.push(alt);
              continue;
            }
          }
          kept.push(`*${mm[1]}*${mm[2] ?? ''}`);
        }
        if (names.length && kept.join(', ') !== value) value = kept.join(', ') || FALLBACK[slot];
      }
      // A block never casts spells of a damage type it is VULNERABLE to
      // (0/329 printed; live: the fire-vulnerable tar creature slinging
      // Scorching Ray). Applies to every spell slot; offenders drop from
      // lists and redraw in echoes.
      if (SPELL_SLOTS(slot)) {
        const vuln = String(j.vulnerabilities ?? '').toLowerCase();
        if (vuln.trim()) {
          const parts2 = [...value.matchAll(/\*([A-Z][\w' ]+?)\*( \(level \d+ version\))?/g)];
          const ok = parts2.filter((mm) => {
            const ty = OFFENSE_SPELL_TYPES[mm[1]];
            return !ty || !vuln.includes(ty.toLowerCase());
          });
          if (ok.length !== parts2.length) {
            if (slot.startsWith('signature_spell')) {
              value = themedSpell(new Set(parts2.map((mm) => mm[1]))) ?? printedOffense();
            } else {
              value = ok.map((mm) => `*${mm[1]}*${mm[2] ?? ''}`).join(', ') || FALLBACK[slot];
            }
          }
        }
      }
      // SPELL IDENTITY VET (owner call, 2026-08-05 — the watch item
      // matured): an offense spell's damage type must come from the
      // block's declared palette (physical/energy/energy2), with the
      // FACETS licensing crossovers exactly as they do for texture fills.
      // A tar undead casting Acid Arrow + Scorching Ray + Cloudkill from
      // three unrelated registers shipped an uncorrectable
      // energy-type-spread reject (live: the Tar-Shroud Watcher). Typed
      // offense that is neither palette nor facet-licensed drops from
      // lists and redraws in echoes.
      if (SPELL_SLOTS(slot) && typeof j.energy_damage === 'string' && j.energy_damage.trim()) {
        // guard: the vet judges against the model's DECLARED palette, not
        // the engine defaults — an undeclared energy (never-fail path,
        // sparse fixtures) vets nothing
        const facets2 = library._meta.spell_facets ?? {};
        const onIdentity = (name2) => {
          const ty = OFFENSE_SPELL_TYPES[name2];
          if (ty === null) return true; // any-type (Chromatic Orb)
          if (ty !== undefined && [physical, energy, energy2].includes(ty)) return true;
          // Utility spells were exempt entirely because the vet read
          // DAMAGE types — which is how Web reached a construct with no
          // trapper mechanics, three blocks running. A spell with a facet
          // must share one with the block... unless print itself hands it
          // to monsters of this tier, which is the same escape the echo
          // vet uses: over-vetting stripped Fear and Command, and a rule
          // that empties spell lists is worse than the drift it fixes.
          const fs = facets2[name2];
          if (!fs || !fs.length) return ty === undefined;
          // The pools escape is UTILITY-ONLY: applying it to offense
          // spells re-admitted Scorching Ray to a Necrotic block, undoing
          // the palette rule it exists beside. Damage must match the
          // palette; utility only has to be something print gives
          // monsters.
          const printed = ty === undefined && Object.values(SPELL_POLICY.printed_pools ?? {})
            .some((b) => [...(b.at_will ?? []), ...(b.daily ?? [])].includes(name2));
          return printed || fs.some((f) => own.has(f));
        };
        const parts3 = [...value.matchAll(/\*([A-Z][\w' ]+?)\*( \(level \d+ version\))?/g)];
        const kept3 = parts3.filter((mm) => onIdentity(mm[1]));
        if (parts3.length && kept3.length !== parts3.length) {
          if (slot.startsWith('signature_spell')) {
            value = themedSpell(new Set(parts3.map((mm) => mm[1]))) ?? printedOffense();
          } else {
            value = kept3.map((mm) => `*${mm[1]}*${mm[2] ?? ''}`).join(', ') || FALLBACK[slot];
          }
        }
      }
      // OFFENSE density cap (measured 2026-08-05): no printed at-will list
      // carries three offense spells — 39/59 carry zero, 19 one, only the
      // Lich two (live: Burning Hands + Magic Missile + Scorching Ray,
      // two-thirds redundant fallbacks). Trim to the Lich ceiling. Drop
      // order is the only theme-awareness here: off-palette damage types
      // go first, echoed spells stay (menu and echo should agree) — the
      // full spell-affinity vet stays parked pending more instances
      // (owner call).
      if (slot === 'spells') {
        const parts = [...value.matchAll(/\*([A-Z][\w' ]+?)\*( \(level \d+ version\))?/g)];
        const offense = parts.filter((mm) => mm[1] in OFFENSE_SPELL_TYPES);
        if (offense.length > 2) {
          const score = (mm) => {
            const ty = OFFENSE_SPELL_TYPES[mm[1]];
            return (usedEchoSpells.has(mm[1]) ? 4 : 0)
              + (ty === null || [physical, energy, energy2].includes(ty) ? 2 : 0);
          };
          const keep = new Set([...offense].sort((a2, b2) => score(b2) - score(a2)).slice(0, 2).map((mm) => mm[1]));
          const kept = parts.filter((mm) => !(mm[1] in OFFENSE_SPELL_TYPES) || keep.has(mm[1]))
            .map((mm) => `*${mm[1]}*${mm[2] ?? ''}`);
          if (kept.length) value = kept.join(', ');
        }
      }
      // (Off-list vetting for spell slots now happens in normalizeSpellFill
      // above — unknown names never survive normalization.)
      // Self-cast slots take a self-buff, and this runs LAST among the
      // spell vets because it is the most SPECIFIC: the identity vet
      // (extended to utility spells) was overriding it and putting an
      // attack spell back, which is the same collision the concentration
      // rule caused. A specific rule must have the last word over the
      // general ones, or they take turns undoing each other.
      if (slot.startsWith('signature_spell') && / on itself/.test(entry.text)) {
        const allowed = entry.section === 'Legendary Actions'
          ? SELF_CAST_NO_CONCENTRATION : SELF_CAST_SPELLS;
        const bare2 = value.replace(/\*/g, '').replace(/\s*\(.*\)$/, '').trim();
        if (!allowed.includes(bare2)) value = `*${allowed[0]}*`;
      }
      // Echo-spell dedupe: an ECHO entry (anything that isn't the tiered
      // list) filling a spell another echo already cast redraws on-palette.
      if (SPELL_SLOTS(slot) && !/casts one of the following/.test(entry.text)) {
        const names = [...value.matchAll(/\*([A-Z][\w' ]+?)\*/g)].map((mm) => mm[1]);
        if (names.some((nm) => usedEchoSpells.has(nm))) {
          // A vet that gives up silently stops enforcing exactly when it
          // is needed: the themed draw returns null on a narrow palette,
          // and `if (alt)` then left the duplicate standing — two
          // legendaries casting one spell (live: Scouring Silt). Fall
          // through to print's offense pool the way other fills do.
          value = themedSpell(new Set([...usedEchoSpells, ...names])) ?? printedOffense();
        }
        for (const mm of value.matchAll(/\*([A-Z][\w' ]+?)\*/g)) usedEchoSpells.add(mm[1]);
      }
      // Upcast stamp for scaling damage spells: print's pattern is +1
      // level in the adult band (CR 13-17) and +2 at 18+, never omitted at
      // a CAST SITE. Print leaves the LIST lines bare (21/21 measured) —
      // stamping them too is a deliberate improvement on print (owner
      // call, 2026-08-04): a bare list entry cast directly from the
      // Spellcasting action is a level-ONE casting by rule, which is
      // print's own unclosed gap. The model's annotation, when present,
      // is kept.
      if (SPELL_SLOTS(slot)) {
        value = value.replace(/\*([A-Z][\w' ]+?)\*(?! \(level)/g, (m0, sp) => {
          const base = SCALING_DAMAGE_SPELLS[sp];
          const crN = Number(String(skeleton.cr).includes('/') ? 0 : skeleton.cr);
          if (!base || crN < 13) return m0;
          return `*${sp}* (level ${base + (crN >= 18 ? 2 : 1)} version)`;
        });
      }
      // "each creature that isn't a Humanoid" spares the party — a kindred
      // exclusion only works when the kindred isn't what adventurers are.
      // {kindred_type} is the creature's OWN type — an aura that spares
      // "Celestial creatures" on a Construct spares nobody and reads as a
      // leftover (live: Undertow Surge, the Brine Hound). Only the
      // Humanoid case was checked before, because that one spares the
      // party.
      if (slot === 'kindred_type') {
        const own2 = String(j.type ?? '').trim();
        if (/humanoid/i.test(value)) value = FALLBACK.kindred_type;
        else if (own2 && value.trim().toLowerCase() !== own2.toLowerCase()) value = own2;
      }
      text = text.split(`{${slot}}`).join(value);
    }
    // Print's ignite rider says "it starts burning" — the library's
    // de-flavor pass turned that into "it starts suffering the effect",
    // a dangling reference to an effect no clause names (5 rows; live:
    // Hurl Cinder on the Emberwraith). Fire gets print's verb back; any
    // other energy drops the sentence, which was flavor-only anyway
    // (2024 has no Burning condition) and object-only besides.
    if (text.includes('starts suffering the effect')) {
      text = energy === 'Fire'
        ? text.replace(/starts suffering the effect/g, 'starts burning')
        : text.replace(/\s*(?:If the target is (?:a creature or )?a flammable object[^.]*|Creatures and flammable objects in the Emanation)[^.]*starts suffering the effect\./g, '');
    }
    // A weakness trigger keys on the energy's FOIL, never on the block's
    // own element: 0 of 329 printed blocks pair an absorption trait and a
    // weakness trait on one type (the Flesh Golem absorbs Lightning and
    // fears Fire). Live: Frozen Vigor healed from Cold while Thawing
    // Malaise was slowed by Cold, on a Cold-IMMUNE block — three ways
    // dead at once.
    if (text.includes('{weakness_type}')) {
      const FOIL = {
        Cold: 'Fire', Fire: 'Cold', Necrotic: 'Radiant', Radiant: 'Necrotic',
        Poison: 'Radiant', Acid: 'Cold', Lightning: 'Thunder', Thunder: 'Lightning',
        Psychic: 'Force', Force: 'Psychic',
      };
      const immune = String(j.immunities ?? '');
      const owned = [physical, energy, energy2].filter(Boolean);
      const pick = [FOIL[energy] ?? 'Fire', 'Fire', 'Radiant', 'Thunder', 'Force']
        .find((t) => !owned.includes(t) && !immune.includes(t)) ?? (FOIL[energy] ?? 'Fire');
      text = text.split('{weakness_type}').join(pick);
    }
    // The PHYSICAL type follows the limb, not the block (measured
    // 2026-08-05): print derives it per attack — Bite Piercing 72/74,
    // Slam Bludgeoning 13/13, Rend Slashing 57/60, Fist Bludgeoning 5/5 —
    // and 47 printed blocks carry two or more physical types at once. The
    // block-wide stamp exists to stop ENERGY sprawl (fire+cold+poison on
    // one body) and that reasoning never transferred to physical types:
    // it shipped a "Magma Fist" dealing Slashing (live, the Furnaceflow).
    // Reader-facing name first, the row's printed name second, the
    // block's declaration last.
    const ANATOMY = [
      [/\b(?:fist|slam|hammer|mace|club|maul|pseudopod|crush|smash|stomp|tail slap|boulder)\b/i, 'Bludgeoning'],
      [/\b(?:claw|talon|rend|shear|blade|sword|scythe|slash|razor|sickle|wing)\b/i, 'Slashing'],
      [/\b(?:bite|fang|tusk|sting|gore|spear|spike|lance|javelin|quill|beak|horn|harpoon|barb|jaw|jaws|maw|mandible|teeth|tooth)\b/i, 'Piercing'],
    ];
    // The limb the grapple OCCUPIES follows the same word: print's rows
    // hardcode their donor's anatomy ("from one of two hands", the
    // Vampire's Grave Strike) and a rename leaves a jaw grappling with
    // hands (live: Clamp Jaw, the Riveted Bellows).
    const LIMB_NOUN = [
      [/\bjaws?\b|\bmaw\b|\bmandible/i, 'jaws'], [/\bclaws?\b/i, 'claws'],
      [/\btalons?\b/i, 'talons'], [/\btentacles?\b/i, 'tentacles'],
      [/\bpincers?\b/i, 'pincers'], [/\bfists?\b|\bhands?\b/i, 'hands'],
      [/\bcoils?\b/i, 'coils'], [/\bfangs?\b/i, 'fangs'],
    ];
    const limbType = (...names) => {
      for (const n of names) {
        const hit = ANATOMY.find(([re]) => re.test(String(n ?? '')));
        if (hit) return hit[1];
      }
      return null;
    };
    // A weapon attack's MAIN damage is physical; everything else is energy
    // — EXCEPT bodily squeezes: a save-based constrict/crush that imposes
    // the grapple is the body itself pressing, and print types it
    // Bludgeoning 7 of 9 (the exceptions are energy-BODIED elementals).
    // The energy stamp shipped a rib cage dealing Psychic (live: Cage of
    // Ribs, the Keening Scuttler).
    const mainIsPhysical = entry.slot_type === 'plain_attack' || entry.slot_type === 'rider_attack'
      || (/Saving Throw/.test(text) && /Grappled condition \(escape/.test(text));
    // TYPE PHYSIOLOGY, narrow and measured (2026-08-06): all 4 printed
    // oozes deal Acid and NOTHING else — not Bludgeoning either — because
    // an amorphous mass has no edge, point, or mass to swing. Ours slashed
    // three ways and bit once (live: the Arterial Drifter). Ooze only:
    // Construct is Bludgeoning-dominant but not unanimous (8/2/1) and
    // Elemental is genuinely mixed (8/8/3), and encoding those would be
    // the n=2 over-fitting we overrule critics for.
    // Energy-only blocks generalise the Ooze rule: a body with no edge,
    // point or mass deals its energy and nothing else. Print builds these
    // as wraiths, elementals, oozes, swarms and archmages (7% at CR 5+).
    const amorphous = j.type === 'Ooze' || skeleton.damage_mix === 'energy';
    const perEntryPhysical = ['Bludgeoning', 'Piercing', 'Slashing'].includes(given.physical)
      ? given.physical : null;
    const attackPhysical = amorphous ? (energy === 'Poison' ? 'Acid' : energy)
      : (mainIsPhysical ? (perEntryPhysical ?? limbType(given.name, entry.name) ?? physical) : physical);
    {
      const limb = LIMB_NOUN.find(([re]) => re.test(String(given.name ?? entry.name ?? '')));
      if (limb) text = text.replace(/(from one of (?:two|four|six|ten) )([a-z' -]+)/i, `$1${limb[1]}`);
    }
    text = text.split('{damage_type}').join((mainIsPhysical || amorphous) ? attackPhysical : energy);
    for (const s of ['rider_damage_type', 'rider2_damage_type', 'alt_damage_type', 'alt2_damage_type']) {
      // On a NON-attack entry the main is already the energy, so a rider
      // slot takes the second energy when the concept granted one — print's
      // dual-pool rows (Fire plus Force) instead of "Fire plus Fire".
      const riderEnergy = s.startsWith('rider') && !mainIsPhysical ? (energy2 ?? energy) : energy;
      text = text.split(`{${s}}`).join(s.startsWith('alt') && mainIsPhysical ? attackPhysical : riderEnergy);
    }
    text = text.split('{creature}').join(inline);
    // A legendary spell echo casting a CONTROL spell always carries the
    // per-turn lock in print: every printed control echo is locked
    // (Frightful/Commanding Presence, Mind Jolt, Beguile, Dread Command,
    // Frightening Gaze — 100%), while the unlocked echoes are all damage
    // spells (Blazing Light, Guiding Light, Mind Invasion). An unlocked
    // row filled with Command shipped up to three DC-21 action-denials a
    // round on top of the at-will list (live: the Skar's Gilded Misstep).
    if (entry.section === 'Legendary Actions'
      && /uses Spellcasting to cast \*/.test(text)
      && !/can't take this action again/.test(text)) {
      const echoed = [...text.matchAll(/\*([A-Z][\w' ]+?)\*/g)].map((mm) => mm[1]);
      if (echoed.some((sp) => CONTROL_SPELLS.includes(sp))) {
        text = `${text.trim().replace(/\.?$/, '.')} The ${inline} can't take this action again until the start of its next turn.`;
      }
    }
    let name = resolveEntryName(entry, given, skeleton);
    // The gate is part of the NAME in print ("Fire Breath (Recharge 5-6)").
    // It was being dropped here, which shipped every recharge ability as
    // at-will (live: a 60-foot paralysis cone usable every turn). Legendary
    // entries carry their pacing inline instead, as print does.
    if (entry.gate && entry.section !== 'Legendary Actions' && !/\(/.test(name)) {
      name = `${name} (${entry.gate})`;
    }
    // A trait may arrive re-written in the creature's own voice. It ships
    // only if it says the same mechanical thing; otherwise the templated
    // text stands and nothing is lost.
    if (entry.section === 'Traits' || skeleton.traits?.includes(entry)) {
      const rewrite = typeof given.text === 'string' ? given.text.trim() : '';
      if (rewrite && preservesTraitMechanics(text, rewrite)) {
        text = rewrite.split('{creature}').join(inline);
      }
    }
    return { name, text };
  };

  const sections = {};
  const push = (section, e) => {
    if (!sections[section]) sections[section] = [];
    sections[section].push(e);
  };
  // Skeleton entry -> its rendered object, so the Multiattack rebuild at the
  // bottom can read FINAL names (post-swap, post-rename, post-vetting).
  const renderedOf = new Map();
  for (const t of skeleton.traits) push('Traits', fill(t));
  for (const e of skeleton.entries) {
    const r = fill(e);
    renderedOf.set(e, r);
    push(e.section, r);
  }

  // A swap can change which entry IS the attack, so references written
  // against the pre-swap name dangle ("makes one Rend attack" with no Rend).
  // Repoint every reference at whatever the attack ended up being, before the
  // rename pass below renames it again.
  const finalAttack = skeleton.entries.find(
    (e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack',
  );
  if (finalAttack) {
    for (const list of Object.values(sections)) {
      for (const e of list) {
        e.text = e.text.replace(
          /\b(makes?|replace|repeats?) (one|two|three|its|a|an|the) ([A-Z][a-z]+(?: [A-Z][a-z]+)?) attack/g,
          (m0, verb, count, named) => (named === finalAttack.name ? m0 : `${verb} ${count} ${finalAttack.name} attack`),
        );
      }
    }
  }

  // Entry names may have changed, so references written against the old name
  // must follow. Multiattack is the common case ("makes three Rend attacks").
  // EVERY entry, not just attacks (owner-visible live find, 2026-08-14:
  // the Cloaker's Moan renamed to "Gilded Haze" while its own immunity
  // clause still granted immunity to "this gilded censer's Moan" — a
  // reference to an entry that no longer existed. Attack references were
  // propagated; ability self-references were not).
  const attacks = (skeleton.entries ?? []).filter((e) => e.id);
  // EVERY attack, not just the first: the Multiattack line now enumerates
  // secondaries ("It can replace one attack with a use of X"), so their
  // renames must follow too.
  for (const atk of attacks) {
    const oldName = atk.name;
    const newName = resolveEntryName(atk, byId.get(atk.id), skeleton);
    if (newName === oldName) continue;
    // Word-boundaried: a bare split/join on "Bite" would also rewrite the
    // inside of "Ruin-Fed Bite" and corrupt the longer name.
    const esc = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(?<![\\w-])${esc}(?![\\w-])`, 'g');
    for (const list of Object.values(sections)) {
      for (const e of list) e.text = e.text.replace(re, newName);
    }
  }

  // ---- post-flavor sanity, all deterministic ------------------------------

  // The sections-level correction sweep lives in corrections.mjs as named,
  // ordered, individually-traced passes (audit finding #1). Same passes,
  // same order, byte-identical behavior — enforced by the golden blocks.
  runCorrections({
    skeleton, j, sections, byId, energy, physical, inline, renderedOf,
    fallbackEntryName, NON_ACTION_SPELLS, SCALING_SPELLS, KNOWN_SPELLS, atWillBanned,
  });

  // Multiattack is ENGINE text: regenerate it last, from the final rendered
  // names, instead of writing default names at build time and chasing them
  // through swaps and renames (live: "a use of Lightning Blade" pointing at
  // an attack the model had renamed Folded Aperture — the build-time clause
  // survived a swap that the rename pass keyed past). One source of truth,
  // computed after every pass that can change a name has run.
  {
    const multi = skeleton.entries.find((e) => e.slot_type === 'multiattack');
    const finalAtks = skeleton.entries
      .filter((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack')
      .map((e) => renderedOf.get(e))
      .filter(Boolean);
    const rendered = multi && renderedOf.get(multi);
    if (rendered && finalAtks.length) {
      // A grapple that commits "from both <appendages>" reads absurd as
      // the TRIPLED primary — three swings from hands the first swing
      // filled (live: three Grasp attacks "from both talons"). Print's
      // Roc layout: the volume attack leads, the committer is the
      // replacement option. Reorder when a non-committing attack exists.
      if (finalAtks.length > 1 && /from both /.test(finalAtks[0].text)) {
        const clean = finalAtks.findIndex((a) => !/from both /.test(a.text));
        if (clean > 0) finalAtks.unshift(finalAtks.splice(clean, 1)[0]);
      }
      const n = skeleton.multiattack;
      const stripGate = (nm) => nm.replace(/\s*\(.*\)$/, '');
      const word = ['', 'one', 'two', 'three', 'four', 'five', 'six'][n] ?? n;
      // Two attacks on ONE damage budget use print's dominant choice idiom
      // ("makes three attacks, using X or Y in any combination" — 59
      // printed blocks): a ranged-only primary with a melee-capable
      // replace-one option half-fails in melee (live: one clean lance
      // plus two disadvantaged throws on the closed-upon Dreadwalker).
      const budgets = skeleton.entries
        .filter((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack')
        .map((e) => e.damage ?? 0);
      const equalBudgets = finalAtks.length === 2 && budgets.length === 2 && budgets[0] === budgets[1];
      rendered.text = equalBudgets
        ? `The ${inline} makes ${word} attacks, using ${stripGate(finalAtks[0].name)} or ${stripGate(finalAtks[1].name)} in any combination.`
        : `The ${inline} makes ${word} ${stripGate(finalAtks[0].name)} attacks.`
          + finalAtks.slice(1).map((a) => ` It can replace one attack with a use of ${stripGate(a.name)}.`).join('');
    }
  }

  // A MOBILITY legendary points at an attack the chassis can actually
  // deliver after moving: the template hardcodes "makes one Rend attack"
  // and the reference repointer aims it at the FIRST attack row, blind to
  // the body — on a Fly 90 / ranged-parity skirmisher that demanded the
  // melee dive its whole kit exists to avoid (live: Skimming Reattack on
  // the Scree). Prefers a ranged-capable attack when the block flies or
  // fights at range; otherwise nothing changes.
  {
    const wantsRange = (skeleton.movement ?? []).includes('fly')
      || ['ranged', 'mixed'].includes(skeleton.attack_mode ?? '');
    if (wantsRange) {
      const rendered = skeleton.entries
        .filter((e) => e.slot_type === 'plain_attack' || e.slot_type === 'rider_attack')
        .map((e) => renderedOf.get(e)).filter(Boolean);
      const ranged = rendered.find((r) => /Ranged Attack Roll|or range \d/.test(r.text));
      if (ranged && rendered.length > 1) {
        const stripGate = (nm) => nm.replace(/\s*\(.*\)$/, '');
        for (const e of sections['Legendary Actions'] ?? []) {
          if (!/(?:moves up to|teleports? up to)[^.]*makes one /.test(e.text)) continue;
          e.text = e.text.replace(/(makes one )([A-Z][\w' -]+?)( attack)/,
            (m0, head, named, tail) => (rendered.some((r) => stripGate(r.name) === named)
              ? `${head}${stripGate(ranged.name)}${tail}` : m0));
        }
      }
    }
  }

  // Actions order follows print: Multiattack, then attacks, then everything
  // else (Recharge included), Spellcasting LAST — 47 of 48 printed
  // Spellcasting actions sit at the end of Actions, and all 21 that share a
  // block with a Recharge entry come after it (the dragons' universal
  // layout). Stable within ranks, so pick order still decides ties.
  if (sections.Actions) {
    const rank = (e) => (e.name === 'Multiattack' ? 0
      : /Attack Roll:\*?/.test(e.text) ? 1
        : /casts one of the following/.test(e.text) ? 3 : 2);
    sections.Actions = sections.Actions
      .map((e, i) => [rank(e), i, e])
      .sort((a, b) => a[0] - b[0] || a[1] - b[1])
      .map(([, , e]) => e);
  }

  const nameOrigins = {};
  for (const list of Object.values(sections)) {
    for (const e of list) {
      const origin = skeleton.entries.find((k) => byId.get(k.id)?.name?.trim() === e.name.replace(/\s*\(.*\)$/, ''))
        ?? skeleton.traits.find((k) => byId.get(k.id)?.name?.trim() === e.name.replace(/\s*\(.*\)$/, ''));
      if (origin && origin.name !== e.name) nameOrigins[e.name] = origin.name;
    }
  }

  return {
    name: creatureName,
    name_origins: nameOrigins,
    size: j.size || skeleton.size,
    type: j.type,
    alignment: j.alignment,
    speed: j.speed,
    stats: stampStats(j.stats ?? {}, skeleton, {
      hasSpellcasting: skeleton.entries.some((e) => /\{spells\}/.test(e.text) || /spellcasting ability/.test(e.text)),
    }),
    senses_special: typeof j.senses_special === 'string' ? j.senses_special : undefined,
    save_proficiencies: Array.isArray(j.save_proficiencies) ? j.save_proficiencies : [],
    skill_proficiencies: Array.isArray(j.skill_proficiencies) ? j.skill_proficiencies : [],
    languages: j.languages,
    // A defense may cite where it comes from, but only if the source
    // exists. Print does this twice and both resolve (the Archmage's
    // "Charmed (with Mind Blank)" names a spell it casts). The Grindor
    // shipped "Psychic (from Stone Mind)" with no such trait — the
    // undefined-attack-ref class, in a line nothing was checking. The
    // defense is fine; only the dangling citation is dropped. Applied at
    // BOTH seams: assembly cleans the chassis path, this cleans the
    // skeleton path's own model.
    resistances: dropDanglingCitations(j.resistances, sections),
    immunities: dropDanglingCitations(j.immunities, sections),
    vulnerabilities: dropDanglingCitations(j.vulnerabilities, sections),
    sections,
  };
}

/** A chassis-shaped view of the skeleton, so assembleMonster can be reused. */
export function chassisFromSkeleton(skeleton) {
  return {
    ac: skeleton.ac,
    hp: skeleton.hp,
    pb: skeleton.pb,
    attack_bonus: skeleton.attack_bonus,
    save_dc: skeleton.save_dc,
    // Archetype-gated lint rules read this (bps-resistance exempts swarms);
    // omitting it made the corrector strip the swarm package the engine had
    // just stamped.
    archetype: skeleton.archetype ?? null,
  };
}

/**
 * A slot plan describing what the skeleton ACTUALLY built.
 *
 * The lint's `counts` rule validates entry counts against a plan. Handing it
 * `slotPlanFor` — the old chassis's plan — makes it reject every skeleton
 * block, because the two disagree about what a creature at this CR should
 * look like by construction. Cross-referencing the skeleton's own counts is
 * the point: the check becomes "did assembly ship what was planned", which
 * is a real invariant, instead of "does this match a different planner".
 */
export function planFromSkeleton(skeleton) {
  const inSection = (s) => skeleton.entries.filter((e) => e.section === s).length;
  const actions = inSection('Actions');
  const legendaryCount = inSection('Legendary Actions');
  return {
    cr: skeleton.cr,
    tier: `skeleton_${skeleton.cr}`,
    archetype: null,
    traits: [skeleton.traits.length, skeleton.traits.length],
    actions: [actions, actions],
    multiattack: skeleton.multiattack > 1
      ? { status: 'required', count: [skeleton.multiattack, skeleton.multiattack] }
      : { status: 'optional', count: [1, 1] },
    bonus_action: { status: inSection('Bonus Actions') ? 'required' : 'optional' },
    reaction: { status: inSection('Reactions') ? 'required' : 'optional' },
    legendary: { status: legendaryCount ? 'required' : 'optional', count: [legendaryCount, legendaryCount] },
    required_slots: [],
  };
}

/**
 * Pin the attacking ability score so its modifier EXACTLY equals the flat
 * damage bonus the skeleton already baked into the dice.
 *
 * The grognard contract is that an attack's flat damage bonus is the modifier
 * of the ability that made the attack roll. The skeleton computes that bonus
 * as attack_bonus - PB before any stats exist, so a model handing back a
 * higher score breaks the identity: at CR 5 the dice carry +4 while STR 20
 * reads +5, and attack-mod-coherence rejects it. assembleMonster only ever
 * RAISES a stat (official blocks undershoot the ceiling but never exceed it),
 * so the fix belongs here, before assembly.
 */
export function stampStats(stats, skeleton, { hasSpellcasting = false } = {}) {
  const out = { ...stats };
  const requiredMod = skeleton.attack_bonus - skeleton.pb;
  // The striker is the ENGINE's call, decided from size and attack mode when
  // the skeleton was built (skeleton.strike_stat): STR backs 72% of printed
  // melee and 100% at Huge/Gargantuan; DEX backs small and ranged bodies. The
  // previous version pinned whatever stat the model ranked highest, which
  // shipped a Huge dragon biting with CHA 26 over STR 18 — an inversion no
  // printed dragon exhibits.
  const attacker = skeleton.strike_stat ?? 'STR';
  out[attacker] = Math.min(30, Math.max(1, requiredMod * 2 + 10));

  // The casting stat is pinned SEPARATELY so 8 + PB + mod equals the table's
  // save DC exactly — one DC per block, never a spell DC drifting one point
  // off the engine's (live: spell save DC 22 against DC 21 everywhere else).
  // The model's highest mental stat keeps the ROLE; the engine sets the value.
  // cast_mod never exceeds requiredMod at any CR in the table, so the striker
  // stays on top and attackStatFor cannot flip downstream.
  if (hasSpellcasting) {
    // The stat the TEMPLATES name ({cast_stat}, engine-picked at build time)
    // is the one that gets pinned — text and math can never disagree.
    const byWord = { Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' };
    const castStat = byWord[skeleton.cast_stat] ?? 'CHA';
    if (castStat !== attacker) {
      out[castStat] = Math.min(30, Math.max(1, (skeleton.cast_mod ?? 0) * 2 + 10));
    }
  } else {
    // Non-casters key the block DC off CON (the printed breath/aura
    // convention), so CON gets the same coherence pin the cast stat gets:
    // 8 + PB + CON mod equals every DC on the sheet (live: four blocks in a
    // row whose DC 21 matched nothing).
    out.CON = Math.min(30, Math.max(1, (skeleton.cast_mod ?? 0) * 2 + 10));
  }

  for (const k of ['STR', 'DEX', 'INT', 'WIS', 'CHA']) {
    if (k !== attacker && (out[k] ?? 10) > out[attacker]) out[k] = out[attacker] - 1;
  }
  return out;
}
