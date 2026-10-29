// THE FALLBACK LIBRARY (owner go 2026-09-13; expanded to the print
// EMANATION, NOT "WITHIN N FEET" (2026-10-22): print's 2024 idiom for an area around the creature is an EMANATION: 25 Emanation clauses in the corpus against ONE bare "within N feet" (Lich/Deathly Teleport).
// Both qualifier positions are print-attested — a choice qualifier BEFORE (Azer Sentinel: "each creature of the azer's choice in a 5-foot Emanation originating from the azer") and a sense qualifier AFTER (Doppelganger: "...originating from the doppelganger that can see the doppelganger").
// The SIZE is unchanged in every case, so this is grammar only and the pricing does not move.
// Measured 2026-10-22.
// SHAPE-SPACE 2026-09-15: "a more comprehensive action library").
// When a concept's wildcard dies in vetting and repair, the engine
// draws a GENERIFIED print shape priced at the block's own numbers.
//
// DESIGN LAWS:
// - ~24 seeds = the full mechanical shape-space of the 329-block
//   corpus. NOT 20-per-archetype: print itself holds only ~25-30
//   distinct action shapes; volume past that is re-skins of the same
//   shapes and monotony baked into the engine (owner concurred
//   2026-09-15 after the pushback).
// - Every seed is vet-legal BY CONSTRUCTION and print-cited. No
//   reactions (the Parry-retirement pin), no negation, no immunity
//   grants, no authored DCs, no 2014 grammar, ONE save per action.
// - Numbers: {dc} stamps the card DC; {burst} re-dices dpr_frac of the
//   block's per-hit; the library never invents a number.
// - SELECTION: the reskin answer carries `fallback_shape` (the model
//   picks the key nearest its concept UP FRONT, in the same call — no
//   added cost); the draw honors it, then keys-tag affinity, then the
//   name-hash rotation. The same block always draws the same seed.
// - NAMES: authored names are PLACEHOLDERS, never the goal — the
//   model's slot rename re-attaches fiction when honest; a generic
//   name that survives to assembly is flagged to the AUDIT for a
//   concept-fitted rename (owner 2026-09-15: "they should be renamed
//   for the creature").

import { saveDamageDiceFor } from '../format-2024/dice.mjs';

