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
import { auditEligible, buildAuditPrompt, validateAuditResponse, verifyAuditFindings } from '../format-2024/audit.mjs';

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

export function buildReskinPrompt(scaled, { concept = '', takenNames = [], signatureElements = [] } = {}) {
  const rows = Object.entries(scaled.sections).flatMap(([sec, es]) => es
    .filter((e) => !e.rules)
    .map((e) => `- [${sec}] "${e.name}": ${e.text.replace(/\*/g, '')}`));
  const typedRows = Object.values(scaled.sections).flat()
    .filter((e) => e.text.includes('{damage_type}'));
  const damageSkeleton = typedRows.map((e) => `"<the new name you gave ${JSON.stringify(e.name)}>": "<damage type>"`).join(', ');
  const renameSkeleton = renameKeysOf(scaled)
    .map((n) => `"${n}": "<new name, 4 words max, plain English>"`).join(', ');
  return `You are reskinning a mechanical monster chassis to a concept. The mechanics are FIXED; you provide identity.

CONCEPT: ${concept}
${signatureElements.length ? `\nSIGNATURE TARGET: the concept's defining element is "${signatureElements[0]}". The trait_wildcard is the passive rule that makes it true on the sheet; the wildcard is its ACTIVE use — build that element's MECHANICS; the element phrase names what to build, not necessarily what to call it. The wildcard may reference the trait_wildcard by its exact name — and when both build the same element they SHOULD reference each other, the action stating what the trait's rule costs or grants while the action is in effect. Reference nothing else that is not on the sheet.${signatureElements.length > 1 ? ` Secondary elements — spend them in renames and lore where they fit naturally: ${signatureElements.slice(1).join('; ')}.` : ''}\n` : ''}${takenNames.length ? `\nNAMES ALREADY TAKEN — never reuse or closely echo any: ${takenNames.slice(0, 40).join(', ')}\n` : ''}
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
 "renames": { ${renameSkeleton} },   <- ALL of these keys, every one, none omitted. A name that claims an element must be PAID by that row's damage: "Burning X" needs Fire on the row (or the melee rider), "Rimefrost X" needs Cold. If the damage does not pay the word, drop the word, or qualify it with the true element the way print does (the Priest\'s "Radiant Flame" deals Radiant); folklore light-compounds (witchfire, foxfire, balefire) are always legal.
 "damage_types": { ${damageSkeleton} },   <- REQUIRED for every attack and the area action. PHYSICAL vs ENERGY follows the BODY (print: melee attacks deal the limb's physical type — a bite Piercing, a slam Bludgeoning, a claw Slashing — with energy reserved for the ranged attack and the area action; ONLY a creature whose body IS energy — incorporeal, elemental, formless — deals energy with its melee). A fully physical creature may answer physical for everything; never give every row the same energy — but also keep to ONE energy family across the block (print rarely fields two): a second energy only when the concept genuinely has two distinct sources.
 "slot_save": "<the Saving Throw stat the Signature Slot should use if your wildcard is not used — the stat the concept threatens: Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma>",
 "melee_rider": "<the ENERGY type the melee attack deals as a rider — or \"none\" if this creature's damage is purely physical (a fifth of printed monsters are)>",
 "speed_shape": "<\"climber\" keeps the Climb speed; \"runner\" trades it for +10 ft. walk (a charger, a rider, a sprinter has no business on walls)>",
 "trait_wildcard": { "name": "<a passive trait the concept demands — its body's rule, not an attack: 4 words max>", "text": "<ONE passive rule, 2 sentences max, 2024 voice: an immunity, a sense, a movement rule, a condition interaction. No damage, no saves, no auras. Omit the object entirely if the chassis already says it.>" },
 "lore": "<ONE sentence of world-lore: where it comes from and what it wants>",
 "conditions": { "condition_minor": "<one of: ${CONDITION_MENUS.condition_minor.join(', ')}>" },
 "wildcard": "<The monster is always 'the creature'; its victim is always 'the target' and NEVER 'the creature'. REPLACES the 'Signature Slot' entry: the concept's single most distinctive behavior as rules text. 3 sentences max, 2024 house voice, no atmospheric prose. Must use a save DC of ${scaled.dc} if it has a save, standard conditions only, damage at most ${Math.round(scaled.per_hit * 1.2)} average. Never assert an effect without granting its rule. An ability that throws or detaches part of the creature's body must state what the creature loses while it is detached and when it returns. Acting or attacking from a distant point is RANGED attacks only.>"
}`;
}

// THE GUARD BATTERY, FACTORED (repair retry, owner go 2026-08-18): one
// function vets a draft at first pass AND after the repair call — the v4
// trace showed the guards correctly rejecting the fear aura for a fixable
// pronoun error, then shipping boilerplate because rejection had no
// second chance.
function vetActionWildcard(raw, scaled, { name, inline, missingTraitName = null }) {
  // a leading self-label ("Corrosive Snare:") is the rename half-landing
  // inside the body — strip it (never the save frame)
  const w = String(raw).trim().replace(/^(?!\*)([A-Z][\w' -]{2,28}):\s*/, (m, g) => (/Saving Throw|Attack Roll/.test(g) ? m : ''));
  const dcs = w.match(/DC (\d+)/g) ?? [];
  const dmg = w.match(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/);
  const blockCaps = Object.values(scaled.sections).flat().map((x) => x.text).join(' ') + scaled.speed;
  // pronoun muddle: 'the creature' with a VICTIM-shaped predicate means
  // the model cast the monster as its own target — substitution would mint
  // self-reference. The old heuristic (2+ 'the creature' per sentence)
  // false-positived on legal double monster-references ("until the start
  // of the creature's next turn, and the creature has Advantage") and
  // killed correct drafts through repair (the Matador, 2026-08-19).
  const victimPredicate = /[Tt]he creature (?:must (?:make|succeed)|takes \d|has the [A-Z][a-z]+ condition|repeats the save)/.test(w);
  const doubledInVictimContext = w.split(/(?<=\.)\s+/).some((sent) =>
    (sent.match(/the creature/gi) ?? []).length >= 2
    && !/the target/i.test(sent)
    && /must (?:make|succeed)|Saving Throw|Frightened|Charmed|Paralyzed|Stunned|Restrained|Poisoned|Blinded|Prone|Incapacitated/i.test(sent));
  const selfRef = victimPredicate || doubledInVictimContext;
  // role collapse: "the target" may not appear before anything establishes one
  const firstTarget = w.search(/\bthe target\b/);
  const established = w.search(/one creature|each creature|Saving Throw/);
  const roleCollapse = firstTarget !== -1 && (established === -1 || firstTarget < established);
  // an attack-triggered wildcard is reaction-shaped: it needs a rate limit
  const unrated = /When a creature[^.]{0,80}attacks/i.test(w)
    && !/Reaction|once per (?:round|turn)|can't [^.]{0,40}again until/i.test(w);
  // one-directional reference contract: the draft may name the trait
  // wildcard — but only if that trait actually shipped
  const dangling = !!missingTraitName && w.includes(missingTraitName);
  // detachment accounting (Hollow Gaze, v6): a thrown body part that never
  // says when it returns is simultaneously destroyed, present, and
  // infinitely renewable — one missing sentence, repair-shaped
  const detaches = /throws? its (?:severed )?(?:head|skull|eye|hand|arm|heart|tail|limb)|detach(?:es|ing)?\b/i.test(w);
  const unreturned = detaches && !/returns?|reattach|retriev|re-?forms?|recover/i.test(w);
  // remote-origin actions are ranged only — a scimitar cannot swing from a
  // disembodied point 30 feet away
  const remoteMelee = /from that point/i.test(w) && /attack/i.test(w) && !/[Rr]anged attack/.test(w);
  const okay = !selfRef && !roleCollapse && !unrated && !dangling && !unreturned && !remoteMelee && w.split(/(?<=\.)\s+/).length <= 3 && GAME_TERM.test(w)
    && !(/teleport/i.test(w) && !/teleport/i.test(blockCaps))
    && !(/\bfl(?:y|ies|ying)\b/i.test(w) && !/Fly/i.test(scaled.speed))
    && !/starts its turn/i.test(w)
    && !/\byours?\b|\byou\b/i.test(w)
    && dcs.every((d) => d === `DC ${scaled.dc}`)
    && (!dmg || Number(dmg[1]) <= Math.round(scaled.per_hit * 1.5));
  if (!okay) {
    const why = selfRef ? 'pronoun muddle' : roleCollapse ? 'role collapse' : unrated ? 'no rate limit'
      : dangling ? 'references a trait that did not ship'
      : unreturned ? 'no return clause' : remoteMelee ? 'remote attacks must be ranged'
      : /starts its turn/i.test(w) ? 'recurring aura' : /\byours?\b|\byou\b/i.test(w) ? 'second person'
      : w.split(/(?<=\.)\s+/).length > 3 ? 'over 3 sentences' : !GAME_TERM.test(w) ? 'no game term' : 'guard battery';
    return { okay: false, why, draft: w };
  }
  let text = w.split('the creature').join(inline).split('The creature').join(`The ${name.toLowerCase()}`);
  let moveTo;
  // the wildcard lands in the section its own text declares
  if (/uses? its Reaction|as (?:a|its) [Rr]eaction|^When the .{0,40}takes damage/.test(text)) moveTo = 'Reactions';
  else if (/^When (?:the|a|it) .{0,60}moves/i.test(text)) {
    // mark-on-move is print's TRAIT grammar (free, once per turn stated)
    moveTo = 'Traits';
    if (!/once (?:per|a|each) turn/i.test(text)) text += ' It can do this only once per turn.';
  } else if (/[Aa]s a [Bb]onus [Aa]ction,?\s*/.test(text)) {
    text = text.replace(/[Aa]s a [Bb]onus [Aa]ction,?\s*(\w)/, (m0, c) => c.toUpperCase());
    moveTo = 'Bonus Actions';
  }
  return { okay: true, text, moveTo };
}

function vetTraitWildcard(tw, sections, { name, inline }) {
  const twName = String(tw?.name ?? '').trim();
  const twText = String(tw?.text ?? '').trim();
  if (!twName || !twText) return { okay: false, silent: true };
  const names = Object.values(sections).flat().map((e) => e.name.toLowerCase());
  const why = twName.split(/\s+/).length > 4 ? 'name over 4 words'
    : twText.split(/(?<=\.)\s+/).length > 2 ? 'over 2 sentences'
    : /\d+ \(\d+d\d+|Saving Throw|Attack Roll|Recharge|\/Day/i.test(twText) ? 'active mechanics in a passive trait (damage, saves, or use limits)'
    : /starts its turn/i.test(twText) ? 'recurring aura'
    : /\byours?\b|\byou\b/i.test(twText) ? 'second person'
    : !/Immunity|Resistance|Advantage|Disadvantage|Speed|darkvision|blindsight|tremorsense|truesight|condition|can't be|cannot be/i.test(twText) ? 'no game term — flavor without a rule'
    : names.includes(twName.toLowerCase()) ? 'name collides with an existing entry' : null;
  if (why) return { okay: false, name: twName, draft: twText, why };
  return { okay: true, name: twName, text: twText.split('the creature').join(inline).replace(/^The creature/, `The ${name.toLowerCase()}`) };
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
// icon-owned vocabulary may not enter a rename (the Vorpal Saber class)
const RESERVED_NAMES = /vorpal|phylactery|holy avenger|sphere of annihilation|tarrasque|beholder|mind flayer/i;
// Two print-grounded escapes (wisp-queen deadlock, 2026-08-18; corpus
// measured 34/35 fire-named rows paying Fire):
// 1. Lexicalized spectral-light compounds don't claim fire — witchfire/
//    foxfire/balefire are the folklore words for light that doesn't burn
//    (the firefly principle; corpus is silent, no counterexample).
// 2. A name with SEVERAL element claims passes if ANY is paid — print's
//    own move: the Priest's "Radiant Flame" deals Radiant only, the
//    qualifier re-typing the fire word.
const SPECTRAL_COMPOUNDS = /witch-?fire|fox-?fire|bale-?fire|marsh-?fire|ghost-?fire|cold-?fire|wisp-?fire|corpse-?fire/gi;
function nameClaimSatisfied(rename, dealt) {
  const cleaned = rename.replace(SPECTRAL_COMPOUNDS, '');
  let claimed = false;
  for (const [re, type] of NAME_CLAIMS) {
    if (!re.test(cleaned)) continue;
    claimed = true;
    if (type === null ? (dealt.includes('Lightning') || dealt.includes('Thunder')) : dealt.includes(type)) return true;
  }
  return !claimed;
}

export function makeReskinValidator(scaled) {
  const keys = renameKeysOf(scaled);
  return (jsonString) => {
    // every rejection is TRACED — the wisp-queen death (2026-08-18) was
    // three silent validation failures rendered as a generic toast
    const fail = (why) => { trace('validation failed —', why); return false; };
    if (!validateReskinResponse(jsonString)) return fail('unparseable, or name/renames/wildcard missing');
    const p = JSON.parse(String(jsonString).replace(/^```json\s*|```\s*$/g, '').trim());
    const typedNames = Object.values(scaled.sections).flat()
      .filter((e) => e.text.includes('{damage_type}')).map((e) => e.name);
    const TYPES = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing'];
    for (const k of keys) {
      const v = String(p.renames?.[k] ?? '').trim();
      if (!v || v.toLowerCase() === k.toLowerCase() || v.split(/\s+/).length > 4 || RESERVED_NAMES.test(v)) return fail(`rename for "${k}" missing, unchanged, over 4 words, or reserved`);
    }
    for (const k of typedNames) {
      const rn = String(p.renames?.[k] ?? '').trim();
      if (!TYPES.includes(p.damage_types?.[rn])) return fail(`no damage type for "${rn || k}"`);
      const dealt = [p.damage_types?.[rn], /Melee/.test(k) || k === 'Melee Attack' ? p.melee_rider : null].filter(Boolean);
      if (!nameClaimSatisfied(rn, dealt)) return fail(`name "${rn}" claims an element its damage (${dealt.join('/')}) does not pay`);
    }
    if (Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes('{damage_type_2}'))
      && !TYPES.includes(p.melee_rider) && String(p.melee_rider ?? '').trim().toLowerCase() !== 'none') return fail('melee_rider missing (energy type or "none")');
    for (const [slot, menu] of Object.entries(CONDITION_MENUS)) {
      const used = Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes(`{${slot}}`));
      if (used && !menu.includes(String(p.conditions?.[slot] ?? '').trim())) return fail(`condition for {${slot}} not from its menu`);
    }
    return true;
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
  const donor = pickDonor(cr, options.style ?? null);
  const scaled = scaleDonor(donor, cr);
  trace('donor:', `${donor.id} -> CR ${cr}`);
  progress('chassis', { chassis: { ac: scaled.ac, hp: scaled.hp, cr_str: String(cr), pb: scaled.pb, xp: challengeRatings[String(cr)]?.XP ?? 0 } });

  const raw = await callLLM(buildReskinPrompt(scaled, { concept, takenNames: options.takenNames ?? [], signatureElements: options.signatureElements ?? [] }), makeReskinValidator(scaled));
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
    const typedRows = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}'));
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
  // TYPE HONESTY, the measured rules ported: print's Beast ceiling is
  // CR 8 (the T-Rex) and Beasts are Unaligned — a "Huge Beast, Lawful
  // Neutral, INT 16, CR 24" stops a reader at the header (live: the
  // Rimegrave Warden). Remap, never fail: the Monstrosity landing pad.
  if (p.type === 'Beast') {
    if (cr > 10) { trace('type honesty:', 'Beast above CR 10 -> Monstrosity (print ceiling: CR 8)'); p.type = 'Monstrosity'; }
    else p.alignment = 'Unaligned';
  }
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
  let pendingWildcard = null;
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
      const STATS = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
      const slotSave = STATS.includes(String(p.slot_save ?? '').trim()) ? String(p.slot_save).trim() : 'Dexterity';
      if (e.text.includes('{save_stat}')) e.text = e.text.split('{save_stat}').join(slotSave);
      const rider = String(p.melee_rider ?? 'none').trim();
      const bare = e.name.replace(/ \(.*\)$/, '');
      const wanted = p.damage_types?.[bare]
        ?? Object.entries(p.damage_types ?? {}).find(([k]) => k.toLowerCase() === bare.toLowerCase())?.[1];
      if (e.text.includes('{damage_type_2}')) {
        // "15 Necrotic plus 10 Necrotic" is not a rider, it's a split the
        // model didn't ask for — same type on both halves collapses to the
        // solver's own full-budget single clause (wisp queen, 2026-08-18)
        if (DAMAGE_TYPES.includes(rider) && !['Bludgeoning', 'Piercing', 'Slashing'].includes(rider) && rider !== wanted) {
          e.text = e.text.split('{damage_type_2}').join(rider);
        } else if (e.text_noRider) {
          e.text = e.text_noRider; // purely physical or same-type: one clause
        }
      }
      delete e.text_noRider;
      if (wanted && DAMAGE_TYPES.includes(wanted)) e.text = e.text.split('{damage_type}').join(wanted);
      for (const [slot, menu] of Object.entries(CONDITION_MENUS)) {
        const pick2 = String(p.conditions?.[slot] ?? '').trim();
        if (e.text.includes(`{${slot}}`) && menu.includes(pick2)) e.text = e.text.split(`{${slot}}`).join(pick2);
      }
      if (e.wildcard) pendingWildcard = e; // vetted after the trait lands (reference contract + repair)
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
    skills: scaled.skills,
    senses: (() => {
      const sp = String(p.senses ?? 'darkvision 60 ft.').trim()
        .replace(/\b(Blindsight|Darkvision|Tremorsense|Truesight)\b/g, (w) => w.toLowerCase())
        .replace(/[;,]?\s*Passive Perception \d+/gi, '').replace(/[;,]\s*$/, '').trim();
      const pp = 10 + Number((/Perception \+(\d+)/.exec(scaled.skills) ?? [0, mods.WIS])[1]);
      return sp ? `${sp}; Passive Perception ${pp}` : `Passive Perception ${pp}`;
    })(),
    languages: p.languages ?? 'None',
    initiative_bonus: mods.DEX, initiative_score: 10 + mods.DEX,
    sections,
    lore: typeof p.lore === 'string' && p.lore.trim().length > 15 ? p.lore.trim() : undefined,
    generation: { path: 'reskin', donor: donor.id, archetype: 'skirmisher' },
    archetype: 'skirmisher', archetype_source: 'user',
  };
  let traitShipped = null; let traitRejected = null;
  {
    const v = vetTraitWildcard(p.trait_wildcard, sections, { name: p.name, inline });
    if (v.okay) {
      (sections.Traits = sections.Traits ?? []).unshift({ name: v.name, text: v.text });
      traitShipped = v.name;
      trace('trait wildcard:', `"${v.name}"`);
    } else if (!v.silent) {
      traitRejected = v;
      trace('trait wildcard rejected —', `${v.why}: ${v.draft.slice(0, 120)}`);
    }
  }
  let wcRejected = null;
  if (pendingWildcard) {
    const v = vetActionWildcard(p.wildcard, scaled, { name: p.name, inline, missingTraitName: traitRejected?.name ?? null });
    if (v.okay) {
      pendingWildcard.text = v.text;
      if (v.moveTo) pendingWildcard.moveTo = v.moveTo;
      trace('wildcard accepted:', v.text.slice(0, 100));
    } else {
      wcRejected = v;
      trace('wildcard rejected —', `${v.why}: ${v.draft.slice(0, 120)}`);
    }
  }
  // THE REPAIR RETRY (owner go 2026-08-18; the v4 trace): the guards caught
  // the fear aura's pronoun error and the block shipped boilerplate. Good
  // content gets ONE chance to fix its small error — the rejection reason
  // fed back — before the chassis fallback stands.
  if (wcRejected || traitRejected) {
    try {
      const el = (options.signatureElements ?? [])[0];
      const fixPrompt = `You are repairing rejected ability drafts for the D&D monster "${p.name}". CONCEPT: ${concept}${el ? `\nThe ability must build the mechanics for: ${el}.` : ''}
${wcRejected ? `ACTION draft rejected — ${wcRejected.why}. Draft: "${wcRejected.draft}"\nRewrite it: the monster is always 'the creature'; its victim is always 'the target' and NEVER 'the creature'; establish the target FIRST ("one creature within 30 feet" or a Saving Throw frame) before saying 'the target'; max 3 sentences; any save is DC ${scaled.dc}; damage at most ${Math.round(scaled.per_hit * 1.2)} average; no effect on "starts its turn"; no second person; a per-attack trigger needs a rate limit; an ability that throws or detaches part of the body must state when and how it returns; acting from a distant point allows RANGED attacks only; reference nothing that is not on the sheet.\n` : ''}${traitRejected ? `TRAIT draft rejected — ${traitRejected.why}. Name: "${traitRejected.name}" Text: "${traitRejected.draft}"\nRewrite it: ONE passive rule, 2 sentences max, 2024 voice — an immunity, a sense, a movement rule, a condition interaction. No damage numbers, no saves, no Recharge, no auras, no second person.\n` : ''}Return ONLY JSON: {${wcRejected ? ' "wildcard": "<the rewritten action rule>"' : ''}${wcRejected && traitRejected ? ',' : ''}${traitRejected ? ' "trait_wildcard": { "name": "<4 words max>", "text": "<2 sentences max>" }' : ''} }`;
      // the repair validator VETS the drafts, so the client's retry loop
      // fires on a bad repair instead of shipping straight to the chassis
      // fallback (the Matador: two one-shot repair failures, 2026-08-19)
      const fixValidator = (j) => {
        let parsed; try { parsed = JSON.parse(String(j).replace(/^```json\s*|```\s*$/g, '').trim()); } catch { return false; }
        let anyGood = false;
        if (wcRejected && typeof parsed.wildcard === 'string') {
          if (!vetActionWildcard(parsed.wildcard, scaled, { name: p.name, inline }).okay) return false;
          anyGood = true;
        }
        if (traitRejected && parsed.trait_wildcard) {
          if (!vetTraitWildcard(parsed.trait_wildcard, sections, { name: p.name, inline }).okay) return false;
          anyGood = true;
        }
        return anyGood;
      };
      const fixRaw = await callLLM(fixPrompt, fixValidator);
      const fix = JSON.parse(String(fixRaw).replace(/^```json\s*|```\s*$/g, '').trim());
      if (traitRejected && fix.trait_wildcard) {
        const v2 = vetTraitWildcard(fix.trait_wildcard, sections, { name: p.name, inline });
        if (v2.okay) {
          (sections.Traits = sections.Traits ?? []).unshift({ name: v2.name, text: v2.text });
          traitShipped = v2.name;
          trace('trait wildcard repaired:', `"${v2.name}"`);
        } else trace('trait repair failed —', `${v2.why}; no trait ships`);
      }
      if (wcRejected && typeof fix.wildcard === 'string') {
        const v2 = vetActionWildcard(fix.wildcard, scaled, { name: p.name, inline, missingTraitName: traitShipped ? null : traitRejected?.name ?? null });
        if (v2.okay) {
          pendingWildcard.text = v2.text;
          if (v2.moveTo) pendingWildcard.moveTo = v2.moveTo;
          trace('wildcard repaired:', v2.text.slice(0, 100));
        } else trace('wildcard repair failed —', `${v2.why}; chassis text stands`);
      }
    } catch (e3) {
      trace('wildcard repair skipped —', e3?.message ?? e3);
    }
  }
  for (const [sec, es] of Object.entries(sections)) {
    for (let i = es.length - 1; i >= 0; i -= 1) {
      const e = es[i];
      if (/\{damage_type(?:_2)?\}|\{condition_(?:minor|major)\}|\{save_stat\}/.test(e.text)) throw new Error(`unfilled slot in "${e.name}" — failing loudly per spec`);
      if (e.moveTo && e.moveTo !== sec) {
        es.splice(i, 1);
        (sections[e.moveTo] = sections[e.moveTo] ?? []).push(e);
      }
      delete e.moveTo;
    }
  }
  { // print lists HP as the formula's own average — the card target sizes
    // the dice, the dice own the printed number (lint: 240 vs 238, Matador)
    const dm = /(\d+)d(\d+)(?:\s*\+\s*(\d+))?/.exec(monster.hp_formula ?? '');
    if (dm) monster.hp = Math.floor(Number(dm[1]) * (Number(dm[2]) + 1) / 2) + Number(dm[3] ?? 0);
  }
  // Languages: the model answered 'None' on four of six Horsemen. A
  // sapient creature speaks; print's idiom for intelligent undead is
  // exact. Deterministic, keyed on the concept call's mind read.
  {
    const l = String(monster.languages ?? '').trim().toLowerCase();
    if ((!l || l === 'none') && options.mind === 'sapient') {
      monster.languages = /undead/i.test(monster.type) ? 'Common plus the languages it knew in life' : 'Common';
      trace('languages defaulted for sapient:', monster.languages);
    }
  }
  // Type immunity floors, ported from the skeleton stamp (>=80% print):
  // the third Horseman could still be Frightened.
  {
    const FLOOR = {
      Construct: { damage: ['Poison'], conditions: ['Charmed', 'Exhaustion', 'Frightened', 'Paralyzed', 'Petrified', 'Poisoned'] },
      Undead: { damage: ['Poison'], conditions: ['Exhaustion', 'Poisoned'] },
      Ooze: { damage: [], conditions: ['Charmed', 'Deafened', 'Exhaustion', 'Frightened', 'Prone'] },
    }[monster.type];
    if (FLOOR) {
      const d = [...FLOOR.damage].sort(); const c = [...FLOOR.conditions].sort();
      monster.immunities = d.join(', ') + (c.length ? `${d.length ? '; ' : ''}${c.join(', ')}` : '');
      trace('immunities stamped for type:', `${monster.type} -> ${monster.immunities}`);
    }
  }
  const lint = lintStatblock(monster, { edition: '2024' });
  trace('lint:', lint.findings.length ? lint.findings.map((f) => `${f.rule}: ${f.message}`).join(' | ') : '0 findings');
  monster.lint_findings = lint.findings.map((f) => `${f.rule}: ${f.message}`);
  // THE AUDIT PORT (owner go, 2026-08-18): the judgment layer, reused from
  // the slot path — rewrites (span-verified copy-edits) and renames (with
  // reference repointing). No swaps: the reskin has no option pool. This
  // is where the open-set catches live: "of the Fallen" dealing plain
  // Piercing, register intruders, condition-semantics welds.
  if (auditEligible(monster, cr)) {
    try {
      progress('status', { stage: 'audit' });
      const rawAudit = await callLLM(buildAuditPrompt(monster, '2024'), validateAuditResponse);
      const findings = verifyAuditFindings(monster, rawAudit);
      trace('audit:', findings.length ? findings.map((f) => `${f.loc?.entry ?? '-'}: ${f.message}`) : 'nothing flagged');
      for (const f of findings.filter((x) => x.rewrite && x.span)) {
        const entry = (monster.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
        if (entry && entry.text.includes(f.span)) {
          entry.text = entry.text.split(f.span).join(f.rewrite);
          trace('audit rewrite:', `${f.loc.entry}: "${f.span.slice(0, 60)}" -> "${f.rewrite.slice(0, 60)}"`);
        }
      }
      for (const f of findings.filter((x) => x.rename)) {
        const old = f.loc.entry; const gate = (old.match(/\s*\(.*\)$/) ?? [''])[0];
        const bare = old.replace(/\s*\(.*\)$/, '');
        const fresh = `${f.rename}${gate}`;
        let applied = false;
        for (const es of Object.values(monster.sections ?? {})) {
          for (const e of es) {
            if (e.name === old) { e.name = fresh; applied = true; }
            e.text = e.text.replace(new RegExp(`${bare.replace(/[.*+?^$()|[\]{}]/g, '\\$&')}(?! Roll)`, 'g'), f.rename);
          }
        }
        if (applied) trace('audit rename:', `"${old}" -> "${fresh}"`);
      }
    } catch (e2) {
      trace('audit skipped —', e2?.message ?? e2);
    }
  }
  trace('done:', `"${monster.name}" — donor ${donor.id}, CR ${cr}`);
  return monster;
}
