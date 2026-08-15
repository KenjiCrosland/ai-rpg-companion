/**
 * Skeleton-path orchestration: the entry point a live generation calls.
 *
 * One LLM call for flavor, against a block whose numbers already exist. The
 * old chassis path's later stages are reused unchanged — assembly, lint,
 * deterministic corrections — because they operate on the assembled monster
 * and do not care how the entries were produced.
 *
 * What is deliberately NOT reused: the entry-rewrite fix ladder. That ladder
 * asks the model to rewrite an entry's TEXT, which is exactly the door this
 * architecture closes. When a reject survives corrections here, the answer is
 * to swap the offending entry for another option or drop it, never to let a
 * model edit mechanics.
 */
import { buildSkeleton, crNumber } from './build-skeleton.mjs';
import { reconcileConcept } from './reconcile.mjs';
import {
  buildFlavorPrompt, validateFlavorResponse, applyFlavor,
  chassisFromSkeleton, planFromSkeleton, swapEntries, pickHouse, resolveIdentity,
} from './flavor-prompt.mjs';
import {
  auditEligible, buildAuditPrompt, validateAuditResponse, verifyAuditFindings, auditTypeCorrection,
} from '../format-2024/audit.mjs';
import { assembleMonster, defenseBudgetFor, applyRenameMapping, namesCollide } from '../format-2024/generate.mjs';
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections } from '../format-2024/generate.mjs';
import challengeRatings from '@/data/challengeRatings.json';
import { logger } from '@/util/logger.mjs';

/** How many alternatives to offer per slot so the concept can steer selection. */
const ALTERNATIVES = 3;

/**
 * Dev-only trace of the whole build, so the flow can be watched in the browser
 * console. logger.log is a no-op in production, so this costs nothing there.
 */
const trace = (label, detail) => logger.log(`[skeleton] ${label}`, detail ?? '');