export const LIBRARY_SEEDS = [
  // ——— control ———
  {
    key: 'aggro-curse', keys: ['mark', 'taunt', 'oath', 'challenge'],
    section: 'Bonus Actions', archetypes: ['defender', 'brute', 'skirmisher', 'caster'],
    name: 'Binding Mark', // Brinefrost Salt Demand, generified
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 30 feet. *Failure:* Until the start of the creature's next turn, the target has Disadvantage on attack rolls against creatures other than the creature.",
  },
  {
    key: 'obstacle-pull', keys: ['pull', 'yank', 'reel', 'beckon'],
    section: 'Actions', archetypes: ['caster', 'defender', 'lurker'],
    name: 'Beckoning Pull', // Polite Beckon, generified
    text: "*Strength Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target is pulled up to 15 feet straight toward the creature, and its Speed is 0 until the start of the creature's next turn.",
  },
  {
    key: 'lure', duration_default: 'source_start', imposes: 'Charmed', retired: true, // promoted to a shape (shapes.mjs) 2026-09-22
    keys: ['lure', 'beguile', 'song', 'call'],
    section: 'Actions', archetypes: ['lurker', 'caster', 'skirmisher'],
    name: 'Luring Presence', // Dull Compliance + the Bog Lantern's live proof
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 30 feet that can see or hear the creature. *Failure:* The target has the Charmed condition {duration}, and while Charmed this way, it must move toward the creature by the safest available route on its turn.",
  },
  {
    key: 'pacify', duration_default: 'target_end', imposes: 'Incapacitated', keys: ['transfix', 'hold', 'stillness', 'trance'],
    section: 'Actions', archetypes: ['caster', 'lurker'],
    name: 'Transfixing Regard (2/Day)', // Weight of Attention, gated
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target has the Incapacitated condition and its Speed is 0 {duration}.",
  },
  {
    key: 'escalating-dread', duration_default: 'source_end', imposes: 'Frightened', keys: ['dread', 'fear', 'wither', 'doom'],
    section: 'Actions', archetypes: ['lurker', 'caster', 'brute'],
    name: 'Creeping Dread', dpr_frac: 0.5, // the Mummy's Dreadful Glare
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target has the Frightened condition {duration}. If the target was already Frightened by this ability, it also takes {burst} {damage_type} damage.",
  },
  {
    key: 'terror-pulse', duration_default: 'target_end', imposes: 'Frightened', keys: ['terror', 'roar', 'shriek', 'presence'],
    section: 'Actions', archetypes: ['brute', 'lurker', 'defender'],
    name: 'Horrid Display (2/Day)', // the Frightful Presence class
    // PRINT'S PRICE FOR AN EMANATION (2026-10-29): every at-will control
    // Emanation past 10 feet in the 329 buys the target out on a success — Pit
    // Fiend 20 ft, Cloaker 60 ft, Harpy 300 ft, 3 of 3. This row is a 30-foot
    // Emanation and shipped without it twice on the 10-29 forty (Meshrin, Rook
    // Harrowgate), where the renamer had also broadcast it as "Dread Presence".
    text: "*Wisdom Saving Throw:* DC {dc}, each creature of the creature's choice in a 30-foot Emanation originating from the creature that can see or hear it. *Failure:* The target has the Frightened condition {duration}. *Success:* The target is immune to this creature's terror for 24 hours.",
  },
  {
    key: 'snare-bolt', duration_default: 'source_end', imposes: 'Restrained', keys: ['snare', 'web', 'bind', 'tangle'],
    section: 'Actions', archetypes: ['lurker', 'caster', 'skirmisher'],
    name: 'Binding Lash', // the Web-bolt class (Restrained, self-ending)
    text: "*Dexterity Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target has the Restrained condition {duration}.",
  },
  {
    key: 'slow-bolt', keys: ['slow', 'chill', 'mire', 'leaden'],
    section: 'Actions', archetypes: ['caster', 'lurker', 'defender'],
    name: 'Leaden Touch', // the Ray of Frost / Slow-lite class
    text: "*Constitution Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target's Speed is halved and it can't take Reactions until the end of the creature's next turn.",
  },
  {
    key: 'sensory-strike', duration_default: 'source_end', imposes: 'Blinded', keys: ['blind', 'dazzle', 'flash', 'deafen'],
    section: 'Actions', archetypes: ['caster', 'skirmisher', 'lurker'],
    name: 'Dazzling Burst', // the Blindness class, self-ending
    text: "*Constitution Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target has the Blinded condition {duration}.",
  },
  {
    key: 'disarm', keys: ['disarm', 'twist', 'strip'],
    section: 'Actions', archetypes: ['skirmisher', 'defender'],
    name: 'Disarming Twist', // print's disarm idiom
    text: "*Strength Saving Throw:* DC {dc}, one creature within 5 feet that is holding a weapon or another object. *Failure:* The target drops the held object, which lands in its space.",
  },
  // ——— forced movement ———
  {
    key: 'push-prone', imposes: 'Prone', keys: ['shove', 'topple', 'slam', 'bowl'],
    section: 'Actions', archetypes: ['brute', 'defender'],
    name: 'Sundering Shove', // the Topple Foe / push class
    text: '*Strength Saving Throw:* DC {dc}, one creature within 5 feet. *Failure:* The target is pushed up to 15 feet away from the creature and has the Prone condition.',
  },
  {
    key: 'herd', keys: ['herd', 'drive', 'command'],
    section: 'Actions', archetypes: ['defender', 'brute', 'caster'],
    name: 'Driving Bellow (2/Day)', // area forced-move, gated
    text: "*Wisdom Saving Throw:* DC {dc}, each creature of the creature's choice in a 30-foot Emanation originating from the creature. *Failure:* The target immediately moves up to half its Speed in a direction of the creature's choice, using the safest available route.",
  },
  {
    key: 'hook-drag', imposes: 'Grappled', retired: true, // promoted to a shape (shapes.mjs) 2026-09-22
    keys: ['hook', 'chain', 'harpoon', 'drag', 'grapple'],
    section: 'Actions', archetypes: ['brute', 'lurker', 'defender'],
    name: 'Hooked Lash', // the whip-and-drag class
    text: '*Strength Saving Throw:* DC {dc}, one creature within 30 feet. *Failure:* The target is pulled up to 20 feet straight toward the creature and has the Grappled condition (escape DC {dc}).',
  },
  // ——— damage shapes ———
  {
    key: 'thrown-burst', keys: ['hurl', 'bomb', 'burst', 'volley'],
    section: 'Actions', archetypes: ['caster', 'skirmisher', 'brute'],
    name: 'Hurled Burst (Recharge 5-6)', dpr_frac: 1.0, // nova-gated below
    text: '*Dexterity Saving Throw:* DC {dc}, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. *Failure:* {burst} {damage_type} damage. *Success:* Half damage.',
  },
  {
    key: 'drain', keys: ['drain', 'leech', 'feed', 'siphon'],
    section: 'Actions', archetypes: ['lurker', 'caster', 'brute'],
    name: 'Vitality Leech', dpr_frac: 0.6, // print's Life Drain grammar
    text: '*Constitution Saving Throw:* DC {dc}, one creature within 30 feet. *Failure:* {burst} {damage_type} damage, and the creature regains Hit Points equal to half the damage dealt.',
  },
  {
    key: 'delayed-brand', keys: ['brand', 'ember', 'fuse', 'venom'],
    section: 'Actions', archetypes: ['caster', 'lurker', 'skirmisher'],
    name: 'Lingering Brand', dpr_frac: 0.25, // print's tick is SMALL: Fire Form 1d10 beside a 10-point hit (CR 5) — 0.6 of the round minted 6d6 a turn, uncapped (critic, new lines 2026-09-28) // the delayed-tick class
    text: "*Constitution Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target is branded: it takes {burst} {damage_type} damage at the start of each of its turns until it uses its action to {douse}.",  // dilemma rows are DoT-until-action (Fire Elemental grammar, critic 2026-09-22): a single tick never binds
  },
  {
    key: 'curse-debt', keys: ['curse', 'debt', 'rebuke', 'price'],
    section: 'Actions', archetypes: ['caster', 'defender'],
    name: 'Debt of Ruin', dpr_frac: 0.6, // the inverted-rebuke class
    text: '*Charisma Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target is cursed until the end of the creature\'s next turn. The first time the cursed target deals damage to any creature before then, it takes {burst} {damage_type} damage.',
  },
  {
    key: 'own-turn-punisher', keys: ['punish', 'sting', 'answer', 'reprisal'],
    section: 'Bonus Actions', archetypes: ['defender', 'brute'],
    name: 'Answering Sting', dpr_frac: 0.4, // Gentle Rebuke
    text: 'One creature within 5 feet that hit the creature with an attack roll since the end of the creature\'s last turn takes {burst} {damage_type} damage.',
  },
  // ——— zones & support ———
  {
    key: 'zone', keys: ['fog', 'murk', 'cloud', 'field'],
    section: 'Actions', archetypes: ['caster', 'lurker'],
    name: 'Clinging Murk (2/Day)', // the Fog Cloud / obscuring-zone class
    text: "The creature fills a 15-foot-radius Sphere centered on a point it can see within 60 feet. The area is Lightly Obscured and Difficult Terrain until the start of the creature's next turn.",
  },
  {
    key: 'reveal', keys: ['reveal', 'light', 'outline', 'expose'],
    section: 'Actions', archetypes: ['caster', 'defender'],
    name: 'Unveiling Glow (2/Day)', // the Faerie Fire class
    text: "*Dexterity Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* Until the end of the creature's next turn, the target sheds dim light in a 10-foot radius, it can't benefit from the Invisible condition, and attack rolls against it have Advantage.",
  },
  {
    key: 'self-invisibility', keys: ['invisible', 'invisibility', 'vanish', 'vanishes', 'unseen', 'turn invisible'], // "can turn invisible once per day" (form-ten 2026-10-01); print: the Imp's "casts Invisibility on itself"
    section: 'Bonus Actions', archetypes: ['skirmisher', 'lurker', 'caster', 'defender', 'brute'],
    name: 'Vanish (1/Day)',
    text: 'The creature casts *Invisibility* on itself, requiring no spell components and using Charisma as the spellcasting ability.',
  },
  {
    key: 'rally', keys: ['rally', 'bolster', 'ward', 'blessing'],
    section: 'Bonus Actions', archetypes: ['defender', 'caster', 'brute'],
    // RENAMED 2026-10-27: 188 shipped rows, 81 (43%) on a body that cannot have
    // a class and 76 of those Constructs — golems giving a Bolstering Cry. The
    // mechanic needs no class, only the "Cry" did: a construct has a presence.
    name: 'Bolstering Presence (2/Day)', dpr_frac: 0.5, // the commander THP class
    text: 'Each ally within 30 feet of the creature gains {burst} Temporary Hit Points.',
  },
  {
    key: 'focus', keys: ['focus', 'aim', 'stalk', 'poise'],
    section: 'Bonus Actions', archetypes: ['skirmisher', 'brute', 'lurker'],
    name: 'Predatory Focus (2/Day)', // the aim class — gated (blind read 2026-09-21: at-will self-Advantage is unpriced)
    text: 'The creature has Advantage on the next attack roll it makes before the end of its turn.',
  },
  {
    key: 'feint-slip', keys: ['feint', 'slip', 'blur', 'weave'],
    section: 'Bonus Actions', archetypes: ['skirmisher', 'lurker'],
    name: 'Feinting Step', // the Disengage-plus class
    text: 'The creature takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.',
  },
  {
    key: 'unnerve', keys: ['unnerve', 'croon', 'whisper', 'hex'], retired: true, // the deleted placeholder's payload came back through the library (blind read 2026-09-21, the bishop's "Dissonant Hymn")
    section: 'Bonus Actions', archetypes: ['lurker', 'caster', 'defender', 'brute', 'skirmisher'],
    name: 'Unnerving Croon', // the old fallback's payload, on the RIGHT economy
    // (a bonus-action debuff never competes with Multiattack — the
    // Toll Demand precedent; the dominated-Action form is the one that
    // was deleted)
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on the next attack roll it makes before the start of the creature's next turn.",
  },
];

