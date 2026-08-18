/**
 * THE RESKIN PILOT PATH (owner spec v0, 2026-08-17). Parallel to the slot
 * path; touches nothing outside reskin/. Donor -> scale -> ONE reskin call
 * (identity + renames + damage types + the wildcard replacing the
 * Signature Slot) -> verify -> lint. A rename that fails to apply FAILS
 * THE BLOCK LOUDLY (owner spec: no silent fallback names).
 */
import { pickDonor, scaleDonor } from './scale.mjs';
import { cardBudget } from './card-budgets.mjs';
import { lintStatblock } from '../format-2024/lint.mjs';
import { logger } from '@/util/logger.mjs';
import challengeRatings from '@/data/challengeRatings.json';
import { hpFormulaFor as hpFormulaForSize } from '../format-2024/dice.mjs';

const trace = (l, d) => logger.log(`[reskin] ${l}`, d ?? '');
const GAME_TERM = /Attack Roll|Saving Throw|DC \d+|\b(Frightened|Poisoned|Blinded|Deafened|Prone|Restrained|Grappled|Charmed|Stunned|Incapacitated) condition\b|Advantage|Disadvantage|Dash|Disengage|Hide action|Speed/;
// Condition menus by severity (owner call, 2026-08-18: "interpolate minor
// and major conditions — give the llm the options").
export const CONDITION_MENUS = {
  condition_minor: ['Prone', 'Poisoned', 'Deafened', 'Frightened'],
  condition_major: ['Blinded', 'Restrained', 'Stunned'],
};
const DAMAGE_TYPES = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing'];

const RULES_NAME = /^(Multiattack|Legendary Resistance|Legendary Action Uses)/;

/** Every entry the reskin MUST rename — the validator and prompt share it. */
export function renameKeysOf(scaled) {
  return Object.values(scaled.sections).flat()
    .filter((e) => !e.rules && !RULES_NAME.test(e.name))
    .map((e) => e.name);
}

