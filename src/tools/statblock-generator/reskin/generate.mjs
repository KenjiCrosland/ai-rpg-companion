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

// the table keys fractional CRs as '1/2', not '0.5' (Thornback shipped XP 0)
const crKey = (cr) => (cr === 0.125 ? '1/8' : cr === 0.25 ? '1/4' : cr === 0.5 ? '1/2' : String(cr));
import { hpFormulaFor as hpFormulaForSize } from '../format-2024/dice.mjs';
import { auditEligible, buildAuditPrompt, validateAuditResponse, verifyAuditFindings } from '../format-2024/audit.mjs';
import { KNOWN_SPELLS } from '../skeleton/flavor-prompt.mjs';

const trace = (l, d) => logger.log(`[reskin] ${l}`, d ?? '');
const GAME_TERM = /Attack Roll|Saving Throw|DC \d+|\b(Frightened|Poisoned|Blinded|Deafened|Prone|Restrained|Grappled|Charmed|Stunned|Incapacitated) condition\b|Advantage|Disadvantage|Dash|Disengage|Hide action|Speed|teleports?|Opportunity Attacks?|Difficult Terrain|unoccupied space|without provoking|Hit Points|\d+ feet/i;
// Condition menus by severity (owner call, 2026-08-18: "interpolate minor
// and major conditions — give the llm the options").
export const CONDITION_MENUS = {
  condition_minor: ['Prone', 'Poisoned', 'Deafened', 'Frightened'],
  condition_major: ['Blinded', 'Restrained', 'Stunned'],
};
const DAMAGE_TYPES = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing'];

const RULES_NAME = /^(Multiattack|Legendary Resistance|Legendary Action Uses|Spellcasting)/;

// utility-only, theme-clustered so most concepts find a coherent pair
export const SPELL_MENU = ['Darkness', 'Fog Cloud', 'Invisibility', 'Silence', 'Pass Without Trace', 'Misty Step', 'Expeditious Retreat', 'Spider Climb', 'Longstrider', 'Web', 'Entangle', 'Faerie Fire', 'Minor Illusion', 'Disguise Self', 'Mirror Image', 'Blur', 'Silent Image'];

/** Every entry the reskin MUST rename — the validator and prompt share it. */
export function renameKeysOf(scaled) {
  return Object.values(scaled.sections).flat()
    .filter((e) => !e.rules && !RULES_NAME.test(e.name))
    .map((e) => e.name);
}

// Element -> seat assignment (owner Option A, 2026-08-19): the action
// wildcard builds the top BEHAVIOR element, the trait the top passive
// one (body/object/aura). Same element on both seats = package mode
// (the lantern-head shape). Untagged elements fall back to element[0]
// for both seats — the pre-tag behavior, unchanged.
export function assignSeats(signatureElements = [], { style = null } = {}) {
  let els = signatureElements.map((e) => (typeof e === 'string' ? { element: e, kind: null } : e)).filter((e) => e?.element);
  // on a mounted chassis the mount element already did its work — it
  // routed the concept to this style. Seating it forces the model to
  // write mount-relationship rules, which print never does (the fused-
  // language parrot + separate-actor wolf, 2026-08-24). Skip it unless
  // it is all we have.
  let demoted = [];
  if (style === 'mounted') {
    const nonMount = els.filter((e) => !/\bmount\w*|\bsteed\w*|\brides?\b|\briding\b|\bridden\b/i.test(e.element));
    if (nonMount.length) {
      demoted = els.filter((e) => !nonMount.includes(e)).map((e) => e.element);
      els = nonMount;
    }
  }
  if (!els.length) return null;
  const action = els.find((e) => e.kind === 'behavior') ?? els[0];
  const trait = els.find((e) => ['body', 'object', 'aura'].includes(e.kind)) ?? els[0];
  return { action: action.element, trait: trait.element, packaged: action.element === trait.element, rest: [...els.map((e) => e.element).filter((x) => x !== action.element && x !== trait.element), ...demoted] };
}

export function buildReskinPrompt(scaled, { concept = '', takenNames = [], signatureElements = [], energy = null, mix = null, mind = null } = {}) {
  const seats = assignSeats(signatureElements, { style: scaled.style ?? null });
  const needsProjectile = Object.values(scaled.sections).flat().some((e) => e.text.includes('{projectile}'));
  const needsSpells = Object.values(scaled.sections).flat().some((e) => e.text.includes('{spell_at_will}'));
  const rows = Object.entries(scaled.sections).flatMap(([sec, es]) => es
    .filter((e) => !e.rules)
    .map((e) => `- [${sec}] "${e.name}": ${e.text.replace(/\*/g, '')}`));
  const typedRows = Object.values(scaled.sections).flat()
    .filter((e) => e.text.includes('{damage_type}'));
  const damageSkeleton = typedRows.map((e) => `"<the new name you gave ${JSON.stringify(e.name)}>": "<damage type>"`).join(', ');
  // per-key register hints (owner, 2026-08-26: the register PARAGRAPH
  // didn't reliably reach the twins — "Spinning Blade Flourish" on a
  // mechanics-free melee row; the hint at the fill site is the
  // highest-compliance prompt surface). Corpus: 330/422 attack rows are
  // ONE bare word.
  const RENAME_HINTS = [
    [/^(?:Melee|Ranged) Attack$/, 'the weapon or body part ALONE, one word like print (Scimitar, Claw, Talons); two words only if the row does more than plain damage (Flame Whip)'],
    [/^Sweeping Area Attack$/, 'a flavored name, two words (Blade Scatter, Fire Breath)'],
    [/^Signature Slot$/, 'THE flavored name — two words, three at the absolute ceiling (Dreadful Glare)'],
    [/^Ranged Save Effect$/, 'two words, the Dreadful Glare class'],
    [/^Legendary/, 'verb-forward, two words (Pounce, Deathless Strike)'],
  ];
  const hintFor = (n) => RENAME_HINTS.find(([re]) => re.test(n))?.[1] ?? 'plain, 1-2 words like print';
  const renameSkeleton = renameKeysOf(scaled)
    .map((n) => `"${n}": "<${hintFor(n)}>"`).join(', ');
  return `You are reskinning a mechanical monster chassis to a concept. The mechanics are FIXED; you provide identity.

CONCEPT: ${concept}
${scaled.style === 'mounted' ? 'MOUNT HANDLING: print never writes rules about a mount — the Centaur Trooper is just its Speed and its charge. Express the mount through names, lore, and attack flavor (a bite, hooves, a saddle-borne strike); never write rules ABOUT the mount (no separate actions or turns, no targeting it, no mounting or dismounting, no describing how rider and mount are joined, and never a rule keyed on being mounted). The chassis speed and charge mechanics already are the mount.\n' : ''}${seats ? `\nSIGNATURE TARGET: ${seats.packaged ? `the concept's defining element is "${seats.action}". The trait_wildcard is the passive rule that makes it true on the sheet; the wildcard is its ACTIVE use` : `the wildcard builds the MECHANICS of "${seats.action}" — the concept's defining behavior; the trait_wildcard is the passive rule that makes "${seats.trait}" true on the sheet`} — build the element's MECHANICS; the element phrase names what to build, not necessarily what to call it. The wildcard may reference the trait_wildcard by its exact name${seats.packaged ? ` — and since both build the same element they SHOULD reference each other, the action stating what the trait's rule costs or grants while the action is in effect` : ''}. Reference nothing else that is not on the sheet.${seats.rest.length ? ` Remaining elements — spend them in renames and lore where they fit naturally: ${seats.rest.join('; ')}.` : ''}\n` : ''}${takenNames.length ? `\nNAMES ALREADY TAKEN — never reuse or closely echo any: ${takenNames.slice(0, 40).join(', ')}\n` : ''}
THE CHASSIS (CR ${scaled.cr}, AC ${scaled.ac}, HP ${scaled.hp}):
${rows.join('\n')}