// ——— the 2026-09-15 completion pass (owner: "make A the workhorse") ———
LIBRARY_SEEDS.push(
  {
    key: 'summon-lite', keys: ['summon', 'call', 'servitor', 'raise'], retired: true, // NO GROUP TEMPLATES (owner ruling 2026-09-28): print puts companions in their own blocks (one Animate Trees in 329); a concept's pack is fiction on the rows
    section: 'Actions', archetypes: ['caster', 'defender', 'lurker'], minCr: 3,
    name: 'Servitor Call (1/Day)', // the Debtor's Claim print idiom
    text: "The creature calls a servitor formed of its own substance in an unoccupied space within 30 feet. The servitor uses the *Skeleton* statistics, acts on the creature's initiative immediately after it, and obeys its silent commands. It crumbles after 1 minute, when reduced to 0 Hit Points, or when the creature dies.",
  },
  {
    key: 'wind-up', keys: ['gather', 'charge-up', 'telegraph', 'brew'],
    section: 'Actions', archetypes: ['brute', 'caster', 'defender'], nova: true,
    name: 'Gathering Ruin (Recharge 5-6)', dpr_frac: 1.2,
    text: "The creature begins gathering destructive power, {telegraph}. At the end of its next turn, after it has moved, the power erupts. *Dexterity Saving Throw:* DC {dc}, each creature in a 20-foot Emanation originating from the creature at that moment. *Failure:* {burst} {damage_type} damage. *Success:* Half damage.",
  },
  {
    key: 'coating', keys: ['coat', 'venom', 'anoint', 'charge-weapon'],
    section: 'Bonus Actions', archetypes: ['skirmisher', 'lurker', 'brute'],
    name: 'Venomed Edge (2/Day)', dpr_frac: 0.5,
    text: 'The creature charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra {burst} {damage_type} damage.',
  },
  {
    key: 'exploiter', keys: ['exploit', 'opportunist', 'predator', 'finish'],
    section: 'Actions', archetypes: ['lurker', 'skirmisher', 'brute', 'defender'],
    name: "Opportunist's Lash", dpr_frac: 0.8, needsImposed: true,
    // the pure-interlock seed (owner: "conditionals unique to a
    // creature — X BY THE CREATURE"): only drawable when this sheet
    // actually imposes a condition; the slot renders source-bound
    text: '*Strength Saving Throw:* DC {dc}, one creature within 30 feet that is {imposed_bound}. *Failure:* {burst} {damage_type} damage. *Success:* Half damage.',
  },
  {
    key: 'blighted-ground', keys: ['blight', 'scorch', 'corrupt', 'floor'],
    section: 'Actions', archetypes: ['caster', 'lurker'], nova: true,
    name: 'Blighted Ground (2/Day)', dpr_frac: 0.6,
    text: "The creature corrupts a 15-foot-radius area of ground centered on a point within 60 feet. The area is Difficult Terrain until the start of the creature's next turn. *Constitution Saving Throw:* DC {dc}, each creature in the area when it appears. *Failure:* {burst} {damage_type} damage. *Success:* Half damage.",
  },
  {
    key: 'phase-slip', keys: ['slip', 'phase', 'blink', 'vanish'],
    section: 'Bonus Actions', archetypes: ['lurker', 'skirmisher', 'caster'],
    requiresMechanic: 'teleport', // teleports are concept-gated tech —
    // the library never leaks a mechanic the concept didn't claim
    name: 'Phase Slip (2/Day)',
    text: 'The creature teleports up to 30 feet to an unoccupied space it can see.',
  },
);