export function buildReskinPrompt(scaled, { concept = '', takenNames = [] } = {}) {
  const rows = Object.entries(scaled.sections).flatMap(([sec, es]) => es
    .filter((e) => !e.rules)
    .map((e) => `- [${sec}] "${e.name}": ${e.text.replace(/\*/g, '')}`));
  const typedRows = Object.values(scaled.sections).flat()
    .filter((e) => /Attack Roll:|\(Recharge/.test(e.text) || e.gate);
  const damageSkeleton = typedRows.map((e) => `"<the new name you gave ${JSON.stringify(e.name)}>": "<damage type>"`).join(', ');
  const renameSkeleton = renameKeysOf(scaled)
    .map((n) => `"${n}": "<new name, 4 words max, plain English>"`).join(', ');
  return `You are reskinning a mechanical monster chassis to a concept. The mechanics are FIXED; you provide identity.

CONCEPT: ${concept}
${takenNames.length ? `\nNAMES ALREADY TAKEN — never reuse or closely echo any: ${takenNames.slice(0, 40).join(', ')}\n` : ''}
THE CHASSIS (CR ${scaled.cr}, AC ${scaled.ac}, HP ${scaled.hp}):
${rows.join('\n')}

Return ONLY JSON:
{
 "name": "<the creature's proper name, 1-3 plain words>",
 "type": "<one of: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, Undead>",
 "size": "<Tiny|Small|Medium|Large|Huge|Gargantuan>",
 "alignment": "<a 2024 alignment>",
 "senses": "<a senses line, e.g. 'darkvision 60 ft.'>",
 "languages": "<a languages line or 'None'>",
 "renames": { ${renameSkeleton} },   <- ALL of these keys, every one, none omitted
 "damage_types": { ${damageSkeleton} },   <- REQUIRED for every attack and the area action. PHYSICAL vs ENERGY follows the BODY (print: melee attacks deal the limb's physical type — a bite Piercing, a slam Bludgeoning, a claw Slashing — with energy reserved for the ranged attack and the area action; ONLY a creature whose body IS energy — incorporeal, elemental, formless — deals energy with its melee). A fully physical creature may answer physical for everything; never give every row the same energy.
 "melee_rider": "<the ENERGY type the melee attack deals as a rider — or \"none\" if this creature's damage is purely physical (a fifth of printed monsters are)>",
 "speed_shape": "<\"climber\" keeps the Climb speed; \"runner\" trades it for +10 ft. walk (a charger, a rider, a sprinter has no business on walls)>",
 "trait_wildcard": { "name": "<a passive trait the concept demands — its body's rule, not an attack: 4 words max>", "text": "<ONE passive rule, 2 sentences max, 2024 voice: an immunity, a sense, a movement rule, a condition interaction. No damage, no saves, no auras. Omit the object entirely if the chassis already says it.>" },
 "lore": "<ONE sentence of world-lore: where it comes from and what it wants>",
 "conditions": { "condition_minor": "<one of: ${CONDITION_MENUS.condition_minor.join(', ')}>" },
 "wildcard": "<The monster is always 'the creature'; its victim is always 'the target' and NEVER 'the creature'. REPLACES the 'Signature Slot' entry: the concept's single most distinctive behavior as rules text. 3 sentences max, 2024 house voice, no atmospheric prose. Must use a save DC of ${scaled.dc} if it has a save, standard conditions only, damage at most ${Math.round(scaled.per_hit * 1.2)} average. Never assert an effect without granting its rule.>"
}`;
}

/**
 * Per-generation validator: rename COMPLETENESS is validated HERE so the
 * caller's retry loop fires on an omission (live: "Mobility Trait" omitted
 * -> the loud throw fired where a retry should have). The throw in
 * generateReskin remains as the final backstop only.
 */
// name-claim bank for the Burning-Claw class (owner: "either have fire
// damage or just call it Claw") — validated, so the RETRY reconciles it:
// the model either supplies the energy or drops the claim word.
const NAME_CLAIMS = [
  [/burn|flame|fire|cinder|scorch|sear|ember|molten/i, 'Fire'],
  [/frost|ice|chill|rime|gelid|freez/i, 'Cold'],
  [/storm|lightning|volt|spark|shock|thunder/i, null], // Lightning OR Thunder
  [/venom|toxic|poison/i, 'Poison'],
  [/acid|caustic|corrosi/i, 'Acid'],
  [/radiant|hallow/i, 'Radiant'],
  [/necrotic|grave-?rot/i, 'Necrotic'],
];
function nameClaimSatisfied(rename, dealt) {
  for (const [re, type] of NAME_CLAIMS) {
    if (!re.test(rename)) continue;
    if (type === null) return dealt.includes('Lightning') || dealt.includes('Thunder');
    return dealt.includes(type);
  }
  return true;
}

export function makeReskinValidator(scaled) {
  const keys = renameKeysOf(scaled);
  return (jsonString) => {
    if (!validateReskinResponse(jsonString)) return false;
    const p = JSON.parse(String(jsonString).replace(/^```json\s*|```\s*$/g, '').trim());
    const typedNames = Object.values(scaled.sections).flat()
      .filter((e) => /Attack Roll:/.test(e.text) || e.gate).map((e) => e.name);
    const TYPES = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing'];
    return keys.every((k) => {
      const v = String(p.renames?.[k] ?? '').trim();
      return v.length > 1 && v.split(/\s+/).length <= 4;
    }) && typedNames.every((k) => TYPES.includes(p.damage_types?.[String(p.renames?.[k] ?? '').trim()]))
      && typedNames.every((k) => {
        const rn = String(p.renames?.[k] ?? '').trim();
        const dealt = [p.damage_types?.[rn], /Melee/.test(k) || k === 'Melee Attack' ? p.melee_rider : null].filter(Boolean);
        return nameClaimSatisfied(rn, dealt);
      })
      && (!Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes('{damage_type_2}'))
        || TYPES.includes(p.melee_rider) || String(p.melee_rider ?? '').trim().toLowerCase() === 'none')
      && Object.entries(CONDITION_MENUS).every(([slot, menu]) => {
        const used = Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes(`{${slot}}`));
        return !used || menu.includes(String(p.conditions?.[slot] ?? '').trim());
      });
  };
}