Return ONLY JSON:
{
 "name": "<the creature's proper name, 1-3 plain words>",
 "type": "<one of: Aberration, Beast, Celestial, Construct, Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze, Plant, Undead>",
 "size": "<Tiny|Small|Medium|Large|Huge|Gargantuan>",
 "alignment": "<a 2024 alignment — follow the concept's own moral read: tragic, driven, or feral is not Evil>",
 "senses": "<a senses line, e.g. 'darkvision 60 ft.'>",
 "languages": "<a languages line or 'None'>",
 "renames": { ${renameSkeleton} },   <- ALL of these keys, every one, none omitted. A name that claims an element must be PAID by that row's damage: "Burning X" needs Fire on the row (or the melee rider), "Rimefrost X" needs Cold. If the damage does not pay the word, drop the word, or qualify it with the true element the way print does (the Priest\'s "Radiant Flame" deals Radiant); folklore light-compounds (witchfire, foxfire, balefire) are always legal. NAME REGISTER — print's name BUDGET (measured from the corpus): standard rows stay terse — a plain-damage attack row is ONE weapon-noun or anatomy word (Bite, Talons, Greataxe); two words only when the row does more than plain damage (Flame Whip, Arcane Burst); utility rows take plain function names. ONLY the Signature Slot and the nova row earn a flavored name, and even there print compresses: two words, three at the absolute ceiling (Dreadful Glare, Curtain Call — never "Blade Scatter Finale"), a hyphenated compound counting as its parts. Legendary actions take the two-word flavored register, verb-forward (Pounce, Mind Jolt, Cold Gale) — never three words. One flourish on a sheet of terse names reads as a designer's touch; wall-to-wall kennings read as a generator.${mind === 'bestial' ? ' THIS creature is bestial: name its attack rows by anatomy alone (Bite, Talons, Slam, Gore) — its flavor lives in the trait and the lore, never in an attack name.' : ''} Never invent a compound word — print writes "Frost Axe", never "Frostaxe".
 "damage_types": { ${damageSkeleton} },   <- REQUIRED for every attack and the area action. PHYSICAL vs ENERGY follows the BODY (print: melee attacks deal the limb's physical type — a bite Piercing, a slam Bludgeoning, a claw Slashing — with energy reserved for the ranged attack and the area action; ONLY a creature whose body IS energy — incorporeal, elemental, formless — deals energy with its melee). A fully physical creature may answer physical for everything; never give every row the same energy — but also keep to ONE energy family across the block (print rarely fields two).${energy ? ` THIS creature's energy is ${energy} — every non-physical damage type you assign must be ${energy}.` : ''}${mix === 'physical' ? ' THIS creature deals PHYSICAL damage only — Bludgeoning, Piercing, or Slashing everywhere; no energy types anywhere on the block.' : ''}
${needsSpells ? ` "spells": { "at_will": ["<exactly 2 spells this concept would cast, from ONLY this list: ${SPELL_MENU.join(', ')}>"], "daily": ["<exactly 2 MORE from the same list, no repeats — pick by THEME: the spells must feel like this creature\'s magic>"] },\n` : ''}${needsProjectile ? ` "projectile": "<the thing it throws, 1-3 words WITH its article (a knucklebone / its barbed anchor) — it appears mid-sentence in attack text>",\n` : ''} "slot_save": "<the Saving Throw stat the Signature Slot should use if your wildcard is not used — the stat the concept threatens: Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma>",
 "melee_rider": "<the ENERGY type the melee attack deals as a rider — or \"none\" if this creature's damage is purely physical (a fifth of printed monsters are)>",
 "speed_shape": "<\"climber\" keeps the Climb speed; \"runner\" trades it for +10 ft. walk (a charger, a rider, a sprinter has no business on walls)>",
 "trait_wildcard": { "name": "<a passive trait the concept demands — its body's rule, not an attack: 4 words max>", "text": "<ONE passive rule, 2 sentences max, 2024 voice: an immunity, a sense, a movement rule, a condition interaction. No damage, no saves, no auras. Omit the object entirely if the chassis already says it.>" },
 "lore": "<ONE sentence of world-lore: where it comes from and what it wants>",
 "vulnerability": "<a damage type this creature is VULNERABLE to — ONLY if the concept genuinely implies one (print is sparing: skeletons take extra Bludgeoning, mummies burn, a thing of ash fears Cold — the wound that made it). Most creatures have none: omit this field entirely.>",
 "conditions": { "condition_minor": "<one of: ${CONDITION_MENUS.condition_minor.join(', ')}>" },
 "wildcard_economy": "<what the wildcard costs: action | bonus_action | reaction | trait | rider_on:<the exact new name you gave the attack it rides> — declare it; the assembler files the entry by THIS field, not by guessing from your prose. A rider is a clause appended to that attack (write it as \"When the creature hits with this attack, ...\").>",
 "wildcard": "<The monster is always 'the creature'; its victim is always 'the target' and NEVER 'the creature'. REPLACES the 'Signature Slot' entry: the concept's single most distinctive behavior as rules text. 4 sentences max, 2024 house voice, no atmospheric prose. Must use a save DC of ${scaled.dc} if it has a save, standard conditions only, damage at most ${Math.round(scaled.per_hit * 1.2)} average. Never assert an effect without granting its rule. An ability that throws or detaches part of the creature's body must state what the creature loses while it is detached and when it returns. Acting or attacking from a distant point is RANGED attacks only. Use limits print as a real count after the entry name, like "(2/Day)" or "(Recharge 5-6)" — never the letter X, never as prose ("can use this three times"), never a stat or proficiency-bonus count, never tied to a rest. Never name or grant a NEW trait inside an ability — state temporary capabilities inline with a duration (\"until the start of its next turn, it can...\").>"
}`;
}

// THE GUARD BATTERY, FACTORED (repair retry, owner go 2026-08-18): one
// function vets a draft at first pass AND after the repair call — the v4
// trace showed the guards correctly rejecting the fear aura for a fixable
// pronoun error, then shipping boilerplate because rejection had no
// second chance.
const CAP_TERMS = /(?<!-)\b(advantage|disadvantage|blinded|charmed|deafened|frightened|grappled|incapacitated|invisible|paralyzed|petrified|poisoned|prone|restrained|stunned|unconscious|exhaustion)\b/g;
const capTerms = (t) => t.replace(CAP_TERMS, (w) => w[0].toUpperCase() + w.slice(1));

// NEGATION-DEFENSE GATE (critic promoted 2026-08-26; 3 lifetime: Storm
// Veil, Scattering Assault, Ash-Body Step — the last shipped an ungated
// trait that strictly dominated its own 3/Day reaction sibling on the
// same sheet). An unhittable block removes martial characters from the
// game: fight-breaking, mechanical tier. Grammar is corpus-clean —
// 0/329 print entries negate an attack; Evasion's "takes no damage if
// it succeeds" is save-scoped and deliberately unmatched ("takes no
// damage from the attack" is the narrow form).
const NEGATION = /\b(?:attack|hit|damage)\b[^.]{0,30}\bis negated|\bnegat(?:es|ing)\b[^.]{0,40}\b(?:attack|damage|hit)|\battack misses\b|takes? no damage from (?:the|that|an?) (?:attack|hit)/i;

const ECONOMY_TO_SECTION = { action: undefined, bonus_action: 'Bonus Actions', reaction: 'Reactions', trait: 'Traits' };

function vetActionWildcard(raw, scaled, { name, inline, missingTraitName = null, economy = null }) {
  // a leading self-label ("Corrosive Snare:") is the rename half-landing
  // inside the body — strip it (never the save frame)
  let liftedGate = null;
  // the parenthetical is a GATE (lifted into the entry name) or an
  // economy label like "(Trait)" (noise — the declaration field owns the
  // economy; the Devil's "Tumble-Pocket Arsenal (Trait)." shipped as a
  // double name inside its own entry text, 2026-08-26)
  const w = String(raw).trim()
    .replace(/^(?!\*)([A-Z][\w' -]{2,28})(?: \((\d+\/Day|Recharge [\d–-]+)\)| \((?:Trait|Action|Bonus Action|Reaction)\))?[.:]\s+/, (m, g, gate) => {
      if (/Saving Throw|Attack Roll/.test(g)) return m;
      if (gate) liftedGate = gate; // "Tactical Call (2/Day)." — the gate belongs in the entry NAME
      return '';
    });
  const dcs = w.match(/DC (\d+)/g) ?? [];
  const dmg = w.match(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/);
  const blockCaps = Object.values(scaled.sections).flat().map((x) => x.text).join(' ') + scaled.speed;
  // pronoun muddle: 'the creature' with a VICTIM-shaped predicate means
  // the model cast the monster as its own target — substitution would mint
  // self-reference. The old heuristic (2+ 'the creature' per sentence)
  // false-positived on legal double monster-references ("until the start
  // of the creature's next turn, and the creature has Advantage") and
  // killed correct drafts through repair (the Matador, 2026-08-19).
  // (?<!of |from |to )(?<!near ) — a locative ("within 30 feet of the
  // creature must make...") names the victim's POSITION, not the monster
  // as victim (the Pilgrim: 3 repair drafts killed, 2026-08-19)
  const victimPredicate = /(?<!\bof )(?<!\bfrom )(?<!\bto )(?<!\bnear )[Tt]he creature (?:must (?:make|succeed)|takes \d|has the [A-Z][a-z]+ condition|repeats the save)/.test(w);
  // count only NON-ACTOR references: "the creature hits/can see" is the
  // monster acting (legal, Stormfall's taunt died 3x on it); a doubled
  // "the creature" in victim position is the muddle
  const doubledInVictimContext = w.split(/(?<=\.)\s+/).some((sent) => {
    const total = (sent.match(/the creature/gi) ?? []).length;
    const actor = (sent.match(/the creature (?:hits|makes|uses|moves|can see|targets)/gi) ?? []).length;
    return total - actor >= 2
      && !/\b(?:the|a) target\b/i.test(sent)
      && /must (?:make|succeed)|Saving Throw|Frightened|Charmed|Paralyzed|Stunned|Restrained|Poisoned|Blinded|Prone|Incapacitated/i.test(sent);
  });
  const selfRef = victimPredicate || doubledInVictimContext;
  // role collapse: "the target" may not appear before anything establishes
  // one. A hit-trigger ESTABLISHES the target (probe smoke, 2026-08-26):
  // the prompt's own rider grammar is "When the creature hits with this
  // attack, ..." — this guard rejected that exact grammar 3 times
  // (Surveyor, Archivist, +1), and the repair's establish-first
  // instruction then taught a 30-ft targeting frame that contradicted the
  // host row (a reach-5 coat grappling at 30 feet). The guard
  // manufactured the defect pattern it existed to prevent.
  const firstTarget = w.search(/\bthe target\b/);
  const established = w.search(/\b(?:one|each|a|any) (?:creature|target)\b|saving throw|When the creature hits/i);
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
  // a second action economy embedded mid-entry (the Outrider's javelin
  // throw with a conditional bonus-action wolf-command welded inside):
  // one entry, one economy
  // print's success clauses grant half damage or nothing — never a fresh
  // penalty (Mire Snare punished on a success, 2026-08-25)
  const successPenalty = /(?:\*Success:?\*|On a success(?:ful save)?,?)[^.*]{0,80}(?:Disadvantage|takes \d|has the [A-Z][a-z]+ condition|Speed is (?:halved|reduced)|can't|cannot)/i.test(w);
  const econDecl = String(economy ?? '').trim().toLowerCase();
  const reactionMention = /uses? (?:its|a|an) [Rr]eaction|as (?:a|its) [Rr]eaction/.test(w);
  const embeddedEconomy = (/bonus action/i.test(w) && econDecl !== 'bonus_action' && !/^[Aa]s an? [Bb]onus [Aa]ction/.test(w))
    // a reaction mechanic living inside an attack rider or an
    // action-declared entry (Grave-Scythe, Shard Lunge — 4 lifetime);
    // an UNDECLARED reaction-shaped draft still routes via placement
    || (reactionMention && (econDecl.startsWith('rider_on:') || (econDecl !== '' && econDecl !== 'reaction')));
  // THE TIER POLICY (owner go, 2026-08-19: "guards doing more harm than
  // good"): 'judgment' guards — the brittle-pattern checks with
  // demonstrated false positives (role collapse killed 3 straight
  // signatures; the sentence cap rejected 10% of print's register) —
  // FAIL OPEN: flag, repair once, and if the repair also fails, ship the
  // draft with a loud trace. 'mechanical' guards — math and ground-truth
  // checks (DC, damage cap, capability, dangling refs) plus the
  // register absolutes (second person, auras, no-rules text) — FAIL
  // CLOSED to the chassis, as ever. A wrong DC breaks the sheet; an
  // ambiguous antecedent survives the table.
  // ORDERING IS LOAD-BEARING (2026-08-25): every MECHANICAL check comes
  // before every judgment check — the chain is first-match, and a
  // judgment flag evaluated early shadowed a teleport-beyond-chassis
  // violation into fail-open (the Pale Surveyor's Lantern's Mark).
  // metering catch-all (owner go, 2026-08-26): the rewriter was an open
  // list of SEEN dialects — the batch promptly invented dialect #6 ("a
  // number of times equal to its Charisma modifier... regains all uses
  // when it finishes a short or long rest", Final Toll). Detect-only; the
  // FIX always comes from the model via repair, never from regex surgery
  // (owner: prose rewrites garble). All three patterns: 0/329 corpus hits.
  const meterPlaceholder = /\b[XN]\/Day\b/.test(w);
  const meterDialect = /\btimes equal to\b/i.test(w) || /regains? (?:all )?(?:expended )?uses/i.test(w);
  // a rider rides the HIT — its own targeting frame contradicts the host
  // row (3 sightings: a reach-5 melee attack whose rider grappled a
  // creature 30 feet away, the Strangler's Coat)
  const riderFramed = econDecl.startsWith('rider_on:') && /\b(?:one|each|any) creature within \d+ feet/i.test(w);
  const why = selfRef ? ['pronoun muddle', 'mechanical']
    : dangling ? ['references a trait that did not ship', 'mechanical']
    : /starts its turn/i.test(w) ? ['recurring aura', 'mechanical']
    : /\byours?\b|\byou\b/i.test(w) ? ['second person', 'mechanical']
    : !GAME_TERM.test(w) ? ['no game term', 'mechanical']
    : (/teleport/i.test(w) && !/teleport/i.test(blockCaps)) ? ['teleport beyond the chassis', 'mechanical']
    : (/\bfl(?:y|ies|ying)\b/i.test(w) && !/Fly/i.test(scaled.speed)) ? ['flight beyond the chassis', 'mechanical']
    : !dcs.every((d) => d === `DC ${scaled.dc}`) ? ['DC differs from the card', 'mechanical']
    : (dmg && Number(dmg[1]) > Math.round(scaled.per_hit * 1.5)) ? ['damage over the cap', 'mechanical']
    : meterPlaceholder ? ['an unfilled use-limit placeholder — write the real number, like "2/Day"', 'mechanical']
    : (NEGATION.test(w) && !liftedGate && econDecl !== 'reaction') ? ['negation defense must be priced — add a use gate like "(Recharge 5-6)" or convert it to a Reaction', 'mechanical']
    : roleCollapse ? ['role collapse', 'judgment']
    : riderFramed ? ['a rider rides the hit — address "the target"; no separate targeting frame', 'judgment']
    : meterDialect ? ['use limits print as a count like "2/Day" — never a stat-modifier formula, never rest-recovery prose', 'judgment']
    : unrated ? ['no rate limit', 'judgment']
    : unreturned ? ['no return clause', 'judgment']
    : remoteMelee ? ['remote attacks must be ranged', 'judgment']
    : embeddedEconomy ? ['a second action economy embedded mid-entry — one entry, one economy', 'judgment']
    : successPenalty ? ['a success clause may grant half damage or nothing — never a penalty', 'judgment']
    : w.split(/(?<=\.)\s+/).length > 4 ? ['over 4 sentences', 'judgment']
    : null;
  let text = capTerms(w.split('the creature').join(inline).split('The creature').join(`The ${name.toLowerCase()}`));
  let moveTo;
  const declared = String(economy ?? '').trim().toLowerCase();
  let riderOn = null;
  const targetingSave = /(?:one|each) (?:creature|target)[^.]{0,80}(?:must succeed|must make|saving throw)/i.test(w);
  if (declared.startsWith('rider_on:')) {
    riderOn = String(economy).slice('rider_on:'.length).trim();
  } else if (declared === 'trait' && targetingSave) {
    // declaration coherence: a save frame aimed at a target is an action
    // no matter what the model declared (Sister Vesper's Gaze of the
    // Living shipped as a costless trait, 2026-08-20) — fall through to
    // the prose-based placement instead
  } else if (Object.prototype.hasOwnProperty.call(ECONOMY_TO_SECTION, declared)) {
    // THE ECONOMY DECLARATION (owner go, 2026-08-19, third filing error in
    // three blocks): the model declares the cost, the assembler files by
    // it — placement regexes demote to the undeclared fallback
    moveTo = ECONOMY_TO_SECTION[declared];
    if (declared === 'bonus_action') text = text.replace(/[Aa]s a [Bb]onus [Aa]ction,?\s*(\w)/, (m0, c) => c.toUpperCase());
    if (declared === 'trait' && /^When /i.test(text) && !/once (?:per|a|each) (?:turn|round)/i.test(text)) text += ' It can do this only once per turn.';
  } else if (/uses? its Reaction|as (?:a|its) [Rr]eaction|^When the .{0,40}takes damage/.test(text)) moveTo = 'Reactions';
  else if (/^When (?:the|a|it) .{0,60}moves/i.test(text)) {
    // mark-on-move is print's TRAIT grammar (free, once per turn stated)
    moveTo = 'Traits';
    if (!/once (?:per|a|each) turn/i.test(text)) text += ' It can do this only once per turn.';
  } else if (/[Aa]s a [Bb]onus [Aa]ction,?\s*/.test(text)) {
    text = text.replace(/[Aa]s a [Bb]onus [Aa]ction,?\s*(\w)/, (m0, c) => c.toUpperCase());
    moveTo = 'Bonus Actions';
  }
  if (declared === 'reaction') {
    // the reaction economy itself enforces once-per-round; a limiter
    // clause is the belt-and-suspenders tell (the Courier's two
    // dialects) — strip it. Riders are NOT in this branch: a rider fires
    // per HIT (x3 under multiattack), so its limiter is load-bearing
    // (the Pale Surveyor's unlimited 18-damage mark, 2026-08-26)
    text = text.replace(/\s*(?:It|The creature) can (?:do|use) this(?: action)? only once (?:per|a|each) (?:turn|round)\.?/g, '').trim();
  }
  // a damage-dealing wildcard never files as a Bonus Action — summedDPR
  // prices multiattack, legendary strikes, and gated novas; a damaging BA
  // is invisible sustained DPR (Vexing Shriek, ~15 over band at CR 11)
  if (moveTo === 'Bonus Actions' && /\d+ \(\d+d\d+/.test(text)) moveTo = undefined;
  if (why) return { okay: false, why: why[0], tier: why[1], draft: w, text, moveTo, riderOn, liftedGate };
  return { okay: true, text, moveTo, riderOn, liftedGate };
}

function vetTraitWildcard(tw, sections, { name, inline }) {
  const twName = String(tw?.name ?? '').trim();
  const twText = String(tw?.text ?? '').trim();
  if (!twName || !twText) return { okay: false, silent: true };
  const names = Object.values(sections).flat().map((e) => e.name.toLowerCase());
  // reach reconciliation (two-sightings rule, 2026-08-26: Outrider, then
  // the Covetous Shade's "reach 10 feet" trait over "reach 5 ft." rows):
  // print states reach on the attack row, never in a trait (0/329 traits
  // claim reach) — a trait asserting a reach no row prints is the
  // two-writers contradiction. Read-only diff; the fix comes from repair.
  const rowReaches = new Set();
  for (const e of Object.values(sections).flat()) {
    for (const rm of (e.text ?? '').matchAll(/reach (\d+) ?ft/gi)) rowReaches.add(rm[1]);
  }
  const reachClaim = /reach (\d+) ?f(?:ee)?t/i.exec(twText);
  const reachContradiction = reachClaim && !rowReaches.has(reachClaim[1]);
  // ORDERING IS LOAD-BEARING (2026-08-26): mechanical checks before the
  // judgment sentence cap — same first-match shadowing class as the
  // action vet's Pale Surveyor bug, fixed here before it fired live
  const why = twName.split(/\s+/).length > 4 ? ['name over 4 words', 'mechanical']
    : HINT_ECHO.test(twName) ? ['name copies the prompt\'s own register example — the example shows the shape, never the name', 'mechanical']
    : /\d+ \(\d+d\d+|\*[A-Z][a-z]+ Saving Throw\*|Saving Throw:|Attack Roll:|\(Recharge|\/Day|\btimes equal to\b|regains? (?:all )?(?:expended )?uses/i.test(twText) ? ['active mechanics in a passive trait (a damage roll, a save FRAME, or a use limit — mentioning saves or attack rolls passively is fine)', 'mechanical']
    : reachContradiction ? [`claims reach ${reachClaim[1]} feet but no attack row prints that reach — reach belongs on the rows; align with them`, 'mechanical']
    : /starts its turn/i.test(twText) ? ['recurring aura', 'mechanical']
    : /\byours?\b|\byou\b/i.test(twText) ? ['second person', 'mechanical']
    // 0/329 print traits mention reactions (Ash-Body Step, 2026-08-26 —
    // the trait vet lacked the check the action vet has had for weeks)
    : /uses? (?:its|a|an) [Rr]eaction|as (?:a|its) [Rr]eaction/.test(twText) ? ['a Reaction belongs in the Reactions section with its cost declared — a trait cannot spend one', 'mechanical']
    : NEGATION.test(twText) ? ['negation defense must be a priced Reaction — a trait has no cost to pay for it', 'mechanical']
    : !/Immunity|Resistance|Advantage|Disadvantage|Speed|darkvision|blindsight|tremorsense|truesight|condition|can't be|cannot be|cover|teleport|Opportunity Attack|provok|Difficult Terrain|unoccupied space|move through|Hit Points|bright light|dim light|obscured|damage|Incapacitated/i.test(twText) ? ['no game term — flavor without a rule', 'mechanical']
    : names.some((n) => n === twName.toLowerCase() || (n.length >= 6 && twName.toLowerCase().length >= 6 && (n.startsWith(twName.toLowerCase()) || twName.toLowerCase().startsWith(n)))) ? ['name collides with an existing entry (exact or near-namesake)', 'mechanical']
    : twText.split(/(?<=\.)\s+/).length > 2 ? ['over 2 sentences', 'judgment'] : null;
  const text = capTerms(twText.split('the creature').join(inline).replace(/^The creature/, `The ${name.toLowerCase()}`));
  if (why) return { okay: false, name: twName, draft: twText, why: why[0], tier: why[1], text };
  return { okay: true, name: twName, text };
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
// word-boundaried: 'ice' must not match inside 'Dice' (the Gambler died
// 3x on "Cursed Dice Blast" claiming Cold, 2026-08-19)
const NAME_CLAIMS = [
  [/\b(?:burn\w*|flam\w*|fire\w*|cinder\w*|scorch\w*|sear\w*|ember\w*|molten)\b/i, 'Fire'],
  [/\b(?:frost\w*|ice|icy|chill\w*|rime\w*|gelid|freez\w*|froz\w*)\b/i, 'Cold'],
  [/\b(?:storm\w*|lightning|volt\w*|shock\w*|thunder\w*)\b/i, null], // Lightning OR Thunder ('spark' dropped: metaphorical range too wide — Stolen Spark, 2026-08-19)
  [/\b(?:venom\w*|toxic|poison\w*)\b/i, 'Poison'],
  [/\b(?:acid\w*|caustic|corrosi\w*)\b/i, 'Acid'],
  [/\b(?:radiant|hallow\w*)\b/i, 'Radiant'],
  [/\b(?:necrotic|grave-?rot)\b/i, 'Necrotic'],
];
// icon-owned vocabulary may not enter a rename (the Vorpal Saber class)
const RESERVED_NAMES = /vorpal|phylactery|holy avenger|sphere of annihilation|tarrasque|beholder|mind flayer/i;
// the prompt's own register exemplars may not BE the answer (instruction
// echo #4: a mantis shipped a trait named "Dreadful Glare" copied from
// the rename hint, 2026-08-26). Generic standards (Scimitar, Claw, Fire
// Breath, Pounce) stay legal — print reuses those; the SIGNATURE-class
// exemplars are one print monster's property or our own hint coinage.
const HINT_ECHO = /^(?:Dreadful Glare|Deathless Strike|Flame Whip|Arcane Burst|Blade Scatter)$/i;
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

// canonical-case belt: the model answering 'cold' for 'Cold' failed the
// claim check, the weld, the rider fill, AND the repair detection at once
// (Lamplighter, 3 calls + degrade, 2026-08-20). Normalize, never reject.
const canonType = (t) => DAMAGE_TYPES.find((d) => d.toLowerCase() === String(t ?? '').trim().toLowerCase()) ?? t;
function normalizeTypeFields(p) {
  if (!p || typeof p !== 'object') return p;
  if (p.damage_types && typeof p.damage_types === 'object') {
    for (const k of Object.keys(p.damage_types)) p.damage_types[k] = canonType(p.damage_types[k]);
  }
  if (p.melee_rider != null && String(p.melee_rider).trim().toLowerCase() !== 'none') p.melee_rider = canonType(p.melee_rider);
  if (p.vulnerability != null) p.vulnerability = canonType(p.vulnerability);
  return p;
}

/**
 * Collect EVERY defect in a reskin response (not first-failure): the
 * repair-as-retry flow (owner go, 2026-08-23) fixes them all in one
 * informed round instead of burning blind retries one field at a time.
 */
export function reskinDefects(scaled, p, { energy = null, mix = null } = {}) {
  if (!p || typeof p.name !== 'string' || !p.renames || typeof p.wildcard !== 'string') {
    return ['unparseable, or name/renames/wildcard missing'];
  }
  const defects = [];
  const keys = renameKeysOf(scaled);
  const PHYSICAL = ['Bludgeoning', 'Piercing', 'Slashing'];
  const typedNames = Object.values(scaled.sections).flat()
    .filter((e) => e.text.includes('{damage_type}')).map((e) => e.name);
  const TYPES = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder', 'Bludgeoning', 'Piercing', 'Slashing'];
  for (const k of keys) {
    const v = String(p.renames?.[k] ?? '').trim();
    if (!v) defects.push(`rename for "${k}" missing`);
    else if (v.toLowerCase() === k.toLowerCase()) defects.push(`rename for "${k}" unchanged`);
    else if (v.split(/\s+/).length > 4) defects.push(`rename for "${k}" over 4 words: "${v}"`);
    else if (RESERVED_NAMES.test(v)) defects.push(`rename for "${k}" uses reserved vocabulary: "${v}"`);
    else if (HINT_ECHO.test(v)) defects.push(`rename for "${k}" copies the prompt's own example "${v}" — the example shows the register, never the name`);
  }
  // rename UNIQUENESS (the mantis's "Scythe or Scythe", 2026-08-26): the
  // one-word register made value collisions reachable — two rows sharing
  // a name garbles Multiattack and every cross-reference
  {
    const seen = new Map();
    for (const k of keys) {
      const v = String(p.renames?.[k] ?? '').trim().toLowerCase();
      if (!v) continue;
      if (seen.has(v)) defects.push(`renames for "${seen.get(v)}" and "${k}" are both "${String(p.renames[k]).trim()}" — every row needs its own name (give the thrown twin its own word: Scythe / Hurled Scythe)`);
      else seen.set(v, k);
    }
  }
  for (const k of typedNames) {
    const rn = String(p.renames?.[k] ?? '').trim();
    const t = p.damage_types?.[rn];
    if (!TYPES.includes(t)) { defects.push(`no damage type for "${rn || k}"`); continue; }
    if (energy && !PHYSICAL.includes(t) && t !== energy) defects.push(`"${rn}" deals ${t} but this creature's energy is ${energy} — use ${energy} or a physical type`);
    if (mix === 'physical' && !PHYSICAL.includes(t)) defects.push(`"${rn}" deals ${t} but this creature is declared fully physical — use Bludgeoning, Piercing, or Slashing`);
    const dealt = [t, /Melee/.test(k) || k === 'Melee Attack' ? p.melee_rider : null].filter(Boolean);
    if (!nameClaimSatisfied(rn, dealt)) defects.push(`name "${rn}" claims an element its damage (${dealt.join('/')}) does not pay`);
  }
  if (Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes('{damage_type_2}'))
    && !TYPES.includes(p.melee_rider) && String(p.melee_rider ?? '').trim().toLowerCase() !== 'none') {
    defects.push('the melee rider is missing (an energy type or "none")');
  } else if (energy && TYPES.includes(p.melee_rider) && !PHYSICAL.includes(p.melee_rider) && p.melee_rider !== energy) {
    defects.push(`the melee rider deals ${p.melee_rider} but this creature's energy is ${energy} — use ${energy}, a physical type, or "none"`);
  } else if (mix === 'physical' && TYPES.includes(p.melee_rider) && !PHYSICAL.includes(p.melee_rider)) {
    defects.push(`the melee rider deals ${p.melee_rider} but this creature is declared fully physical — use a physical type or "none"`);
  }
  for (const [slot, menu] of Object.entries(CONDITION_MENUS)) {
    const used = Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes(`{${slot}}`));
    if (used && !menu.includes(String(p.conditions?.[slot] ?? '').trim())) defects.push(`condition for {${slot}} not from its menu`);
  }
  if (Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes('{projectile}'))) {
    const proj = String(p.projectile ?? '').trim();
    if (!proj || proj.split(/\s+/).length > 4) defects.push('projectile missing (the thrown thing with its article, 4 words max)');
  }
  if (Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes('{spell_at_will}'))) {
    const aw = Array.isArray(p.spells?.at_will) ? p.spells.at_will : [];
    const dl = Array.isArray(p.spells?.daily) ? p.spells.daily : [];
    const all = [...aw, ...dl];
    if (aw.length !== 2 || dl.length !== 2) defects.push('spells missing — exactly 2 at_will and 2 daily picks from the menu');
    for (const sp of all) if (!SPELL_MENU.includes(sp)) defects.push(`"${sp}" is not on the spell menu — pick from: ${SPELL_MENU.join(', ')}`);
    if (new Set(all).size !== all.length) defects.push('spell picks must not repeat');
  }
  return defects;
}

export function makeReskinValidator(scaled, { energy = null, mix = null } = {}) {
  return (jsonString) => {
    let p;
    try {
      p = normalizeTypeFields(JSON.parse(String(jsonString).replace(/^```json\s*|```\s*$/g, '').trim()));
    } catch { trace('validation failed —', 'unparseable'); return false; }
    const defects = reskinDefects(scaled, p, { energy, mix });
    for (const d of defects) trace('validation failed —', d);
    return defects.length === 0;
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
  const scaled = scaleDonor(donor, cr, { movement: options.movement ?? [], mechanics: options.mechanics ?? null });
  if (options.caster) {
    const mental = ['INT', 'WIS', 'CHA'].sort((x, y) => scaled.stats[y] - scaled.stats[x])[0];
    const MENTAL_NAME = { INT: 'Intelligence', WIS: 'Wisdom', CHA: 'Charisma' };
    // the card DC outruns mental stats at high CR (the efreet: card 22,
    // Wis-derivable 19 — arithmetic-certain wherever dc > 8 + PB + mod
    // + 1, the lint's own ±1 float). Print derives casting DCs from the
    // stat; cap rather than raise the stat, which would desync the
    // already-derived skills and saves. The menu is utility-only, so a
    // lower DC costs almost nothing.
    const mentalMod = Math.floor((scaled.stats[mental] - 10) / 2);
    const spellDc = Math.min(scaled.dc, 8 + scaled.pb + mentalMod + 1);
    scaled.sections.Actions.push({
      name: 'Spellcasting', rules: true,
      text: `The creature casts one of the following spells, requiring no Material components and using ${MENTAL_NAME[mental]} as the spellcasting ability (spell save DC ${spellDc}):\n\n- **At Will:** {spell_at_will}\n- **1/Day Each:** {spell_daily}`,
    });
    trace('spellcasting organ injected —', `${MENTAL_NAME[mental]}, DC ${spellDc}`);
  }
  trace('donor:', `${donor.id} -> CR ${cr}${donor.invented ? ' (invented — no printed peer)' : ''}`);
  for (const g of scaled.gated_out ?? []) trace('row gated out:', `${g} — the concept did not claim this mechanic`);
  {
    const seats = assignSeats(options.signatureElements ?? [], { style: scaled.style ?? null });
    if (seats) trace('seats:', seats.packaged ? `package <- "${seats.action}"` : `action <- "${seats.action}" | trait <- "${seats.trait}"`);
  }
  progress('chassis', { chassis: { ac: scaled.ac, hp: scaled.hp, cr_str: String(cr), pb: scaled.pb, xp: challengeRatings[crKey(cr)]?.XP ?? 0 } });

  // REPAIR-AS-RETRY (owner go, 2026-08-23). The strict validator used to
  // burn the client's 3 retries on IDENTICAL blind resends — systematic
  // single-field misses never fix themselves (measured on the acceptance
  // batch: byte-identical failures x3, then a degrade + repair = 5 calls
  // where 2 would do). Now: ONE structurally-validated call (blind retries
  // reserved for unparseable garbage, the thing they can actually fix),
  // then up to two repair rounds that carry the full defect list. Common
  // case 1 call; worst case 3; the loud throw remains the last resort.
  const reskinPrompt = buildReskinPrompt(scaled, { concept, takenNames: options.takenNames ?? [], signatureElements: options.signatureElements ?? [], energy: options.energy ?? null, mix: options.mix ?? null, mind: options.mind ?? null });
  const raw = await callLLM(reskinPrompt, validateReskinResponse);
  let p = (() => { try { return normalizeTypeFields(JSON.parse(String(raw).replace(/^```json\s*|```\s*$/g, '').trim())); } catch { return null; } })();
  if (!p) throw new Error('reskin call failed — the pilot fails loudly, never silently');
  for (let round = 1; round <= 2; round += 1) {
    const defects = reskinDefects(scaled, p, { energy: options.energy ?? null, mix: options.mix ?? null });
    if (!defects.length) break;
    trace(`repair round ${round}:`, `${defects.length} defect(s) — ${defects.join(' | ')}`);
    const typedRows = Object.values(scaled.sections).flat().filter((e) => e.text.includes('{damage_type}'));
    const declaredEnergy = options.energy ?? null;
    const declaredMix = options.mix ?? null;
    const weldOk = (t) => (declaredMix === 'physical' ? ['Bludgeoning', 'Piercing', 'Slashing'].includes(t) : (!declaredEnergy || ['Bludgeoning', 'Piercing', 'Slashing'].includes(t) || t === declaredEnergy));
    // a rename that CLAIMS an element the row's damage does not pay is a
    // rename problem — re-ask for the name, not the type
    const claimBad = typedRows.map((e) => e.name).filter((k) => {
      const rn = String(p.renames?.[k] ?? '').trim();
      const t = p.damage_types?.[rn];
      if (!rn || !DAMAGE_TYPES.includes(t)) return false;
      const dealt = [t, /Melee/.test(k) || k === 'Melee Attack' ? p.melee_rider : null].filter(Boolean);
      return !nameClaimSatisfied(rn, dealt);
    });
    const dupeKeys = (() => {
      const seen = new Map(); const out = [];
      for (const k of renameKeysOf(scaled)) {
        const v = String(p.renames?.[k] ?? '').trim().toLowerCase();
        if (!v) continue;
        if (seen.has(v)) out.push(seen.get(v), k);
        else seen.set(v, k);
      }
      return out;
    })();
    const missingRenames = [...new Set([
      ...renameKeysOf(scaled).filter((k) => {
        const v = String(p.renames?.[k] ?? '').trim();
        return !v || v.toLowerCase() === k.toLowerCase() || v.split(/\s+/).length > 4 || RESERVED_NAMES.test(v) || HINT_ECHO.test(v);
      }),
      ...claimBad,
      ...dupeKeys,
    ])];
    const missingTypes = typedRows.map((e) => e.name)
      .filter((k) => {
        const t = p.damage_types?.[String(p.renames?.[k] ?? '').trim()];
        return !DAMAGE_TYPES.includes(t) || !weldOk(t);
      });
    const missingConds = Object.entries(CONDITION_MENUS)
      .filter(([slot, menu]) => Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes(`{${slot}}`))
        && !menu.includes(String(p.conditions?.[slot] ?? '').trim()))
      .map(([slot]) => slot);
    const spellSlotUsed = Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes('{spell_at_will}'));
    const spellsMissing = spellSlotUsed && !(Array.isArray(p.spells?.at_will) && p.spells.at_will.length === 2
      && Array.isArray(p.spells?.daily) && p.spells.daily.length === 2
      && [...p.spells.at_will, ...p.spells.daily].every((x) => SPELL_MENU.includes(x)));
    const projSlotUsed = Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes('{projectile}'));
    const projMissing = projSlotUsed && (!String(p.projectile ?? '').trim() || String(p.projectile).trim().split(/\s+/).length > 4);
    const riderSlotUsed = Object.values(scaled.sections).flat().some((e) => (e.text ?? '').includes('{damage_type_2}'));
    const riderMissing = riderSlotUsed && !DAMAGE_TYPES.includes(p.melee_rider) && String(p.melee_rider ?? '').trim().toLowerCase() !== 'none';
    const riderWeldBad = riderSlotUsed && !riderMissing && declaredEnergy && DAMAGE_TYPES.includes(p.melee_rider)
      && !['Bludgeoning', 'Piercing', 'Slashing'].includes(p.melee_rider) && p.melee_rider !== declaredEnergy;
    const askRider = riderMissing || riderWeldBad;
    if (!(missingRenames.length || missingTypes.length || missingConds.length || askRider || projMissing || spellsMissing)) break;
    const fixPrompt = `You are completing a partial answer for a D&D monster reskin. CONCEPT: ${concept}
Problems found with the previous answer:
${defects.map((d) => `- ${d}`).join('\n')}
Return ONLY JSON with EXACTLY these corrected pieces:
{${missingRenames.length ? ` "renames": { ${missingRenames.map((k) => `"${k}": "<new name for this mechanic in the concept's register: plain English, 4 words MAX, different from the original, never claiming an element the row's damage does not pay>"`).join(', ')} },` : ''}${missingTypes.length ? ` "damage_types": { ${missingTypes.map((k) => `"${k}": "<damage type${declaredEnergy ? ` — ${declaredEnergy} or a physical type; this creature's energy is ${declaredEnergy}` : ''}>"`).join(', ')} },` : ''}${askRider ? ` "melee_rider": "<${declaredEnergy ? `${declaredEnergy}, a physical type, or none` : 'energy type or none'}>",` : ''}${projMissing ? ` "projectile": "<the thrown thing with its article, 1-3 words>",` : ''}${spellsMissing ? ` "spells": { "at_will": ["<exactly 2 from: ${SPELL_MENU.join(', ')}>"], "daily": ["<exactly 2 more, no repeats>"] },` : ''}${missingConds.length ? ` "conditions": { ${missingConds.map((sl) => `"${sl}": "<one of: ${CONDITION_MENUS[sl].join(', ')}>"`).join(', ')} }` : ''} }`;
    const fixRaw = await callLLM(fixPrompt, (j) => { try { return !!JSON.parse(String(j).replace(/^```json\s*|```\s*$/g, '').trim()); } catch { return false; } });
    const fix = (() => { try { return JSON.parse(String(fixRaw).replace(/^```json\s*|```\s*$/g, '').trim()); } catch { return null; } })();
    if (!fix) break;
    // a repair that RENAMES a row must carry the change into the model's
    // wildcard/trait drafts, which were written against the old name
    // (live: Scornblade's trait cited "Searing Blade" post-repair)
    for (const [k, fresh] of Object.entries(fix.renames ?? {})) {
      const prev = String(p.renames?.[k] ?? '').trim();
      if (prev && fresh && prev !== fresh) {
        if (typeof p.wildcard === 'string') p.wildcard = p.wildcard.split(prev).join(fresh);
        if (p.trait_wildcard?.text) p.trait_wildcard.text = String(p.trait_wildcard.text).split(prev).join(fresh);
        if (p.trait_wildcard?.name) p.trait_wildcard.name = String(p.trait_wildcard.name).split(prev).join(fresh);
      }
    }
    p = { ...p,
      renames: { ...p.renames, ...(fix.renames ?? {}) },
      // repair types may key on the DONOR name (we asked with it) or the new name
      damage_types: { ...p.damage_types, ...Object.fromEntries(Object.entries(fix.damage_types ?? {}).map(([k, v]) => [String(fix.renames?.[k] ?? p.renames?.[k] ?? k).trim(), v])) },
      conditions: { ...p.conditions, ...(fix.conditions ?? {}) },
      // a BAD rider must be replaced, not kept — the old ?? merge preserved
      // weld violations forever
      melee_rider: askRider ? (fix.melee_rider ?? p.melee_rider) : (p.melee_rider ?? fix.melee_rider),
      projectile: projMissing ? (fix.projectile ?? p.projectile) : (p.projectile ?? fix.projectile),
      spells: spellsMissing ? (fix.spells ?? p.spells) : (p.spells ?? fix.spells),
    };
    normalizeTypeFields(p);
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
          // restore + RE-TRANSFORM: the pristine capture predates the rename
          // pass and the name substitution, so a bare restore shipped "If
          // the creature moved" on every rider-less melee (verified against
          // the acceptance sheets five-for-five, 2026-08-23)
          e.text = e.text_noRider;
          for (const [old, fresh] of renamed) e.text = e.text.replace(new RegExp(`${old}(?! Roll)`, 'g'), fresh);
          e.text = e.text.split('The creature').join(`The ${p.name.toLowerCase()}`).split('the creature').join(inline);
        }
      }
      delete e.text_noRider;
      if (wanted && DAMAGE_TYPES.includes(wanted)) e.text = e.text.split('{damage_type}').join(wanted);
      for (const [slot, menu] of Object.entries(CONDITION_MENUS)) {
        const pick2 = String(p.conditions?.[slot] ?? '').trim();
        if (e.text.includes(`{${slot}}`) && menu.includes(pick2)) e.text = e.text.split(`{${slot}}`).join(pick2);
      }
      if (e.text.includes('{projectile}')) {
        const proj = String(p.projectile ?? '').trim();
        if (proj && proj.split(/\s+/).length <= 4) e.text = e.text.split('{projectile}').join(proj);
      }
      if (e.text.includes('{spell_at_will}') && Array.isArray(p.spells?.at_will)) {
        const it = (list) => list.filter((x) => SPELL_MENU.includes(x)).map((x) => `*${x}*`).join(', ');
        if (p.spells.at_will.length) e.text = e.text.split('{spell_at_will}').join(it(p.spells.at_will));
        if (Array.isArray(p.spells.daily) && p.spells.daily.length) e.text = e.text.split('{spell_daily}').join(it(p.spells.daily));
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
    xp: challengeRatings[crKey(cr)]?.XP ?? 0,
    challenge_rating: `${cr} (XP ${(challengeRatings[crKey(cr)]?.XP ?? 0).toLocaleString()}; PB +${scaled.pb})`,
    type: p.type ?? 'Monstrosity', size: p.size ?? 'Medium',
    alignment: String(p.alignment ?? 'Unaligned').replace(/\b[a-z]/g, (c) => c.toUpperCase()),
    ac: card.ac, hp: scaled.hp, // scaled.hp carries the style's hp_scale (flight tax)
    // the die follows the size the RESKIN chose (live: a Gargantuan on d8)
    hp_formula: hpFormulaForSize(scaled.hp, p.size ?? 'Medium', Math.floor((scaled.stats.CON - 10) / 2)),
    pb: scaled.pb,
    speed: scaled.speed, stats: { ...scaled.stats },
    saves: Object.fromEntries(Object.entries(mods).map(([k, v]) => [k, scaled.saves.includes(k) ? v + scaled.pb : v])),
    skills: scaled.skills,
    senses: (() => {
      // SENSES SANITIZER (pattern fix, 2026-08-25): the one unguarded
      // model field — it shipped a dangling entry reference, truesight
      // drift, and editorial commentary. Only print grammar survives:
      // sense word + distance, with the one legal parenthetical.
      const tokens = String(p.senses ?? '').toLowerCase().split(/[;,]/)
        .map((t) => t.trim().replace(/\bft\b\.?/, 'ft.'))
        .filter((t) => /^(?:blindsight|darkvision|tremorsense|truesight) \d+ ft\.(?: \(blind beyond this radius\))?$/.test(t));
      const sp = tokens.length ? tokens.join(', ') : 'darkvision 60 ft.';
      const pp = 10 + Number((/Perception \+(\d+)/.exec(scaled.skills) ?? [0, mods.WIS])[1]);
      return `${sp}; Passive Perception ${pp}`;
    })(),
    languages: p.languages ?? 'None',
    initiative_bonus: mods.DEX, initiative_score: 10 + mods.DEX,
    sections,
    lore: typeof p.lore === 'string' && p.lore.trim().length > 15 ? p.lore.trim() : undefined,
    // provenance rides to the log: cited templates defend with a printed
    // rung, invented ones defend with "nothing prints here, by construction"
    generation: { path: 'reskin', donor: donor.id, archetype: 'skirmisher', ...(donor.invented ? { invented: true } : donor.cite ? { cite: donor.cite } : {}) },
    archetype: 'skirmisher', archetype_source: 'user',
  };
  // Cunning Action is HUMANOID-coded (owner, 2026-08-26: "too assassin
  // coded" — and print agrees exactly: Cunning Action appears only on
  // the Assassin and the Spy, while every nimble CREATURE — goblins,
  // Panther, Tiger — gets Nimble Escape). The skulker stamp lands
  // before the reskin call decides the type, so the split applies here.
  if (!/Humanoid/i.test(monster.type)) {
    for (const es of Object.values(sections)) {
      for (const e of es) {
        if (e.name === 'Cunning Action') {
          e.name = 'Nimble Escape';
          e.text = e.text.replace('the Dash, Disengage, or Hide action', 'the Disengage or Hide action');
        }
      }
    }
  }
  let traitShipped = null; let traitRejected = null;
  // pattern fixes (2026-08-25): model-written text gets the rename map
  // (the Pale Surveyor's trait cited "Ranged Save Effect" — donor
  // vocabulary that the row-rename pass never touched because wildcards
  // ship after that loop) and the closed metering vocabulary (print
  // meters as X/Day, Recharge, rest-scoped, until-end-of-turn, 1 minute
  // — PB-counts, per-encounter, and round-counts rewrite to it).
  const applyRenamesToText = (t) => {
    for (const [old, fresh] of renamed) t = t.replace(new RegExp(`${old}(?! Roll)`, 'g'), fresh);
    return t;
  };
  const normalizeMeters = (t) => t
    .replace(/a number of times (?:per day )?equal to (twice )?(?:its )?proficiency bonus(?: per day)?/gi,
      (m, twice) => `${twice ? scaled.pb * 2 : scaled.pb}/Day`)
    .replace(/\b(once|twice|thrice|two times|three times|(\d+) times?) per day\b/gi,
      (m, word, num) => `${num ?? ({ once: 1, twice: 2, thrice: 3, 'two times': 2, 'three times': 3 })[word.toLowerCase()]}/Day`)
    .replace(/once per (?:encounter|combat)/gi, '1/Day')
    .replace(/for (?:two|2) rounds/gi, 'until the end of its next turn')
    .replace(/for (?:three|3) rounds/gi, 'for 1 minute');
  // register-caps actuator (probe smoke, 2026-08-26: 6 of 8 blocks shipped
  // advisory caps findings — lint saw them, nothing fixed them). All
  // single closed-vocabulary token swaps, below the grammar line per the
  // no-prose-surgery doctrine; clause-level register (prone-vocab) stays
  // detect-and-repair.
  const capRegister = (t) => capTerms(t)
    .replace(/\b(acid|bludgeoning|cold|fire|force|lightning|necrotic|piercing|poison|psychic|radiant|slashing|thunder)(?= damage\b)/g, (m) => m[0].toUpperCase() + m.slice(1))
    .replace(/\b(?<=(?:its|the) )speed\b/g, 'Speed')
    .replace(/\bopportunity attack(s?)\b/g, 'Opportunity Attack$1')
    .replace(/\bdifficult terrain\b/g, 'Difficult Terrain')
    .replace(/\bhit point(s?)\b/g, 'Hit Point$1');
  const polishModelText = (t) => capRegister(applyRenamesToText(normalizeMeters(t)));
  const shipTrait = (v, label, flag) => {
    (sections.Traits = sections.Traits ?? []).unshift({ name: v.name, text: polishModelText(v.text), model: true });
    traitShipped = v.name;
    trace(label, `"${v.name}"${flag ? ` — shipped over a judgment flag (${flag})` : ''}`);
  };
  const shipWildcard = (v, label, flag) => {
    if (v.riderOn) {
      // rider_on: the wildcard is a clause on an existing attack — append
      // it after the damage clause (print's rider idiom) and retire the
      // slot entry, whose seat the rider consumed
      const bare = (n) => n.replace(/ \(.*\)$/, '').trim().toLowerCase();
      const host = Object.values(sections).flat().find((e2) => bare(e2.name) === bare(v.riderOn));
      const weldRider = (row, label2) => {
        // a damage- or save-carrying rider fires per HIT — stamp the
        // print rate limit only when the draft didn't write its own
        // (append-only, per the no-prose-surgery doctrine)
        let riderText = polishModelText(v.text);
        const riderPriced = /\d+ \(\d+d\d+/.test(riderText) || /must (?:succeed|make)[^.]{0,60}[Ss]aving [Tt]hrow|Saving Throw:/.test(riderText);
        if (riderPriced && !/once (?:per|a|each) (?:turn|round)/i.test(riderText)) riderText += ' This effect can be applied only once per turn.';
        row.text = `${row.text} ${riderText}`;
        for (const es of Object.values(sections)) {
          const idx = es.indexOf(pendingWildcard);
          if (idx !== -1) es.splice(idx, 1);
        }
        trace(label2, `${v.text.slice(0, 80)}${flag ? ` — shipped over a judgment flag (${flag})` : ''}`);
      };
      if (host && /If the .{0,60}(?:moved|flew) at least/.test(host.text)) {
        // RE-ANCHOR FIRST (the Petrel's Dazzling Static, 2026-08-26):
        // before demoting to action/trait, offer the rider to a
        // rider-free sibling attack row — the declared host is often the
        // wrong twin (chain lightning that "arcs from its beak" was
        // declared onto the talon row; the beak row sat free)
        const twin = Object.values(sections).flat().find((e2) => e2 !== host && e2 !== pendingWildcard
          && /Attack Roll:/.test(e2.text) && !/If the .{0,60}(?:moved|flew) at least/.test(e2.text));
        if (twin) {
          weldRider(twin, `rider re-anchored to "${twin.name}" ("${host.name}" already carries a rider):`);
          return;
        }
        // one rider per attack (critic's cap, 2026-08-20): the charge/dive
        // rider is already aboard — a second fused mechanic made 4-6
        // sentence attacks with two Prone clauses (Corroded Lance)
        // action-shaped content (a targeting save or damage) stays an
        // ACTION — the cap's first fallback filed an 18-damage save
        // effect into Traits (Shriek of the Crags, 2026-08-24)
        const actionShaped = /\d+ \(\d+d\d+/.test(v.text) || /(?:one|each) (?:creature|target)[^.]{0,80}(?:must succeed|must make|saving throw)/i.test(v.text);
        trace('rider host already carries a rider —', `"${host.name}"; filing as ${actionShaped ? 'an action' : 'a trait'} instead`);
        if (!actionShaped) {
          pendingWildcard.moveTo = 'Traits';
          pendingWildcard.text = polishModelText(/^When /i.test(v.text) && !/once (?:per|a|each) (?:turn|round)/i.test(v.text) ? `${v.text} It can do this only once per turn.` : v.text);
        } else {
          pendingWildcard.text = polishModelText(v.text);
        }
        return;
      }
      if (host && host !== pendingWildcard) {
        weldRider(host, `rider appended to "${host.name}":`);
        return;
      }
      trace('rider host not found —', `"${v.riderOn}"; filing as a trait instead`);
      pendingWildcard.moveTo = 'Traits';
      pendingWildcard.text = polishModelText(v.text);
      return;
    }
    pendingWildcard.text = polishModelText(v.text);
    pendingWildcard.model = true;
    if (v.moveTo) pendingWildcard.moveTo = v.moveTo;
    if (v.liftedGate && !/\(/.test(pendingWildcard.name)) pendingWildcard.name += ` (${v.liftedGate})`;
    trace(label, `${v.text.slice(0, 100)}${flag ? ` — shipped over a judgment flag (${flag})` : ''}`);
  };
  {
    const v = vetTraitWildcard(p.trait_wildcard, sections, { name: p.name, inline });
    if (v.okay) shipTrait(v, 'trait wildcard:');
    else if (!v.silent) {
      traitRejected = v;
      trace('trait wildcard rejected —', `${v.why}: ${v.draft.slice(0, 120)}`);
    }
  }
  let wcRejected = null;
  if (pendingWildcard) {
    const v = vetActionWildcard(p.wildcard, scaled, { name: p.name, inline, missingTraitName: traitRejected?.name ?? null, economy: p.wildcard_economy });
    if (v.okay) shipWildcard(v, 'wildcard accepted:');
    else {
      wcRejected = v;
      trace('wildcard rejected —', `${v.why}: ${v.draft.slice(0, 120)}`);
    }
  }
  // THE REPAIR RETRY + FAIL-OPEN (owner 2026-08-18/19): one repair with
  // the reason fed back; then judgment-tier failures SHIP the best draft
  // with a loud flag (the guards killed 3 straight signatures), while
  // mechanical failures keep the chassis fallback.
  if (wcRejected || traitRejected) {
    let fixedTrait = null; let fixedWc = null;
    try {
      const el = (options.signatureElements ?? [])[0];
      const elText = typeof el === 'string' ? el : el?.element;
      // a rider-bound rewrite must NOT get the establish-first instruction:
      // the hit already establishes the target, and teaching the frame here
      // is how three welds got 30-ft targeting on reach-5 rows (2026-08-26)
      const riderBound = String(p.wildcard_economy ?? '').trim().toLowerCase().startsWith('rider_on:');
      const targeting = riderBound
        ? 'this text is appended to the attack it rides — the hit already establishes the target, so begin "When the creature hits with this attack" and address \'the target\'; do NOT introduce a new targeting frame, a range, or a second target'
        : 'establish the target FIRST ("one creature within 30 feet" or a Saving Throw frame) before saying \'the target\'';
      // an uninformed retry resends the same violation (the efreet burned
      // 3 byte-identical teleport drafts) — the mechanical reason becomes
      // an explicit constraint the rewrite can actually obey
      const whyConstraint = /teleport/i.test(wcRejected?.why ?? '') ? ' This chassis does not support teleportation: the rewrite must not teleport, blink, or relocate instantly in any form — express the concept through movement, senses, or attacks instead.'
        : /flight/i.test(wcRejected?.why ?? '') ? ' This chassis does not fly: the rewrite must stay grounded.'
        : '';
      const fixPrompt = `You are repairing rejected ability drafts for the D&D monster "${p.name}". CONCEPT: ${concept}${elText ? `\nThe ability must build the mechanics for: ${elText}.` : ''}
${wcRejected ? `ACTION draft rejected — ${wcRejected.why}. Draft: "${wcRejected.draft}"\nRewrite it: the monster is always 'the creature'; its victim is always 'the target' and NEVER 'the creature'; ${targeting}; max 4 sentences; any save is DC ${scaled.dc}; damage at most ${Math.round(scaled.per_hit * 1.2)} average; no effect on "starts its turn"; no second person; a per-attack trigger needs a rate limit; an ability that throws or detaches part of the body must state when and how it returns; acting from a distant point allows RANGED attacks only; reference nothing that is not on the sheet.${whyConstraint}\n` : ''}${traitRejected ? `TRAIT draft rejected — ${traitRejected.why}. Name: "${traitRejected.name}" Text: "${traitRejected.draft}"\nRewrite it: ONE passive rule, 2 sentences max, 2024 voice — an immunity, a sense, a movement rule, a condition interaction. No damage numbers, no saves, no Recharge, no auras, no second person.\n` : ''}Return ONLY JSON: {${wcRejected ? ' "wildcard": "<the rewritten action rule>"' : ''}${wcRejected && traitRejected ? ',' : ''}${traitRejected ? ' "trait_wildcard": { "name": "<4 words max>", "text": "<2 sentences max>" }' : ''} }`;
      // per-piece; a judgment-tier repair passes validation (it will ship
      // flagged anyway) — only mechanical failures burn a retry
      const fixValidator = (j) => {
        let parsed; try { parsed = JSON.parse(String(j).replace(/^```json\s*|```\s*$/g, '').trim()); } catch { return false; }
        let anyGood = false;
        if (wcRejected && typeof parsed.wildcard === 'string') {
          const v = vetActionWildcard(parsed.wildcard, scaled, { name: p.name, inline, economy: p.wildcard_economy });
          if (v.okay || v.tier === 'judgment') anyGood = true;
          else trace('repair draft rejected —', `${v.why}: ${v.draft.slice(0, 100)}`);
        }
        if (traitRejected && parsed.trait_wildcard) {
          const v = vetTraitWildcard(parsed.trait_wildcard, sections, { name: p.name, inline });
          if (v.okay || v.tier === 'judgment') anyGood = true;
          else if (!v.silent) trace('repair trait draft rejected —', `${v.why}: ${(v.draft ?? '').slice(0, 100)}`);
        }
        return anyGood;
      };
      const fixRaw = await callLLM(fixPrompt, fixValidator);
      const fix = JSON.parse(String(fixRaw).replace(/^```json\s*|```\s*$/g, '').trim());
      if (traitRejected && fix.trait_wildcard) fixedTrait = vetTraitWildcard(fix.trait_wildcard, sections, { name: p.name, inline });
      if (wcRejected && typeof fix.wildcard === 'string') fixedWc = vetActionWildcard(fix.wildcard, scaled, { name: p.name, inline, missingTraitName: null, economy: p.wildcard_economy });
    } catch (e3) {
      trace('wildcard repair skipped —', e3?.message ?? e3);
    }
    if (traitRejected) {
      if (fixedTrait?.okay) shipTrait(fixedTrait, 'trait wildcard repaired:');
      else if (fixedTrait && !fixedTrait.silent && fixedTrait.tier === 'judgment') shipTrait(fixedTrait, 'trait wildcard repaired:', fixedTrait.why);
      else if (traitRejected.tier === 'judgment') shipTrait(traitRejected, 'trait wildcard:', traitRejected.why);
      else trace('trait repair failed —', `${fixedTrait?.why ?? 'no repair'}; no trait ships`);
    }
    if (wcRejected) {
      if (fixedWc?.okay) shipWildcard(fixedWc, 'wildcard repaired:');
      else if (fixedWc && fixedWc.tier === 'judgment') shipWildcard(fixedWc, 'wildcard repaired:', fixedWc.why);
      else if (wcRejected.tier === 'judgment') shipWildcard(wcRejected, 'wildcard accepted:', wcRejected.why);
      else trace('wildcard repair failed —', `${fixedWc?.why ?? 'no repair'}; chassis text stands`);
    }
  }
  for (const [sec, es] of Object.entries(sections)) {
    for (let i = es.length - 1; i >= 0; i -= 1) {
      const e = es[i];
      if (/\{damage_type(?:_2)?\}|\{condition_(?:minor|major)\}|\{save_stat\}|\{projectile\}|\{spell_(?:at_will|daily)\}/.test(e.text)) throw new Error(`unfilled slot in "${e.name}" — failing loudly per spec`);
      if (e.moveTo && e.moveTo !== sec) {
        es.splice(i, 1);
        (sections[e.moveTo] = sections[e.moveTo] ?? []).push(e);
      }
      delete e.moveTo;
    }
  }
  // self-description repair (the Courier: a trait calling itself "this
  // action" twice): the section is the truth; the prose follows it
  for (const [secName, es] of Object.entries(sections)) {
    if (secName !== 'Traits') continue;
    for (const e of es) e.text = e.text.replace(/\bthis action\b/gi, 'this trait');
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
  // DEFENSE DERIVATION (owner + critic, 2026-08-19) — three measured
  // layers. Every rate below is the corpus sweep of 2026-08-19.
  {
    // Layer 1 — type packages, the floor (>=50% of the type in print):
    const FLOOR = {
      Construct: { damage: ['Poison'], conditions: ['Charmed', 'Exhaustion', 'Frightened', 'Paralyzed', 'Petrified', 'Poisoned'] },
      Undead: { damage: ['Poison'], conditions: ['Exhaustion', 'Poisoned'] },
      Ooze: { damage: [], conditions: ['Charmed', 'Deafened', 'Exhaustion', 'Frightened', 'Prone'] },
      Elemental: { damage: ['Poison'], conditions: ['Exhaustion', 'Poisoned'] }, // 12/17, 10-12/17
      Fiend: { damage: ['Poison'], conditions: ['Poisoned'], resist: ['Cold'] }, // 19/29 imm, 21/29 res
      Celestial: { damage: [], conditions: ['Charmed'], resist: ['Radiant'] }, // 7/13, 8/13
    }[monster.type];
    const resist = new Set(FLOOR?.resist ?? []);
    if (FLOOR && (FLOOR.damage.length || FLOOR.conditions.length)) {
      const d = [...FLOOR.damage].sort(); const c = [...FLOOR.conditions].sort();
      monster.immunities = d.join(', ') + (c.length ? `${d.length ? '; ' : ''}${c.join(', ')}` : '');
      trace('immunities stamped for type:', `${monster.type} -> ${monster.immunities}`);
    }
    // Layer 2 — self-affinity, measured-safe trio ONLY: print defends its
    // own dealt type at Fire 82%, Cold 81%, Lightning 100% — but Poison
    // 34% and Psychic 16% (weapon-venom users are not poison-proof), so
    // no blanket dealt-type rule. Derived from the FINAL row texts, the
    // ground truth after fills.
    const allText = Object.values(monster.sections ?? {}).flat().map((e) => e.text).join(' ');
    for (const t of ['Fire', 'Cold', 'Lightning']) {
      // dice context required: "immunity to Fire damage" in a trait is a
      // DEFENSIVE mention, not dealt damage (the Kelpie derived Fire
      // resistance from its own immunity clause, 2026-08-24)
      if (new RegExp(`\\(\\d+d\\d+(?:\\s*\\+\\s*\\d+)?\\) ${t} damage`).test(allText) && !(monster.immunities ?? '').includes(t)) resist.add(t);
    }
    // a model-written trait granting a damage defense merges into the
    // header (immunity supersedes resistance) — the Pale Marshal/Kelpie
    // class: "Resistances Cold" beside "has immunity to Cold damage"
    for (const e of (monster.sections?.Traits ?? [])) {
      const im = /has (?:immunity|Immunity) to (\w+) damage/.exec(e.text ?? '');
      if (im && DAMAGE_TYPES.includes(im[1])) {
        resist.delete(im[1]);
        if (!(monster.immunities ?? '').includes(im[1])) {
          monster.immunities = monster.immunities ? `${im[1]}, ${monster.immunities}` : im[1];
          trace('trait-granted immunity merged into header:', im[1]);
        }
      }
      const rs = /has (?:resistance|Resistance) to (\w+) damage/.exec(e.text ?? '');
      if (rs && DAMAGE_TYPES.includes(rs[1]) && !(monster.immunities ?? '').includes(rs[1])) resist.add(rs[1]);
    }
    if (resist.size) {
      monster.resistances = [...resist].sort().join(', ');
      trace('resistances derived:', monster.resistances);
    }
    // Layer 3 — vulnerability, concept-warranted and model-declared,
    // guarded: a real type, not one it deals, not one it shrugs. Print
    // ships 15 vulnerabilities in 329 blocks — sparing is correct.
    const vul = String(p.vulnerability ?? '').trim();
    // PROVENANCE, not judgment (owner + critic, 2026-08-24): the batch
    // shipped vulnerabilities on 11/18 blocks vs print's 4.6%, one
    // physics-inverted (water-fey Vulnerable Fire). A vulnerability ships
    // only if its element family appears in the concept's own text — the
    // NAME_CLAIMS bank pointed at the concept instead of a name.
    // 'lightning-fast' is a speed idiom, not an element (Shrike shipped a
    // Thunder vulnerability off the metaphor, 2026-08-24)
    const warrantText = `${concept} ${p.lore ?? ''}`.replace(/lightning-(?:fast|quick|swift)|quick as lightning/gi, '');
    const famRow = NAME_CLAIMS.find(([, t]) => t === vul) ?? (['Lightning', 'Thunder'].includes(vul) ? NAME_CLAIMS.find(([, t]) => t === null) : null);
    const warranted = famRow ? famRow[0].test(warrantText) : new RegExp(`\\b${vul}\\b`, 'i').test(warrantText);
    if (DAMAGE_TYPES.includes(vul) && warranted && !new RegExp(`${vul} damage`).test(allText)
      && !(monster.immunities ?? '').includes(vul) && !(monster.resistances ?? '').includes(vul)) {
      monster.vulnerabilities = vul;
      trace('vulnerability shipped:', vul);
    } else if (vul && vul.toLowerCase() !== 'none') {
      trace('vulnerability rejected —', DAMAGE_TYPES.includes(vul) && !warranted
        ? `"${vul}" has no warrant in the concept's own text (print's default is none)`
        : `"${vul}" is dealt, defended, or not a damage type`);
    }
  }
  const lint = lintStatblock(monster, { edition: '2024' });
  // lint actuator (owner go, 2026-08-19): the action-passive-rider finding
  // computes its own fix ("it moves to Traits") — a validator that
  // documents a defect it could correct is worse than either option
  for (const f of lint.findings.filter((x) => x.rule === 'action-passive-rider' && x.loc)) {
    const idx = (sections[f.loc.section] ?? []).findIndex((e) => e.name === f.loc.entry);
    if (idx !== -1) {
      // ACTUATOR CONFLICT GUARD (the Petrel, 2026-08-26): the rider-cap
      // files action-shaped content (damage/save) as an ACTION; this
      // actuator then moved it to Traits anyway, stranding "this attack"
      // with no antecedent. The two rules now share the shape test —
      // damage- or save-carrying entries never move.
      const entry0 = sections[f.loc.section][idx];
      if (/\d+ \(\d+d\d+/.test(entry0.text) || /(?:one|each|that) (?:creature|target)[^.]{0,80}(?:must succeed|must make|saving throw)/i.test(entry0.text)) {
        trace('lint actuator skipped —', `"${f.loc.entry}" is action-shaped; it stays an Action`);
        continue;
      }
      const [entry] = sections[f.loc.section].splice(idx, 1);
      entry.relocatedToTraits = true;
      (sections.Traits = sections.Traits ?? []).push(entry);
      trace('lint actuator:', `moved "${f.loc.entry}" to Traits (triggered rider filed as an action)`);
    }
  }
  lint.findings = lint.findings.filter((x) => x.rule !== 'action-passive-rider');
  { // CROSS-REFERENCE LINT (owner ok, case-insensitive per owner ruling,
    // 2026-08-25): the round's defect family was parts that don't read
    // each other. Closed vocabularies on both sides — advisory findings.
    const allTexts = Object.values(sections).flat().map((e) => e.text).join(' ');
    // Incapacitated dropped (2nd FP, 2026-08-26): print references it
    // almost exclusively as an escape-hatch SELF-state ("the mark ends
    // early if the creature is Incapacitated") — nothing on the sheet
    // applies it and nothing should
    const CONDS = ['Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Paralyzed', 'Petrified', 'Poisoned', 'Restrained', 'Stunned', 'Unconscious'];
    for (const c of CONDS) {
      const applyRe = new RegExp(`ha(?:s|ve) the ${c} condition|becomes? ${c}\\b|is ${c} (?:until|for)|be ${c}\\b`, 'i');
      // scrub defensive and application phrasings; a surviving mention is
      // a DEPENDENT reference ("against a Poisoned target") with no source
      const scrubbed = allTexts
        .replace(new RegExp(`(?:immun\\w* to|resistan\\w* to|can't be|cannot be|isn't|is not|ends? the|ignores? the(?: effects of)?)[^.]{0,40}${c}`, 'gi'), '')
        .replace(new RegExp(applyRe.source, 'gi'), '');
      if (new RegExp(`\\b${c}\\b`, 'i').test(scrubbed) && !applyRe.test(allTexts)) {
        lint.findings.push({ rule: 'orphan-condition-ref', severity: 'audit', message: `"${c}" is referenced as a state but nothing on the sheet applies it` });
      }
    }
    const STATES = [
      [/while (?:it is )?underground|while burrow/i, /Burrow/i, 'underground'],
      [/while (?:it is )?underwater|while submerged|while swimming/i, /Swim/i, 'underwater'],
      [/while (?:it is )?airborne/i, /Fly/i, 'airborne'],
    ];
    for (const [ref, cap, label] of STATES) {
      if (ref.test(allTexts) && !cap.test(monster.speed ?? '')) {
        lint.findings.push({ rule: 'orphan-state-ref', severity: 'audit', message: `an ability keys on being ${label} but the speed line grants no matching movement` });
      }
    }
    for (const es of Object.values(sections)) {
      for (const e of es) {
        const bareName = e.name.replace(/ \(.*\)$/, '');
        if (KNOWN_SPELLS.has(bareName) && !/casts?\b|spell/i.test(e.text)) {
          lint.findings.push({ rule: 'spell-name-collision', severity: 'audit', message: `"${bareName}" is an SRD spell name on a non-spell entry — rename it` });
        }
        // a condition-gerund name must pay its condition ("Scald-Feather
        // Blinding" blinded no one — ~5 lifetime; same law as Burning->Fire)
        const CLAIM_CONDS = { Blinding: 'Blinded', Stunning: 'Stunned', Paralyzing: 'Paralyzed', Deafening: 'Deafened', Petrifying: 'Petrified' };
        for (const [word, cond] of Object.entries(CLAIM_CONDS)) {
          if (new RegExp(`\\b${word}\\b`, 'i').test(bareName) && !new RegExp(`${cond} condition|is ${cond}\\b|be ${cond}\\b`, 'i').test(e.text)) {
            lint.findings.push({ rule: 'name-condition-claim', severity: 'audit', message: `"${bareName}" promises ${cond} but the entry never applies it` });
          }
        }
      }
    }
  }
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
      const rawAudit = await callLLM(buildAuditPrompt(monster, '2024', { reskin: true }), validateAuditResponse);
      const findings = verifyAuditFindings(monster, rawAudit);
      trace('audit:', findings.length ? findings.map((f) => `${f.loc?.entry ?? '-'}: ${f.message}`) : 'nothing flagged');
      for (const f of findings.filter((x) => x.rewrite && x.span)) {
        const entry = (monster.sections?.[f.loc.section] ?? []).find((e) => e.name === f.loc.entry);
        // CHASSIS REWRITE-IMMUNITY (2026-08-25): the judge rewrote the
        // renamed Mobility Trait out of existence (Wolf-Born Skirmish).
        // Rewrites may only touch MODEL-written text; engine-authored rows
        // are priced composition the audit has no license to edit.
        if (entry && !entry.model) {
          trace('audit rewrite blocked —', `"${f.loc.entry}" is engine-authored chassis text`);
          continue;
        }
        if (entry && entry.text.includes(f.span)) {
          // sentence-align the splice (owner ok, 2026-08-25): a rewrite
          // opening with a sentence subject replacing a mid-sentence span
          // strands the original subject ("The creature The bog lurker
          // has...") — extend the span back to its sentence start first
          let span = f.span;
          const idx = entry.text.indexOf(span);
          if (/^(?:The|A|An|It|Its) /.test(f.rewrite) && idx > 0) {
            const before = entry.text.slice(0, idx);
            const boundary = Math.max(before.lastIndexOf('. '), before.lastIndexOf('! '), before.lastIndexOf('* '));
            const start = boundary === -1 ? 0 : boundary + 2;
            if (start < idx) span = entry.text.slice(start, idx) + span;
          }
          entry.text = entry.text.split(span).join(f.rewrite).replace(/\.{2,}/g, '.');
          trace('audit rewrite:', `${f.loc.entry}: "${span.slice(0, 60)}" -> "${f.rewrite.slice(0, 60)}"`);
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