// print binds conditions to their source (owner 2026-09-15: "Creatures
// who are X by the creature"): fear/charm bind with OF, physical holds
// bind with BY, the rest stay plain
const SOURCE_BOUND = {
  Frightened: 'Frightened of the creature', Charmed: 'Charmed by the creature',
  Grappled: 'Grappled by the creature', Restrained: 'Restrained by the creature',
};
const boundForm = (c) => SOURCE_BOUND[c] ?? `${c}`;

export const LIBRARY_KEYS = LIBRARY_SEEDS.map((s) => s.key);

// deterministic, block-varied: the same block always draws the same
// seed; different blocks rotate through their eligible shelf
export const nameHash = (s) => [...String(s)].reduce((h, c) => ((h * 31) + c.charCodeAt(0)) >>> 0, 7);

export function drawLibraryRow(scaled, { archetype = null, energy = null, mix = null, name = '', shapeKey = null, imposed = [], mechanics = null, cr = null, meleeName = null, rangedName = null } = {}) {
  let spentDamageType = null; // the type this seed's frame actually spent, or null
  const hasNova = Object.values(scaled.sections ?? {}).flat()
    .some((e) => (/^Recharge/.test(e.gate ?? '') || /\(Recharge [\d–-]+\)/.test(e.name ?? '')) && /\d+ \(\d+d\d+/.test(e.text ?? ''));
  const chassisTeleports = Object.values(scaled.sections ?? {}).flat().some((e) => /teleports? up to/.test(e.text ?? ''));
  const legal = (seed) => !((seed.nova || seed.key === 'thrown-burst') && hasNova)
    && !(seed.needsImposed && !imposed.length)
    && !(seed.requiresMechanic && !(Array.isArray(mechanics) && mechanics.includes(seed.requiresMechanic)))
    // the chassis already delivering the mechanic beats the claim (the
    // Gutterwretch drew a second teleport beside Flickerstep, 2026-09-15)
    && !(seed.key === 'phase-slip' && chassisTeleports)
    // DOMINANCE (critic 2026-09-15, the Ledgerhorn's Overbalance: a
    // 0-damage prone action on a sheet whose Gore and Steam Vent both
    // prone already): a pure-control seed never draws into a sheet
    // that already imposes its payload condition
    && !(seed.key === 'push-prone' && imposed.includes('Prone'))
    && !(seed.minCr && (cr ?? scaled.cr ?? 99) < seed.minCr);
  const shelf = LIBRARY_SEEDS.filter((seed) => (!archetype || seed.archetypes.includes(archetype)) && legal(seed));
  if (!shelf.length) return null;
  // the model's up-front pick wins (exact key, then tag affinity),
  // shelf-restricted so archetype fit holds; the hash rotation is the
  // tiebreak, never the first choice when a key was given
  const wanted = String(shapeKey ?? '').trim().toLowerCase();
  const seed = (wanted
    ? (shelf.find((x) => x.key === wanted)
      ?? shelf.find((x) => x.keys.includes(wanted))
      ?? LIBRARY_SEEDS.find((x) => legal(x) && (x.key === wanted || x.keys.includes(wanted)))) // off-shelf exact ask still honored
    : null)
    ?? shelf[nameHash(name) % shelf.length];
  let text = seed.text.split('{dc}').join(String(scaled.dc));
  // the interlock slots: a condition THIS sheet imposes, source-bound
  if (text.includes('{imposed_bound}') || text.includes('{imposed_condition}')) {
    const pick = imposed[0] ?? 'Prone';
    text = text.split('{imposed_bound}').join(boundForm(pick)).split('{imposed_condition}').join(pick);
  }
  if (seed.dpr_frac) {
    const { avg, dice } = saveDamageDiceFor(Math.max(3, Math.round((scaled.per_hit ?? 6) * seed.dpr_frac)));
    text = text.split('{burst}').join(`${avg} (${dice})`);
    // A SEED'S OWN FICTION BEATS THE SLOT'S DEFAULT (critic, 2026-10-14:
    // Bloodcurdling Howl and Creeping Dread both dealt Piercing — the seed path
    // defaults an action to Piercing and a bonus action to Bludgeoning, which is
    // a weapon's type on a thing that is not a weapon). A dread or a wail hurts
    // the mind; a drain is Necrotic; a spew or a venom is Poison.
    const BY_FICTION = { 'escalating-dread': 'Psychic', 'terror-pulse': 'Psychic', 'sensory-strike': 'Psychic', drain: 'Necrotic', 'curse-debt': 'Necrotic', 'delayed-brand': 'Necrotic', 'blighted-ground': 'Poison' };
    const dtype = mix === 'physical' || !energy
      ? (BY_FICTION[seed.key] ?? (seed.section === 'Bonus Actions' ? 'Bludgeoning' : 'Piercing'))
      : energy;
    // the frame only declares a type when it actually spends one: a Frightened
    // seed with no damage token must not carry a misleading default
    if (text.includes('{damage_type}')) spentDamageType = dtype;
    text = text.split('{damage_type}').join(dtype);
  }
  // THE ROW CARRIES ITS SEED (critic's hold 5, 2026-10-16). A drawn row said only
  // `library: true`, so nothing downstream could tell WHICH shape it was: the
  // draw had no way to skip a seed the sheet already carried, and Meridane
  // shipped two bonus actions that both charge its next strike. The id is also
  // the row's provenance, which the review doc wants anyway (hold 3).
  // the card's own `imposes` rides onto the row: A2 reads a field, never prose
  // THE SEED DECLARES THE DAMAGE IT DEALS, like a template does (owner,
  // 2026-10-27). `dtype` above is this function's own answer; a later reader
  // scraping it back out of the sentence is the regex the owner retired.
  // Stamped only when the seed's frame actually spends it — a Frightened seed
  // with no damage token declares nothing rather than a misleading default.
  return { seed: seed.key, section: seed.section, row: { name: seed.name, text, library: true, seed: seed.key, ...(spentDamageType ? { damageType: spentDamageType } : {}), ...(seed.imposes ? { imposes: seed.imposes } : {}) } };
}
