/**
 * THE CONCEPT RECONCILER (owner-approved refactor, 2026-08-15 — audit
 * finding #4).
 *
 * Everything the concept call returns is a CLAIM, and this is the one
 * place claims are settled against print, the roll, and the prose itself
 * before anything is built. It accreted as separate fixes — theme survival
 * (the Ember Wraith), the archetype->type funnel, the signature veto and
 * its translation, the melee floor and range band, prose-outranks-roll for
 * energy (the Brinewrack), the type-energy contract (no radiant fiends),
 * and now the mind check (the Vanteg) — and lives here as one pure
 * function: options in, resolved axes and trace lines out. No I/O, no
 * randomness, unit-testable without a generation.
 */
/**
 * @param {object} options
 *   concept, description, cr, archetypeName, resolvedType, lore, identity,
 *   seed (optional; omit for a random creature), onProgress
 * @param {(prompt: string, validate: Function) => Promise<string>} callLLM
 */
/**
 * THE PROSE OUTRANKS THE ROLL — energy edition (owner call, 2026-08-11:
 * "how do we fix the fact that we didn't get thunder damage?").
 *
 * The mix and energy are rolled BEFORE the concept call and the model is
 * told to write to them. Usually it does. Sometimes it disobeys: told
 * physical-only, it wrote a warden "warped by the screaming of the
 * sea-gods" that goes "shrieking as it goes" — a sonic creature top to
 * bottom — and the engine then faithfully rendered every payload Piercing
 * (live: the Brinewrack, which even RESISTED the Thunder its own names
 * promised).
 *
 * Same resolution as pickHouse's prose-overrules-themes: a DECLARATION in
 * the prose beats the roll, at the same named-twice standard — one word is
 * an accident, two is what the creature is. The roll still seeds the
 * concept; the concept's actual output is the authority.
 */
const ENERGY_VOCAB = {
  Thunder: ['shriek', 'screech', 'scream', 'wail', 'keen', 'bellow', 'roar', 'sonic', 'thunder', 'boom', 'toll', 'resonan', 'deafen'],
  Fire: ['flame', 'fire', 'burn', 'scorch', 'ember', 'cinder', 'molten', 'furnace', 'blaze'],
  Cold: ['frost', 'freez', 'ice-', 'glacial', 'rime', 'sleet', 'frigid'],
  Lightning: ['lightning', 'voltaic', 'galvanic', 'spark', 'arc-light'],
  Poison: ['venom', 'toxi', 'poison'],
  Acid: ['acid', 'caustic', 'corrosi', 'dissolv'],
  Necrotic: ['necrotic', 'wither', 'entropy', 'decay', 'shadow', 'gloom', 'lightless', 'sunless', 'umbral', 'darkness'],
  Radiant: ['radiant', 'sanctified', 'holy light', 'halo', 'dawn-light'],
  Psychic: ['psychic', 'mind-flay', 'thought-'],
};
function declaredEnergyMentions(text, type) {
  const t = String(text ?? '').toLowerCase();
  return (ENERGY_VOCAB[type] ?? [type.toLowerCase()])
    .some((w) => t.includes(w));
}
function declaredEnergy(text) {
  const t = String(text ?? '').toLowerCase();
  let best = null;
  for (const [type, words] of Object.entries(ENERGY_VOCAB)) {
    const hits = words.reduce((n, w) => n + (t.match(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) ?? []).length, 0);
    if (hits >= 2 && (!best || hits > best.hits)) best = { type, hits };
  }
  return best;
}

