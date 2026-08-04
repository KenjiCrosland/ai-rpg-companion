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
import {
  buildFlavorPrompt, validateFlavorResponse, applyFlavor,
  chassisFromSkeleton, planFromSkeleton, swapEntries,
} from './flavor-prompt.mjs';
import {
  auditEligible, buildAuditPrompt, validateAuditResponse, verifyAuditFindings, auditTypeCorrection,
} from '../format-2024/audit.mjs';
import { assembleMonster, defenseBudgetFor, applyRenameMapping } from '../format-2024/generate.mjs';
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

/**
 * @param {object} options
 *   concept, description, cr, archetypeName, resolvedType, lore, identity,
 *   seed (optional; omit for a random creature), onProgress
 * @param {(prompt: string, validate: Function) => Promise<string>} callLLM
 */
export async function generateFromSkeleton(options, callLLM) {
  const {
    concept, description = '', cr, archetypeName = null, resolvedType = null,
    lore = null, identity = null, seed = null, onProgress = null, degraded = false,
    caster = false, strikeStat = null, themes = null, mind = null,
  } = options;

  const progress = (phase, data) => {
    if (!onProgress) return;
    try { onProgress({ phase, ...data }); } catch { /* display-only */ }
  };

  const crNum = crNumber(cr);
  // A random seed per generation; an explicit one makes a block reproducible
  // from a bug report.
  const useSeed = seed ?? Math.floor(Math.random() * 2 ** 31);
  // A type-derived fallback thread when the resolve call gave none (seeded
  // generations), so no block is ever palette-less.
  const TYPE_THREAD = { Undead: 'grave', Fiend: 'fiendish', Celestial: 'celestial', Fey: 'fey',
    Dragon: 'draconic', Elemental: 'elemental', Plant: 'verdant', Construct: 'forged',
    Aberration: 'mind', Ooze: 'amorphous', Beast: 'bestial', Giant: 'armed' };
  // Domain themes are type claims (owner call: "tag should limit the
  // creature type"). A domain tag that contradicts the resolved type is
  // dropped — a Celestial cannot carry "grave", and a Beast cannot carry
  // "celestial". Manner tags (grasping, venomous, aerial…) pass freely.
  const DOMAIN_OF = Object.fromEntries(Object.entries(TYPE_THREAD).map(([ty, th]) => [th, ty]));
  const agreed = (themes ?? []).filter((th) => !DOMAIN_OF[th]
    || !resolvedType || DOMAIN_OF[th] === resolvedType);
  const blockThemes = agreed.length ? agreed.slice(0, 2)
    : (TYPE_THREAD[resolvedType] ? [TYPE_THREAD[resolvedType]] : null);

  // The TYPE decision is total and happens HERE, before the build (owner
  // call): concept-call type, else the first domain theme's type, else
  // Monstrosity. The flavor call no longer decides type at all — a live
  // block was labeled Dragon after a kit-less build because the synthesis
  // stayed silent and the flavor model had the last word.
  const finalType = resolvedType
    ?? (blockThemes ?? []).map((th) => DOMAIN_OF[th]).find(Boolean)
    ?? 'Monstrosity';

  // The MIND profile gates cognition abilities (owner call, 2026-08-03, the
  // Rift-Shell Crag: a Cha 26 lie-sensing Fear-caster with Int 2 and no
  // languages). Measured: zero printed mindless casters or lie-sensers.
  // Default is sapient — no exclusion unless the concept SAYS mindless — and
  // an explicit caster request always wins over the profile.
  const blockMind = caster ? 'sapient'
    : (['sapient', 'bestial', 'mindless'].includes(mind) ? mind : 'sapient');

  const skeleton = buildSkeleton({
    cr: crNum, seed: useSeed, alternatives: ALTERNATIVES, archetype: archetypeName,
    caster, strikeStat, themes: blockThemes, mind: blockMind,
    // Dragons get the whole-kit treatment; everything else may get a mined
    // synergy package as its spine (owner call, 2026-08-02). The trigger is
    // the resolved TYPE or a draconic THEME — a live block was typed Dragon
    // by the flavor call after a kit-less build, because the synthesis
    // never said Dragon and nothing else could.
    family: /dragon/i.test(finalType) ? 'dragon' : null,
    typeHint: finalType,
  });
  trace('type:', `${finalType}${resolvedType ? ' (concept call)' : ' (derived)'}`
    + `${skeleton.package?.name?.endsWith('Dragon kit') ? ' -> dragon kit' : ''}`);

  trace(`CR ${skeleton.cr} ${skeleton.size} — seed ${useSeed}${archetypeName ? `, archetype ${archetypeName}` : ''}`);
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
  const prompt = buildFlavorPrompt(skeleton, {
    concept,
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
    trace('flavor came back:', `"${flavor.name}" — ${flavor.type ?? '?'}, ${flavor.physical_damage ?? '?'}/${flavor.energy_damage ?? '?'} damage`);
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
  const defenseCaps = defenseBudgetFor(crNum, archetypeName);
  let monster = assembleMonster(model, {
    cr: crNum, chassis, plan, archetypeName, resolvedType,
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

  // Deterministic corrections only. Anything still rejecting is a defect in
  // the engine, not something to hand back to the model.
  monster = applyCorrections(
    monster,
    lintStatblock(monster, { chassis, plan, edition: '2024', defenseCaps }).findings,
    { chassis },
  );
  // A coined entry name (the lint's entry-name-coinage) has a deterministic
  // fix on this path: revert to the skeleton's placeholder, which pick-time
  // guards made unique and legal, and let applyRenameMapping repoint the
  // references (live: "Tar-Ice Vortex" shipped as a reject with no remedy).
  {
    const coinage = lintStatblock(monster, { chassis, plan, edition: '2024', defenseCaps })
      .findings.filter((f) => f.rule === 'entry-name-coinage' && f.loc?.entry);
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
  if (!degraded && auditEligible(monster, crNum)) {
    try {
      progress('status', { stage: 'audit' });
      const raw = await callLLM(buildAuditPrompt(monster, '2024'), validateAuditResponse);
      const findings = verifyAuditFindings(monster, raw);
      trace('audit:', findings.length ? findings.map((f) => `${f.loc?.entry ?? '-'}: ${f.message}`) : 'nothing flagged');

      // A type correction is a field change, so it applies directly. Guarded
      // the same way the chassis path guards it: never over a user-picked
      // type, never on a swarm form.
      const retype = auditTypeCorrection(raw, monster.type);
      if (retype && !resolvedType && !/swarm/i.test(monster.type ?? '')) {
        trace('audit retype:', `${monster.type} -> ${retype}`);
        monster.type = retype;
      }

      // Everything else names an entry. Swap those entries for another
      // pre-scaled option and rebuild; the numbers cannot move.
      const flagged = findings.map((f) => f?.loc?.entry).filter(Boolean);
      const choices = flagged.length ? swapEntries(skeleton, flagged) : new Map();
      if (choices.size) {
        trace('audit swaps:', [...choices.entries()].map(([id, k]) => `${id} -> ${k}`).join(', '));
        const reflavored = applyFlavor(skeleton, {
          ...(flavor ?? {}),
          entries: (flavor?.entries ?? []).map((e) => (choices.has(e.id)
            ? { ...e, choose: choices.get(e.id) } : e)),
        });
        const rebuilt = assembleMonster(reflavored, {
          cr: crNum, chassis, plan, archetypeName, resolvedType,
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

  // A block whose only legendary options lock themselves per-turn cannot
  // spend three uses; uses are capped by what the options support.
  {
    const legendaryCount = (monster.sections?.['Legendary Actions'] ?? []).length;
    if (monster.legendary_uses && legendaryCount) {
      monster.legendary_uses = Math.min(monster.legendary_uses, legendaryCount);
    }
  }

  monster.generation = {
    path: 'skeleton',
    seed: useSeed,
    archetype: archetypeName,
    size: skeleton.size,
    // Provenance for every entry, so a strange block can be traced to the
    // creature its mechanics came from.
    package: skeleton.package?.name ?? null,
    derived_from: skeleton.entries.map((e) => `${e.name} <- ${e.derived_from}`),
    rejects: rejects.map((r) => r.rule),
    audit: auditNotes,
  };
  trace('done:', `"${monster.name}" — ${monster.size} ${monster.type}, AC ${monster.ac}, HP ${monster.hp}, `
    + `${Object.values(monster.sections ?? {}).flat().length} entries`);
  progress('draft', { monster });
  return monster;
}