export function validateReskinResponse(jsonString) {
  try {
    const p = JSON.parse(String(jsonString).replace(/^```json\s*|```\s*$/g, '').trim());
    return !!p && typeof p.name === 'string' && !!p.renames && typeof p.wildcard === 'string';
  } catch { return false; }
}

export async function generateReskin(options, callLLM) {
  const { concept = '', cr, onProgress = null, fixedName = null } = options;
  const progress = (phase, data) => { try { onProgress?.({ phase, ...data }); } catch { /* display-only */ } };
  const donor = pickDonor(cr);
  const scaled = scaleDonor(donor, cr);
  trace('donor:', `${donor.id} -> CR ${cr}`);
  progress('chassis', { chassis: { ac: scaled.ac, hp: scaled.hp, cr_str: String(cr), pb: scaled.pb, xp: challengeRatings[String(cr)]?.XP ?? 0 } });

  const raw = await callLLM(buildReskinPrompt(scaled, { concept, takenNames: options.takenNames ?? [] }), makeReskinValidator(scaled));
  let p = (() => { try { return JSON.parse(String(raw).replace(/^```json\s*|```\s*$/g, '').trim()); } catch { return null; } })();
  if (!p) throw new Error('reskin call failed — the pilot fails loudly, never silently');
  // THE REPAIR CALL (owner ask, 2026-08-18: "can we do a fix call so it
  // doesn't fail?"): a near-complete response gets ONE small call for
  // exactly its missing pieces — merged and re-checked. The loud throw
  // survives as the true last resort.
  {
    const missingRenames = renameKeysOf(scaled).filter((k) => {
      const v = String(p.renames?.[k] ?? '').trim();
      return !v || v.split(/\s+/).length > 4;
    });
    const typedRows = Object.values(scaled.sections).flat().filter((e) => /Attack Roll:/.test(e.text) || e.gate);
    const missingTypes = typedRows.map((e) => e.name)
      .filter((k) => !DAMAGE_TYPES.includes(p.damage_types?.[String(p.renames?.[k] ?? '').trim()]));
    const missingConds = Object.entries(CONDITION_MENUS)
      .filter(([slot, menu]) => Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes(`{${slot}}`))
        && !menu.includes(String(p.conditions?.[slot] ?? '').trim()))
      .map(([slot]) => slot);
    const riderSlotUsed = Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes('{damage_type_2}'));
    const riderMissing = riderSlotUsed && !DAMAGE_TYPES.includes(p.melee_rider) && String(p.melee_rider ?? '').trim().toLowerCase() !== 'none';
    if (missingRenames.length || missingTypes.length || missingConds.length || riderMissing) {
      trace('repair call:', `renames ${missingRenames.length}, types ${missingTypes.length}, conditions ${missingConds.length}`);
      const fixPrompt = `You are completing a partial answer for a D&D monster reskin. CONCEPT: ${concept}\nReturn ONLY JSON with EXACTLY these missing pieces:\n{${missingRenames.length ? ` "renames": { ${missingRenames.map((k) => `"${k}": "<new name, 4 words max>"`).join(', ')} },` : ''}${missingTypes.length ? ` "damage_types": { ${missingTypes.map((k) => `"${k}": "<damage type>"`).join(', ')} },` : ''}${riderMissing ? ` "melee_rider": "<energy type or none>",` : ''}${missingConds.length ? ` "conditions": { ${missingConds.map((sl) => `"${sl}": "<one of: ${CONDITION_MENUS[sl].join(', ')}>"`).join(', ')} }` : ''} }`;
      const fixRaw = await callLLM(fixPrompt, (j) => { try { return !!JSON.parse(String(j).replace(/^```json\s*|```\s*$/g, '').trim()); } catch { return false; } });
      const fix = (() => { try { return JSON.parse(String(fixRaw).replace(/^```json\s*|```\s*$/g, '').trim()); } catch { return null; } })();
      if (fix) {
        p = { ...p,
          renames: { ...p.renames, ...(fix.renames ?? {}) },
          // repair types may key on the DONOR name (we asked with it) or the new name
          damage_types: { ...p.damage_types, ...Object.fromEntries(Object.entries(fix.damage_types ?? {}).map(([k, v]) => [String(p.renames?.[k] ?? k).trim(), v])) },
          conditions: { ...p.conditions, ...(fix.conditions ?? {}) },
          melee_rider: p.melee_rider ?? fix.melee_rider,
        };
      }
    }
  }
  // the folk-article class, ported from the skeleton path: templates
  // supply their own articles, so a "The Cindermoss" mints "the the"
  // a user-typed name ships VERBATIM — the slot path's oldest law
  if (fixedName) p.name = fixedName;
  p.name = String(p.name).replace(/^the\s+/i, '').trim() || p.name;
  if (!fixedName) p.name = p.name.split(/\s+/).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

  // apply renames; ANY unrenamed entry is a loud failure (owner spec)
  const sections = {};
  const renamed = new Map();
  for (const [sec, es] of Object.entries(scaled.sections)) {
    sections[sec] = es.map((e) => {
      // rules vocabulary keeps its printed name — the table recognizes it
      // at a glance (the skeleton path name-locks these for the same reason)
      if (e.rules || e.name === 'Multiattack' || /^Legendary Resistance/.test(e.name)) return { name: e.name, text: e.text };
      // damage_types keys arrive in the model's own casing of its own
      // names — normalize them through the same title-caser the names get
      const MINOR = new Set(['of', 'the', 'a', 'an', 'and', 'or', 'to', 'in', 'into', 'with']);
      const titleCase = (n) => n.split(/\s+/).map((w, i) => (i > 0 && MINOR.has(w.toLowerCase()) ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1))).join(' ');
      const raw = String(p.renames?.[e.name] ?? '').trim();
      if (!raw || raw.split(/\s+/).length > 4) throw new Error(`unrenamed entry: "${e.name}" — failing loudly per spec`);
      const fresh = titleCase(raw);
      renamed.set(e.name, fresh);
      return { name: e.wildcard_slot ? fresh : fresh + (e.gate ? ` (${e.gate})` : ''), text: e.text, text_noRider: e.text_noRider, was: e.name, wildcard: !!e.wildcard_slot, gate: e.gate };
    });
  }
  // cross-references + creature name + damage types + wildcard body
  const inline = `the ${p.name.toLowerCase()}`;
  for (const es of Object.values(sections)) {
    for (const e of es) {
      // (?! Roll) — the de-flavored entry name "Melee Attack" is a
      // substring of the RULES formula "Melee Attack Roll:", and plain
      // split/join clobbered the roll line in every attack (batch review:
      // "Lashing Root Tendril Roll:", six for six)
      for (const [old, fresh] of renamed) {
        e.text = e.text.replace(new RegExp(`${old}(?! Roll)`, 'g'), fresh);
      }
      e.text = e.text.split('The creature').join(`The ${p.name.toLowerCase()}`).split('the creature').join(inline);
      // donors carry {damage_type}, never a real type (owner call: the
      // hard-coded physical was the retype bug's hiding place) — the
      // reskin SUPPLIES the type, and a leftover placeholder is as loud
      // as an unrenamed entry
      const rider = String(p.melee_rider ?? 'none').trim();
      if (e.text.includes('{damage_type_2}')) {
        if (DAMAGE_TYPES.includes(rider) && !['Bludgeoning', 'Piercing', 'Slashing'].includes(rider)) {
          e.text = e.text.split('{damage_type_2}').join(rider);
        } else if (e.text_noRider) {
          e.text = e.text_noRider; // purely physical: the full-budget single clause
        }
      }
      delete e.text_noRider;
      const bare = e.name.replace(/ \(.*\)$/, '');
      const wanted = p.damage_types?.[bare]
        ?? Object.entries(p.damage_types ?? {}).find(([k]) => k.toLowerCase() === bare.toLowerCase())?.[1];
      if (wanted && DAMAGE_TYPES.includes(wanted)) e.text = e.text.split('{damage_type}').join(wanted);
      for (const [slot, menu] of Object.entries(CONDITION_MENUS)) {
        const pick2 = String(p.conditions?.[slot] ?? '').trim();
        if (e.text.includes(`{${slot}}`) && menu.includes(pick2)) e.text = e.text.split(`{${slot}}`).join(pick2);
      }
      if (e.wildcard) {
        // a leading self-label ("Corrosive Snare:") is the rename
        // half-landing inside the body — strip it (never the save frame)
        let w = String(p.wildcard).trim().replace(/^(?!\*)([A-Z][\w' -]{2,28}):\s*/, (m, g) => (/Saving Throw|Attack Roll/.test(g) ? m : ''));
        const dcs = w.match(/DC (\d+)/g) ?? [];
        const dmg = w.match(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/);
        const blockCaps = Object.values(scaled.sections).flat().map((x) => x.text).join(' ') + scaled.speed;
        // pronoun muddle: the model calling the VICTIM 'the creature'
        // makes substitution mint self-reference ("the rel cannot move
        // closer to the rel") — a sentence naming the monster twice is
        // the deterministic symptom
        const selfRef = w.split(/(?<=\.)\s+/).some((sent) => (sent.match(/the creature/g) ?? []).length >= 2);
        const okay = !selfRef && w.split(/(?<=\.)\s+/).length <= 3 && GAME_TERM.test(w)
          // capability manifest: a wildcard may not key on movement the
          // chassis lacks (live: a teleport trigger on a walker)
          && !(/teleport/i.test(w) && !/teleport/i.test(blockCaps))
          && !(/\bfl(?:y|ies|ying)\b/i.test(w) && !/Fly/i.test(scaled.speed))
          // no standing party taxes: a recurring aura is a role the
          // envelope never priced (live: Echo of Vigil at CR 5)
          && !/starts its turn/i.test(w)
          // statblocks are third person (live: "your smoldering gaze")
          && !/\byours?\b|\byou\b/i.test(w)
          && dcs.every((d) => d === `DC ${scaled.dc}`)
          && (!dmg || Number(dmg[1]) <= Math.round(scaled.per_hit * 1.5));
        if (okay) {
          e.text = w.split('the creature').join(inline);
          // the wildcard lands in the section its own text declares
          if (/uses? its Reaction|as (?:a|its) [Rr]eaction|^When the .{0,40}takes damage/.test(e.text)) e.moveTo = 'Reactions';
          else if (/[Aa]s a [Bb]onus [Aa]ction,?\s*/.test(e.text)) {
            e.text = e.text.replace(/[Aa]s a [Bb]onus [Aa]ction,?\s*(\w)/, (m0, c) => c.toUpperCase());
            e.moveTo = 'Bonus Actions';
          }
        } else trace('wildcard rejected — Signature Slot keeps chassis text');
      }
      delete e.was; delete e.wildcard; delete e.gate;
    }
  }

  if (String(p.speed_shape ?? '').trim() === 'runner' && /Climb/.test(scaled.speed)) {
    const walk = Number((/^(\d+)/.exec(scaled.speed) ?? [0, 30])[1]);
    scaled.speed = scaled.speed.replace(/^(\d+) ft\.,? ?(Climb \d+ ft\.)?/, `${walk + 10} ft.`).replace(/,\s*$/, '');
  }
  const card = cardBudget(cr, { legendary: !!scaled.legendary });
  const mods = Object.fromEntries(Object.entries(scaled.stats).map(([k, v]) => [k, Math.floor((v - 10) / 2)]));
  const monster = {
    name: p.name, format: '2024', cr, cr_str: String(cr),
    xp: challengeRatings[String(cr)]?.XP ?? 0,
    challenge_rating: `${cr} (XP ${(challengeRatings[String(cr)]?.XP ?? 0).toLocaleString()}; PB +${scaled.pb})`,
    type: p.type ?? 'Monstrosity', size: p.size ?? 'Medium', alignment: p.alignment ?? 'Unaligned',
    ac: card.ac, hp: card.hp,
    // the die follows the size the RESKIN chose (live: a Gargantuan on d8)
    hp_formula: hpFormulaForSize(card.hp, p.size ?? 'Medium', Math.floor((scaled.stats.CON - 10) / 2)),
    pb: scaled.pb,
    speed: scaled.speed, stats: { ...scaled.stats },
    saves: Object.fromEntries(Object.entries(mods).map(([k, v]) => [k, scaled.saves.includes(k) ? v + scaled.pb : v])),
    skills: scaled.skills, senses_special: p.senses ?? 'darkvision 60 ft.', languages: p.languages ?? 'None',
    initiative_bonus: mods.DEX, initiative_score: 10 + mods.DEX,
    sections,
    lore: typeof p.lore === 'string' && p.lore.trim().length > 15 ? p.lore.trim() : undefined,
    generation: { path: 'reskin', donor: donor.id, archetype: 'skirmisher' },
    archetype: 'skirmisher', archetype_source: 'user',
  };
  {
    const tw = p.trait_wildcard;
    const twName = String(tw?.name ?? '').trim();
    const twText = String(tw?.text ?? '').trim();
    if (twName && twText) {
      const names = Object.values(sections).flat().map((e) => e.name.toLowerCase());
      const okay = twName.split(/\s+/).length <= 4
        && twText.split(/(?<=\.)\s+/).length <= 2
        && !/\d+ \(\d+d\d+|Saving Throw|Attack Roll|Recharge|\/Day|starts its turn/i.test(twText)
        && !/\byours?\b|\byou\b/i.test(twText)
        && /Immunity|Resistance|Advantage|Disadvantage|Speed|darkvision|blindsight|tremorsense|truesight|condition|can't be|cannot be/i.test(twText)
        && !names.includes(twName.toLowerCase());
      if (okay) {
        (sections.Traits = sections.Traits ?? []).unshift({ name: twName, text: twText.split('the creature').join(inline).replace(/^The creature/, `The ${p.name.toLowerCase()}`) });
        trace('trait wildcard:', `"${twName}"`);
      } else trace('trait wildcard rejected');
    }
  }
  for (const [sec, es] of Object.entries(sections)) {
    for (let i = es.length - 1; i >= 0; i -= 1) {
      const e = es[i];
      if (/\{damage_type(?:_2)?\}|\{condition_(?:minor|major)\}/.test(e.text)) throw new Error(`unfilled slot in "${e.name}" — failing loudly per spec`);
      if (e.moveTo && e.moveTo !== sec) {
        es.splice(i, 1);
        (sections[e.moveTo] = sections[e.moveTo] ?? []).push(e);
      }
      delete e.moveTo;
    }
  }
  const lint = lintStatblock(monster, { edition: '2024' });
  trace('lint:', `${lint.findings.length} findings`);
  monster.lint_findings = lint.findings.map((f) => `${f.rule}: ${f.message}`);
  trace('done:', `"${monster.name}" — donor ${donor.id}, CR ${cr}`);
  return monster;
}