export async function generateFromSkeleton(options, callLLM) {
  const {
    concept, description = '', cr, archetypeName = null, resolvedType = null,
    lore = null, identity = null, seed = null, onProgress = null, degraded = false,
    caster = false, strikeStat = null, themes = null, mind = null,
    conceptSize = null, movement = null, attackMode = null, signatureMechanic = null,
    takenNames = [], typeSource = 'auto', archetypeSource = 'auto', namePass = null,
    house = null, recent = null, energy = null, damageMix = null,
  } = options;

  const progress = (phase, data) => {
    if (!onProgress) return;
    try { onProgress({ phase, ...data }); } catch { /* display-only */ }
  };

  const crNum = crNumber(cr);
  // A random seed per generation; an explicit one makes a block reproducible
  // from a bug report.
  const useSeed = seed ?? Math.floor(Math.random() * 2 ** 31);
  // The concept-output repair layer, gathered (audit finding #4): every
  // claim the concept call made is settled in reconcileConcept before
  // anything is built. Its trace lines replay here in original order.
  const {
    finalType, blockArchetype, blockThemes, blockMind, blockSize,
    blockMovement, blockAttackMode, blockSignature, blockMix, blockEnergy,
    traces: reconcileTraces,
  } = reconcileConcept({
    crNum, caster, concept, identity, lore, resolvedType, typeSource,
    archetypeName, archetypeSource, themes, mind, conceptSize, movement,
    attackMode, signatureMechanic, damageMix, energy,
  });
  for (const [label, detail] of reconcileTraces) trace(label, detail);

  const skeleton = buildSkeleton({
    cr: crNum, seed: useSeed, alternatives: ALTERNATIVES, archetype: blockArchetype,
    caster, strikeStat, themes: blockThemes, mind: blockMind,
    size: blockSize, attackMode: blockAttackMode, movement: blockMovement,
    signatureMechanic: blockSignature,
    // Dragons get the whole-kit treatment; everything else may get a mined
    // synergy package as its spine (owner call, 2026-08-02). The trigger is
    // the resolved TYPE or a draconic THEME — a live block was typed Dragon
    // by the flavor call after a kit-less build, because the synthesis
    // never said Dragon and nothing else could.
    recent,
    damageMix: blockMix,
    family: /dragon/i.test(finalType) ? 'dragon' : null,
    typeHint: finalType,
  });
  trace('type:', `${finalType}${resolvedType ? ' (concept call)' : ' (derived)'}`
    + `${skeleton.package?.name?.endsWith('Dragon kit') ? ' -> dragon kit' : ''}`);

  trace(`CR ${skeleton.cr} ${skeleton.size} — seed ${useSeed}${blockArchetype ? `, archetype ${blockArchetype}` : ''}`);
  trace('numbers:', `AC ${skeleton.ac}  HP ${skeleton.hp} (${skeleton.hp_formula})  atk +${skeleton.attack_bonus}  DC ${skeleton.save_dc}  PB +${skeleton.pb}  multiattack ${skeleton.multiattack}`);
  trace('slot counts:', skeleton.counts);
  if (skeleton.package) trace('spine:', skeleton.package.name);
  trace('roles:', Object.entries(skeleton.roles ?? {}).map(([k, v]) => `${k}${v ? '✓' : '—'}`).join(' '));
  trace('picked:', [
    ...skeleton.traits.map((t) => `  [Trait] ${t.name}  <- ${t.derived_from}`),
    ...skeleton.entries.map((e) => `  [${e.section}] ${e.name}`
      + `${e.options && e.options.length > 1 ? ` (${e.options.length} options: ${e.options.map((o) => o.key).join(', ')})` : ''}`
      + `${e.signature ? ' [SIGNATURE]' : ''}  <- ${e.derived_from}`),
  ].join('\n'));

  // The engine's numbers exist before any call, so the card can show real AC
  // and HP immediately instead of a spinner.
  progress('chassis', {
    chassis: {
      ac: skeleton.ac,
      hp: skeleton.hp,
      cr_str: skeleton.cr,
      pb: skeleton.pb,
      // The loading card renders "CR X (XP N; PB +Y)" from this payload and
      // calls xp.toLocaleString — omitting it crashed the render (live:
      // unhandled TypeError in Statblock2024Skeleton during generation).
      xp: challengeRatings[skeleton.cr]?.XP ?? 0,
    },
  });

  progress('status', { stage: 'writing' });
  if (blockThemes) trace('themes:', blockThemes.join(', '));
  trace('mind:', blockMind, mind ? '(concept call)' : '(default)');
  // The damage axis was threaded but never traced, so a block whose energy
  // never reached its payload could only be diagnosed by inference.
  trace('damage:', `${blockMix ?? 'both (unrolled)'}${blockEnergy ? `, energy ${blockEnergy}` : ''}`);
  if (blockSize || blockMovement || blockAttackMode || blockSignature) {
    trace('assembly metadata:', [
      blockSize && `size ${blockSize}`,
      blockMovement && `movement ${blockMovement.join('/') || 'walk only'}`,
      blockAttackMode && `attacks ${blockAttackMode}`,
      blockSignature && `signature ${blockSignature}`,
    ].filter(Boolean).join(', '));
  }
  // The full concept in the trace: every hollowness investigation so far
  // has needed the synthesis text, and it lived only in the network tab.
  if (concept) trace('concept:', String(concept).slice(0, 600));
  if (lore) trace('lore:', lore);
  // One MATERIAL for the block, scored from the concept prose (owner call,
  // 2026-08-05). Attached to the skeleton so the palette, the fills and
  // the naming all read the same declaration.
  skeleton.energy = blockEnergy;
  skeleton.damage_mix = blockMix;
  skeleton.identity = resolveIdentity(skeleton, {
    concept: [concept, identity, lore].filter(Boolean).join(' '),
    themes: blockThemes,
    type: finalType,
    house,
    damageMix: blockMix,
    seed: useSeed,
  });
  skeleton.houses = skeleton.identity.houses;
  if (skeleton.houses.length) trace('material house:', skeleton.houses.join(' + '));
  {
    const mf = skeleton.identity.manifest;
    trace('capability manifest:', [
      mf.movement.length ? mf.movement.join('/') : 'walk only',
      mf.grapples && 'grapples', mf.restrains && 'restrains', mf.swallows && 'swallows',
      mf.casts && 'casts', ...mf.produces,
    ].filter(Boolean).join(', '));
  }

  const prompt = buildFlavorPrompt(skeleton, {
    concept,
    takenNames,
    themes: blockThemes,
    // The resolve call already produced an identity and a lore line. Feeding
    // them here grounds {substance} and the naming far better than the raw
    // concept alone, and costs nothing: the call has already happened.
    description: [description, identity, lore].filter(Boolean).join('\n'),
  });

  trace('flavor prompt:', `${prompt.length} chars`);
  let flavor = null;
  try {
    const raw = await callLLM(prompt, validateFlavorResponse);
    flavor = raw ? JSON.parse(raw) : null;
    // the engine's type is authoritative; the vetting and kindred logic
    // inside applyFlavor read it from the response object
    if (flavor) flavor.type = finalType;
  } catch (e) {
    logger.warn('[skeleton] flavor call failed, shipping unflavored:', e?.message ?? e);
  }
  if (flavor) {
    // The trace shows the EFFECTIVE palette, not the model's raw answer. On
    // a physical-mix block the model's energy pick is discarded by design,
    // and printing it made every correct physical block read exactly like
    // the stamping bug in the logs ("flavor came back: Bludgeoning/Radiant,
    // ships all-Bludgeoning" — a false reopening, investigated twice).
    trace('flavor came back:', `"${flavor.name}" — ${flavor.type ?? '?'}, ${flavor.physical_damage ?? '?'}/${
      blockMix === 'physical' ? 'no energy (physical mix)' : (blockEnergy ?? flavor.energy_damage ?? '?')} damage`);
    if (takenNames.some((n) => namesCollide(n, flavor.name))) {
      logger.warn('[skeleton] name collides with the saved roster:', flavor.name);
    }
    const picks = (flavor.entries ?? []).filter((e) => e && e.choose);
    if (picks.length) trace('model chose:', picks.map((e) => `${e.id} -> ${e.choose}`).join(', '));
    const named = (flavor.entries ?? []).filter((e) => e && e.name);
    if (named.length) trace('named:', named.map((e) => `${e.id} "${e.name}"`).join(', '));
  } else {
    trace('no flavor — shipping the skeleton with placeholder text');
  }

  // Never-fail: a dead flavor call still yields a mechanically correct block.
  // The placeholder name is a CONSTANT, never the concept: concepts grew
  // from short user phrases into synthesized paragraphs (identity + essence
  // + naming rules), and `name: concept` shipped that entire paragraph as a
  // Title-Cased monster title and every {creature} reference (live, the
  // prompt-leak block).
  const model = applyFlavor(skeleton, flavor ?? {
    name: 'Unnamed Creature',
    size: skeleton.size,
    type: finalType,
    alignment: 'Neutral',
    speed: '30 ft.',
    stats: { STR: 12, DEX: 12, CON: 12, INT: 10, WIS: 10, CHA: 10 },
    entries: [],
  });
  model.type = finalType;

  const chassis = chassisFromSkeleton(skeleton);
  const plan = planFromSkeleton(skeleton);
  // The weighted defense budget was chassis-path only, leaving the model's
  // resistance/immunity list unbudgeted here (owner catch, live block 4).
  const defenseCaps = defenseBudgetFor(crNum, blockArchetype);
  let monster = assembleMonster(model, {
    cr: crNum, chassis, plan, archetypeName: blockArchetype, archetypeSource, resolvedType: finalType,
  });

  // 2014 phrasing on a 2024 sheet: zero printed 2024 defense lines carry
  // the "nonmagical" qualifier (2014 blocks legitimately do — this strip
  // lives on the 2024-only path for exactly that reason).
  for (const f of ['resistances', 'immunities', 'vulnerabilities']) {
    if (typeof monster[f] === 'string') {
      monster[f] = monster[f]
        .replace(/\s*from nonmagical attacks(?: that aren't [\w-]+)?/gi, '')
        // 2024 capitalizes damage types and conditions in defense lines;
        // lowercase reads as generated (live: "cold" beside prior blocks'
        // "Cold"). 2014 keeps its own lowercase convention via toLegacyModel.
        .replace(/\b(acid|bludgeoning|cold|fire|force|lightning|necrotic|piercing|poison|psychic|radiant|slashing|thunder|blinded|charmed|deafened|exhaustion|frightened|grappled|incapacitated|invisible|paralyzed|petrified|poisoned|prone|restrained|stunned|unconscious)\b/g,
          (w) => w[0].toUpperCase() + w.slice(1));
    }
  }

  // ALIGNMENT follows the TYPE (measured 2026-08-06): Beast 89/89 and
  // Ooze 4/4 are Unaligned; Construct is 8 Unaligned + 2 Neutral with no
  // moral axis at all; Monstrosity is Good exactly 1 time in 37; Fiend
  // and Undead are Good zero times. Ours shipped Lawful Good on an
  // Int-6 mute abyssal predator, twice in three blocks (the Graspwarden
  // and the Hadal Warden). A floor on the MORAL axis only — the
  // lawful/chaotic axis and the model's own pick survive wherever print
  // allows one.
  {
    const ALIGNMENT_BY_TYPE = {
      Beast: 'Unaligned', Ooze: 'Unaligned', Construct: 'Unaligned',
      Plant: 'Unaligned', Monstrosity: 'Unaligned',
    };
    const forced = ALIGNMENT_BY_TYPE[monster.type];
    const NO_GOOD = ['Fiend', 'Undead'];
    if (forced && !/unaligned|neutral/i.test(String(monster.alignment ?? ''))) {
      trace('alignment floored for type:', `${monster.type}: ${monster.alignment} -> ${forced}`);
      monster.alignment = forced;
    } else if (NO_GOOD.includes(monster.type) && /Good/i.test(String(monster.alignment ?? ''))) {
      const swapped = String(monster.alignment).replace(/Good/i, 'Evil');
      trace('alignment floored for type:', `${monster.type}: ${monster.alignment} -> ${swapped}`);
      monster.alignment = swapped;
    }
  }

  // Type-derived immunity floor (live: a Construct shipped without Poisoned
  // or Charmed). Measured across the 329-block corpus at >=80% per type:
  // Construct 8-9/10, Undead 17/19, Ooze 4/4. Elemental and Fiend sit near
  // two thirds and stay the model's call — this is a floor, not a list; the
  // flavor call's own picks are kept and merged.
  {
    const FLOOR = {
      Construct: { damage: ['Poison'], conditions: ['Charmed', 'Exhaustion', 'Frightened', 'Paralyzed', 'Petrified', 'Poisoned'] },
      Undead: { damage: ['Poison'], conditions: ['Exhaustion', 'Poisoned'] },
      Ooze: { damage: [], conditions: ['Charmed', 'Deafened', 'Exhaustion', 'Frightened', 'Prone'] },
    }[monster.type];
    if (FLOOR) {
      const DMG = ['Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder'];
      const damage = new Set(FLOOR.damage); const conds = new Set(FLOOR.conditions); const other = [];
      for (const tok of String(monster.immunities ?? '').split(/[;,]/).map((x) => x.trim()).filter(Boolean)) {
        if (DMG.includes(tok)) damage.add(tok);
        else if (/^[A-Z]/.test(tok)) conds.add(tok);
        else other.push(tok);
      }
      const d = [...damage].sort(); const c = [...conds].sort();
      monster.immunities = [...d, ...other].join(', ') + (c.length ? `${d.length + other.length ? '; ' : ''}${c.join(', ')}` : '');
      trace('immunities stamped for type:', monster.type, '->', monster.immunities);
    }
  }

  // Swarm identity is carried by the NAME in print — 7 of 7 are "Swarm of
  // X", the type line stays plain (Beast, Undead). The prompt asks for the
  // printed form; when the model (or the never-fail path) doesn't comply,
  // the deterministic suffix form keeps the identity without a plural
  // guess, and applyRenameMapping repoints every self-reference. Without
  // this the swarm-content-untyped reject fires on the engine's own kit.
  if (blockArchetype === 'swarm' && !/swarm/i.test(`${monster.name ?? ''} ${monster.type ?? ''}`)) {
    const swarmName = `${monster.name} Swarm`;
    trace('swarm name guaranteed:', `"${monster.name}" -> "${swarmName}"`);
    monster = applyRenameMapping(monster, { [monster.name]: swarmName });
  }

  // The swarm defense package, 7 of 7 printed swarms: resistance to
  // Bludgeoning/Piercing/Slashing (weapons hit SOME of the mass) and the
  // eight can't-happen-to-a-crowd condition immunities. Stamped like the
  // type floors — a floor merged with the model's picks, never a ceiling.
  if (blockArchetype === 'swarm') {
    const res = new Set(['Bludgeoning', 'Piercing', 'Slashing']);
    for (const tok of String(monster.resistances ?? '').split(/[;,]/).map((x) => x.trim()).filter(Boolean)) res.add(tok);
    monster.resistances = [...res].sort().join(', ');
    const DMG = ['Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder'];
    const damage = new Set(); const conds = new Set(['Charmed', 'Frightened', 'Grappled', 'Paralyzed', 'Petrified', 'Prone', 'Restrained', 'Stunned']);
    for (const tok of String(monster.immunities ?? '').split(/[;,]/).map((x) => x.trim()).filter(Boolean)) {
      if (DMG.includes(tok)) damage.add(tok); else conds.add(tok);
    }
    const d = [...damage].sort(); const c = [...conds].sort();
    monster.immunities = d.join(', ') + (c.length ? `${d.length ? '; ' : ''}${c.join(', ')}` : '');
    trace('swarm defense package stamped:', `resist ${monster.resistances} | immune ${monster.immunities}`);
  }

  // A NAME THE USER TYPED IS THE CREATURE'S NAME. The chassis path has
  // honored this since the beginning; the skeleton path — the default
  // path — never received namePass at all, so a typed name was silently
  // replaced by whatever the flavor call invented (live: "Chimeric
  // Sentinel" shipped as "Scouring Silt"). Stamped through
  // applyRenameMapping so every self-reference follows.
  {
    const typed = String(namePass?.userTypedName ?? '').trim();
    if (typed && monster.name && monster.name.toLowerCase() !== typed.toLowerCase()) {
      trace('user name honored:', `"${monster.name}" -> "${typed}"`);
      monster = applyRenameMapping(monster, { [monster.name]: typed });
    }
  }

  // Deterministic corrections only. Anything still rejecting is a defect in
  // the engine, not something to hand back to the model.
  monster = applyCorrections(
    monster,
    lintStatblock(monster, { chassis, plan, edition: '2024', defenseCaps }).findings,
    { chassis },
  );
  // A bad entry NAME has a deterministic fix on this path: revert to the
  // skeleton's placeholder, which pick-time guards made unique and legal,
  // and let applyRenameMapping repoint the references. Covers coinage
  // ("Tar-Ice Vortex"), self-naming and monster-naming (a legendary action
  // literally named "Grave Vow" — shipped live on an audit-flake day, when
  // the audit that would have swapped it never ran).
  {
    const NAME_REVERT_RULES = ['entry-name-self', 'entry-named-after-monster', 'entry-name-mode-mismatch'];
    const coinage = lintStatblock(monster, { chassis, plan, edition: '2024', defenseCaps })
      .findings.filter((f) => NAME_REVERT_RULES.includes(f.rule) && f.loc?.entry);
    for (const f of coinage) {
      const bad = f.loc.entry;
      const placeholder = model.name_origins?.[bad];
      if (placeholder) {
        trace('coined name reverted:', `"${bad}" -> "${placeholder}"`);
        monster = applyRenameMapping(monster, { [bad]: placeholder });
      }
    }
  }

  const all = lintStatblock(monster, { chassis, plan, edition: '2024', defenseCaps }).findings;
  const rejects = all.filter((f) => f.severity === 'reject');
  trace('lint:', `${all.length} findings, ${rejects.length} rejects`
    + `${all.length ? ` — ${[...new Set(all.map((f) => f.rule))].join(', ')}` : ''}`);
  if (rejects.length) {
    logger.warn('[skeleton] shipped with rejects:', rejects.map((r) => `${r.rule}: ${r.message}`));
  }

  // ---- judgment layer ------------------------------------------------
  // Kept (owner call). It reads the finished block for problems no rule can
  // describe: a cloud of spores nothing creates, a type the content never
  // expresses. Its findings become entry SWAPS, not text rewrites.
  //
  // The naming micro-call is deliberately NOT run: the flavor call already
  // named the creature and every entry with the full concept in hand, so a
  // second opinion would be worse informed, not better.
  let auditNotes = [];
  // THE DRAFT SHOWS BEFORE THE AUDIT (owner ask, 2026-07-30 — "card
  // visible during the long pole"). The chassis honored this; the skeleton
  // path never inherited it, so the live 2024 path held the assembled card
  // through the audit all sprint. Surfaced when the progress suite was
  // retargeted off the retired chassis (2026-08-14). The audit's fixes
  // still land: the final monster replaces the draft on resolve.
  progress('draft', { monster });

  if (degraded && auditEligible(monster, crNum)) {
    // The silent case was indistinguishable from "attempted and failed" in
    // the trace — say so explicitly.
    trace('audit: skipped (degraded mode — provider unhealthy)');
  }
  if (!degraded && auditEligible(monster, crNum)) {
    try {
      progress('status', { stage: 'audit' });
      const raw = await callLLM(buildAuditPrompt(monster, '2024'), validateAuditResponse);
      const findings = verifyAuditFindings(monster, raw);
      trace('audit:', findings.length ? findings.map((f) => `${f.loc?.entry ?? '-'}: ${f.message}`) : 'nothing flagged');

      // A type correction is a field change, so it applies directly. Guarded
      // the same way the chassis path guards it: never over a user-picked
      // type, never on a swarm form.
      // The guard used to read !resolvedType — written to protect a
      // USER-picked type, but resolvedType is the CONCEPT CALL's type,
      // which is set on essentially every generation now. So the audit's
      // type correction quietly became dead code the moment the concept
      // call got reliable at typing (live: a Lawful Good "Humanoid" with
      // chitinous rends and eight spider limbs, unflagged). A user's
      // choice is still sacred; a model's guess is correctable.
      const retype = auditTypeCorrection(raw, monster.type);
      if (retype && typeSource !== 'user' && !/swarm/i.test(monster.type ?? '')) {
        trace('audit retype:', `${monster.type} -> ${retype}`);
        monster.type = retype;
      }

      // Rewrites first: span-anchored prose repairs, applied in place
      // (verifyAuditFindings only carries a rewrite when the span is
      // present raw and the numbers match — the audit as copy-editor,
      // owner call 2026-08-04). A rewritten finding never also swaps.
      const rewrites = findings.filter((f) => f.rewrite && f.span);
      for (const f of rewrites) {
        const entry = (monster.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
        if (entry && entry.text.includes(f.span)) {
          entry.text = entry.text.split(f.span).join(f.rewrite);
          trace('audit rewrite:', `${f.loc.entry}: "${f.span.slice(0, 60)}" -> "${f.rewrite.slice(0, 60)}"`);
        }
      }

      // Renames next: a name-payload defect is fixed by renaming, not by
      // swapping the mechanic the concept chose (owner call 2026-08-05 —
      // the actuator the retired coinage detector left missing).
      // applyRenameMapping repoints every reference.
      for (const f of findings.filter((x) => x.rename)) {
        const bare = f.loc.entry.replace(/\s*\(.*\)$/, '');
        const gate = (f.loc.entry.match(/\s*\(.*\)$/) ?? [''])[0];
        trace('audit rename:', `"${f.loc.entry}" -> "${f.rename}${gate}"`);
        monster = applyRenameMapping(monster, { [f.loc.entry]: `${f.rename}${gate}` });
        if (bare !== f.loc.entry) monster = applyRenameMapping(monster, { [bare]: f.rename });
      }

      // Everything else names an entry. Swap those entries for another
      // pre-scaled option and rebuild; the numbers cannot move.
      const flagged = findings.filter((f) => !f.rewrite && !f.rename).map((f) => f?.loc?.entry).filter(Boolean);
      const choices = flagged.length ? swapEntries(skeleton, flagged) : new Map();
      if (choices.size) {
        trace('audit swaps:', [...choices.entries()].map(([id, k]) => `${id} -> ${k}`).join(', '));
        const reflavored = applyFlavor(skeleton, {
          ...(flavor ?? {}),
          entries: (flavor?.entries ?? []).map((e) => (choices.has(e.id)
            ? { ...e, choose: choices.get(e.id) } : e)),
        });
        const rebuilt = assembleMonster(reflavored, {
          cr: crNum, chassis, plan, archetypeName: blockArchetype, archetypeSource, resolvedType: finalType,
        });
        const corrected = applyCorrections(
          rebuilt,
          lintStatblock(rebuilt, { chassis, plan, edition: '2024', defenseCaps }).findings,
          { chassis },
        );
        const after = lintStatblock(corrected, { chassis, plan, edition: '2024', defenseCaps })
          .findings.filter((f) => f.severity === 'reject');
        // Only keep the swap if it did not make things worse.
        if (after.length <= rejects.length) {
          monster = corrected;
          if (retype) monster.type = retype;
          trace('swap kept');
        } else {
          trace('swap discarded — it added rejects:', after.map((f) => f.rule).join(', '));
        }
      }
      auditNotes = findings.map((f) => f.message);
    } catch (e) {
      logger.warn('audit skipped:', e?.message ?? e);
    }
  }

  // Print's legendary invariant (measured 2026-08-04): every printed
  // legendary set keeps AT LEAST ONE unlocked option — 7 of 8 two-option
  // sets lock exactly one. With an unlocked spend always available, the
  // sampled uses stand; the cap survives only as the belt for the
  // all-locked shape print never fields (and the picker now prevents).
  {
    const legendaries = monster.sections?.['Legendary Actions'] ?? [];
    const unlocked = legendaries.filter((e) => !/can't take this action again/.test(e.text));
    if (monster.legendary_uses && legendaries.length && !unlocked.length) {
      monster.legendary_uses = Math.min(monster.legendary_uses, legendaries.length);
    }
  }

  monster.generation = {
    path: 'skeleton',
    seed: useSeed,
    archetype: blockArchetype,
    size: skeleton.size,
    // Provenance for every entry, so a strange block can be traced to the
    // creature its mechanics came from.
    package: skeleton.package?.name ?? null,
    derived_from: skeleton.entries.map((e) => `${e.name} <- ${e.derived_from}`),
    // Row identities for the cross-block frequency ledger. The demiplane
    // banish shipped four times under four different names, so the caller
    // records what the rows WERE, not what they were called.
    row_keys: [...skeleton.entries, ...(skeleton.traits ?? [])]
      .map((e) => e.row_key).filter(Boolean),
    rejects: rejects.map((r) => r.rule),
    audit: auditNotes,
  };
  trace('done:', `"${monster.name}" — ${monster.size} ${monster.type}, AC ${monster.ac}, HP ${monster.hp}, `
    + `${Object.values(monster.sections ?? {}).flat().length} entries`);
  progress('draft', { monster });
  return monster;
}