export function reconcileConcept({
  crNum, caster = false, concept = null, identity = null, lore = null,
  resolvedType = null, typeSource = 'auto', archetypeName = null,
  archetypeSource = 'auto', themes = null, mind = null, conceptSize = null,
  movement = null, attackMode = null, signatureMechanic = null,
  damageMix = null, energy = null,
}) {
  const traces = [];
  const trace = (label, detail) => traces.push([label, detail]);
  // A type-derived fallback thread when the resolve call gave none (seeded
  // generations), so no block is ever palette-less.
  const TYPE_THREAD = { Undead: 'grave', Fiend: 'fiendish', Celestial: 'celestial', Fey: 'fey',
    Dragon: 'draconic', Elemental: 'elemental', Plant: 'verdant', Construct: 'forged',
    Aberration: 'mind', Ooze: 'amorphous', Beast: 'bestial', Giant: 'armed' };
  // Humanoid and Monstrosity are the two types with NO domain facet of
  // their own — deliberately, they are the "no domain" types. That left
  // them with no fallback thread at all, so they need their own map for
  // the empty case (measured: `armed` tags 125 rows, `bestial` 331).
  const FALLBACK_THREAD = { ...TYPE_THREAD, Humanoid: 'armed', Monstrosity: 'bestial' };
  // Domain themes are type claims (owner call: "tag should limit the
  // creature type"). A domain tag that contradicts the resolved type is
  // dropped — a Celestial cannot carry "grave", and a Beast cannot carry
  // "celestial". Manner tags (grasping, venomous, aerial…) pass freely.
  //
  // But a type with NO domain facet can't be contradicted by one, and
  // dropping on that basis was catastrophic: every domain theme failed the
  // `=== resolvedType` test for a Humanoid, so a Humanoid concept lost
  // forged, armed, grave, bestial — everything — and then found no
  // fallback either. themes went null, `themeWeight` returned 1 for all
  // 1089 rows, and the pool (231 of 327 plain attacks at CR <= 5) handed a
  // CR 20 block a CR 5 Gladiator's Spear (live: the Ember Wraith, seed
  // 28598917, reproduced exactly).
  const DOMAIN_OF = Object.fromEntries(Object.entries(TYPE_THREAD).map(([ty, th]) => [th, ty]));
  const typeClaimsADomain = Boolean(TYPE_THREAD[resolvedType]);
  const agreed = (themes ?? []).filter((th) => !DOMAIN_OF[th]
    || !resolvedType || !typeClaimsADomain || DOMAIN_OF[th] === resolvedType);
  const blockThemes = agreed.length ? agreed.slice(0, 2)
    : (FALLBACK_THREAD[resolvedType] ? [FALLBACK_THREAD[resolvedType]] : null);

  // The TYPE decision is total and happens HERE, before the build (owner
  // call): concept-call type, else the first domain theme's type, else
  // Monstrosity. The flavor call no longer decides type at all — a live
  // block was labeled Dragon after a kit-less build because the synthesis
  // stayed silent and the flavor model had the last word.
  let finalType = resolvedType
    ?? (blockThemes ?? []).map((th) => DOMAIN_OF[th]).find(Boolean)
    ?? 'Monstrosity';

  // STAGE 1 OF THE FUNNEL (owner call, 2026-08-07): the combat archetype
  // limits the type, which limits the material house. Exclusions rather
  // than whitelists, each measured against print so no printed block is
  // contradicted:
  //   artillery   Ooze 0%, Aberration 0%, Beast 1% ranged attacks
  //   skirmisher  Ooze / Plant / Aberration all median walk speed 20
  //   support     Ooze / Plant / Beast have zero printed casters
  // brute, defender, glass_cannon, controller and lurker have no printed
  // basis to restrict, so they restrict nothing.
  let blockArchetype = archetypeName;
  const ARCHETYPE_FORBIDS = {
    artillery: ['Ooze', 'Aberration', 'Beast'],
    skirmisher: ['Ooze', 'Plant', 'Aberration'],
    support: ['Ooze', 'Plant', 'Beast'],
  };
  if ((ARCHETYPE_FORBIDS[blockArchetype] ?? []).includes(finalType)) {
    // Whichever the USER chose is the fixed point; the other yields. When
    // both are the user's, both stand — an explicit pair outranks our
    // table. Monstrosity is the landing type because it is legal for
    // every restricted role, and is already the default fallback above.
    if (archetypeSource === 'user' && typeSource !== 'user') {
      trace('funnel:', `${blockArchetype} forbids ${finalType} -> Monstrosity`);
      finalType = 'Monstrosity';
    } else if (archetypeSource !== 'user') {
      trace('funnel:', `${finalType} cannot be ${blockArchetype} -> balanced`);
      blockArchetype = null;
    }
  }

  // The MIND profile gates cognition abilities (owner call, 2026-08-03, the
  // Rift-Shell Crag: a Cha 26 lie-sensing Fear-caster with Int 2 and no
  // languages). Measured: zero printed mindless casters or lie-sensers.
  // Default is sapient — no exclusion unless the concept SAYS mindless — and
  // an explicit caster request always wins over the profile.
  let blockMind = caster ? 'sapient'
    : (['sapient', 'bestial', 'mindless'].includes(mind) ? mind : 'sapient');
  // THE PROSE OUTRANKS THE FLAG — mind edition (owner call, 2026-08-15).
  // The synthesis states its own claim in numbers ("It is scheming
  // (INT 14-16)", "instinct-driven (INT 2-4)"), and nothing checked the
  // flag against it: a curiosity-driven "cosmic child" seeking games and
  // puzzles shipped mindless with Int 3 (live: the Vanteg). Deterministic
  // on the prose's own INT claim — no vocabulary judgment, the same
  // named-standard as every other reconciliation here.
  {
    const mindProse = [concept, identity, lore].filter(Boolean).join(' ');
    const claim = mindProse.match(/\bINT\s*(\d+)(?:\s*[-\u2013\u2014]\s*(\d+))?/i);
    if (claim && !caster) {
      const lo = Number(claim[1]);
      const hi = Number(claim[2] ?? claim[1]);
      const label = claim[2] ? `${lo}-${hi}` : `${lo}`;
      if (lo >= 8 && blockMind !== 'sapient') {
        trace('mind reconciled:', `${blockMind} -> sapient (prose claims INT ${label})`);
        blockMind = 'sapient';
      } else if (lo >= 5 && blockMind === 'mindless') {
        trace('mind reconciled:', `mindless -> bestial (prose claims INT ${label})`);
        blockMind = 'bestial';
      } else if (hi <= 4 && blockMind === 'sapient') {
        trace('mind reconciled:', `sapient -> bestial (prose claims INT ${label})`);
        blockMind = 'bestial';
      }
    }
  }

  // Assembly metadata, validated: bad values degrade to "no signal" and the
  // legacy sampling behavior — never to a failed generation.
  const SIZES_OK = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
  const blockSize = SIZES_OK.includes(conceptSize) ? conceptSize : null;
  const blockMovement = Array.isArray(movement)
    ? movement.map((m) => String(m).toLowerCase()).filter((m) => ['swim', 'burrow', 'fly', 'climb'].includes(m))
    : null;
  let blockAttackMode = ['melee', 'ranged', 'mixed'].includes(attackMode) ? attackMode : null;
  // THE ROLE GOVERNS RANGE TOO (owner call, 2026-08-06). We already made
  // the signature yield to the archetype; attack_mode never did, so a
  // picked skirmisher whose concept said "melee" got the withdrawal seat
  // and nothing to threaten the gap it made — kite-and-shoot with no
  // shoot (live: the Ironbound, and the Brine Hound owning the other half
  // of one correct skirmisher). Upgrade, never downgrade: melee-only is
  // still legal for every role that wants it.
  if (blockAttackMode === 'melee' && ['skirmisher', 'artillery'].includes(blockArchetype)) {
    trace('attack mode upgraded:', `melee -> mixed (the ${blockArchetype} role needs a range band)`);
    blockAttackMode = 'mixed';
  }
  // ...AND THE MIRROR (owner call, 2026-08-07, the Uulgroth: ranged-only at
  // 60 feet, so a party that closed to 5 feet turned its whole offense off).
  // This is the strongest print rule we have measured: EVERY printed
  // monster from CR 5 up has a melee-capable attack — 113 of 113, zero
  // exceptions — and the only two in the entire corpus are a sessile
  // Shrieker Fungus and a Seahorse. A ranged identity is still honored;
  // `mixed` keeps the range band and adds the reach the corpus insists on.
  if (blockAttackMode === 'ranged' && crNum >= 5) {
    trace('attack mode upgraded:', 'ranged -> mixed (no printed CR 5+ block lacks a melee option)');
    blockAttackMode = 'mixed';
  }
  // 'snare' is the concept-facing name (owner call: the restraining
  // substance could be anything); 'web' stays the internal family key.
  // THE ARCHETYPE IS THE SPINE (owner call, 2026-08-06). The concept call
  // resolves exactly one role — echoing the user's pick or classifying the
  // concept — and once resolved everything serves it. A signature that
  // contradicts it yields, whichever way the role arrived: when the same
  // response returns `skirmisher` AND `engulf`, that is not two readings
  // to respect, it is the model contradicting itself inside one JSON
  // object. (First shipped as a user-pick-only veto; widened same day —
  // the source distinction protected an inconsistency instead of a
  // choice.)
  //
  // The signature outranks everything else in assembly — a guaranteed
  // seat, its prerequisite's seat, and x6 pick weight — so an engulf on a
  // skirmisher buries the role under a grapple-swallow chain while the
  // role's own machinery (speed, exit seat, ranged parity) whispers
  // underneath (live: the Arterial Drifter). Degrades to null, the path
  // bad metadata already takes, so the block builds from the archetype.
  const SIGNATURE_CONFLICTS = {
    skirmisher: ['engulf', 'grapple', 'aura'],
    lurker: ['engulf', 'grapple', 'aura'],
    artillery: ['engulf', 'grapple'],
    support: ['engulf', 'grapple'],
  };
  const SIGNATURES_OK = ['thrown-weapon', 'breath', 'engulf', 'grapple', 'gaze', 'aura', 'teleport', 'summon', 'web', 'snare'];
  let blockSignature = SIGNATURES_OK.includes(signatureMechanic)
    ? (signatureMechanic === 'snare' ? 'web' : signatureMechanic) : null;
  // A VETO IS A TRANSLATION, NOT A DELETION (owner call, 2026-08-07). The
  // veto used to null the signature and stop, so the concept's ONE
  // structured mechanical promise was simply dropped and the slot shipped
  // empty (live: the Ember Wraith asked for an aura, the skirmisher role
  // forbade it, and the block lost the seat without gaining anything —
  // `aura—` in the roles trace). The substitute preserves the INTENT while
  // satisfying the role: an aura and a gaze are both presence-at-range, an
  // engulf and a breath are both area, and a web binds prey without the
  // grapple a hit-and-run role can't afford.
  const SIGNATURE_SUBSTITUTE = { aura: 'gaze', engulf: 'breath', grapple: 'web' };
  if (blockSignature && (SIGNATURE_CONFLICTS[blockArchetype] ?? []).includes(signatureMechanic)) {
    const alt = SIGNATURE_SUBSTITUTE[signatureMechanic];
    const altOk = alt && !(SIGNATURE_CONFLICTS[blockArchetype] ?? []).includes(alt);
    trace('signature vetoed:', `${signatureMechanic} contradicts the ${blockArchetype} role`
      + `${archetypeSource === 'user' ? ' (picked)' : ' (resolved)'}`
      + `${altOk ? ` -> ${alt}` : ' (no substitute)'}`);
    blockSignature = altOk ? alt : null;
  }

  let blockMix = damageMix;
  let blockEnergy = energy;
  // THE TYPE-ENERGY CONTRACT (owner question, 2026-08-11: "does an abyssal
  // creature ever do radiant?"). Print's answer is flat: 0 of 29 Fiends
  // deal Radiant, 0 of 13 Celestials deal Necrotic — the two taxonomy
  // taboos, each the other's mirror. Everything else is attested somewhere
  // (even Undead deal Radiant twice), so the contract bans exactly these
  // and remaps to the type's own register. The energy is rolled before the
  // type exists, so this is where the two can first be reconciled.
  {
    const TYPE_FORBIDS = { Fiend: { Radiant: 'Necrotic' }, Celestial: { Necrotic: 'Radiant' } };
    const swap = TYPE_FORBIDS[finalType]?.[blockEnergy];
    if (swap) {
      trace('damage reconciled:', `${blockEnergy} -> ${swap} (no printed ${finalType} deals ${blockEnergy}: 0 in the corpus)`);
      blockEnergy = swap;
    }
  }
  {
    const prose = [concept, identity, lore].filter(Boolean).join(' ');
    const declared = declaredEnergy(prose);
    if (declared) {
      if (blockMix === 'physical') {
        // told physical, wrote an energy creature — the prose wins
        trace('damage reconciled:', `physical -> both (prose declares ${declared.type} x${declared.hits})`);
        blockMix = 'both';
        blockEnergy = declared.type;
      } else if (blockEnergy && declared.type !== blockEnergy
        && !declaredEnergyMentions(prose, blockEnergy)) {
        // rolled one energy, wrote another, and the rolled one appears
        // NOWHERE — follow what was actually written
        trace('damage reconciled:', `energy ${blockEnergy} -> ${declared.type} (prose declares it x${declared.hits}, ${blockEnergy} unmentioned)`);
        blockEnergy = declared.type;
      }
    }
  }
  return {
    finalType, blockArchetype, blockThemes, blockMind, blockSize,
    blockMovement, blockAttackMode, blockSignature, blockMix, blockEnergy,
    traces,
  };
}
